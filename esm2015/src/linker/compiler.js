/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '../di/injectable';
import { InjectionToken } from '../di/injection_token';
import { ComponentFactory as ComponentFactoryR3 } from '../render3/component_ref';
import { getComponentDef, getNgModuleDef } from '../render3/definition';
import { NgModuleFactory as NgModuleFactoryR3 } from '../render3/ng_module_ref';
import { maybeUnwrapFn } from '../render3/util/misc_utils';
import * as i0 from "../r3_symbols";
/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * @publicApi
 */
export class ModuleWithComponentFactories {
    constructor(ngModuleFactory, componentFactories) {
        this.ngModuleFactory = ngModuleFactory;
        this.componentFactories = componentFactories;
    }
}
function _throwError() {
    throw new Error(`Runtime compiler is not loaded`);
}
const Compiler_compileModuleSync__PRE_R3__ = _throwError;
export const Compiler_compileModuleSync__POST_R3__ = function (moduleType) {
    return new NgModuleFactoryR3(moduleType);
};
const Compiler_compileModuleSync = Compiler_compileModuleSync__POST_R3__;
const Compiler_compileModuleAsync__PRE_R3__ = _throwError;
export const Compiler_compileModuleAsync__POST_R3__ = function (moduleType) {
    return Promise.resolve(Compiler_compileModuleSync__POST_R3__(moduleType));
};
const Compiler_compileModuleAsync = Compiler_compileModuleAsync__POST_R3__;
const Compiler_compileModuleAndAllComponentsSync__PRE_R3__ = _throwError;
export const Compiler_compileModuleAndAllComponentsSync__POST_R3__ = function (moduleType) {
    const ngModuleFactory = Compiler_compileModuleSync__POST_R3__(moduleType);
    const moduleDef = getNgModuleDef(moduleType);
    const componentFactories = maybeUnwrapFn(moduleDef.declarations)
        .reduce((factories, declaration) => {
        const componentDef = getComponentDef(declaration);
        componentDef && factories.push(new ComponentFactoryR3(componentDef));
        return factories;
    }, []);
    return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
};
const Compiler_compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync__POST_R3__;
const Compiler_compileModuleAndAllComponentsAsync__PRE_R3__ = _throwError;
export const Compiler_compileModuleAndAllComponentsAsync__POST_R3__ = function (moduleType) {
    return Promise.resolve(Compiler_compileModuleAndAllComponentsSync__POST_R3__(moduleType));
};
const Compiler_compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync__POST_R3__;
/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * @publicApi
 */
export class Compiler {
    constructor() {
        /**
         * Compiles the given NgModule and all of its components. All templates of the components listed
         * in `entryComponents` have to be inlined.
         */
        this.compileModuleSync = Compiler_compileModuleSync;
        /**
         * Compiles the given NgModule and all of its components
         */
        this.compileModuleAsync = Compiler_compileModuleAsync;
        /**
         * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
         */
        this.compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync;
        /**
         * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
         */
        this.compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync;
    }
    /**
     * Clears all caches.
     */
    clearCache() { }
    /**
     * Clears the cache for the given component/ngModule.
     */
    clearCacheFor(type) { }
    /**
     * Returns the id for a given NgModule, if one is defined and known to the compiler.
     */
    getModuleId(moduleType) {
        return undefined;
    }
}
Compiler.ɵfac = function Compiler_Factory(t) { return new (t || Compiler)(); };
Compiler.ɵprov = i0.ɵɵdefineInjectable({ token: Compiler, factory: Compiler.ɵfac });
/*@__PURE__*/ (function () { i0.setClassMetadata(Compiler, [{
        type: Injectable
    }], null, null); })();
/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * @publicApi
 */
export const COMPILER_OPTIONS = new InjectionToken('compilerOptions');
/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
export class CompilerFactory {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUtyRCxPQUFPLEVBQUMsZ0JBQWdCLElBQUksa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRixPQUFPLEVBQUMsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxlQUFlLElBQUksaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7O0FBT3pEOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLFlBQ1csZUFBbUMsRUFDbkMsa0JBQTJDO1FBRDNDLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUNuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXlCO0lBQUcsQ0FBQztDQUMzRDtBQUdELFNBQVMsV0FBVztJQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUVELE1BQU0sb0NBQW9DLEdBQ3RDLFdBQWtCLENBQUM7QUFDdkIsTUFBTSxDQUFDLE1BQU0scUNBQXFDLEdBQ3pCLFVBQVksVUFBbUI7SUFDdEQsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQUNGLE1BQU0sMEJBQTBCLEdBSm5CLHFDQUkwRCxDQUFDO0FBRXhFLE1BQU0scUNBQXFDLEdBQ1QsV0FBa0IsQ0FBQztBQUNyRCxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FDakIsVUFBWSxVQUFtQjtJQUMvRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMscUNBQXFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDLENBQUM7QUFDRixNQUFNLDJCQUEyQixHQUpwQixzQ0FJNEQsQ0FBQztBQUUxRSxNQUFNLG9EQUFvRCxHQUNwQixXQUFrQixDQUFDO0FBQ3pELE1BQU0sQ0FBQyxNQUFNLHFEQUFxRCxHQUM1QixVQUFZLFVBQW1CO0lBRW5FLE1BQU0sZUFBZSxHQUFHLHFDQUFxQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUUsQ0FBQztJQUM5QyxNQUFNLGtCQUFrQixHQUNwQixhQUFhLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztTQUNoQyxNQUFNLENBQUMsQ0FBQyxTQUFrQyxFQUFFLFdBQXNCLEVBQUUsRUFBRTtRQUNyRSxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEQsWUFBWSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUMsRUFBRSxFQUE2QixDQUFDLENBQUM7SUFDMUMsT0FBTyxJQUFJLDRCQUE0QixDQUFDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQy9FLENBQUMsQ0FBQztBQUNGLE1BQU0sMENBQTBDLEdBZG5DLHFEQWUyQyxDQUFDO0FBRXpELE1BQU0scURBQXFELEdBQ1osV0FBa0IsQ0FBQztBQUNsRSxNQUFNLENBQUMsTUFBTSxzREFBc0QsR0FDcEIsVUFBWSxVQUFtQjtJQUU1RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMscURBQXFELENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUM1RixDQUFDLENBQUM7QUFDRixNQUFNLDJDQUEyQyxHQUxwQyxzREFNNEMsQ0FBQztBQUUxRDs7Ozs7Ozs7OztHQVVHO0FBRUgsTUFBTSxPQUFPLFFBQVE7SUFEckI7UUFFRTs7O1dBR0c7UUFDSCxzQkFBaUIsR0FBbUQsMEJBQTBCLENBQUM7UUFFL0Y7O1dBRUc7UUFDSCx1QkFBa0IsR0FDNEMsMkJBQTJCLENBQUM7UUFFMUY7O1dBRUc7UUFDSCxzQ0FBaUMsR0FDN0IsMENBQTBDLENBQUM7UUFFL0M7O1dBRUc7UUFDSCx1Q0FBa0MsR0FDYSwyQ0FBMkMsQ0FBQztLQWtCNUY7SUFoQkM7O09BRUc7SUFDSCxVQUFVLEtBQVUsQ0FBQztJQUVyQjs7T0FFRztJQUNILGFBQWEsQ0FBQyxJQUFlLElBQUcsQ0FBQztJQUVqQzs7T0FFRztJQUNILFdBQVcsQ0FBQyxVQUFxQjtRQUMvQixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDOztnRUF4Q1UsUUFBUTtnREFBUixRQUFRLFdBQVIsUUFBUTtpREFBUixRQUFRO2NBRHBCLFVBQVU7O0FBeURYOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBb0IsaUJBQWlCLENBQUMsQ0FBQztBQUV6Rjs7OztHQUlHO0FBQ0gsTUFBTSxPQUFnQixlQUFlO0NBRXBDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnLi4vZGkvaW5qZWN0YWJsZSc7XG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtTdGF0aWNQcm92aWRlcn0gZnJvbSAnLi4vZGkvaW50ZXJmYWNlL3Byb3ZpZGVyJztcbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3l9IGZyb20gJy4uL2kxOG4vdG9rZW5zJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi4vbWV0YWRhdGEvdmlldyc7XG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnkgYXMgQ29tcG9uZW50RmFjdG9yeVIzfSBmcm9tICcuLi9yZW5kZXIzL2NvbXBvbmVudF9yZWYnO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWYsIGdldE5nTW9kdWxlRGVmfSBmcm9tICcuLi9yZW5kZXIzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtOZ01vZHVsZUZhY3RvcnkgYXMgTmdNb2R1bGVGYWN0b3J5UjN9IGZyb20gJy4uL3JlbmRlcjMvbmdfbW9kdWxlX3JlZic7XG5pbXBvcnQge21heWJlVW53cmFwRm59IGZyb20gJy4uL3JlbmRlcjMvdXRpbC9taXNjX3V0aWxzJztcblxuaW1wb3J0IHtDb21wb25lbnRGYWN0b3J5fSBmcm9tICcuL2NvbXBvbmVudF9mYWN0b3J5JztcbmltcG9ydCB7TmdNb2R1bGVGYWN0b3J5fSBmcm9tICcuL25nX21vZHVsZV9mYWN0b3J5JztcblxuXG5cbi8qKlxuICogQ29tYmluYXRpb24gb2YgTmdNb2R1bGVGYWN0b3J5IGFuZCBDb21wb25lbnRGYWN0b3J5cy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzPFQ+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgbmdNb2R1bGVGYWN0b3J5OiBOZ01vZHVsZUZhY3Rvcnk8VD4sXG4gICAgICBwdWJsaWMgY29tcG9uZW50RmFjdG9yaWVzOiBDb21wb25lbnRGYWN0b3J5PGFueT5bXSkge31cbn1cblxuXG5mdW5jdGlvbiBfdGhyb3dFcnJvcigpIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBSdW50aW1lIGNvbXBpbGVyIGlzIG5vdCBsb2FkZWRgKTtcbn1cblxuY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZVN5bmNfX1BSRV9SM19fOiA8VD4obW9kdWxlVHlwZTogVHlwZTxUPikgPT4gTmdNb2R1bGVGYWN0b3J5PFQ+ID1cbiAgICBfdGhyb3dFcnJvciBhcyBhbnk7XG5leHBvcnQgY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZVN5bmNfX1BPU1RfUjNfXzogPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pID0+XG4gICAgTmdNb2R1bGVGYWN0b3J5PFQ+ID0gZnVuY3Rpb248VD4obW9kdWxlVHlwZTogVHlwZTxUPik6IE5nTW9kdWxlRmFjdG9yeTxUPiB7XG4gIHJldHVybiBuZXcgTmdNb2R1bGVGYWN0b3J5UjMobW9kdWxlVHlwZSk7XG59O1xuY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZVN5bmMgPSBDb21waWxlcl9jb21waWxlTW9kdWxlU3luY19fUFJFX1IzX187XG5cbmNvbnN0IENvbXBpbGVyX2NvbXBpbGVNb2R1bGVBc3luY19fUFJFX1IzX186IDxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KSA9PlxuICAgIFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PFQ+PiA9IF90aHJvd0Vycm9yIGFzIGFueTtcbmV4cG9ydCBjb25zdCBDb21waWxlcl9jb21waWxlTW9kdWxlQXN5bmNfX1BPU1RfUjNfXzogPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pID0+XG4gICAgUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8VD4+ID0gZnVuY3Rpb248VD4obW9kdWxlVHlwZTogVHlwZTxUPik6IFByb21pc2U8TmdNb2R1bGVGYWN0b3J5PFQ+PiB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoQ29tcGlsZXJfY29tcGlsZU1vZHVsZVN5bmNfX1BPU1RfUjNfXyhtb2R1bGVUeXBlKSk7XG59O1xuY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFzeW5jID0gQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFzeW5jX19QUkVfUjNfXztcblxuY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jX19QUkVfUjNfXzogPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pID0+XG4gICAgTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPiA9IF90aHJvd0Vycm9yIGFzIGFueTtcbmV4cG9ydCBjb25zdCBDb21waWxlcl9jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c1N5bmNfX1BPU1RfUjNfXzogPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pID0+XG4gICAgTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPiA9IGZ1bmN0aW9uPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOlxuICAgICAgICBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzPFQ+IHtcbiAgY29uc3QgbmdNb2R1bGVGYWN0b3J5ID0gQ29tcGlsZXJfY29tcGlsZU1vZHVsZVN5bmNfX1BPU1RfUjNfXyhtb2R1bGVUeXBlKTtcbiAgY29uc3QgbW9kdWxlRGVmID0gZ2V0TmdNb2R1bGVEZWYobW9kdWxlVHlwZSkhO1xuICBjb25zdCBjb21wb25lbnRGYWN0b3JpZXMgPVxuICAgICAgbWF5YmVVbndyYXBGbihtb2R1bGVEZWYuZGVjbGFyYXRpb25zKVxuICAgICAgICAgIC5yZWR1Y2UoKGZhY3RvcmllczogQ29tcG9uZW50RmFjdG9yeTxhbnk+W10sIGRlY2xhcmF0aW9uOiBUeXBlPGFueT4pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IGdldENvbXBvbmVudERlZihkZWNsYXJhdGlvbik7XG4gICAgICAgICAgICBjb21wb25lbnREZWYgJiYgZmFjdG9yaWVzLnB1c2gobmV3IENvbXBvbmVudEZhY3RvcnlSMyhjb21wb25lbnREZWYpKTtcbiAgICAgICAgICAgIHJldHVybiBmYWN0b3JpZXM7XG4gICAgICAgICAgfSwgW10gYXMgQ29tcG9uZW50RmFjdG9yeTxhbnk+W10pO1xuICByZXR1cm4gbmV3IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMobmdNb2R1bGVGYWN0b3J5LCBjb21wb25lbnRGYWN0b3JpZXMpO1xufTtcbmNvbnN0IENvbXBpbGVyX2NvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYyA9XG4gICAgQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jX19QUkVfUjNfXztcblxuY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luY19fUFJFX1IzX186IDxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KSA9PlxuICAgIFByb21pc2U8TW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPj4gPSBfdGhyb3dFcnJvciBhcyBhbnk7XG5leHBvcnQgY29uc3QgQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luY19fUE9TVF9SM19fOiA8VD4obW9kdWxlVHlwZTogVHlwZTxUPikgPT5cbiAgICBQcm9taXNlPE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8VD4+ID0gZnVuY3Rpb248VD4obW9kdWxlVHlwZTogVHlwZTxUPik6XG4gICAgICAgIFByb21pc2U8TW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPj4ge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKENvbXBpbGVyX2NvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luY19fUE9TVF9SM19fKG1vZHVsZVR5cGUpKTtcbn07XG5jb25zdCBDb21waWxlcl9jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c0FzeW5jID1cbiAgICBDb21waWxlcl9jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c0FzeW5jX19QUkVfUjNfXztcblxuLyoqXG4gKiBMb3ctbGV2ZWwgc2VydmljZSBmb3IgcnVubmluZyB0aGUgYW5ndWxhciBjb21waWxlciBkdXJpbmcgcnVudGltZVxuICogdG8gY3JlYXRlIHtAbGluayBDb21wb25lbnRGYWN0b3J5fXMsIHdoaWNoXG4gKiBjYW4gbGF0ZXIgYmUgdXNlZCB0byBjcmVhdGUgYW5kIHJlbmRlciBhIENvbXBvbmVudCBpbnN0YW5jZS5cbiAqXG4gKiBFYWNoIGBATmdNb2R1bGVgIHByb3ZpZGVzIGFuIG93biBgQ29tcGlsZXJgIHRvIGl0cyBpbmplY3RvcixcbiAqIHRoYXQgd2lsbCB1c2UgdGhlIGRpcmVjdGl2ZXMvcGlwZXMgb2YgdGhlIG5nIG1vZHVsZSBmb3IgY29tcGlsYXRpb25cbiAqIG9mIGNvbXBvbmVudHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tcGlsZXIge1xuICAvKipcbiAgICogQ29tcGlsZXMgdGhlIGdpdmVuIE5nTW9kdWxlIGFuZCBhbGwgb2YgaXRzIGNvbXBvbmVudHMuIEFsbCB0ZW1wbGF0ZXMgb2YgdGhlIGNvbXBvbmVudHMgbGlzdGVkXG4gICAqIGluIGBlbnRyeUNvbXBvbmVudHNgIGhhdmUgdG8gYmUgaW5saW5lZC5cbiAgICovXG4gIGNvbXBpbGVNb2R1bGVTeW5jOiA8VD4obW9kdWxlVHlwZTogVHlwZTxUPikgPT4gTmdNb2R1bGVGYWN0b3J5PFQ+ID0gQ29tcGlsZXJfY29tcGlsZU1vZHVsZVN5bmM7XG5cbiAgLyoqXG4gICAqIENvbXBpbGVzIHRoZSBnaXZlbiBOZ01vZHVsZSBhbmQgYWxsIG9mIGl0cyBjb21wb25lbnRzXG4gICAqL1xuICBjb21waWxlTW9kdWxlQXN5bmM6XG4gICAgICA8VD4obW9kdWxlVHlwZTogVHlwZTxUPikgPT4gUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8VD4+ID0gQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFzeW5jO1xuXG4gIC8qKlxuICAgKiBTYW1lIGFzIHtAbGluayAjY29tcGlsZU1vZHVsZVN5bmN9IGJ1dCBhbHNvIGNyZWF0ZXMgQ29tcG9uZW50RmFjdG9yaWVzIGZvciBhbGwgY29tcG9uZW50cy5cbiAgICovXG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYzogPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pID0+IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8VD4gPVxuICAgICAgQ29tcGlsZXJfY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNTeW5jO1xuXG4gIC8qKlxuICAgKiBTYW1lIGFzIHtAbGluayAjY29tcGlsZU1vZHVsZUFzeW5jfSBidXQgYWxzbyBjcmVhdGVzIENvbXBvbmVudEZhY3RvcmllcyBmb3IgYWxsIGNvbXBvbmVudHMuXG4gICAqL1xuICBjb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c0FzeW5jOiA8VD4obW9kdWxlVHlwZTogVHlwZTxUPikgPT5cbiAgICAgIFByb21pc2U8TW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPj4gPSBDb21waWxlcl9jb21waWxlTW9kdWxlQW5kQWxsQ29tcG9uZW50c0FzeW5jO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlcy5cbiAgICovXG4gIGNsZWFyQ2FjaGUoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhY2hlIGZvciB0aGUgZ2l2ZW4gY29tcG9uZW50L25nTW9kdWxlLlxuICAgKi9cbiAgY2xlYXJDYWNoZUZvcih0eXBlOiBUeXBlPGFueT4pIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGlkIGZvciBhIGdpdmVuIE5nTW9kdWxlLCBpZiBvbmUgaXMgZGVmaW5lZCBhbmQga25vd24gdG8gdGhlIGNvbXBpbGVyLlxuICAgKi9cbiAgZ2V0TW9kdWxlSWQobW9kdWxlVHlwZTogVHlwZTxhbnk+KTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgY29tcGlsZXJcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBpbGVyT3B0aW9ucyA9IHtcbiAgdXNlSml0PzogYm9vbGVhbixcbiAgZGVmYXVsdEVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgcHJvdmlkZXJzPzogU3RhdGljUHJvdmlkZXJbXSxcbiAgbWlzc2luZ1RyYW5zbGF0aW9uPzogTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3ksXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuLFxufTtcblxuLyoqXG4gKiBUb2tlbiB0byBwcm92aWRlIENvbXBpbGVyT3B0aW9ucyBpbiB0aGUgcGxhdGZvcm0gaW5qZWN0b3IuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQ09NUElMRVJfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb21waWxlck9wdGlvbnNbXT4oJ2NvbXBpbGVyT3B0aW9ucycpO1xuXG4vKipcbiAqIEEgZmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBDb21waWxlclxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBpbGVyRmFjdG9yeSB7XG4gIGFic3RyYWN0IGNyZWF0ZUNvbXBpbGVyKG9wdGlvbnM/OiBDb21waWxlck9wdGlvbnNbXSk6IENvbXBpbGVyO1xufVxuIl19