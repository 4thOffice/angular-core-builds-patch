/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WrappedValue } from '../change_detection/change_detection_util';
import { load, store } from './instructions';
import { HEADER_OFFSET, TVIEW } from './interfaces/view';
import { pureFunction1, pureFunction2, pureFunction3, pureFunction4, pureFunctionV } from './pure_function';
import { getBindingRoot, getLView } from './state';
import { NO_CHANGE } from './tokens';
/**
 * Create a pipe.
 *
 * @param {?} index Pipe index where the pipe will be stored.
 * @param {?} pipeName The name of the pipe
 * @return {?} T the instance of the pipe.
 */
export function pipe(index, pipeName) {
    /** @type {?} */
    const tView = getLView()[TVIEW];
    /** @type {?} */
    let pipeDef;
    /** @type {?} */
    const adjustedIndex = index + HEADER_OFFSET;
    if (tView.firstTemplatePass) {
        pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
        tView.data[adjustedIndex] = pipeDef;
        if (pipeDef.onDestroy) {
            (tView.pipeDestroyHooks || (tView.pipeDestroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
        }
    }
    else {
        pipeDef = (/** @type {?} */ (tView.data[adjustedIndex]));
    }
    /** @type {?} */
    const pipeInstance = pipeDef.factory(null);
    store(index, pipeInstance);
    return pipeInstance;
}
/**
 * Searches the pipe registry for a pipe with the given name. If one is found,
 * returns the pipe. Otherwise, an error is thrown because the pipe cannot be resolved.
 *
 * @param {?} name Name of pipe to resolve
 * @param {?} registry Full list of available pipes
 * @return {?} Matching PipeDef
 */
function getPipeDef(name, registry) {
    if (registry) {
        for (let i = 0; i < registry.length; i++) {
            /** @type {?} */
            const pipeDef = registry[i];
            if (name === pipeDef.name) {
                return pipeDef;
            }
        }
    }
    throw new Error(`Pipe with name '${name}' not found!`);
}
/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind1(index, slotOffset, v1) {
    /** @type {?} */
    const pipeInstance = load(index);
    return unwrapValue(isPure(index) ? pureFunction1(slotOffset, pipeInstance.transform, v1, pipeInstance) :
        pipeInstance.transform(v1));
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind2(index, slotOffset, v1, v2) {
    /** @type {?} */
    const pipeInstance = load(index);
    return unwrapValue(isPure(index) ? pureFunction2(slotOffset, pipeInstance.transform, v1, v2, pipeInstance) :
        pipeInstance.transform(v1, v2));
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 4rd argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind3(index, slotOffset, v1, v2, v3) {
    /** @type {?} */
    const pipeInstance = load(index);
    return unwrapValue(isPure(index) ? pureFunction3(slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance) :
        pipeInstance.transform(v1, v2, v3));
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 3rd argument to {\@link PipeTransform#transform}.
 * @param {?} v4 4th argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind4(index, slotOffset, v1, v2, v3, v4) {
    /** @type {?} */
    const pipeInstance = load(index);
    return unwrapValue(isPure(index) ?
        pureFunction4(slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance) :
        pipeInstance.transform(v1, v2, v3, v4));
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} values Array of arguments to pass to {\@link PipeTransform#transform} method.
 * @return {?}
 */
export function pipeBindV(index, slotOffset, values) {
    /** @type {?} */
    const pipeInstance = load(index);
    return unwrapValue(isPure(index) ? pureFunctionV(slotOffset, pipeInstance.transform, values, pipeInstance) :
        pipeInstance.transform.apply(pipeInstance, values));
}
/**
 * @param {?} index
 * @return {?}
 */
function isPure(index) {
    return ((/** @type {?} */ (getLView()[TVIEW].data[index + HEADER_OFFSET]))).pure;
}
/**
 * Unwrap the output of a pipe transformation.
 * In order to trick change detection into considering that the new value is always different from
 * the old one, the old value is overwritten by NO_CHANGE.
 *
 * @param {?} newValue the pipe transformation output.
 * @return {?}
 */
function unwrapValue(newValue) {
    if (WrappedValue.isWrapped(newValue)) {
        newValue = WrappedValue.unwrap(newValue);
        getLView()[getBindingRoot()] = NO_CHANGE;
    }
    return newValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUd2RSxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRyxPQUFPLEVBQUMsY0FBYyxFQUFFLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNqRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7Ozs7OztBQVVuQyxNQUFNLFVBQVUsSUFBSSxDQUFDLEtBQWEsRUFBRSxRQUFnQjs7VUFDNUMsS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQzs7UUFDM0IsT0FBcUI7O1VBQ25CLGFBQWEsR0FBRyxLQUFLLEdBQUcsYUFBYTtJQUUzQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtRQUMzQixPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDcEMsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3JCLENBQUMsS0FBSyxDQUFDLGdCQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLEVBQ25ELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdD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LEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7Ozs7Ozs7Ozs7OztBQVlELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsTUFBYTs7VUFDbEUsWUFBWSxHQUFHLElBQUksQ0FBZ0IsS0FBSyxDQUFDO0lBQy9DLE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsS0FBYTtJQUMzQixPQUFPLENBQUMsbUJBQWMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsRUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzVFLENBQUM7Ozs7Ozs7OztBQVNELFNBQVMsV0FBVyxDQUFDLFFBQWE7SUFDaEMsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BDLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLFFBQVEsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDO0tBQzFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtXcmFwcGVkVmFsdWV9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcbmltcG9ydCB7UGlwZVRyYW5zZm9ybX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9waXBlX3RyYW5zZm9ybSc7XG5cbmltcG9ydCB7bG9hZCwgc3RvcmV9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zJztcbmltcG9ydCB7UGlwZURlZiwgUGlwZURlZkxpc3R9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7SEVBREVSX09GRlNFVCwgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7cHVyZUZ1bmN0aW9uMSwgcHVyZUZ1bmN0aW9uMiwgcHVyZUZ1bmN0aW9uMywgcHVyZUZ1bmN0aW9uNCwgcHVyZUZ1bmN0aW9uVn0gZnJvbSAnLi9wdXJlX2Z1bmN0aW9uJztcbmltcG9ydCB7Z2V0QmluZGluZ1Jvb3QsIGdldExWaWV3fSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7Tk9fQ0hBTkdFfSBmcm9tICcuL3Rva2Vucyc7XG5cblxuLyoqXG4gKiBDcmVhdGUgYSBwaXBlLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIHBpcGVOYW1lIFRoZSBuYW1lIG9mIHRoZSBwaXBlXG4gKiBAcmV0dXJucyBUIHRoZSBpbnN0YW5jZSBvZiB0aGUgcGlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoaW5kZXg6IG51bWJlciwgcGlwZU5hbWU6IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHRWaWV3ID0gZ2V0TFZpZXcoKVtUVklFV107XG4gIGxldCBwaXBlRGVmOiBQaXBlRGVmPGFueT47XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPSBpbmRleCArIEhFQURFUl9PRkZTRVQ7XG5cbiAgaWYgKHRWaWV3LmZpcnN0VGVtcGxhdGVQYXNzKSB7XG4gICAgcGlwZURlZiA9IGdldFBpcGVEZWYocGlwZU5hbWUsIHRWaWV3LnBpcGVSZWdpc3RyeSk7XG4gICAgdFZpZXcuZGF0YVthZGp1c3RlZEluZGV4XSA9IHBpcGVEZWY7XG4gICAgaWYgKHBpcGVEZWYub25EZXN0cm95KSB7XG4gICAgICAodFZpZXcucGlwZURlc3Ryb3lIb29rcyB8fCAodFZpZXcucGlwZURlc3Ryb3lIb29rcyA9IFtcbiAgICAgICBdKSkucHVzaChhZGp1c3RlZEluZGV4LCBwaXBlRGVmLm9uRGVzdHJveSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBpcGVEZWYgPSB0Vmlldy5kYXRhW2FkanVzdGVkSW5kZXhdIGFzIFBpcGVEZWY8YW55PjtcbiAgfVxuXG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IHBpcGVEZWYuZmFjdG9yeShudWxsKTtcbiAgc3RvcmUoaW5kZXgsIHBpcGVJbnN0YW5jZSk7XG4gIHJldHVybiBwaXBlSW5zdGFuY2U7XG59XG5cbi8qKlxuICogU2VhcmNoZXMgdGhlIHBpcGUgcmVnaXN0cnkgZm9yIGEgcGlwZSB3aXRoIHRoZSBnaXZlbiBuYW1lLiBJZiBvbmUgaXMgZm91bmQsXG4gKiByZXR1cm5zIHRoZSBwaXBlLiBPdGhlcndpc2UsIGFuIGVycm9yIGlzIHRocm93biBiZWNhdXNlIHRoZSBwaXBlIGNhbm5vdCBiZSByZXNvbHZlZC5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHBpcGUgdG8gcmVzb2x2ZVxuICogQHBhcmFtIHJlZ2lzdHJ5IEZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgcGlwZXNcbiAqIEByZXR1cm5zIE1hdGNoaW5nIFBpcGVEZWZcbiAqL1xuZnVuY3Rpb24gZ2V0UGlwZURlZihuYW1lOiBzdHJpbmcsIHJlZ2lzdHJ5OiBQaXBlRGVmTGlzdCB8IG51bGwpOiBQaXBlRGVmPGFueT4ge1xuICBpZiAocmVnaXN0cnkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZ2lzdHJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwaXBlRGVmID0gcmVnaXN0cnlbaV07XG4gICAgICBpZiAobmFtZSA9PT0gcGlwZURlZi5uYW1lKSB7XG4gICAgICAgIHJldHVybiBwaXBlRGVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFBpcGUgd2l0aCBuYW1lICcke25hbWV9JyBub3QgZm91bmQhYCk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAxIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmQxKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gdW53cmFwVmFsdWUoXG4gICAgICBpc1B1cmUoaW5kZXgpID8gcHVyZUZ1bmN0aW9uMShzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSkpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMiBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2VcbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MiAybmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGVCaW5kMihpbmRleDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHYxOiBhbnksIHYyOiBhbnkpOiBhbnkge1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGluZGV4KTtcbiAgcmV0dXJuIHVud3JhcFZhbHVlKFxuICAgICAgaXNQdXJlKGluZGV4KSA/IHB1cmVGdW5jdGlvbjIoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdjEsIHYyLCBwaXBlSW5zdGFuY2UpIDpcbiAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxLCB2MikpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMyBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2VcbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MiAybmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MyA0cmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGVCaW5kMyhpbmRleDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHYxOiBhbnksIHYyOiBhbnksIHYzOiBhbnkpOiBhbnkge1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGluZGV4KTtcbiAgcmV0dXJuIHVud3JhcFZhbHVlKFxuICAgICAgaXNQdXJlKGluZGV4KSA/IHB1cmVGdW5jdGlvbjMoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdjEsIHYyLCB2MywgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzKSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCA0IGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYzIDNyZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHY0IDR0aCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmQ0KFxuICAgIGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gdW53cmFwVmFsdWUoXG4gICAgICBpc1B1cmUoaW5kZXgpID9cbiAgICAgICAgICBwdXJlRnVuY3Rpb240KHNsb3RPZmZzZXQsIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHYxLCB2MiwgdjMsIHY0LCBwaXBlSW5zdGFuY2UpIDpcbiAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxLCB2MiwgdjMsIHY0KSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gbWV0aG9kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmRWKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdmFsdWVzOiBhbnlbXSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gdW53cmFwVmFsdWUoXG4gICAgICBpc1B1cmUoaW5kZXgpID8gcHVyZUZ1bmN0aW9uVihzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2YWx1ZXMsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgICAgICAgICAgICAgICAgIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0uYXBwbHkocGlwZUluc3RhbmNlLCB2YWx1ZXMpKTtcbn1cblxuZnVuY3Rpb24gaXNQdXJlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICg8UGlwZURlZjxhbnk+PmdldExWaWV3KClbVFZJRVddLmRhdGFbaW5kZXggKyBIRUFERVJfT0ZGU0VUXSkucHVyZTtcbn1cblxuLyoqXG4gKiBVbndyYXAgdGhlIG91dHB1dCBvZiBhIHBpcGUgdHJhbnNmb3JtYXRpb24uXG4gKiBJbiBvcmRlciB0byB0cmljayBjaGFuZ2UgZGV0ZWN0aW9uIGludG8gY29uc2lkZXJpbmcgdGhhdCB0aGUgbmV3IHZhbHVlIGlzIGFsd2F5cyBkaWZmZXJlbnQgZnJvbVxuICogdGhlIG9sZCBvbmUsIHRoZSBvbGQgdmFsdWUgaXMgb3ZlcndyaXR0ZW4gYnkgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBuZXdWYWx1ZSB0aGUgcGlwZSB0cmFuc2Zvcm1hdGlvbiBvdXRwdXQuXG4gKi9cbmZ1bmN0aW9uIHVud3JhcFZhbHVlKG5ld1ZhbHVlOiBhbnkpOiBhbnkge1xuICBpZiAoV3JhcHBlZFZhbHVlLmlzV3JhcHBlZChuZXdWYWx1ZSkpIHtcbiAgICBuZXdWYWx1ZSA9IFdyYXBwZWRWYWx1ZS51bndyYXAobmV3VmFsdWUpO1xuICAgIGdldExWaWV3KClbZ2V0QmluZGluZ1Jvb3QoKV0gPSBOT19DSEFOR0U7XG4gIH1cbiAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuIl19