/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ApplicationInitStatus, Component, InjectionToken, Injector, NgModule, NgZone, Optional, SkipSelf, ɵAPP_ROOT as APP_ROOT, ɵclearOverrides as clearOverrides, ɵoverrideComponentView as overrideComponentView, ɵoverrideProvider as overrideProvider, ɵstringify as stringify } from '@angular/core';
import { AsyncTestCompleter } from './async_test_completer';
import { ComponentFixture } from './component_fixture';
import { TestingCompilerFactory } from './test_compiler';
var UNDEFINED = new Object();
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
var /**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
TestComponentRenderer = /** @class */ (function () {
    function TestComponentRenderer() {
    }
    TestComponentRenderer.prototype.insertRootElement = function (rootElementId) { };
    return TestComponentRenderer;
}());
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
export { TestComponentRenderer };
var _nextRootElementId = 0;
/**
 * @experimental
 */
export var ComponentFixtureAutoDetect = new InjectionToken('ComponentFixtureAutoDetect');
/**
 * @experimental
 */
export var ComponentFixtureNoNgZone = new InjectionToken('ComponentFixtureNoNgZone');
/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 *
 */
var /**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 *
 */
TestBed = /** @class */ (function () {
    function TestBed() {
        this._instantiated = false;
        this._compiler = null;
        this._moduleRef = null;
        this._moduleFactory = null;
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
        this._testEnvAotSummaries = function () { return []; };
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this.platform = null;
        this.ngModule = null;
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
     * '@angular/<platform_name>/testing'.
     *
     * @experimental
     */
    /**
       * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
       * angular module. These are common to every test in the suite.
       *
       * This may only be called once, to set up the common providers for the current test
       * suite on the current platform. If you absolutely need to change the providers,
       * first use `resetTestEnvironment`.
       *
       * Test modules and platforms for individual platforms are available from
       * '@angular/<platform_name>/testing'.
       *
       * @experimental
       */
    TestBed.initTestEnvironment = /**
       * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
       * angular module. These are common to every test in the suite.
       *
       * This may only be called once, to set up the common providers for the current test
       * suite on the current platform. If you absolutely need to change the providers,
       * first use `resetTestEnvironment`.
       *
       * Test modules and platforms for individual platforms are available from
       * '@angular/<platform_name>/testing'.
       *
       * @experimental
       */
    function (ngModule, platform, aotSummaries) {
        var testBed = getTestBed();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    };
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    /**
       * Reset the providers for the test injector.
       *
       * @experimental
       */
    TestBed.resetTestEnvironment = /**
       * Reset the providers for the test injector.
       *
       * @experimental
       */
    function () { getTestBed().resetTestEnvironment(); };
    TestBed.resetTestingModule = function () {
        getTestBed().resetTestingModule();
        return TestBed;
    };
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    /**
       * Allows overriding default compiler providers and settings
       * which are defined in test_injector.js
       */
    TestBed.configureCompiler = /**
       * Allows overriding default compiler providers and settings
       * which are defined in test_injector.js
       */
    function (config) {
        getTestBed().configureCompiler(config);
        return TestBed;
    };
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    /**
       * Allows overriding default providers, directives, pipes, modules of the test injector,
       * which are defined in test_injector.js
       */
    TestBed.configureTestingModule = /**
       * Allows overriding default providers, directives, pipes, modules of the test injector,
       * which are defined in test_injector.js
       */
    function (moduleDef) {
        getTestBed().configureTestingModule(moduleDef);
        return TestBed;
    };
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    /**
       * Compile components with a `templateUrl` for the test's NgModule.
       * It is necessary to call this function
       * as fetching urls is asynchronous.
       */
    TestBed.compileComponents = /**
       * Compile components with a `templateUrl` for the test's NgModule.
       * It is necessary to call this function
       * as fetching urls is asynchronous.
       */
    function () { return getTestBed().compileComponents(); };
    TestBed.overrideModule = function (ngModule, override) {
        getTestBed().overrideModule(ngModule, override);
        return TestBed;
    };
    TestBed.overrideComponent = function (component, override) {
        getTestBed().overrideComponent(component, override);
        return TestBed;
    };
    TestBed.overrideDirective = function (directive, override) {
        getTestBed().overrideDirective(directive, override);
        return TestBed;
    };
    TestBed.overridePipe = function (pipe, override) {
        getTestBed().overridePipe(pipe, override);
        return TestBed;
    };
    TestBed.overrideTemplate = function (component, template) {
        getTestBed().overrideComponent(component, { set: { template: template, templateUrl: (null) } });
        return TestBed;
    };
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    /**
       * Overrides the template of the given component, compiling the template
       * in the context of the TestingModule.
       *
       * Note: This works for JIT and AOTed components as well.
       */
    TestBed.overrideTemplateUsingTestingModule = /**
       * Overrides the template of the given component, compiling the template
       * in the context of the TestingModule.
       *
       * Note: This works for JIT and AOTed components as well.
       */
    function (component, template) {
        getTestBed().overrideTemplateUsingTestingModule(component, template);
        return TestBed;
    };
    TestBed.overrideProvider = function (token, provider) {
        getTestBed().overrideProvider(token, provider);
        return TestBed;
    };
    TestBed.deprecatedOverrideProvider = function (token, provider) {
        getTestBed().deprecatedOverrideProvider(token, provider);
        return TestBed;
    };
    TestBed.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        return getTestBed().get(token, notFoundValue);
    };
    TestBed.createComponent = function (component) {
        return getTestBed().createComponent(component);
    };
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @experimental
     */
    /**
       * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
       * angular module. These are common to every test in the suite.
       *
       * This may only be called once, to set up the common providers for the current test
       * suite on the current platform. If you absolutely need to change the providers,
       * first use `resetTestEnvironment`.
       *
       * Test modules and platforms for individual platforms are available from
       * '@angular/<platform_name>/testing'.
       *
       * @experimental
       */
    TestBed.prototype.initTestEnvironment = /**
       * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
       * angular module. These are common to every test in the suite.
       *
       * This may only be called once, to set up the common providers for the current test
       * suite on the current platform. If you absolutely need to change the providers,
       * first use `resetTestEnvironment`.
       *
       * Test modules and platforms for individual platforms are available from
       * '@angular/<platform_name>/testing'.
       *
       * @experimental
       */
    function (ngModule, platform, aotSummaries) {
        if (this.platform || this.ngModule) {
            throw new Error('Cannot set base providers because it has already been called');
        }
        this.platform = platform;
        this.ngModule = ngModule;
        if (aotSummaries) {
            this._testEnvAotSummaries = aotSummaries;
        }
    };
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    /**
       * Reset the providers for the test injector.
       *
       * @experimental
       */
    TestBed.prototype.resetTestEnvironment = /**
       * Reset the providers for the test injector.
       *
       * @experimental
       */
    function () {
        this.resetTestingModule();
        this.platform = (null);
        this.ngModule = (null);
        this._testEnvAotSummaries = function () { return []; };
    };
    TestBed.prototype.resetTestingModule = function () {
        clearOverrides();
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._compiler = (null);
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this._moduleRef = (null);
        this._moduleFactory = (null);
        this._compilerOptions = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._instantiated = false;
        this._activeFixtures.forEach(function (fixture) {
            try {
                fixture.destroy();
            }
            catch (e) {
                console.error('Error during cleanup of component', {
                    component: fixture.componentInstance,
                    stacktrace: e,
                });
            }
        });
        this._activeFixtures = [];
    };
    TestBed.prototype.configureCompiler = function (config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    };
    TestBed.prototype.configureTestingModule = function (moduleDef) {
        this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
        if (moduleDef.providers) {
            (_a = this._providers).push.apply(_a, tslib_1.__spread(moduleDef.providers));
        }
        if (moduleDef.declarations) {
            (_b = this._declarations).push.apply(_b, tslib_1.__spread(moduleDef.declarations));
        }
        if (moduleDef.imports) {
            (_c = this._imports).push.apply(_c, tslib_1.__spread(moduleDef.imports));
        }
        if (moduleDef.schemas) {
            (_d = this._schemas).push.apply(_d, tslib_1.__spread(moduleDef.schemas));
        }
        if (moduleDef.aotSummaries) {
            this._aotSummaries.push(moduleDef.aotSummaries);
        }
        var _a, _b, _c, _d;
    };
    TestBed.prototype.compileComponents = function () {
        var _this = this;
        if (this._moduleFactory || this._instantiated) {
            return Promise.resolve(null);
        }
        var moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then(function (moduleAndComponentFactories) {
            _this._moduleFactory = moduleAndComponentFactories.ngModuleFactory;
        });
    };
    TestBed.prototype._initIfNeeded = function () {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleFactory) {
            try {
                var moduleType = this._createCompilerAndModule();
                this._moduleFactory =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType).ngModuleFactory;
            }
            catch (e) {
                var errorCompType = this._compiler.getComponentFromError(e);
                if (errorCompType) {
                    throw new Error("This test module uses the component " + stringify(errorCompType) + " which is using a \"templateUrl\" or \"styleUrls\", but they were never compiled. " +
                        "Please call \"TestBed.compileComponents\" before your test.");
                }
                else {
                    throw e;
                }
            }
        }
        try {
            for (var _a = tslib_1.__values(this._templateOverrides), _b = _a.next(); !_b.done; _b = _a.next()) {
                var _c = _b.value, component = _c.component, templateOf = _c.templateOf;
                var compFactory = this._compiler.getComponentFactory(templateOf);
                overrideComponentView(component, compFactory);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var ngZone = new NgZone({ enableLongStackTrace: true });
        var providers = [{ provide: NgZone, useValue: ngZone }];
        var ngZoneInjector = Injector.create({
            providers: providers,
            parent: this.platform.injector,
            name: this._moduleFactory.moduleType.name
        });
        this._moduleRef = this._moduleFactory.create(ngZoneInjector);
        // ApplicationInitStatus.runInitializers() is marked @internal to core. So casting to any
        // before accessing it.
        // ApplicationInitStatus.runInitializers() is marked @internal to core. So casting to any
        // before accessing it.
        this._moduleRef.injector.get(ApplicationInitStatus).runInitializers();
        this._instantiated = true;
        var e_1, _d;
    };
    TestBed.prototype._createCompilerAndModule = function () {
        var _this = this;
        var providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        var declarations = tslib_1.__spread(this._declarations, this._templateOverrides.map(function (entry) { return entry.templateOf; }));
        var rootScopeImports = [];
        var rootProviderOverrides = this._rootProviderOverrides;
        if (this._isRoot) {
            var RootScopeModule = /** @class */ (function () {
                function RootScopeModule() {
                }
                RootScopeModule.decorators = [
                    { type: NgModule, args: [{
                                providers: tslib_1.__spread(rootProviderOverrides),
                            },] },
                ];
                return RootScopeModule;
            }());
            rootScopeImports.push(RootScopeModule);
        }
        providers.push({ provide: APP_ROOT, useValue: this._isRoot });
        var imports = [rootScopeImports, this.ngModule, this._imports];
        var schemas = this._schemas;
        var DynamicTestModule = /** @class */ (function () {
            function DynamicTestModule() {
            }
            DynamicTestModule.decorators = [
                { type: NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas },] },
            ];
            return DynamicTestModule;
        }());
        var compilerFactory = this.platform.injector.get(TestingCompilerFactory);
        this._compiler = compilerFactory.createTestingCompiler(this._compilerOptions);
        try {
            for (var _a = tslib_1.__values(tslib_1.__spread([this._testEnvAotSummaries], this._aotSummaries)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var summary = _b.value;
                this._compiler.loadAotSummaries(summary);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._moduleOverrides.forEach(function (entry) { return _this._compiler.overrideModule(entry[0], entry[1]); });
        this._componentOverrides.forEach(function (entry) { return _this._compiler.overrideComponent(entry[0], entry[1]); });
        this._directiveOverrides.forEach(function (entry) { return _this._compiler.overrideDirective(entry[0], entry[1]); });
        this._pipeOverrides.forEach(function (entry) { return _this._compiler.overridePipe(entry[0], entry[1]); });
        return DynamicTestModule;
        var e_2, _c;
    };
    TestBed.prototype._assertNotInstantiated = function (methodName, methodDescription) {
        if (this._instantiated) {
            throw new Error("Cannot " + methodDescription + " when the test module has already been instantiated. " +
                ("Make sure you are not using `inject` before `" + methodName + "`."));
        }
    };
    TestBed.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = Injector.THROW_IF_NOT_FOUND; }
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        // Tests can inject things from the ng module and from the compiler,
        // but the ng module can't inject things from the compiler and vice versa.
        var result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    };
    TestBed.prototype.execute = function (tokens, fn, context) {
        var _this = this;
        this._initIfNeeded();
        var params = tokens.map(function (t) { return _this.get(t); });
        return fn.apply(context, params);
    };
    TestBed.prototype.overrideModule = function (ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    };
    TestBed.prototype.overrideComponent = function (component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    };
    TestBed.prototype.overrideDirective = function (directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    };
    TestBed.prototype.overridePipe = function (pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    };
    TestBed.prototype.overrideProvider = function (token, provider) {
        this.overrideProviderImpl(token, provider);
    };
    TestBed.prototype.deprecatedOverrideProvider = function (token, provider) {
        this.overrideProviderImpl(token, provider, /* deprecated */ /* deprecated */ true);
    };
    TestBed.prototype.overrideProviderImpl = function (token, provider, deprecated) {
        if (deprecated === void 0) { deprecated = false; }
        if (typeof token !== 'string' && token.ngInjectableDef &&
            token.ngInjectableDef.providedIn === 'root') {
            if (provider.useFactory) {
                this._rootProviderOverrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
            }
            else {
                this._rootProviderOverrides.push({ provide: token, useValue: provider.useValue });
            }
        }
        var flags = 0;
        var value;
        if (provider.useFactory) {
            flags |= 1024 /* TypeFactoryProvider */;
            value = provider.useFactory;
        }
        else {
            flags |= 256 /* TypeValueProvider */;
            value = provider.useValue;
        }
        var deps = (provider.deps || []).map(function (dep) {
            var depFlags = 0 /* None */;
            var depToken;
            if (Array.isArray(dep)) {
                dep.forEach(function (entry) {
                    if (entry instanceof Optional) {
                        depFlags |= 2 /* Optional */;
                    }
                    else if (entry instanceof SkipSelf) {
                        depFlags |= 1 /* SkipSelf */;
                    }
                    else {
                        depToken = entry;
                    }
                });
            }
            else {
                depToken = dep;
            }
            return [depFlags, depToken];
        });
        overrideProvider({ token: token, flags: flags, deps: deps, value: value, deprecatedBehavior: deprecated });
    };
    TestBed.prototype.overrideTemplateUsingTestingModule = function (component, template) {
        this._assertNotInstantiated('overrideTemplateUsingTestingModule', 'override template');
        var OverrideComponent = /** @class */ (function () {
            function OverrideComponent() {
            }
            OverrideComponent.decorators = [
                { type: Component, args: [{ selector: 'empty', template: template },] },
            ];
            return OverrideComponent;
        }());
        this._templateOverrides.push({ component: component, templateOf: OverrideComponent });
    };
    TestBed.prototype.createComponent = function (component) {
        var _this = this;
        this._initIfNeeded();
        var componentFactory = this._compiler.getComponentFactory(component);
        if (!componentFactory) {
            throw new Error("Cannot create the component " + stringify(component) + " as it was not imported into the testing module!");
        }
        var noNgZone = this.get(ComponentFixtureNoNgZone, false);
        var autoDetect = this.get(ComponentFixtureAutoDetect, false);
        var ngZone = noNgZone ? null : this.get(NgZone, null);
        var testComponentRenderer = this.get(TestComponentRenderer);
        var rootElId = "root" + _nextRootElementId++;
        testComponentRenderer.insertRootElement(rootElId);
        var initComponent = function () {
            var componentRef = componentFactory.create(Injector.NULL, [], "#" + rootElId, _this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        var fixture = !ngZone ? initComponent() : ngZone.run(initComponent);
        this._activeFixtures.push(fixture);
        return fixture;
    };
    return TestBed;
}());
/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 *
 */
export { TestBed };
var _testBed = (null);
/**
 * @experimental
 */
export function getTestBed() {
    return _testBed = _testBed || new TestBed();
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
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 *
 */
export function inject(tokens, fn) {
    var testBed = getTestBed();
    if (tokens.indexOf(AsyncTestCompleter) >= 0) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            var _this = this;
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of
            // the injected tokens.
            return testBed.compileComponents().then(function () {
                var completer = testBed.get(AsyncTestCompleter);
                testBed.execute(tokens, fn, _this);
                return completer.promise;
            });
        };
    }
    else {
        // Not using an arrow function to preserve context passed from call site
        return function () { return testBed.execute(tokens, fn, this); };
    }
}
/**
 * @experimental
 */
var /**
 * @experimental
 */
InjectSetupWrapper = /** @class */ (function () {
    function InjectSetupWrapper(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    InjectSetupWrapper.prototype._addModule = function () {
        var moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    };
    InjectSetupWrapper.prototype.inject = function (tokens, fn) {
        var self = this;
        // Not using an arrow function to preserve context passed from call site
        return function () {
            self._addModule();
            return inject(tokens, fn).call(this);
        };
    };
    return InjectSetupWrapper;
}());
/**
 * @experimental
 */
export { InjectSetupWrapper };
export function withModule(moduleDef, fn) {
    if (fn) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            var testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn.apply(this);
        };
    }
    return new InjectSetupWrapper(function () { return moduleDef; });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL3Rlc3RfYmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLHFCQUFxQixFQUFtQixTQUFTLEVBQWEsY0FBYyxFQUFFLFFBQVEsRUFBZ0MsUUFBUSxFQUFnQyxNQUFNLEVBQUUsUUFBUSxFQUErQyxRQUFRLEVBQXdCLFNBQVMsSUFBSSxRQUFRLEVBQWtELGVBQWUsSUFBSSxjQUFjLEVBQTJFLHNCQUFzQixJQUFJLHFCQUFxQixFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFFLFVBQVUsSUFBSSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOWpCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE9BQU8sRUFBa0Isc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4RSxJQUFNLFNBQVMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDOzs7Ozs7QUFPL0I7Ozs7O0FBQUE7OztJQUNFLGlEQUFpQixHQUFqQixVQUFrQixhQUFxQixLQUFJO2dDQXZCN0M7SUF3QkMsQ0FBQTs7Ozs7O0FBRkQsaUNBRUM7QUFFRCxJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQzs7OztBQUszQixNQUFNLENBQUMsSUFBTSwwQkFBMEIsR0FDbkMsSUFBSSxjQUFjLENBQVksNEJBQTRCLENBQUMsQ0FBQzs7OztBQUtoRSxNQUFNLENBQUMsSUFBTSx3QkFBd0IsR0FBRyxJQUFJLGNBQWMsQ0FBWSwwQkFBMEIsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FBc0JsRzs7Ozs7Ozs7O0FBQUE7OzZCQWdKbUMsS0FBSzt5QkFFRCxJQUFNOzBCQUNKLElBQU07OEJB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QUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDM0M7WUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkIsQ0FBQztLQUNIO0lBQ0QsT0FBTyxJQUFJLGtCQUFrQixDQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxDQUFDLENBQUM7Q0FDaEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QXBwbGljYXRpb25Jbml0U3RhdHVzLCBDb21waWxlck9wdGlvbnMsIENvbXBvbmVudCwgRGlyZWN0aXZlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMsIE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnksIE5nTW9kdWxlUmVmLCBOZ1pvbmUsIE9wdGlvbmFsLCBQaXBlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFNjaGVtYU1ldGFkYXRhLCBTa2lwU2VsZiwgU3RhdGljUHJvdmlkZXIsIFR5cGUsIMm1QVBQX1JPT1QgYXMgQVBQX1JPT1QsIMm1RGVwRmxhZ3MgYXMgRGVwRmxhZ3MsIMm1Tm9kZUZsYWdzIGFzIE5vZGVGbGFncywgybVjbGVhck92ZXJyaWRlcyBhcyBjbGVhck92ZXJyaWRlcywgybVnZXRDb21wb25lbnRWaWV3RGVmaW5pdGlvbkZhY3RvcnkgYXMgZ2V0Q29tcG9uZW50Vmlld0RlZmluaXRpb25GYWN0b3J5LCDJtW92ZXJyaWRlQ29tcG9uZW50VmlldyBhcyBvdmVycmlkZUNvbXBvbmVudFZpZXcsIMm1b3ZlcnJpZGVQcm92aWRlciBhcyBvdmVycmlkZVByb3ZpZGVyLCDJtXN0cmluZ2lmeSBhcyBzdHJpbmdpZnl9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FzeW5jVGVzdENvbXBsZXRlcn0gZnJvbSAnLi9hc3luY190ZXN0X2NvbXBsZXRlcic7XG5pbXBvcnQge0NvbXBvbmVudEZpeHR1cmV9IGZyb20gJy4vY29tcG9uZW50X2ZpeHR1cmUnO1xuaW1wb3J0IHtNZXRhZGF0YU92ZXJyaWRlfSBmcm9tICcuL21ldGFkYXRhX292ZXJyaWRlJztcbmltcG9ydCB7VGVzdGluZ0NvbXBpbGVyLCBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5fSBmcm9tICcuL3Rlc3RfY29tcGlsZXInO1xuXG5jb25zdCBVTkRFRklORUQgPSBuZXcgT2JqZWN0KCk7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgY2xhc3MgZm9yIGluc2VydGluZyB0aGUgcm9vdCB0ZXN0IGNvbXBvbmVudCBlbGVtZW50IGluIGEgcGxhdGZvcm0gaW5kZXBlbmRlbnQgd2F5LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RDb21wb25lbnRSZW5kZXJlciB7XG4gIGluc2VydFJvb3RFbGVtZW50KHJvb3RFbGVtZW50SWQ6IHN0cmluZykge31cbn1cblxubGV0IF9uZXh0Um9vdEVsZW1lbnRJZCA9IDA7XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgQ29tcG9uZW50Rml4dHVyZUF1dG9EZXRlY3QgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuW10+KCdDb21wb25lbnRGaXh0dXJlQXV0b0RldGVjdCcpO1xuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudEZpeHR1cmVOb05nWm9uZSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxib29sZWFuW10+KCdDb21wb25lbnRGaXh0dXJlTm9OZ1pvbmUnKTtcblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCB0eXBlIFRlc3RNb2R1bGVNZXRhZGF0YSA9IHtcbiAgcHJvdmlkZXJzPzogYW55W10sXG4gIGRlY2xhcmF0aW9ucz86IGFueVtdLFxuICBpbXBvcnRzPzogYW55W10sXG4gIHNjaGVtYXM/OiBBcnJheTxTY2hlbWFNZXRhZGF0YXxhbnlbXT4sXG4gIGFvdFN1bW1hcmllcz86ICgpID0+IGFueVtdLFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbmZpZ3VyZXMgYW5kIGluaXRpYWxpemVzIGVudmlyb25tZW50IGZvciB1bml0IHRlc3RpbmcgYW5kIHByb3ZpZGVzIG1ldGhvZHMgZm9yXG4gKiBjcmVhdGluZyBjb21wb25lbnRzIGFuZCBzZXJ2aWNlcyBpbiB1bml0IHRlc3RzLlxuICpcbiAqIFRlc3RCZWQgaXMgdGhlIHByaW1hcnkgYXBpIGZvciB3cml0aW5nIHVuaXQgdGVzdHMgZm9yIEFuZ3VsYXIgYXBwbGljYXRpb25zIGFuZCBsaWJyYXJpZXMuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RCZWQgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBmb3IgdGVzdGluZyB3aXRoIGEgY29tcGlsZXIgZmFjdG9yeSwgYSBQbGF0Zm9ybVJlZiwgYW5kIGFuXG4gICAqIGFuZ3VsYXIgbW9kdWxlLiBUaGVzZSBhcmUgY29tbW9uIHRvIGV2ZXJ5IHRlc3QgaW4gdGhlIHN1aXRlLlxuICAgKlxuICAgKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcbiAgICogc3VpdGUgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0uIElmIHlvdSBhYnNvbHV0ZWx5IG5lZWQgdG8gY2hhbmdlIHRoZSBwcm92aWRlcnMsXG4gICAqIGZpcnN0IHVzZSBgcmVzZXRUZXN0RW52aXJvbm1lbnRgLlxuICAgKlxuICAgKiBUZXN0IG1vZHVsZXMgYW5kIHBsYXRmb3JtcyBmb3IgaW5kaXZpZHVhbCBwbGF0Zm9ybXMgYXJlIGF2YWlsYWJsZSBmcm9tXG4gICAqICdAYW5ndWxhci88cGxhdGZvcm1fbmFtZT4vdGVzdGluZycuXG4gICAqXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIHN0YXRpYyBpbml0VGVzdEVudmlyb25tZW50KFxuICAgICAgbmdNb2R1bGU6IFR5cGU8YW55PnxUeXBlPGFueT5bXSwgcGxhdGZvcm06IFBsYXRmb3JtUmVmLCBhb3RTdW1tYXJpZXM/OiAoKSA9PiBhbnlbXSk6IFRlc3RCZWQge1xuICAgIGNvbnN0IHRlc3RCZWQgPSBnZXRUZXN0QmVkKCk7XG4gICAgdGVzdEJlZC5pbml0VGVzdEVudmlyb25tZW50KG5nTW9kdWxlLCBwbGF0Zm9ybSwgYW90U3VtbWFyaWVzKTtcbiAgICByZXR1cm4gdGVzdEJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgcHJvdmlkZXJzIGZvciB0aGUgdGVzdCBpbmplY3Rvci5cbiAgICpcbiAgICogQGV4cGVyaW1lbnRhbFxuICAgKi9cbiAgc3RhdGljIHJlc2V0VGVzdEVudmlyb25tZW50KCkgeyBnZXRUZXN0QmVkKCkucmVzZXRUZXN0RW52aXJvbm1lbnQoKTsgfVxuXG4gIHN0YXRpYyByZXNldFRlc3RpbmdNb2R1bGUoKTogdHlwZW9mIFRlc3RCZWQge1xuICAgIGdldFRlc3RCZWQoKS5yZXNldFRlc3RpbmdNb2R1bGUoKTtcbiAgICByZXR1cm4gVGVzdEJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbGxvd3Mgb3ZlcnJpZGluZyBkZWZhdWx0IGNvbXBpbGVyIHByb3ZpZGVycyBhbmQgc2V0dGluZ3NcbiAgICogd2hpY2ggYXJlIGRlZmluZWQgaW4gdGVzdF9pbmplY3Rvci5qc1xuICAgKi9cbiAgc3RhdGljIGNvbmZpZ3VyZUNvbXBpbGVyKGNvbmZpZzoge3Byb3ZpZGVycz86IGFueVtdOyB1c2VKaXQ/OiBib29sZWFuO30pOiB0eXBlb2YgVGVzdEJlZCB7XG4gICAgZ2V0VGVzdEJlZCgpLmNvbmZpZ3VyZUNvbXBpbGVyKGNvbmZpZyk7XG4gICAgcmV0dXJuIFRlc3RCZWQ7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIG92ZXJyaWRpbmcgZGVmYXVsdCBwcm92aWRlcnMsIGRpcmVjdGl2ZXMsIHBpcGVzLCBtb2R1bGVzIG9mIHRoZSB0ZXN0IGluamVjdG9yLFxuICAgKiB3aGljaCBhcmUgZGVmaW5lZCBpbiB0ZXN0X2luamVjdG9yLmpzXG4gICAqL1xuICBzdGF0aWMgY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSk6IHR5cGVvZiBUZXN0QmVkIHtcbiAgICBnZXRUZXN0QmVkKCkuY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWYpO1xuICAgIHJldHVybiBUZXN0QmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBpbGUgY29tcG9uZW50cyB3aXRoIGEgYHRlbXBsYXRlVXJsYCBmb3IgdGhlIHRlc3QncyBOZ01vZHVsZS5cbiAgICogSXQgaXMgbmVjZXNzYXJ5IHRvIGNhbGwgdGhpcyBmdW5jdGlvblxuICAgKiBhcyBmZXRjaGluZyB1cmxzIGlzIGFzeW5jaHJvbm91cy5cbiAgICovXG4gIHN0YXRpYyBjb21waWxlQ29tcG9uZW50cygpOiBQcm9taXNlPGFueT4geyByZXR1cm4gZ2V0VGVzdEJlZCgpLmNvbXBpbGVDb21wb25lbnRzKCk7IH1cblxuICBzdGF0aWMgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdHlwZW9mIFRlc3RCZWQge1xuICAgIGdldFRlc3RCZWQoKS5vdmVycmlkZU1vZHVsZShuZ01vZHVsZSwgb3ZlcnJpZGUpO1xuICAgIHJldHVybiBUZXN0QmVkO1xuICB9XG5cbiAgc3RhdGljIG92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxDb21wb25lbnQ+KTpcbiAgICAgIHR5cGVvZiBUZXN0QmVkIHtcbiAgICBnZXRUZXN0QmVkKCkub3ZlcnJpZGVDb21wb25lbnQoY29tcG9uZW50LCBvdmVycmlkZSk7XG4gICAgcmV0dXJuIFRlc3RCZWQ7XG4gIH1cblxuICBzdGF0aWMgb3ZlcnJpZGVEaXJlY3RpdmUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlOiBNZXRhZGF0YU92ZXJyaWRlPERpcmVjdGl2ZT4pOlxuICAgICAgdHlwZW9mIFRlc3RCZWQge1xuICAgIGdldFRlc3RCZWQoKS5vdmVycmlkZURpcmVjdGl2ZShkaXJlY3RpdmUsIG92ZXJyaWRlKTtcbiAgICByZXR1cm4gVGVzdEJlZDtcbiAgfVxuXG4gIHN0YXRpYyBvdmVycmlkZVBpcGUocGlwZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IHR5cGVvZiBUZXN0QmVkIHtcbiAgICBnZXRUZXN0QmVkKCkub3ZlcnJpZGVQaXBlKHBpcGUsIG92ZXJyaWRlKTtcbiAgICByZXR1cm4gVGVzdEJlZDtcbiAgfVxuXG4gIHN0YXRpYyBvdmVycmlkZVRlbXBsYXRlKGNvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZTogc3RyaW5nKTogdHlwZW9mIFRlc3RCZWQge1xuICAgIGdldFRlc3RCZWQoKS5vdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQsIHtzZXQ6IHt0ZW1wbGF0ZSwgdGVtcGxhdGVVcmw6IG51bGwgIX19KTtcbiAgICByZXR1cm4gVGVzdEJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIHRlbXBsYXRlIG9mIHRoZSBnaXZlbiBjb21wb25lbnQsIGNvbXBpbGluZyB0aGUgdGVtcGxhdGVcbiAgICogaW4gdGhlIGNvbnRleHQgb2YgdGhlIFRlc3RpbmdNb2R1bGUuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgd29ya3MgZm9yIEpJVCBhbmQgQU9UZWQgY29tcG9uZW50cyBhcyB3ZWxsLlxuICAgKi9cbiAgc3RhdGljIG92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUoY29tcG9uZW50OiBUeXBlPGFueT4sIHRlbXBsYXRlOiBzdHJpbmcpOlxuICAgICAgdHlwZW9mIFRlc3RCZWQge1xuICAgIGdldFRlc3RCZWQoKS5vdmVycmlkZVRlbXBsYXRlVXNpbmdUZXN0aW5nTW9kdWxlKGNvbXBvbmVudCwgdGVtcGxhdGUpO1xuICAgIHJldHVybiBUZXN0QmVkO1xuICB9XG5cblxuICAvKipcbiAgICogT3ZlcndyaXRlcyBhbGwgcHJvdmlkZXJzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gd2l0aCB0aGUgZ2l2ZW4gcHJvdmlkZXIgZGVmaW5pdGlvbi5cbiAgICpcbiAgICogTm90ZTogVGhpcyB3b3JrcyBmb3IgSklUIGFuZCBBT1RlZCBjb21wb25lbnRzIGFzIHdlbGwuXG4gICAqL1xuICBzdGF0aWMgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xuICAgIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uLFxuICAgIGRlcHM6IGFueVtdLFxuICB9KTogdHlwZW9mIFRlc3RCZWQ7XG4gIHN0YXRpYyBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdHlwZW9mIFRlc3RCZWQ7XG4gIHN0YXRpYyBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XG4gICAgdXNlRmFjdG9yeT86IEZ1bmN0aW9uLFxuICAgIHVzZVZhbHVlPzogYW55LFxuICAgIGRlcHM/OiBhbnlbXSxcbiAgfSk6IHR5cGVvZiBUZXN0QmVkIHtcbiAgICBnZXRUZXN0QmVkKCkub3ZlcnJpZGVQcm92aWRlcih0b2tlbiwgcHJvdmlkZXIgYXMgYW55KTtcbiAgICByZXR1cm4gVGVzdEJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVyd3JpdGVzIGFsbCBwcm92aWRlcnMgZm9yIHRoZSBnaXZlbiB0b2tlbiB3aXRoIHRoZSBnaXZlbiBwcm92aWRlciBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBhcyBpdCBtYWtlcyBhbGwgTmdNb2R1bGVzIGxhenkuIEludHJvZHVjZWQgb25seSBmb3IgbWlncmF0aW5nIG9mZiBvZiBpdC5cbiAgICovXG4gIHN0YXRpYyBkZXByZWNhdGVkT3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge1xuICAgIHVzZUZhY3Rvcnk6IEZ1bmN0aW9uLFxuICAgIGRlcHM6IGFueVtdLFxuICB9KTogdm9pZDtcbiAgc3RhdGljIGRlcHJlY2F0ZWRPdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdm9pZDtcbiAgc3RhdGljIGRlcHJlY2F0ZWRPdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XG4gICAgdXNlRmFjdG9yeT86IEZ1bmN0aW9uLFxuICAgIHVzZVZhbHVlPzogYW55LFxuICAgIGRlcHM/OiBhbnlbXSxcbiAgfSk6IHR5cGVvZiBUZXN0QmVkIHtcbiAgICBnZXRUZXN0QmVkKCkuZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIodG9rZW4sIHByb3ZpZGVyIGFzIGFueSk7XG4gICAgcmV0dXJuIFRlc3RCZWQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU6IGFueSA9IEluamVjdG9yLlRIUk9XX0lGX05PVF9GT1VORCkge1xuICAgIHJldHVybiBnZXRUZXN0QmVkKCkuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVDb21wb25lbnQ8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50Rml4dHVyZTxUPiB7XG4gICAgcmV0dXJuIGdldFRlc3RCZWQoKS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luc3RhbnRpYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2NvbXBpbGVyOiBUZXN0aW5nQ29tcGlsZXIgPSBudWxsICE7XG4gIHByaXZhdGUgX21vZHVsZVJlZjogTmdNb2R1bGVSZWY8YW55PiA9IG51bGwgITtcbiAgcHJpdmF0ZSBfbW9kdWxlRmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PGFueT4gPSBudWxsICE7XG5cbiAgcHJpdmF0ZSBfY29tcGlsZXJPcHRpb25zOiBDb21waWxlck9wdGlvbnNbXSA9IFtdO1xuXG4gIHByaXZhdGUgX21vZHVsZU92ZXJyaWRlczogW1R5cGU8YW55PiwgTWV0YWRhdGFPdmVycmlkZTxOZ01vZHVsZT5dW10gPSBbXTtcbiAgcHJpdmF0ZSBfY29tcG9uZW50T3ZlcnJpZGVzOiBbVHlwZTxhbnk+LCBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD5dW10gPSBbXTtcbiAgcHJpdmF0ZSBfZGlyZWN0aXZlT3ZlcnJpZGVzOiBbVHlwZTxhbnk+LCBNZXRhZGF0YU92ZXJyaWRlPERpcmVjdGl2ZT5dW10gPSBbXTtcbiAgcHJpdmF0ZSBfcGlwZU92ZXJyaWRlczogW1R5cGU8YW55PiwgTWV0YWRhdGFPdmVycmlkZTxQaXBlPl1bXSA9IFtdO1xuXG4gIHByaXZhdGUgX3Byb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtdO1xuICBwcml2YXRlIF9kZWNsYXJhdGlvbnM6IEFycmF5PFR5cGU8YW55PnxhbnlbXXxhbnk+ID0gW107XG4gIHByaXZhdGUgX2ltcG9ydHM6IEFycmF5PFR5cGU8YW55PnxhbnlbXXxhbnk+ID0gW107XG4gIHByaXZhdGUgX3NjaGVtYXM6IEFycmF5PFNjaGVtYU1ldGFkYXRhfGFueVtdPiA9IFtdO1xuICBwcml2YXRlIF9hY3RpdmVGaXh0dXJlczogQ29tcG9uZW50Rml4dHVyZTxhbnk+W10gPSBbXTtcblxuICBwcml2YXRlIF90ZXN0RW52QW90U3VtbWFyaWVzOiAoKSA9PiBhbnlbXSA9ICgpID0+IFtdO1xuICBwcml2YXRlIF9hb3RTdW1tYXJpZXM6IEFycmF5PCgpID0+IGFueVtdPiA9IFtdO1xuICBwcml2YXRlIF90ZW1wbGF0ZU92ZXJyaWRlczogQXJyYXk8e2NvbXBvbmVudDogVHlwZTxhbnk+LCB0ZW1wbGF0ZU9mOiBUeXBlPGFueT59PiA9IFtdO1xuXG4gIHByaXZhdGUgX2lzUm9vdDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX3Jvb3RQcm92aWRlck92ZXJyaWRlczogUHJvdmlkZXJbXSA9IFtdO1xuXG4gIHBsYXRmb3JtOiBQbGF0Zm9ybVJlZiA9IG51bGwgITtcblxuICBuZ01vZHVsZTogVHlwZTxhbnk+fFR5cGU8YW55PltdID0gbnVsbCAhO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBlbnZpcm9ubWVudCBmb3IgdGVzdGluZyB3aXRoIGEgY29tcGlsZXIgZmFjdG9yeSwgYSBQbGF0Zm9ybVJlZiwgYW5kIGFuXG4gICAqIGFuZ3VsYXIgbW9kdWxlLiBUaGVzZSBhcmUgY29tbW9uIHRvIGV2ZXJ5IHRlc3QgaW4gdGhlIHN1aXRlLlxuICAgKlxuICAgKiBUaGlzIG1heSBvbmx5IGJlIGNhbGxlZCBvbmNlLCB0byBzZXQgdXAgdGhlIGNvbW1vbiBwcm92aWRlcnMgZm9yIHRoZSBjdXJyZW50IHRlc3RcbiAgICogc3VpdGUgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0uIElmIHlvdSBhYnNvbHV0ZWx5IG5lZWQgdG8gY2hhbmdlIHRoZSBwcm92aWRlcnMsXG4gICAqIGZpcnN0IHVzZSBgcmVzZXRUZXN0RW52aXJvbm1lbnRgLlxuICAgKlxuICAgKiBUZXN0IG1vZHVsZXMgYW5kIHBsYXRmb3JtcyBmb3IgaW5kaXZpZHVhbCBwbGF0Zm9ybXMgYXJlIGF2YWlsYWJsZSBmcm9tXG4gICAqICdAYW5ndWxhci88cGxhdGZvcm1fbmFtZT4vdGVzdGluZycuXG4gICAqXG4gICAqIEBleHBlcmltZW50YWxcbiAgICovXG4gIGluaXRUZXN0RW52aXJvbm1lbnQoXG4gICAgICBuZ01vZHVsZTogVHlwZTxhbnk+fFR5cGU8YW55PltdLCBwbGF0Zm9ybTogUGxhdGZvcm1SZWYsIGFvdFN1bW1hcmllcz86ICgpID0+IGFueVtdKSB7XG4gICAgaWYgKHRoaXMucGxhdGZvcm0gfHwgdGhpcy5uZ01vZHVsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IGJhc2UgcHJvdmlkZXJzIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBjYWxsZWQnKTtcbiAgICB9XG4gICAgdGhpcy5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xuICAgIHRoaXMubmdNb2R1bGUgPSBuZ01vZHVsZTtcbiAgICBpZiAoYW90U3VtbWFyaWVzKSB7XG4gICAgICB0aGlzLl90ZXN0RW52QW90U3VtbWFyaWVzID0gYW90U3VtbWFyaWVzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgcHJvdmlkZXJzIGZvciB0aGUgdGVzdCBpbmplY3Rvci5cbiAgICpcbiAgICogQGV4cGVyaW1lbnRhbFxuICAgKi9cbiAgcmVzZXRUZXN0RW52aXJvbm1lbnQoKSB7XG4gICAgdGhpcy5yZXNldFRlc3RpbmdNb2R1bGUoKTtcbiAgICB0aGlzLnBsYXRmb3JtID0gbnVsbCAhO1xuICAgIHRoaXMubmdNb2R1bGUgPSBudWxsICE7XG4gICAgdGhpcy5fdGVzdEVudkFvdFN1bW1hcmllcyA9ICgpID0+IFtdO1xuICB9XG5cbiAgcmVzZXRUZXN0aW5nTW9kdWxlKCkge1xuICAgIGNsZWFyT3ZlcnJpZGVzKCk7XG4gICAgdGhpcy5fYW90U3VtbWFyaWVzID0gW107XG4gICAgdGhpcy5fdGVtcGxhdGVPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9jb21waWxlciA9IG51bGwgITtcbiAgICB0aGlzLl9tb2R1bGVPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9jb21wb25lbnRPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMgPSBbXTtcbiAgICB0aGlzLl9waXBlT3ZlcnJpZGVzID0gW107XG5cbiAgICB0aGlzLl9pc1Jvb3QgPSB0cnVlO1xuICAgIHRoaXMuX3Jvb3RQcm92aWRlck92ZXJyaWRlcyA9IFtdO1xuXG4gICAgdGhpcy5fbW9kdWxlUmVmID0gbnVsbCAhO1xuICAgIHRoaXMuX21vZHVsZUZhY3RvcnkgPSBudWxsICE7XG4gICAgdGhpcy5fY29tcGlsZXJPcHRpb25zID0gW107XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gW107XG4gICAgdGhpcy5fZGVjbGFyYXRpb25zID0gW107XG4gICAgdGhpcy5faW1wb3J0cyA9IFtdO1xuICAgIHRoaXMuX3NjaGVtYXMgPSBbXTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9hY3RpdmVGaXh0dXJlcy5mb3JFYWNoKChmaXh0dXJlKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBmaXh0dXJlLmRlc3Ryb3koKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIGNsZWFudXAgb2YgY29tcG9uZW50Jywge1xuICAgICAgICAgIGNvbXBvbmVudDogZml4dHVyZS5jb21wb25lbnRJbnN0YW5jZSxcbiAgICAgICAgICBzdGFja3RyYWNlOiBlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9hY3RpdmVGaXh0dXJlcyA9IFtdO1xuICB9XG5cbiAgY29uZmlndXJlQ29tcGlsZXIoY29uZmlnOiB7cHJvdmlkZXJzPzogYW55W10sIHVzZUppdD86IGJvb2xlYW59KSB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90SW5zdGFudGlhdGVkKCdUZXN0QmVkLmNvbmZpZ3VyZUNvbXBpbGVyJywgJ2NvbmZpZ3VyZSB0aGUgY29tcGlsZXInKTtcbiAgICB0aGlzLl9jb21waWxlck9wdGlvbnMucHVzaChjb25maWcpO1xuICB9XG5cbiAgY29uZmlndXJlVGVzdGluZ01vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSkge1xuICAgIHRoaXMuX2Fzc2VydE5vdEluc3RhbnRpYXRlZCgnVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlJywgJ2NvbmZpZ3VyZSB0aGUgdGVzdCBtb2R1bGUnKTtcbiAgICBpZiAobW9kdWxlRGVmLnByb3ZpZGVycykge1xuICAgICAgdGhpcy5fcHJvdmlkZXJzLnB1c2goLi4ubW9kdWxlRGVmLnByb3ZpZGVycyk7XG4gICAgfVxuICAgIGlmIChtb2R1bGVEZWYuZGVjbGFyYXRpb25zKSB7XG4gICAgICB0aGlzLl9kZWNsYXJhdGlvbnMucHVzaCguLi5tb2R1bGVEZWYuZGVjbGFyYXRpb25zKTtcbiAgICB9XG4gICAgaWYgKG1vZHVsZURlZi5pbXBvcnRzKSB7XG4gICAgICB0aGlzLl9pbXBvcnRzLnB1c2goLi4ubW9kdWxlRGVmLmltcG9ydHMpO1xuICAgIH1cbiAgICBpZiAobW9kdWxlRGVmLnNjaGVtYXMpIHtcbiAgICAgIHRoaXMuX3NjaGVtYXMucHVzaCguLi5tb2R1bGVEZWYuc2NoZW1hcyk7XG4gICAgfVxuICAgIGlmIChtb2R1bGVEZWYuYW90U3VtbWFyaWVzKSB7XG4gICAgICB0aGlzLl9hb3RTdW1tYXJpZXMucHVzaChtb2R1bGVEZWYuYW90U3VtbWFyaWVzKTtcbiAgICB9XG4gIH1cblxuICBjb21waWxlQ29tcG9uZW50cygpOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICh0aGlzLl9tb2R1bGVGYWN0b3J5IHx8IHRoaXMuX2luc3RhbnRpYXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG5cbiAgICBjb25zdCBtb2R1bGVUeXBlID0gdGhpcy5fY3JlYXRlQ29tcGlsZXJBbmRNb2R1bGUoKTtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZXIuY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luYyhtb2R1bGVUeXBlKVxuICAgICAgICAudGhlbigobW9kdWxlQW5kQ29tcG9uZW50RmFjdG9yaWVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbW9kdWxlRmFjdG9yeSA9IG1vZHVsZUFuZENvbXBvbmVudEZhY3Rvcmllcy5uZ01vZHVsZUZhY3Rvcnk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdElmTmVlZGVkKCkge1xuICAgIGlmICh0aGlzLl9pbnN0YW50aWF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9tb2R1bGVGYWN0b3J5KSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtb2R1bGVUeXBlID0gdGhpcy5fY3JlYXRlQ29tcGlsZXJBbmRNb2R1bGUoKTtcbiAgICAgICAgdGhpcy5fbW9kdWxlRmFjdG9yeSA9XG4gICAgICAgICAgICB0aGlzLl9jb21waWxlci5jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c1N5bmMobW9kdWxlVHlwZSkubmdNb2R1bGVGYWN0b3J5O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBlcnJvckNvbXBUeXBlID0gdGhpcy5fY29tcGlsZXIuZ2V0Q29tcG9uZW50RnJvbUVycm9yKGUpO1xuICAgICAgICBpZiAoZXJyb3JDb21wVHlwZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYFRoaXMgdGVzdCBtb2R1bGUgdXNlcyB0aGUgY29tcG9uZW50ICR7c3RyaW5naWZ5KGVycm9yQ29tcFR5cGUpfSB3aGljaCBpcyB1c2luZyBhIFwidGVtcGxhdGVVcmxcIiBvciBcInN0eWxlVXJsc1wiLCBidXQgdGhleSB3ZXJlIG5ldmVyIGNvbXBpbGVkLiBgICtcbiAgICAgICAgICAgICAgYFBsZWFzZSBjYWxsIFwiVGVzdEJlZC5jb21waWxlQ29tcG9uZW50c1wiIGJlZm9yZSB5b3VyIHRlc3QuYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHtjb21wb25lbnQsIHRlbXBsYXRlT2Z9IG9mIHRoaXMuX3RlbXBsYXRlT3ZlcnJpZGVzKSB7XG4gICAgICBjb25zdCBjb21wRmFjdG9yeSA9IHRoaXMuX2NvbXBpbGVyLmdldENvbXBvbmVudEZhY3RvcnkodGVtcGxhdGVPZik7XG4gICAgICBvdmVycmlkZUNvbXBvbmVudFZpZXcoY29tcG9uZW50LCBjb21wRmFjdG9yeSk7XG4gICAgfVxuXG4gICAgY29uc3Qgbmdab25lID0gbmV3IE5nWm9uZSh7ZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IHRydWV9KTtcbiAgICBjb25zdCBwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbe3Byb3ZpZGU6IE5nWm9uZSwgdXNlVmFsdWU6IG5nWm9uZX1dO1xuICAgIGNvbnN0IG5nWm9uZUluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZXJzLFxuICAgICAgcGFyZW50OiB0aGlzLnBsYXRmb3JtLmluamVjdG9yLFxuICAgICAgbmFtZTogdGhpcy5fbW9kdWxlRmFjdG9yeS5tb2R1bGVUeXBlLm5hbWVcbiAgICB9KTtcbiAgICB0aGlzLl9tb2R1bGVSZWYgPSB0aGlzLl9tb2R1bGVGYWN0b3J5LmNyZWF0ZShuZ1pvbmVJbmplY3Rvcik7XG4gICAgLy8gQXBwbGljYXRpb25Jbml0U3RhdHVzLnJ1bkluaXRpYWxpemVycygpIGlzIG1hcmtlZCBAaW50ZXJuYWwgdG8gY29yZS4gU28gY2FzdGluZyB0byBhbnlcbiAgICAvLyBiZWZvcmUgYWNjZXNzaW5nIGl0LlxuICAgICh0aGlzLl9tb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEFwcGxpY2F0aW9uSW5pdFN0YXR1cykgYXMgYW55KS5ydW5Jbml0aWFsaXplcnMoKTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29tcGlsZXJBbmRNb2R1bGUoKTogVHlwZTxhbnk+IHtcbiAgICBjb25zdCBwcm92aWRlcnMgPSB0aGlzLl9wcm92aWRlcnMuY29uY2F0KFt7cHJvdmlkZTogVGVzdEJlZCwgdXNlVmFsdWU6IHRoaXN9XSk7XG4gICAgY29uc3QgZGVjbGFyYXRpb25zID1cbiAgICAgICAgWy4uLnRoaXMuX2RlY2xhcmF0aW9ucywgLi4udGhpcy5fdGVtcGxhdGVPdmVycmlkZXMubWFwKGVudHJ5ID0+IGVudHJ5LnRlbXBsYXRlT2YpXTtcblxuICAgIGNvbnN0IHJvb3RTY29wZUltcG9ydHMgPSBbXTtcbiAgICBjb25zdCByb290UHJvdmlkZXJPdmVycmlkZXMgPSB0aGlzLl9yb290UHJvdmlkZXJPdmVycmlkZXM7XG4gICAgaWYgKHRoaXMuX2lzUm9vdCkge1xuICAgICAgQE5nTW9kdWxlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgLi4ucm9vdFByb3ZpZGVyT3ZlcnJpZGVzLFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgIGNsYXNzIFJvb3RTY29wZU1vZHVsZSB7XG4gICAgICB9XG4gICAgICByb290U2NvcGVJbXBvcnRzLnB1c2goUm9vdFNjb3BlTW9kdWxlKTtcbiAgICB9XG4gICAgcHJvdmlkZXJzLnB1c2goe3Byb3ZpZGU6IEFQUF9ST09ULCB1c2VWYWx1ZTogdGhpcy5faXNSb290fSk7XG5cbiAgICBjb25zdCBpbXBvcnRzID0gW3Jvb3RTY29wZUltcG9ydHMsIHRoaXMubmdNb2R1bGUsIHRoaXMuX2ltcG9ydHNdO1xuICAgIGNvbnN0IHNjaGVtYXMgPSB0aGlzLl9zY2hlbWFzO1xuXG4gICAgQE5nTW9kdWxlKHtwcm92aWRlcnMsIGRlY2xhcmF0aW9ucywgaW1wb3J0cywgc2NoZW1hc30pXG4gICAgY2xhc3MgRHluYW1pY1Rlc3RNb2R1bGUge1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBpbGVyRmFjdG9yeTogVGVzdGluZ0NvbXBpbGVyRmFjdG9yeSA9XG4gICAgICAgIHRoaXMucGxhdGZvcm0uaW5qZWN0b3IuZ2V0KFRlc3RpbmdDb21waWxlckZhY3RvcnkpO1xuICAgIHRoaXMuX2NvbXBpbGVyID0gY29tcGlsZXJGYWN0b3J5LmNyZWF0ZVRlc3RpbmdDb21waWxlcih0aGlzLl9jb21waWxlck9wdGlvbnMpO1xuICAgIGZvciAoY29uc3Qgc3VtbWFyeSBvZiBbdGhpcy5fdGVzdEVudkFvdFN1bW1hcmllcywgLi4udGhpcy5fYW90U3VtbWFyaWVzXSkge1xuICAgICAgdGhpcy5fY29tcGlsZXIubG9hZEFvdFN1bW1hcmllcyhzdW1tYXJ5KTtcbiAgICB9XG4gICAgdGhpcy5fbW9kdWxlT3ZlcnJpZGVzLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLl9jb21waWxlci5vdmVycmlkZU1vZHVsZShlbnRyeVswXSwgZW50cnlbMV0pKTtcbiAgICB0aGlzLl9jb21wb25lbnRPdmVycmlkZXMuZm9yRWFjaChcbiAgICAgICAgKGVudHJ5KSA9PiB0aGlzLl9jb21waWxlci5vdmVycmlkZUNvbXBvbmVudChlbnRyeVswXSwgZW50cnlbMV0pKTtcbiAgICB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMuZm9yRWFjaChcbiAgICAgICAgKGVudHJ5KSA9PiB0aGlzLl9jb21waWxlci5vdmVycmlkZURpcmVjdGl2ZShlbnRyeVswXSwgZW50cnlbMV0pKTtcbiAgICB0aGlzLl9waXBlT3ZlcnJpZGVzLmZvckVhY2goKGVudHJ5KSA9PiB0aGlzLl9jb21waWxlci5vdmVycmlkZVBpcGUoZW50cnlbMF0sIGVudHJ5WzFdKSk7XG4gICAgcmV0dXJuIER5bmFtaWNUZXN0TW9kdWxlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXNzZXJ0Tm90SW5zdGFudGlhdGVkKG1ldGhvZE5hbWU6IHN0cmluZywgbWV0aG9kRGVzY3JpcHRpb246IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9pbnN0YW50aWF0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQ2Fubm90ICR7bWV0aG9kRGVzY3JpcHRpb259IHdoZW4gdGhlIHRlc3QgbW9kdWxlIGhhcyBhbHJlYWR5IGJlZW4gaW5zdGFudGlhdGVkLiBgICtcbiAgICAgICAgICBgTWFrZSBzdXJlIHlvdSBhcmUgbm90IHVzaW5nIFxcYGluamVjdFxcYCBiZWZvcmUgXFxgJHttZXRob2ROYW1lfVxcYC5gKTtcbiAgICB9XG4gIH1cblxuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZTogYW55ID0gSW5qZWN0b3IuVEhST1dfSUZfTk9UX0ZPVU5EKSB7XG4gICAgdGhpcy5faW5pdElmTmVlZGVkKCk7XG4gICAgaWYgKHRva2VuID09PSBUZXN0QmVkKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gVGVzdHMgY2FuIGluamVjdCB0aGluZ3MgZnJvbSB0aGUgbmcgbW9kdWxlIGFuZCBmcm9tIHRoZSBjb21waWxlcixcbiAgICAvLyBidXQgdGhlIG5nIG1vZHVsZSBjYW4ndCBpbmplY3QgdGhpbmdzIGZyb20gdGhlIGNvbXBpbGVyIGFuZCB2aWNlIHZlcnNhLlxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX21vZHVsZVJlZi5pbmplY3Rvci5nZXQodG9rZW4sIFVOREVGSU5FRCk7XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gVU5ERUZJTkVEID8gdGhpcy5fY29tcGlsZXIuaW5qZWN0b3IuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGV4ZWN1dGUodG9rZW5zOiBhbnlbXSwgZm46IEZ1bmN0aW9uLCBjb250ZXh0PzogYW55KTogYW55IHtcbiAgICB0aGlzLl9pbml0SWZOZWVkZWQoKTtcbiAgICBjb25zdCBwYXJhbXMgPSB0b2tlbnMubWFwKHQgPT4gdGhpcy5nZXQodCkpO1xuICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBwYXJhbXMpO1xuICB9XG5cbiAgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZCB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90SW5zdGFudGlhdGVkKCdvdmVycmlkZU1vZHVsZScsICdvdmVycmlkZSBtb2R1bGUgbWV0YWRhdGEnKTtcbiAgICB0aGlzLl9tb2R1bGVPdmVycmlkZXMucHVzaChbbmdNb2R1bGUsIG92ZXJyaWRlXSk7XG4gIH1cblxuICBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRoaXMuX2Fzc2VydE5vdEluc3RhbnRpYXRlZCgnb3ZlcnJpZGVDb21wb25lbnQnLCAnb3ZlcnJpZGUgY29tcG9uZW50IG1ldGFkYXRhJyk7XG4gICAgdGhpcy5fY29tcG9uZW50T3ZlcnJpZGVzLnB1c2goW2NvbXBvbmVudCwgb3ZlcnJpZGVdKTtcbiAgfVxuXG4gIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZCB7XG4gICAgdGhpcy5fYXNzZXJ0Tm90SW5zdGFudGlhdGVkKCdvdmVycmlkZURpcmVjdGl2ZScsICdvdmVycmlkZSBkaXJlY3RpdmUgbWV0YWRhdGEnKTtcbiAgICB0aGlzLl9kaXJlY3RpdmVPdmVycmlkZXMucHVzaChbZGlyZWN0aXZlLCBvdmVycmlkZV0pO1xuICB9XG5cbiAgb3ZlcnJpZGVQaXBlKHBpcGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT4pOiB2b2lkIHtcbiAgICB0aGlzLl9hc3NlcnROb3RJbnN0YW50aWF0ZWQoJ292ZXJyaWRlUGlwZScsICdvdmVycmlkZSBwaXBlIG1ldGFkYXRhJyk7XG4gICAgdGhpcy5fcGlwZU92ZXJyaWRlcy5wdXNoKFtwaXBlLCBvdmVycmlkZV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgYWxsIHByb3ZpZGVycyBmb3IgdGhlIGdpdmVuIHRva2VuIHdpdGggdGhlIGdpdmVuIHByb3ZpZGVyIGRlZmluaXRpb24uXG4gICAqL1xuICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7XG4gICAgdXNlRmFjdG9yeTogRnVuY3Rpb24sXG4gICAgZGVwczogYW55W10sXG4gIH0pOiB2b2lkO1xuICBvdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdm9pZDtcbiAgb3ZlcnJpZGVQcm92aWRlcih0b2tlbjogYW55LCBwcm92aWRlcjoge3VzZUZhY3Rvcnk/OiBGdW5jdGlvbiwgdXNlVmFsdWU/OiBhbnksIGRlcHM/OiBhbnlbXX0pOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5vdmVycmlkZVByb3ZpZGVySW1wbCh0b2tlbiwgcHJvdmlkZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgYWxsIHByb3ZpZGVycyBmb3IgdGhlIGdpdmVuIHRva2VuIHdpdGggdGhlIGdpdmVuIHByb3ZpZGVyIGRlZmluaXRpb24uXG4gICAqXG4gICAqIEBkZXByZWNhdGVkIGFzIGl0IG1ha2VzIGFsbCBOZ01vZHVsZXMgbGF6eS4gSW50cm9kdWNlZCBvbmx5IGZvciBtaWdyYXRpbmcgb2ZmIG9mIGl0LlxuICAgKi9cbiAgZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIodG9rZW46IGFueSwgcHJvdmlkZXI6IHtcbiAgICB1c2VGYWN0b3J5OiBGdW5jdGlvbixcbiAgICBkZXBzOiBhbnlbXSxcbiAgfSk6IHZvaWQ7XG4gIGRlcHJlY2F0ZWRPdmVycmlkZVByb3ZpZGVyKHRva2VuOiBhbnksIHByb3ZpZGVyOiB7dXNlVmFsdWU6IGFueTt9KTogdm9pZDtcbiAgZGVwcmVjYXRlZE92ZXJyaWRlUHJvdmlkZXIoXG4gICAgICB0b2tlbjogYW55LCBwcm92aWRlcjoge3VzZUZhY3Rvcnk/OiBGdW5jdGlvbiwgdXNlVmFsdWU/OiBhbnksIGRlcHM/OiBhbnlbXX0pOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJyaWRlUHJvdmlkZXJJbXBsKHRva2VuLCBwcm92aWRlciwgLyogZGVwcmVjYXRlZCAqLyB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgb3ZlcnJpZGVQcm92aWRlckltcGwoXG4gICAgICB0b2tlbjogYW55LCBwcm92aWRlcjoge1xuICAgICAgICB1c2VGYWN0b3J5PzogRnVuY3Rpb24sXG4gICAgICAgIHVzZVZhbHVlPzogYW55LFxuICAgICAgICBkZXBzPzogYW55W10sXG4gICAgICB9LFxuICAgICAgZGVwcmVjYXRlZCA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gJ3N0cmluZycgJiYgdG9rZW4ubmdJbmplY3RhYmxlRGVmICYmXG4gICAgICAgIHRva2VuLm5nSW5qZWN0YWJsZURlZi5wcm92aWRlZEluID09PSAncm9vdCcpIHtcbiAgICAgIGlmIChwcm92aWRlci51c2VGYWN0b3J5KSB7XG4gICAgICAgIHRoaXMuX3Jvb3RQcm92aWRlck92ZXJyaWRlcy5wdXNoKFxuICAgICAgICAgICAge3Byb3ZpZGU6IHRva2VuLCB1c2VGYWN0b3J5OiBwcm92aWRlci51c2VGYWN0b3J5LCBkZXBzOiBwcm92aWRlci5kZXBzIHx8IFtdfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yb290UHJvdmlkZXJPdmVycmlkZXMucHVzaCh7cHJvdmlkZTogdG9rZW4sIHVzZVZhbHVlOiBwcm92aWRlci51c2VWYWx1ZX0pO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgZmxhZ3M6IE5vZGVGbGFncyA9IDA7XG4gICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgaWYgKHByb3ZpZGVyLnVzZUZhY3RvcnkpIHtcbiAgICAgIGZsYWdzIHw9IE5vZGVGbGFncy5UeXBlRmFjdG9yeVByb3ZpZGVyO1xuICAgICAgdmFsdWUgPSBwcm92aWRlci51c2VGYWN0b3J5O1xuICAgIH0gZWxzZSB7XG4gICAgICBmbGFncyB8PSBOb2RlRmxhZ3MuVHlwZVZhbHVlUHJvdmlkZXI7XG4gICAgICB2YWx1ZSA9IHByb3ZpZGVyLnVzZVZhbHVlO1xuICAgIH1cbiAgICBjb25zdCBkZXBzID0gKHByb3ZpZGVyLmRlcHMgfHwgW10pLm1hcCgoZGVwKSA9PiB7XG4gICAgICBsZXQgZGVwRmxhZ3M6IERlcEZsYWdzID0gRGVwRmxhZ3MuTm9uZTtcbiAgICAgIGxldCBkZXBUb2tlbjogYW55O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwKSkge1xuICAgICAgICBkZXAuZm9yRWFjaCgoZW50cnk6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChlbnRyeSBpbnN0YW5jZW9mIE9wdGlvbmFsKSB7XG4gICAgICAgICAgICBkZXBGbGFncyB8PSBEZXBGbGFncy5PcHRpb25hbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5IGluc3RhbmNlb2YgU2tpcFNlbGYpIHtcbiAgICAgICAgICAgIGRlcEZsYWdzIHw9IERlcEZsYWdzLlNraXBTZWxmO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXBUb2tlbiA9IGVudHJ5O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXBUb2tlbiA9IGRlcDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbZGVwRmxhZ3MsIGRlcFRva2VuXTtcbiAgICB9KTtcbiAgICBvdmVycmlkZVByb3ZpZGVyKHt0b2tlbiwgZmxhZ3MsIGRlcHMsIHZhbHVlLCBkZXByZWNhdGVkQmVoYXZpb3I6IGRlcHJlY2F0ZWR9KTtcbiAgfVxuXG4gIG92ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUoY29tcG9uZW50OiBUeXBlPGFueT4sIHRlbXBsYXRlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hc3NlcnROb3RJbnN0YW50aWF0ZWQoJ292ZXJyaWRlVGVtcGxhdGVVc2luZ1Rlc3RpbmdNb2R1bGUnLCAnb3ZlcnJpZGUgdGVtcGxhdGUnKTtcblxuICAgIEBDb21wb25lbnQoe3NlbGVjdG9yOiAnZW1wdHknLCB0ZW1wbGF0ZX0pXG4gICAgY2xhc3MgT3ZlcnJpZGVDb21wb25lbnQge1xuICAgIH1cblxuICAgIHRoaXMuX3RlbXBsYXRlT3ZlcnJpZGVzLnB1c2goe2NvbXBvbmVudCwgdGVtcGxhdGVPZjogT3ZlcnJpZGVDb21wb25lbnR9KTtcbiAgfVxuXG4gIGNyZWF0ZUNvbXBvbmVudDxUPihjb21wb25lbnQ6IFR5cGU8VD4pOiBDb21wb25lbnRGaXh0dXJlPFQ+IHtcbiAgICB0aGlzLl9pbml0SWZOZWVkZWQoKTtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY29tcGlsZXIuZ2V0Q29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuXG4gICAgaWYgKCFjb21wb25lbnRGYWN0b3J5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYENhbm5vdCBjcmVhdGUgdGhlIGNvbXBvbmVudCAke3N0cmluZ2lmeShjb21wb25lbnQpfSBhcyBpdCB3YXMgbm90IGltcG9ydGVkIGludG8gdGhlIHRlc3RpbmcgbW9kdWxlIWApO1xuICAgIH1cblxuICAgIGNvbnN0IG5vTmdab25lID0gdGhpcy5nZXQoQ29tcG9uZW50Rml4dHVyZU5vTmdab25lLCBmYWxzZSk7XG4gICAgY29uc3QgYXV0b0RldGVjdDogYm9vbGVhbiA9IHRoaXMuZ2V0KENvbXBvbmVudEZpeHR1cmVBdXRvRGV0ZWN0LCBmYWxzZSk7XG4gICAgY29uc3Qgbmdab25lOiBOZ1pvbmUgPSBub05nWm9uZSA/IG51bGwgOiB0aGlzLmdldChOZ1pvbmUsIG51bGwpO1xuICAgIGNvbnN0IHRlc3RDb21wb25lbnRSZW5kZXJlcjogVGVzdENvbXBvbmVudFJlbmRlcmVyID0gdGhpcy5nZXQoVGVzdENvbXBvbmVudFJlbmRlcmVyKTtcbiAgICBjb25zdCByb290RWxJZCA9IGByb290JHtfbmV4dFJvb3RFbGVtZW50SWQrK31gO1xuICAgIHRlc3RDb21wb25lbnRSZW5kZXJlci5pbnNlcnRSb290RWxlbWVudChyb290RWxJZCk7XG5cbiAgICBjb25zdCBpbml0Q29tcG9uZW50ID0gKCkgPT4ge1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID1cbiAgICAgICAgICBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShJbmplY3Rvci5OVUxMLCBbXSwgYCMke3Jvb3RFbElkfWAsIHRoaXMuX21vZHVsZVJlZik7XG4gICAgICByZXR1cm4gbmV3IENvbXBvbmVudEZpeHR1cmU8VD4oY29tcG9uZW50UmVmLCBuZ1pvbmUsIGF1dG9EZXRlY3QpO1xuICAgIH07XG5cbiAgICBjb25zdCBmaXh0dXJlID0gIW5nWm9uZSA/IGluaXRDb21wb25lbnQoKSA6IG5nWm9uZS5ydW4oaW5pdENvbXBvbmVudCk7XG4gICAgdGhpcy5fYWN0aXZlRml4dHVyZXMucHVzaChmaXh0dXJlKTtcbiAgICByZXR1cm4gZml4dHVyZTtcbiAgfVxufVxuXG5sZXQgX3Rlc3RCZWQ6IFRlc3RCZWQgPSBudWxsICE7XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVzdEJlZCgpIHtcbiAgcmV0dXJuIF90ZXN0QmVkID0gX3Rlc3RCZWQgfHwgbmV3IFRlc3RCZWQoKTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgaW5qZWN0aW5nIGRlcGVuZGVuY2llcyBpbiBgYmVmb3JlRWFjaCgpYCBhbmQgYGl0KClgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBiZWZvcmVFYWNoKGluamVjdChbRGVwZW5kZW5jeSwgQUNsYXNzXSwgKGRlcCwgb2JqZWN0KSA9PiB7XG4gKiAgIC8vIHNvbWUgY29kZSB0aGF0IHVzZXMgYGRlcGAgYW5kIGBvYmplY3RgXG4gKiAgIC8vIC4uLlxuICogfSkpO1xuICpcbiAqIGl0KCcuLi4nLCBpbmplY3QoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgb2JqZWN0LmRvU29tZXRoaW5nKCk7XG4gKiAgIGV4cGVjdCguLi4pO1xuICogfSlcbiAqIGBgYFxuICpcbiAqIE5vdGVzOlxuICogLSBpbmplY3QgaXMgY3VycmVudGx5IGEgZnVuY3Rpb24gYmVjYXVzZSBvZiBzb21lIFRyYWNldXIgbGltaXRhdGlvbiB0aGUgc3ludGF4IHNob3VsZFxuICogZXZlbnR1YWxseVxuICogICBiZWNvbWVzIGBpdCgnLi4uJywgQEluamVjdCAob2JqZWN0OiBBQ2xhc3MsIGFzeW5jOiBBc3luY1Rlc3RDb21wbGV0ZXIpID0+IHsgLi4uIH0pO2BcbiAqXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6ICgpID0+IGFueSB7XG4gIGNvbnN0IHRlc3RCZWQgPSBnZXRUZXN0QmVkKCk7XG4gIGlmICh0b2tlbnMuaW5kZXhPZihBc3luY1Rlc3RDb21wbGV0ZXIpID49IDApIHtcbiAgICAvLyBOb3QgdXNpbmcgYW4gYXJyb3cgZnVuY3Rpb24gdG8gcHJlc2VydmUgY29udGV4dCBwYXNzZWQgZnJvbSBjYWxsIHNpdGVcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBSZXR1cm4gYW4gYXN5bmMgdGVzdCBtZXRob2QgdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBpZiBBc3luY1Rlc3RDb21wbGV0ZXIgaXMgb25lIG9mXG4gICAgICAvLyB0aGUgaW5qZWN0ZWQgdG9rZW5zLlxuICAgICAgcmV0dXJuIHRlc3RCZWQuY29tcGlsZUNvbXBvbmVudHMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc3QgY29tcGxldGVyOiBBc3luY1Rlc3RDb21wbGV0ZXIgPSB0ZXN0QmVkLmdldChBc3luY1Rlc3RDb21wbGV0ZXIpO1xuICAgICAgICB0ZXN0QmVkLmV4ZWN1dGUodG9rZW5zLCBmbiwgdGhpcyk7XG4gICAgICAgIHJldHVybiBjb21wbGV0ZXIucHJvbWlzZTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGVzdEJlZC5leGVjdXRlKHRva2VucywgZm4sIHRoaXMpOyB9O1xuICB9XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY2xhc3MgSW5qZWN0U2V0dXBXcmFwcGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbW9kdWxlRGVmOiAoKSA9PiBUZXN0TW9kdWxlTWV0YWRhdGEpIHt9XG5cbiAgcHJpdmF0ZSBfYWRkTW9kdWxlKCkge1xuICAgIGNvbnN0IG1vZHVsZURlZiA9IHRoaXMuX21vZHVsZURlZigpO1xuICAgIGlmIChtb2R1bGVEZWYpIHtcbiAgICAgIGdldFRlc3RCZWQoKS5jb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZik7XG4gICAgfVxuICB9XG5cbiAgaW5qZWN0KHRva2VuczogYW55W10sIGZuOiBGdW5jdGlvbik6ICgpID0+IGFueSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fYWRkTW9kdWxlKCk7XG4gICAgICByZXR1cm4gaW5qZWN0KHRva2VucywgZm4pLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEpOiBJbmplY3RTZXR1cFdyYXBwZXI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aE1vZHVsZShtb2R1bGVEZWY6IFRlc3RNb2R1bGVNZXRhZGF0YSwgZm46IEZ1bmN0aW9uKTogKCkgPT4gYW55O1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhNb2R1bGUobW9kdWxlRGVmOiBUZXN0TW9kdWxlTWV0YWRhdGEsIGZuPzogRnVuY3Rpb24gfCBudWxsKTogKCgpID0+IGFueSl8XG4gICAgSW5qZWN0U2V0dXBXcmFwcGVyIHtcbiAgaWYgKGZuKSB7XG4gICAgLy8gTm90IHVzaW5nIGFuIGFycm93IGZ1bmN0aW9uIHRvIHByZXNlcnZlIGNvbnRleHQgcGFzc2VkIGZyb20gY2FsbCBzaXRlXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgdGVzdEJlZCA9IGdldFRlc3RCZWQoKTtcbiAgICAgIGlmIChtb2R1bGVEZWYpIHtcbiAgICAgICAgdGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKG1vZHVsZURlZik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gbmV3IEluamVjdFNldHVwV3JhcHBlcigoKSA9PiBtb2R1bGVEZWYpO1xufSJdfQ==