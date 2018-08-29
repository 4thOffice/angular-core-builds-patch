/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Base class for Angular Views, provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be rerendered.
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](http://plnkr.co/edit/GC512b?p=preview).
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 */
export class ChangeDetectorRef {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdG9yX3JlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdDRztBQUNILE1BQU0sT0FBZ0IsaUJBQWlCO0NBd0R0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBBbmd1bGFyIFZpZXdzLCBwcm92aWRlcyBjaGFuZ2UgZGV0ZWN0aW9uIGZ1bmN0aW9uYWxpdHkuXG4gKiBBIGNoYW5nZS1kZXRlY3Rpb24gdHJlZSBjb2xsZWN0cyBhbGwgdmlld3MgdGhhdCBhcmUgdG8gYmUgY2hlY2tlZCBmb3IgY2hhbmdlcy5cbiAqIFVzZSB0aGUgbWV0aG9kcyB0byBhZGQgYW5kIHJlbW92ZSB2aWV3cyBmcm9tIHRoZSB0cmVlLCBpbml0aWF0ZSBjaGFuZ2UtZGV0ZWN0aW9uLFxuICogYW5kIGV4cGxpY2l0bHkgbWFyayB2aWV3cyBhcyBfZGlydHlfLCBtZWFuaW5nIHRoYXQgdGhleSBoYXZlIGNoYW5nZWQgYW5kIG5lZWQgdG8gYmUgcmVyZW5kZXJlZC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZXMgZGVtb25zdHJhdGUgaG93IHRvIG1vZGlmeSBkZWZhdWx0IGNoYW5nZS1kZXRlY3Rpb24gYmVoYXZpb3JcbiAqIHRvIHBlcmZvcm0gZXhwbGljaXQgZGV0ZWN0aW9uIHdoZW4gbmVlZGVkLlxuICpcbiAqICMjIyBVc2UgYG1hcmtGb3JDaGVjaygpYCB3aXRoIGBDaGVja09uY2VgIHN0cmF0ZWd5XG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNldHMgdGhlIGBPblB1c2hgIGNoYW5nZS1kZXRlY3Rpb24gc3RyYXRlZ3kgZm9yIGEgY29tcG9uZW50XG4gKiAoYENoZWNrT25jZWAsIHJhdGhlciB0aGFuIHRoZSBkZWZhdWx0IGBDaGVja0Fsd2F5c2ApLCB0aGVuIGZvcmNlcyBhIHNlY29uZCBjaGVja1xuICogYWZ0ZXIgYW4gaW50ZXJ2YWwuIFNlZSBbbGl2ZSBkZW1vXShodHRwOi8vcGxua3IuY28vZWRpdC9HQzUxMmI/cD1wcmV2aWV3KS5cbiAqXG4gKiA8Y29kZS1leGFtcGxlIHBhdGg9XCJjb3JlL3RzL2NoYW5nZV9kZXRlY3QvY2hhbmdlLWRldGVjdGlvbi50c1wiXG4gKiByZWdpb249XCJtYXJrLWZvci1jaGVja1wiPjwvY29kZS1leGFtcGxlPlxuICpcbiAqICMjIyBEZXRhY2ggY2hhbmdlIGRldGVjdG9yIHRvIGxpbWl0IGhvdyBvZnRlbiBjaGVjayBvY2N1cnNcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgZGVmaW5lcyBhIGNvbXBvbmVudCB3aXRoIGEgbGFyZ2UgbGlzdCBvZiByZWFkLW9ubHkgZGF0YVxuICogdGhhdCBpcyBleHBlY3RlZCB0byBjaGFuZ2UgY29uc3RhbnRseSwgbWFueSB0aW1lcyBwZXIgc2Vjb25kLlxuICogVG8gaW1wcm92ZSBwZXJmb3JtYW5jZSwgd2Ugd2FudCB0byBjaGVjayBhbmQgdXBkYXRlIHRoZSBsaXN0XG4gKiBsZXNzIG9mdGVuIHRoYW4gdGhlIGNoYW5nZXMgYWN0dWFsbHkgb2NjdXIuIFRvIGRvIHRoYXQsIHdlIGRldGFjaFxuICogdGhlIGNvbXBvbmVudCdzIGNoYW5nZSBkZXRlY3RvciBhbmQgcGVyZm9ybSBhbiBleHBsaWNpdCBsb2NhbCBjaGVjayBldmVyeSBmaXZlIHNlY29uZHMuXG4gKlxuICogPGNvZGUtZXhhbXBsZSBwYXRoPVwiY29yZS90cy9jaGFuZ2VfZGV0ZWN0L2NoYW5nZS1kZXRlY3Rpb24udHNcIiByZWdpb249XCJkZXRhY2hcIj48L2NvZGUtZXhhbXBsZT5cbiAqXG4gKlxuICogIyMjIFJlYXR0YWNoaW5nIGEgZGV0YWNoZWQgY29tcG9uZW50XG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGNyZWF0ZXMgYSBjb21wb25lbnQgZGlzcGxheWluZyBsaXZlIGRhdGEuXG4gKiBUaGUgY29tcG9uZW50IGRldGFjaGVzIGl0cyBjaGFuZ2UgZGV0ZWN0b3IgZnJvbSB0aGUgbWFpbiBjaGFuZ2UgZGV0ZWN0b3IgdHJlZVxuICogd2hlbiB0aGUgYGxpdmVgIHByb3BlcnR5IGlzIHNldCB0byBmYWxzZSwgYW5kIHJlYXR0YWNoZXMgaXQgd2hlbiB0aGUgcHJvcGVydHlcbiAqIGJlY29tZXMgdHJ1ZS5cbiAqXG4gKiA8Y29kZS1leGFtcGxlIHBhdGg9XCJjb3JlL3RzL2NoYW5nZV9kZXRlY3QvY2hhbmdlLWRldGVjdGlvbi50c1wiIHJlZ2lvbj1cImRldGFjaFwiPjwvY29kZS1leGFtcGxlPlxuICpcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoYW5nZURldGVjdG9yUmVmIHtcbiAgLyoqXG4gICAqIFdoZW4gYSB2aWV3IHVzZXMgdGhlIHtAbGluayBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSNPblB1c2ggT25QdXNofSAoY2hlY2tPbmNlKVxuICAgKiBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5LCBleHBsaWNpdGx5IG1hcmtzIHRoZSB2aWV3IGFzIGNoYW5nZWQgc28gdGhhdFxuICAgKiBpdCBjYW4gYmUgY2hlY2tlZCBhZ2Fpbi5cbiAgICpcbiAgICogQ29tcG9uZW50cyBhcmUgbm9ybWFsbHkgbWFya2VkIGFzIGRpcnR5IChpbiBuZWVkIG9mIHJlcmVuZGVyaW5nKSB3aGVuIGlucHV0c1xuICAgKiBoYXZlIGNoYW5nZWQgb3IgZXZlbnRzIGhhdmUgZmlyZWQgaW4gdGhlIHZpZXcuIENhbGwgdGhpcyBtZXRob2QgdG8gZW5zdXJlIHRoYXRcbiAgICogYSBjb21wb25lbnQgaXMgY2hlY2tlZCBldmVuIGlmIHRoZXNlIHRyaWdnZXJzIGhhdmUgbm90IG9jY3VyZWQuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gT25QdXNoIGNvbXBvbmVudHMgLS0+XG4gICAqXG4gICAqL1xuICBhYnN0cmFjdCBtYXJrRm9yQ2hlY2soKTogdm9pZDtcblxuICAvKipcbiAgICogRGV0YWNoZXMgdGhpcyB2aWV3IGZyb20gdGhlIGNoYW5nZS1kZXRlY3Rpb24gdHJlZS5cbiAgICogQSBkZXRhY2hlZCB2aWV3IGlzICBub3QgY2hlY2tlZCB1bnRpbCBpdCBpcyByZWF0dGFjaGVkLlxuICAgKiBVc2UgaW4gY29tYmluYXRpb24gd2l0aCBgZGV0ZWN0Q2hhbmdlcygpYCB0byBpbXBsZW1lbnQgbG9jYWwgY2hhbmdlIGRldGVjdGlvbiBjaGVja3MuXG4gICAqXG4gICAqIERldGFjaGVkIHZpZXdzIGFyZSBub3QgY2hlY2tlZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiBydW5zIHVudGlsIHRoZXkgYXJlXG4gICAqIHJlLWF0dGFjaGVkLCBldmVuIGlmIHRoZXkgYXJlIG1hcmtlZCBhcyBkaXJ0eS5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIGEgY2hhcHRlciBvbiBkZXRhY2gvcmVhdHRhY2gvbG9jYWwgZGlnZXN0IC0tPlxuICAgKiA8IS0tIFRPRE86IEFkZCBhIGxpdmUgZGVtbyBvbmNlIHJlZi5kZXRlY3RDaGFuZ2VzIGlzIG1lcmdlZCBpbnRvIG1hc3RlciAtLT5cbiAgICpcbiAgICovXG4gIGFic3RyYWN0IGRldGFjaCgpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhpcyB2aWV3IGFuZCBpdHMgY2hpbGRyZW4uIFVzZSBpbiBjb21iaW5hdGlvbiB3aXRoIHtAbGluayBDaGFuZ2VEZXRlY3RvclJlZiNkZXRhY2hcbiAgICogZGV0YWNofVxuICAgKiB0byBpbXBsZW1lbnQgbG9jYWwgY2hhbmdlIGRldGVjdGlvbiBjaGVja3MuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gZGV0YWNoL3JlYXR0YWNoL2xvY2FsIGRpZ2VzdCAtLT5cbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaXZlIGRlbW8gb25jZSByZWYuZGV0ZWN0Q2hhbmdlcyBpcyBtZXJnZWQgaW50byBtYXN0ZXIgLS0+XG4gICAqXG4gICAqL1xuICBhYnN0cmFjdCBkZXRlY3RDaGFuZ2VzKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgY2hhbmdlIGRldGVjdG9yIGFuZCBpdHMgY2hpbGRyZW4sIGFuZCB0aHJvd3MgaWYgYW55IGNoYW5nZXMgYXJlIGRldGVjdGVkLlxuICAgKlxuICAgKiBVc2UgaW4gZGV2ZWxvcG1lbnQgbW9kZSB0byB2ZXJpZnkgdGhhdCBydW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24gZG9lc24ndCBpbnRyb2R1Y2VcbiAgICogb3RoZXIgY2hhbmdlcy5cbiAgICovXG4gIGFic3RyYWN0IGNoZWNrTm9DaGFuZ2VzKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlLWF0dGFjaGVzIHRoZSBwcmV2aW91c2x5IGRldGFjaGVkIHZpZXcgdG8gdGhlIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS5cbiAgICogVmlld3MgYXJlIGF0dGFjaGVkIHRvIHRoZSB0cmVlIGJ5IGRlZmF1bHQuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gZGV0YWNoL3JlYXR0YWNoL2xvY2FsIGRpZ2VzdCAtLT5cbiAgICpcbiAgICovXG4gIGFic3RyYWN0IHJlYXR0YWNoKCk6IHZvaWQ7XG59XG4iXX0=