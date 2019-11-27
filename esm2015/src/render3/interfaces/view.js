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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy92aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsTUFBTSxPQUFPLElBQUksR0FBRyxDQUFDOztBQUNyQixNQUFNLE9BQU8sS0FBSyxHQUFHLENBQUM7O0FBQ3RCLE1BQU0sT0FBTyxLQUFLLEdBQUcsQ0FBQzs7QUFDdEIsTUFBTSxPQUFPLE1BQU0sR0FBRyxDQUFDOztBQUN2QixNQUFNLE9BQU8sSUFBSSxHQUFHLENBQUM7O0FBQ3JCLE1BQU0sT0FBTyxPQUFPLEdBQUcsQ0FBQzs7QUFDeEIsTUFBTSxPQUFPLE1BQU0sR0FBRyxDQUFDOztBQUN2QixNQUFNLE9BQU8sT0FBTyxHQUFHLENBQUM7O0FBQ3hCLE1BQU0sT0FBTyxPQUFPLEdBQUcsQ0FBQzs7QUFDeEIsTUFBTSxPQUFPLFFBQVEsR0FBRyxDQUFDOztBQUN6QixNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsRUFBRTs7QUFDbEMsTUFBTSxPQUFPLFFBQVEsR0FBRyxFQUFFOztBQUMxQixNQUFNLE9BQU8sU0FBUyxHQUFHLEVBQUU7O0FBQzNCLE1BQU0sT0FBTyxVQUFVLEdBQUcsRUFBRTs7QUFDNUIsTUFBTSxPQUFPLFVBQVUsR0FBRyxFQUFFOztBQUM1QixNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsRUFBRTs7QUFDbEMsTUFBTSxPQUFPLDBCQUEwQixHQUFHLEVBQUU7O0FBQzVDLE1BQU0sT0FBTyxzQkFBc0IsR0FBRyxFQUFFOztBQUN4QyxNQUFNLE9BQU8sbUJBQW1CLEdBQUcsRUFBRTs7Ozs7QUFFckMsTUFBTSxPQUFPLGFBQWEsR0FBRyxFQUFFOzs7O0FBTS9CLHFDQUVDOzs7SUFEQyxvQ0FBaUU7Ozs7Ozs7Ozs7Ozs7QUFjbkUsMkJBdU5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxNQUFrQixVQUFVO0lBQzFCLHNEQUFzRDtJQUN0RCx5QkFBeUIsR0FBZ0I7SUFDekMsa0JBQWtCLEdBQWdCO0lBRWxDOzs7Ozs7O09BT0c7SUFDSCxZQUFZLEdBQWdCO0lBRTVCOzs7Ozs7T0FNRztJQUNILGNBQWMsR0FBZ0I7SUFFOUIsd0ZBQXdGO0lBQ3hGLFdBQVcsSUFBZ0I7SUFFM0I7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxZQUFZLElBQWdCO0lBRTVCLGtFQUFrRTtJQUNsRSxLQUFLLElBQWlCO0lBRXRCLCtFQUErRTtJQUMvRSxRQUFRLEtBQWlCO0lBRXpCLDZDQUE2QztJQUM3QyxTQUFTLEtBQWlCO0lBRTFCLGdEQUFnRDtJQUNoRCxNQUFNLEtBQWlCO0lBRXZCOztPQUVHO0lBQ0gsK0JBQStCLE1BQWlCO0lBQ2hELHlCQUF5QixJQUFLO0lBQzlCLHlCQUF5QixNQUFpQjtFQUMzQzs7O0FBU0QsTUFBa0IsY0FBYztJQUM5QixrQkFBa0IsR0FBTztJQUN6Qiw0QkFBNEIsR0FBTztJQUNuQyx5QkFBeUIsR0FBTztJQUNoQyxrQkFBa0IsR0FBTztFQUMxQjs7O0FBR0QsTUFBa0IsaUJBQWlCO0lBQ2pDO2NBQ1U7SUFDVixrQ0FBa0MsT0FBc0I7SUFFeEQ7O09BRUc7SUFDSCxrQ0FBa0MsT0FBdUI7SUFDekQsNEJBQTRCLElBQUs7SUFDakMsMkJBQTJCLFlBQXFDO0VBQ2pFOzs7Ozs7OztBQU9ELHlDQUE0Rjs7QUFVNUYsTUFBa0IsU0FBUztJQUN6Qjs7OztPQUlHO0lBQ0gsSUFBSSxHQUFJO0lBRVI7OztPQUdHO0lBQ0gsU0FBUyxHQUFJO0lBRWI7OztPQUdHO0lBQ0gsUUFBUSxHQUFJO0VBQ2I7Ozs7Ozs7OztBQVFELDJCQTJQQzs7Ozs7O0lBdlBDLHFCQUFnQjs7Ozs7Ozs7O0lBU2hCLG1CQUFvQjs7Ozs7O0lBTXBCLDBCQUFpQjs7Ozs7O0lBTWpCLHlCQUFxQzs7Ozs7SUFLckMsMEJBQXdDOzs7Ozs7Ozs7Ozs7Ozs7OztJQWlCeEMscUJBQWtDOzs7OztJQUdsQyxnQ0FBeUI7Ozs7O0lBR3pCLGdDQUF5Qjs7Ozs7SUFHekIscUJBQVk7Ozs7Ozs7Ozs7SUFVWixrQ0FBMEI7Ozs7Ozs7Ozs7OztJQVkxQixrQ0FBMEI7Ozs7Ozs7O0lBUTFCLGtDQUEyQjs7Ozs7Ozs7SUFRM0IscUNBQThCOzs7OztJQUs5QiwyQkFBdUI7Ozs7Ozs7SUFPdkIsb0NBQThDOzs7Ozs7OztJQVE5QyxrQ0FBeUM7Ozs7Ozs7Ozs7O0lBV3pDLDZCQUErQjs7Ozs7Ozs7O0lBUy9CLDhCQUE2Qjs7Ozs7Ozs7SUFRN0IsbUNBQWtDOzs7Ozs7Ozs7SUFTbEMsNkJBQTRCOzs7Ozs7Ozs7SUFTNUIsa0NBQWlDOzs7Ozs7Ozs7SUFTakMsMEJBQXlCOzs7Ozs7Ozs7SUFTekIsK0JBQThCOzs7Ozs7OztJQVE5Qiw2QkFBNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0QjVCLHdCQUFvQjs7Ozs7Ozs7SUFRcEIsMkJBQTBCOzs7OztJQUsxQix3QkFBdUI7Ozs7Ozs7Ozs7OztJQVl2QiwrQkFBOEI7Ozs7O0lBSzlCLHdCQUErQjs7Ozs7O0lBTS9CLHVCQUF3Qjs7O0FBRzFCLE1BQWtCLGdCQUFnQjtJQUFFLEtBQUssR0FBTyxFQUFFLGFBQWEsR0FBTyxFQUFFLFlBQVksR0FBTztFQUFDOzs7Ozs7O0FBTzVGLGlDQTZCQzs7Ozs7OztJQXhCQyxnQ0FBd0M7Ozs7Ozs7SUFPeEMsNEJBQXFCOzs7Ozs7SUFNckIsaUNBQWlCOzs7OztJQUtqQixvQ0FBa0M7Ozs7O0lBS2xDLDRCQUF3Qjs7Ozs7QUFrRDFCLE1BQU0sT0FBTyw2QkFBNkIsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuLi8uLi9kaS9pbmplY3Rpb25fdG9rZW4nO1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge1NjaGVtYU1ldGFkYXRhfSBmcm9tICcuLi8uLi9tZXRhZGF0YSc7XG5pbXBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3Nhbml0aXplcic7XG5cbmltcG9ydCB7TENvbnRhaW5lcn0gZnJvbSAnLi9jb250YWluZXInO1xuaW1wb3J0IHtDb21wb25lbnREZWYsIENvbXBvbmVudFRlbXBsYXRlLCBEaXJlY3RpdmVEZWYsIERpcmVjdGl2ZURlZkxpc3QsIEhvc3RCaW5kaW5nc0Z1bmN0aW9uLCBQaXBlRGVmLCBQaXBlRGVmTGlzdCwgVmlld1F1ZXJpZXNGdW5jdGlvbn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7STE4blVwZGF0ZU9wQ29kZXMsIFRJMThufSBmcm9tICcuL2kxOG4nO1xuaW1wb3J0IHtUQXR0cmlidXRlcywgVENvbnN0YW50cywgVEVsZW1lbnROb2RlLCBUTm9kZSwgVFZpZXdOb2RlfSBmcm9tICcuL25vZGUnO1xuaW1wb3J0IHtQbGF5ZXJIYW5kbGVyfSBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQge0xRdWVyaWVzLCBUUXVlcmllc30gZnJvbSAnLi9xdWVyeSc7XG5pbXBvcnQge1JFbGVtZW50LCBSZW5kZXJlcjMsIFJlbmRlcmVyRmFjdG9yeTN9IGZyb20gJy4vcmVuZGVyZXInO1xuXG5cblxuLy8gQmVsb3cgYXJlIGNvbnN0YW50cyBmb3IgTFZpZXcgaW5kaWNlcyB0byBoZWxwIHVzIGxvb2sgdXAgTFZpZXcgbWVtYmVyc1xuLy8gd2l0aG91dCBoYXZpbmcgdG8gcmVtZW1iZXIgdGhlIHNwZWNpZmljIGluZGljZXMuXG4vLyBVZ2xpZnkgd2lsbCBpbmxpbmUgdGhlc2Ugd2hlbiBtaW5pZnlpbmcgc28gdGhlcmUgc2hvdWxkbid0IGJlIGEgY29zdC5cbmV4cG9ydCBjb25zdCBIT1NUID0gMDtcbmV4cG9ydCBjb25zdCBUVklFVyA9IDE7XG5leHBvcnQgY29uc3QgRkxBR1MgPSAyO1xuZXhwb3J0IGNvbnN0IFBBUkVOVCA9IDM7XG5leHBvcnQgY29uc3QgTkVYVCA9IDQ7XG5leHBvcnQgY29uc3QgUVVFUklFUyA9IDU7XG5leHBvcnQgY29uc3QgVF9IT1NUID0gNjtcbmV4cG9ydCBjb25zdCBDTEVBTlVQID0gNztcbmV4cG9ydCBjb25zdCBDT05URVhUID0gODtcbmV4cG9ydCBjb25zdCBJTkpFQ1RPUiA9IDk7XG5leHBvcnQgY29uc3QgUkVOREVSRVJfRkFDVE9SWSA9IDEwO1xuZXhwb3J0IGNvbnN0IFJFTkRFUkVSID0gMTE7XG5leHBvcnQgY29uc3QgU0FOSVRJWkVSID0gMTI7XG5leHBvcnQgY29uc3QgQ0hJTERfSEVBRCA9IDEzO1xuZXhwb3J0IGNvbnN0IENISUxEX1RBSUwgPSAxNDtcbmV4cG9ydCBjb25zdCBERUNMQVJBVElPTl9WSUVXID0gMTU7XG5leHBvcnQgY29uc3QgREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVcgPSAxNjtcbmV4cG9ydCBjb25zdCBERUNMQVJBVElPTl9MQ09OVEFJTkVSID0gMTc7XG5leHBvcnQgY29uc3QgUFJFT1JERVJfSE9PS19GTEFHUyA9IDE4O1xuLyoqIFNpemUgb2YgTFZpZXcncyBoZWFkZXIuIE5lY2Vzc2FyeSB0byBhZGp1c3QgZm9yIGl0IHdoZW4gc2V0dGluZyBzbG90cy4gICovXG5leHBvcnQgY29uc3QgSEVBREVSX09GRlNFVCA9IDE5O1xuXG5cbi8vIFRoaXMgaW50ZXJmYWNlIHJlcGxhY2VzIHRoZSByZWFsIExWaWV3IGludGVyZmFjZSBpZiBpdCBpcyBhbiBhcmcgb3IgYVxuLy8gcmV0dXJuIHZhbHVlIG9mIGEgcHVibGljIGluc3RydWN0aW9uLiBUaGlzIGVuc3VyZXMgd2UgZG9uJ3QgbmVlZCB0byBleHBvc2Vcbi8vIHRoZSBhY3R1YWwgaW50ZXJmYWNlLCB3aGljaCBzaG91bGQgYmUga2VwdCBwcml2YXRlLlxuZXhwb3J0IGludGVyZmFjZSBPcGFxdWVWaWV3U3RhdGUge1xuICAnX19icmFuZF9fJzogJ0JyYW5kIGZvciBPcGFxdWVWaWV3U3RhdGUgdGhhdCBub3RoaW5nIHdpbGwgbWF0Y2gnO1xufVxuXG5cbi8qKlxuICogYExWaWV3YCBzdG9yZXMgYWxsIG9mIHRoZSBpbmZvcm1hdGlvbiBuZWVkZWQgdG8gcHJvY2VzcyB0aGUgaW5zdHJ1Y3Rpb25zIGFzXG4gKiB0aGV5IGFyZSBpbnZva2VkIGZyb20gdGhlIHRlbXBsYXRlLiBFYWNoIGVtYmVkZGVkIHZpZXcgYW5kIGNvbXBvbmVudCB2aWV3IGhhcyBpdHNcbiAqIG93biBgTFZpZXdgLiBXaGVuIHByb2Nlc3NpbmcgYSBwYXJ0aWN1bGFyIHZpZXcsIHdlIHNldCB0aGUgYHZpZXdEYXRhYCB0byB0aGF0XG4gKiBgTFZpZXdgLiBXaGVuIHRoYXQgdmlldyBpcyBkb25lIHByb2Nlc3NpbmcsIHRoZSBgdmlld0RhdGFgIGlzIHNldCBiYWNrIHRvXG4gKiB3aGF0ZXZlciB0aGUgb3JpZ2luYWwgYHZpZXdEYXRhYCB3YXMgYmVmb3JlICh0aGUgcGFyZW50IGBMVmlld2ApLlxuICpcbiAqIEtlZXBpbmcgc2VwYXJhdGUgc3RhdGUgZm9yIGVhY2ggdmlldyBmYWNpbGl0aWVzIHZpZXcgaW5zZXJ0aW9uIC8gZGVsZXRpb24sIHNvIHdlXG4gKiBkb24ndCBoYXZlIHRvIGVkaXQgdGhlIGRhdGEgYXJyYXkgYmFzZWQgb24gd2hpY2ggdmlld3MgYXJlIHByZXNlbnQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTFZpZXcgZXh0ZW5kcyBBcnJheTxhbnk+IHtcbiAgLyoqXG4gICAqIFRoZSBob3N0IG5vZGUgZm9yIHRoaXMgTFZpZXcgaW5zdGFuY2UsIGlmIHRoaXMgaXMgYSBjb21wb25lbnQgdmlldy5cbiAgICogSWYgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3LCBIT1NUIHdpbGwgYmUgbnVsbC5cbiAgICovXG4gIFtIT1NUXTogUkVsZW1lbnR8bnVsbDtcblxuICAvKipcbiAgICogVGhlIHN0YXRpYyBkYXRhIGZvciB0aGlzIHZpZXcuIFdlIG5lZWQgYSByZWZlcmVuY2UgdG8gdGhpcyBzbyB3ZSBjYW4gZWFzaWx5IHdhbGsgdXAgdGhlXG4gICAqIG5vZGUgdHJlZSBpbiBESSBhbmQgZ2V0IHRoZSBUVmlldy5kYXRhIGFycmF5IGFzc29jaWF0ZWQgd2l0aCBhIG5vZGUgKHdoZXJlIHRoZVxuICAgKiBkaXJlY3RpdmUgZGVmcyBhcmUgc3RvcmVkKS5cbiAgICovXG4gIHJlYWRvbmx5W1RWSUVXXTogVFZpZXc7XG5cbiAgLyoqIEZsYWdzIGZvciB0aGlzIHZpZXcuIFNlZSBMVmlld0ZsYWdzIGZvciBtb3JlIGluZm8uICovXG4gIFtGTEFHU106IExWaWV3RmxhZ3M7XG5cbiAgLyoqXG4gICAqIFRoaXMgbWF5IHN0b3JlIGFuIHtAbGluayBMVmlld30gb3Ige0BsaW5rIExDb250YWluZXJ9LlxuICAgKlxuICAgKiBgTFZpZXdgIC0gVGhlIHBhcmVudCB2aWV3LiBUaGlzIGlzIG5lZWRlZCB3aGVuIHdlIGV4aXQgdGhlIHZpZXcgYW5kIG11c3QgcmVzdG9yZSB0aGUgcHJldmlvdXNcbiAgICogTFZpZXcuIFdpdGhvdXQgdGhpcywgdGhlIHJlbmRlciBtZXRob2Qgd291bGQgaGF2ZSB0byBrZWVwIGEgc3RhY2sgb2ZcbiAgICogdmlld3MgYXMgaXQgaXMgcmVjdXJzaXZlbHkgcmVuZGVyaW5nIHRlbXBsYXRlcy5cbiAgICpcbiAgICogYExDb250YWluZXJgIC0gVGhlIGN1cnJlbnQgdmlldyBpcyBwYXJ0IG9mIGEgY29udGFpbmVyLCBhbmQgaXMgYW4gZW1iZWRkZWQgdmlldy5cbiAgICovXG4gIFtQQVJFTlRdOiBMVmlld3xMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqXG4gICAqXG4gICAqIFRoZSBuZXh0IHNpYmxpbmcgTFZpZXcgb3IgTENvbnRhaW5lci5cbiAgICpcbiAgICogQWxsb3dzIHVzIHRvIHByb3BhZ2F0ZSBiZXR3ZWVuIHNpYmxpbmcgdmlldyBzdGF0ZXMgdGhhdCBhcmVuJ3QgaW4gdGhlIHNhbWVcbiAgICogY29udGFpbmVyLiBFbWJlZGRlZCB2aWV3cyBhbHJlYWR5IGhhdmUgYSBub2RlLm5leHQsIGJ1dCBpdCBpcyBvbmx5IHNldCBmb3JcbiAgICogdmlld3MgaW4gdGhlIHNhbWUgY29udGFpbmVyLiBXZSBuZWVkIGEgd2F5IHRvIGxpbmsgY29tcG9uZW50IHZpZXdzIGFuZCB2aWV3c1xuICAgKiBhY3Jvc3MgY29udGFpbmVycyBhcyB3ZWxsLlxuICAgKi9cbiAgW05FWFRdOiBMVmlld3xMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqIFF1ZXJpZXMgYWN0aXZlIGZvciB0aGlzIHZpZXcgLSBub2RlcyBmcm9tIGEgdmlldyBhcmUgcmVwb3J0ZWQgdG8gdGhvc2UgcXVlcmllcy4gKi9cbiAgW1FVRVJJRVNdOiBMUXVlcmllc3xudWxsO1xuXG4gIC8qKlxuICAgKiBQb2ludGVyIHRvIHRoZSBgVFZpZXdOb2RlYCBvciBgVEVsZW1lbnROb2RlYCB3aGljaCByZXByZXNlbnRzIHRoZSByb290IG9mIHRoZSB2aWV3LlxuICAgKlxuICAgKiBJZiBgVFZpZXdOb2RlYCwgdGhpcyBpcyBhbiBlbWJlZGRlZCB2aWV3IG9mIGEgY29udGFpbmVyLiBXZSBuZWVkIHRoaXMgdG8gYmUgYWJsZSB0b1xuICAgKiBlZmZpY2llbnRseSBmaW5kIHRoZSBgTFZpZXdOb2RlYCB3aGVuIGluc2VydGluZyB0aGUgdmlldyBpbnRvIGFuIGFuY2hvci5cbiAgICpcbiAgICogSWYgYFRFbGVtZW50Tm9kZWAsIHRoaXMgaXMgdGhlIExWaWV3IG9mIGEgY29tcG9uZW50LlxuICAgKlxuICAgKiBJZiBudWxsLCB0aGlzIGlzIHRoZSByb290IHZpZXcgb2YgYW4gYXBwbGljYXRpb24gKHJvb3QgY29tcG9uZW50IGlzIGluIHRoaXMgdmlldykuXG4gICAqL1xuICBbVF9IT1NUXTogVFZpZXdOb2RlfFRFbGVtZW50Tm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyBpcyBkZXN0cm95ZWQsIGxpc3RlbmVycyBuZWVkIHRvIGJlIHJlbGVhc2VkIGFuZCBvdXRwdXRzIG5lZWQgdG8gYmVcbiAgICogdW5zdWJzY3JpYmVkLiBUaGlzIGNvbnRleHQgYXJyYXkgc3RvcmVzIGJvdGggbGlzdGVuZXIgZnVuY3Rpb25zIHdyYXBwZWQgd2l0aFxuICAgKiB0aGVpciBjb250ZXh0IGFuZCBvdXRwdXQgc3Vic2NyaXB0aW9uIGluc3RhbmNlcyBmb3IgYSBwYXJ0aWN1bGFyIHZpZXcuXG4gICAqXG4gICAqIFRoZXNlIGNoYW5nZSBwZXIgTFZpZXcgaW5zdGFuY2UsIHNvIHRoZXkgY2Fubm90IGJlIHN0b3JlZCBvbiBUVmlldy4gSW5zdGVhZCxcbiAgICogVFZpZXcuY2xlYW51cCBzYXZlcyBhbiBpbmRleCB0byB0aGUgbmVjZXNzYXJ5IGNvbnRleHQgaW4gdGhpcyBhcnJheS5cbiAgICovXG4gIC8vIFRPRE86IGZsYXR0ZW4gaW50byBMVmlld1tdXG4gIFtDTEVBTlVQXTogYW55W118bnVsbDtcblxuICAvKipcbiAgICogLSBGb3IgZHluYW1pYyB2aWV3cywgdGhpcyBpcyB0aGUgY29udGV4dCB3aXRoIHdoaWNoIHRvIHJlbmRlciB0aGUgdGVtcGxhdGUgKGUuZy5cbiAgICogICBgTmdGb3JDb250ZXh0YCksIG9yIGB7fWAgaWYgbm90IGRlZmluZWQgZXhwbGljaXRseS5cbiAgICogLSBGb3Igcm9vdCB2aWV3IG9mIHRoZSByb290IGNvbXBvbmVudCB0aGUgY29udGV4dCBjb250YWlucyBjaGFuZ2UgZGV0ZWN0aW9uIGRhdGEuXG4gICAqIC0gRm9yIG5vbi1yb290IGNvbXBvbmVudHMsIHRoZSBjb250ZXh0IGlzIHRoZSBjb21wb25lbnQgaW5zdGFuY2UsXG4gICAqIC0gRm9yIGlubGluZSB2aWV3cywgdGhlIGNvbnRleHQgaXMgbnVsbC5cbiAgICovXG4gIFtDT05URVhUXToge318Um9vdENvbnRleHR8bnVsbDtcblxuICAvKiogQW4gb3B0aW9uYWwgTW9kdWxlIEluamVjdG9yIHRvIGJlIHVzZWQgYXMgZmFsbCBiYWNrIGFmdGVyIEVsZW1lbnQgSW5qZWN0b3JzIGFyZSBjb25zdWx0ZWQuICovXG4gIHJlYWRvbmx5W0lOSkVDVE9SXTogSW5qZWN0b3J8bnVsbDtcblxuICAvKiogUmVuZGVyZXIgdG8gYmUgdXNlZCBmb3IgdGhpcyB2aWV3LiAqL1xuICBbUkVOREVSRVJfRkFDVE9SWV06IFJlbmRlcmVyRmFjdG9yeTM7XG5cbiAgLyoqIFJlbmRlcmVyIHRvIGJlIHVzZWQgZm9yIHRoaXMgdmlldy4gKi9cbiAgW1JFTkRFUkVSXTogUmVuZGVyZXIzO1xuXG4gIC8qKiBBbiBvcHRpb25hbCBjdXN0b20gc2FuaXRpemVyLiAqL1xuICBbU0FOSVRJWkVSXTogU2FuaXRpemVyfG51bGw7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgZmlyc3QgTFZpZXcgb3IgTENvbnRhaW5lciBiZW5lYXRoIHRoaXMgTFZpZXcgaW5cbiAgICogdGhlIGhpZXJhcmNoeS5cbiAgICpcbiAgICogTmVjZXNzYXJ5IHRvIHN0b3JlIHRoaXMgc28gdmlld3MgY2FuIHRyYXZlcnNlIHRocm91Z2ggdGhlaXIgbmVzdGVkIHZpZXdzXG4gICAqIHRvIHJlbW92ZSBsaXN0ZW5lcnMgYW5kIGNhbGwgb25EZXN0cm95IGNhbGxiYWNrcy5cbiAgICovXG4gIFtDSElMRF9IRUFEXTogTFZpZXd8TENvbnRhaW5lcnxudWxsO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBMVmlldyBvciBMQ29udGFpbmVyIGJlbmVhdGggdGhpcyBMVmlldyBpbiB0aGUgaGllcmFyY2h5LlxuICAgKlxuICAgKiBUaGUgdGFpbCBhbGxvd3MgdXMgdG8gcXVpY2tseSBhZGQgYSBuZXcgc3RhdGUgdG8gdGhlIGVuZCBvZiB0aGUgdmlldyBsaXN0XG4gICAqIHdpdGhvdXQgaGF2aW5nIHRvIHByb3BhZ2F0ZSBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBjaGlsZC5cbiAgICovXG4gIFtDSElMRF9UQUlMXTogTFZpZXd8TENvbnRhaW5lcnxudWxsO1xuXG4gIC8qKlxuICAgKiBWaWV3IHdoZXJlIHRoaXMgdmlldydzIHRlbXBsYXRlIHdhcyBkZWNsYXJlZC5cbiAgICpcbiAgICogT25seSBhcHBsaWNhYmxlIGZvciBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXdzLiBXaWxsIGJlIG51bGwgZm9yIGlubGluZS9jb21wb25lbnQgdmlld3MuXG4gICAqXG4gICAqIFRoZSB0ZW1wbGF0ZSBmb3IgYSBkeW5hbWljYWxseSBjcmVhdGVkIHZpZXcgbWF5IGJlIGRlY2xhcmVkIGluIGEgZGlmZmVyZW50IHZpZXcgdGhhblxuICAgKiBpdCBpcyBpbnNlcnRlZC4gV2UgYWxyZWFkeSB0cmFjayB0aGUgXCJpbnNlcnRpb24gdmlld1wiICh2aWV3IHdoZXJlIHRoZSB0ZW1wbGF0ZSB3YXNcbiAgICogaW5zZXJ0ZWQpIGluIExWaWV3W1BBUkVOVF0sIGJ1dCB3ZSBhbHNvIG5lZWQgYWNjZXNzIHRvIHRoZSBcImRlY2xhcmF0aW9uIHZpZXdcIlxuICAgKiAodmlldyB3aGVyZSB0aGUgdGVtcGxhdGUgd2FzIGRlY2xhcmVkKS4gT3RoZXJ3aXNlLCB3ZSB3b3VsZG4ndCBiZSBhYmxlIHRvIGNhbGwgdGhlXG4gICAqIHZpZXcncyB0ZW1wbGF0ZSBmdW5jdGlvbiB3aXRoIHRoZSBwcm9wZXIgY29udGV4dHMuIENvbnRleHQgc2hvdWxkIGJlIGluaGVyaXRlZCBmcm9tXG4gICAqIHRoZSBkZWNsYXJhdGlvbiB2aWV3IHRyZWUsIG5vdCB0aGUgaW5zZXJ0aW9uIHZpZXcgdHJlZS5cbiAgICpcbiAgICogRXhhbXBsZSAoQXBwQ29tcG9uZW50IHRlbXBsYXRlKTpcbiAgICpcbiAgICogPG5nLXRlbXBsYXRlICNmb28+PC9uZy10ZW1wbGF0ZT4gICAgICAgPC0tIGRlY2xhcmVkIGhlcmUgLS0+XG4gICAqIDxzb21lLWNvbXAgW3RwbF09XCJmb29cIj48L3NvbWUtY29tcD4gICAgPC0tIGluc2VydGVkIGluc2lkZSB0aGlzIGNvbXBvbmVudCAtLT5cbiAgICpcbiAgICogVGhlIDxuZy10ZW1wbGF0ZT4gYWJvdmUgaXMgZGVjbGFyZWQgaW4gdGhlIEFwcENvbXBvbmVudCB0ZW1wbGF0ZSwgYnV0IGl0IHdpbGwgYmUgcGFzc2VkIGludG9cbiAgICogU29tZUNvbXAgYW5kIGluc2VydGVkIHRoZXJlLiBJbiB0aGlzIGNhc2UsIHRoZSBkZWNsYXJhdGlvbiB2aWV3IHdvdWxkIGJlIHRoZSBBcHBDb21wb25lbnQsXG4gICAqIGJ1dCB0aGUgaW5zZXJ0aW9uIHZpZXcgd291bGQgYmUgU29tZUNvbXAuIFdoZW4gd2UgYXJlIHJlbW92aW5nIHZpZXdzLCB3ZSB3b3VsZCB3YW50IHRvXG4gICAqIHRyYXZlcnNlIHRocm91Z2ggdGhlIGluc2VydGlvbiB2aWV3IHRvIGNsZWFuIHVwIGxpc3RlbmVycy4gV2hlbiB3ZSBhcmUgY2FsbGluZyB0aGVcbiAgICogdGVtcGxhdGUgZnVuY3Rpb24gZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIHdlIG5lZWQgdGhlIGRlY2xhcmF0aW9uIHZpZXcgdG8gZ2V0IGluaGVyaXRlZFxuICAgKiBjb250ZXh0LlxuICAgKi9cbiAgW0RFQ0xBUkFUSU9OX1ZJRVddOiBMVmlld3xudWxsO1xuXG5cbiAgLyoqXG4gICAqIFBvaW50cyB0byB0aGUgZGVjbGFyYXRpb24gY29tcG9uZW50IHZpZXcsIHVzZWQgdG8gdHJhY2sgdHJhbnNwbGFudGVkIGBMVmlld2BzLlxuICAgKlxuICAgKiBTZWU6IGBERUNMQVJBVElPTl9WSUVXYCB3aGljaCBwb2ludHMgdG8gdGhlIGFjdHVhbCBgTFZpZXdgIHdoZXJlIGl0IHdhcyBkZWNsYXJlZCwgd2hlcmVhc1xuICAgKiBgREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVdgIHBvaW50cyB0byB0aGUgY29tcG9uZW50IHdoaWNoIG1heSBub3QgYmUgc2FtZSBhc1xuICAgKiBgREVDTEFSQVRJT05fVklFV2AuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiA8I1ZJRVcgI215Q29tcD5cbiAgICogIDxkaXYgKm5nSWY9XCJ0cnVlXCI+XG4gICAqICAgPG5nLXRlbXBsYXRlICNteVRtcGw+Li4uPC9uZy10ZW1wbGF0ZT5cbiAgICogIDwvZGl2PlxuICAgKiA8LyNWSUVXPlxuICAgKiBgYGBcbiAgICogSW4gdGhlIGFib3ZlIGNhc2UgYERFQ0xBUkFUSU9OX1ZJRVdgIGZvciBgbXlUbXBsYCBwb2ludHMgdG8gdGhlIGBMVmlld2Agb2YgYG5nSWZgIHdoZXJlYXNcbiAgICogYERFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXYCBwb2ludHMgdG8gYExWaWV3YCBvZiB0aGUgYG15Q29tcGAgd2hpY2ggb3ducyB0aGUgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRoZSByZWFzb24gZm9yIHRoaXMgaXMgdGhhdCBhbGwgZW1iZWRkZWQgdmlld3MgYXJlIGFsd2F5cyBjaGVjay1hbHdheXMgd2hlcmVhcyB0aGUgY29tcG9uZW50XG4gICAqIHZpZXcgY2FuIGJlIGNoZWNrLWFsd2F5cyBvciBvbi1wdXNoLiBXaGVuIHdlIGhhdmUgYSB0cmFuc3BsYW50ZWQgdmlldyBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICogZGV0ZXJtaW5lIGlmIHdlIGhhdmUgdHJhbnNwbGFudGVkIGEgdmlldyBmcm9tIGNoZWNrLWFsd2F5cyBkZWNsYXJhdGlvbiB0byBvbi1wdXNoIGluc2VydGlvblxuICAgKiBwb2ludC4gSW4gc3VjaCBhIGNhc2UgdGhlIHRyYW5zcGxhbnRlZCB2aWV3IG5lZWRzIHRvIGJlIGFkZGVkIHRvIHRoZSBgTENvbnRhaW5lcmAgaW4gdGhlXG4gICAqIGRlY2xhcmVkIGBMVmlld2AgYW5kIENEIGR1cmluZyB0aGUgZGVjbGFyZWQgdmlldyBDRCAoaW4gYWRkaXRpb24gdG8gdGhlIENEIGF0IHRoZSBpbnNlcnRpb25cbiAgICogcG9pbnQuKSAoQW55IHRyYW5zcGxhbnRlZCB2aWV3cyB3aGljaCBhcmUgaW50cmEgQ29tcG9uZW50IGFyZSBvZiBubyBpbnRlcmVzdCBiZWNhdXNlIHRoZSBDRFxuICAgKiBzdHJhdGVneSBvZiBkZWNsYXJhdGlvbiBhbmQgaW5zZXJ0aW9uIHdpbGwgYWx3YXlzIGJlIHRoZSBzYW1lLCBiZWNhdXNlIGl0IGlzIHRoZSBzYW1lXG4gICAqIGNvbXBvbmVudC4pXG4gICAqXG4gICAqIFF1ZXJpZXMgYWxyZWFkeSB0cmFjayBtb3ZlZCB2aWV3cyBpbiBgTFZpZXdbREVDTEFSQVRJT05fTENPTlRBSU5FUl1gIGFuZFxuICAgKiBgTENvbnRhaW5lcltNT1ZFRF9WSUVXU11gLiBIb3dldmVyIHRoZSBxdWVyaWVzIGFsc28gdHJhY2sgYExWaWV3YHMgd2hpY2ggbW92ZWQgd2l0aGluIHRoZSBzYW1lXG4gICAqIGNvbXBvbmVudCBgTFZpZXdgLiBUcmFuc3BsYW50ZWQgdmlld3MgYXJlIGEgc3Vic2V0IG9mIG1vdmVkIHZpZXdzLCBhbmQgd2UgdXNlXG4gICAqIGBERUNMQVJBVElPTl9DT01QT05FTlRfVklFV2AgdG8gZGlmZmVyZW50aWF0ZSB0aGVtLiBBcyBpbiB0aGlzIGV4YW1wbGUuXG4gICAqXG4gICAqIEV4YW1wbGUgc2hvd2luZyBpbnRyYSBjb21wb25lbnQgYExWaWV3YCBtb3ZlbWVudC5cbiAgICogYGBgXG4gICAqIDwjVklFVyAjbXlDb21wPlxuICAgKiAgIDxkaXYgKm5nSWY9XCJjb25kaXRpb247IHRoZW4gdGhlbkJsb2NrIGVsc2UgZWxzZUJsb2NrXCI+PC9kaXY+XG4gICAqICAgPG5nLXRlbXBsYXRlICN0aGVuQmxvY2s+Q29udGVudCB0byByZW5kZXIgd2hlbiBjb25kaXRpb24gaXMgdHJ1ZS48L25nLXRlbXBsYXRlPlxuICAgKiAgIDxuZy10ZW1wbGF0ZSAjZWxzZUJsb2NrPkNvbnRlbnQgdG8gcmVuZGVyIHdoZW4gY29uZGl0aW9uIGlzIGZhbHNlLjwvbmctdGVtcGxhdGU+XG4gICAqIDwvI1ZJRVc+XG4gICAqIGBgYFxuICAgKiBUaGUgYHRoZW5CbG9ja2AgYW5kIGBlbHNlQmxvY2tgIGlzIG1vdmVkIGJ1dCBub3QgdHJhbnNwbGFudGVkLlxuICAgKlxuICAgKiBFeGFtcGxlIHNob3dpbmcgaW50ZXIgY29tcG9uZW50IGBMVmlld2AgbW92ZW1lbnQgKHRyYW5zcGxhbnRlZCB2aWV3KS5cbiAgICogYGBgXG4gICAqIDwjVklFVyAjbXlDb21wPlxuICAgKiAgIDxuZy10ZW1wbGF0ZSAjbXlUbXBsPi4uLjwvbmctdGVtcGxhdGU+XG4gICAqICAgPGluc2VydGlvbi1jb21wb25lbnQgW3RlbXBsYXRlXT1cIm15VG1wbFwiPjwvaW5zZXJ0aW9uLWNvbXBvbmVudD5cbiAgICogPC8jVklFVz5cbiAgICogYGBgXG4gICAqIEluIHRoZSBhYm92ZSBleGFtcGxlIGBteVRtcGxgIGlzIHBhc3NlZCBpbnRvIGEgZGlmZmVyZW50IGNvbXBvbmVudC4gSWYgYGluc2VydGlvbi1jb21wb25lbnRgXG4gICAqIGluc3RhbnRpYXRlcyBgbXlUbXBsYCBhbmQgYGluc2VydGlvbi1jb21wb25lbnRgIGlzIG9uLXB1c2ggdGhlbiB0aGUgYExDb250YWluZXJgIG5lZWRzIHRvIGJlXG4gICAqIG1hcmtlZCBhcyBjb250YWluaW5nIHRyYW5zcGxhbnRlZCB2aWV3cyBhbmQgdGhvc2Ugdmlld3MgbmVlZCB0byBiZSBDRCBhcyBwYXJ0IG9mIHRoZVxuICAgKiBkZWNsYXJhdGlvbiBDRC5cbiAgICpcbiAgICpcbiAgICogV2hlbiBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMsIGl0IGl0ZXJhdGVzIG92ZXIgYFtNT1ZFRF9WSUVXU11gIGFuZCBDRHMgYW55IGNoaWxkIGBMVmlld2BzIHdoZXJlXG4gICAqIHRoZSBgREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVdgIG9mIHRoZSBjdXJyZW50IGNvbXBvbmVudCBhbmQgdGhlIGNoaWxkIGBMVmlld2AgZG9lcyBub3QgbWF0Y2hcbiAgICogKGl0IGhhcyBiZWVuIHRyYW5zcGxhbnRlZCBhY3Jvc3MgY29tcG9uZW50cy4pXG4gICAqXG4gICAqIE5vdGU6IGBbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddYCBwb2ludHMgdG8gaXRzZWxmIGlmIHRoZSBMVmlldyBpcyBhIGNvbXBvbmVudCB2aWV3ICh0aGVcbiAgICogICAgICAgc2ltcGxlc3QgLyBtb3N0IGNvbW1vbiBjYXNlKS5cbiAgICpcbiAgICogc2VlIGFsc286XG4gICAqICAgLSBodHRwczovL2hhY2ttZC5pby9AbWhldmVyeS9ySlVKc3Z2OUggd3JpdGUgdXAgb2YgdGhlIHByb2JsZW1cbiAgICogICAtIGBMQ29udGFpbmVyW0FDVElWRV9JTkRFWF1gIGZvciBmbGFnIHdoaWNoIG1hcmtzIHdoaWNoIGBMQ29udGFpbmVyYCBoYXMgdHJhbnNwbGFudGVkIHZpZXdzLlxuICAgKiAgIC0gYExDb250YWluZXJbVFJBTlNQTEFOVF9IRUFEXWAgYW5kIGBMQ29udGFpbmVyW1RSQU5TUExBTlRfVEFJTF1gIHN0b3JhZ2UgZm9yIHRyYW5zcGxhbnRlZFxuICAgKiAgIC0gYExWaWV3W0RFQ0xBUkFUSU9OX0xDT05UQUlORVJdYCBzaW1pbGFyIHByb2JsZW0gZm9yIHF1ZXJpZXNcbiAgICogICAtIGBMQ29udGFpbmVyW01PVkVEX1ZJRVdTXWAgc2ltaWxhciBwcm9ibGVtIGZvciBxdWVyaWVzXG4gICAqL1xuICBbREVDTEFSQVRJT05fQ09NUE9ORU5UX1ZJRVddOiBMVmlldztcblxuICAvKipcbiAgICogQSBkZWNsYXJhdGlvbiBwb2ludCBvZiBlbWJlZGRlZCB2aWV3cyAob25lcyBpbnN0YW50aWF0ZWQgYmFzZWQgb24gdGhlIGNvbnRlbnQgb2YgYVxuICAgKiA8bmctdGVtcGxhdGU+KSwgbnVsbCBmb3Igb3RoZXIgdHlwZXMgb2Ygdmlld3MuXG4gICAqXG4gICAqIFdlIG5lZWQgdG8gdHJhY2sgYWxsIGVtYmVkZGVkIHZpZXdzIGNyZWF0ZWQgZnJvbSBhIGdpdmVuIGRlY2xhcmF0aW9uIHBvaW50IHNvIHdlIGNhbiBwcmVwYXJlXG4gICAqIHF1ZXJ5IG1hdGNoZXMgaW4gYSBwcm9wZXIgb3JkZXIgKHF1ZXJ5IG1hdGNoZXMgYXJlIG9yZGVyZWQgYmFzZWQgb24gdGhlaXIgZGVjbGFyYXRpb24gcG9pbnQgYW5kXG4gICAqIF9ub3RfIHRoZSBpbnNlcnRpb24gcG9pbnQpLlxuICAgKi9cbiAgW0RFQ0xBUkFUSU9OX0xDT05UQUlORVJdOiBMQ29udGFpbmVyfG51bGw7XG5cbiAgLyoqXG4gICAqIE1vcmUgZmxhZ3MgZm9yIHRoaXMgdmlldy4gU2VlIFByZU9yZGVySG9va0ZsYWdzIGZvciBtb3JlIGluZm8uXG4gICAqL1xuICBbUFJFT1JERVJfSE9PS19GTEFHU106IFByZU9yZGVySG9va0ZsYWdzO1xufVxuXG4vKiogRmxhZ3MgYXNzb2NpYXRlZCB3aXRoIGFuIExWaWV3IChzYXZlZCBpbiBMVmlld1tGTEFHU10pICovXG5leHBvcnQgY29uc3QgZW51bSBMVmlld0ZsYWdzIHtcbiAgLyoqIFRoZSBzdGF0ZSBvZiB0aGUgaW5pdCBwaGFzZSBvbiB0aGUgZmlyc3QgMiBiaXRzICovXG4gIEluaXRQaGFzZVN0YXRlSW5jcmVtZW50ZXIgPSAwYjAwMDAwMDAwMDAxLFxuICBJbml0UGhhc2VTdGF0ZU1hc2sgPSAwYjAwMDAwMDAwMDExLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgdmlldyBpcyBpbiBjcmVhdGlvbk1vZGUuXG4gICAqXG4gICAqIFRoaXMgbXVzdCBiZSBzdG9yZWQgaW4gdGhlIHZpZXcgcmF0aGVyIHRoYW4gdXNpbmcgYGRhdGFgIGFzIGEgbWFya2VyIHNvIHRoYXRcbiAgICogd2UgY2FuIHByb3Blcmx5IHN1cHBvcnQgZW1iZWRkZWQgdmlld3MuIE90aGVyd2lzZSwgd2hlbiBleGl0aW5nIGEgY2hpbGQgdmlld1xuICAgKiBiYWNrIGludG8gdGhlIHBhcmVudCB2aWV3LCBgZGF0YWAgd2lsbCBiZSBkZWZpbmVkIGFuZCBgY3JlYXRpb25Nb2RlYCB3aWxsIGJlXG4gICAqIGltcHJvcGVybHkgcmVwb3J0ZWQgYXMgZmFsc2UuXG4gICAqL1xuICBDcmVhdGlvbk1vZGUgPSAwYjAwMDAwMDAwMTAwLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIExWaWV3IGluc3RhbmNlIGlzIG9uIGl0cyBmaXJzdCBwcm9jZXNzaW5nIHBhc3MuXG4gICAqXG4gICAqIEFuIExWaWV3IGluc3RhbmNlIGlzIGNvbnNpZGVyZWQgdG8gYmUgb24gaXRzIFwiZmlyc3QgcGFzc1wiIHVudGlsIGl0XG4gICAqIGhhcyBjb21wbGV0ZWQgb25lIGNyZWF0aW9uIG1vZGUgcnVuIGFuZCBvbmUgdXBkYXRlIG1vZGUgcnVuLiBBdCB0aGlzXG4gICAqIHRpbWUsIHRoZSBmbGFnIGlzIHR1cm5lZCBvZmYuXG4gICAqL1xuICBGaXJzdExWaWV3UGFzcyA9IDBiMDAwMDAwMDEwMDAsXG5cbiAgLyoqIFdoZXRoZXIgdGhpcyB2aWV3IGhhcyBkZWZhdWx0IGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kgKGNoZWNrcyBhbHdheXMpIG9yIG9uUHVzaCAqL1xuICBDaGVja0Fsd2F5cyA9IDBiMDAwMDAwMTAwMDAsXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IG1hbnVhbCBjaGFuZ2UgZGV0ZWN0aW9uIGlzIHR1cm5lZCBvbiBmb3Igb25QdXNoIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIFRoaXMgaXMgYSBzcGVjaWFsIG1vZGUgdGhhdCBvbmx5IG1hcmtzIGNvbXBvbmVudHMgZGlydHkgaW4gdHdvIGNhc2VzOlxuICAgKiAxKSBUaGVyZSBoYXMgYmVlbiBhIGNoYW5nZSB0byBhbiBASW5wdXQgcHJvcGVydHlcbiAgICogMikgYG1hcmtEaXJ0eSgpYCBoYXMgYmVlbiBjYWxsZWQgbWFudWFsbHkgYnkgdGhlIHVzZXJcbiAgICpcbiAgICogTm90ZSB0aGF0IGluIHRoaXMgbW9kZSwgdGhlIGZpcmluZyBvZiBldmVudHMgZG9lcyBOT1QgbWFyayBjb21wb25lbnRzXG4gICAqIGRpcnR5IGF1dG9tYXRpY2FsbHkuXG4gICAqXG4gICAqIE1hbnVhbCBtb2RlIGlzIHR1cm5lZCBvZmYgYnkgZGVmYXVsdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIGFzIGV2ZW50c1xuICAgKiBhdXRvbWF0aWNhbGx5IG1hcmsgT25QdXNoIGNvbXBvbmVudHMgZGlydHkgaW4gVmlldyBFbmdpbmUuXG4gICAqXG4gICAqIFRPRE86IEFkZCBhIHB1YmxpYyBBUEkgdG8gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgdG8gdHVybiB0aGlzIG1vZGUgb25cbiAgICovXG4gIE1hbnVhbE9uUHVzaCA9IDBiMDAwMDAxMDAwMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBjdXJyZW50bHkgZGlydHkgKG5lZWRpbmcgY2hlY2spICovXG4gIERpcnR5ID0gMGIwMDAwMDEwMDAwMDAsXG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoaXMgdmlldyBpcyBjdXJyZW50bHkgYXR0YWNoZWQgdG8gY2hhbmdlIGRldGVjdGlvbiB0cmVlLiAqL1xuICBBdHRhY2hlZCA9IDBiMDAwMDEwMDAwMDAwLFxuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLiAqL1xuICBEZXN0cm95ZWQgPSAwYjAwMDEwMDAwMDAwMCxcblxuICAvKiogV2hldGhlciBvciBub3QgdGhpcyB2aWV3IGlzIHRoZSByb290IHZpZXcgKi9cbiAgSXNSb290ID0gMGIwMDEwMDAwMDAwMDAsXG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIHRoZSBjdXJyZW50IGluaXQgcGhhc2Ugb24gbGFzdCAyMiBiaXRzXG4gICAqL1xuICBJbmRleFdpdGhpbkluaXRQaGFzZUluY3JlbWVudGVyID0gMGIwMTAwMDAwMDAwMDAsXG4gIEluZGV4V2l0aGluSW5pdFBoYXNlU2hpZnQgPSAxMCxcbiAgSW5kZXhXaXRoaW5Jbml0UGhhc2VSZXNldCA9IDBiMDAxMTExMTExMTExLFxufVxuXG4vKipcbiAqIFBvc3NpYmxlIHN0YXRlcyBvZiB0aGUgaW5pdCBwaGFzZTpcbiAqIC0gMDA6IE9uSW5pdCBob29rcyB0byBiZSBydW4uXG4gKiAtIDAxOiBBZnRlckNvbnRlbnRJbml0IGhvb2tzIHRvIGJlIHJ1blxuICogLSAxMDogQWZ0ZXJWaWV3SW5pdCBob29rcyB0byBiZSBydW5cbiAqIC0gMTE6IEFsbCBpbml0IGhvb2tzIGhhdmUgYmVlbiBydW5cbiAqL1xuZXhwb3J0IGNvbnN0IGVudW0gSW5pdFBoYXNlU3RhdGUge1xuICBPbkluaXRIb29rc1RvQmVSdW4gPSAwYjAwLFxuICBBZnRlckNvbnRlbnRJbml0SG9va3NUb0JlUnVuID0gMGIwMSxcbiAgQWZ0ZXJWaWV3SW5pdEhvb2tzVG9CZVJ1biA9IDBiMTAsXG4gIEluaXRQaGFzZUNvbXBsZXRlZCA9IDBiMTEsXG59XG5cbi8qKiBNb3JlIGZsYWdzIGFzc29jaWF0ZWQgd2l0aCBhbiBMVmlldyAoc2F2ZWQgaW4gTFZpZXdbUFJFT1JERVJfSE9PS19GTEFHU10pICovXG5leHBvcnQgY29uc3QgZW51bSBQcmVPcmRlckhvb2tGbGFncyB7XG4gIC8qKiBUaGUgaW5kZXggb2YgdGhlIG5leHQgcHJlLW9yZGVyIGhvb2sgdG8gYmUgY2FsbGVkIGluIHRoZSBob29rcyBhcnJheSwgb24gdGhlIGZpcnN0IDE2XG4gICAgIGJpdHMgKi9cbiAgSW5kZXhPZlRoZU5leHRQcmVPcmRlckhvb2tNYXNrTWFzayA9IDBiMDExMTExMTExMTExMTExMTEsXG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgaW5pdCBob29rcyB0aGF0IGhhdmUgYWxyZWFkeSBiZWVuIGNhbGxlZCwgb24gdGhlIGxhc3QgMTYgYml0c1xuICAgKi9cbiAgTnVtYmVyT2ZJbml0SG9va3NDYWxsZWRJbmNyZW1lbnRlciA9IDBiMDEwMDAwMDAwMDAwMDAwMDAwLFxuICBOdW1iZXJPZkluaXRIb29rc0NhbGxlZFNoaWZ0ID0gMTYsXG4gIE51bWJlck9mSW5pdEhvb2tzQ2FsbGVkTWFzayA9IDBiMTExMTExMTExMTExMTExMTAwMDAwMDAwMDAwMDAwMDAsXG59XG5cbi8qKlxuICogU2V0IG9mIGluc3RydWN0aW9ucyB1c2VkIHRvIHByb2Nlc3MgaG9zdCBiaW5kaW5ncyBlZmZpY2llbnRseS5cbiAqXG4gKiBTZWUgVklFV19EQVRBLm1kIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4cGFuZG9JbnN0cnVjdGlvbnMgZXh0ZW5kcyBBcnJheTxudW1iZXJ8SG9zdEJpbmRpbmdzRnVuY3Rpb248YW55PnxudWxsPiB7fVxuXG4vKipcbiAqIEV4cGxpY2l0bHkgbWFya3MgYFRWaWV3YCBhcyBhIHNwZWNpZmljIHR5cGUgaW4gYG5nRGV2TW9kZWBcbiAqXG4gKiBJdCBpcyB1c2VmdWwgdG8ga25vdyBjb25jZXB0dWFsbHkgd2hhdCB0aW1lIG9mIGBUVmlld2Agd2UgYXJlIGRlYWxpbmcgd2l0aCB3aGVuXG4gKiBkZWJ1Z2dpbmcgYW4gYXBwbGljYXRpb24gKGV2ZW4gaWYgdGhlIHJ1bnRpbWUgZG9lcyBub3QgbmVlZCBpdC4pIEZvciB0aGlzIHJlYXNvblxuICogd2Ugc3RvcmUgdGhpcyBpbmZvcm1hdGlvbiBpbiB0aGUgYG5nRGV2TW9kZWAgYFRWaWV3YCBhbmQgdGhhbiB1c2UgaXQgZm9yXG4gKiBiZXR0ZXIgZGVidWdnaW5nIGV4cGVyaWVuY2UuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFRWaWV3VHlwZSB7XG4gIC8qKlxuICAgKiBSb290IGBUVmlld2AgaXMgdGhlIHVzZWQgdG8gYm9vdHN0cmFwIGNvbXBvbmVudHMgaW50by4gSXQgaXMgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoXG4gICAqIGBMVmlld2Agd2hpY2ggdGFrZXMgYW4gZXhpc3RpbmcgRE9NIG5vZGUgbm90IG93bmVkIGJ5IEFuZ3VsYXIgYW5kIHdyYXBzIGl0IGluIGBUVmlld2AvYExWaWV3YFxuICAgKiBzbyB0aGF0IG90aGVyIGNvbXBvbmVudHMgY2FuIGJlIGxvYWRlZCBpbnRvIGl0LlxuICAgKi9cbiAgUm9vdCA9IDAsXG5cbiAgLyoqXG4gICAqIGBUVmlld2AgYXNzb2NpYXRlZCB3aXRoIGEgQ29tcG9uZW50LiBUaGlzIHdvdWxkIGJlIHRoZSBgVFZpZXdgIGRpcmVjdGx5IGFzc29jaWF0ZWQgd2l0aCB0aGVcbiAgICogY29tcG9uZW50IHZpZXcgKGFzIG9wcG9zZWQgYW4gYEVtYmVkZGVkYCBgVFZpZXdgIHdoaWNoIHdvdWxkIGJlIGEgY2hpbGQgb2YgYENvbXBvbmVudGAgYFRWaWV3YClcbiAgICovXG4gIENvbXBvbmVudCA9IDEsXG5cbiAgLyoqXG4gICAqIGBUVmlld2AgYXNzb2NpYXRlZCB3aXRoIGEgdGVtcGxhdGUuIFN1Y2ggYXMgYCpuZ0lmYCwgYDxuZy10ZW1wbGF0ZT5gIGV0Yy4uLiBBIGBDb21wb25lbnRgXG4gICAqIGNhbiBoYXZlIHplcm8gb3IgbW9yZSBgRW1iZWRlZGVgIGBUVmlld2BzLlxuICAgKi9cbiAgRW1iZWRkZWQgPSAyLFxufVxuXG4vKipcbiAqIFRoZSBzdGF0aWMgZGF0YSBmb3IgYW4gTFZpZXcgKHNoYXJlZCBiZXR3ZWVuIGFsbCB0ZW1wbGF0ZXMgb2YgYVxuICogZ2l2ZW4gdHlwZSkuXG4gKlxuICogU3RvcmVkIG9uIHRoZSBgQ29tcG9uZW50RGVmLnRWaWV3YC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUVmlldyB7XG4gIC8qKlxuICAgKiBUeXBlIG9mIGBUVmlld2AgKGBSb290YHxgQ29tcG9uZW50YHxgRW1iZWRkZWRgKS5cbiAgICovXG4gIHR5cGU6IFRWaWV3VHlwZTtcblxuICAvKipcbiAgICogSUQgZm9yIGlubGluZSB2aWV3cyB0byBkZXRlcm1pbmUgd2hldGhlciBhIHZpZXcgaXMgdGhlIHNhbWUgYXMgdGhlIHByZXZpb3VzIHZpZXdcbiAgICogaW4gYSBjZXJ0YWluIHBvc2l0aW9uLiBJZiBpdCdzIG5vdCwgd2Uga25vdyB0aGUgbmV3IHZpZXcgbmVlZHMgdG8gYmUgaW5zZXJ0ZWRcbiAgICogYW5kIHRoZSBvbmUgdGhhdCBleGlzdHMgbmVlZHMgdG8gYmUgcmVtb3ZlZCAoZS5nLiBpZi9lbHNlIHN0YXRlbWVudHMpXG4gICAqXG4gICAqIElmIHRoaXMgaXMgLTEsIHRoZW4gdGhpcyBpcyBhIGNvbXBvbmVudCB2aWV3IG9yIGEgZHluYW1pY2FsbHkgY3JlYXRlZCB2aWV3LlxuICAgKi9cbiAgcmVhZG9ubHkgaWQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhpcyBpcyBhIGJsdWVwcmludCB1c2VkIHRvIGdlbmVyYXRlIExWaWV3IGluc3RhbmNlcyBmb3IgdGhpcyBUVmlldy4gQ29weWluZyB0aGlzXG4gICAqIGJsdWVwcmludCBpcyBmYXN0ZXIgdGhhbiBjcmVhdGluZyBhIG5ldyBMVmlldyBmcm9tIHNjcmF0Y2guXG4gICAqL1xuICBibHVlcHJpbnQ6IExWaWV3O1xuXG4gIC8qKlxuICAgKiBUaGUgdGVtcGxhdGUgZnVuY3Rpb24gdXNlZCB0byByZWZyZXNoIHRoZSB2aWV3IG9mIGR5bmFtaWNhbGx5IGNyZWF0ZWQgdmlld3NcbiAgICogYW5kIGNvbXBvbmVudHMuIFdpbGwgYmUgbnVsbCBmb3IgaW5saW5lIHZpZXdzLlxuICAgKi9cbiAgdGVtcGxhdGU6IENvbXBvbmVudFRlbXBsYXRlPHt9PnxudWxsO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIGNvbnRhaW5pbmcgcXVlcnktcmVsYXRlZCBpbnN0cnVjdGlvbnMuXG4gICAqL1xuICB2aWV3UXVlcnk6IFZpZXdRdWVyaWVzRnVuY3Rpb248e30+fG51bGw7XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgdG8gdGhlIGhvc3QgYFROb2RlYCAobm90IHBhcnQgb2YgdGhpcyBUVmlldykuXG4gICAqXG4gICAqIElmIHRoaXMgaXMgYSBgVFZpZXdOb2RlYCBmb3IgYW4gYExWaWV3Tm9kZWAsIHRoaXMgaXMgYW4gZW1iZWRkZWQgdmlldyBvZiBhIGNvbnRhaW5lci5cbiAgICogV2UgbmVlZCB0aGlzIHBvaW50ZXIgdG8gYmUgYWJsZSB0byBlZmZpY2llbnRseSBmaW5kIHRoaXMgbm9kZSB3aGVuIGluc2VydGluZyB0aGUgdmlld1xuICAgKiBpbnRvIGFuIGFuY2hvci5cbiAgICpcbiAgICogSWYgdGhpcyBpcyBhIGBURWxlbWVudE5vZGVgLCB0aGlzIGlzIHRoZSB2aWV3IG9mIGEgcm9vdCBjb21wb25lbnQuIEl0IGhhcyBleGFjdGx5IG9uZVxuICAgKiByb290IFROb2RlLlxuICAgKlxuICAgKiBJZiB0aGlzIGlzIG51bGwsIHRoaXMgaXMgdGhlIHZpZXcgb2YgYSBjb21wb25lbnQgdGhhdCBpcyBub3QgYXQgcm9vdC4gV2UgZG8gbm90IHN0b3JlXG4gICAqIHRoZSBob3N0IFROb2RlcyBmb3IgY2hpbGQgY29tcG9uZW50IHZpZXdzIGJlY2F1c2UgdGhleSBjYW4gcG90ZW50aWFsbHkgaGF2ZSBzZXZlcmFsXG4gICAqIGRpZmZlcmVudCBob3N0IFROb2RlcywgZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgYmVpbmcgdXNlZC4gVGhlc2UgaG9zdFxuICAgKiBUTm9kZXMgY2Fubm90IGJlIHNoYXJlZCAoZHVlIHRvIGRpZmZlcmVudCBpbmRpY2VzLCBldGMpLlxuICAgKi9cbiAgbm9kZTogVFZpZXdOb2RlfFRFbGVtZW50Tm9kZXxudWxsO1xuXG4gIC8qKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHRlbXBsYXRlIGhhcyBiZWVuIHByb2Nlc3NlZCBpbiBjcmVhdGlvbiBtb2RlLiAqL1xuICBmaXJzdENyZWF0ZVBhc3M6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgb3Igbm90IHRoZSBmaXJzdCB1cGRhdGUgZm9yIHRoaXMgdGVtcGxhdGUgaGFzIGJlZW4gcHJvY2Vzc2VkLiAqL1xuICBmaXJzdFVwZGF0ZVBhc3M6IGJvb2xlYW47XG5cbiAgLyoqIFN0YXRpYyBkYXRhIGVxdWl2YWxlbnQgb2YgTFZpZXcuZGF0YVtdLiBDb250YWlucyBUTm9kZXMsIFBpcGVEZWZJbnRlcm5hbCBvciBUSTE4bi4gKi9cbiAgZGF0YTogVERhdGE7XG5cbiAgLyoqXG4gICAqIFRoZSBiaW5kaW5nIHN0YXJ0IGluZGV4IGlzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgZGF0YSBhcnJheVxuICAgKiBzdGFydHMgdG8gc3RvcmUgYmluZGluZ3Mgb25seS4gU2F2aW5nIHRoaXMgdmFsdWUgZW5zdXJlcyB0aGF0IHdlXG4gICAqIHdpbGwgYmVnaW4gcmVhZGluZyBiaW5kaW5ncyBhdCB0aGUgY29ycmVjdCBwb2ludCBpbiB0aGUgYXJyYXkgd2hlblxuICAgKiB3ZSBhcmUgaW4gdXBkYXRlIG1vZGUuXG4gICAqXG4gICAqIC0xIG1lYW5zIHRoYXQgaXQgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkLlxuICAgKi9cbiAgYmluZGluZ1N0YXJ0SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGluZGV4IHdoZXJlIHRoZSBcImV4cGFuZG9cIiBzZWN0aW9uIG9mIGBMVmlld2AgYmVnaW5zLiBUaGUgZXhwYW5kb1xuICAgKiBzZWN0aW9uIGNvbnRhaW5zIGluamVjdG9ycywgZGlyZWN0aXZlIGluc3RhbmNlcywgYW5kIGhvc3QgYmluZGluZyB2YWx1ZXMuXG4gICAqIFVubGlrZSB0aGUgXCJkZWNsc1wiIGFuZCBcInZhcnNcIiBzZWN0aW9ucyBvZiBgTFZpZXdgLCB0aGUgbGVuZ3RoIG9mIHRoaXNcbiAgICogc2VjdGlvbiBjYW5ub3QgYmUgY2FsY3VsYXRlZCBhdCBjb21waWxlLXRpbWUgYmVjYXVzZSBkaXJlY3RpdmVzIGFyZSBtYXRjaGVkXG4gICAqIGF0IHJ1bnRpbWUgdG8gcHJlc2VydmUgbG9jYWxpdHkuXG4gICAqXG4gICAqIFdlIHN0b3JlIHRoaXMgc3RhcnQgaW5kZXggc28gd2Uga25vdyB3aGVyZSB0byBzdGFydCBjaGVja2luZyBob3N0IGJpbmRpbmdzXG4gICAqIGluIGBzZXRIb3N0QmluZGluZ3NgLlxuICAgKi9cbiAgZXhwYW5kb1N0YXJ0SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlcmUgYXJlIGFueSBzdGF0aWMgdmlldyBxdWVyaWVzIHRyYWNrZWQgb24gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBXZSBzdG9yZSB0aGlzIHNvIHdlIGtub3cgd2hldGhlciBvciBub3Qgd2Ugc2hvdWxkIGRvIGEgdmlldyBxdWVyeVxuICAgKiByZWZyZXNoIGFmdGVyIGNyZWF0aW9uIG1vZGUgdG8gY29sbGVjdCBzdGF0aWMgcXVlcnkgcmVzdWx0cy5cbiAgICovXG4gIHN0YXRpY1ZpZXdRdWVyaWVzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGVyZSBhcmUgYW55IHN0YXRpYyBjb250ZW50IHF1ZXJpZXMgdHJhY2tlZCBvbiB0aGlzIHZpZXcuXG4gICAqXG4gICAqIFdlIHN0b3JlIHRoaXMgc28gd2Uga25vdyB3aGV0aGVyIG9yIG5vdCB3ZSBzaG91bGQgZG8gYSBjb250ZW50IHF1ZXJ5XG4gICAqIHJlZnJlc2ggYWZ0ZXIgY3JlYXRpb24gbW9kZSB0byBjb2xsZWN0IHN0YXRpYyBxdWVyeSByZXN1bHRzLlxuICAgKi9cbiAgc3RhdGljQ29udGVudFF1ZXJpZXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBmaXJzdCBjaGlsZCBub2RlIGxvY2F0ZWQgaW4gdGhlIHZpZXcuXG4gICAqL1xuICBmaXJzdENoaWxkOiBUTm9kZXxudWxsO1xuXG4gIC8qKlxuICAgKiBTZXQgb2YgaW5zdHJ1Y3Rpb25zIHVzZWQgdG8gcHJvY2VzcyBob3N0IGJpbmRpbmdzIGVmZmljaWVudGx5LlxuICAgKlxuICAgKiBTZWUgVklFV19EQVRBLm1kIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZXhwYW5kb0luc3RydWN0aW9uczogRXhwYW5kb0luc3RydWN0aW9uc3xudWxsO1xuXG4gIC8qKlxuICAgKiBGdWxsIHJlZ2lzdHJ5IG9mIGRpcmVjdGl2ZXMgYW5kIGNvbXBvbmVudHMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBJdCdzIG5lY2Vzc2FyeSB0byBrZWVwIGEgY29weSBvZiB0aGUgZnVsbCBkZWYgbGlzdCBvbiB0aGUgVFZpZXcgc28gaXQncyBwb3NzaWJsZVxuICAgKiB0byByZW5kZXIgdGVtcGxhdGUgZnVuY3Rpb25zIHdpdGhvdXQgYSBob3N0IGNvbXBvbmVudC5cbiAgICovXG4gIGRpcmVjdGl2ZVJlZ2lzdHJ5OiBEaXJlY3RpdmVEZWZMaXN0fG51bGw7XG5cbiAgLyoqXG4gICAqIEZ1bGwgcmVnaXN0cnkgb2YgcGlwZXMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyB2aWV3LlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgZWl0aGVyIGFuIGFycmF5IG9mIGBQaXBlRGVmc2BzIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgYXJyYXkgb2ZcbiAgICogYFBpcGVEZWZzYHMuIFRoZSBmdW5jdGlvbiBpcyBuZWNlc3NhcnkgdG8gYmUgYWJsZSB0byBzdXBwb3J0IGZvcndhcmQgZGVjbGFyYXRpb25zLlxuICAgKlxuICAgKiBJdCdzIG5lY2Vzc2FyeSB0byBrZWVwIGEgY29weSBvZiB0aGUgZnVsbCBkZWYgbGlzdCBvbiB0aGUgVFZpZXcgc28gaXQncyBwb3NzaWJsZVxuICAgKiB0byByZW5kZXIgdGVtcGxhdGUgZnVuY3Rpb25zIHdpdGhvdXQgYSBob3N0IGNvbXBvbmVudC5cbiAgICovXG4gIHBpcGVSZWdpc3RyeTogUGlwZURlZkxpc3R8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdPbkluaXQsIG5nT25DaGFuZ2VzIGFuZCBuZ0RvQ2hlY2sgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgZm9yIHRoaXMgdmlldyBpblxuICAgKiBjcmVhdGlvbiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgcHJlT3JkZXJIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdPbkNoYW5nZXMgYW5kIG5nRG9DaGVjayBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluIHVwZGF0ZSBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgcHJlT3JkZXJDaGVja0hvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBuZ0FmdGVyQ29udGVudEluaXQgYW5kIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZFxuICAgKiBmb3IgdGhpcyB2aWV3IGluIGNyZWF0aW9uIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICBjb250ZW50SG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgdGhpcyB2aWV3IGluIHVwZGF0ZVxuICAgKiBtb2RlLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgY29udGVudENoZWNrSG9va3M6IEhvb2tEYXRhfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIG5nQWZ0ZXJWaWV3SW5pdCBhbmQgbmdBZnRlclZpZXdDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvclxuICAgKiB0aGlzIHZpZXcgaW4gY3JlYXRpb24gbW9kZS5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBEaXJlY3RpdmUgaW5kZXhcbiAgICogT2RkIGluZGljZXM6IEhvb2sgZnVuY3Rpb25cbiAgICovXG4gIHZpZXdIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdBZnRlclZpZXdDaGVja2VkIGhvb2tzIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGZvciB0aGlzIHZpZXcgaW5cbiAgICogdXBkYXRlIG1vZGUuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogRGlyZWN0aXZlIGluZGV4XG4gICAqIE9kZCBpbmRpY2VzOiBIb29rIGZ1bmN0aW9uXG4gICAqL1xuICB2aWV3Q2hlY2tIb29rczogSG9va0RhdGF8bnVsbDtcblxuICAvKipcbiAgICogQXJyYXkgb2YgbmdPbkRlc3Ryb3kgaG9va3MgdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgd2hlbiB0aGlzIHZpZXcgaXMgZGVzdHJveWVkLlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IERpcmVjdGl2ZSBpbmRleFxuICAgKiBPZGQgaW5kaWNlczogSG9vayBmdW5jdGlvblxuICAgKi9cbiAgZGVzdHJveUhvb2tzOiBIb29rRGF0YXxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGVuIGEgdmlldyBpcyBkZXN0cm95ZWQsIGxpc3RlbmVycyBuZWVkIHRvIGJlIHJlbGVhc2VkIGFuZCBvdXRwdXRzIG5lZWQgdG8gYmVcbiAgICogdW5zdWJzY3JpYmVkLiBUaGlzIGNsZWFudXAgYXJyYXkgc3RvcmVzIGJvdGggbGlzdGVuZXIgZGF0YSAoaW4gY2h1bmtzIG9mIDQpXG4gICAqIGFuZCBvdXRwdXQgZGF0YSAoaW4gY2h1bmtzIG9mIDIpIGZvciBhIHBhcnRpY3VsYXIgdmlldy4gQ29tYmluaW5nIHRoZSBhcnJheXNcbiAgICogc2F2ZXMgb24gbWVtb3J5ICg3MCBieXRlcyBwZXIgYXJyYXkpIGFuZCBvbiBhIGZldyBieXRlcyBvZiBjb2RlIHNpemUgKGZvciB0d29cbiAgICogc2VwYXJhdGUgZm9yIGxvb3BzKS5cbiAgICpcbiAgICogSWYgaXQncyBhIG5hdGl2ZSBET00gbGlzdGVuZXIgb3Igb3V0cHV0IHN1YnNjcmlwdGlvbiBiZWluZyBzdG9yZWQ6XG4gICAqIDFzdCBpbmRleCBpczogZXZlbnQgbmFtZSAgYG5hbWUgPSB0Vmlldy5jbGVhbnVwW2krMF1gXG4gICAqIDJuZCBpbmRleCBpczogaW5kZXggb2YgbmF0aXZlIGVsZW1lbnQgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHJpZXZlcyBnbG9iYWwgdGFyZ2V0ICh3aW5kb3csXG4gICAqICAgICAgICAgICAgICAgZG9jdW1lbnQgb3IgYm9keSkgcmVmZXJlbmNlIGJhc2VkIG9uIHRoZSBuYXRpdmUgZWxlbWVudDpcbiAgICogICAgYHR5cGVvZiBpZHhPclRhcmdldEdldHRlciA9PT0gJ2Z1bmN0aW9uJ2A6IGdsb2JhbCB0YXJnZXQgZ2V0dGVyIGZ1bmN0aW9uXG4gICAqICAgIGB0eXBlb2YgaWR4T3JUYXJnZXRHZXR0ZXIgPT09ICdudW1iZXInYDogaW5kZXggb2YgbmF0aXZlIGVsZW1lbnRcbiAgICpcbiAgICogM3JkIGluZGV4IGlzOiBpbmRleCBvZiBsaXN0ZW5lciBmdW5jdGlvbiBgbGlzdGVuZXIgPSBsVmlld1tDTEVBTlVQXVt0Vmlldy5jbGVhbnVwW2krMl1dYFxuICAgKiA0dGggaW5kZXggaXM6IGB1c2VDYXB0dXJlT3JJbmR4ID0gdFZpZXcuY2xlYW51cFtpKzNdYFxuICAgKiAgICBgdHlwZW9mIHVzZUNhcHR1cmVPckluZHggPT0gJ2Jvb2xlYW4nIDogdXNlQ2FwdHVyZSBib29sZWFuXG4gICAqICAgIGB0eXBlb2YgdXNlQ2FwdHVyZU9ySW5keCA9PSAnbnVtYmVyJzpcbiAgICogICAgICAgICBgdXNlQ2FwdHVyZU9ySW5keCA+PSAwYCBgcmVtb3ZlTGlzdGVuZXIgPSBMVmlld1tDTEVBTlVQXVt1c2VDYXB0dXJlT3JJbmR4XWBcbiAgICogICAgICAgICBgdXNlQ2FwdHVyZU9ySW5keCA8ICAwYCBgc3Vic2NyaXB0aW9uID0gTFZpZXdbQ0xFQU5VUF1bLXVzZUNhcHR1cmVPckluZHhdYFxuICAgKlxuICAgKiBJZiBpdCdzIGFuIG91dHB1dCBzdWJzY3JpcHRpb24gb3IgcXVlcnkgbGlzdCBkZXN0cm95IGhvb2s6XG4gICAqIDFzdCBpbmRleCBpczogb3V0cHV0IHVuc3Vic2NyaWJlIGZ1bmN0aW9uIC8gcXVlcnkgbGlzdCBkZXN0cm95IGZ1bmN0aW9uXG4gICAqIDJuZCBpbmRleCBpczogaW5kZXggb2YgZnVuY3Rpb24gY29udGV4dCBpbiBMVmlldy5jbGVhbnVwSW5zdGFuY2VzW11cbiAgICogICAgICAgICAgICAgICBgdFZpZXcuY2xlYW51cFtpKzBdLmNhbGwobFZpZXdbQ0xFQU5VUF1bdFZpZXcuY2xlYW51cFtpKzFdXSlgXG4gICAqL1xuICBjbGVhbnVwOiBhbnlbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgZWxlbWVudCBpbmRpY2VzIGZvciBjaGlsZCBjb21wb25lbnRzIHRoYXQgd2lsbCBuZWVkIHRvIGJlXG4gICAqIHJlZnJlc2hlZCB3aGVuIHRoZSBjdXJyZW50IHZpZXcgaGFzIGZpbmlzaGVkIGl0cyBjaGVjay4gVGhlc2UgaW5kaWNlcyBoYXZlXG4gICAqIGFscmVhZHkgYmVlbiBhZGp1c3RlZCBmb3IgdGhlIEhFQURFUl9PRkZTRVQuXG4gICAqXG4gICAqL1xuICBjb21wb25lbnRzOiBudW1iZXJbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBBIGNvbGxlY3Rpb24gb2YgcXVlcmllcyB0cmFja2VkIGluIGEgZ2l2ZW4gdmlldy5cbiAgICovXG4gIHF1ZXJpZXM6IFRRdWVyaWVzfG51bGw7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGluZGljZXMgcG9pbnRpbmcgdG8gZGlyZWN0aXZlcyB3aXRoIGNvbnRlbnQgcXVlcmllcyBhbG9uZ3NpZGUgd2l0aCB0aGVcbiAgICogY29ycmVzcG9uZGluZ1xuICAgKiBxdWVyeSBpbmRleC4gRWFjaCBlbnRyeSBpbiB0aGlzIGFycmF5IGlzIGEgdHVwbGUgb2Y6XG4gICAqIC0gaW5kZXggb2YgdGhlIGZpcnN0IGNvbnRlbnQgcXVlcnkgaW5kZXggZGVjbGFyZWQgYnkgYSBnaXZlbiBkaXJlY3RpdmU7XG4gICAqIC0gaW5kZXggb2YgYSBkaXJlY3RpdmUuXG4gICAqXG4gICAqIFdlIGFyZSBzdG9yaW5nIHRob3NlIGluZGV4ZXMgc28gd2UgY2FuIHJlZnJlc2ggY29udGVudCBxdWVyaWVzIGFzIHBhcnQgb2YgYSB2aWV3IHJlZnJlc2hcbiAgICogcHJvY2Vzcy5cbiAgICovXG4gIGNvbnRlbnRRdWVyaWVzOiBudW1iZXJbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBTZXQgb2Ygc2NoZW1hcyB0aGF0IGRlY2xhcmUgZWxlbWVudHMgdG8gYmUgYWxsb3dlZCBpbnNpZGUgdGhlIHZpZXcuXG4gICAqL1xuICBzY2hlbWFzOiBTY2hlbWFNZXRhZGF0YVtdfG51bGw7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGNvbnN0YW50cyBmb3IgdGhlIHZpZXcuIEluY2x1ZGVzIGF0dHJpYnV0ZSBhcnJheXMsIGxvY2FsIGRlZmluaXRpb24gYXJyYXlzIGV0Yy5cbiAgICogVXNlZCBmb3IgZGlyZWN0aXZlIG1hdGNoaW5nLCBhdHRyaWJ1dGUgYmluZGluZ3MsIGxvY2FsIGRlZmluaXRpb25zIGFuZCBtb3JlLlxuICAgKi9cbiAgY29uc3RzOiBUQ29uc3RhbnRzfG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIFJvb3RDb250ZXh0RmxhZ3Mge0VtcHR5ID0gMGIwMCwgRGV0ZWN0Q2hhbmdlcyA9IDBiMDEsIEZsdXNoUGxheWVycyA9IDBiMTB9XG5cblxuLyoqXG4gKiBSb290Q29udGV4dCBjb250YWlucyBpbmZvcm1hdGlvbiB3aGljaCBpcyBzaGFyZWQgZm9yIGFsbCBjb21wb25lbnRzIHdoaWNoXG4gKiB3ZXJlIGJvb3RzdHJhcHBlZCB3aXRoIHtAbGluayByZW5kZXJDb21wb25lbnR9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RDb250ZXh0IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdXNlZCBmb3Igc2NoZWR1bGluZyBjaGFuZ2UgZGV0ZWN0aW9uIGluIHRoZSBmdXR1cmUuIFVzdWFsbHlcbiAgICogdGhpcyBpcyBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYC5cbiAgICovXG4gIHNjaGVkdWxlcjogKHdvcmtGbjogKCkgPT4gdm9pZCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQSBwcm9taXNlIHdoaWNoIGlzIHJlc29sdmVkIHdoZW4gYWxsIGNvbXBvbmVudHMgYXJlIGNvbnNpZGVyZWQgY2xlYW4gKG5vdCBkaXJ0eSkuXG4gICAqXG4gICAqIFRoaXMgcHJvbWlzZSBpcyBvdmVyd3JpdHRlbiBldmVyeSB0aW1lIGEgZmlyc3QgY2FsbCB0byB7QGxpbmsgbWFya0RpcnR5fSBpcyBpbnZva2VkLlxuICAgKi9cbiAgY2xlYW46IFByb21pc2U8bnVsbD47XG5cbiAgLyoqXG4gICAqIFJvb3RDb21wb25lbnRzIC0gVGhlIGNvbXBvbmVudHMgdGhhdCB3ZXJlIGluc3RhbnRpYXRlZCBieSB0aGUgY2FsbCB0b1xuICAgKiB7QGxpbmsgcmVuZGVyQ29tcG9uZW50fS5cbiAgICovXG4gIGNvbXBvbmVudHM6IHt9W107XG5cbiAgLyoqXG4gICAqIFRoZSBwbGF5ZXIgZmx1c2hpbmcgaGFuZGxlciB0byBraWNrIG9mZiBhbGwgYW5pbWF0aW9uc1xuICAgKi9cbiAgcGxheWVySGFuZGxlcjogUGxheWVySGFuZGxlcnxudWxsO1xuXG4gIC8qKlxuICAgKiBXaGF0IHJlbmRlci1yZWxhdGVkIG9wZXJhdGlvbnMgdG8gcnVuIG9uY2UgYSBzY2hlZHVsZXIgaGFzIGJlZW4gc2V0XG4gICAqL1xuICBmbGFnczogUm9vdENvbnRleHRGbGFncztcbn1cblxuLyoqXG4gKiBBcnJheSBvZiBob29rcyB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCBmb3IgYSB2aWV3IGFuZCB0aGVpciBkaXJlY3RpdmUgaW5kaWNlcy5cbiAqXG4gKiBGb3IgZWFjaCBub2RlIG9mIHRoZSB2aWV3LCB0aGUgZm9sbG93aW5nIGRhdGEgaXMgc3RvcmVkOlxuICogMSkgTm9kZSBpbmRleCAob3B0aW9uYWwpXG4gKiAyKSBBIHNlcmllcyBvZiBudW1iZXIvZnVuY3Rpb24gcGFpcnMgd2hlcmU6XG4gKiAgLSBldmVuIGluZGljZXMgYXJlIGRpcmVjdGl2ZSBpbmRpY2VzXG4gKiAgLSBvZGQgaW5kaWNlcyBhcmUgaG9vayBmdW5jdGlvbnNcbiAqXG4gKiBTcGVjaWFsIGNhc2VzOlxuICogIC0gYSBuZWdhdGl2ZSBkaXJlY3RpdmUgaW5kZXggZmxhZ3MgYW4gaW5pdCBob29rIChuZ09uSW5pdCwgbmdBZnRlckNvbnRlbnRJbml0LCBuZ0FmdGVyVmlld0luaXQpXG4gKi9cbmV4cG9ydCB0eXBlIEhvb2tEYXRhID0gKG51bWJlciB8ICgoKSA9PiB2b2lkKSlbXTtcblxuLyoqXG4gKiBTdGF0aWMgZGF0YSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBpbnN0YW5jZS1zcGVjaWZpYyBkYXRhIGFycmF5IG9uIGFuIExWaWV3LlxuICpcbiAqIEVhY2ggbm9kZSdzIHN0YXRpYyBkYXRhIGlzIHN0b3JlZCBpbiB0RGF0YSBhdCB0aGUgc2FtZSBpbmRleCB0aGF0IGl0J3Mgc3RvcmVkXG4gKiBpbiB0aGUgZGF0YSBhcnJheS4gIEFueSBub2RlcyB0aGF0IGRvIG5vdCBoYXZlIHN0YXRpYyBkYXRhIHN0b3JlIGEgbnVsbCB2YWx1ZSBpblxuICogdERhdGEgdG8gYXZvaWQgYSBzcGFyc2UgYXJyYXkuXG4gKlxuICogRWFjaCBwaXBlJ3MgZGVmaW5pdGlvbiBpcyBzdG9yZWQgaGVyZSBhdCB0aGUgc2FtZSBpbmRleCBhcyBpdHMgcGlwZSBpbnN0YW5jZSBpblxuICogdGhlIGRhdGEgYXJyYXkuXG4gKlxuICogRWFjaCBob3N0IHByb3BlcnR5J3MgbmFtZSBpcyBzdG9yZWQgaGVyZSBhdCB0aGUgc2FtZSBpbmRleCBhcyBpdHMgdmFsdWUgaW4gdGhlXG4gKiBkYXRhIGFycmF5LlxuICpcbiAqIEVhY2ggcHJvcGVydHkgYmluZGluZyBuYW1lIGlzIHN0b3JlZCBoZXJlIGF0IHRoZSBzYW1lIGluZGV4IGFzIGl0cyB2YWx1ZSBpblxuICogdGhlIGRhdGEgYXJyYXkuIElmIHRoZSBiaW5kaW5nIGlzIGFuIGludGVycG9sYXRpb24sIHRoZSBzdGF0aWMgc3RyaW5nIHZhbHVlc1xuICogYXJlIHN0b3JlZCBwYXJhbGxlbCB0byB0aGUgZHluYW1pYyB2YWx1ZXMuIEV4YW1wbGU6XG4gKlxuICogaWQ9XCJwcmVmaXgge3sgdjAgfX0gYSB7eyB2MSB9fSBiIHt7IHYyIH19IHN1ZmZpeFwiXG4gKlxuICogTFZpZXcgICAgICAgfCAgIFRWaWV3LmRhdGFcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgdjAgdmFsdWUgICB8ICAgJ2EnXG4gKiAgdjEgdmFsdWUgICB8ICAgJ2InXG4gKiAgdjIgdmFsdWUgICB8ICAgaWQg77+9IHByZWZpeCDvv70gc3VmZml4XG4gKlxuICogSW5qZWN0b3IgYmxvb20gZmlsdGVycyBhcmUgYWxzbyBzdG9yZWQgaGVyZS5cbiAqL1xuZXhwb3J0IHR5cGUgVERhdGEgPVxuICAgIChUTm9kZSB8IFBpcGVEZWY8YW55PnwgRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+fCBudW1iZXIgfCBUeXBlPGFueT58XG4gICAgIEluamVjdGlvblRva2VuPGFueT58IFRJMThuIHwgSTE4blVwZGF0ZU9wQ29kZXMgfCBudWxsIHwgc3RyaW5nKVtdO1xuXG4vLyBOb3RlOiBUaGlzIGhhY2sgaXMgbmVjZXNzYXJ5IHNvIHdlIGRvbid0IGVycm9uZW91c2x5IGdldCBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbi8vIGZhaWx1cmUgYmFzZWQgb24gdHlwZXMuXG5leHBvcnQgY29uc3QgdW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgPSAxO1xuIl19