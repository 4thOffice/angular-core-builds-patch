/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import './ng_dev_mode';
import { assertEqual } from './assert';
import { CONTEXT, DIRECTIVES, HEADER_OFFSET, TVIEW } from './interfaces/view';
/**
 * This property will be monkey-patched on elements, components and directives
 */
export const MONKEY_PATCH_KEY_NAME = '__ngContext__';
/** Returns the matching `LContext` data for a given DOM node, directive or component instance.
 *
 * This function will examine the provided DOM element, component, or directive instance\'s
 * monkey-patched property to derive the `LContext` data. Once called then the monkey-patched
 * value will be that of the newly created `LContext`.
 *
 * If the monkey-patched value is the `LViewData` instance then the context value for that
 * target will be created and the monkey-patch reference will be updated. Therefore when this
 * function is called it may mutate the provided element\'s, component\'s or any of the associated
 * directive\'s monkey-patch values.
 *
 * If the monkey-patch value is not detected then the code will walk up the DOM until an element
 * is found which contains a monkey-patch reference. When that occurs then the provided element
 * will be updated with a new context (which is then returned). If the monkey-patch value is not
 * detected for a component/directive instance then it will throw an error (all components and
 * directives should be automatically monkey-patched by ivy).
 */
export function getContext(target) {
    let mpValue = readPatchedData(target);
    if (mpValue) {
        // only when it's an array is it considered an LViewData instance
        // ... otherwise it's an already constructed LContext instance
        if (Array.isArray(mpValue)) {
            const lViewData = mpValue;
            let lNodeIndex;
            let component = undefined;
            let directiveIndices = undefined;
            let directives = undefined;
            if (isComponentInstance(target)) {
                lNodeIndex = findViaComponent(lViewData, target);
                if (lNodeIndex == -1) {
                    throw new Error('The provided component was not found in the application');
                }
                component = target;
            }
            else if (isDirectiveInstance(target)) {
                lNodeIndex = findViaDirective(lViewData, target);
                if (lNodeIndex == -1) {
                    throw new Error('The provided directive was not found in the application');
                }
                directiveIndices = discoverDirectiveIndices(lViewData, lNodeIndex);
                directives = directiveIndices ? discoverDirectives(lViewData, directiveIndices) : null;
            }
            else {
                lNodeIndex = findViaNativeElement(lViewData, target);
                if (lNodeIndex == -1) {
                    return null;
                }
            }
            // the goal is not to fill the entire context full of data because the lookups
            // are expensive. Instead, only the target data (the element, compontent or
            // directive details) are filled into the context. If called multiple times
            // with different target values then the missing target data will be filled in.
            const lNode = getLNodeFromViewData(lViewData, lNodeIndex);
            const existingCtx = readPatchedData(lNode.native);
            const context = (existingCtx && !Array.isArray(existingCtx)) ?
                existingCtx :
                createLContext(lViewData, lNodeIndex, lNode.native);
            // only when the component has been discovered then update the monkey-patch
            if (component && context.component === undefined) {
                context.component = component;
                attachPatchData(context.component, context);
            }
            // only when the directives have been discovered then update the monkey-patch
            if (directives && directiveIndices && context.directives === undefined) {
                context.directiveIndices = directiveIndices;
                context.directives = directives;
                for (let i = 0; i < directives.length; i++) {
                    attachPatchData(directives[i], context);
                }
            }
            attachPatchData(context.native, context);
            mpValue = context;
        }
    }
    else {
        const rElement = target;
        ngDevMode && assertDomElement(rElement);
        // if the context is not found then we need to traverse upwards up the DOM
        // to find the nearest element that has already been monkey patched with data
        let parent = rElement;
        while (parent = parent.parentNode) {
            const parentContext = readPatchedData(parent);
            if (parentContext) {
                let lViewData;
                if (Array.isArray(parentContext)) {
                    lViewData = parentContext;
                }
                else {
                    lViewData = parentContext.lViewData;
                }
                // the edge of the app was also reached here through another means
                // (maybe because the DOM was changed manually).
                if (!lViewData) {
                    return null;
                }
                const index = findViaNativeElement(lViewData, rElement);
                if (index >= 0) {
                    const lNode = getLNodeFromViewData(lViewData, index);
                    const context = createLContext(lViewData, index, lNode.native);
                    attachPatchData(lNode.native, context);
                    mpValue = context;
                    break;
                }
            }
        }
    }
    return mpValue || null;
}
/**
 * Creates an empty instance of a `LContext` context
 */
function createLContext(lViewData, lNodeIndex, native) {
    return {
        lViewData,
        lNodeIndex,
        native,
        component: undefined,
        directiveIndices: undefined,
        directives: undefined,
    };
}
/**
 * A utility function for retrieving the matching lElementNode
 * from a given DOM element, component or directive.
 */
export function getLElementNode(target) {
    const context = getContext(target);
    return context ? getLNodeFromViewData(context.lViewData, context.lNodeIndex) : null;
}
export function getLElementFromRootComponent(rootComponentInstance) {
    // the host element for the root component is ALWAYS the first element
    // in the lViewData array (which is where HEADER_OFFSET points to)
    const lViewData = readPatchedLViewData(rootComponentInstance);
    return readElementValue(lViewData[HEADER_OFFSET]);
}
/**
 * A simplified lookup function for finding the LElementNode from a component instance.
 *
 * This function exists for tree-shaking purposes to avoid having to pull in everything
 * that `getContext` has in the event that an Angular application doesn't need to have
 * any programmatic access to an element's context (only change detection uses this function).
 */
export function getLElementFromComponent(componentInstance) {
    let lViewData = readPatchedData(componentInstance);
    let lNode;
    if (Array.isArray(lViewData)) {
        const lNodeIndex = findViaComponent(lViewData, componentInstance);
        lNode = readElementValue(lViewData[lNodeIndex]);
        const context = createLContext(lViewData, lNodeIndex, lNode.native);
        context.component = componentInstance;
        attachPatchData(componentInstance, context);
        attachPatchData(context.native, context);
    }
    else {
        const context = lViewData;
        lNode = readElementValue(context.lViewData[context.lNodeIndex]);
    }
    return lNode;
}
/**
 * Assigns the given data to the given target (which could be a component,
 * directive or DOM node instance) using monkey-patching.
 */
export function attachPatchData(target, data) {
    target[MONKEY_PATCH_KEY_NAME] = data;
}
/**
 * Returns the monkey-patch value data present on the target (which could be
 * a component, directive or a DOM node).
 */
export function readPatchedData(target) {
    return target[MONKEY_PATCH_KEY_NAME];
}
export function readPatchedLViewData(target) {
    const value = readPatchedData(target);
    if (value) {
        return Array.isArray(value) ? value : value.lViewData;
    }
    return null;
}
export function isComponentInstance(instance) {
    return instance && instance.constructor && instance.constructor.ngComponentDef;
}
export function isDirectiveInstance(instance) {
    return instance && instance.constructor && instance.constructor.ngDirectiveDef;
}
/**
 * Locates the element within the given LViewData and returns the matching index
 */
function findViaNativeElement(lViewData, native) {
    let tNode = lViewData[TVIEW].firstChild;
    while (tNode) {
        const lNode = getLNodeFromViewData(lViewData, tNode.index);
        if (lNode.native === native) {
            return tNode.index;
        }
        tNode = traverseNextElement(tNode);
    }
    return -1;
}
/**
 * Locates the next tNode (child, sibling or parent).
 */
function traverseNextElement(tNode) {
    if (tNode.child) {
        return tNode.child;
    }
    else if (tNode.next) {
        return tNode.next;
    }
    else if (tNode.parent) {
        return tNode.parent.next || null;
    }
    return null;
}
/**
 * Locates the component within the given LViewData and returns the matching index
 */
function findViaComponent(lViewData, componentInstance) {
    const componentIndices = lViewData[TVIEW].components;
    if (componentIndices) {
        for (let i = 0; i < componentIndices.length; i++) {
            const elementComponentIndex = componentIndices[i];
            const lNodeData = readElementValue(lViewData[elementComponentIndex]).data;
            if (lNodeData[CONTEXT] === componentInstance) {
                return elementComponentIndex;
            }
        }
    }
    else {
        const rootNode = lViewData[HEADER_OFFSET];
        const rootComponent = rootNode.data[CONTEXT];
        if (rootComponent === componentInstance) {
            // we are dealing with the root element here therefore we know that the
            // element is the very first element after the HEADER data in the lView
            return HEADER_OFFSET;
        }
    }
    return -1;
}
/**
 * Locates the directive within the given LViewData and returns the matching index
 */
function findViaDirective(lViewData, directiveInstance) {
    // if a directive is monkey patched then it will (by default)
    // have a reference to the LViewData of the current view. The
    // element bound to the directive being search lives somewhere
    // in the view data. By first checking to see if the instance
    // is actually present we can narrow down to which lElementNode
    // contains the instance of the directive and then return the index
    const directivesAcrossView = lViewData[DIRECTIVES];
    const directiveIndex = directivesAcrossView ? directivesAcrossView.indexOf(directiveInstance) : -1;
    if (directiveIndex >= 0) {
        let tNode = lViewData[TVIEW].firstChild;
        while (tNode) {
            const directiveIndexStart = getDirectiveStartIndex(tNode);
            const directiveIndexEnd = getDirectiveEndIndex(tNode, directiveIndexStart);
            if (directiveIndex >= directiveIndexStart && directiveIndex < directiveIndexEnd) {
                return tNode.index;
            }
            tNode = traverseNextElement(tNode);
        }
    }
    return -1;
}
function assertDomElement(element) {
    assertEqual(element.nodeType, 1, 'The provided value must be an instance of an HTMLElement');
}
/**
 * Retruns the instance of the LElementNode at the given index in the LViewData.
 *
 * This function will also unwrap the inner value incase it's stuffed into an
 * array (which is what happens when [style] and [class] bindings are present
 * in the view instructions for the element being returned).
 */
function getLNodeFromViewData(lViewData, lElementIndex) {
    const value = lViewData[lElementIndex];
    return value ? readElementValue(value) : null;
}
/**
 * Returns a collection of directive index values that are used on the element
 * (which is referenced by the lNodeIndex)
 */
function discoverDirectiveIndices(lViewData, lNodeIndex) {
    const directivesAcrossView = lViewData[DIRECTIVES];
    const tNode = lViewData[TVIEW].data[lNodeIndex];
    if (directivesAcrossView && directivesAcrossView.length) {
        // this check for tNode is to determine if the value is a LElementNode instance
        const directiveIndexStart = getDirectiveStartIndex(tNode);
        const directiveIndexEnd = getDirectiveEndIndex(tNode, directiveIndexStart);
        const directiveIndices = [];
        for (let i = directiveIndexStart; i < directiveIndexEnd; i++) {
            // special case since the instance of the component (if it exists)
            // is stored in the directives array.
            if (i > directiveIndexStart ||
                !isComponentInstance(directivesAcrossView[directiveIndexStart])) {
                directiveIndices.push(i);
            }
        }
        return directiveIndices.length ? directiveIndices : null;
    }
    return null;
}
function discoverDirectives(lViewData, directiveIndices) {
    const directives = [];
    const directiveInstances = lViewData[DIRECTIVES];
    if (directiveInstances) {
        for (let i = 0; i < directiveIndices.length; i++) {
            const directiveIndex = directiveIndices[i];
            const directive = directiveInstances[directiveIndex];
            directives.push(directive);
        }
    }
    return directives;
}
function getDirectiveStartIndex(tNode) {
    // the tNode instances store a flag value which then has a
    // pointer which tells the starting index of where all the
    // active directives are in the master directive array
    return tNode.flags >> 15 /* DirectiveStartingIndexShift */;
}
function getDirectiveEndIndex(tNode, startIndex) {
    // The end value is also a part of the same flag
    // (see `TNodeFlags` to see how the flag bit shifting
    // values are used).
    const count = tNode.flags & 4095 /* DirectiveCountMask */;
    return count ? (startIndex + count) : -1;
}
export function readElementValue(value) {
    return (Array.isArray(value) ? value[0] : value);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dF9kaXNjb3ZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2NvbnRleHRfZGlzY292ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHckMsT0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFhLEtBQUssRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXZGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsZUFBZSxDQUFDO0FBZ0NyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsTUFBVztJQUNwQyxJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsSUFBSSxPQUFPLEVBQUU7UUFDWCxpRUFBaUU7UUFDakUsOERBQThEO1FBQzlELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixNQUFNLFNBQVMsR0FBYyxPQUFTLENBQUM7WUFDdkMsSUFBSSxVQUFrQixDQUFDO1lBQ3ZCLElBQUksU0FBUyxHQUFRLFNBQVMsQ0FBQztZQUMvQixJQUFJLGdCQUFnQixHQUE0QixTQUFTLENBQUM7WUFDMUQsSUFBSSxVQUFVLEdBQXlCLFNBQVMsQ0FBQztZQUVqRCxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixVQUFVLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLFVBQVUsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO2lCQUM1RTtnQkFDRCxT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QUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxJQUFJLGtCQUFrQixFQUFFO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsTUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckQsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM1QjtLQUNGO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQUMsS0FBWTtJQUMxQywwREFBMEQ7SUFDMUQsMERBQTBEO0lBQzFELHNEQUFzRDtJQUN0RCxPQUFPLEtBQUssQ0FBQyxLQUFLLHdDQUEwQyxDQUFDO0FBQy9ELENBQUM7QUFFRCxTQUFTLG9CQUFvQixDQUFDLEtBQVksRUFBRSxVQUFrQjtJQUM1RCxnREFBZ0Q7SUFDaEQscURBQXFEO0lBQ3JELG9CQUFvQjtJQUNwQixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxnQ0FBZ0MsQ0FBQztJQUMxRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsS0FBMkI7SUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBaUIsQ0FBQztBQUNyRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICcuL25nX2Rldl9tb2RlJztcblxuaW1wb3J0IHthc3NlcnRFcXVhbH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtMRWxlbWVudE5vZGUsIFROb2RlLCBUTm9kZUZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JFbGVtZW50fSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtDT05URVhULCBESVJFQ1RJVkVTLCBIRUFERVJfT0ZGU0VULCBMVmlld0RhdGEsIFRWSUVXfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5cbi8qKlxuICogVGhpcyBwcm9wZXJ0eSB3aWxsIGJlIG1vbmtleS1wYXRjaGVkIG9uIGVsZW1lbnRzLCBjb21wb25lbnRzIGFuZCBkaXJlY3RpdmVzXG4gKi9cbmV4cG9ydCBjb25zdCBNT05LRVlfUEFUQ0hfS0VZX05BTUUgPSAnX19uZ0NvbnRleHRfXyc7XG5cbi8qKlxuICogVGhlIGludGVybmFsIHZpZXcgY29udGV4dCB3aGljaCBpcyBzcGVjaWZpYyB0byBhIGdpdmVuIERPTSBlbGVtZW50LCBkaXJlY3RpdmUgb3JcbiAqIGNvbXBvbmVudCBpbnN0YW5jZS4gRWFjaCB2YWx1ZSBpbiBoZXJlIChiZXNpZGVzIHRoZSBMVmlld0RhdGEgYW5kIGVsZW1lbnQgbm9kZSBkZXRhaWxzKVxuICogY2FuIGJlIHByZXNlbnQsIG51bGwgb3IgdW5kZWZpbmVkLiBJZiB1bmRlZmluZWQgdGhlbiBpdCBpbXBsaWVzIHRoZSB2YWx1ZSBoYXMgbm90IGJlZW5cbiAqIGxvb2tlZCB1cCB5ZXQsIG90aGVyd2lzZSwgaWYgbnVsbCwgdGhlbiBhIGxvb2t1cCB3YXMgZXhlY3V0ZWQgYW5kIG5vdGhpbmcgd2FzIGZvdW5kLlxuICpcbiAqIEVhY2ggdmFsdWUgd2lsbCBnZXQgZmlsbGVkIHdoZW4gdGhlIHJlc3BlY3RpdmUgdmFsdWUgaXMgZXhhbWluZWQgd2l0aGluIHRoZSBnZXRDb250ZXh0XG4gKiBmdW5jdGlvbi4gVGhlIGNvbXBvbmVudCwgZWxlbWVudCBhbmQgZWFjaCBkaXJlY3RpdmUgaW5zdGFuY2Ugd2lsbCBzaGFyZSB0aGUgc2FtZSBpbnN0YW5jZVxuICogb2YgdGhlIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTENvbnRleHQge1xuICAvKiogVGhlIGNvbXBvbmVudCdzIHBhcmVudCB2aWV3IGRhdGEgKi9cbiAgbFZpZXdEYXRhOiBMVmlld0RhdGE7XG5cbiAgLyoqIFRoZSBpbmRleCBpbnN0YW5jZSBvZiB0aGUgTE5vZGUgKi9cbiAgbE5vZGVJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIERPTSBub2RlIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIGxOb2RlICovXG4gIG5hdGl2ZTogUkVsZW1lbnQ7XG5cbiAgLyoqIFRoZSBpbnN0YW5jZSBvZiB0aGUgQ29tcG9uZW50IG5vZGUgKi9cbiAgY29tcG9uZW50OiB7fXxudWxsfHVuZGVmaW5lZDtcblxuICAvKiogVGhlIGxpc3Qgb2YgaW5kaWNlcyBmb3IgdGhlIGFjdGl2ZSBkaXJlY3RpdmVzIHRoYXQgZXhpc3Qgb24gdGhpcyBlbGVtZW50ICovXG4gIGRpcmVjdGl2ZUluZGljZXM6IG51bWJlcltdfG51bGx8dW5kZWZpbmVkO1xuXG4gIC8qKiBUaGUgbGlzdCBvZiBhY3RpdmUgZGlyZWN0aXZlcyB0aGF0IGV4aXN0IG9uIHRoaXMgZWxlbWVudCAqL1xuICBkaXJlY3RpdmVzOiBBcnJheTx7fT58bnVsbHx1bmRlZmluZWQ7XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBtYXRjaGluZyBgTENvbnRleHRgIGRhdGEgZm9yIGEgZ2l2ZW4gRE9NIG5vZGUsIGRpcmVjdGl2ZSBvciBjb21wb25lbnQgaW5zdGFuY2UuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGV4YW1pbmUgdGhlIHByb3ZpZGVkIERPTSBlbGVtZW50LCBjb21wb25lbnQsIG9yIGRpcmVjdGl2ZSBpbnN0YW5jZVxcJ3NcbiAqIG1vbmtleS1wYXRjaGVkIHByb3BlcnR5IHRvIGRlcml2ZSB0aGUgYExDb250ZXh0YCBkYXRhLiBPbmNlIGNhbGxlZCB0aGVuIHRoZSBtb25rZXktcGF0Y2hlZFxuICogdmFsdWUgd2lsbCBiZSB0aGF0IG9mIHRoZSBuZXdseSBjcmVhdGVkIGBMQ29udGV4dGAuXG4gKlxuICogSWYgdGhlIG1vbmtleS1wYXRjaGVkIHZhbHVlIGlzIHRoZSBgTFZpZXdEYXRhYCBpbnN0YW5jZSB0aGVuIHRoZSBjb250ZXh0IHZhbHVlIGZvciB0aGF0XG4gKiB0YXJnZXQgd2lsbCBiZSBjcmVhdGVkIGFuZCB0aGUgbW9ua2V5LXBhdGNoIHJlZmVyZW5jZSB3aWxsIGJlIHVwZGF0ZWQuIFRoZXJlZm9yZSB3aGVuIHRoaXNcbiAqIGZ1bmN0aW9uIGlzIGNhbGxlZCBpdCBtYXkgbXV0YXRlIHRoZSBwcm92aWRlZCBlbGVtZW50XFwncywgY29tcG9uZW50XFwncyBvciBhbnkgb2YgdGhlIGFzc29jaWF0ZWRcbiAqIGRpcmVjdGl2ZVxcJ3MgbW9ua2V5LXBhdGNoIHZhbHVlcy5cbiAqXG4gKiBJZiB0aGUgbW9ua2V5LXBhdGNoIHZhbHVlIGlzIG5vdCBkZXRlY3RlZCB0aGVuIHRoZSBjb2RlIHdpbGwgd2FsayB1cCB0aGUgRE9NIHVudGlsIGFuIGVsZW1lbnRcbiAqIGlzIGZvdW5kIHdoaWNoIGNvbnRhaW5zIGEgbW9ua2V5LXBhdGNoIHJlZmVyZW5jZS4gV2hlbiB0aGF0IG9jY3VycyB0aGVuIHRoZSBwcm92aWRlZCBlbGVtZW50XG4gKiB3aWxsIGJlIHVwZGF0ZWQgd2l0aCBhIG5ldyBjb250ZXh0ICh3aGljaCBpcyB0aGVuIHJldHVybmVkKS4gSWYgdGhlIG1vbmtleS1wYXRjaCB2YWx1ZSBpcyBub3RcbiAqIGRldGVjdGVkIGZvciBhIGNvbXBvbmVudC9kaXJlY3RpdmUgaW5zdGFuY2UgdGhlbiBpdCB3aWxsIHRocm93IGFuIGVycm9yIChhbGwgY29tcG9uZW50cyBhbmRcbiAqIGRpcmVjdGl2ZXMgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgbW9ua2V5LXBhdGNoZWQgYnkgaXZ5KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHQodGFyZ2V0OiBhbnkpOiBMQ29udGV4dHxudWxsIHtcbiAgbGV0IG1wVmFsdWUgPSByZWFkUGF0Y2hlZERhdGEodGFyZ2V0KTtcbiAgaWYgKG1wVmFsdWUpIHtcbiAgICAvLyBvbmx5IHdoZW4gaXQncyBhbiBhcnJheSBpcyBpdCBjb25zaWRlcmVkIGFuIExWaWV3RGF0YSBpbnN0YW5jZVxuICAgIC8vIC4uLiBvdGhlcndpc2UgaXQncyBhbiBhbHJlYWR5IGNvbnN0cnVjdGVkIExDb250ZXh0IGluc3RhbmNlXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobXBWYWx1ZSkpIHtcbiAgICAgIGNvbnN0IGxWaWV3RGF0YTogTFZpZXdEYXRhID0gbXBWYWx1ZSAhO1xuICAgICAgbGV0IGxOb2RlSW5kZXg6IG51bWJlcjtcbiAgICAgIGxldCBjb21wb25lbnQ6IGFueSA9IHVuZGVmaW5lZDtcbiAgICAgIGxldCBkaXJlY3RpdmVJbmRpY2VzOiBudW1iZXJbXXxudWxsfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgIGxldCBkaXJlY3RpdmVzOiBhbnlbXXxudWxsfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGlzQ29tcG9uZW50SW5zdGFuY2UodGFyZ2V0KSkge1xuICAgICAgICBsTm9kZUluZGV4ID0gZmluZFZpYUNvbXBvbmVudChsVmlld0RhdGEsIHRhcmdldCk7XG4gICAgICAgIGlmIChsTm9kZUluZGV4ID09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgcHJvdmlkZWQgY29tcG9uZW50IHdhcyBub3QgZm91bmQgaW4gdGhlIGFwcGxpY2F0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50ID0gdGFyZ2V0O1xuICAgICAgfSBlbHNlIGlmIChpc0RpcmVjdGl2ZUluc3RhbmNlKHRhcmdldCkpIHtcbiAgICAgICAgbE5vZGVJbmRleCA9IGZpbmRWaWFEaXJlY3RpdmUobFZpZXdEYXRhLCB0YXJnZXQpO1xuICAgICAgICBpZiAobE5vZGVJbmRleCA9PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb3ZpZGVkIGRpcmVjdGl2ZSB3YXMgbm90IGZvdW5kIGluIHRoZSBhcHBsaWNhdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGRpcmVjdGl2ZUluZGljZXMgPSBkaXNjb3ZlckRpcmVjdGl2ZUluZGljZXMobFZpZXdEYXRhLCBsTm9kZUluZGV4KTtcbiAgICAgICAgZGlyZWN0aXZlcyA9IGRpcmVjdGl2ZUluZGljZXMgPyBkaXNjb3ZlckRpcmVjdGl2ZXMobFZpZXdEYXRhLCBkaXJlY3RpdmVJbmRpY2VzKSA6IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsTm9kZUluZGV4ID0gZmluZFZpYU5hdGl2ZUVsZW1lbnQobFZpZXdEYXRhLCB0YXJnZXQgYXMgUkVsZW1lbnQpO1xuICAgICAgICBpZiAobE5vZGVJbmRleCA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSBnb2FsIGlzIG5vdCB0byBmaWxsIHRoZSBlbnRpcmUgY29udGV4dCBmdWxsIG9mIGRhdGEgYmVjYXVzZSB0aGUgbG9va3Vwc1xuICAgICAgLy8gYXJlIGV4cGVuc2l2ZS4gSW5zdGVhZCwgb25seSB0aGUgdGFyZ2V0IGRhdGEgKHRoZSBlbGVtZW50LCBjb21wb250ZW50IG9yXG4gICAgICAvLyBkaXJlY3RpdmUgZGV0YWlscykgYXJlIGZpbGxlZCBpbnRvIHRoZSBjb250ZXh0LiBJZiBjYWxsZWQgbXVsdGlwbGUgdGltZXNcbiAgICAgIC8vIHdpdGggZGlmZmVyZW50IHRhcmdldCB2YWx1ZXMgdGhlbiB0aGUgbWlzc2luZyB0YXJnZXQgZGF0YSB3aWxsIGJlIGZpbGxlZCBpbi5cbiAgICAgIGNvbnN0IGxOb2RlID0gZ2V0TE5vZGVGcm9tVmlld0RhdGEobFZpZXdEYXRhLCBsTm9kZUluZGV4KSAhO1xuICAgICAgY29uc3QgZXhpc3RpbmdDdHggPSByZWFkUGF0Y2hlZERhdGEobE5vZGUubmF0aXZlKTtcbiAgICAgIGNvbnN0IGNvbnRleHQ6IExDb250ZXh0ID0gKGV4aXN0aW5nQ3R4ICYmICFBcnJheS5pc0FycmF5KGV4aXN0aW5nQ3R4KSkgP1xuICAgICAgICAgIGV4aXN0aW5nQ3R4IDpcbiAgICAgICAgICBjcmVhdGVMQ29udGV4dChsVmlld0RhdGEsIGxOb2RlSW5kZXgsIGxOb2RlLm5hdGl2ZSk7XG5cbiAgICAgIC8vIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRpc2NvdmVyZWQgdGhlbiB1cGRhdGUgdGhlIG1vbmtleS1wYXRjaFxuICAgICAgaWYgKGNvbXBvbmVudCAmJiBjb250ZXh0LmNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnRleHQuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgICAgICBhdHRhY2hQYXRjaERhdGEoY29udGV4dC5jb21wb25lbnQsIGNvbnRleHQpO1xuICAgICAgfVxuXG4gICAgICAvLyBvbmx5IHdoZW4gdGhlIGRpcmVjdGl2ZXMgaGF2ZSBiZWVuIGRpc2NvdmVyZWQgdGhlbiB1cGRhdGUgdGhlIG1vbmtleS1wYXRjaFxuICAgICAgaWYgKGRpcmVjdGl2ZXMgJiYgZGlyZWN0aXZlSW5kaWNlcyAmJiBjb250ZXh0LmRpcmVjdGl2ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250ZXh0LmRpcmVjdGl2ZUluZGljZXMgPSBkaXJlY3RpdmVJbmRpY2VzO1xuICAgICAgICBjb250ZXh0LmRpcmVjdGl2ZXMgPSBkaXJlY3RpdmVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGl2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhdHRhY2hQYXRjaERhdGEoZGlyZWN0aXZlc1tpXSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYXR0YWNoUGF0Y2hEYXRhKGNvbnRleHQubmF0aXZlLCBjb250ZXh0KTtcbiAgICAgIG1wVmFsdWUgPSBjb250ZXh0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCByRWxlbWVudCA9IHRhcmdldCBhcyBSRWxlbWVudDtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RG9tRWxlbWVudChyRWxlbWVudCk7XG5cbiAgICAvLyBpZiB0aGUgY29udGV4dCBpcyBub3QgZm91bmQgdGhlbiB3ZSBuZWVkIHRvIHRyYXZlcnNlIHVwd2FyZHMgdXAgdGhlIERPTVxuICAgIC8vIHRvIGZpbmQgdGhlIG5lYXJlc3QgZWxlbWVudCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gbW9ua2V5IHBhdGNoZWQgd2l0aCBkYXRhXG4gICAgbGV0IHBhcmVudCA9IHJFbGVtZW50IGFzIGFueTtcbiAgICB3aGlsZSAocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnN0IHBhcmVudENvbnRleHQgPSByZWFkUGF0Y2hlZERhdGEocGFyZW50KTtcbiAgICAgIGlmIChwYXJlbnRDb250ZXh0KSB7XG4gICAgICAgIGxldCBsVmlld0RhdGE6IExWaWV3RGF0YXxudWxsO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJlbnRDb250ZXh0KSkge1xuICAgICAgICAgIGxWaWV3RGF0YSA9IHBhcmVudENvbnRleHQgYXMgTFZpZXdEYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxWaWV3RGF0YSA9IHBhcmVudENvbnRleHQubFZpZXdEYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGVkZ2Ugb2YgdGhlIGFwcCB3YXMgYWxzbyByZWFjaGVkIGhlcmUgdGhyb3VnaCBhbm90aGVyIG1lYW5zXG4gICAgICAgIC8vIChtYXliZSBiZWNhdXNlIHRoZSBET00gd2FzIGNoYW5nZWQgbWFudWFsbHkpLlxuICAgICAgICBpZiAoIWxWaWV3RGF0YSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBmaW5kVmlhTmF0aXZlRWxlbWVudChsVmlld0RhdGEsIHJFbGVtZW50KTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICBjb25zdCBsTm9kZSA9IGdldExOb2RlRnJvbVZpZXdEYXRhKGxWaWV3RGF0YSwgaW5kZXgpICE7XG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IGNyZWF0ZUxDb250ZXh0KGxWaWV3RGF0YSwgaW5kZXgsIGxOb2RlLm5hdGl2ZSk7XG4gICAgICAgICAgYXR0YWNoUGF0Y2hEYXRhKGxOb2RlLm5hdGl2ZSwgY29udGV4dCk7XG4gICAgICAgICAgbXBWYWx1ZSA9IGNvbnRleHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIChtcFZhbHVlIGFzIExDb250ZXh0KSB8fCBudWxsO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gZW1wdHkgaW5zdGFuY2Ugb2YgYSBgTENvbnRleHRgIGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTENvbnRleHQobFZpZXdEYXRhOiBMVmlld0RhdGEsIGxOb2RlSW5kZXg6IG51bWJlciwgbmF0aXZlOiBSRWxlbWVudCk6IExDb250ZXh0IHtcbiAgcmV0dXJuIHtcbiAgICBsVmlld0RhdGEsXG4gICAgbE5vZGVJbmRleCxcbiAgICBuYXRpdmUsXG4gICAgY29tcG9uZW50OiB1bmRlZmluZWQsXG4gICAgZGlyZWN0aXZlSW5kaWNlczogdW5kZWZpbmVkLFxuICAgIGRpcmVjdGl2ZXM6IHVuZGVmaW5lZCxcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHV0aWxpdHkgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgdGhlIG1hdGNoaW5nIGxFbGVtZW50Tm9kZVxuICogZnJvbSBhIGdpdmVuIERPTSBlbGVtZW50LCBjb21wb25lbnQgb3IgZGlyZWN0aXZlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TEVsZW1lbnROb2RlKHRhcmdldDogYW55KTogTEVsZW1lbnROb2RlfG51bGwge1xuICBjb25zdCBjb250ZXh0ID0gZ2V0Q29udGV4dCh0YXJnZXQpO1xuICByZXR1cm4gY29udGV4dCA/IGdldExOb2RlRnJvbVZpZXdEYXRhKGNvbnRleHQubFZpZXdEYXRhLCBjb250ZXh0LmxOb2RlSW5kZXgpIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExFbGVtZW50RnJvbVJvb3RDb21wb25lbnQocm9vdENvbXBvbmVudEluc3RhbmNlOiB7fSk6IExFbGVtZW50Tm9kZXxudWxsIHtcbiAgLy8gdGhlIGhvc3QgZWxlbWVudCBmb3IgdGhlIHJvb3QgY29tcG9uZW50IGlzIEFMV0FZUyB0aGUgZmlyc3QgZWxlbWVudFxuICAvLyBpbiB0aGUgbFZpZXdEYXRhIGFycmF5ICh3aGljaCBpcyB3aGVyZSBIRUFERVJfT0ZGU0VUIHBvaW50cyB0bylcbiAgY29uc3QgbFZpZXdEYXRhID0gcmVhZFBhdGNoZWRMVmlld0RhdGEocm9vdENvbXBvbmVudEluc3RhbmNlKSAhO1xuICByZXR1cm4gcmVhZEVsZW1lbnRWYWx1ZShsVmlld0RhdGFbSEVBREVSX09GRlNFVF0pO1xufVxuXG4vKipcbiAqIEEgc2ltcGxpZmllZCBsb29rdXAgZnVuY3Rpb24gZm9yIGZpbmRpbmcgdGhlIExFbGVtZW50Tm9kZSBmcm9tIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZXhpc3RzIGZvciB0cmVlLXNoYWtpbmcgcHVycG9zZXMgdG8gYXZvaWQgaGF2aW5nIHRvIHB1bGwgaW4gZXZlcnl0aGluZ1xuICogdGhhdCBgZ2V0Q29udGV4dGAgaGFzIGluIHRoZSBldmVudCB0aGF0IGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gZG9lc24ndCBuZWVkIHRvIGhhdmVcbiAqIGFueSBwcm9ncmFtbWF0aWMgYWNjZXNzIHRvIGFuIGVsZW1lbnQncyBjb250ZXh0IChvbmx5IGNoYW5nZSBkZXRlY3Rpb24gdXNlcyB0aGlzIGZ1bmN0aW9uKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExFbGVtZW50RnJvbUNvbXBvbmVudChjb21wb25lbnRJbnN0YW5jZToge30pOiBMRWxlbWVudE5vZGUge1xuICBsZXQgbFZpZXdEYXRhID0gcmVhZFBhdGNoZWREYXRhKGNvbXBvbmVudEluc3RhbmNlKTtcbiAgbGV0IGxOb2RlOiBMRWxlbWVudE5vZGU7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobFZpZXdEYXRhKSkge1xuICAgIGNvbnN0IGxOb2RlSW5kZXggPSBmaW5kVmlhQ29tcG9uZW50KGxWaWV3RGF0YSwgY29tcG9uZW50SW5zdGFuY2UpO1xuICAgIGxOb2RlID0gcmVhZEVsZW1lbnRWYWx1ZShsVmlld0RhdGFbbE5vZGVJbmRleF0pO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjcmVhdGVMQ29udGV4dChsVmlld0RhdGEsIGxOb2RlSW5kZXgsIGxOb2RlLm5hdGl2ZSk7XG4gICAgY29udGV4dC5jb21wb25lbnQgPSBjb21wb25lbnRJbnN0YW5jZTtcbiAgICBhdHRhY2hQYXRjaERhdGEoY29tcG9uZW50SW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIGF0dGFjaFBhdGNoRGF0YShjb250ZXh0Lm5hdGl2ZSwgY29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY29udGV4dCA9IGxWaWV3RGF0YSBhcyBhbnkgYXMgTENvbnRleHQ7XG4gICAgbE5vZGUgPSByZWFkRWxlbWVudFZhbHVlKGNvbnRleHQubFZpZXdEYXRhW2NvbnRleHQubE5vZGVJbmRleF0pO1xuICB9XG5cbiAgcmV0dXJuIGxOb2RlO1xufVxuXG4vKipcbiAqIEFzc2lnbnMgdGhlIGdpdmVuIGRhdGEgdG8gdGhlIGdpdmVuIHRhcmdldCAod2hpY2ggY291bGQgYmUgYSBjb21wb25lbnQsXG4gKiBkaXJlY3RpdmUgb3IgRE9NIG5vZGUgaW5zdGFuY2UpIHVzaW5nIG1vbmtleS1wYXRjaGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFBhdGNoRGF0YSh0YXJnZXQ6IGFueSwgZGF0YTogTFZpZXdEYXRhIHwgTENvbnRleHQpIHtcbiAgdGFyZ2V0W01PTktFWV9QQVRDSF9LRVlfTkFNRV0gPSBkYXRhO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIG1vbmtleS1wYXRjaCB2YWx1ZSBkYXRhIHByZXNlbnQgb24gdGhlIHRhcmdldCAod2hpY2ggY291bGQgYmVcbiAqIGEgY29tcG9uZW50LCBkaXJlY3RpdmUgb3IgYSBET00gbm9kZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGF0Y2hlZERhdGEodGFyZ2V0OiBhbnkpOiBMVmlld0RhdGF8TENvbnRleHR8bnVsbCB7XG4gIHJldHVybiB0YXJnZXRbTU9OS0VZX1BBVENIX0tFWV9OQU1FXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRQYXRjaGVkTFZpZXdEYXRhKHRhcmdldDogYW55KTogTFZpZXdEYXRhfG51bGwge1xuICBjb25zdCB2YWx1ZSA9IHJlYWRQYXRjaGVkRGF0YSh0YXJnZXQpO1xuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6ICh2YWx1ZSBhcyBMQ29udGV4dCkubFZpZXdEYXRhO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnRJbnN0YW5jZShpbnN0YW5jZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBpbnN0YW5jZSAmJiBpbnN0YW5jZS5jb25zdHJ1Y3RvciAmJiBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5uZ0NvbXBvbmVudERlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlyZWN0aXZlSW5zdGFuY2UoaW5zdGFuY2U6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaW5zdGFuY2UgJiYgaW5zdGFuY2UuY29uc3RydWN0b3IgJiYgaW5zdGFuY2UuY29uc3RydWN0b3IubmdEaXJlY3RpdmVEZWY7XG59XG5cbi8qKlxuICogTG9jYXRlcyB0aGUgZWxlbWVudCB3aXRoaW4gdGhlIGdpdmVuIExWaWV3RGF0YSBhbmQgcmV0dXJucyB0aGUgbWF0Y2hpbmcgaW5kZXhcbiAqL1xuZnVuY3Rpb24gZmluZFZpYU5hdGl2ZUVsZW1lbnQobFZpZXdEYXRhOiBMVmlld0RhdGEsIG5hdGl2ZTogUkVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgdE5vZGUgPSBsVmlld0RhdGFbVFZJRVddLmZpcnN0Q2hpbGQ7XG4gIHdoaWxlICh0Tm9kZSkge1xuICAgIGNvbnN0IGxOb2RlID0gZ2V0TE5vZGVGcm9tVmlld0RhdGEobFZpZXdEYXRhLCB0Tm9kZS5pbmRleCkgITtcbiAgICBpZiAobE5vZGUubmF0aXZlID09PSBuYXRpdmUpIHtcbiAgICAgIHJldHVybiB0Tm9kZS5pbmRleDtcbiAgICB9XG4gICAgdE5vZGUgPSB0cmF2ZXJzZU5leHRFbGVtZW50KHROb2RlKTtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBMb2NhdGVzIHRoZSBuZXh0IHROb2RlIChjaGlsZCwgc2libGluZyBvciBwYXJlbnQpLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZU5leHRFbGVtZW50KHROb2RlOiBUTm9kZSk6IFROb2RlfG51bGwge1xuICBpZiAodE5vZGUuY2hpbGQpIHtcbiAgICByZXR1cm4gdE5vZGUuY2hpbGQ7XG4gIH0gZWxzZSBpZiAodE5vZGUubmV4dCkge1xuICAgIHJldHVybiB0Tm9kZS5uZXh0O1xuICB9IGVsc2UgaWYgKHROb2RlLnBhcmVudCkge1xuICAgIHJldHVybiB0Tm9kZS5wYXJlbnQubmV4dCB8fCBudWxsO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIExvY2F0ZXMgdGhlIGNvbXBvbmVudCB3aXRoaW4gdGhlIGdpdmVuIExWaWV3RGF0YSBhbmQgcmV0dXJucyB0aGUgbWF0Y2hpbmcgaW5kZXhcbiAqL1xuZnVuY3Rpb24gZmluZFZpYUNvbXBvbmVudChsVmlld0RhdGE6IExWaWV3RGF0YSwgY29tcG9uZW50SW5zdGFuY2U6IHt9KTogbnVtYmVyIHtcbiAgY29uc3QgY29tcG9uZW50SW5kaWNlcyA9IGxWaWV3RGF0YVtUVklFV10uY29tcG9uZW50cztcbiAgaWYgKGNvbXBvbmVudEluZGljZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbXBvbmVudEluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRDb21wb25lbnRJbmRleCA9IGNvbXBvbmVudEluZGljZXNbaV07XG4gICAgICBjb25zdCBsTm9kZURhdGEgPSByZWFkRWxlbWVudFZhbHVlKGxWaWV3RGF0YVtlbGVtZW50Q29tcG9uZW50SW5kZXhdICEpLmRhdGEgITtcbiAgICAgIGlmIChsTm9kZURhdGFbQ09OVEVYVF0gPT09IGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Q29tcG9uZW50SW5kZXg7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJvb3ROb2RlID0gbFZpZXdEYXRhW0hFQURFUl9PRkZTRVRdO1xuICAgIGNvbnN0IHJvb3RDb21wb25lbnQgPSByb290Tm9kZS5kYXRhW0NPTlRFWFRdO1xuICAgIGlmIChyb290Q29tcG9uZW50ID09PSBjb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgLy8gd2UgYXJlIGRlYWxpbmcgd2l0aCB0aGUgcm9vdCBlbGVtZW50IGhlcmUgdGhlcmVmb3JlIHdlIGtub3cgdGhhdCB0aGVcbiAgICAgIC8vIGVsZW1lbnQgaXMgdGhlIHZlcnkgZmlyc3QgZWxlbWVudCBhZnRlciB0aGUgSEVBREVSIGRhdGEgaW4gdGhlIGxWaWV3XG4gICAgICByZXR1cm4gSEVBREVSX09GRlNFVDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIExvY2F0ZXMgdGhlIGRpcmVjdGl2ZSB3aXRoaW4gdGhlIGdpdmVuIExWaWV3RGF0YSBhbmQgcmV0dXJucyB0aGUgbWF0Y2hpbmcgaW5kZXhcbiAqL1xuZnVuY3Rpb24gZmluZFZpYURpcmVjdGl2ZShsVmlld0RhdGE6IExWaWV3RGF0YSwgZGlyZWN0aXZlSW5zdGFuY2U6IHt9KTogbnVtYmVyIHtcbiAgLy8gaWYgYSBkaXJlY3RpdmUgaXMgbW9ua2V5IHBhdGNoZWQgdGhlbiBpdCB3aWxsIChieSBkZWZhdWx0KVxuICAvLyBoYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBMVmlld0RhdGEgb2YgdGhlIGN1cnJlbnQgdmlldy4gVGhlXG4gIC8vIGVsZW1lbnQgYm91bmQgdG8gdGhlIGRpcmVjdGl2ZSBiZWluZyBzZWFyY2ggbGl2ZXMgc29tZXdoZXJlXG4gIC8vIGluIHRoZSB2aWV3IGRhdGEuIEJ5IGZpcnN0IGNoZWNraW5nIHRvIHNlZSBpZiB0aGUgaW5zdGFuY2VcbiAgLy8gaXMgYWN0dWFsbHkgcHJlc2VudCB3ZSBjYW4gbmFycm93IGRvd24gdG8gd2hpY2ggbEVsZW1lbnROb2RlXG4gIC8vIGNvbnRhaW5zIHRoZSBpbnN0YW5jZSBvZiB0aGUgZGlyZWN0aXZlIGFuZCB0aGVuIHJldHVybiB0aGUgaW5kZXhcbiAgY29uc3QgZGlyZWN0aXZlc0Fjcm9zc1ZpZXcgPSBsVmlld0RhdGFbRElSRUNUSVZFU107XG4gIGNvbnN0IGRpcmVjdGl2ZUluZGV4ID1cbiAgICAgIGRpcmVjdGl2ZXNBY3Jvc3NWaWV3ID8gZGlyZWN0aXZlc0Fjcm9zc1ZpZXcuaW5kZXhPZihkaXJlY3RpdmVJbnN0YW5jZSkgOiAtMTtcbiAgaWYgKGRpcmVjdGl2ZUluZGV4ID49IDApIHtcbiAgICBsZXQgdE5vZGUgPSBsVmlld0RhdGFbVFZJRVddLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUgKHROb2RlKSB7XG4gICAgICBjb25zdCBkaXJlY3RpdmVJbmRleFN0YXJ0ID0gZ2V0RGlyZWN0aXZlU3RhcnRJbmRleCh0Tm9kZSk7XG4gICAgICBjb25zdCBkaXJlY3RpdmVJbmRleEVuZCA9IGdldERpcmVjdGl2ZUVuZEluZGV4KHROb2RlLCBkaXJlY3RpdmVJbmRleFN0YXJ0KTtcbiAgICAgIGlmIChkaXJlY3RpdmVJbmRleCA+PSBkaXJlY3RpdmVJbmRleFN0YXJ0ICYmIGRpcmVjdGl2ZUluZGV4IDwgZGlyZWN0aXZlSW5kZXhFbmQpIHtcbiAgICAgICAgcmV0dXJuIHROb2RlLmluZGV4O1xuICAgICAgfVxuICAgICAgdE5vZGUgPSB0cmF2ZXJzZU5leHRFbGVtZW50KHROb2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGFzc2VydERvbUVsZW1lbnQoZWxlbWVudDogYW55KSB7XG4gIGFzc2VydEVxdWFsKGVsZW1lbnQubm9kZVR5cGUsIDEsICdUaGUgcHJvdmlkZWQgdmFsdWUgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBhbiBIVE1MRWxlbWVudCcpO1xufVxuXG4vKipcbiAqIFJldHJ1bnMgdGhlIGluc3RhbmNlIG9mIHRoZSBMRWxlbWVudE5vZGUgYXQgdGhlIGdpdmVuIGluZGV4IGluIHRoZSBMVmlld0RhdGEuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGFsc28gdW53cmFwIHRoZSBpbm5lciB2YWx1ZSBpbmNhc2UgaXQncyBzdHVmZmVkIGludG8gYW5cbiAqIGFycmF5ICh3aGljaCBpcyB3aGF0IGhhcHBlbnMgd2hlbiBbc3R5bGVdIGFuZCBbY2xhc3NdIGJpbmRpbmdzIGFyZSBwcmVzZW50XG4gKiBpbiB0aGUgdmlldyBpbnN0cnVjdGlvbnMgZm9yIHRoZSBlbGVtZW50IGJlaW5nIHJldHVybmVkKS5cbiAqL1xuZnVuY3Rpb24gZ2V0TE5vZGVGcm9tVmlld0RhdGEobFZpZXdEYXRhOiBMVmlld0RhdGEsIGxFbGVtZW50SW5kZXg6IG51bWJlcik6IExFbGVtZW50Tm9kZXxudWxsIHtcbiAgY29uc3QgdmFsdWUgPSBsVmlld0RhdGFbbEVsZW1lbnRJbmRleF07XG4gIHJldHVybiB2YWx1ZSA/IHJlYWRFbGVtZW50VmFsdWUodmFsdWUpIDogbnVsbDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY29sbGVjdGlvbiBvZiBkaXJlY3RpdmUgaW5kZXggdmFsdWVzIHRoYXQgYXJlIHVzZWQgb24gdGhlIGVsZW1lbnRcbiAqICh3aGljaCBpcyByZWZlcmVuY2VkIGJ5IHRoZSBsTm9kZUluZGV4KVxuICovXG5mdW5jdGlvbiBkaXNjb3ZlckRpcmVjdGl2ZUluZGljZXMobFZpZXdEYXRhOiBMVmlld0RhdGEsIGxOb2RlSW5kZXg6IG51bWJlcik6IG51bWJlcltdfG51bGwge1xuICBjb25zdCBkaXJlY3RpdmVzQWNyb3NzVmlldyA9IGxWaWV3RGF0YVtESVJFQ1RJVkVTXTtcbiAgY29uc3QgdE5vZGUgPSBsVmlld0RhdGFbVFZJRVddLmRhdGFbbE5vZGVJbmRleF0gYXMgVE5vZGU7XG4gIGlmIChkaXJlY3RpdmVzQWNyb3NzVmlldyAmJiBkaXJlY3RpdmVzQWNyb3NzVmlldy5sZW5ndGgpIHtcbiAgICAvLyB0aGlzIGNoZWNrIGZvciB0Tm9kZSBpcyB0byBkZXRlcm1pbmUgaWYgdGhlIHZhbHVlIGlzIGEgTEVsZW1lbnROb2RlIGluc3RhbmNlXG4gICAgY29uc3QgZGlyZWN0aXZlSW5kZXhTdGFydCA9IGdldERpcmVjdGl2ZVN0YXJ0SW5kZXgodE5vZGUpO1xuICAgIGNvbnN0IGRpcmVjdGl2ZUluZGV4RW5kID0gZ2V0RGlyZWN0aXZlRW5kSW5kZXgodE5vZGUsIGRpcmVjdGl2ZUluZGV4U3RhcnQpO1xuICAgIGNvbnN0IGRpcmVjdGl2ZUluZGljZXM6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IGRpcmVjdGl2ZUluZGV4U3RhcnQ7IGkgPCBkaXJlY3RpdmVJbmRleEVuZDsgaSsrKSB7XG4gICAgICAvLyBzcGVjaWFsIGNhc2Ugc2luY2UgdGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgKGlmIGl0IGV4aXN0cylcbiAgICAgIC8vIGlzIHN0b3JlZCBpbiB0aGUgZGlyZWN0aXZlcyBhcnJheS5cbiAgICAgIGlmIChpID4gZGlyZWN0aXZlSW5kZXhTdGFydCB8fFxuICAgICAgICAgICFpc0NvbXBvbmVudEluc3RhbmNlKGRpcmVjdGl2ZXNBY3Jvc3NWaWV3W2RpcmVjdGl2ZUluZGV4U3RhcnRdKSkge1xuICAgICAgICBkaXJlY3RpdmVJbmRpY2VzLnB1c2goaSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkaXJlY3RpdmVJbmRpY2VzLmxlbmd0aCA/IGRpcmVjdGl2ZUluZGljZXMgOiBudWxsO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBkaXNjb3ZlckRpcmVjdGl2ZXMobFZpZXdEYXRhOiBMVmlld0RhdGEsIGRpcmVjdGl2ZUluZGljZXM6IG51bWJlcltdKTogbnVtYmVyW118bnVsbCB7XG4gIGNvbnN0IGRpcmVjdGl2ZXM6IGFueVtdID0gW107XG4gIGNvbnN0IGRpcmVjdGl2ZUluc3RhbmNlcyA9IGxWaWV3RGF0YVtESVJFQ1RJVkVTXTtcbiAgaWYgKGRpcmVjdGl2ZUluc3RhbmNlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlyZWN0aXZlSW5kaWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZGlyZWN0aXZlSW5kZXggPSBkaXJlY3RpdmVJbmRpY2VzW2ldO1xuICAgICAgY29uc3QgZGlyZWN0aXZlID0gZGlyZWN0aXZlSW5zdGFuY2VzW2RpcmVjdGl2ZUluZGV4XTtcbiAgICAgIGRpcmVjdGl2ZXMucHVzaChkaXJlY3RpdmUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGlyZWN0aXZlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGlyZWN0aXZlU3RhcnRJbmRleCh0Tm9kZTogVE5vZGUpOiBudW1iZXIge1xuICAvLyB0aGUgdE5vZGUgaW5zdGFuY2VzIHN0b3JlIGEgZmxhZyB2YWx1ZSB3aGljaCB0aGVuIGhhcyBhXG4gIC8vIHBvaW50ZXIgd2hpY2ggdGVsbHMgdGhlIHN0YXJ0aW5nIGluZGV4IG9mIHdoZXJlIGFsbCB0aGVcbiAgLy8gYWN0aXZlIGRpcmVjdGl2ZXMgYXJlIGluIHRoZSBtYXN0ZXIgZGlyZWN0aXZlIGFycmF5XG4gIHJldHVybiB0Tm9kZS5mbGFncyA+PiBUTm9kZUZsYWdzLkRpcmVjdGl2ZVN0YXJ0aW5nSW5kZXhTaGlmdDtcbn1cblxuZnVuY3Rpb24gZ2V0RGlyZWN0aXZlRW5kSW5kZXgodE5vZGU6IFROb2RlLCBzdGFydEluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAvLyBUaGUgZW5kIHZhbHVlIGlzIGFsc28gYSBwYXJ0IG9mIHRoZSBzYW1lIGZsYWdcbiAgLy8gKHNlZSBgVE5vZGVGbGFnc2AgdG8gc2VlIGhvdyB0aGUgZmxhZyBiaXQgc2hpZnRpbmdcbiAgLy8gdmFsdWVzIGFyZSB1c2VkKS5cbiAgY29uc3QgY291bnQgPSB0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuRGlyZWN0aXZlQ291bnRNYXNrO1xuICByZXR1cm4gY291bnQgPyAoc3RhcnRJbmRleCArIGNvdW50KSA6IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEVsZW1lbnRWYWx1ZSh2YWx1ZTogTEVsZW1lbnROb2RlIHwgYW55W10pOiBMRWxlbWVudE5vZGUge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsdWUpID8gKHZhbHVlIGFzIGFueSBhcyBhbnlbXSlbMF0gOiB2YWx1ZSkgYXMgTEVsZW1lbnROb2RlO1xufVxuIl19