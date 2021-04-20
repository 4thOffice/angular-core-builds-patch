/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Injection flags for DI.
 *
 * @publicApi
 */
export var InjectFlags;
(function (InjectFlags) {
    // TODO(alxhub): make this 'const' (and remove `InternalInjectFlags` enum) when ngc no longer
    // writes exports of it into ngfactory files.
    /** Check self and check parent injector if needed */
    InjectFlags[InjectFlags["Default"] = 0] = "Default";
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    InjectFlags[InjectFlags["Host"] = 1] = "Host";
    /** Don't ascend to ancestors of the node requesting injection. */
    InjectFlags[InjectFlags["Self"] = 2] = "Self";
    /** Skip the node that is requesting injection. */
    InjectFlags[InjectFlags["SkipSelf"] = 4] = "SkipSelf";
    /** Inject `defaultValue` instead if token not found. */
    InjectFlags[InjectFlags["Optional"] = 8] = "Optional";
})(InjectFlags || (InjectFlags = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9pbnRlcmZhY2UvaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBWUg7Ozs7R0FJRztBQUNILE1BQU0sQ0FBTixJQUFZLFdBcUJYO0FBckJELFdBQVksV0FBVztJQUNyQiw2RkFBNkY7SUFDN0YsNkNBQTZDO0lBRTdDLHFEQUFxRDtJQUNyRCxtREFBZ0IsQ0FBQTtJQUVoQjs7O09BR0c7SUFDSCw2Q0FBYSxDQUFBO0lBRWIsa0VBQWtFO0lBQ2xFLDZDQUFhLENBQUE7SUFFYixrREFBa0Q7SUFDbEQscURBQWlCLENBQUE7SUFFakIsd0RBQXdEO0lBQ3hELHFEQUFpQixDQUFBO0FBQ25CLENBQUMsRUFyQlcsV0FBVyxLQUFYLFdBQVcsUUFxQnRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuLyoqXG4gKiBTcGVjaWFsIGZsYWcgaW5kaWNhdGluZyB0aGF0IGEgZGVjb3JhdG9yIGlzIG9mIHR5cGUgYEluamVjdGAuIEl0J3MgdXNlZCB0byBtYWtlIGBJbmplY3RgXG4gKiBkZWNvcmF0b3IgdHJlZS1zaGFrYWJsZSAoc28gd2UgZG9uJ3QgaGF2ZSB0byByZWx5IG9uIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2tzKS5cbiAqIE5vdGU6IHRoaXMgZmxhZyBpcyBub3QgaW5jbHVkZWQgaW50byB0aGUgYEluamVjdEZsYWdzYCBzaW5jZSBpdCdzIGFuIGludGVybmFsLW9ubHkgQVBJLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBEZWNvcmF0b3JGbGFncyB7XG4gIEluamVjdCA9IC0xXG59XG5cbi8qKlxuICogSW5qZWN0aW9uIGZsYWdzIGZvciBESS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBlbnVtIEluamVjdEZsYWdzIHtcbiAgLy8gVE9ETyhhbHhodWIpOiBtYWtlIHRoaXMgJ2NvbnN0JyAoYW5kIHJlbW92ZSBgSW50ZXJuYWxJbmplY3RGbGFnc2AgZW51bSkgd2hlbiBuZ2Mgbm8gbG9uZ2VyXG4gIC8vIHdyaXRlcyBleHBvcnRzIG9mIGl0IGludG8gbmdmYWN0b3J5IGZpbGVzLlxuXG4gIC8qKiBDaGVjayBzZWxmIGFuZCBjaGVjayBwYXJlbnQgaW5qZWN0b3IgaWYgbmVlZGVkICovXG4gIERlZmF1bHQgPSAwYjAwMDAsXG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuIGluamVjdG9yIHNob3VsZCByZXRyaWV2ZSBhIGRlcGVuZGVuY3kgZnJvbSBhbnkgaW5qZWN0b3IgdW50aWwgcmVhY2hpbmcgdGhlXG4gICAqIGhvc3QgZWxlbWVudCBvZiB0aGUgY3VycmVudCBjb21wb25lbnQuIChPbmx5IHVzZWQgd2l0aCBFbGVtZW50IEluamVjdG9yKVxuICAgKi9cbiAgSG9zdCA9IDBiMDAwMSxcblxuICAvKiogRG9uJ3QgYXNjZW5kIHRvIGFuY2VzdG9ycyBvZiB0aGUgbm9kZSByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2VsZiA9IDBiMDAxMCxcblxuICAvKiogU2tpcCB0aGUgbm9kZSB0aGF0IGlzIHJlcXVlc3RpbmcgaW5qZWN0aW9uLiAqL1xuICBTa2lwU2VsZiA9IDBiMDEwMCxcblxuICAvKiogSW5qZWN0IGBkZWZhdWx0VmFsdWVgIGluc3RlYWQgaWYgdG9rZW4gbm90IGZvdW5kLiAqL1xuICBPcHRpb25hbCA9IDBiMTAwMCxcbn1cblxuLyoqXG4gKiBUaGlzIGVudW0gaXMgYW4gZXhhY3QgY29weSBvZiB0aGUgYEluamVjdEZsYWdzYCBlbnVtIGFib3ZlLCBidXQgdGhlIGRpZmZlcmVuY2UgaXMgdGhhdCB0aGlzIGlzIGFcbiAqIGNvbnN0IGVudW0sIHNvIGFjdHVhbCBlbnVtIHZhbHVlcyB3b3VsZCBiZSBpbmxpbmVkIGluIGdlbmVyYXRlZCBjb2RlLiBUaGUgYEluamVjdEZsYWdzYCBlbnVtIGNhblxuICogYmUgdHVybmVkIGludG8gYSBjb25zdCBlbnVtIHdoZW4gVmlld0VuZ2luZSBpcyByZW1vdmVkIChzZWUgVE9ETyBhdCB0aGUgYEluamVjdEZsYWdzYCBlbnVtXG4gKiBhYm92ZSkuIFRoZSBiZW5lZml0IG9mIGlubGluaW5nIGlzIHRoYXQgd2UgY2FuIHVzZSB0aGVzZSBmbGFncyBhdCB0aGUgdG9wIGxldmVsIHdpdGhvdXQgYWZmZWN0aW5nXG4gKiB0cmVlLXNoYWtpbmcgKHNlZSBcIm5vLXRvcGxldmVsLXByb3BlcnR5LWFjY2Vzc1wiIHRzbGludCBydWxlIGZvciBtb3JlIGluZm8pLlxuICogS2VlcCB0aGlzIGVudW0gaW4gc3luYyB3aXRoIGBJbmplY3RGbGFnc2AgZW51bSBhYm92ZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSW50ZXJuYWxJbmplY3RGbGFncyB7XG4gIC8qKiBDaGVjayBzZWxmIGFuZCBjaGVjayBwYXJlbnQgaW5qZWN0b3IgaWYgbmVlZGVkICovXG4gIERlZmF1bHQgPSAwYjAwMDAsXG5cbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGFuIGluamVjdG9yIHNob3VsZCByZXRyaWV2ZSBhIGRlcGVuZGVuY3kgZnJvbSBhbnkgaW5qZWN0b3IgdW50aWwgcmVhY2hpbmcgdGhlXG4gICAqIGhvc3QgZWxlbWVudCBvZiB0aGUgY3VycmVudCBjb21wb25lbnQuIChPbmx5IHVzZWQgd2l0aCBFbGVtZW50IEluamVjdG9yKVxuICAgKi9cbiAgSG9zdCA9IDBiMDAwMSxcblxuICAvKiogRG9uJ3QgYXNjZW5kIHRvIGFuY2VzdG9ycyBvZiB0aGUgbm9kZSByZXF1ZXN0aW5nIGluamVjdGlvbi4gKi9cbiAgU2VsZiA9IDBiMDAxMCxcblxuICAvKiogU2tpcCB0aGUgbm9kZSB0aGF0IGlzIHJlcXVlc3RpbmcgaW5qZWN0aW9uLiAqL1xuICBTa2lwU2VsZiA9IDBiMDEwMCxcblxuICAvKiogSW5qZWN0IGBkZWZhdWx0VmFsdWVgIGluc3RlYWQgaWYgdG9rZW4gbm90IGZvdW5kLiAqL1xuICBPcHRpb25hbCA9IDBiMTAwMCxcblxuICAvKipcbiAgICogVGhpcyB0b2tlbiBpcyBiZWluZyBpbmplY3RlZCBpbnRvIGEgcGlwZS5cbiAgICpcbiAgICogVGhpcyBmbGFnIGlzIGludGVudGlvbmFsbHkgbm90IGluIHRoZSBwdWJsaWMgZmFjaW5nIGBJbmplY3RGbGFnc2AgYmVjYXVzZSBpdCBpcyBvbmx5IGFkZGVkIGJ5XG4gICAqIHRoZSBjb21waWxlciBhbmQgaXMgbm90IGEgZGV2ZWxvcGVyIGFwcGxpY2FibGUgZmxhZy5cbiAgICovXG4gIEZvclBpcGUgPSAwYjEwMDAwLFxufVxuIl19