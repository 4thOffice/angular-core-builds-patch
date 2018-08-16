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
    'ɵdefineBase': r3.defineBase,
    'ɵdefineComponent': r3.defineComponent,
    'ɵdefineDirective': r3.defineDirective,
    'defineInjectable': defineInjectable,
    'defineInjector': defineInjector,
    'ɵdefineNgModule': r3.defineNgModule,
    'ɵdefinePipe': r3.definePipe,
    'ɵdirectiveInject': r3.directiveInject,
    'ɵgetFactoryOf': r3.getFactoryOf,
    'ɵgetInheritedFactory': r3.getInheritedFactory,
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
    'ɵEC': r3.EC,
    'ɵeC': r3.eC,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ppdC9lbnZpcm9ubWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsY0FBYyxHQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEtBQUssWUFBWSxNQUFNLGlDQUFpQyxDQUFDO0FBR2hFOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxjQUFjLEdBQStCO0lBQ3hELGFBQWEsRUFBRSxFQUFFLENBQUMsVUFBVTtJQUM1QixrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QyxrQkFBa0IsRUFBRSxnQkFBZ0I7SUFDcEMsZ0JBQWdCLEVBQUUsY0FBYztJQUNoQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsY0FBYztJQUNwQyxhQUFhLEVBQUUsRUFBRSxDQUFDLFVBQVU7SUFDNUIsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLGVBQWU7SUFDdEMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxZQUFZO0lBQ2hDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxtQkFBbUI7SUFDOUMsUUFBUSxFQUFFLE1BQU07SUFDaEIsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLGVBQWU7SUFDdEMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLHVCQUF1QjtJQUN0RCxtQkFBbUIsRUFBRSxFQUFFLENBQUMsZ0JBQWdCO0lBQ3hDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUI7SUFDMUMseUJBQXlCLEVBQUUsRUFBRSxDQUFDLHNCQUFzQjtJQUNwRCxxQkFBcUIsRUFBRSxFQUFFLENBQUMsa0JBQWtCO0lBQzVDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxhQUFhO0lBQ2xDLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyx3QkFBd0I7SUFDeEQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVYsS0FBSyxFQUFFLFlBQVksQ0FBQyxZQUFZO0lBQ2hDLEtBQUssRUFBRSxZQUFZLENBQUMsYUFBYTtJQUNqQyxNQUFNLEVBQUUsWUFBWSxDQUFDLHFCQUFxQjtJQUMxQyxLQUFLLEVBQUUsWUFBWSxDQUFDLG1CQUFtQjtJQUN2QyxLQUFLLEVBQUUsWUFBWSxDQUFDLGNBQWM7SUFDbEMsS0FBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0NBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ZGVmaW5lSW5qZWN0YWJsZSwgZGVmaW5lSW5qZWN0b3IsfSBmcm9tICcuLi8uLi9kaS9kZWZzJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQgKiBhcyByMyBmcm9tICcuLi9pbmRleCc7XG5pbXBvcnQgKiBhcyBzYW5pdGl6YXRpb24gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3Nhbml0aXphdGlvbic7XG5cblxuLyoqXG4gKiBBIG1hcHBpbmcgb2YgdGhlIEBhbmd1bGFyL2NvcmUgQVBJIHN1cmZhY2UgdXNlZCBpbiBnZW5lcmF0ZWQgZXhwcmVzc2lvbnMgdG8gdGhlIGFjdHVhbCBzeW1ib2xzLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIGtlcHQgdXAgdG8gZGF0ZSB3aXRoIHRoZSBwdWJsaWMgZXhwb3J0cyBvZiBAYW5ndWxhci9jb3JlLlxuICovXG5leHBvcnQgY29uc3QgYW5ndWxhckNvcmVFbnY6IHtbbmFtZTogc3RyaW5nXTogRnVuY3Rpb259ID0ge1xuICAnybVkZWZpbmVCYXNlJzogcjMuZGVmaW5lQmFzZSxcbiAgJ8m1ZGVmaW5lQ29tcG9uZW50JzogcjMuZGVmaW5lQ29tcG9uZW50LFxuICAnybVkZWZpbmVEaXJlY3RpdmUnOiByMy5kZWZpbmVEaXJlY3RpdmUsXG4gICdkZWZpbmVJbmplY3RhYmxlJzogZGVmaW5lSW5qZWN0YWJsZSxcbiAgJ2RlZmluZUluamVjdG9yJzogZGVmaW5lSW5qZWN0b3IsXG4gICfJtWRlZmluZU5nTW9kdWxlJzogcjMuZGVmaW5lTmdNb2R1bGUsXG4gICfJtWRlZmluZVBpcGUnOiByMy5kZWZpbmVQaXBlLFxuICAnybVkaXJlY3RpdmVJbmplY3QnOiByMy5kaXJlY3RpdmVJbmplY3QsXG4gICfJtWdldEZhY3RvcnlPZic6IHIzLmdldEZhY3RvcnlPZixcbiAgJ8m1Z2V0SW5oZXJpdGVkRmFjdG9yeSc6IHIzLmdldEluaGVyaXRlZEZhY3RvcnksXG4gICdpbmplY3QnOiBpbmplY3QsXG4gICfJtWluamVjdEF0dHJpYnV0ZSc6IHIzLmluamVjdEF0dHJpYnV0ZSxcbiAgJ8m1aW5qZWN0Q2hhbmdlRGV0ZWN0b3JSZWYnOiByMy5pbmplY3RDaGFuZ2VEZXRlY3RvclJlZixcbiAgJ8m1aW5qZWN0RWxlbWVudFJlZic6IHIzLmluamVjdEVsZW1lbnRSZWYsXG4gICfJtWluamVjdFRlbXBsYXRlUmVmJzogcjMuaW5qZWN0VGVtcGxhdGVSZWYsXG4gICfJtWluamVjdFZpZXdDb250YWluZXJSZWYnOiByMy5pbmplY3RWaWV3Q29udGFpbmVyUmVmLFxuICAnybVOZ09uQ2hhbmdlc0ZlYXR1cmUnOiByMy5OZ09uQ2hhbmdlc0ZlYXR1cmUsXG4gICfJtVB1YmxpY0ZlYXR1cmUnOiByMy5QdWJsaWNGZWF0dXJlLFxuICAnybVJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUnOiByMy5Jbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUsXG4gICfJtWEnOiByMy5hLFxuICAnybViJzogcjMuYixcbiAgJ8m1Qyc6IHIzLkMsXG4gICfJtXgnOiByMy54LFxuICAnybVjUic6IHIzLmNSLFxuICAnybVjcic6IHIzLmNyLFxuICAnybVkJzogcjMuZCxcbiAgJ8m1cWwnOiByMy5xbCxcbiAgJ8m1TkgnOiByMy5OSCxcbiAgJ8m1Tk0nOiByMy5OTSxcbiAgJ8m1TlMnOiByMy5OUyxcbiAgJ8m1RSc6IHIzLkUsXG4gICfJtWUnOiByMy5lLFxuICAnybVFZSc6IHIzLkVlLFxuICAnybVFQyc6IHIzLkVDLFxuICAnybVlQyc6IHIzLmVDLFxuICAnybVmMCc6IHIzLmYwLFxuICAnybVmMSc6IHIzLmYxLFxuICAnybVmMic6IHIzLmYyLFxuICAnybVmMyc6IHIzLmYzLFxuICAnybVmNCc6IHIzLmY0LFxuICAnybVmNSc6IHIzLmY1LFxuICAnybVmNic6IHIzLmY2LFxuICAnybVmNyc6IHIzLmY3LFxuICAnybVmOCc6IHIzLmY4LFxuICAnybVmVic6IHIzLmZWLFxuICAnybVnVic6IHIzLmdWLFxuICAnybVyVic6IHIzLnJWLFxuICAnybVpMSc6IHIzLmkxLFxuICAnybVpMic6IHIzLmkyLFxuICAnybVpMyc6IHIzLmkzLFxuICAnybVpNCc6IHIzLmk0LFxuICAnybVpNSc6IHIzLmk1LFxuICAnybVpNic6IHIzLmk2LFxuICAnybVpNyc6IHIzLmk3LFxuICAnybVpOCc6IHIzLmk4LFxuICAnybVpVic6IHIzLmlWLFxuICAnybVjcCc6IHIzLmNwLFxuICAnybVMJzogcjMuTCxcbiAgJ8m1bGQnOiByMy5sZCxcbiAgJ8m1UCc6IHIzLlAsXG4gICfJtXAnOiByMy5wLFxuICAnybVwYjEnOiByMy5wYjEsXG4gICfJtXBiMic6IHIzLnBiMixcbiAgJ8m1cGIzJzogcjMucGIzLFxuICAnybVwYjQnOiByMy5wYjQsXG4gICfJtXBiVic6IHIzLnBiVixcbiAgJ8m1cEQnOiByMy5wRCxcbiAgJ8m1UHAnOiByMy5QcCxcbiAgJ8m1USc6IHIzLlEsXG4gICfJtXFSJzogcjMucVIsXG4gICfJtVFyJzogcjMuUXIsXG4gICfJtXJTJzogcjMuclMsXG4gICfJtXInOiByMy5yLFxuICAnybVzJzogcjMucyxcbiAgJ8m1c20nOiByMy5zbSxcbiAgJ8m1c3AnOiByMy5zcCxcbiAgJ8m1c2EnOiByMy5zYSxcbiAgJ8m1VCc6IHIzLlQsXG4gICfJtXQnOiByMy50LFxuICAnybVWJzogcjMuVixcbiAgJ8m1dic6IHIzLnYsXG5cbiAgJ8m1emgnOiBzYW5pdGl6YXRpb24uc2FuaXRpemVIdG1sLFxuICAnybV6cyc6IHNhbml0aXphdGlvbi5zYW5pdGl6ZVN0eWxlLFxuICAnybV6c3MnOiBzYW5pdGl6YXRpb24uZGVmYXVsdFN0eWxlU2FuaXRpemVyLFxuICAnybV6cic6IHNhbml0aXphdGlvbi5zYW5pdGl6ZVJlc291cmNlVXJsLFxuICAnybV6Yyc6IHNhbml0aXphdGlvbi5zYW5pdGl6ZVNjcmlwdCxcbiAgJ8m1enUnOiBzYW5pdGl6YXRpb24uc2FuaXRpemVVcmxcbn07XG4iXX0=