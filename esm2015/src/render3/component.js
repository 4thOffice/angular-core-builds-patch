/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined, assertIndexInRange } from '../util/assert';
import { assertComponentType } from './assert';
import { getComponentDef } from './definition';
import { diPublicInInjector, getOrCreateNodeInjectorForNode } from './di';
import { throwProviderNotFoundError } from './errors';
import { registerPostOrderHooks } from './hooks';
import { addToViewTree, CLEAN_PROMISE, createLView, createTView, getOrCreateTComponentView, getOrCreateTNode, initTNodeFlags, instantiateRootComponent, invokeHostBindingsInCreationMode, locateHostElement, markAsComponentHost, refreshView, registerHostBindingOpCodes, renderView } from './instructions/shared';
import { domRendererFactory3 } from './interfaces/renderer';
import { CONTEXT, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { writeDirectClass, writeDirectStyle } from './node_manipulation';
import { enterView, getCurrentTNode, leaveView, setSelectedIndex } from './state';
import { computeStaticStyling } from './styling/static_styling';
import { setUpAttributes } from './util/attrs_utils';
import { publishDefaultGlobalUtils } from './util/global_utils';
import { defaultScheduler } from './util/misc_utils';
import { getRootContext } from './util/view_traversal_utils';
import { readPatchedLView } from './util/view_utils';
const ɵ0 = (token, notFoundValue) => {
    throwProviderNotFoundError(token, 'NullInjector');
};
// TODO: A hack to not pull in the NullInjector from @angular/core.
export const NULL_INJECTOR = {
    get: ɵ0
};
/**
 * Bootstraps a Component into an existing host element and returns an instance
 * of the component.
 *
 * Use this function to bootstrap a component into the DOM tree. Each invocation
 * of this function will create a separate tree of components, injectors and
 * change detection cycles and lifetimes. To dynamically insert a new component
 * into an existing tree such that it shares the same injection, change detection
 * and object lifetime, use {@link ViewContainer#createComponent}.
 *
 * @param componentType Component to bootstrap
 * @param options Optional parameters which control bootstrapping
 */
export function renderComponent(componentType /* Type as workaround for: Microsoft/TypeScript/issues/4881 */, opts = {}) {
    ngDevMode && publishDefaultGlobalUtils();
    ngDevMode && assertComponentType(componentType);
    const rendererFactory = opts.rendererFactory || domRendererFactory3;
    const sanitizer = opts.sanitizer || null;
    const componentDef = getComponentDef(componentType);
    if (componentDef.type != componentType)
        componentDef.type = componentType;
    // The first index of the first selector is the tag name.
    const componentTag = componentDef.selectors[0][0];
    const hostRenderer = rendererFactory.createRenderer(null, null);
    const hostRNode = locateHostElement(hostRenderer, opts.host || componentTag, componentDef.encapsulation);
    const rootFlags = componentDef.onPush ? 64 /* Dirty */ | 512 /* IsRoot */ :
        16 /* CheckAlways */ | 512 /* IsRoot */;
    const rootContext = createRootContext(opts.scheduler, opts.playerHandler);
    const renderer = rendererFactory.createRenderer(hostRNode, componentDef);
    const rootTView = createTView(0 /* Root */, null, null, 1, 0, null, null, null, null, null);
    const rootView = createLView(null, rootTView, rootContext, rootFlags, null, null, rendererFactory, renderer, null, opts.injector || null);
    enterView(rootView);
    let component;
    try {
        if (rendererFactory.begin)
            rendererFactory.begin();
        const componentView = createRootComponentView(hostRNode, componentDef, rootView, rendererFactory, renderer, sanitizer);
        component = createRootComponent(componentView, componentDef, rootView, rootContext, opts.hostFeatures || null);
        // create mode pass
        renderView(rootTView, rootView, null);
        // update mode pass
        refreshView(rootTView, rootView, null, null);
    }
    finally {
        leaveView();
        if (rendererFactory.end)
            rendererFactory.end();
    }
    return component;
}
/**
 * Creates the root component view and the root component node.
 *
 * @param rNode Render host element.
 * @param def ComponentDef
 * @param rootView The parent view where the host node is stored
 * @param rendererFactory Factory to be used for creating child renderers.
 * @param hostRenderer The current renderer
 * @param sanitizer The sanitizer, if provided
 *
 * @returns Component view created
 */
export function createRootComponentView(rNode, def, rootView, rendererFactory, hostRenderer, sanitizer) {
    const tView = rootView[TVIEW];
    const index = HEADER_OFFSET;
    ngDevMode && assertIndexInRange(rootView, index);
    rootView[index] = rNode;
    // '#host' is added here as we don't know the real host DOM name (we don't want to read it) and at
    // the same time we want to communicate the the debug `TNode` that this is a special `TNode`
    // representing a host element.
    const tNode = getOrCreateTNode(tView, index, 2 /* Element */, '#host', null);
    const mergedAttrs = tNode.mergedAttrs = def.hostAttrs;
    if (mergedAttrs !== null) {
        computeStaticStyling(tNode, mergedAttrs, true);
        if (rNode !== null) {
            setUpAttributes(hostRenderer, rNode, mergedAttrs);
            if (tNode.classes !== null) {
                writeDirectClass(hostRenderer, rNode, tNode.classes);
            }
            if (tNode.styles !== null) {
                writeDirectStyle(hostRenderer, rNode, tNode.styles);
            }
        }
    }
    const viewRenderer = rendererFactory.createRenderer(rNode, def);
    const componentView = createLView(rootView, getOrCreateTComponentView(def), null, def.onPush ? 64 /* Dirty */ : 16 /* CheckAlways */, rootView[index], tNode, rendererFactory, viewRenderer, sanitizer || null, null);
    if (tView.firstCreatePass) {
        diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, rootView), tView, def.type);
        markAsComponentHost(tView, tNode);
        initTNodeFlags(tNode, rootView.length, 1);
    }
    addToViewTree(rootView, componentView);
    // Store component view at node index, with node as the HOST
    return rootView[index] = componentView;
}
/**
 * Creates a root component and sets it up with features and host bindings. Shared by
 * renderComponent() and ViewContainerRef.createComponent().
 */
export function createRootComponent(componentView, componentDef, rootLView, rootContext, hostFeatures) {
    const tView = rootLView[TVIEW];
    // Create directive instance with factory() and store at next index in viewData
    const component = instantiateRootComponent(tView, rootLView, componentDef);
    rootContext.components.push(component);
    componentView[CONTEXT] = component;
    hostFeatures && hostFeatures.forEach((feature) => feature(component, componentDef));
    // We want to generate an empty QueryList for root content queries for backwards
    // compatibility with ViewEngine.
    if (componentDef.contentQueries) {
        const tNode = getCurrentTNode();
        ngDevMode && assertDefined(tNode, 'TNode expected');
        componentDef.contentQueries(1 /* Create */, component, tNode.directiveStart);
    }
    const rootTNode = getCurrentTNode();
    ngDevMode && assertDefined(rootTNode, 'tNode should have been already created');
    if (tView.firstCreatePass &&
        (componentDef.hostBindings !== null || componentDef.hostAttrs !== null)) {
        setSelectedIndex(rootTNode.index);
        const rootTView = rootLView[TVIEW];
        registerHostBindingOpCodes(rootTView, rootTNode, rootLView, rootTNode.directiveStart, rootTNode.directiveEnd, componentDef);
        invokeHostBindingsInCreationMode(componentDef, component);
    }
    return component;
}
export function createRootContext(scheduler, playerHandler) {
    return {
        components: [],
        scheduler: scheduler || defaultScheduler,
        clean: CLEAN_PROMISE,
        playerHandler: playerHandler || null,
        flags: 0 /* Empty */
    };
}
/**
 * Used to enable lifecycle hooks on the root component.
 *
 * Include this feature when calling `renderComponent` if the root component
 * you are rendering has lifecycle hooks defined. Otherwise, the hooks won't
 * be called properly.
 *
 * Example:
 *
 * ```
 * renderComponent(AppComponent, {hostFeatures: [LifecycleHooksFeature]});
 * ```
 */
export function LifecycleHooksFeature(component, def) {
    const lView = readPatchedLView(component);
    ngDevMode && assertDefined(lView, 'LView is required');
    const tView = lView[TVIEW];
    const tNode = getCurrentTNode();
    ngDevMode && assertDefined(tNode, 'TNode is required');
    registerPostOrderHooks(tView, tNode);
}
/**
 * Wait on component until it is rendered.
 *
 * This function returns a `Promise` which is resolved when the component's
 * change detection is executed. This is determined by finding the scheduler
 * associated with the `component`'s render tree and waiting until the scheduler
 * flushes. If nothing is scheduled, the function returns a resolved promise.
 *
 * Example:
 * ```
 * await whenRendered(myComponent);
 * ```
 *
 * @param component Component to wait upon
 * @returns Promise which resolves when the component is rendered.
 */
export function whenRendered(component) {
    return getRootContext(component).clean;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBT0gsT0FBTyxFQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSw4QkFBOEIsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLGdDQUFnQyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUluVCxPQUFPLEVBQUMsbUJBQW1CLEVBQXdDLE1BQU0sdUJBQXVCLENBQUM7QUFDakcsT0FBTyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQW9ELEtBQUssRUFBWSxNQUFNLG1CQUFtQixDQUFDO0FBQzdILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNoRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFB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b3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gV2UgYXJlIHRlbXBvcmFyaWx5IGltcG9ydGluZyB0aGUgZXhpc3Rpbmcgdmlld0VuZ2luZSBmcm9tIGNvcmUgc28gd2UgY2FuIGJlIHN1cmUgd2UgYXJlXG4vLyBjb3JyZWN0bHkgaW1wbGVtZW50aW5nIGl0cyBpbnRlcmZhY2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi4vc2FuaXRpemF0aW9uL3Nhbml0aXplcic7XG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEluZGV4SW5SYW5nZX0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHthc3NlcnRDb21wb25lbnRUeXBlfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge2dldENvbXBvbmVudERlZn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7ZGlQdWJsaWNJbkluamVjdG9yLCBnZXRPckNyZWF0ZU5vZGVJbmplY3RvckZvck5vZGV9IGZyb20gJy4vZGknO1xuaW1wb3J0IHt0aHJvd1Byb3ZpZGVyTm90Rm91bmRFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtyZWdpc3RlclBvc3RPcmRlckhvb2tzfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7YWRkVG9WaWV3VHJlZSwgQ0xFQU5fUFJPTUlTRSwgY3JlYXRlTFZpZXcsIGNyZWF0ZVRWaWV3LCBnZXRPckNyZWF0ZVRDb21wb25lbnRWaWV3LCBnZXRPckNyZWF0ZVROb2RlLCBpbml0VE5vZGVGbGFncywgaW5zdGFudGlhdGVSb290Q29tcG9uZW50LCBpbnZva2VIb3N0QmluZGluZ3NJbkNyZWF0aW9uTW9kZSwgbG9jYXRlSG9zdEVsZW1lbnQsIG1hcmtBc0NvbXBvbmVudEhvc3QsIHJlZnJlc2hWaWV3LCByZWdpc3Rlckhvc3RCaW5kaW5nT3BDb2RlcywgcmVuZGVyVmlld30gZnJvbSAnLi9pbnN0cnVjdGlvbnMvc2hhcmVkJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBDb21wb25lbnRUeXBlLCBSZW5kZXJGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtURWxlbWVudE5vZGUsIFROb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtQbGF5ZXJIYW5kbGVyfSBmcm9tICcuL2ludGVyZmFjZXMvcGxheWVyJztcbmltcG9ydCB7ZG9tUmVuZGVyZXJGYWN0b3J5MywgUkVsZW1lbnQsIFJlbmRlcmVyMywgUmVuZGVyZXJGYWN0b3J5M30gZnJvbSAnLi9pbnRlcmZhY2VzL3JlbmRlcmVyJztcbmltcG9ydCB7Q09OVEVYVCwgSEVBREVSX09GRlNFVCwgTFZpZXcsIExWaWV3RmxhZ3MsIFJvb3RDb250ZXh0LCBSb290Q29udGV4dEZsYWdzLCBUVklFVywgVFZpZXdUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge3dyaXRlRGlyZWN0Q2xhc3MsIHdyaXRlRGlyZWN0U3R5bGV9IGZyb20gJy4vbm9kZV9tYW5pcHVsYXRpb24nO1xuaW1wb3J0IHtlbnRlclZpZXcsIGdldEN1cnJlbnRUTm9kZSwgbGVhdmVWaWV3LCBzZXRTZWxlY3RlZEluZGV4fSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7Y29tcHV0ZVN0YXRpY1N0eWxpbmd9IGZyb20gJy4vc3R5bGluZy9zdGF0aWNfc3R5bGluZyc7XG5pbXBvcnQge3NldFVwQXR0cmlidXRlc30gZnJvbSAnLi91dGlsL2F0dHJzX3V0aWxzJztcbmltcG9ydCB7cHVibGlzaERlZmF1bHRHbG9iYWxVdGlsc30gZnJvbSAnLi91dGlsL2dsb2JhbF91dGlscyc7XG5pbXBvcnQge2RlZmF1bHRTY2hlZHVsZXIsIHN0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuL3V0aWwvbWlzY191dGlscyc7XG5pbXBvcnQge2dldFJvb3RDb250ZXh0fSBmcm9tICcuL3V0aWwvdmlld190cmF2ZXJzYWxfdXRpbHMnO1xuaW1wb3J0IHtyZWFkUGF0Y2hlZExWaWV3fSBmcm9tICcuL3V0aWwvdmlld191dGlscyc7XG5cblxuXG4vKiogT3B0aW9ucyB0aGF0IGNvbnRyb2wgaG93IHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIGJvb3RzdHJhcHBlZC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRlQ29tcG9uZW50T3B0aW9ucyB7XG4gIC8qKiBXaGljaCByZW5kZXJlciBmYWN0b3J5IHRvIHVzZS4gKi9cbiAgcmVuZGVyZXJGYWN0b3J5PzogUmVuZGVyZXJGYWN0b3J5MztcblxuICAvKiogQSBjdXN0b20gc2FuaXRpemVyIGluc3RhbmNlICovXG4gIHNhbml0aXplcj86IFNhbml0aXplcjtcblxuICAvKiogQSBjdXN0b20gYW5pbWF0aW9uIHBsYXllciBoYW5kbGVyICovXG4gIHBsYXllckhhbmRsZXI/OiBQbGF5ZXJIYW5kbGVyO1xuXG4gIC8qKlxuICAgKiBIb3N0IGVsZW1lbnQgb24gd2hpY2ggdGhlIGNvbXBvbmVudCB3aWxsIGJlIGJvb3RzdHJhcHBlZC4gSWYgbm90IHNwZWNpZmllZCxcbiAgICogdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uJ3MgYHRhZ2AgaXMgdXNlZCB0byBxdWVyeSB0aGUgZXhpc3RpbmcgRE9NIGZvciB0aGVcbiAgICogZWxlbWVudCB0byBib290c3RyYXAuXG4gICAqL1xuICBob3N0PzogUkVsZW1lbnR8c3RyaW5nO1xuXG4gIC8qKiBNb2R1bGUgaW5qZWN0b3IgZm9yIHRoZSBjb21wb25lbnQuIElmIHVuc3BlY2lmaWVkLCB0aGUgaW5qZWN0b3Igd2lsbCBiZSBOVUxMX0lOSkVDVE9SLiAqL1xuICBpbmplY3Rvcj86IEluamVjdG9yO1xuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGZlYXR1cmVzIHRvIGJlIGFwcGxpZWQgdG8gdGhlIGNyZWF0ZWQgY29tcG9uZW50LiBGZWF0dXJlcyBhcmUgc2ltcGx5XG4gICAqIGZ1bmN0aW9ucyB0aGF0IGRlY29yYXRlIGEgY29tcG9uZW50IHdpdGggYSBjZXJ0YWluIGJlaGF2aW9yLlxuICAgKlxuICAgKiBUeXBpY2FsbHksIHRoZSBmZWF0dXJlcyBpbiB0aGlzIGxpc3QgYXJlIGZlYXR1cmVzIHRoYXQgY2Fubm90IGJlIGFkZGVkIHRvIHRoZVxuICAgKiBvdGhlciBmZWF0dXJlcyBsaXN0IGluIHRoZSBjb21wb25lbnQgZGVmaW5pdGlvbiBiZWNhdXNlIHRoZXkgcmVseSBvbiBvdGhlciBmYWN0b3JzLlxuICAgKlxuICAgKiBFeGFtcGxlOiBgTGlmZWN5Y2xlSG9va3NGZWF0dXJlYCBpcyBhIGZ1bmN0aW9uIHRoYXQgYWRkcyBsaWZlY3ljbGUgaG9vayBjYXBhYmlsaXRpZXNcbiAgICogdG8gcm9vdCBjb21wb25lbnRzIGluIGEgdHJlZS1zaGFrYWJsZSB3YXkuIEl0IGNhbm5vdCBiZSBhZGRlZCB0byB0aGUgY29tcG9uZW50XG4gICAqIGZlYXR1cmVzIGxpc3QgYmVjYXVzZSB0aGVyZSdzIG5vIHdheSBvZiBrbm93aW5nIHdoZW4gdGhlIGNvbXBvbmVudCB3aWxsIGJlIHVzZWQgYXNcbiAgICogYSByb290IGNvbXBvbmVudC5cbiAgICovXG4gIGhvc3RGZWF0dXJlcz86IEhvc3RGZWF0dXJlW107XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gd2hpY2ggaXMgdXNlZCB0byBzY2hlZHVsZSBjaGFuZ2UgZGV0ZWN0aW9uIHdvcmsgaW4gdGhlIGZ1dHVyZS5cbiAgICpcbiAgICogV2hlbiBtYXJraW5nIGNvbXBvbmVudHMgYXMgZGlydHksIGl0IGlzIG5lY2Vzc2FyeSB0byBzY2hlZHVsZSB0aGUgd29yayBvZlxuICAgKiBjaGFuZ2UgZGV0ZWN0aW9uIGluIHRoZSBmdXR1cmUuIFRoaXMgaXMgZG9uZSB0byBjb2FsZXNjZSBtdWx0aXBsZVxuICAgKiB7QGxpbmsgbWFya0RpcnR5fSBjYWxscyBpbnRvIGEgc2luZ2xlIGNoYW5nZWQgZGV0ZWN0aW9uIHByb2Nlc3NpbmcuXG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBzY2hlZHVsZXIgaXMgdGhlIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBJdCBpcyBhbHNvIHVzZWZ1bCB0byBvdmVycmlkZSB0aGlzIGZ1bmN0aW9uIGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICAgKi9cbiAgc2NoZWR1bGVyPzogKHdvcms6ICgpID0+IHZvaWQpID0+IHZvaWQ7XG59XG5cbi8qKiBTZWUgQ3JlYXRlQ29tcG9uZW50T3B0aW9ucy5ob3N0RmVhdHVyZXMgKi9cbnR5cGUgSG9zdEZlYXR1cmUgPSAoPFQ+KGNvbXBvbmVudDogVCwgY29tcG9uZW50RGVmOiBDb21wb25lbnREZWY8VD4pID0+IHZvaWQpO1xuXG4vLyBUT0RPOiBBIGhhY2sgdG8gbm90IHB1bGwgaW4gdGhlIE51bGxJbmplY3RvciBmcm9tIEBhbmd1bGFyL2NvcmUuXG5leHBvcnQgY29uc3QgTlVMTF9JTkpFQ1RPUjogSW5qZWN0b3IgPSB7XG4gIGdldDogKHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpID0+IHtcbiAgICB0aHJvd1Byb3ZpZGVyTm90Rm91bmRFcnJvcih0b2tlbiwgJ051bGxJbmplY3RvcicpO1xuICB9XG59O1xuXG4vKipcbiAqIEJvb3RzdHJhcHMgYSBDb21wb25lbnQgaW50byBhbiBleGlzdGluZyBob3N0IGVsZW1lbnQgYW5kIHJldHVybnMgYW4gaW5zdGFuY2VcbiAqIG9mIHRoZSBjb21wb25lbnQuXG4gKlxuICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gYm9vdHN0cmFwIGEgY29tcG9uZW50IGludG8gdGhlIERPTSB0cmVlLiBFYWNoIGludm9jYXRpb25cbiAqIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBjcmVhdGUgYSBzZXBhcmF0ZSB0cmVlIG9mIGNvbXBvbmVudHMsIGluamVjdG9ycyBhbmRcbiAqIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzIGFuZCBsaWZldGltZXMuIFRvIGR5bmFtaWNhbGx5IGluc2VydCBhIG5ldyBjb21wb25lbnRcbiAqIGludG8gYW4gZXhpc3RpbmcgdHJlZSBzdWNoIHRoYXQgaXQgc2hhcmVzIHRoZSBzYW1lIGluamVjdGlvbiwgY2hhbmdlIGRldGVjdGlvblxuICogYW5kIG9iamVjdCBsaWZldGltZSwgdXNlIHtAbGluayBWaWV3Q29udGFpbmVyI2NyZWF0ZUNvbXBvbmVudH0uXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudFR5cGUgQ29tcG9uZW50IHRvIGJvb3RzdHJhcFxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9uYWwgcGFyYW1ldGVycyB3aGljaCBjb250cm9sIGJvb3RzdHJhcHBpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudDxUPihcbiAgICBjb21wb25lbnRUeXBlOiBDb21wb25lbnRUeXBlPFQ+fFxuICAgIFR5cGU8VD4vKiBUeXBlIGFzIHdvcmthcm91bmQgZm9yOiBNaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNDg4MSAqL1xuICAgICxcbiAgICBvcHRzOiBDcmVhdGVDb21wb25lbnRPcHRpb25zID0ge30pOiBUIHtcbiAgbmdEZXZNb2RlICYmIHB1Ymxpc2hEZWZhdWx0R2xvYmFsVXRpbHMoKTtcbiAgbmdEZXZNb2RlICYmIGFzc2VydENvbXBvbmVudFR5cGUoY29tcG9uZW50VHlwZSk7XG5cbiAgY29uc3QgcmVuZGVyZXJGYWN0b3J5ID0gb3B0cy5yZW5kZXJlckZhY3RvcnkgfHwgZG9tUmVuZGVyZXJGYWN0b3J5MztcbiAgY29uc3Qgc2FuaXRpemVyID0gb3B0cy5zYW5pdGl6ZXIgfHwgbnVsbDtcbiAgY29uc3QgY29tcG9uZW50RGVmID0gZ2V0Q29tcG9uZW50RGVmPFQ+KGNvbXBvbmVudFR5cGUpITtcbiAgaWYgKGNvbXBvbmVudERlZi50eXBlICE9IGNvbXBvbmVudFR5cGUpIChjb21wb25lbnREZWYgYXMge3R5cGU6IFR5cGU8YW55Pn0pLnR5cGUgPSBjb21wb25lbnRUeXBlO1xuXG4gIC8vIFRoZSBmaXJzdCBpbmRleCBvZiB0aGUgZmlyc3Qgc2VsZWN0b3IgaXMgdGhlIHRhZyBuYW1lLlxuICBjb25zdCBjb21wb25lbnRUYWcgPSBjb21wb25lbnREZWYuc2VsZWN0b3JzIVswXSFbMF0gYXMgc3RyaW5nO1xuICBjb25zdCBob3N0UmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG4gIGNvbnN0IGhvc3RSTm9kZSA9XG4gICAgICBsb2NhdGVIb3N0RWxlbWVudChob3N0UmVuZGVyZXIsIG9wdHMuaG9zdCB8fCBjb21wb25lbnRUYWcsIGNvbXBvbmVudERlZi5lbmNhcHN1bGF0aW9uKTtcbiAgY29uc3Qgcm9vdEZsYWdzID0gY29tcG9uZW50RGVmLm9uUHVzaCA/IExWaWV3RmxhZ3MuRGlydHkgfCBMVmlld0ZsYWdzLklzUm9vdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMVmlld0ZsYWdzLkNoZWNrQWx3YXlzIHwgTFZpZXdGbGFncy5Jc1Jvb3Q7XG4gIGNvbnN0IHJvb3RDb250ZXh0ID0gY3JlYXRlUm9vdENvbnRleHQob3B0cy5zY2hlZHVsZXIsIG9wdHMucGxheWVySGFuZGxlcik7XG5cbiAgY29uc3QgcmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoaG9zdFJOb2RlLCBjb21wb25lbnREZWYpO1xuICBjb25zdCByb290VFZpZXcgPSBjcmVhdGVUVmlldyhUVmlld1R5cGUuUm9vdCwgbnVsbCwgbnVsbCwgMSwgMCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XG4gIGNvbnN0IHJvb3RWaWV3OiBMVmlldyA9IGNyZWF0ZUxWaWV3KFxuICAgICAgbnVsbCwgcm9vdFRWaWV3LCByb290Q29udGV4dCwgcm9vdEZsYWdzLCBudWxsLCBudWxsLCByZW5kZXJlckZhY3RvcnksIHJlbmRlcmVyLCBudWxsLFxuICAgICAgb3B0cy5pbmplY3RvciB8fCBudWxsKTtcblxuICBlbnRlclZpZXcocm9vdFZpZXcpO1xuICBsZXQgY29tcG9uZW50OiBUO1xuXG4gIHRyeSB7XG4gICAgaWYgKHJlbmRlcmVyRmFjdG9yeS5iZWdpbikgcmVuZGVyZXJGYWN0b3J5LmJlZ2luKCk7XG4gICAgY29uc3QgY29tcG9uZW50VmlldyA9IGNyZWF0ZVJvb3RDb21wb25lbnRWaWV3KFxuICAgICAgICBob3N0Uk5vZGUsIGNvbXBvbmVudERlZiwgcm9vdFZpZXcsIHJlbmRlcmVyRmFjdG9yeSwgcmVuZGVyZXIsIHNhbml0aXplcik7XG4gICAgY29tcG9uZW50ID0gY3JlYXRlUm9vdENvbXBvbmVudChcbiAgICAgICAgY29tcG9uZW50VmlldywgY29tcG9uZW50RGVmLCByb290Vmlldywgcm9vdENvbnRleHQsIG9wdHMuaG9zdEZlYXR1cmVzIHx8IG51bGwpO1xuXG4gICAgLy8gY3JlYXRlIG1vZGUgcGFzc1xuICAgIHJlbmRlclZpZXcocm9vdFRWaWV3LCByb290VmlldywgbnVsbCk7XG4gICAgLy8gdXBkYXRlIG1vZGUgcGFzc1xuICAgIHJlZnJlc2hWaWV3KHJvb3RUVmlldywgcm9vdFZpZXcsIG51bGwsIG51bGwpO1xuXG4gIH0gZmluYWxseSB7XG4gICAgbGVhdmVWaWV3KCk7XG4gICAgaWYgKHJlbmRlcmVyRmFjdG9yeS5lbmQpIHJlbmRlcmVyRmFjdG9yeS5lbmQoKTtcbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgcm9vdCBjb21wb25lbnQgdmlldyBhbmQgdGhlIHJvb3QgY29tcG9uZW50IG5vZGUuXG4gKlxuICogQHBhcmFtIHJOb2RlIFJlbmRlciBob3N0IGVsZW1lbnQuXG4gKiBAcGFyYW0gZGVmIENvbXBvbmVudERlZlxuICogQHBhcmFtIHJvb3RWaWV3IFRoZSBwYXJlbnQgdmlldyB3aGVyZSB0aGUgaG9zdCBub2RlIGlzIHN0b3JlZFxuICogQHBhcmFtIHJlbmRlcmVyRmFjdG9yeSBGYWN0b3J5IHRvIGJlIHVzZWQgZm9yIGNyZWF0aW5nIGNoaWxkIHJlbmRlcmVycy5cbiAqIEBwYXJhbSBob3N0UmVuZGVyZXIgVGhlIGN1cnJlbnQgcmVuZGVyZXJcbiAqIEBwYXJhbSBzYW5pdGl6ZXIgVGhlIHNhbml0aXplciwgaWYgcHJvdmlkZWRcbiAqXG4gKiBAcmV0dXJucyBDb21wb25lbnQgdmlldyBjcmVhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290Q29tcG9uZW50VmlldyhcbiAgICByTm9kZTogUkVsZW1lbnR8bnVsbCwgZGVmOiBDb21wb25lbnREZWY8YW55Piwgcm9vdFZpZXc6IExWaWV3LFxuICAgIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MywgaG9zdFJlbmRlcmVyOiBSZW5kZXJlcjMsIHNhbml0aXplcj86IFNhbml0aXplcnxudWxsKTogTFZpZXcge1xuICBjb25zdCB0VmlldyA9IHJvb3RWaWV3W1RWSUVXXTtcbiAgY29uc3QgaW5kZXggPSBIRUFERVJfT0ZGU0VUO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0SW5kZXhJblJhbmdlKHJvb3RWaWV3LCBpbmRleCk7XG4gIHJvb3RWaWV3W2luZGV4XSA9IHJOb2RlO1xuICAvLyAnI2hvc3QnIGlzIGFkZGVkIGhlcmUgYXMgd2UgZG9uJ3Qga25vdyB0aGUgcmVhbCBob3N0IERPTSBuYW1lICh3ZSBkb24ndCB3YW50IHRvIHJlYWQgaXQpIGFuZCBhdFxuICAvLyB0aGUgc2FtZSB0aW1lIHdlIHdhbnQgdG8gY29tbXVuaWNhdGUgdGhlIHRoZSBkZWJ1ZyBgVE5vZGVgIHRoYXQgdGhpcyBpcyBhIHNwZWNpYWwgYFROb2RlYFxuICAvLyByZXByZXNlbnRpbmcgYSBob3N0IGVsZW1lbnQuXG4gIGNvbnN0IHROb2RlOiBURWxlbWVudE5vZGUgPSBnZXRPckNyZWF0ZVROb2RlKHRWaWV3LCBpbmRleCwgVE5vZGVUeXBlLkVsZW1lbnQsICcjaG9zdCcsIG51bGwpO1xuICBjb25zdCBtZXJnZWRBdHRycyA9IHROb2RlLm1lcmdlZEF0dHJzID0gZGVmLmhvc3RBdHRycztcbiAgaWYgKG1lcmdlZEF0dHJzICE9PSBudWxsKSB7XG4gICAgY29tcHV0ZVN0YXRpY1N0eWxpbmcodE5vZGUsIG1lcmdlZEF0dHJzLCB0cnVlKTtcbiAgICBpZiAock5vZGUgIT09IG51bGwpIHtcbiAgICAgIHNldFVwQXR0cmlidXRlcyhob3N0UmVuZGVyZXIsIHJOb2RlLCBtZXJnZWRBdHRycyk7XG4gICAgICBpZiAodE5vZGUuY2xhc3NlcyAhPT0gbnVsbCkge1xuICAgICAgICB3cml0ZURpcmVjdENsYXNzKGhvc3RSZW5kZXJlciwgck5vZGUsIHROb2RlLmNsYXNzZXMpO1xuICAgICAgfVxuICAgICAgaWYgKHROb2RlLnN0eWxlcyAhPT0gbnVsbCkge1xuICAgICAgICB3cml0ZURpcmVjdFN0eWxlKGhvc3RSZW5kZXJlciwgck5vZGUsIHROb2RlLnN0eWxlcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgdmlld1JlbmRlcmVyID0gcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHJOb2RlLCBkZWYpO1xuICBjb25zdCBjb21wb25lbnRWaWV3ID0gY3JlYXRlTFZpZXcoXG4gICAgICByb290VmlldywgZ2V0T3JDcmVhdGVUQ29tcG9uZW50VmlldyhkZWYpLCBudWxsLFxuICAgICAgZGVmLm9uUHVzaCA/IExWaWV3RmxhZ3MuRGlydHkgOiBMVmlld0ZsYWdzLkNoZWNrQWx3YXlzLCByb290Vmlld1tpbmRleF0sIHROb2RlLFxuICAgICAgcmVuZGVyZXJGYWN0b3J5LCB2aWV3UmVuZGVyZXIsIHNhbml0aXplciB8fCBudWxsLCBudWxsKTtcblxuICBpZiAodFZpZXcuZmlyc3RDcmVhdGVQYXNzKSB7XG4gICAgZGlQdWJsaWNJbkluamVjdG9yKGdldE9yQ3JlYXRlTm9kZUluamVjdG9yRm9yTm9kZSh0Tm9kZSwgcm9vdFZpZXcpLCB0VmlldywgZGVmLnR5cGUpO1xuICAgIG1hcmtBc0NvbXBvbmVudEhvc3QodFZpZXcsIHROb2RlKTtcbiAgICBpbml0VE5vZGVGbGFncyh0Tm9kZSwgcm9vdFZpZXcubGVuZ3RoLCAxKTtcbiAgfVxuXG4gIGFkZFRvVmlld1RyZWUocm9vdFZpZXcsIGNvbXBvbmVudFZpZXcpO1xuXG4gIC8vIFN0b3JlIGNvbXBvbmVudCB2aWV3IGF0IG5vZGUgaW5kZXgsIHdpdGggbm9kZSBhcyB0aGUgSE9TVFxuICByZXR1cm4gcm9vdFZpZXdbaW5kZXhdID0gY29tcG9uZW50Vmlldztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgcm9vdCBjb21wb25lbnQgYW5kIHNldHMgaXQgdXAgd2l0aCBmZWF0dXJlcyBhbmQgaG9zdCBiaW5kaW5ncy4gU2hhcmVkIGJ5XG4gKiByZW5kZXJDb21wb25lbnQoKSBhbmQgVmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvb3RDb21wb25lbnQ8VD4oXG4gICAgY29tcG9uZW50VmlldzogTFZpZXcsIGNvbXBvbmVudERlZjogQ29tcG9uZW50RGVmPFQ+LCByb290TFZpZXc6IExWaWV3LCByb290Q29udGV4dDogUm9vdENvbnRleHQsXG4gICAgaG9zdEZlYXR1cmVzOiBIb3N0RmVhdHVyZVtdfG51bGwpOiBhbnkge1xuICBjb25zdCB0VmlldyA9IHJvb3RMVmlld1tUVklFV107XG4gIC8vIENyZWF0ZSBkaXJlY3RpdmUgaW5zdGFuY2Ugd2l0aCBmYWN0b3J5KCkgYW5kIHN0b3JlIGF0IG5leHQgaW5kZXggaW4gdmlld0RhdGFcbiAgY29uc3QgY29tcG9uZW50ID0gaW5zdGFudGlhdGVSb290Q29tcG9uZW50KHRWaWV3LCByb290TFZpZXcsIGNvbXBvbmVudERlZik7XG5cbiAgcm9vdENvbnRleHQuY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gIGNvbXBvbmVudFZpZXdbQ09OVEVYVF0gPSBjb21wb25lbnQ7XG5cbiAgaG9zdEZlYXR1cmVzICYmIGhvc3RGZWF0dXJlcy5mb3JFYWNoKChmZWF0dXJlKSA9PiBmZWF0dXJlKGNvbXBvbmVudCwgY29tcG9uZW50RGVmKSk7XG5cbiAgLy8gV2Ugd2FudCB0byBnZW5lcmF0ZSBhbiBlbXB0eSBRdWVyeUxpc3QgZm9yIHJvb3QgY29udGVudCBxdWVyaWVzIGZvciBiYWNrd2FyZHNcbiAgLy8gY29tcGF0aWJpbGl0eSB3aXRoIFZpZXdFbmdpbmUuXG4gIGlmIChjb21wb25lbnREZWYuY29udGVudFF1ZXJpZXMpIHtcbiAgICBjb25zdCB0Tm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0Tm9kZSwgJ1ROb2RlIGV4cGVjdGVkJyk7XG4gICAgY29tcG9uZW50RGVmLmNvbnRlbnRRdWVyaWVzKFJlbmRlckZsYWdzLkNyZWF0ZSwgY29tcG9uZW50LCB0Tm9kZS5kaXJlY3RpdmVTdGFydCk7XG4gIH1cblxuICBjb25zdCByb290VE5vZGUgPSBnZXRDdXJyZW50VE5vZGUoKSE7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHJvb3RUTm9kZSwgJ3ROb2RlIHNob3VsZCBoYXZlIGJlZW4gYWxyZWFkeSBjcmVhdGVkJyk7XG4gIGlmICh0Vmlldy5maXJzdENyZWF0ZVBhc3MgJiZcbiAgICAgIChjb21wb25lbnREZWYuaG9zdEJpbmRpbmdzICE9PSBudWxsIHx8IGNvbXBvbmVudERlZi5ob3N0QXR0cnMgIT09IG51bGwpKSB7XG4gICAgc2V0U2VsZWN0ZWRJbmRleChyb290VE5vZGUuaW5kZXgpO1xuXG4gICAgY29uc3Qgcm9vdFRWaWV3ID0gcm9vdExWaWV3W1RWSUVXXTtcbiAgICByZWdpc3Rlckhvc3RCaW5kaW5nT3BDb2RlcyhcbiAgICAgICAgcm9vdFRWaWV3LCByb290VE5vZGUsIHJvb3RMVmlldywgcm9vdFROb2RlLmRpcmVjdGl2ZVN0YXJ0LCByb290VE5vZGUuZGlyZWN0aXZlRW5kLFxuICAgICAgICBjb21wb25lbnREZWYpO1xuXG4gICAgaW52b2tlSG9zdEJpbmRpbmdzSW5DcmVhdGlvbk1vZGUoY29tcG9uZW50RGVmLCBjb21wb25lbnQpO1xuICB9XG4gIHJldHVybiBjb21wb25lbnQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvb3RDb250ZXh0KFxuICAgIHNjaGVkdWxlcj86ICh3b3JrRm46ICgpID0+IHZvaWQpID0+IHZvaWQsIHBsYXllckhhbmRsZXI/OiBQbGF5ZXJIYW5kbGVyfG51bGwpOiBSb290Q29udGV4dCB7XG4gIHJldHVybiB7XG4gICAgY29tcG9uZW50czogW10sXG4gICAgc2NoZWR1bGVyOiBzY2hlZHVsZXIgfHwgZGVmYXVsdFNjaGVkdWxlcixcbiAgICBjbGVhbjogQ0xFQU5fUFJPTUlTRSxcbiAgICBwbGF5ZXJIYW5kbGVyOiBwbGF5ZXJIYW5kbGVyIHx8IG51bGwsXG4gICAgZmxhZ3M6IFJvb3RDb250ZXh0RmxhZ3MuRW1wdHlcbiAgfTtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGVuYWJsZSBsaWZlY3ljbGUgaG9va3Mgb24gdGhlIHJvb3QgY29tcG9uZW50LlxuICpcbiAqIEluY2x1ZGUgdGhpcyBmZWF0dXJlIHdoZW4gY2FsbGluZyBgcmVuZGVyQ29tcG9uZW50YCBpZiB0aGUgcm9vdCBjb21wb25lbnRcbiAqIHlvdSBhcmUgcmVuZGVyaW5nIGhhcyBsaWZlY3ljbGUgaG9va3MgZGVmaW5lZC4gT3RoZXJ3aXNlLCB0aGUgaG9va3Mgd29uJ3RcbiAqIGJlIGNhbGxlZCBwcm9wZXJseS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogcmVuZGVyQ29tcG9uZW50KEFwcENvbXBvbmVudCwge2hvc3RGZWF0dXJlczogW0xpZmVjeWNsZUhvb2tzRmVhdHVyZV19KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gTGlmZWN5Y2xlSG9va3NGZWF0dXJlKGNvbXBvbmVudDogYW55LCBkZWY6IENvbXBvbmVudERlZjxhbnk+KTogdm9pZCB7XG4gIGNvbnN0IGxWaWV3ID0gcmVhZFBhdGNoZWRMVmlldyhjb21wb25lbnQpITtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQobFZpZXcsICdMVmlldyBpcyByZXF1aXJlZCcpO1xuICBjb25zdCB0VmlldyA9IGxWaWV3W1RWSUVXXTtcbiAgY29uc3QgdE5vZGUgPSBnZXRDdXJyZW50VE5vZGUoKSE7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHROb2RlLCAnVE5vZGUgaXMgcmVxdWlyZWQnKTtcbiAgcmVnaXN0ZXJQb3N0T3JkZXJIb29rcyh0VmlldywgdE5vZGUpO1xufVxuXG4vKipcbiAqIFdhaXQgb24gY29tcG9uZW50IHVudGlsIGl0IGlzIHJlbmRlcmVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIGBQcm9taXNlYCB3aGljaCBpcyByZXNvbHZlZCB3aGVuIHRoZSBjb21wb25lbnQnc1xuICogY2hhbmdlIGRldGVjdGlvbiBpcyBleGVjdXRlZC4gVGhpcyBpcyBkZXRlcm1pbmVkIGJ5IGZpbmRpbmcgdGhlIHNjaGVkdWxlclxuICogYXNzb2NpYXRlZCB3aXRoIHRoZSBgY29tcG9uZW50YCdzIHJlbmRlciB0cmVlIGFuZCB3YWl0aW5nIHVudGlsIHRoZSBzY2hlZHVsZXJcbiAqIGZsdXNoZXMuIElmIG5vdGhpbmcgaXMgc2NoZWR1bGVkLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHJlc29sdmVkIHByb21pc2UuXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYFxuICogYXdhaXQgd2hlblJlbmRlcmVkKG15Q29tcG9uZW50KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IHRvIHdhaXQgdXBvblxuICogQHJldHVybnMgUHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGVuUmVuZGVyZWQoY29tcG9uZW50OiBhbnkpOiBQcm9taXNlPG51bGw+IHtcbiAgcmV0dXJuIGdldFJvb3RDb250ZXh0KGNvbXBvbmVudCkuY2xlYW47XG59XG4iXX0=