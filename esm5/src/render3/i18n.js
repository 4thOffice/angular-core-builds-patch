/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NO_CHANGE } from '../../src/render3/tokens';
import { assertEqual, assertLessThan } from './assert';
import { _getViewData, adjustBlueprintForNewNode, bindingUpdated, bindingUpdated2, bindingUpdated3, bindingUpdated4, createNodeAtIndex, getRenderer, load, resetComponentState } from './instructions';
import { NATIVE, RENDER_PARENT } from './interfaces/container';
import { BINDING_INDEX, HEADER_OFFSET, HOST_NODE, TVIEW } from './interfaces/view';
import { appendChild, createTextNode, removeChild } from './node_manipulation';
import { getNativeByIndex, getNativeByTNode, getTNode, isLContainer, stringify } from './util';
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
function appendI18nNode(tNode, parentTNode, previousTNode) {
    if (ngDevMode) {
        ngDevMode.rendererMoveNode++;
    }
    var viewData = _getViewData();
    // On first pass, re-organize node tree to put this node in the correct position.
    var firstTemplatePass = viewData[TVIEW].firstTemplatePass;
    if (firstTemplatePass) {
        if (previousTNode === parentTNode && tNode !== parentTNode.child) {
            tNode.next = parentTNode.child;
            parentTNode.child = tNode;
        }
        else if (previousTNode !== parentTNode && tNode !== previousTNode.next) {
            tNode.next = previousTNode.next;
            previousTNode.next = tNode;
        }
        else {
            tNode.next = null;
        }
        if (parentTNode !== viewData[HOST_NODE]) {
            tNode.parent = parentTNode;
        }
    }
    appendChild(getNativeByTNode(tNode, viewData), tNode, viewData);
    var slotValue = viewData[tNode.index];
    if (tNode.type !== 0 /* Container */ && isLContainer(slotValue)) {
        // Nodes that inject ViewContainerRef also have a comment node that should be moved
        appendChild(slotValue[NATIVE], tNode, viewData);
    }
    return tNode;
}
export function i18nAttribute(index, attrs) {
    // placeholder for i18nAttribute function
}
export function i18nExp(expression) {
    // placeholder for i18nExp function
}
export function i18nStart(index, message, subTemplateIndex) {
    if (subTemplateIndex === void 0) { subTemplateIndex = 0; }
    // placeholder for i18nExp function
}
export function i18nEnd() {
    // placeholder for i18nEnd function
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
    var startTNode = getTNode(startIndex, viewData);
    var localParentTNode = startTNode.parent || viewData[HOST_NODE];
    var localPreviousTNode = localParentTNode;
    resetComponentState(); // We don't want to add to the tree with the wrong previous node
    for (var i = 0; i < instructions.length; i++) {
        var instruction = instructions[i];
        switch (instruction & -536870912 /* InstructionMask */) {
            case 1073741824 /* Element */:
                var elementTNode = getTNode(instruction & 536870911 /* IndexMask */, viewData);
                localPreviousTNode = appendI18nNode(elementTNode, localParentTNode, localPreviousTNode);
                localParentTNode = elementTNode;
                break;
            case 1610612736 /* Expression */:
            case -2147483648 /* TemplateRoot */:
            case -1610612736 /* Any */:
                var nodeIndex = instruction & 536870911 /* IndexMask */;
                localPreviousTNode =
                    appendI18nNode(getTNode(nodeIndex, viewData), localParentTNode, localPreviousTNode);
                break;
            case 536870912 /* Text */:
                if (ngDevMode) {
                    ngDevMode.rendererCreateTextNode++;
                }
                var value = instructions[++i];
                var textRNode = createTextNode(value, renderer);
                // If we were to only create a `RNode` then projections won't move the text.
                // Create text node at the current end of viewData. Must subtract header offset because
                // createNodeAtIndex takes a raw index (not adjusted by header offset).
                adjustBlueprintForNewNode(viewData);
                var textTNode = createNodeAtIndex(viewData.length - 1 - HEADER_OFFSET, 3 /* Element */, textRNode, null, null);
                localPreviousTNode = appendI18nNode(textTNode, localParentTNode, localPreviousTNode);
                resetComponentState();
                break;
            case -1073741824 /* CloseNode */:
                localPreviousTNode = localParentTNode;
                localParentTNode = localParentTNode.parent || viewData[HOST_NODE];
                break;
            case -536870912 /* RemoveNode */:
                if (ngDevMode) {
                    ngDevMode.rendererRemoveNode++;
                }
                var removeIndex = instruction & 536870911 /* IndexMask */;
                var removedElement = getNativeByIndex(removeIndex, viewData);
                var removedTNode = getTNode(removeIndex, viewData);
                removeChild(removedTNode, removedElement || null, viewData);
                var slotValue = load(removeIndex);
                if (isLContainer(slotValue)) {
                    var lContainer = slotValue;
                    if (removedTNode.type !== 0 /* Container */) {
                        removeChild(removedTNode, lContainer[NATIVE] || null, viewData);
                    }
                    removedTNode.detached = true;
                    lContainer[RENDER_PARENT] = null;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JNLE9BQU8sRUFBYSxNQUFNLEVBQUUsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFJekUsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQXNDN0YsSUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBRXBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQ3ZCLFdBQW1CLEVBQUUsUUFBMEMsRUFDL0QsV0FBOEMsRUFBRSxhQUErQixFQUMvRSxjQUE4QjtJQUNoQyxJQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekQsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLENB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SUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFDLENBQUM7U0FDckQ7YUFBTTtZQUNMLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEI7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOT19DSEFOR0V9IGZyb20gJy4uLy4uL3NyYy9yZW5kZXIzL3Rva2Vucyc7XG5cbmltcG9ydCB7YXNzZXJ0RXF1YWwsIGFzc2VydExlc3NUaGFufSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge19nZXRWaWV3RGF0YSwgYWRqdXN0Qmx1ZXByaW50Rm9yTmV3Tm9kZSwgYmluZGluZ1VwZGF0ZWQsIGJpbmRpbmdVcGRhdGVkMiwgYmluZGluZ1VwZGF0ZWQzLCBiaW5kaW5nVXBkYXRlZDQsIGNyZWF0ZU5vZGVBdEluZGV4LCBnZXRSZW5kZXJlciwgbG9hZCwgcmVzZXRDb21wb25lbnRTdGF0ZX0gZnJvbSAnLi9pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHtMQ29udGFpbmVyLCBOQVRJVkUsIFJFTkRFUl9QQVJFTlR9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtURWxlbWVudE5vZGUsIFROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UkNvbW1lbnQsIFJFbGVtZW50fSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtTdHlsaW5nQ29udGV4dH0gZnJvbSAnLi9pbnRlcmZhY2VzL3N0eWxpbmcnO1xuaW1wb3J0IHtCSU5ESU5HX0lOREVYLCBIRUFERVJfT0ZGU0VULCBIT1NUX05PREUsIFRWSUVXfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2FwcGVuZENoaWxkLCBjcmVhdGVUZXh0Tm9kZSwgcmVtb3ZlQ2hpbGR9IGZyb20gJy4vbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtnZXROYXRpdmVCeUluZGV4LCBnZXROYXRpdmVCeVROb2RlLCBnZXRUTm9kZSwgaXNMQ29udGFpbmVyLCBzdHJpbmdpZnl9IGZyb20gJy4vdXRpbCc7XG5cblxuXG4vKipcbiAqIEEgbGlzdCBvZiBmbGFncyB0byBlbmNvZGUgdGhlIGkxOG4gaW5zdHJ1Y3Rpb25zIHVzZWQgdG8gdHJhbnNsYXRlIHRoZSB0ZW1wbGF0ZS5cbiAqIFdlIHNoaWZ0IHRoZSBmbGFncyBieSAyOSBzbyB0aGF0IDMwICYgMzEgJiAzMiBiaXRzIGNvbnRhaW5zIHRoZSBpbnN0cnVjdGlvbnMuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEkxOG5JbnN0cnVjdGlvbnMge1xuICBUZXh0ID0gMSA8PCAyOSxcbiAgRWxlbWVudCA9IDIgPDwgMjksXG4gIEV4cHJlc3Npb24gPSAzIDw8IDI5LFxuICBUZW1wbGF0ZVJvb3QgPSA0IDw8IDI5LFxuICBBbnkgPSA1IDw8IDI5LFxuICBDbG9zZU5vZGUgPSA2IDw8IDI5LFxuICBSZW1vdmVOb2RlID0gNyA8PCAyOSxcbiAgLyoqIFVzZWQgdG8gZGVjb2RlIHRoZSBudW1iZXIgZW5jb2RlZCB3aXRoIHRoZSBpbnN0cnVjdGlvbi4gKi9cbiAgSW5kZXhNYXNrID0gKDEgPDwgMjkpIC0gMSxcbiAgLyoqIFVzZWQgdG8gdGVzdCB0aGUgdHlwZSBvZiBpbnN0cnVjdGlvbi4gKi9cbiAgSW5zdHJ1Y3Rpb25NYXNrID0gfigoMSA8PCAyOSkgLSAxKSxcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBpbnN0cnVjdGlvbnMgdXNlZCB0byB0cmFuc2xhdGUgdGhlIHRlbXBsYXRlLlxuICogSW5zdHJ1Y3Rpb25zIGNhbiBiZSBhIHBsYWNlaG9sZGVyIGluZGV4LCBhIHN0YXRpYyB0ZXh0IG9yIGEgc2ltcGxlIGJpdCBmaWVsZCAoYEkxOG5GbGFnYCkuXG4gKiBXaGVuIHRoZSBpbnN0cnVjdGlvbiBpcyB0aGUgZmxhZyBgVGV4dGAsIGl0IGlzIGFsd2F5cyBmb2xsb3dlZCBieSBpdHMgdGV4dCB2YWx1ZS5cbiAqL1xuZXhwb3J0IHR5cGUgSTE4bkluc3RydWN0aW9uID0gbnVtYmVyIHwgc3RyaW5nO1xuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBpbnN0cnVjdGlvbnMgdXNlZCB0byB0cmFuc2xhdGUgYXR0cmlidXRlcyBjb250YWluaW5nIGV4cHJlc3Npb25zLlxuICogRXZlbiBpbmRleGVzIGNvbnRhaW4gc3RhdGljIHN0cmluZ3MsIHdoaWxlIG9kZCBpbmRleGVzIGNvbnRhaW4gdGhlIGluZGV4IG9mIHRoZSBleHByZXNzaW9uIHdob3NlXG4gKiB2YWx1ZSB3aWxsIGJlIGNvbmNhdGVuYXRlZCBpbnRvIHRoZSBmaW5hbCB0cmFuc2xhdGlvbi5cbiAqL1xuZXhwb3J0IHR5cGUgSTE4bkV4cEluc3RydWN0aW9uID0gbnVtYmVyIHwgc3RyaW5nO1xuLyoqIE1hcHBpbmcgb2YgcGxhY2Vob2xkZXIgbmFtZXMgdG8gdGhlaXIgYWJzb2x1dGUgaW5kZXhlcyBpbiB0aGVpciB0ZW1wbGF0ZXMuICovXG5leHBvcnQgdHlwZSBQbGFjZWhvbGRlck1hcCA9IHtcbiAgW25hbWU6IHN0cmluZ106IG51bWJlclxufTtcbmNvbnN0IGkxOG5UYWdSZWdleCA9IC97XFwkKFtefV0rKX0vZztcblxuLyoqXG4gKiBUYWtlcyBhIHRyYW5zbGF0aW9uIHN0cmluZywgdGhlIGluaXRpYWwgbGlzdCBvZiBwbGFjZWhvbGRlcnMgKGVsZW1lbnRzIGFuZCBleHByZXNzaW9ucykgYW5kIHRoZVxuICogaW5kZXhlcyBvZiB0aGVpciBjb3JyZXNwb25kaW5nIGV4cHJlc3Npb24gbm9kZXMgdG8gcmV0dXJuIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgZm9yIGVhY2hcbiAqIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICpcbiAqIEJlY2F1c2UgZW1iZWRkZWQgdGVtcGxhdGVzIGhhdmUgZGlmZmVyZW50IGluZGV4ZXMgZm9yIGVhY2ggcGxhY2Vob2xkZXIsIGVhY2ggcGFyYW1ldGVyIChleGNlcHRcbiAqIHRoZSB0cmFuc2xhdGlvbikgaXMgYW4gYXJyYXksIHdoZXJlIGVhY2ggdmFsdWUgY29ycmVzcG9uZHMgdG8gYSBkaWZmZXJlbnQgdGVtcGxhdGUsIGJ5IG9yZGVyIG9mXG4gKiBhcHBlYXJhbmNlLlxuICpcbiAqIEBwYXJhbSB0cmFuc2xhdGlvbiBBIHRyYW5zbGF0aW9uIHN0cmluZyB3aGVyZSBwbGFjZWhvbGRlcnMgYXJlIHJlcHJlc2VudGVkIGJ5IGB7JG5hbWV9YFxuICogQHBhcmFtIGVsZW1lbnRzIEFuIGFycmF5IGNvbnRhaW5pbmcsIGZvciBlYWNoIHRlbXBsYXRlLCB0aGUgbWFwcyBvZiBlbGVtZW50IHBsYWNlaG9sZGVycyBhbmRcbiAqIHRoZWlyIGluZGV4ZXMuXG4gKiBAcGFyYW0gZXhwcmVzc2lvbnMgQW4gYXJyYXkgY29udGFpbmluZywgZm9yIGVhY2ggdGVtcGxhdGUsIHRoZSBtYXBzIG9mIGV4cHJlc3Npb24gcGxhY2Vob2xkZXJzXG4gKiBhbmQgdGhlaXIgaW5kZXhlcy5cbiAqIEBwYXJhbSB0ZW1wbGF0ZVJvb3RzIEFuIGFycmF5IG9mIHRlbXBsYXRlIHJvb3RzIHdob3NlIGNvbnRlbnQgc2hvdWxkIGJlIGlnbm9yZWQgd2hlblxuICogZ2VuZXJhdGluZyB0aGUgaW5zdHJ1Y3Rpb25zIGZvciB0aGVpciBwYXJlbnQgdGVtcGxhdGUuXG4gKiBAcGFyYW0gbGFzdENoaWxkSW5kZXggVGhlIGluZGV4IG9mIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBpMThuIG5vZGUuIFVzZWQgd2hlbiB0aGUgaTE4biBibG9jayBpc1xuICogYW4gbmctY29udGFpbmVyLlxuICpcbiAqIEByZXR1cm5zIEEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdXNlZCB0byB0cmFuc2xhdGUgZWFjaCB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5NYXBwaW5nKFxuICAgIHRyYW5zbGF0aW9uOiBzdHJpbmcsIGVsZW1lbnRzOiAoUGxhY2Vob2xkZXJNYXAgfCBudWxsKVtdIHwgbnVsbCxcbiAgICBleHByZXNzaW9ucz86IChQbGFjZWhvbGRlck1hcCB8IG51bGwpW10gfCBudWxsLCB0ZW1wbGF0ZVJvb3RzPzogc3RyaW5nW10gfCBudWxsLFxuICAgIGxhc3RDaGlsZEluZGV4PzogbnVtYmVyIHwgbnVsbCk6IEkxOG5JbnN0cnVjdGlvbltdW10ge1xuICBjb25zdCB0cmFuc2xhdGlvblBhcnRzID0gdHJhbnNsYXRpb24uc3BsaXQoaTE4blRhZ1JlZ2V4KTtcbiAgY29uc3QgbmJUZW1wbGF0ZXMgPSB0ZW1wbGF0ZVJvb3RzID8gdGVtcGxhdGVSb290cy5sZW5ndGggKyAxIDogMTtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBJMThuSW5zdHJ1Y3Rpb25bXVtdID0gKG5ldyBBcnJheShuYlRlbXBsYXRlcykpLmZpbGwodW5kZWZpbmVkKTtcblxuICBnZW5lcmF0ZU1hcHBpbmdJbnN0cnVjdGlvbnMoXG4gICAgICAwLCAwLCB0cmFuc2xhdGlvblBhcnRzLCBpbnN0cnVjdGlvbnMsIGVsZW1lbnRzLCBleHByZXNzaW9ucywgdGVtcGxhdGVSb290cywgbGFzdENoaWxkSW5kZXgpO1xuXG4gIHJldHVybiBpbnN0cnVjdGlvbnM7XG59XG5cbi8qKlxuICogSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZWFkcyB0aGUgdHJhbnNsYXRpb24gcGFydHMgYW5kIGdlbmVyYXRlcyBhIHNldCBvZiBpbnN0cnVjdGlvbnMgZm9yIGVhY2hcbiAqIHRlbXBsYXRlLlxuICpcbiAqIFNlZSBgaTE4bk1hcHBpbmcoKWAgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcGFyYW0gdG1wbEluZGV4IFRoZSBvcmRlciBvZiBhcHBlYXJhbmNlIG9mIHRoZSB0ZW1wbGF0ZS5cbiAqIDAgZm9yIHRoZSByb290IHRlbXBsYXRlLCBmb2xsb3dpbmcgaW5kZXhlcyBtYXRjaCB0aGUgb3JkZXIgaW4gYHRlbXBsYXRlUm9vdHNgLlxuICogQHBhcmFtIHBhcnRJbmRleCBUaGUgY3VycmVudCBpbmRleCBpbiBgdHJhbnNsYXRpb25QYXJ0c2AuXG4gKiBAcGFyYW0gdHJhbnNsYXRpb25QYXJ0cyBUaGUgdHJhbnNsYXRpb24gc3RyaW5nIHNwbGl0IGludG8gYW4gYXJyYXkgb2YgcGxhY2Vob2xkZXJzIGFuZCB0ZXh0XG4gKiBlbGVtZW50cy5cbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgVGhlIGN1cnJlbnQgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdG8gdXBkYXRlLlxuICogQHBhcmFtIGVsZW1lbnRzIEFuIGFycmF5IGNvbnRhaW5pbmcsIGZvciBlYWNoIHRlbXBsYXRlLCB0aGUgbWFwcyBvZiBlbGVtZW50IHBsYWNlaG9sZGVycyBhbmRcbiAqIHRoZWlyIGluZGV4ZXMuXG4gKiBAcGFyYW0gZXhwcmVzc2lvbnMgQW4gYXJyYXkgY29udGFpbmluZywgZm9yIGVhY2ggdGVtcGxhdGUsIHRoZSBtYXBzIG9mIGV4cHJlc3Npb24gcGxhY2Vob2xkZXJzXG4gKiBhbmQgdGhlaXIgaW5kZXhlcy5cbiAqIEBwYXJhbSB0ZW1wbGF0ZVJvb3RzIEFuIGFycmF5IG9mIHRlbXBsYXRlIHJvb3RzIHdob3NlIGNvbnRlbnQgc2hvdWxkIGJlIGlnbm9yZWQgd2hlblxuICogZ2VuZXJhdGluZyB0aGUgaW5zdHJ1Y3Rpb25zIGZvciB0aGVpciBwYXJlbnQgdGVtcGxhdGUuXG4gKiBAcGFyYW0gbGFzdENoaWxkSW5kZXggVGhlIGluZGV4IG9mIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBpMThuIG5vZGUuIFVzZWQgd2hlbiB0aGUgaTE4biBibG9jayBpc1xuICogYW4gbmctY29udGFpbmVyLlxuICpcbiAqIEByZXR1cm5zIHRoZSBjdXJyZW50IGluZGV4IGluIGB0cmFuc2xhdGlvblBhcnRzYFxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZU1hcHBpbmdJbnN0cnVjdGlvbnMoXG4gICAgdG1wbEluZGV4OiBudW1iZXIsIHBhcnRJbmRleDogbnVtYmVyLCB0cmFuc2xhdGlvblBhcnRzOiBzdHJpbmdbXSxcbiAgICBpbnN0cnVjdGlvbnM6IEkxOG5JbnN0cnVjdGlvbltdW10sIGVsZW1lbnRzOiAoUGxhY2Vob2xkZXJNYXAgfCBudWxsKVtdIHwgbnVsbCxcbiAgICBleHByZXNzaW9ucz86IChQbGFjZWhvbGRlck1hcCB8IG51bGwpW10gfCBudWxsLCB0ZW1wbGF0ZVJvb3RzPzogc3RyaW5nW10gfCBudWxsLFxuICAgIGxhc3RDaGlsZEluZGV4PzogbnVtYmVyIHwgbnVsbCk6IG51bWJlciB7XG4gIGNvbnN0IHRtcGxJbnN0cnVjdGlvbnM6IEkxOG5JbnN0cnVjdGlvbltdID0gW107XG4gIGNvbnN0IHBoVmlzaXRlZDogc3RyaW5nW10gPSBbXTtcbiAgbGV0IG9wZW5lZFRhZ0NvdW50ID0gMDtcbiAgbGV0IG1heEluZGV4ID0gMDtcbiAgbGV0IGN1cnJlbnRFbGVtZW50czogUGxhY2Vob2xkZXJNYXB8bnVsbCA9XG4gICAgICBlbGVtZW50cyAmJiBlbGVtZW50c1t0bXBsSW5kZXhdID8gZWxlbWVudHNbdG1wbEluZGV4XSA6IG51bGw7XG4gIGxldCBjdXJyZW50RXhwcmVzc2lvbnM6IFBsYWNlaG9sZGVyTWFwfG51bGwgPVxuICAgICAgZXhwcmVzc2lvbnMgJiYgZXhwcmVzc2lvbnNbdG1wbEluZGV4XSA/IGV4cHJlc3Npb25zW3RtcGxJbmRleF0gOiBudWxsO1xuXG4gIGluc3RydWN0aW9uc1t0bXBsSW5kZXhdID0gdG1wbEluc3RydWN0aW9ucztcblxuICBmb3IgKDsgcGFydEluZGV4IDwgdHJhbnNsYXRpb25QYXJ0cy5sZW5ndGg7IHBhcnRJbmRleCsrKSB7XG4gICAgLy8gVGhlIHZhbHVlIGNhbiBlaXRoZXIgYmUgdGV4dCBvciB0aGUgbmFtZSBvZiBhIHBsYWNlaG9sZGVyIChlbGVtZW50L3RlbXBsYXRlIHJvb3QvZXhwcmVzc2lvbilcbiAgICBjb25zdCB2YWx1ZSA9IHRyYW5zbGF0aW9uUGFydHNbcGFydEluZGV4XTtcblxuICAgIC8vIE9kZCBpbmRleGVzIGFyZSBwbGFjZWhvbGRlcnNcbiAgICBpZiAocGFydEluZGV4ICYgMSkge1xuICAgICAgbGV0IHBoSW5kZXg7XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnRzICYmIGN1cnJlbnRFbGVtZW50c1t2YWx1ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwaEluZGV4ID0gY3VycmVudEVsZW1lbnRzW3ZhbHVlXTtcbiAgICAgICAgLy8gVGhlIHBsYWNlaG9sZGVyIHJlcHJlc2VudHMgYSBET00gZWxlbWVudCwgYWRkIGFuIGluc3RydWN0aW9uIHRvIG1vdmUgaXRcbiAgICAgICAgbGV0IHRlbXBsYXRlUm9vdEluZGV4ID0gdGVtcGxhdGVSb290cyA/IHRlbXBsYXRlUm9vdHMuaW5kZXhPZih2YWx1ZSkgOiAtMTtcbiAgICAgICAgaWYgKHRlbXBsYXRlUm9vdEluZGV4ICE9PSAtMSAmJiAodGVtcGxhdGVSb290SW5kZXggKyAxKSAhPT0gdG1wbEluZGV4KSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBhIHRlbXBsYXRlIHJvb3QsIGl0IGhhcyBubyBjbG9zaW5nIHRhZywgbm90IHRyZWF0aW5nIGl0IGFzIGFuIGVsZW1lbnRcbiAgICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2gocGhJbmRleCB8IEkxOG5JbnN0cnVjdGlvbnMuVGVtcGxhdGVSb290KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2gocGhJbmRleCB8IEkxOG5JbnN0cnVjdGlvbnMuRWxlbWVudCk7XG4gICAgICAgICAgb3BlbmVkVGFnQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBwaFZpc2l0ZWQucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRFeHByZXNzaW9ucyAmJiBjdXJyZW50RXhwcmVzc2lvbnNbdmFsdWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGhJbmRleCA9IGN1cnJlbnRFeHByZXNzaW9uc1t2YWx1ZV07XG4gICAgICAgIC8vIFRoZSBwbGFjZWhvbGRlciByZXByZXNlbnRzIGFuIGV4cHJlc3Npb24sIGFkZCBhbiBpbnN0cnVjdGlvbiB0byBtb3ZlIGl0XG4gICAgICAgIHRtcGxJbnN0cnVjdGlvbnMucHVzaChwaEluZGV4IHwgSTE4bkluc3RydWN0aW9ucy5FeHByZXNzaW9uKTtcbiAgICAgICAgcGhWaXNpdGVkLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSXQgaXMgYSBjbG9zaW5nIHRhZ1xuICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goSTE4bkluc3RydWN0aW9ucy5DbG9zZU5vZGUpO1xuXG4gICAgICAgIGlmICh0bXBsSW5kZXggPiAwKSB7XG4gICAgICAgICAgb3BlbmVkVGFnQ291bnQtLTtcblxuICAgICAgICAgIC8vIElmIHdlIGhhdmUgcmVhY2hlZCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoaXMgdGVtcGxhdGUsIGV4aXQgdGhlIGxvb3BcbiAgICAgICAgICBpZiAob3BlbmVkVGFnQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGhJbmRleCAhPT0gdW5kZWZpbmVkICYmIHBoSW5kZXggPiBtYXhJbmRleCkge1xuICAgICAgICBtYXhJbmRleCA9IHBoSW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVJvb3RzKSB7XG4gICAgICAgIGNvbnN0IG5ld1RtcGxJbmRleCA9IHRlbXBsYXRlUm9vdHMuaW5kZXhPZih2YWx1ZSkgKyAxO1xuICAgICAgICBpZiAobmV3VG1wbEluZGV4ICE9PSAwICYmIG5ld1RtcGxJbmRleCAhPT0gdG1wbEluZGV4KSB7XG4gICAgICAgICAgcGFydEluZGV4ID0gZ2VuZXJhdGVNYXBwaW5nSW5zdHJ1Y3Rpb25zKFxuICAgICAgICAgICAgICBuZXdUbXBsSW5kZXgsIHBhcnRJbmRleCwgdHJhbnNsYXRpb25QYXJ0cywgaW5zdHJ1Y3Rpb25zLCBlbGVtZW50cywgZXhwcmVzc2lvbnMsXG4gICAgICAgICAgICAgIHRlbXBsYXRlUm9vdHMsIGxhc3RDaGlsZEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgLy8gSXQncyBhIG5vbi1lbXB0eSBzdHJpbmcsIGNyZWF0ZSBhIHRleHQgbm9kZVxuICAgICAgdG1wbEluc3RydWN0aW9ucy5wdXNoKEkxOG5JbnN0cnVjdGlvbnMuVGV4dCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBpbnN0cnVjdGlvbnMgdG8gcmVtb3ZlIGVsZW1lbnRzIHRoYXQgYXJlIG5vdCB1c2VkIGluIHRoZSB0cmFuc2xhdGlvblxuICBpZiAoZWxlbWVudHMpIHtcbiAgICBjb25zdCB0bXBsRWxlbWVudHMgPSBlbGVtZW50c1t0bXBsSW5kZXhdO1xuXG4gICAgaWYgKHRtcGxFbGVtZW50cykge1xuICAgICAgY29uc3QgcGhLZXlzID0gT2JqZWN0LmtleXModG1wbEVsZW1lbnRzKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaEtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGggPSBwaEtleXNbaV07XG5cbiAgICAgICAgaWYgKHBoVmlzaXRlZC5pbmRleE9mKHBoKSA9PT0gLTEpIHtcbiAgICAgICAgICBsZXQgaW5kZXggPSB0bXBsRWxlbWVudHNbcGhdO1xuICAgICAgICAgIC8vIEFkZCBhbiBpbnN0cnVjdGlvbiB0byByZW1vdmUgdGhlIGVsZW1lbnRcbiAgICAgICAgICB0bXBsSW5zdHJ1Y3Rpb25zLnB1c2goaW5kZXggfCBJMThuSW5zdHJ1Y3Rpb25zLlJlbW92ZU5vZGUpO1xuXG4gICAgICAgICAgaWYgKGluZGV4ID4gbWF4SW5kZXgpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIGluc3RydWN0aW9ucyB0byByZW1vdmUgZXhwcmVzc2lvbnMgdGhhdCBhcmUgbm90IHVzZWQgaW4gdGhlIHRyYW5zbGF0aW9uXG4gIGlmIChleHByZXNzaW9ucykge1xuICAgIGNvbnN0IHRtcGxFeHByZXNzaW9ucyA9IGV4cHJlc3Npb25zW3RtcGxJbmRleF07XG5cbiAgICBpZiAodG1wbEV4cHJlc3Npb25zKSB7XG4gICAgICBjb25zdCBwaEtleXMgPSBPYmplY3Qua2V5cyh0bXBsRXhwcmVzc2lvbnMpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBoS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwaCA9IHBoS2V5c1tpXTtcblxuICAgICAgICBpZiAocGhWaXNpdGVkLmluZGV4T2YocGgpID09PSAtMSkge1xuICAgICAgICAgIGxldCBpbmRleCA9IHRtcGxFeHByZXNzaW9uc1twaF07XG4gICAgICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICAgICAgYXNzZXJ0TGVzc1RoYW4oXG4gICAgICAgICAgICAgICAgaW5kZXgudG9TdHJpbmcoMikubGVuZ3RoLCAyOCwgYEluZGV4ICR7aW5kZXh9IGlzIHRvbyBiaWcgYW5kIHdpbGwgb3ZlcmZsb3dgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQWRkIGFuIGluc3RydWN0aW9uIHRvIHJlbW92ZSB0aGUgZXhwcmVzc2lvblxuICAgICAgICAgIHRtcGxJbnN0cnVjdGlvbnMucHVzaChpbmRleCB8IEkxOG5JbnN0cnVjdGlvbnMuUmVtb3ZlTm9kZSk7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPiBtYXhJbmRleCkge1xuICAgICAgICAgICAgbWF4SW5kZXggPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAodG1wbEluZGV4ID09PSAwICYmIHR5cGVvZiBsYXN0Q2hpbGRJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBUaGUgY3VycmVudCBwYXJlbnQgaXMgYW4gbmctY29udGFpbmVyIGFuZCBpdCBoYXMgbW9yZSBjaGlsZHJlbiBhZnRlciB0aGUgdHJhbnNsYXRpb24gdGhhdCB3ZVxuICAgIC8vIG5lZWQgdG8gYXBwZW5kIHRvIGtlZXAgdGhlIG9yZGVyIG9mIHRoZSBET00gbm9kZXMgY29ycmVjdFxuICAgIGZvciAobGV0IGkgPSBtYXhJbmRleCArIDE7IGkgPD0gbGFzdENoaWxkSW5kZXg7IGkrKykge1xuICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICBhc3NlcnRMZXNzVGhhbihpLnRvU3RyaW5nKDIpLmxlbmd0aCwgMjgsIGBJbmRleCAke2l9IGlzIHRvbyBiaWcgYW5kIHdpbGwgb3ZlcmZsb3dgKTtcbiAgICAgIH1cbiAgICAgIHRtcGxJbnN0cnVjdGlvbnMucHVzaChpIHwgSTE4bkluc3RydWN0aW9ucy5BbnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0SW5kZXg7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEkxOG5Ob2RlKHROb2RlOiBUTm9kZSwgcGFyZW50VE5vZGU6IFROb2RlLCBwcmV2aW91c1ROb2RlOiBUTm9kZSk6IFROb2RlIHtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIG5nRGV2TW9kZS5yZW5kZXJlck1vdmVOb2RlKys7XG4gIH1cblxuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuXG4gIC8vIE9uIGZpcnN0IHBhc3MsIHJlLW9yZ2FuaXplIG5vZGUgdHJlZSB0byBwdXQgdGhpcyBub2RlIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uLlxuICBjb25zdCBmaXJzdFRlbXBsYXRlUGFzcyA9IHZpZXdEYXRhW1RWSUVXXS5maXJzdFRlbXBsYXRlUGFzcztcbiAgaWYgKGZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgaWYgKHByZXZpb3VzVE5vZGUgPT09IHBhcmVudFROb2RlICYmIHROb2RlICE9PSBwYXJlbnRUTm9kZS5jaGlsZCkge1xuICAgICAgdE5vZGUubmV4dCA9IHBhcmVudFROb2RlLmNoaWxkO1xuICAgICAgcGFyZW50VE5vZGUuY2hpbGQgPSB0Tm9kZTtcbiAgICB9IGVsc2UgaWYgKHByZXZpb3VzVE5vZGUgIT09IHBhcmVudFROb2RlICYmIHROb2RlICE9PSBwcmV2aW91c1ROb2RlLm5leHQpIHtcbiAgICAgIHROb2RlLm5leHQgPSBwcmV2aW91c1ROb2RlLm5leHQ7XG4gICAgICBwcmV2aW91c1ROb2RlLm5leHQgPSB0Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdE5vZGUubmV4dCA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudFROb2RlICE9PSB2aWV3RGF0YVtIT1NUX05PREVdKSB7XG4gICAgICB0Tm9kZS5wYXJlbnQgPSBwYXJlbnRUTm9kZSBhcyBURWxlbWVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kQ2hpbGQoZ2V0TmF0aXZlQnlUTm9kZSh0Tm9kZSwgdmlld0RhdGEpLCB0Tm9kZSwgdmlld0RhdGEpO1xuXG4gIGNvbnN0IHNsb3RWYWx1ZSA9IHZpZXdEYXRhW3ROb2RlLmluZGV4XTtcbiAgaWYgKHROb2RlLnR5cGUgIT09IFROb2RlVHlwZS5Db250YWluZXIgJiYgaXNMQ29udGFpbmVyKHNsb3RWYWx1ZSkpIHtcbiAgICAvLyBOb2RlcyB0aGF0IGluamVjdCBWaWV3Q29udGFpbmVyUmVmIGFsc28gaGF2ZSBhIGNvbW1lbnQgbm9kZSB0aGF0IHNob3VsZCBiZSBtb3ZlZFxuICAgIGFwcGVuZENoaWxkKHNsb3RWYWx1ZVtOQVRJVkVdLCB0Tm9kZSwgdmlld0RhdGEpO1xuICB9XG5cbiAgcmV0dXJuIHROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaTE4bkF0dHJpYnV0ZShpbmRleDogbnVtYmVyLCBhdHRyczogYW55W10pOiB2b2lkIHtcbiAgLy8gcGxhY2Vob2xkZXIgZm9yIGkxOG5BdHRyaWJ1dGUgZnVuY3Rpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGkxOG5FeHAoZXhwcmVzc2lvbjogYW55KTogdm9pZCB7XG4gIC8vIHBsYWNlaG9sZGVyIGZvciBpMThuRXhwIGZ1bmN0aW9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpMThuU3RhcnQoaW5kZXg6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCBzdWJUZW1wbGF0ZUluZGV4OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gIC8vIHBsYWNlaG9sZGVyIGZvciBpMThuRXhwIGZ1bmN0aW9uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpMThuRW5kKCk6IHZvaWQge1xuICAvLyBwbGFjZWhvbGRlciBmb3IgaTE4bkVuZCBmdW5jdGlvblxufVxuXG4vKipcbiAqIFRha2VzIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgZ2VuZXJhdGVkIGJ5IGBpMThuTWFwcGluZygpYCB0byB0cmFuc2Zvcm0gdGhlIHRlbXBsYXRlIGFjY29yZGluZ2x5LlxuICpcbiAqIEBwYXJhbSBzdGFydEluZGV4IEluZGV4IG9mIHRoZSBmaXJzdCBlbGVtZW50IHRvIHRyYW5zbGF0ZSAoZm9yIGluc3RhbmNlIHRoZSBmaXJzdCBjaGlsZCBvZiB0aGVcbiAqIGVsZW1lbnQgd2l0aCB0aGUgaTE4biBhdHRyaWJ1dGUpLlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBUaGUgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdG8gYXBwbHkgb24gdGhlIGN1cnJlbnQgdmlldy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5BcHBseShzdGFydEluZGV4OiBudW1iZXIsIGluc3RydWN0aW9uczogSTE4bkluc3RydWN0aW9uW10pOiB2b2lkIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgaWYgKG5nRGV2TW9kZSkge1xuICAgIGFzc2VydEVxdWFsKFxuICAgICAgICB2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSwgdmlld0RhdGFbVFZJRVddLmJpbmRpbmdTdGFydEluZGV4LFxuICAgICAgICAnaTE4bkFwcGx5IHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFueSBiaW5kaW5nJyk7XG4gIH1cblxuICBpZiAoIWluc3RydWN0aW9ucykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlbmRlcmVyID0gZ2V0UmVuZGVyZXIoKTtcbiAgY29uc3Qgc3RhcnRUTm9kZSA9IGdldFROb2RlKHN0YXJ0SW5kZXgsIHZpZXdEYXRhKTtcbiAgbGV0IGxvY2FsUGFyZW50VE5vZGU6IFROb2RlID0gc3RhcnRUTm9kZS5wYXJlbnQgfHwgdmlld0RhdGFbSE9TVF9OT0RFXSAhO1xuICBsZXQgbG9jYWxQcmV2aW91c1ROb2RlOiBUTm9kZSA9IGxvY2FsUGFyZW50VE5vZGU7XG4gIHJlc2V0Q29tcG9uZW50U3RhdGUoKTsgIC8vIFdlIGRvbid0IHdhbnQgdG8gYWRkIHRvIHRoZSB0cmVlIHdpdGggdGhlIHdyb25nIHByZXZpb3VzIG5vZGVcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zW2ldIGFzIG51bWJlcjtcbiAgICBzd2l0Y2ggKGluc3RydWN0aW9uICYgSTE4bkluc3RydWN0aW9ucy5JbnN0cnVjdGlvbk1hc2spIHtcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5FbGVtZW50OlxuICAgICAgICBjb25zdCBlbGVtZW50VE5vZGUgPSBnZXRUTm9kZShpbnN0cnVjdGlvbiAmIEkxOG5JbnN0cnVjdGlvbnMuSW5kZXhNYXNrLCB2aWV3RGF0YSk7XG4gICAgICAgIGxvY2FsUHJldmlvdXNUTm9kZSA9IGFwcGVuZEkxOG5Ob2RlKGVsZW1lbnRUTm9kZSwgbG9jYWxQYXJlbnRUTm9kZSwgbG9jYWxQcmV2aW91c1ROb2RlKTtcbiAgICAgICAgbG9jYWxQYXJlbnRUTm9kZSA9IGVsZW1lbnRUTm9kZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuRXhwcmVzc2lvbjpcbiAgICAgIGNhc2UgSTE4bkluc3RydWN0aW9ucy5UZW1wbGF0ZVJvb3Q6XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuQW55OlxuICAgICAgICBjb25zdCBub2RlSW5kZXggPSBpbnN0cnVjdGlvbiAmIEkxOG5JbnN0cnVjdGlvbnMuSW5kZXhNYXNrO1xuICAgICAgICBsb2NhbFByZXZpb3VzVE5vZGUgPVxuICAgICAgICAgICAgYXBwZW5kSTE4bk5vZGUoZ2V0VE5vZGUobm9kZUluZGV4LCB2aWV3RGF0YSksIGxvY2FsUGFyZW50VE5vZGUsIGxvY2FsUHJldmlvdXNUTm9kZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBJMThuSW5zdHJ1Y3Rpb25zLlRleHQ6XG4gICAgICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgICAgICBuZ0Rldk1vZGUucmVuZGVyZXJDcmVhdGVUZXh0Tm9kZSsrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gaW5zdHJ1Y3Rpb25zWysraV07XG4gICAgICAgIGNvbnN0IHRleHRSTm9kZSA9IGNyZWF0ZVRleHROb2RlKHZhbHVlLCByZW5kZXJlcik7XG4gICAgICAgIC8vIElmIHdlIHdlcmUgdG8gb25seSBjcmVhdGUgYSBgUk5vZGVgIHRoZW4gcHJvamVjdGlvbnMgd29uJ3QgbW92ZSB0aGUgdGV4dC5cbiAgICAgICAgLy8gQ3JlYXRlIHRleHQgbm9kZSBhdCB0aGUgY3VycmVudCBlbmQgb2Ygdmlld0RhdGEuIE11c3Qgc3VidHJhY3QgaGVhZGVyIG9mZnNldCBiZWNhdXNlXG4gICAgICAgIC8vIGNyZWF0ZU5vZGVBdEluZGV4IHRha2VzIGEgcmF3IGluZGV4IChub3QgYWRqdXN0ZWQgYnkgaGVhZGVyIG9mZnNldCkuXG4gICAgICAgIGFkanVzdEJsdWVwcmludEZvck5ld05vZGUodmlld0RhdGEpO1xuICAgICAgICBjb25zdCB0ZXh0VE5vZGUgPSBjcmVhdGVOb2RlQXRJbmRleChcbiAgICAgICAgICAgIHZpZXdEYXRhLmxlbmd0aCAtIDEgLSBIRUFERVJfT0ZGU0VULCBUTm9kZVR5cGUuRWxlbWVudCwgdGV4dFJOb2RlLCBudWxsLCBudWxsKTtcbiAgICAgICAgbG9jYWxQcmV2aW91c1ROb2RlID0gYXBwZW5kSTE4bk5vZGUodGV4dFROb2RlLCBsb2NhbFBhcmVudFROb2RlLCBsb2NhbFByZXZpb3VzVE5vZGUpO1xuICAgICAgICByZXNldENvbXBvbmVudFN0YXRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBJMThuSW5zdHJ1Y3Rpb25zLkNsb3NlTm9kZTpcbiAgICAgICAgbG9jYWxQcmV2aW91c1ROb2RlID0gbG9jYWxQYXJlbnRUTm9kZTtcbiAgICAgICAgbG9jYWxQYXJlbnRUTm9kZSA9IGxvY2FsUGFyZW50VE5vZGUucGFyZW50IHx8IHZpZXdEYXRhW0hPU1RfTk9ERV0gITtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEkxOG5JbnN0cnVjdGlvbnMuUmVtb3ZlTm9kZTpcbiAgICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICAgIG5nRGV2TW9kZS5yZW5kZXJlclJlbW92ZU5vZGUrKztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW1vdmVJbmRleCA9IGluc3RydWN0aW9uICYgSTE4bkluc3RydWN0aW9ucy5JbmRleE1hc2s7XG4gICAgICAgIGNvbnN0IHJlbW92ZWRFbGVtZW50OiBSRWxlbWVudHxSQ29tbWVudCA9IGdldE5hdGl2ZUJ5SW5kZXgocmVtb3ZlSW5kZXgsIHZpZXdEYXRhKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlZFROb2RlID0gZ2V0VE5vZGUocmVtb3ZlSW5kZXgsIHZpZXdEYXRhKTtcbiAgICAgICAgcmVtb3ZlQ2hpbGQocmVtb3ZlZFROb2RlLCByZW1vdmVkRWxlbWVudCB8fCBudWxsLCB2aWV3RGF0YSk7XG5cbiAgICAgICAgY29uc3Qgc2xvdFZhbHVlID0gbG9hZChyZW1vdmVJbmRleCkgYXMgUkVsZW1lbnQgfCBSQ29tbWVudCB8IExDb250YWluZXIgfCBTdHlsaW5nQ29udGV4dDtcbiAgICAgICAgaWYgKGlzTENvbnRhaW5lcihzbG90VmFsdWUpKSB7XG4gICAgICAgICAgY29uc3QgbENvbnRhaW5lciA9IHNsb3RWYWx1ZSBhcyBMQ29udGFpbmVyO1xuICAgICAgICAgIGlmIChyZW1vdmVkVE5vZGUudHlwZSAhPT0gVE5vZGVUeXBlLkNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmVtb3ZlQ2hpbGQocmVtb3ZlZFROb2RlLCBsQ29udGFpbmVyW05BVElWRV0gfHwgbnVsbCwgdmlld0RhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZW1vdmVkVE5vZGUuZGV0YWNoZWQgPSB0cnVlO1xuICAgICAgICAgIGxDb250YWluZXJbUkVOREVSX1BBUkVOVF0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRha2VzIGEgdHJhbnNsYXRpb24gc3RyaW5nIGFuZCB0aGUgaW5pdGlhbCBsaXN0IG9mIGV4cHJlc3Npb25zIGFuZCByZXR1cm5zIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnNcbiAqIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBFdmVuIGluZGV4ZXMgY29udGFpbiBzdGF0aWMgc3RyaW5ncywgd2hpbGUgb2RkIGluZGV4ZXMgY29udGFpbiB0aGUgaW5kZXggb2YgdGhlIGV4cHJlc3Npb24gd2hvc2VcbiAqIHZhbHVlIHdpbGwgYmUgY29uY2F0ZW5hdGVkIGludG8gdGhlIGZpbmFsIHRyYW5zbGF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bkV4cE1hcHBpbmcoXG4gICAgdHJhbnNsYXRpb246IHN0cmluZywgcGxhY2Vob2xkZXJzOiBQbGFjZWhvbGRlck1hcCk6IEkxOG5FeHBJbnN0cnVjdGlvbltdIHtcbiAgY29uc3Qgc3RhdGljVGV4dDogSTE4bkV4cEluc3RydWN0aW9uW10gPSB0cmFuc2xhdGlvbi5zcGxpdChpMThuVGFnUmVnZXgpO1xuICAvLyBvZGQgaW5kZXhlcyBhcmUgcGxhY2Vob2xkZXJzXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc3RhdGljVGV4dC5sZW5ndGg7IGkgKz0gMikge1xuICAgIHN0YXRpY1RleHRbaV0gPSBwbGFjZWhvbGRlcnNbc3RhdGljVGV4dFtpXV07XG4gIH1cbiAgcmV0dXJuIHN0YXRpY1RleHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBvZiBhbiBleHByZXNzaW9uIGhhcyBjaGFuZ2VkIGFuZCByZXBsYWNlcyBpdCBieSBpdHMgdmFsdWUgaW4gYSB0cmFuc2xhdGlvbixcbiAqIG9yIHJldHVybnMgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBpbnN0cnVjdGlvbnMgQSBsaXN0IG9mIGluc3RydWN0aW9ucyB0aGF0IHdpbGwgYmUgdXNlZCB0byB0cmFuc2xhdGUgYW4gYXR0cmlidXRlLlxuICogQHBhcmFtIHYwIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5JbnRlcnBvbGF0aW9uMShpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2MDogYW55KTogc3RyaW5nfE5PX0NIQU5HRSB7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkKF9nZXRWaWV3RGF0YSgpW0JJTkRJTkdfSU5ERVhdKyssIHYwKTtcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHYwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDIgZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5JbnRlcnBvbGF0aW9uMihpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2MDogYW55LCB2MTogYW55KTogc3RyaW5nfFxuICAgIE5PX0NIQU5HRSB7XG4gIGNvbnN0IHZpZXdEYXRhID0gX2dldFZpZXdEYXRhKCk7XG4gIGNvbnN0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkMih2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSwgdjAsIHYxKTtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gMjtcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID0gYjEgPyB2MSA6IHYwO1xuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDMgZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MiB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbjMoXG4gICAgaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSwgdjE6IGFueSwgdjI6IGFueSk6IHN0cmluZ3xOT19DSEFOR0Uge1xuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDModmlld0RhdGFbQklORElOR19JTkRFWF0sIHYwLCB2MSwgdjIpO1xuICB2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSArPSAzO1xuXG4gIGlmICghZGlmZmVyZW50KSB7XG4gICAgcmV0dXJuIE5PX0NIQU5HRTtcbiAgfVxuXG4gIGxldCByZXMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBPZGQgaW5kZXhlcyBhcmUgYmluZGluZ3NcbiAgICBpZiAoaSAmIDEpIHtcbiAgICAgIC8vIEV4dHJhY3QgYml0c1xuICAgICAgY29uc3QgaWR4ID0gaW5zdHJ1Y3Rpb25zW2ldIGFzIG51bWJlcjtcbiAgICAgIGNvbnN0IGIyID0gaWR4ICYgMjtcbiAgICAgIGNvbnN0IGIxID0gaWR4ICYgMTtcbiAgICAgIC8vIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgYXJndW1lbnQgdnggd2hlcmUgeCA9IGlkeFxuICAgICAgY29uc3QgdmFsdWUgPSBiMiA/IHYyIDogKGIxID8gdjEgOiB2MCk7XG5cbiAgICAgIHJlcyArPSBzdHJpbmdpZnkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgKz0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB2YWx1ZXMgb2YgdXAgdG8gNCBleHByZXNzaW9ucyBoYXZlIGNoYW5nZWQgYW5kIHJlcGxhY2VzIHRoZW0gYnkgdGhlaXIgdmFsdWVzIGluIGFcbiAqIHRyYW5zbGF0aW9uLCBvciByZXR1cm5zIE5PX0NIQU5HRS5cbiAqXG4gKiBAcGFyYW0gaW5zdHJ1Y3Rpb25zIEEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNsYXRlIGFuIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB2MCB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjEgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYyIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MyB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvbjQoXG4gICAgaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdjA6IGFueSwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSk6IHN0cmluZ3xOT19DSEFOR0Uge1xuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuICBjb25zdCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQodmlld0RhdGFbQklORElOR19JTkRFWF0sIHYwLCB2MSwgdjIsIHYzKTtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gNDtcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiMiA9IGlkeCAmIDI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID0gYjIgPyAoYjEgPyB2MyA6IHYyKSA6IChiMSA/IHYxIDogdjApO1xuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDUgZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MiB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjMgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY0IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5JbnRlcnBvbGF0aW9uNShcbiAgICBpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KTogc3RyaW5nfFxuICAgIE5PX0NIQU5HRSB7XG4gIGNvbnN0IHZpZXdEYXRhID0gX2dldFZpZXdEYXRhKCk7XG4gIGxldCBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQodmlld0RhdGFbQklORElOR19JTkRFWF0sIHYwLCB2MSwgdjIsIHYzKTtcbiAgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQodmlld0RhdGFbQklORElOR19JTkRFWF0gKyA0LCB2NCkgfHwgZGlmZmVyZW50O1xuICB2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSArPSA1O1xuXG4gIGlmICghZGlmZmVyZW50KSB7XG4gICAgcmV0dXJuIE5PX0NIQU5HRTtcbiAgfVxuXG4gIGxldCByZXMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBPZGQgaW5kZXhlcyBhcmUgYmluZGluZ3NcbiAgICBpZiAoaSAmIDEpIHtcbiAgICAgIC8vIEV4dHJhY3QgYml0c1xuICAgICAgY29uc3QgaWR4ID0gaW5zdHJ1Y3Rpb25zW2ldIGFzIG51bWJlcjtcbiAgICAgIGNvbnN0IGI0ID0gaWR4ICYgNDtcbiAgICAgIGNvbnN0IGIyID0gaWR4ICYgMjtcbiAgICAgIGNvbnN0IGIxID0gaWR4ICYgMTtcbiAgICAgIC8vIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgYXJndW1lbnQgdnggd2hlcmUgeCA9IGlkeFxuICAgICAgY29uc3QgdmFsdWUgPSBiNCA/IHY0IDogKGIyID8gKGIxID8gdjMgOiB2MikgOiAoYjEgPyB2MSA6IHYwKSk7XG5cbiAgICAgIHJlcyArPSBzdHJpbmdpZnkodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgKz0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB2YWx1ZXMgb2YgdXAgdG8gNiBleHByZXNzaW9ucyBoYXZlIGNoYW5nZWQgYW5kIHJlcGxhY2VzIHRoZW0gYnkgdGhlaXIgdmFsdWVzIGluIGFcbiAqIHRyYW5zbGF0aW9uLCBvciByZXR1cm5zIE5PX0NIQU5HRS5cbiAqXG4gKiBAcGFyYW0gaW5zdHJ1Y3Rpb25zIEEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gdHJhbnNsYXRlIGFuIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB2MCB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjEgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYyIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MyB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjQgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY1IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqLyBleHBvcnQgZnVuY3Rpb25cbmkxOG5JbnRlcnBvbGF0aW9uNihcbiAgICBpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55KTpcbiAgICBzdHJpbmd8Tk9fQ0hBTkdFIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgbGV0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNCh2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSwgdjAsIHYxLCB2MiwgdjMpO1xuICBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDIodmlld0RhdGFbQklORElOR19JTkRFWF0gKyA0LCB2NCwgdjUpIHx8IGRpZmZlcmVudDtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gNjtcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiNCA9IGlkeCAmIDQ7XG4gICAgICBjb25zdCBiMiA9IGlkeCAmIDI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID0gYjQgPyAoYjEgPyB2NSA6IHY0KSA6IChiMiA/IChiMSA/IHYzIDogdjIpIDogKGIxID8gdjEgOiB2MCkpO1xuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDcgZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MiB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjMgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY0IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjYgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICpcbiAqIEByZXR1cm5zIFRoZSBjb25jYXRlbmF0ZWQgc3RyaW5nIHdoZW4gYW55IG9mIHRoZSBhcmd1bWVudHMgY2hhbmdlcywgYE5PX0NIQU5HRWAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bkludGVycG9sYXRpb243KFxuICAgIGluc3RydWN0aW9uczogSTE4bkV4cEluc3RydWN0aW9uW10sIHYwOiBhbnksIHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnksIHY0OiBhbnksIHY1OiBhbnksXG4gICAgdjY6IGFueSk6IHN0cmluZ3xOT19DSEFOR0Uge1xuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuICBsZXQgZGlmZmVyZW50ID0gYmluZGluZ1VwZGF0ZWQ0KHZpZXdEYXRhW0JJTkRJTkdfSU5ERVhdLCB2MCwgdjEsIHYyLCB2Myk7XG4gIGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkMyh2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSArIDQsIHY0LCB2NSwgdjYpIHx8IGRpZmZlcmVudDtcbiAgdmlld0RhdGFbQklORElOR19JTkRFWF0gKz0gNztcblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIGJpbmRpbmdzXG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBFeHRyYWN0IGJpdHNcbiAgICAgIGNvbnN0IGlkeCA9IGluc3RydWN0aW9uc1tpXSBhcyBudW1iZXI7XG4gICAgICBjb25zdCBiNCA9IGlkeCAmIDQ7XG4gICAgICBjb25zdCBiMiA9IGlkeCAmIDI7XG4gICAgICBjb25zdCBiMSA9IGlkeCAmIDE7XG4gICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGFyZ3VtZW50IHZ4IHdoZXJlIHggPSBpZHhcbiAgICAgIGNvbnN0IHZhbHVlID0gYjQgPyAoYjIgPyB2NiA6IChiMSA/IHY1IDogdjQpKSA6IChiMiA/IChiMSA/IHYzIDogdjIpIDogKGIxID8gdjEgOiB2MCkpO1xuXG4gICAgICByZXMgKz0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzICs9IGluc3RydWN0aW9uc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWVzIG9mIHVwIHRvIDggZXhwcmVzc2lvbnMgaGF2ZSBjaGFuZ2VkIGFuZCByZXBsYWNlcyB0aGVtIGJ5IHRoZWlyIHZhbHVlcyBpbiBhXG4gKiB0cmFuc2xhdGlvbiwgb3IgcmV0dXJucyBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIGluc3RydWN0aW9ucyBBIGxpc3Qgb2YgaW5zdHJ1Y3Rpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHRyYW5zbGF0ZSBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gdjAgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHYxIHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2MiB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjMgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY0IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqIEBwYXJhbSB2NSB2YWx1ZSBjaGVja2VkIGZvciBjaGFuZ2UuXG4gKiBAcGFyYW0gdjYgdmFsdWUgY2hlY2tlZCBmb3IgY2hhbmdlLlxuICogQHBhcmFtIHY3IHZhbHVlIGNoZWNrZWQgZm9yIGNoYW5nZS5cbiAqXG4gKiBAcmV0dXJucyBUaGUgY29uY2F0ZW5hdGVkIHN0cmluZyB3aGVuIGFueSBvZiB0aGUgYXJndW1lbnRzIGNoYW5nZXMsIGBOT19DSEFOR0VgIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGkxOG5JbnRlcnBvbGF0aW9uOChcbiAgICBpbnN0cnVjdGlvbnM6IEkxOG5FeHBJbnN0cnVjdGlvbltdLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LFxuICAgIHY2OiBhbnksIHY3OiBhbnkpOiBzdHJpbmd8Tk9fQ0hBTkdFIHtcbiAgY29uc3Qgdmlld0RhdGEgPSBfZ2V0Vmlld0RhdGEoKTtcbiAgbGV0IGRpZmZlcmVudCA9IGJpbmRpbmdVcGRhdGVkNCh2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSwgdjAsIHYxLCB2MiwgdjMpO1xuICBkaWZmZXJlbnQgPSBiaW5kaW5nVXBkYXRlZDQodmlld0RhdGFbQklORElOR19JTkRFWF0gKyA0LCB2NCwgdjUsIHY2LCB2NykgfHwgZGlmZmVyZW50O1xuICB2aWV3RGF0YVtCSU5ESU5HX0lOREVYXSArPSA4O1xuXG4gIGlmICghZGlmZmVyZW50KSB7XG4gICAgcmV0dXJuIE5PX0NIQU5HRTtcbiAgfVxuXG4gIGxldCByZXMgPSAnJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBPZGQgaW5kZXhlcyBhcmUgYmluZGluZ3NcbiAgICBpZiAoaSAmIDEpIHtcbiAgICAgIC8vIEV4dHJhY3QgYml0c1xuICAgICAgY29uc3QgaWR4ID0gaW5zdHJ1Y3Rpb25zW2ldIGFzIG51bWJlcjtcbiAgICAgIGNvbnN0IGI0ID0gaWR4ICYgNDtcbiAgICAgIGNvbnN0IGIyID0gaWR4ICYgMjtcbiAgICAgIGNvbnN0IGIxID0gaWR4ICYgMTtcbiAgICAgIC8vIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgYXJndW1lbnQgdnggd2hlcmUgeCA9IGlkeFxuICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgIGI0ID8gKGIyID8gKGIxID8gdjcgOiB2NikgOiAoYjEgPyB2NSA6IHY0KSkgOiAoYjIgPyAoYjEgPyB2MyA6IHYyKSA6IChiMSA/IHYxIDogdjApKTtcblxuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcyArPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSB0cmFuc2xhdGVkIGludGVycG9sYXRpb24gYmluZGluZyB3aXRoIGEgdmFyaWFibGUgbnVtYmVyIG9mIGV4cHJlc3Npb25zLlxuICpcbiAqIElmIHRoZXJlIGFyZSAxIHRvIDggZXhwcmVzc2lvbnMgdGhlbiBgaTE4bkludGVycG9sYXRpb24oKWAgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC4gSXQgaXMgZmFzdGVyXG4gKiBiZWNhdXNlIHRoZXJlIGlzIG5vIG5lZWQgdG8gY3JlYXRlIGFuIGFycmF5IG9mIGV4cHJlc3Npb25zIGFuZCBpdGVyYXRlIG92ZXIgaXQuXG4gKlxuICogQHJldHVybnMgVGhlIGNvbmNhdGVuYXRlZCBzdHJpbmcgd2hlbiBhbnkgb2YgdGhlIGFyZ3VtZW50cyBjaGFuZ2VzLCBgTk9fQ0hBTkdFYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuSW50ZXJwb2xhdGlvblYoaW5zdHJ1Y3Rpb25zOiBJMThuRXhwSW5zdHJ1Y3Rpb25bXSwgdmFsdWVzOiBhbnlbXSk6IHN0cmluZ3xcbiAgICBOT19DSEFOR0Uge1xuICBjb25zdCB2aWV3RGF0YSA9IF9nZXRWaWV3RGF0YSgpO1xuICBsZXQgZGlmZmVyZW50ID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gQ2hlY2sgaWYgYmluZGluZ3MgaGF2ZSBjaGFuZ2VkXG4gICAgYmluZGluZ1VwZGF0ZWQodmlld0RhdGFbQklORElOR19JTkRFWF0rKywgdmFsdWVzW2ldKSAmJiAoZGlmZmVyZW50ID0gdHJ1ZSk7XG4gIH1cblxuICBpZiAoIWRpZmZlcmVudCkge1xuICAgIHJldHVybiBOT19DSEFOR0U7XG4gIH1cblxuICBsZXQgcmVzID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gT2RkIGluZGV4ZXMgYXJlIHBsYWNlaG9sZGVyc1xuICAgIGlmIChpICYgMSkge1xuICAgICAgcmVzICs9IHN0cmluZ2lmeSh2YWx1ZXNbaW5zdHJ1Y3Rpb25zW2ldIGFzIG51bWJlcl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgKz0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG4iXX0=