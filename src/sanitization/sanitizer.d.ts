/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SecurityContext } from './security';
/**
 * Sanitizer is used by the views to sanitize potentially dangerous values.
 *
 * @publicApi
 */
export declare abstract class Sanitizer {
    abstract sanitize(context: SecurityContext, value: {} | string | null): string | null;
    /** @nocollapse */
    static ngInjectableDef: never;
}
