/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertComponentType, assertDefined } from './assert';
import { getLElementFromComponent, readPatchedLViewData } from './context_discovery';
import { getComponentDef } from './definition';
import { queueInitHooks, queueLifecycleHooks } from './hooks';
import { CLEAN_PROMISE, baseDirectiveCreate, createLViewData, createTView, detectChangesInternal, enterView, executeInitAndContentHooks, hostElement, leaveView, locateHostElement, setHostBindings, queueHostBindingForCheck, } from './instructions';
import { domRendererFactory3 } from './interfaces/renderer';
import { CONTEXT, INJECTOR, TVIEW } from './interfaces/view';
import { getRootView, stringify } from './util';
// TODO: A hack to not pull in the NullInjector from @angular/core.
export var NULL_INJECTOR = {
    get: function (token, notFoundValue) {
        throw new Error('NullInjector: Not found: ' + stringify(token));
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
export function renderComponent(componentType /* Type as workaround for: Microsoft/TypeScript/issues/4881 */, opts) {
    if (opts === void 0) { opts = {}; }
    ngDevMode && assertComponentType(componentType);
    var rendererFactory = opts.rendererFactory || domRendererFactory3;
    var sanitizer = opts.sanitizer || null;
    var componentDef = getComponentDef(componentType);
    if (componentDef.type != componentType)
        componentDef.type = componentType;
    // The first index of the first selector is the tag name.
    var componentTag = componentDef.selectors[0][0];
    var hostNode = locateHostElement(rendererFactory, opts.host || componentTag);
    var rootFlags = componentDef.onPush ? 4 /* Dirty */ | 64 /* IsRoot */ :
        2 /* CheckAlways */ | 64 /* IsRoot */;
    var rootContext = createRootContext(opts.scheduler || requestAnimationFrame.bind(window), opts.playerHandler || null);
    var rootView = createLViewData(rendererFactory.createRenderer(hostNode, componentDef), createTView(-1, null, 1, 0, null, null, null), rootContext, rootFlags);
    rootView[INJECTOR] = opts.injector || null;
    var oldView = enterView(rootView, null);
    var elementNode;
    var component;
    try {
        if (rendererFactory.begin)
            rendererFactory.begin();
        // Create element node at index 0 in data array
        elementNode = hostElement(componentTag, hostNode, componentDef, sanitizer);
        component = createRootComponent(elementNode, componentDef, rootView, rootContext, opts.hostFeatures || null);
        executeInitAndContentHooks();
        detectChangesInternal(elementNode.data, component);
    }
    finally {
        leaveView(oldView);
        if (rendererFactory.end)
            rendererFactory.end();
    }
    return component;
}
/**
 * Creates a root component and sets it up with features and host bindings. Shared by
 * renderComponent() and ViewContainerRef.createComponent().
 */
export function createRootComponent(elementNode, componentDef, rootView, rootContext, hostFeatures) {
    // Create directive instance with factory() and store at index 0 in directives array
    var component = baseDirectiveCreate(0, componentDef.factory(), componentDef, elementNode);
    if (componentDef.hostBindings)
        queueHostBindingForCheck(0, componentDef.hostVars);
    rootContext.components.push(component);
    elementNode.data[CONTEXT] = component;
    hostFeatures && hostFeatures.forEach(function (feature) { return feature(component, componentDef); });
    setHostBindings(rootView[TVIEW].hostBindings);
    return component;
}
export function createRootContext(scheduler, playerHandler) {
    return {
        components: [],
        scheduler: scheduler,
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
 * renderComponent(AppComponent, {features: [RootLifecycleHooks]});
 * ```
 */
export function LifecycleHooksFeature(component, def) {
    var rootTView = readPatchedLViewData(component)[TVIEW];
    // Root component is always created at dir index 0
    queueInitHooks(0, def.onInit, def.doCheck, rootTView);
    // Directive starting index 0, directive count 1 -> directive flags: 1
    queueLifecycleHooks(1, rootTView);
}
/**
 * Retrieve the root context for any component by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param component any component
 */
function getRootContext(component) {
    var rootContext = getRootView(component)[CONTEXT];
    ngDevMode && assertDefined(rootContext, 'rootContext');
    return rootContext;
}
/**
 * Retrieve the host element of the component.
 *
 * Use this function to retrieve the host element of the component. The host
 * element is the element which the component is associated with.
 *
 * @param component Component for which the host element should be retrieved.
 */
export function getHostElement(component) {
    return getLElementFromComponent(component).native;
}
/**
 * Retrieves the rendered text for a given component.
 *
 * This function retrieves the host element of a component and
 * and then returns the `textContent` for that element. This implies
 * that the text returned will include re-projected content of
 * the component as well.
 *
 * @param component The component to return the content text for.
 */
export function getRenderedText(component) {
    var hostElement = getHostElement(component);
    return hostElement.textContent || '';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBUUgsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGFBQWEsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUM1RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzdDLE9BQU8sRUFBQyxjQUFjLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHNUQsT0FBTyxFQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSx3QkFBd0IsR0FBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JQLE9BQU8sRUFBNkIsbUJBQW1CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RixPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBd0QsS0FBSyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDakgsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxRQUFRLENBQUM7QUF3RDlDLG1FQUFtRTtBQUNuRSxNQUFNLENBQUMsSUFBTSxhQUFhLEdBQWE7SUFDckMsR0FBRyxFQUFFLFVBQUMsS0FBVSxFQUFFLGFBQW1CO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFN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V0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBSSxTQUFZO0lBQzVDLE9BQU8sd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBYSxDQUFDO0FBQzNELENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLFNBQWM7SUFDNUMsSUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sV0FBVyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7QUFDdkMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsU0FBYztJQUN6QyxPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gV2UgYXJlIHRlbXBvcmFyaWx5IGltcG9ydGluZyB0aGUgZXhpc3Rpbmcgdmlld0VuZ2luZSBmcm9tIGNvcmUgc28gd2UgY2FuIGJlIHN1cmUgd2UgYXJlXG4vLyBjb3JyZWN0bHkgaW1wbGVtZW50aW5nIGl0cyBpbnRlcmZhY2VzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge1Nhbml0aXplcn0gZnJvbSAnLi4vc2FuaXRpemF0aW9uL3NlY3VyaXR5JztcblxuaW1wb3J0IHthc3NlcnRDb21wb25lbnRUeXBlLCBhc3NlcnREZWZpbmVkfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge2dldExFbGVtZW50RnJvbUNvbXBvbmVudCwgcmVhZFBhdGNoZWRMVmlld0RhdGF9IGZyb20gJy4vY29udGV4dF9kaXNjb3ZlcnknO1xuaW1wb3J0IHtnZXRDb21wb25lbnREZWZ9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge3F1ZXVlSW5pdEhvb2tzLCBxdWV1ZUxpZmVjeWNsZUhvb2tzfSBmcm9tICcuL2hvb2tzJztcbmltcG9ydCB7UGxheWVySGFuZGxlcn0gZnJvbSAnLi9pbnRlcmZhY2VzL3BsYXllcic7XG5cbmltcG9ydCB7Q0xFQU5fUFJPTUlTRSwgYmFzZURpcmVjdGl2ZUNyZWF0ZSwgY3JlYXRlTFZpZXdEYXRhLCBjcmVhdGVUVmlldywgZGV0ZWN0Q2hhbmdlc0ludGVybmFsLCBlbnRlclZpZXcsIGV4ZWN1dGVJbml0QW5kQ29udGVudEhvb2tzLCBob3N0RWxlbWVudCwgbGVhdmVWaWV3LCBsb2NhdGVIb3N0RWxlbWVudCwgc2V0SG9zdEJpbmRpbmdzLCBxdWV1ZUhvc3RCaW5kaW5nRm9yQ2hlY2ssfSBmcm9tICcuL2luc3RydWN0aW9ucyc7XG5pbXBvcnQge0NvbXBvbmVudERlZiwgQ29tcG9uZW50RGVmSW50ZXJuYWwsIENvbXBvbmVudFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7TEVsZW1lbnROb2RlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1JFbGVtZW50LCBSZW5kZXJlckZhY3RvcnkzLCBkb21SZW5kZXJlckZhY3RvcnkzfSBmcm9tICcuL2ludGVyZmFjZXMvcmVuZGVyZXInO1xuaW1wb3J0IHtDT05URVhULCBJTkpFQ1RPUiwgTFZpZXdEYXRhLCBMVmlld0ZsYWdzLCBSb290Q29udGV4dCwgUm9vdENvbnRleHRGbGFncywgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Z2V0Um9vdFZpZXcsIHN0cmluZ2lmeX0gZnJvbSAnLi91dGlsJztcblxuXG5cbi8qKiBPcHRpb25zIHRoYXQgY29udHJvbCBob3cgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgYm9vdHN0cmFwcGVkLiAqL1xuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVDb21wb25lbnRPcHRpb25zIHtcbiAgLyoqIFdoaWNoIHJlbmRlcmVyIGZhY3RvcnkgdG8gdXNlLiAqL1xuICByZW5kZXJlckZhY3Rvcnk/OiBSZW5kZXJlckZhY3RvcnkzO1xuXG4gIC8qKiBBIGN1c3RvbSBzYW5pdGl6ZXIgaW5zdGFuY2UgKi9cbiAgc2FuaXRpemVyPzogU2FuaXRpemVyO1xuXG4gIC8qKiBBIGN1c3RvbSBhbmltYXRpb24gcGxheWVyIGhhbmRsZXIgKi9cbiAgcGxheWVySGFuZGxlcj86IFBsYXllckhhbmRsZXI7XG5cbiAgLyoqXG4gICAqIEhvc3QgZWxlbWVudCBvbiB3aGljaCB0aGUgY29tcG9uZW50IHdpbGwgYmUgYm9vdHN0cmFwcGVkLiBJZiBub3Qgc3BlY2lmaWVkLFxuICAgKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24ncyBgdGFnYCBpcyB1c2VkIHRvIHF1ZXJ5IHRoZSBleGlzdGluZyBET00gZm9yIHRoZVxuICAgKiBlbGVtZW50IHRvIGJvb3RzdHJhcC5cbiAgICovXG4gIGhvc3Q/OiBSRWxlbWVudHxzdHJpbmc7XG5cbiAgLyoqIE1vZHVsZSBpbmplY3RvciBmb3IgdGhlIGNvbXBvbmVudC4gSWYgdW5zcGVjaWZpZWQsIHRoZSBpbmplY3RvciB3aWxsIGJlIE5VTExfSU5KRUNUT1IuICovXG4gIGluamVjdG9yPzogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgZmVhdHVyZXMgdG8gYmUgYXBwbGllZCB0byB0aGUgY3JlYXRlZCBjb21wb25lbnQuIEZlYXR1cmVzIGFyZSBzaW1wbHlcbiAgICogZnVuY3Rpb25zIHRoYXQgZGVjb3JhdGUgYSBjb21wb25lbnQgd2l0aCBhIGNlcnRhaW4gYmVoYXZpb3IuXG4gICAqXG4gICAqIFR5cGljYWxseSwgdGhlIGZlYXR1cmVzIGluIHRoaXMgbGlzdCBhcmUgZmVhdHVyZXMgdGhhdCBjYW5ub3QgYmUgYWRkZWQgdG8gdGhlXG4gICAqIG90aGVyIGZlYXR1cmVzIGxpc3QgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uIGJlY2F1c2UgdGhleSByZWx5IG9uIG90aGVyIGZhY3RvcnMuXG4gICAqXG4gICAqIEV4YW1wbGU6IGBSb290TGlmZWN5Y2xlSG9va3NgIGlzIGEgZnVuY3Rpb24gdGhhdCBhZGRzIGxpZmVjeWNsZSBob29rIGNhcGFiaWxpdGllc1xuICAgKiB0byByb290IGNvbXBvbmVudHMgaW4gYSB0cmVlLXNoYWthYmxlIHdheS4gSXQgY2Fubm90IGJlIGFkZGVkIHRvIHRoZSBjb21wb25lbnRcbiAgICogZmVhdHVyZXMgbGlzdCBiZWNhdXNlIHRoZXJlJ3Mgbm8gd2F5IG9mIGtub3dpbmcgd2hlbiB0aGUgY29tcG9uZW50IHdpbGwgYmUgdXNlZCBhc1xuICAgKiBhIHJvb3QgY29tcG9uZW50LlxuICAgKi9cbiAgaG9zdEZlYXR1cmVzPzogSG9zdEZlYXR1cmVbXTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB3aGljaCBpcyB1c2VkIHRvIHNjaGVkdWxlIGNoYW5nZSBkZXRlY3Rpb24gd29yayBpbiB0aGUgZnV0dXJlLlxuICAgKlxuICAgKiBXaGVuIG1hcmtpbmcgY29tcG9uZW50cyBhcyBkaXJ0eSwgaXQgaXMgbmVjZXNzYXJ5IHRvIHNjaGVkdWxlIHRoZSB3b3JrIG9mXG4gICAqIGNoYW5nZSBkZXRlY3Rpb24gaW4gdGhlIGZ1dHVyZS4gVGhpcyBpcyBkb25lIHRvIGNvYWxlc2NlIG11bHRpcGxlXG4gICAqIHtAbGluayBtYXJrRGlydHl9IGNhbGxzIGludG8gYSBzaW5nbGUgY2hhbmdlZCBkZXRlY3Rpb24gcHJvY2Vzc2luZy5cbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHNjaGVkdWxlciBpcyB0aGUgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZnVuY3Rpb24uXG4gICAqXG4gICAqIEl0IGlzIGFsc28gdXNlZnVsIHRvIG92ZXJyaWRlIHRoaXMgZnVuY3Rpb24gZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAqL1xuICBzY2hlZHVsZXI/OiAod29yazogKCkgPT4gdm9pZCkgPT4gdm9pZDtcbn1cblxuLyoqIFNlZSBDcmVhdGVDb21wb25lbnRPcHRpb25zLmhvc3RGZWF0dXJlcyAqL1xudHlwZSBIb3N0RmVhdHVyZSA9ICg8VD4oY29tcG9uZW50OiBULCBjb21wb25lbnREZWY6IENvbXBvbmVudERlZjxULCBzdHJpbmc+KSA9PiB2b2lkKTtcblxuLy8gVE9ETzogQSBoYWNrIHRvIG5vdCBwdWxsIGluIHRoZSBOdWxsSW5qZWN0b3IgZnJvbSBAYW5ndWxhci9jb3JlLlxuZXhwb3J0IGNvbnN0IE5VTExfSU5KRUNUT1I6IEluamVjdG9yID0ge1xuICBnZXQ6ICh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOdWxsSW5qZWN0b3I6IE5vdCBmb3VuZDogJyArIHN0cmluZ2lmeSh0b2tlbikpO1xuICB9XG59O1xuXG4vKipcbiAqIEJvb3RzdHJhcHMgYSBDb21wb25lbnQgaW50byBhbiBleGlzdGluZyBob3N0IGVsZW1lbnQgYW5kIHJldHVybnMgYW4gaW5zdGFuY2VcbiAqIG9mIHRoZSBjb21wb25lbnQuXG4gKlxuICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gYm9vdHN0cmFwIGEgY29tcG9uZW50IGludG8gdGhlIERPTSB0cmVlLiBFYWNoIGludm9jYXRpb25cbiAqIG9mIHRoaXMgZnVuY3Rpb24gd2lsbCBjcmVhdGUgYSBzZXBhcmF0ZSB0cmVlIG9mIGNvbXBvbmVudHMsIGluamVjdG9ycyBhbmRcbiAqIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzIGFuZCBsaWZldGltZXMuIFRvIGR5bmFtaWNhbGx5IGluc2VydCBhIG5ldyBjb21wb25lbnRcbiAqIGludG8gYW4gZXhpc3RpbmcgdHJlZSBzdWNoIHRoYXQgaXQgc2hhcmVzIHRoZSBzYW1lIGluamVjdGlvbiwgY2hhbmdlIGRldGVjdGlvblxuICogYW5kIG9iamVjdCBsaWZldGltZSwgdXNlIHtAbGluayBWaWV3Q29udGFpbmVyI2NyZWF0ZUNvbXBvbmVudH0uXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudFR5cGUgQ29tcG9uZW50IHRvIGJvb3RzdHJhcFxuICogQHBhcmFtIG9wdGlvbnMgT3B0aW9uYWwgcGFyYW1ldGVycyB3aGljaCBjb250cm9sIGJvb3RzdHJhcHBpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudDxUPihcbiAgICBjb21wb25lbnRUeXBlOiBDb21wb25lbnRUeXBlPFQ+fFxuICAgICAgICBUeXBlPFQ+LyogVHlwZSBhcyB3b3JrYXJvdW5kIGZvcjogTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzQ4ODEgKi9cbiAgICAsXG4gICAgb3B0czogQ3JlYXRlQ29tcG9uZW50T3B0aW9ucyA9IHt9KTogVCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRDb21wb25lbnRUeXBlKGNvbXBvbmVudFR5cGUpO1xuICBjb25zdCByZW5kZXJlckZhY3RvcnkgPSBvcHRzLnJlbmRlcmVyRmFjdG9yeSB8fCBkb21SZW5kZXJlckZhY3RvcnkzO1xuICBjb25zdCBzYW5pdGl6ZXIgPSBvcHRzLnNhbml0aXplciB8fCBudWxsO1xuICBjb25zdCBjb21wb25lbnREZWYgPSBnZXRDb21wb25lbnREZWY8VD4oY29tcG9uZW50VHlwZSkgITtcbiAgaWYgKGNvbXBvbmVudERlZi50eXBlICE9IGNvbXBvbmVudFR5cGUpIGNvbXBvbmVudERlZi50eXBlID0gY29tcG9uZW50VHlwZTtcblxuICAvLyBUaGUgZmlyc3QgaW5kZXggb2YgdGhlIGZpcnN0IHNlbGVjdG9yIGlzIHRoZSB0YWcgbmFtZS5cbiAgY29uc3QgY29tcG9uZW50VGFnID0gY29tcG9uZW50RGVmLnNlbGVjdG9ycyAhWzBdICFbMF0gYXMgc3RyaW5nO1xuICBjb25zdCBob3N0Tm9kZSA9IGxvY2F0ZUhvc3RFbGVtZW50KHJlbmRlcmVyRmFjdG9yeSwgb3B0cy5ob3N0IHx8IGNvbXBvbmVudFRhZyk7XG4gIGNvbnN0IHJvb3RGbGFncyA9IGNvbXBvbmVudERlZi5vblB1c2ggPyBMVmlld0ZsYWdzLkRpcnR5IHwgTFZpZXdGbGFncy5Jc1Jvb3QgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTFZpZXdGbGFncy5DaGVja0Fsd2F5cyB8IExWaWV3RmxhZ3MuSXNSb290O1xuICBjb25zdCByb290Q29udGV4dCA9IGNyZWF0ZVJvb3RDb250ZXh0KFxuICAgICAgb3B0cy5zY2hlZHVsZXIgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSwgb3B0cy5wbGF5ZXJIYW5kbGVyIHx8IG51bGwpO1xuXG4gIGNvbnN0IHJvb3RWaWV3OiBMVmlld0RhdGEgPSBjcmVhdGVMVmlld0RhdGEoXG4gICAgICByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIoaG9zdE5vZGUsIGNvbXBvbmVudERlZiksXG4gICAgICBjcmVhdGVUVmlldygtMSwgbnVsbCwgMSwgMCwgbnVsbCwgbnVsbCwgbnVsbCksIHJvb3RDb250ZXh0LCByb290RmxhZ3MpO1xuICByb290Vmlld1tJTkpFQ1RPUl0gPSBvcHRzLmluamVjdG9yIHx8IG51bGw7XG5cbiAgY29uc3Qgb2xkVmlldyA9IGVudGVyVmlldyhyb290VmlldywgbnVsbCk7XG4gIGxldCBlbGVtZW50Tm9kZTogTEVsZW1lbnROb2RlO1xuICBsZXQgY29tcG9uZW50OiBUO1xuICB0cnkge1xuICAgIGlmIChyZW5kZXJlckZhY3RvcnkuYmVnaW4pIHJlbmRlcmVyRmFjdG9yeS5iZWdpbigpO1xuXG4gICAgLy8gQ3JlYXRlIGVsZW1lbnQgbm9kZSBhdCBpbmRleCAwIGluIGRhdGEgYXJyYXlcbiAgICBlbGVtZW50Tm9kZSA9IGhvc3RFbGVtZW50KGNvbXBvbmVudFRhZywgaG9zdE5vZGUsIGNvbXBvbmVudERlZiwgc2FuaXRpemVyKTtcbiAgICBjb21wb25lbnQgPSBjcmVhdGVSb290Q29tcG9uZW50KFxuICAgICAgICBlbGVtZW50Tm9kZSwgY29tcG9uZW50RGVmLCByb290Vmlldywgcm9vdENvbnRleHQsIG9wdHMuaG9zdEZlYXR1cmVzIHx8IG51bGwpO1xuXG4gICAgZXhlY3V0ZUluaXRBbmRDb250ZW50SG9va3MoKTtcbiAgICBkZXRlY3RDaGFuZ2VzSW50ZXJuYWwoZWxlbWVudE5vZGUuZGF0YSBhcyBMVmlld0RhdGEsIGNvbXBvbmVudCk7XG4gIH0gZmluYWxseSB7XG4gICAgbGVhdmVWaWV3KG9sZFZpZXcpO1xuICAgIGlmIChyZW5kZXJlckZhY3RvcnkuZW5kKSByZW5kZXJlckZhY3RvcnkuZW5kKCk7XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSByb290IGNvbXBvbmVudCBhbmQgc2V0cyBpdCB1cCB3aXRoIGZlYXR1cmVzIGFuZCBob3N0IGJpbmRpbmdzLiBTaGFyZWQgYnlcbiAqIHJlbmRlckNvbXBvbmVudCgpIGFuZCBWaWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudCgpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm9vdENvbXBvbmVudDxUPihcbiAgICBlbGVtZW50Tm9kZTogTEVsZW1lbnROb2RlLCBjb21wb25lbnREZWY6IENvbXBvbmVudERlZjxULCBzdHJpbmc+LCByb290VmlldzogTFZpZXdEYXRhLFxuICAgIHJvb3RDb250ZXh0OiBSb290Q29udGV4dCwgaG9zdEZlYXR1cmVzOiBIb3N0RmVhdHVyZVtdIHwgbnVsbCk6IGFueSB7XG4gIC8vIENyZWF0ZSBkaXJlY3RpdmUgaW5zdGFuY2Ugd2l0aCBmYWN0b3J5KCkgYW5kIHN0b3JlIGF0IGluZGV4IDAgaW4gZGlyZWN0aXZlcyBhcnJheVxuICBjb25zdCBjb21wb25lbnQgPSBiYXNlRGlyZWN0aXZlQ3JlYXRlKDAsIGNvbXBvbmVudERlZi5mYWN0b3J5KCkgYXMgVCwgY29tcG9uZW50RGVmLCBlbGVtZW50Tm9kZSk7XG5cbiAgaWYgKGNvbXBvbmVudERlZi5ob3N0QmluZGluZ3MpIHF1ZXVlSG9zdEJpbmRpbmdGb3JDaGVjaygwLCBjb21wb25lbnREZWYuaG9zdFZhcnMpO1xuICByb290Q29udGV4dC5jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgKGVsZW1lbnROb2RlLmRhdGEgYXMgTFZpZXdEYXRhKVtDT05URVhUXSA9IGNvbXBvbmVudDtcblxuICBob3N0RmVhdHVyZXMgJiYgaG9zdEZlYXR1cmVzLmZvckVhY2goKGZlYXR1cmUpID0+IGZlYXR1cmUoY29tcG9uZW50LCBjb21wb25lbnREZWYpKTtcbiAgc2V0SG9zdEJpbmRpbmdzKHJvb3RWaWV3W1RWSUVXXS5ob3N0QmluZGluZ3MpO1xuICByZXR1cm4gY29tcG9uZW50O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb290Q29udGV4dChcbiAgICBzY2hlZHVsZXI6ICh3b3JrRm46ICgpID0+IHZvaWQpID0+IHZvaWQsIHBsYXllckhhbmRsZXI/OiBQbGF5ZXJIYW5kbGVyfG51bGwpOiBSb290Q29udGV4dCB7XG4gIHJldHVybiB7XG4gICAgY29tcG9uZW50czogW10sXG4gICAgc2NoZWR1bGVyOiBzY2hlZHVsZXIsXG4gICAgY2xlYW46IENMRUFOX1BST01JU0UsXG4gICAgcGxheWVySGFuZGxlcjogcGxheWVySGFuZGxlciB8fCBudWxsLFxuICAgIGZsYWdzOiBSb290Q29udGV4dEZsYWdzLkVtcHR5XG4gIH07XG59XG5cbi8qKlxuICogVXNlZCB0byBlbmFibGUgbGlmZWN5Y2xlIGhvb2tzIG9uIHRoZSByb290IGNvbXBvbmVudC5cbiAqXG4gKiBJbmNsdWRlIHRoaXMgZmVhdHVyZSB3aGVuIGNhbGxpbmcgYHJlbmRlckNvbXBvbmVudGAgaWYgdGhlIHJvb3QgY29tcG9uZW50XG4gKiB5b3UgYXJlIHJlbmRlcmluZyBoYXMgbGlmZWN5Y2xlIGhvb2tzIGRlZmluZWQuIE90aGVyd2lzZSwgdGhlIGhvb2tzIHdvbid0XG4gKiBiZSBjYWxsZWQgcHJvcGVybHkuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIHJlbmRlckNvbXBvbmVudChBcHBDb21wb25lbnQsIHtmZWF0dXJlczogW1Jvb3RMaWZlY3ljbGVIb29rc119KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gTGlmZWN5Y2xlSG9va3NGZWF0dXJlKGNvbXBvbmVudDogYW55LCBkZWY6IENvbXBvbmVudERlZkludGVybmFsPGFueT4pOiB2b2lkIHtcbiAgY29uc3Qgcm9vdFRWaWV3ID0gcmVhZFBhdGNoZWRMVmlld0RhdGEoY29tcG9uZW50KSAhW1RWSUVXXTtcblxuICAvLyBSb290IGNvbXBvbmVudCBpcyBhbHdheXMgY3JlYXRlZCBhdCBkaXIgaW5kZXggMFxuICBxdWV1ZUluaXRIb29rcygwLCBkZWYub25Jbml0LCBkZWYuZG9DaGVjaywgcm9vdFRWaWV3KTtcbiAgLy8gRGlyZWN0aXZlIHN0YXJ0aW5nIGluZGV4IDAsIGRpcmVjdGl2ZSBjb3VudCAxIC0+IGRpcmVjdGl2ZSBmbGFnczogMVxuICBxdWV1ZUxpZmVjeWNsZUhvb2tzKDEsIHJvb3RUVmlldyk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHJvb3QgY29udGV4dCBmb3IgYW55IGNvbXBvbmVudCBieSB3YWxraW5nIHRoZSBwYXJlbnQgYExWaWV3YCB1bnRpbFxuICogcmVhY2hpbmcgdGhlIHJvb3QgYExWaWV3YC5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50IGFueSBjb21wb25lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0Um9vdENvbnRleHQoY29tcG9uZW50OiBhbnkpOiBSb290Q29udGV4dCB7XG4gIGNvbnN0IHJvb3RDb250ZXh0ID0gZ2V0Um9vdFZpZXcoY29tcG9uZW50KVtDT05URVhUXSBhcyBSb290Q29udGV4dDtcbiAgbmdEZXZNb2RlICYmIGFzc2VydERlZmluZWQocm9vdENvbnRleHQsICdyb290Q29udGV4dCcpO1xuICByZXR1cm4gcm9vdENvbnRleHQ7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGhvc3QgZWxlbWVudCBvZiB0aGUgY29tcG9uZW50LlxuICpcbiAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIHJldHJpZXZlIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhlIGNvbXBvbmVudC4gVGhlIGhvc3RcbiAqIGVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgd2hpY2ggdGhlIGNvbXBvbmVudCBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudCBDb21wb25lbnQgZm9yIHdoaWNoIHRoZSBob3N0IGVsZW1lbnQgc2hvdWxkIGJlIHJldHJpZXZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhvc3RFbGVtZW50PFQ+KGNvbXBvbmVudDogVCk6IEhUTUxFbGVtZW50IHtcbiAgcmV0dXJuIGdldExFbGVtZW50RnJvbUNvbXBvbmVudChjb21wb25lbnQpLm5hdGl2ZSBhcyBhbnk7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSByZW5kZXJlZCB0ZXh0IGZvciBhIGdpdmVuIGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHJpZXZlcyB0aGUgaG9zdCBlbGVtZW50IG9mIGEgY29tcG9uZW50IGFuZFxuICogYW5kIHRoZW4gcmV0dXJucyB0aGUgYHRleHRDb250ZW50YCBmb3IgdGhhdCBlbGVtZW50LiBUaGlzIGltcGxpZXNcbiAqIHRoYXQgdGhlIHRleHQgcmV0dXJuZWQgd2lsbCBpbmNsdWRlIHJlLXByb2plY3RlZCBjb250ZW50IG9mXG4gKiB0aGUgY29tcG9uZW50IGFzIHdlbGwuXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudCBUaGUgY29tcG9uZW50IHRvIHJldHVybiB0aGUgY29udGVudCB0ZXh0IGZvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlcmVkVGV4dChjb21wb25lbnQ6IGFueSk6IHN0cmluZyB7XG4gIGNvbnN0IGhvc3RFbGVtZW50ID0gZ2V0SG9zdEVsZW1lbnQoY29tcG9uZW50KTtcbiAgcmV0dXJuIGhvc3RFbGVtZW50LnRleHRDb250ZW50IHx8ICcnO1xufVxuXG4vKipcbiAqIFdhaXQgb24gY29tcG9uZW50IHVudGlsIGl0IGlzIHJlbmRlcmVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIGBQcm9taXNlYCB3aGljaCBpcyByZXNvbHZlZCB3aGVuIHRoZSBjb21wb25lbnQnc1xuICogY2hhbmdlIGRldGVjdGlvbiBpcyBleGVjdXRlZC4gVGhpcyBpcyBkZXRlcm1pbmVkIGJ5IGZpbmRpbmcgdGhlIHNjaGVkdWxlclxuICogYXNzb2NpYXRlZCB3aXRoIHRoZSBgY29tcG9uZW50YCdzIHJlbmRlciB0cmVlIGFuZCB3YWl0aW5nIHVudGlsIHRoZSBzY2hlZHVsZXJcbiAqIGZsdXNoZXMuIElmIG5vdGhpbmcgaXMgc2NoZWR1bGVkLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHJlc29sdmVkIHByb21pc2UuXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYFxuICogYXdhaXQgd2hlblJlbmRlcmVkKG15Q29tcG9uZW50KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBjb21wb25lbnQgQ29tcG9uZW50IHRvIHdhaXQgdXBvblxuICogQHJldHVybnMgUHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHRoZSBjb21wb25lbnQgaXMgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGVuUmVuZGVyZWQoY29tcG9uZW50OiBhbnkpOiBQcm9taXNlPG51bGw+IHtcbiAgcmV0dXJuIGdldFJvb3RDb250ZXh0KGNvbXBvbmVudCkuY2xlYW47XG59XG4iXX0=