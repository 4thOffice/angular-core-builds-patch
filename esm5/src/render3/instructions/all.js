/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This file re-exports all symbols contained in this directory.
 *
 * Why is this file not `index.ts`?
 *
 * There seems to be an inconsistent path resolution of an `index.ts` file
 * when only the parent directory is referenced. This could be due to the
 * node module resolution configuration differing from rollup and/or typescript.
 *
 * With commit
 * https://github.com/angular/angular/commit/d5e3f2c64bd13ce83e7c70788b7fc514ca4a9918
 * the `instructions.ts` file was moved to `instructions/instructions.ts` and an
 * `index.ts` file was used to re-export everything. Having had file names that were
 * importing from `instructions' directly (not the from the sub file or the `index.ts`
 * file) caused strange CI issues. `index.ts` had to be renamed to `all.ts` for this
 * to work.
 *
 * Jira Issue = FW-1184
 */
export * from './alloc_host_vars';
export * from './attribute';
export * from './attribute_interpolation';
export * from './change_detection';
export * from './container';
export * from './storage';
export * from './di';
export * from './element';
export * from './element_container';
export * from './embedded_view';
export * from './get_current_view';
export * from './interpolation';
export * from './listener';
export * from './namespace';
export * from './next_context';
export * from './projection';
export * from './property';
export * from './property_interpolation';
export * from './select';
export * from './styling';
export { styleSanitizer as ɵɵstyleSanitizer } from '../styling_next/instructions';
export * from './text';
export * from './text_interpolation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnN0cnVjdGlvbnMvYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMsMkJBQTJCLENBQUM7QUFDMUMsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLGFBQWEsQ0FBQztBQUM1QixjQUFjLFdBQVcsQ0FBQztBQUMxQixjQUFjLE1BQU0sQ0FBQztBQUNyQixjQUFjLFdBQVcsQ0FBQztBQUMxQixjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGNBQWMsWUFBWSxDQUFDO0FBQzNCLGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxjQUFjLENBQUM7QUFDN0IsY0FBYyxZQUFZLENBQUM7QUFDM0IsY0FBYywwQkFBMEIsQ0FBQztBQUN6QyxjQUFjLFVBQVUsQ0FBQztBQUN6QixjQUFjLFdBQVcsQ0FBQztBQUMxQixPQUFPLEVBQUMsY0FBYyxJQUFJLGdCQUFnQixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDaEYsY0FBYyxRQUFRLENBQUM7QUFDdkIsY0FBYyxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLypcbiAqIFRoaXMgZmlsZSByZS1leHBvcnRzIGFsbCBzeW1ib2xzIGNvbnRhaW5lZCBpbiB0aGlzIGRpcmVjdG9yeS5cbiAqXG4gKiBXaHkgaXMgdGhpcyBmaWxlIG5vdCBgaW5kZXgudHNgP1xuICpcbiAqIFRoZXJlIHNlZW1zIHRvIGJlIGFuIGluY29uc2lzdGVudCBwYXRoIHJlc29sdXRpb24gb2YgYW4gYGluZGV4LnRzYCBmaWxlXG4gKiB3aGVuIG9ubHkgdGhlIHBhcmVudCBkaXJlY3RvcnkgaXMgcmVmZXJlbmNlZC4gVGhpcyBjb3VsZCBiZSBkdWUgdG8gdGhlXG4gKiBub2RlIG1vZHVsZSByZXNvbHV0aW9uIGNvbmZpZ3VyYXRpb24gZGlmZmVyaW5nIGZyb20gcm9sbHVwIGFuZC9vciB0eXBlc2NyaXB0LlxuICpcbiAqIFdpdGggY29tbWl0XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2NvbW1pdC9kNWUzZjJjNjRiZDEzY2U4M2U3YzcwNzg4YjdmYzUxNGNhNGE5OTE4XG4gKiB0aGUgYGluc3RydWN0aW9ucy50c2AgZmlsZSB3YXMgbW92ZWQgdG8gYGluc3RydWN0aW9ucy9pbnN0cnVjdGlvbnMudHNgIGFuZCBhblxuICogYGluZGV4LnRzYCBmaWxlIHdhcyB1c2VkIHRvIHJlLWV4cG9ydCBldmVyeXRoaW5nLiBIYXZpbmcgaGFkIGZpbGUgbmFtZXMgdGhhdCB3ZXJlXG4gKiBpbXBvcnRpbmcgZnJvbSBgaW5zdHJ1Y3Rpb25zJyBkaXJlY3RseSAobm90IHRoZSBmcm9tIHRoZSBzdWIgZmlsZSBvciB0aGUgYGluZGV4LnRzYFxuICogZmlsZSkgY2F1c2VkIHN0cmFuZ2UgQ0kgaXNzdWVzLiBgaW5kZXgudHNgIGhhZCB0byBiZSByZW5hbWVkIHRvIGBhbGwudHNgIGZvciB0aGlzXG4gKiB0byB3b3JrLlxuICpcbiAqIEppcmEgSXNzdWUgPSBGVy0xMTg0XG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYWxsb2NfaG9zdF92YXJzJztcbmV4cG9ydCAqIGZyb20gJy4vYXR0cmlidXRlJztcbmV4cG9ydCAqIGZyb20gJy4vYXR0cmlidXRlX2ludGVycG9sYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vY29udGFpbmVyJztcbmV4cG9ydCAqIGZyb20gJy4vc3RvcmFnZSc7XG5leHBvcnQgKiBmcm9tICcuL2RpJztcbmV4cG9ydCAqIGZyb20gJy4vZWxlbWVudCc7XG5leHBvcnQgKiBmcm9tICcuL2VsZW1lbnRfY29udGFpbmVyJztcbmV4cG9ydCAqIGZyb20gJy4vZW1iZWRkZWRfdmlldyc7XG5leHBvcnQgKiBmcm9tICcuL2dldF9jdXJyZW50X3ZpZXcnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcnBvbGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vbGlzdGVuZXInO1xuZXhwb3J0ICogZnJvbSAnLi9uYW1lc3BhY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9uZXh0X2NvbnRleHQnO1xuZXhwb3J0ICogZnJvbSAnLi9wcm9qZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vcHJvcGVydHknO1xuZXhwb3J0ICogZnJvbSAnLi9wcm9wZXJ0eV9pbnRlcnBvbGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vc2VsZWN0JztcbmV4cG9ydCAqIGZyb20gJy4vc3R5bGluZyc7XG5leHBvcnQge3N0eWxlU2FuaXRpemVyIGFzIMm1ybVzdHlsZVNhbml0aXplcn0gZnJvbSAnLi4vc3R5bGluZ19uZXh0L2luc3RydWN0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL3RleHQnO1xuZXhwb3J0ICogZnJvbSAnLi90ZXh0X2ludGVycG9sYXRpb24nO1xuIl19