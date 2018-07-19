import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler, Injectable } from '@angular/core';
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * @experimental
 */
export class TestingCompiler extends Compiler {
    get injector() { throw unimplemented(); }
    overrideModule(module, overrides) {
        throw unimplemented();
    }
    overrideDirective(directive, overrides) {
        throw unimplemented();
    }
    overrideComponent(component, overrides) {
        throw unimplemented();
    }
    overridePipe(directive, overrides) {
        throw unimplemented();
    }
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    loadAotSummaries(summaries) { throw unimplemented(); }
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    getComponentFactory(component) { throw unimplemented(); }
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    getComponentFromError(error) { throw unimplemented(); }
}
TestingCompiler.ngInjectableDef = i0.defineInjectable({ token: TestingCompiler, factory: function TestingCompiler_Factory() { return new TestingCompiler(); }, providedIn: null });
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export class TestingCompilerFactory {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdF9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBMkQsVUFBVSxFQUFpQyxNQUFNLGVBQWUsQ0FBQztBQUk1STtJQUNFLE1BQU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFFRDs7OztHQUlHO0FBRUgsTUFBTSxzQkFBdUIsU0FBUSxRQUFRO0lBQzNDLElBQUksUUFBUSxLQUFlLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25ELGNBQWMsQ0FBQyxNQUFpQixFQUFFLFNBQXFDO1FBQ3JFLE1BQU0sYUFBYSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELGlCQUFpQixDQUFDLFNBQW9CLEVBQUUsU0FBc0M7UUFDNUUsTUFBTSxhQUFhLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsU0FBb0IsRUFBRSxTQUFzQztRQUM1RSxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxZQUFZLENBQUMsU0FBb0IsRUFBRSxTQUFpQztRQUNsRSxNQUFNLGFBQWEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxTQUFzQixJQUFJLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRW5FOzs7O09BSUc7SUFDSCxtQkFBbUIsQ0FBSSxTQUFrQixJQUF5QixNQUFNLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUxRjs7O09BR0c7SUFDSCxxQkFBcUIsQ0FBQyxLQUFZLElBQW9CLE1BQU0sYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzsrREEvQm5FLGVBQWUsMkRBQWYsZUFBZTtBQWtDNUI7Ozs7R0FJRztBQUNILE1BQU07Q0FFTCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21waWxlciwgQ29tcGlsZXJPcHRpb25zLCBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnksIERpcmVjdGl2ZSwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIE5nTW9kdWxlLCBQaXBlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtNZXRhZGF0YU92ZXJyaWRlfSBmcm9tICcuL21ldGFkYXRhX292ZXJyaWRlJztcblxuZnVuY3Rpb24gdW5pbXBsZW1lbnRlZCgpOiBhbnkge1xuICB0aHJvdyBFcnJvcigndW5pbXBsZW1lbnRlZCcpO1xufVxuXG4vKipcbiAqIFNwZWNpYWwgaW50ZXJmYWNlIHRvIHRoZSBjb21waWxlciBvbmx5IHVzZWQgYnkgdGVzdGluZ1xuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlc3RpbmdDb21waWxlciBleHRlbmRzIENvbXBpbGVyIHtcbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgdGhyb3cgdW5pbXBsZW1lbnRlZCgpOyB9XG4gIG92ZXJyaWRlTW9kdWxlKG1vZHVsZTogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZCB7XG4gICAgdGhyb3cgdW5pbXBsZW1lbnRlZCgpO1xuICB9XG4gIG92ZXJyaWRlRGlyZWN0aXZlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8RGlyZWN0aXZlPik6IHZvaWQge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWQoKTtcbiAgfVxuICBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGVzOiBNZXRhZGF0YU92ZXJyaWRlPENvbXBvbmVudD4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgb3ZlcnJpZGVQaXBlKGRpcmVjdGl2ZTogVHlwZTxhbnk+LCBvdmVycmlkZXM6IE1ldGFkYXRhT3ZlcnJpZGU8UGlwZT4pOiB2b2lkIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkKCk7XG4gIH1cbiAgLyoqXG4gICAqIEFsbG93cyB0byBwYXNzIHRoZSBjb21waWxlIHN1bW1hcnkgZnJvbSBBT1QgY29tcGlsYXRpb24gdG8gdGhlIEpJVCBjb21waWxlcixcbiAgICogc28gdGhhdCBpdCBjYW4gdXNlIHRoZSBjb2RlIGdlbmVyYXRlZCBieSBBT1QuXG4gICAqL1xuICBsb2FkQW90U3VtbWFyaWVzKHN1bW1hcmllczogKCkgPT4gYW55W10pIHsgdGhyb3cgdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvbXBvbmVudCBmYWN0b3J5IGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50LlxuICAgKiBUaGlzIGFzc3VtZXMgdGhhdCB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGNvbXBpbGVkIGJlZm9yZSBjYWxsaW5nIHRoaXMgY2FsbCB1c2luZ1xuICAgKiBgY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHMqYC5cbiAgICovXG4gIGdldENvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50RmFjdG9yeTxUPiB7IHRocm93IHVuaW1wbGVtZW50ZWQoKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgdHlwZSB0aGF0IGlzIHN0b3JlZCBpbiB0aGUgZ2l2ZW4gZXJyb3IuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgZm9yIGVycm9ycyBjcmVhdGVkIGJ5IGNvbXBpbGVNb2R1bGUuLi5cbiAgICovXG4gIGdldENvbXBvbmVudEZyb21FcnJvcihlcnJvcjogRXJyb3IpOiBUeXBlPGFueT58bnVsbCB7IHRocm93IHVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBDb21waWxlclxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRlc3RpbmdDb21waWxlckZhY3Rvcnkge1xuICBhYnN0cmFjdCBjcmVhdGVUZXN0aW5nQ29tcGlsZXIob3B0aW9ucz86IENvbXBpbGVyT3B0aW9uc1tdKTogVGVzdGluZ0NvbXBpbGVyO1xufVxuIl19