/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
export * from './metadata';
export { InjectFlags } from './interface/injector';
export { defineInjectable, defineInjector } from './interface/defs';
export { forwardRef, resolveForwardRef } from './forward_ref';
export { Injectable } from './injectable';
export { INJECTOR, Injector } from './injector';
export { inject } from './injector_compatibility';
export { ReflectiveInjector } from './reflective_injector';
export { ResolvedReflectiveFactory } from './reflective_provider';
export { ReflectiveKey } from './reflective_key';
export { InjectionToken } from './injection_token';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7OztHQUlHO0FBRUgsY0FBYyxZQUFZLENBQUM7QUFDM0IsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxjQUFjLEVBQStCLE1BQU0sa0JBQWtCLENBQUM7QUFDaEcsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUMsVUFBVSxFQUEwQyxNQUFNLGNBQWMsQ0FBQztBQUNqRixPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsT0FBTyxFQUFDLHlCQUF5QixFQUE2QixNQUFNLHVCQUF1QixDQUFDO0FBQzVGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQG1vZHVsZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGUgYGRpYCBtb2R1bGUgcHJvdmlkZXMgZGVwZW5kZW5jeSBpbmplY3Rpb24gY29udGFpbmVyIHNlcnZpY2VzLlxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbWV0YWRhdGEnO1xuZXhwb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2UvaW5qZWN0b3InO1xuZXhwb3J0IHtkZWZpbmVJbmplY3RhYmxlLCBkZWZpbmVJbmplY3RvciwgSW5qZWN0YWJsZVR5cGUsIEluamVjdG9yVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZGVmcyc7XG5leHBvcnQge2ZvcndhcmRSZWYsIHJlc29sdmVGb3J3YXJkUmVmLCBGb3J3YXJkUmVmRm59IGZyb20gJy4vZm9yd2FyZF9yZWYnO1xuZXhwb3J0IHtJbmplY3RhYmxlLCBJbmplY3RhYmxlRGVjb3JhdG9yLCBJbmplY3RhYmxlUHJvdmlkZXJ9IGZyb20gJy4vaW5qZWN0YWJsZSc7XG5leHBvcnQge0lOSkVDVE9SLCBJbmplY3Rvcn0gZnJvbSAnLi9pbmplY3Rvcic7XG5leHBvcnQge2luamVjdH0gZnJvbSAnLi9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmV4cG9ydCB7UmVmbGVjdGl2ZUluamVjdG9yfSBmcm9tICcuL3JlZmxlY3RpdmVfaW5qZWN0b3InO1xuZXhwb3J0IHtTdGF0aWNQcm92aWRlciwgVmFsdWVQcm92aWRlciwgQ29uc3RydWN0b3JTYW5zUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgUHJvdmlkZXIsIFR5cGVQcm92aWRlciwgQ2xhc3NQcm92aWRlcn0gZnJvbSAnLi9pbnRlcmZhY2UvcHJvdmlkZXInO1xuZXhwb3J0IHtSZXNvbHZlZFJlZmxlY3RpdmVGYWN0b3J5LCBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlcn0gZnJvbSAnLi9yZWZsZWN0aXZlX3Byb3ZpZGVyJztcbmV4cG9ydCB7UmVmbGVjdGl2ZUtleX0gZnJvbSAnLi9yZWZsZWN0aXZlX2tleSc7XG5leHBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG4iXX0=