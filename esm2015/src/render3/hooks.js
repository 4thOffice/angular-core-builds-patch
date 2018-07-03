/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertEqual } from './assert';
import { DIRECTIVES, FLAGS } from './interfaces/view';
/**
 * If this is the first template pass, any ngOnInit or ngDoCheck hooks will be queued into
 * TView.initHooks during directiveCreate.
 *
 * The directive index and hook type are encoded into one number (1st bit: type, remaining bits:
 * directive index), then saved in the even indices of the initHooks array. The odd indices
 * hold the hook functions themselves.
 *
 * @param {?} index The index of the directive in LViewData[DIRECTIVES]
 * @param {?} onInit
 * @param {?} doCheck
 * @param {?} tView The current TView
 * @return {?}
 */
export function queueInitHooks(index, onInit, doCheck, tView) {
    ngDevMode &&
        assertEqual(tView.firstTemplatePass, true, 'Should only be called on first template pass');
    if (onInit) {
        (tView.initHooks || (tView.initHooks = [])).push(index, onInit);
    }
    if (doCheck) {
        (tView.initHooks || (tView.initHooks = [])).push(index, doCheck);
        (tView.checkHooks || (tView.checkHooks = [])).push(index, doCheck);
    }
}
/**
 * Loops through the directives on a node and queues all their hooks except ngOnInit
 * and ngDoCheck, which are queued separately in directiveCreate.
 * @param {?} flags
 * @param {?} tView
 * @return {?}
 */
export function queueLifecycleHooks(flags, tView) {
    if (tView.firstTemplatePass) {
        const /** @type {?} */ start = flags >> 13 /* DirectiveStartingIndexShift */;
        const /** @type {?} */ count = flags & 4095 /* DirectiveCountMask */;
        const /** @type {?} */ end = start + count;
        // It's necessary to loop through the directives at elementEnd() (rather than processing in
        // directiveCreate) so we can preserve the current hook order. Content, view, and destroy
        // hooks for projected components and directives must be called *before* their hosts.
        for (let /** @type {?} */ i = start; i < end; i++) {
            const /** @type {?} */ def = /** @type {?} */ ((tView.directives))[i];
            queueContentHooks(def, tView, i);
            queueViewHooks(def, tView, i);
            queueDestroyHooks(def, tView, i);
        }
    }
}
/**
 * Queues afterContentInit and afterContentChecked hooks on TView
 * @param {?} def
 * @param {?} tView
 * @param {?} i
 * @return {?}
 */
function queueContentHooks(def, tView, i) {
    if (def.afterContentInit) {
        (tView.contentHooks || (tView.contentHooks = [])).push(i, def.afterContentInit);
    }
    if (def.afterContentChecked) {
        (tView.contentHooks || (tView.contentHooks = [])).push(i, def.afterContentChecked);
        (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, def.afterContentChecked);
    }
}
/**
 * Queues afterViewInit and afterViewChecked hooks on TView
 * @param {?} def
 * @param {?} tView
 * @param {?} i
 * @return {?}
 */
function queueViewHooks(def, tView, i) {
    if (def.afterViewInit) {
        (tView.viewHooks || (tView.viewHooks = [])).push(i, def.afterViewInit);
    }
    if (def.afterViewChecked) {
        (tView.viewHooks || (tView.viewHooks = [])).push(i, def.afterViewChecked);
        (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, def.afterViewChecked);
    }
}
/**
 * Queues onDestroy hooks on TView
 * @param {?} def
 * @param {?} tView
 * @param {?} i
 * @return {?}
 */
function queueDestroyHooks(def, tView, i) {
    if (def.onDestroy != null) {
        (tView.destroyHooks || (tView.destroyHooks = [])).push(i, def.onDestroy);
    }
}
/**
 * Calls onInit and doCheck calls if they haven't already been called.
 *
 * @param {?} currentView The current view
 * @param {?} tView
 * @param {?} creationMode
 * @return {?}
 */
export function executeInitHooks(currentView, tView, creationMode) {
    if (currentView[FLAGS] & 16 /* RunInit */) {
        executeHooks(/** @type {?} */ ((currentView[DIRECTIVES])), tView.initHooks, tView.checkHooks, creationMode);
        currentView[FLAGS] &= ~16 /* RunInit */;
    }
}
/**
 * Iterates over afterViewInit and afterViewChecked functions and calls them.
 *
 * @param {?} data
 * @param {?} allHooks
 * @param {?} checkHooks
 * @param {?} creationMode
 * @return {?}
 */
export function executeHooks(data, allHooks, checkHooks, creationMode) {
    const /** @type {?} */ hooksToCall = creationMode ? allHooks : checkHooks;
    if (hooksToCall) {
        callHooks(data, hooksToCall);
    }
}
/**
 * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
 * creation mode.
 *
 * @param {?} data
 * @param {?} arr The array in which the hooks are found
 * @return {?}
 */
export function callHooks(data, arr) {
    for (let /** @type {?} */ i = 0; i < arr.length; i += 2) {
        (/** @type {?} */ (arr[i + 1])).call(data[/** @type {?} */ (arr[i])]);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUdyQyxPQUFPLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBeUMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBZTVGLE1BQU0seUJBQ0YsS0FBYSxFQUFFLE1BQTJCLEVBQUUsT0FBNEIsRUFBRSxLQUFZO0lBQ3hGLFNBQVM7UUFDTCxXQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSw4Q0FBOEMsQ0FBQyxDQUFDO0lBQy9GLElBQUksTUFBTSxFQUFFO1FBQ1YsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDakU7SUFFRCxJQUFJLE9BQU8sRUFBRTtRQUNYLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3BFO0NBQ0Y7Ozs7Ozs7O0FBTUQsTUFBTSw4QkFBOEIsS0FBYSxFQUFFLEtBQVk7SUFDN0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7UUFDM0IsdUJBQU0sS0FBSyxHQUFHLEtBQUssd0NBQTBDLENBQUM7UUFDOUQsdUJBQU0sS0FBSyxHQUFHLEtBQUssZ0NBQWdDLENBQUM7UUFDcEQsdUJBQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUM7Ozs7UUFLMUIsS0FBSyxxQkFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsdUJBQU0sR0FBRyxzQkFBOEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3RCxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEM7S0FDRjtDQUNGOzs7Ozs7OztBQUdELDJCQUEyQixHQUE4QixFQUFFLEtBQVksRUFBRSxDQUFTO0lBQ2hGLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ3hCLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ2pGO0lBRUQsSUFBSSxHQUFHLENBQUMsbUJBQW1CLEVBQUU7UUFDM0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkYsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQzlGO0NBQ0Y7Ozs7Ozs7O0FBR0Qsd0JBQXdCLEdBQThCLEVBQUUsS0FBWSxFQUFFLENBQVM7SUFDN0UsSUFBSSxHQUFHLENBQUMsYUFBYSxFQUFFO1FBQ3JCLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN4RTtJQUVELElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQ3hCLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFFLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3JGO0NBQ0Y7Ozs7Ozs7O0FBR0QsMkJBQTJCLEdBQThCLEVBQUUsS0FBWSxFQUFFLENBQVM7SUFDaEYsSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtRQUN6QixDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUU7Q0FDRjs7Ozs7Ozs7O0FBT0QsTUFBTSwyQkFDRixXQUFzQixFQUFFLEtBQVksRUFBRSxZQUFxQjtJQUM3RCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQXFCLEVBQUU7UUFDM0MsWUFBWSxvQkFBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pGLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxpQkFBbUIsQ0FBQztLQUMzQztDQUNGOzs7Ozs7Ozs7O0FBT0QsTUFBTSx1QkFDRixJQUFXLEVBQUUsUUFBeUIsRUFBRSxVQUEyQixFQUNuRSxZQUFxQjtJQUN2Qix1QkFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN6RCxJQUFJLFdBQVcsRUFBRTtRQUNmLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDOUI7Q0FDRjs7Ozs7Ozs7O0FBU0QsTUFBTSxvQkFBb0IsSUFBVyxFQUFFLEdBQWE7SUFDbEQsS0FBSyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEMsbUJBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQWMsRUFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLG1CQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVcsRUFBQyxDQUFDLENBQUM7S0FDeEQ7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnRFcXVhbH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtEaXJlY3RpdmVEZWZJbnRlcm5hbH0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUTm9kZUZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0RJUkVDVElWRVMsIEZMQUdTLCBIb29rRGF0YSwgTFZpZXdEYXRhLCBMVmlld0ZsYWdzLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5cbi8qKlxuICogSWYgdGhpcyBpcyB0aGUgZmlyc3QgdGVtcGxhdGUgcGFzcywgYW55IG5nT25Jbml0IG9yIG5nRG9DaGVjayBob29rcyB3aWxsIGJlIHF1ZXVlZCBpbnRvXG4gKiBUVmlldy5pbml0SG9va3MgZHVyaW5nIGRpcmVjdGl2ZUNyZWF0ZS5cbiAqXG4gKiBUaGUgZGlyZWN0aXZlIGluZGV4IGFuZCBob29rIHR5cGUgYXJlIGVuY29kZWQgaW50byBvbmUgbnVtYmVyICgxc3QgYml0OiB0eXBlLCByZW1haW5pbmcgYml0czpcbiAqIGRpcmVjdGl2ZSBpbmRleCksIHRoZW4gc2F2ZWQgaW4gdGhlIGV2ZW4gaW5kaWNlcyBvZiB0aGUgaW5pdEhvb2tzIGFycmF5LiBUaGUgb2RkIGluZGljZXNcbiAqIGhvbGQgdGhlIGhvb2sgZnVuY3Rpb25zIHRoZW1zZWx2ZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZGlyZWN0aXZlIGluIExWaWV3RGF0YVtESVJFQ1RJVkVTXVxuICogQHBhcmFtIGhvb2tzIFRoZSBzdGF0aWMgaG9va3MgbWFwIG9uIHRoZSBkaXJlY3RpdmUgZGVmXG4gKiBAcGFyYW0gdFZpZXcgVGhlIGN1cnJlbnQgVFZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlSW5pdEhvb2tzKFxuICAgIGluZGV4OiBudW1iZXIsIG9uSW5pdDogKCgpID0+IHZvaWQpIHwgbnVsbCwgZG9DaGVjazogKCgpID0+IHZvaWQpIHwgbnVsbCwgdFZpZXc6IFRWaWV3KTogdm9pZCB7XG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXNzZXJ0RXF1YWwodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MsIHRydWUsICdTaG91bGQgb25seSBiZSBjYWxsZWQgb24gZmlyc3QgdGVtcGxhdGUgcGFzcycpO1xuICBpZiAob25Jbml0KSB7XG4gICAgKHRWaWV3LmluaXRIb29rcyB8fCAodFZpZXcuaW5pdEhvb2tzID0gW10pKS5wdXNoKGluZGV4LCBvbkluaXQpO1xuICB9XG5cbiAgaWYgKGRvQ2hlY2spIHtcbiAgICAodFZpZXcuaW5pdEhvb2tzIHx8ICh0Vmlldy5pbml0SG9va3MgPSBbXSkpLnB1c2goaW5kZXgsIGRvQ2hlY2spO1xuICAgICh0Vmlldy5jaGVja0hvb2tzIHx8ICh0Vmlldy5jaGVja0hvb2tzID0gW10pKS5wdXNoKGluZGV4LCBkb0NoZWNrKTtcbiAgfVxufVxuXG4vKipcbiAqIExvb3BzIHRocm91Z2ggdGhlIGRpcmVjdGl2ZXMgb24gYSBub2RlIGFuZCBxdWV1ZXMgYWxsIHRoZWlyIGhvb2tzIGV4Y2VwdCBuZ09uSW5pdFxuICogYW5kIG5nRG9DaGVjaywgd2hpY2ggYXJlIHF1ZXVlZCBzZXBhcmF0ZWx5IGluIGRpcmVjdGl2ZUNyZWF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlTGlmZWN5Y2xlSG9va3MoZmxhZ3M6IG51bWJlciwgdFZpZXc6IFRWaWV3KTogdm9pZCB7XG4gIGlmICh0Vmlldy5maXJzdFRlbXBsYXRlUGFzcykge1xuICAgIGNvbnN0IHN0YXJ0ID0gZmxhZ3MgPj4gVE5vZGVGbGFncy5EaXJlY3RpdmVTdGFydGluZ0luZGV4U2hpZnQ7XG4gICAgY29uc3QgY291bnQgPSBmbGFncyAmIFROb2RlRmxhZ3MuRGlyZWN0aXZlQ291bnRNYXNrO1xuICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgY291bnQ7XG5cbiAgICAvLyBJdCdzIG5lY2Vzc2FyeSB0byBsb29wIHRocm91Z2ggdGhlIGRpcmVjdGl2ZXMgYXQgZWxlbWVudEVuZCgpIChyYXRoZXIgdGhhbiBwcm9jZXNzaW5nIGluXG4gICAgLy8gZGlyZWN0aXZlQ3JlYXRlKSBzbyB3ZSBjYW4gcHJlc2VydmUgdGhlIGN1cnJlbnQgaG9vayBvcmRlci4gQ29udGVudCwgdmlldywgYW5kIGRlc3Ryb3lcbiAgICAvLyBob29rcyBmb3IgcHJvamVjdGVkIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZXMgbXVzdCBiZSBjYWxsZWQgKmJlZm9yZSogdGhlaXIgaG9zdHMuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlZjogRGlyZWN0aXZlRGVmSW50ZXJuYWw8YW55PiA9IHRWaWV3LmRpcmVjdGl2ZXMgIVtpXTtcbiAgICAgIHF1ZXVlQ29udGVudEhvb2tzKGRlZiwgdFZpZXcsIGkpO1xuICAgICAgcXVldWVWaWV3SG9va3MoZGVmLCB0VmlldywgaSk7XG4gICAgICBxdWV1ZURlc3Ryb3lIb29rcyhkZWYsIHRWaWV3LCBpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqIFF1ZXVlcyBhZnRlckNvbnRlbnRJbml0IGFuZCBhZnRlckNvbnRlbnRDaGVja2VkIGhvb2tzIG9uIFRWaWV3ICovXG5mdW5jdGlvbiBxdWV1ZUNvbnRlbnRIb29rcyhkZWY6IERpcmVjdGl2ZURlZkludGVybmFsPGFueT4sIHRWaWV3OiBUVmlldywgaTogbnVtYmVyKTogdm9pZCB7XG4gIGlmIChkZWYuYWZ0ZXJDb250ZW50SW5pdCkge1xuICAgICh0Vmlldy5jb250ZW50SG9va3MgfHwgKHRWaWV3LmNvbnRlbnRIb29rcyA9IFtdKSkucHVzaChpLCBkZWYuYWZ0ZXJDb250ZW50SW5pdCk7XG4gIH1cblxuICBpZiAoZGVmLmFmdGVyQ29udGVudENoZWNrZWQpIHtcbiAgICAodFZpZXcuY29udGVudEhvb2tzIHx8ICh0Vmlldy5jb250ZW50SG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyQ29udGVudENoZWNrZWQpO1xuICAgICh0Vmlldy5jb250ZW50Q2hlY2tIb29rcyB8fCAodFZpZXcuY29udGVudENoZWNrSG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyQ29udGVudENoZWNrZWQpO1xuICB9XG59XG5cbi8qKiBRdWV1ZXMgYWZ0ZXJWaWV3SW5pdCBhbmQgYWZ0ZXJWaWV3Q2hlY2tlZCBob29rcyBvbiBUVmlldyAqL1xuZnVuY3Rpb24gcXVldWVWaWV3SG9va3MoZGVmOiBEaXJlY3RpdmVEZWZJbnRlcm5hbDxhbnk+LCB0VmlldzogVFZpZXcsIGk6IG51bWJlcik6IHZvaWQge1xuICBpZiAoZGVmLmFmdGVyVmlld0luaXQpIHtcbiAgICAodFZpZXcudmlld0hvb2tzIHx8ICh0Vmlldy52aWV3SG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyVmlld0luaXQpO1xuICB9XG5cbiAgaWYgKGRlZi5hZnRlclZpZXdDaGVja2VkKSB7XG4gICAgKHRWaWV3LnZpZXdIb29rcyB8fCAodFZpZXcudmlld0hvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlclZpZXdDaGVja2VkKTtcbiAgICAodFZpZXcudmlld0NoZWNrSG9va3MgfHwgKHRWaWV3LnZpZXdDaGVja0hvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlclZpZXdDaGVja2VkKTtcbiAgfVxufVxuXG4vKiogUXVldWVzIG9uRGVzdHJveSBob29rcyBvbiBUVmlldyAqL1xuZnVuY3Rpb24gcXVldWVEZXN0cm95SG9va3MoZGVmOiBEaXJlY3RpdmVEZWZJbnRlcm5hbDxhbnk+LCB0VmlldzogVFZpZXcsIGk6IG51bWJlcik6IHZvaWQge1xuICBpZiAoZGVmLm9uRGVzdHJveSAhPSBudWxsKSB7XG4gICAgKHRWaWV3LmRlc3Ryb3lIb29rcyB8fCAodFZpZXcuZGVzdHJveUhvb2tzID0gW10pKS5wdXNoKGksIGRlZi5vbkRlc3Ryb3kpO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbHMgb25Jbml0IGFuZCBkb0NoZWNrIGNhbGxzIGlmIHRoZXkgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gY2FsbGVkLlxuICpcbiAqIEBwYXJhbSBjdXJyZW50VmlldyBUaGUgY3VycmVudCB2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlSW5pdEhvb2tzKFxuICAgIGN1cnJlbnRWaWV3OiBMVmlld0RhdGEsIHRWaWV3OiBUVmlldywgY3JlYXRpb25Nb2RlOiBib29sZWFuKTogdm9pZCB7XG4gIGlmIChjdXJyZW50Vmlld1tGTEFHU10gJiBMVmlld0ZsYWdzLlJ1bkluaXQpIHtcbiAgICBleGVjdXRlSG9va3MoY3VycmVudFZpZXdbRElSRUNUSVZFU10gISwgdFZpZXcuaW5pdEhvb2tzLCB0Vmlldy5jaGVja0hvb2tzLCBjcmVhdGlvbk1vZGUpO1xuICAgIGN1cnJlbnRWaWV3W0ZMQUdTXSAmPSB+TFZpZXdGbGFncy5SdW5Jbml0O1xuICB9XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBhZnRlclZpZXdJbml0IGFuZCBhZnRlclZpZXdDaGVja2VkIGZ1bmN0aW9ucyBhbmQgY2FsbHMgdGhlbS5cbiAqXG4gKiBAcGFyYW0gY3VycmVudFZpZXcgVGhlIGN1cnJlbnQgdmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUhvb2tzKFxuICAgIGRhdGE6IGFueVtdLCBhbGxIb29rczogSG9va0RhdGEgfCBudWxsLCBjaGVja0hvb2tzOiBIb29rRGF0YSB8IG51bGwsXG4gICAgY3JlYXRpb25Nb2RlOiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IGhvb2tzVG9DYWxsID0gY3JlYXRpb25Nb2RlID8gYWxsSG9va3MgOiBjaGVja0hvb2tzO1xuICBpZiAoaG9va3NUb0NhbGwpIHtcbiAgICBjYWxsSG9va3MoZGF0YSwgaG9va3NUb0NhbGwpO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbHMgbGlmZWN5Y2xlIGhvb2tzIHdpdGggdGhlaXIgY29udGV4dHMsIHNraXBwaW5nIGluaXQgaG9va3MgaWYgaXQncyBub3RcbiAqIGNyZWF0aW9uIG1vZGUuXG4gKlxuICogQHBhcmFtIGN1cnJlbnRWaWV3IFRoZSBjdXJyZW50IHZpZXdcbiAqIEBwYXJhbSBhcnIgVGhlIGFycmF5IGluIHdoaWNoIHRoZSBob29rcyBhcmUgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGxIb29rcyhkYXRhOiBhbnlbXSwgYXJyOiBIb29rRGF0YSk6IHZvaWQge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMikge1xuICAgIChhcnJbaSArIDFdIGFzKCkgPT4gdm9pZCkuY2FsbChkYXRhW2FycltpXSBhcyBudW1iZXJdKTtcbiAgfVxufVxuIl19