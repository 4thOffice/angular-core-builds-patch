/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from './global';
export function ngDevModeResetPerfCounters() {
    const locationString = typeof location !== 'undefined' ? location.toString() : '';
    const newCounters = {
        namedConstructors: locationString.indexOf('ngDevMode=namedConstructors') != -1,
        firstCreatePass: 0,
        tNode: 0,
        tView: 0,
        rendererCreateTextNode: 0,
        rendererSetText: 0,
        rendererCreateElement: 0,
        rendererAddEventListener: 0,
        rendererSetAttribute: 0,
        rendererRemoveAttribute: 0,
        rendererSetProperty: 0,
        rendererSetClassName: 0,
        rendererAddClass: 0,
        rendererRemoveClass: 0,
        rendererSetStyle: 0,
        rendererRemoveStyle: 0,
        rendererDestroy: 0,
        rendererDestroyNode: 0,
        rendererMoveNode: 0,
        rendererRemoveNode: 0,
        rendererAppendChild: 0,
        rendererInsertBefore: 0,
        rendererCreateComment: 0,
    };
    // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
    const allowNgDevModeTrue = locationString.indexOf('ngDevMode=false') === -1;
    global['ngDevMode'] = allowNgDevModeTrue && newCounters;
    return newCounters;
}
/**
 * This function checks to see if the `ngDevMode` has been set. If yes,
 * then we honor it, otherwise we default to dev mode with additional checks.
 *
 * The idea is that unless we are doing production build where we explicitly
 * set `ngDevMode == false` we should be helping the developer by providing
 * as much early warning and errors as possible.
 *
 * `ɵɵdefineComponent` is guaranteed to have been called before any component template functions
 * (and thus Ivy instructions), so a single initialization there is sufficient to ensure ngDevMode
 * is defined for the entire instruction set.
 *
 * When using checking `ngDevMode` on toplevel, always init it before referencing it
 * (e.g. `((typeof ngDevMode === 'undefined' || ngDevMode) && initNgDevMode())`), otherwise you can
 *  get a `ReferenceError` like in https://github.com/angular/angular/issues/31595.
 *
 * Details on possible values for `ngDevMode` can be found on its docstring.
 *
 * NOTE:
 * - changes to the `ngDevMode` name must be synced with `compiler-cli/src/tooling.ts`.
 */
export function initNgDevMode() {
    // The below checks are to ensure that calling `initNgDevMode` multiple times does not
    // reset the counters.
    // If the `ngDevMode` is not an object, then it means we have not created the perf counters
    // yet.
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        if (typeof ngDevMode !== 'object') {
            ngDevModeResetPerfCounters();
        }
        return !!ngDevMode;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZGV2X21vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy91dGlsL25nX2Rldl9tb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUE2Q2hDLE1BQU0sVUFBVSwwQkFBMEI7SUFDeEMsTUFBTSxjQUFjLEdBQUcsT0FBTyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRixNQUFNLFdBQVcsR0FBMEI7UUFDekMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RSxlQUFlLEVBQUUsQ0FBQztRQUNsQixLQUFLLEVBQUUsQ0FBQztRQUNSLEtBQUssRUFBRSxDQUFDO1FBQ1Isc0JBQXNCLEVBQUUsQ0FBQztRQUN6QixlQUFlLEVBQUUsQ0FBQztRQUNsQixxQkFBcUIsRUFBRSxDQUFDO1FBQ3hCLHdCQUF3QixFQUFFLENBQUM7UUFDM0Isb0JBQW9CLEVBQUUsQ0FBQztRQUN2Qix1QkFBdUIsRUFBRSxDQUFDO1FBQzFCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixtQkFBbUIsRUFBRSxDQUFDO1FBQ3RCLGVBQWUsRUFBRSxDQUFDO1FBQ2xCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixrQkFBa0IsRUFBRSxDQUFDO1FBQ3JCLG1CQUFtQixFQUFFLENBQUM7UUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2QixxQkFBcUIsRUFBRSxDQUFDO0tBQ3pCLENBQUM7SUFFRixnRUFBZ0U7SUFDaEUsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLGtCQUFrQixJQUFJLFdBQVcsQ0FBQztJQUN4RCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsTUFBTSxVQUFVLGFBQWE7SUFDM0Isc0ZBQXNGO0lBQ3RGLHNCQUFzQjtJQUN0QiwyRkFBMkY7SUFDM0YsT0FBTztJQUNQLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRTtRQUNqRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUNqQywwQkFBMEIsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dsb2JhbH0gZnJvbSAnLi9nbG9iYWwnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8qKlxuICAgKiBWYWx1ZXMgb2YgbmdEZXZNb2RlXG4gICAqIERlcGVuZGluZyBvbiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgYXBwbGljYXRpb24sIG5nRGV2TW9kZSBtYXkgaGF2ZSBvbmUgb2Ygc2V2ZXJhbCB2YWx1ZXMuXG4gICAqXG4gICAqIEZvciBjb252ZW5pZW5jZSwgdGhlIOKAnHRydXRoeeKAnSB2YWx1ZSB3aGljaCBlbmFibGVzIGRldiBtb2RlIGlzIGFsc28gYW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zXG4gICAqIEFuZ3VsYXLigJlzIHBlcmZvcm1hbmNlIGNvdW50ZXJzLiBUaGlzIGlzIG5vdCBuZWNlc3NhcnksIGJ1dCBjdXRzIGRvd24gb24gYm9pbGVycGxhdGUgZm9yIHRoZVxuICAgKiBwZXJmIGNvdW50ZXJzLlxuICAgKlxuICAgKiBuZ0Rldk1vZGUgbWF5IGFsc28gYmUgc2V0IHRvIGZhbHNlLiBUaGlzIGNhbiBoYXBwZW4gaW4gb25lIG9mIGEgZmV3IHdheXM6XG4gICAqIC0gVGhlIHVzZXIgZXhwbGljaXRseSBzZXRzIGB3aW5kb3cubmdEZXZNb2RlID0gZmFsc2VgIHNvbWV3aGVyZSBpbiB0aGVpciBhcHAuXG4gICAqIC0gVGhlIHVzZXIgY2FsbHMgYGVuYWJsZVByb2RNb2RlKClgLlxuICAgKiAtIFRoZSBVUkwgY29udGFpbnMgYSBgbmdEZXZNb2RlPWZhbHNlYCB0ZXh0LlxuICAgKiBGaW5hbGx5LCBuZ0Rldk1vZGUgbWF5IG5vdCBoYXZlIGJlZW4gZGVmaW5lZCBhdCBhbGwuXG4gICAqL1xuICBjb25zdCBuZ0Rldk1vZGU6IG51bGx8TmdEZXZNb2RlUGVyZkNvdW50ZXJzO1xuICBpbnRlcmZhY2UgTmdEZXZNb2RlUGVyZkNvdW50ZXJzIHtcbiAgICBuYW1lZENvbnN0cnVjdG9yczogYm9vbGVhbjtcbiAgICBmaXJzdENyZWF0ZVBhc3M6IG51bWJlcjtcbiAgICB0Tm9kZTogbnVtYmVyO1xuICAgIHRWaWV3OiBudW1iZXI7XG4gICAgcmVuZGVyZXJDcmVhdGVUZXh0Tm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0VGV4dDogbnVtYmVyO1xuICAgIHJlbmRlcmVyQ3JlYXRlRWxlbWVudDogbnVtYmVyO1xuICAgIHJlbmRlcmVyQWRkRXZlbnRMaXN0ZW5lcjogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0QXR0cmlidXRlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVBdHRyaWJ1dGU6IG51bWJlcjtcbiAgICByZW5kZXJlclNldFByb3BlcnR5OiBudW1iZXI7XG4gICAgcmVuZGVyZXJTZXRDbGFzc05hbWU6IG51bWJlcjtcbiAgICByZW5kZXJlckFkZENsYXNzOiBudW1iZXI7XG4gICAgcmVuZGVyZXJSZW1vdmVDbGFzczogbnVtYmVyO1xuICAgIHJlbmRlcmVyU2V0U3R5bGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZVN0eWxlOiBudW1iZXI7XG4gICAgcmVuZGVyZXJEZXN0cm95OiBudW1iZXI7XG4gICAgcmVuZGVyZXJEZXN0cm95Tm9kZTogbnVtYmVyO1xuICAgIHJlbmRlcmVyTW92ZU5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlclJlbW92ZU5vZGU6IG51bWJlcjtcbiAgICByZW5kZXJlckFwcGVuZENoaWxkOiBudW1iZXI7XG4gICAgcmVuZGVyZXJJbnNlcnRCZWZvcmU6IG51bWJlcjtcbiAgICByZW5kZXJlckNyZWF0ZUNvbW1lbnQ6IG51bWJlcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMoKTogTmdEZXZNb2RlUGVyZkNvdW50ZXJzIHtcbiAgY29uc3QgbG9jYXRpb25TdHJpbmcgPSB0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnID8gbG9jYXRpb24udG9TdHJpbmcoKSA6ICcnO1xuICBjb25zdCBuZXdDb3VudGVyczogTmdEZXZNb2RlUGVyZkNvdW50ZXJzID0ge1xuICAgIG5hbWVkQ29uc3RydWN0b3JzOiBsb2NhdGlvblN0cmluZy5pbmRleE9mKCduZ0Rldk1vZGU9bmFtZWRDb25zdHJ1Y3RvcnMnKSAhPSAtMSxcbiAgICBmaXJzdENyZWF0ZVBhc3M6IDAsXG4gICAgdE5vZGU6IDAsXG4gICAgdFZpZXc6IDAsXG4gICAgcmVuZGVyZXJDcmVhdGVUZXh0Tm9kZTogMCxcbiAgICByZW5kZXJlclNldFRleHQ6IDAsXG4gICAgcmVuZGVyZXJDcmVhdGVFbGVtZW50OiAwLFxuICAgIHJlbmRlcmVyQWRkRXZlbnRMaXN0ZW5lcjogMCxcbiAgICByZW5kZXJlclNldEF0dHJpYnV0ZTogMCxcbiAgICByZW5kZXJlclJlbW92ZUF0dHJpYnV0ZTogMCxcbiAgICByZW5kZXJlclNldFByb3BlcnR5OiAwLFxuICAgIHJlbmRlcmVyU2V0Q2xhc3NOYW1lOiAwLFxuICAgIHJlbmRlcmVyQWRkQ2xhc3M6IDAsXG4gICAgcmVuZGVyZXJSZW1vdmVDbGFzczogMCxcbiAgICByZW5kZXJlclNldFN0eWxlOiAwLFxuICAgIHJlbmRlcmVyUmVtb3ZlU3R5bGU6IDAsXG4gICAgcmVuZGVyZXJEZXN0cm95OiAwLFxuICAgIHJlbmRlcmVyRGVzdHJveU5vZGU6IDAsXG4gICAgcmVuZGVyZXJNb3ZlTm9kZTogMCxcbiAgICByZW5kZXJlclJlbW92ZU5vZGU6IDAsXG4gICAgcmVuZGVyZXJBcHBlbmRDaGlsZDogMCxcbiAgICByZW5kZXJlckluc2VydEJlZm9yZTogMCxcbiAgICByZW5kZXJlckNyZWF0ZUNvbW1lbnQ6IDAsXG4gIH07XG5cbiAgLy8gTWFrZSBzdXJlIHRvIHJlZmVyIHRvIG5nRGV2TW9kZSBhcyBbJ25nRGV2TW9kZSddIGZvciBjbG9zdXJlLlxuICBjb25zdCBhbGxvd05nRGV2TW9kZVRydWUgPSBsb2NhdGlvblN0cmluZy5pbmRleE9mKCduZ0Rldk1vZGU9ZmFsc2UnKSA9PT0gLTE7XG4gIGdsb2JhbFsnbmdEZXZNb2RlJ10gPSBhbGxvd05nRGV2TW9kZVRydWUgJiYgbmV3Q291bnRlcnM7XG4gIHJldHVybiBuZXdDb3VudGVycztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB0byBzZWUgaWYgdGhlIGBuZ0Rldk1vZGVgIGhhcyBiZWVuIHNldC4gSWYgeWVzLFxuICogdGhlbiB3ZSBob25vciBpdCwgb3RoZXJ3aXNlIHdlIGRlZmF1bHQgdG8gZGV2IG1vZGUgd2l0aCBhZGRpdGlvbmFsIGNoZWNrcy5cbiAqXG4gKiBUaGUgaWRlYSBpcyB0aGF0IHVubGVzcyB3ZSBhcmUgZG9pbmcgcHJvZHVjdGlvbiBidWlsZCB3aGVyZSB3ZSBleHBsaWNpdGx5XG4gKiBzZXQgYG5nRGV2TW9kZSA9PSBmYWxzZWAgd2Ugc2hvdWxkIGJlIGhlbHBpbmcgdGhlIGRldmVsb3BlciBieSBwcm92aWRpbmdcbiAqIGFzIG11Y2ggZWFybHkgd2FybmluZyBhbmQgZXJyb3JzIGFzIHBvc3NpYmxlLlxuICpcbiAqIGDJtcm1ZGVmaW5lQ29tcG9uZW50YCBpcyBndWFyYW50ZWVkIHRvIGhhdmUgYmVlbiBjYWxsZWQgYmVmb3JlIGFueSBjb21wb25lbnQgdGVtcGxhdGUgZnVuY3Rpb25zXG4gKiAoYW5kIHRodXMgSXZ5IGluc3RydWN0aW9ucyksIHNvIGEgc2luZ2xlIGluaXRpYWxpemF0aW9uIHRoZXJlIGlzIHN1ZmZpY2llbnQgdG8gZW5zdXJlIG5nRGV2TW9kZVxuICogaXMgZGVmaW5lZCBmb3IgdGhlIGVudGlyZSBpbnN0cnVjdGlvbiBzZXQuXG4gKlxuICogV2hlbiB1c2luZyBjaGVja2luZyBgbmdEZXZNb2RlYCBvbiB0b3BsZXZlbCwgYWx3YXlzIGluaXQgaXQgYmVmb3JlIHJlZmVyZW5jaW5nIGl0XG4gKiAoZS5nLiBgKCh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpICYmIGluaXROZ0Rldk1vZGUoKSlgKSwgb3RoZXJ3aXNlIHlvdSBjYW5cbiAqICBnZXQgYSBgUmVmZXJlbmNlRXJyb3JgIGxpa2UgaW4gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzE1OTUuXG4gKlxuICogRGV0YWlscyBvbiBwb3NzaWJsZSB2YWx1ZXMgZm9yIGBuZ0Rldk1vZGVgIGNhbiBiZSBmb3VuZCBvbiBpdHMgZG9jc3RyaW5nLlxuICpcbiAqIE5PVEU6XG4gKiAtIGNoYW5nZXMgdG8gdGhlIGBuZ0Rldk1vZGVgIG5hbWUgbXVzdCBiZSBzeW5jZWQgd2l0aCBgY29tcGlsZXItY2xpL3NyYy90b29saW5nLnRzYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXROZ0Rldk1vZGUoKTogYm9vbGVhbiB7XG4gIC8vIFRoZSBiZWxvdyBjaGVja3MgYXJlIHRvIGVuc3VyZSB0aGF0IGNhbGxpbmcgYGluaXROZ0Rldk1vZGVgIG11bHRpcGxlIHRpbWVzIGRvZXMgbm90XG4gIC8vIHJlc2V0IHRoZSBjb3VudGVycy5cbiAgLy8gSWYgdGhlIGBuZ0Rldk1vZGVgIGlzIG5vdCBhbiBvYmplY3QsIHRoZW4gaXQgbWVhbnMgd2UgaGF2ZSBub3QgY3JlYXRlZCB0aGUgcGVyZiBjb3VudGVyc1xuICAvLyB5ZXQuXG4gIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzKCk7XG4gICAgfVxuICAgIHJldHVybiAhIW5nRGV2TW9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=