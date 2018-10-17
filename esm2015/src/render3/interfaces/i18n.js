/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @enum {number} */
var I18nMutateOpCode = {
    SHIFT_REF: 2,
    SHIFT_PARENT: 17,
    MASK_OPCODE: 3,
    MASK_REF: 68,
    Select: 0,
    AppendChild: 1,
    InsertBefore: 2,
    Remove: 3,
};
export { I18nMutateOpCode };
/** *
 * Marks that the next string is for element.
 *
 * See `I18nMutateOpCodes` documentation.
  @type {?} */
export const ELEMENT_MARKER = {
    marker: 'element'
};
/** *
 * Marks that the next string is for comment.
 *
 * See `I18nMutateOpCodes` documentation.
  @type {?} */
export const COMMENT_MARKER = {
    marker: 'comment'
};
/**
 * Array storing OpCode for dynamically creating `i18n` blocks.
 *
 * Example:
 * ```
 * <I18nCreateOpCode>[
 *   // For adding text nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lViewData[index++] = document.createTextNode('abc');
 *   //   lViewData[1].insertBefore(node, lViewData[2]);
 *   'abc', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lViewData[index++] = document.createTextNode('xyz');
 *   //   lViewData[1].appendChild(node);
 *   'xyz', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For adding element nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lViewData[index++] = document.createElement('div');
 *   //   lViewData[1].insertBefore(node, lViewData[2]);
 *   ELEMENT_MARKER, 'div', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lViewData[index++] = document.createElement('div');
 *   //   lViewData[1].appendChild(node);
 *   ELEMENT_MARKER, 'div', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For adding comment nodes
 *   // ---------------------
 *   // Equivalent to:
 *   //   const node = lViewData[index++] = document.createComment('');
 *   //   lViewData[1].insertBefore(node, lViewData[2]);
 *   COMMENT_MARKER, '', 1 << SHIFT_PARENT | 2 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lViewData[index++] = document.createComment('');
 *   //   lViewData[1].appendChild(node);
 *   COMMENT_MARKER, '', 1 << SHIFT_PARENT | AppendChild,
 *
 *   // For moving existing nodes to a different location
 *   // --------------------------------------------------
 *   // Equivalent to:
 *   //   const node = lViewData[1];
 *   //   lViewData[2].insertBefore(node, lViewData[3]);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | 3 << SHIFT_REF | InsertBefore,
 *
 *   // Equivalent to:
 *   //   const node = lViewData[1];
 *   //   lViewData[2].appendChild(node);
 *   1 << SHIFT_REF | Select, 2 << SHIFT_PARENT | AppendChild,
 *
 *   // For removing existing nodes
 *   // --------------------------------------------------
 *   //   const node = lViewData[1];
 *   //   lViewData[2].remove(node);
 *   2 << SHIFT_PARENT | 1 << SHIFT_REF | Remove,
 *
 *   // For writing attributes
 *   // --------------------------------------------------
 *   //   const node = lViewData[1];
 *   //   node.setAttribute('attr', 'value');
 *   1 << SHIFT_REF | Select, 'attr', 'value'
 *            // NOTE: Select followed by two string (vs select followed by OpCode)
 * ];
 * ```
 * NOTE:
 *   - `index` is initial location where the extra nodes should be stored in the EXPANDO section of
 * `LVIewData`.
 *
 * See: `applyI18nCreateOpCodes`;
 * @record
 */
export function I18nMutateOpCodes() { }
/** @enum {number} */
var I18nUpdateOpCode = {
    SHIFT_REF: 2,
    SHIFT_ICU: 17,
    MASK_OPCODE: 3,
    MASK_REF: 68,
    Text: 0,
    Attr: 1,
    IcuSwitch: 2,
    IcuUpdate: 3,
};
export { I18nUpdateOpCode };
/**
 * Stores DOM operations which need to be applied to update DOM render tree due to changes in
 * expressions.
 *
 * The basic idea is that `i18nExp` OpCodes capture expression changes and update a change
 * mask bit. (Bit 1 for expression 1, bit 2 for expression 2 etc..., bit 32 for expression 32 and
 * higher.) The OpCodes then compare its own change mask against the expression change mask to
 * determine if the OpCodes should execute.
 *
 * These OpCodes can be used by both the i18n block as well as ICU sub-block.
 *
 * ## Example
 *
 * Assume
 * ```
 *   if (rf & RenderFlags.Update) {
 *    i18nExp(bind(ctx.exp1)); // If changed set mask bit 1
 *    i18nExp(bind(ctx.exp2)); // If changed set mask bit 2
 *    i18nExp(bind(ctx.exp3)); // If changed set mask bit 3
 *    i18nExp(bind(ctx.exp4)); // If changed set mask bit 4
 *    i18nApply(0);            // Apply all changes by executing the OpCodes.
 *  }
 * ```
 * We can assume that each call to `i18nExp` sets an internal `changeMask` bit depending on the
 * index of `i18nExp` index.
 *
 * OpCodes
 * ```
 * <I18nUpdateOpCodes>[
 *   // The following OpCodes represent: `<div i18n-title="pre{{exp1}}in{{exp2}}post">`
 *   // If `changeMask & 0b11`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `7` values and start processing next OpCodes.
 *   0b11, 7,
 *   // Concatenate `newValue = 'pre'+lViewData[bindIndex-4]+'in'+lViewData[bindIndex-3]+'post';`.
 *   'pre', -4, 'in', -3, 'post',
 *   // Update attribute: `elementAttribute(1, 'title', sanitizerFn(newValue));`
 *   1 << SHIFT_REF | Attr, 'title', sanitizerFn,
 *
 *   // The following OpCodes represent: `<div i18n>Hello {{exp3}}!">`
 *   // If `changeMask & 0b100`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b100, 4,
 *   // Concatenate `newValue = 'Hello ' + lViewData[bindIndex -2] + '!';`.
 *   'Hello ', -2, '!',
 *   // Update text: `lViewData[1].textContent = newValue;`
 *   1 << SHIFT_REF | Text,
 *
 *   // The following OpCodes represent: `<div i18n>{exp4, plural, ... }">`
 *   // If `changeMask & 0b1000`
 *   //        has changed then execute update OpCodes.
 *   //        has NOT changed then skip `4` values and start processing next OpCodes.
 *   0b1000, 4,
 *   // Concatenate `newValue = lViewData[bindIndex -1];`.
 *   -1,
 *   // Switch ICU: `icuSwitchCase(lViewData[1], 0, newValue);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuSwitch,
 *
 *   // Note `changeMask & -1` is always true, so the IcuUpdate will always execute.
 *   -1, 1,
 *   // Update ICU: `icuUpdateCase(lViewData[1], 0);`
 *   0 << SHIFT_ICU | 1 << SHIFT_REF | IcuUpdate,
 *
 * ];
 * ```
 *
 * @record
 */
export function I18nUpdateOpCodes() { }
/**
 * Store information for the i18n translation block.
 * @record
 */
export function TI18n() { }
/**
 * Number of slots to allocate in expando.
 *
 * This is the max number of DOM elements which will be created by this i18n + ICU blocks. When
 * the DOM elements are being created they are stored in the EXPANDO, so that update OpCodes can
 * write into them.
 * @type {?}
 */
TI18n.prototype.vars;
/**
 * Index in EXPANDO where the i18n stores its DOM nodes.
 *
 * When the bindings are processed by the `i18nEnd` instruction it is necessary to know where the
 * newly created DOM nodes will be inserted.
 * @type {?}
 */
TI18n.prototype.expandoStartIndex;
/**
 * A set of OpCodes which will create the Text Nodes and ICU anchors for the translation blocks.
 *
 * NOTE: The ICU anchors are filled in with ICU Update OpCode.
 * @type {?}
 */
TI18n.prototype.create;
/**
 * A set of OpCodes which will be executed on each change detection to determine if any changes to
 * DOM are required.
 * @type {?}
 */
TI18n.prototype.update;
/**
 * A list of ICUs in a translation block (or `null` if block has no ICUs).
 *
 * Example:
 * Given: `<div i18n>You have {count, plural, ...} and {state, switch, ...}</div>`
 * There would be 2 ICUs in this array.
 *   1. `{count, plural, ...}`
 *   2. `{state, switch, ...}`
 * @type {?}
 */
TI18n.prototype.icus;
/** @enum {number} */
var IcuType = {
    select: 0,
    plural: 1,
};
export { IcuType };
/**
 * @record
 */
export function TIcu() { }
/**
 * Defines the ICU type of `select` or `plural`
 * @type {?}
 */
TIcu.prototype.type;
/**
 * Number of slots to allocate in expando for each case.
 *
 * This is the max number of DOM elements which will be created by this i18n + ICU blocks. When
 * the DOM elements are being created they are stored in the EXPANDO, so that update OpCodes can
 * write into them.
 * @type {?}
 */
TIcu.prototype.vars;
/**
 * An optional array of child/sub ICUs.
 *
 * In case of nested ICUs such as:
 * ```
 * {�0�, plural,
 *   =0 {zero}
 *   other {�0� {�1�, select,
 *                     cat {cats}
 *                     dog {dogs}
 *                     other {animals}
 *                   }!
 *   }
 * }
 * ```
 * When the parent ICU is changing it must clean up child ICUs as well. For this reason it needs
 * to know which child ICUs to run clean up for as well.
 *
 * In the above example this would be:
 * ```
 * [
 *   [],   // `=0` has no sub ICUs
 *   [1],  // `other` has one subICU at `1`st index.
 * ]
 * ```
 *
 * The reason why it is Array of Arrays is because first array represents the case, and second
 * represents the child ICUs to clean up. There may be more than one child ICUs per case.
 * @type {?}
 */
TIcu.prototype.childIcus;
/**
 * Index in EXPANDO where the i18n stores its DOM nodes.
 *
 * When the bindings are processed by the `i18nEnd` instruction it is necessary to know where the
 * newly created DOM nodes will be inserted.
 * @type {?}
 */
TIcu.prototype.expandoStartIndex;
/**
 * A list of case values which the current ICU will try to match.
 *
 * The last value is `other`
 * @type {?}
 */
TIcu.prototype.cases;
/**
 * A set of OpCodes to apply in order to build up the DOM render tree for the ICU
 * @type {?}
 */
TIcu.prototype.create;
/**
 * A set of OpCodes to apply in order to destroy the DOM render tree for the ICU.
 * @type {?}
 */
TIcu.prototype.remove;
/**
 * A set of OpCodes to apply in order to update the DOM render tree for the ICU bindings.
 * @type {?}
 */
TIcu.prototype.update;
/**
 * Stores currently selected case in each ICU.
 *
 * For each ICU in translation, the `Li18n` stores the currently selected case for the current
 * `LView`. For perf reasons this array is only created if a translation block has an ICU.
 * @record
 */
export function LI18n() { }

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFvQkUsWUFBYTtJQUViLGdCQUFpQjtJQUVqQixjQUFrQjtJQUVsQixZQUFzQztJQUd0QyxTQUFhO0lBRWIsY0FBa0I7SUFFbEIsZUFBbUI7SUFFbkIsU0FBYTs7Ozs7Ozs7QUFRZixhQUFhLGNBQWMsR0FBbUI7SUFDNUMsTUFBTSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQzs7Ozs7O0FBUUYsYUFBYSxjQUFjLEdBQW1CO0lBQzVDLE1BQU0sRUFBRSxTQUFTO0NBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtRkEsWUFBYTtJQUViLGFBQWM7SUFFZCxjQUFrQjtJQUVsQixZQUFzQztJQUd0QyxPQUFXO0lBRVgsT0FBVztJQUVYLFlBQWdCO0lBRWhCLFlBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkhoQixTQUFVO0lBQ1YsU0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBgSTE4bk11dGF0ZU9wQ29kZWAgZGVmaW5lcyBPcENvZGVzIGZvciBgSTE4bk11dGF0ZU9wQ29kZXNgIGFycmF5LlxuICpcbiAqIE9wQ29kZXMgY29udGFpbiB0aHJlZSBwYXJ0czpcbiAqICAxKSBQYXJlbnQgbm9kZSBpbmRleCBvZmZzZXQuXG4gKiAgMikgUmVmZXJlbmNlIG5vZGUgaW5kZXggb2Zmc2V0LlxuICogIDMpIFRoZSBPcENvZGUgdG8gZXhlY3V0ZS5cbiAqXG4gKiBTZWU6IGBJMThuQ3JlYXRlT3BDb2Rlc2AgZm9yIGV4YW1wbGUgb2YgdXNhZ2UuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEkxOG5NdXRhdGVPcENvZGUge1xuICAvLy8gU3RvcmVzIHNoaWZ0IGFtb3VudCBmb3IgYml0cyAxNy0yIHRoYXQgY29udGFpbiByZWZlcmVuY2UgaW5kZXguXG4gIFNISUZUX1JFRiA9IDIsXG4gIC8vLyBTdG9yZXMgc2hpZnQgYW1vdW50IGZvciBiaXRzIDMxLTE3IHRoYXQgY29udGFpbiBwYXJlbnQgaW5kZXguXG4gIFNISUZUX1BBUkVOVCA9IDE3LFxuICAvLy8gTWFzayBmb3IgT3BDb2RlXG4gIE1BU0tfT1BDT0RFID0gMGIxMSxcbiAgLy8vIE1hc2sgZm9yIHJlZmVyZW5jZSBpbmRleC5cbiAgTUFTS19SRUYgPSAoKDIgXiAxNikgLSAxKSA8PCBTSElGVF9SRUYsXG5cbiAgLy8vIE9wQ29kZSB0byBzZWxlY3QgYSBub2RlLiAobmV4dCBPcENvZGUgd2lsbCBjb250YWluIHRoZSBvcGVyYXRpb24uKVxuICBTZWxlY3QgPSAwYjAwLFxuICAvLy8gT3BDb2RlIHRvIGFwcGVuZCB0aGUgY3VycmVudCBub2RlIHRvIGBQQVJFTlRgLlxuICBBcHBlbmRDaGlsZCA9IDBiMDEsXG4gIC8vLyBPcENvZGUgdG8gaW5zZXJ0IHRoZSBjdXJyZW50IG5vZGUgdG8gYFBBUkVOVGAgYmVmb3JlIGBSRUZgLlxuICBJbnNlcnRCZWZvcmUgPSAwYjEwLFxuICAvLy8gT3BDb2RlIHRvIHJlbW92ZSB0aGUgYFJFRmAgbm9kZSBmcm9tIGBQQVJFTlRgLlxuICBSZW1vdmUgPSAwYjExLFxufVxuXG4vKipcbiAqIE1hcmtzIHRoYXQgdGhlIG5leHQgc3RyaW5nIGlzIGZvciBlbGVtZW50LlxuICpcbiAqIFNlZSBgSTE4bk11dGF0ZU9wQ29kZXNgIGRvY3VtZW50YXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBFTEVNRU5UX01BUktFUjogRUxFTUVOVF9NQVJLRVIgPSB7XG4gIG1hcmtlcjogJ2VsZW1lbnQnXG59O1xuZXhwb3J0IGludGVyZmFjZSBFTEVNRU5UX01BUktFUiB7IG1hcmtlcjogJ2VsZW1lbnQnOyB9XG5cbi8qKlxuICogTWFya3MgdGhhdCB0aGUgbmV4dCBzdHJpbmcgaXMgZm9yIGNvbW1lbnQuXG4gKlxuICogU2VlIGBJMThuTXV0YXRlT3BDb2Rlc2AgZG9jdW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTU1FTlRfTUFSS0VSOiBDT01NRU5UX01BUktFUiA9IHtcbiAgbWFya2VyOiAnY29tbWVudCdcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ09NTUVOVF9NQVJLRVIgeyBtYXJrZXI6ICdjb21tZW50JzsgfVxuXG4vKipcbiAqIEFycmF5IHN0b3JpbmcgT3BDb2RlIGZvciBkeW5hbWljYWxseSBjcmVhdGluZyBgaTE4bmAgYmxvY2tzLlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGBcbiAqIDxJMThuQ3JlYXRlT3BDb2RlPltcbiAqICAgLy8gRm9yIGFkZGluZyB0ZXh0IG5vZGVzXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld0RhdGFbaW5kZXgrK10gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnYWJjJyk7XG4gKiAgIC8vICAgbFZpZXdEYXRhWzFdLmluc2VydEJlZm9yZShub2RlLCBsVmlld0RhdGFbMl0pO1xuICogICAnYWJjJywgMSA8PCBTSElGVF9QQVJFTlQgfCAyIDw8IFNISUZUX1JFRiB8IEluc2VydEJlZm9yZSxcbiAqXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3RGF0YVtpbmRleCsrXSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCd4eXonKTtcbiAqICAgLy8gICBsVmlld0RhdGFbMV0uYXBwZW5kQ2hpbGQobm9kZSk7XG4gKiAgICd4eXonLCAxIDw8IFNISUZUX1BBUkVOVCB8IEFwcGVuZENoaWxkLFxuICpcbiAqICAgLy8gRm9yIGFkZGluZyBlbGVtZW50IG5vZGVzXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld0RhdGFbaW5kZXgrK10gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAqICAgLy8gICBsVmlld0RhdGFbMV0uaW5zZXJ0QmVmb3JlKG5vZGUsIGxWaWV3RGF0YVsyXSk7XG4gKiAgIEVMRU1FTlRfTUFSS0VSLCAnZGl2JywgMSA8PCBTSElGVF9QQVJFTlQgfCAyIDw8IFNISUZUX1JFRiB8IEluc2VydEJlZm9yZSxcbiAqXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3RGF0YVtpbmRleCsrXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICogICAvLyAgIGxWaWV3RGF0YVsxXS5hcHBlbmRDaGlsZChub2RlKTtcbiAqICAgRUxFTUVOVF9NQVJLRVIsICdkaXYnLCAxIDw8IFNISUZUX1BBUkVOVCB8IEFwcGVuZENoaWxkLFxuICpcbiAqICAgLy8gRm9yIGFkZGluZyBjb21tZW50IG5vZGVzXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld0RhdGFbaW5kZXgrK10gPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCcnKTtcbiAqICAgLy8gICBsVmlld0RhdGFbMV0uaW5zZXJ0QmVmb3JlKG5vZGUsIGxWaWV3RGF0YVsyXSk7XG4gKiAgIENPTU1FTlRfTUFSS0VSLCAnJywgMSA8PCBTSElGVF9QQVJFTlQgfCAyIDw8IFNISUZUX1JFRiB8IEluc2VydEJlZm9yZSxcbiAqXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3RGF0YVtpbmRleCsrXSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJycpO1xuICogICAvLyAgIGxWaWV3RGF0YVsxXS5hcHBlbmRDaGlsZChub2RlKTtcbiAqICAgQ09NTUVOVF9NQVJLRVIsICcnLCAxIDw8IFNISUZUX1BBUkVOVCB8IEFwcGVuZENoaWxkLFxuICpcbiAqICAgLy8gRm9yIG1vdmluZyBleGlzdGluZyBub2RlcyB0byBhIGRpZmZlcmVudCBsb2NhdGlvblxuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld0RhdGFbMV07XG4gKiAgIC8vICAgbFZpZXdEYXRhWzJdLmluc2VydEJlZm9yZShub2RlLCBsVmlld0RhdGFbM10pO1xuICogICAxIDw8IFNISUZUX1JFRiB8IFNlbGVjdCwgMiA8PCBTSElGVF9QQVJFTlQgfCAzIDw8IFNISUZUX1JFRiB8IEluc2VydEJlZm9yZSxcbiAqXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3RGF0YVsxXTtcbiAqICAgLy8gICBsVmlld0RhdGFbMl0uYXBwZW5kQ2hpbGQobm9kZSk7XG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgU2VsZWN0LCAyIDw8IFNISUZUX1BBUkVOVCB8IEFwcGVuZENoaWxkLFxuICpcbiAqICAgLy8gRm9yIHJlbW92aW5nIGV4aXN0aW5nIG5vZGVzXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3RGF0YVsxXTtcbiAqICAgLy8gICBsVmlld0RhdGFbMl0ucmVtb3ZlKG5vZGUpO1xuICogICAyIDw8IFNISUZUX1BBUkVOVCB8IDEgPDwgU0hJRlRfUkVGIHwgUmVtb3ZlLFxuICpcbiAqICAgLy8gRm9yIHdyaXRpbmcgYXR0cmlidXRlc1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld0RhdGFbMV07XG4gKiAgIC8vICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2F0dHInLCAndmFsdWUnKTtcbiAqICAgMSA8PCBTSElGVF9SRUYgfCBTZWxlY3QsICdhdHRyJywgJ3ZhbHVlJ1xuICogICAgICAgICAgICAvLyBOT1RFOiBTZWxlY3QgZm9sbG93ZWQgYnkgdHdvIHN0cmluZyAodnMgc2VsZWN0IGZvbGxvd2VkIGJ5IE9wQ29kZSlcbiAqIF07XG4gKiBgYGBcbiAqIE5PVEU6XG4gKiAgIC0gYGluZGV4YCBpcyBpbml0aWFsIGxvY2F0aW9uIHdoZXJlIHRoZSBleHRyYSBub2RlcyBzaG91bGQgYmUgc3RvcmVkIGluIHRoZSBFWFBBTkRPIHNlY3Rpb24gb2ZcbiAqIGBMVklld0RhdGFgLlxuICpcbiAqIFNlZTogYGFwcGx5STE4bkNyZWF0ZU9wQ29kZXNgO1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEkxOG5NdXRhdGVPcENvZGVzIGV4dGVuZHMgQXJyYXk8bnVtYmVyfHN0cmluZ3xFTEVNRU5UX01BUktFUnxDT01NRU5UX01BUktFUnxudWxsPiB7XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEkxOG5VcGRhdGVPcENvZGUge1xuICAvLy8gU3RvcmVzIHNoaWZ0IGFtb3VudCBmb3IgYml0cyAxNy0yIHRoYXQgY29udGFpbiByZWZlcmVuY2UgaW5kZXguXG4gIFNISUZUX1JFRiA9IDIsXG4gIC8vLyBTdG9yZXMgc2hpZnQgYW1vdW50IGZvciBiaXRzIDMxLTE3IHRoYXQgY29udGFpbiB3aGljaCBJQ1UgaW4gaTE4biBibG9jayBhcmUgd2UgcmVmZXJyaW5nIHRvLlxuICBTSElGVF9JQ1UgPSAxNyxcbiAgLy8vIE1hc2sgZm9yIE9wQ29kZVxuICBNQVNLX09QQ09ERSA9IDBiMTEsXG4gIC8vLyBNYXNrIGZvciByZWZlcmVuY2UgaW5kZXguXG4gIE1BU0tfUkVGID0gKCgyIF4gMTYpIC0gMSkgPDwgU0hJRlRfUkVGLFxuXG4gIC8vLyBPcENvZGUgdG8gdXBkYXRlIGEgdGV4dCBub2RlLlxuICBUZXh0ID0gMGIwMCxcbiAgLy8vIE9wQ29kZSB0byB1cGRhdGUgYSBhdHRyaWJ1dGUgb2YgYSBub2RlLlxuICBBdHRyID0gMGIwMSxcbiAgLy8vIE9wQ29kZSB0byBzd2l0Y2ggdGhlIGN1cnJlbnQgSUNVIGNhc2UuXG4gIEljdVN3aXRjaCA9IDBiMTAsXG4gIC8vLyBPcENvZGUgdG8gdXBkYXRlIHRoZSBjdXJyZW50IElDVSBjYXNlLlxuICBJY3VVcGRhdGUgPSAwYjExLFxufVxuXG4vKipcbiAqIFN0b3JlcyBET00gb3BlcmF0aW9ucyB3aGljaCBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gdXBkYXRlIERPTSByZW5kZXIgdHJlZSBkdWUgdG8gY2hhbmdlcyBpblxuICogZXhwcmVzc2lvbnMuXG4gKlxuICogVGhlIGJhc2ljIGlkZWEgaXMgdGhhdCBgaTE4bkV4cGAgT3BDb2RlcyBjYXB0dXJlIGV4cHJlc3Npb24gY2hhbmdlcyBhbmQgdXBkYXRlIGEgY2hhbmdlXG4gKiBtYXNrIGJpdC4gKEJpdCAxIGZvciBleHByZXNzaW9uIDEsIGJpdCAyIGZvciBleHByZXNzaW9uIDIgZXRjLi4uLCBiaXQgMzIgZm9yIGV4cHJlc3Npb24gMzIgYW5kXG4gKiBoaWdoZXIuKSBUaGUgT3BDb2RlcyB0aGVuIGNvbXBhcmUgaXRzIG93biBjaGFuZ2UgbWFzayBhZ2FpbnN0IHRoZSBleHByZXNzaW9uIGNoYW5nZSBtYXNrIHRvXG4gKiBkZXRlcm1pbmUgaWYgdGhlIE9wQ29kZXMgc2hvdWxkIGV4ZWN1dGUuXG4gKlxuICogVGhlc2UgT3BDb2RlcyBjYW4gYmUgdXNlZCBieSBib3RoIHRoZSBpMThuIGJsb2NrIGFzIHdlbGwgYXMgSUNVIHN1Yi1ibG9jay5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogQXNzdW1lXG4gKiBgYGBcbiAqICAgaWYgKHJmICYgUmVuZGVyRmxhZ3MuVXBkYXRlKSB7XG4gKiAgICBpMThuRXhwKGJpbmQoY3R4LmV4cDEpKTsgLy8gSWYgY2hhbmdlZCBzZXQgbWFzayBiaXQgMVxuICogICAgaTE4bkV4cChiaW5kKGN0eC5leHAyKSk7IC8vIElmIGNoYW5nZWQgc2V0IG1hc2sgYml0IDJcbiAqICAgIGkxOG5FeHAoYmluZChjdHguZXhwMykpOyAvLyBJZiBjaGFuZ2VkIHNldCBtYXNrIGJpdCAzXG4gKiAgICBpMThuRXhwKGJpbmQoY3R4LmV4cDQpKTsgLy8gSWYgY2hhbmdlZCBzZXQgbWFzayBiaXQgNFxuICogICAgaTE4bkFwcGx5KDApOyAgICAgICAgICAgIC8vIEFwcGx5IGFsbCBjaGFuZ2VzIGJ5IGV4ZWN1dGluZyB0aGUgT3BDb2Rlcy5cbiAqICB9XG4gKiBgYGBcbiAqIFdlIGNhbiBhc3N1bWUgdGhhdCBlYWNoIGNhbGwgdG8gYGkxOG5FeHBgIHNldHMgYW4gaW50ZXJuYWwgYGNoYW5nZU1hc2tgIGJpdCBkZXBlbmRpbmcgb24gdGhlXG4gKiBpbmRleCBvZiBgaTE4bkV4cGAgaW5kZXguXG4gKlxuICogT3BDb2Rlc1xuICogYGBgXG4gKiA8STE4blVwZGF0ZU9wQ29kZXM+W1xuICogICAvLyBUaGUgZm9sbG93aW5nIE9wQ29kZXMgcmVwcmVzZW50OiBgPGRpdiBpMThuLXRpdGxlPVwicHJle3tleHAxfX1pbnt7ZXhwMn19cG9zdFwiPmBcbiAqICAgLy8gSWYgYGNoYW5nZU1hc2sgJiAwYjExYFxuICogICAvLyAgICAgICAgaGFzIGNoYW5nZWQgdGhlbiBleGVjdXRlIHVwZGF0ZSBPcENvZGVzLlxuICogICAvLyAgICAgICAgaGFzIE5PVCBjaGFuZ2VkIHRoZW4gc2tpcCBgN2AgdmFsdWVzIGFuZCBzdGFydCBwcm9jZXNzaW5nIG5leHQgT3BDb2Rlcy5cbiAqICAgMGIxMSwgNyxcbiAqICAgLy8gQ29uY2F0ZW5hdGUgYG5ld1ZhbHVlID0gJ3ByZScrbFZpZXdEYXRhW2JpbmRJbmRleC00XSsnaW4nK2xWaWV3RGF0YVtiaW5kSW5kZXgtM10rJ3Bvc3QnO2AuXG4gKiAgICdwcmUnLCAtNCwgJ2luJywgLTMsICdwb3N0JyxcbiAqICAgLy8gVXBkYXRlIGF0dHJpYnV0ZTogYGVsZW1lbnRBdHRyaWJ1dGUoMSwgJ3RpdGxlJywgc2FuaXRpemVyRm4obmV3VmFsdWUpKTtgXG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgQXR0ciwgJ3RpdGxlJywgc2FuaXRpemVyRm4sXG4gKlxuICogICAvLyBUaGUgZm9sbG93aW5nIE9wQ29kZXMgcmVwcmVzZW50OiBgPGRpdiBpMThuPkhlbGxvIHt7ZXhwM319IVwiPmBcbiAqICAgLy8gSWYgYGNoYW5nZU1hc2sgJiAwYjEwMGBcbiAqICAgLy8gICAgICAgIGhhcyBjaGFuZ2VkIHRoZW4gZXhlY3V0ZSB1cGRhdGUgT3BDb2Rlcy5cbiAqICAgLy8gICAgICAgIGhhcyBOT1QgY2hhbmdlZCB0aGVuIHNraXAgYDRgIHZhbHVlcyBhbmQgc3RhcnQgcHJvY2Vzc2luZyBuZXh0IE9wQ29kZXMuXG4gKiAgIDBiMTAwLCA0LFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSAnSGVsbG8gJyArIGxWaWV3RGF0YVtiaW5kSW5kZXggLTJdICsgJyEnO2AuXG4gKiAgICdIZWxsbyAnLCAtMiwgJyEnLFxuICogICAvLyBVcGRhdGUgdGV4dDogYGxWaWV3RGF0YVsxXS50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO2BcbiAqICAgMSA8PCBTSElGVF9SRUYgfCBUZXh0LFxuICpcbiAqICAgLy8gVGhlIGZvbGxvd2luZyBPcENvZGVzIHJlcHJlc2VudDogYDxkaXYgaTE4bj57ZXhwNCwgcGx1cmFsLCAuLi4gfVwiPmBcbiAqICAgLy8gSWYgYGNoYW5nZU1hc2sgJiAwYjEwMDBgXG4gKiAgIC8vICAgICAgICBoYXMgY2hhbmdlZCB0aGVuIGV4ZWN1dGUgdXBkYXRlIE9wQ29kZXMuXG4gKiAgIC8vICAgICAgICBoYXMgTk9UIGNoYW5nZWQgdGhlbiBza2lwIGA0YCB2YWx1ZXMgYW5kIHN0YXJ0IHByb2Nlc3NpbmcgbmV4dCBPcENvZGVzLlxuICogICAwYjEwMDAsIDQsXG4gKiAgIC8vIENvbmNhdGVuYXRlIGBuZXdWYWx1ZSA9IGxWaWV3RGF0YVtiaW5kSW5kZXggLTFdO2AuXG4gKiAgIC0xLFxuICogICAvLyBTd2l0Y2ggSUNVOiBgaWN1U3dpdGNoQ2FzZShsVmlld0RhdGFbMV0sIDAsIG5ld1ZhbHVlKTtgXG4gKiAgIDAgPDwgU0hJRlRfSUNVIHwgMSA8PCBTSElGVF9SRUYgfCBJY3VTd2l0Y2gsXG4gKlxuICogICAvLyBOb3RlIGBjaGFuZ2VNYXNrICYgLTFgIGlzIGFsd2F5cyB0cnVlLCBzbyB0aGUgSWN1VXBkYXRlIHdpbGwgYWx3YXlzIGV4ZWN1dGUuXG4gKiAgIC0xLCAxLFxuICogICAvLyBVcGRhdGUgSUNVOiBgaWN1VXBkYXRlQ2FzZShsVmlld0RhdGFbMV0sIDApO2BcbiAqICAgMCA8PCBTSElGVF9JQ1UgfCAxIDw8IFNISUZUX1JFRiB8IEljdVVwZGF0ZSxcbiAqXG4gKiBdO1xuICogYGBgXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEkxOG5VcGRhdGVPcENvZGVzIGV4dGVuZHMgQXJyYXk8c3RyaW5nfG51bWJlcnwoKHRleHQ6IHN0cmluZykgPT4gc3RyaW5nIHwgbnVsbCk+IHt9XG5cbi8qKlxuICogU3RvcmUgaW5mb3JtYXRpb24gZm9yIHRoZSBpMThuIHRyYW5zbGF0aW9uIGJsb2NrLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRJMThuIHtcbiAgLyoqXG4gICAqIE51bWJlciBvZiBzbG90cyB0byBhbGxvY2F0ZSBpbiBleHBhbmRvLlxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBtYXggbnVtYmVyIG9mIERPTSBlbGVtZW50cyB3aGljaCB3aWxsIGJlIGNyZWF0ZWQgYnkgdGhpcyBpMThuICsgSUNVIGJsb2Nrcy4gV2hlblxuICAgKiB0aGUgRE9NIGVsZW1lbnRzIGFyZSBiZWluZyBjcmVhdGVkIHRoZXkgYXJlIHN0b3JlZCBpbiB0aGUgRVhQQU5ETywgc28gdGhhdCB1cGRhdGUgT3BDb2RlcyBjYW5cbiAgICogd3JpdGUgaW50byB0aGVtLlxuICAgKi9cbiAgdmFyczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRleCBpbiBFWFBBTkRPIHdoZXJlIHRoZSBpMThuIHN0b3JlcyBpdHMgRE9NIG5vZGVzLlxuICAgKlxuICAgKiBXaGVuIHRoZSBiaW5kaW5ncyBhcmUgcHJvY2Vzc2VkIGJ5IHRoZSBgaTE4bkVuZGAgaW5zdHJ1Y3Rpb24gaXQgaXMgbmVjZXNzYXJ5IHRvIGtub3cgd2hlcmUgdGhlXG4gICAqIG5ld2x5IGNyZWF0ZWQgRE9NIG5vZGVzIHdpbGwgYmUgaW5zZXJ0ZWQuXG4gICAqL1xuICBleHBhbmRvU3RhcnRJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHdoaWNoIHdpbGwgY3JlYXRlIHRoZSBUZXh0IE5vZGVzIGFuZCBJQ1UgYW5jaG9ycyBmb3IgdGhlIHRyYW5zbGF0aW9uIGJsb2Nrcy5cbiAgICpcbiAgICogTk9URTogVGhlIElDVSBhbmNob3JzIGFyZSBmaWxsZWQgaW4gd2l0aCBJQ1UgVXBkYXRlIE9wQ29kZS5cbiAgICovXG4gIGNyZWF0ZTogSTE4bk11dGF0ZU9wQ29kZXM7XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgd2hpY2ggd2lsbCBiZSBleGVjdXRlZCBvbiBlYWNoIGNoYW5nZSBkZXRlY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGFueSBjaGFuZ2VzIHRvXG4gICAqIERPTSBhcmUgcmVxdWlyZWQuXG4gICAqL1xuICB1cGRhdGU6IEkxOG5VcGRhdGVPcENvZGVzO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgSUNVcyBpbiBhIHRyYW5zbGF0aW9uIGJsb2NrIChvciBgbnVsbGAgaWYgYmxvY2sgaGFzIG5vIElDVXMpLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBHaXZlbjogYDxkaXYgaTE4bj5Zb3UgaGF2ZSB7Y291bnQsIHBsdXJhbCwgLi4ufSBhbmQge3N0YXRlLCBzd2l0Y2gsIC4uLn08L2Rpdj5gXG4gICAqIFRoZXJlIHdvdWxkIGJlIDIgSUNVcyBpbiB0aGlzIGFycmF5LlxuICAgKiAgIDEuIGB7Y291bnQsIHBsdXJhbCwgLi4ufWBcbiAgICogICAyLiBge3N0YXRlLCBzd2l0Y2gsIC4uLn1gXG4gICAqL1xuICBpY3VzOiBUSWN1W118bnVsbDtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBJQ1UgdHlwZSBvZiBgc2VsZWN0YCBvciBgcGx1cmFsYFxuICovXG5leHBvcnQgY29uc3QgZW51bSBJY3VUeXBlIHtcbiAgc2VsZWN0ID0gMCxcbiAgcGx1cmFsID0gMSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUSWN1IHtcbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIElDVSB0eXBlIG9mIGBzZWxlY3RgIG9yIGBwbHVyYWxgXG4gICAqL1xuICB0eXBlOiBJY3VUeXBlO1xuXG4gIC8qKlxuICAgKiBOdW1iZXIgb2Ygc2xvdHMgdG8gYWxsb2NhdGUgaW4gZXhwYW5kbyBmb3IgZWFjaCBjYXNlLlxuICAgKlxuICAgKiBUaGlzIGlzIHRoZSBtYXggbnVtYmVyIG9mIERPTSBlbGVtZW50cyB3aGljaCB3aWxsIGJlIGNyZWF0ZWQgYnkgdGhpcyBpMThuICsgSUNVIGJsb2Nrcy4gV2hlblxuICAgKiB0aGUgRE9NIGVsZW1lbnRzIGFyZSBiZWluZyBjcmVhdGVkIHRoZXkgYXJlIHN0b3JlZCBpbiB0aGUgRVhQQU5ETywgc28gdGhhdCB1cGRhdGUgT3BDb2RlcyBjYW5cbiAgICogd3JpdGUgaW50byB0aGVtLlxuICAgKi9cbiAgdmFyczogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGFycmF5IG9mIGNoaWxkL3N1YiBJQ1VzLlxuICAgKlxuICAgKiBJbiBjYXNlIG9mIG5lc3RlZCBJQ1VzIHN1Y2ggYXM6XG4gICAqIGBgYFxuICAgKiB777+9MO+/vSwgcGx1cmFsLFxuICAgKiAgID0wIHt6ZXJvfVxuICAgKiAgIG90aGVyIHvvv70w77+9IHvvv70x77+9LCBzZWxlY3QsXG4gICAqICAgICAgICAgICAgICAgICAgICAgY2F0IHtjYXRzfVxuICAgKiAgICAgICAgICAgICAgICAgICAgIGRvZyB7ZG9nc31cbiAgICogICAgICAgICAgICAgICAgICAgICBvdGhlciB7YW5pbWFsc31cbiAgICogICAgICAgICAgICAgICAgICAgfSFcbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqIFdoZW4gdGhlIHBhcmVudCBJQ1UgaXMgY2hhbmdpbmcgaXQgbXVzdCBjbGVhbiB1cCBjaGlsZCBJQ1VzIGFzIHdlbGwuIEZvciB0aGlzIHJlYXNvbiBpdCBuZWVkc1xuICAgKiB0byBrbm93IHdoaWNoIGNoaWxkIElDVXMgdG8gcnVuIGNsZWFuIHVwIGZvciBhcyB3ZWxsLlxuICAgKlxuICAgKiBJbiB0aGUgYWJvdmUgZXhhbXBsZSB0aGlzIHdvdWxkIGJlOlxuICAgKiBgYGBcbiAgICogW1xuICAgKiAgIFtdLCAgIC8vIGA9MGAgaGFzIG5vIHN1YiBJQ1VzXG4gICAqICAgWzFdLCAgLy8gYG90aGVyYCBoYXMgb25lIHN1YklDVSBhdCBgMWBzdCBpbmRleC5cbiAgICogXVxuICAgKiBgYGBcbiAgICpcbiAgICogVGhlIHJlYXNvbiB3aHkgaXQgaXMgQXJyYXkgb2YgQXJyYXlzIGlzIGJlY2F1c2UgZmlyc3QgYXJyYXkgcmVwcmVzZW50cyB0aGUgY2FzZSwgYW5kIHNlY29uZFxuICAgKiByZXByZXNlbnRzIHRoZSBjaGlsZCBJQ1VzIHRvIGNsZWFuIHVwLiBUaGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBjaGlsZCBJQ1VzIHBlciBjYXNlLlxuICAgKi9cbiAgY2hpbGRJY3VzOiBudW1iZXJbXVtdO1xuXG4gIC8qKlxuICAgKiBJbmRleCBpbiBFWFBBTkRPIHdoZXJlIHRoZSBpMThuIHN0b3JlcyBpdHMgRE9NIG5vZGVzLlxuICAgKlxuICAgKiBXaGVuIHRoZSBiaW5kaW5ncyBhcmUgcHJvY2Vzc2VkIGJ5IHRoZSBgaTE4bkVuZGAgaW5zdHJ1Y3Rpb24gaXQgaXMgbmVjZXNzYXJ5IHRvIGtub3cgd2hlcmUgdGhlXG4gICAqIG5ld2x5IGNyZWF0ZWQgRE9NIG5vZGVzIHdpbGwgYmUgaW5zZXJ0ZWQuXG4gICAqL1xuICBleHBhbmRvU3RhcnRJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgY2FzZSB2YWx1ZXMgd2hpY2ggdGhlIGN1cnJlbnQgSUNVIHdpbGwgdHJ5IHRvIG1hdGNoLlxuICAgKlxuICAgKiBUaGUgbGFzdCB2YWx1ZSBpcyBgb3RoZXJgXG4gICAqL1xuICBjYXNlczogYW55W107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgdG8gYXBwbHkgaW4gb3JkZXIgdG8gYnVpbGQgdXAgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVVxuICAgKi9cbiAgY3JlYXRlOiBJMThuTXV0YXRlT3BDb2Rlc1tdO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHRvIGFwcGx5IGluIG9yZGVyIHRvIGRlc3Ryb3kgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVS5cbiAgICovXG4gIHJlbW92ZTogSTE4bk11dGF0ZU9wQ29kZXNbXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB0byBhcHBseSBpbiBvcmRlciB0byB1cGRhdGUgdGhlIERPTSByZW5kZXIgdHJlZSBmb3IgdGhlIElDVSBiaW5kaW5ncy5cbiAgICovXG4gIHVwZGF0ZTogSTE4blVwZGF0ZU9wQ29kZXNbXTtcbn1cblxuLyoqXG4gKiBTdG9yZXMgY3VycmVudGx5IHNlbGVjdGVkIGNhc2UgaW4gZWFjaCBJQ1UuXG4gKlxuICogRm9yIGVhY2ggSUNVIGluIHRyYW5zbGF0aW9uLCB0aGUgYExpMThuYCBzdG9yZXMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjYXNlIGZvciB0aGUgY3VycmVudFxuICogYExWaWV3YC4gRm9yIHBlcmYgcmVhc29ucyB0aGlzIGFycmF5IGlzIG9ubHkgY3JlYXRlZCBpZiBhIHRyYW5zbGF0aW9uIGJsb2NrIGhhcyBhbiBJQ1UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTEkxOG4gZXh0ZW5kcyBBcnJheTxudW1iZXI+IHt9XG4iXX0=