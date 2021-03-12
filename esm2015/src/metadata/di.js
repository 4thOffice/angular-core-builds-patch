/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '../di/injection_token';
import { makePropDecorator } from '../util/decorators';
/**
 * A DI token that you can use to create a virtual [provider](guide/glossary#provider)
 * that will populate the `entryComponents` field of components and NgModules
 * based on its `useValue` property value.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) are added to the `entryComponents` property.
 *
 * @usageNotes
 *
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on a router configuration that refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @publicApi
 * @deprecated Since 9.0.0. With Ivy, this property is no longer necessary.
 */
export const ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken('AnalyzeForEntryComponents');
// Stores the default value of `emitDistinctChangesOnly` when the `emitDistinctChangesOnly` is not
// explicitly set.
export const emitDistinctChangesOnlyDefaultValue = true;
/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 *
 * @publicApi
 */
export class Query {
}
/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export const ContentChildren = makePropDecorator('ContentChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false, emitDistinctChangesOnly: emitDistinctChangesOnlyDefaultValue }, data)), Query);
/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
export const ContentChild = makePropDecorator('ContentChild', (selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data)), Query);
/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const ViewChildren = makePropDecorator('ViewChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true, emitDistinctChangesOnly: emitDistinctChangesOnlyDefaultValue }, data)), Query);
/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const ViewChild = makePropDecorator('ViewChild', (selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data)), Query);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHLElBQUksY0FBYyxDQUFNLDJCQUEyQixDQUFDLENBQUM7QUEyRGpHLGtHQUFrRztBQUNsRyxrQkFBa0I7QUFDbEIsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQUcsSUFBSSxDQUFDO0FBR3hEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sT0FBZ0IsS0FBSztDQUFHO0FBaUU5Qjs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQTZCLGlCQUFpQixDQUN0RSxpQkFBaUIsRUFBRSxDQUFDLFFBQWMsRUFBRSxPQUFZLEVBQUUsRUFBRSxFQUFFLENBQUMsaUJBQ2xDLFFBQVEsRUFDUixLQUFLLEVBQUUsS0FBSyxFQUNaLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLHVCQUF1QixFQUFFLG1DQUFtQyxJQUN6RCxJQUFJLEVBQ1AsRUFDckIsS0FBSyxDQUFDLENBQUM7QUFrRFg7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBMEIsaUJBQWlCLENBQ2hFLGNBQWMsRUFDZCxDQUFDLFFBQWMsRUFBRSxPQUFZLEVBQUUsRUFBRSxFQUFFLENBQy9CLGlCQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBSyxJQUFJLEVBQUUsRUFDN0UsS0FBSyxDQUFDLENBQUM7QUFvRFg7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQTBCLGlCQUFpQixDQUNoRSxjQUFjLEVBQUUsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLGlCQUNsQyxRQUFRLEVBQ1IsS0FBSyxFQUFFLEtBQUssRUFDWixXQUFXLEVBQUUsSUFBSSxFQUNqQixXQUFXLEVBQUUsSUFBSSxFQUNqQix1QkFBdUIsRUFBRSxtQ0FBbUMsSUFDekQsSUFBSSxFQUNQLEVBQ2xCLEtBQUssQ0FBQyxDQUFDO0FBNERYOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUF1QixpQkFBaUIsQ0FDMUQsV0FBVyxFQUNYLENBQUMsUUFBYSxFQUFFLElBQVMsRUFBRSxFQUFFLENBQ3pCLGlCQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksSUFBSyxJQUFJLEVBQUUsRUFDNUUsS0FBSyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi4vZGkvaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHttYWtlUHJvcERlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuLyoqXG4gKiBBIERJIHRva2VuIHRoYXQgeW91IGNhbiB1c2UgdG8gY3JlYXRlIGEgdmlydHVhbCBbcHJvdmlkZXJdKGd1aWRlL2dsb3NzYXJ5I3Byb3ZpZGVyKVxuICogdGhhdCB3aWxsIHBvcHVsYXRlIHRoZSBgZW50cnlDb21wb25lbnRzYCBmaWVsZCBvZiBjb21wb25lbnRzIGFuZCBOZ01vZHVsZXNcbiAqIGJhc2VkIG9uIGl0cyBgdXNlVmFsdWVgIHByb3BlcnR5IHZhbHVlLlxuICogQWxsIGNvbXBvbmVudHMgdGhhdCBhcmUgcmVmZXJlbmNlZCBpbiB0aGUgYHVzZVZhbHVlYCB2YWx1ZSAoZWl0aGVyIGRpcmVjdGx5XG4gKiBvciBpbiBhIG5lc3RlZCBhcnJheSBvciBtYXApIGFyZSBhZGRlZCB0byB0aGUgYGVudHJ5Q29tcG9uZW50c2AgcHJvcGVydHkuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgaG93IHRoZSByb3V0ZXIgY2FuIHBvcHVsYXRlIHRoZSBgZW50cnlDb21wb25lbnRzYFxuICogZmllbGQgb2YgYW4gTmdNb2R1bGUgYmFzZWQgb24gYSByb3V0ZXIgY29uZmlndXJhdGlvbiB0aGF0IHJlZmVyc1xuICogdG8gY29tcG9uZW50cy5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyBoZWxwZXIgZnVuY3Rpb24gaW5zaWRlIHRoZSByb3V0ZXJcbiAqIGZ1bmN0aW9uIHByb3ZpZGVSb3V0ZXMocm91dGVzKSB7XG4gKiAgIHJldHVybiBbXG4gKiAgICAge3Byb3ZpZGU6IFJPVVRFUywgdXNlVmFsdWU6IHJvdXRlc30sXG4gKiAgICAge3Byb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIHVzZVZhbHVlOiByb3V0ZXMsIG11bHRpOiB0cnVlfVxuICogICBdO1xuICogfVxuICpcbiAqIC8vIHVzZXIgY29kZVxuICogbGV0IHJvdXRlcyA9IFtcbiAqICAge3BhdGg6ICcvcm9vdCcsIGNvbXBvbmVudDogUm9vdENvbXB9LFxuICogICB7cGF0aDogJy90ZWFtcycsIGNvbXBvbmVudDogVGVhbXNDb21wfVxuICogXTtcbiAqXG4gKiBATmdNb2R1bGUoe1xuICogICBwcm92aWRlcnM6IFtwcm92aWRlUm91dGVzKHJvdXRlcyldXG4gKiB9KVxuICogY2xhc3MgTW9kdWxlV2l0aFJvdXRlcyB7fVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgU2luY2UgOS4wLjAuIFdpdGggSXZ5LCB0aGlzIHByb3BlcnR5IGlzIG5vIGxvbmdlciBuZWNlc3NhcnkuXG4gKi9cbmV4cG9ydCBjb25zdCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ0FuYWx5emVGb3JFbnRyeUNvbXBvbmVudHMnKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBgQXR0cmlidXRlYCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXR0cmlidXRlRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyB0aGF0IGEgY29uc3RhbnQgYXR0cmlidXRlIHZhbHVlIHNob3VsZCBiZSBpbmplY3RlZC5cbiAgICpcbiAgICogVGhlIGRpcmVjdGl2ZSBjYW4gaW5qZWN0IGNvbnN0YW50IHN0cmluZyBsaXRlcmFscyBvZiBob3N0IGVsZW1lbnQgYXR0cmlidXRlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogU3VwcG9zZSB3ZSBoYXZlIGFuIGA8aW5wdXQ+YCBlbGVtZW50IGFuZCB3YW50IHRvIGtub3cgaXRzIGB0eXBlYC5cbiAgICpcbiAgICogYGBgaHRtbFxuICAgKiA8aW5wdXQgdHlwZT1cInRleHRcIj5cbiAgICogYGBgXG4gICAqXG4gICAqIEEgZGVjb3JhdG9yIGNhbiBpbmplY3Qgc3RyaW5nIGxpdGVyYWwgYHRleHRgIGFzIGluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZS5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMgcmVnaW9uPSdhdHRyaWJ1dGVNZXRhZGF0YSd9XG4gICAqXG4gICAqIEBwdWJsaWNBcGlcbiAgICovXG4gIChuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIG5ldyhuYW1lOiBzdHJpbmcpOiBBdHRyaWJ1dGU7XG59XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBBdHRyaWJ1dGUgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZSB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIGJlIGluamVjdGVkIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgYXR0cmlidXRlTmFtZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBRdWVyeSBtZXRhZGF0YS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHk6IGJvb2xlYW47XG4gIGZpcnN0OiBib29sZWFuO1xuICByZWFkOiBhbnk7XG4gIGlzVmlld1F1ZXJ5OiBib29sZWFuO1xuICBzZWxlY3RvcjogYW55O1xuICBzdGF0aWM/OiBib29sZWFuO1xufVxuXG4vLyBTdG9yZXMgdGhlIGRlZmF1bHQgdmFsdWUgb2YgYGVtaXREaXN0aW5jdENoYW5nZXNPbmx5YCB3aGVuIHRoZSBgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlgIGlzIG5vdFxuLy8gZXhwbGljaXRseSBzZXQuXG5leHBvcnQgY29uc3QgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlEZWZhdWx0VmFsdWUgPSB0cnVlO1xuXG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgcXVlcnkgbWV0YWRhdGEuXG4gKlxuICogQHNlZSBgQ29udGVudENoaWxkcmVuYC5cbiAqIEBzZWUgYENvbnRlbnRDaGlsZGAuXG4gKiBAc2VlIGBWaWV3Q2hpbGRyZW5gLlxuICogQHNlZSBgVmlld0NoaWxkYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBRdWVyeSB7fVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZHJlbiBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAc2VlIGBDb250ZW50Q2hpbGRyZW5gLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRlbnRDaGlsZHJlbkRlY29yYXRvciB7XG4gIC8qKlxuICAgKiBQYXJhbWV0ZXIgZGVjb3JhdG9yIHRoYXQgY29uZmlndXJlcyBhIGNvbnRlbnQgcXVlcnkuXG4gICAqXG4gICAqIFVzZSB0byBnZXQgdGhlIGBRdWVyeUxpc3RgIG9mIGVsZW1lbnRzIG9yIGRpcmVjdGl2ZXMgZnJvbSB0aGUgY29udGVudCBET00uXG4gICAqIEFueSB0aW1lIGEgY2hpbGQgZWxlbWVudCBpcyBhZGRlZCwgcmVtb3ZlZCwgb3IgbW92ZWQsIHRoZSBxdWVyeSBsaXN0IHdpbGwgYmVcbiAgICogdXBkYXRlZCwgYW5kIHRoZSBjaGFuZ2VzIG9ic2VydmFibGUgb2YgdGhlIHF1ZXJ5IGxpc3Qgd2lsbCBlbWl0IGEgbmV3IHZhbHVlLlxuICAgKlxuICAgKiBDb250ZW50IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyQ29udGVudEluaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICpcbiAgICogRG9lcyBub3QgcmV0cmlldmUgZWxlbWVudHMgb3IgZGlyZWN0aXZlcyB0aGF0IGFyZSBpbiBvdGhlciBjb21wb25lbnRzJyB0ZW1wbGF0ZXMsXG4gICAqIHNpbmNlIGEgY29tcG9uZW50J3MgdGVtcGxhdGUgaXMgYWx3YXlzIGEgYmxhY2sgYm94IHRvIGl0cyBhbmNlc3RvcnMuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIFRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKmRlc2NlbmRhbnRzKiogLSBUcnVlIHRvIGluY2x1ZGUgYWxsIGRlc2NlbmRhbnRzLCBvdGhlcndpc2UgaW5jbHVkZSBvbmx5IGRpcmVjdCBjaGlsZHJlbi5cbiAgICogKiAqKmVtaXREaXN0aW5jdENoYW5nZXNPbmx5KiogLSBUaGUgYCBRdWVyeUxpc3QjY2hhbmdlc2Agb2JzZXJ2YWJsZSB3aWxsIGVtaXQgbmV3IHZhbHVlcyBvbmx5XG4gICAqICAgaWYgdGhlIFF1ZXJ5TGlzdCByZXN1bHQgaGFzIGNoYW5nZWQuIFdoZW4gYGZhbHNlYCB0aGUgYGNoYW5nZXNgIG9ic2VydmFibGUgbWlnaHQgZW1pdCBldmVuXG4gICAqICAgaWYgdGhlIFF1ZXJ5TGlzdCBoYXMgbm90IGNoYW5nZWQuXG4gICAqICAgKiogTm90ZTogKioqIFRoaXMgY29uZmlnIG9wdGlvbiBpcyAqKmRlcHJlY2F0ZWQqKiwgaXQgd2lsbCBiZSBwZXJtYW5lbnRseSBzZXQgdG8gYHRydWVgIGFuZFxuICAgKiAgIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb25zIG9mIEFuZ3VsYXIuXG4gICAqICogKipyZWFkKiogLSBVc2VkIHRvIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50cy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogSGVyZSBpcyBhIHNpbXBsZSBkZW1vbnN0cmF0aW9uIG9mIGhvdyB0aGUgYENvbnRlbnRDaGlsZHJlbmAgZGVjb3JhdG9yIGNhbiBiZSB1c2VkLlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9jb250ZW50Q2hpbGRyZW4vY29udGVudF9jaGlsZHJlbl9ob3d0by50cyByZWdpb249J0hvd1RvJ31cbiAgICpcbiAgICogIyMjIFRhYi1wYW5lIGV4YW1wbGVcbiAgICpcbiAgICogSGVyZSBpcyBhIHNsaWdodGx5IG1vcmUgcmVhbGlzdGljIGV4YW1wbGUgdGhhdCBzaG93cyBob3cgYENvbnRlbnRDaGlsZHJlbmAgZGVjb3JhdG9yc1xuICAgKiBjYW4gYmUgdXNlZCB0byBpbXBsZW1lbnQgYSB0YWIgcGFuZSBjb21wb25lbnQuXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZHJlbi9jb250ZW50X2NoaWxkcmVuX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICAgKlxuICAgKiBAQW5ub3RhdGlvblxuICAgKi9cbiAgKHNlbGVjdG9yOiBUeXBlPGFueT58SW5qZWN0aW9uVG9rZW48dW5rbm93bj58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge1xuICAgIGRlc2NlbmRhbnRzPzogYm9vbGVhbixcbiAgICBlbWl0RGlzdGluY3RDaGFuZ2VzT25seT86IGJvb2xlYW4sXG4gICAgcmVhZD86IGFueSxcbiAgfSk6IGFueTtcbiAgbmV3KHNlbGVjdG9yOiBUeXBlPGFueT58SW5qZWN0aW9uVG9rZW48dW5rbm93bj58RnVuY3Rpb258c3RyaW5nLFxuICAgICAgb3B0cz86IHtkZXNjZW5kYW50cz86IGJvb2xlYW4sIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5PzogYm9vbGVhbiwgcmVhZD86IGFueX0pOiBRdWVyeTtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBDb250ZW50Q2hpbGRyZW4gbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRlbnRDaGlsZHJlbiA9IFF1ZXJ5O1xuXG4vKipcbiAqIENvbnRlbnRDaGlsZHJlbiBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqXG4gKiBAQW5ub3RhdGlvblxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQ29udGVudENoaWxkcmVuOiBDb250ZW50Q2hpbGRyZW5EZWNvcmF0b3IgPSBtYWtlUHJvcERlY29yYXRvcihcbiAgICAnQ29udGVudENoaWxkcmVuJywgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXNWaWV3UXVlcnk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NlbmRhbnRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlEZWZhdWx0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQ29udGVudENoaWxkIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250ZW50Q2hpbGREZWNvcmF0b3Ige1xuICAvKipcbiAgICogUGFyYW1ldGVyIGRlY29yYXRvciB0aGF0IGNvbmZpZ3VyZXMgYSBjb250ZW50IHF1ZXJ5LlxuICAgKlxuICAgKiBVc2UgdG8gZ2V0IHRoZSBmaXJzdCBlbGVtZW50IG9yIHRoZSBkaXJlY3RpdmUgbWF0Y2hpbmcgdGhlIHNlbGVjdG9yIGZyb20gdGhlIGNvbnRlbnQgRE9NLlxuICAgKiBJZiB0aGUgY29udGVudCBET00gY2hhbmdlcywgYW5kIGEgbmV3IGNoaWxkIG1hdGNoZXMgdGhlIHNlbGVjdG9yLFxuICAgKiB0aGUgcHJvcGVydHkgd2lsbCBiZSB1cGRhdGVkLlxuICAgKlxuICAgKiBDb250ZW50IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyQ29udGVudEluaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICpcbiAgICogRG9lcyBub3QgcmV0cmlldmUgZWxlbWVudHMgb3IgZGlyZWN0aXZlcyB0aGF0IGFyZSBpbiBvdGhlciBjb21wb25lbnRzJyB0ZW1wbGF0ZXMsXG4gICAqIHNpbmNlIGEgY29tcG9uZW50J3MgdGVtcGxhdGUgaXMgYWx3YXlzIGEgYmxhY2sgYm94IHRvIGl0cyBhbmNlc3RvcnMuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIFRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIFVzZWQgdG8gcmVhZCBhIGRpZmZlcmVudCB0b2tlbiBmcm9tIHRoZSBxdWVyaWVkIGVsZW1lbnQuXG4gICAqICogKipzdGF0aWMqKiAtIFRydWUgdG8gcmVzb2x2ZSBxdWVyeSByZXN1bHRzIGJlZm9yZSBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMsXG4gICAqIGZhbHNlIHRvIHJlc29sdmUgYWZ0ZXIgY2hhbmdlIGRldGVjdGlvbi4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZC9jb250ZW50X2NoaWxkX2hvd3RvLnRzIHJlZ2lvbj0nSG93VG8nfVxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9jb250ZW50Q2hpbGQvY29udGVudF9jaGlsZF9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEluamVjdGlvblRva2VuPHVua25vd24+fEZ1bmN0aW9ufHN0cmluZyxcbiAgIG9wdHM/OiB7cmVhZD86IGFueSwgc3RhdGljPzogYm9vbGVhbn0pOiBhbnk7XG4gIG5ldyhzZWxlY3RvcjogVHlwZTxhbnk+fEluamVjdGlvblRva2VuPHVua25vd24+fEZ1bmN0aW9ufHN0cmluZyxcbiAgICAgIG9wdHM/OiB7cmVhZD86IGFueSwgc3RhdGljPzogYm9vbGVhbn0pOiBDb250ZW50Q2hpbGQ7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQ29udGVudENoaWxkIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgQ29udGVudENoaWxkID0gUXVlcnk7XG5cbi8qKlxuICogQ29udGVudENoaWxkIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQ29udGVudENoaWxkOiBDb250ZW50Q2hpbGREZWNvcmF0b3IgPSBtYWtlUHJvcERlY29yYXRvcihcbiAgICAnQ29udGVudENoaWxkJyxcbiAgICAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pLFxuICAgIFF1ZXJ5KTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBWaWV3Q2hpbGRyZW4gZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHNlZSBgVmlld0NoaWxkcmVuYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NoaWxkcmVuRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFBhcmFtZXRlciBkZWNvcmF0b3IgdGhhdCBjb25maWd1cmVzIGEgdmlldyBxdWVyeS5cbiAgICpcbiAgICogVXNlIHRvIGdldCB0aGUgYFF1ZXJ5TGlzdGAgb2YgZWxlbWVudHMgb3IgZGlyZWN0aXZlcyBmcm9tIHRoZSB2aWV3IERPTS5cbiAgICogQW55IHRpbWUgYSBjaGlsZCBlbGVtZW50IGlzIGFkZGVkLCByZW1vdmVkLCBvciBtb3ZlZCwgdGhlIHF1ZXJ5IGxpc3Qgd2lsbCBiZSB1cGRhdGVkLFxuICAgKiBhbmQgdGhlIGNoYW5nZXMgb2JzZXJ2YWJsZSBvZiB0aGUgcXVlcnkgbGlzdCB3aWxsIGVtaXQgYSBuZXcgdmFsdWUuXG4gICAqXG4gICAqIFZpZXcgcXVlcmllcyBhcmUgc2V0IGJlZm9yZSB0aGUgYG5nQWZ0ZXJWaWV3SW5pdGAgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICAgKlxuICAgKiAqKk1ldGFkYXRhIFByb3BlcnRpZXMqKjpcbiAgICpcbiAgICogKiAqKnNlbGVjdG9yKiogLSBUaGUgZGlyZWN0aXZlIHR5cGUgb3IgdGhlIG5hbWUgdXNlZCBmb3IgcXVlcnlpbmcuXG4gICAqICogKipyZWFkKiogLSBVc2VkIHRvIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50cy5cbiAgICogKiAqKmVtaXREaXN0aW5jdENoYW5nZXNPbmx5KiogLSBUaGUgYCBRdWVyeUxpc3QjY2hhbmdlc2Agb2JzZXJ2YWJsZSB3aWxsIGVtaXQgbmV3IHZhbHVlcyBvbmx5XG4gICAqICAgaWYgdGhlIFF1ZXJ5TGlzdCByZXN1bHQgaGFzIGNoYW5nZWQuIFdoZW4gYGZhbHNlYCB0aGUgYGNoYW5nZXNgIG9ic2VydmFibGUgbWlnaHQgZW1pdCBldmVuXG4gICAqICAgaWYgdGhlIFF1ZXJ5TGlzdCBoYXMgbm90IGNoYW5nZWQuXG4gICAqICAgKiogTm90ZTogKioqIFRoaXMgY29uZmlnIG9wdGlvbiBpcyAqKmRlcHJlY2F0ZWQqKiwgaXQgd2lsbCBiZSBwZXJtYW5lbnRseSBzZXQgdG8gYHRydWVgIGFuZFxuICAgKiByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBBbmd1bGFyLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGRyZW4vdmlld19jaGlsZHJlbl9ob3d0by50cyByZWdpb249J0hvd1RvJ31cbiAgICpcbiAgICogIyMjIEFub3RoZXIgZXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGRyZW4vdmlld19jaGlsZHJlbl9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEluamVjdGlvblRva2VuPHVua25vd24+fEZ1bmN0aW9ufHN0cmluZyxcbiAgIG9wdHM/OiB7cmVhZD86IGFueSwgZW1pdERpc3RpbmN0Q2hhbmdlc09ubHk/OiBib29sZWFufSk6IGFueTtcbiAgbmV3KHNlbGVjdG9yOiBUeXBlPGFueT58SW5qZWN0aW9uVG9rZW48dW5rbm93bj58RnVuY3Rpb258c3RyaW5nLFxuICAgICAgb3B0cz86IHtyZWFkPzogYW55LCBlbWl0RGlzdGluY3RDaGFuZ2VzT25seT86IGJvb2xlYW59KTogVmlld0NoaWxkcmVuO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFZpZXdDaGlsZHJlbiBtZXRhZGF0YS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIFZpZXdDaGlsZHJlbiA9IFF1ZXJ5O1xuXG4vKipcbiAqIFZpZXdDaGlsZHJlbiBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBWaWV3Q2hpbGRyZW46IFZpZXdDaGlsZHJlbkRlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdWaWV3Q2hpbGRyZW4nLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICAgICAgIGZpcnN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICBpc1ZpZXdRdWVyeTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogZW1pdERpc3RpbmN0Q2hhbmdlc09ubHlEZWZhdWx0VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBzZWUgYFZpZXdDaGlsZGAuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NoaWxkRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBQcm9wZXJ0eSBkZWNvcmF0b3IgdGhhdCBjb25maWd1cmVzIGEgdmlldyBxdWVyeS5cbiAgICogVGhlIGNoYW5nZSBkZXRlY3RvciBsb29rcyBmb3IgdGhlIGZpcnN0IGVsZW1lbnQgb3IgdGhlIGRpcmVjdGl2ZSBtYXRjaGluZyB0aGUgc2VsZWN0b3JcbiAgICogaW4gdGhlIHZpZXcgRE9NLiBJZiB0aGUgdmlldyBET00gY2hhbmdlcywgYW5kIGEgbmV3IGNoaWxkIG1hdGNoZXMgdGhlIHNlbGVjdG9yLFxuICAgKiB0aGUgcHJvcGVydHkgaXMgdXBkYXRlZC5cbiAgICpcbiAgICogVmlldyBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlclZpZXdJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIFRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIFVzZWQgdG8gcmVhZCBhIGRpZmZlcmVudCB0b2tlbiBmcm9tIHRoZSBxdWVyaWVkIGVsZW1lbnRzLlxuICAgKiAqICoqc3RhdGljKiogLSBUcnVlIHRvIHJlc29sdmUgcXVlcnkgcmVzdWx0cyBiZWZvcmUgY2hhbmdlIGRldGVjdGlvbiBydW5zLFxuICAgKiBmYWxzZSB0byByZXNvbHZlIGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24uIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIHNlbGVjdG9ycyBhcmUgc3VwcG9ydGVkLlxuICAgKiAgICogQW55IGNsYXNzIHdpdGggdGhlIGBAQ29tcG9uZW50YCBvciBgQERpcmVjdGl2ZWAgZGVjb3JhdG9yXG4gICAqICAgKiBBIHRlbXBsYXRlIHJlZmVyZW5jZSB2YXJpYWJsZSBhcyBhIHN0cmluZyAoZS5nLiBxdWVyeSBgPG15LWNvbXBvbmVudCAjY21wPjwvbXktY29tcG9uZW50PmBcbiAgICogd2l0aCBgQFZpZXdDaGlsZCgnY21wJylgKVxuICAgKiAgICogQW55IHByb3ZpZGVyIGRlZmluZWQgaW4gdGhlIGNoaWxkIGNvbXBvbmVudCB0cmVlIG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudCAoZS5nLlxuICAgKiBgQFZpZXdDaGlsZChTb21lU2VydmljZSkgc29tZVNlcnZpY2U6IFNvbWVTZXJ2aWNlYClcbiAgICogICAqIEFueSBwcm92aWRlciBkZWZpbmVkIHRocm91Z2ggYSBzdHJpbmcgdG9rZW4gKGUuZy4gYEBWaWV3Q2hpbGQoJ3NvbWVUb2tlbicpIHNvbWVUb2tlblZhbDpcbiAgICogYW55YClcbiAgICogICAqIEEgYFRlbXBsYXRlUmVmYCAoZS5nLiBxdWVyeSBgPG5nLXRlbXBsYXRlPjwvbmctdGVtcGxhdGU+YCB3aXRoIGBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKVxuICAgKiB0ZW1wbGF0ZTtgKVxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGQvdmlld19jaGlsZF9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgMlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGQvdmlld19jaGlsZF9ob3d0by50cyByZWdpb249J0hvd1RvJ31cbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEluamVjdGlvblRva2VuPHVua25vd24+fEZ1bmN0aW9ufHN0cmluZyxcbiAgIG9wdHM/OiB7cmVhZD86IGFueSwgc3RhdGljPzogYm9vbGVhbn0pOiBhbnk7XG4gIG5ldyhzZWxlY3RvcjogVHlwZTxhbnk+fEluamVjdGlvblRva2VuPHVua25vd24+fEZ1bmN0aW9ufHN0cmluZyxcbiAgICAgIG9wdHM/OiB7cmVhZD86IGFueSwgc3RhdGljPzogYm9vbGVhbn0pOiBWaWV3Q2hpbGQ7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgVmlld0NoaWxkID0gUXVlcnk7XG5cbi8qKlxuICogVmlld0NoaWxkIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFZpZXdDaGlsZDogVmlld0NoaWxkRGVjb3JhdG9yID0gbWFrZVByb3BEZWNvcmF0b3IoXG4gICAgJ1ZpZXdDaGlsZCcsXG4gICAgKHNlbGVjdG9yOiBhbnksIGRhdGE6IGFueSkgPT5cbiAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pLFxuICAgIFF1ZXJ5KTtcbiJdfQ==