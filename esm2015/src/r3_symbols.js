/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
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
/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually \@angular/core, which needs to be compiled specially.
 */
export const /** @type {?} */ ITS_JUST_ANGULAR = true;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfc3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3IzX3N5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFxQkEsT0FBTyxFQUE2QixnQkFBZ0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdkYsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUMsY0FBYyxJQUFJLGVBQWUsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7OztBQU92RSxNQUFNLENBQUMsdUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKlxuICogVGhpcyBmaWxlIGV4aXN0cyB0byBzdXBwb3J0IGNvbXBpbGF0aW9uIG9mIEBhbmd1bGFyL2NvcmUgaW4gSXZ5IG1vZGUuXG4gKlxuICogV2hlbiB0aGUgQW5ndWxhciBjb21waWxlciBwcm9jZXNzZXMgYSBjb21waWxhdGlvbiB1bml0LCBpdCBub3JtYWxseSB3cml0ZXMgaW1wb3J0cyB0b1xuICogQGFuZ3VsYXIvY29yZS4gV2hlbiBjb21waWxpbmcgdGhlIGNvcmUgcGFja2FnZSBpdHNlbGYgdGhpcyBzdHJhdGVneSBpc24ndCB1c2FibGUuIEluc3RlYWQsIHRoZVxuICogY29tcGlsZXIgd3JpdGVzIGltcG9ydHMgdG8gdGhpcyBmaWxlLlxuICpcbiAqIE9ubHkgYSBzdWJzZXQgb2Ygc3VjaCBpbXBvcnRzIGFyZSBzdXBwb3J0ZWQgLSBjb3JlIGlzIG5vdCBhbGxvd2VkIHRvIGRlY2xhcmUgY29tcG9uZW50cyBvciBwaXBlcy5cbiAqIEEgY2hlY2sgaW4gbmd0c2MncyB0cmFuc2xhdG9yLnRzIHZhbGlkYXRlcyB0aGlzIGNvbmRpdGlvbi5cbiAqXG4gKiBUaGUgYmVsb3cgc3ltYm9scyBhcmUgdXNlZCBmb3IgQEluamVjdGFibGUgYW5kIEBOZ01vZHVsZSBjb21waWxhdGlvbi5cbiAqL1xuXG5leHBvcnQge0luamVjdGFibGVEZWYsIEluamVjdG9yRGVmLCBkZWZpbmVJbmplY3RhYmxlLCBkZWZpbmVJbmplY3Rvcn0gZnJvbSAnLi9kaS9kZWZzJztcbmV4cG9ydCB7aW5qZWN0fSBmcm9tICcuL2RpL2luamVjdG9yJztcbmV4cG9ydCB7TmdNb2R1bGVEZWZ9IGZyb20gJy4vbWV0YWRhdGEvbmdfbW9kdWxlJztcbmV4cG9ydCB7ZGVmaW5lTmdNb2R1bGUgYXMgybVkZWZpbmVOZ01vZHVsZX0gZnJvbSAnLi9yZW5kZXIzL2RlZmluaXRpb24nO1xuXG5cbi8qKlxuICogVGhlIGV4aXN0ZW5jZSBvZiB0aGlzIGNvbnN0YW50IChpbiB0aGlzIHBhcnRpY3VsYXIgZmlsZSkgaW5mb3JtcyB0aGUgQW5ndWxhciBjb21waWxlciB0aGF0IHRoZVxuICogY3VycmVudCBwcm9ncmFtIGlzIGFjdHVhbGx5IEBhbmd1bGFyL2NvcmUsIHdoaWNoIG5lZWRzIHRvIGJlIGNvbXBpbGVkIHNwZWNpYWxseS5cbiAqL1xuZXhwb3J0IGNvbnN0IElUU19KVVNUX0FOR1VMQVIgPSB0cnVlO1xuIl19