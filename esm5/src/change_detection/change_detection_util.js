/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { looseIdentical } from '../util/comparison';
import { getSymbolIterator } from '../util/symbol';
export function devModeEqual(a, b) {
    var isListLikeIterableA = isListLikeIterable(a);
    var isListLikeIterableB = isListLikeIterable(b);
    if (isListLikeIterableA && isListLikeIterableB) {
        return areIterablesEqual(a, b, devModeEqual);
    }
    else {
        var isAObject = a && (typeof a === 'object' || typeof a === 'function');
        var isBObject = b && (typeof b === 'object' || typeof b === 'function');
        if (!isListLikeIterableA && isAObject && !isListLikeIterableB && isBObject) {
            return true;
        }
        else {
            return looseIdentical(a, b);
        }
    }
}
/**
 * Indicates that the result of a {@link Pipe} transformation has changed even though the
 * reference has not changed.
 *
 * Wrapped values are unwrapped automatically during the change detection, and the unwrapped value
 * is stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 *
 * @publicApi
 * @deprecated from v10 stop using. (No replacement, deemed unnecessary.)
 */
var WrappedValue = /** @class */ (function () {
    function WrappedValue(value) {
        this.wrapped = value;
    }
    /** Creates a wrapped value. */
    WrappedValue.wrap = function (value) {
        return new WrappedValue(value);
    };
    /**
     * Returns the underlying value of a wrapped value.
     * Returns the given `value` when it is not wrapped.
     **/
    WrappedValue.unwrap = function (value) {
        return WrappedValue.isWrapped(value) ? value.wrapped : value;
    };
    /** Returns true if `value` is a wrapped value. */
    WrappedValue.isWrapped = function (value) {
        return value instanceof WrappedValue;
    };
    return WrappedValue;
}());
export { WrappedValue };
export function isListLikeIterable(obj) {
    if (!isJsObject(obj))
        return false;
    return Array.isArray(obj) ||
        (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
            getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
}
export function areIterablesEqual(a, b, comparator) {
    var iterator1 = a[getSymbolIterator()]();
    var iterator2 = b[getSymbolIterator()]();
    while (true) {
        var item1 = iterator1.next();
        var item2 = iterator2.next();
        if (item1.done && item2.done)
            return true;
        if (item1.done || item2.done)
            return false;
        if (!comparator(item1.value, item2.value))
            return false;
    }
}
export function iterateListLike(obj, fn) {
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            fn(obj[i]);
        }
    }
    else {
        var iterator = obj[getSymbolIterator()]();
        var item = void 0;
        while (!((item = iterator.next()).done)) {
            fn(item.value);
        }
    }
}
export function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE1BQU0sVUFBVSxZQUFZLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDekMsSUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxJQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELElBQUksbUJBQW1CLElBQUksbUJBQW1CLEVBQUU7UUFDOUMsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQzlDO1NBQU07UUFDTCxJQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUM7UUFDMUUsSUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxTQUFTLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxTQUFTLEVBQUU7WUFDMUUsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdCO0tBQ0Y7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7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biAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7bG9vc2VJZGVudGljYWx9IGZyb20gJy4uL3V0aWwvY29tcGFyaXNvbic7XG5pbXBvcnQge2dldFN5bWJvbEl0ZXJhdG9yfSBmcm9tICcuLi91dGlsL3N5bWJvbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXZNb2RlRXF1YWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgY29uc3QgaXNMaXN0TGlrZUl0ZXJhYmxlQSA9IGlzTGlzdExpa2VJdGVyYWJsZShhKTtcbiAgY29uc3QgaXNMaXN0TGlrZUl0ZXJhYmxlQiA9IGlzTGlzdExpa2VJdGVyYWJsZShiKTtcbiAgaWYgKGlzTGlzdExpa2VJdGVyYWJsZUEgJiYgaXNMaXN0TGlrZUl0ZXJhYmxlQikge1xuICAgIHJldHVybiBhcmVJdGVyYWJsZXNFcXVhbChhLCBiLCBkZXZNb2RlRXF1YWwpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGlzQU9iamVjdCA9IGEgJiYgKHR5cGVvZiBhID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgY29uc3QgaXNCT2JqZWN0ID0gYiAmJiAodHlwZW9mIGIgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBiID09PSAnZnVuY3Rpb24nKTtcbiAgICBpZiAoIWlzTGlzdExpa2VJdGVyYWJsZUEgJiYgaXNBT2JqZWN0ICYmICFpc0xpc3RMaWtlSXRlcmFibGVCICYmIGlzQk9iamVjdCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBsb29zZUlkZW50aWNhbChhLCBiKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcmVzdWx0IG9mIGEge0BsaW5rIFBpcGV9IHRyYW5zZm9ybWF0aW9uIGhhcyBjaGFuZ2VkIGV2ZW4gdGhvdWdoIHRoZVxuICogcmVmZXJlbmNlIGhhcyBub3QgY2hhbmdlZC5cbiAqXG4gKiBXcmFwcGVkIHZhbHVlcyBhcmUgdW53cmFwcGVkIGF1dG9tYXRpY2FsbHkgZHVyaW5nIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uLCBhbmQgdGhlIHVud3JhcHBlZCB2YWx1ZVxuICogaXMgc3RvcmVkLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBpZiAodGhpcy5fbGF0ZXN0VmFsdWUgPT09IHRoaXMuX2xhdGVzdFJldHVybmVkVmFsdWUpIHtcbiAqICAgIHJldHVybiB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlO1xuICogIH0gZWxzZSB7XG4gKiAgICB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlID0gdGhpcy5fbGF0ZXN0VmFsdWU7XG4gKiAgICByZXR1cm4gV3JhcHBlZFZhbHVlLndyYXAodGhpcy5fbGF0ZXN0VmFsdWUpOyAvLyB0aGlzIHdpbGwgZm9yY2UgdXBkYXRlXG4gKiAgfVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICogQGRlcHJlY2F0ZWQgZnJvbSB2MTAgc3RvcCB1c2luZy4gKE5vIHJlcGxhY2VtZW50LCBkZWVtZWQgdW5uZWNlc3NhcnkuKVxuICovXG5leHBvcnQgY2xhc3MgV3JhcHBlZFZhbHVlIHtcbiAgLyoqIEBkZXByZWNhdGVkIGZyb20gNS4zLCB1c2UgYHVud3JhcCgpYCBpbnN0ZWFkIC0gd2lsbCBzd2l0Y2ggdG8gcHJvdGVjdGVkICovXG4gIHdyYXBwZWQ6IGFueTtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZTogYW55KSB7XG4gICAgdGhpcy53cmFwcGVkID0gdmFsdWU7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIHdyYXBwZWQgdmFsdWUuICovXG4gIHN0YXRpYyB3cmFwKHZhbHVlOiBhbnkpOiBXcmFwcGVkVmFsdWUge1xuICAgIHJldHVybiBuZXcgV3JhcHBlZFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIHZhbHVlIG9mIGEgd3JhcHBlZCB2YWx1ZS5cbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gYHZhbHVlYCB3aGVuIGl0IGlzIG5vdCB3cmFwcGVkLlxuICAgKiovXG4gIHN0YXRpYyB1bndyYXAodmFsdWU6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS5pc1dyYXBwZWQodmFsdWUpID8gdmFsdWUud3JhcHBlZCA6IHZhbHVlO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgd3JhcHBlZCB2YWx1ZS4gKi9cbiAgc3RhdGljIGlzV3JhcHBlZCh2YWx1ZTogYW55KTogdmFsdWUgaXMgV3JhcHBlZFZhbHVlIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBXcmFwcGVkVmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoIWlzSnNPYmplY3Qob2JqKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopIHx8XG4gICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlSXRlcmFibGVzRXF1YWwoXG4gICAgYTogYW55LCBiOiBhbnksIGNvbXBhcmF0b3I6IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBpdGVyYXRvcjEgPSBhW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gIGNvbnN0IGl0ZXJhdG9yMiA9IGJbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGl0ZW0xID0gaXRlcmF0b3IxLm5leHQoKTtcbiAgICBjb25zdCBpdGVtMiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgaWYgKGl0ZW0xLmRvbmUgJiYgaXRlbTIuZG9uZSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGl0ZW0xLmRvbmUgfHwgaXRlbTIuZG9uZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29tcGFyYXRvcihpdGVtMS52YWx1ZSwgaXRlbTIudmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGVMaXN0TGlrZShvYmo6IGFueSwgZm46IChwOiBhbnkpID0+IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZuKG9ialtpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGl0ZXJhdG9yID0gb2JqW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgbGV0IGl0ZW06IGFueTtcbiAgICB3aGlsZSAoISgoaXRlbSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgIGZuKGl0ZW0udmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvID09PSAnb2JqZWN0Jyk7XG59XG4iXX0=