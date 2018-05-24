/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { R3_COMPILE_INJECTABLE } from '../ivy_switch';
import { ReflectionCapabilities } from '../reflection/reflection_capabilities';
import { makeDecorator } from '../util/decorators';
import { getClosureSafeProperty } from '../util/property';
import { defineInjectable } from './defs';
import { inject, injectArgs } from './injector';
var GET_PROPERTY_NAME = {};
var ɵ0 = GET_PROPERTY_NAME;
var USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 }, GET_PROPERTY_NAME);
var EMPTY_ARRAY = [];
export function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        var reflectionCapabilities = new ReflectionCapabilities();
        var deps_1 = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return function () { return new (type.bind.apply(type, tslib_1.__spread([void 0], injectArgs(deps_1))))(); };
    }
    if (USE_VALUE in provider) {
        var valueProvider_1 = provider;
        return function () { return valueProvider_1.useValue; };
    }
    else if (provider.useExisting) {
        var existingProvider_1 = provider;
        return function () { return inject(existingProvider_1.useExisting); };
    }
    else if (provider.useFactory) {
        var factoryProvider_1 = provider;
        return function () { return factoryProvider_1.useFactory.apply(factoryProvider_1, tslib_1.__spread(injectArgs(factoryProvider_1.deps || EMPTY_ARRAY))); };
    }
    else if (provider.useClass) {
        var classProvider_1 = provider;
        var deps_2 = provider.deps;
        if (!deps_2) {
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_2 = reflectionCapabilities.parameters(type);
        }
        return function () {
            return new ((_a = classProvider_1.useClass).bind.apply(_a, tslib_1.__spread([void 0], injectArgs(deps_2))))();
            var _a;
        };
    }
    else {
        var deps_3 = provider.deps;
        if (!deps_3) {
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_3 = reflectionCapabilities.parameters(type);
        }
        return function () { return new (type.bind.apply(type, tslib_1.__spread([void 0], injectArgs((deps_3)))))(); };
    }
}
/**
 * Supports @Injectable() in JIT mode for Render2.
 */
function preR3InjectableCompile(injectableType, options) {
    if (options && options.providedIn !== undefined && injectableType.ngInjectableDef === undefined) {
        injectableType.ngInjectableDef = defineInjectable({
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
/**
* Injectable decorator and metadata.
*
*
* @Annotation
*/
export var Injectable = makeDecorator('Injectable', undefined, undefined, undefined, function (type, meta) {
    return (R3_COMPILE_INJECTABLE || preR3InjectableCompile)(type, meta);
});
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFN0UsT0FBTyxFQUFDLGFBQWEsRUFBcUIsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV4RCxPQUFPLEVBQWdDLGdCQUFnQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRzlDLElBQU0saUJBQWlCLEdBQUcsRUFBUyxDQUFDO1NBRUosaUJBQWlCO0FBRGpELElBQU0sU0FBUyxHQUFHLHNCQUFzQixDQUNwQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxJQUFtQixFQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQW9EdkUsSUFBTSxXQUFXLEdBQVUsRUFBRSxDQUFDO0FBRTlCLE1BQU0sNkNBQ0YsSUFBZSxFQUFFLFFBQTZCO0lBQ2hELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixJQUFNLHNCQUFzQixHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUM1RCxJQUFNLE1BQUksR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBRXJELE9BQU8sY0FBTSxZQUFJLElBQUksWUFBSixJQUFJLDZCQUFJLFVBQVUsQ0FBQyxNQUFhLENBQUMsT0FBckMsQ0FBc0MsQ0FBQztLQUNyRDtJQUVELElBQUksU0FBUyxJQUFJLFFBQVEsRUFBRTtRQUN6QixJQUFNLGVBQWEsR0FBSSxRQUE4QixDQUFDO1FBQ3RELE9BQU8sY0FBTSxPQUFBLGVBQWEsQ0FBQyxRQUFRLEVBQXRCLENBQXNCLENBQUM7S0FDckM7U0FBTSxJQUFLLFFBQWlDLENBQUMsV0FBVyxFQUFFO1FBQ3pELElBQU0sa0JBQWdCLEdBQUksUUFBaUMsQ0FBQztRQUM1RCxPQUFPLGNBQU0sT0FBQSxNQUFNLENBQUMsa0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQXBDLENBQW9DLENBQUM7S0FDbkQ7U0FBTSxJQUFLLFFBQWdDLENBQUMsVUFBVSxFQUFFO1FBQ3ZELElBQU0saUJBQWUsR0FBSSxRQUFnQyxDQUFDO1FBQzFELE9BQU8sY0FBTSxPQUFBLGlCQUFlLENBQUMsVUFBVSxPQUExQixpQkFBZSxtQkFBZSxVQUFVLENBQUMsaUJBQWUsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLElBQTdFLENBQThFLENBQUM7S0FDN0Y7U0FBTSxJQUFLLFFBQXdELENBQUMsUUFBUSxFQUFFO1FBQzdFLElBQU0sZUFBYSxHQUFJLFFBQXdELENBQUM7UUFDaEYsSUFBSSxNQUFJLEdBQUksUUFBb0MsQ0FBQyxJQUFJLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQUksRUFBRTtZQUNULElBQU0sc0JBQXNCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBQzVELE1BQUksR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPO1lBQU0sWUFBSSxDQUFBLEtBQUEsZUFBYSxDQUFDLFFBQVEsQ0FBQSwyQ0FBSSxVQUFVLENBQUMsTUFBSSxDQUFDOztRQUE5QyxDQUErQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxJQUFJLE1BQUksR0FBSSxRQUFvQyxDQUFDLElBQUksQ0FBQztRQUN0RCxJQUFJLENBQUMsTUFBSSxFQUFFO1lBQ1QsSUFBTSxzQkFBc0IsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7WUFDNUQsTUFBSSxHQUFHLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoRDtRQUNELE9BQU8sY0FBTSxZQUFJLElBQUksWUFBSixJQUFJLDZCQUFJLFVBQVUsQ0FBQyxDQUFBLE1BQU0sQ0FBQSxDQUFDLE9BQTlCLENBQStCLENBQUM7S0FDOUM7Q0FDRjs7OztBQUtELGdDQUNJLGNBQW1DLEVBQ25DLE9BQXFFO0lBQ3ZFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLGNBQWMsQ0FBQyxlQUFlLEtBQUssU0FBUyxFQUFFO1FBQy9GLGNBQWMsQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7WUFDaEQsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1lBQzlCLE9BQU8sRUFBRSxrQ0FBa0MsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDO1NBQ3JFLENBQUMsQ0FBQztLQUNKO0NBQ0Y7Ozs7Ozs7QUFRRCxNQUFNLENBQUMsSUFBTSxVQUFVLEdBQXdCLGFBQWEsQ0FDeEQsWUFBWSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUM3QyxVQUFDLElBQWUsRUFBRSxJQUFnQjtJQUM5QixPQUFBLENBQUMscUJBQXFCLElBQUksc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBQTdELENBQTZELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSM19DT01QSUxFX0lOSkVDVEFCTEV9IGZyb20gJy4uL2l2eV9zd2l0Y2gnO1xuaW1wb3J0IHtSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge21ha2VEZWNvcmF0b3IsIG1ha2VQYXJhbURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vdXRpbC9wcm9wZXJ0eSc7XG5cbmltcG9ydCB7SW5qZWN0YWJsZURlZiwgSW5qZWN0YWJsZVR5cGUsIGRlZmluZUluamVjdGFibGV9IGZyb20gJy4vZGVmcyc7XG5pbXBvcnQge2luamVjdCwgaW5qZWN0QXJnc30gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQge0NsYXNzU2Fuc1Byb3ZpZGVyLCBDb25zdHJ1Y3RvclByb3ZpZGVyLCBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciwgRXhpc3RpbmdQcm92aWRlciwgRXhpc3RpbmdTYW5zUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgRmFjdG9yeVNhbnNQcm92aWRlciwgU3RhdGljQ2xhc3NQcm92aWRlciwgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXIsIFZhbHVlU2Fuc1Byb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuY29uc3QgR0VUX1BST1BFUlRZX05BTUUgPSB7fSBhcyBhbnk7XG5jb25zdCBVU0VfVkFMVUUgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5PFZhbHVlUHJvdmlkZXI+KFxuICAgIHtwcm92aWRlOiBTdHJpbmcsIHVzZVZhbHVlOiBHRVRfUFJPUEVSVFlfTkFNRX0sIEdFVF9QUk9QRVJUWV9OQU1FKTtcblxuLyoqXG4gKiBJbmplY3RhYmxlIHByb3ZpZGVycyB1c2VkIGluIGBASW5qZWN0YWJsZWAgZGVjb3JhdG9yLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgSW5qZWN0YWJsZVByb3ZpZGVyID0gVmFsdWVTYW5zUHJvdmlkZXIgfCBFeGlzdGluZ1NhbnNQcm92aWRlciB8XG4gICAgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIgfCBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciB8IEZhY3RvcnlTYW5zUHJvdmlkZXIgfCBDbGFzc1NhbnNQcm92aWRlcjtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3RhYmxlIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZURlY29yYXRvciB7XG4gIC8qKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiBgYGBcbiAgICogQEluamVjdGFibGUoKVxuICAgKiBjbGFzcyBDYXIge31cbiAgICogYGBgXG4gICAqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBIG1hcmtlciBtZXRhZGF0YSB0aGF0IG1hcmtzIGEgY2xhc3MgYXMgYXZhaWxhYmxlIHRvIHtAbGluayBJbmplY3Rvcn0gZm9yIGNyZWF0aW9uLlxuICAgKlxuICAgKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J0luamVjdGFibGUnfVxuICAgKlxuICAgKiB7QGxpbmsgSW5qZWN0b3J9IHdpbGwgdGhyb3cgYW4gZXJyb3Igd2hlbiB0cnlpbmcgdG8gaW5zdGFudGlhdGUgYSBjbGFzcyB0aGF0XG4gICAqIGRvZXMgbm90IGhhdmUgYEBJbmplY3RhYmxlYCBtYXJrZXIsIGFzIHNob3duIGluIHRoZSBleGFtcGxlIGJlbG93LlxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9tZXRhZGF0YV9zcGVjLnRzIHJlZ2lvbj0nSW5qZWN0YWJsZVRocm93cyd9XG4gICAqXG4gICAqXG4gICAqL1xuICAoKTogYW55O1xuICAob3B0aW9ucz86IHtwcm92aWRlZEluOiBUeXBlPGFueT58ICdyb290JyB8IG51bGx9JkluamVjdGFibGVQcm92aWRlcik6IGFueTtcbiAgbmV3ICgpOiBJbmplY3RhYmxlO1xuICBuZXcgKG9wdGlvbnM/OiB7cHJvdmlkZWRJbjogVHlwZTxhbnk+fCAncm9vdCcgfCBudWxsfSZJbmplY3RhYmxlUHJvdmlkZXIpOiBJbmplY3RhYmxlO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIEluamVjdGFibGUgbWV0YWRhdGEuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGUgeyBwcm92aWRlZEluPzogVHlwZTxhbnk+fCdyb290J3xudWxsOyB9XG5cbmNvbnN0IEVNUFRZX0FSUkFZOiBhbnlbXSA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEluamVjdGFibGVQcm92aWRlclRvRmFjdG9yeShcbiAgICB0eXBlOiBUeXBlPGFueT4sIHByb3ZpZGVyPzogSW5qZWN0YWJsZVByb3ZpZGVyKTogKCkgPT4gYW55IHtcbiAgaWYgKCFwcm92aWRlcikge1xuICAgIGNvbnN0IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSBuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpO1xuICAgIGNvbnN0IGRlcHMgPSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnBhcmFtZXRlcnModHlwZSk7XG4gICAgLy8gVE9ETyAtIGNvbnZlcnQgdG8gZmxhZ3MuXG4gICAgcmV0dXJuICgpID0+IG5ldyB0eXBlKC4uLmluamVjdEFyZ3MoZGVwcyBhcyBhbnlbXSkpO1xuICB9XG5cbiAgaWYgKFVTRV9WQUxVRSBpbiBwcm92aWRlcikge1xuICAgIGNvbnN0IHZhbHVlUHJvdmlkZXIgPSAocHJvdmlkZXIgYXMgVmFsdWVTYW5zUHJvdmlkZXIpO1xuICAgIHJldHVybiAoKSA9PiB2YWx1ZVByb3ZpZGVyLnVzZVZhbHVlO1xuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBFeGlzdGluZ1NhbnNQcm92aWRlcikudXNlRXhpc3RpbmcpIHtcbiAgICBjb25zdCBleGlzdGluZ1Byb3ZpZGVyID0gKHByb3ZpZGVyIGFzIEV4aXN0aW5nU2Fuc1Byb3ZpZGVyKTtcbiAgICByZXR1cm4gKCkgPT4gaW5qZWN0KGV4aXN0aW5nUHJvdmlkZXIudXNlRXhpc3RpbmcpO1xuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBGYWN0b3J5U2Fuc1Byb3ZpZGVyKS51c2VGYWN0b3J5KSB7XG4gICAgY29uc3QgZmFjdG9yeVByb3ZpZGVyID0gKHByb3ZpZGVyIGFzIEZhY3RvcnlTYW5zUHJvdmlkZXIpO1xuICAgIHJldHVybiAoKSA9PiBmYWN0b3J5UHJvdmlkZXIudXNlRmFjdG9yeSguLi5pbmplY3RBcmdzKGZhY3RvcnlQcm92aWRlci5kZXBzIHx8IEVNUFRZX0FSUkFZKSk7XG4gIH0gZWxzZSBpZiAoKHByb3ZpZGVyIGFzIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyIHwgQ2xhc3NTYW5zUHJvdmlkZXIpLnVzZUNsYXNzKSB7XG4gICAgY29uc3QgY2xhc3NQcm92aWRlciA9IChwcm92aWRlciBhcyBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciB8IENsYXNzU2Fuc1Byb3ZpZGVyKTtcbiAgICBsZXQgZGVwcyA9IChwcm92aWRlciBhcyBTdGF0aWNDbGFzc1NhbnNQcm92aWRlcikuZGVwcztcbiAgICBpZiAoIWRlcHMpIHtcbiAgICAgIGNvbnN0IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSBuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpO1xuICAgICAgZGVwcyA9IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IG5ldyBjbGFzc1Byb3ZpZGVyLnVzZUNsYXNzKC4uLmluamVjdEFyZ3MoZGVwcykpO1xuICB9IGVsc2Uge1xuICAgIGxldCBkZXBzID0gKHByb3ZpZGVyIGFzIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyKS5kZXBzO1xuICAgIGlmICghZGVwcykge1xuICAgICAgY29uc3QgcmVmbGVjdGlvbkNhcGFiaWxpdGllcyA9IG5ldyBSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzKCk7XG4gICAgICBkZXBzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gKCkgPT4gbmV3IHR5cGUoLi4uaW5qZWN0QXJncyhkZXBzICEpKTtcbiAgfVxufVxuXG4vKipcbiAqIFN1cHBvcnRzIEBJbmplY3RhYmxlKCkgaW4gSklUIG1vZGUgZm9yIFJlbmRlcjIuXG4gKi9cbmZ1bmN0aW9uIHByZVIzSW5qZWN0YWJsZUNvbXBpbGUoXG4gICAgaW5qZWN0YWJsZVR5cGU6IEluamVjdGFibGVUeXBlPGFueT4sXG4gICAgb3B0aW9uczoge3Byb3ZpZGVkSW4/OiBUeXBlPGFueT58ICdyb290JyB8IG51bGx9ICYgSW5qZWN0YWJsZVByb3ZpZGVyKTogdm9pZCB7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMucHJvdmlkZWRJbiAhPT0gdW5kZWZpbmVkICYmIGluamVjdGFibGVUeXBlLm5nSW5qZWN0YWJsZURlZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaW5qZWN0YWJsZVR5cGUubmdJbmplY3RhYmxlRGVmID0gZGVmaW5lSW5qZWN0YWJsZSh7XG4gICAgICBwcm92aWRlZEluOiBvcHRpb25zLnByb3ZpZGVkSW4sXG4gICAgICBmYWN0b3J5OiBjb252ZXJ0SW5qZWN0YWJsZVByb3ZpZGVyVG9GYWN0b3J5KGluamVjdGFibGVUeXBlLCBvcHRpb25zKSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiogSW5qZWN0YWJsZSBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuKlxuKlxuKiBAQW5ub3RhdGlvblxuKi9cbmV4cG9ydCBjb25zdCBJbmplY3RhYmxlOiBJbmplY3RhYmxlRGVjb3JhdG9yID0gbWFrZURlY29yYXRvcihcbiAgICAnSW5qZWN0YWJsZScsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgKHR5cGU6IFR5cGU8YW55PiwgbWV0YTogSW5qZWN0YWJsZSkgPT5cbiAgICAgICAgKFIzX0NPTVBJTEVfSU5KRUNUQUJMRSB8fCBwcmVSM0luamVjdGFibGVDb21waWxlKSh0eXBlLCBtZXRhKSk7XG5cbi8qKlxuICogVHlwZSByZXByZXNlbnRpbmcgaW5qZWN0YWJsZSBzZXJ2aWNlLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlVHlwZTxUPiBleHRlbmRzIFR5cGU8VD4geyBuZ0luamVjdGFibGVEZWY6IEluamVjdGFibGVEZWY8VD47IH1cbiJdfQ==