/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertEqual } from './assert';
import { FLAGS } from './interfaces/view';
/**
 * If this is the first template pass, any ngOnInit or ngDoCheck hooks will be queued into
 * TView.initHooks during directiveCreate.
 *
 * The directive index and hook type are encoded into one number (1st bit: type, remaining bits:
 * directive index), then saved in the even indices of the initHooks array. The odd indices
 * hold the hook functions themselves.
 *
 * @param index The index of the directive in LViewData
 * @param hooks The static hooks map on the directive def
 * @param tView The current TView
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
 */
export function queueLifecycleHooks(flags, tView) {
    if (tView.firstTemplatePass) {
        var start = flags >> 16 /* DirectiveStartingIndexShift */;
        var count = flags & 4095 /* DirectiveCountMask */;
        var end = start + count;
        // It's necessary to loop through the directives at elementEnd() (rather than processing in
        // directiveCreate) so we can preserve the current hook order. Content, view, and destroy
        // hooks for projected components and directives must be called *before* their hosts.
        for (var i = start; i < end; i++) {
            var def = tView.data[i];
            queueContentHooks(def, tView, i);
            queueViewHooks(def, tView, i);
            queueDestroyHooks(def, tView, i);
        }
    }
}
/** Queues afterContentInit and afterContentChecked hooks on TView */
function queueContentHooks(def, tView, i) {
    if (def.afterContentInit) {
        (tView.contentHooks || (tView.contentHooks = [])).push(i, def.afterContentInit);
    }
    if (def.afterContentChecked) {
        (tView.contentHooks || (tView.contentHooks = [])).push(i, def.afterContentChecked);
        (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, def.afterContentChecked);
    }
}
/** Queues afterViewInit and afterViewChecked hooks on TView */
function queueViewHooks(def, tView, i) {
    if (def.afterViewInit) {
        (tView.viewHooks || (tView.viewHooks = [])).push(i, def.afterViewInit);
    }
    if (def.afterViewChecked) {
        (tView.viewHooks || (tView.viewHooks = [])).push(i, def.afterViewChecked);
        (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, def.afterViewChecked);
    }
}
/** Queues onDestroy hooks on TView */
function queueDestroyHooks(def, tView, i) {
    if (def.onDestroy != null) {
        (tView.destroyHooks || (tView.destroyHooks = [])).push(i, def.onDestroy);
    }
}
/**
 * Calls onInit and doCheck calls if they haven't already been called.
 *
 * @param currentView The current view
 */
export function executeInitHooks(currentView, tView, creationMode) {
    if (currentView[FLAGS] & 16 /* RunInit */) {
        executeHooks(currentView, tView.initHooks, tView.checkHooks, creationMode);
        currentView[FLAGS] &= ~16 /* RunInit */;
    }
}
/**
 * Iterates over afterViewInit and afterViewChecked functions and calls them.
 *
 * @param currentView The current view
 */
export function executeHooks(data, allHooks, checkHooks, creationMode) {
    var hooksToCall = creationMode ? allHooks : checkHooks;
    if (hooksToCall) {
        callHooks(data, hooksToCall);
    }
}
/**
 * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
 * creation mode.
 *
 * @param currentView The current view
 * @param arr The array in which the hooks are found
 */
export function callHooks(currentView, arr) {
    for (var i = 0; i < arr.length; i += 2) {
        arr[i + 1].call(currentView[arr[i]]);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFHckMsT0FBTyxFQUFDLEtBQUssRUFBeUMsTUFBTSxtQkFBbUIsQ0FBQztBQUdoRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQzFCLEtBQWEsRUFBRSxNQUEyQixFQUFFLE9BQTRCLEVBQUUsS0FBWTtJQUN4RixTQUFTO1FBQ0wsV0FBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsOENBQThDLENBQUMsQ0FBQztJQUMvRixJQUFJLE1BQU0sRUFBRTtRQUNWLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsSUFBSSxPQUFPLEVBQUU7UUFDWCxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqRSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNwRTtBQUNILENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsS0FBYSxFQUFFLEtBQVk7SUFDN0QsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7UUFDM0IsSUFBTSxL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V0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBcUIsRUFBRTtRQUMzQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQW1CLENBQUM7S0FDM0M7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQ3hCLElBQWUsRUFBRSxRQUF5QixFQUFFLFVBQTJCLEVBQ3ZFLFlBQXFCO0lBQ3ZCLElBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDekQsSUFBSSxXQUFXLEVBQUU7UUFDZixTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQzlCO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsV0FBa0IsRUFBRSxHQUFhO0lBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFDLENBQUM7S0FDL0Q7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydEVxdWFsfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge0RpcmVjdGl2ZURlZn0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUTm9kZUZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0ZMQUdTLCBIb29rRGF0YSwgTFZpZXdEYXRhLCBMVmlld0ZsYWdzLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuXG5cbi8qKlxuICogSWYgdGhpcyBpcyB0aGUgZmlyc3QgdGVtcGxhdGUgcGFzcywgYW55IG5nT25Jbml0IG9yIG5nRG9DaGVjayBob29rcyB3aWxsIGJlIHF1ZXVlZCBpbnRvXG4gKiBUVmlldy5pbml0SG9va3MgZHVyaW5nIGRpcmVjdGl2ZUNyZWF0ZS5cbiAqXG4gKiBUaGUgZGlyZWN0aXZlIGluZGV4IGFuZCBob29rIHR5cGUgYXJlIGVuY29kZWQgaW50byBvbmUgbnVtYmVyICgxc3QgYml0OiB0eXBlLCByZW1haW5pbmcgYml0czpcbiAqIGRpcmVjdGl2ZSBpbmRleCksIHRoZW4gc2F2ZWQgaW4gdGhlIGV2ZW4gaW5kaWNlcyBvZiB0aGUgaW5pdEhvb2tzIGFycmF5LiBUaGUgb2RkIGluZGljZXNcbiAqIGhvbGQgdGhlIGhvb2sgZnVuY3Rpb25zIHRoZW1zZWx2ZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZGlyZWN0aXZlIGluIExWaWV3RGF0YVxuICogQHBhcmFtIGhvb2tzIFRoZSBzdGF0aWMgaG9va3MgbWFwIG9uIHRoZSBkaXJlY3RpdmUgZGVmXG4gKiBAcGFyYW0gdFZpZXcgVGhlIGN1cnJlbnQgVFZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlSW5pdEhvb2tzKFxuICAgIGluZGV4OiBudW1iZXIsIG9uSW5pdDogKCgpID0+IHZvaWQpIHwgbnVsbCwgZG9DaGVjazogKCgpID0+IHZvaWQpIHwgbnVsbCwgdFZpZXc6IFRWaWV3KTogdm9pZCB7XG4gIG5nRGV2TW9kZSAmJlxuICAgICAgYXNzZXJ0RXF1YWwodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MsIHRydWUsICdTaG91bGQgb25seSBiZSBjYWxsZWQgb24gZmlyc3QgdGVtcGxhdGUgcGFzcycpO1xuICBpZiAob25Jbml0KSB7XG4gICAgKHRWaWV3LmluaXRIb29rcyB8fCAodFZpZXcuaW5pdEhvb2tzID0gW10pKS5wdXNoKGluZGV4LCBvbkluaXQpO1xuICB9XG5cbiAgaWYgKGRvQ2hlY2spIHtcbiAgICAodFZpZXcuaW5pdEhvb2tzIHx8ICh0Vmlldy5pbml0SG9va3MgPSBbXSkpLnB1c2goaW5kZXgsIGRvQ2hlY2spO1xuICAgICh0Vmlldy5jaGVja0hvb2tzIHx8ICh0Vmlldy5jaGVja0hvb2tzID0gW10pKS5wdXNoKGluZGV4LCBkb0NoZWNrKTtcbiAgfVxufVxuXG4vKipcbiAqIExvb3BzIHRocm91Z2ggdGhlIGRpcmVjdGl2ZXMgb24gYSBub2RlIGFuZCBxdWV1ZXMgYWxsIHRoZWlyIGhvb2tzIGV4Y2VwdCBuZ09uSW5pdFxuICogYW5kIG5nRG9DaGVjaywgd2hpY2ggYXJlIHF1ZXVlZCBzZXBhcmF0ZWx5IGluIGRpcmVjdGl2ZUNyZWF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlTGlmZWN5Y2xlSG9va3MoZmxhZ3M6IG51bWJlciwgdFZpZXc6IFRWaWV3KTogdm9pZCB7XG4gIGlmICh0Vmlldy5maXJzdFRlbXBsYXRlUGFzcykge1xuICAgIGNvbnN0IHN0YXJ0ID0gZmxhZ3MgPj4gVE5vZGVGbGFncy5EaXJlY3RpdmVTdGFydGluZ0luZGV4U2hpZnQ7XG4gICAgY29uc3QgY291bnQgPSBmbGFncyAmIFROb2RlRmxhZ3MuRGlyZWN0aXZlQ291bnRNYXNrO1xuICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgY291bnQ7XG5cbiAgICAvLyBJdCdzIG5lY2Vzc2FyeSB0byBsb29wIHRocm91Z2ggdGhlIGRpcmVjdGl2ZXMgYXQgZWxlbWVudEVuZCgpIChyYXRoZXIgdGhhbiBwcm9jZXNzaW5nIGluXG4gICAgLy8gZGlyZWN0aXZlQ3JlYXRlKSBzbyB3ZSBjYW4gcHJlc2VydmUgdGhlIGN1cnJlbnQgaG9vayBvcmRlci4gQ29udGVudCwgdmlldywgYW5kIGRlc3Ryb3lcbiAgICAvLyBob29rcyBmb3IgcHJvamVjdGVkIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZXMgbXVzdCBiZSBjYWxsZWQgKmJlZm9yZSogdGhlaXIgaG9zdHMuXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlZiA9IHRWaWV3LmRhdGFbaV0gYXMgRGlyZWN0aXZlRGVmPGFueT47XG4gICAgICBxdWV1ZUNvbnRlbnRIb29rcyhkZWYsIHRWaWV3LCBpKTtcbiAgICAgIHF1ZXVlVmlld0hvb2tzKGRlZiwgdFZpZXcsIGkpO1xuICAgICAgcXVldWVEZXN0cm95SG9va3MoZGVmLCB0VmlldywgaSk7XG4gICAgfVxuICB9XG59XG5cbi8qKiBRdWV1ZXMgYWZ0ZXJDb250ZW50SW5pdCBhbmQgYWZ0ZXJDb250ZW50Q2hlY2tlZCBob29rcyBvbiBUVmlldyAqL1xuZnVuY3Rpb24gcXVldWVDb250ZW50SG9va3MoZGVmOiBEaXJlY3RpdmVEZWY8YW55PiwgdFZpZXc6IFRWaWV3LCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgaWYgKGRlZi5hZnRlckNvbnRlbnRJbml0KSB7XG4gICAgKHRWaWV3LmNvbnRlbnRIb29rcyB8fCAodFZpZXcuY29udGVudEhvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlckNvbnRlbnRJbml0KTtcbiAgfVxuXG4gIGlmIChkZWYuYWZ0ZXJDb250ZW50Q2hlY2tlZCkge1xuICAgICh0Vmlldy5jb250ZW50SG9va3MgfHwgKHRWaWV3LmNvbnRlbnRIb29rcyA9IFtdKSkucHVzaChpLCBkZWYuYWZ0ZXJDb250ZW50Q2hlY2tlZCk7XG4gICAgKHRWaWV3LmNvbnRlbnRDaGVja0hvb2tzIHx8ICh0Vmlldy5jb250ZW50Q2hlY2tIb29rcyA9IFtdKSkucHVzaChpLCBkZWYuYWZ0ZXJDb250ZW50Q2hlY2tlZCk7XG4gIH1cbn1cblxuLyoqIFF1ZXVlcyBhZnRlclZpZXdJbml0IGFuZCBhZnRlclZpZXdDaGVja2VkIGhvb2tzIG9uIFRWaWV3ICovXG5mdW5jdGlvbiBxdWV1ZVZpZXdIb29rcyhkZWY6IERpcmVjdGl2ZURlZjxhbnk+LCB0VmlldzogVFZpZXcsIGk6IG51bWJlcik6IHZvaWQge1xuICBpZiAoZGVmLmFmdGVyVmlld0luaXQpIHtcbiAgICAodFZpZXcudmlld0hvb2tzIHx8ICh0Vmlldy52aWV3SG9va3MgPSBbXSkpLnB1c2goaSwgZGVmLmFmdGVyVmlld0luaXQpO1xuICB9XG5cbiAgaWYgKGRlZi5hZnRlclZpZXdDaGVja2VkKSB7XG4gICAgKHRWaWV3LnZpZXdIb29rcyB8fCAodFZpZXcudmlld0hvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlclZpZXdDaGVja2VkKTtcbiAgICAodFZpZXcudmlld0NoZWNrSG9va3MgfHwgKHRWaWV3LnZpZXdDaGVja0hvb2tzID0gW10pKS5wdXNoKGksIGRlZi5hZnRlclZpZXdDaGVja2VkKTtcbiAgfVxufVxuXG4vKiogUXVldWVzIG9uRGVzdHJveSBob29rcyBvbiBUVmlldyAqL1xuZnVuY3Rpb24gcXVldWVEZXN0cm95SG9va3MoZGVmOiBEaXJlY3RpdmVEZWY8YW55PiwgdFZpZXc6IFRWaWV3LCBpOiBudW1iZXIpOiB2b2lkIHtcbiAgaWYgKGRlZi5vbkRlc3Ryb3kgIT0gbnVsbCkge1xuICAgICh0Vmlldy5kZXN0cm95SG9va3MgfHwgKHRWaWV3LmRlc3Ryb3lIb29rcyA9IFtdKSkucHVzaChpLCBkZWYub25EZXN0cm95KTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGxzIG9uSW5pdCBhbmQgZG9DaGVjayBjYWxscyBpZiB0aGV5IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIGNhbGxlZC5cbiAqXG4gKiBAcGFyYW0gY3VycmVudFZpZXcgVGhlIGN1cnJlbnQgdmlld1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZUluaXRIb29rcyhcbiAgICBjdXJyZW50VmlldzogTFZpZXdEYXRhLCB0VmlldzogVFZpZXcsIGNyZWF0aW9uTW9kZTogYm9vbGVhbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZpZXdbRkxBR1NdICYgTFZpZXdGbGFncy5SdW5Jbml0KSB7XG4gICAgZXhlY3V0ZUhvb2tzKGN1cnJlbnRWaWV3LCB0Vmlldy5pbml0SG9va3MsIHRWaWV3LmNoZWNrSG9va3MsIGNyZWF0aW9uTW9kZSk7XG4gICAgY3VycmVudFZpZXdbRkxBR1NdICY9IH5MVmlld0ZsYWdzLlJ1bkluaXQ7XG4gIH1cbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGFmdGVyVmlld0luaXQgYW5kIGFmdGVyVmlld0NoZWNrZWQgZnVuY3Rpb25zIGFuZCBjYWxscyB0aGVtLlxuICpcbiAqIEBwYXJhbSBjdXJyZW50VmlldyBUaGUgY3VycmVudCB2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlSG9va3MoXG4gICAgZGF0YTogTFZpZXdEYXRhLCBhbGxIb29rczogSG9va0RhdGEgfCBudWxsLCBjaGVja0hvb2tzOiBIb29rRGF0YSB8IG51bGwsXG4gICAgY3JlYXRpb25Nb2RlOiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IGhvb2tzVG9DYWxsID0gY3JlYXRpb25Nb2RlID8gYWxsSG9va3MgOiBjaGVja0hvb2tzO1xuICBpZiAoaG9va3NUb0NhbGwpIHtcbiAgICBjYWxsSG9va3MoZGF0YSwgaG9va3NUb0NhbGwpO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbHMgbGlmZWN5Y2xlIGhvb2tzIHdpdGggdGhlaXIgY29udGV4dHMsIHNraXBwaW5nIGluaXQgaG9va3MgaWYgaXQncyBub3RcbiAqIGNyZWF0aW9uIG1vZGUuXG4gKlxuICogQHBhcmFtIGN1cnJlbnRWaWV3IFRoZSBjdXJyZW50IHZpZXdcbiAqIEBwYXJhbSBhcnIgVGhlIGFycmF5IGluIHdoaWNoIHRoZSBob29rcyBhcmUgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNhbGxIb29rcyhjdXJyZW50VmlldzogYW55W10sIGFycjogSG9va0RhdGEpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAoYXJyW2kgKyAxXSBhcygpID0+IHZvaWQpLmNhbGwoY3VycmVudFZpZXdbYXJyW2ldIGFzIG51bWJlcl0pO1xuICB9XG59XG4iXX0=