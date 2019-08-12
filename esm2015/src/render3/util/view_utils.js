/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDataInRange, assertDefined, assertDomNode, assertGreaterThan, assertLessThan } from '../../util/assert';
import { assertTNodeForLView } from '../assert';
import { TYPE } from '../interfaces/container';
import { MONKEY_PATCH_KEY_NAME } from '../interfaces/context';
import { isLContainer, isLView } from '../interfaces/type_checks';
import { FLAGS, HEADER_OFFSET, HOST, PARENT, PREORDER_HOOK_FLAGS, TVIEW } from '../interfaces/view';
/**
 * For efficiency reasons we often put several different data types (`RNode`, `LView`, `LContainer`)
 * in same location in `LView`. This is because we don't want to pre-allocate space for it
 * because the storage is sparse. This file contains utilities for dealing with such data types.
 *
 * How do we know what is stored at a given location in `LView`.
 * - `Array.isArray(value) === false` => `RNode` (The normal storage value)
 * - `Array.isArray(value) === true` => then the `value[0]` represents the wrapped value.
 *   - `typeof value[TYPE] === 'object'` => `LView`
 *      - This happens when we have a component at a given location
 *   - `typeof value[TYPE] === true` => `LContainer`
 *      - This happens when we have `LContainer` binding at a given location.
 *
 *
 * NOTE: it is assumed that `Array.isArray` and `typeof` operations are very efficient.
 */
/**
 * Returns `RNode`.
 * @param {?} value wrapped value of `RNode`, `LView`, `LContainer`
 * @return {?}
 */
export function unwrapRNode(value) {
    while (Array.isArray(value)) {
        value = (/** @type {?} */ (value[HOST]));
    }
    return (/** @type {?} */ (value));
}
/**
 * Returns `LView` or `null` if not found.
 * @param {?} value wrapped value of `RNode`, `LView`, `LContainer`
 * @return {?}
 */
export function unwrapLView(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLView()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (typeof value[TYPE] === 'object')
            return (/** @type {?} */ (value));
        value = (/** @type {?} */ (value[HOST]));
    }
    return null;
}
/**
 * Returns `LContainer` or `null` if not found.
 * @param {?} value wrapped value of `RNode`, `LView`, `LContainer`
 * @return {?}
 */
export function unwrapLContainer(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLContainer()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (value[TYPE] === true)
            return (/** @type {?} */ (value));
        value = (/** @type {?} */ (value[HOST]));
    }
    return null;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 * @param {?} index
 * @param {?} lView
 * @return {?}
 */
export function getNativeByIndex(index, lView) {
    return unwrapRNode(lView[index + HEADER_OFFSET]);
}
/**
 * Retrieve an `RNode` for a given `TNode` and `LView`.
 *
 * This function guarantees in dev mode to retrieve a non-null `RNode`.
 *
 * @param {?} tNode
 * @param {?} lView
 * @return {?}
 */
export function getNativeByTNode(tNode, lView) {
    ngDevMode && assertTNodeForLView(tNode, lView);
    ngDevMode && assertDataInRange(lView, tNode.index);
    /** @type {?} */
    const node = unwrapRNode(lView[tNode.index]);
    ngDevMode && assertDomNode(node);
    return node;
}
/**
 * Retrieve an `RNode` or `null` for a given `TNode` and `LView`.
 *
 * Some `TNode`s don't have associated `RNode`s. For example `Projection`
 *
 * @param {?} tNode
 * @param {?} lView
 * @return {?}
 */
export function getNativeByTNodeOrNull(tNode, lView) {
    ngDevMode && assertTNodeForLView(tNode, lView);
    /** @type {?} */
    const index = tNode.index;
    /** @type {?} */
    const node = index == -1 ? null : unwrapRNode(lView[index]);
    ngDevMode && node !== null && assertDomNode(node);
    return node;
}
/**
 * A helper function that returns `true` if a given `TNode` has any matching directives.
 * @param {?} tNode
 * @return {?}
 */
export function hasDirectives(tNode) {
    return tNode.directiveEnd > tNode.directiveStart;
}
/**
 * @param {?} index
 * @param {?} view
 * @return {?}
 */
export function getTNode(index, view) {
    ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
    ngDevMode && assertLessThan(index, view[TVIEW].data.length, 'wrong index for TNode');
    return (/** @type {?} */ (view[TVIEW].data[index + HEADER_OFFSET]));
}
/**
 * Retrieves a value from any `LView` or `TData`.
 * @template T
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
export function load(view, index) {
    ngDevMode && assertDataInRange(view, index + HEADER_OFFSET);
    return view[index + HEADER_OFFSET];
}
/**
 * @param {?} nodeIndex
 * @param {?} hostView
 * @return {?}
 */
export function getComponentViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    /** @type {?} */
    const slotValue = hostView[nodeIndex];
    /** @type {?} */
    const lView = isLView(slotValue) ? slotValue : slotValue[HOST];
    return lView;
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 * @param {?} target
 * @return {?}
 */
export function readPatchedData(target) {
    ngDevMode && assertDefined(target, 'Target expected');
    return target[MONKEY_PATCH_KEY_NAME];
}
/**
 * @param {?} target
 * @return {?}
 */
export function readPatchedLView(target) {
    /** @type {?} */
    const value = readPatchedData(target);
    if (value) {
        return Array.isArray(value) ? value : ((/** @type {?} */ (value))).lView;
    }
    return null;
}
/**
 * Checks whether a given view is in creation mode
 * @param {?} view
 * @return {?}
 */
export function isCreationMode(view) {
    return (view[FLAGS] & 4 /* CreationMode */) === 4 /* CreationMode */;
}
/**
 * Returns a boolean for whether the view is attached to the change detection tree.
 *
 * Note: This determines whether a view should be checked, not whether it's inserted
 * into a container. For that, you'll want `viewAttachedToContainer` below.
 * @param {?} view
 * @return {?}
 */
export function viewAttachedToChangeDetector(view) {
    return (view[FLAGS] & 128 /* Attached */) === 128 /* Attached */;
}
/**
 * Returns a boolean for whether the view is attached to a container.
 * @param {?} view
 * @return {?}
 */
export function viewAttachedToContainer(view) {
    return isLContainer(view[PARENT]);
}
/**
 * Resets the pre-order hook flags of the view.
 * @param {?} lView the LView on which the flags are reset
 * @return {?}
 */
export function resetPreOrderHookFlags(lView) {
    lView[PREORDER_HOOK_FLAGS] = 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC92aWV3X3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckgsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBYSxJQUFJLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQVcscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUd0RSxPQUFPLEVBQUMsWUFBWSxFQUFFLE9BQU8sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBcUIsTUFBTSxFQUFFLG1CQUFtQixFQUFTLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUI1SCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQWlDO0lBQzNELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixLQUFLLEdBQUcsbUJBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFPLENBQUM7S0FDNUI7SUFDRCxPQUFPLG1CQUFBLEtBQUssRUFBUyxDQUFDO0FBQ3hCLENBQUM7Ozs7OztBQU1ELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBaUM7SUFDM0QsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCLGtGQUFrRjtRQUNsRixpRUFBaUU7UUFDakUsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRO1lBQUUsT0FBTyxt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LENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RGF0YUluUmFuZ2UsIGFzc2VydERlZmluZWQsIGFzc2VydERvbU5vZGUsIGFzc2VydEdyZWF0ZXJUaGFuLCBhc3NlcnRMZXNzVGhhbn0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHthc3NlcnRUTm9kZUZvckxWaWV3fSBmcm9tICcuLi9hc3NlcnQnO1xuaW1wb3J0IHtMQ29udGFpbmVyLCBUWVBFfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge0xDb250ZXh0LCBNT05LRVlfUEFUQ0hfS0VZX05BTUV9IGZyb20gJy4uL2ludGVyZmFjZXMvY29udGV4dCc7XG5pbXBvcnQge1ROb2RlfSBmcm9tICcuLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge2lzTENvbnRhaW5lciwgaXNMVmlld30gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0ZMQUdTLCBIRUFERVJfT0ZGU0VULCBIT1NULCBMVmlldywgTFZpZXdGbGFncywgUEFSRU5ULCBQUkVPUkRFUl9IT09LX0ZMQUdTLCBURGF0YSwgVFZJRVd9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5cblxuXG4vKipcbiAqIEZvciBlZmZpY2llbmN5IHJlYXNvbnMgd2Ugb2Z0ZW4gcHV0IHNldmVyYWwgZGlmZmVyZW50IGRhdGEgdHlwZXMgKGBSTm9kZWAsIGBMVmlld2AsIGBMQ29udGFpbmVyYClcbiAqIGluIHNhbWUgbG9jYXRpb24gaW4gYExWaWV3YC4gVGhpcyBpcyBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gcHJlLWFsbG9jYXRlIHNwYWNlIGZvciBpdFxuICogYmVjYXVzZSB0aGUgc3RvcmFnZSBpcyBzcGFyc2UuIFRoaXMgZmlsZSBjb250YWlucyB1dGlsaXRpZXMgZm9yIGRlYWxpbmcgd2l0aCBzdWNoIGRhdGEgdHlwZXMuXG4gKlxuICogSG93IGRvIHdlIGtub3cgd2hhdCBpcyBzdG9yZWQgYXQgYSBnaXZlbiBsb2NhdGlvbiBpbiBgTFZpZXdgLlxuICogLSBgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPT09IGZhbHNlYCA9PiBgUk5vZGVgIChUaGUgbm9ybWFsIHN0b3JhZ2UgdmFsdWUpXG4gKiAtIGBBcnJheS5pc0FycmF5KHZhbHVlKSA9PT0gdHJ1ZWAgPT4gdGhlbiB0aGUgYHZhbHVlWzBdYCByZXByZXNlbnRzIHRoZSB3cmFwcGVkIHZhbHVlLlxuICogICAtIGB0eXBlb2YgdmFsdWVbVFlQRV0gPT09ICdvYmplY3QnYCA9PiBgTFZpZXdgXG4gKiAgICAgIC0gVGhpcyBoYXBwZW5zIHdoZW4gd2UgaGF2ZSBhIGNvbXBvbmVudCBhdCBhIGdpdmVuIGxvY2F0aW9uXG4gKiAgIC0gYHR5cGVvZiB2YWx1ZVtUWVBFXSA9PT0gdHJ1ZWAgPT4gYExDb250YWluZXJgXG4gKiAgICAgIC0gVGhpcyBoYXBwZW5zIHdoZW4gd2UgaGF2ZSBgTENvbnRhaW5lcmAgYmluZGluZyBhdCBhIGdpdmVuIGxvY2F0aW9uLlxuICpcbiAqXG4gKiBOT1RFOiBpdCBpcyBhc3N1bWVkIHRoYXQgYEFycmF5LmlzQXJyYXlgIGFuZCBgdHlwZW9mYCBvcGVyYXRpb25zIGFyZSB2ZXJ5IGVmZmljaWVudC5cbiAqL1xuXG4vKipcbiAqIFJldHVybnMgYFJOb2RlYC5cbiAqIEBwYXJhbSB2YWx1ZSB3cmFwcGVkIHZhbHVlIG9mIGBSTm9kZWAsIGBMVmlld2AsIGBMQ29udGFpbmVyYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwUk5vZGUodmFsdWU6IFJOb2RlIHwgTFZpZXcgfCBMQ29udGFpbmVyKTogUk5vZGUge1xuICB3aGlsZSAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB2YWx1ZSA9IHZhbHVlW0hPU1RdIGFzIGFueTtcbiAgfVxuICByZXR1cm4gdmFsdWUgYXMgUk5vZGU7XG59XG5cbi8qKlxuICogUmV0dXJucyBgTFZpZXdgIG9yIGBudWxsYCBpZiBub3QgZm91bmQuXG4gKiBAcGFyYW0gdmFsdWUgd3JhcHBlZCB2YWx1ZSBvZiBgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcExWaWV3KHZhbHVlOiBSTm9kZSB8IExWaWV3IHwgTENvbnRhaW5lcik6IExWaWV3fG51bGwge1xuICB3aGlsZSAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBUaGlzIGNoZWNrIGlzIHNhbWUgYXMgYGlzTFZpZXcoKWAgYnV0IHdlIGRvbid0IGNhbGwgYXQgYXMgd2UgZG9uJ3Qgd2FudCB0byBjYWxsXG4gICAgLy8gYEFycmF5LmlzQXJyYXkoKWAgdHdpY2UgYW5kIGdpdmUgSklUZXIgbW9yZSB3b3JrIGZvciBpbmxpbmluZy5cbiAgICBpZiAodHlwZW9mIHZhbHVlW1RZUEVdID09PSAnb2JqZWN0JykgcmV0dXJuIHZhbHVlIGFzIExWaWV3O1xuICAgIHZhbHVlID0gdmFsdWVbSE9TVF0gYXMgYW55O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFJldHVybnMgYExDb250YWluZXJgIG9yIGBudWxsYCBpZiBub3QgZm91bmQuXG4gKiBAcGFyYW0gdmFsdWUgd3JhcHBlZCB2YWx1ZSBvZiBgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcExDb250YWluZXIodmFsdWU6IFJOb2RlIHwgTFZpZXcgfCBMQ29udGFpbmVyKTogTENvbnRhaW5lcnxudWxsIHtcbiAgd2hpbGUgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gVGhpcyBjaGVjayBpcyBzYW1lIGFzIGBpc0xDb250YWluZXIoKWAgYnV0IHdlIGRvbid0IGNhbGwgYXQgYXMgd2UgZG9uJ3Qgd2FudCB0byBjYWxsXG4gICAgLy8gYEFycmF5LmlzQXJyYXkoKWAgdHdpY2UgYW5kIGdpdmUgSklUZXIgbW9yZSB3b3JrIGZvciBpbmxpbmluZy5cbiAgICBpZiAodmFsdWVbVFlQRV0gPT09IHRydWUpIHJldHVybiB2YWx1ZSBhcyBMQ29udGFpbmVyO1xuICAgIHZhbHVlID0gdmFsdWVbSE9TVF0gYXMgYW55O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyBhbiBlbGVtZW50IHZhbHVlIGZyb20gdGhlIHByb3ZpZGVkIGB2aWV3RGF0YWAsIGJ5IHVud3JhcHBpbmdcbiAqIGZyb20gYW55IGNvbnRhaW5lcnMsIGNvbXBvbmVudCB2aWV3cywgb3Igc3R5bGUgY29udGV4dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeUluZGV4KGluZGV4OiBudW1iZXIsIGxWaWV3OiBMVmlldyk6IFJOb2RlIHtcbiAgcmV0dXJuIHVud3JhcFJOb2RlKGxWaWV3W2luZGV4ICsgSEVBREVSX09GRlNFVF0pO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIGFuIGBSTm9kZWAgZm9yIGEgZ2l2ZW4gYFROb2RlYCBhbmQgYExWaWV3YC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGd1YXJhbnRlZXMgaW4gZGV2IG1vZGUgdG8gcmV0cmlldmUgYSBub24tbnVsbCBgUk5vZGVgLlxuICpcbiAqIEBwYXJhbSB0Tm9kZVxuICogQHBhcmFtIGxWaWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeVROb2RlKHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3KTogUk5vZGUge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0VE5vZGVGb3JMVmlldyh0Tm9kZSwgbFZpZXcpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGF0YUluUmFuZ2UobFZpZXcsIHROb2RlLmluZGV4KTtcbiAgY29uc3Qgbm9kZTogUk5vZGUgPSB1bndyYXBSTm9kZShsVmlld1t0Tm9kZS5pbmRleF0pO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RG9tTm9kZShub2RlKTtcbiAgcmV0dXJuIG5vZGU7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gYFJOb2RlYCBvciBgbnVsbGAgZm9yIGEgZ2l2ZW4gYFROb2RlYCBhbmQgYExWaWV3YC5cbiAqXG4gKiBTb21lIGBUTm9kZWBzIGRvbid0IGhhdmUgYXNzb2NpYXRlZCBgUk5vZGVgcy4gRm9yIGV4YW1wbGUgYFByb2plY3Rpb25gXG4gKlxuICogQHBhcmFtIHROb2RlXG4gKiBAcGFyYW0gbFZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5hdGl2ZUJ5VE5vZGVPck51bGwodE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcpOiBSTm9kZXxudWxsIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydFROb2RlRm9yTFZpZXcodE5vZGUsIGxWaWV3KTtcbiAgY29uc3QgaW5kZXggPSB0Tm9kZS5pbmRleDtcbiAgY29uc3Qgbm9kZTogUk5vZGV8bnVsbCA9IGluZGV4ID09IC0xID8gbnVsbCA6IHVud3JhcFJOb2RlKGxWaWV3W2luZGV4XSk7XG4gIG5nRGV2TW9kZSAmJiBub2RlICE9PSBudWxsICYmIGFzc2VydERvbU5vZGUobm9kZSk7XG4gIHJldHVybiBub2RlO1xufVxuXG5cbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB0cnVlYCBpZiBhIGdpdmVuIGBUTm9kZWAgaGFzIGFueSBtYXRjaGluZyBkaXJlY3RpdmVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzRGlyZWN0aXZlcyh0Tm9kZTogVE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHROb2RlLmRpcmVjdGl2ZUVuZCA+IHROb2RlLmRpcmVjdGl2ZVN0YXJ0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VE5vZGUoaW5kZXg6IG51bWJlciwgdmlldzogTFZpZXcpOiBUTm9kZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRHcmVhdGVyVGhhbihpbmRleCwgLTEsICd3cm9uZyBpbmRleCBmb3IgVE5vZGUnKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExlc3NUaGFuKGluZGV4LCB2aWV3W1RWSUVXXS5kYXRhLmxlbmd0aCwgJ3dyb25nIGluZGV4IGZvciBUTm9kZScpO1xuICByZXR1cm4gdmlld1tUVklFV10uZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdIGFzIFROb2RlO1xufVxuXG4vKiogUmV0cmlldmVzIGEgdmFsdWUgZnJvbSBhbnkgYExWaWV3YCBvciBgVERhdGFgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWQ8VD4odmlldzogTFZpZXcgfCBURGF0YSwgaW5kZXg6IG51bWJlcik6IFQge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGF0YUluUmFuZ2UodmlldywgaW5kZXggKyBIRUFERVJfT0ZGU0VUKTtcbiAgcmV0dXJuIHZpZXdbaW5kZXggKyBIRUFERVJfT0ZGU0VUXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFZpZXdCeUluZGV4KG5vZGVJbmRleDogbnVtYmVyLCBob3N0VmlldzogTFZpZXcpOiBMVmlldyB7XG4gIC8vIENvdWxkIGJlIGFuIExWaWV3IG9yIGFuIExDb250YWluZXIuIElmIExDb250YWluZXIsIHVud3JhcCB0byBmaW5kIExWaWV3LlxuICBjb25zdCBzbG90VmFsdWUgPSBob3N0Vmlld1tub2RlSW5kZXhdO1xuICBjb25zdCBsVmlldyA9IGlzTFZpZXcoc2xvdFZhbHVlKSA/IHNsb3RWYWx1ZSA6IHNsb3RWYWx1ZVtIT1NUXTtcbiAgcmV0dXJuIGxWaWV3O1xufVxuXG5cbi8qKlxuICogUmV0dXJucyB0aGUgbW9ua2V5LXBhdGNoIHZhbHVlIGRhdGEgcHJlc2VudCBvbiB0aGUgdGFyZ2V0ICh3aGljaCBjb3VsZCBiZVxuICogYSBjb21wb25lbnQsIGRpcmVjdGl2ZSBvciBhIERPTSBub2RlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQ6IGFueSk6IExWaWV3fExDb250ZXh0fG51bGwge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0YXJnZXQsICdUYXJnZXQgZXhwZWN0ZWQnKTtcbiAgcmV0dXJuIHRhcmdldFtNT05LRVlfUEFUQ0hfS0VZX05BTUVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBhdGNoZWRMVmlldyh0YXJnZXQ6IGFueSk6IExWaWV3fG51bGwge1xuICBjb25zdCB2YWx1ZSA9IHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQpO1xuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6ICh2YWx1ZSBhcyBMQ29udGV4dCkubFZpZXc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBDaGVja3Mgd2hldGhlciBhIGdpdmVuIHZpZXcgaXMgaW4gY3JlYXRpb24gbW9kZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ3JlYXRpb25Nb2RlKHZpZXc6IExWaWV3KTogYm9vbGVhbiB7XG4gIHJldHVybiAodmlld1tGTEFHU10gJiBMVmlld0ZsYWdzLkNyZWF0aW9uTW9kZSkgPT09IExWaWV3RmxhZ3MuQ3JlYXRpb25Nb2RlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBib29sZWFuIGZvciB3aGV0aGVyIHRoZSB2aWV3IGlzIGF0dGFjaGVkIHRvIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHRyZWUuXG4gKlxuICogTm90ZTogVGhpcyBkZXRlcm1pbmVzIHdoZXRoZXIgYSB2aWV3IHNob3VsZCBiZSBjaGVja2VkLCBub3Qgd2hldGhlciBpdCdzIGluc2VydGVkXG4gKiBpbnRvIGEgY29udGFpbmVyLiBGb3IgdGhhdCwgeW91J2xsIHdhbnQgYHZpZXdBdHRhY2hlZFRvQ29udGFpbmVyYCBiZWxvdy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZpZXdBdHRhY2hlZFRvQ2hhbmdlRGV0ZWN0b3IodmlldzogTFZpZXcpOiBib29sZWFuIHtcbiAgcmV0dXJuICh2aWV3W0ZMQUdTXSAmIExWaWV3RmxhZ3MuQXR0YWNoZWQpID09PSBMVmlld0ZsYWdzLkF0dGFjaGVkO1xufVxuXG4vKiogUmV0dXJucyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgdGhlIHZpZXcgaXMgYXR0YWNoZWQgdG8gYSBjb250YWluZXIuICovXG5leHBvcnQgZnVuY3Rpb24gdmlld0F0dGFjaGVkVG9Db250YWluZXIodmlldzogTFZpZXcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzTENvbnRhaW5lcih2aWV3W1BBUkVOVF0pO1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgcHJlLW9yZGVyIGhvb2sgZmxhZ3Mgb2YgdGhlIHZpZXcuXG4gKiBAcGFyYW0gbFZpZXcgdGhlIExWaWV3IG9uIHdoaWNoIHRoZSBmbGFncyBhcmUgcmVzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0UHJlT3JkZXJIb29rRmxhZ3MobFZpZXc6IExWaWV3KSB7XG4gIGxWaWV3W1BSRU9SREVSX0hPT0tfRkxBR1NdID0gMDtcbn1cbiJdfQ==