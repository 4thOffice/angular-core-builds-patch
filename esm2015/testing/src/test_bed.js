/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationInitStatus, Component, InjectFlags, Injector, NgModule, NgZone, Optional, SkipSelf, ɵAPP_ROOT as APP_ROOT, ɵclearOverrides as clearOverrides, ɵgetInjectableDef as getInjectableDef, ɵivyEnabled as ivyEnabled, ɵoverrideComponentView as overrideComponentView, ɵoverrideProvider as overrideProvider, ɵstringify as stringify } from '@angular/core';
import { AsyncTestCompleter } from './async_test_completer';
import { ComponentFixture } from './component_fixture';
import { TestBedRender3, _getTestBedRender3 } from './r3_test_bed';
import { ComponentFixtureAutoDetect, ComponentFixtureNoNgZone, TestComponentRenderer } from './test_bed_common';
import { TestingCompilerFactory } from './test_compiler';
/** @type {?} */
const UNDEFINED = new Object();
/** @type {?} */
let _nextRootElementId = 0;
// WARNING: interface has both a type and a value, skipping emit
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export class TestBedViewEngine {
    constructor() {
        this._instantiated = false;
        this._compiler = (/** @type {?} */ (null));
        this._moduleRef = (/** @type {?} */ (null));
        this._moduleFactory = (/** @type {?} */ (null));
        this._compilerOptions = [];
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._activeFixtures = [];
        this._testEnvAotSummaries = (/**
         * @return {?}
         */
        () => []);
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this.platform = (/** @type {?} */ (null));
        this.ngModule = (/** @type {?} */ (null));
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    static initTestEnvironment(ngModule, platform, aotSummaries) {
        /** @type {?} */
        const testBed = _getTestBedViewEngine();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    }
    /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    static resetTestEnvironment() { _getTestBedViewEngine().resetTestEnvironment(); }
    /**
     * @return {?}
     */
    static resetTestingModule() {
        _getTestBedViewEngine().resetTestingModule();
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     * @param {?} config
     * @return {?}
     */
    static configureCompiler(config) {
        _getTestBedViewEngine().configureCompiler(config);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     * @param {?} moduleDef
     * @return {?}
     */
    static configureTestingModule(moduleDef) {
        _getTestBedViewEngine().configureTestingModule(moduleDef);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     * @return {?}
     */
    static compileComponents() { return getTestBed().compileComponents(); }
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    static overrideModule(ngModule, override) {
        _getTestBedViewEngine().overrideModule(ngModule, override);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    static overrideComponent(component, override) {
        _getTestBedViewEngine().overrideComponent(component, override);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    static overrideDirective(directive, override) {
        _getTestBedViewEngine().overrideDirective(directive, override);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    static overridePipe(pipe, override) {
        _getTestBedViewEngine().overridePipe(pipe, override);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    static overrideTemplate(component, template) {
        _getTestBedViewEngine().overrideComponent(component, { set: { template, templateUrl: (/** @type {?} */ (null)) } });
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    static overrideTemplateUsingTestingModule(component, template) {
        _getTestBedViewEngine().overrideTemplateUsingTestingModule(component, template);
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    static overrideProvider(token, provider) {
        _getTestBedViewEngine().overrideProvider(token, (/** @type {?} */ (provider)));
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    static deprecatedOverrideProvider(token, provider) {
        _getTestBedViewEngine().deprecatedOverrideProvider(token, (/** @type {?} */ (provider)));
        return (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    static get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
        return _getTestBedViewEngine().get(token, notFoundValue, flags);
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    static createComponent(component) {
        return _getTestBedViewEngine().createComponent(component);
    }
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '\@angular/<platform_name>/testing'.
     * @param {?} ngModule
     * @param {?} platform
     * @param {?=} aotSummaries
     * @return {?}
     */
    initTestEnvironment(ngModule, platform, aotSummaries) {
        if (this.platform || this.ngModule) {
            throw new Error('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
        if (aotSummaries) {
            this._testEnvAotSummaries = aotSummaries;
        }
    }
    /**
     * Reset the providers for the test injector.
     * @return {?}
     */
    resetTestEnvironment() {
        this.resetTestingModule();
        this.platform = (/** @type {?} */ (null));
        this.ngModule = (/** @type {?} */ (null));
        this._testEnvAotSummaries = (/**
         * @return {?}
         */
        () => []);
    }
    /**
     * @return {?}
     */
    resetTestingModule() {
        clearOverrides();
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._compiler = (/** @type {?} */ (null));
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this._moduleRef = (/** @type {?} */ (null));
        this._moduleFactory = (/** @type {?} */ (null));
        this._compilerOptions = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._instantiated = false;
        this._activeFixtures.forEach((/**
         * @param {?} fixture
         * @return {?}
         */
        (fixture) => {
            try {
                fixture.destroy();
            }
            catch (e) {
                console.error('Error during cleanup of component', {
                    component: fixture.componentInstance,
                    stacktrace: e,
                });
            }
        }));
        this._activeFixtures = [];
    }
    /**
     * @param {?} config
     * @return {?}
     */
    configureCompiler(config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    }
    /**
     * @param {?} moduleDef
     * @return {?}
     */
    configureTestingModule(moduleDef) {
        this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            this._providers.push(...moduleDef.providers);
        }
        if (moduleDef.declarations) {
            this._declarations.push(...moduleDef.declarations);
        }
        if (moduleDef.imports) {
            this._imports.push(...moduleDef.imports);
        }
        if (moduleDef.schemas) {
            this._schemas.push(...moduleDef.schemas);
        }
        if (moduleDef.aotSummaries) {
            this._aotSummaries.push(moduleDef.aotSummaries);
        }
    }
    /**
     * @return {?}
     */
    compileComponents() {
        if (this._moduleFactory || this._instantiated) {
            return Promise.resolve(null);
        }
        /** @type {?} */
        const moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then((/**
         * @param {?} moduleAndComponentFactories
         * @return {?}
         */
        (moduleAndComponentFactories) => {
            this._moduleFactory = moduleAndComponentFactories.ngModuleFactory;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initIfNeeded() {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleFactory) {
            try {
                /** @type {?} */
                const moduleType = this._createCompilerAndModule();
                this._moduleFactory =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType).ngModuleFactory;
            }
            catch (e) {
                /** @type {?} */
                const errorCompType = this._compiler.getComponentFromError(e);
                if (errorCompType) {
                    throw new Error(`This test module uses the component ${stringify(errorCompType)} which is using a "templateUrl" or "styleUrls", but they were never compiled. ` +
                        `Please call "TestBed.compileComponents" before your test.`);
                }
                else {
                    throw e;
                }
            }
        }
        for (const { component, templateOf } of this._templateOverrides) {
            /** @type {?} */
            const compFactory = this._compiler.getComponentFactory(templateOf);
            overrideComponentView(component, compFactory);
        }
        /** @type {?} */
        const ngZone = new NgZone({ enableLongStackTrace: true });
        /** @type {?} */
        const providers = [{ provide: NgZone, useValue: ngZone }];
        /** @type {?} */
        const ngZoneInjector = Injector.create({
            providers: providers,
            parent: this.platform.injector,
            name: this._moduleFactory.moduleType.name
        });
        this._moduleRef = this._moduleFactory.create(ngZoneInjector);
        // ApplicationInitStatus.runInitializers() is marked @internal to core. So casting to any
        // before accessing it.
        ((/** @type {?} */ (this._moduleRef.injector.get(ApplicationInitStatus)))).runInitializers();
        this._instantiated = true;
    }
    /**
     * @private
     * @return {?}
     */
    _createCompilerAndModule() {
        /** @type {?} */
        const providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        /** @type {?} */
        const declarations = [...this._declarations, ...this._templateOverrides.map((/**
             * @param {?} entry
             * @return {?}
             */
            entry => entry.templateOf))];
        /** @type {?} */
        const rootScopeImports = [];
        /** @type {?} */
        const rootProviderOverrides = this._rootProviderOverrides;
        if (this._isRoot) {
            class RootScopeModule {
            }
            RootScopeModule.decorators = [
                { type: NgModule, args: [{
                            providers: [
                                ...rootProviderOverrides,
                            ],
                            jit: true,
                        },] },
            ];
            rootScopeImports.push(RootScopeModule);
        }
        providers.push({ provide: APP_ROOT, useValue: this._isRoot });
        /** @type {?} */
        const imports = [rootScopeImports, this.ngModule, this._imports];
        /** @type {?} */
        const schemas = this._schemas;
        class DynamicTestModule {
        }
        DynamicTestModule.decorators = [
            { type: NgModule, args: [{ providers, declarations, imports, schemas, jit: true },] },
        ];
        /** @type {?} */
        const compilerFactory = this.platform.injector.get(TestingCompilerFactory);
        this._compiler = compilerFactory.createTestingCompiler(this._compilerOptions);
        for (const summary of [this._testEnvAotSummaries, ...this._aotSummaries]) {
            this._compiler.loadAotSummaries(summary);
        }
        this._moduleOverrides.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => this._compiler.overrideModule(entry[0], entry[1])));
        this._componentOverrides.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => this._compiler.overrideComponent(entry[0], entry[1])));
        this._directiveOverrides.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => this._compiler.overrideDirective(entry[0], entry[1])));
        this._pipeOverrides.forEach((/**
         * @param {?} entry
         * @return {?}
         */
        (entry) => this._compiler.overridePipe(entry[0], entry[1])));
        return DynamicTestModule;
    }
    /**
     * @private
     * @param {?} methodName
     * @param {?} methodDescription
     * @return {?}
     */
    _assertNotInstantiated(methodName, methodDescription) {
        if (this._instantiated) {
            throw new Error(`Cannot ${methodDescription} when the test module has already been instantiated. ` +
                `Make sure you are not using \`inject\` before \`${methodName}\`.`);
        }
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        // Tests can inject things from the ng module and from the compiler,
        // but the ng module can't inject things from the compiler and vice versa.
        /** @type {?} */
        const result = this._moduleRef.injector.get(token, UNDEFINED, flags);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue, flags) : result;
    }
    /**
     * @param {?} tokens
     * @param {?} fn
     * @param {?=} context
     * @return {?}
     */
    execute(tokens, fn, context) {
        this._initIfNeeded();
        /** @type {?} */
        const params = tokens.map((/**
         * @param {?} t
         * @return {?}
         */
        t => this.get(t)));
        return fn.apply(context, params);
    }
    /**
     * @param {?} ngModule
     * @param {?} override
     * @return {?}
     */
    overrideModule(ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    }
    /**
     * @param {?} component
     * @param {?} override
     * @return {?}
     */
    overrideComponent(component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    }
    /**
     * @param {?} directive
     * @param {?} override
     * @return {?}
     */
    overrideDirective(directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    }
    /**
     * @param {?} pipe
     * @param {?} override
     * @return {?}
     */
    overridePipe(pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    }
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    overrideProvider(token, provider) {
        this.overrideProviderImpl(token, provider);
    }
    /**
     * @param {?} token
     * @param {?} provider
     * @return {?}
     */
    deprecatedOverrideProvider(token, provider) {
        this.overrideProviderImpl(token, provider, /* deprecated */ true);
    }
    /**
     * @private
     * @param {?} token
     * @param {?} provider
     * @param {?=} deprecated
     * @return {?}
     */
    overrideProviderImpl(token, provider, deprecated = false) {
        /** @type {?} */
        let def = null;
        if (typeof token !== 'string' && (def = getInjectableDef(token)) && def.providedIn === 'root') {
            if (provider.useFactory) {
                this._rootProviderOverrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
            }
            else {
                this._rootProviderOverrides.push({ provide: token, useValue: provider.useValue });
            }
        }
        /** @type {?} */
        let flags = 0;
        /** @type {?} */
        let value;
        if (provider.useFactory) {
            flags |= 1024 /* TypeFactoryProvider */;
            value = provider.useFactory;
        }
        else {
            flags |= 256 /* TypeValueProvider */;
            value = provider.useValue;
        }
        /** @type {?} */
        const deps = (provider.deps || []).map((/**
         * @param {?} dep
         * @return {?}
         */
        (dep) => {
            /** @type {?} */
            let depFlags = 0 /* None */;
            /** @type {?} */
            let depToken;
            if (Array.isArray(dep)) {
                dep.forEach((/**
                 * @param {?} entry
                 * @return {?}
                 */
                (entry) => {
                    if (entry instanceof Optional) {
                        depFlags |= 2 /* Optional */;
                    }
                    else if (entry instanceof SkipSelf) {
                        depFlags |= 1 /* SkipSelf */;
                    }
                    else {
                        depToken = entry;
                    }
                }));
            }
            else {
                depToken = dep;
            }
            return [depFlags, depToken];
        }));
        overrideProvider({ token, flags, deps, value, deprecatedBehavior: deprecated });
    }
    /**
     * @param {?} component
     * @param {?} template
     * @return {?}
     */
    overrideTemplateUsingTestingModule(component, template) {
        this._assertNotInstantiated('overrideTemplateUsingTestingModule', 'override template');
        class OverrideComponent {
        }
        OverrideComponent.decorators = [
            { type: Component, args: [{ selector: 'empty', template, jit: true },] },
        ];
        this._templateOverrides.push({ component, templateOf: OverrideComponent });
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    createComponent(component) {
        this._initIfNeeded();
        /** @type {?} */
        const componentFactory = this._compiler.getComponentFactory(component);
        if (!componentFactory) {
            throw new Error(`Cannot create the component ${stringify(component)} as it was not imported into the testing module!`);
        }
        // TODO: Don't cast as `any`, proper type is boolean[]
        /** @type {?} */
        const noNgZone = this.get((/** @type {?} */ (ComponentFixtureNoNgZone)), false);
        // TODO: Don't cast as `any`, proper type is boolean[]
        /** @type {?} */
        const autoDetect = this.get((/** @type {?} */ (ComponentFixtureAutoDetect)), false);
        /** @type {?} */
        const ngZone = noNgZone ? null : this.get((/** @type {?} */ (NgZone)), null);
        /** @type {?} */
        const testComponentRenderer = this.get(TestComponentRenderer);
        /** @type {?} */
        const rootElId = `root${_nextRootElementId++}`;
        testComponentRenderer.insertRootElement(rootElId);
        /** @type {?} */
        const initComponent = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const componentRef = componentFactory.create(Injector.NULL, [], `#${rootElId}`, this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        });
        /** @type {?} */
        const fixture = !ngZone ? initComponent() : ngZone.run(initComponent);
        this._activeFixtures.push(fixture);
        return fixture;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._instantiated;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._compiler;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._moduleRef;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._moduleFactory;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._compilerOptions;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._moduleOverrides;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._componentOverrides;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._directiveOverrides;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._pipeOverrides;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._providers;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._declarations;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._imports;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._schemas;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._activeFixtures;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._testEnvAotSummaries;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._aotSummaries;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._templateOverrides;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._isRoot;
    /**
     * @type {?}
     * @private
     */
    TestBedViewEngine.prototype._rootProviderOverrides;
    /** @type {?} */
    TestBedViewEngine.prototype.platform;
    /** @type {?} */
    TestBedViewEngine.prototype.ngModule;
}
/**
 * \@description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 *
 * \@publicApi
 * @type {?}
 */
export const TestBed = ivyEnabled ? (/** @type {?} */ ((/** @type {?} */ (TestBedRender3)))) : (/** @type {?} */ ((/** @type {?} */ (TestBedViewEngine))));
/**
 * Returns a singleton of the applicable `TestBed`.
 *
 * It will be either an instance of `TestBedViewEngine` or `TestBedRender3`.
 *
 * \@publicApi
 * @type {?}
 */
export const getTestBed = ivyEnabled ? _getTestBedRender3 : _getTestBedViewEngine;
/** @type {?} */
let testBed;
/**
 * @return {?}
 */
function _getTestBedViewEngine() {
    return testBed = testBed || new TestBedViewEngine();
}
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', \@Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * \@publicApi
 * @param {?} tokens
 * @param {?} fn
 * @return {?}
 */
export function inject(tokens, fn) {
    /** @type {?} */
    const testBed = getTestBed();
    if (tokens.indexOf(AsyncTestCompleter) >= 0) {
        // Not using an arrow function to preserve context passed from call site
        return (/**
         * @return {?}
         */
        function () {
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of
            // the injected tokens.
            return testBed.compileComponents().then((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const completer = testBed.get(AsyncTestCompleter);
                testBed.execute(tokens, fn, this);
                return completer.promise;
            }));
        });
    }
    else {
        // Not using an arrow function to preserve context passed from call site
        return (/**
         * @return {?}
         */
        function () { return testBed.execute(tokens, fn, this); });
    }
}
/**
 * \@publicApi
 */
export class InjectSetupWrapper {
    /**
     * @param {?} _moduleDef
     */
    constructor(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    /**
     * @private
     * @return {?}
     */
    _addModule() {
        /** @type {?} */
        const moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    }
    /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    inject(tokens, fn) {
        /** @type {?} */
        const self = this;
        // Not using an arrow function to preserve context passed from call site
        return (/**
         * @return {?}
         */
        function () {
            self._addModule();
            return inject(tokens, fn).call(this);
        });
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    InjectSetupWrapper.prototype._moduleDef;
}
/**
 * @param {?} moduleDef
 * @param {?=} fn
 * @return {?}
 */
export function withModule(moduleDef, fn) {
    if (fn) {
        // Not using an arrow function to preserve context passed from call site
        return (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn.apply(this);
        });
    }
    return new InjectSetupWrapper((/**
     * @return {?}
     */
    () => moduleDef));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL3Rlc3RfYmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLHFCQUFxQixFQUFtQixTQUFTLEVBQWEsV0FBVyxFQUFrQixRQUFRLEVBQUUsUUFBUSxFQUFnQyxNQUFNLEVBQUUsUUFBUSxFQUErQyxRQUFRLEVBQXdCLFNBQVMsSUFBSSxRQUFRLEVBQW1GLGVBQWUsSUFBSSxjQUFjLEVBQUUsaUJBQWlCLElBQUksZ0JBQWdCLEVBQUUsV0FBVyxJQUFJLFVBQVUsRUFBRSxzQkFBc0IsSUFBSSxxQkFBcUIsRUFBRSxpQkFBaUIsSUFBSSxnQkFBZ0IsRUFBRSxVQUFVLElBQUksU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZrQixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBQywwQkFBMEIsRUFBRSx3QkFBd0IsRUFBaUIscUJBQXFCLEVBQXFCLE1BQU0sbUJBQW1CLENBQUM7QUFDakosT0FBTyxFQUFrQixzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDOztNQUdsRSxTQUFTLEdBQUcsSUFBSSxNQUFNLEVBQUU7O0lBRzFCLGtCQUFrQixHQUFHLENBQUM7Ozs7Ozs7Ozs7OztBQTZGMUIsTUFBTSxPQUFPLGlCQUFpQjtJQUE5QjtRQW1KVSxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixjQUFTLEdBQW9CLG1CQUFBLElBQUksRUFBRSxDQUFDO1FBQ3BDLGVBQVUsR0FBcUIsbUJBQUEsSUFBSSxFQUFFLENBQUM7UUFDdEMsbUJBQWMs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Qix3RUFBd0U7UUFDeEU7OztRQUFPO1lBQ0wsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7SUFqQmEsd0NBQTRDOzs7Ozs7O0FBd0IxRCxNQUFNLFVBQVUsVUFBVSxDQUFDLFNBQTZCLEVBQUUsRUFBb0I7SUFFNUUsSUFBSSxFQUFFLEVBQUU7UUFDTix3RUFBd0U7UUFDeEU7OztRQUFPOztrQkFDQyxPQUFPLEdBQUcsVUFBVSxFQUFFO1lBQzVCLElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMzQztZQUNELE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUM7S0FDSDtJQUNELE9BQU8sSUFBSSxrQkFBa0I7OztJQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBQyxDQUFDO0FBQ2pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25Jbml0U3RhdHVzLCBDb21waWxlck9wdGlvbnMsIENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbmplY3RGbGFncywgSW5qZWN0aW9uVG9rZW4sIEluamVjdG9yLCBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgTmdab25lLCBPcHRpb25hbCwgUGlwZSwgUGxhdGZvcm1SZWYsIFByb3ZpZGVyLCBTY2hlbWFNZXRhZGF0YSwgU2tpcFNlbGYsIFN0YXRpY1Byb3ZpZGVyLCBUeXBlLCDJtUFQUF9ST09UIGFzIEFQUF9ST09ULCDJtURlcEZsYWdzIGFzIERlcEZsYWdzLCDJtUluamVjdGFibGVEZWYgYXMgSW5qZWN0YWJsZURlZiwgybVOb2RlRmxhZ3MgYXMgTm9kZUZsYWdzLCDJtWNsZWFyT3ZlcnJpZGVzIGFzIGNsZWFyT3ZlcnJpZGVzLCDJtWdldEluamVjdGFibGVEZWYgYXMgZ2V0SW5qZWN0YWJsZURlZiwgybVpdnlFbmFibGVkIGFzIGl2eUVuYWJsZWQsIMm1b3ZlcnJpZGVDb21wb25lbnRWaWV3IGFzIG92ZXJyaWRlQ29tcG9uZW50VmlldywgybVvdmVycmlkZVByb3ZpZGVyIGFzIG92ZXJyaWRlUHJvdmlkZXIsIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QXN5bmNUZXN0Q29tcGxldGVyfSBmcm9tICcuL2FzeW5jX3Rlc3RfY29tcGxldGVyJztcbmltcG9ydCB7Q29tcG9uZW50Rml4dHVyZX0gZnJvbSAnLi9jb21wb25lbnRfZml4dHVyZSc7XG5pbXBvcnQge01ldGFkYXRhT3ZlcnJpZGV9IGZyb20gJy4vbWV0YWRhdGFfb3ZlcnJpZGUnO1xuaW1wb3J0IHtUZXN0QmVkUmVuZGVyMywgX2dldFRlc3RCZWRSZW5kZXIzfSBmcm9tICcuL3IzX3Rlc3RfYmVkJztcbmltcG9ydCB7Q29tcG9uZW50Rml4dHVyZUF1dG9EZXRlY3QsIENvbXBvbmVudEZpeHR1cmVOb05nWm9uZSwgVGVzdEJlZFN0YXRpYywgVGVzdENvbXBvbmVudFJlbmRlcmVyLCBUZXN0TW9kdWxlTWV0YWRhdGF9IGZyb20gJy4vdGVzdF9iZWRfY29tbW9uJztcbmltcG9ydCB7VGVzdGluZ0NvbXBpbGVyLCBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5fSBmcm9tICcuL3Rlc3RfY29tcGlsZXInO1xuXG5cbmNvbnN0IFVOREVGSU5FRCA9IG5ldyBPYmplY3QoKTtcblxuXG5sZXQgX25leHRSb290RWxlbWVudElkID0gMDtcblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGVzdEJlZCB7XG4gIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZjtcblxuICBuZ01vZHVsZTogVHlwZTxhbnk+fFR5cGU8YW55PltdO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBmb3IgdGVzdGluZyB3aXRoIGEgY29tcGlsZXIgZmFjdG9yeSwgYSBQbGF0Zm9ybVJlZiwgYW5kIGFuXG4gICAqIGFuZ3VsYXIgbW9kdWxlLiBUaGVzZSBhcmUgY29tbW9uIHRvIGV2ZXJ5IHRlc3QgaW4gdGhlIHN1aXRlLlxuICAgKlxuICAgKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcbiAgICogc3VpdGUgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0uIElmIHlvdSBhYnNvbHV0ZWx5IG5lZWQgdG8gY2hhbmdlIHRoZSBwcm92aWRlcnMsXG4gICAqIGZpcnN0IHVzZSBgcmVzZXRUZXN0RW52aXJvbm1lbnRgLlxuICAgKlxuICAgKiBUZXN0IG1vZHVsZXMgYW5kIHBsYXRmb3JtcyBmb3IgaW5kaXZpZHVhbCBwbGF0Zm9ybXMgYXJlIGF2YWlsYWJsZSBmcm9tXG4gICAqICdAYW5ndWxhci88cGxhdGZvcm1fbmFtZT4vdGVzdGluZycuXG4gICAqL1xuICBpbml0VGVzdEVudmlyb25tZW50KFxuICAgICAgbmdNb2R1bGU6IFR5cGU8YW55PnxUeXBlPGFueT5bXSwgcGxhdGZvcm06IFBsYXRmb3JtUmVmLCBhb3RTdW1tYXJpZXM/OiAoKSA9PiBhbnlbXSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBwcm92aWRlcnMgZm9yIHRoZSB0ZXN0IGluamVjdG9yLlxuICAgKi9cbiAgcmVzZXRUZXN0RW52aXJvbm1lbnQoKTogdm9pZDtcblxuICByZXNldFRlc3RpbmdNb2R1bGUoKTogdm9pZDtcblxuICBjb25maWd1cmVDb21waWxlcihjb25maWc6IHtwcm92aWRlcnM/OiBhbnlbXSwgdXNlSml0PzogYm9vbGVhbn0pOiB2b2lkO1xuXG4gIGNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEpOiB2b2lkO1xuXG4gIGNvbXBpbGVDb21wb25lbnRzKCk6IFByb21pc2U8YW55PjtcblxuICBnZXQ8VD4odG9rZW46IFR5cGU8VD58SW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU/OiBULCBmbGFncz86IEluamVjdEZsYWdzKTogYW55O1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgZnJvbSB2OC4wLjAgdXNlIFR5cGU8VD4gb3IgSW5qZWN0aW9uVG9rZW48VD5cbiAgICovXG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xuXG4gIGV4ZWN1dGUodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uLCBjb250ZXh0PzogYW55KTogYW55O1xuXG4gIG92ZXJyaWRlTW9kdWxlKG5nTW9kdWxlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPE5nTW9kdWxlPik6IHZvaWQ7XG5cbiAgb3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50OiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD4pOiB2b2lkO1xuXG4gIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZDtcblxuICBvdmVycmlkZVBpcGUocGlwZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgYWxsIHByb3ZpZGVycyBmb3IgdGhlIGdpdmVuIHRva2VuIHdpdGggdGhlIGdpdmVuIHByb3ZpZGVyIGRlZmluaXRpb24uXG4gICAqL1xuICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XG4gICAgdXNlRmFjdG9yeTogRnVuY3Rpb24sXG4gICAgZGVwczogYW55W10sXG4gIH0pOiB2b2lkO1xuICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdm9pZDtcbiAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge3VzZUZhY3Rvcnk/OiBGdW5jdGlvbiwgdXNlVmFsdWU/OiBhbnksIGRlcHM/OiBhbnlbXX0pOlxuICAgICAgdm9pZDtcblxuICAvKipcbiAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgYXMgaXQgbWFrZXMgYWxsIE5nTW9kdWxlcyBsYXp5LiBJbnRyb2R1Y2VkIG9ubHkgZm9yIG1pZ3JhdGluZyBvZmYgb2YgaXQuXG4gICAqL1xuICBkZXByZWNhdGVkT3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xuICAgIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uLFxuICAgIGRlcHM6IGFueVtdLFxuICB9KTogdm9pZDtcbiAgZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHt1c2VWYWx1ZTogYW55O30pOiB2b2lkO1xuICBkZXByZWNhdGVkT3ZlcnJpZGVQcm92aWRlcihcbiAgICAgIHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlRmFjdG9yeT86IEZ1bmN0aW9uLCB1c2VWYWx1ZT86IGFueSwgZGVwcz86IGFueVtdfSk6IHZvaWQ7XG5cblxuICBvdmVycmlkZVRlbXBsYXRlVXNpbmdUZXN0aW5nTW9kdWxlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogdm9pZDtcblxuICBjcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPjtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbmZpZ3VyZXMgYW5kIGluaXRpYWxpemVzIGVudmlyb25tZW50IGZvciB1bml0IHRlc3RpbmcgYW5kIHByb3ZpZGVzIG1ldGhvZHMgZm9yXG4gKiBjcmVhdGluZyBjb21wb25lbnRzIGFuZCBzZXJ2aWNlcyBpbiB1bml0IHRlc3RzLlxuICpcbiAqIGBUZXN0QmVkYCBpcyB0aGUgcHJpbWFyeSBhcGkgZm9yIHdyaXRpbmcgdW5pdCB0ZXN0cyBmb3IgQW5ndWxhciBhcHBsaWNhdGlvbnMgYW5kIGxpYnJhcmllcy5cbiAqXG4gKiBOb3RlOiBVc2UgYFRlc3RCZWRgIGluIHRlc3RzLiBJdCB3aWxsIGJlIHNldCB0byBlaXRoZXIgYFRlc3RCZWRWaWV3RW5naW5lYCBvciBgVGVzdEJlZFJlbmRlcjNgXG4gKiBhY2NvcmRpbmcgdG8gdGhlIGNvbXBpbGVyIHVzZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0QmVkVmlld0VuZ2luZSBpbXBsZW1lbnRzIEluamVjdG9yLCBUZXN0QmVkIHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGVudmlyb25tZW50IGZvciB0ZXN0aW5nIHdpdGggYSBjb21waWxlciBmYWN0b3J5LCBhIFBsYXRmb3JtUmVmLCBhbmQgYW5cbiAgICogYW5ndWxhciBtb2R1bGUuIFRoZXNlIGFyZSBjb21tb24gdG8gZXZlcnkgdGVzdCBpbiB0aGUgc3VpdGUuXG4gICAqXG4gICAqIFRoaXMgbWF5IG9ubHkgYmUgY2FsbGVkIG9uY2UsIHRvIHNldCB1cCB0aGUgY29tbW9uIHByb3ZpZGVycyBmb3IgdGhlIGN1cnJlbnQgdGVzdFxuICAgKiBzdWl0ZSBvbiB0aGUgY3VycmVudCBwbGF0Zm9ybS4gSWYgeW91IGFic29sdXRlbHkgbmVlZCB0byBjaGFuZ2UgdGhlIHByb3ZpZGVycyxcbiAgICogZmlyc3QgdXNlIGByZXNldFRlc3RFbnZpcm9ubWVudGAuXG4gICAqXG4gICAqIFRlc3QgbW9kdWxlcyBhbmQgcGxhdGZvcm1zIGZvciBpbmRpdmlkdWFsIHBsYXRmb3JtcyBhcmUgYXZhaWxhYmxlIGZyb21cbiAgICogJ0Bhbmd1bGFyLzxwbGF0Zm9ybV9uYW1lPi90ZXN0aW5nJy5cbiAgICovXG4gIHN0YXRpYyBpbml0VGVzdEVudmlyb25tZW50KFxuICAgICAgbmdNb2R1bGU6IFR5cGU8YW55PnxUeXBlPGFueT5bXSwgcGxhdGZvcm06IFBsYXRmb3JtUmVmLFxuICAgICAgYW90U3VtbWFyaWVzPzogKCkgPT4gYW55W10pOiBUZXN0QmVkVmlld0VuZ2luZSB7XG4gICAgY29uc3QgdGVzdEJlZCA9IF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpO1xuICAgIHRlc3RCZWQuaW5pdFRlc3RFbnZpcm9ubWVudChuZ01vZHVsZSwgcGxhdGZvcm0sIGFvdFN1bW1hcmllcyk7XG4gICAgcmV0dXJuIHRlc3RCZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHByb3ZpZGVycyBmb3IgdGhlIHRlc3QgaW5qZWN0b3IuXG4gICAqL1xuICBzdGF0aWMgcmVzZXRUZXN0RW52aXJvbm1lbnQoKTogdm9pZCB7IF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpLnJlc2V0VGVzdEVudmlyb25tZW50KCk7IH1cblxuICBzdGF0aWMgcmVzZXRUZXN0aW5nTW9kdWxlKCk6IFRlc3RCZWRTdGF0aWMge1xuICAgIF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpLnJlc2V0VGVzdGluZ01vZHVsZSgpO1xuICAgIHJldHVybiBUZXN0QmVkVmlld0VuZ2luZSBhcyBhbnkgYXMgVGVzdEJlZFN0YXRpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IGNvbXBpbGVyIHByb3ZpZGVycyBhbmQgc2V0dGluZ3NcbiAgICogd2hpY2ggYXJlIGRlZmluZWQgaW4gdGVzdF9pbmplY3Rvci5qc1xuICAgKi9cbiAgc3RhdGljIGNvbmZpZ3VyZUNvbXBpbGVyKGNvbmZpZzoge3Byb3ZpZGVycz86IGFueVtdOyB1c2VKaXQ/OiBib29sZWFuO30pOiBUZXN0QmVkU3RhdGljIHtcbiAgICBfZ2V0VGVzdEJlZFZpZXdFbmdpbmUoKS5jb25maWd1cmVDb21waWxlcihjb25maWcpO1xuICAgIHJldHVybiBUZXN0QmVkVmlld0VuZ2luZSBhcyBhbnkgYXMgVGVzdEJlZFN0YXRpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IHByb3ZpZGVycywgZGlyZWN0aXZlcywgcGlwZXMsIG1vZHVsZXMgb2YgdGhlIHRlc3QgaW5qZWN0b3IsXG4gICAqIHdoaWNoIGFyZSBkZWZpbmVkIGluIHRlc3RfaW5qZWN0b3IuanNcbiAgICovXG4gIHN0YXRpYyBjb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZjogVGVzdE1vZHVsZU1ldGFkYXRhKTogVGVzdEJlZFN0YXRpYyB7XG4gICAgX2dldFRlc3RCZWRWaWV3RW5naW5lKCkuY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWYpO1xuICAgIHJldHVybiBUZXN0QmVkVmlld0VuZ2luZSBhcyBhbnkgYXMgVGVzdEJlZFN0YXRpYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIGNvbXBvbmVudHMgd2l0aCBhIGB0ZW1wbGF0ZVVybGAgZm9yIHRoZSB0ZXN0J3MgTmdNb2R1bGUuXG4gICAqIEl0IGlzIG5lY2Vzc2FyeSB0byBjYWxsIHRoaXMgZnVuY3Rpb25cbiAgICogYXMgZmV0Y2hpbmcgdXJscyBpcyBhc3luY2hyb25vdXMuXG4gICAqL1xuICBzdGF0aWMgY29tcGlsZUNvbXBvbmVudHMoKTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIGdldFRlc3RCZWQoKS5jb21waWxlQ29tcG9uZW50cygpOyB9XG5cbiAgc3RhdGljIG92ZXJyaWRlTW9kdWxlKG5nTW9kdWxlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPE5nTW9kdWxlPik6IFRlc3RCZWRTdGF0aWMge1xuICAgIF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpLm92ZXJyaWRlTW9kdWxlKG5nTW9kdWxlLCBvdmVycmlkZSk7XG4gICAgcmV0dXJuIFRlc3RCZWRWaWV3RW5naW5lIGFzIGFueSBhcyBUZXN0QmVkU3RhdGljO1xuICB9XG5cbiAgc3RhdGljIG92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+KTpcbiAgICAgIFRlc3RCZWRTdGF0aWMge1xuICAgIF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpLm92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudCwgb3ZlcnJpZGUpO1xuICAgIHJldHVybiBUZXN0QmVkVmlld0VuZ2luZSBhcyBhbnkgYXMgVGVzdEJlZFN0YXRpYztcbiAgfVxuXG4gIHN0YXRpYyBvdmVycmlkZURpcmVjdGl2ZShkaXJlY3RpdmU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8RGlyZWN0aXZlPik6XG4gICAgICBUZXN0QmVkU3RhdGljIHtcbiAgICBfZ2V0VGVzdEJlZFZpZXdFbmdpbmUoKS5vdmVycmlkZURpcmVjdGl2ZShkaXJlY3RpdmUsIG92ZXJyaWRlKTtcbiAgICByZXR1cm4gVGVzdEJlZFZpZXdFbmdpbmUgYXMgYW55IGFzIFRlc3RCZWRTdGF0aWM7XG4gIH1cblxuICBzdGF0aWMgb3ZlcnJpZGVQaXBlKHBpcGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT4pOiBUZXN0QmVkU3RhdGljIHtcbiAgICBfZ2V0VGVzdEJlZFZpZXdFbmdpbmUoKS5vdmVycmlkZVBpcGUocGlwZSwgb3ZlcnJpZGUpO1xuICAgIHJldHVybiBUZXN0QmVkVmlld0VuZ2luZSBhcyBhbnkgYXMgVGVzdEJlZFN0YXRpYztcbiAgfVxuXG4gIHN0YXRpYyBvdmVycmlkZVRlbXBsYXRlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogVGVzdEJlZFN0YXRpYyB7XG4gICAgX2dldFRlc3RCZWRWaWV3RW5naW5lKCkub3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50LCB7c2V0OiB7dGVtcGxhdGUsIHRlbXBsYXRlVXJsOiBudWxsICF9fSk7XG4gICAgcmV0dXJuIFRlc3RCZWRWaWV3RW5naW5lIGFzIGFueSBhcyBUZXN0QmVkU3RhdGljO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRlcyB0aGUgdGVtcGxhdGUgb2YgdGhlIGdpdmVuIGNvbXBvbmVudCwgY29tcGlsaW5nIHRoZSB0ZW1wbGF0ZVxuICAgKiBpbiB0aGUgY29udGV4dCBvZiB0aGUgVGVzdGluZ01vZHVsZS5cbiAgICpcbiAgICogTm90ZTogVGhpcyB3b3JrcyBmb3IgSklUIGFuZCBBT1RlZCBjb21wb25lbnRzIGFzIHdlbGwuXG4gICAqL1xuICBzdGF0aWMgb3ZlcnJpZGVUZW1wbGF0ZVVzaW5nVGVzdGluZ01vZHVsZShjb21wb25lbnQ6IFR5cGU8YW55PiwgdGVtcGxhdGU6IHN0cmluZyk6IFRlc3RCZWRTdGF0aWMge1xuICAgIF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpLm92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUoY29tcG9uZW50LCB0ZW1wbGF0ZSk7XG4gICAgcmV0dXJuIFRlc3RCZWRWaWV3RW5naW5lIGFzIGFueSBhcyBUZXN0QmVkU3RhdGljO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgYWxsIHByb3ZpZGVycyBmb3IgdGhlIGdpdmVuIHRva2VuIHdpdGggdGhlIGdpdmVuIHByb3ZpZGVyIGRlZmluaXRpb24uXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgd29ya3MgZm9yIEpJVCBhbmQgQU9UZWQgY29tcG9uZW50cyBhcyB3ZWxsLlxuICAgKi9cbiAgc3RhdGljIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcbiAgICB1c2VGYWN0b3J5OiBGdW5jdGlvbixcbiAgICBkZXBzOiBhbnlbXSxcbiAgfSk6IFRlc3RCZWRTdGF0aWM7XG4gIHN0YXRpYyBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogVGVzdEJlZFN0YXRpYztcbiAgc3RhdGljIG92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcbiAgICB1c2VGYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgdXNlVmFsdWU/OiBhbnksXG4gICAgZGVwcz86IGFueVtdLFxuICB9KTogVGVzdEJlZFN0YXRpYyB7XG4gICAgX2dldFRlc3RCZWRWaWV3RW5naW5lKCkub3ZlcnJpZGVQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIgYXMgYW55KTtcbiAgICByZXR1cm4gVGVzdEJlZFZpZXdFbmdpbmUgYXMgYW55IGFzIFRlc3RCZWRTdGF0aWM7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgYXMgaXQgbWFrZXMgYWxsIE5nTW9kdWxlcyBsYXp5LiBJbnRyb2R1Y2VkIG9ubHkgZm9yIG1pZ3JhdGluZyBvZmYgb2YgaXQuXG4gICAqL1xuICBzdGF0aWMgZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcbiAgICB1c2VGYWN0b3J5OiBGdW5jdGlvbixcbiAgICBkZXBzOiBhbnlbXSxcbiAgfSk6IHZvaWQ7XG4gIHN0YXRpYyBkZXByZWNhdGVkT3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge3VzZVZhbHVlOiBhbnk7fSk6IHZvaWQ7XG4gIHN0YXRpYyBkZXByZWNhdGVkT3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xuICAgIHVzZUZhY3Rvcnk/OiBGdW5jdGlvbixcbiAgICB1c2VWYWx1ZT86IGFueSxcbiAgICBkZXBzPzogYW55W10sXG4gIH0pOiBUZXN0QmVkU3RhdGljIHtcbiAgICBfZ2V0VGVzdEJlZFZpZXdFbmdpbmUoKS5kZXByZWNhdGVkT3ZlcnJpZGVQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIgYXMgYW55KTtcbiAgICByZXR1cm4gVGVzdEJlZFZpZXdFbmdpbmUgYXMgYW55IGFzIFRlc3RCZWRTdGF0aWM7XG4gIH1cblxuICBzdGF0aWMgZ2V0PFQ+KHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IGFueTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIGZyb20gdjguMC4wIHVzZSBUeXBlPFQ+IG9yIEluamVjdGlvblRva2VuPFQ+XG4gICAqIEBzdXBwcmVzcyB7ZHVwbGljYXRlfVxuICAgKi9cbiAgc3RhdGljIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xuICBzdGF0aWMgZ2V0KFxuICAgICAgdG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5ELFxuICAgICAgZmxhZ3M6IEluamVjdEZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdCk6IGFueSB7XG4gICAgcmV0dXJuIF9nZXRUZXN0QmVkVmlld0VuZ2luZSgpLmdldCh0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUNvbXBvbmVudDxUPihjb21wb25lbnQ6IFR5cGU8VD4pOiBDb21wb25lbnRGaXh0dXJlPFQ+IHtcbiAgICByZXR1cm4gX2dldFRlc3RCZWRWaWV3RW5naW5lKCkuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gIH1cblxuICBwcml2YXRlIF9pbnN0YW50aWF0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIF9jb21waWxlcjogVGVzdGluZ0NvbXBpbGVyID0gbnVsbCAhO1xuICBwcml2YXRlIF9tb2R1bGVSZWY6IE5nTW9kdWxlUmVmPGFueT4gPSBudWxsICE7XG4gIHByaXZhdGUgX21vZHVsZUZhY3Rvcnk6IE5nTW9kdWxlRmFjdG9yeTxhbnk+ID0gbnVsbCAhO1xuXG4gIHByaXZhdGUgX2NvbXBpbGVyT3B0aW9uczogQ29tcGlsZXJPcHRpb25zW10gPSBbXTtcblxuICBwcml2YXRlIF9tb2R1bGVPdmVycmlkZXM6IFtUeXBlPGFueT4sIE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+XVtdID0gW107XG4gIHByaXZhdGUgX2NvbXBvbmVudE92ZXJyaWRlczogW1R5cGU8YW55PiwgTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+XVtdID0gW107XG4gIHByaXZhdGUgX2RpcmVjdGl2ZU92ZXJyaWRlczogW1R5cGU8YW55PiwgTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+XVtdID0gW107XG4gIHByaXZhdGUgX3BpcGVPdmVycmlkZXM6IFtUeXBlPGFueT4sIE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT5dW10gPSBbXTtcblxuICBwcml2YXRlIF9wcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfZGVjbGFyYXRpb25zOiBBcnJheTxUeXBlPGFueT58YW55W118YW55PiA9IFtdO1xuICBwcml2YXRlIF9pbXBvcnRzOiBBcnJheTxUeXBlPGFueT58YW55W118YW55PiA9IFtdO1xuICBwcml2YXRlIF9zY2hlbWFzOiBBcnJheTxTY2hlbWFNZXRhZGF0YXxhbnlbXT4gPSBbXTtcbiAgcHJpdmF0ZSBfYWN0aXZlRml4dHVyZXM6IENvbXBvbmVudEZpeHR1cmU8YW55PltdID0gW107XG5cbiAgcHJpdmF0ZSBfdGVzdEVudkFvdFN1bW1hcmllczogKCkgPT4gYW55W10gPSAoKSA9PiBbXTtcbiAgcHJpdmF0ZSBfYW90U3VtbWFyaWVzOiBBcnJheTwoKSA9PiBhbnlbXT4gPSBbXTtcbiAgcHJpdmF0ZSBfdGVtcGxhdGVPdmVycmlkZXM6IEFycmF5PHtjb21wb25lbnQ6IFR5cGU8YW55PiwgdGVtcGxhdGVPZjogVHlwZTxhbnk+fT4gPSBbXTtcblxuICBwcml2YXRlIF9pc1Jvb3Q6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIF9yb290UHJvdmlkZXJPdmVycmlkZXM6IFByb3ZpZGVyW10gPSBbXTtcblxuICBwbGF0Zm9ybTogUGxhdGZvcm1SZWYgPSBudWxsICE7XG5cbiAgbmdNb2R1bGU6IFR5cGU8YW55PnxUeXBlPGFueT5bXSA9IG51bGwgITtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgZW52aXJvbm1lbnQgZm9yIHRlc3Rpbmcgd2l0aCBhIGNvbXBpbGVyIGZhY3RvcnksIGEgUGxhdGZvcm1SZWYsIGFuZCBhblxuICAgKiBhbmd1bGFyIG1vZHVsZS4gVGhlc2UgYXJlIGNvbW1vbiB0byBldmVyeSB0ZXN0IGluIHRoZSBzdWl0ZS5cbiAgICpcbiAgICogVGhpcyBtYXkgb25seSBiZSBjYWxsZWQgb25jZSwgdG8gc2V0IHVwIHRoZSBjb21tb24gcHJvdmlkZXJzIGZvciB0aGUgY3VycmVudCB0ZXN0XG4gICAqIHN1aXRlIG9uIHRoZSBjdXJyZW50IHBsYXRmb3JtLiBJZiB5b3UgYWJzb2x1dGVseSBuZWVkIHRvIGNoYW5nZSB0aGUgcHJvdmlkZXJzLFxuICAgKiBmaXJzdCB1c2UgYHJlc2V0VGVzdEVudmlyb25tZW50YC5cbiAgICpcbiAgICogVGVzdCBtb2R1bGVzIGFuZCBwbGF0Zm9ybXMgZm9yIGluZGl2aWR1YWwgcGxhdGZvcm1zIGFyZSBhdmFpbGFibGUgZnJvbVxuICAgKiAnQGFuZ3VsYXIvPHBsYXRmb3JtX25hbWU+L3Rlc3RpbmcnLlxuICAgKi9cbiAgaW5pdFRlc3RFbnZpcm9ubWVudChcbiAgICAgIG5nTW9kdWxlOiBUeXBlPGFueT58VHlwZTxhbnk+W10sIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiwgYW90U3VtbWFyaWVzPzogKCkgPT4gYW55W10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybSB8fCB0aGlzLm5nTW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZXQgYmFzZSBwcm92aWRlcnMgYmVjYXVzZSBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbGxlZCcpO1xuICAgIH1cbiAgICB0aGlzLnBsYXRmb3JtID0gcGxhdGZvcm07XG4gICAgdGhpcy5uZ01vZHVsZSA9IG5nTW9kdWxlO1xuICAgIGlmIChhb3RTdW1tYXJpZXMpIHtcbiAgICAgIHRoaXMuX3Rlc3RFbnZBb3RTdW1tYXJpZXMgPSBhb3RTdW1tYXJpZXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBwcm92aWRlcnMgZm9yIHRoZSB0ZXN0IGluamVjdG9yLlxuICAgKi9cbiAgcmVzZXRUZXN0RW52aXJvbm1lbnQoKTogdm9pZCB7XG4gICAgdGhpcy5yZXNldFRlc3RpbmdNb2R1bGUoKTtcbiAgICB0aGlzLnBsYXRmb3JtID0gbnVsbCAhO1xuICAgIHRoaXMubmdNb2R1bGUgPSBudWxsICE7XG4gICAgdGhpcy5fdGVzdEVudkFvdFN1bW1hcmllcyA9ICgpID0+IFtdO1xuICB9XG5cbiAgcmVzZXRUZXN0aW5nTW9kdWxlKCk6IHZvaWQge1xuICAgIGNsZWFyT3ZlcnJpZGVzKCk7XG4gICAgdGhpcy5fYW90U3VtbWFyaWVzID0gW107XG4gICAgdGhpcy5fdGVtcGxhdGVPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9jb21waWxlciA9IG51bGwgITtcbiAgICB0aGlzLl9tb2R1bGVPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9jb21wb25lbnRPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9waXBlT3ZlcnJpZGVzID0gW107XG5cbiAgICB0aGlzLl9pc1Jvb3QgPSB0cnVlO1xuICAgIHRoaXMuX3Jvb3RQcm92aWRlck92ZXJyaWRlcyA9IFtdO1xuXG4gICAgdGhpcy5fbW9kdWxlUmVmID0gbnVsbCAhO1xuICAgIHRoaXMuX21vZHVsZUZhY3RvcnkgPSBudWxsICE7XG4gICAgdGhpcy5fY29tcGlsZXJPcHRpb25zID0gW107XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gW107XG4gICAgdGhpcy5fZGVjbGFyYXRpb25zID0gW107XG4gICAgdGhpcy5faW1wb3J0cyA9IFtdO1xuICAgIHRoaXMuX3NjaGVtYXMgPSBbXTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9hY3RpdmVGaXh0dXJlcy5mb3JFYWNoKChmaXh0dXJlKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBmaXh0dXJlLmRlc3Ryb3koKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIGNsZWFudXAgb2YgY29tcG9uZW50Jywge1xuICAgICAgICAgIGNvbXBvbmVudDogZml4dHVyZS5jb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgICBzdGFja3RyYWNlOiBlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9hY3RpdmVGaXh0dXJlcyA9IFtdO1xuICB9XG5cbiAgY29uZmlndXJlQ29tcGlsZXIoY29uZmlnOiB7cHJvdmlkZXJzPzogYW55W10sIHVzZUppdD86IGJvb2xlYW59KTogdm9pZCB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90SW5zdGFudGlhdGVkKCdUZXN0QmVkLmNvbmZpZ3VyZUNvbXBpbGVyJywgJ2NvbmZpZ3VyZSB0aGUgY29tcGlsZXInKTtcbiAgICB0aGlzLl9jb21waWxlck9wdGlvbnMucHVzaChjb25maWcpO1xuICB9XG5cbiAgY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSk6IHZvaWQge1xuICAgIHRoaXMuX2Fzc2VydE5vdEluc3RhbnRpYXRlZCgnVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlJywgJ2NvbmZpZ3VyZSB0aGUgdGVzdCBtb2R1bGUnKTtcbiAgICBpZiAobW9kdWxlRGVmLnByb3ZpZGVycykge1xuICAgICAgdGhpcy5fcHJvdmlkZXJzLnB1c2goLi4ubW9kdWxlRGVmLnByb3ZpZGVycyk7XG4gICAgfVxuICAgIGlmIChtb2R1bGVEZWYuZGVjbGFyYXRpb25zKSB7XG4gICAgICB0aGlzLl9kZWNsYXJhdGlvbnMucHVzaCguLi5tb2R1bGVEZWYuZGVjbGFyYXRpb25zKTtcbiAgICB9XG4gICAgaWYgKG1vZHVsZURlZi5pbXBvcnRzKSB7XG4gICAgICB0aGlzLl9pbXBvcnRzLnB1c2goLi4ubW9kdWxlRGVmLmltcG9ydHMpO1xuICAgIH1cbiAgICBpZiAobW9kdWxlRGVmLnNjaGVtYXMpIHtcbiAgICAgIHRoaXMuX3NjaGVtYXMucHVzaCguLi5tb2R1bGVEZWYuc2NoZW1hcyk7XG4gICAgfVxuICAgIGlmIChtb2R1bGVEZWYuYW90U3VtbWFyaWVzKSB7XG4gICAgICB0aGlzLl9hb3RTdW1tYXJpZXMucHVzaChtb2R1bGVEZWYuYW90U3VtbWFyaWVzKTtcbiAgICB9XG4gIH1cblxuICBjb21waWxlQ29tcG9uZW50cygpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLl9tb2R1bGVGYWN0b3J5IHx8IHRoaXMuX2luc3RhbnRpYXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGVUeXBlID0gdGhpcy5fY3JlYXRlQ29tcGlsZXJBbmRNb2R1bGUoKTtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZXIuY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luYyhtb2R1bGVUeXBlKVxuICAgICAgICAudGhlbigobW9kdWxlQW5kQ29tcG9uZW50RmFjdG9yaWVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbW9kdWxlRmFjdG9yeSA9IG1vZHVsZUFuZENvbXBvbmVudEZhY3Rvcmllcy5uZ01vZHVsZUZhY3Rvcnk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdElmTmVlZGVkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbnN0YW50aWF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9tb2R1bGVGYWN0b3J5KSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtb2R1bGVUeXBlID0gdGhpcy5fY3JlYXRlQ29tcGlsZXJBbmRNb2R1bGUoKTtcbiAgICAgICAgdGhpcy5fbW9kdWxlRmFjdG9yeSA9XG4gICAgICAgICAgICB0aGlzLl9jb21waWxlci5jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c1N5bmMobW9kdWxlVHlwZSkubmdNb2R1bGVGYWN0b3J5O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBlcnJvckNvbXBUeXBlID0gdGhpcy5fY29tcGlsZXIuZ2V0Q29tcG9uZW50RnJvbUVycm9yKGUpO1xuICAgICAgICBpZiAoZXJyb3JDb21wVHlwZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYFRoaXMgdGVzdCBtb2R1bGUgdXNlcyB0aGUgY29tcG9uZW50ICR7c3RyaW5naWZ5KGVycm9yQ29tcFR5cGUpfSB3aGljaCBpcyB1c2luZyBhIFwidGVtcGxhdGVVcmxcIiBvciBcInN0eWxlVXJsc1wiLCBidXQgdGhleSB3ZXJlIG5ldmVyIGNvbXBpbGVkLiBgICtcbiAgICAgICAgICAgICAgYFBsZWFzZSBjYWxsIFwiVGVzdEJlZC5jb21waWxlQ29tcG9uZW50c1wiIGJlZm9yZSB5b3VyIHRlc3QuYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHtjb21wb25lbnQsIHRlbXBsYXRlT2Z9IG9mIHRoaXMuX3RlbXBsYXRlT3ZlcnJpZGVzKSB7XG4gICAgICBjb25zdCBjb21wRmFjdG9yeSA9IHRoaXMuX2NvbXBpbGVyLmdldENvbXBvbmVudEZhY3RvcnkodGVtcGxhdGVPZik7XG4gICAgICBvdmVycmlkZUNvbXBvbmVudFZpZXcoY29tcG9uZW50LCBjb21wRmFjdG9yeSk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmdab25lID0gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWV9KTtcbiAgICBjb25zdCBwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbe3Byb3ZpZGU6IE5nWm9uZSwgdXNlVmFsdWU6IG5nWm9uZX1dO1xuICAgIGNvbnN0IG5nWm9uZUluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZXJzLFxuICAgICAgcGFyZW50OiB0aGlzLnBsYXRmb3JtLmluamVjdG9yLFxuICAgICAgbmFtZTogdGhpcy5fbW9kdWxlRmFjdG9yeS5tb2R1bGVUeXBlLm5hbWVcbiAgICB9KTtcbiAgICB0aGlzLl9tb2R1bGVSZWYgPSB0aGlzLl9tb2R1bGVGYWN0b3J5LmNyZWF0ZShuZ1pvbmVJbmplY3Rvcik7XG4gICAgLy8gQXBwbGljYXRpb25Jbml0U3RhdHVzLnJ1bkluaXRpYWxpemVycygpIGlzIG1hcmtlZCBAaW50ZXJuYWwgdG8gY29yZS4gU28gY2FzdGluZyB0byBhbnlcbiAgICAvLyBiZWZvcmUgYWNjZXNzaW5nIGl0LlxuICAgICh0aGlzLl9tb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uSW5pdFN0YXR1cykgYXMgYW55KS5ydW5Jbml0aWFsaXplcnMoKTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29tcGlsZXJBbmRNb2R1bGUoKTogVHlwZTxhbnk+IHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSB0aGlzLl9wcm92aWRlcnMuY29uY2F0KFt7cHJvdmlkZTogVGVzdEJlZCwgdXNlVmFsdWU6IHRoaXN9XSk7XG4gICAgY29uc3QgZGVjbGFyYXRpb25zID1cbiAgICAgICAgWy4uLnRoaXMuX2RlY2xhcmF0aW9ucywgLi4udGhpcy5fdGVtcGxhdGVPdmVycmlkZXMubWFwKGVudHJ5ID0+IGVudHJ5LnRlbXBsYXRlT2YpXTtcblxuICAgIGNvbnN0IHJvb3RTY29wZUltcG9ydHMgPSBbXTtcbiAgICBjb25zdCByb290UHJvdmlkZXJPdmVycmlkZXMgPSB0aGlzLl9yb290UHJvdmlkZXJPdmVycmlkZXM7XG4gICAgaWYgKHRoaXMuX2lzUm9vdCkge1xuICAgICAgQE5nTW9kdWxlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgLi4ucm9vdFByb3ZpZGVyT3ZlcnJpZGVzLFxuICAgICAgICBdLFxuICAgICAgICBqaXQ6IHRydWUsXG4gICAgICB9KVxuICAgICAgY2xhc3MgUm9vdFNjb3BlTW9kdWxlIHtcbiAgICAgIH1cbiAgICAgIHJvb3RTY29wZUltcG9ydHMucHVzaChSb290U2NvcGVNb2R1bGUpO1xuICAgIH1cbiAgICBwcm92aWRlcnMucHVzaCh7cHJvdmlkZTogQVBQX1JPT1QsIHVzZVZhbHVlOiB0aGlzLl9pc1Jvb3R9KTtcblxuICAgIGNvbnN0IGltcG9ydHMgPSBbcm9vdFNjb3BlSW1wb3J0cywgdGhpcy5uZ01vZHVsZSwgdGhpcy5faW1wb3J0c107XG4gICAgY29uc3Qgc2NoZW1hcyA9IHRoaXMuX3NjaGVtYXM7XG5cbiAgICBATmdNb2R1bGUoe3Byb3ZpZGVycywgZGVjbGFyYXRpb25zLCBpbXBvcnRzLCBzY2hlbWFzLCBqaXQ6IHRydWV9KVxuICAgIGNsYXNzIER5bmFtaWNUZXN0TW9kdWxlIHtcbiAgICB9XG5cbiAgICBjb25zdCBjb21waWxlckZhY3Rvcnk6IFRlc3RpbmdDb21waWxlckZhY3RvcnkgPVxuICAgICAgICB0aGlzLnBsYXRmb3JtLmluamVjdG9yLmdldChUZXN0aW5nQ29tcGlsZXJGYWN0b3J5KTtcbiAgICB0aGlzLl9jb21waWxlciA9IGNvbXBpbGVyRmFjdG9yeS5jcmVhdGVUZXN0aW5nQ29tcGlsZXIodGhpcy5fY29tcGlsZXJPcHRpb25zKTtcbiAgICBmb3IgKGNvbnN0IHN1bW1hcnkgb2YgW3RoaXMuX3Rlc3RFbnZBb3RTdW1tYXJpZXMsIC4uLnRoaXMuX2FvdFN1bW1hcmllc10pIHtcbiAgICAgIHRoaXMuX2NvbXBpbGVyLmxvYWRBb3RTdW1tYXJpZXMoc3VtbWFyeSk7XG4gICAgfVxuICAgIHRoaXMuX21vZHVsZU92ZXJyaWRlcy5mb3JFYWNoKChlbnRyeSkgPT4gdGhpcy5fY29tcGlsZXIub3ZlcnJpZGVNb2R1bGUoZW50cnlbMF0sIGVudHJ5WzFdKSk7XG4gICAgdGhpcy5fY29tcG9uZW50T3ZlcnJpZGVzLmZvckVhY2goXG4gICAgICAgIChlbnRyeSkgPT4gdGhpcy5fY29tcGlsZXIub3ZlcnJpZGVDb21wb25lbnQoZW50cnlbMF0sIGVudHJ5WzFdKSk7XG4gICAgdGhpcy5fZGlyZWN0aXZlT3ZlcnJpZGVzLmZvckVhY2goXG4gICAgICAgIChlbnRyeSkgPT4gdGhpcy5fY29tcGlsZXIub3ZlcnJpZGVEaXJlY3RpdmUoZW50cnlbMF0sIGVudHJ5WzFdKSk7XG4gICAgdGhpcy5fcGlwZU92ZXJyaWRlcy5mb3JFYWNoKChlbnRyeSkgPT4gdGhpcy5fY29tcGlsZXIub3ZlcnJpZGVQaXBlKGVudHJ5WzBdLCBlbnRyeVsxXSkpO1xuICAgIHJldHVybiBEeW5hbWljVGVzdE1vZHVsZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Fzc2VydE5vdEluc3RhbnRpYXRlZChtZXRob2ROYW1lOiBzdHJpbmcsIG1ldGhvZERlc2NyaXB0aW9uOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5faW5zdGFudGlhdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENhbm5vdCAke21ldGhvZERlc2NyaXB0aW9ufSB3aGVuIHRoZSB0ZXN0IG1vZHVsZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbnRpYXRlZC4gYCArXG4gICAgICAgICAgYE1ha2Ugc3VyZSB5b3UgYXJlIG5vdCB1c2luZyBcXGBpbmplY3RcXGAgYmVmb3JlIFxcYCR7bWV0aG9kTmFtZX1cXGAuYCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0PFQ+KHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IGFueTtcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIGZyb20gdjguMC4wIHVzZSBUeXBlPFQ+IG9yIEluamVjdGlvblRva2VuPFQ+XG4gICAqL1xuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueTtcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU6IGFueSA9IEluamVjdG9yLlRIUk9XX0lGX05PVF9GT1VORCxcbiAgICAgIGZsYWdzOiBJbmplY3RGbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBhbnkge1xuICAgIHRoaXMuX2luaXRJZk5lZWRlZCgpO1xuICAgIGlmICh0b2tlbiA9PT0gVGVzdEJlZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIFRlc3RzIGNhbiBpbmplY3QgdGhpbmdzIGZyb20gdGhlIG5nIG1vZHVsZSBhbmQgZnJvbSB0aGUgY29tcGlsZXIsXG4gICAgLy8gYnV0IHRoZSBuZyBtb2R1bGUgY2FuJ3QgaW5qZWN0IHRoaW5ncyBmcm9tIHRoZSBjb21waWxlciBhbmQgdmljZSB2ZXJzYS5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9tb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KHRva2VuLCBVTkRFRklORUQsIGZsYWdzKTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBVTkRFRklORUQgPyB0aGlzLl9jb21waWxlci5pbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUsIGZsYWdzKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGV4ZWN1dGUodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICB0aGlzLl9pbml0SWZOZWVkZWQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB0b2tlbnMubWFwKHQgPT4gdGhpcy5nZXQodCkpO1xuICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBwYXJhbXMpO1xuICB9XG5cbiAgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZCB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90SW5zdGFudGlhdGVkKCdvdmVycmlkZU1vZHVsZScsICdvdmVycmlkZSBtb2R1bGUgbWV0YWRhdGEnKTtcbiAgICB0aGlzLl9tb2R1bGVPdmVycmlkZXMucHVzaChbbmdNb2R1bGUsIG92ZXJyaWRlXSk7XG4gIH1cblxuICBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRoaXMuX2Fzc2VydE5vdEluc3RhbnRpYXRlZCgnb3ZlcnJpZGVDb21wb25lbnQnLCAnb3ZlcnJpZGUgY29tcG9uZW50IG1ldGFkYXRhJyk7XG4gICAgdGhpcy5fY29tcG9uZW50T3ZlcnJpZGVzLnB1c2goW2NvbXBvbmVudCwgb3ZlcnJpZGVdKTtcbiAgfVxuXG4gIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZCB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90SW5zdGFudGlhdGVkKCdvdmVycmlkZURpcmVjdGl2ZScsICdvdmVycmlkZSBkaXJlY3RpdmUgbWV0YWRhdGEnKTtcbiAgICB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMucHVzaChbZGlyZWN0aXZlLCBvdmVycmlkZV0pO1xuICB9XG5cbiAgb3ZlcnJpZGVQaXBlKHBpcGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT4pOiB2b2lkIHtcbiAgICB0aGlzLl9hc3NlcnROb3RJbnN0YW50aWF0ZWQoJ292ZXJyaWRlUGlwZScsICdvdmVycmlkZSBwaXBlIG1ldGFkYXRhJyk7XG4gICAgdGhpcy5fcGlwZU92ZXJyaWRlcy5wdXNoKFtwaXBlLCBvdmVycmlkZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgYWxsIHByb3ZpZGVycyBmb3IgdGhlIGdpdmVuIHRva2VuIHdpdGggdGhlIGdpdmVuIHByb3ZpZGVyIGRlZmluaXRpb24uXG4gICAqL1xuICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XG4gICAgdXNlRmFjdG9yeTogRnVuY3Rpb24sXG4gICAgZGVwczogYW55W10sXG4gIH0pOiB2b2lkO1xuICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdm9pZDtcbiAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge3VzZUZhY3Rvcnk/OiBGdW5jdGlvbiwgdXNlVmFsdWU/OiBhbnksIGRlcHM/OiBhbnlbXX0pOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5vdmVycmlkZVByb3ZpZGVySW1wbCh0b2tlbiwgcHJvdmlkZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgYWxsIHByb3ZpZGVycyBmb3IgdGhlIGdpdmVuIHRva2VuIHdpdGggdGhlIGdpdmVuIHByb3ZpZGVyIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIGFzIGl0IG1ha2VzIGFsbCBOZ01vZHVsZXMgbGF6eS4gSW50cm9kdWNlZCBvbmx5IGZvciBtaWdyYXRpbmcgb2ZmIG9mIGl0LlxuICAgKi9cbiAgZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcbiAgICB1c2VGYWN0b3J5OiBGdW5jdGlvbixcbiAgICBkZXBzOiBhbnlbXSxcbiAgfSk6IHZvaWQ7XG4gIGRlcHJlY2F0ZWRPdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdm9pZDtcbiAgZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIoXG4gICAgICB0b2tlbjogYW55LCBwcm92aWRlcjoge3VzZUZhY3Rvcnk/OiBGdW5jdGlvbiwgdXNlVmFsdWU/OiBhbnksIGRlcHM/OiBhbnlbXX0pOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJyaWRlUHJvdmlkZXJJbXBsKHRva2VuLCBwcm92aWRlciwgLyogZGVwcmVjYXRlZCAqLyB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb3ZlcnJpZGVQcm92aWRlckltcGwoXG4gICAgICB0b2tlbjogYW55LCBwcm92aWRlcjoge1xuICAgICAgICB1c2VGYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgICAgIHVzZVZhbHVlPzogYW55LFxuICAgICAgICBkZXBzPzogYW55W10sXG4gICAgICB9LFxuICAgICAgZGVwcmVjYXRlZCA9IGZhbHNlKTogdm9pZCB7XG4gICAgbGV0IGRlZjogSW5qZWN0YWJsZURlZjxhbnk+fG51bGwgPSBudWxsO1xuICAgIGlmICh0eXBlb2YgdG9rZW4gIT09ICdzdHJpbmcnICYmIChkZWYgPSBnZXRJbmplY3RhYmxlRGVmKHRva2VuKSkgJiYgZGVmLnByb3ZpZGVkSW4gPT09ICdyb290Jykge1xuICAgICAgaWYgKHByb3ZpZGVyLnVzZUZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5fcm9vdFByb3ZpZGVyT3ZlcnJpZGVzLnB1c2goXG4gICAgICAgICAgICB7cHJvdmlkZTogdG9rZW4sIHVzZUZhY3Rvcnk6IHByb3ZpZGVyLnVzZUZhY3RvcnksIGRlcHM6IHByb3ZpZGVyLmRlcHMgfHwgW119KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Jvb3RQcm92aWRlck92ZXJyaWRlcy5wdXNoKHtwcm92aWRlOiB0b2tlbiwgdXNlVmFsdWU6IHByb3ZpZGVyLnVzZVZhbHVlfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBmbGFnczogTm9kZUZsYWdzID0gMDtcbiAgICBsZXQgdmFsdWU6IGFueTtcbiAgICBpZiAocHJvdmlkZXIudXNlRmFjdG9yeSkge1xuICAgICAgZmxhZ3MgfD0gTm9kZUZsYWdzLlR5cGVGYWN0b3J5UHJvdmlkZXI7XG4gICAgICB2YWx1ZSA9IHByb3ZpZGVyLnVzZUZhY3Rvcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsYWdzIHw9IE5vZGVGbGFncy5UeXBlVmFsdWVQcm92aWRlcjtcbiAgICAgIHZhbHVlID0gcHJvdmlkZXIudXNlVmFsdWU7XG4gICAgfVxuICAgIGNvbnN0IGRlcHMgPSAocHJvdmlkZXIuZGVwcyB8fCBbXSkubWFwKChkZXApID0+IHtcbiAgICAgIGxldCBkZXBGbGFnczogRGVwRmxhZ3MgPSBEZXBGbGFncy5Ob25lO1xuICAgICAgbGV0IGRlcFRva2VuOiBhbnk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkZXApKSB7XG4gICAgICAgIGRlcC5mb3JFYWNoKChlbnRyeTogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5IGluc3RhbmNlb2YgT3B0aW9uYWwpIHtcbiAgICAgICAgICAgIGRlcEZsYWdzIHw9IERlcEZsYWdzLk9wdGlvbmFsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkgaW5zdGFuY2VvZiBTa2lwU2VsZikge1xuICAgICAgICAgICAgZGVwRmxhZ3MgfD0gRGVwRmxhZ3MuU2tpcFNlbGY7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlcFRva2VuID0gZW50cnk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlcFRva2VuID0gZGVwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtkZXBGbGFncywgZGVwVG9rZW5dO1xuICAgIH0pO1xuICAgIG92ZXJyaWRlUHJvdmlkZXIoe3Rva2VuLCBmbGFncywgZGVwcywgdmFsdWUsIGRlcHJlY2F0ZWRCZWhhdmlvcjogZGVwcmVjYXRlZH0pO1xuICB9XG5cbiAgb3ZlcnJpZGVUZW1wbGF0ZVVzaW5nVGVzdGluZ01vZHVsZShjb21wb25lbnQ6IFR5cGU8YW55PiwgdGVtcGxhdGU6IHN0cmluZykge1xuICAgIHRoaXMuX2Fzc2VydE5vdEluc3RhbnRpYXRlZCgnb3ZlcnJpZGVUZW1wbGF0ZVVzaW5nVGVzdGluZ01vZHVsZScsICdvdmVycmlkZSB0ZW1wbGF0ZScpO1xuXG4gICAgQENvbXBvbmVudCh7c2VsZWN0b3I6ICdlbXB0eScsIHRlbXBsYXRlLCBqaXQ6IHRydWV9KVxuICAgIGNsYXNzIE92ZXJyaWRlQ29tcG9uZW50IHtcbiAgICB9XG5cbiAgICB0aGlzLl90ZW1wbGF0ZU92ZXJyaWRlcy5wdXNoKHtjb21wb25lbnQsIHRlbXBsYXRlT2Y6IE92ZXJyaWRlQ29tcG9uZW50fSk7XG4gIH1cblxuICBjcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPiB7XG4gICAgdGhpcy5faW5pdElmTmVlZGVkKCk7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuX2NvbXBpbGVyLmdldENvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcblxuICAgIGlmICghY29tcG9uZW50RmFjdG9yeSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDYW5ub3QgY3JlYXRlIHRoZSBjb21wb25lbnQgJHtzdHJpbmdpZnkoY29tcG9uZW50KX0gYXMgaXQgd2FzIG5vdCBpbXBvcnRlZCBpbnRvIHRoZSB0ZXN0aW5nIG1vZHVsZSFgKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBEb24ndCBjYXN0IGFzIGBhbnlgLCBwcm9wZXIgdHlwZSBpcyBib29sZWFuW11cbiAgICBjb25zdCBub05nWm9uZSA9IHRoaXMuZ2V0KENvbXBvbmVudEZpeHR1cmVOb05nWm9uZSBhcyBhbnksIGZhbHNlKTtcbiAgICAvLyBUT0RPOiBEb24ndCBjYXN0IGFzIGBhbnlgLCBwcm9wZXIgdHlwZSBpcyBib29sZWFuW11cbiAgICBjb25zdCBhdXRvRGV0ZWN0OiBib29sZWFuID0gdGhpcy5nZXQoQ29tcG9uZW50Rml4dHVyZUF1dG9EZXRlY3QgYXMgYW55LCBmYWxzZSk7XG4gICAgY29uc3Qgbmdab25lOiBOZ1pvbmV8bnVsbCA9IG5vTmdab25lID8gbnVsbCA6IHRoaXMuZ2V0KE5nWm9uZSBhcyBUeXBlPE5nWm9uZXxudWxsPiwgbnVsbCk7XG4gICAgY29uc3QgdGVzdENvbXBvbmVudFJlbmRlcmVyOiBUZXN0Q29tcG9uZW50UmVuZGVyZXIgPSB0aGlzLmdldChUZXN0Q29tcG9uZW50UmVuZGVyZXIpO1xuICAgIGNvbnN0IHJvb3RFbElkID0gYHJvb3Qke19uZXh0Um9vdEVsZW1lbnRJZCsrfWA7XG4gICAgdGVzdENvbXBvbmVudFJlbmRlcmVyLmluc2VydFJvb3RFbGVtZW50KHJvb3RFbElkKTtcblxuICAgIGNvbnN0IGluaXRDb21wb25lbnQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPVxuICAgICAgICAgIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEluamVjdG9yLk5VTEwsIFtdLCBgIyR7cm9vdEVsSWR9YCwgdGhpcy5fbW9kdWxlUmVmKTtcbiAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50Rml4dHVyZTxUPihjb21wb25lbnRSZWYsIG5nWm9uZSwgYXV0b0RldGVjdCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZpeHR1cmUgPSAhbmdab25lID8gaW5pdENvbXBvbmVudCgpIDogbmdab25lLnJ1bihpbml0Q29tcG9uZW50KTtcbiAgICB0aGlzLl9hY3RpdmVGaXh0dXJlcy5wdXNoKGZpeHR1cmUpO1xuICAgIHJldHVybiBmaXh0dXJlO1xuICB9XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIGFuZCBpbml0aWFsaXplcyBlbnZpcm9ubWVudCBmb3IgdW5pdCB0ZXN0aW5nIGFuZCBwcm92aWRlcyBtZXRob2RzIGZvclxuICogY3JlYXRpbmcgY29tcG9uZW50cyBhbmQgc2VydmljZXMgaW4gdW5pdCB0ZXN0cy5cbiAqXG4gKiBgVGVzdEJlZGAgaXMgdGhlIHByaW1hcnkgYXBpIGZvciB3cml0aW5nIHVuaXQgdGVzdHMgZm9yIEFuZ3VsYXIgYXBwbGljYXRpb25zIGFuZCBsaWJyYXJpZXMuXG4gKlxuICogTm90ZTogVXNlIGBUZXN0QmVkYCBpbiB0ZXN0cy4gSXQgd2lsbCBiZSBzZXQgdG8gZWl0aGVyIGBUZXN0QmVkVmlld0VuZ2luZWAgb3IgYFRlc3RCZWRSZW5kZXIzYFxuICogYWNjb3JkaW5nIHRvIHRoZSBjb21waWxlciB1c2VkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFRlc3RCZWQ6IFRlc3RCZWRTdGF0aWMgPVxuICAgIGl2eUVuYWJsZWQgPyBUZXN0QmVkUmVuZGVyMyBhcyBhbnkgYXMgVGVzdEJlZFN0YXRpYyA6IFRlc3RCZWRWaWV3RW5naW5lIGFzIGFueSBhcyBUZXN0QmVkU3RhdGljO1xuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGV0b24gb2YgdGhlIGFwcGxpY2FibGUgYFRlc3RCZWRgLlxuICpcbiAqIEl0IHdpbGwgYmUgZWl0aGVyIGFuIGluc3RhbmNlIG9mIGBUZXN0QmVkVmlld0VuZ2luZWAgb3IgYFRlc3RCZWRSZW5kZXIzYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUZXN0QmVkOiAoKSA9PiBUZXN0QmVkID0gaXZ5RW5hYmxlZCA/IF9nZXRUZXN0QmVkUmVuZGVyMyA6IF9nZXRUZXN0QmVkVmlld0VuZ2luZTtcblxubGV0IHRlc3RCZWQ6IFRlc3RCZWRWaWV3RW5naW5lO1xuXG5mdW5jdGlvbiBfZ2V0VGVzdEJlZFZpZXdFbmdpbmUoKTogVGVzdEJlZFZpZXdFbmdpbmUge1xuICByZXR1cm4gdGVzdEJlZCA9IHRlc3RCZWQgfHwgbmV3IFRlc3RCZWRWaWV3RW5naW5lKCk7XG59XG5cbi8qKlxuICogQWxsb3dzIGluamVjdGluZyBkZXBlbmRlbmNpZXMgaW4gYGJlZm9yZUVhY2goKWAgYW5kIGBpdCgpYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogYmVmb3JlRWFjaChpbmplY3QoW0RlcGVuZGVuY3ksIEFDbGFzc10sIChkZXAsIG9iamVjdCkgPT4ge1xuICogICAvLyBzb21lIGNvZGUgdGhhdCB1c2VzIGBkZXBgIGFuZCBgb2JqZWN0YFxuICogICAvLyAuLi5cbiAqIH0pKTtcbiAqXG4gKiBpdCgnLi4uJywgaW5qZWN0KFtBQ2xhc3NdLCAob2JqZWN0KSA9PiB7XG4gKiAgIG9iamVjdC5kb1NvbWV0aGluZygpO1xuICogICBleHBlY3QoLi4uKTtcbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBOb3RlczpcbiAqIC0gaW5qZWN0IGlzIGN1cnJlbnRseSBhIGZ1bmN0aW9uIGJlY2F1c2Ugb2Ygc29tZSBUcmFjZXVyIGxpbWl0YXRpb24gdGhlIHN5bnRheCBzaG91bGRcbiAqIGV2ZW50dWFsbHlcbiAqICAgYmVjb21lcyBgaXQoJy4uLicsIEBJbmplY3QgKG9iamVjdDogQUNsYXNzLCBhc3luYzogQXN5bmNUZXN0Q29tcGxldGVyKSA9PiB7IC4uLiB9KTtgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6ICgpID0+IGFueSB7XG4gIGNvbnN0IHRlc3RCZWQgPSBnZXRUZXN0QmVkKCk7XG4gIGlmICh0b2tlbnMuaW5kZXhPZihBc3luY1Rlc3RDb21wbGV0ZXIpID49IDApIHtcbiAgICAvLyBOb3QgdXNpbmcgYW4gYXJyb3cgZnVuY3Rpb24gdG8gcHJlc2VydmUgY29udGV4dCBwYXNzZWQgZnJvbSBjYWxsIHNpdGVcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBSZXR1cm4gYW4gYXN5bmMgdGVzdCBtZXRob2QgdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBpZiBBc3luY1Rlc3RDb21wbGV0ZXIgaXMgb25lIG9mXG4gICAgICAvLyB0aGUgaW5qZWN0ZWQgdG9rZW5zLlxuICAgICAgcmV0dXJuIHRlc3RCZWQuY29tcGlsZUNvbXBvbmVudHMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcGxldGVyOiBBc3luY1Rlc3RDb21wbGV0ZXIgPSB0ZXN0QmVkLmdldChBc3luY1Rlc3RDb21wbGV0ZXIpO1xuICAgICAgICB0ZXN0QmVkLmV4ZWN1dGUodG9rZW5zLCBmbiwgdGhpcyk7XG4gICAgICAgIHJldHVybiBjb21wbGV0ZXIucHJvbWlzZTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGVzdEJlZC5leGVjdXRlKHRva2VucywgZm4sIHRoaXMpOyB9O1xuICB9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY2xhc3MgSW5qZWN0U2V0dXBXcmFwcGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbW9kdWxlRGVmOiAoKSA9PiBUZXN0TW9kdWxlTWV0YWRhdGEpIHt9XG5cbiAgcHJpdmF0ZSBfYWRkTW9kdWxlKCkge1xuICAgIGNvbnN0IG1vZHVsZURlZiA9IHRoaXMuX21vZHVsZURlZigpO1xuICAgIGlmIChtb2R1bGVEZWYpIHtcbiAgICAgIGdldFRlc3RCZWQoKS5jb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZik7XG4gICAgfVxuICB9XG5cbiAgaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6ICgpID0+IGFueSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fYWRkTW9kdWxlKCk7XG4gICAgICByZXR1cm4gaW5qZWN0KHRva2VucywgZm4pLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEpOiBJbmplY3RTZXR1cFdyYXBwZXI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aE1vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSwgZm46IEZ1bmN0aW9uKTogKCkgPT4gYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEsIGZuPzogRnVuY3Rpb24gfCBudWxsKTogKCgpID0+IGFueSl8XG4gICAgSW5qZWN0U2V0dXBXcmFwcGVyIHtcbiAgaWYgKGZuKSB7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgdGVzdEJlZCA9IGdldFRlc3RCZWQoKTtcbiAgICAgIGlmIChtb2R1bGVEZWYpIHtcbiAgICAgICAgdGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gbmV3IEluamVjdFNldHVwV3JhcHBlcigoKSA9PiBtb2R1bGVEZWYpO1xufVxuIl19