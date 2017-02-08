/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { dirtyParentQuery } from './query';
import { RenderNodeAction, declaredViewContainer, renderNode, rootRenderNodes, visitRootRenderNodes } from './util';
/**
 * @param {?} elementData
 * @param {?} viewIndex
 * @param {?} view
 * @return {?}
 */
export function attachEmbeddedView(elementData, viewIndex, view) {
    var /** @type {?} */ embeddedViews = elementData.embeddedViews;
    if (viewIndex == null) {
        viewIndex = embeddedViews.length;
    }
    addToArray(embeddedViews, viewIndex, view);
    var /** @type {?} */ dvcElementData = declaredViewContainer(view);
    if (dvcElementData && dvcElementData !== elementData) {
        var /** @type {?} */ projectedViews = dvcElementData.projectedViews;
        if (!projectedViews) {
            projectedViews = dvcElementData.projectedViews = [];
        }
        projectedViews.push(view);
    }
    for (var queryId in view.def.nodeMatchedQueries) {
        dirtyParentQuery(queryId, view);
    }
    var /** @type {?} */ prevView = viewIndex > 0 ? embeddedViews[viewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
}
/**
 * @param {?} elementData
 * @param {?} viewIndex
 * @return {?}
 */
export function detachEmbeddedView(elementData, viewIndex) {
    var /** @type {?} */ embeddedViews = elementData.embeddedViews;
    if (viewIndex == null) {
        viewIndex = embeddedViews.length;
    }
    var /** @type {?} */ view = embeddedViews[viewIndex];
    removeFromArray(embeddedViews, viewIndex);
    var /** @type {?} */ dvcElementData = declaredViewContainer(view);
    if (dvcElementData && dvcElementData !== elementData) {
        var /** @type {?} */ projectedViews = dvcElementData.projectedViews;
        removeFromArray(projectedViews, projectedViews.indexOf(view));
    }
    for (var queryId in view.def.nodeMatchedQueries) {
        dirtyParentQuery(queryId, view);
    }
    renderDetachEmbeddedView(elementData, view);
    return view;
}
/**
 * @param {?} elementData
 * @param {?} oldViewIndex
 * @param {?} newViewIndex
 * @return {?}
 */
export function moveEmbeddedView(elementData, oldViewIndex, newViewIndex) {
    var /** @type {?} */ embeddedViews = elementData.embeddedViews;
    var /** @type {?} */ view = embeddedViews[oldViewIndex];
    removeFromArray(embeddedViews, oldViewIndex);
    if (newViewIndex == null) {
        newViewIndex = embeddedViews.length;
    }
    addToArray(embeddedViews, newViewIndex, view);
    // Note: Don't need to change projectedViews as the order in there
    // as always invalid...
    for (var queryId in view.def.nodeMatchedQueries) {
        dirtyParentQuery(queryId, view);
    }
    renderDetachEmbeddedView(elementData, view);
    var /** @type {?} */ prevView = newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null;
    renderAttachEmbeddedView(elementData, prevView, view);
    return view;
}
/**
 * @param {?} elementData
 * @param {?} prevView
 * @param {?} view
 * @return {?}
 */
function renderAttachEmbeddedView(elementData, prevView, view) {
    var /** @type {?} */ prevRenderNode = prevView ? renderNode(prevView, prevView.def.lastRootNode) : elementData.renderElement;
    if (view.renderer) {
        view.renderer.attachViewAfter(prevRenderNode, rootRenderNodes(view));
    }
    else {
        var /** @type {?} */ parentNode = prevRenderNode.parentNode;
        var /** @type {?} */ nextSibling = prevRenderNode.nextSibling;
        if (parentNode) {
            var /** @type {?} */ action = nextSibling ? RenderNodeAction.InsertBefore : RenderNodeAction.AppendChild;
            visitRootRenderNodes(view, action, parentNode, nextSibling, undefined);
        }
    }
}
/**
 * @param {?} elementData
 * @param {?} view
 * @return {?}
 */
function renderDetachEmbeddedView(elementData, view) {
    if (view.renderer) {
        view.renderer.detachView(rootRenderNodes(view));
    }
    else {
        var /** @type {?} */ parentNode = elementData.renderElement.parentNode;
        if (parentNode) {
            visitRootRenderNodes(view, RenderNodeAction.RemoveChild, parentNode, null, undefined);
        }
    }
}
/**
 * @param {?} arr
 * @param {?} index
 * @param {?} value
 * @return {?}
 */
function addToArray(arr, index, value) {
    // perf: array.push is faster than array.splice!
    if (index >= arr.length) {
        arr.push(value);
    }
    else {
        arr.splice(index, 0, value);
    }
}
/**
 * @param {?} arr
 * @param {?} index
 * @return {?}
 */
function removeFromArray(arr, index) {
    // perf: array.pop is faster than array.splice!
    if (index >= arr.length - 1) {
        arr.pop();
    }
    else {
        arr.splice(index, 1);
    }
}
//# sourceMappingURL=view_attach.js.map