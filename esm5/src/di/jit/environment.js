/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isForwardRef, resolveForwardRef } from '../forward_ref';
import { ɵɵinject, ɵɵinvalidFactoryDep } from '../injector_compatibility';
import { getInjectableDef, getInjectorDef, ɵɵdefineInjectable, ɵɵdefineInjector } from '../interface/defs';
/**
 * A mapping of the @angular/core API surface used in generated expressions to the actual symbols.
 *
 * This should be kept up to date with the public exports of @angular/core.
 */
export var angularCoreDiEnv = {
    'ɵɵdefineInjectable': ɵɵdefineInjectable,
    'ɵɵdefineInjector': ɵɵdefineInjector,
    'ɵɵinject': ɵɵinject,
    'ɵɵgetFactoryOf': getFactoryOf,
    'ɵɵinvalidFactoryDep': ɵɵinvalidFactoryDep,
};
function getFactoryOf(type) {
    var typeAny = type;
    if (isForwardRef(type)) {
        return (function () {
            var factory = getFactoryOf(resolveForwardRef(typeAny));
            return factory ? factory() : null;
        });
    }
    var def = getInjectableDef(typeAny) || getInjectorDef(typeAny);
    if (!def || def.factory === undefined) {
        return null;
    }
    return def.factory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9qaXQvZW52aXJvbm1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFJekc7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxJQUFNLGdCQUFnQixHQUErQjtJQUMxRCxvQkFBb0IsRUFBRSxrQkFBa0I7SUFDeEMsa0JBQWtCLEVBQUUsZ0JBQWdCO0lBQ3BDLFVBQVUsRUFBRSxRQUFRO0lBQ3BCLGdCQUFnQixFQUFFLFlBQVk7SUFDOUIscUJBQXFCLEVBQUUsbUJBQW1CO0NBQzNDLENBQUM7QUFFRixTQUFTLFlBQVksQ0FBSSxJQUFlO0lBQ3RDLElBQU0sT0FBTyxHQUFHLElBQVcsQ0FBQztJQUU1QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QixPQUFPLENBQUM7WUFDTixJQUFNLE9BQU8sR0FBRyxZQUFZLENBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwQyxDQUFDLENBQVEsQ0FBQztLQUNYO0lBRUQsSUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUksT0FBTyxDQUFDLElBQUksY0FBYyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDckMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7aXNGb3J3YXJkUmVmLCByZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi4vZm9yd2FyZF9yZWYnO1xuaW1wb3J0IHvJtcm1aW5qZWN0LCDJtcm1aW52YWxpZEZhY3RvcnlEZXB9IGZyb20gJy4uL2luamVjdG9yX2NvbXBhdGliaWxpdHknO1xuaW1wb3J0IHtnZXRJbmplY3RhYmxlRGVmLCBnZXRJbmplY3RvckRlZiwgybXJtWRlZmluZUluamVjdGFibGUsIMm1ybVkZWZpbmVJbmplY3Rvcn0gZnJvbSAnLi4vaW50ZXJmYWNlL2RlZnMnO1xuXG5cblxuLyoqXG4gKiBBIG1hcHBpbmcgb2YgdGhlIEBhbmd1bGFyL2NvcmUgQVBJIHN1cmZhY2UgdXNlZCBpbiBnZW5lcmF0ZWQgZXhwcmVzc2lvbnMgdG8gdGhlIGFjdHVhbCBzeW1ib2xzLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIGtlcHQgdXAgdG8gZGF0ZSB3aXRoIHRoZSBwdWJsaWMgZXhwb3J0cyBvZiBAYW5ndWxhci9jb3JlLlxuICovXG5leHBvcnQgY29uc3QgYW5ndWxhckNvcmVEaUVudjoge1tuYW1lOiBzdHJpbmddOiBGdW5jdGlvbn0gPSB7XG4gICfJtcm1ZGVmaW5lSW5qZWN0YWJsZSc6IMm1ybVkZWZpbmVJbmplY3RhYmxlLFxuICAnybXJtWRlZmluZUluamVjdG9yJzogybXJtWRlZmluZUluamVjdG9yLFxuICAnybXJtWluamVjdCc6IMm1ybVpbmplY3QsXG4gICfJtcm1Z2V0RmFjdG9yeU9mJzogZ2V0RmFjdG9yeU9mLFxuICAnybXJtWludmFsaWRGYWN0b3J5RGVwJzogybXJtWludmFsaWRGYWN0b3J5RGVwLFxufTtcblxuZnVuY3Rpb24gZ2V0RmFjdG9yeU9mPFQ+KHR5cGU6IFR5cGU8YW55Pik6ICgodHlwZT86IFR5cGU8VD4pID0+IFQpfG51bGwge1xuICBjb25zdCB0eXBlQW55ID0gdHlwZSBhcyBhbnk7XG5cbiAgaWYgKGlzRm9yd2FyZFJlZih0eXBlKSkge1xuICAgIHJldHVybiAoKCkgPT4ge1xuICAgICAgY29uc3QgZmFjdG9yeSA9IGdldEZhY3RvcnlPZjxUPihyZXNvbHZlRm9yd2FyZFJlZih0eXBlQW55KSk7XG4gICAgICByZXR1cm4gZmFjdG9yeSA/IGZhY3RvcnkoKSA6IG51bGw7XG4gICAgfSkgYXMgYW55O1xuICB9XG5cbiAgY29uc3QgZGVmID0gZ2V0SW5qZWN0YWJsZURlZjxUPih0eXBlQW55KSB8fCBnZXRJbmplY3RvckRlZjxUPih0eXBlQW55KTtcbiAgaWYgKCFkZWYgfHwgZGVmLmZhY3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBkZWYuZmFjdG9yeTtcbn1cbiJdfQ==