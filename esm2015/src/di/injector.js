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
import { getClosureSafeProperty } from '../util/property';
import { stringify } from '../util/stringify';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { Δinject } from './injector_compatibility';
import { ΔdefineInjectable } from './interface/defs';
import { InjectFlags } from './interface/injector';
import { Inject, Optional, Self, SkipSelf } from './metadata';
/** @type {?} */
export const SOURCE = '__source';
/** @type {?} */
const _THROW_IF_NOT_FOUND = new Object();
/** @type {?} */
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
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
export class NullInjector {
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            // Intentionally left behind: With dev tools open the debugger will stop here. There is no
            // reason why correctly written application should cause this exception.
            // TODO(misko): uncomment the next line once `ngDevMode` works with closure.
            // if(ngDevMode) debugger;
            /** @type {?} */
            const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
            error.name = 'NullInjectorError';
            throw error;
        }
        return notFoundValue;
    }
}
/**
 * Concrete injectors implement this interface.
 *
 * For more details, see the ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {\@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * \@publicApi
 * @abstract
 */
export class Injector {
    /**
     * Create a new Injector which is configure using `StaticProvider`s.
     *
     * \@usageNotes
     * ### Example
     *
     * {\@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
     * @param {?} options
     * @param {?=} parent
     * @return {?}
     */
    static create(options, parent) {
        if (Array.isArray(options)) {
            return new StaticInjector(options, parent);
        }
        else {
            return new StaticInjector(options.providers, options.parent, options.name || null);
        }
    }
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new NullInjector();
/** @nocollapse */
/** @nocollapse */ Injector.ngInjectableDef = ΔdefineInjectable({
    providedIn: (/** @type {?} */ ('any')),
    factory: (/**
     * @return {?}
     */
    () => Δinject(INJECTOR)),
});
/**
 * \@internal
 * @nocollapse
 */
Injector.__NG_ELEMENT_ID__ = -1;
if (false) {
    /** @type {?} */
    Injector.THROW_IF_NOT_FOUND;
    /** @type {?} */
    Injector.NULL;
    /**
     * @nocollapse
     * @type {?}
     */
    Injector.ngInjectableDef;
    /**
     * \@internal
     * @nocollapse
     * @type {?}
     */
    Injector.__NG_ELEMENT_ID__;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     * @abstract
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?} The instance from the injector if defined, otherwise the `notFoundValue`.
     */
    Injector.prototype.get = function (token, notFoundValue, flags) { };
    /**
     * @deprecated from v4.0.0 use Type<T> or InjectionToken<T>
     * @suppress {duplicate}
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    Injector.prototype.get = function (token, notFoundValue) { };
}
/** @type {?} */
const IDENT = (/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function (value) {
    return value;
});
const ɵ0 = IDENT;
/** @type {?} */
const EMPTY = (/** @type {?} */ ([]));
/** @type {?} */
const CIRCULAR = IDENT;
/** @type {?} */
const MULTI_PROVIDER_FN = (/**
 * @return {?}
 */
function () {
    return Array.prototype.slice.call(arguments);
});
const ɵ1 = MULTI_PROVIDER_FN;
/** @type {?} */
export const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: getClosureSafeProperty });
/** @type {?} */
const NG_TOKEN_PATH = 'ngTokenPath';
/** @type {?} */
export const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
/** @enum {number} */
const OptionFlags = {
    Optional: 1,
    CheckSelf: 2,
    CheckParent: 4,
    Default: 6,
};
/** @type {?} */
const NULL_INJECTOR = Injector.NULL;
/** @type {?} */
const NEW_LINE = /\n/gm;
/** @type {?} */
const NO_NEW_LINE = 'ɵ';
export class StaticInjector {
    /**
     * @param {?} providers
     * @param {?=} parent
     * @param {?=} source
     */
    constructor(providers, parent = NULL_INJECTOR, source = null) {
        this.parent = parent;
        this.source = source;
        /** @type {?} */
        const records = this._records = new Map();
        records.set(Injector, (/** @type {?} */ ({ token: Injector, fn: IDENT, deps: EMPTY, value: this, useNew: false })));
        records.set(INJECTOR, (/** @type {?} */ ({ token: INJECTOR, fn: IDENT, deps: EMPTY, value: this, useNew: false })));
        recursivelyProcessProviders(records, providers);
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    get(token, notFoundValue, flags = InjectFlags.Default) {
        /** @type {?} */
        const record = this._records.get(token);
        try {
            return tryResolveToken(token, record, this._records, this.parent, notFoundValue, flags);
        }
        catch (e) {
            return catchInjectorError(e, token, 'StaticInjectorError', this.source);
        }
    }
    /**
     * @return {?}
     */
    toString() {
        /** @type {?} */
        const tokens = (/** @type {?} */ ([]));
        /** @type {?} */
        const records = this._records;
        records.forEach((/**
         * @param {?} v
         * @param {?} token
         * @return {?}
         */
        (v, token) => tokens.push(stringify(token))));
        return `StaticInjector[${tokens.join(', ')}]`;
    }
}
if (false) {
    /** @type {?} */
    StaticInjector.prototype.parent;
    /** @type {?} */
    StaticInjector.prototype.source;
    /**
     * @type {?}
     * @private
     */
    StaticInjector.prototype._records;
}
/**
 * @record
 */
function Record() { }
if (false) {
    /** @type {?} */
    Record.prototype.fn;
    /** @type {?} */
    Record.prototype.useNew;
    /** @type {?} */
    Record.prototype.deps;
    /** @type {?} */
    Record.prototype.value;
}
/**
 * @record
 */
function DependencyRecord() { }
if (false) {
    /** @type {?} */
    DependencyRecord.prototype.token;
    /** @type {?} */
    DependencyRecord.prototype.options;
}
/**
 * @param {?} provider
 * @return {?}
 */
function resolveProvider(provider) {
    /** @type {?} */
    const deps = computeDeps(provider);
    /** @type {?} */
    let fn = IDENT;
    /** @type {?} */
    let value = EMPTY;
    /** @type {?} */
    let useNew = false;
    /** @type {?} */
    let provide = resolveForwardRef(provider.provide);
    if (USE_VALUE in provider) {
        // We need to use USE_VALUE in provider since provider.useValue could be defined as undefined.
        value = ((/** @type {?} */ (provider))).useValue;
    }
    else if (((/** @type {?} */ (provider))).useFactory) {
        fn = ((/** @type {?} */ (provider))).useFactory;
    }
    else if (((/** @type {?} */ (provider))).useExisting) {
        // Just use IDENT
    }
    else if (((/** @type {?} */ (provider))).useClass) {
        useNew = true;
        fn = resolveForwardRef(((/** @type {?} */ (provider))).useClass);
    }
    else if (typeof provide == 'function') {
        useNew = true;
        fn = provide;
    }
    else {
        throw staticError('StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable', provider);
    }
    return { deps, fn, useNew, value };
}
/**
 * @param {?} token
 * @return {?}
 */
function multiProviderMixError(token) {
    return staticError('Cannot mix multi providers and regular providers', token);
}
/**
 * @param {?} records
 * @param {?} provider
 * @return {?}
 */
function recursivelyProcessProviders(records, provider) {
    if (provider) {
        provider = resolveForwardRef(provider);
        if (provider instanceof Array) {
            // if we have an array recurse into the array
            for (let i = 0; i < provider.length; i++) {
                recursivelyProcessProviders(records, provider[i]);
            }
        }
        else if (typeof provider === 'function') {
            // Functions were supported in ReflectiveInjector, but are not here. For safety give useful
            // error messages
            throw staticError('Function/Class not supported', provider);
        }
        else if (provider && typeof provider === 'object' && provider.provide) {
            // At this point we have what looks like a provider: {provide: ?, ....}
            /** @type {?} */
            let token = resolveForwardRef(provider.provide);
            /** @type {?} */
            const resolvedProvider = resolveProvider(provider);
            if (provider.multi === true) {
                // This is a multi provider.
                /** @type {?} */
                let multiProvider = records.get(token);
                if (multiProvider) {
                    if (multiProvider.fn !== MULTI_PROVIDER_FN) {
                        throw multiProviderMixError(token);
                    }
                }
                else {
                    // Create a placeholder factory which will look up the constituents of the multi provider.
                    records.set(token, multiProvider = (/** @type {?} */ ({
                        token: provider.provide,
                        deps: [],
                        useNew: false,
                        fn: MULTI_PROVIDER_FN,
                        value: EMPTY
                    })));
                }
                // Treat the provider as the token.
                token = provider;
                multiProvider.deps.push({ token, options: 6 /* Default */ });
            }
            /** @type {?} */
            const record = records.get(token);
            if (record && record.fn == MULTI_PROVIDER_FN) {
                throw multiProviderMixError(token);
            }
            records.set(token, resolvedProvider);
        }
        else {
            throw staticError('Unexpected provider', provider);
        }
    }
}
/**
 * @param {?} token
 * @param {?} record
 * @param {?} records
 * @param {?} parent
 * @param {?} notFoundValue
 * @param {?} flags
 * @return {?}
 */
function tryResolveToken(token, record, records, parent, notFoundValue, flags) {
    try {
        return resolveToken(token, record, records, parent, notFoundValue, flags);
    }
    catch (e) {
        // ensure that 'e' is of type Error.
        if (!(e instanceof Error)) {
            e = new Error(e);
        }
        /** @type {?} */
        const path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
        path.unshift(token);
        if (record && record.value == CIRCULAR) {
            // Reset the Circular flag.
            record.value = EMPTY;
        }
        throw e;
    }
}
/**
 * @param {?} token
 * @param {?} record
 * @param {?} records
 * @param {?} parent
 * @param {?} notFoundValue
 * @param {?} flags
 * @return {?}
 */
function resolveToken(token, record, records, parent, notFoundValue, flags) {
    /** @type {?} */
    let value;
    if (record && !(flags & InjectFlags.SkipSelf)) {
        // If we don't have a record, this implies that we don't own the provider hence don't know how
        // to resolve it.
        value = record.value;
        if (value == CIRCULAR) {
            throw Error(NO_NEW_LINE + 'Circular dependency');
        }
        else if (value === EMPTY) {
            record.value = CIRCULAR;
            /** @type {?} */
            let obj = undefined;
            /** @type {?} */
            let useNew = record.useNew;
            /** @type {?} */
            let fn = record.fn;
            /** @type {?} */
            let depRecords = record.deps;
            /** @type {?} */
            let deps = EMPTY;
            if (depRecords.length) {
                deps = [];
                for (let i = 0; i < depRecords.length; i++) {
                    /** @type {?} */
                    const depRecord = depRecords[i];
                    /** @type {?} */
                    const options = depRecord.options;
                    /** @type {?} */
                    const childRecord = options & 2 /* CheckSelf */ ? records.get(depRecord.token) : undefined;
                    deps.push(tryResolveToken(
                    // Current Token to resolve
                    depRecord.token, 
                    // A record which describes how to resolve the token.
                    // If undefined, this means we don't have such a record
                    childRecord, 
                    // Other records we know about.
                    records, 
                    // If we don't know how to resolve dependency and we should not check parent for it,
                    // than pass in Null injector.
                    !childRecord && !(options & 4 /* CheckParent */) ? NULL_INJECTOR : parent, options & 1 /* Optional */ ? null : Injector.THROW_IF_NOT_FOUND, InjectFlags.Default));
                }
            }
            record.value = value = useNew ? new ((/** @type {?} */ (fn)))(...deps) : fn.apply(obj, deps);
        }
    }
    else if (!(flags & InjectFlags.Self)) {
        value = parent.get(token, notFoundValue, InjectFlags.Default);
    }
    return value;
}
/**
 * @param {?} provider
 * @return {?}
 */
function computeDeps(provider) {
    /** @type {?} */
    let deps = EMPTY;
    /** @type {?} */
    const providerDeps = ((/** @type {?} */ (provider))).deps;
    if (providerDeps && providerDeps.length) {
        deps = [];
        for (let i = 0; i < providerDeps.length; i++) {
            /** @type {?} */
            let options = 6 /* Default */;
            /** @type {?} */
            let token = resolveForwardRef(providerDeps[i]);
            if (token instanceof Array) {
                for (let j = 0, annotations = token; j < annotations.length; j++) {
                    /** @type {?} */
                    const annotation = annotations[j];
                    if (annotation instanceof Optional || annotation == Optional) {
                        options = options | 1 /* Optional */;
                    }
                    else if (annotation instanceof SkipSelf || annotation == SkipSelf) {
                        options = options & ~2 /* CheckSelf */;
                    }
                    else if (annotation instanceof Self || annotation == Self) {
                        options = options & ~4 /* CheckParent */;
                    }
                    else if (annotation instanceof Inject) {
                        token = ((/** @type {?} */ (annotation))).token;
                    }
                    else {
                        token = resolveForwardRef(annotation);
                    }
                }
            }
            deps.push({ token, options });
        }
    }
    else if (((/** @type {?} */ (provider))).useExisting) {
        /** @type {?} */
        const token = resolveForwardRef(((/** @type {?} */ (provider))).useExisting);
        deps = [{ token, options: 6 /* Default */ }];
    }
    else if (!providerDeps && !(USE_VALUE in provider)) {
        // useValue & useExisting are the only ones which are exempt from deps all others need it.
        throw staticError('\'deps\' required', provider);
    }
    return deps;
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
function formatError(text, obj, injectorErrorName, source = null) {
    text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
    /** @type {?} */
    let context = stringify(obj);
    if (obj instanceof Array) {
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
/**
 * @param {?} text
 * @param {?} obj
 * @return {?}
 */
function staticError(text, obj) {
    return new Error(formatError(text, obj, 'StaticInjectorError'));
}
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9pbmplY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVNBLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxNQUFNLFlBQVksQ0FBQzs7QUFFNUQsTUFBTSxPQUFPLE1BQU0sR0FBRyxVQUFVOztNQUMxQixtQkFBbUIsR0FBRyxJQUFJLE1BQU0sRUFBRTs7QUFDeEMsTUFBTSxPQUFPLGtCQUFrQixHQUFHLG1CQUFtQjs7Ozs7Ozs7OztBQVVyRCxNQUFNLE9BQU8sUUFBUSxHQUFHLElBQUksY0FBYyxDQUN0QyxVQUFVLEVBQ1YsbUJBQUEsQ0FBQyxDQUFDLEVBQU8sQ0FDUjtBQUVMLE1BQU0sT0FBTyxZQUFZOzs7Ozs7SUFDdkIsR0FBRyxDQUFDLEtBQVUsRUFBRSxnQkFBcUIsbUJBQW1CO1FBQ3RELElBQUksYUFBYSxLQUFLLG1CQUFtQixFQUFFOzs7Ozs7a0JBS25DLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDbEYsS0FBSyxD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QUM7Ozs7OztBQUVELFNBQVMsV0FBVyxDQUFDLElBQVksRUFBRSxHQUFRO0lBQ3pDLE9BQU8sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSBmcm9tICcuLi91dGlsL3Byb3BlcnR5JztcbmltcG9ydCB7c3RyaW5naWZ5fSBmcm9tICcuLi91dGlsL3N0cmluZ2lmeSc7XG5pbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmfSBmcm9tICcuL2ZvcndhcmRfcmVmJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4vaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7zpRpbmplY3R9IGZyb20gJy4vaW5qZWN0b3JfY29tcGF0aWJpbGl0eSc7XG5pbXBvcnQge86UZGVmaW5lSW5qZWN0YWJsZX0gZnJvbSAnLi9pbnRlcmZhY2UvZGVmcyc7XG5pbXBvcnQge0luamVjdEZsYWdzfSBmcm9tICcuL2ludGVyZmFjZS9pbmplY3Rvcic7XG5pbXBvcnQge0NvbnN0cnVjdG9yUHJvdmlkZXIsIEV4aXN0aW5nUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgU3RhdGljQ2xhc3NQcm92aWRlciwgU3RhdGljUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXJ9IGZyb20gJy4vaW50ZXJmYWNlL3Byb3ZpZGVyJztcbmltcG9ydCB7SW5qZWN0LCBPcHRpb25hbCwgU2VsZiwgU2tpcFNlbGZ9IGZyb20gJy4vbWV0YWRhdGEnO1xuXG5leHBvcnQgY29uc3QgU09VUkNFID0gJ19fc291cmNlJztcbmNvbnN0IF9USFJPV19JRl9OT1RfRk9VTkQgPSBuZXcgT2JqZWN0KCk7XG5leHBvcnQgY29uc3QgVEhST1dfSUZfTk9UX0ZPVU5EID0gX1RIUk9XX0lGX05PVF9GT1VORDtcblxuLyoqXG4gKiBBbiBJbmplY3Rpb25Ub2tlbiB0aGF0IGdldHMgdGhlIGN1cnJlbnQgYEluamVjdG9yYCBmb3IgYGNyZWF0ZUluamVjdG9yKClgLXN0eWxlIGluamVjdG9ycy5cbiAqXG4gKiBSZXF1ZXN0aW5nIHRoaXMgdG9rZW4gaW5zdGVhZCBvZiBgSW5qZWN0b3JgIGFsbG93cyBgU3RhdGljSW5qZWN0b3JgIHRvIGJlIHRyZWUtc2hha2VuIGZyb20gYVxuICogcHJvamVjdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBJTkpFQ1RPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJbmplY3Rvcj4oXG4gICAgJ0lOSkVDVE9SJyxcbiAgICAtMSBhcyBhbnkgIC8vIGAtMWAgaXMgdXNlZCBieSBJdnkgREkgc3lzdGVtIGFzIHNwZWNpYWwgdmFsdWUgdG8gcmVjb2duaXplIGl0IGFzIGBJbmplY3RvcmAuXG4gICAgKTtcblxuZXhwb3J0IGNsYXNzIE51bGxJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU6IGFueSA9IF9USFJPV19JRl9OT1RfRk9VTkQpOiBhbnkge1xuICAgIGlmIChub3RGb3VuZFZhbHVlID09PSBfVEhST1dfSUZfTk9UX0ZPVU5EKSB7XG4gICAgICAvLyBJbnRlbnRpb25hbGx5IGxlZnQgYmVoaW5kOiBXaXRoIGRldiB0b29scyBvcGVuIHRoZSBkZWJ1Z2dlciB3aWxsIHN0b3AgaGVyZS4gVGhlcmUgaXMgbm9cbiAgICAgIC8vIHJlYXNvbiB3aHkgY29ycmVjdGx5IHdyaXR0ZW4gYXBwbGljYXRpb24gc2hvdWxkIGNhdXNlIHRoaXMgZXhjZXB0aW9uLlxuICAgICAgLy8gVE9ETyhtaXNrbyk6IHVuY29tbWVudCB0aGUgbmV4dCBsaW5lIG9uY2UgYG5nRGV2TW9kZWAgd29ya3Mgd2l0aCBjbG9zdXJlLlxuICAgICAgLy8gaWYobmdEZXZNb2RlKSBkZWJ1Z2dlcjtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBOdWxsSW5qZWN0b3JFcnJvcjogTm8gcHJvdmlkZXIgZm9yICR7c3RyaW5naWZ5KHRva2VuKX0hYCk7XG4gICAgICBlcnJvci5uYW1lID0gJ051bGxJbmplY3RvckVycm9yJztcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENvbmNyZXRlIGluamVjdG9ycyBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UuXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvaW5qZWN0b3Jfc3BlYy50cyByZWdpb249J0luamVjdG9yJ31cbiAqXG4gKiBgSW5qZWN0b3JgIHJldHVybnMgaXRzZWxmIHdoZW4gZ2l2ZW4gYEluamVjdG9yYCBhcyBhIHRva2VuOlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2luamVjdG9yX3NwZWMudHMgcmVnaW9uPSdpbmplY3RJbmplY3Rvcid9XG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW5qZWN0b3Ige1xuICBzdGF0aWMgVEhST1dfSUZfTk9UX0ZPVU5EID0gX1RIUk9XX0lGX05PVF9GT1VORDtcbiAgc3RhdGljIE5VTEw6IEluamVjdG9yID0gbmV3IE51bGxJbmplY3RvcigpO1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYW4gaW5zdGFuY2UgZnJvbSB0aGUgaW5qZWN0b3IgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHRva2VuLlxuICAgKiBAcmV0dXJucyBUaGUgaW5zdGFuY2UgZnJvbSB0aGUgaW5qZWN0b3IgaWYgZGVmaW5lZCwgb3RoZXJ3aXNlIHRoZSBgbm90Rm91bmRWYWx1ZWAuXG4gICAqIEB0aHJvd3MgV2hlbiB0aGUgYG5vdEZvdW5kVmFsdWVgIGlzIGB1bmRlZmluZWRgIG9yIGBJbmplY3Rvci5USFJPV19JRl9OT1RfRk9VTkRgLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0PFQ+KHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQ7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBmcm9tIHY0LjAuMCB1c2UgVHlwZTxUPiBvciBJbmplY3Rpb25Ub2tlbjxUPlxuICAgKiBAc3VwcHJlc3Mge2R1cGxpY2F0ZX1cbiAgICovXG4gIGFic3RyYWN0IGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBmcm9tIHY1IHVzZSB0aGUgbmV3IHNpZ25hdHVyZSBJbmplY3Rvci5jcmVhdGUob3B0aW9ucylcbiAgICovXG4gIHN0YXRpYyBjcmVhdGUocHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdLCBwYXJlbnQ/OiBJbmplY3Rvcik6IEluamVjdG9yO1xuXG4gIHN0YXRpYyBjcmVhdGUob3B0aW9uczoge3Byb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSwgcGFyZW50PzogSW5qZWN0b3IsIG5hbWU/OiBzdHJpbmd9KTogSW5qZWN0b3I7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBJbmplY3RvciB3aGljaCBpcyBjb25maWd1cmUgdXNpbmcgYFN0YXRpY1Byb3ZpZGVyYHMuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdDb25zdHJ1Y3RvclByb3ZpZGVyJ31cbiAgICovXG4gIHN0YXRpYyBjcmVhdGUoXG4gICAgICBvcHRpb25zOiBTdGF0aWNQcm92aWRlcltdfHtwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10sIHBhcmVudD86IEluamVjdG9yLCBuYW1lPzogc3RyaW5nfSxcbiAgICAgIHBhcmVudD86IEluamVjdG9yKTogSW5qZWN0b3Ige1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gbmV3IFN0YXRpY0luamVjdG9yKG9wdGlvbnMsIHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgU3RhdGljSW5qZWN0b3Iob3B0aW9ucy5wcm92aWRlcnMsIG9wdGlvbnMucGFyZW50LCBvcHRpb25zLm5hbWUgfHwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBub2NvbGxhcHNlICovXG4gIHN0YXRpYyBuZ0luamVjdGFibGVEZWYgPSDOlGRlZmluZUluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdhbnknIGFzIGFueSxcbiAgICBmYWN0b3J5OiAoKSA9PiDOlGluamVjdChJTkpFQ1RPUiksXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQG5vY29sbGFwc2VcbiAgICovXG4gIHN0YXRpYyBfX05HX0VMRU1FTlRfSURfXyA9IC0xO1xufVxuXG5cblxuY29uc3QgSURFTlQgPSBmdW5jdGlvbjxUPih2YWx1ZTogVCk6IFQge1xuICByZXR1cm4gdmFsdWU7XG59O1xuY29uc3QgRU1QVFkgPSA8YW55W10+W107XG5jb25zdCBDSVJDVUxBUiA9IElERU5UO1xuY29uc3QgTVVMVElfUFJPVklERVJfRk4gPSBmdW5jdGlvbigpOiBhbnlbXSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xufTtcbmV4cG9ydCBjb25zdCBVU0VfVkFMVUUgPVxuICAgIGdldENsb3N1cmVTYWZlUHJvcGVydHk8VmFsdWVQcm92aWRlcj4oe3Byb3ZpZGU6IFN0cmluZywgdXNlVmFsdWU6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmNvbnN0IE5HX1RPS0VOX1BBVEggPSAnbmdUb2tlblBhdGgnO1xuZXhwb3J0IGNvbnN0IE5HX1RFTVBfVE9LRU5fUEFUSCA9ICduZ1RlbXBUb2tlblBhdGgnO1xuY29uc3QgZW51bSBPcHRpb25GbGFncyB7XG4gIE9wdGlvbmFsID0gMSA8PCAwLFxuICBDaGVja1NlbGYgPSAxIDw8IDEsXG4gIENoZWNrUGFyZW50ID0gMSA8PCAyLFxuICBEZWZhdWx0ID0gQ2hlY2tTZWxmIHwgQ2hlY2tQYXJlbnRcbn1cbmNvbnN0IE5VTExfSU5KRUNUT1IgPSBJbmplY3Rvci5OVUxMO1xuY29uc3QgTkVXX0xJTkUgPSAvXFxuL2dtO1xuY29uc3QgTk9fTkVXX0xJTkUgPSAnybUnO1xuXG5leHBvcnQgY2xhc3MgU3RhdGljSW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG4gIHJlYWRvbmx5IHBhcmVudDogSW5qZWN0b3I7XG4gIHJlYWRvbmx5IHNvdXJjZTogc3RyaW5nfG51bGw7XG5cbiAgcHJpdmF0ZSBfcmVjb3JkczogTWFwPGFueSwgUmVjb3JkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3ZpZGVyczogU3RhdGljUHJvdmlkZXJbXSwgcGFyZW50OiBJbmplY3RvciA9IE5VTExfSU5KRUNUT1IsIHNvdXJjZTogc3RyaW5nfG51bGwgPSBudWxsKSB7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgY29uc3QgcmVjb3JkcyA9IHRoaXMuX3JlY29yZHMgPSBuZXcgTWFwPGFueSwgUmVjb3JkPigpO1xuICAgIHJlY29yZHMuc2V0KFxuICAgICAgICBJbmplY3RvciwgPFJlY29yZD57dG9rZW46IEluamVjdG9yLCBmbjogSURFTlQsIGRlcHM6IEVNUFRZLCB2YWx1ZTogdGhpcywgdXNlTmV3OiBmYWxzZX0pO1xuICAgIHJlY29yZHMuc2V0KFxuICAgICAgICBJTkpFQ1RPUiwgPFJlY29yZD57dG9rZW46IElOSkVDVE9SLCBmbjogSURFTlQsIGRlcHM6IEVNUFRZLCB2YWx1ZTogdGhpcywgdXNlTmV3OiBmYWxzZX0pO1xuICAgIHJlY3Vyc2l2ZWx5UHJvY2Vzc1Byb3ZpZGVycyhyZWNvcmRzLCBwcm92aWRlcnMpO1xuICB9XG5cbiAgZ2V0PFQ+KHRva2VuOiBUeXBlPFQ+fEluamVjdGlvblRva2VuPFQ+LCBub3RGb3VuZFZhbHVlPzogVCwgZmxhZ3M/OiBJbmplY3RGbGFncyk6IFQ7XG4gIGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSwgZmxhZ3M6IEluamVjdEZsYWdzID0gSW5qZWN0RmxhZ3MuRGVmYXVsdCk6IGFueSB7XG4gICAgY29uc3QgcmVjb3JkID0gdGhpcy5fcmVjb3Jkcy5nZXQodG9rZW4pO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ5UmVzb2x2ZVRva2VuKHRva2VuLCByZWNvcmQsIHRoaXMuX3JlY29yZHMsIHRoaXMucGFyZW50LCBub3RGb3VuZFZhbHVlLCBmbGFncyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGNhdGNoSW5qZWN0b3JFcnJvcihlLCB0b2tlbiwgJ1N0YXRpY0luamVjdG9yRXJyb3InLCB0aGlzLnNvdXJjZSk7XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgdG9rZW5zID0gPHN0cmluZ1tdPltdLCByZWNvcmRzID0gdGhpcy5fcmVjb3JkcztcbiAgICByZWNvcmRzLmZvckVhY2goKHYsIHRva2VuKSA9PiB0b2tlbnMucHVzaChzdHJpbmdpZnkodG9rZW4pKSk7XG4gICAgcmV0dXJuIGBTdGF0aWNJbmplY3Rvclske3Rva2Vucy5qb2luKCcsICcpfV1gO1xuICB9XG59XG5cbnR5cGUgU3VwcG9ydGVkUHJvdmlkZXIgPVxuICAgIFZhbHVlUHJvdmlkZXIgfCBFeGlzdGluZ1Byb3ZpZGVyIHwgU3RhdGljQ2xhc3NQcm92aWRlciB8IENvbnN0cnVjdG9yUHJvdmlkZXIgfCBGYWN0b3J5UHJvdmlkZXI7XG5cbmludGVyZmFjZSBSZWNvcmQge1xuICBmbjogRnVuY3Rpb247XG4gIHVzZU5ldzogYm9vbGVhbjtcbiAgZGVwczogRGVwZW5kZW5jeVJlY29yZFtdO1xuICB2YWx1ZTogYW55O1xufVxuXG5pbnRlcmZhY2UgRGVwZW5kZW5jeVJlY29yZCB7XG4gIHRva2VuOiBhbnk7XG4gIG9wdGlvbnM6IG51bWJlcjtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVByb3ZpZGVyKHByb3ZpZGVyOiBTdXBwb3J0ZWRQcm92aWRlcik6IFJlY29yZCB7XG4gIGNvbnN0IGRlcHMgPSBjb21wdXRlRGVwcyhwcm92aWRlcik7XG4gIGxldCBmbjogRnVuY3Rpb24gPSBJREVOVDtcbiAgbGV0IHZhbHVlOiBhbnkgPSBFTVBUWTtcbiAgbGV0IHVzZU5ldzogYm9vbGVhbiA9IGZhbHNlO1xuICBsZXQgcHJvdmlkZSA9IHJlc29sdmVGb3J3YXJkUmVmKHByb3ZpZGVyLnByb3ZpZGUpO1xuICBpZiAoVVNFX1ZBTFVFIGluIHByb3ZpZGVyKSB7XG4gICAgLy8gV2UgbmVlZCB0byB1c2UgVVNFX1ZBTFVFIGluIHByb3ZpZGVyIHNpbmNlIHByb3ZpZGVyLnVzZVZhbHVlIGNvdWxkIGJlIGRlZmluZWQgYXMgdW5kZWZpbmVkLlxuICAgIHZhbHVlID0gKHByb3ZpZGVyIGFzIFZhbHVlUHJvdmlkZXIpLnVzZVZhbHVlO1xuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBGYWN0b3J5UHJvdmlkZXIpLnVzZUZhY3RvcnkpIHtcbiAgICBmbiA9IChwcm92aWRlciBhcyBGYWN0b3J5UHJvdmlkZXIpLnVzZUZhY3Rvcnk7XG4gIH0gZWxzZSBpZiAoKHByb3ZpZGVyIGFzIEV4aXN0aW5nUHJvdmlkZXIpLnVzZUV4aXN0aW5nKSB7XG4gICAgLy8gSnVzdCB1c2UgSURFTlRcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NQcm92aWRlcikudXNlQ2xhc3MpIHtcbiAgICB1c2VOZXcgPSB0cnVlO1xuICAgIGZuID0gcmVzb2x2ZUZvcndhcmRSZWYoKHByb3ZpZGVyIGFzIFN0YXRpY0NsYXNzUHJvdmlkZXIpLnVzZUNsYXNzKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvdmlkZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgdXNlTmV3ID0gdHJ1ZTtcbiAgICBmbiA9IHByb3ZpZGU7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgc3RhdGljRXJyb3IoXG4gICAgICAgICdTdGF0aWNQcm92aWRlciBkb2VzIG5vdCBoYXZlIFt1c2VWYWx1ZXx1c2VGYWN0b3J5fHVzZUV4aXN0aW5nfHVzZUNsYXNzXSBvciBbcHJvdmlkZV0gaXMgbm90IG5ld2FibGUnLFxuICAgICAgICBwcm92aWRlcik7XG4gIH1cbiAgcmV0dXJuIHtkZXBzLCBmbiwgdXNlTmV3LCB2YWx1ZX07XG59XG5cbmZ1bmN0aW9uIG11bHRpUHJvdmlkZXJNaXhFcnJvcih0b2tlbjogYW55KSB7XG4gIHJldHVybiBzdGF0aWNFcnJvcignQ2Fubm90IG1peCBtdWx0aSBwcm92aWRlcnMgYW5kIHJlZ3VsYXIgcHJvdmlkZXJzJywgdG9rZW4pO1xufVxuXG5mdW5jdGlvbiByZWN1cnNpdmVseVByb2Nlc3NQcm92aWRlcnMocmVjb3JkczogTWFwPGFueSwgUmVjb3JkPiwgcHJvdmlkZXI6IFN0YXRpY1Byb3ZpZGVyKSB7XG4gIGlmIChwcm92aWRlcikge1xuICAgIHByb3ZpZGVyID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIpO1xuICAgIGlmIChwcm92aWRlciBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAvLyBpZiB3ZSBoYXZlIGFuIGFycmF5IHJlY3Vyc2UgaW50byB0aGUgYXJyYXlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVjdXJzaXZlbHlQcm9jZXNzUHJvdmlkZXJzKHJlY29yZHMsIHByb3ZpZGVyW2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm92aWRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRnVuY3Rpb25zIHdlcmUgc3VwcG9ydGVkIGluIFJlZmxlY3RpdmVJbmplY3RvciwgYnV0IGFyZSBub3QgaGVyZS4gRm9yIHNhZmV0eSBnaXZlIHVzZWZ1bFxuICAgICAgLy8gZXJyb3IgbWVzc2FnZXNcbiAgICAgIHRocm93IHN0YXRpY0Vycm9yKCdGdW5jdGlvbi9DbGFzcyBub3Qgc3VwcG9ydGVkJywgcHJvdmlkZXIpO1xuICAgIH0gZWxzZSBpZiAocHJvdmlkZXIgJiYgdHlwZW9mIHByb3ZpZGVyID09PSAnb2JqZWN0JyAmJiBwcm92aWRlci5wcm92aWRlKSB7XG4gICAgICAvLyBBdCB0aGlzIHBvaW50IHdlIGhhdmUgd2hhdCBsb29rcyBsaWtlIGEgcHJvdmlkZXI6IHtwcm92aWRlOiA/LCAuLi4ufVxuICAgICAgbGV0IHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXIucHJvdmlkZSk7XG4gICAgICBjb25zdCByZXNvbHZlZFByb3ZpZGVyID0gcmVzb2x2ZVByb3ZpZGVyKHByb3ZpZGVyKTtcbiAgICAgIGlmIChwcm92aWRlci5tdWx0aSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBUaGlzIGlzIGEgbXVsdGkgcHJvdmlkZXIuXG4gICAgICAgIGxldCBtdWx0aVByb3ZpZGVyOiBSZWNvcmR8dW5kZWZpbmVkID0gcmVjb3Jkcy5nZXQodG9rZW4pO1xuICAgICAgICBpZiAobXVsdGlQcm92aWRlcikge1xuICAgICAgICAgIGlmIChtdWx0aVByb3ZpZGVyLmZuICE9PSBNVUxUSV9QUk9WSURFUl9GTikge1xuICAgICAgICAgICAgdGhyb3cgbXVsdGlQcm92aWRlck1peEVycm9yKHRva2VuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIGEgcGxhY2Vob2xkZXIgZmFjdG9yeSB3aGljaCB3aWxsIGxvb2sgdXAgdGhlIGNvbnN0aXR1ZW50cyBvZiB0aGUgbXVsdGkgcHJvdmlkZXIuXG4gICAgICAgICAgcmVjb3Jkcy5zZXQodG9rZW4sIG11bHRpUHJvdmlkZXIgPSA8UmVjb3JkPntcbiAgICAgICAgICAgIHRva2VuOiBwcm92aWRlci5wcm92aWRlLFxuICAgICAgICAgICAgZGVwczogW10sXG4gICAgICAgICAgICB1c2VOZXc6IGZhbHNlLFxuICAgICAgICAgICAgZm46IE1VTFRJX1BST1ZJREVSX0ZOLFxuICAgICAgICAgICAgdmFsdWU6IEVNUFRZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHJlYXQgdGhlIHByb3ZpZGVyIGFzIHRoZSB0b2tlbi5cbiAgICAgICAgdG9rZW4gPSBwcm92aWRlcjtcbiAgICAgICAgbXVsdGlQcm92aWRlci5kZXBzLnB1c2goe3Rva2VuLCBvcHRpb25zOiBPcHRpb25GbGFncy5EZWZhdWx0fSk7XG4gICAgICB9XG4gICAgICBjb25zdCByZWNvcmQgPSByZWNvcmRzLmdldCh0b2tlbik7XG4gICAgICBpZiAocmVjb3JkICYmIHJlY29yZC5mbiA9PSBNVUxUSV9QUk9WSURFUl9GTikge1xuICAgICAgICB0aHJvdyBtdWx0aVByb3ZpZGVyTWl4RXJyb3IodG9rZW4pO1xuICAgICAgfVxuICAgICAgcmVjb3Jkcy5zZXQodG9rZW4sIHJlc29sdmVkUHJvdmlkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBzdGF0aWNFcnJvcignVW5leHBlY3RlZCBwcm92aWRlcicsIHByb3ZpZGVyKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJ5UmVzb2x2ZVRva2VuKFxuICAgIHRva2VuOiBhbnksIHJlY29yZDogUmVjb3JkIHwgdW5kZWZpbmVkLCByZWNvcmRzOiBNYXA8YW55LCBSZWNvcmQ+LCBwYXJlbnQ6IEluamVjdG9yLFxuICAgIG5vdEZvdW5kVmFsdWU6IGFueSwgZmxhZ3M6IEluamVjdEZsYWdzKTogYW55IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcmVzb2x2ZVRva2VuKHRva2VuLCByZWNvcmQsIHJlY29yZHMsIHBhcmVudCwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gZW5zdXJlIHRoYXQgJ2UnIGlzIG9mIHR5cGUgRXJyb3IuXG4gICAgaWYgKCEoZSBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgZSA9IG5ldyBFcnJvcihlKTtcbiAgICB9XG4gICAgY29uc3QgcGF0aDogYW55W10gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF0gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF0gfHwgW107XG4gICAgcGF0aC51bnNoaWZ0KHRva2VuKTtcbiAgICBpZiAocmVjb3JkICYmIHJlY29yZC52YWx1ZSA9PSBDSVJDVUxBUikge1xuICAgICAgLy8gUmVzZXQgdGhlIENpcmN1bGFyIGZsYWcuXG4gICAgICByZWNvcmQudmFsdWUgPSBFTVBUWTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlVG9rZW4oXG4gICAgdG9rZW46IGFueSwgcmVjb3JkOiBSZWNvcmQgfCB1bmRlZmluZWQsIHJlY29yZHM6IE1hcDxhbnksIFJlY29yZD4sIHBhcmVudDogSW5qZWN0b3IsXG4gICAgbm90Rm91bmRWYWx1ZTogYW55LCBmbGFnczogSW5qZWN0RmxhZ3MpOiBhbnkge1xuICBsZXQgdmFsdWU7XG4gIGlmIChyZWNvcmQgJiYgIShmbGFncyAmIEluamVjdEZsYWdzLlNraXBTZWxmKSkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSByZWNvcmQsIHRoaXMgaW1wbGllcyB0aGF0IHdlIGRvbid0IG93biB0aGUgcHJvdmlkZXIgaGVuY2UgZG9uJ3Qga25vdyBob3dcbiAgICAvLyB0byByZXNvbHZlIGl0LlxuICAgIHZhbHVlID0gcmVjb3JkLnZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PSBDSVJDVUxBUikge1xuICAgICAgdGhyb3cgRXJyb3IoTk9fTkVXX0xJTkUgKyAnQ2lyY3VsYXIgZGVwZW5kZW5jeScpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IEVNUFRZKSB7XG4gICAgICByZWNvcmQudmFsdWUgPSBDSVJDVUxBUjtcbiAgICAgIGxldCBvYmogPSB1bmRlZmluZWQ7XG4gICAgICBsZXQgdXNlTmV3ID0gcmVjb3JkLnVzZU5ldztcbiAgICAgIGxldCBmbiA9IHJlY29yZC5mbjtcbiAgICAgIGxldCBkZXBSZWNvcmRzID0gcmVjb3JkLmRlcHM7XG4gICAgICBsZXQgZGVwcyA9IEVNUFRZO1xuICAgICAgaWYgKGRlcFJlY29yZHMubGVuZ3RoKSB7XG4gICAgICAgIGRlcHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXBSZWNvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZGVwUmVjb3JkOiBEZXBlbmRlbmN5UmVjb3JkID0gZGVwUmVjb3Jkc1tpXTtcbiAgICAgICAgICBjb25zdCBvcHRpb25zID0gZGVwUmVjb3JkLm9wdGlvbnM7XG4gICAgICAgICAgY29uc3QgY2hpbGRSZWNvcmQgPVxuICAgICAgICAgICAgICBvcHRpb25zICYgT3B0aW9uRmxhZ3MuQ2hlY2tTZWxmID8gcmVjb3Jkcy5nZXQoZGVwUmVjb3JkLnRva2VuKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZXBzLnB1c2godHJ5UmVzb2x2ZVRva2VuKFxuICAgICAgICAgICAgICAvLyBDdXJyZW50IFRva2VuIHRvIHJlc29sdmVcbiAgICAgICAgICAgICAgZGVwUmVjb3JkLnRva2VuLFxuICAgICAgICAgICAgICAvLyBBIHJlY29yZCB3aGljaCBkZXNjcmliZXMgaG93IHRvIHJlc29sdmUgdGhlIHRva2VuLlxuICAgICAgICAgICAgICAvLyBJZiB1bmRlZmluZWQsIHRoaXMgbWVhbnMgd2UgZG9uJ3QgaGF2ZSBzdWNoIGEgcmVjb3JkXG4gICAgICAgICAgICAgIGNoaWxkUmVjb3JkLFxuICAgICAgICAgICAgICAvLyBPdGhlciByZWNvcmRzIHdlIGtub3cgYWJvdXQuXG4gICAgICAgICAgICAgIHJlY29yZHMsXG4gICAgICAgICAgICAgIC8vIElmIHdlIGRvbid0IGtub3cgaG93IHRvIHJlc29sdmUgZGVwZW5kZW5jeSBhbmQgd2Ugc2hvdWxkIG5vdCBjaGVjayBwYXJlbnQgZm9yIGl0LFxuICAgICAgICAgICAgICAvLyB0aGFuIHBhc3MgaW4gTnVsbCBpbmplY3Rvci5cbiAgICAgICAgICAgICAgIWNoaWxkUmVjb3JkICYmICEob3B0aW9ucyAmIE9wdGlvbkZsYWdzLkNoZWNrUGFyZW50KSA/IE5VTExfSU5KRUNUT1IgOiBwYXJlbnQsXG4gICAgICAgICAgICAgIG9wdGlvbnMgJiBPcHRpb25GbGFncy5PcHRpb25hbCA/IG51bGwgOiBJbmplY3Rvci5USFJPV19JRl9OT1RfRk9VTkQsXG4gICAgICAgICAgICAgIEluamVjdEZsYWdzLkRlZmF1bHQpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVjb3JkLnZhbHVlID0gdmFsdWUgPSB1c2VOZXcgPyBuZXcgKGZuIGFzIGFueSkoLi4uZGVwcykgOiBmbi5hcHBseShvYmosIGRlcHMpO1xuICAgIH1cbiAgfSBlbHNlIGlmICghKGZsYWdzICYgSW5qZWN0RmxhZ3MuU2VsZikpIHtcbiAgICB2YWx1ZSA9IHBhcmVudC5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUsIEluamVjdEZsYWdzLkRlZmF1bHQpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlcHMocHJvdmlkZXI6IFN0YXRpY1Byb3ZpZGVyKTogRGVwZW5kZW5jeVJlY29yZFtdIHtcbiAgbGV0IGRlcHM6IERlcGVuZGVuY3lSZWNvcmRbXSA9IEVNUFRZO1xuICBjb25zdCBwcm92aWRlckRlcHM6IGFueVtdID1cbiAgICAgIChwcm92aWRlciBhcyBFeGlzdGluZ1Byb3ZpZGVyICYgU3RhdGljQ2xhc3NQcm92aWRlciAmIENvbnN0cnVjdG9yUHJvdmlkZXIpLmRlcHM7XG4gIGlmIChwcm92aWRlckRlcHMgJiYgcHJvdmlkZXJEZXBzLmxlbmd0aCkge1xuICAgIGRlcHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3ZpZGVyRGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wdGlvbnMgPSBPcHRpb25GbGFncy5EZWZhdWx0O1xuICAgICAgbGV0IHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYocHJvdmlkZXJEZXBzW2ldKTtcbiAgICAgIGlmICh0b2tlbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBhbm5vdGF0aW9ucyA9IHRva2VuOyBqIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBhbm5vdGF0aW9uID0gYW5ub3RhdGlvbnNbal07XG4gICAgICAgICAgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBPcHRpb25hbCB8fCBhbm5vdGF0aW9uID09IE9wdGlvbmFsKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8IE9wdGlvbkZsYWdzLk9wdGlvbmFsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYW5ub3RhdGlvbiBpbnN0YW5jZW9mIFNraXBTZWxmIHx8IGFubm90YXRpb24gPT0gU2tpcFNlbGYpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zICYgfk9wdGlvbkZsYWdzLkNoZWNrU2VsZjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGFubm90YXRpb24gaW5zdGFuY2VvZiBTZWxmIHx8IGFubm90YXRpb24gPT0gU2VsZikge1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgJiB+T3B0aW9uRmxhZ3MuQ2hlY2tQYXJlbnQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChhbm5vdGF0aW9uIGluc3RhbmNlb2YgSW5qZWN0KSB7XG4gICAgICAgICAgICB0b2tlbiA9IChhbm5vdGF0aW9uIGFzIEluamVjdCkudG9rZW47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYoYW5ub3RhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZXBzLnB1c2goe3Rva2VuLCBvcHRpb25zfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBFeGlzdGluZ1Byb3ZpZGVyKS51c2VFeGlzdGluZykge1xuICAgIGNvbnN0IHRva2VuID0gcmVzb2x2ZUZvcndhcmRSZWYoKHByb3ZpZGVyIGFzIEV4aXN0aW5nUHJvdmlkZXIpLnVzZUV4aXN0aW5nKTtcbiAgICBkZXBzID0gW3t0b2tlbiwgb3B0aW9uczogT3B0aW9uRmxhZ3MuRGVmYXVsdH1dO1xuICB9IGVsc2UgaWYgKCFwcm92aWRlckRlcHMgJiYgIShVU0VfVkFMVUUgaW4gcHJvdmlkZXIpKSB7XG4gICAgLy8gdXNlVmFsdWUgJiB1c2VFeGlzdGluZyBhcmUgdGhlIG9ubHkgb25lcyB3aGljaCBhcmUgZXhlbXB0IGZyb20gZGVwcyBhbGwgb3RoZXJzIG5lZWQgaXQuXG4gICAgdGhyb3cgc3RhdGljRXJyb3IoJ1xcJ2RlcHNcXCcgcmVxdWlyZWQnLCBwcm92aWRlcik7XG4gIH1cbiAgcmV0dXJuIGRlcHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXRjaEluamVjdG9yRXJyb3IoXG4gICAgZTogYW55LCB0b2tlbjogYW55LCBpbmplY3RvckVycm9yTmFtZTogc3RyaW5nLCBzb3VyY2U6IHN0cmluZyB8IG51bGwpOiBuZXZlciB7XG4gIGNvbnN0IHRva2VuUGF0aDogYW55W10gPSBlW05HX1RFTVBfVE9LRU5fUEFUSF07XG4gIGlmICh0b2tlbltTT1VSQ0VdKSB7XG4gICAgdG9rZW5QYXRoLnVuc2hpZnQodG9rZW5bU09VUkNFXSk7XG4gIH1cbiAgZS5tZXNzYWdlID0gZm9ybWF0RXJyb3IoJ1xcbicgKyBlLm1lc3NhZ2UsIHRva2VuUGF0aCwgaW5qZWN0b3JFcnJvck5hbWUsIHNvdXJjZSk7XG4gIGVbTkdfVE9LRU5fUEFUSF0gPSB0b2tlblBhdGg7XG4gIGVbTkdfVEVNUF9UT0tFTl9QQVRIXSA9IG51bGw7XG4gIHRocm93IGU7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKFxuICAgIHRleHQ6IHN0cmluZywgb2JqOiBhbnksIGluamVjdG9yRXJyb3JOYW1lOiBzdHJpbmcsIHNvdXJjZTogc3RyaW5nIHwgbnVsbCA9IG51bGwpOiBzdHJpbmcge1xuICB0ZXh0ID0gdGV4dCAmJiB0ZXh0LmNoYXJBdCgwKSA9PT0gJ1xcbicgJiYgdGV4dC5jaGFyQXQoMSkgPT0gTk9fTkVXX0xJTkUgPyB0ZXh0LnN1YnN0cigyKSA6IHRleHQ7XG4gIGxldCBjb250ZXh0ID0gc3RyaW5naWZ5KG9iaik7XG4gIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGNvbnRleHQgPSBvYmoubWFwKHN0cmluZ2lmeSkuam9pbignIC0+ICcpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgbGV0IHBhcnRzID0gPHN0cmluZ1tdPltdO1xuICAgIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgcGFydHMucHVzaChcbiAgICAgICAgICAgIGtleSArICc6JyArICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gSlNPTi5zdHJpbmdpZnkodmFsdWUpIDogc3RyaW5naWZ5KHZhbHVlKSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0ID0gYHske3BhcnRzLmpvaW4oJywgJyl9fWA7XG4gIH1cbiAgcmV0dXJuIGAke2luamVjdG9yRXJyb3JOYW1lfSR7c291cmNlID8gJygnICsgc291cmNlICsgJyknIDogJyd9WyR7Y29udGV4dH1dOiAke3RleHQucmVwbGFjZShORVdfTElORSwgJ1xcbiAgJyl9YDtcbn1cblxuZnVuY3Rpb24gc3RhdGljRXJyb3IodGV4dDogc3RyaW5nLCBvYmo6IGFueSk6IEVycm9yIHtcbiAgcmV0dXJuIG5ldyBFcnJvcihmb3JtYXRFcnJvcih0ZXh0LCBvYmosICdTdGF0aWNJbmplY3RvckVycm9yJykpO1xufVxuIl19