/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertEqual, assertLessThan } from './assert';
import { NO_CHANGE, _getViewData, bindingUpdated, bindingUpdated2, bindingUpdated3, bindingUpdated4, createLNode, getPreviousOrParentNode, getRenderer, load, resetApplicationState } from './instructions';
import { RENDER_PARENT } from './interfaces/container';
import { BINDING_INDEX, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { appendChild, createTextNode, getParentLNode, removeChild } from './node_manipulation';
import { stringify } from './util';
var i18nTagRegex = /{\$([^}]+)}/g;
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
 * @param templateRoots An array of template roots whose content should be ignored when
 * generating the instructions for their parent template.
 * @param lastChildIndex The index of the last child of the i18n node. Used when the i18n block is
 * an ng-container.
 *
 * @returns A list of instructions used to translate each template.
 */
export function i18nMapping(translation, elements, expressions, templateRoots, lastChildIndex) {
    var translationParts = translation.split(i18nTagRegex);
    var nbTemplates = templateRoots ? templateRoots.length + 1 : 1;
    var instructions = (new Array(nbTemplates)).fill(undefined);
    generateMappingInstructions(0, 0, translationParts, instructions, elements, expressions, templateRoots, lastChildIndex);
    return instructions;
}
/**
 * Internal function that reads the translation parts and generates a set of instructions for each
 * template.
 *
 * See `i18nMapping()` for more details.
 *
 * @param tmplIndex The order of appearance of the template.
 * 0 for the root template, following indexes match the order in `templateRoots`.
 * @param partIndex The current index in `translationParts`.
 * @param translationParts The translation string split into an array of placeholders and text
 * elements.
 * @param instructions The current list of instructions to update.
 * @param elements An array containing, for each template, the maps of element placeholders and
 * their indexes.
 * @param expressions An array containing, for each template, the maps of expression placeholders
 * and their indexes.
 * @param templateRoots An array of template roots whose content should be ignored when
 * generating the instructions for their parent template.
 * @param lastChildIndex The index of the last child of the i18n node. Used when the i18n block is
 * an ng-container.
 *
 * @returns the current index in `translationParts`
 */
function generateMappingInstructions(tmplIndex, partIndex, translationParts, instructions, elements, expressions, templateRoots, lastChildIndex) {
    var tmplInstructions = [];
    var phVisited = [];
    var openedTagCount = 0;
    var maxIndex = 0;
    var currentElements = elements && elements[tmplIndex] ? elements[tmplIndex] : null;
    var currentExpressions = expressions && expressions[tmplIndex] ? expressions[tmplIndex] : null;
    instructions[tmplIndex] = tmplInstructions;
    for (; partIndex < translationParts.length; partIndex++) {
        // The value can either be text or the name of a placeholder (element/template root/expression)
        var value = translationParts[partIndex];
        // Odd indexes are placeholders
        if (partIndex & 1) {
            var phIndex = void 0;
            if (currentElements && currentElements[value] !== undefined) {
                phIndex = currentElements[value];
                // The placeholder represents a DOM element, add an instruction to move it
                var templateRootIndex = templateRoots ? templateRoots.indexOf(value) : -1;
                if (templateRootIndex !== -1 && (templateRootIndex + 1) !== tmplIndex) {
                    // This is a template root, it has no closing tag, not treating it as an element
                    tmplInstructions.push(phIndex | -2147483648 /* TemplateRoot */);
                }
                else {
                    tmplInstructions.push(phIndex | 1073741824 /* Element */);
                    openedTagCount++;
                }
                phVisited.push(value);
            }
            else if (currentExpressions && currentExpressions[value] !== undefined) {
                phIndex = currentExpressions[value];
                // The placeholder represents an expression, add an instruction to move it
                tmplInstructions.push(phIndex | 1610612736 /* Expression */);
                phVisited.push(value);
            }
            else {
                // It is a closing tag
                tmplInstructions.push(-1073741824 /* CloseNode */);
                if (tmplIndex > 0) {
                    openedTagCount--;
                    // If we have reached the closing tag for this template, exit the loop
                    if (openedTagCount === 0) {
                        break;
                    }
                }
            }
            if (phIndex !== undefined && phIndex > maxIndex) {
                maxIndex = phIndex;
            }
            if (templateRoots) {
                var newTmplIndex = templateRoots.indexOf(value) + 1;
                if (newTmplIndex !== 0 && newTmplIndex !== tmplIndex) {
                    partIndex = generateMappingInstructions(newTmplIndex, partIndex, translationParts, instructions, elements, expressions, templateRoots, lastChildIndex);
                }
            }
        }
        else if (value) {
            // It's a non-empty string, create a text node
            tmplInstructions.push(536870912 /* Text */, value);
        }
    }
    // Add instructions to remove elements that are not used in the translation
    if (elements) {
        var tmplElements = elements[tmplIndex];
        if (tmplElements) {
            var phKeys = Object.keys(tmplElements);
            for (var i = 0; i < phKeys.length; i++) {
                var ph = phKeys[i];
                if (phVisited.indexOf(ph) === -1) {
                    var index = tmplElements[ph];
                    // Add an instruction to remove the element
                    tmplInstructions.push(index | -536870912 /* RemoveNode */);
                    if (index > maxIndex) {
                        maxIndex = index;
                    }
                }
            }
        }
    }
    // Add instructions to remove expressions that are not used in the translation
    if (expressions) {
        var tmplExpressions = expressions[tmplIndex];
        if (tmplExpressions) {
            var phKeys = Object.keys(tmplExpressions);
            for (var i = 0; i < phKeys.length; i++) {
                var ph = phKeys[i];
                if (phVisited.indexOf(ph) === -1) {
                    var index = tmplExpressions[ph];
                    if (ngDevMode) {
                        assertLessThan(index.toString(2).length, 28, "Index " + index + " is too big and will overflow");
                    }
                    // Add an instruction to remove the expression
                    tmplInstructions.push(index | -536870912 /* RemoveNode */);
                    if (index > maxIndex) {
                        maxIndex = index;
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
            tmplInstructions.push(i | -1610612736 /* Any */);
        }
    }
    return partIndex;
}
function appendI18nNode(node, parentNode, previousNode) {
    if (ngDevMode) {
        ngDevMode.rendererMoveNode++;
    }
    var viewData = _getViewData();
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
    var viewData = _getViewData();
    if (ngDevMode) {
        assertEqual(viewData[BINDING_INDEX], viewData[TVIEW].bindingStartIndex, 'i18nApply should be called before any binding');
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
            case -2147483648 /* TemplateRoot */:
            case -1610612736 /* Any */:
                var node = load(instruction & 536870911 /* IndexMask */);
                localPreviousNode = appendI18nNode(node, localParentNode, localPreviousNode);
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
            case -1073741824 /* CloseNode */:
                localPreviousNode = localParentNode;
                localParentNode = getParentLNode(localParentNode);
                break;
            case -536870912 /* RemoveNode */:
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
 * Checks if the value of an expression has changed and replaces it by its value in a translation,
 * or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation1(instructions, v0) {
    var different = bindingUpdated(_getViewData()[BINDING_INDEX]++, v0);
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            res += stringify(v0);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 2 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation2(instructions, v0, v1) {
    var viewData = _getViewData();
    var different = bindingUpdated2(viewData[BINDING_INDEX], v0, v1);
    viewData[BINDING_INDEX] += 2;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b1 ? v1 : v0;
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 3 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 * @param v2 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation3(instructions, v0, v1, v2) {
    var viewData = _getViewData();
    var different = bindingUpdated3(viewData[BINDING_INDEX], v0, v1, v2);
    viewData[BINDING_INDEX] += 3;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b2 = idx & 2;
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b2 ? v2 : (b1 ? v1 : v0);
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 4 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 * @param v2 value checked for change.
 * @param v3 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation4(instructions, v0, v1, v2, v3) {
    var viewData = _getViewData();
    var different = bindingUpdated4(viewData[BINDING_INDEX], v0, v1, v2, v3);
    viewData[BINDING_INDEX] += 4;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b2 = idx & 2;
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b2 ? (b1 ? v3 : v2) : (b1 ? v1 : v0);
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 5 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 * @param v2 value checked for change.
 * @param v3 value checked for change.
 * @param v4 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation5(instructions, v0, v1, v2, v3, v4) {
    var viewData = _getViewData();
    var different = bindingUpdated4(viewData[BINDING_INDEX], v0, v1, v2, v3);
    different = bindingUpdated(viewData[BINDING_INDEX] + 4, v4) || different;
    viewData[BINDING_INDEX] += 5;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b4 = idx & 4;
            var b2 = idx & 2;
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b4 ? v4 : (b2 ? (b1 ? v3 : v2) : (b1 ? v1 : v0));
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 6 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 * @param v2 value checked for change.
 * @param v3 value checked for change.
 * @param v4 value checked for change.
 * @param v5 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */ export function i18nInterpolation6(instructions, v0, v1, v2, v3, v4, v5) {
    var viewData = _getViewData();
    var different = bindingUpdated4(viewData[BINDING_INDEX], v0, v1, v2, v3);
    different = bindingUpdated2(viewData[BINDING_INDEX] + 4, v4, v5) || different;
    viewData[BINDING_INDEX] += 6;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b4 = idx & 4;
            var b2 = idx & 2;
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b4 ? (b1 ? v5 : v4) : (b2 ? (b1 ? v3 : v2) : (b1 ? v1 : v0));
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 7 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 * @param v2 value checked for change.
 * @param v3 value checked for change.
 * @param v4 value checked for change.
 * @param v5 value checked for change.
 * @param v6 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation7(instructions, v0, v1, v2, v3, v4, v5, v6) {
    var viewData = _getViewData();
    var different = bindingUpdated4(viewData[BINDING_INDEX], v0, v1, v2, v3);
    different = bindingUpdated3(viewData[BINDING_INDEX] + 4, v4, v5, v6) || different;
    viewData[BINDING_INDEX] += 7;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b4 = idx & 4;
            var b2 = idx & 2;
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b4 ? (b2 ? v6 : (b1 ? v5 : v4)) : (b2 ? (b1 ? v3 : v2) : (b1 ? v1 : v0));
            res += stringify(value);
        }
        else {
            res += instructions[i];
        }
    }
    return res;
}
/**
 * Checks if the values of up to 8 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @param instructions A list of instructions that will be used to translate an attribute.
 * @param v0 value checked for change.
 * @param v1 value checked for change.
 * @param v2 value checked for change.
 * @param v3 value checked for change.
 * @param v4 value checked for change.
 * @param v5 value checked for change.
 * @param v6 value checked for change.
 * @param v7 value checked for change.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export function i18nInterpolation8(instructions, v0, v1, v2, v3, v4, v5, v6, v7) {
    var viewData = _getViewData();
    var different = bindingUpdated4(viewData[BINDING_INDEX], v0, v1, v2, v3);
    different = bindingUpdated4(viewData[BINDING_INDEX] + 4, v4, v5, v6, v7) || different;
    viewData[BINDING_INDEX] += 8;
    if (!different) {
        return NO_CHANGE;
    }
    var res = '';
    for (var i = 0; i < instructions.length; i++) {
        // Odd indexes are bindings
        if (i & 1) {
            // Extract bits
            var idx = instructions[i];
            var b4 = idx & 4;
            var b2 = idx & 2;
            var b1 = idx & 1;
            // Get the value from the argument vx where x = idx
            var value = b4 ? (b2 ? (b1 ? v7 : v6) : (b1 ? v5 : v4)) : (b2 ? (b1 ? v3 : v2) : (b1 ? v1 : v0));
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
    var viewData = _getViewData();
    var different = false;
    for (var i = 0; i < values.length; i++) {
        // Check if bindings have changed
        bindingUpdated(viewData[BINDING_INDEX]++, values[i]) && (different = true);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsV0FBVyxFQUFFLGNBQWMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNyRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxTSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFvQ2pDLElBQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLHNCQUNGLFdBQW1CLEVBQUUsUUFBMEMsRUFDL0QsV0FBOEMsRUFBRSxhQUErQixFQUMvRSxjQUE4QjtJQUNoQyxJQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekQsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLElBQU0sWUFBWSxHQUF3QixDQUFDLElBQUksS0FBSyxDQUFD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R0FPRztBQUNILE1BQU0sNkJBQTZCLFlBQWtDLEVBQUUsTUFBYTtJQUVsRixJQUFNLFFBQVEsR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUNoQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsaUNBQWlDO1FBQ2pDLGNBQWMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUM1RTtJQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVDLCtCQUErQjtRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVCxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxHQUFHLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RXF1YWwsIGFzc2VydExlc3NUaGFufSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge05PX0NIQU5HRSwgX2dldFZpZXdEYXRhLCBiaW5kaW5nVXBkYXRlZCwgYmluZGluZ1VwZGF0ZWQyLCBiaW5kaW5nVXBkYXRlZDMsIGJpbmRpbmdVcGRhdGVkNCwgY3JlYXRlTE5vZGUsIGdldFByZXZpb3VzT3JQYXJlbnROb2RlLCBnZXRSZW5kZXJlciwgbG9hZCwgcmVzZXRBcHBsaWNhdGlvblN0YXRlfSBmcm9tICcuL2luc3RydWN0aW9ucyc7XG5pbXBvcnQge1JFTkRFUl9QQVJFTlR9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtMQ29udGFpbmVyTm9kZSwgTE5vZGUsIFRDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFROb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtCSU5ESU5HX0lOREVYLCBIRUFERVJfT0ZGU0VULCBUVklFV30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthcHBlbmRDaGlsZCwgY3JlYXRlVGV4dE5vZGUsIGdldFBhcmVudExOb2RlLCByZW1vdmVDaGlsZH0gZnJvbSAnLi9ub2RlX21hbmlwdWxhdGlvbic7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBBIGxpc3Qgb2YgZmxhZ3MgdG8gZW5jb2RlIHRoZSBpMThuIGluc3RydWN0aW9ucyB1c2VkIHRvIHRyYW5zbGF0ZSB0aGUgdGVtcGxhdGUuXG4gKiBXZSBzaGlmdCB0aGUgZmxhZ3MgYnkgMjkgc28gdGhhdCAzMCAmIDMxICYgMzIgYml0cyBjb250YWlucyB0aGUgaW5zdHJ1Y3Rpb25zLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBJMThuSW5zdHJ1Y3Rpb25zIHtcbiAgVGV4dCA9IDEgPDwgMjksXG4gIEVsZW1lbnQgPSAyIDw8IDI5LFxuICBFeHByZXNzaW9uID0gMyA8PCAyOSxcbiAgVGVtcGxhdGVSb290ID0gNCA8PCAyOSxcbiAgQW55ID0gNSA8PCAyOSxcbiAgQ2xvc2VOb2RlID0gNiA8PCAyOSxcbiAgUmVtb3ZlTm9kZSA9IDcgPDwgMjksXG4gIC8qKiBVc2VkIHRvIGRlY29kZSB0aGUgbnVtYmVyIGVuY29kZWQgd2l0aCB0aGUgaW5zdHJ1Y3Rpb24uICovXG4gIEluZGV4TWFzayA9ICgxIDw8IDI5KSAtIDEsXG4gIC8qKiBVc2VkIHRvIHRlc3QgdGhlIHR5cGUgb2YgaW5zdHJ1Y3Rpb24uICovXG4gIEluc3RydWN0aW9uTWFzayA9IH4oKDEgPDwgMjkpIC0gMSksXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgaW5zdHJ1Y3Rpb25zIHVzZWQgdG8gdHJhbnNsYXRlIHRoZSB0ZW1wbGF0ZS5cbiAqIEluc3RydWN0aW9ucyBjYW4gYmUgYSBwbGFjZWhvbGRlciBpbmRleCwgYSBzdGF0aWMgdGV4dCBvciBhIHNpbXBsZSBiaXQgZmllbGQgKGBJMThuRmxhZ2ApLlxuICogV2hlbiB0aGUgaW5zdHJ1Y3Rpb24gaXMgdGhlIGZsYWcgYFRleHRgLCBpdCBpcyBhbHdheXMgZm9sbG93ZWQgYnkgaXRzIHRleHQgdmFsdWUuXG4gKi9cbmV4cG9ydCB0eXBlIEkxOG5JbnN0cnVjdGlvbiA9IG51bWJlciB8IHN0cmluZztcbi8qKlxuICogUmVwcmVzZW50cyB0aGUgaW5zdHJ1Y3Rpb25zIHVzZWQgdG8gdHJhbnNsYXRlIGF0dHJpYnV0ZXMgY29udGFpbmluZyBleHByZXNzaW9ucy5cbiAqIEV2ZW4gaW5kZXhlcyBjb250YWluIHN0YXRpYyBzdHJpbmdzLCB3aGlsZSBvZGQgaW5kZXhlcyBjb250YWluIHRoZSBpbmRleCBvZiB0aGUgZXhwcmVzc2lvbiB3aG9zZVxuICogdmFsdWUgd2lsbCBiZSBjb25jYXRlbmF0ZWQgaW50byB0aGUgZmluYWwgdHJhbnNsYXRpb24uXG4gKi9cbmV4cG9ydCB0eXBlIEkxOG5FeHBJbnN0cnVjdGlvbiA9IG51bWJlciB8IHN0cmluZztcbi8qKiBNYXBwaW5nIG9mIHBsYWNlaG9sZGVyIG5hbWVzIHRvIHRoZWlyIGFic29sdXRlIGluZGV4ZXMgaW4gdGhlaXIgdGVtcGxhdGVzLiAqL1xuZXhwb3J0IHR5cGUgUGxhY2Vob2xkZXJNYXAgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiBudW1iZXJcbn07XG5jb25zdCBpMThuVGFnUmVnZXggPSAve1xcJChbXn1dKyl9L2c7XG5cbi8qKlxuICogVGFrZXMgYSB0cmFuc2xhdGlvbiBzdHJpbmcsIHRoZSBpbml0aWFsIGxpc3Qgb2YgcGxhY2Vob2xkZXJzIChlbGVtZW50cyBhbmQgZXhwcmVzc2lvbnMpIGFuZCB0aGVcbiAqIGluZGV4ZXMgb2YgdGhlaXIgY29ycmVzcG9uZGluZyBleHByZXNzaW9uIG5vZGVzIHRvIHJldHVybiBhIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIGZvciBlYWNoXG4gKiB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAqXG4gKiBCZWNhdXNlIGVtYmVkZGVkIHRlbXBsYXRlcyBoYXZlIGRpZmZlcmVudCBpbmRleGVzIGZvciBlYWNoIHBsYWNlaG9sZGVyLCBlYWNoIHBhcmFtZXRlciAoZXhjZXB0XG4gKiB0aGUgdHJhbnNsYXRpb24pIGlzIGFuIGFycmF5LCB3aGVyZSBlYWNoIHZhbHVlIGNvcnJlc3BvbmRzIHRvIGEgZGlmZmVyZW50IHRlbXBsYXRlLCBieSBvcmRlciBvZlxuICogYXBwZWFyYW5jZS5cbiAqXG4gKiBAcGFyYW0gdHJhbnNsYXRpb24gQSB0cmFuc2xhdGlvbiBzdHJpbmcgd2hlcmUgcGxhY2Vob2xkZXJzIGFyZSByZXByZXNlbnRlZCBieSBgeyRuYW1lfWBcbiAqIEBwYXJhbSBlbGVtZW50cyBBbiBhcnJheSBjb250YWluaW5nLCBmb3IgZWFjaCB0ZW1wbGF0ZSwgdGhlIG1hcHMgb2YgZWxlbWVudCBwbGFjZWhvbGRlcnMgYW5kXG4gKiB0aGVpciBpbmRleGVzLlxuICogQHBhcmFtIGV4cHJlc3Npb25zIEFuIGFycmF5IGNvbnRhaW5pbmcsIGZvciBlYWNoIHRlbXBsYXRlLCB0aGUgbWFwcyBvZiBleHByZXNzaW9uIHBsYWNlaG9sZGVyc1xuICogYW5kIHRoZWlyIGluZGV4ZXMuXG4gKiBAcGFyYW0gdGVtcGxhdGVSb290cyBBbiBhcnJheSBvZiB0ZW1wbGF0ZSByb290cyB3aG9zZSBjb250ZW50IHNob3VsZCBiZSBpZ25vcmVkIHdoZW5cbiAqIGdlbmVyYXRpbmcgdGhlIGluc3RydWN0aW9ucyBmb3IgdGhlaXIgcGFyZW50IHRlbXBsYXRlLlxuICogQHBhcmFtIGxhc3RDaGlsZEluZGV4IFRoZSBpbmRleCBvZiB0aGUgbGFzdCBjaGlsZCBvZiB0aGUgaTE4biBub2RlLiBVc2VkIHdoZW4gdGhlIGkxOG4gYmxvY2sgaXNcbiAqIGFuIG5nLWNvbnRhaW5lci5cbiAqXG4gKiBAcmV0dXJucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHVzZWQgdG8gdHJhbnNsYXRlIGVhY2ggdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuTWFwcGluZyhcbiAgICB0cmFuc2xhdGlvbjogc3RyaW5nLCBlbGVtZW50czogKFBsYWNlaG9sZGVyTWFwIHwgbnVsbClbXSB8IG51bGwsXG4gICAgZXhwcmVzc2lvbnM/OiAoUGxhY2Vob2xkZXJNYXAgfCBudWxsKVtdIHwgbnVsbCwgdGVtcGxhdGVSb290cz86IHN0cmluZ1tdIHwgbnVsbCxcbiAgICBsYXN0Q2hpbGRJbmRleD86IG51bWJlciB8IG51bGwpOiBJMThuSW5zdHJ1Y3Rpb25bXVtdIHtcbiAgY29uc3QgdHJhbnNsYXRpb25QYXJ0cyA9IHRyYW5zbGF0aW9uLnNwbGl0KGkxOG5UYWdSZWdleCk7XG4gIGNvbnN0IG5iVGVtcGxhdGVzID0gdGVtcGxhdGVSb290cyA/IHRlbXBsYXRlUm9vdHMubGVuZ3RoICsgMSA6IDE7XG4gIGNvbnN0IGluc3RydWN0aW9uczogSTE4bkluc3RydWN0aW9uW11bXSA9IChuZXcgQXJyYXkobmJUZW1wbGF0ZXMpKS5maWxsKHVuZGVmaW5lZCk7XG5cbiAgZ2VuZXJhdGVNYXBwaW5nSW5zdHJ1Y3Rpb25zKFxuICAgICAgMCwgMCwgdHJhbnNsYXRpb25QYXJ0cywgaW5zdHJ1Y3Rpb25zLCBlbGVtZW50cywgZXhwcmVzc2lvbnMsIHRlbXBsYXRlUm9vdHMsIGxhc3RDaGlsZEluZGV4KTtcblxuICByZXR1cm4gaW5zdHJ1Y3Rpb25zO1xufVxuXG4vKipcbiAqIEludGVybmFsIGZ1bmN0aW9uIHRoYXQgcmVhZHMgdGhlIHRyYW5zbGF0aW9uIHBhcnRzIGFuZCBnZW5lcmF0ZXMgYSBzZXQgb2YgaW5zdHJ1Y3Rpb25zIGZvciBlYWNoXG4gKiB0ZW1wbGF0ZS5cbiAqXG4gKiBTZWUgYGkxOG5NYXBwaW5nKClgIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHBhcmFtIHRtcGxJbmRleCBUaGUgb3JkZXIgb2YgYXBwZWFyYW5jZSBvZiB0aGUgdGVtcGxhdGUuXG4gKiAwIGZvciB0aGUgcm9vdCB0ZW1wbGF0ZSwgZm9sbG93aW5nIGluZGV4ZXMgbWF0Y2ggdGhlIG9yZGVyIGluIGB0ZW1wbGF0ZVJvb3RzYC5cbiAqIEBwYXJhbSBwYXJ0SW5kZXggVGhlIGN1cnJlbnQgaW5kZXggaW4gYHRyYW5zbGF0aW9uUGFydHNgLlxuICogQHBhcmFtIHRyYW5zbGF0aW9uUGFydHMgVGhlIHRyYW5zbGF0aW9uIHN0cmluZyBzcGxpdCBpbnRvIGFuIGFycmF5IG9mIHBsYWNlaG9sZGVycyBhbmQgdGV4dFxuICogZWxlbWVudHMuXG4gKiBAcGFyYW0gaW5zdHJ1Y3Rpb25zIFRoZSBjdXJyZW50IGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSBlbGVtZW50cyBBbiBhcnJheSBjb250YWluaW5nLCBmb3IgZWFjaCB0ZW1wbGF0ZSwgdGhlIG1hcHMgb2YgZWxlbWVudCBwbGFjZWhvbGRlcnMgYW5kXG4gKiB0aGVpciBpbmRleGVzLlxuICogQHBhcmFtIGV4cHJlc3Npb25zIEFuIGFycmF5IGNvbnRhaW5pbmcsIGZvciBlYWNoIHRlbXBsYXRlLCB0aGUgbWFwcyBvZiBleHByZXNzaW9uIHBsYWNlaG9sZGVyc1xuICogYW5kIHRoZWlyIGluZGV4ZXMuXG4gKiBAcGFyYW0gdGVtcGxhdGVSb290cyBBbiBhcnJheSBvZiB0ZW1wbGF0ZSByb290cyB3aG9zZSBjb250ZW50IHNob3VsZCBiZSBpZ25vcmVkIHdoZW5cbiAqIGdlbmVyYXRpbmcgdGhlIGluc3RydWN0aW9ucyBmb3IgdGhlaXIgcGFyZW50IHRlbXBsYXRlLlxuICogQHBhcmFtIGxhc3RDaGlsZEluZGV4IFRoZSBpbmRleCBvZiB0aGUgbGFzdCBjaGlsZCBvZiB0aGUgaTE4biBub2RlLiBVc2VkIHdoZW4gdGhlIGkxOG4gYmxvY2sgaXNcbiAqIGFuIG5nLWNvbnRhaW5lci5cbiAqXG4gKiBAcmV0dXJucyB0aGUgY3VycmVudCBpbmRleCBpbiBgdHJhbnNsYXRpb25QYXJ0c2BcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVNYXBwaW5nSW5zdHJ1Y3Rpb25zKFxuICAgIHRtcGxJbmRleDogbnVtYmVyLCBwYXJ0SW5kZXg6IG51bWJlciwgdHJhbnNsYXRpb25QYXJ0czogc3RyaW5nW10sXG4gICAgaW5zdHJ1Y3Rpb25zOiBJMThuSW5zdHJ1Y3Rpb25bXVtdLCBlbGVtZW50czogKFBsYWNlaG9sZGVyTWFwIHwgbnVsbClbXSB8IG51bGwsXG4gICAgZXhwcmVzc2lvbnM/OiAoUGxhY2Vob2xkZXJNYXAgfCBudWxsKVtdIHwgbnVsbCwgdGVtcGxhdGVSb290cz86IHN0cmluZ1tdIHwgbnVsbCxcbiAgICBsYXN0Q2hpbGRJbmRleD86IG51bWJlciB8IG51bGwpOiBudW1iZXIge1xuICBjb25zdCB0bXBsSW5zdHJ1Y3Rpb25zOiBJMThuSW5zdHJ1Y3Rpb25bXSA9IFtdO1xuICBjb25zdCBwaFZpc2l0ZWQ6IHN0cmluZ1tdID0gW107XG4gIGxldCBvcGVuZWRUYWdDb3VudCA9IDA7XG4gIGxldCBtYXhJbmRleCA9IDA7XG4gIGxldCBjdXJyZW50RWxlbWVudHM6IFBsYWNlaG9sZGVyTWFwfG51bGwgPVxuICAgICAgZWxlbWVudHMgJiYgZWxlbWVudHNbdG1wbEluZGV4XSA/IGVsZW1lbnRzW3RtcGxJbmRleF0gOiBudWxsO1xuICBsZXQgY3VycmVudEV4cHJlc3Npb25zOiBQbGFjZWhvbGRlck1hcHxudWxsID1cbiAgICAgIGV4cHJlc3Npb25zICYmIGV4cHJlc3Npb25zW3RtcGxJbmRleF0gPyBleHByZXNzaW9uc1t0bXBsSW5kZXhdIDogbnVsbDtcblxuICBpbnN0cnVjdGlvbnNbdG1wbEluZGV4XSA9IHRtcGxJbnN0cnVjdGlvbnM7XG5cbiAgZm9yICg7IHBhcnRJbmRleCA8IHRyYW5zbGF0aW9uUGFydHMubGVuZ3RoOyBwYXJ0SW5kZXgrKykge1xuICAgIC8vIFRoZSB2YWx1ZSBjYW4gZWl0aGVyIGJlIHRleHQgb3IgdGhlIG5hbWUgb2YgYSBwbGFjZWhvbGRlciAoZWxlbWVudC90ZW1wbGF0ZSByb290L2V4cHJlc3Npb24pXG4gICAgY29uc3QgdmFsdWUgPSB0cmFuc2xhdGlvblBhcnRzW3BhcnRJbmRleF07XG5cbiAgICAvLyBPZGQgaW5kZXhlcyBhcmUgcGxhY2Vob2xkZXJzXG4gICAgaWYgKHBhcnRJbmRleCAmIDEpIHtcbiAgICAgIGxldCBwaEluZGV4O1xuICAgICAgaWYgKGN1cnJlbnRFbGVtZW50cyAmJiBjdXJyZW50RWxlbWVudHNbdmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGhJbmRleCA9IGN1cnJlbnRFbGVtZW50c1t2YWx1ZV07XG4gICAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciByZXByZXNlbnRzIGEgRE9NIGVsZW1lbnQsIGFkZCBhbiBpbnN0cnVjdGlvbiB0byBtb3ZlIGl0XG4gICAgICAgIGxldCB0ZW1wbGF0ZVJvb3RJbmRleCA9IHRlbXBsYXRlUm9vdHMgPyB0ZW1wbGF0ZVJvb3RzLmluZGV4T2YodmFsdWUpIDogLTE7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVJvb3RJbmRleCAhPT0gLTEgJiYgKHRlbXBsYXRlUm9vdEluZGV4ICsgMSkgIT09IHRtcGxJbmRleCkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYSB0ZW1wbGF0ZSByb290LCBpdCBoYXMgbm8gY2xvc2luZyB0YWcsIG5vdCB0cmVhdGluZyBpdCBhcyBhbiBlbGVtZW50XG4gICAgICAgICAgdG1wbEluc3RydWN0aW9ucy5wdXNoKHBoSW5kZXggfCBJMThuSW5zdHJ1Y3Rpb25zLlRlbXBsYXRlUm9vdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG1wbEluc3RydWN0aW9ucy5wdXNoKHBoSW5kZXggfCBJMThuSW5zdHJ1Y3Rpb25zLkVsZW1lbnQpO1xuICAgICAgICAgIG9wZW5lZFRhZ0NvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgcGhWaXNpdGVkLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50RXhwcmVzc2lvbnMgJiYgY3VycmVudEV4cHJlc3Npb25zW3ZhbHVlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBoSW5kZXggPSBjdXJyZW50RXhwcmVzc2lvbnNbdmFsdWVdO1xuICAgICAgICAvLyBUaGUgcGxhY2Vob2xkZXIgcmVwcmVzZW50cyBhbiBleHByZXNzaW9uLCBhZGQgYW4gaW5zdHJ1Y3Rpb24gdG8gbW92ZSBpdFxuICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2gocGhJbmRleCB8IEkxOG5JbnN0cnVjdGlvbnMuRXhwcmVzc2lvbik7XG4gICAgICAgIHBoVmlzaXRlZC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0IGlzIGEgY2xvc2luZyB0YWdcbiAgICAgICAgdG1wbEluc3RydWN0aW9ucy5wdXNoKEkxOG5JbnN0cnVjdGlvbnMuQ2xvc2VOb2RlKTtcblxuICAgICAgICBpZiAodG1wbEluZGV4ID4gMCkge1xuICAgICAgICAgIG9wZW5lZFRhZ0NvdW50LS07XG5cbiAgICAgICAgICAvLyBJZiB3ZSBoYXZlIHJlYWNoZWQgdGhlIGNsb3NpbmcgdGFnIGZvciB0aGlzIHRlbXBsYXRlLCBleGl0IHRoZSBsb29wXG4gICAgICAgICAgaWYgKG9wZW5lZFRhZ0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBoSW5kZXggIT09IHVuZGVmaW5lZCAmJiBwaEluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgbWF4SW5kZXggPSBwaEluZGV4O1xuICAgICAgfVxuXG4gICAgICBpZiAodGVtcGxhdGVSb290cykge1xuICAgICAgICBjb25zdCBuZXdUbXBsSW5kZXggPSB0ZW1wbGF0ZVJvb3RzLmluZGV4T2YodmFsdWUpICsgMTtcbiAgICAgICAgaWYgKG5ld1RtcGxJbmRleCAhPT0gMCAmJiBuZXdUbXBsSW5kZXggIT09IHRtcGxJbmRleCkge1xuICAgICAgICAgIHBhcnRJbmRleCA9IGdlbmVyYXRlTWFwcGluZ0luc3RydWN0aW9ucyhcbiAgICAgICAgICAgICAgbmV3VG1wbEluZGV4LCBwYXJ0SW5kZXgsIHRyYW5zbGF0aW9uUGFydHMsIGluc3RydWN0aW9ucywgZWxlbWVudHMsIGV4cHJlc3Npb25zLFxuICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3RzLCBsYXN0Q2hpbGRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIC8vIEl0J3MgYSBub24tZW1wdHkgc3RyaW5nLCBjcmVhdGUgYSB0ZXh0IG5vZGVcbiAgICAgIHRtcGxJbnN0cnVjdGlvbnMucHVzaChJMThuSW5zdHJ1Y3Rpb25zLlRleHQsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgaW5zdHJ1Y3Rpb25zIHRvIHJlbW92ZSBlbGVtZW50cyB0aGF0IGFyZSBub3QgdXNlZCBpbiB0aGUgdHJhbnNsYXRpb25cbiAgaWYgKGVsZW1lbnRzKSB7XG4gICAgY29uc3QgdG1wbEVsZW1lbnRzID0gZWxlbWVudHNbdG1wbEluZGV4XTtcblxuICAgIGlmICh0bXBsRWxlbWVudHMpIHtcbiAgICAgIGNvbnN0IHBoS2V5cyA9IE9iamVjdC5rZXlzKHRtcGxFbGVtZW50cyk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGhLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBoID0gcGhLZXlzW2ldO1xuXG4gICAgICAgIGlmIChwaFZpc2l0ZWQuaW5kZXhPZihwaCkgPT09IC0xKSB7XG4gICAgICAgICAgbGV0IGluZGV4ID0gdG1wbEVsZW1lbnRzW3BoXTtcbiAgICAgICAgICAvLyBBZGQgYW4gaW5zdHJ1Y3Rpb24gdG8gcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAgICAgICAgdG1wbEluc3RydWN0aW9ucy5wdXNoKGluZGV4IHwgSTE4bkluc3RydWN0aW9ucy5SZW1vdmVOb2RlKTtcblxuICAgICAgICAgIGlmIChpbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IGluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBpbnN0cnVjdGlvbnMgdG8gcmVtb3ZlIGV4cHJlc3Npb25zIHRoYXQgYXJlIG5vdCB1c2VkIGluIHRoZSB0cmFuc2xhdGlvblxuICBpZiAoZXhwcmVzc2lvbnMpIHtcbiAgICBjb25zdCB0bXBsRXhwcmVzc2lvbnMgPSBleHByZXNzaW9uc1t0bXBsSW5kZXhdO1xuXG4gICAgaWYgKHRtcGxFeHByZXNzaW9ucykge1xuICAgICAgY29uc3QgcGhLZXlzID0gT2JqZWN0LmtleXModG1wbEV4cHJlc3Npb25zKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGggPSBwaEtleXNbaV07XG5cbiAgICAgICAgaWYgKHBoVmlzaXRlZC5pbmRleE9mKHBoKSA9PT0gLTEpIHtcbiAgICAgICAgICBsZXQgaW5kZXggPSB0bXBsRXhwcmVzc2lvbnNbcGhdO1xuICAgICAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgICAgIGFzc2VydExlc3NUaGFuKFxuICAgICAgICAgICAgICAgIGluZGV4LnRvU3RyaW5nKDIpLmxlbmd0aCwgMjgsIGBJbmRleCAke2luZGV4fSBpcyB0b28gYmlnIGFuZCB3aWxsIG92ZXJmbG93YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFkZCBhbiBpbnN0cnVjdGlvbiB0byByZW1vdmUgdGhlIGV4cHJlc3Npb25cbiAgICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goaW5kZXggfCBJMThuSW5zdHJ1Y3Rpb25zLlJlbW92ZU5vZGUpO1xuXG4gICAgICAgICAgaWYgKGluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHRtcGxJbmRleCA9PT0gMCAmJiB0eXBlb2YgbGFzdENoaWxkSW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgLy8gVGhlIGN1cnJlbnQgcGFyZW50IGlzIGFuIG5nLWNvbnRhaW5lciBhbmQgaXQgaGFzIG1vcmUgY2hpbGRyZW4gYWZ0ZXIgdGhlIHRyYW5zbGF0aW9uIHRoYXQgd2VcbiAgICAvLyBuZWVkIHRvIGFwcGVuZCB0byBrZWVwIHRoZSBvcmRlciBvZiB0aGUgRE9NIG5vZGVzIGNvcnJlY3RcbiAgICBmb3IgKGxldCBpID0gbWF4SW5kZXggKyAxOyBpIDw9IGxhc3RDaGlsZEluZGV4OyBpKyspIHtcbiAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgYXNzZXJ0TGVzc1RoYW4oaS50b1N0cmluZygyKS5sZW5ndGgsIDI4LCBgSW5kZXggJHtpfSBpcyB0b28gYmlnIGFuZCB3aWxsIG92ZXJmbG93YCk7XG4gICAgICB9XG4gICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goaSB8IEkxOG5JbnN0cnVjdGlvbnMuQW55KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydEluZGV4O1xufVxuXG5mdW5jdGlvbiBhcHBlbmRJMThuTm9kZShub2RlOiBMTm9kZSwgcGFyZW50Tm9kZTogTE5vZGUsIHByZXZpb3VzTm9kZTogTE5vZGUpIHtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIG5nRGV2TW9kZS5yZW5kZXJlck1vdmVOb2RlKys7XG4gIH1cblxuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuXG4gIGFwcGVuZENoaWxkKHBhcmVudE5vZGUsIG5vZGUubmF0aXZlIHx8IG51bGwsIHZpZXdEYXRhKTtcblxuICAvLyBPbiBmaXJzdCBwYXNzLCByZS1vcmdhbml6ZSBub2RlIHRyZWUgdG8gcHV0IHRoaXMgbm9kZSBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbi5cbiAgY29uc3QgZmlyc3RUZW1wbGF0ZVBhc3MgPSBub2RlLnZpZXdbVFZJRVddLmZpcnN0VGVtcGxhdGVQYXNzO1xuICBpZiAoZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICBpZiAocHJldmlvdXNOb2RlID09PSBwYXJlbnROb2RlICYmIG5vZGUudE5vZGUgIT09IHBhcmVudE5vZGUudE5vZGUuY2hpbGQpIHtcbiAgICAgIG5vZGUudE5vZGUubmV4dCA9IHBhcmVudE5vZGUudE5vZGUuY2hpbGQ7XG4gICAgICBwYXJlbnROb2RlLnROb2RlLmNoaWxkID0gbm9kZS50Tm9kZTtcbiAgICB9IGVsc2UgaWYgKHByZXZpb3VzTm9kZSAhPT0gcGFyZW50Tm9kZSAmJiBub2RlLnROb2RlICE9PSBwcmV2aW91c05vZGUudE5vZGUubmV4dCkge1xuICAgICAgbm9kZS50Tm9kZS5uZXh0ID0gcHJldmlvdXNOb2RlLnROb2RlLm5leHQ7XG4gICAgICBwcmV2aW91c05vZGUudE5vZGUubmV4dCA9IG5vZGUudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUudE5vZGUubmV4dCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudE5vZGUudmlldyA9PT0gbm9kZS52aWV3KSBub2RlLnROb2RlLnBhcmVudCA9IHBhcmVudE5vZGUudE5vZGUgYXMgVEVsZW1lbnROb2RlO1xuICB9XG5cbiAgLy8gVGVtcGxhdGUgY29udGFpbmVycyBhbHNvIGhhdmUgYSBjb21tZW50IG5vZGUgZm9yIHRoZSBgVmlld0NvbnRhaW5lclJlZmAgdGhhdCBzaG91bGQgYmUgbW92ZWRcbiAgaWYgKG5vZGUudE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLkNvbnRhaW5lciAmJiBub2RlLmR5bmFtaWNMQ29udGFpbmVyTm9kZSkge1xuICAgIGFwcGVuZENoaWxkKHBhcmVudE5vZGUsIG5vZGUuZHluYW1pY0xDb250YWluZXJOb2RlLm5hdGl2ZSB8fCBudWxsLCB2aWV3RGF0YSk7XG4gICAgaWYgKGZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgICBub2RlLnROb2RlLmR5bmFtaWNDb250YWluZXJOb2RlID0gbm9kZS5keW5hbWljTENvbnRhaW5lck5vZGUudE5vZGU7XG4gICAgICBub2RlLmR5bmFtaWNMQ29udGFpbmVyTm9kZS50Tm9kZS5wYXJlbnQgPSBub2RlLnROb2RlIGFzIFRDb250YWluZXJOb2RlO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZS5keW5hbWljTENvbnRhaW5lck5vZGU7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIGdlbmVyYXRlZCBieSBgaTE4bk1hcHBpbmcoKWAgdG8gdHJhbnNmb3JtIHRoZSB0ZW1wbGF0ZSBhY2NvcmRpbmdseS5cbiAqXG4gKiBAcGFyYW0gc3RhcnRJbmRleCBJbmRleCBvZiB0aGUgZmlyc3QgZWxlbWVudCB0byB0cmFuc2xhdGUgKGZvciBpbnN0YW5jZSB0aGUgZmlyc3QgY2hpbGQgb2YgdGhlXG4gKiBlbGVtZW50IHdpdGggdGhlIGkxOG4gYXR0cmlidXRlKS5cbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgVGhlIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRvIGFwcGx5IG9uIHRoZSBjdXJyZW50IHZpZXcuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuQXBwbHkoc3RhcnRJbmRleDogbnVtYmVyLCBpbnN0cnVjdGlvbnM6IEkxOG5JbnN0cnVjdGlvbltdKTogdm9pZCB7XG4gIGNvbnN0IHZpZXdEYXRhID0gX2dldFZpZXdEYXRhKCk7XG4gIGlmIChuZ0Rldk1vZGUpIHtcbiAgICBhc3NlcnRFcXVhbChcbiAgICAgICAgdmlld0RhdGFbQklORElOR19JTkRFWF0sIHZpZXdEYXRhW1RWSUVXXS5iaW5kaW5nU3RhcnRJbmRleCxcbiAgICAgICAgJ2kxOG5BcHBseSBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhbnkgYmluZGluZycpO1xuICB9XG5cbiAgaWYgKCFpbnN0cnVjdGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZW5kZXJlciA9IGdldFJlbmRlcmVyKCk7XG4gIGxldCBsb2NhbFBhcmVudE5vZGU6IExOb2RlID0gZ2V0UGFyZW50TE5vZGUobG9hZChzdGFydEluZGV4KSkgfHwgZ2V0UHJldmlvdXNPclBhcmVudE5vZGUoKTtcbiAgbGV0IGxvY2FsUHJldmlvdXNOb2RlOiBMTm9kZSA9IGxvY2FsUGFyZW50Tm9kZTtcbiAgcmVzZXRBcHBsaWNhdGlvblN0YXRlKCk7ICAvLyBXZSBkb24ndCB3YW50IHRvIGFkZCB0byB0aGUgdHJlZSB3aXRoIHRoZSB3cm9uZyBwcmV2aW91cyBub2RlXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgc3dpdGNoIChpbnN0cnVjdGlvbiAmIEkxOG5JbnN0cnVjdGlvbnMuSW5zdHJ1Y3Rpb25NYXNrKSB7XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuRWxlbWVudDpcbiAgICAgICAgY29uc3QgZWxlbWVudDogTE5vZGUgPSBsb2FkKGluc3RydWN0aW9uICYgSTE4bkluc3RydWN0aW9ucy5JbmRleE1hc2spO1xuICAgICAgICBsb2NhbFByZXZpb3VzTm9kZSA9IGFwcGVuZEkxOG5Ob2RlKGVsZW1lbnQsIGxvY2FsUGFyZW50Tm9kZSwgbG9jYWxQcmV2aW91c05vZGUpO1xuICAgICAgICBsb2NhbFBhcmVudE5vZGUgPSBlbGVtZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5FeHByZXNzaW9uOlxuICAgICAgY2FzZSBJMThuSW5zdHJ1Y3Rpb25zLlRlbXBsYXRlUm9vdDpcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5Bbnk6XG4gICAgICAgIGNvbnN0IG5vZGU6IExOb2RlID0gbG9hZChpbnN0cnVjdGlvbiAmIEkxOG5JbnN0cnVjdGlvbnMuSW5kZXhNYXNrKTtcbiAgICAgICAgbG9jYWxQcmV2aW91c05vZGUgPSBhcHBlbmRJMThuTm9kZShub2RlLCBsb2NhbFBhcmVudE5vZGUsIGxvY2FsUHJldmlvdXNOb2RlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuVGV4dDpcbiAgICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICAgIG5nRGV2TW9kZS5yZW5kZXJlckNyZWF0ZVRleHROb2RlKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBpbnN0cnVjdGlvbnNbKytpXTtcbiAgICAgICAgY29uc3QgdGV4dFJOb2RlID0gY3JlYXRlVGV4dE5vZGUodmFsdWUsIHJlbmRlcmVyKTtcbiAgICAgICAgLy8gSWYgd2Ugd2VyZSB0byBvbmx5IGNyZWF0ZSBhIGBSTm9kZWAgdGhlbiBwcm9qZWN0aW9ucyB3b24ndCBtb3ZlIHRoZSB0ZXh0LlxuICAgICAgICAvLyBDcmVhdGUgdGV4dCBub2RlIGF0IHRoZSBjdXJyZW50IGVuZCBvZiB2aWV3RGF0YS4gTXVzdCBzdWJ0cmFjdCBoZWFkZXIgb2Zmc2V0IGJlY2F1c2VcbiAgICAgICAgLy8gY3JlYXRlTE5vZGUgdGFrZXMgYSByYXcgaW5kZXggKG5vdCBhZGp1c3RlZCBieSBoZWFkZXIgb2Zmc2V0KS5cbiAgICAgICAgY29uc3QgdGV4dExOb2RlID1cbiAgICAgICAgICAgIGNyZWF0ZUxOb2RlKHZpZXdEYXRhLmxlbmd0aCAtIEhFQURFUl9PRkZTRVQsIFROb2RlVHlwZS5FbGVtZW50LCB0ZXh0Uk5vZGUsIG51bGwsIG51bGwpO1xuICAgICAgICBsb2NhbFByZXZpb3VzTm9kZSA9IGFwcGVuZEkxOG5Ob2RlKHRleHRMTm9kZSwgbG9jYWxQYXJlbnROb2RlLCBsb2NhbFByZXZpb3VzTm9kZSk7XG4gICAgICAgIHJlc2V0QXBwbGljYXRpb25TdGF0ZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5DbG9zZU5vZGU6XG4gICAgICAgIGxvY2FsUHJldmlvdXNOb2RlID0gbG9jYWxQYXJlbnROb2RlO1xuICAgICAgICBsb2NhbFBhcmVudE5vZGUgPSBnZXRQYXJlbnRMTm9kZShsb2NhbFBhcmVudE5vZGUpICE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBJMThuSW5zdHJ1Y3Rpb25zLlJlbW92ZU5vZGU6XG4gICAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgICBuZ0Rldk1vZGUucmVuZGVyZXJSZW1vdmVOb2RlKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaW5kZXggPSBpbnN0cnVjdGlvbiAmIEkxOG5JbnN0cnVjdGlvbnMuSW5kZXhNYXNrO1xuICAgICAgICBjb25zdCByZW1vdmVkTm9kZTogTE5vZGV8TENvbnRhaW5lck5vZGUgPSBsb2FkKGluZGV4KTtcbiAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudExOb2RlKHJlbW92ZWROb2RlKSAhO1xuICAgICAgICByZW1vdmVDaGlsZChwYXJlbnROb2RlLCByZW1vdmVkTm9kZS5uYXRpdmUgfHwgbnVsbCwgdmlld0RhdGEpO1xuXG4gICAgICAgIC8vIEZvciB0ZW1wbGF0ZSBjb250YWluZXJzIHdlIGFsc28gbmVlZCB0byByZW1vdmUgdGhlaXIgYFZpZXdDb250YWluZXJSZWZgIGZyb20gdGhlIERPTVxuICAgICAgICBpZiAocmVtb3ZlZE5vZGUudE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLkNvbnRhaW5lciAmJiByZW1vdmVkTm9kZS5keW5hbWljTENvbnRhaW5lck5vZGUpIHtcbiAgICAgICAgICByZW1vdmVDaGlsZChwYXJlbnROb2RlLCByZW1vdmVkTm9kZS5keW5hbWljTENvbnRhaW5lck5vZGUubmF0aXZlIHx8IG51bGwsIHZpZXdEYXRhKTtcbiAgICAgICAgICByZW1vdmVkTm9kZS5keW5hbWljTENvbnRhaW5lck5vZGUudE5vZGUuZGV0YWNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJlbW92ZWROb2RlLmR5bmFtaWNMQ29udGFpbmVyTm9kZS5kYXRhW1JFTkRFUl9QQVJFTlRdID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBUYWtlcyBhIHRyYW5zbGF0aW9uIHN0cmluZyBhbmQgdGhlIGluaXRpYWwgbGlzdCBvZiBleHByZXNzaW9ucyBhbmQgcmV0dXJucyBhIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zXG4gKiB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogRXZlbiBpbmRleGVzIGNvbnRhaW4gc3RhdGljIHN0cmluZ3MsIHdoaWxlIG9kZCBpbmRleGVzIGNvbnRhaW4gdGhlIGluZGV4IG9mIHRoZSBleHByZXNzaW9uIHdob3NlXG4gKiB2YWx1ZSB3aWxsIGJlIGNvbmNhdGVuYXRlZCBpbnRvIHRoZSBmaW5hbCB0cmFuc2xhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5FeHBNYXBwaW5nKFxuICAgIHRyYW5zbGF0aW9uOiBzdHJpbmcsIHBsYWNlaG9sZGVyczogUGxhY2Vob2xkZXJNYXApOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSB7XG4gIGNvbnN0IHN0YXRpY1RleHQ6IEkxOG5FeHBJbnN0cnVjdGlvbltdID0gdHJhbnNsYXRpb24uc3BsaXQoaTE4blRhZ1JlZ2V4KTtcbiAgLy8gb2RkIGluZGV4ZXMgYXJlIHBsYWNlaG9sZGVyc1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0YXRpY1RleHQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBzdGF0aWNUZXh0W2ldID0gcGxhY2Vob2xkZXJzW3N0YXRpY1RleHRbaV1dO1xuICB9XG4gIHJldHVybiBzdGF0aWNUZXh0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWUgb2YgYW4gZXhwcmVzc2lvbiBoYXMgY2hhbmdlZCBhbmQgcmVwbGFjZXMgaXQgYnkgaXRzIHZhbHVlIGluIGEgdHJhbnNsYXRpb24sXG4gKiBvciByZXR1cm5zIE5PX0NIQU5HRS5cbiAqXG4gKiBAcGFyYW0gaW5zdHJ1Y3Rpb25zIEEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNsYXRlIGFuIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB2MCB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbjEoaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSk6IHN0cmluZ3xOT19DSEFOR0Uge1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZChfZ2V0Vmlld0RhdGEoKVtCSU5ESU5HX0lOREVYXSsrLCB2MCk7XG5cbiAgaWYgKCFkaWZmZXJlbnQpIHtcbiAgICByZXR1cm4gTk9fQ0hBTkdFO1xuICB9XG5cbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBiaW5kaW5nc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlcyBvZiB1cCB0byAyIGV4cHJlc3Npb25zIGhhdmUgY2hhbmdlZCBhbmQgcmVwbGFjZXMgdGhlbSBieSB0aGVpciB2YWx1ZXMgaW4gYVxuICogdHJhbnNsYXRpb24sIG9yIHJldHVybnMgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgQSBsaXN0IG9mIGluc3RydWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHYwIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbjIoaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSwgdjE6IGFueSk6IHN0cmluZ3xcbiAgICBOT19DSEFOR0Uge1xuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDIodmlld0RhdGFbQklORElOR19JTkRFWF0sIHYwLCB2MSk7XG4gIHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICs9IDI7XG5cbiAgaWYgKCFkaWZmZXJlbnQpIHtcbiAgICByZXR1cm4gTk9fQ0hBTkdFO1xuICB9XG5cbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBiaW5kaW5nc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgLy8gRXh0cmFjdCBiaXRzXG4gICAgICBjb25zdCBpZHggPSBpbnN0cnVjdGlvbnNbaV0gYXMgbnVtYmVyO1xuICAgICAgY29uc3QgYjEgPSBpZHggJiAxO1xuICAgICAgLy8gR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBhcmd1bWVudCB2eCB3aGVyZSB4ID0gaWR4XG4gICAgICBjb25zdCB2YWx1ZSA9IGIxID8gdjEgOiB2MDtcblxuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlcyBvZiB1cCB0byAzIGV4cHJlc3Npb25zIGhhdmUgY2hhbmdlZCBhbmQgcmVwbGFjZXMgdGhlbSBieSB0aGVpciB2YWx1ZXMgaW4gYVxuICogdHJhbnNsYXRpb24sIG9yIHJldHVybnMgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgQSBsaXN0IG9mIGluc3RydWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHYwIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjIgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICpcbiAqIEByZXR1cm5zIFRoZSBjb25jYXRlbmF0ZWQgc3RyaW5nIHdoZW4gYW55IG9mIHRoZSBhcmd1bWVudHMgY2hhbmdlcywgYE5PX0NIQU5HRWAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bkludGVycG9sYXRpb24zKFxuICAgIGluc3RydWN0aW9uczogSTE4bkV4cEluc3RydWN0aW9uW10sIHYwOiBhbnksIHYxOiBhbnksIHYyOiBhbnkpOiBzdHJpbmd8Tk9fQ0hBTkdFIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgY29uc3QgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQzKHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdLCB2MCwgdjEsIHYyKTtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gMztcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiMiA9IGlkeCAmIDI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID0gYjIgPyB2MiA6IChiMSA/IHYxIDogdjApO1xuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDQgZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MiB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjMgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICpcbiAqIEByZXR1cm5zIFRoZSBjb25jYXRlbmF0ZWQgc3RyaW5nIHdoZW4gYW55IG9mIHRoZSBhcmd1bWVudHMgY2hhbmdlcywgYE5PX0NIQU5HRWAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bkludGVycG9sYXRpb240KFxuICAgIGluc3RydWN0aW9uczogSTE4bkV4cEluc3RydWN0aW9uW10sIHYwOiBhbnksIHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnkpOiBzdHJpbmd8Tk9fQ0hBTkdFIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgY29uc3QgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQ0KHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdLCB2MCwgdjEsIHYyLCB2Myk7XG4gIHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICs9IDQ7XG5cbiAgaWYgKCFkaWZmZXJlbnQpIHtcbiAgICByZXR1cm4gTk9fQ0hBTkdFO1xuICB9XG5cbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBiaW5kaW5nc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgLy8gRXh0cmFjdCBiaXRzXG4gICAgICBjb25zdCBpZHggPSBpbnN0cnVjdGlvbnNbaV0gYXMgbnVtYmVyO1xuICAgICAgY29uc3QgYjIgPSBpZHggJiAyO1xuICAgICAgY29uc3QgYjEgPSBpZHggJiAxO1xuICAgICAgLy8gR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBhcmd1bWVudCB2eCB3aGVyZSB4ID0gaWR4XG4gICAgICBjb25zdCB2YWx1ZSA9IGIyID8gKGIxID8gdjMgOiB2MikgOiAoYjEgPyB2MSA6IHYwKTtcblxuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlcyBvZiB1cCB0byA1IGV4cHJlc3Npb25zIGhhdmUgY2hhbmdlZCBhbmQgcmVwbGFjZXMgdGhlbSBieSB0aGVpciB2YWx1ZXMgaW4gYVxuICogdHJhbnNsYXRpb24sIG9yIHJldHVybnMgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgQSBsaXN0IG9mIGluc3RydWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHYwIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjIgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYzIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NCB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbjUoXG4gICAgaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSk6IHN0cmluZ3xcbiAgICBOT19DSEFOR0Uge1xuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuICBsZXQgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQ0KHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdLCB2MCwgdjEsIHYyLCB2Myk7XG4gIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICsgNCwgdjQpIHx8IGRpZmZlcmVudDtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gNTtcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiNCA9IGlkeCAmIDQ7XG4gICAgICBjb25zdCBiMiA9IGlkeCAmIDI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID0gYjQgPyB2NCA6IChiMiA/IChiMSA/IHYzIDogdjIpIDogKGIxID8gdjEgOiB2MCkpO1xuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDYgZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MiB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjMgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY0IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi8gZXhwb3J0IGZ1bmN0aW9uXG5pMThuSW50ZXJwb2xhdGlvbjYoXG4gICAgaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSwgdjU6IGFueSk6XG4gICAgc3RyaW5nfE5PX0NIQU5HRSB7XG4gIGNvbnN0IHZpZXdEYXRhID0gX2dldFZpZXdEYXRhKCk7XG4gIGxldCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQodmlld0RhdGFbQklORElOR19JTkRFWF0sIHYwLCB2MSwgdjIsIHYzKTtcbiAgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQyKHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICsgNCwgdjQsIHY1KSB8fCBkaWZmZXJlbnQ7XG4gIHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICs9IDY7XG5cbiAgaWYgKCFkaWZmZXJlbnQpIHtcbiAgICByZXR1cm4gTk9fQ0hBTkdFO1xuICB9XG5cbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBiaW5kaW5nc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgLy8gRXh0cmFjdCBiaXRzXG4gICAgICBjb25zdCBpZHggPSBpbnN0cnVjdGlvbnNbaV0gYXMgbnVtYmVyO1xuICAgICAgY29uc3QgYjQgPSBpZHggJiA0O1xuICAgICAgY29uc3QgYjIgPSBpZHggJiAyO1xuICAgICAgY29uc3QgYjEgPSBpZHggJiAxO1xuICAgICAgLy8gR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBhcmd1bWVudCB2eCB3aGVyZSB4ID0gaWR4XG4gICAgICBjb25zdCB2YWx1ZSA9IGI0ID8gKGIxID8gdjUgOiB2NCkgOiAoYjIgPyAoYjEgPyB2MyA6IHYyKSA6IChiMSA/IHYxIDogdjApKTtcblxuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlcyBvZiB1cCB0byA3IGV4cHJlc3Npb25zIGhhdmUgY2hhbmdlZCBhbmQgcmVwbGFjZXMgdGhlbSBieSB0aGVpciB2YWx1ZXMgaW4gYVxuICogdHJhbnNsYXRpb24sIG9yIHJldHVybnMgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgQSBsaXN0IG9mIGluc3RydWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHYwIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjIgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYzIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NCB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjUgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY2IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5JbnRlcnBvbGF0aW9uNyhcbiAgICBpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LFxuICAgIHY2OiBhbnkpOiBzdHJpbmd8Tk9fQ0hBTkdFIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgbGV0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNCh2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSwgdjAsIHYxLCB2MiwgdjMpO1xuICBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDModmlld0RhdGFbQklORElOR19JTkRFWF0gKyA0LCB2NCwgdjUsIHY2KSB8fCBkaWZmZXJlbnQ7XG4gIHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICs9IDc7XG5cbiAgaWYgKCFkaWZmZXJlbnQpIHtcbiAgICByZXR1cm4gTk9fQ0hBTkdFO1xuICB9XG5cbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBiaW5kaW5nc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgLy8gRXh0cmFjdCBiaXRzXG4gICAgICBjb25zdCBpZHggPSBpbnN0cnVjdGlvbnNbaV0gYXMgbnVtYmVyO1xuICAgICAgY29uc3QgYjQgPSBpZHggJiA0O1xuICAgICAgY29uc3QgYjIgPSBpZHggJiAyO1xuICAgICAgY29uc3QgYjEgPSBpZHggJiAxO1xuICAgICAgLy8gR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBhcmd1bWVudCB2eCB3aGVyZSB4ID0gaWR4XG4gICAgICBjb25zdCB2YWx1ZSA9IGI0ID8gKGIyID8gdjYgOiAoYjEgPyB2NSA6IHY0KSkgOiAoYjIgPyAoYjEgPyB2MyA6IHYyKSA6IChiMSA/IHYxIDogdjApKTtcblxuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHZhbHVlcyBvZiB1cCB0byA4IGV4cHJlc3Npb25zIGhhdmUgY2hhbmdlZCBhbmQgcmVwbGFjZXMgdGhlbSBieSB0aGVpciB2YWx1ZXMgaW4gYVxuICogdHJhbnNsYXRpb24sIG9yIHJldHVybnMgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgQSBsaXN0IG9mIGluc3RydWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHYwIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjIgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYzIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NCB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjUgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY2IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NyB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbjgoXG4gICAgaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSwgdjU6IGFueSxcbiAgICB2NjogYW55LCB2NzogYW55KTogc3RyaW5nfE5PX0NIQU5HRSB7XG4gIGNvbnN0IHZpZXdEYXRhID0gX2dldFZpZXdEYXRhKCk7XG4gIGxldCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQodmlld0RhdGFbQklORElOR19JTkRFWF0sIHYwLCB2MSwgdjIsIHYzKTtcbiAgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQ0KHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdICsgNCwgdjQsIHY1LCB2NiwgdjcpIHx8IGRpZmZlcmVudDtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gODtcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiNCA9IGlkeCAmIDQ7XG4gICAgICBjb25zdCBiMiA9IGlkeCAmIDI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID1cbiAgICAgICAgICBiNCA/IChiMiA/IChiMSA/IHY3IDogdjYpIDogKGIxID8gdjUgOiB2NCkpIDogKGIyID8gKGIxID8gdjMgOiB2MikgOiAoYjEgPyB2MSA6IHYwKSk7XG5cbiAgICAgIHJlcyArPSBzdHJpbmdpZnkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgKz0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgdHJhbnNsYXRlZCBpbnRlcnBvbGF0aW9uIGJpbmRpbmcgd2l0aCBhIHZhcmlhYmxlIG51bWJlciBvZiBleHByZXNzaW9ucy5cbiAqXG4gKiBJZiB0aGVyZSBhcmUgMSB0byA4IGV4cHJlc3Npb25zIHRoZW4gYGkxOG5JbnRlcnBvbGF0aW9uKClgIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuIEl0IGlzIGZhc3RlclxuICogYmVjYXVzZSB0aGVyZSBpcyBubyBuZWVkIHRvIGNyZWF0ZSBhbiBhcnJheSBvZiBleHByZXNzaW9ucyBhbmQgaXRlcmF0ZSBvdmVyIGl0LlxuICpcbiAqIEByZXR1cm5zIFRoZSBjb25jYXRlbmF0ZWQgc3RyaW5nIHdoZW4gYW55IG9mIHRoZSBhcmd1bWVudHMgY2hhbmdlcywgYE5PX0NIQU5HRWAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bkludGVycG9sYXRpb25WKGluc3RydWN0aW9uczogSTE4bkV4cEluc3RydWN0aW9uW10sIHZhbHVlczogYW55W10pOiBzdHJpbmd8XG4gICAgTk9fQ0hBTkdFIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgbGV0IGRpZmZlcmVudCA9IGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIENoZWNrIGlmIGJpbmRpbmdzIGhhdmUgY2hhbmdlZFxuICAgIGJpbmRpbmdVcGRhdGVkKHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdKyssIHZhbHVlc1tpXSkgJiYgKGRpZmZlcmVudCA9IHRydWUpO1xuICB9XG5cbiAgaWYgKCFkaWZmZXJlbnQpIHtcbiAgICByZXR1cm4gTk9fQ0hBTkdFO1xuICB9XG5cbiAgbGV0IHJlcyA9ICcnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBwbGFjZWhvbGRlcnNcbiAgICBpZiAoaSAmIDEpIHtcbiAgICAgIHJlcyArPSBzdHJpbmdpZnkodmFsdWVzW2luc3RydWN0aW9uc1tpXSBhcyBudW1iZXJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuIl19