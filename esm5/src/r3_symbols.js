/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This file exists to support compilation of @angular/core in Ivy mode.
 *
 * When the Angular compiler processes a compilation unit, it normally writes imports to
 * @angular/core. When compiling the core package itself this strategy isn't usable. Instead, the
 * compiler writes imports to this file.
 *
 * Only a subset of such imports are supported - core is not allowed to declare components or pipes.
 * A check in ngtsc's translator.ts validates this condition.
 *
 * The below symbols are used for @Injectable and @NgModule compilation.
 */
export { defineInjectable, defineInjector } from './di/defs';
export { inject } from './di/injector_compatibility';
export { defineNgModule as ɵdefineNgModule } from './render3/definition';
export { setClassMetadata as ɵsetClassMetadata } from './render3/metadata';
export { NgModuleFactory as ɵNgModuleFactory } from './render3/ng_module_ref';
/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually @angular/core, which needs to be compiled specially.
 */
export var ITS_JUST_ANGULAR = true;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicjNfc3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3IzX3N5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7Ozs7Ozs7O0dBV0c7QUFFSCxPQUFPLEVBQStELGdCQUFnQixFQUFFLGNBQWMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN6SCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFbkQsT0FBTyxFQUFDLGNBQWMsSUFBSSxlQUFlLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZ0JBQWdCLElBQUksaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RSxPQUFPLEVBQUMsZUFBZSxJQUFJLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFHNUU7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKlxuICogVGhpcyBmaWxlIGV4aXN0cyB0byBzdXBwb3J0IGNvbXBpbGF0aW9uIG9mIEBhbmd1bGFyL2NvcmUgaW4gSXZ5IG1vZGUuXG4gKlxuICogV2hlbiB0aGUgQW5ndWxhciBjb21waWxlciBwcm9jZXNzZXMgYSBjb21waWxhdGlvbiB1bml0LCBpdCBub3JtYWxseSB3cml0ZXMgaW1wb3J0cyB0b1xuICogQGFuZ3VsYXIvY29yZS4gV2hlbiBjb21waWxpbmcgdGhlIGNvcmUgcGFja2FnZSBpdHNlbGYgdGhpcyBzdHJhdGVneSBpc24ndCB1c2FibGUuIEluc3RlYWQsIHRoZVxuICogY29tcGlsZXIgd3JpdGVzIGltcG9ydHMgdG8gdGhpcyBmaWxlLlxuICpcbiAqIE9ubHkgYSBzdWJzZXQgb2Ygc3VjaCBpbXBvcnRzIGFyZSBzdXBwb3J0ZWQgLSBjb3JlIGlzIG5vdCBhbGxvd2VkIHRvIGRlY2xhcmUgY29tcG9uZW50cyBvciBwaXBlcy5cbiAqIEEgY2hlY2sgaW4gbmd0c2MncyB0cmFuc2xhdG9yLnRzIHZhbGlkYXRlcyB0aGlzIGNvbmRpdGlvbi5cbiAqXG4gKiBUaGUgYmVsb3cgc3ltYm9scyBhcmUgdXNlZCBmb3IgQEluamVjdGFibGUgYW5kIEBOZ01vZHVsZSBjb21waWxhdGlvbi5cbiAqL1xuXG5leHBvcnQge0luamVjdGFibGVEZWYgYXMgybVJbmplY3RhYmxlRGVmLCBJbmplY3RvckRlZiBhcyDJtUluamVjdG9yRGVmLCBkZWZpbmVJbmplY3RhYmxlLCBkZWZpbmVJbmplY3Rvcn0gZnJvbSAnLi9kaS9kZWZzJztcbmV4cG9ydCB7aW5qZWN0fSBmcm9tICcuL2RpL2luamVjdG9yX2NvbXBhdGliaWxpdHknO1xuZXhwb3J0IHtOZ01vZHVsZURlZiBhcyDJtU5nTW9kdWxlRGVmLCBOZ01vZHVsZURlZldpdGhNZXRhIGFzIMm1TmdNb2R1bGVEZWZXaXRoTWV0YX0gZnJvbSAnLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuZXhwb3J0IHtkZWZpbmVOZ01vZHVsZSBhcyDJtWRlZmluZU5nTW9kdWxlfSBmcm9tICcuL3JlbmRlcjMvZGVmaW5pdGlvbic7XG5leHBvcnQge3NldENsYXNzTWV0YWRhdGEgYXMgybVzZXRDbGFzc01ldGFkYXRhfSBmcm9tICcuL3JlbmRlcjMvbWV0YWRhdGEnO1xuZXhwb3J0IHtOZ01vZHVsZUZhY3RvcnkgYXMgybVOZ01vZHVsZUZhY3Rvcnl9IGZyb20gJy4vcmVuZGVyMy9uZ19tb2R1bGVfcmVmJztcblxuXG4vKipcbiAqIFRoZSBleGlzdGVuY2Ugb2YgdGhpcyBjb25zdGFudCAoaW4gdGhpcyBwYXJ0aWN1bGFyIGZpbGUpIGluZm9ybXMgdGhlIEFuZ3VsYXIgY29tcGlsZXIgdGhhdCB0aGVcbiAqIGN1cnJlbnQgcHJvZ3JhbSBpcyBhY3R1YWxseSBAYW5ndWxhci9jb3JlLCB3aGljaCBuZWVkcyB0byBiZSBjb21waWxlZCBzcGVjaWFsbHkuXG4gKi9cbmV4cG9ydCBjb25zdCBJVFNfSlVTVF9BTkdVTEFSID0gdHJ1ZTtcbiJdfQ==