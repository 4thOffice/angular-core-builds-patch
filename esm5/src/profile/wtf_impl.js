/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../util';
var trace;
var events;
export function detectWTF() {
    var wtf = global /** TODO #9100 */['wtf'];
    if (wtf) {
        trace = wtf['trace'];
        if (trace) {
            events = trace['events'];
            return true;
        }
    }
    return false;
}
export function createScope(signature, flags) {
    if (flags === void 0) { flags = null; }
    return events.createScope(signature, flags);
}
export function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
}
export function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
}
export function endTimeRange(range) {
    trace.endTimeRange(range);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3RmX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9wcm9maWxlL3d0Zl9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxTQUFTLENBQUM7QUE0Qi9CLElBQUksS0FBWSxDQUFDO0FBQ2pCLElBQUksTUFBYyxDQUFDO0FBRW5CLE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLElBQU0sR0FBRyxHQUFTLE1BQWEsQ0FBQyxpQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxJQUFJLEdBQUcsRUFBRTtRQUNQLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsU0FBaUIsRUFBRSxLQUFpQjtJQUFqQixzQkFBQSxFQUFBLFlBQWlCO0lBQzlELE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUlELE1BQU0sVUFBVSxLQUFLLENBQUksS0FBWSxFQUFFLFdBQWlCO0lBQ3RELEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLFNBQWlCLEVBQUUsTUFBYztJQUM5RCxPQUFPLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQVk7SUFDdkMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vdXRpbCc7XG5cbi8qKlxuICogQSBzY29wZSBmdW5jdGlvbiBmb3IgdGhlIFdlYiBUcmFjaW5nIEZyYW1ld29yayAoV1RGKS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgV3RmU2NvcGVGbiB7IChhcmcwPzogYW55LCBhcmcxPzogYW55KTogYW55OyB9XG5cbmludGVyZmFjZSBXVEYge1xuICB0cmFjZTogVHJhY2U7XG59XG5cbmludGVyZmFjZSBUcmFjZSB7XG4gIGV2ZW50czogRXZlbnRzO1xuICBsZWF2ZVNjb3BlKHNjb3BlOiBTY29wZSwgcmV0dXJuVmFsdWU6IGFueSk6IGFueSAvKiogVE9ETyAjOTEwMCAqLztcbiAgYmVnaW5UaW1lUmFuZ2UocmFuZ2VUeXBlOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nKTogUmFuZ2U7XG4gIGVuZFRpbWVSYW5nZShyYW5nZTogUmFuZ2UpOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi87XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFuZ2Uge31cblxuaW50ZXJmYWNlIEV2ZW50cyB7XG4gIGNyZWF0ZVNjb3BlKHNpZ25hdHVyZTogc3RyaW5nLCBmbGFnczogYW55KTogU2NvcGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NvcGUgeyAoLi4uYXJnczogYW55W10gLyoqIFRPRE8gIzkxMDAgKi8pOiBhbnk7IH1cblxubGV0IHRyYWNlOiBUcmFjZTtcbmxldCBldmVudHM6IEV2ZW50cztcblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdFdURigpOiBib29sZWFuIHtcbiAgY29uc3Qgd3RmOiBXVEYgPSAoZ2xvYmFsIGFzIGFueSAvKiogVE9ETyAjOTEwMCAqLylbJ3d0ZiddO1xuICBpZiAod3RmKSB7XG4gICAgdHJhY2UgPSB3dGZbJ3RyYWNlJ107XG4gICAgaWYgKHRyYWNlKSB7XG4gICAgICBldmVudHMgPSB0cmFjZVsnZXZlbnRzJ107XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NvcGUoc2lnbmF0dXJlOiBzdHJpbmcsIGZsYWdzOiBhbnkgPSBudWxsKTogYW55IHtcbiAgcmV0dXJuIGV2ZW50cy5jcmVhdGVTY29wZShzaWduYXR1cmUsIGZsYWdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlPFQ+KHNjb3BlOiBTY29wZSk6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gbGVhdmU8VD4oc2NvcGU6IFNjb3BlLCByZXR1cm5WYWx1ZT86IFQpOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlPFQ+KHNjb3BlOiBTY29wZSwgcmV0dXJuVmFsdWU/OiBhbnkpOiBhbnkge1xuICB0cmFjZS5sZWF2ZVNjb3BlKHNjb3BlLCByZXR1cm5WYWx1ZSk7XG4gIHJldHVybiByZXR1cm5WYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0VGltZVJhbmdlKHJhbmdlVHlwZTogc3RyaW5nLCBhY3Rpb246IHN0cmluZyk6IFJhbmdlIHtcbiAgcmV0dXJuIHRyYWNlLmJlZ2luVGltZVJhbmdlKHJhbmdlVHlwZSwgYWN0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuZFRpbWVSYW5nZShyYW5nZTogUmFuZ2UpOiB2b2lkIHtcbiAgdHJhY2UuZW5kVGltZVJhbmdlKHJhbmdlKTtcbn1cbiJdfQ==