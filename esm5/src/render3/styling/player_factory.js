/**
 * Combines the binding value and a factory for an animation player.
 *
 * Used to bind a player to an element template binding (currently only
 * `[style]`, `[style.prop]`, `[class]` and `[class.name]` bindings
 * supported). The provided `factoryFn` function will be run once all
 * the associated bindings have been evaluated on the element and is
 * designed to return a player which will then be placed on the element.
 *
 * @param factoryFn The function that is used to create a player
 *   once all the rendering-related (styling values) have been
 *   processed for the element binding.
 * @param value The raw value that will be exposed to the binding
 *   so that the binding can update its internal values when
 *   any changes are evaluated.
 */
export function bindPlayerFactory(factoryFn, value) {
    return new BoundPlayerFactory(factoryFn, value);
}
var BoundPlayerFactory = /** @class */ (function () {
    function BoundPlayerFactory(fn, value) {
        this.fn = fn;
        this.value = value;
    }
    return BoundPlayerFactory;
}());
export { BoundPlayerFactory };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3N0eWxpbmcvcGxheWVyX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0E7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFJLFNBQStCLEVBQUUsS0FBUTtJQUM1RSxPQUFPLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBUSxDQUFDO0FBQ3pELENBQUM7QUFFRDtJQUVFLDRCQUFtQixFQUF3QixFQUFTLEtBQVE7UUFBekMsT0FBRSxHQUFGLEVBQUUsQ0FBc0I7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFHO0lBQUcsQ0FBQztJQUNsRSx5QkFBQztBQUFELENBQUMsQUFIRCxJQUdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtQbGF5ZXJGYWN0b3J5LCBQbGF5ZXJGYWN0b3J5QnVpbGRGbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wbGF5ZXInO1xuXG4vKipcbiAqIENvbWJpbmVzIHRoZSBiaW5kaW5nIHZhbHVlIGFuZCBhIGZhY3RvcnkgZm9yIGFuIGFuaW1hdGlvbiBwbGF5ZXIuXG4gKlxuICogVXNlZCB0byBiaW5kIGEgcGxheWVyIHRvIGFuIGVsZW1lbnQgdGVtcGxhdGUgYmluZGluZyAoY3VycmVudGx5IG9ubHlcbiAqIGBbc3R5bGVdYCwgYFtzdHlsZS5wcm9wXWAsIGBbY2xhc3NdYCBhbmQgYFtjbGFzcy5uYW1lXWAgYmluZGluZ3NcbiAqIHN1cHBvcnRlZCkuIFRoZSBwcm92aWRlZCBgZmFjdG9yeUZuYCBmdW5jdGlvbiB3aWxsIGJlIHJ1biBvbmNlIGFsbFxuICogdGhlIGFzc29jaWF0ZWQgYmluZGluZ3MgaGF2ZSBiZWVuIGV2YWx1YXRlZCBvbiB0aGUgZWxlbWVudCBhbmQgaXNcbiAqIGRlc2lnbmVkIHRvIHJldHVybiBhIHBsYXllciB3aGljaCB3aWxsIHRoZW4gYmUgcGxhY2VkIG9uIHRoZSBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSBmYWN0b3J5Rm4gVGhlIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBjcmVhdGUgYSBwbGF5ZXJcbiAqICAgb25jZSBhbGwgdGhlIHJlbmRlcmluZy1yZWxhdGVkIChzdHlsaW5nIHZhbHVlcykgaGF2ZSBiZWVuXG4gKiAgIHByb2Nlc3NlZCBmb3IgdGhlIGVsZW1lbnQgYmluZGluZy5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgcmF3IHZhbHVlIHRoYXQgd2lsbCBiZSBleHBvc2VkIHRvIHRoZSBiaW5kaW5nXG4gKiAgIHNvIHRoYXQgdGhlIGJpbmRpbmcgY2FuIHVwZGF0ZSBpdHMgaW50ZXJuYWwgdmFsdWVzIHdoZW5cbiAqICAgYW55IGNoYW5nZXMgYXJlIGV2YWx1YXRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRQbGF5ZXJGYWN0b3J5PFQ+KGZhY3RvcnlGbjogUGxheWVyRmFjdG9yeUJ1aWxkRm4sIHZhbHVlOiBUKTogUGxheWVyRmFjdG9yeSB7XG4gIHJldHVybiBuZXcgQm91bmRQbGF5ZXJGYWN0b3J5KGZhY3RvcnlGbiwgdmFsdWUpIGFzIGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIEJvdW5kUGxheWVyRmFjdG9yeTxUPiB7XG4gICdfX2JyYW5kX18nOiAnQnJhbmQgZm9yIFBsYXllckZhY3RvcnkgdGhhdCBub3RoaW5nIHdpbGwgbWF0Y2gnO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZm46IFBsYXllckZhY3RvcnlCdWlsZEZuLCBwdWJsaWMgdmFsdWU6IFQpIHt9XG59XG4iXX0=