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
import { getTView, load, store } from './instructions';
import { pureFunction1, pureFunction2, pureFunction3, pureFunction4, pureFunctionV } from './pure_function';
/**
 * Create a pipe.
 *
 * @param {?} index Pipe index where the pipe will be stored.
 * @param {?} pipeName The name of the pipe
 * @return {?} T the instance of the pipe.
 */
export function pipe(index, pipeName) {
    const /** @type {?} */ tView = getTView();
    let /** @type {?} */ pipeDef;
    if (tView.firstTemplatePass) {
        pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
        tView.data[index] = pipeDef;
        if (pipeDef.onDestroy) {
            (tView.pipeDestroyHooks || (tView.pipeDestroyHooks = [])).push(index, pipeDef.onDestroy);
        }
    }
    else {
        pipeDef = /** @type {?} */ (tView.data[index]);
    }
    const /** @type {?} */ pipeInstance = pipeDef.n();
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
        for (let /** @type {?} */ i = 0; i < registry.length; i++) {
            const /** @type {?} */ pipeDef = registry[i];
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
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind1(index, v1) {
    const /** @type {?} */ pipeInstance = load(index);
    return isPure(index) ? pureFunction1(pipeInstance.transform, v1, pipeInstance) :
        pipeInstance.transform(v1);
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind2(index, v1, v2) {
    const /** @type {?} */ pipeInstance = load(index);
    return isPure(index) ? pureFunction2(pipeInstance.transform, v1, v2, pipeInstance) :
        pipeInstance.transform(v1, v2);
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 4rd argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind3(index, v1, v2, v3) {
    const /** @type {?} */ pipeInstance = load(index);
    return isPure(index) ? pureFunction3(pipeInstance.transform, v1, v2, v3, pipeInstance) :
        pipeInstance.transform(v1, v2, v3);
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 3rd argument to {\@link PipeTransform#transform}.
 * @param {?} v4 4th argument to {\@link PipeTransform#transform}.
 * @return {?}
 */
export function pipeBind4(index, v1, v2, v3, v4) {
    const /** @type {?} */ pipeInstance = load(index);
    return isPure(index) ? pureFunction4(pipeInstance.transform, v1, v2, v3, v4, pipeInstance) :
        pipeInstance.transform(v1, v2, v3, v4);
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} values Array of arguments to pass to {\@link PipeTransform#transform} method.
 * @return {?}
 */
export function pipeBindV(index, values) {
    const /** @type {?} */ pipeInstance = load(index);
    return isPure(index) ? pureFunctionV(pipeInstance.transform, values, pipeInstance) :
        pipeInstance.transform.apply(pipeInstance, values);
}
/**
 * @param {?} index
 * @return {?}
 */
function isPure(index) {
    return (/** @type {?} */ (getTView().data[index])).pure;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVVBLE9BQU8sRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBUzFHLE1BQU0sZUFBZSxLQUFhLEVBQUUsUUFBZ0I7SUFDbEQsdUJBQU0sS0FBSyxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLHFCQUFJLE9BQXFCLENBQUM7SUFFMUIsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7UUFDM0IsT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNyQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzFGO0tBQ0Y7U0FBTTtRQUNMLE9BQU8scUJBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQWlCLENBQUEsQ0FBQztLQUM3QztJQUVELHVCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakMsS0FBSyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzQixPQUFPLFlBQVksQ0FBQztDQUNyQjs7Ozs7Ozs7O0FBVUQs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QUMsRUFBQyxDQUFDLElBQUksQ0FBQztDQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQaXBlVHJhbnNmb3JtfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL3BpcGVfdHJhbnNmb3JtJztcblxuaW1wb3J0IHtnZXRUVmlldywgbG9hZCwgc3RvcmV9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zJztcbmltcG9ydCB7UGlwZURlZiwgUGlwZURlZkxpc3R9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7cHVyZUZ1bmN0aW9uMSwgcHVyZUZ1bmN0aW9uMiwgcHVyZUZ1bmN0aW9uMywgcHVyZUZ1bmN0aW9uNCwgcHVyZUZ1bmN0aW9uVn0gZnJvbSAnLi9wdXJlX2Z1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGUgYSBwaXBlLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIHBpcGVOYW1lIFRoZSBuYW1lIG9mIHRoZSBwaXBlXG4gKiBAcmV0dXJucyBUIHRoZSBpbnN0YW5jZSBvZiB0aGUgcGlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoaW5kZXg6IG51bWJlciwgcGlwZU5hbWU6IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgbGV0IHBpcGVEZWY6IFBpcGVEZWY8YW55PjtcblxuICBpZiAodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICBwaXBlRGVmID0gZ2V0UGlwZURlZihwaXBlTmFtZSwgdFZpZXcucGlwZVJlZ2lzdHJ5KTtcbiAgICB0Vmlldy5kYXRhW2luZGV4XSA9IHBpcGVEZWY7XG4gICAgaWYgKHBpcGVEZWYub25EZXN0cm95KSB7XG4gICAgICAodFZpZXcucGlwZURlc3Ryb3lIb29rcyB8fCAodFZpZXcucGlwZURlc3Ryb3lIb29rcyA9IFtdKSkucHVzaChpbmRleCwgcGlwZURlZi5vbkRlc3Ryb3kpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwaXBlRGVmID0gdFZpZXcuZGF0YVtpbmRleF0gYXMgUGlwZURlZjxhbnk+O1xuICB9XG5cbiAgY29uc3QgcGlwZUluc3RhbmNlID0gcGlwZURlZi5uKCk7XG4gIHN0b3JlKGluZGV4LCBwaXBlSW5zdGFuY2UpO1xuICByZXR1cm4gcGlwZUluc3RhbmNlO1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBwaXBlIHJlZ2lzdHJ5IGZvciBhIHBpcGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS4gSWYgb25lIGlzIGZvdW5kLFxuICogcmV0dXJucyB0aGUgcGlwZS4gT3RoZXJ3aXNlLCBhbiBlcnJvciBpcyB0aHJvd24gYmVjYXVzZSB0aGUgcGlwZSBjYW5ub3QgYmUgcmVzb2x2ZWQuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiBwaXBlIHRvIHJlc29sdmVcbiAqIEBwYXJhbSByZWdpc3RyeSBGdWxsIGxpc3Qgb2YgYXZhaWxhYmxlIHBpcGVzXG4gKiBAcmV0dXJucyBNYXRjaGluZyBQaXBlRGVmXG4gKi9cbmZ1bmN0aW9uIGdldFBpcGVEZWYobmFtZTogc3RyaW5nLCByZWdpc3RyeTogUGlwZURlZkxpc3QgfCBudWxsKTogUGlwZURlZjxhbnk+IHtcbiAgaWYgKHJlZ2lzdHJ5KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWdpc3RyeS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcGlwZURlZiA9IHJlZ2lzdHJ5W2ldO1xuICAgICAgaWYgKG5hbWUgPT09IHBpcGVEZWYubmFtZSkge1xuICAgICAgICByZXR1cm4gcGlwZURlZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBQaXBlIHdpdGggbmFtZSAnJHtuYW1lfScgbm90IGZvdW5kIWApO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMSBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGVCaW5kMShpbmRleDogbnVtYmVyLCB2MTogYW55KTogYW55IHtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiBpc1B1cmUoaW5kZXgpID8gcHVyZUZ1bmN0aW9uMShwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAyIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmQyKGluZGV4OiBudW1iZXIsIHYxOiBhbnksIHYyOiBhbnkpOiBhbnkge1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGluZGV4KTtcbiAgcmV0dXJuIGlzUHVyZShpbmRleCkgPyBwdXJlRnVuY3Rpb24yKHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHYxLCB2MiwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMyBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MiAybmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MyA0cmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGVCaW5kMyhpbmRleDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55LCB2MzogYW55KTogYW55IHtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiBpc1B1cmUoaW5kZXgpID8gcHVyZUZ1bmN0aW9uMyhwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHYzLCBwaXBlSW5zdGFuY2UpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxLCB2MiwgdjMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggNCBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MiAybmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MyAzcmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2NCA0dGggYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGVCaW5kNChpbmRleDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KTogYW55IHtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiBpc1B1cmUoaW5kZXgpID8gcHVyZUZ1bmN0aW9uNChwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHYzLCB2NCwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzLCB2NCk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gbWV0aG9kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmRWKGluZGV4OiBudW1iZXIsIHZhbHVlczogYW55W10pOiBhbnkge1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGluZGV4KTtcbiAgcmV0dXJuIGlzUHVyZShpbmRleCkgPyBwdXJlRnVuY3Rpb25WKHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHZhbHVlcywgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybS5hcHBseShwaXBlSW5zdGFuY2UsIHZhbHVlcyk7XG59XG5cbmZ1bmN0aW9uIGlzUHVyZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiAoPFBpcGVEZWY8YW55Pj5nZXRUVmlldygpLmRhdGFbaW5kZXhdKS5wdXJlO1xufVxuIl19