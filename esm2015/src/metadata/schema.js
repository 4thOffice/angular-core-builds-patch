/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines a schema that allows an NgModule to contain the following:
 * - Non-Angular elements named with dash case (`-`).
 * - Element properties named with dash case (`-`).
 * Dash case is the naming convention for custom elements.
 *
 * @publicApi
 */
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that allows any property on any element.
 *
 * @publicApi
 */
export const NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbWV0YWRhdGEvc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWdCSDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQW1CO0lBQ3BELElBQUksRUFBRSxpQkFBaUI7Q0FDeEIsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBbUI7SUFDOUMsSUFBSSxFQUFFLGtCQUFrQjtDQUN6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuLyoqXG4gKiBBIHNjaGVtYSBkZWZpbml0aW9uIGFzc29jaWF0ZWQgd2l0aCBhbiBOZ01vZHVsZS5cbiAqXG4gKiBAc2VlIGBATmdNb2R1bGVgLCBgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQWAsIGBOT19FUlJPUlNfU0NIRU1BYFxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGEgZGVmaW5lZCBzY2hlbWEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYU1ldGFkYXRhIHtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIERlZmluZXMgYSBzY2hlbWEgdGhhdCBhbGxvd3MgYW4gTmdNb2R1bGUgdG8gY29udGFpbiB0aGUgZm9sbG93aW5nOlxuICogLSBOb24tQW5ndWxhciBlbGVtZW50cyBuYW1lZCB3aXRoIGRhc2ggY2FzZSAoYC1gKS5cbiAqIC0gRWxlbWVudCBwcm9wZXJ0aWVzIG5hbWVkIHdpdGggZGFzaCBjYXNlIChgLWApLlxuICogRGFzaCBjYXNlIGlzIHRoZSBuYW1pbmcgY29udmVudGlvbiBmb3IgY3VzdG9tIGVsZW1lbnRzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IENVU1RPTV9FTEVNRU5UU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnY3VzdG9tLWVsZW1lbnRzJ1xufTtcblxuLyoqXG4gKiBEZWZpbmVzIGEgc2NoZW1hIHRoYXQgYWxsb3dzIGFueSBwcm9wZXJ0eSBvbiBhbnkgZWxlbWVudC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBOT19FUlJPUlNfU0NIRU1BOiBTY2hlbWFNZXRhZGF0YSA9IHtcbiAgbmFtZTogJ25vLWVycm9ycy1zY2hlbWEnXG59O1xuIl19