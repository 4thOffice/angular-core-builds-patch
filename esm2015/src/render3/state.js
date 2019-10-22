/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined, assertEqual } from '../util/assert';
import { assertLViewOrUndefined } from './assert';
import { CONTEXT, DECLARATION_VIEW } from './interfaces/view';
/**
 * All implicit instruction state is stored here.
 *
 * It is useful to have a single object where all of the state is stored as a mental model
 * (rather it being spread across many different variables.)
 *
 * PERF NOTE: Turns out that writing to a true global variable is slower than
 * having an intermediate object with properties.
 * @record
 */
function InstructionState() { }
if (false) {
    /**
     * State of the current view being processed.
     *
     * An array of nodes (text, element, container, etc), pipes, their bindings, and
     * any local variables that need to be stored between invocations.
     * @type {?}
     */
    InstructionState.prototype.lView;
    /**
     * Used to set the parent property when nodes are created and track query results.
     *
     * This is used in conjection with `isParent`.
     * @type {?}
     */
    InstructionState.prototype.previousOrParentTNode;
    /**
     * If `isParent` is:
     *  - `true`: then `previousOrParentTNode` points to a parent node.
     *  - `false`: then `previousOrParentTNode` points to previous node (sibling).
     * @type {?}
     */
    InstructionState.prototype.isParent;
    /**
     * Index of currently selected element in LView.
     *
     * Used by binding instructions. Updated as part of advance instruction.
     * @type {?}
     */
    InstructionState.prototype.selectedIndex;
    /**
     * The last viewData retrieved by nextContext().
     * Allows building nextContext() and reference() calls.
     *
     * e.g. const inner = x().$implicit; const outer = x().$implicit;
     * @type {?}
     */
    InstructionState.prototype.contextLView;
    /**
     * In this mode, any changes in bindings will throw an ExpressionChangedAfterChecked error.
     *
     * Necessary to support ChangeDetectorRef.checkNoChanges().
     * @type {?}
     */
    InstructionState.prototype.checkNoChangesMode;
    /**
     * Store the element depth count. This is used to identify the root elements of the template
     * so that we can then attach `LView` to only those elements.
     * @type {?}
     */
    InstructionState.prototype.elementDepthCount;
    /**
     * Stores whether directives should be matched to elements.
     *
     * When template contains `ngNonBindable` then we need to prevent the runtime form matching
     * directives on children of that element.
     *
     * Example:
     * ```
     * <my-comp my-directive>
     *   Should match component / directive.
     * </my-comp>
     * <div ngNonBindable>
     *   <my-comp my-directive>
     *     Should not match component / directive because we are in ngNonBindable.
     *   </my-comp>
     * </div>
     * ```
     * @type {?}
     */
    InstructionState.prototype.bindingsEnabled;
    /**
     * Current namespace to be used when creating elements
     * @type {?}
     */
    InstructionState.prototype.currentNamespace;
    /**
     * Current sanitizer
     * @type {?}
     */
    InstructionState.prototype.currentSanitizer;
    /**
     * Used when processing host bindings.
     * @type {?}
     */
    InstructionState.prototype.currentDirectiveDef;
    /**
     * Used as the starting directive id value.
     *
     * All subsequent directives are incremented from this value onwards.
     * The reason why this value is `1` instead of `0` is because the `0`
     * value is reserved for the template.
     * @type {?}
     */
    InstructionState.prototype.activeDirectiveId;
    /**
     * The root index from which pure function instructions should calculate their binding
     * indices. In component views, this is TView.bindingStartIndex. In a host binding
     * context, this is the TView.expandoStartIndex + any dirs/hostVars before the given dir.
     * @type {?}
     */
    InstructionState.prototype.bindingRootIndex;
    /**
     * Current index of a View or Content Query which needs to be processed next.
     * We iterate over the list of Queries and increment current query index at every step.
     * @type {?}
     */
    InstructionState.prototype.currentQueryIndex;
    /**
     * Function to be called when the element is exited.
     *
     * NOTE: The function is here for tree shakable purposes since it is only needed by styling.
     * @type {?}
     */
    InstructionState.prototype.elementExitFn;
}
/** @type {?} */
export const instructionState = {
    previousOrParentTNode: (/** @type {?} */ (null)),
    isParent: (/** @type {?} */ (null)),
    lView: (/** @type {?} */ (null)),
    // tslint:disable-next-line: no-toplevel-property-access
    selectedIndex: -1 << 1 /* Size */,
    contextLView: (/** @type {?} */ (null)),
    checkNoChangesMode: false,
    elementDepthCount: 0,
    bindingsEnabled: true,
    currentNamespace: null,
    currentSanitizer: null,
    currentDirectiveDef: null,
    activeDirectiveId: 0,
    bindingRootIndex: -1,
    currentQueryIndex: 0,
    elementExitFn: null,
};
/**
 * @return {?}
 */
export function getElementDepthCount() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.elementDepthCount;
}
/**
 * @return {?}
 */
export function increaseElementDepthCount() {
    instructionState.elementDepthCount++;
}
/**
 * @return {?}
 */
export function decreaseElementDepthCount() {
    instructionState.elementDepthCount--;
}
/**
 * @return {?}
 */
export function getCurrentDirectiveDef() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.currentDirectiveDef;
}
/**
 * @param {?} def
 * @return {?}
 */
export function setCurrentDirectiveDef(def) {
    instructionState.currentDirectiveDef = def;
}
/**
 * @return {?}
 */
export function getBindingsEnabled() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.bindingsEnabled;
}
/**
 * Enables directive matching on elements.
 *
 *  * Example:
 * ```
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵenableBindings() {
    instructionState.bindingsEnabled = true;
}
/**
 * Disables directive matching on element.
 *
 *  * Example:
 * ```
 * <my-comp my-directive>
 *   Should match component / directive.
 * </my-comp>
 * <div ngNonBindable>
 *   <!-- ɵɵdisableBindings() -->
 *   <my-comp my-directive>
 *     Should not match component / directive because we are in ngNonBindable.
 *   </my-comp>
 *   <!-- ɵɵenableBindings() -->
 * </div>
 * ```
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵdisableBindings() {
    instructionState.bindingsEnabled = false;
}
/**
 * @return {?}
 */
export function getLView() {
    return instructionState.lView;
}
/** @enum {number} */
const ActiveElementFlags = {
    Initial: 0,
    RunExitFn: 1,
    Size: 1,
};
export { ActiveElementFlags };
/**
 * Determines whether or not a flag is currently set for the active element.
 * @param {?} flag
 * @return {?}
 */
export function hasActiveElementFlag(flag) {
    return (instructionState.selectedIndex & flag) === flag;
}
/**
 * Sets a flag is for the active element.
 * @param {?} flag
 * @return {?}
 */
export function setActiveElementFlag(flag) {
    instructionState.selectedIndex |= flag;
}
/**
 * Sets the active directive host element and resets the directive id value
 * (when the provided elementIndex value has changed).
 *
 * @param {?=} elementIndex the element index value for the host element where
 *                     the directive/component instance lives
 * @return {?}
 */
export function setActiveHostElement(elementIndex = null) {
    if (getSelectedIndex() !== elementIndex) {
        if (hasActiveElementFlag(1 /* RunExitFn */)) {
            executeElementExitFn();
        }
        setSelectedIndex(elementIndex === null ? -1 : elementIndex);
        instructionState.activeDirectiveId = 0;
    }
}
/**
 * @return {?}
 */
export function executeElementExitFn() {
    (/** @type {?} */ (instructionState.elementExitFn))();
    // TODO (matsko|misko): remove this unassignment once the state management of
    //                      global variables are better managed.
    instructionState.selectedIndex &= ~1 /* RunExitFn */;
}
/**
 * Queues a function to be run once the element is "exited" in CD.
 *
 * Change detection will focus on an element either when the `advance()`
 * instruction is called or when the template or host bindings instruction
 * code is invoked. The element is then "exited" when the next element is
 * selected or when change detection for the template or host bindings is
 * complete. When this occurs (the element change operation) then an exit
 * function will be invoked if it has been set. This function can be used
 * to assign that exit function.
 *
 * @param {?} fn
 * @return {?}
 */
export function setElementExitFn(fn) {
    setActiveElementFlag(1 /* RunExitFn */);
    if (instructionState.elementExitFn == null) {
        instructionState.elementExitFn = fn;
    }
    ngDevMode &&
        assertEqual(instructionState.elementExitFn, fn, 'Expecting to always get the same function');
}
/**
 * Returns the current id value of the current directive.
 *
 * For example we have an element that has two directives on it:
 * <div dir-one dir-two></div>
 *
 * dirOne->hostBindings() (id == 1)
 * dirTwo->hostBindings() (id == 2)
 *
 * Note that this is only active when `hostBinding` functions are being processed.
 *
 * Note that directive id values are specific to an element (this means that
 * the same id value could be present on another element with a completely
 * different set of directives).
 * @return {?}
 */
export function getActiveDirectiveId() {
    return instructionState.activeDirectiveId;
}
/**
 * Increments the current directive id value.
 *
 * For example we have an element that has two directives on it:
 * <div dir-one dir-two></div>
 *
 * dirOne->hostBindings() (index = 1)
 * // increment
 * dirTwo->hostBindings() (index = 2)
 *
 * Depending on whether or not a previous directive had any inherited
 * directives present, that value will be incremented in addition
 * to the id jumping up by one.
 *
 * Note that this is only active when `hostBinding` functions are being processed.
 *
 * Note that directive id values are specific to an element (this means that
 * the same id value could be present on another element with a completely
 * different set of directives).
 * @return {?}
 */
export function incrementActiveDirectiveId() {
    // Each directive gets a uniqueId value that is the same for both
    // create and update calls when the hostBindings function is called. The
    // directive uniqueId is not set anywhere--it is just incremented between
    // each hostBindings call and is useful for helping instruction code
    // uniquely determine which directive is currently active when executed.
    instructionState.activeDirectiveId += 1;
}
/**
 * Restores `contextViewData` to the given OpaqueViewState instance.
 *
 * Used in conjunction with the getCurrentView() instruction to save a snapshot
 * of the current view and restore it when listeners are invoked. This allows
 * walking the declaration view tree in listeners to get vars from parent views.
 *
 * \@codeGenApi
 * @param {?} viewToRestore The OpaqueViewState instance to restore.
 *
 * @return {?}
 */
export function ɵɵrestoreView(viewToRestore) {
    instructionState.contextLView = (/** @type {?} */ ((/** @type {?} */ (viewToRestore))));
}
/**
 * @return {?}
 */
export function getPreviousOrParentTNode() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.previousOrParentTNode;
}
/**
 * @param {?} tNode
 * @param {?} _isParent
 * @return {?}
 */
export function setPreviousOrParentTNode(tNode, _isParent) {
    instructionState.previousOrParentTNode = tNode;
    instructionState.isParent = _isParent;
}
/**
 * @param {?} tNode
 * @param {?} view
 * @return {?}
 */
export function setTNodeAndViewData(tNode, view) {
    ngDevMode && assertLViewOrUndefined(view);
    instructionState.previousOrParentTNode = tNode;
    instructionState.lView = view;
}
/**
 * @return {?}
 */
export function getIsParent() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.isParent;
}
/**
 * @return {?}
 */
export function setIsNotParent() {
    instructionState.isParent = false;
}
/**
 * @return {?}
 */
export function setIsParent() {
    instructionState.isParent = true;
}
/**
 * @return {?}
 */
export function getContextLView() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.contextLView;
}
/**
 * @return {?}
 */
export function getCheckNoChangesMode() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.checkNoChangesMode;
}
/**
 * @param {?} mode
 * @return {?}
 */
export function setCheckNoChangesMode(mode) {
    instructionState.checkNoChangesMode = mode;
}
// top level variables should not be exported for performance reasons (PERF_NOTES.md)
/**
 * @return {?}
 */
export function getBindingRoot() {
    return instructionState.bindingRootIndex;
}
/**
 * @param {?} value
 * @return {?}
 */
export function setBindingRoot(value) {
    instructionState.bindingRootIndex = value;
}
/**
 * @return {?}
 */
export function getCurrentQueryIndex() {
    // top level variables should not be exported for performance reasons (PERF_NOTES.md)
    return instructionState.currentQueryIndex;
}
/**
 * @param {?} value
 * @return {?}
 */
export function setCurrentQueryIndex(value) {
    instructionState.currentQueryIndex = value;
}
/**
 * Swap the current lView with a new lView.
 *
 * For performance reasons we store the lView in the top level of the module.
 * This way we minimize the number of properties to read. Whenever a new view
 * is entered we have to store the lView for later, and when the view is
 * exited the state has to be restored
 *
 * @param {?} newView New lView to become active
 * @param {?} hostTNode
 * @return {?} the previously active lView;
 */
export function selectView(newView, hostTNode) {
    if (hasActiveElementFlag(1 /* RunExitFn */)) {
        executeElementExitFn();
    }
    ngDevMode && assertLViewOrUndefined(newView);
    /** @type {?} */
    const oldView = instructionState.lView;
    instructionState.previousOrParentTNode = (/** @type {?} */ (hostTNode));
    instructionState.isParent = true;
    instructionState.lView = instructionState.contextLView = newView;
    return oldView;
}
/**
 * @template T
 * @param {?=} level
 * @return {?}
 */
export function nextContextImpl(level = 1) {
    instructionState.contextLView = walkUpViews(level, (/** @type {?} */ (instructionState.contextLView)));
    return (/** @type {?} */ (instructionState.contextLView[CONTEXT]));
}
/**
 * @param {?} nestingLevel
 * @param {?} currentView
 * @return {?}
 */
function walkUpViews(nestingLevel, currentView) {
    while (nestingLevel > 0) {
        ngDevMode && assertDefined(currentView[DECLARATION_VIEW], 'Declaration view should be defined if nesting level is greater than 0.');
        currentView = (/** @type {?} */ (currentView[DECLARATION_VIEW]));
        nestingLevel--;
    }
    return currentView;
}
/**
 * Resets the application state.
 * @return {?}
 */
export function resetComponentState() {
    instructionState.isParent = false;
    instructionState.previousOrParentTNode = (/** @type {?} */ (null));
    instructionState.elementDepthCount = 0;
    instructionState.bindingsEnabled = true;
    setCurrentStyleSanitizer(null);
}
/**
 * Gets the most recent index passed to {\@link select}
 *
 * Used with {\@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 * @return {?}
 */
export function getSelectedIndex() {
    return instructionState.selectedIndex >> 1 /* Size */;
}
/**
 * Sets the most recent index passed to {\@link select}
 *
 * Used with {\@link property} instruction (and more in the future) to identify the index in the
 * current `LView` to act on.
 *
 * (Note that if an "exit function" was set earlier (via `setElementExitFn()`) then that will be
 * run if and when the provided `index` value is different from the current selected index value.)
 * @param {?} index
 * @return {?}
 */
export function setSelectedIndex(index) {
    instructionState.selectedIndex = index << 1 /* Size */;
}
/**
 * Sets the namespace used to create elements to `'http://www.w3.org/2000/svg'` in global state.
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵnamespaceSVG() {
    instructionState.currentNamespace = 'http://www.w3.org/2000/svg';
}
/**
 * Sets the namespace used to create elements to `'http://www.w3.org/1998/MathML/'` in global state.
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵnamespaceMathML() {
    instructionState.currentNamespace = 'http://www.w3.org/1998/MathML/';
}
/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 *
 * \@codeGenApi
 * @return {?}
 */
export function ɵɵnamespaceHTML() {
    namespaceHTMLInternal();
}
/**
 * Sets the namespace used to create elements to `null`, which forces element creation to use
 * `createElement` rather than `createElementNS`.
 * @return {?}
 */
export function namespaceHTMLInternal() {
    instructionState.currentNamespace = null;
}
/**
 * @return {?}
 */
export function getNamespace() {
    return instructionState.currentNamespace;
}
/**
 * @param {?} sanitizer
 * @return {?}
 */
export function setCurrentStyleSanitizer(sanitizer) {
    instructionState.currentSanitizer = sanitizer;
}
/**
 * @return {?}
 */
export function resetCurrentStyleSanitizer() {
    setCurrentStyleSanitizer(null);
}
/**
 * @return {?}
 */
export function getCurrentStyleSanitizer() {
    return instructionState.currentSanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHaEQsT0FBTyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBeUIsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7QUFXcEYsK0JBb0hDOzs7Ozs7Ozs7SUE3R0MsaUNBQWE7Ozs7Ozs7SUFPYixpREFBNkI7Ozs7Ozs7SUFPN0Isb0NBQWtCOzs7Ozs7O0lBT2xCLHlDQUFzQjs7Ozs7Ozs7SUFRdEIsd0NBQW9COzs7Ozs7O0lBT3BCLDhDQUE0Qjs7Ozs7O0lBTTVCLDZDQUEwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvQjFCLDJDQUF5Qjs7Ozs7SUFLekIsNENBQThCOzs7OztJQUs5Qiw0Q0FBdUM7Ozs7O0lBTXZDLCtDQUE4RDs7Ozs7Ozs7O0lBUzlELDZDQUEwQjs7Ozs7OztJQU8xQiw0Q0FBeUI7Ozs7OztJQU16Qiw2Q0FBMEI7Ozs7Ozs7SUFRMUIseUNBQWlDOzs7QUFHbkMsTUFBTSxPQUFPLGdCQUFnQixHQUFxQjtJQUNoRCxxQkFBcUIsRUFBRSxtQkFBQSxJQUFJLEVBQUU7SUFDN0IsUUFBUSxFQUFFLG1CQUFBLElBQUksRUFBRTtJQUNoQixLQUFLLEVBQUUsbUJBQUEsSUFBSSxFQUFFOztJQUViLGFBQWEsRUFBRSxDQUFDLENBQUMsZ0JBQTJCO0lBQzVDLFlBQVksRUFBRSxtQkFBQSxJQUFJLEVBQUU7SUFDcEIsa0JBQWtCLEVBQUUsS0FBSztJQUN6QixpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLGdCQUFnQixFQUFFLElB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O0FBV0QsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQWE7SUFDNUMsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLEtBQUssZ0JBQTJCLENBQUM7QUFDcEUsQ0FBQzs7Ozs7OztBQVFELE1BQU0sVUFBVSxjQUFjO0lBQzVCLGdCQUFnQixDQUFDLGdCQUFnQixHQUFHLDRCQUE0QixDQUFDO0FBQ25FLENBQUM7Ozs7Ozs7QUFPRCxNQUFNLFVBQVUsaUJBQWlCO0lBQy9CLGdCQUFnQixDQUFDLGdCQUFnQixHQUFHLGdDQUFnQyxDQUFDO0FBQ3ZFLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLGVBQWU7SUFDN0IscUJBQXFCLEVBQUUsQ0FBQztBQUMxQixDQUFDOzs7Ozs7QUFNRCxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLGdCQUFnQixDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUMzQyxDQUFDOzs7O0FBRUQsTUFBTSxVQUFVLFlBQVk7SUFDMUIsT0FBTyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztBQUMzQyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxTQUFpQztJQUN4RSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7QUFDaEQsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSwwQkFBMEI7SUFDeEMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsQ0FBQzs7OztBQUVELE1BQU0sVUFBVSx3QkFBd0I7SUFDdEMsT0FBTyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztBQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0eWxlU2FuaXRpemVGbn0gZnJvbSAnLi4vc2FuaXRpemF0aW9uL3N0eWxlX3Nhbml0aXplcic7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbmltcG9ydCB7YXNzZXJ0TFZpZXdPclVuZGVmaW5lZH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtDb21wb25lbnREZWYsIERpcmVjdGl2ZURlZn0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtURWxlbWVudE5vZGUsIFROb2RlLCBUVmlld05vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7Q09OVEVYVCwgREVDTEFSQVRJT05fVklFVywgTFZpZXcsIE9wYXF1ZVZpZXdTdGF0ZX0gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG4vKipcbiAqIEFsbCBpbXBsaWNpdCBpbnN0cnVjdGlvbiBzdGF0ZSBpcyBzdG9yZWQgaGVyZS5cbiAqXG4gKiBJdCBpcyB1c2VmdWwgdG8gaGF2ZSBhIHNpbmdsZSBvYmplY3Qgd2hlcmUgYWxsIG9mIHRoZSBzdGF0ZSBpcyBzdG9yZWQgYXMgYSBtZW50YWwgbW9kZWxcbiAqIChyYXRoZXIgaXQgYmVpbmcgc3ByZWFkIGFjcm9zcyBtYW55IGRpZmZlcmVudCB2YXJpYWJsZXMuKVxuICpcbiAqIFBFUkYgTk9URTogVHVybnMgb3V0IHRoYXQgd3JpdGluZyB0byBhIHRydWUgZ2xvYmFsIHZhcmlhYmxlIGlzIHNsb3dlciB0aGFuXG4gKiBoYXZpbmcgYW4gaW50ZXJtZWRpYXRlIG9iamVjdCB3aXRoIHByb3BlcnRpZXMuXG4gKi9cbmludGVyZmFjZSBJbnN0cnVjdGlvblN0YXRlIHtcbiAgLyoqXG4gICAqIFN0YXRlIG9mIHRoZSBjdXJyZW50IHZpZXcgYmVpbmcgcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBBbiBhcnJheSBvZiBub2RlcyAodGV4dCwgZWxlbWVudCwgY29udGFpbmVyLCBldGMpLCBwaXBlcywgdGhlaXIgYmluZGluZ3MsIGFuZFxuICAgKiBhbnkgbG9jYWwgdmFyaWFibGVzIHRoYXQgbmVlZCB0byBiZSBzdG9yZWQgYmV0d2VlbiBpbnZvY2F0aW9ucy5cbiAgICovXG4gIGxWaWV3OiBMVmlldztcblxuICAvKipcbiAgICogVXNlZCB0byBzZXQgdGhlIHBhcmVudCBwcm9wZXJ0eSB3aGVuIG5vZGVzIGFyZSBjcmVhdGVkIGFuZCB0cmFjayBxdWVyeSByZXN1bHRzLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWQgaW4gY29uamVjdGlvbiB3aXRoIGBpc1BhcmVudGAuXG4gICAqL1xuICBwcmV2aW91c09yUGFyZW50VE5vZGU6IFROb2RlO1xuXG4gIC8qKlxuICAgKiBJZiBgaXNQYXJlbnRgIGlzOlxuICAgKiAgLSBgdHJ1ZWA6IHRoZW4gYHByZXZpb3VzT3JQYXJlbnRUTm9kZWAgcG9pbnRzIHRvIGEgcGFyZW50IG5vZGUuXG4gICAqICAtIGBmYWxzZWA6IHRoZW4gYHByZXZpb3VzT3JQYXJlbnRUTm9kZWAgcG9pbnRzIHRvIHByZXZpb3VzIG5vZGUgKHNpYmxpbmcpLlxuICAgKi9cbiAgaXNQYXJlbnQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IGluIExWaWV3LlxuICAgKlxuICAgKiBVc2VkIGJ5IGJpbmRpbmcgaW5zdHJ1Y3Rpb25zLiBVcGRhdGVkIGFzIHBhcnQgb2YgYWR2YW5jZSBpbnN0cnVjdGlvbi5cbiAgICovXG4gIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGxhc3Qgdmlld0RhdGEgcmV0cmlldmVkIGJ5IG5leHRDb250ZXh0KCkuXG4gICAqIEFsbG93cyBidWlsZGluZyBuZXh0Q29udGV4dCgpIGFuZCByZWZlcmVuY2UoKSBjYWxscy5cbiAgICpcbiAgICogZS5nLiBjb25zdCBpbm5lciA9IHgoKS4kaW1wbGljaXQ7IGNvbnN0IG91dGVyID0geCgpLiRpbXBsaWNpdDtcbiAgICovXG4gIGNvbnRleHRMVmlldzogTFZpZXc7XG5cbiAgLyoqXG4gICAqIEluIHRoaXMgbW9kZSwgYW55IGNoYW5nZXMgaW4gYmluZGluZ3Mgd2lsbCB0aHJvdyBhbiBFeHByZXNzaW9uQ2hhbmdlZEFmdGVyQ2hlY2tlZCBlcnJvci5cbiAgICpcbiAgICogTmVjZXNzYXJ5IHRvIHN1cHBvcnQgQ2hhbmdlRGV0ZWN0b3JSZWYuY2hlY2tOb0NoYW5nZXMoKS5cbiAgICovXG4gIGNoZWNrTm9DaGFuZ2VzTW9kZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogU3RvcmUgdGhlIGVsZW1lbnQgZGVwdGggY291bnQuIFRoaXMgaXMgdXNlZCB0byBpZGVudGlmeSB0aGUgcm9vdCBlbGVtZW50cyBvZiB0aGUgdGVtcGxhdGVcbiAgICogc28gdGhhdCB3ZSBjYW4gdGhlbiBhdHRhY2ggYExWaWV3YCB0byBvbmx5IHRob3NlIGVsZW1lbnRzLlxuICAgKi9cbiAgZWxlbWVudERlcHRoQ291bnQ6IG51bWJlcjtcblxuICAvKipcbiAgICogU3RvcmVzIHdoZXRoZXIgZGlyZWN0aXZlcyBzaG91bGQgYmUgbWF0Y2hlZCB0byBlbGVtZW50cy5cbiAgICpcbiAgICogV2hlbiB0ZW1wbGF0ZSBjb250YWlucyBgbmdOb25CaW5kYWJsZWAgdGhlbiB3ZSBuZWVkIHRvIHByZXZlbnQgdGhlIHJ1bnRpbWUgZm9ybSBtYXRjaGluZ1xuICAgKiBkaXJlY3RpdmVzIG9uIGNoaWxkcmVuIG9mIHRoYXQgZWxlbWVudC5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIDxteS1jb21wIG15LWRpcmVjdGl2ZT5cbiAgICogICBTaG91bGQgbWF0Y2ggY29tcG9uZW50IC8gZGlyZWN0aXZlLlxuICAgKiA8L215LWNvbXA+XG4gICAqIDxkaXYgbmdOb25CaW5kYWJsZT5cbiAgICogICA8bXktY29tcCBteS1kaXJlY3RpdmU+XG4gICAqICAgICBTaG91bGQgbm90IG1hdGNoIGNvbXBvbmVudCAvIGRpcmVjdGl2ZSBiZWNhdXNlIHdlIGFyZSBpbiBuZ05vbkJpbmRhYmxlLlxuICAgKiAgIDwvbXktY29tcD5cbiAgICogPC9kaXY+XG4gICAqIGBgYFxuICAgKi9cbiAgYmluZGluZ3NFbmFibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IG5hbWVzcGFjZSB0byBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgZWxlbWVudHNcbiAgICovXG4gIGN1cnJlbnROYW1lc3BhY2U6IHN0cmluZ3xudWxsO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IHNhbml0aXplclxuICAgKi9cbiAgY3VycmVudFNhbml0aXplcjogU3R5bGVTYW5pdGl6ZUZufG51bGw7XG5cblxuICAvKipcbiAgICogVXNlZCB3aGVuIHByb2Nlc3NpbmcgaG9zdCBiaW5kaW5ncy5cbiAgICovXG4gIGN1cnJlbnREaXJlY3RpdmVEZWY6IERpcmVjdGl2ZURlZjxhbnk+fENvbXBvbmVudERlZjxhbnk+fG51bGw7XG5cbiAgLyoqXG4gICAqIFVzZWQgYXMgdGhlIHN0YXJ0aW5nIGRpcmVjdGl2ZSBpZCB2YWx1ZS5cbiAgICpcbiAgICogQWxsIHN1YnNlcXVlbnQgZGlyZWN0aXZlcyBhcmUgaW5jcmVtZW50ZWQgZnJvbSB0aGlzIHZhbHVlIG9ud2FyZHMuXG4gICAqIFRoZSByZWFzb24gd2h5IHRoaXMgdmFsdWUgaXMgYDFgIGluc3RlYWQgb2YgYDBgIGlzIGJlY2F1c2UgdGhlIGAwYFxuICAgKiB2YWx1ZSBpcyByZXNlcnZlZCBmb3IgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgYWN0aXZlRGlyZWN0aXZlSWQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHJvb3QgaW5kZXggZnJvbSB3aGljaCBwdXJlIGZ1bmN0aW9uIGluc3RydWN0aW9ucyBzaG91bGQgY2FsY3VsYXRlIHRoZWlyIGJpbmRpbmdcbiAgICogaW5kaWNlcy4gSW4gY29tcG9uZW50IHZpZXdzLCB0aGlzIGlzIFRWaWV3LmJpbmRpbmdTdGFydEluZGV4LiBJbiBhIGhvc3QgYmluZGluZ1xuICAgKiBjb250ZXh0LCB0aGlzIGlzIHRoZSBUVmlldy5leHBhbmRvU3RhcnRJbmRleCArIGFueSBkaXJzL2hvc3RWYXJzIGJlZm9yZSB0aGUgZ2l2ZW4gZGlyLlxuICAgKi9cbiAgYmluZGluZ1Jvb3RJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IGluZGV4IG9mIGEgVmlldyBvciBDb250ZW50IFF1ZXJ5IHdoaWNoIG5lZWRzIHRvIGJlIHByb2Nlc3NlZCBuZXh0LlxuICAgKiBXZSBpdGVyYXRlIG92ZXIgdGhlIGxpc3Qgb2YgUXVlcmllcyBhbmQgaW5jcmVtZW50IGN1cnJlbnQgcXVlcnkgaW5kZXggYXQgZXZlcnkgc3RlcC5cbiAgICovXG4gIGN1cnJlbnRRdWVyeUluZGV4OiBudW1iZXI7XG5cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZXhpdGVkLlxuICAgKlxuICAgKiBOT1RFOiBUaGUgZnVuY3Rpb24gaXMgaGVyZSBmb3IgdHJlZSBzaGFrYWJsZSBwdXJwb3NlcyBzaW5jZSBpdCBpcyBvbmx5IG5lZWRlZCBieSBzdHlsaW5nLlxuICAgKi9cbiAgZWxlbWVudEV4aXRGbjogKCgpID0+IHZvaWQpfG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBpbnN0cnVjdGlvblN0YXRlOiBJbnN0cnVjdGlvblN0YXRlID0ge1xuICBwcmV2aW91c09yUGFyZW50VE5vZGU6IG51bGwgISxcbiAgaXNQYXJlbnQ6IG51bGwgISxcbiAgbFZpZXc6IG51bGwgISxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby10b3BsZXZlbC1wcm9wZXJ0eS1hY2Nlc3NcbiAgc2VsZWN0ZWRJbmRleDogLTEgPDwgQWN0aXZlRWxlbWVudEZsYWdzLlNpemUsXG4gIGNvbnRleHRMVmlldzogbnVsbCAhLFxuICBjaGVja05vQ2hhbmdlc01vZGU6IGZhbHNlLFxuICBlbGVtZW50RGVwdGhDb3VudDogMCxcbiAgYmluZGluZ3NFbmFibGVkOiB0cnVlLFxuICBjdXJyZW50TmFtZXNwYWNlOiBudWxsLFxuICBjdXJyZW50U2FuaXRpemVyOiBudWxsLFxuICBjdXJyZW50RGlyZWN0aXZlRGVmOiBudWxsLFxuICBhY3RpdmVEaXJlY3RpdmVJZDogMCxcbiAgYmluZGluZ1Jvb3RJbmRleDogLTEsXG4gIGN1cnJlbnRRdWVyeUluZGV4OiAwLFxuICBlbGVtZW50RXhpdEZuOiBudWxsLFxufTtcblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudERlcHRoQ291bnQoKSB7XG4gIC8vIHRvcCBsZXZlbCB2YXJpYWJsZXMgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoUEVSRl9OT1RFUy5tZClcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuZWxlbWVudERlcHRoQ291bnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmNyZWFzZUVsZW1lbnREZXB0aENvdW50KCkge1xuICBpbnN0cnVjdGlvblN0YXRlLmVsZW1lbnREZXB0aENvdW50Kys7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNyZWFzZUVsZW1lbnREZXB0aENvdW50KCkge1xuICBpbnN0cnVjdGlvblN0YXRlLmVsZW1lbnREZXB0aENvdW50LS07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50RGlyZWN0aXZlRGVmKCk6IERpcmVjdGl2ZURlZjxhbnk+fENvbXBvbmVudERlZjxhbnk+fG51bGwge1xuICAvLyB0b3AgbGV2ZWwgdmFyaWFibGVzIHNob3VsZCBub3QgYmUgZXhwb3J0ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgKFBFUkZfTk9URVMubWQpXG4gIHJldHVybiBpbnN0cnVjdGlvblN0YXRlLmN1cnJlbnREaXJlY3RpdmVEZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50RGlyZWN0aXZlRGVmKGRlZjogRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+fCBudWxsKTogdm9pZCB7XG4gIGluc3RydWN0aW9uU3RhdGUuY3VycmVudERpcmVjdGl2ZURlZiA9IGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJpbmRpbmdzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgLy8gdG9wIGxldmVsIHZhcmlhYmxlcyBzaG91bGQgbm90IGJlIGV4cG9ydGVkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIChQRVJGX05PVEVTLm1kKVxuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5iaW5kaW5nc0VuYWJsZWQ7XG59XG5cblxuLyoqXG4gKiBFbmFibGVzIGRpcmVjdGl2ZSBtYXRjaGluZyBvbiBlbGVtZW50cy5cbiAqXG4gKiAgKiBFeGFtcGxlOlxuICogYGBgXG4gKiA8bXktY29tcCBteS1kaXJlY3RpdmU+XG4gKiAgIFNob3VsZCBtYXRjaCBjb21wb25lbnQgLyBkaXJlY3RpdmUuXG4gKiA8L215LWNvbXA+XG4gKiA8ZGl2IG5nTm9uQmluZGFibGU+XG4gKiAgIDwhLS0gybXJtWRpc2FibGVCaW5kaW5ncygpIC0tPlxuICogICA8bXktY29tcCBteS1kaXJlY3RpdmU+XG4gKiAgICAgU2hvdWxkIG5vdCBtYXRjaCBjb21wb25lbnQgLyBkaXJlY3RpdmUgYmVjYXVzZSB3ZSBhcmUgaW4gbmdOb25CaW5kYWJsZS5cbiAqICAgPC9teS1jb21wPlxuICogICA8IS0tIMm1ybVlbmFibGVCaW5kaW5ncygpIC0tPlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWVuYWJsZUJpbmRpbmdzKCk6IHZvaWQge1xuICBpbnN0cnVjdGlvblN0YXRlLmJpbmRpbmdzRW5hYmxlZCA9IHRydWU7XG59XG5cbi8qKlxuICogRGlzYWJsZXMgZGlyZWN0aXZlIG1hdGNoaW5nIG9uIGVsZW1lbnQuXG4gKlxuICogICogRXhhbXBsZTpcbiAqIGBgYFxuICogPG15LWNvbXAgbXktZGlyZWN0aXZlPlxuICogICBTaG91bGQgbWF0Y2ggY29tcG9uZW50IC8gZGlyZWN0aXZlLlxuICogPC9teS1jb21wPlxuICogPGRpdiBuZ05vbkJpbmRhYmxlPlxuICogICA8IS0tIMm1ybVkaXNhYmxlQmluZGluZ3MoKSAtLT5cbiAqICAgPG15LWNvbXAgbXktZGlyZWN0aXZlPlxuICogICAgIFNob3VsZCBub3QgbWF0Y2ggY29tcG9uZW50IC8gZGlyZWN0aXZlIGJlY2F1c2Ugd2UgYXJlIGluIG5nTm9uQmluZGFibGUuXG4gKiAgIDwvbXktY29tcD5cbiAqICAgPCEtLSDJtcm1ZW5hYmxlQmluZGluZ3MoKSAtLT5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVkaXNhYmxlQmluZGluZ3MoKTogdm9pZCB7XG4gIGluc3RydWN0aW9uU3RhdGUuYmluZGluZ3NFbmFibGVkID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMVmlldygpOiBMVmlldyB7XG4gIHJldHVybiBpbnN0cnVjdGlvblN0YXRlLmxWaWV3O1xufVxuXG4vKipcbiAqIEZsYWdzIHVzZWQgZm9yIGFuIGFjdGl2ZSBlbGVtZW50IGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uLlxuICpcbiAqIFRoZXNlIGZsYWdzIGFyZSB1c2VkIHdpdGhpbiBvdGhlciBpbnN0cnVjdGlvbnMgdG8gaW5mb3JtIGNsZWFudXAgb3JcbiAqIGV4aXQgb3BlcmF0aW9ucyB0byBydW4gd2hlbiBhbiBlbGVtZW50IGlzIGJlaW5nIHByb2Nlc3NlZC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlc2UgZmxhZ3MgYXJlIHJlc2V0IGVhY2ggdGltZSBhbiBlbGVtZW50IGNoYW5nZXMgKHdoZXRoZXIgaXRcbiAqIGhhcHBlbnMgd2hlbiBgYWR2YW5jZSgpYCBpcyBydW4gb3Igd2hlbiBjaGFuZ2UgZGV0ZWN0aW9uIGV4aXRzIG91dCBvZiBhIHRlbXBsYXRlXG4gKiBmdW5jdGlvbiBvciB3aGVuIGFsbCBob3N0IGJpbmRpbmdzIGFyZSBwcm9jZXNzZWQgZm9yIGFuIGVsZW1lbnQpLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBBY3RpdmVFbGVtZW50RmxhZ3Mge1xuICBJbml0aWFsID0gMGIwMCxcbiAgUnVuRXhpdEZuID0gMGIwMSxcbiAgU2l6ZSA9IDEsXG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhIGZsYWcgaXMgY3VycmVudGx5IHNldCBmb3IgdGhlIGFjdGl2ZSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzQWN0aXZlRWxlbWVudEZsYWcoZmxhZzogQWN0aXZlRWxlbWVudEZsYWdzKSB7XG4gIHJldHVybiAoaW5zdHJ1Y3Rpb25TdGF0ZS5zZWxlY3RlZEluZGV4ICYgZmxhZykgPT09IGZsYWc7XG59XG5cbi8qKlxuICogU2V0cyBhIGZsYWcgaXMgZm9yIHRoZSBhY3RpdmUgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZUVsZW1lbnRGbGFnKGZsYWc6IEFjdGl2ZUVsZW1lbnRGbGFncykge1xuICBpbnN0cnVjdGlvblN0YXRlLnNlbGVjdGVkSW5kZXggfD0gZmxhZztcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBhY3RpdmUgZGlyZWN0aXZlIGhvc3QgZWxlbWVudCBhbmQgcmVzZXRzIHRoZSBkaXJlY3RpdmUgaWQgdmFsdWVcbiAqICh3aGVuIHRoZSBwcm92aWRlZCBlbGVtZW50SW5kZXggdmFsdWUgaGFzIGNoYW5nZWQpLlxuICpcbiAqIEBwYXJhbSBlbGVtZW50SW5kZXggdGhlIGVsZW1lbnQgaW5kZXggdmFsdWUgZm9yIHRoZSBob3N0IGVsZW1lbnQgd2hlcmVcbiAqICAgICAgICAgICAgICAgICAgICAgdGhlIGRpcmVjdGl2ZS9jb21wb25lbnQgaW5zdGFuY2UgbGl2ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZUhvc3RFbGVtZW50KGVsZW1lbnRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGwpIHtcbiAgaWYgKGdldFNlbGVjdGVkSW5kZXgoKSAhPT0gZWxlbWVudEluZGV4KSB7XG4gICAgaWYgKGhhc0FjdGl2ZUVsZW1lbnRGbGFnKEFjdGl2ZUVsZW1lbnRGbGFncy5SdW5FeGl0Rm4pKSB7XG4gICAgICBleGVjdXRlRWxlbWVudEV4aXRGbigpO1xuICAgIH1cbiAgICBzZXRTZWxlY3RlZEluZGV4KGVsZW1lbnRJbmRleCA9PT0gbnVsbCA/IC0xIDogZWxlbWVudEluZGV4KTtcbiAgICBpbnN0cnVjdGlvblN0YXRlLmFjdGl2ZURpcmVjdGl2ZUlkID0gMDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUVsZW1lbnRFeGl0Rm4oKSB7XG4gIGluc3RydWN0aW9uU3RhdGUuZWxlbWVudEV4aXRGbiAhKCk7XG4gIC8vIFRPRE8gKG1hdHNrb3xtaXNrbyk6IHJlbW92ZSB0aGlzIHVuYXNzaWdubWVudCBvbmNlIHRoZSBzdGF0ZSBtYW5hZ2VtZW50IG9mXG4gIC8vICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbCB2YXJpYWJsZXMgYXJlIGJldHRlciBtYW5hZ2VkLlxuICBpbnN0cnVjdGlvblN0YXRlLnNlbGVjdGVkSW5kZXggJj0gfkFjdGl2ZUVsZW1lbnRGbGFncy5SdW5FeGl0Rm47XG59XG5cbi8qKlxuICogUXVldWVzIGEgZnVuY3Rpb24gdG8gYmUgcnVuIG9uY2UgdGhlIGVsZW1lbnQgaXMgXCJleGl0ZWRcIiBpbiBDRC5cbiAqXG4gKiBDaGFuZ2UgZGV0ZWN0aW9uIHdpbGwgZm9jdXMgb24gYW4gZWxlbWVudCBlaXRoZXIgd2hlbiB0aGUgYGFkdmFuY2UoKWBcbiAqIGluc3RydWN0aW9uIGlzIGNhbGxlZCBvciB3aGVuIHRoZSB0ZW1wbGF0ZSBvciBob3N0IGJpbmRpbmdzIGluc3RydWN0aW9uXG4gKiBjb2RlIGlzIGludm9rZWQuIFRoZSBlbGVtZW50IGlzIHRoZW4gXCJleGl0ZWRcIiB3aGVuIHRoZSBuZXh0IGVsZW1lbnQgaXNcbiAqIHNlbGVjdGVkIG9yIHdoZW4gY2hhbmdlIGRldGVjdGlvbiBmb3IgdGhlIHRlbXBsYXRlIG9yIGhvc3QgYmluZGluZ3MgaXNcbiAqIGNvbXBsZXRlLiBXaGVuIHRoaXMgb2NjdXJzICh0aGUgZWxlbWVudCBjaGFuZ2Ugb3BlcmF0aW9uKSB0aGVuIGFuIGV4aXRcbiAqIGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCBpZiBpdCBoYXMgYmVlbiBzZXQuIFRoaXMgZnVuY3Rpb24gY2FuIGJlIHVzZWRcbiAqIHRvIGFzc2lnbiB0aGF0IGV4aXQgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRFbGVtZW50RXhpdEZuKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gIHNldEFjdGl2ZUVsZW1lbnRGbGFnKEFjdGl2ZUVsZW1lbnRGbGFncy5SdW5FeGl0Rm4pO1xuICBpZiAoaW5zdHJ1Y3Rpb25TdGF0ZS5lbGVtZW50RXhpdEZuID09IG51bGwpIHtcbiAgICBpbnN0cnVjdGlvblN0YXRlLmVsZW1lbnRFeGl0Rm4gPSBmbjtcbiAgfVxuICBuZ0Rldk1vZGUgJiZcbiAgICAgIGFzc2VydEVxdWFsKGluc3RydWN0aW9uU3RhdGUuZWxlbWVudEV4aXRGbiwgZm4sICdFeHBlY3RpbmcgdG8gYWx3YXlzIGdldCB0aGUgc2FtZSBmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgaWQgdmFsdWUgb2YgdGhlIGN1cnJlbnQgZGlyZWN0aXZlLlxuICpcbiAqIEZvciBleGFtcGxlIHdlIGhhdmUgYW4gZWxlbWVudCB0aGF0IGhhcyB0d28gZGlyZWN0aXZlcyBvbiBpdDpcbiAqIDxkaXYgZGlyLW9uZSBkaXItdHdvPjwvZGl2PlxuICpcbiAqIGRpck9uZS0+aG9zdEJpbmRpbmdzKCkgKGlkID09IDEpXG4gKiBkaXJUd28tPmhvc3RCaW5kaW5ncygpIChpZCA9PSAyKVxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGlzIG9ubHkgYWN0aXZlIHdoZW4gYGhvc3RCaW5kaW5nYCBmdW5jdGlvbnMgYXJlIGJlaW5nIHByb2Nlc3NlZC5cbiAqXG4gKiBOb3RlIHRoYXQgZGlyZWN0aXZlIGlkIHZhbHVlcyBhcmUgc3BlY2lmaWMgdG8gYW4gZWxlbWVudCAodGhpcyBtZWFucyB0aGF0XG4gKiB0aGUgc2FtZSBpZCB2YWx1ZSBjb3VsZCBiZSBwcmVzZW50IG9uIGFub3RoZXIgZWxlbWVudCB3aXRoIGEgY29tcGxldGVseVxuICogZGlmZmVyZW50IHNldCBvZiBkaXJlY3RpdmVzKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2ZURpcmVjdGl2ZUlkKCkge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5hY3RpdmVEaXJlY3RpdmVJZDtcbn1cblxuLyoqXG4gKiBJbmNyZW1lbnRzIHRoZSBjdXJyZW50IGRpcmVjdGl2ZSBpZCB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZSB3ZSBoYXZlIGFuIGVsZW1lbnQgdGhhdCBoYXMgdHdvIGRpcmVjdGl2ZXMgb24gaXQ6XG4gKiA8ZGl2IGRpci1vbmUgZGlyLXR3bz48L2Rpdj5cbiAqXG4gKiBkaXJPbmUtPmhvc3RCaW5kaW5ncygpIChpbmRleCA9IDEpXG4gKiAvLyBpbmNyZW1lbnRcbiAqIGRpclR3by0+aG9zdEJpbmRpbmdzKCkgKGluZGV4ID0gMilcbiAqXG4gKiBEZXBlbmRpbmcgb24gd2hldGhlciBvciBub3QgYSBwcmV2aW91cyBkaXJlY3RpdmUgaGFkIGFueSBpbmhlcml0ZWRcbiAqIGRpcmVjdGl2ZXMgcHJlc2VudCwgdGhhdCB2YWx1ZSB3aWxsIGJlIGluY3JlbWVudGVkIGluIGFkZGl0aW9uXG4gKiB0byB0aGUgaWQganVtcGluZyB1cCBieSBvbmUuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgaXMgb25seSBhY3RpdmUgd2hlbiBgaG9zdEJpbmRpbmdgIGZ1bmN0aW9ucyBhcmUgYmVpbmcgcHJvY2Vzc2VkLlxuICpcbiAqIE5vdGUgdGhhdCBkaXJlY3RpdmUgaWQgdmFsdWVzIGFyZSBzcGVjaWZpYyB0byBhbiBlbGVtZW50ICh0aGlzIG1lYW5zIHRoYXRcbiAqIHRoZSBzYW1lIGlkIHZhbHVlIGNvdWxkIGJlIHByZXNlbnQgb24gYW5vdGhlciBlbGVtZW50IHdpdGggYSBjb21wbGV0ZWx5XG4gKiBkaWZmZXJlbnQgc2V0IG9mIGRpcmVjdGl2ZXMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5jcmVtZW50QWN0aXZlRGlyZWN0aXZlSWQoKSB7XG4gIC8vIEVhY2ggZGlyZWN0aXZlIGdldHMgYSB1bmlxdWVJZCB2YWx1ZSB0aGF0IGlzIHRoZSBzYW1lIGZvciBib3RoXG4gIC8vIGNyZWF0ZSBhbmQgdXBkYXRlIGNhbGxzIHdoZW4gdGhlIGhvc3RCaW5kaW5ncyBmdW5jdGlvbiBpcyBjYWxsZWQuIFRoZVxuICAvLyBkaXJlY3RpdmUgdW5pcXVlSWQgaXMgbm90IHNldCBhbnl3aGVyZS0taXQgaXMganVzdCBpbmNyZW1lbnRlZCBiZXR3ZWVuXG4gIC8vIGVhY2ggaG9zdEJpbmRpbmdzIGNhbGwgYW5kIGlzIHVzZWZ1bCBmb3IgaGVscGluZyBpbnN0cnVjdGlvbiBjb2RlXG4gIC8vIHVuaXF1ZWx5IGRldGVybWluZSB3aGljaCBkaXJlY3RpdmUgaXMgY3VycmVudGx5IGFjdGl2ZSB3aGVuIGV4ZWN1dGVkLlxuICBpbnN0cnVjdGlvblN0YXRlLmFjdGl2ZURpcmVjdGl2ZUlkICs9IDE7XG59XG5cbi8qKlxuICogUmVzdG9yZXMgYGNvbnRleHRWaWV3RGF0YWAgdG8gdGhlIGdpdmVuIE9wYXF1ZVZpZXdTdGF0ZSBpbnN0YW5jZS5cbiAqXG4gKiBVc2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGdldEN1cnJlbnRWaWV3KCkgaW5zdHJ1Y3Rpb24gdG8gc2F2ZSBhIHNuYXBzaG90XG4gKiBvZiB0aGUgY3VycmVudCB2aWV3IGFuZCByZXN0b3JlIGl0IHdoZW4gbGlzdGVuZXJzIGFyZSBpbnZva2VkLiBUaGlzIGFsbG93c1xuICogd2Fsa2luZyB0aGUgZGVjbGFyYXRpb24gdmlldyB0cmVlIGluIGxpc3RlbmVycyB0byBnZXQgdmFycyBmcm9tIHBhcmVudCB2aWV3cy5cbiAqXG4gKiBAcGFyYW0gdmlld1RvUmVzdG9yZSBUaGUgT3BhcXVlVmlld1N0YXRlIGluc3RhbmNlIHRvIHJlc3RvcmUuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVyZXN0b3JlVmlldyh2aWV3VG9SZXN0b3JlOiBPcGFxdWVWaWV3U3RhdGUpIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5jb250ZXh0TFZpZXcgPSB2aWV3VG9SZXN0b3JlIGFzIGFueSBhcyBMVmlldztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpOiBUTm9kZSB7XG4gIC8vIHRvcCBsZXZlbCB2YXJpYWJsZXMgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoUEVSRl9OT1RFUy5tZClcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUucHJldmlvdXNPclBhcmVudFROb2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UHJldmlvdXNPclBhcmVudFROb2RlKHROb2RlOiBUTm9kZSwgX2lzUGFyZW50OiBib29sZWFuKSB7XG4gIGluc3RydWN0aW9uU3RhdGUucHJldmlvdXNPclBhcmVudFROb2RlID0gdE5vZGU7XG4gIGluc3RydWN0aW9uU3RhdGUuaXNQYXJlbnQgPSBfaXNQYXJlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRUTm9kZUFuZFZpZXdEYXRhKHROb2RlOiBUTm9kZSwgdmlldzogTFZpZXcpIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydExWaWV3T3JVbmRlZmluZWQodmlldyk7XG4gIGluc3RydWN0aW9uU3RhdGUucHJldmlvdXNPclBhcmVudFROb2RlID0gdE5vZGU7XG4gIGluc3RydWN0aW9uU3RhdGUubFZpZXcgPSB2aWV3O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SXNQYXJlbnQoKTogYm9vbGVhbiB7XG4gIC8vIHRvcCBsZXZlbCB2YXJpYWJsZXMgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoUEVSRl9OT1RFUy5tZClcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuaXNQYXJlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRJc05vdFBhcmVudCgpOiB2b2lkIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5pc1BhcmVudCA9IGZhbHNlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldElzUGFyZW50KCk6IHZvaWQge1xuICBpbnN0cnVjdGlvblN0YXRlLmlzUGFyZW50ID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRleHRMVmlldygpOiBMVmlldyB7XG4gIC8vIHRvcCBsZXZlbCB2YXJpYWJsZXMgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoUEVSRl9OT1RFUy5tZClcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuY29udGV4dExWaWV3O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hlY2tOb0NoYW5nZXNNb2RlKCk6IGJvb2xlYW4ge1xuICAvLyB0b3AgbGV2ZWwgdmFyaWFibGVzIHNob3VsZCBub3QgYmUgZXhwb3J0ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgKFBFUkZfTk9URVMubWQpXG4gIHJldHVybiBpbnN0cnVjdGlvblN0YXRlLmNoZWNrTm9DaGFuZ2VzTW9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENoZWNrTm9DaGFuZ2VzTW9kZShtb2RlOiBib29sZWFuKTogdm9pZCB7XG4gIGluc3RydWN0aW9uU3RhdGUuY2hlY2tOb0NoYW5nZXNNb2RlID0gbW9kZTtcbn1cblxuLy8gdG9wIGxldmVsIHZhcmlhYmxlcyBzaG91bGQgbm90IGJlIGV4cG9ydGVkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIChQRVJGX05PVEVTLm1kKVxuZXhwb3J0IGZ1bmN0aW9uIGdldEJpbmRpbmdSb290KCkge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5iaW5kaW5nUm9vdEluZGV4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0QmluZGluZ1Jvb3QodmFsdWU6IG51bWJlcikge1xuICBpbnN0cnVjdGlvblN0YXRlLmJpbmRpbmdSb290SW5kZXggPSB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRRdWVyeUluZGV4KCk6IG51bWJlciB7XG4gIC8vIHRvcCBsZXZlbCB2YXJpYWJsZXMgc2hvdWxkIG5vdCBiZSBleHBvcnRlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAoUEVSRl9OT1RFUy5tZClcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuY3VycmVudFF1ZXJ5SW5kZXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50UXVlcnlJbmRleCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gIGluc3RydWN0aW9uU3RhdGUuY3VycmVudFF1ZXJ5SW5kZXggPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBTd2FwIHRoZSBjdXJyZW50IGxWaWV3IHdpdGggYSBuZXcgbFZpZXcuXG4gKlxuICogRm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMgd2Ugc3RvcmUgdGhlIGxWaWV3IGluIHRoZSB0b3AgbGV2ZWwgb2YgdGhlIG1vZHVsZS5cbiAqIFRoaXMgd2F5IHdlIG1pbmltaXplIHRoZSBudW1iZXIgb2YgcHJvcGVydGllcyB0byByZWFkLiBXaGVuZXZlciBhIG5ldyB2aWV3XG4gKiBpcyBlbnRlcmVkIHdlIGhhdmUgdG8gc3RvcmUgdGhlIGxWaWV3IGZvciBsYXRlciwgYW5kIHdoZW4gdGhlIHZpZXcgaXNcbiAqIGV4aXRlZCB0aGUgc3RhdGUgaGFzIHRvIGJlIHJlc3RvcmVkXG4gKlxuICogQHBhcmFtIG5ld1ZpZXcgTmV3IGxWaWV3IHRvIGJlY29tZSBhY3RpdmVcbiAqIEBwYXJhbSBob3N0IEVsZW1lbnQgdG8gd2hpY2ggdGhlIFZpZXcgaXMgYSBjaGlsZCBvZlxuICogQHJldHVybnMgdGhlIHByZXZpb3VzbHkgYWN0aXZlIGxWaWV3O1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0VmlldyhuZXdWaWV3OiBMVmlldywgaG9zdFROb2RlOiBURWxlbWVudE5vZGUgfCBUVmlld05vZGUgfCBudWxsKTogTFZpZXcge1xuICBpZiAoaGFzQWN0aXZlRWxlbWVudEZsYWcoQWN0aXZlRWxlbWVudEZsYWdzLlJ1bkV4aXRGbikpIHtcbiAgICBleGVjdXRlRWxlbWVudEV4aXRGbigpO1xuICB9XG5cbiAgbmdEZXZNb2RlICYmIGFzc2VydExWaWV3T3JVbmRlZmluZWQobmV3Vmlldyk7XG4gIGNvbnN0IG9sZFZpZXcgPSBpbnN0cnVjdGlvblN0YXRlLmxWaWV3O1xuXG4gIGluc3RydWN0aW9uU3RhdGUucHJldmlvdXNPclBhcmVudFROb2RlID0gaG9zdFROb2RlICE7XG4gIGluc3RydWN0aW9uU3RhdGUuaXNQYXJlbnQgPSB0cnVlO1xuXG4gIGluc3RydWN0aW9uU3RhdGUubFZpZXcgPSBpbnN0cnVjdGlvblN0YXRlLmNvbnRleHRMVmlldyA9IG5ld1ZpZXc7XG4gIHJldHVybiBvbGRWaWV3O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV4dENvbnRleHRJbXBsPFQgPSBhbnk+KGxldmVsOiBudW1iZXIgPSAxKTogVCB7XG4gIGluc3RydWN0aW9uU3RhdGUuY29udGV4dExWaWV3ID0gd2Fsa1VwVmlld3MobGV2ZWwsIGluc3RydWN0aW9uU3RhdGUuY29udGV4dExWaWV3ICEpO1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5jb250ZXh0TFZpZXdbQ09OVEVYVF0gYXMgVDtcbn1cblxuZnVuY3Rpb24gd2Fsa1VwVmlld3MobmVzdGluZ0xldmVsOiBudW1iZXIsIGN1cnJlbnRWaWV3OiBMVmlldyk6IExWaWV3IHtcbiAgd2hpbGUgKG5lc3RpbmdMZXZlbCA+IDApIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWaWV3W0RFQ0xBUkFUSU9OX1ZJRVddLFxuICAgICAgICAgICAgICAgICAgICAgJ0RlY2xhcmF0aW9uIHZpZXcgc2hvdWxkIGJlIGRlZmluZWQgaWYgbmVzdGluZyBsZXZlbCBpcyBncmVhdGVyIHRoYW4gMC4nKTtcbiAgICBjdXJyZW50VmlldyA9IGN1cnJlbnRWaWV3W0RFQ0xBUkFUSU9OX1ZJRVddICE7XG4gICAgbmVzdGluZ0xldmVsLS07XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRWaWV3O1xufVxuXG4vKipcbiAqIFJlc2V0cyB0aGUgYXBwbGljYXRpb24gc3RhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldENvbXBvbmVudFN0YXRlKCkge1xuICBpbnN0cnVjdGlvblN0YXRlLmlzUGFyZW50ID0gZmFsc2U7XG4gIGluc3RydWN0aW9uU3RhdGUucHJldmlvdXNPclBhcmVudFROb2RlID0gbnVsbCAhO1xuICBpbnN0cnVjdGlvblN0YXRlLmVsZW1lbnREZXB0aENvdW50ID0gMDtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5iaW5kaW5nc0VuYWJsZWQgPSB0cnVlO1xuICBzZXRDdXJyZW50U3R5bGVTYW5pdGl6ZXIobnVsbCk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbW9zdCByZWNlbnQgaW5kZXggcGFzc2VkIHRvIHtAbGluayBzZWxlY3R9XG4gKlxuICogVXNlZCB3aXRoIHtAbGluayBwcm9wZXJ0eX0gaW5zdHJ1Y3Rpb24gKGFuZCBtb3JlIGluIHRoZSBmdXR1cmUpIHRvIGlkZW50aWZ5IHRoZSBpbmRleCBpbiB0aGVcbiAqIGN1cnJlbnQgYExWaWV3YCB0byBhY3Qgb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RlZEluZGV4KCkge1xuICByZXR1cm4gaW5zdHJ1Y3Rpb25TdGF0ZS5zZWxlY3RlZEluZGV4ID4+IEFjdGl2ZUVsZW1lbnRGbGFncy5TaXplO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1vc3QgcmVjZW50IGluZGV4IHBhc3NlZCB0byB7QGxpbmsgc2VsZWN0fVxuICpcbiAqIFVzZWQgd2l0aCB7QGxpbmsgcHJvcGVydHl9IGluc3RydWN0aW9uIChhbmQgbW9yZSBpbiB0aGUgZnV0dXJlKSB0byBpZGVudGlmeSB0aGUgaW5kZXggaW4gdGhlXG4gKiBjdXJyZW50IGBMVmlld2AgdG8gYWN0IG9uLlxuICpcbiAqIChOb3RlIHRoYXQgaWYgYW4gXCJleGl0IGZ1bmN0aW9uXCIgd2FzIHNldCBlYXJsaWVyICh2aWEgYHNldEVsZW1lbnRFeGl0Rm4oKWApIHRoZW4gdGhhdCB3aWxsIGJlXG4gKiBydW4gaWYgYW5kIHdoZW4gdGhlIHByb3ZpZGVkIGBpbmRleGAgdmFsdWUgaXMgZGlmZmVyZW50IGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0ZWQgaW5kZXggdmFsdWUuKVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0U2VsZWN0ZWRJbmRleChpbmRleDogbnVtYmVyKSB7XG4gIGluc3RydWN0aW9uU3RhdGUuc2VsZWN0ZWRJbmRleCA9IGluZGV4IDw8IEFjdGl2ZUVsZW1lbnRGbGFncy5TaXplO1xufVxuXG5cbi8qKlxuICogU2V0cyB0aGUgbmFtZXNwYWNlIHVzZWQgdG8gY3JlYXRlIGVsZW1lbnRzIHRvIGAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnYCBpbiBnbG9iYWwgc3RhdGUuXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVuYW1lc3BhY2VTVkcoKSB7XG4gIGluc3RydWN0aW9uU3RhdGUuY3VycmVudE5hbWVzcGFjZSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbmFtZXNwYWNlIHVzZWQgdG8gY3JlYXRlIGVsZW1lbnRzIHRvIGAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoTUwvJ2AgaW4gZ2xvYmFsIHN0YXRlLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmFtZXNwYWNlTWF0aE1MKCkge1xuICBpbnN0cnVjdGlvblN0YXRlLmN1cnJlbnROYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoTUwvJztcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBuYW1lc3BhY2UgdXNlZCB0byBjcmVhdGUgZWxlbWVudHMgdG8gYG51bGxgLCB3aGljaCBmb3JjZXMgZWxlbWVudCBjcmVhdGlvbiB0byB1c2VcbiAqIGBjcmVhdGVFbGVtZW50YCByYXRoZXIgdGhhbiBgY3JlYXRlRWxlbWVudE5TYC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtW5hbWVzcGFjZUhUTUwoKSB7XG4gIG5hbWVzcGFjZUhUTUxJbnRlcm5hbCgpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG5hbWVzcGFjZSB1c2VkIHRvIGNyZWF0ZSBlbGVtZW50cyB0byBgbnVsbGAsIHdoaWNoIGZvcmNlcyBlbGVtZW50IGNyZWF0aW9uIHRvIHVzZVxuICogYGNyZWF0ZUVsZW1lbnRgIHJhdGhlciB0aGFuIGBjcmVhdGVFbGVtZW50TlNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmFtZXNwYWNlSFRNTEludGVybmFsKCkge1xuICBpbnN0cnVjdGlvblN0YXRlLmN1cnJlbnROYW1lc3BhY2UgPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmFtZXNwYWNlKCk6IHN0cmluZ3xudWxsIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuY3VycmVudE5hbWVzcGFjZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRTdHlsZVNhbml0aXplcihzYW5pdGl6ZXI6IFN0eWxlU2FuaXRpemVGbiB8IG51bGwpIHtcbiAgaW5zdHJ1Y3Rpb25TdGF0ZS5jdXJyZW50U2FuaXRpemVyID0gc2FuaXRpemVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRDdXJyZW50U3R5bGVTYW5pdGl6ZXIoKSB7XG4gIHNldEN1cnJlbnRTdHlsZVNhbml0aXplcihudWxsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRTdHlsZVNhbml0aXplcigpIHtcbiAgcmV0dXJuIGluc3RydWN0aW9uU3RhdGUuY3VycmVudFNhbml0aXplcjtcbn1cbiJdfQ==