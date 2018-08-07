/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defineInjectable, defineInjector, } from '../../di/defs';
import { inject } from '../../di/injector';
import * as r3 from '../index';
import * as sanitization from '../../sanitization/sanitization';
/**
 * A mapping of the @angular/core API surface used in generated expressions to the actual symbols.
 *
 * This should be kept up to date with the public exports of @angular/core.
 */
export var angularCoreEnv = {
    'ɵdefineComponent': r3.defineComponent,
    'ɵdefineDirective': r3.defineDirective,
    'defineInjectable': defineInjectable,
    'defineInjector': defineInjector,
    'ɵdefineNgModule': r3.defineNgModule,
    'ɵdefinePipe': r3.definePipe,
    'ɵdirectiveInject': r3.directiveInject,
    'inject': inject,
    'ɵinjectAttribute': r3.injectAttribute,
    'ɵinjectChangeDetectorRef': r3.injectChangeDetectorRef,
    'ɵinjectElementRef': r3.injectElementRef,
    'ɵinjectTemplateRef': r3.injectTemplateRef,
    'ɵinjectViewContainerRef': r3.injectViewContainerRef,
    'ɵNgOnChangesFeature': r3.NgOnChangesFeature,
    'ɵPublicFeature': r3.PublicFeature,
    'ɵInheritDefinitionFeature': r3.InheritDefinitionFeature,
    'ɵa': r3.a,
    'ɵb': r3.b,
    'ɵC': r3.C,
    'ɵx': r3.x,
    'ɵcR': r3.cR,
    'ɵcr': r3.cr,
    'ɵd': r3.d,
    'ɵql': r3.ql,
    'ɵNH': r3.NH,
    'ɵNM': r3.NM,
    'ɵNS': r3.NS,
    'ɵE': r3.E,
    'ɵe': r3.e,
    'ɵEe': r3.Ee,
    'ɵf0': r3.f0,
    'ɵf1': r3.f1,
    'ɵf2': r3.f2,
    'ɵf3': r3.f3,
    'ɵf4': r3.f4,
    'ɵf5': r3.f5,
    'ɵf6': r3.f6,
    'ɵf7': r3.f7,
    'ɵf8': r3.f8,
    'ɵfV': r3.fV,
    'ɵgV': r3.gV,
    'ɵrV': r3.rV,
    'ɵi1': r3.i1,
    'ɵi2': r3.i2,
    'ɵi3': r3.i3,
    'ɵi4': r3.i4,
    'ɵi5': r3.i5,
    'ɵi6': r3.i6,
    'ɵi7': r3.i7,
    'ɵi8': r3.i8,
    'ɵiV': r3.iV,
    'ɵcp': r3.cp,
    'ɵL': r3.L,
    'ɵld': r3.ld,
    'ɵP': r3.P,
    'ɵp': r3.p,
    'ɵpb1': r3.pb1,
    'ɵpb2': r3.pb2,
    'ɵpb3': r3.pb3,
    'ɵpb4': r3.pb4,
    'ɵpbV': r3.pbV,
    'ɵpD': r3.pD,
    'ɵPp': r3.Pp,
    'ɵQ': r3.Q,
    'ɵqR': r3.qR,
    'ɵQr': r3.Qr,
    'ɵrS': r3.rS,
    'ɵr': r3.r,
    'ɵs': r3.s,
    'ɵsm': r3.sm,
    'ɵsp': r3.sp,
    'ɵsa': r3.sa,
    'ɵT': r3.T,
    'ɵt': r3.t,
    'ɵV': r3.V,
    'ɵv': r3.v,
    'ɵzh': sanitization.sanitizeHtml,
    'ɵzs': sanitization.sanitizeStyle,
    'ɵzss': sanitization.defaultStyleSanitizer,
    'ɵzr': sanitization.sanitizeResourceUrl,
    'ɵzc': sanitization.sanitizeScript,
    'ɵzu': sanitization.sanitizeUrl
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ppdC9lbnZpcm9ubWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsY0FBYyxHQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEtBQUssWUFBWSxNQUFNLGlDQUFpQyxDQUFDO0FBR2hFOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQStCO0lBQ3hELGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxlQUFlO0lBQ3RDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxlQUFlO0lBQ3RDLGtCQUFrQixFQUFFLGdCQUFnQjtJQUNwQyxnQkFBZ0IsRUFBRSxjQUFjO0lBQ2hDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxjQUFjO0lBQ3BDLGFBQWEsRUFBRSxFQUFFLENBQUMsVUFBVTtJQUM1QixrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QyxRQUFRLEVBQUUsTUFBTTtJQUNoQixrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QywwQkFBMEIsRUFBRSxFQUFFLENBQUMsdUJBQXVCO0lBQ3RELG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxnQkFBZ0I7SUFDeEMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLGlCQUFpQjtJQUMxQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsc0JBQXNCO0lBQ3BELHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxrQkFBa0I7SUFDNUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLGFBQWE7SUFDbEMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDLHdCQUF3QjtJQUN4RCxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUc7SUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUc7SUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUc7SUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUc7SUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUc7SUFDZCxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7SUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFVixLQUFLLEVBQUUsWUFBWSxDQUFDLFlBQVk7SUFDaEMsS0FBSyxFQUFFLFlBQVksQ0FBQyxhQUFhO0lBQ2pDLE1BQU0sRUFBRSxZQUFZLENBQUMscUJBQXFCO0lBQzFDLEtBQUssRUFBRSxZQUFZLENBQUMsbUJBQW1CO0lBQ3ZDLEtBQUssRUFBRSxZQUFZLENBQUMsY0FBYztJQUNsQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFdBQVc7Q0FDaEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtkZWZpbmVJbmplY3RhYmxlLCBkZWZpbmVJbmplY3Rvcix9IGZyb20gJy4uLy4uL2RpL2RlZnMnO1xuaW1wb3J0IHtpbmplY3R9IGZyb20gJy4uLy4uL2RpL2luamVjdG9yJztcbmltcG9ydCAqIGFzIHIzIGZyb20gJy4uL2luZGV4JztcbmltcG9ydCAqIGFzIHNhbml0aXphdGlvbiBmcm9tICcuLi8uLi9zYW5pdGl6YXRpb24vc2FuaXRpemF0aW9uJztcblxuXG4vKipcbiAqIEEgbWFwcGluZyBvZiB0aGUgQGFuZ3VsYXIvY29yZSBBUEkgc3VyZmFjZSB1c2VkIGluIGdlbmVyYXRlZCBleHByZXNzaW9ucyB0byB0aGUgYWN0dWFsIHN5bWJvbHMuXG4gKlxuICogVGhpcyBzaG91bGQgYmUga2VwdCB1cCB0byBkYXRlIHdpdGggdGhlIHB1YmxpYyBleHBvcnRzIG9mIEBhbmd1bGFyL2NvcmUuXG4gKi9cbmV4cG9ydCBjb25zdCBhbmd1bGFyQ29yZUVudjoge1tuYW1lOiBzdHJpbmddOiBGdW5jdGlvbn0gPSB7XG4gICfJtWRlZmluZUNvbXBvbmVudCc6IHIzLmRlZmluZUNvbXBvbmVudCxcbiAgJ8m1ZGVmaW5lRGlyZWN0aXZlJzogcjMuZGVmaW5lRGlyZWN0aXZlLFxuICAnZGVmaW5lSW5qZWN0YWJsZSc6IGRlZmluZUluamVjdGFibGUsXG4gICdkZWZpbmVJbmplY3Rvcic6IGRlZmluZUluamVjdG9yLFxuICAnybVkZWZpbmVOZ01vZHVsZSc6IHIzLmRlZmluZU5nTW9kdWxlLFxuICAnybVkZWZpbmVQaXBlJzogcjMuZGVmaW5lUGlwZSxcbiAgJ8m1ZGlyZWN0aXZlSW5qZWN0JzogcjMuZGlyZWN0aXZlSW5qZWN0LFxuICAnaW5qZWN0JzogaW5qZWN0LFxuICAnybVpbmplY3RBdHRyaWJ1dGUnOiByMy5pbmplY3RBdHRyaWJ1dGUsXG4gICfJtWluamVjdENoYW5nZURldGVjdG9yUmVmJzogcjMuaW5qZWN0Q2hhbmdlRGV0ZWN0b3JSZWYsXG4gICfJtWluamVjdEVsZW1lbnRSZWYnOiByMy5pbmplY3RFbGVtZW50UmVmLFxuICAnybVpbmplY3RUZW1wbGF0ZVJlZic6IHIzLmluamVjdFRlbXBsYXRlUmVmLFxuICAnybVpbmplY3RWaWV3Q29udGFpbmVyUmVmJzogcjMuaW5qZWN0Vmlld0NvbnRhaW5lclJlZixcbiAgJ8m1TmdPbkNoYW5nZXNGZWF0dXJlJzogcjMuTmdPbkNoYW5nZXNGZWF0dXJlLFxuICAnybVQdWJsaWNGZWF0dXJlJzogcjMuUHVibGljRmVhdHVyZSxcbiAgJ8m1SW5oZXJpdERlZmluaXRpb25GZWF0dXJlJzogcjMuSW5oZXJpdERlZmluaXRpb25GZWF0dXJlLFxuICAnybVhJzogcjMuYSxcbiAgJ8m1Yic6IHIzLmIsXG4gICfJtUMnOiByMy5DLFxuICAnybV4JzogcjMueCxcbiAgJ8m1Y1InOiByMy5jUixcbiAgJ8m1Y3InOiByMy5jcixcbiAgJ8m1ZCc6IHIzLmQsXG4gICfJtXFsJzogcjMucWwsXG4gICfJtU5IJzogcjMuTkgsXG4gICfJtU5NJzogcjMuTk0sXG4gICfJtU5TJzogcjMuTlMsXG4gICfJtUUnOiByMy5FLFxuICAnybVlJzogcjMuZSxcbiAgJ8m1RWUnOiByMy5FZSxcbiAgJ8m1ZjAnOiByMy5mMCxcbiAgJ8m1ZjEnOiByMy5mMSxcbiAgJ8m1ZjInOiByMy5mMixcbiAgJ8m1ZjMnOiByMy5mMyxcbiAgJ8m1ZjQnOiByMy5mNCxcbiAgJ8m1ZjUnOiByMy5mNSxcbiAgJ8m1ZjYnOiByMy5mNixcbiAgJ8m1ZjcnOiByMy5mNyxcbiAgJ8m1ZjgnOiByMy5mOCxcbiAgJ8m1ZlYnOiByMy5mVixcbiAgJ8m1Z1YnOiByMy5nVixcbiAgJ8m1clYnOiByMy5yVixcbiAgJ8m1aTEnOiByMy5pMSxcbiAgJ8m1aTInOiByMy5pMixcbiAgJ8m1aTMnOiByMy5pMyxcbiAgJ8m1aTQnOiByMy5pNCxcbiAgJ8m1aTUnOiByMy5pNSxcbiAgJ8m1aTYnOiByMy5pNixcbiAgJ8m1aTcnOiByMy5pNyxcbiAgJ8m1aTgnOiByMy5pOCxcbiAgJ8m1aVYnOiByMy5pVixcbiAgJ8m1Y3AnOiByMy5jcCxcbiAgJ8m1TCc6IHIzLkwsXG4gICfJtWxkJzogcjMubGQsXG4gICfJtVAnOiByMy5QLFxuICAnybVwJzogcjMucCxcbiAgJ8m1cGIxJzogcjMucGIxLFxuICAnybVwYjInOiByMy5wYjIsXG4gICfJtXBiMyc6IHIzLnBiMyxcbiAgJ8m1cGI0JzogcjMucGI0LFxuICAnybVwYlYnOiByMy5wYlYsXG4gICfJtXBEJzogcjMucEQsXG4gICfJtVBwJzogcjMuUHAsXG4gICfJtVEnOiByMy5RLFxuICAnybVxUic6IHIzLnFSLFxuICAnybVRcic6IHIzLlFyLFxuICAnybVyUyc6IHIzLnJTLFxuICAnybVyJzogcjMucixcbiAgJ8m1cyc6IHIzLnMsXG4gICfJtXNtJzogcjMuc20sXG4gICfJtXNwJzogcjMuc3AsXG4gICfJtXNhJzogcjMuc2EsXG4gICfJtVQnOiByMy5ULFxuICAnybV0JzogcjMudCxcbiAgJ8m1Vic6IHIzLlYsXG4gICfJtXYnOiByMy52LFxuXG4gICfJtXpoJzogc2FuaXRpemF0aW9uLnNhbml0aXplSHRtbCxcbiAgJ8m1enMnOiBzYW5pdGl6YXRpb24uc2FuaXRpemVTdHlsZSxcbiAgJ8m1enNzJzogc2FuaXRpemF0aW9uLmRlZmF1bHRTdHlsZVNhbml0aXplcixcbiAgJ8m1enInOiBzYW5pdGl6YXRpb24uc2FuaXRpemVSZXNvdXJjZVVybCxcbiAgJ8m1emMnOiBzYW5pdGl6YXRpb24uc2FuaXRpemVTY3JpcHQsXG4gICfJtXp1Jzogc2FuaXRpemF0aW9uLnNhbml0aXplVXJsXG59O1xuIl19