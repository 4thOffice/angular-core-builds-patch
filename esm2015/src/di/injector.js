/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { stringify } from '../util';
import { getClosureSafeProperty } from '../util/property';
import { defineInjectable, getInjectableDef } from './defs';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { Inject, Optional, Self, SkipSelf } from './metadata';
/** @type {?} */
export const SOURCE = '__source';
/** @type {?} */
const _THROW_IF_NOT_FOUND = new Object();
/** @type {?} */
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
/** *
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * \@experimental
  @type {?} */
export const INJECTOR = new InjectionToken('INJECTOR');
export class NullInjector {
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            // Intentionally left behind: With dev tools open the debugger will stop here. There is no
            // reason why correctly written application should cause this exception.
            // TODO(misko): uncomment the next line once `ngDevMode` works with closure.
            // if(ngDevMode) debugger;
            throw new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
        }
        return notFoundValue;
    }
}
/**
 * Concrete injectors implement this interface.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {\@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 *
 * @abstract
 */
export class Injector {
    /**
     * Create a new Injector which is configure using `StaticProvider`s.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
     * @param {?} options
     * @param {?=} parent
     * @return {?}
     */
    static create(options, parent) {
        if (Array.isArray(options)) {
            return new StaticInjector(options, parent);
        }
        else {
            return new StaticInjector(options.providers, options.parent, options.name || null);
        }
    }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new NullInjector();
Injector.ngInjectableDef = defineInjectable({
    providedIn: /** @type {?} */ ('any'),
    factory: () => inject(INJECTOR),
});
if (false) {
    /** @type {?} */
    Injector.THROW_IF_NOT_FOUND;
    /** @type {?} */
    Injector.NULL;
    /** @type {?} */
    Injector.ngInjectableDef;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     * @abstract
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?} The instance from the injector if defined, otherwise the `notFoundValue`.
     */
    Injector.prototype.get = function (token, notFoundValue, flags) { };
    /**
     * @deprecated from v4.0.0 use Type<T> or InjectionToken<T>
     * @suppress {duplicate}
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    Injector.prototype.get = function (token, notFoundValue) { };
}
/** @type {?} */
const IDENT = function (value) {
    return value;
};
/** @type {?} */
const EMPTY = /** @type {?} */ ([]);
/** @type {?} */
const CIRCULAR = IDENT;
/** @type {?} */
const MULTI_PROVIDER_FN = function () {
    return Array.prototype.slice.call(arguments);
};
/** @type {?} */
export const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: getClosureSafeProperty });
/** @type {?} */
const NG_TOKEN_PATH = 'ngTokenPath';
/** @type {?} */
const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
/** @enum {number} */
var OptionFlags = {
    Optional: 1,
    CheckSelf: 2,
    CheckParent: 4,
    Default: 6,
};
/** @type {?} */
const NULL_INJECTOR = Injector.NULL;
/** @type {?} */
const NEW_LINE = /\n/gm;
/** @type {?} */
const NO_NEW_LINE = 'ɵ';
export class StaticInjector {
    /**
     * @param {?} providers
     * @param {?=} parent
     * @param {?=} source
     */
    constructor(providers, parent = NULL_INJECTOR, source = null) {
        this.parent = parent;
        this.source = source;
        /** @type {?} */
        const records = this._records = new Map();
        records.set(Injector, /** @type {?} */ ({ token: Injector, fn: IDENT, deps: EMPTY, value: this, useNew: false }));
        records.set(INJECTOR, /** @type {?} */ ({ token: INJECTOR, fn: IDENT, deps: EMPTY, value: this, useNew: false }));
        recursivelyProcessProviders(records, providers);
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    get(token, notFoundValue, flags = 0 /* Default */) {
        /** @type {?} */
        const record = this._records.get(token);
        try {
            return tryResolveToken(token, record, this._records, this.parent, notFoundValue, flags);
        }
        catch (e) {
            /** @type {?} */
            const tokenPath = e[NG_TEMP_TOKEN_PATH];
            if (token[SOURCE]) {
                tokenPath.unshift(token[SOURCE]);
            }
            e.message = formatError('\n' + e.message, tokenPath, this.source);
            e[NG_TOKEN_PATH] = tokenPath;
            e[NG_TEMP_TOKEN_PATH] = null;
            throw e;
        }
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const tokens = /** @type {?} */ ([]);
        /** @type {?} */
        const records = this._records;
        records.forEach((v, token) => tokens.push(stringify(token)));
        return `StaticInjector[${tokens.join(', ')}]`;
    }
}
if (false) {
    /** @type {?} */
    StaticInjector.prototype.parent;
    /** @type {?} */
    StaticInjector.prototype.source;
    /** @type {?} */
    StaticInjector.prototype._records;
}
/** @typedef {?} */
var SupportedProvider;
/**
 * @record
 */
function Record() { }
/** @type {?} */
Record.prototype.fn;
/** @type {?} */
Record.prototype.useNew;
/** @type {?} */
Record.prototype.deps;
/** @type {?} */
Record.prototype.value;
/**
 * @record
 */
function DependencyRecord() { }
/** @type {?} */
DependencyRecord.prototype.token;
/** @type {?} */
DependencyRecord.prototype.options;
/** @typedef {?} */
var TokenPath;
/**
 * @param {?} provider
 * @return {?}
 */
function resolveProvider(provider) {
    /** @type {?} */
    const deps = computeDeps(provider);
    /** @type {?} */
    let fn = IDENT;
    /** @type {?} */
    let value = EMPTY;
    /** @type {?} */
    let useNew = false;
    /** @type {?} */
    let provide = resolveForwardRef(provider.provide);
    if (USE_VALUE in provider) {
        // We need to use USE_VALUE in provider since provider.useValue could be defined as undefined.
        value = (/** @type {?} */ (provider)).useValue;
    }
    else if ((/** @type {?} */ (provider)).useFactory) {
        fn = (/** @type {?} */ (provider)).useFactory;
    }
    else if ((/** @type {?} */ (provider)).useExisting) {
        // Just use IDENT
    }
    else if ((/** @type {?} */ (provider)).useClass) {
        useNew = true;
        fn = resolveForwardRef((/** @type {?} */ (provider)).useClass);
    }
    else if (typeof provide == 'function') {
        useNew = true;
        fn = provide;
    }
    else {
        throw staticError('StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable', provider);
    }
    return { deps, fn, useNew, value };
}
/**
 * @param {?} token
 * @return {?}
 */
function multiProviderMixError(token) {
    return staticError('Cannot mix multi providers and regular providers', token);
}
/**
 * @param {?} records
 * @param {?} provider
 * @return {?}
 */
function recursivelyProcessProviders(records, provider) {
    if (provider) {
        provider = resolveForwardRef(provider);
        if (provider instanceof Array) {
            // if we have an array recurse into the array
            for (let i = 0; i < provider.length; i++) {
                recursivelyProcessProviders(records, provider[i]);
            }
        }
        else if (typeof provider === 'function') {
            // Functions were supported in ReflectiveInjector, but are not here. For safety give useful
            // error messages
            throw staticError('Function/Class not supported', provider);
        }
        else if (provider && typeof provider === 'object' && provider.provide) {
            /** @type {?} */
            let token = resolveForwardRef(provider.provide);
            /** @type {?} */
            const resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                /** @type {?} */
                let multiProvider = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                }
                else {
                    // Create a placeholder factory which will look up the constituents of the multi provider.
                    records.set(token, multiProvider = /** @type {?} */ ({
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY
                    }));
                }
                // Treat the provider as the token.
                token = provider;
                multiProvider.deps.push({ token, options: 6 /* Default */ });
            }
            /** @type {?} */
            const record = records.get(token);
            if (record && record.fn == MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            records.set(token, resolvedProvider);
        }
        else {
            throw staticError('Unexpected provider', provider);
        }
    }
}
/**
 * @param {?} token
 * @param {?} record
 * @param {?} records
 * @param {?} parent
 * @param {?} notFoundValue
 * @param {?} flags
 * @return {?}
 */
function tryResolveToken(token, record, records, parent, notFoundValue, flags) {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    }
    catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        /** @type {?} */
        const path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (record && record.value == CIRCULAR) {
            // Reset the Circular flag.
            record.value = EMPTY;
        }
        throw e;
    }
}
/**
 * @param {?} token
 * @param {?} record
 * @param {?} records
 * @param {?} parent
 * @param {?} notFoundValue
 * @param {?} flags
 * @return {?}
 */
function resolveToken(token, record, records, parent, notFoundValue, flags) {
    /** @type {?} */
    let value;
    if (record && !(flags & 4 /* SkipSelf */)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        value = record.value;
        if (value == CIRCULAR) {
            throw Error(NO_NEW_LINE + 'Circular dependency');
        }
        else if (value === EMPTY) {
            record.value = CIRCULAR;
            /** @type {?} */
            let obj = undefined;
            /** @type {?} */
            let useNew = record.useNew;
            /** @type {?} */
            let fn = record.fn;
            /** @type {?} */
            let depRecords = record.deps;
            /** @type {?} */
            let deps = EMPTY;
            if (depRecords.length) {
                deps = [];
                for (let i = 0; i < depRecords.length; i++) {
                    /** @type {?} */
                    const depRecord = depRecords[i];
                    /** @type {?} */
                    const options = depRecord.options;
                    /** @type {?} */
                    const childRecord = options & 2 /* CheckSelf */ ? records.get(depRecord.token) : undefined;
                    deps.push(tryResolveToken(
                    // Current Token to resolve
                    depRecord.token, childRecord, records, 
                    // If we don't know how to resolve dependency and we should not check parent for it,
                    // than pass in Null injector.
                    !childRecord && !(options & 4 /* CheckParent */) ? NULL_INJECTOR : parent, options & 1 /* Optional */ ? null : Injector.THROW_IF_NOT_FOUND, 0 /* Default */));
                }
            }
            record.value = value = useNew ? new (/** @type {?} */ (fn))(...deps) : fn.apply(obj, deps);
        }
    }
    else if (!(flags & 2 /* Self */)) {
        value = parent.get(token, notFoundValue, 0 /* Default */);
    }
    return value;
}
/**
 * @param {?} provider
 * @return {?}
 */
function computeDeps(provider) {
    /** @type {?} */
    let deps = EMPTY;
    /** @type {?} */
    const providerDeps = (/** @type {?} */ (provider)).deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (let i = 0; i < providerDeps.length; i++) {
            /** @type {?} */
            let options = 6 /* Default */;
            /** @type {?} */
            let token = resolveForwardRef(providerDeps[i]);
            if (token instanceof Array) {
                for (let j = 0, annotations = token; j < annotations.length; j++) {
                    /** @type {?} */
                    const annotation = annotations[j];
                    if (annotation instanceof Optional || annotation == Optional) {
                        options = options | 1 /* Optional */;
                    }
                    else if (annotation instanceof SkipSelf || annotation == SkipSelf) {
                        options = options & ~2 /* CheckSelf */;
                    }
                    else if (annotation instanceof Self || annotation == Self) {
                        options = options & ~4 /* CheckParent */;
                    }
                    else if (annotation instanceof Inject) {
                        token = (/** @type {?} */ (annotation)).token;
                    }
                    else {
                        token = resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({ token, options });
        }
    }
    else if ((/** @type {?} */ (provider)).useExisting) {
        /** @type {?} */
        const token = resolveForwardRef((/** @type {?} */ (provider)).useExisting);
        deps = [{ token, options: 6 /* Default */ }];
    }
    else if (!providerDeps && !(USE_VALUE in provider)) {
        // useValue & useExisting are the only ones which are exempt from deps all others need it.
        throw staticError('\'deps\' required', provider);
    }
    return deps;
}
/**
 * @param {?} text
 * @param {?} obj
 * @param {?=} source
 * @return {?}
 */
function formatError(text, obj, source = null) {
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    /** @type {?} */
    let context = stringify(obj);
    if (obj instanceof Array) {
        context = obj.map(stringify).join(' -> ');
    }
    else if (typeof obj === 'object') {
        /** @type {?} */
        let parts = /** @type {?} */ ([]);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                /** @type {?} */
                let value = obj[key];
                parts.push(key + ':' + (typeof value === 'string' ? JSON.stringify(value) : stringify(value)));
            }
        }
        context = `{${parts.join(', ')}}`;
    }
    return `StaticInjectorError${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}
/**
 * @param {?} text
 * @param {?} obj
 * @return {?}
 */
function staticError(text, obj) {
    return new Error(formatError(text, obj));
}
/** @enum {number} */
var InjectFlags = {
    Default: 0,
    /**
       * Specifies that an injector should retrieve a dependency from any injector until reaching the
       * host element of the current component. (Only used with Element Injector)
       */
    Host: 1,
    /** Don't descend into ancestors of the node requesting injection. */
    Self: 2,
    /** Skip the node that is requesting injection. */
    SkipSelf: 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional: 8,
};
export { InjectFlags };
/** *
 * Current injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - `null`: `inject` can be called but there is no injector (limp-mode).
 * - Injector instance: Use the injector for resolution.
  @type {?} */
let _currentInjector = undefined;
/**
 * @param {?} injector
 * @return {?}
 */
export function setCurrentInjector(injector) {
    /** @type {?} */
    const former = _currentInjector;
    _currentInjector = injector;
    return former;
}
/**
 * @template T
 * @param {?} token
 * @param {?=} flags
 * @return {?}
 */
export function inject(token, flags = 0 /* Default */) {
    if (_currentInjector === undefined) {
        throw new Error(`inject() must be called from an injection context`);
    }
    else if (_currentInjector === null) {
        /** @type {?} */
        const injectableDef = getInjectableDef(token);
        if (injectableDef && injectableDef.providedIn == 'root') {
            return injectableDef.value === undefined ? injectableDef.value = injectableDef.factory() :
                injectableDef.value;
        }
        if (flags & 8 /* Optional */)
            return null;
        throw new Error(`Injector: NOT_FOUND [${stringify(token)}]`);
    }
    else {
        return _currentInjector.get(token, flags & 8 /* Optional */ ? null : undefined, flags);
    }
}
/**
 * @param {?} types
 * @return {?}
 */
export function injectArgs(types) {
    /** @type {?} */
    const args = [];
    for (let i = 0; i < types.length; i++) {
        /** @type {?} */
        const arg = types[i];
        if (Array.isArray(arg)) {
            if (arg.length === 0) {
                throw new Error('Arguments array must have arguments.');
            }
            /** @type {?} */
            let type = undefined;
            /** @type {?} */
            let flags = 0 /* Default */;
            for (let j = 0; j < arg.length; j++) {
                /** @type {?} */
                const meta = arg[j];
                if (meta instanceof Optional || meta.ngMetadataName === 'Optional') {
                    flags |= 8 /* Optional */;
                }
                else if (meta instanceof SkipSelf || meta.ngMetadataName === 'SkipSelf') {
                    flags |= 4 /* SkipSelf */;
                }
                else if (meta instanceof Self || meta.ngMetadataName === 'Self') {
                    flags |= 2 /* Self */;
                }
                else if (meta instanceof Inject) {
                    type = meta.token;
                }
                else {
                    type = meta;
                }
            }
            args.push(inject(/** @type {?} */ ((type)), flags));
        }
        else {
            args.push(inject(arg));
        }
    }
    return args;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFeEQsT0FBTyxFQUFnQixnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUN6RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7O0FBRzVELGFBQWEsTUFBTSxHQUFHLFVBQVUsQ0FBQzs7QUFDakMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDOztBQUN6QyxhQUFhLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDOzs7Ozs7Ozs7QUFVdEQsYUFBYSxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQVcsVUFBVSxDQUFDLENBQUM7QUFFakUsTUFBTSxPQUFPLFlBQVk7Ozs7OztJQUN2QixHQUFHLENBQUMsS0FBVSxFQUFFLGdCQUFxQixtQkFBbUI7UUFDdEQsSUFBSSxhQUFhLEtBQUssbUJBQW1CLEVBQUU7Ozs7O1lBS3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUU7UUFDRCxPQUFPLGFBQWEsQ0FBQztLQUN0QjtDQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkQsTUFBTSxPQUFnQixRQUFROzs7Ozs7Ozs7Ozs7SUErQjVCLE1BQU0sQ0FBQyxNQUFN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QUssb0JBQXdCLENBQUM7aUJBQy9CO3FCQUFNLElBQUksSUFBSSxZQUFZLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLE1BQU0sRUFBRTtvQkFDakUsS0FBSyxnQkFBb0IsQ0FBQztpQkFDM0I7cUJBQU0sSUFBSSxJQUFJLFlBQVksTUFBTSxFQUFFO29CQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDbkI7cUJBQU07b0JBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDYjthQUNGO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLG9CQUFDLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztDQUNiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSBmcm9tICcuLi91dGlsL3Byb3BlcnR5JztcblxuaW1wb3J0IHtJbmplY3RhYmxlRGVmLCBkZWZpbmVJbmplY3RhYmxlLCBnZXRJbmplY3RhYmxlRGVmfSBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi9mb3J3YXJkX3JlZic7XG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdCwgT3B0aW9uYWwsIFNlbGYsIFNraXBTZWxmfSBmcm9tICcuL21ldGFkYXRhJztcbmltcG9ydCB7Q29uc3RydWN0b3JQcm92aWRlciwgRXhpc3RpbmdQcm92aWRlciwgRmFjdG9yeVByb3ZpZGVyLCBTdGF0aWNDbGFzc1Byb3ZpZGVyLCBTdGF0aWNQcm92aWRlciwgVmFsdWVQcm92aWRlcn0gZnJvbSAnLi9wcm92aWRlcic7XG5cbmV4cG9ydCBjb25zdCBTT1VSQ0UgPSAnX19zb3VyY2UnO1xuY29uc3QgX1RIUk9XX0lGX05PVF9GT1VORCA9IG5ldyBPYmplY3QoKTtcbmV4cG9ydCBjb25zdCBUSFJPV19JRl9OT1RfRk9VTkQgPSBfVEhST1dfSUZfTk9UX0ZPVU5EO1xuXG4vKipcbiAqIEFuIEluamVjdGlvblRva2VuIHRoYXQgZ2V0cyB0aGUgY3VycmVudCBgSW5qZWN0b3JgIGZvciBgY3JlYXRlSW5qZWN0b3IoKWAtc3R5bGUgaW5qZWN0b3JzLlxuICpcbiAqIFJlcXVlc3RpbmcgdGhpcyB0b2tlbiBpbnN0ZWFkIG9mIGBJbmplY3RvcmAgYWxsb3dzIGBTdGF0aWNJbmplY3RvcmAgdG8gYmUgdHJlZS1zaGFrZW4gZnJvbSBhXG4gKiBwcm9qZWN0LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IElOSkVDVE9SID0gbmV3IEluamVjdGlvblRva2VuPEluamVjdG9yPignSU5KRUNUT1InKTtcblxuZXhwb3J0IGNsYXNzIE51bGxJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU6IGFueSA9IF9USFJPV19JRl9OT1RfRk9VTkQpOiBhbnkge1xuICAgIGlmIChub3RGb3VuZFZhbHVlID09PSBfVEhST1dfSUZfTk9UX0ZPVU5EKSB7XG4gICAgICAvLyBJbnRlbnRpb25hbGx5IGxlZnQgYmVoaW5kOiBXaXRoIGRldiB0b29scyBvcGVuIHRoZSBkZWJ1Z2dlciB3aWxsIHN0b3AgaGVyZS4gVGhlcmUgaXMgbm9cbiAgICAgIC8vIHJlYXNvbiB3aHkgY29ycmVjdGx5IHdyaXR0ZW4gYXBwbGljYXRpb24gc2hvdWxkIGNhdXNlIHRoaXMgZXhjZXB0aW9uLlxuICAgICAgLy8gVE9ETyhtaXNrbyk6IHVuY29tbWVudCB0aGUgbmV4dCBsaW5lIG9uY2UgYG5nRGV2TW9kZWAgd29ya3Mgd2l0aCBjbG9zdXJlLlxuICAgICAgLy8gaWYobmdEZXZNb2RlKSBkZWJ1Z2dlcjtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTnVsbEluamVjdG9yRXJyb3I6IE5vIHByb3ZpZGVyIGZvciAke3N0cmluZ2lmeSh0b2tlbil9IWApO1xuICAgIH1cbiAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENvbmNyZXRlIGluamVjdG9ycyBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UuXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvaW5qZWN0b3Jfc3BlYy50cyByZWdpb249J0luamVjdG9yJ31cbiAqXG4gKiBgSW5qZWN0b3JgIHJldHVybnMgaXRzZWxmIHdoZW4gZ2l2ZW4gYEluamVjdG9yYCBhcyBhIHRva2VuOlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2luamVjdG9yX3NwZWMudHMgcmVnaW9uPSdpbmplY3RJbmplY3Rvcid9XG4gKlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluamVjdG9yIHtcbiAgc3RhdGljIFRIUk9XX0lGX05PVF9GT1VORCA9IF9USFJPV19JRl9OT1RfRk9VTkQ7XG4gIHN0YXRpYyBOVUxMOiBJbmplY3RvciA9IG5ldyBOdWxsSW5qZWN0b3IoKTtcblxuICAvKipcbiAgICogUmV0cmlldmVzIGFuIGluc3RhbmNlIGZyb20gdGhlIGluamVjdG9yIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB0b2tlbi5cbiAgICogQHJldHVybnMgVGhlIGluc3RhbmNlIGZyb20gdGhlIGluamVjdG9yIGlmIGRlZmluZWQsIG90aGVyd2lzZSB0aGUgYG5vdEZvdW5kVmFsdWVgLlxuICAgKiBAdGhyb3dzIFdoZW4gdGhlIGBub3RGb3VuZFZhbHVlYCBpcyBgdW5kZWZpbmVkYCBvciBgSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EYC5cbiAgICovXG4gIGFic3RyYWN0IGdldDxUPih0b2tlbjogVHlwZTxUPnxJbmplY3Rpb25Ub2tlbjxUPiwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgZnJvbSB2NC4wLjAgdXNlIFR5cGU8VD4gb3IgSW5qZWN0aW9uVG9rZW48VD5cbiAgICogQHN1cHByZXNzIHtkdXBsaWNhdGV9XG4gICAqL1xuICBhYnN0cmFjdCBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueTtcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgZnJvbSB2NSB1c2UgdGhlIG5ldyBzaWduYXR1cmUgSW5qZWN0b3IuY3JlYXRlKG9wdGlvbnMpXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlKHByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSwgcGFyZW50PzogSW5qZWN0b3IpOiBJbmplY3RvcjtcblxuICBzdGF0aWMgY3JlYXRlKG9wdGlvbnM6IHtwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10sIHBhcmVudD86IEluamVjdG9yLCBuYW1lPzogc3RyaW5nfSk6IEluamVjdG9yO1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgSW5qZWN0b3Igd2hpY2ggaXMgY29uZmlndXJlIHVzaW5nIGBTdGF0aWNQcm92aWRlcmBzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nQ29uc3RydWN0b3JQcm92aWRlcid9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlKFxuICAgICAgb3B0aW9uczogU3RhdGljUHJvdmlkZXJbXXx7cHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdLCBwYXJlbnQ/OiBJbmplY3RvciwgbmFtZT86IHN0cmluZ30sXG4gICAgICBwYXJlbnQ/OiBJbmplY3Rvcik6IEluamVjdG9yIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIG5ldyBTdGF0aWNJbmplY3RvcihvcHRpb25zLCBwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFN0YXRpY0luamVjdG9yKG9wdGlvbnMucHJvdmlkZXJzLCBvcHRpb25zLnBhcmVudCwgb3B0aW9ucy5uYW1lIHx8IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0luamVjdGFibGVEZWYgPSBkZWZpbmVJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAnYW55JyBhcyBhbnksXG4gICAgZmFjdG9yeTogKCkgPT4gaW5qZWN0KElOSkVDVE9SKSxcbiAgfSk7XG59XG5cblxuXG5jb25zdCBJREVOVCA9IGZ1bmN0aW9uPFQ+KHZhbHVlOiBUKTogVCB7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5jb25zdCBFTVBUWSA9IDxhbnlbXT5bXTtcbmNvbnN0IENJUkNVTEFSID0gSURFTlQ7XG5jb25zdCBNVUxUSV9QUk9WSURFUl9GTiA9IGZ1bmN0aW9uKCk6IGFueVtdIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG59O1xuZXhwb3J0IGNvbnN0IFVTRV9WQUxVRSA9XG4gICAgZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eTxWYWx1ZVByb3ZpZGVyPih7cHJvdmlkZTogU3RyaW5nLCB1c2VWYWx1ZTogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuY29uc3QgTkdfVE9LRU5fUEFUSCA9ICduZ1Rva2VuUGF0aCc7XG5jb25zdCBOR19URU1QX1RPS0VOX1BBVEggPSAnbmdUZW1wVG9rZW5QYXRoJztcbmNvbnN0IGVudW0gT3B0aW9uRmxhZ3Mge1xuICBPcHRpb25hbCA9IDEgPDwgMCxcbiAgQ2hlY2tTZWxmID0gMSA8PCAxLFxuICBDaGVja1BhcmVudCA9IDEgPDwgMixcbiAgRGVmYXVsdCA9IENoZWNrU2VsZiB8IENoZWNrUGFyZW50XG59XG5jb25zdCBOVUxMX0lOSkVDVE9SID0gSW5qZWN0b3IuTlVMTDtcbmNvbnN0IE5FV19MSU5FID0gL1xcbi9nbTtcbmNvbnN0IE5PX05FV19MSU5FID0gJ8m1JztcblxuZXhwb3J0IGNsYXNzIFN0YXRpY0luamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICByZWFkb25seSBwYXJlbnQ6IEluamVjdG9yO1xuICByZWFkb25seSBzb3VyY2U6IHN0cmluZ3xudWxsO1xuXG4gIHByaXZhdGUgX3JlY29yZHM6IE1hcDxhbnksIFJlY29yZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10sIHBhcmVudDogSW5qZWN0b3IgPSBOVUxMX0lOSkVDVE9SLCBzb3VyY2U6IHN0cmluZ3xudWxsID0gbnVsbCkge1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgIGNvbnN0IHJlY29yZHMgPSB0aGlzLl9yZWNvcmRzID0gbmV3IE1hcDxhbnksIFJlY29yZD4oKTtcbiAgICByZWNvcmRzLnNldChcbiAgICAgICAgSW5qZWN0b3IsIDxSZWNvcmQ+e3Rva2VuOiBJbmplY3RvciwgZm46IElERU5ULCBkZXBzOiBFTVBUWSwgdmFsdWU6IHRoaXMsIHVzZU5ldzogZmFsc2V9KTtcbiAgICByZWNvcmRzLnNldChcbiAgICAgICAgSU5KRUNUT1IsIDxSZWNvcmQ+e3Rva2VuOiBJTkpFQ1RPUiwgZm46IElERU5ULCBkZXBzOiBFTVBUWSwgdmFsdWU6IHRoaXMsIHVzZU5ldzogZmFsc2V9KTtcbiAgICByZWN1cnNpdmVseVByb2Nlc3NQcm92aWRlcnMocmVjb3JkcywgcHJvdmlkZXJzKTtcbiAgfVxuXG4gIGdldDxUPih0b2tlbjogVHlwZTxUPnxJbmplY3Rpb25Ub2tlbjxUPiwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUO1xuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueTtcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnksIGZsYWdzOiBJbmplY3RGbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBhbnkge1xuICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuX3JlY29yZHMuZ2V0KHRva2VuKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRyeVJlc29sdmVUb2tlbih0b2tlbiwgcmVjb3JkLCB0aGlzLl9yZWNvcmRzLCB0aGlzLnBhcmVudCwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IHRva2VuUGF0aDogYW55W10gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF07XG4gICAgICBpZiAodG9rZW5bU09VUkNFXSkge1xuICAgICAgICB0b2tlblBhdGgudW5zaGlmdCh0b2tlbltTT1VSQ0VdKTtcbiAgICAgIH1cbiAgICAgIGUubWVzc2FnZSA9IGZvcm1hdEVycm9yKCdcXG4nICsgZS5tZXNzYWdlLCB0b2tlblBhdGgsIHRoaXMuc291cmNlKTtcbiAgICAgIGVbTkdfVE9LRU5fUEFUSF0gPSB0b2tlblBhdGg7XG4gICAgICBlW05HX1RFTVBfVE9LRU5fUEFUSF0gPSBudWxsO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBjb25zdCB0b2tlbnMgPSA8c3RyaW5nW10+W10sIHJlY29yZHMgPSB0aGlzLl9yZWNvcmRzO1xuICAgIHJlY29yZHMuZm9yRWFjaCgodiwgdG9rZW4pID0+IHRva2Vucy5wdXNoKHN0cmluZ2lmeSh0b2tlbikpKTtcbiAgICByZXR1cm4gYFN0YXRpY0luamVjdG9yWyR7dG9rZW5zLmpvaW4oJywgJyl9XWA7XG4gIH1cbn1cblxudHlwZSBTdXBwb3J0ZWRQcm92aWRlciA9XG4gICAgVmFsdWVQcm92aWRlciB8IEV4aXN0aW5nUHJvdmlkZXIgfCBTdGF0aWNDbGFzc1Byb3ZpZGVyIHwgQ29uc3RydWN0b3JQcm92aWRlciB8IEZhY3RvcnlQcm92aWRlcjtcblxuaW50ZXJmYWNlIFJlY29yZCB7XG4gIGZuOiBGdW5jdGlvbjtcbiAgdXNlTmV3OiBib29sZWFuO1xuICBkZXBzOiBEZXBlbmRlbmN5UmVjb3JkW107XG4gIHZhbHVlOiBhbnk7XG59XG5cbmludGVyZmFjZSBEZXBlbmRlbmN5UmVjb3JkIHtcbiAgdG9rZW46IGFueTtcbiAgb3B0aW9uczogbnVtYmVyO1xufVxuXG50eXBlIFRva2VuUGF0aCA9IEFycmF5PGFueT47XG5cbmZ1bmN0aW9uIHJlc29sdmVQcm92aWRlcihwcm92aWRlcjogU3VwcG9ydGVkUHJvdmlkZXIpOiBSZWNvcmQge1xuICBjb25zdCBkZXBzID0gY29tcHV0ZURlcHMocHJvdmlkZXIpO1xuICBsZXQgZm46IEZ1bmN0aW9uID0gSURFTlQ7XG4gIGxldCB2YWx1ZTogYW55ID0gRU1QVFk7XG4gIGxldCB1c2VOZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgbGV0IHByb3ZpZGUgPSByZXNvbHZlRm9yd2FyZFJlZihwcm92aWRlci5wcm92aWRlKTtcbiAgaWYgKFVTRV9WQUxVRSBpbiBwcm92aWRlcikge1xuICAgIC8vIFdlIG5lZWQgdG8gdXNlIFVTRV9WQUxVRSBpbiBwcm92aWRlciBzaW5jZSBwcm92aWRlci51c2VWYWx1ZSBjb3VsZCBiZSBkZWZpbmVkIGFzIHVuZGVmaW5lZC5cbiAgICB2YWx1ZSA9IChwcm92aWRlciBhcyBWYWx1ZVByb3ZpZGVyKS51c2VWYWx1ZTtcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgRmFjdG9yeVByb3ZpZGVyKS51c2VGYWN0b3J5KSB7XG4gICAgZm4gPSAocHJvdmlkZXIgYXMgRmFjdG9yeVByb3ZpZGVyKS51c2VGYWN0b3J5O1xuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBFeGlzdGluZ1Byb3ZpZGVyKS51c2VFeGlzdGluZykge1xuICAgIC8vIEp1c3QgdXNlIElERU5UXG4gIH0gZWxzZSBpZiAoKHByb3ZpZGVyIGFzIFN0YXRpY0NsYXNzUHJvdmlkZXIpLnVzZUNsYXNzKSB7XG4gICAgdXNlTmV3ID0gdHJ1ZTtcbiAgICBmbiA9IHJlc29sdmVGb3J3YXJkUmVmKChwcm92aWRlciBhcyBTdGF0aWNDbGFzc1Byb3ZpZGVyKS51c2VDbGFzcyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb3ZpZGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHVzZU5ldyA9IHRydWU7XG4gICAgZm4gPSBwcm92aWRlO1xuICB9IGVsc2Uge1xuICAgIHRocm93IHN0YXRpY0Vycm9yKFxuICAgICAgICAnU3RhdGljUHJvdmlkZXIgZG9lcyBub3QgaGF2ZSBbdXNlVmFsdWV8dXNlRmFjdG9yeXx1c2VFeGlzdGluZ3x1c2VDbGFzc10gb3IgW3Byb3ZpZGVdIGlzIG5vdCBuZXdhYmxlJyxcbiAgICAgICAgcHJvdmlkZXIpO1xuICB9XG4gIHJldHVybiB7ZGVwcywgZm4sIHVzZU5ldywgdmFsdWV9O1xufVxuXG5mdW5jdGlvbiBtdWx0aVByb3ZpZGVyTWl4RXJyb3IodG9rZW46IGFueSkge1xuICByZXR1cm4gc3RhdGljRXJyb3IoJ0Nhbm5vdCBtaXggbXVsdGkgcHJvdmlkZXJzIGFuZCByZWd1bGFyIHByb3ZpZGVycycsIHRva2VuKTtcbn1cblxuZnVuY3Rpb24gcmVjdXJzaXZlbHlQcm9jZXNzUHJvdmlkZXJzKHJlY29yZHM6IE1hcDxhbnksIFJlY29yZD4sIHByb3ZpZGVyOiBTdGF0aWNQcm92aWRlcikge1xuICBpZiAocHJvdmlkZXIpIHtcbiAgICBwcm92aWRlciA9IHJlc29sdmVGb3J3YXJkUmVmKHByb3ZpZGVyKTtcbiAgICBpZiAocHJvdmlkZXIgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gaWYgd2UgaGF2ZSBhbiBhcnJheSByZWN1cnNlIGludG8gdGhlIGFycmF5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlY3Vyc2l2ZWx5UHJvY2Vzc1Byb3ZpZGVycyhyZWNvcmRzLCBwcm92aWRlcltpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJvdmlkZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEZ1bmN0aW9ucyB3ZXJlIHN1cHBvcnRlZCBpbiBSZWZsZWN0aXZlSW5qZWN0b3IsIGJ1dCBhcmUgbm90IGhlcmUuIEZvciBzYWZldHkgZ2l2ZSB1c2VmdWxcbiAgICAgIC8vIGVycm9yIG1lc3NhZ2VzXG4gICAgICB0aHJvdyBzdGF0aWNFcnJvcignRnVuY3Rpb24vQ2xhc3Mgbm90IHN1cHBvcnRlZCcsIHByb3ZpZGVyKTtcbiAgICB9IGVsc2UgaWYgKHByb3ZpZGVyICYmIHR5cGVvZiBwcm92aWRlciA9PT0gJ29iamVjdCcgJiYgcHJvdmlkZXIucHJvdmlkZSkge1xuICAgICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBoYXZlIHdoYXQgbG9va3MgbGlrZSBhIHByb3ZpZGVyOiB7cHJvdmlkZTogPywgLi4uLn1cbiAgICAgIGxldCB0b2tlbiA9IHJlc29sdmVGb3J3YXJkUmVmKHByb3ZpZGVyLnByb3ZpZGUpO1xuICAgICAgY29uc3QgcmVzb2x2ZWRQcm92aWRlciA9IHJlc29sdmVQcm92aWRlcihwcm92aWRlcik7XG4gICAgICBpZiAocHJvdmlkZXIubXVsdGkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhIG11bHRpIHByb3ZpZGVyLlxuICAgICAgICBsZXQgbXVsdGlQcm92aWRlcjogUmVjb3JkfHVuZGVmaW5lZCA9IHJlY29yZHMuZ2V0KHRva2VuKTtcbiAgICAgICAgaWYgKG11bHRpUHJvdmlkZXIpIHtcbiAgICAgICAgICBpZiAobXVsdGlQcm92aWRlci5mbiAhPT0gTVVMVElfUFJPVklERVJfRk4pIHtcbiAgICAgICAgICAgIHRocm93IG11bHRpUHJvdmlkZXJNaXhFcnJvcih0b2tlbik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIENyZWF0ZSBhIHBsYWNlaG9sZGVyIGZhY3Rvcnkgd2hpY2ggd2lsbCBsb29rIHVwIHRoZSBjb25zdGl0dWVudHMgb2YgdGhlIG11bHRpIHByb3ZpZGVyLlxuICAgICAgICAgIHJlY29yZHMuc2V0KHRva2VuLCBtdWx0aVByb3ZpZGVyID0gPFJlY29yZD57XG4gICAgICAgICAgICB0b2tlbjogcHJvdmlkZXIucHJvdmlkZSxcbiAgICAgICAgICAgIGRlcHM6IFtdLFxuICAgICAgICAgICAgdXNlTmV3OiBmYWxzZSxcbiAgICAgICAgICAgIGZuOiBNVUxUSV9QUk9WSURFUl9GTixcbiAgICAgICAgICAgIHZhbHVlOiBFTVBUWVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRyZWF0IHRoZSBwcm92aWRlciBhcyB0aGUgdG9rZW4uXG4gICAgICAgIHRva2VuID0gcHJvdmlkZXI7XG4gICAgICAgIG11bHRpUHJvdmlkZXIuZGVwcy5wdXNoKHt0b2tlbiwgb3B0aW9uczogT3B0aW9uRmxhZ3MuRGVmYXVsdH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVjb3JkID0gcmVjb3Jkcy5nZXQodG9rZW4pO1xuICAgICAgaWYgKHJlY29yZCAmJiByZWNvcmQuZm4gPT0gTVVMVElfUFJPVklERVJfRk4pIHtcbiAgICAgICAgdGhyb3cgbXVsdGlQcm92aWRlck1peEVycm9yKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIHJlY29yZHMuc2V0KHRva2VuLCByZXNvbHZlZFByb3ZpZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgc3RhdGljRXJyb3IoJ1VuZXhwZWN0ZWQgcHJvdmlkZXInLCBwcm92aWRlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyeVJlc29sdmVUb2tlbihcbiAgICB0b2tlbjogYW55LCByZWNvcmQ6IFJlY29yZCB8IHVuZGVmaW5lZCwgcmVjb3JkczogTWFwPGFueSwgUmVjb3JkPiwgcGFyZW50OiBJbmplY3RvcixcbiAgICBub3RGb3VuZFZhbHVlOiBhbnksIGZsYWdzOiBJbmplY3RGbGFncyk6IGFueSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlc29sdmVUb2tlbih0b2tlbiwgcmVjb3JkLCByZWNvcmRzLCBwYXJlbnQsIG5vdEZvdW5kVmFsdWUsIGZsYWdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGVuc3VyZSB0aGF0ICdlJyBpcyBvZiB0eXBlIEVycm9yLlxuICAgIGlmICghKGUgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgIGUgPSBuZXcgRXJyb3IoZSk7XG4gICAgfVxuICAgIGNvbnN0IHBhdGg6IGFueVtdID0gZVtOR19URU1QX1RPS0VOX1BBVEhdID0gZVtOR19URU1QX1RPS0VOX1BBVEhdIHx8IFtdO1xuICAgIHBhdGgudW5zaGlmdCh0b2tlbik7XG4gICAgaWYgKHJlY29yZCAmJiByZWNvcmQudmFsdWUgPT0gQ0lSQ1VMQVIpIHtcbiAgICAgIC8vIFJlc2V0IHRoZSBDaXJjdWxhciBmbGFnLlxuICAgICAgcmVjb3JkLnZhbHVlID0gRU1QVFk7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVRva2VuKFxuICAgIHRva2VuOiBhbnksIHJlY29yZDogUmVjb3JkIHwgdW5kZWZpbmVkLCByZWNvcmRzOiBNYXA8YW55LCBSZWNvcmQ+LCBwYXJlbnQ6IEluamVjdG9yLFxuICAgIG5vdEZvdW5kVmFsdWU6IGFueSwgZmxhZ3M6IEluamVjdEZsYWdzKTogYW55IHtcbiAgbGV0IHZhbHVlO1xuICBpZiAocmVjb3JkICYmICEoZmxhZ3MgJiBJbmplY3RGbGFncy5Ta2lwU2VsZikpIHtcbiAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgcmVjb3JkLCB0aGlzIGltcGxpZXMgdGhhdCB3ZSBkb24ndCBvd24gdGhlIHByb3ZpZGVyIGhlbmNlIGRvbid0IGtub3cgaG93XG4gICAgLy8gdG8gcmVzb2x2ZSBpdC5cbiAgICB2YWx1ZSA9IHJlY29yZC52YWx1ZTtcbiAgICBpZiAodmFsdWUgPT0gQ0lSQ1VMQVIpIHtcbiAgICAgIHRocm93IEVycm9yKE5PX05FV19MSU5FICsgJ0NpcmN1bGFyIGRlcGVuZGVuY3knKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBFTVBUWSkge1xuICAgICAgcmVjb3JkLnZhbHVlID0gQ0lSQ1VMQVI7XG4gICAgICBsZXQgb2JqID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IHVzZU5ldyA9IHJlY29yZC51c2VOZXc7XG4gICAgICBsZXQgZm4gPSByZWNvcmQuZm47XG4gICAgICBsZXQgZGVwUmVjb3JkcyA9IHJlY29yZC5kZXBzO1xuICAgICAgbGV0IGRlcHMgPSBFTVBUWTtcbiAgICAgIGlmIChkZXBSZWNvcmRzLmxlbmd0aCkge1xuICAgICAgICBkZXBzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVwUmVjb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGRlcFJlY29yZDogRGVwZW5kZW5jeVJlY29yZCA9IGRlcFJlY29yZHNbaV07XG4gICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGRlcFJlY29yZC5vcHRpb25zO1xuICAgICAgICAgIGNvbnN0IGNoaWxkUmVjb3JkID1cbiAgICAgICAgICAgICAgb3B0aW9ucyAmIE9wdGlvbkZsYWdzLkNoZWNrU2VsZiA/IHJlY29yZHMuZ2V0KGRlcFJlY29yZC50b2tlbikgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVwcy5wdXNoKHRyeVJlc29sdmVUb2tlbihcbiAgICAgICAgICAgICAgLy8gQ3VycmVudCBUb2tlbiB0byByZXNvbHZlXG4gICAgICAgICAgICAgIGRlcFJlY29yZC50b2tlbixcbiAgICAgICAgICAgICAgLy8gQSByZWNvcmQgd2hpY2ggZGVzY3JpYmVzIGhvdyB0byByZXNvbHZlIHRoZSB0b2tlbi5cbiAgICAgICAgICAgICAgLy8gSWYgdW5kZWZpbmVkLCB0aGlzIG1lYW5zIHdlIGRvbid0IGhhdmUgc3VjaCBhIHJlY29yZFxuICAgICAgICAgICAgICBjaGlsZFJlY29yZCxcbiAgICAgICAgICAgICAgLy8gT3RoZXIgcmVjb3JkcyB3ZSBrbm93IGFib3V0LlxuICAgICAgICAgICAgICByZWNvcmRzLFxuICAgICAgICAgICAgICAvLyBJZiB3ZSBkb24ndCBrbm93IGhvdyB0byByZXNvbHZlIGRlcGVuZGVuY3kgYW5kIHdlIHNob3VsZCBub3QgY2hlY2sgcGFyZW50IGZvciBpdCxcbiAgICAgICAgICAgICAgLy8gdGhhbiBwYXNzIGluIE51bGwgaW5qZWN0b3IuXG4gICAgICAgICAgICAgICFjaGlsZFJlY29yZCAmJiAhKG9wdGlvbnMgJiBPcHRpb25GbGFncy5DaGVja1BhcmVudCkgPyBOVUxMX0lOSkVDVE9SIDogcGFyZW50LFxuICAgICAgICAgICAgICBvcHRpb25zICYgT3B0aW9uRmxhZ3MuT3B0aW9uYWwgPyBudWxsIDogSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5ELFxuICAgICAgICAgICAgICBJbmplY3RGbGFncy5EZWZhdWx0KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlY29yZC52YWx1ZSA9IHZhbHVlID0gdXNlTmV3ID8gbmV3IChmbiBhcyBhbnkpKC4uLmRlcHMpIDogZm4uYXBwbHkob2JqLCBkZXBzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIShmbGFncyAmIEluamVjdEZsYWdzLlNlbGYpKSB7XG4gICAgdmFsdWUgPSBwYXJlbnQuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlLCBJbmplY3RGbGFncy5EZWZhdWx0KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cblxuZnVuY3Rpb24gY29tcHV0ZURlcHMocHJvdmlkZXI6IFN0YXRpY1Byb3ZpZGVyKTogRGVwZW5kZW5jeVJlY29yZFtdIHtcbiAgbGV0IGRlcHM6IERlcGVuZGVuY3lSZWNvcmRbXSA9IEVNUFRZO1xuICBjb25zdCBwcm92aWRlckRlcHM6IGFueVtdID1cbiAgICAgIChwcm92aWRlciBhcyBFeGlzdGluZ1Byb3ZpZGVyICYgU3RhdGljQ2xhc3NQcm92aWRlciAmIENvbnN0cnVjdG9yUHJvdmlkZXIpLmRlcHM7XG4gIGlmIChwcm92aWRlckRlcHMgJiYgcHJvdmlkZXJEZXBzLmxlbmd0aCkge1xuICAgIGRlcHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyRGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wdGlvbnMgPSBPcHRpb25GbGFncy5EZWZhdWx0O1xuICAgICAgbGV0IHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXJEZXBzW2ldKTtcbiAgICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBhbm5vdGF0aW9ucyA9IHRva2VuOyBqIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbal07XG4gICAgICAgICAgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBPcHRpb25hbCB8fCBhbm5vdGF0aW9uID09IE9wdGlvbmFsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8IE9wdGlvbkZsYWdzLk9wdGlvbmFsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYW5ub3RhdGlvbiBpbnN0YW5jZW9mIFNraXBTZWxmIHx8IGFubm90YXRpb24gPT0gU2tpcFNlbGYpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zICYgfk9wdGlvbkZsYWdzLkNoZWNrU2VsZjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBTZWxmIHx8IGFubm90YXRpb24gPT0gU2VsZikge1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgJiB+T3B0aW9uRmxhZ3MuQ2hlY2tQYXJlbnQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChhbm5vdGF0aW9uIGluc3RhbmNlb2YgSW5qZWN0KSB7XG4gICAgICAgICAgICB0b2tlbiA9IChhbm5vdGF0aW9uIGFzIEluamVjdCkudG9rZW47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYoYW5ub3RhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZXBzLnB1c2goe3Rva2VuLCBvcHRpb25zfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBFeGlzdGluZ1Byb3ZpZGVyKS51c2VFeGlzdGluZykge1xuICAgIGNvbnN0IHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYoKHByb3ZpZGVyIGFzIEV4aXN0aW5nUHJvdmlkZXIpLnVzZUV4aXN0aW5nKTtcbiAgICBkZXBzID0gW3t0b2tlbiwgb3B0aW9uczogT3B0aW9uRmxhZ3MuRGVmYXVsdH1dO1xuICB9IGVsc2UgaWYgKCFwcm92aWRlckRlcHMgJiYgIShVU0VfVkFMVUUgaW4gcHJvdmlkZXIpKSB7XG4gICAgLy8gdXNlVmFsdWUgJiB1c2VFeGlzdGluZyBhcmUgdGhlIG9ubHkgb25lcyB3aGljaCBhcmUgZXhlbXB0IGZyb20gZGVwcyBhbGwgb3RoZXJzIG5lZWQgaXQuXG4gICAgdGhyb3cgc3RhdGljRXJyb3IoJ1xcJ2RlcHNcXCcgcmVxdWlyZWQnLCBwcm92aWRlcik7XG4gIH1cbiAgcmV0dXJuIGRlcHM7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHRleHQ6IHN0cmluZywgb2JqOiBhbnksIHNvdXJjZTogc3RyaW5nIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcge1xuICB0ZXh0ID0gdGV4dCAmJiB0ZXh0LmNoYXJBdCgwKSA9PT0gJ1xcbicgJiYgdGV4dC5jaGFyQXQoMSkgPT0gTk9fTkVXX0xJTkUgPyB0ZXh0LnN1YnN0cigyKSA6IHRleHQ7XG4gIGxldCBjb250ZXh0ID0gc3RyaW5naWZ5KG9iaik7XG4gIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGNvbnRleHQgPSBvYmoubWFwKHN0cmluZ2lmeSkuam9pbignIC0+ICcpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgbGV0IHBhcnRzID0gPHN0cmluZ1tdPltdO1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgcGFydHMucHVzaChcbiAgICAgICAgICAgIGtleSArICc6JyArICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogc3RyaW5naWZ5KHZhbHVlKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0ID0gYHske3BhcnRzLmpvaW4oJywgJyl9fWA7XG4gIH1cbiAgcmV0dXJuIGBTdGF0aWNJbmplY3RvckVycm9yJHtzb3VyY2UgPyAnKCcgKyBzb3VyY2UgKyAnKScgOiAnJ31bJHtjb250ZXh0fV06ICR7dGV4dC5yZXBsYWNlKE5FV19MSU5FLCAnXFxuICAnKX1gO1xufVxuXG5mdW5jdGlvbiBzdGF0aWNFcnJvcih0ZXh0OiBzdHJpbmcsIG9iajogYW55KTogRXJyb3Ige1xuICByZXR1cm4gbmV3IEVycm9yKGZvcm1hdEVycm9yKHRleHQsIG9iaikpO1xufVxuXG4vKipcbiAqIEluamVjdGlvbiBmbGFncyBmb3IgREkuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEluamVjdEZsYWdzIHtcbiAgRGVmYXVsdCA9IDBiMDAwMCxcblxuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYW4gaW5qZWN0b3Igc2hvdWxkIHJldHJpZXZlIGEgZGVwZW5kZW5jeSBmcm9tIGFueSBpbmplY3RvciB1bnRpbCByZWFjaGluZyB0aGVcbiAgICogaG9zdCBlbGVtZW50IG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudC4gKE9ubHkgdXNlZCB3aXRoIEVsZW1lbnQgSW5qZWN0b3IpXG4gICAqL1xuICBIb3N0ID0gMGIwMDAxLFxuICAvKiogRG9uJ3QgZGVzY2VuZCBpbnRvIGFuY2VzdG9ycyBvZiB0aGUgbm9kZSByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2VsZiA9IDBiMDAxMCxcbiAgLyoqIFNraXAgdGhlIG5vZGUgdGhhdCBpcyByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2tpcFNlbGYgPSAwYjAxMDAsXG4gIC8qKiBJbmplY3QgYGRlZmF1bHRWYWx1ZWAgaW5zdGVhZCBpZiB0b2tlbiBub3QgZm91bmQuICovXG4gIE9wdGlvbmFsID0gMGIxMDAwLFxufVxuXG4vKipcbiAqIEN1cnJlbnQgaW5qZWN0b3IgdmFsdWUgdXNlZCBieSBgaW5qZWN0YC5cbiAqIC0gYHVuZGVmaW5lZGA6IGl0IGlzIGFuIGVycm9yIHRvIGNhbGwgYGluamVjdGBcbiAqIC0gYG51bGxgOiBgaW5qZWN0YCBjYW4gYmUgY2FsbGVkIGJ1dCB0aGVyZSBpcyBubyBpbmplY3RvciAobGltcC1tb2RlKS5cbiAqIC0gSW5qZWN0b3IgaW5zdGFuY2U6IFVzZSB0aGUgaW5qZWN0b3IgZm9yIHJlc29sdXRpb24uXG4gKi9cbmxldCBfY3VycmVudEluamVjdG9yOiBJbmplY3Rvcnx1bmRlZmluZWR8bnVsbCA9IHVuZGVmaW5lZDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRJbmplY3RvcihpbmplY3RvcjogSW5qZWN0b3IgfCBudWxsIHwgdW5kZWZpbmVkKTogSW5qZWN0b3J8dW5kZWZpbmVkfG51bGwge1xuICBjb25zdCBmb3JtZXIgPSBfY3VycmVudEluamVjdG9yO1xuICBfY3VycmVudEluamVjdG9yID0gaW5qZWN0b3I7XG4gIHJldHVybiBmb3JtZXI7XG59XG5cbi8qKlxuICogSW5qZWN0cyBhIHRva2VuIGZyb20gdGhlIGN1cnJlbnRseSBhY3RpdmUgaW5qZWN0b3IuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBtdXN0IGJlIHVzZWQgaW4gdGhlIGNvbnRleHQgb2YgYSBmYWN0b3J5IGZ1bmN0aW9uIHN1Y2ggYXMgb25lIGRlZmluZWQgZm9yIGFuXG4gKiBgSW5qZWN0aW9uVG9rZW5gLCBhbmQgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiBub3QgY2FsbGVkIGZyb20gc3VjaCBhIGNvbnRleHQuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvaW5qZWN0b3Jfc3BlYy50cyByZWdpb249J1NoYWtlYWJsZUluamVjdGlvblRva2VuJ31cbiAqXG4gKiBXaXRoaW4gc3VjaCBhIGZhY3RvcnkgZnVuY3Rpb24gYGluamVjdGAgaXMgdXRpbGl6ZWQgdG8gcmVxdWVzdCBpbmplY3Rpb24gb2YgYSBkZXBlbmRlbmN5LCBpbnN0ZWFkXG4gKiBvZiBwcm92aWRpbmcgYW4gYWRkaXRpb25hbCBhcnJheSBvZiBkZXBlbmRlbmNpZXMgYXMgd2FzIGNvbW1vbiB0byBkbyB3aXRoIGB1c2VGYWN0b3J5YCBwcm92aWRlcnMuXG4gKiBgaW5qZWN0YCBpcyBmYXN0ZXIgYW5kIG1vcmUgdHlwZS1zYWZlLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdDxUPih0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4pOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdDxUPih0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4sIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUfG51bGw7XG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0KTogVHxudWxsIHtcbiAgaWYgKF9jdXJyZW50SW5qZWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW5qZWN0KCkgbXVzdCBiZSBjYWxsZWQgZnJvbSBhbiBpbmplY3Rpb24gY29udGV4dGApO1xuICB9IGVsc2UgaWYgKF9jdXJyZW50SW5qZWN0b3IgPT09IG51bGwpIHtcbiAgICBjb25zdCBpbmplY3RhYmxlRGVmOiBJbmplY3RhYmxlRGVmPFQ+fG51bGwgPSBnZXRJbmplY3RhYmxlRGVmKHRva2VuKTtcbiAgICBpZiAoaW5qZWN0YWJsZURlZiAmJiBpbmplY3RhYmxlRGVmLnByb3ZpZGVkSW4gPT0gJ3Jvb3QnKSB7XG4gICAgICByZXR1cm4gaW5qZWN0YWJsZURlZi52YWx1ZSA9PT0gdW5kZWZpbmVkID8gaW5qZWN0YWJsZURlZi52YWx1ZSA9IGluamVjdGFibGVEZWYuZmFjdG9yeSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmplY3RhYmxlRGVmLnZhbHVlO1xuICAgIH1cbiAgICBpZiAoZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCkgcmV0dXJuIG51bGw7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbmplY3RvcjogTk9UX0ZPVU5EIFske3N0cmluZ2lmeSh0b2tlbil9XWApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfY3VycmVudEluamVjdG9yLmdldCh0b2tlbiwgZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCA/IG51bGwgOiB1bmRlZmluZWQsIGZsYWdzKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXJncyh0eXBlczogKFR5cGU8YW55PnwgSW5qZWN0aW9uVG9rZW48YW55PnwgYW55W10pW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFyZ3M6IGFueVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcmcgPSB0eXBlc1tpXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICBpZiAoYXJnLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50cyBhcnJheSBtdXN0IGhhdmUgYXJndW1lbnRzLicpO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGU6IFR5cGU8YW55Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgZmxhZ3M6IEluamVjdEZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcmcubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFyZ1tqXTtcbiAgICAgICAgaWYgKG1ldGEgaW5zdGFuY2VvZiBPcHRpb25hbCB8fCBtZXRhLm5nTWV0YWRhdGFOYW1lID09PSAnT3B0aW9uYWwnKSB7XG4gICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuT3B0aW9uYWw7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0YSBpbnN0YW5jZW9mIFNraXBTZWxmIHx8IG1ldGEubmdNZXRhZGF0YU5hbWUgPT09ICdTa2lwU2VsZicpIHtcbiAgICAgICAgICBmbGFncyB8PSBJbmplY3RGbGFncy5Ta2lwU2VsZjtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRhIGluc3RhbmNlb2YgU2VsZiB8fCBtZXRhLm5nTWV0YWRhdGFOYW1lID09PSAnU2VsZicpIHtcbiAgICAgICAgICBmbGFncyB8PSBJbmplY3RGbGFncy5TZWxmO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGEgaW5zdGFuY2VvZiBJbmplY3QpIHtcbiAgICAgICAgICB0eXBlID0gbWV0YS50b2tlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0eXBlID0gbWV0YTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhcmdzLnB1c2goaW5qZWN0KHR5cGUgISwgZmxhZ3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncy5wdXNoKGluamVjdChhcmcpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFyZ3M7XG59XG4iXX0=