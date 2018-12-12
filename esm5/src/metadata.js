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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFZSCxPQUFPLEVBQUMsNEJBQTRCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBeUIsZUFBZSxFQUE0QixLQUFLLEVBQUUsU0FBUyxFQUFzQixZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQ2pPLE9BQU8sRUFBQyxTQUFTLEVBQXNCLFNBQVMsRUFBc0IsV0FBVyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRW5KLE9BQU8sRUFBQyxzQkFBc0IsRUFBb0MsZ0JBQWdCLEVBQUUsUUFBUSxFQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBQzFJLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFRoaXMgaW5kaXJlY3Rpb24gaXMgbmVlZGVkIHRvIGZyZWUgdXAgQ29tcG9uZW50LCBldGMgc3ltYm9scyBpbiB0aGUgcHVibGljIEFQSVxuICogdG8gYmUgdXNlZCBieSB0aGUgZGVjb3JhdG9yIHZlcnNpb25zIG9mIHRoZXNlIGFubm90YXRpb25zLlxuICovXG5cbmltcG9ydCB7QXR0cmlidXRlLCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnksIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICcuL21ldGFkYXRhL2RpJztcbmltcG9ydCB7Q29tcG9uZW50LCBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIFBpcGV9IGZyb20gJy4vbWV0YWRhdGEvZGlyZWN0aXZlcyc7XG5pbXBvcnQge0RvQm9vdHN0cmFwLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgU2NoZW1hTWV0YWRhdGF9IGZyb20gJy4vbWV0YWRhdGEvbmdfbW9kdWxlJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4vbWV0YWRhdGEvdmlldyc7XG5cbmV4cG9ydCB7QU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgQXR0cmlidXRlLCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZERlY29yYXRvciwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGRyZW5EZWNvcmF0b3IsIFF1ZXJ5LCBWaWV3Q2hpbGQsIFZpZXdDaGlsZERlY29yYXRvciwgVmlld0NoaWxkcmVuLCBWaWV3Q2hpbGRyZW5EZWNvcmF0b3J9IGZyb20gJy4vbWV0YWRhdGEvZGknO1xuZXhwb3J0IHtDb21wb25lbnQsIENvbXBvbmVudERlY29yYXRvciwgRGlyZWN0aXZlLCBEaXJlY3RpdmVEZWNvcmF0b3IsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIFBpcGV9IGZyb20gJy4vbWV0YWRhdGEvZGlyZWN0aXZlcyc7XG5leHBvcnQge0FmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJy4vbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzJztcbmV4cG9ydCB7Q1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgRG9Cb290c3RyYXAsIE1vZHVsZVdpdGhQcm92aWRlcnMsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlLCBTY2hlbWFNZXRhZGF0YX0gZnJvbSAnLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuZXhwb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi9tZXRhZGF0YS92aWV3JztcbiJdfQ==