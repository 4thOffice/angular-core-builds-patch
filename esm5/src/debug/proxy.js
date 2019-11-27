/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../util/global';
/**
 * Creates an instance of a `Proxy` and creates with an empty target object and binds it to the
 * provided handler.
 *
 * The reason why this function exists is because IE doesn't support
 * the `Proxy` class. For this reason an error must be thrown.
 */
export function createProxy(handler) {
    var g = global;
    if (!g.Proxy) {
        throw new Error('Proxy is not supported in this browser');
    }
    return new g.Proxy({}, handler);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kZWJ1Zy9wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFTdEM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFdBQVcsQ0FBQyxPQUEwQjtJQUNwRCxJQUFNLENBQUMsR0FBRyxNQUFnQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vdXRpbC9nbG9iYWwnO1xuXG4vKipcbiAqIFVzZWQgdG8gaW5mb3JtIFRTIGFib3V0IHRoZSBgUHJveHlgIGNsYXNzIGV4aXN0aW5nIGdsb2JhbGx5LlxuICovXG5pbnRlcmZhY2UgR2xvYmFsV2l0aFByb3h5IHtcbiAgUHJveHk6IHR5cGVvZiBQcm94eTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIGEgYFByb3h5YCBhbmQgY3JlYXRlcyB3aXRoIGFuIGVtcHR5IHRhcmdldCBvYmplY3QgYW5kIGJpbmRzIGl0IHRvIHRoZVxuICogcHJvdmlkZWQgaGFuZGxlci5cbiAqXG4gKiBUaGUgcmVhc29uIHdoeSB0aGlzIGZ1bmN0aW9uIGV4aXN0cyBpcyBiZWNhdXNlIElFIGRvZXNuJ3Qgc3VwcG9ydFxuICogdGhlIGBQcm94eWAgY2xhc3MuIEZvciB0aGlzIHJlYXNvbiBhbiBlcnJvciBtdXN0IGJlIHRocm93bi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGhhbmRsZXI6IFByb3h5SGFuZGxlcjxhbnk+KToge30ge1xuICBjb25zdCBnID0gZ2xvYmFsIGFzIGFueSBhcyBHbG9iYWxXaXRoUHJveHk7XG4gIGlmICghZy5Qcm94eSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUHJveHkgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKTtcbiAgfVxuICByZXR1cm4gbmV3IGcuUHJveHkoe30sIGhhbmRsZXIpO1xufVxuIl19