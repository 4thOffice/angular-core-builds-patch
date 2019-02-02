/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDataInRange, assertDefined, assertGreaterThan, assertLessThan } from '../util/assert';
import { global } from '../util/global';
import { LCONTAINER_LENGTH } from './interfaces/container';
import { MONKEY_PATCH_KEY_NAME } from './interfaces/context';
import { NO_PARENT_INJECTOR } from './interfaces/injector';
import { CONTEXT, DECLARATION_VIEW, FLAGS, HEADER_OFFSET, HOST, HOST_NODE, PARENT, TVIEW } from './interfaces/view';
/**
 * Returns whether the values are different from a change detection stand point.
 *
 * Constraints are relaxed in checkNoChanges mode. See `devModeEqual` for details.
 */
export function isDifferent(a, b) {
    // NaN is the only value that is not equal to itself so the first
    // test checks if both a and b are not NaN
    return !(a !== a && b !== b) && a !== b;
}
/**
 * Used for stringify render output in Ivy.
 */
export function renderStringify(value) {
    if (typeof value == 'function')
        return value.name || value;
    if (typeof value == 'string')
        return value;
    if (value == null)
        return '';
    if (typeof value == 'object' && typeof value.type == 'function')
        return value.type.name || value.type;
    return '' + value;
}
/**
 * Flattens an array in non-recursive way. Input arrays are not modified.
 */
export function flatten(list) {
    var result = [];
    var i = 0;
    while (i < list.length) {
        var item = list[i];
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
/** Retrieves a value from any `LView` or `TData`. */
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
 * @param value The initial value in `LView`
 */
export function readElementValue(value) {
    while (Array.isArray(value)) {
        value = value[HOST];
    }
    return value;
}
/**
 * Retrieves an element value from the provided `viewData`, by unwrapping
 * from any containers, component views, or style contexts.
 */
export function getNativeByIndex(index, lView) {
    return readElementValue(lView[index + HEADER_OFFSET]);
}
export function getNativeByTNode(tNode, hostView) {
    return readElementValue(hostView[tNode.index]);
}
export function getTNode(index, view) {
    ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
    ngDevMode && assertLessThan(index, view[TVIEW].data.length, 'wrong index for TNode');
    return view[TVIEW].data[index + HEADER_OFFSET];
}
export function getComponentViewByIndex(nodeIndex, hostView) {
    // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
    var slotValue = hostView[nodeIndex];
    return slotValue.length >= HEADER_OFFSET ? slotValue : slotValue[HOST];
}
export function isContentQueryHost(tNode) {
    return (tNode.flags & 4 /* hasContentQuery */) !== 0;
}
export function isComponent(tNode) {
    return (tNode.flags & 1 /* isComponent */) === 1 /* isComponent */;
}
export function isComponentDef(def) {
    return def.template !== null;
}
export function isLContainer(value) {
    // Styling contexts are also arrays, but their first index contains an element node
    return Array.isArray(value) && value.length === LCONTAINER_LENGTH;
}
export function isRootView(target) {
    return (target[FLAGS] & 512 /* IsRoot */) !== 0;
}
/**
 * Retrieve the root view from any component by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param component any component
 */
export function getRootView(target) {
    ngDevMode && assertDefined(target, 'component');
    var lView = Array.isArray(target) ? target : readPatchedLView(target);
    while (lView && !(lView[FLAGS] & 512 /* IsRoot */)) {
        lView = lView[PARENT];
    }
    return lView;
}
export function getRootContext(viewOrComponent) {
    var rootView = getRootView(viewOrComponent);
    ngDevMode &&
        assertDefined(rootView[CONTEXT], 'RootView has no context. Perhaps it is disconnected?');
    return rootView[CONTEXT];
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
export function readPatchedData(target) {
    ngDevMode && assertDefined(target, 'Target expected');
    return target[MONKEY_PATCH_KEY_NAME];
}
export function readPatchedLView(target) {
    var value = readPatchedData(target);
    if (value) {
        return Array.isArray(value) ? value : value.lView;
    }
    return null;
}
export function hasParentInjector(parentLocation) {
    return parentLocation !== NO_PARENT_INJECTOR;
}
export function getParentInjectorIndex(parentLocation) {
    return parentLocation & 32767 /* InjectorIndexMask */;
}
export function getParentInjectorViewOffset(parentLocation) {
    return parentLocation >> 16 /* ViewOffsetShift */;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the view is found that contains the parent
 * injector.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @returns The LView instance that contains the parent injector
 */
export function getParentInjectorView(location, startView) {
    var viewOffset = getParentInjectorViewOffset(location);
    var parentView = startView;
    // For most cases, the parent injector can be found on the host node (e.g. for component
    // or container), but we must keep the loop here to support the rarer case of deeply nested
    // <ng-template> tags or inline views, where the parent injector might live many views
    // above the child injector.
    while (viewOffset > 0) {
        parentView = parentView[DECLARATION_VIEW];
        viewOffset--;
    }
    return parentView;
}
/**
 * Unwraps a parent injector location number to find the view offset from the current injector,
 * then walks up the declaration view tree until the TNode of the parent injector is found.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @param startTNode The TNode instance of the starting element
 * @returns The TNode of the parent injector
 */
export function getParentInjectorTNode(location, startView, startTNode) {
    if (startTNode.parent && startTNode.parent.injectorIndex !== -1) {
        // view offset is 0
        var injectorIndex = startTNode.parent.injectorIndex;
        var parentTNode_1 = startTNode.parent;
        while (parentTNode_1.parent != null && injectorIndex == parentTNode_1.injectorIndex) {
            parentTNode_1 = parentTNode_1.parent;
        }
        return parentTNode_1;
    }
    var viewOffset = getParentInjectorViewOffset(location);
    // view offset is 1
    var parentView = startView;
    var parentTNode = startView[HOST_NODE];
    // view offset is superior to 1
    while (viewOffset > 1) {
        parentView = parentView[DECLARATION_VIEW];
        parentTNode = parentView[HOST_NODE];
        viewOffset--;
    }
    return parentTNode;
}
export var defaultScheduler = (typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame || // browser only
    setTimeout // everything else
).bind(global);
/**
 * Equivalent to ES6 spread, add each item to an array.
 *
 * @param items The items to add
 * @param arr The array to which you want to add the items
 */
export function addAllToArray(items, arr) {
    for (var i = 0; i < items.length; i++) {
        arr.push(items[i]);
    }
}
/**
 * Given a current view, finds the nearest component's host (LElement).
 *
 * @param lView LView for which we want a host element node
 * @returns The host node
 */
export function findComponentView(lView) {
    var rootTNode = lView[HOST_NODE];
    while (rootTNode && rootTNode.type === 2 /* View */) {
        ngDevMode && assertDefined(lView[DECLARATION_VIEW], 'lView[DECLARATION_VIEW]');
        lView = lView[DECLARATION_VIEW];
        rootTNode = lView[HOST_NODE];
    }
    return lView;
}
export function resolveWindow(element) {
    return { name: 'window', target: element.ownerDocument.defaultView };
}
export function resolveDocument(element) {
    return { name: 'document', target: element.ownerDocument };
}
export function resolveBody(element) {
    return { name: 'body', target: element.ownerDocument.body };
}
/**
 * The special delimiter we use to separate property names, prefixes, and suffixes
 * in property binding metadata. See storeBindingMetadata().
 *
 * We intentionally use the Unicode "REPLACEMENT CHARACTER" (U+FFFD) as a delimiter
 * because it is a very uncommon character that is unlikely to be part of a user's
 * property names or interpolation strings. If it is in fact used in a property
 * binding, DebugElement.properties will not return the correct value for that
 * binding. However, there should be no runtime effect for real applications.
 *
 * This character is typically rendered as a question mark inside of a diamond.
 * See https://en.wikipedia.org/wiki/Specials_(Unicode_block)
 *
 */
export var INTERPOLATION_DELIMITER = "\uFFFD";
/**
 * Determines whether or not the given string is a property metadata string.
 * See storeBindingMetadata().
 */
export function isPropMetadataString(str) {
    return str.indexOf(INTERPOLATION_DELIMITER) >= 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25HLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQWEsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRSxPQUFPLEVBQVcscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRSxPQUFPLEVBQUMsa0JBQWtCLEVBQTBELE1BQU0sdUJBQXVCLENBQUM7QUFJbEgsT0FBTyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQXFCLE1BQU0sRUFBc0IsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFHaEs7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDeEMsaUVBQWlFO0lBQ2pFLDBDQUEwQztJQUMxQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBVTtJQUN4QyxJQUFJLE9BQU8sS0FBSyxJQUFJLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDO0lBQzNELElBQUksT0FBTyxLQUFLLElBQUksUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzNDLElBQUksS0FBSyxJQUFJLElBQUk7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QUFFLE9BQU8sQ0FBQyxhQUFhLEVBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxPQUE2QztJQUN2RSxPQUFPLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFHLFFBQUcsQ0FBQztBQUUzQzs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsR0FBVztJQUM5QyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnREYXRhSW5SYW5nZSwgYXNzZXJ0RGVmaW5lZCwgYXNzZXJ0R3JlYXRlclRoYW4sIGFzc2VydExlc3NUaGFufSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi4vdXRpbC9nbG9iYWwnO1xuXG5pbXBvcnQge0xDT05UQUlORVJfTEVOR1RILCBMQ29udGFpbmVyfSBmcm9tICcuL2ludGVyZmFjZXMvY29udGFpbmVyJztcbmltcG9ydCB7TENvbnRleHQsIE1PTktFWV9QQVRDSF9LRVlfTkFNRX0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbnRleHQnO1xuaW1wb3J0IHtDb21wb25lbnREZWYsIERpcmVjdGl2ZURlZn0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtOT19QQVJFTlRfSU5KRUNUT1IsIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbiwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9pbmplY3Rvcic7XG5pbXBvcnQge1RDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFROb2RlLCBUTm9kZUZsYWdzLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UkNvbW1lbnQsIFJFbGVtZW50LCBSVGV4dH0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlbmRlcmVyJztcbmltcG9ydCB7U3R5bGluZ0NvbnRleHR9IGZyb20gJy4vaW50ZXJmYWNlcy9zdHlsaW5nJztcbmltcG9ydCB7Q09OVEVYVCwgREVDTEFSQVRJT05fVklFVywgRkxBR1MsIEhFQURFUl9PRkZTRVQsIEhPU1QsIEhPU1RfTk9ERSwgTFZpZXcsIExWaWV3RmxhZ3MsIFBBUkVOVCwgUm9vdENvbnRleHQsIFREYXRhLCBUVklFVywgVFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcblxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWVzIGFyZSBkaWZmZXJlbnQgZnJvbSBhIGNoYW5nZSBkZXRlY3Rpb24gc3RhbmQgcG9pbnQuXG4gKlxuICogQ29uc3RyYWludHMgYXJlIHJlbGF4ZWQgaW4gY2hlY2tOb0NoYW5nZXMgbW9kZS4gU2VlIGBkZXZNb2RlRXF1YWxgIGZvciBkZXRhaWxzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEaWZmZXJlbnQoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgLy8gTmFOIGlzIHRoZSBvbmx5IHZhbHVlIHRoYXQgaXMgbm90IGVxdWFsIHRvIGl0c2VsZiBzbyB0aGUgZmlyc3RcbiAgLy8gdGVzdCBjaGVja3MgaWYgYm90aCBhIGFuZCBiIGFyZSBub3QgTmFOXG4gIHJldHVybiAhKGEgIT09IGEgJiYgYiAhPT0gYikgJiYgYSAhPT0gYjtcbn1cblxuLyoqXG4gKiBVc2VkIGZvciBzdHJpbmdpZnkgcmVuZGVyIG91dHB1dCBpbiBJdnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTdHJpbmdpZnkodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHZhbHVlLm5hbWUgfHwgdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudHlwZSA9PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB2YWx1ZS50eXBlLm5hbWUgfHwgdmFsdWUudHlwZTtcbiAgcmV0dXJuICcnICsgdmFsdWU7XG59XG5cbi8qKlxuICogRmxhdHRlbnMgYW4gYXJyYXkgaW4gbm9uLXJlY3Vyc2l2ZSB3YXkuIElucHV0IGFycmF5cyBhcmUgbm90IG1vZGlmaWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbihsaXN0OiBhbnlbXSk6IGFueVtdIHtcbiAgY29uc3QgcmVzdWx0OiBhbnlbXSA9IFtdO1xuICBsZXQgaSA9IDA7XG5cbiAgd2hpbGUgKGkgPCBsaXN0Lmxlbmd0aCkge1xuICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2ldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBpZiAoaXRlbS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxpc3QgPSBpdGVtLmNvbmNhdChsaXN0LnNsaWNlKGkgKyAxKSk7XG4gICAgICAgIGkgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgIGkrKztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogUmV0cmlldmVzIGEgdmFsdWUgZnJvbSBhbnkgYExWaWV3YCBvciBgVERhdGFgLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbnRlcm5hbDxUPih2aWV3OiBMVmlldyB8IFREYXRhLCBpbmRleDogbnVtYmVyKTogVCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREYXRhSW5SYW5nZSh2aWV3LCBpbmRleCArIEhFQURFUl9PRkZTRVQpO1xuICByZXR1cm4gdmlld1tpbmRleCArIEhFQURFUl9PRkZTRVRdO1xufVxuXG4vKipcbiAqIFRha2VzIHRoZSB2YWx1ZSBvZiBhIHNsb3QgaW4gYExWaWV3YCBhbmQgcmV0dXJucyB0aGUgZWxlbWVudCBub2RlLlxuICpcbiAqIE5vcm1hbGx5LCBlbGVtZW50IG5vZGVzIGFyZSBzdG9yZWQgZmxhdCwgYnV0IGlmIHRoZSBub2RlIGhhcyBzdHlsZXMvY2xhc3NlcyBvbiBpdCxcbiAqIGl0IG1pZ2h0IGJlIHdyYXBwZWQgaW4gYSBzdHlsaW5nIGNvbnRleHQuIE9yIGlmIHRoYXQgbm9kZSBoYXMgYSBkaXJlY3RpdmUgdGhhdCBpbmplY3RzXG4gKiBWaWV3Q29udGFpbmVyUmVmLCBpdCBtYXkgYmUgd3JhcHBlZCBpbiBhbiBMQ29udGFpbmVyLiBPciBpZiB0aGF0IG5vZGUgaXMgYSBjb21wb25lbnQsXG4gKiBpdCB3aWxsIGJlIHdyYXBwZWQgaW4gTFZpZXcuIEl0IGNvdWxkIGV2ZW4gaGF2ZSBhbGwgdGhyZWUsIHNvIHdlIGtlZXAgbG9vcGluZ1xuICogdW50aWwgd2UgZmluZCBzb21ldGhpbmcgdGhhdCBpc24ndCBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIGluaXRpYWwgdmFsdWUgaW4gYExWaWV3YFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVhZEVsZW1lbnRWYWx1ZSh2YWx1ZTogUkVsZW1lbnQgfCBTdHlsaW5nQ29udGV4dCB8IExDb250YWluZXIgfCBMVmlldyk6IFJFbGVtZW50IHtcbiAgd2hpbGUgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFsdWUgPSB2YWx1ZVtIT1NUXSBhcyBhbnk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFJldHJpZXZlcyBhbiBlbGVtZW50IHZhbHVlIGZyb20gdGhlIHByb3ZpZGVkIGB2aWV3RGF0YWAsIGJ5IHVud3JhcHBpbmdcbiAqIGZyb20gYW55IGNvbnRhaW5lcnMsIGNvbXBvbmVudCB2aWV3cywgb3Igc3R5bGUgY29udGV4dHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeUluZGV4KGluZGV4OiBudW1iZXIsIGxWaWV3OiBMVmlldyk6IFJFbGVtZW50IHtcbiAgcmV0dXJuIHJlYWRFbGVtZW50VmFsdWUobFZpZXdbaW5kZXggKyBIRUFERVJfT0ZGU0VUXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVCeVROb2RlKHROb2RlOiBUTm9kZSwgaG9zdFZpZXc6IExWaWV3KTogUkVsZW1lbnR8UlRleHR8UkNvbW1lbnQge1xuICByZXR1cm4gcmVhZEVsZW1lbnRWYWx1ZShob3N0Vmlld1t0Tm9kZS5pbmRleF0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VE5vZGUoaW5kZXg6IG51bWJlciwgdmlldzogTFZpZXcpOiBUTm9kZSB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRHcmVhdGVyVGhhbihpbmRleCwgLTEsICd3cm9uZyBpbmRleCBmb3IgVE5vZGUnKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExlc3NUaGFuKGluZGV4LCB2aWV3W1RWSUVXXS5kYXRhLmxlbmd0aCwgJ3dyb25nIGluZGV4IGZvciBUTm9kZScpO1xuICByZXR1cm4gdmlld1tUVklFV10uZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdIGFzIFROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50Vmlld0J5SW5kZXgobm9kZUluZGV4OiBudW1iZXIsIGhvc3RWaWV3OiBMVmlldyk6IExWaWV3IHtcbiAgLy8gQ291bGQgYmUgYW4gTFZpZXcgb3IgYW4gTENvbnRhaW5lci4gSWYgTENvbnRhaW5lciwgdW53cmFwIHRvIGZpbmQgTFZpZXcuXG4gIGNvbnN0IHNsb3RWYWx1ZSA9IGhvc3RWaWV3W25vZGVJbmRleF07XG4gIHJldHVybiBzbG90VmFsdWUubGVuZ3RoID49IEhFQURFUl9PRkZTRVQgPyBzbG90VmFsdWUgOiBzbG90VmFsdWVbSE9TVF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRlbnRRdWVyeUhvc3QodE5vZGU6IFROb2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiAodE5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmhhc0NvbnRlbnRRdWVyeSkgIT09IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbXBvbmVudCh0Tm9kZTogVE5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuICh0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuaXNDb21wb25lbnQpID09PSBUTm9kZUZsYWdzLmlzQ29tcG9uZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnREZWY8VD4oZGVmOiBEaXJlY3RpdmVEZWY8VD4pOiBkZWYgaXMgQ29tcG9uZW50RGVmPFQ+IHtcbiAgcmV0dXJuIChkZWYgYXMgQ29tcG9uZW50RGVmPFQ+KS50ZW1wbGF0ZSAhPT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTENvbnRhaW5lcih2YWx1ZTogUkVsZW1lbnQgfCBSQ29tbWVudCB8IExDb250YWluZXIgfCBTdHlsaW5nQ29udGV4dCk6IGJvb2xlYW4ge1xuICAvLyBTdHlsaW5nIGNvbnRleHRzIGFyZSBhbHNvIGFycmF5cywgYnV0IHRoZWlyIGZpcnN0IGluZGV4IGNvbnRhaW5zIGFuIGVsZW1lbnQgbm9kZVxuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSBMQ09OVEFJTkVSX0xFTkdUSDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUm9vdFZpZXcodGFyZ2V0OiBMVmlldyk6IGJvb2xlYW4ge1xuICByZXR1cm4gKHRhcmdldFtGTEFHU10gJiBMVmlld0ZsYWdzLklzUm9vdCkgIT09IDA7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHJvb3QgdmlldyBmcm9tIGFueSBjb21wb25lbnQgYnkgd2Fsa2luZyB0aGUgcGFyZW50IGBMVmlld2AgdW50aWxcbiAqIHJlYWNoaW5nIHRoZSByb290IGBMVmlld2AuXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudCBhbnkgY29tcG9uZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290Vmlldyh0YXJnZXQ6IExWaWV3IHwge30pOiBMVmlldyB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRhcmdldCwgJ2NvbXBvbmVudCcpO1xuICBsZXQgbFZpZXcgPSBBcnJheS5pc0FycmF5KHRhcmdldCkgPyAodGFyZ2V0IGFzIExWaWV3KSA6IHJlYWRQYXRjaGVkTFZpZXcodGFyZ2V0KSAhO1xuICB3aGlsZSAobFZpZXcgJiYgIShsVmlld1tGTEFHU10gJiBMVmlld0ZsYWdzLklzUm9vdCkpIHtcbiAgICBsVmlldyA9IGxWaWV3W1BBUkVOVF0gITtcbiAgfVxuICByZXR1cm4gbFZpZXc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290Q29udGV4dCh2aWV3T3JDb21wb25lbnQ6IExWaWV3IHwge30pOiBSb290Q29udGV4dCB7XG4gIGNvbnN0IHJvb3RWaWV3ID0gZ2V0Um9vdFZpZXcodmlld09yQ29tcG9uZW50KTtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnREZWZpbmVkKHJvb3RWaWV3W0NPTlRFWFRdLCAnUm9vdFZpZXcgaGFzIG5vIGNvbnRleHQuIFBlcmhhcHMgaXQgaXMgZGlzY29ubmVjdGVkPycpO1xuICByZXR1cm4gcm9vdFZpZXdbQ09OVEVYVF0gYXMgUm9vdENvbnRleHQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbW9ua2V5LXBhdGNoIHZhbHVlIGRhdGEgcHJlc2VudCBvbiB0aGUgdGFyZ2V0ICh3aGljaCBjb3VsZCBiZVxuICogYSBjb21wb25lbnQsIGRpcmVjdGl2ZSBvciBhIERPTSBub2RlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQ6IGFueSk6IExWaWV3fExDb250ZXh0fG51bGwge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0YXJnZXQsICdUYXJnZXQgZXhwZWN0ZWQnKTtcbiAgcmV0dXJuIHRhcmdldFtNT05LRVlfUEFUQ0hfS0VZX05BTUVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZFBhdGNoZWRMVmlldyh0YXJnZXQ6IGFueSk6IExWaWV3fG51bGwge1xuICBjb25zdCB2YWx1ZSA9IHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQpO1xuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6ICh2YWx1ZSBhcyBMQ29udGV4dCkubFZpZXc7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNQYXJlbnRJbmplY3RvcihwYXJlbnRMb2NhdGlvbjogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uKTogYm9vbGVhbiB7XG4gIHJldHVybiBwYXJlbnRMb2NhdGlvbiAhPT0gTk9fUEFSRU5UX0lOSkVDVE9SO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2NhdGlvbjogUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uKTogbnVtYmVyIHtcbiAgcmV0dXJuIChwYXJlbnRMb2NhdGlvbiBhcyBhbnkgYXMgbnVtYmVyKSAmIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbkZsYWdzLkluamVjdG9ySW5kZXhNYXNrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SW5qZWN0b3JWaWV3T2Zmc2V0KHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24pOiBudW1iZXIge1xuICByZXR1cm4gKHBhcmVudExvY2F0aW9uIGFzIGFueSBhcyBudW1iZXIpID4+IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbkZsYWdzLlZpZXdPZmZzZXRTaGlmdDtcbn1cblxuLyoqXG4gKiBVbndyYXBzIGEgcGFyZW50IGluamVjdG9yIGxvY2F0aW9uIG51bWJlciB0byBmaW5kIHRoZSB2aWV3IG9mZnNldCBmcm9tIHRoZSBjdXJyZW50IGluamVjdG9yLFxuICogdGhlbiB3YWxrcyB1cCB0aGUgZGVjbGFyYXRpb24gdmlldyB0cmVlIHVudGlsIHRoZSB2aWV3IGlzIGZvdW5kIHRoYXQgY29udGFpbnMgdGhlIHBhcmVudFxuICogaW5qZWN0b3IuXG4gKlxuICogQHBhcmFtIGxvY2F0aW9uIFRoZSBsb2NhdGlvbiBvZiB0aGUgcGFyZW50IGluamVjdG9yLCB3aGljaCBjb250YWlucyB0aGUgdmlldyBvZmZzZXRcbiAqIEBwYXJhbSBzdGFydFZpZXcgVGhlIExWaWV3IGluc3RhbmNlIGZyb20gd2hpY2ggdG8gc3RhcnQgd2Fsa2luZyB1cCB0aGUgdmlldyB0cmVlXG4gKiBAcmV0dXJucyBUaGUgTFZpZXcgaW5zdGFuY2UgdGhhdCBjb250YWlucyB0aGUgcGFyZW50IGluamVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvclZpZXcobG9jYXRpb246IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbiwgc3RhcnRWaWV3OiBMVmlldyk6IExWaWV3IHtcbiAgbGV0IHZpZXdPZmZzZXQgPSBnZXRQYXJlbnRJbmplY3RvclZpZXdPZmZzZXQobG9jYXRpb24pO1xuICBsZXQgcGFyZW50VmlldyA9IHN0YXJ0VmlldztcbiAgLy8gRm9yIG1vc3QgY2FzZXMsIHRoZSBwYXJlbnQgaW5qZWN0b3IgY2FuIGJlIGZvdW5kIG9uIHRoZSBob3N0IG5vZGUgKGUuZy4gZm9yIGNvbXBvbmVudFxuICAvLyBvciBjb250YWluZXIpLCBidXQgd2UgbXVzdCBrZWVwIHRoZSBsb29wIGhlcmUgdG8gc3VwcG9ydCB0aGUgcmFyZXIgY2FzZSBvZiBkZWVwbHkgbmVzdGVkXG4gIC8vIDxuZy10ZW1wbGF0ZT4gdGFncyBvciBpbmxpbmUgdmlld3MsIHdoZXJlIHRoZSBwYXJlbnQgaW5qZWN0b3IgbWlnaHQgbGl2ZSBtYW55IHZpZXdzXG4gIC8vIGFib3ZlIHRoZSBjaGlsZCBpbmplY3Rvci5cbiAgd2hpbGUgKHZpZXdPZmZzZXQgPiAwKSB7XG4gICAgcGFyZW50VmlldyA9IHBhcmVudFZpZXdbREVDTEFSQVRJT05fVklFV10gITtcbiAgICB2aWV3T2Zmc2V0LS07XG4gIH1cbiAgcmV0dXJuIHBhcmVudFZpZXc7XG59XG5cbi8qKlxuICogVW53cmFwcyBhIHBhcmVudCBpbmplY3RvciBsb2NhdGlvbiBudW1iZXIgdG8gZmluZCB0aGUgdmlldyBvZmZzZXQgZnJvbSB0aGUgY3VycmVudCBpbmplY3RvcixcbiAqIHRoZW4gd2Fsa3MgdXAgdGhlIGRlY2xhcmF0aW9uIHZpZXcgdHJlZSB1bnRpbCB0aGUgVE5vZGUgb2YgdGhlIHBhcmVudCBpbmplY3RvciBpcyBmb3VuZC5cbiAqXG4gKiBAcGFyYW0gbG9jYXRpb24gVGhlIGxvY2F0aW9uIG9mIHRoZSBwYXJlbnQgaW5qZWN0b3IsIHdoaWNoIGNvbnRhaW5zIHRoZSB2aWV3IG9mZnNldFxuICogQHBhcmFtIHN0YXJ0VmlldyBUaGUgTFZpZXcgaW5zdGFuY2UgZnJvbSB3aGljaCB0byBzdGFydCB3YWxraW5nIHVwIHRoZSB2aWV3IHRyZWVcbiAqIEBwYXJhbSBzdGFydFROb2RlIFRoZSBUTm9kZSBpbnN0YW5jZSBvZiB0aGUgc3RhcnRpbmcgZWxlbWVudFxuICogQHJldHVybnMgVGhlIFROb2RlIG9mIHRoZSBwYXJlbnQgaW5qZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmVudEluamVjdG9yVE5vZGUoXG4gICAgbG9jYXRpb246IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbiwgc3RhcnRWaWV3OiBMVmlldywgc3RhcnRUTm9kZTogVE5vZGUpOiBURWxlbWVudE5vZGV8XG4gICAgVENvbnRhaW5lck5vZGV8bnVsbCB7XG4gIGlmIChzdGFydFROb2RlLnBhcmVudCAmJiBzdGFydFROb2RlLnBhcmVudC5pbmplY3RvckluZGV4ICE9PSAtMSkge1xuICAgIC8vIHZpZXcgb2Zmc2V0IGlzIDBcbiAgICBjb25zdCBpbmplY3RvckluZGV4ID0gc3RhcnRUTm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleDtcbiAgICBsZXQgcGFyZW50VE5vZGUgPSBzdGFydFROb2RlLnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50VE5vZGUucGFyZW50ICE9IG51bGwgJiYgaW5qZWN0b3JJbmRleCA9PSBwYXJlbnRUTm9kZS5pbmplY3RvckluZGV4KSB7XG4gICAgICBwYXJlbnRUTm9kZSA9IHBhcmVudFROb2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmVudFROb2RlO1xuICB9XG5cbiAgbGV0IHZpZXdPZmZzZXQgPSBnZXRQYXJlbnRJbmplY3RvclZpZXdPZmZzZXQobG9jYXRpb24pO1xuICAvLyB2aWV3IG9mZnNldCBpcyAxXG4gIGxldCBwYXJlbnRWaWV3ID0gc3RhcnRWaWV3O1xuICBsZXQgcGFyZW50VE5vZGUgPSBzdGFydFZpZXdbSE9TVF9OT0RFXSBhcyBURWxlbWVudE5vZGU7XG5cbiAgLy8gdmlldyBvZmZzZXQgaXMgc3VwZXJpb3IgdG8gMVxuICB3aGlsZSAodmlld09mZnNldCA+IDEpIHtcbiAgICBwYXJlbnRWaWV3ID0gcGFyZW50Vmlld1tERUNMQVJBVElPTl9WSUVXXSAhO1xuICAgIHBhcmVudFROb2RlID0gcGFyZW50Vmlld1tIT1NUX05PREVdIGFzIFRFbGVtZW50Tm9kZTtcbiAgICB2aWV3T2Zmc2V0LS07XG4gIH1cbiAgcmV0dXJuIHBhcmVudFROb2RlO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFNjaGVkdWxlciA9XG4gICAgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICd1bmRlZmluZWQnICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAgLy8gYnJvd3NlciBvbmx5XG4gICAgIHNldFRpbWVvdXQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICkuYmluZChnbG9iYWwpO1xuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gRVM2IHNwcmVhZCwgYWRkIGVhY2ggaXRlbSB0byBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0gaXRlbXMgVGhlIGl0ZW1zIHRvIGFkZFxuICogQHBhcmFtIGFyciBUaGUgYXJyYXkgdG8gd2hpY2ggeW91IHdhbnQgdG8gYWRkIHRoZSBpdGVtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkQWxsVG9BcnJheShpdGVtczogYW55W10sIGFycjogYW55W10pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIGFyci5wdXNoKGl0ZW1zW2ldKTtcbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGEgY3VycmVudCB2aWV3LCBmaW5kcyB0aGUgbmVhcmVzdCBjb21wb25lbnQncyBob3N0IChMRWxlbWVudCkuXG4gKlxuICogQHBhcmFtIGxWaWV3IExWaWV3IGZvciB3aGljaCB3ZSB3YW50IGEgaG9zdCBlbGVtZW50IG5vZGVcbiAqIEByZXR1cm5zIFRoZSBob3N0IG5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21wb25lbnRWaWV3KGxWaWV3OiBMVmlldyk6IExWaWV3IHtcbiAgbGV0IHJvb3RUTm9kZSA9IGxWaWV3W0hPU1RfTk9ERV07XG5cbiAgd2hpbGUgKHJvb3RUTm9kZSAmJiByb290VE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLlZpZXcpIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChsVmlld1tERUNMQVJBVElPTl9WSUVXXSwgJ2xWaWV3W0RFQ0xBUkFUSU9OX1ZJRVddJyk7XG4gICAgbFZpZXcgPSBsVmlld1tERUNMQVJBVElPTl9WSUVXXSAhO1xuICAgIHJvb3RUTm9kZSA9IGxWaWV3W0hPU1RfTk9ERV07XG4gIH1cblxuICByZXR1cm4gbFZpZXc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlV2luZG93KGVsZW1lbnQ6IFJFbGVtZW50ICYge293bmVyRG9jdW1lbnQ6IERvY3VtZW50fSkge1xuICByZXR1cm4ge25hbWU6ICd3aW5kb3cnLCB0YXJnZXQ6IGVsZW1lbnQub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlld307XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRG9jdW1lbnQoZWxlbWVudDogUkVsZW1lbnQgJiB7b3duZXJEb2N1bWVudDogRG9jdW1lbnR9KSB7XG4gIHJldHVybiB7bmFtZTogJ2RvY3VtZW50JywgdGFyZ2V0OiBlbGVtZW50Lm93bmVyRG9jdW1lbnR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUJvZHkoZWxlbWVudDogUkVsZW1lbnQgJiB7b3duZXJEb2N1bWVudDogRG9jdW1lbnR9KSB7XG4gIHJldHVybiB7bmFtZTogJ2JvZHknLCB0YXJnZXQ6IGVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5fTtcbn1cblxuLyoqXG4gKiBUaGUgc3BlY2lhbCBkZWxpbWl0ZXIgd2UgdXNlIHRvIHNlcGFyYXRlIHByb3BlcnR5IG5hbWVzLCBwcmVmaXhlcywgYW5kIHN1ZmZpeGVzXG4gKiBpbiBwcm9wZXJ0eSBiaW5kaW5nIG1ldGFkYXRhLiBTZWUgc3RvcmVCaW5kaW5nTWV0YWRhdGEoKS5cbiAqXG4gKiBXZSBpbnRlbnRpb25hbGx5IHVzZSB0aGUgVW5pY29kZSBcIlJFUExBQ0VNRU5UIENIQVJBQ1RFUlwiIChVK0ZGRkQpIGFzIGEgZGVsaW1pdGVyXG4gKiBiZWNhdXNlIGl0IGlzIGEgdmVyeSB1bmNvbW1vbiBjaGFyYWN0ZXIgdGhhdCBpcyB1bmxpa2VseSB0byBiZSBwYXJ0IG9mIGEgdXNlcidzXG4gKiBwcm9wZXJ0eSBuYW1lcyBvciBpbnRlcnBvbGF0aW9uIHN0cmluZ3MuIElmIGl0IGlzIGluIGZhY3QgdXNlZCBpbiBhIHByb3BlcnR5XG4gKiBiaW5kaW5nLCBEZWJ1Z0VsZW1lbnQucHJvcGVydGllcyB3aWxsIG5vdCByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgZm9yIHRoYXRcbiAqIGJpbmRpbmcuIEhvd2V2ZXIsIHRoZXJlIHNob3VsZCBiZSBubyBydW50aW1lIGVmZmVjdCBmb3IgcmVhbCBhcHBsaWNhdGlvbnMuXG4gKlxuICogVGhpcyBjaGFyYWN0ZXIgaXMgdHlwaWNhbGx5IHJlbmRlcmVkIGFzIGEgcXVlc3Rpb24gbWFyayBpbnNpZGUgb2YgYSBkaWFtb25kLlxuICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NwZWNpYWxzXyhVbmljb2RlX2Jsb2NrKVxuICpcbiAqL1xuZXhwb3J0IGNvbnN0IElOVEVSUE9MQVRJT05fREVMSU1JVEVSID0gYO+/vWA7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gc3RyaW5nIGlzIGEgcHJvcGVydHkgbWV0YWRhdGEgc3RyaW5nLlxuICogU2VlIHN0b3JlQmluZGluZ01ldGFkYXRhKCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb3BNZXRhZGF0YVN0cmluZyhzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gc3RyLmluZGV4T2YoSU5URVJQT0xBVElPTl9ERUxJTUlURVIpID49IDA7XG59XG4iXX0=