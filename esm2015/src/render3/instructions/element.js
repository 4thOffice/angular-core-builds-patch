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
import { assertDataInRange, assertDefined, assertEqual } from '../../util/assert';
import { assertHasParent } from '../assert';
import { attachPatchData } from '../context_discovery';
import { registerPostOrderHooks } from '../hooks';
import { isContentQueryHost, isDirectiveHost } from '../interfaces/type_checks';
import { HEADER_OFFSET, RENDERER, TVIEW, T_HOST } from '../interfaces/view';
import { assertNodeType } from '../node_assert';
import { appendChild } from '../node_manipulation';
import { decreaseElementDepthCount, getBindingIndex, getElementDepthCount, getIsParent, getLView, getNamespace, getPreviousOrParentTNode, getSelectedIndex, increaseElementDepthCount, setIsNotParent, setPreviousOrParentTNode } from '../state';
import { setUpAttributes } from '../util/attrs_utils';
import { getInitialStylingValue, hasClassInput, hasStyleInput, selectClassBasedInputName } from '../util/styling_utils';
import { getNativeByTNode, getTNode } from '../util/view_utils';
import { createDirectivesInstances, elementCreate, executeContentQueries, getOrCreateTNode, matchingSchemas, renderInitialStyling, resolveDirectives, saveResolvedLocalsInData, setInputsForProperty } from './shared';
import { registerInitialStylingOnTNode } from './styling';
/**
 * Create DOM element. The instruction must later be followed by `elementEnd()` call.
 *
 * \@codeGenApi
 * @param {?} index Index of the element in the LView array
 * @param {?} name Name of the DOM Node
 * @param {?=} constsIndex Index of the element in the `consts` array.
 * @param {?=} localRefs A set of local reference bindings on the element.
 *
 * Attributes and localRefs are passed as an array of strings where elements with an even index
 * hold an attribute name and elements with an odd index hold an attribute value, ex.:
 * ['id', 'warning5', 'class', 'alert']
 *
 * @return {?}
 */
export function ɵɵelementStart(index, name, constsIndex, localRefs) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const tView = lView[TVIEW];
    /** @type {?} */
    const tViewConsts = tView.consts;
    /** @type {?} */
    const consts = tViewConsts === null || constsIndex == null ? null : tViewConsts[constsIndex];
    ngDevMode && assertEqual(getBindingIndex(), tView.bindingStartIndex, 'elements should be created before any bindings');
    ngDevMode && ngDevMode.rendererCreateElement++;
    ngDevMode && assertDataInRange(lView, index + HEADER_OFFSET);
    /** @type {?} */
    const renderer = lView[RENDERER];
    /** @type {?} */
    const native = lView[index + HEADER_OFFSET] = elementCreate(name, renderer, getNamespace());
    /** @type {?} */
    const tNode = getOrCreateTNode(tView, lView[T_HOST], index, 3 /* Element */, name, consts);
    if (consts != null) {
        /** @type {?} */
        const lastAttrIndex = setUpAttributes(renderer, native, consts);
        if (tView.firstTemplatePass) {
            registerInitialStylingOnTNode(tNode, consts, lastAttrIndex);
        }
    }
    if ((tNode.flags & 64 /* hasInitialStyling */) === 64 /* hasInitialStyling */) {
        renderInitialStyling(renderer, native, tNode, false);
    }
    appendChild(native, tNode, lView);
    // any immediate children of a component or template container must be pre-emptively
    // monkey-patched with the component view data so that the element can be inspected
    // later on using any element discovery utility methods (see `element_discovery.ts`)
    if (getElementDepthCount() === 0) {
        attachPatchData(native, lView);
    }
    increaseElementDepthCount();
    // if a directive contains a host binding for "class" then all class-based data will
    // flow through that (except for `[class.prop]` bindings). This also includes initial
    // static class values as well. (Note that this will be fixed once map-based `[style]`
    // and `[class]` bindings work for multiple directives.)
    if (tView.firstTemplatePass) {
        ngDevMode && ngDevMode.firstTemplatePass++;
        /** @type {?} */
        const hasDirectives = resolveDirectives(tView, lView, tNode, localRefs || null);
        ngDevMode && validateElement(lView, native, tNode, hasDirectives);
        if (tView.queries !== null) {
            tView.queries.elementStart(tView, tNode);
        }
    }
    if (isDirectiveHost(tNode)) {
        createDirectivesInstances(tView, lView, tNode);
        executeContentQueries(tView, tNode, lView);
    }
    if (localRefs != null) {
        saveResolvedLocalsInData(lView, tNode);
    }
}
/**
 * Mark the end of the element.
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵelementEnd() {
    /** @type {?} */
    let previousOrParentTNode = getPreviousOrParentTNode();
    ngDevMode && assertDefined(previousOrParentTNode, 'No parent node to close.');
    if (getIsParent()) {
        setIsNotParent();
    }
    else {
        ngDevMode && assertHasParent(getPreviousOrParentTNode());
        previousOrParentTNode = (/** @type {?} */ (previousOrParentTNode.parent));
        setPreviousOrParentTNode(previousOrParentTNode, false);
    }
    /** @type {?} */
    const tNode = previousOrParentTNode;
    ngDevMode && assertNodeType(tNode, 3 /* Element */);
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const tView = lView[TVIEW];
    decreaseElementDepthCount();
    if (tView.firstTemplatePass) {
        registerPostOrderHooks(tView, previousOrParentTNode);
        if (isContentQueryHost(previousOrParentTNode)) {
            (/** @type {?} */ (tView.queries)).elementEnd(previousOrParentTNode);
        }
    }
    if (hasClassInput(tNode)) {
        /** @type {?} */
        const inputName = selectClassBasedInputName((/** @type {?} */ (tNode.inputs)));
        setDirectiveStylingInput(tNode.classes, lView, (/** @type {?} */ (tNode.inputs))[inputName]);
    }
    if (hasStyleInput(tNode)) {
        setDirectiveStylingInput(tNode.styles, lView, (/** @type {?} */ (tNode.inputs))['style']);
    }
}
/**
 * Creates an empty element using {\@link elementStart} and {\@link elementEnd}
 *
 * \@codeGenApi
 * @param {?} index Index of the element in the data array
 * @param {?} name Name of the DOM Node
 * @param {?=} constsIndex Index of the element in the `consts` array.
 * @param {?=} localRefs A set of local reference bindings on the element.
 *
 * @return {?}
 */
export function ɵɵelement(index, name, constsIndex, localRefs) {
    ɵɵelementStart(index, name, constsIndex, localRefs);
    ɵɵelementEnd();
}
/**
 * Assign static attribute values to a host element.
 *
 * This instruction will assign static attribute values as well as class and style
 * values to an element within the host bindings function. Since attribute values
 * can consist of different types of values, the `attrs` array must include the values in
 * the following format:
 *
 * attrs = [
 *   // static attributes (like `title`, `name`, `id`...)
 *   attr1, value1, attr2, value,
 *
 *   // a single namespace value (like `x:id`)
 *   NAMESPACE_MARKER, namespaceUri1, name1, value1,
 *
 *   // another single namespace value (like `x:name`)
 *   NAMESPACE_MARKER, namespaceUri2, name2, value2,
 *
 *   // a series of CSS classes that will be applied to the element (no spaces)
 *   CLASSES_MARKER, class1, class2, class3,
 *
 *   // a series of CSS styles (property + value) that will be applied to the element
 *   STYLES_MARKER, prop1, value1, prop2, value2
 * ]
 *
 * All non-class and non-style attributes must be defined at the start of the list
 * first before all class and style values are set. When there is a change in value
 * type (like when classes and styles are introduced) a marker must be used to separate
 * the entries. The marker values themselves are set via entries found in the
 * [AttributeMarker] enum.
 *
 * NOTE: This instruction is meant to used from `hostBindings` function only.
 *
 * \@codeGenApi
 * @param {?} attrs An array of static values (attributes, classes and styles) with the correct marker
 * values.
 *
 * @return {?}
 */
export function ɵɵelementHostAttrs(attrs) {
    /** @type {?} */
    const hostElementIndex = getSelectedIndex();
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const tView = lView[TVIEW];
    /** @type {?} */
    const tNode = getTNode(hostElementIndex, lView);
    // non-element nodes (e.g. `<ng-container>`) are not rendered as actual
    // element nodes and adding styles/classes on to them will cause runtime
    // errors...
    if (tNode.type === 3 /* Element */) {
        /** @type {?} */
        const native = (/** @type {?} */ (getNativeByTNode(tNode, lView)));
        /** @type {?} */
        const lastAttrIndex = setUpAttributes(lView[RENDERER], native, attrs);
        if (tView.firstTemplatePass) {
            /** @type {?} */
            const stylingNeedsToBeRendered = registerInitialStylingOnTNode(tNode, attrs, lastAttrIndex);
            // this is only called during the first template pass in the
            // event that this current directive assigned initial style/class
            // host attribute values to the element. Because initial styling
            // values are applied before directives are first rendered (within
            // `createElement`) this means that initial styling for any directives
            // still needs to be applied. Note that this will only happen during
            // the first template pass and not each time a directive applies its
            // attribute values to the element.
            if (stylingNeedsToBeRendered) {
                /** @type {?} */
                const renderer = lView[RENDERER];
                renderInitialStyling(renderer, native, tNode, true);
            }
        }
    }
}
/**
 * @param {?} context
 * @param {?} lView
 * @param {?} stylingInputs
 * @return {?}
 */
function setDirectiveStylingInput(context, lView, stylingInputs) {
    // older versions of Angular treat the input as `null` in the
    // event that the value does not exist at all. For this reason
    // we can't have a styling value be an empty string.
    /** @type {?} */
    const value = (context && getInitialStylingValue(context)) || null;
    // Ivy does an extra `[class]` write with a falsy value since the value
    // is applied during creation mode. This is a deviation from VE and should
    // be (Jira Issue = FW-1467).
    setInputsForProperty(lView, stylingInputs, value);
}
/**
 * @param {?} hostView
 * @param {?} element
 * @param {?} tNode
 * @param {?} hasDirectives
 * @return {?}
 */
function validateElement(hostView, element, tNode, hasDirectives) {
    /** @type {?} */
    const tagName = tNode.tagName;
    // If the element matches any directive, it's considered as valid.
    if (!hasDirectives && tagName !== null) {
        // The element is unknown if it's an instance of HTMLUnknownElement or it isn't registered
        // as a custom element. Note that unknown elements with a dash in their name won't be instances
        // of HTMLUnknownElement in browsers that support web components.
        /** @type {?} */
        const isUnknown = (typeof HTMLUnknownElement === 'function' && element instanceof HTMLUnknownElement) ||
            (typeof customElements !== 'undefined' && tagName.indexOf('-') > -1 &&
                !customElements.get(tagName));
        if (isUnknown && !matchingSchemas(hostView, tagName)) {
            /** @type {?} */
            let errorMessage = `'${tagName}' is not a known element:\n`;
            errorMessage +=
                `1. If '${tagName}' is an Angular component, then verify that it is part of this module.\n`;
            if (tagName && tagName.indexOf('-') > -1) {
                errorMessage +=
                    `2. If '${tagName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.`;
            }
            else {
                errorMessage +=
                    `2. To allow any element add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.`;
            }
            throw new Error(errorMessage);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW5zdHJ1Y3Rpb25zL2VsZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDMUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUloRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsZUFBZSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBUyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSx5QkFBeUIsRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaFAsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLHlCQUF5QixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDdEgsT0FBTyxFQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixD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Q0FBQyxDQUFDO2dCQUNsRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEMsSUFBSSxTQUFTLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFOztnQkFDaEQsWUFBWSxHQUFHLElBQUksT0FBTyw2QkFBNkI7WUFDM0QsWUFBWTtnQkFDUixVQUFVLE9BQU8sMEVBQTBFLENBQUM7WUFDaEcsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDeEMsWUFBWTtvQkFDUixVQUFVLE9BQU8sK0hBQStILENBQUM7YUFDdEo7aUJBQU07Z0JBQ0wsWUFBWTtvQkFDUiw4RkFBOEYsQ0FBQzthQUNwRztZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0I7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RGF0YUluUmFuZ2UsIGFzc2VydERlZmluZWQsIGFzc2VydEVxdWFsfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge2Fzc2VydEhhc1BhcmVudH0gZnJvbSAnLi4vYXNzZXJ0JztcbmltcG9ydCB7YXR0YWNoUGF0Y2hEYXRhfSBmcm9tICcuLi9jb250ZXh0X2Rpc2NvdmVyeSc7XG5pbXBvcnQge3JlZ2lzdGVyUG9zdE9yZGVySG9va3N9IGZyb20gJy4uL2hvb2tzJztcbmltcG9ydCB7VEF0dHJpYnV0ZXMsIFROb2RlLCBUTm9kZUZsYWdzLCBUTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JFbGVtZW50fSBmcm9tICcuLi9pbnRlcmZhY2VzL3JlbmRlcmVyJztcbmltcG9ydCB7U3R5bGluZ01hcEFycmF5LCBUU3R5bGluZ0NvbnRleHR9IGZyb20gJy4uL2ludGVyZmFjZXMvc3R5bGluZyc7XG5pbXBvcnQge2lzQ29udGVudFF1ZXJ5SG9zdCwgaXNEaXJlY3RpdmVIb3N0fSBmcm9tICcuLi9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgTFZpZXcsIFJFTkRFUkVSLCBUVklFVywgVF9IT1NUfSBmcm9tICcuLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthc3NlcnROb2RlVHlwZX0gZnJvbSAnLi4vbm9kZV9hc3NlcnQnO1xuaW1wb3J0IHthcHBlbmRDaGlsZH0gZnJvbSAnLi4vbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtkZWNyZWFzZUVsZW1lbnREZXB0aENvdW50LCBnZXRCaW5kaW5nSW5kZXgsIGdldEVsZW1lbnREZXB0aENvdW50LCBnZXRJc1BhcmVudCwgZ2V0TFZpZXcsIGdldE5hbWVzcGFjZSwgZ2V0UHJldmlvdXNPclBhcmVudFROb2RlLCBnZXRTZWxlY3RlZEluZGV4LCBpbmNyZWFzZUVsZW1lbnREZXB0aENvdW50LCBzZXRJc05vdFBhcmVudCwgc2V0UHJldmlvdXNPclBhcmVudFROb2RlfSBmcm9tICcuLi9zdGF0ZSc7XG5pbXBvcnQge3NldFVwQXR0cmlidXRlc30gZnJvbSAnLi4vdXRpbC9hdHRyc191dGlscyc7XG5pbXBvcnQge2dldEluaXRpYWxTdHlsaW5nVmFsdWUsIGhhc0NsYXNzSW5wdXQsIGhhc1N0eWxlSW5wdXQsIHNlbGVjdENsYXNzQmFzZWRJbnB1dE5hbWV9IGZyb20gJy4uL3V0aWwvc3R5bGluZ191dGlscyc7XG5pbXBvcnQge2dldE5hdGl2ZUJ5VE5vZGUsIGdldFROb2RlfSBmcm9tICcuLi91dGlsL3ZpZXdfdXRpbHMnO1xuXG5pbXBvcnQge2NyZWF0ZURpcmVjdGl2ZXNJbnN0YW5jZXMsIGVsZW1lbnRDcmVhdGUsIGV4ZWN1dGVDb250ZW50UXVlcmllcywgZ2V0T3JDcmVhdGVUTm9kZSwgbWF0Y2hpbmdTY2hlbWFzLCByZW5kZXJJbml0aWFsU3R5bGluZywgcmVzb2x2ZURpcmVjdGl2ZXMsIHNhdmVSZXNvbHZlZExvY2Fsc0luRGF0YSwgc2V0SW5wdXRzRm9yUHJvcGVydHl9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7cmVnaXN0ZXJJbml0aWFsU3R5bGluZ09uVE5vZGV9IGZyb20gJy4vc3R5bGluZyc7XG5cblxuXG4vKipcbiAqIENyZWF0ZSBET00gZWxlbWVudC4gVGhlIGluc3RydWN0aW9uIG11c3QgbGF0ZXIgYmUgZm9sbG93ZWQgYnkgYGVsZW1lbnRFbmQoKWAgY2FsbC5cbiAqXG4gKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIExWaWV3IGFycmF5XG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBET00gTm9kZVxuICogQHBhcmFtIGNvbnN0c0luZGV4IEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRoZSBgY29uc3RzYCBhcnJheS5cbiAqIEBwYXJhbSBsb2NhbFJlZnMgQSBzZXQgb2YgbG9jYWwgcmVmZXJlbmNlIGJpbmRpbmdzIG9uIHRoZSBlbGVtZW50LlxuICpcbiAqIEF0dHJpYnV0ZXMgYW5kIGxvY2FsUmVmcyBhcmUgcGFzc2VkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3Mgd2hlcmUgZWxlbWVudHMgd2l0aCBhbiBldmVuIGluZGV4XG4gKiBob2xkIGFuIGF0dHJpYnV0ZSBuYW1lIGFuZCBlbGVtZW50cyB3aXRoIGFuIG9kZCBpbmRleCBob2xkIGFuIGF0dHJpYnV0ZSB2YWx1ZSwgZXguOlxuICogWydpZCcsICd3YXJuaW5nNScsICdjbGFzcycsICdhbGVydCddXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVlbGVtZW50U3RhcnQoXG4gICAgaW5kZXg6IG51bWJlciwgbmFtZTogc3RyaW5nLCBjb25zdHNJbmRleD86IG51bWJlciB8IG51bGwsIGxvY2FsUmVmcz86IHN0cmluZ1tdIHwgbnVsbCk6IHZvaWQge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCB0Vmlld0NvbnN0cyA9IHRWaWV3LmNvbnN0cztcbiAgY29uc3QgY29uc3RzID0gdFZpZXdDb25zdHMgPT09IG51bGwgfHwgY29uc3RzSW5kZXggPT0gbnVsbCA/IG51bGwgOiB0Vmlld0NvbnN0c1tjb25zdHNJbmRleF07XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbChcbiAgICAgICAgICAgICAgICAgICBnZXRCaW5kaW5nSW5kZXgoKSwgdFZpZXcuYmluZGluZ1N0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgICAgICAgJ2VsZW1lbnRzIHNob3VsZCBiZSBjcmVhdGVkIGJlZm9yZSBhbnkgYmluZGluZ3MnKTtcblxuICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyQ3JlYXRlRWxlbWVudCsrO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGF0YUluUmFuZ2UobFZpZXcsIGluZGV4ICsgSEVBREVSX09GRlNFVCk7XG4gIGNvbnN0IHJlbmRlcmVyID0gbFZpZXdbUkVOREVSRVJdO1xuICBjb25zdCBuYXRpdmUgPSBsVmlld1tpbmRleCArIEhFQURFUl9PRkZTRVRdID0gZWxlbWVudENyZWF0ZShuYW1lLCByZW5kZXJlciwgZ2V0TmFtZXNwYWNlKCkpO1xuICBjb25zdCB0Tm9kZSA9IGdldE9yQ3JlYXRlVE5vZGUodFZpZXcsIGxWaWV3W1RfSE9TVF0sIGluZGV4LCBUTm9kZVR5cGUuRWxlbWVudCwgbmFtZSwgY29uc3RzKTtcblxuICBpZiAoY29uc3RzICE9IG51bGwpIHtcbiAgICBjb25zdCBsYXN0QXR0ckluZGV4ID0gc2V0VXBBdHRyaWJ1dGVzKHJlbmRlcmVyLCBuYXRpdmUsIGNvbnN0cyk7XG4gICAgaWYgKHRWaWV3LmZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgICByZWdpc3RlckluaXRpYWxTdHlsaW5nT25UTm9kZSh0Tm9kZSwgY29uc3RzLCBsYXN0QXR0ckluZGV4KTtcbiAgICB9XG4gIH1cblxuICBpZiAoKHROb2RlLmZsYWdzICYgVE5vZGVGbGFncy5oYXNJbml0aWFsU3R5bGluZykgPT09IFROb2RlRmxhZ3MuaGFzSW5pdGlhbFN0eWxpbmcpIHtcbiAgICByZW5kZXJJbml0aWFsU3R5bGluZyhyZW5kZXJlciwgbmF0aXZlLCB0Tm9kZSwgZmFsc2UpO1xuICB9XG5cbiAgYXBwZW5kQ2hpbGQobmF0aXZlLCB0Tm9kZSwgbFZpZXcpO1xuXG4gIC8vIGFueSBpbW1lZGlhdGUgY2hpbGRyZW4gb2YgYSBjb21wb25lbnQgb3IgdGVtcGxhdGUgY29udGFpbmVyIG11c3QgYmUgcHJlLWVtcHRpdmVseVxuICAvLyBtb25rZXktcGF0Y2hlZCB3aXRoIHRoZSBjb21wb25lbnQgdmlldyBkYXRhIHNvIHRoYXQgdGhlIGVsZW1lbnQgY2FuIGJlIGluc3BlY3RlZFxuICAvLyBsYXRlciBvbiB1c2luZyBhbnkgZWxlbWVudCBkaXNjb3ZlcnkgdXRpbGl0eSBtZXRob2RzIChzZWUgYGVsZW1lbnRfZGlzY292ZXJ5LnRzYClcbiAgaWYgKGdldEVsZW1lbnREZXB0aENvdW50KCkgPT09IDApIHtcbiAgICBhdHRhY2hQYXRjaERhdGEobmF0aXZlLCBsVmlldyk7XG4gIH1cbiAgaW5jcmVhc2VFbGVtZW50RGVwdGhDb3VudCgpO1xuXG4gIC8vIGlmIGEgZGlyZWN0aXZlIGNvbnRhaW5zIGEgaG9zdCBiaW5kaW5nIGZvciBcImNsYXNzXCIgdGhlbiBhbGwgY2xhc3MtYmFzZWQgZGF0YSB3aWxsXG4gIC8vIGZsb3cgdGhyb3VnaCB0aGF0IChleGNlcHQgZm9yIGBbY2xhc3MucHJvcF1gIGJpbmRpbmdzKS4gVGhpcyBhbHNvIGluY2x1ZGVzIGluaXRpYWxcbiAgLy8gc3RhdGljIGNsYXNzIHZhbHVlcyBhcyB3ZWxsLiAoTm90ZSB0aGF0IHRoaXMgd2lsbCBiZSBmaXhlZCBvbmNlIG1hcC1iYXNlZCBgW3N0eWxlXWBcbiAgLy8gYW5kIGBbY2xhc3NdYCBiaW5kaW5ncyB3b3JrIGZvciBtdWx0aXBsZSBkaXJlY3RpdmVzLilcbiAgaWYgKHRWaWV3LmZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5maXJzdFRlbXBsYXRlUGFzcysrO1xuICAgIGNvbnN0IGhhc0RpcmVjdGl2ZXMgPSByZXNvbHZlRGlyZWN0aXZlcyh0VmlldywgbFZpZXcsIHROb2RlLCBsb2NhbFJlZnMgfHwgbnVsbCk7XG4gICAgbmdEZXZNb2RlICYmIHZhbGlkYXRlRWxlbWVudChsVmlldywgbmF0aXZlLCB0Tm9kZSwgaGFzRGlyZWN0aXZlcyk7XG5cbiAgICBpZiAodFZpZXcucXVlcmllcyAhPT0gbnVsbCkge1xuICAgICAgdFZpZXcucXVlcmllcy5lbGVtZW50U3RhcnQodFZpZXcsIHROb2RlKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNEaXJlY3RpdmVIb3N0KHROb2RlKSkge1xuICAgIGNyZWF0ZURpcmVjdGl2ZXNJbnN0YW5jZXModFZpZXcsIGxWaWV3LCB0Tm9kZSk7XG4gICAgZXhlY3V0ZUNvbnRlbnRRdWVyaWVzKHRWaWV3LCB0Tm9kZSwgbFZpZXcpO1xuICB9XG4gIGlmIChsb2NhbFJlZnMgIT0gbnVsbCkge1xuICAgIHNhdmVSZXNvbHZlZExvY2Fsc0luRGF0YShsVmlldywgdE5vZGUpO1xuICB9XG59XG5cbi8qKlxuICogTWFyayB0aGUgZW5kIG9mIHRoZSBlbGVtZW50LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZWxlbWVudEVuZCgpOiB2b2lkIHtcbiAgbGV0IHByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChwcmV2aW91c09yUGFyZW50VE5vZGUsICdObyBwYXJlbnQgbm9kZSB0byBjbG9zZS4nKTtcbiAgaWYgKGdldElzUGFyZW50KCkpIHtcbiAgICBzZXRJc05vdFBhcmVudCgpO1xuICB9IGVsc2Uge1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRIYXNQYXJlbnQoZ2V0UHJldmlvdXNPclBhcmVudFROb2RlKCkpO1xuICAgIHByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IHByZXZpb3VzT3JQYXJlbnRUTm9kZS5wYXJlbnQgITtcbiAgICBzZXRQcmV2aW91c09yUGFyZW50VE5vZGUocHJldmlvdXNPclBhcmVudFROb2RlLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCB0Tm9kZSA9IHByZXZpb3VzT3JQYXJlbnRUTm9kZTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE5vZGVUeXBlKHROb2RlLCBUTm9kZVR5cGUuRWxlbWVudCk7XG5cbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcblxuICBkZWNyZWFzZUVsZW1lbnREZXB0aENvdW50KCk7XG5cbiAgaWYgKHRWaWV3LmZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgcmVnaXN0ZXJQb3N0T3JkZXJIb29rcyh0VmlldywgcHJldmlvdXNPclBhcmVudFROb2RlKTtcbiAgICBpZiAoaXNDb250ZW50UXVlcnlIb3N0KHByZXZpb3VzT3JQYXJlbnRUTm9kZSkpIHtcbiAgICAgIHRWaWV3LnF1ZXJpZXMgIS5lbGVtZW50RW5kKHByZXZpb3VzT3JQYXJlbnRUTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGhhc0NsYXNzSW5wdXQodE5vZGUpKSB7XG4gICAgY29uc3QgaW5wdXROYW1lOiBzdHJpbmcgPSBzZWxlY3RDbGFzc0Jhc2VkSW5wdXROYW1lKHROb2RlLmlucHV0cyAhKTtcbiAgICBzZXREaXJlY3RpdmVTdHlsaW5nSW5wdXQodE5vZGUuY2xhc3NlcywgbFZpZXcsIHROb2RlLmlucHV0cyAhW2lucHV0TmFtZV0pO1xuICB9XG5cbiAgaWYgKGhhc1N0eWxlSW5wdXQodE5vZGUpKSB7XG4gICAgc2V0RGlyZWN0aXZlU3R5bGluZ0lucHV0KHROb2RlLnN0eWxlcywgbFZpZXcsIHROb2RlLmlucHV0cyAhWydzdHlsZSddKTtcbiAgfVxufVxuXG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlbXB0eSBlbGVtZW50IHVzaW5nIHtAbGluayBlbGVtZW50U3RhcnR9IGFuZCB7QGxpbmsgZWxlbWVudEVuZH1cbiAqXG4gKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGRhdGEgYXJyYXlcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIERPTSBOb2RlXG4gKiBAcGFyYW0gY29uc3RzSW5kZXggSW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGBjb25zdHNgIGFycmF5LlxuICogQHBhcmFtIGxvY2FsUmVmcyBBIHNldCBvZiBsb2NhbCByZWZlcmVuY2UgYmluZGluZ3Mgb24gdGhlIGVsZW1lbnQuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVlbGVtZW50KFxuICAgIGluZGV4OiBudW1iZXIsIG5hbWU6IHN0cmluZywgY29uc3RzSW5kZXg/OiBudW1iZXIgfCBudWxsLCBsb2NhbFJlZnM/OiBzdHJpbmdbXSB8IG51bGwpOiB2b2lkIHtcbiAgybXJtWVsZW1lbnRTdGFydChpbmRleCwgbmFtZSwgY29uc3RzSW5kZXgsIGxvY2FsUmVmcyk7XG4gIMm1ybVlbGVtZW50RW5kKCk7XG59XG5cbi8qKlxuICogQXNzaWduIHN0YXRpYyBhdHRyaWJ1dGUgdmFsdWVzIHRvIGEgaG9zdCBlbGVtZW50LlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gd2lsbCBhc3NpZ24gc3RhdGljIGF0dHJpYnV0ZSB2YWx1ZXMgYXMgd2VsbCBhcyBjbGFzcyBhbmQgc3R5bGVcbiAqIHZhbHVlcyB0byBhbiBlbGVtZW50IHdpdGhpbiB0aGUgaG9zdCBiaW5kaW5ncyBmdW5jdGlvbi4gU2luY2UgYXR0cmlidXRlIHZhbHVlc1xuICogY2FuIGNvbnNpc3Qgb2YgZGlmZmVyZW50IHR5cGVzIG9mIHZhbHVlcywgdGhlIGBhdHRyc2AgYXJyYXkgbXVzdCBpbmNsdWRlIHRoZSB2YWx1ZXMgaW5cbiAqIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICpcbiAqIGF0dHJzID0gW1xuICogICAvLyBzdGF0aWMgYXR0cmlidXRlcyAobGlrZSBgdGl0bGVgLCBgbmFtZWAsIGBpZGAuLi4pXG4gKiAgIGF0dHIxLCB2YWx1ZTEsIGF0dHIyLCB2YWx1ZSxcbiAqXG4gKiAgIC8vIGEgc2luZ2xlIG5hbWVzcGFjZSB2YWx1ZSAobGlrZSBgeDppZGApXG4gKiAgIE5BTUVTUEFDRV9NQVJLRVIsIG5hbWVzcGFjZVVyaTEsIG5hbWUxLCB2YWx1ZTEsXG4gKlxuICogICAvLyBhbm90aGVyIHNpbmdsZSBuYW1lc3BhY2UgdmFsdWUgKGxpa2UgYHg6bmFtZWApXG4gKiAgIE5BTUVTUEFDRV9NQVJLRVIsIG5hbWVzcGFjZVVyaTIsIG5hbWUyLCB2YWx1ZTIsXG4gKlxuICogICAvLyBhIHNlcmllcyBvZiBDU1MgY2xhc3NlcyB0aGF0IHdpbGwgYmUgYXBwbGllZCB0byB0aGUgZWxlbWVudCAobm8gc3BhY2VzKVxuICogICBDTEFTU0VTX01BUktFUiwgY2xhc3MxLCBjbGFzczIsIGNsYXNzMyxcbiAqXG4gKiAgIC8vIGEgc2VyaWVzIG9mIENTUyBzdHlsZXMgKHByb3BlcnR5ICsgdmFsdWUpIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50XG4gKiAgIFNUWUxFU19NQVJLRVIsIHByb3AxLCB2YWx1ZTEsIHByb3AyLCB2YWx1ZTJcbiAqIF1cbiAqXG4gKiBBbGwgbm9uLWNsYXNzIGFuZCBub24tc3R5bGUgYXR0cmlidXRlcyBtdXN0IGJlIGRlZmluZWQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBsaXN0XG4gKiBmaXJzdCBiZWZvcmUgYWxsIGNsYXNzIGFuZCBzdHlsZSB2YWx1ZXMgYXJlIHNldC4gV2hlbiB0aGVyZSBpcyBhIGNoYW5nZSBpbiB2YWx1ZVxuICogdHlwZSAobGlrZSB3aGVuIGNsYXNzZXMgYW5kIHN0eWxlcyBhcmUgaW50cm9kdWNlZCkgYSBtYXJrZXIgbXVzdCBiZSB1c2VkIHRvIHNlcGFyYXRlXG4gKiB0aGUgZW50cmllcy4gVGhlIG1hcmtlciB2YWx1ZXMgdGhlbXNlbHZlcyBhcmUgc2V0IHZpYSBlbnRyaWVzIGZvdW5kIGluIHRoZVxuICogW0F0dHJpYnV0ZU1hcmtlcl0gZW51bS5cbiAqXG4gKiBOT1RFOiBUaGlzIGluc3RydWN0aW9uIGlzIG1lYW50IHRvIHVzZWQgZnJvbSBgaG9zdEJpbmRpbmdzYCBmdW5jdGlvbiBvbmx5LlxuICpcbiAqIEBwYXJhbSBkaXJlY3RpdmUgQSBkaXJlY3RpdmUgaW5zdGFuY2UgdGhlIHN0eWxpbmcgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogQHBhcmFtIGF0dHJzIEFuIGFycmF5IG9mIHN0YXRpYyB2YWx1ZXMgKGF0dHJpYnV0ZXMsIGNsYXNzZXMgYW5kIHN0eWxlcykgd2l0aCB0aGUgY29ycmVjdCBtYXJrZXJcbiAqIHZhbHVlcy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWVsZW1lbnRIb3N0QXR0cnMoYXR0cnM6IFRBdHRyaWJ1dGVzKSB7XG4gIGNvbnN0IGhvc3RFbGVtZW50SW5kZXggPSBnZXRTZWxlY3RlZEluZGV4KCk7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IHROb2RlID0gZ2V0VE5vZGUoaG9zdEVsZW1lbnRJbmRleCwgbFZpZXcpO1xuXG4gIC8vIG5vbi1lbGVtZW50IG5vZGVzIChlLmcuIGA8bmctY29udGFpbmVyPmApIGFyZSBub3QgcmVuZGVyZWQgYXMgYWN0dWFsXG4gIC8vIGVsZW1lbnQgbm9kZXMgYW5kIGFkZGluZyBzdHlsZXMvY2xhc3NlcyBvbiB0byB0aGVtIHdpbGwgY2F1c2UgcnVudGltZVxuICAvLyBlcnJvcnMuLi5cbiAgaWYgKHROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgY29uc3QgbmF0aXZlID0gZ2V0TmF0aXZlQnlUTm9kZSh0Tm9kZSwgbFZpZXcpIGFzIFJFbGVtZW50O1xuICAgIGNvbnN0IGxhc3RBdHRySW5kZXggPSBzZXRVcEF0dHJpYnV0ZXMobFZpZXdbUkVOREVSRVJdLCBuYXRpdmUsIGF0dHJzKTtcbiAgICBpZiAodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICAgIGNvbnN0IHN0eWxpbmdOZWVkc1RvQmVSZW5kZXJlZCA9IHJlZ2lzdGVySW5pdGlhbFN0eWxpbmdPblROb2RlKHROb2RlLCBhdHRycywgbGFzdEF0dHJJbmRleCk7XG5cbiAgICAgIC8vIHRoaXMgaXMgb25seSBjYWxsZWQgZHVyaW5nIHRoZSBmaXJzdCB0ZW1wbGF0ZSBwYXNzIGluIHRoZVxuICAgICAgLy8gZXZlbnQgdGhhdCB0aGlzIGN1cnJlbnQgZGlyZWN0aXZlIGFzc2lnbmVkIGluaXRpYWwgc3R5bGUvY2xhc3NcbiAgICAgIC8vIGhvc3QgYXR0cmlidXRlIHZhbHVlcyB0byB0aGUgZWxlbWVudC4gQmVjYXVzZSBpbml0aWFsIHN0eWxpbmdcbiAgICAgIC8vIHZhbHVlcyBhcmUgYXBwbGllZCBiZWZvcmUgZGlyZWN0aXZlcyBhcmUgZmlyc3QgcmVuZGVyZWQgKHdpdGhpblxuICAgICAgLy8gYGNyZWF0ZUVsZW1lbnRgKSB0aGlzIG1lYW5zIHRoYXQgaW5pdGlhbCBzdHlsaW5nIGZvciBhbnkgZGlyZWN0aXZlc1xuICAgICAgLy8gc3RpbGwgbmVlZHMgdG8gYmUgYXBwbGllZC4gTm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IGhhcHBlbiBkdXJpbmdcbiAgICAgIC8vIHRoZSBmaXJzdCB0ZW1wbGF0ZSBwYXNzIGFuZCBub3QgZWFjaCB0aW1lIGEgZGlyZWN0aXZlIGFwcGxpZXMgaXRzXG4gICAgICAvLyBhdHRyaWJ1dGUgdmFsdWVzIHRvIHRoZSBlbGVtZW50LlxuICAgICAgaWYgKHN0eWxpbmdOZWVkc1RvQmVSZW5kZXJlZCkge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IGxWaWV3W1JFTkRFUkVSXTtcbiAgICAgICAgcmVuZGVySW5pdGlhbFN0eWxpbmcocmVuZGVyZXIsIG5hdGl2ZSwgdE5vZGUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREaXJlY3RpdmVTdHlsaW5nSW5wdXQoXG4gICAgY29udGV4dDogVFN0eWxpbmdDb250ZXh0IHwgU3R5bGluZ01hcEFycmF5IHwgbnVsbCwgbFZpZXc6IExWaWV3LFxuICAgIHN0eWxpbmdJbnB1dHM6IChzdHJpbmcgfCBudW1iZXIpW10pIHtcbiAgLy8gb2xkZXIgdmVyc2lvbnMgb2YgQW5ndWxhciB0cmVhdCB0aGUgaW5wdXQgYXMgYG51bGxgIGluIHRoZVxuICAvLyBldmVudCB0aGF0IHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdCBhdCBhbGwuIEZvciB0aGlzIHJlYXNvblxuICAvLyB3ZSBjYW4ndCBoYXZlIGEgc3R5bGluZyB2YWx1ZSBiZSBhbiBlbXB0eSBzdHJpbmcuXG4gIGNvbnN0IHZhbHVlID0gKGNvbnRleHQgJiYgZ2V0SW5pdGlhbFN0eWxpbmdWYWx1ZShjb250ZXh0KSkgfHwgbnVsbDtcblxuICAvLyBJdnkgZG9lcyBhbiBleHRyYSBgW2NsYXNzXWAgd3JpdGUgd2l0aCBhIGZhbHN5IHZhbHVlIHNpbmNlIHRoZSB2YWx1ZVxuICAvLyBpcyBhcHBsaWVkIGR1cmluZyBjcmVhdGlvbiBtb2RlLiBUaGlzIGlzIGEgZGV2aWF0aW9uIGZyb20gVkUgYW5kIHNob3VsZFxuICAvLyBiZSAoSmlyYSBJc3N1ZSA9IEZXLTE0NjcpLlxuICBzZXRJbnB1dHNGb3JQcm9wZXJ0eShsVmlldywgc3R5bGluZ0lucHV0cywgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUVsZW1lbnQoXG4gICAgaG9zdFZpZXc6IExWaWV3LCBlbGVtZW50OiBSRWxlbWVudCwgdE5vZGU6IFROb2RlLCBoYXNEaXJlY3RpdmVzOiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IHRhZ05hbWUgPSB0Tm9kZS50YWdOYW1lO1xuXG4gIC8vIElmIHRoZSBlbGVtZW50IG1hdGNoZXMgYW55IGRpcmVjdGl2ZSwgaXQncyBjb25zaWRlcmVkIGFzIHZhbGlkLlxuICBpZiAoIWhhc0RpcmVjdGl2ZXMgJiYgdGFnTmFtZSAhPT0gbnVsbCkge1xuICAgIC8vIFRoZSBlbGVtZW50IGlzIHVua25vd24gaWYgaXQncyBhbiBpbnN0YW5jZSBvZiBIVE1MVW5rbm93bkVsZW1lbnQgb3IgaXQgaXNuJ3QgcmVnaXN0ZXJlZFxuICAgIC8vIGFzIGEgY3VzdG9tIGVsZW1lbnQuIE5vdGUgdGhhdCB1bmtub3duIGVsZW1lbnRzIHdpdGggYSBkYXNoIGluIHRoZWlyIG5hbWUgd29uJ3QgYmUgaW5zdGFuY2VzXG4gICAgLy8gb2YgSFRNTFVua25vd25FbGVtZW50IGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCB3ZWIgY29tcG9uZW50cy5cbiAgICBjb25zdCBpc1Vua25vd24gPVxuICAgICAgICAodHlwZW9mIEhUTUxVbmtub3duRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJyAmJiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTFVua25vd25FbGVtZW50KSB8fFxuICAgICAgICAodHlwZW9mIGN1c3RvbUVsZW1lbnRzICE9PSAndW5kZWZpbmVkJyAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IC0xICYmXG4gICAgICAgICAhY3VzdG9tRWxlbWVudHMuZ2V0KHRhZ05hbWUpKTtcblxuICAgIGlmIChpc1Vua25vd24gJiYgIW1hdGNoaW5nU2NoZW1hcyhob3N0VmlldywgdGFnTmFtZSkpIHtcbiAgICAgIGxldCBlcnJvck1lc3NhZ2UgPSBgJyR7dGFnTmFtZX0nIGlzIG5vdCBhIGtub3duIGVsZW1lbnQ6XFxuYDtcbiAgICAgIGVycm9yTWVzc2FnZSArPVxuICAgICAgICAgIGAxLiBJZiAnJHt0YWdOYW1lfScgaXMgYW4gQW5ndWxhciBjb21wb25lbnQsIHRoZW4gdmVyaWZ5IHRoYXQgaXQgaXMgcGFydCBvZiB0aGlzIG1vZHVsZS5cXG5gO1xuICAgICAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgICBlcnJvck1lc3NhZ2UgKz1cbiAgICAgICAgICAgIGAyLiBJZiAnJHt0YWdOYW1lfScgaXMgYSBXZWIgQ29tcG9uZW50IHRoZW4gYWRkICdDVVNUT01fRUxFTUVOVFNfU0NIRU1BJyB0byB0aGUgJ0BOZ01vZHVsZS5zY2hlbWFzJyBvZiB0aGlzIGNvbXBvbmVudCB0byBzdXBwcmVzcyB0aGlzIG1lc3NhZ2UuYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPVxuICAgICAgICAgICAgYDIuIFRvIGFsbG93IGFueSBlbGVtZW50IGFkZCAnTk9fRVJST1JTX1NDSEVNQScgdG8gdGhlICdATmdNb2R1bGUuc2NoZW1hcycgb2YgdGhpcyBjb21wb25lbnQuYDtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19