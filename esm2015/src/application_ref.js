/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/application_ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import './util/ng_jit_mode';
import { merge, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApplicationInitStatus } from './application_init';
import { APP_BOOTSTRAP_LISTENER, PLATFORM_INITIALIZER } from './application_tokens';
import { getCompilerFacade } from './compiler/compiler_facade';
import { Console } from './console';
import { Injectable, InjectionToken, Injector } from './di';
import { INJECTOR_SCOPE } from './di/scope';
import { ErrorHandler } from './error_handler';
import { DEFAULT_LOCALE_ID } from './i18n/localization';
import { LOCALE_ID } from './i18n/tokens';
import { ivyEnabled } from './ivy_switch';
import { COMPILER_OPTIONS, CompilerFactory } from './linker/compiler';
import { ComponentFactory } from './linker/component_factory';
import { ComponentFactoryBoundToModule, ComponentFactoryResolver } from './linker/component_factory_resolver';
import { NgModuleRef } from './linker/ng_module_factory';
import { isComponentResourceResolutionQueueEmpty, resolveComponentResources } from './metadata/resource_loading';
import { assertNgModuleType } from './render3/assert';
import { setLocaleId } from './render3/i18n';
import { setJitOptions } from './render3/jit/jit_options';
import { NgModuleFactory as R3NgModuleFactory } from './render3/ng_module_ref';
import { publishDefaultGlobalUtils as _publishDefaultGlobalUtils } from './render3/util/global_utils';
import { Testability, TestabilityRegistry } from './testability/testability';
import { isDevMode } from './util/is_dev_mode';
import { isPromise } from './util/lang';
import { scheduleMicroTask } from './util/microtask';
import { stringify } from './util/stringify';
import { NgZone, NoopNgZone } from './zone/ng_zone';
/** @type {?} */
let _platform;
/** @type {?} */
let compileNgModuleFactory = compileNgModuleFactory__PRE_R3__;
/**
 * @template M
 * @param {?} injector
 * @param {?} options
 * @param {?} moduleType
 * @return {?}
 */
function compileNgModuleFactory__PRE_R3__(injector, options, moduleType) {
    /** @type {?} */
    const compilerFactory = injector.get(CompilerFactory);
    /** @type {?} */
    const compiler = compilerFactory.createCompiler([options]);
    return compiler.compileModuleAsync(moduleType);
}
/**
 * @template M
 * @param {?} injector
 * @param {?} options
 * @param {?} moduleType
 * @return {?}
 */
export function compileNgModuleFactory__POST_R3__(injector, options, moduleType) {
    ngDevMode && assertNgModuleType(moduleType);
    /** @type {?} */
    const compilerOptions = injector.get(COMPILER_OPTIONS, []).concat(options);
    if (typeof ngJitMode === 'undefined' || ngJitMode) {
        // Configure the compiler to use the provided options. This call may fail when multiple modules
        // are bootstrapped with incompatible options, as a component can only be compiled according to
        // a single set of options.
        setJitOptions({
            defaultEncapsulation: _lastDefined(compilerOptions.map((/**
             * @param {?} options
             * @return {?}
             */
            options => options.defaultEncapsulation))),
            preserveWhitespaces: _lastDefined(compilerOptions.map((/**
             * @param {?} options
             * @return {?}
             */
            options => options.preserveWhitespaces))),
        });
    }
    /** @type {?} */
    const moduleFactory = new R3NgModuleFactory(moduleType);
    if (isComponentResourceResolutionQueueEmpty()) {
        return Promise.resolve(moduleFactory);
    }
    /** @type {?} */
    const compilerProviders = _mergeArrays(compilerOptions.map((/**
     * @param {?} o
     * @return {?}
     */
    o => (/** @type {?} */ (o.providers)))));
    // In case there are no compiler providers, we just return the module factory as
    // there won't be any resource loader. This can happen with Ivy, because AOT compiled
    // modules can be still passed through "bootstrapModule". In that case we shouldn't
    // unnecessarily require the JIT compiler.
    if (compilerProviders.length === 0) {
        return Promise.resolve(moduleFactory);
    }
    /** @type {?} */
    const compiler = getCompilerFacade();
    /** @type {?} */
    const compilerInjector = Injector.create({ providers: compilerProviders });
    /** @type {?} */
    const resourceLoader = compilerInjector.get(compiler.ResourceLoader);
    // The resource loader can also return a string while the "resolveComponentResources"
    // always expects a promise. Therefore we need to wrap the returned value in a promise.
    return resolveComponentResources((/**
     * @param {?} url
     * @return {?}
     */
    url => Promise.resolve(resourceLoader.get(url))))
        .then((/**
     * @return {?}
     */
    () => moduleFactory));
}
// the `window.ng` global utilities are only available in non-VE versions of
// Angular. The function switch below will make sure that the code is not
// included into Angular when PRE mode is active.
/**
 * @return {?}
 */
export function publishDefaultGlobalUtils__PRE_R3__() { }
/**
 * @return {?}
 */
export function publishDefaultGlobalUtils__POST_R3__() {
    ngDevMode && _publishDefaultGlobalUtils();
}
/** @type {?} */
let publishDefaultGlobalUtils = publishDefaultGlobalUtils__PRE_R3__;
/** @type {?} */
let isBoundToModule = isBoundToModule__PRE_R3__;
/**
 * @template C
 * @param {?} cf
 * @return {?}
 */
export function isBoundToModule__PRE_R3__(cf) {
    return cf instanceof ComponentFactoryBoundToModule;
}
/**
 * @template C
 * @param {?} cf
 * @return {?}
 */
export function isBoundToModule__POST_R3__(cf) {
    return ((/** @type {?} */ (cf))).isBoundToModule;
}
/** @type {?} */
export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken('AllowMultipleToken');
/**
 * A token for third-party components that can register themselves with NgProbe.
 *
 * \@publicApi
 */
export class NgProbeToken {
    /**
     * @param {?} name
     * @param {?} token
     */
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
if (false) {
    /** @type {?} */
    NgProbeToken.prototype.name;
    /** @type {?} */
    NgProbeToken.prototype.token;
}
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * \@publicApi
 * @param {?} injector
 * @return {?}
 */
export function createPlatform(injector) {
    if (_platform && !_platform.destroyed &&
        !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
        throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
    }
    publishDefaultGlobalUtils();
    _platform = injector.get(PlatformRef);
    /** @type {?} */
    const inits = injector.get(PLATFORM_INITIALIZER, null);
    if (inits)
        inits.forEach((/**
         * @param {?} init
         * @return {?}
         */
        (init) => init()));
    return _platform;
}
/**
 * Creates a factory for a platform
 *
 * \@publicApi
 * @param {?} parentPlatformFactory
 * @param {?} name
 * @param {?=} providers
 * @return {?}
 */
export function createPlatformFactory(parentPlatformFactory, name, providers = []) {
    /** @type {?} */
    const desc = `Platform: ${name}`;
    /** @type {?} */
    const marker = new InjectionToken(desc);
    return (/**
     * @param {?=} extraProviders
     * @return {?}
     */
    (extraProviders = []) => {
        /** @type {?} */
        let platform = getPlatform();
        if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
            if (parentPlatformFactory) {
                parentPlatformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
            }
            else {
                /** @type {?} */
                const injectedProviders = providers.concat(extraProviders).concat({ provide: marker, useValue: true }, {
                    provide: INJECTOR_SCOPE,
                    useValue: 'platform'
                });
                createPlatform(Injector.create({ providers: injectedProviders, name: desc }));
            }
        }
        return assertPlatform(marker);
    });
}
/**
 * Checks that there currently is a platform which contains the given token as a provider.
 *
 * \@publicApi
 * @param {?} requiredToken
 * @return {?}
 */
export function assertPlatform(requiredToken) {
    /** @type {?} */
    const platform = getPlatform();
    if (!platform) {
        throw new Error('No platform exists!');
    }
    if (!platform.injector.get(requiredToken, null)) {
        throw new Error('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
/**
 * Destroy the existing platform.
 *
 * \@publicApi
 * @return {?}
 */
export function destroyPlatform() {
    if (_platform && !_platform.destroyed) {
        _platform.destroy();
    }
}
/**
 * Returns the current platform.
 *
 * \@publicApi
 * @return {?}
 */
export function getPlatform() {
    return _platform && !_platform.destroyed ? _platform : null;
}
/**
 * Provides additional options to the bootstraping process.
 *
 *
 * @record
 */
export function BootstrapOptions() { }
if (false) {
    /**
     * Optionally specify which `NgZone` should be used.
     *
     * - Provide your own `NgZone` instance.
     * - `zone.js` - Use default `NgZone` which requires `Zone.js`.
     * - `noop` - Use `NoopNgZone` which does nothing.
     * @type {?|undefined}
     */
    BootstrapOptions.prototype.ngZone;
    /**
     * Optionally specify coalescing event change detections or not.
     * Consider the following case.
     *
     * <div (click)="doSomething()">
     *   <button (click)="doSomethingElse()"></button>
     * </div>
     *
     * When button is clicked, because of the event bubbling, both
     * event handlers will be called and 2 change detections will be
     * triggered. We can colesce such kind of events to only trigger
     * change detection only once.
     *
     * By default, this option will be false. So the events will not be
     * coalesced and the change detection will be triggered multiple times.
     * And if this option be set to true, the change detection will be
     * triggered async by scheduling a animation frame. So in the case above,
     * the change detection will only be trigged once.
     * @type {?|undefined}
     */
    BootstrapOptions.prototype.ngZoneEventCoalescing;
}
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when a platform is created via a platform factory
 * (e.g. {\@link platformBrowser}), or explicitly by calling the {\@link createPlatform} function.
 *
 * \@publicApi
 */
let PlatformRef = /** @class */ (() => {
    /**
     * The Angular platform is the entry point for Angular on a web page. Each page
     * has exactly one platform, and services (such as reflection) which are common
     * to every Angular application running on the page are bound in its scope.
     *
     * A page's platform is initialized implicitly when a platform is created via a platform factory
     * (e.g. {\@link platformBrowser}), or explicitly by calling the {\@link createPlatform} function.
     *
     * \@publicApi
     */
    class PlatformRef {
        /**
         * \@internal
         * @param {?} _injector
         */
        constructor(_injector) {
            this._injector = _injector;
            this._modules = [];
            this._destroyListeners = [];
            this._destroyed = false;
        }
        /**
         * Creates an instance of an `\@NgModule` for the given platform
         * for offline compilation.
         *
         * \@usageNotes
         * ### Simple Example
         *
         * ```typescript
         * my_module.ts:
         *
         * \@NgModule({
         *   imports: [BrowserModule]
         * })
         * class MyModule {}
         *
         * main.ts:
         * import {MyModuleNgFactory} from './my_module.ngfactory';
         * import {platformBrowser} from '\@angular/platform-browser';
         *
         * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
         * ```
         * @template M
         * @param {?} moduleFactory
         * @param {?=} options
         * @return {?}
         */
        bootstrapModuleFactory(moduleFactory, options) {
            // Note: We need to create the NgZone _before_ we instantiate the module,
            // as instantiating the module creates some providers eagerly.
            // So we create a mini parent injector that just contains the new NgZone and
            // pass that as parent to the NgModuleFactory.
            /** @type {?} */
            const ngZoneOption = options ? options.ngZone : undefined;
            /** @type {?} */
            const ngZoneEventCoalescing = (options && options.ngZoneEventCoalescing) || false;
            /** @type {?} */
            const ngZone = getNgZone(ngZoneOption, ngZoneEventCoalescing);
            /** @type {?} */
            const providers = [{ provide: NgZone, useValue: ngZone }];
            // Attention: Don't use ApplicationRef.run here,
            // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
            return ngZone.run((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const ngZoneInjector = Injector.create({ providers: providers, parent: this.injector, name: moduleFactory.moduleType.name });
                /** @type {?} */
                const moduleRef = (/** @type {?} */ (moduleFactory.create(ngZoneInjector)));
                /** @type {?} */
                const exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                if (!exceptionHandler) {
                    throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
                }
                moduleRef.onDestroy((/**
                 * @return {?}
                 */
                () => remove(this._modules, moduleRef)));
                (/** @type {?} */ (ngZone)).runOutsideAngular((/**
                 * @return {?}
                 */
                () => (/** @type {?} */ (ngZone)).onError.subscribe({
                    next: (/**
                     * @param {?} error
                     * @return {?}
                     */
                    (error) => {
                        exceptionHandler.handleError(error);
                    })
                })));
                return _callAndReportToErrorHandler(exceptionHandler, (/** @type {?} */ (ngZone)), (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const initStatus = moduleRef.injector.get(ApplicationInitStatus);
                    initStatus.runInitializers();
                    return initStatus.donePromise.then((/**
                     * @return {?}
                     */
                    () => {
                        if (ivyEnabled) {
                            // If the `LOCALE_ID` provider is defined at bootstrap then we set the value for ivy
                            /** @type {?} */
                            const localeId = moduleRef.injector.get(LOCALE_ID, DEFAULT_LOCALE_ID);
                            setLocaleId(localeId || DEFAULT_LOCALE_ID);
                        }
                        this._moduleDoBootstrap(moduleRef);
                        return moduleRef;
                    }));
                }));
            }));
        }
        /**
         * Creates an instance of an `\@NgModule` for a given platform using the given runtime compiler.
         *
         * \@usageNotes
         * ### Simple Example
         *
         * ```typescript
         * \@NgModule({
         *   imports: [BrowserModule]
         * })
         * class MyModule {}
         *
         * let moduleRef = platformBrowser().bootstrapModule(MyModule);
         * ```
         *
         * @template M
         * @param {?} moduleType
         * @param {?=} compilerOptions
         * @return {?}
         */
        bootstrapModule(moduleType, compilerOptions = []) {
            /** @type {?} */
            const options = optionsReducer({}, compilerOptions);
            return compileNgModuleFactory(this.injector, options, moduleType)
                .then((/**
             * @param {?} moduleFactory
             * @return {?}
             */
            moduleFactory => this.bootstrapModuleFactory(moduleFactory, options)));
        }
        /**
         * @private
         * @param {?} moduleRef
         * @return {?}
         */
        _moduleDoBootstrap(moduleRef) {
            /** @type {?} */
            const appRef = (/** @type {?} */ (moduleRef.injector.get(ApplicationRef)));
            if (moduleRef._bootstrapComponents.length > 0) {
                moduleRef._bootstrapComponents.forEach((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => appRef.bootstrap(f)));
            }
            else if (moduleRef.instance.ngDoBootstrap) {
                moduleRef.instance.ngDoBootstrap(appRef);
            }
            else {
                throw new Error(`The module ${stringify(moduleRef.instance
                    .constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. ` +
                    `Please define one of these.`);
            }
            this._modules.push(moduleRef);
        }
        /**
         * Register a listener to be called when the platform is disposed.
         * @param {?} callback
         * @return {?}
         */
        onDestroy(callback) {
            this._destroyListeners.push(callback);
        }
        /**
         * Retrieve the platform {\@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         * @return {?}
         */
        get injector() {
            return this._injector;
        }
        /**
         * Destroy the Angular platform and all Angular applications on the page.
         * @return {?}
         */
        destroy() {
            if (this._destroyed) {
                throw new Error('The platform has already been destroyed!');
            }
            this._modules.slice().forEach((/**
             * @param {?} module
             * @return {?}
             */
            module => module.destroy()));
            this._destroyListeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            listener => listener()));
            this._destroyed = true;
        }
        /**
         * @return {?}
         */
        get destroyed() {
            return this._destroyed;
        }
    }
    PlatformRef.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PlatformRef.ctorParameters = () => [
        { type: Injector }
    ];
    return PlatformRef;
})();
export { PlatformRef };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PlatformRef.prototype._modules;
    /**
     * @type {?}
     * @private
     */
    PlatformRef.prototype._destroyListeners;
    /**
     * @type {?}
     * @private
     */
    PlatformRef.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    PlatformRef.prototype._injector;
}
/**
 * @param {?} ngZoneOption
 * @param {?} ngZoneEventCoalescing
 * @return {?}
 */
function getNgZone(ngZoneOption, ngZoneEventCoalescing) {
    /** @type {?} */
    let ngZone;
    if (ngZoneOption === 'noop') {
        ngZone = new NoopNgZone();
    }
    else {
        ngZone = (ngZoneOption === 'zone.js' ? undefined : ngZoneOption) || new NgZone({
            enableLongStackTrace: isDevMode(),
            shouldCoalesceEventChangeDetection: ngZoneEventCoalescing
        });
    }
    return ngZone;
}
/**
 * @param {?} errorHandler
 * @param {?} ngZone
 * @param {?} callback
 * @return {?}
 */
function _callAndReportToErrorHandler(errorHandler, ngZone, callback) {
    try {
        /** @type {?} */
        const result = callback();
        if (isPromise(result)) {
            return result.catch((/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => errorHandler.handleError(e)));
                // rethrow as the exception handler might not do it
                throw e;
            }));
        }
        return result;
    }
    catch (e) {
        ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => errorHandler.handleError(e)));
        // rethrow as the exception handler might not do it
        throw e;
    }
}
/**
 * @template T
 * @param {?} dst
 * @param {?} objs
 * @return {?}
 */
function optionsReducer(dst, objs) {
    if (Array.isArray(objs)) {
        dst = objs.reduce(optionsReducer, dst);
    }
    else {
        dst = Object.assign(Object.assign({}, dst), ((/** @type {?} */ (objs))));
    }
    return dst;
}
/**
 * A reference to an Angular application running on a page.
 *
 * \@usageNotes
 *
 * {\@a is-stable-examples}
 * ### isStable examples and caveats
 *
 * Note two important points about `isStable`, demonstrated in the examples below:
 * - the application will never be stable if you start any kind
 * of recurrent asynchronous task when the application starts
 * (for example for a polling process, started with a `setInterval`, a `setTimeout`
 * or using RxJS operators like `interval`);
 * - the `isStable` Observable runs outside of the Angular zone.
 *
 * Let's imagine that you start a recurrent task
 * (here incrementing a counter, using RxJS `interval`),
 * and at the same time subscribe to `isStable`.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *      filter(stable => stable)
 *   ).subscribe(() => console.log('App is stable now');
 *   interval(1000).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, `isStable` will never emit `true`,
 * and the trace "App is stable now" will never get logged.
 *
 * If you want to execute something when the app is stable,
 * you have to wait for the application to be stable
 * before starting your polling process.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     tap(stable => console.log('App is stable now')),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => console.log(counter));
 * }
 * ```
 * In this example, the trace "App is stable now" will be logged
 * and then the counter starts incrementing every second.
 *
 * Note also that this Observable runs outside of the Angular zone,
 * which means that the code in the subscription
 * to this Observable will not trigger the change detection.
 *
 * Let's imagine that instead of logging the counter value,
 * you update a field of your component
 * and display it in its template.
 *
 * ```
 * constructor(appRef: ApplicationRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => this.value = counter);
 * }
 * ```
 * As the `isStable` Observable runs outside the zone,
 * the `value` field will be updated properly,
 * but the template will not be refreshed!
 *
 * You'll have to manually trigger the change detection to update the template.
 *
 * ```
 * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => {
 *     this.value = counter;
 *     cd.detectChanges();
 *   });
 * }
 * ```
 *
 * Or make the subscription callback run inside the zone.
 *
 * ```
 * constructor(appRef: ApplicationRef, zone: NgZone) {
 *   appRef.isStable.pipe(
 *     first(stable => stable),
 *     switchMap(() => interval(1000))
 *   ).subscribe(counter => zone.run(() => this.value = counter));
 * }
 * ```
 *
 * \@publicApi
 */
let ApplicationRef = /** @class */ (() => {
    /**
     * A reference to an Angular application running on a page.
     *
     * \@usageNotes
     *
     * {\@a is-stable-examples}
     * ### isStable examples and caveats
     *
     * Note two important points about `isStable`, demonstrated in the examples below:
     * - the application will never be stable if you start any kind
     * of recurrent asynchronous task when the application starts
     * (for example for a polling process, started with a `setInterval`, a `setTimeout`
     * or using RxJS operators like `interval`);
     * - the `isStable` Observable runs outside of the Angular zone.
     *
     * Let's imagine that you start a recurrent task
     * (here incrementing a counter, using RxJS `interval`),
     * and at the same time subscribe to `isStable`.
     *
     * ```
     * constructor(appRef: ApplicationRef) {
     *   appRef.isStable.pipe(
     *      filter(stable => stable)
     *   ).subscribe(() => console.log('App is stable now');
     *   interval(1000).subscribe(counter => console.log(counter));
     * }
     * ```
     * In this example, `isStable` will never emit `true`,
     * and the trace "App is stable now" will never get logged.
     *
     * If you want to execute something when the app is stable,
     * you have to wait for the application to be stable
     * before starting your polling process.
     *
     * ```
     * constructor(appRef: ApplicationRef) {
     *   appRef.isStable.pipe(
     *     first(stable => stable),
     *     tap(stable => console.log('App is stable now')),
     *     switchMap(() => interval(1000))
     *   ).subscribe(counter => console.log(counter));
     * }
     * ```
     * In this example, the trace "App is stable now" will be logged
     * and then the counter starts incrementing every second.
     *
     * Note also that this Observable runs outside of the Angular zone,
     * which means that the code in the subscription
     * to this Observable will not trigger the change detection.
     *
     * Let's imagine that instead of logging the counter value,
     * you update a field of your component
     * and display it in its template.
     *
     * ```
     * constructor(appRef: ApplicationRef) {
     *   appRef.isStable.pipe(
     *     first(stable => stable),
     *     switchMap(() => interval(1000))
     *   ).subscribe(counter => this.value = counter);
     * }
     * ```
     * As the `isStable` Observable runs outside the zone,
     * the `value` field will be updated properly,
     * but the template will not be refreshed!
     *
     * You'll have to manually trigger the change detection to update the template.
     *
     * ```
     * constructor(appRef: ApplicationRef, cd: ChangeDetectorRef) {
     *   appRef.isStable.pipe(
     *     first(stable => stable),
     *     switchMap(() => interval(1000))
     *   ).subscribe(counter => {
     *     this.value = counter;
     *     cd.detectChanges();
     *   });
     * }
     * ```
     *
     * Or make the subscription callback run inside the zone.
     *
     * ```
     * constructor(appRef: ApplicationRef, zone: NgZone) {
     *   appRef.isStable.pipe(
     *     first(stable => stable),
     *     switchMap(() => interval(1000))
     *   ).subscribe(counter => zone.run(() => this.value = counter));
     * }
     * ```
     *
     * \@publicApi
     */
    class ApplicationRef {
        /**
         * \@internal
         * @param {?} _zone
         * @param {?} _console
         * @param {?} _injector
         * @param {?} _exceptionHandler
         * @param {?} _componentFactoryResolver
         * @param {?} _initStatus
         */
        constructor(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
            this._zone = _zone;
            this._console = _console;
            this._injector = _injector;
            this._exceptionHandler = _exceptionHandler;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._initStatus = _initStatus;
            /**
             * \@internal
             */
            this._bootstrapListeners = [];
            this._views = [];
            this._runningTick = false;
            this._enforceNoNewChanges = false;
            this._stable = true;
            /**
             * Get a list of component types registered to this application.
             * This list is populated even before the component is created.
             */
            this.componentTypes = [];
            /**
             * Get a list of components registered to this application.
             */
            this.components = [];
            this._enforceNoNewChanges = isDevMode();
            this._zone.onMicrotaskEmpty.subscribe({
                next: (/**
                 * @return {?}
                 */
                () => {
                    this._zone.run((/**
                     * @return {?}
                     */
                    () => {
                        this.tick();
                    }));
                })
            });
            /** @type {?} */
            const isCurrentlyStable = new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks &&
                    !this._zone.hasPendingMicrotasks;
                this._zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    observer.next(this._stable);
                    observer.complete();
                }));
            }));
            /** @type {?} */
            const isStable = new Observable((/**
             * @param {?} observer
             * @return {?}
             */
            (observer) => {
                // Create the subscription to onStable outside the Angular Zone so that
                // the callback is run outside the Angular Zone.
                /** @type {?} */
                let stableSub;
                this._zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => {
                    stableSub = this._zone.onStable.subscribe((/**
                     * @return {?}
                     */
                    () => {
                        NgZone.assertNotInAngularZone();
                        // Check whether there are no pending macro/micro tasks in the next tick
                        // to allow for NgZone to update the state.
                        scheduleMicroTask((/**
                         * @return {?}
                         */
                        () => {
                            if (!this._stable && !this._zone.hasPendingMacrotasks &&
                                !this._zone.hasPendingMicrotasks) {
                                this._stable = true;
                                observer.next(true);
                            }
                        }));
                    }));
                }));
                /** @type {?} */
                const unstableSub = this._zone.onUnstable.subscribe((/**
                 * @return {?}
                 */
                () => {
                    NgZone.assertInAngularZone();
                    if (this._stable) {
                        this._stable = false;
                        this._zone.runOutsideAngular((/**
                         * @return {?}
                         */
                        () => {
                            observer.next(false);
                        }));
                    }
                }));
                return (/**
                 * @return {?}
                 */
                () => {
                    stableSub.unsubscribe();
                    unstableSub.unsubscribe();
                });
            }));
            ((/** @type {?} */ (this))).isStable =
                merge(isCurrentlyStable, isStable.pipe(share()));
        }
        /**
         * Bootstrap a new component at the root level of the application.
         *
         * \@usageNotes
         * ### Bootstrap process
         *
         * When bootstrapping a new root component into an application, Angular mounts the
         * specified application component onto DOM elements identified by the componentType's
         * selector and kicks off automatic change detection to finish initializing the component.
         *
         * Optionally, a component can be mounted onto a DOM element that does not match the
         * componentType's selector.
         *
         * ### Example
         * {\@example core/ts/platform/platform.ts region='longform'}
         * @template C
         * @param {?} componentOrFactory
         * @param {?=} rootSelectorOrNode
         * @return {?}
         */
        bootstrap(componentOrFactory, rootSelectorOrNode) {
            if (!this._initStatus.done) {
                throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
            }
            /** @type {?} */
            let componentFactory;
            if (componentOrFactory instanceof ComponentFactory) {
                componentFactory = componentOrFactory;
            }
            else {
                componentFactory =
                    (/** @type {?} */ (this._componentFactoryResolver.resolveComponentFactory(componentOrFactory)));
            }
            this.componentTypes.push(componentFactory.componentType);
            // Create a factory associated with the current module if it's not bound to some other
            /** @type {?} */
            const ngModule = isBoundToModule(componentFactory) ? undefined : this._injector.get(NgModuleRef);
            /** @type {?} */
            const selectorOrNode = rootSelectorOrNode || componentFactory.selector;
            /** @type {?} */
            const compRef = componentFactory.create(Injector.NULL, [], selectorOrNode, ngModule);
            compRef.onDestroy((/**
             * @return {?}
             */
            () => {
                this._unloadComponent(compRef);
            }));
            /** @type {?} */
            const testability = compRef.injector.get(Testability, null);
            if (testability) {
                compRef.injector.get(TestabilityRegistry)
                    .registerApplication(compRef.location.nativeElement, testability);
            }
            this._loadComponent(compRef);
            if (isDevMode()) {
                this._console.log(`Angular is running in development mode. Call enableProdMode() to enable production mode.`);
            }
            return compRef;
        }
        /**
         * Invoke this method to explicitly process change detection and its side-effects.
         *
         * In development mode, `tick()` also performs a second change detection cycle to ensure that no
         * further changes are detected. If additional changes are picked up during this second cycle,
         * bindings in the app have side-effects that cannot be resolved in a single change detection
         * pass.
         * In this case, Angular throws an error, since an Angular application can only have one change
         * detection pass during which all change detection must complete.
         * @return {?}
         */
        tick() {
            if (this._runningTick) {
                throw new Error('ApplicationRef.tick is called recursively');
            }
            try {
                this._runningTick = true;
                for (let view of this._views) {
                    view.detectChanges();
                }
                if (this._enforceNoNewChanges) {
                    for (let view of this._views) {
                        view.checkNoChanges();
                    }
                }
            }
            catch (e) {
                // Attention: Don't rethrow as it could cancel subscriptions to Observables!
                this._zone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => this._exceptionHandler.handleError(e)));
            }
            finally {
                this._runningTick = false;
            }
        }
        /**
         * Attaches a view so that it will be dirty checked.
         * The view will be automatically detached when it is destroyed.
         * This will throw if the view is already attached to a ViewContainer.
         * @param {?} viewRef
         * @return {?}
         */
        attachView(viewRef) {
            /** @type {?} */
            const view = ((/** @type {?} */ (viewRef)));
            this._views.push(view);
            view.attachToAppRef(this);
        }
        /**
         * Detaches a view from dirty checking again.
         * @param {?} viewRef
         * @return {?}
         */
        detachView(viewRef) {
            /** @type {?} */
            const view = ((/** @type {?} */ (viewRef)));
            remove(this._views, view);
            view.detachFromAppRef();
        }
        /**
         * @private
         * @param {?} componentRef
         * @return {?}
         */
        _loadComponent(componentRef) {
            this.attachView(componentRef.hostView);
            this.tick();
            this.components.push(componentRef);
            // Get the listeners lazily to prevent DI cycles.
            /** @type {?} */
            const listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners);
            listeners.forEach((/**
             * @param {?} listener
             * @return {?}
             */
            (listener) => listener(componentRef)));
        }
        /**
         * @private
         * @param {?} componentRef
         * @return {?}
         */
        _unloadComponent(componentRef) {
            this.detachView(componentRef.hostView);
            remove(this.components, componentRef);
        }
        /**
         * \@internal
         * @return {?}
         */
        ngOnDestroy() {
            // TODO(alxhub): Dispose of the NgZone.
            this._views.slice().forEach((/**
             * @param {?} view
             * @return {?}
             */
            (view) => view.destroy()));
        }
        /**
         * Returns the number of attached views.
         * @return {?}
         */
        get viewCount() {
            return this._views.length;
        }
    }
    ApplicationRef.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ApplicationRef.ctorParameters = () => [
        { type: NgZone },
        { type: Console },
        { type: Injector },
        { type: ErrorHandler },
        { type: ComponentFactoryResolver },
        { type: ApplicationInitStatus }
    ];
    return ApplicationRef;
})();
export { ApplicationRef };
if (false) {
    /**
     * \@internal
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._bootstrapListeners;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._views;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._runningTick;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._enforceNoNewChanges;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._stable;
    /**
     * Get a list of component types registered to this application.
     * This list is populated even before the component is created.
     * @type {?}
     */
    ApplicationRef.prototype.componentTypes;
    /**
     * Get a list of components registered to this application.
     * @type {?}
     */
    ApplicationRef.prototype.components;
    /**
     * Returns an Observable that indicates when the application is stable or unstable.
     *
     * @see [Usage notes](#is-stable-examples) for examples and caveats when using this API.
     * @type {?}
     */
    ApplicationRef.prototype.isStable;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._zone;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._console;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._exceptionHandler;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    ApplicationRef.prototype._initStatus;
}
/**
 * @template T
 * @param {?} list
 * @param {?} el
 * @return {?}
 */
function remove(list, el) {
    /** @type {?} */
    const index = list.indexOf(el);
    if (index > -1) {
        list.splice(index, 1);
    }
}
/**
 * @template T
 * @param {?} args
 * @return {?}
 */
function _lastDefined(args) {
    for (let i = args.length - 1; i >= 0; i--) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
/**
 * @param {?} parts
 * @return {?}
 */
function _mergeArrays(parts) {
    /** @type {?} */
    const result = [];
    parts.forEach((/**
     * @param {?} part
     * @return {?}
     */
    (part) => part && result.push(...part)));
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvYXBwbGljYXRpb25fcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sb0JBQW9CLENBQUM7QUFFNUIsT0FBTyxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUMxQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxlQUFlLEVBQWtCLE1BQU0sbUJBQW1CLENBQUM7QUFDckYsT0FBTyxFQUFDLGdCQUFnQixFQUFlLE1BQU0sNEJBQTRCLENBQUM7QUFDMUUsT0FBTyxFQUFDLDZCQUE2QixFQUFFLHdCQUF3QixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFD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SUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDOUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztLQUN2QjtBQUNILENBQUM7Ozs7OztBQUVELFNBQVMsWUFBWSxDQUFJLElBQVM7SUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNoQjtLQUNGO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQzs7Ozs7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFjOztVQUM1QixNQUFNLEdBQVUsRUFBRTtJQUN4QixLQUFLLENBQUMsT0FBTzs7OztJQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFDLENBQUM7SUFDdEQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICcuL3V0aWwvbmdfaml0X21vZGUnO1xuXG5pbXBvcnQge21lcmdlLCBPYnNlcnZhYmxlLCBPYnNlcnZlciwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7c2hhcmV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBcHBsaWNhdGlvbkluaXRTdGF0dXN9IGZyb20gJy4vYXBwbGljYXRpb25faW5pdCc7XG5pbXBvcnQge0FQUF9CT09UU1RSQVBfTElTVEVORVIsIFBMQVRGT1JNX0lOSVRJQUxJWkVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge2dldENvbXBpbGVyRmFjYWRlfSBmcm9tICcuL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZSc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJy4vY29uc29sZSc7XG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3RvciwgU3RhdGljUHJvdmlkZXJ9IGZyb20gJy4vZGknO1xuaW1wb3J0IHtJTkpFQ1RPUl9TQ09QRX0gZnJvbSAnLi9kaS9zY29wZSc7XG5pbXBvcnQge0Vycm9ySGFuZGxlcn0gZnJvbSAnLi9lcnJvcl9oYW5kbGVyJztcbmltcG9ydCB7REVGQVVMVF9MT0NBTEVfSUR9IGZyb20gJy4vaTE4bi9sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHtMT0NBTEVfSUR9IGZyb20gJy4vaTE4bi90b2tlbnMnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7aXZ5RW5hYmxlZH0gZnJvbSAnLi9pdnlfc3dpdGNoJztcbmltcG9ydCB7Q09NUElMRVJfT1BUSU9OUywgQ29tcGlsZXJGYWN0b3J5LCBDb21waWxlck9wdGlvbnN9IGZyb20gJy4vbGlua2VyL2NvbXBpbGVyJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmfSBmcm9tICcuL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnlCb3VuZFRvTW9kdWxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5X3Jlc29sdmVyJztcbmltcG9ydCB7SW50ZXJuYWxOZ01vZHVsZVJlZiwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZn0gZnJvbSAnLi9saW5rZXIvbmdfbW9kdWxlX2ZhY3RvcnknO1xuaW1wb3J0IHtJbnRlcm5hbFZpZXdSZWYsIFZpZXdSZWZ9IGZyb20gJy4vbGlua2VyL3ZpZXdfcmVmJztcbmltcG9ydCB7aXNDb21wb25lbnRSZXNvdXJjZVJlc29sdXRpb25RdWV1ZUVtcHR5LCByZXNvbHZlQ29tcG9uZW50UmVzb3VyY2VzfSBmcm9tICcuL21ldGFkYXRhL3Jlc291cmNlX2xvYWRpbmcnO1xuaW1wb3J0IHthc3NlcnROZ01vZHVsZVR5cGV9IGZyb20gJy4vcmVuZGVyMy9hc3NlcnQnO1xuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5IGFzIFIzQ29tcG9uZW50RmFjdG9yeX0gZnJvbSAnLi9yZW5kZXIzL2NvbXBvbmVudF9yZWYnO1xuaW1wb3J0IHtzZXRMb2NhbGVJZH0gZnJvbSAnLi9yZW5kZXIzL2kxOG4nO1xuaW1wb3J0IHtzZXRKaXRPcHRpb25zfSBmcm9tICcuL3JlbmRlcjMvaml0L2ppdF9vcHRpb25zJztcbmltcG9ydCB7TmdNb2R1bGVGYWN0b3J5IGFzIFIzTmdNb2R1bGVGYWN0b3J5fSBmcm9tICcuL3JlbmRlcjMvbmdfbW9kdWxlX3JlZic7XG5pbXBvcnQge3B1Ymxpc2hEZWZhdWx0R2xvYmFsVXRpbHMgYXMgX3B1Ymxpc2hEZWZhdWx0R2xvYmFsVXRpbHN9IGZyb20gJy4vcmVuZGVyMy91dGlsL2dsb2JhbF91dGlscyc7XG5pbXBvcnQge1Rlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eVJlZ2lzdHJ5fSBmcm9tICcuL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmltcG9ydCB7aXNEZXZNb2RlfSBmcm9tICcuL3V0aWwvaXNfZGV2X21vZGUnO1xuaW1wb3J0IHtpc1Byb21pc2V9IGZyb20gJy4vdXRpbC9sYW5nJztcbmltcG9ydCB7c2NoZWR1bGVNaWNyb1Rhc2t9IGZyb20gJy4vdXRpbC9taWNyb3Rhc2snO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4vdXRpbC9zdHJpbmdpZnknO1xuaW1wb3J0IHtOZ1pvbmUsIE5vb3BOZ1pvbmV9IGZyb20gJy4vem9uZS9uZ196b25lJztcblxubGV0IF9wbGF0Zm9ybTogUGxhdGZvcm1SZWY7XG5cbmxldCBjb21waWxlTmdNb2R1bGVGYWN0b3J5OlxuICAgIDxNPihpbmplY3RvcjogSW5qZWN0b3IsIG9wdGlvbnM6IENvbXBpbGVyT3B0aW9ucywgbW9kdWxlVHlwZTogVHlwZTxNPikgPT5cbiAgICAgICAgUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8TT4+ID0gY29tcGlsZU5nTW9kdWxlRmFjdG9yeV9fUFJFX1IzX187XG5cbmZ1bmN0aW9uIGNvbXBpbGVOZ01vZHVsZUZhY3RvcnlfX1BSRV9SM19fPE0+KFxuICAgIGluamVjdG9yOiBJbmplY3Rvciwgb3B0aW9uczogQ29tcGlsZXJPcHRpb25zLFxuICAgIG1vZHVsZVR5cGU6IFR5cGU8TT4pOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxNPj4ge1xuICBjb25zdCBjb21waWxlckZhY3Rvcnk6IENvbXBpbGVyRmFjdG9yeSA9IGluamVjdG9yLmdldChDb21waWxlckZhY3RvcnkpO1xuICBjb25zdCBjb21waWxlciA9IGNvbXBpbGVyRmFjdG9yeS5jcmVhdGVDb21waWxlcihbb3B0aW9uc10pO1xuICByZXR1cm4gY29tcGlsZXIuY29tcGlsZU1vZHVsZUFzeW5jKG1vZHVsZVR5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU5nTW9kdWxlRmFjdG9yeV9fUE9TVF9SM19fPE0+KFxuICAgIGluamVjdG9yOiBJbmplY3Rvciwgb3B0aW9uczogQ29tcGlsZXJPcHRpb25zLFxuICAgIG1vZHVsZVR5cGU6IFR5cGU8TT4pOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxNPj4ge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TmdNb2R1bGVUeXBlKG1vZHVsZVR5cGUpO1xuXG4gIGNvbnN0IGNvbXBpbGVyT3B0aW9ucyA9IGluamVjdG9yLmdldChDT01QSUxFUl9PUFRJT05TLCBbXSkuY29uY2F0KG9wdGlvbnMpO1xuXG4gIGlmICh0eXBlb2YgbmdKaXRNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0ppdE1vZGUpIHtcbiAgICAvLyBDb25maWd1cmUgdGhlIGNvbXBpbGVyIHRvIHVzZSB0aGUgcHJvdmlkZWQgb3B0aW9ucy4gVGhpcyBjYWxsIG1heSBmYWlsIHdoZW4gbXVsdGlwbGUgbW9kdWxlc1xuICAgIC8vIGFyZSBib290c3RyYXBwZWQgd2l0aCBpbmNvbXBhdGlibGUgb3B0aW9ucywgYXMgYSBjb21wb25lbnQgY2FuIG9ubHkgYmUgY29tcGlsZWQgYWNjb3JkaW5nIHRvXG4gICAgLy8gYSBzaW5nbGUgc2V0IG9mIG9wdGlvbnMuXG4gICAgc2V0Sml0T3B0aW9ucyh7XG4gICAgICBkZWZhdWx0RW5jYXBzdWxhdGlvbjpcbiAgICAgICAgICBfbGFzdERlZmluZWQoY29tcGlsZXJPcHRpb25zLm1hcChvcHRpb25zID0+IG9wdGlvbnMuZGVmYXVsdEVuY2Fwc3VsYXRpb24pKSxcbiAgICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6XG4gICAgICAgICAgX2xhc3REZWZpbmVkKGNvbXBpbGVyT3B0aW9ucy5tYXAob3B0aW9ucyA9PiBvcHRpb25zLnByZXNlcnZlV2hpdGVzcGFjZXMpKSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IG1vZHVsZUZhY3RvcnkgPSBuZXcgUjNOZ01vZHVsZUZhY3RvcnkobW9kdWxlVHlwZSk7XG5cbiAgaWYgKGlzQ29tcG9uZW50UmVzb3VyY2VSZXNvbHV0aW9uUXVldWVFbXB0eSgpKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtb2R1bGVGYWN0b3J5KTtcbiAgfVxuXG4gIGNvbnN0IGNvbXBpbGVyUHJvdmlkZXJzID0gX21lcmdlQXJyYXlzKGNvbXBpbGVyT3B0aW9ucy5tYXAobyA9PiBvLnByb3ZpZGVycyEpKTtcblxuICAvLyBJbiBjYXNlIHRoZXJlIGFyZSBubyBjb21waWxlciBwcm92aWRlcnMsIHdlIGp1c3QgcmV0dXJuIHRoZSBtb2R1bGUgZmFjdG9yeSBhc1xuICAvLyB0aGVyZSB3b24ndCBiZSBhbnkgcmVzb3VyY2UgbG9hZGVyLiBUaGlzIGNhbiBoYXBwZW4gd2l0aCBJdnksIGJlY2F1c2UgQU9UIGNvbXBpbGVkXG4gIC8vIG1vZHVsZXMgY2FuIGJlIHN0aWxsIHBhc3NlZCB0aHJvdWdoIFwiYm9vdHN0cmFwTW9kdWxlXCIuIEluIHRoYXQgY2FzZSB3ZSBzaG91bGRuJ3RcbiAgLy8gdW5uZWNlc3NhcmlseSByZXF1aXJlIHRoZSBKSVQgY29tcGlsZXIuXG4gIGlmIChjb21waWxlclByb3ZpZGVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1vZHVsZUZhY3RvcnkpO1xuICB9XG5cbiAgY29uc3QgY29tcGlsZXIgPSBnZXRDb21waWxlckZhY2FkZSgpO1xuICBjb25zdCBjb21waWxlckluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtwcm92aWRlcnM6IGNvbXBpbGVyUHJvdmlkZXJzfSk7XG4gIGNvbnN0IHJlc291cmNlTG9hZGVyID0gY29tcGlsZXJJbmplY3Rvci5nZXQoY29tcGlsZXIuUmVzb3VyY2VMb2FkZXIpO1xuICAvLyBUaGUgcmVzb3VyY2UgbG9hZGVyIGNhbiBhbHNvIHJldHVybiBhIHN0cmluZyB3aGlsZSB0aGUgXCJyZXNvbHZlQ29tcG9uZW50UmVzb3VyY2VzXCJcbiAgLy8gYWx3YXlzIGV4cGVjdHMgYSBwcm9taXNlLiBUaGVyZWZvcmUgd2UgbmVlZCB0byB3cmFwIHRoZSByZXR1cm5lZCB2YWx1ZSBpbiBhIHByb21pc2UuXG4gIHJldHVybiByZXNvbHZlQ29tcG9uZW50UmVzb3VyY2VzKHVybCA9PiBQcm9taXNlLnJlc29sdmUocmVzb3VyY2VMb2FkZXIuZ2V0KHVybCkpKVxuICAgICAgLnRoZW4oKCkgPT4gbW9kdWxlRmFjdG9yeSk7XG59XG5cbi8vIHRoZSBgd2luZG93Lm5nYCBnbG9iYWwgdXRpbGl0aWVzIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiBub24tVkUgdmVyc2lvbnMgb2Zcbi8vIEFuZ3VsYXIuIFRoZSBmdW5jdGlvbiBzd2l0Y2ggYmVsb3cgd2lsbCBtYWtlIHN1cmUgdGhhdCB0aGUgY29kZSBpcyBub3Rcbi8vIGluY2x1ZGVkIGludG8gQW5ndWxhciB3aGVuIFBSRSBtb2RlIGlzIGFjdGl2ZS5cbmV4cG9ydCBmdW5jdGlvbiBwdWJsaXNoRGVmYXVsdEdsb2JhbFV0aWxzX19QUkVfUjNfXygpIHt9XG5leHBvcnQgZnVuY3Rpb24gcHVibGlzaERlZmF1bHRHbG9iYWxVdGlsc19fUE9TVF9SM19fKCkge1xuICBuZ0Rldk1vZGUgJiYgX3B1Ymxpc2hEZWZhdWx0R2xvYmFsVXRpbHMoKTtcbn1cblxubGV0IHB1Ymxpc2hEZWZhdWx0R2xvYmFsVXRpbHM6ICgpID0+IGFueSA9IHB1Ymxpc2hEZWZhdWx0R2xvYmFsVXRpbHNfX1BSRV9SM19fO1xuXG5sZXQgaXNCb3VuZFRvTW9kdWxlOiA8Qz4oY2Y6IENvbXBvbmVudEZhY3Rvcnk8Qz4pID0+IGJvb2xlYW4gPSBpc0JvdW5kVG9Nb2R1bGVfX1BSRV9SM19fO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCb3VuZFRvTW9kdWxlX19QUkVfUjNfXzxDPihjZjogQ29tcG9uZW50RmFjdG9yeTxDPik6IGJvb2xlYW4ge1xuICByZXR1cm4gY2YgaW5zdGFuY2VvZiBDb21wb25lbnRGYWN0b3J5Qm91bmRUb01vZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQm91bmRUb01vZHVsZV9fUE9TVF9SM19fPEM+KGNmOiBDb21wb25lbnRGYWN0b3J5PEM+KTogYm9vbGVhbiB7XG4gIHJldHVybiAoY2YgYXMgUjNDb21wb25lbnRGYWN0b3J5PEM+KS5pc0JvdW5kVG9Nb2R1bGU7XG59XG5cbmV4cG9ydCBjb25zdCBBTExPV19NVUxUSVBMRV9QTEFURk9STVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ0FsbG93TXVsdGlwbGVUb2tlbicpO1xuXG5cblxuLyoqXG4gKiBBIHRva2VuIGZvciB0aGlyZC1wYXJ0eSBjb21wb25lbnRzIHRoYXQgY2FuIHJlZ2lzdGVyIHRoZW1zZWx2ZXMgd2l0aCBOZ1Byb2JlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIE5nUHJvYmVUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyB0b2tlbjogYW55KSB7fVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBwbGF0Zm9ybS5cbiAqIFBsYXRmb3JtcyBoYXZlIHRvIGJlIGVhZ2VybHkgY3JlYXRlZCB2aWEgdGhpcyBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybShpbmplY3RvcjogSW5qZWN0b3IpOiBQbGF0Zm9ybVJlZiB7XG4gIGlmIChfcGxhdGZvcm0gJiYgIV9wbGF0Zm9ybS5kZXN0cm95ZWQgJiZcbiAgICAgICFfcGxhdGZvcm0uaW5qZWN0b3IuZ2V0KEFMTE9XX01VTFRJUExFX1BMQVRGT1JNUywgZmFsc2UpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVGhlcmUgY2FuIGJlIG9ubHkgb25lIHBsYXRmb3JtLiBEZXN0cm95IHRoZSBwcmV2aW91cyBvbmUgdG8gY3JlYXRlIGEgbmV3IG9uZS4nKTtcbiAgfVxuICBwdWJsaXNoRGVmYXVsdEdsb2JhbFV0aWxzKCk7XG4gIF9wbGF0Zm9ybSA9IGluamVjdG9yLmdldChQbGF0Zm9ybVJlZik7XG4gIGNvbnN0IGluaXRzID0gaW5qZWN0b3IuZ2V0KFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBudWxsKTtcbiAgaWYgKGluaXRzKSBpbml0cy5mb3JFYWNoKChpbml0OiBhbnkpID0+IGluaXQoKSk7XG4gIHJldHVybiBfcGxhdGZvcm07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZhY3RvcnkgZm9yIGEgcGxhdGZvcm1cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gICAgcGFyZW50UGxhdGZvcm1GYWN0b3J5OiAoKGV4dHJhUHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSkgPT4gUGxhdGZvcm1SZWYpfG51bGwsIG5hbWU6IHN0cmluZyxcbiAgICBwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXSk6IChleHRyYVByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10pID0+IFBsYXRmb3JtUmVmIHtcbiAgY29uc3QgZGVzYyA9IGBQbGF0Zm9ybTogJHtuYW1lfWA7XG4gIGNvbnN0IG1hcmtlciA9IG5ldyBJbmplY3Rpb25Ub2tlbihkZXNjKTtcbiAgcmV0dXJuIChleHRyYVByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSA9IFtdKSA9PiB7XG4gICAgbGV0IHBsYXRmb3JtID0gZ2V0UGxhdGZvcm0oKTtcbiAgICBpZiAoIXBsYXRmb3JtIHx8IHBsYXRmb3JtLmluamVjdG9yLmdldChBTExPV19NVUxUSVBMRV9QTEFURk9STVMsIGZhbHNlKSkge1xuICAgICAgaWYgKHBhcmVudFBsYXRmb3JtRmFjdG9yeSkge1xuICAgICAgICBwYXJlbnRQbGF0Zm9ybUZhY3RvcnkoXG4gICAgICAgICAgICBwcm92aWRlcnMuY29uY2F0KGV4dHJhUHJvdmlkZXJzKS5jb25jYXQoe3Byb3ZpZGU6IG1hcmtlciwgdXNlVmFsdWU6IHRydWV9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbmplY3RlZFByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSA9XG4gICAgICAgICAgICBwcm92aWRlcnMuY29uY2F0KGV4dHJhUHJvdmlkZXJzKS5jb25jYXQoe3Byb3ZpZGU6IG1hcmtlciwgdXNlVmFsdWU6IHRydWV9LCB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IElOSkVDVE9SX1NDT1BFLFxuICAgICAgICAgICAgICB1c2VWYWx1ZTogJ3BsYXRmb3JtJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNyZWF0ZVBsYXRmb3JtKEluamVjdG9yLmNyZWF0ZSh7cHJvdmlkZXJzOiBpbmplY3RlZFByb3ZpZGVycywgbmFtZTogZGVzY30pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFzc2VydFBsYXRmb3JtKG1hcmtlcik7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIHRoYXQgdGhlcmUgY3VycmVudGx5IGlzIGEgcGxhdGZvcm0gd2hpY2ggY29udGFpbnMgdGhlIGdpdmVuIHRva2VuIGFzIGEgcHJvdmlkZXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0UGxhdGZvcm0ocmVxdWlyZWRUb2tlbjogYW55KTogUGxhdGZvcm1SZWYge1xuICBjb25zdCBwbGF0Zm9ybSA9IGdldFBsYXRmb3JtKCk7XG5cbiAgaWYgKCFwbGF0Zm9ybSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcGxhdGZvcm0gZXhpc3RzIScpO1xuICB9XG5cbiAgaWYgKCFwbGF0Zm9ybS5pbmplY3Rvci5nZXQocmVxdWlyZWRUb2tlbiwgbnVsbCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdBIHBsYXRmb3JtIHdpdGggYSBkaWZmZXJlbnQgY29uZmlndXJhdGlvbiBoYXMgYmVlbiBjcmVhdGVkLiBQbGVhc2UgZGVzdHJveSBpdCBmaXJzdC4nKTtcbiAgfVxuXG4gIHJldHVybiBwbGF0Zm9ybTtcbn1cblxuLyoqXG4gKiBEZXN0cm95IHRoZSBleGlzdGluZyBwbGF0Zm9ybS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95UGxhdGZvcm0oKTogdm9pZCB7XG4gIGlmIChfcGxhdGZvcm0gJiYgIV9wbGF0Zm9ybS5kZXN0cm95ZWQpIHtcbiAgICBfcGxhdGZvcm0uZGVzdHJveSgpO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF0Zm9ybSgpOiBQbGF0Zm9ybVJlZnxudWxsIHtcbiAgcmV0dXJuIF9wbGF0Zm9ybSAmJiAhX3BsYXRmb3JtLmRlc3Ryb3llZCA/IF9wbGF0Zm9ybSA6IG51bGw7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYWRkaXRpb25hbCBvcHRpb25zIHRvIHRoZSBib290c3RyYXBpbmcgcHJvY2Vzcy5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJvb3RzdHJhcE9wdGlvbnMge1xuICAvKipcbiAgICogT3B0aW9uYWxseSBzcGVjaWZ5IHdoaWNoIGBOZ1pvbmVgIHNob3VsZCBiZSB1c2VkLlxuICAgKlxuICAgKiAtIFByb3ZpZGUgeW91ciBvd24gYE5nWm9uZWAgaW5zdGFuY2UuXG4gICAqIC0gYHpvbmUuanNgIC0gVXNlIGRlZmF1bHQgYE5nWm9uZWAgd2hpY2ggcmVxdWlyZXMgYFpvbmUuanNgLlxuICAgKiAtIGBub29wYCAtIFVzZSBgTm9vcE5nWm9uZWAgd2hpY2ggZG9lcyBub3RoaW5nLlxuICAgKi9cbiAgbmdab25lPzogTmdab25lfCd6b25lLmpzJ3wnbm9vcCc7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsbHkgc3BlY2lmeSBjb2FsZXNjaW5nIGV2ZW50IGNoYW5nZSBkZXRlY3Rpb25zIG9yIG5vdC5cbiAgICogQ29uc2lkZXIgdGhlIGZvbGxvd2luZyBjYXNlLlxuICAgKlxuICAgKiA8ZGl2IChjbGljayk9XCJkb1NvbWV0aGluZygpXCI+XG4gICAqICAgPGJ1dHRvbiAoY2xpY2spPVwiZG9Tb21ldGhpbmdFbHNlKClcIj48L2J1dHRvbj5cbiAgICogPC9kaXY+XG4gICAqXG4gICAqIFdoZW4gYnV0dG9uIGlzIGNsaWNrZWQsIGJlY2F1c2Ugb2YgdGhlIGV2ZW50IGJ1YmJsaW5nLCBib3RoXG4gICAqIGV2ZW50IGhhbmRsZXJzIHdpbGwgYmUgY2FsbGVkIGFuZCAyIGNoYW5nZSBkZXRlY3Rpb25zIHdpbGwgYmVcbiAgICogdHJpZ2dlcmVkLiBXZSBjYW4gY29sZXNjZSBzdWNoIGtpbmQgb2YgZXZlbnRzIHRvIG9ubHkgdHJpZ2dlclxuICAgKiBjaGFuZ2UgZGV0ZWN0aW9uIG9ubHkgb25jZS5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhpcyBvcHRpb24gd2lsbCBiZSBmYWxzZS4gU28gdGhlIGV2ZW50cyB3aWxsIG5vdCBiZVxuICAgKiBjb2FsZXNjZWQgYW5kIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdpbGwgYmUgdHJpZ2dlcmVkIG11bHRpcGxlIHRpbWVzLlxuICAgKiBBbmQgaWYgdGhpcyBvcHRpb24gYmUgc2V0IHRvIHRydWUsIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHdpbGwgYmVcbiAgICogdHJpZ2dlcmVkIGFzeW5jIGJ5IHNjaGVkdWxpbmcgYSBhbmltYXRpb24gZnJhbWUuIFNvIGluIHRoZSBjYXNlIGFib3ZlLFxuICAgKiB0aGUgY2hhbmdlIGRldGVjdGlvbiB3aWxsIG9ubHkgYmUgdHJpZ2dlZCBvbmNlLlxuICAgKi9cbiAgbmdab25lRXZlbnRDb2FsZXNjaW5nPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBUaGUgQW5ndWxhciBwbGF0Zm9ybSBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIEFuZ3VsYXIgb24gYSB3ZWIgcGFnZS4gRWFjaCBwYWdlXG4gKiBoYXMgZXhhY3RseSBvbmUgcGxhdGZvcm0sIGFuZCBzZXJ2aWNlcyAoc3VjaCBhcyByZWZsZWN0aW9uKSB3aGljaCBhcmUgY29tbW9uXG4gKiB0byBldmVyeSBBbmd1bGFyIGFwcGxpY2F0aW9uIHJ1bm5pbmcgb24gdGhlIHBhZ2UgYXJlIGJvdW5kIGluIGl0cyBzY29wZS5cbiAqXG4gKiBBIHBhZ2UncyBwbGF0Zm9ybSBpcyBpbml0aWFsaXplZCBpbXBsaWNpdGx5IHdoZW4gYSBwbGF0Zm9ybSBpcyBjcmVhdGVkIHZpYSBhIHBsYXRmb3JtIGZhY3RvcnlcbiAqIChlLmcuIHtAbGluayBwbGF0Zm9ybUJyb3dzZXJ9KSwgb3IgZXhwbGljaXRseSBieSBjYWxsaW5nIHRoZSB7QGxpbmsgY3JlYXRlUGxhdGZvcm19IGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBsYXRmb3JtUmVmIHtcbiAgcHJpdmF0ZSBfbW9kdWxlczogTmdNb2R1bGVSZWY8YW55PltdID0gW107XG4gIHByaXZhdGUgX2Rlc3Ryb3lMaXN0ZW5lcnM6IEZ1bmN0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgYW4gYEBOZ01vZHVsZWAgZm9yIHRoZSBnaXZlbiBwbGF0Zm9ybVxuICAgKiBmb3Igb2ZmbGluZSBjb21waWxhdGlvbi5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIFNpbXBsZSBFeGFtcGxlXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogbXlfbW9kdWxlLnRzOlxuICAgKlxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGltcG9ydHM6IFtCcm93c2VyTW9kdWxlXVxuICAgKiB9KVxuICAgKiBjbGFzcyBNeU1vZHVsZSB7fVxuICAgKlxuICAgKiBtYWluLnRzOlxuICAgKiBpbXBvcnQge015TW9kdWxlTmdGYWN0b3J5fSBmcm9tICcuL215X21vZHVsZS5uZ2ZhY3RvcnknO1xuICAgKiBpbXBvcnQge3BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4gICAqXG4gICAqIGxldCBtb2R1bGVSZWYgPSBwbGF0Zm9ybUJyb3dzZXIoKS5ib290c3RyYXBNb2R1bGVGYWN0b3J5KE15TW9kdWxlTmdGYWN0b3J5KTtcbiAgICogYGBgXG4gICAqL1xuICBib290c3RyYXBNb2R1bGVGYWN0b3J5PE0+KG1vZHVsZUZhY3Rvcnk6IE5nTW9kdWxlRmFjdG9yeTxNPiwgb3B0aW9ucz86IEJvb3RzdHJhcE9wdGlvbnMpOlxuICAgICAgUHJvbWlzZTxOZ01vZHVsZVJlZjxNPj4ge1xuICAgIC8vIE5vdGU6IFdlIG5lZWQgdG8gY3JlYXRlIHRoZSBOZ1pvbmUgX2JlZm9yZV8gd2UgaW5zdGFudGlhdGUgdGhlIG1vZHVsZSxcbiAgICAvLyBhcyBpbnN0YW50aWF0aW5nIHRoZSBtb2R1bGUgY3JlYXRlcyBzb21lIHByb3ZpZGVycyBlYWdlcmx5LlxuICAgIC8vIFNvIHdlIGNyZWF0ZSBhIG1pbmkgcGFyZW50IGluamVjdG9yIHRoYXQganVzdCBjb250YWlucyB0aGUgbmV3IE5nWm9uZSBhbmRcbiAgICAvLyBwYXNzIHRoYXQgYXMgcGFyZW50IHRvIHRoZSBOZ01vZHVsZUZhY3RvcnkuXG4gICAgY29uc3Qgbmdab25lT3B0aW9uID0gb3B0aW9ucyA/IG9wdGlvbnMubmdab25lIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG5nWm9uZUV2ZW50Q29hbGVzY2luZyA9IChvcHRpb25zICYmIG9wdGlvbnMubmdab25lRXZlbnRDb2FsZXNjaW5nKSB8fCBmYWxzZTtcbiAgICBjb25zdCBuZ1pvbmUgPSBnZXROZ1pvbmUobmdab25lT3B0aW9uLCBuZ1pvbmVFdmVudENvYWxlc2NpbmcpO1xuICAgIGNvbnN0IHByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSA9IFt7cHJvdmlkZTogTmdab25lLCB1c2VWYWx1ZTogbmdab25lfV07XG4gICAgLy8gQXR0ZW50aW9uOiBEb24ndCB1c2UgQXBwbGljYXRpb25SZWYucnVuIGhlcmUsXG4gICAgLy8gYXMgd2Ugd2FudCB0byBiZSBzdXJlIHRoYXQgYWxsIHBvc3NpYmxlIGNvbnN0cnVjdG9yIGNhbGxzIGFyZSBpbnNpZGUgYG5nWm9uZS5ydW5gIVxuICAgIHJldHVybiBuZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgIGNvbnN0IG5nWm9uZUluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKFxuICAgICAgICAgIHtwcm92aWRlcnM6IHByb3ZpZGVycywgcGFyZW50OiB0aGlzLmluamVjdG9yLCBuYW1lOiBtb2R1bGVGYWN0b3J5Lm1vZHVsZVR5cGUubmFtZX0pO1xuICAgICAgY29uc3QgbW9kdWxlUmVmID0gPEludGVybmFsTmdNb2R1bGVSZWY8TT4+bW9kdWxlRmFjdG9yeS5jcmVhdGUobmdab25lSW5qZWN0b3IpO1xuICAgICAgY29uc3QgZXhjZXB0aW9uSGFuZGxlcjogRXJyb3JIYW5kbGVyfG51bGwgPSBtb2R1bGVSZWYuaW5qZWN0b3IuZ2V0KEVycm9ySGFuZGxlciwgbnVsbCk7XG4gICAgICBpZiAoIWV4Y2VwdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBFcnJvckhhbmRsZXIuIElzIHBsYXRmb3JtIG1vZHVsZSAoQnJvd3Nlck1vZHVsZSkgaW5jbHVkZWQ/Jyk7XG4gICAgICB9XG4gICAgICBtb2R1bGVSZWYub25EZXN0cm95KCgpID0+IHJlbW92ZSh0aGlzLl9tb2R1bGVzLCBtb2R1bGVSZWYpKTtcbiAgICAgIG5nWm9uZSEucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gbmdab25lIS5vbkVycm9yLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgZXhjZXB0aW9uSGFuZGxlci5oYW5kbGVFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBfY2FsbEFuZFJlcG9ydFRvRXJyb3JIYW5kbGVyKGV4Y2VwdGlvbkhhbmRsZXIsIG5nWm9uZSEsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5pdFN0YXR1czogQXBwbGljYXRpb25Jbml0U3RhdHVzID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvbkluaXRTdGF0dXMpO1xuICAgICAgICBpbml0U3RhdHVzLnJ1bkluaXRpYWxpemVycygpO1xuICAgICAgICByZXR1cm4gaW5pdFN0YXR1cy5kb25lUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAoaXZ5RW5hYmxlZCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGBMT0NBTEVfSURgIHByb3ZpZGVyIGlzIGRlZmluZWQgYXQgYm9vdHN0cmFwIHRoZW4gd2Ugc2V0IHRoZSB2YWx1ZSBmb3IgaXZ5XG4gICAgICAgICAgICBjb25zdCBsb2NhbGVJZCA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQoTE9DQUxFX0lELCBERUZBVUxUX0xPQ0FMRV9JRCk7XG4gICAgICAgICAgICBzZXRMb2NhbGVJZChsb2NhbGVJZCB8fCBERUZBVUxUX0xPQ0FMRV9JRCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX21vZHVsZURvQm9vdHN0cmFwKG1vZHVsZVJlZik7XG4gICAgICAgICAgcmV0dXJuIG1vZHVsZVJlZjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGFuIGBATmdNb2R1bGVgIGZvciBhIGdpdmVuIHBsYXRmb3JtIHVzaW5nIHRoZSBnaXZlbiBydW50aW1lIGNvbXBpbGVyLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgU2ltcGxlIEV4YW1wbGVcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGltcG9ydHM6IFtCcm93c2VyTW9kdWxlXVxuICAgKiB9KVxuICAgKiBjbGFzcyBNeU1vZHVsZSB7fVxuICAgKlxuICAgKiBsZXQgbW9kdWxlUmVmID0gcGxhdGZvcm1Ccm93c2VyKCkuYm9vdHN0cmFwTW9kdWxlKE15TW9kdWxlKTtcbiAgICogYGBgXG4gICAqXG4gICAqL1xuICBib290c3RyYXBNb2R1bGU8TT4oXG4gICAgICBtb2R1bGVUeXBlOiBUeXBlPE0+LFxuICAgICAgY29tcGlsZXJPcHRpb25zOiAoQ29tcGlsZXJPcHRpb25zJkJvb3RzdHJhcE9wdGlvbnMpfFxuICAgICAgQXJyYXk8Q29tcGlsZXJPcHRpb25zJkJvb3RzdHJhcE9wdGlvbnM+ID0gW10pOiBQcm9taXNlPE5nTW9kdWxlUmVmPE0+PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG9wdGlvbnNSZWR1Y2VyKHt9LCBjb21waWxlck9wdGlvbnMpO1xuICAgIHJldHVybiBjb21waWxlTmdNb2R1bGVGYWN0b3J5KHRoaXMuaW5qZWN0b3IsIG9wdGlvbnMsIG1vZHVsZVR5cGUpXG4gICAgICAgIC50aGVuKG1vZHVsZUZhY3RvcnkgPT4gdGhpcy5ib290c3RyYXBNb2R1bGVGYWN0b3J5KG1vZHVsZUZhY3RvcnksIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHByaXZhdGUgX21vZHVsZURvQm9vdHN0cmFwKG1vZHVsZVJlZjogSW50ZXJuYWxOZ01vZHVsZVJlZjxhbnk+KTogdm9pZCB7XG4gICAgY29uc3QgYXBwUmVmID0gbW9kdWxlUmVmLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZikgYXMgQXBwbGljYXRpb25SZWY7XG4gICAgaWYgKG1vZHVsZVJlZi5fYm9vdHN0cmFwQ29tcG9uZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBtb2R1bGVSZWYuX2Jvb3RzdHJhcENvbXBvbmVudHMuZm9yRWFjaChmID0+IGFwcFJlZi5ib290c3RyYXAoZikpO1xuICAgIH0gZWxzZSBpZiAobW9kdWxlUmVmLmluc3RhbmNlLm5nRG9Cb290c3RyYXApIHtcbiAgICAgIG1vZHVsZVJlZi5pbnN0YW5jZS5uZ0RvQm9vdHN0cmFwKGFwcFJlZik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVGhlIG1vZHVsZSAke1xuICAgICAgICAgICAgICBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgICBtb2R1bGVSZWYuaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAuY29uc3RydWN0b3IpfSB3YXMgYm9vdHN0cmFwcGVkLCBidXQgaXQgZG9lcyBub3QgZGVjbGFyZSBcIkBOZ01vZHVsZS5ib290c3RyYXBcIiBjb21wb25lbnRzIG5vciBhIFwibmdEb0Jvb3RzdHJhcFwiIG1ldGhvZC4gYCArXG4gICAgICAgICAgYFBsZWFzZSBkZWZpbmUgb25lIG9mIHRoZXNlLmApO1xuICAgIH1cbiAgICB0aGlzLl9tb2R1bGVzLnB1c2gobW9kdWxlUmVmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGxpc3RlbmVyIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBwbGF0Zm9ybSBpcyBkaXNwb3NlZC5cbiAgICovXG4gIG9uRGVzdHJveShjYWxsYmFjazogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3lMaXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIHBsYXRmb3JtIHtAbGluayBJbmplY3Rvcn0sIHdoaWNoIGlzIHRoZSBwYXJlbnQgaW5qZWN0b3IgZm9yXG4gICAqIGV2ZXJ5IEFuZ3VsYXIgYXBwbGljYXRpb24gb24gdGhlIHBhZ2UgYW5kIHByb3ZpZGVzIHNpbmdsZXRvbiBwcm92aWRlcnMuXG4gICAqL1xuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLl9pbmplY3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBBbmd1bGFyIHBsYXRmb3JtIGFuZCBhbGwgQW5ndWxhciBhcHBsaWNhdGlvbnMgb24gdGhlIHBhZ2UuXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHBsYXRmb3JtIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkIScpO1xuICAgIH1cbiAgICB0aGlzLl9tb2R1bGVzLnNsaWNlKCkuZm9yRWFjaChtb2R1bGUgPT4gbW9kdWxlLmRlc3Ryb3koKSk7XG4gICAgdGhpcy5fZGVzdHJveUxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyKCkpO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICBnZXQgZGVzdHJveWVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kZXN0cm95ZWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Tmdab25lKFxuICAgIG5nWm9uZU9wdGlvbjogTmdab25lfCd6b25lLmpzJ3wnbm9vcCd8dW5kZWZpbmVkLCBuZ1pvbmVFdmVudENvYWxlc2Npbmc6IGJvb2xlYW4pOiBOZ1pvbmUge1xuICBsZXQgbmdab25lOiBOZ1pvbmU7XG5cbiAgaWYgKG5nWm9uZU9wdGlvbiA9PT0gJ25vb3AnKSB7XG4gICAgbmdab25lID0gbmV3IE5vb3BOZ1pvbmUoKTtcbiAgfSBlbHNlIHtcbiAgICBuZ1pvbmUgPSAobmdab25lT3B0aW9uID09PSAnem9uZS5qcycgPyB1bmRlZmluZWQgOiBuZ1pvbmVPcHRpb24pIHx8IG5ldyBOZ1pvbmUoe1xuICAgICAgICAgICAgICAgZW5hYmxlTG9uZ1N0YWNrVHJhY2U6IGlzRGV2TW9kZSgpLFxuICAgICAgICAgICAgICAgc2hvdWxkQ29hbGVzY2VFdmVudENoYW5nZURldGVjdGlvbjogbmdab25lRXZlbnRDb2FsZXNjaW5nXG4gICAgICAgICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIG5nWm9uZTtcbn1cblxuZnVuY3Rpb24gX2NhbGxBbmRSZXBvcnRUb0Vycm9ySGFuZGxlcihcbiAgICBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlciwgbmdab25lOiBOZ1pvbmUsIGNhbGxiYWNrOiAoKSA9PiBhbnkpOiBhbnkge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKCk7XG4gICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmNhdGNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihlKSk7XG4gICAgICAgIC8vIHJldGhyb3cgYXMgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyIG1pZ2h0IG5vdCBkbyBpdFxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIG5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBlcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZSkpO1xuICAgIC8vIHJldGhyb3cgYXMgdGhlIGV4Y2VwdGlvbiBoYW5kbGVyIG1pZ2h0IG5vdCBkbyBpdFxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gb3B0aW9uc1JlZHVjZXI8VCBleHRlbmRzIE9iamVjdD4oZHN0OiBhbnksIG9ianM6IFR8VFtdKTogVCB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9ianMpKSB7XG4gICAgZHN0ID0gb2Jqcy5yZWR1Y2Uob3B0aW9uc1JlZHVjZXIsIGRzdCk7XG4gIH0gZWxzZSB7XG4gICAgZHN0ID0gey4uLmRzdCwgLi4uKG9ianMgYXMgYW55KX07XG4gIH1cbiAgcmV0dXJuIGRzdDtcbn1cblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byBhbiBBbmd1bGFyIGFwcGxpY2F0aW9uIHJ1bm5pbmcgb24gYSBwYWdlLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICoge0BhIGlzLXN0YWJsZS1leGFtcGxlc31cbiAqICMjIyBpc1N0YWJsZSBleGFtcGxlcyBhbmQgY2F2ZWF0c1xuICpcbiAqIE5vdGUgdHdvIGltcG9ydGFudCBwb2ludHMgYWJvdXQgYGlzU3RhYmxlYCwgZGVtb25zdHJhdGVkIGluIHRoZSBleGFtcGxlcyBiZWxvdzpcbiAqIC0gdGhlIGFwcGxpY2F0aW9uIHdpbGwgbmV2ZXIgYmUgc3RhYmxlIGlmIHlvdSBzdGFydCBhbnkga2luZFxuICogb2YgcmVjdXJyZW50IGFzeW5jaHJvbm91cyB0YXNrIHdoZW4gdGhlIGFwcGxpY2F0aW9uIHN0YXJ0c1xuICogKGZvciBleGFtcGxlIGZvciBhIHBvbGxpbmcgcHJvY2Vzcywgc3RhcnRlZCB3aXRoIGEgYHNldEludGVydmFsYCwgYSBgc2V0VGltZW91dGBcbiAqIG9yIHVzaW5nIFJ4SlMgb3BlcmF0b3JzIGxpa2UgYGludGVydmFsYCk7XG4gKiAtIHRoZSBgaXNTdGFibGVgIE9ic2VydmFibGUgcnVucyBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUuXG4gKlxuICogTGV0J3MgaW1hZ2luZSB0aGF0IHlvdSBzdGFydCBhIHJlY3VycmVudCB0YXNrXG4gKiAoaGVyZSBpbmNyZW1lbnRpbmcgYSBjb3VudGVyLCB1c2luZyBSeEpTIGBpbnRlcnZhbGApLFxuICogYW5kIGF0IHRoZSBzYW1lIHRpbWUgc3Vic2NyaWJlIHRvIGBpc1N0YWJsZWAuXG4gKlxuICogYGBgXG4gKiBjb25zdHJ1Y3RvcihhcHBSZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gKiAgIGFwcFJlZi5pc1N0YWJsZS5waXBlKFxuICogICAgICBmaWx0ZXIoc3RhYmxlID0+IHN0YWJsZSlcbiAqICAgKS5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coJ0FwcCBpcyBzdGFibGUgbm93Jyk7XG4gKiAgIGludGVydmFsKDEwMDApLnN1YnNjcmliZShjb3VudGVyID0+IGNvbnNvbGUubG9nKGNvdW50ZXIpKTtcbiAqIH1cbiAqIGBgYFxuICogSW4gdGhpcyBleGFtcGxlLCBgaXNTdGFibGVgIHdpbGwgbmV2ZXIgZW1pdCBgdHJ1ZWAsXG4gKiBhbmQgdGhlIHRyYWNlIFwiQXBwIGlzIHN0YWJsZSBub3dcIiB3aWxsIG5ldmVyIGdldCBsb2dnZWQuXG4gKlxuICogSWYgeW91IHdhbnQgdG8gZXhlY3V0ZSBzb21ldGhpbmcgd2hlbiB0aGUgYXBwIGlzIHN0YWJsZSxcbiAqIHlvdSBoYXZlIHRvIHdhaXQgZm9yIHRoZSBhcHBsaWNhdGlvbiB0byBiZSBzdGFibGVcbiAqIGJlZm9yZSBzdGFydGluZyB5b3VyIHBvbGxpbmcgcHJvY2Vzcy5cbiAqXG4gKiBgYGBcbiAqIGNvbnN0cnVjdG9yKGFwcFJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAqICAgYXBwUmVmLmlzU3RhYmxlLnBpcGUoXG4gKiAgICAgZmlyc3Qoc3RhYmxlID0+IHN0YWJsZSksXG4gKiAgICAgdGFwKHN0YWJsZSA9PiBjb25zb2xlLmxvZygnQXBwIGlzIHN0YWJsZSBub3cnKSksXG4gKiAgICAgc3dpdGNoTWFwKCgpID0+IGludGVydmFsKDEwMDApKVxuICogICApLnN1YnNjcmliZShjb3VudGVyID0+IGNvbnNvbGUubG9nKGNvdW50ZXIpKTtcbiAqIH1cbiAqIGBgYFxuICogSW4gdGhpcyBleGFtcGxlLCB0aGUgdHJhY2UgXCJBcHAgaXMgc3RhYmxlIG5vd1wiIHdpbGwgYmUgbG9nZ2VkXG4gKiBhbmQgdGhlbiB0aGUgY291bnRlciBzdGFydHMgaW5jcmVtZW50aW5nIGV2ZXJ5IHNlY29uZC5cbiAqXG4gKiBOb3RlIGFsc28gdGhhdCB0aGlzIE9ic2VydmFibGUgcnVucyBvdXRzaWRlIG9mIHRoZSBBbmd1bGFyIHpvbmUsXG4gKiB3aGljaCBtZWFucyB0aGF0IHRoZSBjb2RlIGluIHRoZSBzdWJzY3JpcHRpb25cbiAqIHRvIHRoaXMgT2JzZXJ2YWJsZSB3aWxsIG5vdCB0cmlnZ2VyIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uLlxuICpcbiAqIExldCdzIGltYWdpbmUgdGhhdCBpbnN0ZWFkIG9mIGxvZ2dpbmcgdGhlIGNvdW50ZXIgdmFsdWUsXG4gKiB5b3UgdXBkYXRlIGEgZmllbGQgb2YgeW91ciBjb21wb25lbnRcbiAqIGFuZCBkaXNwbGF5IGl0IGluIGl0cyB0ZW1wbGF0ZS5cbiAqXG4gKiBgYGBcbiAqIGNvbnN0cnVjdG9yKGFwcFJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAqICAgYXBwUmVmLmlzU3RhYmxlLnBpcGUoXG4gKiAgICAgZmlyc3Qoc3RhYmxlID0+IHN0YWJsZSksXG4gKiAgICAgc3dpdGNoTWFwKCgpID0+IGludGVydmFsKDEwMDApKVxuICogICApLnN1YnNjcmliZShjb3VudGVyID0+IHRoaXMudmFsdWUgPSBjb3VudGVyKTtcbiAqIH1cbiAqIGBgYFxuICogQXMgdGhlIGBpc1N0YWJsZWAgT2JzZXJ2YWJsZSBydW5zIG91dHNpZGUgdGhlIHpvbmUsXG4gKiB0aGUgYHZhbHVlYCBmaWVsZCB3aWxsIGJlIHVwZGF0ZWQgcHJvcGVybHksXG4gKiBidXQgdGhlIHRlbXBsYXRlIHdpbGwgbm90IGJlIHJlZnJlc2hlZCFcbiAqXG4gKiBZb3UnbGwgaGF2ZSB0byBtYW51YWxseSB0cmlnZ2VyIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHRvIHVwZGF0ZSB0aGUgdGVtcGxhdGUuXG4gKlxuICogYGBgXG4gKiBjb25zdHJ1Y3RvcihhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAqICAgYXBwUmVmLmlzU3RhYmxlLnBpcGUoXG4gKiAgICAgZmlyc3Qoc3RhYmxlID0+IHN0YWJsZSksXG4gKiAgICAgc3dpdGNoTWFwKCgpID0+IGludGVydmFsKDEwMDApKVxuICogICApLnN1YnNjcmliZShjb3VudGVyID0+IHtcbiAqICAgICB0aGlzLnZhbHVlID0gY291bnRlcjtcbiAqICAgICBjZC5kZXRlY3RDaGFuZ2VzKCk7XG4gKiAgIH0pO1xuICogfVxuICogYGBgXG4gKlxuICogT3IgbWFrZSB0aGUgc3Vic2NyaXB0aW9uIGNhbGxiYWNrIHJ1biBpbnNpZGUgdGhlIHpvbmUuXG4gKlxuICogYGBgXG4gKiBjb25zdHJ1Y3RvcihhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCB6b25lOiBOZ1pvbmUpIHtcbiAqICAgYXBwUmVmLmlzU3RhYmxlLnBpcGUoXG4gKiAgICAgZmlyc3Qoc3RhYmxlID0+IHN0YWJsZSksXG4gKiAgICAgc3dpdGNoTWFwKCgpID0+IGludGVydmFsKDEwMDApKVxuICogICApLnN1YnNjcmliZShjb3VudGVyID0+IHpvbmUucnVuKCgpID0+IHRoaXMudmFsdWUgPSBjb3VudGVyKSk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvblJlZiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJpdmF0ZSBfYm9vdHN0cmFwTGlzdGVuZXJzOiAoKGNvbXBSZWY6IENvbXBvbmVudFJlZjxhbnk+KSA9PiB2b2lkKVtdID0gW107XG4gIHByaXZhdGUgX3ZpZXdzOiBJbnRlcm5hbFZpZXdSZWZbXSA9IFtdO1xuICBwcml2YXRlIF9ydW5uaW5nVGljazogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9lbmZvcmNlTm9OZXdDaGFuZ2VzOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3N0YWJsZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgY29tcG9uZW50IHR5cGVzIHJlZ2lzdGVyZWQgdG8gdGhpcyBhcHBsaWNhdGlvbi5cbiAgICogVGhpcyBsaXN0IGlzIHBvcHVsYXRlZCBldmVuIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGNyZWF0ZWQuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY29tcG9uZW50VHlwZXM6IFR5cGU8YW55PltdID0gW107XG5cbiAgLyoqXG4gICAqIEdldCBhIGxpc3Qgb2YgY29tcG9uZW50cyByZWdpc3RlcmVkIHRvIHRoaXMgYXBwbGljYXRpb24uXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY29tcG9uZW50czogQ29tcG9uZW50UmVmPGFueT5bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgc3RhYmxlIG9yIHVuc3RhYmxlLlxuICAgKlxuICAgKiBAc2VlICBbVXNhZ2Ugbm90ZXNdKCNpcy1zdGFibGUtZXhhbXBsZXMpIGZvciBleGFtcGxlcyBhbmQgY2F2ZWF0cyB3aGVuIHVzaW5nIHRoaXMgQVBJLlxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHB1YmxpYyByZWFkb25seSBpc1N0YWJsZSE6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBfY29uc29sZTogQ29uc29sZSwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgcHJpdmF0ZSBfZXhjZXB0aW9uSGFuZGxlcjogRXJyb3JIYW5kbGVyLFxuICAgICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIF9pbml0U3RhdHVzOiBBcHBsaWNhdGlvbkluaXRTdGF0dXMpIHtcbiAgICB0aGlzLl9lbmZvcmNlTm9OZXdDaGFuZ2VzID0gaXNEZXZNb2RlKCk7XG5cbiAgICB0aGlzLl96b25lLm9uTWljcm90YXNrRW1wdHkuc3Vic2NyaWJlKHtcbiAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudGljaygpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGlzQ3VycmVudGx5U3RhYmxlID0gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKG9ic2VydmVyOiBPYnNlcnZlcjxib29sZWFuPikgPT4ge1xuICAgICAgdGhpcy5fc3RhYmxlID0gdGhpcy5fem9uZS5pc1N0YWJsZSAmJiAhdGhpcy5fem9uZS5oYXNQZW5kaW5nTWFjcm90YXNrcyAmJlxuICAgICAgICAgICF0aGlzLl96b25lLmhhc1BlbmRpbmdNaWNyb3Rhc2tzO1xuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5fc3RhYmxlKTtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaXNTdGFibGUgPSBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigob2JzZXJ2ZXI6IE9ic2VydmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHN1YnNjcmlwdGlvbiB0byBvblN0YWJsZSBvdXRzaWRlIHRoZSBBbmd1bGFyIFpvbmUgc28gdGhhdFxuICAgICAgLy8gdGhlIGNhbGxiYWNrIGlzIHJ1biBvdXRzaWRlIHRoZSBBbmd1bGFyIFpvbmUuXG4gICAgICBsZXQgc3RhYmxlU3ViOiBTdWJzY3JpcHRpb247XG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgc3RhYmxlU3ViID0gdGhpcy5fem9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIE5nWm9uZS5hc3NlcnROb3RJbkFuZ3VsYXJab25lKCk7XG5cbiAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZXJlIGFyZSBubyBwZW5kaW5nIG1hY3JvL21pY3JvIHRhc2tzIGluIHRoZSBuZXh0IHRpY2tcbiAgICAgICAgICAvLyB0byBhbGxvdyBmb3IgTmdab25lIHRvIHVwZGF0ZSB0aGUgc3RhdGUuXG4gICAgICAgICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9zdGFibGUgJiYgIXRoaXMuX3pvbmUuaGFzUGVuZGluZ01hY3JvdGFza3MgJiZcbiAgICAgICAgICAgICAgICAhdGhpcy5fem9uZS5oYXNQZW5kaW5nTWljcm90YXNrcykge1xuICAgICAgICAgICAgICB0aGlzLl9zdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB1bnN0YWJsZVN1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5fem9uZS5vblVuc3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIE5nWm9uZS5hc3NlcnRJbkFuZ3VsYXJab25lKCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGFibGUpIHtcbiAgICAgICAgICB0aGlzLl9zdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgc3RhYmxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHVuc3RhYmxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgKHRoaXMgYXMge2lzU3RhYmxlOiBPYnNlcnZhYmxlPGJvb2xlYW4+fSkuaXNTdGFibGUgPVxuICAgICAgICBtZXJnZShpc0N1cnJlbnRseVN0YWJsZSwgaXNTdGFibGUucGlwZShzaGFyZSgpKSk7XG4gIH1cblxuICAvKipcbiAgICogQm9vdHN0cmFwIGEgbmV3IGNvbXBvbmVudCBhdCB0aGUgcm9vdCBsZXZlbCBvZiB0aGUgYXBwbGljYXRpb24uXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBCb290c3RyYXAgcHJvY2Vzc1xuICAgKlxuICAgKiBXaGVuIGJvb3RzdHJhcHBpbmcgYSBuZXcgcm9vdCBjb21wb25lbnQgaW50byBhbiBhcHBsaWNhdGlvbiwgQW5ndWxhciBtb3VudHMgdGhlXG4gICAqIHNwZWNpZmllZCBhcHBsaWNhdGlvbiBjb21wb25lbnQgb250byBET00gZWxlbWVudHMgaWRlbnRpZmllZCBieSB0aGUgY29tcG9uZW50VHlwZSdzXG4gICAqIHNlbGVjdG9yIGFuZCBraWNrcyBvZmYgYXV0b21hdGljIGNoYW5nZSBkZXRlY3Rpb24gdG8gZmluaXNoIGluaXRpYWxpemluZyB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBPcHRpb25hbGx5LCBhIGNvbXBvbmVudCBjYW4gYmUgbW91bnRlZCBvbnRvIGEgRE9NIGVsZW1lbnQgdGhhdCBkb2VzIG5vdCBtYXRjaCB0aGVcbiAgICogY29tcG9uZW50VHlwZSdzIHNlbGVjdG9yLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKiB7QGV4YW1wbGUgY29yZS90cy9wbGF0Zm9ybS9wbGF0Zm9ybS50cyByZWdpb249J2xvbmdmb3JtJ31cbiAgICovXG4gIGJvb3RzdHJhcDxDPihjb21wb25lbnRPckZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Qz58VHlwZTxDPiwgcm9vdFNlbGVjdG9yT3JOb2RlPzogc3RyaW5nfGFueSk6XG4gICAgICBDb21wb25lbnRSZWY8Qz4ge1xuICAgIGlmICghdGhpcy5faW5pdFN0YXR1cy5kb25lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0Nhbm5vdCBib290c3RyYXAgYXMgdGhlcmUgYXJlIHN0aWxsIGFzeW5jaHJvbm91cyBpbml0aWFsaXplcnMgcnVubmluZy4gQm9vdHN0cmFwIGNvbXBvbmVudHMgaW4gdGhlIGBuZ0RvQm9vdHN0cmFwYCBtZXRob2Qgb2YgdGhlIHJvb3QgbW9kdWxlLicpO1xuICAgIH1cbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDPjtcbiAgICBpZiAoY29tcG9uZW50T3JGYWN0b3J5IGluc3RhbmNlb2YgQ29tcG9uZW50RmFjdG9yeSkge1xuICAgICAgY29tcG9uZW50RmFjdG9yeSA9IGNvbXBvbmVudE9yRmFjdG9yeTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50RmFjdG9yeSA9XG4gICAgICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudE9yRmFjdG9yeSkhO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudFR5cGVzLnB1c2goY29tcG9uZW50RmFjdG9yeS5jb21wb25lbnRUeXBlKTtcblxuICAgIC8vIENyZWF0ZSBhIGZhY3RvcnkgYXNzb2NpYXRlZCB3aXRoIHRoZSBjdXJyZW50IG1vZHVsZSBpZiBpdCdzIG5vdCBib3VuZCB0byBzb21lIG90aGVyXG4gICAgY29uc3QgbmdNb2R1bGUgPVxuICAgICAgICBpc0JvdW5kVG9Nb2R1bGUoY29tcG9uZW50RmFjdG9yeSkgPyB1bmRlZmluZWQgOiB0aGlzLl9pbmplY3Rvci5nZXQoTmdNb2R1bGVSZWYpO1xuICAgIGNvbnN0IHNlbGVjdG9yT3JOb2RlID0gcm9vdFNlbGVjdG9yT3JOb2RlIHx8IGNvbXBvbmVudEZhY3Rvcnkuc2VsZWN0b3I7XG4gICAgY29uc3QgY29tcFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKEluamVjdG9yLk5VTEwsIFtdLCBzZWxlY3Rvck9yTm9kZSwgbmdNb2R1bGUpO1xuXG4gICAgY29tcFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgdGhpcy5fdW5sb2FkQ29tcG9uZW50KGNvbXBSZWYpO1xuICAgIH0pO1xuICAgIGNvbnN0IHRlc3RhYmlsaXR5ID0gY29tcFJlZi5pbmplY3Rvci5nZXQoVGVzdGFiaWxpdHksIG51bGwpO1xuICAgIGlmICh0ZXN0YWJpbGl0eSkge1xuICAgICAgY29tcFJlZi5pbmplY3Rvci5nZXQoVGVzdGFiaWxpdHlSZWdpc3RyeSlcbiAgICAgICAgICAucmVnaXN0ZXJBcHBsaWNhdGlvbihjb21wUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHRlc3RhYmlsaXR5KTtcbiAgICB9XG5cbiAgICB0aGlzLl9sb2FkQ29tcG9uZW50KGNvbXBSZWYpO1xuICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgdGhpcy5fY29uc29sZS5sb2coXG4gICAgICAgICAgYEFuZ3VsYXIgaXMgcnVubmluZyBpbiBkZXZlbG9wbWVudCBtb2RlLiBDYWxsIGVuYWJsZVByb2RNb2RlKCkgdG8gZW5hYmxlIHByb2R1Y3Rpb24gbW9kZS5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBSZWY7XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlIHRoaXMgbWV0aG9kIHRvIGV4cGxpY2l0bHkgcHJvY2VzcyBjaGFuZ2UgZGV0ZWN0aW9uIGFuZCBpdHMgc2lkZS1lZmZlY3RzLlxuICAgKlxuICAgKiBJbiBkZXZlbG9wbWVudCBtb2RlLCBgdGljaygpYCBhbHNvIHBlcmZvcm1zIGEgc2Vjb25kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgdG8gZW5zdXJlIHRoYXQgbm9cbiAgICogZnVydGhlciBjaGFuZ2VzIGFyZSBkZXRlY3RlZC4gSWYgYWRkaXRpb25hbCBjaGFuZ2VzIGFyZSBwaWNrZWQgdXAgZHVyaW5nIHRoaXMgc2Vjb25kIGN5Y2xlLFxuICAgKiBiaW5kaW5ncyBpbiB0aGUgYXBwIGhhdmUgc2lkZS1lZmZlY3RzIHRoYXQgY2Fubm90IGJlIHJlc29sdmVkIGluIGEgc2luZ2xlIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogcGFzcy5cbiAgICogSW4gdGhpcyBjYXNlLCBBbmd1bGFyIHRocm93cyBhbiBlcnJvciwgc2luY2UgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBjYW4gb25seSBoYXZlIG9uZSBjaGFuZ2VcbiAgICogZGV0ZWN0aW9uIHBhc3MgZHVyaW5nIHdoaWNoIGFsbCBjaGFuZ2UgZGV0ZWN0aW9uIG11c3QgY29tcGxldGUuXG4gICAqL1xuICB0aWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9ydW5uaW5nVGljaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcHBsaWNhdGlvblJlZi50aWNrIGlzIGNhbGxlZCByZWN1cnNpdmVseScpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9ydW5uaW5nVGljayA9IHRydWU7XG4gICAgICBmb3IgKGxldCB2aWV3IG9mIHRoaXMuX3ZpZXdzKSB7XG4gICAgICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2VuZm9yY2VOb05ld0NoYW5nZXMpIHtcbiAgICAgICAgZm9yIChsZXQgdmlldyBvZiB0aGlzLl92aWV3cykge1xuICAgICAgICAgIHZpZXcuY2hlY2tOb0NoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIEF0dGVudGlvbjogRG9uJ3QgcmV0aHJvdyBhcyBpdCBjb3VsZCBjYW5jZWwgc3Vic2NyaXB0aW9ucyB0byBPYnNlcnZhYmxlcyFcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5fZXhjZXB0aW9uSGFuZGxlci5oYW5kbGVFcnJvcihlKSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX3J1bm5pbmdUaWNrID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaGVzIGEgdmlldyBzbyB0aGF0IGl0IHdpbGwgYmUgZGlydHkgY2hlY2tlZC5cbiAgICogVGhlIHZpZXcgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGRldGFjaGVkIHdoZW4gaXQgaXMgZGVzdHJveWVkLlxuICAgKiBUaGlzIHdpbGwgdGhyb3cgaWYgdGhlIHZpZXcgaXMgYWxyZWFkeSBhdHRhY2hlZCB0byBhIFZpZXdDb250YWluZXIuXG4gICAqL1xuICBhdHRhY2hWaWV3KHZpZXdSZWY6IFZpZXdSZWYpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3ID0gKHZpZXdSZWYgYXMgSW50ZXJuYWxWaWV3UmVmKTtcbiAgICB0aGlzLl92aWV3cy5wdXNoKHZpZXcpO1xuICAgIHZpZXcuYXR0YWNoVG9BcHBSZWYodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogRGV0YWNoZXMgYSB2aWV3IGZyb20gZGlydHkgY2hlY2tpbmcgYWdhaW4uXG4gICAqL1xuICBkZXRhY2hWaWV3KHZpZXdSZWY6IFZpZXdSZWYpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3ID0gKHZpZXdSZWYgYXMgSW50ZXJuYWxWaWV3UmVmKTtcbiAgICByZW1vdmUodGhpcy5fdmlld3MsIHZpZXcpO1xuICAgIHZpZXcuZGV0YWNoRnJvbUFwcFJlZigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZENvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgdGhpcy50aWNrKCk7XG4gICAgdGhpcy5jb21wb25lbnRzLnB1c2goY29tcG9uZW50UmVmKTtcbiAgICAvLyBHZXQgdGhlIGxpc3RlbmVycyBsYXppbHkgdG8gcHJldmVudCBESSBjeWNsZXMuXG4gICAgY29uc3QgbGlzdGVuZXJzID1cbiAgICAgICAgdGhpcy5faW5qZWN0b3IuZ2V0KEFQUF9CT09UU1RSQVBfTElTVEVORVIsIFtdKS5jb25jYXQodGhpcy5fYm9vdHN0cmFwTGlzdGVuZXJzKTtcbiAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKGNvbXBvbmVudFJlZikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdW5sb2FkQ29tcG9uZW50KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICByZW1vdmUodGhpcy5jb21wb25lbnRzLCBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvLyBUT0RPKGFseGh1Yik6IERpc3Bvc2Ugb2YgdGhlIE5nWm9uZS5cbiAgICB0aGlzLl92aWV3cy5zbGljZSgpLmZvckVhY2goKHZpZXcpID0+IHZpZXcuZGVzdHJveSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYXR0YWNoZWQgdmlld3MuXG4gICAqL1xuICBnZXQgdmlld0NvdW50KCkge1xuICAgIHJldHVybiB0aGlzLl92aWV3cy5sZW5ndGg7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlPFQ+KGxpc3Q6IFRbXSwgZWw6IFQpOiB2b2lkIHtcbiAgY29uc3QgaW5kZXggPSBsaXN0LmluZGV4T2YoZWwpO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfbGFzdERlZmluZWQ8VD4oYXJnczogVFtdKTogVHx1bmRlZmluZWQge1xuICBmb3IgKGxldCBpID0gYXJncy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChhcmdzW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBhcmdzW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBfbWVyZ2VBcnJheXMocGFydHM6IGFueVtdW10pOiBhbnlbXSB7XG4gIGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcbiAgcGFydHMuZm9yRWFjaCgocGFydCkgPT4gcGFydCAmJiByZXN1bHQucHVzaCguLi5wYXJ0KSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=