/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, InjectionToken } from '../di';
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
var /**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
ModuleWithComponentFactories = /** @class */ (function () {
    function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
    return ModuleWithComponentFactories;
}());
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @experimental
 */
export { ModuleWithComponentFactories };
function _throwError() {
    throw new Error("Runtime compiler is not loaded");
}
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 */
var Compiler = /** @class */ (function () {
    function Compiler() {
    }
    /**
     * Compiles the given NgModule and all of its components. All templates of the components listed
     * in `entryComponents` have to be inlined.
     */
    /**
       * Compiles the given NgModule and all of its components. All templates of the components listed
       * in `entryComponents` have to be inlined.
       */
    Compiler.prototype.compileModuleSync = /**
       * Compiles the given NgModule and all of its components. All templates of the components listed
       * in `entryComponents` have to be inlined.
       */
    function (moduleType) { throw _throwError(); };
    /**
     * Compiles the given NgModule and all of its components
     */
    /**
       * Compiles the given NgModule and all of its components
       */
    Compiler.prototype.compileModuleAsync = /**
       * Compiles the given NgModule and all of its components
       */
    function (moduleType) { throw _throwError(); };
    /**
     * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
     */
    /**
       * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
       */
    Compiler.prototype.compileModuleAndAllComponentsSync = /**
       * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
       */
    function (moduleType) {
        throw _throwError();
    };
    /**
     * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
     */
    /**
       * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
       */
    Compiler.prototype.compileModuleAndAllComponentsAsync = /**
       * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
       */
    function (moduleType) {
        throw _throwError();
    };
    /**
     * Clears all caches.
     */
    /**
       * Clears all caches.
       */
    Compiler.prototype.clearCache = /**
       * Clears all caches.
       */
    function () { };
    /**
     * Clears the cache for the given component/ngModule.
     */
    /**
       * Clears the cache for the given component/ngModule.
       */
    Compiler.prototype.clearCacheFor = /**
       * Clears the cache for the given component/ngModule.
       */
    function (type) { };
    Compiler.decorators = [
        { type: Injectable }
    ];
    return Compiler;
}());
export { Compiler };
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @experimental
 */
export var COMPILER_OPTIONS = new InjectionToken('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
var /**
 * A factory for creating a Compiler
 *
 * @experimental
 */
CompilerFactory = /** @class */ (function () {
    function CompilerFactory() {
    }
    return CompilerFactory;
}());
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export { CompilerFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsY0FBYyxFQUFpQixNQUFNLE9BQU8sQ0FBQzs7Ozs7O0FBY2pFOzs7OztBQUFBO0lBQ0Usc0NBQ1csZUFBbUMsRUFDbkMsa0JBQTJDO1FBRDNDLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXlCO0tBQUk7dUNBekI1RDtJQTBCQyxDQUFBOzs7Ozs7QUFKRCx3Q0FJQztBQUdEO0lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0NBQ25EOzs7Ozs7Ozs7Ozs7OztJQWNDOzs7T0FHRzs7Ozs7SUFDSCxvQ0FBaUI7Ozs7SUFBakIsVUFBcUIsVUFBbUIsSUFBd0IsTUFBTSxXQUFXLEVBQUUsQ0FBQyxFQUFFO0lBRXRGOztPQUVHOzs7O0lBQ0gscUNBQWtCOzs7SUFBbEIsVUFBc0IsVUFBbUIsSUFBaUMsTUFBTSxXQUFXLEVBQUUsQ0FBQyxFQUFFO0lBRWhHOztPQUVHOzs7O0lBQ0gsb0RBQWlDOzs7SUFBakMsVUFBcUMsVUFBbUI7UUFDdEQsTUFBTSxXQUFXLEVBQUUsQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7O0lBQ0gscURBQWtDOzs7SUFBbEMsVUFBc0MsVUFBbUI7UUFFdkQsTUFBTSxXQUFXLEVBQUUsQ0FBQztLQUNyQjtJQUVEOztPQUVHOzs7O0lBQ0gsNkJBQVU7OztJQUFWLGVBQXFCO0lBRXJCOztPQUVHOzs7O0lBQ0gsZ0NBQWE7OztJQUFiLFVBQWMsSUFBZSxLQUFJOztnQkFwQ2xDLFVBQVU7O21CQTNDWDs7U0E0Q2EsUUFBUTs7Ozs7O0FBd0RyQixNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7O0FBT3pGOzs7OztBQUFBOzs7MEJBM0dBO0lBNkdDLENBQUE7Ozs7OztBQUZELDJCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnLi4vZGknO1xuaW1wb3J0IHtNaXNzaW5nVHJhbnNsYXRpb25TdHJhdGVneX0gZnJvbSAnLi4vaTE4bi90b2tlbnMnO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi4vbWV0YWRhdGEnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcblxuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5fSBmcm9tICcuL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7TmdNb2R1bGVGYWN0b3J5fSBmcm9tICcuL25nX21vZHVsZV9mYWN0b3J5JztcblxuXG4vKipcbiAqIENvbWJpbmF0aW9uIG9mIE5nTW9kdWxlRmFjdG9yeSBhbmQgQ29tcG9uZW50RmFjdG9yeXMuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIG5nTW9kdWxlRmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PFQ+LFxuICAgICAgcHVibGljIGNvbXBvbmVudEZhY3RvcmllczogQ29tcG9uZW50RmFjdG9yeTxhbnk+W10pIHt9XG59XG5cblxuZnVuY3Rpb24gX3Rocm93RXJyb3IoKSB7XG4gIHRocm93IG5ldyBFcnJvcihgUnVudGltZSBjb21waWxlciBpcyBub3QgbG9hZGVkYCk7XG59XG5cbi8qKlxuICogTG93LWxldmVsIHNlcnZpY2UgZm9yIHJ1bm5pbmcgdGhlIGFuZ3VsYXIgY29tcGlsZXIgZHVyaW5nIHJ1bnRpbWVcbiAqIHRvIGNyZWF0ZSB7QGxpbmsgQ29tcG9uZW50RmFjdG9yeX1zLCB3aGljaFxuICogY2FuIGxhdGVyIGJlIHVzZWQgdG8gY3JlYXRlIGFuZCByZW5kZXIgYSBDb21wb25lbnQgaW5zdGFuY2UuXG4gKlxuICogRWFjaCBgQE5nTW9kdWxlYCBwcm92aWRlcyBhbiBvd24gYENvbXBpbGVyYCB0byBpdHMgaW5qZWN0b3IsXG4gKiB0aGF0IHdpbGwgdXNlIHRoZSBkaXJlY3RpdmVzL3BpcGVzIG9mIHRoZSBuZyBtb2R1bGUgZm9yIGNvbXBpbGF0aW9uXG4gKiBvZiBjb21wb25lbnRzLlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbXBpbGVyIHtcbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBnaXZlbiBOZ01vZHVsZSBhbmQgYWxsIG9mIGl0cyBjb21wb25lbnRzLiBBbGwgdGVtcGxhdGVzIG9mIHRoZSBjb21wb25lbnRzIGxpc3RlZFxuICAgKiBpbiBgZW50cnlDb21wb25lbnRzYCBoYXZlIHRvIGJlIGlubGluZWQuXG4gICAqL1xuICBjb21waWxlTW9kdWxlU3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogTmdNb2R1bGVGYWN0b3J5PFQ+IHsgdGhyb3cgX3Rocm93RXJyb3IoKTsgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlcyB0aGUgZ2l2ZW4gTmdNb2R1bGUgYW5kIGFsbCBvZiBpdHMgY29tcG9uZW50c1xuICAgKi9cbiAgY29tcGlsZU1vZHVsZUFzeW5jPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxUPj4geyB0aHJvdyBfdGhyb3dFcnJvcigpOyB9XG5cbiAgLyoqXG4gICAqIFNhbWUgYXMge0BsaW5rICNjb21waWxlTW9kdWxlU3luY30gYnV0IGFsc28gY3JlYXRlcyBDb21wb25lbnRGYWN0b3JpZXMgZm9yIGFsbCBjb21wb25lbnRzLlxuICAgKi9cbiAgY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOiBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzPFQ+IHtcbiAgICB0aHJvdyBfdGhyb3dFcnJvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhbWUgYXMge0BsaW5rICNjb21waWxlTW9kdWxlQXN5bmN9IGJ1dCBhbHNvIGNyZWF0ZXMgQ29tcG9uZW50RmFjdG9yaWVzIGZvciBhbGwgY29tcG9uZW50cy5cbiAgICovXG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzQXN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6XG4gICAgICBQcm9taXNlPE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8VD4+IHtcbiAgICB0aHJvdyBfdGhyb3dFcnJvcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVzLlxuICAgKi9cbiAgY2xlYXJDYWNoZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgY2FjaGUgZm9yIHRoZSBnaXZlbiBjb21wb25lbnQvbmdNb2R1bGUuXG4gICAqL1xuICBjbGVhckNhY2hlRm9yKHR5cGU6IFR5cGU8YW55Pikge31cbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIGNvbXBpbGVyXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgdHlwZSBDb21waWxlck9wdGlvbnMgPSB7XG4gIHVzZUppdD86IGJvb2xlYW4sXG4gIGRlZmF1bHRFbmNhcHN1bGF0aW9uPzogVmlld0VuY2Fwc3VsYXRpb24sXG4gIHByb3ZpZGVycz86IFN0YXRpY1Byb3ZpZGVyW10sXG4gIG1pc3NpbmdUcmFuc2xhdGlvbj86IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5LFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzPzogYm9vbGVhbixcbn07XG5cbi8qKlxuICogVG9rZW4gdG8gcHJvdmlkZSBDb21waWxlck9wdGlvbnMgaW4gdGhlIHBsYXRmb3JtIGluamVjdG9yLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IENPTVBJTEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Q29tcGlsZXJPcHRpb25zW10+KCdjb21waWxlck9wdGlvbnMnKTtcblxuLyoqXG4gKiBBIGZhY3RvcnkgZm9yIGNyZWF0aW5nIGEgQ29tcGlsZXJcbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21waWxlckZhY3Rvcnkge1xuICBhYnN0cmFjdCBjcmVhdGVDb21waWxlcihvcHRpb25zPzogQ29tcGlsZXJPcHRpb25zW10pOiBDb21waWxlcjtcbn1cbiJdfQ==