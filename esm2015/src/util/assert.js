/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// The functions in this file verify that the assumptions we are making
// about state in an instruction are correct before implementing any logic.
// They are meant only to be called in dev mode as sanity checks.
import { stringify } from './stringify';
export function assertNumber(actual, msg) {
    if (!(typeof actual === 'number')) {
        throwError(msg, typeof actual, 'number', '===');
    }
}
export function assertNumberInRange(actual, minInclusive, maxInclusive) {
    assertNumber(actual, 'Expected a number');
    assertLessThanOrEqual(actual, maxInclusive, 'Expected number to be less than or equal to');
    assertGreaterThanOrEqual(actual, minInclusive, 'Expected number to be greater than or equal to');
}
export function assertString(actual, msg) {
    if (!(typeof actual === 'string')) {
        throwError(msg, actual === null ? 'null' : typeof actual, 'string', '===');
    }
}
export function assertEqual(actual, expected, msg) {
    if (!(actual == expected)) {
        throwError(msg, actual, expected, '==');
    }
}
export function assertNotEqual(actual, expected, msg) {
    if (!(actual != expected)) {
        throwError(msg, actual, expected, '!=');
    }
}
export function assertSame(actual, expected, msg) {
    if (!(actual === expected)) {
        throwError(msg, actual, expected, '===');
    }
}
export function assertNotSame(actual, expected, msg) {
    if (!(actual !== expected)) {
        throwError(msg, actual, expected, '!==');
    }
}
export function assertLessThan(actual, expected, msg) {
    if (!(actual < expected)) {
        throwError(msg, actual, expected, '<');
    }
}
export function assertLessThanOrEqual(actual, expected, msg) {
    if (!(actual <= expected)) {
        throwError(msg, actual, expected, '<=');
    }
}
export function assertGreaterThan(actual, expected, msg) {
    if (!(actual > expected)) {
        throwError(msg, actual, expected, '>');
    }
}
export function assertGreaterThanOrEqual(actual, expected, msg) {
    if (!(actual >= expected)) {
        throwError(msg, actual, expected, '>=');
    }
}
export function assertNotDefined(actual, msg) {
    if (actual != null) {
        throwError(msg, actual, null, '==');
    }
}
export function assertDefined(actual, msg) {
    if (actual == null) {
        throwError(msg, actual, null, '!=');
    }
}
export function throwError(msg, actual, expected, comparison) {
    throw new Error(`ASSERTION ERROR: ${msg}` +
        (comparison == null ? '' : ` [Expected=> ${expected} ${comparison} ${actual} <=Actual]`));
}
export function assertDomNode(node) {
    // If we're in a worker, `Node` will not be defined.
    assertEqual((typeof Node !== 'undefined' && node instanceof Node) ||
        (typeof node === 'object' && node != null &&
            node.constructor.name === 'WebWorkerRenderNode'), true, `The provided value must be an instance of a DOM Node but got ${stringify(node)}`);
}
export function assertDataInRange(arr, index) {
    const maxLen = arr ? arr.length : 0;
    assertLessThan(index, maxLen, `Index expected to be less than ${maxLen} but got ${index}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvdXRpbC9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsdUVBQXVFO0FBQ3ZFLDJFQUEyRTtBQUMzRSxpRUFBaUU7QUFFakUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV0QyxNQUFNLFVBQVUsWUFBWSxDQUFDLE1BQVcsRUFBRSxHQUFXO0lBQ25ELElBQUksQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFO1FBQ2pDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2pEO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsTUFBVyxFQUFFLFlBQW9CLEVBQUUsWUFBb0I7SUFDekQsWUFBWSxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQzFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsNkNBQTZDLENBQUMsQ0FBQztJQUMzRix3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLGdEQUFnRCxDQUFDLENBQUM7QUFDbkcsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBVyxFQUFFLEdBQVc7SUFDbkQsSUFBSSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLEVBQUU7UUFDakMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM1RTtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFJLE1BQVMsRUFBRSxRQUFXLEVBQUUsR0FBVztJ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QUFDLGdCQUFnQixRQUFRLElBQUksVUFBVSxJQUFJLE1BQU0sWUFBWSxDQUFDLENBQUMsQ0FBQztBQUNoRyxDQUFDO0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFTO0lBQ3JDLG9EQUFvRDtJQUNwRCxXQUFXLENBQ1AsQ0FBQyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxZQUFZLElBQUksQ0FBQztRQUNqRCxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxFQUNyRCxJQUFJLEVBQUUsZ0VBQWdFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0YsQ0FBQztBQUdELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxHQUFVLEVBQUUsS0FBYTtJQUN6RCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxrQ0FBa0MsTUFBTSxZQUFZLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDN0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUaGUgZnVuY3Rpb25zIGluIHRoaXMgZmlsZSB2ZXJpZnkgdGhhdCB0aGUgYXNzdW1wdGlvbnMgd2UgYXJlIG1ha2luZ1xuLy8gYWJvdXQgc3RhdGUgaW4gYW4gaW5zdHJ1Y3Rpb24gYXJlIGNvcnJlY3QgYmVmb3JlIGltcGxlbWVudGluZyBhbnkgbG9naWMuXG4vLyBUaGV5IGFyZSBtZWFudCBvbmx5IHRvIGJlIGNhbGxlZCBpbiBkZXYgbW9kZSBhcyBzYW5pdHkgY2hlY2tzLlxuXG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi9zdHJpbmdpZnknO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TnVtYmVyKGFjdHVhbDogYW55LCBtc2c6IHN0cmluZyk6IGFzc2VydHMgYWN0dWFsIGlzIG51bWJlciB7XG4gIGlmICghKHR5cGVvZiBhY3R1YWwgPT09ICdudW1iZXInKSkge1xuICAgIHRocm93RXJyb3IobXNnLCB0eXBlb2YgYWN0dWFsLCAnbnVtYmVyJywgJz09PScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROdW1iZXJJblJhbmdlKFxuICAgIGFjdHVhbDogYW55LCBtaW5JbmNsdXNpdmU6IG51bWJlciwgbWF4SW5jbHVzaXZlOiBudW1iZXIpOiBhc3NlcnRzIGFjdHVhbCBpcyBudW1iZXIge1xuICBhc3NlcnROdW1iZXIoYWN0dWFsLCAnRXhwZWN0ZWQgYSBudW1iZXInKTtcbiAgYXNzZXJ0TGVzc1RoYW5PckVxdWFsKGFjdHVhbCwgbWF4SW5jbHVzaXZlLCAnRXhwZWN0ZWQgbnVtYmVyIHRvIGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0bycpO1xuICBhc3NlcnRHcmVhdGVyVGhhbk9yRXF1YWwoYWN0dWFsLCBtaW5JbmNsdXNpdmUsICdFeHBlY3RlZCBudW1iZXIgdG8gYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTdHJpbmcoYWN0dWFsOiBhbnksIG1zZzogc3RyaW5nKTogYXNzZXJ0cyBhY3R1YWwgaXMgc3RyaW5nIHtcbiAgaWYgKCEodHlwZW9mIGFjdHVhbCA9PT0gJ3N0cmluZycpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBhY3R1YWwsICdzdHJpbmcnLCAnPT09Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEVxdWFsPFQ+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKSB7XG4gIGlmICghKGFjdHVhbCA9PSBleHBlY3RlZCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBleHBlY3RlZCwgJz09Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vdEVxdWFsPFQ+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKTogYXNzZXJ0cyBhY3R1YWwgaXMgVCB7XG4gIGlmICghKGFjdHVhbCAhPSBleHBlY3RlZCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBleHBlY3RlZCwgJyE9Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFNhbWU8VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpOiBhc3NlcnRzIGFjdHVhbCBpcyBUIHtcbiAgaWYgKCEoYWN0dWFsID09PSBleHBlY3RlZCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBleHBlY3RlZCwgJz09PScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3RTYW1lPFQ+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKSB7XG4gIGlmICghKGFjdHVhbCAhPT0gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICchPT0nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TGVzc1RoYW48VD4oYWN0dWFsOiBULCBleHBlY3RlZDogVCwgbXNnOiBzdHJpbmcpOiBhc3NlcnRzIGFjdHVhbCBpcyBUIHtcbiAgaWYgKCEoYWN0dWFsIDwgZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICc8Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExlc3NUaGFuT3JFcXVhbDxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZyk6IGFzc2VydHMgYWN0dWFsIGlzIFQge1xuICBpZiAoIShhY3R1YWwgPD0gZXhwZWN0ZWQpKSB7XG4gICAgdGhyb3dFcnJvcihtc2csIGFjdHVhbCwgZXhwZWN0ZWQsICc8PScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRHcmVhdGVyVGhhbjxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZyk6IGFzc2VydHMgYWN0dWFsIGlzIFQge1xuICBpZiAoIShhY3R1YWwgPiBleHBlY3RlZCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBleHBlY3RlZCwgJz4nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0R3JlYXRlclRoYW5PckVxdWFsPFQ+KFxuICAgIGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKTogYXNzZXJ0cyBhY3R1YWwgaXMgVCB7XG4gIGlmICghKGFjdHVhbCA+PSBleHBlY3RlZCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBleHBlY3RlZCwgJz49Jyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vdERlZmluZWQ8VD4oYWN0dWFsOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsICE9IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKG1zZywgYWN0dWFsLCBudWxsLCAnPT0nKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZDxUPihhY3R1YWw6IFR8bnVsbHx1bmRlZmluZWQsIG1zZzogc3RyaW5nKTogYXNzZXJ0cyBhY3R1YWwgaXMgVCB7XG4gIGlmIChhY3R1YWwgPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3IobXNnLCBhY3R1YWwsIG51bGwsICchPScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0Vycm9yKG1zZzogc3RyaW5nKTogbmV2ZXI7XG5leHBvcnQgZnVuY3Rpb24gdGhyb3dFcnJvcihtc2c6IHN0cmluZywgYWN0dWFsOiBhbnksIGV4cGVjdGVkOiBhbnksIGNvbXBhcmlzb246IHN0cmluZyk6IG5ldmVyO1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3IobXNnOiBzdHJpbmcsIGFjdHVhbD86IGFueSwgZXhwZWN0ZWQ/OiBhbnksIGNvbXBhcmlzb24/OiBzdHJpbmcpOiBuZXZlciB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBBU1NFUlRJT04gRVJST1I6ICR7bXNnfWAgK1xuICAgICAgKGNvbXBhcmlzb24gPT0gbnVsbCA/ICcnIDogYCBbRXhwZWN0ZWQ9PiAke2V4cGVjdGVkfSAke2NvbXBhcmlzb259ICR7YWN0dWFsfSA8PUFjdHVhbF1gKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnREb21Ob2RlKG5vZGU6IGFueSk6IGFzc2VydHMgbm9kZSBpcyBOb2RlIHtcbiAgLy8gSWYgd2UncmUgaW4gYSB3b3JrZXIsIGBOb2RlYCB3aWxsIG5vdCBiZSBkZWZpbmVkLlxuICBhc3NlcnRFcXVhbChcbiAgICAgICh0eXBlb2YgTm9kZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbm9kZSBpbnN0YW5jZW9mIE5vZGUpIHx8XG4gICAgICAgICAgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiBub2RlICE9IG51bGwgJiZcbiAgICAgICAgICAgbm9kZS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnV2ViV29ya2VyUmVuZGVyTm9kZScpLFxuICAgICAgdHJ1ZSwgYFRoZSBwcm92aWRlZCB2YWx1ZSBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIGEgRE9NIE5vZGUgYnV0IGdvdCAke3N0cmluZ2lmeShub2RlKX1gKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RGF0YUluUmFuZ2UoYXJyOiBhbnlbXSwgaW5kZXg6IG51bWJlcikge1xuICBjb25zdCBtYXhMZW4gPSBhcnIgPyBhcnIubGVuZ3RoIDogMDtcbiAgYXNzZXJ0TGVzc1RoYW4oaW5kZXgsIG1heExlbiwgYEluZGV4IGV4cGVjdGVkIHRvIGJlIGxlc3MgdGhhbiAke21heExlbn0gYnV0IGdvdCAke2luZGV4fWApO1xufVxuIl19