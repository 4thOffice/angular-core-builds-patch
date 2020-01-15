/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 *
 * @fileoverview
 * This file is the index file collecting all of the symbols published on the global.ng namespace.
 *
 * The reason why this file/module is separate global_utils.ts file is that we use this file
 * to generate a d.ts file containing all the published symbols that is then compared to the golden
 * file in the public_api_guard test.
 *
 * Generated from: packages/core/src/render3/global_utils_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export { markDirty } from './instructions/all';
export { getComponent, getContext, getDebugNode, getDirectives, getHostElement, getInjector, getListeners, getRootComponents, getViewComponent } from './util/discovery_utils';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX3V0aWxzX2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvZ2xvYmFsX3V0aWxzX2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sd0JBQXdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogVGhpcyBmaWxlIGlzIHRoZSBpbmRleCBmaWxlIGNvbGxlY3RpbmcgYWxsIG9mIHRoZSBzeW1ib2xzIHB1Ymxpc2hlZCBvbiB0aGUgZ2xvYmFsLm5nIG5hbWVzcGFjZS5cbiAqXG4gKiBUaGUgcmVhc29uIHdoeSB0aGlzIGZpbGUvbW9kdWxlIGlzIHNlcGFyYXRlIGdsb2JhbF91dGlscy50cyBmaWxlIGlzIHRoYXQgd2UgdXNlIHRoaXMgZmlsZVxuICogdG8gZ2VuZXJhdGUgYSBkLnRzIGZpbGUgY29udGFpbmluZyBhbGwgdGhlIHB1Ymxpc2hlZCBzeW1ib2xzIHRoYXQgaXMgdGhlbiBjb21wYXJlZCB0byB0aGUgZ29sZGVuXG4gKiBmaWxlIGluIHRoZSBwdWJsaWNfYXBpX2d1YXJkIHRlc3QuXG4gKi9cblxuZXhwb3J0IHttYXJrRGlydHl9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zL2FsbCc7XG5leHBvcnQge2dldENvbXBvbmVudCwgZ2V0Q29udGV4dCwgZ2V0RGVidWdOb2RlLCBnZXREaXJlY3RpdmVzLCBnZXRIb3N0RWxlbWVudCwgZ2V0SW5qZWN0b3IsIGdldExpc3RlbmVycywgZ2V0Um9vdENvbXBvbmVudHMsIGdldFZpZXdDb21wb25lbnR9IGZyb20gJy4vdXRpbC9kaXNjb3ZlcnlfdXRpbHMnO1xuIl19