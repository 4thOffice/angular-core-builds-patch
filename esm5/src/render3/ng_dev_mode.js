/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __global = typeof window != 'undefined' && window || typeof self != 'undefined' && self ||
    typeof global != 'undefined' && global;
export function ngDevModeResetPerfCounters() {
    return __global.ngDevMode = {
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
    __global.ngDevMode = ngDevModeResetPerfCounters();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWlDSCxJQUFNLFFBQVEsR0FDVixPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJO0lBQzVFLE9BQU8sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUM7QUFFM0MsTUFBTTtJQUNKLE9BQU8sUUFBUSxDQUFDLFNBQVMsR0FBRztRQUMxQixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLEtBQUssRUFBRSxDQUFDO1FBQ1IsS0FBSyxFQUFFLENBQUM7UUFDUixzQkFBc0IsRUFBRSxDQUFDO1FBQ3pCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLHFCQUFxQixFQUFFLENBQUM7UUFDeEIsd0JBQXdCLEVBQUUsQ0FBQztRQUMzQixvQkFBb0IsRUFBRSxDQUFDO1FBQ3ZCLHVCQUF1QixFQUFFLENBQUM7UUFDMUIsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixvQkFBb0IsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZUFBZSxFQUFFLENBQUM7UUFDbEIsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLGtCQUFrQixFQUFFLENBQUM7UUFDckIscUJBQXFCLEVBQUUsQ0FBQztLQUN6QixDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7SUFDakQsUUFBUSxDQUFDLFNBQVMsR0FBRywwQkFBMEIsRUFBRSxDQUFDO0NBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgY29uc3QgbmdEZXZNb2RlOiBudWxsfE5nRGV2TW9kZVBlcmZDb3VudGVycztcbiAgaW50ZXJmYWNlIE5nRGV2TW9kZVBlcmZDb3VudGVycyB7XG4gICAgZmlyc3RUZW1wbGF0ZVBhc3M6IG51bWJlcjtcbiAgICB0Tm9kZTogbnVtYmVyO1xuICAgIHRWaWV3OiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVUZXh0Tm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0VGV4dDogbnVtYmVyO1xuICAgIHJlbmRlcmVyQ3JlYXRlRWxlbWVudDogbnVtYmVyO1xuICAgIHJlbmRlcmVyQWRkRXZlbnRMaXN0ZW5lcjogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0QXR0cmlidXRlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVBdHRyaWJ1dGU6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFByb3BlcnR5OiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRDbGFzc05hbWU6IG51bWJlcjtcbiAgICByZW5kZXJlckFkZENsYXNzOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVDbGFzczogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0U3R5bGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZVN0eWxlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJEZXN0cm95OiBudW1iZXI7XG4gICAgcmVuZGVyZXJEZXN0cm95Tm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyTW92ZU5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZU5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlckNyZWF0ZUNvbW1lbnQ6IG51bWJlcjtcbiAgfVxufVxuXG5cblxuZGVjbGFyZSBsZXQgZ2xvYmFsOiBhbnk7XG5cbmNvbnN0IF9fZ2xvYmFsOiB7bmdEZXZNb2RlOiBOZ0Rldk1vZGVQZXJmQ291bnRlcnMgfCBib29sZWFufSA9XG4gICAgdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cgfHwgdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZiB8fFxuICAgIHR5cGVvZiBnbG9iYWwgIT0gJ3VuZGVmaW5lZCcgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZnVuY3Rpb24gbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMoKTogTmdEZXZNb2RlUGVyZkNvdW50ZXJzIHtcbiAgcmV0dXJuIF9fZ2xvYmFsLm5nRGV2TW9kZSA9IHtcbiAgICBmaXJzdFRlbXBsYXRlUGFzczogMCxcbiAgICB0Tm9kZTogMCxcbiAgICB0VmlldzogMCxcbiAgICByZW5kZXJlckNyZWF0ZVRleHROb2RlOiAwLFxuICAgIHJlbmRlcmVyU2V0VGV4dDogMCxcbiAgICByZW5kZXJlckNyZWF0ZUVsZW1lbnQ6IDAsXG4gICAgcmVuZGVyZXJBZGRFdmVudExpc3RlbmVyOiAwLFxuICAgIHJlbmRlcmVyU2V0QXR0cmlidXRlOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlQXR0cmlidXRlOiAwLFxuICAgIHJlbmRlcmVyU2V0UHJvcGVydHk6IDAsXG4gICAgcmVuZGVyZXJTZXRDbGFzc05hbWU6IDAsXG4gICAgcmVuZGVyZXJBZGRDbGFzczogMCxcbiAgICByZW5kZXJlclJlbW92ZUNsYXNzOiAwLFxuICAgIHJlbmRlcmVyU2V0U3R5bGU6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVTdHlsZTogMCxcbiAgICByZW5kZXJlckRlc3Ryb3k6IDAsXG4gICAgcmVuZGVyZXJEZXN0cm95Tm9kZTogMCxcbiAgICByZW5kZXJlck1vdmVOb2RlOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlTm9kZTogMCxcbiAgICByZW5kZXJlckNyZWF0ZUNvbW1lbnQ6IDAsXG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBjaGVja3MgdG8gc2VlIGlmIHRoZSBgbmdEZXZNb2RlYCBoYXMgYmVlbiBzZXQuIElmIHllcyxcbiAqIHRoYW4gd2UgaG9ub3IgaXQsIG90aGVyd2lzZSB3ZSBkZWZhdWx0IHRvIGRldiBtb2RlIHdpdGggYWRkaXRpb25hbCBjaGVja3MuXG4gKlxuICogVGhlIGlkZWEgaXMgdGhhdCB1bmxlc3Mgd2UgYXJlIGRvaW5nIHByb2R1Y3Rpb24gYnVpbGQgd2hlcmUgd2UgZXhwbGljaXRseVxuICogc2V0IGBuZ0Rldk1vZGUgPT0gZmFsc2VgIHdlIHNob3VsZCBiZSBoZWxwaW5nIHRoZSBkZXZlbG9wZXIgYnkgcHJvdmlkaW5nXG4gKiBhcyBtdWNoIGVhcmx5IHdhcm5pbmcgYW5kIGVycm9ycyBhcyBwb3NzaWJsZS5cbiAqL1xuaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICBfX2dsb2JhbC5uZ0Rldk1vZGUgPSBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycygpO1xufVxuIl19