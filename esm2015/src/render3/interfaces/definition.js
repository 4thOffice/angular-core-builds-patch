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
/** @typedef {?} */
var ComponentTemplate;
export { ComponentTemplate };
/** @typedef {?} */
var ComponentQuery;
export { ComponentQuery };
/** @enum {number} */
var RenderFlags = {
    /* Whether to run the creation block (e.g. create elements and directives) */
    Create: 1,
    /* Whether to run the update block (e.g. refresh bindings) */
    Update: 2,
};
export { RenderFlags };
/**
 * A subclass of `Type` which has a static `ngComponentDef`:`ComponentDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function ComponentType() { }
/** @type {?} */
ComponentType.prototype.ngComponentDef;
/**
 * A subclass of `Type` which has a static `ngDirectiveDef`:`DirectiveDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function DirectiveType() { }
/** @type {?} */
DirectiveType.prototype.ngDirectiveDef;
/** @enum {number} */
var DirectiveDefFlags = {
    ContentQuery: 2,
};
export { DirectiveDefFlags };
/**
 * A subclass of `Type` which has a static `ngPipeDef`:`PipeDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function PipeType() { }
/** @type {?} */
PipeType.prototype.ngPipeDef;
/** @typedef {?} */
var DirectiveDefWithMeta;
export { DirectiveDefWithMeta };
/**
 * Runtime information for classes that are inherited by components or directives
 * that aren't defined as components or directives.
 *
 * This is an internal data structure used by the render to determine what inputs
 * and outputs should be inherited.
 *
 * See: {\@link defineBase}
 * @record
 * @template T
 */
export function BaseDef() { }
/**
 * A dictionary mapping the inputs' minified property names to their public API names, which
 * are their aliases if any, or their original unminified property names
 * (as in `\@Input('alias') propertyName: any;`).
 * @type {?}
 */
BaseDef.prototype.inputs;
/**
 * @deprecated This is only here because `NgOnChanges` incorrectly uses declared name instead of
 * public or minified name.
 * @type {?}
 */
BaseDef.prototype.declaredInputs;
/**
 * A dictionary mapping the outputs' minified property names to their public API names, which
 * are their aliases if any, or their original unminified property names
 * (as in `\@Output('alias') propertyName: any;`).
 * @type {?}
 */
BaseDef.prototype.outputs;
/**
 * Runtime link information for Directives.
 *
 * This is internal data structure used by the render to link
 * directives into templates.
 *
 * NOTE: Always use `defineDirective` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * @param Selector type metadata specifying the selector of the directive or component
 *
 * See: {\@link defineDirective}
 * @record
 * @template T
 */
export function DirectiveDef() { }
/**
 * Token representing the directive. Used by DI.
 * @type {?}
 */
DirectiveDef.prototype.type;
/**
 * Function that resolves providers and publishes them into the DI system.
 * @type {?}
 */
DirectiveDef.prototype.providersResolver;
/**
 * The selectors that will be used to match nodes to this directive.
 * @type {?}
 */
DirectiveDef.prototype.selectors;
/**
 * Name under which the directive is exported (for use with local references in template)
 * @type {?}
 */
DirectiveDef.prototype.exportAs;
/**
 * Factory function used to create a new directive instance.
 * @type {?}
 */
DirectiveDef.prototype.factory;
/**
 * Function to create instances of content queries associated with a given directive.
 * @type {?}
 */
DirectiveDef.prototype.contentQueries;
/**
 * Refreshes content queries associated with directives in a given view
 * @type {?}
 */
DirectiveDef.prototype.contentQueriesRefresh;
/**
 * The number of host bindings (including pure fn bindings) in this directive/component.
 *
 * Used to calculate the length of the LView array for the *parent* component
 * of this directive/component.
 * @type {?}
 */
DirectiveDef.prototype.hostVars;
/**
 * Refreshes host bindings on the associated directive.
 * @type {?}
 */
DirectiveDef.prototype.hostBindings;
/**
 * Static attributes to set on host element.
 *
 * Even indices: attribute name
 * Odd indices: attribute value
 * @type {?}
 */
DirectiveDef.prototype.attributes;
/** @type {?} */
DirectiveDef.prototype.onInit;
/** @type {?} */
DirectiveDef.prototype.doCheck;
/** @type {?} */
DirectiveDef.prototype.afterContentInit;
/** @type {?} */
DirectiveDef.prototype.afterContentChecked;
/** @type {?} */
DirectiveDef.prototype.afterViewInit;
/** @type {?} */
DirectiveDef.prototype.afterViewChecked;
/** @type {?} */
DirectiveDef.prototype.onDestroy;
/**
 * The features applied to this directive
 * @type {?}
 */
DirectiveDef.prototype.features;
/** @typedef {?} */
var ComponentDefWithMeta;
export { ComponentDefWithMeta };
/**
 * Runtime link information for Components.
 *
 * This is internal data structure used by the render to link
 * components into templates.
 *
 * NOTE: Always use `defineComponent` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {\@link defineComponent}
 * @record
 * @template T
 */
export function ComponentDef() { }
/**
 * Runtime unique component ID.
 * @type {?}
 */
ComponentDef.prototype.id;
/**
 * The View template of the component.
 * @type {?}
 */
ComponentDef.prototype.template;
/**
 * A set of styles that the component needs to be present for component to render correctly.
 * @type {?}
 */
ComponentDef.prototype.styles;
/**
 * The number of nodes, local refs, and pipes in this component template.
 *
 * Used to calculate the length of the component's LView array, so we
 * can pre-fill the array and set the binding start index.
 * @type {?}
 */
ComponentDef.prototype.consts;
/**
 * The number of bindings in this component template (including pure fn bindings).
 *
 * Used to calculate the length of the component's LView array, so we
 * can pre-fill the array and set the host binding start index.
 * @type {?}
 */
ComponentDef.prototype.vars;
/**
 * Query-related instructions for a component.
 * @type {?}
 */
ComponentDef.prototype.viewQuery;
/**
 * The view encapsulation type, which determines how styles are applied to
 * DOM elements. One of
 * - `Emulated` (default): Emulate native scoping of styles.
 * - `Native`: Use the native encapsulation mechanism of the renderer.
 * - `ShadowDom`: Use modern [ShadowDOM](https://w3c.github.io/webcomponents/spec/shadow/) and
 *   create a ShadowRoot for component's host element.
 * - `None`: Do not provide any template or style encapsulation.
 * @type {?}
 */
ComponentDef.prototype.encapsulation;
/**
 * Defines arbitrary developer-defined data to be stored on a renderer instance.
 * This is useful for renderers that delegate to other renderers.
 * @type {?}
 */
ComponentDef.prototype.data;
/**
 * Whether or not this component's ChangeDetectionStrategy is OnPush
 * @type {?}
 */
ComponentDef.prototype.onPush;
/**
 * Registry of directives and components that may be found in this view.
 *
 * The property is either an array of `DirectiveDef`s or a function which returns the array of
 * `DirectiveDef`s. The function is necessary to be able to support forward declarations.
 * @type {?}
 */
ComponentDef.prototype.directiveDefs;
/**
 * Registry of pipes that may be found in this view.
 *
 * The property is either an array of `PipeDefs`s or a function which returns the array of
 * `PipeDefs`s. The function is necessary to be able to support forward declarations.
 * @type {?}
 */
ComponentDef.prototype.pipeDefs;
/**
 * Used to store the result of `noSideEffects` function so that it is not removed by closure
 * compiler. The property should never be read.
 * @type {?|undefined}
 */
ComponentDef.prototype._;
/**
 * Runtime link information for Pipes.
 *
 * This is internal data structure used by the renderer to link
 * pipes into templates.
 *
 * NOTE: Always use `definePipe` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 *
 * See: {\@link definePipe}
 * @record
 * @template T
 */
export function PipeDef() { }
/**
 * Pipe name.
 *
 * Used to resolve pipe in templates.
 * @type {?}
 */
PipeDef.prototype.name;
/**
 * Factory function used to create a new pipe instance.
 * @type {?}
 */
PipeDef.prototype.factory;
/**
 * Whether or not the pipe is pure.
 *
 * Pure pipes result only depends on the pipe input and not on internal
 * state of the pipe.
 * @type {?}
 */
PipeDef.prototype.pure;
/** @type {?} */
PipeDef.prototype.onDestroy;
/** @typedef {?} */
var PipeDefWithMeta;
export { PipeDefWithMeta };
/**
 * @record
 */
export function DirectiveDefFeature() { }
/* TODO: handle strange member:
<T>(directiveDef: DirectiveDef<T>): void;
*/
/** @type {?|undefined} */
DirectiveDefFeature.prototype.ngInherit;
/**
 * @record
 */
export function ComponentDefFeature() { }
/* TODO: handle strange member:
<T>(componentDef: ComponentDef<T>): void;
*/
/** @type {?|undefined} */
ComponentDefFeature.prototype.ngInherit;
/** @typedef {?} */
var DirectiveDefListOrFactory;
export { DirectiveDefListOrFactory };
/** @typedef {?} */
var DirectiveDefList;
export { DirectiveDefList };
/** @typedef {?} */
var DirectiveTypesOrFactory;
export { DirectiveTypesOrFactory };
/** @typedef {?} */
var DirectiveTypeList;
export { DirectiveTypeList };
/** @typedef {?} */
var HostBindingsFunction;
export { HostBindingsFunction };
/** @typedef {?} */
var PipeDefListOrFactory;
export { PipeDefListOrFactory };
/** @typedef {?} */
var PipeDefList;
export { PipeDefList };
/** @typedef {?} */
var PipeTypesOrFactory;
export { PipeTypesOrFactory };
/** @typedef {?} */
var PipeTypeList;
export { PipeTypeList };
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;
/** @enum {number} */
var InitialStylingFlags = {
    VALUES_MODE: 1,
};
export { InitialStylingFlags };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUNFLFNBQWE7O0lBR2IsU0FBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFlc0IsZUFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNlN4RCxhQUFhLDZCQUE2QixHQUFHLENBQUMsQ0FBQzs7O0lBRzdDLGNBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi8uLi9jb3JlJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge0Nzc1NlbGVjdG9yTGlzdH0gZnJvbSAnLi9wcm9qZWN0aW9uJztcblxuXG4vKipcbiAqIERlZmluaXRpb24gb2Ygd2hhdCBhIHRlbXBsYXRlIHJlbmRlcmluZyBmdW5jdGlvbiBzaG91bGQgbG9vayBsaWtlIGZvciBhIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9uZW50VGVtcGxhdGU8VD4gPSB7XG4gIChyZjogUmVuZGVyRmxhZ3MsIGN0eDogVCk6IHZvaWQ7IG5nUHJpdmF0ZURhdGE/OiBuZXZlcjtcbn07XG5cbi8qKlxuICogRGVmaW5pdGlvbiBvZiB3aGF0IGEgcXVlcnkgZnVuY3Rpb24gc2hvdWxkIGxvb2sgbGlrZS5cbiAqL1xuZXhwb3J0IHR5cGUgQ29tcG9uZW50UXVlcnk8VD4gPSBDb21wb25lbnRUZW1wbGF0ZTxUPjtcblxuLyoqXG4gKiBGbGFncyBwYXNzZWQgaW50byB0ZW1wbGF0ZSBmdW5jdGlvbnMgdG8gZGV0ZXJtaW5lIHdoaWNoIGJsb2NrcyAoaS5lLiBjcmVhdGlvbiwgdXBkYXRlKVxuICogc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICpcbiAqIFR5cGljYWxseSwgYSB0ZW1wbGF0ZSBydW5zIGJvdGggdGhlIGNyZWF0aW9uIGJsb2NrIGFuZCB0aGUgdXBkYXRlIGJsb2NrIG9uIGluaXRpYWxpemF0aW9uIGFuZFxuICogc3Vic2VxdWVudCBydW5zIG9ubHkgZXhlY3V0ZSB0aGUgdXBkYXRlIGJsb2NrLiBIb3dldmVyLCBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzIHJlcXVpcmUgdGhhdFxuICogdGhlIGNyZWF0aW9uIGJsb2NrIGJlIGV4ZWN1dGVkIHNlcGFyYXRlbHkgZnJvbSB0aGUgdXBkYXRlIGJsb2NrIChmb3IgYmFja3dhcmRzIGNvbXBhdCkuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFJlbmRlckZsYWdzIHtcbiAgLyogV2hldGhlciB0byBydW4gdGhlIGNyZWF0aW9uIGJsb2NrIChlLmcuIGNyZWF0ZSBlbGVtZW50cyBhbmQgZGlyZWN0aXZlcykgKi9cbiAgQ3JlYXRlID0gMGIwMSxcblxuICAvKiBXaGV0aGVyIHRvIHJ1biB0aGUgdXBkYXRlIGJsb2NrIChlLmcuIHJlZnJlc2ggYmluZGluZ3MpICovXG4gIFVwZGF0ZSA9IDBiMTBcbn1cblxuLyoqXG4gKiBBIHN1YmNsYXNzIG9mIGBUeXBlYCB3aGljaCBoYXMgYSBzdGF0aWMgYG5nQ29tcG9uZW50RGVmYDpgQ29tcG9uZW50RGVmYCBmaWVsZCBtYWtpbmcgaXRcbiAqIGNvbnN1bWFibGUgZm9yIHJlbmRlcmluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7IG5nQ29tcG9uZW50RGVmOiBuZXZlcjsgfVxuXG4vKipcbiAqIEEgc3ViY2xhc3Mgb2YgYFR5cGVgIHdoaWNoIGhhcyBhIHN0YXRpYyBgbmdEaXJlY3RpdmVEZWZgOmBEaXJlY3RpdmVEZWZgIGZpZWxkIG1ha2luZyBpdFxuICogY29uc3VtYWJsZSBmb3IgcmVuZGVyaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdGl2ZVR5cGU8VD4gZXh0ZW5kcyBUeXBlPFQ+IHsgbmdEaXJlY3RpdmVEZWY6IG5ldmVyOyB9XG5cbmV4cG9ydCBjb25zdCBlbnVtIERpcmVjdGl2ZURlZkZsYWdzIHtDb250ZW50UXVlcnkgPSAwYjEwfVxuXG4vKipcbiAqIEEgc3ViY2xhc3Mgb2YgYFR5cGVgIHdoaWNoIGhhcyBhIHN0YXRpYyBgbmdQaXBlRGVmYDpgUGlwZURlZmAgZmllbGQgbWFraW5nIGl0XG4gKiBjb25zdW1hYmxlIGZvciByZW5kZXJpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGlwZVR5cGU8VD4gZXh0ZW5kcyBUeXBlPFQ+IHsgbmdQaXBlRGVmOiBuZXZlcjsgfVxuXG5leHBvcnQgdHlwZSBEaXJlY3RpdmVEZWZXaXRoTWV0YTxcbiAgICBULCBTZWxlY3RvciBleHRlbmRzIHN0cmluZywgRXhwb3J0QXMgZXh0ZW5kcyBzdHJpbmcsIElucHV0TWFwIGV4dGVuZHN7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBPdXRwdXRNYXAgZXh0ZW5kc3tba2V5OiBzdHJpbmddOiBzdHJpbmd9LCBRdWVyeUZpZWxkcyBleHRlbmRzIHN0cmluZ1tdPiA9IERpcmVjdGl2ZURlZjxUPjtcblxuLyoqXG4gKiBSdW50aW1lIGluZm9ybWF0aW9uIGZvciBjbGFzc2VzIHRoYXQgYXJlIGluaGVyaXRlZCBieSBjb21wb25lbnRzIG9yIGRpcmVjdGl2ZXNcbiAqIHRoYXQgYXJlbid0IGRlZmluZWQgYXMgY29tcG9uZW50cyBvciBkaXJlY3RpdmVzLlxuICpcbiAqIFRoaXMgaXMgYW4gaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdXNlZCBieSB0aGUgcmVuZGVyIHRvIGRldGVybWluZSB3aGF0IGlucHV0c1xuICogYW5kIG91dHB1dHMgc2hvdWxkIGJlIGluaGVyaXRlZC5cbiAqXG4gKiBTZWU6IHtAbGluayBkZWZpbmVCYXNlfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VEZWY8VD4ge1xuICAvKipcbiAgICogQSBkaWN0aW9uYXJ5IG1hcHBpbmcgdGhlIGlucHV0cycgbWluaWZpZWQgcHJvcGVydHkgbmFtZXMgdG8gdGhlaXIgcHVibGljIEFQSSBuYW1lcywgd2hpY2hcbiAgICogYXJlIHRoZWlyIGFsaWFzZXMgaWYgYW55LCBvciB0aGVpciBvcmlnaW5hbCB1bm1pbmlmaWVkIHByb3BlcnR5IG5hbWVzXG4gICAqIChhcyBpbiBgQElucHV0KCdhbGlhcycpIHByb3BlcnR5TmFtZTogYW55O2ApLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXRzOiB7W1AgaW4ga2V5b2YgVF06IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgaXMgb25seSBoZXJlIGJlY2F1c2UgYE5nT25DaGFuZ2VzYCBpbmNvcnJlY3RseSB1c2VzIGRlY2xhcmVkIG5hbWUgaW5zdGVhZCBvZlxuICAgKiBwdWJsaWMgb3IgbWluaWZpZWQgbmFtZS5cbiAgICovXG4gIHJlYWRvbmx5IGRlY2xhcmVkSW5wdXRzOiB7W1AgaW4ga2V5b2YgVF06IFB9O1xuXG4gIC8qKlxuICAgKiBBIGRpY3Rpb25hcnkgbWFwcGluZyB0aGUgb3V0cHV0cycgbWluaWZpZWQgcHJvcGVydHkgbmFtZXMgdG8gdGhlaXIgcHVibGljIEFQSSBuYW1lcywgd2hpY2hcbiAgICogYXJlIHRoZWlyIGFsaWFzZXMgaWYgYW55LCBvciB0aGVpciBvcmlnaW5hbCB1bm1pbmlmaWVkIHByb3BlcnR5IG5hbWVzXG4gICAqIChhcyBpbiBgQE91dHB1dCgnYWxpYXMnKSBwcm9wZXJ0eU5hbWU6IGFueTtgKS5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dHM6IHtbUCBpbiBrZXlvZiBUXTogUH07XG59XG5cbi8qKlxuICogUnVudGltZSBsaW5rIGluZm9ybWF0aW9uIGZvciBEaXJlY3RpdmVzLlxuICpcbiAqIFRoaXMgaXMgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdXNlZCBieSB0aGUgcmVuZGVyIHRvIGxpbmtcbiAqIGRpcmVjdGl2ZXMgaW50byB0ZW1wbGF0ZXMuXG4gKlxuICogTk9URTogQWx3YXlzIHVzZSBgZGVmaW5lRGlyZWN0aXZlYCBmdW5jdGlvbiB0byBjcmVhdGUgdGhpcyBvYmplY3QsXG4gKiBuZXZlciBjcmVhdGUgdGhlIG9iamVjdCBkaXJlY3RseSBzaW5jZSB0aGUgc2hhcGUgb2YgdGhpcyBvYmplY3RcbiAqIGNhbiBjaGFuZ2UgYmV0d2VlbiB2ZXJzaW9ucy5cbiAqXG4gKiBAcGFyYW0gU2VsZWN0b3IgdHlwZSBtZXRhZGF0YSBzcGVjaWZ5aW5nIHRoZSBzZWxlY3RvciBvZiB0aGUgZGlyZWN0aXZlIG9yIGNvbXBvbmVudFxuICpcbiAqIFNlZToge0BsaW5rIGRlZmluZURpcmVjdGl2ZX1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVEZWY8VD4gZXh0ZW5kcyBCYXNlRGVmPFQ+IHtcbiAgLyoqIFRva2VuIHJlcHJlc2VudGluZyB0aGUgZGlyZWN0aXZlLiBVc2VkIGJ5IERJLiAqL1xuICB0eXBlOiBUeXBlPFQ+O1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJlc29sdmVzIHByb3ZpZGVycyBhbmQgcHVibGlzaGVzIHRoZW0gaW50byB0aGUgREkgc3lzdGVtLiAqL1xuICBwcm92aWRlcnNSZXNvbHZlcjogKChkZWY6IERpcmVjdGl2ZURlZjxUPikgPT4gdm9pZCl8bnVsbDtcblxuICAvKiogVGhlIHNlbGVjdG9ycyB0aGF0IHdpbGwgYmUgdXNlZCB0byBtYXRjaCBub2RlcyB0byB0aGlzIGRpcmVjdGl2ZS4gKi9cbiAgcmVhZG9ubHkgc2VsZWN0b3JzOiBDc3NTZWxlY3Rvckxpc3Q7XG5cbiAgLyoqXG4gICAqIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBleHBvcnRlZCAoZm9yIHVzZSB3aXRoIGxvY2FsIHJlZmVyZW5jZXMgaW4gdGVtcGxhdGUpXG4gICAqL1xuICByZWFkb25seSBleHBvcnRBczogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIEZhY3RvcnkgZnVuY3Rpb24gdXNlZCB0byBjcmVhdGUgYSBuZXcgZGlyZWN0aXZlIGluc3RhbmNlLlxuICAgKi9cbiAgZmFjdG9yeTogKHQ6IFR5cGU8VD58bnVsbCkgPT4gVDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGluc3RhbmNlcyBvZiBjb250ZW50IHF1ZXJpZXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gZGlyZWN0aXZlLlxuICAgKi9cbiAgY29udGVudFF1ZXJpZXM6ICgoZGlyZWN0aXZlSW5kZXg6IG51bWJlcikgPT4gdm9pZCl8bnVsbDtcblxuICAvKiogUmVmcmVzaGVzIGNvbnRlbnQgcXVlcmllcyBhc3NvY2lhdGVkIHdpdGggZGlyZWN0aXZlcyBpbiBhIGdpdmVuIHZpZXcgKi9cbiAgY29udGVudFF1ZXJpZXNSZWZyZXNoOiAoKGRpcmVjdGl2ZUluZGV4OiBudW1iZXIsIHF1ZXJ5SW5kZXg6IG51bWJlcikgPT4gdm9pZCl8bnVsbDtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBob3N0IGJpbmRpbmdzIChpbmNsdWRpbmcgcHVyZSBmbiBiaW5kaW5ncykgaW4gdGhpcyBkaXJlY3RpdmUvY29tcG9uZW50LlxuICAgKlxuICAgKiBVc2VkIHRvIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBMVmlldyBhcnJheSBmb3IgdGhlICpwYXJlbnQqIGNvbXBvbmVudFxuICAgKiBvZiB0aGlzIGRpcmVjdGl2ZS9jb21wb25lbnQuXG4gICAqL1xuICByZWFkb25seSBob3N0VmFyczogbnVtYmVyO1xuXG4gIC8qKiBSZWZyZXNoZXMgaG9zdCBiaW5kaW5ncyBvbiB0aGUgYXNzb2NpYXRlZCBkaXJlY3RpdmUuICovXG4gIGhvc3RCaW5kaW5nczogSG9zdEJpbmRpbmdzRnVuY3Rpb248VD58bnVsbDtcblxuICAvKipcbiAgICogU3RhdGljIGF0dHJpYnV0ZXMgdG8gc2V0IG9uIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBhdHRyaWJ1dGUgbmFtZVxuICAgKiBPZGQgaW5kaWNlczogYXR0cmlidXRlIHZhbHVlXG4gICAqL1xuICByZWFkb25seSBhdHRyaWJ1dGVzOiBzdHJpbmdbXXxudWxsO1xuXG4gIC8qIFRoZSBmb2xsb3dpbmcgYXJlIGxpZmVjeWNsZSBob29rcyBmb3IgdGhpcyBjb21wb25lbnQgKi9cbiAgb25Jbml0OiAoKCkgPT4gdm9pZCl8bnVsbDtcbiAgZG9DaGVjazogKCgpID0+IHZvaWQpfG51bGw7XG4gIGFmdGVyQ29udGVudEluaXQ6ICgoKSA9PiB2b2lkKXxudWxsO1xuICBhZnRlckNvbnRlbnRDaGVja2VkOiAoKCkgPT4gdm9pZCl8bnVsbDtcbiAgYWZ0ZXJWaWV3SW5pdDogKCgpID0+IHZvaWQpfG51bGw7XG4gIGFmdGVyVmlld0NoZWNrZWQ6ICgoKSA9PiB2b2lkKXxudWxsO1xuICBvbkRlc3Ryb3k6ICgoKSA9PiB2b2lkKXxudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgZmVhdHVyZXMgYXBwbGllZCB0byB0aGlzIGRpcmVjdGl2ZVxuICAgKi9cbiAgcmVhZG9ubHkgZmVhdHVyZXM6IERpcmVjdGl2ZURlZkZlYXR1cmVbXXxudWxsO1xufVxuXG5leHBvcnQgdHlwZSBDb21wb25lbnREZWZXaXRoTWV0YTxcbiAgICBULCBTZWxlY3RvciBleHRlbmRzIFN0cmluZywgRXhwb3J0QXMgZXh0ZW5kcyBzdHJpbmcsIElucHV0TWFwIGV4dGVuZHN7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBPdXRwdXRNYXAgZXh0ZW5kc3tba2V5OiBzdHJpbmddOiBzdHJpbmd9LCBRdWVyeUZpZWxkcyBleHRlbmRzIHN0cmluZ1tdPiA9IENvbXBvbmVudERlZjxUPjtcblxuLyoqXG4gKiBSdW50aW1lIGxpbmsgaW5mb3JtYXRpb24gZm9yIENvbXBvbmVudHMuXG4gKlxuICogVGhpcyBpcyBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZSB1c2VkIGJ5IHRoZSByZW5kZXIgdG8gbGlua1xuICogY29tcG9uZW50cyBpbnRvIHRlbXBsYXRlcy5cbiAqXG4gKiBOT1RFOiBBbHdheXMgdXNlIGBkZWZpbmVDb21wb25lbnRgIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGlzIG9iamVjdCxcbiAqIG5ldmVyIGNyZWF0ZSB0aGUgb2JqZWN0IGRpcmVjdGx5IHNpbmNlIHRoZSBzaGFwZSBvZiB0aGlzIG9iamVjdFxuICogY2FuIGNoYW5nZSBiZXR3ZWVuIHZlcnNpb25zLlxuICpcbiAqIFNlZToge0BsaW5rIGRlZmluZUNvbXBvbmVudH1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnREZWY8VD4gZXh0ZW5kcyBEaXJlY3RpdmVEZWY8VD4ge1xuICAvKipcbiAgICogUnVudGltZSB1bmlxdWUgY29tcG9uZW50IElELlxuICAgKi9cbiAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIFZpZXcgdGVtcGxhdGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHJlYWRvbmx5IHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTxUPjtcblxuICAvKipcbiAgICogQSBzZXQgb2Ygc3R5bGVzIHRoYXQgdGhlIGNvbXBvbmVudCBuZWVkcyB0byBiZSBwcmVzZW50IGZvciBjb21wb25lbnQgdG8gcmVuZGVyIGNvcnJlY3RseS5cbiAgICovXG4gIHJlYWRvbmx5IHN0eWxlczogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2Ygbm9kZXMsIGxvY2FsIHJlZnMsIGFuZCBwaXBlcyBpbiB0aGlzIGNvbXBvbmVudCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVXNlZCB0byBjYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgY29tcG9uZW50J3MgTFZpZXcgYXJyYXksIHNvIHdlXG4gICAqIGNhbiBwcmUtZmlsbCB0aGUgYXJyYXkgYW5kIHNldCB0aGUgYmluZGluZyBzdGFydCBpbmRleC5cbiAgICovXG4gIC8vIFRPRE8oa2FyYSk6IHJlbW92ZSBxdWVyaWVzIGZyb20gdGhpcyBjb3VudFxuICByZWFkb25seSBjb25zdHM6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBiaW5kaW5ncyBpbiB0aGlzIGNvbXBvbmVudCB0ZW1wbGF0ZSAoaW5jbHVkaW5nIHB1cmUgZm4gYmluZGluZ3MpLlxuICAgKlxuICAgKiBVc2VkIHRvIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBjb21wb25lbnQncyBMVmlldyBhcnJheSwgc28gd2VcbiAgICogY2FuIHByZS1maWxsIHRoZSBhcnJheSBhbmQgc2V0IHRoZSBob3N0IGJpbmRpbmcgc3RhcnQgaW5kZXguXG4gICAqL1xuICByZWFkb25seSB2YXJzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFF1ZXJ5LXJlbGF0ZWQgaW5zdHJ1Y3Rpb25zIGZvciBhIGNvbXBvbmVudC5cbiAgICovXG4gIHZpZXdRdWVyeTogQ29tcG9uZW50UXVlcnk8VD58bnVsbDtcblxuICAvKipcbiAgICogVGhlIHZpZXcgZW5jYXBzdWxhdGlvbiB0eXBlLCB3aGljaCBkZXRlcm1pbmVzIGhvdyBzdHlsZXMgYXJlIGFwcGxpZWQgdG9cbiAgICogRE9NIGVsZW1lbnRzLiBPbmUgb2ZcbiAgICogLSBgRW11bGF0ZWRgIChkZWZhdWx0KTogRW11bGF0ZSBuYXRpdmUgc2NvcGluZyBvZiBzdHlsZXMuXG4gICAqIC0gYE5hdGl2ZWA6IFVzZSB0aGUgbmF0aXZlIGVuY2Fwc3VsYXRpb24gbWVjaGFuaXNtIG9mIHRoZSByZW5kZXJlci5cbiAgICogLSBgU2hhZG93RG9tYDogVXNlIG1vZGVybiBbU2hhZG93RE9NXShodHRwczovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL3NoYWRvdy8pIGFuZFxuICAgKiAgIGNyZWF0ZSBhIFNoYWRvd1Jvb3QgZm9yIGNvbXBvbmVudCdzIGhvc3QgZWxlbWVudC5cbiAgICogLSBgTm9uZWA6IERvIG5vdCBwcm92aWRlIGFueSB0ZW1wbGF0ZSBvciBzdHlsZSBlbmNhcHN1bGF0aW9uLlxuICAgKi9cbiAgcmVhZG9ubHkgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG5cbiAgLyoqXG4gICAqIERlZmluZXMgYXJiaXRyYXJ5IGRldmVsb3Blci1kZWZpbmVkIGRhdGEgdG8gYmUgc3RvcmVkIG9uIGEgcmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGZvciByZW5kZXJlcnMgdGhhdCBkZWxlZ2F0ZSB0byBvdGhlciByZW5kZXJlcnMuXG4gICAqL1xuICByZWFkb25seSBkYXRhOiB7W2tpbmQ6IHN0cmluZ106IGFueX07XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9uZW50J3MgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgaXMgT25QdXNoICovXG4gIHJlYWRvbmx5IG9uUHVzaDogYm9vbGVhbjtcblxuICAvKipcblxuICAgKiBSZWdpc3RyeSBvZiBkaXJlY3RpdmVzIGFuZCBjb21wb25lbnRzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogVGhlIHByb3BlcnR5IGlzIGVpdGhlciBhbiBhcnJheSBvZiBgRGlyZWN0aXZlRGVmYHMgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSBhcnJheSBvZlxuICAgKiBgRGlyZWN0aXZlRGVmYHMuIFRoZSBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgdG8gYmUgYWJsZSB0byBzdXBwb3J0IGZvcndhcmQgZGVjbGFyYXRpb25zLlxuICAgKi9cbiAgZGlyZWN0aXZlRGVmczogRGlyZWN0aXZlRGVmTGlzdE9yRmFjdG9yeXxudWxsO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RyeSBvZiBwaXBlcyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIHZpZXcuXG4gICAqXG4gICAqIFRoZSBwcm9wZXJ0eSBpcyBlaXRoZXIgYW4gYXJyYXkgb2YgYFBpcGVEZWZzYHMgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSBhcnJheSBvZlxuICAgKiBgUGlwZURlZnNgcy4gVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gICAqL1xuICBwaXBlRGVmczogUGlwZURlZkxpc3RPckZhY3Rvcnl8bnVsbDtcblxuICAvKipcbiAgICogVXNlZCB0byBzdG9yZSB0aGUgcmVzdWx0IG9mIGBub1NpZGVFZmZlY3RzYCBmdW5jdGlvbiBzbyB0aGF0IGl0IGlzIG5vdCByZW1vdmVkIGJ5IGNsb3N1cmVcbiAgICogY29tcGlsZXIuIFRoZSBwcm9wZXJ0eSBzaG91bGQgbmV2ZXIgYmUgcmVhZC5cbiAgICovXG4gIHJlYWRvbmx5IF8/OiBuZXZlcjtcbn1cblxuLyoqXG4gKiBSdW50aW1lIGxpbmsgaW5mb3JtYXRpb24gZm9yIFBpcGVzLlxuICpcbiAqIFRoaXMgaXMgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdXNlZCBieSB0aGUgcmVuZGVyZXIgdG8gbGlua1xuICogcGlwZXMgaW50byB0ZW1wbGF0ZXMuXG4gKlxuICogTk9URTogQWx3YXlzIHVzZSBgZGVmaW5lUGlwZWAgZnVuY3Rpb24gdG8gY3JlYXRlIHRoaXMgb2JqZWN0LFxuICogbmV2ZXIgY3JlYXRlIHRoZSBvYmplY3QgZGlyZWN0bHkgc2luY2UgdGhlIHNoYXBlIG9mIHRoaXMgb2JqZWN0XG4gKiBjYW4gY2hhbmdlIGJldHdlZW4gdmVyc2lvbnMuXG4gKlxuICogU2VlOiB7QGxpbmsgZGVmaW5lUGlwZX1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQaXBlRGVmPFQ+IHtcbiAgLyoqXG4gICAqIFBpcGUgbmFtZS5cbiAgICpcbiAgICogVXNlZCB0byByZXNvbHZlIHBpcGUgaW4gdGVtcGxhdGVzLlxuICAgKi9cbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IGZ1bmN0aW9uIHVzZWQgdG8gY3JlYXRlIGEgbmV3IHBpcGUgaW5zdGFuY2UuXG4gICAqL1xuICBmYWN0b3J5OiAodDogVHlwZTxUPnxudWxsKSA9PiBUO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgcGlwZSBpcyBwdXJlLlxuICAgKlxuICAgKiBQdXJlIHBpcGVzIHJlc3VsdCBvbmx5IGRlcGVuZHMgb24gdGhlIHBpcGUgaW5wdXQgYW5kIG5vdCBvbiBpbnRlcm5hbFxuICAgKiBzdGF0ZSBvZiB0aGUgcGlwZS5cbiAgICovXG4gIHJlYWRvbmx5IHB1cmU6IGJvb2xlYW47XG5cbiAgLyogVGhlIGZvbGxvd2luZyBhcmUgbGlmZWN5Y2xlIGhvb2tzIGZvciB0aGlzIHBpcGUgKi9cbiAgb25EZXN0cm95OiAoKCkgPT4gdm9pZCl8bnVsbDtcbn1cblxuZXhwb3J0IHR5cGUgUGlwZURlZldpdGhNZXRhPFQsIE5hbWUgZXh0ZW5kcyBzdHJpbmc+ID0gUGlwZURlZjxUPjtcblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVEZWZGZWF0dXJlIHtcbiAgPFQ+KGRpcmVjdGl2ZURlZjogRGlyZWN0aXZlRGVmPFQ+KTogdm9pZDtcbiAgbmdJbmhlcml0PzogdHJ1ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnREZWZGZWF0dXJlIHtcbiAgPFQ+KGNvbXBvbmVudERlZjogQ29tcG9uZW50RGVmPFQ+KTogdm9pZDtcbiAgbmdJbmhlcml0PzogdHJ1ZTtcbn1cblxuXG4vKipcbiAqIFR5cGUgdXNlZCBmb3IgZGlyZWN0aXZlRGVmcyBvbiBjb21wb25lbnQgZGVmaW5pdGlvbi5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAqL1xuZXhwb3J0IHR5cGUgRGlyZWN0aXZlRGVmTGlzdE9yRmFjdG9yeSA9ICgoKSA9PiBEaXJlY3RpdmVEZWZMaXN0KSB8IERpcmVjdGl2ZURlZkxpc3Q7XG5cbmV4cG9ydCB0eXBlIERpcmVjdGl2ZURlZkxpc3QgPSAoRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+KVtdO1xuXG5leHBvcnQgdHlwZSBEaXJlY3RpdmVUeXBlc09yRmFjdG9yeSA9ICgoKSA9PiBEaXJlY3RpdmVUeXBlTGlzdCkgfCBEaXJlY3RpdmVUeXBlTGlzdDtcblxuZXhwb3J0IHR5cGUgRGlyZWN0aXZlVHlwZUxpc3QgPVxuICAgIChEaXJlY3RpdmVEZWY8YW55PnwgQ29tcG9uZW50RGVmPGFueT58XG4gICAgIFR5cGU8YW55Pi8qIFR5cGUgYXMgd29ya2Fyb3VuZCBmb3I6IE1pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy80ODgxICovKVtdO1xuXG5leHBvcnQgdHlwZSBIb3N0QmluZGluZ3NGdW5jdGlvbjxUPiA9IChyZjogUmVuZGVyRmxhZ3MsIGN0eDogVCwgZWxlbWVudEluZGV4OiBudW1iZXIpID0+IHZvaWQ7XG5cbi8qKlxuICogVHlwZSB1c2VkIGZvciBQaXBlRGVmcyBvbiBjb21wb25lbnQgZGVmaW5pdGlvbi5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAqL1xuZXhwb3J0IHR5cGUgUGlwZURlZkxpc3RPckZhY3RvcnkgPSAoKCkgPT4gUGlwZURlZkxpc3QpIHwgUGlwZURlZkxpc3Q7XG5cbmV4cG9ydCB0eXBlIFBpcGVEZWZMaXN0ID0gUGlwZURlZjxhbnk+W107XG5cbmV4cG9ydCB0eXBlIFBpcGVUeXBlc09yRmFjdG9yeSA9ICgoKSA9PiBEaXJlY3RpdmVUeXBlTGlzdCkgfCBEaXJlY3RpdmVUeXBlTGlzdDtcblxuZXhwb3J0IHR5cGUgUGlwZVR5cGVMaXN0ID1cbiAgICAoUGlwZURlZjxhbnk+fCBUeXBlPGFueT4vKiBUeXBlIGFzIHdvcmthcm91bmQgZm9yOiBNaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNDg4MSAqLylbXTtcblxuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuXG5leHBvcnQgY29uc3QgZW51bSBJbml0aWFsU3R5bGluZ0ZsYWdzIHtcbiAgVkFMVUVTX01PREUgPSAwYjEsXG59XG4iXX0=