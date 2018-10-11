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
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, createPlatformFactory, NgProbeToken } from './application_ref';
export { enableProdMode, isDevMode } from './is_dev_mode';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, APP_BOOTSTRAP_LISTENER } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export { NgZone, ɵNoopNgZone } from './zone';
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
export { ɵALLOW_MULTIPLE_PLATFORMS, ɵAPP_ID_RANDOM_PROVIDER, ɵdefaultIterableDiffers, ɵdefaultKeyValueDiffers, ɵdevModeEqual, ɵisListLikeIterable, ɵChangeDetectorStatus, ɵisDefaultChangeDetectionStrategy, ɵConsole, ɵgetInjectableDef, ɵinject, ɵsetCurrentInjector, ɵAPP_ROOT, ɵivyEnabled, ɵComponentFactory, ɵCodegenComponentFactoryResolver, ɵresolveComponentResources, ɵReflectionCapabilities, ɵRenderDebugInfo, ɵ_sanitizeHtml, ɵ_sanitizeStyle, ɵ_sanitizeUrl, ɵglobal, ɵlooseIdentical, ɵstringify, ɵmakeDecorator, ɵisObservable, ɵisPromise, ɵclearOverrides, ɵinitServicesIfNeeded, ɵoverrideComponentView, ɵoverrideProvider, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from './core_private_export';
export { ɵdefineBase, ɵdefineComponent, ɵdefineDirective, ɵdefinePipe, ɵdefineNgModule, ɵdetectChanges, ɵrenderComponent, ɵRender3ComponentFactory, ɵRender3ComponentRef, ɵdirectiveInject, ɵinjectRenderer2, ɵinjectAttribute, ɵgetFactoryOf, ɵgetInheritedFactory, ɵtemplateRefExtractor, ɵPublicFeature, ɵInheritDefinitionFeature, ɵNgOnChangesFeature, ɵRender3NgModuleRef, ɵmarkDirty, ɵNgModuleFactory, ɵNO_CHANGE, ɵcontainer, ɵnextContext, ɵelementStart, ɵnamespaceHTML, ɵnamespaceMathML, ɵnamespaceSVG, ɵelement, ɵlistener, ɵtext, ɵembeddedViewStart, ɵquery, ɵregisterContentQuery, ɵprojection, ɵbind, ɵinterpolation1, ɵinterpolation2, ɵinterpolation3, ɵinterpolation4, ɵinterpolation5, ɵinterpolation6, ɵinterpolation7, ɵinterpolation8, ɵinterpolationV, ɵpipeBind1, ɵpipeBind2, ɵpipeBind3, ɵpipeBind4, ɵpipeBindV, ɵpureFunction0, ɵpureFunction1, ɵpureFunction2, ɵpureFunction3, ɵpureFunction4, ɵpureFunction5, ɵpureFunction6, ɵpureFunction7, ɵpureFunction8, ɵpureFunctionV, ɵgetCurrentView, ɵrestoreView, ɵcontainerRefreshStart, ɵcontainerRefreshEnd, ɵqueryRefresh, ɵloadQueryList, ɵelementEnd, ɵelementProperty, ɵprojectionDef, ɵreference, ɵenableBindings, ɵdisableBindings, ɵelementAttribute, ɵelementStyling, ɵelementStylingMap, ɵelementStyleProp, ɵelementStylingApply, ɵelementClassProp, ɵtextBinding, ɵtemplate, ɵembeddedViewEnd, ɵstore, ɵload, ɵpipe, ɵwhenRendered, ɵi18nAttribute, ɵi18nExp, ɵi18nStart, ɵi18nEnd, ɵi18nApply, ɵi18nExpMapping, ɵi18nInterpolation1, ɵi18nInterpolation2, ɵi18nInterpolation3, ɵi18nInterpolation4, ɵi18nInterpolation5, ɵi18nInterpolation6, ɵi18nInterpolation7, ɵi18nInterpolation8, ɵi18nInterpolationV, ɵi18nMapping, ɵWRAP_RENDERER_FACTORY2, ɵRender3DebugRendererFactory2, ɵcompileNgModuleDefs, ɵpatchComponentDefWithScope, ɵcompileComponent, ɵcompileDirective, ɵcompilePipe, ɵsanitizeHtml, ɵsanitizeStyle, ɵsanitizeUrl, ɵsanitizeResourceUrl, ɵbypassSanitizationTrustHtml, ɵbypassSanitizationTrustStyle, ɵbypassSanitizationTrustScript, ɵbypassSanitizationTrustUrl, ɵbypassSanitizationTrustResourceUrl, ɵgetContext, ɵaddPlayer, ɵgetPlayers, ɵcompileNgModuleFactory__POST_NGCC__, ɵR3_COMPILE_COMPONENT__POST_NGCC__, ɵR3_COMPILE_DIRECTIVE__POST_NGCC__, ɵR3_COMPILE_INJECTABLE__POST_NGCC__, ɵR3_COMPILE_NGMODULE__POST_NGCC__, ɵR3_COMPILE_PIPE__POST_NGCC__, ɵivyEnable__POST_NGCC__, ɵR3_ELEMENT_REF_FACTORY__POST_NGCC__, ɵR3_TEMPLATE_REF_FACTORY__POST_NGCC__, ɵR3_CHANGE_DETECTOR_REF_FACTORY__POST_NGCC__, ɵR3_VIEW_CONTAINER_REF_FACTORY__POST_NGCC__ } from './core_render3_private_export';
export { Sanitizer, SecurityContext } from './sanitization/security';
export { ɵregisterModuleFactory, ɵEMPTY_ARRAY, ɵEMPTY_MAP, ɵand, ɵccf, ɵcmf, ɵcrt, ɵdid, ɵeld, ɵelementEventFullName, ɵgetComponentViewDefinitionFactory, ɵinlineInterpolate, ɵinterpolate, ɵmod, ɵmpd, ɵncd, ɵnov, ɵpid, ɵprd, ɵpad, ɵpod, ɵppd, ɵqud, ɵted, ɵunv, ɵvid } from './codegen_private_exports';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLG9RQUFjLFlBQVksQ0FBQztBQUMzQixpQ0FBYyxXQUFXLENBQUM7QUFFMUIsOFBBQWMsTUFBTSxDQUFDO0FBQ3JCLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqSyxPQUFPLEVBQUMsY0FBYyxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3pILE9BQU8sRUFBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRSxvQ0FBYyxRQUFRLENBQUM7QUFDdkIsOEdBQWMsVUFBVSxDQUFDO0FBQ3pCLGlXQUFjLFVBQVUsQ0FBQztBQUN6QixPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUN0RyxPQUFPLEVBQWlCLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2pILGdKQUFjLG9CQUFvQixDQUFDO0FBQ25DLDZCQUFjLDJCQUEyQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzNHLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3Qyw4cEJBQWMsdUJBQXVCLENBQUM7QUFDdEMsczdFQUFjLCtCQUErQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDbkUsZ1JBQWMsMkJBQTJCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBFbnRyeSBwb2ludCBmcm9tIHdoaWNoIHlvdSBzaG91bGQgaW1wb3J0IGFsbCBwdWJsaWMgY29yZSBBUElzLlxuICovXG5leHBvcnQgKiBmcm9tICcuL21ldGFkYXRhJztcbmV4cG9ydCAqIGZyb20gJy4vdmVyc2lvbic7XG5leHBvcnQge1R5cGVEZWNvcmF0b3J9IGZyb20gJy4vdXRpbC9kZWNvcmF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vZGknO1xuZXhwb3J0IHtjcmVhdGVQbGF0Zm9ybSwgYXNzZXJ0UGxhdGZvcm0sIGRlc3Ryb3lQbGF0Zm9ybSwgZ2V0UGxhdGZvcm0sIFBsYXRmb3JtUmVmLCBBcHBsaWNhdGlvblJlZiwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5LCBOZ1Byb2JlVG9rZW59IGZyb20gJy4vYXBwbGljYXRpb25fcmVmJztcbmV4cG9ydCB7ZW5hYmxlUHJvZE1vZGUsIGlzRGV2TW9kZX0gZnJvbSAnLi9pc19kZXZfbW9kZSc7XG5leHBvcnQge0FQUF9JRCwgUEFDS0FHRV9ST09UX1VSTCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBMQVRGT1JNX0lELCBBUFBfQk9PVFNUUkFQX0xJU1RFTkVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5leHBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzfSBmcm9tICcuL2FwcGxpY2F0aW9uX2luaXQnO1xuZXhwb3J0ICogZnJvbSAnLi96b25lJztcbmV4cG9ydCAqIGZyb20gJy4vcmVuZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbGlua2VyJztcbmV4cG9ydCB7RGVidWdFbGVtZW50LCBEZWJ1Z05vZGUsIGFzTmF0aXZlRWxlbWVudHMsIGdldERlYnVnTm9kZSwgUHJlZGljYXRlfSBmcm9tICcuL2RlYnVnL2RlYnVnX25vZGUnO1xuZXhwb3J0IHtHZXRUZXN0YWJpbGl0eSwgVGVzdGFiaWxpdHksIFRlc3RhYmlsaXR5UmVnaXN0cnksIHNldFRlc3RhYmlsaXR5R2V0dGVyfSBmcm9tICcuL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5JztcbmV4cG9ydCAqIGZyb20gJy4vY2hhbmdlX2RldGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3BsYXRmb3JtX2NvcmVfcHJvdmlkZXJzJztcbmV4cG9ydCB7VFJBTlNMQVRJT05TLCBUUkFOU0xBVElPTlNfRk9STUFULCBMT0NBTEVfSUQsIE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5fSBmcm9tICcuL2kxOG4vdG9rZW5zJztcbmV4cG9ydCB7QXBwbGljYXRpb25Nb2R1bGV9IGZyb20gJy4vYXBwbGljYXRpb25fbW9kdWxlJztcbmV4cG9ydCB7d3RmQ3JlYXRlU2NvcGUsIHd0ZkxlYXZlLCB3dGZTdGFydFRpbWVSYW5nZSwgd3RmRW5kVGltZVJhbmdlLCBXdGZTY29wZUZufSBmcm9tICcuL3Byb2ZpbGUvcHJvZmlsZSc7XG5leHBvcnQge1R5cGV9IGZyb20gJy4vdHlwZSc7XG5leHBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnLi9ldmVudF9lbWl0dGVyJztcbmV4cG9ydCB7RXJyb3JIYW5kbGVyfSBmcm9tICcuL2Vycm9yX2hhbmRsZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlX3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vY29yZV9yZW5kZXIzX3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCB7U2FuaXRpemVyLCBTZWN1cml0eUNvbnRleHR9IGZyb20gJy4vc2FuaXRpemF0aW9uL3NlY3VyaXR5JztcbmV4cG9ydCAqIGZyb20gJy4vY29kZWdlbl9wcml2YXRlX2V4cG9ydHMnO1xuIl19