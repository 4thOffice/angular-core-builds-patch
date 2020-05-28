/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../../util/global';
/**
 * Used for stringify render output in Ivy.
 * Important! This function is very performance-sensitive and we should
 * be extra careful not to introduce megamorphic reads in it.
 */
export function renderStringify(value) {
    if (typeof value === 'string')
        return value;
    if (value == null)
        return '';
    return '' + value;
}
/**
 * Used to stringify a value so that it can be displayed in an error message.
 * Important! This function contains a megamorphic read and should only be
 * used for error messages.
 */
export function stringifyForError(value) {
    if (typeof value === 'function')
        return value.name || value.toString();
    if (typeof value === 'object' && value != null && typeof value.type === 'function') {
        return value.type.name || value.type.toString();
    }
    return renderStringify(value);
}
const ɵ0 = () => (typeof requestAnimationFrame !== 'undefined' &&
    requestAnimationFrame || // browser only
    setTimeout // everything else
)
    .bind(global);
export const defaultScheduler = (ɵ0)();
/**
 *
 * @codeGenApi
 */
export function ɵɵresolveWindow(element) {
    return { name: 'window', target: element.ownerDocument.defaultView };
}
/**
 *
 * @codeGenApi
 */
export function ɵɵresolveDocument(element) {
    return { name: 'document', target: element.ownerDocument };
}
/**
 *
 * @codeGenApi
 */
export function ɵɵresolveBody(element) {
    return { name: 'body', target: element.ownerDocument.body };
}
/**
 * The special delimiter we use to separate property names, prefixes, and suffixes
 * in property binding metadata. See storeBindingMetadata().
 *
 * We intentionally use the Unicode "REPLACEMENT CHARACTER" (U+FFFD) as a delimiter
 * because it is a very uncommon character that is unlikely to be part of a user's
 * property names or interpolation strings. If it is in fact used in a property
 * binding, DebugElement.properties will not return the correct value for that
 * binding. However, there should be no runtime effect for real applications.
 *
 * This character is typically rendered as a question mark inside of a diamond.
 * See https://en.wikipedia.org/wiki/Specials_(Unicode_block)
 *
 */
export const INTERPOLATION_DELIMITER = `�`;
/**
 * Unwrap a value which might be behind a closure (for forward declaration reasons).
 */
export function maybeUnwrapFn(value) {
    if (value instanceof Function) {
        return value();
    }
    else {
        return value;
    }
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzY191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC9taXNjX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUd6Qzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxLQUFVO0lBQ3hDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLElBQUksS0FBSyxJQUFJLElBQUk7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM3QixPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFDcEIsQ0FBQztBQUdEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBVTtJQUMxQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZFLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtRQUNsRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakQ7SUFFRCxPQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDO1dBSUksR0FBRyxFQUFFLENBQUMsQ0FDSSxPQUFPLHFCQUFxQixLQUFLLFdBQVc7SUFDeEMscUJBQXFCLElBQUssZUFBZTtJQUM3QyxVQUFVLENBQW9CLGtCQUFrQjtDQUMvQztLQUNBLElBQUksQ0FBQyxNQUFNLENBQUM7QUFONUIsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQ3pCLElBS3lCLEVBQUUsQ0FBQztBQUVoQzs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLE9BQTJDO0lBQ3pFLE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsT0FBMkM7SUFDM0UsT0FBTyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUEyQztJQUN2RSxPQUFPLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQUUzQzs7R0FFRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUksS0FBa0I7SUFDakQsSUFBSSxLQUFLLFlBQVksUUFBUSxFQUFFO1FBQzdCLE9BQU8sS0FBSyxFQUFFLENBQUM7S0FDaEI7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi8uLi91dGlsL2dsb2JhbCc7XG5pbXBvcnQge1JFbGVtZW50fSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbmRlcmVyJztcblxuLyoqXG4gKiBVc2VkIGZvciBzdHJpbmdpZnkgcmVuZGVyIG91dHB1dCBpbiBJdnkuXG4gKiBJbXBvcnRhbnQhIFRoaXMgZnVuY3Rpb24gaXMgdmVyeSBwZXJmb3JtYW5jZS1zZW5zaXRpdmUgYW5kIHdlIHNob3VsZFxuICogYmUgZXh0cmEgY2FyZWZ1bCBub3QgdG8gaW50cm9kdWNlIG1lZ2Ftb3JwaGljIHJlYWRzIGluIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3RyaW5naWZ5KHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgcmV0dXJuIHZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuICcnO1xuICByZXR1cm4gJycgKyB2YWx1ZTtcbn1cblxuXG4vKipcbiAqIFVzZWQgdG8gc3RyaW5naWZ5IGEgdmFsdWUgc28gdGhhdCBpdCBjYW4gYmUgZGlzcGxheWVkIGluIGFuIGVycm9yIG1lc3NhZ2UuXG4gKiBJbXBvcnRhbnQhIFRoaXMgZnVuY3Rpb24gY29udGFpbnMgYSBtZWdhbW9ycGhpYyByZWFkIGFuZCBzaG91bGQgb25seSBiZVxuICogdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnlGb3JFcnJvcih2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlLm5hbWUgfHwgdmFsdWUudG9TdHJpbmcoKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZS50eXBlLm5hbWUgfHwgdmFsdWUudHlwZS50b1N0cmluZygpO1xuICB9XG5cbiAgcmV0dXJuIHJlbmRlclN0cmluZ2lmeSh2YWx1ZSk7XG59XG5cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTY2hlZHVsZXIgPVxuICAgICgoKSA9PiAoXG4gICAgICAgICAgICAgICB0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAgLy8gYnJvd3NlciBvbmx5XG4gICAgICAgICAgICAgICBzZXRUaW1lb3V0ICAgICAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgIC5iaW5kKGdsb2JhbCkpKCk7XG5cbi8qKlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cmVzb2x2ZVdpbmRvdyhlbGVtZW50OiBSRWxlbWVudCZ7b3duZXJEb2N1bWVudDogRG9jdW1lbnR9KSB7XG4gIHJldHVybiB7bmFtZTogJ3dpbmRvdycsIHRhcmdldDogZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3fTtcbn1cblxuLyoqXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVyZXNvbHZlRG9jdW1lbnQoZWxlbWVudDogUkVsZW1lbnQme293bmVyRG9jdW1lbnQ6IERvY3VtZW50fSkge1xuICByZXR1cm4ge25hbWU6ICdkb2N1bWVudCcsIHRhcmdldDogZWxlbWVudC5vd25lckRvY3VtZW50fTtcbn1cblxuLyoqXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVyZXNvbHZlQm9keShlbGVtZW50OiBSRWxlbWVudCZ7b3duZXJEb2N1bWVudDogRG9jdW1lbnR9KSB7XG4gIHJldHVybiB7bmFtZTogJ2JvZHknLCB0YXJnZXQ6IGVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5fTtcbn1cblxuLyoqXG4gKiBUaGUgc3BlY2lhbCBkZWxpbWl0ZXIgd2UgdXNlIHRvIHNlcGFyYXRlIHByb3BlcnR5IG5hbWVzLCBwcmVmaXhlcywgYW5kIHN1ZmZpeGVzXG4gKiBpbiBwcm9wZXJ0eSBiaW5kaW5nIG1ldGFkYXRhLiBTZWUgc3RvcmVCaW5kaW5nTWV0YWRhdGEoKS5cbiAqXG4gKiBXZSBpbnRlbnRpb25hbGx5IHVzZSB0aGUgVW5pY29kZSBcIlJFUExBQ0VNRU5UIENIQVJBQ1RFUlwiIChVK0ZGRkQpIGFzIGEgZGVsaW1pdGVyXG4gKiBiZWNhdXNlIGl0IGlzIGEgdmVyeSB1bmNvbW1vbiBjaGFyYWN0ZXIgdGhhdCBpcyB1bmxpa2VseSB0byBiZSBwYXJ0IG9mIGEgdXNlcidzXG4gKiBwcm9wZXJ0eSBuYW1lcyBvciBpbnRlcnBvbGF0aW9uIHN0cmluZ3MuIElmIGl0IGlzIGluIGZhY3QgdXNlZCBpbiBhIHByb3BlcnR5XG4gKiBiaW5kaW5nLCBEZWJ1Z0VsZW1lbnQucHJvcGVydGllcyB3aWxsIG5vdCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgZm9yIHRoYXRcbiAqIGJpbmRpbmcuIEhvd2V2ZXIsIHRoZXJlIHNob3VsZCBiZSBubyBydW50aW1lIGVmZmVjdCBmb3IgcmVhbCBhcHBsaWNhdGlvbnMuXG4gKlxuICogVGhpcyBjaGFyYWN0ZXIgaXMgdHlwaWNhbGx5IHJlbmRlcmVkIGFzIGEgcXVlc3Rpb24gbWFyayBpbnNpZGUgb2YgYSBkaWFtb25kLlxuICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NwZWNpYWxzXyhVbmljb2RlX2Jsb2NrKVxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IElOVEVSUE9MQVRJT05fREVMSU1JVEVSID0gYO+/vWA7XG5cbi8qKlxuICogVW53cmFwIGEgdmFsdWUgd2hpY2ggbWlnaHQgYmUgYmVoaW5kIGEgY2xvc3VyZSAoZm9yIGZvcndhcmQgZGVjbGFyYXRpb24gcmVhc29ucykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXliZVVud3JhcEZuPFQ+KHZhbHVlOiBUfCgoKSA9PiBUKSk6IFQge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiB2YWx1ZSgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl19