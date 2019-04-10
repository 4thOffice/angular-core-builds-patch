/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WrappedValue } from '../change_detection/change_detection_util';
import { store, Δload } from './instructions/all';
import { BINDING_INDEX, HEADER_OFFSET, TVIEW } from './interfaces/view';
import { ΔpureFunction1, ΔpureFunction2, ΔpureFunction3, ΔpureFunction4, ΔpureFunctionV } from './pure_function';
import { getLView } from './state';
import { NO_CHANGE } from './tokens';
/**
 * Create a pipe.
 *
 * \@publicApi
 * @param {?} index Pipe index where the pipe will be stored.
 * @param {?} pipeName The name of the pipe
 * @return {?} T the instance of the pipe.
 *
 */
export function Δpipe(index, pipeName) {
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
            (tView.destroyHooks || (tView.destroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
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
 * \@publicApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ΔpipeBind1(index, slotOffset, v1) {
    /** @type {?} */
    const pipeInstance = Δload(index);
    return unwrapValue(isPure(index) ? ΔpureFunction1(slotOffset, pipeInstance.transform, v1, pipeInstance) :
        pipeInstance.transform(v1));
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@publicApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ΔpipeBind2(index, slotOffset, v1, v2) {
    /** @type {?} */
    const pipeInstance = Δload(index);
    return unwrapValue(isPure(index) ? ΔpureFunction2(slotOffset, pipeInstance.transform, v1, v2, pipeInstance) :
        pipeInstance.transform(v1, v2));
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@publicApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 4rd argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ΔpipeBind3(index, slotOffset, v1, v2, v3) {
    /** @type {?} */
    const pipeInstance = Δload(index);
    return unwrapValue(isPure(index) ? ΔpureFunction3(slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance) :
        pipeInstance.transform(v1, v2, v3));
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@publicApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} v1 1st argument to {\@link PipeTransform#transform}.
 * @param {?} v2 2nd argument to {\@link PipeTransform#transform}.
 * @param {?} v3 3rd argument to {\@link PipeTransform#transform}.
 * @param {?} v4 4th argument to {\@link PipeTransform#transform}.
 *
 * @return {?}
 */
export function ΔpipeBind4(index, slotOffset, v1, v2, v3, v4) {
    /** @type {?} */
    const pipeInstance = Δload(index);
    return unwrapValue(isPure(index) ?
        ΔpureFunction4(slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance) :
        pipeInstance.transform(v1, v2, v3, v4));
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {\@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * \@publicApi
 * @param {?} index Pipe index where the pipe was stored on creation.
 * @param {?} slotOffset the offset in the reserved slot space
 * @param {?} values Array of arguments to pass to {\@link PipeTransform#transform} method.
 *
 * @return {?}
 */
export function ΔpipeBindV(index, slotOffset, values) {
    /** @type {?} */
    const pipeInstance = Δload(index);
    return unwrapValue(isPure(index) ? ΔpureFunctionV(slotOffset, pipeInstance.transform, values, pipeInstance) :
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
        /** @type {?} */
        const lView = getLView();
        // The NO_CHANGE value needs to be written at the index where the impacted binding value is
        // stored
        /** @type {?} */
        const bindingToInvalidateIdx = lView[BINDING_INDEX];
        lView[bindingToInvalidateIdx] = NO_CHANGE;
    }
    return newValue;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUd2RSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRWhELE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3RFLE9BQU8sRUFBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0csT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNqQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7Ozs7Ozs7O0FBYW5DLE1BQU0sVUFBVSxLQUFLLENBQUMsS0FBYSxFQUFFLFFBQWdCOztVQUM3QyxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDOztRQUMzQixPQUFxQjs7VUFDbkIsYUFBYSxHQUFHLEtBQUssR0FBRyxhQUFhO0lBRTNDLElBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO1FBQzNCLE9BQU8sR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNwQyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDckIsQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzFGO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sR0FBRyxtQkFBQSxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFnQixDQUFDO0tBQ3JEOztVQUVLLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUMxQyxLQUFLLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzNCLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7Ozs7O0FBWUQsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLFFBQTRCO0lBQzVELElBQUksUUFBUSxFQUFFO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDdkMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDekIsT0FBTyxPQUFPLENBQUM7YUFDaEI7U0FDRjtLQUNGO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLElBQUksdUJBQXVCLENBQUMsQ0FBQztBQUM1RCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsRUFBTzs7VUFDN0QsWUFBWSxHQUFHLEtBQUssQ0FBZ0IsS0FBSyxDQUFDO0lBQ2hELE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFlRCxNQUFNLFVBQVUsVUFBVSxDQUFDLEtBQWEsRUFBRSxVQUFrQixFQUFFLEVBQU8sRUFBRSxFQUFPOztVQUN0RSxZQUFZLEdBQUcsS0FBSyxDQUFnQixLQUFLLENBQUM7SUFDaEQsT0FBTyxXQUFXLENBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzFFLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCRCxNQUFNLFVBQVUsVUFBVSxDQUFDLEtBQWEsRUFBRSxVQUFrQixFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTzs7VUFDL0UsWUFBWSxHQUFHLEtBQUssQ0FBZ0IsS0FBSyxDQUFDO0lBQ2hELE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDOUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkQsTUFBTSxVQUFVLFVBQVUsQ0FDdEIsS0FBYSxFQUFFLFVBQWtCLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTzs7VUFDakUsWUFBWSxHQUFHLEtBQUssQ0FBZ0IsS0FBSyxDQUFDO0lBQ2hELE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ1gsY0FBYyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDOzs7Ozs7Ozs7Ozs7OztBQWNELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsTUFBYTs7VUFDbkUsWUFBWSxHQUFHLEtBQUssQ0FBZ0IsS0FBSyxDQUFDO0lBQ2hELE9BQU8sV0FBVyxDQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQzFFLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7Ozs7O0FBRUQsU0FBUyxNQUFNLENBQUMsS0FBYTtJQUMzQixPQUFPLENBQUMsbUJBQWMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsRUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzVFLENBQUM7Ozs7Ozs7OztBQVNELFNBQVMsV0FBVyxDQUFDLFFBQWE7SUFDaEMsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BDLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztjQUNuQyxLQUFLLEdBQUcsUUFBUSxFQUFFOzs7O2NBR2xCLHNCQUFzQixHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbkQsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsU0FBUyxDQUFDO0tBQzNDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtXcmFwcGVkVmFsdWV9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcbmltcG9ydCB7UGlwZVRyYW5zZm9ybX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9waXBlX3RyYW5zZm9ybSc7XG5cbmltcG9ydCB7c3RvcmUsIM6UbG9hZH0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvYWxsJztcbmltcG9ydCB7UGlwZURlZiwgUGlwZURlZkxpc3R9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7QklORElOR19JTkRFWCwgSEVBREVSX09GRlNFVCwgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7zpRwdXJlRnVuY3Rpb24xLCDOlHB1cmVGdW5jdGlvbjIsIM6UcHVyZUZ1bmN0aW9uMywgzpRwdXJlRnVuY3Rpb240LCDOlHB1cmVGdW5jdGlvblZ9IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5pbXBvcnQge2dldExWaWV3fSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7Tk9fQ0hBTkdFfSBmcm9tICcuL3Rva2Vucyc7XG5cblxuXG4vKipcbiAqIENyZWF0ZSBhIHBpcGUuXG4gKlxuICogQHBhcmFtIGluZGV4IFBpcGUgaW5kZXggd2hlcmUgdGhlIHBpcGUgd2lsbCBiZSBzdG9yZWQuXG4gKiBAcGFyYW0gcGlwZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHBpcGVcbiAqIEByZXR1cm5zIFQgdGhlIGluc3RhbmNlIG9mIHRoZSBwaXBlLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIM6UcGlwZShpbmRleDogbnVtYmVyLCBwaXBlTmFtZTogc3RyaW5nKTogYW55IHtcbiAgY29uc3QgdFZpZXcgPSBnZXRMVmlldygpW1RWSUVXXTtcbiAgbGV0IHBpcGVEZWY6IFBpcGVEZWY8YW55PjtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgSEVBREVSX09GRlNFVDtcblxuICBpZiAodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICBwaXBlRGVmID0gZ2V0UGlwZURlZihwaXBlTmFtZSwgdFZpZXcucGlwZVJlZ2lzdHJ5KTtcbiAgICB0Vmlldy5kYXRhW2FkanVzdGVkSW5kZXhdID0gcGlwZURlZjtcbiAgICBpZiAocGlwZURlZi5vbkRlc3Ryb3kpIHtcbiAgICAgICh0Vmlldy5kZXN0cm95SG9va3MgfHwgKHRWaWV3LmRlc3Ryb3lIb29rcyA9IFtdKSkucHVzaChhZGp1c3RlZEluZGV4LCBwaXBlRGVmLm9uRGVzdHJveSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBpcGVEZWYgPSB0Vmlldy5kYXRhW2FkanVzdGVkSW5kZXhdIGFzIFBpcGVEZWY8YW55PjtcbiAgfVxuXG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IHBpcGVEZWYuZmFjdG9yeShudWxsKTtcbiAgc3RvcmUoaW5kZXgsIHBpcGVJbnN0YW5jZSk7XG4gIHJldHVybiBwaXBlSW5zdGFuY2U7XG59XG5cbi8qKlxuICogU2VhcmNoZXMgdGhlIHBpcGUgcmVnaXN0cnkgZm9yIGEgcGlwZSB3aXRoIHRoZSBnaXZlbiBuYW1lLiBJZiBvbmUgaXMgZm91bmQsXG4gKiByZXR1cm5zIHRoZSBwaXBlLiBPdGhlcndpc2UsIGFuIGVycm9yIGlzIHRocm93biBiZWNhdXNlIHRoZSBwaXBlIGNhbm5vdCBiZSByZXNvbHZlZC5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHBpcGUgdG8gcmVzb2x2ZVxuICogQHBhcmFtIHJlZ2lzdHJ5IEZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgcGlwZXNcbiAqIEByZXR1cm5zIE1hdGNoaW5nIFBpcGVEZWZcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmZ1bmN0aW9uIGdldFBpcGVEZWYobmFtZTogc3RyaW5nLCByZWdpc3RyeTogUGlwZURlZkxpc3QgfCBudWxsKTogUGlwZURlZjxhbnk+IHtcbiAgaWYgKHJlZ2lzdHJ5KSB7XG4gICAgZm9yIChsZXQgaSA9IHJlZ2lzdHJ5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBwaXBlRGVmID0gcmVnaXN0cnlbaV07XG4gICAgICBpZiAobmFtZSA9PT0gcGlwZURlZi5uYW1lKSB7XG4gICAgICAgIHJldHVybiBwaXBlRGVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBwaXBlICcke25hbWV9JyBjb3VsZCBub3QgYmUgZm91bmQhYCk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAxIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIM6UcGlwZUJpbmQxKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IM6UbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiB1bndyYXBWYWx1ZShcbiAgICAgIGlzUHVyZShpbmRleCkgPyDOlHB1cmVGdW5jdGlvbjEoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdjEsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgICAgICAgICAgICAgICAgIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0odjEpKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgcGlwZSB3aXRoIDIgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdjEgMXN0IGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjIgMm5kIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gzpRwaXBlQmluZDIoaW5kZXg6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55KTogYW55IHtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gzpRsb2FkPFBpcGVUcmFuc2Zvcm0+KGluZGV4KTtcbiAgcmV0dXJuIHVud3JhcFZhbHVlKFxuICAgICAgaXNQdXJlKGluZGV4KSA/IM6UcHVyZUZ1bmN0aW9uMihzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgICAgICAgICAgICAgICAgIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0odjEsIHYyKSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAzIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYzIDRyZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIM6UcGlwZUJpbmQzKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IM6UbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiB1bndyYXBWYWx1ZShcbiAgICAgIGlzUHVyZShpbmRleCkgPyDOlHB1cmVGdW5jdGlvbjMoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdjEsIHYyLCB2MywgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzKSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCA0IGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYzIDNyZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHY0IDR0aCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIM6UcGlwZUJpbmQ0KFxuICAgIGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSwgdjQ6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IM6UbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiB1bndyYXBWYWx1ZShcbiAgICAgIGlzUHVyZShpbmRleCkgP1xuICAgICAgICAgIM6UcHVyZUZ1bmN0aW9uNChzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgdjIsIHYzLCB2NCwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzLCB2NCkpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYSBwaXBlIHdpdGggdmFyaWFibGUgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHZhbHVlcyBBcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IG1ldGhvZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDOlHBpcGVCaW5kVihpbmRleDogbnVtYmVyLCBzbG90T2Zmc2V0OiBudW1iZXIsIHZhbHVlczogYW55W10pOiBhbnkge1xuICBjb25zdCBwaXBlSW5zdGFuY2UgPSDOlGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gdW53cmFwVmFsdWUoXG4gICAgICBpc1B1cmUoaW5kZXgpID8gzpRwdXJlRnVuY3Rpb25WKHNsb3RPZmZzZXQsIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHZhbHVlcywgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybS5hcHBseShwaXBlSW5zdGFuY2UsIHZhbHVlcykpO1xufVxuXG5mdW5jdGlvbiBpc1B1cmUoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gKDxQaXBlRGVmPGFueT4+Z2V0TFZpZXcoKVtUVklFV10uZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdKS5wdXJlO1xufVxuXG4vKipcbiAqIFVud3JhcCB0aGUgb3V0cHV0IG9mIGEgcGlwZSB0cmFuc2Zvcm1hdGlvbi5cbiAqIEluIG9yZGVyIHRvIHRyaWNrIGNoYW5nZSBkZXRlY3Rpb24gaW50byBjb25zaWRlcmluZyB0aGF0IHRoZSBuZXcgdmFsdWUgaXMgYWx3YXlzIGRpZmZlcmVudCBmcm9tXG4gKiB0aGUgb2xkIG9uZSwgdGhlIG9sZCB2YWx1ZSBpcyBvdmVyd3JpdHRlbiBieSBOT19DSEFOR0UuXG4gKlxuICogQHBhcmFtIG5ld1ZhbHVlIHRoZSBwaXBlIHRyYW5zZm9ybWF0aW9uIG91dHB1dC5cbiAqL1xuZnVuY3Rpb24gdW53cmFwVmFsdWUobmV3VmFsdWU6IGFueSk6IGFueSB7XG4gIGlmIChXcmFwcGVkVmFsdWUuaXNXcmFwcGVkKG5ld1ZhbHVlKSkge1xuICAgIG5ld1ZhbHVlID0gV3JhcHBlZFZhbHVlLnVud3JhcChuZXdWYWx1ZSk7XG4gICAgY29uc3QgbFZpZXcgPSBnZXRMVmlldygpO1xuICAgIC8vIFRoZSBOT19DSEFOR0UgdmFsdWUgbmVlZHMgdG8gYmUgd3JpdHRlbiBhdCB0aGUgaW5kZXggd2hlcmUgdGhlIGltcGFjdGVkIGJpbmRpbmcgdmFsdWUgaXNcbiAgICAvLyBzdG9yZWRcbiAgICBjb25zdCBiaW5kaW5nVG9JbnZhbGlkYXRlSWR4ID0gbFZpZXdbQklORElOR19JTkRFWF07XG4gICAgbFZpZXdbYmluZGluZ1RvSW52YWxpZGF0ZUlkeF0gPSBOT19DSEFOR0U7XG4gIH1cbiAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuIl19