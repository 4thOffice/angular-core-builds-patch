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
/**
 * Used for tracking queries (e.g. ViewChild, ContentChild).
 * @record
 */
export function LQueries() { }
function LQueries_tsickle_Closure_declarations() {
    /**
     * Ask queries to prepare copy of itself. This assures that tracking new queries on child nodes
     * doesn't mutate list of queries tracked on a parent node. We will clone LQueries before
     * constructing content queries.
     * @type {?}
     */
    LQueries.prototype.clone;
    /**
     * Used to ask queries if those should be cloned to the child element.
     *
     * For example in the case of deep queries the `child()` returns
     * queries for the child node. In case of shallow queries it returns
     * `null`.
     * @type {?}
     */
    LQueries.prototype.child;
    /**
     * Notify `LQueries` that a new `LNode` has been created and needs to be added to query results
     * if matching query predicate.
     * @type {?}
     */
    LQueries.prototype.addNode;
    /**
     * Notify `LQueries` that a new LContainer was added to ivy data structures. As a result we need
     * to prepare room for views that might be inserted into this container.
     * @type {?}
     */
    LQueries.prototype.container;
    /**
     * Notify `LQueries` that a new `LView` has been created. As a result we need to prepare room
     * and collect nodes that match query predicate.
     * @type {?}
     */
    LQueries.prototype.createView;
    /**
     * Notify `LQueries` that a new `LView` has been added to `LContainer`. As a result all
     * the matching nodes from this view should be added to container's queries.
     * @type {?}
     */
    LQueries.prototype.insertView;
    /**
     * Notify `LQueries` that an `LView` has been removed from `LContainer`. As a result all
     * the matching nodes from this view should be removed from container's queries.
     * @type {?}
     */
    LQueries.prototype.removeView;
    /**
     * Add additional `QueryList` to track.
     *
     * \@param queryList `QueryList` to update with changes.
     * \@param predicate Either `Type` or selector array of [key, value] predicates.
     * \@param descend If true the query will recursively apply to the children.
     * \@param read Indicates which token should be read from DI for this query.
     * @type {?}
     */
    LQueries.prototype.track;
}
/**
 * @template T
 */
export class QueryReadType {
}
function QueryReadType_tsickle_Closure_declarations() {
    /** @type {?} */
    QueryReadType.prototype.defeatStructuralTyping;
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const /** @type {?} */ unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ludGVyZmFjZXMvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RUEsTUFBTTtDQUFnRTs7Ozs7OztBQUl0RSxNQUFNLENBQUMsdUJBQU0sNkJBQTZCLEdBQUcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnLi4vLi4vbGlua2VyJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge0xOb2RlfSBmcm9tICcuL25vZGUnO1xuXG4vKiogVXNlZCBmb3IgdHJhY2tpbmcgcXVlcmllcyAoZS5nLiBWaWV3Q2hpbGQsIENvbnRlbnRDaGlsZCkuICovXG5leHBvcnQgaW50ZXJmYWNlIExRdWVyaWVzIHtcbiAgLyoqXG4gICAqIEFzayBxdWVyaWVzIHRvIHByZXBhcmUgY29weSBvZiBpdHNlbGYuIFRoaXMgYXNzdXJlcyB0aGF0IHRyYWNraW5nIG5ldyBxdWVyaWVzIG9uIGNoaWxkIG5vZGVzXG4gICAqIGRvZXNuJ3QgbXV0YXRlIGxpc3Qgb2YgcXVlcmllcyB0cmFja2VkIG9uIGEgcGFyZW50IG5vZGUuIFdlIHdpbGwgY2xvbmUgTFF1ZXJpZXMgYmVmb3JlXG4gICAqIGNvbnN0cnVjdGluZyBjb250ZW50IHF1ZXJpZXMuXG4gICAqL1xuICBjbG9uZSgpOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGFzayBxdWVyaWVzIGlmIHRob3NlIHNob3VsZCBiZSBjbG9uZWQgdG8gdGhlIGNoaWxkIGVsZW1lbnQuXG4gICAqXG4gICAqIEZvciBleGFtcGxlIGluIHRoZSBjYXNlIG9mIGRlZXAgcXVlcmllcyB0aGUgYGNoaWxkKClgIHJldHVybnNcbiAgICogcXVlcmllcyBmb3IgdGhlIGNoaWxkIG5vZGUuIEluIGNhc2Ugb2Ygc2hhbGxvdyBxdWVyaWVzIGl0IHJldHVybnNcbiAgICogYG51bGxgLlxuICAgKi9cbiAgY2hpbGQoKTogTFF1ZXJpZXN8bnVsbDtcblxuICAvKipcbiAgICogTm90aWZ5IGBMUXVlcmllc2AgdGhhdCBhIG5ldyBgTE5vZGVgIGhhcyBiZWVuIGNyZWF0ZWQgYW5kIG5lZWRzIHRvIGJlIGFkZGVkIHRvIHF1ZXJ5IHJlc3VsdHNcbiAgICogaWYgbWF0Y2hpbmcgcXVlcnkgcHJlZGljYXRlLlxuICAgKi9cbiAgYWRkTm9kZShub2RlOiBMTm9kZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBgTFF1ZXJpZXNgIHRoYXQgYSBuZXcgTENvbnRhaW5lciB3YXMgYWRkZWQgdG8gaXZ5IGRhdGEgc3RydWN0dXJlcy4gQXMgYSByZXN1bHQgd2UgbmVlZFxuICAgKiB0byBwcmVwYXJlIHJvb20gZm9yIHZpZXdzIHRoYXQgbWlnaHQgYmUgaW5zZXJ0ZWQgaW50byB0aGlzIGNvbnRhaW5lci5cbiAgICovXG4gIGNvbnRhaW5lcigpOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgYExRdWVyaWVzYCB0aGF0IGEgbmV3IGBMVmlld2AgaGFzIGJlZW4gY3JlYXRlZC4gQXMgYSByZXN1bHQgd2UgbmVlZCB0byBwcmVwYXJlIHJvb21cbiAgICogYW5kIGNvbGxlY3Qgbm9kZXMgdGhhdCBtYXRjaCBxdWVyeSBwcmVkaWNhdGUuXG4gICAqL1xuICBjcmVhdGVWaWV3KCk6IExRdWVyaWVzfG51bGw7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBgTFF1ZXJpZXNgIHRoYXQgYSBuZXcgYExWaWV3YCBoYXMgYmVlbiBhZGRlZCB0byBgTENvbnRhaW5lcmAuIEFzIGEgcmVzdWx0IGFsbFxuICAgKiB0aGUgbWF0Y2hpbmcgbm9kZXMgZnJvbSB0aGlzIHZpZXcgc2hvdWxkIGJlIGFkZGVkIHRvIGNvbnRhaW5lcidzIHF1ZXJpZXMuXG4gICAqL1xuICBpbnNlcnRWaWV3KG5ld1ZpZXdJbmRleDogbnVtYmVyKTogdm9pZDtcblxuICAvKipcbiAgICogTm90aWZ5IGBMUXVlcmllc2AgdGhhdCBhbiBgTFZpZXdgIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSBgTENvbnRhaW5lcmAuIEFzIGEgcmVzdWx0IGFsbFxuICAgKiB0aGUgbWF0Y2hpbmcgbm9kZXMgZnJvbSB0aGlzIHZpZXcgc2hvdWxkIGJlIHJlbW92ZWQgZnJvbSBjb250YWluZXIncyBxdWVyaWVzLlxuICAgKi9cbiAgcmVtb3ZlVmlldygpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBZGQgYWRkaXRpb25hbCBgUXVlcnlMaXN0YCB0byB0cmFjay5cbiAgICpcbiAgICogQHBhcmFtIHF1ZXJ5TGlzdCBgUXVlcnlMaXN0YCB0byB1cGRhdGUgd2l0aCBjaGFuZ2VzLlxuICAgKiBAcGFyYW0gcHJlZGljYXRlIEVpdGhlciBgVHlwZWAgb3Igc2VsZWN0b3IgYXJyYXkgb2YgW2tleSwgdmFsdWVdIHByZWRpY2F0ZXMuXG4gICAqIEBwYXJhbSBkZXNjZW5kIElmIHRydWUgdGhlIHF1ZXJ5IHdpbGwgcmVjdXJzaXZlbHkgYXBwbHkgdG8gdGhlIGNoaWxkcmVuLlxuICAgKiBAcGFyYW0gcmVhZCBJbmRpY2F0ZXMgd2hpY2ggdG9rZW4gc2hvdWxkIGJlIHJlYWQgZnJvbSBESSBmb3IgdGhpcyBxdWVyeS5cbiAgICovXG4gIHRyYWNrPFQ+KFxuICAgICAgcXVlcnlMaXN0OiBRdWVyeUxpc3Q8VD4sIHByZWRpY2F0ZTogVHlwZTxhbnk+fHN0cmluZ1tdLCBkZXNjZW5kPzogYm9vbGVhbixcbiAgICAgIHJlYWQ/OiBRdWVyeVJlYWRUeXBlPFQ+fFR5cGU8VD4pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUXVlcnlSZWFkVHlwZTxUPiB7IHByaXZhdGUgZGVmZWF0U3RydWN0dXJhbFR5cGluZzogYW55OyB9XG5cbi8vIE5vdGU6IFRoaXMgaGFjayBpcyBuZWNlc3Nhcnkgc28gd2UgZG9uJ3QgZXJyb25lb3VzbHkgZ2V0IGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuLy8gZmFpbHVyZSBiYXNlZCBvbiB0eXBlcy5cbmV4cG9ydCBjb25zdCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCA9IDE7XG4iXX0=