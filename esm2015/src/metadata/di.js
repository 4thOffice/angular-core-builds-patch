/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
 * \@NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * \@experimental
 */
export const /** @type {?} */ ANALYZE_FOR_ENTRY_COMPONENTS = new InjectionToken('AnalyzeForEntryComponents');
/**
 * Type of the Attribute decorator / constructor function.
 *
 *
 * @record
 */
export function AttributeDecorator() { }
function AttributeDecorator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (name: string): any;
    */
    /* TODO: handle strange member:
    new (name: string): Attribute;
    */
}
/**
 * Attribute decorator and metadata.
 *
 *
 * \@Annotation
 */
export const /** @type {?} */ Attribute = makeParamDecorator('Attribute', (attributeName) => ({ attributeName }));
/**
 * Base class for query metadata.
 *
 * See {\@link ContentChildren}, {\@link ContentChild}, {\@link ViewChildren}, {\@link ViewChild} for
 * more information.
 *
 *
 * @abstract
 */
export class Query {
}
/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * See {\@link ContentChildren}.
 *
 *
 * @record
 */
export function ContentChildrenDecorator() { }
function ContentChildrenDecorator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (selector: Type<any>|Function|string, opts?: {descendants?: boolean, read?: any}): any;
    */
    /* TODO: handle strange member:
    new (selector: Type<any>|Function|string, opts?: {descendants?: boolean, read?: any}): Query;
    */
}
/**
 * ContentChildren decorator and metadata.
 *
 *
 * \@Annotation
 */
export const /** @type {?} */ ContentChildren = makePropDecorator('ContentChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: false, descendants: false }, data)), Query);
/**
 * Type of the ContentChild decorator / constructor function.
 *
 *
 *
 * @record
 */
export function ContentChildDecorator() { }
function ContentChildDecorator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (selector: Type<any>|Function|string, opts?: {read?: any}): any;
    */
    /* TODO: handle strange member:
    new (selector: Type<any>|Function|string, opts?: {read?: any}): ContentChild;
    */
}
/**
 * ContentChild decorator and metadata.
 *
 *
 * \@Annotation
 */
export const /** @type {?} */ ContentChild = makePropDecorator('ContentChild', (selector, data = {}) => (Object.assign({ selector, first: true, isViewQuery: false, descendants: true }, data)), Query);
/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * See {\@link ViewChildren}.
 *
 *
 * @record
 */
export function ViewChildrenDecorator() { }
function ViewChildrenDecorator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (selector: Type<any>|Function|string, opts?: {read?: any}): any;
    */
    /* TODO: handle strange member:
    new (selector: Type<any>|Function|string, opts?: {read?: any}): ViewChildren;
    */
}
/**
 * ViewChildren decorator and metadata.
 *
 *
 * \@Annotation
 */
export const /** @type {?} */ ViewChildren = makePropDecorator('ViewChildren', (selector, data = {}) => (Object.assign({ selector, first: false, isViewQuery: true, descendants: true }, data)), Query);
/**
 * Type of the ViewChild decorator / constructor function.
 *
 * See {\@link ViewChild}
 *
 *
 * @record
 */
export function ViewChildDecorator() { }
function ViewChildDecorator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    (selector: Type<any>|Function|string, opts?: {read?: any}): any;
    */
    /* TODO: handle strange member:
    new (selector: Type<any>|Function|string, opts?: {read?: any}): ViewChild;
    */
}
/**
 * ViewChild decorator and metadata.
 *
 *
 * \@Annotation
 */
export const /** @type {?} */ ViewChild = makePropDecorator('ViewChild', (selector, data) => (Object.assign({ selector, first: true, isViewQuery: true, descendants: true }, data)), Query);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9tZXRhZGF0YS9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ3pFLE1BQU0sQ0FBQyx1QkFBTSw0QkFBNEIsR0FBRyxJQUFJLGNBQWMsQ0FBTSwyQkFBMkIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOERqRyxNQUFNLENBQUMsdUJBQU0sU0FBUyxHQUNsQixrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FBdUJuRixNQUFNO0NBQXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyRDlCLE1BQU0sQ0FBQyx1QkFBTSxlQUFlLEdBQTZCLGlCQUFpQixDQUN0RSxpQkFBaUIsRUFDakIsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsRUFBRSxDQUMvQixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLElBQUssSUFBSSxFQUFFLEVBQy9FLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlEWCxNQUFNLENBQUMsdUJBQU0sWUFBWSxHQUEwQixpQkFBaUIsQ0FDaEUsY0FBYyxFQUFFLENBQUMsUUFBYyxFQUFFLE9BQVksRUFBRSxFQUFFLEVBQUUsQ0FDL0IsaUJBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxJQUFLLElBQUksRUFBRSxFQUM3RixLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0RYLE1BQU0sQ0FBQyx1QkFBTSxZQUFZLEdBQTBCLGlCQUFpQixDQUNoRSxjQUFjLEVBQUUsQ0FBQyxRQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsRUFBRSxDQUMvQixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUssSUFBSSxFQUFFLEVBQzdGLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzRFgsTUFBTSxDQUFDLHVCQUFNLFNBQVMsR0FBdUIsaUJBQWlCLENBQzFELFdBQVcsRUFBRSxDQUFDLFFBQWEsRUFBRSxJQUFTLEVBQUUsRUFBRSxDQUN6QixpQkFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLElBQUssSUFBSSxFQUFFLEVBQ3pGLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7bWFrZVBhcmFtRGVjb3JhdG9yLCBtYWtlUHJvcERlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuLyoqXG4gKiBUaGlzIHRva2VuIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhIHZpcnR1YWwgcHJvdmlkZXIgdGhhdCB3aWxsIHBvcHVsYXRlIHRoZVxuICogYGVudHJ5Q29tcG9uZW50c2AgZmllbGRzIG9mIGNvbXBvbmVudHMgYW5kIG5nIG1vZHVsZXMgYmFzZWQgb24gaXRzIGB1c2VWYWx1ZWAuXG4gKiBBbGwgY29tcG9uZW50cyB0aGF0IGFyZSByZWZlcmVuY2VkIGluIHRoZSBgdXNlVmFsdWVgIHZhbHVlIChlaXRoZXIgZGlyZWN0bHlcbiAqIG9yIGluIGEgbmVzdGVkIGFycmF5IG9yIG1hcCkgd2lsbCBiZSBhZGRlZCB0byB0aGUgYGVudHJ5Q29tcG9uZW50c2AgcHJvcGVydHkuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyBob3cgdGhlIHJvdXRlciBjYW4gcG9wdWxhdGUgdGhlIGBlbnRyeUNvbXBvbmVudHNgXG4gKiBmaWVsZCBvZiBhbiBOZ01vZHVsZSBiYXNlZCBvbiB0aGUgcm91dGVyIGNvbmZpZ3VyYXRpb24gd2hpY2ggcmVmZXJzXG4gKiB0byBjb21wb25lbnRzLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIGhlbHBlciBmdW5jdGlvbiBpbnNpZGUgdGhlIHJvdXRlclxuICogZnVuY3Rpb24gcHJvdmlkZVJvdXRlcyhyb3V0ZXMpIHtcbiAqICAgcmV0dXJuIFtcbiAqICAgICB7cHJvdmlkZTogUk9VVEVTLCB1c2VWYWx1ZTogcm91dGVzfSxcbiAqICAgICB7cHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgdXNlVmFsdWU6IHJvdXRlcywgbXVsdGk6IHRydWV9XG4gKiAgIF07XG4gKiB9XG4gKlxuICogLy8gdXNlciBjb2RlXG4gKiBsZXQgcm91dGVzID0gW1xuICogICB7cGF0aDogJy9yb290JywgY29tcG9uZW50OiBSb290Q29tcH0sXG4gKiAgIHtwYXRoOiAnL3RlYW1zJywgY29tcG9uZW50OiBUZWFtc0NvbXB9XG4gKiBdO1xuICpcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIHByb3ZpZGVyczogW3Byb3ZpZGVSb3V0ZXMocm91dGVzKV1cbiAqIH0pXG4gKiBjbGFzcyBNb2R1bGVXaXRoUm91dGVzIHt9XG4gKiBgYGBcbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBBTkFMWVpFX0ZPUl9FTlRSWV9DT01QT05FTlRTID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ0FuYWx5emVGb3JFbnRyeUNvbXBvbmVudHMnKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBBdHRyaWJ1dGUgZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogU3BlY2lmaWVzIHRoYXQgYSBjb25zdGFudCBhdHRyaWJ1dGUgdmFsdWUgc2hvdWxkIGJlIGluamVjdGVkLlxuICAgKlxuICAgKiBUaGUgZGlyZWN0aXZlIGNhbiBpbmplY3QgY29uc3RhbnQgc3RyaW5nIGxpdGVyYWxzIG9mIGhvc3QgZWxlbWVudCBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBTdXBwb3NlIHdlIGhhdmUgYW4gYDxpbnB1dD5gIGVsZW1lbnQgYW5kIHdhbnQgdG8ga25vdyBpdHMgYHR5cGVgLlxuICAgKlxuICAgKiBgYGBodG1sXG4gICAqIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICAgKiBgYGBcbiAgICpcbiAgICogQSBkZWNvcmF0b3IgY2FuIGluamVjdCBzdHJpbmcgbGl0ZXJhbCBgdGV4dGAgbGlrZSBzbzpcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMgcmVnaW9uPSdhdHRyaWJ1dGVNZXRhZGF0YSd9XG4gICAqXG4gICAqICMjIyBFeGFtcGxlIGFzIFR5cGVTY3JpcHQgRGVjb3JhdG9yXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL21ldGFkYXRhLnRzIHJlZ2lvbj0nYXR0cmlidXRlRmFjdG9yeSd9XG4gICAqXG4gICAqICMjIyBFeGFtcGxlIGFzIEVTNSBhbm5vdGF0aW9uXG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgTXlDb21wb25lbnQgPSBmdW5jdGlvbih0aXRsZSkge1xuICAgKiAgIC4uLlxuICAgKiB9O1xuICAgKlxuICAgKiBNeUNvbXBvbmVudC5hbm5vdGF0aW9ucyA9IFtcbiAgICogICBuZXcgbmcuQ29tcG9uZW50KHsuLi59KVxuICAgKiBdXG4gICAqIE15Q29tcG9uZW50LnBhcmFtZXRlcnMgPSBbXG4gICAqICAgW25ldyBuZy5BdHRyaWJ1dGUoJ3RpdGxlJyldXG4gICAqIF1cbiAgICogYGBgXG4gICAqXG4gICAqXG4gICAqL1xuICAobmFtZTogc3RyaW5nKTogYW55O1xuICBuZXcgKG5hbWU6IHN0cmluZyk6IEF0dHJpYnV0ZTtcbn1cblxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIEF0dHJpYnV0ZSBtZXRhZGF0YS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdHRyaWJ1dGUgeyBhdHRyaWJ1dGVOYW1lPzogc3RyaW5nOyB9XG5cbi8qKlxuICogQXR0cmlidXRlIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBBdHRyaWJ1dGU6IEF0dHJpYnV0ZURlY29yYXRvciA9XG4gICAgbWFrZVBhcmFtRGVjb3JhdG9yKCdBdHRyaWJ1dGUnLCAoYXR0cmlidXRlTmFtZT86IHN0cmluZykgPT4gKHthdHRyaWJ1dGVOYW1lfSkpO1xuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFF1ZXJ5IG1ldGFkYXRhLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnkge1xuICBkZXNjZW5kYW50czogYm9vbGVhbjtcbiAgZmlyc3Q6IGJvb2xlYW47XG4gIHJlYWQ6IGFueTtcbiAgaXNWaWV3UXVlcnk6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBhbnk7XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgcXVlcnkgbWV0YWRhdGEuXG4gKlxuICogU2VlIHtAbGluayBDb250ZW50Q2hpbGRyZW59LCB7QGxpbmsgQ29udGVudENoaWxkfSwge0BsaW5rIFZpZXdDaGlsZHJlbn0sIHtAbGluayBWaWV3Q2hpbGR9IGZvclxuICogbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUXVlcnkge31cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBDb250ZW50Q2hpbGRyZW4gZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogU2VlIHtAbGluayBDb250ZW50Q2hpbGRyZW59LlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGVudENoaWxkcmVuRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZHJlbi9jb250ZW50X2NoaWxkcmVuX2hvd3RvLnRzIHJlZ2lvbj0nSG93VG8nfVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQ29uZmlndXJlcyBhIGNvbnRlbnQgcXVlcnkuXG4gICAqXG4gICAqIFlvdSBjYW4gdXNlIENvbnRlbnRDaGlsZHJlbiB0byBnZXQgdGhlIHtAbGluayBRdWVyeUxpc3R9IG9mIGVsZW1lbnRzIG9yIGRpcmVjdGl2ZXMgZnJvbSB0aGVcbiAgICogY29udGVudCBET00uIEFueSB0aW1lIGEgY2hpbGQgZWxlbWVudCBpcyBhZGRlZCwgcmVtb3ZlZCwgb3IgbW92ZWQsIHRoZSBxdWVyeSBsaXN0IHdpbGwgYmVcbiAgICogdXBkYXRlZCxcbiAgICogYW5kIHRoZSBjaGFuZ2VzIG9ic2VydmFibGUgb2YgdGhlIHF1ZXJ5IGxpc3Qgd2lsbCBlbWl0IGEgbmV3IHZhbHVlLlxuICAgKlxuICAgKiBDb250ZW50IHF1ZXJpZXMgYXJlIHNldCBiZWZvcmUgdGhlIGBuZ0FmdGVyQ29udGVudEluaXRgIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICpcbiAgICogKipNZXRhZGF0YSBQcm9wZXJ0aWVzKio6XG4gICAqXG4gICAqICogKipzZWxlY3RvcioqIC0gdGhlIGRpcmVjdGl2ZSB0eXBlIG9yIHRoZSBuYW1lIHVzZWQgZm9yIHF1ZXJ5aW5nLlxuICAgKiAqICoqZGVzY2VuZGFudHMqKiAtIGluY2x1ZGUgb25seSBkaXJlY3QgY2hpbGRyZW4gb3IgYWxsIGRlc2NlbmRhbnRzLlxuICAgKiAqICoqcmVhZCoqIC0gcmVhZCBhIGRpZmZlcmVudCB0b2tlbiBmcm9tIHRoZSBxdWVyaWVkIGVsZW1lbnRzLlxuICAgKlxuICAgKiBMZXQncyBsb29rIGF0IGFuIGV4YW1wbGU6XG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZHJlbi9jb250ZW50X2NoaWxkcmVuX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICAgKlxuICAgKiAqKm5wbSBwYWNrYWdlKio6IGBAYW5ndWxhci9jb3JlYFxuICAgKlxuICAgKlxuICAgKiBAQW5ub3RhdGlvblxuICAgKi9cbiAgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge2Rlc2NlbmRhbnRzPzogYm9vbGVhbiwgcmVhZD86IGFueX0pOiBhbnk7XG4gIG5ldyAoc2VsZWN0b3I6IFR5cGU8YW55PnxGdW5jdGlvbnxzdHJpbmcsIG9wdHM/OiB7ZGVzY2VuZGFudHM/OiBib29sZWFuLCByZWFkPzogYW55fSk6IFF1ZXJ5O1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZHJlbiBtZXRhZGF0YS5cbiAqXG4gKlxuICogQEFubm90YXRpb25cbiAqL1xuZXhwb3J0IHR5cGUgQ29udGVudENoaWxkcmVuID0gUXVlcnk7XG5cbi8qKlxuICogQ29udGVudENoaWxkcmVuIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICpcbiAqICBAQW5ub3RhdGlvblxuICovXG5leHBvcnQgY29uc3QgQ29udGVudENoaWxkcmVuOiBDb250ZW50Q2hpbGRyZW5EZWNvcmF0b3IgPSBtYWtlUHJvcERlY29yYXRvcihcbiAgICAnQ29udGVudENoaWxkcmVuJyxcbiAgICAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogZmFsc2UsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IGZhbHNlLCAuLi5kYXRhfSksXG4gICAgUXVlcnkpO1xuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250ZW50Q2hpbGREZWNvcmF0b3Ige1xuICAvKipcbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvY29udGVudENoaWxkL2NvbnRlbnRfY2hpbGRfaG93dG8udHMgcmVnaW9uPSdIb3dUbyd9XG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBDb25maWd1cmVzIGEgY29udGVudCBxdWVyeS5cbiAgICpcbiAgICogWW91IGNhbiB1c2UgQ29udGVudENoaWxkIHRvIGdldCB0aGUgZmlyc3QgZWxlbWVudCBvciB0aGUgZGlyZWN0aXZlIG1hdGNoaW5nIHRoZSBzZWxlY3RvciBmcm9tXG4gICAqIHRoZSBjb250ZW50IERPTS4gSWYgdGhlIGNvbnRlbnQgRE9NIGNoYW5nZXMsIGFuZCBhIG5ldyBjaGlsZCBtYXRjaGVzIHRoZSBzZWxlY3RvcixcbiAgICogdGhlIHByb3BlcnR5IHdpbGwgYmUgdXBkYXRlZC5cbiAgICpcbiAgICogQ29udGVudCBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlckNvbnRlbnRJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIHRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50LlxuICAgKlxuICAgKiBMZXQncyBsb29rIGF0IGFuIGV4YW1wbGU6XG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2NvbnRlbnRDaGlsZC9jb250ZW50X2NoaWxkX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICAgKlxuICAgKiAqKm5wbSBwYWNrYWdlKio6IGBAYW5ndWxhci9jb3JlYFxuICAgKlxuICAgKlxuICAgKiBAQW5ub3RhdGlvblxuICAgKi9cbiAgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge3JlYWQ/OiBhbnl9KTogYW55O1xuICBuZXcgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge3JlYWQ/OiBhbnl9KTogQ29udGVudENoaWxkO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIENvbnRlbnRDaGlsZCBtZXRhZGF0YS5cbiAqXG4gKiBTZWUge0BsaW5rIENvbnRlbnRDaGlsZH0uXG4gKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgQ29udGVudENoaWxkID0gUXVlcnk7XG5cbi8qKlxuICogQ29udGVudENoaWxkIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBDb250ZW50Q2hpbGQ6IENvbnRlbnRDaGlsZERlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdDb250ZW50Q2hpbGQnLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IHRydWUsIGlzVmlld1F1ZXJ5OiBmYWxzZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkcmVuIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIFNlZSB7QGxpbmsgVmlld0NoaWxkcmVufS5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdDaGlsZHJlbkRlY29yYXRvciB7XG4gIC8qKlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGRyZW4vdmlld19jaGlsZHJlbl9ob3d0by50cyByZWdpb249J0hvd1RvJ31cbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIENvbmZpZ3VyZXMgYSB2aWV3IHF1ZXJ5LlxuICAgKlxuICAgKiBZb3UgY2FuIHVzZSBWaWV3Q2hpbGRyZW4gdG8gZ2V0IHRoZSB7QGxpbmsgUXVlcnlMaXN0fSBvZiBlbGVtZW50cyBvciBkaXJlY3RpdmVzIGZyb20gdGhlXG4gICAqIHZpZXcgRE9NLiBBbnkgdGltZSBhIGNoaWxkIGVsZW1lbnQgaXMgYWRkZWQsIHJlbW92ZWQsIG9yIG1vdmVkLCB0aGUgcXVlcnkgbGlzdCB3aWxsIGJlIHVwZGF0ZWQsXG4gICAqIGFuZCB0aGUgY2hhbmdlcyBvYnNlcnZhYmxlIG9mIHRoZSBxdWVyeSBsaXN0IHdpbGwgZW1pdCBhIG5ldyB2YWx1ZS5cbiAgICpcbiAgICogVmlldyBxdWVyaWVzIGFyZSBzZXQgYmVmb3JlIHRoZSBgbmdBZnRlclZpZXdJbml0YCBjYWxsYmFjayBpcyBjYWxsZWQuXG4gICAqXG4gICAqICoqTWV0YWRhdGEgUHJvcGVydGllcyoqOlxuICAgKlxuICAgKiAqICoqc2VsZWN0b3IqKiAtIHRoZSBkaXJlY3RpdmUgdHlwZSBvciB0aGUgbmFtZSB1c2VkIGZvciBxdWVyeWluZy5cbiAgICogKiAqKnJlYWQqKiAtIHJlYWQgYSBkaWZmZXJlbnQgdG9rZW4gZnJvbSB0aGUgcXVlcmllZCBlbGVtZW50cy5cbiAgICpcbiAgICogTGV0J3MgbG9vayBhdCBhbiBleGFtcGxlOlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy92aWV3Q2hpbGRyZW4vdmlld19jaGlsZHJlbl9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAgICpcbiAgICogKipucG0gcGFja2FnZSoqOiBgQGFuZ3VsYXIvY29yZWBcbiAgICpcbiAgICpcbiAgICogQEFubm90YXRpb25cbiAgICovXG4gIChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0cz86IHtyZWFkPzogYW55fSk6IGFueTtcbiAgbmV3IChzZWxlY3RvcjogVHlwZTxhbnk+fEZ1bmN0aW9ufHN0cmluZywgb3B0cz86IHtyZWFkPzogYW55fSk6IFZpZXdDaGlsZHJlbjtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBWaWV3Q2hpbGRyZW4gbWV0YWRhdGEuXG4gKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgVmlld0NoaWxkcmVuID0gUXVlcnk7XG5cbi8qKlxuICogVmlld0NoaWxkcmVuIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBWaWV3Q2hpbGRyZW46IFZpZXdDaGlsZHJlbkRlY29yYXRvciA9IG1ha2VQcm9wRGVjb3JhdG9yKFxuICAgICdWaWV3Q2hpbGRyZW4nLCAoc2VsZWN0b3I/OiBhbnksIGRhdGE6IGFueSA9IHt9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgKHtzZWxlY3RvciwgZmlyc3Q6IGZhbHNlLCBpc1ZpZXdRdWVyeTogdHJ1ZSwgZGVzY2VuZGFudHM6IHRydWUsIC4uLmRhdGF9KSxcbiAgICBRdWVyeSk7XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgVmlld0NoaWxkIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIFNlZSB7QGxpbmsgVmlld0NoaWxkfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NoaWxkRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3ZpZXdDaGlsZC92aWV3X2NoaWxkX2hvd3RvLnRzIHJlZ2lvbj0nSG93VG8nfVxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQ29uZmlndXJlcyBhIHZpZXcgcXVlcnkuXG4gICAqXG4gICAqIFlvdSBjYW4gdXNlIFZpZXdDaGlsZCB0byBnZXQgdGhlIGZpcnN0IGVsZW1lbnQgb3IgdGhlIGRpcmVjdGl2ZSBtYXRjaGluZyB0aGUgc2VsZWN0b3IgZnJvbSB0aGVcbiAgICogdmlldyBET00uIElmIHRoZSB2aWV3IERPTSBjaGFuZ2VzLCBhbmQgYSBuZXcgY2hpbGQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IsXG4gICAqIHRoZSBwcm9wZXJ0eSB3aWxsIGJlIHVwZGF0ZWQuXG4gICAqXG4gICAqIFZpZXcgcXVlcmllcyBhcmUgc2V0IGJlZm9yZSB0aGUgYG5nQWZ0ZXJWaWV3SW5pdGAgY2FsbGJhY2sgaXMgY2FsbGVkLlxuICAgKlxuICAgKiAqKk1ldGFkYXRhIFByb3BlcnRpZXMqKjpcbiAgICpcbiAgICogKiAqKnNlbGVjdG9yKiogLSB0aGUgZGlyZWN0aXZlIHR5cGUgb3IgdGhlIG5hbWUgdXNlZCBmb3IgcXVlcnlpbmcuXG4gICAqICogKipyZWFkKiogLSByZWFkIGEgZGlmZmVyZW50IHRva2VuIGZyb20gdGhlIHF1ZXJpZWQgZWxlbWVudHMuXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3ZpZXdDaGlsZC92aWV3X2NoaWxkX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICAgKlxuICAgKiAqKm5wbSBwYWNrYWdlKio6IGBAYW5ndWxhci9jb3JlYFxuICAgKlxuICAgKlxuICAgKiBAQW5ub3RhdGlvblxuICAgKi9cbiAgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge3JlYWQ/OiBhbnl9KTogYW55O1xuICBuZXcgKHNlbGVjdG9yOiBUeXBlPGFueT58RnVuY3Rpb258c3RyaW5nLCBvcHRzPzoge3JlYWQ/OiBhbnl9KTogVmlld0NoaWxkO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFZpZXdDaGlsZCBtZXRhZGF0YS5cbiAqXG4gKlxuICovXG5leHBvcnQgdHlwZSBWaWV3Q2hpbGQgPSBRdWVyeTtcblxuLyoqXG4gKiBWaWV3Q2hpbGQgZGVjb3JhdG9yIGFuZCBtZXRhZGF0YS5cbiAqXG4gKlxuICogQEFubm90YXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFZpZXdDaGlsZDogVmlld0NoaWxkRGVjb3JhdG9yID0gbWFrZVByb3BEZWNvcmF0b3IoXG4gICAgJ1ZpZXdDaGlsZCcsIChzZWxlY3RvcjogYW55LCBkYXRhOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICAgICAoe3NlbGVjdG9yLCBmaXJzdDogdHJ1ZSwgaXNWaWV3UXVlcnk6IHRydWUsIGRlc2NlbmRhbnRzOiB0cnVlLCAuLi5kYXRhfSksXG4gICAgUXVlcnkpO1xuIl19