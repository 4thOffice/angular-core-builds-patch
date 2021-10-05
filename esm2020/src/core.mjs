/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
export * from './metadata';
export * from './version';
export * from './di';
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, createPlatformFactory, NgProbeToken } from './application_ref';
export { enableProdMode, isDevMode } from './util/is_dev_mode';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, APP_BOOTSTRAP_LISTENER } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export * from './zone';
export * from './render';
export * from './linker';
export * from './linker/ng_module_factory_loader_impl';
export { DebugElement, DebugEventListener, DebugNode, asNativeElements, getDebugNode } from './debug/debug_node';
export { Testability, TestabilityRegistry, setTestabilityGetter } from './testability/testability';
export * from './change_detection';
export * from './platform_core_providers';
export { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, DEFAULT_CURRENCY_CODE, MissingTranslationStrategy } from './i18n/tokens';
export { ApplicationModule } from './application_module';
export { Type } from './interface/type';
export { EventEmitter } from './event_emitter';
export { ErrorHandler } from './error_handler';
export * from './core_private_export';
export * from './core_render3_private_export';
export { SecurityContext } from './sanitization/security';
export { Sanitizer } from './sanitization/sanitizer';
export * from './codegen_private_exports';
export { createNgModuleRef } from './render3/ng_module_ref';
import { global } from './util/global';
if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    // This helper is to give a reasonable error message to people upgrading to v9 that have not yet
    // installed `@angular/localize` in their app.
    // tslint:disable-next-line: no-toplevel-property-access
    global.$localize = global.$localize || function () {
        throw new Error('It looks like your application or one of its dependencies is using i18n.\n' +
            'Angular 9 introduced a global `$localize()` function that needs to be loaded.\n' +
            'Please run `ng add @angular/localize` from the Angular CLI.\n' +
            '(For non-CLI projects, add `import \'@angular/localize/init\';` to your `polyfills.ts` file.\n' +
            'For server-side rendering applications add the import to your `main.server.ts` file.)');
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7R0FJRztBQUNILGNBQWMsWUFBWSxDQUFDO0FBQzNCLGNBQWMsV0FBVyxDQUFDO0FBRTFCLGNBQWMsTUFBTSxDQUFDO0FBQ3JCLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqSyxPQUFPLEVBQUMsY0FBYyxFQUFFLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9BQU8sRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDekgsT0FBTyxFQUFDLGVBQWUsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzFFLGNBQWMsUUFBUSxDQUFDO0FBQ3ZCLGNBQWMsVUFBVSxDQUFDO0FBQ3pCLGNBQWMsVUFBVSxDQUFDO0FBQ3pCLGNBQWMsd0NBQXdDLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFDMUgsT0FBTyxFQUFpQixXQUFXLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNqSCxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsMkJBQTJCLENBQUM7QUFDMUMsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUUsMEJBQTBCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFlLElBQUksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLCtCQUErQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsY0FBYywyQkFBMkIsQ0FBQztBQUMxQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUUxRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRTtJQUNqRCxnR0FBZ0c7SUFDaEcsOENBQThDO0lBQzlDLHdEQUF3RDtJQUN4RCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUk7UUFDckMsTUFBTSxJQUFJLEtBQUssQ0FDWCw0RUFBNEU7WUFDNUUsaUZBQWlGO1lBQ2pGLCtEQUErRDtZQUMvRCxnR0FBZ0c7WUFDaEcsdUZBQXVGLENBQUMsQ0FBQztJQUMvRixDQUFDLENBQUM7Q0FDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW50cnkgcG9pbnQgZnJvbSB3aGljaCB5b3Ugc2hvdWxkIGltcG9ydCBhbGwgcHVibGljIGNvcmUgQVBJcy5cbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9tZXRhZGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IHtUeXBlRGVjb3JhdG9yfSBmcm9tICcuL3V0aWwvZGVjb3JhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL2RpJztcbmV4cG9ydCB7Y3JlYXRlUGxhdGZvcm0sIGFzc2VydFBsYXRmb3JtLCBkZXN0cm95UGxhdGZvcm0sIGdldFBsYXRmb3JtLCBQbGF0Zm9ybVJlZiwgQXBwbGljYXRpb25SZWYsIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgTmdQcm9iZVRva2VufSBmcm9tICcuL2FwcGxpY2F0aW9uX3JlZic7XG5leHBvcnQge2VuYWJsZVByb2RNb2RlLCBpc0Rldk1vZGV9IGZyb20gJy4vdXRpbC9pc19kZXZfbW9kZSc7XG5leHBvcnQge0FQUF9JRCwgUEFDS0FHRV9ST09UX1VSTCwgUExBVEZPUk1fSU5JVElBTElaRVIsIFBMQVRGT1JNX0lELCBBUFBfQk9PVFNUUkFQX0xJU1RFTkVSfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5leHBvcnQge0FQUF9JTklUSUFMSVpFUiwgQXBwbGljYXRpb25Jbml0U3RhdHVzfSBmcm9tICcuL2FwcGxpY2F0aW9uX2luaXQnO1xuZXhwb3J0ICogZnJvbSAnLi96b25lJztcbmV4cG9ydCAqIGZyb20gJy4vcmVuZGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbGlua2VyJztcbmV4cG9ydCAqIGZyb20gJy4vbGlua2VyL25nX21vZHVsZV9mYWN0b3J5X2xvYWRlcl9pbXBsJztcbmV4cG9ydCB7RGVidWdFbGVtZW50LCBEZWJ1Z0V2ZW50TGlzdGVuZXIsIERlYnVnTm9kZSwgYXNOYXRpdmVFbGVtZW50cywgZ2V0RGVidWdOb2RlLCBQcmVkaWNhdGV9IGZyb20gJy4vZGVidWcvZGVidWdfbm9kZSc7XG5leHBvcnQge0dldFRlc3RhYmlsaXR5LCBUZXN0YWJpbGl0eSwgVGVzdGFiaWxpdHlSZWdpc3RyeSwgc2V0VGVzdGFiaWxpdHlHZXR0ZXJ9IGZyb20gJy4vdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuZXhwb3J0ICogZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vcGxhdGZvcm1fY29yZV9wcm92aWRlcnMnO1xuZXhwb3J0IHtUUkFOU0xBVElPTlMsIFRSQU5TTEFUSU9OU19GT1JNQVQsIExPQ0FMRV9JRCwgREVGQVVMVF9DVVJSRU5DWV9DT0RFLCBNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneX0gZnJvbSAnLi9pMThuL3Rva2Vucyc7XG5leHBvcnQge0FwcGxpY2F0aW9uTW9kdWxlfSBmcm9tICcuL2FwcGxpY2F0aW9uX21vZHVsZSc7XG5leHBvcnQge0Fic3RyYWN0VHlwZSwgVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvdHlwZSc7XG5leHBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnLi9ldmVudF9lbWl0dGVyJztcbmV4cG9ydCB7RXJyb3JIYW5kbGVyfSBmcm9tICcuL2Vycm9yX2hhbmRsZXInO1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlX3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vY29yZV9yZW5kZXIzX3ByaXZhdGVfZXhwb3J0JztcbmV4cG9ydCB7U2VjdXJpdHlDb250ZXh0fSBmcm9tICcuL3Nhbml0aXphdGlvbi9zZWN1cml0eSc7XG5leHBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi9zYW5pdGl6YXRpb24vc2FuaXRpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29kZWdlbl9wcml2YXRlX2V4cG9ydHMnO1xuZXhwb3J0IHtjcmVhdGVOZ01vZHVsZVJlZn0gZnJvbSAnLi9yZW5kZXIzL25nX21vZHVsZV9yZWYnO1xuXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi91dGlsL2dsb2JhbCc7XG5pZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbmdEZXZNb2RlKSB7XG4gIC8vIFRoaXMgaGVscGVyIGlzIHRvIGdpdmUgYSByZWFzb25hYmxlIGVycm9yIG1lc3NhZ2UgdG8gcGVvcGxlIHVwZ3JhZGluZyB0byB2OSB0aGF0IGhhdmUgbm90IHlldFxuICAvLyBpbnN0YWxsZWQgYEBhbmd1bGFyL2xvY2FsaXplYCBpbiB0aGVpciBhcHAuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzXG4gIGdsb2JhbC4kbG9jYWxpemUgPSBnbG9iYWwuJGxvY2FsaXplIHx8IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0l0IGxvb2tzIGxpa2UgeW91ciBhcHBsaWNhdGlvbiBvciBvbmUgb2YgaXRzIGRlcGVuZGVuY2llcyBpcyB1c2luZyBpMThuLlxcbicgK1xuICAgICAgICAnQW5ndWxhciA5IGludHJvZHVjZWQgYSBnbG9iYWwgYCRsb2NhbGl6ZSgpYCBmdW5jdGlvbiB0aGF0IG5lZWRzIHRvIGJlIGxvYWRlZC5cXG4nICtcbiAgICAgICAgJ1BsZWFzZSBydW4gYG5nIGFkZCBAYW5ndWxhci9sb2NhbGl6ZWAgZnJvbSB0aGUgQW5ndWxhciBDTEkuXFxuJyArXG4gICAgICAgICcoRm9yIG5vbi1DTEkgcHJvamVjdHMsIGFkZCBgaW1wb3J0IFxcJ0Bhbmd1bGFyL2xvY2FsaXplL2luaXRcXCc7YCB0byB5b3VyIGBwb2x5ZmlsbHMudHNgIGZpbGUuXFxuJyArXG4gICAgICAgICdGb3Igc2VydmVyLXNpZGUgcmVuZGVyaW5nIGFwcGxpY2F0aW9ucyBhZGQgdGhlIGltcG9ydCB0byB5b3VyIGBtYWluLnNlcnZlci50c2AgZmlsZS4pJyk7XG4gIH07XG59XG4iXX0=