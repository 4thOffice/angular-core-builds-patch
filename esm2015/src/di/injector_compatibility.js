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
import { stringify } from '../util/stringify';
import { getInjectableDef } from './interface/defs';
import { InjectFlags } from './interface/injector';
import { Inject, Optional, Self, SkipSelf } from './metadata';
/**
 * Current injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - `null`: `inject` can be called but there is no injector (limp-mode).
 * - Injector instance: Use the injector for resolution.
 * @type {?}
 */
let _currentInjector = undefined;
/**
 * @param {?} injector
 * @return {?}
 */
export function setCurrentInjector(injector) {
    /** @type {?} */
    const former = _currentInjector;
    _currentInjector = injector;
    return former;
}
/**
 * Current implementation of inject.
 *
 * By default, it is `injectInjectorOnly`, which makes it `Injector`-only aware. It can be changed
 * to `directiveInject`, which brings in the `NodeInjector` system of ivy. It is designed this
 * way for two reasons:
 *  1. `Injector` should not depend on ivy logic.
 *  2. To maintain tree shake-ability we don't want to bring in unnecessary code.
 * @type {?}
 */
let _injectImplementation;
/**
 * Sets the current inject implementation.
 * @param {?} impl
 * @return {?}
 */
export function setInjectImplementation(impl) {
    /** @type {?} */
    const previous = _injectImplementation;
    _injectImplementation = impl;
    return previous;
}
/**
 * @template T
 * @param {?} token
 * @param {?=} flags
 * @return {?}
 */
export function injectInjectorOnly(token, flags = InjectFlags.Default) {
    if (_currentInjector === undefined) {
        throw new Error(`inject() must be called from an injection context`);
    }
    else if (_currentInjector === null) {
        return injectRootLimpMode(token, undefined, flags);
    }
    else {
        return _currentInjector.get(token, flags & InjectFlags.Optional ? null : undefined, flags);
    }
}
/**
 * @template T
 * @param {?} token
 * @param {?=} flags
 * @return {?}
 */
export function inject(token, flags = InjectFlags.Default) {
    return (_injectImplementation || injectInjectorOnly)(token, flags);
}
/**
 * Injects `root` tokens in limp mode.
 *
 * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
 * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
 * `InjectableDef`.
 * @template T
 * @param {?} token
 * @param {?} notFoundValue
 * @param {?} flags
 * @return {?}
 */
export function injectRootLimpMode(token, notFoundValue, flags) {
    /** @type {?} */
    const injectableDef = getInjectableDef(token);
    if (injectableDef && injectableDef.providedIn == 'root') {
        return injectableDef.value === undefined ? injectableDef.value = injectableDef.factory() :
            injectableDef.value;
    }
    if (flags & InjectFlags.Optional)
        return null;
    if (notFoundValue !== undefined)
        return notFoundValue;
    throw new Error(`Injector: NOT_FOUND [${stringify(token)}]`);
}
/**
 * @param {?} types
 * @return {?}
 */
export function injectArgs(types) {
    /** @type {?} */
    const args = [];
    for (let i = 0; i < types.length; i++) {
        /** @type {?} */
        const arg = types[i];
        if (Array.isArray(arg)) {
            if (arg.length === 0) {
                throw new Error('Arguments array must have arguments.');
            }
            /** @type {?} */
            let type = undefined;
            /** @type {?} */
            let flags = InjectFlags.Default;
            for (let j = 0; j < arg.length; j++) {
                /** @type {?} */
                const meta = arg[j];
                if (meta instanceof Optional || meta.ngMetadataName === 'Optional') {
                    flags |= InjectFlags.Optional;
                }
                else if (meta instanceof SkipSelf || meta.ngMetadataName === 'SkipSelf') {
                    flags |= InjectFlags.SkipSelf;
                }
                else if (meta instanceof Self || meta.ngMetadataName === 'Self') {
                    flags |= InjectFlags.Self;
                }
                else if (meta instanceof Inject) {
                    type = meta.token;
                }
                else {
                    type = meta;
                }
            }
            args.push(inject((/** @type {?} */ (type)), flags));
        }
        else {
            args.push(inject(arg));
        }
    }
    return args;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfY29tcGF0aWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdG9yX2NvbXBhdGliaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFTQSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFJNUMsT0FBTyxFQUFnQixnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztJQVV4RCxnQkFBZ0IsR0FBNEIsU0FBUzs7Ozs7QUFFekQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFFBQXFDOztVQUNoRSxNQUFNLEdBQUcsZ0JBQWdCO0lBQy9CLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztJQUM1QixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDOzs7Ozs7Ozs7OztJQVdHLHFCQUNTOzs7Ozs7QUFLYixNQUFNLFVBQVUsdUJBQXVCLENBQ25DLElBQTJGOztVQUV2RixRQUFRLEdBQUcscUJBQXFCO0lBQ3RDLHFCQUFxQixHQUFHLElBQUksQ0FBQztJQUM3QixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7Ozs7O0FBS0QsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixLQUFpQyxFQUFFLEtBQUssR0FBRyxXQUFXLENBQUMsT0FBTztJQUNoRSxJQUFJLGdCQUFnQixLQUFLLFNBQVMsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7S0FDdEU7U0FBTSxJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTtRQUNwQyxPQUFPLGtCQUFrQixDQUFDLEtBQUssRUFBRSxTQUFT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YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDeEI7S0FDRjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnknO1xuXG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCB7SW5qZWN0YWJsZURlZiwgZ2V0SW5qZWN0YWJsZURlZn0gZnJvbSAnLi9pbnRlcmZhY2UvZGVmcyc7XG5pbXBvcnQge0luamVjdEZsYWdzfSBmcm9tICcuL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge0luamVjdCwgT3B0aW9uYWwsIFNlbGYsIFNraXBTZWxmfSBmcm9tICcuL21ldGFkYXRhJztcblxuXG5cbi8qKlxuICogQ3VycmVudCBpbmplY3RvciB2YWx1ZSB1c2VkIGJ5IGBpbmplY3RgLlxuICogLSBgdW5kZWZpbmVkYDogaXQgaXMgYW4gZXJyb3IgdG8gY2FsbCBgaW5qZWN0YFxuICogLSBgbnVsbGA6IGBpbmplY3RgIGNhbiBiZSBjYWxsZWQgYnV0IHRoZXJlIGlzIG5vIGluamVjdG9yIChsaW1wLW1vZGUpLlxuICogLSBJbmplY3RvciBpbnN0YW5jZTogVXNlIHRoZSBpbmplY3RvciBmb3IgcmVzb2x1dGlvbi5cbiAqL1xubGV0IF9jdXJyZW50SW5qZWN0b3I6IEluamVjdG9yfHVuZGVmaW5lZHxudWxsID0gdW5kZWZpbmVkO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudEluamVjdG9yKGluamVjdG9yOiBJbmplY3RvciB8IG51bGwgfCB1bmRlZmluZWQpOiBJbmplY3Rvcnx1bmRlZmluZWR8bnVsbCB7XG4gIGNvbnN0IGZvcm1lciA9IF9jdXJyZW50SW5qZWN0b3I7XG4gIF9jdXJyZW50SW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgcmV0dXJuIGZvcm1lcjtcbn1cblxuLyoqXG4gKiBDdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIGluamVjdC5cbiAqXG4gKiBCeSBkZWZhdWx0LCBpdCBpcyBgaW5qZWN0SW5qZWN0b3JPbmx5YCwgd2hpY2ggbWFrZXMgaXQgYEluamVjdG9yYC1vbmx5IGF3YXJlLiBJdCBjYW4gYmUgY2hhbmdlZFxuICogdG8gYGRpcmVjdGl2ZUluamVjdGAsIHdoaWNoIGJyaW5ncyBpbiB0aGUgYE5vZGVJbmplY3RvcmAgc3lzdGVtIG9mIGl2eS4gSXQgaXMgZGVzaWduZWQgdGhpc1xuICogd2F5IGZvciB0d28gcmVhc29uczpcbiAqICAxLiBgSW5qZWN0b3JgIHNob3VsZCBub3QgZGVwZW5kIG9uIGl2eSBsb2dpYy5cbiAqICAyLiBUbyBtYWludGFpbiB0cmVlIHNoYWtlLWFiaWxpdHkgd2UgZG9uJ3Qgd2FudCB0byBicmluZyBpbiB1bm5lY2Vzc2FyeSBjb2RlLlxuICovXG5sZXQgX2luamVjdEltcGxlbWVudGF0aW9uOiAoPFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3M6IEluamVjdEZsYWdzKSA9PiBUIHwgbnVsbCl8XG4gICAgdW5kZWZpbmVkO1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgaW5qZWN0IGltcGxlbWVudGF0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5qZWN0SW1wbGVtZW50YXRpb24oXG4gICAgaW1wbDogKDxUPih0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4sIGZsYWdzPzogSW5qZWN0RmxhZ3MpID0+IFQgfCBudWxsKSB8IHVuZGVmaW5lZCk6XG4gICAgKDxUPih0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4sIGZsYWdzPzogSW5qZWN0RmxhZ3MpID0+IFQgfCBudWxsKXx1bmRlZmluZWQge1xuICBjb25zdCBwcmV2aW91cyA9IF9pbmplY3RJbXBsZW1lbnRhdGlvbjtcbiAgX2luamVjdEltcGxlbWVudGF0aW9uID0gaW1wbDtcbiAgcmV0dXJuIHByZXZpb3VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SW5qZWN0b3JPbmx5PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPik6IFQ7XG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SW5qZWN0b3JPbmx5PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFR8XG4gICAgbnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RJbmplY3Rvck9ubHk8VD4oXG4gICAgdG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LCBmbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBUfG51bGwge1xuICBpZiAoX2N1cnJlbnRJbmplY3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBpbmplY3QoKSBtdXN0IGJlIGNhbGxlZCBmcm9tIGFuIGluamVjdGlvbiBjb250ZXh0YCk7XG4gIH0gZWxzZSBpZiAoX2N1cnJlbnRJbmplY3RvciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBpbmplY3RSb290TGltcE1vZGUodG9rZW4sIHVuZGVmaW5lZCwgZmxhZ3MpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBfY3VycmVudEluamVjdG9yLmdldCh0b2tlbiwgZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCA/IG51bGwgOiB1bmRlZmluZWQsIGZsYWdzKTtcbiAgfVxufVxuXG4vKipcbiAqIEluamVjdHMgYSB0b2tlbiBmcm9tIHRoZSBjdXJyZW50bHkgYWN0aXZlIGluamVjdG9yLlxuICogTXVzdCBiZSB1c2VkIGluIHRoZSBjb250ZXh0IG9mIGEgZmFjdG9yeSBmdW5jdGlvbiBzdWNoIGFzIG9uZSBkZWZpbmVkIGZvciBhblxuICogYEluamVjdGlvblRva2VuYC4gVGhyb3dzIGFuIGVycm9yIGlmIG5vdCBjYWxsZWQgZnJvbSBzdWNoIGEgY29udGV4dC5cbiAqXG4gKiBXaXRoaW4gc3VjaCBhIGZhY3RvcnkgZnVuY3Rpb24sIHVzaW5nIHRoaXMgZnVuY3Rpb24gdG8gcmVxdWVzdCBpbmplY3Rpb24gb2YgYSBkZXBlbmRlbmN5XG4gKiBpcyBmYXN0ZXIgYW5kIG1vcmUgdHlwZS1zYWZlIHRoYW4gcHJvdmlkaW5nIGFuIGFkZGl0aW9uYWwgYXJyYXkgb2YgZGVwZW5kZW5jaWVzXG4gKiAoYXMgaGFzIGJlZW4gY29tbW9uIHdpdGggYHVzZUZhY3RvcnlgIHByb3ZpZGVycykuXG4gKlxuICogQHBhcmFtIHRva2VuIFRoZSBpbmplY3Rpb24gdG9rZW4gZm9yIHRoZSBkZXBlbmRlbmN5IHRvIGJlIGluamVjdGVkLlxuICogQHBhcmFtIGZsYWdzIE9wdGlvbmFsIGZsYWdzIHRoYXQgY29udHJvbCBob3cgaW5qZWN0aW9uIGlzIGV4ZWN1dGVkLlxuICogVGhlIGZsYWdzIGNvcnJlc3BvbmQgdG8gaW5qZWN0aW9uIHN0cmF0ZWdpZXMgdGhhdCBjYW4gYmUgc3BlY2lmaWVkIHdpdGhcbiAqIHBhcmFtZXRlciBkZWNvcmF0b3JzIGBASG9zdGAsIGBAU2VsZmAsIGBAU2tpcFNlZmAsIGFuZCBgQE9wdGlvbmFsYC5cbiAqIEByZXR1cm5zIFRydWUgaWYgaW5qZWN0aW9uIGlzIHN1Y2Nlc3NmdWwsIG51bGwgb3RoZXJ3aXNlLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9pbmplY3Rvcl9zcGVjLnRzIHJlZ2lvbj0nU2hha2FibGVJbmplY3Rpb25Ub2tlbid9XG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPik6IFQ7XG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFR8bnVsbDtcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3Q8VD4odG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LCBmbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQpOiBUfG51bGwge1xuICByZXR1cm4gKF9pbmplY3RJbXBsZW1lbnRhdGlvbiB8fCBpbmplY3RJbmplY3Rvck9ubHkpKHRva2VuLCBmbGFncyk7XG59XG5cbi8qKlxuICogSW5qZWN0cyBgcm9vdGAgdG9rZW5zIGluIGxpbXAgbW9kZS5cbiAqXG4gKiBJZiBubyBpbmplY3RvciBleGlzdHMsIHdlIGNhbiBzdGlsbCBpbmplY3QgdHJlZS1zaGFrYWJsZSBwcm92aWRlcnMgd2hpY2ggaGF2ZSBgcHJvdmlkZWRJbmAgc2V0IHRvXG4gKiBgXCJyb290XCJgLiBUaGlzIGlzIGtub3duIGFzIHRoZSBsaW1wIG1vZGUgaW5qZWN0aW9uLiBJbiBzdWNoIGNhc2UgdGhlIHZhbHVlIGlzIHN0b3JlZCBpbiB0aGVcbiAqIGBJbmplY3RhYmxlRGVmYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdFJvb3RMaW1wTW9kZTxUPihcbiAgICB0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4sIG5vdEZvdW5kVmFsdWU6IFQgfCB1bmRlZmluZWQsIGZsYWdzOiBJbmplY3RGbGFncyk6IFR8bnVsbCB7XG4gIGNvbnN0IGluamVjdGFibGVEZWY6IEluamVjdGFibGVEZWY8VD58bnVsbCA9IGdldEluamVjdGFibGVEZWYodG9rZW4pO1xuICBpZiAoaW5qZWN0YWJsZURlZiAmJiBpbmplY3RhYmxlRGVmLnByb3ZpZGVkSW4gPT0gJ3Jvb3QnKSB7XG4gICAgcmV0dXJuIGluamVjdGFibGVEZWYudmFsdWUgPT09IHVuZGVmaW5lZCA/IGluamVjdGFibGVEZWYudmFsdWUgPSBpbmplY3RhYmxlRGVmLmZhY3RvcnkoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluamVjdGFibGVEZWYudmFsdWU7XG4gIH1cbiAgaWYgKGZsYWdzICYgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpIHJldHVybiBudWxsO1xuICBpZiAobm90Rm91bmRWYWx1ZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgdGhyb3cgbmV3IEVycm9yKGBJbmplY3RvcjogTk9UX0ZPVU5EIFske3N0cmluZ2lmeSh0b2tlbil9XWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXJncyh0eXBlczogKFR5cGU8YW55PnwgSW5qZWN0aW9uVG9rZW48YW55PnwgYW55W10pW10pOiBhbnlbXSB7XG4gIGNvbnN0IGFyZ3M6IGFueVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhcmcgPSB0eXBlc1tpXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICBpZiAoYXJnLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50cyBhcnJheSBtdXN0IGhhdmUgYXJndW1lbnRzLicpO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGU6IFR5cGU8YW55Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgZmxhZ3M6IEluamVjdEZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcmcubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFyZ1tqXTtcbiAgICAgICAgaWYgKG1ldGEgaW5zdGFuY2VvZiBPcHRpb25hbCB8fCBtZXRhLm5nTWV0YWRhdGFOYW1lID09PSAnT3B0aW9uYWwnKSB7XG4gICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuT3B0aW9uYWw7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0YSBpbnN0YW5jZW9mIFNraXBTZWxmIHx8IG1ldGEubmdNZXRhZGF0YU5hbWUgPT09ICdTa2lwU2VsZicpIHtcbiAgICAgICAgICBmbGFncyB8PSBJbmplY3RGbGFncy5Ta2lwU2VsZjtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRhIGluc3RhbmNlb2YgU2VsZiB8fCBtZXRhLm5nTWV0YWRhdGFOYW1lID09PSAnU2VsZicpIHtcbiAgICAgICAgICBmbGFncyB8PSBJbmplY3RGbGFncy5TZWxmO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGEgaW5zdGFuY2VvZiBJbmplY3QpIHtcbiAgICAgICAgICB0eXBlID0gbWV0YS50b2tlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0eXBlID0gbWV0YTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhcmdzLnB1c2goaW5qZWN0KHR5cGUgISwgZmxhZ3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncy5wdXNoKGluamVjdChhcmcpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFyZ3M7XG59XG4iXX0=