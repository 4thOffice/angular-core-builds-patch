/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Size of LViewData's header. Necessary to adjust for it when setting slots.  */
export var HEADER_OFFSET = 17;
// Below are constants for LViewData indices to help us look up LViewData members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
export var TVIEW = 0;
export var FLAGS = 1;
export var PARENT = 2;
export var NEXT = 3;
export var QUERIES = 4;
export var HOST = 5;
export var HOST_NODE = 6;
export var BINDING_INDEX = 7;
export var CLEANUP = 8;
export var CONTEXT = 9;
export var INJECTOR = 10;
export var RENDERER = 11;
export var SANITIZER = 12;
export var TAIL = 13;
export var CONTAINER_INDEX = 14;
export var CONTENT_QUERIES = 15;
export var DECLARATION_VIEW = 16;
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export var unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWNILGtGQUFrRjtBQUNsRixNQUFNLENBQUMsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRWhDLGlGQUFpRjtBQUNqRixtREFBbUQ7QUFDbkQsd0VBQXdFO0FBQ3hFLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdkIsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztBQUN2QixNQUFNLENBQUMsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxDQUFDLENBQUM7QUFDdEIsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUN6QixNQUFNLENBQUMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDM0IsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztBQUMvQixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUMzQixNQUFNLENBQUMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN2QixNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBaWdCbkMsaUZBQWlGO0FBQ2pGLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsSUFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uLy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICcuLi8uLi9saW5rZXInO1xuaW1wb3J0IHtTYW5pdGl6ZXJ9IGZyb20gJy4uLy4uL3Nhbml0aXphdGlvbi9zZWN1cml0eSc7XG5pbXBvcnQge1BsYXllckhhbmRsZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvcGxheWVyJztcblxuaW1wb3J0IHtMQ29udGFpbmVyfSBmcm9tICcuL2NvbnRhaW5lcic7XG5pbXBvcnQge0NvbXBvbmVudERlZiwgQ29tcG9uZW50UXVlcnksIENvbXBvbmVudFRlbXBsYXRlLCBEaXJlY3RpdmVEZWYsIERpcmVjdGl2ZURlZkxpc3QsIEhvc3RCaW5kaW5nc0Z1bmN0aW9uLCBQaXBlRGVmLCBQaXBlRGVmTGlzdH0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7VEVsZW1lbnROb2RlLCBUTm9kZSwgVFZpZXdOb2RlfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtMUXVlcmllc30gZnJvbSAnLi9xdWVyeSc7XG5pbXBvcnQge1JFbGVtZW50LCBSZW5kZXJlcjN9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtTdHlsaW5nQ29udGV4dH0gZnJvbSAnLi9zdHlsaW5nJztcblxuLyoqIFNpemUgb2YgTFZpZXdEYXRhJ3MgaGVhZGVyLiBOZWNlc3NhcnkgdG8gYWRqdXN0IGZvciBpdCB3aGVuIHNldHRpbmcgc2xvdHMuICAqL1xuZXhwb3J0IGNvbnN0IEhFQURFUl9PRkZTRVQgPSAxNztcblxuLy8gQmVsb3cgYXJlIGNvbnN0YW50cyBmb3IgTFZpZXdEYXRhIGluZGljZXMgdG8gaGVscCB1cyBsb29rIHVwIExWaWV3RGF0YSBtZW1iZXJzXG4vLyB3aXRob3V0IGhhdmluZyB0byByZW1lbWJlciB0aGUgc3BlY2lmaWMgaW5kaWNlcy5cbi8vIFVnbGlmeSB3aWxsIGlubGluZSB0aGVzZSB3aGVuIG1pbmlmeWluZyBzbyB0aGVyZSBzaG91bGRuJ3QgYmUgYSBjb3N0LlxuZXhwb3J0IGNvbnN0IFRWSUVXID0gMDtcbmV4cG9ydCBjb25zdCBGTEFHUyA9IDE7XG5leHBvcnQgY29uc3QgUEFSRU5UID0gMjtcbmV4cG9ydCBjb25zdCBORVhUID0gMztcbmV4cG9ydCBjb25zdCBRVUVSSUVTID0gNDtcbmV4cG9ydCBjb25zdCBIT1NUID0gNTtcbmV4cG9ydCBjb25zdCBIT1NUX05PREUgPSA2O1xuZXhwb3J0IGNvbnN0IEJJTkRJTkdfSU5ERVggPSA3O1xuZXhwb3J0IGNvbnN0IENMRUFOVVAgPSA4O1xuZXhwb3J0IGNvbnN0IENPTlRFWFQgPSA5O1xuZXhwb3J0IGNvbnN0IElOSkVDVE9SID0gMTA7XG5leHBvcnQgY29uc3QgUkVOREVSRVIgPSAxMTtcbmV4cG9ydCBjb25zdCBTQU5JVElaRVIgPSAxMjtcbmV4cG9ydCBjb25zdCBUQUlMID0gMTM7XG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0lOREVYID0gMTQ7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9RVUVSSUVTID0gMTU7XG5leHBvcnQgY29uc3QgREVDTEFSQVRJT05fVklFVyA9IDE2O1xuXG4vLyBUaGlzIGludGVyZmFjZSByZXBsYWNlcyB0aGUgcmVhbCBMVmlld0RhdGEgaW50ZXJmYWNlIGlmIGl0IGlzIGFuIGFyZyBvciBhXG4vLyByZXR1cm4gdmFsdWUgb2YgYSBwdWJsaWMgaW5zdHJ1Y3Rpb24uIFRoaXMgZW5zdXJlcyB3ZSBkb24ndCBuZWVkIHRvIGV4cG9zZVxuLy8gdGhlIGFjdHVhbCBpbnRlcmZhY2UsIHdoaWNoIHNob3VsZCBiZSBrZXB0IHByaXZhdGUuXG5leHBvcnQgaW50ZXJmYWNlIE9wYXF1ZVZpZXdTdGF0ZSB7XG4gICdfX2JyYW5kX18nOiAnQnJhbmQgZm9yIE9wYXF1ZVZpZXdTdGF0ZSB0aGF0IG5vdGhpbmcgd2lsbCBtYXRjaCc7XG59XG5cblxuLyoqXG4gKiBgTFZpZXdEYXRhYCBzdG9yZXMgYWxsIG9mIHRoZSBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gcHJvY2VzcyB0aGUgaW5zdHJ1Y3Rpb25zIGFzXG4gKiB0aGV5IGFyZSBpbnZva2VkIGZyb20gdGhlIHRlbXBsYXRlLiBFYWNoIGVtYmVkZGVkIHZpZXcgYW5kIGNvbXBvbmVudCB2aWV3IGhhcyBpdHNcbiAqIG93biBgTFZpZXdEYXRhYC4gV2hlbiBwcm9jZXNzaW5nIGEgcGFydGljdWxhciB2aWV3LCB3ZSBzZXQgdGhlIGB2aWV3RGF0YWAgdG8gdGhhdFxuICogYExWaWV3RGF0YWAuIFdoZW4gdGhhdCB2aWV3IGlzIGRvbmUgcHJvY2Vzc2luZywgdGhlIGB2aWV3RGF0YWAgaXMgc2V0IGJhY2sgdG9cbiAqIHdoYXRldmVyIHRoZSBvcmlnaW5hbCBgdmlld0RhdGFgIHdhcyBiZWZvcmUgKHRoZSBwYXJlbnQgYExWaWV3RGF0YWApLlxuICpcbiAqIEtlZXBpbmcgc2VwYXJhdGUgc3RhdGUgZm9yIGVhY2ggdmlldyBmYWNpbGl0aWVzIHZpZXcgaW5zZXJ0aW9uIC8gZGVsZXRpb24sIHNvIHdlXG4gKiBkb24ndCBoYXZlIHRvIGVkaXQgdGhlIGRhdGEgYXJyYXkgYmFzZWQgb24gd2hpY2ggdmlld3MgYXJlIHByZXNlbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFZpZXdEYXRhIGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIC8qKlxuICAgKiBUaGUgc3RhdGljIGRhdGEgZm9yIHRoaXMgdmlldy4gV2UgbmVlZCBhIHJlZmVyZW5jZSB0byB0aGlzIHNvIHdlIGNhbiBlYXNpbHkgd2FsayB1cCB0aGVcbiAgICogbm9kZSB0cmVlIGluIERJIGFuZCBnZXQgdGhlIFRWaWV3LmRhdGEgYXJyYXkgYXNzb2NpYXRlZCB3aXRoIGEgbm9kZSAod2hlcmUgdGhlXG4gICAqIGRpcmVjdGl2ZSBkZWZzIGFyZSBzdG9yZWQpLlxuICAgKi9cbiAgW1RWSUVXXTogVFZpZXc7XG5cbiAgLyoqIEZsYWdzIGZvciB0aGlzIHZpZXcuIFNlZSBMVmlld0ZsYWdzIGZvciBtb3JlIGluZm8uICovXG4gIFtGTEFHU106IExWaWV3RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJlbnQgdmlldyBpcyBuZWVkZWQgd2hlbiB3ZSBleGl0IHRoZSB2aWV3IGFuZCBtdXN0IHJlc3RvcmUgdGhlIHByZXZpb3VzXG4gICAqIGBMVmlld0RhdGFgLiBXaXRob3V0IHRoaXMsIHRoZSByZW5kZXIgbWV0aG9kIHdvdWxkIGhhdmUgdG8ga2VlcCBhIHN0YWNrIG9mXG4gICAqIHZpZXdzIGFzIGl0IGlzIHJlY3Vyc2l2ZWx5IHJlbmRlcmluZyB0ZW1wbGF0ZXMuXG4gICAqXG4gICAqIFRoaXMgaXMgdGhlIFwiaW5zZXJ0aW9uXCIgdmlldyBmb3IgZW1iZWRkZWQgdmlld3MuIFRoaXMgYWxsb3dzIHVzIHRvIHByb3Blcmx5XG4gICAqIGRlc3Ryb3kgZW1iZWRkZWQgdmlld3MuXG4gICAqL1xuICBbUEFSRU5UXTogTFZpZXdEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqXG4gICAqIFRoZSBuZXh0IHNpYmxpbmcgTFZpZXdEYXRhIG9yIExDb250YWluZXIuXG4gICAqXG4gICAqIEFsbG93cyB1cyB0byBwcm9wYWdhdGUgYmV0d2VlbiBzaWJsaW5nIHZpZXcgc3RhdGVzIHRoYXQgYXJlbid0IGluIHRoZSBzYW1lXG4gICAqIGNvbnRhaW5lci4gRW1iZWRkZWQgdmlld3MgYWxyZWFkeSBoYXZlIGEgbm9kZS5uZXh0LCBidXQgaXQgaXMgb25seSBzZXQgZm9yXG4gICAqIHZpZXdzIGluIHRoZSBzYW1lIGNvbnRhaW5lci4gV2UgbmVlZCBhIHdheSB0byBsaW5rIGNvbXBvbmVudCB2aWV3cyBhbmQgdmlld3NcbiAgICogYWNyb3NzIGNvbnRhaW5lcnMgYXMgd2VsbC5cbiAgICovXG4gIFtORVhUXTogTFZpZXdEYXRhfExDb250YWluZXJ8bnVsbDtcblxuICAvKiogUXVlcmllcyBhY3RpdmUgZm9yIHRoaXMgdmlldyAtIG5vZGVzIGZyb20gYSB2aWV3IGFyZSByZXBvcnRlZCB0byB0aG9zZSBxdWVyaWVzLiAqL1xuICBbUVVFUklFU106IExRdWVyaWVzfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBob3N0IG5vZGUgZm9yIHRoaXMgTFZpZXdEYXRhIGluc3RhbmNlLCBpZiB0aGlzIGlzIGEgY29tcG9uZW50IHZpZXcuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYW4gZW1iZWRkZWQgdmlldywgSE9TVCB3aWxsIGJlIG51bGwuXG4gICAqL1xuICBbSE9TVF06IFJFbGVtZW50fFN0eWxpbmdDb250ZXh0fG51bGw7XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgdG8gdGhlIGBUVmlld05vZGVgIG9yIGBURWxlbWVudE5vZGVgIHdoaWNoIHJlcHJlc2VudHMgdGhlIHJvb3Qgb2YgdGhlIHZpZXcuXG4gICAqXG4gICAqIElmIGBUVmlld05vZGVgLCB0aGlzIGlzIGFuIGVtYmVkZGVkIHZpZXcgb2YgYSBjb250YWluZXIuIFdlIG5lZWQgdGhpcyB0byBiZSBhYmxlIHRvXG4gICAqIGVmZmljaWVudGx5IGZpbmQgdGhlIGBMVmlld05vZGVgIHdoZW4gaW5zZXJ0aW5nIHRoZSB2aWV3IGludG8gYW4gYW5jaG9yLlxuICAgKlxuICAgKiBJZiBgVEVsZW1lbnROb2RlYCwgdGhpcyBpcyB0aGUgTFZpZXcgb2YgYSBjb21wb25lbnQuXG4gICAqXG4gICAqIElmIG51bGwsIHRoaXMgaXMgdGhlIHJvb3QgdmlldyBvZiBhbiBhcHBsaWNhdGlvbiAocm9vdCBjb21wb25lbnQgaXMgaW4gdGhpcyB2aWV3KS5cbiAgICovXG4gIFtIT1NUX05PREVdOiBUVmlld05vZGV8VEVsZW1lbnROb2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBiaW5kaW5nIGluZGV4IHdlIHNob3VsZCBhY2Nlc3MgbmV4dC5cbiAgICpcbiAgICogVGhpcyBpcyBzdG9yZWQgc28gdGhhdCBiaW5kaW5ncyBjYW4gY29udGludWUgd2hlcmUgdGhleSBsZWZ0IG9mZlxuICAgKiBpZiBhIHZpZXcgaXMgbGVmdCBtaWR3YXkgdGhyb3VnaCBwcm9jZXNzaW5nIGJpbmRpbmdzIChlLmcuIGlmIHRoZXJlIGlzXG4gICAqIGEgc2V0dGVyIHRoYXQgY3JlYXRlcyBhbiBlbWJlZGRlZCB2aWV3LCBsaWtlIGluIG5nSWYpLlxuICAgKi9cbiAgW0JJTkRJTkdfSU5ERVhdOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZW4gYSB2aWV3IGlzIGRlc3Ryb3llZCwgbGlzdGVuZXJzIG5lZWQgdG8gYmUgcmVsZWFzZWQgYW5kIG91dHB1dHMgbmVlZCB0byBiZVxuICAgKiB1bnN1YnNjcmliZWQuIFRoaXMgY29udGV4dCBhcnJheSBzdG9yZXMgYm90aCBsaXN0ZW5lciBmdW5jdGlvbnMgd3JhcHBlZCB3aXRoXG4gICAqIHRoZWlyIGNvbnRleHQgYW5kIG91dHB1dCBzdWJzY3JpcHRpb24gaW5zdGFuY2VzIGZvciBhIHBhcnRpY3VsYXIgdmlldy5cbiAgICpcbiAgICogVGhlc2UgY2hhbmdlIHBlciBMVmlldyBpbnN0YW5jZSwgc28gdGhleSBjYW5ub3QgYmUgc3RvcmVkIG9uIFRWaWV3LiBJbnN0ZWFkLFxuICAgKiBUVmlldy5jbGVhbnVwIHNhdmVzIGFuIGluZGV4IHRvIHRoZSBuZWNlc3NhcnkgY29udGV4dCBpbiB0aGlzIGFycmF5LlxuICAgKi9cbiAgLy8gVE9ETzogZmxhdHRlbiBpbnRvIExWaWV3RGF0YVtdXG4gIFtDTEVBTlVQXTogYW55W118bnVsbDtcblxuICAvKipcbiAgICogLSBGb3IgZHluYW1pYyB2aWV3cywgdGhpcyBpcyB0aGUgY29udGV4dCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUgKGUuZy5cbiAgICogICBgTmdGb3JDb250ZXh0YCksIG9yIGB7fWAgaWYgbm90IGRlZmluZWQgZXhwbGljaXRseS5cbiAgICogLSBGb3Igcm9vdCB2aWV3IG9mIHRoZSByb290IGNvbXBvbmVudCB0aGUgY29udGV4dCBjb250YWlucyBjaGFuZ2UgZGV0ZWN0aW9uIGRhdGEuXG4gICAqIC0gRm9yIG5vbi1yb290IGNvbXBvbmVudHMsIHRoZSBjb250ZXh0IGlzIHRoZSBjb21wb25lbnQgaW5zdGFuY2UsXG4gICAqIC0gRm9yIGlubGluZSB2aWV3cywgdGhlIGNvbnRleHQgaXMgbnVsbC5cbiAgICovXG4gIFtDT05URVhUXToge318Um9vdENvbnRleHR8bnVsbDtcblxuICAvKiogQW4gb3B0aW9uYWwgTW9kdWxlIEluamVjdG9yIHRvIGJlIHVzZWQgYXMgZmFsbCBiYWNrIGFmdGVyIEVsZW1lbnQgSW5qZWN0b3JzIGFyZSBjb25zdWx0ZWQuICovXG4gIFtJTkpFQ1RPUl06IEluamVjdG9yfG51bGw7XG5cbiAgLyoqIFJlbmRlcmVyIHRvIGJlIHVzZWQgZm9yIHRoaXMgdmlldy4gKi9cbiAgW1JFTkRFUkVSXTogUmVuZGVyZXIzO1xuXG4gIC8qKiBBbiBvcHRpb25hbCBjdXN0b20gc2FuaXRpemVyLiAqL1xuICBbU0FOSVRJWkVSXTogU2FuaXRpemVyfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IExWaWV3RGF0YSBvciBMQ29udGFpbmVyIGJlbmVhdGggdGhpcyBMVmlld0RhdGEgaW4gdGhlIGhpZXJhcmNoeS5cbiAgICpcbiAgICogVGhlIHRhaWwgYWxsb3dzIHVzIHRvIHF1aWNrbHkgYWRkIGEgbmV3IHN0YXRlIHRvIHRoZSBlbmQgb2YgdGhlIHZpZXcgbGlzdFxuICAgKiB3aXRob3V0IGhhdmluZyB0byBwcm9wYWdhdGUgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3QgY2hpbGQuXG4gICAqL1xuICBbVEFJTF06IExWaWV3RGF0YXxMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lcidzIGhvc3Qgbm9kZS4gQXBwbGljYWJsZSBvbmx5IHRvIGVtYmVkZGVkIHZpZXdzIHRoYXRcbiAgICogaGF2ZSBiZWVuIGluc2VydGVkIGR5bmFtaWNhbGx5LiBXaWxsIGJlIC0xIGZvciBjb21wb25lbnQgdmlld3MgYW5kIGlubGluZSB2aWV3cy5cbiAgICpcbiAgICogVGhpcyBpcyBuZWNlc3NhcnkgdG8ganVtcCBmcm9tIGR5bmFtaWNhbGx5IGNyZWF0ZWQgZW1iZWRkZWQgdmlld3MgdG8gdGhlaXIgcGFyZW50XG4gICAqIGNvbnRhaW5lcnMgYmVjYXVzZSB0aGVpciBwYXJlbnQgY2Fubm90IGJlIHN0b3JlZCBvbiB0aGUgVFZpZXdOb2RlICh2aWV3cyBtYXkgYmUgaW5zZXJ0ZWRcbiAgICogaW4gbXVsdGlwbGUgY29udGFpbmVycywgc28gdGhlIHBhcmVudCBjYW5ub3QgYmUgc2hhcmVkIGJldHdlZW4gdmlldyBpbnN0YW5jZXMpLlxuICAgKi9cbiAgW0NPTlRBSU5FUl9JTkRFWF06IG51bWJlcjtcblxuICAvKipcbiAgICogU3RvcmVzIFF1ZXJ5TGlzdHMgYXNzb2NpYXRlZCB3aXRoIGNvbnRlbnQgcXVlcmllcyBvZiBhIGRpcmVjdGl2ZS4gVGhpcyBkYXRhIHN0cnVjdHVyZSBpc1xuICAgKiBmaWxsZWQtaW4gYXMgcGFydCBvZiBhIGRpcmVjdGl2ZSBjcmVhdGlvbiBwcm9jZXNzIGFuZCBpcyBsYXRlciB1c2VkIHRvIHJldHJpZXZlIGEgUXVlcnlMaXN0IHRvXG4gICAqIGJlIHJlZnJlc2hlZC5cbiAgICovXG4gIFtDT05URU5UX1FVRVJJRVNdOiBRdWVyeUxpc3Q8YW55PltdfG51bGw7XG5cbiAgLyoqXG4gICAqIFZpZXcgd2hlcmUgdGhpcyB2aWV3J3MgdGVtcGxhdGUgd2FzIGRlY2xhcmVkLlxuICAgKlxuICAgKiBPbmx5IGFwcGxpY2FibGUgZm9yIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3MuIFdpbGwgYmUgbnVsbCBmb3IgaW5saW5lL2NvbXBvbmVudCB2aWV3cy5cbiAgICpcbiAgICogVGhlIHRlbXBsYXRlIGZvciBhIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlldyBtYXkgYmUgZGVjbGFyZWQgaW4gYSBkaWZmZXJlbnQgdmlldyB0aGFuXG4gICAqIGl0IGlzIGluc2VydGVkLiBXZSBhbHJlYWR5IHRyYWNrIHRoZSBcImluc2VydGlvbiB2aWV3XCIgKHZpZXcgd2hlcmUgdGhlIHRlbXBsYXRlIHdhc1xuICAgKiBpbnNlcnRlZCkgaW4gTFZpZXdEYXRhW1BBUkVOVF0sIGJ1dCB3ZSBhbHNvIG5lZWQgYWNjZXNzIHRvIHRoZSBcImRlY2xhcmF0aW9uIHZpZXdcIlxuICAgKiAodmlldyB3aGVyZSB0aGUgdGVtcGxhdGUgd2FzIGRlY2xhcmVkKS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZG4ndCBiZSBhYmxlIHRvIGNhbGwgdGhlXG4gICAqIHZpZXcncyB0ZW1wbGF0ZSBmdW5jdGlvbiB3aXRoIHRoZSBwcm9wZXIgY29udGV4dHMuIENvbnRleHQgc2hvdWxkIGJlIGluaGVyaXRlZCBmcm9tXG4gICAqIHRoZSBkZWNsYXJhdGlvbiB2aWV3IHRyZWUsIG5vdCB0aGUgaW5zZXJ0aW9uIHZpZXcgdHJlZS5cbiAgICpcbiAgICogRXhhbXBsZSAoQXBwQ29tcG9uZW50IHRlbXBsYXRlKTpcbiAgICpcbiAgICogPG5nLXRlbXBsYXRlICNmb28+PC9uZy10ZW1wbGF0ZT4gICAgICAgPC0tIGRlY2xhcmVkIGhlcmUgLS0+XG4gICAqIDxzb21lLWNvbXAgW3RwbF09XCJmb29cIj48L3NvbWUtY29tcD4gICAgPC0tIGluc2VydGVkIGluc2lkZSB0aGlzIGNvbXBvbmVudCAtLT5cbiAgICpcbiAgICogVGhlIDxuZy10ZW1wbGF0ZT4gYWJvdmUgaXMgZGVjbGFyZWQgaW4gdGhlIEFwcENvbXBvbmVudCB0ZW1wbGF0ZSwgYnV0IGl0IHdpbGwgYmUgcGFzc2VkIGludG9cbiAgICogU29tZUNvbXAgYW5kIGluc2VydGVkIHRoZXJlLiBJbiB0aGlzIGNhc2UsIHRoZSBkZWNsYXJhdGlvbiB2aWV3IHdvdWxkIGJlIHRoZSBBcHBDb21wb25lbnQsXG4gICAqIGJ1dCB0aGUgaW5zZXJ0aW9uIHZpZXcgd291bGQgYmUgU29tZUNvbXAuIFdoZW4gd2UgYXJlIHJlbW92aW5nIHZpZXdzLCB3ZSB3b3VsZCB3YW50IHRvXG4gICAqIHRyYXZlcnNlIHRocm91Z2ggdGhlIGluc2VydGlvbiB2aWV3IHRvIGNsZWFuIHVwIGxpc3RlbmVycy4gV2hlbiB3ZSBhcmUgY2FsbGluZyB0aGVcbiAgICogdGVtcGxhdGUgZnVuY3Rpb24gZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHdlIG5lZWQgdGhlIGRlY2xhcmF0aW9uIHZpZXcgdG8gZ2V0IGluaGVyaXRlZFxuICAgKiBjb250ZXh0LlxuICAgKi9cbiAgW0RFQ0xBUkFUSU9OX1ZJRVddOiBMVmlld0RhdGF8bnVsbDtcbn1cblxuLyoqIEZsYWdzIGFzc29jaWF0ZWQgd2l0aCBhbiBMVmlldyAoc2F2ZWQgaW4gTFZpZXdEYXRhW0ZMQUdTXSkgKi9cbmV4cG9ydCBjb25zdCBlbnVtIExWaWV3RmxhZ3Mge1xuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHZpZXcgaXMgaW4gY3JlYXRpb25Nb2RlLlxuICAgKlxuICAgKiBUaGlzIG11c3QgYmUgc3RvcmVkIGluIHRoZSB2aWV3IHJhdGhlciB0aGFuIHVzaW5nIGBkYXRhYCBhcyBhIG1hcmtlciBzbyB0aGF0XG4gICAqIHdlIGNhbiBwcm9wZXJseSBzdXBwb3J0IGVtYmVkZGVkIHZpZXdzLiBPdGhlcndpc2UsIHdoZW4gZXhpdGluZyBhIGNoaWxkIHZpZXdcbiAgICogYmFjayBpbnRvIHRoZSBwYXJlbnQgdmlldywgYGRhdGFgIHdpbGwgYmUgZGVmaW5lZCBhbmQgYGNyZWF0aW9uTW9kZWAgd2lsbCBiZVxuICAgKiBpbXByb3Blcmx5IHJlcG9ydGVkIGFzIGZhbHNlLlxuICAgKi9cbiAgQ3JlYXRpb25Nb2RlID0gMGIwMDAwMDAxLFxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgdmlldyBoYXMgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5IChjaGVja3MgYWx3YXlzKSBvciBvblB1c2ggKi9cbiAgQ2hlY2tBbHdheXMgPSAwYjAwMDAwMTAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBjdXJyZW50bHkgZGlydHkgKG5lZWRpbmcgY2hlY2spICovXG4gIERpcnR5ID0gMGIwMDAwMTAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgY3VycmVudGx5IGF0dGFjaGVkIHRvIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS4gKi9cbiAgQXR0YWNoZWQgPSAwYjAwMDEwMDAsXG5cbiAgLyoqXG4gICAqICBXaGV0aGVyIG9yIG5vdCB0aGUgaW5pdCBob29rcyBoYXZlIHJ1bi5cbiAgICpcbiAgICogSWYgb24sIHRoZSBpbml0IGhvb2tzIGhhdmVuJ3QgeWV0IGJlZW4gcnVuIGFuZCBzaG91bGQgYmUgZXhlY3V0ZWQgYnkgdGhlIGZpcnN0IGNvbXBvbmVudCB0aGF0XG4gICAqIHJ1bnMgT1IgdGhlIGZpcnN0IGNSKCkgaW5zdHJ1Y3Rpb24gdGhhdCBydW5zIChzbyBpbml0cyBhcmUgcnVuIGZvciB0aGUgdG9wIGxldmVsIHZpZXcgYmVmb3JlXG4gICAqIGFueSBlbWJlZGRlZCB2aWV3cykuXG4gICAqL1xuICBSdW5Jbml0ID0gMGIwMDEwMDAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLiAqL1xuICBEZXN0cm95ZWQgPSAwYjAxMDAwMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyB0aGUgcm9vdCB2aWV3ICovXG4gIElzUm9vdCA9IDBiMTAwMDAwMCxcbn1cblxuLyoqXG4gKiBUaGUgc3RhdGljIGRhdGEgZm9yIGFuIExWaWV3IChzaGFyZWQgYmV0d2VlbiBhbGwgdGVtcGxhdGVzIG9mIGFcbiAqIGdpdmVuIHR5cGUpLlxuICpcbiAqIFN0b3JlZCBvbiB0aGUgdGVtcGxhdGUgZnVuY3Rpb24gYXMgbmdQcml2YXRlRGF0YS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUVmlldyB7XG4gIC8qKlxuICAgKiBJRCBmb3IgaW5saW5lIHZpZXdzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgdmlldyBpcyB0aGUgc2FtZSBhcyB0aGUgcHJldmlvdXMgdmlld1xuICAgKiBpbiBhIGNlcnRhaW4gcG9zaXRpb24uIElmIGl0J3Mgbm90LCB3ZSBrbm93IHRoZSBuZXcgdmlldyBuZWVkcyB0byBiZSBpbnNlcnRlZFxuICAgKiBhbmQgdGhlIG9uZSB0aGF0IGV4aXN0cyBuZWVkcyB0byBiZSByZW1vdmVkIChlLmcuIGlmL2Vsc2Ugc3RhdGVtZW50cylcbiAgICpcbiAgICogSWYgdGhpcyBpcyAtMSwgdGhlbiB0aGlzIGlzIGEgY29tcG9uZW50IHZpZXcgb3IgYSBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXcuXG4gICAqL1xuICByZWFkb25seSBpZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgYmx1ZXByaW50IHVzZWQgdG8gZ2VuZXJhdGUgTFZpZXdEYXRhIGluc3RhbmNlcyBmb3IgdGhpcyBUVmlldy4gQ29weWluZyB0aGlzXG4gICAqIGJsdWVwcmludCBpcyBmYXN0ZXIgdGhhbiBjcmVhdGluZyBhIG5ldyBMVmlld0RhdGEgZnJvbSBzY3JhdGNoLlxuICAgKi9cbiAgYmx1ZXByaW50OiBMVmlld0RhdGE7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSBmdW5jdGlvbiB1c2VkIHRvIHJlZnJlc2ggdGhlIHZpZXcgb2YgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3c1xuICAgKiBhbmQgY29tcG9uZW50cy4gV2lsbCBiZSBudWxsIGZvciBpbmxpbmUgdmlld3MuXG4gICAqL1xuICB0ZW1wbGF0ZTogQ29tcG9uZW50VGVtcGxhdGU8e30+fG51bGw7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gY29udGFpbmluZyBxdWVyeS1yZWxhdGVkIGluc3RydWN0aW9ucy5cbiAgICovXG4gIHZpZXdRdWVyeTogQ29tcG9uZW50UXVlcnk8e30+fG51bGw7XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgdG8gdGhlIGBUTm9kZWAgdGhhdCByZXByZXNlbnRzIHRoZSByb290IG9mIHRoZSB2aWV3LlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIGEgYFROb2RlYCBmb3IgYW4gYExWaWV3Tm9kZWAsIHRoaXMgaXMgYW4gZW1iZWRkZWQgdmlldyBvZiBhIGNvbnRhaW5lci5cbiAgICogV2UgbmVlZCB0aGlzIHBvaW50ZXIgdG8gYmUgYWJsZSB0byBlZmZpY2llbnRseSBmaW5kIHRoaXMgbm9kZSB3aGVuIGluc2VydGluZyB0aGUgdmlld1xuICAgKiBpbnRvIGFuIGFuY2hvci5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBhIGBURWxlbWVudE5vZGVgLCB0aGlzIGlzIHRoZSB2aWV3IG9mIGEgcm9vdCBjb21wb25lbnQuIEl0IGhhcyBleGFjdGx5IG9uZVxuICAgKiByb290IFROb2RlLlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIG51bGwsIHRoaXMgaXMgdGhlIHZpZXcgb2YgYSBjb21wb25lbnQgdGhhdCBpcyBub3QgYXQgcm9vdC4gV2UgZG8gbm90IHN0b3JlXG4gICAqIHRoZSBob3N0IFROb2RlcyBmb3IgY2hpbGQgY29tcG9uZW50IHZpZXdzIGJlY2F1c2UgdGhleSBjYW4gcG90ZW50aWFsbHkgaGF2ZSBzZXZlcmFsXG4gICAqIGRpZmZlcmVudCBob3N0IFROb2RlcywgZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgYmVpbmcgdXNlZC4gVGhlc2UgaG9zdFxuICAgKiBUTm9kZXMgY2Fubm90IGJlIHNoYXJlZCAoZHVlIHRvIGRpZmZlcmVudCBpbmRpY2VzLCBldGMpLlxuICAgKi9cbiAgbm9kZTogVFZpZXdOb2RlfFRFbGVtZW50Tm9kZXxudWxsO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHRlbXBsYXRlIGhhcyBiZWVuIHByb2Nlc3NlZC4gKi9cbiAgZmlyc3RUZW1wbGF0ZVBhc3M6IGJvb2xlYW47XG5cbiAgLyoqIFN0YXRpYyBkYXRhIGVxdWl2YWxlbnQgb2YgTFZpZXcuZGF0YVtdLiBDb250YWlucyBUTm9kZXMuICovXG4gIGRhdGE6IFREYXRhO1xuXG4gIC8qKlxuICAgKiBUaGUgYmluZGluZyBzdGFydCBpbmRleCBpcyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGRhdGEgYXJyYXlcbiAgICogc3RhcnRzIHRvIHN0b3JlIGJpbmRpbmdzIG9ubHkuIFNhdmluZyB0aGlzIHZhbHVlIGVuc3VyZXMgdGhhdCB3ZVxuICAgKiB3aWxsIGJlZ2luIHJlYWRpbmcgYmluZGluZ3MgYXQgdGhlIGNvcnJlY3QgcG9pbnQgaW4gdGhlIGFycmF5IHdoZW5cbiAgICogd2UgYXJlIGluIHVwZGF0ZSBtb2RlLlxuICAgKi9cbiAgYmluZGluZ1N0YXJ0SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGluZGV4IHdoZXJlIHRoZSBcImV4cGFuZG9cIiBzZWN0aW9uIG9mIGBMVmlld0RhdGFgIGJlZ2lucy4gVGhlIGV4cGFuZG9cbiAgICogc2VjdGlvbiBjb250YWlucyBpbmplY3RvcnMsIGRpcmVjdGl2ZSBpbnN0YW5jZXMsIGFuZCBob3N0IGJpbmRpbmcgdmFsdWVzLlxuICAgKiBVbmxpa2UgdGhlIFwiY29uc3RzXCIgYW5kIFwidmFyc1wiIHNlY3Rpb25zIG9mIGBMVmlld0RhdGFgLCB0aGUgbGVuZ3RoIG9mIHRoaXNcbiAgICogc2VjdGlvbiBjYW5ub3QgYmUgY2FsY3VsYXRlZCBhdCBjb21waWxlLXRpbWUgYmVjYXVzZSBkaXJlY3RpdmVzIGFyZSBtYXRjaGVkXG4gICAqIGF0IHJ1bnRpbWUgdG8gcHJlc2VydmUgbG9jYWxpdHkuXG4gICAqXG4gICAqIFdlIHN0b3JlIHRoaXMgc3RhcnQgaW5kZXggc28gd2Uga25vdyB3aGVyZSB0byBzdGFydCBjaGVja2luZyBob3N0IGJpbmRpbmdzXG4gICAqIGluIGBzZXRIb3N0QmluZGluZ3NgLlxuICAgKi9cbiAgZXhwYW5kb1N0YXJ0SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogSW5kZXggb2YgdGhlIGhvc3Qgbm9kZSBvZiB0aGUgZmlyc3QgTFZpZXcgb3IgTENvbnRhaW5lciBiZW5lYXRoIHRoaXMgTFZpZXcgaW5cbiAgICogdGhlIGhpZXJhcmNoeS5cbiAgICpcbiAgICogTmVjZXNzYXJ5IHRvIHN0b3JlIHRoaXMgc28gdmlld3MgY2FuIHRyYXZlcnNlIHRocm91Z2ggdGhlaXIgbmVzdGVkIHZpZXdzXG4gICAqIHRvIHJlbW92ZSBsaXN0ZW5lcnMgYW5kIGNhbGwgb25EZXN0cm95IGNhbGxiYWNrcy5cbiAgICpcbiAgICogRm9yIGVtYmVkZGVkIHZpZXdzLCB3ZSBzdG9yZSB0aGUgaW5kZXggb2YgYW4gTENvbnRhaW5lcidzIGhvc3QgcmF0aGVyIHRoYW4gdGhlIGZpcnN0XG4gICAqIExWaWV3IHRvIGF2b2lkIG1hbmFnaW5nIHNwbGljaW5nIHdoZW4gdmlld3MgYXJlIGFkZGVkL3JlbW92ZWQuXG4gICAqL1xuICBjaGlsZEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBmaXJzdCBjaGlsZCBub2RlIGxvY2F0ZWQgaW4gdGhlIHZpZXcuXG4gICAqL1xuICBmaXJzdENoaWxkOiBUTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBTZWxlY3RvciBtYXRjaGVzIGZvciBhIG5vZGUgYXJlIHRlbXBvcmFyaWx5IGNhY2hlZCBvbiB0aGUgVFZpZXcgc28gdGhlXG4gICAqIERJIHN5c3RlbSBjYW4gZWFnZXJseSBpbnN0YW50aWF0ZSBkaXJlY3RpdmVzIG9uIHRoZSBzYW1lIG5vZGUgaWYgdGhleSBhcmVcbiAgICogY3JlYXRlZCBvdXQgb2Ygb3JkZXIuIFRoZXkgYXJlIG92ZXJ3cml0dGVuIGFmdGVyIGVhY2ggbm9kZS5cbiAgICpcbiAgICogPGRpdiBkaXJBIGRpckI+PC9kaXY+XG4gICAqXG4gICAqIGUuZy4gRGlyQSBpbmplY3RzIERpckIsIGJ1dCBEaXJBIGlzIGNyZWF0ZWQgZmlyc3QuIERJIHNob3VsZCBpbnN0YW50aWF0ZVxuICAgKiBEaXJCIHdoZW4gaXQgZmluZHMgdGhhdCBpdCdzIG9uIHRoZSBzYW1lIG5vZGUsIGJ1dCBub3QgeWV0IGNyZWF0ZWQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGRlZnNcbiAgICogT2RkIGluZGljZXM6XG4gICAqICAgLSBOdWxsIGlmIHRoZSBhc3NvY2lhdGVkIGRpcmVjdGl2ZSBoYXNuJ3QgYmVlbiBpbnN0YW50aWF0ZWQgeWV0XG4gICAqICAgLSBEaXJlY3RpdmUgaW5kZXgsIGlmIGFzc29jaWF0ZWQgZGlyZWN0aXZlIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICogICAtIFN0cmluZywgdGVtcG9yYXJ5ICdDSVJDVUxBUicgdG9rZW4gc2V0IHdoaWxlIGRlcGVuZGVuY2llcyBhcmUgYmVpbmcgcmVzb2x2ZWRcbiAgICovXG4gIGN1cnJlbnRNYXRjaGVzOiBDdXJyZW50TWF0Y2hlc0xpc3R8bnVsbDtcblxuICAvKipcbiAgICogU2V0IG9mIGluc3RydWN0aW9ucyB1c2VkIHRvIHByb2Nlc3MgaG9zdCBiaW5kaW5ncyBlZmZpY2llbnRseS5cbiAgICpcbiAgICogU2VlIFZJRVdfREFUQS5tZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGV4cGFuZG9JbnN0cnVjdGlvbnM6IChudW1iZXJ8SG9zdEJpbmRpbmdzRnVuY3Rpb24pW118bnVsbDtcblxuICAvKipcbiAgICogRnVsbCByZWdpc3RyeSBvZiBkaXJlY3RpdmVzIGFuZCBjb21wb25lbnRzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogSXQncyBuZWNlc3NhcnkgdG8ga2VlcCBhIGNvcHkgb2YgdGhlIGZ1bGwgZGVmIGxpc3Qgb24gdGhlIFRWaWV3IHNvIGl0J3MgcG9zc2libGVcbiAgICogdG8gcmVuZGVyIHRlbXBsYXRlIGZ1bmN0aW9ucyB3aXRob3V0IGEgaG9zdCBjb21wb25lbnQuXG4gICAqL1xuICBkaXJlY3RpdmVSZWdpc3RyeTogRGlyZWN0aXZlRGVmTGlzdHxudWxsO1xuXG4gIC8qKlxuICAgKiBGdWxsIHJlZ2lzdHJ5IG9mIHBpcGVzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogVGhlIHByb3BlcnR5IGlzIGVpdGhlciBhbiBhcnJheSBvZiBgUGlwZURlZnNgcyBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGFycmF5IG9mXG4gICAqIGBQaXBlRGVmc2BzLiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAgICpcbiAgICogSXQncyBuZWNlc3NhcnkgdG8ga2VlcCBhIGNvcHkgb2YgdGhlIGZ1bGwgZGVmIGxpc3Qgb24gdGhlIFRWaWV3IHNvIGl0J3MgcG9zc2libGVcbiAgICogdG8gcmVuZGVyIHRlbXBsYXRlIGZ1bmN0aW9ucyB3aXRob3V0IGEgaG9zdCBjb21wb25lbnQuXG4gICAqL1xuICBwaXBlUmVnaXN0cnk6IFBpcGVEZWZMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nT25Jbml0IGFuZCBuZ0RvQ2hlY2sgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpblxuICAgKiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgaW5pdEhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0RvQ2hlY2sgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpbiB1cGRhdGUgbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGNoZWNrSG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJDb250ZW50SW5pdCBhbmQgbmdBZnRlckNvbnRlbnRDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkXG4gICAqIGZvciB0aGlzIHZpZXcgaW4gY3JlYXRpb24gbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnRlbnRIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlckNvbnRlbnRDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW4gdXBkYXRlXG4gICAqIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBjb250ZW50Q2hlY2tIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlclZpZXdJbml0IGFuZCBuZ0FmdGVyVmlld0NoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yXG4gICAqIHRoaXMgdmlldyBpbiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgdmlld0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyVmlld0NoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpblxuICAgKiB1cGRhdGUgbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIHZpZXdDaGVja0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ09uRGVzdHJveSBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCB3aGVuIHRoaXMgdmlldyBpcyBkZXN0cm95ZWQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBkZXN0cm95SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHBpcGUgbmdPbkRlc3Ryb3kgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgd2hlbiB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IEluZGV4IG9mIHBpcGUgaW4gZGF0YVxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKlxuICAgKiBUaGVzZSBtdXN0IGJlIHN0b3JlZCBzZXBhcmF0ZWx5IGZyb20gZGlyZWN0aXZlIGRlc3Ryb3kgaG9va3MgYmVjYXVzZSB0aGVpciBjb250ZXh0c1xuICAgKiBhcmUgc3RvcmVkIGluIGRhdGEuXG4gICAqL1xuICBwaXBlRGVzdHJveUhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyBpcyBkZXN0cm95ZWQsIGxpc3RlbmVycyBuZWVkIHRvIGJlIHJlbGVhc2VkIGFuZCBvdXRwdXRzIG5lZWQgdG8gYmVcbiAgICogdW5zdWJzY3JpYmVkLiBUaGlzIGNsZWFudXAgYXJyYXkgc3RvcmVzIGJvdGggbGlzdGVuZXIgZGF0YSAoaW4gY2h1bmtzIG9mIDQpXG4gICAqIGFuZCBvdXRwdXQgZGF0YSAoaW4gY2h1bmtzIG9mIDIpIGZvciBhIHBhcnRpY3VsYXIgdmlldy4gQ29tYmluaW5nIHRoZSBhcnJheXNcbiAgICogc2F2ZXMgb24gbWVtb3J5ICg3MCBieXRlcyBwZXIgYXJyYXkpIGFuZCBvbiBhIGZldyBieXRlcyBvZiBjb2RlIHNpemUgKGZvciB0d29cbiAgICogc2VwYXJhdGUgZm9yIGxvb3BzKS5cbiAgICpcbiAgICogSWYgaXQncyBhIG5hdGl2ZSBET00gbGlzdGVuZXIgYmVpbmcgc3RvcmVkOlxuICAgKiAxc3QgaW5kZXggaXM6IGV2ZW50IG5hbWUgdG8gcmVtb3ZlXG4gICAqIDJuZCBpbmRleCBpczogaW5kZXggb2YgbmF0aXZlIGVsZW1lbnQgaW4gTFZpZXcuZGF0YVtdXG4gICAqIDNyZCBpbmRleCBpczogaW5kZXggb2Ygd3JhcHBlZCBsaXN0ZW5lciBmdW5jdGlvbiBpbiBMVmlldy5jbGVhbnVwSW5zdGFuY2VzW11cbiAgICogNHRoIGluZGV4IGlzOiB1c2VDYXB0dXJlIGJvb2xlYW5cbiAgICpcbiAgICogSWYgaXQncyBhIHJlbmRlcmVyMiBzdHlsZSBsaXN0ZW5lciBvciBWaWV3UmVmIGRlc3Ryb3kgaG9vayBiZWluZyBzdG9yZWQ6XG4gICAqIDFzdCBpbmRleCBpczogaW5kZXggb2YgdGhlIGNsZWFudXAgZnVuY3Rpb24gaW4gTFZpZXcuY2xlYW51cEluc3RhbmNlc1tdXG4gICAqIDJuZCBpbmRleCBpczogbnVsbFxuICAgKlxuICAgKiBJZiBpdCdzIGFuIG91dHB1dCBzdWJzY3JpcHRpb24gb3IgcXVlcnkgbGlzdCBkZXN0cm95IGhvb2s6XG4gICAqIDFzdCBpbmRleCBpczogb3V0cHV0IHVuc3Vic2NyaWJlIGZ1bmN0aW9uIC8gcXVlcnkgbGlzdCBkZXN0cm95IGZ1bmN0aW9uXG4gICAqIDJuZCBpbmRleCBpczogaW5kZXggb2YgZnVuY3Rpb24gY29udGV4dCBpbiBMVmlldy5jbGVhbnVwSW5zdGFuY2VzW11cbiAgICovXG4gIGNsZWFudXA6IGFueVtdfG51bGw7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBlbGVtZW50IGluZGljZXMgZm9yIGNoaWxkIGNvbXBvbmVudHMgdGhhdCB3aWxsIG5lZWQgdG8gYmVcbiAgICogcmVmcmVzaGVkIHdoZW4gdGhlIGN1cnJlbnQgdmlldyBoYXMgZmluaXNoZWQgaXRzIGNoZWNrLiBUaGVzZSBpbmRpY2VzIGhhdmVcbiAgICogYWxyZWFkeSBiZWVuIGFkanVzdGVkIGZvciB0aGUgSEVBREVSX09GRlNFVC5cbiAgICpcbiAgICovXG4gIGNvbXBvbmVudHM6IG51bWJlcltdfG51bGw7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBpbmRpY2VzIGZvciBjaGlsZCBkaXJlY3RpdmVzIHRoYXQgaGF2ZSBjb250ZW50IHF1ZXJpZXMuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGljZXNcbiAgICogT2RkIGluZGljZXM6IFN0YXJ0aW5nIGluZGV4IG9mIGNvbnRlbnQgcXVlcmllcyAoc3RvcmVkIGluIENPTlRFTlRfUVVFUklFUykgZm9yIHRoaXMgZGlyZWN0aXZlXG4gICAqL1xuICBjb250ZW50UXVlcmllczogbnVtYmVyW118bnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gUm9vdENvbnRleHRGbGFncyB7RW1wdHkgPSAwYjAwLCBEZXRlY3RDaGFuZ2VzID0gMGIwMSwgRmx1c2hQbGF5ZXJzID0gMGIxMH1cblxuXG4vKipcbiAqIFJvb3RDb250ZXh0IGNvbnRhaW5zIGluZm9ybWF0aW9uIHdoaWNoIGlzIHNoYXJlZCBmb3IgYWxsIGNvbXBvbmVudHMgd2hpY2hcbiAqIHdlcmUgYm9vdHN0cmFwcGVkIHdpdGgge0BsaW5rIHJlbmRlckNvbXBvbmVudH0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUm9vdENvbnRleHQge1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB1c2VkIGZvciBzY2hlZHVsaW5nIGNoYW5nZSBkZXRlY3Rpb24gaW4gdGhlIGZ1dHVyZS4gVXN1YWxseVxuICAgKiB0aGlzIGlzIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgLlxuICAgKi9cbiAgc2NoZWR1bGVyOiAod29ya0ZuOiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBIHByb21pc2Ugd2hpY2ggaXMgcmVzb2x2ZWQgd2hlbiBhbGwgY29tcG9uZW50cyBhcmUgY29uc2lkZXJlZCBjbGVhbiAobm90IGRpcnR5KS5cbiAgICpcbiAgICogVGhpcyBwcm9taXNlIGlzIG92ZXJ3cml0dGVuIGV2ZXJ5IHRpbWUgYSBmaXJzdCBjYWxsIHRvIHtAbGluayBtYXJrRGlydHl9IGlzIGludm9rZWQuXG4gICAqL1xuICBjbGVhbjogUHJvbWlzZTxudWxsPjtcblxuICAvKipcbiAgICogUm9vdENvbXBvbmVudHMgLSBUaGUgY29tcG9uZW50cyB0aGF0IHdlcmUgaW5zdGFudGlhdGVkIGJ5IHRoZSBjYWxsIHRvXG4gICAqIHtAbGluayByZW5kZXJDb21wb25lbnR9LlxuICAgKi9cbiAgY29tcG9uZW50czoge31bXTtcblxuICAvKipcbiAgICogVGhlIHBsYXllciBmbHVzaGluZyBoYW5kbGVyIHRvIGtpY2sgb2ZmIGFsbCBhbmltYXRpb25zXG4gICAqL1xuICBwbGF5ZXJIYW5kbGVyOiBQbGF5ZXJIYW5kbGVyfG51bGw7XG5cbiAgLyoqXG4gICAqIFdoYXQgcmVuZGVyLXJlbGF0ZWQgb3BlcmF0aW9ucyB0byBydW4gb25jZSBhIHNjaGVkdWxlciBoYXMgYmVlbiBzZXRcbiAgICovXG4gIGZsYWdzOiBSb290Q29udGV4dEZsYWdzO1xufVxuXG4vKipcbiAqIEFycmF5IG9mIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciBhIHZpZXcgYW5kIHRoZWlyIGRpcmVjdGl2ZSBpbmRpY2VzLlxuICpcbiAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICovXG5leHBvcnQgdHlwZSBIb29rRGF0YSA9IChudW1iZXIgfCAoKCkgPT4gdm9pZCkpW107XG5cbi8qKlxuICogU3RhdGljIGRhdGEgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgaW5zdGFuY2Utc3BlY2lmaWMgZGF0YSBhcnJheSBvbiBhbiBMVmlldy5cbiAqXG4gKiBFYWNoIG5vZGUncyBzdGF0aWMgZGF0YSBpcyBzdG9yZWQgaW4gdERhdGEgYXQgdGhlIHNhbWUgaW5kZXggdGhhdCBpdCdzIHN0b3JlZFxuICogaW4gdGhlIGRhdGEgYXJyYXkuICBBbnkgbm9kZXMgdGhhdCBkbyBub3QgaGF2ZSBzdGF0aWMgZGF0YSBzdG9yZSBhIG51bGwgdmFsdWUgaW5cbiAqIHREYXRhIHRvIGF2b2lkIGEgc3BhcnNlIGFycmF5LlxuICpcbiAqIEVhY2ggcGlwZSdzIGRlZmluaXRpb24gaXMgc3RvcmVkIGhlcmUgYXQgdGhlIHNhbWUgaW5kZXggYXMgaXRzIHBpcGUgaW5zdGFuY2UgaW5cbiAqIHRoZSBkYXRhIGFycmF5LlxuICpcbiAqIEluamVjdG9yIGJsb29tIGZpbHRlcnMgYXJlIGFsc28gc3RvcmVkIGhlcmUuXG4gKi9cbmV4cG9ydCB0eXBlIFREYXRhID0gKFROb2RlIHwgUGlwZURlZjxhbnk+fCBEaXJlY3RpdmVEZWY8YW55PnwgQ29tcG9uZW50RGVmPGFueT58IG51bWJlciB8IG51bGwpW107XG5cbi8qKiBUeXBlIGZvciBUVmlldy5jdXJyZW50TWF0Y2hlcyAqL1xuZXhwb3J0IHR5cGUgQ3VycmVudE1hdGNoZXNMaXN0ID0gW0RpcmVjdGl2ZURlZjxhbnk+LCAoc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCldO1xuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19