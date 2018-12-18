/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defineInjector } from '../di/defs';
import { convertInjectableProviderToFactory } from '../di/util';
import { compileNgModule as render3CompileNgModule } from '../render3/jit/module';
import { makeDecorator } from '../util/decorators';
/**
 * Represents the expansion of an `NgModule` into its scopes.
 *
 * A scope is a set of directives and pipes that are visible in a particular context. Each
 * `NgModule` has two scopes. The `compilation` scope is the set of directives and pipes that will
 * be recognized in the templates of components declared by the module. The `exported` scope is the
 * set of directives and pipes exported by a module (that is, module B's exported scope gets added
 * to module A's compilation scope when module A imports B).
 * @record
 */
export function NgModuleTransitiveScopes() { }
if (false) {
    /** @type {?} */
    NgModuleTransitiveScopes.prototype.compilation;
    /** @type {?} */
    NgModuleTransitiveScopes.prototype.exported;
}
/**
 * Runtime link information for NgModules.
 *
 * This is the internal data structure used by the runtime to assemble components, directives,
 * pipes, and injectors.
 *
 * NOTE: Always use `defineNgModule` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 * @record
 * @template T
 */
export function NgModuleDef() { }
if (false) {
    /**
     * Token representing the module. Used by DI.
     * @type {?}
     */
    NgModuleDef.prototype.type;
    /**
     * List of components to bootstrap.
     * @type {?}
     */
    NgModuleDef.prototype.bootstrap;
    /**
     * List of components, directives, and pipes declared by this module.
     * @type {?}
     */
    NgModuleDef.prototype.declarations;
    /**
     * List of modules or `ModuleWithProviders` imported by this module.
     * @type {?}
     */
    NgModuleDef.prototype.imports;
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     * @type {?}
     */
    NgModuleDef.prototype.exports;
    /**
     * Cached value of computed `transitiveCompileScopes` for this module.
     *
     * This should never be read directly, but accessed via `transitiveScopesFor`.
     * @type {?}
     */
    NgModuleDef.prototype.transitiveCompileScopes;
}
/**
 * A wrapper around an NgModule that associates it with the providers.
 *
 * @param T the module type. In Ivy applications, this must be explicitly
 * provided.
 *
 * \@publicApi
 * @record
 * @template T
 */
export function ModuleWithProviders() { }
if (false) {
    /** @type {?} */
    ModuleWithProviders.prototype.ngModule;
    /** @type {?|undefined} */
    ModuleWithProviders.prototype.providers;
}
/**
 * A schema definition associated with an NgModule.
 *
 * @see `\@NgModule`, `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`
 *
 * @param name The name of a defined schema.
 *
 * \@publicApi
 * @record
 */
export function SchemaMetadata() { }
if (false) {
    /** @type {?} */
    SchemaMetadata.prototype.name;
}
/**
 * Defines a schema that allows an NgModule to contain the following:
 * - Non-Angular elements named with dash case (`-`).
 * - Element properties named with dash case (`-`).
 * Dash case is the naming convention for custom elements.
 *
 * \@publicApi
 * @type {?}
 */
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/**
 * Defines a schema that allows any property on any element.
 *
 * \@publicApi
 * @type {?}
 */
export const NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * Type of the NgModule decorator / constructor function.
 * @record
 */
export function NgModuleDecorator() { }
// WARNING: interface has both a type and a value, skipping emit
/**
 * \@Annotation
 * \@publicApi
 * @type {?}
 */
export const NgModule = makeDecorator('NgModule', (ngModule) => ngModule, undefined, undefined, 
/**
 * Decorator that marks the following class as an NgModule, and supplies
 * configuration metadata for it.
 *
 * * The `declarations` and `entryComponents` options configure the compiler
 * with information about what belongs to the NgModule.
 * * The `providers` options configures the NgModule's injector to provide
 * dependencies the NgModule members.
 * * The `imports` and `exports` options bring in members from other modules, and make
 * this module's members available to others.
 */
(type, meta) => SWITCH_COMPILE_NGMODULE(type, meta));
/**
 * \@description
 * Hook for manual bootstrapping of the application instead of using bootstrap array in \@NgModule
 * annotation.
 *
 * Reference to the current application is provided as a parameter.
 *
 * See ["Bootstrapping"](guide/bootstrapping) and ["Entry components"](guide/entry-components).
 *
 * \@usageNotes
 * ```typescript
 * class AppModule implements DoBootstrap {
 *   ngDoBootstrap(appRef: ApplicationRef) {
 *     appRef.bootstrap(AppComponent); // Or some other component
 *   }
 * }
 * ```
 *
 * \@publicApi
 * @record
 */
export function DoBootstrap() { }
if (false) {
    /**
     * @param {?} appRef
     * @return {?}
     */
    DoBootstrap.prototype.ngDoBootstrap = function (appRef) { };
}
/**
 * @param {?} moduleType
 * @param {?} metadata
 * @return {?}
 */
function preR3NgModuleCompile(moduleType, metadata) {
    /** @type {?} */
    let imports = (metadata && metadata.imports) || [];
    if (metadata && metadata.exports) {
        imports = [...imports, metadata.exports];
    }
    /** @nocollapse */ moduleType.ngInjectorDef = defineInjector({
        factory: convertInjectableProviderToFactory(moduleType, { useClass: moduleType }),
        providers: metadata && metadata.providers,
        imports: imports,
    });
}
/** @type {?} */
export const SWITCH_COMPILE_NGMODULE__POST_R3__ = render3CompileNgModule;
/** @type {?} */
const SWITCH_COMPILE_NGMODULE__PRE_R3__ = preR3NgModuleCompile;
/** @type {?} */
const SWITCH_COMPILE_NGMODULE = SWITCH_COMPILE_NGMODULE__PRE_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvY29yZS9zcmMvbWV0YWRhdGEvbmdfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFlLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUV4RCxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFOUQsT0FBTyxFQUFDLGVBQWUsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRWhGLE9BQU8sRUFBZ0IsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7O0FBV2hFLDhDQUdDOzs7SUFGQywrQ0FBc0Q7O0lBQ3RELDRDQUFtRDs7Ozs7Ozs7Ozs7Ozs7QUFlckQsaUNBeUJDOzs7Ozs7SUF2QkMsMkJBQVE7Ozs7O0lBR1IsZ0NBQXVCOzs7OztJQUd2QixtQ0FBMEI7Ozs7O0lBRzFCLDhCQUFxQjs7Ozs7O0lBTXJCLDhCQUFxQjs7Ozs7OztJQU9yQiw4Q0FBdUQ7Ozs7Ozs7Ozs7OztBQVd6RCx5Q0FJQzs7O0lBRkMsdUNBQWtCOztJQUNsQix3Q0FBdUI7Ozs7Ozs7Ozs7OztBQVl6QixvQ0FBaUQ7OztJQUFmLDhCQUFhOzs7Ozs7Ozs7OztBQVUvQyxNQUFNLE9BQU8sc0JBQXNCLEdBQW1CO0lBQ3BELElBQUksRUFBRSxpQkFBaUI7Q0FDeEI7Ozs7Ozs7QUFPRCxNQUFNLE9BQU8sZ0JBQWdCLEdBQW1CO0lBQzlDLElBQUksRUFBRSxrQkFBa0I7Q0FDekI7Ozs7O0FBTUQsdUNBTUM7Ozs7Ozs7QUF5TUQsTUFBTSxPQUFPLFFBQVEsR0FBc0IsYUFBYSxDQUNwRCxVQUFVLEVBQUUsQ0FBQyxRQUFrQixFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVM7QUFDbEU7Ozs7Ozs7Ozs7R0FVRztBQUNILENBQUMsSUFBa0IsRUFBRSxJQUFjLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCaEYsaUNBQTZFOzs7Ozs7SUFBOUMsNERBQTRDOzs7Ozs7O0FBRTNFLFNBQVMsb0JBQW9CLENBQUMsVUFBNkIsRUFBRSxRQUFrQjs7UUFDekUsT0FBTyxHQUFHLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0lBQ2xELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7UUFDaEMsT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFDO0lBRUQsVUFBVSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUM7UUFDeEMsT0FBTyxFQUFFLGtDQUFrQyxDQUFDLFVBQVUsRUFBRSxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUMsQ0FBQztRQUMvRSxTQUFTLEVBQUUsUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3pDLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUMsQ0FBQztBQUNMLENBQUM7O0FBR0QsTUFBTSxPQUFPLGtDQUFrQyxHQUFHLHNCQUFzQjs7TUFDbEUsaUNBQWlDLEdBQUcsb0JBQW9COztNQUN4RCx1QkFBdUIsR0FBa0MsaUNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FwcGxpY2F0aW9uUmVmfSBmcm9tICcuLi9hcHBsaWNhdGlvbl9yZWYnO1xuaW1wb3J0IHtJbmplY3RvclR5cGUsIGRlZmluZUluamVjdG9yfSBmcm9tICcuLi9kaS9kZWZzJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJy4uL2RpL3Byb3ZpZGVyJztcbmltcG9ydCB7Y29udmVydEluamVjdGFibGVQcm92aWRlclRvRmFjdG9yeX0gZnJvbSAnLi4vZGkvdXRpbCc7XG5pbXBvcnQge05nTW9kdWxlVHlwZX0gZnJvbSAnLi4vcmVuZGVyMyc7XG5pbXBvcnQge2NvbXBpbGVOZ01vZHVsZSBhcyByZW5kZXIzQ29tcGlsZU5nTW9kdWxlfSBmcm9tICcuLi9yZW5kZXIzL2ppdC9tb2R1bGUnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7VHlwZURlY29yYXRvciwgbWFrZURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBleHBhbnNpb24gb2YgYW4gYE5nTW9kdWxlYCBpbnRvIGl0cyBzY29wZXMuXG4gKlxuICogQSBzY29wZSBpcyBhIHNldCBvZiBkaXJlY3RpdmVzIGFuZCBwaXBlcyB0aGF0IGFyZSB2aXNpYmxlIGluIGEgcGFydGljdWxhciBjb250ZXh0LiBFYWNoXG4gKiBgTmdNb2R1bGVgIGhhcyB0d28gc2NvcGVzLiBUaGUgYGNvbXBpbGF0aW9uYCBzY29wZSBpcyB0aGUgc2V0IG9mIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIHRoYXQgd2lsbFxuICogYmUgcmVjb2duaXplZCBpbiB0aGUgdGVtcGxhdGVzIG9mIGNvbXBvbmVudHMgZGVjbGFyZWQgYnkgdGhlIG1vZHVsZS4gVGhlIGBleHBvcnRlZGAgc2NvcGUgaXMgdGhlXG4gKiBzZXQgb2YgZGlyZWN0aXZlcyBhbmQgcGlwZXMgZXhwb3J0ZWQgYnkgYSBtb2R1bGUgKHRoYXQgaXMsIG1vZHVsZSBCJ3MgZXhwb3J0ZWQgc2NvcGUgZ2V0cyBhZGRlZFxuICogdG8gbW9kdWxlIEEncyBjb21waWxhdGlvbiBzY29wZSB3aGVuIG1vZHVsZSBBIGltcG9ydHMgQikuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzIHtcbiAgY29tcGlsYXRpb246IHtkaXJlY3RpdmVzOiBTZXQ8YW55PjsgcGlwZXM6IFNldDxhbnk+O307XG4gIGV4cG9ydGVkOiB7ZGlyZWN0aXZlczogU2V0PGFueT47IHBpcGVzOiBTZXQ8YW55Pjt9O1xufVxuXG5leHBvcnQgdHlwZSBOZ01vZHVsZURlZldpdGhNZXRhPFQsIERlY2xhcmF0aW9ucywgSW1wb3J0cywgRXhwb3J0cz4gPSBOZ01vZHVsZURlZjxUPjtcblxuLyoqXG4gKiBSdW50aW1lIGxpbmsgaW5mb3JtYXRpb24gZm9yIE5nTW9kdWxlcy5cbiAqXG4gKiBUaGlzIGlzIHRoZSBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZSB1c2VkIGJ5IHRoZSBydW50aW1lIHRvIGFzc2VtYmxlIGNvbXBvbmVudHMsIGRpcmVjdGl2ZXMsXG4gKiBwaXBlcywgYW5kIGluamVjdG9ycy5cbiAqXG4gKiBOT1RFOiBBbHdheXMgdXNlIGBkZWZpbmVOZ01vZHVsZWAgZnVuY3Rpb24gdG8gY3JlYXRlIHRoaXMgb2JqZWN0LFxuICogbmV2ZXIgY3JlYXRlIHRoZSBvYmplY3QgZGlyZWN0bHkgc2luY2UgdGhlIHNoYXBlIG9mIHRoaXMgb2JqZWN0XG4gKiBjYW4gY2hhbmdlIGJldHdlZW4gdmVyc2lvbnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGVEZWY8VD4ge1xuICAvKiogVG9rZW4gcmVwcmVzZW50aW5nIHRoZSBtb2R1bGUuIFVzZWQgYnkgREkuICovXG4gIHR5cGU6IFQ7XG5cbiAgLyoqIExpc3Qgb2YgY29tcG9uZW50cyB0byBib290c3RyYXAuICovXG4gIGJvb3RzdHJhcDogVHlwZTxhbnk+W107XG5cbiAgLyoqIExpc3Qgb2YgY29tcG9uZW50cywgZGlyZWN0aXZlcywgYW5kIHBpcGVzIGRlY2xhcmVkIGJ5IHRoaXMgbW9kdWxlLiAqL1xuICBkZWNsYXJhdGlvbnM6IFR5cGU8YW55PltdO1xuXG4gIC8qKiBMaXN0IG9mIG1vZHVsZXMgb3IgYE1vZHVsZVdpdGhQcm92aWRlcnNgIGltcG9ydGVkIGJ5IHRoaXMgbW9kdWxlLiAqL1xuICBpbXBvcnRzOiBUeXBlPGFueT5bXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBtb2R1bGVzLCBgTW9kdWxlV2l0aFByb3ZpZGVyc2AsIGNvbXBvbmVudHMsIGRpcmVjdGl2ZXMsIG9yIHBpcGVzIGV4cG9ydGVkIGJ5IHRoaXNcbiAgICogbW9kdWxlLlxuICAgKi9cbiAgZXhwb3J0czogVHlwZTxhbnk+W107XG5cbiAgLyoqXG4gICAqIENhY2hlZCB2YWx1ZSBvZiBjb21wdXRlZCBgdHJhbnNpdGl2ZUNvbXBpbGVTY29wZXNgIGZvciB0aGlzIG1vZHVsZS5cbiAgICpcbiAgICogVGhpcyBzaG91bGQgbmV2ZXIgYmUgcmVhZCBkaXJlY3RseSwgYnV0IGFjY2Vzc2VkIHZpYSBgdHJhbnNpdGl2ZVNjb3Blc0ZvcmAuXG4gICAqL1xuICB0cmFuc2l0aXZlQ29tcGlsZVNjb3BlczogTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzfG51bGw7XG59XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCBhbiBOZ01vZHVsZSB0aGF0IGFzc29jaWF0ZXMgaXQgd2l0aCB0aGUgcHJvdmlkZXJzLlxuICpcbiAqIEBwYXJhbSBUIHRoZSBtb2R1bGUgdHlwZS4gSW4gSXZ5IGFwcGxpY2F0aW9ucywgdGhpcyBtdXN0IGJlIGV4cGxpY2l0bHlcbiAqIHByb3ZpZGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNb2R1bGVXaXRoUHJvdmlkZXJzPFxuICAgIFQgPSBhbnkgLyoqIFRPRE8oYWx4aHViKTogcmVtb3ZlIGRlZmF1bHQgd2hlbiBjYWxsZXJzIHBhc3MgZXhwbGljaXQgdHlwZSBwYXJhbSAqLz4ge1xuICBuZ01vZHVsZTogVHlwZTxUPjtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBBIHNjaGVtYSBkZWZpbml0aW9uIGFzc29jaWF0ZWQgd2l0aCBhbiBOZ01vZHVsZS5cbiAqXG4gKiBAc2VlIGBATmdNb2R1bGVgLCBgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQWAsIGBOT19FUlJPUlNfU0NIRU1BYFxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIGEgZGVmaW5lZCBzY2hlbWEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYU1ldGFkYXRhIHsgbmFtZTogc3RyaW5nOyB9XG5cbi8qKlxuICogRGVmaW5lcyBhIHNjaGVtYSB0aGF0IGFsbG93cyBhbiBOZ01vZHVsZSB0byBjb250YWluIHRoZSBmb2xsb3dpbmc6XG4gKiAtIE5vbi1Bbmd1bGFyIGVsZW1lbnRzIG5hbWVkIHdpdGggZGFzaCBjYXNlIChgLWApLlxuICogLSBFbGVtZW50IHByb3BlcnRpZXMgbmFtZWQgd2l0aCBkYXNoIGNhc2UgKGAtYCkuXG4gKiBEYXNoIGNhc2UgaXMgdGhlIG5hbWluZyBjb252ZW50aW9uIGZvciBjdXN0b20gZWxlbWVudHMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICdjdXN0b20tZWxlbWVudHMnXG59O1xuXG4vKipcbiAqIERlZmluZXMgYSBzY2hlbWEgdGhhdCBhbGxvd3MgYW55IHByb3BlcnR5IG9uIGFueSBlbGVtZW50LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IE5PX0VSUk9SU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnbm8tZXJyb3JzLXNjaGVtYSdcbn07XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBOZ01vZHVsZSBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZURlY29yYXRvciB7XG4gIC8qKlxuICAgKiBNYXJrcyBhIGNsYXNzIGFzIGFuIE5nTW9kdWxlIGFuZCBzdXBwbGllcyBjb25maWd1cmF0aW9uIG1ldGFkYXRhLlxuICAgKi9cbiAgKG9iaj86IE5nTW9kdWxlKTogVHlwZURlY29yYXRvcjtcbiAgbmV3IChvYmo/OiBOZ01vZHVsZSk6IE5nTW9kdWxlO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIE5nTW9kdWxlIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZSB7XG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGluamVjdGFibGUgb2JqZWN0cyB0aGF0IGFyZSBhdmFpbGFibGUgaW4gdGhlIGluamVjdG9yXG4gICAqIG9mIHRoaXMgbW9kdWxlLlxuICAgKlxuICAgKiBAc2VlIFtEZXBlbmRlbmN5IEluamVjdGlvbiBndWlkZV0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24pXG4gICAqIEBzZWUgW05nTW9kdWxlIGd1aWRlXShndWlkZS9wcm92aWRlcnMpXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIERlcGVuZGVuY2llcyB3aG9zZSBwcm92aWRlcnMgYXJlIGxpc3RlZCBoZXJlIGJlY29tZSBhdmFpbGFibGUgZm9yIGluamVjdGlvblxuICAgKiBpbnRvIGFueSBjb21wb25lbnQsIGRpcmVjdGl2ZSwgcGlwZSBvciBzZXJ2aWNlIHRoYXQgaXMgYSBjaGlsZCBvZiB0aGlzIGluamVjdG9yLlxuICAgKiBUaGUgTmdNb2R1bGUgdXNlZCBmb3IgYm9vdHN0cmFwcGluZyB1c2VzIHRoZSByb290IGluamVjdG9yLCBhbmQgY2FuIHByb3ZpZGUgZGVwZW5kZW5jaWVzXG4gICAqIHRvIGFueSBwYXJ0IG9mIHRoZSBhcHAuXG4gICAqXG4gICAqIEEgbGF6eS1sb2FkZWQgbW9kdWxlIGhhcyBpdHMgb3duIGluamVjdG9yLCB0eXBpY2FsbHkgYSBjaGlsZCBvZiB0aGUgYXBwIHJvb3QgaW5qZWN0b3IuXG4gICAqIExhenktbG9hZGVkIHNlcnZpY2VzIGFyZSBzY29wZWQgdG8gdGhlIGxhenktbG9hZGVkIG1vZHVsZSdzIGluamVjdG9yLlxuICAgKiBJZiBhIGxhenktbG9hZGVkIG1vZHVsZSBhbHNvIHByb3ZpZGVzIHRoZSBgVXNlclNlcnZpY2VgLCBhbnkgY29tcG9uZW50IGNyZWF0ZWRcbiAgICogd2l0aGluIHRoYXQgbW9kdWxlJ3MgY29udGV4dCAoc3VjaCBhcyBieSByb3V0ZXIgbmF2aWdhdGlvbikgZ2V0cyB0aGUgbG9jYWwgaW5zdGFuY2VcbiAgICogb2YgdGhlIHNlcnZpY2UsIG5vdCB0aGUgaW5zdGFuY2UgaW4gdGhlIHJvb3QgaW5qZWN0b3IuXG4gICAqIENvbXBvbmVudHMgaW4gZXh0ZXJuYWwgbW9kdWxlcyBjb250aW51ZSB0byByZWNlaXZlIHRoZSBpbnN0YW5jZSBwcm92aWRlZCBieSB0aGVpciBpbmplY3RvcnMuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBkZWZpbmVzIGEgY2xhc3MgdGhhdCBpcyBpbmplY3RlZCBpblxuICAgKiB0aGUgSGVsbG9Xb3JsZCBOZ01vZHVsZTpcbiAgICpcbiAgICogYGBgXG4gICAqIGNsYXNzIEdyZWV0ZXIge1xuICAgKiAgICBncmVldChuYW1lOnN0cmluZykge1xuICAgKiAgICAgIHJldHVybiAnSGVsbG8gJyArIG5hbWUgKyAnISc7XG4gICAqICAgIH1cbiAgICogfVxuICAgKlxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIHByb3ZpZGVyczogW1xuICAgKiAgICAgR3JlZXRlclxuICAgKiAgIF1cbiAgICogfSlcbiAgICogY2xhc3MgSGVsbG9Xb3JsZCB7XG4gICAqICAgZ3JlZXRlcjpHcmVldGVyO1xuICAgKlxuICAgKiAgIGNvbnN0cnVjdG9yKGdyZWV0ZXI6R3JlZXRlcikge1xuICAgKiAgICAgdGhpcy5ncmVldGVyID0gZ3JlZXRlcjtcbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGNvbXBvbmVudHMsIGRpcmVjdGl2ZXMsIGFuZCBwaXBlcyAoW2RlY2xhcmFibGVzXShndWlkZS9nbG9zc2FyeSNkZWNsYXJhYmxlKSlcbiAgICogdGhhdCBiZWxvbmcgdG8gdGhpcyBtb2R1bGUuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIFRoZSBzZXQgb2Ygc2VsZWN0b3JzIHRoYXQgYXJlIGF2YWlsYWJsZSB0byBhIHRlbXBsYXRlIGluY2x1ZGUgdGhvc2UgZGVjbGFyZWQgaGVyZSwgYW5kXG4gICAqIHRob3NlIHRoYXQgYXJlIGV4cG9ydGVkIGZyb20gaW1wb3J0ZWQgTmdNb2R1bGVzLlxuICAgKlxuICAgKiBEZWNsYXJhYmxlcyBtdXN0IGJlbG9uZyB0byBleGFjdGx5IG9uZSBtb2R1bGUuXG4gICAqIFRoZSBjb21waWxlciBlbWl0cyBhbiBlcnJvciBpZiB5b3UgdHJ5IHRvIGRlY2xhcmUgdGhlIHNhbWUgY2xhc3MgaW4gbW9yZSB0aGFuIG9uZSBtb2R1bGUuXG4gICAqIEJlIGNhcmVmdWwgbm90IHRvIGRlY2xhcmUgYSBjbGFzcyB0aGF0IGlzIGltcG9ydGVkIGZyb20gYW5vdGhlciBtb2R1bGUuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBhbGxvd3MgdGhlIENvbW1vbk1vZHVsZSB0byB1c2UgdGhlIGBOZ0ZvcmBcbiAgICogZGlyZWN0aXZlLlxuICAgKlxuICAgKiBgYGBqYXZhc2NyaXB0XG4gICAqIEBOZ01vZHVsZSh7XG4gICAqICAgZGVjbGFyYXRpb25zOiBbTmdGb3JdXG4gICAqIH0pXG4gICAqIGNsYXNzIENvbW1vbk1vZHVsZSB7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBkZWNsYXJhdGlvbnM/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIE5nTW9kdWxlcyB3aG9zZSBleHBvcnRlZCBbZGVjbGFyYWJsZXNdKGd1aWRlL2dsb3NzYXJ5I2RlY2xhcmFibGUpXG4gICAqIGFyZSBhdmFpbGFibGUgdG8gdGVtcGxhdGVzIGluIHRoaXMgbW9kdWxlLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBBIHRlbXBsYXRlIGNhbiB1c2UgZXhwb3J0ZWQgZGVjbGFyYWJsZXMgZnJvbSBhbnlcbiAgICogaW1wb3J0ZWQgbW9kdWxlLCBpbmNsdWRpbmcgdGhvc2UgZnJvbSBtb2R1bGVzIHRoYXQgYXJlIGltcG9ydGVkIGluZGlyZWN0bHlcbiAgICogYW5kIHJlLWV4cG9ydGVkLlxuICAgKiBGb3IgZXhhbXBsZSwgYE1vZHVsZUFgIGltcG9ydHMgYE1vZHVsZUJgLCBhbmQgYWxzbyBleHBvcnRzXG4gICAqIGl0LCB3aGljaCBtYWtlcyB0aGUgZGVjbGFyYWJsZXMgZnJvbSBgTW9kdWxlQmAgYXZhaWxhYmxlXG4gICAqIHdoZXJldmVyIGBNb2R1bGVBYCBpcyBpbXBvcnRlZC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGFsbG93cyBNYWluTW9kdWxlIHRvIHVzZSBhbnRoaW5nIGV4cG9ydGVkIGJ5XG4gICAqIGBDb21tb25Nb2R1bGVgOlxuICAgKlxuICAgKiBgYGBqYXZhc2NyaXB0XG4gICAqIEBOZ01vZHVsZSh7XG4gICAqICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV1cbiAgICogfSlcbiAgICogY2xhc3MgTWFpbk1vZHVsZSB7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqL1xuICBpbXBvcnRzPzogQXJyYXk8VHlwZTxhbnk+fE1vZHVsZVdpdGhQcm92aWRlcnM8e30+fGFueVtdPjtcblxuICAvKipcbiAgICogVGhlIHNldCBvZiBjb21wb25lbnRzLCBkaXJlY3RpdmVzLCBhbmQgcGlwZXMgZGVjbGFyZWQgaW4gdGhpc1xuICAgKiBOZ01vZHVsZSB0aGF0IGNhbiBiZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZSBvZiBhbnkgY29tcG9uZW50IHRoYXQgaXMgcGFydCBvZiBhblxuICAgKiBOZ01vZHVsZSB0aGF0IGltcG9ydHMgdGhpcyBOZ01vZHVsZS4gRXhwb3J0ZWQgZGVjbGFyYXRpb25zIGFyZSB0aGUgbW9kdWxlJ3MgcHVibGljIEFQSS5cbiAgICpcbiAgICogQSBkZWNsYXJhYmxlIGJlbG9uZ3MgdG8gb25lIGFuZCBvbmx5IG9uZSBOZ01vZHVsZS5cbiAgICogQSBtb2R1bGUgY2FuIGxpc3QgYW5vdGhlciBtb2R1bGUgYW1vbmcgaXRzIGV4cG9ydHMsIGluIHdoaWNoIGNhc2UgYWxsIG9mIHRoYXQgbW9kdWxlJ3NcbiAgICogcHVibGljIGRlY2xhcmF0aW9uIGFyZSBleHBvcnRlZC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogRGVjbGFyYXRpb25zIGFyZSBwcml2YXRlIGJ5IGRlZmF1bHQuXG4gICAqIElmIHRoaXMgTW9kdWxlQSBkb2VzIG5vdCBleHBvcnQgVXNlckNvbXBvbmVudCwgdGhlbiBvbmx5IHRoZSBjb21wb25lbnRzIHdpdGhpbiB0aGlzXG4gICAqIE1vZHVsZUEgY2FuIHVzZSBVc2VyQ29tcG9uZW50LlxuICAgKlxuICAgKiBNb2R1bGVBIGNhbiBpbXBvcnQgTW9kdWxlQiBhbmQgYWxzbyBleHBvcnQgaXQsIG1ha2luZyBleHBvcnRzIGZyb20gTW9kdWxlQlxuICAgKiBhdmFpbGFibGUgdG8gYW4gTmdNb2R1bGUgdGhhdCBpbXBvcnRzIE1vZHVsZUEuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBleHBvcnRzIHRoZSBgTmdGb3JgIGRpcmVjdGl2ZSBmcm9tIENvbW1vbk1vZHVsZS5cbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGV4cG9ydHM6IFtOZ0Zvcl1cbiAgICogfSlcbiAgICogY2xhc3MgQ29tbW9uTW9kdWxlIHtcbiAgICogfVxuICAgKiBgYGBcbiAgICovXG4gIGV4cG9ydHM/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGNvbXBvbmVudHMgdG8gY29tcGlsZSB3aGVuIHRoaXMgTmdNb2R1bGUgaXMgZGVmaW5lZCxcbiAgICogc28gdGhhdCB0aGV5IGNhbiBiZSBkeW5hbWljYWxseSBsb2FkZWQgaW50byB0aGUgdmlldy5cbiAgICpcbiAgICogRm9yIGVhY2ggY29tcG9uZW50IGxpc3RlZCBoZXJlLCBBbmd1bGFyIGNyZWF0ZXMgYSBgQ29tcG9uZW50RmFjdG9yeWBcbiAgICogYW5kIHN0b3JlcyBpdCBpbiB0aGUgYENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcmAuXG4gICAqXG4gICAqIEFuZ3VsYXIgYXV0b21hdGljYWxseSBhZGRzIGNvbXBvbmVudHMgaW4gdGhlIG1vZHVsZSdzIGJvb3RzdHJhcFxuICAgKiBhbmQgcm91dGUgZGVmaW5pdGlvbnMgaW50byB0aGUgYGVudHJ5Q29tcG9uZW50c2AgbGlzdC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIHRvIGFkZCBjb21wb25lbnRzIHRoYXQgYXJlIGJvb3RzdHJhcHBlZFxuICAgKiB1c2luZyBvbmUgb2YgdGhlIGltcGVyYXRpdmUgdGVjaG5pcXVlcywgc3VjaCBhcyBgVmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoKWAuXG4gICAqXG4gICAqIEBzZWUgW0VudHJ5IENvbXBvbmVudHNdKGd1aWRlL2VudHJ5LWNvbXBvbmVudHMpXG4gICAqL1xuICBlbnRyeUNvbXBvbmVudHM/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGNvbXBvbmVudHMgdGhhdCBhcmUgYm9vdHN0cmFwcGVkIHdoZW5cbiAgICogdGhpcyBtb2R1bGUgaXMgYm9vdHN0cmFwcGVkLiBUaGUgY29tcG9uZW50cyBsaXN0ZWQgaGVyZVxuICAgKiBhcmUgYXV0b21hdGljYWxseSBhZGRlZCB0byBgZW50cnlDb21wb25lbnRzYC5cbiAgICovXG4gIGJvb3RzdHJhcD86IEFycmF5PFR5cGU8YW55PnxhbnlbXT47XG5cbiAgLyoqXG4gICAqIFRoZSBzZXQgb2Ygc2NoZW1hcyB0aGF0IGRlY2xhcmUgZWxlbWVudHMgdG8gYmUgYWxsb3dlZCBpbiB0aGUgTmdNb2R1bGUuXG4gICAqIEVsZW1lbnRzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5laXRoZXIgQW5ndWxhciBjb21wb25lbnRzIG5vciBkaXJlY3RpdmVzXG4gICAqIG11c3QgYmUgZGVjbGFyZWQgaW4gYSBzY2hlbWEuXG4gICAqXG4gICAqIEFsbG93ZWQgdmFsdWUgYXJlIGBOT19FUlJPUlNfU0NIRU1BYCBhbmQgYENVU1RPTV9FTEVNRU5UU19TQ0hFTUFgLlxuICAgKlxuICAgKiBAc2VjdXJpdHkgV2hlbiB1c2luZyBvbmUgb2YgYE5PX0VSUk9SU19TQ0hFTUFgIG9yIGBDVVNUT01fRUxFTUVOVFNfU0NIRU1BYFxuICAgKiB5b3UgbXVzdCBlbnN1cmUgdGhhdCBhbGxvd2VkIGVsZW1lbnRzIGFuZCBwcm9wZXJ0aWVzIHNlY3VyZWx5IGVzY2FwZSBpbnB1dHMuXG4gICAqL1xuICBzY2hlbWFzPzogQXJyYXk8U2NoZW1hTWV0YWRhdGF8YW55W10+O1xuXG4gIC8qKlxuICAgKiBBIG5hbWUgb3IgcGF0aCB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhpcyBOZ01vZHVsZSBpbiBgZ2V0TW9kdWxlRmFjdG9yeWAuXG4gICAqIElmIGxlZnQgYHVuZGVmaW5lZGAsIHRoZSBOZ01vZHVsZSBpcyBub3QgcmVnaXN0ZXJlZCB3aXRoXG4gICAqIGBnZXRNb2R1bGVGYWN0b3J5YC5cbiAgICovXG4gIGlkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGlzIG1vZHVsZSB3aWxsIGJlIHNraXBwZWQgYnkgdGhlIEFPVCBjb21waWxlciBhbmQgc28gd2lsbCBhbHdheXMgYmUgY29tcGlsZWRcbiAgICogdXNpbmcgSklULlxuICAgKlxuICAgKiBUaGlzIGV4aXN0cyB0byBzdXBwb3J0IGZ1dHVyZSBJdnkgd29yayBhbmQgaGFzIG5vIGVmZmVjdCBjdXJyZW50bHkuXG4gICAqL1xuICBqaXQ/OiB0cnVlO1xufVxuXG4vKipcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBOZ01vZHVsZTogTmdNb2R1bGVEZWNvcmF0b3IgPSBtYWtlRGVjb3JhdG9yKFxuICAgICdOZ01vZHVsZScsIChuZ01vZHVsZTogTmdNb2R1bGUpID0+IG5nTW9kdWxlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAvKipcbiAgICAgKiBEZWNvcmF0b3IgdGhhdCBtYXJrcyB0aGUgZm9sbG93aW5nIGNsYXNzIGFzIGFuIE5nTW9kdWxlLCBhbmQgc3VwcGxpZXNcbiAgICAgKiBjb25maWd1cmF0aW9uIG1ldGFkYXRhIGZvciBpdC5cbiAgICAgKlxuICAgICAqICogVGhlIGBkZWNsYXJhdGlvbnNgIGFuZCBgZW50cnlDb21wb25lbnRzYCBvcHRpb25zIGNvbmZpZ3VyZSB0aGUgY29tcGlsZXJcbiAgICAgKiB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYmVsb25ncyB0byB0aGUgTmdNb2R1bGUuXG4gICAgICogKiBUaGUgYHByb3ZpZGVyc2Agb3B0aW9ucyBjb25maWd1cmVzIHRoZSBOZ01vZHVsZSdzIGluamVjdG9yIHRvIHByb3ZpZGVcbiAgICAgKiBkZXBlbmRlbmNpZXMgdGhlIE5nTW9kdWxlIG1lbWJlcnMuXG4gICAgICogKiBUaGUgYGltcG9ydHNgIGFuZCBgZXhwb3J0c2Agb3B0aW9ucyBicmluZyBpbiBtZW1iZXJzIGZyb20gb3RoZXIgbW9kdWxlcywgYW5kIG1ha2VcbiAgICAgKiB0aGlzIG1vZHVsZSdzIG1lbWJlcnMgYXZhaWxhYmxlIHRvIG90aGVycy5cbiAgICAgKi9cbiAgICAodHlwZTogTmdNb2R1bGVUeXBlLCBtZXRhOiBOZ01vZHVsZSkgPT4gU1dJVENIX0NPTVBJTEVfTkdNT0RVTEUodHlwZSwgbWV0YSkpO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogSG9vayBmb3IgbWFudWFsIGJvb3RzdHJhcHBpbmcgb2YgdGhlIGFwcGxpY2F0aW9uIGluc3RlYWQgb2YgdXNpbmcgYm9vdHN0cmFwIGFycmF5IGluIEBOZ01vZHVsZVxuICogYW5ub3RhdGlvbi5cbiAqXG4gKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgYXBwbGljYXRpb24gaXMgcHJvdmlkZWQgYXMgYSBwYXJhbWV0ZXIuXG4gKlxuICogU2VlIFtcIkJvb3RzdHJhcHBpbmdcIl0oZ3VpZGUvYm9vdHN0cmFwcGluZykgYW5kIFtcIkVudHJ5IGNvbXBvbmVudHNcIl0oZ3VpZGUvZW50cnktY29tcG9uZW50cykuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNsYXNzIEFwcE1vZHVsZSBpbXBsZW1lbnRzIERvQm9vdHN0cmFwIHtcbiAqICAgbmdEb0Jvb3RzdHJhcChhcHBSZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gKiAgICAgYXBwUmVmLmJvb3RzdHJhcChBcHBDb21wb25lbnQpOyAvLyBPciBzb21lIG90aGVyIGNvbXBvbmVudFxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRG9Cb290c3RyYXAgeyBuZ0RvQm9vdHN0cmFwKGFwcFJlZjogQXBwbGljYXRpb25SZWYpOiB2b2lkOyB9XG5cbmZ1bmN0aW9uIHByZVIzTmdNb2R1bGVDb21waWxlKG1vZHVsZVR5cGU6IEluamVjdG9yVHlwZTxhbnk+LCBtZXRhZGF0YTogTmdNb2R1bGUpOiB2b2lkIHtcbiAgbGV0IGltcG9ydHMgPSAobWV0YWRhdGEgJiYgbWV0YWRhdGEuaW1wb3J0cykgfHwgW107XG4gIGlmIChtZXRhZGF0YSAmJiBtZXRhZGF0YS5leHBvcnRzKSB7XG4gICAgaW1wb3J0cyA9IFsuLi5pbXBvcnRzLCBtZXRhZGF0YS5leHBvcnRzXTtcbiAgfVxuXG4gIG1vZHVsZVR5cGUubmdJbmplY3RvckRlZiA9IGRlZmluZUluamVjdG9yKHtcbiAgICBmYWN0b3J5OiBjb252ZXJ0SW5qZWN0YWJsZVByb3ZpZGVyVG9GYWN0b3J5KG1vZHVsZVR5cGUsIHt1c2VDbGFzczogbW9kdWxlVHlwZX0pLFxuICAgIHByb3ZpZGVyczogbWV0YWRhdGEgJiYgbWV0YWRhdGEucHJvdmlkZXJzLFxuICAgIGltcG9ydHM6IGltcG9ydHMsXG4gIH0pO1xufVxuXG5cbmV4cG9ydCBjb25zdCBTV0lUQ0hfQ09NUElMRV9OR01PRFVMRV9fUE9TVF9SM19fID0gcmVuZGVyM0NvbXBpbGVOZ01vZHVsZTtcbmNvbnN0IFNXSVRDSF9DT01QSUxFX05HTU9EVUxFX19QUkVfUjNfXyA9IHByZVIzTmdNb2R1bGVDb21waWxlO1xuY29uc3QgU1dJVENIX0NPTVBJTEVfTkdNT0RVTEU6IHR5cGVvZiByZW5kZXIzQ29tcGlsZU5nTW9kdWxlID0gU1dJVENIX0NPTVBJTEVfTkdNT0RVTEVfX1BSRV9SM19fO1xuIl19