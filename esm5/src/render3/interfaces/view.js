/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Size of LViewData's header. Necessary to adjust for it when setting slots.  */
export var HEADER_OFFSET = 14;
// Below are constants for LViewData indices to help us look up LViewData members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
export var TVIEW = 0;
export var PARENT = 1;
export var NEXT = 2;
export var QUERIES = 3;
export var FLAGS = 4;
export var HOST_NODE = 5;
export var BINDING_INDEX = 6;
export var DIRECTIVES = 7;
export var CLEANUP = 8;
export var CONTEXT = 9;
export var INJECTOR = 10;
export var RENDERER = 11;
export var SANITIZER = 12;
export var TAIL = 13;
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export var unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQVdILGtGQUFrRjtBQUNsRixNQUFNLENBQUMsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRWhDLGlGQUFpRjtBQUNqRixtREFBbUQ7QUFDbkQsd0VBQXdFO0FBQ3hFLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdkIsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN4QixNQUFNLENBQUMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztBQUN2QixNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDL0IsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztBQUM1QixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUMzQixNQUFNLENBQUMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDNUIsTUFBTSxDQUFDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQWdhdkIsaUZBQWlGO0FBQ2pGLDBCQUEwQjtBQUMxQixNQUFNLENBQUMsSUFBTSw2QkFBNkIsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uLy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7U2FuaXRpemVyfSBmcm9tICcuLi8uLi9zYW5pdGl6YXRpb24vc2VjdXJpdHknO1xuXG5pbXBvcnQge0xDb250YWluZXJ9IGZyb20gJy4vY29udGFpbmVyJztcbmltcG9ydCB7Q29tcG9uZW50UXVlcnksIENvbXBvbmVudFRlbXBsYXRlLCBEaXJlY3RpdmVEZWZJbnRlcm5hbCwgRGlyZWN0aXZlRGVmTGlzdCwgUGlwZURlZiwgUGlwZURlZkxpc3R9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0xFbGVtZW50Tm9kZSwgTFZpZXdOb2RlLCBUTm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7TFF1ZXJpZXN9IGZyb20gJy4vcXVlcnknO1xuaW1wb3J0IHtSZW5kZXJlcjN9IGZyb20gJy4vcmVuZGVyZXInO1xuXG4vKiogU2l6ZSBvZiBMVmlld0RhdGEncyBoZWFkZXIuIE5lY2Vzc2FyeSB0byBhZGp1c3QgZm9yIGl0IHdoZW4gc2V0dGluZyBzbG90cy4gICovXG5leHBvcnQgY29uc3QgSEVBREVSX09GRlNFVCA9IDE0O1xuXG4vLyBCZWxvdyBhcmUgY29uc3RhbnRzIGZvciBMVmlld0RhdGEgaW5kaWNlcyB0byBoZWxwIHVzIGxvb2sgdXAgTFZpZXdEYXRhIG1lbWJlcnNcbi8vIHdpdGhvdXQgaGF2aW5nIHRvIHJlbWVtYmVyIHRoZSBzcGVjaWZpYyBpbmRpY2VzLlxuLy8gVWdsaWZ5IHdpbGwgaW5saW5lIHRoZXNlIHdoZW4gbWluaWZ5aW5nIHNvIHRoZXJlIHNob3VsZG4ndCBiZSBhIGNvc3QuXG5leHBvcnQgY29uc3QgVFZJRVcgPSAwO1xuZXhwb3J0IGNvbnN0IFBBUkVOVCA9IDE7XG5leHBvcnQgY29uc3QgTkVYVCA9IDI7XG5leHBvcnQgY29uc3QgUVVFUklFUyA9IDM7XG5leHBvcnQgY29uc3QgRkxBR1MgPSA0O1xuZXhwb3J0IGNvbnN0IEhPU1RfTk9ERSA9IDU7XG5leHBvcnQgY29uc3QgQklORElOR19JTkRFWCA9IDY7XG5leHBvcnQgY29uc3QgRElSRUNUSVZFUyA9IDc7XG5leHBvcnQgY29uc3QgQ0xFQU5VUCA9IDg7XG5leHBvcnQgY29uc3QgQ09OVEVYVCA9IDk7XG5leHBvcnQgY29uc3QgSU5KRUNUT1IgPSAxMDtcbmV4cG9ydCBjb25zdCBSRU5ERVJFUiA9IDExO1xuZXhwb3J0IGNvbnN0IFNBTklUSVpFUiA9IDEyO1xuZXhwb3J0IGNvbnN0IFRBSUwgPSAxMztcblxuLyoqXG4gKiBgTFZpZXdEYXRhYCBzdG9yZXMgYWxsIG9mIHRoZSBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gcHJvY2VzcyB0aGUgaW5zdHJ1Y3Rpb25zIGFzXG4gKiB0aGV5IGFyZSBpbnZva2VkIGZyb20gdGhlIHRlbXBsYXRlLiBFYWNoIGVtYmVkZGVkIHZpZXcgYW5kIGNvbXBvbmVudCB2aWV3IGhhcyBpdHNcbiAqIG93biBgTFZpZXdEYXRhYC4gV2hlbiBwcm9jZXNzaW5nIGEgcGFydGljdWxhciB2aWV3LCB3ZSBzZXQgdGhlIGB2aWV3RGF0YWAgdG8gdGhhdFxuICogYExWaWV3RGF0YWAuIFdoZW4gdGhhdCB2aWV3IGlzIGRvbmUgcHJvY2Vzc2luZywgdGhlIGB2aWV3RGF0YWAgaXMgc2V0IGJhY2sgdG9cbiAqIHdoYXRldmVyIHRoZSBvcmlnaW5hbCBgdmlld0RhdGFgIHdhcyBiZWZvcmUgKHRoZSBwYXJlbnQgYExWaWV3RGF0YWApLlxuICpcbiAqIEtlZXBpbmcgc2VwYXJhdGUgc3RhdGUgZm9yIGVhY2ggdmlldyBmYWNpbGl0aWVzIHZpZXcgaW5zZXJ0aW9uIC8gZGVsZXRpb24sIHNvIHdlXG4gKiBkb24ndCBoYXZlIHRvIGVkaXQgdGhlIGRhdGEgYXJyYXkgYmFzZWQgb24gd2hpY2ggdmlld3MgYXJlIHByZXNlbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFZpZXdEYXRhIGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIC8qKlxuICAgKiBUaGUgc3RhdGljIGRhdGEgZm9yIHRoaXMgdmlldy4gV2UgbmVlZCBhIHJlZmVyZW5jZSB0byB0aGlzIHNvIHdlIGNhbiBlYXNpbHkgd2FsayB1cCB0aGVcbiAgICogbm9kZSB0cmVlIGluIERJIGFuZCBnZXQgdGhlIFRWaWV3LmRhdGEgYXJyYXkgYXNzb2NpYXRlZCB3aXRoIGEgbm9kZSAod2hlcmUgdGhlXG4gICAqIGRpcmVjdGl2ZSBkZWZzIGFyZSBzdG9yZWQpLlxuICAgKi9cbiAgW1RWSUVXXTogVFZpZXc7XG5cbiAgLyoqXG4gICAqIFRoZSBwYXJlbnQgdmlldyBpcyBuZWVkZWQgd2hlbiB3ZSBleGl0IHRoZSB2aWV3IGFuZCBtdXN0IHJlc3RvcmUgdGhlIHByZXZpb3VzXG4gICAqIGBMVmlld0RhdGFgLiBXaXRob3V0IHRoaXMsIHRoZSByZW5kZXIgbWV0aG9kIHdvdWxkIGhhdmUgdG8ga2VlcCBhIHN0YWNrIG9mXG4gICAqIHZpZXdzIGFzIGl0IGlzIHJlY3Vyc2l2ZWx5IHJlbmRlcmluZyB0ZW1wbGF0ZXMuXG4gICAqL1xuICBbUEFSRU5UXTogTFZpZXdEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqXG4gICAqIFRoZSBuZXh0IHNpYmxpbmcgTFZpZXdEYXRhIG9yIExDb250YWluZXIuXG4gICAqXG4gICAqIEFsbG93cyB1cyB0byBwcm9wYWdhdGUgYmV0d2VlbiBzaWJsaW5nIHZpZXcgc3RhdGVzIHRoYXQgYXJlbid0IGluIHRoZSBzYW1lXG4gICAqIGNvbnRhaW5lci4gRW1iZWRkZWQgdmlld3MgYWxyZWFkeSBoYXZlIGEgbm9kZS5uZXh0LCBidXQgaXQgaXMgb25seSBzZXQgZm9yXG4gICAqIHZpZXdzIGluIHRoZSBzYW1lIGNvbnRhaW5lci4gV2UgbmVlZCBhIHdheSB0byBsaW5rIGNvbXBvbmVudCB2aWV3cyBhbmQgdmlld3NcbiAgICogYWNyb3NzIGNvbnRhaW5lcnMgYXMgd2VsbC5cbiAgICovXG4gIFtORVhUXTogTFZpZXdEYXRhfExDb250YWluZXJ8bnVsbDtcblxuICAvKiogUXVlcmllcyBhY3RpdmUgZm9yIHRoaXMgdmlldyAtIG5vZGVzIGZyb20gYSB2aWV3IGFyZSByZXBvcnRlZCB0byB0aG9zZSBxdWVyaWVzLiAqL1xuICBbUVVFUklFU106IExRdWVyaWVzfG51bGw7XG5cbiAgLyoqIEZsYWdzIGZvciB0aGlzIHZpZXcuIFNlZSBMVmlld0ZsYWdzIGZvciBtb3JlIGluZm8uICovXG4gIFtGTEFHU106IExWaWV3RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgdG8gdGhlIGBMVmlld05vZGVgIG9yIGBMRWxlbWVudE5vZGVgIHdoaWNoIHJlcHJlc2VudHMgdGhlIHJvb3Qgb2YgdGhlIHZpZXcuXG4gICAqXG4gICAqIElmIGBMVmlld05vZGVgLCB0aGlzIGlzIGFuIGVtYmVkZGVkIHZpZXcgb2YgYSBjb250YWluZXIuIFdlIG5lZWQgdGhpcyB0byBiZSBhYmxlIHRvXG4gICAqIGVmZmljaWVudGx5IGZpbmQgdGhlIGBMVmlld05vZGVgIHdoZW4gaW5zZXJ0aW5nIHRoZSB2aWV3IGludG8gYW4gYW5jaG9yLlxuICAgKlxuICAgKiBJZiBgTEVsZW1lbnROb2RlYCwgdGhpcyBpcyB0aGUgTFZpZXcgb2YgYSBjb21wb25lbnQuXG4gICAqL1xuICAvLyBUT0RPKGthcmEpOiBSZXBsYWNlIHdpdGggaW5kZXhcbiAgW0hPU1RfTk9ERV06IExWaWV3Tm9kZXxMRWxlbWVudE5vZGU7XG5cbiAgLyoqXG4gICAqIFRoZSBiaW5kaW5nIGluZGV4IHdlIHNob3VsZCBhY2Nlc3MgbmV4dC5cbiAgICpcbiAgICogVGhpcyBpcyBzdG9yZWQgc28gdGhhdCBiaW5kaW5ncyBjYW4gY29udGludWUgd2hlcmUgdGhleSBsZWZ0IG9mZlxuICAgKiBpZiBhIHZpZXcgaXMgbGVmdCBtaWR3YXkgdGhyb3VnaCBwcm9jZXNzaW5nIGJpbmRpbmdzIChlLmcuIGlmIHRoZXJlIGlzXG4gICAqIGEgc2V0dGVyIHRoYXQgY3JlYXRlcyBhbiBlbWJlZGRlZCB2aWV3LCBsaWtlIGluIG5nSWYpLlxuICAgKi9cbiAgW0JJTkRJTkdfSU5ERVhdOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGRpcmVjdGl2ZSBpbnN0YW5jZXMgaW4gdGhlIGN1cnJlbnQgdmlldy5cbiAgICpcbiAgICogVGhlc2UgbXVzdCBiZSBzdG9yZWQgc2VwYXJhdGVseSBmcm9tIExOb2RlcyBiZWNhdXNlIHRoZWlyIHByZXNlbmNlIGlzXG4gICAqIHVua25vd24gYXQgY29tcGlsZS10aW1lIGFuZCB0aHVzIHNwYWNlIGNhbm5vdCBiZSByZXNlcnZlZCBpbiBkYXRhW10uXG4gICAqL1xuICAvLyBUT0RPOiBmbGF0dGVuIGludG8gTFZpZXdEYXRhW11cbiAgW0RJUkVDVElWRVNdOiBhbnlbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyBpcyBkZXN0cm95ZWQsIGxpc3RlbmVycyBuZWVkIHRvIGJlIHJlbGVhc2VkIGFuZCBvdXRwdXRzIG5lZWQgdG8gYmVcbiAgICogdW5zdWJzY3JpYmVkLiBUaGlzIGNvbnRleHQgYXJyYXkgc3RvcmVzIGJvdGggbGlzdGVuZXIgZnVuY3Rpb25zIHdyYXBwZWQgd2l0aFxuICAgKiB0aGVpciBjb250ZXh0IGFuZCBvdXRwdXQgc3Vic2NyaXB0aW9uIGluc3RhbmNlcyBmb3IgYSBwYXJ0aWN1bGFyIHZpZXcuXG4gICAqXG4gICAqIFRoZXNlIGNoYW5nZSBwZXIgTFZpZXcgaW5zdGFuY2UsIHNvIHRoZXkgY2Fubm90IGJlIHN0b3JlZCBvbiBUVmlldy4gSW5zdGVhZCxcbiAgICogVFZpZXcuY2xlYW51cCBzYXZlcyBhbiBpbmRleCB0byB0aGUgbmVjZXNzYXJ5IGNvbnRleHQgaW4gdGhpcyBhcnJheS5cbiAgICovXG4gIC8vIFRPRE86IGZsYXR0ZW4gaW50byBMVmlld0RhdGFbXVxuICBbQ0xFQU5VUF06IGFueVtdfG51bGw7XG5cbiAgLyoqXG4gICAqIC0gRm9yIGVtYmVkZGVkIHZpZXdzLCB0aGUgY29udGV4dCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUuXG4gICAqIC0gRm9yIHJvb3QgdmlldyBvZiB0aGUgcm9vdCBjb21wb25lbnQgdGhlIGNvbnRleHQgY29udGFpbnMgY2hhbmdlIGRldGVjdGlvbiBkYXRhLlxuICAgKiAtIGBudWxsYCBvdGhlcndpc2UuXG4gICovXG4gIFtDT05URVhUXToge318Um9vdENvbnRleHR8bnVsbDtcblxuICAvKiogQW4gb3B0aW9uYWwgTW9kdWxlIEluamVjdG9yIHRvIGJlIHVzZWQgYXMgZmFsbCBiYWNrIGFmdGVyIEVsZW1lbnQgSW5qZWN0b3JzIGFyZSBjb25zdWx0ZWQuICovXG4gIFtJTkpFQ1RPUl06IEluamVjdG9yfG51bGw7XG5cbiAgLyoqIFJlbmRlcmVyIHRvIGJlIHVzZWQgZm9yIHRoaXMgdmlldy4gKi9cbiAgW1JFTkRFUkVSXTogUmVuZGVyZXIzO1xuXG4gIC8qKiBBbiBvcHRpb25hbCBjdXN0b20gc2FuaXRpemVyLiAqL1xuICBbU0FOSVRJWkVSXTogU2FuaXRpemVyfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IExWaWV3RGF0YSBvciBMQ29udGFpbmVyIGJlbmVhdGggdGhpcyBMVmlld0RhdGEgaW4gdGhlIGhpZXJhcmNoeS5cbiAgICpcbiAgICogVGhlIHRhaWwgYWxsb3dzIHVzIHRvIHF1aWNrbHkgYWRkIGEgbmV3IHN0YXRlIHRvIHRoZSBlbmQgb2YgdGhlIHZpZXcgbGlzdFxuICAgKiB3aXRob3V0IGhhdmluZyB0byBwcm9wYWdhdGUgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3QgY2hpbGQuXG4gICAqL1xuICAvLyBUT0RPOiByZXBsYWNlIHdpdGggZ2xvYmFsXG4gIFtUQUlMXTogTFZpZXdEYXRhfExDb250YWluZXJ8bnVsbDtcbn1cblxuLyoqIEZsYWdzIGFzc29jaWF0ZWQgd2l0aCBhbiBMVmlldyAoc2F2ZWQgaW4gTFZpZXdEYXRhW0ZMQUdTXSkgKi9cbmV4cG9ydCBjb25zdCBlbnVtIExWaWV3RmxhZ3Mge1xuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHZpZXcgaXMgaW4gY3JlYXRpb25Nb2RlLlxuICAgKlxuICAgKiBUaGlzIG11c3QgYmUgc3RvcmVkIGluIHRoZSB2aWV3IHJhdGhlciB0aGFuIHVzaW5nIGBkYXRhYCBhcyBhIG1hcmtlciBzbyB0aGF0XG4gICAqIHdlIGNhbiBwcm9wZXJseSBzdXBwb3J0IGVtYmVkZGVkIHZpZXdzLiBPdGhlcndpc2UsIHdoZW4gZXhpdGluZyBhIGNoaWxkIHZpZXdcbiAgICogYmFjayBpbnRvIHRoZSBwYXJlbnQgdmlldywgYGRhdGFgIHdpbGwgYmUgZGVmaW5lZCBhbmQgYGNyZWF0aW9uTW9kZWAgd2lsbCBiZVxuICAgKiBpbXByb3Blcmx5IHJlcG9ydGVkIGFzIGZhbHNlLlxuICAgKi9cbiAgQ3JlYXRpb25Nb2RlID0gMGIwMDAwMDEsXG5cbiAgLyoqIFdoZXRoZXIgdGhpcyB2aWV3IGhhcyBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kgKGNoZWNrcyBhbHdheXMpIG9yIG9uUHVzaCAqL1xuICBDaGVja0Fsd2F5cyA9IDBiMDAwMDEwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgY3VycmVudGx5IGRpcnR5IChuZWVkaW5nIGNoZWNrKSAqL1xuICBEaXJ0eSA9IDBiMDAwMTAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgY3VycmVudGx5IGF0dGFjaGVkIHRvIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS4gKi9cbiAgQXR0YWNoZWQgPSAwYjAwMTAwMCxcblxuICAvKipcbiAgICogIFdoZXRoZXIgb3Igbm90IHRoZSBpbml0IGhvb2tzIGhhdmUgcnVuLlxuICAgKlxuICAgKiBJZiBvbiwgdGhlIGluaXQgaG9va3MgaGF2ZW4ndCB5ZXQgYmVlbiBydW4gYW5kIHNob3VsZCBiZSBleGVjdXRlZCBieSB0aGUgZmlyc3QgY29tcG9uZW50IHRoYXRcbiAgICogcnVucyBPUiB0aGUgZmlyc3QgY1IoKSBpbnN0cnVjdGlvbiB0aGF0IHJ1bnMgKHNvIGluaXRzIGFyZSBydW4gZm9yIHRoZSB0b3AgbGV2ZWwgdmlldyBiZWZvcmVcbiAgICogYW55IGVtYmVkZGVkIHZpZXdzKS5cbiAgICovXG4gIFJ1bkluaXQgPSAwYjAxMDAwMCxcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB2aWV3IGlzIGRlc3Ryb3llZC4gKi9cbiAgRGVzdHJveWVkID0gMGIxMDAwMDAsXG59XG5cbi8qKlxuICogVGhlIHN0YXRpYyBkYXRhIGZvciBhbiBMVmlldyAoc2hhcmVkIGJldHdlZW4gYWxsIHRlbXBsYXRlcyBvZiBhXG4gKiBnaXZlbiB0eXBlKS5cbiAqXG4gKiBTdG9yZWQgb24gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uIGFzIG5nUHJpdmF0ZURhdGEuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVFZpZXcge1xuICAvKipcbiAgICogSUQgZm9yIGlubGluZSB2aWV3cyB0byBkZXRlcm1pbmUgd2hldGhlciBhIHZpZXcgaXMgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzIHZpZXdcbiAgICogaW4gYSBjZXJ0YWluIHBvc2l0aW9uLiBJZiBpdCdzIG5vdCwgd2Uga25vdyB0aGUgbmV3IHZpZXcgbmVlZHMgdG8gYmUgaW5zZXJ0ZWRcbiAgICogYW5kIHRoZSBvbmUgdGhhdCBleGlzdHMgbmVlZHMgdG8gYmUgcmVtb3ZlZCAoZS5nLiBpZi9lbHNlIHN0YXRlbWVudHMpXG4gICAqXG4gICAqIElmIHRoaXMgaXMgLTEsIHRoZW4gdGhpcyBpcyBhIGNvbXBvbmVudCB2aWV3IG9yIGEgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3LlxuICAgKi9cbiAgcmVhZG9ubHkgaWQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIGZ1bmN0aW9uIHVzZWQgdG8gcmVmcmVzaCB0aGUgdmlldyBvZiBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzXG4gICAqIGFuZCBjb21wb25lbnRzLiBXaWxsIGJlIG51bGwgZm9yIGlubGluZSB2aWV3cy5cbiAgICovXG4gIHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTx7fT58bnVsbDtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiBjb250YWluaW5nIHF1ZXJ5LXJlbGF0ZWQgaW5zdHJ1Y3Rpb25zLlxuICAgKi9cbiAgdmlld1F1ZXJ5OiBDb21wb25lbnRRdWVyeTx7fT58bnVsbDtcblxuICAvKipcbiAgICogUG9pbnRlciB0byB0aGUgYFROb2RlYCB0aGF0IHJlcHJlc2VudHMgdGhlIHJvb3Qgb2YgdGhlIHZpZXcuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBgVE5vZGVgIGZvciBhbiBgTFZpZXdOb2RlYCwgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3IG9mIGEgY29udGFpbmVyLlxuICAgKiBXZSBuZWVkIHRoaXMgcG9pbnRlciB0byBiZSBhYmxlIHRvIGVmZmljaWVudGx5IGZpbmQgdGhpcyBub2RlIHdoZW4gaW5zZXJ0aW5nIHRoZSB2aWV3XG4gICAqIGludG8gYW4gYW5jaG9yLlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIGEgYFROb2RlYCBmb3IgYW4gYExFbGVtZW50Tm9kZWAsIHRoaXMgaXMgdGhlIFRWaWV3IG9mIGEgY29tcG9uZW50LlxuICAgKi9cbiAgbm9kZTogVE5vZGU7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdGVtcGxhdGUgaGFzIGJlZW4gcHJvY2Vzc2VkLiAqL1xuICBmaXJzdFRlbXBsYXRlUGFzczogYm9vbGVhbjtcblxuICAvKiogU3RhdGljIGRhdGEgZXF1aXZhbGVudCBvZiBMVmlldy5kYXRhW10uIENvbnRhaW5zIFROb2Rlcy4gKi9cbiAgZGF0YTogVERhdGE7XG5cbiAgLyoqXG4gICAqIFRoZSBiaW5kaW5nIHN0YXJ0IGluZGV4IGlzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgZGF0YSBhcnJheVxuICAgKiBzdGFydHMgdG8gc3RvcmUgYmluZGluZ3Mgb25seS4gU2F2aW5nIHRoaXMgdmFsdWUgZW5zdXJlcyB0aGF0IHdlXG4gICAqIHdpbGwgYmVnaW4gcmVhZGluZyBiaW5kaW5ncyBhdCB0aGUgY29ycmVjdCBwb2ludCBpbiB0aGUgYXJyYXkgd2hlblxuICAgKiB3ZSBhcmUgaW4gdXBkYXRlIG1vZGUuXG4gICAqL1xuICBiaW5kaW5nU3RhcnRJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgaG9zdCBub2RlIG9mIHRoZSBmaXJzdCBMVmlldyBvciBMQ29udGFpbmVyIGJlbmVhdGggdGhpcyBMVmlldyBpblxuICAgKiB0aGUgaGllcmFyY2h5LlxuICAgKlxuICAgKiBOZWNlc3NhcnkgdG8gc3RvcmUgdGhpcyBzbyB2aWV3cyBjYW4gdHJhdmVyc2UgdGhyb3VnaCB0aGVpciBuZXN0ZWQgdmlld3NcbiAgICogdG8gcmVtb3ZlIGxpc3RlbmVycyBhbmQgY2FsbCBvbkRlc3Ryb3kgY2FsbGJhY2tzLlxuICAgKlxuICAgKiBGb3IgZW1iZWRkZWQgdmlld3MsIHdlIHN0b3JlIHRoZSBpbmRleCBvZiBhbiBMQ29udGFpbmVyJ3MgaG9zdCByYXRoZXIgdGhhbiB0aGUgZmlyc3RcbiAgICogTFZpZXcgdG8gYXZvaWQgbWFuYWdpbmcgc3BsaWNpbmcgd2hlbiB2aWV3cyBhcmUgYWRkZWQvcmVtb3ZlZC5cbiAgICovXG4gIGNoaWxkSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogU2VsZWN0b3IgbWF0Y2hlcyBmb3IgYSBub2RlIGFyZSB0ZW1wb3JhcmlseSBjYWNoZWQgb24gdGhlIFRWaWV3IHNvIHRoZVxuICAgKiBESSBzeXN0ZW0gY2FuIGVhZ2VybHkgaW5zdGFudGlhdGUgZGlyZWN0aXZlcyBvbiB0aGUgc2FtZSBub2RlIGlmIHRoZXkgYXJlXG4gICAqIGNyZWF0ZWQgb3V0IG9mIG9yZGVyLiBUaGV5IGFyZSBvdmVyd3JpdHRlbiBhZnRlciBlYWNoIG5vZGUuXG4gICAqXG4gICAqIDxkaXYgZGlyQSBkaXJCPjwvZGl2PlxuICAgKlxuICAgKiBlLmcuIERpckEgaW5qZWN0cyBEaXJCLCBidXQgRGlyQSBpcyBjcmVhdGVkIGZpcnN0LiBESSBzaG91bGQgaW5zdGFudGlhdGVcbiAgICogRGlyQiB3aGVuIGl0IGZpbmRzIHRoYXQgaXQncyBvbiB0aGUgc2FtZSBub2RlLCBidXQgbm90IHlldCBjcmVhdGVkLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBkZWZzXG4gICAqIE9kZCBpbmRpY2VzOlxuICAgKiAgIC0gTnVsbCBpZiB0aGUgYXNzb2NpYXRlZCBkaXJlY3RpdmUgaGFzbid0IGJlZW4gaW5zdGFudGlhdGVkIHlldFxuICAgKiAgIC0gRGlyZWN0aXZlIGluZGV4LCBpZiBhc3NvY2lhdGVkIGRpcmVjdGl2ZSBoYXMgYmVlbiBjcmVhdGVkXG4gICAqICAgLSBTdHJpbmcsIHRlbXBvcmFyeSAnQ0lSQ1VMQVInIHRva2VuIHNldCB3aGlsZSBkZXBlbmRlbmNpZXMgYXJlIGJlaW5nIHJlc29sdmVkXG4gICAqL1xuICBjdXJyZW50TWF0Y2hlczogQ3VycmVudE1hdGNoZXNMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIERpcmVjdGl2ZSBhbmQgY29tcG9uZW50IGRlZnMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBtYXRjaGVkIHRvIG5vZGVzIG9uXG4gICAqIHRoaXMgdmlldy5cbiAgICpcbiAgICogRGVmcyBhcmUgc3RvcmVkIGF0IHRoZSBzYW1lIGluZGV4IGluIFRWaWV3LmRpcmVjdGl2ZXNbXSBhcyB0aGVpciBpbnN0YW5jZXNcbiAgICogYXJlIHN0b3JlZCBpbiBMVmlldy5kaXJlY3RpdmVzW10uIFRoaXMgc2ltcGxpZmllcyBsb29rdXAgaW4gREkuXG4gICAqL1xuICBkaXJlY3RpdmVzOiBEaXJlY3RpdmVEZWZMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIEZ1bGwgcmVnaXN0cnkgb2YgZGlyZWN0aXZlcyBhbmQgY29tcG9uZW50cyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIHZpZXcuXG4gICAqXG4gICAqIEl0J3MgbmVjZXNzYXJ5IHRvIGtlZXAgYSBjb3B5IG9mIHRoZSBmdWxsIGRlZiBsaXN0IG9uIHRoZSBUVmlldyBzbyBpdCdzIHBvc3NpYmxlXG4gICAqIHRvIHJlbmRlciB0ZW1wbGF0ZSBmdW5jdGlvbnMgd2l0aG91dCBhIGhvc3QgY29tcG9uZW50LlxuICAgKi9cbiAgZGlyZWN0aXZlUmVnaXN0cnk6IERpcmVjdGl2ZURlZkxpc3R8bnVsbDtcblxuICAvKipcbiAgICogRnVsbCByZWdpc3RyeSBvZiBwaXBlcyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIHZpZXcuXG4gICAqXG4gICAqIFRoZSBwcm9wZXJ0eSBpcyBlaXRoZXIgYW4gYXJyYXkgb2YgYFBpcGVEZWZzYHMgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSBhcnJheSBvZlxuICAgKiBgUGlwZURlZnNgcy4gVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gICAqXG4gICAqIEl0J3MgbmVjZXNzYXJ5IHRvIGtlZXAgYSBjb3B5IG9mIHRoZSBmdWxsIGRlZiBsaXN0IG9uIHRoZSBUVmlldyBzbyBpdCdzIHBvc3NpYmxlXG4gICAqIHRvIHJlbmRlciB0ZW1wbGF0ZSBmdW5jdGlvbnMgd2l0aG91dCBhIGhvc3QgY29tcG9uZW50LlxuICAgKi9cbiAgcGlwZVJlZ2lzdHJ5OiBQaXBlRGVmTGlzdHxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ09uSW5pdCBhbmQgbmdEb0NoZWNrIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW5cbiAgICogY3JlYXRpb24gbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGluaXRIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdEb0NoZWNrIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW4gdXBkYXRlIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBjaGVja0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyQ29udGVudEluaXQgYW5kIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZFxuICAgKiBmb3IgdGhpcyB2aWV3IGluIGNyZWF0aW9uIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBjb250ZW50SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluIHVwZGF0ZVxuICAgKiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgY29udGVudENoZWNrSG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJWaWV3SW5pdCBhbmQgbmdBZnRlclZpZXdDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvclxuICAgKiB0aGlzIHZpZXcgaW4gY3JlYXRpb24gbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIHZpZXdIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlclZpZXdDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW5cbiAgICogdXBkYXRlIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICB2aWV3Q2hlY2tIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdPbkRlc3Ryb3kgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgd2hlbiB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgZGVzdHJveUhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBwaXBlIG5nT25EZXN0cm95IGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIHdoZW4gdGhpcyB2aWV3IGlzIGRlc3Ryb3llZC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBJbmRleCBvZiBwaXBlIGluIGRhdGFcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICpcbiAgICogVGhlc2UgbXVzdCBiZSBzdG9yZWQgc2VwYXJhdGVseSBmcm9tIGRpcmVjdGl2ZSBkZXN0cm95IGhvb2tzIGJlY2F1c2UgdGhlaXIgY29udGV4dHNcbiAgICogYXJlIHN0b3JlZCBpbiBkYXRhLlxuICAgKi9cbiAgcGlwZURlc3Ryb3lIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogV2hlbiBhIHZpZXcgaXMgZGVzdHJveWVkLCBsaXN0ZW5lcnMgbmVlZCB0byBiZSByZWxlYXNlZCBhbmQgb3V0cHV0cyBuZWVkIHRvIGJlXG4gICAqIHVuc3Vic2NyaWJlZC4gVGhpcyBjbGVhbnVwIGFycmF5IHN0b3JlcyBib3RoIGxpc3RlbmVyIGRhdGEgKGluIGNodW5rcyBvZiA0KVxuICAgKiBhbmQgb3V0cHV0IGRhdGEgKGluIGNodW5rcyBvZiAyKSBmb3IgYSBwYXJ0aWN1bGFyIHZpZXcuIENvbWJpbmluZyB0aGUgYXJyYXlzXG4gICAqIHNhdmVzIG9uIG1lbW9yeSAoNzAgYnl0ZXMgcGVyIGFycmF5KSBhbmQgb24gYSBmZXcgYnl0ZXMgb2YgY29kZSBzaXplIChmb3IgdHdvXG4gICAqIHNlcGFyYXRlIGZvciBsb29wcykuXG4gICAqXG4gICAqIElmIGl0J3MgYSBuYXRpdmUgRE9NIGxpc3RlbmVyIGJlaW5nIHN0b3JlZDpcbiAgICogMXN0IGluZGV4IGlzOiBldmVudCBuYW1lIHRvIHJlbW92ZVxuICAgKiAybmQgaW5kZXggaXM6IGluZGV4IG9mIG5hdGl2ZSBlbGVtZW50IGluIExWaWV3LmRhdGFbXVxuICAgKiAzcmQgaW5kZXggaXM6IGluZGV4IG9mIHdyYXBwZWQgbGlzdGVuZXIgZnVuY3Rpb24gaW4gTFZpZXcuY2xlYW51cEluc3RhbmNlc1tdXG4gICAqIDR0aCBpbmRleCBpczogdXNlQ2FwdHVyZSBib29sZWFuXG4gICAqXG4gICAqIElmIGl0J3MgYSByZW5kZXJlcjIgc3R5bGUgbGlzdGVuZXIgb3IgVmlld1JlZiBkZXN0cm95IGhvb2sgYmVpbmcgc3RvcmVkOlxuICAgKiAxc3QgaW5kZXggaXM6IGluZGV4IG9mIHRoZSBjbGVhbnVwIGZ1bmN0aW9uIGluIExWaWV3LmNsZWFudXBJbnN0YW5jZXNbXVxuICAgKiAybmQgaW5kZXggaXM6IG51bGxcbiAgICpcbiAgICogSWYgaXQncyBhbiBvdXRwdXQgc3Vic2NyaXB0aW9uIG9yIHF1ZXJ5IGxpc3QgZGVzdHJveSBob29rOlxuICAgKiAxc3QgaW5kZXggaXM6IG91dHB1dCB1bnN1YnNjcmliZSBmdW5jdGlvbiAvIHF1ZXJ5IGxpc3QgZGVzdHJveSBmdW5jdGlvblxuICAgKiAybmQgaW5kZXggaXM6IGluZGV4IG9mIGZ1bmN0aW9uIGNvbnRleHQgaW4gTFZpZXcuY2xlYW51cEluc3RhbmNlc1tdXG4gICAqL1xuICBjbGVhbnVwOiBhbnlbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgZGlyZWN0aXZlIGFuZCBlbGVtZW50IGluZGljZXMgZm9yIGNoaWxkIGNvbXBvbmVudHMgdGhhdCB3aWxsIG5lZWQgdG8gYmVcbiAgICogcmVmcmVzaGVkIHdoZW4gdGhlIGN1cnJlbnQgdmlldyBoYXMgZmluaXNoZWQgaXRzIGNoZWNrLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRpY2VzXG4gICAqIE9kZCBpbmRpY2VzOiBFbGVtZW50IGluZGljZXMgKGFkanVzdGVkIGZvciBMVmlld0RhdGEgaGVhZGVyIG9mZnNldClcbiAgICovXG4gIGNvbXBvbmVudHM6IG51bWJlcltdfG51bGw7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBpbmRpY2VzIGZvciBjaGlsZCBkaXJlY3RpdmVzIHRoYXQgaGF2ZSBob3N0IGJpbmRpbmdzLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRpY2VzXG4gICAqIE9kZCBpbmRpY2VzOiBFbGVtZW50IGluZGljZXNcbiAgICpcbiAgICogRWxlbWVudCBpbmRpY2VzIGFyZSBOT1QgYWRqdXN0ZWQgZm9yIExWaWV3RGF0YSBoZWFkZXIgb2Zmc2V0IGJlY2F1c2VcbiAgICogdGhleSB3aWxsIGJlIGZlZCBpbnRvIGluc3RydWN0aW9ucyB0aGF0IGV4cGVjdCB0aGUgcmF3IGluZGV4IChlLmcuIGVsZW1lbnRQcm9wZXJ0eSlcbiAgICovXG4gIGhvc3RCaW5kaW5nczogbnVtYmVyW118bnVsbDtcbn1cblxuLyoqXG4gKiBSb290Q29udGV4dCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBpcyBzaGFyZWQgZm9yIGFsbCBjb21wb25lbnRzIHdoaWNoXG4gKiB3ZXJlIGJvb3RzdHJhcHBlZCB3aXRoIHtAbGluayByZW5kZXJDb21wb25lbnR9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RDb250ZXh0IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdXNlZCBmb3Igc2NoZWR1bGluZyBjaGFuZ2UgZGV0ZWN0aW9uIGluIHRoZSBmdXR1cmUuIFVzdWFsbHlcbiAgICogdGhpcyBpcyBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYC5cbiAgICovXG4gIHNjaGVkdWxlcjogKHdvcmtGbjogKCkgPT4gdm9pZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdoZW4gYWxsIGNvbXBvbmVudHMgYXJlIGNvbnNpZGVyZWQgY2xlYW4gKG5vdCBkaXJ0eSkuXG4gICAqXG4gICAqIFRoaXMgcHJvbWlzZSBpcyBvdmVyd3JpdHRlbiBldmVyeSB0aW1lIGEgZmlyc3QgY2FsbCB0byB7QGxpbmsgbWFya0RpcnR5fSBpcyBpbnZva2VkLlxuICAgKi9cbiAgY2xlYW46IFByb21pc2U8bnVsbD47XG5cbiAgLyoqXG4gICAqIFJvb3RDb21wb25lbnRzIC0gVGhlIGNvbXBvbmVudHMgdGhhdCB3ZXJlIGluc3RhbnRpYXRlZCBieSB0aGUgY2FsbCB0b1xuICAgKiB7QGxpbmsgcmVuZGVyQ29tcG9uZW50fS5cbiAgICovXG4gIGNvbXBvbmVudHM6IHt9W107XG59XG5cbi8qKlxuICogQXJyYXkgb2YgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIGEgdmlldyBhbmQgdGhlaXIgZGlyZWN0aXZlIGluZGljZXMuXG4gKlxuICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEhvb2tEYXRhID0gKG51bWJlciB8ICgoKSA9PiB2b2lkKSlbXTtcblxuLyoqXG4gKiBTdGF0aWMgZGF0YSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpbnN0YW5jZS1zcGVjaWZpYyBkYXRhIGFycmF5IG9uIGFuIExWaWV3LlxuICpcbiAqIEVhY2ggbm9kZSdzIHN0YXRpYyBkYXRhIGlzIHN0b3JlZCBpbiB0RGF0YSBhdCB0aGUgc2FtZSBpbmRleCB0aGF0IGl0J3Mgc3RvcmVkXG4gKiBpbiB0aGUgZGF0YSBhcnJheS4gRWFjaCBwaXBlJ3MgZGVmaW5pdGlvbiBpcyBzdG9yZWQgaGVyZSBhdCB0aGUgc2FtZSBpbmRleFxuICogYXMgaXRzIHBpcGUgaW5zdGFuY2UgaW4gdGhlIGRhdGEgYXJyYXkuIEFueSBub2RlcyB0aGF0IGRvIG5vdCBoYXZlIHN0YXRpY1xuICogZGF0YSBzdG9yZSBhIG51bGwgdmFsdWUgaW4gdERhdGEgdG8gYXZvaWQgYSBzcGFyc2UgYXJyYXkuXG4gKi9cbmV4cG9ydCB0eXBlIFREYXRhID0gKFROb2RlIHwgUGlwZURlZjxhbnk+fCBudWxsKVtdO1xuXG4vKiogVHlwZSBmb3IgVFZpZXcuY3VycmVudE1hdGNoZXMgKi9cbmV4cG9ydCB0eXBlIEN1cnJlbnRNYXRjaGVzTGlzdCA9IFtEaXJlY3RpdmVEZWZJbnRlcm5hbDxhbnk+LCAoc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCldO1xuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19