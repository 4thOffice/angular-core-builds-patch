/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @enum {number} */
const RenderFlags = {
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
if (false) {
    /** @type {?} */
    ComponentType.prototype.ngComponentDef;
}
/**
 * A subclass of `Type` which has a static `ngDirectiveDef`:`DirectiveDef` field making it
 * consumable for rendering.
 * @record
 * @template T
 */
export function DirectiveType() { }
if (false) {
    /** @type {?} */
    DirectiveType.prototype.ngDirectiveDef;
}
/** @enum {number} */
const DirectiveDefFlags = {
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
if (false) {
    /** @type {?} */
    PipeType.prototype.ngPipeDef;
}
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
if (false) {
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
}
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
if (false) {
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
    DirectiveDef.prototype.onChanges;
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
}
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
if (false) {
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
     * An array of `ngContent[selector]` values that were found in the template.
     * @type {?|undefined}
     */
    ComponentDef.prototype.ngContentSelectors;
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
}
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
if (false) {
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
}
/**
 * @record
 */
export function DirectiveDefFeature() { }
if (false) {
    /** @type {?|undefined} */
    DirectiveDefFeature.prototype.ngInherit;
    /* Skipping unhandled member: <T>(directiveDef: DirectiveDef<T>): void;*/
}
/**
 * @record
 */
export function ComponentDefFeature() { }
if (false) {
    /** @type {?|undefined} */
    ComponentDefFeature.prototype.ngInherit;
    /* Skipping unhandled member: <T>(componentDef: ComponentDef<T>): void;*/
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9kZWZpbml0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFtQ0UsNkVBQTZFO0lBQzdFLFNBQWE7SUFFYiw2REFBNkQ7SUFDN0QsU0FBYTs7Ozs7Ozs7O0FBT2YsbUNBQTRFOzs7SUFBeEIsdUNBQXNCOzs7Ozs7OztBQU0xRSxtQ0FBNEU7OztJQUF4Qix1Q0FBc0I7Ozs7SUFFckMsZUFBbUI7Ozs7Ozs7OztBQU14RCw4QkFBa0U7OztJQUFuQiw2QkFBaUI7Ozs7Ozs7Ozs7Ozs7QUFlaEUsNkJBb0JDOzs7Ozs7OztJQWRDLHlCQUEwQzs7Ozs7O0lBTTFDLGlDQUE2Qzs7Ozs7OztJQU83QywwQkFBc0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCeEMsa0NBcURDOzs7Ozs7SUFuREMsNEJBQWM7Ozs7O0lBR2QseUNBQXlEOzs7OztJQUd6RCxpQ0FBb0M7Ozs7O0lBS3BDLGdDQUFpQzs7Ozs7SUFLakMsK0JBQWdDOzs7OztJQUtoQyxzQ0FBd0Q7Ozs7O0lBR3hELDZDQUFtRjs7Ozs7SUFHbkYsb0NBQTJDOzs7Ozs7OztJQVEzQyxrQ0FBbUM7O0lBR25DLDhCQUEwQjs7SUFDMUIsK0JBQTJCOztJQUMzQixpQ0FBbUQ7O0lBQ25ELHdDQUFvQzs7SUFDcEMsMkNBQXVDOztJQUN2QyxxQ0FBaUM7O0lBQ2pDLHdDQUFvQzs7SUFDcEMsaUNBQTZCOzs7OztJQUs3QixnQ0FBOEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQmhELGtDQXFGQzs7Ozs7O0lBakZDLDBCQUFvQjs7Ozs7SUFLcEIsZ0NBQXdDOzs7OztJQUt4QywwQ0FBdUM7Ozs7O0lBS3ZDLDhCQUEwQjs7Ozs7Ozs7SUFTMUIsOEJBQXdCOzs7Ozs7OztJQVF4Qiw0QkFBc0I7Ozs7O0lBS3RCLGlDQUFrQzs7Ozs7Ozs7Ozs7SUFXbEMscUNBQTBDOzs7Ozs7SUFNMUMsNEJBQXFDOzs7OztJQUdyQyw4QkFBeUI7Ozs7Ozs7O0lBU3pCLHFDQUE4Qzs7Ozs7Ozs7SUFROUMsZ0NBQW9DOzs7Ozs7SUFNcEMseUJBQW1COzs7Ozs7Ozs7Ozs7Ozs7O0FBZXJCLDZCQXVCQzs7Ozs7Ozs7SUFqQkMsdUJBQXNCOzs7OztJQUt0QiwwQkFBZ0M7Ozs7Ozs7O0lBUWhDLHVCQUF1Qjs7SUFHdkIsNEJBQTZCOzs7OztBQUsvQix5Q0FHQzs7O0lBREMsd0NBQWlCOzs7Ozs7QUFHbkIseUNBR0M7OztJQURDLHdDQUFpQjs7Ozs7O0FBc0NuQixNQUFNLE9BQU8sNkJBQTZCLEdBQUcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi4vLi4vY29yZSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcblxuaW1wb3J0IHtDc3NTZWxlY3Rvckxpc3R9IGZyb20gJy4vcHJvamVjdGlvbic7XG5cblxuLyoqXG4gKiBEZWZpbml0aW9uIG9mIHdoYXQgYSB0ZW1wbGF0ZSByZW5kZXJpbmcgZnVuY3Rpb24gc2hvdWxkIGxvb2sgbGlrZSBmb3IgYSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBvbmVudFRlbXBsYXRlPFQ+ID0ge1xuICAocmY6IFJlbmRlckZsYWdzLCBjdHg6IFQpOiB2b2lkOyBuZ1ByaXZhdGVEYXRhPzogbmV2ZXI7XG59O1xuXG4vKipcbiAqIERlZmluaXRpb24gb2Ygd2hhdCBhIHF1ZXJ5IGZ1bmN0aW9uIHNob3VsZCBsb29rIGxpa2UuXG4gKi9cbmV4cG9ydCB0eXBlIENvbXBvbmVudFF1ZXJ5PFQ+ID0gQ29tcG9uZW50VGVtcGxhdGU8VD47XG5cbi8qKlxuICogRmxhZ3MgcGFzc2VkIGludG8gdGVtcGxhdGUgZnVuY3Rpb25zIHRvIGRldGVybWluZSB3aGljaCBibG9ja3MgKGkuZS4gY3JlYXRpb24sIHVwZGF0ZSlcbiAqIHNob3VsZCBiZSBleGVjdXRlZC5cbiAqXG4gKiBUeXBpY2FsbHksIGEgdGVtcGxhdGUgcnVucyBib3RoIHRoZSBjcmVhdGlvbiBibG9jayBhbmQgdGhlIHVwZGF0ZSBibG9jayBvbiBpbml0aWFsaXphdGlvbiBhbmRcbiAqIHN1YnNlcXVlbnQgcnVucyBvbmx5IGV4ZWN1dGUgdGhlIHVwZGF0ZSBibG9jay4gSG93ZXZlciwgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3cyByZXF1aXJlIHRoYXRcbiAqIHRoZSBjcmVhdGlvbiBibG9jayBiZSBleGVjdXRlZCBzZXBhcmF0ZWx5IGZyb20gdGhlIHVwZGF0ZSBibG9jayAoZm9yIGJhY2t3YXJkcyBjb21wYXQpLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBSZW5kZXJGbGFncyB7XG4gIC8qIFdoZXRoZXIgdG8gcnVuIHRoZSBjcmVhdGlvbiBibG9jayAoZS5nLiBjcmVhdGUgZWxlbWVudHMgYW5kIGRpcmVjdGl2ZXMpICovXG4gIENyZWF0ZSA9IDBiMDEsXG5cbiAgLyogV2hldGhlciB0byBydW4gdGhlIHVwZGF0ZSBibG9jayAoZS5nLiByZWZyZXNoIGJpbmRpbmdzKSAqL1xuICBVcGRhdGUgPSAwYjEwXG59XG5cbi8qKlxuICogQSBzdWJjbGFzcyBvZiBgVHlwZWAgd2hpY2ggaGFzIGEgc3RhdGljIGBuZ0NvbXBvbmVudERlZmA6YENvbXBvbmVudERlZmAgZmllbGQgbWFraW5nIGl0XG4gKiBjb25zdW1hYmxlIGZvciByZW5kZXJpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50VHlwZTxUPiBleHRlbmRzIFR5cGU8VD4geyBuZ0NvbXBvbmVudERlZjogbmV2ZXI7IH1cblxuLyoqXG4gKiBBIHN1YmNsYXNzIG9mIGBUeXBlYCB3aGljaCBoYXMgYSBzdGF0aWMgYG5nRGlyZWN0aXZlRGVmYDpgRGlyZWN0aXZlRGVmYCBmaWVsZCBtYWtpbmcgaXRcbiAqIGNvbnN1bWFibGUgZm9yIHJlbmRlcmluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7IG5nRGlyZWN0aXZlRGVmOiBuZXZlcjsgfVxuXG5leHBvcnQgY29uc3QgZW51bSBEaXJlY3RpdmVEZWZGbGFncyB7Q29udGVudFF1ZXJ5ID0gMGIxMH1cblxuLyoqXG4gKiBBIHN1YmNsYXNzIG9mIGBUeXBlYCB3aGljaCBoYXMgYSBzdGF0aWMgYG5nUGlwZURlZmA6YFBpcGVEZWZgIGZpZWxkIG1ha2luZyBpdFxuICogY29uc3VtYWJsZSBmb3IgcmVuZGVyaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBpcGVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7IG5nUGlwZURlZjogbmV2ZXI7IH1cblxuZXhwb3J0IHR5cGUgRGlyZWN0aXZlRGVmV2l0aE1ldGE8XG4gICAgVCwgU2VsZWN0b3IgZXh0ZW5kcyBzdHJpbmcsIEV4cG9ydEFzIGV4dGVuZHMgc3RyaW5nW10sIElucHV0TWFwIGV4dGVuZHN7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBPdXRwdXRNYXAgZXh0ZW5kc3tba2V5OiBzdHJpbmddOiBzdHJpbmd9LCBRdWVyeUZpZWxkcyBleHRlbmRzIHN0cmluZ1tdPiA9IERpcmVjdGl2ZURlZjxUPjtcblxuLyoqXG4gKiBSdW50aW1lIGluZm9ybWF0aW9uIGZvciBjbGFzc2VzIHRoYXQgYXJlIGluaGVyaXRlZCBieSBjb21wb25lbnRzIG9yIGRpcmVjdGl2ZXNcbiAqIHRoYXQgYXJlbid0IGRlZmluZWQgYXMgY29tcG9uZW50cyBvciBkaXJlY3RpdmVzLlxuICpcbiAqIFRoaXMgaXMgYW4gaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdXNlZCBieSB0aGUgcmVuZGVyIHRvIGRldGVybWluZSB3aGF0IGlucHV0c1xuICogYW5kIG91dHB1dHMgc2hvdWxkIGJlIGluaGVyaXRlZC5cbiAqXG4gKiBTZWU6IHtAbGluayBkZWZpbmVCYXNlfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VEZWY8VD4ge1xuICAvKipcbiAgICogQSBkaWN0aW9uYXJ5IG1hcHBpbmcgdGhlIGlucHV0cycgbWluaWZpZWQgcHJvcGVydHkgbmFtZXMgdG8gdGhlaXIgcHVibGljIEFQSSBuYW1lcywgd2hpY2hcbiAgICogYXJlIHRoZWlyIGFsaWFzZXMgaWYgYW55LCBvciB0aGVpciBvcmlnaW5hbCB1bm1pbmlmaWVkIHByb3BlcnR5IG5hbWVzXG4gICAqIChhcyBpbiBgQElucHV0KCdhbGlhcycpIHByb3BlcnR5TmFtZTogYW55O2ApLlxuICAgKi9cbiAgcmVhZG9ubHkgaW5wdXRzOiB7W1AgaW4ga2V5b2YgVF06IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFRoaXMgaXMgb25seSBoZXJlIGJlY2F1c2UgYE5nT25DaGFuZ2VzYCBpbmNvcnJlY3RseSB1c2VzIGRlY2xhcmVkIG5hbWUgaW5zdGVhZCBvZlxuICAgKiBwdWJsaWMgb3IgbWluaWZpZWQgbmFtZS5cbiAgICovXG4gIHJlYWRvbmx5IGRlY2xhcmVkSW5wdXRzOiB7W1AgaW4ga2V5b2YgVF06IFB9O1xuXG4gIC8qKlxuICAgKiBBIGRpY3Rpb25hcnkgbWFwcGluZyB0aGUgb3V0cHV0cycgbWluaWZpZWQgcHJvcGVydHkgbmFtZXMgdG8gdGhlaXIgcHVibGljIEFQSSBuYW1lcywgd2hpY2hcbiAgICogYXJlIHRoZWlyIGFsaWFzZXMgaWYgYW55LCBvciB0aGVpciBvcmlnaW5hbCB1bm1pbmlmaWVkIHByb3BlcnR5IG5hbWVzXG4gICAqIChhcyBpbiBgQE91dHB1dCgnYWxpYXMnKSBwcm9wZXJ0eU5hbWU6IGFueTtgKS5cbiAgICovXG4gIHJlYWRvbmx5IG91dHB1dHM6IHtbUCBpbiBrZXlvZiBUXTogUH07XG59XG5cbi8qKlxuICogUnVudGltZSBsaW5rIGluZm9ybWF0aW9uIGZvciBEaXJlY3RpdmVzLlxuICpcbiAqIFRoaXMgaXMgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmUgdXNlZCBieSB0aGUgcmVuZGVyIHRvIGxpbmtcbiAqIGRpcmVjdGl2ZXMgaW50byB0ZW1wbGF0ZXMuXG4gKlxuICogTk9URTogQWx3YXlzIHVzZSBgZGVmaW5lRGlyZWN0aXZlYCBmdW5jdGlvbiB0byBjcmVhdGUgdGhpcyBvYmplY3QsXG4gKiBuZXZlciBjcmVhdGUgdGhlIG9iamVjdCBkaXJlY3RseSBzaW5jZSB0aGUgc2hhcGUgb2YgdGhpcyBvYmplY3RcbiAqIGNhbiBjaGFuZ2UgYmV0d2VlbiB2ZXJzaW9ucy5cbiAqXG4gKiBAcGFyYW0gU2VsZWN0b3IgdHlwZSBtZXRhZGF0YSBzcGVjaWZ5aW5nIHRoZSBzZWxlY3RvciBvZiB0aGUgZGlyZWN0aXZlIG9yIGNvbXBvbmVudFxuICpcbiAqIFNlZToge0BsaW5rIGRlZmluZURpcmVjdGl2ZX1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVEZWY8VD4gZXh0ZW5kcyBCYXNlRGVmPFQ+IHtcbiAgLyoqIFRva2VuIHJlcHJlc2VudGluZyB0aGUgZGlyZWN0aXZlLiBVc2VkIGJ5IERJLiAqL1xuICB0eXBlOiBUeXBlPFQ+O1xuXG4gIC8qKiBGdW5jdGlvbiB0aGF0IHJlc29sdmVzIHByb3ZpZGVycyBhbmQgcHVibGlzaGVzIHRoZW0gaW50byB0aGUgREkgc3lzdGVtLiAqL1xuICBwcm92aWRlcnNSZXNvbHZlcjogKChkZWY6IERpcmVjdGl2ZURlZjxUPikgPT4gdm9pZCl8bnVsbDtcblxuICAvKiogVGhlIHNlbGVjdG9ycyB0aGF0IHdpbGwgYmUgdXNlZCB0byBtYXRjaCBub2RlcyB0byB0aGlzIGRpcmVjdGl2ZS4gKi9cbiAgcmVhZG9ubHkgc2VsZWN0b3JzOiBDc3NTZWxlY3Rvckxpc3Q7XG5cbiAgLyoqXG4gICAqIE5hbWUgdW5kZXIgd2hpY2ggdGhlIGRpcmVjdGl2ZSBpcyBleHBvcnRlZCAoZm9yIHVzZSB3aXRoIGxvY2FsIHJlZmVyZW5jZXMgaW4gdGVtcGxhdGUpXG4gICAqL1xuICByZWFkb25seSBleHBvcnRBczogc3RyaW5nW118bnVsbDtcblxuICAvKipcbiAgICogRmFjdG9yeSBmdW5jdGlvbiB1c2VkIHRvIGNyZWF0ZSBhIG5ldyBkaXJlY3RpdmUgaW5zdGFuY2UuXG4gICAqL1xuICBmYWN0b3J5OiAodDogVHlwZTxUPnxudWxsKSA9PiBUO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjcmVhdGUgaW5zdGFuY2VzIG9mIGNvbnRlbnQgcXVlcmllcyBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBkaXJlY3RpdmUuXG4gICAqL1xuICBjb250ZW50UXVlcmllczogKChkaXJlY3RpdmVJbmRleDogbnVtYmVyKSA9PiB2b2lkKXxudWxsO1xuXG4gIC8qKiBSZWZyZXNoZXMgY29udGVudCBxdWVyaWVzIGFzc29jaWF0ZWQgd2l0aCBkaXJlY3RpdmVzIGluIGEgZ2l2ZW4gdmlldyAqL1xuICBjb250ZW50UXVlcmllc1JlZnJlc2g6ICgoZGlyZWN0aXZlSW5kZXg6IG51bWJlciwgcXVlcnlJbmRleDogbnVtYmVyKSA9PiB2b2lkKXxudWxsO1xuXG4gIC8qKiBSZWZyZXNoZXMgaG9zdCBiaW5kaW5ncyBvbiB0aGUgYXNzb2NpYXRlZCBkaXJlY3RpdmUuICovXG4gIGhvc3RCaW5kaW5nczogSG9zdEJpbmRpbmdzRnVuY3Rpb248VD58bnVsbDtcblxuICAvKipcbiAgICogU3RhdGljIGF0dHJpYnV0ZXMgdG8gc2V0IG9uIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBhdHRyaWJ1dGUgbmFtZVxuICAgKiBPZGQgaW5kaWNlczogYXR0cmlidXRlIHZhbHVlXG4gICAqL1xuICByZWFkb25seSBhdHRyaWJ1dGVzOiBzdHJpbmdbXXxudWxsO1xuXG4gIC8qIFRoZSBmb2xsb3dpbmcgYXJlIGxpZmVjeWNsZSBob29rcyBmb3IgdGhpcyBjb21wb25lbnQgKi9cbiAgb25Jbml0OiAoKCkgPT4gdm9pZCl8bnVsbDtcbiAgZG9DaGVjazogKCgpID0+IHZvaWQpfG51bGw7XG4gIG9uQ2hhbmdlczogKChjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSA9PiB2b2lkKXxudWxsO1xuICBhZnRlckNvbnRlbnRJbml0OiAoKCkgPT4gdm9pZCl8bnVsbDtcbiAgYWZ0ZXJDb250ZW50Q2hlY2tlZDogKCgpID0+IHZvaWQpfG51bGw7XG4gIGFmdGVyVmlld0luaXQ6ICgoKSA9PiB2b2lkKXxudWxsO1xuICBhZnRlclZpZXdDaGVja2VkOiAoKCkgPT4gdm9pZCl8bnVsbDtcbiAgb25EZXN0cm95OiAoKCkgPT4gdm9pZCl8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGZlYXR1cmVzIGFwcGxpZWQgdG8gdGhpcyBkaXJlY3RpdmVcbiAgICovXG4gIHJlYWRvbmx5IGZlYXR1cmVzOiBEaXJlY3RpdmVEZWZGZWF0dXJlW118bnVsbDtcbn1cblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50RGVmV2l0aE1ldGE8XG4gICAgVCwgU2VsZWN0b3IgZXh0ZW5kcyBTdHJpbmcsIEV4cG9ydEFzIGV4dGVuZHMgc3RyaW5nW10sIElucHV0TWFwIGV4dGVuZHN7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBPdXRwdXRNYXAgZXh0ZW5kc3tba2V5OiBzdHJpbmddOiBzdHJpbmd9LCBRdWVyeUZpZWxkcyBleHRlbmRzIHN0cmluZ1tdPiA9IENvbXBvbmVudERlZjxUPjtcblxuLyoqXG4gKiBSdW50aW1lIGxpbmsgaW5mb3JtYXRpb24gZm9yIENvbXBvbmVudHMuXG4gKlxuICogVGhpcyBpcyBpbnRlcm5hbCBkYXRhIHN0cnVjdHVyZSB1c2VkIGJ5IHRoZSByZW5kZXIgdG8gbGlua1xuICogY29tcG9uZW50cyBpbnRvIHRlbXBsYXRlcy5cbiAqXG4gKiBOT1RFOiBBbHdheXMgdXNlIGBkZWZpbmVDb21wb25lbnRgIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGlzIG9iamVjdCxcbiAqIG5ldmVyIGNyZWF0ZSB0aGUgb2JqZWN0IGRpcmVjdGx5IHNpbmNlIHRoZSBzaGFwZSBvZiB0aGlzIG9iamVjdFxuICogY2FuIGNoYW5nZSBiZXR3ZWVuIHZlcnNpb25zLlxuICpcbiAqIFNlZToge0BsaW5rIGRlZmluZUNvbXBvbmVudH1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnREZWY8VD4gZXh0ZW5kcyBEaXJlY3RpdmVEZWY8VD4ge1xuICAvKipcbiAgICogUnVudGltZSB1bmlxdWUgY29tcG9uZW50IElELlxuICAgKi9cbiAgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIFZpZXcgdGVtcGxhdGUgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIHJlYWRvbmx5IHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTxUPjtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYG5nQ29udGVudFtzZWxlY3Rvcl1gIHZhbHVlcyB0aGF0IHdlcmUgZm91bmQgaW4gdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgcmVhZG9ubHkgbmdDb250ZW50U2VsZWN0b3JzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHN0eWxlcyB0aGF0IHRoZSBjb21wb25lbnQgbmVlZHMgdG8gYmUgcHJlc2VudCBmb3IgY29tcG9uZW50IHRvIHJlbmRlciBjb3JyZWN0bHkuXG4gICAqL1xuICByZWFkb25seSBzdHlsZXM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIG5vZGVzLCBsb2NhbCByZWZzLCBhbmQgcGlwZXMgaW4gdGhpcyBjb21wb25lbnQgdGVtcGxhdGUuXG4gICAqXG4gICAqIFVzZWQgdG8gY2FsY3VsYXRlIHRoZSBsZW5ndGggb2YgdGhlIGNvbXBvbmVudCdzIExWaWV3IGFycmF5LCBzbyB3ZVxuICAgKiBjYW4gcHJlLWZpbGwgdGhlIGFycmF5IGFuZCBzZXQgdGhlIGJpbmRpbmcgc3RhcnQgaW5kZXguXG4gICAqL1xuICAvLyBUT0RPKGthcmEpOiByZW1vdmUgcXVlcmllcyBmcm9tIHRoaXMgY291bnRcbiAgcmVhZG9ubHkgY29uc3RzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgYmluZGluZ3MgaW4gdGhpcyBjb21wb25lbnQgdGVtcGxhdGUgKGluY2x1ZGluZyBwdXJlIGZuIGJpbmRpbmdzKS5cbiAgICpcbiAgICogVXNlZCB0byBjYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgY29tcG9uZW50J3MgTFZpZXcgYXJyYXksIHNvIHdlXG4gICAqIGNhbiBwcmUtZmlsbCB0aGUgYXJyYXkgYW5kIHNldCB0aGUgaG9zdCBiaW5kaW5nIHN0YXJ0IGluZGV4LlxuICAgKi9cbiAgcmVhZG9ubHkgdmFyczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBRdWVyeS1yZWxhdGVkIGluc3RydWN0aW9ucyBmb3IgYSBjb21wb25lbnQuXG4gICAqL1xuICB2aWV3UXVlcnk6IENvbXBvbmVudFF1ZXJ5PFQ+fG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSB2aWV3IGVuY2Fwc3VsYXRpb24gdHlwZSwgd2hpY2ggZGV0ZXJtaW5lcyBob3cgc3R5bGVzIGFyZSBhcHBsaWVkIHRvXG4gICAqIERPTSBlbGVtZW50cy4gT25lIG9mXG4gICAqIC0gYEVtdWxhdGVkYCAoZGVmYXVsdCk6IEVtdWxhdGUgbmF0aXZlIHNjb3Bpbmcgb2Ygc3R5bGVzLlxuICAgKiAtIGBOYXRpdmVgOiBVc2UgdGhlIG5hdGl2ZSBlbmNhcHN1bGF0aW9uIG1lY2hhbmlzbSBvZiB0aGUgcmVuZGVyZXIuXG4gICAqIC0gYFNoYWRvd0RvbWA6IFVzZSBtb2Rlcm4gW1NoYWRvd0RPTV0oaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9zaGFkb3cvKSBhbmRcbiAgICogICBjcmVhdGUgYSBTaGFkb3dSb290IGZvciBjb21wb25lbnQncyBob3N0IGVsZW1lbnQuXG4gICAqIC0gYE5vbmVgOiBEbyBub3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgb3Igc3R5bGUgZW5jYXBzdWxhdGlvbi5cbiAgICovXG4gIHJlYWRvbmx5IGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGFyYml0cmFyeSBkZXZlbG9wZXItZGVmaW5lZCBkYXRhIHRvIGJlIHN0b3JlZCBvbiBhIHJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgcmVuZGVyZXJzIHRoYXQgZGVsZWdhdGUgdG8gb3RoZXIgcmVuZGVyZXJzLlxuICAgKi9cbiAgcmVhZG9ubHkgZGF0YToge1traW5kOiBzdHJpbmddOiBhbnl9O1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvbmVudCdzIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IGlzIE9uUHVzaCAqL1xuICByZWFkb25seSBvblB1c2g6IGJvb2xlYW47XG5cbiAgLyoqXG5cbiAgICogUmVnaXN0cnkgb2YgZGlyZWN0aXZlcyBhbmQgY29tcG9uZW50cyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIHZpZXcuXG4gICAqXG4gICAqIFRoZSBwcm9wZXJ0eSBpcyBlaXRoZXIgYW4gYXJyYXkgb2YgYERpcmVjdGl2ZURlZmBzIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgYXJyYXkgb2ZcbiAgICogYERpcmVjdGl2ZURlZmBzLiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAgICovXG4gIGRpcmVjdGl2ZURlZnM6IERpcmVjdGl2ZURlZkxpc3RPckZhY3Rvcnl8bnVsbDtcblxuICAvKipcbiAgICogUmVnaXN0cnkgb2YgcGlwZXMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgZWl0aGVyIGFuIGFycmF5IG9mIGBQaXBlRGVmc2BzIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgYXJyYXkgb2ZcbiAgICogYFBpcGVEZWZzYHMuIFRoZSBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgdG8gYmUgYWJsZSB0byBzdXBwb3J0IGZvcndhcmQgZGVjbGFyYXRpb25zLlxuICAgKi9cbiAgcGlwZURlZnM6IFBpcGVEZWZMaXN0T3JGYWN0b3J5fG51bGw7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc3RvcmUgdGhlIHJlc3VsdCBvZiBgbm9TaWRlRWZmZWN0c2AgZnVuY3Rpb24gc28gdGhhdCBpdCBpcyBub3QgcmVtb3ZlZCBieSBjbG9zdXJlXG4gICAqIGNvbXBpbGVyLiBUaGUgcHJvcGVydHkgc2hvdWxkIG5ldmVyIGJlIHJlYWQuXG4gICAqL1xuICByZWFkb25seSBfPzogbmV2ZXI7XG59XG5cbi8qKlxuICogUnVudGltZSBsaW5rIGluZm9ybWF0aW9uIGZvciBQaXBlcy5cbiAqXG4gKiBUaGlzIGlzIGludGVybmFsIGRhdGEgc3RydWN0dXJlIHVzZWQgYnkgdGhlIHJlbmRlcmVyIHRvIGxpbmtcbiAqIHBpcGVzIGludG8gdGVtcGxhdGVzLlxuICpcbiAqIE5PVEU6IEFsd2F5cyB1c2UgYGRlZmluZVBpcGVgIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGlzIG9iamVjdCxcbiAqIG5ldmVyIGNyZWF0ZSB0aGUgb2JqZWN0IGRpcmVjdGx5IHNpbmNlIHRoZSBzaGFwZSBvZiB0aGlzIG9iamVjdFxuICogY2FuIGNoYW5nZSBiZXR3ZWVuIHZlcnNpb25zLlxuICpcbiAqIFNlZToge0BsaW5rIGRlZmluZVBpcGV9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGlwZURlZjxUPiB7XG4gIC8qKlxuICAgKiBQaXBlIG5hbWUuXG4gICAqXG4gICAqIFVzZWQgdG8gcmVzb2x2ZSBwaXBlIGluIHRlbXBsYXRlcy5cbiAgICovXG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogRmFjdG9yeSBmdW5jdGlvbiB1c2VkIHRvIGNyZWF0ZSBhIG5ldyBwaXBlIGluc3RhbmNlLlxuICAgKi9cbiAgZmFjdG9yeTogKHQ6IFR5cGU8VD58bnVsbCkgPT4gVDtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHBpcGUgaXMgcHVyZS5cbiAgICpcbiAgICogUHVyZSBwaXBlcyByZXN1bHQgb25seSBkZXBlbmRzIG9uIHRoZSBwaXBlIGlucHV0IGFuZCBub3Qgb24gaW50ZXJuYWxcbiAgICogc3RhdGUgb2YgdGhlIHBpcGUuXG4gICAqL1xuICByZWFkb25seSBwdXJlOiBib29sZWFuO1xuXG4gIC8qIFRoZSBmb2xsb3dpbmcgYXJlIGxpZmVjeWNsZSBob29rcyBmb3IgdGhpcyBwaXBlICovXG4gIG9uRGVzdHJveTogKCgpID0+IHZvaWQpfG51bGw7XG59XG5cbmV4cG9ydCB0eXBlIFBpcGVEZWZXaXRoTWV0YTxULCBOYW1lIGV4dGVuZHMgc3RyaW5nPiA9IFBpcGVEZWY8VD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aXZlRGVmRmVhdHVyZSB7XG4gIDxUPihkaXJlY3RpdmVEZWY6IERpcmVjdGl2ZURlZjxUPik6IHZvaWQ7XG4gIG5nSW5oZXJpdD86IHRydWU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50RGVmRmVhdHVyZSB7XG4gIDxUPihjb21wb25lbnREZWY6IENvbXBvbmVudERlZjxUPik6IHZvaWQ7XG4gIG5nSW5oZXJpdD86IHRydWU7XG59XG5cblxuLyoqXG4gKiBUeXBlIHVzZWQgZm9yIGRpcmVjdGl2ZURlZnMgb24gY29tcG9uZW50IGRlZmluaXRpb24uXG4gKlxuICogVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gKi9cbmV4cG9ydCB0eXBlIERpcmVjdGl2ZURlZkxpc3RPckZhY3RvcnkgPSAoKCkgPT4gRGlyZWN0aXZlRGVmTGlzdCkgfCBEaXJlY3RpdmVEZWZMaXN0O1xuXG5leHBvcnQgdHlwZSBEaXJlY3RpdmVEZWZMaXN0ID0gKERpcmVjdGl2ZURlZjxhbnk+fCBDb21wb25lbnREZWY8YW55PilbXTtcblxuZXhwb3J0IHR5cGUgRGlyZWN0aXZlVHlwZXNPckZhY3RvcnkgPSAoKCkgPT4gRGlyZWN0aXZlVHlwZUxpc3QpIHwgRGlyZWN0aXZlVHlwZUxpc3Q7XG5cbmV4cG9ydCB0eXBlIERpcmVjdGl2ZVR5cGVMaXN0ID1cbiAgICAoRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+fFxuICAgICBUeXBlPGFueT4vKiBUeXBlIGFzIHdvcmthcm91bmQgZm9yOiBNaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNDg4MSAqLylbXTtcblxuZXhwb3J0IHR5cGUgSG9zdEJpbmRpbmdzRnVuY3Rpb248VD4gPSAocmY6IFJlbmRlckZsYWdzLCBjdHg6IFQsIGVsZW1lbnRJbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuXG4vKipcbiAqIFR5cGUgdXNlZCBmb3IgUGlwZURlZnMgb24gY29tcG9uZW50IGRlZmluaXRpb24uXG4gKlxuICogVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gKi9cbmV4cG9ydCB0eXBlIFBpcGVEZWZMaXN0T3JGYWN0b3J5ID0gKCgpID0+IFBpcGVEZWZMaXN0KSB8IFBpcGVEZWZMaXN0O1xuXG5leHBvcnQgdHlwZSBQaXBlRGVmTGlzdCA9IFBpcGVEZWY8YW55PltdO1xuXG5leHBvcnQgdHlwZSBQaXBlVHlwZXNPckZhY3RvcnkgPSAoKCkgPT4gRGlyZWN0aXZlVHlwZUxpc3QpIHwgRGlyZWN0aXZlVHlwZUxpc3Q7XG5cbmV4cG9ydCB0eXBlIFBpcGVUeXBlTGlzdCA9XG4gICAgKFBpcGVEZWY8YW55PnwgVHlwZTxhbnk+LyogVHlwZSBhcyB3b3JrYXJvdW5kIGZvcjogTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzQ4ODEgKi8pW107XG5cblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcbiJdfQ==