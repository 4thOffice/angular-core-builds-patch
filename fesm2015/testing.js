/**
 * @license Angular v6.1.0-rc.3+71.sha-0650f32
 * (c) 2010-2018 Google, Inc. https://angular.io/
 * License: MIT
 */

import { RendererFactory2, getDebugNode, Compiler, InjectionToken, Injector, ɵclearOverrides, ɵstringify, ɵoverrideComponentView, NgZone, ApplicationInitStatus, NgModule, ɵAPP_ROOT, Optional, SkipSelf, ɵoverrideProvider, Component, defineInjectable } from '@angular/core';
import { __decorate } from 'tslib';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const _global = (typeof window === 'undefined' ? global : window);
/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 *
 */
function asyncFallback(fn) {
    // If we're running using the Jasmine test framework, adapt to call the 'done'
    // function when asynchronous activity is finished.
    if (_global.jasmine) {
        // Not using an arrow function to preserve context passed from call site
        return function (done) {
            if (!done) {
                // if we run beforeEach in @angular/core/testing/testing_internal then we get no done
                // fake it here and assume sync.
                done = function () { };
                done.fail = function (e) { throw e; };
            }
            runInTestZone(fn, this, done, (err) => {
                if (typeof err === 'string') {
                    return done.fail(new Error(err));
                }
                else {
                    done.fail(err);
                }
            });
        };
    }
    // Otherwise, return a promise which will resolve when asynchronous activity
    // is finished. This will be correctly consumed by the Mocha framework with
    // it('...', async(myFn)); or can be used in a custom framework.
    // Not using an arrow function to preserve context passed from call site
    return function () {
        return new Promise((finishCallback, failCallback) => {
            runInTestZone(fn, this, finishCallback, failCallback);
        });
    };
}
function runInTestZone(fn, context, finishCallback, failCallback) {
    const currentZone = Zone.current;
    const AsyncTestZoneSpec = Zone['AsyncTestZoneSpec'];
    if (AsyncTestZoneSpec === undefined) {
        throw new Error('AsyncTestZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/async-test.js');
    }
    const ProxyZoneSpec = Zone['ProxyZoneSpec'];
    if (ProxyZoneSpec === undefined) {
        throw new Error('ProxyZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/proxy.js');
    }
    const proxyZoneSpec = ProxyZoneSpec.get();
    ProxyZoneSpec.assertPresent();
    // We need to create the AsyncTestZoneSpec outside the ProxyZone.
    // If we do it in ProxyZone then we will get to infinite recursion.
    const proxyZone = Zone.current.getZoneWith('ProxyZoneSpec');
    const previousDelegate = proxyZoneSpec.getDelegate();
    proxyZone.parent.run(() => {
        const testZoneSpec = new AsyncTestZoneSpec(() => {
            // Need to restore the original zone.
            currentZone.run(() => {
                if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                    // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                    proxyZoneSpec.setDelegate(previousDelegate);
                }
                finishCallback();
            });
        }, (error) => {
            // Need to restore the original zone.
            currentZone.run(() => {
                if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                    // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                    proxyZoneSpec.setDelegate(previousDelegate);
                }
                failCallback(error);
            });
        }, 'test');
        proxyZoneSpec.setDelegate(testZoneSpec);
    });
    return Zone.current.runGuarded(fn, context);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 *
 */
function async(fn) {
    const _Zone = typeof Zone !== 'undefined' ? Zone : null;
    if (!_Zone) {
        return function () {
            return Promise.reject('Zone is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/dist/zone.js');
        };
    }
    const asyncTest = _Zone && _Zone[_Zone.__symbol__('asyncTest')];
    if (typeof asyncTest === 'function') {
        return asyncTest(fn);
    }
    // not using new version of zone.js
    // TODO @JiaLiPassion, remove this after all library updated to
    // newest version of zone.js(0.8.25)
    return asyncFallback(fn);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Converts an `async` function, with `await`, into a function which is compatible with Jasmine test
 * framework.
 *
 * For asynchronous function blocks, Jasmine expects `it` (and friends) to take a function which
 * takes a `done` callback. (Jasmine does not understand functions which return `Promise`.) The
 * `jasmineAwait()` wrapper converts the test function returning `Promise` into a function which
 * Jasmine understands.
 *
 *
 * Example:
 * ```
 * it('...', jasmineAwait(async() => {
 *   doSomething();
 *   await asyncFn();
 *   doSomethingAfter();
 * }));
 * ```
 *
 */
function jasmineAwait(fn) {
    return function (done) {
        fn().then(done, done.fail);
    };
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Fixture for debugging and testing a component.
 *
 *
 */
class ComponentFixture {
    constructor(componentRef, ngZone, _autoDetect) {
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        this._autoDetect = _autoDetect;
        this._isStable = true;
        this._isDestroyed = false;
        this._resolve = null;
        this._promise = null;
        this._onUnstableSubscription = null;
        this._onStableSubscription = null;
        this._onMicrotaskEmptySubscription = null;
        this._onErrorSubscription = null;
        this.changeDetectorRef = componentRef.changeDetectorRef;
        this.elementRef = componentRef.location;
        this.debugElement = getDebugNode(this.elementRef.nativeElement);
        this.componentInstance = componentRef.instance;
        this.nativeElement = this.elementRef.nativeElement;
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        if (ngZone) {
            // Create subscriptions outside the NgZone so that the callbacks run oustide
            // of NgZone.
            ngZone.runOutsideAngular(() => {
                this._onUnstableSubscription =
                    ngZone.onUnstable.subscribe({ next: () => { this._isStable = false; } });
                this._onMicrotaskEmptySubscription = ngZone.onMicrotaskEmpty.subscribe({
                    next: () => {
                        if (this._autoDetect) {
                            // Do a change detection run with checkNoChanges set to true to check
                            // there are no changes on the second run.
                            this.detectChanges(true);
                        }
                    }
                });
                this._onStableSubscription = ngZone.onStable.subscribe({
                    next: () => {
                        this._isStable = true;
                        // Check whether there is a pending whenStable() completer to resolve.
                        if (this._promise !== null) {
                            // If so check whether there are no pending macrotasks before resolving.
                            // Do this check in the next tick so that ngZone gets a chance to update the state of
                            // pending macrotasks.
                            scheduleMicroTask(() => {
                                if (!ngZone.hasPendingMacrotasks) {
                                    if (this._promise !== null) {
                                        this._resolve(true);
                                        this._resolve = null;
                                        this._promise = null;
                                    }
                                }
                            });
                        }
                    }
                });
                this._onErrorSubscription =
                    ngZone.onError.subscribe({ next: (error) => { throw error; } });
            });
        }
    }
    _tick(checkNoChanges) {
        this.changeDetectorRef.detectChanges();
        if (checkNoChanges) {
            this.checkNoChanges();
        }
    }
    /**
     * Trigger a change detection cycle for the component.
     */
    detectChanges(checkNoChanges = true) {
        if (this.ngZone != null) {
            // Run the change detection inside the NgZone so that any async tasks as part of the change
            // detection are captured by the zone and can be waited for in isStable.
            this.ngZone.run(() => { this._tick(checkNoChanges); });
        }
        else {
            // Running without zone. Just do the change detection.
            this._tick(checkNoChanges);
        }
    }
    /**
     * Do a change detection run to make sure there were no changes.
     */
    checkNoChanges() { this.changeDetectorRef.checkNoChanges(); }
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     */
    autoDetectChanges(autoDetect = true) {
        if (this.ngZone == null) {
            throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
        }
        this._autoDetect = autoDetect;
        this.detectChanges();
    }
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    isStable() { return this._isStable && !this.ngZone.hasPendingMacrotasks; }
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    whenStable() {
        if (this.isStable()) {
            return Promise.resolve(false);
        }
        else if (this._promise !== null) {
            return this._promise;
        }
        else {
            this._promise = new Promise(res => { this._resolve = res; });
            return this._promise;
        }
    }
    _getRenderer() {
        if (this._renderer === undefined) {
            this._renderer = this.componentRef.injector.get(RendererFactory2, null);
        }
        return this._renderer;
    }
    /**
      * Get a promise that resolves when the ui state is stable following animations.
      */
    whenRenderingDone() {
        const renderer = this._getRenderer();
        if (renderer && renderer.whenRenderingDone) {
            return renderer.whenRenderingDone();
        }
        return this.whenStable();
    }
    /**
     * Trigger component destruction.
     */
    destroy() {
        if (!this._isDestroyed) {
            this.componentRef.destroy();
            if (this._onUnstableSubscription != null) {
                this._onUnstableSubscription.unsubscribe();
                this._onUnstableSubscription = null;
            }
            if (this._onStableSubscription != null) {
                this._onStableSubscription.unsubscribe();
                this._onStableSubscription = null;
            }
            if (this._onMicrotaskEmptySubscription != null) {
                this._onMicrotaskEmptySubscription.unsubscribe();
                this._onMicrotaskEmptySubscription = null;
            }
            if (this._onErrorSubscription != null) {
                this._onErrorSubscription.unsubscribe();
                this._onErrorSubscription = null;
            }
            this._isDestroyed = true;
        }
    }
}
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * fakeAsync has been moved to zone.js
 * this file is for fallback in case old version of zone.js is used
 */
const _Zone = typeof Zone !== 'undefined' ? Zone : null;
const FakeAsyncTestZoneSpec = _Zone && _Zone['FakeAsyncTestZoneSpec'];
const ProxyZoneSpec = _Zone && _Zone['ProxyZoneSpec'];
let _fakeAsyncTestZoneSpec = null;
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @experimental
 */
function resetFakeAsyncZoneFallback() {
    _fakeAsyncTestZoneSpec = null;
    // in node.js testing we may not have ProxyZoneSpec in which case there is nothing to reset.
    ProxyZoneSpec && ProxyZoneSpec.assertPresent().resetDelegate();
}
let _inFakeAsyncCall = false;
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns The function wrapped to be executed in the fakeAsync zone
 *
 * @experimental
 */
function fakeAsyncFallback(fn) {
    // Not using an arrow function to preserve context passed from call site
    return function (...args) {
        const proxyZoneSpec = ProxyZoneSpec.assertPresent();
        if (_inFakeAsyncCall) {
            throw new Error('fakeAsync() calls can not be nested');
        }
        _inFakeAsyncCall = true;
        try {
            if (!_fakeAsyncTestZoneSpec) {
                if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
                    throw new Error('fakeAsync() calls can not be nested');
                }
                _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
            }
            let res;
            const lastProxyZoneSpec = proxyZoneSpec.getDelegate();
            proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
            try {
                res = fn.apply(this, args);
                flushMicrotasksFallback();
            }
            finally {
                proxyZoneSpec.setDelegate(lastProxyZoneSpec);
            }
            if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                throw new Error(`${_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length} ` +
                    `periodic timer(s) still in the queue.`);
            }
            if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                throw new Error(`${_fakeAsyncTestZoneSpec.pendingTimers.length} timer(s) still in the queue.`);
            }
            return res;
        }
        finally {
            _inFakeAsyncCall = false;
            resetFakeAsyncZoneFallback();
        }
    };
}
function _getFakeAsyncZoneSpec() {
    if (_fakeAsyncTestZoneSpec == null) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
    return _fakeAsyncTestZoneSpec;
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @experimental
 */
function tickFallback(millis = 0) {
    _getFakeAsyncZoneSpec().tick(millis);
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * @param maxTurns
 * @returns The simulated time elapsed, in millis.
 *
 * @experimental
 */
function flushFallback(maxTurns) {
    return _getFakeAsyncZoneSpec().flush(maxTurns);
}
/**
 * Discard all remaining periodic tasks.
 *
 * @experimental
 */
function discardPeriodicTasksFallback() {
    const zoneSpec = _getFakeAsyncZoneSpec();
    const pendingTimers = zoneSpec.pendingPeriodicTimers;
    zoneSpec.pendingPeriodicTimers.length = 0;
}
/**
 * Flush any pending microtasks.
 *
 * @experimental
 */
function flushMicrotasksFallback() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const _Zone$1 = typeof Zone !== 'undefined' ? Zone : null;
const fakeAsyncTestModule = _Zone$1 && _Zone$1[_Zone$1.__symbol__('fakeAsyncTest')];
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @experimental
 */
function resetFakeAsyncZone() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.resetFakeAsyncZone();
    }
    else {
        return resetFakeAsyncZoneFallback();
    }
}
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @param fn
 * @returns The function wrapped to be executed in the fakeAsync zone
 *
 * @experimental
 */
function fakeAsync(fn) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.fakeAsync(fn);
    }
    else {
        return fakeAsyncFallback(fn);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * @experimental
 */
function tick(millis = 0) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.tick(millis);
    }
    else {
        return tickFallback(millis);
    }
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * @param maxTurns
 * @returns The simulated time elapsed, in millis.
 *
 * @experimental
 */
function flush(maxTurns) {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flush(maxTurns);
    }
    else {
        return flushFallback(maxTurns);
    }
}
/**
 * Discard all remaining periodic tasks.
 *
 * @experimental
 */
function discardPeriodicTasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.discardPeriodicTasks();
    }
    else {
        discardPeriodicTasksFallback();
    }
}
/**
 * Flush any pending microtasks.
 *
 * @experimental
 */
function flushMicrotasks() {
    if (fakeAsyncTestModule) {
        return fakeAsyncTestModule.flushMicrotasks();
    }
    else {
        return flushMicrotasksFallback();
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
class AsyncTestCompleter {
    constructor() {
        this._promise = new Promise((res, rej) => {
            this._resolve = res;
            this._reject = rej;
        });
    }
    done(value) { this._resolve(value); }
    fail(error, stackTrace) { this._reject(error); }
    get promise() { return this._promise; }
}

function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * @experimental
 */
class TestingCompiler extends Compiler {
    get injector() { throw unimplemented(); }
    overrideModule(module, overrides) {
        throw unimplemented();
    }
    overrideDirective(directive, overrides) {
        throw unimplemented();
    }
    overrideComponent(component, overrides) {
        throw unimplemented();
    }
    overridePipe(directive, overrides) {
        throw unimplemented();
    }
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    loadAotSummaries(summaries) { throw unimplemented(); }
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    getComponentFactory(component) { throw unimplemented(); }
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    getComponentFromError(error) { throw unimplemented(); }
}
TestingCompiler.ngInjectableDef = defineInjectable({ token: TestingCompiler, factory: function TestingCompiler_Factory() { return new TestingCompiler(); }, providedIn: null });
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
class TestingCompilerFactory {
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const UNDEFINED = new Object();
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
class TestComponentRenderer {
    insertRootElement(rootElementId) { }
}
let _nextRootElementId = 0;
/**
 * @experimental
 */
const ComponentFixtureAutoDetect = new InjectionToken('ComponentFixtureAutoDetect');
/**
 * @experimental
 */
const ComponentFixtureNoNgZone = new InjectionToken('ComponentFixtureNoNgZone');
/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 *
 */
class TestBed {
    constructor() {
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
        this._testEnvAotSummaries = () => [];
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
    static initTestEnvironment(ngModule, platform, aotSummaries) {
        const testBed = getTestBed();
        testBed.initTestEnvironment(ngModule, platform, aotSummaries);
        return testBed;
    }
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    static resetTestEnvironment() { getTestBed().resetTestEnvironment(); }
    static resetTestingModule() {
        getTestBed().resetTestingModule();
        return TestBed;
    }
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    static configureCompiler(config) {
        getTestBed().configureCompiler(config);
        return TestBed;
    }
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef) {
        getTestBed().configureTestingModule(moduleDef);
        return TestBed;
    }
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents() { return getTestBed().compileComponents(); }
    static overrideModule(ngModule, override) {
        getTestBed().overrideModule(ngModule, override);
        return TestBed;
    }
    static overrideComponent(component, override) {
        getTestBed().overrideComponent(component, override);
        return TestBed;
    }
    static overrideDirective(directive, override) {
        getTestBed().overrideDirective(directive, override);
        return TestBed;
    }
    static overridePipe(pipe, override) {
        getTestBed().overridePipe(pipe, override);
        return TestBed;
    }
    static overrideTemplate(component, template) {
        getTestBed().overrideComponent(component, { set: { template, templateUrl: null } });
        return TestBed;
    }
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component, template) {
        getTestBed().overrideTemplateUsingTestingModule(component, template);
        return TestBed;
    }
    static overrideProvider(token, provider) {
        getTestBed().overrideProvider(token, provider);
        return TestBed;
    }
    static deprecatedOverrideProvider(token, provider) {
        getTestBed().deprecatedOverrideProvider(token, provider);
        return TestBed;
    }
    static get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
        return getTestBed().get(token, notFoundValue);
    }
    static createComponent(component) {
        return getTestBed().createComponent(component);
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
     *
     * @experimental
     */
    resetTestEnvironment() {
        this.resetTestingModule();
        this.platform = null;
        this.ngModule = null;
        this._testEnvAotSummaries = () => [];
    }
    resetTestingModule() {
        ɵclearOverrides();
        this._aotSummaries = [];
        this._templateOverrides = [];
        this._compiler = null;
        this._moduleOverrides = [];
        this._componentOverrides = [];
        this._directiveOverrides = [];
        this._pipeOverrides = [];
        this._isRoot = true;
        this._rootProviderOverrides = [];
        this._moduleRef = null;
        this._moduleFactory = null;
        this._compilerOptions = [];
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._schemas = [];
        this._instantiated = false;
        this._activeFixtures.forEach((fixture) => {
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
    }
    configureCompiler(config) {
        this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
        this._compilerOptions.push(config);
    }
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
    compileComponents() {
        if (this._moduleFactory || this._instantiated) {
            return Promise.resolve(null);
        }
        const moduleType = this._createCompilerAndModule();
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
            .then((moduleAndComponentFactories) => {
            this._moduleFactory = moduleAndComponentFactories.ngModuleFactory;
        });
    }
    _initIfNeeded() {
        if (this._instantiated) {
            return;
        }
        if (!this._moduleFactory) {
            try {
                const moduleType = this._createCompilerAndModule();
                this._moduleFactory =
                    this._compiler.compileModuleAndAllComponentsSync(moduleType).ngModuleFactory;
            }
            catch (e) {
                const errorCompType = this._compiler.getComponentFromError(e);
                if (errorCompType) {
                    throw new Error(`This test module uses the component ${ɵstringify(errorCompType)} which is using a "templateUrl" or "styleUrls", but they were never compiled. ` +
                        `Please call "TestBed.compileComponents" before your test.`);
                }
                else {
                    throw e;
                }
            }
        }
        for (const { component, templateOf } of this._templateOverrides) {
            const compFactory = this._compiler.getComponentFactory(templateOf);
            ɵoverrideComponentView(component, compFactory);
        }
        const ngZone = new NgZone({ enableLongStackTrace: true });
        const providers = [{ provide: NgZone, useValue: ngZone }];
        const ngZoneInjector = Injector.create({
            providers: providers,
            parent: this.platform.injector,
            name: this._moduleFactory.moduleType.name
        });
        this._moduleRef = this._moduleFactory.create(ngZoneInjector);
        // ApplicationInitStatus.runInitializers() is marked @internal to core. So casting to any
        // before accessing it.
        this._moduleRef.injector.get(ApplicationInitStatus).runInitializers();
        this._instantiated = true;
    }
    _createCompilerAndModule() {
        const providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        const declarations = [...this._declarations, ...this._templateOverrides.map(entry => entry.templateOf)];
        const rootScopeImports = [];
        const rootProviderOverrides = this._rootProviderOverrides;
        if (this._isRoot) {
            let RootScopeModule = class RootScopeModule {
            };
            RootScopeModule = __decorate([
                NgModule({
                    providers: [
                        ...rootProviderOverrides,
                    ],
                    jit: true,
                })
            ], RootScopeModule);
            rootScopeImports.push(RootScopeModule);
        }
        providers.push({ provide: ɵAPP_ROOT, useValue: this._isRoot });
        const imports = [rootScopeImports, this.ngModule, this._imports];
        const schemas = this._schemas;
        let DynamicTestModule = class DynamicTestModule {
        };
        DynamicTestModule = __decorate([
            NgModule({ providers, declarations, imports, schemas, jit: true })
        ], DynamicTestModule);
        const compilerFactory = this.platform.injector.get(TestingCompilerFactory);
        this._compiler = compilerFactory.createTestingCompiler(this._compilerOptions);
        for (const summary of [this._testEnvAotSummaries, ...this._aotSummaries]) {
            this._compiler.loadAotSummaries(summary);
        }
        this._moduleOverrides.forEach((entry) => this._compiler.overrideModule(entry[0], entry[1]));
        this._componentOverrides.forEach((entry) => this._compiler.overrideComponent(entry[0], entry[1]));
        this._directiveOverrides.forEach((entry) => this._compiler.overrideDirective(entry[0], entry[1]));
        this._pipeOverrides.forEach((entry) => this._compiler.overridePipe(entry[0], entry[1]));
        return DynamicTestModule;
    }
    _assertNotInstantiated(methodName, methodDescription) {
        if (this._instantiated) {
            throw new Error(`Cannot ${methodDescription} when the test module has already been instantiated. ` +
                `Make sure you are not using \`inject\` before \`${methodName}\`.`);
        }
    }
    get(token, notFoundValue = Injector.THROW_IF_NOT_FOUND) {
        this._initIfNeeded();
        if (token === TestBed) {
            return this;
        }
        // Tests can inject things from the ng module and from the compiler,
        // but the ng module can't inject things from the compiler and vice versa.
        const result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    }
    execute(tokens, fn, context) {
        this._initIfNeeded();
        const params = tokens.map(t => this.get(t));
        return fn.apply(context, params);
    }
    overrideModule(ngModule, override) {
        this._assertNotInstantiated('overrideModule', 'override module metadata');
        this._moduleOverrides.push([ngModule, override]);
    }
    overrideComponent(component, override) {
        this._assertNotInstantiated('overrideComponent', 'override component metadata');
        this._componentOverrides.push([component, override]);
    }
    overrideDirective(directive, override) {
        this._assertNotInstantiated('overrideDirective', 'override directive metadata');
        this._directiveOverrides.push([directive, override]);
    }
    overridePipe(pipe, override) {
        this._assertNotInstantiated('overridePipe', 'override pipe metadata');
        this._pipeOverrides.push([pipe, override]);
    }
    overrideProvider(token, provider) {
        this.overrideProviderImpl(token, provider);
    }
    deprecatedOverrideProvider(token, provider) {
        this.overrideProviderImpl(token, provider, /* deprecated */ true);
    }
    overrideProviderImpl(token, provider, deprecated = false) {
        if (typeof token !== 'string' && token.ngInjectableDef &&
            token.ngInjectableDef.providedIn === 'root') {
            if (provider.useFactory) {
                this._rootProviderOverrides.push({ provide: token, useFactory: provider.useFactory, deps: provider.deps || [] });
            }
            else {
                this._rootProviderOverrides.push({ provide: token, useValue: provider.useValue });
            }
        }
        let flags = 0;
        let value;
        if (provider.useFactory) {
            flags |= 1024 /* TypeFactoryProvider */;
            value = provider.useFactory;
        }
        else {
            flags |= 256 /* TypeValueProvider */;
            value = provider.useValue;
        }
        const deps = (provider.deps || []).map((dep) => {
            let depFlags = 0 /* None */;
            let depToken;
            if (Array.isArray(dep)) {
                dep.forEach((entry) => {
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
        ɵoverrideProvider({ token, flags, deps, value, deprecatedBehavior: deprecated });
    }
    overrideTemplateUsingTestingModule(component, template) {
        this._assertNotInstantiated('overrideTemplateUsingTestingModule', 'override template');
        let OverrideComponent = class OverrideComponent {
        };
        OverrideComponent = __decorate([
            Component({ selector: 'empty', template, jit: true })
        ], OverrideComponent);
        this._templateOverrides.push({ component, templateOf: OverrideComponent });
    }
    createComponent(component) {
        this._initIfNeeded();
        const componentFactory = this._compiler.getComponentFactory(component);
        if (!componentFactory) {
            throw new Error(`Cannot create the component ${ɵstringify(component)} as it was not imported into the testing module!`);
        }
        const noNgZone = this.get(ComponentFixtureNoNgZone, false);
        const autoDetect = this.get(ComponentFixtureAutoDetect, false);
        const ngZone = noNgZone ? null : this.get(NgZone, null);
        const testComponentRenderer = this.get(TestComponentRenderer);
        const rootElId = `root${_nextRootElementId++}`;
        testComponentRenderer.insertRootElement(rootElId);
        const initComponent = () => {
            const componentRef = componentFactory.create(Injector.NULL, [], `#${rootElId}`, this._moduleRef);
            return new ComponentFixture(componentRef, ngZone, autoDetect);
        };
        const fixture = !ngZone ? initComponent() : ngZone.run(initComponent);
        this._activeFixtures.push(fixture);
        return fixture;
    }
}
let _testBed = null;
/**
 * @experimental
 */
function getTestBed() {
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
function inject(tokens, fn) {
    const testBed = getTestBed();
    if (tokens.indexOf(AsyncTestCompleter) >= 0) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of
            // the injected tokens.
            return testBed.compileComponents().then(() => {
                const completer = testBed.get(AsyncTestCompleter);
                testBed.execute(tokens, fn, this);
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
class InjectSetupWrapper {
    constructor(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    _addModule() {
        const moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
        }
    }
    inject(tokens, fn) {
        const self = this;
        // Not using an arrow function to preserve context passed from call site
        return function () {
            self._addModule();
            return inject(tokens, fn).call(this);
        };
    }
}
function withModule(moduleDef, fn) {
    if (fn) {
        // Not using an arrow function to preserve context passed from call site
        return function () {
            const testBed = getTestBed();
            if (moduleDef) {
                testBed.configureTestingModule(moduleDef);
            }
            return fn.apply(this);
        };
    }
    return new InjectSetupWrapper(() => moduleDef);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const _global$1 = (typeof window === 'undefined' ? global : window);
// Reset the test providers and the fake async zone before each test.
if (_global$1.beforeEach) {
    _global$1.beforeEach(() => {
        TestBed.resetTestingModule();
        resetFakeAsyncZone();
    });
}
// TODO(juliemr): remove this, only used because we need to export something to have compilation
// work.
const __core_private_testing_placeholder__ = '';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
* Wraps a function in a new function which sets up document and HTML for running a test.
*
* This function is intended to wrap an existing testing function. The wrapper
* adds HTML to the `body` element of the `document` and subsequently tears it down.
*
* This function is intended to be used with `async await` and `Promise`s. If the wrapped
* function returns a promise (or is `async`) then the teardown is delayed until that `Promise`
* is resolved.
*
* On `node` this function detects if `document` is present and if not it will create one by
* loading `domino` and installing it.
*
* Example:
*
* ```
* describe('something', () => {
*   it('should do something', withBody('<my-app></my-app>', async () => {
*     const myApp = renderComponent(MyApp);
*     await whenRendered(myApp);
*     expect(getRenderedText(myApp)).toEqual('Hello World!');
*   }));
* });
* ```
*
* @param html HTML which should be inserted into `body` of the `document`.
* @param blockFn function to wrap. The function can return promise or be `async`.
* @experimental
*/
function withBody(html, blockFn) {
    return function (done) {
        ensureDocument();
        if (typeof blockFn === 'function') {
            document.body.innerHTML = html;
            // TODO(i): I'm not sure why a cast is required here but otherwise I get
            //   TS2349: Cannot invoke an expression whose type lacks a call signature. Type 'never' has
            //   no compatible call signatures.
            let blockReturn = blockFn();
            if (blockReturn instanceof Promise) {
                blockReturn = blockReturn.then(done, done.fail);
            }
            else {
                done();
            }
        }
    };
}
let savedDocument = undefined;
let savedRequestAnimationFrame = undefined;
let savedNode = undefined;
let requestAnimationFrameCount = 0;
/**
 * System.js uses regexp to look for `require` statements. `domino` has to be
 * extracted into a constant so that the regexp in the System.js does not match
 * and does not try to load domino in the browser.
 */
const domino = (function (domino) {
    if (typeof global == 'object' && global.process && typeof require == 'function') {
        try {
            return require(domino);
        }
        catch (e) {
            // It is possible that we don't have domino available in which case just give up.
        }
    }
    // Seems like we don't have domino, give up.
    return null;
})('domino');
/**
 * Ensure that global has `Document` if we are in node.js
 * @experimental
 */
function ensureDocument() {
    if (domino) {
        // we are in node.js.
        const window = domino.createWindow('', 'http://localhost');
        savedDocument = global.document;
        global.window = window;
        global.document = window.document;
        // Trick to avoid Event patching from
        // https://github.com/angular/angular/blob/7cf5e95ac9f0f2648beebf0d5bd9056b79946970/packages/platform-browser/src/dom/events/dom_events.ts#L112-L132
        // It fails with Domino with TypeError: Cannot assign to read only property
        // 'stopImmediatePropagation' of object '#<Event>'
        global.Event = null;
        savedNode = global.Node;
        global.Node = domino.impl.Node;
        savedRequestAnimationFrame = global.requestAnimationFrame;
        global.requestAnimationFrame = function (cb) {
            setImmediate(cb);
            return requestAnimationFrameCount++;
        };
    }
}
/**
 * Restore the state of `Document` between tests.
 * @experimental
 */
function cleanupDocument() {
    if (savedDocument) {
        global.document = savedDocument;
        global.window = undefined;
        savedDocument = undefined;
    }
    if (savedNode) {
        global.Node = savedNode;
        savedNode = undefined;
    }
    if (savedRequestAnimationFrame) {
        global.requestAnimationFrame = savedRequestAnimationFrame;
        savedRequestAnimationFrame = undefined;
    }
}
if (typeof beforeEach == 'function')
    beforeEach(ensureDocument);
if (typeof afterEach == 'function')
    beforeEach(cleanupDocument);

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// This file only reexports content of the `src` folder. Keep it that way.

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

export { async, jasmineAwait, ComponentFixture, resetFakeAsyncZone, fakeAsync, tick, flush, discardPeriodicTasks, flushMicrotasks, TestComponentRenderer, ComponentFixtureAutoDetect, ComponentFixtureNoNgZone, TestBed, getTestBed, inject, InjectSetupWrapper, withModule, __core_private_testing_placeholder__, TestingCompiler as ɵTestingCompiler, TestingCompilerFactory as ɵTestingCompilerFactory, withBody, ensureDocument, cleanupDocument };
//# sourceMappingURL=testing.js.map
