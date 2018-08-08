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
import { Compiler, Injectable } from '@angular/core';
/**
 * @return {?}
 */
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * \@experimental
 */
export class TestingCompiler extends Compiler {
    /**
     * @return {?}
     */
    get injector() { throw unimplemented(); }
    /**
     * @param {?} module
     * @param {?} overrides
     * @return {?}
     */
    overrideModule(module, overrides) {
        throw unimplemented();
    }
    /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    overrideDirective(directive, overrides) {
        throw unimplemented();
    }
    /**
     * @param {?} component
     * @param {?} overrides
     * @return {?}
     */
    overrideComponent(component, overrides) {
        throw unimplemented();
    }
    /**
     * @param {?} directive
     * @param {?} overrides
     * @return {?}
     */
    overridePipe(directive, overrides) {
        throw unimplemented();
    }
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     * @param {?} summaries
     * @return {?}
     */
    loadAotSummaries(summaries) { throw unimplemented(); }
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     * @template T
     * @param {?} component
     * @return {?}
     */
    getComponentFactory(component) { throw unimplemented(); }
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     * @param {?} error
     * @return {?}
     */
    getComponentFromError(error) { throw unimplemented(); }
}
TestingCompiler.decorators = [
    { type: Injectable }
];
/**
 * A factory for creating a Compiler
 *
 * \@experimental
 * @abstract
 */
export class TestingCompilerFactory {
}
if (false) {
    /**
     * @abstract
     * @param {?=} options
     * @return {?}
     */
    TestingCompilerFactory.prototype.createTestingCompiler = function (options) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdF9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQTJELFVBQVUsRUFBaUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFJNUk7SUFDRSxNQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztDQUM5Qjs7Ozs7O0FBUUQsTUFBTSxzQkFBdUIsU0FBUSxRQUFROzs7O0lBQzNDLElBQUksUUFBUSxLQUFlLE1BQU0sYUFBYSxFQUFFLENBQUMsRUFBRTs7Ozs7O0lBQ25ELGNBQWMsQ0FBQyxNQUFpQixFQUFFLFNBQXFDO1FBQ3JFLE1BQU0sYUFBYSxFQUFFLENBQUM7S0FDdkI7Ozs7OztJQUNELGlCQUFpQixDQUFDLFNBQW9CLEVBQUUsU0FBc0M7UUFDNUUsTUFBTSxhQUFhLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7O0lBQ0QsaUJBQWlCLENBQUMsU0FBb0IsRUFBRSxTQUFzQztRQUM1RSxNQUFNLGFBQWEsRUFBRSxDQUFDO0tBQ3ZCOzs7Ozs7SUFDRCxZQUFZLENBQUMsU0FBb0IsRUFBRSxTQUFpQztRQUNsRSxNQUFNLGFBQWEsRUFBRSxDQUFDO0tBQ3ZCOzs7Ozs7O0lBS0QsZ0JBQWdCLENBQUMsU0FBc0IsSUFBSSxNQUFNLGFBQWEsRUFBRSxDQUFDLEVBQUU7Ozs7Ozs7OztJQU9uRSxtQkFBbUIsQ0FBSSxTQUFrQixJQUF5QixNQUFNLGFBQWEsRUFBRSxDQUFDLEVBQUU7Ozs7Ozs7SUFNMUYscUJBQXFCLENBQUMsS0FBWSxJQUFvQixNQUFNLGFBQWEsRUFBRSxDQUFDLEVBQUU7OztZQWhDL0UsVUFBVTs7Ozs7Ozs7QUF3Q1gsTUFBTTtDQUVMIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVyLCBDb21waWxlck9wdGlvbnMsIENvbXBvbmVudCwgQ29tcG9uZW50RmFjdG9yeSwgRGlyZWN0aXZlLCBJbmplY3RhYmxlLCBJbmplY3RvciwgTmdNb2R1bGUsIFBpcGUsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge01ldGFkYXRhT3ZlcnJpZGV9IGZyb20gJy4vbWV0YWRhdGFfb3ZlcnJpZGUnO1xuXG5mdW5jdGlvbiB1bmltcGxlbWVudGVkKCk6IGFueSB7XG4gIHRocm93IEVycm9yKCd1bmltcGxlbWVudGVkJyk7XG59XG5cbi8qKlxuICogU3BlY2lhbCBpbnRlcmZhY2UgdG8gdGhlIGNvbXBpbGVyIG9ubHkgdXNlZCBieSB0ZXN0aW5nXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVzdGluZ0NvbXBpbGVyIGV4dGVuZHMgQ29tcGlsZXIge1xuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyB0aHJvdyB1bmltcGxlbWVudGVkKCk7IH1cbiAgb3ZlcnJpZGVNb2R1bGUobW9kdWxlOiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxOZ01vZHVsZT4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgb3ZlcnJpZGVEaXJlY3RpdmUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxEaXJlY3RpdmU+KTogdm9pZCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIG92ZXJyaWRlQ29tcG9uZW50KGNvbXBvbmVudDogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICBvdmVycmlkZVBpcGUoZGlyZWN0aXZlOiBUeXBlPGFueT4sIG92ZXJyaWRlczogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICAvKipcbiAgICogQWxsb3dzIHRvIHBhc3MgdGhlIGNvbXBpbGUgc3VtbWFyeSBmcm9tIEFPVCBjb21waWxhdGlvbiB0byB0aGUgSklUIGNvbXBpbGVyLFxuICAgKiBzbyB0aGF0IGl0IGNhbiB1c2UgdGhlIGNvZGUgZ2VuZXJhdGVkIGJ5IEFPVC5cbiAgICovXG4gIGxvYWRBb3RTdW1tYXJpZXMoc3VtbWFyaWVzOiAoKSA9PiBhbnlbXSkgeyB0aHJvdyB1bmltcGxlbWVudGVkKCk7IH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgY29tcG9uZW50IGZhY3RvcnkgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQuXG4gICAqIFRoaXMgYXNzdW1lcyB0aGF0IHRoZSBjb21wb25lbnQgaGFzIGJlZW4gY29tcGlsZWQgYmVmb3JlIGNhbGxpbmcgdGhpcyBjYWxsIHVzaW5nXG4gICAqIGBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50cypgLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50RmFjdG9yeTxUPihjb21wb25lbnQ6IFR5cGU8VD4pOiBDb21wb25lbnRGYWN0b3J5PFQ+IHsgdGhyb3cgdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCB0eXBlIHRoYXQgaXMgc3RvcmVkIGluIHRoZSBnaXZlbiBlcnJvci5cbiAgICogVGhpcyBjYW4gYmUgdXNlZCBmb3IgZXJyb3JzIGNyZWF0ZWQgYnkgY29tcGlsZU1vZHVsZS4uLlxuICAgKi9cbiAgZ2V0Q29tcG9uZW50RnJvbUVycm9yKGVycm9yOiBFcnJvcik6IFR5cGU8YW55PnxudWxsIHsgdGhyb3cgdW5pbXBsZW1lbnRlZCgpOyB9XG59XG5cbi8qKlxuICogQSBmYWN0b3J5IGZvciBjcmVhdGluZyBhIENvbXBpbGVyXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGVzdGluZ0NvbXBpbGVyRmFjdG9yeSB7XG4gIGFic3RyYWN0IGNyZWF0ZVRlc3RpbmdDb21waWxlcihvcHRpb25zPzogQ29tcGlsZXJPcHRpb25zW10pOiBUZXN0aW5nQ29tcGlsZXI7XG59XG4iXX0=