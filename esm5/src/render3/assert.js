/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// The functions in this file verify that the assumptions we are making
// about state in an instruction are correct before implementing any logic.
// They are meant only to be called in dev mode as sanity checks.
export function assertNumber(actual, msg) {
    if (typeof actual != 'number') {
        throwError(msg);
    }
}
export function assertEqual(actual, expected, msg) {
    if (actual != expected) {
        throwError(msg);
    }
}
export function assertNotEqual(actual, expected, msg) {
    if (actual == expected) {
        throwError(msg);
    }
}
export function assertSame(actual, expected, msg) {
    if (actual !== expected) {
        throwError(msg);
    }
}
export function assertLessThan(actual, expected, msg) {
    if (actual >= expected) {
        throwError(msg);
    }
}
export function assertGreaterThan(actual, expected, msg) {
    if (actual <= expected) {
        throwError(msg);
    }
}
export function assertNotDefined(actual, msg) {
    if (actual != null) {
        throwError(msg);
    }
}
export function assertDefined(actual, msg) {
    if (actual == null) {
        throwError(msg);
    }
}
export function assertComponentType(actual, msg) {
    if (msg === void 0) { msg = 'Type passed in is not ComponentType, it does not have \'ngComponentDef\' property.'; }
    if (!actual.ngComponentDef) {
        throwError(msg);
    }
}
function throwError(msg) {
    debugger; // Left intentionally for better debugger experience.
    throw new Error("ASSERTION ERROR: " + msg);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsdUVBQXVFO0FBQ3ZFLDJFQUEyRTtBQUMzRSxpRUFBaUU7QUFFakUsTUFBTSx1QkFBdUIsTUFBVyxFQUFFLEdBQVc7SUFDbkQsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5QixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLHNCQUF5QixNQUFTLEVBQUUsUUFBVyxFQUFFLEdBQVc7SUFDaEUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSx5QkFBNEIsTUFBUyxFQUFFLFFBQVcsRUFBRSxHQUFXO0lBQ25FLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0scUJBQXdCLE1BQVMsRUFBRSxRQUFXLEVBQUUsR0FBVztJQUMvRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN4QixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLHlCQUE0QixNQUFTLEVBQUUsUUFBVyxFQUFFLEdBQVc7SUFDbkUsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7QUFDSCxDQUFDO0FBRUQsTUFBTSw0QkFBK0IsTUFBUyxFQUFFLFFBQVcsRUFBRSxHQUFXO0lBQ3RFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sMkJBQThCLE1BQVMsRUFBRSxHQUFXO0lBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25CLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sd0JBQTJCLE1BQVMsRUFBRSxHQUFXO0lBQ3JELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25CLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sOEJBQ0YsTUFBVyxFQUNYLEdBQ3dGO0lBRHhGLG9CQUFBLEVBQUEsMEZBQ3dGO0lBQzFGLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7QUFDSCxDQUFDO0FBRUQsb0JBQW9CLEdBQVc7SUFDN0IsUUFBUSxDQUFDLENBQUUscURBQXFEO0lBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQW9CLEdBQUssQ0FBQyxDQUFDO0FBQzdDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRoZSBmdW5jdGlvbnMgaW4gdGhpcyBmaWxlIHZlcmlmeSB0aGF0IHRoZSBhc3N1bXB0aW9ucyB3ZSBhcmUgbWFraW5nXG4vLyBhYm91dCBzdGF0ZSBpbiBhbiBpbnN0cnVjdGlvbiBhcmUgY29ycmVjdCBiZWZvcmUgaW1wbGVtZW50aW5nIGFueSBsb2dpYy5cbi8vIFRoZXkgYXJlIG1lYW50IG9ubHkgdG8gYmUgY2FsbGVkIGluIGRldiBtb2RlIGFzIHNhbml0eSBjaGVja3MuXG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROdW1iZXIoYWN0dWFsOiBhbnksIG1zZzogc3RyaW5nKSB7XG4gIGlmICh0eXBlb2YgYWN0dWFsICE9ICdudW1iZXInKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRFcXVhbDxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3RFcXVhbDxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRTYW1lPFQ+KGFjdHVhbDogVCwgZXhwZWN0ZWQ6IFQsIG1zZzogc3RyaW5nKSB7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRMZXNzVGhhbjxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsID49IGV4cGVjdGVkKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRHcmVhdGVyVGhhbjxUPihhY3R1YWw6IFQsIGV4cGVjdGVkOiBULCBtc2c6IHN0cmluZykge1xuICBpZiAoYWN0dWFsIDw9IGV4cGVjdGVkKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb3REZWZpbmVkPFQ+KGFjdHVhbDogVCwgbXNnOiBzdHJpbmcpIHtcbiAgaWYgKGFjdHVhbCAhPSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnREZWZpbmVkPFQ+KGFjdHVhbDogVCwgbXNnOiBzdHJpbmcpIHtcbiAgaWYgKGFjdHVhbCA9PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRDb21wb25lbnRUeXBlKFxuICAgIGFjdHVhbDogYW55LFxuICAgIG1zZzogc3RyaW5nID1cbiAgICAgICAgJ1R5cGUgcGFzc2VkIGluIGlzIG5vdCBDb21wb25lbnRUeXBlLCBpdCBkb2VzIG5vdCBoYXZlIFxcJ25nQ29tcG9uZW50RGVmXFwnIHByb3BlcnR5LicpIHtcbiAgaWYgKCFhY3R1YWwubmdDb21wb25lbnREZWYpIHtcbiAgICB0aHJvd0Vycm9yKG1zZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGhyb3dFcnJvcihtc2c6IHN0cmluZyk6IG5ldmVyIHtcbiAgZGVidWdnZXI7ICAvLyBMZWZ0IGludGVudGlvbmFsbHkgZm9yIGJldHRlciBkZWJ1Z2dlciBleHBlcmllbmNlLlxuICB0aHJvdyBuZXcgRXJyb3IoYEFTU0VSVElPTiBFUlJPUjogJHttc2d9YCk7XG59Il19