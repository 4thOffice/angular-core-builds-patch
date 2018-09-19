/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {@link Component} via {@link #createComponent}, and Embedded Views, created by instantiating an
 * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via a {@link ViewChild} query.
 *
 */
var ViewContainerRef = /** @class */ (function () {
    function ViewContainerRef() {
    }
    return ViewContainerRef;
}());
export { ViewContainerRef };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19jb250YWluZXJfcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyL3ZpZXdfY29udGFpbmVyX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFVSDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSDtJQUFBO0lBeUZBLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUF6RkQsSUF5RkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7Q29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmfSBmcm9tICcuL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi9lbGVtZW50X3JlZic7XG5pbXBvcnQge05nTW9kdWxlUmVmfSBmcm9tICcuL25nX21vZHVsZV9mYWN0b3J5JztcbmltcG9ydCB7VGVtcGxhdGVSZWZ9IGZyb20gJy4vdGVtcGxhdGVfcmVmJztcbmltcG9ydCB7RW1iZWRkZWRWaWV3UmVmLCBWaWV3UmVmfSBmcm9tICcuL3ZpZXdfcmVmJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb250YWluZXIgd2hlcmUgb25lIG9yIG1vcmUgVmlld3MgY2FuIGJlIGF0dGFjaGVkLlxuICpcbiAqIFRoZSBjb250YWluZXIgY2FuIGNvbnRhaW4gdHdvIGtpbmRzIG9mIFZpZXdzLiBIb3N0IFZpZXdzLCBjcmVhdGVkIGJ5IGluc3RhbnRpYXRpbmcgYVxuICoge0BsaW5rIENvbXBvbmVudH0gdmlhIHtAbGluayAjY3JlYXRlQ29tcG9uZW50fSwgYW5kIEVtYmVkZGVkIFZpZXdzLCBjcmVhdGVkIGJ5IGluc3RhbnRpYXRpbmcgYW5cbiAqIHtAbGluayBUZW1wbGF0ZVJlZiBFbWJlZGRlZCBUZW1wbGF0ZX0gdmlhIHtAbGluayAjY3JlYXRlRW1iZWRkZWRWaWV3fS5cbiAqXG4gKiBUaGUgbG9jYXRpb24gb2YgdGhlIFZpZXcgQ29udGFpbmVyIHdpdGhpbiB0aGUgY29udGFpbmluZyBWaWV3IGlzIHNwZWNpZmllZCBieSB0aGUgQW5jaG9yXG4gKiBgZWxlbWVudGAuIEVhY2ggVmlldyBDb250YWluZXIgY2FuIGhhdmUgb25seSBvbmUgQW5jaG9yIEVsZW1lbnQgYW5kIGVhY2ggQW5jaG9yIEVsZW1lbnQgY2FuIG9ubHlcbiAqIGhhdmUgYSBzaW5nbGUgVmlldyBDb250YWluZXIuXG4gKlxuICogUm9vdCBlbGVtZW50cyBvZiBWaWV3cyBhdHRhY2hlZCB0byB0aGlzIGNvbnRhaW5lciBiZWNvbWUgc2libGluZ3Mgb2YgdGhlIEFuY2hvciBFbGVtZW50IGluXG4gKiB0aGUgUmVuZGVyZWQgVmlldy5cbiAqXG4gKiBUbyBhY2Nlc3MgYSBgVmlld0NvbnRhaW5lclJlZmAgb2YgYW4gRWxlbWVudCwgeW91IGNhbiBlaXRoZXIgcGxhY2UgYSB7QGxpbmsgRGlyZWN0aXZlfSBpbmplY3RlZFxuICogd2l0aCBgVmlld0NvbnRhaW5lclJlZmAgb24gdGhlIEVsZW1lbnQsIG9yIHlvdSBvYnRhaW4gaXQgdmlhIGEge0BsaW5rIFZpZXdDaGlsZH0gcXVlcnkuXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmlld0NvbnRhaW5lclJlZiB7XG4gIC8qKlxuICAgKiBBbmNob3IgZWxlbWVudCB0aGF0IHNwZWNpZmllcyB0aGUgbG9jYXRpb24gb2YgdGhpcyBjb250YWluZXIgaW4gdGhlIGNvbnRhaW5pbmcgVmlldy5cbiAgICogPCEtLSBUT0RPOiByZW5hbWUgdG8gYW5jaG9yRWxlbWVudCAtLT5cbiAgICovXG4gIGFic3RyYWN0IGdldCBlbGVtZW50KCk6IEVsZW1lbnRSZWY7XG5cbiAgYWJzdHJhY3QgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yO1xuXG4gIGFic3RyYWN0IGdldCBwYXJlbnRJbmplY3RvcigpOiBJbmplY3RvcjtcblxuICAvKipcbiAgICogRGVzdHJveXMgYWxsIFZpZXdzIGluIHRoaXMgY29udGFpbmVyLlxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXIoKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIFZpZXdSZWZ9IGZvciB0aGUgVmlldyBsb2NhdGVkIGluIHRoaXMgY29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAqL1xuICBhYnN0cmFjdCBnZXQoaW5kZXg6IG51bWJlcik6IFZpZXdSZWZ8bnVsbDtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIFZpZXdzIGN1cnJlbnRseSBhdHRhY2hlZCB0byB0aGlzIGNvbnRhaW5lci5cbiAgICovXG4gIGFic3RyYWN0IGdldCBsZW5ndGgoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbnN0YW50aWF0ZXMgYW4gRW1iZWRkZWQgVmlldyBiYXNlZCBvbiB0aGUge0BsaW5rIFRlbXBsYXRlUmVmIGB0ZW1wbGF0ZVJlZmB9IGFuZCBpbnNlcnRzIGl0XG4gICAqIGludG8gdGhpcyBjb250YWluZXIgYXQgdGhlIHNwZWNpZmllZCBgaW5kZXhgLlxuICAgKlxuICAgKiBJZiBgaW5kZXhgIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBuZXcgVmlldyB3aWxsIGJlIGluc2VydGVkIGFzIHRoZSBsYXN0IFZpZXcgaW4gdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIFZpZXdSZWZ9IGZvciB0aGUgbmV3bHkgY3JlYXRlZCBWaWV3LlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlRW1iZWRkZWRWaWV3PEM+KHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxDPiwgY29udGV4dD86IEMsIGluZGV4PzogbnVtYmVyKTpcbiAgICAgIEVtYmVkZGVkVmlld1JlZjxDPjtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgc2luZ2xlIHtAbGluayBDb21wb25lbnR9IGFuZCBpbnNlcnRzIGl0cyBIb3N0IFZpZXcgaW50byB0aGlzIGNvbnRhaW5lciBhdCB0aGVcbiAgICogc3BlY2lmaWVkIGBpbmRleGAuXG4gICAqXG4gICAqIFRoZSBjb21wb25lbnQgaXMgaW5zdGFudGlhdGVkIHVzaW5nIGl0cyB7QGxpbmsgQ29tcG9uZW50RmFjdG9yeX0gd2hpY2ggY2FuIGJlIG9idGFpbmVkIHZpYVxuICAgKiB7QGxpbmsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyI3Jlc29sdmVDb21wb25lbnRGYWN0b3J5IHJlc29sdmVDb21wb25lbnRGYWN0b3J5fS5cbiAgICpcbiAgICogSWYgYGluZGV4YCBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgbmV3IFZpZXcgd2lsbCBiZSBpbnNlcnRlZCBhcyB0aGUgbGFzdCBWaWV3IGluIHRoZSBjb250YWluZXIuXG4gICAqXG4gICAqIFlvdSBjYW4gb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSB7QGxpbmsgSW5qZWN0b3J9IHRoYXQgd2lsbCBiZSB1c2VkIGFzIHBhcmVudCBmb3IgdGhlIENvbXBvbmVudC5cbiAgICpcbiAgICogUmV0dXJucyB0aGUge0BsaW5rIENvbXBvbmVudFJlZn0gb2YgdGhlIEhvc3QgVmlldyBjcmVhdGVkIGZvciB0aGUgbmV3bHkgaW5zdGFudGlhdGVkIENvbXBvbmVudC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZUNvbXBvbmVudDxDPihcbiAgICAgIGNvbXBvbmVudEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Qz4sIGluZGV4PzogbnVtYmVyLCBpbmplY3Rvcj86IEluamVjdG9yLFxuICAgICAgcHJvamVjdGFibGVOb2Rlcz86IGFueVtdW10sIG5nTW9kdWxlPzogTmdNb2R1bGVSZWY8YW55Pik6IENvbXBvbmVudFJlZjxDPjtcblxuICAvKipcbiAgICogSW5zZXJ0cyBhIFZpZXcgaWRlbnRpZmllZCBieSBhIHtAbGluayBWaWV3UmVmfSBpbnRvIHRoZSBjb250YWluZXIgYXQgdGhlIHNwZWNpZmllZCBgaW5kZXhgLlxuICAgKlxuICAgKiBJZiBgaW5kZXhgIGlzIG5vdCBzcGVjaWZpZWQsIHRoZSBuZXcgVmlldyB3aWxsIGJlIGluc2VydGVkIGFzIHRoZSBsYXN0IFZpZXcgaW4gdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogUmV0dXJucyB0aGUgaW5zZXJ0ZWQge0BsaW5rIFZpZXdSZWZ9LlxuICAgKi9cbiAgYWJzdHJhY3QgaW5zZXJ0KHZpZXdSZWY6IFZpZXdSZWYsIGluZGV4PzogbnVtYmVyKTogVmlld1JlZjtcblxuICAvKipcbiAgICogTW92ZXMgYSBWaWV3IGlkZW50aWZpZWQgYnkgYSB7QGxpbmsgVmlld1JlZn0gaW50byB0aGUgY29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC5cbiAgICpcbiAgICogUmV0dXJucyB0aGUgaW5zZXJ0ZWQge0BsaW5rIFZpZXdSZWZ9LlxuICAgKi9cbiAgYWJzdHJhY3QgbW92ZSh2aWV3UmVmOiBWaWV3UmVmLCBjdXJyZW50SW5kZXg6IG51bWJlcik6IFZpZXdSZWY7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBWaWV3LCBzcGVjaWZpZWQgdmlhIHtAbGluayBWaWV3UmVmfSwgd2l0aGluIHRoZSBjdXJyZW50IGNvbnRhaW5lciBvclxuICAgKiBgLTFgIGlmIHRoaXMgY29udGFpbmVyIGRvZXNuJ3QgY29udGFpbiB0aGUgVmlldy5cbiAgICovXG4gIGFic3RyYWN0IGluZGV4T2Yodmlld1JlZjogVmlld1JlZik6IG51bWJlcjtcblxuICAvKipcbiAgICogRGVzdHJveXMgYSBWaWV3IGF0dGFjaGVkIHRvIHRoaXMgY29udGFpbmVyIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC5cbiAgICpcbiAgICogSWYgYGluZGV4YCBpcyBub3Qgc3BlY2lmaWVkLCB0aGUgbGFzdCBWaWV3IGluIHRoZSBjb250YWluZXIgd2lsbCBiZSByZW1vdmVkLlxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlKGluZGV4PzogbnVtYmVyKTogdm9pZDtcblxuICAvKipcbiAgICogVXNlIGFsb25nIHdpdGgge0BsaW5rICNpbnNlcnR9IHRvIG1vdmUgYSBWaWV3IHdpdGhpbiB0aGUgY3VycmVudCBjb250YWluZXIuXG4gICAqXG4gICAqIElmIHRoZSBgaW5kZXhgIHBhcmFtIGlzIG9taXR0ZWQsIHRoZSBsYXN0IHtAbGluayBWaWV3UmVmfSBpcyBkZXRhY2hlZC5cbiAgICovXG4gIGFic3RyYWN0IGRldGFjaChpbmRleD86IG51bWJlcik6IFZpZXdSZWZ8bnVsbDtcbn1cbiJdfQ==