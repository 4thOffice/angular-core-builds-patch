/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '../di/injection_token';
import { makeParamDecorator, makePropDecorator } from '../util/decorators';
/**
 * This token can be used to create a virtual provider that will populate the
 * `entryComponents` fields of components and ng modules based on its `useValue`.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) will be added to the `entryComponents` property.
 *
 * @usageNotes
 * ### Example
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on the router configuration which refers
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
 * @experimental
 */
export const ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken('AnalyzeForEntryComponents');
/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 */
export const Attribute = makeParamDecorator('Attribute', (attributeName) => ({ attributeName }));
/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 */
export class Query {
}
/**
 * ContentChildren decorator and metadata.
 *
 *
 *  @Annotation
 */
export const ContentChildren = makePropDecorator('ContentChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false }, data)), Query);
/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 */
export const ContentChild = makePropDecorator('ContentChild', (selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data)), Query);
/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 */
export const ViewChildren = makePropDecorator('ViewChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true }, data)), Query);
/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 */
export const ViewChild = makePropDecorator('ViewChild', (selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data)), Query);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsT0FBTyxFQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBTSwyQkFBMkIsQ0FBQyxDQUFDO0FBeURqRzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUNsQixrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBYW5GOzs7Ozs7O0dBT0c7QUFDSCxNQUFNO0NBQXdCO0FBbUQ5Qjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBNkIsaUJBQWlCLENBQ3RFLGlCQUFpQixFQUNqQixDQUFDLFFBQWMsRUFBRSxPQUFZLEVBQUUsRUFBRSxFQUFFLENBQy9CLGlCQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssSUFBSyxJQUFJLEVBQUUsRUFDL0UsS0FBSyxDQUFDLENBQUM7QUErQ1g7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQTBCLGlCQUFpQixDQUNoRSxjQUFjLEVBQUUsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsRUFBRSxDQUMvQixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUssSUFBSSxFQUFFLEVBQzdGLEtBQUssQ0FBQyxDQUFDO0FBNkNYOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQTBCLGlCQUFpQixDQUNoRSxjQUFjLEVBQUUsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsRUFBRSxDQUMvQixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUssSUFBSSxFQUFFLEVBQzdGLEtBQUssQ0FBQyxDQUFDO0FBNENYOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQXVCLGlCQUFpQixDQUMxRCxXQUFXLEVBQUUsQ0FBQyxRQUFhLEVBQUUsSUFBUyxFQUFFLEVBQUUsQ0FDekIsaUJBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxJQUFLLElBQUksRUFBRSxFQUN6RixLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi4vZGkvaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge21ha2VQYXJhbURlY29yYXRvciwgbWFrZVByb3BEZWNvcmF0b3J9IGZyb20gJy4uL3V0aWwvZGVjb3JhdG9ycyc7XG5cbi8qKlxuICogVGhpcyB0b2tlbiBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYSB2aXJ0dWFsIHByb3ZpZGVyIHRoYXQgd2lsbCBwb3B1bGF0ZSB0aGVcbiAqIGBlbnRyeUNvbXBvbmVudHNgIGZpZWxkcyBvZiBjb21wb25lbnRzIGFuZCBuZyBtb2R1bGVzIGJhc2VkIG9uIGl0cyBgdXNlVmFsdWVgLlxuICogQWxsIGNvbXBvbmVudHMgdGhhdCBhcmUgcmVmZXJlbmNlZCBpbiB0aGUgYHVzZVZhbHVlYCB2YWx1ZSAoZWl0aGVyIGRpcmVjdGx5XG4gKiBvciBpbiBhIG5lc3RlZCBhcnJheSBvciBtYXApIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGBlbnRyeUNvbXBvbmVudHNgIHByb3BlcnR5LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIGhvdyB0aGUgcm91dGVyIGNhbiBwb3B1bGF0ZSB0aGUgYGVudHJ5Q29tcG9uZW50c2BcbiAqIGZpZWxkIG9mIGFuIE5nTW9kdWxlIGJhc2VkIG9uIHRoZSByb3V0ZXIgY29uZmlndXJhdGlvbiB3aGljaCByZWZlcnNcbiAqIHRvIGNvbXBvbmVudHMuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gaGVscGVyIGZ1bmN0aW9uIGluc2lkZSB0aGUgcm91dGVyXG4gKiBmdW5jdGlvbiBwcm92aWRlUm91dGVzKHJvdXRlcykge1xuICogICByZXR1cm4gW1xuICogICAgIHtwcm92aWRlOiBST1VURVMsIHVzZVZhbHVlOiByb3V0ZXN9LFxuICogICAgIHtwcm92aWRlOiBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTLCB1c2VWYWx1ZTogcm91dGVzLCBtdWx0aTogdHJ1ZX1cbiAqICAgXTtcbiAqIH1cbiAqXG4gKiAvLyB1c2VyIGNvZGVcbiAqIGxldCByb3V0ZXMgPSBbXG4gKiAgIHtwYXRoOiAnL3Jvb3QnLCBjb21wb25lbnQ6IFJvb3RDb21wfSxcbiAqICAge3BhdGg6ICcvdGVhbXMnLCBjb21wb25lbnQ6IFRlYW1zQ29tcH1cbiAqIF07XG4gKlxuICogQE5nTW9kdWxlKHtcbiAqICAgcHJvdmlkZXJzOiBbcHJvdmlkZVJvdXRlcyhyb3V0ZXMpXVxuICogfSlcbiAqIGNsYXNzIE1vZHVsZVdpdGhSb3V0ZXMge31cbiAqIGBgYFxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignQW5hbHl6ZUZvckVudHJ5Q29tcG9uZW50cycpO1xuXG4vKipcbiAqIFR5cGUgb2YgdGhlIEF0dHJpYnV0ZSBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZURlY29yYXRvciB7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhhdCBhIGNvbnN0YW50IGF0dHJpYnV0ZSB2YWx1ZSBzaG91bGQgYmUgaW5qZWN0ZWQuXG4gICAqXG4gICAqIFRoZSBkaXJlY3RpdmUgY2FuIGluamVjdCBjb25zdGFudCBzdHJpbmcgbGl0ZXJhbHMgb2YgaG9zdCBlbGVtZW50IGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFN1cHBvc2Ugd2UgaGF2ZSBhbiBgPGlucHV0PmAgZWxlbWVudCBhbmQgd2FudCB0byBrbm93IGl0cyBgdHlwZWAuXG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gICAqIGBgYFxuICAgKlxuICAgKiBBIGRlY29yYXRvciBjYW4gaW5qZWN0IHN0cmluZyBsaXRlcmFsIGB0ZXh0YCBsaWtlIHNvOlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9tZXRhZGF0YS50cyByZWdpb249J2F0dHJpYnV0ZU1ldGFkYXRhJ31cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgYXMgVHlwZVNjcmlwdCBEZWNvcmF0b3JcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMgcmVnaW9uPSdhdHRyaWJ1dGVGYWN0b3J5J31cbiAgICpcbiAgICogIyMjIEV4YW1wbGUgYXMgRVM1IGFubm90YXRpb25cbiAgICpcbiAgICogYGBgXG4gICAqIHZhciBNeUNvbXBvbmVudCA9IGZ1bmN0aW9uKHRpdGxlKSB7XG4gICAqICAgLi4uXG4gICAqIH07XG4gICAqXG4gICAqIE15Q29tcG9uZW50LmFubm90YXRpb25zID0gW1xuICAgKiAgIG5ldyBuZy5Db21wb25lbnQoey4uLn0pXG4gICAqIF1cbiAgICogTXlDb21wb25lbnQucGFyYW1ldGVycyA9IFtcbiAgICogICBbbmV3IG5nLkF0dHJpYnV0ZSgndGl0bGUnKV1cbiAgICogXVxuICAgKiBgYGBcbiAgICpcbiAgICpcbiAgICovXG4gIChuYW1lOiBzdHJpbmcpOiBhbnk7XG4gIG5ldyAobmFtZTogc3RyaW5nKTogQXR0cmlidXRlO1xufVxuXG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQXR0cmlidXRlIG1ldGFkYXRhLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF0dHJpYnV0ZSB7IGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmc7IH1cblxuLyoqXG4gKiBBdHRyaWJ1dGUgZGVjb3JhdG9yIGFuZCBtZXRhZGF0YS5cbiAqXG4gKiBAQW5ub3RhdGlvblxuICovXG5leHBvcnQgY29uc3QgQXR0cmlidXRlOiBBdHRyaWJ1dGVEZWNvcmF0b3IgPVxuICAgIG1ha2VQYXJhbURlY29yYXRvcignQXR0cmlidXRlJywgKGF0dHJpYnV0ZU5hbWU/OiBzdHJpbmcpID0+ICh7YXR0cmlidXRlTmFtZX0pKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBRdWVyeSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWVyeSB7XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcmVhZDogYW55O1xuICBpc1ZpZXdRdWVyeTogYm9vbGVhbjtcbiAgc2VsZWN0b3I6IGFueTtcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBxdWVyeSBtZXRhZGF0YS5cbiAqXG4gKiBAc2VlIGBDb250ZW50Q2hpbGRyZW5gLlxuICogQHNlZSBgQ29udGVudENoaWxkYC5cbiAqIEBzZWUgYFZpZXdDaGlsZHJlbmAuXG4gKiBAc2VlIGBWaWV3Q2hpbGRgLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUXVlcnkge31cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBDb250ZW50Q2hpbGRyZW4gZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHNlZSBgQ29udGVudENoaWxkcmVuYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250ZW50Q2hpbGRyZW5EZWNvcmF0b3Ige1xuICAvKipcbiAgICogQ29uZmlndXJlcyBhIGNvbnRlbnQgcXVlcnkuXG4gICAqXG4gICAqIFlvdSBjYW4gdXNlIENvbnRlbnRDaGlsZHJlbiB0byBnZXQgdGhlIGBRdWVyeUxpc3RgIG9mIGVsZW1lbnRzIG9yIGRpcmVjdGl2ZXMgZnJvbSB0aGVcbiAgICogY29udGVudCBET00uIEFueSB0aW1lIGEgY2hpbGQgZWxlbWVudCBpcyBhZGRlZCwgcmVtb3ZlZCwgb3IgbW92ZWQsIHRoZSBxdWVyeSBsaXN0IHdpbGwgYmVcbiAgICogdXBkYXRlZCwgYW5kIHRoZSBjaGFuZ2VzIG9ic2VydmFibGUgb2YgdGhlIHF1ZXJ5IGxpc3Qgd2lsbCBlbWl0IGEgbmV3IHZhbHVlLlxuICAgKlxuICAgKiBDb250ZW50IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyQ29udGVudEluaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICpcbiAgICogKipNZXRhZGF0YSBQcm9wZXJ0aWVzKio6XG4gICAqXG4gICAqICogKipzZWxlY3RvcioqIC0gdGhlIGRpcmVjdGl2ZSB0eXBlIG9yIHRoZSBuYW1lIHVzZWQgZm9yIHF1ZXJ5aW5nLlxuICAgKiAqICoqZGVzY2VuZGFudHMqKiAtIGluY2x1ZGUgb25seSBkaXJlY3QgY2hpbGRyZW4gb3IgYWxsIGRlc2NlbmRhbnRzLlxuICAgKiAqICoqcmVhZCoqIC0gcmVhZCBhIGRpZmZlcmVudCB0b2tlbiBmcm9tIHRoZSBxdWVyaWVkIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgQmFzaWMgRXhhbXBsZVxuICAgKlxuICAgKiBIZXJlIGlzIGEgc2ltcGxlIGRlbW9uc3RyYXRpb24gb2YgaG93IHRoZSBgQ29udGVudENoaWxkcmVuYCBkZWNvcmF0b3IgY2FuIGJlIHVzZWQuXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZHJlbi9jb250ZW50X2NoaWxkcmVuX2hvd3RvLnRzIHJlZ2lvbj0nSG93VG8nfVxuICAgKlxuICAgKiAjIyMgVGFiLXBhbmUgRXhhbXBsZVxuICAgKlxuICAgKiBIZXJlIGlzIGEgc2xpZ2h0bHkgbW9yZSByZWFsaXN0aWMgZXhhbXBsZSB0aGF0IHNob3dzIGhvdyBgQ29udGVudENoaWxkcmVuYCBkZWNvcmF0b3JzXG4gICAqIGNhbiBiZSB1c2VkIHRvIGltcGxlbWVudCBhIHRhYiBwYW5lIGNvbXBvbmVudC5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvY29udGVudENoaWxkcmVuL2NvbnRlbnRfY2hpbGRyZW5fZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gICAqXG4gICAqIEBBbm5vdGF0aW9uXG4gICAqL1xuICAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM/OiB7ZGVzY2VuZGFudHM/OiBib29sZWFuLCByZWFkPzogYW55fSk6IGFueTtcbiAgbmV3IChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0cz86IHtkZXNjZW5kYW50cz86IGJvb2xlYW4sIHJlYWQ/OiBhbnl9KTogUXVlcnk7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQ29udGVudENoaWxkcmVuIG1ldGFkYXRhLlxuICpcbiAqXG4gKiBAQW5ub3RhdGlvblxuICovXG5leHBvcnQgdHlwZSBDb250ZW50Q2hpbGRyZW4gPSBRdWVyeTtcblxuLyoqXG4gKiBDb250ZW50Q2hpbGRyZW4gZGVjb3JhdG9yIGFuZCBtZXRhZGF0YS5cbiAqXG4gKlxuICogIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBDb250ZW50Q2hpbGRyZW46IENvbnRlbnRDaGlsZHJlbkRlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdDb250ZW50Q2hpbGRyZW4nLFxuICAgIChzZWxlY3Rvcj86IGFueSwgZGF0YTogYW55ID0ge30pID0+XG4gICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiBmYWxzZSwgaXNWaWV3UXVlcnk6IGZhbHNlLCBkZXNjZW5kYW50czogZmFsc2UsIC4uLmRhdGF9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQ29udGVudENoaWxkIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnRlbnRDaGlsZERlY29yYXRvciB7XG4gIC8qKlxuICAgKiBDb25maWd1cmVzIGEgY29udGVudCBxdWVyeS5cbiAgICpcbiAgICogWW91IGNhbiB1c2UgQ29udGVudENoaWxkIHRvIGdldCB0aGUgZmlyc3QgZWxlbWVudCBvciB0aGUgZGlyZWN0aXZlIG1hdGNoaW5nIHRoZSBzZWxlY3RvciBmcm9tXG4gICAqIHRoZSBjb250ZW50IERPTS4gSWYgdGhlIGNvbnRlbnQgRE9NIGNoYW5nZXMsIGFuZCBhIG5ldyBjaGlsZCBtYXRjaGVzIHRoZSBzZWxlY3RvcixcbiAgICogdGhlIHByb3BlcnR5IHdpbGwgYmUgdXBkYXRlZC5cbiAgICpcbiAgICogQ29udGVudCBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlckNvbnRlbnRJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIHRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9jb250ZW50Q2hpbGQvY29udGVudF9jaGlsZF9ob3d0by50cyByZWdpb249J0hvd1RvJ31cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvY29udGVudENoaWxkL2NvbnRlbnRfY2hpbGRfZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gICAqXG4gICAqIEBBbm5vdGF0aW9uXG4gICAqL1xuICAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM/OiB7cmVhZD86IGFueX0pOiBhbnk7XG4gIG5ldyAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM/OiB7cmVhZD86IGFueX0pOiBDb250ZW50Q2hpbGQ7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgQ29udGVudENoaWxkIG1ldGFkYXRhLlxuICpcbiAqIEBzZWUgYENvbnRlbnRDaGlsZGAuXG4gKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgQ29udGVudENoaWxkID0gUXVlcnk7XG5cbi8qKlxuICogQ29udGVudENoaWxkIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBDb250ZW50Q2hpbGQ6IENvbnRlbnRDaGlsZERlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdDb250ZW50Q2hpbGQnLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkcmVuIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBzZWUgYFZpZXdDaGlsZHJlbmAuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWaWV3Q2hpbGRyZW5EZWNvcmF0b3Ige1xuICAvKipcbiAgICogQ29uZmlndXJlcyBhIHZpZXcgcXVlcnkuXG4gICAqXG4gICAqIFlvdSBjYW4gdXNlIFZpZXdDaGlsZHJlbiB0byBnZXQgdGhlIGBRdWVyeUxpc3RgIG9mIGVsZW1lbnRzIG9yIGRpcmVjdGl2ZXMgZnJvbSB0aGVcbiAgICogdmlldyBET00uIEFueSB0aW1lIGEgY2hpbGQgZWxlbWVudCBpcyBhZGRlZCwgcmVtb3ZlZCwgb3IgbW92ZWQsIHRoZSBxdWVyeSBsaXN0IHdpbGwgYmUgdXBkYXRlZCxcbiAgICogYW5kIHRoZSBjaGFuZ2VzIG9ic2VydmFibGUgb2YgdGhlIHF1ZXJ5IGxpc3Qgd2lsbCBlbWl0IGEgbmV3IHZhbHVlLlxuICAgKlxuICAgKiBWaWV3IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyVmlld0luaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICpcbiAgICogKipNZXRhZGF0YSBQcm9wZXJ0aWVzKio6XG4gICAqXG4gICAqICogKipzZWxlY3RvcioqIC0gdGhlIGRpcmVjdGl2ZSB0eXBlIG9yIHRoZSBuYW1lIHVzZWQgZm9yIHF1ZXJ5aW5nLlxuICAgKiAqICoqcmVhZCoqIC0gcmVhZCBhIGRpZmZlcmVudCB0b2tlbiBmcm9tIHRoZSBxdWVyaWVkIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGRyZW4vdmlld19jaGlsZHJlbl9ob3d0by50cyByZWdpb249J0hvd1RvJ31cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvdmlld0NoaWxkcmVuL3ZpZXdfY2hpbGRyZW5fZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gICAqXG4gICAqIEBBbm5vdGF0aW9uXG4gICAqL1xuICAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM/OiB7cmVhZD86IGFueX0pOiBhbnk7XG4gIG5ldyAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM/OiB7cmVhZD86IGFueX0pOiBWaWV3Q2hpbGRyZW47XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkcmVuIG1ldGFkYXRhLlxuICovXG5leHBvcnQgdHlwZSBWaWV3Q2hpbGRyZW4gPSBRdWVyeTtcblxuLyoqXG4gKiBWaWV3Q2hpbGRyZW4gZGVjb3JhdG9yIGFuZCBtZXRhZGF0YS5cbiAqXG4gKiBAQW5ub3RhdGlvblxuICovXG5leHBvcnQgY29uc3QgVmlld0NoaWxkcmVuOiBWaWV3Q2hpbGRyZW5EZWNvcmF0b3IgPSBtYWtlUHJvcERlY29yYXRvcihcbiAgICAnVmlld0NoaWxkcmVuJywgKHNlbGVjdG9yPzogYW55LCBkYXRhOiBhbnkgPSB7fSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICh7c2VsZWN0b3IsIGZpcnN0OiBmYWxzZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSksXG4gICAgUXVlcnkpO1xuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFZpZXdDaGlsZCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAc2VlIGBWaWV3Q2hpbGRgLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdDaGlsZERlY29yYXRvciB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQ29uZmlndXJlcyBhIHZpZXcgcXVlcnkuXG4gICAqXG4gICAqIFlvdSBjYW4gdXNlIFZpZXdDaGlsZCB0byBnZXQgdGhlIGZpcnN0IGVsZW1lbnQgb3IgdGhlIGRpcmVjdGl2ZSBtYXRjaGluZyB0aGUgc2VsZWN0b3IgZnJvbSB0aGVcbiAgICogdmlldyBET00uIElmIHRoZSB2aWV3IERPTSBjaGFuZ2VzLCBhbmQgYSBuZXcgY2hpbGQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IsXG4gICAqIHRoZSBwcm9wZXJ0eSB3aWxsIGJlIHVwZGF0ZWQuXG4gICAqXG4gICAqIFZpZXcgcXVlcmllcyBhcmUgc2V0IGJlZm9yZSB0aGUgYG5nQWZ0ZXJWaWV3SW5pdGAgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICAgKlxuICAgKiAqKk1ldGFkYXRhIFByb3BlcnRpZXMqKjpcbiAgICpcbiAgICogKiAqKnNlbGVjdG9yKiogLSB0aGUgZGlyZWN0aXZlIHR5cGUgb3IgdGhlIG5hbWUgdXNlZCBmb3IgcXVlcnlpbmcuXG4gICAqICogKipyZWFkKiogLSByZWFkIGEgZGlmZmVyZW50IHRva2VuIGZyb20gdGhlIHF1ZXJpZWQgZWxlbWVudHMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3ZpZXdDaGlsZC92aWV3X2NoaWxkX2hvd3RvLnRzIHJlZ2lvbj0nSG93VG8nfVxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGQvdmlld19jaGlsZF9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0cz86IHtyZWFkPzogYW55fSk6IGFueTtcbiAgbmV3IChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0cz86IHtyZWFkPzogYW55fSk6IFZpZXdDaGlsZDtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBWaWV3Q2hpbGQgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCB0eXBlIFZpZXdDaGlsZCA9IFF1ZXJ5O1xuXG4vKipcbiAqIFZpZXdDaGlsZCBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBWaWV3Q2hpbGQ6IFZpZXdDaGlsZERlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdWaWV3Q2hpbGQnLCAoc2VsZWN0b3I6IGFueSwgZGF0YTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiB0cnVlLCBkZXNjZW5kYW50czogdHJ1ZSwgLi4uZGF0YX0pLFxuICAgIFF1ZXJ5KTtcbiJdfQ==