/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var ngDevModeResetPerfCounters = (typeof ngDevMode == 'undefined' && (function (global) {
    function ngDevModeResetPerfCounters() {
        global['ngDevMode'] = {
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
        };
    }
    ngDevModeResetPerfCounters();
    return ngDevModeResetPerfCounters;
})(typeof window != 'undefined' && window || typeof self != 'undefined' && self ||
    typeof global != 'undefined' && global));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFpQ0EsTUFBTSxDQUFDLElBQU0sMEJBQTBCLEdBQ25DLENBQUMsT0FBTyxTQUFTLElBQUksV0FBVyxJQUFJLENBQUMsVUFBUyxNQUEwQztJQUNyRjtRQUNFLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLEtBQUssRUFBRSxDQUFDO1lBQ1IsS0FBSyxFQUFFLENBQUM7WUFDUixzQkFBc0IsRUFBRSxDQUFDO1lBQ3pCLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLHFCQUFxQixFQUFFLENBQUM7WUFDeEIsd0JBQXdCLEVBQUUsQ0FBQztZQUMzQixvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLHVCQUF1QixFQUFFLENBQUM7WUFDMUIsbUJBQW1CLEVBQUUsQ0FBQztZQUN0QixvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsbUJBQW1CLEVBQUUsQ0FBQztZQUN0QixnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLG1CQUFtQixFQUFFLENBQUM7U0FDdkIsQ0FBQztLQUNIO0lBQ0QsMEJBQTBCLEVBQUUsQ0FBQztJQUM3QixPQUFPLDBCQUEwQixDQUFDO0NBQ25DLENBQUMsQ0FBQyxPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJO0lBQzVFLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsQ0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgY29uc3QgbmdEZXZNb2RlOiBudWxsfE5nRGV2TW9kZVBlcmZDb3VudGVycztcbiAgaW50ZXJmYWNlIE5nRGV2TW9kZVBlcmZDb3VudGVycyB7XG4gICAgZmlyc3RUZW1wbGF0ZVBhc3M6IG51bWJlcjtcbiAgICB0Tm9kZTogbnVtYmVyO1xuICAgIHRWaWV3OiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVUZXh0Tm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0VGV4dDogbnVtYmVyO1xuICAgIHJlbmRlcmVyQ3JlYXRlRWxlbWVudDogbnVtYmVyO1xuICAgIHJlbmRlcmVyQWRkRXZlbnRMaXN0ZW5lcjogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0QXR0cmlidXRlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVBdHRyaWJ1dGU6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFByb3BlcnR5OiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRDbGFzc05hbWU6IG51bWJlcjtcbiAgICByZW5kZXJlckFkZENsYXNzOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVDbGFzczogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0U3R5bGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZVN0eWxlOiBudW1iZXI7XG4gIH1cbn1cblxuXG5cbmRlY2xhcmUgbGV0IGdsb2JhbDogYW55O1xuZXhwb3J0IGNvbnN0IG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzOiAoKSA9PiB2b2lkID1cbiAgICAodHlwZW9mIG5nRGV2TW9kZSA9PSAndW5kZWZpbmVkJyAmJiAoZnVuY3Rpb24oZ2xvYmFsOiB7bmdEZXZNb2RlOiBOZ0Rldk1vZGVQZXJmQ291bnRlcnN9KSB7XG4gICAgICAgZnVuY3Rpb24gbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMoKSB7XG4gICAgICAgICBnbG9iYWxbJ25nRGV2TW9kZSddID0ge1xuICAgICAgICAgICBmaXJzdFRlbXBsYXRlUGFzczogMCxcbiAgICAgICAgICAgdE5vZGU6IDAsXG4gICAgICAgICAgIHRWaWV3OiAwLFxuICAgICAgICAgICByZW5kZXJlckNyZWF0ZVRleHROb2RlOiAwLFxuICAgICAgICAgICByZW5kZXJlclNldFRleHQ6IDAsXG4gICAgICAgICAgIHJlbmRlcmVyQ3JlYXRlRWxlbWVudDogMCxcbiAgICAgICAgICAgcmVuZGVyZXJBZGRFdmVudExpc3RlbmVyOiAwLFxuICAgICAgICAgICByZW5kZXJlclNldEF0dHJpYnV0ZTogMCxcbiAgICAgICAgICAgcmVuZGVyZXJSZW1vdmVBdHRyaWJ1dGU6IDAsXG4gICAgICAgICAgIHJlbmRlcmVyU2V0UHJvcGVydHk6IDAsXG4gICAgICAgICAgIHJlbmRlcmVyU2V0Q2xhc3NOYW1lOiAwLFxuICAgICAgICAgICByZW5kZXJlckFkZENsYXNzOiAwLFxuICAgICAgICAgICByZW5kZXJlclJlbW92ZUNsYXNzOiAwLFxuICAgICAgICAgICByZW5kZXJlclNldFN0eWxlOiAwLFxuICAgICAgICAgICByZW5kZXJlclJlbW92ZVN0eWxlOiAwLFxuICAgICAgICAgfTtcbiAgICAgICB9XG4gICAgICAgbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMoKTtcbiAgICAgICByZXR1cm4gbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnM7XG4gICAgIH0pKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93IHx8IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYgfHxcbiAgICAgICAgdHlwZW9mIGdsb2JhbCAhPSAndW5kZWZpbmVkJyAmJiBnbG9iYWwpKSBhcygpID0+IHZvaWQ7XG4iXX0=