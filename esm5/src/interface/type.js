/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 *
 * @publicApi
 */
export var Type = Function;
export function isType(v) {
    return typeof v === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2ludGVyZmFjZS90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUM7QUFFN0IsTUFBTSxVQUFVLE1BQU0sQ0FBQyxDQUFNO0lBQzNCLE9BQU8sT0FBTyxDQUFDLEtBQUssVUFBVSxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogUmVwcmVzZW50cyBhIHR5cGUgdGhhdCBhIENvbXBvbmVudCBvciBvdGhlciBvYmplY3QgaXMgaW5zdGFuY2VzIG9mLlxuICpcbiAqIEFuIGV4YW1wbGUgb2YgYSBgVHlwZWAgaXMgYE15Q3VzdG9tQ29tcG9uZW50YCBjbGFzcywgd2hpY2ggaW4gSmF2YVNjcmlwdCBpcyBiZSByZXByZXNlbnRlZCBieVxuICogdGhlIGBNeUN1c3RvbUNvbXBvbmVudGAgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgVHlwZSA9IEZ1bmN0aW9uO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlKHY6IGFueSk6IHYgaXMgVHlwZTxhbnk+IHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFJlcHJlc2VudHMgYW4gYWJzdHJhY3QgY2xhc3MgYFRgLCBpZiBhcHBsaWVkIHRvIGEgY29uY3JldGUgY2xhc3MgaXQgd291bGQgc3RvcCBiZWluZ1xuICogaW5zdGFudGlhdGFibGUuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0VHlwZTxUPiBleHRlbmRzIEZ1bmN0aW9uIHsgcHJvdG90eXBlOiBUOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZTxUPiBleHRlbmRzIEZ1bmN0aW9uIHsgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQ7IH1cblxuZXhwb3J0IHR5cGUgTXV0YWJsZTxUIGV4dGVuZHN7W3g6IHN0cmluZ106IGFueX0sIEsgZXh0ZW5kcyBzdHJpbmc+ID0ge1xuICBbUCBpbiBLXTogVFtQXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHdyaXRhYmxlIHR5cGUgdmVyc2lvbiBvZiB0eXBlLlxuICpcbiAqIFVTQUdFOlxuICogR2l2ZW46XG4gKiBgYGBcbiAqIGludGVyZmFjZSBQZXJzb24ge3JlYWRvbmx5IG5hbWU6IHN0cmluZ31cbiAqIGBgYFxuICpcbiAqIFdlIHdvdWxkIGxpa2UgdG8gZ2V0IGEgcmVhZC93cml0ZSB2ZXJzaW9uIG9mIGBQZXJzb25gLlxuICogYGBgXG4gKiBjb25zdCBXcml0YWJsZVBlcnNvbiA9IFdyaXRhYmxlPFBlcnNvbj47XG4gKiBgYGBcbiAqXG4gKiBUaGUgcmVzdWx0IGlzIHRoYXQgeW91IGNhbiBkbzpcbiAqXG4gKiBgYGBcbiAqIGNvbnN0IHJlYWRvbmx5UGVyc29uOiBQZXJzb24gPSB7bmFtZTogJ01hcnJ5J307XG4gKiByZWFkb25seVBlcnNvbi5uYW1lID0gJ0pvaG4nOyAvLyBUeXBlRXJyb3JcbiAqIChyZWFkb25seVBlcnNvbiBhcyBXcml0YWJsZVBlcnNvbikubmFtZSA9ICdKb2huJzsgLy8gT0tcbiAqXG4gKiAvLyBFcnJvcjogQ29ycmVjdGx5IGRldGVjdHMgdGhhdCBgUGVyc29uYCBkaWQgbm90IGhhdmUgYGFnZWAgcHJvcGVydHkuXG4gKiAocmVhZG9ubHlQZXJzb24gYXMgV3JpdGFibGVQZXJzb24pLmFnZSA9IDMwO1xuICogYGBgXG4gKi9cbmV4cG9ydCB0eXBlIFdyaXRhYmxlPFQ+ID0ge1xuICAtcmVhZG9ubHlbSyBpbiBrZXlvZiBUXTogVFtLXTtcbn07XG4iXX0=