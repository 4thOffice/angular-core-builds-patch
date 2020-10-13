/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getClosureSafeProperty } from '../../util/property';
/**
 * Construct an `InjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export function ɵɵdefineInjectable(opts) {
    return {
        token: opts.token,
        providedIn: opts.providedIn || null,
        factory: opts.factory,
        value: undefined,
    };
}
/**
 * @deprecated in v8, delete after v10. This API should be used only be generated code, and that
 * code should now use ɵɵdefineInjectable instead.
 * @publicApi
 */
export const defineInjectable = ɵɵdefineInjectable;
/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @codeGenApi
 */
export function ɵɵdefineInjector(options) {
    return {
        factory: options.factory,
        providers: options.providers || [],
        imports: options.imports || [],
    };
}
/**
 * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
 * inherited value.
 *
 * @param type A type which may have its own (non-inherited) `ɵprov`.
 */
export function getInjectableDef(type) {
    return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
}
/**
 * Return definition only if it is defined directly on `type` and is not inherited from a base
 * class of `type`.
 */
function getOwnDefinition(type, field) {
    return type.hasOwnProperty(field) ? type[field] : null;
}
/**
 * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
 *
 * @param type A type which may have `ɵprov`, via inheritance.
 *
 * @deprecated Will be removed in a future version of Angular, where an error will occur in the
 *     scenario if we find the `ɵprov` on an ancestor only.
 */
export function getInheritedInjectableDef(type) {
    const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
    if (def) {
        const typeName = getTypeName(type);
        // TODO(FW-1307): Re-add ngDevMode when closure can handle it
        // ngDevMode &&
        console.warn(`DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.\n` +
            `This will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`);
        return def;
    }
    else {
        return null;
    }
}
/** Gets the name of a type, accounting for some cross-browser differences. */
function getTypeName(type) {
    // `Function.prototype.name` behaves differently between IE and other browsers. In most browsers
    // it'll always return the name of the function itself, no matter how many other functions it
    // inherits from. On IE the function doesn't have its own `name` property, but it takes it from
    // the lowest level in the prototype chain. E.g. if we have `class Foo extends Parent` most
    // browsers will evaluate `Foo.name` to `Foo` while IE will return `Parent`. We work around
    // the issue by converting the function to a string and parsing its name out that way via a regex.
    if (type.hasOwnProperty('name')) {
        return type.name;
    }
    const match = ('' + type).match(/^function\s*([^\s(]+)/);
    return match === null ? '' : match[1];
}
/**
 * Read the injector def type in a way which is immune to accidentally reading inherited value.
 *
 * @param type type which may have an injector def (`ɵinj`)
 */
export function getInjectorDef(type) {
    return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ?
        type[NG_INJ_DEF] :
        null;
}
export const NG_PROV_DEF = getClosureSafeProperty({ ɵprov: getClosureSafeProperty });
export const NG_INJ_DEF = getClosureSafeProperty({ ɵinj: getClosureSafeProperty });
// We need to keep these around so we can read off old defs if new defs are unavailable
export const NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
export const NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2ludGVyZmFjZS9kZWZzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBb0gzRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBSSxJQUdyQztJQUNDLE9BQVE7UUFDQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFpQixJQUFJLElBQUk7UUFDMUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1FBQ3JCLEtBQUssRUFBRSxTQUFTO0tBQ2UsQ0FBQztBQUMzQyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQWlFO0lBRWhHLE9BQVE7UUFDQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRTtRQUNsQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFO0tBQ0MsQ0FBQztBQUMzQyxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUksSUFBUztJQUMzQyxPQUFPLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUMxRixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBSSxJQUFTLEVBQUUsS0FBYTtJQUNuRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3pELENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUFJLElBQVM7SUFDcEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFbkUsSUFBSSxHQUFHLEVBQUU7UUFDUCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsNkRBQTZEO1FBQzdELGVBQWU7UUFDZixPQUFPLENBQUMsSUFBSSxDQUNSLDRDQUNJLFFBQVEsOEVBQThFO1lBQzFGLDhGQUNJLFFBQVEsVUFBVSxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCw4RUFBOEU7QUFDOUUsU0FBUyxXQUFXLENBQUMsSUFBUztJQUM1QixnR0FBZ0c7SUFDaEcsNkZBQTZGO0lBQzdGLCtGQUErRjtJQUMvRiwyRkFBMkY7SUFDM0YsMkZBQTJGO0lBQzNGLGtHQUFrRztJQUNsRyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2xCO0lBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDekQsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUksSUFBUztJQUN6QyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsSUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDO0FBQ1gsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUM7QUFDbkYsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLHNCQUFzQixDQUFDLEVBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUVqRix1RkFBdUY7QUFDdkYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUMsRUFBQyxlQUFlLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO0FBQ25HLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQyxFQUFDLGFBQWEsRUFBRSxzQkFBc0IsRUFBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uLy4uL3V0aWwvcHJvcGVydHknO1xuaW1wb3J0IHtDbGFzc1Byb3ZpZGVyLCBDb25zdHJ1Y3RvclByb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIFN0YXRpY0NsYXNzUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXJ9IGZyb20gJy4vcHJvdmlkZXInO1xuXG5cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCBob3cgYSB0eXBlIG9yIGBJbmplY3Rpb25Ub2tlbmAgaW50ZXJmYWNlcyB3aXRoIHRoZSBESSBzeXN0ZW0uXG4gKlxuICogQXQgYSBtaW5pbXVtLCB0aGlzIGluY2x1ZGVzIGEgYGZhY3RvcnlgIHdoaWNoIGRlZmluZXMgaG93IHRvIGNyZWF0ZSB0aGUgZ2l2ZW4gdHlwZSBgVGAsIHBvc3NpYmx5XG4gKiByZXF1ZXN0aW5nIGluamVjdGlvbiBvZiBvdGhlciB0eXBlcyBpZiBuZWNlc3NhcnkuXG4gKlxuICogT3B0aW9uYWxseSwgYSBgcHJvdmlkZWRJbmAgcGFyYW1ldGVyIHNwZWNpZmllcyB0aGF0IHRoZSBnaXZlbiB0eXBlIGJlbG9uZ3MgdG8gYSBwYXJ0aWN1bGFyXG4gKiBgSW5qZWN0b3JEZWZgLCBgTmdNb2R1bGVgLCBvciBhIHNwZWNpYWwgc2NvcGUgKGUuZy4gYCdyb290J2ApLiBBIHZhbHVlIG9mIGBudWxsYCBpbmRpY2F0ZXNcbiAqIHRoYXQgdGhlIGluamVjdGFibGUgZG9lcyBub3QgYmVsb25nIHRvIGFueSBzY29wZS5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICogQHB1YmxpY0FwaSBUaGUgVmlld0VuZ2luZSBjb21waWxlciBlbWl0cyBjb2RlIHdpdGggdGhpcyB0eXBlIGZvciBpbmplY3RhYmxlcy4gVGhpcyBjb2RlIGlzXG4gKiAgIGRlcGxveWVkIHRvIG5wbSwgYW5kIHNob3VsZCBiZSB0cmVhdGVkIGFzIHB1YmxpYyBhcGkuXG5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSDJtcm1SW5qZWN0YWJsZURlZjxUPiB7XG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhhdCB0aGUgZ2l2ZW4gdHlwZSBiZWxvbmdzIHRvIGEgcGFydGljdWxhciBpbmplY3RvcjpcbiAgICogLSBgSW5qZWN0b3JUeXBlYCBzdWNoIGFzIGBOZ01vZHVsZWAsXG4gICAqIC0gYCdyb290J2AgdGhlIHJvb3QgaW5qZWN0b3JcbiAgICogLSBgJ2FueSdgIGFsbCBpbmplY3RvcnMuXG4gICAqIC0gYG51bGxgLCBkb2VzIG5vdCBiZWxvbmcgdG8gYW55IGluamVjdG9yLiBNdXN0IGJlIGV4cGxpY2l0bHkgbGlzdGVkIGluIHRoZSBpbmplY3RvclxuICAgKiAgIGBwcm92aWRlcnNgLlxuICAgKi9cbiAgcHJvdmlkZWRJbjogSW5qZWN0b3JUeXBlPGFueT58J3Jvb3QnfCdwbGF0Zm9ybSd8J2FueSd8bnVsbDtcblxuICAvKipcbiAgICogVGhlIHRva2VuIHRvIHdoaWNoIHRoaXMgZGVmaW5pdGlvbiBiZWxvbmdzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBtYXkgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSB0eXBlIHRoYXQgdGhlIGBmYWN0b3J5YCB3aWxsIGNyZWF0ZS5cbiAgICovXG4gIHRva2VuOiB1bmtub3duO1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB0byBleGVjdXRlIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgaW5qZWN0YWJsZS5cbiAgICovXG4gIGZhY3Rvcnk6ICh0PzogVHlwZTxhbnk+KSA9PiBUO1xuXG4gIC8qKlxuICAgKiBJbiBhIGNhc2Ugb2Ygbm8gZXhwbGljaXQgaW5qZWN0b3IsIGEgbG9jYXRpb24gd2hlcmUgdGhlIGluc3RhbmNlIG9mIHRoZSBpbmplY3RhYmxlIGlzIHN0b3JlZC5cbiAgICovXG4gIHZhbHVlOiBUfHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBJbmZvcm1hdGlvbiBhYm91dCB0aGUgcHJvdmlkZXJzIHRvIGJlIGluY2x1ZGVkIGluIGFuIGBJbmplY3RvcmAgYXMgd2VsbCBhcyBob3cgdGhlIGdpdmVuIHR5cGVcbiAqIHdoaWNoIGNhcnJpZXMgdGhlIGluZm9ybWF0aW9uIHNob3VsZCBiZSBjcmVhdGVkIGJ5IHRoZSBESSBzeXN0ZW0uXG4gKlxuICogQW4gYEluamVjdG9yRGVmYCBjYW4gaW1wb3J0IG90aGVyIHR5cGVzIHdoaWNoIGhhdmUgYEluamVjdG9yRGVmc2AsIGZvcm1pbmcgYSBkZWVwIG5lc3RlZFxuICogc3RydWN0dXJlIG9mIHByb3ZpZGVycyB3aXRoIGEgZGVmaW5lZCBwcmlvcml0eSAoaWRlbnRpY2FsbHkgdG8gaG93IGBOZ01vZHVsZWBzIGFsc28gaGF2ZVxuICogYW4gaW1wb3J0L2RlcGVuZGVuY3kgc3RydWN0dXJlKS5cbiAqXG4gKiBOT1RFOiBUaGlzIGlzIGEgcHJpdmF0ZSB0eXBlIGFuZCBzaG91bGQgbm90IGJlIGV4cG9ydGVkXG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSDJtcm1SW5qZWN0b3JEZWY8VD4ge1xuICBmYWN0b3J5OiAoKSA9PiBUO1xuXG4gIC8vIFRPRE8oYWx4aHViKTogTmFycm93IGRvd24gdGhlIHR5cGUgaGVyZSBvbmNlIGRlY29yYXRvcnMgcHJvcGVybHkgY2hhbmdlIHRoZSByZXR1cm4gdHlwZSBvZiB0aGVcbiAgLy8gY2xhc3MgdGhleSBhcmUgZGVjb3JhdGluZyAodG8gYWRkIHRoZSDJtXByb3YgcHJvcGVydHkgZm9yIGV4YW1wbGUpLlxuICBwcm92aWRlcnM6IChUeXBlPGFueT58VmFsdWVQcm92aWRlcnxFeGlzdGluZ1Byb3ZpZGVyfEZhY3RvcnlQcm92aWRlcnxDb25zdHJ1Y3RvclByb3ZpZGVyfFxuICAgICAgICAgICAgICBTdGF0aWNDbGFzc1Byb3ZpZGVyfENsYXNzUHJvdmlkZXJ8YW55W10pW107XG5cbiAgaW1wb3J0czogKEluamVjdG9yVHlwZTxhbnk+fEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnM8YW55PilbXTtcbn1cblxuLyoqXG4gKiBBIGBUeXBlYCB3aGljaCBoYXMgYW4gYEluamVjdGFibGVEZWZgIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0YWJsZURlZlR5cGVgcyBjb250YWluIHRoZWlyIG93biBEZXBlbmRlbmN5IEluamVjdGlvbiBtZXRhZGF0YSBhbmQgYXJlIHVzYWJsZSBpbiBhblxuICogYEluamVjdG9yRGVmYC1iYXNlZCBgU3RhdGljSW5qZWN0b3IuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7XG4gIC8qKlxuICAgKiBPcGFxdWUgdHlwZSB3aG9zZSBzdHJ1Y3R1cmUgaXMgaGlnaGx5IHZlcnNpb24gZGVwZW5kZW50LiBEbyBub3QgcmVseSBvbiBhbnkgcHJvcGVydGllcy5cbiAgICovXG4gIMm1cHJvdjogbmV2ZXI7XG59XG5cbi8qKlxuICogQSB0eXBlIHdoaWNoIGhhcyBhbiBgSW5qZWN0b3JEZWZgIHN0YXRpYyBmaWVsZC5cbiAqXG4gKiBgSW5qZWN0b3JEZWZUeXBlc2AgY2FuIGJlIHVzZWQgdG8gY29uZmlndXJlIGEgYFN0YXRpY0luamVjdG9yYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0b3JUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7XG4gIC8qKlxuICAgKiBPcGFxdWUgdHlwZSB3aG9zZSBzdHJ1Y3R1cmUgaXMgaGlnaGx5IHZlcnNpb24gZGVwZW5kZW50LiBEbyBub3QgcmVseSBvbiBhbnkgcHJvcGVydGllcy5cbiAgICovXG4gIMm1aW5qOiBuZXZlcjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGBJbmplY3RvckRlZmAgZXF1aXZhbGVudCBvZiBhIGBNb2R1bGVXaXRoUHJvdmlkZXJzYCwgYW4gYEluamVjdG9yRGVmVHlwZWAgd2l0aCBhblxuICogYXNzb2NpYXRlZCBhcnJheSBvZiBwcm92aWRlcnMuXG4gKlxuICogT2JqZWN0cyBvZiB0aGlzIHR5cGUgY2FuIGJlIGxpc3RlZCBpbiB0aGUgaW1wb3J0cyBzZWN0aW9uIG9mIGFuIGBJbmplY3RvckRlZmAuXG4gKlxuICogTk9URTogVGhpcyBpcyBhIHByaXZhdGUgdHlwZSBhbmQgc2hvdWxkIG5vdCBiZSBleHBvcnRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdG9yVHlwZVdpdGhQcm92aWRlcnM8VD4ge1xuICBuZ01vZHVsZTogSW5qZWN0b3JUeXBlPFQ+O1xuICBwcm92aWRlcnM/OiAoVHlwZTxhbnk+fFZhbHVlUHJvdmlkZXJ8RXhpc3RpbmdQcm92aWRlcnxGYWN0b3J5UHJvdmlkZXJ8Q29uc3RydWN0b3JQcm92aWRlcnxcbiAgICAgICAgICAgICAgIFN0YXRpY0NsYXNzUHJvdmlkZXJ8Q2xhc3NQcm92aWRlcnxhbnlbXSlbXTtcbn1cblxuXG4vKipcbiAqIENvbnN0cnVjdCBhbiBgSW5qZWN0YWJsZURlZmAgd2hpY2ggZGVmaW5lcyBob3cgYSB0b2tlbiB3aWxsIGJlIGNvbnN0cnVjdGVkIGJ5IHRoZSBESSBzeXN0ZW0sIGFuZFxuICogaW4gd2hpY2ggaW5qZWN0b3JzIChpZiBhbnkpIGl0IHdpbGwgYmUgYXZhaWxhYmxlLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIGFzc2lnbmVkIHRvIGEgc3RhdGljIGDJtXByb3ZgIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0YWJsZVR5cGVgLlxuICpcbiAqIE9wdGlvbnM6XG4gKiAqIGBwcm92aWRlZEluYCBkZXRlcm1pbmVzIHdoaWNoIGluamVjdG9ycyB3aWxsIGluY2x1ZGUgdGhlIGluamVjdGFibGUsIGJ5IGVpdGhlciBhc3NvY2lhdGluZyBpdFxuICogICB3aXRoIGFuIGBATmdNb2R1bGVgIG9yIG90aGVyIGBJbmplY3RvclR5cGVgLCBvciBieSBzcGVjaWZ5aW5nIHRoYXQgdGhpcyBpbmplY3RhYmxlIHNob3VsZCBiZVxuICogICBwcm92aWRlZCBpbiB0aGUgYCdyb290J2AgaW5qZWN0b3IsIHdoaWNoIHdpbGwgYmUgdGhlIGFwcGxpY2F0aW9uLWxldmVsIGluamVjdG9yIGluIG1vc3QgYXBwcy5cbiAqICogYGZhY3RvcnlgIGdpdmVzIHRoZSB6ZXJvIGFyZ3VtZW50IGZ1bmN0aW9uIHdoaWNoIHdpbGwgY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBpbmplY3RhYmxlLlxuICogICBUaGUgZmFjdG9yeSBjYW4gY2FsbCBgaW5qZWN0YCB0byBhY2Nlc3MgdGhlIGBJbmplY3RvcmAgYW5kIHJlcXVlc3QgaW5qZWN0aW9uIG9mIGRlcGVuZGVuY2llcy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICogQHB1YmxpY0FwaSBUaGlzIGluc3RydWN0aW9uIGhhcyBiZWVuIGVtaXR0ZWQgYnkgVmlld0VuZ2luZSBmb3Igc29tZSB0aW1lIGFuZCBpcyBkZXBsb3llZCB0byBucG0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1ZGVmaW5lSW5qZWN0YWJsZTxUPihvcHRzOiB7XG4gIHRva2VuOiB1bmtub3duLFxuICBwcm92aWRlZEluPzogVHlwZTxhbnk+fCdyb290J3wncGxhdGZvcm0nfCdhbnknfG51bGwsIGZhY3Rvcnk6ICgpID0+IFQsXG59KTogbmV2ZXIge1xuICByZXR1cm4gKHtcbiAgICAgICAgICAgdG9rZW46IG9wdHMudG9rZW4sXG4gICAgICAgICAgIHByb3ZpZGVkSW46IG9wdHMucHJvdmlkZWRJbiBhcyBhbnkgfHwgbnVsbCxcbiAgICAgICAgICAgZmFjdG9yeTogb3B0cy5mYWN0b3J5LFxuICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgfSBhcyDJtcm1SW5qZWN0YWJsZURlZjxUPikgYXMgbmV2ZXI7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgaW4gdjgsIGRlbGV0ZSBhZnRlciB2MTAuIFRoaXMgQVBJIHNob3VsZCBiZSB1c2VkIG9ubHkgYmUgZ2VuZXJhdGVkIGNvZGUsIGFuZCB0aGF0XG4gKiBjb2RlIHNob3VsZCBub3cgdXNlIMm1ybVkZWZpbmVJbmplY3RhYmxlIGluc3RlYWQuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVJbmplY3RhYmxlID0gybXJtWRlZmluZUluamVjdGFibGU7XG5cbi8qKlxuICogQ29uc3RydWN0IGFuIGBJbmplY3RvckRlZmAgd2hpY2ggY29uZmlndXJlcyBhbiBpbmplY3Rvci5cbiAqXG4gKiBUaGlzIHNob3VsZCBiZSBhc3NpZ25lZCB0byBhIHN0YXRpYyBpbmplY3RvciBkZWYgKGDJtWluamApIGZpZWxkIG9uIGEgdHlwZSwgd2hpY2ggd2lsbCB0aGVuIGJlIGFuXG4gKiBgSW5qZWN0b3JUeXBlYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICogYGZhY3RvcnlgOiBhbiBgSW5qZWN0b3JUeXBlYCBpcyBhbiBpbnN0YW50aWFibGUgdHlwZSwgc28gYSB6ZXJvIGFyZ3VtZW50IGBmYWN0b3J5YCBmdW5jdGlvbiB0b1xuICogICBjcmVhdGUgdGhlIHR5cGUgbXVzdCBiZSBwcm92aWRlZC4gSWYgdGhhdCBmYWN0b3J5IGZ1bmN0aW9uIG5lZWRzIHRvIGluamVjdCBhcmd1bWVudHMsIGl0IGNhblxuICogICB1c2UgdGhlIGBpbmplY3RgIGZ1bmN0aW9uLlxuICogKiBgcHJvdmlkZXJzYDogYW4gb3B0aW9uYWwgYXJyYXkgb2YgcHJvdmlkZXJzIHRvIGFkZCB0byB0aGUgaW5qZWN0b3IuIEVhY2ggcHJvdmlkZXIgbXVzdFxuICogICBlaXRoZXIgaGF2ZSBhIGZhY3Rvcnkgb3IgcG9pbnQgdG8gYSB0eXBlIHdoaWNoIGhhcyBhIGDJtXByb3ZgIHN0YXRpYyBwcm9wZXJ0eSAodGhlXG4gKiAgIHR5cGUgbXVzdCBiZSBhbiBgSW5qZWN0YWJsZVR5cGVgKS5cbiAqICogYGltcG9ydHNgOiBhbiBvcHRpb25hbCBhcnJheSBvZiBpbXBvcnRzIG9mIG90aGVyIGBJbmplY3RvclR5cGVgcyBvciBgSW5qZWN0b3JUeXBlV2l0aE1vZHVsZWBzXG4gKiAgIHdob3NlIHByb3ZpZGVycyB3aWxsIGFsc28gYmUgYWRkZWQgdG8gdGhlIGluamVjdG9yLiBMb2NhbGx5IHByb3ZpZGVkIHR5cGVzIHdpbGwgb3ZlcnJpZGVcbiAqICAgcHJvdmlkZXJzIGZyb20gaW1wb3J0cy5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtWRlZmluZUluamVjdG9yKG9wdGlvbnM6IHtmYWN0b3J5OiAoKSA9PiBhbnksIHByb3ZpZGVycz86IGFueVtdLCBpbXBvcnRzPzogYW55W119KTpcbiAgICBuZXZlciB7XG4gIHJldHVybiAoe1xuICAgICAgICAgICBmYWN0b3J5OiBvcHRpb25zLmZhY3RvcnksXG4gICAgICAgICAgIHByb3ZpZGVyczogb3B0aW9ucy5wcm92aWRlcnMgfHwgW10sXG4gICAgICAgICAgIGltcG9ydHM6IG9wdGlvbnMuaW1wb3J0cyB8fCBbXSxcbiAgICAgICAgIH0gYXMgybXJtUluamVjdG9yRGVmPGFueT4pIGFzIG5ldmVyO1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdGFibGUgZGVmIChgybVwcm92YCkgZm9yIGB0eXBlYCBpbiBhIHdheSB3aGljaCBpcyBpbW11bmUgdG8gYWNjaWRlbnRhbGx5IHJlYWRpbmdcbiAqIGluaGVyaXRlZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gdHlwZSBBIHR5cGUgd2hpY2ggbWF5IGhhdmUgaXRzIG93biAobm9uLWluaGVyaXRlZCkgYMm1cHJvdmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RhYmxlRGVmPFQ+KHR5cGU6IGFueSk6IMm1ybVJbmplY3RhYmxlRGVmPFQ+fG51bGwge1xuICByZXR1cm4gZ2V0T3duRGVmaW5pdGlvbih0eXBlLCBOR19QUk9WX0RFRikgfHwgZ2V0T3duRGVmaW5pdGlvbih0eXBlLCBOR19JTkpFQ1RBQkxFX0RFRik7XG59XG5cbi8qKlxuICogUmV0dXJuIGRlZmluaXRpb24gb25seSBpZiBpdCBpcyBkZWZpbmVkIGRpcmVjdGx5IG9uIGB0eXBlYCBhbmQgaXMgbm90IGluaGVyaXRlZCBmcm9tIGEgYmFzZVxuICogY2xhc3Mgb2YgYHR5cGVgLlxuICovXG5mdW5jdGlvbiBnZXRPd25EZWZpbml0aW9uPFQ+KHR5cGU6IGFueSwgZmllbGQ6IHN0cmluZyk6IMm1ybVJbmplY3RhYmxlRGVmPFQ+fG51bGwge1xuICByZXR1cm4gdHlwZS5oYXNPd25Qcm9wZXJ0eShmaWVsZCkgPyB0eXBlW2ZpZWxkXSA6IG51bGw7XG59XG5cbi8qKlxuICogUmVhZCB0aGUgaW5qZWN0YWJsZSBkZWYgKGDJtXByb3ZgKSBmb3IgYHR5cGVgIG9yIHJlYWQgdGhlIGDJtXByb3ZgIGZyb20gb25lIG9mIGl0cyBhbmNlc3RvcnMuXG4gKlxuICogQHBhcmFtIHR5cGUgQSB0eXBlIHdoaWNoIG1heSBoYXZlIGDJtXByb3ZgLCB2aWEgaW5oZXJpdGFuY2UuXG4gKlxuICogQGRlcHJlY2F0ZWQgV2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgQW5ndWxhciwgd2hlcmUgYW4gZXJyb3Igd2lsbCBvY2N1ciBpbiB0aGVcbiAqICAgICBzY2VuYXJpbyBpZiB3ZSBmaW5kIHRoZSBgybVwcm92YCBvbiBhbiBhbmNlc3RvciBvbmx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5oZXJpdGVkSW5qZWN0YWJsZURlZjxUPih0eXBlOiBhbnkpOiDJtcm1SW5qZWN0YWJsZURlZjxUPnxudWxsIHtcbiAgY29uc3QgZGVmID0gdHlwZSAmJiAodHlwZVtOR19QUk9WX0RFRl0gfHwgdHlwZVtOR19JTkpFQ1RBQkxFX0RFRl0pO1xuXG4gIGlmIChkZWYpIHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IGdldFR5cGVOYW1lKHR5cGUpO1xuICAgIC8vIFRPRE8oRlctMTMwNyk6IFJlLWFkZCBuZ0Rldk1vZGUgd2hlbiBjbG9zdXJlIGNhbiBoYW5kbGUgaXRcbiAgICAvLyBuZ0Rldk1vZGUgJiZcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIGBERVBSRUNBVEVEOiBESSBpcyBpbnN0YW50aWF0aW5nIGEgdG9rZW4gXCIke1xuICAgICAgICAgICAgdHlwZU5hbWV9XCIgdGhhdCBpbmhlcml0cyBpdHMgQEluamVjdGFibGUgZGVjb3JhdG9yIGJ1dCBkb2VzIG5vdCBwcm92aWRlIG9uZSBpdHNlbGYuXFxuYCArXG4gICAgICAgIGBUaGlzIHdpbGwgYmVjb21lIGFuIGVycm9yIGluIGEgZnV0dXJlIHZlcnNpb24gb2YgQW5ndWxhci4gUGxlYXNlIGFkZCBASW5qZWN0YWJsZSgpIHRvIHRoZSBcIiR7XG4gICAgICAgICAgICB0eXBlTmFtZX1cIiBjbGFzcy5gKTtcbiAgICByZXR1cm4gZGVmO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKiBHZXRzIHRoZSBuYW1lIG9mIGEgdHlwZSwgYWNjb3VudGluZyBmb3Igc29tZSBjcm9zcy1icm93c2VyIGRpZmZlcmVuY2VzLiAqL1xuZnVuY3Rpb24gZ2V0VHlwZU5hbWUodHlwZTogYW55KTogc3RyaW5nIHtcbiAgLy8gYEZ1bmN0aW9uLnByb3RvdHlwZS5uYW1lYCBiZWhhdmVzIGRpZmZlcmVudGx5IGJldHdlZW4gSUUgYW5kIG90aGVyIGJyb3dzZXJzLiBJbiBtb3N0IGJyb3dzZXJzXG4gIC8vIGl0J2xsIGFsd2F5cyByZXR1cm4gdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIGl0c2VsZiwgbm8gbWF0dGVyIGhvdyBtYW55IG90aGVyIGZ1bmN0aW9ucyBpdFxuICAvLyBpbmhlcml0cyBmcm9tLiBPbiBJRSB0aGUgZnVuY3Rpb24gZG9lc24ndCBoYXZlIGl0cyBvd24gYG5hbWVgIHByb3BlcnR5LCBidXQgaXQgdGFrZXMgaXQgZnJvbVxuICAvLyB0aGUgbG93ZXN0IGxldmVsIGluIHRoZSBwcm90b3R5cGUgY2hhaW4uIEUuZy4gaWYgd2UgaGF2ZSBgY2xhc3MgRm9vIGV4dGVuZHMgUGFyZW50YCBtb3N0XG4gIC8vIGJyb3dzZXJzIHdpbGwgZXZhbHVhdGUgYEZvby5uYW1lYCB0byBgRm9vYCB3aGlsZSBJRSB3aWxsIHJldHVybiBgUGFyZW50YC4gV2Ugd29yayBhcm91bmRcbiAgLy8gdGhlIGlzc3VlIGJ5IGNvbnZlcnRpbmcgdGhlIGZ1bmN0aW9uIHRvIGEgc3RyaW5nIGFuZCBwYXJzaW5nIGl0cyBuYW1lIG91dCB0aGF0IHdheSB2aWEgYSByZWdleC5cbiAgaWYgKHR5cGUuaGFzT3duUHJvcGVydHkoJ25hbWUnKSkge1xuICAgIHJldHVybiB0eXBlLm5hbWU7XG4gIH1cblxuICBjb25zdCBtYXRjaCA9ICgnJyArIHR5cGUpLm1hdGNoKC9eZnVuY3Rpb25cXHMqKFteXFxzKF0rKS8pO1xuICByZXR1cm4gbWF0Y2ggPT09IG51bGwgPyAnJyA6IG1hdGNoWzFdO1xufVxuXG4vKipcbiAqIFJlYWQgdGhlIGluamVjdG9yIGRlZiB0eXBlIGluIGEgd2F5IHdoaWNoIGlzIGltbXVuZSB0byBhY2NpZGVudGFsbHkgcmVhZGluZyBpbmhlcml0ZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHR5cGUgdHlwZSB3aGljaCBtYXkgaGF2ZSBhbiBpbmplY3RvciBkZWYgKGDJtWluamApXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmplY3RvckRlZjxUPih0eXBlOiBhbnkpOiDJtcm1SW5qZWN0b3JEZWY8VD58bnVsbCB7XG4gIHJldHVybiB0eXBlICYmICh0eXBlLmhhc093blByb3BlcnR5KE5HX0lOSl9ERUYpIHx8IHR5cGUuaGFzT3duUHJvcGVydHkoTkdfSU5KRUNUT1JfREVGKSkgP1xuICAgICAgKHR5cGUgYXMgYW55KVtOR19JTkpfREVGXSA6XG4gICAgICBudWxsO1xufVxuXG5leHBvcnQgY29uc3QgTkdfUFJPVl9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHvJtXByb3Y6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19JTkpfREVGID0gZ2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eSh7ybVpbmo6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcblxuLy8gV2UgbmVlZCB0byBrZWVwIHRoZXNlIGFyb3VuZCBzbyB3ZSBjYW4gcmVhZCBvZmYgb2xkIGRlZnMgaWYgbmV3IGRlZnMgYXJlIHVuYXZhaWxhYmxlXG5leHBvcnQgY29uc3QgTkdfSU5KRUNUQUJMRV9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ0luamVjdGFibGVEZWY6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmV4cG9ydCBjb25zdCBOR19JTkpFQ1RPUl9ERUYgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5KHtuZ0luamVjdG9yRGVmOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG4iXX0=