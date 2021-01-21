/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Determine if the argument is shaped like a Promise
 */
export function isPromise(obj) {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && typeof obj.then === 'function';
}
/**
 * Determine if the argument is a Subscribable
 */
export function isSubscribable(obj) {
    return !!obj && typeof obj.subscribe === 'function';
}
/**
 * Determine if the argument is an Observable
 *
 * Strictly this tests that the `obj` is `Subscribable`, since `Observable`
 * types need additional methods, such as `lift()`. But it is adequate for our
 * needs since within the Angular framework code we only ever need to use the
 * `subscribe()` method, and RxJS has mechanisms to wrap `Subscribable` objects
 * into `Observable` as needed.
 */
export const isObservable = isSubscribable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3V0aWwvbGFuZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQVUsR0FBUTtJQUN6QywyQ0FBMkM7SUFDM0MscUVBQXFFO0lBQ3JFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDO0FBQ2pELENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsR0FBMEI7SUFDdkQsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDdEQsQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUNyQixjQUF3RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaWJhYmxlfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgdGhlIGFyZ3VtZW50IGlzIHNoYXBlZCBsaWtlIGEgUHJvbWlzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlPFQgPSBhbnk+KG9iajogYW55KTogb2JqIGlzIFByb21pc2U8VD4ge1xuICAvLyBhbGxvdyBhbnkgUHJvbWlzZS9BKyBjb21wbGlhbnQgdGhlbmFibGUuXG4gIC8vIEl0J3MgdXAgdG8gdGhlIGNhbGxlciB0byBlbnN1cmUgdGhhdCBvYmoudGhlbiBjb25mb3JtcyB0byB0aGUgc3BlY1xuICByZXR1cm4gISFvYmogJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB0aGUgYXJndW1lbnQgaXMgYSBTdWJzY3JpYmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3Vic2NyaWJhYmxlKG9iajogYW55fFN1YnNjcmliYWJsZTxhbnk+KTogb2JqIGlzIFN1YnNjcmliYWJsZTxhbnk+IHtcbiAgcmV0dXJuICEhb2JqICYmIHR5cGVvZiBvYmouc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB0aGUgYXJndW1lbnQgaXMgYW4gT2JzZXJ2YWJsZVxuICpcbiAqIFN0cmljdGx5IHRoaXMgdGVzdHMgdGhhdCB0aGUgYG9iamAgaXMgYFN1YnNjcmliYWJsZWAsIHNpbmNlIGBPYnNlcnZhYmxlYFxuICogdHlwZXMgbmVlZCBhZGRpdGlvbmFsIG1ldGhvZHMsIHN1Y2ggYXMgYGxpZnQoKWAuIEJ1dCBpdCBpcyBhZGVxdWF0ZSBmb3Igb3VyXG4gKiBuZWVkcyBzaW5jZSB3aXRoaW4gdGhlIEFuZ3VsYXIgZnJhbWV3b3JrIGNvZGUgd2Ugb25seSBldmVyIG5lZWQgdG8gdXNlIHRoZVxuICogYHN1YnNjcmliZSgpYCBtZXRob2QsIGFuZCBSeEpTIGhhcyBtZWNoYW5pc21zIHRvIHdyYXAgYFN1YnNjcmliYWJsZWAgb2JqZWN0c1xuICogaW50byBgT2JzZXJ2YWJsZWAgYXMgbmVlZGVkLlxuICovXG5leHBvcnQgY29uc3QgaXNPYnNlcnZhYmxlID1cbiAgICBpc1N1YnNjcmliYWJsZSBhcyAoKG9iajogYW55fE9ic2VydmFibGU8YW55PikgPT4gb2JqIGlzIE9ic2VydmFibGU8YW55Pik7XG4iXX0=