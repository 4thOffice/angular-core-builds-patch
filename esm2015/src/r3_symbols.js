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
export { defineInjectable, defineInjector } from './di/defs';
export { inject } from './di/injector';
export { defineNgModule as ɵdefineNgModule } from './render3/definition';
export { NgModuleFactory as ɵNgModuleFactory } from './render3/ng_module_ref';
/** *
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually \@angular/core, which needs to be compiled specially.
  @type {?} */
export const ITS_JUST_ANGULAR = true;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfc3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3IzX3N5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFxQkEsT0FBTyxFQUErRCxnQkFBZ0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDekgsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUMsY0FBYyxJQUFJLGVBQWUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxlQUFlLElBQUksZ0JBQWdCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFNNUUsYUFBYSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qXG4gKiBUaGlzIGZpbGUgZXhpc3RzIHRvIHN1cHBvcnQgY29tcGlsYXRpb24gb2YgQGFuZ3VsYXIvY29yZSBpbiBJdnkgbW9kZS5cbiAqXG4gKiBXaGVuIHRoZSBBbmd1bGFyIGNvbXBpbGVyIHByb2Nlc3NlcyBhIGNvbXBpbGF0aW9uIHVuaXQsIGl0IG5vcm1hbGx5IHdyaXRlcyBpbXBvcnRzIHRvXG4gKiBAYW5ndWxhci9jb3JlLiBXaGVuIGNvbXBpbGluZyB0aGUgY29yZSBwYWNrYWdlIGl0c2VsZiB0aGlzIHN0cmF0ZWd5IGlzbid0IHVzYWJsZS4gSW5zdGVhZCwgdGhlXG4gKiBjb21waWxlciB3cml0ZXMgaW1wb3J0cyB0byB0aGlzIGZpbGUuXG4gKlxuICogT25seSBhIHN1YnNldCBvZiBzdWNoIGltcG9ydHMgYXJlIHN1cHBvcnRlZCAtIGNvcmUgaXMgbm90IGFsbG93ZWQgdG8gZGVjbGFyZSBjb21wb25lbnRzIG9yIHBpcGVzLlxuICogQSBjaGVjayBpbiBuZ3RzYydzIHRyYW5zbGF0b3IudHMgdmFsaWRhdGVzIHRoaXMgY29uZGl0aW9uLlxuICpcbiAqIFRoZSBiZWxvdyBzeW1ib2xzIGFyZSB1c2VkIGZvciBASW5qZWN0YWJsZSBhbmQgQE5nTW9kdWxlIGNvbXBpbGF0aW9uLlxuICovXG5cbmV4cG9ydCB7SW5qZWN0YWJsZURlZiBhcyDJtUluamVjdGFibGVEZWYsIEluamVjdG9yRGVmIGFzIMm1SW5qZWN0b3JEZWYsIGRlZmluZUluamVjdGFibGUsIGRlZmluZUluamVjdG9yfSBmcm9tICcuL2RpL2RlZnMnO1xuZXhwb3J0IHtpbmplY3R9IGZyb20gJy4vZGkvaW5qZWN0b3InO1xuZXhwb3J0IHtOZ01vZHVsZURlZiBhcyDJtU5nTW9kdWxlRGVmLCBOZ01vZHVsZURlZldpdGhNZXRhIGFzIMm1TmdNb2R1bGVEZWZXaXRoTWV0YX0gZnJvbSAnLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuZXhwb3J0IHtkZWZpbmVOZ01vZHVsZSBhcyDJtWRlZmluZU5nTW9kdWxlfSBmcm9tICcuL3JlbmRlcjMvZGVmaW5pdGlvbic7XG5leHBvcnQge05nTW9kdWxlRmFjdG9yeSBhcyDJtU5nTW9kdWxlRmFjdG9yeX0gZnJvbSAnLi9yZW5kZXIzL25nX21vZHVsZV9yZWYnO1xuXG4vKipcbiAqIFRoZSBleGlzdGVuY2Ugb2YgdGhpcyBjb25zdGFudCAoaW4gdGhpcyBwYXJ0aWN1bGFyIGZpbGUpIGluZm9ybXMgdGhlIEFuZ3VsYXIgY29tcGlsZXIgdGhhdCB0aGVcbiAqIGN1cnJlbnQgcHJvZ3JhbSBpcyBhY3R1YWxseSBAYW5ndWxhci9jb3JlLCB3aGljaCBuZWVkcyB0byBiZSBjb21waWxlZCBzcGVjaWFsbHkuXG4gKi9cbmV4cG9ydCBjb25zdCBJVFNfSlVTVF9BTkdVTEFSID0gdHJ1ZTtcbiJdfQ==