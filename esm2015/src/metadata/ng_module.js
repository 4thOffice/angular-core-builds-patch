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
import { R3_COMPILE_NGMODULE } from '../ivy_switch';
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
/** @type {?} */
NgModuleTransitiveScopes.prototype.compilation;
/** @type {?} */
NgModuleTransitiveScopes.prototype.exported;
/** @typedef {?} */
var NgModuleDefInternal;
export { NgModuleDefInternal };
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
 * @template T, Declarations, Imports, Exports
 */
export function NgModuleDef() { }
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
/**
 * A wrapper around an NgModule that associates it with the providers.
 *
 * @param T the module type. In Ivy applications, this must be explicitly
 * provided.
 * @record
 * @template T
 */
export function ModuleWithProviders() { }
/** @type {?} */
ModuleWithProviders.prototype.ngModule;
/** @type {?|undefined} */
ModuleWithProviders.prototype.providers;
/**
 * A schema definition associated with an NgModule.
 *
 * @see `\@NgModule`, `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`
 *
 * @param name The name of a defined schema.
 *
 * \@experimental
 * @record
 */
export function SchemaMetadata() { }
/** @type {?} */
SchemaMetadata.prototype.name;
/** *
 * Defines a schema that allows an NgModule to contain the following:
 * - Non-Angular elements named with dash case (`-`).
 * - Element properties named with dash case (`-`).
 * Dash case is the naming convention for custom elements.
 *
 *
  @type {?} */
export const CUSTOM_ELEMENTS_SCHEMA = {
    name: 'custom-elements'
};
/** *
 * Defines a schema that allows any property on any element.
 *
 * \@experimental
  @type {?} */
export const NO_ERRORS_SCHEMA = {
    name: 'no-errors-schema'
};
/**
 * Type of the NgModule decorator / constructor function.
 *
 *
 * @record
 */
export function NgModuleDecorator() { }
/** *
 * \@Annotation
  @type {?} */
export const NgModule = makeDecorator('NgModule', (ngModule) => ngModule, undefined, undefined, /**
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
(type, meta) => R3_COMPILE_NGMODULE(type, meta));
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
 * @record
 */
export function DoBootstrap() { }
/** @type {?} */
DoBootstrap.prototype.ngDoBootstrap;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbWV0YWRhdGEvbmdfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBVUEsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBZ0IsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlGaEUsYUFBYSxzQkFBc0IsR0FBbUI7SUFDcEQsSUFBSSxFQUFFLGlCQUFpQjtDQUN4QixDQUFDOzs7Ozs7QUFPRixhQUFhLGdCQUFnQixHQUFtQjtJQUM5QyxJQUFJLEVBQUUsa0JBQWtCO0NBQ3pCLENBQUM7Ozs7Ozs7Ozs7O0FBc05GLGFBQWEsUUFBUSxHQUFzQixhQUFhLENBQ3BELFVBQVUsRUFBRSxDQUFDLFFBQWtCLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUzs7Ozs7Ozs7Ozs7QUFZbEUsQ0FBQyxJQUFlLEVBQUUsSUFBYyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBcHBsaWNhdGlvblJlZn0gZnJvbSAnLi4vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7UHJvdmlkZXJ9IGZyb20gJy4uL2RpL3Byb3ZpZGVyJztcbmltcG9ydCB7UjNfQ09NUElMRV9OR01PRFVMRX0gZnJvbSAnLi4vaXZ5X3N3aXRjaCc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtUeXBlRGVjb3JhdG9yLCBtYWtlRGVjb3JhdG9yfSBmcm9tICcuLi91dGlsL2RlY29yYXRvcnMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGV4cGFuc2lvbiBvZiBhbiBgTmdNb2R1bGVgIGludG8gaXRzIHNjb3Blcy5cbiAqXG4gKiBBIHNjb3BlIGlzIGEgc2V0IG9mIGRpcmVjdGl2ZXMgYW5kIHBpcGVzIHRoYXQgYXJlIHZpc2libGUgaW4gYSBwYXJ0aWN1bGFyIGNvbnRleHQuIEVhY2hcbiAqIGBOZ01vZHVsZWAgaGFzIHR3byBzY29wZXMuIFRoZSBgY29tcGlsYXRpb25gIHNjb3BlIGlzIHRoZSBzZXQgb2YgZGlyZWN0aXZlcyBhbmQgcGlwZXMgdGhhdCB3aWxsXG4gKiBiZSByZWNvZ25pemVkIGluIHRoZSB0ZW1wbGF0ZXMgb2YgY29tcG9uZW50cyBkZWNsYXJlZCBieSB0aGUgbW9kdWxlLiBUaGUgYGV4cG9ydGVkYCBzY29wZSBpcyB0aGVcbiAqIHNldCBvZiBkaXJlY3RpdmVzIGFuZCBwaXBlcyBleHBvcnRlZCBieSBhIG1vZHVsZSAodGhhdCBpcywgbW9kdWxlIEIncyBleHBvcnRlZCBzY29wZSBnZXRzIGFkZGVkXG4gKiB0byBtb2R1bGUgQSdzIGNvbXBpbGF0aW9uIHNjb3BlIHdoZW4gbW9kdWxlIEEgaW1wb3J0cyBCKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZVRyYW5zaXRpdmVTY29wZXMge1xuICBjb21waWxhdGlvbjoge2RpcmVjdGl2ZXM6IFNldDxhbnk+OyBwaXBlczogU2V0PGFueT47fTtcbiAgZXhwb3J0ZWQ6IHtkaXJlY3RpdmVzOiBTZXQ8YW55PjsgcGlwZXM6IFNldDxhbnk+O307XG59XG5cbi8qKlxuICogQSB2ZXJzaW9uIG9mIHtAbGluayBOZ01vZHVsZURlZn0gdGhhdCByZXByZXNlbnRzIHRoZSBydW50aW1lIHR5cGUgc2hhcGUgb25seSwgYW5kIGV4Y2x1ZGVzXG4gKiBtZXRhZGF0YSBwYXJhbWV0ZXJzLlxuICovXG5leHBvcnQgdHlwZSBOZ01vZHVsZURlZkludGVybmFsPFQ+ID0gTmdNb2R1bGVEZWY8VCwgYW55LCBhbnksIGFueT47XG5cbi8qKlxuICogUnVudGltZSBsaW5rIGluZm9ybWF0aW9uIGZvciBOZ01vZHVsZXMuXG4gKlxuICogVGhpcyBpcyB0aGUgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdXNlZCBieSB0aGUgcnVudGltZSB0byBhc3NlbWJsZSBjb21wb25lbnRzLCBkaXJlY3RpdmVzLFxuICogcGlwZXMsIGFuZCBpbmplY3RvcnMuXG4gKlxuICogTk9URTogQWx3YXlzIHVzZSBgZGVmaW5lTmdNb2R1bGVgIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGlzIG9iamVjdCxcbiAqIG5ldmVyIGNyZWF0ZSB0aGUgb2JqZWN0IGRpcmVjdGx5IHNpbmNlIHRoZSBzaGFwZSBvZiB0aGlzIG9iamVjdFxuICogY2FuIGNoYW5nZSBiZXR3ZWVuIHZlcnNpb25zLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTW9kdWxlRGVmPFQsIERlY2xhcmF0aW9ucywgSW1wb3J0cywgRXhwb3J0cz4ge1xuICAvKiogVG9rZW4gcmVwcmVzZW50aW5nIHRoZSBtb2R1bGUuIFVzZWQgYnkgREkuICovXG4gIHR5cGU6IFQ7XG5cbiAgLyoqIExpc3Qgb2YgY29tcG9uZW50cyB0byBib290c3RyYXAuICovXG4gIGJvb3RzdHJhcDogVHlwZTxhbnk+W107XG5cbiAgLyoqIExpc3Qgb2YgY29tcG9uZW50cywgZGlyZWN0aXZlcywgYW5kIHBpcGVzIGRlY2xhcmVkIGJ5IHRoaXMgbW9kdWxlLiAqL1xuICBkZWNsYXJhdGlvbnM6IFR5cGU8YW55PltdO1xuXG4gIC8qKiBMaXN0IG9mIG1vZHVsZXMgb3IgYE1vZHVsZVdpdGhQcm92aWRlcnNgIGltcG9ydGVkIGJ5IHRoaXMgbW9kdWxlLiAqL1xuICBpbXBvcnRzOiBUeXBlPGFueT5bXTtcblxuICAvKipcbiAgICogTGlzdCBvZiBtb2R1bGVzLCBgTW9kdWxlV2l0aFByb3ZpZGVyc2AsIGNvbXBvbmVudHMsIGRpcmVjdGl2ZXMsIG9yIHBpcGVzIGV4cG9ydGVkIGJ5IHRoaXNcbiAgICogbW9kdWxlLlxuICAgKi9cbiAgZXhwb3J0czogVHlwZTxhbnk+W107XG5cbiAgLyoqXG4gICAqIENhY2hlZCB2YWx1ZSBvZiBjb21wdXRlZCBgdHJhbnNpdGl2ZUNvbXBpbGVTY29wZXNgIGZvciB0aGlzIG1vZHVsZS5cbiAgICpcbiAgICogVGhpcyBzaG91bGQgbmV2ZXIgYmUgcmVhZCBkaXJlY3RseSwgYnV0IGFjY2Vzc2VkIHZpYSBgdHJhbnNpdGl2ZVNjb3Blc0ZvcmAuXG4gICAqL1xuICB0cmFuc2l0aXZlQ29tcGlsZVNjb3BlczogTmdNb2R1bGVUcmFuc2l0aXZlU2NvcGVzfG51bGw7XG59XG5cbi8qKlxuICogQSB3cmFwcGVyIGFyb3VuZCBhbiBOZ01vZHVsZSB0aGF0IGFzc29jaWF0ZXMgaXQgd2l0aCB0aGUgcHJvdmlkZXJzLlxuICpcbiAqIEBwYXJhbSBUIHRoZSBtb2R1bGUgdHlwZS4gSW4gSXZ5IGFwcGxpY2F0aW9ucywgdGhpcyBtdXN0IGJlIGV4cGxpY2l0bHlcbiAqIHByb3ZpZGVkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsZVdpdGhQcm92aWRlcnM8VCA9IGFueT4ge1xuICBuZ01vZHVsZTogVHlwZTxUPjtcbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcbn1cblxuLyoqXG4gKiBBIHNjaGVtYSBkZWZpbml0aW9uIGFzc29jaWF0ZWQgd2l0aCBhbiBOZ01vZHVsZS5cbiAqIFxuICogQHNlZSBgQE5nTW9kdWxlYCwgYENVU1RPTV9FTEVNRU5UU19TQ0hFTUFgLCBgTk9fRVJST1JTX1NDSEVNQWBcbiAqIFxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgYSBkZWZpbmVkIHNjaGVtYS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2NoZW1hTWV0YWRhdGEgeyBuYW1lOiBzdHJpbmc7IH1cblxuLyoqXG4gKiBEZWZpbmVzIGEgc2NoZW1hIHRoYXQgYWxsb3dzIGFuIE5nTW9kdWxlIHRvIGNvbnRhaW4gdGhlIGZvbGxvd2luZzpcbiAqIC0gTm9uLUFuZ3VsYXIgZWxlbWVudHMgbmFtZWQgd2l0aCBkYXNoIGNhc2UgKGAtYCkuXG4gKiAtIEVsZW1lbnQgcHJvcGVydGllcyBuYW1lZCB3aXRoIGRhc2ggY2FzZSAoYC1gKS5cbiAqIERhc2ggY2FzZSBpcyB0aGUgbmFtaW5nIGNvbnZlbnRpb24gZm9yIGN1c3RvbSBlbGVtZW50cy5cbiAqXG4gKlxuICovXG5leHBvcnQgY29uc3QgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQTogU2NoZW1hTWV0YWRhdGEgPSB7XG4gIG5hbWU6ICdjdXN0b20tZWxlbWVudHMnXG59O1xuXG4vKipcbiAqIERlZmluZXMgYSBzY2hlbWEgdGhhdCBhbGxvd3MgYW55IHByb3BlcnR5IG9uIGFueSBlbGVtZW50LlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IE5PX0VSUk9SU19TQ0hFTUE6IFNjaGVtYU1ldGFkYXRhID0ge1xuICBuYW1lOiAnbm8tZXJyb3JzLXNjaGVtYSdcbn07XG5cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBOZ01vZHVsZSBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nTW9kdWxlRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIE1hcmtzIGEgY2xhc3MgYXMgYW4gTmdNb2R1bGUgYW5kIHN1cHBsaWVzIGNvbmZpZ3VyYXRpb24gbWV0YWRhdGEuXG4gICAqL1xuICAob2JqPzogTmdNb2R1bGUpOiBUeXBlRGVjb3JhdG9yO1xuICBuZXcgKG9iaj86IE5nTW9kdWxlKTogTmdNb2R1bGU7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgTmdNb2R1bGUgbWV0YWRhdGEuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZSB7XG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGluamVjdGFibGUgb2JqZWN0cyB0aGF0IGFyZSBhdmFpbGFibGUgaW4gdGhlIGluamVjdG9yXG4gICAqIG9mIHRoaXMgbW9kdWxlLlxuICAgKiBcbiAgICogQHNlZSBbRGVwZW5kZW5jeSBJbmplY3Rpb24gZ3VpZGVdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uKVxuICAgKiBAc2VlIFtOZ01vZHVsZSBndWlkZV0oZ3VpZGUvcHJvdmlkZXJzKVxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBEZXBlbmRlbmNpZXMgd2hvc2UgcHJvdmlkZXJzIGFyZSBsaXN0ZWQgaGVyZSBiZWNvbWUgYXZhaWxhYmxlIGZvciBpbmplY3Rpb25cbiAgICogaW50byBhbnkgY29tcG9uZW50LCBkaXJlY3RpdmUsIHBpcGUgb3Igc2VydmljZSB0aGF0IGlzIGEgY2hpbGQgb2YgdGhpcyBpbmplY3Rvci5cbiAgICogVGhlIE5nTW9kdWxlIHVzZWQgZm9yIGJvb3RzdHJhcHBpbmcgdXNlcyB0aGUgcm9vdCBpbmplY3RvciwgYW5kIGNhbiBwcm92aWRlIGRlcGVuZGVuY2llc1xuICAgKiB0byBhbnkgcGFydCBvZiB0aGUgYXBwLlxuICAgKiBcbiAgICogQSBsYXp5LWxvYWRlZCBtb2R1bGUgaGFzIGl0cyBvd24gaW5qZWN0b3IsIHR5cGljYWxseSBhIGNoaWxkIG9mIHRoZSBhcHAgcm9vdCBpbmplY3Rvci5cbiAgICogTGF6eS1sb2FkZWQgc2VydmljZXMgYXJlIHNjb3BlZCB0byB0aGUgbGF6eS1sb2FkZWQgbW9kdWxlJ3MgaW5qZWN0b3IuXG4gICAqIElmIGEgbGF6eS1sb2FkZWQgbW9kdWxlIGFsc28gcHJvdmlkZXMgdGhlIGBVc2VyU2VydmljZWAsIGFueSBjb21wb25lbnQgY3JlYXRlZFxuICAgKiB3aXRoaW4gdGhhdCBtb2R1bGUncyBjb250ZXh0IChzdWNoIGFzIGJ5IHJvdXRlciBuYXZpZ2F0aW9uKSBnZXRzIHRoZSBsb2NhbCBpbnN0YW5jZVxuICAgKiBvZiB0aGUgc2VydmljZSwgbm90IHRoZSBpbnN0YW5jZSBpbiB0aGUgcm9vdCBpbmplY3Rvci4gXG4gICAqIENvbXBvbmVudHMgaW4gZXh0ZXJuYWwgbW9kdWxlcyBjb250aW51ZSB0byByZWNlaXZlIHRoZSBpbnN0YW5jZSBwcm92aWRlZCBieSB0aGVpciBpbmplY3RvcnMuXG4gICAqIFxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgZGVmaW5lcyBhIGNsYXNzIHRoYXQgaXMgaW5qZWN0ZWQgaW5cbiAgICogdGhlIEhlbGxvV29ybGQgTmdNb2R1bGU6XG4gICAqXG4gICAqIGBgYFxuICAgKiBjbGFzcyBHcmVldGVyIHtcbiAgICogICAgZ3JlZXQobmFtZTpzdHJpbmcpIHtcbiAgICogICAgICByZXR1cm4gJ0hlbGxvICcgKyBuYW1lICsgJyEnO1xuICAgKiAgICB9XG4gICAqIH1cbiAgICpcbiAgICogQE5nTW9kdWxlKHtcbiAgICogICBwcm92aWRlcnM6IFtcbiAgICogICAgIEdyZWV0ZXJcbiAgICogICBdXG4gICAqIH0pXG4gICAqIGNsYXNzIEhlbGxvV29ybGQge1xuICAgKiAgIGdyZWV0ZXI6R3JlZXRlcjtcbiAgICpcbiAgICogICBjb25zdHJ1Y3RvcihncmVldGVyOkdyZWV0ZXIpIHtcbiAgICogICAgIHRoaXMuZ3JlZXRlciA9IGdyZWV0ZXI7XG4gICAqICAgfVxuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgcHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcblxuICAvKipcbiAgICogVGhlIHNldCBvZiBjb21wb25lbnRzLCBkaXJlY3RpdmVzLCBhbmQgcGlwZXMgKFtkZWNsYXJhYmxlc10oZ3VpZGUvZ2xvc3NhcnkjZGVjbGFyYWJsZSkpXG4gICAqIHRoYXQgYmVsb25nIHRvIHRoaXMgbW9kdWxlLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBUaGUgc2V0IG9mIHNlbGVjdG9ycyB0aGF0IGFyZSBhdmFpbGFibGUgdG8gYSB0ZW1wbGF0ZSBpbmNsdWRlIHRob3NlIGRlY2xhcmVkIGhlcmUsIGFuZFxuICAgKiB0aG9zZSB0aGF0IGFyZSBleHBvcnRlZCBmcm9tIGltcG9ydGVkIE5nTW9kdWxlcy5cbiAgICpcbiAgICogRGVjbGFyYWJsZXMgbXVzdCBiZWxvbmcgdG8gZXhhY3RseSBvbmUgbW9kdWxlLlxuICAgKiBUaGUgY29tcGlsZXIgZW1pdHMgYW4gZXJyb3IgaWYgeW91IHRyeSB0byBkZWNsYXJlIHRoZSBzYW1lIGNsYXNzIGluIG1vcmUgdGhhbiBvbmUgbW9kdWxlLlxuICAgKiBCZSBjYXJlZnVsIG5vdCB0byBkZWNsYXJlIGEgY2xhc3MgdGhhdCBpcyBpbXBvcnRlZCBmcm9tIGFub3RoZXIgbW9kdWxlLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgYWxsb3dzIHRoZSBDb21tb25Nb2R1bGUgdG8gdXNlIHRoZSBgTmdGb3JgXG4gICAqIGRpcmVjdGl2ZS5cbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGRlY2xhcmF0aW9uczogW05nRm9yXVxuICAgKiB9KVxuICAgKiBjbGFzcyBDb21tb25Nb2R1bGUge1xuICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgZGVjbGFyYXRpb25zPzogQXJyYXk8VHlwZTxhbnk+fGFueVtdPjtcblxuICAvKipcbiAgICogVGhlIHNldCBvZiBOZ01vZHVsZXMgd2hvc2UgZXhwb3J0ZWQgW2RlY2xhcmFibGVzXShndWlkZS9nbG9zc2FyeSNkZWNsYXJhYmxlKVxuICAgKiBhcmUgYXZhaWxhYmxlIHRvIHRlbXBsYXRlcyBpbiB0aGlzIG1vZHVsZS5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogQSB0ZW1wbGF0ZSBjYW4gdXNlIGV4cG9ydGVkIGRlY2xhcmFibGVzIGZyb20gYW55XG4gICAqIGltcG9ydGVkIG1vZHVsZSwgaW5jbHVkaW5nIHRob3NlIGZyb20gbW9kdWxlcyB0aGF0IGFyZSBpbXBvcnRlZCBpbmRpcmVjdGx5XG4gICAqIGFuZCByZS1leHBvcnRlZC5cbiAgICogRm9yIGV4YW1wbGUsIGBNb2R1bGVBYCBpbXBvcnRzIGBNb2R1bGVCYCwgYW5kIGFsc28gZXhwb3J0c1xuICAgKiBpdCwgd2hpY2ggbWFrZXMgdGhlIGRlY2xhcmFibGVzIGZyb20gYE1vZHVsZUJgIGF2YWlsYWJsZVxuICAgKiB3aGVyZXZlciBgTW9kdWxlQWAgaXMgaW1wb3J0ZWQuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBhbGxvd3MgTWFpbk1vZHVsZSB0byB1c2UgYW50aGluZyBleHBvcnRlZCBieVxuICAgKiBgQ29tbW9uTW9kdWxlYDpcbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG4gICAqIH0pXG4gICAqIGNsYXNzIE1haW5Nb2R1bGUge1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKi9cbiAgaW1wb3J0cz86IEFycmF5PFR5cGU8YW55PnxNb2R1bGVXaXRoUHJvdmlkZXJzfGFueVtdPjtcblxuICAvKipcbiAgICogVGhlIHNldCBvZiBjb21wb25lbnRzLCBkaXJlY3RpdmVzLCBhbmQgcGlwZXMgZGVjbGFyZWQgaW4gdGhpc1xuICAgKiBOZ01vZHVsZSB0aGF0IGNhbiBiZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZSBvZiBhbnkgY29tcG9uZW50IHRoYXQgaXMgcGFydCBvZiBhblxuICAgKiBOZ01vZHVsZSB0aGF0IGltcG9ydHMgdGhpcyBOZ01vZHVsZS4gRXhwb3J0ZWQgZGVjbGFyYXRpb25zIGFyZSB0aGUgbW9kdWxlJ3MgcHVibGljIEFQSS5cbiAgICpcbiAgICogQSBkZWNsYXJhYmxlIGJlbG9uZ3MgdG8gb25lIGFuZCBvbmx5IG9uZSBOZ01vZHVsZS5cbiAgICogQSBtb2R1bGUgY2FuIGxpc3QgYW5vdGhlciBtb2R1bGUgYW1vbmcgaXRzIGV4cG9ydHMsIGluIHdoaWNoIGNhc2UgYWxsIG9mIHRoYXQgbW9kdWxlJ3NcbiAgICogcHVibGljIGRlY2xhcmF0aW9uIGFyZSBleHBvcnRlZC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogRGVjbGFyYXRpb25zIGFyZSBwcml2YXRlIGJ5IGRlZmF1bHQuXG4gICAqIElmIHRoaXMgTW9kdWxlQSBkb2VzIG5vdCBleHBvcnQgVXNlckNvbXBvbmVudCwgdGhlbiBvbmx5IHRoZSBjb21wb25lbnRzIHdpdGhpbiB0aGlzXG4gICAqIE1vZHVsZUEgY2FuIHVzZSBVc2VyQ29tcG9uZW50LlxuICAgKlxuICAgKiBNb2R1bGVBIGNhbiBpbXBvcnQgTW9kdWxlQiBhbmQgYWxzbyBleHBvcnQgaXQsIG1ha2luZyBleHBvcnRzIGZyb20gTW9kdWxlQlxuICAgKiBhdmFpbGFibGUgdG8gYW4gTmdNb2R1bGUgdGhhdCBpbXBvcnRzIE1vZHVsZUEuXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBleHBvcnRzIHRoZSBgTmdGb3JgIGRpcmVjdGl2ZSBmcm9tIENvbW1vbk1vZHVsZS5cbiAgICpcbiAgICogYGBgamF2YXNjcmlwdFxuICAgKiBATmdNb2R1bGUoe1xuICAgKiAgIGV4cG9ydHM6IFtOZ0Zvcl1cbiAgICogfSlcbiAgICogY2xhc3MgQ29tbW9uTW9kdWxlIHtcbiAgICogfVxuICAgKiBgYGBcbiAgICovXG4gIGV4cG9ydHM/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGNvbXBvbmVudHMgdG8gY29tcGlsZSB3aGVuIHRoaXMgTmdNb2R1bGUgaXMgZGVmaW5lZCxcbiAgICogc28gdGhhdCB0aGV5IGNhbiBiZSBkeW5hbWljYWxseSBsb2FkZWQgaW50byB0aGUgdmlldy5cbiAgICpcbiAgICogRm9yIGVhY2ggY29tcG9uZW50IGxpc3RlZCBoZXJlLCBBbmd1bGFyIGNyZWF0ZXMgYSBgQ29tcG9uZW50RmFjdG9yeWBcbiAgICogYW5kIHN0b3JlcyBpdCBpbiB0aGUgYENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcmAuXG4gICAqXG4gICAqIEFuZ3VsYXIgYXV0b21hdGljYWxseSBhZGRzIGNvbXBvbmVudHMgaW4gdGhlIG1vZHVsZSdzIGJvb3RzdHJhcFxuICAgKiBhbmQgcm91dGUgZGVmaW5pdGlvbnMgaW50byB0aGUgYGVudHJ5Q29tcG9uZW50c2AgbGlzdC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIHRvIGFkZCBjb21wb25lbnRzIHRoYXQgYXJlIGJvb3RzdHJhcHBlZFxuICAgKiB1c2luZyBvbmUgb2YgdGhlIGltcGVyYXRpdmUgdGVjaG5pcXVlcywgc3VjaCBhcyBgVmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoKWAuXG4gICAqXG4gICAqIEBzZWUgW0VudHJ5IENvbXBvbmVudHNdKGd1aWRlL2VudHJ5LWNvbXBvbmVudHMpXG4gICAqL1xuICBlbnRyeUNvbXBvbmVudHM/OiBBcnJheTxUeXBlPGFueT58YW55W10+O1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGNvbXBvbmVudHMgdGhhdCBhcmUgYm9vdHN0cmFwcGVkIHdoZW5cbiAgICogdGhpcyBtb2R1bGUgaXMgYm9vdHN0cmFwcGVkLiBUaGUgY29tcG9uZW50cyBsaXN0ZWQgaGVyZVxuICAgKiBhcmUgYXV0b21hdGljYWxseSBhZGRlZCB0byBgZW50cnlDb21wb25lbnRzYC5cbiAgICovXG4gIGJvb3RzdHJhcD86IEFycmF5PFR5cGU8YW55PnxhbnlbXT47XG5cbiAgLyoqXG4gICAqIFRoZSBzZXQgb2Ygc2NoZW1hcyB0aGF0IGRlY2xhcmUgZWxlbWVudHMgdG8gYmUgYWxsb3dlZCBpbiB0aGUgTmdNb2R1bGUuXG4gICAqIEVsZW1lbnRzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5laXRoZXIgQW5ndWxhciBjb21wb25lbnRzIG5vciBkaXJlY3RpdmVzXG4gICAqIG11c3QgYmUgZGVjbGFyZWQgaW4gYSBzY2hlbWEuXG4gICAqXG4gICAqIEFsbG93ZWQgdmFsdWUgYXJlIGBOT19FUlJPUlNfU0NIRU1BYCBhbmQgYENVU1RPTV9FTEVNRU5UU19TQ0hFTUFgLlxuICAgKlxuICAgKiBAc2VjdXJpdHkgV2hlbiB1c2luZyBvbmUgb2YgYE5PX0VSUk9SU19TQ0hFTUFgIG9yIGBDVVNUT01fRUxFTUVOVFNfU0NIRU1BYFxuICAgKiB5b3UgbXVzdCBlbnN1cmUgdGhhdCBhbGxvd2VkIGVsZW1lbnRzIGFuZCBwcm9wZXJ0aWVzIHNlY3VyZWx5IGVzY2FwZSBpbnB1dHMuXG4gICAqL1xuICBzY2hlbWFzPzogQXJyYXk8U2NoZW1hTWV0YWRhdGF8YW55W10+O1xuXG4gIC8qKlxuICAgKiBBIG5hbWUgb3IgcGF0aCB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhpcyBOZ01vZHVsZSBpbiBgZ2V0TW9kdWxlRmFjdG9yeWAuXG4gICAqIElmIGxlZnQgYHVuZGVmaW5lZGAsIHRoZSBOZ01vZHVsZSBpcyBub3QgcmVnaXN0ZXJlZCB3aXRoXG4gICAqIGBnZXRNb2R1bGVGYWN0b3J5YC5cbiAgICovXG4gIGlkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGlzIG1vZHVsZSB3aWxsIGJlIHNraXBwZWQgYnkgdGhlIEFPVCBjb21waWxlciBhbmQgc28gd2lsbCBhbHdheXMgYmUgY29tcGlsZWRcbiAgICogdXNpbmcgSklULlxuICAgKlxuICAgKiBUaGlzIGV4aXN0cyB0byBzdXBwb3J0IGZ1dHVyZSBJdnkgd29yayBhbmQgaGFzIG5vIGVmZmVjdCBjdXJyZW50bHkuXG4gICAqL1xuICBqaXQ/OiB0cnVlO1xufVxuXG4vKipcbiAqIEBBbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBOZ01vZHVsZTogTmdNb2R1bGVEZWNvcmF0b3IgPSBtYWtlRGVjb3JhdG9yKFxuICAgICdOZ01vZHVsZScsIChuZ01vZHVsZTogTmdNb2R1bGUpID0+IG5nTW9kdWxlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCxcbiAgICAvKipcbiAgICAgKiBEZWNvcmF0b3IgdGhhdCBtYXJrcyB0aGUgZm9sbG93aW5nIGNsYXNzIGFzIGFuIE5nTW9kdWxlLCBhbmQgc3VwcGxpZXNcbiAgICAgKiBjb25maWd1cmF0aW9uIG1ldGFkYXRhIGZvciBpdC5cbiAgICAgKlxuICAgICAqICogVGhlIGBkZWNsYXJhdGlvbnNgIGFuZCBgZW50cnlDb21wb25lbnRzYCBvcHRpb25zIGNvbmZpZ3VyZSB0aGUgY29tcGlsZXJcbiAgICAgKiB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYmVsb25ncyB0byB0aGUgTmdNb2R1bGUuXG4gICAgICogKiBUaGUgYHByb3ZpZGVyc2Agb3B0aW9ucyBjb25maWd1cmVzIHRoZSBOZ01vZHVsZSdzIGluamVjdG9yIHRvIHByb3ZpZGVcbiAgICAgKiBkZXBlbmRlbmNpZXMgdGhlIE5nTW9kdWxlIG1lbWJlcnMuXG4gICAgICogKiBUaGUgYGltcG9ydHNgIGFuZCBgZXhwb3J0c2Agb3B0aW9ucyBicmluZyBpbiBtZW1iZXJzIGZyb20gb3RoZXIgbW9kdWxlcywgYW5kIG1ha2VcbiAgICAgKiB0aGlzIG1vZHVsZSdzIG1lbWJlcnMgYXZhaWxhYmxlIHRvIG90aGVycy5cbiAgICAgKi9cbiAgICAodHlwZTogVHlwZTxhbnk+LCBtZXRhOiBOZ01vZHVsZSkgPT4gUjNfQ09NUElMRV9OR01PRFVMRSh0eXBlLCBtZXRhKSk7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBIb29rIGZvciBtYW51YWwgYm9vdHN0cmFwcGluZyBvZiB0aGUgYXBwbGljYXRpb24gaW5zdGVhZCBvZiB1c2luZyBib290c3RyYXAgYXJyYXkgaW4gQE5nTW9kdWxlXG4gKiBhbm5vdGF0aW9uLlxuICpcbiAqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBhcHBsaWNhdGlvbiBpcyBwcm92aWRlZCBhcyBhIHBhcmFtZXRlci5cbiAqXG4gKiBTZWUgW1wiQm9vdHN0cmFwcGluZ1wiXShndWlkZS9ib290c3RyYXBwaW5nKSBhbmQgW1wiRW50cnkgY29tcG9uZW50c1wiXShndWlkZS9lbnRyeS1jb21wb25lbnRzKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgdHlwZXNjcmlwdFxuICogY2xhc3MgQXBwTW9kdWxlIGltcGxlbWVudHMgRG9Cb290c3RyYXAge1xuICogICBuZ0RvQm9vdHN0cmFwKGFwcFJlZjogQXBwbGljYXRpb25SZWYpIHtcbiAqICAgICBhcHBSZWYuYm9vdHN0cmFwKEFwcENvbXBvbmVudCk7IC8vIE9yIHNvbWUgb3RoZXIgY29tcG9uZW50XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEb0Jvb3RzdHJhcCB7IG5nRG9Cb290c3RyYXAoYXBwUmVmOiBBcHBsaWNhdGlvblJlZik6IHZvaWQ7IH1cbiJdfQ==