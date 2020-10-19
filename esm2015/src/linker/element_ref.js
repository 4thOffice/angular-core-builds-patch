/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { injectElementRef as render3InjectElementRef } from '../render3/view_engine_compatibility';
import { noop } from '../util/noop';
/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 * @publicApi
 */
// Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
// i.e. users have to ask for what they need. With that, we can build better analysis tools
// and could do better codegen in the future.
export class ElementRef {
    constructor(nativeElement) {
        this.nativeElement = nativeElement;
    }
}
/**
 * @internal
 * @nocollapse
 */
ElementRef.__NG_ELEMENT_ID__ = () => SWITCH_ELEMENT_REF_FACTORY(ElementRef);
export const SWITCH_ELEMENT_REF_FACTORY__POST_R3__ = render3InjectElementRef;
const SWITCH_ELEMENT_REF_FACTORY__PRE_R3__ = noop;
const SWITCH_ELEMENT_REF_FACTORY = SWITCH_ELEMENT_REF_FACTORY__PRE_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvZWxlbWVudF9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixJQUFJLHVCQUF1QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDakcsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILDJFQUEyRTtBQUMzRSwyRkFBMkY7QUFDM0YsNkNBQTZDO0FBQzdDLE1BQU0sT0FBTyxVQUFVO0lBd0JyQixZQUFZLGFBQWdCO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7O0FBRUQ7OztHQUdHO0FBQ0ksNEJBQWlCLEdBQXFCLEdBQUcsRUFBRSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRzVGLE1BQU0sQ0FBQyxNQUFNLHFDQUFxQyxHQUFHLHVCQUF1QixDQUFDO0FBQzdFLE1BQU0sb0NBQW9DLEdBQUcsSUFBSSxDQUFDO0FBQ2xELE1BQU0sMEJBQTBCLEdBQzVCLG9DQUFvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7aW5qZWN0RWxlbWVudFJlZiBhcyByZW5kZXIzSW5qZWN0RWxlbWVudFJlZn0gZnJvbSAnLi4vcmVuZGVyMy92aWV3X2VuZ2luZV9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7bm9vcH0gZnJvbSAnLi4vdXRpbC9ub29wJztcblxuLyoqXG4gKiBBIHdyYXBwZXIgYXJvdW5kIGEgbmF0aXZlIGVsZW1lbnQgaW5zaWRlIG9mIGEgVmlldy5cbiAqXG4gKiBBbiBgRWxlbWVudFJlZmAgaXMgYmFja2VkIGJ5IGEgcmVuZGVyLXNwZWNpZmljIGVsZW1lbnQuIEluIHRoZSBicm93c2VyLCB0aGlzIGlzIHVzdWFsbHkgYSBET01cbiAqIGVsZW1lbnQuXG4gKlxuICogQHNlY3VyaXR5IFBlcm1pdHRpbmcgZGlyZWN0IGFjY2VzcyB0byB0aGUgRE9NIGNhbiBtYWtlIHlvdXIgYXBwbGljYXRpb24gbW9yZSB2dWxuZXJhYmxlIHRvXG4gKiBYU1MgYXR0YWNrcy4gQ2FyZWZ1bGx5IHJldmlldyBhbnkgdXNlIG9mIGBFbGVtZW50UmVmYCBpbiB5b3VyIGNvZGUuIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZVxuICogW1NlY3VyaXR5IEd1aWRlXShodHRwOi8vZy5jby9uZy9zZWN1cml0eSkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG4vLyBOb3RlOiBXZSBkb24ndCBleHBvc2UgdGhpbmdzIGxpa2UgYEluamVjdG9yYCwgYFZpZXdDb250YWluZXJgLCAuLi4gaGVyZSxcbi8vIGkuZS4gdXNlcnMgaGF2ZSB0byBhc2sgZm9yIHdoYXQgdGhleSBuZWVkLiBXaXRoIHRoYXQsIHdlIGNhbiBidWlsZCBiZXR0ZXIgYW5hbHlzaXMgdG9vbHNcbi8vIGFuZCBjb3VsZCBkbyBiZXR0ZXIgY29kZWdlbiBpbiB0aGUgZnV0dXJlLlxuZXhwb3J0IGNsYXNzIEVsZW1lbnRSZWY8VCA9IGFueT4ge1xuICAvKipcbiAgICogVGhlIHVuZGVybHlpbmcgbmF0aXZlIGVsZW1lbnQgb3IgYG51bGxgIGlmIGRpcmVjdCBhY2Nlc3MgdG8gbmF0aXZlIGVsZW1lbnRzIGlzIG5vdCBzdXBwb3J0ZWRcbiAgICogKGUuZy4gd2hlbiB0aGUgYXBwbGljYXRpb24gcnVucyBpbiBhIHdlYiB3b3JrZXIpLlxuICAgKlxuICAgKiA8ZGl2IGNsYXNzPVwiY2FsbG91dCBpcy1jcml0aWNhbFwiPlxuICAgKiAgIDxoZWFkZXI+VXNlIHdpdGggY2F1dGlvbjwvaGVhZGVyPlxuICAgKiAgIDxwPlxuICAgKiAgICBVc2UgdGhpcyBBUEkgYXMgdGhlIGxhc3QgcmVzb3J0IHdoZW4gZGlyZWN0IGFjY2VzcyB0byBET00gaXMgbmVlZGVkLiBVc2UgdGVtcGxhdGluZyBhbmRcbiAgICogICAgZGF0YS1iaW5kaW5nIHByb3ZpZGVkIGJ5IEFuZ3VsYXIgaW5zdGVhZC4gQWx0ZXJuYXRpdmVseSB5b3UgY2FuIHRha2UgYSBsb29rIGF0IHtAbGlua1xuICAgKiBSZW5kZXJlcjJ9XG4gICAqICAgIHdoaWNoIHByb3ZpZGVzIEFQSSB0aGF0IGNhbiBzYWZlbHkgYmUgdXNlZCBldmVuIHdoZW4gZGlyZWN0IGFjY2VzcyB0byBuYXRpdmUgZWxlbWVudHMgaXMgbm90XG4gICAqICAgIHN1cHBvcnRlZC5cbiAgICogICA8L3A+XG4gICAqICAgPHA+XG4gICAqICAgIFJlbHlpbmcgb24gZGlyZWN0IERPTSBhY2Nlc3MgY3JlYXRlcyB0aWdodCBjb3VwbGluZyBiZXR3ZWVuIHlvdXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcmluZ1xuICAgKiAgICBsYXllcnMgd2hpY2ggd2lsbCBtYWtlIGl0IGltcG9zc2libGUgdG8gc2VwYXJhdGUgdGhlIHR3byBhbmQgZGVwbG95IHlvdXIgYXBwbGljYXRpb24gaW50byBhXG4gICAqICAgIHdlYiB3b3JrZXIuXG4gICAqICAgPC9wPlxuICAgKiA8L2Rpdj5cbiAgICpcbiAgICovXG4gIHB1YmxpYyBuYXRpdmVFbGVtZW50OiBUO1xuXG4gIGNvbnN0cnVjdG9yKG5hdGl2ZUVsZW1lbnQ6IFQpIHtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAbm9jb2xsYXBzZVxuICAgKi9cbiAgc3RhdGljIF9fTkdfRUxFTUVOVF9JRF9fOiAoKSA9PiBFbGVtZW50UmVmID0gKCkgPT4gU1dJVENIX0VMRU1FTlRfUkVGX0ZBQ1RPUlkoRWxlbWVudFJlZik7XG59XG5cbmV4cG9ydCBjb25zdCBTV0lUQ0hfRUxFTUVOVF9SRUZfRkFDVE9SWV9fUE9TVF9SM19fID0gcmVuZGVyM0luamVjdEVsZW1lbnRSZWY7XG5jb25zdCBTV0lUQ0hfRUxFTUVOVF9SRUZfRkFDVE9SWV9fUFJFX1IzX18gPSBub29wO1xuY29uc3QgU1dJVENIX0VMRU1FTlRfUkVGX0ZBQ1RPUlk6IHR5cGVvZiByZW5kZXIzSW5qZWN0RWxlbWVudFJlZiA9XG4gICAgU1dJVENIX0VMRU1FTlRfUkVGX0ZBQ1RPUllfX1BSRV9SM19fO1xuIl19