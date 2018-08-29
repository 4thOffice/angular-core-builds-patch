/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LiteralExpr, R3ResolvedDependencyType, WrappedNodeExpr } from '@angular/compiler';
import { Injector } from '../../di/injector';
import { Host, Inject, Optional, Self, SkipSelf } from '../../di/metadata';
import { ElementRef } from '../../linker/element_ref';
import { TemplateRef } from '../../linker/template_ref';
import { ViewContainerRef } from '../../linker/view_container_ref';
import { Attribute } from '../../metadata/di';
import { ReflectionCapabilities } from '../../reflection/reflection_capabilities';
var _reflect = null;
export function getReflect() {
    return (_reflect = _reflect || new ReflectionCapabilities());
}
export function reflectDependencies(type) {
    return convertDependencies(getReflect().parameters(type));
}
export function convertDependencies(deps) {
    return deps.map(function (dep) { return reflectDependency(dep); });
}
function reflectDependency(dep) {
    var meta = {
        token: new LiteralExpr(null),
        host: false,
        optional: false,
        resolved: R3ResolvedDependencyType.Token,
        self: false,
        skipSelf: false,
    };
    function setTokenAndResolvedType(token) {
        if (token === ElementRef) {
            meta.resolved = R3ResolvedDependencyType.ElementRef;
        }
        else if (token === Injector) {
            meta.resolved = R3ResolvedDependencyType.Injector;
        }
        else if (token === TemplateRef) {
            meta.resolved = R3ResolvedDependencyType.TemplateRef;
        }
        else if (token === ViewContainerRef) {
            meta.resolved = R3ResolvedDependencyType.ViewContainerRef;
        }
        else {
            meta.resolved = R3ResolvedDependencyType.Token;
        }
        meta.token = new WrappedNodeExpr(token);
    }
    if (Array.isArray(dep)) {
        if (dep.length === 0) {
            throw new Error('Dependency array must have arguments.');
        }
        for (var j = 0; j < dep.length; j++) {
            var param = dep[j];
            if (param instanceof Optional || param.__proto__.ngMetadataName === 'Optional') {
                meta.optional = true;
            }
            else if (param instanceof SkipSelf || param.__proto__.ngMetadataName === 'SkipSelf') {
                meta.skipSelf = true;
            }
            else if (param instanceof Self || param.__proto__.ngMetadataName === 'Self') {
                meta.self = true;
            }
            else if (param instanceof Host || param.__proto__.ngMetadataName === 'Host') {
                meta.host = true;
            }
            else if (param instanceof Inject) {
                meta.token = new WrappedNodeExpr(param.token);
            }
            else if (param instanceof Attribute) {
                if (param.attributeName === undefined) {
                    throw new Error("Attribute name must be defined.");
                }
                meta.token = new LiteralExpr(param.attributeName);
                meta.resolved = R3ResolvedDependencyType.Attribute;
            }
            else {
                setTokenAndResolvedType(param);
            }
        }
    }
    else {
        setTokenAndResolvedType(dep);
    }
    return meta;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFdBQVcsRUFBd0Isd0JBQXdCLEVBQUUsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFL0csT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDekUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFHaEYsSUFBSSxRQUFRLEdBQWdDLElBQUksQ0FBQztBQUVqRCxNQUFNLFVBQVUsVUFBVTtJQUN4QixPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLHNCQUFzQixFQUFFLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQWU7SUFDakQsT0FBTyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQVc7SUFDN0MsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEs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LHdCQUF3QixDQUFDLFNBQVMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDTCx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztTQUNGO0tBQ0Y7U0FBTTtRQUNMLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzlCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xpdGVyYWxFeHByLCBSM0RlcGVuZGVuY3lNZXRhZGF0YSwgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLCBXcmFwcGVkTm9kZUV4cHJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyJztcblxuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vLi4vZGkvaW5qZWN0b3InO1xuaW1wb3J0IHtIb3N0LCBJbmplY3QsIE9wdGlvbmFsLCBTZWxmLCBTa2lwU2VsZn0gZnJvbSAnLi4vLi4vZGkvbWV0YWRhdGEnO1xuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tICcuLi8uLi9saW5rZXIvZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtUZW1wbGF0ZVJlZn0gZnJvbSAnLi4vLi4vbGlua2VyL3RlbXBsYXRlX3JlZic7XG5pbXBvcnQge1ZpZXdDb250YWluZXJSZWZ9IGZyb20gJy4uLy4uL2xpbmtlci92aWV3X2NvbnRhaW5lcl9yZWYnO1xuaW1wb3J0IHtBdHRyaWJ1dGV9IGZyb20gJy4uLy4uL21ldGFkYXRhL2RpJztcbmltcG9ydCB7UmVmbGVjdGlvbkNhcGFiaWxpdGllc30gZnJvbSAnLi4vLi4vcmVmbGVjdGlvbi9yZWZsZWN0aW9uX2NhcGFiaWxpdGllcyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL3R5cGUnO1xuXG5sZXQgX3JlZmxlY3Q6IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXN8bnVsbCA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWZsZWN0KCk6IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMge1xuICByZXR1cm4gKF9yZWZsZWN0ID0gX3JlZmxlY3QgfHwgbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZsZWN0RGVwZW5kZW5jaWVzKHR5cGU6IFR5cGU8YW55Pik6IFIzRGVwZW5kZW5jeU1ldGFkYXRhW10ge1xuICByZXR1cm4gY29udmVydERlcGVuZGVuY2llcyhnZXRSZWZsZWN0KCkucGFyYW1ldGVycyh0eXBlKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RGVwZW5kZW5jaWVzKGRlcHM6IGFueVtdKTogUjNEZXBlbmRlbmN5TWV0YWRhdGFbXSB7XG4gIHJldHVybiBkZXBzLm1hcChkZXAgPT4gcmVmbGVjdERlcGVuZGVuY3koZGVwKSk7XG59XG5cbmZ1bmN0aW9uIHJlZmxlY3REZXBlbmRlbmN5KGRlcDogYW55IHwgYW55W10pOiBSM0RlcGVuZGVuY3lNZXRhZGF0YSB7XG4gIGNvbnN0IG1ldGE6IFIzRGVwZW5kZW5jeU1ldGFkYXRhID0ge1xuICAgIHRva2VuOiBuZXcgTGl0ZXJhbEV4cHIobnVsbCksXG4gICAgaG9zdDogZmFsc2UsXG4gICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgIHJlc29sdmVkOiBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVG9rZW4sXG4gICAgc2VsZjogZmFsc2UsXG4gICAgc2tpcFNlbGY6IGZhbHNlLFxuICB9O1xuXG4gIGZ1bmN0aW9uIHNldFRva2VuQW5kUmVzb2x2ZWRUeXBlKHRva2VuOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodG9rZW4gPT09IEVsZW1lbnRSZWYpIHtcbiAgICAgIG1ldGEucmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuRWxlbWVudFJlZjtcbiAgICB9IGVsc2UgaWYgKHRva2VuID09PSBJbmplY3Rvcikge1xuICAgICAgbWV0YS5yZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5JbmplY3RvcjtcbiAgICB9IGVsc2UgaWYgKHRva2VuID09PSBUZW1wbGF0ZVJlZikge1xuICAgICAgbWV0YS5yZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5UZW1wbGF0ZVJlZjtcbiAgICB9IGVsc2UgaWYgKHRva2VuID09PSBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgICBtZXRhLnJlc29sdmVkID0gUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlLlZpZXdDb250YWluZXJSZWY7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1ldGEucmVzb2x2ZWQgPSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUuVG9rZW47XG4gICAgfVxuICAgIG1ldGEudG9rZW4gPSBuZXcgV3JhcHBlZE5vZGVFeHByKHRva2VuKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGRlcCkpIHtcbiAgICBpZiAoZGVwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXBlbmRlbmN5IGFycmF5IG11c3QgaGF2ZSBhcmd1bWVudHMuJyk7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGVwLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBwYXJhbSA9IGRlcFtqXTtcbiAgICAgIGlmIChwYXJhbSBpbnN0YW5jZW9mIE9wdGlvbmFsIHx8IHBhcmFtLl9fcHJvdG9fXy5uZ01ldGFkYXRhTmFtZSA9PT0gJ09wdGlvbmFsJykge1xuICAgICAgICBtZXRhLm9wdGlvbmFsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocGFyYW0gaW5zdGFuY2VvZiBTa2lwU2VsZiB8fCBwYXJhbS5fX3Byb3RvX18ubmdNZXRhZGF0YU5hbWUgPT09ICdTa2lwU2VsZicpIHtcbiAgICAgICAgbWV0YS5za2lwU2VsZiA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtIGluc3RhbmNlb2YgU2VsZiB8fCBwYXJhbS5fX3Byb3RvX18ubmdNZXRhZGF0YU5hbWUgPT09ICdTZWxmJykge1xuICAgICAgICBtZXRhLnNlbGYgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbSBpbnN0YW5jZW9mIEhvc3QgfHwgcGFyYW0uX19wcm90b19fLm5nTWV0YWRhdGFOYW1lID09PSAnSG9zdCcpIHtcbiAgICAgICAgbWV0YS5ob3N0ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocGFyYW0gaW5zdGFuY2VvZiBJbmplY3QpIHtcbiAgICAgICAgbWV0YS50b2tlbiA9IG5ldyBXcmFwcGVkTm9kZUV4cHIocGFyYW0udG9rZW4pO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbSBpbnN0YW5jZW9mIEF0dHJpYnV0ZSkge1xuICAgICAgICBpZiAocGFyYW0uYXR0cmlidXRlTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBdHRyaWJ1dGUgbmFtZSBtdXN0IGJlIGRlZmluZWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgbWV0YS50b2tlbiA9IG5ldyBMaXRlcmFsRXhwcihwYXJhbS5hdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgbWV0YS5yZXNvbHZlZCA9IFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZS5BdHRyaWJ1dGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUb2tlbkFuZFJlc29sdmVkVHlwZShwYXJhbSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNldFRva2VuQW5kUmVzb2x2ZWRUeXBlKGRlcCk7XG4gIH1cbiAgcmV0dXJuIG1ldGE7XG59XG4iXX0=