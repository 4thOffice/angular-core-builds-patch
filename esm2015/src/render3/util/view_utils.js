/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDataInRange, assertDefined, assertDomNode, assertGreaterThan, assertLessThan } from '../../util/assert';
import { assertTNodeForLView } from '../assert';
import { TYPE } from '../interfaces/container';
import { MONKEY_PATCH_KEY_NAME } from '../interfaces/context';
import { isProceduralRenderer } from '../interfaces/renderer';
import { isLContainer, isLView } from '../interfaces/type_checks';
import { FLAGS, HEADER_OFFSET, HOST, PARENT, PREORDER_HOOK_FLAGS, RENDERER, TRANSPLANTED_VIEWS_TO_REFRESH } from '../interfaces/view';
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
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function unwrapRNode(value) {
    while (Array.isArray(value)) {
        value = value[HOST];
    }
    return value;
}
/**
 * Returns `LView` or `null` if not found.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function unwrapLView(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLView()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (typeof value[TYPE] === 'object')
            return value;
        value = value[HOST];
    }
    return null;
}
/**
 * Returns `LContainer` or `null` if not found.
 * @param value wrapped value of `RNode`, `LView`, `LContainer`
 */
export function unwrapLContainer(value) {
    while (Array.isArray(value)) {
        // This check is same as `isLContainer()` but we don't call at as we don't want to call
        // `Array.isArray()` twice and give JITer more work for inlining.
        if (value[TYPE] === true)
            return value;
        value = value[HOST];
    }
    return null;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 */
export function getNativeByIndex(index, lView) {
    return unwrapRNode(lView[index + HEADER_OFFSET]);
}
/**
 * Retrieve an `RNode` for a given `TNode` and `LView`.
 *
 * This function guarantees in dev mode to retrieve a non-null `RNode`.
 *
 * @param tNode
 * @param lView
 */
export function getNativeByTNode(tNode, lView) {
    ngDevMode && assertTNodeForLView(tNode, lView);
    ngDevMode && assertDataInRange(lView, tNode.index);
    const node = unwrapRNode(lView[tNode.index]);
    ngDevMode && !isProceduralRenderer(lView[RENDERER]) && assertDomNode(node);
    return node;
}
/**
 * Retrieve an `RNode` or `null` for a given `TNode` and `LView`.
 *
 * Some `TNode`s don't have associated `RNode`s. For example `Projection`
 *
 * @param tNode
 * @param lView
 */
export function getNativeByTNodeOrNull(tNode, lView) {
    const index = tNode.index;
    if (index !== -1) {
        ngDevMode && assertTNodeForLView(tNode, lView);
        const node = unwrapRNode(lView[index]);
        ngDevMode && node !== null && !isProceduralRenderer(lView[RENDERER]) && assertDomNode(node);
        return node;
    }
    return null;
}
export function getTNode(tView, index) {
    ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
    ngDevMode && assertLessThan(index, tView.data.length, 'wrong index for TNode');
    return tView.data[index + HEADER_OFFSET];
}
/** Retrieves a value from any `LView` or `TData`. */
export function load(view, index) {
    ngDevMode && assertDataInRange(view, index + HEADER_OFFSET);
    return view[index + HEADER_OFFSET];
}
export function getComponentLViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    ngDevMode && assertDataInRange(hostView, nodeIndex);
    const slotValue = hostView[nodeIndex];
    const lView = isLView(slotValue) ? slotValue : slotValue[HOST];
    return lView;
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
export function readPatchedData(target) {
    ngDevMode && assertDefined(target, 'Target expected');
    return target[MONKEY_PATCH_KEY_NAME] || null;
}
export function readPatchedLView(target) {
    const value = readPatchedData(target);
    if (value) {
        return Array.isArray(value) ? value : value.lView;
    }
    return null;
}
/** Checks whether a given view is in creation mode */
export function isCreationMode(view) {
    return (view[FLAGS] & 4 /* CreationMode */) === 4 /* CreationMode */;
}
/**
 * Returns a boolean for whether the view is attached to the change detection tree.
 *
 * Note: This determines whether a view should be checked, not whether it's inserted
 * into a container. For that, you'll want `viewAttachedToContainer` below.
 */
export function viewAttachedToChangeDetector(view) {
    return (view[FLAGS] & 128 /* Attached */) === 128 /* Attached */;
}
/** Returns a boolean for whether the view is attached to a container. */
export function viewAttachedToContainer(view) {
    return isLContainer(view[PARENT]);
}
/** Returns a constant from `TConstants` instance. */
export function getConstant(consts, index) {
    return consts === null || index == null ? null : consts[index];
}
/**
 * Resets the pre-order hook flags of the view.
 * @param lView the LView on which the flags are reset
 */
export function resetPreOrderHookFlags(lView) {
    lView[PREORDER_HOOK_FLAGS] = 0;
}
/**
 * Updates the `TRANSPLANTED_VIEWS_TO_REFRESH` counter on the `LContainer` as well as the parents
 * whose
 *  1. counter goes from 0 to 1, indicating that there is a new child that has a view to refresh
 *  or
 *  2. counter goes from 1 to 0, indicating there are no more descendant views to refresh
 */
export function updateTransplantedViewCount(lContainer, amount) {
    lContainer[TRANSPLANTED_VIEWS_TO_REFRESH] += amount;
    let viewOrContainer = lContainer;
    let parent = lContainer[PARENT];
    while (parent !== null &&
        ((amount === 1 && viewOrContainer[TRANSPLANTED_VIEWS_TO_REFRESH] === 1) ||
            (amount === -1 && viewOrContainer[TRANSPLANTED_VIEWS_TO_REFRESH] === 0))) {
        parent[TRANSPLANTED_VIEWS_TO_REFRESH] += amount;
        viewOrContainer = parent;
        parent = parent[PARENT];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC92aWV3X3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3JILE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM5QyxPQUFPLEVBQWEsSUFBSSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFXLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFdEUsT0FBTyxFQUFDLG9CQUFvQixFQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQXFCLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQVMsNkJBQTZCLEVBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUlySzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQTZCO0lBQ3ZELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBUSxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxLQUFjLENBQUM7QUFDeEIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBNkI7SUFDdkQsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCLGtGQUFrRjtRQUNsRixpRUFB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QVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQscURBQXFEO0FBQ3JELE1BQU0sVUFBVSxXQUFXLENBQUksTUFBdUIsRUFBRSxLQUE0QjtJQUNsRixPQUFPLE1BQU0sS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFpQixDQUFDO0FBQ2pGLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBWTtJQUNqRCxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxVQUFzQixFQUFFLE1BQWE7SUFDL0UsVUFBVSxDQUFDLDZCQUE2QixDQUFDLElBQUksTUFBTSxDQUFDO0lBQ3BELElBQUksZUFBZSxHQUFxQixVQUFVLENBQUM7SUFDbkQsSUFBSSxNQUFNLEdBQTBCLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RCxPQUFPLE1BQU0sS0FBSyxJQUFJO1FBQ2YsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksZUFBZSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEYsTUFBTSxDQUFDLDZCQUE2QixDQUFDLElBQUksTUFBTSxDQUFDO1FBQ2hELGVBQWUsR0FBRyxNQUFNLENBQUM7UUFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6QjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnREYXRhSW5SYW5nZSwgYXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RG9tTm9kZSwgYXNzZXJ0R3JlYXRlclRoYW4sIGFzc2VydExlc3NUaGFufSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydFROb2RlRm9yTFZpZXd9IGZyb20gJy4uL2Fzc2VydCc7XG5pbXBvcnQge0xDb250YWluZXIsIFRZUEV9IGZyb20gJy4uL2ludGVyZmFjZXMvY29udGFpbmVyJztcbmltcG9ydCB7TENvbnRleHQsIE1PTktFWV9QQVRDSF9LRVlfTkFNRX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb250ZXh0JztcbmltcG9ydCB7VENvbnN0YW50cywgVE5vZGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge2lzUHJvY2VkdXJhbFJlbmRlcmVyLCBSTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge2lzTENvbnRhaW5lciwgaXNMVmlld30gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0ZMQUdTLCBIRUFERVJfT0ZGU0VULCBIT1NULCBMVmlldywgTFZpZXdGbGFncywgUEFSRU5ULCBQUkVPUkRFUl9IT09LX0ZMQUdTLCBSRU5ERVJFUiwgVERhdGEsIFRSQU5TUExBTlRFRF9WSUVXU19UT19SRUZSRVNILCBUVmlld30gZnJvbSAnLi4vaW50ZXJmYWNlcy92aWV3JztcblxuXG5cbi8qKlxuICogRm9yIGVmZmljaWVuY3kgcmVhc29ucyB3ZSBvZnRlbiBwdXQgc2V2ZXJhbCBkaWZmZXJlbnQgZGF0YSB0eXBlcyAoYFJOb2RlYCwgYExWaWV3YCwgYExDb250YWluZXJgKVxuICogaW4gc2FtZSBsb2NhdGlvbiBpbiBgTFZpZXdgLiBUaGlzIGlzIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBwcmUtYWxsb2NhdGUgc3BhY2UgZm9yIGl0XG4gKiBiZWNhdXNlIHRoZSBzdG9yYWdlIGlzIHNwYXJzZS4gVGhpcyBmaWxlIGNvbnRhaW5zIHV0aWxpdGllcyBmb3IgZGVhbGluZyB3aXRoIHN1Y2ggZGF0YSB0eXBlcy5cbiAqXG4gKiBIb3cgZG8gd2Uga25vdyB3aGF0IGlzIHN0b3JlZCBhdCBhIGdpdmVuIGxvY2F0aW9uIGluIGBMVmlld2AuXG4gKiAtIGBBcnJheS5pc0FycmF5KHZhbHVlKSA9PT0gZmFsc2VgID0+IGBSTm9kZWAgKFRoZSBub3JtYWwgc3RvcmFnZSB2YWx1ZSlcbiAqIC0gYEFycmF5LmlzQXJyYXkodmFsdWUpID09PSB0cnVlYCA9PiB0aGVuIHRoZSBgdmFsdWVbMF1gIHJlcHJlc2VudHMgdGhlIHdyYXBwZWQgdmFsdWUuXG4gKiAgIC0gYHR5cGVvZiB2YWx1ZVtUWVBFXSA9PT0gJ29iamVjdCdgID0+IGBMVmlld2BcbiAqICAgICAgLSBUaGlzIGhhcHBlbnMgd2hlbiB3ZSBoYXZlIGEgY29tcG9uZW50IGF0IGEgZ2l2ZW4gbG9jYXRpb25cbiAqICAgLSBgdHlwZW9mIHZhbHVlW1RZUEVdID09PSB0cnVlYCA9PiBgTENvbnRhaW5lcmBcbiAqICAgICAgLSBUaGlzIGhhcHBlbnMgd2hlbiB3ZSBoYXZlIGBMQ29udGFpbmVyYCBiaW5kaW5nIGF0IGEgZ2l2ZW4gbG9jYXRpb24uXG4gKlxuICpcbiAqIE5PVEU6IGl0IGlzIGFzc3VtZWQgdGhhdCBgQXJyYXkuaXNBcnJheWAgYW5kIGB0eXBlb2ZgIG9wZXJhdGlvbnMgYXJlIHZlcnkgZWZmaWNpZW50LlxuICovXG5cbi8qKlxuICogUmV0dXJucyBgUk5vZGVgLlxuICogQHBhcmFtIHZhbHVlIHdyYXBwZWQgdmFsdWUgb2YgYFJOb2RlYCwgYExWaWV3YCwgYExDb250YWluZXJgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBSTm9kZSh2YWx1ZTogUk5vZGV8TFZpZXd8TENvbnRhaW5lcik6IFJOb2RlIHtcbiAgd2hpbGUgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFsdWUgPSB2YWx1ZVtIT1NUXSBhcyBhbnk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlIGFzIFJOb2RlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYExWaWV3YCBvciBgbnVsbGAgaWYgbm90IGZvdW5kLlxuICogQHBhcmFtIHZhbHVlIHdyYXBwZWQgdmFsdWUgb2YgYFJOb2RlYCwgYExWaWV3YCwgYExDb250YWluZXJgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBMVmlldyh2YWx1ZTogUk5vZGV8TFZpZXd8TENvbnRhaW5lcik6IExWaWV3fG51bGwge1xuICB3aGlsZSAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBUaGlzIGNoZWNrIGlzIHNhbWUgYXMgYGlzTFZpZXcoKWAgYnV0IHdlIGRvbid0IGNhbGwgYXQgYXMgd2UgZG9uJ3Qgd2FudCB0byBjYWxsXG4gICAgLy8gYEFycmF5LmlzQXJyYXkoKWAgdHdpY2UgYW5kIGdpdmUgSklUZXIgbW9yZSB3b3JrIGZvciBpbmxpbmluZy5cbiAgICBpZiAodHlwZW9mIHZhbHVlW1RZUEVdID09PSAnb2JqZWN0JykgcmV0dXJuIHZhbHVlIGFzIExWaWV3O1xuICAgIHZhbHVlID0gdmFsdWVbSE9TVF0gYXMgYW55O1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIFJldHVybnMgYExDb250YWluZXJgIG9yIGBudWxsYCBpZiBub3QgZm91bmQuXG4gKiBAcGFyYW0gdmFsdWUgd3JhcHBlZCB2YWx1ZSBvZiBgUk5vZGVgLCBgTFZpZXdgLCBgTENvbnRhaW5lcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcExDb250YWluZXIodmFsdWU6IFJOb2RlfExWaWV3fExDb250YWluZXIpOiBMQ29udGFpbmVyfG51bGwge1xuICB3aGlsZSAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBUaGlzIGNoZWNrIGlzIHNhbWUgYXMgYGlzTENvbnRhaW5lcigpYCBidXQgd2UgZG9uJ3QgY2FsbCBhdCBhcyB3ZSBkb24ndCB3YW50IHRvIGNhbGxcbiAgICAvLyBgQXJyYXkuaXNBcnJheSgpYCB0d2ljZSBhbmQgZ2l2ZSBKSVRlciBtb3JlIHdvcmsgZm9yIGlubGluaW5nLlxuICAgIGlmICh2YWx1ZVtUWVBFXSA9PT0gdHJ1ZSkgcmV0dXJuIHZhbHVlIGFzIExDb250YWluZXI7XG4gICAgdmFsdWUgPSB2YWx1ZVtIT1NUXSBhcyBhbnk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIGFuIGVsZW1lbnQgdmFsdWUgZnJvbSB0aGUgcHJvdmlkZWQgYHZpZXdEYXRhYCwgYnkgdW53cmFwcGluZ1xuICogZnJvbSBhbnkgY29udGFpbmVycywgY29tcG9uZW50IHZpZXdzLCBvciBzdHlsZSBjb250ZXh0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5hdGl2ZUJ5SW5kZXgoaW5kZXg6IG51bWJlciwgbFZpZXc6IExWaWV3KTogUk5vZGUge1xuICByZXR1cm4gdW53cmFwUk5vZGUobFZpZXdbaW5kZXggKyBIRUFERVJfT0ZGU0VUXSk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gYFJOb2RlYCBmb3IgYSBnaXZlbiBgVE5vZGVgIGFuZCBgTFZpZXdgLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZ3VhcmFudGVlcyBpbiBkZXYgbW9kZSB0byByZXRyaWV2ZSBhIG5vbi1udWxsIGBSTm9kZWAuXG4gKlxuICogQHBhcmFtIHROb2RlXG4gKiBAcGFyYW0gbFZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5hdGl2ZUJ5VE5vZGUodE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcpOiBSTm9kZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRUTm9kZUZvckxWaWV3KHROb2RlLCBsVmlldyk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREYXRhSW5SYW5nZShsVmlldywgdE5vZGUuaW5kZXgpO1xuICBjb25zdCBub2RlOiBSTm9kZSA9IHVud3JhcFJOb2RlKGxWaWV3W3ROb2RlLmluZGV4XSk7XG4gIG5nRGV2TW9kZSAmJiAhaXNQcm9jZWR1cmFsUmVuZGVyZXIobFZpZXdbUkVOREVSRVJdKSAmJiBhc3NlcnREb21Ob2RlKG5vZGUpO1xuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhbiBgUk5vZGVgIG9yIGBudWxsYCBmb3IgYSBnaXZlbiBgVE5vZGVgIGFuZCBgTFZpZXdgLlxuICpcbiAqIFNvbWUgYFROb2RlYHMgZG9uJ3QgaGF2ZSBhc3NvY2lhdGVkIGBSTm9kZWBzLiBGb3IgZXhhbXBsZSBgUHJvamVjdGlvbmBcbiAqXG4gKiBAcGFyYW0gdE5vZGVcbiAqIEBwYXJhbSBsVmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmF0aXZlQnlUTm9kZU9yTnVsbCh0Tm9kZTogVE5vZGUsIGxWaWV3OiBMVmlldyk6IFJOb2RlfG51bGwge1xuICBjb25zdCBpbmRleCA9IHROb2RlLmluZGV4O1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydFROb2RlRm9yTFZpZXcodE5vZGUsIGxWaWV3KTtcbiAgICBjb25zdCBub2RlOiBSTm9kZXxudWxsID0gdW53cmFwUk5vZGUobFZpZXdbaW5kZXhdKTtcbiAgICBuZ0Rldk1vZGUgJiYgbm9kZSAhPT0gbnVsbCAmJiAhaXNQcm9jZWR1cmFsUmVuZGVyZXIobFZpZXdbUkVOREVSRVJdKSAmJiBhc3NlcnREb21Ob2RlKG5vZGUpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUTm9kZSh0VmlldzogVFZpZXcsIGluZGV4OiBudW1iZXIpOiBUTm9kZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRHcmVhdGVyVGhhbihpbmRleCwgLTEsICd3cm9uZyBpbmRleCBmb3IgVE5vZGUnKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExlc3NUaGFuKGluZGV4LCB0Vmlldy5kYXRhLmxlbmd0aCwgJ3dyb25nIGluZGV4IGZvciBUTm9kZScpO1xuICByZXR1cm4gdFZpZXcuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdIGFzIFROb2RlO1xufVxuXG4vKiogUmV0cmlldmVzIGEgdmFsdWUgZnJvbSBhbnkgYExWaWV3YCBvciBgVERhdGFgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWQ8VD4odmlldzogTFZpZXd8VERhdGEsIGluZGV4OiBudW1iZXIpOiBUIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERhdGFJblJhbmdlKHZpZXcsIGluZGV4ICsgSEVBREVSX09GRlNFVCk7XG4gIHJldHVybiB2aWV3W2luZGV4ICsgSEVBREVSX09GRlNFVF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRMVmlld0J5SW5kZXgobm9kZUluZGV4OiBudW1iZXIsIGhvc3RWaWV3OiBMVmlldyk6IExWaWV3IHtcbiAgLy8gQ291bGQgYmUgYW4gTFZpZXcgb3IgYW4gTENvbnRhaW5lci4gSWYgTENvbnRhaW5lciwgdW53cmFwIHRvIGZpbmQgTFZpZXcuXG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREYXRhSW5SYW5nZShob3N0Vmlldywgbm9kZUluZGV4KTtcbiAgY29uc3Qgc2xvdFZhbHVlID0gaG9zdFZpZXdbbm9kZUluZGV4XTtcbiAgY29uc3QgbFZpZXcgPSBpc0xWaWV3KHNsb3RWYWx1ZSkgPyBzbG90VmFsdWUgOiBzbG90VmFsdWVbSE9TVF07XG4gIHJldHVybiBsVmlldztcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1vbmtleS1wYXRjaCB2YWx1ZSBkYXRhIHByZXNlbnQgb24gdGhlIHRhcmdldCAod2hpY2ggY291bGQgYmVcbiAqIGEgY29tcG9uZW50LCBkaXJlY3RpdmUgb3IgYSBET00gbm9kZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGF0Y2hlZERhdGEodGFyZ2V0OiBhbnkpOiBMVmlld3xMQ29udGV4dHxudWxsIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodGFyZ2V0LCAnVGFyZ2V0IGV4cGVjdGVkJyk7XG4gIHJldHVybiB0YXJnZXRbTU9OS0VZX1BBVENIX0tFWV9OQU1FXSB8fCBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBhdGNoZWRMVmlldyh0YXJnZXQ6IGFueSk6IExWaWV3fG51bGwge1xuICBjb25zdCB2YWx1ZSA9IHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQpO1xuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6ICh2YWx1ZSBhcyBMQ29udGV4dCkubFZpZXc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBDaGVja3Mgd2hldGhlciBhIGdpdmVuIHZpZXcgaXMgaW4gY3JlYXRpb24gbW9kZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ3JlYXRpb25Nb2RlKHZpZXc6IExWaWV3KTogYm9vbGVhbiB7XG4gIHJldHVybiAodmlld1tGTEFHU10gJiBMVmlld0ZsYWdzLkNyZWF0aW9uTW9kZSkgPT09IExWaWV3RmxhZ3MuQ3JlYXRpb25Nb2RlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBib29sZWFuIGZvciB3aGV0aGVyIHRoZSB2aWV3IGlzIGF0dGFjaGVkIHRvIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIHRyZWUuXG4gKlxuICogTm90ZTogVGhpcyBkZXRlcm1pbmVzIHdoZXRoZXIgYSB2aWV3IHNob3VsZCBiZSBjaGVja2VkLCBub3Qgd2hldGhlciBpdCdzIGluc2VydGVkXG4gKiBpbnRvIGEgY29udGFpbmVyLiBGb3IgdGhhdCwgeW91J2xsIHdhbnQgYHZpZXdBdHRhY2hlZFRvQ29udGFpbmVyYCBiZWxvdy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZpZXdBdHRhY2hlZFRvQ2hhbmdlRGV0ZWN0b3IodmlldzogTFZpZXcpOiBib29sZWFuIHtcbiAgcmV0dXJuICh2aWV3W0ZMQUdTXSAmIExWaWV3RmxhZ3MuQXR0YWNoZWQpID09PSBMVmlld0ZsYWdzLkF0dGFjaGVkO1xufVxuXG4vKiogUmV0dXJucyBhIGJvb2xlYW4gZm9yIHdoZXRoZXIgdGhlIHZpZXcgaXMgYXR0YWNoZWQgdG8gYSBjb250YWluZXIuICovXG5leHBvcnQgZnVuY3Rpb24gdmlld0F0dGFjaGVkVG9Db250YWluZXIodmlldzogTFZpZXcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGlzTENvbnRhaW5lcih2aWV3W1BBUkVOVF0pO1xufVxuXG4vKiogUmV0dXJucyBhIGNvbnN0YW50IGZyb20gYFRDb25zdGFudHNgIGluc3RhbmNlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnN0YW50PFQ+KGNvbnN0czogVENvbnN0YW50c3xudWxsLCBpbmRleDogbnVtYmVyfG51bGx8dW5kZWZpbmVkKTogVHxudWxsIHtcbiAgcmV0dXJuIGNvbnN0cyA9PT0gbnVsbCB8fCBpbmRleCA9PSBudWxsID8gbnVsbCA6IGNvbnN0c1tpbmRleF0gYXMgdW5rbm93biBhcyBUO1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgcHJlLW9yZGVyIGhvb2sgZmxhZ3Mgb2YgdGhlIHZpZXcuXG4gKiBAcGFyYW0gbFZpZXcgdGhlIExWaWV3IG9uIHdoaWNoIHRoZSBmbGFncyBhcmUgcmVzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0UHJlT3JkZXJIb29rRmxhZ3MobFZpZXc6IExWaWV3KSB7XG4gIGxWaWV3W1BSRU9SREVSX0hPT0tfRkxBR1NdID0gMDtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBgVFJBTlNQTEFOVEVEX1ZJRVdTX1RPX1JFRlJFU0hgIGNvdW50ZXIgb24gdGhlIGBMQ29udGFpbmVyYCBhcyB3ZWxsIGFzIHRoZSBwYXJlbnRzXG4gKiB3aG9zZVxuICogIDEuIGNvdW50ZXIgZ29lcyBmcm9tIDAgdG8gMSwgaW5kaWNhdGluZyB0aGF0IHRoZXJlIGlzIGEgbmV3IGNoaWxkIHRoYXQgaGFzIGEgdmlldyB0byByZWZyZXNoXG4gKiAgb3JcbiAqICAyLiBjb3VudGVyIGdvZXMgZnJvbSAxIHRvIDAsIGluZGljYXRpbmcgdGhlcmUgYXJlIG5vIG1vcmUgZGVzY2VuZGFudCB2aWV3cyB0byByZWZyZXNoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVUcmFuc3BsYW50ZWRWaWV3Q291bnQobENvbnRhaW5lcjogTENvbnRhaW5lciwgYW1vdW50OiAxfC0gMSkge1xuICBsQ29udGFpbmVyW1RSQU5TUExBTlRFRF9WSUVXU19UT19SRUZSRVNIXSArPSBhbW91bnQ7XG4gIGxldCB2aWV3T3JDb250YWluZXI6IExWaWV3fExDb250YWluZXIgPSBsQ29udGFpbmVyO1xuICBsZXQgcGFyZW50OiBMVmlld3xMQ29udGFpbmVyfG51bGwgPSBsQ29udGFpbmVyW1BBUkVOVF07XG4gIHdoaWxlIChwYXJlbnQgIT09IG51bGwgJiZcbiAgICAgICAgICgoYW1vdW50ID09PSAxICYmIHZpZXdPckNvbnRhaW5lcltUUkFOU1BMQU5URURfVklFV1NfVE9fUkVGUkVTSF0gPT09IDEpIHx8XG4gICAgICAgICAgKGFtb3VudCA9PT0gLTEgJiYgdmlld09yQ29udGFpbmVyW1RSQU5TUExBTlRFRF9WSUVXU19UT19SRUZSRVNIXSA9PT0gMCkpKSB7XG4gICAgcGFyZW50W1RSQU5TUExBTlRFRF9WSUVXU19UT19SRUZSRVNIXSArPSBhbW91bnQ7XG4gICAgdmlld09yQ29udGFpbmVyID0gcGFyZW50O1xuICAgIHBhcmVudCA9IHBhcmVudFtQQVJFTlRdO1xuICB9XG59XG4iXX0=