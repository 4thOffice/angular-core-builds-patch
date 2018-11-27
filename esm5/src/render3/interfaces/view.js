/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Below are constants for LViewData indices to help us look up LViewData members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
export var TVIEW = 0;
export var FLAGS = 1;
export var PARENT = 2;
export var NEXT = 3;
export var QUERIES = 4;
export var HOST = 5;
export var HOST_NODE = 6; // Rename to `T_HOST`?
export var BINDING_INDEX = 7;
export var CLEANUP = 8;
export var CONTEXT = 9;
export var INJECTOR = 10;
export var RENDERER_FACTORY = 11;
export var RENDERER = 12;
export var SANITIZER = 13;
export var TAIL = 14;
export var CONTAINER_INDEX = 15;
export var CONTENT_QUERIES = 16;
export var DECLARATION_VIEW = 17;
/** Size of LViewData's header. Necessary to adjust for it when setting slots.  */
export var HEADER_OFFSET = 18;
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export var unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQWlCSCxpRkFBaUY7QUFDakYsbURBQW1EO0FBQ25ELHdFQUF3RTtBQUN4RSxNQUFNLENBQUMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdkIsTUFBTSxDQUFDLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN4QixNQUFNLENBQUMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDekIsTUFBTSxDQUFDLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztBQUN0QixNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUUsc0JBQXNCO0FBQ25ELE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDL0IsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUN6QixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDM0IsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDM0IsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLENBQUMsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDbEMsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUNsQyxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDbkMsa0ZBQWtGO0FBQ2xGLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFrZmhDLGlGQUFpRjtBQUNqRiwwQkFBMEI7QUFDMUIsTUFBTSxDQUFDLElBQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi8uLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtRdWVyeUxpc3R9IGZyb20gJy4uLy4uL2xpbmtlcic7XG5pbXBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3NlY3VyaXR5JztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge0xDb250YWluZXJ9IGZyb20gJy4vY29udGFpbmVyJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBDb21wb25lbnRRdWVyeSwgQ29tcG9uZW50VGVtcGxhdGUsIERpcmVjdGl2ZURlZiwgRGlyZWN0aXZlRGVmTGlzdCwgSG9zdEJpbmRpbmdzRnVuY3Rpb24sIFBpcGVEZWYsIFBpcGVEZWZMaXN0fSBmcm9tICcuL2RlZmluaXRpb24nO1xuaW1wb3J0IHtJMThuVXBkYXRlT3BDb2RlcywgVEkxOG59IGZyb20gJy4vaTE4bic7XG5pbXBvcnQge1RFbGVtZW50Tm9kZSwgVE5vZGUsIFRWaWV3Tm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7UGxheWVySGFuZGxlcn0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHtMUXVlcmllc30gZnJvbSAnLi9xdWVyeSc7XG5pbXBvcnQge1JFbGVtZW50LCBSZW5kZXJlcjMsIFJlbmRlcmVyRmFjdG9yeTN9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtTdHlsaW5nQ29udGV4dH0gZnJvbSAnLi9zdHlsaW5nJztcblxuXG4vLyBCZWxvdyBhcmUgY29uc3RhbnRzIGZvciBMVmlld0RhdGEgaW5kaWNlcyB0byBoZWxwIHVzIGxvb2sgdXAgTFZpZXdEYXRhIG1lbWJlcnNcbi8vIHdpdGhvdXQgaGF2aW5nIHRvIHJlbWVtYmVyIHRoZSBzcGVjaWZpYyBpbmRpY2VzLlxuLy8gVWdsaWZ5IHdpbGwgaW5saW5lIHRoZXNlIHdoZW4gbWluaWZ5aW5nIHNvIHRoZXJlIHNob3VsZG4ndCBiZSBhIGNvc3QuXG5leHBvcnQgY29uc3QgVFZJRVcgPSAwO1xuZXhwb3J0IGNvbnN0IEZMQUdTID0gMTtcbmV4cG9ydCBjb25zdCBQQVJFTlQgPSAyO1xuZXhwb3J0IGNvbnN0IE5FWFQgPSAzO1xuZXhwb3J0IGNvbnN0IFFVRVJJRVMgPSA0O1xuZXhwb3J0IGNvbnN0IEhPU1QgPSA1O1xuZXhwb3J0IGNvbnN0IEhPU1RfTk9ERSA9IDY7ICAvLyBSZW5hbWUgdG8gYFRfSE9TVGA/XG5leHBvcnQgY29uc3QgQklORElOR19JTkRFWCA9IDc7XG5leHBvcnQgY29uc3QgQ0xFQU5VUCA9IDg7XG5leHBvcnQgY29uc3QgQ09OVEVYVCA9IDk7XG5leHBvcnQgY29uc3QgSU5KRUNUT1IgPSAxMDtcbmV4cG9ydCBjb25zdCBSRU5ERVJFUl9GQUNUT1JZID0gMTE7XG5leHBvcnQgY29uc3QgUkVOREVSRVIgPSAxMjtcbmV4cG9ydCBjb25zdCBTQU5JVElaRVIgPSAxMztcbmV4cG9ydCBjb25zdCBUQUlMID0gMTQ7XG5leHBvcnQgY29uc3QgQ09OVEFJTkVSX0lOREVYID0gMTU7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9RVUVSSUVTID0gMTY7XG5leHBvcnQgY29uc3QgREVDTEFSQVRJT05fVklFVyA9IDE3O1xuLyoqIFNpemUgb2YgTFZpZXdEYXRhJ3MgaGVhZGVyLiBOZWNlc3NhcnkgdG8gYWRqdXN0IGZvciBpdCB3aGVuIHNldHRpbmcgc2xvdHMuICAqL1xuZXhwb3J0IGNvbnN0IEhFQURFUl9PRkZTRVQgPSAxODtcblxuXG4vLyBUaGlzIGludGVyZmFjZSByZXBsYWNlcyB0aGUgcmVhbCBMVmlld0RhdGEgaW50ZXJmYWNlIGlmIGl0IGlzIGFuIGFyZyBvciBhXG4vLyByZXR1cm4gdmFsdWUgb2YgYSBwdWJsaWMgaW5zdHJ1Y3Rpb24uIFRoaXMgZW5zdXJlcyB3ZSBkb24ndCBuZWVkIHRvIGV4cG9zZVxuLy8gdGhlIGFjdHVhbCBpbnRlcmZhY2UsIHdoaWNoIHNob3VsZCBiZSBrZXB0IHByaXZhdGUuXG5leHBvcnQgaW50ZXJmYWNlIE9wYXF1ZVZpZXdTdGF0ZSB7XG4gICdfX2JyYW5kX18nOiAnQnJhbmQgZm9yIE9wYXF1ZVZpZXdTdGF0ZSB0aGF0IG5vdGhpbmcgd2lsbCBtYXRjaCc7XG59XG5cblxuLyoqXG4gKiBgTFZpZXdEYXRhYCBzdG9yZXMgYWxsIG9mIHRoZSBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gcHJvY2VzcyB0aGUgaW5zdHJ1Y3Rpb25zIGFzXG4gKiB0aGV5IGFyZSBpbnZva2VkIGZyb20gdGhlIHRlbXBsYXRlLiBFYWNoIGVtYmVkZGVkIHZpZXcgYW5kIGNvbXBvbmVudCB2aWV3IGhhcyBpdHNcbiAqIG93biBgTFZpZXdEYXRhYC4gV2hlbiBwcm9jZXNzaW5nIGEgcGFydGljdWxhciB2aWV3LCB3ZSBzZXQgdGhlIGB2aWV3RGF0YWAgdG8gdGhhdFxuICogYExWaWV3RGF0YWAuIFdoZW4gdGhhdCB2aWV3IGlzIGRvbmUgcHJvY2Vzc2luZywgdGhlIGB2aWV3RGF0YWAgaXMgc2V0IGJhY2sgdG9cbiAqIHdoYXRldmVyIHRoZSBvcmlnaW5hbCBgdmlld0RhdGFgIHdhcyBiZWZvcmUgKHRoZSBwYXJlbnQgYExWaWV3RGF0YWApLlxuICpcbiAqIEtlZXBpbmcgc2VwYXJhdGUgc3RhdGUgZm9yIGVhY2ggdmlldyBmYWNpbGl0aWVzIHZpZXcgaW5zZXJ0aW9uIC8gZGVsZXRpb24sIHNvIHdlXG4gKiBkb24ndCBoYXZlIHRvIGVkaXQgdGhlIGRhdGEgYXJyYXkgYmFzZWQgb24gd2hpY2ggdmlld3MgYXJlIHByZXNlbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFZpZXdEYXRhIGV4dGVuZHMgQXJyYXk8YW55PiB7XG4gIC8qKlxuICAgKiBUaGUgc3RhdGljIGRhdGEgZm9yIHRoaXMgdmlldy4gV2UgbmVlZCBhIHJlZmVyZW5jZSB0byB0aGlzIHNvIHdlIGNhbiBlYXNpbHkgd2FsayB1cCB0aGVcbiAgICogbm9kZSB0cmVlIGluIERJIGFuZCBnZXQgdGhlIFRWaWV3LmRhdGEgYXJyYXkgYXNzb2NpYXRlZCB3aXRoIGEgbm9kZSAod2hlcmUgdGhlXG4gICAqIGRpcmVjdGl2ZSBkZWZzIGFyZSBzdG9yZWQpLlxuICAgKi9cbiAgcmVhZG9ubHlbVFZJRVddOiBUVmlldztcblxuICAvKiogRmxhZ3MgZm9yIHRoaXMgdmlldy4gU2VlIExWaWV3RmxhZ3MgZm9yIG1vcmUgaW5mby4gKi9cbiAgW0ZMQUdTXTogTFZpZXdGbGFncztcblxuICAvKipcbiAgICogVGhlIHBhcmVudCB2aWV3IGlzIG5lZWRlZCB3aGVuIHdlIGV4aXQgdGhlIHZpZXcgYW5kIG11c3QgcmVzdG9yZSB0aGUgcHJldmlvdXNcbiAgICogYExWaWV3RGF0YWAuIFdpdGhvdXQgdGhpcywgdGhlIHJlbmRlciBtZXRob2Qgd291bGQgaGF2ZSB0byBrZWVwIGEgc3RhY2sgb2ZcbiAgICogdmlld3MgYXMgaXQgaXMgcmVjdXJzaXZlbHkgcmVuZGVyaW5nIHRlbXBsYXRlcy5cbiAgICpcbiAgICogVGhpcyBpcyB0aGUgXCJpbnNlcnRpb25cIiB2aWV3IGZvciBlbWJlZGRlZCB2aWV3cy4gVGhpcyBhbGxvd3MgdXMgdG8gcHJvcGVybHlcbiAgICogZGVzdHJveSBlbWJlZGRlZCB2aWV3cy5cbiAgICovXG4gIFtQQVJFTlRdOiBMVmlld0RhdGF8bnVsbDtcblxuICAvKipcbiAgICpcbiAgICogVGhlIG5leHQgc2libGluZyBMVmlld0RhdGEgb3IgTENvbnRhaW5lci5cbiAgICpcbiAgICogQWxsb3dzIHVzIHRvIHByb3BhZ2F0ZSBiZXR3ZWVuIHNpYmxpbmcgdmlldyBzdGF0ZXMgdGhhdCBhcmVuJ3QgaW4gdGhlIHNhbWVcbiAgICogY29udGFpbmVyLiBFbWJlZGRlZCB2aWV3cyBhbHJlYWR5IGhhdmUgYSBub2RlLm5leHQsIGJ1dCBpdCBpcyBvbmx5IHNldCBmb3JcbiAgICogdmlld3MgaW4gdGhlIHNhbWUgY29udGFpbmVyLiBXZSBuZWVkIGEgd2F5IHRvIGxpbmsgY29tcG9uZW50IHZpZXdzIGFuZCB2aWV3c1xuICAgKiBhY3Jvc3MgY29udGFpbmVycyBhcyB3ZWxsLlxuICAgKi9cbiAgW05FWFRdOiBMVmlld0RhdGF8TENvbnRhaW5lcnxudWxsO1xuXG4gIC8qKiBRdWVyaWVzIGFjdGl2ZSBmb3IgdGhpcyB2aWV3IC0gbm9kZXMgZnJvbSBhIHZpZXcgYXJlIHJlcG9ydGVkIHRvIHRob3NlIHF1ZXJpZXMuICovXG4gIFtRVUVSSUVTXTogTFF1ZXJpZXN8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGhvc3Qgbm9kZSBmb3IgdGhpcyBMVmlld0RhdGEgaW5zdGFuY2UsIGlmIHRoaXMgaXMgYSBjb21wb25lbnQgdmlldy5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3LCBIT1NUIHdpbGwgYmUgbnVsbC5cbiAgICovXG4gIFtIT1NUXTogUkVsZW1lbnR8U3R5bGluZ0NvbnRleHR8bnVsbDtcblxuICAvKipcbiAgICogUG9pbnRlciB0byB0aGUgYFRWaWV3Tm9kZWAgb3IgYFRFbGVtZW50Tm9kZWAgd2hpY2ggcmVwcmVzZW50cyB0aGUgcm9vdCBvZiB0aGUgdmlldy5cbiAgICpcbiAgICogSWYgYFRWaWV3Tm9kZWAsIHRoaXMgaXMgYW4gZW1iZWRkZWQgdmlldyBvZiBhIGNvbnRhaW5lci4gV2UgbmVlZCB0aGlzIHRvIGJlIGFibGUgdG9cbiAgICogZWZmaWNpZW50bHkgZmluZCB0aGUgYExWaWV3Tm9kZWAgd2hlbiBpbnNlcnRpbmcgdGhlIHZpZXcgaW50byBhbiBhbmNob3IuXG4gICAqXG4gICAqIElmIGBURWxlbWVudE5vZGVgLCB0aGlzIGlzIHRoZSBMVmlldyBvZiBhIGNvbXBvbmVudC5cbiAgICpcbiAgICogSWYgbnVsbCwgdGhpcyBpcyB0aGUgcm9vdCB2aWV3IG9mIGFuIGFwcGxpY2F0aW9uIChyb290IGNvbXBvbmVudCBpcyBpbiB0aGlzIHZpZXcpLlxuICAgKi9cbiAgW0hPU1RfTk9ERV06IFRWaWV3Tm9kZXxURWxlbWVudE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGJpbmRpbmcgaW5kZXggd2Ugc2hvdWxkIGFjY2VzcyBuZXh0LlxuICAgKlxuICAgKiBUaGlzIGlzIHN0b3JlZCBzbyB0aGF0IGJpbmRpbmdzIGNhbiBjb250aW51ZSB3aGVyZSB0aGV5IGxlZnQgb2ZmXG4gICAqIGlmIGEgdmlldyBpcyBsZWZ0IG1pZHdheSB0aHJvdWdoIHByb2Nlc3NpbmcgYmluZGluZ3MgKGUuZy4gaWYgdGhlcmUgaXNcbiAgICogYSBzZXR0ZXIgdGhhdCBjcmVhdGVzIGFuIGVtYmVkZGVkIHZpZXcsIGxpa2UgaW4gbmdJZikuXG4gICAqL1xuICBbQklORElOR19JTkRFWF06IG51bWJlcjtcblxuICAvKipcbiAgICogV2hlbiBhIHZpZXcgaXMgZGVzdHJveWVkLCBsaXN0ZW5lcnMgbmVlZCB0byBiZSByZWxlYXNlZCBhbmQgb3V0cHV0cyBuZWVkIHRvIGJlXG4gICAqIHVuc3Vic2NyaWJlZC4gVGhpcyBjb250ZXh0IGFycmF5IHN0b3JlcyBib3RoIGxpc3RlbmVyIGZ1bmN0aW9ucyB3cmFwcGVkIHdpdGhcbiAgICogdGhlaXIgY29udGV4dCBhbmQgb3V0cHV0IHN1YnNjcmlwdGlvbiBpbnN0YW5jZXMgZm9yIGEgcGFydGljdWxhciB2aWV3LlxuICAgKlxuICAgKiBUaGVzZSBjaGFuZ2UgcGVyIExWaWV3IGluc3RhbmNlLCBzbyB0aGV5IGNhbm5vdCBiZSBzdG9yZWQgb24gVFZpZXcuIEluc3RlYWQsXG4gICAqIFRWaWV3LmNsZWFudXAgc2F2ZXMgYW4gaW5kZXggdG8gdGhlIG5lY2Vzc2FyeSBjb250ZXh0IGluIHRoaXMgYXJyYXkuXG4gICAqL1xuICAvLyBUT0RPOiBmbGF0dGVuIGludG8gTFZpZXdEYXRhW11cbiAgW0NMRUFOVVBdOiBhbnlbXXxudWxsO1xuXG4gIC8qKlxuICAgKiAtIEZvciBkeW5hbWljIHZpZXdzLCB0aGlzIGlzIHRoZSBjb250ZXh0IHdpdGggd2hpY2ggdG8gcmVuZGVyIHRoZSB0ZW1wbGF0ZSAoZS5nLlxuICAgKiAgIGBOZ0ZvckNvbnRleHRgKSwgb3IgYHt9YCBpZiBub3QgZGVmaW5lZCBleHBsaWNpdGx5LlxuICAgKiAtIEZvciByb290IHZpZXcgb2YgdGhlIHJvb3QgY29tcG9uZW50IHRoZSBjb250ZXh0IGNvbnRhaW5zIGNoYW5nZSBkZXRlY3Rpb24gZGF0YS5cbiAgICogLSBGb3Igbm9uLXJvb3QgY29tcG9uZW50cywgdGhlIGNvbnRleHQgaXMgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSxcbiAgICogLSBGb3IgaW5saW5lIHZpZXdzLCB0aGUgY29udGV4dCBpcyBudWxsLlxuICAgKi9cbiAgW0NPTlRFWFRdOiB7fXxSb290Q29udGV4dHxudWxsO1xuXG4gIC8qKiBBbiBvcHRpb25hbCBNb2R1bGUgSW5qZWN0b3IgdG8gYmUgdXNlZCBhcyBmYWxsIGJhY2sgYWZ0ZXIgRWxlbWVudCBJbmplY3RvcnMgYXJlIGNvbnN1bHRlZC4gKi9cbiAgcmVhZG9ubHlbSU5KRUNUT1JdOiBJbmplY3RvcnxudWxsO1xuXG4gIC8qKiBSZW5kZXJlciB0byBiZSB1c2VkIGZvciB0aGlzIHZpZXcuICovXG4gIFtSRU5ERVJFUl9GQUNUT1JZXTogUmVuZGVyZXJGYWN0b3J5MztcblxuICAvKiogUmVuZGVyZXIgdG8gYmUgdXNlZCBmb3IgdGhpcyB2aWV3LiAqL1xuICBbUkVOREVSRVJdOiBSZW5kZXJlcjM7XG5cbiAgLyoqIEFuIG9wdGlvbmFsIGN1c3RvbSBzYW5pdGl6ZXIuICovXG4gIFtTQU5JVElaRVJdOiBTYW5pdGl6ZXJ8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGxhc3QgTFZpZXdEYXRhIG9yIExDb250YWluZXIgYmVuZWF0aCB0aGlzIExWaWV3RGF0YSBpbiB0aGUgaGllcmFyY2h5LlxuICAgKlxuICAgKiBUaGUgdGFpbCBhbGxvd3MgdXMgdG8gcXVpY2tseSBhZGQgYSBuZXcgc3RhdGUgdG8gdGhlIGVuZCBvZiB0aGUgdmlldyBsaXN0XG4gICAqIHdpdGhvdXQgaGF2aW5nIHRvIHByb3BhZ2F0ZSBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBjaGlsZC5cbiAgICovXG4gIFtUQUlMXTogTFZpZXdEYXRhfExDb250YWluZXJ8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBwYXJlbnQgY29udGFpbmVyJ3MgaG9zdCBub2RlLiBBcHBsaWNhYmxlIG9ubHkgdG8gZW1iZWRkZWQgdmlld3MgdGhhdFxuICAgKiBoYXZlIGJlZW4gaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFdpbGwgYmUgLTEgZm9yIGNvbXBvbmVudCB2aWV3cyBhbmQgaW5saW5lIHZpZXdzLlxuICAgKlxuICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBqdW1wIGZyb20gZHluYW1pY2FsbHkgY3JlYXRlZCBlbWJlZGRlZCB2aWV3cyB0byB0aGVpciBwYXJlbnRcbiAgICogY29udGFpbmVycyBiZWNhdXNlIHRoZWlyIHBhcmVudCBjYW5ub3QgYmUgc3RvcmVkIG9uIHRoZSBUVmlld05vZGUgKHZpZXdzIG1heSBiZSBpbnNlcnRlZFxuICAgKiBpbiBtdWx0aXBsZSBjb250YWluZXJzLCBzbyB0aGUgcGFyZW50IGNhbm5vdCBiZSBzaGFyZWQgYmV0d2VlbiB2aWV3IGluc3RhbmNlcykuXG4gICAqL1xuICBbQ09OVEFJTkVSX0lOREVYXTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdG9yZXMgUXVlcnlMaXN0cyBhc3NvY2lhdGVkIHdpdGggY29udGVudCBxdWVyaWVzIG9mIGEgZGlyZWN0aXZlLiBUaGlzIGRhdGEgc3RydWN0dXJlIGlzXG4gICAqIGZpbGxlZC1pbiBhcyBwYXJ0IG9mIGEgZGlyZWN0aXZlIGNyZWF0aW9uIHByb2Nlc3MgYW5kIGlzIGxhdGVyIHVzZWQgdG8gcmV0cmlldmUgYSBRdWVyeUxpc3QgdG9cbiAgICogYmUgcmVmcmVzaGVkLlxuICAgKi9cbiAgW0NPTlRFTlRfUVVFUklFU106IFF1ZXJ5TGlzdDxhbnk+W118bnVsbDtcblxuICAvKipcbiAgICogVmlldyB3aGVyZSB0aGlzIHZpZXcncyB0ZW1wbGF0ZSB3YXMgZGVjbGFyZWQuXG4gICAqXG4gICAqIE9ubHkgYXBwbGljYWJsZSBmb3IgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3cy4gV2lsbCBiZSBudWxsIGZvciBpbmxpbmUvY29tcG9uZW50IHZpZXdzLlxuICAgKlxuICAgKiBUaGUgdGVtcGxhdGUgZm9yIGEgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3IG1heSBiZSBkZWNsYXJlZCBpbiBhIGRpZmZlcmVudCB2aWV3IHRoYW5cbiAgICogaXQgaXMgaW5zZXJ0ZWQuIFdlIGFscmVhZHkgdHJhY2sgdGhlIFwiaW5zZXJ0aW9uIHZpZXdcIiAodmlldyB3aGVyZSB0aGUgdGVtcGxhdGUgd2FzXG4gICAqIGluc2VydGVkKSBpbiBMVmlld0RhdGFbUEFSRU5UXSwgYnV0IHdlIGFsc28gbmVlZCBhY2Nlc3MgdG8gdGhlIFwiZGVjbGFyYXRpb24gdmlld1wiXG4gICAqICh2aWV3IHdoZXJlIHRoZSB0ZW1wbGF0ZSB3YXMgZGVjbGFyZWQpLiBPdGhlcndpc2UsIHdlIHdvdWxkbid0IGJlIGFibGUgdG8gY2FsbCB0aGVcbiAgICogdmlldydzIHRlbXBsYXRlIGZ1bmN0aW9uIHdpdGggdGhlIHByb3BlciBjb250ZXh0cy4gQ29udGV4dCBzaG91bGQgYmUgaW5oZXJpdGVkIGZyb21cbiAgICogdGhlIGRlY2xhcmF0aW9uIHZpZXcgdHJlZSwgbm90IHRoZSBpbnNlcnRpb24gdmlldyB0cmVlLlxuICAgKlxuICAgKiBFeGFtcGxlIChBcHBDb21wb25lbnQgdGVtcGxhdGUpOlxuICAgKlxuICAgKiA8bmctdGVtcGxhdGUgI2Zvbz48L25nLXRlbXBsYXRlPiAgICAgICA8LS0gZGVjbGFyZWQgaGVyZSAtLT5cbiAgICogPHNvbWUtY29tcCBbdHBsXT1cImZvb1wiPjwvc29tZS1jb21wPiAgICA8LS0gaW5zZXJ0ZWQgaW5zaWRlIHRoaXMgY29tcG9uZW50IC0tPlxuICAgKlxuICAgKiBUaGUgPG5nLXRlbXBsYXRlPiBhYm92ZSBpcyBkZWNsYXJlZCBpbiB0aGUgQXBwQ29tcG9uZW50IHRlbXBsYXRlLCBidXQgaXQgd2lsbCBiZSBwYXNzZWQgaW50b1xuICAgKiBTb21lQ29tcCBhbmQgaW5zZXJ0ZWQgdGhlcmUuIEluIHRoaXMgY2FzZSwgdGhlIGRlY2xhcmF0aW9uIHZpZXcgd291bGQgYmUgdGhlIEFwcENvbXBvbmVudCxcbiAgICogYnV0IHRoZSBpbnNlcnRpb24gdmlldyB3b3VsZCBiZSBTb21lQ29tcC4gV2hlbiB3ZSBhcmUgcmVtb3Zpbmcgdmlld3MsIHdlIHdvdWxkIHdhbnQgdG9cbiAgICogdHJhdmVyc2UgdGhyb3VnaCB0aGUgaW5zZXJ0aW9uIHZpZXcgdG8gY2xlYW4gdXAgbGlzdGVuZXJzLiBXaGVuIHdlIGFyZSBjYWxsaW5nIHRoZVxuICAgKiB0ZW1wbGF0ZSBmdW5jdGlvbiBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiwgd2UgbmVlZCB0aGUgZGVjbGFyYXRpb24gdmlldyB0byBnZXQgaW5oZXJpdGVkXG4gICAqIGNvbnRleHQuXG4gICAqL1xuICBbREVDTEFSQVRJT05fVklFV106IExWaWV3RGF0YXxudWxsO1xufVxuXG4vKiogRmxhZ3MgYXNzb2NpYXRlZCB3aXRoIGFuIExWaWV3IChzYXZlZCBpbiBMVmlld0RhdGFbRkxBR1NdKSAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTFZpZXdGbGFncyB7XG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdmlldyBpcyBpbiBjcmVhdGlvbk1vZGUuXG4gICAqXG4gICAqIFRoaXMgbXVzdCBiZSBzdG9yZWQgaW4gdGhlIHZpZXcgcmF0aGVyIHRoYW4gdXNpbmcgYGRhdGFgIGFzIGEgbWFya2VyIHNvIHRoYXRcbiAgICogd2UgY2FuIHByb3Blcmx5IHN1cHBvcnQgZW1iZWRkZWQgdmlld3MuIE90aGVyd2lzZSwgd2hlbiBleGl0aW5nIGEgY2hpbGQgdmlld1xuICAgKiBiYWNrIGludG8gdGhlIHBhcmVudCB2aWV3LCBgZGF0YWAgd2lsbCBiZSBkZWZpbmVkIGFuZCBgY3JlYXRpb25Nb2RlYCB3aWxsIGJlXG4gICAqIGltcHJvcGVybHkgcmVwb3J0ZWQgYXMgZmFsc2UuXG4gICAqL1xuICBDcmVhdGlvbk1vZGUgPSAwYjAwMDAwMDEsXG5cbiAgLyoqIFdoZXRoZXIgdGhpcyB2aWV3IGhhcyBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kgKGNoZWNrcyBhbHdheXMpIG9yIG9uUHVzaCAqL1xuICBDaGVja0Fsd2F5cyA9IDBiMDAwMDAxMCxcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB2aWV3IGlzIGN1cnJlbnRseSBkaXJ0eSAobmVlZGluZyBjaGVjaykgKi9cbiAgRGlydHkgPSAwYjAwMDAxMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBjdXJyZW50bHkgYXR0YWNoZWQgdG8gY2hhbmdlIGRldGVjdGlvbiB0cmVlLiAqL1xuICBBdHRhY2hlZCA9IDBiMDAwMTAwMCxcblxuICAvKipcbiAgICogIFdoZXRoZXIgb3Igbm90IHRoZSBpbml0IGhvb2tzIGhhdmUgcnVuLlxuICAgKlxuICAgKiBJZiBvbiwgdGhlIGluaXQgaG9va3MgaGF2ZW4ndCB5ZXQgYmVlbiBydW4gYW5kIHNob3VsZCBiZSBleGVjdXRlZCBieSB0aGUgZmlyc3QgY29tcG9uZW50IHRoYXRcbiAgICogcnVucyBPUiB0aGUgZmlyc3QgY1IoKSBpbnN0cnVjdGlvbiB0aGF0IHJ1bnMgKHNvIGluaXRzIGFyZSBydW4gZm9yIHRoZSB0b3AgbGV2ZWwgdmlldyBiZWZvcmVcbiAgICogYW55IGVtYmVkZGVkIHZpZXdzKS5cbiAgICovXG4gIFJ1bkluaXQgPSAwYjAwMTAwMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBkZXN0cm95ZWQuICovXG4gIERlc3Ryb3llZCA9IDBiMDEwMDAwMCxcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB2aWV3IGlzIHRoZSByb290IHZpZXcgKi9cbiAgSXNSb290ID0gMGIxMDAwMDAwLFxufVxuXG4vKipcbiAqIFRoZSBzdGF0aWMgZGF0YSBmb3IgYW4gTFZpZXcgKHNoYXJlZCBiZXR3ZWVuIGFsbCB0ZW1wbGF0ZXMgb2YgYVxuICogZ2l2ZW4gdHlwZSkuXG4gKlxuICogU3RvcmVkIG9uIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbiBhcyBuZ1ByaXZhdGVEYXRhLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRWaWV3IHtcbiAgLyoqXG4gICAqIElEIGZvciBpbmxpbmUgdmlld3MgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSB2aWV3IGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyB2aWV3XG4gICAqIGluIGEgY2VydGFpbiBwb3NpdGlvbi4gSWYgaXQncyBub3QsIHdlIGtub3cgdGhlIG5ldyB2aWV3IG5lZWRzIHRvIGJlIGluc2VydGVkXG4gICAqIGFuZCB0aGUgb25lIHRoYXQgZXhpc3RzIG5lZWRzIHRvIGJlIHJlbW92ZWQgKGUuZy4gaWYvZWxzZSBzdGF0ZW1lbnRzKVxuICAgKlxuICAgKiBJZiB0aGlzIGlzIC0xLCB0aGVuIHRoaXMgaXMgYSBjb21wb25lbnQgdmlldyBvciBhIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlldy5cbiAgICovXG4gIHJlYWRvbmx5IGlkOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBibHVlcHJpbnQgdXNlZCB0byBnZW5lcmF0ZSBMVmlld0RhdGEgaW5zdGFuY2VzIGZvciB0aGlzIFRWaWV3LiBDb3B5aW5nIHRoaXNcbiAgICogYmx1ZXByaW50IGlzIGZhc3RlciB0aGFuIGNyZWF0aW5nIGEgbmV3IExWaWV3RGF0YSBmcm9tIHNjcmF0Y2guXG4gICAqL1xuICBibHVlcHJpbnQ6IExWaWV3RGF0YTtcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIGZ1bmN0aW9uIHVzZWQgdG8gcmVmcmVzaCB0aGUgdmlldyBvZiBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzXG4gICAqIGFuZCBjb21wb25lbnRzLiBXaWxsIGJlIG51bGwgZm9yIGlubGluZSB2aWV3cy5cbiAgICovXG4gIHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTx7fT58bnVsbDtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiBjb250YWluaW5nIHF1ZXJ5LXJlbGF0ZWQgaW5zdHJ1Y3Rpb25zLlxuICAgKi9cbiAgdmlld1F1ZXJ5OiBDb21wb25lbnRRdWVyeTx7fT58bnVsbDtcblxuICAvKipcbiAgICogUG9pbnRlciB0byB0aGUgYFROb2RlYCB0aGF0IHJlcHJlc2VudHMgdGhlIHJvb3Qgb2YgdGhlIHZpZXcuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBgVE5vZGVgIGZvciBhbiBgTFZpZXdOb2RlYCwgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3IG9mIGEgY29udGFpbmVyLlxuICAgKiBXZSBuZWVkIHRoaXMgcG9pbnRlciB0byBiZSBhYmxlIHRvIGVmZmljaWVudGx5IGZpbmQgdGhpcyBub2RlIHdoZW4gaW5zZXJ0aW5nIHRoZSB2aWV3XG4gICAqIGludG8gYW4gYW5jaG9yLlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIGEgYFRFbGVtZW50Tm9kZWAsIHRoaXMgaXMgdGhlIHZpZXcgb2YgYSByb290IGNvbXBvbmVudC4gSXQgaGFzIGV4YWN0bHkgb25lXG4gICAqIHJvb3QgVE5vZGUuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgbnVsbCwgdGhpcyBpcyB0aGUgdmlldyBvZiBhIGNvbXBvbmVudCB0aGF0IGlzIG5vdCBhdCByb290LiBXZSBkbyBub3Qgc3RvcmVcbiAgICogdGhlIGhvc3QgVE5vZGVzIGZvciBjaGlsZCBjb21wb25lbnQgdmlld3MgYmVjYXVzZSB0aGV5IGNhbiBwb3RlbnRpYWxseSBoYXZlIHNldmVyYWxcbiAgICogZGlmZmVyZW50IGhvc3QgVE5vZGVzLCBkZXBlbmRpbmcgb24gd2hlcmUgdGhlIGNvbXBvbmVudCBpcyBiZWluZyB1c2VkLiBUaGVzZSBob3N0XG4gICAqIFROb2RlcyBjYW5ub3QgYmUgc2hhcmVkIChkdWUgdG8gZGlmZmVyZW50IGluZGljZXMsIGV0YykuXG4gICAqL1xuICBub2RlOiBUVmlld05vZGV8VEVsZW1lbnROb2RlfG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdGVtcGxhdGUgaGFzIGJlZW4gcHJvY2Vzc2VkLiAqL1xuICBmaXJzdFRlbXBsYXRlUGFzczogYm9vbGVhbjtcblxuICAvKiogU3RhdGljIGRhdGEgZXF1aXZhbGVudCBvZiBMVmlldy5kYXRhW10uIENvbnRhaW5zIFROb2RlcywgUGlwZURlZkludGVybmFsIG9yIFRJMThuLiAqL1xuICBkYXRhOiBURGF0YTtcblxuICAvKipcbiAgICogVGhlIGJpbmRpbmcgc3RhcnQgaW5kZXggaXMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBkYXRhIGFycmF5XG4gICAqIHN0YXJ0cyB0byBzdG9yZSBiaW5kaW5ncyBvbmx5LiBTYXZpbmcgdGhpcyB2YWx1ZSBlbnN1cmVzIHRoYXQgd2VcbiAgICogd2lsbCBiZWdpbiByZWFkaW5nIGJpbmRpbmdzIGF0IHRoZSBjb3JyZWN0IHBvaW50IGluIHRoZSBhcnJheSB3aGVuXG4gICAqIHdlIGFyZSBpbiB1cGRhdGUgbW9kZS5cbiAgICovXG4gIGJpbmRpbmdTdGFydEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCB3aGVyZSB0aGUgXCJleHBhbmRvXCIgc2VjdGlvbiBvZiBgTFZpZXdEYXRhYCBiZWdpbnMuIFRoZSBleHBhbmRvXG4gICAqIHNlY3Rpb24gY29udGFpbnMgaW5qZWN0b3JzLCBkaXJlY3RpdmUgaW5zdGFuY2VzLCBhbmQgaG9zdCBiaW5kaW5nIHZhbHVlcy5cbiAgICogVW5saWtlIHRoZSBcImNvbnN0c1wiIGFuZCBcInZhcnNcIiBzZWN0aW9ucyBvZiBgTFZpZXdEYXRhYCwgdGhlIGxlbmd0aCBvZiB0aGlzXG4gICAqIHNlY3Rpb24gY2Fubm90IGJlIGNhbGN1bGF0ZWQgYXQgY29tcGlsZS10aW1lIGJlY2F1c2UgZGlyZWN0aXZlcyBhcmUgbWF0Y2hlZFxuICAgKiBhdCBydW50aW1lIHRvIHByZXNlcnZlIGxvY2FsaXR5LlxuICAgKlxuICAgKiBXZSBzdG9yZSB0aGlzIHN0YXJ0IGluZGV4IHNvIHdlIGtub3cgd2hlcmUgdG8gc3RhcnQgY2hlY2tpbmcgaG9zdCBiaW5kaW5nc1xuICAgKiBpbiBgc2V0SG9zdEJpbmRpbmdzYC5cbiAgICovXG4gIGV4cGFuZG9TdGFydEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBob3N0IG5vZGUgb2YgdGhlIGZpcnN0IExWaWV3IG9yIExDb250YWluZXIgYmVuZWF0aCB0aGlzIExWaWV3IGluXG4gICAqIHRoZSBoaWVyYXJjaHkuXG4gICAqXG4gICAqIE5lY2Vzc2FyeSB0byBzdG9yZSB0aGlzIHNvIHZpZXdzIGNhbiB0cmF2ZXJzZSB0aHJvdWdoIHRoZWlyIG5lc3RlZCB2aWV3c1xuICAgKiB0byByZW1vdmUgbGlzdGVuZXJzIGFuZCBjYWxsIG9uRGVzdHJveSBjYWxsYmFja3MuXG4gICAqXG4gICAqIEZvciBlbWJlZGRlZCB2aWV3cywgd2Ugc3RvcmUgdGhlIGluZGV4IG9mIGFuIExDb250YWluZXIncyBob3N0IHJhdGhlciB0aGFuIHRoZSBmaXJzdFxuICAgKiBMVmlldyB0byBhdm9pZCBtYW5hZ2luZyBzcGxpY2luZyB3aGVuIHZpZXdzIGFyZSBhZGRlZC9yZW1vdmVkLlxuICAgKi9cbiAgY2hpbGRJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZmlyc3QgY2hpbGQgbm9kZSBsb2NhdGVkIGluIHRoZSB2aWV3LlxuICAgKi9cbiAgZmlyc3RDaGlsZDogVE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogU2V0IG9mIGluc3RydWN0aW9ucyB1c2VkIHRvIHByb2Nlc3MgaG9zdCBiaW5kaW5ncyBlZmZpY2llbnRseS5cbiAgICpcbiAgICogU2VlIFZJRVdfREFUQS5tZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGV4cGFuZG9JbnN0cnVjdGlvbnM6IChudW1iZXJ8SG9zdEJpbmRpbmdzRnVuY3Rpb248YW55PilbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBGdWxsIHJlZ2lzdHJ5IG9mIGRpcmVjdGl2ZXMgYW5kIGNvbXBvbmVudHMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBJdCdzIG5lY2Vzc2FyeSB0byBrZWVwIGEgY29weSBvZiB0aGUgZnVsbCBkZWYgbGlzdCBvbiB0aGUgVFZpZXcgc28gaXQncyBwb3NzaWJsZVxuICAgKiB0byByZW5kZXIgdGVtcGxhdGUgZnVuY3Rpb25zIHdpdGhvdXQgYSBob3N0IGNvbXBvbmVudC5cbiAgICovXG4gIGRpcmVjdGl2ZVJlZ2lzdHJ5OiBEaXJlY3RpdmVEZWZMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIEZ1bGwgcmVnaXN0cnkgb2YgcGlwZXMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgZWl0aGVyIGFuIGFycmF5IG9mIGBQaXBlRGVmc2BzIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgYXJyYXkgb2ZcbiAgICogYFBpcGVEZWZzYHMuIFRoZSBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgdG8gYmUgYWJsZSB0byBzdXBwb3J0IGZvcndhcmQgZGVjbGFyYXRpb25zLlxuICAgKlxuICAgKiBJdCdzIG5lY2Vzc2FyeSB0byBrZWVwIGEgY29weSBvZiB0aGUgZnVsbCBkZWYgbGlzdCBvbiB0aGUgVFZpZXcgc28gaXQncyBwb3NzaWJsZVxuICAgKiB0byByZW5kZXIgdGVtcGxhdGUgZnVuY3Rpb25zIHdpdGhvdXQgYSBob3N0IGNvbXBvbmVudC5cbiAgICovXG4gIHBpcGVSZWdpc3RyeTogUGlwZURlZkxpc3R8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdPbkluaXQgYW5kIG5nRG9DaGVjayBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluXG4gICAqIGNyZWF0aW9uIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBpbml0SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nRG9DaGVjayBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluIHVwZGF0ZSBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgY2hlY2tIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlckNvbnRlbnRJbml0IGFuZCBuZ0FmdGVyQ29udGVudENoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWRcbiAgICogZm9yIHRoaXMgdmlldyBpbiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgY29udGVudEhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyQ29udGVudENoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpbiB1cGRhdGVcbiAgICogbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnRlbnRDaGVja0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyVmlld0luaXQgYW5kIG5nQWZ0ZXJWaWV3Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3JcbiAgICogdGhpcyB2aWV3IGluIGNyZWF0aW9uIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICB2aWV3SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJWaWV3Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluXG4gICAqIHVwZGF0ZSBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgdmlld0NoZWNrSG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nT25EZXN0cm95IGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIHdoZW4gdGhpcyB2aWV3IGlzIGRlc3Ryb3llZC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGRlc3Ryb3lIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgcGlwZSBuZ09uRGVzdHJveSBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCB3aGVuIHRoaXMgdmlldyBpcyBkZXN0cm95ZWQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogSW5kZXggb2YgcGlwZSBpbiBkYXRhXG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRoZXNlIG11c3QgYmUgc3RvcmVkIHNlcGFyYXRlbHkgZnJvbSBkaXJlY3RpdmUgZGVzdHJveSBob29rcyBiZWNhdXNlIHRoZWlyIGNvbnRleHRzXG4gICAqIGFyZSBzdG9yZWQgaW4gZGF0YS5cbiAgICovXG4gIHBpcGVEZXN0cm95SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIFdoZW4gYSB2aWV3IGlzIGRlc3Ryb3llZCwgbGlzdGVuZXJzIG5lZWQgdG8gYmUgcmVsZWFzZWQgYW5kIG91dHB1dHMgbmVlZCB0byBiZVxuICAgKiB1bnN1YnNjcmliZWQuIFRoaXMgY2xlYW51cCBhcnJheSBzdG9yZXMgYm90aCBsaXN0ZW5lciBkYXRhIChpbiBjaHVua3Mgb2YgNClcbiAgICogYW5kIG91dHB1dCBkYXRhIChpbiBjaHVua3Mgb2YgMikgZm9yIGEgcGFydGljdWxhciB2aWV3LiBDb21iaW5pbmcgdGhlIGFycmF5c1xuICAgKiBzYXZlcyBvbiBtZW1vcnkgKDcwIGJ5dGVzIHBlciBhcnJheSkgYW5kIG9uIGEgZmV3IGJ5dGVzIG9mIGNvZGUgc2l6ZSAoZm9yIHR3b1xuICAgKiBzZXBhcmF0ZSBmb3IgbG9vcHMpLlxuICAgKlxuICAgKiBJZiBpdCdzIGEgbmF0aXZlIERPTSBsaXN0ZW5lciBiZWluZyBzdG9yZWQ6XG4gICAqIDFzdCBpbmRleCBpczogZXZlbnQgbmFtZSB0byByZW1vdmVcbiAgICogMm5kIGluZGV4IGlzOiBpbmRleCBvZiBuYXRpdmUgZWxlbWVudCBpbiBMVmlldy5kYXRhW11cbiAgICogM3JkIGluZGV4IGlzOiBpbmRleCBvZiB3cmFwcGVkIGxpc3RlbmVyIGZ1bmN0aW9uIGluIExWaWV3LmNsZWFudXBJbnN0YW5jZXNbXVxuICAgKiA0dGggaW5kZXggaXM6IHVzZUNhcHR1cmUgYm9vbGVhblxuICAgKlxuICAgKiBJZiBpdCdzIGEgcmVuZGVyZXIyIHN0eWxlIGxpc3RlbmVyIG9yIFZpZXdSZWYgZGVzdHJveSBob29rIGJlaW5nIHN0b3JlZDpcbiAgICogMXN0IGluZGV4IGlzOiBpbmRleCBvZiB0aGUgY2xlYW51cCBmdW5jdGlvbiBpbiBMVmlldy5jbGVhbnVwSW5zdGFuY2VzW11cbiAgICogMm5kIGluZGV4IGlzOiBudWxsXG4gICAqXG4gICAqIElmIGl0J3MgYW4gb3V0cHV0IHN1YnNjcmlwdGlvbiBvciBxdWVyeSBsaXN0IGRlc3Ryb3kgaG9vazpcbiAgICogMXN0IGluZGV4IGlzOiBvdXRwdXQgdW5zdWJzY3JpYmUgZnVuY3Rpb24gLyBxdWVyeSBsaXN0IGRlc3Ryb3kgZnVuY3Rpb25cbiAgICogMm5kIGluZGV4IGlzOiBpbmRleCBvZiBmdW5jdGlvbiBjb250ZXh0IGluIExWaWV3LmNsZWFudXBJbnN0YW5jZXNbXVxuICAgKi9cbiAgY2xlYW51cDogYW55W118bnVsbDtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGVsZW1lbnQgaW5kaWNlcyBmb3IgY2hpbGQgY29tcG9uZW50cyB0aGF0IHdpbGwgbmVlZCB0byBiZVxuICAgKiByZWZyZXNoZWQgd2hlbiB0aGUgY3VycmVudCB2aWV3IGhhcyBmaW5pc2hlZCBpdHMgY2hlY2suIFRoZXNlIGluZGljZXMgaGF2ZVxuICAgKiBhbHJlYWR5IGJlZW4gYWRqdXN0ZWQgZm9yIHRoZSBIRUFERVJfT0ZGU0VULlxuICAgKlxuICAgKi9cbiAgY29tcG9uZW50czogbnVtYmVyW118bnVsbDtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGluZGljZXMgZm9yIGNoaWxkIGRpcmVjdGl2ZXMgdGhhdCBoYXZlIGNvbnRlbnQgcXVlcmllcy5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kaWNlc1xuICAgKiBPZGQgaW5kaWNlczogU3RhcnRpbmcgaW5kZXggb2YgY29udGVudCBxdWVyaWVzIChzdG9yZWQgaW4gQ09OVEVOVF9RVUVSSUVTKSBmb3IgdGhpcyBkaXJlY3RpdmVcbiAgICovXG4gIGNvbnRlbnRRdWVyaWVzOiBudW1iZXJbXXxudWxsO1xufVxuXG5leHBvcnQgY29uc3QgZW51bSBSb290Q29udGV4dEZsYWdzIHtFbXB0eSA9IDBiMDAsIERldGVjdENoYW5nZXMgPSAwYjAxLCBGbHVzaFBsYXllcnMgPSAwYjEwfVxuXG5cbi8qKlxuICogUm9vdENvbnRleHQgY29udGFpbnMgaW5mb3JtYXRpb24gd2hpY2ggaXMgc2hhcmVkIGZvciBhbGwgY29tcG9uZW50cyB3aGljaFxuICogd2VyZSBib290c3RyYXBwZWQgd2l0aCB7QGxpbmsgcmVuZGVyQ29tcG9uZW50fS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb290Q29udGV4dCB7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgZm9yIHNjaGVkdWxpbmcgY2hhbmdlIGRldGVjdGlvbiBpbiB0aGUgZnV0dXJlLiBVc3VhbGx5XG4gICAqIHRoaXMgaXMgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAuXG4gICAqL1xuICBzY2hlZHVsZXI6ICh3b3JrRm46ICgpID0+IHZvaWQpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCB3aGVuIGFsbCBjb21wb25lbnRzIGFyZSBjb25zaWRlcmVkIGNsZWFuIChub3QgZGlydHkpLlxuICAgKlxuICAgKiBUaGlzIHByb21pc2UgaXMgb3ZlcndyaXR0ZW4gZXZlcnkgdGltZSBhIGZpcnN0IGNhbGwgdG8ge0BsaW5rIG1hcmtEaXJ0eX0gaXMgaW52b2tlZC5cbiAgICovXG4gIGNsZWFuOiBQcm9taXNlPG51bGw+O1xuXG4gIC8qKlxuICAgKiBSb290Q29tcG9uZW50cyAtIFRoZSBjb21wb25lbnRzIHRoYXQgd2VyZSBpbnN0YW50aWF0ZWQgYnkgdGhlIGNhbGwgdG9cbiAgICoge0BsaW5rIHJlbmRlckNvbXBvbmVudH0uXG4gICAqL1xuICBjb21wb25lbnRzOiB7fVtdO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxheWVyIGZsdXNoaW5nIGhhbmRsZXIgdG8ga2ljayBvZmYgYWxsIGFuaW1hdGlvbnNcbiAgICovXG4gIHBsYXllckhhbmRsZXI6IFBsYXllckhhbmRsZXJ8bnVsbDtcblxuICAvKipcbiAgICogV2hhdCByZW5kZXItcmVsYXRlZCBvcGVyYXRpb25zIHRvIHJ1biBvbmNlIGEgc2NoZWR1bGVyIGhhcyBiZWVuIHNldFxuICAgKi9cbiAgZmxhZ3M6IFJvb3RDb250ZXh0RmxhZ3M7XG59XG5cbi8qKlxuICogQXJyYXkgb2YgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIGEgdmlldyBhbmQgdGhlaXIgZGlyZWN0aXZlIGluZGljZXMuXG4gKlxuICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEhvb2tEYXRhID0gKG51bWJlciB8ICgoKSA9PiB2b2lkKSlbXTtcblxuLyoqXG4gKiBTdGF0aWMgZGF0YSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpbnN0YW5jZS1zcGVjaWZpYyBkYXRhIGFycmF5IG9uIGFuIExWaWV3LlxuICpcbiAqIEVhY2ggbm9kZSdzIHN0YXRpYyBkYXRhIGlzIHN0b3JlZCBpbiB0RGF0YSBhdCB0aGUgc2FtZSBpbmRleCB0aGF0IGl0J3Mgc3RvcmVkXG4gKiBpbiB0aGUgZGF0YSBhcnJheS4gIEFueSBub2RlcyB0aGF0IGRvIG5vdCBoYXZlIHN0YXRpYyBkYXRhIHN0b3JlIGEgbnVsbCB2YWx1ZSBpblxuICogdERhdGEgdG8gYXZvaWQgYSBzcGFyc2UgYXJyYXkuXG4gKlxuICogRWFjaCBwaXBlJ3MgZGVmaW5pdGlvbiBpcyBzdG9yZWQgaGVyZSBhdCB0aGUgc2FtZSBpbmRleCBhcyBpdHMgcGlwZSBpbnN0YW5jZSBpblxuICogdGhlIGRhdGEgYXJyYXkuXG4gKlxuICogSW5qZWN0b3IgYmxvb20gZmlsdGVycyBhcmUgYWxzbyBzdG9yZWQgaGVyZS5cbiAqL1xuZXhwb3J0IHR5cGUgVERhdGEgPVxuICAgIChUTm9kZSB8IFBpcGVEZWY8YW55PnwgRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+fCBudW1iZXIgfCBUeXBlPGFueT58XG4gICAgIEluamVjdGlvblRva2VuPGFueT58IFRJMThuIHwgSTE4blVwZGF0ZU9wQ29kZXMgfCBudWxsKVtdO1xuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19