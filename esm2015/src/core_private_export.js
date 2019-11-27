/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/core_private_export.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { ALLOW_MULTIPLE_PLATFORMS as ɵALLOW_MULTIPLE_PLATFORMS } from './application_ref';
export { APP_ID_RANDOM_PROVIDER as ɵAPP_ID_RANDOM_PROVIDER } from './application_tokens';
export { defaultIterableDiffers as ɵdefaultIterableDiffers, defaultKeyValueDiffers as ɵdefaultKeyValueDiffers } from './change_detection/change_detection';
export { devModeEqual as ɵdevModeEqual } from './change_detection/change_detection_util';
export { isListLikeIterable as ɵisListLikeIterable } from './change_detection/change_detection_util';
export { ChangeDetectorStatus as ɵChangeDetectorStatus, isDefaultChangeDetectionStrategy as ɵisDefaultChangeDetectionStrategy } from './change_detection/constants';
export { Console as ɵConsole } from './console';
export { inject, setCurrentInjector as ɵsetCurrentInjector, ɵɵinject } from './di/injector_compatibility';
export { getInjectableDef as ɵgetInjectableDef } from './di/interface/defs';
export { INJECTOR_SCOPE as ɵINJECTOR_SCOPE } from './di/scope';
export { DEFAULT_LOCALE_ID as ɵDEFAULT_LOCALE_ID } from './i18n/localization';
export { ivyEnabled as ɵivyEnabled } from './ivy_switch';
export { ComponentFactory as ɵComponentFactory } from './linker/component_factory';
export { CodegenComponentFactoryResolver as ɵCodegenComponentFactoryResolver } from './linker/component_factory_resolver';
export { clearResolutionOfComponentResourcesQueue as ɵclearResolutionOfComponentResourcesQueue, resolveComponentResources as ɵresolveComponentResources } from './metadata/resource_loading';
export { ReflectionCapabilities as ɵReflectionCapabilities } from './reflection/reflection_capabilities';
export { _sanitizeHtml as ɵ_sanitizeHtml } from './sanitization/html_sanitizer';
export { _sanitizeStyle as ɵ_sanitizeStyle } from './sanitization/style_sanitizer';
export { _sanitizeUrl as ɵ_sanitizeUrl } from './sanitization/url_sanitizer';
export { global as ɵglobal } from './util/global';
export { looseIdentical as ɵlooseIdentical, } from './util/comparison';
export { stringify as ɵstringify } from './util/stringify';
export { makeDecorator as ɵmakeDecorator } from './util/decorators';
export { isObservable as ɵisObservable, isPromise as ɵisPromise } from './util/lang';
export { clearOverrides as ɵclearOverrides, initServicesIfNeeded as ɵinitServicesIfNeeded, overrideComponentView as ɵoverrideComponentView, overrideProvider as ɵoverrideProvider } from './view/index';
export { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR as ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from './view/provider';
export { LocaleDataIndex as ɵLocaleDataIndex, getLocalePluralCase as ɵgetLocalePluralCase, findLocaleData as ɵfindLocaleData, registerLocaleData as ɵregisterLocaleData, unregisterAllLocaleData as ɵunregisterLocaleData } from './i18n/locale_data_api';
export { allowSanitizationBypassAndThrow as ɵallowSanitizationBypassAndThrow, getSanitizationBypassType as ɵgetSanitizationBypassType, unwrapSafeValue as ɵunwrapSafeValue } from './sanitization/bypass';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9wcml2YXRlX2V4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvcmVfcHJpdmF0ZV9leHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLHdCQUF3QixJQUFJLHlCQUF5QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDeEYsT0FBTyxFQUFDLHNCQUFzQixJQUFJLHVCQUF1QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkYsT0FBTyxFQUFDLHNCQUFzQixJQUFJLHVCQUF1QixFQUFFLHNCQUFzQixJQUFJLHVCQUF1QixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDekosT0FBTyxFQUFDLFlBQVksSUFBSSxhQUFhLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN2RixPQUFPLEVBQUMsa0JBQWtCLElBQUksbUJBQW1CLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRyxPQUFPLEVBQUMsb0JBQW9CLElBQUkscUJBQXFCLEVBQUUsZ0NBQWdDLElBQUksaUNBQWlDLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNsSyxPQUFPLEVBQUMsT0FBTyxJQUFJLFFBQVEsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFFLGtCQUFrQixJQUFJLG1CQUFtQixFQUFFLFFBQVEsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hHLE9BQU8sRUFBQyxnQkFBZ0IsSUFBSSxpQkFBaUIsRUFBaUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRyxPQUFPLEVBQUMsY0FBYyxJQUFJLGVBQWUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUMsaUJBQWlCLElBQUksa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RSxPQUFPLEVBQUMsVUFBVSxJQUFJLFdBQVcsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZ0JBQWdCLElBQUksaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRixPQUFPLEVBQUMsK0JBQStCLElBQUksZ0NBQWdDLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4SCxPQUFPLEVBQUMsd0NBQXdDLElBQUkseUNBQXlDLEVBQUUseUJBQXlCLElBQUksMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzTCxPQUFPLEVBQUMsc0JBQXNCLElBQUksdUJBQXVCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RyxPQUFPLEVBQUMsYUFBYSxJQUFJLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxjQUFjLElBQUksZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDakYsT0FBTyxFQUFDLFlBQVksSUFBSSxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUMsTUFBTSxJQUFJLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxJQUFJLGVBQWUsR0FBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxTQUFTLElBQUksVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDekQsT0FBTyxFQUFDLGFBQWEsSUFBSSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsWUFBWSxJQUFJLGFBQWEsRUFBRSxTQUFTLElBQUksVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxjQUFjLElBQUksZUFBZSxFQUFFLG9CQUFvQixJQUFJLHFCQUFxQixFQUFFLHFCQUFxQixJQUFJLHNCQUFzQixFQUFFLGdCQUFnQixJQUFJLGlCQUFpQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RNLE9BQU8sRUFBQyxxQ0FBcUMsSUFBSSxzQ0FBc0MsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hILE9BQU8sRUFBQyxlQUFlLElBQUksZ0JBQWdCLEVBQWtGLG1CQUFtQixJQUFJLG9CQUFvQixFQUFFLGNBQWMsSUFBSSxlQUFlLEVBQUUsa0JBQWtCLElBQUksbUJBQW1CLEVBQUUsdUJBQXVCLElBQUkscUJBQXFCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN4VSxPQUFPLEVBQUMsK0JBQStCLElBQUksZ0NBQWdDLEVBQUUseUJBQXlCLElBQUksMEJBQTBCLEVBQTZCLGVBQWUsSUFBSSxnQkFBZ0IsRUFBK0osTUFBTSx1QkFBdUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZXhwb3J0IHtBTExPV19NVUxUSVBMRV9QTEFURk9STVMgYXMgybVBTExPV19NVUxUSVBMRV9QTEFURk9STVN9IGZyb20gJy4vYXBwbGljYXRpb25fcmVmJztcbmV4cG9ydCB7QVBQX0lEX1JBTkRPTV9QUk9WSURFUiBhcyDJtUFQUF9JRF9SQU5ET01fUFJPVklERVJ9IGZyb20gJy4vYXBwbGljYXRpb25fdG9rZW5zJztcbmV4cG9ydCB7ZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyBhcyDJtWRlZmF1bHRJdGVyYWJsZURpZmZlcnMsIGRlZmF1bHRLZXlWYWx1ZURpZmZlcnMgYXMgybVkZWZhdWx0S2V5VmFsdWVEaWZmZXJzfSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5leHBvcnQge2Rldk1vZGVFcXVhbCBhcyDJtWRldk1vZGVFcXVhbH0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCc7XG5leHBvcnQge2lzTGlzdExpa2VJdGVyYWJsZSBhcyDJtWlzTGlzdExpa2VJdGVyYWJsZX0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCc7XG5leHBvcnQge0NoYW5nZURldGVjdG9yU3RhdHVzIGFzIMm1Q2hhbmdlRGV0ZWN0b3JTdGF0dXMsIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5IGFzIMm1aXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJy4vY2hhbmdlX2RldGVjdGlvbi9jb25zdGFudHMnO1xuZXhwb3J0IHtDb25zb2xlIGFzIMm1Q29uc29sZX0gZnJvbSAnLi9jb25zb2xlJztcbmV4cG9ydCB7aW5qZWN0LCBzZXRDdXJyZW50SW5qZWN0b3IgYXMgybVzZXRDdXJyZW50SW5qZWN0b3IsIMm1ybVpbmplY3R9IGZyb20gJy4vZGkvaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5leHBvcnQge2dldEluamVjdGFibGVEZWYgYXMgybVnZXRJbmplY3RhYmxlRGVmLCDJtcm1SW5qZWN0YWJsZURlZiwgybXJtUluamVjdG9yRGVmfSBmcm9tICcuL2RpL2ludGVyZmFjZS9kZWZzJztcbmV4cG9ydCB7SU5KRUNUT1JfU0NPUEUgYXMgybVJTkpFQ1RPUl9TQ09QRX0gZnJvbSAnLi9kaS9zY29wZSc7XG5leHBvcnQge0RFRkFVTFRfTE9DQUxFX0lEIGFzIMm1REVGQVVMVF9MT0NBTEVfSUR9IGZyb20gJy4vaTE4bi9sb2NhbGl6YXRpb24nO1xuZXhwb3J0IHtpdnlFbmFibGVkIGFzIMm1aXZ5RW5hYmxlZH0gZnJvbSAnLi9pdnlfc3dpdGNoJztcbmV4cG9ydCB7Q29tcG9uZW50RmFjdG9yeSBhcyDJtUNvbXBvbmVudEZhY3Rvcnl9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmV4cG9ydCB7Q29kZWdlbkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciBhcyDJtUNvZGVnZW5Db21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5X3Jlc29sdmVyJztcbmV4cG9ydCB7Y2xlYXJSZXNvbHV0aW9uT2ZDb21wb25lbnRSZXNvdXJjZXNRdWV1ZSBhcyDJtWNsZWFyUmVzb2x1dGlvbk9mQ29tcG9uZW50UmVzb3VyY2VzUXVldWUsIHJlc29sdmVDb21wb25lbnRSZXNvdXJjZXMgYXMgybVyZXNvbHZlQ29tcG9uZW50UmVzb3VyY2VzfSBmcm9tICcuL21ldGFkYXRhL3Jlc291cmNlX2xvYWRpbmcnO1xuZXhwb3J0IHtSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzIGFzIMm1UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmV4cG9ydCB7R2V0dGVyRm4gYXMgybVHZXR0ZXJGbiwgTWV0aG9kRm4gYXMgybVNZXRob2RGbiwgU2V0dGVyRm4gYXMgybVTZXR0ZXJGbn0gZnJvbSAnLi9yZWZsZWN0aW9uL3R5cGVzJztcbmV4cG9ydCB7X3Nhbml0aXplSHRtbCBhcyDJtV9zYW5pdGl6ZUh0bWx9IGZyb20gJy4vc2FuaXRpemF0aW9uL2h0bWxfc2FuaXRpemVyJztcbmV4cG9ydCB7X3Nhbml0aXplU3R5bGUgYXMgybVfc2FuaXRpemVTdHlsZX0gZnJvbSAnLi9zYW5pdGl6YXRpb24vc3R5bGVfc2FuaXRpemVyJztcbmV4cG9ydCB7X3Nhbml0aXplVXJsIGFzIMm1X3Nhbml0aXplVXJsfSBmcm9tICcuL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyJztcbmV4cG9ydCB7Z2xvYmFsIGFzIMm1Z2xvYmFsfSBmcm9tICcuL3V0aWwvZ2xvYmFsJztcbmV4cG9ydCB7bG9vc2VJZGVudGljYWwgYXMgybVsb29zZUlkZW50aWNhbCx9IGZyb20gJy4vdXRpbC9jb21wYXJpc29uJztcbmV4cG9ydCB7c3RyaW5naWZ5IGFzIMm1c3RyaW5naWZ5fSBmcm9tICcuL3V0aWwvc3RyaW5naWZ5JztcbmV4cG9ydCB7bWFrZURlY29yYXRvciBhcyDJtW1ha2VEZWNvcmF0b3J9IGZyb20gJy4vdXRpbC9kZWNvcmF0b3JzJztcbmV4cG9ydCB7aXNPYnNlcnZhYmxlIGFzIMm1aXNPYnNlcnZhYmxlLCBpc1Byb21pc2UgYXMgybVpc1Byb21pc2V9IGZyb20gJy4vdXRpbC9sYW5nJztcbmV4cG9ydCB7Y2xlYXJPdmVycmlkZXMgYXMgybVjbGVhck92ZXJyaWRlcywgaW5pdFNlcnZpY2VzSWZOZWVkZWQgYXMgybVpbml0U2VydmljZXNJZk5lZWRlZCwgb3ZlcnJpZGVDb21wb25lbnRWaWV3IGFzIMm1b3ZlcnJpZGVDb21wb25lbnRWaWV3LCBvdmVycmlkZVByb3ZpZGVyIGFzIMm1b3ZlcnJpZGVQcm92aWRlcn0gZnJvbSAnLi92aWV3L2luZGV4JztcbmV4cG9ydCB7Tk9UX0ZPVU5EX0NIRUNLX09OTFlfRUxFTUVOVF9JTkpFQ1RPUiBhcyDJtU5PVF9GT1VORF9DSEVDS19PTkxZX0VMRU1FTlRfSU5KRUNUT1J9IGZyb20gJy4vdmlldy9wcm92aWRlcic7XG5leHBvcnQge0xvY2FsZURhdGFJbmRleCBhcyDJtUxvY2FsZURhdGFJbmRleCwgQ3VycmVuY3lJbmRleCBhcyDJtUN1cnJlbmN5SW5kZXgsIEV4dHJhTG9jYWxlRGF0YUluZGV4IGFzIMm1RXh0cmFMb2NhbGVEYXRhSW5kZXgsIGdldExvY2FsZVBsdXJhbENhc2UgYXMgybVnZXRMb2NhbGVQbHVyYWxDYXNlLCBmaW5kTG9jYWxlRGF0YSBhcyDJtWZpbmRMb2NhbGVEYXRhLCByZWdpc3RlckxvY2FsZURhdGEgYXMgybVyZWdpc3RlckxvY2FsZURhdGEsIHVucmVnaXN0ZXJBbGxMb2NhbGVEYXRhIGFzIMm1dW5yZWdpc3RlckxvY2FsZURhdGF9IGZyb20gJy4vaTE4bi9sb2NhbGVfZGF0YV9hcGknO1xuZXhwb3J0IHthbGxvd1Nhbml0aXphdGlvbkJ5cGFzc0FuZFRocm93IGFzIMm1YWxsb3dTYW5pdGl6YXRpb25CeXBhc3NBbmRUaHJvdywgZ2V0U2FuaXRpemF0aW9uQnlwYXNzVHlwZSBhcyDJtWdldFNhbml0aXphdGlvbkJ5cGFzc1R5cGUsIEJ5cGFzc1R5cGUgYXMgybVCeXBhc3NUeXBlLCB1bndyYXBTYWZlVmFsdWUgYXMgybV1bndyYXBTYWZlVmFsdWUsIFNhZmVIdG1sIGFzIMm1U2FmZUh0bWwsIFNhZmVSZXNvdXJjZVVybCBhcyDJtVNhZmVSZXNvdXJjZVVybCwgU2FmZVNjcmlwdCBhcyDJtVNhZmVTY3JpcHQsIFNhZmVTdHlsZSBhcyDJtVNhZmVTdHlsZSwgU2FmZVVybCBhcyDJtVNhZmVVcmwsIFNhZmVWYWx1ZSBhcyDJtVNhZmVWYWx1ZX0gZnJvbSAnLi9zYW5pdGl6YXRpb24vYnlwYXNzJztcbiJdfQ==