/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
const __global = typeof window != 'undefined' && window || typeof global != 'undefined' && global ||
    typeof self != 'undefined' && self;
/**
 * @return {?}
 */
export function ngDevModeResetPerfCounters() {
    // Make sure to refer to ngDevMode as ['ngDevMode'] for clousre.
    return __global['ngDevMode'] = {
        firstTemplatePass: 0,
        tNode: 0,
        tView: 0,
        rendererCreateTextNode: 0,
        rendererSetText: 0,
        rendererCreateElement: 0,
        rendererAddEventListener: 0,
        rendererSetAttribute: 0,
        rendererRemoveAttribute: 0,
        rendererSetProperty: 0,
        rendererSetClassName: 0,
        rendererAddClass: 0,
        rendererRemoveClass: 0,
        rendererSetStyle: 0,
        rendererRemoveStyle: 0,
        rendererDestroy: 0,
        rendererDestroyNode: 0,
        rendererMoveNode: 0,
        rendererRemoveNode: 0,
        rendererCreateComment: 0,
    };
}
/**
 * This checks to see if the `ngDevMode` has been set. If yes,
 * than we honor it, otherwise we default to dev mode with additional checks.
 *
 * The idea is that unless we are doing production build where we explicitly
 * set `ngDevMode == false` we should be helping the developer by providing
 * as much early warning and errors as possible.
 */
if (typeof ngDevMode === 'undefined' || ngDevMode) {
    // Make sure to refer to ngDevMode as ['ngDevMode'] for clousre.
    __global['ngDevMode'] = ngDevModeResetPerfCounters();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQXNDQSxNQUFNLFFBQVEsR0FDVixPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNO0lBQ2hGLE9BQU8sSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUM7Ozs7QUFFdkMsTUFBTSxVQUFVLDBCQUEwQjs7SUFFeEMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUc7UUFDN0IsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1Isc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixlQUFlLEVBQUUsQ0FBQztRQUNsQixxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLHdCQUF3QixFQUFFLENBQUM7UUFDM0Isb0JBQW9CLEVBQUUsQ0FBQztRQUN2Qix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLHFCQUFxQixFQUFFLENBQUM7S0FDekIsQ0FBQztDQUNIOzs7Ozs7Ozs7QUFVRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7O0lBRWpELFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO0NBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGNvbnN0IG5nRGV2TW9kZTogbnVsbHxOZ0Rldk1vZGVQZXJmQ291bnRlcnM7XG4gIGludGVyZmFjZSBOZ0Rldk1vZGVQZXJmQ291bnRlcnMge1xuICAgIGZpcnN0VGVtcGxhdGVQYXNzOiBudW1iZXI7XG4gICAgdE5vZGU6IG51bWJlcjtcbiAgICB0VmlldzogbnVtYmVyO1xuICAgIHJlbmRlcmVyQ3JlYXRlVGV4dE5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFRleHQ6IG51bWJlcjtcbiAgICByZW5kZXJlckNyZWF0ZUVsZW1lbnQ6IG51bWJlcjtcbiAgICByZW5kZXJlckFkZEV2ZW50TGlzdGVuZXI6IG51bWJlcjtcbiAgICByZW5kZXJlclNldEF0dHJpYnV0ZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlQXR0cmlidXRlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRQcm9wZXJ0eTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0Q2xhc3NOYW1lOiBudW1iZXI7XG4gICAgcmVuZGVyZXJBZGRDbGFzczogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlQ2xhc3M6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFN0eWxlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVTdHlsZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyRGVzdHJveTogbnVtYmVyO1xuICAgIHJlbmRlcmVyRGVzdHJveU5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlck1vdmVOb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVOb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVDb21tZW50OiBudW1iZXI7XG4gIH1cbn1cblxuZGVjbGFyZSBsZXQgZ2xvYmFsOiBhbnk7XG5cbi8vIE5PVEU6IFRoZSBvcmRlciBoZXJlIG1hdHRlcnM6IENoZWNraW5nIHdpbmRvdywgdGhlbiBnbG9iYWwsIHRoZW4gc2VsZiBpcyBpbXBvcnRhbnQuXG4vLyAgIGNoZWNraW5nIHRoZW0gaW4gYW5vdGhlciBvcmRlciBjYW4gcmVzdWx0IGluIGVycm9ycyBpbiBzb21lIE5vZGUgZW52aXJvbm1lbnRzLlxuY29uc3QgX19nbG9iYWw6IHtuZ0Rldk1vZGU6IE5nRGV2TW9kZVBlcmZDb3VudGVycyB8IGJvb2xlYW59ID1cbiAgICB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdyB8fCB0eXBlb2YgZ2xvYmFsICE9ICd1bmRlZmluZWQnICYmIGdsb2JhbCB8fFxuICAgIHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGY7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycygpOiBOZ0Rldk1vZGVQZXJmQ291bnRlcnMge1xuICAvLyBNYWtlIHN1cmUgdG8gcmVmZXIgdG8gbmdEZXZNb2RlIGFzIFsnbmdEZXZNb2RlJ10gZm9yIGNsb3VzcmUuXG4gIHJldHVybiBfX2dsb2JhbFsnbmdEZXZNb2RlJ10gPSB7XG4gICAgZmlyc3RUZW1wbGF0ZVBhc3M6IDAsXG4gICAgdE5vZGU6IDAsXG4gICAgdFZpZXc6IDAsXG4gICAgcmVuZGVyZXJDcmVhdGVUZXh0Tm9kZTogMCxcbiAgICByZW5kZXJlclNldFRleHQ6IDAsXG4gICAgcmVuZGVyZXJDcmVhdGVFbGVtZW50OiAwLFxuICAgIHJlbmRlcmVyQWRkRXZlbnRMaXN0ZW5lcjogMCxcbiAgICByZW5kZXJlclNldEF0dHJpYnV0ZTogMCxcbiAgICByZW5kZXJlclJlbW92ZUF0dHJpYnV0ZTogMCxcbiAgICByZW5kZXJlclNldFByb3BlcnR5OiAwLFxuICAgIHJlbmRlcmVyU2V0Q2xhc3NOYW1lOiAwLFxuICAgIHJlbmRlcmVyQWRkQ2xhc3M6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVDbGFzczogMCxcbiAgICByZW5kZXJlclNldFN0eWxlOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlU3R5bGU6IDAsXG4gICAgcmVuZGVyZXJEZXN0cm95OiAwLFxuICAgIHJlbmRlcmVyRGVzdHJveU5vZGU6IDAsXG4gICAgcmVuZGVyZXJNb3ZlTm9kZTogMCxcbiAgICByZW5kZXJlclJlbW92ZU5vZGU6IDAsXG4gICAgcmVuZGVyZXJDcmVhdGVDb21tZW50OiAwLFxuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgY2hlY2tzIHRvIHNlZSBpZiB0aGUgYG5nRGV2TW9kZWAgaGFzIGJlZW4gc2V0LiBJZiB5ZXMsXG4gKiB0aGFuIHdlIGhvbm9yIGl0LCBvdGhlcndpc2Ugd2UgZGVmYXVsdCB0byBkZXYgbW9kZSB3aXRoIGFkZGl0aW9uYWwgY2hlY2tzLlxuICpcbiAqIFRoZSBpZGVhIGlzIHRoYXQgdW5sZXNzIHdlIGFyZSBkb2luZyBwcm9kdWN0aW9uIGJ1aWxkIHdoZXJlIHdlIGV4cGxpY2l0bHlcbiAqIHNldCBgbmdEZXZNb2RlID09IGZhbHNlYCB3ZSBzaG91bGQgYmUgaGVscGluZyB0aGUgZGV2ZWxvcGVyIGJ5IHByb3ZpZGluZ1xuICogYXMgbXVjaCBlYXJseSB3YXJuaW5nIGFuZCBlcnJvcnMgYXMgcG9zc2libGUuXG4gKi9cbmlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgLy8gTWFrZSBzdXJlIHRvIHJlZmVyIHRvIG5nRGV2TW9kZSBhcyBbJ25nRGV2TW9kZSddIGZvciBjbG91c3JlLlxuICBfX2dsb2JhbFsnbmdEZXZNb2RlJ10gPSBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycygpO1xufVxuIl19