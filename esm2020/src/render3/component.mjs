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
import { throwProviderNotFoundError } from './errors_di';
import { registerPostOrderHooks } from './hooks';
import { addToViewTree, CLEAN_PROMISE, createLView, createTView, getOrCreateTComponentView, getOrCreateTNode, initTNodeFlags, instantiateRootComponent, invokeHostBindingsInCreationMode, locateHostElement, markAsComponentHost, refreshView, registerHostBindingOpCodes, renderView } from './instructions/shared';
import { domRendererFactory3 } from './interfaces/renderer';
import { CONTEXT, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { writeDirectClass, writeDirectStyle } from './node_manipulation';
import { enterView, getCurrentTNode, getLView, leaveView, setSelectedIndex } from './state';
import { computeStaticStyling } from './styling/static_styling';
import { setUpAttributes } from './util/attrs_utils';
import { publishDefaultGlobalUtils } from './util/global_utils';
import { defaultScheduler } from './util/misc_utils';
import { getRootContext } from './util/view_traversal_utils';
// TODO: A hack to not pull in the NullInjector from @angular/core.
export const NULL_INJECTOR = {
    get: (token, notFoundValue) => {
        throwProviderNotFoundError(token, 'NullInjector');
    }
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
    const rootFlags = componentDef.onPush ? 32 /* LViewFlags.Dirty */ | 256 /* LViewFlags.IsRoot */ :
        16 /* LViewFlags.CheckAlways */ | 256 /* LViewFlags.IsRoot */;
    const rootContext = createRootContext(opts.scheduler, opts.playerHandler);
    const renderer = rendererFactory.createRenderer(hostRNode, componentDef);
    const rootTView = createTView(0 /* TViewType.Root */, null, null, 1, 0, null, null, null, null, null);
    const rootView = createLView(null, rootTView, rootContext, rootFlags, null, null, rendererFactory, renderer, null, opts.injector || null, null);
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
    // the same time we want to communicate the debug `TNode` that this is a special `TNode`
    // representing a host element.
    const tNode = getOrCreateTNode(tView, index, 2 /* TNodeType.Element */, '#host', null);
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
    const componentView = createLView(rootView, getOrCreateTComponentView(def), null, def.onPush ? 32 /* LViewFlags.Dirty */ : 16 /* LViewFlags.CheckAlways */, rootView[index], tNode, rendererFactory, viewRenderer, sanitizer || null, null, null);
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
    if (hostFeatures !== null) {
        for (const feature of hostFeatures) {
            feature(component, componentDef);
        }
    }
    // We want to generate an empty QueryList for root content queries for backwards
    // compatibility with ViewEngine.
    if (componentDef.contentQueries) {
        const tNode = getCurrentTNode();
        ngDevMode && assertDefined(tNode, 'TNode expected');
        componentDef.contentQueries(1 /* RenderFlags.Create */, component, tNode.directiveStart);
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
        flags: 0 /* RootContextFlags.Empty */
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
export function LifecycleHooksFeature() {
    const tNode = getCurrentTNode();
    ngDevMode && assertDefined(tNode, 'TNode is required');
    registerPostOrderHooks(getLView()[TVIEW], tNode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBT0gsT0FBTyxFQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSw4QkFBOEIsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN4RSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUseUJBQXlCLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLGdDQUFnQyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSwwQkFBMEIsRUFBRSxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUluVCxPQUFPLEVBQUMsbUJBQW1CLEVBQThCLE1BQU0sdUJBQXVCLENBQUM7QUFFdkYsT0FBTyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQW9ELEtBQUssRUFBWSxNQUFNLG1CQUFtQixDQUFDO0FBQzdILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDMUYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQXdEM0QsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBYTtJQUNyQyxHQUFHLEVBQUUsQ0FBQyxLQUFVLEVBQUUsYUFBbUIsRUFBRSxFQUFFO1FBQ3ZDLDBCQUEwQixDQUFDLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQzNCLGFBQ08sQ0FBQSw4REFBOEQsRUFFckUsT0FBK0IsRUFBRTtJQUNuQyxTQUFTLElBQUkseUJBQXlCLEVBQUUsQ0FBQztJQUN6QyxTQUFTLElBQUksbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFaEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxtQkFBbUIsQ0FBQztJQUNwRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztJQUN6QyxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUksYUFBYSxDQUFFLENBQUM7SUFDeEQsSUFBSSxZQUFZLENBQUMsSUFBSSxJQUFJLGFBQWE7UUFBRyxZQUFrQyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7SUFFakcseURBQXlEO0lBQ3pELE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxTQUFVLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFXLENBQUM7SUFDOUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsTUFBTSxTQUFTLEdBQ1gsaUJBQWlCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksWUFBWSxFQUFFLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzRixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx1REFBb0MsQ0FBQyxDQUFDO1FBQ3RDLDZEQUEwQyxDQUFDO0lBQ25GLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTFFLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sU0FBUyxHQUFHLFdBQVcseUJBQWlCLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsTUFBTSxRQUFRLEdBQVUsV0FBVyxDQUMvQixJQUFJLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLElBQUksRUFDcEYsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFakMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksU0FBWSxDQUFDO0lBRWpCLElBQUk7UUFDRixJQUFJLGVBQWUsQ0FBQyxLQUFLO1lBQUUsZUFBZSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25ELE1BQU0sYUFBYSxHQUFHLHVCQUF1QixDQUN6QyxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdFLFNBQVMsR0FBRyxtQkFBbUIsQ0FDM0IsYUFBYSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUM7UUFFbkYsbUJBQW1CO1FBQ25CLFVBQVUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLG1CQUFtQjtRQUNuQixXQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FFOUM7WUFBUztRQUNSLFNBQVMsRUFBRSxDQUFDO1FBQ1osSUFBSSxlQUFlLENBQUMsR0FBRztZQUFFLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNoRDtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FDbkMsS0FBb0IsRUFBRSxHQUFzQixFQUFFLFFBQWUsRUFDN0QsZUFBaUMsRUFBRSxZQUF1QixFQUFFLFNBQTBCO0lBQ3hGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixNQUFNLEtBQUssR0FBRyxhQUFhLENBQUM7SUFDNUIsU0FBUyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRCxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLGtHQUFrRztJQUNsRyx3RkFBd0Y7SUFDeEYsK0JBQStCO0lBQy9CLE1BQU0sS0FBSyxHQUFpQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyw2QkFBcUIsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdGLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7UUFDeEIsb0JBQW9CLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbEQsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDMUIsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEQ7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUN6QixnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyRDtTQUNGO0tBQ0Y7SUFFRCxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRSxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQzdCLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQywyQkFBa0IsQ0FBQyxnQ0FBdUIsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUM5RSxlQUFlLEVBQUUsWUFBWSxFQUFFLFNBQVMsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWxFLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRTtRQUN6QixrQkFBa0IsQ0FBQyw4QkFBOEIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRixtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzNDO0lBRUQsYUFBYSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUV2Qyw0REFBNEQ7SUFDNUQsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQ3pDLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQy9CLGFBQW9CLEVBQUUsWUFBNkIsRUFBRSxTQUFnQixFQUFFLFdBQXdCLEVBQy9GLFlBQWdDO0lBQ2xDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQiwrRUFBK0U7SUFDL0UsTUFBTSxTQUFTLEdBQUcsd0JBQXdCLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUUzRSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRW5DLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtRQUN6QixLQUFLLE1BQU0sT0FBTyxJQUFJLFlBQVksRUFBRTtZQUNsQyxPQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7SUFFRCxnRkFBZ0Y7SUFDaEYsaUNBQWlDO0lBQ2pDLElBQUksWUFBWSxDQUFDLGNBQWMsRUFBRTtRQUMvQixNQUFNLEtBQUssR0FBRyxlQUFlLEVBQUcsQ0FBQztRQUNqQyxTQUFTLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BELFlBQVksQ0FBQyxjQUFjLDZCQUFxQixTQUFTLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsTUFBTSxTQUFTLEdBQUcsZUFBZSxFQUFHLENBQUM7SUFDckMsU0FBUyxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztJQUNoRixJQUFJLEtBQUssQ0FBQyxlQUFlO1FBQ3JCLENBQUMsWUFBWSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksWUFBWSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsRUFBRTtRQUMzRSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLDBCQUEwQixDQUN0QixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxZQUFZLEVBQ2pGLFlBQVksQ0FBQyxDQUFDO1FBRWxCLGdDQUFnQyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMzRDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFHRCxNQUFNLFVBQVUsaUJBQWlCLENBQzdCLFNBQXdDLEVBQUUsYUFBa0M7SUFDOUUsT0FBTztRQUNMLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFLFNBQVMsSUFBSSxnQkFBZ0I7UUFDeEMsS0FBSyxFQUFFLGFBQWE7UUFDcEIsYUFBYSxFQUFFLGFBQWEsSUFBSSxJQUFJO1FBQ3BDLEtBQUssZ0NBQXdCO0tBQzlCLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxNQUFNLEtBQUssR0FBRyxlQUFlLEVBQUcsQ0FBQztJQUNqQyxTQUFTLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZELHNCQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLFNBQWM7SUFDekMsT0FBTyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gV2UgYXJlIHRlbXBvcmFyaWx5IGltcG9ydGluZyB0aGUgZXhpc3Rpbmcgdmlld0VuZ2luZSBmcm9tIGNvcmUgc28gd2UgY2FuIGJlIHN1cmUgd2UgYXJlXG4vLyBjb3JyZWN0bHkgaW1wbGVtZW50aW5nIGl0cyBpbnRlcmZhY2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtTYW5pdGl6ZXJ9IGZyb20gJy4uL3Nhbml0aXphdGlvbi9zYW5pdGl6ZXInO1xuaW1wb3J0IHthc3NlcnREZWZpbmVkLCBhc3NlcnRJbmRleEluUmFuZ2V9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHthc3NlcnRDb21wb25lbnRUeXBlfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge2dldENvbXBvbmVudERlZn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7ZGlQdWJsaWNJbkluamVjdG9yLCBnZXRPckNyZWF0ZU5vZGVJbmplY3RvckZvck5vZGV9IGZyb20gJy4vZGknO1xuaW1wb3J0IHt0aHJvd1Byb3ZpZGVyTm90Rm91bmRFcnJvcn0gZnJvbSAnLi9lcnJvcnNfZGknO1xuaW1wb3J0IHtyZWdpc3RlclBvc3RPcmRlckhvb2tzfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7YWRkVG9WaWV3VHJlZSwgQ0xFQU5fUFJPTUlTRSwgY3JlYXRlTFZpZXcsIGNyZWF0ZVRWaWV3LCBnZXRPckNyZWF0ZVRDb21wb25lbnRWaWV3LCBnZXRPckNyZWF0ZVROb2RlLCBpbml0VE5vZGVGbGFncywgaW5zdGFudGlhdGVSb290Q29tcG9uZW50LCBpbnZva2VIb3N0QmluZGluZ3NJbkNyZWF0aW9uTW9kZSwgbG9jYXRlSG9zdEVsZW1lbnQsIG1hcmtBc0NvbXBvbmVudEhvc3QsIHJlZnJlc2hWaWV3LCByZWdpc3Rlckhvc3RCaW5kaW5nT3BDb2RlcywgcmVuZGVyVmlld30gZnJvbSAnLi9pbnN0cnVjdGlvbnMvc2hhcmVkJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBDb21wb25lbnRUeXBlLCBSZW5kZXJGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtURWxlbWVudE5vZGUsIFROb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtQbGF5ZXJIYW5kbGVyfSBmcm9tICcuL2ludGVyZmFjZXMvcGxheWVyJztcbmltcG9ydCB7ZG9tUmVuZGVyZXJGYWN0b3J5MywgUmVuZGVyZXIzLCBSZW5kZXJlckZhY3RvcnkzfSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtSRWxlbWVudH0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlbmRlcmVyX2RvbSc7XG5pbXBvcnQge0NPTlRFWFQsIEhFQURFUl9PRkZTRVQsIExWaWV3LCBMVmlld0ZsYWdzLCBSb290Q29udGV4dCwgUm9vdENvbnRleHRGbGFncywgVFZJRVcsIFRWaWV3VHlwZX0gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHt3cml0ZURpcmVjdENsYXNzLCB3cml0ZURpcmVjdFN0eWxlfSBmcm9tICcuL25vZGVfbWFuaXB1bGF0aW9uJztcbmltcG9ydCB7ZW50ZXJWaWV3LCBnZXRDdXJyZW50VE5vZGUsIGdldExWaWV3LCBsZWF2ZVZpZXcsIHNldFNlbGVjdGVkSW5kZXh9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtjb21wdXRlU3RhdGljU3R5bGluZ30gZnJvbSAnLi9zdHlsaW5nL3N0YXRpY19zdHlsaW5nJztcbmltcG9ydCB7c2V0VXBBdHRyaWJ1dGVzfSBmcm9tICcuL3V0aWwvYXR0cnNfdXRpbHMnO1xuaW1wb3J0IHtwdWJsaXNoRGVmYXVsdEdsb2JhbFV0aWxzfSBmcm9tICcuL3V0aWwvZ2xvYmFsX3V0aWxzJztcbmltcG9ydCB7ZGVmYXVsdFNjaGVkdWxlcn0gZnJvbSAnLi91dGlsL21pc2NfdXRpbHMnO1xuaW1wb3J0IHtnZXRSb290Q29udGV4dH0gZnJvbSAnLi91dGlsL3ZpZXdfdHJhdmVyc2FsX3V0aWxzJztcblxuXG5cbi8qKiBPcHRpb25zIHRoYXQgY29udHJvbCBob3cgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgYm9vdHN0cmFwcGVkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVDb21wb25lbnRPcHRpb25zIHtcbiAgLyoqIFdoaWNoIHJlbmRlcmVyIGZhY3RvcnkgdG8gdXNlLiAqL1xuICByZW5kZXJlckZhY3Rvcnk/OiBSZW5kZXJlckZhY3RvcnkzO1xuXG4gIC8qKiBBIGN1c3RvbSBzYW5pdGl6ZXIgaW5zdGFuY2UgKi9cbiAgc2FuaXRpemVyPzogU2FuaXRpemVyO1xuXG4gIC8qKiBBIGN1c3RvbSBhbmltYXRpb24gcGxheWVyIGhhbmRsZXIgKi9cbiAgcGxheWVySGFuZGxlcj86IFBsYXllckhhbmRsZXI7XG5cbiAgLyoqXG4gICAqIEhvc3QgZWxlbWVudCBvbiB3aGljaCB0aGUgY29tcG9uZW50IHdpbGwgYmUgYm9vdHN0cmFwcGVkLiBJZiBub3Qgc3BlY2lmaWVkLFxuICAgKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24ncyBgdGFnYCBpcyB1c2VkIHRvIHF1ZXJ5IHRoZSBleGlzdGluZyBET00gZm9yIHRoZVxuICAgKiBlbGVtZW50IHRvIGJvb3RzdHJhcC5cbiAgICovXG4gIGhvc3Q/OiBSRWxlbWVudHxzdHJpbmc7XG5cbiAgLyoqIE1vZHVsZSBpbmplY3RvciBmb3IgdGhlIGNvbXBvbmVudC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBpbmplY3RvciB3aWxsIGJlIE5VTExfSU5KRUNUT1IuICovXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgZmVhdHVyZXMgdG8gYmUgYXBwbGllZCB0byB0aGUgY3JlYXRlZCBjb21wb25lbnQuIEZlYXR1cmVzIGFyZSBzaW1wbHlcbiAgICogZnVuY3Rpb25zIHRoYXQgZGVjb3JhdGUgYSBjb21wb25lbnQgd2l0aCBhIGNlcnRhaW4gYmVoYXZpb3IuXG4gICAqXG4gICAqIFR5cGljYWxseSwgdGhlIGZlYXR1cmVzIGluIHRoaXMgbGlzdCBhcmUgZmVhdHVyZXMgdGhhdCBjYW5ub3QgYmUgYWRkZWQgdG8gdGhlXG4gICAqIG90aGVyIGZlYXR1cmVzIGxpc3QgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uIGJlY2F1c2UgdGhleSByZWx5IG9uIG90aGVyIGZhY3RvcnMuXG4gICAqXG4gICAqIEV4YW1wbGU6IGBMaWZlY3ljbGVIb29rc0ZlYXR1cmVgIGlzIGEgZnVuY3Rpb24gdGhhdCBhZGRzIGxpZmVjeWNsZSBob29rIGNhcGFiaWxpdGllc1xuICAgKiB0byByb290IGNvbXBvbmVudHMgaW4gYSB0cmVlLXNoYWthYmxlIHdheS4gSXQgY2Fubm90IGJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnRcbiAgICogZmVhdHVyZXMgbGlzdCBiZWNhdXNlIHRoZXJlJ3Mgbm8gd2F5IG9mIGtub3dpbmcgd2hlbiB0aGUgY29tcG9uZW50IHdpbGwgYmUgdXNlZCBhc1xuICAgKiBhIHJvb3QgY29tcG9uZW50LlxuICAgKi9cbiAgaG9zdEZlYXR1cmVzPzogSG9zdEZlYXR1cmVbXTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB3aGljaCBpcyB1c2VkIHRvIHNjaGVkdWxlIGNoYW5nZSBkZXRlY3Rpb24gd29yayBpbiB0aGUgZnV0dXJlLlxuICAgKlxuICAgKiBXaGVuIG1hcmtpbmcgY29tcG9uZW50cyBhcyBkaXJ0eSwgaXQgaXMgbmVjZXNzYXJ5IHRvIHNjaGVkdWxlIHRoZSB3b3JrIG9mXG4gICAqIGNoYW5nZSBkZXRlY3Rpb24gaW4gdGhlIGZ1dHVyZS4gVGhpcyBpcyBkb25lIHRvIGNvYWxlc2NlIG11bHRpcGxlXG4gICAqIHtAbGluayBtYXJrRGlydHl9IGNhbGxzIGludG8gYSBzaW5nbGUgY2hhbmdlZCBkZXRlY3Rpb24gcHJvY2Vzc2luZy5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHNjaGVkdWxlciBpcyB0aGUgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZnVuY3Rpb24uXG4gICAqXG4gICAqIEl0IGlzIGFsc28gdXNlZnVsIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb24gZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAqL1xuICBzY2hlZHVsZXI/OiAod29yazogKCkgPT4gdm9pZCkgPT4gdm9pZDtcbn1cblxuLyoqIFNlZSBDcmVhdGVDb21wb25lbnRPcHRpb25zLmhvc3RGZWF0dXJlcyAqL1xudHlwZSBIb3N0RmVhdHVyZSA9ICg8VD4oY29tcG9uZW50OiBULCBjb21wb25lbnREZWY6IENvbXBvbmVudERlZjxUPikgPT4gdm9pZCk7XG5cbi8vIFRPRE86IEEgaGFjayB0byBub3QgcHVsbCBpbiB0aGUgTnVsbEluamVjdG9yIGZyb20gQGFuZ3VsYXIvY29yZS5cbmV4cG9ydCBjb25zdCBOVUxMX0lOSkVDVE9SOiBJbmplY3RvciA9IHtcbiAgZ2V0OiAodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSkgPT4ge1xuICAgIHRocm93UHJvdmlkZXJOb3RGb3VuZEVycm9yKHRva2VuLCAnTnVsbEluamVjdG9yJyk7XG4gIH1cbn07XG5cbi8qKlxuICogQm9vdHN0cmFwcyBhIENvbXBvbmVudCBpbnRvIGFuIGV4aXN0aW5nIGhvc3QgZWxlbWVudCBhbmQgcmV0dXJucyBhbiBpbnN0YW5jZVxuICogb2YgdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBib290c3RyYXAgYSBjb21wb25lbnQgaW50byB0aGUgRE9NIHRyZWUuIEVhY2ggaW52b2NhdGlvblxuICogb2YgdGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSBhIHNlcGFyYXRlIHRyZWUgb2YgY29tcG9uZW50cywgaW5qZWN0b3JzIGFuZFxuICogY2hhbmdlIGRldGVjdGlvbiBjeWNsZXMgYW5kIGxpZmV0aW1lcy4gVG8gZHluYW1pY2FsbHkgaW5zZXJ0IGEgbmV3IGNvbXBvbmVudFxuICogaW50byBhbiBleGlzdGluZyB0cmVlIHN1Y2ggdGhhdCBpdCBzaGFyZXMgdGhlIHNhbWUgaW5qZWN0aW9uLCBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBhbmQgb2JqZWN0IGxpZmV0aW1lLCB1c2Uge0BsaW5rIFZpZXdDb250YWluZXIjY3JlYXRlQ29tcG9uZW50fS5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50VHlwZSBDb21wb25lbnQgdG8gYm9vdHN0cmFwXG4gKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25hbCBwYXJhbWV0ZXJzIHdoaWNoIGNvbnRyb2wgYm9vdHN0cmFwcGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50PFQ+KFxuICAgIGNvbXBvbmVudFR5cGU6IENvbXBvbmVudFR5cGU8VD58XG4gICAgVHlwZTxUPi8qIFR5cGUgYXMgd29ya2Fyb3VuZCBmb3I6IE1pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy80ODgxICovXG4gICAgLFxuICAgIG9wdHM6IENyZWF0ZUNvbXBvbmVudE9wdGlvbnMgPSB7fSk6IFQge1xuICBuZ0Rldk1vZGUgJiYgcHVibGlzaERlZmF1bHRHbG9iYWxVdGlscygpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0Q29tcG9uZW50VHlwZShjb21wb25lbnRUeXBlKTtcblxuICBjb25zdCByZW5kZXJlckZhY3RvcnkgPSBvcHRzLnJlbmRlcmVyRmFjdG9yeSB8fCBkb21SZW5kZXJlckZhY3RvcnkzO1xuICBjb25zdCBzYW5pdGl6ZXIgPSBvcHRzLnNhbml0aXplciB8fCBudWxsO1xuICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWY8VD4oY29tcG9uZW50VHlwZSkhO1xuICBpZiAoY29tcG9uZW50RGVmLnR5cGUgIT0gY29tcG9uZW50VHlwZSkgKGNvbXBvbmVudERlZiBhcyB7dHlwZTogVHlwZTxhbnk+fSkudHlwZSA9IGNvbXBvbmVudFR5cGU7XG5cbiAgLy8gVGhlIGZpcnN0IGluZGV4IG9mIHRoZSBmaXJzdCBzZWxlY3RvciBpcyB0aGUgdGFnIG5hbWUuXG4gIGNvbnN0IGNvbXBvbmVudFRhZyA9IGNvbXBvbmVudERlZi5zZWxlY3RvcnMhWzBdIVswXSBhcyBzdHJpbmc7XG4gIGNvbnN0IGhvc3RSZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgY29uc3QgaG9zdFJOb2RlID1cbiAgICAgIGxvY2F0ZUhvc3RFbGVtZW50KGhvc3RSZW5kZXJlciwgb3B0cy5ob3N0IHx8IGNvbXBvbmVudFRhZywgY29tcG9uZW50RGVmLmVuY2Fwc3VsYXRpb24pO1xuICBjb25zdCByb290RmxhZ3MgPSBjb21wb25lbnREZWYub25QdXNoID8gTFZpZXdGbGFncy5EaXJ0eSB8IExWaWV3RmxhZ3MuSXNSb290IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExWaWV3RmxhZ3MuQ2hlY2tBbHdheXMgfCBMVmlld0ZsYWdzLklzUm9vdDtcbiAgY29uc3Qgcm9vdENvbnRleHQgPSBjcmVhdGVSb290Q29udGV4dChvcHRzLnNjaGVkdWxlciwgb3B0cy5wbGF5ZXJIYW5kbGVyKTtcblxuICBjb25zdCByZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihob3N0Uk5vZGUsIGNvbXBvbmVudERlZik7XG4gIGNvbnN0IHJvb3RUVmlldyA9IGNyZWF0ZVRWaWV3KFRWaWV3VHlwZS5Sb290LCBudWxsLCBudWxsLCAxLCAwLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgY29uc3Qgcm9vdFZpZXc6IExWaWV3ID0gY3JlYXRlTFZpZXcoXG4gICAgICBudWxsLCByb290VFZpZXcsIHJvb3RDb250ZXh0LCByb290RmxhZ3MsIG51bGwsIG51bGwsIHJlbmRlcmVyRmFjdG9yeSwgcmVuZGVyZXIsIG51bGwsXG4gICAgICBvcHRzLmluamVjdG9yIHx8IG51bGwsIG51bGwpO1xuXG4gIGVudGVyVmlldyhyb290Vmlldyk7XG4gIGxldCBjb21wb25lbnQ6IFQ7XG5cbiAgdHJ5IHtcbiAgICBpZiAocmVuZGVyZXJGYWN0b3J5LmJlZ2luKSByZW5kZXJlckZhY3RvcnkuYmVnaW4oKTtcbiAgICBjb25zdCBjb21wb25lbnRWaWV3ID0gY3JlYXRlUm9vdENvbXBvbmVudFZpZXcoXG4gICAgICAgIGhvc3RSTm9kZSwgY29tcG9uZW50RGVmLCByb290VmlldywgcmVuZGVyZXJGYWN0b3J5LCByZW5kZXJlciwgc2FuaXRpemVyKTtcbiAgICBjb21wb25lbnQgPSBjcmVhdGVSb290Q29tcG9uZW50KFxuICAgICAgICBjb21wb25lbnRWaWV3LCBjb21wb25lbnREZWYsIHJvb3RWaWV3LCByb290Q29udGV4dCwgb3B0cy5ob3N0RmVhdHVyZXMgfHwgbnVsbCk7XG5cbiAgICAvLyBjcmVhdGUgbW9kZSBwYXNzXG4gICAgcmVuZGVyVmlldyhyb290VFZpZXcsIHJvb3RWaWV3LCBudWxsKTtcbiAgICAvLyB1cGRhdGUgbW9kZSBwYXNzXG4gICAgcmVmcmVzaFZpZXcocm9vdFRWaWV3LCByb290VmlldywgbnVsbCwgbnVsbCk7XG5cbiAgfSBmaW5hbGx5IHtcbiAgICBsZWF2ZVZpZXcoKTtcbiAgICBpZiAocmVuZGVyZXJGYWN0b3J5LmVuZCkgcmVuZGVyZXJGYWN0b3J5LmVuZCgpO1xuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHRoZSByb290IGNvbXBvbmVudCB2aWV3IGFuZCB0aGUgcm9vdCBjb21wb25lbnQgbm9kZS5cbiAqXG4gKiBAcGFyYW0gck5vZGUgUmVuZGVyIGhvc3QgZWxlbWVudC5cbiAqIEBwYXJhbSBkZWYgQ29tcG9uZW50RGVmXG4gKiBAcGFyYW0gcm9vdFZpZXcgVGhlIHBhcmVudCB2aWV3IHdoZXJlIHRoZSBob3N0IG5vZGUgaXMgc3RvcmVkXG4gKiBAcGFyYW0gcmVuZGVyZXJGYWN0b3J5IEZhY3RvcnkgdG8gYmUgdXNlZCBmb3IgY3JlYXRpbmcgY2hpbGQgcmVuZGVyZXJzLlxuICogQHBhcmFtIGhvc3RSZW5kZXJlciBUaGUgY3VycmVudCByZW5kZXJlclxuICogQHBhcmFtIHNhbml0aXplciBUaGUgc2FuaXRpemVyLCBpZiBwcm92aWRlZFxuICpcbiAqIEByZXR1cm5zIENvbXBvbmVudCB2aWV3IGNyZWF0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvb3RDb21wb25lbnRWaWV3KFxuICAgIHJOb2RlOiBSRWxlbWVudHxudWxsLCBkZWY6IENvbXBvbmVudERlZjxhbnk+LCByb290VmlldzogTFZpZXcsXG4gICAgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkzLCBob3N0UmVuZGVyZXI6IFJlbmRlcmVyMywgc2FuaXRpemVyPzogU2FuaXRpemVyfG51bGwpOiBMVmlldyB7XG4gIGNvbnN0IHRWaWV3ID0gcm9vdFZpZXdbVFZJRVddO1xuICBjb25zdCBpbmRleCA9IEhFQURFUl9PRkZTRVQ7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRJbmRleEluUmFuZ2Uocm9vdFZpZXcsIGluZGV4KTtcbiAgcm9vdFZpZXdbaW5kZXhdID0gck5vZGU7XG4gIC8vICcjaG9zdCcgaXMgYWRkZWQgaGVyZSBhcyB3ZSBkb24ndCBrbm93IHRoZSByZWFsIGhvc3QgRE9NIG5hbWUgKHdlIGRvbid0IHdhbnQgdG8gcmVhZCBpdCkgYW5kIGF0XG4gIC8vIHRoZSBzYW1lIHRpbWUgd2Ugd2FudCB0byBjb21tdW5pY2F0ZSB0aGUgZGVidWcgYFROb2RlYCB0aGF0IHRoaXMgaXMgYSBzcGVjaWFsIGBUTm9kZWBcbiAgLy8gcmVwcmVzZW50aW5nIGEgaG9zdCBlbGVtZW50LlxuICBjb25zdCB0Tm9kZTogVEVsZW1lbnROb2RlID0gZ2V0T3JDcmVhdGVUTm9kZSh0VmlldywgaW5kZXgsIFROb2RlVHlwZS5FbGVtZW50LCAnI2hvc3QnLCBudWxsKTtcbiAgY29uc3QgbWVyZ2VkQXR0cnMgPSB0Tm9kZS5tZXJnZWRBdHRycyA9IGRlZi5ob3N0QXR0cnM7XG4gIGlmIChtZXJnZWRBdHRycyAhPT0gbnVsbCkge1xuICAgIGNvbXB1dGVTdGF0aWNTdHlsaW5nKHROb2RlLCBtZXJnZWRBdHRycywgdHJ1ZSk7XG4gICAgaWYgKHJOb2RlICE9PSBudWxsKSB7XG4gICAgICBzZXRVcEF0dHJpYnV0ZXMoaG9zdFJlbmRlcmVyLCByTm9kZSwgbWVyZ2VkQXR0cnMpO1xuICAgICAgaWYgKHROb2RlLmNsYXNzZXMgIT09IG51bGwpIHtcbiAgICAgICAgd3JpdGVEaXJlY3RDbGFzcyhob3N0UmVuZGVyZXIsIHJOb2RlLCB0Tm9kZS5jbGFzc2VzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0Tm9kZS5zdHlsZXMgIT09IG51bGwpIHtcbiAgICAgICAgd3JpdGVEaXJlY3RTdHlsZShob3N0UmVuZGVyZXIsIHJOb2RlLCB0Tm9kZS5zdHlsZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZpZXdSZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihyTm9kZSwgZGVmKTtcbiAgY29uc3QgY29tcG9uZW50VmlldyA9IGNyZWF0ZUxWaWV3KFxuICAgICAgcm9vdFZpZXcsIGdldE9yQ3JlYXRlVENvbXBvbmVudFZpZXcoZGVmKSwgbnVsbCxcbiAgICAgIGRlZi5vblB1c2ggPyBMVmlld0ZsYWdzLkRpcnR5IDogTFZpZXdGbGFncy5DaGVja0Fsd2F5cywgcm9vdFZpZXdbaW5kZXhdLCB0Tm9kZSxcbiAgICAgIHJlbmRlcmVyRmFjdG9yeSwgdmlld1JlbmRlcmVyLCBzYW5pdGl6ZXIgfHwgbnVsbCwgbnVsbCwgbnVsbCk7XG5cbiAgaWYgKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcykge1xuICAgIGRpUHVibGljSW5JbmplY3RvcihnZXRPckNyZWF0ZU5vZGVJbmplY3RvckZvck5vZGUodE5vZGUsIHJvb3RWaWV3KSwgdFZpZXcsIGRlZi50eXBlKTtcbiAgICBtYXJrQXNDb21wb25lbnRIb3N0KHRWaWV3LCB0Tm9kZSk7XG4gICAgaW5pdFROb2RlRmxhZ3ModE5vZGUsIHJvb3RWaWV3Lmxlbmd0aCwgMSk7XG4gIH1cblxuICBhZGRUb1ZpZXdUcmVlKHJvb3RWaWV3LCBjb21wb25lbnRWaWV3KTtcblxuICAvLyBTdG9yZSBjb21wb25lbnQgdmlldyBhdCBub2RlIGluZGV4LCB3aXRoIG5vZGUgYXMgdGhlIEhPU1RcbiAgcmV0dXJuIHJvb3RWaWV3W2luZGV4XSA9IGNvbXBvbmVudFZpZXc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJvb3QgY29tcG9uZW50IGFuZCBzZXRzIGl0IHVwIHdpdGggZmVhdHVyZXMgYW5kIGhvc3QgYmluZGluZ3MuIFNoYXJlZCBieVxuICogcmVuZGVyQ29tcG9uZW50KCkgYW5kIFZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290Q29tcG9uZW50PFQ+KFxuICAgIGNvbXBvbmVudFZpZXc6IExWaWV3LCBjb21wb25lbnREZWY6IENvbXBvbmVudERlZjxUPiwgcm9vdExWaWV3OiBMVmlldywgcm9vdENvbnRleHQ6IFJvb3RDb250ZXh0LFxuICAgIGhvc3RGZWF0dXJlczogSG9zdEZlYXR1cmVbXXxudWxsKTogYW55IHtcbiAgY29uc3QgdFZpZXcgPSByb290TFZpZXdbVFZJRVddO1xuICAvLyBDcmVhdGUgZGlyZWN0aXZlIGluc3RhbmNlIHdpdGggZmFjdG9yeSgpIGFuZCBzdG9yZSBhdCBuZXh0IGluZGV4IGluIHZpZXdEYXRhXG4gIGNvbnN0IGNvbXBvbmVudCA9IGluc3RhbnRpYXRlUm9vdENvbXBvbmVudCh0Vmlldywgcm9vdExWaWV3LCBjb21wb25lbnREZWYpO1xuXG4gIHJvb3RDb250ZXh0LmNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICBjb21wb25lbnRWaWV3W0NPTlRFWFRdID0gY29tcG9uZW50O1xuXG4gIGlmIChob3N0RmVhdHVyZXMgIT09IG51bGwpIHtcbiAgICBmb3IgKGNvbnN0IGZlYXR1cmUgb2YgaG9zdEZlYXR1cmVzKSB7XG4gICAgICBmZWF0dXJlKGNvbXBvbmVudCwgY29tcG9uZW50RGVmKTtcbiAgICB9XG4gIH1cblxuICAvLyBXZSB3YW50IHRvIGdlbmVyYXRlIGFuIGVtcHR5IFF1ZXJ5TGlzdCBmb3Igcm9vdCBjb250ZW50IHF1ZXJpZXMgZm9yIGJhY2t3YXJkc1xuICAvLyBjb21wYXRpYmlsaXR5IHdpdGggVmlld0VuZ2luZS5cbiAgaWYgKGNvbXBvbmVudERlZi5jb250ZW50UXVlcmllcykge1xuICAgIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHROb2RlLCAnVE5vZGUgZXhwZWN0ZWQnKTtcbiAgICBjb21wb25lbnREZWYuY29udGVudFF1ZXJpZXMoUmVuZGVyRmxhZ3MuQ3JlYXRlLCBjb21wb25lbnQsIHROb2RlLmRpcmVjdGl2ZVN0YXJ0KTtcbiAgfVxuXG4gIGNvbnN0IHJvb3RUTm9kZSA9IGdldEN1cnJlbnRUTm9kZSgpITtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQocm9vdFROb2RlLCAndE5vZGUgc2hvdWxkIGhhdmUgYmVlbiBhbHJlYWR5IGNyZWF0ZWQnKTtcbiAgaWYgKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcyAmJlxuICAgICAgKGNvbXBvbmVudERlZi5ob3N0QmluZGluZ3MgIT09IG51bGwgfHwgY29tcG9uZW50RGVmLmhvc3RBdHRycyAhPT0gbnVsbCkpIHtcbiAgICBzZXRTZWxlY3RlZEluZGV4KHJvb3RUTm9kZS5pbmRleCk7XG5cbiAgICBjb25zdCByb290VFZpZXcgPSByb290TFZpZXdbVFZJRVddO1xuICAgIHJlZ2lzdGVySG9zdEJpbmRpbmdPcENvZGVzKFxuICAgICAgICByb290VFZpZXcsIHJvb3RUTm9kZSwgcm9vdExWaWV3LCByb290VE5vZGUuZGlyZWN0aXZlU3RhcnQsIHJvb3RUTm9kZS5kaXJlY3RpdmVFbmQsXG4gICAgICAgIGNvbXBvbmVudERlZik7XG5cbiAgICBpbnZva2VIb3N0QmluZGluZ3NJbkNyZWF0aW9uTW9kZShjb21wb25lbnREZWYsIGNvbXBvbmVudCk7XG4gIH1cbiAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdENvbnRleHQoXG4gICAgc2NoZWR1bGVyPzogKHdvcmtGbjogKCkgPT4gdm9pZCkgPT4gdm9pZCwgcGxheWVySGFuZGxlcj86IFBsYXllckhhbmRsZXJ8bnVsbCk6IFJvb3RDb250ZXh0IHtcbiAgcmV0dXJuIHtcbiAgICBjb21wb25lbnRzOiBbXSxcbiAgICBzY2hlZHVsZXI6IHNjaGVkdWxlciB8fCBkZWZhdWx0U2NoZWR1bGVyLFxuICAgIGNsZWFuOiBDTEVBTl9QUk9NSVNFLFxuICAgIHBsYXllckhhbmRsZXI6IHBsYXllckhhbmRsZXIgfHwgbnVsbCxcbiAgICBmbGFnczogUm9vdENvbnRleHRGbGFncy5FbXB0eVxuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgdG8gZW5hYmxlIGxpZmVjeWNsZSBob29rcyBvbiB0aGUgcm9vdCBjb21wb25lbnQuXG4gKlxuICogSW5jbHVkZSB0aGlzIGZlYXR1cmUgd2hlbiBjYWxsaW5nIGByZW5kZXJDb21wb25lbnRgIGlmIHRoZSByb290IGNvbXBvbmVudFxuICogeW91IGFyZSByZW5kZXJpbmcgaGFzIGxpZmVjeWNsZSBob29rcyBkZWZpbmVkLiBPdGhlcndpc2UsIHRoZSBob29rcyB3b24ndFxuICogYmUgY2FsbGVkIHByb3Blcmx5LlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiByZW5kZXJDb21wb25lbnQoQXBwQ29tcG9uZW50LCB7aG9zdEZlYXR1cmVzOiBbTGlmZWN5Y2xlSG9va3NGZWF0dXJlXX0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMaWZlY3ljbGVIb29rc0ZlYXR1cmUoKTogdm9pZCB7XG4gIGNvbnN0IHROb2RlID0gZ2V0Q3VycmVudFROb2RlKCkhO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0Tm9kZSwgJ1ROb2RlIGlzIHJlcXVpcmVkJyk7XG4gIHJlZ2lzdGVyUG9zdE9yZGVySG9va3MoZ2V0TFZpZXcoKVtUVklFV10sIHROb2RlKTtcbn1cblxuLyoqXG4gKiBXYWl0IG9uIGNvbXBvbmVudCB1bnRpbCBpdCBpcyByZW5kZXJlZC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBgUHJvbWlzZWAgd2hpY2ggaXMgcmVzb2x2ZWQgd2hlbiB0aGUgY29tcG9uZW50J3NcbiAqIGNoYW5nZSBkZXRlY3Rpb24gaXMgZXhlY3V0ZWQuIFRoaXMgaXMgZGV0ZXJtaW5lZCBieSBmaW5kaW5nIHRoZSBzY2hlZHVsZXJcbiAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgYGNvbXBvbmVudGAncyByZW5kZXIgdHJlZSBhbmQgd2FpdGluZyB1bnRpbCB0aGUgc2NoZWR1bGVyXG4gKiBmbHVzaGVzLiBJZiBub3RoaW5nIGlzIHNjaGVkdWxlZCwgdGhlIGZ1bmN0aW9uIHJldHVybnMgYSByZXNvbHZlZCBwcm9taXNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKiBgYGBcbiAqIGF3YWl0IHdoZW5SZW5kZXJlZChteUNvbXBvbmVudCk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50IENvbXBvbmVudCB0byB3YWl0IHVwb25cbiAqIEByZXR1cm5zIFByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2hlblJlbmRlcmVkKGNvbXBvbmVudDogYW55KTogUHJvbWlzZTxudWxsPiB7XG4gIHJldHVybiBnZXRSb290Q29udGV4dChjb21wb25lbnQpLmNsZWFuO1xufVxuIl19