/**
 * @fileoverview added by tsickle
 * Generated from: packages/core/src/di/injector_compatibility.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../util/property';
import { stringify } from '../util/stringify';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { getInjectableDef } from './interface/defs';
import { InjectFlags } from './interface/injector';
import { Inject, Optional, Self, SkipSelf } from './metadata';
/**
 * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
 *
 * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
 * project.
 *
 * \@publicApi
 * @type {?}
 */
export const INJECTOR = new InjectionToken('INJECTOR', (/** @type {?} */ (-1)));
/** @type {?} */
const _THROW_IF_NOT_FOUND = new Object();
/** @type {?} */
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
/** @type {?} */
export const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
/** @type {?} */
const NG_TOKEN_PATH = 'ngTokenPath';
/** @type {?} */
const NEW_LINE = /\n/gm;
/** @type {?} */
const NO_NEW_LINE = 'ɵ';
/** @type {?} */
export const SOURCE = '__source';
const ɵ0 = getClosureSafeProperty;
/** @type {?} */
export const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 });
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
export function ɵɵinject(token, flags = InjectFlags.Default) {
    return (_injectImplementation || injectInjectorOnly)(resolveForwardRef(token), flags);
}
/**
 * Injects a token from the currently active injector.
 *
 * Must be used in the context of a factory function such as one defined for an
 * `InjectionToken`. Throws an error if not called from such a context.
 *
 * Within such a factory function, using this function to request injection of a dependency
 * is faster and more type-safe than providing an additional array of dependencies
 * (as has been common with `useFactory` providers).
 *
 * \@param token The injection token for the dependency to be injected.
 * \@param flags Optional flags that control how injection is executed.
 * The flags correspond to injection strategies that can be specified with
 * parameter decorators `\@Host`, `\@Self`, `\@SkipSef`, and `\@Optional`.
 * \@return True if injection is successful, null otherwise.
 *
 * \@usageNotes
 *
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 * \@publicApi
 * @type {?}
 */
export const inject = ɵɵinject;
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
        const arg = resolveForwardRef(types[i]);
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
                if (meta instanceof Optional || meta.ngMetadataName === 'Optional' || meta === Optional) {
                    flags |= InjectFlags.Optional;
                }
                else if (meta instanceof SkipSelf || meta.ngMetadataName === 'SkipSelf' || meta === SkipSelf) {
                    flags |= InjectFlags.SkipSelf;
                }
                else if (meta instanceof Self || meta.ngMetadataName === 'Self' || meta === Self) {
                    flags |= InjectFlags.Self;
                }
                else if (meta instanceof Inject || meta === Inject) {
                    type = meta.token;
                }
                else {
                    type = meta;
                }
            }
            args.push(ɵɵinject((/** @type {?} */ (type)), flags));
        }
        else {
            args.push(ɵɵinject(arg));
        }
    }
    return args;
}
export class NullInjector {
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = THROW_IF_NOT_FOUND) {
        if (notFoundValue === THROW_IF_NOT_FOUND) {
            // Intentionally left behind: With dev tools open the debugger will stop here. There is no
            // reason why correctly written application should cause this exception.
            // TODO(misko): uncomment the next line once `ngDevMode` works with closure.
            // if (ngDevMode) debugger;
            /** @type {?} */
            const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    }
}
/**
 * @param {?} e
 * @param {?} token
 * @param {?} injectorErrorName
 * @param {?} source
 * @return {?}
 */
export function catchInjectorError(e, token, injectorErrorName, source) {
    /** @type {?} */
    const tokenPath = e[NG_TEMP_TOKEN_PATH];
    if (token[SOURCE]) {
        tokenPath.unshift(token[SOURCE]);
    }
    e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
    e[NG_TOKEN_PATH] = tokenPath;
    e[NG_TEMP_TOKEN_PATH] = null;
    throw e;
}
/**
 * @param {?} text
 * @param {?} obj
 * @param {?} injectorErrorName
 * @param {?=} source
 * @return {?}
 */
export function formatError(text, obj, injectorErrorName, source = null) {
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    /** @type {?} */
    let context = stringify(obj);
    if (Array.isArray(obj)) {
        context = obj.map(stringify).join(' -> ');
    }
    else if (typeof obj === 'object') {
        /** @type {?} */
        let parts = (/** @type {?} */ ([]));
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                /** @type {?} */
                let value = obj[key];
                parts.push(key + ':' + (typeof value === 'string' ? JSON.stringify(value) : stringify(value)));
            }
        }
        context = `{${parts.join(', ')}}`;
    }
    return `${injectorErrorName}${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3JfY29tcGF0aWJpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdG9yX2NvbXBhdGliaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLGdCQUFnQixFQUFrQixNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVqRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBWTVELE1BQU0sT0FBTyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQ3RDLFVBQVUsRUFDVixtQkFBQSxDQUFDLENBQUMsRUFBTyxDQUNSOztNQUVDLG1CQUFtQixHQUFHLElBQUksTUFBTSxFQUFFOztBQUN4QyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsbUJBQW1COztBQUVyRCxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsaUJBQWlCOztNQUM3QyxhQUFhLEdBQUcsYUFBYTs7TUFDN0IsUUFBUSxHQUFHLE1BQU07O01BQ2pCLFdBQVcsR0FBRyxHQUFHOztBQUN2QixNQUFNLE9BQU8sTUFBTSxHQUFHLFVBQVU7V0FHc0Msc0JBQXNCOztBQUQ1RixNQUFNLE9BQU8sU0FBUyxHQUNsQixzQkFBc0IsQ0FBZ0IsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsSUFBd0IsRUFBQyxD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QUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzQztTQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFOztZQUM5QixLQUFLLEdBQUcsbUJBQVUsRUFBRSxFQUFBO1FBQ3hCLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ25CLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTs7b0JBQ3ZCLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUNwQixLQUFLLENBQUMsSUFBSSxDQUNOLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekY7U0FDRjtRQUNELE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNuQztJQUNELE9BQU8sR0FBRyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksT0FBTyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDbEgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uL3V0aWwvcHJvcGVydHknO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5JztcblxuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi9mb3J3YXJkX3JlZic7XG5pbXBvcnQge0luamVjdGlvblRva2VufSBmcm9tICcuL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCB7Z2V0SW5qZWN0YWJsZURlZiwgybXJtUluamVjdGFibGVEZWZ9IGZyb20gJy4vaW50ZXJmYWNlL2RlZnMnO1xuaW1wb3J0IHtJbmplY3RGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2UvaW5qZWN0b3InO1xuaW1wb3J0IHtWYWx1ZVByb3ZpZGVyfSBmcm9tICcuL2ludGVyZmFjZS9wcm92aWRlcic7XG5pbXBvcnQge0luamVjdCwgT3B0aW9uYWwsIFNlbGYsIFNraXBTZWxmfSBmcm9tICcuL21ldGFkYXRhJztcblxuXG5cbi8qKlxuICogQW4gSW5qZWN0aW9uVG9rZW4gdGhhdCBnZXRzIHRoZSBjdXJyZW50IGBJbmplY3RvcmAgZm9yIGBjcmVhdGVJbmplY3RvcigpYC1zdHlsZSBpbmplY3RvcnMuXG4gKlxuICogUmVxdWVzdGluZyB0aGlzIHRva2VuIGluc3RlYWQgb2YgYEluamVjdG9yYCBhbGxvd3MgYFN0YXRpY0luamVjdG9yYCB0byBiZSB0cmVlLXNoYWtlbiBmcm9tIGFcbiAqIHByb2plY3QuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgSU5KRUNUT1IgPSBuZXcgSW5qZWN0aW9uVG9rZW48SW5qZWN0b3I+KFxuICAgICdJTkpFQ1RPUicsXG4gICAgLTEgYXMgYW55ICAvLyBgLTFgIGlzIHVzZWQgYnkgSXZ5IERJIHN5c3RlbSBhcyBzcGVjaWFsIHZhbHVlIHRvIHJlY29nbml6ZSBpdCBhcyBgSW5qZWN0b3JgLlxuICAgICk7XG5cbmNvbnN0IF9USFJPV19JRl9OT1RfRk9VTkQgPSBuZXcgT2JqZWN0KCk7XG5leHBvcnQgY29uc3QgVEhST1dfSUZfTk9UX0ZPVU5EID0gX1RIUk9XX0lGX05PVF9GT1VORDtcblxuZXhwb3J0IGNvbnN0IE5HX1RFTVBfVE9LRU5fUEFUSCA9ICduZ1RlbXBUb2tlblBhdGgnO1xuY29uc3QgTkdfVE9LRU5fUEFUSCA9ICduZ1Rva2VuUGF0aCc7XG5jb25zdCBORVdfTElORSA9IC9cXG4vZ207XG5jb25zdCBOT19ORVdfTElORSA9ICfJtSc7XG5leHBvcnQgY29uc3QgU09VUkNFID0gJ19fc291cmNlJztcblxuZXhwb3J0IGNvbnN0IFVTRV9WQUxVRSA9XG4gICAgZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eTxWYWx1ZVByb3ZpZGVyPih7cHJvdmlkZTogU3RyaW5nLCB1c2VWYWx1ZTogZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0pO1xuXG4vKipcbiAqIEN1cnJlbnQgaW5qZWN0b3IgdmFsdWUgdXNlZCBieSBgaW5qZWN0YC5cbiAqIC0gYHVuZGVmaW5lZGA6IGl0IGlzIGFuIGVycm9yIHRvIGNhbGwgYGluamVjdGBcbiAqIC0gYG51bGxgOiBgaW5qZWN0YCBjYW4gYmUgY2FsbGVkIGJ1dCB0aGVyZSBpcyBubyBpbmplY3RvciAobGltcC1tb2RlKS5cbiAqIC0gSW5qZWN0b3IgaW5zdGFuY2U6IFVzZSB0aGUgaW5qZWN0b3IgZm9yIHJlc29sdXRpb24uXG4gKi9cbmxldCBfY3VycmVudEluamVjdG9yOiBJbmplY3Rvcnx1bmRlZmluZWR8bnVsbCA9IHVuZGVmaW5lZDtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1cnJlbnRJbmplY3RvcihpbmplY3RvcjogSW5qZWN0b3IgfCBudWxsIHwgdW5kZWZpbmVkKTogSW5qZWN0b3J8dW5kZWZpbmVkfG51bGwge1xuICBjb25zdCBmb3JtZXIgPSBfY3VycmVudEluamVjdG9yO1xuICBfY3VycmVudEluamVjdG9yID0gaW5qZWN0b3I7XG4gIHJldHVybiBmb3JtZXI7XG59XG5cbi8qKlxuICogQ3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiBpbmplY3QuXG4gKlxuICogQnkgZGVmYXVsdCwgaXQgaXMgYGluamVjdEluamVjdG9yT25seWAsIHdoaWNoIG1ha2VzIGl0IGBJbmplY3RvcmAtb25seSBhd2FyZS4gSXQgY2FuIGJlIGNoYW5nZWRcbiAqIHRvIGBkaXJlY3RpdmVJbmplY3RgLCB3aGljaCBicmluZ3MgaW4gdGhlIGBOb2RlSW5qZWN0b3JgIHN5c3RlbSBvZiBpdnkuIEl0IGlzIGRlc2lnbmVkIHRoaXNcbiAqIHdheSBmb3IgdHdvIHJlYXNvbnM6XG4gKiAgMS4gYEluamVjdG9yYCBzaG91bGQgbm90IGRlcGVuZCBvbiBpdnkgbG9naWMuXG4gKiAgMi4gVG8gbWFpbnRhaW4gdHJlZSBzaGFrZS1hYmlsaXR5IHdlIGRvbid0IHdhbnQgdG8gYnJpbmcgaW4gdW5uZWNlc3NhcnkgY29kZS5cbiAqL1xubGV0IF9pbmplY3RJbXBsZW1lbnRhdGlvbjpcbiAgICAoPFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3M/OiBJbmplY3RGbGFncykgPT4gVCB8IG51bGwpfHVuZGVmaW5lZDtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IGluamVjdCBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEluamVjdEltcGxlbWVudGF0aW9uKFxuICAgIGltcGw6ICg8VD4odG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LCBmbGFncz86IEluamVjdEZsYWdzKSA9PiBUIHwgbnVsbCkgfCB1bmRlZmluZWQpOlxuICAgICg8VD4odG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LCBmbGFncz86IEluamVjdEZsYWdzKSA9PiBUIHwgbnVsbCl8dW5kZWZpbmVkIHtcbiAgY29uc3QgcHJldmlvdXMgPSBfaW5qZWN0SW1wbGVtZW50YXRpb247XG4gIF9pbmplY3RJbXBsZW1lbnRhdGlvbiA9IGltcGw7XG4gIHJldHVybiBwcmV2aW91cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEluamVjdG9yT25seTxUPih0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4pOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEluamVjdG9yT25seTxUPih0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4sIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUfFxuICAgIG51bGw7XG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0SW5qZWN0b3JPbmx5PFQ+KFxuICAgIHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0KTogVHxudWxsIHtcbiAgaWYgKF9jdXJyZW50SW5qZWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgaW5qZWN0KCkgbXVzdCBiZSBjYWxsZWQgZnJvbSBhbiBpbmplY3Rpb24gY29udGV4dGApO1xuICB9IGVsc2UgaWYgKF9jdXJyZW50SW5qZWN0b3IgPT09IG51bGwpIHtcbiAgICByZXR1cm4gaW5qZWN0Um9vdExpbXBNb2RlKHRva2VuLCB1bmRlZmluZWQsIGZsYWdzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gX2N1cnJlbnRJbmplY3Rvci5nZXQodG9rZW4sIGZsYWdzICYgSW5qZWN0RmxhZ3MuT3B0aW9uYWwgPyBudWxsIDogdW5kZWZpbmVkLCBmbGFncyk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZWQgaW5zdHJ1Y3Rpb246IEluamVjdHMgYSB0b2tlbiBmcm9tIHRoZSBjdXJyZW50bHkgYWN0aXZlIGluamVjdG9yLlxuICpcbiAqIE11c3QgYmUgdXNlZCBpbiB0aGUgY29udGV4dCBvZiBhIGZhY3RvcnkgZnVuY3Rpb24gc3VjaCBhcyBvbmUgZGVmaW5lZCBmb3IgYW5cbiAqIGBJbmplY3Rpb25Ub2tlbmAuIFRocm93cyBhbiBlcnJvciBpZiBub3QgY2FsbGVkIGZyb20gc3VjaCBhIGNvbnRleHQuXG4gKlxuICogKEFkZGl0aW9uYWwgZG9jdW1lbnRhdGlvbiBtb3ZlZCB0byBgaW5qZWN0YCwgYXMgaXQgaXMgdGhlIHB1YmxpYyBBUEksIGFuZCBhbiBhbGlhcyBmb3IgdGhpcyBpbnN0cnVjdGlvbilcbiAqXG4gKiBAc2VlIGluamVjdFxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVpbmplY3Q8VD4odG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+KTogVDtcbmV4cG9ydCBmdW5jdGlvbiDJtcm1aW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFR8bnVsbDtcbmV4cG9ydCBmdW5jdGlvbiDJtcm1aW5qZWN0PFQ+KHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgZmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0KTogVHxcbiAgICBudWxsIHtcbiAgcmV0dXJuIChfaW5qZWN0SW1wbGVtZW50YXRpb24gfHwgaW5qZWN0SW5qZWN0b3JPbmx5KShyZXNvbHZlRm9yd2FyZFJlZih0b2tlbiksIGZsYWdzKTtcbn1cblxuLyoqXG4gKiBJbmplY3RzIGEgdG9rZW4gZnJvbSB0aGUgY3VycmVudGx5IGFjdGl2ZSBpbmplY3Rvci5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgaW4gdGhlIGNvbnRleHQgb2YgYSBmYWN0b3J5IGZ1bmN0aW9uIHN1Y2ggYXMgb25lIGRlZmluZWQgZm9yIGFuXG4gKiBgSW5qZWN0aW9uVG9rZW5gLiBUaHJvd3MgYW4gZXJyb3IgaWYgbm90IGNhbGxlZCBmcm9tIHN1Y2ggYSBjb250ZXh0LlxuICpcbiAqIFdpdGhpbiBzdWNoIGEgZmFjdG9yeSBmdW5jdGlvbiwgdXNpbmcgdGhpcyBmdW5jdGlvbiB0byByZXF1ZXN0IGluamVjdGlvbiBvZiBhIGRlcGVuZGVuY3lcbiAqIGlzIGZhc3RlciBhbmQgbW9yZSB0eXBlLXNhZmUgdGhhbiBwcm92aWRpbmcgYW4gYWRkaXRpb25hbCBhcnJheSBvZiBkZXBlbmRlbmNpZXNcbiAqIChhcyBoYXMgYmVlbiBjb21tb24gd2l0aCBgdXNlRmFjdG9yeWAgcHJvdmlkZXJzKS5cbiAqXG4gKiBAcGFyYW0gdG9rZW4gVGhlIGluamVjdGlvbiB0b2tlbiBmb3IgdGhlIGRlcGVuZGVuY3kgdG8gYmUgaW5qZWN0ZWQuXG4gKiBAcGFyYW0gZmxhZ3MgT3B0aW9uYWwgZmxhZ3MgdGhhdCBjb250cm9sIGhvdyBpbmplY3Rpb24gaXMgZXhlY3V0ZWQuXG4gKiBUaGUgZmxhZ3MgY29ycmVzcG9uZCB0byBpbmplY3Rpb24gc3RyYXRlZ2llcyB0aGF0IGNhbiBiZSBzcGVjaWZpZWQgd2l0aFxuICogcGFyYW1ldGVyIGRlY29yYXRvcnMgYEBIb3N0YCwgYEBTZWxmYCwgYEBTa2lwU2VmYCwgYW5kIGBAT3B0aW9uYWxgLlxuICogQHJldHVybnMgVHJ1ZSBpZiBpbmplY3Rpb24gaXMgc3VjY2Vzc2Z1bCwgbnVsbCBvdGhlcndpc2UuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2luamVjdG9yX3NwZWMudHMgcmVnaW9uPSdTaGFrYWJsZUluamVjdGlvblRva2VuJ31cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBpbmplY3QgPSDJtcm1aW5qZWN0O1xuXG4vKipcbiAqIEluamVjdHMgYHJvb3RgIHRva2VucyBpbiBsaW1wIG1vZGUuXG4gKlxuICogSWYgbm8gaW5qZWN0b3IgZXhpc3RzLCB3ZSBjYW4gc3RpbGwgaW5qZWN0IHRyZWUtc2hha2FibGUgcHJvdmlkZXJzIHdoaWNoIGhhdmUgYHByb3ZpZGVkSW5gIHNldCB0b1xuICogYFwicm9vdFwiYC4gVGhpcyBpcyBrbm93biBhcyB0aGUgbGltcCBtb2RlIGluamVjdGlvbi4gSW4gc3VjaCBjYXNlIHRoZSB2YWx1ZSBpcyBzdG9yZWQgaW4gdGhlXG4gKiBgSW5qZWN0YWJsZURlZmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RSb290TGltcE1vZGU8VD4oXG4gICAgdG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlOiBUIHwgdW5kZWZpbmVkLCBmbGFnczogSW5qZWN0RmxhZ3MpOiBUfG51bGwge1xuICBjb25zdCBpbmplY3RhYmxlRGVmOiDJtcm1SW5qZWN0YWJsZURlZjxUPnxudWxsID0gZ2V0SW5qZWN0YWJsZURlZih0b2tlbik7XG4gIGlmIChpbmplY3RhYmxlRGVmICYmIGluamVjdGFibGVEZWYucHJvdmlkZWRJbiA9PSAncm9vdCcpIHtcbiAgICByZXR1cm4gaW5qZWN0YWJsZURlZi52YWx1ZSA9PT0gdW5kZWZpbmVkID8gaW5qZWN0YWJsZURlZi52YWx1ZSA9IGluamVjdGFibGVEZWYuZmFjdG9yeSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5qZWN0YWJsZURlZi52YWx1ZTtcbiAgfVxuICBpZiAoZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCkgcmV0dXJuIG51bGw7XG4gIGlmIChub3RGb3VuZFZhbHVlICE9PSB1bmRlZmluZWQpIHJldHVybiBub3RGb3VuZFZhbHVlO1xuICB0aHJvdyBuZXcgRXJyb3IoYEluamVjdG9yOiBOT1RfRk9VTkQgWyR7c3RyaW5naWZ5KHRva2VuKX1dYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RBcmdzKHR5cGVzOiAoVHlwZTxhbnk+fCBJbmplY3Rpb25Ub2tlbjxhbnk+fCBhbnlbXSlbXSk6IGFueVtdIHtcbiAgY29uc3QgYXJnczogYW55W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFyZyA9IHJlc29sdmVGb3J3YXJkUmVmKHR5cGVzW2ldKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICBpZiAoYXJnLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FyZ3VtZW50cyBhcnJheSBtdXN0IGhhdmUgYXJndW1lbnRzLicpO1xuICAgICAgfVxuICAgICAgbGV0IHR5cGU6IFR5cGU8YW55Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgZmxhZ3M6IEluamVjdEZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdDtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcmcubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IGFyZ1tqXTtcbiAgICAgICAgaWYgKG1ldGEgaW5zdGFuY2VvZiBPcHRpb25hbCB8fCBtZXRhLm5nTWV0YWRhdGFOYW1lID09PSAnT3B0aW9uYWwnIHx8IG1ldGEgPT09IE9wdGlvbmFsKSB7XG4gICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuT3B0aW9uYWw7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBtZXRhIGluc3RhbmNlb2YgU2tpcFNlbGYgfHwgbWV0YS5uZ01ldGFkYXRhTmFtZSA9PT0gJ1NraXBTZWxmJyB8fCBtZXRhID09PSBTa2lwU2VsZikge1xuICAgICAgICAgIGZsYWdzIHw9IEluamVjdEZsYWdzLlNraXBTZWxmO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGEgaW5zdGFuY2VvZiBTZWxmIHx8IG1ldGEubmdNZXRhZGF0YU5hbWUgPT09ICdTZWxmJyB8fCBtZXRhID09PSBTZWxmKSB7XG4gICAgICAgICAgZmxhZ3MgfD0gSW5qZWN0RmxhZ3MuU2VsZjtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRhIGluc3RhbmNlb2YgSW5qZWN0IHx8IG1ldGEgPT09IEluamVjdCkge1xuICAgICAgICAgIHR5cGUgPSBtZXRhLnRva2VuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHR5cGUgPSBtZXRhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFyZ3MucHVzaCjJtcm1aW5qZWN0KHR5cGUgISwgZmxhZ3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncy5wdXNoKMm1ybVpbmplY3QoYXJnKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcmdzO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBOdWxsSW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlOiBhbnkgPSBUSFJPV19JRl9OT1RfRk9VTkQpOiBhbnkge1xuICAgIGlmIChub3RGb3VuZFZhbHVlID09PSBUSFJPV19JRl9OT1RfRk9VTkQpIHtcbiAgICAgIC8vIEludGVudGlvbmFsbHkgbGVmdCBiZWhpbmQ6IFdpdGggZGV2IHRvb2xzIG9wZW4gdGhlIGRlYnVnZ2VyIHdpbGwgc3RvcCBoZXJlLiBUaGVyZSBpcyBub1xuICAgICAgLy8gcmVhc29uIHdoeSBjb3JyZWN0bHkgd3JpdHRlbiBhcHBsaWNhdGlvbiBzaG91bGQgY2F1c2UgdGhpcyBleGNlcHRpb24uXG4gICAgICAvLyBUT0RPKG1pc2tvKTogdW5jb21tZW50IHRoZSBuZXh0IGxpbmUgb25jZSBgbmdEZXZNb2RlYCB3b3JrcyB3aXRoIGNsb3N1cmUuXG4gICAgICAvLyBpZiAobmdEZXZNb2RlKSBkZWJ1Z2dlcjtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBOdWxsSW5qZWN0b3JFcnJvcjogTm8gcHJvdmlkZXIgZm9yICR7c3RyaW5naWZ5KHRva2VuKX0hYCk7XG4gICAgICBlcnJvci5uYW1lID0gJ051bGxJbmplY3RvckVycm9yJztcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEluamVjdG9yRXJyb3IoXG4gICAgZTogYW55LCB0b2tlbjogYW55LCBpbmplY3RvckVycm9yTmFtZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZyB8IG51bGwpOiBuZXZlciB7XG4gIGNvbnN0IHRva2VuUGF0aDogYW55W10gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF07XG4gIGlmICh0b2tlbltTT1VSQ0VdKSB7XG4gICAgdG9rZW5QYXRoLnVuc2hpZnQodG9rZW5bU09VUkNFXSk7XG4gIH1cbiAgZS5tZXNzYWdlID0gZm9ybWF0RXJyb3IoJ1xcbicgKyBlLm1lc3NhZ2UsIHRva2VuUGF0aCwgaW5qZWN0b3JFcnJvck5hbWUsIHNvdXJjZSk7XG4gIGVbTkdfVE9LRU5fUEFUSF0gPSB0b2tlblBhdGg7XG4gIGVbTkdfVEVNUF9UT0tFTl9QQVRIXSA9IG51bGw7XG4gIHRocm93IGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRFcnJvcihcbiAgICB0ZXh0OiBzdHJpbmcsIG9iajogYW55LCBpbmplY3RvckVycm9yTmFtZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZyB8IG51bGwgPSBudWxsKTogc3RyaW5nIHtcbiAgdGV4dCA9IHRleHQgJiYgdGV4dC5jaGFyQXQoMCkgPT09ICdcXG4nICYmIHRleHQuY2hhckF0KDEpID09IE5PX05FV19MSU5FID8gdGV4dC5zdWJzdHIoMikgOiB0ZXh0O1xuICBsZXQgY29udGV4dCA9IHN0cmluZ2lmeShvYmopO1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgY29udGV4dCA9IG9iai5tYXAoc3RyaW5naWZ5KS5qb2luKCcgLT4gJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICBsZXQgcGFydHMgPSA8c3RyaW5nW10+W107XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBwYXJ0cy5wdXNoKFxuICAgICAgICAgICAga2V5ICsgJzonICsgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiBzdHJpbmdpZnkodmFsdWUpKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnRleHQgPSBgeyR7cGFydHMuam9pbignLCAnKX19YDtcbiAgfVxuICByZXR1cm4gYCR7aW5qZWN0b3JFcnJvck5hbWV9JHtzb3VyY2UgPyAnKCcgKyBzb3VyY2UgKyAnKScgOiAnJ31bJHtjb250ZXh0fV06ICR7dGV4dC5yZXBsYWNlKE5FV19MSU5FLCAnXFxuICAnKX1gO1xufVxuIl19