/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO: cleanup once the code is merged in angular/angular
export var RendererStyleFlags3;
(function (RendererStyleFlags3) {
    RendererStyleFlags3[RendererStyleFlags3["Important"] = 1] = "Important";
    RendererStyleFlags3[RendererStyleFlags3["DashCase"] = 2] = "DashCase";
})(RendererStyleFlags3 || (RendererStyleFlags3 = {}));
/** Returns whether the `renderer` is a `ProceduralRenderer3` */
export function isProceduralRenderer(renderer) {
    return !!(renderer.listen);
}
export var domRendererFactory3 = {
    createRenderer: function (hostElement, rendererType) { return document; }
};
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export var unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBY0gsMkRBQTJEO0FBQzNELE1BQU0sQ0FBTixJQUFZLG1CQUdYO0FBSEQsV0FBWSxtQkFBbUI7SUFDN0IsdUVBQWtCLENBQUE7SUFDbEIscUVBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUhXLG1CQUFtQixLQUFuQixtQkFBbUIsUUFHOUI7QUEwQkQsZ0VBQWdFO0FBQ2hFLE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxRQUF1RDtJQUUxRixPQUFPLENBQUMsQ0FBQyxDQUFFLFFBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQW1ERCxNQUFNLENBQUMsSUFBTSxtQkFBbUIsR0FBcUI7SUFDbkQsY0FBYyxFQUFFLFVBQUMsV0FBNEIsRUFBRSxZQUFrQyxJQUM5QyxPQUFPLFFBQVEsQ0FBQyxDQUFBLENBQUM7Q0FDckQsQ0FBQztBQXdERixpRkFBaUY7QUFDakYsMEJBQTBCO0FBQzFCLE1BQU0sQ0FBQyxJQUFNLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBUaGUgZ29hbCBoZXJlIGlzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBicm93c2VyIERPTSBBUEkgaXMgdGhlIFJlbmRlcmVyLlxuICogV2UgZG8gdGhpcyBieSBkZWZpbmluZyBhIHN1YnNldCBvZiBET00gQVBJIHRvIGJlIHRoZSByZW5kZXJlciBhbmQgdGhhblxuICogdXNlIHRoYXQgdGltZSBmb3IgcmVuZGVyaW5nLlxuICpcbiAqIEF0IHJ1bnRpbWUgd2UgY2FuIHRoYW4gdXNlIHRoZSBET00gYXBpIGRpcmVjdGx5LCBpbiBzZXJ2ZXIgb3Igd2ViLXdvcmtlclxuICogaXQgd2lsbCBiZSBlYXN5IHRvIGltcGxlbWVudCBzdWNoIEFQSS5cbiAqL1xuXG5pbXBvcnQge1JlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJy4uLy4uL3JlbmRlci9hcGknO1xuXG5cbi8vIFRPRE86IGNsZWFudXAgb25jZSB0aGUgY29kZSBpcyBtZXJnZWQgaW4gYW5ndWxhci9hbmd1bGFyXG5leHBvcnQgZW51bSBSZW5kZXJlclN0eWxlRmxhZ3MzIHtcbiAgSW1wb3J0YW50ID0gMSA8PCAwLFxuICBEYXNoQ2FzZSA9IDEgPDwgMVxufVxuXG5leHBvcnQgdHlwZSBSZW5kZXJlcjMgPSBPYmplY3RPcmllbnRlZFJlbmRlcmVyMyB8IFByb2NlZHVyYWxSZW5kZXJlcjM7XG5cbmV4cG9ydCB0eXBlIEdsb2JhbFRhcmdldE5hbWUgPSAnZG9jdW1lbnQnIHwgJ3dpbmRvdycgfCAnYm9keSc7XG5cbmV4cG9ydCB0eXBlIEdsb2JhbFRhcmdldFJlc29sdmVyID0gKGVsZW1lbnQ6IGFueSkgPT4ge1xuICBuYW1lOiBHbG9iYWxUYXJnZXROYW1lLCB0YXJnZXQ6IEV2ZW50VGFyZ2V0XG59O1xuXG4vKipcbiAqIE9iamVjdCBPcmllbnRlZCBzdHlsZSBvZiBBUEkgbmVlZGVkIHRvIGNyZWF0ZSBlbGVtZW50cyBhbmQgdGV4dCBub2Rlcy5cbiAqXG4gKiBUaGlzIGlzIHRoZSBuYXRpdmUgYnJvd3NlciBBUEkgc3R5bGUsIGUuZy4gb3BlcmF0aW9ucyBhcmUgbWV0aG9kcyBvbiBpbmRpdmlkdWFsIG9iamVjdHNcbiAqIGxpa2UgSFRNTEVsZW1lbnQuIFdpdGggdGhpcyBzdHlsZSwgbm8gYWRkaXRpb25hbCBjb2RlIGlzIG5lZWRlZCBhcyBhIGZhY2FkZVxuICogKHJlZHVjaW5nIHBheWxvYWQgc2l6ZSkuXG4gKiAqL1xuZXhwb3J0IGludGVyZmFjZSBPYmplY3RPcmllbnRlZFJlbmRlcmVyMyB7XG4gIGNyZWF0ZUNvbW1lbnQoZGF0YTogc3RyaW5nKTogUkNvbW1lbnQ7XG4gIGNyZWF0ZUVsZW1lbnQodGFnTmFtZTogc3RyaW5nKTogUkVsZW1lbnQ7XG4gIGNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2U6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nKTogUkVsZW1lbnQ7XG4gIGNyZWF0ZVRleHROb2RlKGRhdGE6IHN0cmluZyk6IFJUZXh0O1xuXG4gIHF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JzOiBzdHJpbmcpOiBSRWxlbWVudHxudWxsO1xufVxuXG4vKiogUmV0dXJucyB3aGV0aGVyIHRoZSBgcmVuZGVyZXJgIGlzIGEgYFByb2NlZHVyYWxSZW5kZXJlcjNgICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9jZWR1cmFsUmVuZGVyZXIocmVuZGVyZXI6IFByb2NlZHVyYWxSZW5kZXJlcjMgfCBPYmplY3RPcmllbnRlZFJlbmRlcmVyMyk6XG4gICAgcmVuZGVyZXIgaXMgUHJvY2VkdXJhbFJlbmRlcmVyMyB7XG4gIHJldHVybiAhISgocmVuZGVyZXIgYXMgYW55KS5saXN0ZW4pO1xufVxuXG4vKipcbiAqIFByb2NlZHVyYWwgc3R5bGUgb2YgQVBJIG5lZWRlZCB0byBjcmVhdGUgZWxlbWVudHMgYW5kIHRleHQgbm9kZXMuXG4gKlxuICogSW4gbm9uLW5hdGl2ZSBicm93c2VyIGVudmlyb25tZW50cyAoZS5nLiBwbGF0Zm9ybXMgc3VjaCBhcyB3ZWItd29ya2VycyksIHRoaXMgaXMgdGhlXG4gKiBmYWNhZGUgdGhhdCBlbmFibGVzIGVsZW1lbnQgbWFuaXB1bGF0aW9uLiBUaGlzIGFsc28gZmFjaWxpdGF0ZXMgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAqIHdpdGggUmVuZGVyZXIyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb2NlZHVyYWxSZW5kZXJlcjMge1xuICBkZXN0cm95KCk6IHZvaWQ7XG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IFJDb21tZW50O1xuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGwpOiBSRWxlbWVudDtcbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogUlRleHQ7XG4gIC8qKlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGFsbG93ZWQgdG8gYmUgbnVsbCAvIHVuZGVmaW5lZCxcbiAgICogaW4gd2hpY2ggY2FzZSB0aGUgdmlldyBlbmdpbmUgd29uJ3QgY2FsbCBpdC5cbiAgICogVGhpcyBpcyB1c2VkIGFzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIGZvciBwcm9kdWN0aW9uIG1vZGUuXG4gICAqL1xuICBkZXN0cm95Tm9kZT86ICgobm9kZTogUk5vZGUpID0+IHZvaWQpfG51bGw7XG4gIGFwcGVuZENoaWxkKHBhcmVudDogUkVsZW1lbnQsIG5ld0NoaWxkOiBSTm9kZSk6IHZvaWQ7XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IFJOb2RlLCBuZXdDaGlsZDogUk5vZGUsIHJlZkNoaWxkOiBSTm9kZXxudWxsKTogdm9pZDtcbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBSRWxlbWVudCwgb2xkQ2hpbGQ6IFJOb2RlLCBpc0hvc3RFbGVtZW50PzogYm9vbGVhbik6IHZvaWQ7XG4gIHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55KTogUkVsZW1lbnQ7XG5cbiAgcGFyZW50Tm9kZShub2RlOiBSTm9kZSk6IFJFbGVtZW50fG51bGw7XG4gIG5leHRTaWJsaW5nKG5vZGU6IFJOb2RlKTogUk5vZGV8bnVsbDtcblxuICBzZXRBdHRyaWJ1dGUoZWw6IFJFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBSRWxlbWVudCwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbCk6IHZvaWQ7XG4gIGFkZENsYXNzKGVsOiBSRWxlbWVudCwgbmFtZTogc3RyaW5nKTogdm9pZDtcbiAgcmVtb3ZlQ2xhc3MoZWw6IFJFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiB2b2lkO1xuICBzZXRTdHlsZShcbiAgICAgIGVsOiBSRWxlbWVudCwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSxcbiAgICAgIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnxSZW5kZXJlclN0eWxlRmxhZ3MzKTogdm9pZDtcbiAgcmVtb3ZlU3R5bGUoZWw6IFJFbGVtZW50LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8UmVuZGVyZXJTdHlsZUZsYWdzMyk6IHZvaWQ7XG4gIHNldFByb3BlcnR5KGVsOiBSRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcbiAgc2V0VmFsdWUobm9kZTogUlRleHR8UkNvbW1lbnQsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8vIFRPRE8obWlza28pOiBEZXByZWNhdGUgaW4gZmF2b3Igb2YgYWRkRXZlbnRMaXN0ZW5lci9yZW1vdmVFdmVudExpc3RlbmVyXG4gIGxpc3RlbihcbiAgICAgIHRhcmdldDogR2xvYmFsVGFyZ2V0TmFtZXxSTm9kZSwgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICBjYWxsYmFjazogKGV2ZW50OiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkKTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJlckZhY3RvcnkzIHtcbiAgY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQ6IFJFbGVtZW50fG51bGwsIHJlbmRlcmVyVHlwZTogUmVuZGVyZXJUeXBlMnxudWxsKTogUmVuZGVyZXIzO1xuICBiZWdpbj8oKTogdm9pZDtcbiAgZW5kPygpOiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgZG9tUmVuZGVyZXJGYWN0b3J5MzogUmVuZGVyZXJGYWN0b3J5MyA9IHtcbiAgY3JlYXRlUmVuZGVyZXI6IChob3N0RWxlbWVudDogUkVsZW1lbnQgfCBudWxsLCByZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTIgfCBudWxsKTpcbiAgICAgICAgICAgICAgICAgICAgICBSZW5kZXJlcjMgPT4geyByZXR1cm4gZG9jdW1lbnQ7fVxufTtcblxuLyoqIFN1YnNldCBvZiBBUEkgbmVlZGVkIGZvciBhcHBlbmRpbmcgZWxlbWVudHMgYW5kIHRleHQgbm9kZXMuICovXG5leHBvcnQgaW50ZXJmYWNlIFJOb2RlIHtcbiAgcGFyZW50Tm9kZTogUk5vZGV8bnVsbDtcblxuICBuZXh0U2libGluZzogUk5vZGV8bnVsbDtcblxuICByZW1vdmVDaGlsZChvbGRDaGlsZDogUk5vZGUpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBJbnNlcnQgYSBjaGlsZCBub2RlLlxuICAgKlxuICAgKiBVc2VkIGV4Y2x1c2l2ZWx5IGZvciBhZGRpbmcgVmlldyByb290IG5vZGVzIGludG8gVmlld0FuY2hvciBsb2NhdGlvbi5cbiAgICovXG4gIGluc2VydEJlZm9yZShuZXdDaGlsZDogUk5vZGUsIHJlZkNoaWxkOiBSTm9kZXxudWxsLCBpc1ZpZXdSb290OiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQXBwZW5kIGEgY2hpbGQgbm9kZS5cbiAgICpcbiAgICogVXNlZCBleGNsdXNpdmVseSBmb3IgYnVpbGRpbmcgdXAgRE9NIHdoaWNoIGFyZSBzdGF0aWMgKGllIG5vdCBWaWV3IHJvb3RzKVxuICAgKi9cbiAgYXBwZW5kQ2hpbGQobmV3Q2hpbGQ6IFJOb2RlKTogUk5vZGU7XG59XG5cbi8qKlxuICogU3Vic2V0IG9mIEFQSSBuZWVkZWQgZm9yIHdyaXRpbmcgYXR0cmlidXRlcywgcHJvcGVydGllcywgYW5kIHNldHRpbmcgdXBcbiAqIGxpc3RlbmVycyBvbiBFbGVtZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJFbGVtZW50IGV4dGVuZHMgUk5vZGUge1xuICBzdHlsZTogUkNzc1N0eWxlRGVjbGFyYXRpb247XG4gIGNsYXNzTGlzdDogUkRvbVRva2VuTGlzdDtcbiAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gIHNldEF0dHJpYnV0ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xuICByZW1vdmVBdHRyaWJ1dGUobmFtZTogc3RyaW5nKTogdm9pZDtcbiAgc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJOiBzdHJpbmcsIHF1YWxpZmllZE5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG4gIGFkZEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lciwgdXNlQ2FwdHVyZT86IGJvb2xlYW4pOiB2b2lkO1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZywgbGlzdGVuZXI/OiBFdmVudExpc3RlbmVyLCBvcHRpb25zPzogYm9vbGVhbik6IHZvaWQ7XG5cbiAgc2V0UHJvcGVydHk/KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUkNzc1N0eWxlRGVjbGFyYXRpb24ge1xuICByZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IHN0cmluZztcbiAgc2V0UHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmd8bnVsbCwgcHJpb3JpdHk/OiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJEb21Ub2tlbkxpc3Qge1xuICBhZGQodG9rZW46IHN0cmluZyk6IHZvaWQ7XG4gIHJlbW92ZSh0b2tlbjogc3RyaW5nKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSVGV4dCBleHRlbmRzIFJOb2RlIHsgdGV4dENvbnRlbnQ6IHN0cmluZ3xudWxsOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgUkNvbW1lbnQgZXh0ZW5kcyBSTm9kZSB7IHRleHRDb250ZW50OiBzdHJpbmd8bnVsbDsgfVxuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19