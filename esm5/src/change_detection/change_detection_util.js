/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getSymbolIterator, looseIdentical } from '../util';
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
 */
var WrappedValue = /** @class */ (function () {
    function WrappedValue(value) {
        this.wrapped = value;
    }
    /** Creates a wrapped value. */
    WrappedValue.wrap = function (value) { return new WrappedValue(value); };
    /**
     * Returns the underlying value of a wrapped value.
     * Returns the given `value` when it is not wrapped.
     **/
    WrappedValue.unwrap = function (value) { return WrappedValue.isWrapped(value) ? value.wrapped : value; };
    /** Returns true if `value` is a wrapped value. */
    WrappedValue.isWrapped = function (value) { return value instanceof WrappedValue; };
    return WrappedValue;
}());
export { WrappedValue };
/**
 * Represents a basic change from a previous to a new value.
 *
 */
var SimpleChange = /** @class */ (function () {
    function SimpleChange(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.firstChange = firstChange;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.firstChange; };
    return SimpleChange;
}());
export { SimpleChange };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUUxRCxNQUFNLFVBQVUsWUFBWSxDQUFDLENBQU0sRUFBRSxDQUFNO0lBQ3pDLElBQU0sbUJBQW1CLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsSUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixFQUFFO1FBQzlDLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUM5QztTQUFNO1FBQ0wsSUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO1FBQzFFLElBQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsbUJBQW1CLElBQUksU0FBUyxJQUFJLENBQUMsbUJBQW1CLElBQUksU0FBUyxFQUFFO1lBQzFFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3QjtLQUNGO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSDtJQUlFLHNCQUFZLEtBQVU7UUFBSSxJ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RSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQjtLQUNGO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsQ0FBTTtJQUMvQixPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUM7QUFDMUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnZXRTeW1ib2xJdGVyYXRvciwgbG9vc2VJZGVudGljYWx9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGV2TW9kZUVxdWFsKGE6IGFueSwgYjogYW55KTogYm9vbGVhbiB7XG4gIGNvbnN0IGlzTGlzdExpa2VJdGVyYWJsZUEgPSBpc0xpc3RMaWtlSXRlcmFibGUoYSk7XG4gIGNvbnN0IGlzTGlzdExpa2VJdGVyYWJsZUIgPSBpc0xpc3RMaWtlSXRlcmFibGUoYik7XG4gIGlmIChpc0xpc3RMaWtlSXRlcmFibGVBICYmIGlzTGlzdExpa2VJdGVyYWJsZUIpIHtcbiAgICByZXR1cm4gYXJlSXRlcmFibGVzRXF1YWwoYSwgYiwgZGV2TW9kZUVxdWFsKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpc0FPYmplY3QgPSBhICYmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xuICAgIGNvbnN0IGlzQk9iamVjdCA9IGIgJiYgKHR5cGVvZiBiID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgYiA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgaWYgKCFpc0xpc3RMaWtlSXRlcmFibGVBICYmIGlzQU9iamVjdCAmJiAhaXNMaXN0TGlrZUl0ZXJhYmxlQiAmJiBpc0JPYmplY3QpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9vc2VJZGVudGljYWwoYSwgYik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHJlc3VsdCBvZiBhIHtAbGluayBQaXBlfSB0cmFuc2Zvcm1hdGlvbiBoYXMgY2hhbmdlZCBldmVuIHRob3VnaCB0aGVcbiAqIHJlZmVyZW5jZSBoYXMgbm90IGNoYW5nZWQuXG4gKlxuICogV3JhcHBlZCB2YWx1ZXMgYXJlIHVud3JhcHBlZCBhdXRvbWF0aWNhbGx5IGR1cmluZyB0aGUgY2hhbmdlIGRldGVjdGlvbiwgYW5kIHRoZSB1bndyYXBwZWQgdmFsdWVcbiAqIGlzIHN0b3JlZC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gKiAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAqICB9IGVsc2Uge1xuICogICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICogICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTsgLy8gdGhpcyB3aWxsIGZvcmNlIHVwZGF0ZVxuICogIH1cbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFdyYXBwZWRWYWx1ZSB7XG4gIC8qKiBAZGVwcmVjYXRlZCBmcm9tIDUuMywgdXNlIGB1bndyYXAoKWAgaW5zdGVhZCAtIHdpbGwgc3dpdGNoIHRvIHByb3RlY3RlZCAqL1xuICB3cmFwcGVkOiBhbnk7XG5cbiAgY29uc3RydWN0b3IodmFsdWU6IGFueSkgeyB0aGlzLndyYXBwZWQgPSB2YWx1ZTsgfVxuXG4gIC8qKiBDcmVhdGVzIGEgd3JhcHBlZCB2YWx1ZS4gKi9cbiAgc3RhdGljIHdyYXAodmFsdWU6IGFueSk6IFdyYXBwZWRWYWx1ZSB7IHJldHVybiBuZXcgV3JhcHBlZFZhbHVlKHZhbHVlKTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB1bmRlcmx5aW5nIHZhbHVlIG9mIGEgd3JhcHBlZCB2YWx1ZS5cbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gYHZhbHVlYCB3aGVuIGl0IGlzIG5vdCB3cmFwcGVkLlxuICAgKiovXG4gIHN0YXRpYyB1bndyYXAodmFsdWU6IGFueSk6IGFueSB7IHJldHVybiBXcmFwcGVkVmFsdWUuaXNXcmFwcGVkKHZhbHVlKSA/IHZhbHVlLndyYXBwZWQgOiB2YWx1ZTsgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyBhIHdyYXBwZWQgdmFsdWUuICovXG4gIHN0YXRpYyBpc1dyYXBwZWQodmFsdWU6IGFueSk6IHZhbHVlIGlzIFdyYXBwZWRWYWx1ZSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFdyYXBwZWRWYWx1ZTsgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYXNpYyBjaGFuZ2UgZnJvbSBhIHByZXZpb3VzIHRvIGEgbmV3IHZhbHVlLlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIFNpbXBsZUNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcmV2aW91c1ZhbHVlOiBhbnksIHB1YmxpYyBjdXJyZW50VmFsdWU6IGFueSwgcHVibGljIGZpcnN0Q2hhbmdlOiBib29sZWFuKSB7fVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBuZXcgdmFsdWUgaXMgdGhlIGZpcnN0IHZhbHVlIGFzc2lnbmVkLlxuICAgKi9cbiAgaXNGaXJzdENoYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZmlyc3RDaGFuZ2U7IH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlzdExpa2VJdGVyYWJsZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoIWlzSnNPYmplY3Qob2JqKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopIHx8XG4gICAgICAoIShvYmogaW5zdGFuY2VvZiBNYXApICYmICAgICAgLy8gSlMgTWFwIGFyZSBpdGVyYWJsZXMgYnV0IHJldHVybiBlbnRyaWVzIGFzIFtrLCB2XVxuICAgICAgIGdldFN5bWJvbEl0ZXJhdG9yKCkgaW4gb2JqKTsgIC8vIEpTIEl0ZXJhYmxlIGhhdmUgYSBTeW1ib2wuaXRlcmF0b3IgcHJvcFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJlSXRlcmFibGVzRXF1YWwoXG4gICAgYTogYW55LCBiOiBhbnksIGNvbXBhcmF0b3I6IChhOiBhbnksIGI6IGFueSkgPT4gYm9vbGVhbik6IGJvb2xlYW4ge1xuICBjb25zdCBpdGVyYXRvcjEgPSBhW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gIGNvbnN0IGl0ZXJhdG9yMiA9IGJbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGl0ZW0xID0gaXRlcmF0b3IxLm5leHQoKTtcbiAgICBjb25zdCBpdGVtMiA9IGl0ZXJhdG9yMi5uZXh0KCk7XG4gICAgaWYgKGl0ZW0xLmRvbmUgJiYgaXRlbTIuZG9uZSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGl0ZW0xLmRvbmUgfHwgaXRlbTIuZG9uZSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY29tcGFyYXRvcihpdGVtMS52YWx1ZSwgaXRlbTIudmFsdWUpKSByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGl0ZXJhdGVMaXN0TGlrZShvYmo6IGFueSwgZm46IChwOiBhbnkpID0+IGFueSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZuKG9ialtpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGl0ZXJhdG9yID0gb2JqW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7XG4gICAgbGV0IGl0ZW06IGFueTtcbiAgICB3aGlsZSAoISgoaXRlbSA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkpIHtcbiAgICAgIGZuKGl0ZW0udmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNKc09iamVjdChvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG8gIT09IG51bGwgJiYgKHR5cGVvZiBvID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvID09PSAnb2JqZWN0Jyk7XG59XG4iXX0=