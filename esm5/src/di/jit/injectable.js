/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getCompilerFacade } from '../../compiler/compiler_facade';
import { getClosureSafeProperty } from '../../util/property';
import { NG_INJECTABLE_DEF } from '../interface/defs';
import { angularCoreDiEnv } from './environment';
import { convertDependencies, reflectDependencies } from './util';
/**
 * Compile an Angular injectable according to its `Injectable` metadata, and patch the resulting
 * `ngInjectableDef` onto the injectable type.
 */
export function compileInjectable(type, srcMeta) {
    var def = null;
    // if NG_INJECTABLE_DEF is already defined on this class then don't overwrite it
    if (type.hasOwnProperty(NG_INJECTABLE_DEF))
        return;
    Object.defineProperty(type, NG_INJECTABLE_DEF, {
        get: function () {
            if (def === null) {
                // Allow the compilation of a class with a `@Injectable()` decorator without parameters
                var meta = srcMeta || { providedIn: null };
                var hasAProvider = isUseClassProvider(meta) || isUseFactoryProvider(meta) ||
                    isUseValueProvider(meta) || isUseExistingProvider(meta);
                var compilerMeta = {
                    name: type.name,
                    type: type,
                    typeArgumentCount: 0,
                    providedIn: meta.providedIn,
                    ctorDeps: reflectDependencies(type),
                    userDeps: undefined,
                };
                if ((isUseClassProvider(meta) || isUseFactoryProvider(meta)) && meta.deps !== undefined) {
                    compilerMeta.userDeps = convertDependencies(meta.deps);
                }
                if (!hasAProvider) {
                    // In the case the user specifies a type provider, treat it as {provide: X, useClass: X}.
                    // The deps will have been reflected above, causing the factory to create the class by
                    // calling
                    // its constructor with injected deps.
                    compilerMeta.useClass = type;
                }
                else if (isUseClassProvider(meta)) {
                    // The user explicitly specified useClass, and may or may not have provided deps.
                    compilerMeta.useClass = meta.useClass;
                }
                else if (isUseValueProvider(meta)) {
                    // The user explicitly specified useValue.
                    compilerMeta.useValue = meta.useValue;
                }
                else if (isUseFactoryProvider(meta)) {
                    // The user explicitly specified useFactory.
                    compilerMeta.useFactory = meta.useFactory;
                }
                else if (isUseExistingProvider(meta)) {
                    // The user explicitly specified useExisting.
                    compilerMeta.useExisting = meta.useExisting;
                }
                else {
                    // Can't happen - either hasAProvider will be false, or one of the providers will be set.
                    throw new Error("Unreachable state.");
                }
                def = getCompilerFacade().compileInjectable(angularCoreDiEnv, "ng:///" + type.name + "/ngInjectableDef.js", compilerMeta);
            }
            return def;
        },
    });
}
var USE_VALUE = getClosureSafeProperty({ provide: String, useValue: getClosureSafeProperty });
function isUseClassProvider(meta) {
    return meta.useClass !== undefined;
}
function isUseValueProvider(meta) {
    return USE_VALUE in meta;
}
function isUseFactoryProvider(meta) {
    return meta.useFactory !== undefined;
}
function isUseExistingProvider(meta) {
    return meta.useExisting !== undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2ppdC9pbmplY3RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBNkIsaUJBQWlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU3RixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUdwRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFDLG1CQUFtQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBSWhFOzs7R0FHRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxJQUFlLEVBQUUsT0FBb0I7SUFDckUsSUFBSSxHQUFHLEdBQVEsSUFBSSxDQUFDO0lBRXBCLGdGQUFnRjtJQUNoRixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUM7UUFBRSxPQUFPO0lBRW5ELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1FBQzdDLEdBQUcsRUFBRTtZQUNILElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDaEIsdUZBQXVGO2dCQUN2RixJQUFNLElBQUksR0FBZSxPQUFPLElBQUksRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQ3ZELElBQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQztvQkFDdkUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRzVELElBQU0sWUFBWSxHQUErQjtvQkFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLElBQUksRUFBRSxJQUFJO29CQUNWLGlCQUFpQixFQUFFLENBQUM7b0JBQ3BCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtvQkFDM0IsUUFBUSxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQztvQkFDbkMsUUFBUSxFQUFFLFNBQVM7aUJBQ3BCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7b0JBQ3ZGLFlBQVksQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4RDtnQkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNqQix5RkFBeUY7b0JBQ3pGLHNGQUFzRjtvQkFDdEYsVUFBVTtvQkFDVixzQ0FBc0M7b0JBQ3RDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2lCQUM5QjtxQkFBTSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNuQyxpRkFBaUY7b0JBQ2pGLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDdkM7cUJBQU0sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkMsMENBQTBDO29CQUMxQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3ZDO3FCQUFNLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3JDLDRDQUE0QztvQkFDNUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2lCQUMzQztxQkFBTSxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0Qyw2Q0FBNkM7b0JBQzdDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDN0M7cUJBQU07b0JBQ0wseUZBQXlGO29CQUN6RixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQ3ZDO2dCQUNELEdBQUcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLGlCQUFpQixDQUN2QyxnQkFBZ0IsRUFBRSxXQUFTLElBQUksQ0FBQyxJQUFJLHdCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQzlFO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUlELElBQU0sU0FBUyxHQUNYLHNCQUFzQixDQUFnQixFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFDLENBQUMsQ0FBQztBQUUvRixTQUFTLGtCQUFrQixDQUFDLElBQWdCO0lBQzFDLE9BQVEsSUFBeUIsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQWdCO0lBQzFDLE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQztBQUMzQixDQUFDO0FBRUQsU0FBUyxvQkFBb0IsQ0FBQyxJQUFnQjtJQUM1QyxPQUFRLElBQTRCLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQztBQUNoRSxDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxJQUFnQjtJQUM3QyxPQUFRLElBQTZCLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQztBQUNsRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1IzSW5qZWN0YWJsZU1ldGFkYXRhRmFjYWRlLCBnZXRDb21waWxlckZhY2FkZX0gZnJvbSAnLi4vLi4vY29tcGlsZXIvY29tcGlsZXJfZmFjYWRlJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3R5cGUnO1xuaW1wb3J0IHtnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSBmcm9tICcuLi8uLi91dGlsL3Byb3BlcnR5JztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnLi4vaW5qZWN0YWJsZSc7XG5pbXBvcnQge05HX0lOSkVDVEFCTEVfREVGfSBmcm9tICcuLi9pbnRlcmZhY2UvZGVmcyc7XG5pbXBvcnQge0NsYXNzU2Fuc1Byb3ZpZGVyLCBFeGlzdGluZ1NhbnNQcm92aWRlciwgRmFjdG9yeVNhbnNQcm92aWRlciwgVmFsdWVQcm92aWRlciwgVmFsdWVTYW5zUHJvdmlkZXJ9IGZyb20gJy4uL2ludGVyZmFjZS9wcm92aWRlcic7XG5cbmltcG9ydCB7YW5ndWxhckNvcmVEaUVudn0gZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5pbXBvcnQge2NvbnZlcnREZXBlbmRlbmNpZXMsIHJlZmxlY3REZXBlbmRlbmNpZXN9IGZyb20gJy4vdXRpbCc7XG5cblxuXG4vKipcbiAqIENvbXBpbGUgYW4gQW5ndWxhciBpbmplY3RhYmxlIGFjY29yZGluZyB0byBpdHMgYEluamVjdGFibGVgIG1ldGFkYXRhLCBhbmQgcGF0Y2ggdGhlIHJlc3VsdGluZ1xuICogYG5nSW5qZWN0YWJsZURlZmAgb250byB0aGUgaW5qZWN0YWJsZSB0eXBlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUluamVjdGFibGUodHlwZTogVHlwZTxhbnk+LCBzcmNNZXRhPzogSW5qZWN0YWJsZSk6IHZvaWQge1xuICBsZXQgZGVmOiBhbnkgPSBudWxsO1xuXG4gIC8vIGlmIE5HX0lOSkVDVEFCTEVfREVGIGlzIGFscmVhZHkgZGVmaW5lZCBvbiB0aGlzIGNsYXNzIHRoZW4gZG9uJ3Qgb3ZlcndyaXRlIGl0XG4gIGlmICh0eXBlLmhhc093blByb3BlcnR5KE5HX0lOSkVDVEFCTEVfREVGKSkgcmV0dXJuO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBOR19JTkpFQ1RBQkxFX0RFRiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgaWYgKGRlZiA9PT0gbnVsbCkge1xuICAgICAgICAvLyBBbGxvdyB0aGUgY29tcGlsYXRpb24gb2YgYSBjbGFzcyB3aXRoIGEgYEBJbmplY3RhYmxlKClgIGRlY29yYXRvciB3aXRob3V0IHBhcmFtZXRlcnNcbiAgICAgICAgY29uc3QgbWV0YTogSW5qZWN0YWJsZSA9IHNyY01ldGEgfHwge3Byb3ZpZGVkSW46IG51bGx9O1xuICAgICAgICBjb25zdCBoYXNBUHJvdmlkZXIgPSBpc1VzZUNsYXNzUHJvdmlkZXIobWV0YSkgfHwgaXNVc2VGYWN0b3J5UHJvdmlkZXIobWV0YSkgfHxcbiAgICAgICAgICAgIGlzVXNlVmFsdWVQcm92aWRlcihtZXRhKSB8fCBpc1VzZUV4aXN0aW5nUHJvdmlkZXIobWV0YSk7XG5cblxuICAgICAgICBjb25zdCBjb21waWxlck1ldGE6IFIzSW5qZWN0YWJsZU1ldGFkYXRhRmFjYWRlID0ge1xuICAgICAgICAgIG5hbWU6IHR5cGUubmFtZSxcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIHR5cGVBcmd1bWVudENvdW50OiAwLFxuICAgICAgICAgIHByb3ZpZGVkSW46IG1ldGEucHJvdmlkZWRJbixcbiAgICAgICAgICBjdG9yRGVwczogcmVmbGVjdERlcGVuZGVuY2llcyh0eXBlKSxcbiAgICAgICAgICB1c2VyRGVwczogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoKGlzVXNlQ2xhc3NQcm92aWRlcihtZXRhKSB8fCBpc1VzZUZhY3RvcnlQcm92aWRlcihtZXRhKSkgJiYgbWV0YS5kZXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb21waWxlck1ldGEudXNlckRlcHMgPSBjb252ZXJ0RGVwZW5kZW5jaWVzKG1ldGEuZGVwcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNBUHJvdmlkZXIpIHtcbiAgICAgICAgICAvLyBJbiB0aGUgY2FzZSB0aGUgdXNlciBzcGVjaWZpZXMgYSB0eXBlIHByb3ZpZGVyLCB0cmVhdCBpdCBhcyB7cHJvdmlkZTogWCwgdXNlQ2xhc3M6IFh9LlxuICAgICAgICAgIC8vIFRoZSBkZXBzIHdpbGwgaGF2ZSBiZWVuIHJlZmxlY3RlZCBhYm92ZSwgY2F1c2luZyB0aGUgZmFjdG9yeSB0byBjcmVhdGUgdGhlIGNsYXNzIGJ5XG4gICAgICAgICAgLy8gY2FsbGluZ1xuICAgICAgICAgIC8vIGl0cyBjb25zdHJ1Y3RvciB3aXRoIGluamVjdGVkIGRlcHMuXG4gICAgICAgICAgY29tcGlsZXJNZXRhLnVzZUNsYXNzID0gdHlwZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1VzZUNsYXNzUHJvdmlkZXIobWV0YSkpIHtcbiAgICAgICAgICAvLyBUaGUgdXNlciBleHBsaWNpdGx5IHNwZWNpZmllZCB1c2VDbGFzcywgYW5kIG1heSBvciBtYXkgbm90IGhhdmUgcHJvdmlkZWQgZGVwcy5cbiAgICAgICAgICBjb21waWxlck1ldGEudXNlQ2xhc3MgPSBtZXRhLnVzZUNsYXNzO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlVmFsdWVQcm92aWRlcihtZXRhKSkge1xuICAgICAgICAgIC8vIFRoZSB1c2VyIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHVzZVZhbHVlLlxuICAgICAgICAgIGNvbXBpbGVyTWV0YS51c2VWYWx1ZSA9IG1ldGEudXNlVmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNVc2VGYWN0b3J5UHJvdmlkZXIobWV0YSkpIHtcbiAgICAgICAgICAvLyBUaGUgdXNlciBleHBsaWNpdGx5IHNwZWNpZmllZCB1c2VGYWN0b3J5LlxuICAgICAgICAgIGNvbXBpbGVyTWV0YS51c2VGYWN0b3J5ID0gbWV0YS51c2VGYWN0b3J5O1xuICAgICAgICB9IGVsc2UgaWYgKGlzVXNlRXhpc3RpbmdQcm92aWRlcihtZXRhKSkge1xuICAgICAgICAgIC8vIFRoZSB1c2VyIGV4cGxpY2l0bHkgc3BlY2lmaWVkIHVzZUV4aXN0aW5nLlxuICAgICAgICAgIGNvbXBpbGVyTWV0YS51c2VFeGlzdGluZyA9IG1ldGEudXNlRXhpc3Rpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ2FuJ3QgaGFwcGVuIC0gZWl0aGVyIGhhc0FQcm92aWRlciB3aWxsIGJlIGZhbHNlLCBvciBvbmUgb2YgdGhlIHByb3ZpZGVycyB3aWxsIGJlIHNldC5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVucmVhY2hhYmxlIHN0YXRlLmApO1xuICAgICAgICB9XG4gICAgICAgIGRlZiA9IGdldENvbXBpbGVyRmFjYWRlKCkuY29tcGlsZUluamVjdGFibGUoXG4gICAgICAgICAgICBhbmd1bGFyQ29yZURpRW52LCBgbmc6Ly8vJHt0eXBlLm5hbWV9L25nSW5qZWN0YWJsZURlZi5qc2AsIGNvbXBpbGVyTWV0YSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmO1xuICAgIH0sXG4gIH0pO1xufVxuXG50eXBlIFVzZUNsYXNzUHJvdmlkZXIgPSBJbmplY3RhYmxlICYgQ2xhc3NTYW5zUHJvdmlkZXIgJiB7ZGVwcz86IGFueVtdfTtcblxuY29uc3QgVVNFX1ZBTFVFID1cbiAgICBnZXRDbG9zdXJlU2FmZVByb3BlcnR5PFZhbHVlUHJvdmlkZXI+KHtwcm92aWRlOiBTdHJpbmcsIHVzZVZhbHVlOiBnZXRDbG9zdXJlU2FmZVByb3BlcnR5fSk7XG5cbmZ1bmN0aW9uIGlzVXNlQ2xhc3NQcm92aWRlcihtZXRhOiBJbmplY3RhYmxlKTogbWV0YSBpcyBVc2VDbGFzc1Byb3ZpZGVyIHtcbiAgcmV0dXJuIChtZXRhIGFzIFVzZUNsYXNzUHJvdmlkZXIpLnVzZUNsYXNzICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzVXNlVmFsdWVQcm92aWRlcihtZXRhOiBJbmplY3RhYmxlKTogbWV0YSBpcyBJbmplY3RhYmxlJlZhbHVlU2Fuc1Byb3ZpZGVyIHtcbiAgcmV0dXJuIFVTRV9WQUxVRSBpbiBtZXRhO1xufVxuXG5mdW5jdGlvbiBpc1VzZUZhY3RvcnlQcm92aWRlcihtZXRhOiBJbmplY3RhYmxlKTogbWV0YSBpcyBJbmplY3RhYmxlJkZhY3RvcnlTYW5zUHJvdmlkZXIge1xuICByZXR1cm4gKG1ldGEgYXMgRmFjdG9yeVNhbnNQcm92aWRlcikudXNlRmFjdG9yeSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc1VzZUV4aXN0aW5nUHJvdmlkZXIobWV0YTogSW5qZWN0YWJsZSk6IG1ldGEgaXMgSW5qZWN0YWJsZSZFeGlzdGluZ1NhbnNQcm92aWRlciB7XG4gIHJldHVybiAobWV0YSBhcyBFeGlzdGluZ1NhbnNQcm92aWRlcikudXNlRXhpc3RpbmcgIT09IHVuZGVmaW5lZDtcbn1cbiJdfQ==