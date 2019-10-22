/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../util/property';
export var NG_COMP_DEF = getClosureSafeProperty({ ɵcmp: getClosureSafeProperty });
export var NG_DIR_DEF = getClosureSafeProperty({ ɵdir: getClosureSafeProperty });
export var NG_PIPE_DEF = getClosureSafeProperty({ ɵpipe: getClosureSafeProperty });
export var NG_MOD_DEF = getClosureSafeProperty({ ɵmod: getClosureSafeProperty });
export var NG_LOC_ID_DEF = getClosureSafeProperty({ ɵloc: getClosureSafeProperty });
export var NG_BASE_DEF = getClosureSafeProperty({ ngBaseDef: getClosureSafeProperty });
export var NG_FACTORY_DEF = getClosureSafeProperty({ ɵfac: getClosureSafeProperty });
/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
// TODO(misko): This is wrong. The NG_ELEMENT_ID should never be minified.
export var NG_ELEMENT_ID = getClosureSafeProperty({ __NG_ELEMENT_ID__: getClosureSafeProperty });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9maWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFeEQsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNsRixNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ2pGLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDbkYsTUFBTSxDQUFDLElBQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNqRixNQUFNLENBQUMsSUFBTSxhQUFhLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ3BGLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLFNBQVMsRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDdkYsTUFBTSxDQUFDLElBQU0sY0FBYyxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0gsMEVBQTBFO0FBQzFFLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLGlCQUFpQixFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSBmcm9tICcuLi91dGlsL3Byb3BlcnR5JztcblxuZXhwb3J0IGNvbnN0IE5HX0NPTVBfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7ybVjbXA6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19ESVJfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7ybVkaXI6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19QSVBFX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe8m1cGlwZTogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuZXhwb3J0IGNvbnN0IE5HX01PRF9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtW1vZDogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuZXhwb3J0IGNvbnN0IE5HX0xPQ19JRF9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtWxvYzogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuZXhwb3J0IGNvbnN0IE5HX0JBU0VfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7bmdCYXNlRGVmOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfRkFDVE9SWV9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtWZhYzogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG4vKipcbiAqIElmIGEgZGlyZWN0aXZlIGlzIGRpUHVibGljLCBibG9vbUFkZCBzZXRzIGEgcHJvcGVydHkgb24gdGhlIHR5cGUgd2l0aCB0aGlzIGNvbnN0YW50IGFzXG4gKiB0aGUga2V5IGFuZCB0aGUgZGlyZWN0aXZlJ3MgdW5pcXVlIElEIGFzIHRoZSB2YWx1ZS4gVGhpcyBhbGxvd3MgdXMgdG8gbWFwIGRpcmVjdGl2ZXMgdG8gdGhlaXJcbiAqIGJsb29tIGZpbHRlciBiaXQgZm9yIERJLlxuICovXG4vLyBUT0RPKG1pc2tvKTogVGhpcyBpcyB3cm9uZy4gVGhlIE5HX0VMRU1FTlRfSUQgc2hvdWxkIG5ldmVyIGJlIG1pbmlmaWVkLlxuZXhwb3J0IGNvbnN0IE5HX0VMRU1FTlRfSUQgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtfX05HX0VMRU1FTlRfSURfXzogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuIl19