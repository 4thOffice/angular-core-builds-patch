/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const __global = typeof window != 'undefined' && window || typeof self != 'undefined' && self ||
    typeof global != 'undefined' && global;
export function ngDevModeResetPerfCounters() {
    __global.ngDevMode = {
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
    ngDevModeResetPerfCounters();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWlDSCxNQUFNLFFBQVEsR0FDVixPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJO0lBQzVFLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUM7QUFFM0MsTUFBTTtJQUNKLFFBQVEsQ0FBQyxTQUFTLEdBQUc7UUFDbkIsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1Isc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixlQUFlLEVBQUUsQ0FBQztRQUNsQixxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLHdCQUF3QixFQUFFLENBQUM7UUFDM0Isb0JBQW9CLEVBQUUsQ0FBQztRQUN2Qix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLHFCQUFxQixFQUFFLENBQUM7S0FDekIsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO0lBQ2pELDBCQUEwQixFQUFFLENBQUM7Q0FDOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuZGVjbGFyZSBnbG9iYWwge1xuICBjb25zdCBuZ0Rldk1vZGU6IG51bGx8TmdEZXZNb2RlUGVyZkNvdW50ZXJzO1xuICBpbnRlcmZhY2UgTmdEZXZNb2RlUGVyZkNvdW50ZXJzIHtcbiAgICBmaXJzdFRlbXBsYXRlUGFzczogbnVtYmVyO1xuICAgIHROb2RlOiBudW1iZXI7XG4gICAgdFZpZXc6IG51bWJlcjtcbiAgICByZW5kZXJlckNyZWF0ZVRleHROb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRUZXh0OiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVFbGVtZW50OiBudW1iZXI7XG4gICAgcmVuZGVyZXJBZGRFdmVudExpc3RlbmVyOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRBdHRyaWJ1dGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZUF0dHJpYnV0ZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0UHJvcGVydHk6IG51bWJlcjtcbiAgICByZW5kZXJlclNldENsYXNzTmFtZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyQWRkQ2xhc3M6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZUNsYXNzOiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRTdHlsZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlU3R5bGU6IG51bWJlcjtcbiAgICByZW5kZXJlckRlc3Ryb3k6IG51bWJlcjtcbiAgICByZW5kZXJlckRlc3Ryb3lOb2RlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJNb3ZlTm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyUmVtb3ZlTm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyQ3JlYXRlQ29tbWVudDogbnVtYmVyO1xuICB9XG59XG5cblxuXG5kZWNsYXJlIGxldCBnbG9iYWw6IGFueTtcblxuY29uc3QgX19nbG9iYWw6IHtuZ0Rldk1vZGU6IE5nRGV2TW9kZVBlcmZDb3VudGVycyB8IGJvb2xlYW59ID1cbiAgICB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdyB8fCB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmIHx8XG4gICAgdHlwZW9mIGdsb2JhbCAhPSAndW5kZWZpbmVkJyAmJiBnbG9iYWw7XG5cbmV4cG9ydCBmdW5jdGlvbiBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycygpIHtcbiAgX19nbG9iYWwubmdEZXZNb2RlID0ge1xuICAgIGZpcnN0VGVtcGxhdGVQYXNzOiAwLFxuICAgIHROb2RlOiAwLFxuICAgIHRWaWV3OiAwLFxuICAgIHJlbmRlcmVyQ3JlYXRlVGV4dE5vZGU6IDAsXG4gICAgcmVuZGVyZXJTZXRUZXh0OiAwLFxuICAgIHJlbmRlcmVyQ3JlYXRlRWxlbWVudDogMCxcbiAgICByZW5kZXJlckFkZEV2ZW50TGlzdGVuZXI6IDAsXG4gICAgcmVuZGVyZXJTZXRBdHRyaWJ1dGU6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVBdHRyaWJ1dGU6IDAsXG4gICAgcmVuZGVyZXJTZXRQcm9wZXJ0eTogMCxcbiAgICByZW5kZXJlclNldENsYXNzTmFtZTogMCxcbiAgICByZW5kZXJlckFkZENsYXNzOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlQ2xhc3M6IDAsXG4gICAgcmVuZGVyZXJTZXRTdHlsZTogMCxcbiAgICByZW5kZXJlclJlbW92ZVN0eWxlOiAwLFxuICAgIHJlbmRlcmVyRGVzdHJveTogMCxcbiAgICByZW5kZXJlckRlc3Ryb3lOb2RlOiAwLFxuICAgIHJlbmRlcmVyTW92ZU5vZGU6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVOb2RlOiAwLFxuICAgIHJlbmRlcmVyQ3JlYXRlQ29tbWVudDogMCxcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGNoZWNrcyB0byBzZWUgaWYgdGhlIGBuZ0Rldk1vZGVgIGhhcyBiZWVuIHNldC4gSWYgeWVzLFxuICogdGhhbiB3ZSBob25vciBpdCwgb3RoZXJ3aXNlIHdlIGRlZmF1bHQgdG8gZGV2IG1vZGUgd2l0aCBhZGRpdGlvbmFsIGNoZWNrcy5cbiAqXG4gKiBUaGUgaWRlYSBpcyB0aGF0IHVubGVzcyB3ZSBhcmUgZG9pbmcgcHJvZHVjdGlvbiBidWlsZCB3aGVyZSB3ZSBleHBsaWNpdGx5XG4gKiBzZXQgYG5nRGV2TW9kZSA9PSBmYWxzZWAgd2Ugc2hvdWxkIGJlIGhlbHBpbmcgdGhlIGRldmVsb3BlciBieSBwcm92aWRpbmdcbiAqIGFzIG11Y2ggZWFybHkgd2FybmluZyBhbmQgZXJyb3JzIGFzIHBvc3NpYmxlLlxuICovXG5pZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gIG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzKCk7XG59XG4iXX0=