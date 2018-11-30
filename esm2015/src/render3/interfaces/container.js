/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HOST, NEXT, PARENT, QUERIES } from './view';
/** *
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
  @type {?} */
export const ACTIVE_INDEX = 0;
/** @type {?} */
export const VIEWS = 1;
/** @type {?} */
export const NATIVE = 6;
/** @type {?} */
export const RENDER_PARENT = 7;
/**
 * The state associated with a container.
 *
 * This is an array so that its structure is closer to LView. This helps
 * when traversing the view tree (which is a mix of containers and component
 * views), so we can jump to viewOrContainer[NEXT] in the same way regardless
 * of type.
 * @record
 */
export function LContainer() { }
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVdBLE9BQU8sRUFBQyxJQUFJLEVBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7OztBQVExRCxhQUFhLFlBQVksR0FBRyxDQUFDLENBQUM7O0FBQzlCLGFBQWEsS0FBSyxHQUFHLENBQUMsQ0FBQzs7QUFHdkIsYUFBYSxNQUFNLEdBQUcsQ0FBQyxDQUFDOztBQUN4QixhQUFhLGFBQWEsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQXNGL0IsYUFBYSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TFF1ZXJpZXN9IGZyb20gJy4vcXVlcnknO1xuaW1wb3J0IHtSQ29tbWVudCwgUkVsZW1lbnR9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtTdHlsaW5nQ29udGV4dH0gZnJvbSAnLi9zdHlsaW5nJztcbmltcG9ydCB7SE9TVCwgTFZpZXcsIE5FWFQsIFBBUkVOVCwgUVVFUklFU30gZnJvbSAnLi92aWV3JztcblxuXG4vKipcbiAqIEJlbG93IGFyZSBjb25zdGFudHMgZm9yIExDb250YWluZXIgaW5kaWNlcyB0byBoZWxwIHVzIGxvb2sgdXAgTENvbnRhaW5lciBtZW1iZXJzXG4gKiB3aXRob3V0IGhhdmluZyB0byByZW1lbWJlciB0aGUgc3BlY2lmaWMgaW5kaWNlcy5cbiAqIFVnbGlmeSB3aWxsIGlubGluZSB0aGVzZSB3aGVuIG1pbmlmeWluZyBzbyB0aGVyZSBzaG91bGRuJ3QgYmUgYSBjb3N0LlxuICovXG5leHBvcnQgY29uc3QgQUNUSVZFX0lOREVYID0gMDtcbmV4cG9ydCBjb25zdCBWSUVXUyA9IDE7XG4vLyBQQVJFTlQsIE5FWFQsIFFVRVJJRVMsIGFuZCBIT1NUIGFyZSBpbmRpY2VzIDIsIDMsIDQsIGFuZCA1LlxuLy8gQXMgd2UgYWxyZWFkeSBoYXZlIHRoZXNlIGNvbnN0YW50cyBpbiBMVmlldywgd2UgZG9uJ3QgbmVlZCB0byByZS1jcmVhdGUgdGhlbS5cbmV4cG9ydCBjb25zdCBOQVRJVkUgPSA2O1xuZXhwb3J0IGNvbnN0IFJFTkRFUl9QQVJFTlQgPSA3O1xuXG4vKipcbiAqIFRoZSBzdGF0ZSBhc3NvY2lhdGVkIHdpdGggYSBjb250YWluZXIuXG4gKlxuICogVGhpcyBpcyBhbiBhcnJheSBzbyB0aGF0IGl0cyBzdHJ1Y3R1cmUgaXMgY2xvc2VyIHRvIExWaWV3LiBUaGlzIGhlbHBzXG4gKiB3aGVuIHRyYXZlcnNpbmcgdGhlIHZpZXcgdHJlZSAod2hpY2ggaXMgYSBtaXggb2YgY29udGFpbmVycyBhbmQgY29tcG9uZW50XG4gKiB2aWV3cyksIHNvIHdlIGNhbiBqdW1wIHRvIHZpZXdPckNvbnRhaW5lcltORVhUXSBpbiB0aGUgc2FtZSB3YXkgcmVnYXJkbGVzc1xuICogb2YgdHlwZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMQ29udGFpbmVyIGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIC8qKlxuICAgKiBUaGUgbmV4dCBhY3RpdmUgaW5kZXggaW4gdGhlIHZpZXdzIGFycmF5IHRvIHJlYWQgb3Igd3JpdGUgdG8uIFRoaXMgaGVscHMgdXNcbiAgICoga2VlcCB0cmFjayBvZiB3aGVyZSB3ZSBhcmUgaW4gdGhlIHZpZXdzIGFycmF5LlxuICAgKiBJbiB0aGUgY2FzZSB0aGUgTENvbnRhaW5lciBpcyBjcmVhdGVkIGZvciBhIFZpZXdDb250YWluZXJSZWYsXG4gICAqIGl0IGlzIHNldCB0byBudWxsIHRvIGlkZW50aWZ5IHRoaXMgc2NlbmFyaW8sIGFzIGluZGljZXMgYXJlIFwiYWJzb2x1dGVcIiBpbiB0aGF0IGNhc2UsXG4gICAqIGkuZS4gcHJvdmlkZWQgZGlyZWN0bHkgYnkgdGhlIHVzZXIgb2YgdGhlIFZpZXdDb250YWluZXJSZWYgQVBJLlxuICAgKi9cbiAgW0FDVElWRV9JTkRFWF06IG51bWJlcjtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIHRoZSBjb250YWluZXIncyBjdXJyZW50bHkgYWN0aXZlIGNoaWxkIHZpZXdzLiBWaWV3cyB3aWxsIGJlIGluc2VydGVkXG4gICAqIGhlcmUgYXMgdGhleSBhcmUgYWRkZWQgYW5kIHNwbGljZWQgZnJvbSBoZXJlIHdoZW4gdGhleSBhcmUgcmVtb3ZlZC4gV2UgbmVlZFxuICAgKiB0byBrZWVwIGEgcmVjb3JkIG9mIGN1cnJlbnQgdmlld3Mgc28gd2Uga25vdyB3aGljaCB2aWV3cyBhcmUgYWxyZWFkeSBpbiB0aGUgRE9NXG4gICAqIChhbmQgZG9uJ3QgbmVlZCB0byBiZSByZS1hZGRlZCkgYW5kIHNvIHdlIGNhbiByZW1vdmUgdmlld3MgZnJvbSB0aGUgRE9NIHdoZW4gdGhleVxuICAgKiBhcmUgbm8gbG9uZ2VyIHJlcXVpcmVkLlxuICAgKi9cbiAgW1ZJRVdTXTogTFZpZXdbXTtcblxuICAvKipcbiAgICogQWNjZXNzIHRvIHRoZSBwYXJlbnQgdmlldyBpcyBuZWNlc3Nhcnkgc28gd2UgY2FuIHByb3BhZ2F0ZSBiYWNrXG4gICAqIHVwIGZyb20gaW5zaWRlIGEgY29udGFpbmVyIHRvIHBhcmVudFtORVhUXS5cbiAgICovXG4gIFtQQVJFTlRdOiBMVmlld3xudWxsO1xuXG4gIC8qKlxuICAgKiBUaGlzIGFsbG93cyB1cyB0byBqdW1wIGZyb20gYSBjb250YWluZXIgdG8gYSBzaWJsaW5nIGNvbnRhaW5lciBvciBjb21wb25lbnRcbiAgICogdmlldyB3aXRoIHRoZSBzYW1lIHBhcmVudCwgc28gd2UgY2FuIHJlbW92ZSBsaXN0ZW5lcnMgZWZmaWNpZW50bHkuXG4gICAqL1xuICBbTkVYVF06IExWaWV3fExDb250YWluZXJ8bnVsbDtcblxuICAvKipcbiAgICogUXVlcmllcyBhY3RpdmUgZm9yIHRoaXMgY29udGFpbmVyIC0gYWxsIHRoZSB2aWV3cyBpbnNlcnRlZCB0byAvIHJlbW92ZWQgZnJvbVxuICAgKiB0aGlzIGNvbnRhaW5lciBhcmUgcmVwb3J0ZWQgdG8gcXVlcmllcyByZWZlcmVuY2VkIGhlcmUuXG4gICAqL1xuICBbUVVFUklFU106IExRdWVyaWVzfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBob3N0IGVsZW1lbnQgb2YgdGhpcyBMQ29udGFpbmVyLlxuICAgKlxuICAgKiBUaGUgaG9zdCBjb3VsZCBiZSBhbiBMVmlldyBpZiB0aGlzIGNvbnRhaW5lciBpcyBvbiBhIGNvbXBvbmVudCBub2RlLlxuICAgKiBJbiB0aGF0IGNhc2UsIHRoZSBjb21wb25lbnQgTFZpZXcgaXMgaXRzIEhPU1QuXG4gICAqXG4gICAqIEl0IGNvdWxkIGFsc28gYmUgYSBzdHlsaW5nIGNvbnRleHQgaWYgdGhpcyBpcyBhIG5vZGUgd2l0aCBhIHN0eWxlL2NsYXNzXG4gICAqIGJpbmRpbmcuXG4gICAqL1xuICBbSE9TVF06IFJFbGVtZW50fFJDb21tZW50fFN0eWxpbmdDb250ZXh0fExWaWV3O1xuXG4gIC8qKiBUaGUgY29tbWVudCBlbGVtZW50IHRoYXQgc2VydmVzIGFzIGFuIGFuY2hvciBmb3IgdGhpcyBMQ29udGFpbmVyLiAqL1xuICBbTkFUSVZFXTogUkNvbW1lbnQ7XG5cbiAgLyoqXG4gICAqIFBhcmVudCBFbGVtZW50IHdoaWNoIHdpbGwgY29udGFpbiB0aGUgbG9jYXRpb24gd2hlcmUgYWxsIG9mIHRoZSB2aWV3cyB3aWxsIGJlXG4gICAqIGluc2VydGVkIGludG8gdG8uXG4gICAqXG4gICAqIElmIGByZW5kZXJQYXJlbnRgIGlzIGBudWxsYCBpdCBpcyBoZWFkbGVzcy4gVGhpcyBtZWFucyB0aGF0IGl0IGlzIGNvbnRhaW5lZFxuICAgKiBpbiBhbm90aGVyIHZpZXcgd2hpY2ggaW4gdHVybiBpcyBjb250YWluZWQgaW4gYW5vdGhlciBjb250YWluZXIgYW5kXG4gICAqIHRoZXJlZm9yZSBpdCBkb2VzIG5vdCB5ZXQgaGF2ZSBpdHMgb3duIHBhcmVudC5cbiAgICpcbiAgICogSWYgYHJlbmRlclBhcmVudGAgaXMgbm90IGBudWxsYCB0aGVuIGl0IG1heSBiZTpcbiAgICogLSBzYW1lIGFzIGB0Q29udGFpbmVyTm9kZS5wYXJlbnRgIGluIHdoaWNoIGNhc2UgaXQgaXMganVzdCBhIG5vcm1hbCBjb250YWluZXIuXG4gICAqIC0gZGlmZmVyZW50IGZyb20gYHRDb250YWluZXJOb2RlLnBhcmVudGAgaW4gd2hpY2ggY2FzZSBpdCBoYXMgYmVlbiByZS1wcm9qZWN0ZWQuXG4gICAqICAgSW4gb3RoZXIgd29yZHMgYHRDb250YWluZXJOb2RlLnBhcmVudGAgaXMgbG9naWNhbCBwYXJlbnQgd2hlcmUgYXNcbiAgICogICBgdENvbnRhaW5lck5vZGUucHJvamVjdGVkUGFyZW50YCBpcyByZW5kZXIgcGFyZW50LlxuICAgKlxuICAgKiBXaGVuIHZpZXdzIGFyZSBpbnNlcnRlZCBpbnRvIGBMQ29udGFpbmVyYCB0aGVuIGByZW5kZXJQYXJlbnRgIGlzOlxuICAgKiAtIGBudWxsYCwgd2UgYXJlIGluIGEgdmlldywga2VlcCBnb2luZyB1cCBhIGhpZXJhcmNoeSB1bnRpbCBhY3R1YWxcbiAgICogICBgcmVuZGVyUGFyZW50YCBpcyBmb3VuZC5cbiAgICogLSBub3QgYG51bGxgLCB0aGVuIHVzZSB0aGUgYHByb2plY3RlZFBhcmVudC5uYXRpdmVgIGFzIHRoZSBgUkVsZW1lbnRgIHRvIGluc2VydFxuICAgKiB2aWV3cyBpbnRvLlxuICAgKi9cbiAgW1JFTkRFUl9QQVJFTlRdOiBSRWxlbWVudHxudWxsO1xufVxuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19