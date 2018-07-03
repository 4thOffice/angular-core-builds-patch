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
import { ElementRef } from '../linker/element_ref';
import { QueryList } from '../linker/query_list';
import { asElementData, asProviderData, asQueryList } from './types';
import { declaredViewContainer, filterQueryId, isEmbeddedView } from './util';
/**
 * @param {?} flags
 * @param {?} id
 * @param {?} bindings
 * @return {?}
 */
export function queryDef(flags, id, bindings) {
    let /** @type {?} */ bindingDefs = [];
    for (let /** @type {?} */ propName in bindings) {
        const /** @type {?} */ bindingType = bindings[propName];
        bindingDefs.push({ propName, bindingType });
    }
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        // TODO(vicb): check
        checkIndex: -1, flags,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0,
        ngContentIndex: -1,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {},
        childCount: 0,
        bindings: [],
        bindingFlags: 0,
        outputs: [],
        element: null,
        provider: null,
        text: null,
        query: { id, filterId: filterQueryId(id), bindings: bindingDefs },
        ngContent: null
    };
}
/**
 * @return {?}
 */
export function createQuery() {
    return new QueryList();
}
/**
 * @param {?} view
 * @return {?}
 */
export function dirtyParentQueries(view) {
    const /** @type {?} */ queryIds = view.def.nodeMatchedQueries;
    while (view.parent && isEmbeddedView(view)) {
        let /** @type {?} */ tplDef = /** @type {?} */ ((view.parentNodeDef));
        view = view.parent;
        // content queries
        const /** @type {?} */ end = tplDef.nodeIndex + tplDef.childCount;
        for (let /** @type {?} */ i = 0; i <= end; i++) {
            const /** @type {?} */ nodeDef = view.def.nodes[i];
            if ((nodeDef.flags & 67108864 /* TypeContentQuery */) &&
                (nodeDef.flags & 536870912 /* DynamicQuery */) &&
                (/** @type {?} */ ((nodeDef.query)).filterId & queryIds) === /** @type {?} */ ((nodeDef.query)).filterId) {
                asQueryList(view, i).setDirty();
            }
            if ((nodeDef.flags & 1 /* TypeElement */ && i + nodeDef.childCount < tplDef.nodeIndex) ||
                !(nodeDef.childFlags & 67108864 /* TypeContentQuery */) ||
                !(nodeDef.childFlags & 536870912 /* DynamicQuery */)) {
                // skip elements that don't contain the template element or no query.
                i += nodeDef.childCount;
            }
        }
    }
    // view queries
    if (view.def.nodeFlags & 134217728 /* TypeViewQuery */) {
        for (let /** @type {?} */ i = 0; i < view.def.nodes.length; i++) {
            const /** @type {?} */ nodeDef = view.def.nodes[i];
            if ((nodeDef.flags & 134217728 /* TypeViewQuery */) && (nodeDef.flags & 536870912 /* DynamicQuery */)) {
                asQueryList(view, i).setDirty();
            }
            // only visit the root nodes
            i += nodeDef.childCount;
        }
    }
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @return {?}
 */
export function checkAndUpdateQuery(view, nodeDef) {
    const /** @type {?} */ queryList = asQueryList(view, nodeDef.nodeIndex);
    if (!queryList.dirty) {
        return;
    }
    let /** @type {?} */ directiveInstance;
    let /** @type {?} */ newValues = /** @type {?} */ ((undefined));
    if (nodeDef.flags & 67108864 /* TypeContentQuery */) {
        const /** @type {?} */ elementDef = /** @type {?} */ ((/** @type {?} */ ((nodeDef.parent)).parent));
        newValues = calcQueryValues(view, elementDef.nodeIndex, elementDef.nodeIndex + elementDef.childCount, /** @type {?} */ ((nodeDef.query)), []);
        directiveInstance = asProviderData(view, /** @type {?} */ ((nodeDef.parent)).nodeIndex).instance;
    }
    else if (nodeDef.flags & 134217728 /* TypeViewQuery */) {
        newValues = calcQueryValues(view, 0, view.def.nodes.length - 1, /** @type {?} */ ((nodeDef.query)), []);
        directiveInstance = view.component;
    }
    queryList.reset(newValues);
    const /** @type {?} */ bindings = /** @type {?} */ ((nodeDef.query)).bindings;
    let /** @type {?} */ notify = false;
    for (let /** @type {?} */ i = 0; i < bindings.length; i++) {
        const /** @type {?} */ binding = bindings[i];
        let /** @type {?} */ boundValue;
        switch (binding.bindingType) {
            case 0 /* First */:
                boundValue = queryList.first;
                break;
            case 1 /* All */:
                boundValue = queryList;
                notify = true;
                break;
        }
        directiveInstance[binding.propName] = boundValue;
    }
    if (notify) {
        queryList.notifyOnChanges();
    }
}
/**
 * @param {?} view
 * @param {?} startIndex
 * @param {?} endIndex
 * @param {?} queryDef
 * @param {?} values
 * @return {?}
 */
function calcQueryValues(view, startIndex, endIndex, queryDef, values) {
    for (let /** @type {?} */ i = startIndex; i <= endIndex; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        const /** @type {?} */ valueType = nodeDef.matchedQueries[queryDef.id];
        if (valueType != null) {
            values.push(getQueryValue(view, nodeDef, valueType));
        }
        if (nodeDef.flags & 1 /* TypeElement */ && /** @type {?} */ ((nodeDef.element)).template &&
            (/** @type {?} */ ((/** @type {?} */ ((nodeDef.element)).template)).nodeMatchedQueries & queryDef.filterId) ===
                queryDef.filterId) {
            const /** @type {?} */ elementData = asElementData(view, i);
            // check embedded views that were attached at the place of their template,
            // but process child nodes first if some match the query (see issue #16568)
            if ((nodeDef.childMatchedQueries & queryDef.filterId) === queryDef.filterId) {
                calcQueryValues(view, i + 1, i + nodeDef.childCount, queryDef, values);
                i += nodeDef.childCount;
            }
            if (nodeDef.flags & 16777216 /* EmbeddedViews */) {
                const /** @type {?} */ embeddedViews = /** @type {?} */ ((elementData.viewContainer))._embeddedViews;
                for (let /** @type {?} */ k = 0; k < embeddedViews.length; k++) {
                    const /** @type {?} */ embeddedView = embeddedViews[k];
                    const /** @type {?} */ dvc = declaredViewContainer(embeddedView);
                    if (dvc && dvc === elementData) {
                        calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryDef, values);
                    }
                }
            }
            const /** @type {?} */ projectedViews = elementData.template._projectedViews;
            if (projectedViews) {
                for (let /** @type {?} */ k = 0; k < projectedViews.length; k++) {
                    const /** @type {?} */ projectedView = projectedViews[k];
                    calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryDef, values);
                }
            }
        }
        if ((nodeDef.childMatchedQueries & queryDef.filterId) !== queryDef.filterId) {
            // if no child matches the query, skip the children.
            i += nodeDef.childCount;
        }
    }
    return values;
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} queryValueType
 * @return {?}
 */
export function getQueryValue(view, nodeDef, queryValueType) {
    if (queryValueType != null) {
        // a match
        switch (queryValueType) {
            case 1 /* RenderElement */:
                return asElementData(view, nodeDef.nodeIndex).renderElement;
            case 0 /* ElementRef */:
                return new ElementRef(asElementData(view, nodeDef.nodeIndex).renderElement);
            case 2 /* TemplateRef */:
                return asElementData(view, nodeDef.nodeIndex).template;
            case 3 /* ViewContainerRef */:
                return asElementData(view, nodeDef.nodeIndex).viewContainer;
            case 4 /* Provider */:
                return asProviderData(view, nodeDef.nodeIndex).instance;
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy92aWV3L3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUUvQyxPQUFPLEVBQTRGLGFBQWEsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzlKLE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBRTVFLE1BQU0sbUJBQ0YsS0FBZ0IsRUFBRSxFQUFVLEVBQUUsUUFBZ0Q7SUFDaEYscUJBQUksV0FBVyxHQUFzQixFQUFFLENBQUM7SUFDeEMsS0FBSyxxQkFBSSxRQUFRLElBQUksUUFBUSxFQUFFO1FBQzdCLHVCQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0tBQzNDO0lBRUQsT0FBTzs7UUFFTCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxFQUFFLElBQUk7UUFDWixZQUFZLEVBQUUsSUFBSTtRQUNsQixZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLFdBQVcsRUFBRSxDQUFDLENBQUM7OztRQUdmLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLO1FBQ3JCLFVBQVUsRUFBRSxDQUFDO1FBQ2IsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGNBQWMsRUFBRSxDQUFDLENBQUM7UUFDbEIsY0FBYyxFQUFFLEVBQUU7UUFDbEIsZUFBZSxFQUFFLENBQUM7UUFDbEIsVUFB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Q0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDekY7YUFDRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRTs7WUFFM0UsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUM7U0FDekI7S0FDRjtJQUNELE9BQU8sTUFBTSxDQUFDO0NBQ2Y7Ozs7Ozs7QUFFRCxNQUFNLHdCQUNGLElBQWMsRUFBRSxPQUFnQixFQUFFLGNBQThCO0lBQ2xFLElBQUksY0FBYyxJQUFJLElBQUksRUFBRTs7UUFFMUIsUUFBUSxjQUFjLEVBQUU7WUFDdEI7Z0JBQ0UsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFDOUQ7Z0JBQ0UsT0FBTyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5RTtnQkFDRSxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUN6RDtnQkFDRSxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUM5RDtnQkFDRSxPQUFPLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUMzRDtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSAnLi4vbGlua2VyL2VsZW1lbnRfcmVmJztcbmltcG9ydCB7UXVlcnlMaXN0fSBmcm9tICcuLi9saW5rZXIvcXVlcnlfbGlzdCc7XG5cbmltcG9ydCB7Tm9kZURlZiwgTm9kZUZsYWdzLCBRdWVyeUJpbmRpbmdEZWYsIFF1ZXJ5QmluZGluZ1R5cGUsIFF1ZXJ5RGVmLCBRdWVyeVZhbHVlVHlwZSwgVmlld0RhdGEsIGFzRWxlbWVudERhdGEsIGFzUHJvdmlkZXJEYXRhLCBhc1F1ZXJ5TGlzdH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge2RlY2xhcmVkVmlld0NvbnRhaW5lciwgZmlsdGVyUXVlcnlJZCwgaXNFbWJlZGRlZFZpZXd9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeURlZihcbiAgICBmbGFnczogTm9kZUZsYWdzLCBpZDogbnVtYmVyLCBiaW5kaW5nczoge1twcm9wTmFtZTogc3RyaW5nXTogUXVlcnlCaW5kaW5nVHlwZX0pOiBOb2RlRGVmIHtcbiAgbGV0IGJpbmRpbmdEZWZzOiBRdWVyeUJpbmRpbmdEZWZbXSA9IFtdO1xuICBmb3IgKGxldCBwcm9wTmFtZSBpbiBiaW5kaW5ncykge1xuICAgIGNvbnN0IGJpbmRpbmdUeXBlID0gYmluZGluZ3NbcHJvcE5hbWVdO1xuICAgIGJpbmRpbmdEZWZzLnB1c2goe3Byb3BOYW1lLCBiaW5kaW5nVHlwZX0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAvLyB3aWxsIGJldCBzZXQgYnkgdGhlIHZpZXcgZGVmaW5pdGlvblxuICAgIG5vZGVJbmRleDogLTEsXG4gICAgcGFyZW50OiBudWxsLFxuICAgIHJlbmRlclBhcmVudDogbnVsbCxcbiAgICBiaW5kaW5nSW5kZXg6IC0xLFxuICAgIG91dHB1dEluZGV4OiAtMSxcbiAgICAvLyByZWd1bGFyIHZhbHVlc1xuICAgIC8vIFRPRE8odmljYik6IGNoZWNrXG4gICAgY2hlY2tJbmRleDogLTEsIGZsYWdzLFxuICAgIGNoaWxkRmxhZ3M6IDAsXG4gICAgZGlyZWN0Q2hpbGRGbGFnczogMCxcbiAgICBjaGlsZE1hdGNoZWRRdWVyaWVzOiAwLFxuICAgIG5nQ29udGVudEluZGV4OiAtMSxcbiAgICBtYXRjaGVkUXVlcmllczoge30sXG4gICAgbWF0Y2hlZFF1ZXJ5SWRzOiAwLFxuICAgIHJlZmVyZW5jZXM6IHt9LFxuICAgIGNoaWxkQ291bnQ6IDAsXG4gICAgYmluZGluZ3M6IFtdLFxuICAgIGJpbmRpbmdGbGFnczogMCxcbiAgICBvdXRwdXRzOiBbXSxcbiAgICBlbGVtZW50OiBudWxsLFxuICAgIHByb3ZpZGVyOiBudWxsLFxuICAgIHRleHQ6IG51bGwsXG4gICAgcXVlcnk6IHtpZCwgZmlsdGVySWQ6IGZpbHRlclF1ZXJ5SWQoaWQpLCBiaW5kaW5nczogYmluZGluZ0RlZnN9LFxuICAgIG5nQ29udGVudDogbnVsbFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUXVlcnkoKTogUXVlcnlMaXN0PGFueT4ge1xuICByZXR1cm4gbmV3IFF1ZXJ5TGlzdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlydHlQYXJlbnRRdWVyaWVzKHZpZXc6IFZpZXdEYXRhKSB7XG4gIGNvbnN0IHF1ZXJ5SWRzID0gdmlldy5kZWYubm9kZU1hdGNoZWRRdWVyaWVzO1xuICB3aGlsZSAodmlldy5wYXJlbnQgJiYgaXNFbWJlZGRlZFZpZXcodmlldykpIHtcbiAgICBsZXQgdHBsRGVmID0gdmlldy5wYXJlbnROb2RlRGVmICE7XG4gICAgdmlldyA9IHZpZXcucGFyZW50O1xuICAgIC8vIGNvbnRlbnQgcXVlcmllc1xuICAgIGNvbnN0IGVuZCA9IHRwbERlZi5ub2RlSW5kZXggKyB0cGxEZWYuY2hpbGRDb3VudDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgY29uc3Qgbm9kZURlZiA9IHZpZXcuZGVmLm5vZGVzW2ldO1xuICAgICAgaWYgKChub2RlRGVmLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVDb250ZW50UXVlcnkpICYmXG4gICAgICAgICAgKG5vZGVEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuRHluYW1pY1F1ZXJ5KSAmJlxuICAgICAgICAgIChub2RlRGVmLnF1ZXJ5ICEuZmlsdGVySWQgJiBxdWVyeUlkcykgPT09IG5vZGVEZWYucXVlcnkgIS5maWx0ZXJJZCkge1xuICAgICAgICBhc1F1ZXJ5TGlzdCh2aWV3LCBpKS5zZXREaXJ0eSgpO1xuICAgICAgfVxuICAgICAgaWYgKChub2RlRGVmLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVFbGVtZW50ICYmIGkgKyBub2RlRGVmLmNoaWxkQ291bnQgPCB0cGxEZWYubm9kZUluZGV4KSB8fFxuICAgICAgICAgICEobm9kZURlZi5jaGlsZEZsYWdzICYgTm9kZUZsYWdzLlR5cGVDb250ZW50UXVlcnkpIHx8XG4gICAgICAgICAgIShub2RlRGVmLmNoaWxkRmxhZ3MgJiBOb2RlRmxhZ3MuRHluYW1pY1F1ZXJ5KSkge1xuICAgICAgICAvLyBza2lwIGVsZW1lbnRzIHRoYXQgZG9uJ3QgY29udGFpbiB0aGUgdGVtcGxhdGUgZWxlbWVudCBvciBubyBxdWVyeS5cbiAgICAgICAgaSArPSBub2RlRGVmLmNoaWxkQ291bnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gdmlldyBxdWVyaWVzXG4gIGlmICh2aWV3LmRlZi5ub2RlRmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZVZpZXdRdWVyeSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlldy5kZWYubm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IG5vZGVEZWYgPSB2aWV3LmRlZi5ub2Rlc1tpXTtcbiAgICAgIGlmICgobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlVmlld1F1ZXJ5KSAmJiAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5EeW5hbWljUXVlcnkpKSB7XG4gICAgICAgIGFzUXVlcnlMaXN0KHZpZXcsIGkpLnNldERpcnR5KCk7XG4gICAgICB9XG4gICAgICAvLyBvbmx5IHZpc2l0IHRoZSByb290IG5vZGVzXG4gICAgICBpICs9IG5vZGVEZWYuY2hpbGRDb3VudDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQW5kVXBkYXRlUXVlcnkodmlldzogVmlld0RhdGEsIG5vZGVEZWY6IE5vZGVEZWYpIHtcbiAgY29uc3QgcXVlcnlMaXN0ID0gYXNRdWVyeUxpc3Qodmlldywgbm9kZURlZi5ub2RlSW5kZXgpO1xuICBpZiAoIXF1ZXJ5TGlzdC5kaXJ0eSkge1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgZGlyZWN0aXZlSW5zdGFuY2U6IGFueTtcbiAgbGV0IG5ld1ZhbHVlczogYW55W10gPSB1bmRlZmluZWQgITtcbiAgaWYgKG5vZGVEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuVHlwZUNvbnRlbnRRdWVyeSkge1xuICAgIGNvbnN0IGVsZW1lbnREZWYgPSBub2RlRGVmLnBhcmVudCAhLnBhcmVudCAhO1xuICAgIG5ld1ZhbHVlcyA9IGNhbGNRdWVyeVZhbHVlcyhcbiAgICAgICAgdmlldywgZWxlbWVudERlZi5ub2RlSW5kZXgsIGVsZW1lbnREZWYubm9kZUluZGV4ICsgZWxlbWVudERlZi5jaGlsZENvdW50LCBub2RlRGVmLnF1ZXJ5ICEsXG4gICAgICAgIFtdKTtcbiAgICBkaXJlY3RpdmVJbnN0YW5jZSA9IGFzUHJvdmlkZXJEYXRhKHZpZXcsIG5vZGVEZWYucGFyZW50ICEubm9kZUluZGV4KS5pbnN0YW5jZTtcbiAgfSBlbHNlIGlmIChub2RlRGVmLmZsYWdzICYgTm9kZUZsYWdzLlR5cGVWaWV3UXVlcnkpIHtcbiAgICBuZXdWYWx1ZXMgPSBjYWxjUXVlcnlWYWx1ZXModmlldywgMCwgdmlldy5kZWYubm9kZXMubGVuZ3RoIC0gMSwgbm9kZURlZi5xdWVyeSAhLCBbXSk7XG4gICAgZGlyZWN0aXZlSW5zdGFuY2UgPSB2aWV3LmNvbXBvbmVudDtcbiAgfVxuICBxdWVyeUxpc3QucmVzZXQobmV3VmFsdWVzKTtcbiAgY29uc3QgYmluZGluZ3MgPSBub2RlRGVmLnF1ZXJ5ICEuYmluZGluZ3M7XG4gIGxldCBub3RpZnkgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5kaW5ncy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJpbmRpbmcgPSBiaW5kaW5nc1tpXTtcbiAgICBsZXQgYm91bmRWYWx1ZTogYW55O1xuICAgIHN3aXRjaCAoYmluZGluZy5iaW5kaW5nVHlwZSkge1xuICAgICAgY2FzZSBRdWVyeUJpbmRpbmdUeXBlLkZpcnN0OlxuICAgICAgICBib3VuZFZhbHVlID0gcXVlcnlMaXN0LmZpcnN0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUXVlcnlCaW5kaW5nVHlwZS5BbGw6XG4gICAgICAgIGJvdW5kVmFsdWUgPSBxdWVyeUxpc3Q7XG4gICAgICAgIG5vdGlmeSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkaXJlY3RpdmVJbnN0YW5jZVtiaW5kaW5nLnByb3BOYW1lXSA9IGJvdW5kVmFsdWU7XG4gIH1cbiAgaWYgKG5vdGlmeSkge1xuICAgIHF1ZXJ5TGlzdC5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxjUXVlcnlWYWx1ZXMoXG4gICAgdmlldzogVmlld0RhdGEsIHN0YXJ0SW5kZXg6IG51bWJlciwgZW5kSW5kZXg6IG51bWJlciwgcXVlcnlEZWY6IFF1ZXJ5RGVmLFxuICAgIHZhbHVlczogYW55W10pOiBhbnlbXSB7XG4gIGZvciAobGV0IGkgPSBzdGFydEluZGV4OyBpIDw9IGVuZEluZGV4OyBpKyspIHtcbiAgICBjb25zdCBub2RlRGVmID0gdmlldy5kZWYubm9kZXNbaV07XG4gICAgY29uc3QgdmFsdWVUeXBlID0gbm9kZURlZi5tYXRjaGVkUXVlcmllc1txdWVyeURlZi5pZF07XG4gICAgaWYgKHZhbHVlVHlwZSAhPSBudWxsKSB7XG4gICAgICB2YWx1ZXMucHVzaChnZXRRdWVyeVZhbHVlKHZpZXcsIG5vZGVEZWYsIHZhbHVlVHlwZSkpO1xuICAgIH1cbiAgICBpZiAobm9kZURlZi5mbGFncyAmIE5vZGVGbGFncy5UeXBlRWxlbWVudCAmJiBub2RlRGVmLmVsZW1lbnQgIS50ZW1wbGF0ZSAmJlxuICAgICAgICAobm9kZURlZi5lbGVtZW50ICEudGVtcGxhdGUgIS5ub2RlTWF0Y2hlZFF1ZXJpZXMgJiBxdWVyeURlZi5maWx0ZXJJZCkgPT09XG4gICAgICAgICAgICBxdWVyeURlZi5maWx0ZXJJZCkge1xuICAgICAgY29uc3QgZWxlbWVudERhdGEgPSBhc0VsZW1lbnREYXRhKHZpZXcsIGkpO1xuICAgICAgLy8gY2hlY2sgZW1iZWRkZWQgdmlld3MgdGhhdCB3ZXJlIGF0dGFjaGVkIGF0IHRoZSBwbGFjZSBvZiB0aGVpciB0ZW1wbGF0ZSxcbiAgICAgIC8vIGJ1dCBwcm9jZXNzIGNoaWxkIG5vZGVzIGZpcnN0IGlmIHNvbWUgbWF0Y2ggdGhlIHF1ZXJ5IChzZWUgaXNzdWUgIzE2NTY4KVxuICAgICAgaWYgKChub2RlRGVmLmNoaWxkTWF0Y2hlZFF1ZXJpZXMgJiBxdWVyeURlZi5maWx0ZXJJZCkgPT09IHF1ZXJ5RGVmLmZpbHRlcklkKSB7XG4gICAgICAgIGNhbGNRdWVyeVZhbHVlcyh2aWV3LCBpICsgMSwgaSArIG5vZGVEZWYuY2hpbGRDb3VudCwgcXVlcnlEZWYsIHZhbHVlcyk7XG4gICAgICAgIGkgKz0gbm9kZURlZi5jaGlsZENvdW50O1xuICAgICAgfVxuICAgICAgaWYgKG5vZGVEZWYuZmxhZ3MgJiBOb2RlRmxhZ3MuRW1iZWRkZWRWaWV3cykge1xuICAgICAgICBjb25zdCBlbWJlZGRlZFZpZXdzID0gZWxlbWVudERhdGEudmlld0NvbnRhaW5lciAhLl9lbWJlZGRlZFZpZXdzO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGVtYmVkZGVkVmlld3MubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBlbWJlZGRlZFZpZXcgPSBlbWJlZGRlZFZpZXdzW2tdO1xuICAgICAgICAgIGNvbnN0IGR2YyA9IGRlY2xhcmVkVmlld0NvbnRhaW5lcihlbWJlZGRlZFZpZXcpO1xuICAgICAgICAgIGlmIChkdmMgJiYgZHZjID09PSBlbGVtZW50RGF0YSkge1xuICAgICAgICAgICAgY2FsY1F1ZXJ5VmFsdWVzKGVtYmVkZGVkVmlldywgMCwgZW1iZWRkZWRWaWV3LmRlZi5ub2Rlcy5sZW5ndGggLSAxLCBxdWVyeURlZiwgdmFsdWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb2plY3RlZFZpZXdzID0gZWxlbWVudERhdGEudGVtcGxhdGUuX3Byb2plY3RlZFZpZXdzO1xuICAgICAgaWYgKHByb2plY3RlZFZpZXdzKSB7XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcHJvamVjdGVkVmlld3MubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICBjb25zdCBwcm9qZWN0ZWRWaWV3ID0gcHJvamVjdGVkVmlld3Nba107XG4gICAgICAgICAgY2FsY1F1ZXJ5VmFsdWVzKHByb2plY3RlZFZpZXcsIDAsIHByb2plY3RlZFZpZXcuZGVmLm5vZGVzLmxlbmd0aCAtIDEsIHF1ZXJ5RGVmLCB2YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgobm9kZURlZi5jaGlsZE1hdGNoZWRRdWVyaWVzICYgcXVlcnlEZWYuZmlsdGVySWQpICE9PSBxdWVyeURlZi5maWx0ZXJJZCkge1xuICAgICAgLy8gaWYgbm8gY2hpbGQgbWF0Y2hlcyB0aGUgcXVlcnksIHNraXAgdGhlIGNoaWxkcmVuLlxuICAgICAgaSArPSBub2RlRGVmLmNoaWxkQ291bnQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWVyeVZhbHVlKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBub2RlRGVmOiBOb2RlRGVmLCBxdWVyeVZhbHVlVHlwZTogUXVlcnlWYWx1ZVR5cGUpOiBhbnkge1xuICBpZiAocXVlcnlWYWx1ZVR5cGUgIT0gbnVsbCkge1xuICAgIC8vIGEgbWF0Y2hcbiAgICBzd2l0Y2ggKHF1ZXJ5VmFsdWVUeXBlKSB7XG4gICAgICBjYXNlIFF1ZXJ5VmFsdWVUeXBlLlJlbmRlckVsZW1lbnQ6XG4gICAgICAgIHJldHVybiBhc0VsZW1lbnREYXRhKHZpZXcsIG5vZGVEZWYubm9kZUluZGV4KS5yZW5kZXJFbGVtZW50O1xuICAgICAgY2FzZSBRdWVyeVZhbHVlVHlwZS5FbGVtZW50UmVmOlxuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnRSZWYoYXNFbGVtZW50RGF0YSh2aWV3LCBub2RlRGVmLm5vZGVJbmRleCkucmVuZGVyRWxlbWVudCk7XG4gICAgICBjYXNlIFF1ZXJ5VmFsdWVUeXBlLlRlbXBsYXRlUmVmOlxuICAgICAgICByZXR1cm4gYXNFbGVtZW50RGF0YSh2aWV3LCBub2RlRGVmLm5vZGVJbmRleCkudGVtcGxhdGU7XG4gICAgICBjYXNlIFF1ZXJ5VmFsdWVUeXBlLlZpZXdDb250YWluZXJSZWY6XG4gICAgICAgIHJldHVybiBhc0VsZW1lbnREYXRhKHZpZXcsIG5vZGVEZWYubm9kZUluZGV4KS52aWV3Q29udGFpbmVyO1xuICAgICAgY2FzZSBRdWVyeVZhbHVlVHlwZS5Qcm92aWRlcjpcbiAgICAgICAgcmV0dXJuIGFzUHJvdmlkZXJEYXRhKHZpZXcsIG5vZGVEZWYubm9kZUluZGV4KS5pbnN0YW5jZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==