import { RendererStyleFlags3, isProceduralRenderer } from '../interfaces/renderer';
import { NO_CHANGE } from '../tokens';
import { getRootContext } from '../util';
import { BoundPlayerFactory } from './player_factory';
import { addPlayerInternal, allocPlayerContext, createEmptyStylingContext, getPlayerContext } from './util';
var EMPTY_ARR = [];
var EMPTY_OBJ = {};
/**
 * Creates a styling context template where styling information is stored.
 * Any styles that are later referenced using `updateStyleProp` must be
 * passed in within this function. Initial values for those styles are to
 * be declared after all initial style properties are declared (this change in
 * mode between declarations and initial styles is made possible using a special
 * enum value found in `definition.ts`).
 *
 * @param initialStyleDeclarations a list of style declarations and initial style values
 *    that are used later within the styling context.
 *
 *    -> ['width', 'height', SPECIAL_ENUM_VAL, 'width', '100px']
 *       This implies that `width` and `height` will be later styled and that the `width`
 *       property has an initial value of `100px`.
 *
 * @param initialClassDeclarations a list of class declarations and initial class values
 *    that are used later within the styling context.
 *
 *    -> ['foo', 'bar', SPECIAL_ENUM_VAL, 'foo', true]
 *       This implies that `foo` and `bar` will be later styled and that the `foo`
 *       class will be applied to the element as an initial class since it's true
 */
export function createStylingContextTemplate(initialClassDeclarations, initialStyleDeclarations, styleSanitizer, onlyProcessSingleClasses) {
    var initialStylingValues = [null];
    var context = createEmptyStylingContext(null, styleSanitizer, initialStylingValues);
    // we use two maps since a class name might collide with a CSS style prop
    var stylesLookup = {};
    var classesLookup = {};
    var totalStyleDeclarations = 0;
    if (initialStyleDeclarations) {
        var hasPassedDeclarations = false;
        for (var i = 0; i < initialStyleDeclarations.length; i++) {
            var v = initialStyleDeclarations[i];
            // this flag value marks where the declarations end the initial values begin
            if (v === 1 /* VALUES_MODE */) {
                hasPassedDeclarations = true;
            }
            else {
                var prop = v;
                if (hasPassedDeclarations) {
                    var value = initialStyleDeclarations[++i];
                    initialStylingValues.push(value);
                    stylesLookup[prop] = initialStylingValues.length - 1;
                }
                else {
                    totalStyleDeclarations++;
                    stylesLookup[prop] = 0;
                }
            }
        }
    }
    // make where the class offsets begin
    context[4 /* ClassOffsetPosition */] = totalStyleDeclarations;
    var initialStaticClasses = onlyProcessSingleClasses ? [] : null;
    if (initialClassDeclarations) {
        var hasPassedDeclarations = false;
        for (var i = 0; i < initialClassDeclarations.length; i++) {
            var v = initialClassDeclarations[i];
            // this flag value marks where the declarations end the initial values begin
            if (v === 1 /* VALUES_MODE */) {
                hasPassedDeclarations = true;
            }
            else {
                var className = v;
                if (hasPassedDeclarations) {
                    var value = initialClassDeclarations[++i];
                    initialStylingValues.push(value);
                    classesLookup[className] = initialStylingValues.length - 1;
                    initialStaticClasses && initialStaticClasses.push(className);
                }
                else {
                    classesLookup[className] = 0;
                }
            }
        }
    }
    var styleProps = Object.keys(stylesLookup);
    var classNames = Object.keys(classesLookup);
    var classNamesIndexStart = styleProps.length;
    var totalProps = styleProps.length + classNames.length;
    // *2 because we are filling for both single and multi style spaces
    var maxLength = totalProps * 4 /* Size */ * 2 + 8 /* SingleStylesStartPosition */;
    // we need to fill the array from the start so that we can access
    // both the multi and the single array positions in the same loop block
    for (var i = 8 /* SingleStylesStartPosition */; i < maxLength; i++) {
        context.push(null);
    }
    var singleStart = 8 /* SingleStylesStartPosition */;
    var multiStart = totalProps * 4 /* Size */ + 8 /* SingleStylesStartPosition */;
    // fill single and multi-level styles
    for (var i = 0; i < totalProps; i++) {
        var isClassBased_1 = i >= classNamesIndexStart;
        var prop = isClassBased_1 ? classNames[i - classNamesIndexStart] : styleProps[i];
        var indexForInitial = isClassBased_1 ? classesLookup[prop] : stylesLookup[prop];
        var initialValue = initialStylingValues[indexForInitial];
        var indexForMulti = i * 4 /* Size */ + multiStart;
        var indexForSingle = i * 4 /* Size */ + singleStart;
        var initialFlag = prepareInitialFlag(prop, isClassBased_1, styleSanitizer || null);
        setFlag(context, indexForSingle, pointers(initialFlag, indexForInitial, indexForMulti));
        setProp(context, indexForSingle, prop);
        setValue(context, indexForSingle, null);
        setPlayerBuilderIndex(context, indexForSingle, 0);
        var flagForMulti = initialFlag | (initialValue !== null ? 1 /* Dirty */ : 0 /* None */);
        setFlag(context, indexForMulti, pointers(flagForMulti, indexForInitial, indexForSingle));
        setProp(context, indexForMulti, prop);
        setValue(context, indexForMulti, null);
        setPlayerBuilderIndex(context, indexForMulti, 0);
    }
    // there is no initial value flag for the master index since it doesn't
    // reference an initial style value
    var masterFlag = pointers(0, 0, multiStart) |
        (onlyProcessSingleClasses ? 16 /* OnlyProcessSingleClasses */ : 0);
    setFlag(context, 3 /* MasterFlagPosition */, masterFlag);
    setContextDirty(context, initialStylingValues.length > 1);
    if (initialStaticClasses) {
        context[6 /* PreviousOrCachedMultiClassValue */] = initialStaticClasses.join(' ');
    }
    return context;
}
/**
 * Sets and resolves all `multi` styling on an `StylingContext` so that they can be
 * applied to the element once `renderStyleAndClassBindings` is called.
 *
 * All missing styles/class (any values that are not provided in the new `styles`
 * or `classes` params) will resolve to `null` within their respective positions
 * in the context.
 *
 * @param context The styling context that will be updated with the
 *    newly provided style values.
 * @param classesInput The key/value map of CSS class names that will be used for the update.
 * @param stylesInput The key/value map of CSS styles that will be used for the update.
 */
export function updateStylingMap(context, classesInput, stylesInput) {
    stylesInput = stylesInput || null;
    var element = context[5 /* ElementPosition */];
    var classesPlayerBuilder = classesInput instanceof BoundPlayerFactory ?
        new ClassAndStylePlayerBuilder(classesInput, element, 2 /* Class */) :
        null;
    var stylesPlayerBuilder = stylesInput instanceof BoundPlayerFactory ?
        new ClassAndStylePlayerBuilder(stylesInput, element, 3 /* Style */) :
        null;
    var classesValue = classesPlayerBuilder ?
        classesInput.value :
        classesInput;
    var stylesValue = stylesPlayerBuilder ? stylesInput.value : stylesInput;
    // early exit (this is what's done to avoid using ctx.bind() to cache the value)
    var ignoreAllClassUpdates = limitToSingleClasses(context) || classesValue === NO_CHANGE ||
        classesValue === context[6 /* PreviousOrCachedMultiClassValue */];
    var ignoreAllStyleUpdates = stylesValue === NO_CHANGE || stylesValue === context[7 /* PreviousMultiStyleValue */];
    if (ignoreAllClassUpdates && ignoreAllStyleUpdates)
        return;
    context[6 /* PreviousOrCachedMultiClassValue */] = classesValue;
    context[7 /* PreviousMultiStyleValue */] = stylesValue;
    var classNames = EMPTY_ARR;
    var applyAllClasses = false;
    var playerBuildersAreDirty = false;
    var classesPlayerBuilderIndex = classesPlayerBuilder ? 1 /* ClassMapPlayerBuilderPosition */ : 0;
    if (hasPlayerBuilderChanged(context, classesPlayerBuilder, 1 /* ClassMapPlayerBuilderPosition */)) {
        setPlayerBuilder(context, classesPlayerBuilder, 1 /* ClassMapPlayerBuilderPosition */);
        playerBuildersAreDirty = true;
    }
    var stylesPlayerBuilderIndex = stylesPlayerBuilder ? 3 /* StyleMapPlayerBuilderPosition */ : 0;
    if (hasPlayerBuilderChanged(context, stylesPlayerBuilder, 3 /* StyleMapPlayerBuilderPosition */)) {
        setPlayerBuilder(context, stylesPlayerBuilder, 3 /* StyleMapPlayerBuilderPosition */);
        playerBuildersAreDirty = true;
    }
    // each time a string-based value pops up then it shouldn't require a deep
    // check of what's changed.
    if (!ignoreAllClassUpdates) {
        if (typeof classesValue == 'string') {
            classNames = classesValue.split(/\s+/);
            // this boolean is used to avoid having to create a key/value map of `true` values
            // since a classname string implies that all those classes are added
            applyAllClasses = true;
        }
        else {
            classNames = classesValue ? Object.keys(classesValue) : EMPTY_ARR;
        }
    }
    var classes = (classesValue || EMPTY_OBJ);
    var styleProps = stylesValue ? Object.keys(stylesValue) : EMPTY_ARR;
    var styles = stylesValue || EMPTY_OBJ;
    var classesStartIndex = styleProps.length;
    var multiStartIndex = getMultiStartIndex(context);
    var dirty = false;
    var ctxIndex = multiStartIndex;
    var propIndex = 0;
    var propLimit = styleProps.length + classNames.length;
    // the main loop here will try and figure out how the shape of the provided
    // styles differ with respect to the context. Later if the context/styles/classes
    // are off-balance then they will be dealt in another loop after this one
    while (ctxIndex < context.length && propIndex < propLimit) {
        var isClassBased_2 = propIndex >= classesStartIndex;
        var processValue = (!isClassBased_2 && !ignoreAllStyleUpdates) || (isClassBased_2 && !ignoreAllClassUpdates);
        // when there is a cache-hit for a string-based class then we should
        // avoid doing any work diffing any of the changes
        if (processValue) {
            var adjustedPropIndex = isClassBased_2 ? propIndex - classesStartIndex : propIndex;
            var newProp = isClassBased_2 ? classNames[adjustedPropIndex] : styleProps[adjustedPropIndex];
            var newValue = isClassBased_2 ? (applyAllClasses ? true : classes[newProp]) : styles[newProp];
            var playerBuilderIndex = isClassBased_2 ? classesPlayerBuilderIndex : stylesPlayerBuilderIndex;
            var prop = getProp(context, ctxIndex);
            if (prop === newProp) {
                var value = getValue(context, ctxIndex);
                var flag = getPointers(context, ctxIndex);
                setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex);
                if (hasValueChanged(flag, value, newValue)) {
                    setValue(context, ctxIndex, newValue);
                    playerBuildersAreDirty = playerBuildersAreDirty || !!playerBuilderIndex;
                    var initialValue = getInitialValue(context, flag);
                    // there is no point in setting this to dirty if the previously
                    // rendered value was being referenced by the initial style (or null)
                    if (hasValueChanged(flag, initialValue, newValue)) {
                        setDirty(context, ctxIndex, true);
                        dirty = true;
                    }
                }
            }
            else {
                var indexOfEntry = findEntryPositionByProp(context, newProp, ctxIndex);
                if (indexOfEntry > 0) {
                    // it was found at a later point ... just swap the values
                    var valueToCompare = getValue(context, indexOfEntry);
                    var flagToCompare = getPointers(context, indexOfEntry);
                    swapMultiContextEntries(context, ctxIndex, indexOfEntry);
                    if (hasValueChanged(flagToCompare, valueToCompare, newValue)) {
                        var initialValue = getInitialValue(context, flagToCompare);
                        setValue(context, ctxIndex, newValue);
                        if (hasValueChanged(flagToCompare, initialValue, newValue)) {
                            setDirty(context, ctxIndex, true);
                            playerBuildersAreDirty = playerBuildersAreDirty || !!playerBuilderIndex;
                            dirty = true;
                        }
                    }
                }
                else {
                    // we only care to do this if the insertion is in the middle
                    var newFlag = prepareInitialFlag(newProp, isClassBased_2, getStyleSanitizer(context));
                    playerBuildersAreDirty = playerBuildersAreDirty || !!playerBuilderIndex;
                    insertNewMultiProperty(context, ctxIndex, isClassBased_2, newProp, newFlag, newValue, playerBuilderIndex);
                    dirty = true;
                }
            }
        }
        ctxIndex += 4 /* Size */;
        propIndex++;
    }
    // this means that there are left-over values in the context that
    // were not included in the provided styles/classes and in this
    // case the  goal is to "remove" them from the context (by nullifying)
    while (ctxIndex < context.length) {
        var flag = getPointers(context, ctxIndex);
        var isClassBased_3 = (flag & 2 /* Class */) === 2 /* Class */;
        var processValue = (!isClassBased_3 && !ignoreAllStyleUpdates) || (isClassBased_3 && !ignoreAllClassUpdates);
        if (processValue) {
            var value = getValue(context, ctxIndex);
            var doRemoveValue = valueExists(value, isClassBased_3);
            if (doRemoveValue) {
                setDirty(context, ctxIndex, true);
                setValue(context, ctxIndex, null);
                // we keep the player factory the same so that the `nulled` value can
                // be instructed into the player because removing a style and/or a class
                // is a valid animation player instruction.
                var playerBuilderIndex = isClassBased_3 ? classesPlayerBuilderIndex : stylesPlayerBuilderIndex;
                setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex);
                dirty = true;
            }
        }
        ctxIndex += 4 /* Size */;
    }
    // this means that there are left-over properties in the context that
    // were not detected in the context during the loop above. In that
    // case we want to add the new entries into the list
    var sanitizer = getStyleSanitizer(context);
    while (propIndex < propLimit) {
        var isClassBased_4 = propIndex >= classesStartIndex;
        var processValue = (!isClassBased_4 && !ignoreAllStyleUpdates) || (isClassBased_4 && !ignoreAllClassUpdates);
        if (processValue) {
            var adjustedPropIndex = isClassBased_4 ? propIndex - classesStartIndex : propIndex;
            var prop = isClassBased_4 ? classNames[adjustedPropIndex] : styleProps[adjustedPropIndex];
            var value = isClassBased_4 ? (applyAllClasses ? true : classes[prop]) : styles[prop];
            var flag = prepareInitialFlag(prop, isClassBased_4, sanitizer) | 1 /* Dirty */;
            var playerBuilderIndex = isClassBased_4 ? classesPlayerBuilderIndex : stylesPlayerBuilderIndex;
            context.push(flag, prop, value, playerBuilderIndex);
            dirty = true;
        }
        propIndex++;
    }
    if (dirty) {
        setContextDirty(context, true);
    }
    if (playerBuildersAreDirty) {
        setContextPlayersDirty(context, true);
    }
}
/**
 * Sets and resolves a single styling property/value on the provided `StylingContext` so
 * that they can be applied to the element once `renderStyleAndClassBindings` is called.
 *
 * Note that prop-level styling values are considered higher priority than any styling that
 * has been applied using `updateStylingMap`, therefore, when styling values are rendered
 * then any styles/classes that have been applied using this function will be considered first
 * (then multi values second and then initial values as a backup).
 *
 * @param context The styling context that will be updated with the
 *    newly provided style value.
 * @param index The index of the property which is being updated.
 * @param value The CSS style value that will be assigned
 */
export function updateStyleProp(context, index, input) {
    var singleIndex = 8 /* SingleStylesStartPosition */ + index * 4 /* Size */;
    var currValue = getValue(context, singleIndex);
    var currFlag = getPointers(context, singleIndex);
    var value = (input instanceof BoundPlayerFactory) ? input.value : input;
    // didn't change ... nothing to make a note of
    if (hasValueChanged(currFlag, currValue, value)) {
        var isClassBased_5 = (currFlag & 2 /* Class */) === 2 /* Class */;
        var element = context[5 /* ElementPosition */];
        var playerBuilder = input instanceof BoundPlayerFactory ?
            new ClassAndStylePlayerBuilder(input, element, isClassBased_5 ? 2 /* Class */ : 3 /* Style */) :
            null;
        var value_1 = (playerBuilder ? input.value : input);
        var currPlayerIndex = getPlayerBuilderIndex(context, singleIndex);
        var playerBuildersAreDirty = false;
        var playerBuilderIndex = playerBuilder ? currPlayerIndex : 0;
        if (hasPlayerBuilderChanged(context, playerBuilder, currPlayerIndex)) {
            var newIndex = setPlayerBuilder(context, playerBuilder, currPlayerIndex);
            playerBuilderIndex = playerBuilder ? newIndex : 0;
            setPlayerBuilderIndex(context, singleIndex, playerBuilderIndex);
            playerBuildersAreDirty = true;
        }
        // the value will always get updated (even if the dirty flag is skipped)
        setValue(context, singleIndex, value_1);
        var indexForMulti = getMultiOrSingleIndex(currFlag);
        // if the value is the same in the multi-area then there's no point in re-assembling
        var valueForMulti = getValue(context, indexForMulti);
        if (!valueForMulti || hasValueChanged(currFlag, valueForMulti, value_1)) {
            var multiDirty = false;
            var singleDirty = true;
            // only when the value is set to `null` should the multi-value get flagged
            if (!valueExists(value_1, isClassBased_5) && valueExists(valueForMulti, isClassBased_5)) {
                multiDirty = true;
                singleDirty = false;
            }
            setDirty(context, indexForMulti, multiDirty);
            setDirty(context, singleIndex, singleDirty);
            setContextDirty(context, true);
        }
        if (playerBuildersAreDirty) {
            setContextPlayersDirty(context, true);
        }
    }
}
/**
 * This method will toggle the referenced CSS class (by the provided index)
 * within the given context.
 *
 * @param context The styling context that will be updated with the
 *    newly provided class value.
 * @param index The index of the CSS class which is being updated.
 * @param addOrRemove Whether or not to add or remove the CSS class
 */
export function updateClassProp(context, index, addOrRemove) {
    var adjustedIndex = index + context[4 /* ClassOffsetPosition */];
    updateStyleProp(context, adjustedIndex, addOrRemove);
}
/**
 * Renders all queued styling using a renderer onto the given element.
 *
 * This function works by rendering any styles (that have been applied
 * using `updateStylingMap`) and any classes (that have been applied using
 * `updateStyleProp`) onto the provided element using the provided renderer.
 * Just before the styles/classes are rendered a final key/value style map
 * will be assembled (if `styleStore` or `classStore` are provided).
 *
 * @param lElement the element that the styles will be rendered on
 * @param context The styling context that will be used to determine
 *      what styles will be rendered
 * @param renderer the renderer that will be used to apply the styling
 * @param classesStore if provided, the updated class values will be applied
 *    to this key/value map instead of being renderered via the renderer.
 * @param stylesStore if provided, the updated style values will be applied
 *    to this key/value map instead of being renderered via the renderer.
 * @returns number the total amount of players that got queued for animation (if any)
 */
export function renderStyleAndClassBindings(context, renderer, rootOrView, classesStore, stylesStore) {
    var totalPlayersQueued = 0;
    if (isContextDirty(context)) {
        var flushPlayerBuilders = context[3 /* MasterFlagPosition */] & 8 /* PlayerBuildersDirty */;
        var native = context[5 /* ElementPosition */];
        var multiStartIndex = getMultiStartIndex(context);
        var styleSanitizer = getStyleSanitizer(context);
        var onlySingleClasses = limitToSingleClasses(context);
        for (var i = 8 /* SingleStylesStartPosition */; i < context.length; i += 4 /* Size */) {
            // there is no point in rendering styles that have not changed on screen
            if (isDirty(context, i)) {
                var prop = getProp(context, i);
                var value = getValue(context, i);
                var flag = getPointers(context, i);
                var playerBuilder = getPlayerBuilder(context, i);
                var isClassBased_6 = flag & 2 /* Class */ ? true : false;
                var isInSingleRegion = i < multiStartIndex;
                var readInitialValue = !isClassBased_6 || !onlySingleClasses;
                var valueToApply = value;
                // VALUE DEFER CASE 1: Use a multi value instead of a null single value
                // this check implies that a single value was removed and we
                // should now defer to a multi value and use that (if set).
                if (isInSingleRegion && !valueExists(valueToApply, isClassBased_6)) {
                    // single values ALWAYS have a reference to a multi index
                    var multiIndex = getMultiOrSingleIndex(flag);
                    valueToApply = getValue(context, multiIndex);
                }
                // VALUE DEFER CASE 2: Use the initial value if all else fails (is falsy)
                // the initial value will always be a string or null,
                // therefore we can safely adopt it incase there's nothing else
                // note that this should always be a falsy check since `false` is used
                // for both class and style comparisons (styles can't be false and false
                // classes are turned off and should therefore defer to their initial values)
                if (!valueExists(valueToApply, isClassBased_6) && readInitialValue) {
                    valueToApply = getInitialValue(context, flag);
                }
                if (isClassBased_6) {
                    setClass(native, prop, valueToApply ? true : false, renderer, classesStore, playerBuilder);
                }
                else {
                    var sanitizer = (flag & 4 /* Sanitize */) ? styleSanitizer : null;
                    setStyle(native, prop, valueToApply, renderer, sanitizer, stylesStore, playerBuilder);
                }
                setDirty(context, i, false);
            }
        }
        if (flushPlayerBuilders) {
            var rootContext = Array.isArray(rootOrView) ? getRootContext(rootOrView) : rootOrView;
            var playerContext = getPlayerContext(context);
            var playersStartIndex = playerContext[0 /* NonBuilderPlayersStart */];
            for (var i = 1 /* PlayerBuildersStartPosition */; i < playersStartIndex; i += 2 /* PlayerAndPlayerBuildersTupleSize */) {
                var builder = playerContext[i];
                var playerInsertionIndex = i + 1 /* PlayerOffsetPosition */;
                var oldPlayer = playerContext[playerInsertionIndex];
                if (builder) {
                    var player = builder.buildPlayer(oldPlayer);
                    if (player !== undefined) {
                        if (player != null) {
                            var wasQueued = addPlayerInternal(playerContext, rootContext, native, player, playerInsertionIndex);
                            wasQueued && totalPlayersQueued++;
                        }
                        if (oldPlayer) {
                            oldPlayer.destroy();
                        }
                    }
                }
                else if (oldPlayer) {
                    // the player builder has been removed ... therefore we should delete the associated
                    // player
                    oldPlayer.destroy();
                }
            }
            setContextPlayersDirty(context, false);
        }
        setContextDirty(context, false);
    }
    return totalPlayersQueued;
}
/**
 * This function renders a given CSS prop/value entry using the
 * provided renderer. If a `store` value is provided then
 * that will be used a render context instead of the provided
 * renderer.
 *
 * @param native the DOM Element
 * @param prop the CSS style property that will be rendered
 * @param value the CSS style value that will be rendered
 * @param renderer
 * @param store an optional key/value map that will be used as a context to render styles on
 */
function setStyle(native, prop, value, renderer, sanitizer, store, playerBuilder) {
    value = sanitizer && value ? sanitizer(prop, value) : value;
    if (store || playerBuilder) {
        if (store) {
            store.setValue(prop, value);
        }
        if (playerBuilder) {
            playerBuilder.setValue(prop, value);
        }
    }
    else if (value) {
        ngDevMode && ngDevMode.rendererSetStyle++;
        isProceduralRenderer(renderer) ?
            renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) :
            native['style'].setProperty(prop, value);
    }
    else {
        ngDevMode && ngDevMode.rendererRemoveStyle++;
        isProceduralRenderer(renderer) ?
            renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) :
            native['style'].removeProperty(prop);
    }
}
/**
 * This function renders a given CSS class value using the provided
 * renderer (by adding or removing it from the provided element).
 * If a `store` value is provided then that will be used a render
 * context instead of the provided renderer.
 *
 * @param native the DOM Element
 * @param prop the CSS style property that will be rendered
 * @param value the CSS style value that will be rendered
 * @param renderer
 * @param store an optional key/value map that will be used as a context to render styles on
 */
function setClass(native, className, add, renderer, store, playerBuilder) {
    if (store || playerBuilder) {
        if (store) {
            store.setValue(className, add);
        }
        if (playerBuilder) {
            playerBuilder.setValue(className, add);
        }
    }
    else if (add) {
        ngDevMode && ngDevMode.rendererAddClass++;
        isProceduralRenderer(renderer) ? renderer.addClass(native, className) :
            native['classList'].add(className);
    }
    else {
        ngDevMode && ngDevMode.rendererRemoveClass++;
        isProceduralRenderer(renderer) ? renderer.removeClass(native, className) :
            native['classList'].remove(className);
    }
}
function setDirty(context, index, isDirtyYes) {
    var adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    if (isDirtyYes) {
        context[adjustedIndex] |= 1 /* Dirty */;
    }
    else {
        context[adjustedIndex] &= ~1 /* Dirty */;
    }
}
function isDirty(context, index) {
    var adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return (context[adjustedIndex] & 1 /* Dirty */) == 1 /* Dirty */;
}
function isClassBased(context, index) {
    var adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return (context[adjustedIndex] & 2 /* Class */) == 2 /* Class */;
}
function isSanitizable(context, index) {
    var adjustedIndex = index >= 8 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return (context[adjustedIndex] & 4 /* Sanitize */) == 4 /* Sanitize */;
}
function pointers(configFlag, staticIndex, dynamicIndex) {
    return (configFlag & 15 /* BitMask */) | (staticIndex << 5 /* BitCountSize */) |
        (dynamicIndex << (14 /* BitCountSize */ + 5 /* BitCountSize */));
}
function getInitialValue(context, flag) {
    var index = getInitialIndex(flag);
    return context[2 /* InitialStylesPosition */][index];
}
function getInitialIndex(flag) {
    return (flag >> 5 /* BitCountSize */) & 16383 /* BitMask */;
}
function getMultiOrSingleIndex(flag) {
    var index = (flag >> (14 /* BitCountSize */ + 5 /* BitCountSize */)) & 16383 /* BitMask */;
    return index >= 8 /* SingleStylesStartPosition */ ? index : -1;
}
function getMultiStartIndex(context) {
    return getMultiOrSingleIndex(context[3 /* MasterFlagPosition */]);
}
function getStyleSanitizer(context) {
    return context[1 /* StyleSanitizerPosition */];
}
function setProp(context, index, prop) {
    context[index + 1 /* PropertyOffset */] = prop;
}
function setValue(context, index, value) {
    context[index + 2 /* ValueOffset */] = value;
}
function hasPlayerBuilderChanged(context, builder, index) {
    var playerContext = context[0 /* PlayerContext */];
    if (builder) {
        if (!playerContext || index === 0) {
            return true;
        }
    }
    else if (!playerContext) {
        return false;
    }
    return playerContext[index] !== builder;
}
function setPlayerBuilder(context, builder, insertionIndex) {
    var playerContext = context[0 /* PlayerContext */] || allocPlayerContext(context);
    if (insertionIndex > 0) {
        playerContext[insertionIndex] = builder;
    }
    else {
        insertionIndex = playerContext[0 /* NonBuilderPlayersStart */];
        playerContext.splice(insertionIndex, 0, builder, null);
        playerContext[0 /* NonBuilderPlayersStart */] +=
            2 /* PlayerAndPlayerBuildersTupleSize */;
    }
    return insertionIndex;
}
function setPlayerBuilderIndex(context, index, playerBuilderIndex) {
    context[index + 3 /* PlayerBuilderIndexOffset */] = playerBuilderIndex;
}
function getPlayerBuilderIndex(context, index) {
    return context[index + 3 /* PlayerBuilderIndexOffset */] || 0;
}
function getPlayerBuilder(context, index) {
    var playerBuilderIndex = getPlayerBuilderIndex(context, index);
    if (playerBuilderIndex) {
        var playerContext = context[0 /* PlayerContext */];
        if (playerContext) {
            return playerContext[playerBuilderIndex];
        }
    }
    return null;
}
function setFlag(context, index, flag) {
    var adjustedIndex = index === 3 /* MasterFlagPosition */ ? index : (index + 0 /* FlagsOffset */);
    context[adjustedIndex] = flag;
}
function getPointers(context, index) {
    var adjustedIndex = index === 3 /* MasterFlagPosition */ ? index : (index + 0 /* FlagsOffset */);
    return context[adjustedIndex];
}
function getValue(context, index) {
    return context[index + 2 /* ValueOffset */];
}
function getProp(context, index) {
    return context[index + 1 /* PropertyOffset */];
}
export function isContextDirty(context) {
    return isDirty(context, 3 /* MasterFlagPosition */);
}
export function limitToSingleClasses(context) {
    return context[3 /* MasterFlagPosition */] & 16 /* OnlyProcessSingleClasses */;
}
export function setContextDirty(context, isDirtyYes) {
    setDirty(context, 3 /* MasterFlagPosition */, isDirtyYes);
}
export function setContextPlayersDirty(context, isDirtyYes) {
    if (isDirtyYes) {
        context[3 /* MasterFlagPosition */] |= 8 /* PlayerBuildersDirty */;
    }
    else {
        context[3 /* MasterFlagPosition */] &= ~8 /* PlayerBuildersDirty */;
    }
}
function findEntryPositionByProp(context, prop, startIndex) {
    for (var i = (startIndex || 0) + 1 /* PropertyOffset */; i < context.length; i += 4 /* Size */) {
        var thisProp = context[i];
        if (thisProp == prop) {
            return i - 1 /* PropertyOffset */;
        }
    }
    return -1;
}
function swapMultiContextEntries(context, indexA, indexB) {
    var tmpValue = getValue(context, indexA);
    var tmpProp = getProp(context, indexA);
    var tmpFlag = getPointers(context, indexA);
    var tmpPlayerBuilderIndex = getPlayerBuilderIndex(context, indexA);
    var flagA = tmpFlag;
    var flagB = getPointers(context, indexB);
    var singleIndexA = getMultiOrSingleIndex(flagA);
    if (singleIndexA >= 0) {
        var _flag = getPointers(context, singleIndexA);
        var _initial = getInitialIndex(_flag);
        setFlag(context, singleIndexA, pointers(_flag, _initial, indexB));
    }
    var singleIndexB = getMultiOrSingleIndex(flagB);
    if (singleIndexB >= 0) {
        var _flag = getPointers(context, singleIndexB);
        var _initial = getInitialIndex(_flag);
        setFlag(context, singleIndexB, pointers(_flag, _initial, indexA));
    }
    setValue(context, indexA, getValue(context, indexB));
    setProp(context, indexA, getProp(context, indexB));
    setFlag(context, indexA, getPointers(context, indexB));
    setPlayerBuilderIndex(context, indexA, getPlayerBuilderIndex(context, indexB));
    setValue(context, indexB, tmpValue);
    setProp(context, indexB, tmpProp);
    setFlag(context, indexB, tmpFlag);
    setPlayerBuilderIndex(context, indexB, tmpPlayerBuilderIndex);
}
function updateSinglePointerValues(context, indexStartPosition) {
    for (var i = indexStartPosition; i < context.length; i += 4 /* Size */) {
        var multiFlag = getPointers(context, i);
        var singleIndex = getMultiOrSingleIndex(multiFlag);
        if (singleIndex > 0) {
            var singleFlag = getPointers(context, singleIndex);
            var initialIndexForSingle = getInitialIndex(singleFlag);
            var flagValue = (isDirty(context, singleIndex) ? 1 /* Dirty */ : 0 /* None */) |
                (isClassBased(context, singleIndex) ? 2 /* Class */ : 0 /* None */) |
                (isSanitizable(context, singleIndex) ? 4 /* Sanitize */ : 0 /* None */);
            var updatedFlag = pointers(flagValue, initialIndexForSingle, i);
            setFlag(context, singleIndex, updatedFlag);
        }
    }
}
function insertNewMultiProperty(context, index, classBased, name, flag, value, playerIndex) {
    var doShift = index < context.length;
    // prop does not exist in the list, add it in
    context.splice(index, 0, flag | 1 /* Dirty */ | (classBased ? 2 /* Class */ : 0 /* None */), name, value, playerIndex);
    if (doShift) {
        // because the value was inserted midway into the array then we
        // need to update all the shifted multi values' single value
        // pointers to point to the newly shifted location
        updateSinglePointerValues(context, index + 4 /* Size */);
    }
}
function valueExists(value, isClassBased) {
    if (isClassBased) {
        return value ? true : false;
    }
    return value !== null;
}
function prepareInitialFlag(name, isClassBased, sanitizer) {
    if (isClassBased) {
        return 2 /* Class */;
    }
    else if (sanitizer && sanitizer(name)) {
        return 4 /* Sanitize */;
    }
    return 0 /* None */;
}
function hasValueChanged(flag, a, b) {
    var isClassBased = flag & 2 /* Class */;
    var hasValues = a && b;
    var usesSanitizer = flag & 4 /* Sanitize */;
    // the toString() comparison ensures that a value is checked
    // ... otherwise (during sanitization bypassing) the === comparsion
    // would fail since a new String() instance is created
    if (!isClassBased && hasValues && usesSanitizer) {
        // we know for sure we're dealing with strings at this point
        return a.toString() !== b.toString();
    }
    // everything else is safe to check with a normal equality check
    return a !== b;
}
var ClassAndStylePlayerBuilder = /** @class */ (function () {
    function ClassAndStylePlayerBuilder(factory, _element, _type) {
        this._element = _element;
        this._type = _type;
        this._values = {};
        this._dirty = false;
        this._factory = factory;
    }
    ClassAndStylePlayerBuilder.prototype.setValue = function (prop, value) {
        if (this._values[prop] !== value) {
            this._values[prop] = value;
            this._dirty = true;
        }
    };
    ClassAndStylePlayerBuilder.prototype.buildPlayer = function (currentPlayer) {
        // if no values have been set here then this means the binding didn't
        // change and therefore the binding values were not updated through
        // `setValue` which means no new player will be provided.
        if (this._dirty) {
            var player = this._factory.fn(this._element, this._type, this._values, currentPlayer || null);
            this._values = {};
            this._dirty = false;
            return player;
        }
        return undefined;
    };
    return ClassAndStylePlayerBuilder;
}());
export { ClassAndStylePlayerBuilder };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NfYW5kX3N0eWxlX2JpbmRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9zdHlsaW5nL2NsYXNzX2FuZF9zdHlsZV9iaW5kaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxPQUFPLEVBQVksbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUc1RixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFdkMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTFHLElBQU0sU0FBUyxHQUFVLEVBQUUsQ0FBQztBQUM1QixJQUFNLFNBQVMsR0FBeUIsRUFBRSxDQUFDO0FBRzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLFVBQVUsNEJBQTRCLENBQ3hDLHdCQUE0RSxFQUM1RSx3QkFBNEUsRUFDNUUsY0FBdUMsRUFBRSx3QkFBa0M7SUFDN0UsSUFBTSxvQkFBb0IsR0FBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxJQUFNLE9BQU8sR0FDVCx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFFMUUseUVBQXlFO0lBQ3pFLElBQU0sWUFBWSxHQUE0QixFQUFFLENBQUM7SUFDakQsSUFBTSxhQUFhLEdBQTRCLEVBQUUsQ0FBQztJQUVsRCxJQUFJLHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLHdCQUF3QixFQUFFO1FBQzVCLElBQUkscUJBQXFCLEdBQUcsS0FB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QUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDSCxpQ0FBQztBQUFELENBQUMsQUE5QkQsSUE4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1N0eWxlU2FuaXRpemVGbn0gZnJvbSAnLi4vLi4vc2FuaXRpemF0aW9uL3N0eWxlX3Nhbml0aXplcic7XG5pbXBvcnQge0luaXRpYWxTdHlsaW5nRmxhZ3N9IGZyb20gJy4uL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge0JpbmRpbmdTdG9yZSwgQmluZGluZ1R5cGUsIFBsYXllciwgUGxheWVyQnVpbGRlciwgUGxheWVyRmFjdG9yeSwgUGxheWVySW5kZXh9IGZyb20gJy4uL2ludGVyZmFjZXMvcGxheWVyJztcbmltcG9ydCB7UmVuZGVyZXIzLCBSZW5kZXJlclN0eWxlRmxhZ3MzLCBpc1Byb2NlZHVyYWxSZW5kZXJlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9yZW5kZXJlcic7XG5pbXBvcnQge0luaXRpYWxTdHlsZXMsIFN0eWxpbmdDb250ZXh0LCBTdHlsaW5nRmxhZ3MsIFN0eWxpbmdJbmRleH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9zdHlsaW5nJztcbmltcG9ydCB7TFZpZXdEYXRhLCBSb290Q29udGV4dH0gZnJvbSAnLi4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Tk9fQ0hBTkdFfSBmcm9tICcuLi90b2tlbnMnO1xuaW1wb3J0IHtnZXRSb290Q29udGV4dH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7Qm91bmRQbGF5ZXJGYWN0b3J5fSBmcm9tICcuL3BsYXllcl9mYWN0b3J5JztcbmltcG9ydCB7YWRkUGxheWVySW50ZXJuYWwsIGFsbG9jUGxheWVyQ29udGV4dCwgY3JlYXRlRW1wdHlTdHlsaW5nQ29udGV4dCwgZ2V0UGxheWVyQ29udGV4dH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgRU1QVFlfQVJSOiBhbnlbXSA9IFtdO1xuY29uc3QgRU1QVFlfT0JKOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0eWxpbmcgY29udGV4dCB0ZW1wbGF0ZSB3aGVyZSBzdHlsaW5nIGluZm9ybWF0aW9uIGlzIHN0b3JlZC5cbiAqIEFueSBzdHlsZXMgdGhhdCBhcmUgbGF0ZXIgcmVmZXJlbmNlZCB1c2luZyBgdXBkYXRlU3R5bGVQcm9wYCBtdXN0IGJlXG4gKiBwYXNzZWQgaW4gd2l0aGluIHRoaXMgZnVuY3Rpb24uIEluaXRpYWwgdmFsdWVzIGZvciB0aG9zZSBzdHlsZXMgYXJlIHRvXG4gKiBiZSBkZWNsYXJlZCBhZnRlciBhbGwgaW5pdGlhbCBzdHlsZSBwcm9wZXJ0aWVzIGFyZSBkZWNsYXJlZCAodGhpcyBjaGFuZ2UgaW5cbiAqIG1vZGUgYmV0d2VlbiBkZWNsYXJhdGlvbnMgYW5kIGluaXRpYWwgc3R5bGVzIGlzIG1hZGUgcG9zc2libGUgdXNpbmcgYSBzcGVjaWFsXG4gKiBlbnVtIHZhbHVlIGZvdW5kIGluIGBkZWZpbml0aW9uLnRzYCkuXG4gKlxuICogQHBhcmFtIGluaXRpYWxTdHlsZURlY2xhcmF0aW9ucyBhIGxpc3Qgb2Ygc3R5bGUgZGVjbGFyYXRpb25zIGFuZCBpbml0aWFsIHN0eWxlIHZhbHVlc1xuICogICAgdGhhdCBhcmUgdXNlZCBsYXRlciB3aXRoaW4gdGhlIHN0eWxpbmcgY29udGV4dC5cbiAqXG4gKiAgICAtPiBbJ3dpZHRoJywgJ2hlaWdodCcsIFNQRUNJQUxfRU5VTV9WQUwsICd3aWR0aCcsICcxMDBweCddXG4gKiAgICAgICBUaGlzIGltcGxpZXMgdGhhdCBgd2lkdGhgIGFuZCBgaGVpZ2h0YCB3aWxsIGJlIGxhdGVyIHN0eWxlZCBhbmQgdGhhdCB0aGUgYHdpZHRoYFxuICogICAgICAgcHJvcGVydHkgaGFzIGFuIGluaXRpYWwgdmFsdWUgb2YgYDEwMHB4YC5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbENsYXNzRGVjbGFyYXRpb25zIGEgbGlzdCBvZiBjbGFzcyBkZWNsYXJhdGlvbnMgYW5kIGluaXRpYWwgY2xhc3MgdmFsdWVzXG4gKiAgICB0aGF0IGFyZSB1c2VkIGxhdGVyIHdpdGhpbiB0aGUgc3R5bGluZyBjb250ZXh0LlxuICpcbiAqICAgIC0+IFsnZm9vJywgJ2JhcicsIFNQRUNJQUxfRU5VTV9WQUwsICdmb28nLCB0cnVlXVxuICogICAgICAgVGhpcyBpbXBsaWVzIHRoYXQgYGZvb2AgYW5kIGBiYXJgIHdpbGwgYmUgbGF0ZXIgc3R5bGVkIGFuZCB0aGF0IHRoZSBgZm9vYFxuICogICAgICAgY2xhc3Mgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50IGFzIGFuIGluaXRpYWwgY2xhc3Mgc2luY2UgaXQncyB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHlsaW5nQ29udGV4dFRlbXBsYXRlKFxuICAgIGluaXRpYWxDbGFzc0RlY2xhcmF0aW9ucz86IChzdHJpbmcgfCBib29sZWFuIHwgSW5pdGlhbFN0eWxpbmdGbGFncylbXSB8IG51bGwsXG4gICAgaW5pdGlhbFN0eWxlRGVjbGFyYXRpb25zPzogKHN0cmluZyB8IGJvb2xlYW4gfCBJbml0aWFsU3R5bGluZ0ZsYWdzKVtdIHwgbnVsbCxcbiAgICBzdHlsZVNhbml0aXplcj86IFN0eWxlU2FuaXRpemVGbiB8IG51bGwsIG9ubHlQcm9jZXNzU2luZ2xlQ2xhc3Nlcz86IGJvb2xlYW4pOiBTdHlsaW5nQ29udGV4dCB7XG4gIGNvbnN0IGluaXRpYWxTdHlsaW5nVmFsdWVzOiBJbml0aWFsU3R5bGVzID0gW251bGxdO1xuICBjb25zdCBjb250ZXh0OiBTdHlsaW5nQ29udGV4dCA9XG4gICAgICBjcmVhdGVFbXB0eVN0eWxpbmdDb250ZXh0KG51bGwsIHN0eWxlU2FuaXRpemVyLCBpbml0aWFsU3R5bGluZ1ZhbHVlcyk7XG5cbiAgLy8gd2UgdXNlIHR3byBtYXBzIHNpbmNlIGEgY2xhc3MgbmFtZSBtaWdodCBjb2xsaWRlIHdpdGggYSBDU1Mgc3R5bGUgcHJvcFxuICBjb25zdCBzdHlsZXNMb29rdXA6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge307XG4gIGNvbnN0IGNsYXNzZXNMb29rdXA6IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9ID0ge307XG5cbiAgbGV0IHRvdGFsU3R5bGVEZWNsYXJhdGlvbnMgPSAwO1xuICBpZiAoaW5pdGlhbFN0eWxlRGVjbGFyYXRpb25zKSB7XG4gICAgbGV0IGhhc1Bhc3NlZERlY2xhcmF0aW9ucyA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbFN0eWxlRGVjbGFyYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2ID0gaW5pdGlhbFN0eWxlRGVjbGFyYXRpb25zW2ldIGFzIHN0cmluZyB8IEluaXRpYWxTdHlsaW5nRmxhZ3M7XG5cbiAgICAgIC8vIHRoaXMgZmxhZyB2YWx1ZSBtYXJrcyB3aGVyZSB0aGUgZGVjbGFyYXRpb25zIGVuZCB0aGUgaW5pdGlhbCB2YWx1ZXMgYmVnaW5cbiAgICAgIGlmICh2ID09PSBJbml0aWFsU3R5bGluZ0ZsYWdzLlZBTFVFU19NT0RFKSB7XG4gICAgICAgIGhhc1Bhc3NlZERlY2xhcmF0aW9ucyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcm9wID0gdiBhcyBzdHJpbmc7XG4gICAgICAgIGlmIChoYXNQYXNzZWREZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRpYWxTdHlsZURlY2xhcmF0aW9uc1srK2ldIGFzIHN0cmluZztcbiAgICAgICAgICBpbml0aWFsU3R5bGluZ1ZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICBzdHlsZXNMb29rdXBbcHJvcF0gPSBpbml0aWFsU3R5bGluZ1ZhbHVlcy5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdGFsU3R5bGVEZWNsYXJhdGlvbnMrKztcbiAgICAgICAgICBzdHlsZXNMb29rdXBbcHJvcF0gPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbWFrZSB3aGVyZSB0aGUgY2xhc3Mgb2Zmc2V0cyBiZWdpblxuICBjb250ZXh0W1N0eWxpbmdJbmRleC5DbGFzc09mZnNldFBvc2l0aW9uXSA9IHRvdGFsU3R5bGVEZWNsYXJhdGlvbnM7XG5cbiAgY29uc3QgaW5pdGlhbFN0YXRpY0NsYXNzZXM6IHN0cmluZ1tdfG51bGwgPSBvbmx5UHJvY2Vzc1NpbmdsZUNsYXNzZXMgPyBbXSA6IG51bGw7XG4gIGlmIChpbml0aWFsQ2xhc3NEZWNsYXJhdGlvbnMpIHtcbiAgICBsZXQgaGFzUGFzc2VkRGVjbGFyYXRpb25zID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsQ2xhc3NEZWNsYXJhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHYgPSBpbml0aWFsQ2xhc3NEZWNsYXJhdGlvbnNbaV0gYXMgc3RyaW5nIHwgYm9vbGVhbiB8IEluaXRpYWxTdHlsaW5nRmxhZ3M7XG4gICAgICAvLyB0aGlzIGZsYWcgdmFsdWUgbWFya3Mgd2hlcmUgdGhlIGRlY2xhcmF0aW9ucyBlbmQgdGhlIGluaXRpYWwgdmFsdWVzIGJlZ2luXG4gICAgICBpZiAodiA9PT0gSW5pdGlhbFN0eWxpbmdGbGFncy5WQUxVRVNfTU9ERSkge1xuICAgICAgICBoYXNQYXNzZWREZWNsYXJhdGlvbnMgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gdiBhcyBzdHJpbmc7XG4gICAgICAgIGlmIChoYXNQYXNzZWREZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRpYWxDbGFzc0RlY2xhcmF0aW9uc1srK2ldIGFzIGJvb2xlYW47XG4gICAgICAgICAgaW5pdGlhbFN0eWxpbmdWYWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgY2xhc3Nlc0xvb2t1cFtjbGFzc05hbWVdID0gaW5pdGlhbFN0eWxpbmdWYWx1ZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICBpbml0aWFsU3RhdGljQ2xhc3NlcyAmJiBpbml0aWFsU3RhdGljQ2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xhc3Nlc0xvb2t1cFtjbGFzc05hbWVdID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0eWxlUHJvcHMgPSBPYmplY3Qua2V5cyhzdHlsZXNMb29rdXApO1xuICBjb25zdCBjbGFzc05hbWVzID0gT2JqZWN0LmtleXMoY2xhc3Nlc0xvb2t1cCk7XG4gIGNvbnN0IGNsYXNzTmFtZXNJbmRleFN0YXJ0ID0gc3R5bGVQcm9wcy5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsUHJvcHMgPSBzdHlsZVByb3BzLmxlbmd0aCArIGNsYXNzTmFtZXMubGVuZ3RoO1xuXG4gIC8vICoyIGJlY2F1c2Ugd2UgYXJlIGZpbGxpbmcgZm9yIGJvdGggc2luZ2xlIGFuZCBtdWx0aSBzdHlsZSBzcGFjZXNcbiAgY29uc3QgbWF4TGVuZ3RoID0gdG90YWxQcm9wcyAqIFN0eWxpbmdJbmRleC5TaXplICogMiArIFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uO1xuXG4gIC8vIHdlIG5lZWQgdG8gZmlsbCB0aGUgYXJyYXkgZnJvbSB0aGUgc3RhcnQgc28gdGhhdCB3ZSBjYW4gYWNjZXNzXG4gIC8vIGJvdGggdGhlIG11bHRpIGFuZCB0aGUgc2luZ2xlIGFycmF5IHBvc2l0aW9ucyBpbiB0aGUgc2FtZSBsb29wIGJsb2NrXG4gIGZvciAobGV0IGkgPSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbjsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgY29udGV4dC5wdXNoKG51bGwpO1xuICB9XG5cbiAgY29uc3Qgc2luZ2xlU3RhcnQgPSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbjtcbiAgY29uc3QgbXVsdGlTdGFydCA9IHRvdGFsUHJvcHMgKiBTdHlsaW5nSW5kZXguU2l6ZSArIFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uO1xuXG4gIC8vIGZpbGwgc2luZ2xlIGFuZCBtdWx0aS1sZXZlbCBzdHlsZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbFByb3BzOyBpKyspIHtcbiAgICBjb25zdCBpc0NsYXNzQmFzZWQgPSBpID49IGNsYXNzTmFtZXNJbmRleFN0YXJ0O1xuICAgIGNvbnN0IHByb3AgPSBpc0NsYXNzQmFzZWQgPyBjbGFzc05hbWVzW2kgLSBjbGFzc05hbWVzSW5kZXhTdGFydF0gOiBzdHlsZVByb3BzW2ldO1xuICAgIGNvbnN0IGluZGV4Rm9ySW5pdGlhbCA9IGlzQ2xhc3NCYXNlZCA/IGNsYXNzZXNMb29rdXBbcHJvcF0gOiBzdHlsZXNMb29rdXBbcHJvcF07XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFN0eWxpbmdWYWx1ZXNbaW5kZXhGb3JJbml0aWFsXTtcblxuICAgIGNvbnN0IGluZGV4Rm9yTXVsdGkgPSBpICogU3R5bGluZ0luZGV4LlNpemUgKyBtdWx0aVN0YXJ0O1xuICAgIGNvbnN0IGluZGV4Rm9yU2luZ2xlID0gaSAqIFN0eWxpbmdJbmRleC5TaXplICsgc2luZ2xlU3RhcnQ7XG4gICAgY29uc3QgaW5pdGlhbEZsYWcgPSBwcmVwYXJlSW5pdGlhbEZsYWcocHJvcCwgaXNDbGFzc0Jhc2VkLCBzdHlsZVNhbml0aXplciB8fCBudWxsKTtcblxuICAgIHNldEZsYWcoY29udGV4dCwgaW5kZXhGb3JTaW5nbGUsIHBvaW50ZXJzKGluaXRpYWxGbGFnLCBpbmRleEZvckluaXRpYWwsIGluZGV4Rm9yTXVsdGkpKTtcbiAgICBzZXRQcm9wKGNvbnRleHQsIGluZGV4Rm9yU2luZ2xlLCBwcm9wKTtcbiAgICBzZXRWYWx1ZShjb250ZXh0LCBpbmRleEZvclNpbmdsZSwgbnVsbCk7XG4gICAgc2V0UGxheWVyQnVpbGRlckluZGV4KGNvbnRleHQsIGluZGV4Rm9yU2luZ2xlLCAwKTtcblxuICAgIGNvbnN0IGZsYWdGb3JNdWx0aSA9XG4gICAgICAgIGluaXRpYWxGbGFnIHwgKGluaXRpYWxWYWx1ZSAhPT0gbnVsbCA/IFN0eWxpbmdGbGFncy5EaXJ0eSA6IFN0eWxpbmdGbGFncy5Ob25lKTtcbiAgICBzZXRGbGFnKGNvbnRleHQsIGluZGV4Rm9yTXVsdGksIHBvaW50ZXJzKGZsYWdGb3JNdWx0aSwgaW5kZXhGb3JJbml0aWFsLCBpbmRleEZvclNpbmdsZSkpO1xuICAgIHNldFByb3AoY29udGV4dCwgaW5kZXhGb3JNdWx0aSwgcHJvcCk7XG4gICAgc2V0VmFsdWUoY29udGV4dCwgaW5kZXhGb3JNdWx0aSwgbnVsbCk7XG4gICAgc2V0UGxheWVyQnVpbGRlckluZGV4KGNvbnRleHQsIGluZGV4Rm9yTXVsdGksIDApO1xuICB9XG5cbiAgLy8gdGhlcmUgaXMgbm8gaW5pdGlhbCB2YWx1ZSBmbGFnIGZvciB0aGUgbWFzdGVyIGluZGV4IHNpbmNlIGl0IGRvZXNuJ3RcbiAgLy8gcmVmZXJlbmNlIGFuIGluaXRpYWwgc3R5bGUgdmFsdWVcbiAgY29uc3QgbWFzdGVyRmxhZyA9IHBvaW50ZXJzKDAsIDAsIG11bHRpU3RhcnQpIHxcbiAgICAgIChvbmx5UHJvY2Vzc1NpbmdsZUNsYXNzZXMgPyBTdHlsaW5nRmxhZ3MuT25seVByb2Nlc3NTaW5nbGVDbGFzc2VzIDogMCk7XG4gIHNldEZsYWcoY29udGV4dCwgU3R5bGluZ0luZGV4Lk1hc3RlckZsYWdQb3NpdGlvbiwgbWFzdGVyRmxhZyk7XG4gIHNldENvbnRleHREaXJ0eShjb250ZXh0LCBpbml0aWFsU3R5bGluZ1ZhbHVlcy5sZW5ndGggPiAxKTtcblxuICBpZiAoaW5pdGlhbFN0YXRpY0NsYXNzZXMpIHtcbiAgICBjb250ZXh0W1N0eWxpbmdJbmRleC5QcmV2aW91c09yQ2FjaGVkTXVsdGlDbGFzc1ZhbHVlXSA9IGluaXRpYWxTdGF0aWNDbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0O1xufVxuXG4vKipcbiAqIFNldHMgYW5kIHJlc29sdmVzIGFsbCBgbXVsdGlgIHN0eWxpbmcgb24gYW4gYFN0eWxpbmdDb250ZXh0YCBzbyB0aGF0IHRoZXkgY2FuIGJlXG4gKiBhcHBsaWVkIHRvIHRoZSBlbGVtZW50IG9uY2UgYHJlbmRlclN0eWxlQW5kQ2xhc3NCaW5kaW5nc2AgaXMgY2FsbGVkLlxuICpcbiAqIEFsbCBtaXNzaW5nIHN0eWxlcy9jbGFzcyAoYW55IHZhbHVlcyB0aGF0IGFyZSBub3QgcHJvdmlkZWQgaW4gdGhlIG5ldyBgc3R5bGVzYFxuICogb3IgYGNsYXNzZXNgIHBhcmFtcykgd2lsbCByZXNvbHZlIHRvIGBudWxsYCB3aXRoaW4gdGhlaXIgcmVzcGVjdGl2ZSBwb3NpdGlvbnNcbiAqIGluIHRoZSBjb250ZXh0LlxuICpcbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBzdHlsaW5nIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVwZGF0ZWQgd2l0aCB0aGVcbiAqICAgIG5ld2x5IHByb3ZpZGVkIHN0eWxlIHZhbHVlcy5cbiAqIEBwYXJhbSBjbGFzc2VzSW5wdXQgVGhlIGtleS92YWx1ZSBtYXAgb2YgQ1NTIGNsYXNzIG5hbWVzIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdXBkYXRlLlxuICogQHBhcmFtIHN0eWxlc0lucHV0IFRoZSBrZXkvdmFsdWUgbWFwIG9mIENTUyBzdHlsZXMgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSB1cGRhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTdHlsaW5nTWFwKFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBjbGFzc2VzSW5wdXQ6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgc3RyaW5nIHxcbiAgICAgICAgQm91bmRQbGF5ZXJGYWN0b3J5PG51bGx8c3RyaW5nfHtba2V5OiBzdHJpbmddOiBhbnl9PnwgTk9fQ0hBTkdFIHwgbnVsbCxcbiAgICBzdHlsZXNJbnB1dD86IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgQm91bmRQbGF5ZXJGYWN0b3J5PG51bGx8e1trZXk6IHN0cmluZ106IGFueX0+fCBOT19DSEFOR0UgfFxuICAgICAgICBudWxsKTogdm9pZCB7XG4gIHN0eWxlc0lucHV0ID0gc3R5bGVzSW5wdXQgfHwgbnVsbDtcblxuICBjb25zdCBlbGVtZW50ID0gY29udGV4dFtTdHlsaW5nSW5kZXguRWxlbWVudFBvc2l0aW9uXSAhYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGNsYXNzZXNQbGF5ZXJCdWlsZGVyID0gY2xhc3Nlc0lucHV0IGluc3RhbmNlb2YgQm91bmRQbGF5ZXJGYWN0b3J5ID9cbiAgICAgIG5ldyBDbGFzc0FuZFN0eWxlUGxheWVyQnVpbGRlcihjbGFzc2VzSW5wdXQgYXMgYW55LCBlbGVtZW50LCBCaW5kaW5nVHlwZS5DbGFzcykgOlxuICAgICAgbnVsbDtcbiAgY29uc3Qgc3R5bGVzUGxheWVyQnVpbGRlciA9IHN0eWxlc0lucHV0IGluc3RhbmNlb2YgQm91bmRQbGF5ZXJGYWN0b3J5ID9cbiAgICAgIG5ldyBDbGFzc0FuZFN0eWxlUGxheWVyQnVpbGRlcihzdHlsZXNJbnB1dCBhcyBhbnksIGVsZW1lbnQsIEJpbmRpbmdUeXBlLlN0eWxlKSA6XG4gICAgICBudWxsO1xuXG4gIGNvbnN0IGNsYXNzZXNWYWx1ZSA9IGNsYXNzZXNQbGF5ZXJCdWlsZGVyID9cbiAgICAgIChjbGFzc2VzSW5wdXQgYXMgQm91bmRQbGF5ZXJGYWN0b3J5PHtba2V5OiBzdHJpbmddOiBhbnl9fHN0cmluZz4pICEudmFsdWUgOlxuICAgICAgY2xhc3Nlc0lucHV0O1xuICBjb25zdCBzdHlsZXNWYWx1ZSA9IHN0eWxlc1BsYXllckJ1aWxkZXIgPyBzdHlsZXNJbnB1dCAhLnZhbHVlIDogc3R5bGVzSW5wdXQ7XG4gIC8vIGVhcmx5IGV4aXQgKHRoaXMgaXMgd2hhdCdzIGRvbmUgdG8gYXZvaWQgdXNpbmcgY3R4LmJpbmQoKSB0byBjYWNoZSB0aGUgdmFsdWUpXG4gIGNvbnN0IGlnbm9yZUFsbENsYXNzVXBkYXRlcyA9IGxpbWl0VG9TaW5nbGVDbGFzc2VzKGNvbnRleHQpIHx8IGNsYXNzZXNWYWx1ZSA9PT0gTk9fQ0hBTkdFIHx8XG4gICAgICBjbGFzc2VzVmFsdWUgPT09IGNvbnRleHRbU3R5bGluZ0luZGV4LlByZXZpb3VzT3JDYWNoZWRNdWx0aUNsYXNzVmFsdWVdO1xuICBjb25zdCBpZ25vcmVBbGxTdHlsZVVwZGF0ZXMgPVxuICAgICAgc3R5bGVzVmFsdWUgPT09IE5PX0NIQU5HRSB8fCBzdHlsZXNWYWx1ZSA9PT0gY29udGV4dFtTdHlsaW5nSW5kZXguUHJldmlvdXNNdWx0aVN0eWxlVmFsdWVdO1xuICBpZiAoaWdub3JlQWxsQ2xhc3NVcGRhdGVzICYmIGlnbm9yZUFsbFN0eWxlVXBkYXRlcykgcmV0dXJuO1xuXG4gIGNvbnRleHRbU3R5bGluZ0luZGV4LlByZXZpb3VzT3JDYWNoZWRNdWx0aUNsYXNzVmFsdWVdID0gY2xhc3Nlc1ZhbHVlO1xuICBjb250ZXh0W1N0eWxpbmdJbmRleC5QcmV2aW91c011bHRpU3R5bGVWYWx1ZV0gPSBzdHlsZXNWYWx1ZTtcblxuICBsZXQgY2xhc3NOYW1lczogc3RyaW5nW10gPSBFTVBUWV9BUlI7XG4gIGxldCBhcHBseUFsbENsYXNzZXMgPSBmYWxzZTtcbiAgbGV0IHBsYXllckJ1aWxkZXJzQXJlRGlydHkgPSBmYWxzZTtcblxuICBjb25zdCBjbGFzc2VzUGxheWVyQnVpbGRlckluZGV4ID1cbiAgICAgIGNsYXNzZXNQbGF5ZXJCdWlsZGVyID8gUGxheWVySW5kZXguQ2xhc3NNYXBQbGF5ZXJCdWlsZGVyUG9zaXRpb24gOiAwO1xuICBpZiAoaGFzUGxheWVyQnVpbGRlckNoYW5nZWQoXG4gICAgICAgICAgY29udGV4dCwgY2xhc3Nlc1BsYXllckJ1aWxkZXIsIFBsYXllckluZGV4LkNsYXNzTWFwUGxheWVyQnVpbGRlclBvc2l0aW9uKSkge1xuICAgIHNldFBsYXllckJ1aWxkZXIoY29udGV4dCwgY2xhc3Nlc1BsYXllckJ1aWxkZXIsIFBsYXllckluZGV4LkNsYXNzTWFwUGxheWVyQnVpbGRlclBvc2l0aW9uKTtcbiAgICBwbGF5ZXJCdWlsZGVyc0FyZURpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHN0eWxlc1BsYXllckJ1aWxkZXJJbmRleCA9XG4gICAgICBzdHlsZXNQbGF5ZXJCdWlsZGVyID8gUGxheWVySW5kZXguU3R5bGVNYXBQbGF5ZXJCdWlsZGVyUG9zaXRpb24gOiAwO1xuICBpZiAoaGFzUGxheWVyQnVpbGRlckNoYW5nZWQoXG4gICAgICAgICAgY29udGV4dCwgc3R5bGVzUGxheWVyQnVpbGRlciwgUGxheWVySW5kZXguU3R5bGVNYXBQbGF5ZXJCdWlsZGVyUG9zaXRpb24pKSB7XG4gICAgc2V0UGxheWVyQnVpbGRlcihjb250ZXh0LCBzdHlsZXNQbGF5ZXJCdWlsZGVyLCBQbGF5ZXJJbmRleC5TdHlsZU1hcFBsYXllckJ1aWxkZXJQb3NpdGlvbik7XG4gICAgcGxheWVyQnVpbGRlcnNBcmVEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvLyBlYWNoIHRpbWUgYSBzdHJpbmctYmFzZWQgdmFsdWUgcG9wcyB1cCB0aGVuIGl0IHNob3VsZG4ndCByZXF1aXJlIGEgZGVlcFxuICAvLyBjaGVjayBvZiB3aGF0J3MgY2hhbmdlZC5cbiAgaWYgKCFpZ25vcmVBbGxDbGFzc1VwZGF0ZXMpIHtcbiAgICBpZiAodHlwZW9mIGNsYXNzZXNWYWx1ZSA9PSAnc3RyaW5nJykge1xuICAgICAgY2xhc3NOYW1lcyA9IGNsYXNzZXNWYWx1ZS5zcGxpdCgvXFxzKy8pO1xuICAgICAgLy8gdGhpcyBib29sZWFuIGlzIHVzZWQgdG8gYXZvaWQgaGF2aW5nIHRvIGNyZWF0ZSBhIGtleS92YWx1ZSBtYXAgb2YgYHRydWVgIHZhbHVlc1xuICAgICAgLy8gc2luY2UgYSBjbGFzc25hbWUgc3RyaW5nIGltcGxpZXMgdGhhdCBhbGwgdGhvc2UgY2xhc3NlcyBhcmUgYWRkZWRcbiAgICAgIGFwcGx5QWxsQ2xhc3NlcyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc2VzVmFsdWUgPyBPYmplY3Qua2V5cyhjbGFzc2VzVmFsdWUpIDogRU1QVFlfQVJSO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsYXNzZXMgPSAoY2xhc3Nlc1ZhbHVlIHx8IEVNUFRZX09CSikgYXN7W2tleTogc3RyaW5nXTogYW55fTtcbiAgY29uc3Qgc3R5bGVQcm9wcyA9IHN0eWxlc1ZhbHVlID8gT2JqZWN0LmtleXMoc3R5bGVzVmFsdWUpIDogRU1QVFlfQVJSO1xuICBjb25zdCBzdHlsZXMgPSBzdHlsZXNWYWx1ZSB8fCBFTVBUWV9PQko7XG5cbiAgY29uc3QgY2xhc3Nlc1N0YXJ0SW5kZXggPSBzdHlsZVByb3BzLmxlbmd0aDtcbiAgY29uc3QgbXVsdGlTdGFydEluZGV4ID0gZ2V0TXVsdGlTdGFydEluZGV4KGNvbnRleHQpO1xuXG4gIGxldCBkaXJ0eSA9IGZhbHNlO1xuICBsZXQgY3R4SW5kZXggPSBtdWx0aVN0YXJ0SW5kZXg7XG5cbiAgbGV0IHByb3BJbmRleCA9IDA7XG4gIGNvbnN0IHByb3BMaW1pdCA9IHN0eWxlUHJvcHMubGVuZ3RoICsgY2xhc3NOYW1lcy5sZW5ndGg7XG5cbiAgLy8gdGhlIG1haW4gbG9vcCBoZXJlIHdpbGwgdHJ5IGFuZCBmaWd1cmUgb3V0IGhvdyB0aGUgc2hhcGUgb2YgdGhlIHByb3ZpZGVkXG4gIC8vIHN0eWxlcyBkaWZmZXIgd2l0aCByZXNwZWN0IHRvIHRoZSBjb250ZXh0LiBMYXRlciBpZiB0aGUgY29udGV4dC9zdHlsZXMvY2xhc3Nlc1xuICAvLyBhcmUgb2ZmLWJhbGFuY2UgdGhlbiB0aGV5IHdpbGwgYmUgZGVhbHQgaW4gYW5vdGhlciBsb29wIGFmdGVyIHRoaXMgb25lXG4gIHdoaWxlIChjdHhJbmRleCA8IGNvbnRleHQubGVuZ3RoICYmIHByb3BJbmRleCA8IHByb3BMaW1pdCkge1xuICAgIGNvbnN0IGlzQ2xhc3NCYXNlZCA9IHByb3BJbmRleCA+PSBjbGFzc2VzU3RhcnRJbmRleDtcbiAgICBjb25zdCBwcm9jZXNzVmFsdWUgPVxuICAgICAgICAoIWlzQ2xhc3NCYXNlZCAmJiAhaWdub3JlQWxsU3R5bGVVcGRhdGVzKSB8fCAoaXNDbGFzc0Jhc2VkICYmICFpZ25vcmVBbGxDbGFzc1VwZGF0ZXMpO1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBhIGNhY2hlLWhpdCBmb3IgYSBzdHJpbmctYmFzZWQgY2xhc3MgdGhlbiB3ZSBzaG91bGRcbiAgICAvLyBhdm9pZCBkb2luZyBhbnkgd29yayBkaWZmaW5nIGFueSBvZiB0aGUgY2hhbmdlc1xuICAgIGlmIChwcm9jZXNzVmFsdWUpIHtcbiAgICAgIGNvbnN0IGFkanVzdGVkUHJvcEluZGV4ID0gaXNDbGFzc0Jhc2VkID8gcHJvcEluZGV4IC0gY2xhc3Nlc1N0YXJ0SW5kZXggOiBwcm9wSW5kZXg7XG4gICAgICBjb25zdCBuZXdQcm9wOiBzdHJpbmcgPVxuICAgICAgICAgIGlzQ2xhc3NCYXNlZCA/IGNsYXNzTmFtZXNbYWRqdXN0ZWRQcm9wSW5kZXhdIDogc3R5bGVQcm9wc1thZGp1c3RlZFByb3BJbmRleF07XG4gICAgICBjb25zdCBuZXdWYWx1ZTogc3RyaW5nfGJvb2xlYW4gPVxuICAgICAgICAgIGlzQ2xhc3NCYXNlZCA/IChhcHBseUFsbENsYXNzZXMgPyB0cnVlIDogY2xhc3Nlc1tuZXdQcm9wXSkgOiBzdHlsZXNbbmV3UHJvcF07XG4gICAgICBjb25zdCBwbGF5ZXJCdWlsZGVySW5kZXggPVxuICAgICAgICAgIGlzQ2xhc3NCYXNlZCA/IGNsYXNzZXNQbGF5ZXJCdWlsZGVySW5kZXggOiBzdHlsZXNQbGF5ZXJCdWlsZGVySW5kZXg7XG5cbiAgICAgIGNvbnN0IHByb3AgPSBnZXRQcm9wKGNvbnRleHQsIGN0eEluZGV4KTtcbiAgICAgIGlmIChwcm9wID09PSBuZXdQcm9wKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUoY29udGV4dCwgY3R4SW5kZXgpO1xuICAgICAgICBjb25zdCBmbGFnID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgY3R4SW5kZXgpO1xuICAgICAgICBzZXRQbGF5ZXJCdWlsZGVySW5kZXgoY29udGV4dCwgY3R4SW5kZXgsIHBsYXllckJ1aWxkZXJJbmRleCk7XG5cbiAgICAgICAgaWYgKGhhc1ZhbHVlQ2hhbmdlZChmbGFnLCB2YWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgc2V0VmFsdWUoY29udGV4dCwgY3R4SW5kZXgsIG5ld1ZhbHVlKTtcbiAgICAgICAgICBwbGF5ZXJCdWlsZGVyc0FyZURpcnR5ID0gcGxheWVyQnVpbGRlcnNBcmVEaXJ0eSB8fCAhIXBsYXllckJ1aWxkZXJJbmRleDtcblxuICAgICAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IGdldEluaXRpYWxWYWx1ZShjb250ZXh0LCBmbGFnKTtcblxuICAgICAgICAgIC8vIHRoZXJlIGlzIG5vIHBvaW50IGluIHNldHRpbmcgdGhpcyB0byBkaXJ0eSBpZiB0aGUgcHJldmlvdXNseVxuICAgICAgICAgIC8vIHJlbmRlcmVkIHZhbHVlIHdhcyBiZWluZyByZWZlcmVuY2VkIGJ5IHRoZSBpbml0aWFsIHN0eWxlIChvciBudWxsKVxuICAgICAgICAgIGlmIChoYXNWYWx1ZUNoYW5nZWQoZmxhZywgaW5pdGlhbFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHNldERpcnR5KGNvbnRleHQsIGN0eEluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZFbnRyeSA9IGZpbmRFbnRyeVBvc2l0aW9uQnlQcm9wKGNvbnRleHQsIG5ld1Byb3AsIGN0eEluZGV4KTtcbiAgICAgICAgaWYgKGluZGV4T2ZFbnRyeSA+IDApIHtcbiAgICAgICAgICAvLyBpdCB3YXMgZm91bmQgYXQgYSBsYXRlciBwb2ludCAuLi4ganVzdCBzd2FwIHRoZSB2YWx1ZXNcbiAgICAgICAgICBjb25zdCB2YWx1ZVRvQ29tcGFyZSA9IGdldFZhbHVlKGNvbnRleHQsIGluZGV4T2ZFbnRyeSk7XG4gICAgICAgICAgY29uc3QgZmxhZ1RvQ29tcGFyZSA9IGdldFBvaW50ZXJzKGNvbnRleHQsIGluZGV4T2ZFbnRyeSk7XG4gICAgICAgICAgc3dhcE11bHRpQ29udGV4dEVudHJpZXMoY29udGV4dCwgY3R4SW5kZXgsIGluZGV4T2ZFbnRyeSk7XG4gICAgICAgICAgaWYgKGhhc1ZhbHVlQ2hhbmdlZChmbGFnVG9Db21wYXJlLCB2YWx1ZVRvQ29tcGFyZSwgbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSBnZXRJbml0aWFsVmFsdWUoY29udGV4dCwgZmxhZ1RvQ29tcGFyZSk7XG4gICAgICAgICAgICBzZXRWYWx1ZShjb250ZXh0LCBjdHhJbmRleCwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGhhc1ZhbHVlQ2hhbmdlZChmbGFnVG9Db21wYXJlLCBpbml0aWFsVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICBzZXREaXJ0eShjb250ZXh0LCBjdHhJbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgIHBsYXllckJ1aWxkZXJzQXJlRGlydHkgPSBwbGF5ZXJCdWlsZGVyc0FyZURpcnR5IHx8ICEhcGxheWVyQnVpbGRlckluZGV4O1xuICAgICAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHdlIG9ubHkgY2FyZSB0byBkbyB0aGlzIGlmIHRoZSBpbnNlcnRpb24gaXMgaW4gdGhlIG1pZGRsZVxuICAgICAgICAgIGNvbnN0IG5ld0ZsYWcgPSBwcmVwYXJlSW5pdGlhbEZsYWcobmV3UHJvcCwgaXNDbGFzc0Jhc2VkLCBnZXRTdHlsZVNhbml0aXplcihjb250ZXh0KSk7XG4gICAgICAgICAgcGxheWVyQnVpbGRlcnNBcmVEaXJ0eSA9IHBsYXllckJ1aWxkZXJzQXJlRGlydHkgfHwgISFwbGF5ZXJCdWlsZGVySW5kZXg7XG4gICAgICAgICAgaW5zZXJ0TmV3TXVsdGlQcm9wZXJ0eShcbiAgICAgICAgICAgICAgY29udGV4dCwgY3R4SW5kZXgsIGlzQ2xhc3NCYXNlZCwgbmV3UHJvcCwgbmV3RmxhZywgbmV3VmFsdWUsIHBsYXllckJ1aWxkZXJJbmRleCk7XG4gICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4SW5kZXggKz0gU3R5bGluZ0luZGV4LlNpemU7XG4gICAgcHJvcEluZGV4Kys7XG4gIH1cblxuICAvLyB0aGlzIG1lYW5zIHRoYXQgdGhlcmUgYXJlIGxlZnQtb3ZlciB2YWx1ZXMgaW4gdGhlIGNvbnRleHQgdGhhdFxuICAvLyB3ZXJlIG5vdCBpbmNsdWRlZCBpbiB0aGUgcHJvdmlkZWQgc3R5bGVzL2NsYXNzZXMgYW5kIGluIHRoaXNcbiAgLy8gY2FzZSB0aGUgIGdvYWwgaXMgdG8gXCJyZW1vdmVcIiB0aGVtIGZyb20gdGhlIGNvbnRleHQgKGJ5IG51bGxpZnlpbmcpXG4gIHdoaWxlIChjdHhJbmRleCA8IGNvbnRleHQubGVuZ3RoKSB7XG4gICAgY29uc3QgZmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIGN0eEluZGV4KTtcbiAgICBjb25zdCBpc0NsYXNzQmFzZWQgPSAoZmxhZyAmIFN0eWxpbmdGbGFncy5DbGFzcykgPT09IFN0eWxpbmdGbGFncy5DbGFzcztcbiAgICBjb25zdCBwcm9jZXNzVmFsdWUgPVxuICAgICAgICAoIWlzQ2xhc3NCYXNlZCAmJiAhaWdub3JlQWxsU3R5bGVVcGRhdGVzKSB8fCAoaXNDbGFzc0Jhc2VkICYmICFpZ25vcmVBbGxDbGFzc1VwZGF0ZXMpO1xuICAgIGlmIChwcm9jZXNzVmFsdWUpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUoY29udGV4dCwgY3R4SW5kZXgpO1xuICAgICAgY29uc3QgZG9SZW1vdmVWYWx1ZSA9IHZhbHVlRXhpc3RzKHZhbHVlLCBpc0NsYXNzQmFzZWQpO1xuICAgICAgaWYgKGRvUmVtb3ZlVmFsdWUpIHtcbiAgICAgICAgc2V0RGlydHkoY29udGV4dCwgY3R4SW5kZXgsIHRydWUpO1xuICAgICAgICBzZXRWYWx1ZShjb250ZXh0LCBjdHhJbmRleCwgbnVsbCk7XG5cbiAgICAgICAgLy8gd2Uga2VlcCB0aGUgcGxheWVyIGZhY3RvcnkgdGhlIHNhbWUgc28gdGhhdCB0aGUgYG51bGxlZGAgdmFsdWUgY2FuXG4gICAgICAgIC8vIGJlIGluc3RydWN0ZWQgaW50byB0aGUgcGxheWVyIGJlY2F1c2UgcmVtb3ZpbmcgYSBzdHlsZSBhbmQvb3IgYSBjbGFzc1xuICAgICAgICAvLyBpcyBhIHZhbGlkIGFuaW1hdGlvbiBwbGF5ZXIgaW5zdHJ1Y3Rpb24uXG4gICAgICAgIGNvbnN0IHBsYXllckJ1aWxkZXJJbmRleCA9XG4gICAgICAgICAgICBpc0NsYXNzQmFzZWQgPyBjbGFzc2VzUGxheWVyQnVpbGRlckluZGV4IDogc3R5bGVzUGxheWVyQnVpbGRlckluZGV4O1xuICAgICAgICBzZXRQbGF5ZXJCdWlsZGVySW5kZXgoY29udGV4dCwgY3R4SW5kZXgsIHBsYXllckJ1aWxkZXJJbmRleCk7XG4gICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4SW5kZXggKz0gU3R5bGluZ0luZGV4LlNpemU7XG4gIH1cblxuICAvLyB0aGlzIG1lYW5zIHRoYXQgdGhlcmUgYXJlIGxlZnQtb3ZlciBwcm9wZXJ0aWVzIGluIHRoZSBjb250ZXh0IHRoYXRcbiAgLy8gd2VyZSBub3QgZGV0ZWN0ZWQgaW4gdGhlIGNvbnRleHQgZHVyaW5nIHRoZSBsb29wIGFib3ZlLiBJbiB0aGF0XG4gIC8vIGNhc2Ugd2Ugd2FudCB0byBhZGQgdGhlIG5ldyBlbnRyaWVzIGludG8gdGhlIGxpc3RcbiAgY29uc3Qgc2FuaXRpemVyID0gZ2V0U3R5bGVTYW5pdGl6ZXIoY29udGV4dCk7XG4gIHdoaWxlIChwcm9wSW5kZXggPCBwcm9wTGltaXQpIHtcbiAgICBjb25zdCBpc0NsYXNzQmFzZWQgPSBwcm9wSW5kZXggPj0gY2xhc3Nlc1N0YXJ0SW5kZXg7XG4gICAgY29uc3QgcHJvY2Vzc1ZhbHVlID1cbiAgICAgICAgKCFpc0NsYXNzQmFzZWQgJiYgIWlnbm9yZUFsbFN0eWxlVXBkYXRlcykgfHwgKGlzQ2xhc3NCYXNlZCAmJiAhaWdub3JlQWxsQ2xhc3NVcGRhdGVzKTtcbiAgICBpZiAocHJvY2Vzc1ZhbHVlKSB7XG4gICAgICBjb25zdCBhZGp1c3RlZFByb3BJbmRleCA9IGlzQ2xhc3NCYXNlZCA/IHByb3BJbmRleCAtIGNsYXNzZXNTdGFydEluZGV4IDogcHJvcEluZGV4O1xuICAgICAgY29uc3QgcHJvcCA9IGlzQ2xhc3NCYXNlZCA/IGNsYXNzTmFtZXNbYWRqdXN0ZWRQcm9wSW5kZXhdIDogc3R5bGVQcm9wc1thZGp1c3RlZFByb3BJbmRleF07XG4gICAgICBjb25zdCB2YWx1ZTogc3RyaW5nfGJvb2xlYW4gPVxuICAgICAgICAgIGlzQ2xhc3NCYXNlZCA/IChhcHBseUFsbENsYXNzZXMgPyB0cnVlIDogY2xhc3Nlc1twcm9wXSkgOiBzdHlsZXNbcHJvcF07XG4gICAgICBjb25zdCBmbGFnID0gcHJlcGFyZUluaXRpYWxGbGFnKHByb3AsIGlzQ2xhc3NCYXNlZCwgc2FuaXRpemVyKSB8IFN0eWxpbmdGbGFncy5EaXJ0eTtcbiAgICAgIGNvbnN0IHBsYXllckJ1aWxkZXJJbmRleCA9XG4gICAgICAgICAgaXNDbGFzc0Jhc2VkID8gY2xhc3Nlc1BsYXllckJ1aWxkZXJJbmRleCA6IHN0eWxlc1BsYXllckJ1aWxkZXJJbmRleDtcbiAgICAgIGNvbnRleHQucHVzaChmbGFnLCBwcm9wLCB2YWx1ZSwgcGxheWVyQnVpbGRlckluZGV4KTtcbiAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcHJvcEluZGV4Kys7XG4gIH1cblxuICBpZiAoZGlydHkpIHtcbiAgICBzZXRDb250ZXh0RGlydHkoY29udGV4dCwgdHJ1ZSk7XG4gIH1cblxuICBpZiAocGxheWVyQnVpbGRlcnNBcmVEaXJ0eSkge1xuICAgIHNldENvbnRleHRQbGF5ZXJzRGlydHkoY29udGV4dCwgdHJ1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZXRzIGFuZCByZXNvbHZlcyBhIHNpbmdsZSBzdHlsaW5nIHByb3BlcnR5L3ZhbHVlIG9uIHRoZSBwcm92aWRlZCBgU3R5bGluZ0NvbnRleHRgIHNvXG4gKiB0aGF0IHRoZXkgY2FuIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnQgb25jZSBgcmVuZGVyU3R5bGVBbmRDbGFzc0JpbmRpbmdzYCBpcyBjYWxsZWQuXG4gKlxuICogTm90ZSB0aGF0IHByb3AtbGV2ZWwgc3R5bGluZyB2YWx1ZXMgYXJlIGNvbnNpZGVyZWQgaGlnaGVyIHByaW9yaXR5IHRoYW4gYW55IHN0eWxpbmcgdGhhdFxuICogaGFzIGJlZW4gYXBwbGllZCB1c2luZyBgdXBkYXRlU3R5bGluZ01hcGAsIHRoZXJlZm9yZSwgd2hlbiBzdHlsaW5nIHZhbHVlcyBhcmUgcmVuZGVyZWRcbiAqIHRoZW4gYW55IHN0eWxlcy9jbGFzc2VzIHRoYXQgaGF2ZSBiZWVuIGFwcGxpZWQgdXNpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNvbnNpZGVyZWQgZmlyc3RcbiAqICh0aGVuIG11bHRpIHZhbHVlcyBzZWNvbmQgYW5kIHRoZW4gaW5pdGlhbCB2YWx1ZXMgYXMgYSBiYWNrdXApLlxuICpcbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBzdHlsaW5nIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVwZGF0ZWQgd2l0aCB0aGVcbiAqICAgIG5ld2x5IHByb3ZpZGVkIHN0eWxlIHZhbHVlLlxuICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgcHJvcGVydHkgd2hpY2ggaXMgYmVpbmcgdXBkYXRlZC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgQ1NTIHN0eWxlIHZhbHVlIHRoYXQgd2lsbCBiZSBhc3NpZ25lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3R5bGVQcm9wKFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLFxuICAgIGlucHV0OiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCB8IEJvdW5kUGxheWVyRmFjdG9yeTxzdHJpbmd8Ym9vbGVhbnxudWxsPik6IHZvaWQge1xuICBjb25zdCBzaW5nbGVJbmRleCA9IFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uICsgaW5kZXggKiBTdHlsaW5nSW5kZXguU2l6ZTtcbiAgY29uc3QgY3VyclZhbHVlID0gZ2V0VmFsdWUoY29udGV4dCwgc2luZ2xlSW5kZXgpO1xuICBjb25zdCBjdXJyRmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIHNpbmdsZUluZGV4KTtcbiAgY29uc3QgdmFsdWU6IHN0cmluZ3xib29sZWFufG51bGwgPSAoaW5wdXQgaW5zdGFuY2VvZiBCb3VuZFBsYXllckZhY3RvcnkpID8gaW5wdXQudmFsdWUgOiBpbnB1dDtcblxuICAvLyBkaWRuJ3QgY2hhbmdlIC4uLiBub3RoaW5nIHRvIG1ha2UgYSBub3RlIG9mXG4gIGlmIChoYXNWYWx1ZUNoYW5nZWQoY3VyckZsYWcsIGN1cnJWYWx1ZSwgdmFsdWUpKSB7XG4gICAgY29uc3QgaXNDbGFzc0Jhc2VkID0gKGN1cnJGbGFnICYgU3R5bGluZ0ZsYWdzLkNsYXNzKSA9PT0gU3R5bGluZ0ZsYWdzLkNsYXNzO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBjb250ZXh0W1N0eWxpbmdJbmRleC5FbGVtZW50UG9zaXRpb25dICFhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBwbGF5ZXJCdWlsZGVyID0gaW5wdXQgaW5zdGFuY2VvZiBCb3VuZFBsYXllckZhY3RvcnkgP1xuICAgICAgICBuZXcgQ2xhc3NBbmRTdHlsZVBsYXllckJ1aWxkZXIoXG4gICAgICAgICAgICBpbnB1dCBhcyBhbnksIGVsZW1lbnQsIGlzQ2xhc3NCYXNlZCA/IEJpbmRpbmdUeXBlLkNsYXNzIDogQmluZGluZ1R5cGUuU3R5bGUpIDpcbiAgICAgICAgbnVsbDtcbiAgICBjb25zdCB2YWx1ZSA9IChwbGF5ZXJCdWlsZGVyID8gKGlucHV0IGFzIEJvdW5kUGxheWVyRmFjdG9yeTxhbnk+KS52YWx1ZSA6IGlucHV0KSBhcyBzdHJpbmcgfFxuICAgICAgICBib29sZWFuIHwgbnVsbDtcbiAgICBjb25zdCBjdXJyUGxheWVySW5kZXggPSBnZXRQbGF5ZXJCdWlsZGVySW5kZXgoY29udGV4dCwgc2luZ2xlSW5kZXgpO1xuXG4gICAgbGV0IHBsYXllckJ1aWxkZXJzQXJlRGlydHkgPSBmYWxzZTtcbiAgICBsZXQgcGxheWVyQnVpbGRlckluZGV4ID0gcGxheWVyQnVpbGRlciA/IGN1cnJQbGF5ZXJJbmRleCA6IDA7XG4gICAgaWYgKGhhc1BsYXllckJ1aWxkZXJDaGFuZ2VkKGNvbnRleHQsIHBsYXllckJ1aWxkZXIsIGN1cnJQbGF5ZXJJbmRleCkpIHtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gc2V0UGxheWVyQnVpbGRlcihjb250ZXh0LCBwbGF5ZXJCdWlsZGVyLCBjdXJyUGxheWVySW5kZXgpO1xuICAgICAgcGxheWVyQnVpbGRlckluZGV4ID0gcGxheWVyQnVpbGRlciA/IG5ld0luZGV4IDogMDtcbiAgICAgIHNldFBsYXllckJ1aWxkZXJJbmRleChjb250ZXh0LCBzaW5nbGVJbmRleCwgcGxheWVyQnVpbGRlckluZGV4KTtcbiAgICAgIHBsYXllckJ1aWxkZXJzQXJlRGlydHkgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIHRoZSB2YWx1ZSB3aWxsIGFsd2F5cyBnZXQgdXBkYXRlZCAoZXZlbiBpZiB0aGUgZGlydHkgZmxhZyBpcyBza2lwcGVkKVxuICAgIHNldFZhbHVlKGNvbnRleHQsIHNpbmdsZUluZGV4LCB2YWx1ZSk7XG4gICAgY29uc3QgaW5kZXhGb3JNdWx0aSA9IGdldE11bHRpT3JTaW5nbGVJbmRleChjdXJyRmxhZyk7XG5cbiAgICAvLyBpZiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUgaW4gdGhlIG11bHRpLWFyZWEgdGhlbiB0aGVyZSdzIG5vIHBvaW50IGluIHJlLWFzc2VtYmxpbmdcbiAgICBjb25zdCB2YWx1ZUZvck11bHRpID0gZ2V0VmFsdWUoY29udGV4dCwgaW5kZXhGb3JNdWx0aSk7XG4gICAgaWYgKCF2YWx1ZUZvck11bHRpIHx8IGhhc1ZhbHVlQ2hhbmdlZChjdXJyRmxhZywgdmFsdWVGb3JNdWx0aSwgdmFsdWUpKSB7XG4gICAgICBsZXQgbXVsdGlEaXJ0eSA9IGZhbHNlO1xuICAgICAgbGV0IHNpbmdsZURpcnR5ID0gdHJ1ZTtcblxuICAgICAgLy8gb25seSB3aGVuIHRoZSB2YWx1ZSBpcyBzZXQgdG8gYG51bGxgIHNob3VsZCB0aGUgbXVsdGktdmFsdWUgZ2V0IGZsYWdnZWRcbiAgICAgIGlmICghdmFsdWVFeGlzdHModmFsdWUsIGlzQ2xhc3NCYXNlZCkgJiYgdmFsdWVFeGlzdHModmFsdWVGb3JNdWx0aSwgaXNDbGFzc0Jhc2VkKSkge1xuICAgICAgICBtdWx0aURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgc2luZ2xlRGlydHkgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgc2V0RGlydHkoY29udGV4dCwgaW5kZXhGb3JNdWx0aSwgbXVsdGlEaXJ0eSk7XG4gICAgICBzZXREaXJ0eShjb250ZXh0LCBzaW5nbGVJbmRleCwgc2luZ2xlRGlydHkpO1xuICAgICAgc2V0Q29udGV4dERpcnR5KGNvbnRleHQsIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChwbGF5ZXJCdWlsZGVyc0FyZURpcnR5KSB7XG4gICAgICBzZXRDb250ZXh0UGxheWVyc0RpcnR5KGNvbnRleHQsIHRydWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHdpbGwgdG9nZ2xlIHRoZSByZWZlcmVuY2VkIENTUyBjbGFzcyAoYnkgdGhlIHByb3ZpZGVkIGluZGV4KVxuICogd2l0aGluIHRoZSBnaXZlbiBjb250ZXh0LlxuICpcbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBzdHlsaW5nIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVwZGF0ZWQgd2l0aCB0aGVcbiAqICAgIG5ld2x5IHByb3ZpZGVkIGNsYXNzIHZhbHVlLlxuICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgQ1NTIGNsYXNzIHdoaWNoIGlzIGJlaW5nIHVwZGF0ZWQuXG4gKiBAcGFyYW0gYWRkT3JSZW1vdmUgV2hldGhlciBvciBub3QgdG8gYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDbGFzc1Byb3AoXG4gICAgY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIsXG4gICAgYWRkT3JSZW1vdmU6IGJvb2xlYW4gfCBCb3VuZFBsYXllckZhY3Rvcnk8Ym9vbGVhbj4pOiB2b2lkIHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgY29udGV4dFtTdHlsaW5nSW5kZXguQ2xhc3NPZmZzZXRQb3NpdGlvbl07XG4gIHVwZGF0ZVN0eWxlUHJvcChjb250ZXh0LCBhZGp1c3RlZEluZGV4LCBhZGRPclJlbW92ZSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhbGwgcXVldWVkIHN0eWxpbmcgdXNpbmcgYSByZW5kZXJlciBvbnRvIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd29ya3MgYnkgcmVuZGVyaW5nIGFueSBzdHlsZXMgKHRoYXQgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqIHVzaW5nIGB1cGRhdGVTdHlsaW5nTWFwYCkgYW5kIGFueSBjbGFzc2VzICh0aGF0IGhhdmUgYmVlbiBhcHBsaWVkIHVzaW5nXG4gKiBgdXBkYXRlU3R5bGVQcm9wYCkgb250byB0aGUgcHJvdmlkZWQgZWxlbWVudCB1c2luZyB0aGUgcHJvdmlkZWQgcmVuZGVyZXIuXG4gKiBKdXN0IGJlZm9yZSB0aGUgc3R5bGVzL2NsYXNzZXMgYXJlIHJlbmRlcmVkIGEgZmluYWwga2V5L3ZhbHVlIHN0eWxlIG1hcFxuICogd2lsbCBiZSBhc3NlbWJsZWQgKGlmIGBzdHlsZVN0b3JlYCBvciBgY2xhc3NTdG9yZWAgYXJlIHByb3ZpZGVkKS5cbiAqXG4gKiBAcGFyYW0gbEVsZW1lbnQgdGhlIGVsZW1lbnQgdGhhdCB0aGUgc3R5bGVzIHdpbGwgYmUgcmVuZGVyZWQgb25cbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBzdHlsaW5nIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lXG4gKiAgICAgIHdoYXQgc3R5bGVzIHdpbGwgYmUgcmVuZGVyZWRcbiAqIEBwYXJhbSByZW5kZXJlciB0aGUgcmVuZGVyZXIgdGhhdCB3aWxsIGJlIHVzZWQgdG8gYXBwbHkgdGhlIHN0eWxpbmdcbiAqIEBwYXJhbSBjbGFzc2VzU3RvcmUgaWYgcHJvdmlkZWQsIHRoZSB1cGRhdGVkIGNsYXNzIHZhbHVlcyB3aWxsIGJlIGFwcGxpZWRcbiAqICAgIHRvIHRoaXMga2V5L3ZhbHVlIG1hcCBpbnN0ZWFkIG9mIGJlaW5nIHJlbmRlcmVyZWQgdmlhIHRoZSByZW5kZXJlci5cbiAqIEBwYXJhbSBzdHlsZXNTdG9yZSBpZiBwcm92aWRlZCwgdGhlIHVwZGF0ZWQgc3R5bGUgdmFsdWVzIHdpbGwgYmUgYXBwbGllZFxuICogICAgdG8gdGhpcyBrZXkvdmFsdWUgbWFwIGluc3RlYWQgb2YgYmVpbmcgcmVuZGVyZXJlZCB2aWEgdGhlIHJlbmRlcmVyLlxuICogQHJldHVybnMgbnVtYmVyIHRoZSB0b3RhbCBhbW91bnQgb2YgcGxheWVycyB0aGF0IGdvdCBxdWV1ZWQgZm9yIGFuaW1hdGlvbiAoaWYgYW55KVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3R5bGVBbmRDbGFzc0JpbmRpbmdzKFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCByZW5kZXJlcjogUmVuZGVyZXIzLCByb290T3JWaWV3OiBSb290Q29udGV4dCB8IExWaWV3RGF0YSxcbiAgICBjbGFzc2VzU3RvcmU/OiBCaW5kaW5nU3RvcmUgfCBudWxsLCBzdHlsZXNTdG9yZT86IEJpbmRpbmdTdG9yZSB8IG51bGwpOiBudW1iZXIge1xuICBsZXQgdG90YWxQbGF5ZXJzUXVldWVkID0gMDtcbiAgaWYgKGlzQ29udGV4dERpcnR5KGNvbnRleHQpKSB7XG4gICAgY29uc3QgZmx1c2hQbGF5ZXJCdWlsZGVyczogYW55ID1cbiAgICAgICAgY29udGV4dFtTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uXSAmIFN0eWxpbmdGbGFncy5QbGF5ZXJCdWlsZGVyc0RpcnR5O1xuICAgIGNvbnN0IG5hdGl2ZSA9IGNvbnRleHRbU3R5bGluZ0luZGV4LkVsZW1lbnRQb3NpdGlvbl0gITtcbiAgICBjb25zdCBtdWx0aVN0YXJ0SW5kZXggPSBnZXRNdWx0aVN0YXJ0SW5kZXgoY29udGV4dCk7XG4gICAgY29uc3Qgc3R5bGVTYW5pdGl6ZXIgPSBnZXRTdHlsZVNhbml0aXplcihjb250ZXh0KTtcbiAgICBjb25zdCBvbmx5U2luZ2xlQ2xhc3NlcyA9IGxpbWl0VG9TaW5nbGVDbGFzc2VzKGNvbnRleHQpO1xuXG4gICAgZm9yIChsZXQgaSA9IFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uOyBpIDwgY29udGV4dC5sZW5ndGg7XG4gICAgICAgICBpICs9IFN0eWxpbmdJbmRleC5TaXplKSB7XG4gICAgICAvLyB0aGVyZSBpcyBubyBwb2ludCBpbiByZW5kZXJpbmcgc3R5bGVzIHRoYXQgaGF2ZSBub3QgY2hhbmdlZCBvbiBzY3JlZW5cbiAgICAgIGlmIChpc0RpcnR5KGNvbnRleHQsIGkpKSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSBnZXRQcm9wKGNvbnRleHQsIGkpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlKGNvbnRleHQsIGkpO1xuICAgICAgICBjb25zdCBmbGFnID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgaSk7XG4gICAgICAgIGNvbnN0IHBsYXllckJ1aWxkZXIgPSBnZXRQbGF5ZXJCdWlsZGVyKGNvbnRleHQsIGkpO1xuICAgICAgICBjb25zdCBpc0NsYXNzQmFzZWQgPSBmbGFnICYgU3R5bGluZ0ZsYWdzLkNsYXNzID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBjb25zdCBpc0luU2luZ2xlUmVnaW9uID0gaSA8IG11bHRpU3RhcnRJbmRleDtcbiAgICAgICAgY29uc3QgcmVhZEluaXRpYWxWYWx1ZSA9ICFpc0NsYXNzQmFzZWQgfHwgIW9ubHlTaW5nbGVDbGFzc2VzO1xuXG4gICAgICAgIGxldCB2YWx1ZVRvQXBwbHk6IHN0cmluZ3xib29sZWFufG51bGwgPSB2YWx1ZTtcblxuICAgICAgICAvLyBWQUxVRSBERUZFUiBDQVNFIDE6IFVzZSBhIG11bHRpIHZhbHVlIGluc3RlYWQgb2YgYSBudWxsIHNpbmdsZSB2YWx1ZVxuICAgICAgICAvLyB0aGlzIGNoZWNrIGltcGxpZXMgdGhhdCBhIHNpbmdsZSB2YWx1ZSB3YXMgcmVtb3ZlZCBhbmQgd2VcbiAgICAgICAgLy8gc2hvdWxkIG5vdyBkZWZlciB0byBhIG11bHRpIHZhbHVlIGFuZCB1c2UgdGhhdCAoaWYgc2V0KS5cbiAgICAgICAgaWYgKGlzSW5TaW5nbGVSZWdpb24gJiYgIXZhbHVlRXhpc3RzKHZhbHVlVG9BcHBseSwgaXNDbGFzc0Jhc2VkKSkge1xuICAgICAgICAgIC8vIHNpbmdsZSB2YWx1ZXMgQUxXQVlTIGhhdmUgYSByZWZlcmVuY2UgdG8gYSBtdWx0aSBpbmRleFxuICAgICAgICAgIGNvbnN0IG11bHRpSW5kZXggPSBnZXRNdWx0aU9yU2luZ2xlSW5kZXgoZmxhZyk7XG4gICAgICAgICAgdmFsdWVUb0FwcGx5ID0gZ2V0VmFsdWUoY29udGV4dCwgbXVsdGlJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWQUxVRSBERUZFUiBDQVNFIDI6IFVzZSB0aGUgaW5pdGlhbCB2YWx1ZSBpZiBhbGwgZWxzZSBmYWlscyAoaXMgZmFsc3kpXG4gICAgICAgIC8vIHRoZSBpbml0aWFsIHZhbHVlIHdpbGwgYWx3YXlzIGJlIGEgc3RyaW5nIG9yIG51bGwsXG4gICAgICAgIC8vIHRoZXJlZm9yZSB3ZSBjYW4gc2FmZWx5IGFkb3B0IGl0IGluY2FzZSB0aGVyZSdzIG5vdGhpbmcgZWxzZVxuICAgICAgICAvLyBub3RlIHRoYXQgdGhpcyBzaG91bGQgYWx3YXlzIGJlIGEgZmFsc3kgY2hlY2sgc2luY2UgYGZhbHNlYCBpcyB1c2VkXG4gICAgICAgIC8vIGZvciBib3RoIGNsYXNzIGFuZCBzdHlsZSBjb21wYXJpc29ucyAoc3R5bGVzIGNhbid0IGJlIGZhbHNlIGFuZCBmYWxzZVxuICAgICAgICAvLyBjbGFzc2VzIGFyZSB0dXJuZWQgb2ZmIGFuZCBzaG91bGQgdGhlcmVmb3JlIGRlZmVyIHRvIHRoZWlyIGluaXRpYWwgdmFsdWVzKVxuICAgICAgICBpZiAoIXZhbHVlRXhpc3RzKHZhbHVlVG9BcHBseSwgaXNDbGFzc0Jhc2VkKSAmJiByZWFkSW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgdmFsdWVUb0FwcGx5ID0gZ2V0SW5pdGlhbFZhbHVlKGNvbnRleHQsIGZsYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQ2xhc3NCYXNlZCkge1xuICAgICAgICAgIHNldENsYXNzKFxuICAgICAgICAgICAgICBuYXRpdmUsIHByb3AsIHZhbHVlVG9BcHBseSA/IHRydWUgOiBmYWxzZSwgcmVuZGVyZXIsIGNsYXNzZXNTdG9yZSwgcGxheWVyQnVpbGRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVyID0gKGZsYWcgJiBTdHlsaW5nRmxhZ3MuU2FuaXRpemUpID8gc3R5bGVTYW5pdGl6ZXIgOiBudWxsO1xuICAgICAgICAgIHNldFN0eWxlKFxuICAgICAgICAgICAgICBuYXRpdmUsIHByb3AsIHZhbHVlVG9BcHBseSBhcyBzdHJpbmcgfCBudWxsLCByZW5kZXJlciwgc2FuaXRpemVyLCBzdHlsZXNTdG9yZSxcbiAgICAgICAgICAgICAgcGxheWVyQnVpbGRlcik7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RGlydHkoY29udGV4dCwgaSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmbHVzaFBsYXllckJ1aWxkZXJzKSB7XG4gICAgICBjb25zdCByb290Q29udGV4dCA9XG4gICAgICAgICAgQXJyYXkuaXNBcnJheShyb290T3JWaWV3KSA/IGdldFJvb3RDb250ZXh0KHJvb3RPclZpZXcpIDogcm9vdE9yVmlldyBhcyBSb290Q29udGV4dDtcbiAgICAgIGNvbnN0IHBsYXllckNvbnRleHQgPSBnZXRQbGF5ZXJDb250ZXh0KGNvbnRleHQpICE7XG4gICAgICBjb25zdCBwbGF5ZXJzU3RhcnRJbmRleCA9IHBsYXllckNvbnRleHRbUGxheWVySW5kZXguTm9uQnVpbGRlclBsYXllcnNTdGFydF07XG4gICAgICBmb3IgKGxldCBpID0gUGxheWVySW5kZXguUGxheWVyQnVpbGRlcnNTdGFydFBvc2l0aW9uOyBpIDwgcGxheWVyc1N0YXJ0SW5kZXg7XG4gICAgICAgICAgIGkgKz0gUGxheWVySW5kZXguUGxheWVyQW5kUGxheWVyQnVpbGRlcnNUdXBsZVNpemUpIHtcbiAgICAgICAgY29uc3QgYnVpbGRlciA9IHBsYXllckNvbnRleHRbaV0gYXMgQ2xhc3NBbmRTdHlsZVBsYXllckJ1aWxkZXI8YW55PnwgbnVsbDtcbiAgICAgICAgY29uc3QgcGxheWVySW5zZXJ0aW9uSW5kZXggPSBpICsgUGxheWVySW5kZXguUGxheWVyT2Zmc2V0UG9zaXRpb247XG4gICAgICAgIGNvbnN0IG9sZFBsYXllciA9IHBsYXllckNvbnRleHRbcGxheWVySW5zZXJ0aW9uSW5kZXhdIGFzIFBsYXllciB8IG51bGw7XG4gICAgICAgIGlmIChidWlsZGVyKSB7XG4gICAgICAgICAgY29uc3QgcGxheWVyID0gYnVpbGRlci5idWlsZFBsYXllcihvbGRQbGF5ZXIpO1xuICAgICAgICAgIGlmIChwbGF5ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHBsYXllciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHdhc1F1ZXVlZCA9IGFkZFBsYXllckludGVybmFsKFxuICAgICAgICAgICAgICAgICAgcGxheWVyQ29udGV4dCwgcm9vdENvbnRleHQsIG5hdGl2ZSBhcyBIVE1MRWxlbWVudCwgcGxheWVyLCBwbGF5ZXJJbnNlcnRpb25JbmRleCk7XG4gICAgICAgICAgICAgIHdhc1F1ZXVlZCAmJiB0b3RhbFBsYXllcnNRdWV1ZWQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvbGRQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgb2xkUGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2xkUGxheWVyKSB7XG4gICAgICAgICAgLy8gdGhlIHBsYXllciBidWlsZGVyIGhhcyBiZWVuIHJlbW92ZWQgLi4uIHRoZXJlZm9yZSB3ZSBzaG91bGQgZGVsZXRlIHRoZSBhc3NvY2lhdGVkXG4gICAgICAgICAgLy8gcGxheWVyXG4gICAgICAgICAgb2xkUGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0Q29udGV4dFBsYXllcnNEaXJ0eShjb250ZXh0LCBmYWxzZSk7XG4gICAgfVxuICAgIHNldENvbnRleHREaXJ0eShjb250ZXh0LCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gdG90YWxQbGF5ZXJzUXVldWVkO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmVuZGVycyBhIGdpdmVuIENTUyBwcm9wL3ZhbHVlIGVudHJ5IHVzaW5nIHRoZVxuICogcHJvdmlkZWQgcmVuZGVyZXIuIElmIGEgYHN0b3JlYCB2YWx1ZSBpcyBwcm92aWRlZCB0aGVuXG4gKiB0aGF0IHdpbGwgYmUgdXNlZCBhIHJlbmRlciBjb250ZXh0IGluc3RlYWQgb2YgdGhlIHByb3ZpZGVkXG4gKiByZW5kZXJlci5cbiAqXG4gKiBAcGFyYW0gbmF0aXZlIHRoZSBET00gRWxlbWVudFxuICogQHBhcmFtIHByb3AgdGhlIENTUyBzdHlsZSBwcm9wZXJ0eSB0aGF0IHdpbGwgYmUgcmVuZGVyZWRcbiAqIEBwYXJhbSB2YWx1ZSB0aGUgQ1NTIHN0eWxlIHZhbHVlIHRoYXQgd2lsbCBiZSByZW5kZXJlZFxuICogQHBhcmFtIHJlbmRlcmVyXG4gKiBAcGFyYW0gc3RvcmUgYW4gb3B0aW9uYWwga2V5L3ZhbHVlIG1hcCB0aGF0IHdpbGwgYmUgdXNlZCBhcyBhIGNvbnRleHQgdG8gcmVuZGVyIHN0eWxlcyBvblxuICovXG5mdW5jdGlvbiBzZXRTdHlsZShcbiAgICBuYXRpdmU6IGFueSwgcHJvcDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVsbCwgcmVuZGVyZXI6IFJlbmRlcmVyMyxcbiAgICBzYW5pdGl6ZXI6IFN0eWxlU2FuaXRpemVGbiB8IG51bGwsIHN0b3JlPzogQmluZGluZ1N0b3JlIHwgbnVsbCxcbiAgICBwbGF5ZXJCdWlsZGVyPzogQ2xhc3NBbmRTdHlsZVBsYXllckJ1aWxkZXI8YW55PnwgbnVsbCkge1xuICB2YWx1ZSA9IHNhbml0aXplciAmJiB2YWx1ZSA/IHNhbml0aXplcihwcm9wLCB2YWx1ZSkgOiB2YWx1ZTtcbiAgaWYgKHN0b3JlIHx8IHBsYXllckJ1aWxkZXIpIHtcbiAgICBpZiAoc3RvcmUpIHtcbiAgICAgIHN0b3JlLnNldFZhbHVlKHByb3AsIHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHBsYXllckJ1aWxkZXIpIHtcbiAgICAgIHBsYXllckJ1aWxkZXIuc2V0VmFsdWUocHJvcCwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgIG5nRGV2TW9kZSAmJiBuZ0Rldk1vZGUucmVuZGVyZXJTZXRTdHlsZSsrO1xuICAgIGlzUHJvY2VkdXJhbFJlbmRlcmVyKHJlbmRlcmVyKSA/XG4gICAgICAgIHJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZSwgcHJvcCwgdmFsdWUsIFJlbmRlcmVyU3R5bGVGbGFnczMuRGFzaENhc2UpIDpcbiAgICAgICAgbmF0aXZlWydzdHlsZSddLnNldFByb3BlcnR5KHByb3AsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyUmVtb3ZlU3R5bGUrKztcbiAgICBpc1Byb2NlZHVyYWxSZW5kZXJlcihyZW5kZXJlcikgP1xuICAgICAgICByZW5kZXJlci5yZW1vdmVTdHlsZShuYXRpdmUsIHByb3AsIFJlbmRlcmVyU3R5bGVGbGFnczMuRGFzaENhc2UpIDpcbiAgICAgICAgbmF0aXZlWydzdHlsZSddLnJlbW92ZVByb3BlcnR5KHByb3ApO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZW5kZXJzIGEgZ2l2ZW4gQ1NTIGNsYXNzIHZhbHVlIHVzaW5nIHRoZSBwcm92aWRlZFxuICogcmVuZGVyZXIgKGJ5IGFkZGluZyBvciByZW1vdmluZyBpdCBmcm9tIHRoZSBwcm92aWRlZCBlbGVtZW50KS5cbiAqIElmIGEgYHN0b3JlYCB2YWx1ZSBpcyBwcm92aWRlZCB0aGVuIHRoYXQgd2lsbCBiZSB1c2VkIGEgcmVuZGVyXG4gKiBjb250ZXh0IGluc3RlYWQgb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyLlxuICpcbiAqIEBwYXJhbSBuYXRpdmUgdGhlIERPTSBFbGVtZW50XG4gKiBAcGFyYW0gcHJvcCB0aGUgQ1NTIHN0eWxlIHByb3BlcnR5IHRoYXQgd2lsbCBiZSByZW5kZXJlZFxuICogQHBhcmFtIHZhbHVlIHRoZSBDU1Mgc3R5bGUgdmFsdWUgdGhhdCB3aWxsIGJlIHJlbmRlcmVkXG4gKiBAcGFyYW0gcmVuZGVyZXJcbiAqIEBwYXJhbSBzdG9yZSBhbiBvcHRpb25hbCBrZXkvdmFsdWUgbWFwIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgY29udGV4dCB0byByZW5kZXIgc3R5bGVzIG9uXG4gKi9cbmZ1bmN0aW9uIHNldENsYXNzKFxuICAgIG5hdGl2ZTogYW55LCBjbGFzc05hbWU6IHN0cmluZywgYWRkOiBib29sZWFuLCByZW5kZXJlcjogUmVuZGVyZXIzLCBzdG9yZT86IEJpbmRpbmdTdG9yZSB8IG51bGwsXG4gICAgcGxheWVyQnVpbGRlcj86IENsYXNzQW5kU3R5bGVQbGF5ZXJCdWlsZGVyPGFueT58IG51bGwpIHtcbiAgaWYgKHN0b3JlIHx8IHBsYXllckJ1aWxkZXIpIHtcbiAgICBpZiAoc3RvcmUpIHtcbiAgICAgIHN0b3JlLnNldFZhbHVlKGNsYXNzTmFtZSwgYWRkKTtcbiAgICB9XG4gICAgaWYgKHBsYXllckJ1aWxkZXIpIHtcbiAgICAgIHBsYXllckJ1aWxkZXIuc2V0VmFsdWUoY2xhc3NOYW1lLCBhZGQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhZGQpIHtcbiAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyQWRkQ2xhc3MrKztcbiAgICBpc1Byb2NlZHVyYWxSZW5kZXJlcihyZW5kZXJlcikgPyByZW5kZXJlci5hZGRDbGFzcyhuYXRpdmUsIGNsYXNzTmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZVsnY2xhc3NMaXN0J10uYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5yZW5kZXJlclJlbW92ZUNsYXNzKys7XG4gICAgaXNQcm9jZWR1cmFsUmVuZGVyZXIocmVuZGVyZXIpID8gcmVuZGVyZXIucmVtb3ZlQ2xhc3MobmF0aXZlLCBjbGFzc05hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVbJ2NsYXNzTGlzdCddLnJlbW92ZShjbGFzc05hbWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldERpcnR5KGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLCBpc0RpcnR5WWVzOiBib29sZWFuKSB7XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPVxuICAgICAgaW5kZXggPj0gU3R5bGluZ0luZGV4LlNpbmdsZVN0eWxlc1N0YXJ0UG9zaXRpb24gPyAoaW5kZXggKyBTdHlsaW5nSW5kZXguRmxhZ3NPZmZzZXQpIDogaW5kZXg7XG4gIGlmIChpc0RpcnR5WWVzKSB7XG4gICAgKGNvbnRleHRbYWRqdXN0ZWRJbmRleF0gYXMgbnVtYmVyKSB8PSBTdHlsaW5nRmxhZ3MuRGlydHk7XG4gIH0gZWxzZSB7XG4gICAgKGNvbnRleHRbYWRqdXN0ZWRJbmRleF0gYXMgbnVtYmVyKSAmPSB+U3R5bGluZ0ZsYWdzLkRpcnR5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzRGlydHkoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9XG4gICAgICBpbmRleCA+PSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbiA/IChpbmRleCArIFN0eWxpbmdJbmRleC5GbGFnc09mZnNldCkgOiBpbmRleDtcbiAgcmV0dXJuICgoY29udGV4dFthZGp1c3RlZEluZGV4XSBhcyBudW1iZXIpICYgU3R5bGluZ0ZsYWdzLkRpcnR5KSA9PSBTdHlsaW5nRmxhZ3MuRGlydHk7XG59XG5cbmZ1bmN0aW9uIGlzQ2xhc3NCYXNlZChjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID1cbiAgICAgIGluZGV4ID49IFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uID8gKGluZGV4ICsgU3R5bGluZ0luZGV4LkZsYWdzT2Zmc2V0KSA6IGluZGV4O1xuICByZXR1cm4gKChjb250ZXh0W2FkanVzdGVkSW5kZXhdIGFzIG51bWJlcikgJiBTdHlsaW5nRmxhZ3MuQ2xhc3MpID09IFN0eWxpbmdGbGFncy5DbGFzcztcbn1cblxuZnVuY3Rpb24gaXNTYW5pdGl6YWJsZShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID1cbiAgICAgIGluZGV4ID49IFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uID8gKGluZGV4ICsgU3R5bGluZ0luZGV4LkZsYWdzT2Zmc2V0KSA6IGluZGV4O1xuICByZXR1cm4gKChjb250ZXh0W2FkanVzdGVkSW5kZXhdIGFzIG51bWJlcikgJiBTdHlsaW5nRmxhZ3MuU2FuaXRpemUpID09IFN0eWxpbmdGbGFncy5TYW5pdGl6ZTtcbn1cblxuZnVuY3Rpb24gcG9pbnRlcnMoY29uZmlnRmxhZzogbnVtYmVyLCBzdGF0aWNJbmRleDogbnVtYmVyLCBkeW5hbWljSW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gKGNvbmZpZ0ZsYWcgJiBTdHlsaW5nRmxhZ3MuQml0TWFzaykgfCAoc3RhdGljSW5kZXggPDwgU3R5bGluZ0ZsYWdzLkJpdENvdW50U2l6ZSkgfFxuICAgICAgKGR5bmFtaWNJbmRleCA8PCAoU3R5bGluZ0luZGV4LkJpdENvdW50U2l6ZSArIFN0eWxpbmdGbGFncy5CaXRDb3VudFNpemUpKTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5pdGlhbFZhbHVlKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBmbGFnOiBudW1iZXIpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IGluZGV4ID0gZ2V0SW5pdGlhbEluZGV4KGZsYWcpO1xuICByZXR1cm4gY29udGV4dFtTdHlsaW5nSW5kZXguSW5pdGlhbFN0eWxlc1Bvc2l0aW9uXVtpbmRleF0gYXMgbnVsbCB8IHN0cmluZztcbn1cblxuZnVuY3Rpb24gZ2V0SW5pdGlhbEluZGV4KGZsYWc6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiAoZmxhZyA+PiBTdHlsaW5nRmxhZ3MuQml0Q291bnRTaXplKSAmIFN0eWxpbmdJbmRleC5CaXRNYXNrO1xufVxuXG5mdW5jdGlvbiBnZXRNdWx0aU9yU2luZ2xlSW5kZXgoZmxhZzogbnVtYmVyKTogbnVtYmVyIHtcbiAgY29uc3QgaW5kZXggPVxuICAgICAgKGZsYWcgPj4gKFN0eWxpbmdJbmRleC5CaXRDb3VudFNpemUgKyBTdHlsaW5nRmxhZ3MuQml0Q291bnRTaXplKSkgJiBTdHlsaW5nSW5kZXguQml0TWFzaztcbiAgcmV0dXJuIGluZGV4ID49IFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uID8gaW5kZXggOiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0TXVsdGlTdGFydEluZGV4KGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0KTogbnVtYmVyIHtcbiAgcmV0dXJuIGdldE11bHRpT3JTaW5nbGVJbmRleChjb250ZXh0W1N0eWxpbmdJbmRleC5NYXN0ZXJGbGFnUG9zaXRpb25dKSBhcyBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGdldFN0eWxlU2FuaXRpemVyKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0KTogU3R5bGVTYW5pdGl6ZUZufG51bGwge1xuICByZXR1cm4gY29udGV4dFtTdHlsaW5nSW5kZXguU3R5bGVTYW5pdGl6ZXJQb3NpdGlvbl07XG59XG5cbmZ1bmN0aW9uIHNldFByb3AoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIsIHByb3A6IHN0cmluZykge1xuICBjb250ZXh0W2luZGV4ICsgU3R5bGluZ0luZGV4LlByb3BlcnR5T2Zmc2V0XSA9IHByb3A7XG59XG5cbmZ1bmN0aW9uIHNldFZhbHVlKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nIHwgbnVsbCB8IGJvb2xlYW4pIHtcbiAgY29udGV4dFtpbmRleCArIFN0eWxpbmdJbmRleC5WYWx1ZU9mZnNldF0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaGFzUGxheWVyQnVpbGRlckNoYW5nZWQoXG4gICAgY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGJ1aWxkZXI6IENsYXNzQW5kU3R5bGVQbGF5ZXJCdWlsZGVyPGFueT58IG51bGwsIGluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgcGxheWVyQ29udGV4dCA9IGNvbnRleHRbU3R5bGluZ0luZGV4LlBsYXllckNvbnRleHRdICE7XG4gIGlmIChidWlsZGVyKSB7XG4gICAgaWYgKCFwbGF5ZXJDb250ZXh0IHx8IGluZGV4ID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBsYXllckNvbnRleHQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHBsYXllckNvbnRleHRbaW5kZXhdICE9PSBidWlsZGVyO1xufVxuXG5mdW5jdGlvbiBzZXRQbGF5ZXJCdWlsZGVyKFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBidWlsZGVyOiBDbGFzc0FuZFN0eWxlUGxheWVyQnVpbGRlcjxhbnk+fCBudWxsLFxuICAgIGluc2VydGlvbkluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgcGxheWVyQ29udGV4dCA9IGNvbnRleHRbU3R5bGluZ0luZGV4LlBsYXllckNvbnRleHRdIHx8IGFsbG9jUGxheWVyQ29udGV4dChjb250ZXh0KTtcbiAgaWYgKGluc2VydGlvbkluZGV4ID4gMCkge1xuICAgIHBsYXllckNvbnRleHRbaW5zZXJ0aW9uSW5kZXhdID0gYnVpbGRlcjtcbiAgfSBlbHNlIHtcbiAgICBpbnNlcnRpb25JbmRleCA9IHBsYXllckNvbnRleHRbUGxheWVySW5kZXguTm9uQnVpbGRlclBsYXllcnNTdGFydF07XG4gICAgcGxheWVyQ29udGV4dC5zcGxpY2UoaW5zZXJ0aW9uSW5kZXgsIDAsIGJ1aWxkZXIsIG51bGwpO1xuICAgIHBsYXllckNvbnRleHRbUGxheWVySW5kZXguTm9uQnVpbGRlclBsYXllcnNTdGFydF0gKz1cbiAgICAgICAgUGxheWVySW5kZXguUGxheWVyQW5kUGxheWVyQnVpbGRlcnNUdXBsZVNpemU7XG4gIH1cbiAgcmV0dXJuIGluc2VydGlvbkluZGV4O1xufVxuXG5mdW5jdGlvbiBzZXRQbGF5ZXJCdWlsZGVySW5kZXgoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIsIHBsYXllckJ1aWxkZXJJbmRleDogbnVtYmVyKSB7XG4gIGNvbnRleHRbaW5kZXggKyBTdHlsaW5nSW5kZXguUGxheWVyQnVpbGRlckluZGV4T2Zmc2V0XSA9IHBsYXllckJ1aWxkZXJJbmRleDtcbn1cblxuZnVuY3Rpb24gZ2V0UGxheWVyQnVpbGRlckluZGV4KGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIChjb250ZXh0W2luZGV4ICsgU3R5bGluZ0luZGV4LlBsYXllckJ1aWxkZXJJbmRleE9mZnNldF0gYXMgbnVtYmVyKSB8fCAwO1xufVxuXG5mdW5jdGlvbiBnZXRQbGF5ZXJCdWlsZGVyKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKTogQ2xhc3NBbmRTdHlsZVBsYXllckJ1aWxkZXI8YW55PnxcbiAgICBudWxsIHtcbiAgY29uc3QgcGxheWVyQnVpbGRlckluZGV4ID0gZ2V0UGxheWVyQnVpbGRlckluZGV4KGNvbnRleHQsIGluZGV4KTtcbiAgaWYgKHBsYXllckJ1aWxkZXJJbmRleCkge1xuICAgIGNvbnN0IHBsYXllckNvbnRleHQgPSBjb250ZXh0W1N0eWxpbmdJbmRleC5QbGF5ZXJDb250ZXh0XTtcbiAgICBpZiAocGxheWVyQ29udGV4dCkge1xuICAgICAgcmV0dXJuIHBsYXllckNvbnRleHRbcGxheWVyQnVpbGRlckluZGV4XSBhcyBDbGFzc0FuZFN0eWxlUGxheWVyQnVpbGRlcjxhbnk+fCBudWxsO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0RmxhZyhjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlciwgZmxhZzogbnVtYmVyKSB7XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPVxuICAgICAgaW5kZXggPT09IFN0eWxpbmdJbmRleC5NYXN0ZXJGbGFnUG9zaXRpb24gPyBpbmRleCA6IChpbmRleCArIFN0eWxpbmdJbmRleC5GbGFnc09mZnNldCk7XG4gIGNvbnRleHRbYWRqdXN0ZWRJbmRleF0gPSBmbGFnO1xufVxuXG5mdW5jdGlvbiBnZXRQb2ludGVycyhjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPVxuICAgICAgaW5kZXggPT09IFN0eWxpbmdJbmRleC5NYXN0ZXJGbGFnUG9zaXRpb24gPyBpbmRleCA6IChpbmRleCArIFN0eWxpbmdJbmRleC5GbGFnc09mZnNldCk7XG4gIHJldHVybiBjb250ZXh0W2FkanVzdGVkSW5kZXhdIGFzIG51bWJlcjtcbn1cblxuZnVuY3Rpb24gZ2V0VmFsdWUoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpOiBzdHJpbmd8Ym9vbGVhbnxudWxsIHtcbiAgcmV0dXJuIGNvbnRleHRbaW5kZXggKyBTdHlsaW5nSW5kZXguVmFsdWVPZmZzZXRdIGFzIHN0cmluZyB8IGJvb2xlYW4gfCBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNvbnRleHRbaW5kZXggKyBTdHlsaW5nSW5kZXguUHJvcGVydHlPZmZzZXRdIGFzIHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udGV4dERpcnR5KGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0KTogYm9vbGVhbiB7XG4gIHJldHVybiBpc0RpcnR5KGNvbnRleHQsIFN0eWxpbmdJbmRleC5NYXN0ZXJGbGFnUG9zaXRpb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGltaXRUb1NpbmdsZUNsYXNzZXMoY29udGV4dDogU3R5bGluZ0NvbnRleHQpIHtcbiAgcmV0dXJuIGNvbnRleHRbU3R5bGluZ0luZGV4Lk1hc3RlckZsYWdQb3NpdGlvbl0gJiBTdHlsaW5nRmxhZ3MuT25seVByb2Nlc3NTaW5nbGVDbGFzc2VzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29udGV4dERpcnR5KGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpc0RpcnR5WWVzOiBib29sZWFuKTogdm9pZCB7XG4gIHNldERpcnR5KGNvbnRleHQsIFN0eWxpbmdJbmRleC5NYXN0ZXJGbGFnUG9zaXRpb24sIGlzRGlydHlZZXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q29udGV4dFBsYXllcnNEaXJ0eShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaXNEaXJ0eVllczogYm9vbGVhbik6IHZvaWQge1xuICBpZiAoaXNEaXJ0eVllcykge1xuICAgIChjb250ZXh0W1N0eWxpbmdJbmRleC5NYXN0ZXJGbGFnUG9zaXRpb25dIGFzIG51bWJlcikgfD0gU3R5bGluZ0ZsYWdzLlBsYXllckJ1aWxkZXJzRGlydHk7XG4gIH0gZWxzZSB7XG4gICAgKGNvbnRleHRbU3R5bGluZ0luZGV4Lk1hc3RlckZsYWdQb3NpdGlvbl0gYXMgbnVtYmVyKSAmPSB+U3R5bGluZ0ZsYWdzLlBsYXllckJ1aWxkZXJzRGlydHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZEVudHJ5UG9zaXRpb25CeVByb3AoXG4gICAgY29udGV4dDogU3R5bGluZ0NvbnRleHQsIHByb3A6IHN0cmluZywgc3RhcnRJbmRleD86IG51bWJlcik6IG51bWJlciB7XG4gIGZvciAobGV0IGkgPSAoc3RhcnRJbmRleCB8fCAwKSArIFN0eWxpbmdJbmRleC5Qcm9wZXJ0eU9mZnNldDsgaSA8IGNvbnRleHQubGVuZ3RoO1xuICAgICAgIGkgKz0gU3R5bGluZ0luZGV4LlNpemUpIHtcbiAgICBjb25zdCB0aGlzUHJvcCA9IGNvbnRleHRbaV07XG4gICAgaWYgKHRoaXNQcm9wID09IHByb3ApIHtcbiAgICAgIHJldHVybiBpIC0gU3R5bGluZ0luZGV4LlByb3BlcnR5T2Zmc2V0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIHN3YXBNdWx0aUNvbnRleHRFbnRyaWVzKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleEE6IG51bWJlciwgaW5kZXhCOiBudW1iZXIpIHtcbiAgY29uc3QgdG1wVmFsdWUgPSBnZXRWYWx1ZShjb250ZXh0LCBpbmRleEEpO1xuICBjb25zdCB0bXBQcm9wID0gZ2V0UHJvcChjb250ZXh0LCBpbmRleEEpO1xuICBjb25zdCB0bXBGbGFnID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgaW5kZXhBKTtcbiAgY29uc3QgdG1wUGxheWVyQnVpbGRlckluZGV4ID0gZ2V0UGxheWVyQnVpbGRlckluZGV4KGNvbnRleHQsIGluZGV4QSk7XG5cbiAgbGV0IGZsYWdBID0gdG1wRmxhZztcbiAgbGV0IGZsYWdCID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgaW5kZXhCKTtcblxuICBjb25zdCBzaW5nbGVJbmRleEEgPSBnZXRNdWx0aU9yU2luZ2xlSW5kZXgoZmxhZ0EpO1xuICBpZiAoc2luZ2xlSW5kZXhBID49IDApIHtcbiAgICBjb25zdCBfZmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIHNpbmdsZUluZGV4QSk7XG4gICAgY29uc3QgX2luaXRpYWwgPSBnZXRJbml0aWFsSW5kZXgoX2ZsYWcpO1xuICAgIHNldEZsYWcoY29udGV4dCwgc2luZ2xlSW5kZXhBLCBwb2ludGVycyhfZmxhZywgX2luaXRpYWwsIGluZGV4QikpO1xuICB9XG5cbiAgY29uc3Qgc2luZ2xlSW5kZXhCID0gZ2V0TXVsdGlPclNpbmdsZUluZGV4KGZsYWdCKTtcbiAgaWYgKHNpbmdsZUluZGV4QiA+PSAwKSB7XG4gICAgY29uc3QgX2ZsYWcgPSBnZXRQb2ludGVycyhjb250ZXh0LCBzaW5nbGVJbmRleEIpO1xuICAgIGNvbnN0IF9pbml0aWFsID0gZ2V0SW5pdGlhbEluZGV4KF9mbGFnKTtcbiAgICBzZXRGbGFnKGNvbnRleHQsIHNpbmdsZUluZGV4QiwgcG9pbnRlcnMoX2ZsYWcsIF9pbml0aWFsLCBpbmRleEEpKTtcbiAgfVxuXG4gIHNldFZhbHVlKGNvbnRleHQsIGluZGV4QSwgZ2V0VmFsdWUoY29udGV4dCwgaW5kZXhCKSk7XG4gIHNldFByb3AoY29udGV4dCwgaW5kZXhBLCBnZXRQcm9wKGNvbnRleHQsIGluZGV4QikpO1xuICBzZXRGbGFnKGNvbnRleHQsIGluZGV4QSwgZ2V0UG9pbnRlcnMoY29udGV4dCwgaW5kZXhCKSk7XG4gIHNldFBsYXllckJ1aWxkZXJJbmRleChjb250ZXh0LCBpbmRleEEsIGdldFBsYXllckJ1aWxkZXJJbmRleChjb250ZXh0LCBpbmRleEIpKTtcblxuICBzZXRWYWx1ZShjb250ZXh0LCBpbmRleEIsIHRtcFZhbHVlKTtcbiAgc2V0UHJvcChjb250ZXh0LCBpbmRleEIsIHRtcFByb3ApO1xuICBzZXRGbGFnKGNvbnRleHQsIGluZGV4QiwgdG1wRmxhZyk7XG4gIHNldFBsYXllckJ1aWxkZXJJbmRleChjb250ZXh0LCBpbmRleEIsIHRtcFBsYXllckJ1aWxkZXJJbmRleCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNpbmdsZVBvaW50ZXJWYWx1ZXMoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4U3RhcnRQb3NpdGlvbjogbnVtYmVyKSB7XG4gIGZvciAobGV0IGkgPSBpbmRleFN0YXJ0UG9zaXRpb247IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSArPSBTdHlsaW5nSW5kZXguU2l6ZSkge1xuICAgIGNvbnN0IG11bHRpRmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIGkpO1xuICAgIGNvbnN0IHNpbmdsZUluZGV4ID0gZ2V0TXVsdGlPclNpbmdsZUluZGV4KG11bHRpRmxhZyk7XG4gICAgaWYgKHNpbmdsZUluZGV4ID4gMCkge1xuICAgICAgY29uc3Qgc2luZ2xlRmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIHNpbmdsZUluZGV4KTtcbiAgICAgIGNvbnN0IGluaXRpYWxJbmRleEZvclNpbmdsZSA9IGdldEluaXRpYWxJbmRleChzaW5nbGVGbGFnKTtcbiAgICAgIGNvbnN0IGZsYWdWYWx1ZSA9IChpc0RpcnR5KGNvbnRleHQsIHNpbmdsZUluZGV4KSA/IFN0eWxpbmdGbGFncy5EaXJ0eSA6IFN0eWxpbmdGbGFncy5Ob25lKSB8XG4gICAgICAgICAgKGlzQ2xhc3NCYXNlZChjb250ZXh0LCBzaW5nbGVJbmRleCkgPyBTdHlsaW5nRmxhZ3MuQ2xhc3MgOiBTdHlsaW5nRmxhZ3MuTm9uZSkgfFxuICAgICAgICAgIChpc1Nhbml0aXphYmxlKGNvbnRleHQsIHNpbmdsZUluZGV4KSA/IFN0eWxpbmdGbGFncy5TYW5pdGl6ZSA6IFN0eWxpbmdGbGFncy5Ob25lKTtcbiAgICAgIGNvbnN0IHVwZGF0ZWRGbGFnID0gcG9pbnRlcnMoZmxhZ1ZhbHVlLCBpbml0aWFsSW5kZXhGb3JTaW5nbGUsIGkpO1xuICAgICAgc2V0RmxhZyhjb250ZXh0LCBzaW5nbGVJbmRleCwgdXBkYXRlZEZsYWcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnROZXdNdWx0aVByb3BlcnR5KFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLCBjbGFzc0Jhc2VkOiBib29sZWFuLCBuYW1lOiBzdHJpbmcsIGZsYWc6IG51bWJlcixcbiAgICB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbiwgcGxheWVySW5kZXg6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBkb1NoaWZ0ID0gaW5kZXggPCBjb250ZXh0Lmxlbmd0aDtcblxuICAvLyBwcm9wIGRvZXMgbm90IGV4aXN0IGluIHRoZSBsaXN0LCBhZGQgaXQgaW5cbiAgY29udGV4dC5zcGxpY2UoXG4gICAgICBpbmRleCwgMCwgZmxhZyB8IFN0eWxpbmdGbGFncy5EaXJ0eSB8IChjbGFzc0Jhc2VkID8gU3R5bGluZ0ZsYWdzLkNsYXNzIDogU3R5bGluZ0ZsYWdzLk5vbmUpLFxuICAgICAgbmFtZSwgdmFsdWUsIHBsYXllckluZGV4KTtcblxuICBpZiAoZG9TaGlmdCkge1xuICAgIC8vIGJlY2F1c2UgdGhlIHZhbHVlIHdhcyBpbnNlcnRlZCBtaWR3YXkgaW50byB0aGUgYXJyYXkgdGhlbiB3ZVxuICAgIC8vIG5lZWQgdG8gdXBkYXRlIGFsbCB0aGUgc2hpZnRlZCBtdWx0aSB2YWx1ZXMnIHNpbmdsZSB2YWx1ZVxuICAgIC8vIHBvaW50ZXJzIHRvIHBvaW50IHRvIHRoZSBuZXdseSBzaGlmdGVkIGxvY2F0aW9uXG4gICAgdXBkYXRlU2luZ2xlUG9pbnRlclZhbHVlcyhjb250ZXh0LCBpbmRleCArIFN0eWxpbmdJbmRleC5TaXplKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWx1ZUV4aXN0cyh2YWx1ZTogc3RyaW5nIHwgbnVsbCB8IGJvb2xlYW4sIGlzQ2xhc3NCYXNlZD86IGJvb2xlYW4pIHtcbiAgaWYgKGlzQ2xhc3NCYXNlZCkge1xuICAgIHJldHVybiB2YWx1ZSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVJbml0aWFsRmxhZyhcbiAgICBuYW1lOiBzdHJpbmcsIGlzQ2xhc3NCYXNlZDogYm9vbGVhbiwgc2FuaXRpemVyPzogU3R5bGVTYW5pdGl6ZUZuIHwgbnVsbCkge1xuICBpZiAoaXNDbGFzc0Jhc2VkKSB7XG4gICAgcmV0dXJuIFN0eWxpbmdGbGFncy5DbGFzcztcbiAgfSBlbHNlIGlmIChzYW5pdGl6ZXIgJiYgc2FuaXRpemVyKG5hbWUpKSB7XG4gICAgcmV0dXJuIFN0eWxpbmdGbGFncy5TYW5pdGl6ZTtcbiAgfVxuICByZXR1cm4gU3R5bGluZ0ZsYWdzLk5vbmU7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbHVlQ2hhbmdlZChcbiAgICBmbGFnOiBudW1iZXIsIGE6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsLCBiOiBzdHJpbmcgfCBib29sZWFuIHwgbnVsbCk6IGJvb2xlYW4ge1xuICBjb25zdCBpc0NsYXNzQmFzZWQgPSBmbGFnICYgU3R5bGluZ0ZsYWdzLkNsYXNzO1xuICBjb25zdCBoYXNWYWx1ZXMgPSBhICYmIGI7XG4gIGNvbnN0IHVzZXNTYW5pdGl6ZXIgPSBmbGFnICYgU3R5bGluZ0ZsYWdzLlNhbml0aXplO1xuICAvLyB0aGUgdG9TdHJpbmcoKSBjb21wYXJpc29uIGVuc3VyZXMgdGhhdCBhIHZhbHVlIGlzIGNoZWNrZWRcbiAgLy8gLi4uIG90aGVyd2lzZSAoZHVyaW5nIHNhbml0aXphdGlvbiBieXBhc3NpbmcpIHRoZSA9PT0gY29tcGFyc2lvblxuICAvLyB3b3VsZCBmYWlsIHNpbmNlIGEgbmV3IFN0cmluZygpIGluc3RhbmNlIGlzIGNyZWF0ZWRcbiAgaWYgKCFpc0NsYXNzQmFzZWQgJiYgaGFzVmFsdWVzICYmIHVzZXNTYW5pdGl6ZXIpIHtcbiAgICAvLyB3ZSBrbm93IGZvciBzdXJlIHdlJ3JlIGRlYWxpbmcgd2l0aCBzdHJpbmdzIGF0IHRoaXMgcG9pbnRcbiAgICByZXR1cm4gKGEgYXMgc3RyaW5nKS50b1N0cmluZygpICE9PSAoYiBhcyBzdHJpbmcpLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvLyBldmVyeXRoaW5nIGVsc2UgaXMgc2FmZSB0byBjaGVjayB3aXRoIGEgbm9ybWFsIGVxdWFsaXR5IGNoZWNrXG4gIHJldHVybiBhICE9PSBiO1xufVxuXG5leHBvcnQgY2xhc3MgQ2xhc3NBbmRTdHlsZVBsYXllckJ1aWxkZXI8VD4gaW1wbGVtZW50cyBQbGF5ZXJCdWlsZGVyIHtcbiAgcHJpdmF0ZSBfdmFsdWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH0gPSB7fTtcbiAgcHJpdmF0ZSBfZGlydHkgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZmFjdG9yeTogQm91bmRQbGF5ZXJGYWN0b3J5PFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGZhY3Rvcnk6IFBsYXllckZhY3RvcnksIHByaXZhdGUgX2VsZW1lbnQ6IEhUTUxFbGVtZW50LCBwcml2YXRlIF90eXBlOiBCaW5kaW5nVHlwZSkge1xuICAgIHRoaXMuX2ZhY3RvcnkgPSBmYWN0b3J5IGFzIGFueTtcbiAgfVxuXG4gIHNldFZhbHVlKHByb3A6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLl92YWx1ZXNbcHJvcF0gIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBidWlsZFBsYXllcihjdXJyZW50UGxheWVyPzogUGxheWVyfG51bGwpOiBQbGF5ZXJ8dW5kZWZpbmVkfG51bGwge1xuICAgIC8vIGlmIG5vIHZhbHVlcyBoYXZlIGJlZW4gc2V0IGhlcmUgdGhlbiB0aGlzIG1lYW5zIHRoZSBiaW5kaW5nIGRpZG4ndFxuICAgIC8vIGNoYW5nZSBhbmQgdGhlcmVmb3JlIHRoZSBiaW5kaW5nIHZhbHVlcyB3ZXJlIG5vdCB1cGRhdGVkIHRocm91Z2hcbiAgICAvLyBgc2V0VmFsdWVgIHdoaWNoIG1lYW5zIG5vIG5ldyBwbGF5ZXIgd2lsbCBiZSBwcm92aWRlZC5cbiAgICBpZiAodGhpcy5fZGlydHkpIHtcbiAgICAgIGNvbnN0IHBsYXllciA9XG4gICAgICAgICAgdGhpcy5fZmFjdG9yeS5mbih0aGlzLl9lbGVtZW50LCB0aGlzLl90eXBlLCB0aGlzLl92YWx1ZXMgISwgY3VycmVudFBsYXllciB8fCBudWxsKTtcbiAgICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl19