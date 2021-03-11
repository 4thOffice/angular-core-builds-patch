/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../util/ng_dev_mode';
import { getFactoryDef } from '../render3/definition_factory';
import { throwCyclicDependencyError, throwInvalidProviderError, throwMixedMultiProviderError } from '../render3/errors_di';
import { deepForEach, newArray } from '../util/array_utils';
import { EMPTY_ARRAY } from '../util/empty';
import { stringify } from '../util/stringify';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { catchInjectorError, injectArgs, NG_TEMP_TOKEN_PATH, setCurrentInjector, THROW_IF_NOT_FOUND, USE_VALUE, ɵɵinject } from './injector_compatibility';
import { INJECTOR } from './injector_token';
import { getInheritedInjectableDef, getInjectableDef, getInjectorDef } from './interface/defs';
import { InjectFlags } from './interface/injector';
import { NullInjector } from './null_injector';
import { INJECTOR_SCOPE } from './scope';
/**
 * Marker which indicates that a value has not yet been created from the factory function.
 */
const NOT_YET = {};
/**
 * Marker which indicates that the factory function for a token is in the process of being called.
 *
 * If the injector is asked to inject a token with its value set to CIRCULAR, that indicates
 * injection of a dependency has recursively attempted to inject the original token, and there is
 * a circular dependency among the providers.
 */
const CIRCULAR = {};
/**
 * A lazily initialized NullInjector.
 */
let NULL_INJECTOR = undefined;
function getNullInjector() {
    if (NULL_INJECTOR === undefined) {
        NULL_INJECTOR = new NullInjector();
    }
    return NULL_INJECTOR;
}
/**
 * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
 *
 * @publicApi
 */
export function createInjector(defType, parent = null, additionalProviders = null, name) {
    const injector = createInjectorWithoutInjectorInstances(defType, parent, additionalProviders, name);
    injector._resolveInjectorDefTypes();
    return injector;
}
/**
 * Creates a new injector without eagerly resolving its injector types. Can be used in places
 * where resolving the injector types immediately can lead to an infinite loop. The injector types
 * should be resolved at a later point by calling `_resolveInjectorDefTypes`.
 */
export function createInjectorWithoutInjectorInstances(defType, parent = null, additionalProviders = null, name) {
    return new R3Injector(defType, additionalProviders, parent || getNullInjector(), name);
}
export class R3Injector {
    constructor(def, additionalProviders, parent, source = null) {
        this.parent = parent;
        /**
         * Map of tokens to records which contain the instances of those tokens.
         * - `null` value implies that we don't have the record. Used by tree-shakable injectors
         * to prevent further searches.
         */
        this.records = new Map();
        /**
         * The transitive set of `InjectorType`s which define this injector.
         */
        this.injectorDefTypes = new Set();
        /**
         * Set of values instantiated by this injector which contain `ngOnDestroy` lifecycle hooks.
         */
        this.onDestroy = new Set();
        this._destroyed = false;
        const dedupStack = [];
        // Start off by creating Records for every provider declared in every InjectorType
        // included transitively in additional providers then do the same for `def`. This order is
        // important because `def` may include providers that override ones in additionalProviders.
        additionalProviders &&
            deepForEach(additionalProviders, provider => this.processProvider(provider, def, additionalProviders));
        deepForEach([def], injectorDef => this.processInjectorType(injectorDef, [], dedupStack));
        // Make sure the INJECTOR token provides this injector.
        this.records.set(INJECTOR, makeRecord(undefined, this));
        // Detect whether this injector has the APP_ROOT_SCOPE token and thus should provide
        // any injectable scoped to APP_ROOT_SCOPE.
        const record = this.records.get(INJECTOR_SCOPE);
        this.scope = record != null ? record.value : null;
        // Source name, used for debugging
        this.source = source || (typeof def === 'object' ? null : stringify(def));
    }
    /**
     * Flag indicating that this injector was previously destroyed.
     */
    get destroyed() {
        return this._destroyed;
    }
    /**
     * Destroy the injector and release references to every instance or provider associated with it.
     *
     * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
     * hook was found.
     */
    destroy() {
        this.assertNotDestroyed();
        // Set destroyed = true first, in case lifecycle hooks re-enter destroy().
        this._destroyed = true;
        try {
            // Call all the lifecycle hooks.
            this.onDestroy.forEach(service => service.ngOnDestroy());
        }
        finally {
            // Release all references.
            this.records.clear();
            this.onDestroy.clear();
            this.injectorDefTypes.clear();
        }
    }
    get(token, notFoundValue = THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
        this.assertNotDestroyed();
        // Set the injection context.
        const previousInjector = setCurrentInjector(this);
        try {
            // Check for the SkipSelf flag.
            if (!(flags & InjectFlags.SkipSelf)) {
                // SkipSelf isn't set, check if the record belongs to this injector.
                let record = this.records.get(token);
                if (record === undefined) {
                    // No record, but maybe the token is scoped to this injector. Look for an injectable
                    // def with a scope matching this injector.
                    const def = couldBeInjectableType(token) && getInjectableDef(token);
                    if (def && this.injectableDefInScope(def)) {
                        // Found an injectable def and it's scoped to this injector. Pretend as if it was here
                        // all along.
                        record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET);
                    }
                    else {
                        record = null;
                    }
                    this.records.set(token, record);
                }
                // If a record was found, get the instance for it and return it.
                if (record != null /* NOT null || undefined */) {
                    return this.hydrate(token, record);
                }
            }
            // Select the next injector based on the Self flag - if self is set, the next injector is
            // the NullInjector, otherwise it's the parent.
            const nextInjector = !(flags & InjectFlags.Self) ? this.parent : getNullInjector();
            // Set the notFoundValue based on the Optional flag - if optional is set and notFoundValue
            // is undefined, the value is null, otherwise it's the notFoundValue.
            notFoundValue = (flags & InjectFlags.Optional) && notFoundValue === THROW_IF_NOT_FOUND ?
                null :
                notFoundValue;
            return nextInjector.get(token, notFoundValue);
        }
        catch (e) {
            if (e.name === 'NullInjectorError') {
                const path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
                path.unshift(stringify(token));
                if (previousInjector) {
                    // We still have a parent injector, keep throwing
                    throw e;
                }
                else {
                    // Format & throw the final error message when we don't have any previous injector
                    return catchInjectorError(e, token, 'R3InjectorError', this.source);
                }
            }
            else {
                throw e;
            }
        }
        finally {
            // Lastly, clean up the state by restoring the previous injector.
            setCurrentInjector(previousInjector);
        }
    }
    /** @internal */
    _resolveInjectorDefTypes() {
        this.injectorDefTypes.forEach(defType => this.get(defType));
    }
    toString() {
        const tokens = [], records = this.records;
        records.forEach((v, token) => tokens.push(stringify(token)));
        return `R3Injector[${tokens.join(', ')}]`;
    }
    assertNotDestroyed() {
        if (this._destroyed) {
            throw new Error('Injector has already been destroyed.');
        }
    }
    /**
     * Add an `InjectorType` or `InjectorTypeWithProviders` and all of its transitive providers
     * to this injector.
     *
     * If an `InjectorTypeWithProviders` that declares providers besides the type is specified,
     * the function will return "true" to indicate that the providers of the type definition need
     * to be processed. This allows us to process providers of injector types after all imports of
     * an injector definition are processed. (following View Engine semantics: see FW-1349)
     */
    processInjectorType(defOrWrappedDef, parents, dedupStack) {
        defOrWrappedDef = resolveForwardRef(defOrWrappedDef);
        if (!defOrWrappedDef)
            return false;
        // Either the defOrWrappedDef is an InjectorType (with injector def) or an
        // InjectorDefTypeWithProviders (aka ModuleWithProviders). Detecting either is a megamorphic
        // read, so care is taken to only do the read once.
        // First attempt to read the injector def (`ɵinj`).
        let def = getInjectorDef(defOrWrappedDef);
        // If that's not present, then attempt to read ngModule from the InjectorDefTypeWithProviders.
        const ngModule = (def == null) && defOrWrappedDef.ngModule || undefined;
        // Determine the InjectorType. In the case where `defOrWrappedDef` is an `InjectorType`,
        // then this is easy. In the case of an InjectorDefTypeWithProviders, then the definition type
        // is the `ngModule`.
        const defType = (ngModule === undefined) ? defOrWrappedDef : ngModule;
        // Check for circular dependencies.
        if (ngDevMode && parents.indexOf(defType) !== -1) {
            const defName = stringify(defType);
            const path = parents.map(stringify);
            throwCyclicDependencyError(defName, path);
        }
        // Check for multiple imports of the same module
        const isDuplicate = dedupStack.indexOf(defType) !== -1;
        // Finally, if defOrWrappedType was an `InjectorDefTypeWithProviders`, then the actual
        // `InjectorDef` is on its `ngModule`.
        if (ngModule !== undefined) {
            def = getInjectorDef(ngModule);
        }
        // If no definition was found, it might be from exports. Remove it.
        if (def == null) {
            return false;
        }
        // Add providers in the same way that @NgModule resolution did:
        // First, include providers from any imports.
        if (def.imports != null && !isDuplicate) {
            // Before processing defType's imports, add it to the set of parents. This way, if it ends
            // up deeply importing itself, this can be detected.
            ngDevMode && parents.push(defType);
            // Add it to the set of dedups. This way we can detect multiple imports of the same module
            dedupStack.push(defType);
            let importTypesWithProviders;
            try {
                deepForEach(def.imports, imported => {
                    if (this.processInjectorType(imported, parents, dedupStack)) {
                        if (importTypesWithProviders === undefined)
                            importTypesWithProviders = [];
                        // If the processed import is an injector type with providers, we store it in the
                        // list of import types with providers, so that we can process those afterwards.
                        importTypesWithProviders.push(imported);
                    }
                });
            }
            finally {
                // Remove it from the parents set when finished.
                ngDevMode && parents.pop();
            }
            // Imports which are declared with providers (TypeWithProviders) need to be processed
            // after all imported modules are processed. This is similar to how View Engine
            // processes/merges module imports in the metadata resolver. See: FW-1349.
            if (importTypesWithProviders !== undefined) {
                for (let i = 0; i < importTypesWithProviders.length; i++) {
                    const { ngModule, providers } = importTypesWithProviders[i];
                    deepForEach(providers, provider => this.processProvider(provider, ngModule, providers || EMPTY_ARRAY));
                }
            }
        }
        // Track the InjectorType and add a provider for it. It's important that this is done after the
        // def's imports.
        this.injectorDefTypes.add(defType);
        const factory = getFactoryDef(defType) || (() => new defType());
        this.records.set(defType, makeRecord(factory, NOT_YET));
        // Next, include providers listed on the definition itself.
        const defProviders = def.providers;
        if (defProviders != null && !isDuplicate) {
            const injectorType = defOrWrappedDef;
            deepForEach(defProviders, provider => this.processProvider(provider, injectorType, defProviders));
        }
        return (ngModule !== undefined &&
            defOrWrappedDef.providers !== undefined);
    }
    /**
     * Process a `SingleProvider` and add it.
     */
    processProvider(provider, ngModuleType, providers) {
        // Determine the token from the provider. Either it's its own token, or has a {provide: ...}
        // property.
        provider = resolveForwardRef(provider);
        let token = isTypeProvider(provider) ? provider : resolveForwardRef(provider && provider.provide);
        // Construct a `Record` for the provider.
        const record = providerToRecord(provider, ngModuleType, providers);
        if (!isTypeProvider(provider) && provider.multi === true) {
            // If the provider indicates that it's a multi-provider, process it specially.
            // First check whether it's been defined already.
            let multiRecord = this.records.get(token);
            if (multiRecord) {
                // It has. Throw a nice error if
                if (ngDevMode && multiRecord.multi === undefined) {
                    throwMixedMultiProviderError();
                }
            }
            else {
                multiRecord = makeRecord(undefined, NOT_YET, true);
                multiRecord.factory = () => injectArgs(multiRecord.multi);
                this.records.set(token, multiRecord);
            }
            token = provider;
            multiRecord.multi.push(provider);
        }
        else {
            const existing = this.records.get(token);
            if (ngDevMode && existing && existing.multi !== undefined) {
                throwMixedMultiProviderError();
            }
        }
        this.records.set(token, record);
    }
    hydrate(token, record) {
        if (ngDevMode && record.value === CIRCULAR) {
            throwCyclicDependencyError(stringify(token));
        }
        else if (record.value === NOT_YET) {
            record.value = CIRCULAR;
            record.value = record.factory();
        }
        if (typeof record.value === 'object' && record.value && hasOnDestroy(record.value)) {
            this.onDestroy.add(record.value);
        }
        return record.value;
    }
    injectableDefInScope(def) {
        if (!def.providedIn) {
            return false;
        }
        else if (typeof def.providedIn === 'string') {
            return def.providedIn === 'any' || (def.providedIn === this.scope);
        }
        else {
            return this.injectorDefTypes.has(def.providedIn);
        }
    }
}
function injectableDefOrInjectorDefFactory(token) {
    // Most tokens will have an injectable def directly on them, which specifies a factory directly.
    const injectableDef = getInjectableDef(token);
    const factory = injectableDef !== null ? injectableDef.factory : getFactoryDef(token);
    if (factory !== null) {
        return factory;
    }
    // InjectionTokens should have an injectable def (ɵprov) and thus should be handled above.
    // If it's missing that, it's an error.
    if (token instanceof InjectionToken) {
        throw new Error(`Token ${stringify(token)} is missing a ɵprov definition.`);
    }
    // Undecorated types can sometimes be created if they have no constructor arguments.
    if (token instanceof Function) {
        return getUndecoratedInjectableFactory(token);
    }
    // There was no way to resolve a factory for this token.
    throw new Error('unreachable');
}
function getUndecoratedInjectableFactory(token) {
    // If the token has parameters then it has dependencies that we cannot resolve implicitly.
    const paramLength = token.length;
    if (paramLength > 0) {
        const args = newArray(paramLength, '?');
        throw new Error(`Can't resolve all parameters for ${stringify(token)}: (${args.join(', ')}).`);
    }
    // The constructor function appears to have no parameters.
    // This might be because it inherits from a super-class. In which case, use an injectable
    // def from an ancestor if there is one.
    // Otherwise this really is a simple class with no dependencies, so return a factory that
    // just instantiates the zero-arg constructor.
    const inheritedInjectableDef = getInheritedInjectableDef(token);
    if (inheritedInjectableDef !== null) {
        return () => inheritedInjectableDef.factory(token);
    }
    else {
        return () => new token();
    }
}
function providerToRecord(provider, ngModuleType, providers) {
    if (isValueProvider(provider)) {
        return makeRecord(undefined, provider.useValue);
    }
    else {
        const factory = providerToFactory(provider, ngModuleType, providers);
        return makeRecord(factory, NOT_YET);
    }
}
/**
 * Converts a `SingleProvider` into a factory function.
 *
 * @param provider provider to convert to factory
 */
export function providerToFactory(provider, ngModuleType, providers) {
    let factory = undefined;
    if (isTypeProvider(provider)) {
        const unwrappedProvider = resolveForwardRef(provider);
        return getFactoryDef(unwrappedProvider) || injectableDefOrInjectorDefFactory(unwrappedProvider);
    }
    else {
        if (isValueProvider(provider)) {
            factory = () => resolveForwardRef(provider.useValue);
        }
        else if (isFactoryProvider(provider)) {
            factory = () => provider.useFactory(...injectArgs(provider.deps || []));
        }
        else if (isExistingProvider(provider)) {
            factory = () => ɵɵinject(resolveForwardRef(provider.useExisting));
        }
        else {
            const classRef = resolveForwardRef(provider &&
                (provider.useClass || provider.provide));
            if (ngDevMode && !classRef) {
                throwInvalidProviderError(ngModuleType, providers, provider);
            }
            if (hasDeps(provider)) {
                factory = () => new (classRef)(...injectArgs(provider.deps));
            }
            else {
                return getFactoryDef(classRef) || injectableDefOrInjectorDefFactory(classRef);
            }
        }
    }
    return factory;
}
function makeRecord(factory, value, multi = false) {
    return {
        factory: factory,
        value: value,
        multi: multi ? [] : undefined,
    };
}
function isValueProvider(value) {
    return value !== null && typeof value == 'object' && USE_VALUE in value;
}
function isExistingProvider(value) {
    return !!(value && value.useExisting);
}
function isFactoryProvider(value) {
    return !!(value && value.useFactory);
}
export function isTypeProvider(value) {
    return typeof value === 'function';
}
export function isClassProvider(value) {
    return !!value.useClass;
}
function hasDeps(value) {
    return !!value.deps;
}
function hasOnDestroy(value) {
    return value !== null && typeof value === 'object' &&
        typeof value.ngOnDestroy === 'function';
}
function couldBeInjectableType(value) {
    return (typeof value === 'function') ||
        (typeof value === 'object' && value instanceof InjectionToken);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9yM19pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLHFCQUFxQixDQUFDO0FBSTdCLE9BQU8sRUFBWSxhQUFhLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsMEJBQTBCLEVBQUUseUJBQXlCLEVBQUUsNEJBQTRCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN6SCxPQUFPLEVBQUMsV0FBVyxFQUFFLFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekosT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQTJELE1BQU0sa0JBQWtCLENBQUM7QUFDdkosT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBVXZDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBRW5COzs7Ozs7R0FNRztBQUNILE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUVwQjs7R0FFRztBQUNILElBQUksYUFBYSxHQUF1QixTQUFTLENBQUM7QUFFbEQsU0FBUyxlQUFlO0lBQ3RCLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtRQUMvQixhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztLQUNwQztJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFZRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FDMUIsT0FBb0MsRUFBRSxTQUF3QixJQUFJLEVBQ2xFLHNCQUE2QyxJQUFJLEVBQUUsSUFBYTtJQUNsRSxNQUFNLFFBQVEsR0FDVixzQ0FBc0MsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZGLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHNDQUFzQyxDQUNsRCxPQUFvQyxFQUFFLFNBQXdCLElBQUksRUFDbEUsc0JBQTZDLElBQUksRUFBRSxJQUFhO0lBQ2xFLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sSUFBSSxlQUFlLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBRUQsTUFBTSxPQUFPLFVBQVU7SUFrQ3JCLFlBQ0ksR0FBc0IsRUFBRSxtQkFBMEMsRUFBVyxNQUFnQixFQUM3RixTQUFzQixJQUFJO1FBRG1ELFdBQU0sR0FBTixNQUFNLENBQVU7UUFsQ2pHOzs7O1dBSUc7UUFDSyxZQUFPLEdBQUcsSUFBSSxHQUFHLEVBQXFFLENBQUM7UUFFL0Y7O1dBRUc7UUFDSyxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztRQUV4RDs7V0FFRztRQUNLLGNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBYSxDQUFDO1FBZ0JqQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBS3pCLE1BQU0sVUFBVSxHQUF3QixFQUFFLENBQUM7UUFFM0Msa0ZBQWtGO1FBQ2xGLDBGQUEwRjtRQUMxRiwyRkFBMkY7UUFDM0YsbUJBQW1CO1lBQ2YsV0FBVyxDQUNQLG1CQUFtQixFQUNuQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7UUFFOUUsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRXpGLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhELG9GQUFvRjtRQUNwRiwyQ0FBMkM7UUFDM0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFbEQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFqQ0Q7O09BRUc7SUFDSCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQThCRDs7Ozs7T0FLRztJQUNILE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQiwwRUFBMEU7UUFDMUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSTtZQUNGLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO2dCQUFTO1lBQ1IsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUNDLEtBQWdELEVBQUUsZ0JBQXFCLGtCQUFrQixFQUN6RixLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU87UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsNkJBQTZCO1FBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSTtZQUNGLCtCQUErQjtZQUMvQixJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNuQyxvRUFBb0U7Z0JBQ3BFLElBQUksTUFBTSxHQUE2QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUN4QixvRkFBb0Y7b0JBQ3BGLDJDQUEyQztvQkFDM0MsTUFBTSxHQUFHLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BFLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDekMsc0ZBQXNGO3dCQUN0RixhQUFhO3dCQUNiLE1BQU0sR0FBRyxVQUFVLENBQUMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7cUJBQ3hFO3lCQUFNO3dCQUNMLE1BQU0sR0FBRyxJQUFJLENBQUM7cUJBQ2Y7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxnRUFBZ0U7Z0JBQ2hFLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRTtvQkFDOUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtZQUVELHlGQUF5RjtZQUN6RiwrQ0FBK0M7WUFDL0MsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ25GLDBGQUEwRjtZQUMxRixxRUFBcUU7WUFDckUsYUFBYSxHQUFHLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxhQUFhLEtBQUssa0JBQWtCLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxDQUFDLENBQUM7Z0JBQ04sYUFBYSxDQUFDO1lBQ2xCLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDL0M7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRTtnQkFDbEMsTUFBTSxJQUFJLEdBQVUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN4RSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLGdCQUFnQixFQUFFO29CQUNwQixpREFBaUQ7b0JBQ2pELE1BQU0sQ0FBQyxDQUFDO2lCQUNUO3FCQUFNO29CQUNMLGtGQUFrRjtvQkFDbEYsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDckU7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7Z0JBQVM7WUFDUixpRUFBaUU7WUFDakUsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsd0JBQXdCO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE1BQU0sR0FBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDcEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLGNBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQzVDLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLG1CQUFtQixDQUN2QixlQUFpRSxFQUNqRSxPQUE0QixFQUM1QixVQUErQjtRQUNqQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWU7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUVuQywwRUFBMEU7UUFDMUUsNEZBQTRGO1FBQzVGLG1EQUFtRDtRQUVuRCxtREFBbUQ7UUFDbkQsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTFDLDhGQUE4RjtRQUM5RixNQUFNLFFBQVEsR0FDVixDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSyxlQUFrRCxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUM7UUFFL0Ysd0ZBQXdGO1FBQ3hGLDhGQUE4RjtRQUM5RixxQkFBcUI7UUFDckIsTUFBTSxPQUFPLEdBQ1QsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFFLGVBQXFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUVqRixtQ0FBbUM7UUFDbkMsSUFBSSxTQUFTLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNoRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0M7UUFFRCxnREFBZ0Q7UUFDaEQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV2RCxzRkFBc0Y7UUFDdEYsc0NBQXNDO1FBQ3RDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtZQUMxQixHQUFHLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsbUVBQW1FO1FBQ25FLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNmLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCwrREFBK0Q7UUFFL0QsNkNBQTZDO1FBQzdDLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkMsMEZBQTBGO1lBQzFGLG9EQUFvRDtZQUNwRCxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuQywwRkFBMEY7WUFDMUYsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6QixJQUFJLHdCQUFzRSxDQUFDO1lBQzNFLElBQUk7Z0JBQ0YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUU7b0JBQ2xDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLEVBQUU7d0JBQzNELElBQUksd0JBQXdCLEtBQUssU0FBUzs0QkFBRSx3QkFBd0IsR0FBRyxFQUFFLENBQUM7d0JBQzFFLGlGQUFpRjt3QkFDakYsZ0ZBQWdGO3dCQUNoRix3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3pDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7b0JBQVM7Z0JBQ1IsZ0RBQWdEO2dCQUNoRCxTQUFTLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQzVCO1lBRUQscUZBQXFGO1lBQ3JGLCtFQUErRTtZQUMvRSwwRUFBMEU7WUFDMUUsSUFBSSx3QkFBd0IsS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hELE1BQU0sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDLEdBQUcsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFELFdBQVcsQ0FDUCxTQUFVLEVBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7aUJBQ3JGO2FBQ0Y7U0FDRjtRQUNELCtGQUErRjtRQUMvRixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV4RCwyREFBMkQ7UUFDM0QsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDeEMsTUFBTSxZQUFZLEdBQUcsZUFBb0MsQ0FBQztZQUMxRCxXQUFXLENBQ1AsWUFBWSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDM0Y7UUFFRCxPQUFPLENBQ0gsUUFBUSxLQUFLLFNBQVM7WUFDckIsZUFBa0QsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVEOztPQUVHO0lBQ0ssZUFBZSxDQUNuQixRQUF3QixFQUFFLFlBQStCLEVBQUUsU0FBZ0I7UUFDN0UsNEZBQTRGO1FBQzVGLFlBQVk7UUFDWixRQUFRLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQ0wsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUYseUNBQXlDO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUN4RCw4RUFBOEU7WUFDOUUsaURBQWlEO1lBQ2pELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksV0FBVyxFQUFFO2dCQUNmLGdDQUFnQztnQkFDaEMsSUFBSSxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ2hELDRCQUE0QixFQUFFLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU07Z0JBQ0wsV0FBVyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxXQUFZLENBQUMsS0FBTSxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQzthQUN0QztZQUNELEtBQUssR0FBRyxRQUFRLENBQUM7WUFDakIsV0FBVyxDQUFDLEtBQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksU0FBUyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDekQsNEJBQTRCLEVBQUUsQ0FBQzthQUNoQztTQUNGO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTyxPQUFPLENBQUksS0FBZ0QsRUFBRSxNQUFpQjtRQUNwRixJQUFJLFNBQVMsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMxQywwQkFBMEIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbkMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBUSxFQUFFLENBQUM7U0FDbEM7UUFDRCxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQztRQUNELE9BQU8sTUFBTSxDQUFDLEtBQVUsQ0FBQztJQUMzQixDQUFDO0lBRU8sb0JBQW9CLENBQUMsR0FBeUI7UUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNLElBQUksT0FBTyxHQUFHLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUM3QyxPQUFPLEdBQUcsQ0FBQyxVQUFVLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEU7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxTQUFTLGlDQUFpQyxDQUFDLEtBQ21CO0lBQzVELGdHQUFnRztJQUNoRyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLE9BQU8sR0FBRyxhQUFhLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdEYsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRUQsMEZBQTBGO0lBQzFGLHVDQUF1QztJQUN2QyxJQUFJLEtBQUssWUFBWSxjQUFjLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUM3RTtJQUVELG9GQUFvRjtJQUNwRixJQUFJLEtBQUssWUFBWSxRQUFRLEVBQUU7UUFDN0IsT0FBTywrQkFBK0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvQztJQUVELHdEQUF3RDtJQUN4RCxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFFRCxTQUFTLCtCQUErQixDQUFDLEtBQWU7SUFDdEQsMEZBQTBGO0lBQzFGLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO1FBQ25CLE1BQU0sSUFBSSxHQUFhLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2hHO0lBRUQsMERBQTBEO0lBQzFELHlGQUF5RjtJQUN6Rix3Q0FBd0M7SUFDeEMseUZBQXlGO0lBQ3pGLDhDQUE4QztJQUM5QyxNQUFNLHNCQUFzQixHQUFHLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLElBQUksc0JBQXNCLEtBQUssSUFBSSxFQUFFO1FBQ25DLE9BQU8sR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEtBQWtCLENBQUMsQ0FBQztLQUNqRTtTQUFNO1FBQ0wsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFLLEtBQW1CLEVBQUUsQ0FBQztLQUN6QztBQUNILENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUNyQixRQUF3QixFQUFFLFlBQStCLEVBQUUsU0FBZ0I7SUFDN0UsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0IsT0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqRDtTQUFNO1FBQ0wsTUFBTSxPQUFPLEdBQTBCLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUYsT0FBTyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQzdCLFFBQXdCLEVBQUUsWUFBZ0MsRUFBRSxTQUFpQjtJQUMvRSxJQUFJLE9BQU8sR0FBMEIsU0FBUyxDQUFDO0lBQy9DLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzVCLE1BQU0saUJBQWlCLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsT0FBTyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ2pHO1NBQU07UUFDTCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM3QixPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3REO2FBQU0sSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN0QyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDekU7YUFBTSxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUM5QixRQUFRO2dCQUNSLENBQUUsUUFBZ0QsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxTQUFTLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLHlCQUF5QixDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDckIsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFDTCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxpQ0FBaUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMvRTtTQUNGO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQ2YsT0FBNEIsRUFBRSxLQUFXLEVBQUUsUUFBaUIsS0FBSztJQUNuRSxPQUFPO1FBQ0wsT0FBTyxFQUFFLE9BQU87UUFDaEIsS0FBSyxFQUFFLEtBQUs7UUFDWixLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7S0FDOUIsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxLQUFxQjtJQUM1QyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsSUFBSSxLQUFLLENBQUM7QUFDMUUsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsS0FBcUI7SUFDL0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUssS0FBMEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxLQUFxQjtJQUM5QyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSyxLQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQXFCO0lBQ2xELE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDO0FBQ3JDLENBQUM7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLEtBQXFCO0lBQ25ELE9BQU8sQ0FBQyxDQUFFLEtBQTZDLENBQUMsUUFBUSxDQUFDO0FBQ25FLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxLQUNtQjtJQUNsQyxPQUFPLENBQUMsQ0FBRSxLQUFhLENBQUMsSUFBSSxDQUFDO0FBQy9CLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFVO0lBQzlCLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQzlDLE9BQVEsS0FBbUIsQ0FBQyxXQUFXLEtBQUssVUFBVSxDQUFDO0FBQzdELENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLEtBQVU7SUFFdkMsT0FBTyxDQUFDLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztRQUNoQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLFlBQVksY0FBYyxDQUFDLENBQUM7QUFDckUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJy4uL3V0aWwvbmdfZGV2X21vZGUnO1xuXG5pbXBvcnQge09uRGVzdHJveX0gZnJvbSAnLi4vaW50ZXJmYWNlL2xpZmVjeWNsZV9ob29rcyc7XG5pbXBvcnQge0Fic3RyYWN0VHlwZSwgVHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtGYWN0b3J5Rm4sIGdldEZhY3RvcnlEZWZ9IGZyb20gJy4uL3JlbmRlcjMvZGVmaW5pdGlvbl9mYWN0b3J5JztcbmltcG9ydCB7dGhyb3dDeWNsaWNEZXBlbmRlbmN5RXJyb3IsIHRocm93SW52YWxpZFByb3ZpZGVyRXJyb3IsIHRocm93TWl4ZWRNdWx0aVByb3ZpZGVyRXJyb3J9IGZyb20gJy4uL3JlbmRlcjMvZXJyb3JzX2RpJztcbmltcG9ydCB7ZGVlcEZvckVhY2gsIG5ld0FycmF5fSBmcm9tICcuLi91dGlsL2FycmF5X3V0aWxzJztcbmltcG9ydCB7RU1QVFlfQVJSQVl9IGZyb20gJy4uL3V0aWwvZW1wdHknO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5JztcblxuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi9mb3J3YXJkX3JlZic7XG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCB7Y2F0Y2hJbmplY3RvckVycm9yLCBpbmplY3RBcmdzLCBOR19URU1QX1RPS0VOX1BBVEgsIHNldEN1cnJlbnRJbmplY3RvciwgVEhST1dfSUZfTk9UX0ZPVU5ELCBVU0VfVkFMVUUsIMm1ybVpbmplY3R9IGZyb20gJy4vaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge0lOSkVDVE9SfSBmcm9tICcuL2luamVjdG9yX3Rva2VuJztcbmltcG9ydCB7Z2V0SW5oZXJpdGVkSW5qZWN0YWJsZURlZiwgZ2V0SW5qZWN0YWJsZURlZiwgZ2V0SW5qZWN0b3JEZWYsIEluamVjdG9yVHlwZSwgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVycywgybXJtUluamVjdGFibGVEZWZ9IGZyb20gJy4vaW50ZXJmYWNlL2RlZnMnO1xuaW1wb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2UvaW5qZWN0b3InO1xuaW1wb3J0IHtDbGFzc1Byb3ZpZGVyLCBDb25zdHJ1Y3RvclByb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIFN0YXRpY0NsYXNzUHJvdmlkZXIsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXJ9IGZyb20gJy4vaW50ZXJmYWNlL3Byb3ZpZGVyJztcbmltcG9ydCB7TnVsbEluamVjdG9yfSBmcm9tICcuL251bGxfaW5qZWN0b3InO1xuaW1wb3J0IHtJTkpFQ1RPUl9TQ09QRX0gZnJvbSAnLi9zY29wZSc7XG5cblxuXG4vKipcbiAqIEludGVybmFsIHR5cGUgZm9yIGEgc2luZ2xlIHByb3ZpZGVyIGluIGEgZGVlcCBwcm92aWRlciBhcnJheS5cbiAqL1xudHlwZSBTaW5nbGVQcm92aWRlciA9IFR5cGVQcm92aWRlcnxWYWx1ZVByb3ZpZGVyfENsYXNzUHJvdmlkZXJ8Q29uc3RydWN0b3JQcm92aWRlcnxFeGlzdGluZ1Byb3ZpZGVyfFxuICAgIEZhY3RvcnlQcm92aWRlcnxTdGF0aWNDbGFzc1Byb3ZpZGVyO1xuXG4vKipcbiAqIE1hcmtlciB3aGljaCBpbmRpY2F0ZXMgdGhhdCBhIHZhbHVlIGhhcyBub3QgeWV0IGJlZW4gY3JlYXRlZCBmcm9tIHRoZSBmYWN0b3J5IGZ1bmN0aW9uLlxuICovXG5jb25zdCBOT1RfWUVUID0ge307XG5cbi8qKlxuICogTWFya2VyIHdoaWNoIGluZGljYXRlcyB0aGF0IHRoZSBmYWN0b3J5IGZ1bmN0aW9uIGZvciBhIHRva2VuIGlzIGluIHRoZSBwcm9jZXNzIG9mIGJlaW5nIGNhbGxlZC5cbiAqXG4gKiBJZiB0aGUgaW5qZWN0b3IgaXMgYXNrZWQgdG8gaW5qZWN0IGEgdG9rZW4gd2l0aCBpdHMgdmFsdWUgc2V0IHRvIENJUkNVTEFSLCB0aGF0IGluZGljYXRlc1xuICogaW5qZWN0aW9uIG9mIGEgZGVwZW5kZW5jeSBoYXMgcmVjdXJzaXZlbHkgYXR0ZW1wdGVkIHRvIGluamVjdCB0aGUgb3JpZ2luYWwgdG9rZW4sIGFuZCB0aGVyZSBpc1xuICogYSBjaXJjdWxhciBkZXBlbmRlbmN5IGFtb25nIHRoZSBwcm92aWRlcnMuXG4gKi9cbmNvbnN0IENJUkNVTEFSID0ge307XG5cbi8qKlxuICogQSBsYXppbHkgaW5pdGlhbGl6ZWQgTnVsbEluamVjdG9yLlxuICovXG5sZXQgTlVMTF9JTkpFQ1RPUjogSW5qZWN0b3J8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBnZXROdWxsSW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICBpZiAoTlVMTF9JTkpFQ1RPUiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgTlVMTF9JTkpFQ1RPUiA9IG5ldyBOdWxsSW5qZWN0b3IoKTtcbiAgfVxuICByZXR1cm4gTlVMTF9JTkpFQ1RPUjtcbn1cblxuLyoqXG4gKiBBbiBlbnRyeSBpbiB0aGUgaW5qZWN0b3Igd2hpY2ggdHJhY2tzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiB0b2tlbiwgaW5jbHVkaW5nIGEgcG9zc2libGVcbiAqIGN1cnJlbnQgdmFsdWUuXG4gKi9cbmludGVyZmFjZSBSZWNvcmQ8VD4ge1xuICBmYWN0b3J5OiAoKCkgPT4gVCl8dW5kZWZpbmVkO1xuICB2YWx1ZTogVHx7fTtcbiAgbXVsdGk6IGFueVtdfHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgYEluamVjdG9yYCB3aGljaCBpcyBjb25maWd1cmVkIHVzaW5nIGEgYGRlZlR5cGVgIG9mIGBJbmplY3RvclR5cGU8YW55PmBzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUluamVjdG9yKFxuICAgIGRlZlR5cGU6IC8qIEluamVjdG9yVHlwZTxhbnk+ICovIGFueSwgcGFyZW50OiBJbmplY3RvcnxudWxsID0gbnVsbCxcbiAgICBhZGRpdGlvbmFsUHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdfG51bGwgPSBudWxsLCBuYW1lPzogc3RyaW5nKTogSW5qZWN0b3Ige1xuICBjb25zdCBpbmplY3RvciA9XG4gICAgICBjcmVhdGVJbmplY3RvcldpdGhvdXRJbmplY3Rvckluc3RhbmNlcyhkZWZUeXBlLCBwYXJlbnQsIGFkZGl0aW9uYWxQcm92aWRlcnMsIG5hbWUpO1xuICBpbmplY3Rvci5fcmVzb2x2ZUluamVjdG9yRGVmVHlwZXMoKTtcbiAgcmV0dXJuIGluamVjdG9yO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5qZWN0b3Igd2l0aG91dCBlYWdlcmx5IHJlc29sdmluZyBpdHMgaW5qZWN0b3IgdHlwZXMuIENhbiBiZSB1c2VkIGluIHBsYWNlc1xuICogd2hlcmUgcmVzb2x2aW5nIHRoZSBpbmplY3RvciB0eXBlcyBpbW1lZGlhdGVseSBjYW4gbGVhZCB0byBhbiBpbmZpbml0ZSBsb29wLiBUaGUgaW5qZWN0b3IgdHlwZXNcbiAqIHNob3VsZCBiZSByZXNvbHZlZCBhdCBhIGxhdGVyIHBvaW50IGJ5IGNhbGxpbmcgYF9yZXNvbHZlSW5qZWN0b3JEZWZUeXBlc2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbmplY3RvcldpdGhvdXRJbmplY3Rvckluc3RhbmNlcyhcbiAgICBkZWZUeXBlOiAvKiBJbmplY3RvclR5cGU8YW55PiAqLyBhbnksIHBhcmVudDogSW5qZWN0b3J8bnVsbCA9IG51bGwsXG4gICAgYWRkaXRpb25hbFByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXXxudWxsID0gbnVsbCwgbmFtZT86IHN0cmluZyk6IFIzSW5qZWN0b3Ige1xuICByZXR1cm4gbmV3IFIzSW5qZWN0b3IoZGVmVHlwZSwgYWRkaXRpb25hbFByb3ZpZGVycywgcGFyZW50IHx8IGdldE51bGxJbmplY3RvcigpLCBuYW1lKTtcbn1cblxuZXhwb3J0IGNsYXNzIFIzSW5qZWN0b3Ige1xuICAvKipcbiAgICogTWFwIG9mIHRva2VucyB0byByZWNvcmRzIHdoaWNoIGNvbnRhaW4gdGhlIGluc3RhbmNlcyBvZiB0aG9zZSB0b2tlbnMuXG4gICAqIC0gYG51bGxgIHZhbHVlIGltcGxpZXMgdGhhdCB3ZSBkb24ndCBoYXZlIHRoZSByZWNvcmQuIFVzZWQgYnkgdHJlZS1zaGFrYWJsZSBpbmplY3RvcnNcbiAgICogdG8gcHJldmVudCBmdXJ0aGVyIHNlYXJjaGVzLlxuICAgKi9cbiAgcHJpdmF0ZSByZWNvcmRzID0gbmV3IE1hcDxUeXBlPGFueT58QWJzdHJhY3RUeXBlPGFueT58SW5qZWN0aW9uVG9rZW48YW55PiwgUmVjb3JkPGFueT58bnVsbD4oKTtcblxuICAvKipcbiAgICogVGhlIHRyYW5zaXRpdmUgc2V0IG9mIGBJbmplY3RvclR5cGVgcyB3aGljaCBkZWZpbmUgdGhpcyBpbmplY3Rvci5cbiAgICovXG4gIHByaXZhdGUgaW5qZWN0b3JEZWZUeXBlcyA9IG5ldyBTZXQ8SW5qZWN0b3JUeXBlPGFueT4+KCk7XG5cbiAgLyoqXG4gICAqIFNldCBvZiB2YWx1ZXMgaW5zdGFudGlhdGVkIGJ5IHRoaXMgaW5qZWN0b3Igd2hpY2ggY29udGFpbiBgbmdPbkRlc3Ryb3lgIGxpZmVjeWNsZSBob29rcy5cbiAgICovXG4gIHByaXZhdGUgb25EZXN0cm95ID0gbmV3IFNldDxPbkRlc3Ryb3k+KCk7XG5cbiAgLyoqXG4gICAqIEZsYWcgaW5kaWNhdGluZyB0aGlzIGluamVjdG9yIHByb3ZpZGVzIHRoZSBBUFBfUk9PVF9TQ09QRSB0b2tlbiwgYW5kIHRodXMgY291bnRzIGFzIHRoZVxuICAgKiByb290IHNjb3BlLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBzY29wZTogJ3Jvb3QnfCdwbGF0Zm9ybSd8bnVsbDtcblxuICByZWFkb25seSBzb3VyY2U6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBGbGFnIGluZGljYXRpbmcgdGhhdCB0aGlzIGluamVjdG9yIHdhcyBwcmV2aW91c2x5IGRlc3Ryb3llZC5cbiAgICovXG4gIGdldCBkZXN0cm95ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc3Ryb3llZDtcbiAgfVxuICBwcml2YXRlIF9kZXN0cm95ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGRlZjogSW5qZWN0b3JUeXBlPGFueT4sIGFkZGl0aW9uYWxQcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW118bnVsbCwgcmVhZG9ubHkgcGFyZW50OiBJbmplY3RvcixcbiAgICAgIHNvdXJjZTogc3RyaW5nfG51bGwgPSBudWxsKSB7XG4gICAgY29uc3QgZGVkdXBTdGFjazogSW5qZWN0b3JUeXBlPGFueT5bXSA9IFtdO1xuXG4gICAgLy8gU3RhcnQgb2ZmIGJ5IGNyZWF0aW5nIFJlY29yZHMgZm9yIGV2ZXJ5IHByb3ZpZGVyIGRlY2xhcmVkIGluIGV2ZXJ5IEluamVjdG9yVHlwZVxuICAgIC8vIGluY2x1ZGVkIHRyYW5zaXRpdmVseSBpbiBhZGRpdGlvbmFsIHByb3ZpZGVycyB0aGVuIGRvIHRoZSBzYW1lIGZvciBgZGVmYC4gVGhpcyBvcmRlciBpc1xuICAgIC8vIGltcG9ydGFudCBiZWNhdXNlIGBkZWZgIG1heSBpbmNsdWRlIHByb3ZpZGVycyB0aGF0IG92ZXJyaWRlIG9uZXMgaW4gYWRkaXRpb25hbFByb3ZpZGVycy5cbiAgICBhZGRpdGlvbmFsUHJvdmlkZXJzICYmXG4gICAgICAgIGRlZXBGb3JFYWNoKFxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3ZpZGVycyxcbiAgICAgICAgICAgIHByb3ZpZGVyID0+IHRoaXMucHJvY2Vzc1Byb3ZpZGVyKHByb3ZpZGVyLCBkZWYsIGFkZGl0aW9uYWxQcm92aWRlcnMpKTtcblxuICAgIGRlZXBGb3JFYWNoKFtkZWZdLCBpbmplY3RvckRlZiA9PiB0aGlzLnByb2Nlc3NJbmplY3RvclR5cGUoaW5qZWN0b3JEZWYsIFtdLCBkZWR1cFN0YWNrKSk7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIElOSkVDVE9SIHRva2VuIHByb3ZpZGVzIHRoaXMgaW5qZWN0b3IuXG4gICAgdGhpcy5yZWNvcmRzLnNldChJTkpFQ1RPUiwgbWFrZVJlY29yZCh1bmRlZmluZWQsIHRoaXMpKTtcblxuICAgIC8vIERldGVjdCB3aGV0aGVyIHRoaXMgaW5qZWN0b3IgaGFzIHRoZSBBUFBfUk9PVF9TQ09QRSB0b2tlbiBhbmQgdGh1cyBzaG91bGQgcHJvdmlkZVxuICAgIC8vIGFueSBpbmplY3RhYmxlIHNjb3BlZCB0byBBUFBfUk9PVF9TQ09QRS5cbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLnJlY29yZHMuZ2V0KElOSkVDVE9SX1NDT1BFKTtcbiAgICB0aGlzLnNjb3BlID0gcmVjb3JkICE9IG51bGwgPyByZWNvcmQudmFsdWUgOiBudWxsO1xuXG4gICAgLy8gU291cmNlIG5hbWUsIHVzZWQgZm9yIGRlYnVnZ2luZ1xuICAgIHRoaXMuc291cmNlID0gc291cmNlIHx8ICh0eXBlb2YgZGVmID09PSAnb2JqZWN0JyA/IG51bGwgOiBzdHJpbmdpZnkoZGVmKSk7XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgaW5qZWN0b3IgYW5kIHJlbGVhc2UgcmVmZXJlbmNlcyB0byBldmVyeSBpbnN0YW5jZSBvciBwcm92aWRlciBhc3NvY2lhdGVkIHdpdGggaXQuXG4gICAqXG4gICAqIEFsc28gY2FsbHMgdGhlIGBPbkRlc3Ryb3lgIGxpZmVjeWNsZSBob29rcyBvZiBldmVyeSBpbnN0YW5jZSB0aGF0IHdhcyBjcmVhdGVkIGZvciB3aGljaCBhXG4gICAqIGhvb2sgd2FzIGZvdW5kLlxuICAgKi9cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmFzc2VydE5vdERlc3Ryb3llZCgpO1xuXG4gICAgLy8gU2V0IGRlc3Ryb3llZCA9IHRydWUgZmlyc3QsIGluIGNhc2UgbGlmZWN5Y2xlIGhvb2tzIHJlLWVudGVyIGRlc3Ryb3koKS5cbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAvLyBDYWxsIGFsbCB0aGUgbGlmZWN5Y2xlIGhvb2tzLlxuICAgICAgdGhpcy5vbkRlc3Ryb3kuZm9yRWFjaChzZXJ2aWNlID0+IHNlcnZpY2UubmdPbkRlc3Ryb3koKSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIC8vIFJlbGVhc2UgYWxsIHJlZmVyZW5jZXMuXG4gICAgICB0aGlzLnJlY29yZHMuY2xlYXIoKTtcbiAgICAgIHRoaXMub25EZXN0cm95LmNsZWFyKCk7XG4gICAgICB0aGlzLmluamVjdG9yRGVmVHlwZXMuY2xlYXIoKTtcbiAgICB9XG4gIH1cblxuICBnZXQ8VD4oXG4gICAgICB0b2tlbjogVHlwZTxUPnxBYnN0cmFjdFR5cGU8VD58SW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU6IGFueSA9IFRIUk9XX0lGX05PVF9GT1VORCxcbiAgICAgIGZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdCk6IFQge1xuICAgIHRoaXMuYXNzZXJ0Tm90RGVzdHJveWVkKCk7XG4gICAgLy8gU2V0IHRoZSBpbmplY3Rpb24gY29udGV4dC5cbiAgICBjb25zdCBwcmV2aW91c0luamVjdG9yID0gc2V0Q3VycmVudEluamVjdG9yKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICAvLyBDaGVjayBmb3IgdGhlIFNraXBTZWxmIGZsYWcuXG4gICAgICBpZiAoIShmbGFncyAmIEluamVjdEZsYWdzLlNraXBTZWxmKSkge1xuICAgICAgICAvLyBTa2lwU2VsZiBpc24ndCBzZXQsIGNoZWNrIGlmIHRoZSByZWNvcmQgYmVsb25ncyB0byB0aGlzIGluamVjdG9yLlxuICAgICAgICBsZXQgcmVjb3JkOiBSZWNvcmQ8VD58dW5kZWZpbmVkfG51bGwgPSB0aGlzLnJlY29yZHMuZ2V0KHRva2VuKTtcbiAgICAgICAgaWYgKHJlY29yZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gTm8gcmVjb3JkLCBidXQgbWF5YmUgdGhlIHRva2VuIGlzIHNjb3BlZCB0byB0aGlzIGluamVjdG9yLiBMb29rIGZvciBhbiBpbmplY3RhYmxlXG4gICAgICAgICAgLy8gZGVmIHdpdGggYSBzY29wZSBtYXRjaGluZyB0aGlzIGluamVjdG9yLlxuICAgICAgICAgIGNvbnN0IGRlZiA9IGNvdWxkQmVJbmplY3RhYmxlVHlwZSh0b2tlbikgJiYgZ2V0SW5qZWN0YWJsZURlZih0b2tlbik7XG4gICAgICAgICAgaWYgKGRlZiAmJiB0aGlzLmluamVjdGFibGVEZWZJblNjb3BlKGRlZikpIHtcbiAgICAgICAgICAgIC8vIEZvdW5kIGFuIGluamVjdGFibGUgZGVmIGFuZCBpdCdzIHNjb3BlZCB0byB0aGlzIGluamVjdG9yLiBQcmV0ZW5kIGFzIGlmIGl0IHdhcyBoZXJlXG4gICAgICAgICAgICAvLyBhbGwgYWxvbmcuXG4gICAgICAgICAgICByZWNvcmQgPSBtYWtlUmVjb3JkKGluamVjdGFibGVEZWZPckluamVjdG9yRGVmRmFjdG9yeSh0b2tlbiksIE5PVF9ZRVQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWNvcmQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJlY29yZHMuc2V0KHRva2VuLCByZWNvcmQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGEgcmVjb3JkIHdhcyBmb3VuZCwgZ2V0IHRoZSBpbnN0YW5jZSBmb3IgaXQgYW5kIHJldHVybiBpdC5cbiAgICAgICAgaWYgKHJlY29yZCAhPSBudWxsIC8qIE5PVCBudWxsIHx8IHVuZGVmaW5lZCAqLykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmh5ZHJhdGUodG9rZW4sIHJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2VsZWN0IHRoZSBuZXh0IGluamVjdG9yIGJhc2VkIG9uIHRoZSBTZWxmIGZsYWcgLSBpZiBzZWxmIGlzIHNldCwgdGhlIG5leHQgaW5qZWN0b3IgaXNcbiAgICAgIC8vIHRoZSBOdWxsSW5qZWN0b3IsIG90aGVyd2lzZSBpdCdzIHRoZSBwYXJlbnQuXG4gICAgICBjb25zdCBuZXh0SW5qZWN0b3IgPSAhKGZsYWdzICYgSW5qZWN0RmxhZ3MuU2VsZikgPyB0aGlzLnBhcmVudCA6IGdldE51bGxJbmplY3RvcigpO1xuICAgICAgLy8gU2V0IHRoZSBub3RGb3VuZFZhbHVlIGJhc2VkIG9uIHRoZSBPcHRpb25hbCBmbGFnIC0gaWYgb3B0aW9uYWwgaXMgc2V0IGFuZCBub3RGb3VuZFZhbHVlXG4gICAgICAvLyBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBpcyBudWxsLCBvdGhlcndpc2UgaXQncyB0aGUgbm90Rm91bmRWYWx1ZS5cbiAgICAgIG5vdEZvdW5kVmFsdWUgPSAoZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCkgJiYgbm90Rm91bmRWYWx1ZSA9PT0gVEhST1dfSUZfTk9UX0ZPVU5EID9cbiAgICAgICAgICBudWxsIDpcbiAgICAgICAgICBub3RGb3VuZFZhbHVlO1xuICAgICAgcmV0dXJuIG5leHRJbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdOdWxsSW5qZWN0b3JFcnJvcicpIHtcbiAgICAgICAgY29uc3QgcGF0aDogYW55W10gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF0gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF0gfHwgW107XG4gICAgICAgIHBhdGgudW5zaGlmdChzdHJpbmdpZnkodG9rZW4pKTtcbiAgICAgICAgaWYgKHByZXZpb3VzSW5qZWN0b3IpIHtcbiAgICAgICAgICAvLyBXZSBzdGlsbCBoYXZlIGEgcGFyZW50IGluamVjdG9yLCBrZWVwIHRocm93aW5nXG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBGb3JtYXQgJiB0aHJvdyB0aGUgZmluYWwgZXJyb3IgbWVzc2FnZSB3aGVuIHdlIGRvbid0IGhhdmUgYW55IHByZXZpb3VzIGluamVjdG9yXG4gICAgICAgICAgcmV0dXJuIGNhdGNoSW5qZWN0b3JFcnJvcihlLCB0b2tlbiwgJ1IzSW5qZWN0b3JFcnJvcicsIHRoaXMuc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgLy8gTGFzdGx5LCBjbGVhbiB1cCB0aGUgc3RhdGUgYnkgcmVzdG9yaW5nIHRoZSBwcmV2aW91cyBpbmplY3Rvci5cbiAgICAgIHNldEN1cnJlbnRJbmplY3RvcihwcmV2aW91c0luamVjdG9yKTtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9yZXNvbHZlSW5qZWN0b3JEZWZUeXBlcygpIHtcbiAgICB0aGlzLmluamVjdG9yRGVmVHlwZXMuZm9yRWFjaChkZWZUeXBlID0+IHRoaXMuZ2V0KGRlZlR5cGUpKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGNvbnN0IHRva2VucyA9IDxzdHJpbmdbXT5bXSwgcmVjb3JkcyA9IHRoaXMucmVjb3JkcztcbiAgICByZWNvcmRzLmZvckVhY2goKHYsIHRva2VuKSA9PiB0b2tlbnMucHVzaChzdHJpbmdpZnkodG9rZW4pKSk7XG4gICAgcmV0dXJuIGBSM0luamVjdG9yWyR7dG9rZW5zLmpvaW4oJywgJyl9XWA7XG4gIH1cblxuICBwcml2YXRlIGFzc2VydE5vdERlc3Ryb3llZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luamVjdG9yIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW4gYEluamVjdG9yVHlwZWAgb3IgYEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnNgIGFuZCBhbGwgb2YgaXRzIHRyYW5zaXRpdmUgcHJvdmlkZXJzXG4gICAqIHRvIHRoaXMgaW5qZWN0b3IuXG4gICAqXG4gICAqIElmIGFuIGBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzYCB0aGF0IGRlY2xhcmVzIHByb3ZpZGVycyBiZXNpZGVzIHRoZSB0eXBlIGlzIHNwZWNpZmllZCxcbiAgICogdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIFwidHJ1ZVwiIHRvIGluZGljYXRlIHRoYXQgdGhlIHByb3ZpZGVycyBvZiB0aGUgdHlwZSBkZWZpbml0aW9uIG5lZWRcbiAgICogdG8gYmUgcHJvY2Vzc2VkLiBUaGlzIGFsbG93cyB1cyB0byBwcm9jZXNzIHByb3ZpZGVycyBvZiBpbmplY3RvciB0eXBlcyBhZnRlciBhbGwgaW1wb3J0cyBvZlxuICAgKiBhbiBpbmplY3RvciBkZWZpbml0aW9uIGFyZSBwcm9jZXNzZWQuIChmb2xsb3dpbmcgVmlldyBFbmdpbmUgc2VtYW50aWNzOiBzZWUgRlctMTM0OSlcbiAgICovXG4gIHByaXZhdGUgcHJvY2Vzc0luamVjdG9yVHlwZShcbiAgICAgIGRlZk9yV3JhcHBlZERlZjogSW5qZWN0b3JUeXBlPGFueT58SW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+LFxuICAgICAgcGFyZW50czogSW5qZWN0b3JUeXBlPGFueT5bXSxcbiAgICAgIGRlZHVwU3RhY2s6IEluamVjdG9yVHlwZTxhbnk+W10pOiBkZWZPcldyYXBwZWREZWYgaXMgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+IHtcbiAgICBkZWZPcldyYXBwZWREZWYgPSByZXNvbHZlRm9yd2FyZFJlZihkZWZPcldyYXBwZWREZWYpO1xuICAgIGlmICghZGVmT3JXcmFwcGVkRGVmKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBFaXRoZXIgdGhlIGRlZk9yV3JhcHBlZERlZiBpcyBhbiBJbmplY3RvclR5cGUgKHdpdGggaW5qZWN0b3IgZGVmKSBvciBhblxuICAgIC8vIEluamVjdG9yRGVmVHlwZVdpdGhQcm92aWRlcnMgKGFrYSBNb2R1bGVXaXRoUHJvdmlkZXJzKS4gRGV0ZWN0aW5nIGVpdGhlciBpcyBhIG1lZ2Ftb3JwaGljXG4gICAgLy8gcmVhZCwgc28gY2FyZSBpcyB0YWtlbiB0byBvbmx5IGRvIHRoZSByZWFkIG9uY2UuXG5cbiAgICAvLyBGaXJzdCBhdHRlbXB0IHRvIHJlYWQgdGhlIGluamVjdG9yIGRlZiAoYMm1aW5qYCkuXG4gICAgbGV0IGRlZiA9IGdldEluamVjdG9yRGVmKGRlZk9yV3JhcHBlZERlZik7XG5cbiAgICAvLyBJZiB0aGF0J3Mgbm90IHByZXNlbnQsIHRoZW4gYXR0ZW1wdCB0byByZWFkIG5nTW9kdWxlIGZyb20gdGhlIEluamVjdG9yRGVmVHlwZVdpdGhQcm92aWRlcnMuXG4gICAgY29uc3QgbmdNb2R1bGUgPVxuICAgICAgICAoZGVmID09IG51bGwpICYmIChkZWZPcldyYXBwZWREZWYgYXMgSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+KS5uZ01vZHVsZSB8fCB1bmRlZmluZWQ7XG5cbiAgICAvLyBEZXRlcm1pbmUgdGhlIEluamVjdG9yVHlwZS4gSW4gdGhlIGNhc2Ugd2hlcmUgYGRlZk9yV3JhcHBlZERlZmAgaXMgYW4gYEluamVjdG9yVHlwZWAsXG4gICAgLy8gdGhlbiB0aGlzIGlzIGVhc3kuIEluIHRoZSBjYXNlIG9mIGFuIEluamVjdG9yRGVmVHlwZVdpdGhQcm92aWRlcnMsIHRoZW4gdGhlIGRlZmluaXRpb24gdHlwZVxuICAgIC8vIGlzIHRoZSBgbmdNb2R1bGVgLlxuICAgIGNvbnN0IGRlZlR5cGU6IEluamVjdG9yVHlwZTxhbnk+ID1cbiAgICAgICAgKG5nTW9kdWxlID09PSB1bmRlZmluZWQpID8gKGRlZk9yV3JhcHBlZERlZiBhcyBJbmplY3RvclR5cGU8YW55PikgOiBuZ01vZHVsZTtcblxuICAgIC8vIENoZWNrIGZvciBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXG4gICAgaWYgKG5nRGV2TW9kZSAmJiBwYXJlbnRzLmluZGV4T2YoZGVmVHlwZSkgIT09IC0xKSB7XG4gICAgICBjb25zdCBkZWZOYW1lID0gc3RyaW5naWZ5KGRlZlR5cGUpO1xuICAgICAgY29uc3QgcGF0aCA9IHBhcmVudHMubWFwKHN0cmluZ2lmeSk7XG4gICAgICB0aHJvd0N5Y2xpY0RlcGVuZGVuY3lFcnJvcihkZWZOYW1lLCBwYXRoKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbXVsdGlwbGUgaW1wb3J0cyBvZiB0aGUgc2FtZSBtb2R1bGVcbiAgICBjb25zdCBpc0R1cGxpY2F0ZSA9IGRlZHVwU3RhY2suaW5kZXhPZihkZWZUeXBlKSAhPT0gLTE7XG5cbiAgICAvLyBGaW5hbGx5LCBpZiBkZWZPcldyYXBwZWRUeXBlIHdhcyBhbiBgSW5qZWN0b3JEZWZUeXBlV2l0aFByb3ZpZGVyc2AsIHRoZW4gdGhlIGFjdHVhbFxuICAgIC8vIGBJbmplY3RvckRlZmAgaXMgb24gaXRzIGBuZ01vZHVsZWAuXG4gICAgaWYgKG5nTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGRlZiA9IGdldEluamVjdG9yRGVmKG5nTW9kdWxlKTtcbiAgICB9XG5cbiAgICAvLyBJZiBubyBkZWZpbml0aW9uIHdhcyBmb3VuZCwgaXQgbWlnaHQgYmUgZnJvbSBleHBvcnRzLiBSZW1vdmUgaXQuXG4gICAgaWYgKGRlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIHByb3ZpZGVycyBpbiB0aGUgc2FtZSB3YXkgdGhhdCBATmdNb2R1bGUgcmVzb2x1dGlvbiBkaWQ6XG5cbiAgICAvLyBGaXJzdCwgaW5jbHVkZSBwcm92aWRlcnMgZnJvbSBhbnkgaW1wb3J0cy5cbiAgICBpZiAoZGVmLmltcG9ydHMgIT0gbnVsbCAmJiAhaXNEdXBsaWNhdGUpIHtcbiAgICAgIC8vIEJlZm9yZSBwcm9jZXNzaW5nIGRlZlR5cGUncyBpbXBvcnRzLCBhZGQgaXQgdG8gdGhlIHNldCBvZiBwYXJlbnRzLiBUaGlzIHdheSwgaWYgaXQgZW5kc1xuICAgICAgLy8gdXAgZGVlcGx5IGltcG9ydGluZyBpdHNlbGYsIHRoaXMgY2FuIGJlIGRldGVjdGVkLlxuICAgICAgbmdEZXZNb2RlICYmIHBhcmVudHMucHVzaChkZWZUeXBlKTtcbiAgICAgIC8vIEFkZCBpdCB0byB0aGUgc2V0IG9mIGRlZHVwcy4gVGhpcyB3YXkgd2UgY2FuIGRldGVjdCBtdWx0aXBsZSBpbXBvcnRzIG9mIHRoZSBzYW1lIG1vZHVsZVxuICAgICAgZGVkdXBTdGFjay5wdXNoKGRlZlR5cGUpO1xuXG4gICAgICBsZXQgaW1wb3J0VHlwZXNXaXRoUHJvdmlkZXJzOiAoSW5qZWN0b3JUeXBlV2l0aFByb3ZpZGVyczxhbnk+W10pfHVuZGVmaW5lZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRlZXBGb3JFYWNoKGRlZi5pbXBvcnRzLCBpbXBvcnRlZCA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0luamVjdG9yVHlwZShpbXBvcnRlZCwgcGFyZW50cywgZGVkdXBTdGFjaykpIHtcbiAgICAgICAgICAgIGlmIChpbXBvcnRUeXBlc1dpdGhQcm92aWRlcnMgPT09IHVuZGVmaW5lZCkgaW1wb3J0VHlwZXNXaXRoUHJvdmlkZXJzID0gW107XG4gICAgICAgICAgICAvLyBJZiB0aGUgcHJvY2Vzc2VkIGltcG9ydCBpcyBhbiBpbmplY3RvciB0eXBlIHdpdGggcHJvdmlkZXJzLCB3ZSBzdG9yZSBpdCBpbiB0aGVcbiAgICAgICAgICAgIC8vIGxpc3Qgb2YgaW1wb3J0IHR5cGVzIHdpdGggcHJvdmlkZXJzLCBzbyB0aGF0IHdlIGNhbiBwcm9jZXNzIHRob3NlIGFmdGVyd2FyZHMuXG4gICAgICAgICAgICBpbXBvcnRUeXBlc1dpdGhQcm92aWRlcnMucHVzaChpbXBvcnRlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIFJlbW92ZSBpdCBmcm9tIHRoZSBwYXJlbnRzIHNldCB3aGVuIGZpbmlzaGVkLlxuICAgICAgICBuZ0Rldk1vZGUgJiYgcGFyZW50cy5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgLy8gSW1wb3J0cyB3aGljaCBhcmUgZGVjbGFyZWQgd2l0aCBwcm92aWRlcnMgKFR5cGVXaXRoUHJvdmlkZXJzKSBuZWVkIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgLy8gYWZ0ZXIgYWxsIGltcG9ydGVkIG1vZHVsZXMgYXJlIHByb2Nlc3NlZC4gVGhpcyBpcyBzaW1pbGFyIHRvIGhvdyBWaWV3IEVuZ2luZVxuICAgICAgLy8gcHJvY2Vzc2VzL21lcmdlcyBtb2R1bGUgaW1wb3J0cyBpbiB0aGUgbWV0YWRhdGEgcmVzb2x2ZXIuIFNlZTogRlctMTM0OS5cbiAgICAgIGlmIChpbXBvcnRUeXBlc1dpdGhQcm92aWRlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltcG9ydFR5cGVzV2l0aFByb3ZpZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHtuZ01vZHVsZSwgcHJvdmlkZXJzfSA9IGltcG9ydFR5cGVzV2l0aFByb3ZpZGVyc1tpXTtcbiAgICAgICAgICBkZWVwRm9yRWFjaChcbiAgICAgICAgICAgICAgcHJvdmlkZXJzISxcbiAgICAgICAgICAgICAgcHJvdmlkZXIgPT4gdGhpcy5wcm9jZXNzUHJvdmlkZXIocHJvdmlkZXIsIG5nTW9kdWxlLCBwcm92aWRlcnMgfHwgRU1QVFlfQVJSQVkpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBUcmFjayB0aGUgSW5qZWN0b3JUeXBlIGFuZCBhZGQgYSBwcm92aWRlciBmb3IgaXQuIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhpcyBpcyBkb25lIGFmdGVyIHRoZVxuICAgIC8vIGRlZidzIGltcG9ydHMuXG4gICAgdGhpcy5pbmplY3RvckRlZlR5cGVzLmFkZChkZWZUeXBlKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gZ2V0RmFjdG9yeURlZihkZWZUeXBlKSB8fCAoKCkgPT4gbmV3IGRlZlR5cGUoKSk7XG4gICAgdGhpcy5yZWNvcmRzLnNldChkZWZUeXBlLCBtYWtlUmVjb3JkKGZhY3RvcnksIE5PVF9ZRVQpKTtcblxuICAgIC8vIE5leHQsIGluY2x1ZGUgcHJvdmlkZXJzIGxpc3RlZCBvbiB0aGUgZGVmaW5pdGlvbiBpdHNlbGYuXG4gICAgY29uc3QgZGVmUHJvdmlkZXJzID0gZGVmLnByb3ZpZGVycztcbiAgICBpZiAoZGVmUHJvdmlkZXJzICE9IG51bGwgJiYgIWlzRHVwbGljYXRlKSB7XG4gICAgICBjb25zdCBpbmplY3RvclR5cGUgPSBkZWZPcldyYXBwZWREZWYgYXMgSW5qZWN0b3JUeXBlPGFueT47XG4gICAgICBkZWVwRm9yRWFjaChcbiAgICAgICAgICBkZWZQcm92aWRlcnMsIHByb3ZpZGVyID0+IHRoaXMucHJvY2Vzc1Byb3ZpZGVyKHByb3ZpZGVyLCBpbmplY3RvclR5cGUsIGRlZlByb3ZpZGVycykpO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIG5nTW9kdWxlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgKGRlZk9yV3JhcHBlZERlZiBhcyBJbmplY3RvclR5cGVXaXRoUHJvdmlkZXJzPGFueT4pLnByb3ZpZGVycyAhPT0gdW5kZWZpbmVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIGEgYFNpbmdsZVByb3ZpZGVyYCBhbmQgYWRkIGl0LlxuICAgKi9cbiAgcHJpdmF0ZSBwcm9jZXNzUHJvdmlkZXIoXG4gICAgICBwcm92aWRlcjogU2luZ2xlUHJvdmlkZXIsIG5nTW9kdWxlVHlwZTogSW5qZWN0b3JUeXBlPGFueT4sIHByb3ZpZGVyczogYW55W10pOiB2b2lkIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIHRva2VuIGZyb20gdGhlIHByb3ZpZGVyLiBFaXRoZXIgaXQncyBpdHMgb3duIHRva2VuLCBvciBoYXMgYSB7cHJvdmlkZTogLi4ufVxuICAgIC8vIHByb3BlcnR5LlxuICAgIHByb3ZpZGVyID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIpO1xuICAgIGxldCB0b2tlbjogYW55ID1cbiAgICAgICAgaXNUeXBlUHJvdmlkZXIocHJvdmlkZXIpID8gcHJvdmlkZXIgOiByZXNvbHZlRm9yd2FyZFJlZihwcm92aWRlciAmJiBwcm92aWRlci5wcm92aWRlKTtcblxuICAgIC8vIENvbnN0cnVjdCBhIGBSZWNvcmRgIGZvciB0aGUgcHJvdmlkZXIuXG4gICAgY29uc3QgcmVjb3JkID0gcHJvdmlkZXJUb1JlY29yZChwcm92aWRlciwgbmdNb2R1bGVUeXBlLCBwcm92aWRlcnMpO1xuXG4gICAgaWYgKCFpc1R5cGVQcm92aWRlcihwcm92aWRlcikgJiYgcHJvdmlkZXIubXVsdGkgPT09IHRydWUpIHtcbiAgICAgIC8vIElmIHRoZSBwcm92aWRlciBpbmRpY2F0ZXMgdGhhdCBpdCdzIGEgbXVsdGktcHJvdmlkZXIsIHByb2Nlc3MgaXQgc3BlY2lhbGx5LlxuICAgICAgLy8gRmlyc3QgY2hlY2sgd2hldGhlciBpdCdzIGJlZW4gZGVmaW5lZCBhbHJlYWR5LlxuICAgICAgbGV0IG11bHRpUmVjb3JkID0gdGhpcy5yZWNvcmRzLmdldCh0b2tlbik7XG4gICAgICBpZiAobXVsdGlSZWNvcmQpIHtcbiAgICAgICAgLy8gSXQgaGFzLiBUaHJvdyBhIG5pY2UgZXJyb3IgaWZcbiAgICAgICAgaWYgKG5nRGV2TW9kZSAmJiBtdWx0aVJlY29yZC5tdWx0aSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3dNaXhlZE11bHRpUHJvdmlkZXJFcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtdWx0aVJlY29yZCA9IG1ha2VSZWNvcmQodW5kZWZpbmVkLCBOT1RfWUVULCB0cnVlKTtcbiAgICAgICAgbXVsdGlSZWNvcmQuZmFjdG9yeSA9ICgpID0+IGluamVjdEFyZ3MobXVsdGlSZWNvcmQhLm11bHRpISk7XG4gICAgICAgIHRoaXMucmVjb3Jkcy5zZXQodG9rZW4sIG11bHRpUmVjb3JkKTtcbiAgICAgIH1cbiAgICAgIHRva2VuID0gcHJvdmlkZXI7XG4gICAgICBtdWx0aVJlY29yZC5tdWx0aSEucHVzaChwcm92aWRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5yZWNvcmRzLmdldCh0b2tlbik7XG4gICAgICBpZiAobmdEZXZNb2RlICYmIGV4aXN0aW5nICYmIGV4aXN0aW5nLm11bHRpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3dNaXhlZE11bHRpUHJvdmlkZXJFcnJvcigpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29yZHMuc2V0KHRva2VuLCByZWNvcmQpO1xuICB9XG5cbiAgcHJpdmF0ZSBoeWRyYXRlPFQ+KHRva2VuOiBUeXBlPFQ+fEFic3RyYWN0VHlwZTxUPnxJbmplY3Rpb25Ub2tlbjxUPiwgcmVjb3JkOiBSZWNvcmQ8VD4pOiBUIHtcbiAgICBpZiAobmdEZXZNb2RlICYmIHJlY29yZC52YWx1ZSA9PT0gQ0lSQ1VMQVIpIHtcbiAgICAgIHRocm93Q3ljbGljRGVwZW5kZW5jeUVycm9yKHN0cmluZ2lmeSh0b2tlbikpO1xuICAgIH0gZWxzZSBpZiAocmVjb3JkLnZhbHVlID09PSBOT1RfWUVUKSB7XG4gICAgICByZWNvcmQudmFsdWUgPSBDSVJDVUxBUjtcbiAgICAgIHJlY29yZC52YWx1ZSA9IHJlY29yZC5mYWN0b3J5ISgpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlY29yZC52YWx1ZSA9PT0gJ29iamVjdCcgJiYgcmVjb3JkLnZhbHVlICYmIGhhc09uRGVzdHJveShyZWNvcmQudmFsdWUpKSB7XG4gICAgICB0aGlzLm9uRGVzdHJveS5hZGQocmVjb3JkLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlY29yZC52YWx1ZSBhcyBUO1xuICB9XG5cbiAgcHJpdmF0ZSBpbmplY3RhYmxlRGVmSW5TY29wZShkZWY6IMm1ybVJbmplY3RhYmxlRGVmPGFueT4pOiBib29sZWFuIHtcbiAgICBpZiAoIWRlZi5wcm92aWRlZEluKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmLnByb3ZpZGVkSW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gZGVmLnByb3ZpZGVkSW4gPT09ICdhbnknIHx8IChkZWYucHJvdmlkZWRJbiA9PT0gdGhpcy5zY29wZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluamVjdG9yRGVmVHlwZXMuaGFzKGRlZi5wcm92aWRlZEluKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5qZWN0YWJsZURlZk9ySW5qZWN0b3JEZWZGYWN0b3J5KHRva2VuOiBUeXBlPGFueT58QWJzdHJhY3RUeXBlPGFueT58XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5qZWN0aW9uVG9rZW48YW55Pik6IEZhY3RvcnlGbjxhbnk+IHtcbiAgLy8gTW9zdCB0b2tlbnMgd2lsbCBoYXZlIGFuIGluamVjdGFibGUgZGVmIGRpcmVjdGx5IG9uIHRoZW0sIHdoaWNoIHNwZWNpZmllcyBhIGZhY3RvcnkgZGlyZWN0bHkuXG4gIGNvbnN0IGluamVjdGFibGVEZWYgPSBnZXRJbmplY3RhYmxlRGVmKHRva2VuKTtcbiAgY29uc3QgZmFjdG9yeSA9IGluamVjdGFibGVEZWYgIT09IG51bGwgPyBpbmplY3RhYmxlRGVmLmZhY3RvcnkgOiBnZXRGYWN0b3J5RGVmKHRva2VuKTtcblxuICBpZiAoZmFjdG9yeSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWN0b3J5O1xuICB9XG5cbiAgLy8gSW5qZWN0aW9uVG9rZW5zIHNob3VsZCBoYXZlIGFuIGluamVjdGFibGUgZGVmICjJtXByb3YpIGFuZCB0aHVzIHNob3VsZCBiZSBoYW5kbGVkIGFib3ZlLlxuICAvLyBJZiBpdCdzIG1pc3NpbmcgdGhhdCwgaXQncyBhbiBlcnJvci5cbiAgaWYgKHRva2VuIGluc3RhbmNlb2YgSW5qZWN0aW9uVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRva2VuICR7c3RyaW5naWZ5KHRva2VuKX0gaXMgbWlzc2luZyBhIMm1cHJvdiBkZWZpbml0aW9uLmApO1xuICB9XG5cbiAgLy8gVW5kZWNvcmF0ZWQgdHlwZXMgY2FuIHNvbWV0aW1lcyBiZSBjcmVhdGVkIGlmIHRoZXkgaGF2ZSBubyBjb25zdHJ1Y3RvciBhcmd1bWVudHMuXG4gIGlmICh0b2tlbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIGdldFVuZGVjb3JhdGVkSW5qZWN0YWJsZUZhY3RvcnkodG9rZW4pO1xuICB9XG5cbiAgLy8gVGhlcmUgd2FzIG5vIHdheSB0byByZXNvbHZlIGEgZmFjdG9yeSBmb3IgdGhpcyB0b2tlbi5cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnJlYWNoYWJsZScpO1xufVxuXG5mdW5jdGlvbiBnZXRVbmRlY29yYXRlZEluamVjdGFibGVGYWN0b3J5KHRva2VuOiBGdW5jdGlvbikge1xuICAvLyBJZiB0aGUgdG9rZW4gaGFzIHBhcmFtZXRlcnMgdGhlbiBpdCBoYXMgZGVwZW5kZW5jaWVzIHRoYXQgd2UgY2Fubm90IHJlc29sdmUgaW1wbGljaXRseS5cbiAgY29uc3QgcGFyYW1MZW5ndGggPSB0b2tlbi5sZW5ndGg7XG4gIGlmIChwYXJhbUxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IG5ld0FycmF5KHBhcmFtTGVuZ3RoLCAnPycpO1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2FuJ3QgcmVzb2x2ZSBhbGwgcGFyYW1ldGVycyBmb3IgJHtzdHJpbmdpZnkodG9rZW4pfTogKCR7YXJncy5qb2luKCcsICcpfSkuYCk7XG4gIH1cblxuICAvLyBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gYXBwZWFycyB0byBoYXZlIG5vIHBhcmFtZXRlcnMuXG4gIC8vIFRoaXMgbWlnaHQgYmUgYmVjYXVzZSBpdCBpbmhlcml0cyBmcm9tIGEgc3VwZXItY2xhc3MuIEluIHdoaWNoIGNhc2UsIHVzZSBhbiBpbmplY3RhYmxlXG4gIC8vIGRlZiBmcm9tIGFuIGFuY2VzdG9yIGlmIHRoZXJlIGlzIG9uZS5cbiAgLy8gT3RoZXJ3aXNlIHRoaXMgcmVhbGx5IGlzIGEgc2ltcGxlIGNsYXNzIHdpdGggbm8gZGVwZW5kZW5jaWVzLCBzbyByZXR1cm4gYSBmYWN0b3J5IHRoYXRcbiAgLy8ganVzdCBpbnN0YW50aWF0ZXMgdGhlIHplcm8tYXJnIGNvbnN0cnVjdG9yLlxuICBjb25zdCBpbmhlcml0ZWRJbmplY3RhYmxlRGVmID0gZ2V0SW5oZXJpdGVkSW5qZWN0YWJsZURlZih0b2tlbik7XG4gIGlmIChpbmhlcml0ZWRJbmplY3RhYmxlRGVmICE9PSBudWxsKSB7XG4gICAgcmV0dXJuICgpID0+IGluaGVyaXRlZEluamVjdGFibGVEZWYuZmFjdG9yeSh0b2tlbiBhcyBUeXBlPGFueT4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoKSA9PiBuZXcgKHRva2VuIGFzIFR5cGU8YW55PikoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm92aWRlclRvUmVjb3JkKFxuICAgIHByb3ZpZGVyOiBTaW5nbGVQcm92aWRlciwgbmdNb2R1bGVUeXBlOiBJbmplY3RvclR5cGU8YW55PiwgcHJvdmlkZXJzOiBhbnlbXSk6IFJlY29yZDxhbnk+IHtcbiAgaWYgKGlzVmFsdWVQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICByZXR1cm4gbWFrZVJlY29yZCh1bmRlZmluZWQsIHByb3ZpZGVyLnVzZVZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBmYWN0b3J5OiAoKCkgPT4gYW55KXx1bmRlZmluZWQgPSBwcm92aWRlclRvRmFjdG9yeShwcm92aWRlciwgbmdNb2R1bGVUeXBlLCBwcm92aWRlcnMpO1xuICAgIHJldHVybiBtYWtlUmVjb3JkKGZhY3RvcnksIE5PVF9ZRVQpO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBgU2luZ2xlUHJvdmlkZXJgIGludG8gYSBmYWN0b3J5IGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSBwcm92aWRlciBwcm92aWRlciB0byBjb252ZXJ0IHRvIGZhY3RvcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVyVG9GYWN0b3J5KFxuICAgIHByb3ZpZGVyOiBTaW5nbGVQcm92aWRlciwgbmdNb2R1bGVUeXBlPzogSW5qZWN0b3JUeXBlPGFueT4sIHByb3ZpZGVycz86IGFueVtdKTogKCkgPT4gYW55IHtcbiAgbGV0IGZhY3Rvcnk6ICgoKSA9PiBhbnkpfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgaWYgKGlzVHlwZVByb3ZpZGVyKHByb3ZpZGVyKSkge1xuICAgIGNvbnN0IHVud3JhcHBlZFByb3ZpZGVyID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIpO1xuICAgIHJldHVybiBnZXRGYWN0b3J5RGVmKHVud3JhcHBlZFByb3ZpZGVyKSB8fCBpbmplY3RhYmxlRGVmT3JJbmplY3RvckRlZkZhY3RvcnkodW53cmFwcGVkUHJvdmlkZXIpO1xuICB9IGVsc2Uge1xuICAgIGlmIChpc1ZhbHVlUHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICBmYWN0b3J5ID0gKCkgPT4gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIudXNlVmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoaXNGYWN0b3J5UHJvdmlkZXIocHJvdmlkZXIpKSB7XG4gICAgICBmYWN0b3J5ID0gKCkgPT4gcHJvdmlkZXIudXNlRmFjdG9yeSguLi5pbmplY3RBcmdzKHByb3ZpZGVyLmRlcHMgfHwgW10pKTtcbiAgICB9IGVsc2UgaWYgKGlzRXhpc3RpbmdQcm92aWRlcihwcm92aWRlcikpIHtcbiAgICAgIGZhY3RvcnkgPSAoKSA9PiDJtcm1aW5qZWN0KHJlc29sdmVGb3J3YXJkUmVmKHByb3ZpZGVyLnVzZUV4aXN0aW5nKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNsYXNzUmVmID0gcmVzb2x2ZUZvcndhcmRSZWYoXG4gICAgICAgICAgcHJvdmlkZXIgJiZcbiAgICAgICAgICAoKHByb3ZpZGVyIGFzIFN0YXRpY0NsYXNzUHJvdmlkZXIgfCBDbGFzc1Byb3ZpZGVyKS51c2VDbGFzcyB8fCBwcm92aWRlci5wcm92aWRlKSk7XG4gICAgICBpZiAobmdEZXZNb2RlICYmICFjbGFzc1JlZikge1xuICAgICAgICB0aHJvd0ludmFsaWRQcm92aWRlckVycm9yKG5nTW9kdWxlVHlwZSwgcHJvdmlkZXJzLCBwcm92aWRlcik7XG4gICAgICB9XG4gICAgICBpZiAoaGFzRGVwcyhwcm92aWRlcikpIHtcbiAgICAgICAgZmFjdG9yeSA9ICgpID0+IG5ldyAoY2xhc3NSZWYpKC4uLmluamVjdEFyZ3MocHJvdmlkZXIuZGVwcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGdldEZhY3RvcnlEZWYoY2xhc3NSZWYpIHx8IGluamVjdGFibGVEZWZPckluamVjdG9yRGVmRmFjdG9yeShjbGFzc1JlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWN0b3J5O1xufVxuXG5mdW5jdGlvbiBtYWtlUmVjb3JkPFQ+KFxuICAgIGZhY3Rvcnk6ICgoKSA9PiBUKXx1bmRlZmluZWQsIHZhbHVlOiBUfHt9LCBtdWx0aTogYm9vbGVhbiA9IGZhbHNlKTogUmVjb3JkPFQ+IHtcbiAgcmV0dXJuIHtcbiAgICBmYWN0b3J5OiBmYWN0b3J5LFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBtdWx0aTogbXVsdGkgPyBbXSA6IHVuZGVmaW5lZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNWYWx1ZVByb3ZpZGVyKHZhbHVlOiBTaW5nbGVQcm92aWRlcik6IHZhbHVlIGlzIFZhbHVlUHJvdmlkZXIge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnICYmIFVTRV9WQUxVRSBpbiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaXNFeGlzdGluZ1Byb3ZpZGVyKHZhbHVlOiBTaW5nbGVQcm92aWRlcik6IHZhbHVlIGlzIEV4aXN0aW5nUHJvdmlkZXIge1xuICByZXR1cm4gISEodmFsdWUgJiYgKHZhbHVlIGFzIEV4aXN0aW5nUHJvdmlkZXIpLnVzZUV4aXN0aW5nKTtcbn1cblxuZnVuY3Rpb24gaXNGYWN0b3J5UHJvdmlkZXIodmFsdWU6IFNpbmdsZVByb3ZpZGVyKTogdmFsdWUgaXMgRmFjdG9yeVByb3ZpZGVyIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmICh2YWx1ZSBhcyBGYWN0b3J5UHJvdmlkZXIpLnVzZUZhY3RvcnkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlUHJvdmlkZXIodmFsdWU6IFNpbmdsZVByb3ZpZGVyKTogdmFsdWUgaXMgVHlwZVByb3ZpZGVyIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xhc3NQcm92aWRlcih2YWx1ZTogU2luZ2xlUHJvdmlkZXIpOiB2YWx1ZSBpcyBDbGFzc1Byb3ZpZGVyIHtcbiAgcmV0dXJuICEhKHZhbHVlIGFzIFN0YXRpY0NsYXNzUHJvdmlkZXIgfCBDbGFzc1Byb3ZpZGVyKS51c2VDbGFzcztcbn1cblxuZnVuY3Rpb24gaGFzRGVwcyh2YWx1ZTogQ2xhc3NQcm92aWRlcnxDb25zdHJ1Y3RvclByb3ZpZGVyfFxuICAgICAgICAgICAgICAgICBTdGF0aWNDbGFzc1Byb3ZpZGVyKTogdmFsdWUgaXMgQ2xhc3NQcm92aWRlciZ7ZGVwczogYW55W119IHtcbiAgcmV0dXJuICEhKHZhbHVlIGFzIGFueSkuZGVwcztcbn1cblxuZnVuY3Rpb24gaGFzT25EZXN0cm95KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBPbkRlc3Ryb3kge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mICh2YWx1ZSBhcyBPbkRlc3Ryb3kpLm5nT25EZXN0cm95ID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBjb3VsZEJlSW5qZWN0YWJsZVR5cGUodmFsdWU6IGFueSk6IHZhbHVlIGlzIFR5cGU8YW55PnxBYnN0cmFjdFR5cGU8YW55PnxcbiAgICBJbmplY3Rpb25Ub2tlbjxhbnk+IHtcbiAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHx8XG4gICAgICAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEluamVjdGlvblRva2VuKTtcbn1cbiJdfQ==