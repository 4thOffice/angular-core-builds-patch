/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/render3/pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WrappedValue } from '../change_detection/change_detection_util';
import { getFactoryDef } from './definition';
import { store } from './instructions/all';
import { HEADER_OFFSET, TVIEW } from './interfaces/view';
import { pureFunction1Internal, pureFunction2Internal, pureFunction3Internal, pureFunction4Internal, pureFunctionVInternal } from './pure_function';
import { getBindingIndex, getBindingRoot, getLView } from './state';
import { NO_CHANGE } from './tokens';
import { load } from './util/view_utils';
/**
 * Create a pipe.
 *
 * \@codeGenApi
 * @param {?} index Pipe index where the pipe will be stored.
 * @param {?} pipeName The name of the pipe
 * @return {?} T the instance of the pipe.
 *
 */
export function ɵɵpipe(index, pipeName) {
    /** @type {?} */
    const tView = getLView()[TVIEW];
    /** @type {?} */
    let pipeDef;
    /** @type {?} */
    const adjustedIndex = index + HEADER_OFFSET;
    if (tView.firstCreatePass) {
        pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
        tView.data[adjustedIndex] = pipeDef;
        if (pipeDef.onDestroy) {
            (tView.destroyHooks || (tView.destroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
        }
    }
    else {
        pipeDef = (/** @type {?} */ (tView.data[adjustedIndex]));
    }
    /** @type {?} */
    const pipeFactory = pipeDef.factory || (pipeDef.factory = getFactoryDef(pipeDef.type, true));
    /** @type {?} */
    const pipeInstance = pipeFactory();
    store(index, pipeInstance);
    return pipeInstance;
}
/**
 * Searches the pipe registry for a pipe with the given name. If one is found,
 * returns the pipe. Otherwise, an error is thrown because the pipe cannot be resolved.
 *
 * \@publicApi
 * @param {?} name Name of pipe to resolve
 * @param {?} registry Full list of available pipes
 * @return {?} Matching PipeDef
 *
 */
function getPipeDef(name, registry) {
    if (registry) {
        for (let i = registry.length - 1; i >= 0; i--) {
            /** @type {?} */
            const pipeDef = registry[i];
            if (name === pipeDef.name) {
                return pipeDef;
            }
        }
    }
    throw new Error(`The pipe '${name}' could not be found!`);
}
/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@codeGenApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ɵɵpipeBind1(index, slotOffset, v1) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const pipeInstance = load(lView, index);
    return unwrapValue(lView, isPure(lView, index) ?
        pureFunction1Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, pipeInstance) :
        pipeInstance.transform(v1));
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@codeGenApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ɵɵpipeBind2(index, slotOffset, v1, v2) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const pipeInstance = load(lView, index);
    return unwrapValue(lView, isPure(lView, index) ?
        pureFunction2Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, v2, pipeInstance) :
        pipeInstance.transform(v1, v2));
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@codeGenApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 4rd argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ɵɵpipeBind3(index, slotOffset, v1, v2, v3) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const pipeInstance = load(lView, index);
    return unwrapValue(lView, isPure(lView, index) ? pureFunction3Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance) :
        pipeInstance.transform(v1, v2, v3));
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@codeGenApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 3rd argument to {\@link PipeTransform#transform}.
 * @param {?} v4 4th argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ɵɵpipeBind4(index, slotOffset, v1, v2, v3, v4) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const pipeInstance = load(lView, index);
    return unwrapValue(lView, isPure(lView, index) ? pureFunction4Internal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance) :
        pipeInstance.transform(v1, v2, v3, v4));
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@codeGenApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} values Array of arguments to pass to {\@link PipeTransform#transform} method.
 *
 * @return {?}
 */
export function ɵɵpipeBindV(index, slotOffset, values) {
    /** @type {?} */
    const lView = getLView();
    /** @type {?} */
    const pipeInstance = load(lView, index);
    return unwrapValue(lView, isPure(lView, index) ?
        pureFunctionVInternal(lView, getBindingRoot(), slotOffset, pipeInstance.transform, values, pipeInstance) :
        pipeInstance.transform.apply(pipeInstance, values));
}
/**
 * @param {?} lView
 * @param {?} index
 * @return {?}
 */
function isPure(lView, index) {
    return ((/** @type {?} */ (lView[TVIEW].data[index + HEADER_OFFSET]))).pure;
}
/**
 * Unwrap the output of a pipe transformation.
 * In order to trick change detection into considering that the new value is always different from
 * the old one, the old value is overwritten by NO_CHANGE.
 *
 * @param {?} lView
 * @param {?} newValue the pipe transformation output.
 * @return {?}
 */
function unwrapValue(lView, newValue) {
    if (WrappedValue.isWrapped(newValue)) {
        newValue = WrappedValue.unwrap(newValue);
        // The NO_CHANGE value needs to be written at the index where the impacted binding value is
        // stored
        /** @type {?} */
        const bindingToInvalidateIdx = getBindingIndex();
        lView[bindingToInvalidateIdx] = NO_CHANGE;
    }
    return newValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFHdkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFekMsT0FBTyxFQUFDLGFBQWEsRUFBUyxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsSixPQUFPLEVBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbEUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7QUFhdkMsTUFBTSxVQUFVLE1BQU0sQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7O1VBQzlDLEtBQUssR0FBRyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUM7O1FBQzNCLE9BQXFCOztVQUNuQixhQUFhLEdBQUcsS0FBSyxHQUFHLGFBQWE7SUFFM0MsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNwQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDckIsQ0FBQyxLQUFLLENBQUMs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Q0FBQyxDQUFDLENBQUM7UUFDeEYsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQzs7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsS0FBWSxFQUFFLEtBQWE7SUFDekMsT0FBTyxDQUFDLG1CQUFjLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxFQUFBLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDdkUsQ0FBQzs7Ozs7Ozs7OztBQVNELFNBQVMsV0FBVyxDQUFDLEtBQVksRUFBRSxRQUFhO0lBQzlDLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztjQUduQyxzQkFBc0IsR0FBRyxlQUFlLEVBQUU7UUFDaEQsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsU0FBUyxDQUFDO0tBQzNDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtXcmFwcGVkVmFsdWV9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcbmltcG9ydCB7UGlwZVRyYW5zZm9ybX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9waXBlX3RyYW5zZm9ybSc7XG5cbmltcG9ydCB7Z2V0RmFjdG9yeURlZn0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7c3RvcmV9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zL2FsbCc7XG5pbXBvcnQge1BpcGVEZWYsIFBpcGVEZWZMaXN0fSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge0hFQURFUl9PRkZTRVQsIExWaWV3LCBUVklFV30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtwdXJlRnVuY3Rpb24xSW50ZXJuYWwsIHB1cmVGdW5jdGlvbjJJbnRlcm5hbCwgcHVyZUZ1bmN0aW9uM0ludGVybmFsLCBwdXJlRnVuY3Rpb240SW50ZXJuYWwsIHB1cmVGdW5jdGlvblZJbnRlcm5hbH0gZnJvbSAnLi9wdXJlX2Z1bmN0aW9uJztcbmltcG9ydCB7Z2V0QmluZGluZ0luZGV4LCBnZXRCaW5kaW5nUm9vdCwgZ2V0TFZpZXd9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtOT19DSEFOR0V9IGZyb20gJy4vdG9rZW5zJztcbmltcG9ydCB7bG9hZH0gZnJvbSAnLi91dGlsL3ZpZXdfdXRpbHMnO1xuXG5cblxuLyoqXG4gKiBDcmVhdGUgYSBwaXBlLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIHBpcGVOYW1lIFRoZSBuYW1lIG9mIHRoZSBwaXBlXG4gKiBAcmV0dXJucyBUIHRoZSBpbnN0YW5jZSBvZiB0aGUgcGlwZS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXBpcGUoaW5kZXg6IG51bWJlciwgcGlwZU5hbWU6IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHRWaWV3ID0gZ2V0TFZpZXcoKVtUVklFV107XG4gIGxldCBwaXBlRGVmOiBQaXBlRGVmPGFueT47XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPSBpbmRleCArIEhFQURFUl9PRkZTRVQ7XG5cbiAgaWYgKHRWaWV3LmZpcnN0Q3JlYXRlUGFzcykge1xuICAgIHBpcGVEZWYgPSBnZXRQaXBlRGVmKHBpcGVOYW1lLCB0Vmlldy5waXBlUmVnaXN0cnkpO1xuICAgIHRWaWV3LmRhdGFbYWRqdXN0ZWRJbmRleF0gPSBwaXBlRGVmO1xuICAgIGlmIChwaXBlRGVmLm9uRGVzdHJveSkge1xuICAgICAgKHRWaWV3LmRlc3Ryb3lIb29rcyB8fCAodFZpZXcuZGVzdHJveUhvb2tzID0gW10pKS5wdXNoKGFkanVzdGVkSW5kZXgsIHBpcGVEZWYub25EZXN0cm95KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGlwZURlZiA9IHRWaWV3LmRhdGFbYWRqdXN0ZWRJbmRleF0gYXMgUGlwZURlZjxhbnk+O1xuICB9XG5cbiAgY29uc3QgcGlwZUZhY3RvcnkgPSBwaXBlRGVmLmZhY3RvcnkgfHwgKHBpcGVEZWYuZmFjdG9yeSA9IGdldEZhY3RvcnlEZWYocGlwZURlZi50eXBlLCB0cnVlKSk7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IHBpcGVGYWN0b3J5KCk7XG4gIHN0b3JlKGluZGV4LCBwaXBlSW5zdGFuY2UpO1xuICByZXR1cm4gcGlwZUluc3RhbmNlO1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRoZSBwaXBlIHJlZ2lzdHJ5IGZvciBhIHBpcGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZS4gSWYgb25lIGlzIGZvdW5kLFxuICogcmV0dXJucyB0aGUgcGlwZS4gT3RoZXJ3aXNlLCBhbiBlcnJvciBpcyB0aHJvd24gYmVjYXVzZSB0aGUgcGlwZSBjYW5ub3QgYmUgcmVzb2x2ZWQuXG4gKlxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiBwaXBlIHRvIHJlc29sdmVcbiAqIEBwYXJhbSByZWdpc3RyeSBGdWxsIGxpc3Qgb2YgYXZhaWxhYmxlIHBpcGVzXG4gKiBAcmV0dXJucyBNYXRjaGluZyBQaXBlRGVmXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5mdW5jdGlvbiBnZXRQaXBlRGVmKG5hbWU6IHN0cmluZywgcmVnaXN0cnk6IFBpcGVEZWZMaXN0IHwgbnVsbCk6IFBpcGVEZWY8YW55PiB7XG4gIGlmIChyZWdpc3RyeSkge1xuICAgIGZvciAobGV0IGkgPSByZWdpc3RyeS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgcGlwZURlZiA9IHJlZ2lzdHJ5W2ldO1xuICAgICAgaWYgKG5hbWUgPT09IHBpcGVEZWYubmFtZSkge1xuICAgICAgICByZXR1cm4gcGlwZURlZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcGlwZSAnJHtuYW1lfScgY291bGQgbm90IGJlIGZvdW5kIWApO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMSBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2VcbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXBpcGVCaW5kMShpbmRleDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHYxOiBhbnkpOiBhbnkge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4obFZpZXcsIGluZGV4KTtcbiAgcmV0dXJuIHVud3JhcFZhbHVlKFxuICAgICAgbFZpZXcsIGlzUHVyZShsVmlldywgaW5kZXgpID9cbiAgICAgICAgICBwdXJlRnVuY3Rpb24xSW50ZXJuYWwoXG4gICAgICAgICAgICAgIGxWaWV3LCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSkpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggMiBhcmd1bWVudHMuXG4gKlxuICogVGhpcyBpbnN0cnVjdGlvbiBhY3RzIGFzIGEgZ3VhcmQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfSBpbnZva2luZ1xuICogdGhlIHBpcGUgb25seSB3aGVuIGFuIGlucHV0IHRvIHRoZSBwaXBlIGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2FzIHN0b3JlZCBvbiBjcmVhdGlvbi5cbiAqIEBwYXJhbSBzbG90T2Zmc2V0IHRoZSBvZmZzZXQgaW4gdGhlIHJlc2VydmVkIHNsb3Qgc3BhY2VcbiAqIEBwYXJhbSB2MSAxc3QgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqIEBwYXJhbSB2MiAybmQgYXJndW1lbnQgdG8ge0BsaW5rIFBpcGVUcmFuc2Zvcm0jdHJhbnNmb3JtfS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtXBpcGVCaW5kMihpbmRleDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHYxOiBhbnksIHYyOiBhbnkpOiBhbnkge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4obFZpZXcsIGluZGV4KTtcbiAgcmV0dXJuIHVud3JhcFZhbHVlKFxuICAgICAgbFZpZXcsIGlzUHVyZShsVmlldywgaW5kZXgpID9cbiAgICAgICAgICBwdXJlRnVuY3Rpb24ySW50ZXJuYWwoXG4gICAgICAgICAgICAgIGxWaWV3LCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgICAgIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0odjEsIHYyKSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAzIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYzIDRyZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cGlwZUJpbmQzKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSk6IGFueSB7XG4gIGNvbnN0IGxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihsVmlldywgaW5kZXgpO1xuICByZXR1cm4gdW53cmFwVmFsdWUoXG4gICAgICBsVmlldywgaXNQdXJlKGxWaWV3LCBpbmRleCkgPyBwdXJlRnVuY3Rpb24zSW50ZXJuYWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbFZpZXcsIGdldEJpbmRpbmdSb290KCksIHNsb3RPZmZzZXQsIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdjEsIHYyLCB2MywgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxLCB2MiwgdjMpKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgcGlwZSB3aXRoIDQgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdjEgMXN0IGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjIgMm5kIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjMgM3JkIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjQgNHRoIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVwaXBlQmluZDQoXG4gICAgaW5kZXg6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KTogYW55IHtcbiAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSBsb2FkPFBpcGVUcmFuc2Zvcm0+KGxWaWV3LCBpbmRleCk7XG4gIHJldHVybiB1bndyYXBWYWx1ZShcbiAgICAgIGxWaWV3LCBpc1B1cmUobFZpZXcsIGluZGV4KSA/IHB1cmVGdW5jdGlvbjRJbnRlcm5hbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsVmlldywgZ2V0QmluZGluZ1Jvb3QoKSwgc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2MSwgdjIsIHYzLCB2NCwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxLCB2MiwgdjMsIHY0KSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gbWV0aG9kLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1cGlwZUJpbmRWKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdmFsdWVzOiBbYW55LCAuLi5hbnlbXV0pOiBhbnkge1xuICBjb25zdCBsVmlldyA9IGdldExWaWV3KCk7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4obFZpZXcsIGluZGV4KTtcbiAgcmV0dXJuIHVud3JhcFZhbHVlKFxuICAgICAgbFZpZXcsIGlzUHVyZShsVmlldywgaW5kZXgpID9cbiAgICAgICAgICBwdXJlRnVuY3Rpb25WSW50ZXJuYWwoXG4gICAgICAgICAgICAgIGxWaWV3LCBnZXRCaW5kaW5nUm9vdCgpLCBzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2YWx1ZXMsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgICAgIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0uYXBwbHkocGlwZUluc3RhbmNlLCB2YWx1ZXMpKTtcbn1cblxuZnVuY3Rpb24gaXNQdXJlKGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKDxQaXBlRGVmPGFueT4+bFZpZXdbVFZJRVddLmRhdGFbaW5kZXggKyBIRUFERVJfT0ZGU0VUXSkucHVyZTtcbn1cblxuLyoqXG4gKiBVbndyYXAgdGhlIG91dHB1dCBvZiBhIHBpcGUgdHJhbnNmb3JtYXRpb24uXG4gKiBJbiBvcmRlciB0byB0cmljayBjaGFuZ2UgZGV0ZWN0aW9uIGludG8gY29uc2lkZXJpbmcgdGhhdCB0aGUgbmV3IHZhbHVlIGlzIGFsd2F5cyBkaWZmZXJlbnQgZnJvbVxuICogdGhlIG9sZCBvbmUsIHRoZSBvbGQgdmFsdWUgaXMgb3ZlcndyaXR0ZW4gYnkgTk9fQ0hBTkdFLlxuICpcbiAqIEBwYXJhbSBuZXdWYWx1ZSB0aGUgcGlwZSB0cmFuc2Zvcm1hdGlvbiBvdXRwdXQuXG4gKi9cbmZ1bmN0aW9uIHVud3JhcFZhbHVlKGxWaWV3OiBMVmlldywgbmV3VmFsdWU6IGFueSk6IGFueSB7XG4gIGlmIChXcmFwcGVkVmFsdWUuaXNXcmFwcGVkKG5ld1ZhbHVlKSkge1xuICAgIG5ld1ZhbHVlID0gV3JhcHBlZFZhbHVlLnVud3JhcChuZXdWYWx1ZSk7XG4gICAgLy8gVGhlIE5PX0NIQU5HRSB2YWx1ZSBuZWVkcyB0byBiZSB3cml0dGVuIGF0IHRoZSBpbmRleCB3aGVyZSB0aGUgaW1wYWN0ZWQgYmluZGluZyB2YWx1ZSBpc1xuICAgIC8vIHN0b3JlZFxuICAgIGNvbnN0IGJpbmRpbmdUb0ludmFsaWRhdGVJZHggPSBnZXRCaW5kaW5nSW5kZXgoKTtcbiAgICBsVmlld1tiaW5kaW5nVG9JbnZhbGlkYXRlSWR4XSA9IE5PX0NIQU5HRTtcbiAgfVxuICByZXR1cm4gbmV3VmFsdWU7XG59XG4iXX0=