/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { injectTemplateRef as render3InjectTemplateRef } from '../render3/view_engine_compatibility';
import { noop } from '../util/noop';
import { ElementRef } from './element_ref';
/**
 * Represents an embedded template that can be used to instantiate embedded views.
 * To instantiate embedded views based on a template, use the `ViewContainerRef`
 * method `createEmbeddedView()`.
 *
 * Access a `TemplateRef` instance by placing a directive on an `<ng-template>`
 * element (or directive prefixed with `*`). The `TemplateRef` for the embedded view
 * is injected into the constructor of the directive,
 * using the `TemplateRef` token.
 *
 * You can also use a `Query` to find a `TemplateRef` associated with
 * a component or a directive.
 *
 * @see `ViewContainerRef`
 * @see [Navigate the Component Tree with DI](guide/dependency-injection-navtree)
 *
 * @publicApi
 */
var TemplateRef = /** @class */ (function () {
    function TemplateRef() {
    }
    /** @internal */
    /** @nocollapse */
    TemplateRef.__NG_ELEMENT_ID__ = function () { return SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef); };
    return TemplateRef;
}());
export { TemplateRef };
export var SWITCH_TEMPLATE_REF_FACTORY__POST_R3__ = render3InjectTemplateRef;
var SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__ = noop;
var SWITCH_TEMPLATE_REF_FACTORY = SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyL3RlbXBsYXRlX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLElBQUksd0JBQXdCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWxDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0g7SUFBQTtJQTBCQSxDQUFDO0lBSkMsZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNYLDZCQUFpQixHQUNXLGNBQU0sT0FBQSwyQkFBMkIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQXBELENBQW9ELENBQUE7SUFDL0Ysa0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCcUIsV0FBVztBQTRCakMsTUFBTSxDQUFDLElBQU0sc0NBQXNDLEdBQUcsd0JBQXdCLENBQUM7QUFDL0UsSUFBTSxxQ0FBcUMsR0FBRyxJQUFJLENBQUM7QUFDbkQsSUFBTSwyQkFBMkIsR0FDN0IscUNBQXFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7aW5qZWN0VGVtcGxhdGVSZWYgYXMgcmVuZGVyM0luamVjdFRlbXBsYXRlUmVmfSBmcm9tICcuLi9yZW5kZXIzL3ZpZXdfZW5naW5lX2NvbXBhdGliaWxpdHknO1xuaW1wb3J0IHtub29wfSBmcm9tICcuLi91dGlsL25vb3AnO1xuXG5pbXBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtFbWJlZGRlZFZpZXdSZWZ9IGZyb20gJy4vdmlld19yZWYnO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBlbWJlZGRlZCB0ZW1wbGF0ZSB0aGF0IGNhbiBiZSB1c2VkIHRvIGluc3RhbnRpYXRlIGVtYmVkZGVkIHZpZXdzLlxuICogVG8gaW5zdGFudGlhdGUgZW1iZWRkZWQgdmlld3MgYmFzZWQgb24gYSB0ZW1wbGF0ZSwgdXNlIHRoZSBgVmlld0NvbnRhaW5lclJlZmBcbiAqIG1ldGhvZCBgY3JlYXRlRW1iZWRkZWRWaWV3KClgLlxuICpcbiAqIEFjY2VzcyBhIGBUZW1wbGF0ZVJlZmAgaW5zdGFuY2UgYnkgcGxhY2luZyBhIGRpcmVjdGl2ZSBvbiBhbiBgPG5nLXRlbXBsYXRlPmBcbiAqIGVsZW1lbnQgKG9yIGRpcmVjdGl2ZSBwcmVmaXhlZCB3aXRoIGAqYCkuIFRoZSBgVGVtcGxhdGVSZWZgIGZvciB0aGUgZW1iZWRkZWQgdmlld1xuICogaXMgaW5qZWN0ZWQgaW50byB0aGUgY29uc3RydWN0b3Igb2YgdGhlIGRpcmVjdGl2ZSxcbiAqIHVzaW5nIHRoZSBgVGVtcGxhdGVSZWZgIHRva2VuLlxuICpcbiAqIFlvdSBjYW4gYWxzbyB1c2UgYSBgUXVlcnlgIHRvIGZpbmQgYSBgVGVtcGxhdGVSZWZgIGFzc29jaWF0ZWQgd2l0aFxuICogYSBjb21wb25lbnQgb3IgYSBkaXJlY3RpdmUuXG4gKlxuICogQHNlZSBgVmlld0NvbnRhaW5lclJlZmBcbiAqIEBzZWUgW05hdmlnYXRlIHRoZSBDb21wb25lbnQgVHJlZSB3aXRoIERJXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbi1uYXZ0cmVlKVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRlbXBsYXRlUmVmPEM+IHtcbiAgLyoqXG4gICAqIFRoZSBhbmNob3IgZWxlbWVudCBpbiB0aGUgcGFyZW50IHZpZXcgZm9yIHRoaXMgZW1iZWRkZWQgdmlldy5cbiAgICpcbiAgICogVGhlIGRhdGEtYmluZGluZyBhbmQgaW5qZWN0aW9uIGNvbnRleHRzIG9mIGVtYmVkZGVkIHZpZXdzIGNyZWF0ZWQgZnJvbSB0aGlzIGBUZW1wbGF0ZVJlZmBcbiAgICogaW5oZXJpdCBmcm9tIHRoZSBjb250ZXh0cyBvZiB0aGlzIGxvY2F0aW9uLlxuICAgKlxuICAgKiBUeXBpY2FsbHkgbmV3IGVtYmVkZGVkIHZpZXdzIGFyZSBhdHRhY2hlZCB0byB0aGUgdmlldyBjb250YWluZXIgb2YgdGhpcyBsb2NhdGlvbiwgYnV0IGluXG4gICAqIGFkdmFuY2VkIHVzZS1jYXNlcywgdGhlIHZpZXcgY2FuIGJlIGF0dGFjaGVkIHRvIGEgZGlmZmVyZW50IGNvbnRhaW5lciB3aGlsZSBrZWVwaW5nIHRoZVxuICAgKiBkYXRhLWJpbmRpbmcgYW5kIGluamVjdGlvbiBjb250ZXh0IGZyb20gdGhlIG9yaWdpbmFsIGxvY2F0aW9uLlxuICAgKlxuICAgKi9cbiAgLy8gVE9ETyhpKTogcmVuYW1lIHRvIGFuY2hvciBvciBsb2NhdGlvblxuICBhYnN0cmFjdCBnZXQgZWxlbWVudFJlZigpOiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgdmlldyBvYmplY3QgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSB2aWV3IGNvbnRhaW5lciBvZiB0aGUgcGFyZW50IHZpZXcuXG4gICAqIEBwYXJhbSBjb250ZXh0IFRoZSBjb250ZXh0IGZvciB0aGUgbmV3IHZpZXcsIGluaGVyaXRlZCBmcm9tIHRoZSBhbmNob3IgZWxlbWVudC5cbiAgICogQHJldHVybnMgVGhlIG5ldyB2aWV3IG9iamVjdC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZUVtYmVkZGVkVmlldyhjb250ZXh0OiBDKTogRW1iZWRkZWRWaWV3UmVmPEM+O1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBfX05HX0VMRU1FTlRfSURfXzpcbiAgICAgICgpID0+IFRlbXBsYXRlUmVmPGFueT58IG51bGwgPSAoKSA9PiBTV0lUQ0hfVEVNUExBVEVfUkVGX0ZBQ1RPUlkoVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYpXG59XG5cbmV4cG9ydCBjb25zdCBTV0lUQ0hfVEVNUExBVEVfUkVGX0ZBQ1RPUllfX1BPU1RfUjNfXyA9IHJlbmRlcjNJbmplY3RUZW1wbGF0ZVJlZjtcbmNvbnN0IFNXSVRDSF9URU1QTEFURV9SRUZfRkFDVE9SWV9fUFJFX1IzX18gPSBub29wO1xuY29uc3QgU1dJVENIX1RFTVBMQVRFX1JFRl9GQUNUT1JZOiB0eXBlb2YgcmVuZGVyM0luamVjdFRlbXBsYXRlUmVmID1cbiAgICBTV0lUQ0hfVEVNUExBVEVfUkVGX0ZBQ1RPUllfX1BSRV9SM19fO1xuIl19