/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModuleFactory as R3NgModuleFactory } from '../render3/ng_module_ref';
import { stringify } from '../util/stringify';
/**
 * Used to load ng module factories.
 *
 * @publicApi
 */
var NgModuleFactoryLoader = /** @class */ (function () {
    function NgModuleFactoryLoader() {
    }
    return NgModuleFactoryLoader;
}());
export { NgModuleFactoryLoader };
/**
 * Map of module-id to the corresponding NgModule.
 * - In pre Ivy we track NgModuleFactory,
 * - In post Ivy we track the NgModuleType
 */
var modules = new Map();
/**
 * Registers a loaded module. Should only be called from generated NgModuleFactory code.
 * @publicApi
 */
export function registerModuleFactory(id, factory) {
    var existing = modules.get(id);
    assertSameOrNotExisting(id, existing && existing.moduleType, factory.moduleType);
    modules.set(id, factory);
}
function assertSameOrNotExisting(id, type, incoming) {
    if (type && type !== incoming) {
        throw new Error("Duplicate module registered for " + id + " - " + stringify(type) + " vs " + stringify(type.name));
    }
}
export function registerNgModuleType(id, ngModuleType) {
    var existing = modules.get(id);
    assertSameOrNotExisting(id, existing, ngModuleType);
    modules.set(id, ngModuleType);
}
export function clearModulesForTest() {
    modules.clear();
}
export function getModuleFactory__PRE_R3__(id) {
    var factory = modules.get(id);
    if (!factory)
        throw noModuleError(id);
    return factory;
}
export function getModuleFactory__POST_R3__(id) {
    var type = modules.get(id);
    if (!type)
        throw noModuleError(id);
    return new R3NgModuleFactory(type);
}
/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 * @publicApi
 */
export var getModuleFactory = getModuleFactory__PRE_R3__;
function noModuleError(id) {
    return new Error("No module with ID " + id + " loaded");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2ZhY3RvcnlfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyL25nX21vZHVsZV9mYWN0b3J5X2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsZUFBZSxJQUFJLGlCQUFpQixFQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFDNUYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSzVDOzs7O0dBSUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBRUQ7Ozs7R0FJRztBQUNILElBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxFQUE2QyxDQUFDO0FBRXJFOzs7R0FHRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxFQUFVLEVBQUUsT0FBNkI7SUFDN0UsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQXlCLENBQUM7SUFDekQsdUJBQXVCLENBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxFQUFVLEVBQUUsSUFBcUIsRUFBRSxRQUFtQjtJQUNyRixJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQ1gscUNBQW1DLEVBQUUsV0FBTSxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFDO0tBQzlGO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxFQUFVLEVBQUUsWUFBMEI7SUFDekUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQXdCLENBQUM7SUFDeEQsdUJBQXVCLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQjtJQUNqQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxFQUFVO0lBQ25ELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUErQixDQUFDO0lBQzlELElBQUksQ0FBQyxPQUFPO1FBQUUsTUFBTSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEMsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxFQUFVO0lBQ3BELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUF3QixDQUFDO0lBQ3BELElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUF5QywwQkFBMEIsQ0FBQztBQUVqRyxTQUFTLGFBQWEsQ0FBQyxFQUFVO0lBQy9CLE9BQU8sSUFBSSxLQUFLLENBQUMsdUJBQXFCLEVBQUUsWUFBUyxDQUFDLENBQUM7QUFDckQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge05nTW9kdWxlRmFjdG9yeSBhcyBSM05nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVUeXBlfSBmcm9tICcuLi9yZW5kZXIzL25nX21vZHVsZV9yZWYnO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5JztcblxuaW1wb3J0IHtOZ01vZHVsZUZhY3Rvcnl9IGZyb20gJy4vbmdfbW9kdWxlX2ZhY3RvcnknO1xuXG5cbi8qKlxuICogVXNlZCB0byBsb2FkIG5nIG1vZHVsZSBmYWN0b3JpZXMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmdNb2R1bGVGYWN0b3J5TG9hZGVyIHtcbiAgYWJzdHJhY3QgbG9hZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxhbnk+Pjtcbn1cblxuLyoqXG4gKiBNYXAgb2YgbW9kdWxlLWlkIHRvIHRoZSBjb3JyZXNwb25kaW5nIE5nTW9kdWxlLlxuICogLSBJbiBwcmUgSXZ5IHdlIHRyYWNrIE5nTW9kdWxlRmFjdG9yeSxcbiAqIC0gSW4gcG9zdCBJdnkgd2UgdHJhY2sgdGhlIE5nTW9kdWxlVHlwZVxuICovXG5jb25zdCBtb2R1bGVzID0gbmV3IE1hcDxzdHJpbmcsIE5nTW9kdWxlRmFjdG9yeTxhbnk+fE5nTW9kdWxlVHlwZT4oKTtcblxuLyoqXG4gKiBSZWdpc3RlcnMgYSBsb2FkZWQgbW9kdWxlLiBTaG91bGQgb25seSBiZSBjYWxsZWQgZnJvbSBnZW5lcmF0ZWQgTmdNb2R1bGVGYWN0b3J5IGNvZGUuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZUZhY3RvcnkoaWQ6IHN0cmluZywgZmFjdG9yeTogTmdNb2R1bGVGYWN0b3J5PGFueT4pIHtcbiAgY29uc3QgZXhpc3RpbmcgPSBtb2R1bGVzLmdldChpZCkgYXMgTmdNb2R1bGVGYWN0b3J5PGFueT47XG4gIGFzc2VydFNhbWVPck5vdEV4aXN0aW5nKGlkLCBleGlzdGluZyAmJiBleGlzdGluZy5tb2R1bGVUeXBlLCBmYWN0b3J5Lm1vZHVsZVR5cGUpO1xuICBtb2R1bGVzLnNldChpZCwgZmFjdG9yeSk7XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNhbWVPck5vdEV4aXN0aW5nKGlkOiBzdHJpbmcsIHR5cGU6IFR5cGU8YW55PnwgbnVsbCwgaW5jb21pbmc6IFR5cGU8YW55Pik6IHZvaWQge1xuICBpZiAodHlwZSAmJiB0eXBlICE9PSBpbmNvbWluZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYER1cGxpY2F0ZSBtb2R1bGUgcmVnaXN0ZXJlZCBmb3IgJHtpZH0gLSAke3N0cmluZ2lmeSh0eXBlKX0gdnMgJHtzdHJpbmdpZnkodHlwZS5uYW1lKX1gKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJOZ01vZHVsZVR5cGUoaWQ6IHN0cmluZywgbmdNb2R1bGVUeXBlOiBOZ01vZHVsZVR5cGUpIHtcbiAgY29uc3QgZXhpc3RpbmcgPSBtb2R1bGVzLmdldChpZCkgYXMgTmdNb2R1bGVUeXBlIHwgbnVsbDtcbiAgYXNzZXJ0U2FtZU9yTm90RXhpc3RpbmcoaWQsIGV4aXN0aW5nLCBuZ01vZHVsZVR5cGUpO1xuICBtb2R1bGVzLnNldChpZCwgbmdNb2R1bGVUeXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyTW9kdWxlc0ZvclRlc3QoKTogdm9pZCB7XG4gIG1vZHVsZXMuY2xlYXIoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZHVsZUZhY3RvcnlfX1BSRV9SM19fKGlkOiBzdHJpbmcpOiBOZ01vZHVsZUZhY3Rvcnk8YW55PiB7XG4gIGNvbnN0IGZhY3RvcnkgPSBtb2R1bGVzLmdldChpZCkgYXMgTmdNb2R1bGVGYWN0b3J5PGFueT58IG51bGw7XG4gIGlmICghZmFjdG9yeSkgdGhyb3cgbm9Nb2R1bGVFcnJvcihpZCk7XG4gIHJldHVybiBmYWN0b3J5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kdWxlRmFjdG9yeV9fUE9TVF9SM19fKGlkOiBzdHJpbmcpOiBOZ01vZHVsZUZhY3Rvcnk8YW55PiB7XG4gIGNvbnN0IHR5cGUgPSBtb2R1bGVzLmdldChpZCkgYXMgTmdNb2R1bGVUeXBlIHwgbnVsbDtcbiAgaWYgKCF0eXBlKSB0aHJvdyBub01vZHVsZUVycm9yKGlkKTtcbiAgcmV0dXJuIG5ldyBSM05nTW9kdWxlRmFjdG9yeSh0eXBlKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBOZ01vZHVsZUZhY3Rvcnkgd2l0aCB0aGUgZ2l2ZW4gaWQsIGlmIGl0IGV4aXN0cyBhbmQgaGFzIGJlZW4gbG9hZGVkLlxuICogRmFjdG9yaWVzIGZvciBtb2R1bGVzIHRoYXQgZG8gbm90IHNwZWNpZnkgYW4gYGlkYCBjYW5ub3QgYmUgcmV0cmlldmVkLiBUaHJvd3MgaWYgdGhlIG1vZHVsZVxuICogY2Fubm90IGJlIGZvdW5kLlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxlRmFjdG9yeTogKGlkOiBzdHJpbmcpID0+IE5nTW9kdWxlRmFjdG9yeTxhbnk+ID0gZ2V0TW9kdWxlRmFjdG9yeV9fUFJFX1IzX187XG5cbmZ1bmN0aW9uIG5vTW9kdWxlRXJyb3IoaWQ6IHN0cmluZywgKTogRXJyb3Ige1xuICByZXR1cm4gbmV3IEVycm9yKGBObyBtb2R1bGUgd2l0aCBJRCAke2lkfSBsb2FkZWRgKTtcbn1cbiJdfQ==