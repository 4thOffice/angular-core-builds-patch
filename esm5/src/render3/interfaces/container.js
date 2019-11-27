/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HOST, NEXT, PARENT, T_HOST } from './view';
/**
 * Special location which allows easy identification of type. If we have an array which was
 * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
 * `LContainer`.
 */
export var TYPE = 1;
/**
 * Below are constants for LContainer indices to help us look up LContainer members
 * without having to remember the specific indices.
 * Uglify will inline these when minifying so there shouldn't be a cost.
 */
export var ACTIVE_INDEX = 2;
// PARENT and NEXT are indices 3 and 4
// As we already have these constants in LView, we don't need to re-create them.
export var MOVED_VIEWS = 5;
// T_HOST is index 6
// We already have this constants in LView, we don't need to re-create it.
export var NATIVE = 7;
export var VIEW_REFS = 8;
/**
 * Size of LContainer's header. Represents the index after which all views in the
 * container will be inserted. We need to keep a record of current views so we know
 * which views are already in the DOM (and don't need to be re-added) and so we can
 * remove views from the DOM when they are no longer required.
 */
export var CONTAINER_HEADER_OFFSET = 9;
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export var unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFPSCxPQUFPLEVBQUMsSUFBSSxFQUFTLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBR3pEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsSUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRTlCLHNDQUFzQztBQUN0QyxnRkFBZ0Y7QUFFaEYsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztBQUU3QixvQkFBb0I7QUFDcEIsMEVBQTBFO0FBRTFFLE1BQU0sQ0FBQyxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDeEIsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQztBQUUzQjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFHLENBQUMsQ0FBQztBQWdIekMsaUZBQWlGO0FBQ2pGLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsSUFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Vmlld1JlZn0gZnJvbSAnLi4vLi4vbGlua2VyL3ZpZXdfcmVmJztcblxuaW1wb3J0IHtUTm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7UkNvbW1lbnQsIFJFbGVtZW50fSBmcm9tICcuL3JlbmRlcmVyJztcblxuaW1wb3J0IHtIT1NULCBMVmlldywgTkVYVCwgUEFSRU5ULCBUX0hPU1R9IGZyb20gJy4vdmlldyc7XG5cblxuLyoqXG4gKiBTcGVjaWFsIGxvY2F0aW9uIHdoaWNoIGFsbG93cyBlYXN5IGlkZW50aWZpY2F0aW9uIG9mIHR5cGUuIElmIHdlIGhhdmUgYW4gYXJyYXkgd2hpY2ggd2FzXG4gKiByZXRyaWV2ZWQgZnJvbSB0aGUgYExWaWV3YCBhbmQgdGhhdCBhcnJheSBoYXMgYHRydWVgIGF0IGBUWVBFYCBsb2NhdGlvbiwgd2Uga25vdyBpdCBpc1xuICogYExDb250YWluZXJgLlxuICovXG5leHBvcnQgY29uc3QgVFlQRSA9IDE7XG4vKipcbiAqIEJlbG93IGFyZSBjb25zdGFudHMgZm9yIExDb250YWluZXIgaW5kaWNlcyB0byBoZWxwIHVzIGxvb2sgdXAgTENvbnRhaW5lciBtZW1iZXJzXG4gKiB3aXRob3V0IGhhdmluZyB0byByZW1lbWJlciB0aGUgc3BlY2lmaWMgaW5kaWNlcy5cbiAqIFVnbGlmeSB3aWxsIGlubGluZSB0aGVzZSB3aGVuIG1pbmlmeWluZyBzbyB0aGVyZSBzaG91bGRuJ3QgYmUgYSBjb3N0LlxuICovXG5leHBvcnQgY29uc3QgQUNUSVZFX0lOREVYID0gMjtcblxuLy8gUEFSRU5UIGFuZCBORVhUIGFyZSBpbmRpY2VzIDMgYW5kIDRcbi8vIEFzIHdlIGFscmVhZHkgaGF2ZSB0aGVzZSBjb25zdGFudHMgaW4gTFZpZXcsIHdlIGRvbid0IG5lZWQgdG8gcmUtY3JlYXRlIHRoZW0uXG5cbmV4cG9ydCBjb25zdCBNT1ZFRF9WSUVXUyA9IDU7XG5cbi8vIFRfSE9TVCBpcyBpbmRleCA2XG4vLyBXZSBhbHJlYWR5IGhhdmUgdGhpcyBjb25zdGFudHMgaW4gTFZpZXcsIHdlIGRvbid0IG5lZWQgdG8gcmUtY3JlYXRlIGl0LlxuXG5leHBvcnQgY29uc3QgTkFUSVZFID0gNztcbmV4cG9ydCBjb25zdCBWSUVXX1JFRlMgPSA4O1xuXG4vKipcbiAqIFNpemUgb2YgTENvbnRhaW5lcidzIGhlYWRlci4gUmVwcmVzZW50cyB0aGUgaW5kZXggYWZ0ZXIgd2hpY2ggYWxsIHZpZXdzIGluIHRoZVxuICogY29udGFpbmVyIHdpbGwgYmUgaW5zZXJ0ZWQuIFdlIG5lZWQgdG8ga2VlcCBhIHJlY29yZCBvZiBjdXJyZW50IHZpZXdzIHNvIHdlIGtub3dcbiAqIHdoaWNoIHZpZXdzIGFyZSBhbHJlYWR5IGluIHRoZSBET00gKGFuZCBkb24ndCBuZWVkIHRvIGJlIHJlLWFkZGVkKSBhbmQgc28gd2UgY2FuXG4gKiByZW1vdmUgdmlld3MgZnJvbSB0aGUgRE9NIHdoZW4gdGhleSBhcmUgbm8gbG9uZ2VyIHJlcXVpcmVkLlxuICovXG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0hFQURFUl9PRkZTRVQgPSA5O1xuXG5cbi8qKlxuICogVXNlZCB0byB0cmFjazpcbiAqICAtIElubGluZSBlbWJlZGRlZCB2aWV3cyAoc2VlOiBgybXJtWVtYmVkZGVkVmlld1N0YXJ0YClcbiAqICAtIFRyYW5zcGxhbnRlZCBgTFZpZXdgcyAoc2VlOiBgTFZpZXdbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddKWBcbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gQWN0aXZlSW5kZXhGbGFnIHtcbiAgLyoqXG4gICAqIEZsYWcgd2hpY2ggc2lnbmlmaWVzIHRoYXQgdGhlIGBMQ29udGFpbmVyYCBkb2VzIG5vdCBoYXZlIGFueSBpbmxpbmUgZW1iZWRkZWQgdmlld3MuXG4gICAqL1xuICBEWU5BTUlDX0VNQkVEREVEX1ZJRVdTX09OTFkgPSAtMSxcblxuICAvKipcbiAgICogRmxhZyB0byBzaWduaWZ5IHRoYXQgdGhpcyBgTENvbnRhaW5lcmAgbWF5IGhhdmUgdHJhbnNwbGFudGVkIHZpZXdzIHdoaWNoIG5lZWQgdG8gYmUgY2hhbmdlXG4gICAqIGRldGVjdGVkLiAoc2VlOiBgTFZpZXdbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddKWAuXG4gICAqXG4gICAqIFRoaXMgZmxhZyBvbmNlIHNldCBpcyBuZXZlciB1bnNldCBmb3IgdGhlIGBMQ29udGFpbmVyYC4gVGhpcyBtZWFucyB0aGF0IHdoZW4gdW5zZXQgd2UgY2FuIHNraXBcbiAgICogYSBsb3Qgb2Ygd29yayBpbiBgcmVmcmVzaER5bmFtaWNFbWJlZGRlZFZpZXdzYC4gQnV0IHdoZW4gc2V0IHdlIHN0aWxsIG5lZWQgdG8gdmVyaWZ5XG4gICAqIHRoYXQgdGhlIGBNT1ZFRF9WSUVXU2AgYXJlIHRyYW5zcGxhbnRlZCBhbmQgb24tcHVzaC5cbiAgICovXG4gIEhBU19UUkFOU1BMQU5URURfVklFV1MgPSAxLFxuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2YgYml0cyB0byBzaGlmdCBpbmxpbmUgZW1iZWRkZWQgdmlld3MgY291bnRlciB0byBtYWtlIHNwYWNlIGZvciBvdGhlciBmbGFncy5cbiAgICovXG4gIFNISUZUID0gMSxcblxuXG4gIC8qKlxuICAgKiBXaGVuIGluY3JlbWVudGluZyB0aGUgYWN0aXZlIGluZGV4IGZvciBpbmxpbmUgZW1iZWRkZWQgdmlld3MsIHRoZSBhbW91bnQgdG8gaW5jcmVtZW50IHRvIGxlYXZlXG4gICAqIHNwYWNlIGZvciBvdGhlciBmbGFncy5cbiAgICovXG4gIElOQ1JFTUVOVCA9IDEgPDwgU0hJRlQsXG59XG5cbi8qKlxuICogVGhlIHN0YXRlIGFzc29jaWF0ZWQgd2l0aCBhIGNvbnRhaW5lci5cbiAqXG4gKiBUaGlzIGlzIGFuIGFycmF5IHNvIHRoYXQgaXRzIHN0cnVjdHVyZSBpcyBjbG9zZXIgdG8gTFZpZXcuIFRoaXMgaGVscHNcbiAqIHdoZW4gdHJhdmVyc2luZyB0aGUgdmlldyB0cmVlICh3aGljaCBpcyBhIG1peCBvZiBjb250YWluZXJzIGFuZCBjb21wb25lbnRcbiAqIHZpZXdzKSwgc28gd2UgY2FuIGp1bXAgdG8gdmlld09yQ29udGFpbmVyW05FWFRdIGluIHRoZSBzYW1lIHdheSByZWdhcmRsZXNzXG4gKiBvZiB0eXBlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExDb250YWluZXIgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgLyoqXG4gICAqIFRoZSBob3N0IGVsZW1lbnQgb2YgdGhpcyBMQ29udGFpbmVyLlxuICAgKlxuICAgKiBUaGUgaG9zdCBjb3VsZCBiZSBhbiBMVmlldyBpZiB0aGlzIGNvbnRhaW5lciBpcyBvbiBhIGNvbXBvbmVudCBub2RlLlxuICAgKiBJbiB0aGF0IGNhc2UsIHRoZSBjb21wb25lbnQgTFZpZXcgaXMgaXRzIEhPU1QuXG4gICAqL1xuICByZWFkb25seVtIT1NUXTogUkVsZW1lbnR8UkNvbW1lbnR8TFZpZXc7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgYSB0eXBlIGZpZWxkIHdoaWNoIGFsbG93cyB1cyB0byBkaWZmZXJlbnRpYXRlIGBMQ29udGFpbmVyYCBmcm9tIGBTdHlsaW5nQ29udGV4dGAgaW4gYW5cbiAgICogZWZmaWNpZW50IHdheS4gVGhlIHZhbHVlIGlzIGFsd2F5cyBzZXQgdG8gYHRydWVgXG4gICAqL1xuICBbVFlQRV06IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBuZXh0IGFjdGl2ZSBpbmRleCBpbiB0aGUgdmlld3MgYXJyYXkgdG8gcmVhZCBvciB3cml0ZSB0by4gVGhpcyBoZWxwcyB1c1xuICAgKiBrZWVwIHRyYWNrIG9mIHdoZXJlIHdlIGFyZSBpbiB0aGUgdmlld3MgYXJyYXkuXG4gICAqIEluIHRoZSBjYXNlIHRoZSBMQ29udGFpbmVyIGlzIGNyZWF0ZWQgZm9yIGEgVmlld0NvbnRhaW5lclJlZixcbiAgICogaXQgaXMgc2V0IHRvIG51bGwgdG8gaWRlbnRpZnkgdGhpcyBzY2VuYXJpbywgYXMgaW5kaWNlcyBhcmUgXCJhYnNvbHV0ZVwiIGluIHRoYXQgY2FzZSxcbiAgICogaS5lLiBwcm92aWRlZCBkaXJlY3RseSBieSB0aGUgdXNlciBvZiB0aGUgVmlld0NvbnRhaW5lclJlZiBBUEkuXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZCBieSBgybXJtWVtYmVkZGVkVmlld1N0YXJ0YCB0byB0cmFjayB3aGljaCBgTFZpZXdgIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gICAqIEJlY2F1c2UgYMm1ybVlbWJlZGRlZFZpZXdTdGFydGAgaXMgbm90IGdlbmVyYXRlZCBieSB0aGUgY29tcGlsZXIgdGhpcyBmZWF0dXJlIGlzIGVzc2VudGlhbGx5XG4gICAqIHVudXNlZC5cbiAgICpcbiAgICogVGhlIGxvd2VzdCBiaXQgc2lnbmFscyB0aGF0IHRoaXMgYExDb250YWluZXJgIGhhcyB0cmFuc3BsYW50ZWQgdmlld3Mgd2hpY2ggbmVlZCB0byBiZSBjaGFuZ2VcbiAgICogZGV0ZWN0ZWQgYXMgcGFydCBvZiB0aGUgZGVjbGFyYXRpb24gQ0QuIChTZWUgYExWaWV3W0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXWApXG4gICAqL1xuICBbQUNUSVZFX0lOREVYXTogQWN0aXZlSW5kZXhGbGFnO1xuXG4gIC8qKlxuICAgKiBBY2Nlc3MgdG8gdGhlIHBhcmVudCB2aWV3IGlzIG5lY2Vzc2FyeSBzbyB3ZSBjYW4gcHJvcGFnYXRlIGJhY2tcbiAgICogdXAgZnJvbSBpbnNpZGUgYSBjb250YWluZXIgdG8gcGFyZW50W05FWFRdLlxuICAgKi9cbiAgW1BBUkVOVF06IExWaWV3O1xuXG4gIC8qKlxuICAgKiBUaGlzIGFsbG93cyB1cyB0byBqdW1wIGZyb20gYSBjb250YWluZXIgdG8gYSBzaWJsaW5nIGNvbnRhaW5lciBvciBjb21wb25lbnRcbiAgICogdmlldyB3aXRoIHRoZSBzYW1lIHBhcmVudCwgc28gd2UgY2FuIHJlbW92ZSBsaXN0ZW5lcnMgZWZmaWNpZW50bHkuXG4gICAqL1xuICBbTkVYVF06IExWaWV3fExDb250YWluZXJ8bnVsbDtcblxuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIHZpZXdzIGNyZWF0ZWQgYmFzZWQgb24gdGhlIHVuZGVybHlpbmcgYDxuZy10ZW1wbGF0ZT5gIGVsZW1lbnQgYnV0IGluc2VydGVkIGludG9cbiAgICogYSBkaWZmZXJlbnQgYExDb250YWluZXJgLiBXZSBuZWVkIHRvIHRyYWNrIHZpZXdzIGNyZWF0ZWQgZnJvbSBhIGdpdmVuIGRlY2xhcmF0aW9uIHBvaW50IHNpbmNlXG4gICAqIHF1ZXJpZXMgY29sbGVjdCBtYXRjaGVzIGZyb20gdGhlIGVtYmVkZGVkIHZpZXcgZGVjbGFyYXRpb24gcG9pbnQgYW5kIF9ub3RfIHRoZSBpbnNlcnRpb24gcG9pbnQuXG4gICAqL1xuICBbTU9WRURfVklFV1NdOiBMVmlld1tdfG51bGw7XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgdG8gdGhlIGBUTm9kZWAgd2hpY2ggcmVwcmVzZW50cyB0aGUgaG9zdCBvZiB0aGUgY29udGFpbmVyLlxuICAgKi9cbiAgW1RfSE9TVF06IFROb2RlO1xuXG4gIC8qKiBUaGUgY29tbWVudCBlbGVtZW50IHRoYXQgc2VydmVzIGFzIGFuIGFuY2hvciBmb3IgdGhpcyBMQ29udGFpbmVyLiAqL1xuICByZWFkb25seVtOQVRJVkVdOlxuICAgICAgUkNvbW1lbnQ7ICAvLyBUT0RPKG1pc2tvKTogcmVtb3ZlIGFzIHRoaXMgdmFsdWUgY2FuIGJlIGdvdHRlbiBieSB1bndyYXBwaW5nIGBbSE9TVF1gXG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGBWaWV3UmVmYHMgdXNlZCBieSBhbnkgYFZpZXdDb250YWluZXJSZWZgcyB0aGF0IHBvaW50IHRvIHRoaXMgY29udGFpbmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGxhemlseSBpbml0aWFsaXplZCBieSBgVmlld0NvbnRhaW5lclJlZmAgd2hlbiB0aGUgZmlyc3QgdmlldyBpcyBpbnNlcnRlZC5cbiAgICovXG4gIFtWSUVXX1JFRlNdOiBWaWV3UmVmW118bnVsbDtcbn1cblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcbiJdfQ==