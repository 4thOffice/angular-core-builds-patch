/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertEqual, assertLessThan } from './assert';
import { NO_CHANGE, bindingUpdated, createLNode, getPreviousOrParentNode, getRenderer, getViewData, load, resetApplicationState } from './instructions';
import { RENDER_PARENT } from './interfaces/container';
import { BINDING_INDEX, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { appendChild, createTextNode, getParentLNode, removeChild } from './node_manipulation';
import { stringify } from './util';
var i18nTagRegex = /\{\$([^}]+)\}/g;
/**
 * Takes a translation string, the initial list of placeholders (elements and expressions) and the
 * indexes of their corresponding expression nodes to return a list of instructions for each
 * template function.
 *
 * Because embedded templates have different indexes for each placeholder, each parameter (except
 * the translation) is an array, where each value corresponds to a different template, by order of
 * appearance.
 *
 * @param translation A translation string where placeholders are represented by `{$name}`
 * @param elements An array containing, for each template, the maps of element placeholders and
 * their indexes.
 * @param expressions An array containing, for each template, the maps of expression placeholders
 * and their indexes.
 * @param tmplContainers An array of template container placeholders whose content should be ignored
 * when generating the instructions for their parent template.
 * @param lastChildIndex The index of the last child of the i18n node. Used when the i18n block is
 * an ng-container.
 *
 * @returns A list of instructions used to translate each template.
 */
export function i18nMapping(translation, elements, expressions, tmplContainers, lastChildIndex) {
    var translationParts = translation.split(i18nTagRegex);
    var instructions = [];
    generateMappingInstructions(0, translationParts, instructions, elements, expressions, tmplContainers, lastChildIndex);
    return instructions;
}
/**
 * Internal function that reads the translation parts and generates a set of instructions for each
 * template.
 *
 * See `i18nMapping()` for more details.
 *
 * @param index The current index in `translationParts`.
 * @param translationParts The translation string split into an array of placeholders and text
 * elements.
 * @param instructions The current list of instructions to update.
 * @param elements An array containing, for each template, the maps of element placeholders and
 * their indexes.
 * @param expressions An array containing, for each template, the maps of expression placeholders
 * and their indexes.
 * @param tmplContainers An array of template container placeholders whose content should be ignored
 * when generating the instructions for their parent template.
 * @param lastChildIndex The index of the last child of the i18n node. Used when the i18n block is
 * an ng-container.
 * @returns the current index in `translationParts`
 */
function generateMappingInstructions(index, translationParts, instructions, elements, expressions, tmplContainers, lastChildIndex) {
    var tmplIndex = instructions.length;
    var tmplInstructions = [];
    var phVisited = [];
    var openedTagCount = 0;
    var maxIndex = 0;
    instructions.push(tmplInstructions);
    for (; index < translationParts.length; index++) {
        var value = translationParts[index];
        // Odd indexes are placeholders
        if (index & 1) {
            var phIndex = void 0;
            if (elements && elements[tmplIndex] &&
                typeof (phIndex = elements[tmplIndex][value]) !== 'undefined') {
                // The placeholder represents a DOM element
                // Add an instruction to move the element
                tmplInstructions.push(phIndex | 1073741824 /* Element */);
                phVisited.push(value);
                openedTagCount++;
            }
            else if (expressions && expressions[tmplIndex] &&
                typeof (phIndex = expressions[tmplIndex][value]) !== 'undefined') {
                // The placeholder represents an expression
                // Add an instruction to move the expression
                tmplInstructions.push(phIndex | 1610612736 /* Expression */);
                phVisited.push(value);
            }
            else { // It is a closing tag
                tmplInstructions.push(-2147483648 /* CloseNode */);
                if (tmplIndex > 0) {
                    openedTagCount--;
                    // If we have reached the closing tag for this template, exit the loop
                    if (openedTagCount === 0) {
                        break;
                    }
                }
            }
            if (typeof phIndex !== 'undefined' && phIndex > maxIndex) {
                maxIndex = phIndex;
            }
            if (tmplContainers && tmplContainers.indexOf(value) !== -1 &&
                tmplContainers.indexOf(value) >= tmplIndex) {
                index = generateMappingInstructions(index, translationParts, instructions, elements, expressions, tmplContainers, lastChildIndex);
            }
        }
        else if (value) {
            // It's a non-empty string, create a text node
            tmplInstructions.push(536870912 /* Text */, value);
        }
    }
    // Check if some elements from the template are missing from the translation
    if (elements) {
        var tmplElements = elements[tmplIndex];
        if (tmplElements) {
            var phKeys = Object.keys(tmplElements);
            for (var i = 0; i < phKeys.length; i++) {
                var ph = phKeys[i];
                if (phVisited.indexOf(ph) === -1) {
                    var index_1 = tmplElements[ph];
                    // Add an instruction to remove the element
                    tmplInstructions.push(index_1 | -1610612736 /* RemoveNode */);
                    if (index_1 > maxIndex) {
                        maxIndex = index_1;
                    }
                }
            }
        }
    }
    // Check if some expressions from the template are missing from the translation
    if (expressions) {
        var tmplExpressions = expressions[tmplIndex];
        if (tmplExpressions) {
            var phKeys = Object.keys(tmplExpressions);
            for (var i = 0; i < phKeys.length; i++) {
                var ph = phKeys[i];
                if (phVisited.indexOf(ph) === -1) {
                    var index_2 = tmplExpressions[ph];
                    if (ngDevMode) {
                        assertLessThan(index_2.toString(2).length, 28, "Index " + index_2 + " is too big and will overflow");
                    }
                    // Add an instruction to remove the expression
                    tmplInstructions.push(index_2 | -1610612736 /* RemoveNode */);
                    if (index_2 > maxIndex) {
                        maxIndex = index_2;
                    }
                }
            }
        }
    }
    if (tmplIndex === 0 && typeof lastChildIndex === 'number') {
        // The current parent is an ng-container and it has more children after the translation that we
        // need to append to keep the order of the DOM nodes correct
        for (var i = maxIndex + 1; i <= lastChildIndex; i++) {
            if (ngDevMode) {
                assertLessThan(i.toString(2).length, 28, "Index " + i + " is too big and will overflow");
            }
            // We consider those additional placeholders as expressions because we don't care about
            // their children, all we need to do is to append them
            tmplInstructions.push(i | 1610612736 /* Expression */);
        }
    }
    return index;
}
function appendI18nNode(node, parentNode, previousNode) {
    if (ngDevMode) {
        ngDevMode.rendererMoveNode++;
    }
    var viewData = getViewData();
    appendChild(parentNode, node.native || null, viewData);
    // On first pass, re-organize node tree to put this node in the correct position.
    var firstTemplatePass = node.view[TVIEW].firstTemplatePass;
    if (firstTemplatePass) {
        if (previousNode === parentNode && node.tNode !== parentNode.tNode.child) {
            node.tNode.next = parentNode.tNode.child;
            parentNode.tNode.child = node.tNode;
        }
        else if (previousNode !== parentNode && node.tNode !== previousNode.tNode.next) {
            node.tNode.next = previousNode.tNode.next;
            previousNode.tNode.next = node.tNode;
        }
        else {
            node.tNode.next = null;
        }
        if (parentNode.view === node.view)
            node.tNode.parent = parentNode.tNode;
    }
    // Template containers also have a comment node for the `ViewContainerRef` that should be moved
    if (node.tNode.type === 0 /* Container */ && node.dynamicLContainerNode) {
        // (node.native as RComment).textContent = 'test';
        // console.log(node.native);
        appendChild(parentNode, node.dynamicLContainerNode.native || null, viewData);
        if (firstTemplatePass) {
            node.tNode.dynamicContainerNode = node.dynamicLContainerNode.tNode;
            node.dynamicLContainerNode.tNode.parent = node.tNode;
        }
        return node.dynamicLContainerNode;
    }
    return node;
}
/**
 * Takes a list of instructions generated by `i18nMapping()` to transform the template accordingly.
 *
 * @param startIndex Index of the first element to translate (for instance the first child of the
 * element with the i18n attribute).
 * @param instructions The list of instructions to apply on the current view.
 */
export function i18nApply(startIndex, instructions) {
    var viewData = getViewData();
    if (ngDevMode) {
        assertEqual(viewData[BINDING_INDEX], -1, 'i18nApply should be called before any binding');
    }
    if (!instructions) {
        return;
    }
    var renderer = getRenderer();
    var localParentNode = getParentLNode(load(startIndex)) || getPreviousOrParentNode();
    var localPreviousNode = localParentNode;
    resetApplicationState(); // We don't want to add to the tree with the wrong previous node
    for (var i = 0; i < instructions.length; i++) {
        var instruction = instructions[i];
        switch (instruction & -536870912 /* InstructionMask */) {
            case 1073741824 /* Element */:
                var element = load(instruction & 536870911 /* IndexMask */);
                localPreviousNode = appendI18nNode(element, localParentNode, localPreviousNode);
                localParentNode = element;
                break;
            case 1610612736 /* Expression */:
                var expr = load(instruction & 536870911 /* IndexMask */);
                localPreviousNode = appendI18nNode(expr, localParentNode, localPreviousNode);
                break;
            case 536870912 /* Text */:
                if (ngDevMode) {
                    ngDevMode.rendererCreateTextNode++;
                }
                var value = instructions[++i];
                var textRNode = createTextNode(value, renderer);
                // If we were to only create a `RNode` then projections won't move the text.
                // Create text node at the current end of viewData. Must subtract header offset because
                // createLNode takes a raw index (not adjusted by header offset).
                var textLNode = createLNode(viewData.length - HEADER_OFFSET, 3 /* Element */, textRNode, null, null);
                localPreviousNode = appendI18nNode(textLNode, localParentNode, localPreviousNode);
                resetApplicationState();
                break;
            case -2147483648 /* CloseNode */:
                localPreviousNode = localParentNode;
                localParentNode = getParentLNode(localParentNode);
                break;
            case -1610612736 /* RemoveNode */:
                if (ngDevMode) {
                    ngDevMode.rendererRemoveNode++;
                }
                var index = instruction & 536870911 /* IndexMask */;
                var removedNode = load(index);
                var parentNode = getParentLNode(removedNode);
                removeChild(parentNode, removedNode.native || null, viewData);
                // For template containers we also need to remove their `ViewContainerRef` from the DOM
                if (removedNode.tNode.type === 0 /* Container */ && removedNode.dynamicLContainerNode) {
                    removeChild(parentNode, removedNode.dynamicLContainerNode.native || null, viewData);
                    removedNode.dynamicLContainerNode.tNode.detached = true;
                    removedNode.dynamicLContainerNode.data[RENDER_PARENT] = null;
                }
                break;
        }
    }
}
/**
 * Takes a translation string and the initial list of expressions and returns a list of instructions
 * that will be used to translate an attribute.
 * Even indexes contain static strings, while odd indexes contain the index of the expression whose
 * value will be concatenated into the final translation.
 */
export function i18nExpMapping(translation, placeholders) {
    var staticText = translation.split(i18nTagRegex);
    // odd indexes are placeholders
    for (var i = 1; i < staticText.length; i += 2) {
        staticText[i] = placeholders[staticText[i]];
    }
    return staticText;
}
/**
 * Checks if the value of up to 8 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation(instructions, numberOfExp, v0, v1, v2, v3, v4, v5, v6, v7) {
    var different = bindingUpdated(v0);
    if (numberOfExp > 1) {
        different = bindingUpdated(v1) || different;
        if (numberOfExp > 2) {
            different = bindingUpdated(v2) || different;
            if (numberOfExp > 3) {
                different = bindingUpdated(v3) || different;
                if (numberOfExp > 4) {
                    different = bindingUpdated(v4) || different;
                    if (numberOfExp > 5) {
                        different = bindingUpdated(v5) || different;
                        if (numberOfExp > 6) {
                            different = bindingUpdated(v6) || different;
                            if (numberOfExp > 7) {
                                different = bindingUpdated(v7) || different;
                            }
                        }
                    }
                }
            }
        }
    }
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        var value = void 0;
        // Odd indexes are placeholders
        if (i & 1) {
            switch (instructions[i]) {
                case 0:
                    value = v0;
                    break;
                case 1:
                    value = v1;
                    break;
                case 2:
                    value = v2;
                    break;
                case 3:
                    value = v3;
                    break;
                case 4:
                    value = v4;
                    break;
                case 5:
                    value = v5;
                    break;
                case 6:
                    value = v6;
                    break;
                case 7:
                    value = v7;
                    break;
            }
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Create a translated interpolation binding with a variable number of expressions.
 *
 * If there are 1 to 8 expressions then `i18nInterpolation()` should be used instead. It is faster
 * because there is no need to create an array of expressions and iterate over it.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolationV(instructions, values) {
    var different = false;
    for (var i = 0; i < values.length; i++) {
        // Check if bindings have changed
        bindingUpdated(values[i]) && (different = true);
    }
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are placeholders
        if (i & 1) {
            res += stringify(values[instructions[i]]);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsV0FBVyxFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0SixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFrQ2pDLElBQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sc0JBQ0YsV0FBbUIsRUFBRSxRQUEwQyxFQUMvRCxXQUE4QyxFQUFFLGNBQWdDLEVBQ2hGLGNBQThCO0lBQ2hDLElBQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6RCxJQUFNLFlBQVksR0FBd0IsRUFBRSxDQUFDO0lBRTdDLDJCQUEyQixDQUN2QixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRTlGLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7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QUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RXF1YWwsIGFzc2VydExlc3NUaGFufSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge05PX0NIQU5HRSwgYmluZGluZ1VwZGF0ZWQsIGNyZWF0ZUxOb2RlLCBnZXRQcmV2aW91c09yUGFyZW50Tm9kZSwgZ2V0UmVuZGVyZXIsIGdldFZpZXdEYXRhLCBsb2FkLCByZXNldEFwcGxpY2F0aW9uU3RhdGV9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zJztcbmltcG9ydCB7UkVOREVSX1BBUkVOVH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge0xDb250YWluZXJOb2RlLCBMRWxlbWVudE5vZGUsIExOb2RlLCBUQ29udGFpbmVyTm9kZSwgVEVsZW1lbnROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7QklORElOR19JTkRFWCwgSEVBREVSX09GRlNFVCwgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7YXBwZW5kQ2hpbGQsIGNyZWF0ZVRleHROb2RlLCBnZXRQYXJlbnRMTm9kZSwgcmVtb3ZlQ2hpbGR9IGZyb20gJy4vbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQSBsaXN0IG9mIGZsYWdzIHRvIGVuY29kZSB0aGUgaTE4biBpbnN0cnVjdGlvbnMgdXNlZCB0byB0cmFuc2xhdGUgdGhlIHRlbXBsYXRlLlxuICogV2Ugc2hpZnQgdGhlIGZsYWdzIGJ5IDI5IHNvIHRoYXQgMzAgJiAzMSAmIDMyIGJpdHMgY29udGFpbnMgdGhlIGluc3RydWN0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSTE4bkluc3RydWN0aW9ucyB7XG4gIFRleHQgPSAxIDw8IDI5LFxuICBFbGVtZW50ID0gMiA8PCAyOSxcbiAgRXhwcmVzc2lvbiA9IDMgPDwgMjksXG4gIENsb3NlTm9kZSA9IDQgPDwgMjksXG4gIFJlbW92ZU5vZGUgPSA1IDw8IDI5LFxuICAvKiogVXNlZCB0byBkZWNvZGUgdGhlIG51bWJlciBlbmNvZGVkIHdpdGggdGhlIGluc3RydWN0aW9uLiAqL1xuICBJbmRleE1hc2sgPSAoMSA8PCAyOSkgLSAxLFxuICAvKiogVXNlZCB0byB0ZXN0IHRoZSB0eXBlIG9mIGluc3RydWN0aW9uLiAqL1xuICBJbnN0cnVjdGlvbk1hc2sgPSB+KCgxIDw8IDI5KSAtIDEpLFxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGluc3RydWN0aW9ucyB1c2VkIHRvIHRyYW5zbGF0ZSB0aGUgdGVtcGxhdGUuXG4gKiBJbnN0cnVjdGlvbnMgY2FuIGJlIGEgcGxhY2Vob2xkZXIgaW5kZXgsIGEgc3RhdGljIHRleHQgb3IgYSBzaW1wbGUgYml0IGZpZWxkIChgSTE4bkZsYWdgKS5cbiAqIFdoZW4gdGhlIGluc3RydWN0aW9uIGlzIHRoZSBmbGFnIGBUZXh0YCwgaXQgaXMgYWx3YXlzIGZvbGxvd2VkIGJ5IGl0cyB0ZXh0IHZhbHVlLlxuICovXG5leHBvcnQgdHlwZSBJMThuSW5zdHJ1Y3Rpb24gPSBudW1iZXIgfCBzdHJpbmc7XG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGluc3RydWN0aW9ucyB1c2VkIHRvIHRyYW5zbGF0ZSBhdHRyaWJ1dGVzIGNvbnRhaW5pbmcgZXhwcmVzc2lvbnMuXG4gKiBFdmVuIGluZGV4ZXMgY29udGFpbiBzdGF0aWMgc3RyaW5ncywgd2hpbGUgb2RkIGluZGV4ZXMgY29udGFpbiB0aGUgaW5kZXggb2YgdGhlIGV4cHJlc3Npb24gd2hvc2VcbiAqIHZhbHVlIHdpbGwgYmUgY29uY2F0ZW5hdGVkIGludG8gdGhlIGZpbmFsIHRyYW5zbGF0aW9uLlxuICovXG5leHBvcnQgdHlwZSBJMThuRXhwSW5zdHJ1Y3Rpb24gPSBudW1iZXIgfCBzdHJpbmc7XG4vKiogTWFwcGluZyBvZiBwbGFjZWhvbGRlciBuYW1lcyB0byB0aGVpciBhYnNvbHV0ZSBpbmRleGVzIGluIHRoZWlyIHRlbXBsYXRlcy4gKi9cbmV4cG9ydCB0eXBlIFBsYWNlaG9sZGVyTWFwID0ge1xuICBbbmFtZTogc3RyaW5nXTogbnVtYmVyXG59O1xuY29uc3QgaTE4blRhZ1JlZ2V4ID0gL1xce1xcJChbXn1dKylcXH0vZztcblxuLyoqXG4gKiBUYWtlcyBhIHRyYW5zbGF0aW9uIHN0cmluZywgdGhlIGluaXRpYWwgbGlzdCBvZiBwbGFjZWhvbGRlcnMgKGVsZW1lbnRzIGFuZCBleHByZXNzaW9ucykgYW5kIHRoZVxuICogaW5kZXhlcyBvZiB0aGVpciBjb3JyZXNwb25kaW5nIGV4cHJlc3Npb24gbm9kZXMgdG8gcmV0dXJuIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgZm9yIGVhY2hcbiAqIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICpcbiAqIEJlY2F1c2UgZW1iZWRkZWQgdGVtcGxhdGVzIGhhdmUgZGlmZmVyZW50IGluZGV4ZXMgZm9yIGVhY2ggcGxhY2Vob2xkZXIsIGVhY2ggcGFyYW1ldGVyIChleGNlcHRcbiAqIHRoZSB0cmFuc2xhdGlvbikgaXMgYW4gYXJyYXksIHdoZXJlIGVhY2ggdmFsdWUgY29ycmVzcG9uZHMgdG8gYSBkaWZmZXJlbnQgdGVtcGxhdGUsIGJ5IG9yZGVyIG9mXG4gKiBhcHBlYXJhbmNlLlxuICpcbiAqIEBwYXJhbSB0cmFuc2xhdGlvbiBBIHRyYW5zbGF0aW9uIHN0cmluZyB3aGVyZSBwbGFjZWhvbGRlcnMgYXJlIHJlcHJlc2VudGVkIGJ5IGB7JG5hbWV9YFxuICogQHBhcmFtIGVsZW1lbnRzIEFuIGFycmF5IGNvbnRhaW5pbmcsIGZvciBlYWNoIHRlbXBsYXRlLCB0aGUgbWFwcyBvZiBlbGVtZW50IHBsYWNlaG9sZGVycyBhbmRcbiAqIHRoZWlyIGluZGV4ZXMuXG4gKiBAcGFyYW0gZXhwcmVzc2lvbnMgQW4gYXJyYXkgY29udGFpbmluZywgZm9yIGVhY2ggdGVtcGxhdGUsIHRoZSBtYXBzIG9mIGV4cHJlc3Npb24gcGxhY2Vob2xkZXJzXG4gKiBhbmQgdGhlaXIgaW5kZXhlcy5cbiAqIEBwYXJhbSB0bXBsQ29udGFpbmVycyBBbiBhcnJheSBvZiB0ZW1wbGF0ZSBjb250YWluZXIgcGxhY2Vob2xkZXJzIHdob3NlIGNvbnRlbnQgc2hvdWxkIGJlIGlnbm9yZWRcbiAqIHdoZW4gZ2VuZXJhdGluZyB0aGUgaW5zdHJ1Y3Rpb25zIGZvciB0aGVpciBwYXJlbnQgdGVtcGxhdGUuXG4gKiBAcGFyYW0gbGFzdENoaWxkSW5kZXggVGhlIGluZGV4IG9mIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBpMThuIG5vZGUuIFVzZWQgd2hlbiB0aGUgaTE4biBibG9jayBpc1xuICogYW4gbmctY29udGFpbmVyLlxuICpcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdXNlZCB0byB0cmFuc2xhdGUgZWFjaCB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5NYXBwaW5nKFxuICAgIHRyYW5zbGF0aW9uOiBzdHJpbmcsIGVsZW1lbnRzOiAoUGxhY2Vob2xkZXJNYXAgfCBudWxsKVtdIHwgbnVsbCxcbiAgICBleHByZXNzaW9ucz86IChQbGFjZWhvbGRlck1hcCB8IG51bGwpW10gfCBudWxsLCB0bXBsQ29udGFpbmVycz86IHN0cmluZ1tdIHwgbnVsbCxcbiAgICBsYXN0Q2hpbGRJbmRleD86IG51bWJlciB8IG51bGwpOiBJMThuSW5zdHJ1Y3Rpb25bXVtdIHtcbiAgY29uc3QgdHJhbnNsYXRpb25QYXJ0cyA9IHRyYW5zbGF0aW9uLnNwbGl0KGkxOG5UYWdSZWdleCk7XG4gIGNvbnN0IGluc3RydWN0aW9uczogSTE4bkluc3RydWN0aW9uW11bXSA9IFtdO1xuXG4gIGdlbmVyYXRlTWFwcGluZ0luc3RydWN0aW9ucyhcbiAgICAgIDAsIHRyYW5zbGF0aW9uUGFydHMsIGluc3RydWN0aW9ucywgZWxlbWVudHMsIGV4cHJlc3Npb25zLCB0bXBsQ29udGFpbmVycywgbGFzdENoaWxkSW5kZXgpO1xuXG4gIHJldHVybiBpbnN0cnVjdGlvbnM7XG59XG5cbi8qKlxuICogSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZWFkcyB0aGUgdHJhbnNsYXRpb24gcGFydHMgYW5kIGdlbmVyYXRlcyBhIHNldCBvZiBpbnN0cnVjdGlvbnMgZm9yIGVhY2hcbiAqIHRlbXBsYXRlLlxuICpcbiAqIFNlZSBgaTE4bk1hcHBpbmcoKWAgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggVGhlIGN1cnJlbnQgaW5kZXggaW4gYHRyYW5zbGF0aW9uUGFydHNgLlxuICogQHBhcmFtIHRyYW5zbGF0aW9uUGFydHMgVGhlIHRyYW5zbGF0aW9uIHN0cmluZyBzcGxpdCBpbnRvIGFuIGFycmF5IG9mIHBsYWNlaG9sZGVycyBhbmQgdGV4dFxuICogZWxlbWVudHMuXG4gKiBAcGFyYW0gaW5zdHJ1Y3Rpb25zIFRoZSBjdXJyZW50IGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSBlbGVtZW50cyBBbiBhcnJheSBjb250YWluaW5nLCBmb3IgZWFjaCB0ZW1wbGF0ZSwgdGhlIG1hcHMgb2YgZWxlbWVudCBwbGFjZWhvbGRlcnMgYW5kXG4gKiB0aGVpciBpbmRleGVzLlxuICogQHBhcmFtIGV4cHJlc3Npb25zIEFuIGFycmF5IGNvbnRhaW5pbmcsIGZvciBlYWNoIHRlbXBsYXRlLCB0aGUgbWFwcyBvZiBleHByZXNzaW9uIHBsYWNlaG9sZGVyc1xuICogYW5kIHRoZWlyIGluZGV4ZXMuXG4gKiBAcGFyYW0gdG1wbENvbnRhaW5lcnMgQW4gYXJyYXkgb2YgdGVtcGxhdGUgY29udGFpbmVyIHBsYWNlaG9sZGVycyB3aG9zZSBjb250ZW50IHNob3VsZCBiZSBpZ25vcmVkXG4gKiB3aGVuIGdlbmVyYXRpbmcgdGhlIGluc3RydWN0aW9ucyBmb3IgdGhlaXIgcGFyZW50IHRlbXBsYXRlLlxuICogQHBhcmFtIGxhc3RDaGlsZEluZGV4IFRoZSBpbmRleCBvZiB0aGUgbGFzdCBjaGlsZCBvZiB0aGUgaTE4biBub2RlLiBVc2VkIHdoZW4gdGhlIGkxOG4gYmxvY2sgaXNcbiAqIGFuIG5nLWNvbnRhaW5lci5cbiAqIEByZXR1cm5zIHRoZSBjdXJyZW50IGluZGV4IGluIGB0cmFuc2xhdGlvblBhcnRzYFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZU1hcHBpbmdJbnN0cnVjdGlvbnMoXG4gICAgaW5kZXg6IG51bWJlciwgdHJhbnNsYXRpb25QYXJ0czogc3RyaW5nW10sIGluc3RydWN0aW9uczogSTE4bkluc3RydWN0aW9uW11bXSxcbiAgICBlbGVtZW50czogKFBsYWNlaG9sZGVyTWFwIHwgbnVsbClbXSB8IG51bGwsIGV4cHJlc3Npb25zPzogKFBsYWNlaG9sZGVyTWFwIHwgbnVsbClbXSB8IG51bGwsXG4gICAgdG1wbENvbnRhaW5lcnM/OiBzdHJpbmdbXSB8IG51bGwsIGxhc3RDaGlsZEluZGV4PzogbnVtYmVyIHwgbnVsbCk6IG51bWJlciB7XG4gIGNvbnN0IHRtcGxJbmRleCA9IGluc3RydWN0aW9ucy5sZW5ndGg7XG4gIGNvbnN0IHRtcGxJbnN0cnVjdGlvbnM6IEkxOG5JbnN0cnVjdGlvbltdID0gW107XG4gIGNvbnN0IHBoVmlzaXRlZCA9IFtdO1xuICBsZXQgb3BlbmVkVGFnQ291bnQgPSAwO1xuICBsZXQgbWF4SW5kZXggPSAwO1xuXG4gIGluc3RydWN0aW9ucy5wdXNoKHRtcGxJbnN0cnVjdGlvbnMpO1xuXG4gIGZvciAoOyBpbmRleCA8IHRyYW5zbGF0aW9uUGFydHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0cmFuc2xhdGlvblBhcnRzW2luZGV4XTtcblxuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBwbGFjZWhvbGRlcnNcbiAgICBpZiAoaW5kZXggJiAxKSB7XG4gICAgICBsZXQgcGhJbmRleDtcblxuICAgICAgaWYgKGVsZW1lbnRzICYmIGVsZW1lbnRzW3RtcGxJbmRleF0gJiZcbiAgICAgICAgICB0eXBlb2YocGhJbmRleCA9IGVsZW1lbnRzW3RtcGxJbmRleF0gIVt2YWx1ZV0pICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBUaGUgcGxhY2Vob2xkZXIgcmVwcmVzZW50cyBhIERPTSBlbGVtZW50XG4gICAgICAgIC8vIEFkZCBhbiBpbnN0cnVjdGlvbiB0byBtb3ZlIHRoZSBlbGVtZW50XG4gICAgICAgIHRtcGxJbnN0cnVjdGlvbnMucHVzaChwaEluZGV4IHwgSTE4bkluc3RydWN0aW9ucy5FbGVtZW50KTtcbiAgICAgICAgcGhWaXNpdGVkLnB1c2godmFsdWUpO1xuICAgICAgICBvcGVuZWRUYWdDb3VudCsrO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBleHByZXNzaW9ucyAmJiBleHByZXNzaW9uc1t0bXBsSW5kZXhdICYmXG4gICAgICAgICAgdHlwZW9mKHBoSW5kZXggPSBleHByZXNzaW9uc1t0bXBsSW5kZXhdICFbdmFsdWVdKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIHJlcHJlc2VudHMgYW4gZXhwcmVzc2lvblxuICAgICAgICAvLyBBZGQgYW4gaW5zdHJ1Y3Rpb24gdG8gbW92ZSB0aGUgZXhwcmVzc2lvblxuICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2gocGhJbmRleCB8IEkxOG5JbnN0cnVjdGlvbnMuRXhwcmVzc2lvbik7XG4gICAgICAgIHBoVmlzaXRlZC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7ICAvLyBJdCBpcyBhIGNsb3NpbmcgdGFnXG4gICAgICAgIHRtcGxJbnN0cnVjdGlvbnMucHVzaChJMThuSW5zdHJ1Y3Rpb25zLkNsb3NlTm9kZSk7XG5cbiAgICAgICAgaWYgKHRtcGxJbmRleCA+IDApIHtcbiAgICAgICAgICBvcGVuZWRUYWdDb3VudC0tO1xuXG4gICAgICAgICAgLy8gSWYgd2UgaGF2ZSByZWFjaGVkIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhpcyB0ZW1wbGF0ZSwgZXhpdCB0aGUgbG9vcFxuICAgICAgICAgIGlmIChvcGVuZWRUYWdDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcGhJbmRleCAhPT0gJ3VuZGVmaW5lZCcgJiYgcGhJbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgIG1heEluZGV4ID0gcGhJbmRleDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRtcGxDb250YWluZXJzICYmIHRtcGxDb250YWluZXJzLmluZGV4T2YodmFsdWUpICE9PSAtMSAmJlxuICAgICAgICAgIHRtcGxDb250YWluZXJzLmluZGV4T2YodmFsdWUpID49IHRtcGxJbmRleCkge1xuICAgICAgICBpbmRleCA9IGdlbmVyYXRlTWFwcGluZ0luc3RydWN0aW9ucyhcbiAgICAgICAgICAgIGluZGV4LCB0cmFuc2xhdGlvblBhcnRzLCBpbnN0cnVjdGlvbnMsIGVsZW1lbnRzLCBleHByZXNzaW9ucywgdG1wbENvbnRhaW5lcnMsXG4gICAgICAgICAgICBsYXN0Q2hpbGRJbmRleCk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAvLyBJdCdzIGEgbm9uLWVtcHR5IHN0cmluZywgY3JlYXRlIGEgdGV4dCBub2RlXG4gICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goSTE4bkluc3RydWN0aW9ucy5UZXh0LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgc29tZSBlbGVtZW50cyBmcm9tIHRoZSB0ZW1wbGF0ZSBhcmUgbWlzc2luZyBmcm9tIHRoZSB0cmFuc2xhdGlvblxuICBpZiAoZWxlbWVudHMpIHtcbiAgICBjb25zdCB0bXBsRWxlbWVudHMgPSBlbGVtZW50c1t0bXBsSW5kZXhdO1xuXG4gICAgaWYgKHRtcGxFbGVtZW50cykge1xuICAgICAgY29uc3QgcGhLZXlzID0gT2JqZWN0LmtleXModG1wbEVsZW1lbnRzKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGggPSBwaEtleXNbaV07XG5cbiAgICAgICAgaWYgKHBoVmlzaXRlZC5pbmRleE9mKHBoKSA9PT0gLTEpIHtcbiAgICAgICAgICBsZXQgaW5kZXggPSB0bXBsRWxlbWVudHNbcGhdO1xuICAgICAgICAgIC8vIEFkZCBhbiBpbnN0cnVjdGlvbiB0byByZW1vdmUgdGhlIGVsZW1lbnRcbiAgICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goaW5kZXggfCBJMThuSW5zdHJ1Y3Rpb25zLlJlbW92ZU5vZGUpO1xuXG4gICAgICAgICAgaWYgKGluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgc29tZSBleHByZXNzaW9ucyBmcm9tIHRoZSB0ZW1wbGF0ZSBhcmUgbWlzc2luZyBmcm9tIHRoZSB0cmFuc2xhdGlvblxuICBpZiAoZXhwcmVzc2lvbnMpIHtcbiAgICBjb25zdCB0bXBsRXhwcmVzc2lvbnMgPSBleHByZXNzaW9uc1t0bXBsSW5kZXhdO1xuXG4gICAgaWYgKHRtcGxFeHByZXNzaW9ucykge1xuICAgICAgY29uc3QgcGhLZXlzID0gT2JqZWN0LmtleXModG1wbEV4cHJlc3Npb25zKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGggPSBwaEtleXNbaV07XG5cbiAgICAgICAgaWYgKHBoVmlzaXRlZC5pbmRleE9mKHBoKSA9PT0gLTEpIHtcbiAgICAgICAgICBsZXQgaW5kZXggPSB0bXBsRXhwcmVzc2lvbnNbcGhdO1xuICAgICAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgICAgIGFzc2VydExlc3NUaGFuKFxuICAgICAgICAgICAgICAgIGluZGV4LnRvU3RyaW5nKDIpLmxlbmd0aCwgMjgsIGBJbmRleCAke2luZGV4fSBpcyB0b28gYmlnIGFuZCB3aWxsIG92ZXJmbG93YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFkZCBhbiBpbnN0cnVjdGlvbiB0byByZW1vdmUgdGhlIGV4cHJlc3Npb25cbiAgICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goaW5kZXggfCBJMThuSW5zdHJ1Y3Rpb25zLlJlbW92ZU5vZGUpO1xuXG4gICAgICAgICAgaWYgKGluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHRtcGxJbmRleCA9PT0gMCAmJiB0eXBlb2YgbGFzdENoaWxkSW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgLy8gVGhlIGN1cnJlbnQgcGFyZW50IGlzIGFuIG5nLWNvbnRhaW5lciBhbmQgaXQgaGFzIG1vcmUgY2hpbGRyZW4gYWZ0ZXIgdGhlIHRyYW5zbGF0aW9uIHRoYXQgd2VcbiAgICAvLyBuZWVkIHRvIGFwcGVuZCB0byBrZWVwIHRoZSBvcmRlciBvZiB0aGUgRE9NIG5vZGVzIGNvcnJlY3RcbiAgICBmb3IgKGxldCBpID0gbWF4SW5kZXggKyAxOyBpIDw9IGxhc3RDaGlsZEluZGV4OyBpKyspIHtcbiAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgYXNzZXJ0TGVzc1RoYW4oaS50b1N0cmluZygyKS5sZW5ndGgsIDI4LCBgSW5kZXggJHtpfSBpcyB0b28gYmlnIGFuZCB3aWxsIG92ZXJmbG93YCk7XG4gICAgICB9XG4gICAgICAvLyBXZSBjb25zaWRlciB0aG9zZSBhZGRpdGlvbmFsIHBsYWNlaG9sZGVycyBhcyBleHByZXNzaW9ucyBiZWNhdXNlIHdlIGRvbid0IGNhcmUgYWJvdXRcbiAgICAgIC8vIHRoZWlyIGNoaWxkcmVuLCBhbGwgd2UgbmVlZCB0byBkbyBpcyB0byBhcHBlbmQgdGhlbVxuICAgICAgdG1wbEluc3RydWN0aW9ucy5wdXNoKGkgfCBJMThuSW5zdHJ1Y3Rpb25zLkV4cHJlc3Npb24pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gYXBwZW5kSTE4bk5vZGUobm9kZTogTE5vZGUsIHBhcmVudE5vZGU6IExOb2RlLCBwcmV2aW91c05vZGU6IExOb2RlKSB7XG4gIGlmIChuZ0Rldk1vZGUpIHtcbiAgICBuZ0Rldk1vZGUucmVuZGVyZXJNb3ZlTm9kZSsrO1xuICB9XG5cbiAgY29uc3Qgdmlld0RhdGEgPSBnZXRWaWV3RGF0YSgpO1xuXG4gIGFwcGVuZENoaWxkKHBhcmVudE5vZGUsIG5vZGUubmF0aXZlIHx8IG51bGwsIHZpZXdEYXRhKTtcblxuICAvLyBPbiBmaXJzdCBwYXNzLCByZS1vcmdhbml6ZSBub2RlIHRyZWUgdG8gcHV0IHRoaXMgbm9kZSBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbi5cbiAgY29uc3QgZmlyc3RUZW1wbGF0ZVBhc3MgPSBub2RlLnZpZXdbVFZJRVddLmZpcnN0VGVtcGxhdGVQYXNzO1xuICBpZiAoZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICBpZiAocHJldmlvdXNOb2RlID09PSBwYXJlbnROb2RlICYmIG5vZGUudE5vZGUgIT09IHBhcmVudE5vZGUudE5vZGUuY2hpbGQpIHtcbiAgICAgIG5vZGUudE5vZGUubmV4dCA9IHBhcmVudE5vZGUudE5vZGUuY2hpbGQ7XG4gICAgICBwYXJlbnROb2RlLnROb2RlLmNoaWxkID0gbm9kZS50Tm9kZTtcbiAgICB9IGVsc2UgaWYgKHByZXZpb3VzTm9kZSAhPT0gcGFyZW50Tm9kZSAmJiBub2RlLnROb2RlICE9PSBwcmV2aW91c05vZGUudE5vZGUubmV4dCkge1xuICAgICAgbm9kZS50Tm9kZS5uZXh0ID0gcHJldmlvdXNOb2RlLnROb2RlLm5leHQ7XG4gICAgICBwcmV2aW91c05vZGUudE5vZGUubmV4dCA9IG5vZGUudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUudE5vZGUubmV4dCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudE5vZGUudmlldyA9PT0gbm9kZS52aWV3KSBub2RlLnROb2RlLnBhcmVudCA9IHBhcmVudE5vZGUudE5vZGUgYXMgVEVsZW1lbnROb2RlO1xuICB9XG5cbiAgLy8gVGVtcGxhdGUgY29udGFpbmVycyBhbHNvIGhhdmUgYSBjb21tZW50IG5vZGUgZm9yIHRoZSBgVmlld0NvbnRhaW5lclJlZmAgdGhhdCBzaG91bGQgYmUgbW92ZWRcbiAgaWYgKG5vZGUudE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLkNvbnRhaW5lciAmJiBub2RlLmR5bmFtaWNMQ29udGFpbmVyTm9kZSkge1xuICAgIC8vIChub2RlLm5hdGl2ZSBhcyBSQ29tbWVudCkudGV4dENvbnRlbnQgPSAndGVzdCc7XG4gICAgLy8gY29uc29sZS5sb2cobm9kZS5uYXRpdmUpO1xuICAgIGFwcGVuZENoaWxkKHBhcmVudE5vZGUsIG5vZGUuZHluYW1pY0xDb250YWluZXJOb2RlLm5hdGl2ZSB8fCBudWxsLCB2aWV3RGF0YSk7XG4gICAgaWYgKGZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgICBub2RlLnROb2RlLmR5bmFtaWNDb250YWluZXJOb2RlID0gbm9kZS5keW5hbWljTENvbnRhaW5lck5vZGUudE5vZGU7XG4gICAgICBub2RlLmR5bmFtaWNMQ29udGFpbmVyTm9kZS50Tm9kZS5wYXJlbnQgPSBub2RlLnROb2RlIGFzIFRDb250YWluZXJOb2RlO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZS5keW5hbWljTENvbnRhaW5lck5vZGU7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIGdlbmVyYXRlZCBieSBgaTE4bk1hcHBpbmcoKWAgdG8gdHJhbnNmb3JtIHRoZSB0ZW1wbGF0ZSBhY2NvcmRpbmdseS5cbiAqXG4gKiBAcGFyYW0gc3RhcnRJbmRleCBJbmRleCBvZiB0aGUgZmlyc3QgZWxlbWVudCB0byB0cmFuc2xhdGUgKGZvciBpbnN0YW5jZSB0aGUgZmlyc3QgY2hpbGQgb2YgdGhlXG4gKiBlbGVtZW50IHdpdGggdGhlIGkxOG4gYXR0cmlidXRlKS5cbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgVGhlIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRvIGFwcGx5IG9uIHRoZSBjdXJyZW50IHZpZXcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuQXBwbHkoc3RhcnRJbmRleDogbnVtYmVyLCBpbnN0cnVjdGlvbnM6IEkxOG5JbnN0cnVjdGlvbltdKTogdm9pZCB7XG4gIGNvbnN0IHZpZXdEYXRhID0gZ2V0Vmlld0RhdGEoKTtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIGFzc2VydEVxdWFsKHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdLCAtMSwgJ2kxOG5BcHBseSBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhbnkgYmluZGluZycpO1xuICB9XG5cbiAgaWYgKCFpbnN0cnVjdGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZW5kZXJlciA9IGdldFJlbmRlcmVyKCk7XG4gIGxldCBsb2NhbFBhcmVudE5vZGU6IExOb2RlID0gZ2V0UGFyZW50TE5vZGUobG9hZChzdGFydEluZGV4KSkgfHwgZ2V0UHJldmlvdXNPclBhcmVudE5vZGUoKTtcbiAgbGV0IGxvY2FsUHJldmlvdXNOb2RlOiBMTm9kZSA9IGxvY2FsUGFyZW50Tm9kZTtcbiAgcmVzZXRBcHBsaWNhdGlvblN0YXRlKCk7ICAvLyBXZSBkb24ndCB3YW50IHRvIGFkZCB0byB0aGUgdHJlZSB3aXRoIHRoZSB3cm9uZyBwcmV2aW91cyBub2RlXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgc3dpdGNoIChpbnN0cnVjdGlvbiAmIEkxOG5JbnN0cnVjdGlvbnMuSW5zdHJ1Y3Rpb25NYXNrKSB7XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuRWxlbWVudDpcbiAgICAgICAgY29uc3QgZWxlbWVudDogTE5vZGUgPSBsb2FkKGluc3RydWN0aW9uICYgSTE4bkluc3RydWN0aW9ucy5JbmRleE1hc2spO1xuICAgICAgICBsb2NhbFByZXZpb3VzTm9kZSA9IGFwcGVuZEkxOG5Ob2RlKGVsZW1lbnQsIGxvY2FsUGFyZW50Tm9kZSwgbG9jYWxQcmV2aW91c05vZGUpO1xuICAgICAgICBsb2NhbFBhcmVudE5vZGUgPSBlbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5FeHByZXNzaW9uOlxuICAgICAgICBjb25zdCBleHByOiBMTm9kZSA9IGxvYWQoaW5zdHJ1Y3Rpb24gJiBJMThuSW5zdHJ1Y3Rpb25zLkluZGV4TWFzayk7XG4gICAgICAgIGxvY2FsUHJldmlvdXNOb2RlID0gYXBwZW5kSTE4bk5vZGUoZXhwciwgbG9jYWxQYXJlbnROb2RlLCBsb2NhbFByZXZpb3VzTm9kZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBJMThuSW5zdHJ1Y3Rpb25zLlRleHQ6XG4gICAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgICBuZ0Rldk1vZGUucmVuZGVyZXJDcmVhdGVUZXh0Tm9kZSsrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5zdHJ1Y3Rpb25zWysraV07XG4gICAgICAgIGNvbnN0IHRleHRSTm9kZSA9IGNyZWF0ZVRleHROb2RlKHZhbHVlLCByZW5kZXJlcik7XG4gICAgICAgIC8vIElmIHdlIHdlcmUgdG8gb25seSBjcmVhdGUgYSBgUk5vZGVgIHRoZW4gcHJvamVjdGlvbnMgd29uJ3QgbW92ZSB0aGUgdGV4dC5cbiAgICAgICAgLy8gQ3JlYXRlIHRleHQgbm9kZSBhdCB0aGUgY3VycmVudCBlbmQgb2Ygdmlld0RhdGEuIE11c3Qgc3VidHJhY3QgaGVhZGVyIG9mZnNldCBiZWNhdXNlXG4gICAgICAgIC8vIGNyZWF0ZUxOb2RlIHRha2VzIGEgcmF3IGluZGV4IChub3QgYWRqdXN0ZWQgYnkgaGVhZGVyIG9mZnNldCkuXG4gICAgICAgIGNvbnN0IHRleHRMTm9kZSA9XG4gICAgICAgICAgICBjcmVhdGVMTm9kZSh2aWV3RGF0YS5sZW5ndGggLSBIRUFERVJfT0ZGU0VULCBUTm9kZVR5cGUuRWxlbWVudCwgdGV4dFJOb2RlLCBudWxsLCBudWxsKTtcbiAgICAgICAgbG9jYWxQcmV2aW91c05vZGUgPSBhcHBlbmRJMThuTm9kZSh0ZXh0TE5vZGUsIGxvY2FsUGFyZW50Tm9kZSwgbG9jYWxQcmV2aW91c05vZGUpO1xuICAgICAgICByZXNldEFwcGxpY2F0aW9uU3RhdGUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuQ2xvc2VOb2RlOlxuICAgICAgICBsb2NhbFByZXZpb3VzTm9kZSA9IGxvY2FsUGFyZW50Tm9kZTtcbiAgICAgICAgbG9jYWxQYXJlbnROb2RlID0gZ2V0UGFyZW50TE5vZGUobG9jYWxQYXJlbnROb2RlKSAhO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5SZW1vdmVOb2RlOlxuICAgICAgICBpZiAobmdEZXZNb2RlKSB7XG4gICAgICAgICAgbmdEZXZNb2RlLnJlbmRlcmVyUmVtb3ZlTm9kZSsrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaW5zdHJ1Y3Rpb24gJiBJMThuSW5zdHJ1Y3Rpb25zLkluZGV4TWFzaztcbiAgICAgICAgY29uc3QgcmVtb3ZlZE5vZGU6IExOb2RlfExDb250YWluZXJOb2RlID0gbG9hZChpbmRleCk7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBnZXRQYXJlbnRMTm9kZShyZW1vdmVkTm9kZSkgITtcbiAgICAgICAgcmVtb3ZlQ2hpbGQocGFyZW50Tm9kZSwgcmVtb3ZlZE5vZGUubmF0aXZlIHx8IG51bGwsIHZpZXdEYXRhKTtcblxuICAgICAgICAvLyBGb3IgdGVtcGxhdGUgY29udGFpbmVycyB3ZSBhbHNvIG5lZWQgdG8gcmVtb3ZlIHRoZWlyIGBWaWV3Q29udGFpbmVyUmVmYCBmcm9tIHRoZSBET01cbiAgICAgICAgaWYgKHJlbW92ZWROb2RlLnROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5Db250YWluZXIgJiYgcmVtb3ZlZE5vZGUuZHluYW1pY0xDb250YWluZXJOb2RlKSB7XG4gICAgICAgICAgcmVtb3ZlQ2hpbGQocGFyZW50Tm9kZSwgcmVtb3ZlZE5vZGUuZHluYW1pY0xDb250YWluZXJOb2RlLm5hdGl2ZSB8fCBudWxsLCB2aWV3RGF0YSk7XG4gICAgICAgICAgcmVtb3ZlZE5vZGUuZHluYW1pY0xDb250YWluZXJOb2RlLnROb2RlLmRldGFjaGVkID0gdHJ1ZTtcbiAgICAgICAgICByZW1vdmVkTm9kZS5keW5hbWljTENvbnRhaW5lck5vZGUuZGF0YVtSRU5ERVJfUEFSRU5UXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVGFrZXMgYSB0cmFuc2xhdGlvbiBzdHJpbmcgYW5kIHRoZSBpbml0aWFsIGxpc3Qgb2YgZXhwcmVzc2lvbnMgYW5kIHJldHVybnMgYSBsaXN0IG9mIGluc3RydWN0aW9uc1xuICogdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNsYXRlIGFuIGF0dHJpYnV0ZS5cbiAqIEV2ZW4gaW5kZXhlcyBjb250YWluIHN0YXRpYyBzdHJpbmdzLCB3aGlsZSBvZGQgaW5kZXhlcyBjb250YWluIHRoZSBpbmRleCBvZiB0aGUgZXhwcmVzc2lvbiB3aG9zZVxuICogdmFsdWUgd2lsbCBiZSBjb25jYXRlbmF0ZWQgaW50byB0aGUgZmluYWwgdHJhbnNsYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuRXhwTWFwcGluZyhcbiAgICB0cmFuc2xhdGlvbjogc3RyaW5nLCBwbGFjZWhvbGRlcnM6IFBsYWNlaG9sZGVyTWFwKTogSTE4bkV4cEluc3RydWN0aW9uW10ge1xuICBjb25zdCBzdGF0aWNUZXh0OiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSA9IHRyYW5zbGF0aW9uLnNwbGl0KGkxOG5UYWdSZWdleCk7XG4gIC8vIG9kZCBpbmRleGVzIGFyZSBwbGFjZWhvbGRlcnNcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdGF0aWNUZXh0Lmxlbmd0aDsgaSArPSAyKSB7XG4gICAgc3RhdGljVGV4dFtpXSA9IHBsYWNlaG9sZGVyc1tzdGF0aWNUZXh0W2ldXTtcbiAgfVxuICByZXR1cm4gc3RhdGljVGV4dDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlIG9mIHVwIHRvIDggZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbihcbiAgICBpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCBudW1iZXJPZkV4cDogbnVtYmVyLCB2MDogYW55LCB2MT86IGFueSwgdjI/OiBhbnksIHYzPzogYW55LFxuICAgIHY0PzogYW55LCB2NT86IGFueSwgdjY/OiBhbnksIHY3PzogYW55KTogc3RyaW5nfE5PX0NIQU5HRSB7XG4gIGxldCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZCh2MCk7XG5cbiAgaWYgKG51bWJlck9mRXhwID4gMSkge1xuICAgIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKHYxKSB8fCBkaWZmZXJlbnQ7XG5cbiAgICBpZiAobnVtYmVyT2ZFeHAgPiAyKSB7XG4gICAgICBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZCh2MikgfHwgZGlmZmVyZW50O1xuXG4gICAgICBpZiAobnVtYmVyT2ZFeHAgPiAzKSB7XG4gICAgICAgIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKHYzKSB8fCBkaWZmZXJlbnQ7XG5cbiAgICAgICAgaWYgKG51bWJlck9mRXhwID4gNCkge1xuICAgICAgICAgIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKHY0KSB8fCBkaWZmZXJlbnQ7XG5cbiAgICAgICAgICBpZiAobnVtYmVyT2ZFeHAgPiA1KSB7XG4gICAgICAgICAgICBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZCh2NSkgfHwgZGlmZmVyZW50O1xuXG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZFeHAgPiA2KSB7XG4gICAgICAgICAgICAgIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKHY2KSB8fCBkaWZmZXJlbnQ7XG5cbiAgICAgICAgICAgICAgaWYgKG51bWJlck9mRXhwID4gNykge1xuICAgICAgICAgICAgICAgIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKHY3KSB8fCBkaWZmZXJlbnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIHBsYWNlaG9sZGVyc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgc3dpdGNoIChpbnN0cnVjdGlvbnNbaV0pIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHZhbHVlID0gdjA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB2YWx1ZSA9IHYxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgdmFsdWUgPSB2MjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHZhbHVlID0gdjM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICB2YWx1ZSA9IHY0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgdmFsdWUgPSB2NTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgIHZhbHVlID0gdjY7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICB2YWx1ZSA9IHY3O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHRyYW5zbGF0ZWQgaW50ZXJwb2xhdGlvbiBiaW5kaW5nIHdpdGggYSB2YXJpYWJsZSBudW1iZXIgb2YgZXhwcmVzc2lvbnMuXG4gKlxuICogSWYgdGhlcmUgYXJlIDEgdG8gOCBleHByZXNzaW9ucyB0aGVuIGBpMThuSW50ZXJwb2xhdGlvbigpYCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLiBJdCBpcyBmYXN0ZXJcbiAqIGJlY2F1c2UgdGhlcmUgaXMgbm8gbmVlZCB0byBjcmVhdGUgYW4gYXJyYXkgb2YgZXhwcmVzc2lvbnMgYW5kIGl0ZXJhdGUgb3ZlciBpdC5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5JbnRlcnBvbGF0aW9uVihpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2YWx1ZXM6IGFueVtdKTogc3RyaW5nfFxuICAgIE5PX0NIQU5HRSB7XG4gIGxldCBkaWZmZXJlbnQgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBDaGVjayBpZiBiaW5kaW5ncyBoYXZlIGNoYW5nZWRcbiAgICBiaW5kaW5nVXBkYXRlZCh2YWx1ZXNbaV0pICYmIChkaWZmZXJlbnQgPSB0cnVlKTtcbiAgfVxuXG4gIGlmICghZGlmZmVyZW50KSB7XG4gICAgcmV0dXJuIE5PX0NIQU5HRTtcbiAgfVxuXG4gIGxldCByZXMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBPZGQgaW5kZXhlcyBhcmUgcGxhY2Vob2xkZXJzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlc1tpbnN0cnVjdGlvbnNbaV0gYXMgbnVtYmVyXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cbiJdfQ==