/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Called before each cycle of a view's check to detect whether this is in the
// initState for which we need to call ngOnInit, ngAfterContentInit or ngAfterViewInit
// lifecycle methods. Returns true if this check cycle should call lifecycle
// methods.
export function shiftInitState(view, priorInitState, newInitState) {
    // Only update the InitState if we are currently in the prior state.
    // For example, only move into CallingInit if we are in BeforeInit. Only
    // move into CallingContentInit if we are in CallingInit. Normally this will
    // always be true because of how checkCycle is called in checkAndUpdateView.
    // However, if checkAndUpdateView is called recursively or if an exception is
    // thrown while checkAndUpdateView is running, checkAndUpdateView starts over
    // from the beginning. This ensures the state is monotonically increasing,
    // terminating in the AfterInit state, which ensures the Init methods are called
    // at least once and only once.
    var state = view.state;
    var initState = state & 1792 /* InitState_Mask */;
    if (initState === priorInitState) {
        view.state = (state & ~1792 /* InitState_Mask */) | newInitState;
        view.initIndex = -1;
        return true;
    }
    return initState === newInitState;
}
// Returns true if the lifecycle init method should be called for the node with
// the given init index.
export function shouldCallLifecycleInitHook(view, initState, index) {
    if ((view.state & 1792 /* InitState_Mask */) === initState && view.initIndex <= index) {
        view.initIndex = index + 1;
        return true;
    }
    return false;
}
/**
 * Node instance data.
 *
 * We have a separate type per NodeType to save memory
 * (TextData | ElementData | ProviderData | PureExpressionData | QueryList<any>)
 *
 * To keep our code monomorphic,
 * we prohibit using `NodeData` directly but enforce the use of accessors (`asElementData`, ...).
 * This way, no usage site can get a `NodeData` from view.nodes and then use it for different
 * purposes.
 */
var NodeData = /** @class */ (function () {
    function NodeData() {
    }
    return NodeData;
}());
export { NodeData };
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export function asTextData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export function asElementData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export function asProviderData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export function asPureExpressionData(view, index) {
    return view.nodes[index];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export function asQueryList(view, index) {
    return view.nodes[index];
}
var DebugContext = /** @class */ (function () {
    function DebugContext() {
    }
    return DebugContext;
}());
export { DebugContext };
/**
 * This object is used to prevent cycles in the source files and to have a place where
 * debug mode can hook it. It is lazily filled when `isDevMode` is known.
 */
export var Services = {
    setCurrentNode: undefined,
    createRootView: undefined,
    createEmbeddedView: undefined,
    createComponentView: undefined,
    createNgModuleRef: undefined,
    overrideProvider: undefined,
    overrideComponentView: undefined,
    clearOverrides: undefined,
    checkAndUpdateView: undefined,
    checkNoChangesView: undefined,
    destroyView: undefined,
    resolveDep: undefined,
    createDebugContext: undefined,
    handleEvent: undefined,
    updateDirectives: undefined,
    updateRenderer: undefined,
    dirtyParentQueries: undefined,
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy92aWV3L3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQThYSCw4RUFBOEU7QUFDOUUsc0ZBQXNGO0FBQ3RGLDRFQUE0RTtBQUM1RSxXQUFXO0FBQ1gsTUFBTSx5QkFDRixJQUFjLEVBQUUsY0FBeUIsRUFBRSxZQUF1QjtJQUNwRSxvRUFBb0U7SUFDcEUsd0VBQXdFO0lBQ3hFLDRFQUE0RTtJQUM1RSw0RUFBNEU7SUFDNUUsNkVBQTZFO0lBQzdFLDZFQUE2RTtJQUM3RSwwRUFBMEU7SUFDMUUsZ0ZBQWdGO0lBQ2hGLCtCQUErQjtJQUMvQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3pCLElBQU0sU0FBUyxHQUFHLEtBQUssNEJBQTJCLENBQUM7SUFDbkQsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssR0FBRywwQkFBeUIsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUM7QUFDcEMsQ0FBQztBQUVELCtFQUErRTtBQUMvRSx3QkFBd0I7QUFDeEIsTUFBTSxzQ0FDRixJQUFjLEVBQUUsU0FBb0IsRUFBRSxLQUFhO0lBQ3JELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssNEJBQTJCLENBQUMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDZixDQUFDO0FBSUQ7Ozs7Ozs7Ozs7R0FVRztBQUNIO0lBQUE7SUFBOEMsQ0FBQztJQUFELGVBQUM7QUFBRCxDQUFDLEFBQS9DLElBQStDOztBQVMvQzs7R0FFRztBQUNILE1BQU0scUJBQXFCLElBQWMsRUFBRSxLQUFhO0lBQ3RELE1BQU0sQ0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUErQkQ7O0dBRUc7QUFDSCxNQUFNLHdCQUF3QixJQUFjLEVBQUUsS0FBYTtJQUN6RCxNQUFNLENBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBU0Q7O0dBRUc7QUFDSCxNQUFNLHlCQUF5QixJQUFjLEVBQUUsS0FBYTtJQUMxRCxNQUFNLENBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBU0Q7O0dBRUc7QUFDSCxNQUFNLCtCQUErQixJQUFjLEVBQUUsS0FBYTtJQUNoRSxNQUFNLENBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLHNCQUFzQixJQUFjLEVBQUUsS0FBYTtJQUN2RCxNQUFNLENBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBYUQ7SUFBQTtJQVdBLENBQUM7SUFBRCxtQkFBQztBQUFELENBQUMsQUFYRCxJQVdDOztBQTRDRDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxRQUFRLEdBQWE7SUFDaEMsY0FBYyxFQUFFLFNBQVc7SUFDM0IsY0FBYyxFQUFFLFNBQVc7SUFDM0Isa0JBQWtCLEVBQUUsU0FBVztJQUMvQixtQkFBbUIsRUFBRSxTQUFXO0lBQ2hDLGlCQUFpQixFQUFFLFNBQVc7SUFDOUIsZ0JBQWdCLEVBQUUsU0FBVztJQUM3QixxQkFBcUIsRUFBRSxTQUFXO0lBQ2xDLGNBQWMsRUFBRSxTQUFXO0lBQzNCLGtCQUFrQixFQUFFLFNBQVc7SUFDL0Isa0JBQWtCLEVBQUUsU0FBVztJQUMvQixXQUFXLEVBQUUsU0FBVztJQUN4QixVQUFVLEVBQUUsU0FBVztJQUN2QixrQkFBa0IsRUFBRSxTQUFXO0lBQy9CLFdBQVcsRUFBRSxTQUFXO0lBQ3hCLGdCQUFnQixFQUFFLFNBQVc7SUFDN0IsY0FBYyxFQUFFLFNBQVc7SUFDM0Isa0JBQWtCLEVBQUUsU0FBVztDQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge0Vycm9ySGFuZGxlcn0gZnJvbSAnLi4vZXJyb3JfaGFuZGxlcic7XG5pbXBvcnQge0NvbXBvbmVudEZhY3Rvcnl9IGZyb20gJy4uL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge05nTW9kdWxlUmVmfSBmcm9tICcuLi9saW5rZXIvbmdfbW9kdWxlX2ZhY3RvcnknO1xuaW1wb3J0IHtRdWVyeUxpc3R9IGZyb20gJy4uL2xpbmtlci9xdWVyeV9saXN0JztcbmltcG9ydCB7VGVtcGxhdGVSZWZ9IGZyb20gJy4uL2xpbmtlci90ZW1wbGF0ZV9yZWYnO1xuaW1wb3J0IHtWaWV3Q29udGFpbmVyUmVmfSBmcm9tICcuLi9saW5rZXIvdmlld19jb250YWluZXJfcmVmJztcbmltcG9ydCB7UmVuZGVyZXIyLCBSZW5kZXJlckZhY3RvcnkyLCBSZW5kZXJlclR5cGUyfSBmcm9tICcuLi9yZW5kZXIvYXBpJztcbmltcG9ydCB7U2FuaXRpemVyLCBTZWN1cml0eUNvbnRleHR9IGZyb20gJy4uL3Nhbml0aXphdGlvbi9zZWN1cml0eSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIERlZnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBGYWN0b3J5IGZvciBWaWV3RGVmaW5pdGlvbnMvTmdNb2R1bGVEZWZpbml0aW9ucy5cbiAqIFdlIHVzZSBhIGZ1bmN0aW9uIHNvIHdlIGNhbiByZWV4ZXV0ZSBpdCBpbiBjYXNlIGFuIGVycm9yIGhhcHBlbnMgYW5kIHVzZSB0aGUgZ2l2ZW4gbG9nZ2VyXG4gKiBmdW5jdGlvbiB0byBsb2cgdGhlIGVycm9yIGZyb20gdGhlIGRlZmluaXRpb24gb2YgdGhlIG5vZGUsIHdoaWNoIGlzIHNob3duIGluIGFsbCBicm93c2VyXG4gKiBsb2dzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlZmluaXRpb25GYWN0b3J5PEQgZXh0ZW5kcyBEZWZpbml0aW9uPGFueT4+IHsgKGxvZ2dlcjogTm9kZUxvZ2dlcik6IEQ7IH1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBjYWxsIGNvbnNvbGUuZXJyb3IgYXQgdGhlIHJpZ2h0IHNvdXJjZSBsb2NhdGlvbi4gVGhpcyBpcyBhbiBpbmRpcmVjdGlvblxuICogdmlhIGFub3RoZXIgZnVuY3Rpb24gYXMgYnJvd3NlciB3aWxsIGxvZyB0aGUgbG9jYXRpb24gdGhhdCBhY3R1YWxseSBjYWxsZWRcbiAqIGBjb25zb2xlLmVycm9yYC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOb2RlTG9nZ2VyIHsgKCk6ICgpID0+IHZvaWQ7IH1cblxuZXhwb3J0IGludGVyZmFjZSBEZWZpbml0aW9uPERGIGV4dGVuZHMgRGVmaW5pdGlvbkZhY3Rvcnk8YW55Pj4geyBmYWN0b3J5OiBERnxudWxsOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGVEZWZpbml0aW9uIGV4dGVuZHMgRGVmaW5pdGlvbjxOZ01vZHVsZURlZmluaXRpb25GYWN0b3J5PiB7XG4gIHByb3ZpZGVyczogTmdNb2R1bGVQcm92aWRlckRlZltdO1xuICBwcm92aWRlcnNCeUtleToge1t0b2tlbktleTogc3RyaW5nXTogTmdNb2R1bGVQcm92aWRlckRlZn07XG4gIG1vZHVsZXM6IGFueVtdO1xuICBpc1Jvb3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGVEZWZpbml0aW9uRmFjdG9yeSBleHRlbmRzIERlZmluaXRpb25GYWN0b3J5PE5nTW9kdWxlRGVmaW5pdGlvbj4ge31cblxuZXhwb3J0IGludGVyZmFjZSBWaWV3RGVmaW5pdGlvbiBleHRlbmRzIERlZmluaXRpb248Vmlld0RlZmluaXRpb25GYWN0b3J5PiB7XG4gIGZsYWdzOiBWaWV3RmxhZ3M7XG4gIHVwZGF0ZURpcmVjdGl2ZXM6IFZpZXdVcGRhdGVGbjtcbiAgdXBkYXRlUmVuZGVyZXI6IFZpZXdVcGRhdGVGbjtcbiAgaGFuZGxlRXZlbnQ6IFZpZXdIYW5kbGVFdmVudEZuO1xuICAvKipcbiAgICogT3JkZXI6IERlcHRoIGZpcnN0LlxuICAgKiBFc3BlY2lhbGx5IHByb3ZpZGVycyBhcmUgYmVmb3JlIGVsZW1lbnRzIC8gYW5jaG9ycy5cbiAgICovXG4gIG5vZGVzOiBOb2RlRGVmW107XG4gIC8qKiBhZ2dyZWdhdGVkIE5vZGVGbGFncyBmb3IgYWxsIG5vZGVzICoqL1xuICBub2RlRmxhZ3M6IE5vZGVGbGFncztcbiAgcm9vdE5vZGVGbGFnczogTm9kZUZsYWdzO1xuICBsYXN0UmVuZGVyUm9vdE5vZGU6IE5vZGVEZWZ8bnVsbDtcbiAgYmluZGluZ0NvdW50OiBudW1iZXI7XG4gIG91dHB1dENvdW50OiBudW1iZXI7XG4gIC8qKlxuICAgKiBCaW5hcnkgb3Igb2YgYWxsIHF1ZXJ5IGlkcyB0aGF0IGFyZSBtYXRjaGVkIGJ5IG9uZSBvZiB0aGUgbm9kZXMuXG4gICAqIFRoaXMgaW5jbHVkZXMgcXVlcnkgaWRzIGZyb20gdGVtcGxhdGVzIGFzIHdlbGwuXG4gICAqIFVzZWQgYXMgYSBibG9vbSBmaWx0ZXIuXG4gICAqL1xuICBub2RlTWF0Y2hlZFF1ZXJpZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWaWV3RGVmaW5pdGlvbkZhY3RvcnkgZXh0ZW5kcyBEZWZpbml0aW9uRmFjdG9yeTxWaWV3RGVmaW5pdGlvbj4ge31cblxuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdVcGRhdGVGbiB7IChjaGVjazogTm9kZUNoZWNrRm4sIHZpZXc6IFZpZXdEYXRhKTogdm9pZDsgfVxuXG4vLyBoZWxwZXIgZnVuY3Rpb25zIHRvIGNyZWF0ZSBhbiBvdmVybG9hZGVkIGZ1bmN0aW9uIHR5cGUuXG5leHBvcnQgaW50ZXJmYWNlIE5vZGVDaGVja0ZuIHtcbiAgKHZpZXc6IFZpZXdEYXRhLCBub2RlSW5kZXg6IG51bWJlciwgYXJnU3R5bGU6IEFyZ3VtZW50VHlwZS5EeW5hbWljLCB2YWx1ZXM6IGFueVtdKTogYW55O1xuXG4gICh2aWV3OiBWaWV3RGF0YSwgbm9kZUluZGV4OiBudW1iZXIsIGFyZ1N0eWxlOiBBcmd1bWVudFR5cGUuSW5saW5lLCB2MD86IGFueSwgdjE/OiBhbnksIHYyPzogYW55LFxuICAgdjM/OiBhbnksIHY0PzogYW55LCB2NT86IGFueSwgdjY/OiBhbnksIHY3PzogYW55LCB2OD86IGFueSwgdjk/OiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFyZ3VtZW50VHlwZSB7SW5saW5lID0gMCwgRHluYW1pYyA9IDF9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0hhbmRsZUV2ZW50Rm4ge1xuICAodmlldzogVmlld0RhdGEsIG5vZGVJbmRleDogbnVtYmVyLCBldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IGFueSk6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQml0bWFzayBmb3IgVmlld0RlZmluaXRpb24uZmxhZ3MuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFZpZXdGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBPblB1c2ggPSAxIDw8IDEsXG59XG5cbi8qKlxuICogQSBub2RlIGRlZmluaXRpb24gaW4gdGhlIHZpZXcuXG4gKlxuICogTm90ZTogV2UgdXNlIG9uZSB0eXBlIGZvciBhbGwgbm9kZXMgc28gdGhhdCBsb29wcyB0aGF0IGxvb3Agb3ZlciBhbGwgbm9kZXNcbiAqIG9mIGEgVmlld0RlZmluaXRpb24gc3RheSBtb25vbW9ycGhpYyFcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOb2RlRGVmIHtcbiAgZmxhZ3M6IE5vZGVGbGFncztcbiAgLy8gSW5kZXggb2YgdGhlIG5vZGUgaW4gdmlldyBkYXRhIGFuZCB2aWV3IGRlZmluaXRpb24gKHRob3NlIGFyZSB0aGUgc2FtZSlcbiAgbm9kZUluZGV4OiBudW1iZXI7XG4gIC8vIEluZGV4IG9mIHRoZSBub2RlIGluIHRoZSBjaGVjayBmdW5jdGlvbnNcbiAgLy8gRGlmZmVyIGZyb20gbm9kZUluZGV4IHdoZW4gbm9kZXMgYXJlIGFkZGVkIG9yIHJlbW92ZWQgYXQgcnVudGltZSAoaWUgYWZ0ZXIgY29tcGlsYXRpb24pXG4gIGNoZWNrSW5kZXg6IG51bWJlcjtcbiAgcGFyZW50OiBOb2RlRGVmfG51bGw7XG4gIHJlbmRlclBhcmVudDogTm9kZURlZnxudWxsO1xuICAvKiogdGhpcyBpcyBjaGVja2VkIGFnYWluc3QgTmdDb250ZW50RGVmLmluZGV4IHRvIGZpbmQgbWF0Y2hlZCBub2RlcyAqL1xuICBuZ0NvbnRlbnRJbmRleDogbnVtYmVyfG51bGw7XG4gIC8qKiBudW1iZXIgb2YgdHJhbnNpdGl2ZSBjaGlsZHJlbiAqL1xuICBjaGlsZENvdW50OiBudW1iZXI7XG4gIC8qKiBhZ2dyZWdhdGVkIE5vZGVGbGFncyBmb3IgYWxsIHRyYW5zaXRpdmUgY2hpbGRyZW4gKGRvZXMgbm90IGluY2x1ZGUgc2VsZikgKiovXG4gIGNoaWxkRmxhZ3M6IE5vZGVGbGFncztcbiAgLyoqIGFnZ3JlZ2F0ZWQgTm9kZUZsYWdzIGZvciBhbGwgZGlyZWN0IGNoaWxkcmVuIChkb2VzIG5vdCBpbmNsdWRlIHNlbGYpICoqL1xuICBkaXJlY3RDaGlsZEZsYWdzOiBOb2RlRmxhZ3M7XG5cbiAgYmluZGluZ0luZGV4OiBudW1iZXI7XG4gIGJpbmRpbmdzOiBCaW5kaW5nRGVmW107XG4gIGJpbmRpbmdGbGFnczogQmluZGluZ0ZsYWdzO1xuICBvdXRwdXRJbmRleDogbnVtYmVyO1xuICBvdXRwdXRzOiBPdXRwdXREZWZbXTtcbiAgLyoqXG4gICAqIHJlZmVyZW5jZXMgdGhhdCB0aGUgdXNlciBwbGFjZWQgb24gdGhlIGVsZW1lbnRcbiAgICovXG4gIHJlZmVyZW5jZXM6IHtbcmVmSWQ6IHN0cmluZ106IFF1ZXJ5VmFsdWVUeXBlfTtcbiAgLyoqXG4gICAqIGlkcyBhbmQgdmFsdWUgdHlwZXMgb2YgYWxsIHF1ZXJpZXMgdGhhdCBhcmUgbWF0Y2hlZCBieSB0aGlzIG5vZGUuXG4gICAqL1xuICBtYXRjaGVkUXVlcmllczoge1txdWVyeUlkOiBudW1iZXJdOiBRdWVyeVZhbHVlVHlwZX07XG4gIC8qKiBCaW5hcnkgb3Igb2YgYWxsIG1hdGNoZWQgcXVlcnkgaWRzIG9mIHRoaXMgbm9kZS4gKi9cbiAgbWF0Y2hlZFF1ZXJ5SWRzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBCaW5hcnkgb3Igb2YgYWxsIHF1ZXJ5IGlkcyB0aGF0IGFyZSBtYXRjaGVkIGJ5IG9uZSBvZiB0aGUgY2hpbGRyZW4uXG4gICAqIFRoaXMgaW5jbHVkZXMgcXVlcnkgaWRzIGZyb20gdGVtcGxhdGVzIGFzIHdlbGwuXG4gICAqIFVzZWQgYXMgYSBibG9vbSBmaWx0ZXIuXG4gICAqL1xuICBjaGlsZE1hdGNoZWRRdWVyaWVzOiBudW1iZXI7XG4gIGVsZW1lbnQ6IEVsZW1lbnREZWZ8bnVsbDtcbiAgcHJvdmlkZXI6IFByb3ZpZGVyRGVmfG51bGw7XG4gIHRleHQ6IFRleHREZWZ8bnVsbDtcbiAgcXVlcnk6IFF1ZXJ5RGVmfG51bGw7XG4gIG5nQ29udGVudDogTmdDb250ZW50RGVmfG51bGw7XG59XG5cbi8qKlxuICogQml0bWFzayBmb3IgTm9kZURlZi5mbGFncy5cbiAqIE5hbWluZyBjb252ZW50aW9uOlxuICogLSBgVHlwZS4uLmA6IGZsYWdzIHRoYXQgYXJlIG11dHVhbGx5IGV4Y2x1c2l2ZVxuICogLSBgQ2F0Li4uYDogdW5pb24gb2YgbXVsdGlwbGUgYFR5cGUuLi5gIChzaG9ydCBmb3IgY2F0ZWdvcnkpLlxuICovXG5leHBvcnQgY29uc3QgZW51bSBOb2RlRmxhZ3Mge1xuICBOb25lID0gMCxcbiAgVHlwZUVsZW1lbnQgPSAxIDw8IDAsXG4gIFR5cGVUZXh0ID0gMSA8PCAxLFxuICBQcm9qZWN0ZWRUZW1wbGF0ZSA9IDEgPDwgMixcbiAgQ2F0UmVuZGVyTm9kZSA9IFR5cGVFbGVtZW50IHwgVHlwZVRleHQsXG4gIFR5cGVOZ0NvbnRlbnQgPSAxIDw8IDMsXG4gIFR5cGVQaXBlID0gMSA8PCA0LFxuICBUeXBlUHVyZUFycmF5ID0gMSA8PCA1LFxuICBUeXBlUHVyZU9iamVjdCA9IDEgPDwgNixcbiAgVHlwZVB1cmVQaXBlID0gMSA8PCA3LFxuICBDYXRQdXJlRXhwcmVzc2lvbiA9IFR5cGVQdXJlQXJyYXkgfCBUeXBlUHVyZU9iamVjdCB8IFR5cGVQdXJlUGlwZSxcbiAgVHlwZVZhbHVlUHJvdmlkZXIgPSAxIDw8IDgsXG4gIFR5cGVDbGFzc1Byb3ZpZGVyID0gMSA8PCA5LFxuICBUeXBlRmFjdG9yeVByb3ZpZGVyID0gMSA8PCAxMCxcbiAgVHlwZVVzZUV4aXN0aW5nUHJvdmlkZXIgPSAxIDw8IDExLFxuICBMYXp5UHJvdmlkZXIgPSAxIDw8IDEyLFxuICBQcml2YXRlUHJvdmlkZXIgPSAxIDw8IDEzLFxuICBUeXBlRGlyZWN0aXZlID0gMSA8PCAxNCxcbiAgQ29tcG9uZW50ID0gMSA8PCAxNSxcbiAgQ2F0UHJvdmlkZXJOb0RpcmVjdGl2ZSA9XG4gICAgICBUeXBlVmFsdWVQcm92aWRlciB8IFR5cGVDbGFzc1Byb3ZpZGVyIHwgVHlwZUZhY3RvcnlQcm92aWRlciB8IFR5cGVVc2VFeGlzdGluZ1Byb3ZpZGVyLFxuICBDYXRQcm92aWRlciA9IENhdFByb3ZpZGVyTm9EaXJlY3RpdmUgfCBUeXBlRGlyZWN0aXZlLFxuICBPbkluaXQgPSAxIDw8IDE2LFxuICBPbkRlc3Ryb3kgPSAxIDw8IDE3LFxuICBEb0NoZWNrID0gMSA8PCAxOCxcbiAgT25DaGFuZ2VzID0gMSA8PCAxOSxcbiAgQWZ0ZXJDb250ZW50SW5pdCA9IDEgPDwgMjAsXG4gIEFmdGVyQ29udGVudENoZWNrZWQgPSAxIDw8IDIxLFxuICBBZnRlclZpZXdJbml0ID0gMSA8PCAyMixcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCA9IDEgPDwgMjMsXG4gIEVtYmVkZGVkVmlld3MgPSAxIDw8IDI0LFxuICBDb21wb25lbnRWaWV3ID0gMSA8PCAyNSxcbiAgVHlwZUNvbnRlbnRRdWVyeSA9IDEgPDwgMjYsXG4gIFR5cGVWaWV3UXVlcnkgPSAxIDw8IDI3LFxuICBTdGF0aWNRdWVyeSA9IDEgPDwgMjgsXG4gIER5bmFtaWNRdWVyeSA9IDEgPDwgMjksXG4gIFR5cGVOZ01vZHVsZSA9IDEgPDwgMzAsXG4gIENhdFF1ZXJ5ID0gVHlwZUNvbnRlbnRRdWVyeSB8IFR5cGVWaWV3UXVlcnksXG5cbiAgLy8gbXV0dWFsbHkgZXhjbHVzaXZlIHZhbHVlcy4uLlxuICBUeXBlcyA9IENhdFJlbmRlck5vZGUgfCBUeXBlTmdDb250ZW50IHwgVHlwZVBpcGUgfCBDYXRQdXJlRXhwcmVzc2lvbiB8IENhdFByb3ZpZGVyIHwgQ2F0UXVlcnlcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaW5kaW5nRGVmIHtcbiAgZmxhZ3M6IEJpbmRpbmdGbGFncztcbiAgbnM6IHN0cmluZ3xudWxsO1xuICBuYW1lOiBzdHJpbmd8bnVsbDtcbiAgbm9uTWluaWZpZWROYW1lOiBzdHJpbmd8bnVsbDtcbiAgc2VjdXJpdHlDb250ZXh0OiBTZWN1cml0eUNvbnRleHR8bnVsbDtcbiAgc3VmZml4OiBzdHJpbmd8bnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gQmluZGluZ0ZsYWdzIHtcbiAgVHlwZUVsZW1lbnRBdHRyaWJ1dGUgPSAxIDw8IDAsXG4gIFR5cGVFbGVtZW50Q2xhc3MgPSAxIDw8IDEsXG4gIFR5cGVFbGVtZW50U3R5bGUgPSAxIDw8IDIsXG4gIFR5cGVQcm9wZXJ0eSA9IDEgPDwgMyxcbiAgU3ludGhldGljUHJvcGVydHkgPSAxIDw8IDQsXG4gIFN5bnRoZXRpY0hvc3RQcm9wZXJ0eSA9IDEgPDwgNSxcbiAgQ2F0U3ludGhldGljUHJvcGVydHkgPSBTeW50aGV0aWNQcm9wZXJ0eSB8IFN5bnRoZXRpY0hvc3RQcm9wZXJ0eSxcblxuICAvLyBtdXR1YWxseSBleGNsdXNpdmUgdmFsdWVzLi4uXG4gIFR5cGVzID0gVHlwZUVsZW1lbnRBdHRyaWJ1dGUgfCBUeXBlRWxlbWVudENsYXNzIHwgVHlwZUVsZW1lbnRTdHlsZSB8IFR5cGVQcm9wZXJ0eVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE91dHB1dERlZiB7XG4gIHR5cGU6IE91dHB1dFR5cGU7XG4gIHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8J2NvbXBvbmVudCd8bnVsbDtcbiAgZXZlbnROYW1lOiBzdHJpbmc7XG4gIHByb3BOYW1lOiBzdHJpbmd8bnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IGVudW0gT3V0cHV0VHlwZSB7RWxlbWVudE91dHB1dCwgRGlyZWN0aXZlT3V0cHV0fVxuXG5leHBvcnQgY29uc3QgZW51bSBRdWVyeVZhbHVlVHlwZSB7XG4gIEVsZW1lbnRSZWYgPSAwLFxuICBSZW5kZXJFbGVtZW50ID0gMSxcbiAgVGVtcGxhdGVSZWYgPSAyLFxuICBWaWV3Q29udGFpbmVyUmVmID0gMyxcbiAgUHJvdmlkZXIgPSA0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudERlZiB7XG4gIC8vIHNldCB0byBudWxsIGZvciBgPG5nLWNvbnRhaW5lcj5gXG4gIG5hbWU6IHN0cmluZ3xudWxsO1xuICBuczogc3RyaW5nfG51bGw7XG4gIC8qKiBucywgbmFtZSwgdmFsdWUgKi9cbiAgYXR0cnM6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXVtdfG51bGw7XG4gIHRlbXBsYXRlOiBWaWV3RGVmaW5pdGlvbnxudWxsO1xuICBjb21wb25lbnRQcm92aWRlcjogTm9kZURlZnxudWxsO1xuICBjb21wb25lbnRSZW5kZXJlclR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbDtcbiAgLy8gY2xvc3VyZSB0byBhbGxvdyByZWN1cnNpdmUgY29tcG9uZW50c1xuICBjb21wb25lbnRWaWV3OiBWaWV3RGVmaW5pdGlvbkZhY3Rvcnl8bnVsbDtcbiAgLyoqXG4gICAqIHZpc2libGUgcHVibGljIHByb3ZpZGVycyBmb3IgREkgaW4gdGhlIHZpZXcsXG4gICAqIGFzIHNlZSBmcm9tIHRoaXMgZWxlbWVudC4gVGhpcyBkb2VzIG5vdCBpbmNsdWRlIHByaXZhdGUgcHJvdmlkZXJzLlxuICAgKi9cbiAgcHVibGljUHJvdmlkZXJzOiB7W3Rva2VuS2V5OiBzdHJpbmddOiBOb2RlRGVmfXxudWxsO1xuICAvKipcbiAgICogc2FtZSBhcyB2aXNpYmxlUHVibGljUHJvdmlkZXJzLCBidXQgYWxzbyBpbmNsdWRlcyBwcml2YXRlIHByb3ZpZGVyc1xuICAgKiB0aGF0IGFyZSBsb2NhdGVkIG9uIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGFsbFByb3ZpZGVyczoge1t0b2tlbktleTogc3RyaW5nXTogTm9kZURlZn18bnVsbDtcbiAgaGFuZGxlRXZlbnQ6IEVsZW1lbnRIYW5kbGVFdmVudEZufG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWxlbWVudEhhbmRsZUV2ZW50Rm4geyAodmlldzogVmlld0RhdGEsIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogYW55KTogYm9vbGVhbjsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVyRGVmIHtcbiAgdG9rZW46IGFueTtcbiAgdmFsdWU6IGFueTtcbiAgZGVwczogRGVwRGVmW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdNb2R1bGVQcm92aWRlckRlZiB7XG4gIGZsYWdzOiBOb2RlRmxhZ3M7XG4gIGluZGV4OiBudW1iZXI7XG4gIHRva2VuOiBhbnk7XG4gIHZhbHVlOiBhbnk7XG4gIGRlcHM6IERlcERlZltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlcERlZiB7XG4gIGZsYWdzOiBEZXBGbGFncztcbiAgdG9rZW46IGFueTtcbiAgdG9rZW5LZXk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBCaXRtYXNrIGZvciBESSBmbGFnc1xuICovXG5leHBvcnQgY29uc3QgZW51bSBEZXBGbGFncyB7XG4gIE5vbmUgPSAwLFxuICBTa2lwU2VsZiA9IDEgPDwgMCxcbiAgT3B0aW9uYWwgPSAxIDw8IDEsXG4gIFNlbGYgPSAxIDw8IDIsXG4gIFZhbHVlID0gMSA8PCAzLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHREZWYgeyBwcmVmaXg6IHN0cmluZzsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5RGVmIHtcbiAgaWQ6IG51bWJlcjtcbiAgLy8gdmFyaWFudCBvZiB0aGUgaWQgdGhhdCBjYW4gYmUgdXNlZCB0byBjaGVjayBhZ2FpbnN0IE5vZGVEZWYubWF0Y2hlZFF1ZXJ5SWRzLCAuLi5cbiAgZmlsdGVySWQ6IG51bWJlcjtcbiAgYmluZGluZ3M6IFF1ZXJ5QmluZGluZ0RlZltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5QmluZGluZ0RlZiB7XG4gIHByb3BOYW1lOiBzdHJpbmc7XG4gIGJpbmRpbmdUeXBlOiBRdWVyeUJpbmRpbmdUeXBlO1xufVxuXG5leHBvcnQgY29uc3QgZW51bSBRdWVyeUJpbmRpbmdUeXBlIHtGaXJzdCA9IDAsIEFsbCA9IDF9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmdDb250ZW50RGVmIHtcbiAgLyoqXG4gICAqIHRoaXMgaW5kZXggaXMgY2hlY2tlZCBhZ2FpbnN0IE5vZGVEZWYubmdDb250ZW50SW5kZXggdG8gZmluZCB0aGUgbm9kZXNcbiAgICogdGhhdCBhcmUgbWF0Y2hlZCBieSB0aGlzIG5nLWNvbnRlbnQuXG4gICAqIE5vdGUgdGhhdCBhIE5vZGVEZWYgd2l0aCBhbiBuZy1jb250ZW50IGNhbiBiZSByZXByb2plY3RlZCwgaS5lLlxuICAgKiBoYXZlIGEgbmdDb250ZW50SW5kZXggb24gaXRzIG93bi5cbiAgICovXG4gIGluZGV4OiBudW1iZXI7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIERhdGFcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGludGVyZmFjZSBOZ01vZHVsZURhdGEgZXh0ZW5kcyBJbmplY3RvciwgTmdNb2R1bGVSZWY8YW55PiB7XG4gIC8vIE5vdGU6IHdlIGFyZSB1c2luZyB0aGUgcHJlZml4IF8gYXMgTmdNb2R1bGVEYXRhIGlzIGFuIE5nTW9kdWxlUmVmIGFuZCB0aGVyZWZvcmUgZGlyZWN0bHlcbiAgLy8gZXhwb3NlZCB0byB0aGUgdXNlci5cbiAgX2RlZjogTmdNb2R1bGVEZWZpbml0aW9uO1xuICBfcGFyZW50OiBJbmplY3RvcjtcbiAgX3Byb3ZpZGVyczogYW55W107XG59XG5cbi8qKlxuICogVmlldyBpbnN0YW5jZSBkYXRhLlxuICogQXR0ZW50aW9uOiBBZGRpbmcgZmllbGRzIHRvIHRoaXMgaXMgcGVyZm9ybWFuY2Ugc2Vuc2l0aXZlIVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZpZXdEYXRhIHtcbiAgZGVmOiBWaWV3RGVmaW5pdGlvbjtcbiAgcm9vdDogUm9vdERhdGE7XG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIC8vIGluZGV4IG9mIGNvbXBvbmVudCBwcm92aWRlciAvIGFuY2hvci5cbiAgcGFyZW50Tm9kZURlZjogTm9kZURlZnxudWxsO1xuICBwYXJlbnQ6IFZpZXdEYXRhfG51bGw7XG4gIHZpZXdDb250YWluZXJQYXJlbnQ6IFZpZXdEYXRhfG51bGw7XG4gIGNvbXBvbmVudDogYW55O1xuICBjb250ZXh0OiBhbnk7XG4gIC8vIEF0dGVudGlvbjogTmV2ZXIgbG9vcCBvdmVyIHRoaXMsIGFzIHRoaXMgd2lsbFxuICAvLyBjcmVhdGUgYSBwb2x5bW9ycGhpYyB1c2FnZSBzaXRlLlxuICAvLyBJbnN0ZWFkOiBBbHdheXMgbG9vcCBvdmVyIFZpZXdEZWZpbml0aW9uLm5vZGVzLFxuICAvLyBhbmQgY2FsbCB0aGUgcmlnaHQgYWNjZXNzb3IgKGUuZy4gYGVsZW1lbnREYXRhYCkgYmFzZWQgb25cbiAgLy8gdGhlIE5vZGVUeXBlLlxuICBub2Rlczoge1trZXk6IG51bWJlcl06IE5vZGVEYXRhfTtcbiAgc3RhdGU6IFZpZXdTdGF0ZTtcbiAgb2xkVmFsdWVzOiBhbnlbXTtcbiAgZGlzcG9zYWJsZXM6IERpc3Bvc2FibGVGbltdfG51bGw7XG4gIGluaXRJbmRleDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEJpdG1hc2sgb2Ygc3RhdGVzXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFZpZXdTdGF0ZSB7XG4gIEJlZm9yZUZpcnN0Q2hlY2sgPSAxIDw8IDAsXG4gIEZpcnN0Q2hlY2sgPSAxIDw8IDEsXG4gIEF0dGFjaGVkID0gMSA8PCAyLFxuICBDaGVja3NFbmFibGVkID0gMSA8PCAzLFxuICBJc1Byb2plY3RlZFZpZXcgPSAxIDw8IDQsXG4gIENoZWNrUHJvamVjdGVkVmlldyA9IDEgPDwgNSxcbiAgQ2hlY2tQcm9qZWN0ZWRWaWV3cyA9IDEgPDwgNixcbiAgRGVzdHJveWVkID0gMSA8PCA3LFxuXG4gIC8vIEluaXRTdGF0ZSBVc2VzIDMgYml0c1xuICBJbml0U3RhdGVfTWFzayA9IDcgPDwgOCxcbiAgSW5pdFN0YXRlX0JlZm9yZUluaXQgPSAwIDw8IDgsXG4gIEluaXRTdGF0ZV9DYWxsaW5nT25Jbml0ID0gMSA8PCA4LFxuICBJbml0U3RhdGVfQ2FsbGluZ0FmdGVyQ29udGVudEluaXQgPSAyIDw8IDgsXG4gIEluaXRTdGF0ZV9DYWxsaW5nQWZ0ZXJWaWV3SW5pdCA9IDMgPDwgOCxcbiAgSW5pdFN0YXRlX0FmdGVySW5pdCA9IDQgPDwgOCxcblxuICBDYXREZXRlY3RDaGFuZ2VzID0gQXR0YWNoZWQgfCBDaGVja3NFbmFibGVkLFxuICBDYXRJbml0ID0gQmVmb3JlRmlyc3RDaGVjayB8IENhdERldGVjdENoYW5nZXMgfCBJbml0U3RhdGVfQmVmb3JlSW5pdFxufVxuXG4vLyBDYWxsZWQgYmVmb3JlIGVhY2ggY3ljbGUgb2YgYSB2aWV3J3MgY2hlY2sgdG8gZGV0ZWN0IHdoZXRoZXIgdGhpcyBpcyBpbiB0aGVcbi8vIGluaXRTdGF0ZSBmb3Igd2hpY2ggd2UgbmVlZCB0byBjYWxsIG5nT25Jbml0LCBuZ0FmdGVyQ29udGVudEluaXQgb3IgbmdBZnRlclZpZXdJbml0XG4vLyBsaWZlY3ljbGUgbWV0aG9kcy4gUmV0dXJucyB0cnVlIGlmIHRoaXMgY2hlY2sgY3ljbGUgc2hvdWxkIGNhbGwgbGlmZWN5Y2xlXG4vLyBtZXRob2RzLlxuZXhwb3J0IGZ1bmN0aW9uIHNoaWZ0SW5pdFN0YXRlKFxuICAgIHZpZXc6IFZpZXdEYXRhLCBwcmlvckluaXRTdGF0ZTogVmlld1N0YXRlLCBuZXdJbml0U3RhdGU6IFZpZXdTdGF0ZSk6IGJvb2xlYW4ge1xuICAvLyBPbmx5IHVwZGF0ZSB0aGUgSW5pdFN0YXRlIGlmIHdlIGFyZSBjdXJyZW50bHkgaW4gdGhlIHByaW9yIHN0YXRlLlxuICAvLyBGb3IgZXhhbXBsZSwgb25seSBtb3ZlIGludG8gQ2FsbGluZ0luaXQgaWYgd2UgYXJlIGluIEJlZm9yZUluaXQuIE9ubHlcbiAgLy8gbW92ZSBpbnRvIENhbGxpbmdDb250ZW50SW5pdCBpZiB3ZSBhcmUgaW4gQ2FsbGluZ0luaXQuIE5vcm1hbGx5IHRoaXMgd2lsbFxuICAvLyBhbHdheXMgYmUgdHJ1ZSBiZWNhdXNlIG9mIGhvdyBjaGVja0N5Y2xlIGlzIGNhbGxlZCBpbiBjaGVja0FuZFVwZGF0ZVZpZXcuXG4gIC8vIEhvd2V2ZXIsIGlmIGNoZWNrQW5kVXBkYXRlVmlldyBpcyBjYWxsZWQgcmVjdXJzaXZlbHkgb3IgaWYgYW4gZXhjZXB0aW9uIGlzXG4gIC8vIHRocm93biB3aGlsZSBjaGVja0FuZFVwZGF0ZVZpZXcgaXMgcnVubmluZywgY2hlY2tBbmRVcGRhdGVWaWV3IHN0YXJ0cyBvdmVyXG4gIC8vIGZyb20gdGhlIGJlZ2lubmluZy4gVGhpcyBlbnN1cmVzIHRoZSBzdGF0ZSBpcyBtb25vdG9uaWNhbGx5IGluY3JlYXNpbmcsXG4gIC8vIHRlcm1pbmF0aW5nIGluIHRoZSBBZnRlckluaXQgc3RhdGUsIHdoaWNoIGVuc3VyZXMgdGhlIEluaXQgbWV0aG9kcyBhcmUgY2FsbGVkXG4gIC8vIGF0IGxlYXN0IG9uY2UgYW5kIG9ubHkgb25jZS5cbiAgY29uc3Qgc3RhdGUgPSB2aWV3LnN0YXRlO1xuICBjb25zdCBpbml0U3RhdGUgPSBzdGF0ZSAmIFZpZXdTdGF0ZS5Jbml0U3RhdGVfTWFzaztcbiAgaWYgKGluaXRTdGF0ZSA9PT0gcHJpb3JJbml0U3RhdGUpIHtcbiAgICB2aWV3LnN0YXRlID0gKHN0YXRlICYgflZpZXdTdGF0ZS5Jbml0U3RhdGVfTWFzaykgfCBuZXdJbml0U3RhdGU7XG4gICAgdmlldy5pbml0SW5kZXggPSAtMTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gaW5pdFN0YXRlID09PSBuZXdJbml0U3RhdGU7XG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgbGlmZWN5Y2xlIGluaXQgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgZm9yIHRoZSBub2RlIHdpdGhcbi8vIHRoZSBnaXZlbiBpbml0IGluZGV4LlxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZENhbGxMaWZlY3ljbGVJbml0SG9vayhcbiAgICB2aWV3OiBWaWV3RGF0YSwgaW5pdFN0YXRlOiBWaWV3U3RhdGUsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgaWYgKCh2aWV3LnN0YXRlICYgVmlld1N0YXRlLkluaXRTdGF0ZV9NYXNrKSA9PT0gaW5pdFN0YXRlICYmIHZpZXcuaW5pdEluZGV4IDw9IGluZGV4KSB7XG4gICAgdmlldy5pbml0SW5kZXggPSBpbmRleCArIDE7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc3Bvc2FibGVGbiB7ICgpOiB2b2lkOyB9XG5cbi8qKlxuICogTm9kZSBpbnN0YW5jZSBkYXRhLlxuICpcbiAqIFdlIGhhdmUgYSBzZXBhcmF0ZSB0eXBlIHBlciBOb2RlVHlwZSB0byBzYXZlIG1lbW9yeVxuICogKFRleHREYXRhIHwgRWxlbWVudERhdGEgfCBQcm92aWRlckRhdGEgfCBQdXJlRXhwcmVzc2lvbkRhdGEgfCBRdWVyeUxpc3Q8YW55PilcbiAqXG4gKiBUbyBrZWVwIG91ciBjb2RlIG1vbm9tb3JwaGljLFxuICogd2UgcHJvaGliaXQgdXNpbmcgYE5vZGVEYXRhYCBkaXJlY3RseSBidXQgZW5mb3JjZSB0aGUgdXNlIG9mIGFjY2Vzc29ycyAoYGFzRWxlbWVudERhdGFgLCAuLi4pLlxuICogVGhpcyB3YXksIG5vIHVzYWdlIHNpdGUgY2FuIGdldCBhIGBOb2RlRGF0YWAgZnJvbSB2aWV3Lm5vZGVzIGFuZCB0aGVuIHVzZSBpdCBmb3IgZGlmZmVyZW50XG4gKiBwdXJwb3Nlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vZGVEYXRhIHsgcHJpdmF0ZSBfX2JyYW5kOiBhbnk7IH1cblxuLyoqXG4gKiBEYXRhIGZvciBhbiBpbnN0YW50aWF0ZWQgTm9kZVR5cGUuVGV4dC5cbiAqXG4gKiBBdHRlbnRpb246IEFkZGluZyBmaWVsZHMgdG8gdGhpcyBpcyBwZXJmb3JtYW5jZSBzZW5zaXRpdmUhXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dERhdGEgeyByZW5kZXJUZXh0OiBhbnk7IH1cblxuLyoqXG4gKiBBY2Nlc3NvciBmb3Igdmlldy5ub2RlcywgZW5mb3JjaW5nIHRoYXQgZXZlcnkgdXNhZ2Ugc2l0ZSBzdGF5cyBtb25vbW9ycGhpYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzVGV4dERhdGEodmlldzogVmlld0RhdGEsIGluZGV4OiBudW1iZXIpOiBUZXh0RGF0YSB7XG4gIHJldHVybiA8YW55PnZpZXcubm9kZXNbaW5kZXhdO1xufVxuXG4vKipcbiAqIERhdGEgZm9yIGFuIGluc3RhbnRpYXRlZCBOb2RlVHlwZS5FbGVtZW50LlxuICpcbiAqIEF0dGVudGlvbjogQWRkaW5nIGZpZWxkcyB0byB0aGlzIGlzIHBlcmZvcm1hbmNlIHNlbnNpdGl2ZSFcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbGVtZW50RGF0YSB7XG4gIHJlbmRlckVsZW1lbnQ6IGFueTtcbiAgY29tcG9uZW50VmlldzogVmlld0RhdGE7XG4gIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJEYXRhfG51bGw7XG4gIHRlbXBsYXRlOiBUZW1wbGF0ZURhdGE7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmlld0NvbnRhaW5lckRhdGEgZXh0ZW5kcyBWaWV3Q29udGFpbmVyUmVmIHtcbiAgLy8gTm90ZTogd2UgYXJlIHVzaW5nIHRoZSBwcmVmaXggXyBhcyBWaWV3Q29udGFpbmVyRGF0YSBpcyBhIFZpZXdDb250YWluZXJSZWYgYW5kIHRoZXJlZm9yZVxuICAvLyBkaXJlY3RseVxuICAvLyBleHBvc2VkIHRvIHRoZSB1c2VyLlxuICBfZW1iZWRkZWRWaWV3czogVmlld0RhdGFbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZW1wbGF0ZURhdGEgZXh0ZW5kcyBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgLy8gdmlld3MgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZCBmcm9tIHRoZSB0ZW1wbGF0ZVxuICAvLyBvZiB0aGlzIGVsZW1lbnQsXG4gIC8vIGJ1dCBpbnNlcnRlZCBpbnRvIHRoZSBlbWJlZGRlZFZpZXdzIG9mIGFub3RoZXIgZWxlbWVudC5cbiAgLy8gQnkgZGVmYXVsdCwgdGhpcyBpcyB1bmRlZmluZWQuXG4gIC8vIE5vdGU6IHdlIGFyZSB1c2luZyB0aGUgcHJlZml4IF8gYXMgVGVtcGxhdGVEYXRhIGlzIGEgVGVtcGxhdGVSZWYgYW5kIHRoZXJlZm9yZSBkaXJlY3RseVxuICAvLyBleHBvc2VkIHRvIHRoZSB1c2VyLlxuICBfcHJvamVjdGVkVmlld3M6IFZpZXdEYXRhW107XG59XG5cbi8qKlxuICogQWNjZXNzb3IgZm9yIHZpZXcubm9kZXMsIGVuZm9yY2luZyB0aGF0IGV2ZXJ5IHVzYWdlIHNpdGUgc3RheXMgbW9ub21vcnBoaWMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc0VsZW1lbnREYXRhKHZpZXc6IFZpZXdEYXRhLCBpbmRleDogbnVtYmVyKTogRWxlbWVudERhdGEge1xuICByZXR1cm4gPGFueT52aWV3Lm5vZGVzW2luZGV4XTtcbn1cblxuLyoqXG4gKiBEYXRhIGZvciBhbiBpbnN0YW50aWF0ZWQgTm9kZVR5cGUuUHJvdmlkZXIuXG4gKlxuICogQXR0ZW50aW9uOiBBZGRpbmcgZmllbGRzIHRvIHRoaXMgaXMgcGVyZm9ybWFuY2Ugc2Vuc2l0aXZlIVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVyRGF0YSB7IGluc3RhbmNlOiBhbnk7IH1cblxuLyoqXG4gKiBBY2Nlc3NvciBmb3Igdmlldy5ub2RlcywgZW5mb3JjaW5nIHRoYXQgZXZlcnkgdXNhZ2Ugc2l0ZSBzdGF5cyBtb25vbW9ycGhpYy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzUHJvdmlkZXJEYXRhKHZpZXc6IFZpZXdEYXRhLCBpbmRleDogbnVtYmVyKTogUHJvdmlkZXJEYXRhIHtcbiAgcmV0dXJuIDxhbnk+dmlldy5ub2Rlc1tpbmRleF07XG59XG5cbi8qKlxuICogRGF0YSBmb3IgYW4gaW5zdGFudGlhdGVkIE5vZGVUeXBlLlB1cmVFeHByZXNzaW9uLlxuICpcbiAqIEF0dGVudGlvbjogQWRkaW5nIGZpZWxkcyB0byB0aGlzIGlzIHBlcmZvcm1hbmNlIHNlbnNpdGl2ZSFcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQdXJlRXhwcmVzc2lvbkRhdGEgeyB2YWx1ZTogYW55OyB9XG5cbi8qKlxuICogQWNjZXNzb3IgZm9yIHZpZXcubm9kZXMsIGVuZm9yY2luZyB0aGF0IGV2ZXJ5IHVzYWdlIHNpdGUgc3RheXMgbW9ub21vcnBoaWMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc1B1cmVFeHByZXNzaW9uRGF0YSh2aWV3OiBWaWV3RGF0YSwgaW5kZXg6IG51bWJlcik6IFB1cmVFeHByZXNzaW9uRGF0YSB7XG4gIHJldHVybiA8YW55PnZpZXcubm9kZXNbaW5kZXhdO1xufVxuXG4vKipcbiAqIEFjY2Vzc29yIGZvciB2aWV3Lm5vZGVzLCBlbmZvcmNpbmcgdGhhdCBldmVyeSB1c2FnZSBzaXRlIHN0YXlzIG1vbm9tb3JwaGljLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNRdWVyeUxpc3QodmlldzogVmlld0RhdGEsIGluZGV4OiBudW1iZXIpOiBRdWVyeUxpc3Q8YW55PiB7XG4gIHJldHVybiA8YW55PnZpZXcubm9kZXNbaW5kZXhdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvb3REYXRhIHtcbiAgaW5qZWN0b3I6IEluamVjdG9yO1xuICBuZ01vZHVsZTogTmdNb2R1bGVSZWY8YW55PjtcbiAgcHJvamVjdGFibGVOb2RlczogYW55W11bXTtcbiAgc2VsZWN0b3JPck5vZGU6IGFueTtcbiAgcmVuZGVyZXI6IFJlbmRlcmVyMjtcbiAgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyO1xuICBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcjtcbiAgc2FuaXRpemVyOiBTYW5pdGl6ZXI7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEZWJ1Z0NvbnRleHQge1xuICBhYnN0cmFjdCBnZXQgdmlldygpOiBWaWV3RGF0YTtcbiAgYWJzdHJhY3QgZ2V0IG5vZGVJbmRleCgpOiBudW1iZXJ8bnVsbDtcbiAgYWJzdHJhY3QgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yO1xuICBhYnN0cmFjdCBnZXQgY29tcG9uZW50KCk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0IHByb3ZpZGVyVG9rZW5zKCk6IGFueVtdO1xuICBhYnN0cmFjdCBnZXQgcmVmZXJlbmNlcygpOiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgYWJzdHJhY3QgZ2V0IGNvbnRleHQoKTogYW55O1xuICBhYnN0cmFjdCBnZXQgY29tcG9uZW50UmVuZGVyRWxlbWVudCgpOiBhbnk7XG4gIGFic3RyYWN0IGdldCByZW5kZXJOb2RlKCk6IGFueTtcbiAgYWJzdHJhY3QgbG9nRXJyb3IoY29uc29sZTogQ29uc29sZSwgLi4udmFsdWVzOiBhbnlbXSk6IHZvaWQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE90aGVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBlbnVtIENoZWNrVHlwZSB7Q2hlY2tBbmRVcGRhdGUsIENoZWNrTm9DaGFuZ2VzfVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb3ZpZGVyT3ZlcnJpZGUge1xuICB0b2tlbjogYW55O1xuICBmbGFnczogTm9kZUZsYWdzO1xuICB2YWx1ZTogYW55O1xuICBkZXBzOiAoW0RlcEZsYWdzLCBhbnldfGFueSlbXTtcbiAgZGVwcmVjYXRlZEJlaGF2aW9yOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlcnZpY2VzIHtcbiAgc2V0Q3VycmVudE5vZGUodmlldzogVmlld0RhdGEsIG5vZGVJbmRleDogbnVtYmVyKTogdm9pZDtcbiAgY3JlYXRlUm9vdFZpZXcoXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXM6IGFueVtdW10sIHJvb3RTZWxlY3Rvck9yTm9kZTogc3RyaW5nfGFueSxcbiAgICAgIGRlZjogVmlld0RlZmluaXRpb24sIG5nTW9kdWxlOiBOZ01vZHVsZVJlZjxhbnk+LCBjb250ZXh0PzogYW55KTogVmlld0RhdGE7XG4gIGNyZWF0ZUVtYmVkZGVkVmlldyhwYXJlbnQ6IFZpZXdEYXRhLCBhbmNob3JEZWY6IE5vZGVEZWYsIHZpZXdEZWY6IFZpZXdEZWZpbml0aW9uLCBjb250ZXh0PzogYW55KTpcbiAgICAgIFZpZXdEYXRhO1xuICBjcmVhdGVDb21wb25lbnRWaWV3KFxuICAgICAgcGFyZW50VmlldzogVmlld0RhdGEsIG5vZGVEZWY6IE5vZGVEZWYsIHZpZXdEZWY6IFZpZXdEZWZpbml0aW9uLCBob3N0RWxlbWVudDogYW55KTogVmlld0RhdGE7XG4gIGNyZWF0ZU5nTW9kdWxlUmVmKFxuICAgICAgbW9kdWxlVHlwZTogVHlwZTxhbnk+LCBwYXJlbnQ6IEluamVjdG9yLCBib290c3RyYXBDb21wb25lbnRzOiBUeXBlPGFueT5bXSxcbiAgICAgIGRlZjogTmdNb2R1bGVEZWZpbml0aW9uKTogTmdNb2R1bGVSZWY8YW55PjtcbiAgb3ZlcnJpZGVQcm92aWRlcihvdmVycmlkZTogUHJvdmlkZXJPdmVycmlkZSk6IHZvaWQ7XG4gIG92ZXJyaWRlQ29tcG9uZW50Vmlldyhjb21wVHlwZTogVHlwZTxhbnk+LCBjb21wRmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxhbnk+KTogdm9pZDtcbiAgY2xlYXJPdmVycmlkZXMoKTogdm9pZDtcbiAgY2hlY2tBbmRVcGRhdGVWaWV3KHZpZXc6IFZpZXdEYXRhKTogdm9pZDtcbiAgY2hlY2tOb0NoYW5nZXNWaWV3KHZpZXc6IFZpZXdEYXRhKTogdm9pZDtcbiAgZGVzdHJveVZpZXcodmlldzogVmlld0RhdGEpOiB2b2lkO1xuICByZXNvbHZlRGVwKFxuICAgICAgdmlldzogVmlld0RhdGEsIGVsRGVmOiBOb2RlRGVmfG51bGwsIGFsbG93UHJpdmF0ZVNlcnZpY2VzOiBib29sZWFuLCBkZXBEZWY6IERlcERlZixcbiAgICAgIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnk7XG4gIGNyZWF0ZURlYnVnQ29udGV4dCh2aWV3OiBWaWV3RGF0YSwgbm9kZUluZGV4OiBudW1iZXIpOiBEZWJ1Z0NvbnRleHQ7XG4gIGhhbmRsZUV2ZW50OiBWaWV3SGFuZGxlRXZlbnRGbjtcbiAgdXBkYXRlRGlyZWN0aXZlczogKHZpZXc6IFZpZXdEYXRhLCBjaGVja1R5cGU6IENoZWNrVHlwZSkgPT4gdm9pZDtcbiAgdXBkYXRlUmVuZGVyZXI6ICh2aWV3OiBWaWV3RGF0YSwgY2hlY2tUeXBlOiBDaGVja1R5cGUpID0+IHZvaWQ7XG4gIGRpcnR5UGFyZW50UXVlcmllczogKHZpZXc6IFZpZXdEYXRhKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIFRoaXMgb2JqZWN0IGlzIHVzZWQgdG8gcHJldmVudCBjeWNsZXMgaW4gdGhlIHNvdXJjZSBmaWxlcyBhbmQgdG8gaGF2ZSBhIHBsYWNlIHdoZXJlXG4gKiBkZWJ1ZyBtb2RlIGNhbiBob29rIGl0LiBJdCBpcyBsYXppbHkgZmlsbGVkIHdoZW4gYGlzRGV2TW9kZWAgaXMga25vd24uXG4gKi9cbmV4cG9ydCBjb25zdCBTZXJ2aWNlczogU2VydmljZXMgPSB7XG4gIHNldEN1cnJlbnROb2RlOiB1bmRlZmluZWQgISxcbiAgY3JlYXRlUm9vdFZpZXc6IHVuZGVmaW5lZCAhLFxuICBjcmVhdGVFbWJlZGRlZFZpZXc6IHVuZGVmaW5lZCAhLFxuICBjcmVhdGVDb21wb25lbnRWaWV3OiB1bmRlZmluZWQgISxcbiAgY3JlYXRlTmdNb2R1bGVSZWY6IHVuZGVmaW5lZCAhLFxuICBvdmVycmlkZVByb3ZpZGVyOiB1bmRlZmluZWQgISxcbiAgb3ZlcnJpZGVDb21wb25lbnRWaWV3OiB1bmRlZmluZWQgISxcbiAgY2xlYXJPdmVycmlkZXM6IHVuZGVmaW5lZCAhLFxuICBjaGVja0FuZFVwZGF0ZVZpZXc6IHVuZGVmaW5lZCAhLFxuICBjaGVja05vQ2hhbmdlc1ZpZXc6IHVuZGVmaW5lZCAhLFxuICBkZXN0cm95VmlldzogdW5kZWZpbmVkICEsXG4gIHJlc29sdmVEZXA6IHVuZGVmaW5lZCAhLFxuICBjcmVhdGVEZWJ1Z0NvbnRleHQ6IHVuZGVmaW5lZCAhLFxuICBoYW5kbGVFdmVudDogdW5kZWZpbmVkICEsXG4gIHVwZGF0ZURpcmVjdGl2ZXM6IHVuZGVmaW5lZCAhLFxuICB1cGRhdGVSZW5kZXJlcjogdW5kZWZpbmVkICEsXG4gIGRpcnR5UGFyZW50UXVlcmllczogdW5kZWZpbmVkICEsXG59O1xuIl19