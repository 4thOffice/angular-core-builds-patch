/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NO_CHANGE } from './instructions';
/**
 * A list of flags to encode the i18n instructions used to translate the template.
 * We shift the flags by 29 so that 30 & 31 & 32 bits contains the instructions.
 */
export declare const enum I18nInstructions {
    Text = 536870912,
    Element = 1073741824,
    Expression = 1610612736,
    CloseNode = -2147483648,
    RemoveNode = -1610612736,
    /** Used to decode the number encoded with the instruction. */
    IndexMask = 536870911,
    /** Used to test the type of instruction. */
    InstructionMask = -536870912
}
/**
 * Represents the instructions used to translate the template.
 * Instructions can be a placeholder index, a static text or a simple bit field (`I18nFlag`).
 * When the instruction is the flag `Text`, it is always followed by its text value.
 */
export declare type I18nInstruction = number | string;
/**
 * Represents the instructions used to translate attributes containing expressions.
 * Even indexes contain static strings, while odd indexes contain the index of the expression whose
 * value will be concatenated into the final translation.
 */
export declare type I18nExpInstruction = number | string;
/** Mapping of placeholder names to their absolute indexes in their templates. */
export declare type PlaceholderMap = {
    [name: string]: number;
};
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
export declare function i18nMapping(translation: string, elements: (PlaceholderMap | null)[] | null, expressions?: (PlaceholderMap | null)[] | null, tmplContainers?: string[] | null, lastChildIndex?: number | null): I18nInstruction[][];
/**
 * Takes a list of instructions generated by `i18nMapping()` to transform the template accordingly.
 *
 * @param startIndex Index of the first element to translate (for instance the first child of the
 * element with the i18n attribute).
 * @param instructions The list of instructions to apply on the current view.
 */
export declare function i18nApply(startIndex: number, instructions: I18nInstruction[]): void;
/**
 * Takes a translation string and the initial list of expressions and returns a list of instructions
 * that will be used to translate an attribute.
 * Even indexes contain static strings, while odd indexes contain the index of the expression whose
 * value will be concatenated into the final translation.
 */
export declare function i18nExpMapping(translation: string, placeholders: PlaceholderMap): I18nExpInstruction[];
/**
 * Checks if the value of up to 8 expressions have changed and replaces them by their values in a
 * translation, or returns NO_CHANGE.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export declare function i18nInterpolation(instructions: I18nExpInstruction[], numberOfExp: number, v0: any, v1?: any, v2?: any, v3?: any, v4?: any, v5?: any, v6?: any, v7?: any): string | NO_CHANGE;
/**
 * Create a translated interpolation binding with a variable number of expressions.
 *
 * If there are 1 to 8 expressions then `i18nInterpolation()` should be used instead. It is faster
 * because there is no need to create an array of expressions and iterate over it.
 *
 * @returns The concatenated string when any of the arguments changes, `NO_CHANGE` otherwise.
 */
export declare function i18nInterpolationV(instructions: I18nExpInstruction[], values: any[]): string | NO_CHANGE;
