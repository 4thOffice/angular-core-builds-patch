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
    TemplateRef.__NG_ELEMENT_ID__ = function () { return SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef); };
    return TemplateRef;
}());
export { TemplateRef };
export var SWITCH_TEMPLATE_REF_FACTORY__POST_R3__ = render3InjectTemplateRef;
var SWITCH_TEMPLATE_REF_FACTORY__PRE_R3__ = noop;
var SWITCH_TEMPLATE_REF_FACTORY = SWITCH_TEMPLATE_REF_FACTORY__POST_R3__;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyL3RlbXBsYXRlX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLElBQUksd0JBQXdCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNuRyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWxDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJekM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0g7SUFBQTtJQXlCQSxDQUFDO0lBSEMsZ0JBQWdCO0lBQ1QsNkJBQWlCLEdBQ0ssY0FBTSxPQUFBLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQTtJQUN6RixrQkFBQztDQUFBLEFBekJELElBeUJDO1NBekJxQixXQUFXO0FBMkJqQyxNQUFNLENBQUMsSUFBTSxzQ0FBc0MsR0FBRyx3QkFBd0IsQ0FBQztBQUMvRSxJQUFNLHFDQUFxQyxHQUFHLElBQUksQ0FBQztBQUNuRCxJQUFNLDJCQUEyQixHQUZwQixzQ0FHNEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpbmplY3RUZW1wbGF0ZVJlZiBhcyByZW5kZXIzSW5qZWN0VGVtcGxhdGVSZWZ9IGZyb20gJy4uL3JlbmRlcjMvdmlld19lbmdpbmVfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge25vb3B9IGZyb20gJy4uL3V0aWwvbm9vcCc7XG5cbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi9lbGVtZW50X3JlZic7XG5pbXBvcnQge0VtYmVkZGVkVmlld1JlZn0gZnJvbSAnLi92aWV3X3JlZic7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGVtYmVkZGVkIHRlbXBsYXRlIHRoYXQgY2FuIGJlIHVzZWQgdG8gaW5zdGFudGlhdGUgZW1iZWRkZWQgdmlld3MuXG4gKiBUbyBpbnN0YW50aWF0ZSBlbWJlZGRlZCB2aWV3cyBiYXNlZCBvbiBhIHRlbXBsYXRlLCB1c2UgdGhlIGBWaWV3Q29udGFpbmVyUmVmYFxuICogbWV0aG9kIGBjcmVhdGVFbWJlZGRlZFZpZXcoKWAuXG4gKlxuICogQWNjZXNzIGEgYFRlbXBsYXRlUmVmYCBpbnN0YW5jZSBieSBwbGFjaW5nIGEgZGlyZWN0aXZlIG9uIGFuIGA8bmctdGVtcGxhdGU+YFxuICogZWxlbWVudCAob3IgZGlyZWN0aXZlIHByZWZpeGVkIHdpdGggYCpgKS4gVGhlIGBUZW1wbGF0ZVJlZmAgZm9yIHRoZSBlbWJlZGRlZCB2aWV3XG4gKiBpcyBpbmplY3RlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgZGlyZWN0aXZlLFxuICogdXNpbmcgdGhlIGBUZW1wbGF0ZVJlZmAgdG9rZW4uXG4gKlxuICogWW91IGNhbiBhbHNvIHVzZSBhIGBRdWVyeWAgdG8gZmluZCBhIGBUZW1wbGF0ZVJlZmAgYXNzb2NpYXRlZCB3aXRoXG4gKiBhIGNvbXBvbmVudCBvciBhIGRpcmVjdGl2ZS5cbiAqXG4gKiBAc2VlIGBWaWV3Q29udGFpbmVyUmVmYFxuICogQHNlZSBbTmF2aWdhdGUgdGhlIENvbXBvbmVudCBUcmVlIHdpdGggREldKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uLW5hdnRyZWUpXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGVtcGxhdGVSZWY8Qz4ge1xuICAvKipcbiAgICogVGhlIGFuY2hvciBlbGVtZW50IGluIHRoZSBwYXJlbnQgdmlldyBmb3IgdGhpcyBlbWJlZGRlZCB2aWV3LlxuICAgKlxuICAgKiBUaGUgZGF0YS1iaW5kaW5nIGFuZCBpbmplY3Rpb24gY29udGV4dHMgb2YgZW1iZWRkZWQgdmlld3MgY3JlYXRlZCBmcm9tIHRoaXMgYFRlbXBsYXRlUmVmYFxuICAgKiBpbmhlcml0IGZyb20gdGhlIGNvbnRleHRzIG9mIHRoaXMgbG9jYXRpb24uXG4gICAqXG4gICAqIFR5cGljYWxseSBuZXcgZW1iZWRkZWQgdmlld3MgYXJlIGF0dGFjaGVkIHRvIHRoZSB2aWV3IGNvbnRhaW5lciBvZiB0aGlzIGxvY2F0aW9uLCBidXQgaW5cbiAgICogYWR2YW5jZWQgdXNlLWNhc2VzLCB0aGUgdmlldyBjYW4gYmUgYXR0YWNoZWQgdG8gYSBkaWZmZXJlbnQgY29udGFpbmVyIHdoaWxlIGtlZXBpbmcgdGhlXG4gICAqIGRhdGEtYmluZGluZyBhbmQgaW5qZWN0aW9uIGNvbnRleHQgZnJvbSB0aGUgb3JpZ2luYWwgbG9jYXRpb24uXG4gICAqXG4gICAqL1xuICAvLyBUT0RPKGkpOiByZW5hbWUgdG8gYW5jaG9yIG9yIGxvY2F0aW9uXG4gIGFic3RyYWN0IGdldCBlbGVtZW50UmVmKCk6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB2aWV3IG9iamVjdCBhbmQgYXR0YWNoZXMgaXQgdG8gdGhlIHZpZXcgY29udGFpbmVyIG9mIHRoZSBwYXJlbnQgdmlldy5cbiAgICogQHBhcmFtIGNvbnRleHQgVGhlIGNvbnRleHQgZm9yIHRoZSBuZXcgdmlldywgaW5oZXJpdGVkIGZyb20gdGhlIGFuY2hvciBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBUaGUgbmV3IHZpZXcgb2JqZWN0LlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRleHQ6IEMpOiBFbWJlZGRlZFZpZXdSZWY8Qz47XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzdGF0aWMgX19OR19FTEVNRU5UX0lEX186XG4gICAgICAoKSA9PiBUZW1wbGF0ZVJlZjxhbnk+ID0gKCkgPT4gU1dJVENIX1RFTVBMQVRFX1JFRl9GQUNUT1JZKFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmKVxufVxuXG5leHBvcnQgY29uc3QgU1dJVENIX1RFTVBMQVRFX1JFRl9GQUNUT1JZX19QT1NUX1IzX18gPSByZW5kZXIzSW5qZWN0VGVtcGxhdGVSZWY7XG5jb25zdCBTV0lUQ0hfVEVNUExBVEVfUkVGX0ZBQ1RPUllfX1BSRV9SM19fID0gbm9vcDtcbmNvbnN0IFNXSVRDSF9URU1QTEFURV9SRUZfRkFDVE9SWTogdHlwZW9mIHJlbmRlcjNJbmplY3RUZW1wbGF0ZVJlZiA9XG4gICAgU1dJVENIX1RFTVBMQVRFX1JFRl9GQUNUT1JZX19QUkVfUjNfXztcbiJdfQ==