/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationInitStatus, COMPILER_OPTIONS, Compiler, ErrorHandler, ModuleWithComponentFactories, NgModule, NgZone, ɵcompileComponent as compileComponent, ɵcompileDirective as compileDirective, ɵcompileNgModuleDefs as compileNgModuleDefs, ɵcompilePipe as compilePipe, ɵgetInjectableDef as getInjectableDef, ɵNG_COMPONENT_DEF as NG_COMPONENT_DEF, ɵNG_DIRECTIVE_DEF as NG_DIRECTIVE_DEF, ɵNG_INJECTOR_DEF as NG_INJECTOR_DEF, ɵNG_MODULE_DEF as NG_MODULE_DEF, ɵNG_PIPE_DEF as NG_PIPE_DEF, ɵRender3ComponentFactory as ComponentFactory, ɵRender3NgModuleRef as NgModuleRef, ɵNgModuleFactory as R3NgModuleFactory, ɵpatchComponentDefWithScope as patchComponentDefWithScope, ɵtransitiveScopesFor as transitiveScopesFor, } from '@angular/core';
import { ResourceLoader } from '@angular/compiler';
import { clearResolutionOfComponentResourcesQueue, restoreComponentResolutionQueue, resolveComponentResources, isComponentDefPendingResolution } from '../../src/metadata/resource_loading';
import { ComponentResolver, DirectiveResolver, NgModuleResolver, PipeResolver } from './resolvers';
/** @type {?} */
const TESTING_MODULE = 'TestingModule';
/**
 * @record
 */
function CleanupOperation() { }
if (false) {
    /** @type {?} */
    CleanupOperation.prototype.field;
    /** @type {?} */
    CleanupOperation.prototype.def;
    /** @type {?} */
    CleanupOperation.prototype.original;
}
export class R3TestBedCompiler {
    /**
     * @param {?} platform
     * @param {?} additionalModuleTypes
     */
    constructor(platform, additionalModuleTypes) {
        this.platform = platform;
        this.additionalModuleTypes = additionalModuleTypes;
        this.originalComponentResolutionQueue = null;
        // Testing module configuration
        this.declarations = [];
        this.imports = [];
        this.providers = [];
        this.schemas = [];
        // Queues of components/directives/pipes that should be recompiled.
        this.pendingComponents = new Set();
        this.pendingDirectives = new Set();
        this.pendingPipes = new Set();
        // Keep track of all components and directives, so we can patch Providers onto defs later.
        this.seenComponents = new Set();
        this.seenDirectives = new Set();
        // Store resolved styles for Components that have template overrides present and `styleUrls`
        // defined at the same time.
        this.existingComponentStyles = new Map();
        this.resolvers = initResolvers();
        this.componentToModuleScope = new Map();
        // Map that keeps initial version of component/directive/pipe defs in case
        // we compile a Type again, thus overriding respective static fields. This is
        // required to make sure we restore defs to their initial states between test runs
        // TODO: we should support the case with multiple defs on a type
        this.initialNgDefs = new Map();
        // Array that keeps cleanup operations for initial versions of component/directive/pipe/module
        // defs in case TestBed makes changes to the originals.
        this.defCleanupOps = [];
        this._injector = null;
        this.compilerProviders = null;
        this.providerOverrides = [];
        this.rootProviderOverrides = [];
        this.providerOverridesByToken = new Map();
        this.moduleProvidersOverridden = new Set();
        this.testModuleRef = null;
        class DynamicTestModule {
        }
        this.testModuleType = (/** @type {?} */ (DynamicTestModule));
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    setCompilerProviders(providers) {
        this.compilerProviders = providers;
        this._injector = null;
    }
    /**
     * @param {?} moduleDef
     * @return {?}
     */
    configureTestingModule(moduleDef) {
        // Enqueue any compilation tasks for the directly declared component.
        if (moduleDef.declarations !== undefined) {
            this.queueTypeArray(moduleDef.declarations, TESTING_MODULE);
            this.declarations.push(...moduleDef.declarations);
        }
        // Enqueue any compilation tasks for imported modules.
        if (moduleDef.imports !== undefined) {
            this.queueTypesFromModulesArray(moduleDef.imports);
            this.imports.push(...moduleDef.imports);
        }
        if (moduleDef.providers !== undefined) {
            this.providers.push(...moduleDef.providers);
        }
        if (moduleDef.schemas !== undefined) {
            this.schemas.push(...moduleDef.schemas);
        }
    }
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    overrideModule(ngModule, override) {
        // Compile the module right away.
        this.resolvers.module.addOverride(ngModule, override);
        /** @type {?} */
        const metadata = this.resolvers.module.resolve(ngModule);
        if (metadata === null) {
            throw new Error(`${ngModule.name} is not an @NgModule or is missing metadata`);
        }
        this.recompileNgModule(ngModule);
        // At this point, the module has a valid .ngModuleDef, but the override may have introduced
        // new declarations or imported modules. Ingest any possible new types and add them to the
        // current queue.
        this.queueTypesFromModulesArray([ngModule]);
    }
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    overrideComponent(component, override) {
        this.resolvers.component.addOverride(component, override);
        this.pendingComponents.add(component);
    }
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    overrideDirective(directive, override) {
        this.resolvers.directive.addOverride(directive, override);
        this.pendingDirectives.add(directive);
    }
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    overridePipe(pipe, override) {
        this.resolvers.pipe.addOverride(pipe, override);
        this.pendingPipes.add(pipe);
    }
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    overrideProvider(token, provider) {
        /** @type {?} */
        const providerDef = provider.useFactory ?
            { provide: token, useFactory: provider.useFactory, deps: provider.deps || [] } :
            { provide: token, useValue: provider.useValue };
        /** @type {?} */
        let injectableDef;
        /** @type {?} */
        const isRoot = (typeof token !== 'string' && (injectableDef = getInjectableDef(token)) &&
            injectableDef.providedIn === 'root');
        /** @type {?} */
        const overridesBucket = isRoot ? this.rootProviderOverrides : this.providerOverrides;
        overridesBucket.push(providerDef);
        // Keep all overrides grouped by token as well for fast lookups using token
        /** @type {?} */
        const overridesForToken = this.providerOverridesByToken.get(token) || [];
        overridesForToken.push(providerDef);
        this.providerOverridesByToken.set(token, overridesForToken);
    }
    /**
     * @param {?} type
     * @param {?} template
     * @return {?}
     */
    overrideTemplateUsingTestingModule(type, template) {
        /** @type {?} */
        const def = ((/** @type {?} */ (type)))[NG_COMPONENT_DEF];
        /** @type {?} */
        const hasStyleUrls = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const metadata = (/** @type {?} */ ((/** @type {?} */ (this.resolvers.component.resolve(type)))));
            return !!metadata.styleUrls && metadata.styleUrls.length > 0;
        });
        /** @type {?} */
        const overrideStyleUrls = !!def && !isComponentDefPendingResolution(type) && hasStyleUrls();
        // In Ivy, compiling a component does not require knowing the module providing the
        // component's scope, so overrideTemplateUsingTestingModule can be implemented purely via
        // overrideComponent. Important: overriding template requires full Component re-compilation,
        // which may fail in case styleUrls are also present (thus Component is considered as required
        // resolution). In order to avoid this, we preemptively set styleUrls to an empty array,
        // preserve current styles available on Component def and restore styles back once compilation
        // is complete.
        /** @type {?} */
        const override = overrideStyleUrls ? { template, styles: [], styleUrls: [] } : { template };
        this.overrideComponent(type, { set: override });
        if (overrideStyleUrls && def.styles && def.styles.length > 0) {
            this.existingComponentStyles.set(type, def.styles);
        }
        // Set the component's scope to be the testing module.
        this.componentToModuleScope.set(type, TESTING_MODULE);
    }
    /**
     * @return {?}
     */
    compileComponents() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.clearComponentResolutionQueue();
            // Run compilers for all queued types.
            /** @type {?} */
            let needsAsyncResources = this.compileTypesSync();
            // compileComponents() should not be async unless it needs to be.
            if (needsAsyncResources) {
                /** @type {?} */
                let resourceLoader;
                /** @type {?} */
                let resolver = (/**
                 * @param {?} url
                 * @return {?}
                 */
                (url) => {
                    if (!resourceLoader) {
                        resourceLoader = this.injector.get(ResourceLoader);
                    }
                    return Promise.resolve(resourceLoader.get(url));
                });
                yield resolveComponentResources(resolver);
            }
        });
    }
    /**
     * @return {?}
     */
    finalize() {
        // One last compile
        this.compileTypesSync();
        // Create the testing module itself.
        this.compileTestModule();
        this.applyTransitiveScopes();
        this.applyProviderOverrides();
        // Patch previously stored `styles` Component values (taken from ngComponentDef), in case these
        // Components have `styleUrls` fields defined and template override was requested.
        this.patchComponentsWithExistingStyles();
        // Clear the componentToModuleScope map, so that future compilations don't reset the scope of
        // every component.
        this.componentToModuleScope.clear();
        /** @type {?} */
        const parentInjector = this.platform.injector;
        this.testModuleRef = new NgModuleRef(this.testModuleType, parentInjector);
        // ApplicationInitStatus.runInitializers() is marked @internal to core.
        // Cast it to any before accessing it.
        ((/** @type {?} */ (this.testModuleRef.injector.get(ApplicationInitStatus)))).runInitializers();
        return this.testModuleRef;
    }
    /**
     * \@internal
     * @param {?} moduleType
     * @return {?}
     */
    _compileNgModuleSync(moduleType) {
        this.queueTypesFromModulesArray([moduleType]);
        this.compileTypesSync();
        this.applyProviderOverrides();
        this.applyProviderOverridesToModule(moduleType);
        this.applyTransitiveScopes();
    }
    /**
     * \@internal
     * @param {?} moduleType
     * @return {?}
     */
    _compileNgModuleAsync(moduleType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.queueTypesFromModulesArray([moduleType]);
            yield this.compileComponents();
            this.applyProviderOverrides();
            this.applyProviderOverridesToModule(moduleType);
            this.applyTransitiveScopes();
        });
    }
    /**
     * \@internal
     * @return {?}
     */
    _getModuleResolver() { return this.resolvers.module; }
    /**
     * \@internal
     * @param {?} moduleType
     * @return {?}
     */
    _getComponentFactories(moduleType) {
        return maybeUnwrapFn(moduleType.ngModuleDef.declarations).reduce((/**
         * @param {?} factories
         * @param {?} declaration
         * @return {?}
         */
        (factories, declaration) => {
            /** @nocollapse @type {?} */
            const componentDef = ((/** @type {?} */ (declaration))).ngComponentDef;
            componentDef && factories.push(new ComponentFactory(componentDef, (/** @type {?} */ (this.testModuleRef))));
            return factories;
        }), (/** @type {?} */ ([])));
    }
    /**
     * @private
     * @return {?}
     */
    compileTypesSync() {
        // Compile all queued components, directives, pipes.
        /** @type {?} */
        let needsAsyncResources = false;
        this.pendingComponents.forEach((/**
         * @param {?} declaration
         * @return {?}
         */
        declaration => {
            needsAsyncResources = needsAsyncResources || isComponentDefPendingResolution(declaration);
            /** @type {?} */
            const metadata = (/** @type {?} */ (this.resolvers.component.resolve(declaration)));
            this.maybeStoreNgDef(NG_COMPONENT_DEF, declaration);
            compileComponent(declaration, metadata);
        }));
        this.pendingComponents.clear();
        this.pendingDirectives.forEach((/**
         * @param {?} declaration
         * @return {?}
         */
        declaration => {
            /** @type {?} */
            const metadata = (/** @type {?} */ (this.resolvers.directive.resolve(declaration)));
            this.maybeStoreNgDef(NG_DIRECTIVE_DEF, declaration);
            compileDirective(declaration, metadata);
        }));
        this.pendingDirectives.clear();
        this.pendingPipes.forEach((/**
         * @param {?} declaration
         * @return {?}
         */
        declaration => {
            /** @type {?} */
            const metadata = (/** @type {?} */ (this.resolvers.pipe.resolve(declaration)));
            this.maybeStoreNgDef(NG_PIPE_DEF, declaration);
            compilePipe(declaration, metadata);
        }));
        this.pendingPipes.clear();
        return needsAsyncResources;
    }
    /**
     * @private
     * @return {?}
     */
    applyTransitiveScopes() {
        /** @type {?} */
        const moduleToScope = new Map();
        /** @type {?} */
        const getScopeOfModule = (/**
         * @param {?} moduleType
         * @return {?}
         */
        (moduleType) => {
            if (!moduleToScope.has(moduleType)) {
                /** @type {?} */
                const realType = moduleType === TESTING_MODULE ? this.testModuleType : moduleType;
                moduleToScope.set(moduleType, transitiveScopesFor(realType));
            }
            return (/** @type {?} */ (moduleToScope.get(moduleType)));
        });
        this.componentToModuleScope.forEach((/**
         * @param {?} moduleType
         * @param {?} componentType
         * @return {?}
         */
        (moduleType, componentType) => {
            /** @type {?} */
            const moduleScope = getScopeOfModule(moduleType);
            this.storeFieldOfDefOnType(componentType, NG_COMPONENT_DEF, 'directiveDefs');
            this.storeFieldOfDefOnType(componentType, NG_COMPONENT_DEF, 'pipeDefs');
            patchComponentDefWithScope(((/** @type {?} */ (componentType))).ngComponentDef, moduleScope);
        }));
        this.componentToModuleScope.clear();
    }
    /**
     * @private
     * @return {?}
     */
    applyProviderOverrides() {
        /** @type {?} */
        const maybeApplyOverrides = (/**
         * @param {?} field
         * @return {?}
         */
        (field) => (/**
         * @param {?} type
         * @return {?}
         */
        (type) => {
            /** @type {?} */
            const resolver = field === NG_COMPONENT_DEF ? this.resolvers.component : this.resolvers.directive;
            /** @type {?} */
            const metadata = (/** @type {?} */ (resolver.resolve(type)));
            if (this.hasProviderOverrides(metadata.providers)) {
                this.patchDefWithProviderOverrides(type, field);
            }
        }));
        this.seenComponents.forEach(maybeApplyOverrides(NG_COMPONENT_DEF));
        this.seenDirectives.forEach(maybeApplyOverrides(NG_DIRECTIVE_DEF));
        this.seenComponents.clear();
        this.seenDirectives.clear();
    }
    /**
     * @private
     * @param {?} moduleType
     * @return {?}
     */
    applyProviderOverridesToModule(moduleType) {
        if (this.moduleProvidersOverridden.has(moduleType)) {
            return;
        }
        this.moduleProvidersOverridden.add(moduleType);
        /** @type {?} */
        const injectorDef = ((/** @type {?} */ (moduleType)))[NG_INJECTOR_DEF];
        if (this.providerOverridesByToken.size > 0) {
            if (this.hasProviderOverrides(injectorDef.providers)) {
                this.maybeStoreNgDef(NG_INJECTOR_DEF, moduleType);
                this.storeFieldOfDefOnType(moduleType, NG_INJECTOR_DEF, 'providers');
                injectorDef.providers = [
                    ...injectorDef.providers,
                    ...this.getProviderOverrides(injectorDef.providers)
                ];
            }
            // Apply provider overrides to imported modules recursively
            /** @type {?} */
            const moduleDef = ((/** @type {?} */ (moduleType)))[NG_MODULE_DEF];
            for (const importType of moduleDef.imports) {
                this.applyProviderOverridesToModule(importType);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    patchComponentsWithExistingStyles() {
        this.existingComponentStyles.forEach((/**
         * @param {?} styles
         * @param {?} type
         * @return {?}
         */
        (styles, type) => ((/** @type {?} */ (type)))[NG_COMPONENT_DEF].styles = styles));
        this.existingComponentStyles.clear();
    }
    /**
     * @private
     * @param {?} arr
     * @param {?} moduleType
     * @return {?}
     */
    queueTypeArray(arr, moduleType) {
        for (const value of arr) {
            if (Array.isArray(value)) {
                this.queueTypeArray(value, moduleType);
            }
            else {
                this.queueType(value, moduleType);
            }
        }
    }
    /**
     * @private
     * @param {?} ngModule
     * @return {?}
     */
    recompileNgModule(ngModule) {
        /** @type {?} */
        const metadata = this.resolvers.module.resolve(ngModule);
        if (metadata === null) {
            throw new Error(`Unable to resolve metadata for NgModule: ${ngModule.name}`);
        }
        // Cache the initial ngModuleDef as it will be overwritten.
        this.maybeStoreNgDef(NG_MODULE_DEF, ngModule);
        this.maybeStoreNgDef(NG_INJECTOR_DEF, ngModule);
        compileNgModuleDefs((/** @type {?} */ (ngModule)), metadata);
    }
    /**
     * @private
     * @param {?} type
     * @param {?} moduleType
     * @return {?}
     */
    queueType(type, moduleType) {
        /** @type {?} */
        const component = this.resolvers.component.resolve(type);
        if (component) {
            // Check whether a give Type has respective NG def (ngComponentDef) and compile if def is
            // missing. That might happen in case a class without any Angular decorators extends another
            // class where Component/Directive/Pipe decorator is defined.
            if (isComponentDefPendingResolution(type) || !type.hasOwnProperty(NG_COMPONENT_DEF)) {
                this.pendingComponents.add(type);
            }
            this.seenComponents.add(type);
            // Keep track of the module which declares this component, so later the component's scope
            // can be set correctly. Only record this the first time, because it might be overridden by
            // overrideTemplateUsingTestingModule.
            if (!this.componentToModuleScope.has(type)) {
                this.componentToModuleScope.set(type, moduleType);
            }
            return;
        }
        /** @type {?} */
        const directive = this.resolvers.directive.resolve(type);
        if (directive) {
            if (!type.hasOwnProperty(NG_DIRECTIVE_DEF)) {
                this.pendingDirectives.add(type);
            }
            this.seenDirectives.add(type);
            return;
        }
        /** @type {?} */
        const pipe = this.resolvers.pipe.resolve(type);
        if (pipe && !type.hasOwnProperty(NG_PIPE_DEF)) {
            this.pendingPipes.add(type);
            return;
        }
    }
    /**
     * @private
     * @param {?} arr
     * @return {?}
     */
    queueTypesFromModulesArray(arr) {
        for (const value of arr) {
            if (Array.isArray(value)) {
                this.queueTypesFromModulesArray(value);
            }
            else if (hasNgModuleDef(value)) {
                /** @nocollapse @type {?} */
                const def = value.ngModuleDef;
                // Look through declarations, imports, and exports, and queue everything found there.
                this.queueTypeArray(maybeUnwrapFn(def.declarations), value);
                this.queueTypesFromModulesArray(maybeUnwrapFn(def.imports));
                this.queueTypesFromModulesArray(maybeUnwrapFn(def.exports));
            }
        }
    }
    /**
     * @private
     * @param {?} prop
     * @param {?} type
     * @return {?}
     */
    maybeStoreNgDef(prop, type) {
        if (!this.initialNgDefs.has(type)) {
            /** @type {?} */
            const currentDef = Object.getOwnPropertyDescriptor(type, prop);
            this.initialNgDefs.set(type, [prop, currentDef]);
        }
    }
    /**
     * @private
     * @param {?} type
     * @param {?} defField
     * @param {?} field
     * @return {?}
     */
    storeFieldOfDefOnType(type, defField, field) {
        /** @type {?} */
        const def = ((/** @type {?} */ (type)))[defField];
        /** @type {?} */
        const original = def[field];
        this.defCleanupOps.push({ field, def, original });
    }
    /**
     * Clears current components resolution queue, but stores the state of the queue, so we can
     * restore it later. Clearing the queue is required before we try to compile components (via
     * `TestBed.compileComponents`), so that component defs are in sync with the resolution queue.
     * @private
     * @return {?}
     */
    clearComponentResolutionQueue() {
        if (this.originalComponentResolutionQueue === null) {
            this.originalComponentResolutionQueue = new Map();
        }
        clearResolutionOfComponentResourcesQueue().forEach((/**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        (value, key) => (/** @type {?} */ (this.originalComponentResolutionQueue)).set(key, value)));
    }
    /*
       * Restores component resolution queue to the previously saved state. This operation is performed
       * as a part of restoring the state after completion of the current set of tests (that might
       * potentially mutate the state).
       */
    /**
     * @private
     * @return {?}
     */
    restoreComponentResolutionQueue() {
        if (this.originalComponentResolutionQueue !== null) {
            restoreComponentResolutionQueue(this.originalComponentResolutionQueue);
            this.originalComponentResolutionQueue = null;
        }
    }
    /**
     * @return {?}
     */
    restoreOriginalState() {
        for (const op of this.defCleanupOps) {
            op.def[op.field] = op.original;
        }
        // Restore initial component/directive/pipe defs
        this.initialNgDefs.forEach((/**
         * @param {?} value
         * @param {?} type
         * @return {?}
         */
        (value, type) => {
            const [prop, descriptor] = value;
            if (!descriptor) {
                // Delete operations are generally undesirable since they have performance implications
                // on objects they were applied to. In this particular case, situations where this code is
                // invoked should be quite rare to cause any noticable impact, since it's applied only to
                // some test cases (for example when class with no annotations extends some @Component)
                // when we need to clear 'ngComponentDef' field on a given class to restore its original
                // state (before applying overrides and running tests).
                delete ((/** @type {?} */ (type)))[prop];
            }
            else {
                Object.defineProperty(type, prop, descriptor);
            }
        }));
        this.initialNgDefs.clear();
        this.moduleProvidersOverridden.clear();
        this.restoreComponentResolutionQueue();
    }
    /**
     * @private
     * @return {?}
     */
    compileTestModule() {
        /** @type {?} */
        const rootProviderOverrides = this.rootProviderOverrides;
        class RootScopeModule {
        }
        RootScopeModule.decorators = [
            { type: NgModule, args: [{
                        providers: [...rootProviderOverrides],
                        jit: true,
                    },] },
        ];
        class R3ErrorHandlerModule {
        }
        R3ErrorHandlerModule.decorators = [
            { type: NgModule, args: [{ providers: [{ provide: ErrorHandler, useClass: R3TestErrorHandler }] },] },
        ];
        /** @type {?} */
        const ngZone = new NgZone({ enableLongStackTrace: true });
        /** @type {?} */
        const providers = [
            { provide: NgZone, useValue: ngZone },
            { provide: Compiler, useFactory: (/**
                 * @return {?}
                 */
                () => new R3TestCompiler(this)) },
            ...this.providers,
            ...this.providerOverrides,
        ];
        /** @type {?} */
        const imports = [RootScopeModule, this.additionalModuleTypes, R3ErrorHandlerModule, this.imports || []];
        // clang-format off
        compileNgModuleDefs(this.testModuleType, {
            declarations: this.declarations,
            imports,
            schemas: this.schemas,
            providers,
        });
        // clang-format on
        this.applyProviderOverridesToModule(this.testModuleType);
    }
    /**
     * @return {?}
     */
    get injector() {
        if (this._injector !== null) {
            return this._injector;
        }
        /** @type {?} */
        const providers = [];
        /** @type {?} */
        const compilerOptions = this.platform.injector.get(COMPILER_OPTIONS);
        compilerOptions.forEach((/**
         * @param {?} opts
         * @return {?}
         */
        opts => {
            if (opts.providers) {
                providers.push(opts.providers);
            }
        }));
        if (this.compilerProviders !== null) {
            providers.push(...this.compilerProviders);
        }
        // TODO(ocombe): make this work with an Injector directly instead of creating a module for it
        class CompilerModule {
        }
        CompilerModule.decorators = [
            { type: NgModule, args: [{ providers },] },
        ];
        /** @type {?} */
        const CompilerModuleFactory = new R3NgModuleFactory(CompilerModule);
        this._injector = CompilerModuleFactory.create(this.platform.injector).injector;
        return this._injector;
    }
    // get overrides for a specific provider (if any)
    /**
     * @private
     * @param {?} provider
     * @return {?}
     */
    getSingleProviderOverrides(provider) {
        /** @type {?} */
        const token = provider && typeof provider === 'object' && provider.hasOwnProperty('provide') ?
            provider.provide :
            provider;
        return this.providerOverridesByToken.get(token) || [];
    }
    /**
     * @private
     * @param {?=} providers
     * @return {?}
     */
    getProviderOverrides(providers) {
        if (!providers || !providers.length || this.providerOverridesByToken.size === 0)
            return [];
        // There are two flattening operations here. The inner flatten() operates on the metadata's
        // providers and applies a mapping function which retrieves overrides for each incoming
        // provider. The outer flatten() then flattens the produced overrides array. If this is not
        // done, the array can contain other empty arrays (e.g. `[[], []]`) which leak into the
        // providers array and contaminate any error messages that might be generated.
        return flatten(flatten(providers, (/**
         * @param {?} provider
         * @return {?}
         */
        (provider) => this.getSingleProviderOverrides(provider))));
    }
    /**
     * @private
     * @param {?=} providers
     * @return {?}
     */
    hasProviderOverrides(providers) {
        return this.getProviderOverrides(providers).length > 0;
    }
    /**
     * @private
     * @param {?} declaration
     * @param {?} field
     * @return {?}
     */
    patchDefWithProviderOverrides(declaration, field) {
        /** @type {?} */
        const def = ((/** @type {?} */ (declaration)))[field];
        if (def && def.providersResolver) {
            this.maybeStoreNgDef(field, declaration);
            /** @type {?} */
            const resolver = def.providersResolver;
            /** @type {?} */
            const processProvidersFn = (/**
             * @param {?} providers
             * @return {?}
             */
            (providers) => {
                /** @type {?} */
                const overrides = this.getProviderOverrides(providers);
                return [...providers, ...overrides];
            });
            this.storeFieldOfDefOnType(declaration, field, 'providersResolver');
            def.providersResolver = (/**
             * @param {?} ngDef
             * @return {?}
             */
            (ngDef) => resolver(ngDef, processProvidersFn));
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.originalComponentResolutionQueue;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.declarations;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.imports;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.providers;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.schemas;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.pendingComponents;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.pendingDirectives;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.pendingPipes;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.seenComponents;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.seenDirectives;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.existingComponentStyles;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.resolvers;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.componentToModuleScope;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.initialNgDefs;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.defCleanupOps;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.compilerProviders;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.providerOverrides;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.rootProviderOverrides;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.providerOverridesByToken;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.moduleProvidersOverridden;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.testModuleType;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.testModuleRef;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.platform;
    /**
     * @type {?}
     * @private
     */
    R3TestBedCompiler.prototype.additionalModuleTypes;
}
/**
 * @return {?}
 */
function initResolvers() {
    return {
        module: new NgModuleResolver(),
        component: new ComponentResolver(),
        directive: new DirectiveResolver(),
        pipe: new PipeResolver()
    };
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function hasNgModuleDef(value) {
    return value.hasOwnProperty('ngModuleDef');
}
/**
 * @template T
 * @param {?} maybeFn
 * @return {?}
 */
function maybeUnwrapFn(maybeFn) {
    return maybeFn instanceof Function ? maybeFn() : maybeFn;
}
/**
 * @template T
 * @param {?} values
 * @param {?=} mapFn
 * @return {?}
 */
function flatten(values, mapFn) {
    /** @type {?} */
    const out = [];
    values.forEach((/**
     * @param {?} value
     * @return {?}
     */
    value => {
        if (Array.isArray(value)) {
            out.push(...flatten(value, mapFn));
        }
        else {
            out.push(mapFn ? mapFn(value) : value);
        }
    }));
    return out;
}
/**
 * Error handler used for tests. Rethrows errors rather than logging them out.
 */
class R3TestErrorHandler extends ErrorHandler {
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) { throw error; }
}
class R3TestCompiler {
    /**
     * @param {?} testBed
     */
    constructor(testBed) {
        this.testBed = testBed;
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleSync(moduleType) {
        this.testBed._compileNgModuleSync(moduleType);
        return new R3NgModuleFactory(moduleType);
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAsync(moduleType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.testBed._compileNgModuleAsync(moduleType);
            return new R3NgModuleFactory(moduleType);
        });
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsSync(moduleType) {
        /** @type {?} */
        const ngModuleFactory = this.compileModuleSync(moduleType);
        /** @type {?} */
        const componentFactories = this.testBed._getComponentFactories((/** @type {?} */ (moduleType)));
        return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsAsync(moduleType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const ngModuleFactory = yield this.compileModuleAsync(moduleType);
            /** @type {?} */
            const componentFactories = this.testBed._getComponentFactories((/** @type {?} */ (moduleType)));
            return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
        });
    }
    /**
     * @return {?}
     */
    clearCache() { }
    /**
     * @param {?} type
     * @return {?}
     */
    clearCacheFor(type) { }
    /**
     * @param {?} moduleType
     * @return {?}
     */
    getModuleId(moduleType) {
        /** @type {?} */
        const meta = this.testBed._getModuleResolver().resolve(moduleType);
        return meta && meta.id || undefined;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    R3TestCompiler.prototype.testBed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfdGVzdF9iZWRfY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL3IzX3Rlc3RfYmVkX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQXdCLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxRQUFRLEVBQW1CLE1BQU0sRUFBK0MsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsWUFBWSxJQUFJLFdBQVcsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUsY0FBYyxJQUFJLGFBQWEsRUFBRSxZQUFZLElBQUksV0FBVyxFQUFFLHdCQUF3QixJQUFJLGdCQUFnQixFQUFFLG1CQUFtQixJQUFJLFdBQVcsRUFBbUMsZ0JBQWdCLElBQUksaUJBQWlCLEVBQXVILDJCQUEyQixJQUFJLDBCQUEwQixFQUFFLG9CQUFvQixJQUFJLG1CQUFtQixHQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzE4QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLHdDQUF3QyxFQUFFLCtCQUErQixFQUFFLHlCQUF5QixFQUFFLCtCQUErQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFHMUwsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBVyxNQUFNLGFBQWEsQ0FBQzs7TUFHckcsY0FBYyxHQUFHLGVBQWU7Ozs7QUFXdEMsK0JBSUM7OztJQUhDLGlDQUFjOztJQUNkLCtCQUFT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LGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9FLENBQUM7S0FBQTs7OztJQUVELFVBQVUsS0FBVSxDQUFDOzs7OztJQUVyQixhQUFhLENBQUMsSUFBZSxJQUFTLENBQUM7Ozs7O0lBRXZDLFdBQVcsQ0FBQyxVQUFxQjs7Y0FDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDO0lBQ3RDLENBQUM7Q0FDRjs7Ozs7O0lBakNhLGlDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvbkluaXRTdGF0dXMsIENPTVBJTEVSX09QVElPTlMsIENvbXBpbGVyLCBDb21wb25lbnQsIERpcmVjdGl2ZSwgRXJyb3JIYW5kbGVyLCBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzLCBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5LCBOZ1pvbmUsIEluamVjdG9yLCBQaXBlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFR5cGUsIMm1Y29tcGlsZUNvbXBvbmVudCBhcyBjb21waWxlQ29tcG9uZW50LCDJtWNvbXBpbGVEaXJlY3RpdmUgYXMgY29tcGlsZURpcmVjdGl2ZSwgybVjb21waWxlTmdNb2R1bGVEZWZzIGFzIGNvbXBpbGVOZ01vZHVsZURlZnMsIMm1Y29tcGlsZVBpcGUgYXMgY29tcGlsZVBpcGUsIMm1Z2V0SW5qZWN0YWJsZURlZiBhcyBnZXRJbmplY3RhYmxlRGVmLCDJtU5HX0NPTVBPTkVOVF9ERUYgYXMgTkdfQ09NUE9ORU5UX0RFRiwgybVOR19ESVJFQ1RJVkVfREVGIGFzIE5HX0RJUkVDVElWRV9ERUYsIMm1TkdfSU5KRUNUT1JfREVGIGFzIE5HX0lOSkVDVE9SX0RFRiwgybVOR19NT0RVTEVfREVGIGFzIE5HX01PRFVMRV9ERUYsIMm1TkdfUElQRV9ERUYgYXMgTkdfUElQRV9ERUYsIMm1UmVuZGVyM0NvbXBvbmVudEZhY3RvcnkgYXMgQ29tcG9uZW50RmFjdG9yeSwgybVSZW5kZXIzTmdNb2R1bGVSZWYgYXMgTmdNb2R1bGVSZWYsIM6USW5qZWN0YWJsZURlZiBhcyBJbmplY3RhYmxlRGVmLCDJtU5nTW9kdWxlRmFjdG9yeSBhcyBSM05nTW9kdWxlRmFjdG9yeSwgybVOZ01vZHVsZVRyYW5zaXRpdmVTY29wZXMgYXMgTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzLCDJtU5nTW9kdWxlVHlwZSBhcyBOZ01vZHVsZVR5cGUsIMm1RGlyZWN0aXZlRGVmIGFzIERpcmVjdGl2ZURlZiwgybVwYXRjaENvbXBvbmVudERlZldpdGhTY29wZSBhcyBwYXRjaENvbXBvbmVudERlZldpdGhTY29wZSwgybV0cmFuc2l0aXZlU2NvcGVzRm9yIGFzIHRyYW5zaXRpdmVTY29wZXNGb3IsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVzb3VyY2VMb2FkZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtjbGVhclJlc29sdXRpb25PZkNvbXBvbmVudFJlc291cmNlc1F1ZXVlLCByZXN0b3JlQ29tcG9uZW50UmVzb2x1dGlvblF1ZXVlLCByZXNvbHZlQ29tcG9uZW50UmVzb3VyY2VzLCBpc0NvbXBvbmVudERlZlBlbmRpbmdSZXNvbHV0aW9ufSBmcm9tICcuLi8uLi9zcmMvbWV0YWRhdGEvcmVzb3VyY2VfbG9hZGluZyc7XG5cbmltcG9ydCB7TWV0YWRhdGFPdmVycmlkZX0gZnJvbSAnLi9tZXRhZGF0YV9vdmVycmlkZSc7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyLCBEaXJlY3RpdmVSZXNvbHZlciwgTmdNb2R1bGVSZXNvbHZlciwgUGlwZVJlc29sdmVyLCBSZXNvbHZlcn0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHtUZXN0TW9kdWxlTWV0YWRhdGF9IGZyb20gJy4vdGVzdF9iZWRfY29tbW9uJztcblxuY29uc3QgVEVTVElOR19NT0RVTEUgPSAnVGVzdGluZ01vZHVsZSc7XG50eXBlIFRFU1RJTkdfTU9EVUxFID0gdHlwZW9mIFRFU1RJTkdfTU9EVUxFO1xuXG4vLyBSZXNvbHZlcnMgZm9yIEFuZ3VsYXIgZGVjb3JhdG9yc1xudHlwZSBSZXNvbHZlcnMgPSB7XG4gIG1vZHVsZTogUmVzb2x2ZXI8TmdNb2R1bGU+LFxuICBjb21wb25lbnQ6IFJlc29sdmVyPERpcmVjdGl2ZT4sXG4gIGRpcmVjdGl2ZTogUmVzb2x2ZXI8Q29tcG9uZW50PixcbiAgcGlwZTogUmVzb2x2ZXI8UGlwZT4sXG59O1xuXG5pbnRlcmZhY2UgQ2xlYW51cE9wZXJhdGlvbiB7XG4gIGZpZWxkOiBzdHJpbmc7XG4gIGRlZjogYW55O1xuICBvcmlnaW5hbDogdW5rbm93bjtcbn1cblxuZXhwb3J0IGNsYXNzIFIzVGVzdEJlZENvbXBpbGVyIHtcbiAgcHJpdmF0ZSBvcmlnaW5hbENvbXBvbmVudFJlc29sdXRpb25RdWV1ZTogTWFwPFR5cGU8YW55PiwgQ29tcG9uZW50PnxudWxsID0gbnVsbDtcblxuICAvLyBUZXN0aW5nIG1vZHVsZSBjb25maWd1cmF0aW9uXG4gIHByaXZhdGUgZGVjbGFyYXRpb25zOiBUeXBlPGFueT5bXSA9IFtdO1xuICBwcml2YXRlIGltcG9ydHM6IFR5cGU8YW55PltdID0gW107XG4gIHByaXZhdGUgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW107XG4gIHByaXZhdGUgc2NoZW1hczogYW55W10gPSBbXTtcblxuICAvLyBRdWV1ZXMgb2YgY29tcG9uZW50cy9kaXJlY3RpdmVzL3BpcGVzIHRoYXQgc2hvdWxkIGJlIHJlY29tcGlsZWQuXG4gIHByaXZhdGUgcGVuZGluZ0NvbXBvbmVudHMgPSBuZXcgU2V0PFR5cGU8YW55Pj4oKTtcbiAgcHJpdmF0ZSBwZW5kaW5nRGlyZWN0aXZlcyA9IG5ldyBTZXQ8VHlwZTxhbnk+PigpO1xuICBwcml2YXRlIHBlbmRpbmdQaXBlcyA9IG5ldyBTZXQ8VHlwZTxhbnk+PigpO1xuXG4gIC8vIEtlZXAgdHJhY2sgb2YgYWxsIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZXMsIHNvIHdlIGNhbiBwYXRjaCBQcm92aWRlcnMgb250byBkZWZzIGxhdGVyLlxuICBwcml2YXRlIHNlZW5Db21wb25lbnRzID0gbmV3IFNldDxUeXBlPGFueT4+KCk7XG4gIHByaXZhdGUgc2VlbkRpcmVjdGl2ZXMgPSBuZXcgU2V0PFR5cGU8YW55Pj4oKTtcblxuICAvLyBTdG9yZSByZXNvbHZlZCBzdHlsZXMgZm9yIENvbXBvbmVudHMgdGhhdCBoYXZlIHRlbXBsYXRlIG92ZXJyaWRlcyBwcmVzZW50IGFuZCBgc3R5bGVVcmxzYFxuICAvLyBkZWZpbmVkIGF0IHRoZSBzYW1lIHRpbWUuXG4gIHByaXZhdGUgZXhpc3RpbmdDb21wb25lbnRTdHlsZXMgPSBuZXcgTWFwPFR5cGU8YW55Piwgc3RyaW5nW10+KCk7XG5cbiAgcHJpdmF0ZSByZXNvbHZlcnM6IFJlc29sdmVycyA9IGluaXRSZXNvbHZlcnMoKTtcblxuICBwcml2YXRlIGNvbXBvbmVudFRvTW9kdWxlU2NvcGUgPSBuZXcgTWFwPFR5cGU8YW55PiwgVHlwZTxhbnk+fFRFU1RJTkdfTU9EVUxFPigpO1xuXG4gIC8vIE1hcCB0aGF0IGtlZXBzIGluaXRpYWwgdmVyc2lvbiBvZiBjb21wb25lbnQvZGlyZWN0aXZlL3BpcGUgZGVmcyBpbiBjYXNlXG4gIC8vIHdlIGNvbXBpbGUgYSBUeXBlIGFnYWluLCB0aHVzIG92ZXJyaWRpbmcgcmVzcGVjdGl2ZSBzdGF0aWMgZmllbGRzLiBUaGlzIGlzXG4gIC8vIHJlcXVpcmVkIHRvIG1ha2Ugc3VyZSB3ZSByZXN0b3JlIGRlZnMgdG8gdGhlaXIgaW5pdGlhbCBzdGF0ZXMgYmV0d2VlbiB0ZXN0IHJ1bnNcbiAgLy8gVE9ETzogd2Ugc2hvdWxkIHN1cHBvcnQgdGhlIGNhc2Ugd2l0aCBtdWx0aXBsZSBkZWZzIG9uIGEgdHlwZVxuICBwcml2YXRlIGluaXRpYWxOZ0RlZnMgPSBuZXcgTWFwPFR5cGU8YW55PiwgW3N0cmluZywgUHJvcGVydHlEZXNjcmlwdG9yfHVuZGVmaW5lZF0+KCk7XG5cbiAgLy8gQXJyYXkgdGhhdCBrZWVwcyBjbGVhbnVwIG9wZXJhdGlvbnMgZm9yIGluaXRpYWwgdmVyc2lvbnMgb2YgY29tcG9uZW50L2RpcmVjdGl2ZS9waXBlL21vZHVsZVxuICAvLyBkZWZzIGluIGNhc2UgVGVzdEJlZCBtYWtlcyBjaGFuZ2VzIHRvIHRoZSBvcmlnaW5hbHMuXG4gIHByaXZhdGUgZGVmQ2xlYW51cE9wczogQ2xlYW51cE9wZXJhdGlvbltdID0gW107XG5cbiAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yfG51bGwgPSBudWxsO1xuICBwcml2YXRlIGNvbXBpbGVyUHJvdmlkZXJzOiBQcm92aWRlcltdfG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcHJvdmlkZXJPdmVycmlkZXM6IFByb3ZpZGVyW10gPSBbXTtcbiAgcHJpdmF0ZSByb290UHJvdmlkZXJPdmVycmlkZXM6IFByb3ZpZGVyW10gPSBbXTtcbiAgcHJpdmF0ZSBwcm92aWRlck92ZXJyaWRlc0J5VG9rZW4gPSBuZXcgTWFwPGFueSwgUHJvdmlkZXJbXT4oKTtcbiAgcHJpdmF0ZSBtb2R1bGVQcm92aWRlcnNPdmVycmlkZGVuID0gbmV3IFNldDxUeXBlPGFueT4+KCk7XG5cbiAgcHJpdmF0ZSB0ZXN0TW9kdWxlVHlwZTogTmdNb2R1bGVUeXBlPGFueT47XG4gIHByaXZhdGUgdGVzdE1vZHVsZVJlZjogTmdNb2R1bGVSZWY8YW55PnxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiwgcHJpdmF0ZSBhZGRpdGlvbmFsTW9kdWxlVHlwZXM6IFR5cGU8YW55PnxUeXBlPGFueT5bXSkge1xuICAgIGNsYXNzIER5bmFtaWNUZXN0TW9kdWxlIHt9XG4gICAgdGhpcy50ZXN0TW9kdWxlVHlwZSA9IER5bmFtaWNUZXN0TW9kdWxlIGFzIGFueTtcbiAgfVxuXG4gIHNldENvbXBpbGVyUHJvdmlkZXJzKHByb3ZpZGVyczogUHJvdmlkZXJbXXxudWxsKTogdm9pZCB7XG4gICAgdGhpcy5jb21waWxlclByb3ZpZGVycyA9IHByb3ZpZGVycztcbiAgICB0aGlzLl9pbmplY3RvciA9IG51bGw7XG4gIH1cblxuICBjb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZjogVGVzdE1vZHVsZU1ldGFkYXRhKTogdm9pZCB7XG4gICAgLy8gRW5xdWV1ZSBhbnkgY29tcGlsYXRpb24gdGFza3MgZm9yIHRoZSBkaXJlY3RseSBkZWNsYXJlZCBjb21wb25lbnQuXG4gICAgaWYgKG1vZHVsZURlZi5kZWNsYXJhdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5xdWV1ZVR5cGVBcnJheShtb2R1bGVEZWYuZGVjbGFyYXRpb25zLCBURVNUSU5HX01PRFVMRSk7XG4gICAgICB0aGlzLmRlY2xhcmF0aW9ucy5wdXNoKC4uLm1vZHVsZURlZi5kZWNsYXJhdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIEVucXVldWUgYW55IGNvbXBpbGF0aW9uIHRhc2tzIGZvciBpbXBvcnRlZCBtb2R1bGVzLlxuICAgIGlmIChtb2R1bGVEZWYuaW1wb3J0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnF1ZXVlVHlwZXNGcm9tTW9kdWxlc0FycmF5KG1vZHVsZURlZi5pbXBvcnRzKTtcbiAgICAgIHRoaXMuaW1wb3J0cy5wdXNoKC4uLm1vZHVsZURlZi5pbXBvcnRzKTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlRGVmLnByb3ZpZGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnByb3ZpZGVycy5wdXNoKC4uLm1vZHVsZURlZi5wcm92aWRlcnMpO1xuICAgIH1cblxuICAgIGlmIChtb2R1bGVEZWYuc2NoZW1hcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNjaGVtYXMucHVzaCguLi5tb2R1bGVEZWYuc2NoZW1hcyk7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZCB7XG4gICAgLy8gQ29tcGlsZSB0aGUgbW9kdWxlIHJpZ2h0IGF3YXkuXG4gICAgdGhpcy5yZXNvbHZlcnMubW9kdWxlLmFkZE92ZXJyaWRlKG5nTW9kdWxlLCBvdmVycmlkZSk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLnJlc29sdmVycy5tb2R1bGUucmVzb2x2ZShuZ01vZHVsZSk7XG4gICAgaWYgKG1ldGFkYXRhID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7bmdNb2R1bGUubmFtZX0gaXMgbm90IGFuIEBOZ01vZHVsZSBvciBpcyBtaXNzaW5nIG1ldGFkYXRhYCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWNvbXBpbGVOZ01vZHVsZShuZ01vZHVsZSk7XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgbW9kdWxlIGhhcyBhIHZhbGlkIC5uZ01vZHVsZURlZiwgYnV0IHRoZSBvdmVycmlkZSBtYXkgaGF2ZSBpbnRyb2R1Y2VkXG4gICAgLy8gbmV3IGRlY2xhcmF0aW9ucyBvciBpbXBvcnRlZCBtb2R1bGVzLiBJbmdlc3QgYW55IHBvc3NpYmxlIG5ldyB0eXBlcyBhbmQgYWRkIHRoZW0gdG8gdGhlXG4gICAgLy8gY3VycmVudCBxdWV1ZS5cbiAgICB0aGlzLnF1ZXVlVHlwZXNGcm9tTW9kdWxlc0FycmF5KFtuZ01vZHVsZV0pO1xuICB9XG5cbiAgb3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD4pOiB2b2lkIHtcbiAgICB0aGlzLnJlc29sdmVycy5jb21wb25lbnQuYWRkT3ZlcnJpZGUoY29tcG9uZW50LCBvdmVycmlkZSk7XG4gICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50cy5hZGQoY29tcG9uZW50KTtcbiAgfVxuXG4gIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZCB7XG4gICAgdGhpcy5yZXNvbHZlcnMuZGlyZWN0aXZlLmFkZE92ZXJyaWRlKGRpcmVjdGl2ZSwgb3ZlcnJpZGUpO1xuICAgIHRoaXMucGVuZGluZ0RpcmVjdGl2ZXMuYWRkKGRpcmVjdGl2ZSk7XG4gIH1cblxuICBvdmVycmlkZVBpcGUocGlwZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IHZvaWQge1xuICAgIHRoaXMucmVzb2x2ZXJzLnBpcGUuYWRkT3ZlcnJpZGUocGlwZSwgb3ZlcnJpZGUpO1xuICAgIHRoaXMucGVuZGluZ1BpcGVzLmFkZChwaXBlKTtcbiAgfVxuXG4gIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHt1c2VGYWN0b3J5PzogRnVuY3Rpb24sIHVzZVZhbHVlPzogYW55LCBkZXBzPzogYW55W119KTpcbiAgICAgIHZvaWQge1xuICAgIGNvbnN0IHByb3ZpZGVyRGVmID0gcHJvdmlkZXIudXNlRmFjdG9yeSA/XG4gICAgICAgIHtwcm92aWRlOiB0b2tlbiwgdXNlRmFjdG9yeTogcHJvdmlkZXIudXNlRmFjdG9yeSwgZGVwczogcHJvdmlkZXIuZGVwcyB8fCBbXX0gOlxuICAgICAgICB7cHJvdmlkZTogdG9rZW4sIHVzZVZhbHVlOiBwcm92aWRlci51c2VWYWx1ZX07XG5cbiAgICBsZXQgaW5qZWN0YWJsZURlZjogSW5qZWN0YWJsZURlZjxhbnk+fG51bGw7XG4gICAgY29uc3QgaXNSb290ID1cbiAgICAgICAgKHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycgJiYgKGluamVjdGFibGVEZWYgPSBnZXRJbmplY3RhYmxlRGVmKHRva2VuKSkgJiZcbiAgICAgICAgIGluamVjdGFibGVEZWYucHJvdmlkZWRJbiA9PT0gJ3Jvb3QnKTtcbiAgICBjb25zdCBvdmVycmlkZXNCdWNrZXQgPSBpc1Jvb3QgPyB0aGlzLnJvb3RQcm92aWRlck92ZXJyaWRlcyA6IHRoaXMucHJvdmlkZXJPdmVycmlkZXM7XG4gICAgb3ZlcnJpZGVzQnVja2V0LnB1c2gocHJvdmlkZXJEZWYpO1xuXG4gICAgLy8gS2VlcCBhbGwgb3ZlcnJpZGVzIGdyb3VwZWQgYnkgdG9rZW4gYXMgd2VsbCBmb3IgZmFzdCBsb29rdXBzIHVzaW5nIHRva2VuXG4gICAgY29uc3Qgb3ZlcnJpZGVzRm9yVG9rZW4gPSB0aGlzLnByb3ZpZGVyT3ZlcnJpZGVzQnlUb2tlbi5nZXQodG9rZW4pIHx8IFtdO1xuICAgIG92ZXJyaWRlc0ZvclRva2VuLnB1c2gocHJvdmlkZXJEZWYpO1xuICAgIHRoaXMucHJvdmlkZXJPdmVycmlkZXNCeVRva2VuLnNldCh0b2tlbiwgb3ZlcnJpZGVzRm9yVG9rZW4pO1xuICB9XG5cbiAgb3ZlcnJpZGVUZW1wbGF0ZVVzaW5nVGVzdGluZ01vZHVsZSh0eXBlOiBUeXBlPGFueT4sIHRlbXBsYXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkZWYgPSAodHlwZSBhcyBhbnkpW05HX0NPTVBPTkVOVF9ERUZdO1xuICAgIGNvbnN0IGhhc1N0eWxlVXJscyA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5yZXNvbHZlcnMuY29tcG9uZW50LnJlc29sdmUodHlwZSkgIWFzIENvbXBvbmVudDtcbiAgICAgIHJldHVybiAhIW1ldGFkYXRhLnN0eWxlVXJscyAmJiBtZXRhZGF0YS5zdHlsZVVybHMubGVuZ3RoID4gMDtcbiAgICB9O1xuICAgIGNvbnN0IG92ZXJyaWRlU3R5bGVVcmxzID0gISFkZWYgJiYgIWlzQ29tcG9uZW50RGVmUGVuZGluZ1Jlc29sdXRpb24odHlwZSkgJiYgaGFzU3R5bGVVcmxzKCk7XG5cbiAgICAvLyBJbiBJdnksIGNvbXBpbGluZyBhIGNvbXBvbmVudCBkb2VzIG5vdCByZXF1aXJlIGtub3dpbmcgdGhlIG1vZHVsZSBwcm92aWRpbmcgdGhlXG4gICAgLy8gY29tcG9uZW50J3Mgc2NvcGUsIHNvIG92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUgY2FuIGJlIGltcGxlbWVudGVkIHB1cmVseSB2aWFcbiAgICAvLyBvdmVycmlkZUNvbXBvbmVudC4gSW1wb3J0YW50OiBvdmVycmlkaW5nIHRlbXBsYXRlIHJlcXVpcmVzIGZ1bGwgQ29tcG9uZW50IHJlLWNvbXBpbGF0aW9uLFxuICAgIC8vIHdoaWNoIG1heSBmYWlsIGluIGNhc2Ugc3R5bGVVcmxzIGFyZSBhbHNvIHByZXNlbnQgKHRodXMgQ29tcG9uZW50IGlzIGNvbnNpZGVyZWQgYXMgcmVxdWlyZWRcbiAgICAvLyByZXNvbHV0aW9uKS4gSW4gb3JkZXIgdG8gYXZvaWQgdGhpcywgd2UgcHJlZW1wdGl2ZWx5IHNldCBzdHlsZVVybHMgdG8gYW4gZW1wdHkgYXJyYXksXG4gICAgLy8gcHJlc2VydmUgY3VycmVudCBzdHlsZXMgYXZhaWxhYmxlIG9uIENvbXBvbmVudCBkZWYgYW5kIHJlc3RvcmUgc3R5bGVzIGJhY2sgb25jZSBjb21waWxhdGlvblxuICAgIC8vIGlzIGNvbXBsZXRlLlxuICAgIGNvbnN0IG92ZXJyaWRlID0gb3ZlcnJpZGVTdHlsZVVybHMgPyB7dGVtcGxhdGUsIHN0eWxlczogW10sIHN0eWxlVXJsczogW119IDoge3RlbXBsYXRlfTtcbiAgICB0aGlzLm92ZXJyaWRlQ29tcG9uZW50KHR5cGUsIHtzZXQ6IG92ZXJyaWRlfSk7XG5cbiAgICBpZiAob3ZlcnJpZGVTdHlsZVVybHMgJiYgZGVmLnN0eWxlcyAmJiBkZWYuc3R5bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZXhpc3RpbmdDb21wb25lbnRTdHlsZXMuc2V0KHR5cGUsIGRlZi5zdHlsZXMpO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgY29tcG9uZW50J3Mgc2NvcGUgdG8gYmUgdGhlIHRlc3RpbmcgbW9kdWxlLlxuICAgIHRoaXMuY29tcG9uZW50VG9Nb2R1bGVTY29wZS5zZXQodHlwZSwgVEVTVElOR19NT0RVTEUpO1xuICB9XG5cbiAgYXN5bmMgY29tcGlsZUNvbXBvbmVudHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5jbGVhckNvbXBvbmVudFJlc29sdXRpb25RdWV1ZSgpO1xuICAgIC8vIFJ1biBjb21waWxlcnMgZm9yIGFsbCBxdWV1ZWQgdHlwZXMuXG4gICAgbGV0IG5lZWRzQXN5bmNSZXNvdXJjZXMgPSB0aGlzLmNvbXBpbGVUeXBlc1N5bmMoKTtcblxuICAgIC8vIGNvbXBpbGVDb21wb25lbnRzKCkgc2hvdWxkIG5vdCBiZSBhc3luYyB1bmxlc3MgaXQgbmVlZHMgdG8gYmUuXG4gICAgaWYgKG5lZWRzQXN5bmNSZXNvdXJjZXMpIHtcbiAgICAgIGxldCByZXNvdXJjZUxvYWRlcjogUmVzb3VyY2VMb2FkZXI7XG4gICAgICBsZXQgcmVzb2x2ZXIgPSAodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICBpZiAoIXJlc291cmNlTG9hZGVyKSB7XG4gICAgICAgICAgcmVzb3VyY2VMb2FkZXIgPSB0aGlzLmluamVjdG9yLmdldChSZXNvdXJjZUxvYWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNvdXJjZUxvYWRlci5nZXQodXJsKSk7XG4gICAgICB9O1xuICAgICAgYXdhaXQgcmVzb2x2ZUNvbXBvbmVudFJlc291cmNlcyhyZXNvbHZlcik7XG4gICAgfVxuICB9XG5cbiAgZmluYWxpemUoKTogTmdNb2R1bGVSZWY8YW55PiB7XG4gICAgLy8gT25lIGxhc3QgY29tcGlsZVxuICAgIHRoaXMuY29tcGlsZVR5cGVzU3luYygpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSB0ZXN0aW5nIG1vZHVsZSBpdHNlbGYuXG4gICAgdGhpcy5jb21waWxlVGVzdE1vZHVsZSgpO1xuXG4gICAgdGhpcy5hcHBseVRyYW5zaXRpdmVTY29wZXMoKTtcblxuICAgIHRoaXMuYXBwbHlQcm92aWRlck92ZXJyaWRlcygpO1xuXG4gICAgLy8gUGF0Y2ggcHJldmlvdXNseSBzdG9yZWQgYHN0eWxlc2AgQ29tcG9uZW50IHZhbHVlcyAodGFrZW4gZnJvbSBuZ0NvbXBvbmVudERlZiksIGluIGNhc2UgdGhlc2VcbiAgICAvLyBDb21wb25lbnRzIGhhdmUgYHN0eWxlVXJsc2AgZmllbGRzIGRlZmluZWQgYW5kIHRlbXBsYXRlIG92ZXJyaWRlIHdhcyByZXF1ZXN0ZWQuXG4gICAgdGhpcy5wYXRjaENvbXBvbmVudHNXaXRoRXhpc3RpbmdTdHlsZXMoKTtcblxuICAgIC8vIENsZWFyIHRoZSBjb21wb25lbnRUb01vZHVsZVNjb3BlIG1hcCwgc28gdGhhdCBmdXR1cmUgY29tcGlsYXRpb25zIGRvbid0IHJlc2V0IHRoZSBzY29wZSBvZlxuICAgIC8vIGV2ZXJ5IGNvbXBvbmVudC5cbiAgICB0aGlzLmNvbXBvbmVudFRvTW9kdWxlU2NvcGUuY2xlYXIoKTtcblxuICAgIGNvbnN0IHBhcmVudEluamVjdG9yID0gdGhpcy5wbGF0Zm9ybS5pbmplY3RvcjtcbiAgICB0aGlzLnRlc3RNb2R1bGVSZWYgPSBuZXcgTmdNb2R1bGVSZWYodGhpcy50ZXN0TW9kdWxlVHlwZSwgcGFyZW50SW5qZWN0b3IpO1xuXG5cbiAgICAvLyBBcHBsaWNhdGlvbkluaXRTdGF0dXMucnVuSW5pdGlhbGl6ZXJzKCkgaXMgbWFya2VkIEBpbnRlcm5hbCB0byBjb3JlLlxuICAgIC8vIENhc3QgaXQgdG8gYW55IGJlZm9yZSBhY2Nlc3NpbmcgaXQuXG4gICAgKHRoaXMudGVzdE1vZHVsZVJlZi5pbmplY3Rvci5nZXQoQXBwbGljYXRpb25Jbml0U3RhdHVzKSBhcyBhbnkpLnJ1bkluaXRpYWxpemVycygpO1xuXG4gICAgcmV0dXJuIHRoaXMudGVzdE1vZHVsZVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9jb21waWxlTmdNb2R1bGVTeW5jKG1vZHVsZVR5cGU6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIHRoaXMucXVldWVUeXBlc0Zyb21Nb2R1bGVzQXJyYXkoW21vZHVsZVR5cGVdKTtcbiAgICB0aGlzLmNvbXBpbGVUeXBlc1N5bmMoKTtcbiAgICB0aGlzLmFwcGx5UHJvdmlkZXJPdmVycmlkZXMoKTtcbiAgICB0aGlzLmFwcGx5UHJvdmlkZXJPdmVycmlkZXNUb01vZHVsZShtb2R1bGVUeXBlKTtcbiAgICB0aGlzLmFwcGx5VHJhbnNpdGl2ZVNjb3BlcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgYXN5bmMgX2NvbXBpbGVOZ01vZHVsZUFzeW5jKG1vZHVsZVR5cGU6IFR5cGU8YW55Pik6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucXVldWVUeXBlc0Zyb21Nb2R1bGVzQXJyYXkoW21vZHVsZVR5cGVdKTtcbiAgICBhd2FpdCB0aGlzLmNvbXBpbGVDb21wb25lbnRzKCk7XG4gICAgdGhpcy5hcHBseVByb3ZpZGVyT3ZlcnJpZGVzKCk7XG4gICAgdGhpcy5hcHBseVByb3ZpZGVyT3ZlcnJpZGVzVG9Nb2R1bGUobW9kdWxlVHlwZSk7XG4gICAgdGhpcy5hcHBseVRyYW5zaXRpdmVTY29wZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9nZXRNb2R1bGVSZXNvbHZlcigpOiBSZXNvbHZlcjxOZ01vZHVsZT4geyByZXR1cm4gdGhpcy5yZXNvbHZlcnMubW9kdWxlOyB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2dldENvbXBvbmVudEZhY3Rvcmllcyhtb2R1bGVUeXBlOiBOZ01vZHVsZVR5cGUpOiBDb21wb25lbnRGYWN0b3J5PGFueT5bXSB7XG4gICAgcmV0dXJuIG1heWJlVW53cmFwRm4obW9kdWxlVHlwZS5uZ01vZHVsZURlZi5kZWNsYXJhdGlvbnMpLnJlZHVjZSgoZmFjdG9yaWVzLCBkZWNsYXJhdGlvbikgPT4ge1xuICAgICAgY29uc3QgY29tcG9uZW50RGVmID0gKGRlY2xhcmF0aW9uIGFzIGFueSkubmdDb21wb25lbnREZWY7XG4gICAgICBjb21wb25lbnREZWYgJiYgZmFjdG9yaWVzLnB1c2gobmV3IENvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50RGVmLCB0aGlzLnRlc3RNb2R1bGVSZWYgISkpO1xuICAgICAgcmV0dXJuIGZhY3RvcmllcztcbiAgICB9LCBbXSBhcyBDb21wb25lbnRGYWN0b3J5PGFueT5bXSk7XG4gIH1cblxuICBwcml2YXRlIGNvbXBpbGVUeXBlc1N5bmMoKTogYm9vbGVhbiB7XG4gICAgLy8gQ29tcGlsZSBhbGwgcXVldWVkIGNvbXBvbmVudHMsIGRpcmVjdGl2ZXMsIHBpcGVzLlxuICAgIGxldCBuZWVkc0FzeW5jUmVzb3VyY2VzID0gZmFsc2U7XG4gICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50cy5mb3JFYWNoKGRlY2xhcmF0aW9uID0+IHtcbiAgICAgIG5lZWRzQXN5bmNSZXNvdXJjZXMgPSBuZWVkc0FzeW5jUmVzb3VyY2VzIHx8IGlzQ29tcG9uZW50RGVmUGVuZGluZ1Jlc29sdXRpb24oZGVjbGFyYXRpb24pO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLnJlc29sdmVycy5jb21wb25lbnQucmVzb2x2ZShkZWNsYXJhdGlvbikgITtcbiAgICAgIHRoaXMubWF5YmVTdG9yZU5nRGVmKE5HX0NPTVBPTkVOVF9ERUYsIGRlY2xhcmF0aW9uKTtcbiAgICAgIGNvbXBpbGVDb21wb25lbnQoZGVjbGFyYXRpb24sIG1ldGFkYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLnBlbmRpbmdDb21wb25lbnRzLmNsZWFyKCk7XG5cbiAgICB0aGlzLnBlbmRpbmdEaXJlY3RpdmVzLmZvckVhY2goZGVjbGFyYXRpb24gPT4ge1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLnJlc29sdmVycy5kaXJlY3RpdmUucmVzb2x2ZShkZWNsYXJhdGlvbikgITtcbiAgICAgIHRoaXMubWF5YmVTdG9yZU5nRGVmKE5HX0RJUkVDVElWRV9ERUYsIGRlY2xhcmF0aW9uKTtcbiAgICAgIGNvbXBpbGVEaXJlY3RpdmUoZGVjbGFyYXRpb24sIG1ldGFkYXRhKTtcbiAgICB9KTtcbiAgICB0aGlzLnBlbmRpbmdEaXJlY3RpdmVzLmNsZWFyKCk7XG5cbiAgICB0aGlzLnBlbmRpbmdQaXBlcy5mb3JFYWNoKGRlY2xhcmF0aW9uID0+IHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5yZXNvbHZlcnMucGlwZS5yZXNvbHZlKGRlY2xhcmF0aW9uKSAhO1xuICAgICAgdGhpcy5tYXliZVN0b3JlTmdEZWYoTkdfUElQRV9ERUYsIGRlY2xhcmF0aW9uKTtcbiAgICAgIGNvbXBpbGVQaXBlKGRlY2xhcmF0aW9uLCBtZXRhZGF0YSk7XG4gICAgfSk7XG4gICAgdGhpcy5wZW5kaW5nUGlwZXMuY2xlYXIoKTtcblxuICAgIHJldHVybiBuZWVkc0FzeW5jUmVzb3VyY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVRyYW5zaXRpdmVTY29wZXMoKTogdm9pZCB7XG4gICAgY29uc3QgbW9kdWxlVG9TY29wZSA9IG5ldyBNYXA8VHlwZTxhbnk+fFRFU1RJTkdfTU9EVUxFLCBOZ01vZHVsZVRyYW5zaXRpdmVTY29wZXM+KCk7XG4gICAgY29uc3QgZ2V0U2NvcGVPZk1vZHVsZSA9IChtb2R1bGVUeXBlOiBUeXBlPGFueT58IFRFU1RJTkdfTU9EVUxFKTogTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzID0+IHtcbiAgICAgIGlmICghbW9kdWxlVG9TY29wZS5oYXMobW9kdWxlVHlwZSkpIHtcbiAgICAgICAgY29uc3QgcmVhbFR5cGUgPSBtb2R1bGVUeXBlID09PSBURVNUSU5HX01PRFVMRSA/IHRoaXMudGVzdE1vZHVsZVR5cGUgOiBtb2R1bGVUeXBlO1xuICAgICAgICBtb2R1bGVUb1Njb3BlLnNldChtb2R1bGVUeXBlLCB0cmFuc2l0aXZlU2NvcGVzRm9yKHJlYWxUeXBlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbW9kdWxlVG9TY29wZS5nZXQobW9kdWxlVHlwZSkgITtcbiAgICB9O1xuXG4gICAgdGhpcy5jb21wb25lbnRUb01vZHVsZVNjb3BlLmZvckVhY2goKG1vZHVsZVR5cGUsIGNvbXBvbmVudFR5cGUpID0+IHtcbiAgICAgIGNvbnN0IG1vZHVsZVNjb3BlID0gZ2V0U2NvcGVPZk1vZHVsZShtb2R1bGVUeXBlKTtcbiAgICAgIHRoaXMuc3RvcmVGaWVsZE9mRGVmT25UeXBlKGNvbXBvbmVudFR5cGUsIE5HX0NPTVBPTkVOVF9ERUYsICdkaXJlY3RpdmVEZWZzJyk7XG4gICAgICB0aGlzLnN0b3JlRmllbGRPZkRlZk9uVHlwZShjb21wb25lbnRUeXBlLCBOR19DT01QT05FTlRfREVGLCAncGlwZURlZnMnKTtcbiAgICAgIHBhdGNoQ29tcG9uZW50RGVmV2l0aFNjb3BlKChjb21wb25lbnRUeXBlIGFzIGFueSkubmdDb21wb25lbnREZWYsIG1vZHVsZVNjb3BlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29tcG9uZW50VG9Nb2R1bGVTY29wZS5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVByb3ZpZGVyT3ZlcnJpZGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IG1heWJlQXBwbHlPdmVycmlkZXMgPSAoZmllbGQ6IHN0cmluZykgPT4gKHR5cGU6IFR5cGU8YW55PikgPT4ge1xuICAgICAgY29uc3QgcmVzb2x2ZXIgPVxuICAgICAgICAgIGZpZWxkID09PSBOR19DT01QT05FTlRfREVGID8gdGhpcy5yZXNvbHZlcnMuY29tcG9uZW50IDogdGhpcy5yZXNvbHZlcnMuZGlyZWN0aXZlO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSByZXNvbHZlci5yZXNvbHZlKHR5cGUpICE7XG4gICAgICBpZiAodGhpcy5oYXNQcm92aWRlck92ZXJyaWRlcyhtZXRhZGF0YS5wcm92aWRlcnMpKSB7XG4gICAgICAgIHRoaXMucGF0Y2hEZWZXaXRoUHJvdmlkZXJPdmVycmlkZXModHlwZSwgZmllbGQpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5zZWVuQ29tcG9uZW50cy5mb3JFYWNoKG1heWJlQXBwbHlPdmVycmlkZXMoTkdfQ09NUE9ORU5UX0RFRikpO1xuICAgIHRoaXMuc2VlbkRpcmVjdGl2ZXMuZm9yRWFjaChtYXliZUFwcGx5T3ZlcnJpZGVzKE5HX0RJUkVDVElWRV9ERUYpKTtcblxuICAgIHRoaXMuc2VlbkNvbXBvbmVudHMuY2xlYXIoKTtcbiAgICB0aGlzLnNlZW5EaXJlY3RpdmVzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5UHJvdmlkZXJPdmVycmlkZXNUb01vZHVsZShtb2R1bGVUeXBlOiBUeXBlPGFueT4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2R1bGVQcm92aWRlcnNPdmVycmlkZGVuLmhhcyhtb2R1bGVUeXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1vZHVsZVByb3ZpZGVyc092ZXJyaWRkZW4uYWRkKG1vZHVsZVR5cGUpO1xuXG4gICAgY29uc3QgaW5qZWN0b3JEZWY6IGFueSA9IChtb2R1bGVUeXBlIGFzIGFueSlbTkdfSU5KRUNUT1JfREVGXTtcbiAgICBpZiAodGhpcy5wcm92aWRlck92ZXJyaWRlc0J5VG9rZW4uc2l6ZSA+IDApIHtcbiAgICAgIGlmICh0aGlzLmhhc1Byb3ZpZGVyT3ZlcnJpZGVzKGluamVjdG9yRGVmLnByb3ZpZGVycykpIHtcbiAgICAgICAgdGhpcy5tYXliZVN0b3JlTmdEZWYoTkdfSU5KRUNUT1JfREVGLCBtb2R1bGVUeXBlKTtcblxuICAgICAgICB0aGlzLnN0b3JlRmllbGRPZkRlZk9uVHlwZShtb2R1bGVUeXBlLCBOR19JTkpFQ1RPUl9ERUYsICdwcm92aWRlcnMnKTtcbiAgICAgICAgaW5qZWN0b3JEZWYucHJvdmlkZXJzID0gW1xuICAgICAgICAgIC4uLmluamVjdG9yRGVmLnByb3ZpZGVycywgIC8vXG4gICAgICAgICAgLi4udGhpcy5nZXRQcm92aWRlck92ZXJyaWRlcyhpbmplY3RvckRlZi5wcm92aWRlcnMpXG4gICAgICAgIF07XG4gICAgICB9XG5cbiAgICAgIC8vIEFwcGx5IHByb3ZpZGVyIG92ZXJyaWRlcyB0byBpbXBvcnRlZCBtb2R1bGVzIHJlY3Vyc2l2ZWx5XG4gICAgICBjb25zdCBtb2R1bGVEZWY6IGFueSA9IChtb2R1bGVUeXBlIGFzIGFueSlbTkdfTU9EVUxFX0RFRl07XG4gICAgICBmb3IgKGNvbnN0IGltcG9ydFR5cGUgb2YgbW9kdWxlRGVmLmltcG9ydHMpIHtcbiAgICAgICAgdGhpcy5hcHBseVByb3ZpZGVyT3ZlcnJpZGVzVG9Nb2R1bGUoaW1wb3J0VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwYXRjaENvbXBvbmVudHNXaXRoRXhpc3RpbmdTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5leGlzdGluZ0NvbXBvbmVudFN0eWxlcy5mb3JFYWNoKFxuICAgICAgICAoc3R5bGVzLCB0eXBlKSA9PiAodHlwZSBhcyBhbnkpW05HX0NPTVBPTkVOVF9ERUZdLnN0eWxlcyA9IHN0eWxlcyk7XG4gICAgdGhpcy5leGlzdGluZ0NvbXBvbmVudFN0eWxlcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBxdWV1ZVR5cGVBcnJheShhcnI6IGFueVtdLCBtb2R1bGVUeXBlOiBUeXBlPGFueT58VEVTVElOR19NT0RVTEUpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIGFycikge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHRoaXMucXVldWVUeXBlQXJyYXkodmFsdWUsIG1vZHVsZVR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWV1ZVR5cGUodmFsdWUsIG1vZHVsZVR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVjb21waWxlTmdNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Pik6IHZvaWQge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gdGhpcy5yZXNvbHZlcnMubW9kdWxlLnJlc29sdmUobmdNb2R1bGUpO1xuICAgIGlmIChtZXRhZGF0YSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcmVzb2x2ZSBtZXRhZGF0YSBmb3IgTmdNb2R1bGU6ICR7bmdNb2R1bGUubmFtZX1gKTtcbiAgICB9XG4gICAgLy8gQ2FjaGUgdGhlIGluaXRpYWwgbmdNb2R1bGVEZWYgYXMgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAgICB0aGlzLm1heWJlU3RvcmVOZ0RlZihOR19NT0RVTEVfREVGLCBuZ01vZHVsZSk7XG4gICAgdGhpcy5tYXliZVN0b3JlTmdEZWYoTkdfSU5KRUNUT1JfREVGLCBuZ01vZHVsZSk7XG5cbiAgICBjb21waWxlTmdNb2R1bGVEZWZzKG5nTW9kdWxlIGFzIE5nTW9kdWxlVHlwZTxhbnk+LCBtZXRhZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIHF1ZXVlVHlwZSh0eXBlOiBUeXBlPGFueT4sIG1vZHVsZVR5cGU6IFR5cGU8YW55PnxURVNUSU5HX01PRFVMRSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMucmVzb2x2ZXJzLmNvbXBvbmVudC5yZXNvbHZlKHR5cGUpO1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIC8vIENoZWNrIHdoZXRoZXIgYSBnaXZlIFR5cGUgaGFzIHJlc3BlY3RpdmUgTkcgZGVmIChuZ0NvbXBvbmVudERlZikgYW5kIGNvbXBpbGUgaWYgZGVmIGlzXG4gICAgICAvLyBtaXNzaW5nLiBUaGF0IG1pZ2h0IGhhcHBlbiBpbiBjYXNlIGEgY2xhc3Mgd2l0aG91dCBhbnkgQW5ndWxhciBkZWNvcmF0b3JzIGV4dGVuZHMgYW5vdGhlclxuICAgICAgLy8gY2xhc3Mgd2hlcmUgQ29tcG9uZW50L0RpcmVjdGl2ZS9QaXBlIGRlY29yYXRvciBpcyBkZWZpbmVkLlxuICAgICAgaWYgKGlzQ29tcG9uZW50RGVmUGVuZGluZ1Jlc29sdXRpb24odHlwZSkgfHwgIXR5cGUuaGFzT3duUHJvcGVydHkoTkdfQ09NUE9ORU5UX0RFRikpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nQ29tcG9uZW50cy5hZGQodHlwZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlZW5Db21wb25lbnRzLmFkZCh0eXBlKTtcblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aGUgbW9kdWxlIHdoaWNoIGRlY2xhcmVzIHRoaXMgY29tcG9uZW50LCBzbyBsYXRlciB0aGUgY29tcG9uZW50J3Mgc2NvcGVcbiAgICAgIC8vIGNhbiBiZSBzZXQgY29ycmVjdGx5LiBPbmx5IHJlY29yZCB0aGlzIHRoZSBmaXJzdCB0aW1lLCBiZWNhdXNlIGl0IG1pZ2h0IGJlIG92ZXJyaWRkZW4gYnlcbiAgICAgIC8vIG92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUuXG4gICAgICBpZiAoIXRoaXMuY29tcG9uZW50VG9Nb2R1bGVTY29wZS5oYXModHlwZSkpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRUb01vZHVsZVNjb3BlLnNldCh0eXBlLCBtb2R1bGVUeXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3RpdmUgPSB0aGlzLnJlc29sdmVycy5kaXJlY3RpdmUucmVzb2x2ZSh0eXBlKTtcbiAgICBpZiAoZGlyZWN0aXZlKSB7XG4gICAgICBpZiAoIXR5cGUuaGFzT3duUHJvcGVydHkoTkdfRElSRUNUSVZFX0RFRikpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlyZWN0aXZlcy5hZGQodHlwZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlZW5EaXJlY3RpdmVzLmFkZCh0eXBlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwaXBlID0gdGhpcy5yZXNvbHZlcnMucGlwZS5yZXNvbHZlKHR5cGUpO1xuICAgIGlmIChwaXBlICYmICF0eXBlLmhhc093blByb3BlcnR5KE5HX1BJUEVfREVGKSkge1xuICAgICAgdGhpcy5wZW5kaW5nUGlwZXMuYWRkKHR5cGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcXVldWVUeXBlc0Zyb21Nb2R1bGVzQXJyYXkoYXJyOiBhbnlbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgYXJyKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5xdWV1ZVR5cGVzRnJvbU1vZHVsZXNBcnJheSh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGhhc05nTW9kdWxlRGVmKHZhbHVlKSkge1xuICAgICAgICBjb25zdCBkZWYgPSB2YWx1ZS5uZ01vZHVsZURlZjtcbiAgICAgICAgLy8gTG9vayB0aHJvdWdoIGRlY2xhcmF0aW9ucywgaW1wb3J0cywgYW5kIGV4cG9ydHMsIGFuZCBxdWV1ZSBldmVyeXRoaW5nIGZvdW5kIHRoZXJlLlxuICAgICAgICB0aGlzLnF1ZXVlVHlwZUFycmF5KG1heWJlVW53cmFwRm4oZGVmLmRlY2xhcmF0aW9ucyksIHZhbHVlKTtcbiAgICAgICAgdGhpcy5xdWV1ZVR5cGVzRnJvbU1vZHVsZXNBcnJheShtYXliZVVud3JhcEZuKGRlZi5pbXBvcnRzKSk7XG4gICAgICAgIHRoaXMucXVldWVUeXBlc0Zyb21Nb2R1bGVzQXJyYXkobWF5YmVVbndyYXBGbihkZWYuZXhwb3J0cykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWF5YmVTdG9yZU5nRGVmKHByb3A6IHN0cmluZywgdHlwZTogVHlwZTxhbnk+KSB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxOZ0RlZnMuaGFzKHR5cGUpKSB7XG4gICAgICBjb25zdCBjdXJyZW50RGVmID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0eXBlLCBwcm9wKTtcbiAgICAgIHRoaXMuaW5pdGlhbE5nRGVmcy5zZXQodHlwZSwgW3Byb3AsIGN1cnJlbnREZWZdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0b3JlRmllbGRPZkRlZk9uVHlwZSh0eXBlOiBUeXBlPGFueT4sIGRlZkZpZWxkOiBzdHJpbmcsIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkZWY6IGFueSA9ICh0eXBlIGFzIGFueSlbZGVmRmllbGRdO1xuICAgIGNvbnN0IG9yaWdpbmFsOiBhbnkgPSBkZWZbZmllbGRdO1xuICAgIHRoaXMuZGVmQ2xlYW51cE9wcy5wdXNoKHtmaWVsZCwgZGVmLCBvcmlnaW5hbH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBjdXJyZW50IGNvbXBvbmVudHMgcmVzb2x1dGlvbiBxdWV1ZSwgYnV0IHN0b3JlcyB0aGUgc3RhdGUgb2YgdGhlIHF1ZXVlLCBzbyB3ZSBjYW5cbiAgICogcmVzdG9yZSBpdCBsYXRlci4gQ2xlYXJpbmcgdGhlIHF1ZXVlIGlzIHJlcXVpcmVkIGJlZm9yZSB3ZSB0cnkgdG8gY29tcGlsZSBjb21wb25lbnRzICh2aWFcbiAgICogYFRlc3RCZWQuY29tcGlsZUNvbXBvbmVudHNgKSwgc28gdGhhdCBjb21wb25lbnQgZGVmcyBhcmUgaW4gc3luYyB3aXRoIHRoZSByZXNvbHV0aW9uIHF1ZXVlLlxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckNvbXBvbmVudFJlc29sdXRpb25RdWV1ZSgpIHtcbiAgICBpZiAodGhpcy5vcmlnaW5hbENvbXBvbmVudFJlc29sdXRpb25RdWV1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5vcmlnaW5hbENvbXBvbmVudFJlc29sdXRpb25RdWV1ZSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgY2xlYXJSZXNvbHV0aW9uT2ZDb21wb25lbnRSZXNvdXJjZXNRdWV1ZSgpLmZvckVhY2goXG4gICAgICAgICh2YWx1ZSwga2V5KSA9PiB0aGlzLm9yaWdpbmFsQ29tcG9uZW50UmVzb2x1dGlvblF1ZXVlICEuc2V0KGtleSwgdmFsdWUpKTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlc3RvcmVzIGNvbXBvbmVudCByZXNvbHV0aW9uIHF1ZXVlIHRvIHRoZSBwcmV2aW91c2x5IHNhdmVkIHN0YXRlLiBUaGlzIG9wZXJhdGlvbiBpcyBwZXJmb3JtZWRcbiAgICogYXMgYSBwYXJ0IG9mIHJlc3RvcmluZyB0aGUgc3RhdGUgYWZ0ZXIgY29tcGxldGlvbiBvZiB0aGUgY3VycmVudCBzZXQgb2YgdGVzdHMgKHRoYXQgbWlnaHRcbiAgICogcG90ZW50aWFsbHkgbXV0YXRlIHRoZSBzdGF0ZSkuXG4gICAqL1xuICBwcml2YXRlIHJlc3RvcmVDb21wb25lbnRSZXNvbHV0aW9uUXVldWUoKSB7XG4gICAgaWYgKHRoaXMub3JpZ2luYWxDb21wb25lbnRSZXNvbHV0aW9uUXVldWUgIT09IG51bGwpIHtcbiAgICAgIHJlc3RvcmVDb21wb25lbnRSZXNvbHV0aW9uUXVldWUodGhpcy5vcmlnaW5hbENvbXBvbmVudFJlc29sdXRpb25RdWV1ZSk7XG4gICAgICB0aGlzLm9yaWdpbmFsQ29tcG9uZW50UmVzb2x1dGlvblF1ZXVlID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXN0b3JlT3JpZ2luYWxTdGF0ZSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IG9wIG9mIHRoaXMuZGVmQ2xlYW51cE9wcykge1xuICAgICAgb3AuZGVmW29wLmZpZWxkXSA9IG9wLm9yaWdpbmFsO1xuICAgIH1cbiAgICAvLyBSZXN0b3JlIGluaXRpYWwgY29tcG9uZW50L2RpcmVjdGl2ZS9waXBlIGRlZnNcbiAgICB0aGlzLmluaXRpYWxOZ0RlZnMuZm9yRWFjaCgodmFsdWU6IFtzdHJpbmcsIFByb3BlcnR5RGVzY3JpcHRvcl0sIHR5cGU6IFR5cGU8YW55PikgPT4ge1xuICAgICAgY29uc3QgW3Byb3AsIGRlc2NyaXB0b3JdID0gdmFsdWU7XG4gICAgICBpZiAoIWRlc2NyaXB0b3IpIHtcbiAgICAgICAgLy8gRGVsZXRlIG9wZXJhdGlvbnMgYXJlIGdlbmVyYWxseSB1bmRlc2lyYWJsZSBzaW5jZSB0aGV5IGhhdmUgcGVyZm9ybWFuY2UgaW1wbGljYXRpb25zXG4gICAgICAgIC8vIG9uIG9iamVjdHMgdGhleSB3ZXJlIGFwcGxpZWQgdG8uIEluIHRoaXMgcGFydGljdWxhciBjYXNlLCBzaXR1YXRpb25zIHdoZXJlIHRoaXMgY29kZSBpc1xuICAgICAgICAvLyBpbnZva2VkIHNob3VsZCBiZSBxdWl0ZSByYXJlIHRvIGNhdXNlIGFueSBub3RpY2FibGUgaW1wYWN0LCBzaW5jZSBpdCdzIGFwcGxpZWQgb25seSB0b1xuICAgICAgICAvLyBzb21lIHRlc3QgY2FzZXMgKGZvciBleGFtcGxlIHdoZW4gY2xhc3Mgd2l0aCBubyBhbm5vdGF0aW9ucyBleHRlbmRzIHNvbWUgQENvbXBvbmVudClcbiAgICAgICAgLy8gd2hlbiB3ZSBuZWVkIHRvIGNsZWFyICduZ0NvbXBvbmVudERlZicgZmllbGQgb24gYSBnaXZlbiBjbGFzcyB0byByZXN0b3JlIGl0cyBvcmlnaW5hbFxuICAgICAgICAvLyBzdGF0ZSAoYmVmb3JlIGFwcGx5aW5nIG92ZXJyaWRlcyBhbmQgcnVubmluZyB0ZXN0cykuXG4gICAgICAgIGRlbGV0ZSAodHlwZSBhcyBhbnkpW3Byb3BdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIHByb3AsIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuaW5pdGlhbE5nRGVmcy5jbGVhcigpO1xuICAgIHRoaXMubW9kdWxlUHJvdmlkZXJzT3ZlcnJpZGRlbi5jbGVhcigpO1xuICAgIHRoaXMucmVzdG9yZUNvbXBvbmVudFJlc29sdXRpb25RdWV1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21waWxlVGVzdE1vZHVsZSgpOiB2b2lkIHtcbiAgICBjb25zdCByb290UHJvdmlkZXJPdmVycmlkZXMgPSB0aGlzLnJvb3RQcm92aWRlck92ZXJyaWRlcztcblxuICAgIEBOZ01vZHVsZSh7XG4gICAgICBwcm92aWRlcnM6IFsuLi5yb290UHJvdmlkZXJPdmVycmlkZXNdLFxuICAgICAgaml0OiB0cnVlLFxuICAgIH0pXG4gICAgY2xhc3MgUm9vdFNjb3BlTW9kdWxlIHtcbiAgICB9XG5cbiAgICBATmdNb2R1bGUoe3Byb3ZpZGVyczogW3twcm92aWRlOiBFcnJvckhhbmRsZXIsIHVzZUNsYXNzOiBSM1Rlc3RFcnJvckhhbmRsZXJ9XX0pXG4gICAgY2xhc3MgUjNFcnJvckhhbmRsZXJNb2R1bGUge1xuICAgIH1cblxuICAgIGNvbnN0IG5nWm9uZSA9IG5ldyBOZ1pvbmUoe2VuYWJsZUxvbmdTdGFja1RyYWNlOiB0cnVlfSk7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW1xuICAgICAge3Byb3ZpZGU6IE5nWm9uZSwgdXNlVmFsdWU6IG5nWm9uZX0sXG4gICAgICB7cHJvdmlkZTogQ29tcGlsZXIsIHVzZUZhY3Rvcnk6ICgpID0+IG5ldyBSM1Rlc3RDb21waWxlcih0aGlzKX0sXG4gICAgICAuLi50aGlzLnByb3ZpZGVycyxcbiAgICAgIC4uLnRoaXMucHJvdmlkZXJPdmVycmlkZXMsXG4gICAgXTtcbiAgICBjb25zdCBpbXBvcnRzID1cbiAgICAgICAgW1Jvb3RTY29wZU1vZHVsZSwgdGhpcy5hZGRpdGlvbmFsTW9kdWxlVHlwZXMsIFIzRXJyb3JIYW5kbGVyTW9kdWxlLCB0aGlzLmltcG9ydHMgfHwgW11dO1xuXG4gICAgLy8gY2xhbmctZm9ybWF0IG9mZlxuICAgIGNvbXBpbGVOZ01vZHVsZURlZnModGhpcy50ZXN0TW9kdWxlVHlwZSwge1xuICAgICAgZGVjbGFyYXRpb25zOiB0aGlzLmRlY2xhcmF0aW9ucyxcbiAgICAgIGltcG9ydHMsXG4gICAgICBzY2hlbWFzOiB0aGlzLnNjaGVtYXMsXG4gICAgICBwcm92aWRlcnMsXG4gICAgfSk7XG4gICAgLy8gY2xhbmctZm9ybWF0IG9uXG5cbiAgICB0aGlzLmFwcGx5UHJvdmlkZXJPdmVycmlkZXNUb01vZHVsZSh0aGlzLnRlc3RNb2R1bGVUeXBlKTtcbiAgfVxuXG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgaWYgKHRoaXMuX2luamVjdG9yICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5qZWN0b3I7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdmlkZXJzOiBQcm92aWRlcltdID0gW107XG4gICAgY29uc3QgY29tcGlsZXJPcHRpb25zID0gdGhpcy5wbGF0Zm9ybS5pbmplY3Rvci5nZXQoQ09NUElMRVJfT1BUSU9OUyk7XG4gICAgY29tcGlsZXJPcHRpb25zLmZvckVhY2gob3B0cyA9PiB7XG4gICAgICBpZiAob3B0cy5wcm92aWRlcnMpIHtcbiAgICAgICAgcHJvdmlkZXJzLnB1c2gob3B0cy5wcm92aWRlcnMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmNvbXBpbGVyUHJvdmlkZXJzICE9PSBudWxsKSB7XG4gICAgICBwcm92aWRlcnMucHVzaCguLi50aGlzLmNvbXBpbGVyUHJvdmlkZXJzKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPKG9jb21iZSk6IG1ha2UgdGhpcyB3b3JrIHdpdGggYW4gSW5qZWN0b3IgZGlyZWN0bHkgaW5zdGVhZCBvZiBjcmVhdGluZyBhIG1vZHVsZSBmb3IgaXRcbiAgICBATmdNb2R1bGUoe3Byb3ZpZGVyc30pXG4gICAgY2xhc3MgQ29tcGlsZXJNb2R1bGUge1xuICAgIH1cblxuICAgIGNvbnN0IENvbXBpbGVyTW9kdWxlRmFjdG9yeSA9IG5ldyBSM05nTW9kdWxlRmFjdG9yeShDb21waWxlck1vZHVsZSk7XG4gICAgdGhpcy5faW5qZWN0b3IgPSBDb21waWxlck1vZHVsZUZhY3RvcnkuY3JlYXRlKHRoaXMucGxhdGZvcm0uaW5qZWN0b3IpLmluamVjdG9yO1xuICAgIHJldHVybiB0aGlzLl9pbmplY3RvcjtcbiAgfVxuXG4gIC8vIGdldCBvdmVycmlkZXMgZm9yIGEgc3BlY2lmaWMgcHJvdmlkZXIgKGlmIGFueSlcbiAgcHJpdmF0ZSBnZXRTaW5nbGVQcm92aWRlck92ZXJyaWRlcyhwcm92aWRlcjogUHJvdmlkZXIme3Byb3ZpZGU/OiBhbnl9KTogUHJvdmlkZXJbXSB7XG4gICAgY29uc3QgdG9rZW4gPSBwcm92aWRlciAmJiB0eXBlb2YgcHJvdmlkZXIgPT09ICdvYmplY3QnICYmIHByb3ZpZGVyLmhhc093blByb3BlcnR5KCdwcm92aWRlJykgP1xuICAgICAgICBwcm92aWRlci5wcm92aWRlIDpcbiAgICAgICAgcHJvdmlkZXI7XG4gICAgcmV0dXJuIHRoaXMucHJvdmlkZXJPdmVycmlkZXNCeVRva2VuLmdldCh0b2tlbikgfHwgW107XG4gIH1cblxuICBwcml2YXRlIGdldFByb3ZpZGVyT3ZlcnJpZGVzKHByb3ZpZGVycz86IFByb3ZpZGVyW10pOiBQcm92aWRlcltdIHtcbiAgICBpZiAoIXByb3ZpZGVycyB8fCAhcHJvdmlkZXJzLmxlbmd0aCB8fCB0aGlzLnByb3ZpZGVyT3ZlcnJpZGVzQnlUb2tlbi5zaXplID09PSAwKSByZXR1cm4gW107XG4gICAgLy8gVGhlcmUgYXJlIHR3byBmbGF0dGVuaW5nIG9wZXJhdGlvbnMgaGVyZS4gVGhlIGlubmVyIGZsYXR0ZW4oKSBvcGVyYXRlcyBvbiB0aGUgbWV0YWRhdGEnc1xuICAgIC8vIHByb3ZpZGVycyBhbmQgYXBwbGllcyBhIG1hcHBpbmcgZnVuY3Rpb24gd2hpY2ggcmV0cmlldmVzIG92ZXJyaWRlcyBmb3IgZWFjaCBpbmNvbWluZ1xuICAgIC8vIHByb3ZpZGVyLiBUaGUgb3V0ZXIgZmxhdHRlbigpIHRoZW4gZmxhdHRlbnMgdGhlIHByb2R1Y2VkIG92ZXJyaWRlcyBhcnJheS4gSWYgdGhpcyBpcyBub3RcbiAgICAvLyBkb25lLCB0aGUgYXJyYXkgY2FuIGNvbnRhaW4gb3RoZXIgZW1wdHkgYXJyYXlzIChlLmcuIGBbW10sIFtdXWApIHdoaWNoIGxlYWsgaW50byB0aGVcbiAgICAvLyBwcm92aWRlcnMgYXJyYXkgYW5kIGNvbnRhbWluYXRlIGFueSBlcnJvciBtZXNzYWdlcyB0aGF0IG1pZ2h0IGJlIGdlbmVyYXRlZC5cbiAgICByZXR1cm4gZmxhdHRlbihcbiAgICAgICAgZmxhdHRlbihwcm92aWRlcnMsIChwcm92aWRlcjogUHJvdmlkZXIpID0+IHRoaXMuZ2V0U2luZ2xlUHJvdmlkZXJPdmVycmlkZXMocHJvdmlkZXIpKSk7XG4gIH1cblxuICBwcml2YXRlIGhhc1Byb3ZpZGVyT3ZlcnJpZGVzKHByb3ZpZGVycz86IFByb3ZpZGVyW10pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQcm92aWRlck92ZXJyaWRlcyhwcm92aWRlcnMpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwcml2YXRlIHBhdGNoRGVmV2l0aFByb3ZpZGVyT3ZlcnJpZGVzKGRlY2xhcmF0aW9uOiBUeXBlPGFueT4sIGZpZWxkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkZWYgPSAoZGVjbGFyYXRpb24gYXMgYW55KVtmaWVsZF07XG4gICAgaWYgKGRlZiAmJiBkZWYucHJvdmlkZXJzUmVzb2x2ZXIpIHtcbiAgICAgIHRoaXMubWF5YmVTdG9yZU5nRGVmKGZpZWxkLCBkZWNsYXJhdGlvbik7XG5cbiAgICAgIGNvbnN0IHJlc29sdmVyID0gZGVmLnByb3ZpZGVyc1Jlc29sdmVyO1xuICAgICAgY29uc3QgcHJvY2Vzc1Byb3ZpZGVyc0ZuID0gKHByb3ZpZGVyczogUHJvdmlkZXJbXSkgPT4ge1xuICAgICAgICBjb25zdCBvdmVycmlkZXMgPSB0aGlzLmdldFByb3ZpZGVyT3ZlcnJpZGVzKHByb3ZpZGVycyk7XG4gICAgICAgIHJldHVybiBbLi4ucHJvdmlkZXJzLCAuLi5vdmVycmlkZXNdO1xuICAgICAgfTtcbiAgICAgIHRoaXMuc3RvcmVGaWVsZE9mRGVmT25UeXBlKGRlY2xhcmF0aW9uLCBmaWVsZCwgJ3Byb3ZpZGVyc1Jlc29sdmVyJyk7XG4gICAgICBkZWYucHJvdmlkZXJzUmVzb2x2ZXIgPSAobmdEZWY6IERpcmVjdGl2ZURlZjxhbnk+KSA9PiByZXNvbHZlcihuZ0RlZiwgcHJvY2Vzc1Byb3ZpZGVyc0ZuKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdFJlc29sdmVycygpOiBSZXNvbHZlcnMge1xuICByZXR1cm4ge1xuICAgIG1vZHVsZTogbmV3IE5nTW9kdWxlUmVzb2x2ZXIoKSxcbiAgICBjb21wb25lbnQ6IG5ldyBDb21wb25lbnRSZXNvbHZlcigpLFxuICAgIGRpcmVjdGl2ZTogbmV3IERpcmVjdGl2ZVJlc29sdmVyKCksXG4gICAgcGlwZTogbmV3IFBpcGVSZXNvbHZlcigpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhc05nTW9kdWxlRGVmPFQ+KHZhbHVlOiBUeXBlPFQ+KTogdmFsdWUgaXMgTmdNb2R1bGVUeXBlPFQ+IHtcbiAgcmV0dXJuIHZhbHVlLmhhc093blByb3BlcnR5KCduZ01vZHVsZURlZicpO1xufVxuXG5mdW5jdGlvbiBtYXliZVVud3JhcEZuPFQ+KG1heWJlRm46ICgoKSA9PiBUKSB8IFQpOiBUIHtcbiAgcmV0dXJuIG1heWJlRm4gaW5zdGFuY2VvZiBGdW5jdGlvbiA/IG1heWJlRm4oKSA6IG1heWJlRm47XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW48VD4odmFsdWVzOiBhbnlbXSwgbWFwRm4/OiAodmFsdWU6IFQpID0+IGFueSk6IFRbXSB7XG4gIGNvbnN0IG91dDogVFtdID0gW107XG4gIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIG91dC5wdXNoKC4uLmZsYXR0ZW48VD4odmFsdWUsIG1hcEZuKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5wdXNoKG1hcEZuID8gbWFwRm4odmFsdWUpIDogdmFsdWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKiBFcnJvciBoYW5kbGVyIHVzZWQgZm9yIHRlc3RzLiBSZXRocm93cyBlcnJvcnMgcmF0aGVyIHRoYW4gbG9nZ2luZyB0aGVtIG91dC4gKi9cbmNsYXNzIFIzVGVzdEVycm9ySGFuZGxlciBleHRlbmRzIEVycm9ySGFuZGxlciB7XG4gIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHsgdGhyb3cgZXJyb3I7IH1cbn1cblxuY2xhc3MgUjNUZXN0Q29tcGlsZXIgaW1wbGVtZW50cyBDb21waWxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVzdEJlZDogUjNUZXN0QmVkQ29tcGlsZXIpIHt9XG5cbiAgY29tcGlsZU1vZHVsZVN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6IE5nTW9kdWxlRmFjdG9yeTxUPiB7XG4gICAgdGhpcy50ZXN0QmVkLl9jb21waWxlTmdNb2R1bGVTeW5jKG1vZHVsZVR5cGUpO1xuICAgIHJldHVybiBuZXcgUjNOZ01vZHVsZUZhY3RvcnkobW9kdWxlVHlwZSk7XG4gIH1cblxuICBhc3luYyBjb21waWxlTW9kdWxlQXN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PFQ+PiB7XG4gICAgYXdhaXQgdGhpcy50ZXN0QmVkLl9jb21waWxlTmdNb2R1bGVBc3luYyhtb2R1bGVUeXBlKTtcbiAgICByZXR1cm4gbmV3IFIzTmdNb2R1bGVGYWN0b3J5KG1vZHVsZVR5cGUpO1xuICB9XG5cbiAgY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOiBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzPFQ+IHtcbiAgICBjb25zdCBuZ01vZHVsZUZhY3RvcnkgPSB0aGlzLmNvbXBpbGVNb2R1bGVTeW5jKG1vZHVsZVR5cGUpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcmllcyA9IHRoaXMudGVzdEJlZC5fZ2V0Q29tcG9uZW50RmFjdG9yaWVzKG1vZHVsZVR5cGUgYXMgTmdNb2R1bGVUeXBlPFQ+KTtcbiAgICByZXR1cm4gbmV3IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMobmdNb2R1bGVGYWN0b3J5LCBjb21wb25lbnRGYWN0b3JpZXMpO1xuICB9XG5cbiAgYXN5bmMgY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTpcbiAgICAgIFByb21pc2U8TW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPj4ge1xuICAgIGNvbnN0IG5nTW9kdWxlRmFjdG9yeSA9IGF3YWl0IHRoaXMuY29tcGlsZU1vZHVsZUFzeW5jKG1vZHVsZVR5cGUpO1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcmllcyA9IHRoaXMudGVzdEJlZC5fZ2V0Q29tcG9uZW50RmFjdG9yaWVzKG1vZHVsZVR5cGUgYXMgTmdNb2R1bGVUeXBlPFQ+KTtcbiAgICByZXR1cm4gbmV3IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMobmdNb2R1bGVGYWN0b3J5LCBjb21wb25lbnRGYWN0b3JpZXMpO1xuICB9XG5cbiAgY2xlYXJDYWNoZSgpOiB2b2lkIHt9XG5cbiAgY2xlYXJDYWNoZUZvcih0eXBlOiBUeXBlPGFueT4pOiB2b2lkIHt9XG5cbiAgZ2V0TW9kdWxlSWQobW9kdWxlVHlwZTogVHlwZTxhbnk+KTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbWV0YSA9IHRoaXMudGVzdEJlZC5fZ2V0TW9kdWxlUmVzb2x2ZXIoKS5yZXNvbHZlKG1vZHVsZVR5cGUpO1xuICAgIHJldHVybiBtZXRhICYmIG1ldGEuaWQgfHwgdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=