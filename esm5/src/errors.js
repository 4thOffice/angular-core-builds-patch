/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ERROR_DEBUG_CONTEXT, ERROR_LOGGER, ERROR_ORIGINAL_ERROR, ERROR_TYPE } from './util/errors';
export function getType(error) {
    return error[ERROR_TYPE];
}
export function getDebugContext(error) {
    return error[ERROR_DEBUG_CONTEXT];
}
export function getOriginalError(error) {
    return error[ERROR_ORIGINAL_ERROR];
}
export function getErrorLogger(error) {
    return error[ERROR_LOGGER] || defaultErrorLogger;
}
function defaultErrorLogger(console) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    console.error.apply(console, tslib_1.__spread(values));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdsRyxNQUFNLFVBQVUsT0FBTyxDQUFDLEtBQVk7SUFDbEMsT0FBUSxLQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBWTtJQUMxQyxPQUFRLEtBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBWTtJQUMzQyxPQUFRLEtBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQVk7SUFDekMsT0FBUSxLQUFhLENBQUMsWUFBWSxDQUFDLElBQUksa0JBQWtCLENBQUM7QUFDNUQsQ0FBQztBQUdELFNBQVMsa0JBQWtCLENBQUMsT0FBZ0I7SUFBRSxnQkFBZ0I7U0FBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1FBQWhCLCtCQUFnQjs7SUFDdEQsT0FBTyxDQUFDLEtBQUssT0FBYixPQUFPLG1CQUFXLE1BQU0sR0FBRTtBQUNsQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0VSUk9SX0RFQlVHX0NPTlRFWFQsIEVSUk9SX0xPR0dFUiwgRVJST1JfT1JJR0lOQUxfRVJST1IsIEVSUk9SX1RZUEV9IGZyb20gJy4vdXRpbC9lcnJvcnMnO1xuaW1wb3J0IHtEZWJ1Z0NvbnRleHR9IGZyb20gJy4vdmlldyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlKGVycm9yOiBFcnJvcik6IEZ1bmN0aW9uIHtcbiAgcmV0dXJuIChlcnJvciBhcyBhbnkpW0VSUk9SX1RZUEVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVidWdDb250ZXh0KGVycm9yOiBFcnJvcik6IERlYnVnQ29udGV4dCB7XG4gIHJldHVybiAoZXJyb3IgYXMgYW55KVtFUlJPUl9ERUJVR19DT05URVhUXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yaWdpbmFsRXJyb3IoZXJyb3I6IEVycm9yKTogRXJyb3Ige1xuICByZXR1cm4gKGVycm9yIGFzIGFueSlbRVJST1JfT1JJR0lOQUxfRVJST1JdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3JMb2dnZXIoZXJyb3I6IEVycm9yKTogKGNvbnNvbGU6IENvbnNvbGUsIC4uLnZhbHVlczogYW55W10pID0+IHZvaWQge1xuICByZXR1cm4gKGVycm9yIGFzIGFueSlbRVJST1JfTE9HR0VSXSB8fCBkZWZhdWx0RXJyb3JMb2dnZXI7XG59XG5cblxuZnVuY3Rpb24gZGVmYXVsdEVycm9yTG9nZ2VyKGNvbnNvbGU6IENvbnNvbGUsIC4uLnZhbHVlczogYW55W10pIHtcbiAgKDxhbnk+Y29uc29sZS5lcnJvcikoLi4udmFsdWVzKTtcbn0iXX0=