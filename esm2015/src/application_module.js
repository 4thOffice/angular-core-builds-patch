/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
import { ApplicationRef } from './application_ref';
import { APP_ID_RANDOM_PROVIDER } from './application_tokens';
import { IterableDiffers, KeyValueDiffers, defaultIterableDiffers, defaultKeyValueDiffers } from './change_detection/change_detection';
import { Console } from './console';
import { Injector } from './di';
import { Inject, Optional, SkipSelf } from './di/metadata';
import { ErrorHandler } from './error_handler';
import { LOCALE_ID } from './i18n/tokens';
import { ComponentFactoryResolver } from './linker';
import { Compiler } from './linker/compiler';
import { NgModule } from './metadata';
import { SCHEDULER } from './render3/component_ref';
import { NgZone } from './zone';
import * as i0 from "./r3_symbols";
import * as i1 from "./application_ref";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @return {?}
 */
export function _iterableDiffersFactory() {
    return defaultIterableDiffers;
}
/**
 * @return {?}
 */
export function _keyValueDiffersFactory() {
    return defaultKeyValueDiffers;
}
/**
 * @param {?=} locale
 * @return {?}
 */
export function _localeFactory(locale) {
    return locale || 'en-US';
}
/**
 * A built-in [dependency injection token](guide/glossary#di-token)
 * that is used to configure the root injector for bootstrapping.
 * @type {?}
 */
export const APPLICATION_MODULE_PROVIDERS = [
    {
        provide: ApplicationRef,
        useClass: ApplicationRef,
        deps: [NgZone, Console, Injector, ErrorHandler, ComponentFactoryResolver, ApplicationInitStatus]
    },
    { provide: SCHEDULER, deps: [NgZone], useFactory: zoneSchedulerFactory },
    {
        provide: ApplicationInitStatus,
        useClass: ApplicationInitStatus,
        deps: [[new Optional(), APP_INITIALIZER]]
    },
    { provide: Compiler, useClass: Compiler, deps: [] },
    APP_ID_RANDOM_PROVIDER,
    { provide: IterableDiffers, useFactory: _iterableDiffersFactory, deps: [] },
    { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory, deps: [] },
    {
        provide: LOCALE_ID,
        useFactory: _localeFactory,
        deps: [[new Inject(LOCALE_ID), new Optional(), new SkipSelf()]]
    },
];
/**
 * Schedule work at next available slot.
 *
 * In Ivy this is just `requestAnimationFrame`. For compatibility reasons when bootstrapped
 * using `platformRef.bootstrap` we need to use `NgZone.onStable` as the scheduling mechanism.
 * This overrides the scheduling mechanism in Ivy to `NgZone.onStable`.
 *
 * @param {?} ngZone NgZone to use for scheduling.
 * @return {?}
 */
export function zoneSchedulerFactory(ngZone) {
    /** @type {?} */
    let queue = [];
    ngZone.onStable.subscribe((/**
     * @return {?}
     */
    () => {
        while (queue.length) {
            (/** @type {?} */ (queue.pop()))();
        }
    }));
    return (/**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { queue.push(fn); });
}
/**
 * Configures the root injector for an app with
 * providers of `\@angular/core` dependencies that `ApplicationRef` needs
 * to bootstrap components.
 *
 * Re-exported by `BrowserModule`, which is included automatically in the root
 * `AppModule` when you create a new app with the CLI `new` command.
 *
 * \@publicApi
 */
export class ApplicationModule {
    // Inject ApplicationRef to make it eager...
    /**
     * @param {?} appRef
     */
    constructor(appRef) { }
}
ApplicationModule.decorators = [
    { type: NgModule, args: [{ providers: APPLICATION_MODULE_PROVIDERS },] },
];
/** @nocollapse */
ApplicationModule.ctorParameters = () => [
    { type: ApplicationRef }
];
/** @nocollapse */ ApplicationModule.ngModuleDef = i0.defineNgModule({ type: ApplicationModule });
/** @nocollapse */ ApplicationModule.ngInjectorDef = i0.defineInjector({ factory: function ApplicationModule_Factory(t) { return new (t || ApplicationModule)(i0.inject(i1.ApplicationRef)); }, providers: APPLICATION_MODULE_PROVIDERS, imports: [] });
/*@__PURE__*/ i0.setClassMetadata(ApplicationModule, [{
        type: NgModule,
        args: [{ providers: APPLICATION_MODULE_PROVIDERS }]
    }], function () { return [{ type: i1.ApplicationRef }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvYXBwbGljYXRpb25fbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsZUFBZSxFQUFFLHFCQUFxQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDckksT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsUUFBUSxFQUFpQixNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2xELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBRTlCLE1BQU0sVUFBVSx1QkFBdUI7SUFDckMsT0FBTyxzQkFBc0IsQ0FBQztBQUNoQyxDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLHVCQUF1QjtJQUNyQyxPQUFPLHNCQUFzQixDQUFDO0FBQ2hDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBQyxNQUFlO0lBQzVDLE9BQU8sTUFBTSxJQUFJLE9BQU8sQ0FBQztBQUMzQixDQUFDOzs7Ozs7QUFNRCxNQUFNLE9BQU8sNEJBQTRCLEdBQXFCO0lBQzVEO1FBQ0UsT0FBTyxFQUFFLGNBQWM7UUFDdkIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsSUFBSSxFQUNBLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixDQUFDO0tBQy9GO0lBQ0QsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBQztJQUN0RTtRQUNFLE9BQU8sRUFBRSxxQkFBcUI7UUFDOUIsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUM7S0FDMUM7SUFDRCxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0lBQ2pELHNCQUFzQjtJQUN0QixFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7SUFDekUsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0lBQ3pFO1FBQ0UsT0FBTyxFQUFFLFNBQVM7UUFDbEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztLQUNoRTtDQUNGOzs7Ozs7Ozs7OztBQVdELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxNQUFjOztRQUM3QyxLQUFLLEdBQW1CLEVBQUU7SUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzs7SUFBQyxHQUFHLEVBQUU7UUFDN0IsT0FBTyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25CLG1CQUFBLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNIOzs7O0lBQU8sVUFBUyxFQUFjLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUN0RCxDQUFDOzs7Ozs7Ozs7OztBQWFELE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBRTVCLFlBQVksTUFBc0IsSUFBRyxDQUFDOzs7WUFIdkMsUUFBUSxTQUFDLEVBQUMsU0FBUyxFQUFFLDRCQUE0QixFQUFDOzs7O1lBbkYzQyxjQUFjOzswREFvRlQsaUJBQWlCO3dIQUFqQixpQkFBaUIsK0NBRFIsNEJBQTRCO2tDQUNyQyxpQkFBaUI7Y0FEN0IsUUFBUTtlQUFDLEVBQUMsU0FBUyxFQUFFLDRCQUE0QixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzfSBmcm9tICcuL2FwcGxpY2F0aW9uX2luaXQnO1xuaW1wb3J0IHtBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWYnO1xuaW1wb3J0IHtBUFBfSURfUkFORE9NX1BST1ZJREVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge0l0ZXJhYmxlRGlmZmVycywgS2V5VmFsdWVEaWZmZXJzLCBkZWZhdWx0SXRlcmFibGVEaWZmZXJzLCBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzfSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJy4vY29uc29sZSc7XG5pbXBvcnQge0luamVjdG9yLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnLi9kaSc7XG5pbXBvcnQge0luamVjdCwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICcuL2RpL21ldGFkYXRhJztcbmltcG9ydCB7RXJyb3JIYW5kbGVyfSBmcm9tICcuL2Vycm9yX2hhbmRsZXInO1xuaW1wb3J0IHtMT0NBTEVfSUR9IGZyb20gJy4vaTE4bi90b2tlbnMnO1xuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyJztcbmltcG9ydCB7Q29tcGlsZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBpbGVyJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHtTQ0hFRFVMRVJ9IGZyb20gJy4vcmVuZGVyMy9jb21wb25lbnRfcmVmJztcbmltcG9ydCB7Tmdab25lfSBmcm9tICcuL3pvbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gX2l0ZXJhYmxlRGlmZmVyc0ZhY3RvcnkoKSB7XG4gIHJldHVybiBkZWZhdWx0SXRlcmFibGVEaWZmZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2tleVZhbHVlRGlmZmVyc0ZhY3RvcnkoKSB7XG4gIHJldHVybiBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2xvY2FsZUZhY3RvcnkobG9jYWxlPzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGxvY2FsZSB8fCAnZW4tVVMnO1xufVxuXG4vKipcbiAqIEEgYnVpbHQtaW4gW2RlcGVuZGVuY3kgaW5qZWN0aW9uIHRva2VuXShndWlkZS9nbG9zc2FyeSNkaS10b2tlbilcbiAqIHRoYXQgaXMgdXNlZCB0byBjb25maWd1cmUgdGhlIHJvb3QgaW5qZWN0b3IgZm9yIGJvb3RzdHJhcHBpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9NT0RVTEVfUFJPVklERVJTOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICB7XG4gICAgcHJvdmlkZTogQXBwbGljYXRpb25SZWYsXG4gICAgdXNlQ2xhc3M6IEFwcGxpY2F0aW9uUmVmLFxuICAgIGRlcHM6XG4gICAgICAgIFtOZ1pvbmUsIENvbnNvbGUsIEluamVjdG9yLCBFcnJvckhhbmRsZXIsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQXBwbGljYXRpb25Jbml0U3RhdHVzXVxuICB9LFxuICB7cHJvdmlkZTogU0NIRURVTEVSLCBkZXBzOiBbTmdab25lXSwgdXNlRmFjdG9yeTogem9uZVNjaGVkdWxlckZhY3Rvcnl9LFxuICB7XG4gICAgcHJvdmlkZTogQXBwbGljYXRpb25Jbml0U3RhdHVzLFxuICAgIHVzZUNsYXNzOiBBcHBsaWNhdGlvbkluaXRTdGF0dXMsXG4gICAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgQVBQX0lOSVRJQUxJWkVSXV1cbiAgfSxcbiAge3Byb3ZpZGU6IENvbXBpbGVyLCB1c2VDbGFzczogQ29tcGlsZXIsIGRlcHM6IFtdfSxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUixcbiAge3Byb3ZpZGU6IEl0ZXJhYmxlRGlmZmVycywgdXNlRmFjdG9yeTogX2l0ZXJhYmxlRGlmZmVyc0ZhY3RvcnksIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IEtleVZhbHVlRGlmZmVycywgdXNlRmFjdG9yeTogX2tleVZhbHVlRGlmZmVyc0ZhY3RvcnksIGRlcHM6IFtdfSxcbiAge1xuICAgIHByb3ZpZGU6IExPQ0FMRV9JRCxcbiAgICB1c2VGYWN0b3J5OiBfbG9jYWxlRmFjdG9yeSxcbiAgICBkZXBzOiBbW25ldyBJbmplY3QoTE9DQUxFX0lEKSwgbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpXV1cbiAgfSxcbl07XG5cbi8qKlxuICogU2NoZWR1bGUgd29yayBhdCBuZXh0IGF2YWlsYWJsZSBzbG90LlxuICpcbiAqIEluIEl2eSB0aGlzIGlzIGp1c3QgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAuIEZvciBjb21wYXRpYmlsaXR5IHJlYXNvbnMgd2hlbiBib290c3RyYXBwZWRcbiAqIHVzaW5nIGBwbGF0Zm9ybVJlZi5ib290c3RyYXBgIHdlIG5lZWQgdG8gdXNlIGBOZ1pvbmUub25TdGFibGVgIGFzIHRoZSBzY2hlZHVsaW5nIG1lY2hhbmlzbS5cbiAqIFRoaXMgb3ZlcnJpZGVzIHRoZSBzY2hlZHVsaW5nIG1lY2hhbmlzbSBpbiBJdnkgdG8gYE5nWm9uZS5vblN0YWJsZWAuXG4gKlxuICogQHBhcmFtIG5nWm9uZSBOZ1pvbmUgdG8gdXNlIGZvciBzY2hlZHVsaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gem9uZVNjaGVkdWxlckZhY3Rvcnkobmdab25lOiBOZ1pvbmUpOiAoZm46ICgpID0+IHZvaWQpID0+IHZvaWQge1xuICBsZXQgcXVldWU6ICgoKSA9PiB2b2lkKVtdID0gW107XG4gIG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgIHF1ZXVlLnBvcCgpICEoKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24oZm46ICgpID0+IHZvaWQpIHsgcXVldWUucHVzaChmbik7IH07XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgcm9vdCBpbmplY3RvciBmb3IgYW4gYXBwIHdpdGhcbiAqIHByb3ZpZGVycyBvZiBgQGFuZ3VsYXIvY29yZWAgZGVwZW5kZW5jaWVzIHRoYXQgYEFwcGxpY2F0aW9uUmVmYCBuZWVkc1xuICogdG8gYm9vdHN0cmFwIGNvbXBvbmVudHMuXG4gKlxuICogUmUtZXhwb3J0ZWQgYnkgYEJyb3dzZXJNb2R1bGVgLCB3aGljaCBpcyBpbmNsdWRlZCBhdXRvbWF0aWNhbGx5IGluIHRoZSByb290XG4gKiBgQXBwTW9kdWxlYCB3aGVuIHlvdSBjcmVhdGUgYSBuZXcgYXBwIHdpdGggdGhlIENMSSBgbmV3YCBjb21tYW5kLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQE5nTW9kdWxlKHtwcm92aWRlcnM6IEFQUExJQ0FUSU9OX01PRFVMRV9QUk9WSURFUlN9KVxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uTW9kdWxlIHtcbiAgLy8gSW5qZWN0IEFwcGxpY2F0aW9uUmVmIHRvIG1ha2UgaXQgZWFnZXIuLi5cbiAgY29uc3RydWN0b3IoYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge31cbn1cbiJdfQ==