/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { compileComponentDecorator, compileDirective } from './render3/jit/directive';
import { compileInjectable } from './render3/jit/injectable';
import { compileNgModule } from './render3/jit/module';
export const ivyEnabled = true;
export const R3_COMPILE_COMPONENT = compileComponentDecorator;
export const R3_COMPILE_DIRECTIVE = compileDirective;
export const R3_COMPILE_INJECTABLE = compileInjectable;
export const R3_COMPILE_NGMODULE = compileNgModule;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXZ5X3N3aXRjaF9vbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2l2eV9zd2l0Y2hfb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGdCQUFnQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDL0IsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcseUJBQXlCLENBQUM7QUFDOUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUM7QUFDckQsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsaUJBQWlCLENBQUM7QUFDdkQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NvbXBpbGVDb21wb25lbnREZWNvcmF0b3IsIGNvbXBpbGVEaXJlY3RpdmV9IGZyb20gJy4vcmVuZGVyMy9qaXQvZGlyZWN0aXZlJztcbmltcG9ydCB7Y29tcGlsZUluamVjdGFibGV9IGZyb20gJy4vcmVuZGVyMy9qaXQvaW5qZWN0YWJsZSc7XG5pbXBvcnQge2NvbXBpbGVOZ01vZHVsZX0gZnJvbSAnLi9yZW5kZXIzL2ppdC9tb2R1bGUnO1xuXG5leHBvcnQgY29uc3QgaXZ5RW5hYmxlZCA9IHRydWU7XG5leHBvcnQgY29uc3QgUjNfQ09NUElMRV9DT01QT05FTlQgPSBjb21waWxlQ29tcG9uZW50RGVjb3JhdG9yO1xuZXhwb3J0IGNvbnN0IFIzX0NPTVBJTEVfRElSRUNUSVZFID0gY29tcGlsZURpcmVjdGl2ZTtcbmV4cG9ydCBjb25zdCBSM19DT01QSUxFX0lOSkVDVEFCTEUgPSBjb21waWxlSW5qZWN0YWJsZTtcbmV4cG9ydCBjb25zdCBSM19DT01QSUxFX05HTU9EVUxFID0gY29tcGlsZU5nTW9kdWxlO1xuIl19