/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { ANALYZE_FOR_ENTRY_COMPONENTS, Attribute, ContentChild, ContentChildren, Query, ViewChild, ViewChildren } from './metadata/di';
export { Component, Directive, HostBinding, HostListener, Input, Output, Pipe } from './metadata/directives';
export { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from './metadata/ng_module';
export { ViewEncapsulation } from './metadata/view';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFZSCxPQUFPLEVBQUMsNEJBQTRCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBeUIsZUFBZSxFQUE0QixLQUFLLEVBQUUsU0FBUyxFQUFzQixZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pPLE9BQU8sRUFBQyxTQUFTLEVBQXNCLFNBQVMsRUFBc0IsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRW5KLE9BQU8sRUFBQyxzQkFBc0IsRUFBdUIsZ0JBQWdCLEVBQUUsUUFBUSxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBQzdILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFRoaXMgaW5kaXJlY3Rpb24gaXMgbmVlZGVkIHRvIGZyZWUgdXAgQ29tcG9uZW50LCBldGMgc3ltYm9scyBpbiB0aGUgcHVibGljIEFQSVxuICogdG8gYmUgdXNlZCBieSB0aGUgZGVjb3JhdG9yIHZlcnNpb25zIG9mIHRoZXNlIGFubm90YXRpb25zLlxuICovXG5cbmltcG9ydCB7QXR0cmlidXRlLCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnksIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICcuL21ldGFkYXRhL2RpJztcbmltcG9ydCB7Q29tcG9uZW50LCBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIFBpcGV9IGZyb20gJy4vbWV0YWRhdGEvZGlyZWN0aXZlcyc7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBOZ01vZHVsZURlZiwgU2NoZW1hTWV0YWRhdGEsIGRlZmluZU5nTW9kdWxlfSBmcm9tICcuL21ldGFkYXRhL25nX21vZHVsZSc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuL21ldGFkYXRhL3ZpZXcnO1xuXG5leHBvcnQge0FOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIEF0dHJpYnV0ZSwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGREZWNvcmF0b3IsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkcmVuRGVjb3JhdG9yLCBRdWVyeSwgVmlld0NoaWxkLCBWaWV3Q2hpbGREZWNvcmF0b3IsIFZpZXdDaGlsZHJlbiwgVmlld0NoaWxkcmVuRGVjb3JhdG9yfSBmcm9tICcuL21ldGFkYXRhL2RpJztcbmV4cG9ydCB7Q29tcG9uZW50LCBDb21wb25lbnREZWNvcmF0b3IsIERpcmVjdGl2ZSwgRGlyZWN0aXZlRGVjb3JhdG9yLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBQaXBlfSBmcm9tICcuL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuZXhwb3J0IHtBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICcuL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rcyc7XG5leHBvcnQge0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlLCBTY2hlbWFNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuZXhwb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi9tZXRhZGF0YS92aWV3JztcbiJdfQ==