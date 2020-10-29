/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HOST, NEXT, PARENT, T_HOST, TRANSPLANTED_VIEWS_TO_REFRESH } from './view';
/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
export const TYPE = 1;
/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
/**
 * Flag to signify that this `LContainer` may have transplanted views which need to be change
 * detected. (see: `LView[DECLARATION_COMPONENT_VIEW])`.
 *
 * This flag, once set, is never unset for the `LContainer`. This means that when unset we can skip
 * a lot of work in `refreshEmbeddedViews`. But when set we still need to verify
 * that the `MOVED_VIEWS` are transplanted and on-push.
 */
export const HAS_TRANSPLANTED_VIEWS = 2;
// PARENT, NEXT, TRANSPLANTED_VIEWS_TO_REFRESH are indices 3, 4, and 5
// As we already have these constants in LView, we don't need to re-create them.
// T_HOST is index 6
// We already have this constants in LView, we don't need to re-create it.
export const NATIVE = 7;
export const VIEW_REFS = 8;
export const MOVED_VIEWS = 9;
/**
 * Size of LContainer's header. Represents the index after which all views in the
 * container will be inserted. We need to keep a record of current views so we know
 * which views are already in the DOM (and don't need to be re-added) and so we can
 * remove views from the DOM when they are no longer required.
 */
export const CONTAINER_HEADER_OFFSET = 10;
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFNSCxPQUFPLEVBQUMsSUFBSSxFQUFTLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLDZCQUE2QixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBSXhGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBRXRCOzs7O0dBSUc7QUFFSDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO0FBRXhDLHNFQUFzRTtBQUN0RSxnRkFBZ0Y7QUFFaEYsb0JBQW9CO0FBQ3BCLDBFQUEwRTtBQUUxRSxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUc3Qjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztBQTZFMUMsaUZBQWlGO0FBQ2pGLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtWaWV3UmVmfSBmcm9tICcuLi8uLi9saW5rZXIvdmlld19yZWYnO1xuXG5pbXBvcnQge1ROb2RlfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtSQ29tbWVudCwgUkVsZW1lbnR9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtIT1NULCBMVmlldywgTkVYVCwgUEFSRU5ULCBUX0hPU1QsIFRSQU5TUExBTlRFRF9WSUVXU19UT19SRUZSRVNIfSBmcm9tICcuL3ZpZXcnO1xuXG5cblxuLyoqXG4gKiBTcGVjaWFsIGxvY2F0aW9uIHdoaWNoIGFsbG93cyBlYXN5IGlkZW50aWZpY2F0aW9uIG9mIHR5cGUuIElmIHdlIGhhdmUgYW4gYXJyYXkgd2hpY2ggd2FzXG4gKiByZXRyaWV2ZWQgZnJvbSB0aGUgYExWaWV3YCBhbmQgdGhhdCBhcnJheSBoYXMgYHRydWVgIGF0IGBUWVBFYCBsb2NhdGlvbiwgd2Uga25vdyBpdCBpc1xuICogYExDb250YWluZXJgLlxuICovXG5leHBvcnQgY29uc3QgVFlQRSA9IDE7XG5cbi8qKlxuICogQmVsb3cgYXJlIGNvbnN0YW50cyBmb3IgTENvbnRhaW5lciBpbmRpY2VzIHRvIGhlbHAgdXMgbG9vayB1cCBMQ29udGFpbmVyIG1lbWJlcnNcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIHJlbWVtYmVyIHRoZSBzcGVjaWZpYyBpbmRpY2VzLlxuICogVWdsaWZ5IHdpbGwgaW5saW5lIHRoZXNlIHdoZW4gbWluaWZ5aW5nIHNvIHRoZXJlIHNob3VsZG4ndCBiZSBhIGNvc3QuXG4gKi9cblxuLyoqXG4gKiBGbGFnIHRvIHNpZ25pZnkgdGhhdCB0aGlzIGBMQ29udGFpbmVyYCBtYXkgaGF2ZSB0cmFuc3BsYW50ZWQgdmlld3Mgd2hpY2ggbmVlZCB0byBiZSBjaGFuZ2VcbiAqIGRldGVjdGVkLiAoc2VlOiBgTFZpZXdbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddKWAuXG4gKlxuICogVGhpcyBmbGFnLCBvbmNlIHNldCwgaXMgbmV2ZXIgdW5zZXQgZm9yIHRoZSBgTENvbnRhaW5lcmAuIFRoaXMgbWVhbnMgdGhhdCB3aGVuIHVuc2V0IHdlIGNhbiBza2lwXG4gKiBhIGxvdCBvZiB3b3JrIGluIGByZWZyZXNoRW1iZWRkZWRWaWV3c2AuIEJ1dCB3aGVuIHNldCB3ZSBzdGlsbCBuZWVkIHRvIHZlcmlmeVxuICogdGhhdCB0aGUgYE1PVkVEX1ZJRVdTYCBhcmUgdHJhbnNwbGFudGVkIGFuZCBvbi1wdXNoLlxuICovXG5leHBvcnQgY29uc3QgSEFTX1RSQU5TUExBTlRFRF9WSUVXUyA9IDI7XG5cbi8vIFBBUkVOVCwgTkVYVCwgVFJBTlNQTEFOVEVEX1ZJRVdTX1RPX1JFRlJFU0ggYXJlIGluZGljZXMgMywgNCwgYW5kIDVcbi8vIEFzIHdlIGFscmVhZHkgaGF2ZSB0aGVzZSBjb25zdGFudHMgaW4gTFZpZXcsIHdlIGRvbid0IG5lZWQgdG8gcmUtY3JlYXRlIHRoZW0uXG5cbi8vIFRfSE9TVCBpcyBpbmRleCA2XG4vLyBXZSBhbHJlYWR5IGhhdmUgdGhpcyBjb25zdGFudHMgaW4gTFZpZXcsIHdlIGRvbid0IG5lZWQgdG8gcmUtY3JlYXRlIGl0LlxuXG5leHBvcnQgY29uc3QgTkFUSVZFID0gNztcbmV4cG9ydCBjb25zdCBWSUVXX1JFRlMgPSA4O1xuZXhwb3J0IGNvbnN0IE1PVkVEX1ZJRVdTID0gOTtcblxuXG4vKipcbiAqIFNpemUgb2YgTENvbnRhaW5lcidzIGhlYWRlci4gUmVwcmVzZW50cyB0aGUgaW5kZXggYWZ0ZXIgd2hpY2ggYWxsIHZpZXdzIGluIHRoZVxuICogY29udGFpbmVyIHdpbGwgYmUgaW5zZXJ0ZWQuIFdlIG5lZWQgdG8ga2VlcCBhIHJlY29yZCBvZiBjdXJyZW50IHZpZXdzIHNvIHdlIGtub3dcbiAqIHdoaWNoIHZpZXdzIGFyZSBhbHJlYWR5IGluIHRoZSBET00gKGFuZCBkb24ndCBuZWVkIHRvIGJlIHJlLWFkZGVkKSBhbmQgc28gd2UgY2FuXG4gKiByZW1vdmUgdmlld3MgZnJvbSB0aGUgRE9NIHdoZW4gdGhleSBhcmUgbm8gbG9uZ2VyIHJlcXVpcmVkLlxuICovXG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0hFQURFUl9PRkZTRVQgPSAxMDtcblxuLyoqXG4gKiBUaGUgc3RhdGUgYXNzb2NpYXRlZCB3aXRoIGEgY29udGFpbmVyLlxuICpcbiAqIFRoaXMgaXMgYW4gYXJyYXkgc28gdGhhdCBpdHMgc3RydWN0dXJlIGlzIGNsb3NlciB0byBMVmlldy4gVGhpcyBoZWxwc1xuICogd2hlbiB0cmF2ZXJzaW5nIHRoZSB2aWV3IHRyZWUgKHdoaWNoIGlzIGEgbWl4IG9mIGNvbnRhaW5lcnMgYW5kIGNvbXBvbmVudFxuICogdmlld3MpLCBzbyB3ZSBjYW4ganVtcCB0byB2aWV3T3JDb250YWluZXJbTkVYVF0gaW4gdGhlIHNhbWUgd2F5IHJlZ2FyZGxlc3NcbiAqIG9mIHR5cGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTENvbnRhaW5lciBleHRlbmRzIEFycmF5PGFueT4ge1xuICAvKipcbiAgICogVGhlIGhvc3QgZWxlbWVudCBvZiB0aGlzIExDb250YWluZXIuXG4gICAqXG4gICAqIFRoZSBob3N0IGNvdWxkIGJlIGFuIExWaWV3IGlmIHRoaXMgY29udGFpbmVyIGlzIG9uIGEgY29tcG9uZW50IG5vZGUuXG4gICAqIEluIHRoYXQgY2FzZSwgdGhlIGNvbXBvbmVudCBMVmlldyBpcyBpdHMgSE9TVC5cbiAgICovXG4gIHJlYWRvbmx5W0hPU1RdOiBSRWxlbWVudHxSQ29tbWVudHxMVmlldztcblxuICAvKipcbiAgICogVGhpcyBpcyBhIHR5cGUgZmllbGQgd2hpY2ggYWxsb3dzIHVzIHRvIGRpZmZlcmVudGlhdGUgYExDb250YWluZXJgIGZyb20gYFN0eWxpbmdDb250ZXh0YCBpbiBhblxuICAgKiBlZmZpY2llbnQgd2F5LiBUaGUgdmFsdWUgaXMgYWx3YXlzIHNldCB0byBgdHJ1ZWBcbiAgICovXG4gIFtUWVBFXTogdHJ1ZTtcblxuICAvKipcbiAgICogRmxhZyB0byBzaWduaWZ5IHRoYXQgdGhpcyBgTENvbnRhaW5lcmAgbWF5IGhhdmUgdHJhbnNwbGFudGVkIHZpZXdzIHdoaWNoIG5lZWQgdG8gYmUgY2hhbmdlXG4gICAqIGRldGVjdGVkLiAoc2VlOiBgTFZpZXdbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddKWAuXG4gICAqXG4gICAqIFRoaXMgZmxhZywgb25jZSBzZXQsIGlzIG5ldmVyIHVuc2V0IGZvciB0aGUgYExDb250YWluZXJgLlxuICAgKi9cbiAgW0hBU19UUkFOU1BMQU5URURfVklFV1NdOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBY2Nlc3MgdG8gdGhlIHBhcmVudCB2aWV3IGlzIG5lY2Vzc2FyeSBzbyB3ZSBjYW4gcHJvcGFnYXRlIGJhY2tcbiAgICogdXAgZnJvbSBpbnNpZGUgYSBjb250YWluZXIgdG8gcGFyZW50W05FWFRdLlxuICAgKi9cbiAgW1BBUkVOVF06IExWaWV3O1xuXG4gIC8qKlxuICAgKiBUaGlzIGFsbG93cyB1cyB0byBqdW1wIGZyb20gYSBjb250YWluZXIgdG8gYSBzaWJsaW5nIGNvbnRhaW5lciBvciBjb21wb25lbnRcbiAgICogdmlldyB3aXRoIHRoZSBzYW1lIHBhcmVudCwgc28gd2UgY2FuIHJlbW92ZSBsaXN0ZW5lcnMgZWZmaWNpZW50bHkuXG4gICAqL1xuICBbTkVYVF06IExWaWV3fExDb250YWluZXJ8bnVsbDtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBkaXJlY3QgdHJhbnNwbGFudGVkIHZpZXdzIHdoaWNoIG5lZWQgYSByZWZyZXNoIG9yIGhhdmUgZGVzY2VuZGFudHMgdGhlbXNlbHZlc1xuICAgKiB0aGF0IG5lZWQgYSByZWZyZXNoIGJ1dCBoYXZlIG5vdCBtYXJrZWQgdGhlaXIgYW5jZXN0b3JzIGFzIERpcnR5LiBUaGlzIHRlbGxzIHVzIHRoYXQgZHVyaW5nXG4gICAqIGNoYW5nZSBkZXRlY3Rpb24gd2Ugc2hvdWxkIHN0aWxsIGRlc2NlbmQgdG8gZmluZCB0aG9zZSBjaGlsZHJlbiB0byByZWZyZXNoLCBldmVuIGlmIHRoZSBwYXJlbnRzXG4gICAqIGFyZSBub3QgYERpcnR5YC9gQ2hlY2tBbHdheXNgLlxuICAgKi9cbiAgW1RSQU5TUExBTlRFRF9WSUVXU19UT19SRUZSRVNIXTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGNvbGxlY3Rpb24gb2Ygdmlld3MgY3JlYXRlZCBiYXNlZCBvbiB0aGUgdW5kZXJseWluZyBgPG5nLXRlbXBsYXRlPmAgZWxlbWVudCBidXQgaW5zZXJ0ZWQgaW50b1xuICAgKiBhIGRpZmZlcmVudCBgTENvbnRhaW5lcmAuIFdlIG5lZWQgdG8gdHJhY2sgdmlld3MgY3JlYXRlZCBmcm9tIGEgZ2l2ZW4gZGVjbGFyYXRpb24gcG9pbnQgc2luY2VcbiAgICogcXVlcmllcyBjb2xsZWN0IG1hdGNoZXMgZnJvbSB0aGUgZW1iZWRkZWQgdmlldyBkZWNsYXJhdGlvbiBwb2ludCBhbmQgX25vdF8gdGhlIGluc2VydGlvbiBwb2ludC5cbiAgICovXG4gIFtNT1ZFRF9WSUVXU106IExWaWV3W118bnVsbDtcblxuICAvKipcbiAgICogUG9pbnRlciB0byB0aGUgYFROb2RlYCB3aGljaCByZXByZXNlbnRzIHRoZSBob3N0IG9mIHRoZSBjb250YWluZXIuXG4gICAqL1xuICBbVF9IT1NUXTogVE5vZGU7XG5cbiAgLyoqIFRoZSBjb21tZW50IGVsZW1lbnQgdGhhdCBzZXJ2ZXMgYXMgYW4gYW5jaG9yIGZvciB0aGlzIExDb250YWluZXIuICovXG4gIHJlYWRvbmx5W05BVElWRV06XG4gICAgICBSQ29tbWVudDsgIC8vIFRPRE8obWlza28pOiByZW1vdmUgYXMgdGhpcyB2YWx1ZSBjYW4gYmUgZ290dGVuIGJ5IHVud3JhcHBpbmcgYFtIT1NUXWBcblxuICAvKipcbiAgICogQXJyYXkgb2YgYFZpZXdSZWZgcyB1c2VkIGJ5IGFueSBgVmlld0NvbnRhaW5lclJlZmBzIHRoYXQgcG9pbnQgdG8gdGhpcyBjb250YWluZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgbGF6aWx5IGluaXRpYWxpemVkIGJ5IGBWaWV3Q29udGFpbmVyUmVmYCB3aGVuIHRoZSBmaXJzdCB2aWV3IGlzIGluc2VydGVkLlxuICAgKi9cbiAgW1ZJRVdfUkVGU106IFZpZXdSZWZbXXxudWxsO1xufVxuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19