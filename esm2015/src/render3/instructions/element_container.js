/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/render3/instructions/element_container.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDataInRange, assertEqual } from '../../util/assert';
import { assertHasParent } from '../assert';
import { attachPatchData } from '../context_discovery';
import { registerPostOrderHooks } from '../hooks';
import { isContentQueryHost, isDirectiveHost } from '../interfaces/type_checks';
import { HEADER_OFFSET, RENDERER, TVIEW, T_HOST } from '../interfaces/view';
import { assertNodeType } from '../node_assert';
import { appendChild } from '../node_manipulation';
import { getBindingIndex, getIsParent, getLView, getPreviousOrParentTNode, setIsNotParent, setPreviousOrParentTNode } from '../state';
import { getConstant } from '../util/view_utils';
import { createDirectivesInstances, executeContentQueries, getOrCreateTNode, resolveDirectives, saveResolvedLocalsInData } from './shared';
import { registerInitialStylingOnTNode } from './styling';
/**
 * @param {?} index
 * @param {?} tView
 * @param {?} lView
 * @param {?=} attrsIndex
 * @param {?=} localRefsIndex
 * @return {?}
 */
function elementContainerStartFirstCreatePass(index, tView, lView, attrsIndex, localRefsIndex) {
    ngDevMode && ngDevMode.firstCreatePass++;
    /** @type {?} */
    const tViewConsts = tView.consts;
    /** @type {?} */
    const attrs = getConstant(tViewConsts, attrsIndex);
    /** @type {?} */
    const tNode = getOrCreateTNode(tView, lView[T_HOST], index, 4 /* ElementContainer */, 'ng-container', attrs);
    // While ng-container doesn't necessarily support styling, we use the style context to identify
    // and execute directives on the ng-container.
    if (attrs !== null) {
        registerInitialStylingOnTNode(tNode, attrs, 0);
    }
    /** @type {?} */
    const localRefs = getConstant(tViewConsts, localRefsIndex);
    resolveDirectives(tView, lView, tNode, localRefs);
    if (tView.queries !== null) {
        tView.queries.elementStart(tView, tNode);
    }
    return tNode;
}
/**
 * Creates a logical container for other nodes (<ng-container>) backed by a comment node in the DOM.
 * The instruction must later be followed by `elementContainerEnd()` call.
 *
 * \@codeGenApi
 * @param {?} index Index of the element in the LView array
 * @param {?=} attrsIndex Index of the container attributes in the `consts` array.
 * @param {?=} localRefsIndex Index of the container's local references in the `consts` array.
 *
 * Even if this instruction accepts a set of attributes no actual attribute values are propagated to
 * the DOM (as a comment node can't have attributes). Attributes are here only for directive
 * matching purposes and setting initial inputs of directives.
 *
 * @return {?}
 */
export function ɵɵelementContainerStart(index, attrsIndex, localRefsIndex) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const tView = lView[TVIEW];
    /** @type {?} */
    const adjustedIndex = index + HEADER_OFFSET;
    ngDevMode && assertDataInRange(lView, adjustedIndex);
    ngDevMode && assertEqual(getBindingIndex(), tView.bindingStartIndex, 'element containers should be created before any bindings');
    /** @type {?} */
    const tNode = tView.firstCreatePass ?
        elementContainerStartFirstCreatePass(index, tView, lView, attrsIndex, localRefsIndex) :
        (/** @type {?} */ (tView.data[adjustedIndex]));
    setPreviousOrParentTNode(tNode, true);
    ngDevMode && ngDevMode.rendererCreateComment++;
    /** @type {?} */
    const native = lView[adjustedIndex] =
        lView[RENDERER].createComment(ngDevMode ? 'ng-container' : '');
    appendChild(native, tNode, lView);
    attachPatchData(native, lView);
    if (isDirectiveHost(tNode)) {
        createDirectivesInstances(tView, lView, tNode);
        executeContentQueries(tView, tNode, lView);
    }
    if (localRefsIndex != null) {
        saveResolvedLocalsInData(lView, tNode);
    }
}
/**
 * Mark the end of the <ng-container>.
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵelementContainerEnd() {
    /** @type {?} */
    let previousOrParentTNode = getPreviousOrParentTNode();
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const tView = lView[TVIEW];
    if (getIsParent()) {
        setIsNotParent();
    }
    else {
        ngDevMode && assertHasParent(previousOrParentTNode);
        previousOrParentTNode = (/** @type {?} */ (previousOrParentTNode.parent));
        setPreviousOrParentTNode(previousOrParentTNode, false);
    }
    ngDevMode && assertNodeType(previousOrParentTNode, 4 /* ElementContainer */);
    if (tView.firstCreatePass) {
        registerPostOrderHooks(tView, previousOrParentTNode);
        if (isContentQueryHost(previousOrParentTNode)) {
            (/** @type {?} */ (tView.queries)).elementEnd(previousOrParentTNode);
        }
    }
}
/**
 * Creates an empty logical container using {\@link elementContainerStart}
 * and {\@link elementContainerEnd}
 *
 * \@codeGenApi
 * @param {?} index Index of the element in the LView array
 * @param {?=} attrsIndex Index of the container attributes in the `consts` array.
 * @param {?=} localRefsIndex Index of the container's local references in the `consts` array.
 *
 * @return {?}
 */
export function ɵɵelementContainer(index, attrsIndex, localRefsIndex) {
    ɵɵelementContainerStart(index, attrsIndex, localRefsIndex);
    ɵɵelementContainerEnd();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9jb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luc3RydWN0aW9ucy9lbGVtZW50X2NvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRWhELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxlQUFlLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsYUFBYSxFQUFTLFFBQVEsRUFBRSxLQUFLLEVBQVMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEYsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3BJLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEVBQUMseUJBQXlCLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDekksT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7QUFFeEQsU0FBUyxvQ0FBb0MsQ0FDekMsS0FBYSxFQUFF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O0tBQ2xCO1NBQU07UUFDTCxTQUFTLElBQUksZUFBZSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDcEQscUJBQXFCLEdBQUcsbUJBQUEscUJBQXFCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkQsd0JBQXdCLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxTQUFTLElBQUksY0FBYyxDQUFDLHFCQUFxQiwyQkFBNkIsQ0FBQztJQUUvRSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7UUFDekIsc0JBQXNCLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFDckQsSUFBSSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzdDLG1CQUFBLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUNuRDtLQUNGO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7O0FBWUQsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixLQUFhLEVBQUUsVUFBMEIsRUFBRSxjQUF1QjtJQUNwRSx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNELHFCQUFxQixFQUFFLENBQUM7QUFDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7YXNzZXJ0RGF0YUluUmFuZ2UsIGFzc2VydEVxdWFsfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydEhhc1BhcmVudH0gZnJvbSAnLi4vYXNzZXJ0JztcbmltcG9ydCB7YXR0YWNoUGF0Y2hEYXRhfSBmcm9tICcuLi9jb250ZXh0X2Rpc2NvdmVyeSc7XG5pbXBvcnQge3JlZ2lzdGVyUG9zdE9yZGVySG9va3N9IGZyb20gJy4uL2hvb2tzJztcbmltcG9ydCB7VEF0dHJpYnV0ZXMsIFRFbGVtZW50Q29udGFpbmVyTm9kZSwgVE5vZGVUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtpc0NvbnRlbnRRdWVyeUhvc3QsIGlzRGlyZWN0aXZlSG9zdH0gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0hFQURFUl9PRkZTRVQsIExWaWV3LCBSRU5ERVJFUiwgVFZJRVcsIFRWaWV3LCBUX0hPU1R9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2Fzc2VydE5vZGVUeXBlfSBmcm9tICcuLi9ub2RlX2Fzc2VydCc7XG5pbXBvcnQge2FwcGVuZENoaWxkfSBmcm9tICcuLi9ub2RlX21hbmlwdWxhdGlvbic7XG5pbXBvcnQge2dldEJpbmRpbmdJbmRleCwgZ2V0SXNQYXJlbnQsIGdldExWaWV3LCBnZXRQcmV2aW91c09yUGFyZW50VE5vZGUsIHNldElzTm90UGFyZW50LCBzZXRQcmV2aW91c09yUGFyZW50VE5vZGV9IGZyb20gJy4uL3N0YXRlJztcbmltcG9ydCB7Z2V0Q29uc3RhbnR9IGZyb20gJy4uL3V0aWwvdmlld191dGlscyc7XG5cbmltcG9ydCB7Y3JlYXRlRGlyZWN0aXZlc0luc3RhbmNlcywgZXhlY3V0ZUNvbnRlbnRRdWVyaWVzLCBnZXRPckNyZWF0ZVROb2RlLCByZXNvbHZlRGlyZWN0aXZlcywgc2F2ZVJlc29sdmVkTG9jYWxzSW5EYXRhfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge3JlZ2lzdGVySW5pdGlhbFN0eWxpbmdPblROb2RlfSBmcm9tICcuL3N0eWxpbmcnO1xuXG5mdW5jdGlvbiBlbGVtZW50Q29udGFpbmVyU3RhcnRGaXJzdENyZWF0ZVBhc3MoXG4gICAgaW5kZXg6IG51bWJlciwgdFZpZXc6IFRWaWV3LCBsVmlldzogTFZpZXcsIGF0dHJzSW5kZXg/OiBudW1iZXIgfCBudWxsLFxuICAgIGxvY2FsUmVmc0luZGV4PzogbnVtYmVyKTogVEVsZW1lbnRDb250YWluZXJOb2RlIHtcbiAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5maXJzdENyZWF0ZVBhc3MrKztcblxuICBjb25zdCB0Vmlld0NvbnN0cyA9IHRWaWV3LmNvbnN0cztcbiAgY29uc3QgYXR0cnMgPSBnZXRDb25zdGFudDxUQXR0cmlidXRlcz4odFZpZXdDb25zdHMsIGF0dHJzSW5kZXgpO1xuICBjb25zdCB0Tm9kZSA9IGdldE9yQ3JlYXRlVE5vZGUoXG4gICAgICB0VmlldywgbFZpZXdbVF9IT1NUXSwgaW5kZXgsIFROb2RlVHlwZS5FbGVtZW50Q29udGFpbmVyLCAnbmctY29udGFpbmVyJywgYXR0cnMpO1xuXG4gIC8vIFdoaWxlIG5nLWNvbnRhaW5lciBkb2Vzbid0IG5lY2Vzc2FyaWx5IHN1cHBvcnQgc3R5bGluZywgd2UgdXNlIHRoZSBzdHlsZSBjb250ZXh0IHRvIGlkZW50aWZ5XG4gIC8vIGFuZCBleGVjdXRlIGRpcmVjdGl2ZXMgb24gdGhlIG5nLWNvbnRhaW5lci5cbiAgaWYgKGF0dHJzICE9PSBudWxsKSB7XG4gICAgcmVnaXN0ZXJJbml0aWFsU3R5bGluZ09uVE5vZGUodE5vZGUsIGF0dHJzLCAwKTtcbiAgfVxuXG4gIGNvbnN0IGxvY2FsUmVmcyA9IGdldENvbnN0YW50PHN0cmluZ1tdPih0Vmlld0NvbnN0cywgbG9jYWxSZWZzSW5kZXgpO1xuICByZXNvbHZlRGlyZWN0aXZlcyh0VmlldywgbFZpZXcsIHROb2RlLCBsb2NhbFJlZnMpO1xuXG4gIGlmICh0Vmlldy5xdWVyaWVzICE9PSBudWxsKSB7XG4gICAgdFZpZXcucXVlcmllcy5lbGVtZW50U3RhcnQodFZpZXcsIHROb2RlKTtcbiAgfVxuXG4gIHJldHVybiB0Tm9kZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbG9naWNhbCBjb250YWluZXIgZm9yIG90aGVyIG5vZGVzICg8bmctY29udGFpbmVyPikgYmFja2VkIGJ5IGEgY29tbWVudCBub2RlIGluIHRoZSBET00uXG4gKiBUaGUgaW5zdHJ1Y3Rpb24gbXVzdCBsYXRlciBiZSBmb2xsb3dlZCBieSBgZWxlbWVudENvbnRhaW5lckVuZCgpYCBjYWxsLlxuICpcbiAqIEBwYXJhbSBpbmRleCBJbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0aGUgTFZpZXcgYXJyYXlcbiAqIEBwYXJhbSBhdHRyc0luZGV4IEluZGV4IG9mIHRoZSBjb250YWluZXIgYXR0cmlidXRlcyBpbiB0aGUgYGNvbnN0c2AgYXJyYXkuXG4gKiBAcGFyYW0gbG9jYWxSZWZzSW5kZXggSW5kZXggb2YgdGhlIGNvbnRhaW5lcidzIGxvY2FsIHJlZmVyZW5jZXMgaW4gdGhlIGBjb25zdHNgIGFycmF5LlxuICpcbiAqIEV2ZW4gaWYgdGhpcyBpbnN0cnVjdGlvbiBhY2NlcHRzIGEgc2V0IG9mIGF0dHJpYnV0ZXMgbm8gYWN0dWFsIGF0dHJpYnV0ZSB2YWx1ZXMgYXJlIHByb3BhZ2F0ZWQgdG9cbiAqIHRoZSBET00gKGFzIGEgY29tbWVudCBub2RlIGNhbid0IGhhdmUgYXR0cmlidXRlcykuIEF0dHJpYnV0ZXMgYXJlIGhlcmUgb25seSBmb3IgZGlyZWN0aXZlXG4gKiBtYXRjaGluZyBwdXJwb3NlcyBhbmQgc2V0dGluZyBpbml0aWFsIGlucHV0cyBvZiBkaXJlY3RpdmVzLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZWxlbWVudENvbnRhaW5lclN0YXJ0KFxuICAgIGluZGV4OiBudW1iZXIsIGF0dHJzSW5kZXg/OiBudW1iZXIgfCBudWxsLCBsb2NhbFJlZnNJbmRleD86IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID0gaW5kZXggKyBIRUFERVJfT0ZGU0VUO1xuXG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREYXRhSW5SYW5nZShsVmlldywgYWRqdXN0ZWRJbmRleCk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbChcbiAgICAgICAgICAgICAgICAgICBnZXRCaW5kaW5nSW5kZXgoKSwgdFZpZXcuYmluZGluZ1N0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgJ2VsZW1lbnQgY29udGFpbmVycyBzaG91bGQgYmUgY3JlYXRlZCBiZWZvcmUgYW55IGJpbmRpbmdzJyk7XG5cbiAgY29uc3QgdE5vZGUgPSB0Vmlldy5maXJzdENyZWF0ZVBhc3MgP1xuICAgICAgZWxlbWVudENvbnRhaW5lclN0YXJ0Rmlyc3RDcmVhdGVQYXNzKGluZGV4LCB0VmlldywgbFZpZXcsIGF0dHJzSW5kZXgsIGxvY2FsUmVmc0luZGV4KSA6XG4gICAgICB0Vmlldy5kYXRhW2FkanVzdGVkSW5kZXhdIGFzIFRFbGVtZW50Q29udGFpbmVyTm9kZTtcbiAgc2V0UHJldmlvdXNPclBhcmVudFROb2RlKHROb2RlLCB0cnVlKTtcblxuICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyQ3JlYXRlQ29tbWVudCsrO1xuICBjb25zdCBuYXRpdmUgPSBsVmlld1thZGp1c3RlZEluZGV4XSA9XG4gICAgICBsVmlld1tSRU5ERVJFUl0uY3JlYXRlQ29tbWVudChuZ0Rldk1vZGUgPyAnbmctY29udGFpbmVyJyA6ICcnKTtcbiAgYXBwZW5kQ2hpbGQobmF0aXZlLCB0Tm9kZSwgbFZpZXcpO1xuICBhdHRhY2hQYXRjaERhdGEobmF0aXZlLCBsVmlldyk7XG5cbiAgaWYgKGlzRGlyZWN0aXZlSG9zdCh0Tm9kZSkpIHtcbiAgICBjcmVhdGVEaXJlY3RpdmVzSW5zdGFuY2VzKHRWaWV3LCBsVmlldywgdE5vZGUpO1xuICAgIGV4ZWN1dGVDb250ZW50UXVlcmllcyh0VmlldywgdE5vZGUsIGxWaWV3KTtcbiAgfVxuXG4gIGlmIChsb2NhbFJlZnNJbmRleCAhPSBudWxsKSB7XG4gICAgc2F2ZVJlc29sdmVkTG9jYWxzSW5EYXRhKGxWaWV3LCB0Tm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrIHRoZSBlbmQgb2YgdGhlIDxuZy1jb250YWluZXI+LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZWxlbWVudENvbnRhaW5lckVuZCgpOiB2b2lkIHtcbiAgbGV0IHByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpO1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBpZiAoZ2V0SXNQYXJlbnQoKSkge1xuICAgIHNldElzTm90UGFyZW50KCk7XG4gIH0gZWxzZSB7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydEhhc1BhcmVudChwcmV2aW91c09yUGFyZW50VE5vZGUpO1xuICAgIHByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IHByZXZpb3VzT3JQYXJlbnRUTm9kZS5wYXJlbnQgITtcbiAgICBzZXRQcmV2aW91c09yUGFyZW50VE5vZGUocHJldmlvdXNPclBhcmVudFROb2RlLCBmYWxzZSk7XG4gIH1cblxuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0Tm9kZVR5cGUocHJldmlvdXNPclBhcmVudFROb2RlLCBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcik7XG5cbiAgaWYgKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcykge1xuICAgIHJlZ2lzdGVyUG9zdE9yZGVySG9va3ModFZpZXcsIHByZXZpb3VzT3JQYXJlbnRUTm9kZSk7XG4gICAgaWYgKGlzQ29udGVudFF1ZXJ5SG9zdChwcmV2aW91c09yUGFyZW50VE5vZGUpKSB7XG4gICAgICB0Vmlldy5xdWVyaWVzICEuZWxlbWVudEVuZChwcmV2aW91c09yUGFyZW50VE5vZGUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gZW1wdHkgbG9naWNhbCBjb250YWluZXIgdXNpbmcge0BsaW5rIGVsZW1lbnRDb250YWluZXJTdGFydH1cbiAqIGFuZCB7QGxpbmsgZWxlbWVudENvbnRhaW5lckVuZH1cbiAqXG4gKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIExWaWV3IGFycmF5XG4gKiBAcGFyYW0gYXR0cnNJbmRleCBJbmRleCBvZiB0aGUgY29udGFpbmVyIGF0dHJpYnV0ZXMgaW4gdGhlIGBjb25zdHNgIGFycmF5LlxuICogQHBhcmFtIGxvY2FsUmVmc0luZGV4IEluZGV4IG9mIHRoZSBjb250YWluZXIncyBsb2NhbCByZWZlcmVuY2VzIGluIHRoZSBgY29uc3RzYCBhcnJheS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWVsZW1lbnRDb250YWluZXIoXG4gICAgaW5kZXg6IG51bWJlciwgYXR0cnNJbmRleD86IG51bWJlciB8IG51bGwsIGxvY2FsUmVmc0luZGV4PzogbnVtYmVyKTogdm9pZCB7XG4gIMm1ybVlbGVtZW50Q29udGFpbmVyU3RhcnQoaW5kZXgsIGF0dHJzSW5kZXgsIGxvY2FsUmVmc0luZGV4KTtcbiAgybXJtWVsZW1lbnRDb250YWluZXJFbmQoKTtcbn1cbiJdfQ==