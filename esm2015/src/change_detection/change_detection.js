/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DefaultIterableDifferFactory } from './differs/default_iterable_differ';
import { DefaultKeyValueDifferFactory } from './differs/default_keyvalue_differ';
import { IterableDiffers } from './differs/iterable_differs';
import { KeyValueDiffers } from './differs/keyvalue_differs';
export { WrappedValue, devModeEqual } from './change_detection_util';
export { ChangeDetectorRef } from './change_detector_ref';
export { ChangeDetectionStrategy, ChangeDetectorStatus, isDefaultChangeDetectionStrategy } from './constants';
export { DefaultIterableDifferFactory } from './differs/default_iterable_differ';
export { DefaultIterableDiffer } from './differs/default_iterable_differ';
export { DefaultKeyValueDifferFactory } from './differs/default_keyvalue_differ';
export { IterableDiffers } from './differs/iterable_differs';
export { KeyValueDiffers } from './differs/keyvalue_differs';
export { SimpleChange } from '../interface/simple_change';
/**
 * Structural diffing for `Object`s and `Map`s.
 * @type {?}
 */
const keyValDiff = [new DefaultKeyValueDifferFactory()];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 * @type {?}
 */
const iterableDiff = [new DefaultIterableDifferFactory()];
/** @type {?} */
export const defaultIterableDiffers = new IterableDiffers(iterableDiff);
/** @type {?} */
export const defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQy9FLE9BQU8sRUFBd0IsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbEYsT0FBTyxFQUF3QixlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUVsRixPQUFPLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ25FLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSxnQ0FBZ0MsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUM1RyxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRSxPQUFPLEVBTUwsZUFBZSxFQUdoQixNQUNELDRCQUE0QixDQUFDO0FBQzdCLE9BQU8sRUFBK0UsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFFekksT0FBTyxFQUFDLFlBQVksRUFBZ0IsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7TUFPakUsVUFBVSxHQUE0QixDQUFDLElBQUksNEJBQTRCLEVBQUUsQ0FBQzs7Ozs7TUFLMUUsWUFBWSxHQUE0QixDQUFDLElBQUksNEJBQTRCLEVBQUUsQ0FBQzs7QUFFbEYsTUFBTSxPQUFPLHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFDLFlBQVksQ0FBQzs7QUFFdkUsTUFBTSxPQUFPLHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEZWZhdWx0SXRlcmFibGVEaWZmZXJGYWN0b3J5fSBmcm9tICcuL2RpZmZlcnMvZGVmYXVsdF9pdGVyYWJsZV9kaWZmZXInO1xuaW1wb3J0IHtEZWZhdWx0S2V5VmFsdWVEaWZmZXJGYWN0b3J5fSBmcm9tICcuL2RpZmZlcnMvZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXInO1xuaW1wb3J0IHtJdGVyYWJsZURpZmZlckZhY3RvcnksIEl0ZXJhYmxlRGlmZmVyc30gZnJvbSAnLi9kaWZmZXJzL2l0ZXJhYmxlX2RpZmZlcnMnO1xuaW1wb3J0IHtLZXlWYWx1ZURpZmZlckZhY3RvcnksIEtleVZhbHVlRGlmZmVyc30gZnJvbSAnLi9kaWZmZXJzL2tleXZhbHVlX2RpZmZlcnMnO1xuXG5leHBvcnQge1dyYXBwZWRWYWx1ZSwgZGV2TW9kZUVxdWFsfSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb25fdXRpbCc7XG5leHBvcnQge0NoYW5nZURldGVjdG9yUmVmfSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rvcl9yZWYnO1xuZXhwb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JTdGF0dXMsIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICcuL2NvbnN0YW50cyc7XG5leHBvcnQge0RlZmF1bHRJdGVyYWJsZURpZmZlckZhY3Rvcnl9IGZyb20gJy4vZGlmZmVycy9kZWZhdWx0X2l0ZXJhYmxlX2RpZmZlcic7XG5leHBvcnQge0RlZmF1bHRJdGVyYWJsZURpZmZlcn0gZnJvbSAnLi9kaWZmZXJzL2RlZmF1bHRfaXRlcmFibGVfZGlmZmVyJztcbmV4cG9ydCB7RGVmYXVsdEtleVZhbHVlRGlmZmVyRmFjdG9yeX0gZnJvbSAnLi9kaWZmZXJzL2RlZmF1bHRfa2V5dmFsdWVfZGlmZmVyJztcbmV4cG9ydCB7XG4gIENvbGxlY3Rpb25DaGFuZ2VSZWNvcmQsXG4gIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkLFxuICBJdGVyYWJsZUNoYW5nZXMsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBJdGVyYWJsZURpZmZlckZhY3RvcnksXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgTmdJdGVyYWJsZSxcbiAgVHJhY2tCeUZ1bmN0aW9uXG59IGZyb21cbicuL2RpZmZlcnMvaXRlcmFibGVfZGlmZmVycyc7XG5leHBvcnQge0tleVZhbHVlQ2hhbmdlUmVjb3JkLCBLZXlWYWx1ZUNoYW5nZXMsIEtleVZhbHVlRGlmZmVyLCBLZXlWYWx1ZURpZmZlckZhY3RvcnksIEtleVZhbHVlRGlmZmVyc30gZnJvbSAnLi9kaWZmZXJzL2tleXZhbHVlX2RpZmZlcnMnO1xuZXhwb3J0IHtQaXBlVHJhbnNmb3JtfSBmcm9tICcuL3BpcGVfdHJhbnNmb3JtJztcbmV4cG9ydCB7U2ltcGxlQ2hhbmdlLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICcuLi9pbnRlcmZhY2Uvc2ltcGxlX2NoYW5nZSc7XG5cblxuXG4vKipcbiAqIFN0cnVjdHVyYWwgZGlmZmluZyBmb3IgYE9iamVjdGBzIGFuZCBgTWFwYHMuXG4gKi9cbmNvbnN0IGtleVZhbERpZmY6IEtleVZhbHVlRGlmZmVyRmFjdG9yeVtdID0gW25ldyBEZWZhdWx0S2V5VmFsdWVEaWZmZXJGYWN0b3J5KCldO1xuXG4vKipcbiAqIFN0cnVjdHVyYWwgZGlmZmluZyBmb3IgYEl0ZXJhYmxlYCB0eXBlcyBzdWNoIGFzIGBBcnJheWBzLlxuICovXG5jb25zdCBpdGVyYWJsZURpZmY6IEl0ZXJhYmxlRGlmZmVyRmFjdG9yeVtdID0gW25ldyBEZWZhdWx0SXRlcmFibGVEaWZmZXJGYWN0b3J5KCldO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdEl0ZXJhYmxlRGlmZmVycyA9IG5ldyBJdGVyYWJsZURpZmZlcnMoaXRlcmFibGVEaWZmKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRLZXlWYWx1ZURpZmZlcnMgPSBuZXcgS2V5VmFsdWVEaWZmZXJzKGtleVZhbERpZmYpO1xuIl19