/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getInjectableDef, getInjectorDef } from '../di/defs';
import { injectRootLimpMode, setInjectImplementation } from '../di/injector';
import { assertDefined, assertEqual } from './assert';
import { getComponentDef, getDirectiveDef, getPipeDef } from './definition';
import { NG_ELEMENT_ID } from './fields';
import { NO_PARENT_INJECTOR, PARENT_INJECTOR, TNODE, isFactory } from './interfaces/injector';
import { DECLARATION_VIEW, HOST_NODE, INJECTOR, TVIEW } from './interfaces/view';
import { assertNodeOfPossibleTypes } from './node_assert';
import { getPreviousOrParentTNode, getViewData, setTNodeAndViewData } from './state';
import { getParentInjectorIndex, getParentInjectorView, getParentInjectorViewOffset, hasParentInjector, isComponent, stringify } from './util';
/** *
 * Defines if the call to `inject` should include `viewProviders` in its resolution.
 *
 * This is set to true when we try to instantiate a component. This value is reset in
 * `getNodeInjectable` to a value which matches the declaration location of the token about to be
 * instantiated. This is done so that if we are injecting a token which was declared outside of
 * `viewProviders` we don't accidentally pull `viewProviders` in.
 *
 * Example:
 *
 * ```
 * \@Injectable()
 * class MyService {
 *   constructor(public value: String) {}
 * }
 *
 * \@Component({
 *   providers: [
 *     MyService,
 *     {provide: String, value: 'providers' }
 *   ]
 *   viewProviders: [
 *     {provide: String, value: 'viewProviders'}
 *   ]
 * })
 * class MyComponent {
 *   constructor(myService: MyService, value: String) {
 *     // We expect that Component can see into `viewProviders`.
 *     expect(value).toEqual('viewProviders');
 *     // `MyService` was not declared in `viewProviders` hence it can't see it.
 *     expect(myService.value).toEqual('providers');
 *   }
 * }
 *
 * ```
  @type {?} */
let includeViewProviders = false;
/**
 * @param {?} v
 * @return {?}
 */
function setIncludeViewProviders(v) {
    /** @type {?} */
    const oldValue = includeViewProviders;
    includeViewProviders = v;
    return oldValue;
}
/** *
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
  @type {?} */
const BLOOM_SIZE = 256;
/** @type {?} */
const BLOOM_MASK = BLOOM_SIZE - 1;
/** *
 * Counter used to generate unique IDs for directives.
  @type {?} */
let nextNgElementId = 0;
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param {?} injectorIndex The index of the node injector where this token should be registered
 * @param {?} tView The TView for the injector's bloom filters
 * @param {?} type The directive token to register
 * @return {?}
 */
export function bloomAdd(injectorIndex, tView, type) {
    ngDevMode && assertEqual(tView.firstTemplatePass, true, 'expected firstTemplatePass to be true');
    /** @type {?} */
    let id = (/** @type {?} */ (type))[NG_ELEMENT_ID];
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = (/** @type {?} */ (type))[NG_ELEMENT_ID] = nextNgElementId++;
    }
    /** @type {?} */
    const bloomBit = id & BLOOM_MASK;
    /** @type {?} */
    const mask = 1 << bloomBit;
    /** @type {?} */
    const b7 = bloomBit & 0x80;
    /** @type {?} */
    const b6 = bloomBit & 0x40;
    /** @type {?} */
    const b5 = bloomBit & 0x20;
    /** @type {?} */
    const tData = /** @type {?} */ (tView.data);
    if (b7) {
        b6 ? (b5 ? (tData[injectorIndex + 7] |= mask) : (tData[injectorIndex + 6] |= mask)) :
            (b5 ? (tData[injectorIndex + 5] |= mask) : (tData[injectorIndex + 4] |= mask));
    }
    else {
        b6 ? (b5 ? (tData[injectorIndex + 3] |= mask) : (tData[injectorIndex + 2] |= mask)) :
            (b5 ? (tData[injectorIndex + 1] |= mask) : (tData[injectorIndex] |= mask));
    }
}
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param {?} tNode for which an injector should be retrieved / created.
 * @param {?} hostView View where the node is stored
 * @return {?} Node injector
 */
export function getOrCreateNodeInjectorForNode(tNode, hostView) {
    /** @type {?} */
    const existingInjectorIndex = getInjectorIndex(tNode, hostView);
    if (existingInjectorIndex !== -1) {
        return existingInjectorIndex;
    }
    /** @type {?} */
    const tView = hostView[TVIEW];
    if (tView.firstTemplatePass) {
        tNode.injectorIndex = hostView.length;
        insertBloom(tView.data, tNode); // foundation for node bloom
        insertBloom(hostView, null); // foundation for cumulative bloom
        insertBloom(tView.blueprint, null);
        ngDevMode && assertEqual(tNode.flags === 0 || tNode.flags === 4096 /* isComponent */, true, 'expected tNode.flags to not be initialized');
    }
    /** @type {?} */
    const parentLoc = getParentInjectorLocation(tNode, hostView);
    /** @type {?} */
    const parentIndex = getParentInjectorIndex(parentLoc);
    /** @type {?} */
    const parentView = getParentInjectorView(parentLoc, hostView);
    /** @type {?} */
    const injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (hasParentInjector(parentLoc)) {
        /** @type {?} */
        const parentData = /** @type {?} */ (parentView[TVIEW].data);
        // Creates a cumulative bloom filter that merges the parent's bloom filter
        // and its own cumulative bloom (which contains tokens for all ancestors)
        for (let i = 0; i < 8; i++) {
            hostView[injectorIndex + i] = parentView[parentIndex + i] | parentData[parentIndex + i];
        }
    }
    hostView[injectorIndex + PARENT_INJECTOR] = parentLoc;
    return injectorIndex;
}
/**
 * @param {?} arr
 * @param {?} footer
 * @return {?}
 */
function insertBloom(arr, footer) {
    arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
}
/**
 * @param {?} tNode
 * @param {?} hostView
 * @return {?}
 */
export function getInjectorIndex(tNode, hostView) {
    if (tNode.injectorIndex === -1 ||
        // If the injector index is the same as its parent's injector index, then the index has been
        // copied down from the parent node. No injector has been created yet on this node.
        (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
        // After the first template pass, the injector index might exist but the parent values
        // might not have been calculated yet for this instance
        hostView[tNode.injectorIndex + PARENT_INJECTOR] == null) {
        return -1;
    }
    else {
        return tNode.injectorIndex;
    }
}
/**
 * Finds the index of the parent injector, with a view offset if applicable. Used to set the
 * parent injector initially.
 *
 * Returns a combination of number of `ViewData` we have to go up and index in that `Viewdata`
 * @param {?} tNode
 * @param {?} view
 * @return {?}
 */
export function getParentInjectorLocation(tNode, view) {
    if (tNode.parent && tNode.parent.injectorIndex !== -1) {
        return /** @type {?} */ (tNode.parent.injectorIndex); // view offset is 0
    }
    /** @type {?} */
    let hostTNode = view[HOST_NODE];
    /** @type {?} */
    let viewOffset = 1;
    while (hostTNode && hostTNode.injectorIndex === -1) {
        view = /** @type {?} */ ((view[DECLARATION_VIEW]));
        hostTNode = /** @type {?} */ ((view[HOST_NODE]));
        viewOffset++;
    }
    return hostTNode ?
        hostTNode.injectorIndex | (viewOffset << 15 /* ViewOffsetShift */) : /** @type {?} */ (-1);
}
/**
 * Makes a type or an injection token public to the DI system by adding it to an
 * injector's bloom filter.
 *
 * @param {?} injectorIndex
 * @param {?} view
 * @param {?} token The type or the injection token to be made public
 * @return {?}
 */
export function diPublicInInjector(injectorIndex, view, token) {
    bloomAdd(injectorIndex, view[TVIEW], token);
}
/**
 * Inject static attribute value into directive constructor.
 *
 * This method is used with `factory` functions which are generated as part of
 * `defineDirective` or `defineComponent`. The method retrieves the static value
 * of an attribute. (Dynamic attributes are not supported since they are not resolved
 *  at the time of injection and can change over time.)
 *
 * # Example
 * Given:
 * ```
 * \@Component(...)
 * class MyComponent {
 *   constructor(\@Attribute('title') title: string) { ... }
 * }
 * ```
 * When instantiated with
 * ```
 * <my-component title="Hello"></my-component>
 * ```
 *
 * Then factory method generated is:
 * ```
 * MyComponent.ngComponentDef = defineComponent({
 *   factory: () => new MyComponent(injectAttribute('title'))
 *   ...
 * })
 * ```
 *
 * \@publicApi
 * @param {?} tNode
 * @param {?} attrNameToInject
 * @return {?}
 */
export function injectAttributeImpl(tNode, attrNameToInject) {
    ngDevMode && assertNodeOfPossibleTypes(tNode, 0 /* Container */, 3 /* Element */, 4 /* ElementContainer */);
    ngDevMode && assertDefined(tNode, 'expecting tNode');
    /** @type {?} */
    const attrs = tNode.attrs;
    if (attrs) {
        for (let i = 0; i < attrs.length; i = i + 2) {
            /** @type {?} */
            const attrName = attrs[i];
            if (attrName === 1 /* SelectOnly */)
                break;
            if (attrName == attrNameToInject) {
                return /** @type {?} */ (attrs[i + 1]);
            }
        }
    }
    return undefined;
}
/**
 * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * @template T
 * @param {?} tNode
 * @param {?} lViewData
 * @param {?} token The token to look for
 * @param {?=} flags Injection flags
 * @param {?=} notFoundValue
 * @return {?} the value from the injector or `null` when not found
 */
export function getOrCreateInjectable(tNode, lViewData, token, flags = 0 /* Default */, notFoundValue) {
    /** @type {?} */
    const bloomHash = bloomHashBitOrFactory(token);
    // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
    // so just call the factory function to create it.
    if (typeof bloomHash === 'function') {
        /** @type {?} */
        const savePreviousOrParentTNode = getPreviousOrParentTNode();
        /** @type {?} */
        const saveViewData = getViewData();
        setTNodeAndViewData(tNode, lViewData);
        try {
            return bloomHash();
        }
        finally {
            setTNodeAndViewData(savePreviousOrParentTNode, saveViewData);
        }
    }
    else if (typeof bloomHash == 'number') {
        /** @type {?} */
        let previousTView = null;
        /** @type {?} */
        let injectorIndex = getInjectorIndex(tNode, lViewData);
        /** @type {?} */
        let parentLocation = NO_PARENT_INJECTOR;
        // If we should skip this injector, start by searching the parent injector.
        if (flags & 4 /* SkipSelf */) {
            parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lViewData) :
                lViewData[injectorIndex + PARENT_INJECTOR];
            if (!shouldSearchParent(flags, parentLocation)) {
                injectorIndex = -1;
            }
            else {
                previousTView = lViewData[TVIEW];
                injectorIndex = getParentInjectorIndex(parentLocation);
                lViewData = getParentInjectorView(parentLocation, lViewData);
            }
        }
        // Traverse up the injector tree until we find a potential match or until we know there
        // *isn't* a match.
        while (injectorIndex !== -1) {
            parentLocation = lViewData[injectorIndex + PARENT_INJECTOR];
            /** @type {?} */
            const tView = lViewData[TVIEW];
            if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                /** @type {?} */
                const instance = searchTokensOnInjector(injectorIndex, lViewData, token, previousTView);
                if (instance !== NOT_FOUND) {
                    return instance;
                }
            }
            if (shouldSearchParent(flags, parentLocation) &&
                bloomHasToken(bloomHash, injectorIndex, lViewData)) {
                // The def wasn't found anywhere on this node, so it was a false positive.
                // Traverse up the tree and continue searching.
                previousTView = tView;
                injectorIndex = getParentInjectorIndex(parentLocation);
                lViewData = getParentInjectorView(parentLocation, lViewData);
            }
            else {
                // If we should not search parent OR If the ancestor bloom filter value does not have the
                // bit corresponding to the directive we can give up on traversing up to find the specific
                // injector.
                injectorIndex = -1;
            }
        }
    }
    if ((flags & (2 /* Self */ | 1 /* Host */)) === 0) {
        /** @type {?} */
        const moduleInjector = lViewData[INJECTOR];
        if (moduleInjector) {
            return moduleInjector.get(token, notFoundValue, flags & 8 /* Optional */);
        }
        else {
            return injectRootLimpMode(token, notFoundValue, flags & 8 /* Optional */);
        }
    }
    if (flags & 8 /* Optional */) {
        return notFoundValue;
    }
    else {
        throw new Error(`NodeInjector: NOT_FOUND [${stringify(token)}]`);
    }
}
/** @type {?} */
const NOT_FOUND = {};
/**
 * @template T
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @param {?} token
 * @param {?} previousTView
 * @return {?}
 */
function searchTokensOnInjector(injectorIndex, injectorView, token, previousTView) {
    /** @type {?} */
    const currentTView = injectorView[TVIEW];
    /** @type {?} */
    const tNode = /** @type {?} */ (currentTView.data[injectorIndex + TNODE]);
    /** @type {?} */
    const nodeFlags = tNode.flags;
    /** @type {?} */
    const nodeProviderIndexes = tNode.providerIndexes;
    /** @type {?} */
    const tInjectables = currentTView.data;
    /** @type {?} */
    let canAccessViewProviders = false;
    // We need to determine if view providers can be accessed by the starting element.
    // It happens in 2 cases:
    // 1) On the initial element injector , if we are instantiating a token which can see the
    // viewProviders of the component of that element. Such token are:
    // - the component itself (but not other directives)
    // - viewProviders tokens of the component (but not providers tokens)
    // 2) Upper in the element injector tree, if the starting element is actually in the view of
    // the current element. To determine this, we track the transition of view during the climb,
    // and check the host node of the current view to identify component views.
    if (previousTView == null && isComponent(tNode) && includeViewProviders ||
        previousTView != null && previousTView != currentTView &&
            (currentTView.node == null || /** @type {?} */ ((currentTView.node)).type === 3 /* Element */)) {
        canAccessViewProviders = true;
    }
    /** @type {?} */
    const startInjectables = nodeProviderIndexes & 65535 /* ProvidersStartIndexMask */;
    /** @type {?} */
    const startDirectives = nodeFlags >> 16 /* DirectiveStartingIndexShift */;
    /** @type {?} */
    const cptViewProvidersCount = nodeProviderIndexes >> 16 /* CptViewProvidersCountShift */;
    /** @type {?} */
    const startingIndex = canAccessViewProviders ? startInjectables : startInjectables + cptViewProvidersCount;
    /** @type {?} */
    const directiveCount = nodeFlags & 4095 /* DirectiveCountMask */;
    for (let i = startingIndex; i < startDirectives + directiveCount; i++) {
        /** @type {?} */
        const providerTokenOrDef = /** @type {?} */ (tInjectables[i]);
        if (i < startDirectives && token === providerTokenOrDef ||
            i >= startDirectives && (/** @type {?} */ (providerTokenOrDef)).type === token) {
            return getNodeInjectable(tInjectables, injectorView, i, /** @type {?} */ (tNode));
        }
    }
    return NOT_FOUND;
}
/**
 * Retrieve or instantiate the injectable from the `lData` at particular `index`.
 *
 * This function checks to see if the value has already been instantiated and if so returns the
 * cached `injectable`. Otherwise if it detects that the value is still a factory it
 * instantiates the `injectable` and caches the value.
 * @param {?} tData
 * @param {?} lData
 * @param {?} index
 * @param {?} tNode
 * @return {?}
 */
export function getNodeInjectable(tData, lData, index, tNode) {
    /** @type {?} */
    let value = lData[index];
    if (isFactory(value)) {
        /** @type {?} */
        const factory = value;
        if (factory.resolving) {
            throw new Error(`Circular dep for ${stringify(tData[index])}`);
        }
        /** @type {?} */
        const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
        factory.resolving = true;
        /** @type {?} */
        let previousInjectImplementation;
        if (factory.injectImpl) {
            previousInjectImplementation = setInjectImplementation(factory.injectImpl);
        }
        /** @type {?} */
        const savePreviousOrParentTNode = getPreviousOrParentTNode();
        /** @type {?} */
        const saveViewData = getViewData();
        setTNodeAndViewData(tNode, lData);
        try {
            value = lData[index] = factory.factory(null, tData, lData, tNode);
        }
        finally {
            if (factory.injectImpl)
                setInjectImplementation(previousInjectImplementation);
            setIncludeViewProviders(previousIncludeViewProviders);
            factory.resolving = false;
            setTNodeAndViewData(savePreviousOrParentTNode, saveViewData);
        }
    }
    return value;
}
/**
 * Returns the bit in an injector's bloom filter that should be used to determine whether or not
 * the directive might be provided by the injector.
 *
 * When a directive is public, it is added to the bloom filter and given a unique ID that can be
 * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
 * is returned as the node injector can not possibly provide that token.
 *
 * @param {?} token the injection token
 * @return {?} the matching bit to check in the bloom filter or `null` if the token is not known.
 */
export function bloomHashBitOrFactory(token) {
    /** @type {?} */
    const tokenId = (/** @type {?} */ (token))[NG_ELEMENT_ID];
    return typeof tokenId === 'number' ? tokenId & BLOOM_MASK : tokenId;
}
/**
 * @param {?} bloomHash
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @return {?}
 */
export function bloomHasToken(bloomHash, injectorIndex, injectorView) {
    /** @type {?} */
    const mask = 1 << bloomHash;
    /** @type {?} */
    const b7 = bloomHash & 0x80;
    /** @type {?} */
    const b6 = bloomHash & 0x40;
    /** @type {?} */
    const b5 = bloomHash & 0x20;
    /** @type {?} */
    let value;
    if (b7) {
        value = b6 ? (b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6]) :
            (b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4]);
    }
    else {
        value = b6 ? (b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2]) :
            (b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]);
    }
    // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
    // this injector is a potential match.
    return !!(value & mask);
}
/**
 * Returns true if flags prevent parent injector from being searched for tokens
 * @param {?} flags
 * @param {?} parentLocation
 * @return {?}
 */
function shouldSearchParent(flags, parentLocation) {
    return !(flags & 2 /* Self */ ||
        (flags & 1 /* Host */ && getParentInjectorViewOffset(parentLocation) > 0));
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getFactoryOf(type) {
    /** @type {?} */
    const typeAny = /** @type {?} */ (type);
    /** @type {?} */
    const def = getComponentDef(typeAny) || getDirectiveDef(typeAny) ||
        getPipeDef(typeAny) || getInjectableDef(typeAny) || getInjectorDef(typeAny);
    if (!def || def.factory === undefined) {
        return null;
    }
    return def.factory;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getInheritedFactory(type) {
    /** @type {?} */
    const proto = /** @type {?} */ (Object.getPrototypeOf(type.prototype).constructor);
    /** @type {?} */
    const factory = getFactoryOf(proto);
    if (factory !== null) {
        return factory;
    }
    else {
        // There is no factory defined. Either this was improper usage of inheritance
        // (no Angular decorator on the superclass) or there is no constructor at all
        // in the inheritance chain. Since the two cases cannot be distinguished, the
        // latter has to be assumed.
        return (t) => new t();
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUU1RCxPQUFPLEVBQXNDLGtCQUFrQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHaEgsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEQsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFDLGtCQUFrQixFQUF1QixlQUFlLEVBQTJELEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUxSyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBb0IsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDeEcsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbkYsT0FBTyxFQUFDLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLDJCQUEyQixFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QzdJLElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDOzs7OztBQUVqQyxTQUFTLHVCQUF1QixDQUFDLENBQVU7O0lBQ3pDLE1BQU0sUUFBUSxHQUFHLG9CQUFvQixD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QUksZ0JBQWdCLENBQUksT0FBTyxDQUFDLElBQUksY0FBYyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQ3pGLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDckMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQztDQUNwQjs7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFJLElBQWU7O0lBQ3BELE1BQU0sS0FBSyxxQkFBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUF3QixFQUFDOztJQUM3RSxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUksS0FBSyxDQUFDLENBQUM7SUFDdkMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQ3BCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO1NBQU07Ozs7O1FBS0wsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUN2QjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dldEluamVjdGFibGVEZWYsIGdldEluamVjdG9yRGVmfSBmcm9tICcuLi9kaS9kZWZzJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4uL2RpL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdEZsYWdzLCBJbmplY3RvciwgTnVsbEluamVjdG9yLCBpbmplY3RSb290TGltcE1vZGUsIHNldEluamVjdEltcGxlbWVudGF0aW9ufSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWQsIGFzc2VydEVxdWFsfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQge2dldENvbXBvbmVudERlZiwgZ2V0RGlyZWN0aXZlRGVmLCBnZXRQaXBlRGVmfSBmcm9tICcuL2RlZmluaXRpb24nO1xuaW1wb3J0IHtOR19FTEVNRU5UX0lEfSBmcm9tICcuL2ZpZWxkcyc7XG5pbXBvcnQge0RpcmVjdGl2ZURlZn0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtOT19QQVJFTlRfSU5KRUNUT1IsIE5vZGVJbmplY3RvckZhY3RvcnksIFBBUkVOVF9JTkpFQ1RPUiwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uLCBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb25GbGFncywgVE5PREUsIGlzRmFjdG9yeX0gZnJvbSAnLi9pbnRlcmZhY2VzL2luamVjdG9yJztcbmltcG9ydCB7QXR0cmlidXRlTWFya2VyLCBUQ29udGFpbmVyTm9kZSwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBURWxlbWVudE5vZGUsIFROb2RlLCBUTm9kZUZsYWdzLCBUTm9kZVByb3ZpZGVySW5kZXhlcywgVE5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX1ZJRVcsIEhPU1RfTk9ERSwgSU5KRUNUT1IsIExWaWV3RGF0YSwgVERhdGEsIFRWSUVXLCBUVmlld30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHthc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzfSBmcm9tICcuL25vZGVfYXNzZXJ0JztcbmltcG9ydCB7Z2V0UHJldmlvdXNPclBhcmVudFROb2RlLCBnZXRWaWV3RGF0YSwgc2V0VE5vZGVBbmRWaWV3RGF0YX0gZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQge2dldFBhcmVudEluamVjdG9ySW5kZXgsIGdldFBhcmVudEluamVjdG9yVmlldywgZ2V0UGFyZW50SW5qZWN0b3JWaWV3T2Zmc2V0LCBoYXNQYXJlbnRJbmplY3RvciwgaXNDb21wb25lbnQsIHN0cmluZ2lmeX0gZnJvbSAnLi91dGlsJztcblxuXG5cbi8qKlxuICogRGVmaW5lcyBpZiB0aGUgY2FsbCB0byBgaW5qZWN0YCBzaG91bGQgaW5jbHVkZSBgdmlld1Byb3ZpZGVyc2AgaW4gaXRzIHJlc29sdXRpb24uXG4gKlxuICogVGhpcyBpcyBzZXQgdG8gdHJ1ZSB3aGVuIHdlIHRyeSB0byBpbnN0YW50aWF0ZSBhIGNvbXBvbmVudC4gVGhpcyB2YWx1ZSBpcyByZXNldCBpblxuICogYGdldE5vZGVJbmplY3RhYmxlYCB0byBhIHZhbHVlIHdoaWNoIG1hdGNoZXMgdGhlIGRlY2xhcmF0aW9uIGxvY2F0aW9uIG9mIHRoZSB0b2tlbiBhYm91dCB0byBiZVxuICogaW5zdGFudGlhdGVkLiBUaGlzIGlzIGRvbmUgc28gdGhhdCBpZiB3ZSBhcmUgaW5qZWN0aW5nIGEgdG9rZW4gd2hpY2ggd2FzIGRlY2xhcmVkIG91dHNpZGUgb2ZcbiAqIGB2aWV3UHJvdmlkZXJzYCB3ZSBkb24ndCBhY2NpZGVudGFsbHkgcHVsbCBgdmlld1Byb3ZpZGVyc2AgaW4uXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIE15U2VydmljZSB7XG4gKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogU3RyaW5nKSB7fVxuICogfVxuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBwcm92aWRlcnM6IFtcbiAqICAgICBNeVNlcnZpY2UsXG4gKiAgICAge3Byb3ZpZGU6IFN0cmluZywgdmFsdWU6ICdwcm92aWRlcnMnIH1cbiAqICAgXVxuICogICB2aWV3UHJvdmlkZXJzOiBbXG4gKiAgICAge3Byb3ZpZGU6IFN0cmluZywgdmFsdWU6ICd2aWV3UHJvdmlkZXJzJ31cbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IobXlTZXJ2aWNlOiBNeVNlcnZpY2UsIHZhbHVlOiBTdHJpbmcpIHtcbiAqICAgICAvLyBXZSBleHBlY3QgdGhhdCBDb21wb25lbnQgY2FuIHNlZSBpbnRvIGB2aWV3UHJvdmlkZXJzYC5cbiAqICAgICBleHBlY3QodmFsdWUpLnRvRXF1YWwoJ3ZpZXdQcm92aWRlcnMnKTtcbiAqICAgICAvLyBgTXlTZXJ2aWNlYCB3YXMgbm90IGRlY2xhcmVkIGluIGB2aWV3UHJvdmlkZXJzYCBoZW5jZSBpdCBjYW4ndCBzZWUgaXQuXG4gKiAgICAgZXhwZWN0KG15U2VydmljZS52YWx1ZSkudG9FcXVhbCgncHJvdmlkZXJzJyk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBgYGBcbiAqL1xubGV0IGluY2x1ZGVWaWV3UHJvdmlkZXJzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHNldEluY2x1ZGVWaWV3UHJvdmlkZXJzKHY6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgY29uc3Qgb2xkVmFsdWUgPSBpbmNsdWRlVmlld1Byb3ZpZGVycztcbiAgaW5jbHVkZVZpZXdQcm92aWRlcnMgPSB2O1xuICByZXR1cm4gb2xkVmFsdWU7XG59XG5cbi8qKlxuICogVGhlIG51bWJlciBvZiBzbG90cyBpbiBlYWNoIGJsb29tIGZpbHRlciAodXNlZCBieSBESSkuIFRoZSBsYXJnZXIgdGhpcyBudW1iZXIsIHRoZSBmZXdlclxuICogZGlyZWN0aXZlcyB0aGF0IHdpbGwgc2hhcmUgc2xvdHMsIGFuZCB0aHVzLCB0aGUgZmV3ZXIgZmFsc2UgcG9zaXRpdmVzIHdoZW4gY2hlY2tpbmcgZm9yXG4gKiB0aGUgZXhpc3RlbmNlIG9mIGEgZGlyZWN0aXZlLlxuICovXG5jb25zdCBCTE9PTV9TSVpFID0gMjU2O1xuY29uc3QgQkxPT01fTUFTSyA9IEJMT09NX1NJWkUgLSAxO1xuXG4vKiogQ291bnRlciB1c2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMgZm9yIGRpcmVjdGl2ZXMuICovXG5sZXQgbmV4dE5nRWxlbWVudElkID0gMDtcblxuLyoqXG4gKiBSZWdpc3RlcnMgdGhpcyBkaXJlY3RpdmUgYXMgcHJlc2VudCBpbiBpdHMgbm9kZSdzIGluamVjdG9yIGJ5IGZsaXBwaW5nIHRoZSBkaXJlY3RpdmUnc1xuICogY29ycmVzcG9uZGluZyBiaXQgaW4gdGhlIGluamVjdG9yJ3MgYmxvb20gZmlsdGVyLlxuICpcbiAqIEBwYXJhbSBpbmplY3RvckluZGV4IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbmplY3RvciB3aGVyZSB0aGlzIHRva2VuIHNob3VsZCBiZSByZWdpc3RlcmVkXG4gKiBAcGFyYW0gdFZpZXcgVGhlIFRWaWV3IGZvciB0aGUgaW5qZWN0b3IncyBibG9vbSBmaWx0ZXJzXG4gKiBAcGFyYW0gdHlwZSBUaGUgZGlyZWN0aXZlIHRva2VuIHRvIHJlZ2lzdGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBibG9vbUFkZChcbiAgICBpbmplY3RvckluZGV4OiBudW1iZXIsIHRWaWV3OiBUVmlldywgdHlwZTogVHlwZTxhbnk+fCBJbmplY3Rpb25Ub2tlbjxhbnk+KTogdm9pZCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbCh0Vmlldy5maXJzdFRlbXBsYXRlUGFzcywgdHJ1ZSwgJ2V4cGVjdGVkIGZpcnN0VGVtcGxhdGVQYXNzIHRvIGJlIHRydWUnKTtcbiAgbGV0IGlkOiBudW1iZXJ8dW5kZWZpbmVkID0gKHR5cGUgYXMgYW55KVtOR19FTEVNRU5UX0lEXTtcblxuICAvLyBTZXQgYSB1bmlxdWUgSUQgb24gdGhlIGRpcmVjdGl2ZSB0eXBlLCBzbyBpZiBzb21ldGhpbmcgdHJpZXMgdG8gaW5qZWN0IHRoZSBkaXJlY3RpdmUsXG4gIC8vIHdlIGNhbiBlYXNpbHkgcmV0cmlldmUgdGhlIElEIGFuZCBoYXNoIGl0IGludG8gdGhlIGJsb29tIGJpdCB0aGF0IHNob3VsZCBiZSBjaGVja2VkLlxuICBpZiAoaWQgPT0gbnVsbCkge1xuICAgIGlkID0gKHR5cGUgYXMgYW55KVtOR19FTEVNRU5UX0lEXSA9IG5leHROZ0VsZW1lbnRJZCsrO1xuICB9XG5cbiAgLy8gV2Ugb25seSBoYXZlIEJMT09NX1NJWkUgKDI1Nikgc2xvdHMgaW4gb3VyIGJsb29tIGZpbHRlciAoOCBidWNrZXRzICogMzIgYml0cyBlYWNoKSxcbiAgLy8gc28gYWxsIHVuaXF1ZSBJRHMgbXVzdCBiZSBtb2R1bG8tZWQgaW50byBhIG51bWJlciBmcm9tIDAgLSAyNTUgdG8gZml0IGludG8gdGhlIGZpbHRlci5cbiAgY29uc3QgYmxvb21CaXQgPSBpZCAmIEJMT09NX01BU0s7XG5cbiAgLy8gQ3JlYXRlIGEgbWFzayB0aGF0IHRhcmdldHMgdGhlIHNwZWNpZmljIGJpdCBhc3NvY2lhdGVkIHdpdGggdGhlIGRpcmVjdGl2ZS5cbiAgLy8gSlMgYml0IG9wZXJhdGlvbnMgYXJlIDMyIGJpdHMsIHNvIHRoaXMgd2lsbCBiZSBhIG51bWJlciBiZXR3ZWVuIDJeMCBhbmQgMl4zMSwgY29ycmVzcG9uZGluZ1xuICAvLyB0byBiaXQgcG9zaXRpb25zIDAgLSAzMSBpbiBhIDMyIGJpdCBpbnRlZ2VyLlxuICBjb25zdCBtYXNrID0gMSA8PCBibG9vbUJpdDtcblxuICAvLyBVc2UgdGhlIHJhdyBibG9vbUJpdCBudW1iZXIgdG8gZGV0ZXJtaW5lIHdoaWNoIGJsb29tIGZpbHRlciBidWNrZXQgd2Ugc2hvdWxkIGNoZWNrXG4gIC8vIGUuZzogYmYwID0gWzAgLSAzMV0sIGJmMSA9IFszMiAtIDYzXSwgYmYyID0gWzY0IC0gOTVdLCBiZjMgPSBbOTYgLSAxMjddLCBldGNcbiAgY29uc3QgYjcgPSBibG9vbUJpdCAmIDB4ODA7XG4gIGNvbnN0IGI2ID0gYmxvb21CaXQgJiAweDQwO1xuICBjb25zdCBiNSA9IGJsb29tQml0ICYgMHgyMDtcbiAgY29uc3QgdERhdGEgPSB0Vmlldy5kYXRhIGFzIG51bWJlcltdO1xuXG4gIGlmIChiNykge1xuICAgIGI2ID8gKGI1ID8gKHREYXRhW2luamVjdG9ySW5kZXggKyA3XSB8PSBtYXNrKSA6ICh0RGF0YVtpbmplY3RvckluZGV4ICsgNl0gfD0gbWFzaykpIDpcbiAgICAgICAgIChiNSA/ICh0RGF0YVtpbmplY3RvckluZGV4ICsgNV0gfD0gbWFzaykgOiAodERhdGFbaW5qZWN0b3JJbmRleCArIDRdIHw9IG1hc2spKTtcbiAgfSBlbHNlIHtcbiAgICBiNiA/IChiNSA/ICh0RGF0YVtpbmplY3RvckluZGV4ICsgM10gfD0gbWFzaykgOiAodERhdGFbaW5qZWN0b3JJbmRleCArIDJdIHw9IG1hc2spKSA6XG4gICAgICAgICAoYjUgPyAodERhdGFbaW5qZWN0b3JJbmRleCArIDFdIHw9IG1hc2spIDogKHREYXRhW2luamVjdG9ySW5kZXhdIHw9IG1hc2spKTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgKG9yIGdldHMgYW4gZXhpc3RpbmcpIGluamVjdG9yIGZvciBhIGdpdmVuIGVsZW1lbnQgb3IgY29udGFpbmVyLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBmb3Igd2hpY2ggYW4gaW5qZWN0b3Igc2hvdWxkIGJlIHJldHJpZXZlZCAvIGNyZWF0ZWQuXG4gKiBAcGFyYW0gaG9zdFZpZXcgVmlldyB3aGVyZSB0aGUgbm9kZSBpcyBzdG9yZWRcbiAqIEByZXR1cm5zIE5vZGUgaW5qZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9yQ3JlYXRlTm9kZUluamVjdG9yRm9yTm9kZShcbiAgICB0Tm9kZTogVEVsZW1lbnROb2RlIHwgVENvbnRhaW5lck5vZGUgfCBURWxlbWVudENvbnRhaW5lck5vZGUsIGhvc3RWaWV3OiBMVmlld0RhdGEpOiBudW1iZXIge1xuICBjb25zdCBleGlzdGluZ0luamVjdG9ySW5kZXggPSBnZXRJbmplY3RvckluZGV4KHROb2RlLCBob3N0Vmlldyk7XG4gIGlmIChleGlzdGluZ0luamVjdG9ySW5kZXggIT09IC0xKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nSW5qZWN0b3JJbmRleDtcbiAgfVxuXG4gIGNvbnN0IHRWaWV3ID0gaG9zdFZpZXdbVFZJRVddO1xuICBpZiAodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICB0Tm9kZS5pbmplY3RvckluZGV4ID0gaG9zdFZpZXcubGVuZ3RoO1xuICAgIGluc2VydEJsb29tKHRWaWV3LmRhdGEsIHROb2RlKTsgIC8vIGZvdW5kYXRpb24gZm9yIG5vZGUgYmxvb21cbiAgICBpbnNlcnRCbG9vbShob3N0VmlldywgbnVsbCk7ICAgICAvLyBmb3VuZGF0aW9uIGZvciBjdW11bGF0aXZlIGJsb29tXG4gICAgaW5zZXJ0Qmxvb20odFZpZXcuYmx1ZXByaW50LCBudWxsKTtcblxuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbChcbiAgICAgICAgICAgICAgICAgICAgIHROb2RlLmZsYWdzID09PSAwIHx8IHROb2RlLmZsYWdzID09PSBUTm9kZUZsYWdzLmlzQ29tcG9uZW50LCB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgJ2V4cGVjdGVkIHROb2RlLmZsYWdzIHRvIG5vdCBiZSBpbml0aWFsaXplZCcpO1xuICB9XG5cbiAgY29uc3QgcGFyZW50TG9jID0gZ2V0UGFyZW50SW5qZWN0b3JMb2NhdGlvbih0Tm9kZSwgaG9zdFZpZXcpO1xuICBjb25zdCBwYXJlbnRJbmRleCA9IGdldFBhcmVudEluamVjdG9ySW5kZXgocGFyZW50TG9jKTtcbiAgY29uc3QgcGFyZW50VmlldzogTFZpZXdEYXRhID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3KHBhcmVudExvYywgaG9zdFZpZXcpO1xuXG4gIGNvbnN0IGluamVjdG9ySW5kZXggPSB0Tm9kZS5pbmplY3RvckluZGV4O1xuXG4gIC8vIElmIGEgcGFyZW50IGluamVjdG9yIGNhbid0IGJlIGZvdW5kLCBpdHMgbG9jYXRpb24gaXMgc2V0IHRvIC0xLlxuICAvLyBJbiB0aGF0IGNhc2UsIHdlIGRvbid0IG5lZWQgdG8gc2V0IHVwIGEgY3VtdWxhdGl2ZSBibG9vbVxuICBpZiAoaGFzUGFyZW50SW5qZWN0b3IocGFyZW50TG9jKSkge1xuICAgIGNvbnN0IHBhcmVudERhdGEgPSBwYXJlbnRWaWV3W1RWSUVXXS5kYXRhIGFzIGFueTtcbiAgICAvLyBDcmVhdGVzIGEgY3VtdWxhdGl2ZSBibG9vbSBmaWx0ZXIgdGhhdCBtZXJnZXMgdGhlIHBhcmVudCdzIGJsb29tIGZpbHRlclxuICAgIC8vIGFuZCBpdHMgb3duIGN1bXVsYXRpdmUgYmxvb20gKHdoaWNoIGNvbnRhaW5zIHRva2VucyBmb3IgYWxsIGFuY2VzdG9ycylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgaG9zdFZpZXdbaW5qZWN0b3JJbmRleCArIGldID0gcGFyZW50Vmlld1twYXJlbnRJbmRleCArIGldIHwgcGFyZW50RGF0YVtwYXJlbnRJbmRleCArIGldO1xuICAgIH1cbiAgfVxuXG4gIGhvc3RWaWV3W2luamVjdG9ySW5kZXggKyBQQVJFTlRfSU5KRUNUT1JdID0gcGFyZW50TG9jO1xuICByZXR1cm4gaW5qZWN0b3JJbmRleDtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Qmxvb20oYXJyOiBhbnlbXSwgZm9vdGVyOiBUTm9kZSB8IG51bGwpOiB2b2lkIHtcbiAgYXJyLnB1c2goMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgZm9vdGVyKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5qZWN0b3JJbmRleCh0Tm9kZTogVE5vZGUsIGhvc3RWaWV3OiBMVmlld0RhdGEpOiBudW1iZXIge1xuICBpZiAodE5vZGUuaW5qZWN0b3JJbmRleCA9PT0gLTEgfHxcbiAgICAgIC8vIElmIHRoZSBpbmplY3RvciBpbmRleCBpcyB0aGUgc2FtZSBhcyBpdHMgcGFyZW50J3MgaW5qZWN0b3IgaW5kZXgsIHRoZW4gdGhlIGluZGV4IGhhcyBiZWVuXG4gICAgICAvLyBjb3BpZWQgZG93biBmcm9tIHRoZSBwYXJlbnQgbm9kZS4gTm8gaW5qZWN0b3IgaGFzIGJlZW4gY3JlYXRlZCB5ZXQgb24gdGhpcyBub2RlLlxuICAgICAgKHROb2RlLnBhcmVudCAmJiB0Tm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleCA9PT0gdE5vZGUuaW5qZWN0b3JJbmRleCkgfHxcbiAgICAgIC8vIEFmdGVyIHRoZSBmaXJzdCB0ZW1wbGF0ZSBwYXNzLCB0aGUgaW5qZWN0b3IgaW5kZXggbWlnaHQgZXhpc3QgYnV0IHRoZSBwYXJlbnQgdmFsdWVzXG4gICAgICAvLyBtaWdodCBub3QgaGF2ZSBiZWVuIGNhbGN1bGF0ZWQgeWV0IGZvciB0aGlzIGluc3RhbmNlXG4gICAgICBob3N0Vmlld1t0Tm9kZS5pbmplY3RvckluZGV4ICsgUEFSRU5UX0lOSkVDVE9SXSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0Tm9kZS5pbmplY3RvckluZGV4O1xuICB9XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBwYXJlbnQgaW5qZWN0b3IsIHdpdGggYSB2aWV3IG9mZnNldCBpZiBhcHBsaWNhYmxlLiBVc2VkIHRvIHNldCB0aGVcbiAqIHBhcmVudCBpbmplY3RvciBpbml0aWFsbHkuXG4gKlxuICogUmV0dXJucyBhIGNvbWJpbmF0aW9uIG9mIG51bWJlciBvZiBgVmlld0RhdGFgIHdlIGhhdmUgdG8gZ28gdXAgYW5kIGluZGV4IGluIHRoYXQgYFZpZXdkYXRhYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SW5qZWN0b3JMb2NhdGlvbih0Tm9kZTogVE5vZGUsIHZpZXc6IExWaWV3RGF0YSk6IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbiB7XG4gIGlmICh0Tm9kZS5wYXJlbnQgJiYgdE5vZGUucGFyZW50LmluamVjdG9ySW5kZXggIT09IC0xKSB7XG4gICAgcmV0dXJuIHROb2RlLnBhcmVudC5pbmplY3RvckluZGV4IGFzIGFueTsgIC8vIHZpZXcgb2Zmc2V0IGlzIDBcbiAgfVxuXG4gIC8vIEZvciBtb3N0IGNhc2VzLCB0aGUgcGFyZW50IGluamVjdG9yIGluZGV4IGNhbiBiZSBmb3VuZCBvbiB0aGUgaG9zdCBub2RlIChlLmcuIGZvciBjb21wb25lbnRcbiAgLy8gb3IgY29udGFpbmVyKSwgc28gdGhpcyBsb29wIHdpbGwgYmUgc2tpcHBlZCwgYnV0IHdlIG11c3Qga2VlcCB0aGUgbG9vcCBoZXJlIHRvIHN1cHBvcnRcbiAgLy8gdGhlIHJhcmVyIGNhc2Ugb2YgZGVlcGx5IG5lc3RlZCA8bmctdGVtcGxhdGU+IHRhZ3Mgb3IgaW5saW5lIHZpZXdzLlxuICBsZXQgaG9zdFROb2RlID0gdmlld1tIT1NUX05PREVdO1xuICBsZXQgdmlld09mZnNldCA9IDE7XG4gIHdoaWxlIChob3N0VE5vZGUgJiYgaG9zdFROb2RlLmluamVjdG9ySW5kZXggPT09IC0xKSB7XG4gICAgdmlldyA9IHZpZXdbREVDTEFSQVRJT05fVklFV10gITtcbiAgICBob3N0VE5vZGUgPSB2aWV3W0hPU1RfTk9ERV0gITtcbiAgICB2aWV3T2Zmc2V0Kys7XG4gIH1cbiAgcmV0dXJuIGhvc3RUTm9kZSA/XG4gICAgICBob3N0VE5vZGUuaW5qZWN0b3JJbmRleCB8ICh2aWV3T2Zmc2V0IDw8IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbkZsYWdzLlZpZXdPZmZzZXRTaGlmdCkgOlxuICAgICAgLTEgYXMgYW55O1xufVxuXG4vKipcbiAqIE1ha2VzIGEgdHlwZSBvciBhbiBpbmplY3Rpb24gdG9rZW4gcHVibGljIHRvIHRoZSBESSBzeXN0ZW0gYnkgYWRkaW5nIGl0IHRvIGFuXG4gKiBpbmplY3RvcidzIGJsb29tIGZpbHRlci5cbiAqXG4gKiBAcGFyYW0gZGkgVGhlIG5vZGUgaW5qZWN0b3IgaW4gd2hpY2ggYSBkaXJlY3RpdmUgd2lsbCBiZSBhZGRlZFxuICogQHBhcmFtIHRva2VuIFRoZSB0eXBlIG9yIHRoZSBpbmplY3Rpb24gdG9rZW4gdG8gYmUgbWFkZSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpUHVibGljSW5JbmplY3RvcihcbiAgICBpbmplY3RvckluZGV4OiBudW1iZXIsIHZpZXc6IExWaWV3RGF0YSwgdG9rZW46IEluamVjdGlvblRva2VuPGFueT58IFR5cGU8YW55Pik6IHZvaWQge1xuICBibG9vbUFkZChpbmplY3RvckluZGV4LCB2aWV3W1RWSUVXXSwgdG9rZW4pO1xufVxuXG4vKipcbiAqIEluamVjdCBzdGF0aWMgYXR0cmlidXRlIHZhbHVlIGludG8gZGlyZWN0aXZlIGNvbnN0cnVjdG9yLlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgd2l0aCBgZmFjdG9yeWAgZnVuY3Rpb25zIHdoaWNoIGFyZSBnZW5lcmF0ZWQgYXMgcGFydCBvZlxuICogYGRlZmluZURpcmVjdGl2ZWAgb3IgYGRlZmluZUNvbXBvbmVudGAuIFRoZSBtZXRob2QgcmV0cmlldmVzIHRoZSBzdGF0aWMgdmFsdWVcbiAqIG9mIGFuIGF0dHJpYnV0ZS4gKER5bmFtaWMgYXR0cmlidXRlcyBhcmUgbm90IHN1cHBvcnRlZCBzaW5jZSB0aGV5IGFyZSBub3QgcmVzb2x2ZWRcbiAqICBhdCB0aGUgdGltZSBvZiBpbmplY3Rpb24gYW5kIGNhbiBjaGFuZ2Ugb3ZlciB0aW1lLilcbiAqXG4gKiAjIEV4YW1wbGVcbiAqIEdpdmVuOlxuICogYGBgXG4gKiBAQ29tcG9uZW50KC4uLilcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IoQEF0dHJpYnV0ZSgndGl0bGUnKSB0aXRsZTogc3RyaW5nKSB7IC4uLiB9XG4gKiB9XG4gKiBgYGBcbiAqIFdoZW4gaW5zdGFudGlhdGVkIHdpdGhcbiAqIGBgYFxuICogPG15LWNvbXBvbmVudCB0aXRsZT1cIkhlbGxvXCI+PC9teS1jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBUaGVuIGZhY3RvcnkgbWV0aG9kIGdlbmVyYXRlZCBpczpcbiAqIGBgYFxuICogTXlDb21wb25lbnQubmdDb21wb25lbnREZWYgPSBkZWZpbmVDb21wb25lbnQoe1xuICogICBmYWN0b3J5OiAoKSA9PiBuZXcgTXlDb21wb25lbnQoaW5qZWN0QXR0cmlidXRlKCd0aXRsZScpKVxuICogICAuLi5cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RBdHRyaWJ1dGVJbXBsKHROb2RlOiBUTm9kZSwgYXR0ck5hbWVUb0luamVjdDogc3RyaW5nKTogc3RyaW5nfHVuZGVmaW5lZCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzKFxuICAgICAgICAgICAgICAgICAgIHROb2RlLCBUTm9kZVR5cGUuQ29udGFpbmVyLCBUTm9kZVR5cGUuRWxlbWVudCwgVE5vZGVUeXBlLkVsZW1lbnRDb250YWluZXIpO1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZCh0Tm9kZSwgJ2V4cGVjdGluZyB0Tm9kZScpO1xuICBjb25zdCBhdHRycyA9IHROb2RlLmF0dHJzO1xuICBpZiAoYXR0cnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSA9IGkgKyAyKSB7XG4gICAgICBjb25zdCBhdHRyTmFtZSA9IGF0dHJzW2ldO1xuICAgICAgaWYgKGF0dHJOYW1lID09PSBBdHRyaWJ1dGVNYXJrZXIuU2VsZWN0T25seSkgYnJlYWs7XG4gICAgICBpZiAoYXR0ck5hbWUgPT0gYXR0ck5hbWVUb0luamVjdCkge1xuICAgICAgICByZXR1cm4gYXR0cnNbaSArIDFdIGFzIHN0cmluZztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGdpdmVuIHRva2VuIGZyb20gdGhlIE5vZGVJbmplY3RvcnMgPT4gTW9kdWxlSW5qZWN0b3IuXG4gKlxuICogTG9vayBmb3IgdGhlIGluamVjdG9yIHByb3ZpZGluZyB0aGUgdG9rZW4gYnkgd2Fsa2luZyB1cCB0aGUgbm9kZSBpbmplY3RvciB0cmVlIGFuZCB0aGVuXG4gKiB0aGUgbW9kdWxlIGluamVjdG9yIHRyZWUuXG4gKlxuICogQHBhcmFtIG5vZGVJbmplY3RvciBOb2RlIGluamVjdG9yIHdoZXJlIHRoZSBzZWFyY2ggc2hvdWxkIHN0YXJ0XG4gKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIHRvIGxvb2sgZm9yXG4gKiBAcGFyYW0gZmxhZ3MgSW5qZWN0aW9uIGZsYWdzXG4gKiBAcmV0dXJucyB0aGUgdmFsdWUgZnJvbSB0aGUgaW5qZWN0b3Igb3IgYG51bGxgIHdoZW4gbm90IGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZUluamVjdGFibGU8VD4oXG4gICAgdE5vZGU6IFRFbGVtZW50Tm9kZSB8IFRDb250YWluZXJOb2RlIHwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBsVmlld0RhdGE6IExWaWV3RGF0YSxcbiAgICB0b2tlbjogVHlwZTxUPnwgSW5qZWN0aW9uVG9rZW48VD4sIGZsYWdzOiBJbmplY3RGbGFncyA9IEluamVjdEZsYWdzLkRlZmF1bHQsXG4gICAgbm90Rm91bmRWYWx1ZT86IGFueSk6IFR8bnVsbCB7XG4gIGNvbnN0IGJsb29tSGFzaCA9IGJsb29tSGFzaEJpdE9yRmFjdG9yeSh0b2tlbik7XG4gIC8vIElmIHRoZSBJRCBzdG9yZWQgaGVyZSBpcyBhIGZ1bmN0aW9uLCB0aGlzIGlzIGEgc3BlY2lhbCBvYmplY3QgbGlrZSBFbGVtZW50UmVmIG9yIFRlbXBsYXRlUmVmXG4gIC8vIHNvIGp1c3QgY2FsbCB0aGUgZmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgaXQuXG4gIGlmICh0eXBlb2YgYmxvb21IYXNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3Qgc2F2ZVByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpO1xuICAgIGNvbnN0IHNhdmVWaWV3RGF0YSA9IGdldFZpZXdEYXRhKCk7XG4gICAgc2V0VE5vZGVBbmRWaWV3RGF0YSh0Tm9kZSwgbFZpZXdEYXRhKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGJsb29tSGFzaCgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRUTm9kZUFuZFZpZXdEYXRhKHNhdmVQcmV2aW91c09yUGFyZW50VE5vZGUsIHNhdmVWaWV3RGF0YSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBibG9vbUhhc2ggPT0gJ251bWJlcicpIHtcbiAgICAvLyBJZiB0aGUgdG9rZW4gaGFzIGEgYmxvb20gaGFzaCwgdGhlbiBpdCBpcyBhIHRva2VuIHdoaWNoIGNvdWxkIGJlIGluIE5vZGVJbmplY3Rvci5cblxuICAgIC8vIEEgcmVmZXJlbmNlIHRvIHRoZSBwcmV2aW91cyBpbmplY3RvciBUVmlldyB0aGF0IHdhcyBmb3VuZCB3aGlsZSBjbGltYmluZyB0aGUgZWxlbWVudCBpbmplY3RvclxuICAgIC8vIHRyZWUuIFRoaXMgaXMgdXNlZCB0byBrbm93IGlmIHZpZXdQcm92aWRlcnMgY2FuIGJlIGFjY2Vzc2VkIG9uIHRoZSBjdXJyZW50IGluamVjdG9yLlxuICAgIGxldCBwcmV2aW91c1RWaWV3OiBUVmlld3xudWxsID0gbnVsbDtcbiAgICBsZXQgaW5qZWN0b3JJbmRleCA9IGdldEluamVjdG9ySW5kZXgodE5vZGUsIGxWaWV3RGF0YSk7XG4gICAgbGV0IHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24gPSBOT19QQVJFTlRfSU5KRUNUT1I7XG5cbiAgICAvLyBJZiB3ZSBzaG91bGQgc2tpcCB0aGlzIGluamVjdG9yLCBzdGFydCBieSBzZWFyY2hpbmcgdGhlIHBhcmVudCBpbmplY3Rvci5cbiAgICBpZiAoZmxhZ3MgJiBJbmplY3RGbGFncy5Ta2lwU2VsZikge1xuICAgICAgcGFyZW50TG9jYXRpb24gPSBpbmplY3RvckluZGV4ID09PSAtMSA/IGdldFBhcmVudEluamVjdG9yTG9jYXRpb24odE5vZGUsIGxWaWV3RGF0YSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxWaWV3RGF0YVtpbmplY3RvckluZGV4ICsgUEFSRU5UX0lOSkVDVE9SXTtcblxuICAgICAgaWYgKCFzaG91bGRTZWFyY2hQYXJlbnQoZmxhZ3MsIHBhcmVudExvY2F0aW9uKSkge1xuICAgICAgICBpbmplY3RvckluZGV4ID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2aW91c1RWaWV3ID0gbFZpZXdEYXRhW1RWSUVXXTtcbiAgICAgICAgaW5qZWN0b3JJbmRleCA9IGdldFBhcmVudEluamVjdG9ySW5kZXgocGFyZW50TG9jYXRpb24pO1xuICAgICAgICBsVmlld0RhdGEgPSBnZXRQYXJlbnRJbmplY3RvclZpZXcocGFyZW50TG9jYXRpb24sIGxWaWV3RGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhdmVyc2UgdXAgdGhlIGluamVjdG9yIHRyZWUgdW50aWwgd2UgZmluZCBhIHBvdGVudGlhbCBtYXRjaCBvciB1bnRpbCB3ZSBrbm93IHRoZXJlXG4gICAgLy8gKmlzbid0KiBhIG1hdGNoLlxuICAgIHdoaWxlIChpbmplY3RvckluZGV4ICE9PSAtMSkge1xuICAgICAgcGFyZW50TG9jYXRpb24gPSBsVmlld0RhdGFbaW5qZWN0b3JJbmRleCArIFBBUkVOVF9JTkpFQ1RPUl07XG5cbiAgICAgIC8vIENoZWNrIHRoZSBjdXJyZW50IGluamVjdG9yLiBJZiBpdCBtYXRjaGVzLCBzZWUgaWYgaXQgY29udGFpbnMgdG9rZW4uXG4gICAgICBjb25zdCB0VmlldyA9IGxWaWV3RGF0YVtUVklFV107XG4gICAgICBpZiAoYmxvb21IYXNUb2tlbihibG9vbUhhc2gsIGluamVjdG9ySW5kZXgsIHRWaWV3LmRhdGEpKSB7XG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGhhdmUgYW4gaW5qZWN0b3Igd2hpY2ggKm1heSogY29udGFpbiB0aGUgdG9rZW4sIHNvIHdlIHN0ZXAgdGhyb3VnaFxuICAgICAgICAvLyB0aGUgcHJvdmlkZXJzIGFuZCBkaXJlY3RpdmVzIGFzc29jaWF0ZWQgd2l0aCB0aGUgaW5qZWN0b3IncyBjb3JyZXNwb25kaW5nIG5vZGUgdG8gZ2V0XG4gICAgICAgIC8vIHRoZSBpbnN0YW5jZS5cbiAgICAgICAgY29uc3QgaW5zdGFuY2U6IFR8bnVsbCA9XG4gICAgICAgICAgICBzZWFyY2hUb2tlbnNPbkluamVjdG9yPFQ+KGluamVjdG9ySW5kZXgsIGxWaWV3RGF0YSwgdG9rZW4sIHByZXZpb3VzVFZpZXcpO1xuICAgICAgICBpZiAoaW5zdGFuY2UgIT09IE5PVF9GT1VORCkge1xuICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNob3VsZFNlYXJjaFBhcmVudChmbGFncywgcGFyZW50TG9jYXRpb24pICYmXG4gICAgICAgICAgYmxvb21IYXNUb2tlbihibG9vbUhhc2gsIGluamVjdG9ySW5kZXgsIGxWaWV3RGF0YSkpIHtcbiAgICAgICAgLy8gVGhlIGRlZiB3YXNuJ3QgZm91bmQgYW55d2hlcmUgb24gdGhpcyBub2RlLCBzbyBpdCB3YXMgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgICAgLy8gVHJhdmVyc2UgdXAgdGhlIHRyZWUgYW5kIGNvbnRpbnVlIHNlYXJjaGluZy5cbiAgICAgICAgcHJldmlvdXNUVmlldyA9IHRWaWV3O1xuICAgICAgICBpbmplY3RvckluZGV4ID0gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2NhdGlvbik7XG4gICAgICAgIGxWaWV3RGF0YSA9IGdldFBhcmVudEluamVjdG9yVmlldyhwYXJlbnRMb2NhdGlvbiwgbFZpZXdEYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElmIHdlIHNob3VsZCBub3Qgc2VhcmNoIHBhcmVudCBPUiBJZiB0aGUgYW5jZXN0b3IgYmxvb20gZmlsdGVyIHZhbHVlIGRvZXMgbm90IGhhdmUgdGhlXG4gICAgICAgIC8vIGJpdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBkaXJlY3RpdmUgd2UgY2FuIGdpdmUgdXAgb24gdHJhdmVyc2luZyB1cCB0byBmaW5kIHRoZSBzcGVjaWZpY1xuICAgICAgICAvLyBpbmplY3Rvci5cbiAgICAgICAgaW5qZWN0b3JJbmRleCA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICgoZmxhZ3MgJiAoSW5qZWN0RmxhZ3MuU2VsZiB8IEluamVjdEZsYWdzLkhvc3QpKSA9PT0gMCkge1xuICAgIGNvbnN0IG1vZHVsZUluamVjdG9yID0gbFZpZXdEYXRhW0lOSkVDVE9SXTtcbiAgICBpZiAobW9kdWxlSW5qZWN0b3IpIHtcbiAgICAgIHJldHVybiBtb2R1bGVJbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUsIGZsYWdzICYgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW5qZWN0Um9vdExpbXBNb2RlKHRva2VuLCBub3RGb3VuZFZhbHVlLCBmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKTtcbiAgICB9XG4gIH1cbiAgaWYgKGZsYWdzICYgSW5qZWN0RmxhZ3MuT3B0aW9uYWwpIHtcbiAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vZGVJbmplY3RvcjogTk9UX0ZPVU5EIFske3N0cmluZ2lmeSh0b2tlbil9XWApO1xuICB9XG59XG5cbmNvbnN0IE5PVF9GT1VORCA9IHt9O1xuXG5mdW5jdGlvbiBzZWFyY2hUb2tlbnNPbkluamVjdG9yPFQ+KFxuICAgIGluamVjdG9ySW5kZXg6IG51bWJlciwgaW5qZWN0b3JWaWV3OiBMVmlld0RhdGEsIHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPixcbiAgICBwcmV2aW91c1RWaWV3OiBUVmlldyB8IG51bGwpIHtcbiAgY29uc3QgY3VycmVudFRWaWV3ID0gaW5qZWN0b3JWaWV3W1RWSUVXXTtcbiAgY29uc3QgdE5vZGUgPSBjdXJyZW50VFZpZXcuZGF0YVtpbmplY3RvckluZGV4ICsgVE5PREVdIGFzIFROb2RlO1xuICBjb25zdCBub2RlRmxhZ3MgPSB0Tm9kZS5mbGFncztcbiAgY29uc3Qgbm9kZVByb3ZpZGVySW5kZXhlcyA9IHROb2RlLnByb3ZpZGVySW5kZXhlcztcbiAgY29uc3QgdEluamVjdGFibGVzID0gY3VycmVudFRWaWV3LmRhdGE7XG4gIC8vIEZpcnN0LCB3ZSBzdGVwIHRocm91Z2ggcHJvdmlkZXJzXG4gIGxldCBjYW5BY2Nlc3NWaWV3UHJvdmlkZXJzID0gZmFsc2U7XG4gIC8vIFdlIG5lZWQgdG8gZGV0ZXJtaW5lIGlmIHZpZXcgcHJvdmlkZXJzIGNhbiBiZSBhY2Nlc3NlZCBieSB0aGUgc3RhcnRpbmcgZWxlbWVudC5cbiAgLy8gSXQgaGFwcGVucyBpbiAyIGNhc2VzOlxuICAvLyAxKSBPbiB0aGUgaW5pdGlhbCBlbGVtZW50IGluamVjdG9yICwgaWYgd2UgYXJlIGluc3RhbnRpYXRpbmcgYSB0b2tlbiB3aGljaCBjYW4gc2VlIHRoZVxuICAvLyB2aWV3UHJvdmlkZXJzIG9mIHRoZSBjb21wb25lbnQgb2YgdGhhdCBlbGVtZW50LiBTdWNoIHRva2VuIGFyZTpcbiAgLy8gLSB0aGUgY29tcG9uZW50IGl0c2VsZiAoYnV0IG5vdCBvdGhlciBkaXJlY3RpdmVzKVxuICAvLyAtIHZpZXdQcm92aWRlcnMgdG9rZW5zIG9mIHRoZSBjb21wb25lbnQgKGJ1dCBub3QgcHJvdmlkZXJzIHRva2VucylcbiAgLy8gMikgVXBwZXIgaW4gdGhlIGVsZW1lbnQgaW5qZWN0b3IgdHJlZSwgaWYgdGhlIHN0YXJ0aW5nIGVsZW1lbnQgaXMgYWN0dWFsbHkgaW4gdGhlIHZpZXcgb2ZcbiAgLy8gdGhlIGN1cnJlbnQgZWxlbWVudC4gVG8gZGV0ZXJtaW5lIHRoaXMsIHdlIHRyYWNrIHRoZSB0cmFuc2l0aW9uIG9mIHZpZXcgZHVyaW5nIHRoZSBjbGltYixcbiAgLy8gYW5kIGNoZWNrIHRoZSBob3N0IG5vZGUgb2YgdGhlIGN1cnJlbnQgdmlldyB0byBpZGVudGlmeSBjb21wb25lbnQgdmlld3MuXG4gIGlmIChwcmV2aW91c1RWaWV3ID09IG51bGwgJiYgaXNDb21wb25lbnQodE5vZGUpICYmIGluY2x1ZGVWaWV3UHJvdmlkZXJzIHx8XG4gICAgICBwcmV2aW91c1RWaWV3ICE9IG51bGwgJiYgcHJldmlvdXNUVmlldyAhPSBjdXJyZW50VFZpZXcgJiZcbiAgICAgICAgICAoY3VycmVudFRWaWV3Lm5vZGUgPT0gbnVsbCB8fCBjdXJyZW50VFZpZXcubm9kZSAhLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50KSkge1xuICAgIGNhbkFjY2Vzc1ZpZXdQcm92aWRlcnMgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN0YXJ0SW5qZWN0YWJsZXMgPSBub2RlUHJvdmlkZXJJbmRleGVzICYgVE5vZGVQcm92aWRlckluZGV4ZXMuUHJvdmlkZXJzU3RhcnRJbmRleE1hc2s7XG4gIGNvbnN0IHN0YXJ0RGlyZWN0aXZlcyA9IG5vZGVGbGFncyA+PiBUTm9kZUZsYWdzLkRpcmVjdGl2ZVN0YXJ0aW5nSW5kZXhTaGlmdDtcbiAgY29uc3QgY3B0Vmlld1Byb3ZpZGVyc0NvdW50ID1cbiAgICAgIG5vZGVQcm92aWRlckluZGV4ZXMgPj4gVE5vZGVQcm92aWRlckluZGV4ZXMuQ3B0Vmlld1Byb3ZpZGVyc0NvdW50U2hpZnQ7XG4gIGNvbnN0IHN0YXJ0aW5nSW5kZXggPVxuICAgICAgY2FuQWNjZXNzVmlld1Byb3ZpZGVycyA/IHN0YXJ0SW5qZWN0YWJsZXMgOiBzdGFydEluamVjdGFibGVzICsgY3B0Vmlld1Byb3ZpZGVyc0NvdW50O1xuICBjb25zdCBkaXJlY3RpdmVDb3VudCA9IG5vZGVGbGFncyAmIFROb2RlRmxhZ3MuRGlyZWN0aXZlQ291bnRNYXNrO1xuICBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IHN0YXJ0RGlyZWN0aXZlcyArIGRpcmVjdGl2ZUNvdW50OyBpKyspIHtcbiAgICBjb25zdCBwcm92aWRlclRva2VuT3JEZWYgPSB0SW5qZWN0YWJsZXNbaV0gYXMgSW5qZWN0aW9uVG9rZW48YW55PnwgVHlwZTxhbnk+fCBEaXJlY3RpdmVEZWY8YW55PjtcbiAgICBpZiAoaSA8IHN0YXJ0RGlyZWN0aXZlcyAmJiB0b2tlbiA9PT0gcHJvdmlkZXJUb2tlbk9yRGVmIHx8XG4gICAgICAgIGkgPj0gc3RhcnREaXJlY3RpdmVzICYmIChwcm92aWRlclRva2VuT3JEZWYgYXMgRGlyZWN0aXZlRGVmPGFueT4pLnR5cGUgPT09IHRva2VuKSB7XG4gICAgICByZXR1cm4gZ2V0Tm9kZUluamVjdGFibGUodEluamVjdGFibGVzLCBpbmplY3RvclZpZXcsIGksIHROb2RlIGFzIFRFbGVtZW50Tm9kZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBOT1RfRk9VTkQ7XG59XG5cbi8qKlxuKiBSZXRyaWV2ZSBvciBpbnN0YW50aWF0ZSB0aGUgaW5qZWN0YWJsZSBmcm9tIHRoZSBgbERhdGFgIGF0IHBhcnRpY3VsYXIgYGluZGV4YC5cbipcbiogVGhpcyBmdW5jdGlvbiBjaGVja3MgdG8gc2VlIGlmIHRoZSB2YWx1ZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbnRpYXRlZCBhbmQgaWYgc28gcmV0dXJucyB0aGVcbiogY2FjaGVkIGBpbmplY3RhYmxlYC4gT3RoZXJ3aXNlIGlmIGl0IGRldGVjdHMgdGhhdCB0aGUgdmFsdWUgaXMgc3RpbGwgYSBmYWN0b3J5IGl0XG4qIGluc3RhbnRpYXRlcyB0aGUgYGluamVjdGFibGVgIGFuZCBjYWNoZXMgdGhlIHZhbHVlLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlSW5qZWN0YWJsZShcbiAgICB0RGF0YTogVERhdGEsIGxEYXRhOiBMVmlld0RhdGEsIGluZGV4OiBudW1iZXIsIHROb2RlOiBURWxlbWVudE5vZGUpOiBhbnkge1xuICBsZXQgdmFsdWUgPSBsRGF0YVtpbmRleF07XG4gIGlmIChpc0ZhY3RvcnkodmFsdWUpKSB7XG4gICAgY29uc3QgZmFjdG9yeTogTm9kZUluamVjdG9yRmFjdG9yeSA9IHZhbHVlO1xuICAgIGlmIChmYWN0b3J5LnJlc29sdmluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDaXJjdWxhciBkZXAgZm9yICR7c3RyaW5naWZ5KHREYXRhW2luZGV4XSl9YCk7XG4gICAgfVxuICAgIGNvbnN0IHByZXZpb3VzSW5jbHVkZVZpZXdQcm92aWRlcnMgPSBzZXRJbmNsdWRlVmlld1Byb3ZpZGVycyhmYWN0b3J5LmNhblNlZVZpZXdQcm92aWRlcnMpO1xuICAgIGZhY3RvcnkucmVzb2x2aW5nID0gdHJ1ZTtcbiAgICBsZXQgcHJldmlvdXNJbmplY3RJbXBsZW1lbnRhdGlvbjtcbiAgICBpZiAoZmFjdG9yeS5pbmplY3RJbXBsKSB7XG4gICAgICBwcmV2aW91c0luamVjdEltcGxlbWVudGF0aW9uID0gc2V0SW5qZWN0SW1wbGVtZW50YXRpb24oZmFjdG9yeS5pbmplY3RJbXBsKTtcbiAgICB9XG4gICAgY29uc3Qgc2F2ZVByZXZpb3VzT3JQYXJlbnRUTm9kZSA9IGdldFByZXZpb3VzT3JQYXJlbnRUTm9kZSgpO1xuICAgIGNvbnN0IHNhdmVWaWV3RGF0YSA9IGdldFZpZXdEYXRhKCk7XG4gICAgc2V0VE5vZGVBbmRWaWV3RGF0YSh0Tm9kZSwgbERhdGEpO1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZSA9IGxEYXRhW2luZGV4XSA9IGZhY3RvcnkuZmFjdG9yeShudWxsLCB0RGF0YSwgbERhdGEsIHROb2RlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKGZhY3RvcnkuaW5qZWN0SW1wbCkgc2V0SW5qZWN0SW1wbGVtZW50YXRpb24ocHJldmlvdXNJbmplY3RJbXBsZW1lbnRhdGlvbik7XG4gICAgICBzZXRJbmNsdWRlVmlld1Byb3ZpZGVycyhwcmV2aW91c0luY2x1ZGVWaWV3UHJvdmlkZXJzKTtcbiAgICAgIGZhY3RvcnkucmVzb2x2aW5nID0gZmFsc2U7XG4gICAgICBzZXRUTm9kZUFuZFZpZXdEYXRhKHNhdmVQcmV2aW91c09yUGFyZW50VE5vZGUsIHNhdmVWaWV3RGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBiaXQgaW4gYW4gaW5qZWN0b3IncyBibG9vbSBmaWx0ZXIgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3RcbiAqIHRoZSBkaXJlY3RpdmUgbWlnaHQgYmUgcHJvdmlkZWQgYnkgdGhlIGluamVjdG9yLlxuICpcbiAqIFdoZW4gYSBkaXJlY3RpdmUgaXMgcHVibGljLCBpdCBpcyBhZGRlZCB0byB0aGUgYmxvb20gZmlsdGVyIGFuZCBnaXZlbiBhIHVuaXF1ZSBJRCB0aGF0IGNhbiBiZVxuICogcmV0cmlldmVkIG9uIHRoZSBUeXBlLiBXaGVuIHRoZSBkaXJlY3RpdmUgaXNuJ3QgcHVibGljIG9yIHRoZSB0b2tlbiBpcyBub3QgYSBkaXJlY3RpdmUgYG51bGxgXG4gKiBpcyByZXR1cm5lZCBhcyB0aGUgbm9kZSBpbmplY3RvciBjYW4gbm90IHBvc3NpYmx5IHByb3ZpZGUgdGhhdCB0b2tlbi5cbiAqXG4gKiBAcGFyYW0gdG9rZW4gdGhlIGluamVjdGlvbiB0b2tlblxuICogQHJldHVybnMgdGhlIG1hdGNoaW5nIGJpdCB0byBjaGVjayBpbiB0aGUgYmxvb20gZmlsdGVyIG9yIGBudWxsYCBpZiB0aGUgdG9rZW4gaXMgbm90IGtub3duLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxvb21IYXNoQml0T3JGYWN0b3J5KHRva2VuOiBUeXBlPGFueT58IEluamVjdGlvblRva2VuPGFueT4pOiBudW1iZXJ8RnVuY3Rpb258XG4gICAgdW5kZWZpbmVkIHtcbiAgY29uc3QgdG9rZW5JZDogbnVtYmVyfHVuZGVmaW5lZCA9ICh0b2tlbiBhcyBhbnkpW05HX0VMRU1FTlRfSURdO1xuICByZXR1cm4gdHlwZW9mIHRva2VuSWQgPT09ICdudW1iZXInID8gdG9rZW5JZCAmIEJMT09NX01BU0sgOiB0b2tlbklkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmxvb21IYXNUb2tlbihcbiAgICBibG9vbUhhc2g6IG51bWJlciwgaW5qZWN0b3JJbmRleDogbnVtYmVyLCBpbmplY3RvclZpZXc6IExWaWV3RGF0YSB8IFREYXRhKSB7XG4gIC8vIENyZWF0ZSBhIG1hc2sgdGhhdCB0YXJnZXRzIHRoZSBzcGVjaWZpYyBiaXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkaXJlY3RpdmUgd2UncmUgbG9va2luZyBmb3IuXG4gIC8vIEpTIGJpdCBvcGVyYXRpb25zIGFyZSAzMiBiaXRzLCBzbyB0aGlzIHdpbGwgYmUgYSBudW1iZXIgYmV0d2VlbiAyXjAgYW5kIDJeMzEsIGNvcnJlc3BvbmRpbmdcbiAgLy8gdG8gYml0IHBvc2l0aW9ucyAwIC0gMzEgaW4gYSAzMiBiaXQgaW50ZWdlci5cbiAgY29uc3QgbWFzayA9IDEgPDwgYmxvb21IYXNoO1xuICBjb25zdCBiNyA9IGJsb29tSGFzaCAmIDB4ODA7XG4gIGNvbnN0IGI2ID0gYmxvb21IYXNoICYgMHg0MDtcbiAgY29uc3QgYjUgPSBibG9vbUhhc2ggJiAweDIwO1xuXG4gIC8vIE91ciBibG9vbSBmaWx0ZXIgc2l6ZSBpcyAyNTYgYml0cywgd2hpY2ggaXMgZWlnaHQgMzItYml0IGJsb29tIGZpbHRlciBidWNrZXRzOlxuICAvLyBiZjAgPSBbMCAtIDMxXSwgYmYxID0gWzMyIC0gNjNdLCBiZjIgPSBbNjQgLSA5NV0sIGJmMyA9IFs5NiAtIDEyN10sIGV0Yy5cbiAgLy8gR2V0IHRoZSBibG9vbSBmaWx0ZXIgdmFsdWUgZnJvbSB0aGUgYXBwcm9wcmlhdGUgYnVja2V0IGJhc2VkIG9uIHRoZSBkaXJlY3RpdmUncyBibG9vbUJpdC5cbiAgbGV0IHZhbHVlOiBudW1iZXI7XG5cbiAgaWYgKGI3KSB7XG4gICAgdmFsdWUgPSBiNiA/IChiNSA/IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgN10gOiBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDZdKSA6XG4gICAgICAgICAgICAgICAgIChiNSA/IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgNV0gOiBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDRdKTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGI2ID8gKGI1ID8gaW5qZWN0b3JWaWV3W2luamVjdG9ySW5kZXggKyAzXSA6IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgMl0pIDpcbiAgICAgICAgICAgICAgICAgKGI1ID8gaW5qZWN0b3JWaWV3W2luamVjdG9ySW5kZXggKyAxXSA6IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4XSk7XG4gIH1cblxuICAvLyBJZiB0aGUgYmxvb20gZmlsdGVyIHZhbHVlIGhhcyB0aGUgYml0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRpcmVjdGl2ZSdzIGJsb29tQml0IGZsaXBwZWQgb24sXG4gIC8vIHRoaXMgaW5qZWN0b3IgaXMgYSBwb3RlbnRpYWwgbWF0Y2guXG4gIHJldHVybiAhISh2YWx1ZSAmIG1hc2spO1xufVxuXG4vKiogUmV0dXJucyB0cnVlIGlmIGZsYWdzIHByZXZlbnQgcGFyZW50IGluamVjdG9yIGZyb20gYmVpbmcgc2VhcmNoZWQgZm9yIHRva2VucyAqL1xuZnVuY3Rpb24gc2hvdWxkU2VhcmNoUGFyZW50KGZsYWdzOiBJbmplY3RGbGFncywgcGFyZW50TG9jYXRpb246IFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbik6IGJvb2xlYW58XG4gICAgbnVtYmVyIHtcbiAgcmV0dXJuICEoXG4gICAgICBmbGFncyAmIEluamVjdEZsYWdzLlNlbGYgfHxcbiAgICAgIChmbGFncyAmIEluamVjdEZsYWdzLkhvc3QgJiYgZ2V0UGFyZW50SW5qZWN0b3JWaWV3T2Zmc2V0KHBhcmVudExvY2F0aW9uKSA+IDApKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZhY3RvcnlPZjxUPih0eXBlOiBUeXBlPGFueT4pOiAoKHR5cGU6IFR5cGU8VD58IG51bGwpID0+IFQpfG51bGwge1xuICBjb25zdCB0eXBlQW55ID0gdHlwZSBhcyBhbnk7XG4gIGNvbnN0IGRlZiA9IGdldENvbXBvbmVudERlZjxUPih0eXBlQW55KSB8fCBnZXREaXJlY3RpdmVEZWY8VD4odHlwZUFueSkgfHxcbiAgICAgIGdldFBpcGVEZWY8VD4odHlwZUFueSkgfHwgZ2V0SW5qZWN0YWJsZURlZjxUPih0eXBlQW55KSB8fCBnZXRJbmplY3RvckRlZjxUPih0eXBlQW55KTtcbiAgaWYgKCFkZWYgfHwgZGVmLmZhY3RvcnkgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBkZWYuZmFjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEluaGVyaXRlZEZhY3Rvcnk8VD4odHlwZTogVHlwZTxhbnk+KTogKHR5cGU6IFR5cGU8VD4pID0+IFQge1xuICBjb25zdCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0eXBlLnByb3RvdHlwZSkuY29uc3RydWN0b3IgYXMgVHlwZTxhbnk+O1xuICBjb25zdCBmYWN0b3J5ID0gZ2V0RmFjdG9yeU9mPFQ+KHByb3RvKTtcbiAgaWYgKGZhY3RvcnkgIT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGVyZSBpcyBubyBmYWN0b3J5IGRlZmluZWQuIEVpdGhlciB0aGlzIHdhcyBpbXByb3BlciB1c2FnZSBvZiBpbmhlcml0YW5jZVxuICAgIC8vIChubyBBbmd1bGFyIGRlY29yYXRvciBvbiB0aGUgc3VwZXJjbGFzcykgb3IgdGhlcmUgaXMgbm8gY29uc3RydWN0b3IgYXQgYWxsXG4gICAgLy8gaW4gdGhlIGluaGVyaXRhbmNlIGNoYWluLiBTaW5jZSB0aGUgdHdvIGNhc2VzIGNhbm5vdCBiZSBkaXN0aW5ndWlzaGVkLCB0aGVcbiAgICAvLyBsYXR0ZXIgaGFzIHRvIGJlIGFzc3VtZWQuXG4gICAgcmV0dXJuICh0KSA9PiBuZXcgdCgpO1xuICB9XG59XG4iXX0=