/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../util';
import { assertDataInRange, assertDefined, assertGreaterThan, assertLessThan } from './assert';
import { ACTIVE_INDEX } from './interfaces/container';
import { MONKEY_PATCH_KEY_NAME } from './interfaces/context';
import { NO_PARENT_INJECTOR } from './interfaces/injector';
import { CONTEXT, DECLARATION_VIEW, FLAGS, HEADER_OFFSET, HOST, HOST_NODE, PARENT, TVIEW } from './interfaces/view';
/**
 * Returns whether the values are different from a change detection stand point.
 *
 * Constraints are relaxed in checkNoChanges mode. See `devModeEqual` for details.
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function isDifferent(a, b) {
    // NaN is the only value that is not equal to itself so the first
    // test checks if both a and b are not NaN
    return !(a !== a && b !== b) && a !== b;
}
/**
 * @param {?} value
 * @return {?}
 */
export function stringify(value) {
    if (typeof value == 'function')
        return value.name || value;
    if (typeof value == 'string')
        return value;
    if (value == null)
        return '';
    return '' + value;
}
/**
 * Flattens an array in non-recursive way. Input arrays are not modified.
 * @param {?} list
 * @return {?}
 */
export function flatten(list) {
    /** @type {?} */
    const result = [];
    /** @type {?} */
    let i = 0;
    while (i < list.length) {
        /** @type {?} */
        const item = list[i];
        if (Array.isArray(item)) {
            if (item.length > 0) {
                list = item.concat(list.slice(i + 1));
                i = 0;
            }
            else {
                i++;
            }
        }
        else {
            result.push(item);
            i++;
        }
    }
    return result;
}
/**
 * Retrieves a value from any `LView` or `TData`.
 * @template T
 * @param {?} view
 * @param {?} index
 * @return {?}
 */
export function loadInternal(view, index) {
    ngDevMode && assertDataInRange(view, index + HEADER_OFFSET);
    return view[index + HEADER_OFFSET];
}
/**
 * Takes the value of a slot in `LView` and returns the element node.
 *
 * Normally, element nodes are stored flat, but if the node has styles/classes on it,
 * it might be wrapped in a styling context. Or if that node has a directive that injects
 * ViewContainerRef, it may be wrapped in an LContainer. Or if that node is a component,
 * it will be wrapped in LView. It could even have all three, so we keep looping
 * until we find something that isn't an array.
 *
 * @param {?} value The initial value in `LView`
 * @return {?}
 */
export function readElementValue(value) {
    while (Array.isArray(value)) {
        value = (/** @type {?} */ (value[HOST]));
    }
    return value;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 * @param {?} index
 * @param {?} lView
 * @return {?}
 */
export function getNativeByIndex(index, lView) {
    return readElementValue(lView[index + HEADER_OFFSET]);
}
/**
 * @param {?} tNode
 * @param {?} hostView
 * @return {?}
 */
export function getNativeByTNode(tNode, hostView) {
    return readElementValue(hostView[tNode.index]);
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
 * @param {?} nodeIndex
 * @param {?} hostView
 * @return {?}
 */
export function getComponentViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    /** @type {?} */
    const slotValue = hostView[nodeIndex];
    return slotValue.length >= HEADER_OFFSET ? slotValue : slotValue[HOST];
}
/**
 * @param {?} tNode
 * @return {?}
 */
export function isContentQueryHost(tNode) {
    return (tNode.flags & 4 /* hasContentQuery */) !== 0;
}
/**
 * @param {?} tNode
 * @return {?}
 */
export function isComponent(tNode) {
    return (tNode.flags & 1 /* isComponent */) === 1 /* isComponent */;
}
/**
 * @template T
 * @param {?} def
 * @return {?}
 */
export function isComponentDef(def) {
    return ((/** @type {?} */ (def))).template !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isLContainer(value) {
    // Styling contexts are also arrays, but their first index contains an element node
    return Array.isArray(value) && typeof value[ACTIVE_INDEX] === 'number';
}
/**
 * @param {?} target
 * @return {?}
 */
export function isRootView(target) {
    return (target[FLAGS] & 64 /* IsRoot */) !== 0;
}
/**
 * Retrieve the root view from any component by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param {?} target
 * @return {?}
 */
export function getRootView(target) {
    ngDevMode && assertDefined(target, 'component');
    /** @type {?} */
    let lView = Array.isArray(target) ? ((/** @type {?} */ (target))) : (/** @type {?} */ (readPatchedLView(target)));
    while (lView && !(lView[FLAGS] & 64 /* IsRoot */)) {
        lView = (/** @type {?} */ (lView[PARENT]));
    }
    return lView;
}
/**
 * @param {?} viewOrComponent
 * @return {?}
 */
export function getRootContext(viewOrComponent) {
    /** @type {?} */
    const rootView = getRootView(viewOrComponent);
    ngDevMode &&
        assertDefined(rootView[CONTEXT], 'RootView has no context. Perhaps it is disconnected?');
    return (/** @type {?} */ (rootView[CONTEXT]));
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
 * @param {?} parentLocation
 * @return {?}
 */
export function hasParentInjector(parentLocation) {
    return parentLocation !== NO_PARENT_INJECTOR;
}
/**
 * @param {?} parentLocation
 * @return {?}
 */
export function getParentInjectorIndex(parentLocation) {
    return ((/** @type {?} */ ((/** @type {?} */ (parentLocation))))) & 32767 /* InjectorIndexMask */;
}
/**
 * @param {?} parentLocation
 * @return {?}
 */
export function getParentInjectorViewOffset(parentLocation) {
    return ((/** @type {?} */ ((/** @type {?} */ (parentLocation))))) >> 16 /* ViewOffsetShift */;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param {?} location The location of the parent injector, which contains the view offset
 * @param {?} startView The LView instance from which to start walking up the view tree
 * @return {?} The LView instance that contains the parent injector
 */
export function getParentInjectorView(location, startView) {
    /** @type {?} */
    let viewOffset = getParentInjectorViewOffset(location);
    /** @type {?} */
    let parentView = startView;
    // For most cases, the parent injector can be found on the host node (e.g. for component
    // or container), but we must keep the loop here to support the rarer case of deeply nested
    // <ng-template> tags or inline views, where the parent injector might live many views
    // above the child injector.
    while (viewOffset > 0) {
        parentView = (/** @type {?} */ (parentView[DECLARATION_VIEW]));
        viewOffset--;
    }
    return parentView;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the TNode of the parent injector is found.
 *
 * @param {?} location The location of the parent injector, which contains the view offset
 * @param {?} startView The LView instance from which to start walking up the view tree
 * @param {?} startTNode The TNode instance of the starting element
 * @return {?} The TNode of the parent injector
 */
export function getParentInjectorTNode(location, startView, startTNode) {
    if (startTNode.parent && startTNode.parent.injectorIndex !== -1) {
        // view offset is 0
        /** @type {?} */
        const injectorIndex = startTNode.parent.injectorIndex;
        /** @type {?} */
        let parentTNode = startTNode.parent;
        while (parentTNode.parent != null && injectorIndex == parentTNode.injectorIndex) {
            parentTNode = parentTNode.parent;
        }
        return parentTNode;
    }
    /** @type {?} */
    let viewOffset = getParentInjectorViewOffset(location);
    // view offset is 1
    /** @type {?} */
    let parentView = startView;
    /** @type {?} */
    let parentTNode = (/** @type {?} */ (startView[HOST_NODE]));
    // view offset is superior to 1
    while (viewOffset > 1) {
        parentView = (/** @type {?} */ (parentView[DECLARATION_VIEW]));
        parentTNode = (/** @type {?} */ (parentView[HOST_NODE]));
        viewOffset--;
    }
    return parentTNode;
}
/** @type {?} */
export const defaultScheduler = (typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame || // browser only
    setTimeout // everything else
).bind(global);
/**
 * Equivalent to ES6 spread, add each item to an array.
 *
 * @param {?} items The items to add
 * @param {?} arr The array to which you want to add the items
 * @return {?}
 */
export function addAllToArray(items, arr) {
    for (let i = 0; i < items.length; i++) {
        arr.push(items[i]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFL0IsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN0YsT0FBTyxFQUFDLFlBQVksRUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBVyxxQkFBcUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXJFLE9BQU8sRUFBQyxrQkFBa0IsRUFBMEQsTUFBTSx1QkFBdUIsQ0FBQztBQUlsSCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBcUIsTUFBTSxFQUFzQixLQUFLLEVBQVEsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7O0FBU2hLLE1BQU0sVUFBVSxXQUFXLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDeEMsaUVBQWlFO0lBQ2pFLDBDQUEwQztJQUMxQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFVO0lBQ2xDLElBQUksT0FBTyxLQUFLLElBQUksVUFBVTtRQUFFLE9BQU8sS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUM7SUFDM0QsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDM0MsSUFBSSxLQUFLLElBQUksSUFBSTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzdCLE9BQU8sRUFBRSxHQUFHLEtBQUss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QUN6RixVQUFVLENBQWdFLGtCQUFrQjtDQUMzRixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7O0FBUW5CLE1BQU0sVUFBVSxhQUFhLENBQUMsS0FBWSxFQUFFLEdBQVU7SUFDcEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNwQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Z2xvYmFsfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHthc3NlcnREYXRhSW5SYW5nZSwgYXNzZXJ0RGVmaW5lZCwgYXNzZXJ0R3JlYXRlclRoYW4sIGFzc2VydExlc3NUaGFufSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge0FDVElWRV9JTkRFWCwgTENvbnRhaW5lcn0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge0xDb250ZXh0LCBNT05LRVlfUEFUQ0hfS0VZX05BTUV9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250ZXh0JztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBEaXJlY3RpdmVEZWZ9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7Tk9fUEFSRU5UX0lOSkVDVE9SLCBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24sIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbkZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvaW5qZWN0b3InO1xuaW1wb3J0IHtUQ29udGFpbmVyTm9kZSwgVEVsZW1lbnROb2RlLCBUTm9kZSwgVE5vZGVGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSQ29tbWVudCwgUkVsZW1lbnQsIFJUZXh0fSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtTdHlsaW5nQ29udGV4dH0gZnJvbSAnLi9pbnRlcmZhY2VzL3N0eWxpbmcnO1xuaW1wb3J0IHtDT05URVhULCBERUNMQVJBVElPTl9WSUVXLCBGTEFHUywgSEVBREVSX09GRlNFVCwgSE9TVCwgSE9TVF9OT0RFLCBMVmlldywgTFZpZXdGbGFncywgUEFSRU5ULCBSb290Q29udGV4dCwgVERhdGEsIFRWSUVXLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5cblxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHZhbHVlcyBhcmUgZGlmZmVyZW50IGZyb20gYSBjaGFuZ2UgZGV0ZWN0aW9uIHN0YW5kIHBvaW50LlxuICpcbiAqIENvbnN0cmFpbnRzIGFyZSByZWxheGVkIGluIGNoZWNrTm9DaGFuZ2VzIG1vZGUuIFNlZSBgZGV2TW9kZUVxdWFsYCBmb3IgZGV0YWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGlmZmVyZW50KGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIC8vIE5hTiBpcyB0aGUgb25seSB2YWx1ZSB0aGF0IGlzIG5vdCBlcXVhbCB0byBpdHNlbGYgc28gdGhlIGZpcnN0XG4gIC8vIHRlc3QgY2hlY2tzIGlmIGJvdGggYSBhbmQgYiBhcmUgbm90IE5hTlxuICByZXR1cm4gIShhICE9PSBhICYmIGIgIT09IGIpICYmIGEgIT09IGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlLm5hbWUgfHwgdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAnJztcbiAgcmV0dXJuICcnICsgdmFsdWU7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYW4gYXJyYXkgaW4gbm9uLXJlY3Vyc2l2ZSB3YXkuIElucHV0IGFycmF5cyBhcmUgbm90IG1vZGlmaWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihsaXN0OiBhbnlbXSk6IGFueVtdIHtcbiAgY29uc3QgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICBsZXQgaSA9IDA7XG5cbiAgd2hpbGUgKGkgPCBsaXN0Lmxlbmd0aCkge1xuICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2ldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBpZiAoaXRlbS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxpc3QgPSBpdGVtLmNvbmNhdChsaXN0LnNsaWNlKGkgKyAxKSk7XG4gICAgICAgIGkgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogUmV0cmlldmVzIGEgdmFsdWUgZnJvbSBhbnkgYExWaWV3YCBvciBgVERhdGFgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbnRlcm5hbDxUPih2aWV3OiBMVmlldyB8IFREYXRhLCBpbmRleDogbnVtYmVyKTogVCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREYXRhSW5SYW5nZSh2aWV3LCBpbmRleCArIEhFQURFUl9PRkZTRVQpO1xuICByZXR1cm4gdmlld1tpbmRleCArIEhFQURFUl9PRkZTRVRdO1xufVxuXG4vKipcbiAqIFRha2VzIHRoZSB2YWx1ZSBvZiBhIHNsb3QgaW4gYExWaWV3YCBhbmQgcmV0dXJucyB0aGUgZWxlbWVudCBub2RlLlxuICpcbiAqIE5vcm1hbGx5LCBlbGVtZW50IG5vZGVzIGFyZSBzdG9yZWQgZmxhdCwgYnV0IGlmIHRoZSBub2RlIGhhcyBzdHlsZXMvY2xhc3NlcyBvbiBpdCxcbiAqIGl0IG1pZ2h0IGJlIHdyYXBwZWQgaW4gYSBzdHlsaW5nIGNvbnRleHQuIE9yIGlmIHRoYXQgbm9kZSBoYXMgYSBkaXJlY3RpdmUgdGhhdCBpbmplY3RzXG4gKiBWaWV3Q29udGFpbmVyUmVmLCBpdCBtYXkgYmUgd3JhcHBlZCBpbiBhbiBMQ29udGFpbmVyLiBPciBpZiB0aGF0IG5vZGUgaXMgYSBjb21wb25lbnQsXG4gKiBpdCB3aWxsIGJlIHdyYXBwZWQgaW4gTFZpZXcuIEl0IGNvdWxkIGV2ZW4gaGF2ZSBhbGwgdGhyZWUsIHNvIHdlIGtlZXAgbG9vcGluZ1xuICogdW50aWwgd2UgZmluZCBzb21ldGhpbmcgdGhhdCBpc24ndCBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIGluaXRpYWwgdmFsdWUgaW4gYExWaWV3YFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZEVsZW1lbnRWYWx1ZSh2YWx1ZTogUkVsZW1lbnQgfCBTdHlsaW5nQ29udGV4dCB8IExDb250YWluZXIgfCBMVmlldyk6IFJFbGVtZW50IHtcbiAgd2hpbGUgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFsdWUgPSB2YWx1ZVtIT1NUXSBhcyBhbnk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyBhbiBlbGVtZW50IHZhbHVlIGZyb20gdGhlIHByb3ZpZGVkIGB2aWV3RGF0YWAsIGJ5IHVud3JhcHBpbmdcbiAqIGZyb20gYW55IGNvbnRhaW5lcnMsIGNvbXBvbmVudCB2aWV3cywgb3Igc3R5bGUgY29udGV4dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeUluZGV4KGluZGV4OiBudW1iZXIsIGxWaWV3OiBMVmlldyk6IFJFbGVtZW50IHtcbiAgcmV0dXJuIHJlYWRFbGVtZW50VmFsdWUobFZpZXdbaW5kZXggKyBIRUFERVJfT0ZGU0VUXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeVROb2RlKHROb2RlOiBUTm9kZSwgaG9zdFZpZXc6IExWaWV3KTogUkVsZW1lbnR8UlRleHR8UkNvbW1lbnQge1xuICByZXR1cm4gcmVhZEVsZW1lbnRWYWx1ZShob3N0Vmlld1t0Tm9kZS5pbmRleF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VE5vZGUoaW5kZXg6IG51bWJlciwgdmlldzogTFZpZXcpOiBUTm9kZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRHcmVhdGVyVGhhbihpbmRleCwgLTEsICd3cm9uZyBpbmRleCBmb3IgVE5vZGUnKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExlc3NUaGFuKGluZGV4LCB2aWV3W1RWSUVXXS5kYXRhLmxlbmd0aCwgJ3dyb25nIGluZGV4IGZvciBUTm9kZScpO1xuICByZXR1cm4gdmlld1tUVklFV10uZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdIGFzIFROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50Vmlld0J5SW5kZXgobm9kZUluZGV4OiBudW1iZXIsIGhvc3RWaWV3OiBMVmlldyk6IExWaWV3IHtcbiAgLy8gQ291bGQgYmUgYW4gTFZpZXcgb3IgYW4gTENvbnRhaW5lci4gSWYgTENvbnRhaW5lciwgdW53cmFwIHRvIGZpbmQgTFZpZXcuXG4gIGNvbnN0IHNsb3RWYWx1ZSA9IGhvc3RWaWV3W25vZGVJbmRleF07XG4gIHJldHVybiBzbG90VmFsdWUubGVuZ3RoID49IEhFQURFUl9PRkZTRVQgPyBzbG90VmFsdWUgOiBzbG90VmFsdWVbSE9TVF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRlbnRRdWVyeUhvc3QodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiAodE5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmhhc0NvbnRlbnRRdWVyeSkgIT09IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbXBvbmVudCh0Tm9kZTogVE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuICh0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuaXNDb21wb25lbnQpID09PSBUTm9kZUZsYWdzLmlzQ29tcG9uZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnREZWY8VD4oZGVmOiBEaXJlY3RpdmVEZWY8VD4pOiBkZWYgaXMgQ29tcG9uZW50RGVmPFQ+IHtcbiAgcmV0dXJuIChkZWYgYXMgQ29tcG9uZW50RGVmPFQ+KS50ZW1wbGF0ZSAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTENvbnRhaW5lcih2YWx1ZTogUkVsZW1lbnQgfCBSQ29tbWVudCB8IExDb250YWluZXIgfCBTdHlsaW5nQ29udGV4dCk6IGJvb2xlYW4ge1xuICAvLyBTdHlsaW5nIGNvbnRleHRzIGFyZSBhbHNvIGFycmF5cywgYnV0IHRoZWlyIGZpcnN0IGluZGV4IGNvbnRhaW5zIGFuIGVsZW1lbnQgbm9kZVxuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlW0FDVElWRV9JTkRFWF0gPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSb290Vmlldyh0YXJnZXQ6IExWaWV3KTogYm9vbGVhbiB7XG4gIHJldHVybiAodGFyZ2V0W0ZMQUdTXSAmIExWaWV3RmxhZ3MuSXNSb290KSAhPT0gMDtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgcm9vdCB2aWV3IGZyb20gYW55IGNvbXBvbmVudCBieSB3YWxraW5nIHRoZSBwYXJlbnQgYExWaWV3YCB1bnRpbFxuICogcmVhY2hpbmcgdGhlIHJvb3QgYExWaWV3YC5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50IGFueSBjb21wb25lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RWaWV3KHRhcmdldDogTFZpZXcgfCB7fSk6IExWaWV3IHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodGFyZ2V0LCAnY29tcG9uZW50Jyk7XG4gIGxldCBsVmlldyA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KSA/ICh0YXJnZXQgYXMgTFZpZXcpIDogcmVhZFBhdGNoZWRMVmlldyh0YXJnZXQpICE7XG4gIHdoaWxlIChsVmlldyAmJiAhKGxWaWV3W0ZMQUdTXSAmIExWaWV3RmxhZ3MuSXNSb290KSkge1xuICAgIGxWaWV3ID0gbFZpZXdbUEFSRU5UXSAhO1xuICB9XG4gIHJldHVybiBsVmlldztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RDb250ZXh0KHZpZXdPckNvbXBvbmVudDogTFZpZXcgfCB7fSk6IFJvb3RDb250ZXh0IHtcbiAgY29uc3Qgcm9vdFZpZXcgPSBnZXRSb290Vmlldyh2aWV3T3JDb21wb25lbnQpO1xuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydERlZmluZWQocm9vdFZpZXdbQ09OVEVYVF0sICdSb290VmlldyBoYXMgbm8gY29udGV4dC4gUGVyaGFwcyBpdCBpcyBkaXNjb25uZWN0ZWQ/Jyk7XG4gIHJldHVybiByb290Vmlld1tDT05URVhUXSBhcyBSb290Q29udGV4dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtb25rZXktcGF0Y2ggdmFsdWUgZGF0YSBwcmVzZW50IG9uIHRoZSB0YXJnZXQgKHdoaWNoIGNvdWxkIGJlXG4gKiBhIGNvbXBvbmVudCwgZGlyZWN0aXZlIG9yIGEgRE9NIG5vZGUpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBhdGNoZWREYXRhKHRhcmdldDogYW55KTogTFZpZXd8TENvbnRleHR8bnVsbCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRhcmdldCwgJ1RhcmdldCBleHBlY3RlZCcpO1xuICByZXR1cm4gdGFyZ2V0W01PTktFWV9QQVRDSF9LRVlfTkFNRV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGF0Y2hlZExWaWV3KHRhcmdldDogYW55KTogTFZpZXd8bnVsbCB7XG4gIGNvbnN0IHZhbHVlID0gcmVhZFBhdGNoZWREYXRhKHRhcmdldCk7XG4gIGlmICh2YWx1ZSkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogKHZhbHVlIGFzIExDb250ZXh0KS5sVmlldztcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1BhcmVudEluamVjdG9yKHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuIHBhcmVudExvY2F0aW9uICE9PSBOT19QQVJFTlRfSU5KRUNUT1I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvckluZGV4KHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24pOiBudW1iZXIge1xuICByZXR1cm4gKHBhcmVudExvY2F0aW9uIGFzIGFueSBhcyBudW1iZXIpICYgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3MuSW5qZWN0b3JJbmRleE1hc2s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvclZpZXdPZmZzZXQocGFyZW50TG9jYXRpb246IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbik6IG51bWJlciB7XG4gIHJldHVybiAocGFyZW50TG9jYXRpb24gYXMgYW55IGFzIG51bWJlcikgPj4gUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3MuVmlld09mZnNldFNoaWZ0O1xufVxuXG4vKipcbiAqIFVud3JhcHMgYSBwYXJlbnQgaW5qZWN0b3IgbG9jYXRpb24gbnVtYmVyIHRvIGZpbmQgdGhlIHZpZXcgb2Zmc2V0IGZyb20gdGhlIGN1cnJlbnQgaW5qZWN0b3IsXG4gKiB0aGVuIHdhbGtzIHVwIHRoZSBkZWNsYXJhdGlvbiB2aWV3IHRyZWUgdW50aWwgdGhlIHZpZXcgaXMgZm91bmQgdGhhdCBjb250YWlucyB0aGUgcGFyZW50XG4gKiBpbmplY3Rvci5cbiAqXG4gKiBAcGFyYW0gbG9jYXRpb24gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJlbnQgaW5qZWN0b3IsIHdoaWNoIGNvbnRhaW5zIHRoZSB2aWV3IG9mZnNldFxuICogQHBhcmFtIHN0YXJ0VmlldyBUaGUgTFZpZXcgaW5zdGFuY2UgZnJvbSB3aGljaCB0byBzdGFydCB3YWxraW5nIHVwIHRoZSB2aWV3IHRyZWVcbiAqIEByZXR1cm5zIFRoZSBMVmlldyBpbnN0YW5jZSB0aGF0IGNvbnRhaW5zIHRoZSBwYXJlbnQgaW5qZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudEluamVjdG9yVmlldyhsb2NhdGlvbjogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uLCBzdGFydFZpZXc6IExWaWV3KTogTFZpZXcge1xuICBsZXQgdmlld09mZnNldCA9IGdldFBhcmVudEluamVjdG9yVmlld09mZnNldChsb2NhdGlvbik7XG4gIGxldCBwYXJlbnRWaWV3ID0gc3RhcnRWaWV3O1xuICAvLyBGb3IgbW9zdCBjYXNlcywgdGhlIHBhcmVudCBpbmplY3RvciBjYW4gYmUgZm91bmQgb24gdGhlIGhvc3Qgbm9kZSAoZS5nLiBmb3IgY29tcG9uZW50XG4gIC8vIG9yIGNvbnRhaW5lciksIGJ1dCB3ZSBtdXN0IGtlZXAgdGhlIGxvb3AgaGVyZSB0byBzdXBwb3J0IHRoZSByYXJlciBjYXNlIG9mIGRlZXBseSBuZXN0ZWRcbiAgLy8gPG5nLXRlbXBsYXRlPiB0YWdzIG9yIGlubGluZSB2aWV3cywgd2hlcmUgdGhlIHBhcmVudCBpbmplY3RvciBtaWdodCBsaXZlIG1hbnkgdmlld3NcbiAgLy8gYWJvdmUgdGhlIGNoaWxkIGluamVjdG9yLlxuICB3aGlsZSAodmlld09mZnNldCA+IDApIHtcbiAgICBwYXJlbnRWaWV3ID0gcGFyZW50Vmlld1tERUNMQVJBVElPTl9WSUVXXSAhO1xuICAgIHZpZXdPZmZzZXQtLTtcbiAgfVxuICByZXR1cm4gcGFyZW50Vmlldztcbn1cblxuLyoqXG4gKiBVbndyYXBzIGEgcGFyZW50IGluamVjdG9yIGxvY2F0aW9uIG51bWJlciB0byBmaW5kIHRoZSB2aWV3IG9mZnNldCBmcm9tIHRoZSBjdXJyZW50IGluamVjdG9yLFxuICogdGhlbiB3YWxrcyB1cCB0aGUgZGVjbGFyYXRpb24gdmlldyB0cmVlIHVudGlsIHRoZSBUTm9kZSBvZiB0aGUgcGFyZW50IGluamVjdG9yIGlzIGZvdW5kLlxuICpcbiAqIEBwYXJhbSBsb2NhdGlvbiBUaGUgbG9jYXRpb24gb2YgdGhlIHBhcmVudCBpbmplY3Rvciwgd2hpY2ggY29udGFpbnMgdGhlIHZpZXcgb2Zmc2V0XG4gKiBAcGFyYW0gc3RhcnRWaWV3IFRoZSBMVmlldyBpbnN0YW5jZSBmcm9tIHdoaWNoIHRvIHN0YXJ0IHdhbGtpbmcgdXAgdGhlIHZpZXcgdHJlZVxuICogQHBhcmFtIHN0YXJ0VE5vZGUgVGhlIFROb2RlIGluc3RhbmNlIG9mIHRoZSBzdGFydGluZyBlbGVtZW50XG4gKiBAcmV0dXJucyBUaGUgVE5vZGUgb2YgdGhlIHBhcmVudCBpbmplY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SW5qZWN0b3JUTm9kZShcbiAgICBsb2NhdGlvbjogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uLCBzdGFydFZpZXc6IExWaWV3LCBzdGFydFROb2RlOiBUTm9kZSk6IFRFbGVtZW50Tm9kZXxcbiAgICBUQ29udGFpbmVyTm9kZXxudWxsIHtcbiAgaWYgKHN0YXJ0VE5vZGUucGFyZW50ICYmIHN0YXJ0VE5vZGUucGFyZW50LmluamVjdG9ySW5kZXggIT09IC0xKSB7XG4gICAgLy8gdmlldyBvZmZzZXQgaXMgMFxuICAgIGNvbnN0IGluamVjdG9ySW5kZXggPSBzdGFydFROb2RlLnBhcmVudC5pbmplY3RvckluZGV4O1xuICAgIGxldCBwYXJlbnRUTm9kZSA9IHN0YXJ0VE5vZGUucGFyZW50O1xuICAgIHdoaWxlIChwYXJlbnRUTm9kZS5wYXJlbnQgIT0gbnVsbCAmJiBpbmplY3RvckluZGV4ID09IHBhcmVudFROb2RlLmluamVjdG9ySW5kZXgpIHtcbiAgICAgIHBhcmVudFROb2RlID0gcGFyZW50VE5vZGUucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gcGFyZW50VE5vZGU7XG4gIH1cblxuICBsZXQgdmlld09mZnNldCA9IGdldFBhcmVudEluamVjdG9yVmlld09mZnNldChsb2NhdGlvbik7XG4gIC8vIHZpZXcgb2Zmc2V0IGlzIDFcbiAgbGV0IHBhcmVudFZpZXcgPSBzdGFydFZpZXc7XG4gIGxldCBwYXJlbnRUTm9kZSA9IHN0YXJ0Vmlld1tIT1NUX05PREVdIGFzIFRFbGVtZW50Tm9kZTtcblxuICAvLyB2aWV3IG9mZnNldCBpcyBzdXBlcmlvciB0byAxXG4gIHdoaWxlICh2aWV3T2Zmc2V0ID4gMSkge1xuICAgIHBhcmVudFZpZXcgPSBwYXJlbnRWaWV3W0RFQ0xBUkFUSU9OX1ZJRVddICE7XG4gICAgcGFyZW50VE5vZGUgPSBwYXJlbnRWaWV3W0hPU1RfTk9ERV0gYXMgVEVsZW1lbnROb2RlO1xuICAgIHZpZXdPZmZzZXQtLTtcbiAgfVxuICByZXR1cm4gcGFyZW50VE5vZGU7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U2NoZWR1bGVyID1cbiAgICAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICAvLyBicm93c2VyIG9ubHlcbiAgICAgc2V0VGltZW91dCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgKS5iaW5kKGdsb2JhbCk7XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBFUzYgc3ByZWFkLCBhZGQgZWFjaCBpdGVtIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSBpdGVtcyBUaGUgaXRlbXMgdG8gYWRkXG4gKiBAcGFyYW0gYXJyIFRoZSBhcnJheSB0byB3aGljaCB5b3Ugd2FudCB0byBhZGQgdGhlIGl0ZW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRBbGxUb0FycmF5KGl0ZW1zOiBhbnlbXSwgYXJyOiBhbnlbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyLnB1c2goaXRlbXNbaV0pO1xuICB9XG59XG4iXX0=