/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defineInjectable } from '../../di/defs';
import { inject } from '../../di/injector';
import { defineNgModule } from '../../metadata/ng_module';
import * as r3 from '../index';
/**
 * A mapping of the @angular/core API surface used in generated expressions to the actual symbols.
 *
 * This should be kept up to date with the public exports of @angular/core.
 */
export var angularCoreEnv = {
    'ɵdefineComponent': r3.defineComponent,
    'ɵdefineDirective': r3.defineDirective,
    'defineInjectable': defineInjectable,
    'ɵdefineNgModule': defineNgModule,
    'ɵdirectiveInject': r3.directiveInject,
    'inject': inject,
    'ɵinjectAttribute': r3.injectAttribute,
    'ɵinjectChangeDetectorRef': r3.injectChangeDetectorRef,
    'ɵinjectElementRef': r3.injectElementRef,
    'ɵinjectTemplateRef': r3.injectTemplateRef,
    'ɵinjectViewContainerRef': r3.injectViewContainerRef,
    'ɵNgOnChangesFeature': r3.NgOnChangesFeature,
    'ɵa': r3.a,
    'ɵb': r3.b,
    'ɵC': r3.C,
    'ɵcR': r3.cR,
    'ɵcr': r3.cr,
    'ɵd': r3.d,
    'ɵE': r3.E,
    'ɵe': r3.e,
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
    'ɵi1': r3.i1,
    'ɵi2': r3.i2,
    'ɵi3': r3.i3,
    'ɵi4': r3.i4,
    'ɵi5': r3.i5,
    'ɵi6': r3.i6,
    'ɵi7': r3.i7,
    'ɵi8': r3.i8,
    'ɵk': r3.k,
    'ɵkn': r3.kn,
    'ɵL': r3.L,
    'ɵld': r3.ld,
    'ɵp': r3.p,
    'ɵpb1': r3.pb1,
    'ɵpb2': r3.pb2,
    'ɵpb3': r3.pb3,
    'ɵpb4': r3.pb4,
    'ɵpbV': r3.pbV,
    'ɵQ': r3.Q,
    'ɵqR': r3.qR,
    'ɵs': r3.s,
    'ɵsn': r3.sn,
    'ɵst': r3.st,
    'ɵT': r3.T,
    'ɵt': r3.t,
    'ɵV': r3.V,
    'ɵv': r3.v,
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ppdC9lbnZpcm9ubWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEtBQUssRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUcvQjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUErQjtJQUN4RCxrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QyxrQkFBa0IsRUFBRSxnQkFBZ0I7SUFDcEMsaUJBQWlCLEVBQUUsY0FBYztJQUNqQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QyxRQUFRLEVBQUUsTUFBTTtJQUNoQixrQkFBa0IsRUFBRSxFQUFFLENBQUMsZUFBZTtJQUN0QywwQkFBMEIsRUFBRSxFQUFFLENBQUMsdUJBQXVCO0lBQ3RELG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxnQkFBZ0I7SUFDeEMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLGlCQUFpQjtJQUMxQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsc0JBQXNCO0lBQ3BELHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxrQkFBa0I7SUFDNUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHO0lBQ2QsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ1gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtkZWZpbmVJbmplY3RhYmxlfSBmcm9tICcuLi8uLi9kaS9kZWZzJztcbmltcG9ydCB7aW5qZWN0fSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge2RlZmluZU5nTW9kdWxlfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuaW1wb3J0ICogYXMgcjMgZnJvbSAnLi4vaW5kZXgnO1xuXG5cbi8qKlxuICogQSBtYXBwaW5nIG9mIHRoZSBAYW5ndWxhci9jb3JlIEFQSSBzdXJmYWNlIHVzZWQgaW4gZ2VuZXJhdGVkIGV4cHJlc3Npb25zIHRvIHRoZSBhY3R1YWwgc3ltYm9scy5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBrZXB0IHVwIHRvIGRhdGUgd2l0aCB0aGUgcHVibGljIGV4cG9ydHMgb2YgQGFuZ3VsYXIvY29yZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFuZ3VsYXJDb3JlRW52OiB7W25hbWU6IHN0cmluZ106IEZ1bmN0aW9ufSA9IHtcbiAgJ8m1ZGVmaW5lQ29tcG9uZW50JzogcjMuZGVmaW5lQ29tcG9uZW50LFxuICAnybVkZWZpbmVEaXJlY3RpdmUnOiByMy5kZWZpbmVEaXJlY3RpdmUsXG4gICdkZWZpbmVJbmplY3RhYmxlJzogZGVmaW5lSW5qZWN0YWJsZSxcbiAgJ8m1ZGVmaW5lTmdNb2R1bGUnOiBkZWZpbmVOZ01vZHVsZSxcbiAgJ8m1ZGlyZWN0aXZlSW5qZWN0JzogcjMuZGlyZWN0aXZlSW5qZWN0LFxuICAnaW5qZWN0JzogaW5qZWN0LFxuICAnybVpbmplY3RBdHRyaWJ1dGUnOiByMy5pbmplY3RBdHRyaWJ1dGUsXG4gICfJtWluamVjdENoYW5nZURldGVjdG9yUmVmJzogcjMuaW5qZWN0Q2hhbmdlRGV0ZWN0b3JSZWYsXG4gICfJtWluamVjdEVsZW1lbnRSZWYnOiByMy5pbmplY3RFbGVtZW50UmVmLFxuICAnybVpbmplY3RUZW1wbGF0ZVJlZic6IHIzLmluamVjdFRlbXBsYXRlUmVmLFxuICAnybVpbmplY3RWaWV3Q29udGFpbmVyUmVmJzogcjMuaW5qZWN0Vmlld0NvbnRhaW5lclJlZixcbiAgJ8m1TmdPbkNoYW5nZXNGZWF0dXJlJzogcjMuTmdPbkNoYW5nZXNGZWF0dXJlLFxuICAnybVhJzogcjMuYSxcbiAgJ8m1Yic6IHIzLmIsXG4gICfJtUMnOiByMy5DLFxuICAnybVjUic6IHIzLmNSLFxuICAnybVjcic6IHIzLmNyLFxuICAnybVkJzogcjMuZCxcbiAgJ8m1RSc6IHIzLkUsXG4gICfJtWUnOiByMy5lLFxuICAnybVmMCc6IHIzLmYwLFxuICAnybVmMSc6IHIzLmYxLFxuICAnybVmMic6IHIzLmYyLFxuICAnybVmMyc6IHIzLmYzLFxuICAnybVmNCc6IHIzLmY0LFxuICAnybVmNSc6IHIzLmY1LFxuICAnybVmNic6IHIzLmY2LFxuICAnybVmNyc6IHIzLmY3LFxuICAnybVmOCc6IHIzLmY4LFxuICAnybVmVic6IHIzLmZWLFxuICAnybVpMSc6IHIzLmkxLFxuICAnybVpMic6IHIzLmkyLFxuICAnybVpMyc6IHIzLmkzLFxuICAnybVpNCc6IHIzLmk0LFxuICAnybVpNSc6IHIzLmk1LFxuICAnybVpNic6IHIzLmk2LFxuICAnybVpNyc6IHIzLmk3LFxuICAnybVpOCc6IHIzLmk4LFxuICAnybVrJzogcjMuayxcbiAgJ8m1a24nOiByMy5rbixcbiAgJ8m1TCc6IHIzLkwsXG4gICfJtWxkJzogcjMubGQsXG4gICfJtXAnOiByMy5wLFxuICAnybVwYjEnOiByMy5wYjEsXG4gICfJtXBiMic6IHIzLnBiMixcbiAgJ8m1cGIzJzogcjMucGIzLFxuICAnybVwYjQnOiByMy5wYjQsXG4gICfJtXBiVic6IHIzLnBiVixcbiAgJ8m1USc6IHIzLlEsXG4gICfJtXFSJzogcjMucVIsXG4gICfJtXMnOiByMy5zLFxuICAnybVzbic6IHIzLnNuLFxuICAnybVzdCc6IHIzLnN0LFxuICAnybVUJzogcjMuVCxcbiAgJ8m1dCc6IHIzLnQsXG4gICfJtVYnOiByMy5WLFxuICAnybV2JzogcjMudixcbn07XG4iXX0=