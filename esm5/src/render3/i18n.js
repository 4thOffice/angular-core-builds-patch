import { __read, __spread } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../util/ng_i18n_closure_mode';
import { DEFAULT_LOCALE_ID, getPluralCase } from '../i18n/localization';
import { SRCSET_ATTRS, URI_ATTRS, VALID_ATTRS, VALID_ELEMENTS, getTemplateContent } from '../sanitization/html_sanitizer';
import { InertBodyHelper } from '../sanitization/inert_body';
import { _sanitizeUrl, sanitizeSrcset } from '../sanitization/url_sanitizer';
import { addAllToArray } from '../util/array_utils';
import { assertDataInRange, assertDefined, assertEqual } from '../util/assert';
import { bindingUpdated } from './bindings';
import { attachPatchData } from './context_discovery';
import { setDelayProjection } from './instructions/all';
import { attachI18nOpCodesDebug } from './instructions/lview_debug';
import { allocExpando, elementAttributeInternal, elementPropertyInternal, getOrCreateTNode, setInputsForProperty, setNgReflectProperties, textBindingInternal } from './instructions/shared';
import { NATIVE } from './interfaces/container';
import { getDocument } from './interfaces/document';
import { COMMENT_MARKER, ELEMENT_MARKER } from './interfaces/i18n';
import { isLContainer } from './interfaces/type_checks';
import { HEADER_OFFSET, RENDERER, T_HOST } from './interfaces/view';
import { appendChild, applyProjection, createTextNode, nativeRemoveNode } from './node_manipulation';
import { getBindingIndex, getIsParent, getLView, getPreviousOrParentTNode, getTView, nextBindingIndex, setIsNotParent, setPreviousOrParentTNode } from './state';
import { renderStringify } from './util/misc_utils';
import { getNativeByIndex, getNativeByTNode, getTNode, load } from './util/view_utils';
var MARKER = "\uFFFD";
var ICU_BLOCK_REGEXP = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/;
var SUBTEMPLATE_REGEXP = /�\/?\*(\d+:\d+)�/gi;
var PH_REGEXP = /�(\/?[#*!]\d+):?\d*�/gi;
var BINDING_REGEXP = /�(\d+):?\d*�/gi;
var ICU_REGEXP = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi;
// i18nPostprocess consts
var ROOT_TEMPLATE_ID = 0;
var PP_MULTI_VALUE_PLACEHOLDERS_REGEXP = /\[(�.+?�?)\]/;
var PP_PLACEHOLDERS_REGEXP = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g;
var PP_ICU_VARS_REGEXP = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g;
var PP_ICU_PLACEHOLDERS_REGEXP = /{([A-Z0-9_]+)}/g;
var PP_ICUS_REGEXP = /�I18N_EXP_(ICU(_\d+)?)�/g;
var PP_CLOSE_TEMPLATE_REGEXP = /\/\*/;
var PP_TEMPLATE_ID_REGEXP = /\d+\:(\d+)/;
/**
 * Breaks pattern into strings and top level {...} blocks.
 * Can be used to break a message into text and ICU expressions, or to break an ICU expression into
 * keys and cases.
 * Original code from closure library, modified for Angular.
 *
 * @param pattern (sub)Pattern to be broken.
 *
 */
function extractParts(pattern) {
    if (!pattern) {
        return [];
    }
    var prevPos = 0;
    var braceStack = [];
    var results = [];
    var braces = /[{}]/g;
    // lastIndex doesn't get set to 0 so we have to.
    braces.lastIndex = 0;
    var match;
    while (match = braces.exec(pattern)) {
        var pos = match.index;
        if (match[0] == '}') {
            braceStack.pop();
            if (braceStack.length == 0) {
                // End of the block.
                var block = pattern.substring(prevPos, pos);
                if (ICU_BLOCK_REGEXP.test(block)) {
                    results.push(parseICUBlock(block));
                }
                else {
                    results.push(block);
                }
                prevPos = pos + 1;
            }
        }
        else {
            if (braceStack.length == 0) {
                var substring_1 = pattern.substring(prevPos, pos);
                results.push(substring_1);
                prevPos = pos + 1;
            }
            braceStack.push('{');
        }
    }
    var substring = pattern.substring(prevPos);
    results.push(substring);
    return results;
}
/**
 * Parses text containing an ICU expression and produces a JSON object for it.
 * Original code from closure library, modified for Angular.
 *
 * @param pattern Text containing an ICU expression that needs to be parsed.
 *
 */
function parseICUBlock(pattern) {
    var cases = [];
    var values = [];
    var icuType = 1 /* plural */;
    var mainBinding = 0;
    pattern = pattern.replace(ICU_BLOCK_REGEXP, function (str, binding, type) {
        if (type === 'select') {
            icuType = 0 /* select */;
        }
        else {
            icuType = 1 /* plural */;
        }
        mainBinding = parseInt(binding.substr(1), 10);
        return '';
    });
    var parts = extractParts(pattern);
    // Looking for (key block)+ sequence. One of the keys has to be "other".
    for (var pos = 0; pos < parts.length;) {
        var key = parts[pos++].trim();
        if (icuType === 1 /* plural */) {
            // Key can be "=x", we just want "x"
            key = key.replace(/\s*(?:=)?(\w+)\s*/, '$1');
        }
        if (key.length) {
            cases.push(key);
        }
        var blocks = extractParts(parts[pos++]);
        if (cases.length > values.length) {
            values.push(blocks);
        }
    }
    // TODO(ocombe): support ICU expressions in attributes, see #21615
    return { type: icuType, mainBinding: mainBinding, cases: cases, values: values };
}
/**
 * Removes everything inside the sub-templates of a message.
 */
function removeInnerTemplateTranslation(message) {
    var match;
    var res = '';
    var index = 0;
    var inTemplate = false;
    var tagMatched;
    while ((match = SUBTEMPLATE_REGEXP.exec(message)) !== null) {
        if (!inTemplate) {
            res += message.substring(index, match.index + match[0].length);
            tagMatched = match[1];
            inTemplate = true;
        }
        else {
            if (match[0] === MARKER + "/*" + tagMatched + MARKER) {
                index = match.index;
                inTemplate = false;
            }
        }
    }
    ngDevMode &&
        assertEqual(inTemplate, false, "Tag mismatch: unable to find the end of the sub-template in the translation \"" + message + "\"");
    res += message.substr(index);
    return res;
}
/**
 * Extracts a part of a message and removes the rest.
 *
 * This method is used for extracting a part of the message associated with a template. A translated
 * message can span multiple templates.
 *
 * Example:
 * ```
 * <div i18n>Translate <span *ngIf>me</span>!</div>
 * ```
 *
 * @param message The message to crop
 * @param subTemplateIndex Index of the sub-template to extract. If undefined it returns the
 * external template and removes all sub-templates.
 */
export function getTranslationForTemplate(message, subTemplateIndex) {
    if (typeof subTemplateIndex !== 'number') {
        // We want the root template message, ignore all sub-templates
        return removeInnerTemplateTranslation(message);
    }
    else {
        // We want a specific sub-template
        var start = message.indexOf(":" + subTemplateIndex + MARKER) + 2 + subTemplateIndex.toString().length;
        var end = message.search(new RegExp(MARKER + "\\/\\*\\d+:" + subTemplateIndex + MARKER));
        return removeInnerTemplateTranslation(message.substring(start, end));
    }
}
/**
 * Generate the OpCodes to update the bindings of a string.
 *
 * @param str The string containing the bindings.
 * @param destinationNode Index of the destination node which will receive the binding.
 * @param attrName Name of the attribute, if the string belongs to an attribute.
 * @param sanitizeFn Sanitization function used to sanitize the string after update, if necessary.
 */
function generateBindingUpdateOpCodes(str, destinationNode, attrName, sanitizeFn) {
    if (sanitizeFn === void 0) { sanitizeFn = null; }
    var updateOpCodes = [null, null]; // Alloc space for mask and size
    var textParts = str.split(BINDING_REGEXP);
    var mask = 0;
    for (var j = 0; j < textParts.length; j++) {
        var textValue = textParts[j];
        if (j & 1) {
            // Odd indexes are bindings
            var bindingIndex = parseInt(textValue, 10);
            updateOpCodes.push(-1 - bindingIndex);
            mask = mask | toMaskBit(bindingIndex);
        }
        else if (textValue !== '') {
            // Even indexes are text
            updateOpCodes.push(textValue);
        }
    }
    updateOpCodes.push(destinationNode << 2 /* SHIFT_REF */ |
        (attrName ? 1 /* Attr */ : 0 /* Text */));
    if (attrName) {
        updateOpCodes.push(attrName, sanitizeFn);
    }
    updateOpCodes[0] = mask;
    updateOpCodes[1] = updateOpCodes.length - 2;
    return updateOpCodes;
}
function getBindingMask(icuExpression, mask) {
    if (mask === void 0) { mask = 0; }
    mask = mask | toMaskBit(icuExpression.mainBinding);
    var match;
    for (var i = 0; i < icuExpression.values.length; i++) {
        var valueArr = icuExpression.values[i];
        for (var j = 0; j < valueArr.length; j++) {
            var value = valueArr[j];
            if (typeof value === 'string') {
                while (match = BINDING_REGEXP.exec(value)) {
                    mask = mask | toMaskBit(parseInt(match[1], 10));
                }
            }
            else {
                mask = getBindingMask(value, mask);
            }
        }
    }
    return mask;
}
var i18nIndexStack = [];
var i18nIndexStackPointer = -1;
/**
 * Convert binding index to mask bit.
 *
 * Each index represents a single bit on the bit-mask. Because bit-mask only has 32 bits, we make
 * the 32nd bit share all masks for all bindings higher than 32. Since it is extremely rare to have
 * more than 32 bindings this will be hit very rarely. The downside of hitting this corner case is
 * that we will execute binding code more often than necessary. (penalty of performance)
 */
function toMaskBit(bindingIndex) {
    return 1 << Math.min(bindingIndex, 31);
}
var parentIndexStack = [];
/**
 * Marks a block of text as translatable.
 *
 * The instructions `i18nStart` and `i18nEnd` mark the translation block in the template.
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�!{index}(:{block})�`/`�/!{index}(:{block})�`: *Projection Placeholder*:  Marks the
 *   beginning and end of <ng-content> that was embedded in the original translation block.
 *   The placeholder `index` points to the element index in the template instructions set.
 *   An optional `block` that matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param message The translation message.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export function ɵɵi18nStart(index, message, subTemplateIndex) {
    var tView = getTView();
    ngDevMode && assertDefined(tView, "tView should be defined");
    i18nIndexStack[++i18nIndexStackPointer] = index;
    // We need to delay projections until `i18nEnd`
    setDelayProjection(true);
    if (tView.firstCreatePass && tView.data[index + HEADER_OFFSET] === null) {
        i18nStartFirstPass(getLView(), tView, index, message, subTemplateIndex);
    }
}
// Count for the number of vars that will be allocated for each i18n block.
// It is global because this is used in multiple functions that include loops and recursive calls.
// This is reset to 0 when `i18nStartFirstPass` is called.
var i18nVarsCount;
/**
 * See `i18nStart` above.
 */
function i18nStartFirstPass(lView, tView, index, message, subTemplateIndex) {
    var startIndex = tView.blueprint.length - HEADER_OFFSET;
    i18nVarsCount = 0;
    var previousOrParentTNode = getPreviousOrParentTNode();
    var parentTNode = getIsParent() ? previousOrParentTNode : previousOrParentTNode && previousOrParentTNode.parent;
    var parentIndex = parentTNode && parentTNode !== lView[T_HOST] ? parentTNode.index - HEADER_OFFSET : index;
    var parentIndexPointer = 0;
    parentIndexStack[parentIndexPointer] = parentIndex;
    var createOpCodes = [];
    // If the previous node wasn't the direct parent then we have a translation without top level
    // element and we need to keep a reference of the previous element if there is one. We should also
    // keep track whether an element was a parent node or not, so that the logic that consumes
    // the generated `I18nMutateOpCode`s can leverage this information to properly set TNode state
    // (whether it's a parent or sibling).
    if (index > 0 && previousOrParentTNode !== parentTNode) {
        var previousTNodeIndex = previousOrParentTNode.index - HEADER_OFFSET;
        // If current TNode is a sibling node, encode it using a negative index. This information is
        // required when the `Select` action is processed (see the `readCreateOpCodes` function).
        if (!getIsParent()) {
            previousTNodeIndex = ~previousTNodeIndex;
        }
        // Create an OpCode to select the previous TNode
        createOpCodes.push(previousTNodeIndex << 3 /* SHIFT_REF */ | 0 /* Select */);
    }
    var updateOpCodes = [];
    var icuExpressions = [];
    var templateTranslation = getTranslationForTemplate(message, subTemplateIndex);
    var msgParts = replaceNgsp(templateTranslation).split(PH_REGEXP);
    for (var i = 0; i < msgParts.length; i++) {
        var value = msgParts[i];
        if (i & 1) {
            // Odd indexes are placeholders (elements and sub-templates)
            if (value.charAt(0) === '/') {
                // It is a closing tag
                if (value.charAt(1) === "#" /* ELEMENT */) {
                    var phIndex = parseInt(value.substr(2), 10);
                    parentIndex = parentIndexStack[--parentIndexPointer];
                    createOpCodes.push(phIndex << 3 /* SHIFT_REF */ | 5 /* ElementEnd */);
                }
            }
            else {
                var phIndex = parseInt(value.substr(1), 10);
                var isElement = value.charAt(0) === "#" /* ELEMENT */;
                // The value represents a placeholder that we move to the designated index.
                // Note: positive indicies indicate that a TNode with a given index should also be marked as
                // parent while executing `Select` instruction.
                createOpCodes.push((isElement ? phIndex : ~phIndex) << 3 /* SHIFT_REF */ |
                    0 /* Select */, parentIndex << 17 /* SHIFT_PARENT */ | 1 /* AppendChild */);
                if (isElement) {
                    parentIndexStack[++parentIndexPointer] = parentIndex = phIndex;
                }
            }
        }
        else {
            // Even indexes are text (including bindings & ICU expressions)
            var parts = extractParts(value);
            for (var j = 0; j < parts.length; j++) {
                if (j & 1) {
                    // Odd indexes are ICU expressions
                    var icuExpression = parts[j];
                    // Verify that ICU expression has the right shape. Translations might contain invalid
                    // constructions (while original messages were correct), so ICU parsing at runtime may not
                    // succeed (thus `icuExpression` remains a string).
                    if (typeof icuExpression !== 'object') {
                        throw new Error("Unable to parse ICU expression in \"" + templateTranslation + "\" message.");
                    }
                    // Create the comment node that will anchor the ICU expression
                    var icuNodeIndex = startIndex + i18nVarsCount++;
                    createOpCodes.push(COMMENT_MARKER, ngDevMode ? "ICU " + icuNodeIndex : '', icuNodeIndex, parentIndex << 17 /* SHIFT_PARENT */ | 1 /* AppendChild */);
                    // Update codes for the ICU expression
                    var mask = getBindingMask(icuExpression);
                    icuStart(icuExpressions, icuExpression, icuNodeIndex, icuNodeIndex);
                    // Since this is recursive, the last TIcu that was pushed is the one we want
                    var tIcuIndex = icuExpressions.length - 1;
                    updateOpCodes.push(toMaskBit(icuExpression.mainBinding), // mask of the main binding
                    3, // skip 3 opCodes if not changed
                    -1 - icuExpression.mainBinding, icuNodeIndex << 2 /* SHIFT_REF */ | 2 /* IcuSwitch */, tIcuIndex, mask, // mask of all the bindings of this ICU expression
                    2, // skip 2 opCodes if not changed
                    icuNodeIndex << 2 /* SHIFT_REF */ | 3 /* IcuUpdate */, tIcuIndex);
                }
                else if (parts[j] !== '') {
                    var text = parts[j];
                    // Even indexes are text (including bindings)
                    var hasBinding = text.match(BINDING_REGEXP);
                    // Create text nodes
                    var textNodeIndex = startIndex + i18nVarsCount++;
                    createOpCodes.push(
                    // If there is a binding, the value will be set during update
                    hasBinding ? '' : text, textNodeIndex, parentIndex << 17 /* SHIFT_PARENT */ | 1 /* AppendChild */);
                    if (hasBinding) {
                        addAllToArray(generateBindingUpdateOpCodes(text, textNodeIndex), updateOpCodes);
                    }
                }
            }
        }
    }
    if (i18nVarsCount > 0) {
        allocExpando(tView, lView, i18nVarsCount);
    }
    ngDevMode &&
        attachI18nOpCodesDebug(createOpCodes, updateOpCodes, icuExpressions.length ? icuExpressions : null, lView);
    // NOTE: local var needed to properly assert the type of `TI18n`.
    var tI18n = {
        vars: i18nVarsCount,
        create: createOpCodes,
        update: updateOpCodes,
        icus: icuExpressions.length ? icuExpressions : null,
    };
    tView.data[index + HEADER_OFFSET] = tI18n;
}
function appendI18nNode(tView, tNode, parentTNode, previousTNode, lView) {
    ngDevMode && ngDevMode.rendererMoveNode++;
    var nextNode = tNode.next;
    if (!previousTNode) {
        previousTNode = parentTNode;
    }
    // Re-organize node tree to put this node in the correct position.
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
    if (parentTNode !== lView[T_HOST]) {
        tNode.parent = parentTNode;
    }
    // If tNode was moved around, we might need to fix a broken link.
    var cursor = tNode.next;
    while (cursor) {
        if (cursor.next === tNode) {
            cursor.next = nextNode;
        }
        cursor = cursor.next;
    }
    // If the placeholder to append is a projection, we need to move the projected nodes instead
    if (tNode.type === 1 /* Projection */) {
        applyProjection(tView, lView, tNode);
        return tNode;
    }
    appendChild(tView, lView, getNativeByTNode(tNode, lView), tNode);
    var slotValue = lView[tNode.index];
    if (tNode.type !== 0 /* Container */ && isLContainer(slotValue)) {
        // Nodes that inject ViewContainerRef also have a comment node that should be moved
        appendChild(tView, lView, slotValue[NATIVE], tNode);
    }
    return tNode;
}
/**
 * Handles message string post-processing for internationalization.
 *
 * Handles message string post-processing by transforming it from intermediate
 * format (that might contain some markers that we need to replace) to the final
 * form, consumable by i18nStart instruction. Post processing steps include:
 *
 * 1. Resolve all multi-value cases (like [�*1:1��#2:1�|�#4:1�|�5�])
 * 2. Replace all ICU vars (like "VAR_PLURAL")
 * 3. Replace all placeholders used inside ICUs in a form of {PLACEHOLDER}
 * 4. Replace all ICU references with corresponding values (like �ICU_EXP_ICU_1�)
 *    in case multiple ICUs have the same placeholder name
 *
 * @param message Raw translation string for post processing
 * @param replacements Set of replacements that should be applied
 *
 * @returns Transformed string that can be consumed by i18nStart instruction
 *
 * @codeGenApi
 */
export function ɵɵi18nPostprocess(message, replacements) {
    if (replacements === void 0) { replacements = {}; }
    /**
     * Step 1: resolve all multi-value placeholders like [�#5�|�*1:1��#2:1�|�#4:1�]
     *
     * Note: due to the way we process nested templates (BFS), multi-value placeholders are typically
     * grouped by templates, for example: [�#5�|�#6�|�#1:1�|�#3:2�] where �#5� and �#6� belong to root
     * template, �#1:1� belong to nested template with index 1 and �#1:2� - nested template with index
     * 3. However in real templates the order might be different: i.e. �#1:1� and/or �#3:2� may go in
     * front of �#6�. The post processing step restores the right order by keeping track of the
     * template id stack and looks for placeholders that belong to the currently active template.
     */
    var result = message;
    if (PP_MULTI_VALUE_PLACEHOLDERS_REGEXP.test(message)) {
        var matches_1 = {};
        var templateIdsStack_1 = [ROOT_TEMPLATE_ID];
        result = result.replace(PP_PLACEHOLDERS_REGEXP, function (m, phs, tmpl) {
            var content = phs || tmpl;
            var placeholders = matches_1[content] || [];
            if (!placeholders.length) {
                content.split('|').forEach(function (placeholder) {
                    var match = placeholder.match(PP_TEMPLATE_ID_REGEXP);
                    var templateId = match ? parseInt(match[1], 10) : ROOT_TEMPLATE_ID;
                    var isCloseTemplateTag = PP_CLOSE_TEMPLATE_REGEXP.test(placeholder);
                    placeholders.push([templateId, isCloseTemplateTag, placeholder]);
                });
                matches_1[content] = placeholders;
            }
            if (!placeholders.length) {
                throw new Error("i18n postprocess: unmatched placeholder - " + content);
            }
            var currentTemplateId = templateIdsStack_1[templateIdsStack_1.length - 1];
            var idx = 0;
            // find placeholder index that matches current template id
            for (var i = 0; i < placeholders.length; i++) {
                if (placeholders[i][0] === currentTemplateId) {
                    idx = i;
                    break;
                }
            }
            // update template id stack based on the current tag extracted
            var _a = __read(placeholders[idx], 3), templateId = _a[0], isCloseTemplateTag = _a[1], placeholder = _a[2];
            if (isCloseTemplateTag) {
                templateIdsStack_1.pop();
            }
            else if (currentTemplateId !== templateId) {
                templateIdsStack_1.push(templateId);
            }
            // remove processed tag from the list
            placeholders.splice(idx, 1);
            return placeholder;
        });
    }
    // return current result if no replacements specified
    if (!Object.keys(replacements).length) {
        return result;
    }
    /**
     * Step 2: replace all ICU vars (like "VAR_PLURAL")
     */
    result = result.replace(PP_ICU_VARS_REGEXP, function (match, start, key, _type, _idx, end) {
        return replacements.hasOwnProperty(key) ? "" + start + replacements[key] + end : match;
    });
    /**
     * Step 3: replace all placeholders used inside ICUs in a form of {PLACEHOLDER}
     */
    result = result.replace(PP_ICU_PLACEHOLDERS_REGEXP, function (match, key) {
        return replacements.hasOwnProperty(key) ? replacements[key] : match;
    });
    /**
     * Step 4: replace all ICU references with corresponding values (like �ICU_EXP_ICU_1�) in case
     * multiple ICUs have the same placeholder name
     */
    result = result.replace(PP_ICUS_REGEXP, function (match, key) {
        if (replacements.hasOwnProperty(key)) {
            var list = replacements[key];
            if (!list.length) {
                throw new Error("i18n postprocess: unmatched ICU - " + match + " with key: " + key);
            }
            return list.shift();
        }
        return match;
    });
    return result;
}
/**
 * Translates a translation block marked by `i18nStart` and `i18nEnd`. It inserts the text/ICU nodes
 * into the render tree, moves the placeholder nodes and removes the deleted nodes.
 *
 * @codeGenApi
 */
export function ɵɵi18nEnd() {
    var lView = getLView();
    var tView = getTView();
    ngDevMode && assertDefined(tView, "tView should be defined");
    i18nEndFirstPass(tView, lView);
    // Stop delaying projections
    setDelayProjection(false);
}
/**
 * See `i18nEnd` above.
 */
function i18nEndFirstPass(tView, lView) {
    ngDevMode && assertEqual(getBindingIndex(), tView.bindingStartIndex, 'i18nEnd should be called before any binding');
    var rootIndex = i18nIndexStack[i18nIndexStackPointer--];
    var tI18n = tView.data[rootIndex + HEADER_OFFSET];
    ngDevMode && assertDefined(tI18n, "You should call i18nStart before i18nEnd");
    // Find the last node that was added before `i18nEnd`
    var lastCreatedNode = getPreviousOrParentTNode();
    // Read the instructions to insert/move/remove DOM elements
    var visitedNodes = readCreateOpCodes(rootIndex, tI18n.create, tView, lView);
    // Remove deleted nodes
    var index = rootIndex + 1;
    while (index <= lastCreatedNode.index - HEADER_OFFSET) {
        if (visitedNodes.indexOf(index) === -1) {
            removeNode(tView, lView, index, /* markAsDetached */ true);
        }
        // Check if an element has any local refs and skip them
        var tNode = getTNode(tView, index);
        if (tNode && (tNode.type === 0 /* Container */ || tNode.type === 3 /* Element */ ||
            tNode.type === 4 /* ElementContainer */) &&
            tNode.localNames !== null) {
            // Divide by 2 to get the number of local refs,
            // since they are stored as an array that also includes directive indexes,
            // i.e. ["localRef", directiveIndex, ...]
            index += tNode.localNames.length >> 1;
        }
        index++;
    }
}
/**
 * Creates and stores the dynamic TNode, and unhooks it from the tree for now.
 */
function createDynamicNodeAtIndex(tView, lView, index, type, native, name) {
    var previousOrParentTNode = getPreviousOrParentTNode();
    ngDevMode && assertDataInRange(lView, index + HEADER_OFFSET);
    lView[index + HEADER_OFFSET] = native;
    var tNode = getOrCreateTNode(tView, lView[T_HOST], index, type, name, null);
    // We are creating a dynamic node, the previous tNode might not be pointing at this node.
    // We will link ourselves into the tree later with `appendI18nNode`.
    if (previousOrParentTNode && previousOrParentTNode.next === tNode) {
        previousOrParentTNode.next = null;
    }
    return tNode;
}
function readCreateOpCodes(index, createOpCodes, tView, lView) {
    var renderer = lView[RENDERER];
    var currentTNode = null;
    var previousTNode = null;
    var visitedNodes = [];
    for (var i = 0; i < createOpCodes.length; i++) {
        var opCode = createOpCodes[i];
        if (typeof opCode == 'string') {
            var textRNode = createTextNode(opCode, renderer);
            var textNodeIndex = createOpCodes[++i];
            ngDevMode && ngDevMode.rendererCreateTextNode++;
            previousTNode = currentTNode;
            currentTNode =
                createDynamicNodeAtIndex(tView, lView, textNodeIndex, 3 /* Element */, textRNode, null);
            visitedNodes.push(textNodeIndex);
            setIsNotParent();
        }
        else if (typeof opCode == 'number') {
            switch (opCode & 7 /* MASK_OPCODE */) {
                case 1 /* AppendChild */:
                    var destinationNodeIndex = opCode >>> 17 /* SHIFT_PARENT */;
                    var destinationTNode = void 0;
                    if (destinationNodeIndex === index) {
                        // If the destination node is `i18nStart`, we don't have a
                        // top-level node and we should use the host node instead
                        destinationTNode = lView[T_HOST];
                    }
                    else {
                        destinationTNode = getTNode(tView, destinationNodeIndex);
                    }
                    ngDevMode &&
                        assertDefined(currentTNode, "You need to create or select a node before you can insert it into the DOM");
                    previousTNode =
                        appendI18nNode(tView, currentTNode, destinationTNode, previousTNode, lView);
                    break;
                case 0 /* Select */:
                    // Negative indicies indicate that a given TNode is a sibling node, not a parent node
                    // (see `i18nStartFirstPass` for additional information).
                    var isParent = opCode >= 0;
                    var nodeIndex = (isParent ? opCode : ~opCode) >>> 3 /* SHIFT_REF */;
                    visitedNodes.push(nodeIndex);
                    previousTNode = currentTNode;
                    currentTNode = getTNode(tView, nodeIndex);
                    if (currentTNode) {
                        setPreviousOrParentTNode(currentTNode, isParent);
                    }
                    break;
                case 5 /* ElementEnd */:
                    var elementIndex = opCode >>> 3 /* SHIFT_REF */;
                    previousTNode = currentTNode = getTNode(tView, elementIndex);
                    setPreviousOrParentTNode(currentTNode, false);
                    break;
                case 4 /* Attr */:
                    var elementNodeIndex = opCode >>> 3 /* SHIFT_REF */;
                    var attrName = createOpCodes[++i];
                    var attrValue = createOpCodes[++i];
                    // This code is used for ICU expressions only, since we don't support
                    // directives/components in ICUs, we don't need to worry about inputs here
                    elementAttributeInternal(elementNodeIndex, attrName, attrValue, tView, lView);
                    break;
                default:
                    throw new Error("Unable to determine the type of mutate operation for \"" + opCode + "\"");
            }
        }
        else {
            switch (opCode) {
                case COMMENT_MARKER:
                    var commentValue = createOpCodes[++i];
                    var commentNodeIndex = createOpCodes[++i];
                    ngDevMode && assertEqual(typeof commentValue, 'string', "Expected \"" + commentValue + "\" to be a comment node value");
                    var commentRNode = renderer.createComment(commentValue);
                    ngDevMode && ngDevMode.rendererCreateComment++;
                    previousTNode = currentTNode;
                    currentTNode = createDynamicNodeAtIndex(tView, lView, commentNodeIndex, 5 /* IcuContainer */, commentRNode, null);
                    visitedNodes.push(commentNodeIndex);
                    attachPatchData(commentRNode, lView);
                    currentTNode.activeCaseIndex = null;
                    // We will add the case nodes later, during the update phase
                    setIsNotParent();
                    break;
                case ELEMENT_MARKER:
                    var tagNameValue = createOpCodes[++i];
                    var elementNodeIndex = createOpCodes[++i];
                    ngDevMode && assertEqual(typeof tagNameValue, 'string', "Expected \"" + tagNameValue + "\" to be an element node tag name");
                    var elementRNode = renderer.createElement(tagNameValue);
                    ngDevMode && ngDevMode.rendererCreateElement++;
                    previousTNode = currentTNode;
                    currentTNode = createDynamicNodeAtIndex(tView, lView, elementNodeIndex, 3 /* Element */, elementRNode, tagNameValue);
                    visitedNodes.push(elementNodeIndex);
                    break;
                default:
                    throw new Error("Unable to determine the type of mutate operation for \"" + opCode + "\"");
            }
        }
    }
    setIsNotParent();
    return visitedNodes;
}
function readUpdateOpCodes(updateOpCodes, icus, bindingsStartIndex, changeMask, tView, lView, bypassCheckBit) {
    if (bypassCheckBit === void 0) { bypassCheckBit = false; }
    var caseCreated = false;
    for (var i = 0; i < updateOpCodes.length; i++) {
        // bit code to check if we should apply the next update
        var checkBit = updateOpCodes[i];
        // Number of opCodes to skip until next set of update codes
        var skipCodes = updateOpCodes[++i];
        if (bypassCheckBit || (checkBit & changeMask)) {
            // The value has been updated since last checked
            var value = '';
            for (var j = i + 1; j <= (i + skipCodes); j++) {
                var opCode = updateOpCodes[j];
                if (typeof opCode == 'string') {
                    value += opCode;
                }
                else if (typeof opCode == 'number') {
                    if (opCode < 0) {
                        // It's a binding index whose value is negative
                        value += renderStringify(lView[bindingsStartIndex - opCode]);
                    }
                    else {
                        var nodeIndex = opCode >>> 2 /* SHIFT_REF */;
                        var tIcuIndex = void 0;
                        var tIcu = void 0;
                        var icuTNode = void 0;
                        switch (opCode & 3 /* MASK_OPCODE */) {
                            case 1 /* Attr */:
                                var propName = updateOpCodes[++j];
                                var sanitizeFn = updateOpCodes[++j];
                                elementPropertyInternal(tView, lView, nodeIndex, propName, value, sanitizeFn);
                                break;
                            case 0 /* Text */:
                                textBindingInternal(lView, nodeIndex, value);
                                break;
                            case 2 /* IcuSwitch */:
                                tIcuIndex = updateOpCodes[++j];
                                tIcu = icus[tIcuIndex];
                                icuTNode = getTNode(tView, nodeIndex);
                                // If there is an active case, delete the old nodes
                                if (icuTNode.activeCaseIndex !== null) {
                                    var removeCodes = tIcu.remove[icuTNode.activeCaseIndex];
                                    for (var k = 0; k < removeCodes.length; k++) {
                                        var removeOpCode = removeCodes[k];
                                        switch (removeOpCode & 7 /* MASK_OPCODE */) {
                                            case 3 /* Remove */:
                                                var nodeIndex_1 = removeOpCode >>> 3 /* SHIFT_REF */;
                                                // Remove DOM element, but do *not* mark TNode as detached, since we are
                                                // just switching ICU cases (while keeping the same TNode), so a DOM element
                                                // representing a new ICU case will be re-created.
                                                removeNode(tView, lView, nodeIndex_1, /* markAsDetached */ false);
                                                break;
                                            case 6 /* RemoveNestedIcu */:
                                                var nestedIcuNodeIndex = removeCodes[k + 1] >>> 3 /* SHIFT_REF */;
                                                var nestedIcuTNode = getTNode(tView, nestedIcuNodeIndex);
                                                var activeIndex = nestedIcuTNode.activeCaseIndex;
                                                if (activeIndex !== null) {
                                                    var nestedIcuTIndex = removeOpCode >>> 3 /* SHIFT_REF */;
                                                    var nestedTIcu = icus[nestedIcuTIndex];
                                                    addAllToArray(nestedTIcu.remove[activeIndex], removeCodes);
                                                }
                                                break;
                                        }
                                    }
                                }
                                // Update the active caseIndex
                                var caseIndex = getCaseIndex(tIcu, value);
                                icuTNode.activeCaseIndex = caseIndex !== -1 ? caseIndex : null;
                                if (caseIndex > -1) {
                                    // Add the nodes for the new case
                                    readCreateOpCodes(-1, tIcu.create[caseIndex], tView, lView);
                                    caseCreated = true;
                                }
                                break;
                            case 3 /* IcuUpdate */:
                                tIcuIndex = updateOpCodes[++j];
                                tIcu = icus[tIcuIndex];
                                icuTNode = getTNode(tView, nodeIndex);
                                if (icuTNode.activeCaseIndex !== null) {
                                    readUpdateOpCodes(tIcu.update[icuTNode.activeCaseIndex], icus, bindingsStartIndex, changeMask, tView, lView, caseCreated);
                                }
                                break;
                        }
                    }
                }
            }
        }
        i += skipCodes;
    }
}
function removeNode(tView, lView, index, markAsDetached) {
    var removedPhTNode = getTNode(tView, index);
    var removedPhRNode = getNativeByIndex(index, lView);
    if (removedPhRNode) {
        nativeRemoveNode(lView[RENDERER], removedPhRNode);
    }
    var slotValue = load(lView, index);
    if (isLContainer(slotValue)) {
        var lContainer = slotValue;
        if (removedPhTNode.type !== 0 /* Container */) {
            nativeRemoveNode(lView[RENDERER], lContainer[NATIVE]);
        }
    }
    if (markAsDetached) {
        // Define this node as detached to avoid projecting it later
        removedPhTNode.flags |= 64 /* isDetached */;
    }
    ngDevMode && ngDevMode.rendererRemoveNode++;
}
/**
 *
 * Use this instruction to create a translation block that doesn't contain any placeholder.
 * It calls both {@link i18nStart} and {@link i18nEnd} in one instruction.
 *
 * The translation `message` is the value which is locale specific. The translation string may
 * contain placeholders which associate inner elements and sub-templates within the translation.
 *
 * The translation `message` placeholders are:
 * - `�{index}(:{block})�`: *Binding Placeholder*: Marks a location where an expression will be
 *   interpolated into. The placeholder `index` points to the expression binding index. An optional
 *   `block` that matches the sub-template in which it was declared.
 * - `�#{index}(:{block})�`/`�/#{index}(:{block})�`: *Element Placeholder*:  Marks the beginning
 *   and end of DOM element that were embedded in the original translation block. The placeholder
 *   `index` points to the element index in the template instructions set. An optional `block` that
 *   matches the sub-template in which it was declared.
 * - `�*{index}:{block}�`/`�/*{index}:{block}�`: *Sub-template Placeholder*: Sub-templates must be
 *   split up and translated separately in each angular template function. The `index` points to the
 *   `template` instruction index. A `block` that matches the sub-template in which it was declared.
 *
 * @param index A unique index of the translation in the static block.
 * @param message The translation message.
 * @param subTemplateIndex Optional sub-template index in the `message`.
 *
 * @codeGenApi
 */
export function ɵɵi18n(index, message, subTemplateIndex) {
    ɵɵi18nStart(index, message, subTemplateIndex);
    ɵɵi18nEnd();
}
/**
 * Marks a list of attributes as translatable.
 *
 * @param index A unique index in the static block
 * @param values
 *
 * @codeGenApi
 */
export function ɵɵi18nAttributes(index, values) {
    var lView = getLView();
    var tView = getTView();
    ngDevMode && assertDefined(tView, "tView should be defined");
    i18nAttributesFirstPass(lView, tView, index, values);
}
/**
 * See `i18nAttributes` above.
 */
function i18nAttributesFirstPass(lView, tView, index, values) {
    var previousElement = getPreviousOrParentTNode();
    var previousElementIndex = previousElement.index - HEADER_OFFSET;
    var updateOpCodes = [];
    for (var i = 0; i < values.length; i += 2) {
        var attrName = values[i];
        var message = values[i + 1];
        var parts = message.split(ICU_REGEXP);
        for (var j = 0; j < parts.length; j++) {
            var value = parts[j];
            if (j & 1) {
                // Odd indexes are ICU expressions
                // TODO(ocombe): support ICU expressions in attributes
                throw new Error('ICU expressions are not yet supported in attributes');
            }
            else if (value !== '') {
                // Even indexes are text (including bindings)
                var hasBinding = !!value.match(BINDING_REGEXP);
                if (hasBinding) {
                    if (tView.firstCreatePass && tView.data[index + HEADER_OFFSET] === null) {
                        addAllToArray(generateBindingUpdateOpCodes(value, previousElementIndex, attrName), updateOpCodes);
                    }
                }
                else {
                    var tNode = getTNode(tView, previousElementIndex);
                    // Set attributes for Elements only, for other types (like ElementContainer),
                    // only set inputs below
                    if (tNode.type === 3 /* Element */) {
                        elementAttributeInternal(previousElementIndex, attrName, value, tView, lView);
                    }
                    // Check if that attribute is a directive input
                    var dataValue = tNode.inputs !== null && tNode.inputs[attrName];
                    if (dataValue) {
                        setInputsForProperty(tView, lView, dataValue, attrName, value);
                        if (ngDevMode) {
                            var element = getNativeByIndex(previousElementIndex, lView);
                            setNgReflectProperties(lView, element, tNode.type, dataValue, value);
                        }
                    }
                }
            }
        }
    }
    if (tView.firstCreatePass && tView.data[index + HEADER_OFFSET] === null) {
        tView.data[index + HEADER_OFFSET] = updateOpCodes;
    }
}
var changeMask = 0;
var shiftsCounter = 0;
/**
 * Stores the values of the bindings during each update cycle in order to determine if we need to
 * update the translated nodes.
 *
 * @param value The binding's value
 * @returns This function returns itself so that it may be chained
 * (e.g. `i18nExp(ctx.name)(ctx.title)`)
 *
 * @codeGenApi
 */
export function ɵɵi18nExp(value) {
    var lView = getLView();
    if (bindingUpdated(lView, nextBindingIndex(), value)) {
        changeMask = changeMask | (1 << shiftsCounter);
    }
    shiftsCounter++;
    return ɵɵi18nExp;
}
/**
 * Updates a translation block or an i18n attribute when the bindings have changed.
 *
 * @param index Index of either {@link i18nStart} (translation block) or {@link i18nAttributes}
 * (i18n attribute) on which it should update the content.
 *
 * @codeGenApi
 */
export function ɵɵi18nApply(index) {
    if (shiftsCounter) {
        var tView = getTView();
        ngDevMode && assertDefined(tView, "tView should be defined");
        var tI18n = tView.data[index + HEADER_OFFSET];
        var updateOpCodes = void 0;
        var icus = null;
        if (Array.isArray(tI18n)) {
            updateOpCodes = tI18n;
        }
        else {
            updateOpCodes = tI18n.update;
            icus = tI18n.icus;
        }
        var bindingsStartIndex = getBindingIndex() - shiftsCounter - 1;
        var lView = getLView();
        readUpdateOpCodes(updateOpCodes, icus, bindingsStartIndex, changeMask, tView, lView);
        // Reset changeMask & maskBit to default for the next update cycle
        changeMask = 0;
        shiftsCounter = 0;
    }
}
/**
 * Returns the index of the current case of an ICU expression depending on the main binding value
 *
 * @param icuExpression
 * @param bindingValue The value of the main binding used by this ICU expression
 */
function getCaseIndex(icuExpression, bindingValue) {
    var index = icuExpression.cases.indexOf(bindingValue);
    if (index === -1) {
        switch (icuExpression.type) {
            case 1 /* plural */: {
                var resolvedCase = getPluralCase(bindingValue, getLocaleId());
                index = icuExpression.cases.indexOf(resolvedCase);
                if (index === -1 && resolvedCase !== 'other') {
                    index = icuExpression.cases.indexOf('other');
                }
                break;
            }
            case 0 /* select */: {
                index = icuExpression.cases.indexOf('other');
                break;
            }
        }
    }
    return index;
}
/**
 * Generate the OpCodes for ICU expressions.
 *
 * @param tIcus
 * @param icuExpression
 * @param startIndex
 * @param expandoStartIndex
 */
function icuStart(tIcus, icuExpression, startIndex, expandoStartIndex) {
    var createCodes = [];
    var removeCodes = [];
    var updateCodes = [];
    var vars = [];
    var childIcus = [];
    for (var i = 0; i < icuExpression.values.length; i++) {
        // Each value is an array of strings & other ICU expressions
        var valueArr = icuExpression.values[i];
        var nestedIcus = [];
        for (var j = 0; j < valueArr.length; j++) {
            var value = valueArr[j];
            if (typeof value !== 'string') {
                // It is an nested ICU expression
                var icuIndex = nestedIcus.push(value) - 1;
                // Replace nested ICU expression by a comment node
                valueArr[j] = "<!--\uFFFD" + icuIndex + "\uFFFD-->";
            }
        }
        var icuCase = parseIcuCase(valueArr.join(''), startIndex, nestedIcus, tIcus, expandoStartIndex);
        createCodes.push(icuCase.create);
        removeCodes.push(icuCase.remove);
        updateCodes.push(icuCase.update);
        vars.push(icuCase.vars);
        childIcus.push(icuCase.childIcus);
    }
    var tIcu = {
        type: icuExpression.type,
        vars: vars,
        childIcus: childIcus,
        cases: icuExpression.cases,
        create: createCodes,
        remove: removeCodes,
        update: updateCodes
    };
    tIcus.push(tIcu);
    // Adding the maximum possible of vars needed (based on the cases with the most vars)
    i18nVarsCount += Math.max.apply(Math, __spread(vars));
}
/**
 * Transforms a string template into an HTML template and a list of instructions used to update
 * attributes or nodes that contain bindings.
 *
 * @param unsafeHtml The string to parse
 * @param parentIndex
 * @param nestedIcus
 * @param tIcus
 * @param expandoStartIndex
 */
function parseIcuCase(unsafeHtml, parentIndex, nestedIcus, tIcus, expandoStartIndex) {
    var inertBodyHelper = new InertBodyHelper(getDocument());
    var inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
    if (!inertBodyElement) {
        throw new Error('Unable to generate inert body element');
    }
    var wrapper = getTemplateContent(inertBodyElement) || inertBodyElement;
    var opCodes = { vars: 0, childIcus: [], create: [], remove: [], update: [] };
    parseNodes(wrapper.firstChild, opCodes, parentIndex, nestedIcus, tIcus, expandoStartIndex);
    return opCodes;
}
var NESTED_ICU = /�(\d+)�/;
/**
 * Parses a node, its children and its siblings, and generates the mutate & update OpCodes.
 *
 * @param currentNode The first node to parse
 * @param icuCase The data for the ICU expression case that contains those nodes
 * @param parentIndex Index of the current node's parent
 * @param nestedIcus Data for the nested ICU expressions that this case contains
 * @param tIcus Data for all ICU expressions of the current message
 * @param expandoStartIndex Expando start index for the current ICU expression
 */
function parseNodes(currentNode, icuCase, parentIndex, nestedIcus, tIcus, expandoStartIndex) {
    if (currentNode) {
        var nestedIcusToCreate = [];
        while (currentNode) {
            var nextNode = currentNode.nextSibling;
            var newIndex = expandoStartIndex + ++icuCase.vars;
            switch (currentNode.nodeType) {
                case Node.ELEMENT_NODE:
                    var element = currentNode;
                    var tagName = element.tagName.toLowerCase();
                    if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
                        // This isn't a valid element, we won't create an element for it
                        icuCase.vars--;
                    }
                    else {
                        icuCase.create.push(ELEMENT_MARKER, tagName, newIndex, parentIndex << 17 /* SHIFT_PARENT */ | 1 /* AppendChild */);
                        var elAttrs = element.attributes;
                        for (var i = 0; i < elAttrs.length; i++) {
                            var attr = elAttrs.item(i);
                            var lowerAttrName = attr.name.toLowerCase();
                            var hasBinding_1 = !!attr.value.match(BINDING_REGEXP);
                            // we assume the input string is safe, unless it's using a binding
                            if (hasBinding_1) {
                                if (VALID_ATTRS.hasOwnProperty(lowerAttrName)) {
                                    if (URI_ATTRS[lowerAttrName]) {
                                        addAllToArray(generateBindingUpdateOpCodes(attr.value, newIndex, attr.name, _sanitizeUrl), icuCase.update);
                                    }
                                    else if (SRCSET_ATTRS[lowerAttrName]) {
                                        addAllToArray(generateBindingUpdateOpCodes(attr.value, newIndex, attr.name, sanitizeSrcset), icuCase.update);
                                    }
                                    else {
                                        addAllToArray(generateBindingUpdateOpCodes(attr.value, newIndex, attr.name), icuCase.update);
                                    }
                                }
                                else {
                                    ngDevMode &&
                                        console.warn("WARNING: ignoring unsafe attribute value " + lowerAttrName + " on element " + tagName + " (see http://g.co/ng/security#xss)");
                                }
                            }
                            else {
                                icuCase.create.push(newIndex << 3 /* SHIFT_REF */ | 4 /* Attr */, attr.name, attr.value);
                            }
                        }
                        // Parse the children of this node (if any)
                        parseNodes(currentNode.firstChild, icuCase, newIndex, nestedIcus, tIcus, expandoStartIndex);
                        // Remove the parent node after the children
                        icuCase.remove.push(newIndex << 3 /* SHIFT_REF */ | 3 /* Remove */);
                    }
                    break;
                case Node.TEXT_NODE:
                    var value = currentNode.textContent || '';
                    var hasBinding = value.match(BINDING_REGEXP);
                    icuCase.create.push(hasBinding ? '' : value, newIndex, parentIndex << 17 /* SHIFT_PARENT */ | 1 /* AppendChild */);
                    icuCase.remove.push(newIndex << 3 /* SHIFT_REF */ | 3 /* Remove */);
                    if (hasBinding) {
                        addAllToArray(generateBindingUpdateOpCodes(value, newIndex), icuCase.update);
                    }
                    break;
                case Node.COMMENT_NODE:
                    // Check if the comment node is a placeholder for a nested ICU
                    var match = NESTED_ICU.exec(currentNode.textContent || '');
                    if (match) {
                        var nestedIcuIndex = parseInt(match[1], 10);
                        var newLocal = ngDevMode ? "nested ICU " + nestedIcuIndex : '';
                        // Create the comment node that will anchor the ICU expression
                        icuCase.create.push(COMMENT_MARKER, newLocal, newIndex, parentIndex << 17 /* SHIFT_PARENT */ | 1 /* AppendChild */);
                        var nestedIcu = nestedIcus[nestedIcuIndex];
                        nestedIcusToCreate.push([nestedIcu, newIndex]);
                    }
                    else {
                        // We do not handle any other type of comment
                        icuCase.vars--;
                    }
                    break;
                default:
                    // We do not handle any other type of element
                    icuCase.vars--;
            }
            currentNode = nextNode;
        }
        for (var i = 0; i < nestedIcusToCreate.length; i++) {
            var nestedIcu = nestedIcusToCreate[i][0];
            var nestedIcuNodeIndex = nestedIcusToCreate[i][1];
            icuStart(tIcus, nestedIcu, nestedIcuNodeIndex, expandoStartIndex + icuCase.vars);
            // Since this is recursive, the last TIcu that was pushed is the one we want
            var nestTIcuIndex = tIcus.length - 1;
            icuCase.vars += Math.max.apply(Math, __spread(tIcus[nestTIcuIndex].vars));
            icuCase.childIcus.push(nestTIcuIndex);
            var mask = getBindingMask(nestedIcu);
            icuCase.update.push(toMaskBit(nestedIcu.mainBinding), // mask of the main binding
            3, // skip 3 opCodes if not changed
            -1 - nestedIcu.mainBinding, nestedIcuNodeIndex << 2 /* SHIFT_REF */ | 2 /* IcuSwitch */, nestTIcuIndex, mask, // mask of all the bindings of this ICU expression
            2, // skip 2 opCodes if not changed
            nestedIcuNodeIndex << 2 /* SHIFT_REF */ | 3 /* IcuUpdate */, nestTIcuIndex);
            icuCase.remove.push(nestTIcuIndex << 3 /* SHIFT_REF */ | 6 /* RemoveNestedIcu */, nestedIcuNodeIndex << 3 /* SHIFT_REF */ | 3 /* Remove */);
        }
    }
}
/**
 * Angular Dart introduced &ngsp; as a placeholder for non-removable space, see:
 * https://github.com/dart-lang/angular/blob/0bb611387d29d65b5af7f9d2515ab571fd3fbee4/_tests/test/compiler/preserve_whitespace_test.dart#L25-L32
 * In Angular Dart &ngsp; is converted to the 0xE500 PUA (Private Use Areas) unicode character
 * and later on replaced by a space. We are re-implementing the same idea here, since translations
 * might contain this special character.
 */
var NGSP_UNICODE_REGEXP = /\uE500/g;
function replaceNgsp(value) {
    return value.replace(NGSP_UNICODE_REGEXP, ' ');
}
/**
 * The locale id that the application is currently using (for translations and ICU expressions).
 * This is the ivy version of `LOCALE_ID` that was defined as an injection token for the view engine
 * but is now defined as a global value.
 */
var LOCALE_ID = DEFAULT_LOCALE_ID;
/**
 * Sets the locale id that will be used for translations and ICU expressions.
 * This is the ivy version of `LOCALE_ID` that was defined as an injection token for the view engine
 * but is now defined as a global value.
 *
 * @param localeId
 */
export function setLocaleId(localeId) {
    assertDefined(localeId, "Expected localeId to be defined");
    if (typeof localeId === 'string') {
        LOCALE_ID = localeId.toLowerCase().replace(/_/g, '-');
    }
}
/**
 * Gets the locale id that will be used for translations and ICU expressions.
 * This is the ivy version of `LOCALE_ID` that was defined as an injection token for the view engine
 * but is now defined as a global value.
 */
export function getLocaleId() {
    return LOCALE_ID;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyw4QkFBOEIsQ0FBQztBQUV0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDMUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMzTCxPQUFPLEVBQWEsTUFBTSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFpRyxNQUFNLG1CQUFtQixDQUFDO0FBSWpLLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsYUFBYSxFQUFTLFFBQVEsRUFBZ0IsTUFBTSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkYsT0FBTyxFQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkcsT0FBTyxFQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDL0osT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHckYsSUFBTSxNQUFNLEdBQUcsUUFBRyxDQUFDO0FBQ25CLElBQU0sZ0JBQWdCLEdBQUcsNENBQTRDLENBQUM7QUFDdEUsSUFBTSxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNoRCxJQUFNLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztBQUMzQyxJQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUN4QyxJQUFNLFVBQVUsR0FBRyw0Q0FBNEMsQ0FBQztBQU9oRSx5QkFBeUI7QUFDekIsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsSUFBTSxrQ0FBa0MsR0FBRyxjQUFjLENBQUM7QUFDMUQsSUFBTSxzQkFBc0IsR0FBRyxnQ0FBZ0MsQ0FBQztBQUNoRSxJQUFNLGtCQUFrQixHQUFHLDJDQUEyQyxDQUFDO0FBQ3ZFLElBQU0sMEJBQTBCLEdBQUcsaUJBQWlCLENBQUM7QUFDckQsSUFBTSxjQUFjLEdBQUcsMEJBQTBCLENBQUM7QUFDbEQsSUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUM7QUFDeEMsSUFBTSxxQkFBcUIsR0FBRyxZQUFZLENBQUM7QUE0QzNDOzs7Ozs7OztHQVFHO0FBQ0gsU0FBUyxZQUFZLENBQUMsT0FBZTtJQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdEIsSUFBTSxPQUFPLEdBQStCLEVBQUUsQ0FBQztJQUMvQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDdkIsZ0RBQWdEO0lBQ2hELE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBRXJCLElBQUksS0FBSyxDQUFDO0lBQ1YsT0FBTyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNuQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFakIsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDMUIsb0JBQW9CO2dCQUNwQixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JCO2dCQUVELE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1NBQ0Y7YUFBTTtZQUNMLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzFCLElBQU0sV0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVMsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUNuQjtZQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7S0FDRjtJQUVELElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxhQUFhLENBQUMsT0FBZTtJQUNwQyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsSUFBTSxNQUFNLEdBQWlDLEVBQUUsQ0FBQztJQUNoRCxJQUFJLE9BQU8saUJBQWlCLENBQUM7SUFDN0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVMsR0FBVyxFQUFFLE9BQWUsRUFBRSxJQUFZO1FBQzdGLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNyQixPQUFPLGlCQUFpQixDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLGlCQUFpQixDQUFDO1NBQzFCO1FBQ0QsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFhLENBQUM7SUFDaEQsd0VBQXdFO0lBQ3hFLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHO1FBQ3JDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksT0FBTyxtQkFBbUIsRUFBRTtZQUM5QixvQ0FBb0M7WUFDcEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDZCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO1FBRUQsSUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFhLENBQUM7UUFDdEQsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQjtLQUNGO0lBRUQsa0VBQWtFO0lBQ2xFLE9BQU8sRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsS0FBSyxPQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLDhCQUE4QixDQUFDLE9BQWU7SUFDckQsSUFBSSxLQUFLLENBQUM7SUFDVixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxVQUFVLENBQUM7SUFFZixPQUFPLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMxRCxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9ELFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsVUFBVSxHQUFHLElBQUksQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQVEsTUFBTSxVQUFLLFVBQVUsR0FBRyxNQUFRLEVBQUU7Z0JBQ3BELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNwQixVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1NBQ0Y7S0FDRjtJQUVELFNBQVM7UUFDTCxXQUFXLENBQ1AsVUFBVSxFQUFFLEtBQUssRUFDakIsbUZBQWdGLE9BQU8sT0FBRyxDQUFDLENBQUM7SUFFcEcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsT0FBZSxFQUFFLGdCQUF5QjtJQUNsRixJQUFJLE9BQU8sZ0JBQWdCLEtBQUssUUFBUSxFQUFFO1FBQ3hDLDhEQUE4RDtRQUM5RCxPQUFPLDhCQUE4QixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2hEO1NBQU07UUFDTCxrQ0FBa0M7UUFDbEMsSUFBTSxLQUFLLEdBQ1AsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFJLGdCQUFnQixHQUFHLE1BQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDOUYsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBSSxNQUFNLG1CQUFjLGdCQUFnQixHQUFHLE1BQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0YsT0FBTyw4QkFBOEIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3RFO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFTLDRCQUE0QixDQUNqQyxHQUFXLEVBQUUsZUFBdUIsRUFBRSxRQUFpQixFQUN2RCxVQUFxQztJQUFyQywyQkFBQSxFQUFBLGlCQUFxQztJQUN2QyxJQUFNLGFBQWEsR0FBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBRSxnQ0FBZ0M7SUFDeEYsSUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1QyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFFYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsMkJBQTJCO1lBQzNCLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0MsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUN0QyxJQUFJLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN2QzthQUFNLElBQUksU0FBUyxLQUFLLEVBQUUsRUFBRTtZQUMzQix3QkFBd0I7WUFDeEIsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQjtLQUNGO0lBRUQsYUFBYSxDQUFDLElBQUksQ0FDZCxlQUFlLHFCQUE4QjtRQUM3QyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQXVCLENBQUMsYUFBc0IsQ0FBQyxDQUFDLENBQUM7SUFDaEUsSUFBSSxRQUFRLEVBQUU7UUFDWixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMxQztJQUNELGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDeEIsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxhQUE0QixFQUFFLElBQVE7SUFBUixxQkFBQSxFQUFBLFFBQVE7SUFDNUQsSUFBSSxHQUFHLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELElBQUksS0FBSyxDQUFDO0lBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixPQUFPLEtBQUssR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN6QyxJQUFJLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxHQUFHLGNBQWMsQ0FBQyxLQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JEO1NBQ0Y7S0FDRjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVELElBQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUNwQyxJQUFJLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRS9COzs7Ozs7O0dBT0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxZQUFvQjtJQUNyQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsSUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsZ0JBQXlCO0lBQ25GLElBQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFNBQVMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDN0QsY0FBYyxDQUFDLEVBQUUscUJBQXFCLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDaEQsK0NBQStDO0lBQy9DLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLElBQUksS0FBSyxDQUFDLGVBQWUsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkUsa0JBQWtCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztLQUN6RTtBQUNILENBQUM7QUFFRCwyRUFBMkU7QUFDM0Usa0dBQWtHO0FBQ2xHLDBEQUEwRDtBQUMxRCxJQUFJLGFBQXFCLENBQUM7QUFFMUI7O0dBRUc7QUFDSCxTQUFTLGtCQUFrQixDQUN2QixLQUFZLEVBQUUsS0FBWSxFQUFFLEtBQWEsRUFBRSxPQUFlLEVBQUUsZ0JBQXlCO0lBQ3ZGLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztJQUMxRCxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQU0scUJBQXFCLEdBQUcsd0JBQXdCLEVBQUUsQ0FBQztJQUN6RCxJQUFNLFdBQVcsR0FDYixXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLE1BQU0sQ0FBQztJQUNsRyxJQUFJLFdBQVcsR0FDWCxXQUFXLElBQUksV0FBVyxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM3RixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUMzQixnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNuRCxJQUFNLGFBQWEsR0FBc0IsRUFBRSxDQUFDO0lBQzVDLDZGQUE2RjtJQUM3RixrR0FBa0c7SUFDbEcsMEZBQTBGO0lBQzFGLDhGQUE4RjtJQUM5RixzQ0FBc0M7SUFDdEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLHFCQUFxQixLQUFLLFdBQVcsRUFBRTtRQUN0RCxJQUFJLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDckUsNEZBQTRGO1FBQzVGLHlGQUF5RjtRQUN6RixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDbEIsa0JBQWtCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztTQUMxQztRQUNELGdEQUFnRDtRQUNoRCxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixxQkFBOEIsaUJBQTBCLENBQUMsQ0FBQztLQUNoRztJQUNELElBQU0sYUFBYSxHQUFzQixFQUFFLENBQUM7SUFDNUMsSUFBTSxjQUFjLEdBQVcsRUFBRSxDQUFDO0lBRWxDLElBQU0sbUJBQW1CLEdBQUcseUJBQXlCLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDakYsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hDLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDVCw0REFBNEQ7WUFDNUQsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDM0Isc0JBQXNCO2dCQUN0QixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFvQixFQUFFO29CQUN2QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUMsV0FBVyxHQUFHLGdCQUFnQixDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztvQkFDckQsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLHFCQUE4QixxQkFBOEIsQ0FBQyxDQUFDO2lCQUN6RjthQUNGO2lCQUFNO2dCQUNMLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxzQkFBb0IsQ0FBQztnQkFDdEQsMkVBQTJFO2dCQUMzRSw0RkFBNEY7Z0JBQzVGLCtDQUErQztnQkFDL0MsYUFBYSxDQUFDLElBQUksQ0FDZCxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBOEI7a0NBQ25DLEVBQzNCLFdBQVcseUJBQWlDLHNCQUErQixDQUFDLENBQUM7Z0JBRWpGLElBQUksU0FBUyxFQUFFO29CQUNiLGdCQUFnQixDQUFDLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxXQUFXLEdBQUcsT0FBTyxDQUFDO2lCQUNoRTthQUNGO1NBQ0Y7YUFBTTtZQUNMLCtEQUErRDtZQUMvRCxJQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDVCxrQ0FBa0M7b0JBQ2xDLElBQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQWtCLENBQUM7b0JBRWhELHFGQUFxRjtvQkFDckYsMEZBQTBGO29CQUMxRixtREFBbUQ7b0JBQ25ELElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO3dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHlDQUFzQyxtQkFBbUIsZ0JBQVksQ0FBQyxDQUFDO3FCQUN4RjtvQkFFRCw4REFBOEQ7b0JBQzlELElBQU0sWUFBWSxHQUFHLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQztvQkFDbEQsYUFBYSxDQUFDLElBQUksQ0FDZCxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFPLFlBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFlBQVksRUFDcEUsV0FBVyx5QkFBaUMsc0JBQStCLENBQUMsQ0FBQztvQkFFakYsc0NBQXNDO29CQUN0QyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzNDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDcEUsNEVBQTRFO29CQUM1RSxJQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDNUMsYUFBYSxDQUFDLElBQUksQ0FDZCxTQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFHLDJCQUEyQjtvQkFDbEUsQ0FBQyxFQUFzQyxnQ0FBZ0M7b0JBQ3ZFLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQzlCLFlBQVkscUJBQThCLG9CQUE2QixFQUFFLFNBQVMsRUFDbEYsSUFBSSxFQUFHLGtEQUFrRDtvQkFDekQsQ0FBQyxFQUFNLGdDQUFnQztvQkFDdkMsWUFBWSxxQkFBOEIsb0JBQTZCLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3pGO3FCQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDMUIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBVyxDQUFDO29CQUNoQyw2Q0FBNkM7b0JBQzdDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzlDLG9CQUFvQjtvQkFDcEIsSUFBTSxhQUFhLEdBQUcsVUFBVSxHQUFHLGFBQWEsRUFBRSxDQUFDO29CQUNuRCxhQUFhLENBQUMsSUFBSTtvQkFDZCw2REFBNkQ7b0JBQzdELFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUNyQyxXQUFXLHlCQUFpQyxzQkFBK0IsQ0FBQyxDQUFDO29CQUVqRixJQUFJLFVBQVUsRUFBRTt3QkFDZCxhQUFhLENBQUMsNEJBQTRCLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO3FCQUNqRjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjtJQUVELElBQUksYUFBYSxHQUFHLENBQUMsRUFBRTtRQUNyQixZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztLQUMzQztJQUVELFNBQVM7UUFDTCxzQkFBc0IsQ0FDbEIsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUU1RixpRUFBaUU7SUFDakUsSUFBTSxLQUFLLEdBQVU7UUFDbkIsSUFBSSxFQUFFLGFBQWE7UUFDbkIsTUFBTSxFQUFFLGFBQWE7UUFDckIsTUFBTSxFQUFFLGFBQWE7UUFDckIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSTtLQUNwRCxDQUFDO0lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzVDLENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FDbkIsS0FBWSxFQUFFLEtBQVksRUFBRSxXQUFrQixFQUFFLGFBQTJCLEVBQzNFLEtBQVk7SUFDZCxTQUFTLElBQUksU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUMsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2xCLGFBQWEsR0FBRyxXQUFXLENBQUM7S0FDN0I7SUFFRCxrRUFBa0U7SUFDbEUsSUFBSSxhQUFhLEtBQUssV0FBVyxJQUFJLEtBQUssS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ2hFLEtBQUssQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUMvQixXQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUMzQjtTQUFNLElBQUksYUFBYSxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssYUFBYSxDQUFDLElBQUksRUFBRTtRQUN4RSxLQUFLLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDaEMsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDNUI7U0FBTTtRQUNMLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ25CO0lBRUQsSUFBSSxXQUFXLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBMkIsQ0FBQztLQUM1QztJQUVELGlFQUFpRTtJQUNqRSxJQUFJLE1BQU0sR0FBZSxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3BDLE9BQU8sTUFBTSxFQUFFO1FBQ2IsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtZQUN6QixNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztTQUN4QjtRQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0tBQ3RCO0lBRUQsNEZBQTRGO0lBQzVGLElBQUksS0FBSyxDQUFDLElBQUksdUJBQXlCLEVBQUU7UUFDdkMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBd0IsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFakUsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxJQUFJLEtBQUssQ0FBQyxJQUFJLHNCQUF3QixJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNqRSxtRkFBbUY7UUFDbkYsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQzdCLE9BQWUsRUFBRSxZQUF1RDtJQUF2RCw2QkFBQSxFQUFBLGlCQUF1RDtJQUMxRTs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUM7SUFDN0IsSUFBSSxrQ0FBa0MsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDcEQsSUFBTSxTQUFPLEdBQThDLEVBQUUsQ0FBQztRQUM5RCxJQUFNLGtCQUFnQixHQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RCxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxVQUFDLENBQU0sRUFBRSxHQUFXLEVBQUUsSUFBWTtZQUNoRixJQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDO1lBQzVCLElBQU0sWUFBWSxHQUE2QixTQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQW1CO29CQUM3QyxJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7b0JBQ3ZELElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7b0JBQ3JFLElBQU0sa0JBQWtCLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0RSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO2dCQUNILFNBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUM7YUFDakM7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBNkMsT0FBUyxDQUFDLENBQUM7YUFDekU7WUFFRCxJQUFNLGlCQUFpQixHQUFHLGtCQUFnQixDQUFDLGtCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWiwwREFBMEQ7WUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixFQUFFO29CQUM1QyxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNSLE1BQU07aUJBQ1A7YUFDRjtZQUNELDhEQUE4RDtZQUN4RCxJQUFBLGlDQUFpRSxFQUFoRSxrQkFBVSxFQUFFLDBCQUFrQixFQUFFLG1CQUFnQyxDQUFDO1lBQ3hFLElBQUksa0JBQWtCLEVBQUU7Z0JBQ3RCLGtCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hCO2lCQUFNLElBQUksaUJBQWlCLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDbkM7WUFDRCxxQ0FBcUM7WUFDckMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxXQUFXLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELHFEQUFxRDtJQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUU7UUFDckMsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUVEOztPQUVHO0lBQ0gsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7UUFDOUUsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLEtBQUssR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekYsQ0FBQyxDQUFDLENBQUM7SUFFSDs7T0FFRztJQUNILE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLFVBQUMsS0FBSyxFQUFFLEdBQUc7UUFDN0QsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoRixDQUFDLENBQUMsQ0FBQztJQUVIOzs7T0FHRztJQUNILE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFDLEtBQUssRUFBRSxHQUFHO1FBQ2pELElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQyxJQUFNLElBQUksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFhLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXFDLEtBQUssbUJBQWMsR0FBSyxDQUFDLENBQUM7YUFDaEY7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUksQ0FBQztTQUN2QjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsU0FBUztJQUN2QixJQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUN6QixJQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUN6QixTQUFTLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdELGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQiw0QkFBNEI7SUFDNUIsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFZLEVBQUUsS0FBWTtJQUNsRCxTQUFTLElBQUksV0FBVyxDQUNQLGVBQWUsRUFBRSxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFDMUMsNkNBQTZDLENBQUMsQ0FBQztJQUVoRSxJQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQzFELElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBVSxDQUFDO0lBQzdELFNBQVMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLDBDQUEwQyxDQUFDLENBQUM7SUFFOUUscURBQXFEO0lBQ3JELElBQU0sZUFBZSxHQUFHLHdCQUF3QixFQUFFLENBQUM7SUFFbkQsMkRBQTJEO0lBQzNELElBQU0sWUFBWSxHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUU5RSx1QkFBdUI7SUFDdkIsSUFBSSxLQUFLLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUMxQixPQUFPLEtBQUssSUFBSSxlQUFlLENBQUMsS0FBSyxHQUFHLGFBQWEsRUFBRTtRQUNyRCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsdURBQXVEO1FBQ3ZELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxzQkFBd0IsSUFBSSxLQUFLLENBQUMsSUFBSSxvQkFBc0I7WUFDdEUsS0FBSyxDQUFDLElBQUksNkJBQStCLENBQUM7WUFDcEQsS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDN0IsK0NBQStDO1lBQy9DLDBFQUEwRTtZQUMxRSx5Q0FBeUM7WUFDekMsS0FBSyxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUNELEtBQUssRUFBRSxDQUFDO0tBQ1Q7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLHdCQUF3QixDQUM3QixLQUFZLEVBQUUsS0FBWSxFQUFFLEtBQWEsRUFBRSxJQUFlLEVBQUUsTUFBK0IsRUFDM0YsSUFBbUI7SUFDckIsSUFBTSxxQkFBcUIsR0FBRyx3QkFBd0IsRUFBRSxDQUFDO0lBQ3pELFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBQzdELEtBQUssQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3RDLElBQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFckYseUZBQXlGO0lBQ3pGLG9FQUFvRTtJQUNwRSxJQUFJLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDakUscUJBQXFCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNuQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3RCLEtBQWEsRUFBRSxhQUFnQyxFQUFFLEtBQVksRUFBRSxLQUFZO0lBQzdFLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxJQUFJLFlBQVksR0FBZSxJQUFJLENBQUM7SUFDcEMsSUFBSSxhQUFhLEdBQWUsSUFBSSxDQUFDO0lBQ3JDLElBQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QyxJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDN0IsSUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNuRCxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQVcsQ0FBQztZQUNuRCxTQUFTLElBQUksU0FBUyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDaEQsYUFBYSxHQUFHLFlBQVksQ0FBQztZQUM3QixZQUFZO2dCQUNSLHdCQUF3QixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxtQkFBcUIsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlGLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakMsY0FBYyxFQUFFLENBQUM7U0FDbEI7YUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNwQyxRQUFRLE1BQU0sc0JBQStCLEVBQUU7Z0JBQzdDO29CQUNFLElBQU0sb0JBQW9CLEdBQUcsTUFBTSwwQkFBa0MsQ0FBQztvQkFDdEUsSUFBSSxnQkFBZ0IsU0FBTyxDQUFDO29CQUM1QixJQUFJLG9CQUFvQixLQUFLLEtBQUssRUFBRTt3QkFDbEMsMERBQTBEO3dCQUMxRCx5REFBeUQ7d0JBQ3pELGdCQUFnQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUcsQ0FBQztxQkFDcEM7eUJBQU07d0JBQ0wsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO3FCQUMxRDtvQkFDRCxTQUFTO3dCQUNMLGFBQWEsQ0FDVCxZQUFjLEVBQ2QsMkVBQTJFLENBQUMsQ0FBQztvQkFDckYsYUFBYTt3QkFDVCxjQUFjLENBQUMsS0FBSyxFQUFFLFlBQWMsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2xGLE1BQU07Z0JBQ1I7b0JBQ0UscUZBQXFGO29CQUNyRix5REFBeUQ7b0JBQ3pELElBQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQU0sU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHNCQUErQixDQUFDO29CQUMvRSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM3QixhQUFhLEdBQUcsWUFBWSxDQUFDO29CQUM3QixZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLHdCQUF3QixDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztxQkFDbEQ7b0JBQ0QsTUFBTTtnQkFDUjtvQkFDRSxJQUFNLFlBQVksR0FBRyxNQUFNLHNCQUErQixDQUFDO29CQUMzRCxhQUFhLEdBQUcsWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQzdELHdCQUF3QixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDOUMsTUFBTTtnQkFDUjtvQkFDRSxJQUFNLGdCQUFnQixHQUFHLE1BQU0sc0JBQStCLENBQUM7b0JBQy9ELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBVyxDQUFDO29CQUM5QyxJQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQVcsQ0FBQztvQkFDL0MscUVBQXFFO29CQUNyRSwwRUFBMEU7b0JBQzFFLHdCQUF3QixDQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM5RSxNQUFNO2dCQUNSO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsNERBQXlELE1BQU0sT0FBRyxDQUFDLENBQUM7YUFDdkY7U0FDRjthQUFNO1lBQ0wsUUFBUSxNQUFNLEVBQUU7Z0JBQ2QsS0FBSyxjQUFjO29CQUNqQixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQVcsQ0FBQztvQkFDbEQsSUFBTSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQVcsQ0FBQztvQkFDdEQsU0FBUyxJQUFJLFdBQVcsQ0FDUCxPQUFPLFlBQVksRUFBRSxRQUFRLEVBQzdCLGdCQUFhLFlBQVksa0NBQThCLENBQUMsQ0FBQztvQkFDMUUsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDMUQsU0FBUyxJQUFJLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO29CQUMvQyxhQUFhLEdBQUcsWUFBWSxDQUFDO29CQUM3QixZQUFZLEdBQUcsd0JBQXdCLENBQ25DLEtBQUssRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLHdCQUEwQixZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hGLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDcEMsWUFBa0MsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUMzRCw0REFBNEQ7b0JBQzVELGNBQWMsRUFBRSxDQUFDO29CQUNqQixNQUFNO2dCQUNSLEtBQUssY0FBYztvQkFDakIsSUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFXLENBQUM7b0JBQ2xELElBQU0sZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFXLENBQUM7b0JBQ3RELFNBQVMsSUFBSSxXQUFXLENBQ1AsT0FBTyxZQUFZLEVBQUUsUUFBUSxFQUM3QixnQkFBYSxZQUFZLHNDQUFrQyxDQUFDLENBQUM7b0JBQzlFLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzFELFNBQVMsSUFBSSxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztvQkFDL0MsYUFBYSxHQUFHLFlBQVksQ0FBQztvQkFDN0IsWUFBWSxHQUFHLHdCQUF3QixDQUNuQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixtQkFBcUIsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNuRixZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3BDLE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBeUQsTUFBTSxPQUFHLENBQUMsQ0FBQzthQUN2RjtTQUNGO0tBQ0Y7SUFFRCxjQUFjLEVBQUUsQ0FBQztJQUVqQixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBRUQsU0FBUyxpQkFBaUIsQ0FDdEIsYUFBZ0MsRUFBRSxJQUFtQixFQUFFLGtCQUEwQixFQUNqRixVQUFrQixFQUFFLEtBQVksRUFBRSxLQUFZLEVBQUUsY0FBc0I7SUFBdEIsK0JBQUEsRUFBQSxzQkFBc0I7SUFDeEUsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdDLHVEQUF1RDtRQUN2RCxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFXLENBQUM7UUFDNUMsMkRBQTJEO1FBQzNELElBQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBVyxDQUFDO1FBQy9DLElBQUksY0FBYyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxFQUFFO1lBQzdDLGdEQUFnRDtZQUNoRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM3QyxJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxFQUFFO29CQUM3QixLQUFLLElBQUksTUFBTSxDQUFDO2lCQUNqQjtxQkFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsRUFBRTtvQkFDcEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNkLCtDQUErQzt3QkFDL0MsS0FBSyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztxQkFDOUQ7eUJBQU07d0JBQ0wsSUFBTSxTQUFTLEdBQUcsTUFBTSxzQkFBK0IsQ0FBQzt3QkFDeEQsSUFBSSxTQUFTLFNBQVEsQ0FBQzt3QkFDdEIsSUFBSSxJQUFJLFNBQU0sQ0FBQzt3QkFDZixJQUFJLFFBQVEsU0FBbUIsQ0FBQzt3QkFDaEMsUUFBUSxNQUFNLHNCQUErQixFQUFFOzRCQUM3QztnQ0FDRSxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQVcsQ0FBQztnQ0FDOUMsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUF1QixDQUFDO2dDQUM1RCx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dDQUM5RSxNQUFNOzRCQUNSO2dDQUNFLG1CQUFtQixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQzdDLE1BQU07NEJBQ1I7Z0NBQ0UsU0FBUyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBVyxDQUFDO2dDQUN6QyxJQUFJLEdBQUcsSUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dDQUN6QixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQXNCLENBQUM7Z0NBQzNELG1EQUFtRDtnQ0FDbkQsSUFBSSxRQUFRLENBQUMsZUFBZSxLQUFLLElBQUksRUFBRTtvQ0FDckMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7b0NBQzFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dDQUMzQyxJQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFXLENBQUM7d0NBQzlDLFFBQVEsWUFBWSxzQkFBK0IsRUFBRTs0Q0FDbkQ7Z0RBQ0UsSUFBTSxXQUFTLEdBQUcsWUFBWSxzQkFBK0IsQ0FBQztnREFDOUQsd0VBQXdFO2dEQUN4RSw0RUFBNEU7Z0RBQzVFLGtEQUFrRDtnREFDbEQsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBUyxFQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dEQUNoRSxNQUFNOzRDQUNSO2dEQUNFLElBQU0sa0JBQWtCLEdBQ3BCLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFXLHNCQUErQixDQUFDO2dEQUNoRSxJQUFNLGNBQWMsR0FDaEIsUUFBUSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBc0IsQ0FBQztnREFDN0QsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQztnREFDbkQsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO29EQUN4QixJQUFNLGVBQWUsR0FBRyxZQUFZLHNCQUErQixDQUFDO29EQUNwRSxJQUFNLFVBQVUsR0FBRyxJQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7b0RBQzNDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lEQUM1RDtnREFDRCxNQUFNO3lDQUNUO3FDQUNGO2lDQUNGO2dDQUVELDhCQUE4QjtnQ0FDOUIsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQ0FDNUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUMvRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQ0FDbEIsaUNBQWlDO29DQUNqQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztvQ0FDNUQsV0FBVyxHQUFHLElBQUksQ0FBQztpQ0FDcEI7Z0NBQ0QsTUFBTTs0QkFDUjtnQ0FDRSxTQUFTLEdBQUcsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFXLENBQUM7Z0NBQ3pDLElBQUksR0FBRyxJQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ3pCLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBc0IsQ0FBQztnQ0FDM0QsSUFBSSxRQUFRLENBQUMsZUFBZSxLQUFLLElBQUksRUFBRTtvQ0FDckMsaUJBQWlCLENBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFDM0UsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztpQ0FDaEM7Z0NBQ0QsTUFBTTt5QkFDVDtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7UUFDRCxDQUFDLElBQUksU0FBUyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQVksRUFBRSxLQUFZLEVBQUUsS0FBYSxFQUFFLGNBQXVCO0lBQ3BGLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBTSxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELElBQUksY0FBYyxFQUFFO1FBQ2xCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztLQUNuRDtJQUVELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFxQyxDQUFDO0lBQ3pFLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzNCLElBQU0sVUFBVSxHQUFHLFNBQXVCLENBQUM7UUFDM0MsSUFBSSxjQUFjLENBQUMsSUFBSSxzQkFBd0IsRUFBRTtZQUMvQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdkQ7S0FDRjtJQUVELElBQUksY0FBYyxFQUFFO1FBQ2xCLDREQUE0RDtRQUM1RCxjQUFjLENBQUMsS0FBSyx1QkFBeUIsQ0FBQztLQUMvQztJQUNELFNBQVMsSUFBSSxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUM5QyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLFVBQVUsTUFBTSxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsZ0JBQXlCO0lBQzlFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDOUMsU0FBUyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsTUFBZ0I7SUFDOUQsSUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsSUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsU0FBUyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUM3RCx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLHVCQUF1QixDQUFDLEtBQVksRUFBRSxLQUFZLEVBQUUsS0FBYSxFQUFFLE1BQWdCO0lBQzFGLElBQU0sZUFBZSxHQUFHLHdCQUF3QixFQUFFLENBQUM7SUFDbkQsSUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztJQUNuRSxJQUFNLGFBQWEsR0FBc0IsRUFBRSxDQUFDO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNULGtDQUFrQztnQkFDbEMsc0RBQXNEO2dCQUN0RCxNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7YUFDeEU7aUJBQU0sSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO2dCQUN2Qiw2Q0FBNkM7Z0JBQzdDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUN2RSxhQUFhLENBQ1QsNEJBQTRCLENBQUMsS0FBSyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO3FCQUN6RjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7b0JBQ3BELDZFQUE2RTtvQkFDN0Usd0JBQXdCO29CQUN4QixJQUFJLEtBQUssQ0FBQyxJQUFJLG9CQUFzQixFQUFFO3dCQUNwQyx3QkFBd0IsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDL0U7b0JBQ0QsK0NBQStDO29CQUMvQyxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsRSxJQUFJLFNBQVMsRUFBRTt3QkFDYixvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQy9ELElBQUksU0FBUyxFQUFFOzRCQUNiLElBQU0sT0FBTyxHQUFHLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBd0IsQ0FBQzs0QkFDckYsc0JBQXNCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFDdEU7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxHQUFHLGFBQWEsQ0FBQztLQUNuRDtBQUNILENBQUM7QUFFRCxJQUFJLFVBQVUsR0FBRyxDQUFHLENBQUM7QUFDckIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBRXRCOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUksS0FBUTtJQUNuQyxJQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQztJQUN6QixJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUNwRCxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsYUFBYSxFQUFFLENBQUM7SUFDaEIsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQWE7SUFDdkMsSUFBSSxhQUFhLEVBQUU7UUFDakIsSUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDekIsU0FBUyxJQUFJLGFBQWEsQ0FBQyxLQUFLLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUM3RCxJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQztRQUNoRCxJQUFJLGFBQWEsU0FBbUIsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QixhQUFhLEdBQUcsS0FBMEIsQ0FBQztTQUM1QzthQUFNO1lBQ0wsYUFBYSxHQUFJLEtBQWUsQ0FBQyxNQUFNLENBQUM7WUFDeEMsSUFBSSxHQUFJLEtBQWUsQ0FBQyxJQUFJLENBQUM7U0FDOUI7UUFDRCxJQUFNLGtCQUFrQixHQUFHLGVBQWUsRUFBRSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDakUsSUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDekIsaUJBQWlCLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJGLGtFQUFrRTtRQUNsRSxVQUFVLEdBQUcsQ0FBRyxDQUFDO1FBQ2pCLGFBQWEsR0FBRyxDQUFDLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLFlBQVksQ0FBQyxhQUFtQixFQUFFLFlBQW9CO0lBQzdELElBQUksS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLFFBQVEsYUFBYSxDQUFDLElBQUksRUFBRTtZQUMxQixtQkFBbUIsQ0FBQyxDQUFDO2dCQUNuQixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ2hFLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksWUFBWSxLQUFLLE9BQU8sRUFBRTtvQkFDNUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM5QztnQkFDRCxNQUFNO2FBQ1A7WUFDRCxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdDLE1BQU07YUFDUDtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBUyxRQUFRLENBQ2IsS0FBYSxFQUFFLGFBQTRCLEVBQUUsVUFBa0IsRUFDL0QsaUJBQXlCO0lBQzNCLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNoQixJQUFNLFNBQVMsR0FBZSxFQUFFLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BELDREQUE0RDtRQUM1RCxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQU0sVUFBVSxHQUFvQixFQUFFLENBQUM7UUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixpQ0FBaUM7Z0JBQ2pDLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0Qsa0RBQWtEO2dCQUNsRCxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBUSxRQUFRLGNBQU0sQ0FBQzthQUN0QztTQUNGO1FBQ0QsSUFBTSxPQUFPLEdBQ1QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUN0RixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNuQztJQUNELElBQU0sSUFBSSxHQUFTO1FBQ2pCLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtRQUN4QixJQUFJLE1BQUE7UUFDSixTQUFTLFdBQUE7UUFDVCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7UUFDMUIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsTUFBTSxFQUFFLFdBQVc7S0FDcEIsQ0FBQztJQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIscUZBQXFGO0lBQ3JGLGFBQWEsSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksV0FBUSxJQUFJLEVBQUMsQ0FBQztBQUNyQyxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBUyxZQUFZLENBQ2pCLFVBQWtCLEVBQUUsV0FBbUIsRUFBRSxVQUEyQixFQUFFLEtBQWEsRUFDbkYsaUJBQXlCO0lBQzNCLElBQU0sZUFBZSxHQUFHLElBQUksZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDM0QsSUFBTSxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztLQUMxRDtJQUNELElBQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLGdCQUFrQixDQUFZLElBQUksZ0JBQWdCLENBQUM7SUFDdEYsSUFBTSxPQUFPLEdBQVksRUFBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQztJQUN0RixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMzRixPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBRTdCOzs7Ozs7Ozs7R0FTRztBQUNILFNBQVMsVUFBVSxDQUNmLFdBQXdCLEVBQUUsT0FBZ0IsRUFBRSxXQUFtQixFQUFFLFVBQTJCLEVBQzVGLEtBQWEsRUFBRSxpQkFBeUI7SUFDMUMsSUFBSSxXQUFXLEVBQUU7UUFDZixJQUFNLGtCQUFrQixHQUE4QixFQUFFLENBQUM7UUFDekQsT0FBTyxXQUFXLEVBQUU7WUFDbEIsSUFBTSxRQUFRLEdBQWMsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUNwRCxJQUFNLFFBQVEsR0FBRyxpQkFBaUIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDcEQsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUM1QixLQUFLLElBQUksQ0FBQyxZQUFZO29CQUNwQixJQUFNLE9BQU8sR0FBRyxXQUFzQixDQUFDO29CQUN2QyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDM0MsZ0VBQWdFO3dCQUNoRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ2hCO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNmLGNBQWMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUNqQyxXQUFXLHlCQUFpQyxzQkFBK0IsQ0FBQyxDQUFDO3dCQUNqRixJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO3dCQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDdkMsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUcsQ0FBQzs0QkFDL0IsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDOUMsSUFBTSxZQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDOzRCQUN0RCxrRUFBa0U7NEJBQ2xFLElBQUksWUFBVSxFQUFFO2dDQUNkLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQ0FDN0MsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7d0NBQzVCLGFBQWEsQ0FDVCw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxFQUMzRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7cUNBQ3JCO3lDQUFNLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFO3dDQUN0QyxhQUFhLENBQ1QsNEJBQTRCLENBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQ3BELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztxQ0FDckI7eUNBQU07d0NBQ0wsYUFBYSxDQUNULDRCQUE0QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FDQUNyQjtpQ0FDRjtxQ0FBTTtvQ0FDTCxTQUFTO3dDQUNMLE9BQU8sQ0FBQyxJQUFJLENBQ1IsOENBQTRDLGFBQWEsb0JBQWUsT0FBTyx1Q0FBb0MsQ0FBQyxDQUFDO2lDQUM5SDs2QkFDRjtpQ0FBTTtnQ0FDTCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZixRQUFRLHFCQUE4QixlQUF3QixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ3pFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDakI7eUJBQ0Y7d0JBQ0QsMkNBQTJDO3dCQUMzQyxVQUFVLENBQ04sV0FBVyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzt3QkFDckYsNENBQTRDO3dCQUM1QyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLHFCQUE4QixpQkFBMEIsQ0FBQyxDQUFDO3FCQUN2RjtvQkFDRCxNQUFNO2dCQUNSLEtBQUssSUFBSSxDQUFDLFNBQVM7b0JBQ2pCLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO29CQUM1QyxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMvQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFDakMsV0FBVyx5QkFBaUMsc0JBQStCLENBQUMsQ0FBQztvQkFDakYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxxQkFBOEIsaUJBQTBCLENBQUMsQ0FBQztvQkFDdEYsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsYUFBYSxDQUFDLDRCQUE0QixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQzlFO29CQUNELE1BQU07Z0JBQ1IsS0FBSyxJQUFJLENBQUMsWUFBWTtvQkFDcEIsOERBQThEO29CQUM5RCxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzdELElBQUksS0FBSyxFQUFFO3dCQUNULElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzlDLElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWMsY0FBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNqRSw4REFBOEQ7d0JBQzlELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNmLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUNsQyxXQUFXLHlCQUFpQyxzQkFBK0IsQ0FBQyxDQUFDO3dCQUNqRixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzdDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUNoRDt5QkFBTTt3QkFDTCw2Q0FBNkM7d0JBQzdDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDaEI7b0JBQ0QsTUFBTTtnQkFDUjtvQkFDRSw2Q0FBNkM7b0JBQzdDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNsQjtZQUNELFdBQVcsR0FBRyxRQUFVLENBQUM7U0FDMUI7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELElBQU0sU0FBUyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQU0sa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pGLDRFQUE0RTtZQUM1RSxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLE9BQVIsSUFBSSxXQUFRLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQztZQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN0QyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2YsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRywyQkFBMkI7WUFDOUQsQ0FBQyxFQUFrQyxnQ0FBZ0M7WUFDbkUsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFDMUIsa0JBQWtCLHFCQUE4QixvQkFBNkIsRUFDN0UsYUFBYSxFQUNiLElBQUksRUFBRyxrREFBa0Q7WUFDekQsQ0FBQyxFQUFNLGdDQUFnQztZQUN2QyxrQkFBa0IscUJBQThCLG9CQUE2QixFQUM3RSxhQUFhLENBQUMsQ0FBQztZQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZixhQUFhLHFCQUE4QiwwQkFBbUMsRUFDOUUsa0JBQWtCLHFCQUE4QixpQkFBMEIsQ0FBQyxDQUFDO1NBQ2pGO0tBQ0Y7QUFDSCxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsSUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUM7QUFDdEMsU0FBUyxXQUFXLENBQUMsS0FBYTtJQUNoQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxJQUFJLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUVsQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLFFBQWdCO0lBQzFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztJQUMzRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtRQUNoQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDdkQ7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXO0lBQ3pCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgJy4uL3V0aWwvbmdfaTE4bl9jbG9zdXJlX21vZGUnO1xuXG5pbXBvcnQge0RFRkFVTFRfTE9DQUxFX0lELCBnZXRQbHVyYWxDYXNlfSBmcm9tICcuLi9pMThuL2xvY2FsaXphdGlvbic7XG5pbXBvcnQge1NSQ1NFVF9BVFRSUywgVVJJX0FUVFJTLCBWQUxJRF9BVFRSUywgVkFMSURfRUxFTUVOVFMsIGdldFRlbXBsYXRlQ29udGVudH0gZnJvbSAnLi4vc2FuaXRpemF0aW9uL2h0bWxfc2FuaXRpemVyJztcbmltcG9ydCB7SW5lcnRCb2R5SGVscGVyfSBmcm9tICcuLi9zYW5pdGl6YXRpb24vaW5lcnRfYm9keSc7XG5pbXBvcnQge19zYW5pdGl6ZVVybCwgc2FuaXRpemVTcmNzZXR9IGZyb20gJy4uL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyJztcbmltcG9ydCB7YWRkQWxsVG9BcnJheX0gZnJvbSAnLi4vdXRpbC9hcnJheV91dGlscyc7XG5pbXBvcnQge2Fzc2VydERhdGFJblJhbmdlLCBhc3NlcnREZWZpbmVkLCBhc3NlcnRFcXVhbH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHtiaW5kaW5nVXBkYXRlZH0gZnJvbSAnLi9iaW5kaW5ncyc7XG5pbXBvcnQge2F0dGFjaFBhdGNoRGF0YX0gZnJvbSAnLi9jb250ZXh0X2Rpc2NvdmVyeSc7XG5pbXBvcnQge3NldERlbGF5UHJvamVjdGlvbn0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvYWxsJztcbmltcG9ydCB7YXR0YWNoSTE4bk9wQ29kZXNEZWJ1Z30gZnJvbSAnLi9pbnN0cnVjdGlvbnMvbHZpZXdfZGVidWcnO1xuaW1wb3J0IHthbGxvY0V4cGFuZG8sIGVsZW1lbnRBdHRyaWJ1dGVJbnRlcm5hbCwgZWxlbWVudFByb3BlcnR5SW50ZXJuYWwsIGdldE9yQ3JlYXRlVE5vZGUsIHNldElucHV0c0ZvclByb3BlcnR5LCBzZXROZ1JlZmxlY3RQcm9wZXJ0aWVzLCB0ZXh0QmluZGluZ0ludGVybmFsfSBmcm9tICcuL2luc3RydWN0aW9ucy9zaGFyZWQnO1xuaW1wb3J0IHtMQ29udGFpbmVyLCBOQVRJVkV9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtnZXREb2N1bWVudH0gZnJvbSAnLi9pbnRlcmZhY2VzL2RvY3VtZW50JztcbmltcG9ydCB7Q09NTUVOVF9NQVJLRVIsIEVMRU1FTlRfTUFSS0VSLCBJMThuTXV0YXRlT3BDb2RlLCBJMThuTXV0YXRlT3BDb2RlcywgSTE4blVwZGF0ZU9wQ29kZSwgSTE4blVwZGF0ZU9wQ29kZXMsIEljdVR5cGUsIFRJMThuLCBUSWN1fSBmcm9tICcuL2ludGVyZmFjZXMvaTE4bic7XG5pbXBvcnQge1RFbGVtZW50Tm9kZSwgVEljdUNvbnRhaW5lck5vZGUsIFROb2RlLCBUTm9kZUZsYWdzLCBUTm9kZVR5cGUsIFRQcm9qZWN0aW9uTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtSQ29tbWVudCwgUkVsZW1lbnQsIFJUZXh0fSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtTYW5pdGl6ZXJGbn0gZnJvbSAnLi9pbnRlcmZhY2VzL3Nhbml0aXphdGlvbic7XG5pbXBvcnQge2lzTENvbnRhaW5lcn0gZnJvbSAnLi9pbnRlcmZhY2VzL3R5cGVfY2hlY2tzJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgTFZpZXcsIFJFTkRFUkVSLCBUVklFVywgVFZpZXcsIFRfSE9TVH0gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthcHBlbmRDaGlsZCwgYXBwbHlQcm9qZWN0aW9uLCBjcmVhdGVUZXh0Tm9kZSwgbmF0aXZlUmVtb3ZlTm9kZX0gZnJvbSAnLi9ub2RlX21hbmlwdWxhdGlvbic7XG5pbXBvcnQge2dldEJpbmRpbmdJbmRleCwgZ2V0SXNQYXJlbnQsIGdldExWaWV3LCBnZXRQcmV2aW91c09yUGFyZW50VE5vZGUsIGdldFRWaWV3LCBuZXh0QmluZGluZ0luZGV4LCBzZXRJc05vdFBhcmVudCwgc2V0UHJldmlvdXNPclBhcmVudFROb2RlfSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7cmVuZGVyU3RyaW5naWZ5fSBmcm9tICcuL3V0aWwvbWlzY191dGlscyc7XG5pbXBvcnQge2dldE5hdGl2ZUJ5SW5kZXgsIGdldE5hdGl2ZUJ5VE5vZGUsIGdldFROb2RlLCBsb2FkfSBmcm9tICcuL3V0aWwvdmlld191dGlscyc7XG5cblxuY29uc3QgTUFSS0VSID0gYO+/vWA7XG5jb25zdCBJQ1VfQkxPQ0tfUkVHRVhQID0gL15cXHMqKO+/vVxcZCs6P1xcZCrvv70pXFxzKixcXHMqKHNlbGVjdHxwbHVyYWwpXFxzKiwvO1xuY29uc3QgU1VCVEVNUExBVEVfUkVHRVhQID0gL++/vVxcLz9cXCooXFxkKzpcXGQrKe+/vS9naTtcbmNvbnN0IFBIX1JFR0VYUCA9IC/vv70oXFwvP1sjKiFdXFxkKyk6P1xcZCrvv70vZ2k7XG5jb25zdCBCSU5ESU5HX1JFR0VYUCA9IC/vv70oXFxkKyk6P1xcZCrvv70vZ2k7XG5jb25zdCBJQ1VfUkVHRVhQID0gLyh7XFxzKu+/vVxcZCs6P1xcZCrvv71cXHMqLFxccypcXFN7Nn1cXHMqLFtcXHNcXFNdKn0pL2dpO1xuY29uc3QgZW51bSBUYWdUeXBlIHtcbiAgRUxFTUVOVCA9ICcjJyxcbiAgVEVNUExBVEUgPSAnKicsXG4gIFBST0pFQ1RJT04gPSAnIScsXG59XG5cbi8vIGkxOG5Qb3N0cHJvY2VzcyBjb25zdHNcbmNvbnN0IFJPT1RfVEVNUExBVEVfSUQgPSAwO1xuY29uc3QgUFBfTVVMVElfVkFMVUVfUExBQ0VIT0xERVJTX1JFR0VYUCA9IC9cXFso77+9Lis/77+9PylcXF0vO1xuY29uc3QgUFBfUExBQ0VIT0xERVJTX1JFR0VYUCA9IC9cXFso77+9Lis/77+9PylcXF18KO+/vVxcLz9cXCpcXGQrOlxcZCvvv70pL2c7XG5jb25zdCBQUF9JQ1VfVkFSU19SRUdFWFAgPSAvKHtcXHMqKShWQVJfKFBMVVJBTHxTRUxFQ1QpKF9cXGQrKT8pKFxccyosKS9nO1xuY29uc3QgUFBfSUNVX1BMQUNFSE9MREVSU19SRUdFWFAgPSAveyhbQS1aMC05X10rKX0vZztcbmNvbnN0IFBQX0lDVVNfUkVHRVhQID0gL++/vUkxOE5fRVhQXyhJQ1UoX1xcZCspPynvv70vZztcbmNvbnN0IFBQX0NMT1NFX1RFTVBMQVRFX1JFR0VYUCA9IC9cXC9cXCovO1xuY29uc3QgUFBfVEVNUExBVEVfSURfUkVHRVhQID0gL1xcZCtcXDooXFxkKykvO1xuXG4vLyBQYXJzZWQgcGxhY2Vob2xkZXIgc3RydWN0dXJlIHVzZWQgaW4gcG9zdHByb2Nlc3NpbmcgKHdpdGhpbiBgaTE4blBvc3Rwcm9jZXNzYCBmdW5jdGlvbilcbi8vIENvbnRhaW5zIHRoZSBmb2xsb3dpbmcgZmllbGRzOiBbdGVtcGxhdGVJZCwgaXNDbG9zZVRlbXBsYXRlVGFnLCBwbGFjZWhvbGRlcl1cbnR5cGUgUG9zdHByb2Nlc3NQbGFjZWhvbGRlciA9IFtudW1iZXIsIGJvb2xlYW4sIHN0cmluZ107XG5cbmludGVyZmFjZSBJY3VFeHByZXNzaW9uIHtcbiAgdHlwZTogSWN1VHlwZTtcbiAgbWFpbkJpbmRpbmc6IG51bWJlcjtcbiAgY2FzZXM6IHN0cmluZ1tdO1xuICB2YWx1ZXM6IChzdHJpbmd8SWN1RXhwcmVzc2lvbilbXVtdO1xufVxuXG5pbnRlcmZhY2UgSWN1Q2FzZSB7XG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc2xvdHMgdG8gYWxsb2NhdGUgaW4gZXhwYW5kbyBmb3IgdGhpcyBjYXNlLlxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBtYXggbnVtYmVyIG9mIERPTSBlbGVtZW50cyB3aGljaCB3aWxsIGJlIGNyZWF0ZWQgYnkgdGhpcyBpMThuICsgSUNVIGJsb2Nrcy4gV2hlblxuICAgKiB0aGUgRE9NIGVsZW1lbnRzIGFyZSBiZWluZyBjcmVhdGVkIHRoZXkgYXJlIHN0b3JlZCBpbiB0aGUgRVhQQU5ETywgc28gdGhhdCB1cGRhdGUgT3BDb2RlcyBjYW5cbiAgICogd3JpdGUgaW50byB0aGVtLlxuICAgKi9cbiAgdmFyczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBhcnJheSBvZiBjaGlsZC9zdWIgSUNVcy5cbiAgICovXG4gIGNoaWxkSWN1czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgdG8gYXBwbHkgaW4gb3JkZXIgdG8gYnVpbGQgdXAgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVVxuICAgKi9cbiAgY3JlYXRlOiBJMThuTXV0YXRlT3BDb2RlcztcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB0byBhcHBseSBpbiBvcmRlciB0byBkZXN0cm95IHRoZSBET00gcmVuZGVyIHRyZWUgZm9yIHRoZSBJQ1UuXG4gICAqL1xuICByZW1vdmU6IEkxOG5NdXRhdGVPcENvZGVzO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHRvIGFwcGx5IGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgRE9NIHJlbmRlciB0cmVlIGZvciB0aGUgSUNVIGJpbmRpbmdzLlxuICAgKi9cbiAgdXBkYXRlOiBJMThuVXBkYXRlT3BDb2Rlcztcbn1cblxuLyoqXG4gKiBCcmVha3MgcGF0dGVybiBpbnRvIHN0cmluZ3MgYW5kIHRvcCBsZXZlbCB7Li4ufSBibG9ja3MuXG4gKiBDYW4gYmUgdXNlZCB0byBicmVhayBhIG1lc3NhZ2UgaW50byB0ZXh0IGFuZCBJQ1UgZXhwcmVzc2lvbnMsIG9yIHRvIGJyZWFrIGFuIElDVSBleHByZXNzaW9uIGludG9cbiAqIGtleXMgYW5kIGNhc2VzLlxuICogT3JpZ2luYWwgY29kZSBmcm9tIGNsb3N1cmUgbGlicmFyeSwgbW9kaWZpZWQgZm9yIEFuZ3VsYXIuXG4gKlxuICogQHBhcmFtIHBhdHRlcm4gKHN1YilQYXR0ZXJuIHRvIGJlIGJyb2tlbi5cbiAqXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RQYXJ0cyhwYXR0ZXJuOiBzdHJpbmcpOiAoc3RyaW5nIHwgSWN1RXhwcmVzc2lvbilbXSB7XG4gIGlmICghcGF0dGVybikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGxldCBwcmV2UG9zID0gMDtcbiAgY29uc3QgYnJhY2VTdGFjayA9IFtdO1xuICBjb25zdCByZXN1bHRzOiAoc3RyaW5nIHwgSWN1RXhwcmVzc2lvbilbXSA9IFtdO1xuICBjb25zdCBicmFjZXMgPSAvW3t9XS9nO1xuICAvLyBsYXN0SW5kZXggZG9lc24ndCBnZXQgc2V0IHRvIDAgc28gd2UgaGF2ZSB0by5cbiAgYnJhY2VzLmxhc3RJbmRleCA9IDA7XG5cbiAgbGV0IG1hdGNoO1xuICB3aGlsZSAobWF0Y2ggPSBicmFjZXMuZXhlYyhwYXR0ZXJuKSkge1xuICAgIGNvbnN0IHBvcyA9IG1hdGNoLmluZGV4O1xuICAgIGlmIChtYXRjaFswXSA9PSAnfScpIHtcbiAgICAgIGJyYWNlU3RhY2sucG9wKCk7XG5cbiAgICAgIGlmIChicmFjZVN0YWNrLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIC8vIEVuZCBvZiB0aGUgYmxvY2suXG4gICAgICAgIGNvbnN0IGJsb2NrID0gcGF0dGVybi5zdWJzdHJpbmcocHJldlBvcywgcG9zKTtcbiAgICAgICAgaWYgKElDVV9CTE9DS19SRUdFWFAudGVzdChibG9jaykpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gocGFyc2VJQ1VCbG9jayhibG9jaykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChibG9jayk7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2UG9zID0gcG9zICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGJyYWNlU3RhY2subGVuZ3RoID09IDApIHtcbiAgICAgICAgY29uc3Qgc3Vic3RyaW5nID0gcGF0dGVybi5zdWJzdHJpbmcocHJldlBvcywgcG9zKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHN1YnN0cmluZyk7XG4gICAgICAgIHByZXZQb3MgPSBwb3MgKyAxO1xuICAgICAgfVxuICAgICAgYnJhY2VTdGFjay5wdXNoKCd7Jyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3Vic3RyaW5nID0gcGF0dGVybi5zdWJzdHJpbmcocHJldlBvcyk7XG4gIHJlc3VsdHMucHVzaChzdWJzdHJpbmcpO1xuICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGV4dCBjb250YWluaW5nIGFuIElDVSBleHByZXNzaW9uIGFuZCBwcm9kdWNlcyBhIEpTT04gb2JqZWN0IGZvciBpdC5cbiAqIE9yaWdpbmFsIGNvZGUgZnJvbSBjbG9zdXJlIGxpYnJhcnksIG1vZGlmaWVkIGZvciBBbmd1bGFyLlxuICpcbiAqIEBwYXJhbSBwYXR0ZXJuIFRleHQgY29udGFpbmluZyBhbiBJQ1UgZXhwcmVzc2lvbiB0aGF0IG5lZWRzIHRvIGJlIHBhcnNlZC5cbiAqXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSUNVQmxvY2socGF0dGVybjogc3RyaW5nKTogSWN1RXhwcmVzc2lvbiB7XG4gIGNvbnN0IGNhc2VzID0gW107XG4gIGNvbnN0IHZhbHVlczogKHN0cmluZyB8IEljdUV4cHJlc3Npb24pW11bXSA9IFtdO1xuICBsZXQgaWN1VHlwZSA9IEljdVR5cGUucGx1cmFsO1xuICBsZXQgbWFpbkJpbmRpbmcgPSAwO1xuICBwYXR0ZXJuID0gcGF0dGVybi5yZXBsYWNlKElDVV9CTE9DS19SRUdFWFAsIGZ1bmN0aW9uKHN0cjogc3RyaW5nLCBiaW5kaW5nOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xuICAgIGlmICh0eXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgaWN1VHlwZSA9IEljdVR5cGUuc2VsZWN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpY3VUeXBlID0gSWN1VHlwZS5wbHVyYWw7XG4gICAgfVxuICAgIG1haW5CaW5kaW5nID0gcGFyc2VJbnQoYmluZGluZy5zdWJzdHIoMSksIDEwKTtcbiAgICByZXR1cm4gJyc7XG4gIH0pO1xuXG4gIGNvbnN0IHBhcnRzID0gZXh0cmFjdFBhcnRzKHBhdHRlcm4pIGFzIHN0cmluZ1tdO1xuICAvLyBMb29raW5nIGZvciAoa2V5IGJsb2NrKSsgc2VxdWVuY2UuIE9uZSBvZiB0aGUga2V5cyBoYXMgdG8gYmUgXCJvdGhlclwiLlxuICBmb3IgKGxldCBwb3MgPSAwOyBwb3MgPCBwYXJ0cy5sZW5ndGg7KSB7XG4gICAgbGV0IGtleSA9IHBhcnRzW3BvcysrXS50cmltKCk7XG4gICAgaWYgKGljdVR5cGUgPT09IEljdVR5cGUucGx1cmFsKSB7XG4gICAgICAvLyBLZXkgY2FuIGJlIFwiPXhcIiwgd2UganVzdCB3YW50IFwieFwiXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvXFxzKig/Oj0pPyhcXHcrKVxccyovLCAnJDEnKTtcbiAgICB9XG4gICAgaWYgKGtleS5sZW5ndGgpIHtcbiAgICAgIGNhc2VzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBibG9ja3MgPSBleHRyYWN0UGFydHMocGFydHNbcG9zKytdKSBhcyBzdHJpbmdbXTtcbiAgICBpZiAoY2FzZXMubGVuZ3RoID4gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgdmFsdWVzLnB1c2goYmxvY2tzKTtcbiAgICB9XG4gIH1cblxuICAvLyBUT0RPKG9jb21iZSk6IHN1cHBvcnQgSUNVIGV4cHJlc3Npb25zIGluIGF0dHJpYnV0ZXMsIHNlZSAjMjE2MTVcbiAgcmV0dXJuIHt0eXBlOiBpY3VUeXBlLCBtYWluQmluZGluZzogbWFpbkJpbmRpbmcsIGNhc2VzLCB2YWx1ZXN9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgZXZlcnl0aGluZyBpbnNpZGUgdGhlIHN1Yi10ZW1wbGF0ZXMgb2YgYSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiByZW1vdmVJbm5lclRlbXBsYXRlVHJhbnNsYXRpb24obWVzc2FnZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IG1hdGNoO1xuICBsZXQgcmVzID0gJyc7XG4gIGxldCBpbmRleCA9IDA7XG4gIGxldCBpblRlbXBsYXRlID0gZmFsc2U7XG4gIGxldCB0YWdNYXRjaGVkO1xuXG4gIHdoaWxlICgobWF0Y2ggPSBTVUJURU1QTEFURV9SRUdFWFAuZXhlYyhtZXNzYWdlKSkgIT09IG51bGwpIHtcbiAgICBpZiAoIWluVGVtcGxhdGUpIHtcbiAgICAgIHJlcyArPSBtZXNzYWdlLnN1YnN0cmluZyhpbmRleCwgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgdGFnTWF0Y2hlZCA9IG1hdGNoWzFdO1xuICAgICAgaW5UZW1wbGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtYXRjaFswXSA9PT0gYCR7TUFSS0VSfS8qJHt0YWdNYXRjaGVkfSR7TUFSS0VSfWApIHtcbiAgICAgICAgaW5kZXggPSBtYXRjaC5pbmRleDtcbiAgICAgICAgaW5UZW1wbGF0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXNzZXJ0RXF1YWwoXG4gICAgICAgICAgaW5UZW1wbGF0ZSwgZmFsc2UsXG4gICAgICAgICAgYFRhZyBtaXNtYXRjaDogdW5hYmxlIHRvIGZpbmQgdGhlIGVuZCBvZiB0aGUgc3ViLXRlbXBsYXRlIGluIHRoZSB0cmFuc2xhdGlvbiBcIiR7bWVzc2FnZX1cImApO1xuXG4gIHJlcyArPSBtZXNzYWdlLnN1YnN0cihpbmRleCk7XG4gIHJldHVybiByZXM7XG59XG5cbi8qKlxuICogRXh0cmFjdHMgYSBwYXJ0IG9mIGEgbWVzc2FnZSBhbmQgcmVtb3ZlcyB0aGUgcmVzdC5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGZvciBleHRyYWN0aW5nIGEgcGFydCBvZiB0aGUgbWVzc2FnZSBhc3NvY2lhdGVkIHdpdGggYSB0ZW1wbGF0ZS4gQSB0cmFuc2xhdGVkXG4gKiBtZXNzYWdlIGNhbiBzcGFuIG11bHRpcGxlIHRlbXBsYXRlcy5cbiAqXG4gKiBFeGFtcGxlOlxuICogYGBgXG4gKiA8ZGl2IGkxOG4+VHJhbnNsYXRlIDxzcGFuICpuZ0lmPm1lPC9zcGFuPiE8L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGNyb3BcbiAqIEBwYXJhbSBzdWJUZW1wbGF0ZUluZGV4IEluZGV4IG9mIHRoZSBzdWItdGVtcGxhdGUgdG8gZXh0cmFjdC4gSWYgdW5kZWZpbmVkIGl0IHJldHVybnMgdGhlXG4gKiBleHRlcm5hbCB0ZW1wbGF0ZSBhbmQgcmVtb3ZlcyBhbGwgc3ViLXRlbXBsYXRlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uRm9yVGVtcGxhdGUobWVzc2FnZTogc3RyaW5nLCBzdWJUZW1wbGF0ZUluZGV4PzogbnVtYmVyKSB7XG4gIGlmICh0eXBlb2Ygc3ViVGVtcGxhdGVJbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICAvLyBXZSB3YW50IHRoZSByb290IHRlbXBsYXRlIG1lc3NhZ2UsIGlnbm9yZSBhbGwgc3ViLXRlbXBsYXRlc1xuICAgIHJldHVybiByZW1vdmVJbm5lclRlbXBsYXRlVHJhbnNsYXRpb24obWVzc2FnZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gV2Ugd2FudCBhIHNwZWNpZmljIHN1Yi10ZW1wbGF0ZVxuICAgIGNvbnN0IHN0YXJ0ID1cbiAgICAgICAgbWVzc2FnZS5pbmRleE9mKGA6JHtzdWJUZW1wbGF0ZUluZGV4fSR7TUFSS0VSfWApICsgMiArIHN1YlRlbXBsYXRlSW5kZXgudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgY29uc3QgZW5kID0gbWVzc2FnZS5zZWFyY2gobmV3IFJlZ0V4cChgJHtNQVJLRVJ9XFxcXC9cXFxcKlxcXFxkKzoke3N1YlRlbXBsYXRlSW5kZXh9JHtNQVJLRVJ9YCkpO1xuICAgIHJldHVybiByZW1vdmVJbm5lclRlbXBsYXRlVHJhbnNsYXRpb24obWVzc2FnZS5zdWJzdHJpbmcoc3RhcnQsIGVuZCkpO1xuICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIE9wQ29kZXMgdG8gdXBkYXRlIHRoZSBiaW5kaW5ncyBvZiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgY29udGFpbmluZyB0aGUgYmluZGluZ3MuXG4gKiBAcGFyYW0gZGVzdGluYXRpb25Ob2RlIEluZGV4IG9mIHRoZSBkZXN0aW5hdGlvbiBub2RlIHdoaWNoIHdpbGwgcmVjZWl2ZSB0aGUgYmluZGluZy5cbiAqIEBwYXJhbSBhdHRyTmFtZSBOYW1lIG9mIHRoZSBhdHRyaWJ1dGUsIGlmIHRoZSBzdHJpbmcgYmVsb25ncyB0byBhbiBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0gc2FuaXRpemVGbiBTYW5pdGl6YXRpb24gZnVuY3Rpb24gdXNlZCB0byBzYW5pdGl6ZSB0aGUgc3RyaW5nIGFmdGVyIHVwZGF0ZSwgaWYgbmVjZXNzYXJ5LlxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUJpbmRpbmdVcGRhdGVPcENvZGVzKFxuICAgIHN0cjogc3RyaW5nLCBkZXN0aW5hdGlvbk5vZGU6IG51bWJlciwgYXR0ck5hbWU/OiBzdHJpbmcsXG4gICAgc2FuaXRpemVGbjogU2FuaXRpemVyRm4gfCBudWxsID0gbnVsbCk6IEkxOG5VcGRhdGVPcENvZGVzIHtcbiAgY29uc3QgdXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMgPSBbbnVsbCwgbnVsbF07ICAvLyBBbGxvYyBzcGFjZSBmb3IgbWFzayBhbmQgc2l6ZVxuICBjb25zdCB0ZXh0UGFydHMgPSBzdHIuc3BsaXQoQklORElOR19SRUdFWFApO1xuICBsZXQgbWFzayA9IDA7XG5cbiAgZm9yIChsZXQgaiA9IDA7IGogPCB0ZXh0UGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICBjb25zdCB0ZXh0VmFsdWUgPSB0ZXh0UGFydHNbal07XG5cbiAgICBpZiAoaiAmIDEpIHtcbiAgICAgIC8vIE9kZCBpbmRleGVzIGFyZSBiaW5kaW5nc1xuICAgICAgY29uc3QgYmluZGluZ0luZGV4ID0gcGFyc2VJbnQodGV4dFZhbHVlLCAxMCk7XG4gICAgICB1cGRhdGVPcENvZGVzLnB1c2goLTEgLSBiaW5kaW5nSW5kZXgpO1xuICAgICAgbWFzayA9IG1hc2sgfCB0b01hc2tCaXQoYmluZGluZ0luZGV4KTtcbiAgICB9IGVsc2UgaWYgKHRleHRWYWx1ZSAhPT0gJycpIHtcbiAgICAgIC8vIEV2ZW4gaW5kZXhlcyBhcmUgdGV4dFxuICAgICAgdXBkYXRlT3BDb2Rlcy5wdXNoKHRleHRWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlT3BDb2Rlcy5wdXNoKFxuICAgICAgZGVzdGluYXRpb25Ob2RlIDw8IEkxOG5VcGRhdGVPcENvZGUuU0hJRlRfUkVGIHxcbiAgICAgIChhdHRyTmFtZSA/IEkxOG5VcGRhdGVPcENvZGUuQXR0ciA6IEkxOG5VcGRhdGVPcENvZGUuVGV4dCkpO1xuICBpZiAoYXR0ck5hbWUpIHtcbiAgICB1cGRhdGVPcENvZGVzLnB1c2goYXR0ck5hbWUsIHNhbml0aXplRm4pO1xuICB9XG4gIHVwZGF0ZU9wQ29kZXNbMF0gPSBtYXNrO1xuICB1cGRhdGVPcENvZGVzWzFdID0gdXBkYXRlT3BDb2Rlcy5sZW5ndGggLSAyO1xuICByZXR1cm4gdXBkYXRlT3BDb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0QmluZGluZ01hc2soaWN1RXhwcmVzc2lvbjogSWN1RXhwcmVzc2lvbiwgbWFzayA9IDApOiBudW1iZXIge1xuICBtYXNrID0gbWFzayB8IHRvTWFza0JpdChpY3VFeHByZXNzaW9uLm1haW5CaW5kaW5nKTtcbiAgbGV0IG1hdGNoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGljdUV4cHJlc3Npb24udmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdmFsdWVBcnIgPSBpY3VFeHByZXNzaW9uLnZhbHVlc1tpXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHZhbHVlQXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlQXJyW2pdO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgd2hpbGUgKG1hdGNoID0gQklORElOR19SRUdFWFAuZXhlYyh2YWx1ZSkpIHtcbiAgICAgICAgICBtYXNrID0gbWFzayB8IHRvTWFza0JpdChwYXJzZUludChtYXRjaFsxXSwgMTApKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFzayA9IGdldEJpbmRpbmdNYXNrKHZhbHVlIGFzIEljdUV4cHJlc3Npb24sIG1hc2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWFzaztcbn1cblxuY29uc3QgaTE4bkluZGV4U3RhY2s6IG51bWJlcltdID0gW107XG5sZXQgaTE4bkluZGV4U3RhY2tQb2ludGVyID0gLTE7XG5cbi8qKlxuICogQ29udmVydCBiaW5kaW5nIGluZGV4IHRvIG1hc2sgYml0LlxuICpcbiAqIEVhY2ggaW5kZXggcmVwcmVzZW50cyBhIHNpbmdsZSBiaXQgb24gdGhlIGJpdC1tYXNrLiBCZWNhdXNlIGJpdC1tYXNrIG9ubHkgaGFzIDMyIGJpdHMsIHdlIG1ha2VcbiAqIHRoZSAzMm5kIGJpdCBzaGFyZSBhbGwgbWFza3MgZm9yIGFsbCBiaW5kaW5ncyBoaWdoZXIgdGhhbiAzMi4gU2luY2UgaXQgaXMgZXh0cmVtZWx5IHJhcmUgdG8gaGF2ZVxuICogbW9yZSB0aGFuIDMyIGJpbmRpbmdzIHRoaXMgd2lsbCBiZSBoaXQgdmVyeSByYXJlbHkuIFRoZSBkb3duc2lkZSBvZiBoaXR0aW5nIHRoaXMgY29ybmVyIGNhc2UgaXNcbiAqIHRoYXQgd2Ugd2lsbCBleGVjdXRlIGJpbmRpbmcgY29kZSBtb3JlIG9mdGVuIHRoYW4gbmVjZXNzYXJ5LiAocGVuYWx0eSBvZiBwZXJmb3JtYW5jZSlcbiAqL1xuZnVuY3Rpb24gdG9NYXNrQml0KGJpbmRpbmdJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIDEgPDwgTWF0aC5taW4oYmluZGluZ0luZGV4LCAzMSk7XG59XG5cbmNvbnN0IHBhcmVudEluZGV4U3RhY2s6IG51bWJlcltdID0gW107XG5cbi8qKlxuICogTWFya3MgYSBibG9jayBvZiB0ZXh0IGFzIHRyYW5zbGF0YWJsZS5cbiAqXG4gKiBUaGUgaW5zdHJ1Y3Rpb25zIGBpMThuU3RhcnRgIGFuZCBgaTE4bkVuZGAgbWFyayB0aGUgdHJhbnNsYXRpb24gYmxvY2sgaW4gdGhlIHRlbXBsYXRlLlxuICogVGhlIHRyYW5zbGF0aW9uIGBtZXNzYWdlYCBpcyB0aGUgdmFsdWUgd2hpY2ggaXMgbG9jYWxlIHNwZWNpZmljLiBUaGUgdHJhbnNsYXRpb24gc3RyaW5nIG1heVxuICogY29udGFpbiBwbGFjZWhvbGRlcnMgd2hpY2ggYXNzb2NpYXRlIGlubmVyIGVsZW1lbnRzIGFuZCBzdWItdGVtcGxhdGVzIHdpdGhpbiB0aGUgdHJhbnNsYXRpb24uXG4gKlxuICogVGhlIHRyYW5zbGF0aW9uIGBtZXNzYWdlYCBwbGFjZWhvbGRlcnMgYXJlOlxuICogLSBg77+9e2luZGV4fSg6e2Jsb2NrfSnvv71gOiAqQmluZGluZyBQbGFjZWhvbGRlcio6IE1hcmtzIGEgbG9jYXRpb24gd2hlcmUgYW4gZXhwcmVzc2lvbiB3aWxsIGJlXG4gKiAgIGludGVycG9sYXRlZCBpbnRvLiBUaGUgcGxhY2Vob2xkZXIgYGluZGV4YCBwb2ludHMgdG8gdGhlIGV4cHJlc3Npb24gYmluZGluZyBpbmRleC4gQW4gb3B0aW9uYWxcbiAqICAgYGJsb2NrYCB0aGF0IG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKiAtIGDvv70je2luZGV4fSg6e2Jsb2NrfSnvv71gL2Dvv70vI3tpbmRleH0oOntibG9ja30p77+9YDogKkVsZW1lbnQgUGxhY2Vob2xkZXIqOiAgTWFya3MgdGhlIGJlZ2lubmluZ1xuICogICBhbmQgZW5kIG9mIERPTSBlbGVtZW50IHRoYXQgd2VyZSBlbWJlZGRlZCBpbiB0aGUgb3JpZ2luYWwgdHJhbnNsYXRpb24gYmxvY2suIFRoZSBwbGFjZWhvbGRlclxuICogICBgaW5kZXhgIHBvaW50cyB0byB0aGUgZWxlbWVudCBpbmRleCBpbiB0aGUgdGVtcGxhdGUgaW5zdHJ1Y3Rpb25zIHNldC4gQW4gb3B0aW9uYWwgYGJsb2NrYCB0aGF0XG4gKiAgIG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKiAtIGDvv70he2luZGV4fSg6e2Jsb2NrfSnvv71gL2Dvv70vIXtpbmRleH0oOntibG9ja30p77+9YDogKlByb2plY3Rpb24gUGxhY2Vob2xkZXIqOiAgTWFya3MgdGhlXG4gKiAgIGJlZ2lubmluZyBhbmQgZW5kIG9mIDxuZy1jb250ZW50PiB0aGF0IHdhcyBlbWJlZGRlZCBpbiB0aGUgb3JpZ2luYWwgdHJhbnNsYXRpb24gYmxvY2suXG4gKiAgIFRoZSBwbGFjZWhvbGRlciBgaW5kZXhgIHBvaW50cyB0byB0aGUgZWxlbWVudCBpbmRleCBpbiB0aGUgdGVtcGxhdGUgaW5zdHJ1Y3Rpb25zIHNldC5cbiAqICAgQW4gb3B0aW9uYWwgYGJsb2NrYCB0aGF0IG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKiAtIGDvv70qe2luZGV4fTp7YmxvY2t977+9YC9g77+9Lyp7aW5kZXh9OntibG9ja33vv71gOiAqU3ViLXRlbXBsYXRlIFBsYWNlaG9sZGVyKjogU3ViLXRlbXBsYXRlcyBtdXN0IGJlXG4gKiAgIHNwbGl0IHVwIGFuZCB0cmFuc2xhdGVkIHNlcGFyYXRlbHkgaW4gZWFjaCBhbmd1bGFyIHRlbXBsYXRlIGZ1bmN0aW9uLiBUaGUgYGluZGV4YCBwb2ludHMgdG8gdGhlXG4gKiAgIGB0ZW1wbGF0ZWAgaW5zdHJ1Y3Rpb24gaW5kZXguIEEgYGJsb2NrYCB0aGF0IG1hdGNoZXMgdGhlIHN1Yi10ZW1wbGF0ZSBpbiB3aGljaCBpdCB3YXMgZGVjbGFyZWQuXG4gKlxuICogQHBhcmFtIGluZGV4IEEgdW5pcXVlIGluZGV4IG9mIHRoZSB0cmFuc2xhdGlvbiBpbiB0aGUgc3RhdGljIGJsb2NrLlxuICogQHBhcmFtIG1lc3NhZ2UgVGhlIHRyYW5zbGF0aW9uIG1lc3NhZ2UuXG4gKiBAcGFyYW0gc3ViVGVtcGxhdGVJbmRleCBPcHRpb25hbCBzdWItdGVtcGxhdGUgaW5kZXggaW4gdGhlIGBtZXNzYWdlYC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5TdGFydChpbmRleDogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcsIHN1YlRlbXBsYXRlSW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgdFZpZXcgPSBnZXRUVmlldygpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0VmlldywgYHRWaWV3IHNob3VsZCBiZSBkZWZpbmVkYCk7XG4gIGkxOG5JbmRleFN0YWNrWysraTE4bkluZGV4U3RhY2tQb2ludGVyXSA9IGluZGV4O1xuICAvLyBXZSBuZWVkIHRvIGRlbGF5IHByb2plY3Rpb25zIHVudGlsIGBpMThuRW5kYFxuICBzZXREZWxheVByb2plY3Rpb24odHJ1ZSk7XG4gIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MgJiYgdFZpZXcuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdID09PSBudWxsKSB7XG4gICAgaTE4blN0YXJ0Rmlyc3RQYXNzKGdldExWaWV3KCksIHRWaWV3LCBpbmRleCwgbWVzc2FnZSwgc3ViVGVtcGxhdGVJbmRleCk7XG4gIH1cbn1cblxuLy8gQ291bnQgZm9yIHRoZSBudW1iZXIgb2YgdmFycyB0aGF0IHdpbGwgYmUgYWxsb2NhdGVkIGZvciBlYWNoIGkxOG4gYmxvY2suXG4vLyBJdCBpcyBnbG9iYWwgYmVjYXVzZSB0aGlzIGlzIHVzZWQgaW4gbXVsdGlwbGUgZnVuY3Rpb25zIHRoYXQgaW5jbHVkZSBsb29wcyBhbmQgcmVjdXJzaXZlIGNhbGxzLlxuLy8gVGhpcyBpcyByZXNldCB0byAwIHdoZW4gYGkxOG5TdGFydEZpcnN0UGFzc2AgaXMgY2FsbGVkLlxubGV0IGkxOG5WYXJzQ291bnQ6IG51bWJlcjtcblxuLyoqXG4gKiBTZWUgYGkxOG5TdGFydGAgYWJvdmUuXG4gKi9cbmZ1bmN0aW9uIGkxOG5TdGFydEZpcnN0UGFzcyhcbiAgICBsVmlldzogTFZpZXcsIHRWaWV3OiBUVmlldywgaW5kZXg6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCBzdWJUZW1wbGF0ZUluZGV4PzogbnVtYmVyKSB7XG4gIGNvbnN0IHN0YXJ0SW5kZXggPSB0Vmlldy5ibHVlcHJpbnQubGVuZ3RoIC0gSEVBREVSX09GRlNFVDtcbiAgaTE4blZhcnNDb3VudCA9IDA7XG4gIGNvbnN0IHByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpO1xuICBjb25zdCBwYXJlbnRUTm9kZSA9XG4gICAgICBnZXRJc1BhcmVudCgpID8gcHJldmlvdXNPclBhcmVudFROb2RlIDogcHJldmlvdXNPclBhcmVudFROb2RlICYmIHByZXZpb3VzT3JQYXJlbnRUTm9kZS5wYXJlbnQ7XG4gIGxldCBwYXJlbnRJbmRleCA9XG4gICAgICBwYXJlbnRUTm9kZSAmJiBwYXJlbnRUTm9kZSAhPT0gbFZpZXdbVF9IT1NUXSA/IHBhcmVudFROb2RlLmluZGV4IC0gSEVBREVSX09GRlNFVCA6IGluZGV4O1xuICBsZXQgcGFyZW50SW5kZXhQb2ludGVyID0gMDtcbiAgcGFyZW50SW5kZXhTdGFja1twYXJlbnRJbmRleFBvaW50ZXJdID0gcGFyZW50SW5kZXg7XG4gIGNvbnN0IGNyZWF0ZU9wQ29kZXM6IEkxOG5NdXRhdGVPcENvZGVzID0gW107XG4gIC8vIElmIHRoZSBwcmV2aW91cyBub2RlIHdhc24ndCB0aGUgZGlyZWN0IHBhcmVudCB0aGVuIHdlIGhhdmUgYSB0cmFuc2xhdGlvbiB3aXRob3V0IHRvcCBsZXZlbFxuICAvLyBlbGVtZW50IGFuZCB3ZSBuZWVkIHRvIGtlZXAgYSByZWZlcmVuY2Ugb2YgdGhlIHByZXZpb3VzIGVsZW1lbnQgaWYgdGhlcmUgaXMgb25lLiBXZSBzaG91bGQgYWxzb1xuICAvLyBrZWVwIHRyYWNrIHdoZXRoZXIgYW4gZWxlbWVudCB3YXMgYSBwYXJlbnQgbm9kZSBvciBub3QsIHNvIHRoYXQgdGhlIGxvZ2ljIHRoYXQgY29uc3VtZXNcbiAgLy8gdGhlIGdlbmVyYXRlZCBgSTE4bk11dGF0ZU9wQ29kZWBzIGNhbiBsZXZlcmFnZSB0aGlzIGluZm9ybWF0aW9uIHRvIHByb3Blcmx5IHNldCBUTm9kZSBzdGF0ZVxuICAvLyAod2hldGhlciBpdCdzIGEgcGFyZW50IG9yIHNpYmxpbmcpLlxuICBpZiAoaW5kZXggPiAwICYmIHByZXZpb3VzT3JQYXJlbnRUTm9kZSAhPT0gcGFyZW50VE5vZGUpIHtcbiAgICBsZXQgcHJldmlvdXNUTm9kZUluZGV4ID0gcHJldmlvdXNPclBhcmVudFROb2RlLmluZGV4IC0gSEVBREVSX09GRlNFVDtcbiAgICAvLyBJZiBjdXJyZW50IFROb2RlIGlzIGEgc2libGluZyBub2RlLCBlbmNvZGUgaXQgdXNpbmcgYSBuZWdhdGl2ZSBpbmRleC4gVGhpcyBpbmZvcm1hdGlvbiBpc1xuICAgIC8vIHJlcXVpcmVkIHdoZW4gdGhlIGBTZWxlY3RgIGFjdGlvbiBpcyBwcm9jZXNzZWQgKHNlZSB0aGUgYHJlYWRDcmVhdGVPcENvZGVzYCBmdW5jdGlvbikuXG4gICAgaWYgKCFnZXRJc1BhcmVudCgpKSB7XG4gICAgICBwcmV2aW91c1ROb2RlSW5kZXggPSB+cHJldmlvdXNUTm9kZUluZGV4O1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYW4gT3BDb2RlIHRvIHNlbGVjdCB0aGUgcHJldmlvdXMgVE5vZGVcbiAgICBjcmVhdGVPcENvZGVzLnB1c2gocHJldmlvdXNUTm9kZUluZGV4IDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUkVGIHwgSTE4bk11dGF0ZU9wQ29kZS5TZWxlY3QpO1xuICB9XG4gIGNvbnN0IHVwZGF0ZU9wQ29kZXM6IEkxOG5VcGRhdGVPcENvZGVzID0gW107XG4gIGNvbnN0IGljdUV4cHJlc3Npb25zOiBUSWN1W10gPSBbXTtcblxuICBjb25zdCB0ZW1wbGF0ZVRyYW5zbGF0aW9uID0gZ2V0VHJhbnNsYXRpb25Gb3JUZW1wbGF0ZShtZXNzYWdlLCBzdWJUZW1wbGF0ZUluZGV4KTtcbiAgY29uc3QgbXNnUGFydHMgPSByZXBsYWNlTmdzcCh0ZW1wbGF0ZVRyYW5zbGF0aW9uKS5zcGxpdChQSF9SRUdFWFApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZ1BhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IHZhbHVlID0gbXNnUGFydHNbaV07XG4gICAgaWYgKGkgJiAxKSB7XG4gICAgICAvLyBPZGQgaW5kZXhlcyBhcmUgcGxhY2Vob2xkZXJzIChlbGVtZW50cyBhbmQgc3ViLXRlbXBsYXRlcylcbiAgICAgIGlmICh2YWx1ZS5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgICAgICAvLyBJdCBpcyBhIGNsb3NpbmcgdGFnXG4gICAgICAgIGlmICh2YWx1ZS5jaGFyQXQoMSkgPT09IFRhZ1R5cGUuRUxFTUVOVCkge1xuICAgICAgICAgIGNvbnN0IHBoSW5kZXggPSBwYXJzZUludCh2YWx1ZS5zdWJzdHIoMiksIDEwKTtcbiAgICAgICAgICBwYXJlbnRJbmRleCA9IHBhcmVudEluZGV4U3RhY2tbLS1wYXJlbnRJbmRleFBvaW50ZXJdO1xuICAgICAgICAgIGNyZWF0ZU9wQ29kZXMucHVzaChwaEluZGV4IDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUkVGIHwgSTE4bk11dGF0ZU9wQ29kZS5FbGVtZW50RW5kKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGhJbmRleCA9IHBhcnNlSW50KHZhbHVlLnN1YnN0cigxKSwgMTApO1xuICAgICAgICBjb25zdCBpc0VsZW1lbnQgPSB2YWx1ZS5jaGFyQXQoMCkgPT09IFRhZ1R5cGUuRUxFTUVOVDtcbiAgICAgICAgLy8gVGhlIHZhbHVlIHJlcHJlc2VudHMgYSBwbGFjZWhvbGRlciB0aGF0IHdlIG1vdmUgdG8gdGhlIGRlc2lnbmF0ZWQgaW5kZXguXG4gICAgICAgIC8vIE5vdGU6IHBvc2l0aXZlIGluZGljaWVzIGluZGljYXRlIHRoYXQgYSBUTm9kZSB3aXRoIGEgZ2l2ZW4gaW5kZXggc2hvdWxkIGFsc28gYmUgbWFya2VkIGFzXG4gICAgICAgIC8vIHBhcmVudCB3aGlsZSBleGVjdXRpbmcgYFNlbGVjdGAgaW5zdHJ1Y3Rpb24uXG4gICAgICAgIGNyZWF0ZU9wQ29kZXMucHVzaChcbiAgICAgICAgICAgIChpc0VsZW1lbnQgPyBwaEluZGV4IDogfnBoSW5kZXgpIDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUkVGIHxcbiAgICAgICAgICAgICAgICBJMThuTXV0YXRlT3BDb2RlLlNlbGVjdCxcbiAgICAgICAgICAgIHBhcmVudEluZGV4IDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUEFSRU5UIHwgSTE4bk11dGF0ZU9wQ29kZS5BcHBlbmRDaGlsZCk7XG5cbiAgICAgICAgaWYgKGlzRWxlbWVudCkge1xuICAgICAgICAgIHBhcmVudEluZGV4U3RhY2tbKytwYXJlbnRJbmRleFBvaW50ZXJdID0gcGFyZW50SW5kZXggPSBwaEluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEV2ZW4gaW5kZXhlcyBhcmUgdGV4dCAoaW5jbHVkaW5nIGJpbmRpbmdzICYgSUNVIGV4cHJlc3Npb25zKVxuICAgICAgY29uc3QgcGFydHMgPSBleHRyYWN0UGFydHModmFsdWUpO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoaiAmIDEpIHtcbiAgICAgICAgICAvLyBPZGQgaW5kZXhlcyBhcmUgSUNVIGV4cHJlc3Npb25zXG4gICAgICAgICAgY29uc3QgaWN1RXhwcmVzc2lvbiA9IHBhcnRzW2pdIGFzIEljdUV4cHJlc3Npb247XG5cbiAgICAgICAgICAvLyBWZXJpZnkgdGhhdCBJQ1UgZXhwcmVzc2lvbiBoYXMgdGhlIHJpZ2h0IHNoYXBlLiBUcmFuc2xhdGlvbnMgbWlnaHQgY29udGFpbiBpbnZhbGlkXG4gICAgICAgICAgLy8gY29uc3RydWN0aW9ucyAod2hpbGUgb3JpZ2luYWwgbWVzc2FnZXMgd2VyZSBjb3JyZWN0KSwgc28gSUNVIHBhcnNpbmcgYXQgcnVudGltZSBtYXkgbm90XG4gICAgICAgICAgLy8gc3VjY2VlZCAodGh1cyBgaWN1RXhwcmVzc2lvbmAgcmVtYWlucyBhIHN0cmluZykuXG4gICAgICAgICAgaWYgKHR5cGVvZiBpY3VFeHByZXNzaW9uICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2UgSUNVIGV4cHJlc3Npb24gaW4gXCIke3RlbXBsYXRlVHJhbnNsYXRpb259XCIgbWVzc2FnZS5gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbW1lbnQgbm9kZSB0aGF0IHdpbGwgYW5jaG9yIHRoZSBJQ1UgZXhwcmVzc2lvblxuICAgICAgICAgIGNvbnN0IGljdU5vZGVJbmRleCA9IHN0YXJ0SW5kZXggKyBpMThuVmFyc0NvdW50Kys7XG4gICAgICAgICAgY3JlYXRlT3BDb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICBDT01NRU5UX01BUktFUiwgbmdEZXZNb2RlID8gYElDVSAke2ljdU5vZGVJbmRleH1gIDogJycsIGljdU5vZGVJbmRleCxcbiAgICAgICAgICAgICAgcGFyZW50SW5kZXggPDwgSTE4bk11dGF0ZU9wQ29kZS5TSElGVF9QQVJFTlQgfCBJMThuTXV0YXRlT3BDb2RlLkFwcGVuZENoaWxkKTtcblxuICAgICAgICAgIC8vIFVwZGF0ZSBjb2RlcyBmb3IgdGhlIElDVSBleHByZXNzaW9uXG4gICAgICAgICAgY29uc3QgbWFzayA9IGdldEJpbmRpbmdNYXNrKGljdUV4cHJlc3Npb24pO1xuICAgICAgICAgIGljdVN0YXJ0KGljdUV4cHJlc3Npb25zLCBpY3VFeHByZXNzaW9uLCBpY3VOb2RlSW5kZXgsIGljdU5vZGVJbmRleCk7XG4gICAgICAgICAgLy8gU2luY2UgdGhpcyBpcyByZWN1cnNpdmUsIHRoZSBsYXN0IFRJY3UgdGhhdCB3YXMgcHVzaGVkIGlzIHRoZSBvbmUgd2Ugd2FudFxuICAgICAgICAgIGNvbnN0IHRJY3VJbmRleCA9IGljdUV4cHJlc3Npb25zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgdXBkYXRlT3BDb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICB0b01hc2tCaXQoaWN1RXhwcmVzc2lvbi5tYWluQmluZGluZyksICAvLyBtYXNrIG9mIHRoZSBtYWluIGJpbmRpbmdcbiAgICAgICAgICAgICAgMywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2tpcCAzIG9wQ29kZXMgaWYgbm90IGNoYW5nZWRcbiAgICAgICAgICAgICAgLTEgLSBpY3VFeHByZXNzaW9uLm1haW5CaW5kaW5nLFxuICAgICAgICAgICAgICBpY3VOb2RlSW5kZXggPDwgSTE4blVwZGF0ZU9wQ29kZS5TSElGVF9SRUYgfCBJMThuVXBkYXRlT3BDb2RlLkljdVN3aXRjaCwgdEljdUluZGV4LFxuICAgICAgICAgICAgICBtYXNrLCAgLy8gbWFzayBvZiBhbGwgdGhlIGJpbmRpbmdzIG9mIHRoaXMgSUNVIGV4cHJlc3Npb25cbiAgICAgICAgICAgICAgMiwgICAgIC8vIHNraXAgMiBvcENvZGVzIGlmIG5vdCBjaGFuZ2VkXG4gICAgICAgICAgICAgIGljdU5vZGVJbmRleCA8PCBJMThuVXBkYXRlT3BDb2RlLlNISUZUX1JFRiB8IEkxOG5VcGRhdGVPcENvZGUuSWN1VXBkYXRlLCB0SWN1SW5kZXgpO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2pdICE9PSAnJykge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSBwYXJ0c1tqXSBhcyBzdHJpbmc7XG4gICAgICAgICAgLy8gRXZlbiBpbmRleGVzIGFyZSB0ZXh0IChpbmNsdWRpbmcgYmluZGluZ3MpXG4gICAgICAgICAgY29uc3QgaGFzQmluZGluZyA9IHRleHQubWF0Y2goQklORElOR19SRUdFWFApO1xuICAgICAgICAgIC8vIENyZWF0ZSB0ZXh0IG5vZGVzXG4gICAgICAgICAgY29uc3QgdGV4dE5vZGVJbmRleCA9IHN0YXJ0SW5kZXggKyBpMThuVmFyc0NvdW50Kys7XG4gICAgICAgICAgY3JlYXRlT3BDb2Rlcy5wdXNoKFxuICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGJpbmRpbmcsIHRoZSB2YWx1ZSB3aWxsIGJlIHNldCBkdXJpbmcgdXBkYXRlXG4gICAgICAgICAgICAgIGhhc0JpbmRpbmcgPyAnJyA6IHRleHQsIHRleHROb2RlSW5kZXgsXG4gICAgICAgICAgICAgIHBhcmVudEluZGV4IDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUEFSRU5UIHwgSTE4bk11dGF0ZU9wQ29kZS5BcHBlbmRDaGlsZCk7XG5cbiAgICAgICAgICBpZiAoaGFzQmluZGluZykge1xuICAgICAgICAgICAgYWRkQWxsVG9BcnJheShnZW5lcmF0ZUJpbmRpbmdVcGRhdGVPcENvZGVzKHRleHQsIHRleHROb2RlSW5kZXgpLCB1cGRhdGVPcENvZGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaTE4blZhcnNDb3VudCA+IDApIHtcbiAgICBhbGxvY0V4cGFuZG8odFZpZXcsIGxWaWV3LCBpMThuVmFyc0NvdW50KTtcbiAgfVxuXG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXR0YWNoSTE4bk9wQ29kZXNEZWJ1ZyhcbiAgICAgICAgICBjcmVhdGVPcENvZGVzLCB1cGRhdGVPcENvZGVzLCBpY3VFeHByZXNzaW9ucy5sZW5ndGggPyBpY3VFeHByZXNzaW9ucyA6IG51bGwsIGxWaWV3KTtcblxuICAvLyBOT1RFOiBsb2NhbCB2YXIgbmVlZGVkIHRvIHByb3Blcmx5IGFzc2VydCB0aGUgdHlwZSBvZiBgVEkxOG5gLlxuICBjb25zdCB0STE4bjogVEkxOG4gPSB7XG4gICAgdmFyczogaTE4blZhcnNDb3VudCxcbiAgICBjcmVhdGU6IGNyZWF0ZU9wQ29kZXMsXG4gICAgdXBkYXRlOiB1cGRhdGVPcENvZGVzLFxuICAgIGljdXM6IGljdUV4cHJlc3Npb25zLmxlbmd0aCA/IGljdUV4cHJlc3Npb25zIDogbnVsbCxcbiAgfTtcblxuICB0Vmlldy5kYXRhW2luZGV4ICsgSEVBREVSX09GRlNFVF0gPSB0STE4bjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kSTE4bk5vZGUoXG4gICAgdFZpZXc6IFRWaWV3LCB0Tm9kZTogVE5vZGUsIHBhcmVudFROb2RlOiBUTm9kZSwgcHJldmlvdXNUTm9kZTogVE5vZGUgfCBudWxsLFxuICAgIGxWaWV3OiBMVmlldyk6IFROb2RlIHtcbiAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5yZW5kZXJlck1vdmVOb2RlKys7XG4gIGNvbnN0IG5leHROb2RlID0gdE5vZGUubmV4dDtcbiAgaWYgKCFwcmV2aW91c1ROb2RlKSB7XG4gICAgcHJldmlvdXNUTm9kZSA9IHBhcmVudFROb2RlO1xuICB9XG5cbiAgLy8gUmUtb3JnYW5pemUgbm9kZSB0cmVlIHRvIHB1dCB0aGlzIG5vZGUgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24uXG4gIGlmIChwcmV2aW91c1ROb2RlID09PSBwYXJlbnRUTm9kZSAmJiB0Tm9kZSAhPT0gcGFyZW50VE5vZGUuY2hpbGQpIHtcbiAgICB0Tm9kZS5uZXh0ID0gcGFyZW50VE5vZGUuY2hpbGQ7XG4gICAgcGFyZW50VE5vZGUuY2hpbGQgPSB0Tm9kZTtcbiAgfSBlbHNlIGlmIChwcmV2aW91c1ROb2RlICE9PSBwYXJlbnRUTm9kZSAmJiB0Tm9kZSAhPT0gcHJldmlvdXNUTm9kZS5uZXh0KSB7XG4gICAgdE5vZGUubmV4dCA9IHByZXZpb3VzVE5vZGUubmV4dDtcbiAgICBwcmV2aW91c1ROb2RlLm5leHQgPSB0Tm9kZTtcbiAgfSBlbHNlIHtcbiAgICB0Tm9kZS5uZXh0ID0gbnVsbDtcbiAgfVxuXG4gIGlmIChwYXJlbnRUTm9kZSAhPT0gbFZpZXdbVF9IT1NUXSkge1xuICAgIHROb2RlLnBhcmVudCA9IHBhcmVudFROb2RlIGFzIFRFbGVtZW50Tm9kZTtcbiAgfVxuXG4gIC8vIElmIHROb2RlIHdhcyBtb3ZlZCBhcm91bmQsIHdlIG1pZ2h0IG5lZWQgdG8gZml4IGEgYnJva2VuIGxpbmsuXG4gIGxldCBjdXJzb3I6IFROb2RlfG51bGwgPSB0Tm9kZS5uZXh0O1xuICB3aGlsZSAoY3Vyc29yKSB7XG4gICAgaWYgKGN1cnNvci5uZXh0ID09PSB0Tm9kZSkge1xuICAgICAgY3Vyc29yLm5leHQgPSBuZXh0Tm9kZTtcbiAgICB9XG4gICAgY3Vyc29yID0gY3Vyc29yLm5leHQ7XG4gIH1cblxuICAvLyBJZiB0aGUgcGxhY2Vob2xkZXIgdG8gYXBwZW5kIGlzIGEgcHJvamVjdGlvbiwgd2UgbmVlZCB0byBtb3ZlIHRoZSBwcm9qZWN0ZWQgbm9kZXMgaW5zdGVhZFxuICBpZiAodE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLlByb2plY3Rpb24pIHtcbiAgICBhcHBseVByb2plY3Rpb24odFZpZXcsIGxWaWV3LCB0Tm9kZSBhcyBUUHJvamVjdGlvbk5vZGUpO1xuICAgIHJldHVybiB0Tm9kZTtcbiAgfVxuXG4gIGFwcGVuZENoaWxkKHRWaWV3LCBsVmlldywgZ2V0TmF0aXZlQnlUTm9kZSh0Tm9kZSwgbFZpZXcpLCB0Tm9kZSk7XG5cbiAgY29uc3Qgc2xvdFZhbHVlID0gbFZpZXdbdE5vZGUuaW5kZXhdO1xuICBpZiAodE5vZGUudHlwZSAhPT0gVE5vZGVUeXBlLkNvbnRhaW5lciAmJiBpc0xDb250YWluZXIoc2xvdFZhbHVlKSkge1xuICAgIC8vIE5vZGVzIHRoYXQgaW5qZWN0IFZpZXdDb250YWluZXJSZWYgYWxzbyBoYXZlIGEgY29tbWVudCBub2RlIHRoYXQgc2hvdWxkIGJlIG1vdmVkXG4gICAgYXBwZW5kQ2hpbGQodFZpZXcsIGxWaWV3LCBzbG90VmFsdWVbTkFUSVZFXSwgdE5vZGUpO1xuICB9XG4gIHJldHVybiB0Tm9kZTtcbn1cblxuLyoqXG4gKiBIYW5kbGVzIG1lc3NhZ2Ugc3RyaW5nIHBvc3QtcHJvY2Vzc2luZyBmb3IgaW50ZXJuYXRpb25hbGl6YXRpb24uXG4gKlxuICogSGFuZGxlcyBtZXNzYWdlIHN0cmluZyBwb3N0LXByb2Nlc3NpbmcgYnkgdHJhbnNmb3JtaW5nIGl0IGZyb20gaW50ZXJtZWRpYXRlXG4gKiBmb3JtYXQgKHRoYXQgbWlnaHQgY29udGFpbiBzb21lIG1hcmtlcnMgdGhhdCB3ZSBuZWVkIHRvIHJlcGxhY2UpIHRvIHRoZSBmaW5hbFxuICogZm9ybSwgY29uc3VtYWJsZSBieSBpMThuU3RhcnQgaW5zdHJ1Y3Rpb24uIFBvc3QgcHJvY2Vzc2luZyBzdGVwcyBpbmNsdWRlOlxuICpcbiAqIDEuIFJlc29sdmUgYWxsIG11bHRpLXZhbHVlIGNhc2VzIChsaWtlIFvvv70qMTox77+977+9IzI6Me+/vXzvv70jNDox77+9fO+/vTXvv71dKVxuICogMi4gUmVwbGFjZSBhbGwgSUNVIHZhcnMgKGxpa2UgXCJWQVJfUExVUkFMXCIpXG4gKiAzLiBSZXBsYWNlIGFsbCBwbGFjZWhvbGRlcnMgdXNlZCBpbnNpZGUgSUNVcyBpbiBhIGZvcm0gb2Yge1BMQUNFSE9MREVSfVxuICogNC4gUmVwbGFjZSBhbGwgSUNVIHJlZmVyZW5jZXMgd2l0aCBjb3JyZXNwb25kaW5nIHZhbHVlcyAobGlrZSDvv71JQ1VfRVhQX0lDVV8x77+9KVxuICogICAgaW4gY2FzZSBtdWx0aXBsZSBJQ1VzIGhhdmUgdGhlIHNhbWUgcGxhY2Vob2xkZXIgbmFtZVxuICpcbiAqIEBwYXJhbSBtZXNzYWdlIFJhdyB0cmFuc2xhdGlvbiBzdHJpbmcgZm9yIHBvc3QgcHJvY2Vzc2luZ1xuICogQHBhcmFtIHJlcGxhY2VtZW50cyBTZXQgb2YgcmVwbGFjZW1lbnRzIHRoYXQgc2hvdWxkIGJlIGFwcGxpZWRcbiAqXG4gKiBAcmV0dXJucyBUcmFuc2Zvcm1lZCBzdHJpbmcgdGhhdCBjYW4gYmUgY29uc3VtZWQgYnkgaTE4blN0YXJ0IGluc3RydWN0aW9uXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVpMThuUG9zdHByb2Nlc3MoXG4gICAgbWVzc2FnZTogc3RyaW5nLCByZXBsYWNlbWVudHM6IHtba2V5OiBzdHJpbmddOiAoc3RyaW5nIHwgc3RyaW5nW10pfSA9IHt9KTogc3RyaW5nIHtcbiAgLyoqXG4gICAqIFN0ZXAgMTogcmVzb2x2ZSBhbGwgbXVsdGktdmFsdWUgcGxhY2Vob2xkZXJzIGxpa2UgW++/vSM177+9fO+/vSoxOjHvv73vv70jMjox77+9fO+/vSM0OjHvv71dXG4gICAqXG4gICAqIE5vdGU6IGR1ZSB0byB0aGUgd2F5IHdlIHByb2Nlc3MgbmVzdGVkIHRlbXBsYXRlcyAoQkZTKSwgbXVsdGktdmFsdWUgcGxhY2Vob2xkZXJzIGFyZSB0eXBpY2FsbHlcbiAgICogZ3JvdXBlZCBieSB0ZW1wbGF0ZXMsIGZvciBleGFtcGxlOiBb77+9IzXvv71877+9Izbvv71877+9IzE6Me+/vXzvv70jMzoy77+9XSB3aGVyZSDvv70jNe+/vSBhbmQg77+9Izbvv70gYmVsb25nIHRvIHJvb3RcbiAgICogdGVtcGxhdGUsIO+/vSMxOjHvv70gYmVsb25nIHRvIG5lc3RlZCB0ZW1wbGF0ZSB3aXRoIGluZGV4IDEgYW5kIO+/vSMxOjLvv70gLSBuZXN0ZWQgdGVtcGxhdGUgd2l0aCBpbmRleFxuICAgKiAzLiBIb3dldmVyIGluIHJlYWwgdGVtcGxhdGVzIHRoZSBvcmRlciBtaWdodCBiZSBkaWZmZXJlbnQ6IGkuZS4g77+9IzE6Me+/vSBhbmQvb3Ig77+9IzM6Mu+/vSBtYXkgZ28gaW5cbiAgICogZnJvbnQgb2Yg77+9Izbvv70uIFRoZSBwb3N0IHByb2Nlc3Npbmcgc3RlcCByZXN0b3JlcyB0aGUgcmlnaHQgb3JkZXIgYnkga2VlcGluZyB0cmFjayBvZiB0aGVcbiAgICogdGVtcGxhdGUgaWQgc3RhY2sgYW5kIGxvb2tzIGZvciBwbGFjZWhvbGRlcnMgdGhhdCBiZWxvbmcgdG8gdGhlIGN1cnJlbnRseSBhY3RpdmUgdGVtcGxhdGUuXG4gICAqL1xuICBsZXQgcmVzdWx0OiBzdHJpbmcgPSBtZXNzYWdlO1xuICBpZiAoUFBfTVVMVElfVkFMVUVfUExBQ0VIT0xERVJTX1JFR0VYUC50ZXN0KG1lc3NhZ2UpKSB7XG4gICAgY29uc3QgbWF0Y2hlczoge1trZXk6IHN0cmluZ106IFBvc3Rwcm9jZXNzUGxhY2Vob2xkZXJbXX0gPSB7fTtcbiAgICBjb25zdCB0ZW1wbGF0ZUlkc1N0YWNrOiBudW1iZXJbXSA9IFtST09UX1RFTVBMQVRFX0lEXTtcbiAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShQUF9QTEFDRUhPTERFUlNfUkVHRVhQLCAobTogYW55LCBwaHM6IHN0cmluZywgdG1wbDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBwaHMgfHwgdG1wbDtcbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyczogUG9zdHByb2Nlc3NQbGFjZWhvbGRlcltdID0gbWF0Y2hlc1tjb250ZW50XSB8fCBbXTtcbiAgICAgIGlmICghcGxhY2Vob2xkZXJzLmxlbmd0aCkge1xuICAgICAgICBjb250ZW50LnNwbGl0KCd8JykuZm9yRWFjaCgocGxhY2Vob2xkZXI6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IG1hdGNoID0gcGxhY2Vob2xkZXIubWF0Y2goUFBfVEVNUExBVEVfSURfUkVHRVhQKTtcbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZUlkID0gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSwgMTApIDogUk9PVF9URU1QTEFURV9JRDtcbiAgICAgICAgICBjb25zdCBpc0Nsb3NlVGVtcGxhdGVUYWcgPSBQUF9DTE9TRV9URU1QTEFURV9SRUdFWFAudGVzdChwbGFjZWhvbGRlcik7XG4gICAgICAgICAgcGxhY2Vob2xkZXJzLnB1c2goW3RlbXBsYXRlSWQsIGlzQ2xvc2VUZW1wbGF0ZVRhZywgcGxhY2Vob2xkZXJdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1hdGNoZXNbY29udGVudF0gPSBwbGFjZWhvbGRlcnM7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGxhY2Vob2xkZXJzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGkxOG4gcG9zdHByb2Nlc3M6IHVubWF0Y2hlZCBwbGFjZWhvbGRlciAtICR7Y29udGVudH1gKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudFRlbXBsYXRlSWQgPSB0ZW1wbGF0ZUlkc1N0YWNrW3RlbXBsYXRlSWRzU3RhY2subGVuZ3RoIC0gMV07XG4gICAgICBsZXQgaWR4ID0gMDtcbiAgICAgIC8vIGZpbmQgcGxhY2Vob2xkZXIgaW5kZXggdGhhdCBtYXRjaGVzIGN1cnJlbnQgdGVtcGxhdGUgaWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2Vob2xkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwbGFjZWhvbGRlcnNbaV1bMF0gPT09IGN1cnJlbnRUZW1wbGF0ZUlkKSB7XG4gICAgICAgICAgaWR4ID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIHRlbXBsYXRlIGlkIHN0YWNrIGJhc2VkIG9uIHRoZSBjdXJyZW50IHRhZyBleHRyYWN0ZWRcbiAgICAgIGNvbnN0IFt0ZW1wbGF0ZUlkLCBpc0Nsb3NlVGVtcGxhdGVUYWcsIHBsYWNlaG9sZGVyXSA9IHBsYWNlaG9sZGVyc1tpZHhdO1xuICAgICAgaWYgKGlzQ2xvc2VUZW1wbGF0ZVRhZykge1xuICAgICAgICB0ZW1wbGF0ZUlkc1N0YWNrLnBvcCgpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50VGVtcGxhdGVJZCAhPT0gdGVtcGxhdGVJZCkge1xuICAgICAgICB0ZW1wbGF0ZUlkc1N0YWNrLnB1c2godGVtcGxhdGVJZCk7XG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgcHJvY2Vzc2VkIHRhZyBmcm9tIHRoZSBsaXN0XG4gICAgICBwbGFjZWhvbGRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm4gY3VycmVudCByZXN1bHQgaWYgbm8gcmVwbGFjZW1lbnRzIHNwZWNpZmllZFxuICBpZiAoIU9iamVjdC5rZXlzKHJlcGxhY2VtZW50cykubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGVwIDI6IHJlcGxhY2UgYWxsIElDVSB2YXJzIChsaWtlIFwiVkFSX1BMVVJBTFwiKVxuICAgKi9cbiAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoUFBfSUNVX1ZBUlNfUkVHRVhQLCAobWF0Y2gsIHN0YXJ0LCBrZXksIF90eXBlLCBfaWR4LCBlbmQpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiByZXBsYWNlbWVudHMuaGFzT3duUHJvcGVydHkoa2V5KSA/IGAke3N0YXJ0fSR7cmVwbGFjZW1lbnRzW2tleV19JHtlbmR9YCA6IG1hdGNoO1xuICB9KTtcblxuICAvKipcbiAgICogU3RlcCAzOiByZXBsYWNlIGFsbCBwbGFjZWhvbGRlcnMgdXNlZCBpbnNpZGUgSUNVcyBpbiBhIGZvcm0gb2Yge1BMQUNFSE9MREVSfVxuICAgKi9cbiAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoUFBfSUNVX1BMQUNFSE9MREVSU19SRUdFWFAsIChtYXRjaCwga2V5KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gcmVwbGFjZW1lbnRzLmhhc093blByb3BlcnR5KGtleSkgPyByZXBsYWNlbWVudHNba2V5XSBhcyBzdHJpbmcgOiBtYXRjaDtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFN0ZXAgNDogcmVwbGFjZSBhbGwgSUNVIHJlZmVyZW5jZXMgd2l0aCBjb3JyZXNwb25kaW5nIHZhbHVlcyAobGlrZSDvv71JQ1VfRVhQX0lDVV8x77+9KSBpbiBjYXNlXG4gICAqIG11bHRpcGxlIElDVXMgaGF2ZSB0aGUgc2FtZSBwbGFjZWhvbGRlciBuYW1lXG4gICAqL1xuICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShQUF9JQ1VTX1JFR0VYUCwgKG1hdGNoLCBrZXkpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChyZXBsYWNlbWVudHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29uc3QgbGlzdCA9IHJlcGxhY2VtZW50c1trZXldIGFzIHN0cmluZ1tdO1xuICAgICAgaWYgKCFsaXN0Lmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGkxOG4gcG9zdHByb2Nlc3M6IHVubWF0Y2hlZCBJQ1UgLSAke21hdGNofSB3aXRoIGtleTogJHtrZXl9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdC5zaGlmdCgpICE7XG4gICAgfVxuICAgIHJldHVybiBtYXRjaDtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUcmFuc2xhdGVzIGEgdHJhbnNsYXRpb24gYmxvY2sgbWFya2VkIGJ5IGBpMThuU3RhcnRgIGFuZCBgaTE4bkVuZGAuIEl0IGluc2VydHMgdGhlIHRleHQvSUNVIG5vZGVzXG4gKiBpbnRvIHRoZSByZW5kZXIgdHJlZSwgbW92ZXMgdGhlIHBsYWNlaG9sZGVyIG5vZGVzIGFuZCByZW1vdmVzIHRoZSBkZWxldGVkIG5vZGVzLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1aTE4bkVuZCgpOiB2b2lkIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRWaWV3LCBgdFZpZXcgc2hvdWxkIGJlIGRlZmluZWRgKTtcbiAgaTE4bkVuZEZpcnN0UGFzcyh0VmlldywgbFZpZXcpO1xuICAvLyBTdG9wIGRlbGF5aW5nIHByb2plY3Rpb25zXG4gIHNldERlbGF5UHJvamVjdGlvbihmYWxzZSk7XG59XG5cbi8qKlxuICogU2VlIGBpMThuRW5kYCBhYm92ZS5cbiAqL1xuZnVuY3Rpb24gaTE4bkVuZEZpcnN0UGFzcyh0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldykge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RXF1YWwoXG4gICAgICAgICAgICAgICAgICAgZ2V0QmluZGluZ0luZGV4KCksIHRWaWV3LmJpbmRpbmdTdGFydEluZGV4LFxuICAgICAgICAgICAgICAgICAgICdpMThuRW5kIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIGFueSBiaW5kaW5nJyk7XG5cbiAgY29uc3Qgcm9vdEluZGV4ID0gaTE4bkluZGV4U3RhY2tbaTE4bkluZGV4U3RhY2tQb2ludGVyLS1dO1xuICBjb25zdCB0STE4biA9IHRWaWV3LmRhdGFbcm9vdEluZGV4ICsgSEVBREVSX09GRlNFVF0gYXMgVEkxOG47XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRJMThuLCBgWW91IHNob3VsZCBjYWxsIGkxOG5TdGFydCBiZWZvcmUgaTE4bkVuZGApO1xuXG4gIC8vIEZpbmQgdGhlIGxhc3Qgbm9kZSB0aGF0IHdhcyBhZGRlZCBiZWZvcmUgYGkxOG5FbmRgXG4gIGNvbnN0IGxhc3RDcmVhdGVkTm9kZSA9IGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpO1xuXG4gIC8vIFJlYWQgdGhlIGluc3RydWN0aW9ucyB0byBpbnNlcnQvbW92ZS9yZW1vdmUgRE9NIGVsZW1lbnRzXG4gIGNvbnN0IHZpc2l0ZWROb2RlcyA9IHJlYWRDcmVhdGVPcENvZGVzKHJvb3RJbmRleCwgdEkxOG4uY3JlYXRlLCB0VmlldywgbFZpZXcpO1xuXG4gIC8vIFJlbW92ZSBkZWxldGVkIG5vZGVzXG4gIGxldCBpbmRleCA9IHJvb3RJbmRleCArIDE7XG4gIHdoaWxlIChpbmRleCA8PSBsYXN0Q3JlYXRlZE5vZGUuaW5kZXggLSBIRUFERVJfT0ZGU0VUKSB7XG4gICAgaWYgKHZpc2l0ZWROb2Rlcy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgIHJlbW92ZU5vZGUodFZpZXcsIGxWaWV3LCBpbmRleCwgLyogbWFya0FzRGV0YWNoZWQgKi8gdHJ1ZSk7XG4gICAgfVxuICAgIC8vIENoZWNrIGlmIGFuIGVsZW1lbnQgaGFzIGFueSBsb2NhbCByZWZzIGFuZCBza2lwIHRoZW1cbiAgICBjb25zdCB0Tm9kZSA9IGdldFROb2RlKHRWaWV3LCBpbmRleCk7XG4gICAgaWYgKHROb2RlICYmICh0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuQ29udGFpbmVyIHx8IHROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgICB0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcikgJiZcbiAgICAgICAgdE5vZGUubG9jYWxOYW1lcyAhPT0gbnVsbCkge1xuICAgICAgLy8gRGl2aWRlIGJ5IDIgdG8gZ2V0IHRoZSBudW1iZXIgb2YgbG9jYWwgcmVmcyxcbiAgICAgIC8vIHNpbmNlIHRoZXkgYXJlIHN0b3JlZCBhcyBhbiBhcnJheSB0aGF0IGFsc28gaW5jbHVkZXMgZGlyZWN0aXZlIGluZGV4ZXMsXG4gICAgICAvLyBpLmUuIFtcImxvY2FsUmVmXCIsIGRpcmVjdGl2ZUluZGV4LCAuLi5dXG4gICAgICBpbmRleCArPSB0Tm9kZS5sb2NhbE5hbWVzLmxlbmd0aCA+PiAxO1xuICAgIH1cbiAgICBpbmRleCsrO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgc3RvcmVzIHRoZSBkeW5hbWljIFROb2RlLCBhbmQgdW5ob29rcyBpdCBmcm9tIHRoZSB0cmVlIGZvciBub3cuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUR5bmFtaWNOb2RlQXRJbmRleChcbiAgICB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlciwgdHlwZTogVE5vZGVUeXBlLCBuYXRpdmU6IFJFbGVtZW50IHwgUlRleHQgfCBudWxsLFxuICAgIG5hbWU6IHN0cmluZyB8IG51bGwpOiBURWxlbWVudE5vZGV8VEljdUNvbnRhaW5lck5vZGUge1xuICBjb25zdCBwcmV2aW91c09yUGFyZW50VE5vZGUgPSBnZXRQcmV2aW91c09yUGFyZW50VE5vZGUoKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERhdGFJblJhbmdlKGxWaWV3LCBpbmRleCArIEhFQURFUl9PRkZTRVQpO1xuICBsVmlld1tpbmRleCArIEhFQURFUl9PRkZTRVRdID0gbmF0aXZlO1xuICBjb25zdCB0Tm9kZSA9IGdldE9yQ3JlYXRlVE5vZGUodFZpZXcsIGxWaWV3W1RfSE9TVF0sIGluZGV4LCB0eXBlIGFzIGFueSwgbmFtZSwgbnVsbCk7XG5cbiAgLy8gV2UgYXJlIGNyZWF0aW5nIGEgZHluYW1pYyBub2RlLCB0aGUgcHJldmlvdXMgdE5vZGUgbWlnaHQgbm90IGJlIHBvaW50aW5nIGF0IHRoaXMgbm9kZS5cbiAgLy8gV2Ugd2lsbCBsaW5rIG91cnNlbHZlcyBpbnRvIHRoZSB0cmVlIGxhdGVyIHdpdGggYGFwcGVuZEkxOG5Ob2RlYC5cbiAgaWYgKHByZXZpb3VzT3JQYXJlbnRUTm9kZSAmJiBwcmV2aW91c09yUGFyZW50VE5vZGUubmV4dCA9PT0gdE5vZGUpIHtcbiAgICBwcmV2aW91c09yUGFyZW50VE5vZGUubmV4dCA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gdE5vZGU7XG59XG5cbmZ1bmN0aW9uIHJlYWRDcmVhdGVPcENvZGVzKFxuICAgIGluZGV4OiBudW1iZXIsIGNyZWF0ZU9wQ29kZXM6IEkxOG5NdXRhdGVPcENvZGVzLCB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldyk6IG51bWJlcltdIHtcbiAgY29uc3QgcmVuZGVyZXIgPSBsVmlld1tSRU5ERVJFUl07XG4gIGxldCBjdXJyZW50VE5vZGU6IFROb2RlfG51bGwgPSBudWxsO1xuICBsZXQgcHJldmlvdXNUTm9kZTogVE5vZGV8bnVsbCA9IG51bGw7XG4gIGNvbnN0IHZpc2l0ZWROb2RlczogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcmVhdGVPcENvZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgb3BDb2RlID0gY3JlYXRlT3BDb2Rlc1tpXTtcbiAgICBpZiAodHlwZW9mIG9wQ29kZSA9PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGV4dFJOb2RlID0gY3JlYXRlVGV4dE5vZGUob3BDb2RlLCByZW5kZXJlcik7XG4gICAgICBjb25zdCB0ZXh0Tm9kZUluZGV4ID0gY3JlYXRlT3BDb2Rlc1srK2ldIGFzIG51bWJlcjtcbiAgICAgIG5nRGV2TW9kZSAmJiBuZ0Rldk1vZGUucmVuZGVyZXJDcmVhdGVUZXh0Tm9kZSsrO1xuICAgICAgcHJldmlvdXNUTm9kZSA9IGN1cnJlbnRUTm9kZTtcbiAgICAgIGN1cnJlbnRUTm9kZSA9XG4gICAgICAgICAgY3JlYXRlRHluYW1pY05vZGVBdEluZGV4KHRWaWV3LCBsVmlldywgdGV4dE5vZGVJbmRleCwgVE5vZGVUeXBlLkVsZW1lbnQsIHRleHRSTm9kZSwgbnVsbCk7XG4gICAgICB2aXNpdGVkTm9kZXMucHVzaCh0ZXh0Tm9kZUluZGV4KTtcbiAgICAgIHNldElzTm90UGFyZW50KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3BDb2RlID09ICdudW1iZXInKSB7XG4gICAgICBzd2l0Y2ggKG9wQ29kZSAmIEkxOG5NdXRhdGVPcENvZGUuTUFTS19PUENPREUpIHtcbiAgICAgICAgY2FzZSBJMThuTXV0YXRlT3BDb2RlLkFwcGVuZENoaWxkOlxuICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uTm9kZUluZGV4ID0gb3BDb2RlID4+PiBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1BBUkVOVDtcbiAgICAgICAgICBsZXQgZGVzdGluYXRpb25UTm9kZTogVE5vZGU7XG4gICAgICAgICAgaWYgKGRlc3RpbmF0aW9uTm9kZUluZGV4ID09PSBpbmRleCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRlc3RpbmF0aW9uIG5vZGUgaXMgYGkxOG5TdGFydGAsIHdlIGRvbid0IGhhdmUgYVxuICAgICAgICAgICAgLy8gdG9wLWxldmVsIG5vZGUgYW5kIHdlIHNob3VsZCB1c2UgdGhlIGhvc3Qgbm9kZSBpbnN0ZWFkXG4gICAgICAgICAgICBkZXN0aW5hdGlvblROb2RlID0gbFZpZXdbVF9IT1NUXSAhO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXN0aW5hdGlvblROb2RlID0gZ2V0VE5vZGUodFZpZXcsIGRlc3RpbmF0aW9uTm9kZUluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICAgICAgICBjdXJyZW50VE5vZGUgISxcbiAgICAgICAgICAgICAgICAgIGBZb3UgbmVlZCB0byBjcmVhdGUgb3Igc2VsZWN0IGEgbm9kZSBiZWZvcmUgeW91IGNhbiBpbnNlcnQgaXQgaW50byB0aGUgRE9NYCk7XG4gICAgICAgICAgcHJldmlvdXNUTm9kZSA9XG4gICAgICAgICAgICAgIGFwcGVuZEkxOG5Ob2RlKHRWaWV3LCBjdXJyZW50VE5vZGUgISwgZGVzdGluYXRpb25UTm9kZSwgcHJldmlvdXNUTm9kZSwgbFZpZXcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEkxOG5NdXRhdGVPcENvZGUuU2VsZWN0OlxuICAgICAgICAgIC8vIE5lZ2F0aXZlIGluZGljaWVzIGluZGljYXRlIHRoYXQgYSBnaXZlbiBUTm9kZSBpcyBhIHNpYmxpbmcgbm9kZSwgbm90IGEgcGFyZW50IG5vZGVcbiAgICAgICAgICAvLyAoc2VlIGBpMThuU3RhcnRGaXJzdFBhc3NgIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uKS5cbiAgICAgICAgICBjb25zdCBpc1BhcmVudCA9IG9wQ29kZSA+PSAwO1xuICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IChpc1BhcmVudCA/IG9wQ29kZSA6IH5vcENvZGUpID4+PiBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRjtcbiAgICAgICAgICB2aXNpdGVkTm9kZXMucHVzaChub2RlSW5kZXgpO1xuICAgICAgICAgIHByZXZpb3VzVE5vZGUgPSBjdXJyZW50VE5vZGU7XG4gICAgICAgICAgY3VycmVudFROb2RlID0gZ2V0VE5vZGUodFZpZXcsIG5vZGVJbmRleCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRUTm9kZSkge1xuICAgICAgICAgICAgc2V0UHJldmlvdXNPclBhcmVudFROb2RlKGN1cnJlbnRUTm9kZSwgaXNQYXJlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBJMThuTXV0YXRlT3BDb2RlLkVsZW1lbnRFbmQ6XG4gICAgICAgICAgY29uc3QgZWxlbWVudEluZGV4ID0gb3BDb2RlID4+PiBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRjtcbiAgICAgICAgICBwcmV2aW91c1ROb2RlID0gY3VycmVudFROb2RlID0gZ2V0VE5vZGUodFZpZXcsIGVsZW1lbnRJbmRleCk7XG4gICAgICAgICAgc2V0UHJldmlvdXNPclBhcmVudFROb2RlKGN1cnJlbnRUTm9kZSwgZmFsc2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEkxOG5NdXRhdGVPcENvZGUuQXR0cjpcbiAgICAgICAgICBjb25zdCBlbGVtZW50Tm9kZUluZGV4ID0gb3BDb2RlID4+PiBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRjtcbiAgICAgICAgICBjb25zdCBhdHRyTmFtZSA9IGNyZWF0ZU9wQ29kZXNbKytpXSBhcyBzdHJpbmc7XG4gICAgICAgICAgY29uc3QgYXR0clZhbHVlID0gY3JlYXRlT3BDb2Rlc1srK2ldIGFzIHN0cmluZztcbiAgICAgICAgICAvLyBUaGlzIGNvZGUgaXMgdXNlZCBmb3IgSUNVIGV4cHJlc3Npb25zIG9ubHksIHNpbmNlIHdlIGRvbid0IHN1cHBvcnRcbiAgICAgICAgICAvLyBkaXJlY3RpdmVzL2NvbXBvbmVudHMgaW4gSUNVcywgd2UgZG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBpbnB1dHMgaGVyZVxuICAgICAgICAgIGVsZW1lbnRBdHRyaWJ1dGVJbnRlcm5hbChlbGVtZW50Tm9kZUluZGV4LCBhdHRyTmFtZSwgYXR0clZhbHVlLCB0VmlldywgbFZpZXcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBtdXRhdGUgb3BlcmF0aW9uIGZvciBcIiR7b3BDb2RlfVwiYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAob3BDb2RlKSB7XG4gICAgICAgIGNhc2UgQ09NTUVOVF9NQVJLRVI6XG4gICAgICAgICAgY29uc3QgY29tbWVudFZhbHVlID0gY3JlYXRlT3BDb2Rlc1srK2ldIGFzIHN0cmluZztcbiAgICAgICAgICBjb25zdCBjb21tZW50Tm9kZUluZGV4ID0gY3JlYXRlT3BDb2Rlc1srK2ldIGFzIG51bWJlcjtcbiAgICAgICAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RXF1YWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgY29tbWVudFZhbHVlLCAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGBFeHBlY3RlZCBcIiR7Y29tbWVudFZhbHVlfVwiIHRvIGJlIGEgY29tbWVudCBub2RlIHZhbHVlYCk7XG4gICAgICAgICAgY29uc3QgY29tbWVudFJOb2RlID0gcmVuZGVyZXIuY3JlYXRlQ29tbWVudChjb21tZW50VmFsdWUpO1xuICAgICAgICAgIG5nRGV2TW9kZSAmJiBuZ0Rldk1vZGUucmVuZGVyZXJDcmVhdGVDb21tZW50Kys7XG4gICAgICAgICAgcHJldmlvdXNUTm9kZSA9IGN1cnJlbnRUTm9kZTtcbiAgICAgICAgICBjdXJyZW50VE5vZGUgPSBjcmVhdGVEeW5hbWljTm9kZUF0SW5kZXgoXG4gICAgICAgICAgICAgIHRWaWV3LCBsVmlldywgY29tbWVudE5vZGVJbmRleCwgVE5vZGVUeXBlLkljdUNvbnRhaW5lciwgY29tbWVudFJOb2RlLCBudWxsKTtcbiAgICAgICAgICB2aXNpdGVkTm9kZXMucHVzaChjb21tZW50Tm9kZUluZGV4KTtcbiAgICAgICAgICBhdHRhY2hQYXRjaERhdGEoY29tbWVudFJOb2RlLCBsVmlldyk7XG4gICAgICAgICAgKGN1cnJlbnRUTm9kZSBhcyBUSWN1Q29udGFpbmVyTm9kZSkuYWN0aXZlQ2FzZUluZGV4ID0gbnVsbDtcbiAgICAgICAgICAvLyBXZSB3aWxsIGFkZCB0aGUgY2FzZSBub2RlcyBsYXRlciwgZHVyaW5nIHRoZSB1cGRhdGUgcGhhc2VcbiAgICAgICAgICBzZXRJc05vdFBhcmVudCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEVMRU1FTlRfTUFSS0VSOlxuICAgICAgICAgIGNvbnN0IHRhZ05hbWVWYWx1ZSA9IGNyZWF0ZU9wQ29kZXNbKytpXSBhcyBzdHJpbmc7XG4gICAgICAgICAgY29uc3QgZWxlbWVudE5vZGVJbmRleCA9IGNyZWF0ZU9wQ29kZXNbKytpXSBhcyBudW1iZXI7XG4gICAgICAgICAgbmdEZXZNb2RlICYmIGFzc2VydEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIHRhZ05hbWVWYWx1ZSwgJ3N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBgRXhwZWN0ZWQgXCIke3RhZ05hbWVWYWx1ZX1cIiB0byBiZSBhbiBlbGVtZW50IG5vZGUgdGFnIG5hbWVgKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50Uk5vZGUgPSByZW5kZXJlci5jcmVhdGVFbGVtZW50KHRhZ05hbWVWYWx1ZSk7XG4gICAgICAgICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5yZW5kZXJlckNyZWF0ZUVsZW1lbnQrKztcbiAgICAgICAgICBwcmV2aW91c1ROb2RlID0gY3VycmVudFROb2RlO1xuICAgICAgICAgIGN1cnJlbnRUTm9kZSA9IGNyZWF0ZUR5bmFtaWNOb2RlQXRJbmRleChcbiAgICAgICAgICAgICAgdFZpZXcsIGxWaWV3LCBlbGVtZW50Tm9kZUluZGV4LCBUTm9kZVR5cGUuRWxlbWVudCwgZWxlbWVudFJOb2RlLCB0YWdOYW1lVmFsdWUpO1xuICAgICAgICAgIHZpc2l0ZWROb2Rlcy5wdXNoKGVsZW1lbnROb2RlSW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiBtdXRhdGUgb3BlcmF0aW9uIGZvciBcIiR7b3BDb2RlfVwiYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0SXNOb3RQYXJlbnQoKTtcblxuICByZXR1cm4gdmlzaXRlZE5vZGVzO1xufVxuXG5mdW5jdGlvbiByZWFkVXBkYXRlT3BDb2RlcyhcbiAgICB1cGRhdGVPcENvZGVzOiBJMThuVXBkYXRlT3BDb2RlcywgaWN1czogVEljdVtdIHwgbnVsbCwgYmluZGluZ3NTdGFydEluZGV4OiBudW1iZXIsXG4gICAgY2hhbmdlTWFzazogbnVtYmVyLCB0VmlldzogVFZpZXcsIGxWaWV3OiBMVmlldywgYnlwYXNzQ2hlY2tCaXQgPSBmYWxzZSkge1xuICBsZXQgY2FzZUNyZWF0ZWQgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGRhdGVPcENvZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gYml0IGNvZGUgdG8gY2hlY2sgaWYgd2Ugc2hvdWxkIGFwcGx5IHRoZSBuZXh0IHVwZGF0ZVxuICAgIGNvbnN0IGNoZWNrQml0ID0gdXBkYXRlT3BDb2Rlc1tpXSBhcyBudW1iZXI7XG4gICAgLy8gTnVtYmVyIG9mIG9wQ29kZXMgdG8gc2tpcCB1bnRpbCBuZXh0IHNldCBvZiB1cGRhdGUgY29kZXNcbiAgICBjb25zdCBza2lwQ29kZXMgPSB1cGRhdGVPcENvZGVzWysraV0gYXMgbnVtYmVyO1xuICAgIGlmIChieXBhc3NDaGVja0JpdCB8fCAoY2hlY2tCaXQgJiBjaGFuZ2VNYXNrKSkge1xuICAgICAgLy8gVGhlIHZhbHVlIGhhcyBiZWVuIHVwZGF0ZWQgc2luY2UgbGFzdCBjaGVja2VkXG4gICAgICBsZXQgdmFsdWUgPSAnJztcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8PSAoaSArIHNraXBDb2Rlcyk7IGorKykge1xuICAgICAgICBjb25zdCBvcENvZGUgPSB1cGRhdGVPcENvZGVzW2pdO1xuICAgICAgICBpZiAodHlwZW9mIG9wQ29kZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIHZhbHVlICs9IG9wQ29kZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3BDb2RlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgaWYgKG9wQ29kZSA8IDApIHtcbiAgICAgICAgICAgIC8vIEl0J3MgYSBiaW5kaW5nIGluZGV4IHdob3NlIHZhbHVlIGlzIG5lZ2F0aXZlXG4gICAgICAgICAgICB2YWx1ZSArPSByZW5kZXJTdHJpbmdpZnkobFZpZXdbYmluZGluZ3NTdGFydEluZGV4IC0gb3BDb2RlXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IG9wQ29kZSA+Pj4gSTE4blVwZGF0ZU9wQ29kZS5TSElGVF9SRUY7XG4gICAgICAgICAgICBsZXQgdEljdUluZGV4OiBudW1iZXI7XG4gICAgICAgICAgICBsZXQgdEljdTogVEljdTtcbiAgICAgICAgICAgIGxldCBpY3VUTm9kZTogVEljdUNvbnRhaW5lck5vZGU7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wQ29kZSAmIEkxOG5VcGRhdGVPcENvZGUuTUFTS19PUENPREUpIHtcbiAgICAgICAgICAgICAgY2FzZSBJMThuVXBkYXRlT3BDb2RlLkF0dHI6XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcE5hbWUgPSB1cGRhdGVPcENvZGVzWysral0gYXMgc3RyaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNhbml0aXplRm4gPSB1cGRhdGVPcENvZGVzWysral0gYXMgU2FuaXRpemVyRm4gfCBudWxsO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRQcm9wZXJ0eUludGVybmFsKHRWaWV3LCBsVmlldywgbm9kZUluZGV4LCBwcm9wTmFtZSwgdmFsdWUsIHNhbml0aXplRm4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIEkxOG5VcGRhdGVPcENvZGUuVGV4dDpcbiAgICAgICAgICAgICAgICB0ZXh0QmluZGluZ0ludGVybmFsKGxWaWV3LCBub2RlSW5kZXgsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBJMThuVXBkYXRlT3BDb2RlLkljdVN3aXRjaDpcbiAgICAgICAgICAgICAgICB0SWN1SW5kZXggPSB1cGRhdGVPcENvZGVzWysral0gYXMgbnVtYmVyO1xuICAgICAgICAgICAgICAgIHRJY3UgPSBpY3VzICFbdEljdUluZGV4XTtcbiAgICAgICAgICAgICAgICBpY3VUTm9kZSA9IGdldFROb2RlKHRWaWV3LCBub2RlSW5kZXgpIGFzIFRJY3VDb250YWluZXJOb2RlO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGFjdGl2ZSBjYXNlLCBkZWxldGUgdGhlIG9sZCBub2Rlc1xuICAgICAgICAgICAgICAgIGlmIChpY3VUTm9kZS5hY3RpdmVDYXNlSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUNvZGVzID0gdEljdS5yZW1vdmVbaWN1VE5vZGUuYWN0aXZlQ2FzZUluZGV4XTtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgcmVtb3ZlQ29kZXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlT3BDb2RlID0gcmVtb3ZlQ29kZXNba10gYXMgbnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlbW92ZU9wQ29kZSAmIEkxOG5NdXRhdGVPcENvZGUuTUFTS19PUENPREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIEkxOG5NdXRhdGVPcENvZGUuUmVtb3ZlOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZUluZGV4ID0gcmVtb3ZlT3BDb2RlID4+PiBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBET00gZWxlbWVudCwgYnV0IGRvICpub3QqIG1hcmsgVE5vZGUgYXMgZGV0YWNoZWQsIHNpbmNlIHdlIGFyZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBzd2l0Y2hpbmcgSUNVIGNhc2VzICh3aGlsZSBrZWVwaW5nIHRoZSBzYW1lIFROb2RlKSwgc28gYSBET00gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVwcmVzZW50aW5nIGEgbmV3IElDVSBjYXNlIHdpbGwgYmUgcmUtY3JlYXRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUodFZpZXcsIGxWaWV3LCBub2RlSW5kZXgsIC8qIG1hcmtBc0RldGFjaGVkICovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSTE4bk11dGF0ZU9wQ29kZS5SZW1vdmVOZXN0ZWRJY3U6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRJY3VOb2RlSW5kZXggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNvZGVzW2sgKyAxXSBhcyBudW1iZXIgPj4+IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUkVGO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkSWN1VE5vZGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldFROb2RlKHRWaWV3LCBuZXN0ZWRJY3VOb2RlSW5kZXgpIGFzIFRJY3VDb250YWluZXJOb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBuZXN0ZWRJY3VUTm9kZS5hY3RpdmVDYXNlSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkSWN1VEluZGV4ID0gcmVtb3ZlT3BDb2RlID4+PiBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkVEljdSA9IGljdXMgIVtuZXN0ZWRJY3VUSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRBbGxUb0FycmF5KG5lc3RlZFRJY3UucmVtb3ZlW2FjdGl2ZUluZGV4XSwgcmVtb3ZlQ29kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGFjdGl2ZSBjYXNlSW5kZXhcbiAgICAgICAgICAgICAgICBjb25zdCBjYXNlSW5kZXggPSBnZXRDYXNlSW5kZXgodEljdSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGljdVROb2RlLmFjdGl2ZUNhc2VJbmRleCA9IGNhc2VJbmRleCAhPT0gLTEgPyBjYXNlSW5kZXggOiBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChjYXNlSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBub2RlcyBmb3IgdGhlIG5ldyBjYXNlXG4gICAgICAgICAgICAgICAgICByZWFkQ3JlYXRlT3BDb2RlcygtMSwgdEljdS5jcmVhdGVbY2FzZUluZGV4XSwgdFZpZXcsIGxWaWV3KTtcbiAgICAgICAgICAgICAgICAgIGNhc2VDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgSTE4blVwZGF0ZU9wQ29kZS5JY3VVcGRhdGU6XG4gICAgICAgICAgICAgICAgdEljdUluZGV4ID0gdXBkYXRlT3BDb2Rlc1srK2pdIGFzIG51bWJlcjtcbiAgICAgICAgICAgICAgICB0SWN1ID0gaWN1cyAhW3RJY3VJbmRleF07XG4gICAgICAgICAgICAgICAgaWN1VE5vZGUgPSBnZXRUTm9kZSh0Vmlldywgbm9kZUluZGV4KSBhcyBUSWN1Q29udGFpbmVyTm9kZTtcbiAgICAgICAgICAgICAgICBpZiAoaWN1VE5vZGUuYWN0aXZlQ2FzZUluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICByZWFkVXBkYXRlT3BDb2RlcyhcbiAgICAgICAgICAgICAgICAgICAgICB0SWN1LnVwZGF0ZVtpY3VUTm9kZS5hY3RpdmVDYXNlSW5kZXhdLCBpY3VzLCBiaW5kaW5nc1N0YXJ0SW5kZXgsIGNoYW5nZU1hc2ssXG4gICAgICAgICAgICAgICAgICAgICAgdFZpZXcsIGxWaWV3LCBjYXNlQ3JlYXRlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpICs9IHNraXBDb2RlcztcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKHRWaWV3OiBUVmlldywgbFZpZXc6IExWaWV3LCBpbmRleDogbnVtYmVyLCBtYXJrQXNEZXRhY2hlZDogYm9vbGVhbikge1xuICBjb25zdCByZW1vdmVkUGhUTm9kZSA9IGdldFROb2RlKHRWaWV3LCBpbmRleCk7XG4gIGNvbnN0IHJlbW92ZWRQaFJOb2RlID0gZ2V0TmF0aXZlQnlJbmRleChpbmRleCwgbFZpZXcpO1xuICBpZiAocmVtb3ZlZFBoUk5vZGUpIHtcbiAgICBuYXRpdmVSZW1vdmVOb2RlKGxWaWV3W1JFTkRFUkVSXSwgcmVtb3ZlZFBoUk5vZGUpO1xuICB9XG5cbiAgY29uc3Qgc2xvdFZhbHVlID0gbG9hZChsVmlldywgaW5kZXgpIGFzIFJFbGVtZW50IHwgUkNvbW1lbnQgfCBMQ29udGFpbmVyO1xuICBpZiAoaXNMQ29udGFpbmVyKHNsb3RWYWx1ZSkpIHtcbiAgICBjb25zdCBsQ29udGFpbmVyID0gc2xvdFZhbHVlIGFzIExDb250YWluZXI7XG4gICAgaWYgKHJlbW92ZWRQaFROb2RlLnR5cGUgIT09IFROb2RlVHlwZS5Db250YWluZXIpIHtcbiAgICAgIG5hdGl2ZVJlbW92ZU5vZGUobFZpZXdbUkVOREVSRVJdLCBsQ29udGFpbmVyW05BVElWRV0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtYXJrQXNEZXRhY2hlZCkge1xuICAgIC8vIERlZmluZSB0aGlzIG5vZGUgYXMgZGV0YWNoZWQgdG8gYXZvaWQgcHJvamVjdGluZyBpdCBsYXRlclxuICAgIHJlbW92ZWRQaFROb2RlLmZsYWdzIHw9IFROb2RlRmxhZ3MuaXNEZXRhY2hlZDtcbiAgfVxuICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyUmVtb3ZlTm9kZSsrO1xufVxuXG4vKipcbiAqXG4gKiBVc2UgdGhpcyBpbnN0cnVjdGlvbiB0byBjcmVhdGUgYSB0cmFuc2xhdGlvbiBibG9jayB0aGF0IGRvZXNuJ3QgY29udGFpbiBhbnkgcGxhY2Vob2xkZXIuXG4gKiBJdCBjYWxscyBib3RoIHtAbGluayBpMThuU3RhcnR9IGFuZCB7QGxpbmsgaTE4bkVuZH0gaW4gb25lIGluc3RydWN0aW9uLlxuICpcbiAqIFRoZSB0cmFuc2xhdGlvbiBgbWVzc2FnZWAgaXMgdGhlIHZhbHVlIHdoaWNoIGlzIGxvY2FsZSBzcGVjaWZpYy4gVGhlIHRyYW5zbGF0aW9uIHN0cmluZyBtYXlcbiAqIGNvbnRhaW4gcGxhY2Vob2xkZXJzIHdoaWNoIGFzc29jaWF0ZSBpbm5lciBlbGVtZW50cyBhbmQgc3ViLXRlbXBsYXRlcyB3aXRoaW4gdGhlIHRyYW5zbGF0aW9uLlxuICpcbiAqIFRoZSB0cmFuc2xhdGlvbiBgbWVzc2FnZWAgcGxhY2Vob2xkZXJzIGFyZTpcbiAqIC0gYO+/vXtpbmRleH0oOntibG9ja30p77+9YDogKkJpbmRpbmcgUGxhY2Vob2xkZXIqOiBNYXJrcyBhIGxvY2F0aW9uIHdoZXJlIGFuIGV4cHJlc3Npb24gd2lsbCBiZVxuICogICBpbnRlcnBvbGF0ZWQgaW50by4gVGhlIHBsYWNlaG9sZGVyIGBpbmRleGAgcG9pbnRzIHRvIHRoZSBleHByZXNzaW9uIGJpbmRpbmcgaW5kZXguIEFuIG9wdGlvbmFsXG4gKiAgIGBibG9ja2AgdGhhdCBtYXRjaGVzIHRoZSBzdWItdGVtcGxhdGUgaW4gd2hpY2ggaXQgd2FzIGRlY2xhcmVkLlxuICogLSBg77+9I3tpbmRleH0oOntibG9ja30p77+9YC9g77+9LyN7aW5kZXh9KDp7YmxvY2t9Ke+/vWA6ICpFbGVtZW50IFBsYWNlaG9sZGVyKjogIE1hcmtzIHRoZSBiZWdpbm5pbmdcbiAqICAgYW5kIGVuZCBvZiBET00gZWxlbWVudCB0aGF0IHdlcmUgZW1iZWRkZWQgaW4gdGhlIG9yaWdpbmFsIHRyYW5zbGF0aW9uIGJsb2NrLiBUaGUgcGxhY2Vob2xkZXJcbiAqICAgYGluZGV4YCBwb2ludHMgdG8gdGhlIGVsZW1lbnQgaW5kZXggaW4gdGhlIHRlbXBsYXRlIGluc3RydWN0aW9ucyBzZXQuIEFuIG9wdGlvbmFsIGBibG9ja2AgdGhhdFxuICogICBtYXRjaGVzIHRoZSBzdWItdGVtcGxhdGUgaW4gd2hpY2ggaXQgd2FzIGRlY2xhcmVkLlxuICogLSBg77+9KntpbmRleH06e2Jsb2Nrfe+/vWAvYO+/vS8qe2luZGV4fTp7YmxvY2t977+9YDogKlN1Yi10ZW1wbGF0ZSBQbGFjZWhvbGRlcio6IFN1Yi10ZW1wbGF0ZXMgbXVzdCBiZVxuICogICBzcGxpdCB1cCBhbmQgdHJhbnNsYXRlZCBzZXBhcmF0ZWx5IGluIGVhY2ggYW5ndWxhciB0ZW1wbGF0ZSBmdW5jdGlvbi4gVGhlIGBpbmRleGAgcG9pbnRzIHRvIHRoZVxuICogICBgdGVtcGxhdGVgIGluc3RydWN0aW9uIGluZGV4LiBBIGBibG9ja2AgdGhhdCBtYXRjaGVzIHRoZSBzdWItdGVtcGxhdGUgaW4gd2hpY2ggaXQgd2FzIGRlY2xhcmVkLlxuICpcbiAqIEBwYXJhbSBpbmRleCBBIHVuaXF1ZSBpbmRleCBvZiB0aGUgdHJhbnNsYXRpb24gaW4gdGhlIHN0YXRpYyBibG9jay5cbiAqIEBwYXJhbSBtZXNzYWdlIFRoZSB0cmFuc2xhdGlvbiBtZXNzYWdlLlxuICogQHBhcmFtIHN1YlRlbXBsYXRlSW5kZXggT3B0aW9uYWwgc3ViLXRlbXBsYXRlIGluZGV4IGluIHRoZSBgbWVzc2FnZWAuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVpMThuKGluZGV4OiBudW1iZXIsIG1lc3NhZ2U6IHN0cmluZywgc3ViVGVtcGxhdGVJbmRleD86IG51bWJlcik6IHZvaWQge1xuICDJtcm1aTE4blN0YXJ0KGluZGV4LCBtZXNzYWdlLCBzdWJUZW1wbGF0ZUluZGV4KTtcbiAgybXJtWkxOG5FbmQoKTtcbn1cblxuLyoqXG4gKiBNYXJrcyBhIGxpc3Qgb2YgYXR0cmlidXRlcyBhcyB0cmFuc2xhdGFibGUuXG4gKlxuICogQHBhcmFtIGluZGV4IEEgdW5pcXVlIGluZGV4IGluIHRoZSBzdGF0aWMgYmxvY2tcbiAqIEBwYXJhbSB2YWx1ZXNcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWkxOG5BdHRyaWJ1dGVzKGluZGV4OiBudW1iZXIsIHZhbHVlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRWaWV3LCBgdFZpZXcgc2hvdWxkIGJlIGRlZmluZWRgKTtcbiAgaTE4bkF0dHJpYnV0ZXNGaXJzdFBhc3MobFZpZXcsIHRWaWV3LCBpbmRleCwgdmFsdWVzKTtcbn1cblxuLyoqXG4gKiBTZWUgYGkxOG5BdHRyaWJ1dGVzYCBhYm92ZS5cbiAqL1xuZnVuY3Rpb24gaTE4bkF0dHJpYnV0ZXNGaXJzdFBhc3MobFZpZXc6IExWaWV3LCB0VmlldzogVFZpZXcsIGluZGV4OiBudW1iZXIsIHZhbHVlczogc3RyaW5nW10pIHtcbiAgY29uc3QgcHJldmlvdXNFbGVtZW50ID0gZ2V0UHJldmlvdXNPclBhcmVudFROb2RlKCk7XG4gIGNvbnN0IHByZXZpb3VzRWxlbWVudEluZGV4ID0gcHJldmlvdXNFbGVtZW50LmluZGV4IC0gSEVBREVSX09GRlNFVDtcbiAgY29uc3QgdXBkYXRlT3BDb2RlczogSTE4blVwZGF0ZU9wQ29kZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjb25zdCBhdHRyTmFtZSA9IHZhbHVlc1tpXTtcbiAgICBjb25zdCBtZXNzYWdlID0gdmFsdWVzW2kgKyAxXTtcbiAgICBjb25zdCBwYXJ0cyA9IG1lc3NhZ2Uuc3BsaXQoSUNVX1JFR0VYUCk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJ0c1tqXTtcblxuICAgICAgaWYgKGogJiAxKSB7XG4gICAgICAgIC8vIE9kZCBpbmRleGVzIGFyZSBJQ1UgZXhwcmVzc2lvbnNcbiAgICAgICAgLy8gVE9ETyhvY29tYmUpOiBzdXBwb3J0IElDVSBleHByZXNzaW9ucyBpbiBhdHRyaWJ1dGVzXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSUNVIGV4cHJlc3Npb25zIGFyZSBub3QgeWV0IHN1cHBvcnRlZCBpbiBhdHRyaWJ1dGVzJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICAvLyBFdmVuIGluZGV4ZXMgYXJlIHRleHQgKGluY2x1ZGluZyBiaW5kaW5ncylcbiAgICAgICAgY29uc3QgaGFzQmluZGluZyA9ICEhdmFsdWUubWF0Y2goQklORElOR19SRUdFWFApO1xuICAgICAgICBpZiAoaGFzQmluZGluZykge1xuICAgICAgICAgIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MgJiYgdFZpZXcuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdID09PSBudWxsKSB7XG4gICAgICAgICAgICBhZGRBbGxUb0FycmF5KFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQmluZGluZ1VwZGF0ZU9wQ29kZXModmFsdWUsIHByZXZpb3VzRWxlbWVudEluZGV4LCBhdHRyTmFtZSksIHVwZGF0ZU9wQ29kZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB0Tm9kZSA9IGdldFROb2RlKHRWaWV3LCBwcmV2aW91c0VsZW1lbnRJbmRleCk7XG4gICAgICAgICAgLy8gU2V0IGF0dHJpYnV0ZXMgZm9yIEVsZW1lbnRzIG9ubHksIGZvciBvdGhlciB0eXBlcyAobGlrZSBFbGVtZW50Q29udGFpbmVyKSxcbiAgICAgICAgICAvLyBvbmx5IHNldCBpbnB1dHMgYmVsb3dcbiAgICAgICAgICBpZiAodE5vZGUudHlwZSA9PT0gVE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnRBdHRyaWJ1dGVJbnRlcm5hbChwcmV2aW91c0VsZW1lbnRJbmRleCwgYXR0ck5hbWUsIHZhbHVlLCB0VmlldywgbFZpZXcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGF0IGF0dHJpYnV0ZSBpcyBhIGRpcmVjdGl2ZSBpbnB1dFxuICAgICAgICAgIGNvbnN0IGRhdGFWYWx1ZSA9IHROb2RlLmlucHV0cyAhPT0gbnVsbCAmJiB0Tm9kZS5pbnB1dHNbYXR0ck5hbWVdO1xuICAgICAgICAgIGlmIChkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgIHNldElucHV0c0ZvclByb3BlcnR5KHRWaWV3LCBsVmlldywgZGF0YVZhbHVlLCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKG5nRGV2TW9kZSkge1xuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZ2V0TmF0aXZlQnlJbmRleChwcmV2aW91c0VsZW1lbnRJbmRleCwgbFZpZXcpIGFzIFJFbGVtZW50IHwgUkNvbW1lbnQ7XG4gICAgICAgICAgICAgIHNldE5nUmVmbGVjdFByb3BlcnRpZXMobFZpZXcsIGVsZW1lbnQsIHROb2RlLnR5cGUsIGRhdGFWYWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MgJiYgdFZpZXcuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdID09PSBudWxsKSB7XG4gICAgdFZpZXcuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdID0gdXBkYXRlT3BDb2RlcztcbiAgfVxufVxuXG5sZXQgY2hhbmdlTWFzayA9IDBiMDtcbmxldCBzaGlmdHNDb3VudGVyID0gMDtcblxuLyoqXG4gKiBTdG9yZXMgdGhlIHZhbHVlcyBvZiB0aGUgYmluZGluZ3MgZHVyaW5nIGVhY2ggdXBkYXRlIGN5Y2xlIGluIG9yZGVyIHRvIGRldGVybWluZSBpZiB3ZSBuZWVkIHRvXG4gKiB1cGRhdGUgdGhlIHRyYW5zbGF0ZWQgbm9kZXMuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBiaW5kaW5nJ3MgdmFsdWVcbiAqIEByZXR1cm5zIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBpdHNlbGYgc28gdGhhdCBpdCBtYXkgYmUgY2hhaW5lZFxuICogKGUuZy4gYGkxOG5FeHAoY3R4Lm5hbWUpKGN0eC50aXRsZSlgKVxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1aTE4bkV4cDxUPih2YWx1ZTogVCk6IHR5cGVvZiDJtcm1aTE4bkV4cCB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgaWYgKGJpbmRpbmdVcGRhdGVkKGxWaWV3LCBuZXh0QmluZGluZ0luZGV4KCksIHZhbHVlKSkge1xuICAgIGNoYW5nZU1hc2sgPSBjaGFuZ2VNYXNrIHwgKDEgPDwgc2hpZnRzQ291bnRlcik7XG4gIH1cbiAgc2hpZnRzQ291bnRlcisrO1xuICByZXR1cm4gybXJtWkxOG5FeHA7XG59XG5cbi8qKlxuICogVXBkYXRlcyBhIHRyYW5zbGF0aW9uIGJsb2NrIG9yIGFuIGkxOG4gYXR0cmlidXRlIHdoZW4gdGhlIGJpbmRpbmdzIGhhdmUgY2hhbmdlZC5cbiAqXG4gKiBAcGFyYW0gaW5kZXggSW5kZXggb2YgZWl0aGVyIHtAbGluayBpMThuU3RhcnR9ICh0cmFuc2xhdGlvbiBibG9jaykgb3Ige0BsaW5rIGkxOG5BdHRyaWJ1dGVzfVxuICogKGkxOG4gYXR0cmlidXRlKSBvbiB3aGljaCBpdCBzaG91bGQgdXBkYXRlIHRoZSBjb250ZW50LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1aTE4bkFwcGx5KGluZGV4OiBudW1iZXIpIHtcbiAgaWYgKHNoaWZ0c0NvdW50ZXIpIHtcbiAgICBjb25zdCB0VmlldyA9IGdldFRWaWV3KCk7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQodFZpZXcsIGB0VmlldyBzaG91bGQgYmUgZGVmaW5lZGApO1xuICAgIGNvbnN0IHRJMThuID0gdFZpZXcuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdO1xuICAgIGxldCB1cGRhdGVPcENvZGVzOiBJMThuVXBkYXRlT3BDb2RlcztcbiAgICBsZXQgaWN1czogVEljdVtdfG51bGwgPSBudWxsO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRJMThuKSkge1xuICAgICAgdXBkYXRlT3BDb2RlcyA9IHRJMThuIGFzIEkxOG5VcGRhdGVPcENvZGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVPcENvZGVzID0gKHRJMThuIGFzIFRJMThuKS51cGRhdGU7XG4gICAgICBpY3VzID0gKHRJMThuIGFzIFRJMThuKS5pY3VzO1xuICAgIH1cbiAgICBjb25zdCBiaW5kaW5nc1N0YXJ0SW5kZXggPSBnZXRCaW5kaW5nSW5kZXgoKSAtIHNoaWZ0c0NvdW50ZXIgLSAxO1xuICAgIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgICByZWFkVXBkYXRlT3BDb2Rlcyh1cGRhdGVPcENvZGVzLCBpY3VzLCBiaW5kaW5nc1N0YXJ0SW5kZXgsIGNoYW5nZU1hc2ssIHRWaWV3LCBsVmlldyk7XG5cbiAgICAvLyBSZXNldCBjaGFuZ2VNYXNrICYgbWFza0JpdCB0byBkZWZhdWx0IGZvciB0aGUgbmV4dCB1cGRhdGUgY3ljbGVcbiAgICBjaGFuZ2VNYXNrID0gMGIwO1xuICAgIHNoaWZ0c0NvdW50ZXIgPSAwO1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgY2FzZSBvZiBhbiBJQ1UgZXhwcmVzc2lvbiBkZXBlbmRpbmcgb24gdGhlIG1haW4gYmluZGluZyB2YWx1ZVxuICpcbiAqIEBwYXJhbSBpY3VFeHByZXNzaW9uXG4gKiBAcGFyYW0gYmluZGluZ1ZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgbWFpbiBiaW5kaW5nIHVzZWQgYnkgdGhpcyBJQ1UgZXhwcmVzc2lvblxuICovXG5mdW5jdGlvbiBnZXRDYXNlSW5kZXgoaWN1RXhwcmVzc2lvbjogVEljdSwgYmluZGluZ1ZhbHVlOiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgaW5kZXggPSBpY3VFeHByZXNzaW9uLmNhc2VzLmluZGV4T2YoYmluZGluZ1ZhbHVlKTtcbiAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgIHN3aXRjaCAoaWN1RXhwcmVzc2lvbi50eXBlKSB7XG4gICAgICBjYXNlIEljdVR5cGUucGx1cmFsOiB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ2FzZSA9IGdldFBsdXJhbENhc2UoYmluZGluZ1ZhbHVlLCBnZXRMb2NhbGVJZCgpKTtcbiAgICAgICAgaW5kZXggPSBpY3VFeHByZXNzaW9uLmNhc2VzLmluZGV4T2YocmVzb2x2ZWRDYXNlKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSAmJiByZXNvbHZlZENhc2UgIT09ICdvdGhlcicpIHtcbiAgICAgICAgICBpbmRleCA9IGljdUV4cHJlc3Npb24uY2FzZXMuaW5kZXhPZignb3RoZXInKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgSWN1VHlwZS5zZWxlY3Q6IHtcbiAgICAgICAgaW5kZXggPSBpY3VFeHByZXNzaW9uLmNhc2VzLmluZGV4T2YoJ290aGVyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIE9wQ29kZXMgZm9yIElDVSBleHByZXNzaW9ucy5cbiAqXG4gKiBAcGFyYW0gdEljdXNcbiAqIEBwYXJhbSBpY3VFeHByZXNzaW9uXG4gKiBAcGFyYW0gc3RhcnRJbmRleFxuICogQHBhcmFtIGV4cGFuZG9TdGFydEluZGV4XG4gKi9cbmZ1bmN0aW9uIGljdVN0YXJ0KFxuICAgIHRJY3VzOiBUSWN1W10sIGljdUV4cHJlc3Npb246IEljdUV4cHJlc3Npb24sIHN0YXJ0SW5kZXg6IG51bWJlcixcbiAgICBleHBhbmRvU3RhcnRJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IGNyZWF0ZUNvZGVzID0gW107XG4gIGNvbnN0IHJlbW92ZUNvZGVzID0gW107XG4gIGNvbnN0IHVwZGF0ZUNvZGVzID0gW107XG4gIGNvbnN0IHZhcnMgPSBbXTtcbiAgY29uc3QgY2hpbGRJY3VzOiBudW1iZXJbXVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaWN1RXhwcmVzc2lvbi52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBFYWNoIHZhbHVlIGlzIGFuIGFycmF5IG9mIHN0cmluZ3MgJiBvdGhlciBJQ1UgZXhwcmVzc2lvbnNcbiAgICBjb25zdCB2YWx1ZUFyciA9IGljdUV4cHJlc3Npb24udmFsdWVzW2ldO1xuICAgIGNvbnN0IG5lc3RlZEljdXM6IEljdUV4cHJlc3Npb25bXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsdWVBcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVBcnJbal07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBJdCBpcyBhbiBuZXN0ZWQgSUNVIGV4cHJlc3Npb25cbiAgICAgICAgY29uc3QgaWN1SW5kZXggPSBuZXN0ZWRJY3VzLnB1c2godmFsdWUgYXMgSWN1RXhwcmVzc2lvbikgLSAxO1xuICAgICAgICAvLyBSZXBsYWNlIG5lc3RlZCBJQ1UgZXhwcmVzc2lvbiBieSBhIGNvbW1lbnQgbm9kZVxuICAgICAgICB2YWx1ZUFycltqXSA9IGA8IS0t77+9JHtpY3VJbmRleH3vv70tLT5gO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBpY3VDYXNlOiBJY3VDYXNlID1cbiAgICAgICAgcGFyc2VJY3VDYXNlKHZhbHVlQXJyLmpvaW4oJycpLCBzdGFydEluZGV4LCBuZXN0ZWRJY3VzLCB0SWN1cywgZXhwYW5kb1N0YXJ0SW5kZXgpO1xuICAgIGNyZWF0ZUNvZGVzLnB1c2goaWN1Q2FzZS5jcmVhdGUpO1xuICAgIHJlbW92ZUNvZGVzLnB1c2goaWN1Q2FzZS5yZW1vdmUpO1xuICAgIHVwZGF0ZUNvZGVzLnB1c2goaWN1Q2FzZS51cGRhdGUpO1xuICAgIHZhcnMucHVzaChpY3VDYXNlLnZhcnMpO1xuICAgIGNoaWxkSWN1cy5wdXNoKGljdUNhc2UuY2hpbGRJY3VzKTtcbiAgfVxuICBjb25zdCB0SWN1OiBUSWN1ID0ge1xuICAgIHR5cGU6IGljdUV4cHJlc3Npb24udHlwZSxcbiAgICB2YXJzLFxuICAgIGNoaWxkSWN1cyxcbiAgICBjYXNlczogaWN1RXhwcmVzc2lvbi5jYXNlcyxcbiAgICBjcmVhdGU6IGNyZWF0ZUNvZGVzLFxuICAgIHJlbW92ZTogcmVtb3ZlQ29kZXMsXG4gICAgdXBkYXRlOiB1cGRhdGVDb2Rlc1xuICB9O1xuICB0SWN1cy5wdXNoKHRJY3UpO1xuICAvLyBBZGRpbmcgdGhlIG1heGltdW0gcG9zc2libGUgb2YgdmFycyBuZWVkZWQgKGJhc2VkIG9uIHRoZSBjYXNlcyB3aXRoIHRoZSBtb3N0IHZhcnMpXG4gIGkxOG5WYXJzQ291bnQgKz0gTWF0aC5tYXgoLi4udmFycyk7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIHN0cmluZyB0ZW1wbGF0ZSBpbnRvIGFuIEhUTUwgdGVtcGxhdGUgYW5kIGEgbGlzdCBvZiBpbnN0cnVjdGlvbnMgdXNlZCB0byB1cGRhdGVcbiAqIGF0dHJpYnV0ZXMgb3Igbm9kZXMgdGhhdCBjb250YWluIGJpbmRpbmdzLlxuICpcbiAqIEBwYXJhbSB1bnNhZmVIdG1sIFRoZSBzdHJpbmcgdG8gcGFyc2VcbiAqIEBwYXJhbSBwYXJlbnRJbmRleFxuICogQHBhcmFtIG5lc3RlZEljdXNcbiAqIEBwYXJhbSB0SWN1c1xuICogQHBhcmFtIGV4cGFuZG9TdGFydEluZGV4XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSWN1Q2FzZShcbiAgICB1bnNhZmVIdG1sOiBzdHJpbmcsIHBhcmVudEluZGV4OiBudW1iZXIsIG5lc3RlZEljdXM6IEljdUV4cHJlc3Npb25bXSwgdEljdXM6IFRJY3VbXSxcbiAgICBleHBhbmRvU3RhcnRJbmRleDogbnVtYmVyKTogSWN1Q2FzZSB7XG4gIGNvbnN0IGluZXJ0Qm9keUhlbHBlciA9IG5ldyBJbmVydEJvZHlIZWxwZXIoZ2V0RG9jdW1lbnQoKSk7XG4gIGNvbnN0IGluZXJ0Qm9keUVsZW1lbnQgPSBpbmVydEJvZHlIZWxwZXIuZ2V0SW5lcnRCb2R5RWxlbWVudCh1bnNhZmVIdG1sKTtcbiAgaWYgKCFpbmVydEJvZHlFbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2VuZXJhdGUgaW5lcnQgYm9keSBlbGVtZW50Jyk7XG4gIH1cbiAgY29uc3Qgd3JhcHBlciA9IGdldFRlbXBsYXRlQ29udGVudChpbmVydEJvZHlFbGVtZW50ICEpIGFzIEVsZW1lbnQgfHwgaW5lcnRCb2R5RWxlbWVudDtcbiAgY29uc3Qgb3BDb2RlczogSWN1Q2FzZSA9IHt2YXJzOiAwLCBjaGlsZEljdXM6IFtdLCBjcmVhdGU6IFtdLCByZW1vdmU6IFtdLCB1cGRhdGU6IFtdfTtcbiAgcGFyc2VOb2Rlcyh3cmFwcGVyLmZpcnN0Q2hpbGQsIG9wQ29kZXMsIHBhcmVudEluZGV4LCBuZXN0ZWRJY3VzLCB0SWN1cywgZXhwYW5kb1N0YXJ0SW5kZXgpO1xuICByZXR1cm4gb3BDb2Rlcztcbn1cblxuY29uc3QgTkVTVEVEX0lDVSA9IC/vv70oXFxkKynvv70vO1xuXG4vKipcbiAqIFBhcnNlcyBhIG5vZGUsIGl0cyBjaGlsZHJlbiBhbmQgaXRzIHNpYmxpbmdzLCBhbmQgZ2VuZXJhdGVzIHRoZSBtdXRhdGUgJiB1cGRhdGUgT3BDb2Rlcy5cbiAqXG4gKiBAcGFyYW0gY3VycmVudE5vZGUgVGhlIGZpcnN0IG5vZGUgdG8gcGFyc2VcbiAqIEBwYXJhbSBpY3VDYXNlIFRoZSBkYXRhIGZvciB0aGUgSUNVIGV4cHJlc3Npb24gY2FzZSB0aGF0IGNvbnRhaW5zIHRob3NlIG5vZGVzXG4gKiBAcGFyYW0gcGFyZW50SW5kZXggSW5kZXggb2YgdGhlIGN1cnJlbnQgbm9kZSdzIHBhcmVudFxuICogQHBhcmFtIG5lc3RlZEljdXMgRGF0YSBmb3IgdGhlIG5lc3RlZCBJQ1UgZXhwcmVzc2lvbnMgdGhhdCB0aGlzIGNhc2UgY29udGFpbnNcbiAqIEBwYXJhbSB0SWN1cyBEYXRhIGZvciBhbGwgSUNVIGV4cHJlc3Npb25zIG9mIHRoZSBjdXJyZW50IG1lc3NhZ2VcbiAqIEBwYXJhbSBleHBhbmRvU3RhcnRJbmRleCBFeHBhbmRvIHN0YXJ0IGluZGV4IGZvciB0aGUgY3VycmVudCBJQ1UgZXhwcmVzc2lvblxuICovXG5mdW5jdGlvbiBwYXJzZU5vZGVzKFxuICAgIGN1cnJlbnROb2RlOiBOb2RlIHwgbnVsbCwgaWN1Q2FzZTogSWN1Q2FzZSwgcGFyZW50SW5kZXg6IG51bWJlciwgbmVzdGVkSWN1czogSWN1RXhwcmVzc2lvbltdLFxuICAgIHRJY3VzOiBUSWN1W10sIGV4cGFuZG9TdGFydEluZGV4OiBudW1iZXIpIHtcbiAgaWYgKGN1cnJlbnROb2RlKSB7XG4gICAgY29uc3QgbmVzdGVkSWN1c1RvQ3JlYXRlOiBbSWN1RXhwcmVzc2lvbiwgbnVtYmVyXVtdID0gW107XG4gICAgd2hpbGUgKGN1cnJlbnROb2RlKSB7XG4gICAgICBjb25zdCBuZXh0Tm9kZTogTm9kZXxudWxsID0gY3VycmVudE5vZGUubmV4dFNpYmxpbmc7XG4gICAgICBjb25zdCBuZXdJbmRleCA9IGV4cGFuZG9TdGFydEluZGV4ICsgKytpY3VDYXNlLnZhcnM7XG4gICAgICBzd2l0Y2ggKGN1cnJlbnROb2RlLm5vZGVUeXBlKSB7XG4gICAgICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XG4gICAgICAgICAgY29uc3QgZWxlbWVudCA9IGN1cnJlbnROb2RlIGFzIEVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIGlmICghVkFMSURfRUxFTUVOVFMuaGFzT3duUHJvcGVydHkodGFnTmFtZSkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXNuJ3QgYSB2YWxpZCBlbGVtZW50LCB3ZSB3b24ndCBjcmVhdGUgYW4gZWxlbWVudCBmb3IgaXRcbiAgICAgICAgICAgIGljdUNhc2UudmFycy0tO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpY3VDYXNlLmNyZWF0ZS5wdXNoKFxuICAgICAgICAgICAgICAgIEVMRU1FTlRfTUFSS0VSLCB0YWdOYW1lLCBuZXdJbmRleCxcbiAgICAgICAgICAgICAgICBwYXJlbnRJbmRleCA8PCBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1BBUkVOVCB8IEkxOG5NdXRhdGVPcENvZGUuQXBwZW5kQ2hpbGQpO1xuICAgICAgICAgICAgY29uc3QgZWxBdHRycyA9IGVsZW1lbnQuYXR0cmlidXRlcztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBhdHRyID0gZWxBdHRycy5pdGVtKGkpICE7XG4gICAgICAgICAgICAgIGNvbnN0IGxvd2VyQXR0ck5hbWUgPSBhdHRyLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgY29uc3QgaGFzQmluZGluZyA9ICEhYXR0ci52YWx1ZS5tYXRjaChCSU5ESU5HX1JFR0VYUCk7XG4gICAgICAgICAgICAgIC8vIHdlIGFzc3VtZSB0aGUgaW5wdXQgc3RyaW5nIGlzIHNhZmUsIHVubGVzcyBpdCdzIHVzaW5nIGEgYmluZGluZ1xuICAgICAgICAgICAgICBpZiAoaGFzQmluZGluZykge1xuICAgICAgICAgICAgICAgIGlmIChWQUxJRF9BVFRSUy5oYXNPd25Qcm9wZXJ0eShsb3dlckF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKFVSSV9BVFRSU1tsb3dlckF0dHJOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBhZGRBbGxUb0FycmF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVCaW5kaW5nVXBkYXRlT3BDb2RlcyhhdHRyLnZhbHVlLCBuZXdJbmRleCwgYXR0ci5uYW1lLCBfc2FuaXRpemVVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWN1Q2FzZS51cGRhdGUpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChTUkNTRVRfQVRUUlNbbG93ZXJBdHRyTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkQWxsVG9BcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmluZGluZ1VwZGF0ZU9wQ29kZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ci52YWx1ZSwgbmV3SW5kZXgsIGF0dHIubmFtZSwgc2FuaXRpemVTcmNzZXQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWN1Q2FzZS51cGRhdGUpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkQWxsVG9BcnJheShcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQmluZGluZ1VwZGF0ZU9wQ29kZXMoYXR0ci52YWx1ZSwgbmV3SW5kZXgsIGF0dHIubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY3VDYXNlLnVwZGF0ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYFdBUk5JTkc6IGlnbm9yaW5nIHVuc2FmZSBhdHRyaWJ1dGUgdmFsdWUgJHtsb3dlckF0dHJOYW1lfSBvbiBlbGVtZW50ICR7dGFnTmFtZX0gKHNlZSBodHRwOi8vZy5jby9uZy9zZWN1cml0eSN4c3MpYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGljdUNhc2UuY3JlYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIG5ld0luZGV4IDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUkVGIHwgSTE4bk11dGF0ZU9wQ29kZS5BdHRyLCBhdHRyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGF0dHIudmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYXJzZSB0aGUgY2hpbGRyZW4gb2YgdGhpcyBub2RlIChpZiBhbnkpXG4gICAgICAgICAgICBwYXJzZU5vZGVzKFxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmZpcnN0Q2hpbGQsIGljdUNhc2UsIG5ld0luZGV4LCBuZXN0ZWRJY3VzLCB0SWN1cywgZXhwYW5kb1N0YXJ0SW5kZXgpO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBwYXJlbnQgbm9kZSBhZnRlciB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgIGljdUNhc2UucmVtb3ZlLnB1c2gobmV3SW5kZXggPDwgSTE4bk11dGF0ZU9wQ29kZS5TSElGVF9SRUYgfCBJMThuTXV0YXRlT3BDb2RlLlJlbW92ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5vZGUuVEVYVF9OT0RFOlxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQgfHwgJyc7XG4gICAgICAgICAgY29uc3QgaGFzQmluZGluZyA9IHZhbHVlLm1hdGNoKEJJTkRJTkdfUkVHRVhQKTtcbiAgICAgICAgICBpY3VDYXNlLmNyZWF0ZS5wdXNoKFxuICAgICAgICAgICAgICBoYXNCaW5kaW5nID8gJycgOiB2YWx1ZSwgbmV3SW5kZXgsXG4gICAgICAgICAgICAgIHBhcmVudEluZGV4IDw8IEkxOG5NdXRhdGVPcENvZGUuU0hJRlRfUEFSRU5UIHwgSTE4bk11dGF0ZU9wQ29kZS5BcHBlbmRDaGlsZCk7XG4gICAgICAgICAgaWN1Q2FzZS5yZW1vdmUucHVzaChuZXdJbmRleCA8PCBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRiB8IEkxOG5NdXRhdGVPcENvZGUuUmVtb3ZlKTtcbiAgICAgICAgICBpZiAoaGFzQmluZGluZykge1xuICAgICAgICAgICAgYWRkQWxsVG9BcnJheShnZW5lcmF0ZUJpbmRpbmdVcGRhdGVPcENvZGVzKHZhbHVlLCBuZXdJbmRleCksIGljdUNhc2UudXBkYXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTm9kZS5DT01NRU5UX05PREU6XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNvbW1lbnQgbm9kZSBpcyBhIHBsYWNlaG9sZGVyIGZvciBhIG5lc3RlZCBJQ1VcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IE5FU1RFRF9JQ1UuZXhlYyhjdXJyZW50Tm9kZS50ZXh0Q29udGVudCB8fCAnJyk7XG4gICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBjb25zdCBuZXN0ZWRJY3VJbmRleCA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgICAgICBjb25zdCBuZXdMb2NhbCA9IG5nRGV2TW9kZSA/IGBuZXN0ZWQgSUNVICR7bmVzdGVkSWN1SW5kZXh9YCA6ICcnO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb21tZW50IG5vZGUgdGhhdCB3aWxsIGFuY2hvciB0aGUgSUNVIGV4cHJlc3Npb25cbiAgICAgICAgICAgIGljdUNhc2UuY3JlYXRlLnB1c2goXG4gICAgICAgICAgICAgICAgQ09NTUVOVF9NQVJLRVIsIG5ld0xvY2FsLCBuZXdJbmRleCxcbiAgICAgICAgICAgICAgICBwYXJlbnRJbmRleCA8PCBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1BBUkVOVCB8IEkxOG5NdXRhdGVPcENvZGUuQXBwZW5kQ2hpbGQpO1xuICAgICAgICAgICAgY29uc3QgbmVzdGVkSWN1ID0gbmVzdGVkSWN1c1tuZXN0ZWRJY3VJbmRleF07XG4gICAgICAgICAgICBuZXN0ZWRJY3VzVG9DcmVhdGUucHVzaChbbmVzdGVkSWN1LCBuZXdJbmRleF0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBXZSBkbyBub3QgaGFuZGxlIGFueSBvdGhlciB0eXBlIG9mIGNvbW1lbnRcbiAgICAgICAgICAgIGljdUNhc2UudmFycy0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBXZSBkbyBub3QgaGFuZGxlIGFueSBvdGhlciB0eXBlIG9mIGVsZW1lbnRcbiAgICAgICAgICBpY3VDYXNlLnZhcnMtLTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnROb2RlID0gbmV4dE5vZGUgITtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lc3RlZEljdXNUb0NyZWF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbmVzdGVkSWN1ID0gbmVzdGVkSWN1c1RvQ3JlYXRlW2ldWzBdO1xuICAgICAgY29uc3QgbmVzdGVkSWN1Tm9kZUluZGV4ID0gbmVzdGVkSWN1c1RvQ3JlYXRlW2ldWzFdO1xuICAgICAgaWN1U3RhcnQodEljdXMsIG5lc3RlZEljdSwgbmVzdGVkSWN1Tm9kZUluZGV4LCBleHBhbmRvU3RhcnRJbmRleCArIGljdUNhc2UudmFycyk7XG4gICAgICAvLyBTaW5jZSB0aGlzIGlzIHJlY3Vyc2l2ZSwgdGhlIGxhc3QgVEljdSB0aGF0IHdhcyBwdXNoZWQgaXMgdGhlIG9uZSB3ZSB3YW50XG4gICAgICBjb25zdCBuZXN0VEljdUluZGV4ID0gdEljdXMubGVuZ3RoIC0gMTtcbiAgICAgIGljdUNhc2UudmFycyArPSBNYXRoLm1heCguLi50SWN1c1tuZXN0VEljdUluZGV4XS52YXJzKTtcbiAgICAgIGljdUNhc2UuY2hpbGRJY3VzLnB1c2gobmVzdFRJY3VJbmRleCk7XG4gICAgICBjb25zdCBtYXNrID0gZ2V0QmluZGluZ01hc2sobmVzdGVkSWN1KTtcbiAgICAgIGljdUNhc2UudXBkYXRlLnB1c2goXG4gICAgICAgICAgdG9NYXNrQml0KG5lc3RlZEljdS5tYWluQmluZGluZyksICAvLyBtYXNrIG9mIHRoZSBtYWluIGJpbmRpbmdcbiAgICAgICAgICAzLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNraXAgMyBvcENvZGVzIGlmIG5vdCBjaGFuZ2VkXG4gICAgICAgICAgLTEgLSBuZXN0ZWRJY3UubWFpbkJpbmRpbmcsXG4gICAgICAgICAgbmVzdGVkSWN1Tm9kZUluZGV4IDw8IEkxOG5VcGRhdGVPcENvZGUuU0hJRlRfUkVGIHwgSTE4blVwZGF0ZU9wQ29kZS5JY3VTd2l0Y2gsXG4gICAgICAgICAgbmVzdFRJY3VJbmRleCxcbiAgICAgICAgICBtYXNrLCAgLy8gbWFzayBvZiBhbGwgdGhlIGJpbmRpbmdzIG9mIHRoaXMgSUNVIGV4cHJlc3Npb25cbiAgICAgICAgICAyLCAgICAgLy8gc2tpcCAyIG9wQ29kZXMgaWYgbm90IGNoYW5nZWRcbiAgICAgICAgICBuZXN0ZWRJY3VOb2RlSW5kZXggPDwgSTE4blVwZGF0ZU9wQ29kZS5TSElGVF9SRUYgfCBJMThuVXBkYXRlT3BDb2RlLkljdVVwZGF0ZSxcbiAgICAgICAgICBuZXN0VEljdUluZGV4KTtcbiAgICAgIGljdUNhc2UucmVtb3ZlLnB1c2goXG4gICAgICAgICAgbmVzdFRJY3VJbmRleCA8PCBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRiB8IEkxOG5NdXRhdGVPcENvZGUuUmVtb3ZlTmVzdGVkSWN1LFxuICAgICAgICAgIG5lc3RlZEljdU5vZGVJbmRleCA8PCBJMThuTXV0YXRlT3BDb2RlLlNISUZUX1JFRiB8IEkxOG5NdXRhdGVPcENvZGUuUmVtb3ZlKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBbmd1bGFyIERhcnQgaW50cm9kdWNlZCAmbmdzcDsgYXMgYSBwbGFjZWhvbGRlciBmb3Igbm9uLXJlbW92YWJsZSBzcGFjZSwgc2VlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2RhcnQtbGFuZy9hbmd1bGFyL2Jsb2IvMGJiNjExMzg3ZDI5ZDY1YjVhZjdmOWQyNTE1YWI1NzFmZDNmYmVlNC9fdGVzdHMvdGVzdC9jb21waWxlci9wcmVzZXJ2ZV93aGl0ZXNwYWNlX3Rlc3QuZGFydCNMMjUtTDMyXG4gKiBJbiBBbmd1bGFyIERhcnQgJm5nc3A7IGlzIGNvbnZlcnRlZCB0byB0aGUgMHhFNTAwIFBVQSAoUHJpdmF0ZSBVc2UgQXJlYXMpIHVuaWNvZGUgY2hhcmFjdGVyXG4gKiBhbmQgbGF0ZXIgb24gcmVwbGFjZWQgYnkgYSBzcGFjZS4gV2UgYXJlIHJlLWltcGxlbWVudGluZyB0aGUgc2FtZSBpZGVhIGhlcmUsIHNpbmNlIHRyYW5zbGF0aW9uc1xuICogbWlnaHQgY29udGFpbiB0aGlzIHNwZWNpYWwgY2hhcmFjdGVyLlxuICovXG5jb25zdCBOR1NQX1VOSUNPREVfUkVHRVhQID0gL1xcdUU1MDAvZztcbmZ1bmN0aW9uIHJlcGxhY2VOZ3NwKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZShOR1NQX1VOSUNPREVfUkVHRVhQLCAnICcpO1xufVxuXG4vKipcbiAqIFRoZSBsb2NhbGUgaWQgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgY3VycmVudGx5IHVzaW5nIChmb3IgdHJhbnNsYXRpb25zIGFuZCBJQ1UgZXhwcmVzc2lvbnMpLlxuICogVGhpcyBpcyB0aGUgaXZ5IHZlcnNpb24gb2YgYExPQ0FMRV9JRGAgdGhhdCB3YXMgZGVmaW5lZCBhcyBhbiBpbmplY3Rpb24gdG9rZW4gZm9yIHRoZSB2aWV3IGVuZ2luZVxuICogYnV0IGlzIG5vdyBkZWZpbmVkIGFzIGEgZ2xvYmFsIHZhbHVlLlxuICovXG5sZXQgTE9DQUxFX0lEID0gREVGQVVMVF9MT0NBTEVfSUQ7XG5cbi8qKlxuICogU2V0cyB0aGUgbG9jYWxlIGlkIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0cmFuc2xhdGlvbnMgYW5kIElDVSBleHByZXNzaW9ucy5cbiAqIFRoaXMgaXMgdGhlIGl2eSB2ZXJzaW9uIG9mIGBMT0NBTEVfSURgIHRoYXQgd2FzIGRlZmluZWQgYXMgYW4gaW5qZWN0aW9uIHRva2VuIGZvciB0aGUgdmlldyBlbmdpbmVcbiAqIGJ1dCBpcyBub3cgZGVmaW5lZCBhcyBhIGdsb2JhbCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gbG9jYWxlSWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsZUlkKGxvY2FsZUlkOiBzdHJpbmcpIHtcbiAgYXNzZXJ0RGVmaW5lZChsb2NhbGVJZCwgYEV4cGVjdGVkIGxvY2FsZUlkIHRvIGJlIGRlZmluZWRgKTtcbiAgaWYgKHR5cGVvZiBsb2NhbGVJZCA9PT0gJ3N0cmluZycpIHtcbiAgICBMT0NBTEVfSUQgPSBsb2NhbGVJZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL18vZywgJy0nKTtcbiAgfVxufVxuXG4vKipcbiAqIEdldHMgdGhlIGxvY2FsZSBpZCB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdHJhbnNsYXRpb25zIGFuZCBJQ1UgZXhwcmVzc2lvbnMuXG4gKiBUaGlzIGlzIHRoZSBpdnkgdmVyc2lvbiBvZiBgTE9DQUxFX0lEYCB0aGF0IHdhcyBkZWZpbmVkIGFzIGFuIGluamVjdGlvbiB0b2tlbiBmb3IgdGhlIHZpZXcgZW5naW5lXG4gKiBidXQgaXMgbm93IGRlZmluZWQgYXMgYSBnbG9iYWwgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhbGVJZCgpOiBzdHJpbmcge1xuICByZXR1cm4gTE9DQUxFX0lEO1xufVxuIl19