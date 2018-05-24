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
/** @enum {number} */
const RendererStyleFlags3 = {
    Important: 1,
    DashCase: 2,
};
export { RendererStyleFlags3 };
RendererStyleFlags3[RendererStyleFlags3.Important] = "Important";
RendererStyleFlags3[RendererStyleFlags3.DashCase] = "DashCase";
/**
 * Object Oriented style of API needed to create elements and text nodes.
 *
 * This is the native browser API style, e.g. operations are methods on individual objects
 * like HTMLElement. With this style, no additional code is needed as a facade
 * (reducing payload size).
 *
 * @record
 */
export function ObjectOrientedRenderer3() { }
function ObjectOrientedRenderer3_tsickle_Closure_declarations() {
    /** @type {?} */
    ObjectOrientedRenderer3.prototype.createElement;
    /** @type {?} */
    ObjectOrientedRenderer3.prototype.createTextNode;
    /** @type {?} */
    ObjectOrientedRenderer3.prototype.querySelector;
}
/**
 * Returns whether the `renderer` is a `ProceduralRenderer3`
 * @param {?} renderer
 * @return {?}
 */
export function isProceduralRenderer(renderer) {
    return !!((/** @type {?} */ (renderer)).listen);
}
/**
 * Procedural style of API needed to create elements and text nodes.
 *
 * In non-native browser environments (e.g. platforms such as web-workers), this is the
 * facade that enables element manipulation. This also facilitates backwards compatibility
 * with Renderer2.
 * @record
 */
export function ProceduralRenderer3() { }
function ProceduralRenderer3_tsickle_Closure_declarations() {
    /** @type {?} */
    ProceduralRenderer3.prototype.destroy;
    /** @type {?} */
    ProceduralRenderer3.prototype.createElement;
    /** @type {?} */
    ProceduralRenderer3.prototype.createText;
    /**
     * This property is allowed to be null / undefined,
     * in which case the view engine won't call it.
     * This is used as a performance optimization for production mode.
     * @type {?|undefined}
     */
    ProceduralRenderer3.prototype.destroyNode;
    /** @type {?} */
    ProceduralRenderer3.prototype.appendChild;
    /** @type {?} */
    ProceduralRenderer3.prototype.insertBefore;
    /** @type {?} */
    ProceduralRenderer3.prototype.removeChild;
    /** @type {?} */
    ProceduralRenderer3.prototype.selectRootElement;
    /** @type {?} */
    ProceduralRenderer3.prototype.setAttribute;
    /** @type {?} */
    ProceduralRenderer3.prototype.removeAttribute;
    /** @type {?} */
    ProceduralRenderer3.prototype.addClass;
    /** @type {?} */
    ProceduralRenderer3.prototype.removeClass;
    /** @type {?} */
    ProceduralRenderer3.prototype.setStyle;
    /** @type {?} */
    ProceduralRenderer3.prototype.removeStyle;
    /** @type {?} */
    ProceduralRenderer3.prototype.setProperty;
    /** @type {?} */
    ProceduralRenderer3.prototype.setValue;
    /** @type {?} */
    ProceduralRenderer3.prototype.listen;
}
/**
 * @record
 */
export function RendererFactory3() { }
function RendererFactory3_tsickle_Closure_declarations() {
    /** @type {?} */
    RendererFactory3.prototype.createRenderer;
    /** @type {?|undefined} */
    RendererFactory3.prototype.begin;
    /** @type {?|undefined} */
    RendererFactory3.prototype.end;
}
export const /** @type {?} */ domRendererFactory3 = {
    createRenderer: (hostElement, rendererType) => { return document; }
};
/**
 * Subset of API needed for appending elements and text nodes.
 * @record
 */
export function RNode() { }
function RNode_tsickle_Closure_declarations() {
    /** @type {?} */
    RNode.prototype.removeChild;
    /**
     * Insert a child node.
     *
     * Used exclusively for adding View root nodes into ViewAnchor location.
     * @type {?}
     */
    RNode.prototype.insertBefore;
    /**
     * Append a child node.
     *
     * Used exclusively for building up DOM which are static (ie not View roots)
     * @type {?}
     */
    RNode.prototype.appendChild;
}
/**
 * Subset of API needed for writing attributes, properties, and setting up
 * listeners on Element.
 * @record
 */
export function RElement() { }
function RElement_tsickle_Closure_declarations() {
    /** @type {?} */
    RElement.prototype.style;
    /** @type {?} */
    RElement.prototype.classList;
    /** @type {?} */
    RElement.prototype.className;
    /** @type {?} */
    RElement.prototype.setAttribute;
    /** @type {?} */
    RElement.prototype.removeAttribute;
    /** @type {?} */
    RElement.prototype.setAttributeNS;
    /** @type {?} */
    RElement.prototype.addEventListener;
    /** @type {?} */
    RElement.prototype.removeEventListener;
    /** @type {?|undefined} */
    RElement.prototype.setProperty;
}
/**
 * @record
 */
export function RCssStyleDeclaration() { }
function RCssStyleDeclaration_tsickle_Closure_declarations() {
    /** @type {?} */
    RCssStyleDeclaration.prototype.removeProperty;
    /** @type {?} */
    RCssStyleDeclaration.prototype.setProperty;
}
/**
 * @record
 */
export function RDomTokenList() { }
function RDomTokenList_tsickle_Closure_declarations() {
    /** @type {?} */
    RDomTokenList.prototype.add;
    /** @type {?} */
    RDomTokenList.prototype.remove;
}
/**
 * @record
 */
export function RText() { }
function RText_tsickle_Closure_declarations() {
    /** @type {?} */
    RText.prototype.textContent;
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const /** @type {?} */ unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNENBLE1BQU0sK0JBQStCLFFBQXVEO0lBRTFGLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUJBQUMsUUFBZSxFQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDRCxNQUFNLENBQUMsdUJBQU0sbUJBQW1CLEdBQXFCO0lBQ25ELGNBQWMsRUFBRSxDQUFDLFdBQTRCLEVBQUUsWUFBa0MsRUFDbkQsRUFBRSxHQUFHLE9BQU8sUUFBUSxDQUFDLEVBQUM7Q0FDckQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvREYsTUFBTSxDQUFDLHVCQUFNLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBUaGUgZ29hbCBoZXJlIGlzIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBicm93c2VyIERPTSBBUEkgaXMgdGhlIFJlbmRlcmVyLlxuICogV2UgZG8gdGhpcyBieSBkZWZpbmluZyBhIHN1YnNldCBvZiBET00gQVBJIHRvIGJlIHRoZSByZW5kZXJlciBhbmQgdGhhblxuICogdXNlIHRoYXQgdGltZSBmb3IgcmVuZGVyaW5nLlxuICpcbiAqIEF0IHJ1bnRpbWUgd2UgY2FuIHRoYW4gdXNlIHRoZSBET00gYXBpIGRpcmVjdGx5LCBpbiBzZXJ2ZXIgb3Igd2ViLXdvcmtlclxuICogaXQgd2lsbCBiZSBlYXN5IHRvIGltcGxlbWVudCBzdWNoIEFQSS5cbiAqL1xuXG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi8uLi9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7UmVuZGVyZXJTdHlsZUZsYWdzMiwgUmVuZGVyZXJUeXBlMn0gZnJvbSAnLi4vLi4vcmVuZGVyL2FwaSc7XG5cblxuLy8gVE9ETzogY2xlYW51cCBvbmNlIHRoZSBjb2RlIGlzIG1lcmdlZCBpbiBhbmd1bGFyL2FuZ3VsYXJcbmV4cG9ydCBlbnVtIFJlbmRlcmVyU3R5bGVGbGFnczMge1xuICBJbXBvcnRhbnQgPSAxIDw8IDAsXG4gIERhc2hDYXNlID0gMSA8PCAxXG59XG5cbmV4cG9ydCB0eXBlIFJlbmRlcmVyMyA9IE9iamVjdE9yaWVudGVkUmVuZGVyZXIzIHwgUHJvY2VkdXJhbFJlbmRlcmVyMztcblxuLyoqXG4gKiBPYmplY3QgT3JpZW50ZWQgc3R5bGUgb2YgQVBJIG5lZWRlZCB0byBjcmVhdGUgZWxlbWVudHMgYW5kIHRleHQgbm9kZXMuXG4gKlxuICogVGhpcyBpcyB0aGUgbmF0aXZlIGJyb3dzZXIgQVBJIHN0eWxlLCBlLmcuIG9wZXJhdGlvbnMgYXJlIG1ldGhvZHMgb24gaW5kaXZpZHVhbCBvYmplY3RzXG4gKiBsaWtlIEhUTUxFbGVtZW50LiBXaXRoIHRoaXMgc3R5bGUsIG5vIGFkZGl0aW9uYWwgY29kZSBpcyBuZWVkZWQgYXMgYSBmYWNhZGVcbiAqIChyZWR1Y2luZyBwYXlsb2FkIHNpemUpLlxuICogKi9cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0T3JpZW50ZWRSZW5kZXJlcjMge1xuICBjcmVhdGVFbGVtZW50KHRhZ05hbWU6IHN0cmluZyk6IFJFbGVtZW50O1xuICBjcmVhdGVUZXh0Tm9kZShkYXRhOiBzdHJpbmcpOiBSVGV4dDtcblxuICBxdWVyeVNlbGVjdG9yKHNlbGVjdG9yczogc3RyaW5nKTogUkVsZW1lbnR8bnVsbDtcbn1cblxuLyoqIFJldHVybnMgd2hldGhlciB0aGUgYHJlbmRlcmVyYCBpcyBhIGBQcm9jZWR1cmFsUmVuZGVyZXIzYCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvY2VkdXJhbFJlbmRlcmVyKHJlbmRlcmVyOiBQcm9jZWR1cmFsUmVuZGVyZXIzIHwgT2JqZWN0T3JpZW50ZWRSZW5kZXJlcjMpOlxuICAgIHJlbmRlcmVyIGlzIFByb2NlZHVyYWxSZW5kZXJlcjMge1xuICByZXR1cm4gISEoKHJlbmRlcmVyIGFzIGFueSkubGlzdGVuKTtcbn1cblxuLyoqXG4gKiBQcm9jZWR1cmFsIHN0eWxlIG9mIEFQSSBuZWVkZWQgdG8gY3JlYXRlIGVsZW1lbnRzIGFuZCB0ZXh0IG5vZGVzLlxuICpcbiAqIEluIG5vbi1uYXRpdmUgYnJvd3NlciBlbnZpcm9ubWVudHMgKGUuZy4gcGxhdGZvcm1zIHN1Y2ggYXMgd2ViLXdvcmtlcnMpLCB0aGlzIGlzIHRoZVxuICogZmFjYWRlIHRoYXQgZW5hYmxlcyBlbGVtZW50IG1hbmlwdWxhdGlvbi4gVGhpcyBhbHNvIGZhY2lsaXRhdGVzIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gKiB3aXRoIFJlbmRlcmVyMi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9jZWR1cmFsUmVuZGVyZXIzIHtcbiAgZGVzdHJveSgpOiB2b2lkO1xuICBjcmVhdGVFbGVtZW50KG5hbWU6IHN0cmluZywgbmFtZXNwYWNlPzogc3RyaW5nfG51bGwpOiBSRWxlbWVudDtcbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKTogUlRleHQ7XG4gIC8qKlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGFsbG93ZWQgdG8gYmUgbnVsbCAvIHVuZGVmaW5lZCxcbiAgICogaW4gd2hpY2ggY2FzZSB0aGUgdmlldyBlbmdpbmUgd29uJ3QgY2FsbCBpdC5cbiAgICogVGhpcyBpcyB1c2VkIGFzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIGZvciBwcm9kdWN0aW9uIG1vZGUuXG4gICAqL1xuICBkZXN0cm95Tm9kZT86ICgobm9kZTogUk5vZGUpID0+IHZvaWQpfG51bGw7XG4gIGFwcGVuZENoaWxkKHBhcmVudDogUkVsZW1lbnQsIG5ld0NoaWxkOiBSTm9kZSk6IHZvaWQ7XG4gIGluc2VydEJlZm9yZShwYXJlbnQ6IFJOb2RlLCBuZXdDaGlsZDogUk5vZGUsIHJlZkNoaWxkOiBSTm9kZXxudWxsKTogdm9pZDtcbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBSRWxlbWVudCwgb2xkQ2hpbGQ6IFJOb2RlKTogdm9pZDtcbiAgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnkpOiBSRWxlbWVudDtcblxuICBzZXRBdHRyaWJ1dGUoZWw6IFJFbGVtZW50LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcbiAgcmVtb3ZlQXR0cmlidXRlKGVsOiBSRWxlbWVudCwgbmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbCk6IHZvaWQ7XG4gIGFkZENsYXNzKGVsOiBSRWxlbWVudCwgbmFtZTogc3RyaW5nKTogdm9pZDtcbiAgcmVtb3ZlQ2xhc3MoZWw6IFJFbGVtZW50LCBuYW1lOiBzdHJpbmcpOiB2b2lkO1xuICBzZXRTdHlsZShcbiAgICAgIGVsOiBSRWxlbWVudCwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSxcbiAgICAgIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnxSZW5kZXJlclN0eWxlRmxhZ3MzKTogdm9pZDtcbiAgcmVtb3ZlU3R5bGUoZWw6IFJFbGVtZW50LCBzdHlsZTogc3RyaW5nLCBmbGFncz86IFJlbmRlcmVyU3R5bGVGbGFnczJ8UmVuZGVyZXJTdHlsZUZsYWdzMyk6IHZvaWQ7XG4gIHNldFByb3BlcnR5KGVsOiBSRWxlbWVudCwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcbiAgc2V0VmFsdWUobm9kZTogUlRleHQsIHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8vIFRPRE8obWlza28pOiBEZXByZWNhdGUgaW4gZmF2b3Igb2YgYWRkRXZlbnRMaXN0ZW5lci9yZW1vdmVFdmVudExpc3RlbmVyXG4gIGxpc3Rlbih0YXJnZXQ6IFJOb2RlLCBldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuIHwgdm9pZCk6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyZXJGYWN0b3J5MyB7XG4gIGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBSRWxlbWVudHxudWxsLCByZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMztcbiAgYmVnaW4/KCk6IHZvaWQ7XG4gIGVuZD8oKTogdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IGRvbVJlbmRlcmVyRmFjdG9yeTM6IFJlbmRlcmVyRmFjdG9yeTMgPSB7XG4gIGNyZWF0ZVJlbmRlcmVyOiAoaG9zdEVsZW1lbnQ6IFJFbGVtZW50IHwgbnVsbCwgcmVuZGVyZXJUeXBlOiBSZW5kZXJlclR5cGUyIHwgbnVsbCk6XG4gICAgICAgICAgICAgICAgICAgICAgUmVuZGVyZXIzID0+IHsgcmV0dXJuIGRvY3VtZW50O31cbn07XG5cbi8qKiBTdWJzZXQgb2YgQVBJIG5lZWRlZCBmb3IgYXBwZW5kaW5nIGVsZW1lbnRzIGFuZCB0ZXh0IG5vZGVzLiAqL1xuZXhwb3J0IGludGVyZmFjZSBSTm9kZSB7XG4gIHJlbW92ZUNoaWxkKG9sZENoaWxkOiBSTm9kZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEluc2VydCBhIGNoaWxkIG5vZGUuXG4gICAqXG4gICAqIFVzZWQgZXhjbHVzaXZlbHkgZm9yIGFkZGluZyBWaWV3IHJvb3Qgbm9kZXMgaW50byBWaWV3QW5jaG9yIGxvY2F0aW9uLlxuICAgKi9cbiAgaW5zZXJ0QmVmb3JlKG5ld0NoaWxkOiBSTm9kZSwgcmVmQ2hpbGQ6IFJOb2RlfG51bGwsIGlzVmlld1Jvb3Q6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBcHBlbmQgYSBjaGlsZCBub2RlLlxuICAgKlxuICAgKiBVc2VkIGV4Y2x1c2l2ZWx5IGZvciBidWlsZGluZyB1cCBET00gd2hpY2ggYXJlIHN0YXRpYyAoaWUgbm90IFZpZXcgcm9vdHMpXG4gICAqL1xuICBhcHBlbmRDaGlsZChuZXdDaGlsZDogUk5vZGUpOiBSTm9kZTtcbn1cblxuLyoqXG4gKiBTdWJzZXQgb2YgQVBJIG5lZWRlZCBmb3Igd3JpdGluZyBhdHRyaWJ1dGVzLCBwcm9wZXJ0aWVzLCBhbmQgc2V0dGluZyB1cFxuICogbGlzdGVuZXJzIG9uIEVsZW1lbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUkVsZW1lbnQgZXh0ZW5kcyBSTm9kZSB7XG4gIHN0eWxlOiBSQ3NzU3R5bGVEZWNsYXJhdGlvbjtcbiAgY2xhc3NMaXN0OiBSRG9tVG9rZW5MaXN0O1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgc2V0QXR0cmlidXRlKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQ7XG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lOiBzdHJpbmcpOiB2b2lkO1xuICBzZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkk6IHN0cmluZywgcXVhbGlmaWVkTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBFdmVudExpc3RlbmVyLCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nLCBsaXN0ZW5lcj86IEV2ZW50TGlzdGVuZXIsIG9wdGlvbnM/OiBib29sZWFuKTogdm9pZDtcblxuICBzZXRQcm9wZXJ0eT8obmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSQ3NzU3R5bGVEZWNsYXJhdGlvbiB7XG4gIHJlbW92ZVByb3BlcnR5KHByb3BlcnR5TmFtZTogc3RyaW5nKTogc3RyaW5nO1xuICBzZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xudWxsLCBwcmlvcml0eT86IHN0cmluZyk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUkRvbVRva2VuTGlzdCB7XG4gIGFkZCh0b2tlbjogc3RyaW5nKTogdm9pZDtcbiAgcmVtb3ZlKHRva2VuOiBzdHJpbmcpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJUZXh0IGV4dGVuZHMgUk5vZGUgeyB0ZXh0Q29udGVudDogc3RyaW5nfG51bGw7IH1cblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcbiJdfQ==