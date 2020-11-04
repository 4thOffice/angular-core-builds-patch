/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let _icuContainerIterate;
/**
 * Iterator which provides ability to visit all of the `TIcuContainerNode` root `RNode`s.
 */
export function icuContainerIterate(tIcuContainerNode, lView) {
    return _icuContainerIterate(tIcuContainerNode, lView);
}
/**
 * Ensures that `IcuContainerVisitor`'s implementation is present.
 *
 * This function is invoked when i18n instruction comes across an ICU. The purpose is to allow the
 * bundler to tree shake ICU logic and only load it if ICU instruction is executed.
 */
export function ensureIcuContainerVisitorLoaded(loader) {
    if (_icuContainerIterate === undefined) {
        // Do not inline this function. We want to keep `ensureIcuContainerVisitorLoaded` light, so it
        // can be inlined into call-site.
        _icuContainerIterate = loader();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl90cmVlX3NoYWtpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2kxOG4vaTE4bl90cmVlX3NoYWtpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBY0gsSUFBSSxvQkFDb0IsQ0FBQztBQUV6Qjs7R0FFRztBQUNILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxpQkFBb0MsRUFBRSxLQUFZO0lBRXBGLE9BQU8sb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLCtCQUErQixDQUMzQyxNQUE0RjtJQUM5RixJQUFJLG9CQUFvQixLQUFLLFNBQVMsRUFBRTtRQUN0Qyw4RkFBOEY7UUFDOUYsaUNBQWlDO1FBQ2pDLG9CQUFvQixHQUFHLE1BQU0sRUFBRSxDQUFDO0tBQ2pDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqXG4gKiBUaGlzIGZpbGUgcHJvdmlkZXMgbWVjaGFuaXNtIGJ5IHdoaWNoIGNvZGUgcmVsZXZhbnQgdG8gdGhlIGBUSWN1Q29udGFpbmVyTm9kZWAgaXMgb25seSBsb2FkZWQgaWZcbiAqIElDVSBpcyBwcmVzZW50IGluIHRoZSB0ZW1wbGF0ZS5cbiAqL1xuXG5pbXBvcnQge1RJY3VDb250YWluZXJOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge0xWaWV3fSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5cbmxldCBfaWN1Q29udGFpbmVySXRlcmF0ZTogKHRJY3VDb250YWluZXJOb2RlOiBUSWN1Q29udGFpbmVyTm9kZSwgbFZpZXc6IExWaWV3KSA9PlxuICAgICgoKSA9PiBSTm9kZSB8IG51bGwpO1xuXG4vKipcbiAqIEl0ZXJhdG9yIHdoaWNoIHByb3ZpZGVzIGFiaWxpdHkgdG8gdmlzaXQgYWxsIG9mIHRoZSBgVEljdUNvbnRhaW5lck5vZGVgIHJvb3QgYFJOb2RlYHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpY3VDb250YWluZXJJdGVyYXRlKHRJY3VDb250YWluZXJOb2RlOiBUSWN1Q29udGFpbmVyTm9kZSwgbFZpZXc6IExWaWV3KTogKCkgPT5cbiAgICBSTm9kZSB8IG51bGwge1xuICByZXR1cm4gX2ljdUNvbnRhaW5lckl0ZXJhdGUodEljdUNvbnRhaW5lck5vZGUsIGxWaWV3KTtcbn1cblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgYEljdUNvbnRhaW5lclZpc2l0b3JgJ3MgaW1wbGVtZW50YXRpb24gaXMgcHJlc2VudC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGludm9rZWQgd2hlbiBpMThuIGluc3RydWN0aW9uIGNvbWVzIGFjcm9zcyBhbiBJQ1UuIFRoZSBwdXJwb3NlIGlzIHRvIGFsbG93IHRoZVxuICogYnVuZGxlciB0byB0cmVlIHNoYWtlIElDVSBsb2dpYyBhbmQgb25seSBsb2FkIGl0IGlmIElDVSBpbnN0cnVjdGlvbiBpcyBleGVjdXRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZUljdUNvbnRhaW5lclZpc2l0b3JMb2FkZWQoXG4gICAgbG9hZGVyOiAoKSA9PiAoKHRJY3VDb250YWluZXJOb2RlOiBUSWN1Q29udGFpbmVyTm9kZSwgbFZpZXc6IExWaWV3KSA9PiAoKCkgPT4gUk5vZGUgfCBudWxsKSkpIHtcbiAgaWYgKF9pY3VDb250YWluZXJJdGVyYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBEbyBub3QgaW5saW5lIHRoaXMgZnVuY3Rpb24uIFdlIHdhbnQgdG8ga2VlcCBgZW5zdXJlSWN1Q29udGFpbmVyVmlzaXRvckxvYWRlZGAgbGlnaHQsIHNvIGl0XG4gICAgLy8gY2FuIGJlIGlubGluZWQgaW50byBjYWxsLXNpdGUuXG4gICAgX2ljdUNvbnRhaW5lckl0ZXJhdGUgPSBsb2FkZXIoKTtcbiAgfVxufVxuIl19