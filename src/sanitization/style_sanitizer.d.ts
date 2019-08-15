/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SafeValue } from './bypass';
/**
 * Sanitizes the given untrusted CSS style property value (i.e. not an entire object, just a single
 * value) and returns a value that is safe to use in a browser environment.
 */
export declare function _sanitizeStyle(value: string): string;
/**
 * A series of flags to instruct a style sanitizer to either validate
 * or sanitize a value.
 *
 * Because sanitization is dependent on the style property (i.e. style
 * sanitization for `width` is much different than for `background-image`)
 * the sanitization function (e.g. `StyleSanitizerFn`) needs to check a
 * property value first before it actually sanitizes any values.
 *
 * This enum exist to allow a style sanitization function to either only
 * do validation (check the property to see whether a value will be
 * sanitized or not) or to sanitize the value (or both).
 *
 * @publicApi
 */
export declare const enum StyleSanitizeMode {
    /** Just check to see if the property is required to be sanitized or not */
    ValidateProperty = 1,
    /** Skip checking the property; just sanitize the value */
    SanitizeOnly = 2,
    /** Check the property and (if true) then sanitize the value */
    ValidateAndSanitize = 3
}
/**
 * Used to intercept and sanitize style values before they are written to the renderer.
 *
 * This function is designed to be called in two modes. When a value is not provided
 * then the function will return a boolean whether a property will be sanitized later.
 * If a value is provided then the sanitized version of that will be returned.
 */
export interface StyleSanitizeFn {
    (prop: string, value: string | SafeValue | null, mode?: StyleSanitizeMode): any;
}
