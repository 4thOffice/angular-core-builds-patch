/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/render3/interfaces/view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Below are constants for LView indices to help us look up LView members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
/** @type {?} */
export const HOST = 0;
/** @type {?} */
export const TVIEW = 1;
/** @type {?} */
export const FLAGS = 2;
/** @type {?} */
export const PARENT = 3;
/** @type {?} */
export const NEXT = 4;
/** @type {?} */
export const QUERIES = 5;
/** @type {?} */
export const T_HOST = 6;
/** @type {?} */
export const CLEANUP = 7;
/** @type {?} */
export const CONTEXT = 8;
/** @type {?} */
export const INJECTOR = 9;
/** @type {?} */
export const RENDERER_FACTORY = 10;
/** @type {?} */
export const RENDERER = 11;
/** @type {?} */
export const SANITIZER = 12;
/** @type {?} */
export const CHILD_HEAD = 13;
/** @type {?} */
export const CHILD_TAIL = 14;
/** @type {?} */
export const DECLARATION_VIEW = 15;
/** @type {?} */
export const DECLARATION_COMPONENT_VIEW = 16;
/** @type {?} */
export const DECLARATION_LCONTAINER = 17;
/** @type {?} */
export const PREORDER_HOOK_FLAGS = 18;
/**
 * Size of LView's header. Necessary to adjust for it when setting slots.
 * @type {?}
 */
export const HEADER_OFFSET = 19;
/**
 * @record
 */
export function OpaqueViewState() { }
if (false) {
    /** @type {?} */
    OpaqueViewState.prototype.__brand__;
}
/**
 * `LView` stores all of the information needed to process the instructions as
 * they are invoked from the template. Each embedded view and component view has its
 * own `LView`. When processing a particular view, we set the `viewData` to that
 * `LView`. When that view is done processing, the `viewData` is set back to
 * whatever the original `viewData` was before (the parent `LView`).
 *
 * Keeping separate state for each view facilities view insertion / deletion, so we
 * don't have to edit the data array based on which views are present.
 * @record
 */
export function LView() { }
if (false) {
    /* Skipping unnamed member:
    [HOST]: RElement|null;*/
    /* Skipping unnamed member:
    readonly[TVIEW]: TView;*/
    /* Skipping unnamed member:
    [FLAGS]: LViewFlags;*/
    /* Skipping unnamed member:
    [PARENT]: LView|LContainer|null;*/
    /* Skipping unnamed member:
    [NEXT]: LView|LContainer|null;*/
    /* Skipping unnamed member:
    [QUERIES]: LQueries|null;*/
    /* Skipping unnamed member:
    [T_HOST]: TViewNode|TElementNode|null;*/
    /* Skipping unnamed member:
    [CLEANUP]: any[]|null;*/
    /* Skipping unnamed member:
    [CONTEXT]: {}|RootContext|null;*/
    /* Skipping unnamed member:
    readonly[INJECTOR]: Injector|null;*/
    /* Skipping unnamed member:
    [RENDERER_FACTORY]: RendererFactory3;*/
    /* Skipping unnamed member:
    [RENDERER]: Renderer3;*/
    /* Skipping unnamed member:
    [SANITIZER]: Sanitizer|null;*/
    /* Skipping unnamed member:
    [CHILD_HEAD]: LView|LContainer|null;*/
    /* Skipping unnamed member:
    [CHILD_TAIL]: LView|LContainer|null;*/
    /* Skipping unnamed member:
    [DECLARATION_VIEW]: LView|null;*/
    /* Skipping unnamed member:
    [DECLARATION_COMPONENT_VIEW]: LView;*/
    /* Skipping unnamed member:
    [DECLARATION_LCONTAINER]: LContainer|null;*/
    /* Skipping unnamed member:
    [PREORDER_HOOK_FLAGS]: PreOrderHookFlags;*/
}
/** @enum {number} */
const LViewFlags = {
    /** The state of the init phase on the first 2 bits */
    InitPhaseStateIncrementer: 1,
    InitPhaseStateMask: 3,
    /**
     * Whether or not the view is in creationMode.
     *
     * This must be stored in the view rather than using `data` as a marker so that
     * we can properly support embedded views. Otherwise, when exiting a child view
     * back into the parent view, `data` will be defined and `creationMode` will be
     * improperly reported as false.
     */
    CreationMode: 4,
    /**
     * Whether or not this LView instance is on its first processing pass.
     *
     * An LView instance is considered to be on its "first pass" until it
     * has completed one creation mode run and one update mode run. At this
     * time, the flag is turned off.
     */
    FirstLViewPass: 8,
    /** Whether this view has default change detection strategy (checks always) or onPush */
    CheckAlways: 16,
    /**
     * Whether or not manual change detection is turned on for onPush components.
     *
     * This is a special mode that only marks components dirty in two cases:
     * 1) There has been a change to an @Input property
     * 2) `markDirty()` has been called manually by the user
     *
     * Note that in this mode, the firing of events does NOT mark components
     * dirty automatically.
     *
     * Manual mode is turned off by default for backwards compatibility, as events
     * automatically mark OnPush components dirty in View Engine.
     *
     * TODO: Add a public API to ChangeDetectionStrategy to turn this mode on
     */
    ManualOnPush: 32,
    /** Whether or not this view is currently dirty (needing check) */
    Dirty: 64,
    /** Whether or not this view is currently attached to change detection tree. */
    Attached: 128,
    /** Whether or not this view is destroyed. */
    Destroyed: 256,
    /** Whether or not this view is the root view */
    IsRoot: 512,
    /**
     * Index of the current init phase on last 22 bits
     */
    IndexWithinInitPhaseIncrementer: 1024,
    IndexWithinInitPhaseShift: 10,
    IndexWithinInitPhaseReset: 1023,
};
export { LViewFlags };
/** @enum {number} */
const InitPhaseState = {
    OnInitHooksToBeRun: 0,
    AfterContentInitHooksToBeRun: 1,
    AfterViewInitHooksToBeRun: 2,
    InitPhaseCompleted: 3,
};
export { InitPhaseState };
/** @enum {number} */
const PreOrderHookFlags = {
    /** The index of the next pre-order hook to be called in the hooks array, on the first 16
       bits */
    IndexOfTheNextPreOrderHookMaskMask: 65535,
    /**
     * The number of init hooks that have already been called, on the last 16 bits
     */
    NumberOfInitHooksCalledIncrementer: 65536,
    NumberOfInitHooksCalledShift: 16,
    NumberOfInitHooksCalledMask: 4294901760,
};
export { PreOrderHookFlags };
/**
 * Set of instructions used to process host bindings efficiently.
 *
 * See VIEW_DATA.md for more information.
 * @record
 */
export function ExpandoInstructions() { }
/** @enum {number} */
const TViewType = {
    /**
     * Root `TView` is the used to bootstrap components into. It is used in conjunction with
     * `LView` which takes an existing DOM node not owned by Angular and wraps it in `TView`/`LView`
     * so that other components can be loaded into it.
     */
    Root: 0,
    /**
     * `TView` associated with a Component. This would be the `TView` directly associated with the
     * component view (as opposed an `Embedded` `TView` which would be a child of `Component` `TView`)
     */
    Component: 1,
    /**
     * `TView` associated with a template. Such as `*ngIf`, `<ng-template>` etc... A `Component`
     * can have zero or more `Embedede` `TView`s.
     */
    Embedded: 2,
};
export { TViewType };
/**
 * The static data for an LView (shared between all templates of a
 * given type).
 *
 * Stored on the `ComponentDef.tView`.
 * @record
 */
export function TView() { }
if (false) {
    /**
     * Type of `TView` (`Root`|`Component`|`Embedded`).
     * @type {?}
     */
    TView.prototype.type;
    /**
     * ID for inline views to determine whether a view is the same as the previous view
     * in a certain position. If it's not, we know the new view needs to be inserted
     * and the one that exists needs to be removed (e.g. if/else statements)
     *
     * If this is -1, then this is a component view or a dynamically created view.
     * @type {?}
     */
    TView.prototype.id;
    /**
     * This is a blueprint used to generate LView instances for this TView. Copying this
     * blueprint is faster than creating a new LView from scratch.
     * @type {?}
     */
    TView.prototype.blueprint;
    /**
     * The template function used to refresh the view of dynamically created views
     * and components. Will be null for inline views.
     * @type {?}
     */
    TView.prototype.template;
    /**
     * A function containing query-related instructions.
     * @type {?}
     */
    TView.prototype.viewQuery;
    /**
     * Pointer to the host `TNode` (not part of this TView).
     *
     * If this is a `TViewNode` for an `LViewNode`, this is an embedded view of a container.
     * We need this pointer to be able to efficiently find this node when inserting the view
     * into an anchor.
     *
     * If this is a `TElementNode`, this is the view of a root component. It has exactly one
     * root TNode.
     *
     * If this is null, this is the view of a component that is not at root. We do not store
     * the host TNodes for child component views because they can potentially have several
     * different host TNodes, depending on where the component is being used. These host
     * TNodes cannot be shared (due to different indices, etc).
     * @type {?}
     */
    TView.prototype.node;
    /**
     * Whether or not this template has been processed in creation mode.
     * @type {?}
     */
    TView.prototype.firstCreatePass;
    /**
     * Whether or not the first update for this template has been processed.
     * @type {?}
     */
    TView.prototype.firstUpdatePass;
    /**
     * Static data equivalent of LView.data[]. Contains TNodes, PipeDefInternal or TI18n.
     * @type {?}
     */
    TView.prototype.data;
    /**
     * The binding start index is the index at which the data array
     * starts to store bindings only. Saving this value ensures that we
     * will begin reading bindings at the correct point in the array when
     * we are in update mode.
     *
     * -1 means that it has not been initialized.
     * @type {?}
     */
    TView.prototype.bindingStartIndex;
    /**
     * The index where the "expando" section of `LView` begins. The expando
     * section contains injectors, directive instances, and host binding values.
     * Unlike the "decls" and "vars" sections of `LView`, the length of this
     * section cannot be calculated at compile-time because directives are matched
     * at runtime to preserve locality.
     *
     * We store this start index so we know where to start checking host bindings
     * in `setHostBindings`.
     * @type {?}
     */
    TView.prototype.expandoStartIndex;
    /**
     * Whether or not there are any static view queries tracked on this view.
     *
     * We store this so we know whether or not we should do a view query
     * refresh after creation mode to collect static query results.
     * @type {?}
     */
    TView.prototype.staticViewQueries;
    /**
     * Whether or not there are any static content queries tracked on this view.
     *
     * We store this so we know whether or not we should do a content query
     * refresh after creation mode to collect static query results.
     * @type {?}
     */
    TView.prototype.staticContentQueries;
    /**
     * A reference to the first child node located in the view.
     * @type {?}
     */
    TView.prototype.firstChild;
    /**
     * Set of instructions used to process host bindings efficiently.
     *
     * See VIEW_DATA.md for more information.
     * @type {?}
     */
    TView.prototype.expandoInstructions;
    /**
     * Full registry of directives and components that may be found in this view.
     *
     * It's necessary to keep a copy of the full def list on the TView so it's possible
     * to render template functions without a host component.
     * @type {?}
     */
    TView.prototype.directiveRegistry;
    /**
     * Full registry of pipes that may be found in this view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     *
     * It's necessary to keep a copy of the full def list on the TView so it's possible
     * to render template functions without a host component.
     * @type {?}
     */
    TView.prototype.pipeRegistry;
    /**
     * Array of ngOnInit, ngOnChanges and ngDoCheck hooks that should be executed for this view in
     * creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.preOrderHooks;
    /**
     * Array of ngOnChanges and ngDoCheck hooks that should be executed for this view in update mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.preOrderCheckHooks;
    /**
     * Array of ngAfterContentInit and ngAfterContentChecked hooks that should be executed
     * for this view in creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.contentHooks;
    /**
     * Array of ngAfterContentChecked hooks that should be executed for this view in update
     * mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.contentCheckHooks;
    /**
     * Array of ngAfterViewInit and ngAfterViewChecked hooks that should be executed for
     * this view in creation mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.viewHooks;
    /**
     * Array of ngAfterViewChecked hooks that should be executed for this view in
     * update mode.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.viewCheckHooks;
    /**
     * Array of ngOnDestroy hooks that should be executed when this view is destroyed.
     *
     * Even indices: Directive index
     * Odd indices: Hook function
     * @type {?}
     */
    TView.prototype.destroyHooks;
    /**
     * When a view is destroyed, listeners need to be released and outputs need to be
     * unsubscribed. This cleanup array stores both listener data (in chunks of 4)
     * and output data (in chunks of 2) for a particular view. Combining the arrays
     * saves on memory (70 bytes per array) and on a few bytes of code size (for two
     * separate for loops).
     *
     * If it's a native DOM listener or output subscription being stored:
     * 1st index is: event name  `name = tView.cleanup[i+0]`
     * 2nd index is: index of native element or a function that retrieves global target (window,
     *               document or body) reference based on the native element:
     *    `typeof idxOrTargetGetter === 'function'`: global target getter function
     *    `typeof idxOrTargetGetter === 'number'`: index of native element
     *
     * 3rd index is: index of listener function `listener = lView[CLEANUP][tView.cleanup[i+2]]`
     * 4th index is: `useCaptureOrIndx = tView.cleanup[i+3]`
     *    `typeof useCaptureOrIndx == 'boolean' : useCapture boolean
     *    `typeof useCaptureOrIndx == 'number':
     *         `useCaptureOrIndx >= 0` `removeListener = LView[CLEANUP][useCaptureOrIndx]`
     *         `useCaptureOrIndx <  0` `subscription = LView[CLEANUP][-useCaptureOrIndx]`
     *
     * If it's an output subscription or query list destroy hook:
     * 1st index is: output unsubscribe function / query list destroy function
     * 2nd index is: index of function context in LView.cleanupInstances[]
     *               `tView.cleanup[i+0].call(lView[CLEANUP][tView.cleanup[i+1]])`
     * @type {?}
     */
    TView.prototype.cleanup;
    /**
     * A list of element indices for child components that will need to be
     * refreshed when the current view has finished its check. These indices have
     * already been adjusted for the HEADER_OFFSET.
     *
     * @type {?}
     */
    TView.prototype.components;
    /**
     * A collection of queries tracked in a given view.
     * @type {?}
     */
    TView.prototype.queries;
    /**
     * An array of indices pointing to directives with content queries alongside with the
     * corresponding
     * query index. Each entry in this array is a tuple of:
     * - index of the first content query index declared by a given directive;
     * - index of a directive.
     *
     * We are storing those indexes so we can refresh content queries as part of a view refresh
     * process.
     * @type {?}
     */
    TView.prototype.contentQueries;
    /**
     * Set of schemas that declare elements to be allowed inside the view.
     * @type {?}
     */
    TView.prototype.schemas;
    /**
     * Array of constants for the view. Includes attribute arrays, local definition arrays etc.
     * Used for directive matching, attribute bindings, local definitions and more.
     * @type {?}
     */
    TView.prototype.consts;
}
/** @enum {number} */
const RootContextFlags = {
    Empty: 0, DetectChanges: 1, FlushPlayers: 2,
};
export { RootContextFlags };
/**
 * RootContext contains information which is shared for all components which
 * were bootstrapped with {\@link renderComponent}.
 * @record
 */
export function RootContext() { }
if (false) {
    /**
     * A function used for scheduling change detection in the future. Usually
     * this is `requestAnimationFrame`.
     * @type {?}
     */
    RootContext.prototype.scheduler;
    /**
     * A promise which is resolved when all components are considered clean (not dirty).
     *
     * This promise is overwritten every time a first call to {\@link markDirty} is invoked.
     * @type {?}
     */
    RootContext.prototype.clean;
    /**
     * RootComponents - The components that were instantiated by the call to
     * {\@link renderComponent}.
     * @type {?}
     */
    RootContext.prototype.components;
    /**
     * The player flushing handler to kick off all animations
     * @type {?}
     */
    RootContext.prototype.playerHandler;
    /**
     * What render-related operations to run once a scheduler has been set
     * @type {?}
     */
    RootContext.prototype.flags;
}
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTSxPQUFPLElBQUksR0FBRyxDQUFDOztBQUNyQixNQUFNLE9BQU8sS0FBSyxHQUFHLENBQUM7O0FBQ3RCLE1BQU0sT0FBTyxLQUFLLEdBQUcsQ0FBQzs7QUFDdEIsTUFBTSxPQUFPLE1BQU0sR0FBRyxDQUFDOztBQUN2QixNQUFNLE9BQU8sSUFBSSxHQUFHLENBQUM7O0FBQ3JCLE1BQU0sT0FBTyxPQUFPLEdBQUcsQ0FBQzs7QUFDeEIsTUFBTSxPQUFPLE1BQU0sR0FBRyxDQUFDOztBQUN2QixNQUFNLE9BQU8sT0FBTyxHQUFHLENBQUM7O0FBQ3hCLE1BQU0sT0FBTyxPQUFPLEdBQUcsQ0FBQzs7QUFDeEIsTUFBTSxPQUFPLFFBQVEsR0FBRyxDQUFDOztBQUN6QixNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsRUFBRTs7QUFDbEMsTUFBTSxPQUFPLFFBQVEsR0FBRyxFQUFFOztBQUMxQixNQUFNLE9BQU8sU0FBUyxHQUFHLEVBQUU7O0FBQzNCLE1BQU0sT0FBTyxVQUFVLEdBQUcsRUFBRTs7QUFDNUIsTUFBTSxPQUFPLFVBQVUsR0FBRyxFQUFFOztBQUM1QixNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsRUFBRTs7QUFDbEMsTUFBTSxPQUFPLDBCQUEwQixHQUFHLEVBQUU7O0FBQzVDLE1BQU0sT0FBTyxzQkFBc0IsR0FBRyxFQUFFOztBQUN4QyxNQUFNLE9BQU8sbUJBQW1CLEdBQUcsRUFBRTs7Ozs7QUFFckMsTUFBTSxPQUFPLGFBQWEsR0FBRyxFQUFFOzs7O0FBTS9CLHFDQUVDOzs7SUFEQyxvQ0FBaUU7Ozs7Ozs7Ozs7Ozs7QUFjbkUsMkJBdU5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxNQUFrQixVQUFVO0lBQzFCLHNEQUFzRDtJQUN0RCx5QkFBeUIsR0FBZ0I7SUFDekMsa0JBQWtCLEdBQWdCO0lBRWxDOzs7Ozs7O09BT0c7SUFDSCxZQUFZLEdBQWdCO0lBRTVCOzs7Ozs7T0FNRztJQUNILGNBQWMsR0FBZ0I7SUFFOUIsd0ZBQXdGO0lBQ3hGLFdBQVcsSUFBZ0I7SUFFM0I7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxZQUFZLElBQWdCO0lBRTVCLGtFQUFrRTtJQUNsRSxLQUFLLElBQWlCO0lBRXRCLCtFQUErRTtJQUMvRSxRQUFRLEtBQWlCO0lBRXpCLDZDQUE2QztJQUM3QyxTQUFTLEtBQWlCO0lBRTFCLGdEQUFnRDtJQUNoRCxNQUFNLEtBQWlCO0lBRXZCOztPQUVHO0lBQ0gsK0JBQStCLE1BQWlCO0lBQ2hELHlCQUF5QixJQUFLO0lBQzlCLHlCQUF5QixNQUFpQjtFQUMzQzs7O0FBU0QsTUFBa0IsY0FBYztJQUM5QixrQkFBa0IsR0FBTztJQUN6Qiw0QkFBNEIsR0FBTztJQUNuQyx5QkFBeUIsR0FBTztJQUNoQyxrQkFBa0IsR0FBTztFQUMxQjs7O0FBR0QsTUFBa0IsaUJBQWlCO0lBQ2pDO2NBQ1U7SUFDVixrQ0FBa0MsT0FBc0I7SUFFeEQ7O09BRUc7SUFDSCxrQ0FBa0MsT0FBdUI7SUFDekQsNEJBQTRCLElBQUs7SUFDakMsMkJBQTJCLFlBQXFDO0VBQ2pFOzs7Ozs7OztBQU9ELHlDQUE0Rjs7QUFVNUYsTUFBa0IsU0FBUztJQUN6Qjs7OztPQUlHO0lBQ0gsSUFBSSxHQUFJO0lBRVI7OztPQUdHO0lBQ0gsU0FBUyxHQUFJO0lBRWI7OztPQUdHO0lBQ0gsUUFBUSxHQUFJO0VBQ2I7Ozs7Ozs7OztBQVFELDJCQTJQQzs7Ozs7O0lBdlBDLHFCQUFnQjs7Ozs7Ozs7O0lBU2hCLG1CQUFvQjs7Ozs7O0lBTXBCLDBCQUFpQjs7Ozs7O0lBTWpCLHlCQUFxQzs7Ozs7SUFLckMsMEJBQXdDOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCeEMscUJBQWtDOzs7OztJQUdsQyxnQ0FBeUI7Ozs7O0lBR3pCLGdDQUF5Qjs7Ozs7SUFHekIscUJBQVk7Ozs7Ozs7Ozs7SUFVWixrQ0FBMEI7Ozs7Ozs7Ozs7OztJQVkxQixrQ0FBMEI7Ozs7Ozs7O0lBUTFCLGtDQUEyQjs7Ozs7Ozs7SUFRM0IscUNBQThCOzs7OztJQUs5QiwyQkFBdUI7Ozs7Ozs7SUFPdkIsb0NBQThDOzs7Ozs7OztJQVE5QyxrQ0FBeUM7Ozs7Ozs7Ozs7O0lBV3pDLDZCQUErQjs7Ozs7Ozs7O0lBUy9CLDhCQUE2Qjs7Ozs7Ozs7SUFRN0IsbUNBQWtDOzs7Ozs7Ozs7SUFTbEMsNkJBQTRCOzs7Ozs7Ozs7SUFTNUIsa0NBQWlDOzs7Ozs7Ozs7SUFTakMsMEJBQXlCOzs7Ozs7Ozs7SUFTekIsK0JBQThCOzs7Ozs7OztJQVE5Qiw2QkFBNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0QjVCLHdCQUFvQjs7Ozs7Ozs7SUFRcEIsMkJBQTBCOzs7OztJQUsxQix3QkFBdUI7Ozs7Ozs7Ozs7OztJQVl2QiwrQkFBOEI7Ozs7O0lBSzlCLHdCQUErQjs7Ozs7O0lBTS9CLHVCQUF3Qjs7O0FBRzFCLE1BQWtCLGdCQUFnQjtJQUFFLEtBQUssR0FBTyxFQUFFLGFBQWEsR0FBTyxFQUFFLFlBQVksR0FBTztFQUFDOzs7Ozs7O0FBTzVGLGlDQTZCQzs7Ozs7OztJQXhCQyxnQ0FBd0M7Ozs7Ozs7SUFPeEMsNEJBQXFCOzs7Ozs7SUFNckIsaUNBQWlCOzs7OztJQUtqQixvQ0FBa0M7Ozs7O0lBS2xDLDRCQUF3Qjs7Ozs7QUFrRDFCLE1BQU0sT0FBTyw2QkFBNkIsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi8uLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge1NjaGVtYU1ldGFkYXRhfSBmcm9tICcuLi8uLi9tZXRhZGF0YSc7XG5pbXBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3Nhbml0aXplcic7XG5cbmltcG9ydCB7TENvbnRhaW5lcn0gZnJvbSAnLi9jb250YWluZXInO1xuaW1wb3J0IHtDb21wb25lbnREZWYsIENvbXBvbmVudFRlbXBsYXRlLCBEaXJlY3RpdmVEZWYsIERpcmVjdGl2ZURlZkxpc3QsIEhvc3RCaW5kaW5nc0Z1bmN0aW9uLCBQaXBlRGVmLCBQaXBlRGVmTGlzdCwgVmlld1F1ZXJpZXNGdW5jdGlvbn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7STE4blVwZGF0ZU9wQ29kZXMsIFRJMThufSBmcm9tICcuL2kxOG4nO1xuaW1wb3J0IHtUQXR0cmlidXRlcywgVENvbnN0YW50cywgVEVsZW1lbnROb2RlLCBUTm9kZSwgVFZpZXdOb2RlfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtQbGF5ZXJIYW5kbGVyfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQge0xRdWVyaWVzLCBUUXVlcmllc30gZnJvbSAnLi9xdWVyeSc7XG5pbXBvcnQge1JFbGVtZW50LCBSZW5kZXJlcjMsIFJlbmRlcmVyRmFjdG9yeTN9IGZyb20gJy4vcmVuZGVyZXInO1xuXG5cblxuLy8gQmVsb3cgYXJlIGNvbnN0YW50cyBmb3IgTFZpZXcgaW5kaWNlcyB0byBoZWxwIHVzIGxvb2sgdXAgTFZpZXcgbWVtYmVyc1xuLy8gd2l0aG91dCBoYXZpbmcgdG8gcmVtZW1iZXIgdGhlIHNwZWNpZmljIGluZGljZXMuXG4vLyBVZ2xpZnkgd2lsbCBpbmxpbmUgdGhlc2Ugd2hlbiBtaW5pZnlpbmcgc28gdGhlcmUgc2hvdWxkbid0IGJlIGEgY29zdC5cbmV4cG9ydCBjb25zdCBIT1NUID0gMDtcbmV4cG9ydCBjb25zdCBUVklFVyA9IDE7XG5leHBvcnQgY29uc3QgRkxBR1MgPSAyO1xuZXhwb3J0IGNvbnN0IFBBUkVOVCA9IDM7XG5leHBvcnQgY29uc3QgTkVYVCA9IDQ7XG5leHBvcnQgY29uc3QgUVVFUklFUyA9IDU7XG5leHBvcnQgY29uc3QgVF9IT1NUID0gNjtcbmV4cG9ydCBjb25zdCBDTEVBTlVQID0gNztcbmV4cG9ydCBjb25zdCBDT05URVhUID0gODtcbmV4cG9ydCBjb25zdCBJTkpFQ1RPUiA9IDk7XG5leHBvcnQgY29uc3QgUkVOREVSRVJfRkFDVE9SWSA9IDEwO1xuZXhwb3J0IGNvbnN0IFJFTkRFUkVSID0gMTE7XG5leHBvcnQgY29uc3QgU0FOSVRJWkVSID0gMTI7XG5leHBvcnQgY29uc3QgQ0hJTERfSEVBRCA9IDEzO1xuZXhwb3J0IGNvbnN0IENISUxEX1RBSUwgPSAxNDtcbmV4cG9ydCBjb25zdCBERUNMQVJBVElPTl9WSUVXID0gMTU7XG5leHBvcnQgY29uc3QgREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVcgPSAxNjtcbmV4cG9ydCBjb25zdCBERUNMQVJBVElPTl9MQ09OVEFJTkVSID0gMTc7XG5leHBvcnQgY29uc3QgUFJFT1JERVJfSE9PS19GTEFHUyA9IDE4O1xuLyoqIFNpemUgb2YgTFZpZXcncyBoZWFkZXIuIE5lY2Vzc2FyeSB0byBhZGp1c3QgZm9yIGl0IHdoZW4gc2V0dGluZyBzbG90cy4gICovXG5leHBvcnQgY29uc3QgSEVBREVSX09GRlNFVCA9IDE5O1xuXG5cbi8vIFRoaXMgaW50ZXJmYWNlIHJlcGxhY2VzIHRoZSByZWFsIExWaWV3IGludGVyZmFjZSBpZiBpdCBpcyBhbiBhcmcgb3IgYVxuLy8gcmV0dXJuIHZhbHVlIG9mIGEgcHVibGljIGluc3RydWN0aW9uLiBUaGlzIGVuc3VyZXMgd2UgZG9uJ3QgbmVlZCB0byBleHBvc2Vcbi8vIHRoZSBhY3R1YWwgaW50ZXJmYWNlLCB3aGljaCBzaG91bGQgYmUga2VwdCBwcml2YXRlLlxuZXhwb3J0IGludGVyZmFjZSBPcGFxdWVWaWV3U3RhdGUge1xuICAnX19icmFuZF9fJzogJ0JyYW5kIGZvciBPcGFxdWVWaWV3U3RhdGUgdGhhdCBub3RoaW5nIHdpbGwgbWF0Y2gnO1xufVxuXG5cbi8qKlxuICogYExWaWV3YCBzdG9yZXMgYWxsIG9mIHRoZSBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gcHJvY2VzcyB0aGUgaW5zdHJ1Y3Rpb25zIGFzXG4gKiB0aGV5IGFyZSBpbnZva2VkIGZyb20gdGhlIHRlbXBsYXRlLiBFYWNoIGVtYmVkZGVkIHZpZXcgYW5kIGNvbXBvbmVudCB2aWV3IGhhcyBpdHNcbiAqIG93biBgTFZpZXdgLiBXaGVuIHByb2Nlc3NpbmcgYSBwYXJ0aWN1bGFyIHZpZXcsIHdlIHNldCB0aGUgYHZpZXdEYXRhYCB0byB0aGF0XG4gKiBgTFZpZXdgLiBXaGVuIHRoYXQgdmlldyBpcyBkb25lIHByb2Nlc3NpbmcsIHRoZSBgdmlld0RhdGFgIGlzIHNldCBiYWNrIHRvXG4gKiB3aGF0ZXZlciB0aGUgb3JpZ2luYWwgYHZpZXdEYXRhYCB3YXMgYmVmb3JlICh0aGUgcGFyZW50IGBMVmlld2ApLlxuICpcbiAqIEtlZXBpbmcgc2VwYXJhdGUgc3RhdGUgZm9yIGVhY2ggdmlldyBmYWNpbGl0aWVzIHZpZXcgaW5zZXJ0aW9uIC8gZGVsZXRpb24sIHNvIHdlXG4gKiBkb24ndCBoYXZlIHRvIGVkaXQgdGhlIGRhdGEgYXJyYXkgYmFzZWQgb24gd2hpY2ggdmlld3MgYXJlIHByZXNlbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFZpZXcgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgLyoqXG4gICAqIFRoZSBob3N0IG5vZGUgZm9yIHRoaXMgTFZpZXcgaW5zdGFuY2UsIGlmIHRoaXMgaXMgYSBjb21wb25lbnQgdmlldy5cbiAgICogSWYgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3LCBIT1NUIHdpbGwgYmUgbnVsbC5cbiAgICovXG4gIFtIT1NUXTogUkVsZW1lbnR8bnVsbDtcblxuICAvKipcbiAgICogVGhlIHN0YXRpYyBkYXRhIGZvciB0aGlzIHZpZXcuIFdlIG5lZWQgYSByZWZlcmVuY2UgdG8gdGhpcyBzbyB3ZSBjYW4gZWFzaWx5IHdhbGsgdXAgdGhlXG4gICAqIG5vZGUgdHJlZSBpbiBESSBhbmQgZ2V0IHRoZSBUVmlldy5kYXRhIGFycmF5IGFzc29jaWF0ZWQgd2l0aCBhIG5vZGUgKHdoZXJlIHRoZVxuICAgKiBkaXJlY3RpdmUgZGVmcyBhcmUgc3RvcmVkKS5cbiAgICovXG4gIHJlYWRvbmx5W1RWSUVXXTogVFZpZXc7XG5cbiAgLyoqIEZsYWdzIGZvciB0aGlzIHZpZXcuIFNlZSBMVmlld0ZsYWdzIGZvciBtb3JlIGluZm8uICovXG4gIFtGTEFHU106IExWaWV3RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFRoaXMgbWF5IHN0b3JlIGFuIHtAbGluayBMVmlld30gb3Ige0BsaW5rIExDb250YWluZXJ9LlxuICAgKlxuICAgKiBgTFZpZXdgIC0gVGhlIHBhcmVudCB2aWV3LiBUaGlzIGlzIG5lZWRlZCB3aGVuIHdlIGV4aXQgdGhlIHZpZXcgYW5kIG11c3QgcmVzdG9yZSB0aGUgcHJldmlvdXNcbiAgICogTFZpZXcuIFdpdGhvdXQgdGhpcywgdGhlIHJlbmRlciBtZXRob2Qgd291bGQgaGF2ZSB0byBrZWVwIGEgc3RhY2sgb2ZcbiAgICogdmlld3MgYXMgaXQgaXMgcmVjdXJzaXZlbHkgcmVuZGVyaW5nIHRlbXBsYXRlcy5cbiAgICpcbiAgICogYExDb250YWluZXJgIC0gVGhlIGN1cnJlbnQgdmlldyBpcyBwYXJ0IG9mIGEgY29udGFpbmVyLCBhbmQgaXMgYW4gZW1iZWRkZWQgdmlldy5cbiAgICovXG4gIFtQQVJFTlRdOiBMVmlld3xMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqXG4gICAqXG4gICAqIFRoZSBuZXh0IHNpYmxpbmcgTFZpZXcgb3IgTENvbnRhaW5lci5cbiAgICpcbiAgICogQWxsb3dzIHVzIHRvIHByb3BhZ2F0ZSBiZXR3ZWVuIHNpYmxpbmcgdmlldyBzdGF0ZXMgdGhhdCBhcmVuJ3QgaW4gdGhlIHNhbWVcbiAgICogY29udGFpbmVyLiBFbWJlZGRlZCB2aWV3cyBhbHJlYWR5IGhhdmUgYSBub2RlLm5leHQsIGJ1dCBpdCBpcyBvbmx5IHNldCBmb3JcbiAgICogdmlld3MgaW4gdGhlIHNhbWUgY29udGFpbmVyLiBXZSBuZWVkIGEgd2F5IHRvIGxpbmsgY29tcG9uZW50IHZpZXdzIGFuZCB2aWV3c1xuICAgKiBhY3Jvc3MgY29udGFpbmVycyBhcyB3ZWxsLlxuICAgKi9cbiAgW05FWFRdOiBMVmlld3xMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqIFF1ZXJpZXMgYWN0aXZlIGZvciB0aGlzIHZpZXcgLSBub2RlcyBmcm9tIGEgdmlldyBhcmUgcmVwb3J0ZWQgdG8gdGhvc2UgcXVlcmllcy4gKi9cbiAgW1FVRVJJRVNdOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBgVFZpZXdOb2RlYCBvciBgVEVsZW1lbnROb2RlYCB3aGljaCByZXByZXNlbnRzIHRoZSByb290IG9mIHRoZSB2aWV3LlxuICAgKlxuICAgKiBJZiBgVFZpZXdOb2RlYCwgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3IG9mIGEgY29udGFpbmVyLiBXZSBuZWVkIHRoaXMgdG8gYmUgYWJsZSB0b1xuICAgKiBlZmZpY2llbnRseSBmaW5kIHRoZSBgTFZpZXdOb2RlYCB3aGVuIGluc2VydGluZyB0aGUgdmlldyBpbnRvIGFuIGFuY2hvci5cbiAgICpcbiAgICogSWYgYFRFbGVtZW50Tm9kZWAsIHRoaXMgaXMgdGhlIExWaWV3IG9mIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBJZiBudWxsLCB0aGlzIGlzIHRoZSByb290IHZpZXcgb2YgYW4gYXBwbGljYXRpb24gKHJvb3QgY29tcG9uZW50IGlzIGluIHRoaXMgdmlldykuXG4gICAqL1xuICBbVF9IT1NUXTogVFZpZXdOb2RlfFRFbGVtZW50Tm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyBpcyBkZXN0cm95ZWQsIGxpc3RlbmVycyBuZWVkIHRvIGJlIHJlbGVhc2VkIGFuZCBvdXRwdXRzIG5lZWQgdG8gYmVcbiAgICogdW5zdWJzY3JpYmVkLiBUaGlzIGNvbnRleHQgYXJyYXkgc3RvcmVzIGJvdGggbGlzdGVuZXIgZnVuY3Rpb25zIHdyYXBwZWQgd2l0aFxuICAgKiB0aGVpciBjb250ZXh0IGFuZCBvdXRwdXQgc3Vic2NyaXB0aW9uIGluc3RhbmNlcyBmb3IgYSBwYXJ0aWN1bGFyIHZpZXcuXG4gICAqXG4gICAqIFRoZXNlIGNoYW5nZSBwZXIgTFZpZXcgaW5zdGFuY2UsIHNvIHRoZXkgY2Fubm90IGJlIHN0b3JlZCBvbiBUVmlldy4gSW5zdGVhZCxcbiAgICogVFZpZXcuY2xlYW51cCBzYXZlcyBhbiBpbmRleCB0byB0aGUgbmVjZXNzYXJ5IGNvbnRleHQgaW4gdGhpcyBhcnJheS5cbiAgICovXG4gIC8vIFRPRE86IGZsYXR0ZW4gaW50byBMVmlld1tdXG4gIFtDTEVBTlVQXTogYW55W118bnVsbDtcblxuICAvKipcbiAgICogLSBGb3IgZHluYW1pYyB2aWV3cywgdGhpcyBpcyB0aGUgY29udGV4dCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUgKGUuZy5cbiAgICogICBgTmdGb3JDb250ZXh0YCksIG9yIGB7fWAgaWYgbm90IGRlZmluZWQgZXhwbGljaXRseS5cbiAgICogLSBGb3Igcm9vdCB2aWV3IG9mIHRoZSByb290IGNvbXBvbmVudCB0aGUgY29udGV4dCBjb250YWlucyBjaGFuZ2UgZGV0ZWN0aW9uIGRhdGEuXG4gICAqIC0gRm9yIG5vbi1yb290IGNvbXBvbmVudHMsIHRoZSBjb250ZXh0IGlzIHRoZSBjb21wb25lbnQgaW5zdGFuY2UsXG4gICAqIC0gRm9yIGlubGluZSB2aWV3cywgdGhlIGNvbnRleHQgaXMgbnVsbC5cbiAgICovXG4gIFtDT05URVhUXToge318Um9vdENvbnRleHR8bnVsbDtcblxuICAvKiogQW4gb3B0aW9uYWwgTW9kdWxlIEluamVjdG9yIHRvIGJlIHVzZWQgYXMgZmFsbCBiYWNrIGFmdGVyIEVsZW1lbnQgSW5qZWN0b3JzIGFyZSBjb25zdWx0ZWQuICovXG4gIHJlYWRvbmx5W0lOSkVDVE9SXTogSW5qZWN0b3J8bnVsbDtcblxuICAvKiogRmFjdG9yeSB0byBiZSB1c2VkIGZvciBjcmVhdGluZyBSZW5kZXJlci4gKi9cbiAgW1JFTkRFUkVSX0ZBQ1RPUlldOiBSZW5kZXJlckZhY3RvcnkzO1xuXG4gIC8qKiBSZW5kZXJlciB0byBiZSB1c2VkIGZvciB0aGlzIHZpZXcuICovXG4gIFtSRU5ERVJFUl06IFJlbmRlcmVyMztcblxuICAvKiogQW4gb3B0aW9uYWwgY3VzdG9tIHNhbml0aXplci4gKi9cbiAgW1NBTklUSVpFUl06IFNhbml0aXplcnxudWxsO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGZpcnN0IExWaWV3IG9yIExDb250YWluZXIgYmVuZWF0aCB0aGlzIExWaWV3IGluXG4gICAqIHRoZSBoaWVyYXJjaHkuXG4gICAqXG4gICAqIE5lY2Vzc2FyeSB0byBzdG9yZSB0aGlzIHNvIHZpZXdzIGNhbiB0cmF2ZXJzZSB0aHJvdWdoIHRoZWlyIG5lc3RlZCB2aWV3c1xuICAgKiB0byByZW1vdmUgbGlzdGVuZXJzIGFuZCBjYWxsIG9uRGVzdHJveSBjYWxsYmFja3MuXG4gICAqL1xuICBbQ0hJTERfSEVBRF06IExWaWV3fExDb250YWluZXJ8bnVsbDtcblxuICAvKipcbiAgICogVGhlIGxhc3QgTFZpZXcgb3IgTENvbnRhaW5lciBiZW5lYXRoIHRoaXMgTFZpZXcgaW4gdGhlIGhpZXJhcmNoeS5cbiAgICpcbiAgICogVGhlIHRhaWwgYWxsb3dzIHVzIHRvIHF1aWNrbHkgYWRkIGEgbmV3IHN0YXRlIHRvIHRoZSBlbmQgb2YgdGhlIHZpZXcgbGlzdFxuICAgKiB3aXRob3V0IGhhdmluZyB0byBwcm9wYWdhdGUgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3QgY2hpbGQuXG4gICAqL1xuICBbQ0hJTERfVEFJTF06IExWaWV3fExDb250YWluZXJ8bnVsbDtcblxuICAvKipcbiAgICogVmlldyB3aGVyZSB0aGlzIHZpZXcncyB0ZW1wbGF0ZSB3YXMgZGVjbGFyZWQuXG4gICAqXG4gICAqIE9ubHkgYXBwbGljYWJsZSBmb3IgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3cy4gV2lsbCBiZSBudWxsIGZvciBpbmxpbmUvY29tcG9uZW50IHZpZXdzLlxuICAgKlxuICAgKiBUaGUgdGVtcGxhdGUgZm9yIGEgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3IG1heSBiZSBkZWNsYXJlZCBpbiBhIGRpZmZlcmVudCB2aWV3IHRoYW5cbiAgICogaXQgaXMgaW5zZXJ0ZWQuIFdlIGFscmVhZHkgdHJhY2sgdGhlIFwiaW5zZXJ0aW9uIHZpZXdcIiAodmlldyB3aGVyZSB0aGUgdGVtcGxhdGUgd2FzXG4gICAqIGluc2VydGVkKSBpbiBMVmlld1tQQVJFTlRdLCBidXQgd2UgYWxzbyBuZWVkIGFjY2VzcyB0byB0aGUgXCJkZWNsYXJhdGlvbiB2aWV3XCJcbiAgICogKHZpZXcgd2hlcmUgdGhlIHRlbXBsYXRlIHdhcyBkZWNsYXJlZCkuIE90aGVyd2lzZSwgd2Ugd291bGRuJ3QgYmUgYWJsZSB0byBjYWxsIHRoZVxuICAgKiB2aWV3J3MgdGVtcGxhdGUgZnVuY3Rpb24gd2l0aCB0aGUgcHJvcGVyIGNvbnRleHRzLiBDb250ZXh0IHNob3VsZCBiZSBpbmhlcml0ZWQgZnJvbVxuICAgKiB0aGUgZGVjbGFyYXRpb24gdmlldyB0cmVlLCBub3QgdGhlIGluc2VydGlvbiB2aWV3IHRyZWUuXG4gICAqXG4gICAqIEV4YW1wbGUgKEFwcENvbXBvbmVudCB0ZW1wbGF0ZSk6XG4gICAqXG4gICAqIDxuZy10ZW1wbGF0ZSAjZm9vPjwvbmctdGVtcGxhdGU+ICAgICAgIDwtLSBkZWNsYXJlZCBoZXJlIC0tPlxuICAgKiA8c29tZS1jb21wIFt0cGxdPVwiZm9vXCI+PC9zb21lLWNvbXA+ICAgIDwtLSBpbnNlcnRlZCBpbnNpZGUgdGhpcyBjb21wb25lbnQgLS0+XG4gICAqXG4gICAqIFRoZSA8bmctdGVtcGxhdGU+IGFib3ZlIGlzIGRlY2xhcmVkIGluIHRoZSBBcHBDb21wb25lbnQgdGVtcGxhdGUsIGJ1dCBpdCB3aWxsIGJlIHBhc3NlZCBpbnRvXG4gICAqIFNvbWVDb21wIGFuZCBpbnNlcnRlZCB0aGVyZS4gSW4gdGhpcyBjYXNlLCB0aGUgZGVjbGFyYXRpb24gdmlldyB3b3VsZCBiZSB0aGUgQXBwQ29tcG9uZW50LFxuICAgKiBidXQgdGhlIGluc2VydGlvbiB2aWV3IHdvdWxkIGJlIFNvbWVDb21wLiBXaGVuIHdlIGFyZSByZW1vdmluZyB2aWV3cywgd2Ugd291bGQgd2FudCB0b1xuICAgKiB0cmF2ZXJzZSB0aHJvdWdoIHRoZSBpbnNlcnRpb24gdmlldyB0byBjbGVhbiB1cCBsaXN0ZW5lcnMuIFdoZW4gd2UgYXJlIGNhbGxpbmcgdGhlXG4gICAqIHRlbXBsYXRlIGZ1bmN0aW9uIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLCB3ZSBuZWVkIHRoZSBkZWNsYXJhdGlvbiB2aWV3IHRvIGdldCBpbmhlcml0ZWRcbiAgICogY29udGV4dC5cbiAgICovXG4gIFtERUNMQVJBVElPTl9WSUVXXTogTFZpZXd8bnVsbDtcblxuXG4gIC8qKlxuICAgKiBQb2ludHMgdG8gdGhlIGRlY2xhcmF0aW9uIGNvbXBvbmVudCB2aWV3LCB1c2VkIHRvIHRyYWNrIHRyYW5zcGxhbnRlZCBgTFZpZXdgcy5cbiAgICpcbiAgICogU2VlOiBgREVDTEFSQVRJT05fVklFV2Agd2hpY2ggcG9pbnRzIHRvIHRoZSBhY3R1YWwgYExWaWV3YCB3aGVyZSBpdCB3YXMgZGVjbGFyZWQsIHdoZXJlYXNcbiAgICogYERFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXYCBwb2ludHMgdG8gdGhlIGNvbXBvbmVudCB3aGljaCBtYXkgbm90IGJlIHNhbWUgYXNcbiAgICogYERFQ0xBUkFUSU9OX1ZJRVdgLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBcbiAgICogPCNWSUVXICNteUNvbXA+XG4gICAqICA8ZGl2ICpuZ0lmPVwidHJ1ZVwiPlxuICAgKiAgIDxuZy10ZW1wbGF0ZSAjbXlUbXBsPi4uLjwvbmctdGVtcGxhdGU+XG4gICAqICA8L2Rpdj5cbiAgICogPC8jVklFVz5cbiAgICogYGBgXG4gICAqIEluIHRoZSBhYm92ZSBjYXNlIGBERUNMQVJBVElPTl9WSUVXYCBmb3IgYG15VG1wbGAgcG9pbnRzIHRvIHRoZSBgTFZpZXdgIG9mIGBuZ0lmYCB3aGVyZWFzXG4gICAqIGBERUNMQVJBVElPTl9DT01QT05FTlRfVklFV2AgcG9pbnRzIHRvIGBMVmlld2Agb2YgdGhlIGBteUNvbXBgIHdoaWNoIG93bnMgdGhlIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUaGUgcmVhc29uIGZvciB0aGlzIGlzIHRoYXQgYWxsIGVtYmVkZGVkIHZpZXdzIGFyZSBhbHdheXMgY2hlY2stYWx3YXlzIHdoZXJlYXMgdGhlIGNvbXBvbmVudFxuICAgKiB2aWV3IGNhbiBiZSBjaGVjay1hbHdheXMgb3Igb24tcHVzaC4gV2hlbiB3ZSBoYXZlIGEgdHJhbnNwbGFudGVkIHZpZXcgaXQgaXMgaW1wb3J0YW50IHRvXG4gICAqIGRldGVybWluZSBpZiB3ZSBoYXZlIHRyYW5zcGxhbnRlZCBhIHZpZXcgZnJvbSBjaGVjay1hbHdheXMgZGVjbGFyYXRpb24gdG8gb24tcHVzaCBpbnNlcnRpb25cbiAgICogcG9pbnQuIEluIHN1Y2ggYSBjYXNlIHRoZSB0cmFuc3BsYW50ZWQgdmlldyBuZWVkcyB0byBiZSBhZGRlZCB0byB0aGUgYExDb250YWluZXJgIGluIHRoZVxuICAgKiBkZWNsYXJlZCBgTFZpZXdgIGFuZCBDRCBkdXJpbmcgdGhlIGRlY2xhcmVkIHZpZXcgQ0QgKGluIGFkZGl0aW9uIHRvIHRoZSBDRCBhdCB0aGUgaW5zZXJ0aW9uXG4gICAqIHBvaW50LikgKEFueSB0cmFuc3BsYW50ZWQgdmlld3Mgd2hpY2ggYXJlIGludHJhIENvbXBvbmVudCBhcmUgb2Ygbm8gaW50ZXJlc3QgYmVjYXVzZSB0aGUgQ0RcbiAgICogc3RyYXRlZ3kgb2YgZGVjbGFyYXRpb24gYW5kIGluc2VydGlvbiB3aWxsIGFsd2F5cyBiZSB0aGUgc2FtZSwgYmVjYXVzZSBpdCBpcyB0aGUgc2FtZVxuICAgKiBjb21wb25lbnQuKVxuICAgKlxuICAgKiBRdWVyaWVzIGFscmVhZHkgdHJhY2sgbW92ZWQgdmlld3MgaW4gYExWaWV3W0RFQ0xBUkFUSU9OX0xDT05UQUlORVJdYCBhbmRcbiAgICogYExDb250YWluZXJbTU9WRURfVklFV1NdYC4gSG93ZXZlciB0aGUgcXVlcmllcyBhbHNvIHRyYWNrIGBMVmlld2BzIHdoaWNoIG1vdmVkIHdpdGhpbiB0aGUgc2FtZVxuICAgKiBjb21wb25lbnQgYExWaWV3YC4gVHJhbnNwbGFudGVkIHZpZXdzIGFyZSBhIHN1YnNldCBvZiBtb3ZlZCB2aWV3cywgYW5kIHdlIHVzZVxuICAgKiBgREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVdgIHRvIGRpZmZlcmVudGlhdGUgdGhlbS4gQXMgaW4gdGhpcyBleGFtcGxlLlxuICAgKlxuICAgKiBFeGFtcGxlIHNob3dpbmcgaW50cmEgY29tcG9uZW50IGBMVmlld2AgbW92ZW1lbnQuXG4gICAqIGBgYFxuICAgKiA8I1ZJRVcgI215Q29tcD5cbiAgICogICA8ZGl2ICpuZ0lmPVwiY29uZGl0aW9uOyB0aGVuIHRoZW5CbG9jayBlbHNlIGVsc2VCbG9ja1wiPjwvZGl2PlxuICAgKiAgIDxuZy10ZW1wbGF0ZSAjdGhlbkJsb2NrPkNvbnRlbnQgdG8gcmVuZGVyIHdoZW4gY29uZGl0aW9uIGlzIHRydWUuPC9uZy10ZW1wbGF0ZT5cbiAgICogICA8bmctdGVtcGxhdGUgI2Vsc2VCbG9jaz5Db250ZW50IHRvIHJlbmRlciB3aGVuIGNvbmRpdGlvbiBpcyBmYWxzZS48L25nLXRlbXBsYXRlPlxuICAgKiA8LyNWSUVXPlxuICAgKiBgYGBcbiAgICogVGhlIGB0aGVuQmxvY2tgIGFuZCBgZWxzZUJsb2NrYCBpcyBtb3ZlZCBidXQgbm90IHRyYW5zcGxhbnRlZC5cbiAgICpcbiAgICogRXhhbXBsZSBzaG93aW5nIGludGVyIGNvbXBvbmVudCBgTFZpZXdgIG1vdmVtZW50ICh0cmFuc3BsYW50ZWQgdmlldykuXG4gICAqIGBgYFxuICAgKiA8I1ZJRVcgI215Q29tcD5cbiAgICogICA8bmctdGVtcGxhdGUgI215VG1wbD4uLi48L25nLXRlbXBsYXRlPlxuICAgKiAgIDxpbnNlcnRpb24tY29tcG9uZW50IFt0ZW1wbGF0ZV09XCJteVRtcGxcIj48L2luc2VydGlvbi1jb21wb25lbnQ+XG4gICAqIDwvI1ZJRVc+XG4gICAqIGBgYFxuICAgKiBJbiB0aGUgYWJvdmUgZXhhbXBsZSBgbXlUbXBsYCBpcyBwYXNzZWQgaW50byBhIGRpZmZlcmVudCBjb21wb25lbnQuIElmIGBpbnNlcnRpb24tY29tcG9uZW50YFxuICAgKiBpbnN0YW50aWF0ZXMgYG15VG1wbGAgYW5kIGBpbnNlcnRpb24tY29tcG9uZW50YCBpcyBvbi1wdXNoIHRoZW4gdGhlIGBMQ29udGFpbmVyYCBuZWVkcyB0byBiZVxuICAgKiBtYXJrZWQgYXMgY29udGFpbmluZyB0cmFuc3BsYW50ZWQgdmlld3MgYW5kIHRob3NlIHZpZXdzIG5lZWQgdG8gYmUgQ0QgYXMgcGFydCBvZiB0aGVcbiAgICogZGVjbGFyYXRpb24gQ0QuXG4gICAqXG4gICAqXG4gICAqIFdoZW4gY2hhbmdlIGRldGVjdGlvbiBydW5zLCBpdCBpdGVyYXRlcyBvdmVyIGBbTU9WRURfVklFV1NdYCBhbmQgQ0RzIGFueSBjaGlsZCBgTFZpZXdgcyB3aGVyZVxuICAgKiB0aGUgYERFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXYCBvZiB0aGUgY3VycmVudCBjb21wb25lbnQgYW5kIHRoZSBjaGlsZCBgTFZpZXdgIGRvZXMgbm90IG1hdGNoXG4gICAqIChpdCBoYXMgYmVlbiB0cmFuc3BsYW50ZWQgYWNyb3NzIGNvbXBvbmVudHMuKVxuICAgKlxuICAgKiBOb3RlOiBgW0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXWAgcG9pbnRzIHRvIGl0c2VsZiBpZiB0aGUgTFZpZXcgaXMgYSBjb21wb25lbnQgdmlldyAodGhlXG4gICAqICAgICAgIHNpbXBsZXN0IC8gbW9zdCBjb21tb24gY2FzZSkuXG4gICAqXG4gICAqIHNlZSBhbHNvOlxuICAgKiAgIC0gaHR0cHM6Ly9oYWNrbWQuaW8vQG1oZXZlcnkvckpVSnN2djlIIHdyaXRlIHVwIG9mIHRoZSBwcm9ibGVtXG4gICAqICAgLSBgTENvbnRhaW5lcltBQ1RJVkVfSU5ERVhdYCBmb3IgZmxhZyB3aGljaCBtYXJrcyB3aGljaCBgTENvbnRhaW5lcmAgaGFzIHRyYW5zcGxhbnRlZCB2aWV3cy5cbiAgICogICAtIGBMQ29udGFpbmVyW1RSQU5TUExBTlRfSEVBRF1gIGFuZCBgTENvbnRhaW5lcltUUkFOU1BMQU5UX1RBSUxdYCBzdG9yYWdlIGZvciB0cmFuc3BsYW50ZWRcbiAgICogICAtIGBMVmlld1tERUNMQVJBVElPTl9MQ09OVEFJTkVSXWAgc2ltaWxhciBwcm9ibGVtIGZvciBxdWVyaWVzXG4gICAqICAgLSBgTENvbnRhaW5lcltNT1ZFRF9WSUVXU11gIHNpbWlsYXIgcHJvYmxlbSBmb3IgcXVlcmllc1xuICAgKi9cbiAgW0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXXTogTFZpZXc7XG5cbiAgLyoqXG4gICAqIEEgZGVjbGFyYXRpb24gcG9pbnQgb2YgZW1iZWRkZWQgdmlld3MgKG9uZXMgaW5zdGFudGlhdGVkIGJhc2VkIG9uIHRoZSBjb250ZW50IG9mIGFcbiAgICogPG5nLXRlbXBsYXRlPiksIG51bGwgZm9yIG90aGVyIHR5cGVzIG9mIHZpZXdzLlxuICAgKlxuICAgKiBXZSBuZWVkIHRvIHRyYWNrIGFsbCBlbWJlZGRlZCB2aWV3cyBjcmVhdGVkIGZyb20gYSBnaXZlbiBkZWNsYXJhdGlvbiBwb2ludCBzbyB3ZSBjYW4gcHJlcGFyZVxuICAgKiBxdWVyeSBtYXRjaGVzIGluIGEgcHJvcGVyIG9yZGVyIChxdWVyeSBtYXRjaGVzIGFyZSBvcmRlcmVkIGJhc2VkIG9uIHRoZWlyIGRlY2xhcmF0aW9uIHBvaW50IGFuZFxuICAgKiBfbm90XyB0aGUgaW5zZXJ0aW9uIHBvaW50KS5cbiAgICovXG4gIFtERUNMQVJBVElPTl9MQ09OVEFJTkVSXTogTENvbnRhaW5lcnxudWxsO1xuXG4gIC8qKlxuICAgKiBNb3JlIGZsYWdzIGZvciB0aGlzIHZpZXcuIFNlZSBQcmVPcmRlckhvb2tGbGFncyBmb3IgbW9yZSBpbmZvLlxuICAgKi9cbiAgW1BSRU9SREVSX0hPT0tfRkxBR1NdOiBQcmVPcmRlckhvb2tGbGFncztcbn1cblxuLyoqIEZsYWdzIGFzc29jaWF0ZWQgd2l0aCBhbiBMVmlldyAoc2F2ZWQgaW4gTFZpZXdbRkxBR1NdKSAqL1xuZXhwb3J0IGNvbnN0IGVudW0gTFZpZXdGbGFncyB7XG4gIC8qKiBUaGUgc3RhdGUgb2YgdGhlIGluaXQgcGhhc2Ugb24gdGhlIGZpcnN0IDIgYml0cyAqL1xuICBJbml0UGhhc2VTdGF0ZUluY3JlbWVudGVyID0gMGIwMDAwMDAwMDAwMSxcbiAgSW5pdFBoYXNlU3RhdGVNYXNrID0gMGIwMDAwMDAwMDAxMSxcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHZpZXcgaXMgaW4gY3JlYXRpb25Nb2RlLlxuICAgKlxuICAgKiBUaGlzIG11c3QgYmUgc3RvcmVkIGluIHRoZSB2aWV3IHJhdGhlciB0aGFuIHVzaW5nIGBkYXRhYCBhcyBhIG1hcmtlciBzbyB0aGF0XG4gICAqIHdlIGNhbiBwcm9wZXJseSBzdXBwb3J0IGVtYmVkZGVkIHZpZXdzLiBPdGhlcndpc2UsIHdoZW4gZXhpdGluZyBhIGNoaWxkIHZpZXdcbiAgICogYmFjayBpbnRvIHRoZSBwYXJlbnQgdmlldywgYGRhdGFgIHdpbGwgYmUgZGVmaW5lZCBhbmQgYGNyZWF0aW9uTW9kZWAgd2lsbCBiZVxuICAgKiBpbXByb3Blcmx5IHJlcG9ydGVkIGFzIGZhbHNlLlxuICAgKi9cbiAgQ3JlYXRpb25Nb2RlID0gMGIwMDAwMDAwMDEwMCxcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhpcyBMVmlldyBpbnN0YW5jZSBpcyBvbiBpdHMgZmlyc3QgcHJvY2Vzc2luZyBwYXNzLlxuICAgKlxuICAgKiBBbiBMVmlldyBpbnN0YW5jZSBpcyBjb25zaWRlcmVkIHRvIGJlIG9uIGl0cyBcImZpcnN0IHBhc3NcIiB1bnRpbCBpdFxuICAgKiBoYXMgY29tcGxldGVkIG9uZSBjcmVhdGlvbiBtb2RlIHJ1biBhbmQgb25lIHVwZGF0ZSBtb2RlIHJ1bi4gQXQgdGhpc1xuICAgKiB0aW1lLCB0aGUgZmxhZyBpcyB0dXJuZWQgb2ZmLlxuICAgKi9cbiAgRmlyc3RMVmlld1Bhc3MgPSAwYjAwMDAwMDAxMDAwLFxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgdmlldyBoYXMgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0aW9uIHN0cmF0ZWd5IChjaGVja3MgYWx3YXlzKSBvciBvblB1c2ggKi9cbiAgQ2hlY2tBbHdheXMgPSAwYjAwMDAwMDEwMDAwLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCBtYW51YWwgY2hhbmdlIGRldGVjdGlvbiBpcyB0dXJuZWQgb24gZm9yIG9uUHVzaCBjb21wb25lbnRzLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCBtb2RlIHRoYXQgb25seSBtYXJrcyBjb21wb25lbnRzIGRpcnR5IGluIHR3byBjYXNlczpcbiAgICogMSkgVGhlcmUgaGFzIGJlZW4gYSBjaGFuZ2UgdG8gYW4gQElucHV0IHByb3BlcnR5XG4gICAqIDIpIGBtYXJrRGlydHkoKWAgaGFzIGJlZW4gY2FsbGVkIG1hbnVhbGx5IGJ5IHRoZSB1c2VyXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpbiB0aGlzIG1vZGUsIHRoZSBmaXJpbmcgb2YgZXZlbnRzIGRvZXMgTk9UIG1hcmsgY29tcG9uZW50c1xuICAgKiBkaXJ0eSBhdXRvbWF0aWNhbGx5LlxuICAgKlxuICAgKiBNYW51YWwgbW9kZSBpcyB0dXJuZWQgb2ZmIGJ5IGRlZmF1bHQgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCBhcyBldmVudHNcbiAgICogYXV0b21hdGljYWxseSBtYXJrIE9uUHVzaCBjb21wb25lbnRzIGRpcnR5IGluIFZpZXcgRW5naW5lLlxuICAgKlxuICAgKiBUT0RPOiBBZGQgYSBwdWJsaWMgQVBJIHRvIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IHRvIHR1cm4gdGhpcyBtb2RlIG9uXG4gICAqL1xuICBNYW51YWxPblB1c2ggPSAwYjAwMDAwMTAwMDAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgY3VycmVudGx5IGRpcnR5IChuZWVkaW5nIGNoZWNrKSAqL1xuICBEaXJ0eSA9IDBiMDAwMDAxMDAwMDAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgY3VycmVudGx5IGF0dGFjaGVkIHRvIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS4gKi9cbiAgQXR0YWNoZWQgPSAwYjAwMDAxMDAwMDAwMCxcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB2aWV3IGlzIGRlc3Ryb3llZC4gKi9cbiAgRGVzdHJveWVkID0gMGIwMDAxMDAwMDAwMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyB0aGUgcm9vdCB2aWV3ICovXG4gIElzUm9vdCA9IDBiMDAxMDAwMDAwMDAwLFxuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgY3VycmVudCBpbml0IHBoYXNlIG9uIGxhc3QgMjIgYml0c1xuICAgKi9cbiAgSW5kZXhXaXRoaW5Jbml0UGhhc2VJbmNyZW1lbnRlciA9IDBiMDEwMDAwMDAwMDAwLFxuICBJbmRleFdpdGhpbkluaXRQaGFzZVNoaWZ0ID0gMTAsXG4gIEluZGV4V2l0aGluSW5pdFBoYXNlUmVzZXQgPSAwYjAwMTExMTExMTExMSxcbn1cblxuLyoqXG4gKiBQb3NzaWJsZSBzdGF0ZXMgb2YgdGhlIGluaXQgcGhhc2U6XG4gKiAtIDAwOiBPbkluaXQgaG9va3MgdG8gYmUgcnVuLlxuICogLSAwMTogQWZ0ZXJDb250ZW50SW5pdCBob29rcyB0byBiZSBydW5cbiAqIC0gMTA6IEFmdGVyVmlld0luaXQgaG9va3MgdG8gYmUgcnVuXG4gKiAtIDExOiBBbGwgaW5pdCBob29rcyBoYXZlIGJlZW4gcnVuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEluaXRQaGFzZVN0YXRlIHtcbiAgT25Jbml0SG9va3NUb0JlUnVuID0gMGIwMCxcbiAgQWZ0ZXJDb250ZW50SW5pdEhvb2tzVG9CZVJ1biA9IDBiMDEsXG4gIEFmdGVyVmlld0luaXRIb29rc1RvQmVSdW4gPSAwYjEwLFxuICBJbml0UGhhc2VDb21wbGV0ZWQgPSAwYjExLFxufVxuXG4vKiogTW9yZSBmbGFncyBhc3NvY2lhdGVkIHdpdGggYW4gTFZpZXcgKHNhdmVkIGluIExWaWV3W1BSRU9SREVSX0hPT0tfRkxBR1NdKSAqL1xuZXhwb3J0IGNvbnN0IGVudW0gUHJlT3JkZXJIb29rRmxhZ3Mge1xuICAvKiogVGhlIGluZGV4IG9mIHRoZSBuZXh0IHByZS1vcmRlciBob29rIHRvIGJlIGNhbGxlZCBpbiB0aGUgaG9va3MgYXJyYXksIG9uIHRoZSBmaXJzdCAxNlxuICAgICBiaXRzICovXG4gIEluZGV4T2ZUaGVOZXh0UHJlT3JkZXJIb29rTWFza01hc2sgPSAwYjAxMTExMTExMTExMTExMTExLFxuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIGluaXQgaG9va3MgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBjYWxsZWQsIG9uIHRoZSBsYXN0IDE2IGJpdHNcbiAgICovXG4gIE51bWJlck9mSW5pdEhvb2tzQ2FsbGVkSW5jcmVtZW50ZXIgPSAwYjAxMDAwMDAwMDAwMDAwMDAwMCxcbiAgTnVtYmVyT2ZJbml0SG9va3NDYWxsZWRTaGlmdCA9IDE2LFxuICBOdW1iZXJPZkluaXRIb29rc0NhbGxlZE1hc2sgPSAwYjExMTExMTExMTExMTExMTEwMDAwMDAwMDAwMDAwMDAwLFxufVxuXG4vKipcbiAqIFNldCBvZiBpbnN0cnVjdGlvbnMgdXNlZCB0byBwcm9jZXNzIGhvc3QgYmluZGluZ3MgZWZmaWNpZW50bHkuXG4gKlxuICogU2VlIFZJRVdfREFUQS5tZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeHBhbmRvSW5zdHJ1Y3Rpb25zIGV4dGVuZHMgQXJyYXk8bnVtYmVyfEhvc3RCaW5kaW5nc0Z1bmN0aW9uPGFueT58bnVsbD4ge31cblxuLyoqXG4gKiBFeHBsaWNpdGx5IG1hcmtzIGBUVmlld2AgYXMgYSBzcGVjaWZpYyB0eXBlIGluIGBuZ0Rldk1vZGVgXG4gKlxuICogSXQgaXMgdXNlZnVsIHRvIGtub3cgY29uY2VwdHVhbGx5IHdoYXQgdGltZSBvZiBgVFZpZXdgIHdlIGFyZSBkZWFsaW5nIHdpdGggd2hlblxuICogZGVidWdnaW5nIGFuIGFwcGxpY2F0aW9uIChldmVuIGlmIHRoZSBydW50aW1lIGRvZXMgbm90IG5lZWQgaXQuKSBGb3IgdGhpcyByZWFzb25cbiAqIHdlIHN0b3JlIHRoaXMgaW5mb3JtYXRpb24gaW4gdGhlIGBuZ0Rldk1vZGVgIGBUVmlld2AgYW5kIHRoYW4gdXNlIGl0IGZvclxuICogYmV0dGVyIGRlYnVnZ2luZyBleHBlcmllbmNlLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBUVmlld1R5cGUge1xuICAvKipcbiAgICogUm9vdCBgVFZpZXdgIGlzIHRoZSB1c2VkIHRvIGJvb3RzdHJhcCBjb21wb25lbnRzIGludG8uIEl0IGlzIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aFxuICAgKiBgTFZpZXdgIHdoaWNoIHRha2VzIGFuIGV4aXN0aW5nIERPTSBub2RlIG5vdCBvd25lZCBieSBBbmd1bGFyIGFuZCB3cmFwcyBpdCBpbiBgVFZpZXdgL2BMVmlld2BcbiAgICogc28gdGhhdCBvdGhlciBjb21wb25lbnRzIGNhbiBiZSBsb2FkZWQgaW50byBpdC5cbiAgICovXG4gIFJvb3QgPSAwLFxuXG4gIC8qKlxuICAgKiBgVFZpZXdgIGFzc29jaWF0ZWQgd2l0aCBhIENvbXBvbmVudC4gVGhpcyB3b3VsZCBiZSB0aGUgYFRWaWV3YCBkaXJlY3RseSBhc3NvY2lhdGVkIHdpdGggdGhlXG4gICAqIGNvbXBvbmVudCB2aWV3IChhcyBvcHBvc2VkIGFuIGBFbWJlZGRlZGAgYFRWaWV3YCB3aGljaCB3b3VsZCBiZSBhIGNoaWxkIG9mIGBDb21wb25lbnRgIGBUVmlld2ApXG4gICAqL1xuICBDb21wb25lbnQgPSAxLFxuXG4gIC8qKlxuICAgKiBgVFZpZXdgIGFzc29jaWF0ZWQgd2l0aCBhIHRlbXBsYXRlLiBTdWNoIGFzIGAqbmdJZmAsIGA8bmctdGVtcGxhdGU+YCBldGMuLi4gQSBgQ29tcG9uZW50YFxuICAgKiBjYW4gaGF2ZSB6ZXJvIG9yIG1vcmUgYEVtYmVkZWRlYCBgVFZpZXdgcy5cbiAgICovXG4gIEVtYmVkZGVkID0gMixcbn1cblxuLyoqXG4gKiBUaGUgc3RhdGljIGRhdGEgZm9yIGFuIExWaWV3IChzaGFyZWQgYmV0d2VlbiBhbGwgdGVtcGxhdGVzIG9mIGFcbiAqIGdpdmVuIHR5cGUpLlxuICpcbiAqIFN0b3JlZCBvbiB0aGUgYENvbXBvbmVudERlZi50Vmlld2AuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVFZpZXcge1xuICAvKipcbiAgICogVHlwZSBvZiBgVFZpZXdgIChgUm9vdGB8YENvbXBvbmVudGB8YEVtYmVkZGVkYCkuXG4gICAqL1xuICB0eXBlOiBUVmlld1R5cGU7XG5cbiAgLyoqXG4gICAqIElEIGZvciBpbmxpbmUgdmlld3MgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSB2aWV3IGlzIHRoZSBzYW1lIGFzIHRoZSBwcmV2aW91cyB2aWV3XG4gICAqIGluIGEgY2VydGFpbiBwb3NpdGlvbi4gSWYgaXQncyBub3QsIHdlIGtub3cgdGhlIG5ldyB2aWV3IG5lZWRzIHRvIGJlIGluc2VydGVkXG4gICAqIGFuZCB0aGUgb25lIHRoYXQgZXhpc3RzIG5lZWRzIHRvIGJlIHJlbW92ZWQgKGUuZy4gaWYvZWxzZSBzdGF0ZW1lbnRzKVxuICAgKlxuICAgKiBJZiB0aGlzIGlzIC0xLCB0aGVuIHRoaXMgaXMgYSBjb21wb25lbnQgdmlldyBvciBhIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlldy5cbiAgICovXG4gIHJlYWRvbmx5IGlkOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBibHVlcHJpbnQgdXNlZCB0byBnZW5lcmF0ZSBMVmlldyBpbnN0YW5jZXMgZm9yIHRoaXMgVFZpZXcuIENvcHlpbmcgdGhpc1xuICAgKiBibHVlcHJpbnQgaXMgZmFzdGVyIHRoYW4gY3JlYXRpbmcgYSBuZXcgTFZpZXcgZnJvbSBzY3JhdGNoLlxuICAgKi9cbiAgYmx1ZXByaW50OiBMVmlldztcblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIGZ1bmN0aW9uIHVzZWQgdG8gcmVmcmVzaCB0aGUgdmlldyBvZiBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzXG4gICAqIGFuZCBjb21wb25lbnRzLiBXaWxsIGJlIG51bGwgZm9yIGlubGluZSB2aWV3cy5cbiAgICovXG4gIHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTx7fT58bnVsbDtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiBjb250YWluaW5nIHF1ZXJ5LXJlbGF0ZWQgaW5zdHJ1Y3Rpb25zLlxuICAgKi9cbiAgdmlld1F1ZXJ5OiBWaWV3UXVlcmllc0Z1bmN0aW9uPHt9PnxudWxsO1xuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBob3N0IGBUTm9kZWAgKG5vdCBwYXJ0IG9mIHRoaXMgVFZpZXcpLlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIGEgYFRWaWV3Tm9kZWAgZm9yIGFuIGBMVmlld05vZGVgLCB0aGlzIGlzIGFuIGVtYmVkZGVkIHZpZXcgb2YgYSBjb250YWluZXIuXG4gICAqIFdlIG5lZWQgdGhpcyBwb2ludGVyIHRvIGJlIGFibGUgdG8gZWZmaWNpZW50bHkgZmluZCB0aGlzIG5vZGUgd2hlbiBpbnNlcnRpbmcgdGhlIHZpZXdcbiAgICogaW50byBhbiBhbmNob3IuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBgVEVsZW1lbnROb2RlYCwgdGhpcyBpcyB0aGUgdmlldyBvZiBhIHJvb3QgY29tcG9uZW50LiBJdCBoYXMgZXhhY3RseSBvbmVcbiAgICogcm9vdCBUTm9kZS5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBudWxsLCB0aGlzIGlzIHRoZSB2aWV3IG9mIGEgY29tcG9uZW50IHRoYXQgaXMgbm90IGF0IHJvb3QuIFdlIGRvIG5vdCBzdG9yZVxuICAgKiB0aGUgaG9zdCBUTm9kZXMgZm9yIGNoaWxkIGNvbXBvbmVudCB2aWV3cyBiZWNhdXNlIHRoZXkgY2FuIHBvdGVudGlhbGx5IGhhdmUgc2V2ZXJhbFxuICAgKiBkaWZmZXJlbnQgaG9zdCBUTm9kZXMsIGRlcGVuZGluZyBvbiB3aGVyZSB0aGUgY29tcG9uZW50IGlzIGJlaW5nIHVzZWQuIFRoZXNlIGhvc3RcbiAgICogVE5vZGVzIGNhbm5vdCBiZSBzaGFyZWQgKGR1ZSB0byBkaWZmZXJlbnQgaW5kaWNlcywgZXRjKS5cbiAgICovXG4gIG5vZGU6IFRWaWV3Tm9kZXxURWxlbWVudE5vZGV8bnVsbDtcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB0ZW1wbGF0ZSBoYXMgYmVlbiBwcm9jZXNzZWQgaW4gY3JlYXRpb24gbW9kZS4gKi9cbiAgZmlyc3RDcmVhdGVQYXNzOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGUgZmlyc3QgdXBkYXRlIGZvciB0aGlzIHRlbXBsYXRlIGhhcyBiZWVuIHByb2Nlc3NlZC4gKi9cbiAgZmlyc3RVcGRhdGVQYXNzOiBib29sZWFuO1xuXG4gIC8qKiBTdGF0aWMgZGF0YSBlcXVpdmFsZW50IG9mIExWaWV3LmRhdGFbXS4gQ29udGFpbnMgVE5vZGVzLCBQaXBlRGVmSW50ZXJuYWwgb3IgVEkxOG4uICovXG4gIGRhdGE6IFREYXRhO1xuXG4gIC8qKlxuICAgKiBUaGUgYmluZGluZyBzdGFydCBpbmRleCBpcyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGRhdGEgYXJyYXlcbiAgICogc3RhcnRzIHRvIHN0b3JlIGJpbmRpbmdzIG9ubHkuIFNhdmluZyB0aGlzIHZhbHVlIGVuc3VyZXMgdGhhdCB3ZVxuICAgKiB3aWxsIGJlZ2luIHJlYWRpbmcgYmluZGluZ3MgYXQgdGhlIGNvcnJlY3QgcG9pbnQgaW4gdGhlIGFycmF5IHdoZW5cbiAgICogd2UgYXJlIGluIHVwZGF0ZSBtb2RlLlxuICAgKlxuICAgKiAtMSBtZWFucyB0aGF0IGl0IGhhcyBub3QgYmVlbiBpbml0aWFsaXplZC5cbiAgICovXG4gIGJpbmRpbmdTdGFydEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCB3aGVyZSB0aGUgXCJleHBhbmRvXCIgc2VjdGlvbiBvZiBgTFZpZXdgIGJlZ2lucy4gVGhlIGV4cGFuZG9cbiAgICogc2VjdGlvbiBjb250YWlucyBpbmplY3RvcnMsIGRpcmVjdGl2ZSBpbnN0YW5jZXMsIGFuZCBob3N0IGJpbmRpbmcgdmFsdWVzLlxuICAgKiBVbmxpa2UgdGhlIFwiZGVjbHNcIiBhbmQgXCJ2YXJzXCIgc2VjdGlvbnMgb2YgYExWaWV3YCwgdGhlIGxlbmd0aCBvZiB0aGlzXG4gICAqIHNlY3Rpb24gY2Fubm90IGJlIGNhbGN1bGF0ZWQgYXQgY29tcGlsZS10aW1lIGJlY2F1c2UgZGlyZWN0aXZlcyBhcmUgbWF0Y2hlZFxuICAgKiBhdCBydW50aW1lIHRvIHByZXNlcnZlIGxvY2FsaXR5LlxuICAgKlxuICAgKiBXZSBzdG9yZSB0aGlzIHN0YXJ0IGluZGV4IHNvIHdlIGtub3cgd2hlcmUgdG8gc3RhcnQgY2hlY2tpbmcgaG9zdCBiaW5kaW5nc1xuICAgKiBpbiBgc2V0SG9zdEJpbmRpbmdzYC5cbiAgICovXG4gIGV4cGFuZG9TdGFydEluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZXJlIGFyZSBhbnkgc3RhdGljIHZpZXcgcXVlcmllcyB0cmFja2VkIG9uIHRoaXMgdmlldy5cbiAgICpcbiAgICogV2Ugc3RvcmUgdGhpcyBzbyB3ZSBrbm93IHdoZXRoZXIgb3Igbm90IHdlIHNob3VsZCBkbyBhIHZpZXcgcXVlcnlcbiAgICogcmVmcmVzaCBhZnRlciBjcmVhdGlvbiBtb2RlIHRvIGNvbGxlY3Qgc3RhdGljIHF1ZXJ5IHJlc3VsdHMuXG4gICAqL1xuICBzdGF0aWNWaWV3UXVlcmllczogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlcmUgYXJlIGFueSBzdGF0aWMgY29udGVudCBxdWVyaWVzIHRyYWNrZWQgb24gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBXZSBzdG9yZSB0aGlzIHNvIHdlIGtub3cgd2hldGhlciBvciBub3Qgd2Ugc2hvdWxkIGRvIGEgY29udGVudCBxdWVyeVxuICAgKiByZWZyZXNoIGFmdGVyIGNyZWF0aW9uIG1vZGUgdG8gY29sbGVjdCBzdGF0aWMgcXVlcnkgcmVzdWx0cy5cbiAgICovXG4gIHN0YXRpY0NvbnRlbnRRdWVyaWVzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZmlyc3QgY2hpbGQgbm9kZSBsb2NhdGVkIGluIHRoZSB2aWV3LlxuICAgKi9cbiAgZmlyc3RDaGlsZDogVE5vZGV8bnVsbDtcblxuICAvKipcbiAgICogU2V0IG9mIGluc3RydWN0aW9ucyB1c2VkIHRvIHByb2Nlc3MgaG9zdCBiaW5kaW5ncyBlZmZpY2llbnRseS5cbiAgICpcbiAgICogU2VlIFZJRVdfREFUQS5tZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGV4cGFuZG9JbnN0cnVjdGlvbnM6IEV4cGFuZG9JbnN0cnVjdGlvbnN8bnVsbDtcblxuICAvKipcbiAgICogRnVsbCByZWdpc3RyeSBvZiBkaXJlY3RpdmVzIGFuZCBjb21wb25lbnRzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogSXQncyBuZWNlc3NhcnkgdG8ga2VlcCBhIGNvcHkgb2YgdGhlIGZ1bGwgZGVmIGxpc3Qgb24gdGhlIFRWaWV3IHNvIGl0J3MgcG9zc2libGVcbiAgICogdG8gcmVuZGVyIHRlbXBsYXRlIGZ1bmN0aW9ucyB3aXRob3V0IGEgaG9zdCBjb21wb25lbnQuXG4gICAqL1xuICBkaXJlY3RpdmVSZWdpc3RyeTogRGlyZWN0aXZlRGVmTGlzdHxudWxsO1xuXG4gIC8qKlxuICAgKiBGdWxsIHJlZ2lzdHJ5IG9mIHBpcGVzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgdmlldy5cbiAgICpcbiAgICogVGhlIHByb3BlcnR5IGlzIGVpdGhlciBhbiBhcnJheSBvZiBgUGlwZURlZnNgcyBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGFycmF5IG9mXG4gICAqIGBQaXBlRGVmc2BzLiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAgICpcbiAgICogSXQncyBuZWNlc3NhcnkgdG8ga2VlcCBhIGNvcHkgb2YgdGhlIGZ1bGwgZGVmIGxpc3Qgb24gdGhlIFRWaWV3IHNvIGl0J3MgcG9zc2libGVcbiAgICogdG8gcmVuZGVyIHRlbXBsYXRlIGZ1bmN0aW9ucyB3aXRob3V0IGEgaG9zdCBjb21wb25lbnQuXG4gICAqL1xuICBwaXBlUmVnaXN0cnk6IFBpcGVEZWZMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nT25Jbml0LCBuZ09uQ2hhbmdlcyBhbmQgbmdEb0NoZWNrIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW5cbiAgICogY3JlYXRpb24gbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIHByZU9yZGVySG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nT25DaGFuZ2VzIGFuZCBuZ0RvQ2hlY2sgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpbiB1cGRhdGUgbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIHByZU9yZGVyQ2hlY2tIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlckNvbnRlbnRJbml0IGFuZCBuZ0FmdGVyQ29udGVudENoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWRcbiAgICogZm9yIHRoaXMgdmlldyBpbiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgY29udGVudEhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyQ29udGVudENoZWNrZWQgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpbiB1cGRhdGVcbiAgICogbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnRlbnRDaGVja0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyVmlld0luaXQgYW5kIG5nQWZ0ZXJWaWV3Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3JcbiAgICogdGhpcyB2aWV3IGluIGNyZWF0aW9uIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICB2aWV3SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJWaWV3Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluXG4gICAqIHVwZGF0ZSBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgdmlld0NoZWNrSG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nT25EZXN0cm95IGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIHdoZW4gdGhpcyB2aWV3IGlzIGRlc3Ryb3llZC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIGRlc3Ryb3lIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogV2hlbiBhIHZpZXcgaXMgZGVzdHJveWVkLCBsaXN0ZW5lcnMgbmVlZCB0byBiZSByZWxlYXNlZCBhbmQgb3V0cHV0cyBuZWVkIHRvIGJlXG4gICAqIHVuc3Vic2NyaWJlZC4gVGhpcyBjbGVhbnVwIGFycmF5IHN0b3JlcyBib3RoIGxpc3RlbmVyIGRhdGEgKGluIGNodW5rcyBvZiA0KVxuICAgKiBhbmQgb3V0cHV0IGRhdGEgKGluIGNodW5rcyBvZiAyKSBmb3IgYSBwYXJ0aWN1bGFyIHZpZXcuIENvbWJpbmluZyB0aGUgYXJyYXlzXG4gICAqIHNhdmVzIG9uIG1lbW9yeSAoNzAgYnl0ZXMgcGVyIGFycmF5KSBhbmQgb24gYSBmZXcgYnl0ZXMgb2YgY29kZSBzaXplIChmb3IgdHdvXG4gICAqIHNlcGFyYXRlIGZvciBsb29wcykuXG4gICAqXG4gICAqIElmIGl0J3MgYSBuYXRpdmUgRE9NIGxpc3RlbmVyIG9yIG91dHB1dCBzdWJzY3JpcHRpb24gYmVpbmcgc3RvcmVkOlxuICAgKiAxc3QgaW5kZXggaXM6IGV2ZW50IG5hbWUgIGBuYW1lID0gdFZpZXcuY2xlYW51cFtpKzBdYFxuICAgKiAybmQgaW5kZXggaXM6IGluZGV4IG9mIG5hdGl2ZSBlbGVtZW50IG9yIGEgZnVuY3Rpb24gdGhhdCByZXRyaWV2ZXMgZ2xvYmFsIHRhcmdldCAod2luZG93LFxuICAgKiAgICAgICAgICAgICAgIGRvY3VtZW50IG9yIGJvZHkpIHJlZmVyZW5jZSBiYXNlZCBvbiB0aGUgbmF0aXZlIGVsZW1lbnQ6XG4gICAqICAgIGB0eXBlb2YgaWR4T3JUYXJnZXRHZXR0ZXIgPT09ICdmdW5jdGlvbidgOiBnbG9iYWwgdGFyZ2V0IGdldHRlciBmdW5jdGlvblxuICAgKiAgICBgdHlwZW9mIGlkeE9yVGFyZ2V0R2V0dGVyID09PSAnbnVtYmVyJ2A6IGluZGV4IG9mIG5hdGl2ZSBlbGVtZW50XG4gICAqXG4gICAqIDNyZCBpbmRleCBpczogaW5kZXggb2YgbGlzdGVuZXIgZnVuY3Rpb24gYGxpc3RlbmVyID0gbFZpZXdbQ0xFQU5VUF1bdFZpZXcuY2xlYW51cFtpKzJdXWBcbiAgICogNHRoIGluZGV4IGlzOiBgdXNlQ2FwdHVyZU9ySW5keCA9IHRWaWV3LmNsZWFudXBbaSszXWBcbiAgICogICAgYHR5cGVvZiB1c2VDYXB0dXJlT3JJbmR4ID09ICdib29sZWFuJyA6IHVzZUNhcHR1cmUgYm9vbGVhblxuICAgKiAgICBgdHlwZW9mIHVzZUNhcHR1cmVPckluZHggPT0gJ251bWJlcic6XG4gICAqICAgICAgICAgYHVzZUNhcHR1cmVPckluZHggPj0gMGAgYHJlbW92ZUxpc3RlbmVyID0gTFZpZXdbQ0xFQU5VUF1bdXNlQ2FwdHVyZU9ySW5keF1gXG4gICAqICAgICAgICAgYHVzZUNhcHR1cmVPckluZHggPCAgMGAgYHN1YnNjcmlwdGlvbiA9IExWaWV3W0NMRUFOVVBdWy11c2VDYXB0dXJlT3JJbmR4XWBcbiAgICpcbiAgICogSWYgaXQncyBhbiBvdXRwdXQgc3Vic2NyaXB0aW9uIG9yIHF1ZXJ5IGxpc3QgZGVzdHJveSBob29rOlxuICAgKiAxc3QgaW5kZXggaXM6IG91dHB1dCB1bnN1YnNjcmliZSBmdW5jdGlvbiAvIHF1ZXJ5IGxpc3QgZGVzdHJveSBmdW5jdGlvblxuICAgKiAybmQgaW5kZXggaXM6IGluZGV4IG9mIGZ1bmN0aW9uIGNvbnRleHQgaW4gTFZpZXcuY2xlYW51cEluc3RhbmNlc1tdXG4gICAqICAgICAgICAgICAgICAgYHRWaWV3LmNsZWFudXBbaSswXS5jYWxsKGxWaWV3W0NMRUFOVVBdW3RWaWV3LmNsZWFudXBbaSsxXV0pYFxuICAgKi9cbiAgY2xlYW51cDogYW55W118bnVsbDtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGVsZW1lbnQgaW5kaWNlcyBmb3IgY2hpbGQgY29tcG9uZW50cyB0aGF0IHdpbGwgbmVlZCB0byBiZVxuICAgKiByZWZyZXNoZWQgd2hlbiB0aGUgY3VycmVudCB2aWV3IGhhcyBmaW5pc2hlZCBpdHMgY2hlY2suIFRoZXNlIGluZGljZXMgaGF2ZVxuICAgKiBhbHJlYWR5IGJlZW4gYWRqdXN0ZWQgZm9yIHRoZSBIRUFERVJfT0ZGU0VULlxuICAgKlxuICAgKi9cbiAgY29tcG9uZW50czogbnVtYmVyW118bnVsbDtcblxuICAvKipcbiAgICogQSBjb2xsZWN0aW9uIG9mIHF1ZXJpZXMgdHJhY2tlZCBpbiBhIGdpdmVuIHZpZXcuXG4gICAqL1xuICBxdWVyaWVzOiBUUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBpbmRpY2VzIHBvaW50aW5nIHRvIGRpcmVjdGl2ZXMgd2l0aCBjb250ZW50IHF1ZXJpZXMgYWxvbmdzaWRlIHdpdGggdGhlXG4gICAqIGNvcnJlc3BvbmRpbmdcbiAgICogcXVlcnkgaW5kZXguIEVhY2ggZW50cnkgaW4gdGhpcyBhcnJheSBpcyBhIHR1cGxlIG9mOlxuICAgKiAtIGluZGV4IG9mIHRoZSBmaXJzdCBjb250ZW50IHF1ZXJ5IGluZGV4IGRlY2xhcmVkIGJ5IGEgZ2l2ZW4gZGlyZWN0aXZlO1xuICAgKiAtIGluZGV4IG9mIGEgZGlyZWN0aXZlLlxuICAgKlxuICAgKiBXZSBhcmUgc3RvcmluZyB0aG9zZSBpbmRleGVzIHNvIHdlIGNhbiByZWZyZXNoIGNvbnRlbnQgcXVlcmllcyBhcyBwYXJ0IG9mIGEgdmlldyByZWZyZXNoXG4gICAqIHByb2Nlc3MuXG4gICAqL1xuICBjb250ZW50UXVlcmllczogbnVtYmVyW118bnVsbDtcblxuICAvKipcbiAgICogU2V0IG9mIHNjaGVtYXMgdGhhdCBkZWNsYXJlIGVsZW1lbnRzIHRvIGJlIGFsbG93ZWQgaW5zaWRlIHRoZSB2aWV3LlxuICAgKi9cbiAgc2NoZW1hczogU2NoZW1hTWV0YWRhdGFbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBjb25zdGFudHMgZm9yIHRoZSB2aWV3LiBJbmNsdWRlcyBhdHRyaWJ1dGUgYXJyYXlzLCBsb2NhbCBkZWZpbml0aW9uIGFycmF5cyBldGMuXG4gICAqIFVzZWQgZm9yIGRpcmVjdGl2ZSBtYXRjaGluZywgYXR0cmlidXRlIGJpbmRpbmdzLCBsb2NhbCBkZWZpbml0aW9ucyBhbmQgbW9yZS5cbiAgICovXG4gIGNvbnN0czogVENvbnN0YW50c3xudWxsO1xufVxuXG5leHBvcnQgY29uc3QgZW51bSBSb290Q29udGV4dEZsYWdzIHtFbXB0eSA9IDBiMDAsIERldGVjdENoYW5nZXMgPSAwYjAxLCBGbHVzaFBsYXllcnMgPSAwYjEwfVxuXG5cbi8qKlxuICogUm9vdENvbnRleHQgY29udGFpbnMgaW5mb3JtYXRpb24gd2hpY2ggaXMgc2hhcmVkIGZvciBhbGwgY29tcG9uZW50cyB3aGljaFxuICogd2VyZSBib290c3RyYXBwZWQgd2l0aCB7QGxpbmsgcmVuZGVyQ29tcG9uZW50fS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSb290Q29udGV4dCB7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHVzZWQgZm9yIHNjaGVkdWxpbmcgY2hhbmdlIGRldGVjdGlvbiBpbiB0aGUgZnV0dXJlLiBVc3VhbGx5XG4gICAqIHRoaXMgaXMgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAuXG4gICAqL1xuICBzY2hlZHVsZXI6ICh3b3JrRm46ICgpID0+IHZvaWQpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEEgcHJvbWlzZSB3aGljaCBpcyByZXNvbHZlZCB3aGVuIGFsbCBjb21wb25lbnRzIGFyZSBjb25zaWRlcmVkIGNsZWFuIChub3QgZGlydHkpLlxuICAgKlxuICAgKiBUaGlzIHByb21pc2UgaXMgb3ZlcndyaXR0ZW4gZXZlcnkgdGltZSBhIGZpcnN0IGNhbGwgdG8ge0BsaW5rIG1hcmtEaXJ0eX0gaXMgaW52b2tlZC5cbiAgICovXG4gIGNsZWFuOiBQcm9taXNlPG51bGw+O1xuXG4gIC8qKlxuICAgKiBSb290Q29tcG9uZW50cyAtIFRoZSBjb21wb25lbnRzIHRoYXQgd2VyZSBpbnN0YW50aWF0ZWQgYnkgdGhlIGNhbGwgdG9cbiAgICoge0BsaW5rIHJlbmRlckNvbXBvbmVudH0uXG4gICAqL1xuICBjb21wb25lbnRzOiB7fVtdO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxheWVyIGZsdXNoaW5nIGhhbmRsZXIgdG8ga2ljayBvZmYgYWxsIGFuaW1hdGlvbnNcbiAgICovXG4gIHBsYXllckhhbmRsZXI6IFBsYXllckhhbmRsZXJ8bnVsbDtcblxuICAvKipcbiAgICogV2hhdCByZW5kZXItcmVsYXRlZCBvcGVyYXRpb25zIHRvIHJ1biBvbmNlIGEgc2NoZWR1bGVyIGhhcyBiZWVuIHNldFxuICAgKi9cbiAgZmxhZ3M6IFJvb3RDb250ZXh0RmxhZ3M7XG59XG5cbi8qKlxuICogQXJyYXkgb2YgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIGEgdmlldyBhbmQgdGhlaXIgZGlyZWN0aXZlIGluZGljZXMuXG4gKlxuICogRm9yIGVhY2ggbm9kZSBvZiB0aGUgdmlldywgdGhlIGZvbGxvd2luZyBkYXRhIGlzIHN0b3JlZDpcbiAqIDEpIE5vZGUgaW5kZXggKG9wdGlvbmFsKVxuICogMikgQSBzZXJpZXMgb2YgbnVtYmVyL2Z1bmN0aW9uIHBhaXJzIHdoZXJlOlxuICogIC0gZXZlbiBpbmRpY2VzIGFyZSBkaXJlY3RpdmUgaW5kaWNlc1xuICogIC0gb2RkIGluZGljZXMgYXJlIGhvb2sgZnVuY3Rpb25zXG4gKlxuICogU3BlY2lhbCBjYXNlczpcbiAqICAtIGEgbmVnYXRpdmUgZGlyZWN0aXZlIGluZGV4IGZsYWdzIGFuIGluaXQgaG9vayAobmdPbkluaXQsIG5nQWZ0ZXJDb250ZW50SW5pdCwgbmdBZnRlclZpZXdJbml0KVxuICovXG5leHBvcnQgdHlwZSBIb29rRGF0YSA9IChudW1iZXIgfCAoKCkgPT4gdm9pZCkpW107XG5cbi8qKlxuICogU3RhdGljIGRhdGEgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgaW5zdGFuY2Utc3BlY2lmaWMgZGF0YSBhcnJheSBvbiBhbiBMVmlldy5cbiAqXG4gKiBFYWNoIG5vZGUncyBzdGF0aWMgZGF0YSBpcyBzdG9yZWQgaW4gdERhdGEgYXQgdGhlIHNhbWUgaW5kZXggdGhhdCBpdCdzIHN0b3JlZFxuICogaW4gdGhlIGRhdGEgYXJyYXkuICBBbnkgbm9kZXMgdGhhdCBkbyBub3QgaGF2ZSBzdGF0aWMgZGF0YSBzdG9yZSBhIG51bGwgdmFsdWUgaW5cbiAqIHREYXRhIHRvIGF2b2lkIGEgc3BhcnNlIGFycmF5LlxuICpcbiAqIEVhY2ggcGlwZSdzIGRlZmluaXRpb24gaXMgc3RvcmVkIGhlcmUgYXQgdGhlIHNhbWUgaW5kZXggYXMgaXRzIHBpcGUgaW5zdGFuY2UgaW5cbiAqIHRoZSBkYXRhIGFycmF5LlxuICpcbiAqIEVhY2ggaG9zdCBwcm9wZXJ0eSdzIG5hbWUgaXMgc3RvcmVkIGhlcmUgYXQgdGhlIHNhbWUgaW5kZXggYXMgaXRzIHZhbHVlIGluIHRoZVxuICogZGF0YSBhcnJheS5cbiAqXG4gKiBFYWNoIHByb3BlcnR5IGJpbmRpbmcgbmFtZSBpcyBzdG9yZWQgaGVyZSBhdCB0aGUgc2FtZSBpbmRleCBhcyBpdHMgdmFsdWUgaW5cbiAqIHRoZSBkYXRhIGFycmF5LiBJZiB0aGUgYmluZGluZyBpcyBhbiBpbnRlcnBvbGF0aW9uLCB0aGUgc3RhdGljIHN0cmluZyB2YWx1ZXNcbiAqIGFyZSBzdG9yZWQgcGFyYWxsZWwgdG8gdGhlIGR5bmFtaWMgdmFsdWVzLiBFeGFtcGxlOlxuICpcbiAqIGlkPVwicHJlZml4IHt7IHYwIH19IGEge3sgdjEgfX0gYiB7eyB2MiB9fSBzdWZmaXhcIlxuICpcbiAqIExWaWV3ICAgICAgIHwgICBUVmlldy5kYXRhXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogIHYwIHZhbHVlICAgfCAgICdhJ1xuICogIHYxIHZhbHVlICAgfCAgICdiJ1xuICogIHYyIHZhbHVlICAgfCAgIGlkIO+/vSBwcmVmaXgg77+9IHN1ZmZpeFxuICpcbiAqIEluamVjdG9yIGJsb29tIGZpbHRlcnMgYXJlIGFsc28gc3RvcmVkIGhlcmUuXG4gKi9cbmV4cG9ydCB0eXBlIFREYXRhID1cbiAgICAoVE5vZGUgfCBQaXBlRGVmPGFueT58IERpcmVjdGl2ZURlZjxhbnk+fCBDb21wb25lbnREZWY8YW55PnwgbnVtYmVyIHwgVHlwZTxhbnk+fFxuICAgICBJbmplY3Rpb25Ub2tlbjxhbnk+fCBUSTE4biB8IEkxOG5VcGRhdGVPcENvZGVzIHwgbnVsbCB8IHN0cmluZylbXTtcblxuLy8gTm90ZTogVGhpcyBoYWNrIGlzIG5lY2Vzc2FyeSBzbyB3ZSBkb24ndCBlcnJvbmVvdXNseSBnZXQgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4vLyBmYWlsdXJlIGJhc2VkIG9uIHR5cGVzLlxuZXhwb3J0IGNvbnN0IHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkID0gMTtcbiJdfQ==