/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getInjectableDef, getInjectorDef } from '../di/defs';
import { InjectFlags, injectRootLimpMode, setInjectImplementation } from '../di/injector_compatibility';
import { assertDefined, assertEqual } from './assert';
import { getComponentDef, getDirectiveDef, getPipeDef } from './definition';
import { NG_ELEMENT_ID } from './fields';
import { NO_PARENT_INJECTOR, PARENT_INJECTOR, TNODE, isFactory } from './interfaces/injector';
import { DECLARATION_VIEW, HOST_NODE, INJECTOR, TVIEW } from './interfaces/view';
import { assertNodeOfPossibleTypes } from './node_assert';
import { getLView, getPreviousOrParentTNode, setTNodeAndViewData } from './state';
import { getHostTElementNode, getParentInjectorIndex, getParentInjectorView, hasParentInjector, isComponent, isComponentDef, stringify } from './util';
/**
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
 * @type {?}
 */
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
/**
 * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
 * directives that will share slots, and thus, the fewer false positives when checking for
 * the existence of a directive.
 * @type {?}
 */
const BLOOM_SIZE = 256;
/** @type {?} */
const BLOOM_MASK = BLOOM_SIZE - 1;
/**
 * Counter used to generate unique IDs for directives.
 * @type {?}
 */
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
    let id = typeof type !== 'string' ? ((/** @type {?} */ (type)))[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
    // Set a unique ID on the directive type, so if something tries to inject the directive,
    // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
    if (id == null) {
        id = ((/** @type {?} */ (type)))[NG_ELEMENT_ID] = nextNgElementId++;
    }
    // We only have BLOOM_SIZE (256) slots in our bloom filter (8 buckets * 32 bits each),
    // so all unique IDs must be modulo-ed into a number from 0 - 255 to fit into the filter.
    /** @type {?} */
    const bloomBit = id & BLOOM_MASK;
    // Create a mask that targets the specific bit associated with the directive.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    /** @type {?} */
    const mask = 1 << bloomBit;
    // Use the raw bloomBit number to determine which bloom filter bucket we should check
    // e.g: bf0 = [0 - 31], bf1 = [32 - 63], bf2 = [64 - 95], bf3 = [96 - 127], etc
    /** @type {?} */
    const b7 = bloomBit & 0x80;
    /** @type {?} */
    const b6 = bloomBit & 0x40;
    /** @type {?} */
    const b5 = bloomBit & 0x20;
    /** @type {?} */
    const tData = (/** @type {?} */ (tView.data));
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
        ngDevMode && assertEqual(tNode.flags === 0 || tNode.flags === 1 /* isComponent */, true, 'expected tNode.flags to not be initialized');
    }
    /** @type {?} */
    const parentLoc = getParentInjectorLocation(tNode, hostView);
    /** @type {?} */
    const parentIndex = getParentInjectorIndex(parentLoc);
    /** @type {?} */
    const parentLView = getParentInjectorView(parentLoc, hostView);
    /** @type {?} */
    const injectorIndex = tNode.injectorIndex;
    // If a parent injector can't be found, its location is set to -1.
    // In that case, we don't need to set up a cumulative bloom
    if (hasParentInjector(parentLoc)) {
        /** @type {?} */
        const parentData = (/** @type {?} */ (parentLView[TVIEW].data));
        // Creates a cumulative bloom filter that merges the parent's bloom filter
        // and its own cumulative bloom (which contains tokens for all ancestors)
        for (let i = 0; i < 8; i++) {
            hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
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
        return (/** @type {?} */ (tNode.parent.injectorIndex)); // ViewOffset is 0
    }
    // For most cases, the parent injector index can be found on the host node (e.g. for component
    // or container), so this loop will be skipped, but we must keep the loop here to support
    // the rarer case of deeply nested <ng-template> tags or inline views.
    /** @type {?} */
    let hostTNode = view[HOST_NODE];
    /** @type {?} */
    let viewOffset = 1;
    while (hostTNode && hostTNode.injectorIndex === -1) {
        view = (/** @type {?} */ (view[DECLARATION_VIEW]));
        hostTNode = (/** @type {?} */ (view[HOST_NODE]));
        viewOffset++;
    }
    return hostTNode ?
        hostTNode.injectorIndex | (viewOffset << 16 /* ViewOffsetShift */) :
        (/** @type {?} */ (-1));
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
            if (attrName === 3 /* SelectOnly */)
                break;
            if (attrName == attrNameToInject) {
                return (/** @type {?} */ (attrs[i + 1]));
            }
        }
    }
    return null;
}
/**
 * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * @template T
 * @param {?} tNode The Node where the search for the injector should start
 * @param {?} lView The `LView` that contains the `tNode`
 * @param {?} token The token to look for
 * @param {?=} flags Injection flags
 * @param {?=} notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
 * @return {?} the value from the injector, `null` when not found, or `notFoundValue` if provided
 */
export function getOrCreateInjectable(tNode, lView, token, flags = InjectFlags.Default, notFoundValue) {
    /** @type {?} */
    const bloomHash = bloomHashBitOrFactory(token);
    // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
    // so just call the factory function to create it.
    if (typeof bloomHash === 'function') {
        /** @type {?} */
        const savePreviousOrParentTNode = getPreviousOrParentTNode();
        /** @type {?} */
        const saveLView = getLView();
        setTNodeAndViewData(tNode, lView);
        try {
            /** @type {?} */
            const value = bloomHash();
            if (value == null && !(flags & InjectFlags.Optional)) {
                throw new Error(`No provider for ${stringify(token)}!`);
            }
            else {
                return value;
            }
        }
        finally {
            setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
        }
    }
    else if (typeof bloomHash == 'number') {
        // If the token has a bloom hash, then it is a token which could be in NodeInjector.
        // A reference to the previous injector TView that was found while climbing the element injector
        // tree. This is used to know if viewProviders can be accessed on the current injector.
        /** @type {?} */
        let previousTView = null;
        /** @type {?} */
        let injectorIndex = getInjectorIndex(tNode, lView);
        /** @type {?} */
        let parentLocation = NO_PARENT_INJECTOR;
        /** @type {?} */
        let hostTElementNode = flags & InjectFlags.Host ? getHostTElementNode(lView) : null;
        // If we should skip this injector, or if there is no injector on this node, start by searching
        // the parent injector.
        if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
            parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) :
                lView[injectorIndex + PARENT_INJECTOR];
            if (!shouldSearchParent(flags, false)) {
                injectorIndex = -1;
            }
            else {
                previousTView = lView[TVIEW];
                injectorIndex = getParentInjectorIndex(parentLocation);
                lView = getParentInjectorView(parentLocation, lView);
            }
        }
        // Traverse up the injector tree until we find a potential match or until we know there
        // *isn't* a match.
        while (injectorIndex !== -1) {
            parentLocation = lView[injectorIndex + PARENT_INJECTOR];
            // Check the current injector. If it matches, see if it contains token.
            /** @type {?} */
            const tView = lView[TVIEW];
            if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                // At this point, we have an injector which *may* contain the token, so we step through
                // the providers and directives associated with the injector's corresponding node to get
                // the instance.
                /** @type {?} */
                const instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                if (instance !== NOT_FOUND) {
                    return instance;
                }
            }
            if (shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + TNODE] === hostTElementNode) &&
                bloomHasToken(bloomHash, injectorIndex, lView)) {
                // The def wasn't found anywhere on this node, so it was a false positive.
                // Traverse up the tree and continue searching.
                previousTView = tView;
                injectorIndex = getParentInjectorIndex(parentLocation);
                lView = getParentInjectorView(parentLocation, lView);
            }
            else {
                // If we should not search parent OR If the ancestor bloom filter value does not have the
                // bit corresponding to the directive we can give up on traversing up to find the specific
                // injector.
                injectorIndex = -1;
            }
        }
    }
    if (flags & InjectFlags.Optional && notFoundValue === undefined) {
        // This must be set or the NullInjector will throw for optional deps
        notFoundValue = null;
    }
    if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
        /** @type {?} */
        const moduleInjector = lView[INJECTOR];
        if (moduleInjector) {
            return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
        }
        else {
            return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
        }
    }
    if (flags & InjectFlags.Optional) {
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
 * @param {?} lView
 * @param {?} token
 * @param {?} previousTView
 * @param {?} flags
 * @param {?} hostTElementNode
 * @return {?}
 */
function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
    /** @type {?} */
    const currentTView = lView[TVIEW];
    /** @type {?} */
    const tNode = (/** @type {?} */ (currentTView.data[injectorIndex + TNODE]));
    // First, we need to determine if view providers can be accessed by the starting element.
    // There are two possibities
    /** @type {?} */
    const canAccessViewProviders = previousTView == null ?
        // 1) This is the first invocation `previousTView == null` which means that we are at the
        // `TNode` of where injector is starting to look. In such a case the only time we are allowed
        // to look into the ViewProviders is if:
        // - we are on a component
        // - AND the injector set `includeViewProviders` to true (implying that the token can see
        // ViewProviders because it is the Component or a Service which itself was declared in
        // ViewProviders)
        (isComponent(tNode) && includeViewProviders) :
        // 2) `previousTView != null` which means that we are now walking across the parent nodes.
        // In such a case we are only allowed to look into the ViewProviders if:
        // - We just crossed from child View to Parent View `previousTView != currentTView`
        // - AND the parent TNode is an Element.
        // This means that we just came from the Component's View and therefore are allowed to see
        // into the ViewProviders.
        (previousTView != currentTView && (tNode.type === 3 /* Element */));
    // This special case happens when there is a @host on the inject and when we are searching
    // on the host element node.
    /** @type {?} */
    const isHostSpecialCase = (flags & InjectFlags.Host) && hostTElementNode === tNode;
    /** @type {?} */
    const injectableIdx = locateDirectiveOrProvider(tNode, lView, token, canAccessViewProviders, isHostSpecialCase);
    if (injectableIdx !== null) {
        return getNodeInjectable(currentTView.data, lView, injectableIdx, (/** @type {?} */ (tNode)));
    }
    else {
        return NOT_FOUND;
    }
}
/**
 * Searches for the given token among the node's directives and providers.
 *
 * @template T
 * @param {?} tNode TNode on which directives are present.
 * @param {?} lView The view we are currently processing
 * @param {?} token Provider token or type of a directive to look for.
 * @param {?} canAccessViewProviders Whether view providers should be considered.
 * @param {?} isHostSpecialCase Whether the host special case applies.
 * @return {?} Index of a found directive or provider, or null when none found.
 */
export function locateDirectiveOrProvider(tNode, lView, token, canAccessViewProviders, isHostSpecialCase) {
    /** @type {?} */
    const tView = lView[TVIEW];
    /** @type {?} */
    const nodeProviderIndexes = tNode.providerIndexes;
    /** @type {?} */
    const tInjectables = tView.data;
    /** @type {?} */
    const injectablesStart = nodeProviderIndexes & 65535 /* ProvidersStartIndexMask */;
    /** @type {?} */
    const directivesStart = tNode.directiveStart;
    /** @type {?} */
    const directiveEnd = tNode.directiveEnd;
    /** @type {?} */
    const cptViewProvidersCount = nodeProviderIndexes >> 16 /* CptViewProvidersCountShift */;
    /** @type {?} */
    const startingIndex = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount;
    // When the host special case applies, only the viewProviders and the component are visible
    /** @type {?} */
    const endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : directiveEnd;
    for (let i = startingIndex; i < endIndex; i++) {
        /** @type {?} */
        const providerTokenOrDef = (/** @type {?} */ (tInjectables[i]));
        if (i < directivesStart && token === providerTokenOrDef ||
            i >= directivesStart && ((/** @type {?} */ (providerTokenOrDef))).type === token) {
            return i;
        }
    }
    if (isHostSpecialCase) {
        /** @type {?} */
        const dirDef = (/** @type {?} */ (tInjectables[directivesStart]));
        if (dirDef && isComponentDef(dirDef) && dirDef.type === token) {
            return directivesStart;
        }
    }
    return null;
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
        const saveLView = getLView();
        setTNodeAndViewData(tNode, lData);
        try {
            value = lData[index] = factory.factory(null, tData, lData, tNode);
        }
        finally {
            if (factory.injectImpl)
                setInjectImplementation(previousInjectImplementation);
            setIncludeViewProviders(previousIncludeViewProviders);
            factory.resolving = false;
            setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
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
    ngDevMode && assertDefined(token, 'token must be defined');
    if (typeof token === 'string') {
        return token.charCodeAt(0) || 0;
    }
    /** @type {?} */
    const tokenId = ((/** @type {?} */ (token)))[NG_ELEMENT_ID];
    return typeof tokenId === 'number' ? tokenId & BLOOM_MASK : tokenId;
}
/**
 * @param {?} bloomHash
 * @param {?} injectorIndex
 * @param {?} injectorView
 * @return {?}
 */
export function bloomHasToken(bloomHash, injectorIndex, injectorView) {
    // Create a mask that targets the specific bit associated with the directive we're looking for.
    // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
    // to bit positions 0 - 31 in a 32 bit integer.
    /** @type {?} */
    const mask = 1 << bloomHash;
    /** @type {?} */
    const b7 = bloomHash & 0x80;
    /** @type {?} */
    const b6 = bloomHash & 0x40;
    /** @type {?} */
    const b5 = bloomHash & 0x20;
    // Our bloom filter size is 256 bits, which is eight 32-bit bloom filter buckets:
    // bf0 = [0 - 31], bf1 = [32 - 63], bf2 = [64 - 95], bf3 = [96 - 127], etc.
    // Get the bloom filter value from the appropriate bucket based on the directive's bloomBit.
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
 * @param {?} isFirstHostTNode
 * @return {?}
 */
function shouldSearchParent(flags, isFirstHostTNode) {
    return !(flags & InjectFlags.Self) && !(flags & InjectFlags.Host && isFirstHostTNode);
}
/**
 * @return {?}
 */
export function injectInjector() {
    /** @type {?} */
    const tNode = (/** @type {?} */ (getPreviousOrParentTNode()));
    return new NodeInjector(tNode, getLView());
}
export class NodeInjector {
    /**
     * @param {?} _tNode
     * @param {?} _lView
     */
    constructor(_tNode, _lView) {
        this._tNode = _tNode;
        this._lView = _lView;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) {
        return getOrCreateInjectable(this._tNode, this._lView, token, undefined, notFoundValue);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    NodeInjector.prototype._tNode;
    /**
     * @type {?}
     * @private
     */
    NodeInjector.prototype._lView;
}
/**
 * @template T
 * @param {?} type
 * @return {?}
 */
export function getFactoryOf(type) {
    /** @type {?} */
    const typeAny = (/** @type {?} */ (type));
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
    const proto = (/** @type {?} */ (Object.getPrototypeOf(type.prototype).constructor));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGdCQUFnQixFQUFFLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUc1RCxPQUFPLEVBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFHdEcsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDcEQsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFDLGtCQUFrQixFQUF1QixlQUFlLEVBQTJELEtBQUssRUFBRSxTQUFTLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUxSyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBZ0IsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDcEcsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDaEYsT0FBTyxFQUFDLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXVDakosb0JBQW9CLEdBQUcsS0FBSzs7Ozs7QUFFaEMsU0FBUyx1QkFBdUIsQ0FBQyxDQUFVOztVQUNuQyxRQUFRLEdBQUcsb0JBQW9CO0lBQ3JDLG9CQUFv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Ozs7OztBQU85RixNQUFNLFVBQVUsWUFBWSxDQUFJLElBQWU7O1VBQ3ZDLE9BQU8sR0FBRyxtQkFBQSxJQUFJLEVBQU87O1VBQ3JCLEdBQUcsR0FBRyxlQUFlLENBQUksT0FBTyxDQUFDLElBQUksZUFBZSxDQUFJLE9BQU8sQ0FBQztRQUNsRSxVQUFVLENBQUksT0FBTyxDQUFDLElBQUksZ0JBQWdCLENBQUksT0FBTyxDQUFDLElBQUksY0FBYyxDQUFJLE9BQU8sQ0FBQztJQUN4RixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDckIsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFJLElBQWU7O1VBQzlDLEtBQUssR0FBRyxtQkFBQSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQWE7O1VBQ3RFLE9BQU8sR0FBRyxZQUFZLENBQUksS0FBSyxDQUFDO0lBQ3RDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtRQUNwQixPQUFPLE9BQU8sQ0FBQztLQUNoQjtTQUFNO1FBQ0wsNkVBQTZFO1FBQzdFLDZFQUE2RTtRQUM3RSw2RUFBNkU7UUFDN0UsNEJBQTRCO1FBQzVCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDdkI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dldEluamVjdGFibGVEZWYsIGdldEluamVjdG9yRGVmfSBmcm9tICcuLi9kaS9kZWZzJztcbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4uL2RpL2luamVjdGlvbl90b2tlbic7XG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0luamVjdEZsYWdzLCBpbmplY3RSb290TGltcE1vZGUsIHNldEluamVjdEltcGxlbWVudGF0aW9ufSBmcm9tICcuLi9kaS9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RXF1YWx9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7Z2V0Q29tcG9uZW50RGVmLCBnZXREaXJlY3RpdmVEZWYsIGdldFBpcGVEZWZ9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge05HX0VMRU1FTlRfSUR9IGZyb20gJy4vZmllbGRzJztcbmltcG9ydCB7RGlyZWN0aXZlRGVmfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge05PX1BBUkVOVF9JTkpFQ1RPUiwgTm9kZUluamVjdG9yRmFjdG9yeSwgUEFSRU5UX0lOSkVDVE9SLCBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24sIFJlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbkZsYWdzLCBUTk9ERSwgaXNGYWN0b3J5fSBmcm9tICcuL2ludGVyZmFjZXMvaW5qZWN0b3InO1xuaW1wb3J0IHtBdHRyaWJ1dGVNYXJrZXIsIFRDb250YWluZXJOb2RlLCBURWxlbWVudENvbnRhaW5lck5vZGUsIFRFbGVtZW50Tm9kZSwgVE5vZGUsIFROb2RlRmxhZ3MsIFROb2RlUHJvdmlkZXJJbmRleGVzLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7REVDTEFSQVRJT05fVklFVywgSE9TVF9OT0RFLCBJTkpFQ1RPUiwgTFZpZXcsIFREYXRhLCBUVklFVywgVFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7YXNzZXJ0Tm9kZU9mUG9zc2libGVUeXBlc30gZnJvbSAnLi9ub2RlX2Fzc2VydCc7XG5pbXBvcnQge2dldExWaWV3LCBnZXRQcmV2aW91c09yUGFyZW50VE5vZGUsIHNldFROb2RlQW5kVmlld0RhdGF9IGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHtnZXRIb3N0VEVsZW1lbnROb2RlLCBnZXRQYXJlbnRJbmplY3RvckluZGV4LCBnZXRQYXJlbnRJbmplY3RvclZpZXcsIGhhc1BhcmVudEluamVjdG9yLCBpc0NvbXBvbmVudCwgaXNDb21wb25lbnREZWYsIHN0cmluZ2lmeX0gZnJvbSAnLi91dGlsJztcblxuXG4vKipcbiAqIERlZmluZXMgaWYgdGhlIGNhbGwgdG8gYGluamVjdGAgc2hvdWxkIGluY2x1ZGUgYHZpZXdQcm92aWRlcnNgIGluIGl0cyByZXNvbHV0aW9uLlxuICpcbiAqIFRoaXMgaXMgc2V0IHRvIHRydWUgd2hlbiB3ZSB0cnkgdG8gaW5zdGFudGlhdGUgYSBjb21wb25lbnQuIFRoaXMgdmFsdWUgaXMgcmVzZXQgaW5cbiAqIGBnZXROb2RlSW5qZWN0YWJsZWAgdG8gYSB2YWx1ZSB3aGljaCBtYXRjaGVzIHRoZSBkZWNsYXJhdGlvbiBsb2NhdGlvbiBvZiB0aGUgdG9rZW4gYWJvdXQgdG8gYmVcbiAqIGluc3RhbnRpYXRlZC4gVGhpcyBpcyBkb25lIHNvIHRoYXQgaWYgd2UgYXJlIGluamVjdGluZyBhIHRva2VuIHdoaWNoIHdhcyBkZWNsYXJlZCBvdXRzaWRlIG9mXG4gKiBgdmlld1Byb3ZpZGVyc2Agd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHB1bGwgYHZpZXdQcm92aWRlcnNgIGluLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBNeVNlcnZpY2Uge1xuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFN0cmluZykge31cbiAqIH1cbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgcHJvdmlkZXJzOiBbXG4gKiAgICAgTXlTZXJ2aWNlLFxuICogICAgIHtwcm92aWRlOiBTdHJpbmcsIHZhbHVlOiAncHJvdmlkZXJzJyB9XG4gKiAgIF1cbiAqICAgdmlld1Byb3ZpZGVyczogW1xuICogICAgIHtwcm92aWRlOiBTdHJpbmcsIHZhbHVlOiAndmlld1Byb3ZpZGVycyd9XG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKG15U2VydmljZTogTXlTZXJ2aWNlLCB2YWx1ZTogU3RyaW5nKSB7XG4gKiAgICAgLy8gV2UgZXhwZWN0IHRoYXQgQ29tcG9uZW50IGNhbiBzZWUgaW50byBgdmlld1Byb3ZpZGVyc2AuXG4gKiAgICAgZXhwZWN0KHZhbHVlKS50b0VxdWFsKCd2aWV3UHJvdmlkZXJzJyk7XG4gKiAgICAgLy8gYE15U2VydmljZWAgd2FzIG5vdCBkZWNsYXJlZCBpbiBgdmlld1Byb3ZpZGVyc2AgaGVuY2UgaXQgY2FuJ3Qgc2VlIGl0LlxuICogICAgIGV4cGVjdChteVNlcnZpY2UudmFsdWUpLnRvRXF1YWwoJ3Byb3ZpZGVycycpO1xuICogICB9XG4gKiB9XG4gKlxuICogYGBgXG4gKi9cbmxldCBpbmNsdWRlVmlld1Byb3ZpZGVycyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBzZXRJbmNsdWRlVmlld1Byb3ZpZGVycyh2OiBib29sZWFuKTogYm9vbGVhbiB7XG4gIGNvbnN0IG9sZFZhbHVlID0gaW5jbHVkZVZpZXdQcm92aWRlcnM7XG4gIGluY2x1ZGVWaWV3UHJvdmlkZXJzID0gdjtcbiAgcmV0dXJuIG9sZFZhbHVlO1xufVxuXG4vKipcbiAqIFRoZSBudW1iZXIgb2Ygc2xvdHMgaW4gZWFjaCBibG9vbSBmaWx0ZXIgKHVzZWQgYnkgREkpLiBUaGUgbGFyZ2VyIHRoaXMgbnVtYmVyLCB0aGUgZmV3ZXJcbiAqIGRpcmVjdGl2ZXMgdGhhdCB3aWxsIHNoYXJlIHNsb3RzLCBhbmQgdGh1cywgdGhlIGZld2VyIGZhbHNlIHBvc2l0aXZlcyB3aGVuIGNoZWNraW5nIGZvclxuICogdGhlIGV4aXN0ZW5jZSBvZiBhIGRpcmVjdGl2ZS5cbiAqL1xuY29uc3QgQkxPT01fU0laRSA9IDI1NjtcbmNvbnN0IEJMT09NX01BU0sgPSBCTE9PTV9TSVpFIC0gMTtcblxuLyoqIENvdW50ZXIgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSURzIGZvciBkaXJlY3RpdmVzLiAqL1xubGV0IG5leHROZ0VsZW1lbnRJZCA9IDA7XG5cbi8qKlxuICogUmVnaXN0ZXJzIHRoaXMgZGlyZWN0aXZlIGFzIHByZXNlbnQgaW4gaXRzIG5vZGUncyBpbmplY3RvciBieSBmbGlwcGluZyB0aGUgZGlyZWN0aXZlJ3NcbiAqIGNvcnJlc3BvbmRpbmcgYml0IGluIHRoZSBpbmplY3RvcidzIGJsb29tIGZpbHRlci5cbiAqXG4gKiBAcGFyYW0gaW5qZWN0b3JJbmRleCBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW5qZWN0b3Igd2hlcmUgdGhpcyB0b2tlbiBzaG91bGQgYmUgcmVnaXN0ZXJlZFxuICogQHBhcmFtIHRWaWV3IFRoZSBUVmlldyBmb3IgdGhlIGluamVjdG9yJ3MgYmxvb20gZmlsdGVyc1xuICogQHBhcmFtIHR5cGUgVGhlIGRpcmVjdGl2ZSB0b2tlbiB0byByZWdpc3RlclxuICovXG5leHBvcnQgZnVuY3Rpb24gYmxvb21BZGQoXG4gICAgaW5qZWN0b3JJbmRleDogbnVtYmVyLCB0VmlldzogVFZpZXcsIHR5cGU6IFR5cGU8YW55PnwgSW5qZWN0aW9uVG9rZW48YW55Pnwgc3RyaW5nKTogdm9pZCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRFcXVhbCh0Vmlldy5maXJzdFRlbXBsYXRlUGFzcywgdHJ1ZSwgJ2V4cGVjdGVkIGZpcnN0VGVtcGxhdGVQYXNzIHRvIGJlIHRydWUnKTtcbiAgbGV0IGlkOiBudW1iZXJ8dW5kZWZpbmVkID1cbiAgICAgIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJyA/ICh0eXBlIGFzIGFueSlbTkdfRUxFTUVOVF9JRF0gOiB0eXBlLmNoYXJDb2RlQXQoMCkgfHwgMDtcblxuICAvLyBTZXQgYSB1bmlxdWUgSUQgb24gdGhlIGRpcmVjdGl2ZSB0eXBlLCBzbyBpZiBzb21ldGhpbmcgdHJpZXMgdG8gaW5qZWN0IHRoZSBkaXJlY3RpdmUsXG4gIC8vIHdlIGNhbiBlYXNpbHkgcmV0cmlldmUgdGhlIElEIGFuZCBoYXNoIGl0IGludG8gdGhlIGJsb29tIGJpdCB0aGF0IHNob3VsZCBiZSBjaGVja2VkLlxuICBpZiAoaWQgPT0gbnVsbCkge1xuICAgIGlkID0gKHR5cGUgYXMgYW55KVtOR19FTEVNRU5UX0lEXSA9IG5leHROZ0VsZW1lbnRJZCsrO1xuICB9XG5cbiAgLy8gV2Ugb25seSBoYXZlIEJMT09NX1NJWkUgKDI1Nikgc2xvdHMgaW4gb3VyIGJsb29tIGZpbHRlciAoOCBidWNrZXRzICogMzIgYml0cyBlYWNoKSxcbiAgLy8gc28gYWxsIHVuaXF1ZSBJRHMgbXVzdCBiZSBtb2R1bG8tZWQgaW50byBhIG51bWJlciBmcm9tIDAgLSAyNTUgdG8gZml0IGludG8gdGhlIGZpbHRlci5cbiAgY29uc3QgYmxvb21CaXQgPSBpZCAmIEJMT09NX01BU0s7XG5cbiAgLy8gQ3JlYXRlIGEgbWFzayB0aGF0IHRhcmdldHMgdGhlIHNwZWNpZmljIGJpdCBhc3NvY2lhdGVkIHdpdGggdGhlIGRpcmVjdGl2ZS5cbiAgLy8gSlMgYml0IG9wZXJhdGlvbnMgYXJlIDMyIGJpdHMsIHNvIHRoaXMgd2lsbCBiZSBhIG51bWJlciBiZXR3ZWVuIDJeMCBhbmQgMl4zMSwgY29ycmVzcG9uZGluZ1xuICAvLyB0byBiaXQgcG9zaXRpb25zIDAgLSAzMSBpbiBhIDMyIGJpdCBpbnRlZ2VyLlxuICBjb25zdCBtYXNrID0gMSA8PCBibG9vbUJpdDtcblxuICAvLyBVc2UgdGhlIHJhdyBibG9vbUJpdCBudW1iZXIgdG8gZGV0ZXJtaW5lIHdoaWNoIGJsb29tIGZpbHRlciBidWNrZXQgd2Ugc2hvdWxkIGNoZWNrXG4gIC8vIGUuZzogYmYwID0gWzAgLSAzMV0sIGJmMSA9IFszMiAtIDYzXSwgYmYyID0gWzY0IC0gOTVdLCBiZjMgPSBbOTYgLSAxMjddLCBldGNcbiAgY29uc3QgYjcgPSBibG9vbUJpdCAmIDB4ODA7XG4gIGNvbnN0IGI2ID0gYmxvb21CaXQgJiAweDQwO1xuICBjb25zdCBiNSA9IGJsb29tQml0ICYgMHgyMDtcbiAgY29uc3QgdERhdGEgPSB0Vmlldy5kYXRhIGFzIG51bWJlcltdO1xuXG4gIGlmIChiNykge1xuICAgIGI2ID8gKGI1ID8gKHREYXRhW2luamVjdG9ySW5kZXggKyA3XSB8PSBtYXNrKSA6ICh0RGF0YVtpbmplY3RvckluZGV4ICsgNl0gfD0gbWFzaykpIDpcbiAgICAgICAgIChiNSA/ICh0RGF0YVtpbmplY3RvckluZGV4ICsgNV0gfD0gbWFzaykgOiAodERhdGFbaW5qZWN0b3JJbmRleCArIDRdIHw9IG1hc2spKTtcbiAgfSBlbHNlIHtcbiAgICBiNiA/IChiNSA/ICh0RGF0YVtpbmplY3RvckluZGV4ICsgM10gfD0gbWFzaykgOiAodERhdGFbaW5qZWN0b3JJbmRleCArIDJdIHw9IG1hc2spKSA6XG4gICAgICAgICAoYjUgPyAodERhdGFbaW5qZWN0b3JJbmRleCArIDFdIHw9IG1hc2spIDogKHREYXRhW2luamVjdG9ySW5kZXhdIHw9IG1hc2spKTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMgKG9yIGdldHMgYW4gZXhpc3RpbmcpIGluamVjdG9yIGZvciBhIGdpdmVuIGVsZW1lbnQgb3IgY29udGFpbmVyLlxuICpcbiAqIEBwYXJhbSB0Tm9kZSBmb3Igd2hpY2ggYW4gaW5qZWN0b3Igc2hvdWxkIGJlIHJldHJpZXZlZCAvIGNyZWF0ZWQuXG4gKiBAcGFyYW0gaG9zdFZpZXcgVmlldyB3aGVyZSB0aGUgbm9kZSBpcyBzdG9yZWRcbiAqIEByZXR1cm5zIE5vZGUgaW5qZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9yQ3JlYXRlTm9kZUluamVjdG9yRm9yTm9kZShcbiAgICB0Tm9kZTogVEVsZW1lbnROb2RlIHwgVENvbnRhaW5lck5vZGUgfCBURWxlbWVudENvbnRhaW5lck5vZGUsIGhvc3RWaWV3OiBMVmlldyk6IG51bWJlciB7XG4gIGNvbnN0IGV4aXN0aW5nSW5qZWN0b3JJbmRleCA9IGdldEluamVjdG9ySW5kZXgodE5vZGUsIGhvc3RWaWV3KTtcbiAgaWYgKGV4aXN0aW5nSW5qZWN0b3JJbmRleCAhPT0gLTEpIHtcbiAgICByZXR1cm4gZXhpc3RpbmdJbmplY3RvckluZGV4O1xuICB9XG5cbiAgY29uc3QgdFZpZXcgPSBob3N0Vmlld1tUVklFV107XG4gIGlmICh0Vmlldy5maXJzdFRlbXBsYXRlUGFzcykge1xuICAgIHROb2RlLmluamVjdG9ySW5kZXggPSBob3N0Vmlldy5sZW5ndGg7XG4gICAgaW5zZXJ0Qmxvb20odFZpZXcuZGF0YSwgdE5vZGUpOyAgLy8gZm91bmRhdGlvbiBmb3Igbm9kZSBibG9vbVxuICAgIGluc2VydEJsb29tKGhvc3RWaWV3LCBudWxsKTsgICAgIC8vIGZvdW5kYXRpb24gZm9yIGN1bXVsYXRpdmUgYmxvb21cbiAgICBpbnNlcnRCbG9vbSh0Vmlldy5ibHVlcHJpbnQsIG51bGwpO1xuXG4gICAgbmdEZXZNb2RlICYmIGFzc2VydEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAgdE5vZGUuZmxhZ3MgPT09IDAgfHwgdE5vZGUuZmxhZ3MgPT09IFROb2RlRmxhZ3MuaXNDb21wb25lbnQsIHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAnZXhwZWN0ZWQgdE5vZGUuZmxhZ3MgdG8gbm90IGJlIGluaXRpYWxpemVkJyk7XG4gIH1cblxuICBjb25zdCBwYXJlbnRMb2MgPSBnZXRQYXJlbnRJbmplY3RvckxvY2F0aW9uKHROb2RlLCBob3N0Vmlldyk7XG4gIGNvbnN0IHBhcmVudEluZGV4ID0gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2MpO1xuICBjb25zdCBwYXJlbnRMVmlldyA9IGdldFBhcmVudEluamVjdG9yVmlldyhwYXJlbnRMb2MsIGhvc3RWaWV3KTtcblxuICBjb25zdCBpbmplY3RvckluZGV4ID0gdE5vZGUuaW5qZWN0b3JJbmRleDtcblxuICAvLyBJZiBhIHBhcmVudCBpbmplY3RvciBjYW4ndCBiZSBmb3VuZCwgaXRzIGxvY2F0aW9uIGlzIHNldCB0byAtMS5cbiAgLy8gSW4gdGhhdCBjYXNlLCB3ZSBkb24ndCBuZWVkIHRvIHNldCB1cCBhIGN1bXVsYXRpdmUgYmxvb21cbiAgaWYgKGhhc1BhcmVudEluamVjdG9yKHBhcmVudExvYykpIHtcbiAgICBjb25zdCBwYXJlbnREYXRhID0gcGFyZW50TFZpZXdbVFZJRVddLmRhdGEgYXMgYW55O1xuICAgIC8vIENyZWF0ZXMgYSBjdW11bGF0aXZlIGJsb29tIGZpbHRlciB0aGF0IG1lcmdlcyB0aGUgcGFyZW50J3MgYmxvb20gZmlsdGVyXG4gICAgLy8gYW5kIGl0cyBvd24gY3VtdWxhdGl2ZSBibG9vbSAod2hpY2ggY29udGFpbnMgdG9rZW5zIGZvciBhbGwgYW5jZXN0b3JzKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICBob3N0Vmlld1tpbmplY3RvckluZGV4ICsgaV0gPSBwYXJlbnRMVmlld1twYXJlbnRJbmRleCArIGldIHwgcGFyZW50RGF0YVtwYXJlbnRJbmRleCArIGldO1xuICAgIH1cbiAgfVxuXG4gIGhvc3RWaWV3W2luamVjdG9ySW5kZXggKyBQQVJFTlRfSU5KRUNUT1JdID0gcGFyZW50TG9jO1xuICByZXR1cm4gaW5qZWN0b3JJbmRleDtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Qmxvb20oYXJyOiBhbnlbXSwgZm9vdGVyOiBUTm9kZSB8IG51bGwpOiB2b2lkIHtcbiAgYXJyLnB1c2goMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgZm9vdGVyKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5qZWN0b3JJbmRleCh0Tm9kZTogVE5vZGUsIGhvc3RWaWV3OiBMVmlldyk6IG51bWJlciB7XG4gIGlmICh0Tm9kZS5pbmplY3RvckluZGV4ID09PSAtMSB8fFxuICAgICAgLy8gSWYgdGhlIGluamVjdG9yIGluZGV4IGlzIHRoZSBzYW1lIGFzIGl0cyBwYXJlbnQncyBpbmplY3RvciBpbmRleCwgdGhlbiB0aGUgaW5kZXggaGFzIGJlZW5cbiAgICAgIC8vIGNvcGllZCBkb3duIGZyb20gdGhlIHBhcmVudCBub2RlLiBObyBpbmplY3RvciBoYXMgYmVlbiBjcmVhdGVkIHlldCBvbiB0aGlzIG5vZGUuXG4gICAgICAodE5vZGUucGFyZW50ICYmIHROb2RlLnBhcmVudC5pbmplY3RvckluZGV4ID09PSB0Tm9kZS5pbmplY3RvckluZGV4KSB8fFxuICAgICAgLy8gQWZ0ZXIgdGhlIGZpcnN0IHRlbXBsYXRlIHBhc3MsIHRoZSBpbmplY3RvciBpbmRleCBtaWdodCBleGlzdCBidXQgdGhlIHBhcmVudCB2YWx1ZXNcbiAgICAgIC8vIG1pZ2h0IG5vdCBoYXZlIGJlZW4gY2FsY3VsYXRlZCB5ZXQgZm9yIHRoaXMgaW5zdGFuY2VcbiAgICAgIGhvc3RWaWV3W3ROb2RlLmluamVjdG9ySW5kZXggKyBQQVJFTlRfSU5KRUNUT1JdID09IG51bGwpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHROb2RlLmluamVjdG9ySW5kZXg7XG4gIH1cbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIHBhcmVudCBpbmplY3Rvciwgd2l0aCBhIHZpZXcgb2Zmc2V0IGlmIGFwcGxpY2FibGUuIFVzZWQgdG8gc2V0IHRoZVxuICogcGFyZW50IGluamVjdG9yIGluaXRpYWxseS5cbiAqXG4gKiBSZXR1cm5zIGEgY29tYmluYXRpb24gb2YgbnVtYmVyIG9mIGBWaWV3RGF0YWAgd2UgaGF2ZSB0byBnbyB1cCBhbmQgaW5kZXggaW4gdGhhdCBgVmlld2RhdGFgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvckxvY2F0aW9uKHROb2RlOiBUTm9kZSwgdmlldzogTFZpZXcpOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24ge1xuICBpZiAodE5vZGUucGFyZW50ICYmIHROb2RlLnBhcmVudC5pbmplY3RvckluZGV4ICE9PSAtMSkge1xuICAgIHJldHVybiB0Tm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleCBhcyBhbnk7ICAvLyBWaWV3T2Zmc2V0IGlzIDBcbiAgfVxuXG4gIC8vIEZvciBtb3N0IGNhc2VzLCB0aGUgcGFyZW50IGluamVjdG9yIGluZGV4IGNhbiBiZSBmb3VuZCBvbiB0aGUgaG9zdCBub2RlIChlLmcuIGZvciBjb21wb25lbnRcbiAgLy8gb3IgY29udGFpbmVyKSwgc28gdGhpcyBsb29wIHdpbGwgYmUgc2tpcHBlZCwgYnV0IHdlIG11c3Qga2VlcCB0aGUgbG9vcCBoZXJlIHRvIHN1cHBvcnRcbiAgLy8gdGhlIHJhcmVyIGNhc2Ugb2YgZGVlcGx5IG5lc3RlZCA8bmctdGVtcGxhdGU+IHRhZ3Mgb3IgaW5saW5lIHZpZXdzLlxuICBsZXQgaG9zdFROb2RlID0gdmlld1tIT1NUX05PREVdO1xuICBsZXQgdmlld09mZnNldCA9IDE7XG4gIHdoaWxlIChob3N0VE5vZGUgJiYgaG9zdFROb2RlLmluamVjdG9ySW5kZXggPT09IC0xKSB7XG4gICAgdmlldyA9IHZpZXdbREVDTEFSQVRJT05fVklFV10gITtcbiAgICBob3N0VE5vZGUgPSB2aWV3W0hPU1RfTk9ERV0gITtcbiAgICB2aWV3T2Zmc2V0Kys7XG4gIH1cblxuICByZXR1cm4gaG9zdFROb2RlID9cbiAgICAgIGhvc3RUTm9kZS5pbmplY3RvckluZGV4IHwgKHZpZXdPZmZzZXQgPDwgUmVsYXRpdmVJbmplY3RvckxvY2F0aW9uRmxhZ3MuVmlld09mZnNldFNoaWZ0KSA6XG4gICAgICAtMSBhcyBhbnk7XG59XG5cbi8qKlxuICogTWFrZXMgYSB0eXBlIG9yIGFuIGluamVjdGlvbiB0b2tlbiBwdWJsaWMgdG8gdGhlIERJIHN5c3RlbSBieSBhZGRpbmcgaXQgdG8gYW5cbiAqIGluamVjdG9yJ3MgYmxvb20gZmlsdGVyLlxuICpcbiAqIEBwYXJhbSBkaSBUaGUgbm9kZSBpbmplY3RvciBpbiB3aGljaCBhIGRpcmVjdGl2ZSB3aWxsIGJlIGFkZGVkXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHR5cGUgb3IgdGhlIGluamVjdGlvbiB0b2tlbiB0byBiZSBtYWRlIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlQdWJsaWNJbkluamVjdG9yKFxuICAgIGluamVjdG9ySW5kZXg6IG51bWJlciwgdmlldzogTFZpZXcsIHRva2VuOiBJbmplY3Rpb25Ub2tlbjxhbnk+fCBUeXBlPGFueT4pOiB2b2lkIHtcbiAgYmxvb21BZGQoaW5qZWN0b3JJbmRleCwgdmlld1tUVklFV10sIHRva2VuKTtcbn1cblxuLyoqXG4gKiBJbmplY3Qgc3RhdGljIGF0dHJpYnV0ZSB2YWx1ZSBpbnRvIGRpcmVjdGl2ZSBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHdpdGggYGZhY3RvcnlgIGZ1bmN0aW9ucyB3aGljaCBhcmUgZ2VuZXJhdGVkIGFzIHBhcnQgb2ZcbiAqIGBkZWZpbmVEaXJlY3RpdmVgIG9yIGBkZWZpbmVDb21wb25lbnRgLiBUaGUgbWV0aG9kIHJldHJpZXZlcyB0aGUgc3RhdGljIHZhbHVlXG4gKiBvZiBhbiBhdHRyaWJ1dGUuIChEeW5hbWljIGF0dHJpYnV0ZXMgYXJlIG5vdCBzdXBwb3J0ZWQgc2luY2UgdGhleSBhcmUgbm90IHJlc29sdmVkXG4gKiAgYXQgdGhlIHRpbWUgb2YgaW5qZWN0aW9uIGFuZCBjYW4gY2hhbmdlIG92ZXIgdGltZS4pXG4gKlxuICogIyBFeGFtcGxlXG4gKiBHaXZlbjpcbiAqIGBgYFxuICogQENvbXBvbmVudCguLi4pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKEBBdHRyaWJ1dGUoJ3RpdGxlJykgdGl0bGU6IHN0cmluZykgeyAuLi4gfVxuICogfVxuICogYGBgXG4gKiBXaGVuIGluc3RhbnRpYXRlZCB3aXRoXG4gKiBgYGBcbiAqIDxteS1jb21wb25lbnQgdGl0bGU9XCJIZWxsb1wiPjwvbXktY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlbiBmYWN0b3J5IG1ldGhvZCBnZW5lcmF0ZWQgaXM6XG4gKiBgYGBcbiAqIE15Q29tcG9uZW50Lm5nQ29tcG9uZW50RGVmID0gZGVmaW5lQ29tcG9uZW50KHtcbiAqICAgZmFjdG9yeTogKCkgPT4gbmV3IE15Q29tcG9uZW50KGluamVjdEF0dHJpYnV0ZSgndGl0bGUnKSlcbiAqICAgLi4uXG4gKiB9KVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0QXR0cmlidXRlSW1wbCh0Tm9kZTogVE5vZGUsIGF0dHJOYW1lVG9JbmplY3Q6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgbmdEZXZNb2RlICYmIGFzc2VydE5vZGVPZlBvc3NpYmxlVHlwZXMoXG4gICAgICAgICAgICAgICAgICAgdE5vZGUsIFROb2RlVHlwZS5Db250YWluZXIsIFROb2RlVHlwZS5FbGVtZW50LCBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcik7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHROb2RlLCAnZXhwZWN0aW5nIHROb2RlJyk7XG4gIGNvbnN0IGF0dHJzID0gdE5vZGUuYXR0cnM7XG4gIGlmIChhdHRycykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpID0gaSArIDIpIHtcbiAgICAgIGNvbnN0IGF0dHJOYW1lID0gYXR0cnNbaV07XG4gICAgICBpZiAoYXR0ck5hbWUgPT09IEF0dHJpYnV0ZU1hcmtlci5TZWxlY3RPbmx5KSBicmVhaztcbiAgICAgIGlmIChhdHRyTmFtZSA9PSBhdHRyTmFtZVRvSW5qZWN0KSB7XG4gICAgICAgIHJldHVybiBhdHRyc1tpICsgMV0gYXMgc3RyaW5nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgdG8gdGhlIGdpdmVuIHRva2VuIGZyb20gdGhlIE5vZGVJbmplY3RvcnMgPT4gTW9kdWxlSW5qZWN0b3IuXG4gKlxuICogTG9vayBmb3IgdGhlIGluamVjdG9yIHByb3ZpZGluZyB0aGUgdG9rZW4gYnkgd2Fsa2luZyB1cCB0aGUgbm9kZSBpbmplY3RvciB0cmVlIGFuZCB0aGVuXG4gKiB0aGUgbW9kdWxlIGluamVjdG9yIHRyZWUuXG4gKlxuICogQHBhcmFtIHROb2RlIFRoZSBOb2RlIHdoZXJlIHRoZSBzZWFyY2ggZm9yIHRoZSBpbmplY3RvciBzaG91bGQgc3RhcnRcbiAqIEBwYXJhbSBsVmlldyBUaGUgYExWaWV3YCB0aGF0IGNvbnRhaW5zIHRoZSBgdE5vZGVgXG4gKiBAcGFyYW0gdG9rZW4gVGhlIHRva2VuIHRvIGxvb2sgZm9yXG4gKiBAcGFyYW0gZmxhZ3MgSW5qZWN0aW9uIGZsYWdzXG4gKiBAcGFyYW0gbm90Rm91bmRWYWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIHdoZW4gdGhlIGluamVjdGlvbiBmbGFncyBpcyBgSW5qZWN0RmxhZ3MuT3B0aW9uYWxgXG4gKiBAcmV0dXJucyB0aGUgdmFsdWUgZnJvbSB0aGUgaW5qZWN0b3IsIGBudWxsYCB3aGVuIG5vdCBmb3VuZCwgb3IgYG5vdEZvdW5kVmFsdWVgIGlmIHByb3ZpZGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPckNyZWF0ZUluamVjdGFibGU8VD4oXG4gICAgdE5vZGU6IFRFbGVtZW50Tm9kZSB8IFRDb250YWluZXJOb2RlIHwgVEVsZW1lbnRDb250YWluZXJOb2RlLCBsVmlldzogTFZpZXcsXG4gICAgdG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LCBmbGFnczogSW5qZWN0RmxhZ3MgPSBJbmplY3RGbGFncy5EZWZhdWx0LFxuICAgIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBUfG51bGwge1xuICBjb25zdCBibG9vbUhhc2ggPSBibG9vbUhhc2hCaXRPckZhY3RvcnkodG9rZW4pO1xuICAvLyBJZiB0aGUgSUQgc3RvcmVkIGhlcmUgaXMgYSBmdW5jdGlvbiwgdGhpcyBpcyBhIHNwZWNpYWwgb2JqZWN0IGxpa2UgRWxlbWVudFJlZiBvciBUZW1wbGF0ZVJlZlxuICAvLyBzbyBqdXN0IGNhbGwgdGhlIGZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIGl0LlxuICBpZiAodHlwZW9mIGJsb29tSGFzaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHNhdmVQcmV2aW91c09yUGFyZW50VE5vZGUgPSBnZXRQcmV2aW91c09yUGFyZW50VE5vZGUoKTtcbiAgICBjb25zdCBzYXZlTFZpZXcgPSBnZXRMVmlldygpO1xuICAgIHNldFROb2RlQW5kVmlld0RhdGEodE5vZGUsIGxWaWV3KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBibG9vbUhhc2goKTtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsICYmICEoZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBwcm92aWRlciBmb3IgJHtzdHJpbmdpZnkodG9rZW4pfSFgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0VE5vZGVBbmRWaWV3RGF0YShzYXZlUHJldmlvdXNPclBhcmVudFROb2RlLCBzYXZlTFZpZXcpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgYmxvb21IYXNoID09ICdudW1iZXInKSB7XG4gICAgLy8gSWYgdGhlIHRva2VuIGhhcyBhIGJsb29tIGhhc2gsIHRoZW4gaXQgaXMgYSB0b2tlbiB3aGljaCBjb3VsZCBiZSBpbiBOb2RlSW5qZWN0b3IuXG5cbiAgICAvLyBBIHJlZmVyZW5jZSB0byB0aGUgcHJldmlvdXMgaW5qZWN0b3IgVFZpZXcgdGhhdCB3YXMgZm91bmQgd2hpbGUgY2xpbWJpbmcgdGhlIGVsZW1lbnQgaW5qZWN0b3JcbiAgICAvLyB0cmVlLiBUaGlzIGlzIHVzZWQgdG8ga25vdyBpZiB2aWV3UHJvdmlkZXJzIGNhbiBiZSBhY2Nlc3NlZCBvbiB0aGUgY3VycmVudCBpbmplY3Rvci5cbiAgICBsZXQgcHJldmlvdXNUVmlldzogVFZpZXd8bnVsbCA9IG51bGw7XG4gICAgbGV0IGluamVjdG9ySW5kZXggPSBnZXRJbmplY3RvckluZGV4KHROb2RlLCBsVmlldyk7XG4gICAgbGV0IHBhcmVudExvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24gPSBOT19QQVJFTlRfSU5KRUNUT1I7XG4gICAgbGV0IGhvc3RURWxlbWVudE5vZGU6IFROb2RlfG51bGwgPSBmbGFncyAmIEluamVjdEZsYWdzLkhvc3QgPyBnZXRIb3N0VEVsZW1lbnROb2RlKGxWaWV3KSA6IG51bGw7XG5cbiAgICAvLyBJZiB3ZSBzaG91bGQgc2tpcCB0aGlzIGluamVjdG9yLCBvciBpZiB0aGVyZSBpcyBubyBpbmplY3RvciBvbiB0aGlzIG5vZGUsIHN0YXJ0IGJ5IHNlYXJjaGluZ1xuICAgIC8vIHRoZSBwYXJlbnQgaW5qZWN0b3IuXG4gICAgaWYgKGluamVjdG9ySW5kZXggPT09IC0xIHx8IGZsYWdzICYgSW5qZWN0RmxhZ3MuU2tpcFNlbGYpIHtcbiAgICAgIHBhcmVudExvY2F0aW9uID0gaW5qZWN0b3JJbmRleCA9PT0gLTEgPyBnZXRQYXJlbnRJbmplY3RvckxvY2F0aW9uKHROb2RlLCBsVmlldykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxWaWV3W2luamVjdG9ySW5kZXggKyBQQVJFTlRfSU5KRUNUT1JdO1xuXG4gICAgICBpZiAoIXNob3VsZFNlYXJjaFBhcmVudChmbGFncywgZmFsc2UpKSB7XG4gICAgICAgIGluamVjdG9ySW5kZXggPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXZpb3VzVFZpZXcgPSBsVmlld1tUVklFV107XG4gICAgICAgIGluamVjdG9ySW5kZXggPSBnZXRQYXJlbnRJbmplY3RvckluZGV4KHBhcmVudExvY2F0aW9uKTtcbiAgICAgICAgbFZpZXcgPSBnZXRQYXJlbnRJbmplY3RvclZpZXcocGFyZW50TG9jYXRpb24sIGxWaWV3KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUcmF2ZXJzZSB1cCB0aGUgaW5qZWN0b3IgdHJlZSB1bnRpbCB3ZSBmaW5kIGEgcG90ZW50aWFsIG1hdGNoIG9yIHVudGlsIHdlIGtub3cgdGhlcmVcbiAgICAvLyAqaXNuJ3QqIGEgbWF0Y2guXG4gICAgd2hpbGUgKGluamVjdG9ySW5kZXggIT09IC0xKSB7XG4gICAgICBwYXJlbnRMb2NhdGlvbiA9IGxWaWV3W2luamVjdG9ySW5kZXggKyBQQVJFTlRfSU5KRUNUT1JdO1xuXG4gICAgICAvLyBDaGVjayB0aGUgY3VycmVudCBpbmplY3Rvci4gSWYgaXQgbWF0Y2hlcywgc2VlIGlmIGl0IGNvbnRhaW5zIHRva2VuLlxuICAgICAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gICAgICBpZiAoYmxvb21IYXNUb2tlbihibG9vbUhhc2gsIGluamVjdG9ySW5kZXgsIHRWaWV3LmRhdGEpKSB7XG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGhhdmUgYW4gaW5qZWN0b3Igd2hpY2ggKm1heSogY29udGFpbiB0aGUgdG9rZW4sIHNvIHdlIHN0ZXAgdGhyb3VnaFxuICAgICAgICAvLyB0aGUgcHJvdmlkZXJzIGFuZCBkaXJlY3RpdmVzIGFzc29jaWF0ZWQgd2l0aCB0aGUgaW5qZWN0b3IncyBjb3JyZXNwb25kaW5nIG5vZGUgdG8gZ2V0XG4gICAgICAgIC8vIHRoZSBpbnN0YW5jZS5cbiAgICAgICAgY29uc3QgaW5zdGFuY2U6IFR8bnVsbCA9IHNlYXJjaFRva2Vuc09uSW5qZWN0b3I8VD4oXG4gICAgICAgICAgICBpbmplY3RvckluZGV4LCBsVmlldywgdG9rZW4sIHByZXZpb3VzVFZpZXcsIGZsYWdzLCBob3N0VEVsZW1lbnROb2RlKTtcbiAgICAgICAgaWYgKGluc3RhbmNlICE9PSBOT1RfRk9VTkQpIHtcbiAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzaG91bGRTZWFyY2hQYXJlbnQoXG4gICAgICAgICAgICAgIGZsYWdzLCBsVmlld1tUVklFV10uZGF0YVtpbmplY3RvckluZGV4ICsgVE5PREVdID09PSBob3N0VEVsZW1lbnROb2RlKSAmJlxuICAgICAgICAgIGJsb29tSGFzVG9rZW4oYmxvb21IYXNoLCBpbmplY3RvckluZGV4LCBsVmlldykpIHtcbiAgICAgICAgLy8gVGhlIGRlZiB3YXNuJ3QgZm91bmQgYW55d2hlcmUgb24gdGhpcyBub2RlLCBzbyBpdCB3YXMgYSBmYWxzZSBwb3NpdGl2ZS5cbiAgICAgICAgLy8gVHJhdmVyc2UgdXAgdGhlIHRyZWUgYW5kIGNvbnRpbnVlIHNlYXJjaGluZy5cbiAgICAgICAgcHJldmlvdXNUVmlldyA9IHRWaWV3O1xuICAgICAgICBpbmplY3RvckluZGV4ID0gZ2V0UGFyZW50SW5qZWN0b3JJbmRleChwYXJlbnRMb2NhdGlvbik7XG4gICAgICAgIGxWaWV3ID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3KHBhcmVudExvY2F0aW9uLCBsVmlldyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB3ZSBzaG91bGQgbm90IHNlYXJjaCBwYXJlbnQgT1IgSWYgdGhlIGFuY2VzdG9yIGJsb29tIGZpbHRlciB2YWx1ZSBkb2VzIG5vdCBoYXZlIHRoZVxuICAgICAgICAvLyBiaXQgY29ycmVzcG9uZGluZyB0byB0aGUgZGlyZWN0aXZlIHdlIGNhbiBnaXZlIHVwIG9uIHRyYXZlcnNpbmcgdXAgdG8gZmluZCB0aGUgc3BlY2lmaWNcbiAgICAgICAgLy8gaW5qZWN0b3IuXG4gICAgICAgIGluamVjdG9ySW5kZXggPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCAmJiBub3RGb3VuZFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBUaGlzIG11c3QgYmUgc2V0IG9yIHRoZSBOdWxsSW5qZWN0b3Igd2lsbCB0aHJvdyBmb3Igb3B0aW9uYWwgZGVwc1xuICAgIG5vdEZvdW5kVmFsdWUgPSBudWxsO1xuICB9XG5cbiAgaWYgKChmbGFncyAmIChJbmplY3RGbGFncy5TZWxmIHwgSW5qZWN0RmxhZ3MuSG9zdCkpID09PSAwKSB7XG4gICAgY29uc3QgbW9kdWxlSW5qZWN0b3IgPSBsVmlld1tJTkpFQ1RPUl07XG4gICAgaWYgKG1vZHVsZUluamVjdG9yKSB7XG4gICAgICByZXR1cm4gbW9kdWxlSW5qZWN0b3IuZ2V0KHRva2VuLCBub3RGb3VuZFZhbHVlLCBmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGluamVjdFJvb3RMaW1wTW9kZSh0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MgJiBJbmplY3RGbGFncy5PcHRpb25hbCk7XG4gICAgfVxuICB9XG4gIGlmIChmbGFncyAmIEluamVjdEZsYWdzLk9wdGlvbmFsKSB7XG4gICAgcmV0dXJuIG5vdEZvdW5kVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb2RlSW5qZWN0b3I6IE5PVF9GT1VORCBbJHtzdHJpbmdpZnkodG9rZW4pfV1gKTtcbiAgfVxufVxuXG5jb25zdCBOT1RfRk9VTkQgPSB7fTtcblxuZnVuY3Rpb24gc2VhcmNoVG9rZW5zT25JbmplY3RvcjxUPihcbiAgICBpbmplY3RvckluZGV4OiBudW1iZXIsIGxWaWV3OiBMVmlldywgdG9rZW46IFR5cGU8VD58IEluamVjdGlvblRva2VuPFQ+LFxuICAgIHByZXZpb3VzVFZpZXc6IFRWaWV3IHwgbnVsbCwgZmxhZ3M6IEluamVjdEZsYWdzLCBob3N0VEVsZW1lbnROb2RlOiBUTm9kZSB8IG51bGwpIHtcbiAgY29uc3QgY3VycmVudFRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICBjb25zdCB0Tm9kZSA9IGN1cnJlbnRUVmlldy5kYXRhW2luamVjdG9ySW5kZXggKyBUTk9ERV0gYXMgVE5vZGU7XG4gIC8vIEZpcnN0LCB3ZSBuZWVkIHRvIGRldGVybWluZSBpZiB2aWV3IHByb3ZpZGVycyBjYW4gYmUgYWNjZXNzZWQgYnkgdGhlIHN0YXJ0aW5nIGVsZW1lbnQuXG4gIC8vIFRoZXJlIGFyZSB0d28gcG9zc2liaXRpZXNcbiAgY29uc3QgY2FuQWNjZXNzVmlld1Byb3ZpZGVycyA9IHByZXZpb3VzVFZpZXcgPT0gbnVsbCA/XG4gICAgICAvLyAxKSBUaGlzIGlzIHRoZSBmaXJzdCBpbnZvY2F0aW9uIGBwcmV2aW91c1RWaWV3ID09IG51bGxgIHdoaWNoIG1lYW5zIHRoYXQgd2UgYXJlIGF0IHRoZVxuICAgICAgLy8gYFROb2RlYCBvZiB3aGVyZSBpbmplY3RvciBpcyBzdGFydGluZyB0byBsb29rLiBJbiBzdWNoIGEgY2FzZSB0aGUgb25seSB0aW1lIHdlIGFyZSBhbGxvd2VkXG4gICAgICAvLyB0byBsb29rIGludG8gdGhlIFZpZXdQcm92aWRlcnMgaXMgaWY6XG4gICAgICAvLyAtIHdlIGFyZSBvbiBhIGNvbXBvbmVudFxuICAgICAgLy8gLSBBTkQgdGhlIGluamVjdG9yIHNldCBgaW5jbHVkZVZpZXdQcm92aWRlcnNgIHRvIHRydWUgKGltcGx5aW5nIHRoYXQgdGhlIHRva2VuIGNhbiBzZWVcbiAgICAgIC8vIFZpZXdQcm92aWRlcnMgYmVjYXVzZSBpdCBpcyB0aGUgQ29tcG9uZW50IG9yIGEgU2VydmljZSB3aGljaCBpdHNlbGYgd2FzIGRlY2xhcmVkIGluXG4gICAgICAvLyBWaWV3UHJvdmlkZXJzKVxuICAgICAgKGlzQ29tcG9uZW50KHROb2RlKSAmJiBpbmNsdWRlVmlld1Byb3ZpZGVycykgOlxuICAgICAgLy8gMikgYHByZXZpb3VzVFZpZXcgIT0gbnVsbGAgd2hpY2ggbWVhbnMgdGhhdCB3ZSBhcmUgbm93IHdhbGtpbmcgYWNyb3NzIHRoZSBwYXJlbnQgbm9kZXMuXG4gICAgICAvLyBJbiBzdWNoIGEgY2FzZSB3ZSBhcmUgb25seSBhbGxvd2VkIHRvIGxvb2sgaW50byB0aGUgVmlld1Byb3ZpZGVycyBpZjpcbiAgICAgIC8vIC0gV2UganVzdCBjcm9zc2VkIGZyb20gY2hpbGQgVmlldyB0byBQYXJlbnQgVmlldyBgcHJldmlvdXNUVmlldyAhPSBjdXJyZW50VFZpZXdgXG4gICAgICAvLyAtIEFORCB0aGUgcGFyZW50IFROb2RlIGlzIGFuIEVsZW1lbnQuXG4gICAgICAvLyBUaGlzIG1lYW5zIHRoYXQgd2UganVzdCBjYW1lIGZyb20gdGhlIENvbXBvbmVudCdzIFZpZXcgYW5kIHRoZXJlZm9yZSBhcmUgYWxsb3dlZCB0byBzZWVcbiAgICAgIC8vIGludG8gdGhlIFZpZXdQcm92aWRlcnMuXG4gICAgICAocHJldmlvdXNUVmlldyAhPSBjdXJyZW50VFZpZXcgJiYgKHROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50KSk7XG5cbiAgLy8gVGhpcyBzcGVjaWFsIGNhc2UgaGFwcGVucyB3aGVuIHRoZXJlIGlzIGEgQGhvc3Qgb24gdGhlIGluamVjdCBhbmQgd2hlbiB3ZSBhcmUgc2VhcmNoaW5nXG4gIC8vIG9uIHRoZSBob3N0IGVsZW1lbnQgbm9kZS5cbiAgY29uc3QgaXNIb3N0U3BlY2lhbENhc2UgPSAoZmxhZ3MgJiBJbmplY3RGbGFncy5Ib3N0KSAmJiBob3N0VEVsZW1lbnROb2RlID09PSB0Tm9kZTtcblxuICBjb25zdCBpbmplY3RhYmxlSWR4ID1cbiAgICAgIGxvY2F0ZURpcmVjdGl2ZU9yUHJvdmlkZXIodE5vZGUsIGxWaWV3LCB0b2tlbiwgY2FuQWNjZXNzVmlld1Byb3ZpZGVycywgaXNIb3N0U3BlY2lhbENhc2UpO1xuICBpZiAoaW5qZWN0YWJsZUlkeCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBnZXROb2RlSW5qZWN0YWJsZShjdXJyZW50VFZpZXcuZGF0YSwgbFZpZXcsIGluamVjdGFibGVJZHgsIHROb2RlIGFzIFRFbGVtZW50Tm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIE5PVF9GT1VORDtcbiAgfVxufVxuXG4vKipcbiAqIFNlYXJjaGVzIGZvciB0aGUgZ2l2ZW4gdG9rZW4gYW1vbmcgdGhlIG5vZGUncyBkaXJlY3RpdmVzIGFuZCBwcm92aWRlcnMuXG4gKlxuICogQHBhcmFtIHROb2RlIFROb2RlIG9uIHdoaWNoIGRpcmVjdGl2ZXMgYXJlIHByZXNlbnQuXG4gKiBAcGFyYW0gbFZpZXcgVGhlIHZpZXcgd2UgYXJlIGN1cnJlbnRseSBwcm9jZXNzaW5nXG4gKiBAcGFyYW0gdG9rZW4gUHJvdmlkZXIgdG9rZW4gb3IgdHlwZSBvZiBhIGRpcmVjdGl2ZSB0byBsb29rIGZvci5cbiAqIEBwYXJhbSBjYW5BY2Nlc3NWaWV3UHJvdmlkZXJzIFdoZXRoZXIgdmlldyBwcm92aWRlcnMgc2hvdWxkIGJlIGNvbnNpZGVyZWQuXG4gKiBAcGFyYW0gaXNIb3N0U3BlY2lhbENhc2UgV2hldGhlciB0aGUgaG9zdCBzcGVjaWFsIGNhc2UgYXBwbGllcy5cbiAqIEByZXR1cm5zIEluZGV4IG9mIGEgZm91bmQgZGlyZWN0aXZlIG9yIHByb3ZpZGVyLCBvciBudWxsIHdoZW4gbm9uZSBmb3VuZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZURpcmVjdGl2ZU9yUHJvdmlkZXI8VD4oXG4gICAgdE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcsIHRva2VuOiBUeXBlPFQ+fCBJbmplY3Rpb25Ub2tlbjxUPiwgY2FuQWNjZXNzVmlld1Byb3ZpZGVyczogYm9vbGVhbixcbiAgICBpc0hvc3RTcGVjaWFsQ2FzZTogYm9vbGVhbiB8IG51bWJlcik6IG51bWJlcnxudWxsIHtcbiAgY29uc3QgdFZpZXcgPSBsVmlld1tUVklFV107XG4gIGNvbnN0IG5vZGVQcm92aWRlckluZGV4ZXMgPSB0Tm9kZS5wcm92aWRlckluZGV4ZXM7XG4gIGNvbnN0IHRJbmplY3RhYmxlcyA9IHRWaWV3LmRhdGE7XG5cbiAgY29uc3QgaW5qZWN0YWJsZXNTdGFydCA9IG5vZGVQcm92aWRlckluZGV4ZXMgJiBUTm9kZVByb3ZpZGVySW5kZXhlcy5Qcm92aWRlcnNTdGFydEluZGV4TWFzaztcbiAgY29uc3QgZGlyZWN0aXZlc1N0YXJ0ID0gdE5vZGUuZGlyZWN0aXZlU3RhcnQ7XG4gIGNvbnN0IGRpcmVjdGl2ZUVuZCA9IHROb2RlLmRpcmVjdGl2ZUVuZDtcbiAgY29uc3QgY3B0Vmlld1Byb3ZpZGVyc0NvdW50ID1cbiAgICAgIG5vZGVQcm92aWRlckluZGV4ZXMgPj4gVE5vZGVQcm92aWRlckluZGV4ZXMuQ3B0Vmlld1Byb3ZpZGVyc0NvdW50U2hpZnQ7XG4gIGNvbnN0IHN0YXJ0aW5nSW5kZXggPVxuICAgICAgY2FuQWNjZXNzVmlld1Byb3ZpZGVycyA/IGluamVjdGFibGVzU3RhcnQgOiBpbmplY3RhYmxlc1N0YXJ0ICsgY3B0Vmlld1Byb3ZpZGVyc0NvdW50O1xuICAvLyBXaGVuIHRoZSBob3N0IHNwZWNpYWwgY2FzZSBhcHBsaWVzLCBvbmx5IHRoZSB2aWV3UHJvdmlkZXJzIGFuZCB0aGUgY29tcG9uZW50IGFyZSB2aXNpYmxlXG4gIGNvbnN0IGVuZEluZGV4ID0gaXNIb3N0U3BlY2lhbENhc2UgPyBpbmplY3RhYmxlc1N0YXJ0ICsgY3B0Vmlld1Byb3ZpZGVyc0NvdW50IDogZGlyZWN0aXZlRW5kO1xuICBmb3IgKGxldCBpID0gc3RhcnRpbmdJbmRleDsgaSA8IGVuZEluZGV4OyBpKyspIHtcbiAgICBjb25zdCBwcm92aWRlclRva2VuT3JEZWYgPSB0SW5qZWN0YWJsZXNbaV0gYXMgSW5qZWN0aW9uVG9rZW48YW55PnwgVHlwZTxhbnk+fCBEaXJlY3RpdmVEZWY8YW55PjtcbiAgICBpZiAoaSA8IGRpcmVjdGl2ZXNTdGFydCAmJiB0b2tlbiA9PT0gcHJvdmlkZXJUb2tlbk9yRGVmIHx8XG4gICAgICAgIGkgPj0gZGlyZWN0aXZlc1N0YXJ0ICYmIChwcm92aWRlclRva2VuT3JEZWYgYXMgRGlyZWN0aXZlRGVmPGFueT4pLnR5cGUgPT09IHRva2VuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzSG9zdFNwZWNpYWxDYXNlKSB7XG4gICAgY29uc3QgZGlyRGVmID0gdEluamVjdGFibGVzW2RpcmVjdGl2ZXNTdGFydF0gYXMgRGlyZWN0aXZlRGVmPGFueT47XG4gICAgaWYgKGRpckRlZiAmJiBpc0NvbXBvbmVudERlZihkaXJEZWYpICYmIGRpckRlZi50eXBlID09PSB0b2tlbikge1xuICAgICAgcmV0dXJuIGRpcmVjdGl2ZXNTdGFydDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuKiBSZXRyaWV2ZSBvciBpbnN0YW50aWF0ZSB0aGUgaW5qZWN0YWJsZSBmcm9tIHRoZSBgbERhdGFgIGF0IHBhcnRpY3VsYXIgYGluZGV4YC5cbipcbiogVGhpcyBmdW5jdGlvbiBjaGVja3MgdG8gc2VlIGlmIHRoZSB2YWx1ZSBoYXMgYWxyZWFkeSBiZWVuIGluc3RhbnRpYXRlZCBhbmQgaWYgc28gcmV0dXJucyB0aGVcbiogY2FjaGVkIGBpbmplY3RhYmxlYC4gT3RoZXJ3aXNlIGlmIGl0IGRldGVjdHMgdGhhdCB0aGUgdmFsdWUgaXMgc3RpbGwgYSBmYWN0b3J5IGl0XG4qIGluc3RhbnRpYXRlcyB0aGUgYGluamVjdGFibGVgIGFuZCBjYWNoZXMgdGhlIHZhbHVlLlxuKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROb2RlSW5qZWN0YWJsZShcbiAgICB0RGF0YTogVERhdGEsIGxEYXRhOiBMVmlldywgaW5kZXg6IG51bWJlciwgdE5vZGU6IFRFbGVtZW50Tm9kZSk6IGFueSB7XG4gIGxldCB2YWx1ZSA9IGxEYXRhW2luZGV4XTtcbiAgaWYgKGlzRmFjdG9yeSh2YWx1ZSkpIHtcbiAgICBjb25zdCBmYWN0b3J5OiBOb2RlSW5qZWN0b3JGYWN0b3J5ID0gdmFsdWU7XG4gICAgaWYgKGZhY3RvcnkucmVzb2x2aW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENpcmN1bGFyIGRlcCBmb3IgJHtzdHJpbmdpZnkodERhdGFbaW5kZXhdKX1gKTtcbiAgICB9XG4gICAgY29uc3QgcHJldmlvdXNJbmNsdWRlVmlld1Byb3ZpZGVycyA9IHNldEluY2x1ZGVWaWV3UHJvdmlkZXJzKGZhY3RvcnkuY2FuU2VlVmlld1Byb3ZpZGVycyk7XG4gICAgZmFjdG9yeS5yZXNvbHZpbmcgPSB0cnVlO1xuICAgIGxldCBwcmV2aW91c0luamVjdEltcGxlbWVudGF0aW9uO1xuICAgIGlmIChmYWN0b3J5LmluamVjdEltcGwpIHtcbiAgICAgIHByZXZpb3VzSW5qZWN0SW1wbGVtZW50YXRpb24gPSBzZXRJbmplY3RJbXBsZW1lbnRhdGlvbihmYWN0b3J5LmluamVjdEltcGwpO1xuICAgIH1cbiAgICBjb25zdCBzYXZlUHJldmlvdXNPclBhcmVudFROb2RlID0gZ2V0UHJldmlvdXNPclBhcmVudFROb2RlKCk7XG4gICAgY29uc3Qgc2F2ZUxWaWV3ID0gZ2V0TFZpZXcoKTtcbiAgICBzZXRUTm9kZUFuZFZpZXdEYXRhKHROb2RlLCBsRGF0YSk7XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gbERhdGFbaW5kZXhdID0gZmFjdG9yeS5mYWN0b3J5KG51bGwsIHREYXRhLCBsRGF0YSwgdE5vZGUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoZmFjdG9yeS5pbmplY3RJbXBsKSBzZXRJbmplY3RJbXBsZW1lbnRhdGlvbihwcmV2aW91c0luamVjdEltcGxlbWVudGF0aW9uKTtcbiAgICAgIHNldEluY2x1ZGVWaWV3UHJvdmlkZXJzKHByZXZpb3VzSW5jbHVkZVZpZXdQcm92aWRlcnMpO1xuICAgICAgZmFjdG9yeS5yZXNvbHZpbmcgPSBmYWxzZTtcbiAgICAgIHNldFROb2RlQW5kVmlld0RhdGEoc2F2ZVByZXZpb3VzT3JQYXJlbnRUTm9kZSwgc2F2ZUxWaWV3KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGJpdCBpbiBhbiBpbmplY3RvcidzIGJsb29tIGZpbHRlciB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdFxuICogdGhlIGRpcmVjdGl2ZSBtaWdodCBiZSBwcm92aWRlZCBieSB0aGUgaW5qZWN0b3IuXG4gKlxuICogV2hlbiBhIGRpcmVjdGl2ZSBpcyBwdWJsaWMsIGl0IGlzIGFkZGVkIHRvIHRoZSBibG9vbSBmaWx0ZXIgYW5kIGdpdmVuIGEgdW5pcXVlIElEIHRoYXQgY2FuIGJlXG4gKiByZXRyaWV2ZWQgb24gdGhlIFR5cGUuIFdoZW4gdGhlIGRpcmVjdGl2ZSBpc24ndCBwdWJsaWMgb3IgdGhlIHRva2VuIGlzIG5vdCBhIGRpcmVjdGl2ZSBgbnVsbGBcbiAqIGlzIHJldHVybmVkIGFzIHRoZSBub2RlIGluamVjdG9yIGNhbiBub3QgcG9zc2libHkgcHJvdmlkZSB0aGF0IHRva2VuLlxuICpcbiAqIEBwYXJhbSB0b2tlbiB0aGUgaW5qZWN0aW9uIHRva2VuXG4gKiBAcmV0dXJucyB0aGUgbWF0Y2hpbmcgYml0IHRvIGNoZWNrIGluIHRoZSBibG9vbSBmaWx0ZXIgb3IgYG51bGxgIGlmIHRoZSB0b2tlbiBpcyBub3Qga25vd24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBibG9vbUhhc2hCaXRPckZhY3RvcnkodG9rZW46IFR5cGU8YW55PnwgSW5qZWN0aW9uVG9rZW48YW55Pnwgc3RyaW5nKTogbnVtYmVyfFxuICAgIEZ1bmN0aW9ufHVuZGVmaW5lZCB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKHRva2VuLCAndG9rZW4gbXVzdCBiZSBkZWZpbmVkJyk7XG4gIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRva2VuLmNoYXJDb2RlQXQoMCkgfHwgMDtcbiAgfVxuICBjb25zdCB0b2tlbklkOiBudW1iZXJ8dW5kZWZpbmVkID0gKHRva2VuIGFzIGFueSlbTkdfRUxFTUVOVF9JRF07XG4gIHJldHVybiB0eXBlb2YgdG9rZW5JZCA9PT0gJ251bWJlcicgPyB0b2tlbklkICYgQkxPT01fTUFTSyA6IHRva2VuSWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBibG9vbUhhc1Rva2VuKFxuICAgIGJsb29tSGFzaDogbnVtYmVyLCBpbmplY3RvckluZGV4OiBudW1iZXIsIGluamVjdG9yVmlldzogTFZpZXcgfCBURGF0YSkge1xuICAvLyBDcmVhdGUgYSBtYXNrIHRoYXQgdGFyZ2V0cyB0aGUgc3BlY2lmaWMgYml0IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGlyZWN0aXZlIHdlJ3JlIGxvb2tpbmcgZm9yLlxuICAvLyBKUyBiaXQgb3BlcmF0aW9ucyBhcmUgMzIgYml0cywgc28gdGhpcyB3aWxsIGJlIGEgbnVtYmVyIGJldHdlZW4gMl4wIGFuZCAyXjMxLCBjb3JyZXNwb25kaW5nXG4gIC8vIHRvIGJpdCBwb3NpdGlvbnMgMCAtIDMxIGluIGEgMzIgYml0IGludGVnZXIuXG4gIGNvbnN0IG1hc2sgPSAxIDw8IGJsb29tSGFzaDtcbiAgY29uc3QgYjcgPSBibG9vbUhhc2ggJiAweDgwO1xuICBjb25zdCBiNiA9IGJsb29tSGFzaCAmIDB4NDA7XG4gIGNvbnN0IGI1ID0gYmxvb21IYXNoICYgMHgyMDtcblxuICAvLyBPdXIgYmxvb20gZmlsdGVyIHNpemUgaXMgMjU2IGJpdHMsIHdoaWNoIGlzIGVpZ2h0IDMyLWJpdCBibG9vbSBmaWx0ZXIgYnVja2V0czpcbiAgLy8gYmYwID0gWzAgLSAzMV0sIGJmMSA9IFszMiAtIDYzXSwgYmYyID0gWzY0IC0gOTVdLCBiZjMgPSBbOTYgLSAxMjddLCBldGMuXG4gIC8vIEdldCB0aGUgYmxvb20gZmlsdGVyIHZhbHVlIGZyb20gdGhlIGFwcHJvcHJpYXRlIGJ1Y2tldCBiYXNlZCBvbiB0aGUgZGlyZWN0aXZlJ3MgYmxvb21CaXQuXG4gIGxldCB2YWx1ZTogbnVtYmVyO1xuXG4gIGlmIChiNykge1xuICAgIHZhbHVlID0gYjYgPyAoYjUgPyBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDddIDogaW5qZWN0b3JWaWV3W2luamVjdG9ySW5kZXggKyA2XSkgOlxuICAgICAgICAgICAgICAgICAoYjUgPyBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDVdIDogaW5qZWN0b3JWaWV3W2luamVjdG9ySW5kZXggKyA0XSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSBiNiA/IChiNSA/IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgM10gOiBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleCArIDJdKSA6XG4gICAgICAgICAgICAgICAgIChiNSA/IGluamVjdG9yVmlld1tpbmplY3RvckluZGV4ICsgMV0gOiBpbmplY3RvclZpZXdbaW5qZWN0b3JJbmRleF0pO1xuICB9XG5cbiAgLy8gSWYgdGhlIGJsb29tIGZpbHRlciB2YWx1ZSBoYXMgdGhlIGJpdCBjb3JyZXNwb25kaW5nIHRvIHRoZSBkaXJlY3RpdmUncyBibG9vbUJpdCBmbGlwcGVkIG9uLFxuICAvLyB0aGlzIGluamVjdG9yIGlzIGEgcG90ZW50aWFsIG1hdGNoLlxuICByZXR1cm4gISEodmFsdWUgJiBtYXNrKTtcbn1cblxuLyoqIFJldHVybnMgdHJ1ZSBpZiBmbGFncyBwcmV2ZW50IHBhcmVudCBpbmplY3RvciBmcm9tIGJlaW5nIHNlYXJjaGVkIGZvciB0b2tlbnMgKi9cbmZ1bmN0aW9uIHNob3VsZFNlYXJjaFBhcmVudChmbGFnczogSW5qZWN0RmxhZ3MsIGlzRmlyc3RIb3N0VE5vZGU6IGJvb2xlYW4pOiBib29sZWFufG51bWJlciB7XG4gIHJldHVybiAhKGZsYWdzICYgSW5qZWN0RmxhZ3MuU2VsZikgJiYgIShmbGFncyAmIEluamVjdEZsYWdzLkhvc3QgJiYgaXNGaXJzdEhvc3RUTm9kZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RJbmplY3RvcigpIHtcbiAgY29uc3QgdE5vZGUgPSBnZXRQcmV2aW91c09yUGFyZW50VE5vZGUoKSBhcyBURWxlbWVudE5vZGUgfCBUQ29udGFpbmVyTm9kZSB8IFRFbGVtZW50Q29udGFpbmVyTm9kZTtcbiAgcmV0dXJuIG5ldyBOb2RlSW5qZWN0b3IodE5vZGUsIGdldExWaWV3KCkpO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3ROb2RlOiBURWxlbWVudE5vZGV8VENvbnRhaW5lck5vZGV8VEVsZW1lbnRDb250YWluZXJOb2RlLCBwcml2YXRlIF9sVmlldzogTFZpZXcpIHt9XG5cbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBnZXRPckNyZWF0ZUluamVjdGFibGUodGhpcy5fdE5vZGUsIHRoaXMuX2xWaWV3LCB0b2tlbiwgdW5kZWZpbmVkLCBub3RGb3VuZFZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFjdG9yeU9mPFQ+KHR5cGU6IFR5cGU8YW55Pik6ICgodHlwZTogVHlwZTxUPnwgbnVsbCkgPT4gVCl8bnVsbCB7XG4gIGNvbnN0IHR5cGVBbnkgPSB0eXBlIGFzIGFueTtcbiAgY29uc3QgZGVmID0gZ2V0Q29tcG9uZW50RGVmPFQ+KHR5cGVBbnkpIHx8IGdldERpcmVjdGl2ZURlZjxUPih0eXBlQW55KSB8fFxuICAgICAgZ2V0UGlwZURlZjxUPih0eXBlQW55KSB8fCBnZXRJbmplY3RhYmxlRGVmPFQ+KHR5cGVBbnkpIHx8IGdldEluamVjdG9yRGVmPFQ+KHR5cGVBbnkpO1xuICBpZiAoIWRlZiB8fCBkZWYuZmFjdG9yeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGRlZi5mYWN0b3J5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5oZXJpdGVkRmFjdG9yeTxUPih0eXBlOiBUeXBlPGFueT4pOiAodHlwZTogVHlwZTxUPikgPT4gVCB7XG4gIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHR5cGUucHJvdG90eXBlKS5jb25zdHJ1Y3RvciBhcyBUeXBlPGFueT47XG4gIGNvbnN0IGZhY3RvcnkgPSBnZXRGYWN0b3J5T2Y8VD4ocHJvdG8pO1xuICBpZiAoZmFjdG9yeSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWN0b3J5O1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlIGlzIG5vIGZhY3RvcnkgZGVmaW5lZC4gRWl0aGVyIHRoaXMgd2FzIGltcHJvcGVyIHVzYWdlIG9mIGluaGVyaXRhbmNlXG4gICAgLy8gKG5vIEFuZ3VsYXIgZGVjb3JhdG9yIG9uIHRoZSBzdXBlcmNsYXNzKSBvciB0aGVyZSBpcyBubyBjb25zdHJ1Y3RvciBhdCBhbGxcbiAgICAvLyBpbiB0aGUgaW5oZXJpdGFuY2UgY2hhaW4uIFNpbmNlIHRoZSB0d28gY2FzZXMgY2Fubm90IGJlIGRpc3Rpbmd1aXNoZWQsIHRoZVxuICAgIC8vIGxhdHRlciBoYXMgdG8gYmUgYXNzdW1lZC5cbiAgICByZXR1cm4gKHQpID0+IG5ldyB0KCk7XG4gIH1cbn1cbiJdfQ==