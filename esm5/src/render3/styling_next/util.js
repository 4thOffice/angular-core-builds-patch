var MAP_BASED_ENTRY_PROP_NAME = '--MAP--';
var TEMPLATE_DIRECTIVE_INDEX = 0;
/**
 * Creates a new instance of the `TStylingContext`.
 *
 * The `TStylingContext` is used as a manifest of all style or all class bindings on
 * an element. Because it is a T-level data-structure, it is only created once per
 * tNode for styles and for classes. This function allocates a new instance of a
 * `TStylingContext` with the initial values (see `interfaces.ts` for more info).
 */
export function allocTStylingContext(initialStyling) {
    // because map-based bindings deal with a dynamic set of values, there
    // is no way to know ahead of time whether or not sanitization is required.
    // For this reason the configuration will always mark sanitization as active
    // (this means that when map-based values are applied then sanitization will
    // be checked against each property).
    var mapBasedConfig = 1 /* SanitizationRequired */;
    return [
        initialStyling || [''],
        0 /* Initial */,
        TEMPLATE_DIRECTIVE_INDEX,
        mapBasedConfig,
        0,
        MAP_BASED_ENTRY_PROP_NAME,
    ];
}
/**
 * Sets the provided directive as the last directive index in the provided `TStylingContext`.
 *
 * Styling in Angular can be applied from the template as well as multiple sources of
 * host bindings. This means that each binding function (the template function or the
 * hostBindings functions) will generate styling instructions as well as a styling
 * apply function (i.e. `stylingApply()`). Because host bindings functions and the
 * template function are independent from one another this means that the styling apply
 * function will be called multiple times. By tracking the last directive index (which
 * is what happens in this function) the styling algorithm knows exactly when to flush
 * styling (which is when the last styling apply function is executed).
 */
export function updateLastDirectiveIndex(context, lastDirectiveIndex) {
    if (lastDirectiveIndex === TEMPLATE_DIRECTIVE_INDEX) {
        var currentValue = context[2 /* LastDirectiveIndexPosition */];
        if (currentValue > TEMPLATE_DIRECTIVE_INDEX) {
            // This means that a directive or two contained a host bindings function, but
            // now the template function also contains styling. When this combination of sources
            // comes up then we need to tell the context to store the state between updates
            // (because host bindings evaluation happens after template binding evaluation).
            markContextToPersistState(context);
        }
    }
    else {
        context[2 /* LastDirectiveIndexPosition */] = lastDirectiveIndex;
    }
}
function getConfig(context) {
    return context[1 /* ConfigPosition */];
}
export function setConfig(context, value) {
    context[1 /* ConfigPosition */] = value;
}
export function getProp(context, index) {
    return context[index + 2 /* PropOffset */];
}
function getPropConfig(context, index) {
    return context[index + 0 /* ConfigAndGuardOffset */] &
        1 /* Mask */;
}
export function isSanitizationRequired(context, index) {
    return (getPropConfig(context, index) & 1 /* SanitizationRequired */) > 0;
}
export function getGuardMask(context, index) {
    var configGuardValue = context[index + 0 /* ConfigAndGuardOffset */];
    return configGuardValue >> 1 /* TotalBits */;
}
export function setGuardMask(context, index, maskValue) {
    var config = getPropConfig(context, index);
    var guardMask = maskValue << 1 /* TotalBits */;
    context[index + 0 /* ConfigAndGuardOffset */] = config | guardMask;
}
export function getValuesCount(context, index) {
    return context[index + 1 /* ValuesCountOffset */];
}
export function getBindingValue(context, index, offset) {
    return context[index + 3 /* BindingsStartOffset */ + offset];
}
export function getDefaultValue(context, index) {
    var valuesCount = getValuesCount(context, index);
    return context[index + 3 /* BindingsStartOffset */ + valuesCount - 1];
}
/**
 * Temporary function which determines whether or not a context is
 * allowed to be flushed based on the provided directive index.
 */
export function allowStylingFlush(context, index) {
    return (context && index === context[2 /* LastDirectiveIndexPosition */]) ? true :
        false;
}
export function lockContext(context) {
    setConfig(context, getConfig(context) | 1 /* Locked */);
}
export function isContextLocked(context) {
    return (getConfig(context) & 1 /* Locked */) > 0;
}
export function stateIsPersisted(context) {
    return (getConfig(context) & 2 /* PersistStateValues */) > 0;
}
export function markContextToPersistState(context) {
    setConfig(context, getConfig(context) | 2 /* PersistStateValues */);
}
export function getPropValuesStartPosition(context) {
    return 6 /* MapBindingsBindingsStartPosition */ +
        context[4 /* MapBindingsValuesCountPosition */];
}
export function isMapBased(prop) {
    return prop === MAP_BASED_ENTRY_PROP_NAME;
}
export function hasValueChanged(a, b) {
    var compareValueA = Array.isArray(a) ? a[0 /* RawValuePosition */] : a;
    var compareValueB = Array.isArray(b) ? b[0 /* RawValuePosition */] : b;
    // these are special cases for String based values (which are created as artifacts
    // when sanitization is bypassed on a particular value)
    if (compareValueA instanceof String) {
        compareValueA = compareValueA.toString();
    }
    if (compareValueB instanceof String) {
        compareValueB = compareValueB.toString();
    }
    return !Object.is(compareValueA, compareValueB);
}
/**
 * Determines whether the provided styling value is truthy or falsy.
 */
export function isStylingValueDefined(value) {
    // the reason why null is compared against is because
    // a CSS class value that is set to `false` must be
    // respected (otherwise it would be treated as falsy).
    // Empty string values are because developers usually
    // set a value to an empty string to remove it.
    return value != null && value !== '';
}
export function concatString(a, b, separator) {
    if (separator === void 0) { separator = ' '; }
    return a + ((b.length && a.length) ? separator : '') + b;
}
export function hyphenate(value) {
    return value.replace(/[a-z][A-Z]/g, function (v) { return v.charAt(0) + '-' + v.charAt(1); }).toLowerCase();
}
/**
 * Returns an instance of `StylingMapArray`.
 *
 * This function is designed to find an instance of `StylingMapArray` in case it is stored
 * inside of an instance of `TStylingContext`. When a styling context is created it
 * will copy over an initial styling values from the tNode (which are stored as a
 * `StylingMapArray` on the `tNode.classes` or `tNode.styles` values).
 */
export function getStylingMapArray(value) {
    return isStylingContext(value) ?
        value[0 /* InitialStylingValuePosition */] :
        value;
}
export function isStylingContext(value) {
    // the StylingMapArray is in the format of [initial, prop, string, prop, string]
    // and this is the defining value to distinguish between arrays
    return Array.isArray(value) &&
        value.length >= 6 /* MapBindingsBindingsStartPosition */ &&
        typeof value[1] !== 'string';
}
export function getInitialStylingValue(context) {
    var map = getStylingMapArray(context);
    return map && map[0 /* RawValuePosition */] || '';
}
export function hasClassInput(tNode) {
    return (tNode.flags & 8 /* hasClassInput */) !== 0;
}
export function hasStyleInput(tNode) {
    return (tNode.flags & 16 /* hasStyleInput */) !== 0;
}
export function getMapProp(map, index) {
    return map[index + 0 /* PropOffset */];
}
export function setMapValue(map, index, value) {
    map[index + 1 /* ValueOffset */] = value;
}
export function getMapValue(map, index) {
    return map[index + 1 /* ValueOffset */];
}
export function forceClassesAsString(classes) {
    if (classes && typeof classes !== 'string') {
        classes = Object.keys(classes).join(' ');
    }
    return classes || '';
}
export function forceStylesAsString(styles) {
    var str = '';
    if (styles) {
        var props = Object.keys(styles);
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            str = concatString(str, prop + ":" + styles[prop], ';');
        }
    }
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvc3R5bGluZ19uZXh0L3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBV0EsSUFBTSx5QkFBeUIsR0FBRyxTQUFTLENBQUM7QUFDNUMsSUFBTSx3QkFBd0IsR0FBRyxDQUFDLENBQUM7QUFFbkM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxjQUF1QztJQUMxRSxzRUFBc0U7SUFDdEUsMkVBQTJFO0lBQzNFLDRFQUE0RTtJQUM1RSw0RUFBNEU7SUFDNUUscUNBQXFDO0lBQ3JDLElBQU0sY0FBYywrQkFBc0QsQ0FBQztJQUMzRSxPQUFPO1FBQ0wsY0FBYyxJQUFJLENBQUMsRUFBRSxDQUFDOztRQUV0Qix3QkFBd0I7UUFDeEIsY0FBYztRQUNkLENBQUM7UUFDRCx5QkFBeUI7S0FDMUIsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FDcEMsT0FBd0IsRUFBRSxrQkFBMEI7SUFDdEQsSUFBSSxrQkFBa0IsS0FBSyx3QkFBd0IsRUFBRTtRQUNuRCxJQUFNLFlBQVksR0FBRyxPQUFPLG9DQUFpRCxDQUFDO1FBQzlFLElBQUksWUFBWSxHQUFHLHdCQUF3QixFQUFFO1lBQzNDLDZFQUE2RTtZQUM3RSxvRkFBb0Y7WUFDcEYsK0VBQStFO1lBQy9FLGdGQUFnRjtZQUNoRix5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztLQUNGO1NBQU07UUFDTCxPQUFPLG9DQUFpRCxHQUFHLGtCQUFrQixDQUFDO0tBQy9FO0FBQ0gsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLE9BQXdCO0lBQ3pDLE9BQU8sT0FBTyx3QkFBcUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxPQUF3QixF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QUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBAbGljZW5zZVxuKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbipcbiogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuKi9cbmltcG9ydCB7VE5vZGUsIFROb2RlRmxhZ3N9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5cbmltcG9ydCB7U3R5bGluZ01hcEFycmF5LCBTdHlsaW5nTWFwQXJyYXlJbmRleCwgVFN0eWxpbmdDb25maWdGbGFncywgVFN0eWxpbmdDb250ZXh0LCBUU3R5bGluZ0NvbnRleHRJbmRleCwgVFN0eWxpbmdDb250ZXh0UHJvcENvbmZpZ0ZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5jb25zdCBNQVBfQkFTRURfRU5UUllfUFJPUF9OQU1FID0gJy0tTUFQLS0nO1xuY29uc3QgVEVNUExBVEVfRElSRUNUSVZFX0lOREVYID0gMDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBgVFN0eWxpbmdDb250ZXh0YC5cbiAqXG4gKiBUaGUgYFRTdHlsaW5nQ29udGV4dGAgaXMgdXNlZCBhcyBhIG1hbmlmZXN0IG9mIGFsbCBzdHlsZSBvciBhbGwgY2xhc3MgYmluZGluZ3Mgb25cbiAqIGFuIGVsZW1lbnQuIEJlY2F1c2UgaXQgaXMgYSBULWxldmVsIGRhdGEtc3RydWN0dXJlLCBpdCBpcyBvbmx5IGNyZWF0ZWQgb25jZSBwZXJcbiAqIHROb2RlIGZvciBzdHlsZXMgYW5kIGZvciBjbGFzc2VzLiBUaGlzIGZ1bmN0aW9uIGFsbG9jYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBhXG4gKiBgVFN0eWxpbmdDb250ZXh0YCB3aXRoIHRoZSBpbml0aWFsIHZhbHVlcyAoc2VlIGBpbnRlcmZhY2VzLnRzYCBmb3IgbW9yZSBpbmZvKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFsbG9jVFN0eWxpbmdDb250ZXh0KGluaXRpYWxTdHlsaW5nPzogU3R5bGluZ01hcEFycmF5IHwgbnVsbCk6IFRTdHlsaW5nQ29udGV4dCB7XG4gIC8vIGJlY2F1c2UgbWFwLWJhc2VkIGJpbmRpbmdzIGRlYWwgd2l0aCBhIGR5bmFtaWMgc2V0IG9mIHZhbHVlcywgdGhlcmVcbiAgLy8gaXMgbm8gd2F5IHRvIGtub3cgYWhlYWQgb2YgdGltZSB3aGV0aGVyIG9yIG5vdCBzYW5pdGl6YXRpb24gaXMgcmVxdWlyZWQuXG4gIC8vIEZvciB0aGlzIHJlYXNvbiB0aGUgY29uZmlndXJhdGlvbiB3aWxsIGFsd2F5cyBtYXJrIHNhbml0aXphdGlvbiBhcyBhY3RpdmVcbiAgLy8gKHRoaXMgbWVhbnMgdGhhdCB3aGVuIG1hcC1iYXNlZCB2YWx1ZXMgYXJlIGFwcGxpZWQgdGhlbiBzYW5pdGl6YXRpb24gd2lsbFxuICAvLyBiZSBjaGVja2VkIGFnYWluc3QgZWFjaCBwcm9wZXJ0eSkuXG4gIGNvbnN0IG1hcEJhc2VkQ29uZmlnID0gVFN0eWxpbmdDb250ZXh0UHJvcENvbmZpZ0ZsYWdzLlNhbml0aXphdGlvblJlcXVpcmVkO1xuICByZXR1cm4gW1xuICAgIGluaXRpYWxTdHlsaW5nIHx8IFsnJ10sICAvLyBlbXB0eSBpbml0aWFsLXN0eWxpbmcgbWFwIHZhbHVlXG4gICAgVFN0eWxpbmdDb25maWdGbGFncy5Jbml0aWFsLFxuICAgIFRFTVBMQVRFX0RJUkVDVElWRV9JTkRFWCxcbiAgICBtYXBCYXNlZENvbmZpZyxcbiAgICAwLFxuICAgIE1BUF9CQVNFRF9FTlRSWV9QUk9QX05BTUUsXG4gIF07XG59XG5cbi8qKlxuICogU2V0cyB0aGUgcHJvdmlkZWQgZGlyZWN0aXZlIGFzIHRoZSBsYXN0IGRpcmVjdGl2ZSBpbmRleCBpbiB0aGUgcHJvdmlkZWQgYFRTdHlsaW5nQ29udGV4dGAuXG4gKlxuICogU3R5bGluZyBpbiBBbmd1bGFyIGNhbiBiZSBhcHBsaWVkIGZyb20gdGhlIHRlbXBsYXRlIGFzIHdlbGwgYXMgbXVsdGlwbGUgc291cmNlcyBvZlxuICogaG9zdCBiaW5kaW5ncy4gVGhpcyBtZWFucyB0aGF0IGVhY2ggYmluZGluZyBmdW5jdGlvbiAodGhlIHRlbXBsYXRlIGZ1bmN0aW9uIG9yIHRoZVxuICogaG9zdEJpbmRpbmdzIGZ1bmN0aW9ucykgd2lsbCBnZW5lcmF0ZSBzdHlsaW5nIGluc3RydWN0aW9ucyBhcyB3ZWxsIGFzIGEgc3R5bGluZ1xuICogYXBwbHkgZnVuY3Rpb24gKGkuZS4gYHN0eWxpbmdBcHBseSgpYCkuIEJlY2F1c2UgaG9zdCBiaW5kaW5ncyBmdW5jdGlvbnMgYW5kIHRoZVxuICogdGVtcGxhdGUgZnVuY3Rpb24gYXJlIGluZGVwZW5kZW50IGZyb20gb25lIGFub3RoZXIgdGhpcyBtZWFucyB0aGF0IHRoZSBzdHlsaW5nIGFwcGx5XG4gKiBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy4gQnkgdHJhY2tpbmcgdGhlIGxhc3QgZGlyZWN0aXZlIGluZGV4ICh3aGljaFxuICogaXMgd2hhdCBoYXBwZW5zIGluIHRoaXMgZnVuY3Rpb24pIHRoZSBzdHlsaW5nIGFsZ29yaXRobSBrbm93cyBleGFjdGx5IHdoZW4gdG8gZmx1c2hcbiAqIHN0eWxpbmcgKHdoaWNoIGlzIHdoZW4gdGhlIGxhc3Qgc3R5bGluZyBhcHBseSBmdW5jdGlvbiBpcyBleGVjdXRlZCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMYXN0RGlyZWN0aXZlSW5kZXgoXG4gICAgY29udGV4dDogVFN0eWxpbmdDb250ZXh0LCBsYXN0RGlyZWN0aXZlSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICBpZiAobGFzdERpcmVjdGl2ZUluZGV4ID09PSBURU1QTEFURV9ESVJFQ1RJVkVfSU5ERVgpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjb250ZXh0W1RTdHlsaW5nQ29udGV4dEluZGV4Lkxhc3REaXJlY3RpdmVJbmRleFBvc2l0aW9uXTtcbiAgICBpZiAoY3VycmVudFZhbHVlID4gVEVNUExBVEVfRElSRUNUSVZFX0lOREVYKSB7XG4gICAgICAvLyBUaGlzIG1lYW5zIHRoYXQgYSBkaXJlY3RpdmUgb3IgdHdvIGNvbnRhaW5lZCBhIGhvc3QgYmluZGluZ3MgZnVuY3Rpb24sIGJ1dFxuICAgICAgLy8gbm93IHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbiBhbHNvIGNvbnRhaW5zIHN0eWxpbmcuIFdoZW4gdGhpcyBjb21iaW5hdGlvbiBvZiBzb3VyY2VzXG4gICAgICAvLyBjb21lcyB1cCB0aGVuIHdlIG5lZWQgdG8gdGVsbCB0aGUgY29udGV4dCB0byBzdG9yZSB0aGUgc3RhdGUgYmV0d2VlbiB1cGRhdGVzXG4gICAgICAvLyAoYmVjYXVzZSBob3N0IGJpbmRpbmdzIGV2YWx1YXRpb24gaGFwcGVucyBhZnRlciB0ZW1wbGF0ZSBiaW5kaW5nIGV2YWx1YXRpb24pLlxuICAgICAgbWFya0NvbnRleHRUb1BlcnNpc3RTdGF0ZShjb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29udGV4dFtUU3R5bGluZ0NvbnRleHRJbmRleC5MYXN0RGlyZWN0aXZlSW5kZXhQb3NpdGlvbl0gPSBsYXN0RGlyZWN0aXZlSW5kZXg7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29uZmlnKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCkge1xuICByZXR1cm4gY29udGV4dFtUU3R5bGluZ0NvbnRleHRJbmRleC5Db25maWdQb3NpdGlvbl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDb25maWcoY29udGV4dDogVFN0eWxpbmdDb250ZXh0LCB2YWx1ZTogbnVtYmVyKSB7XG4gIGNvbnRleHRbVFN0eWxpbmdDb250ZXh0SW5kZXguQ29uZmlnUG9zaXRpb25dID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gY29udGV4dFtpbmRleCArIFRTdHlsaW5nQ29udGV4dEluZGV4LlByb3BPZmZzZXRdIGFzIHN0cmluZztcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcENvbmZpZyhjb250ZXh0OiBUU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKGNvbnRleHRbaW5kZXggKyBUU3R5bGluZ0NvbnRleHRJbmRleC5Db25maWdBbmRHdWFyZE9mZnNldF0gYXMgbnVtYmVyKSAmXG4gICAgICBUU3R5bGluZ0NvbnRleHRQcm9wQ29uZmlnRmxhZ3MuTWFzaztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FuaXRpemF0aW9uUmVxdWlyZWQoY29udGV4dDogVFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiAoZ2V0UHJvcENvbmZpZyhjb250ZXh0LCBpbmRleCkgJiBUU3R5bGluZ0NvbnRleHRQcm9wQ29uZmlnRmxhZ3MuU2FuaXRpemF0aW9uUmVxdWlyZWQpID4gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEd1YXJkTWFzayhjb250ZXh0OiBUU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgY29uZmlnR3VhcmRWYWx1ZSA9IGNvbnRleHRbaW5kZXggKyBUU3R5bGluZ0NvbnRleHRJbmRleC5Db25maWdBbmRHdWFyZE9mZnNldF0gYXMgbnVtYmVyO1xuICByZXR1cm4gY29uZmlnR3VhcmRWYWx1ZSA+PiBUU3R5bGluZ0NvbnRleHRQcm9wQ29uZmlnRmxhZ3MuVG90YWxCaXRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R3VhcmRNYXNrKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlciwgbWFza1ZhbHVlOiBudW1iZXIpIHtcbiAgY29uc3QgY29uZmlnID0gZ2V0UHJvcENvbmZpZyhjb250ZXh0LCBpbmRleCk7XG4gIGNvbnN0IGd1YXJkTWFzayA9IG1hc2tWYWx1ZSA8PCBUU3R5bGluZ0NvbnRleHRQcm9wQ29uZmlnRmxhZ3MuVG90YWxCaXRzO1xuICBjb250ZXh0W2luZGV4ICsgVFN0eWxpbmdDb250ZXh0SW5kZXguQ29uZmlnQW5kR3VhcmRPZmZzZXRdID0gY29uZmlnIHwgZ3VhcmRNYXNrO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVzQ291bnQoY29udGV4dDogVFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiBjb250ZXh0W2luZGV4ICsgVFN0eWxpbmdDb250ZXh0SW5kZXguVmFsdWVzQ291bnRPZmZzZXRdIGFzIG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJpbmRpbmdWYWx1ZShjb250ZXh0OiBUU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gIHJldHVybiBjb250ZXh0W2luZGV4ICsgVFN0eWxpbmdDb250ZXh0SW5kZXguQmluZGluZ3NTdGFydE9mZnNldCArIG9mZnNldF0gYXMgbnVtYmVyIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlcik6IHN0cmluZ3xib29sZWFufG51bGwge1xuICBjb25zdCB2YWx1ZXNDb3VudCA9IGdldFZhbHVlc0NvdW50KGNvbnRleHQsIGluZGV4KTtcbiAgcmV0dXJuIGNvbnRleHRbaW5kZXggKyBUU3R5bGluZ0NvbnRleHRJbmRleC5CaW5kaW5nc1N0YXJ0T2Zmc2V0ICsgdmFsdWVzQ291bnQgLSAxXSBhcyBzdHJpbmcgfFxuICAgICAgYm9vbGVhbiB8IG51bGw7XG59XG5cbi8qKlxuICogVGVtcG9yYXJ5IGZ1bmN0aW9uIHdoaWNoIGRldGVybWluZXMgd2hldGhlciBvciBub3QgYSBjb250ZXh0IGlzXG4gKiBhbGxvd2VkIHRvIGJlIGZsdXNoZWQgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGRpcmVjdGl2ZSBpbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFsbG93U3R5bGluZ0ZsdXNoKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCB8IG51bGwsIGluZGV4OiBudW1iZXIpIHtcbiAgcmV0dXJuIChjb250ZXh0ICYmIGluZGV4ID09PSBjb250ZXh0W1RTdHlsaW5nQ29udGV4dEluZGV4Lkxhc3REaXJlY3RpdmVJbmRleFBvc2l0aW9uXSkgPyB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2tDb250ZXh0KGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCkge1xuICBzZXRDb25maWcoY29udGV4dCwgZ2V0Q29uZmlnKGNvbnRleHQpIHwgVFN0eWxpbmdDb25maWdGbGFncy5Mb2NrZWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb250ZXh0TG9ja2VkKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGdldENvbmZpZyhjb250ZXh0KSAmIFRTdHlsaW5nQ29uZmlnRmxhZ3MuTG9ja2VkKSA+IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZUlzUGVyc2lzdGVkKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGdldENvbmZpZyhjb250ZXh0KSAmIFRTdHlsaW5nQ29uZmlnRmxhZ3MuUGVyc2lzdFN0YXRlVmFsdWVzKSA+IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXJrQ29udGV4dFRvUGVyc2lzdFN0YXRlKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCkge1xuICBzZXRDb25maWcoY29udGV4dCwgZ2V0Q29uZmlnKGNvbnRleHQpIHwgVFN0eWxpbmdDb25maWdGbGFncy5QZXJzaXN0U3RhdGVWYWx1ZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcFZhbHVlc1N0YXJ0UG9zaXRpb24oY29udGV4dDogVFN0eWxpbmdDb250ZXh0KSB7XG4gIHJldHVybiBUU3R5bGluZ0NvbnRleHRJbmRleC5NYXBCaW5kaW5nc0JpbmRpbmdzU3RhcnRQb3NpdGlvbiArXG4gICAgICBjb250ZXh0W1RTdHlsaW5nQ29udGV4dEluZGV4Lk1hcEJpbmRpbmdzVmFsdWVzQ291bnRQb3NpdGlvbl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01hcEJhc2VkKHByb3A6IHN0cmluZykge1xuICByZXR1cm4gcHJvcCA9PT0gTUFQX0JBU0VEX0VOVFJZX1BST1BfTkFNRTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1ZhbHVlQ2hhbmdlZChcbiAgICBhOiBTdHlsaW5nTWFwQXJyYXkgfCBudW1iZXIgfCBTdHJpbmcgfCBzdHJpbmcgfCBudWxsIHwgYm9vbGVhbiB8IHVuZGVmaW5lZCB8IHt9LFxuICAgIGI6IFN0eWxpbmdNYXBBcnJheSB8IG51bWJlciB8IFN0cmluZyB8IHN0cmluZyB8IG51bGwgfCBib29sZWFuIHwgdW5kZWZpbmVkIHwge30pOiBib29sZWFuIHtcbiAgbGV0IGNvbXBhcmVWYWx1ZUEgPSBBcnJheS5pc0FycmF5KGEpID8gYVtTdHlsaW5nTWFwQXJyYXlJbmRleC5SYXdWYWx1ZVBvc2l0aW9uXSA6IGE7XG4gIGxldCBjb21wYXJlVmFsdWVCID0gQXJyYXkuaXNBcnJheShiKSA/IGJbU3R5bGluZ01hcEFycmF5SW5kZXguUmF3VmFsdWVQb3NpdGlvbl0gOiBiO1xuXG4gIC8vIHRoZXNlIGFyZSBzcGVjaWFsIGNhc2VzIGZvciBTdHJpbmcgYmFzZWQgdmFsdWVzICh3aGljaCBhcmUgY3JlYXRlZCBhcyBhcnRpZmFjdHNcbiAgLy8gd2hlbiBzYW5pdGl6YXRpb24gaXMgYnlwYXNzZWQgb24gYSBwYXJ0aWN1bGFyIHZhbHVlKVxuICBpZiAoY29tcGFyZVZhbHVlQSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgIGNvbXBhcmVWYWx1ZUEgPSBjb21wYXJlVmFsdWVBLnRvU3RyaW5nKCk7XG4gIH1cbiAgaWYgKGNvbXBhcmVWYWx1ZUIgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICBjb21wYXJlVmFsdWVCID0gY29tcGFyZVZhbHVlQi50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiAhT2JqZWN0LmlzKGNvbXBhcmVWYWx1ZUEsIGNvbXBhcmVWYWx1ZUIpO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcHJvdmlkZWQgc3R5bGluZyB2YWx1ZSBpcyB0cnV0aHkgb3IgZmFsc3kuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0eWxpbmdWYWx1ZURlZmluZWQodmFsdWU6IGFueSkge1xuICAvLyB0aGUgcmVhc29uIHdoeSBudWxsIGlzIGNvbXBhcmVkIGFnYWluc3QgaXMgYmVjYXVzZVxuICAvLyBhIENTUyBjbGFzcyB2YWx1ZSB0aGF0IGlzIHNldCB0byBgZmFsc2VgIG11c3QgYmVcbiAgLy8gcmVzcGVjdGVkIChvdGhlcndpc2UgaXQgd291bGQgYmUgdHJlYXRlZCBhcyBmYWxzeSkuXG4gIC8vIEVtcHR5IHN0cmluZyB2YWx1ZXMgYXJlIGJlY2F1c2UgZGV2ZWxvcGVycyB1c3VhbGx5XG4gIC8vIHNldCBhIHZhbHVlIHRvIGFuIGVtcHR5IHN0cmluZyB0byByZW1vdmUgaXQuXG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHZhbHVlICE9PSAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdFN0cmluZyhhOiBzdHJpbmcsIGI6IHN0cmluZywgc2VwYXJhdG9yID0gJyAnKTogc3RyaW5nIHtcbiAgcmV0dXJuIGEgKyAoKGIubGVuZ3RoICYmIGEubGVuZ3RoKSA/IHNlcGFyYXRvciA6ICcnKSArIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoeXBoZW5hdGUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bYS16XVtBLVpdL2csIHYgPT4gdi5jaGFyQXQoMCkgKyAnLScgKyB2LmNoYXJBdCgxKSkudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGBTdHlsaW5nTWFwQXJyYXlgLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgZGVzaWduZWQgdG8gZmluZCBhbiBpbnN0YW5jZSBvZiBgU3R5bGluZ01hcEFycmF5YCBpbiBjYXNlIGl0IGlzIHN0b3JlZFxuICogaW5zaWRlIG9mIGFuIGluc3RhbmNlIG9mIGBUU3R5bGluZ0NvbnRleHRgLiBXaGVuIGEgc3R5bGluZyBjb250ZXh0IGlzIGNyZWF0ZWQgaXRcbiAqIHdpbGwgY29weSBvdmVyIGFuIGluaXRpYWwgc3R5bGluZyB2YWx1ZXMgZnJvbSB0aGUgdE5vZGUgKHdoaWNoIGFyZSBzdG9yZWQgYXMgYVxuICogYFN0eWxpbmdNYXBBcnJheWAgb24gdGhlIGB0Tm9kZS5jbGFzc2VzYCBvciBgdE5vZGUuc3R5bGVzYCB2YWx1ZXMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGluZ01hcEFycmF5KHZhbHVlOiBUU3R5bGluZ0NvbnRleHQgfCBTdHlsaW5nTWFwQXJyYXkgfCBudWxsKTpcbiAgICBTdHlsaW5nTWFwQXJyYXl8bnVsbCB7XG4gIHJldHVybiBpc1N0eWxpbmdDb250ZXh0KHZhbHVlKSA/XG4gICAgICAodmFsdWUgYXMgVFN0eWxpbmdDb250ZXh0KVtUU3R5bGluZ0NvbnRleHRJbmRleC5Jbml0aWFsU3R5bGluZ1ZhbHVlUG9zaXRpb25dIDpcbiAgICAgIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHlsaW5nQ29udGV4dCh2YWx1ZTogVFN0eWxpbmdDb250ZXh0IHwgU3R5bGluZ01hcEFycmF5IHwgbnVsbCk6IGJvb2xlYW4ge1xuICAvLyB0aGUgU3R5bGluZ01hcEFycmF5IGlzIGluIHRoZSBmb3JtYXQgb2YgW2luaXRpYWwsIHByb3AsIHN0cmluZywgcHJvcCwgc3RyaW5nXVxuICAvLyBhbmQgdGhpcyBpcyB0aGUgZGVmaW5pbmcgdmFsdWUgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBhcnJheXNcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmXG4gICAgICB2YWx1ZS5sZW5ndGggPj0gVFN0eWxpbmdDb250ZXh0SW5kZXguTWFwQmluZGluZ3NCaW5kaW5nc1N0YXJ0UG9zaXRpb24gJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVsxXSAhPT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbml0aWFsU3R5bGluZ1ZhbHVlKGNvbnRleHQ6IFRTdHlsaW5nQ29udGV4dCB8IFN0eWxpbmdNYXBBcnJheSB8IG51bGwpOiBzdHJpbmcge1xuICBjb25zdCBtYXAgPSBnZXRTdHlsaW5nTWFwQXJyYXkoY29udGV4dCk7XG4gIHJldHVybiBtYXAgJiYgKG1hcFtTdHlsaW5nTWFwQXJyYXlJbmRleC5SYXdWYWx1ZVBvc2l0aW9uXSBhcyBzdHJpbmcgfCBudWxsKSB8fCAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzSW5wdXQodE5vZGU6IFROb2RlKSB7XG4gIHJldHVybiAodE5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmhhc0NsYXNzSW5wdXQpICE9PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGVJbnB1dCh0Tm9kZTogVE5vZGUpIHtcbiAgcmV0dXJuICh0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuaGFzU3R5bGVJbnB1dCkgIT09IDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXBQcm9wKG1hcDogU3R5bGluZ01hcEFycmF5LCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIG1hcFtpbmRleCArIFN0eWxpbmdNYXBBcnJheUluZGV4LlByb3BPZmZzZXRdIGFzIHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldE1hcFZhbHVlKFxuICAgIG1hcDogU3R5bGluZ01hcEFycmF5LCBpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwpOiB2b2lkIHtcbiAgbWFwW2luZGV4ICsgU3R5bGluZ01hcEFycmF5SW5kZXguVmFsdWVPZmZzZXRdID0gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXBWYWx1ZShtYXA6IFN0eWxpbmdNYXBBcnJheSwgaW5kZXg6IG51bWJlcik6IHN0cmluZ3xudWxsIHtcbiAgcmV0dXJuIG1hcFtpbmRleCArIFN0eWxpbmdNYXBBcnJheUluZGV4LlZhbHVlT2Zmc2V0XSBhcyBzdHJpbmcgfCBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yY2VDbGFzc2VzQXNTdHJpbmcoY2xhc3Nlczogc3RyaW5nIHwge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsIHwgdW5kZWZpbmVkKTpcbiAgICBzdHJpbmcge1xuICBpZiAoY2xhc3NlcyAmJiB0eXBlb2YgY2xhc3NlcyAhPT0gJ3N0cmluZycpIHtcbiAgICBjbGFzc2VzID0gT2JqZWN0LmtleXMoY2xhc3Nlcykuam9pbignICcpO1xuICB9XG4gIHJldHVybiAoY2xhc3NlcyBhcyBzdHJpbmcpIHx8ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yY2VTdHlsZXNBc1N0cmluZyhzdHlsZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGxldCBzdHIgPSAnJztcbiAgaWYgKHN0eWxlcykge1xuICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmtleXMoc3R5bGVzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwcm9wID0gcHJvcHNbaV07XG4gICAgICBzdHIgPSBjb25jYXRTdHJpbmcoc3RyLCBgJHtwcm9wfToke3N0eWxlc1twcm9wXX1gLCAnOycpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufVxuIl19