/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../util/property';
export var NG_COMPONENT_DEF = getClosureSafeProperty({ ngComponentDef: getClosureSafeProperty });
export var NG_DIRECTIVE_DEF = getClosureSafeProperty({ ngDirectiveDef: getClosureSafeProperty });
export var NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
export var NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
export var NG_PIPE_DEF = getClosureSafeProperty({ ngPipeDef: getClosureSafeProperty });
export var NG_MODULE_DEF = getClosureSafeProperty({ ngModuleDef: getClosureSafeProperty });
export var NG_BASE_DEF = getClosureSafeProperty({ ngBaseDef: getClosureSafeProperty });
/**
 * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
 * the key and the directive's unique ID as the value. This allows us to map directives to their
 * bloom filter bit for DI.
 */
export var NG_ELEMENT_ID = getClosureSafeProperty({ __NG_ELEMENT_ID__: getClosureSafeProperty });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9maWVsZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFeEQsTUFBTSxDQUFDLElBQU0sZ0JBQWdCLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ2pHLE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUFHLHNCQUFzQixDQUFDLEVBQUMsY0FBYyxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUNqRyxNQUFNLENBQUMsSUFBTSxpQkFBaUIsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLGVBQWUsRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDbkcsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsYUFBYSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUMvRixNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ3ZGLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLFdBQVcsRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDM0YsTUFBTSxDQUFDLElBQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLEVBQUMsU0FBUyxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUV2Rjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uL3V0aWwvcHJvcGVydHknO1xuXG5leHBvcnQgY29uc3QgTkdfQ09NUE9ORU5UX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nQ29tcG9uZW50RGVmOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfRElSRUNUSVZFX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nRGlyZWN0aXZlRGVmOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfSU5KRUNUQUJMRV9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ0luamVjdGFibGVEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19JTkpFQ1RPUl9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ0luamVjdG9yRGVmOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5leHBvcnQgY29uc3QgTkdfUElQRV9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ1BpcGVEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19NT0RVTEVfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7bmdNb2R1bGVEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19CQVNFX0RFRiA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe25nQmFzZURlZjogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG4vKipcbiAqIElmIGEgZGlyZWN0aXZlIGlzIGRpUHVibGljLCBibG9vbUFkZCBzZXRzIGEgcHJvcGVydHkgb24gdGhlIHR5cGUgd2l0aCB0aGlzIGNvbnN0YW50IGFzXG4gKiB0aGUga2V5IGFuZCB0aGUgZGlyZWN0aXZlJ3MgdW5pcXVlIElEIGFzIHRoZSB2YWx1ZS4gVGhpcyBhbGxvd3MgdXMgdG8gbWFwIGRpcmVjdGl2ZXMgdG8gdGhlaXJcbiAqIGJsb29tIGZpbHRlciBiaXQgZm9yIERJLlxuICovXG5leHBvcnQgY29uc3QgTkdfRUxFTUVOVF9JRCA9IGdldENsb3N1cmVTYWZlUHJvcGVydHkoe19fTkdfRUxFTUVOVF9JRF9fOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG4iXX0=