/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { R3_COMPILE_INJECTABLE } from '../ivy_switch';
import { ReflectionCapabilities } from '../reflection/reflection_capabilities';
import { makeDecorator } from '../util/decorators';
import { getClosureSafeProperty } from '../util/property';
import { defineInjectable } from './defs';
import { inject, injectArgs } from './injector';
const GET_PROPERTY_NAME = {};
const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: GET_PROPERTY_NAME }, GET_PROPERTY_NAME);
const EMPTY_ARRAY = [];
export function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        const reflectionCapabilities = new ReflectionCapabilities();
        const deps = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return () => new type(...injectArgs(deps));
    }
    if (USE_VALUE in provider) {
        const valueProvider = provider;
        return () => valueProvider.useValue;
    }
    else if (provider.useExisting) {
        const existingProvider = provider;
        return () => inject(existingProvider.useExisting);
    }
    else if (provider.useFactory) {
        const factoryProvider = provider;
        return () => factoryProvider.useFactory(...injectArgs(factoryProvider.deps || EMPTY_ARRAY));
    }
    else if (provider.useClass) {
        const classProvider = provider;
        let deps = provider.deps;
        if (!deps) {
            const reflectionCapabilities = new ReflectionCapabilities();
            deps = reflectionCapabilities.parameters(type);
        }
        return () => new classProvider.useClass(...injectArgs(deps));
    }
    else {
        let deps = provider.deps;
        if (!deps) {
            const reflectionCapabilities = new ReflectionCapabilities();
            deps = reflectionCapabilities.parameters(type);
        }
        return () => new type(...injectArgs(deps));
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
* @Annotation
*/
export const Injectable = makeDecorator('Injectable', undefined, undefined, undefined, (type, meta) => (R3_COMPILE_INJECTABLE || preR3InjectableCompile)(type, meta));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBRTdFLE9BQU8sRUFBQyxhQUFhLEVBQXFCLE1BQU0sb0JBQW9CLENBQUM7QUFDckUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFeEQsT0FBTyxFQUFnQyxnQkFBZ0IsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUN2RSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUc5QyxNQUFNLGlCQUFpQixHQUFHLEVBQVMsQ0FBQztBQUNwQyxNQUFNLFNBQVMsR0FBRyxzQkFBc0IsQ0FDcEMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUEyQ3ZFLE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztBQUU5QixNQUFNLDZDQUNGLElBQWUsRUFBRSxRQUE2QjtJQUNoRCxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDNUQsTUFBTSxJQUFJLEdBQUcsc0JBQXNCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELDJCQUEyQjtRQUMzQixPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQWEsQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFFRCxJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUU7UUFDekIsTUFBTSxhQUFhLEdBQUksUUFBOEIsQ0FBQztRQUN0RCxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7S0FDckM7U0FBTSxJQUFLLFFBQWlDLENBQUMsV0FBVyxFQUFFO1FBQ3pELE1BQU0sZ0JBQWdCLEdBQUksUUFBaUMsQ0FBQztRQUM1RCxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUssUUFBZ0MsQ0FBQyxVQUFVLEVBQUU7UUFDdkQsTUFBTSxlQUFlLEdBQUksUUFBZ0MsQ0FBQztRQUMxRCxPQUFPLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQzdGO1NBQU0sSUFBSyxRQUF3RCxDQUFDLFFBQVEsRUFBRTtRQUM3RSxNQUFNLGFBQWEsR0FBSSxRQUF3RCxDQUFDO1FBQ2hGLElBQUksSUFBSSxHQUFJLFFBQW9DLENBQUMsSUFBSSxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLHNCQUFzQixHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUM1RCxJQUFJLEdBQUcsc0JBQXNCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM5RDtTQUFNO1FBQ0wsSUFBSSxJQUFJLEdBQUksUUFBb0MsQ0FBQyxJQUFJLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1lBQzVELElBQUksR0FBRyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQU0sQ0FBQyxDQUFDLENBQUM7S0FDOUM7QUFDSCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxnQ0FDSSxjQUFtQyxFQUNuQyxPQUFxRTtJQUN2RSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxjQUFjLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtRQUMvRixjQUFjLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO1lBQ2hELFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUM5QixPQUFPLEVBQUUsa0NBQWtDLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQztTQUNyRSxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFFRDs7OztFQUlFO0FBQ0YsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUF3QixhQUFhLENBQ3hELFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFDN0MsQ0FBQyxJQUFlLEVBQUUsSUFBZ0IsRUFBRSxFQUFFLENBQ2xDLENBQUMscUJBQXFCLElBQUksc0JBQXNCLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSM19DT01QSUxFX0lOSkVDVEFCTEV9IGZyb20gJy4uL2l2eV9zd2l0Y2gnO1xuaW1wb3J0IHtSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge21ha2VEZWNvcmF0b3IsIG1ha2VQYXJhbURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcbmltcG9ydCB7Z2V0Q2xvc3VyZVNhZmVQcm9wZXJ0eX0gZnJvbSAnLi4vdXRpbC9wcm9wZXJ0eSc7XG5cbmltcG9ydCB7SW5qZWN0YWJsZURlZiwgSW5qZWN0YWJsZVR5cGUsIGRlZmluZUluamVjdGFibGV9IGZyb20gJy4vZGVmcyc7XG5pbXBvcnQge2luamVjdCwgaW5qZWN0QXJnc30gZnJvbSAnLi9pbmplY3Rvcic7XG5pbXBvcnQge0NsYXNzU2Fuc1Byb3ZpZGVyLCBDb25zdHJ1Y3RvclByb3ZpZGVyLCBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciwgRXhpc3RpbmdQcm92aWRlciwgRXhpc3RpbmdTYW5zUHJvdmlkZXIsIEZhY3RvcnlQcm92aWRlciwgRmFjdG9yeVNhbnNQcm92aWRlciwgU3RhdGljQ2xhc3NQcm92aWRlciwgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXIsIFZhbHVlU2Fuc1Byb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuY29uc3QgR0VUX1BST1BFUlRZX05BTUUgPSB7fSBhcyBhbnk7XG5jb25zdCBVU0VfVkFMVUUgPSBnZXRDbG9zdXJlU2FmZVByb3BlcnR5PFZhbHVlUHJvdmlkZXI+KFxuICAgIHtwcm92aWRlOiBTdHJpbmcsIHVzZVZhbHVlOiBHRVRfUFJPUEVSVFlfTkFNRX0sIEdFVF9QUk9QRVJUWV9OQU1FKTtcblxuLyoqXG4gKiBJbmplY3RhYmxlIHByb3ZpZGVycyB1c2VkIGluIGBASW5qZWN0YWJsZWAgZGVjb3JhdG9yLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgSW5qZWN0YWJsZVByb3ZpZGVyID0gVmFsdWVTYW5zUHJvdmlkZXIgfCBFeGlzdGluZ1NhbnNQcm92aWRlciB8XG4gICAgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIgfCBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciB8IEZhY3RvcnlTYW5zUHJvdmlkZXIgfCBDbGFzc1NhbnNQcm92aWRlcjtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3RhYmxlIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogQSBtYXJrZXIgbWV0YWRhdGEgdGhhdCBtYXJrcyBhIGNsYXNzIGFzIGF2YWlsYWJsZSB0byBgSW5qZWN0b3JgIGZvciBjcmVhdGlvbi5cbiAgICpcbiAgICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL21ldGFkYXRhX3NwZWMudHMgcmVnaW9uPSdJbmplY3RhYmxlJ31cbiAgICpcbiAgICogYEluamVjdG9yYCB3aWxsIHRocm93IGFuIGVycm9yIHdoZW4gdHJ5aW5nIHRvIGluc3RhbnRpYXRlIGEgY2xhc3MgdGhhdFxuICAgKiBkb2VzIG5vdCBoYXZlIGBASW5qZWN0YWJsZWAgbWFya2VyLCBhcyBzaG93biBpbiB0aGUgZXhhbXBsZSBiZWxvdy5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J0luamVjdGFibGVUaHJvd3MnfVxuICAgKlxuICAgKi9cbiAgKCk6IGFueTtcbiAgKG9wdGlvbnM/OiB7cHJvdmlkZWRJbjogVHlwZTxhbnk+fCAncm9vdCcgfCBudWxsfSZJbmplY3RhYmxlUHJvdmlkZXIpOiBhbnk7XG4gIG5ldyAoKTogSW5qZWN0YWJsZTtcbiAgbmV3IChvcHRpb25zPzoge3Byb3ZpZGVkSW46IFR5cGU8YW55PnwgJ3Jvb3QnIHwgbnVsbH0mSW5qZWN0YWJsZVByb3ZpZGVyKTogSW5qZWN0YWJsZTtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3RhYmxlIG1ldGFkYXRhLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlIHsgcHJvdmlkZWRJbj86IFR5cGU8YW55Pnwncm9vdCd8bnVsbDsgfVxuXG5jb25zdCBFTVBUWV9BUlJBWTogYW55W10gPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRJbmplY3RhYmxlUHJvdmlkZXJUb0ZhY3RvcnkoXG4gICAgdHlwZTogVHlwZTxhbnk+LCBwcm92aWRlcj86IEluamVjdGFibGVQcm92aWRlcik6ICgpID0+IGFueSB7XG4gIGlmICghcHJvdmlkZXIpIHtcbiAgICBjb25zdCByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKTtcbiAgICBjb25zdCBkZXBzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGUpO1xuICAgIC8vIFRPRE8gLSBjb252ZXJ0IHRvIGZsYWdzLlxuICAgIHJldHVybiAoKSA9PiBuZXcgdHlwZSguLi5pbmplY3RBcmdzKGRlcHMgYXMgYW55W10pKTtcbiAgfVxuXG4gIGlmIChVU0VfVkFMVUUgaW4gcHJvdmlkZXIpIHtcbiAgICBjb25zdCB2YWx1ZVByb3ZpZGVyID0gKHByb3ZpZGVyIGFzIFZhbHVlU2Fuc1Byb3ZpZGVyKTtcbiAgICByZXR1cm4gKCkgPT4gdmFsdWVQcm92aWRlci51c2VWYWx1ZTtcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgRXhpc3RpbmdTYW5zUHJvdmlkZXIpLnVzZUV4aXN0aW5nKSB7XG4gICAgY29uc3QgZXhpc3RpbmdQcm92aWRlciA9IChwcm92aWRlciBhcyBFeGlzdGluZ1NhbnNQcm92aWRlcik7XG4gICAgcmV0dXJuICgpID0+IGluamVjdChleGlzdGluZ1Byb3ZpZGVyLnVzZUV4aXN0aW5nKTtcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgRmFjdG9yeVNhbnNQcm92aWRlcikudXNlRmFjdG9yeSkge1xuICAgIGNvbnN0IGZhY3RvcnlQcm92aWRlciA9IChwcm92aWRlciBhcyBGYWN0b3J5U2Fuc1Byb3ZpZGVyKTtcbiAgICByZXR1cm4gKCkgPT4gZmFjdG9yeVByb3ZpZGVyLnVzZUZhY3RvcnkoLi4uaW5qZWN0QXJncyhmYWN0b3J5UHJvdmlkZXIuZGVwcyB8fCBFTVBUWV9BUlJBWSkpO1xuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciB8IENsYXNzU2Fuc1Byb3ZpZGVyKS51c2VDbGFzcykge1xuICAgIGNvbnN0IGNsYXNzUHJvdmlkZXIgPSAocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIgfCBDbGFzc1NhbnNQcm92aWRlcik7XG4gICAgbGV0IGRlcHMgPSAocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIpLmRlcHM7XG4gICAgaWYgKCFkZXBzKSB7XG4gICAgICBjb25zdCByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKTtcbiAgICAgIGRlcHMgPSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnBhcmFtZXRlcnModHlwZSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiBuZXcgY2xhc3NQcm92aWRlci51c2VDbGFzcyguLi5pbmplY3RBcmdzKGRlcHMpKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgZGVwcyA9IChwcm92aWRlciBhcyBDb25zdHJ1Y3RvclNhbnNQcm92aWRlcikuZGVwcztcbiAgICBpZiAoIWRlcHMpIHtcbiAgICAgIGNvbnN0IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSBuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpO1xuICAgICAgZGVwcyA9IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IG5ldyB0eXBlKC4uLmluamVjdEFyZ3MoZGVwcyAhKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTdXBwb3J0cyBASW5qZWN0YWJsZSgpIGluIEpJVCBtb2RlIGZvciBSZW5kZXIyLlxuICovXG5mdW5jdGlvbiBwcmVSM0luamVjdGFibGVDb21waWxlKFxuICAgIGluamVjdGFibGVUeXBlOiBJbmplY3RhYmxlVHlwZTxhbnk+LFxuICAgIG9wdGlvbnM6IHtwcm92aWRlZEluPzogVHlwZTxhbnk+fCAncm9vdCcgfCBudWxsfSAmIEluamVjdGFibGVQcm92aWRlcik6IHZvaWQge1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByb3ZpZGVkSW4gIT09IHVuZGVmaW5lZCAmJiBpbmplY3RhYmxlVHlwZS5uZ0luamVjdGFibGVEZWYgPT09IHVuZGVmaW5lZCkge1xuICAgIGluamVjdGFibGVUeXBlLm5nSW5qZWN0YWJsZURlZiA9IGRlZmluZUluamVjdGFibGUoe1xuICAgICAgcHJvdmlkZWRJbjogb3B0aW9ucy5wcm92aWRlZEluLFxuICAgICAgZmFjdG9yeTogY29udmVydEluamVjdGFibGVQcm92aWRlclRvRmFjdG9yeShpbmplY3RhYmxlVHlwZSwgb3B0aW9ucyksXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4qIEluamVjdGFibGUgZGVjb3JhdG9yIGFuZCBtZXRhZGF0YS5cbipcbiogQEFubm90YXRpb25cbiovXG5leHBvcnQgY29uc3QgSW5qZWN0YWJsZTogSW5qZWN0YWJsZURlY29yYXRvciA9IG1ha2VEZWNvcmF0b3IoXG4gICAgJ0luamVjdGFibGUnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxuICAgICh0eXBlOiBUeXBlPGFueT4sIG1ldGE6IEluamVjdGFibGUpID0+XG4gICAgICAgIChSM19DT01QSUxFX0lOSkVDVEFCTEUgfHwgcHJlUjNJbmplY3RhYmxlQ29tcGlsZSkodHlwZSwgbWV0YSkpO1xuXG4vKipcbiAqIFR5cGUgcmVwcmVzZW50aW5nIGluamVjdGFibGUgc2VydmljZS5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0YWJsZVR5cGU8VD4gZXh0ZW5kcyBUeXBlPFQ+IHsgbmdJbmplY3RhYmxlRGVmOiBJbmplY3RhYmxlRGVmPFQ+OyB9XG4iXX0=