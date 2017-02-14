/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef } from '../linker/element_ref';
import { QueryList } from '../linker/query_list';
import { createTemplateRef, createViewContainerRef } from './refs';
import { NodeFlags, NodeType, QueryBindingType, QueryValueType, asElementData, asProviderData, asQueryList } from './types';
import { declaredViewContainer, viewParentElIndex } from './util';
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
        type: NodeType.Query,
        // will bet set by the view definition
        index: undefined,
        reverseChildIndex: undefined,
        parent: undefined,
        childFlags: undefined,
        childMatchedQueries: undefined,
        bindingIndex: undefined,
        disposableIndex: undefined,
        // regular values
        flags,
        ngContentIndex: undefined,
        matchedQueries: {},
        childCount: 0,
        bindings: [],
        disposableCount: 0,
        element: undefined,
        provider: undefined,
        text: undefined,
        pureExpression: undefined,
        query: { id, bindings: bindingDefs },
        ngContent: undefined
    };
}
/**
 * @return {?}
 */
export function createQuery() {
    return new QueryList();
}
/**
 * @param {?} queryId
 * @param {?} view
 * @return {?}
 */
export function dirtyParentQuery(queryId, view) {
    let /** @type {?} */ elIndex = viewParentElIndex(view);
    view = view.parent;
    let /** @type {?} */ queryIdx;
    while (view) {
        if (elIndex != null) {
            const /** @type {?} */ elementDef = view.def.nodes[elIndex];
            queryIdx = elementDef.element.providerIndices[queryId];
            if (queryIdx != null) {
                break;
            }
        }
        elIndex = viewParentElIndex(view);
        view = view.parent;
    }
    if (!view) {
        throw new Error(`Illegal State: Tried to dirty parent query ${queryId} but the query could not be found!`);
    }
    asQueryList(view, queryIdx).setDirty();
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @return {?}
 */
export function checkAndUpdateQuery(view, nodeDef) {
    const /** @type {?} */ queryList = asQueryList(view, nodeDef.index);
    if (!queryList.dirty) {
        return;
    }
    const /** @type {?} */ queryId = nodeDef.query.id;
    const /** @type {?} */ providerDef = view.def.nodes[nodeDef.parent];
    const /** @type {?} */ providerData = asProviderData(view, providerDef.index);
    let /** @type {?} */ newValues;
    if (nodeDef.flags & NodeFlags.HasContentQuery) {
        const /** @type {?} */ elementDef = view.def.nodes[providerDef.parent];
        newValues = calcQueryValues(view, elementDef.index, elementDef.index + elementDef.childCount, queryId, []);
    }
    else if (nodeDef.flags & NodeFlags.HasViewQuery) {
        const /** @type {?} */ compView = providerData.componentView;
        newValues = calcQueryValues(compView, 0, compView.def.nodes.length - 1, queryId, []);
    }
    queryList.reset(newValues);
    let /** @type {?} */ boundValue;
    const /** @type {?} */ bindings = nodeDef.query.bindings;
    for (let /** @type {?} */ i = 0; i < bindings.length; i++) {
        const /** @type {?} */ binding = bindings[i];
        switch (binding.bindingType) {
            case QueryBindingType.First:
                boundValue = queryList.first;
                break;
            case QueryBindingType.All:
                boundValue = queryList;
                break;
        }
        providerData.instance[binding.propName] = boundValue;
    }
}
/**
 * @param {?} view
 * @param {?} startIndex
 * @param {?} endIndex
 * @param {?} queryId
 * @param {?} values
 * @return {?}
 */
function calcQueryValues(view, startIndex, endIndex, queryId, values) {
    const /** @type {?} */ len = view.def.nodes.length;
    for (let /** @type {?} */ i = startIndex; i <= endIndex; i++) {
        const /** @type {?} */ nodeDef = view.def.nodes[i];
        const /** @type {?} */ value = getQueryValue(view, nodeDef, queryId);
        if (value != null) {
            // a match
            values.push(value);
        }
        if (nodeDef.flags & NodeFlags.HasEmbeddedViews &&
            queryId in nodeDef.element.template.nodeMatchedQueries) {
            // check embedded views that were attached at the place of their template.
            const /** @type {?} */ elementData = asElementData(view, i);
            const /** @type {?} */ embeddedViews = elementData.embeddedViews;
            for (let /** @type {?} */ k = 0; k < embeddedViews.length; k++) {
                const /** @type {?} */ embeddedView = embeddedViews[k];
                const /** @type {?} */ dvc = declaredViewContainer(embeddedView);
                if (dvc && dvc === elementData) {
                    calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryId, values);
                }
            }
            const /** @type {?} */ projectedViews = elementData.projectedViews;
            if (projectedViews) {
                for (let /** @type {?} */ k = 0; k < projectedViews.length; k++) {
                    const /** @type {?} */ projectedView = projectedViews[k];
                    calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryId, values);
                }
            }
        }
        if (!(queryId in nodeDef.childMatchedQueries)) {
            // If don't check descendants, skip the children.
            // Or: no child matches the query, then skip the children as well.
            i += nodeDef.childCount;
        }
    }
    return values;
}
/**
 * @param {?} view
 * @param {?} nodeDef
 * @param {?} queryId
 * @return {?}
 */
export function getQueryValue(view, nodeDef, queryId) {
    const /** @type {?} */ queryValueType = (nodeDef.matchedQueries[queryId]);
    if (queryValueType != null) {
        // a match
        let /** @type {?} */ value;
        switch (queryValueType) {
            case QueryValueType.RenderElement:
                value = asElementData(view, nodeDef.index).renderElement;
                break;
            case QueryValueType.ElementRef:
                value = new ElementRef(asElementData(view, nodeDef.index).renderElement);
                break;
            case QueryValueType.TemplateRef:
                value = createTemplateRef(view, nodeDef);
                break;
            case QueryValueType.ViewContainerRef:
                value = createViewContainerRef(view, nodeDef.index);
                break;
            case QueryValueType.Provider:
                value = asProviderData(view, nodeDef.index).instance;
                break;
        }
        return value;
    }
}
//# sourceMappingURL=query.js.map