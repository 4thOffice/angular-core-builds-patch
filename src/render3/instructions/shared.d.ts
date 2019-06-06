/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector } from '../../di';
import { SchemaMetadata } from '../../metadata/schema';
import { Sanitizer } from '../../sanitization/security';
import { LContainer } from '../interfaces/container';
import { ComponentDef, ComponentTemplate, DirectiveDef, DirectiveDefListOrFactory, PipeDefListOrFactory, ViewQueriesFunction } from '../interfaces/definition';
import { LocalRefExtractor, PropertyAliasValue, PropertyAliases, TAttributes, TContainerNode, TElementContainerNode, TElementNode, TNode, TNodeType, TProjectionNode, TViewNode } from '../interfaces/node';
import { LQueries } from '../interfaces/query';
import { RComment, RElement, Renderer3, RendererFactory3 } from '../interfaces/renderer';
import { SanitizerFn } from '../interfaces/sanitization';
import { StylingContext } from '../interfaces/styling';
import { ExpandoInstructions, LView, LViewFlags, RootContext, RootContextFlags, TView } from '../interfaces/view';
export declare const enum BindingDirection {
    Input = 0,
    Output = 1
}
/**
 * Refreshes the view, executing the following steps in that order:
 * triggers init hooks, refreshes dynamic embedded views, triggers content hooks, sets host
 * bindings, refreshes child components.
 * Note: view hooks are triggered later when leaving the view.
 */
export declare function refreshDescendantViews(lView: LView): void;
/** Sets the host bindings for the current view. */
export declare function setHostBindings(tView: TView, viewData: LView): void;
/**
 * Creates a native element from a tag name, using a renderer.
 * @param name the tag name
 * @param overriddenRenderer Optional A renderer to override the default one
 * @returns the element created
 */
export declare function elementCreate(name: string, overriddenRenderer?: Renderer3): RElement;
export declare function createLView<T>(parentLView: LView | null, tView: TView, context: T | null, flags: LViewFlags, host: RElement | null, tHostNode: TViewNode | TElementNode | null, rendererFactory?: RendererFactory3 | null, renderer?: Renderer3 | null, sanitizer?: Sanitizer | null, injector?: Injector | null): LView;
/**
 * Create and stores the TNode, and hooks it up to the tree.
 *
 * @param tView The current `TView`.
 * @param tHostNode This is a hack and we should not have to pass this value in. It is only used to
 * determine if the parent belongs to a different tView. Instead we should not have parentTView
 * point to TView other the current one.
 * @param index The index at which the TNode should be saved (null if view, since they are not
 * saved).
 * @param type The type of TNode to create
 * @param native The native element for this node, if applicable
 * @param name The tag name of the associated native element, if applicable
 * @param attrs Any attrs for the native element, if applicable
 */
export declare function getOrCreateTNode(tView: TView, tHostNode: TNode | null, index: number, type: TNodeType.Element, name: string | null, attrs: TAttributes | null): TElementNode;
export declare function getOrCreateTNode(tView: TView, tHostNode: TNode | null, index: number, type: TNodeType.Container, name: string | null, attrs: TAttributes | null): TContainerNode;
export declare function getOrCreateTNode(tView: TView, tHostNode: TNode | null, index: number, type: TNodeType.Projection, name: null, attrs: TAttributes | null): TProjectionNode;
export declare function getOrCreateTNode(tView: TView, tHostNode: TNode | null, index: number, type: TNodeType.ElementContainer, name: string | null, attrs: TAttributes | null): TElementContainerNode;
export declare function getOrCreateTNode(tView: TView, tHostNode: TNode | null, index: number, type: TNodeType.IcuContainer, name: null, attrs: TAttributes | null): TElementContainerNode;
export declare function assignTViewNodeToLView(tView: TView, tParentNode: TNode | null, index: number, lView: LView): TViewNode;
/**
 * When elements are created dynamically after a view blueprint is created (e.g. through
 * i18nApply() or ComponentFactory.create), we need to adjust the blueprint for future
 * template passes.
 */
export declare function allocExpando(view: LView, numSlotsToAlloc: number): void;
/**
 * Used for creating the LViewNode of a dynamic embedded view,
 * either through ViewContainerRef.createEmbeddedView() or TemplateRef.createEmbeddedView().
 * Such lViewNode will then be renderer with renderEmbeddedTemplate() (see below).
 */
export declare function createEmbeddedViewAndNode<T>(tView: TView, context: T, declarationView: LView, queries: LQueries | null, injectorIndex: number): LView;
/**
 * Used for rendering embedded views (e.g. dynamically created views)
 *
 * Dynamically created views must store/retrieve their TViews differently from component views
 * because their template functions are nested in the template functions of their hosts, creating
 * closures. If their host template happens to be an embedded template in a loop (e.g. ngFor
 * inside
 * an ngFor), the nesting would mean we'd have multiple instances of the template function, so we
 * can't store TViews in the template function itself (as we do for comps). Instead, we store the
 * TView for dynamically created views on their host TNode, which only has one instance.
 */
export declare function renderEmbeddedTemplate<T>(viewToRender: LView, tView: TView, context: T): void;
export declare function renderComponentOrTemplate<T>(hostView: LView, context: T, templateFn?: ComponentTemplate<T>): void;
/**
 * Appropriately sets `stylingTemplate` on a TNode
 *
 * Does not apply styles to DOM nodes
 *
 * @param tNode The node whose `stylingTemplate` to set
 * @param attrs The attribute array source to set the attributes from
 * @param attrsStartIndex Optional start index to start processing the `attrs` from
 */
export declare function setNodeStylingTemplate(tView: TView, tNode: TNode, attrs: TAttributes, attrsStartIndex: number): void;
export declare function executeContentQueries(tView: TView, tNode: TNode, lView: LView): void;
/**
 * Creates directive instances and populates local refs.
 *
 * @param localRefs Local refs of the node in question
 * @param localRefExtractor mapping function that extracts local ref value from TNode
 */
export declare function createDirectivesAndLocals(tView: TView, lView: LView, localRefs: string[] | null | undefined, localRefExtractor?: LocalRefExtractor): void;
/**
 * Gets TView from a template function or creates a new TView
 * if it doesn't already exist.
 *
 * @param def ComponentDef
 * @returns TView
 */
export declare function getOrCreateTView(def: ComponentDef<any>): TView;
/**
 * Creates a TView instance
 *
 * @param viewIndex The viewBlockId for inline views, or -1 if it's a component/dynamic
 * @param templateFn Template function
 * @param consts The number of nodes, local refs, and pipes in this template
 * @param directives Registry of directives for this view
 * @param pipes Registry of pipes for this view
 * @param viewQuery View queries for this view
 * @param schemas Schemas for this view
 */
export declare function createTView(viewIndex: number, templateFn: ComponentTemplate<any> | null, consts: number, vars: number, directives: DirectiveDefListOrFactory | null, pipes: PipeDefListOrFactory | null, viewQuery: ViewQueriesFunction<any> | null, schemas: SchemaMetadata[] | null): TView;
export declare function createError(text: string, token: any): Error;
/**
 * Locates the host native element, used for bootstrapping existing nodes into rendering pipeline.
 *
 * @param elementOrSelector Render element or CSS selector to locate the element.
 */
export declare function locateHostElement(factory: RendererFactory3, elementOrSelector: RElement | string): RElement | null;
/**
 * Saves context for this cleanup function in LView.cleanupInstances.
 *
 * On the first template pass, saves in TView:
 * - Cleanup function
 * - Index of context we just saved in LView.cleanupInstances
 */
export declare function storeCleanupWithContext(lView: LView, context: any, cleanupFn: Function): void;
/**
 * Saves the cleanup function itself in LView.cleanupInstances.
 *
 * This is necessary for functions that are wrapped with their contexts, like in renderer2
 * listeners.
 *
 * On the first template pass, the index of the cleanup function is saved in TView.
 */
export declare function storeCleanupFn(view: LView, cleanupFn: Function): void;
/**
 * Tsickle has a bug where it creates an infinite loop for a function returning itself.
 * This is a temporary type that will be removed when the issue is resolved.
 * https://github.com/angular/tsickle/issues/1009)
 */
export declare type TsickleIssue1009 = any;
/**
 * Constructs a TNode object from the arguments.
 *
 * @param type The type of the node
 * @param adjustedIndex The index of the TNode in TView.data, adjusted for HEADER_OFFSET
 * @param tagName The tag name of the node
 * @param attrs The attributes defined on this node
 * @param tViews Any TViews attached to this node
 * @returns the TNode object
 */
export declare function createTNode(tParent: TElementNode | TContainerNode | null, type: TNodeType, adjustedIndex: number, tagName: string | null, attrs: TAttributes | null): TNode;
/**
 * Consolidates all inputs or outputs of all directives on this logical node.
 *
 * @param tNode
 * @param direction whether to consider inputs or outputs
 * @returns PropertyAliases|null aggregate of all properties if any, `null` otherwise
 */
export declare function generatePropertyAliases(tNode: TNode, direction: BindingDirection): PropertyAliases | null;
export declare function elementPropertyInternal<T>(index: number, propName: string, value: T, sanitizer?: SanitizerFn | null, nativeOnly?: boolean, loadRendererFn?: ((tNode: TNode, lView: LView) => Renderer3) | null): void;
export declare function setNgReflectProperty(lView: LView, element: RElement | RComment, type: TNodeType, attrName: string, value: any): void;
/**
 * Instantiate a root component.
 */
export declare function instantiateRootComponent<T>(tView: TView, viewData: LView, def: ComponentDef<T>): T;
export declare function invokeHostBindingsInCreationMode(def: DirectiveDef<any>, expando: ExpandoInstructions, directive: any, tNode: TNode, firstTemplatePass: boolean): void;
/**
* Generates a new block in TView.expandoInstructions for this node.
*
* Each expando block starts with the element index (turned negative so we can distinguish
* it from the hostVar count) and the directive count. See more in VIEW_DATA.md.
*/
export declare function generateExpandoInstructionBlock(tView: TView, tNode: TNode, directiveCount: number): void;
/** Stores index of component's host element so it will be queued for view refresh during CD. */
export declare function queueComponentIndexForCheck(previousOrParentTNode: TNode): void;
/**
 * Initializes the flags on the current node, setting all indices to the initial index,
 * the directive count to 0, and adding the isComponent flag.
 * @param index the initial index
 */
export declare function initNodeFlags(tNode: TNode, index: number, numberOfDirectives: number): void;
export declare function elementAttributeInternal(index: number, name: string, value: any, lView: LView, sanitizer?: SanitizerFn | null, namespace?: string): void;
/**
 * Creates a LContainer, either from a container instruction, or for a ViewContainerRef.
 *
 * @param hostNative The host element for the LContainer
 * @param hostTNode The host TNode for the LContainer
 * @param currentView The parent view of the LContainer
 * @param native The native comment element
 * @param isForViewContainerRef Optional a flag indicating the ViewContainerRef case
 * @returns LContainer
 */
export declare function createLContainer(hostNative: RElement | RComment | StylingContext | LView, currentView: LView, native: RComment, tNode: TNode, isForViewContainerRef?: boolean): LContainer;
/**
 * Refreshes components by entering the component view and processing its bindings, queries, etc.
 *
 * @param adjustedElementIndex  Element index in LView[] (adjusted for HEADER_OFFSET)
 */
export declare function componentRefresh(adjustedElementIndex: number): void;
/**
 * Adds LView or LContainer to the end of the current view tree.
 *
 * This structure will be used to traverse through nested views to remove listeners
 * and call onDestroy callbacks.
 *
 * @param lView The view where LView or LContainer should be added
 * @param adjustedHostIndex Index of the view's host node in LView[], adjusted for header
 * @param lViewOrLContainer The LView or LContainer to add to the view tree
 * @returns The state passed in
 */
export declare function addToViewTree<T extends LView | LContainer>(lView: LView, lViewOrLContainer: T): T;
/**
 * Marks current view and all ancestors dirty.
 *
 * Returns the root view because it is found as a byproduct of marking the view tree
 * dirty, and can be used by methods that consume markViewDirty() to easily schedule
 * change detection. Otherwise, such methods would need to traverse up the view tree
 * an additional time to get the root view and schedule a tick on it.
 *
 * @param lView The starting LView to mark dirty
 * @returns the root LView
 */
export declare function markViewDirty(lView: LView): LView | null;
/**
 * Used to schedule change detection on the whole application.
 *
 * Unlike `tick`, `scheduleTick` coalesces multiple calls into one change detection run.
 * It is usually called indirectly by calling `markDirty` when the view needs to be
 * re-rendered.
 *
 * Typically `scheduleTick` uses `requestAnimationFrame` to coalesce multiple
 * `scheduleTick` requests. The scheduling function can be overridden in
 * `renderComponent`'s `scheduler` option.
 */
export declare function scheduleTick(rootContext: RootContext, flags: RootContextFlags): void;
export declare function tickRootContext(rootContext: RootContext): void;
export declare function detectChangesInternal<T>(view: LView, context: T): void;
/**
 * Synchronously perform change detection on a root view and its components.
 *
 * @param lView The view which the change detection should be performed on.
 */
export declare function detectChangesInRootView(lView: LView): void;
/**
 * Checks the change detector and its children, and throws if any changes are detected.
 *
 * This is used in development mode to verify that running change detection doesn't
 * introduce other changes.
 */
export declare function checkNoChanges<T>(component: T): void;
export declare function checkNoChangesInternal<T>(view: LView, context: T): void;
/**
 * Checks the change detector on a root view and its components, and throws if any changes are
 * detected.
 *
 * This is used in development mode to verify that running change detection doesn't
 * introduce other changes.
 *
 * @param lView The view which the change detection should be checked on.
 */
export declare function checkNoChangesInRootView(lView: LView): void;
/** Checks the view of the component provided. Does not gate on dirty checks or execute doCheck.
 */
export declare function checkView<T>(hostView: LView, component: T): void;
/**
 * Creates binding metadata for a particular binding and stores it in
 * TView.data. These are generated in order to support DebugElement.properties.
 *
 * Each binding / interpolation will have one (including attribute bindings)
 * because at the time of binding, we don't know to which instruction the binding
 * belongs. It is always stored in TView.data at the index of the last binding
 * value in LView (e.g. for interpolation8, it would be stored at the index of
 * the 8th value).
 *
 * @param lView The LView that contains the current binding index.
 * @param prefix The static prefix string
 * @param suffix The static suffix string
 *
 * @returns Newly created binding metadata string for this binding or null
 */
export declare function storeBindingMetadata(lView: LView, prefix?: string, suffix?: string): string | null;
export declare const CLEAN_PROMISE: Promise<null>;
export declare function initializeTNodeInputs(tNode: TNode): PropertyAliases | null;
export declare function getCleanup(view: LView): any[];
/**
 * There are cases where the sub component's renderer needs to be included
 * instead of the current renderer (see the componentSyntheticHost* instructions).
 */
export declare function loadComponentRenderer(tNode: TNode, lView: LView): Renderer3;
/** Handles an error thrown in an LView. */
export declare function handleError(lView: LView, error: any): void;
/**
 * Set the inputs of directives at the current node to corresponding value.
 *
 * @param lView the `LView` which contains the directives.
 * @param inputs mapping between the public "input" name and privately-known,
 * possibly minified, property names to write to.
 * @param value Value to set.
 */
export declare function setInputsForProperty(lView: LView, inputs: PropertyAliasValue, value: any): void;
