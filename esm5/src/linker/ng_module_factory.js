/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * @publicApi
 */
var NgModuleRef = /** @class */ (function () {
    function NgModuleRef() {
    }
    return NgModuleRef;
}());
export { NgModuleRef };
/**
 * @publicApi
 */
var NgModuleFactory = /** @class */ (function () {
    function NgModuleFactory() {
    }
    return NgModuleFactory;
}());
export { NgModuleFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvbmdfbW9kdWxlX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBUUg7Ozs7Ozs7R0FPRztBQUNIO0lBQUE7SUEwQkEsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQzs7QUFRRDs7R0FFRztBQUNIO0lBQUE7SUFHQSxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5cbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSBmcm9tICcuL2NvbXBvbmVudF9mYWN0b3J5X3Jlc29sdmVyJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW5zdGFuY2Ugb2YgYW4gTmdNb2R1bGUgY3JlYXRlZCB2aWEgYSB7QGxpbmsgTmdNb2R1bGVGYWN0b3J5fS5cbiAqXG4gKiBgTmdNb2R1bGVSZWZgIHByb3ZpZGVzIGFjY2VzcyB0byB0aGUgTmdNb2R1bGUgSW5zdGFuY2UgYXMgd2VsbCBvdGhlciBvYmplY3RzIHJlbGF0ZWQgdG8gdGhpc1xuICogTmdNb2R1bGUgSW5zdGFuY2UuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdNb2R1bGVSZWY8VD4ge1xuICAvKipcbiAgICogVGhlIGluamVjdG9yIHRoYXQgY29udGFpbnMgYWxsIG9mIHRoZSBwcm92aWRlcnMgb2YgdGhlIE5nTW9kdWxlLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yO1xuXG4gIC8qKlxuICAgKiBUaGUgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIHRvIGdldCBob2xkIG9mIHRoZSBDb21wb25lbnRGYWN0b3JpZXNcbiAgICogZGVjbGFyZWQgaW4gdGhlIGBlbnRyeUNvbXBvbmVudHNgIHByb3BlcnR5IG9mIHRoZSBtb2R1bGUuXG4gICAqL1xuICBhYnN0cmFjdCBnZXQgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKCk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjtcblxuICAvKipcbiAgICogVGhlIE5nTW9kdWxlIGluc3RhbmNlLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0IGluc3RhbmNlKCk6IFQ7XG5cbiAgLyoqXG4gICAqIERlc3Ryb3lzIHRoZSBtb2R1bGUgaW5zdGFuY2UgYW5kIGFsbCBvZiB0aGUgZGF0YSBzdHJ1Y3R1cmVzIGFzc29jaWF0ZWQgd2l0aCBpdC5cbiAgICovXG4gIGFic3RyYWN0IGRlc3Ryb3koKTogdm9pZDtcblxuICAvKipcbiAgICogQWxsb3dzIHRvIHJlZ2lzdGVyIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBtb2R1bGUgaXMgZGVzdHJveWVkLlxuICAgKi9cbiAgYWJzdHJhY3Qgb25EZXN0cm95KGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbE5nTW9kdWxlUmVmPFQ+IGV4dGVuZHMgTmdNb2R1bGVSZWY8VD4ge1xuICAvLyBOb3RlOiB3ZSBhcmUgdXNpbmcgdGhlIHByZWZpeCBfIGFzIE5nTW9kdWxlRGF0YSBpcyBhbiBOZ01vZHVsZVJlZiBhbmQgdGhlcmVmb3JlIGRpcmVjdGx5XG4gIC8vIGV4cG9zZWQgdG8gdGhlIHVzZXIuXG4gIF9ib290c3RyYXBDb21wb25lbnRzOiBUeXBlPGFueT5bXTtcbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBOZ01vZHVsZUZhY3Rvcnk8VD4ge1xuICBhYnN0cmFjdCBnZXQgbW9kdWxlVHlwZSgpOiBUeXBlPFQ+O1xuICBhYnN0cmFjdCBjcmVhdGUocGFyZW50SW5qZWN0b3I6IEluamVjdG9yfG51bGwpOiBOZ01vZHVsZVJlZjxUPjtcbn1cbiJdfQ==