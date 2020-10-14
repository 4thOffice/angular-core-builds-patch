/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * A module to facilitate use of a Trusted Types policy internally within
 * Angular. It lazily constructs the Trusted Types policy, providing helper
 * utilities for promoting strings to Trusted Types. When Trusted Types are not
 * available, strings are used as a fallback.
 * @security All use of this module is security-sensitive and should go through
 * security review.
 */
import { global } from '../global';
/**
 * The Trusted Types policy, or null if Trusted Types are not
 * enabled/supported, or undefined if the policy has not been created yet.
 */
let policy;
/**
 * Returns the Trusted Types policy, or null if Trusted Types are not
 * enabled/supported. The first call to this function will create the policy.
 */
function getPolicy() {
    if (policy === undefined) {
        policy = null;
        if (global.trustedTypes) {
            try {
                policy = global.trustedTypes.createPolicy('angular', {
                    createHTML: (s) => s,
                    createScript: (s) => s,
                    createScriptURL: (s) => s,
                });
            }
            catch (_a) {
                // trustedTypes.createPolicy throws if called with a name that is
                // already registered, even in report-only mode. Until the API changes,
                // catch the error not to break the applications functionally. In such
                // cases, the code will fall back to using strings.
            }
        }
    }
    return policy;
}
/**
 * Unsafely promote a string to a TrustedHTML, falling back to strings when
 * Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will be interpreted as HTML by a browser, e.g. when assigning to
 * element.innerHTML.
 */
export function trustedHTMLFromString(html) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createHTML(html)) || html;
}
/**
 * Unsafely promote a string to a TrustedScript, falling back to strings when
 * Trusted Types are not available.
 * @security In particular, it must be assured that the provided string will
 * never cause an XSS vulnerability if used in a context that will be
 * interpreted and executed as a script by a browser, e.g. when calling eval.
 */
export function trustedScriptFromString(script) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createScript(script)) || script;
}
/**
 * Unsafely promote a string to a TrustedScriptURL, falling back to strings
 * when Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will cause a browser to load and execute a resource, e.g. when
 * assigning to script.src.
 */
export function trustedScriptURLFromString(url) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createScriptURL(url)) || url;
}
/**
 * Unsafely call the Function constructor with the given string arguments. It
 * is only available in development mode, and should be stripped out of
 * production code.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that it
 * is only called from development code, as use in production code can lead to
 * XSS vulnerabilities.
 */
export function newTrustedFunctionForDev(...args) {
    if (typeof ngDevMode === 'undefined') {
        throw new Error('newTrustedFunctionForDev should never be called in production');
    }
    if (!global.trustedTypes) {
        // In environments that don't support Trusted Types, fall back to the most
        // straightforward implementation:
        return new Function(...args);
    }
    // Chrome currently does not support passing TrustedScript to the Function
    // constructor. The following implements the workaround proposed on the page
    // below, where the Chromium bug is also referenced:
    // https://github.com/w3c/webappsec-trusted-types/wiki/Trusted-Types-for-function-constructor
    const fnArgs = args.slice(0, -1).join(',');
    const fnBody = args.pop().toString();
    const body = `(function anonymous(${fnArgs}
) { ${fnBody}
})`;
    // Using eval directly confuses the compiler and prevents this module from
    // being stripped out of JS binaries even if not used. The global['eval']
    // indirection fixes that.
    const fn = global['eval'](trustedScriptFromString(body));
    // To completely mimic the behavior of calling "new Function", two more
    // things need to happen:
    // 1. Stringifying the resulting function should return its source code
    fn.toString = () => body;
    // 2. When calling the resulting function, `this` should refer to `global`
    return fn.bind(global);
    // When Trusted Types support in Function constructors is widely available,
    // the implementation of this function can be simplified to:
    // return new Function(...args.map(a => trustedScriptFromString(a)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RlZF90eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3V0aWwvc2VjdXJpdHkvdHJ1c3RlZF90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7Ozs7Ozs7R0FRRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFakM7OztHQUdHO0FBQ0gsSUFBSSxNQUF3QyxDQUFDO0FBRTdDOzs7R0FHRztBQUNILFNBQVMsU0FBUztJQUNoQixJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJO2dCQUNGLE1BQU0sR0FBSSxNQUFNLENBQUMsWUFBeUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFO29CQUNqRixVQUFVLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzVCLFlBQVksRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsZUFBZSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQyxDQUFDLENBQUM7YUFDSjtZQUFDLFdBQU07Z0JBQ04saUVBQWlFO2dCQUNqRSx1RUFBdUU7Z0JBQ3ZFLHNFQUFzRTtnQkFDdEUsbURBQW1EO2FBQ3BEO1NBQ0Y7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUFZOztJQUNoRCxPQUFPLE9BQUEsU0FBUyxFQUFFLDBDQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQUssSUFBSSxDQUFDO0FBQy9DLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsTUFBYzs7SUFDcEQsT0FBTyxPQUFBLFNBQVMsRUFBRSwwQ0FBRSxZQUFZLENBQUMsTUFBTSxNQUFLLE1BQU0sQ0FBQztBQUNyRCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQUMsR0FBVzs7SUFDcEQsT0FBTyxPQUFBLFNBQVMsRUFBRSwwQ0FBRSxlQUFlLENBQUMsR0FBRyxNQUFLLEdBQUcsQ0FBQztBQUNsRCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsR0FBRyxJQUFjO0lBQ3hELElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxFQUFFO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztLQUNsRjtJQUNELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3hCLDBFQUEwRTtRQUMxRSxrQ0FBa0M7UUFDbEMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzlCO0lBRUQsMEVBQTBFO0lBQzFFLDRFQUE0RTtJQUM1RSxvREFBb0Q7SUFDcEQsNkZBQTZGO0lBQzdGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxNQUFNLElBQUksR0FBRyx1QkFBdUIsTUFBTTtNQUN0QyxNQUFNO0dBQ1QsQ0FBQztJQUVGLDBFQUEwRTtJQUMxRSx5RUFBeUU7SUFDekUsMEJBQTBCO0lBQzFCLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQVcsQ0FBYSxDQUFDO0lBRS9FLHVFQUF1RTtJQUN2RSx5QkFBeUI7SUFDekIsdUVBQXVFO0lBQ3ZFLEVBQUUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3pCLDBFQUEwRTtJQUMxRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdkIsMkVBQTJFO0lBQzNFLDREQUE0RDtJQUM1RCxxRUFBcUU7QUFDdkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEEgbW9kdWxlIHRvIGZhY2lsaXRhdGUgdXNlIG9mIGEgVHJ1c3RlZCBUeXBlcyBwb2xpY3kgaW50ZXJuYWxseSB3aXRoaW5cbiAqIEFuZ3VsYXIuIEl0IGxhemlseSBjb25zdHJ1Y3RzIHRoZSBUcnVzdGVkIFR5cGVzIHBvbGljeSwgcHJvdmlkaW5nIGhlbHBlclxuICogdXRpbGl0aWVzIGZvciBwcm9tb3Rpbmcgc3RyaW5ncyB0byBUcnVzdGVkIFR5cGVzLiBXaGVuIFRydXN0ZWQgVHlwZXMgYXJlIG5vdFxuICogYXZhaWxhYmxlLCBzdHJpbmdzIGFyZSB1c2VkIGFzIGEgZmFsbGJhY2suXG4gKiBAc2VjdXJpdHkgQWxsIHVzZSBvZiB0aGlzIG1vZHVsZSBpcyBzZWN1cml0eS1zZW5zaXRpdmUgYW5kIHNob3VsZCBnbyB0aHJvdWdoXG4gKiBzZWN1cml0eSByZXZpZXcuXG4gKi9cblxuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uL2dsb2JhbCc7XG5cbi8qKlxuICogVGhlIFRydXN0ZWQgVHlwZXMgcG9saWN5LCBvciBudWxsIGlmIFRydXN0ZWQgVHlwZXMgYXJlIG5vdFxuICogZW5hYmxlZC9zdXBwb3J0ZWQsIG9yIHVuZGVmaW5lZCBpZiB0aGUgcG9saWN5IGhhcyBub3QgYmVlbiBjcmVhdGVkIHlldC5cbiAqL1xubGV0IHBvbGljeTogVHJ1c3RlZFR5cGVQb2xpY3l8bnVsbHx1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgVHJ1c3RlZCBUeXBlcyBwb2xpY3ksIG9yIG51bGwgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgbm90XG4gKiBlbmFibGVkL3N1cHBvcnRlZC4gVGhlIGZpcnN0IGNhbGwgdG8gdGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSB0aGUgcG9saWN5LlxuICovXG5mdW5jdGlvbiBnZXRQb2xpY3koKTogVHJ1c3RlZFR5cGVQb2xpY3l8bnVsbCB7XG4gIGlmIChwb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgIHBvbGljeSA9IG51bGw7XG4gICAgaWYgKGdsb2JhbC50cnVzdGVkVHlwZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHBvbGljeSA9IChnbG9iYWwudHJ1c3RlZFR5cGVzIGFzIFRydXN0ZWRUeXBlUG9saWN5RmFjdG9yeSkuY3JlYXRlUG9saWN5KCdhbmd1bGFyJywge1xuICAgICAgICAgIGNyZWF0ZUhUTUw6IChzOiBzdHJpbmcpID0+IHMsXG4gICAgICAgICAgY3JlYXRlU2NyaXB0OiAoczogc3RyaW5nKSA9PiBzLFxuICAgICAgICAgIGNyZWF0ZVNjcmlwdFVSTDogKHM6IHN0cmluZykgPT4gcyxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSB0aHJvd3MgaWYgY2FsbGVkIHdpdGggYSBuYW1lIHRoYXQgaXNcbiAgICAgICAgLy8gYWxyZWFkeSByZWdpc3RlcmVkLCBldmVuIGluIHJlcG9ydC1vbmx5IG1vZGUuIFVudGlsIHRoZSBBUEkgY2hhbmdlcyxcbiAgICAgICAgLy8gY2F0Y2ggdGhlIGVycm9yIG5vdCB0byBicmVhayB0aGUgYXBwbGljYXRpb25zIGZ1bmN0aW9uYWxseS4gSW4gc3VjaFxuICAgICAgICAvLyBjYXNlcywgdGhlIGNvZGUgd2lsbCBmYWxsIGJhY2sgdG8gdXNpbmcgc3RyaW5ncy5cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvbGljeTtcbn1cblxuLyoqXG4gKiBVbnNhZmVseSBwcm9tb3RlIGEgc3RyaW5nIHRvIGEgVHJ1c3RlZEhUTUwsIGZhbGxpbmcgYmFjayB0byBzdHJpbmdzIHdoZW5cbiAqIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBhdmFpbGFibGUuXG4gKiBAc2VjdXJpdHkgVGhpcyBpcyBhIHNlY3VyaXR5LXNlbnNpdGl2ZSBmdW5jdGlvbjsgYW55IHVzZSBvZiB0aGlzIGZ1bmN0aW9uXG4gKiBtdXN0IGdvIHRocm91Z2ggc2VjdXJpdHkgcmV2aWV3LiBJbiBwYXJ0aWN1bGFyLCBpdCBtdXN0IGJlIGFzc3VyZWQgdGhhdCB0aGVcbiAqIHByb3ZpZGVkIHN0cmluZyB3aWxsIG5ldmVyIGNhdXNlIGFuIFhTUyB2dWxuZXJhYmlsaXR5IGlmIHVzZWQgaW4gYSBjb250ZXh0XG4gKiB0aGF0IHdpbGwgYmUgaW50ZXJwcmV0ZWQgYXMgSFRNTCBieSBhIGJyb3dzZXIsIGUuZy4gd2hlbiBhc3NpZ25pbmcgdG9cbiAqIGVsZW1lbnQuaW5uZXJIVE1MLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ1c3RlZEhUTUxGcm9tU3RyaW5nKGh0bWw6IHN0cmluZyk6IFRydXN0ZWRIVE1MfHN0cmluZyB7XG4gIHJldHVybiBnZXRQb2xpY3koKT8uY3JlYXRlSFRNTChodG1sKSB8fCBodG1sO1xufVxuXG4vKipcbiAqIFVuc2FmZWx5IHByb21vdGUgYSBzdHJpbmcgdG8gYSBUcnVzdGVkU2NyaXB0LCBmYWxsaW5nIGJhY2sgdG8gc3RyaW5ncyB3aGVuXG4gKiBUcnVzdGVkIFR5cGVzIGFyZSBub3QgYXZhaWxhYmxlLlxuICogQHNlY3VyaXR5IEluIHBhcnRpY3VsYXIsIGl0IG11c3QgYmUgYXNzdXJlZCB0aGF0IHRoZSBwcm92aWRlZCBzdHJpbmcgd2lsbFxuICogbmV2ZXIgY2F1c2UgYW4gWFNTIHZ1bG5lcmFiaWxpdHkgaWYgdXNlZCBpbiBhIGNvbnRleHQgdGhhdCB3aWxsIGJlXG4gKiBpbnRlcnByZXRlZCBhbmQgZXhlY3V0ZWQgYXMgYSBzY3JpcHQgYnkgYSBicm93c2VyLCBlLmcuIHdoZW4gY2FsbGluZyBldmFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJ1c3RlZFNjcmlwdEZyb21TdHJpbmcoc2NyaXB0OiBzdHJpbmcpOiBUcnVzdGVkU2NyaXB0fHN0cmluZyB7XG4gIHJldHVybiBnZXRQb2xpY3koKT8uY3JlYXRlU2NyaXB0KHNjcmlwdCkgfHwgc2NyaXB0O1xufVxuXG4vKipcbiAqIFVuc2FmZWx5IHByb21vdGUgYSBzdHJpbmcgdG8gYSBUcnVzdGVkU2NyaXB0VVJMLCBmYWxsaW5nIGJhY2sgdG8gc3RyaW5nc1xuICogd2hlbiBUcnVzdGVkIFR5cGVzIGFyZSBub3QgYXZhaWxhYmxlLlxuICogQHNlY3VyaXR5IFRoaXMgaXMgYSBzZWN1cml0eS1zZW5zaXRpdmUgZnVuY3Rpb247IGFueSB1c2Ugb2YgdGhpcyBmdW5jdGlvblxuICogbXVzdCBnbyB0aHJvdWdoIHNlY3VyaXR5IHJldmlldy4gSW4gcGFydGljdWxhciwgaXQgbXVzdCBiZSBhc3N1cmVkIHRoYXQgdGhlXG4gKiBwcm92aWRlZCBzdHJpbmcgd2lsbCBuZXZlciBjYXVzZSBhbiBYU1MgdnVsbmVyYWJpbGl0eSBpZiB1c2VkIGluIGEgY29udGV4dFxuICogdGhhdCB3aWxsIGNhdXNlIGEgYnJvd3NlciB0byBsb2FkIGFuZCBleGVjdXRlIGEgcmVzb3VyY2UsIGUuZy4gd2hlblxuICogYXNzaWduaW5nIHRvIHNjcmlwdC5zcmMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cnVzdGVkU2NyaXB0VVJMRnJvbVN0cmluZyh1cmw6IHN0cmluZyk6IFRydXN0ZWRTY3JpcHRVUkx8c3RyaW5nIHtcbiAgcmV0dXJuIGdldFBvbGljeSgpPy5jcmVhdGVTY3JpcHRVUkwodXJsKSB8fCB1cmw7XG59XG5cbi8qKlxuICogVW5zYWZlbHkgY2FsbCB0aGUgRnVuY3Rpb24gY29uc3RydWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc3RyaW5nIGFyZ3VtZW50cy4gSXRcbiAqIGlzIG9ubHkgYXZhaWxhYmxlIGluIGRldmVsb3BtZW50IG1vZGUsIGFuZCBzaG91bGQgYmUgc3RyaXBwZWQgb3V0IG9mXG4gKiBwcm9kdWN0aW9uIGNvZGUuXG4gKiBAc2VjdXJpdHkgVGhpcyBpcyBhIHNlY3VyaXR5LXNlbnNpdGl2ZSBmdW5jdGlvbjsgYW55IHVzZSBvZiB0aGlzIGZ1bmN0aW9uXG4gKiBtdXN0IGdvIHRocm91Z2ggc2VjdXJpdHkgcmV2aWV3LiBJbiBwYXJ0aWN1bGFyLCBpdCBtdXN0IGJlIGFzc3VyZWQgdGhhdCBpdFxuICogaXMgb25seSBjYWxsZWQgZnJvbSBkZXZlbG9wbWVudCBjb2RlLCBhcyB1c2UgaW4gcHJvZHVjdGlvbiBjb2RlIGNhbiBsZWFkIHRvXG4gKiBYU1MgdnVsbmVyYWJpbGl0aWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV3VHJ1c3RlZEZ1bmN0aW9uRm9yRGV2KC4uLmFyZ3M6IHN0cmluZ1tdKTogRnVuY3Rpb24ge1xuICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ25ld1RydXN0ZWRGdW5jdGlvbkZvckRldiBzaG91bGQgbmV2ZXIgYmUgY2FsbGVkIGluIHByb2R1Y3Rpb24nKTtcbiAgfVxuICBpZiAoIWdsb2JhbC50cnVzdGVkVHlwZXMpIHtcbiAgICAvLyBJbiBlbnZpcm9ubWVudHMgdGhhdCBkb24ndCBzdXBwb3J0IFRydXN0ZWQgVHlwZXMsIGZhbGwgYmFjayB0byB0aGUgbW9zdFxuICAgIC8vIHN0cmFpZ2h0Zm9yd2FyZCBpbXBsZW1lbnRhdGlvbjpcbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKC4uLmFyZ3MpO1xuICB9XG5cbiAgLy8gQ2hyb21lIGN1cnJlbnRseSBkb2VzIG5vdCBzdXBwb3J0IHBhc3NpbmcgVHJ1c3RlZFNjcmlwdCB0byB0aGUgRnVuY3Rpb25cbiAgLy8gY29uc3RydWN0b3IuIFRoZSBmb2xsb3dpbmcgaW1wbGVtZW50cyB0aGUgd29ya2Fyb3VuZCBwcm9wb3NlZCBvbiB0aGUgcGFnZVxuICAvLyBiZWxvdywgd2hlcmUgdGhlIENocm9taXVtIGJ1ZyBpcyBhbHNvIHJlZmVyZW5jZWQ6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvd2ViYXBwc2VjLXRydXN0ZWQtdHlwZXMvd2lraS9UcnVzdGVkLVR5cGVzLWZvci1mdW5jdGlvbi1jb25zdHJ1Y3RvclxuICBjb25zdCBmbkFyZ3MgPSBhcmdzLnNsaWNlKDAsIC0xKS5qb2luKCcsJyk7XG4gIGNvbnN0IGZuQm9keSA9IGFyZ3MucG9wKCkhLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGJvZHkgPSBgKGZ1bmN0aW9uIGFub255bW91cygke2ZuQXJnc31cbikgeyAke2ZuQm9keX1cbn0pYDtcblxuICAvLyBVc2luZyBldmFsIGRpcmVjdGx5IGNvbmZ1c2VzIHRoZSBjb21waWxlciBhbmQgcHJldmVudHMgdGhpcyBtb2R1bGUgZnJvbVxuICAvLyBiZWluZyBzdHJpcHBlZCBvdXQgb2YgSlMgYmluYXJpZXMgZXZlbiBpZiBub3QgdXNlZC4gVGhlIGdsb2JhbFsnZXZhbCddXG4gIC8vIGluZGlyZWN0aW9uIGZpeGVzIHRoYXQuXG4gIGNvbnN0IGZuID0gZ2xvYmFsWydldmFsJ10odHJ1c3RlZFNjcmlwdEZyb21TdHJpbmcoYm9keSkgYXMgc3RyaW5nKSBhcyBGdW5jdGlvbjtcblxuICAvLyBUbyBjb21wbGV0ZWx5IG1pbWljIHRoZSBiZWhhdmlvciBvZiBjYWxsaW5nIFwibmV3IEZ1bmN0aW9uXCIsIHR3byBtb3JlXG4gIC8vIHRoaW5ncyBuZWVkIHRvIGhhcHBlbjpcbiAgLy8gMS4gU3RyaW5naWZ5aW5nIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBpdHMgc291cmNlIGNvZGVcbiAgZm4udG9TdHJpbmcgPSAoKSA9PiBib2R5O1xuICAvLyAyLiBXaGVuIGNhbGxpbmcgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiwgYHRoaXNgIHNob3VsZCByZWZlciB0byBgZ2xvYmFsYFxuICByZXR1cm4gZm4uYmluZChnbG9iYWwpO1xuXG4gIC8vIFdoZW4gVHJ1c3RlZCBUeXBlcyBzdXBwb3J0IGluIEZ1bmN0aW9uIGNvbnN0cnVjdG9ycyBpcyB3aWRlbHkgYXZhaWxhYmxlLFxuICAvLyB0aGUgaW1wbGVtZW50YXRpb24gb2YgdGhpcyBmdW5jdGlvbiBjYW4gYmUgc2ltcGxpZmllZCB0bzpcbiAgLy8gcmV0dXJuIG5ldyBGdW5jdGlvbiguLi5hcmdzLm1hcChhID0+IHRydXN0ZWRTY3JpcHRGcm9tU3RyaW5nKGEpKSk7XG59XG4iXX0=