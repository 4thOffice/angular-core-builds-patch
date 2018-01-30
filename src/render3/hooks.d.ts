import { HookData, LView, TView } from './interfaces/view';
/**
 * If this is the first template pass, any ngOnInit or ngDoCheck hooks will be queued into
 * TView.initHooks during directiveCreate.
 *
 * The directive index and hook type are encoded into one number (1st bit: type, remaining bits:
 * directive index), then saved in the even indices of the initHooks array. The odd indices
 * hold the hook functions themselves.
 *
 * @param index The index of the directive in LView.data
 * @param hooks The static hooks map on the directive def
 * @param tView The current TView
 */
export declare function queueInitHooks(index: number, onInit: (() => void) | null, doCheck: (() => void) | null, tView: TView): void;
/**
 * Loops through the directives on a node and queues all their hooks except ngOnInit
 * and ngDoCheck, which are queued separately in directiveCreate.
 */
export declare function queueLifecycleHooks(flags: number, currentView: LView): void;
/**
 * Calls onInit and doCheck calls if they haven't already been called.
 *
 * @param currentView The current view
 */
export declare function executeInitHooks(currentView: LView, tView: TView, creationMode: boolean): void;
/**
 * Calls all afterContentInit and afterContentChecked hooks for the view, then splices
 * out afterContentInit hooks to prep for the next run in update mode.
 *
 * @param currentView The current view
 */
export declare function executeContentHooks(currentView: LView, tView: TView, creationMode: boolean): void;
/**
 * Iterates over afterViewInit and afterViewChecked functions and calls them.
 *
 * @param currentView The current view
 */
export declare function executeHooks(data: any[], allHooks: HookData | null, checkHooks: HookData | null, creationMode: boolean): void;
/**
 * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
 * creation mode.
 *
 * @param currentView The current view
 * @param arr The array in which the hooks are found
 */
export declare function callHooks(data: any[], arr: HookData): void;
