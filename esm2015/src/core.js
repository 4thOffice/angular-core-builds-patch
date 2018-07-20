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
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
export { ANALYZE_FOR_ENTRY_COMPONENTS, Attribute, ContentChild, ContentChildren, Query, ViewChild, ViewChildren, Component, Directive, HostBinding, HostListener, Input, Output, Pipe, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, ViewEncapsulation } from './metadata';
export { Version, VERSION } from './version';
export { defineInjectable, defineInjector, forwardRef, resolveForwardRef, Injectable, inject, INJECTOR, Injector, ReflectiveInjector, createInjector, ResolvedReflectiveFactory, ReflectiveKey, InjectionToken, Inject, Optional, Self, SkipSelf, Host } from './di';
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, enableProdMode, isDevMode, createPlatformFactory, NgProbeToken } from './application_ref';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, APP_BOOTSTRAP_LISTENER } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export { NgZone } from './zone';
export { RenderComponentType, Renderer, Renderer2, RendererFactory2, RendererStyleFlags2, RootRenderer } from './render';
export { COMPILER_OPTIONS, Compiler, CompilerFactory, ModuleWithComponentFactories, ComponentFactory, ComponentRef, ComponentFactoryResolver, ElementRef, NgModuleFactory, NgModuleRef, NgModuleFactoryLoader, getModuleFactory, QueryList, SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig, TemplateRef, ViewContainerRef, EmbeddedViewRef, ViewRef } from './linker';
export { DebugElement, DebugNode, asNativeElements, getDebugNode } from './debug/debug_node';
export { Testability, TestabilityRegistry, setTestabilityGetter } from './testability/testability';
export { ChangeDetectionStrategy, ChangeDetectorRef, DefaultIterableDiffer, IterableDiffers, KeyValueDiffers, SimpleChange, WrappedValue } from './change_detection';
export { platformCore } from './platform_core_providers';
export { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from './i18n/tokens';
export { ApplicationModule } from './application_module';
export { wtfCreateScope, wtfLeave, wtfStartTimeRange, wtfEndTimeRange } from './profile/profile';
export { Type } from './type';
export { EventEmitter } from './event_emitter';
export { ErrorHandler } from './error_handler';
export { ɵALLOW_MULTIPLE_PLATFORMS, ɵAPP_ID_RANDOM_PROVIDER, ɵdefaultIterableDiffers, ɵdefaultKeyValueDiffers, ɵdevModeEqual, ɵisListLikeIterable, ɵChangeDetectorStatus, ɵisDefaultChangeDetectionStrategy, ɵConsole, ɵinject, ɵsetCurrentInjector, ɵAPP_ROOT, ɵivyEnabled, ɵComponentFactory, ɵCodegenComponentFactoryResolver, ɵresolveComponentResources, ɵReflectionCapabilities, ɵRenderDebugInfo, ɵ_sanitizeHtml, ɵ_sanitizeStyle, ɵ_sanitizeUrl, ɵglobal, ɵlooseIdentical, ɵstringify, ɵmakeDecorator, ɵisObservable, ɵisPromise, ɵclearOverrides, ɵinitServicesIfNeeded, ɵoverrideComponentView, ɵoverrideProvider, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from './core_private_export';
export { ɵdefineComponent, ɵdefineDirective, ɵdefinePipe, ɵdefineNgModule, ɵdetectChanges, ɵrenderComponent, ɵdirectiveInject, ɵinjectElementRef, ɵinjectTemplateRef, ɵinjectViewContainerRef, ɵinjectChangeDetectorRef, ɵinjectAttribute, ɵPublicFeature, ɵInheritDefinitionFeature, ɵNgOnChangesFeature, ɵmarkDirty, ɵNgModuleFactory, ɵNC, ɵC, ɵE, ɵNH, ɵNM, ɵNS, ɵEe, ɵL, ɵT, ɵV, ɵQ, ɵQr, ɵd, ɵP, ɵb, ɵi1, ɵi2, ɵi3, ɵi4, ɵi5, ɵi6, ɵi7, ɵi8, ɵiV, ɵpb1, ɵpb2, ɵpb3, ɵpb4, ɵpbV, ɵf0, ɵf1, ɵf2, ɵf3, ɵf4, ɵf5, ɵf6, ɵf7, ɵf8, ɵfV, ɵcR, ɵcr, ɵqR, ɵql, ɵe, ɵp, ɵpD, ɵrS, ɵa, ɵs, ɵsm, ɵsp, ɵsa, ɵcp, ɵt, ɵv, ɵst, ɵld, ɵPp, ɵwhenRendered, ɵiA, ɵiEM, ɵiI, ɵIV, ɵiM, ɵbypassSanitizationTrustHtml, ɵbypassSanitizationTrustStyle, ɵbypassSanitizationTrustScript, ɵbypassSanitizationTrustUrl, ɵbypassSanitizationTrustResourceUrl, ɵsanitizeHtml, ɵsanitizeStyle, ɵsanitizeUrl, ɵsanitizeResourceUrl } from './core_render3_private_export';
export { Sanitizer, SecurityContext } from './sanitization/security';
export { ɵregisterModuleFactory, ɵEMPTY_ARRAY, ɵEMPTY_MAP, ɵand, ɵccf, ɵcmf, ɵcrt, ɵdid, ɵeld, ɵelementEventFullName, ɵgetComponentViewDefinitionFactory, ɵinlineInterpolate, ɵinterpolate, ɵmod, ɵmpd, ɵncd, ɵnov, ɵpid, ɵprd, ɵpad, ɵpod, ɵppd, ɵqud, ɵted, ɵunv, ɵvid } from './codegen_private_exports';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLG9RQUFjLFlBQVksQ0FBQztBQUMzQixpQ0FBYyxXQUFXLENBQUM7QUFFMUIsOFBBQWMsTUFBTSxDQUFDO0FBQ3JCLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVMLE9BQU8sRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDekgsT0FBTyxFQUFDLGVBQWUsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFFLHVCQUFjLFFBQVEsQ0FBQztBQUN2Qiw4R0FBYyxVQUFVLENBQUM7QUFDekIsaVdBQWMsVUFBVSxDQUFDO0FBQ3pCLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBWSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RHLE9BQU8sRUFBaUIsV0FBVyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDakgsZ0pBQWMsb0JBQW9CLENBQUM7QUFDbkMsNkJBQWMsMkJBQTJCLENBQUM7QUFDMUMsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkcsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDM0csT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLDJvQkFBYyx1QkFBdUIsQ0FBQztBQUN0QyxrM0JBQWMsK0JBQStCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRSxnUkFBYywyQkFBMkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIEVudHJ5IHBvaW50IGZyb20gd2hpY2ggeW91IHNob3VsZCBpbXBvcnQgYWxsIHB1YmxpYyBjb3JlIEFQSXMuXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vbWV0YWRhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi92ZXJzaW9uJztcbmV4cG9ydCB7VHlwZURlY29yYXRvcn0gZnJvbSAnLi91dGlsL2RlY29yYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9kaSc7XG5leHBvcnQge2NyZWF0ZVBsYXRmb3JtLCBhc3NlcnRQbGF0Zm9ybSwgZGVzdHJveVBsYXRmb3JtLCBnZXRQbGF0Zm9ybSwgUGxhdGZvcm1SZWYsIEFwcGxpY2F0aW9uUmVmLCBlbmFibGVQcm9kTW9kZSwgaXNEZXZNb2RlLCBjcmVhdGVQbGF0Zm9ybUZhY3RvcnksIE5nUHJvYmVUb2tlbn0gZnJvbSAnLi9hcHBsaWNhdGlvbl9yZWYnO1xuZXhwb3J0IHtBUFBfSUQsIFBBQ0tBR0VfUk9PVF9VUkwsIFBMQVRGT1JNX0lOSVRJQUxJWkVSLCBQTEFURk9STV9JRCwgQVBQX0JPT1RTVFJBUF9MSVNURU5FUn0gZnJvbSAnLi9hcHBsaWNhdGlvbl90b2tlbnMnO1xuZXhwb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uSW5pdFN0YXR1c30gZnJvbSAnLi9hcHBsaWNhdGlvbl9pbml0JztcbmV4cG9ydCAqIGZyb20gJy4vem9uZSc7XG5leHBvcnQgKiBmcm9tICcuL3JlbmRlcic7XG5leHBvcnQgKiBmcm9tICcuL2xpbmtlcic7XG5leHBvcnQge0RlYnVnRWxlbWVudCwgRGVidWdOb2RlLCBhc05hdGl2ZUVsZW1lbnRzLCBnZXREZWJ1Z05vZGUsIFByZWRpY2F0ZX0gZnJvbSAnLi9kZWJ1Zy9kZWJ1Z19ub2RlJztcbmV4cG9ydCB7R2V0VGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBzZXRUZXN0YWJpbGl0eUdldHRlcn0gZnJvbSAnLi90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5leHBvcnQgKiBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9wbGF0Zm9ybV9jb3JlX3Byb3ZpZGVycyc7XG5leHBvcnQge1RSQU5TTEFUSU9OUywgVFJBTlNMQVRJT05TX0ZPUk1BVCwgTE9DQUxFX0lELCBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneX0gZnJvbSAnLi9pMThuL3Rva2Vucyc7XG5leHBvcnQge0FwcGxpY2F0aW9uTW9kdWxlfSBmcm9tICcuL2FwcGxpY2F0aW9uX21vZHVsZSc7XG5leHBvcnQge3d0ZkNyZWF0ZVNjb3BlLCB3dGZMZWF2ZSwgd3RmU3RhcnRUaW1lUmFuZ2UsIHd0ZkVuZFRpbWVSYW5nZSwgV3RmU2NvcGVGbn0gZnJvbSAnLi9wcm9maWxlL3Byb2ZpbGUnO1xuZXhwb3J0IHtUeXBlfSBmcm9tICcuL3R5cGUnO1xuZXhwb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4vZXZlbnRfZW1pdHRlcic7XG5leHBvcnQge0Vycm9ySGFuZGxlcn0gZnJvbSAnLi9lcnJvcl9oYW5kbGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29yZV9wcml2YXRlX2V4cG9ydCc7XG5leHBvcnQgKiBmcm9tICcuL2NvcmVfcmVuZGVyM19wcml2YXRlX2V4cG9ydCc7XG5leHBvcnQge1Nhbml0aXplciwgU2VjdXJpdHlDb250ZXh0fSBmcm9tICcuL3Nhbml0aXphdGlvbi9zZWN1cml0eSc7XG5leHBvcnQgKiBmcm9tICcuL2NvZGVnZW5fcHJpdmF0ZV9leHBvcnRzJztcbiJdfQ==