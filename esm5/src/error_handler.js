/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ERROR_ORIGINAL_ERROR, getDebugContext, getErrorLogger, getOriginalError } from './errors';
/**
 *
 * @description
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 *
 */
var /**
 *
 * @description
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 *
 */
ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
        /**
           * @internal
           */
        this._console = console;
    }
    ErrorHandler.prototype.handleError = function (error) {
        var originalError = this._findOriginalError(error);
        var context = this._findContext(error);
        // Note: Browser consoles show the place from where console.error was called.
        // We can use this to give users additional information about the error.
        var errorLogger = getErrorLogger(error);
        errorLogger(this._console, "ERROR", error);
        if (originalError) {
            errorLogger(this._console, "ORIGINAL ERROR", originalError);
        }
        if (context) {
            errorLogger(this._console, 'ERROR CONTEXT', context);
        }
    };
    /** @internal */
    /** @internal */
    ErrorHandler.prototype._findContext = /** @internal */
    function (error) {
        if (error) {
            return getDebugContext(error) ? getDebugContext(error) :
                this._findContext(getOriginalError(error));
        }
        return null;
    };
    /** @internal */
    /** @internal */
    ErrorHandler.prototype._findOriginalError = /** @internal */
    function (error) {
        var e = getOriginalError(error);
        while (e && getOriginalError(e)) {
            e = getOriginalError(e);
        }
        return e;
    };
    return ErrorHandler;
}());
/**
 *
 * @description
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 * @NgModule({
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 *
 */
export { ErrorHandler };
export function wrappedError(message, originalError) {
    var msg = message + " caused by: " + (originalError instanceof Error ? originalError.message : originalError);
    var error = Error(msg);
    error[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2Vycm9yX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QmpHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozt3QkFJc0IsT0FBTzs7SUFFM0Isa0NBQVcsR0FBWCxVQUFZLEtBQVU7UUFDcEIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7OztRQUd6QyxJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksYUFBYSxFQUFFO1lBQ2pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDdEQ7S0FDRjtJQUVELGdCQUFnQjs7SUFDaEIsbUNBQVk7SUFBWixVQUFhLEtBQVU7UUFDckIsSUFBSSxLQUFLLEVBQUU7WUFDVCxPQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RTtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxnQkFBZ0I7O0lBQ2hCLHlDQUFrQjtJQUFsQixVQUFtQixLQUFZO1FBQzdCLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQy9CLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QjtRQUVELE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7dUJBOUVIO0lBK0VDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXpDRCx3QkF5Q0M7QUFFRCxNQUFNLHVCQUF1QixPQUFlLEVBQUUsYUFBa0I7SUFDOUQsSUFBTSxHQUFHLEdBQ0YsT0FBTyxxQkFBZSxhQUFhLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQyxhQUFhLENBQUcsQ0FBQztJQUN0RyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsS0FBYSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsYUFBYSxDQUFDO0lBQ3JELE9BQU8sS0FBSyxDQUFDO0NBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RVJST1JfT1JJR0lOQUxfRVJST1IsIGdldERlYnVnQ29udGV4dCwgZ2V0RXJyb3JMb2dnZXIsIGdldE9yaWdpbmFsRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuXG5cbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUHJvdmlkZXMgYSBob29rIGZvciBjZW50cmFsaXplZCBleGNlcHRpb24gaGFuZGxpbmcuXG4gKlxuICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYEVycm9ySGFuZGxlcmAgcHJpbnRzIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSBgY29uc29sZWAuIFRvXG4gKiBpbnRlcmNlcHQgZXJyb3IgaGFuZGxpbmcsIHdyaXRlIGEgY3VzdG9tIGV4Y2VwdGlvbiBoYW5kbGVyIHRoYXQgcmVwbGFjZXMgdGhpcyBkZWZhdWx0IGFzXG4gKiBhcHByb3ByaWF0ZSBmb3IgeW91ciBhcHAuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGNsYXNzIE15RXJyb3JIYW5kbGVyIGltcGxlbWVudHMgRXJyb3JIYW5kbGVyIHtcbiAqICAgaGFuZGxlRXJyb3IoZXJyb3IpIHtcbiAqICAgICAvLyBkbyBzb21ldGhpbmcgd2l0aCB0aGUgZXhjZXB0aW9uXG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBATmdNb2R1bGUoe1xuICogICBwcm92aWRlcnM6IFt7cHJvdmlkZTogRXJyb3JIYW5kbGVyLCB1c2VDbGFzczogTXlFcnJvckhhbmRsZXJ9XVxuICogfSlcbiAqIGNsYXNzIE15TW9kdWxlIHt9XG4gKiBgYGBcbiAqXG4gKlxuICovXG5leHBvcnQgY2xhc3MgRXJyb3JIYW5kbGVyIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2NvbnNvbGU6IENvbnNvbGUgPSBjb25zb2xlO1xuXG4gIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBvcmlnaW5hbEVycm9yID0gdGhpcy5fZmluZE9yaWdpbmFsRXJyb3IoZXJyb3IpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9maW5kQ29udGV4dChlcnJvcik7XG4gICAgLy8gTm90ZTogQnJvd3NlciBjb25zb2xlcyBzaG93IHRoZSBwbGFjZSBmcm9tIHdoZXJlIGNvbnNvbGUuZXJyb3Igd2FzIGNhbGxlZC5cbiAgICAvLyBXZSBjYW4gdXNlIHRoaXMgdG8gZ2l2ZSB1c2VycyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFib3V0IHRoZSBlcnJvci5cbiAgICBjb25zdCBlcnJvckxvZ2dlciA9IGdldEVycm9yTG9nZ2VyKGVycm9yKTtcblxuICAgIGVycm9yTG9nZ2VyKHRoaXMuX2NvbnNvbGUsIGBFUlJPUmAsIGVycm9yKTtcbiAgICBpZiAob3JpZ2luYWxFcnJvcikge1xuICAgICAgZXJyb3JMb2dnZXIodGhpcy5fY29uc29sZSwgYE9SSUdJTkFMIEVSUk9SYCwgb3JpZ2luYWxFcnJvcik7XG4gICAgfVxuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICBlcnJvckxvZ2dlcih0aGlzLl9jb25zb2xlLCAnRVJST1IgQ09OVEVYVCcsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2ZpbmRDb250ZXh0KGVycm9yOiBhbnkpOiBhbnkge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIGdldERlYnVnQ29udGV4dChlcnJvcikgPyBnZXREZWJ1Z0NvbnRleHQoZXJyb3IpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZENvbnRleHQoZ2V0T3JpZ2luYWxFcnJvcihlcnJvcikpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZmluZE9yaWdpbmFsRXJyb3IoZXJyb3I6IEVycm9yKTogYW55IHtcbiAgICBsZXQgZSA9IGdldE9yaWdpbmFsRXJyb3IoZXJyb3IpO1xuICAgIHdoaWxlIChlICYmIGdldE9yaWdpbmFsRXJyb3IoZSkpIHtcbiAgICAgIGUgPSBnZXRPcmlnaW5hbEVycm9yKGUpO1xuICAgIH1cblxuICAgIHJldHVybiBlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVkRXJyb3IobWVzc2FnZTogc3RyaW5nLCBvcmlnaW5hbEVycm9yOiBhbnkpOiBFcnJvciB7XG4gIGNvbnN0IG1zZyA9XG4gICAgICBgJHttZXNzYWdlfSBjYXVzZWQgYnk6ICR7b3JpZ2luYWxFcnJvciBpbnN0YW5jZW9mIEVycm9yID8gb3JpZ2luYWxFcnJvci5tZXNzYWdlOiBvcmlnaW5hbEVycm9yIH1gO1xuICBjb25zdCBlcnJvciA9IEVycm9yKG1zZyk7XG4gIChlcnJvciBhcyBhbnkpW0VSUk9SX09SSUdJTkFMX0VSUk9SXSA9IG9yaWdpbmFsRXJyb3I7XG4gIHJldHVybiBlcnJvcjtcbn1cbiJdfQ==