import * as tslib_1 from "tslib";
import { getViewComponent } from '../render3/global_utils_api';
import { CONTAINER_HEADER_OFFSET, NATIVE } from '../render3/interfaces/container';
import { isComponent, isLContainer } from '../render3/interfaces/type_checks';
import { PARENT, TVIEW, T_HOST } from '../render3/interfaces/view';
import { stylingMapToStringMap } from '../render3/styling_next/map_based_bindings';
import { NodeStylingDebug } from '../render3/styling_next/styling_debug';
import { isStylingContext } from '../render3/styling_next/util';
import { getComponent, getContext, getInjectionTokens, getInjector, getListeners, getLocalRefs, isBrowserEvents, loadLContext } from '../render3/util/discovery_utils';
import { INTERPOLATION_DELIMITER, renderStringify } from '../render3/util/misc_utils';
import { findComponentView } from '../render3/util/view_traversal_utils';
import { getComponentViewByIndex, getNativeByTNodeOrNull } from '../render3/util/view_utils';
import { assertDomNode } from '../util/assert';
/**
 * @publicApi
 */
var DebugEventListener = /** @class */ (function () {
    function DebugEventListener(name, callback) {
        this.name = name;
        this.callback = callback;
    }
    return DebugEventListener;
}());
export { DebugEventListener };
var DebugNode__PRE_R3__ = /** @class */ (function () {
    function DebugNode__PRE_R3__(nativeNode, parent, _debugContext) {
        this.listeners = [];
        this.parent = null;
        this._debugContext = _debugContext;
        this.nativeNode = nativeNode;
        if (parent && parent instanceof DebugElement__PRE_R3__) {
            parent.addChild(this);
        }
    }
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "injector", {
        get: function () { return this._debugContext.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "componentInstance", {
        get: function () { return this._debugContext.component; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "context", {
        get: function () { return this._debugContext.context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "references", {
        get: function () { return this._debugContext.references; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__PRE_R3__.prototype, "providerTokens", {
        get: function () { return this._debugContext.providerTokens; },
        enumerable: true,
        configurable: true
    });
    return DebugNode__PRE_R3__;
}());
export { DebugNode__PRE_R3__ };
var DebugElement__PRE_R3__ = /** @class */ (function (_super) {
    tslib_1.__extends(DebugElement__PRE_R3__, _super);
    function DebugElement__PRE_R3__(nativeNode, parent, _debugContext) {
        var _this = _super.call(this, nativeNode, parent, _debugContext) || this;
        _this.properties = {};
        _this.attributes = {};
        _this.classes = {};
        _this.styles = {};
        _this.childNodes = [];
        _this.nativeElement = nativeNode;
        return _this;
    }
    DebugElement__PRE_R3__.prototype.addChild = function (child) {
        if (child) {
            this.childNodes.push(child);
            child.parent = this;
        }
    };
    DebugElement__PRE_R3__.prototype.removeChild = function (child) {
        var childIndex = this.childNodes.indexOf(child);
        if (childIndex !== -1) {
            child.parent = null;
            this.childNodes.splice(childIndex, 1);
        }
    };
    DebugElement__PRE_R3__.prototype.insertChildrenAfter = function (child, newChildren) {
        var _a;
        var _this = this;
        var siblingIndex = this.childNodes.indexOf(child);
        if (siblingIndex !== -1) {
            (_a = this.childNodes).splice.apply(_a, tslib_1.__spread([siblingIndex + 1, 0], newChildren));
            newChildren.forEach(function (c) {
                if (c.parent) {
                    c.parent.removeChild(c);
                }
                child.parent = _this;
            });
        }
    };
    DebugElement__PRE_R3__.prototype.insertBefore = function (refChild, newChild) {
        var refIndex = this.childNodes.indexOf(refChild);
        if (refIndex === -1) {
            this.addChild(newChild);
        }
        else {
            if (newChild.parent) {
                newChild.parent.removeChild(newChild);
            }
            newChild.parent = this;
            this.childNodes.splice(refIndex, 0, newChild);
        }
    };
    DebugElement__PRE_R3__.prototype.query = function (predicate) {
        var results = this.queryAll(predicate);
        return results[0] || null;
    };
    DebugElement__PRE_R3__.prototype.queryAll = function (predicate) {
        var matches = [];
        _queryElementChildren(this, predicate, matches);
        return matches;
    };
    DebugElement__PRE_R3__.prototype.queryAllNodes = function (predicate) {
        var matches = [];
        _queryNodeChildren(this, predicate, matches);
        return matches;
    };
    Object.defineProperty(DebugElement__PRE_R3__.prototype, "children", {
        get: function () {
            return this
                .childNodes //
                .filter(function (node) { return node instanceof DebugElement__PRE_R3__; });
        },
        enumerable: true,
        configurable: true
    });
    DebugElement__PRE_R3__.prototype.triggerEventHandler = function (eventName, eventObj) {
        this.listeners.forEach(function (listener) {
            if (listener.name == eventName) {
                listener.callback(eventObj);
            }
        });
    };
    return DebugElement__PRE_R3__;
}(DebugNode__PRE_R3__));
export { DebugElement__PRE_R3__ };
/**
 * @publicApi
 */
export function asNativeElements(debugEls) {
    return debugEls.map(function (el) { return el.nativeElement; });
}
function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function (node) {
        if (node instanceof DebugElement__PRE_R3__) {
            if (predicate(node)) {
                matches.push(node);
            }
            _queryElementChildren(node, predicate, matches);
        }
    });
}
function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement__PRE_R3__) {
        parentNode.childNodes.forEach(function (node) {
            if (predicate(node)) {
                matches.push(node);
            }
            if (node instanceof DebugElement__PRE_R3__) {
                _queryNodeChildren(node, predicate, matches);
            }
        });
    }
}
var DebugNode__POST_R3__ = /** @class */ (function () {
    function DebugNode__POST_R3__(nativeNode) {
        this.nativeNode = nativeNode;
    }
    Object.defineProperty(DebugNode__POST_R3__.prototype, "parent", {
        get: function () {
            var parent = this.nativeNode.parentNode;
            return parent ? new DebugElement__POST_R3__(parent) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "injector", {
        get: function () { return getInjector(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "componentInstance", {
        get: function () {
            var nativeElement = this.nativeNode;
            return nativeElement &&
                (getComponent(nativeElement) || getViewComponent(nativeElement));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "context", {
        get: function () {
            return getComponent(this.nativeNode) || getContext(this.nativeNode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "listeners", {
        get: function () {
            return getListeners(this.nativeNode).filter(isBrowserEvents);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "references", {
        get: function () { return getLocalRefs(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugNode__POST_R3__.prototype, "providerTokens", {
        get: function () { return getInjectionTokens(this.nativeNode); },
        enumerable: true,
        configurable: true
    });
    return DebugNode__POST_R3__;
}());
var DebugElement__POST_R3__ = /** @class */ (function (_super) {
    tslib_1.__extends(DebugElement__POST_R3__, _super);
    function DebugElement__POST_R3__(nativeNode) {
        var _this = this;
        ngDevMode && assertDomNode(nativeNode);
        _this = _super.call(this, nativeNode) || this;
        return _this;
    }
    Object.defineProperty(DebugElement__POST_R3__.prototype, "nativeElement", {
        get: function () {
            return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "name", {
        get: function () {
            try {
                var context = loadLContext(this.nativeNode);
                var lView = context.lView;
                var tData = lView[TVIEW].data;
                var tNode = tData[context.nodeIndex];
                return tNode.tagName;
            }
            catch (e) {
                return this.nativeNode.nodeName;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "properties", {
        /**
         *  Gets a map of property names to property values for an element.
         *
         *  This map includes:
         *  - Regular property bindings (e.g. `[id]="id"`)
         *  - Host property bindings (e.g. `host: { '[id]': "id" }`)
         *  - Interpolated property bindings (e.g. `id="{{ value }}")
         *
         *  It does not include:
         *  - input property bindings (e.g. `[myCustomInput]="value"`)
         *  - attribute bindings (e.g. `[attr.role]="menu"`)
         */
        get: function () {
            var context = loadLContext(this.nativeNode, false);
            if (context == null) {
                return {};
            }
            var lView = context.lView;
            var tData = lView[TVIEW].data;
            var tNode = tData[context.nodeIndex];
            var properties = collectPropertyBindings(tNode, lView, tData);
            var className = collectClassNames(this);
            if (className) {
                properties['className'] =
                    properties['className'] ? properties['className'] + (" " + className) : className;
            }
            return properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "attributes", {
        get: function () {
            var attributes = {};
            var element = this.nativeElement;
            if (!element) {
                return attributes;
            }
            var context = loadLContext(element, false);
            if (context == null) {
                return {};
            }
            var lView = context.lView;
            var tNodeAttrs = lView[TVIEW].data[context.nodeIndex].attrs;
            var lowercaseTNodeAttrs = [];
            // For debug nodes we take the element's attribute directly from the DOM since it allows us
            // to account for ones that weren't set via bindings (e.g. ViewEngine keeps track of the ones
            // that are set through `Renderer2`). The problem is that the browser will lowercase all names,
            // however since we have the attributes already on the TNode, we can preserve the case by going
            // through them once, adding them to the `attributes` map and putting their lower-cased name
            // into an array. Afterwards when we're going through the native DOM attributes, we can check
            // whether we haven't run into an attribute already through the TNode.
            if (tNodeAttrs) {
                var i = 0;
                while (i < tNodeAttrs.length) {
                    var attrName = tNodeAttrs[i];
                    // Stop as soon as we hit a marker. We only care about the regular attributes. Everything
                    // else will be handled below when we read the final attributes off the DOM.
                    if (typeof attrName !== 'string')
                        break;
                    var attrValue = tNodeAttrs[i + 1];
                    attributes[attrName] = attrValue;
                    lowercaseTNodeAttrs.push(attrName.toLowerCase());
                    i += 2;
                }
            }
            var eAttrs = element.attributes;
            for (var i = 0; i < eAttrs.length; i++) {
                var attr = eAttrs[i];
                // Make sure that we don't assign the same attribute both in its
                // case-sensitive form and the lower-cased one from the browser.
                if (lowercaseTNodeAttrs.indexOf(attr.name) === -1) {
                    attributes[attr.name] = attr.value;
                }
            }
            return attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "styles", {
        get: function () {
            return _getStylingDebugInfo(this.nativeElement, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "classes", {
        get: function () {
            return _getStylingDebugInfo(this.nativeElement, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "childNodes", {
        get: function () {
            var childNodes = this.nativeNode.childNodes;
            var children = [];
            for (var i = 0; i < childNodes.length; i++) {
                var element = childNodes[i];
                children.push(getDebugNode__POST_R3__(element));
            }
            return children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugElement__POST_R3__.prototype, "children", {
        get: function () {
            var nativeElement = this.nativeElement;
            if (!nativeElement)
                return [];
            var childNodes = nativeElement.children;
            var children = [];
            for (var i = 0; i < childNodes.length; i++) {
                var element = childNodes[i];
                children.push(getDebugNode__POST_R3__(element));
            }
            return children;
        },
        enumerable: true,
        configurable: true
    });
    DebugElement__POST_R3__.prototype.query = function (predicate) {
        var results = this.queryAll(predicate);
        return results[0] || null;
    };
    DebugElement__POST_R3__.prototype.queryAll = function (predicate) {
        var matches = [];
        _queryAllR3(this, predicate, matches, true);
        return matches;
    };
    DebugElement__POST_R3__.prototype.queryAllNodes = function (predicate) {
        var matches = [];
        _queryAllR3(this, predicate, matches, false);
        return matches;
    };
    DebugElement__POST_R3__.prototype.triggerEventHandler = function (eventName, eventObj) {
        var node = this.nativeNode;
        var invokedListeners = [];
        this.listeners.forEach(function (listener) {
            if (listener.name === eventName) {
                var callback = listener.callback;
                callback(eventObj);
                invokedListeners.push(callback);
            }
        });
        // We need to check whether `eventListeners` exists, because it's something
        // that Zone.js only adds to `EventTarget` in browser environments.
        if (typeof node.eventListeners === 'function') {
            // Note that in Ivy we wrap event listeners with a call to `event.preventDefault` in some
            // cases. We use `Function` as a special token that gives us access to the actual event
            // listener.
            node.eventListeners(eventName).forEach(function (listener) {
                var unwrappedListener = listener(Function);
                return invokedListeners.indexOf(unwrappedListener) === -1 && unwrappedListener(eventObj);
            });
        }
    };
    return DebugElement__POST_R3__;
}(DebugNode__POST_R3__));
function _getStylingDebugInfo(element, isClassBased) {
    var context = loadLContext(element, false);
    if (!context) {
        return {};
    }
    var lView = context.lView;
    var tData = lView[TVIEW].data;
    var tNode = tData[context.nodeIndex];
    if (isClassBased) {
        return isStylingContext(tNode.classes) ?
            new NodeStylingDebug(tNode.classes, lView, true).values :
            stylingMapToStringMap(tNode.classes);
    }
    else {
        return isStylingContext(tNode.styles) ?
            new NodeStylingDebug(tNode.styles, lView, false).values :
            stylingMapToStringMap(tNode.styles);
    }
}
function _queryAllR3(parentElement, predicate, matches, elementsOnly) {
    var context = loadLContext(parentElement.nativeNode);
    var parentTNode = context.lView[TVIEW].data[context.nodeIndex];
    _queryNodeChildrenR3(parentTNode, context.lView, predicate, matches, elementsOnly, parentElement.nativeNode);
}
/**
 * Recursively match the current TNode against the predicate, and goes on with the next ones.
 *
 * @param tNode the current TNode
 * @param lView the LView of this TNode
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 * @param rootNativeNode the root native node on which predicate should not be matched
 */
function _queryNodeChildrenR3(tNode, lView, predicate, matches, elementsOnly, rootNativeNode) {
    var e_1, _a;
    var nativeNode = getNativeByTNodeOrNull(tNode, lView);
    // For each type of TNode, specific logic is executed.
    if (tNode.type === 3 /* Element */ || tNode.type === 4 /* ElementContainer */) {
        // Case 1: the TNode is an element
        // The native node has to be checked.
        _addQueryMatchR3(nativeNode, predicate, matches, elementsOnly, rootNativeNode);
        if (isComponent(tNode)) {
            // If the element is the host of a component, then all nodes in its view have to be processed.
            // Note: the component's content (tNode.child) will be processed from the insertion points.
            var componentView = getComponentViewByIndex(tNode.index, lView);
            if (componentView && componentView[TVIEW].firstChild) {
                _queryNodeChildrenR3(componentView[TVIEW].firstChild, componentView, predicate, matches, elementsOnly, rootNativeNode);
            }
        }
        else {
            if (tNode.child) {
                // Otherwise, its children have to be processed.
                _queryNodeChildrenR3(tNode.child, lView, predicate, matches, elementsOnly, rootNativeNode);
            }
            // We also have to query the DOM directly in order to catch elements inserted through
            // Renderer2. Note that this is __not__ optimal, because we're walking similar trees multiple
            // times. ViewEngine could do it more efficiently, because all the insertions go through
            // Renderer2, however that's not the case in Ivy. This approach is being used because:
            // 1. Matching the ViewEngine behavior would mean potentially introducing a depedency
            //    from `Renderer2` to Ivy which could bring Ivy code into ViewEngine.
            // 2. We would have to make `Renderer3` "know" about debug nodes.
            // 3. It allows us to capture nodes that were inserted directly via the DOM.
            nativeNode && _queryNativeNodeDescendants(nativeNode, predicate, matches, elementsOnly);
        }
        // In all cases, if a dynamic container exists for this node, each view inside it has to be
        // processed.
        var nodeOrContainer = lView[tNode.index];
        if (isLContainer(nodeOrContainer)) {
            _queryNodeChildrenInContainerR3(nodeOrContainer, predicate, matches, elementsOnly, rootNativeNode);
        }
    }
    else if (tNode.type === 0 /* Container */) {
        // Case 2: the TNode is a container
        // The native node has to be checked.
        var lContainer = lView[tNode.index];
        _addQueryMatchR3(lContainer[NATIVE], predicate, matches, elementsOnly, rootNativeNode);
        // Each view inside the container has to be processed.
        _queryNodeChildrenInContainerR3(lContainer, predicate, matches, elementsOnly, rootNativeNode);
    }
    else if (tNode.type === 1 /* Projection */) {
        // Case 3: the TNode is a projection insertion point (i.e. a <ng-content>).
        // The nodes projected at this location all need to be processed.
        var componentView = findComponentView(lView);
        var componentHost = componentView[T_HOST];
        var head = componentHost.projection[tNode.projection];
        if (Array.isArray(head)) {
            try {
                for (var head_1 = tslib_1.__values(head), head_1_1 = head_1.next(); !head_1_1.done; head_1_1 = head_1.next()) {
                    var nativeNode_1 = head_1_1.value;
                    _addQueryMatchR3(nativeNode_1, predicate, matches, elementsOnly, rootNativeNode);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (head_1_1 && !head_1_1.done && (_a = head_1.return)) _a.call(head_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (head) {
            var nextLView = componentView[PARENT];
            var nextTNode = nextLView[TVIEW].data[head.index];
            _queryNodeChildrenR3(nextTNode, nextLView, predicate, matches, elementsOnly, rootNativeNode);
        }
    }
    else if (tNode.child) {
        // Case 4: the TNode is a view.
        _queryNodeChildrenR3(tNode.child, lView, predicate, matches, elementsOnly, rootNativeNode);
    }
    // We don't want to go to the next sibling of the root node.
    if (rootNativeNode !== nativeNode) {
        // To determine the next node to be processed, we need to use the next or the projectionNext
        // link, depending on whether the current node has been projected.
        var nextTNode = (tNode.flags & 2 /* isProjected */) ? tNode.projectionNext : tNode.next;
        if (nextTNode) {
            _queryNodeChildrenR3(nextTNode, lView, predicate, matches, elementsOnly, rootNativeNode);
        }
    }
}
/**
 * Process all TNodes in a given container.
 *
 * @param lContainer the container to be processed
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 * @param rootNativeNode the root native node on which predicate should not be matched
 */
function _queryNodeChildrenInContainerR3(lContainer, predicate, matches, elementsOnly, rootNativeNode) {
    for (var i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
        var childView = lContainer[i];
        _queryNodeChildrenR3(childView[TVIEW].node, childView, predicate, matches, elementsOnly, rootNativeNode);
    }
}
/**
 * Match the current native node against the predicate.
 *
 * @param nativeNode the current native node
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 * @param rootNativeNode the root native node on which predicate should not be matched
 */
function _addQueryMatchR3(nativeNode, predicate, matches, elementsOnly, rootNativeNode) {
    if (rootNativeNode !== nativeNode) {
        var debugNode = getDebugNode(nativeNode);
        if (!debugNode) {
            return;
        }
        // Type of the "predicate and "matches" array are set based on the value of
        // the "elementsOnly" parameter. TypeScript is not able to properly infer these
        // types with generics, so we manually cast the parameters accordingly.
        if (elementsOnly && debugNode instanceof DebugElement__POST_R3__ && predicate(debugNode) &&
            matches.indexOf(debugNode) === -1) {
            matches.push(debugNode);
        }
        else if (!elementsOnly && predicate(debugNode) &&
            matches.indexOf(debugNode) === -1) {
            matches.push(debugNode);
        }
    }
}
/**
 * Match all the descendants of a DOM node against a predicate.
 *
 * @param nativeNode the current native node
 * @param predicate the predicate to match
 * @param matches the list of positive matches
 * @param elementsOnly whether only elements should be searched
 */
function _queryNativeNodeDescendants(parentNode, predicate, matches, elementsOnly) {
    var nodes = parentNode.childNodes;
    var length = nodes.length;
    for (var i = 0; i < length; i++) {
        var node = nodes[i];
        var debugNode = getDebugNode(node);
        if (debugNode) {
            if (elementsOnly && debugNode instanceof DebugElement__POST_R3__ && predicate(debugNode) &&
                matches.indexOf(debugNode) === -1) {
                matches.push(debugNode);
            }
            else if (!elementsOnly && predicate(debugNode) &&
                matches.indexOf(debugNode) === -1) {
                matches.push(debugNode);
            }
            _queryNativeNodeDescendants(node, predicate, matches, elementsOnly);
        }
    }
}
/**
 * Iterates through the property bindings for a given node and generates
 * a map of property names to values. This map only contains property bindings
 * defined in templates, not in host bindings.
 */
function collectPropertyBindings(tNode, lView, tData) {
    var properties = {};
    var bindingIndexes = tNode.propertyBindings;
    if (bindingIndexes !== null) {
        for (var i = 0; i < bindingIndexes.length; i++) {
            var bindingIndex = bindingIndexes[i];
            var propMetadata = tData[bindingIndex];
            var metadataParts = propMetadata.split(INTERPOLATION_DELIMITER);
            var propertyName = metadataParts[0];
            if (metadataParts.length > 1) {
                var value = metadataParts[1];
                for (var j = 1; j < metadataParts.length - 1; j++) {
                    value += renderStringify(lView[bindingIndex + j - 1]) + metadataParts[j + 1];
                }
                properties[propertyName] = value;
            }
            else {
                properties[propertyName] = lView[bindingIndex];
            }
        }
    }
    return properties;
}
function collectClassNames(debugElement) {
    var e_2, _a;
    var classes = debugElement.classes;
    var output = '';
    try {
        for (var _b = tslib_1.__values(Object.keys(classes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var className = _c.value;
            if (classes[className]) {
                output = output ? output + (" " + className) : className;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return output;
}
// Need to keep the nodes in a global Map so that multiple angular apps are supported.
var _nativeNodeToDebugNode = new Map();
function getDebugNode__PRE_R3__(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode) || null;
}
var NG_DEBUG_PROPERTY = '__ng_debug__';
export function getDebugNode__POST_R3__(nativeNode) {
    if (nativeNode instanceof Node) {
        if (!(nativeNode.hasOwnProperty(NG_DEBUG_PROPERTY))) {
            nativeNode[NG_DEBUG_PROPERTY] = nativeNode.nodeType == Node.ELEMENT_NODE ?
                new DebugElement__POST_R3__(nativeNode) :
                new DebugNode__POST_R3__(nativeNode);
        }
        return nativeNode[NG_DEBUG_PROPERTY];
    }
    return null;
}
/**
 * @publicApi
 */
export var getDebugNode = getDebugNode__POST_R3__;
export function getAllDebugNodes() {
    return Array.from(_nativeNodeToDebugNode.values());
}
export function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
}
export function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
}
/**
 * @publicApi
 */
export var DebugNode = DebugNode__POST_R3__;
/**
 * @publicApi
 */
export var DebugElement = DebugElement__POST_R3__;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVidWdfbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RlYnVnL2RlYnVnX25vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyx1QkFBdUIsRUFBYyxNQUFNLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUU1RixPQUFPLEVBQUMsV0FBVyxFQUFFLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQzVFLE9BQU8sRUFBUSxNQUFNLEVBQVMsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRS9FLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNySyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDcEYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDdkUsT0FBTyxFQUFDLHVCQUF1QixFQUFFLHNCQUFzQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDM0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBSzdDOztHQUVHO0FBQ0g7SUFDRSw0QkFBbUIsSUFBWSxFQUFTLFFBQWtCO1FBQXZDLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxh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QmhCLG9CQStnQnlFLENBQUM7QUFFaEY7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxZQUFZLEdBdGZuQix1QkFzZmtGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpJztcbmltcG9ydCB7Z2V0Vmlld0NvbXBvbmVudH0gZnJvbSAnLi4vcmVuZGVyMy9nbG9iYWxfdXRpbHNfYXBpJztcbmltcG9ydCB7Q09OVEFJTkVSX0hFQURFUl9PRkZTRVQsIExDb250YWluZXIsIE5BVElWRX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge1RFbGVtZW50Tm9kZSwgVE5vZGUsIFROb2RlRmxhZ3MsIFROb2RlVHlwZX0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtpc0NvbXBvbmVudCwgaXNMQ29udGFpbmVyfSBmcm9tICcuLi9yZW5kZXIzL2ludGVyZmFjZXMvdHlwZV9jaGVja3MnO1xuaW1wb3J0IHtMVmlldywgUEFSRU5ULCBURGF0YSwgVFZJRVcsIFRfSE9TVH0gZnJvbSAnLi4vcmVuZGVyMy9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtUU3R5bGluZ0NvbnRleHR9IGZyb20gJy4uL3JlbmRlcjMvc3R5bGluZ19uZXh0L2ludGVyZmFjZXMnO1xuaW1wb3J0IHtzdHlsaW5nTWFwVG9TdHJpbmdNYXB9IGZyb20gJy4uL3JlbmRlcjMvc3R5bGluZ19uZXh0L21hcF9iYXNlZF9iaW5kaW5ncyc7XG5pbXBvcnQge05vZGVTdHlsaW5nRGVidWd9IGZyb20gJy4uL3JlbmRlcjMvc3R5bGluZ19uZXh0L3N0eWxpbmdfZGVidWcnO1xuaW1wb3J0IHtpc1N0eWxpbmdDb250ZXh0fSBmcm9tICcuLi9yZW5kZXIzL3N0eWxpbmdfbmV4dC91dGlsJztcbmltcG9ydCB7Z2V0Q29tcG9uZW50LCBnZXRDb250ZXh0LCBnZXRJbmplY3Rpb25Ub2tlbnMsIGdldEluamVjdG9yLCBnZXRMaXN0ZW5lcnMsIGdldExvY2FsUmVmcywgaXNCcm93c2VyRXZlbnRzLCBsb2FkTENvbnRleHR9IGZyb20gJy4uL3JlbmRlcjMvdXRpbC9kaXNjb3ZlcnlfdXRpbHMnO1xuaW1wb3J0IHtJTlRFUlBPTEFUSU9OX0RFTElNSVRFUiwgcmVuZGVyU3RyaW5naWZ5fSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvbWlzY191dGlscyc7XG5pbXBvcnQge2ZpbmRDb21wb25lbnRWaWV3fSBmcm9tICcuLi9yZW5kZXIzL3V0aWwvdmlld190cmF2ZXJzYWxfdXRpbHMnO1xuaW1wb3J0IHtnZXRDb21wb25lbnRWaWV3QnlJbmRleCwgZ2V0TmF0aXZlQnlUTm9kZU9yTnVsbH0gZnJvbSAnLi4vcmVuZGVyMy91dGlsL3ZpZXdfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnREb21Ob2RlfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQge0RlYnVnQ29udGV4dH0gZnJvbSAnLi4vdmlldy9pbmRleCc7XG5cblxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIERlYnVnRXZlbnRMaXN0ZW5lciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBjYWxsYmFjazogRnVuY3Rpb24pIHt9XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERlYnVnTm9kZSB7XG4gIHJlYWRvbmx5IGxpc3RlbmVyczogRGVidWdFdmVudExpc3RlbmVyW107XG4gIHJlYWRvbmx5IHBhcmVudDogRGVidWdFbGVtZW50fG51bGw7XG4gIHJlYWRvbmx5IG5hdGl2ZU5vZGU6IGFueTtcbiAgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yO1xuICByZWFkb25seSBjb21wb25lbnRJbnN0YW5jZTogYW55O1xuICByZWFkb25seSBjb250ZXh0OiBhbnk7XG4gIHJlYWRvbmx5IHJlZmVyZW5jZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICByZWFkb25seSBwcm92aWRlclRva2VuczogYW55W107XG59XG5leHBvcnQgY2xhc3MgRGVidWdOb2RlX19QUkVfUjNfXyB7XG4gIHJlYWRvbmx5IGxpc3RlbmVyczogRGVidWdFdmVudExpc3RlbmVyW10gPSBbXTtcbiAgcmVhZG9ubHkgcGFyZW50OiBEZWJ1Z0VsZW1lbnR8bnVsbCA9IG51bGw7XG4gIHJlYWRvbmx5IG5hdGl2ZU5vZGU6IGFueTtcbiAgcHJpdmF0ZSByZWFkb25seSBfZGVidWdDb250ZXh0OiBEZWJ1Z0NvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IobmF0aXZlTm9kZTogYW55LCBwYXJlbnQ6IERlYnVnTm9kZXxudWxsLCBfZGVidWdDb250ZXh0OiBEZWJ1Z0NvbnRleHQpIHtcbiAgICB0aGlzLl9kZWJ1Z0NvbnRleHQgPSBfZGVidWdDb250ZXh0O1xuICAgIHRoaXMubmF0aXZlTm9kZSA9IG5hdGl2ZU5vZGU7XG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnRfX1BSRV9SM19fKSB7XG4gICAgICBwYXJlbnQuYWRkQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGluamVjdG9yKCk6IEluamVjdG9yIHsgcmV0dXJuIHRoaXMuX2RlYnVnQ29udGV4dC5pbmplY3RvcjsgfVxuXG4gIGdldCBjb21wb25lbnRJbnN0YW5jZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fZGVidWdDb250ZXh0LmNvbXBvbmVudDsgfVxuXG4gIGdldCBjb250ZXh0KCk6IGFueSB7IHJldHVybiB0aGlzLl9kZWJ1Z0NvbnRleHQuY29udGV4dDsgfVxuXG4gIGdldCByZWZlcmVuY2VzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHsgcmV0dXJuIHRoaXMuX2RlYnVnQ29udGV4dC5yZWZlcmVuY2VzOyB9XG5cbiAgZ2V0IHByb3ZpZGVyVG9rZW5zKCk6IGFueVtdIHsgcmV0dXJuIHRoaXMuX2RlYnVnQ29udGV4dC5wcm92aWRlclRva2VuczsgfVxufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEZWJ1Z0VsZW1lbnQgZXh0ZW5kcyBEZWJ1Z05vZGUge1xuICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIHJlYWRvbmx5IHByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICByZWFkb25seSBhdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH07XG4gIHJlYWRvbmx5IGNsYXNzZXM6IHtba2V5OiBzdHJpbmddOiBib29sZWFufTtcbiAgcmVhZG9ubHkgc3R5bGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH07XG4gIHJlYWRvbmx5IGNoaWxkTm9kZXM6IERlYnVnTm9kZVtdO1xuICByZWFkb25seSBuYXRpdmVFbGVtZW50OiBhbnk7XG4gIHJlYWRvbmx5IGNoaWxkcmVuOiBEZWJ1Z0VsZW1lbnRbXTtcblxuICBxdWVyeShwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+KTogRGVidWdFbGVtZW50O1xuICBxdWVyeUFsbChwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+KTogRGVidWdFbGVtZW50W107XG4gIHF1ZXJ5QWxsTm9kZXMocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdOb2RlPik6IERlYnVnTm9kZVtdO1xuICB0cmlnZ2VyRXZlbnRIYW5kbGVyKGV2ZW50TmFtZTogc3RyaW5nLCBldmVudE9iajogYW55KTogdm9pZDtcbn1cbmV4cG9ydCBjbGFzcyBEZWJ1Z0VsZW1lbnRfX1BSRV9SM19fIGV4dGVuZHMgRGVidWdOb2RlX19QUkVfUjNfXyBpbXBsZW1lbnRzIERlYnVnRWxlbWVudCB7XG4gIHJlYWRvbmx5IG5hbWUgITogc3RyaW5nO1xuICByZWFkb25seSBwcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICByZWFkb25seSBhdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbH0gPSB7fTtcbiAgcmVhZG9ubHkgY2xhc3Nlczoge1trZXk6IHN0cmluZ106IGJvb2xlYW59ID0ge307XG4gIHJlYWRvbmx5IHN0eWxlczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGx9ID0ge307XG4gIHJlYWRvbmx5IGNoaWxkTm9kZXM6IERlYnVnTm9kZVtdID0gW107XG4gIHJlYWRvbmx5IG5hdGl2ZUVsZW1lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmVOb2RlOiBhbnksIHBhcmVudDogYW55LCBfZGVidWdDb250ZXh0OiBEZWJ1Z0NvbnRleHQpIHtcbiAgICBzdXBlcihuYXRpdmVOb2RlLCBwYXJlbnQsIF9kZWJ1Z0NvbnRleHQpO1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IG5hdGl2ZU5vZGU7XG4gIH1cblxuICBhZGRDaGlsZChjaGlsZDogRGVidWdOb2RlKSB7XG4gICAgaWYgKGNoaWxkKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMucHVzaChjaGlsZCk7XG4gICAgICAoY2hpbGQgYXN7cGFyZW50OiBEZWJ1Z05vZGV9KS5wYXJlbnQgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNoaWxkKGNoaWxkOiBEZWJ1Z05vZGUpIHtcbiAgICBjb25zdCBjaGlsZEluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChjaGlsZEluZGV4ICE9PSAtMSkge1xuICAgICAgKGNoaWxkIGFze3BhcmVudDogRGVidWdOb2RlIHwgbnVsbH0pLnBhcmVudCA9IG51bGw7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGNoaWxkSW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydENoaWxkcmVuQWZ0ZXIoY2hpbGQ6IERlYnVnTm9kZSwgbmV3Q2hpbGRyZW46IERlYnVnTm9kZVtdKSB7XG4gICAgY29uc3Qgc2libGluZ0luZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChzaWJsaW5nSW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKHNpYmxpbmdJbmRleCArIDEsIDAsIC4uLm5ld0NoaWxkcmVuKTtcbiAgICAgIG5ld0NoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGlmIChjLnBhcmVudCkge1xuICAgICAgICAgIChjLnBhcmVudCBhcyBEZWJ1Z0VsZW1lbnRfX1BSRV9SM19fKS5yZW1vdmVDaGlsZChjKTtcbiAgICAgICAgfVxuICAgICAgICAoY2hpbGQgYXN7cGFyZW50OiBEZWJ1Z05vZGV9KS5wYXJlbnQgPSB0aGlzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHJlZkNoaWxkOiBEZWJ1Z05vZGUsIG5ld0NoaWxkOiBEZWJ1Z05vZGUpOiB2b2lkIHtcbiAgICBjb25zdCByZWZJbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKHJlZkNoaWxkKTtcbiAgICBpZiAocmVmSW5kZXggPT09IC0xKSB7XG4gICAgICB0aGlzLmFkZENoaWxkKG5ld0NoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5ld0NoaWxkLnBhcmVudCkge1xuICAgICAgICAobmV3Q2hpbGQucGFyZW50IGFzIERlYnVnRWxlbWVudF9fUFJFX1IzX18pLnJlbW92ZUNoaWxkKG5ld0NoaWxkKTtcbiAgICAgIH1cbiAgICAgIChuZXdDaGlsZCBhc3twYXJlbnQ6IERlYnVnTm9kZX0pLnBhcmVudCA9IHRoaXM7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKHJlZkluZGV4LCAwLCBuZXdDaGlsZCk7XG4gICAgfVxuICB9XG5cbiAgcXVlcnkocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudCB7XG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMucXVlcnlBbGwocHJlZGljYXRlKTtcbiAgICByZXR1cm4gcmVzdWx0c1swXSB8fCBudWxsO1xuICB9XG5cbiAgcXVlcnlBbGwocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudFtdIHtcbiAgICBjb25zdCBtYXRjaGVzOiBEZWJ1Z0VsZW1lbnRbXSA9IFtdO1xuICAgIF9xdWVyeUVsZW1lbnRDaGlsZHJlbih0aGlzLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgcXVlcnlBbGxOb2RlcyhwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z05vZGU+KTogRGVidWdOb2RlW10ge1xuICAgIGNvbnN0IG1hdGNoZXM6IERlYnVnTm9kZVtdID0gW107XG4gICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuKHRoaXMsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBnZXQgY2hpbGRyZW4oKTogRGVidWdFbGVtZW50W10ge1xuICAgIHJldHVybiB0aGlzXG4gICAgICAgIC5jaGlsZE5vZGVzICAvL1xuICAgICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50X19QUkVfUjNfXykgYXMgRGVidWdFbGVtZW50W107XG4gIH1cblxuICB0cmlnZ2VyRXZlbnRIYW5kbGVyKGV2ZW50TmFtZTogc3RyaW5nLCBldmVudE9iajogYW55KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgIGlmIChsaXN0ZW5lci5uYW1lID09IGV2ZW50TmFtZSkge1xuICAgICAgICBsaXN0ZW5lci5jYWxsYmFjayhldmVudE9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc05hdGl2ZUVsZW1lbnRzKGRlYnVnRWxzOiBEZWJ1Z0VsZW1lbnRbXSk6IGFueSB7XG4gIHJldHVybiBkZWJ1Z0Vscy5tYXAoKGVsKSA9PiBlbC5uYXRpdmVFbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gX3F1ZXJ5RWxlbWVudENoaWxkcmVuKFxuICAgIGVsZW1lbnQ6IERlYnVnRWxlbWVudCwgcHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PiwgbWF0Y2hlczogRGVidWdFbGVtZW50W10pIHtcbiAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnRfX1BSRV9SM19fKSB7XG4gICAgICBpZiAocHJlZGljYXRlKG5vZGUpKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICAgIF9xdWVyeUVsZW1lbnRDaGlsZHJlbihub2RlLCBwcmVkaWNhdGUsIG1hdGNoZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9xdWVyeU5vZGVDaGlsZHJlbihcbiAgICBwYXJlbnROb2RlOiBEZWJ1Z05vZGUsIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnTm9kZT4sIG1hdGNoZXM6IERlYnVnTm9kZVtdKSB7XG4gIGlmIChwYXJlbnROb2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50X19QUkVfUjNfXykge1xuICAgIHBhcmVudE5vZGUuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgICBtYXRjaGVzLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIERlYnVnRWxlbWVudF9fUFJFX1IzX18pIHtcbiAgICAgICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuKG5vZGUsIHByZWRpY2F0ZSwgbWF0Y2hlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmNsYXNzIERlYnVnTm9kZV9fUE9TVF9SM19fIGltcGxlbWVudHMgRGVidWdOb2RlIHtcbiAgcmVhZG9ubHkgbmF0aXZlTm9kZTogTm9kZTtcblxuICBjb25zdHJ1Y3RvcihuYXRpdmVOb2RlOiBOb2RlKSB7IHRoaXMubmF0aXZlTm9kZSA9IG5hdGl2ZU5vZGU7IH1cblxuICBnZXQgcGFyZW50KCk6IERlYnVnRWxlbWVudHxudWxsIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLm5hdGl2ZU5vZGUucGFyZW50Tm9kZSBhcyBFbGVtZW50O1xuICAgIHJldHVybiBwYXJlbnQgPyBuZXcgRGVidWdFbGVtZW50X19QT1NUX1IzX18ocGFyZW50KSA6IG51bGw7XG4gIH1cblxuICBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3IgeyByZXR1cm4gZ2V0SW5qZWN0b3IodGhpcy5uYXRpdmVOb2RlKTsgfVxuXG4gIGdldCBjb21wb25lbnRJbnN0YW5jZSgpOiBhbnkge1xuICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLm5hdGl2ZU5vZGU7XG4gICAgcmV0dXJuIG5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgKGdldENvbXBvbmVudChuYXRpdmVFbGVtZW50IGFzIEVsZW1lbnQpIHx8IGdldFZpZXdDb21wb25lbnQobmF0aXZlRWxlbWVudCkpO1xuICB9XG4gIGdldCBjb250ZXh0KCk6IGFueSB7XG4gICAgcmV0dXJuIGdldENvbXBvbmVudCh0aGlzLm5hdGl2ZU5vZGUgYXMgRWxlbWVudCkgfHwgZ2V0Q29udGV4dCh0aGlzLm5hdGl2ZU5vZGUgYXMgRWxlbWVudCk7XG4gIH1cblxuICBnZXQgbGlzdGVuZXJzKCk6IERlYnVnRXZlbnRMaXN0ZW5lcltdIHtcbiAgICByZXR1cm4gZ2V0TGlzdGVuZXJzKHRoaXMubmF0aXZlTm9kZSBhcyBFbGVtZW50KS5maWx0ZXIoaXNCcm93c2VyRXZlbnRzKTtcbiAgfVxuXG4gIGdldCByZWZlcmVuY2VzKCk6IHtba2V5OiBzdHJpbmddOiBhbnk7fSB7IHJldHVybiBnZXRMb2NhbFJlZnModGhpcy5uYXRpdmVOb2RlKTsgfVxuXG4gIGdldCBwcm92aWRlclRva2VucygpOiBhbnlbXSB7IHJldHVybiBnZXRJbmplY3Rpb25Ub2tlbnModGhpcy5uYXRpdmVOb2RlIGFzIEVsZW1lbnQpOyB9XG59XG5cbmNsYXNzIERlYnVnRWxlbWVudF9fUE9TVF9SM19fIGV4dGVuZHMgRGVidWdOb2RlX19QT1NUX1IzX18gaW1wbGVtZW50cyBEZWJ1Z0VsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihuYXRpdmVOb2RlOiBFbGVtZW50KSB7XG4gICAgbmdEZXZNb2RlICYmIGFzc2VydERvbU5vZGUobmF0aXZlTm9kZSk7XG4gICAgc3VwZXIobmF0aXZlTm9kZSk7XG4gIH1cblxuICBnZXQgbmF0aXZlRWxlbWVudCgpOiBFbGVtZW50fG51bGwge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZU5vZGUubm9kZVR5cGUgPT0gTm9kZS5FTEVNRU5UX05PREUgPyB0aGlzLm5hdGl2ZU5vZGUgYXMgRWxlbWVudCA6IG51bGw7XG4gIH1cblxuICBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gbG9hZExDb250ZXh0KHRoaXMubmF0aXZlTm9kZSkgITtcbiAgICAgIGNvbnN0IGxWaWV3ID0gY29udGV4dC5sVmlldztcbiAgICAgIGNvbnN0IHREYXRhID0gbFZpZXdbVFZJRVddLmRhdGE7XG4gICAgICBjb25zdCB0Tm9kZSA9IHREYXRhW2NvbnRleHQubm9kZUluZGV4XSBhcyBUTm9kZTtcbiAgICAgIHJldHVybiB0Tm9kZS50YWdOYW1lICE7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHRoaXMubmF0aXZlTm9kZS5ub2RlTmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIEdldHMgYSBtYXAgb2YgcHJvcGVydHkgbmFtZXMgdG8gcHJvcGVydHkgdmFsdWVzIGZvciBhbiBlbGVtZW50LlxuICAgKlxuICAgKiAgVGhpcyBtYXAgaW5jbHVkZXM6XG4gICAqICAtIFJlZ3VsYXIgcHJvcGVydHkgYmluZGluZ3MgKGUuZy4gYFtpZF09XCJpZFwiYClcbiAgICogIC0gSG9zdCBwcm9wZXJ0eSBiaW5kaW5ncyAoZS5nLiBgaG9zdDogeyAnW2lkXSc6IFwiaWRcIiB9YClcbiAgICogIC0gSW50ZXJwb2xhdGVkIHByb3BlcnR5IGJpbmRpbmdzIChlLmcuIGBpZD1cInt7IHZhbHVlIH19XCIpXG4gICAqXG4gICAqICBJdCBkb2VzIG5vdCBpbmNsdWRlOlxuICAgKiAgLSBpbnB1dCBwcm9wZXJ0eSBiaW5kaW5ncyAoZS5nLiBgW215Q3VzdG9tSW5wdXRdPVwidmFsdWVcImApXG4gICAqICAtIGF0dHJpYnV0ZSBiaW5kaW5ncyAoZS5nLiBgW2F0dHIucm9sZV09XCJtZW51XCJgKVxuICAgKi9cbiAgZ2V0IHByb3BlcnRpZXMoKToge1trZXk6IHN0cmluZ106IGFueTt9IHtcbiAgICBjb25zdCBjb250ZXh0ID0gbG9hZExDb250ZXh0KHRoaXMubmF0aXZlTm9kZSwgZmFsc2UpO1xuICAgIGlmIChjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBsVmlldyA9IGNvbnRleHQubFZpZXc7XG4gICAgY29uc3QgdERhdGEgPSBsVmlld1tUVklFV10uZGF0YTtcbiAgICBjb25zdCB0Tm9kZSA9IHREYXRhW2NvbnRleHQubm9kZUluZGV4XSBhcyBUTm9kZTtcblxuICAgIGNvbnN0IHByb3BlcnRpZXMgPSBjb2xsZWN0UHJvcGVydHlCaW5kaW5ncyh0Tm9kZSwgbFZpZXcsIHREYXRhKTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjb2xsZWN0Q2xhc3NOYW1lcyh0aGlzKTtcblxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIHByb3BlcnRpZXNbJ2NsYXNzTmFtZSddID1cbiAgICAgICAgICBwcm9wZXJ0aWVzWydjbGFzc05hbWUnXSA/IHByb3BlcnRpZXNbJ2NsYXNzTmFtZSddICsgYCAke2NsYXNzTmFtZX1gIDogY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMoKToge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGw7fSB7XG4gICAgY29uc3QgYXR0cmlidXRlczoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGw7fSA9IHt9O1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBhdHRyaWJ1dGVzO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRleHQgPSBsb2FkTENvbnRleHQoZWxlbWVudCwgZmFsc2UpO1xuICAgIGlmIChjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBsVmlldyA9IGNvbnRleHQubFZpZXc7XG4gICAgY29uc3QgdE5vZGVBdHRycyA9IChsVmlld1tUVklFV10uZGF0YVtjb250ZXh0Lm5vZGVJbmRleF0gYXMgVE5vZGUpLmF0dHJzO1xuICAgIGNvbnN0IGxvd2VyY2FzZVROb2RlQXR0cnM6IHN0cmluZ1tdID0gW107XG5cbiAgICAvLyBGb3IgZGVidWcgbm9kZXMgd2UgdGFrZSB0aGUgZWxlbWVudCdzIGF0dHJpYnV0ZSBkaXJlY3RseSBmcm9tIHRoZSBET00gc2luY2UgaXQgYWxsb3dzIHVzXG4gICAgLy8gdG8gYWNjb3VudCBmb3Igb25lcyB0aGF0IHdlcmVuJ3Qgc2V0IHZpYSBiaW5kaW5ncyAoZS5nLiBWaWV3RW5naW5lIGtlZXBzIHRyYWNrIG9mIHRoZSBvbmVzXG4gICAgLy8gdGhhdCBhcmUgc2V0IHRocm91Z2ggYFJlbmRlcmVyMmApLiBUaGUgcHJvYmxlbSBpcyB0aGF0IHRoZSBicm93c2VyIHdpbGwgbG93ZXJjYXNlIGFsbCBuYW1lcyxcbiAgICAvLyBob3dldmVyIHNpbmNlIHdlIGhhdmUgdGhlIGF0dHJpYnV0ZXMgYWxyZWFkeSBvbiB0aGUgVE5vZGUsIHdlIGNhbiBwcmVzZXJ2ZSB0aGUgY2FzZSBieSBnb2luZ1xuICAgIC8vIHRocm91Z2ggdGhlbSBvbmNlLCBhZGRpbmcgdGhlbSB0byB0aGUgYGF0dHJpYnV0ZXNgIG1hcCBhbmQgcHV0dGluZyB0aGVpciBsb3dlci1jYXNlZCBuYW1lXG4gICAgLy8gaW50byBhbiBhcnJheS4gQWZ0ZXJ3YXJkcyB3aGVuIHdlJ3JlIGdvaW5nIHRocm91Z2ggdGhlIG5hdGl2ZSBET00gYXR0cmlidXRlcywgd2UgY2FuIGNoZWNrXG4gICAgLy8gd2hldGhlciB3ZSBoYXZlbid0IHJ1biBpbnRvIGFuIGF0dHJpYnV0ZSBhbHJlYWR5IHRocm91Z2ggdGhlIFROb2RlLlxuICAgIGlmICh0Tm9kZUF0dHJzKSB7XG4gICAgICBsZXQgaSA9IDA7XG4gICAgICB3aGlsZSAoaSA8IHROb2RlQXR0cnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGF0dHJOYW1lID0gdE5vZGVBdHRyc1tpXTtcblxuICAgICAgICAvLyBTdG9wIGFzIHNvb24gYXMgd2UgaGl0IGEgbWFya2VyLiBXZSBvbmx5IGNhcmUgYWJvdXQgdGhlIHJlZ3VsYXIgYXR0cmlidXRlcy4gRXZlcnl0aGluZ1xuICAgICAgICAvLyBlbHNlIHdpbGwgYmUgaGFuZGxlZCBiZWxvdyB3aGVuIHdlIHJlYWQgdGhlIGZpbmFsIGF0dHJpYnV0ZXMgb2ZmIHRoZSBET00uXG4gICAgICAgIGlmICh0eXBlb2YgYXR0ck5hbWUgIT09ICdzdHJpbmcnKSBicmVhaztcblxuICAgICAgICBjb25zdCBhdHRyVmFsdWUgPSB0Tm9kZUF0dHJzW2kgKyAxXTtcbiAgICAgICAgYXR0cmlidXRlc1thdHRyTmFtZV0gPSBhdHRyVmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICBsb3dlcmNhc2VUTm9kZUF0dHJzLnB1c2goYXR0ck5hbWUudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgaSArPSAyO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVBdHRycyA9IGVsZW1lbnQuYXR0cmlidXRlcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVBdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYXR0ciA9IGVBdHRyc1tpXTtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGF0IHdlIGRvbid0IGFzc2lnbiB0aGUgc2FtZSBhdHRyaWJ1dGUgYm90aCBpbiBpdHNcbiAgICAgIC8vIGNhc2Utc2Vuc2l0aXZlIGZvcm0gYW5kIHRoZSBsb3dlci1jYXNlZCBvbmUgZnJvbSB0aGUgYnJvd3Nlci5cbiAgICAgIGlmIChsb3dlcmNhc2VUTm9kZUF0dHJzLmluZGV4T2YoYXR0ci5uYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgYXR0cmlidXRlc1thdHRyLm5hbWVdID0gYXR0ci52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgfVxuXG4gIGdldCBzdHlsZXMoKToge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGw7fSB7XG4gICAgcmV0dXJuIF9nZXRTdHlsaW5nRGVidWdJbmZvKHRoaXMubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0IGNsYXNzZXMoKToge1trZXk6IHN0cmluZ106IGJvb2xlYW47fSB7XG4gICAgcmV0dXJuIF9nZXRTdHlsaW5nRGVidWdJbmZvKHRoaXMubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XG4gIH1cblxuICBnZXQgY2hpbGROb2RlcygpOiBEZWJ1Z05vZGVbXSB7XG4gICAgY29uc3QgY2hpbGROb2RlcyA9IHRoaXMubmF0aXZlTm9kZS5jaGlsZE5vZGVzO1xuICAgIGNvbnN0IGNoaWxkcmVuOiBEZWJ1Z05vZGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNoaWxkTm9kZXNbaV07XG4gICAgICBjaGlsZHJlbi5wdXNoKGdldERlYnVnTm9kZV9fUE9TVF9SM19fKGVsZW1lbnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgZ2V0IGNoaWxkcmVuKCk6IERlYnVnRWxlbWVudFtdIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5uYXRpdmVFbGVtZW50O1xuICAgIGlmICghbmF0aXZlRWxlbWVudCkgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBuYXRpdmVFbGVtZW50LmNoaWxkcmVuO1xuICAgIGNvbnN0IGNoaWxkcmVuOiBEZWJ1Z0VsZW1lbnRbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNoaWxkTm9kZXNbaV07XG4gICAgICBjaGlsZHJlbi5wdXNoKGdldERlYnVnTm9kZV9fUE9TVF9SM19fKGVsZW1lbnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgcXVlcnkocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudCB7XG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMucXVlcnlBbGwocHJlZGljYXRlKTtcbiAgICByZXR1cm4gcmVzdWx0c1swXSB8fCBudWxsO1xuICB9XG5cbiAgcXVlcnlBbGwocHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50Pik6IERlYnVnRWxlbWVudFtdIHtcbiAgICBjb25zdCBtYXRjaGVzOiBEZWJ1Z0VsZW1lbnRbXSA9IFtdO1xuICAgIF9xdWVyeUFsbFIzKHRoaXMsIHByZWRpY2F0ZSwgbWF0Y2hlcywgdHJ1ZSk7XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBxdWVyeUFsbE5vZGVzKHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnTm9kZT4pOiBEZWJ1Z05vZGVbXSB7XG4gICAgY29uc3QgbWF0Y2hlczogRGVidWdOb2RlW10gPSBbXTtcbiAgICBfcXVlcnlBbGxSMyh0aGlzLCBwcmVkaWNhdGUsIG1hdGNoZXMsIGZhbHNlKTtcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIHRyaWdnZXJFdmVudEhhbmRsZXIoZXZlbnROYW1lOiBzdHJpbmcsIGV2ZW50T2JqOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5uYXRpdmVOb2RlIGFzIGFueTtcbiAgICBjb25zdCBpbnZva2VkTGlzdGVuZXJzOiBGdW5jdGlvbltdID0gW107XG5cbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgIGlmIChsaXN0ZW5lci5uYW1lID09PSBldmVudE5hbWUpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBsaXN0ZW5lci5jYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2soZXZlbnRPYmopO1xuICAgICAgICBpbnZva2VkTGlzdGVuZXJzLnB1c2goY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gV2UgbmVlZCB0byBjaGVjayB3aGV0aGVyIGBldmVudExpc3RlbmVyc2AgZXhpc3RzLCBiZWNhdXNlIGl0J3Mgc29tZXRoaW5nXG4gICAgLy8gdGhhdCBab25lLmpzIG9ubHkgYWRkcyB0byBgRXZlbnRUYXJnZXRgIGluIGJyb3dzZXIgZW52aXJvbm1lbnRzLlxuICAgIGlmICh0eXBlb2Ygbm9kZS5ldmVudExpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gTm90ZSB0aGF0IGluIEl2eSB3ZSB3cmFwIGV2ZW50IGxpc3RlbmVycyB3aXRoIGEgY2FsbCB0byBgZXZlbnQucHJldmVudERlZmF1bHRgIGluIHNvbWVcbiAgICAgIC8vIGNhc2VzLiBXZSB1c2UgYEZ1bmN0aW9uYCBhcyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBnaXZlcyB1cyBhY2Nlc3MgdG8gdGhlIGFjdHVhbCBldmVudFxuICAgICAgLy8gbGlzdGVuZXIuXG4gICAgICBub2RlLmV2ZW50TGlzdGVuZXJzKGV2ZW50TmFtZSkuZm9yRWFjaCgobGlzdGVuZXI6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHVud3JhcHBlZExpc3RlbmVyID0gbGlzdGVuZXIoRnVuY3Rpb24pO1xuICAgICAgICByZXR1cm4gaW52b2tlZExpc3RlbmVycy5pbmRleE9mKHVud3JhcHBlZExpc3RlbmVyKSA9PT0gLTEgJiYgdW53cmFwcGVkTGlzdGVuZXIoZXZlbnRPYmopO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRTdHlsaW5nRGVidWdJbmZvKGVsZW1lbnQ6IGFueSwgaXNDbGFzc0Jhc2VkOiBib29sZWFuKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBsb2FkTENvbnRleHQoZWxlbWVudCwgZmFsc2UpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCBsVmlldyA9IGNvbnRleHQubFZpZXc7XG4gIGNvbnN0IHREYXRhID0gbFZpZXdbVFZJRVddLmRhdGE7XG4gIGNvbnN0IHROb2RlID0gdERhdGFbY29udGV4dC5ub2RlSW5kZXhdIGFzIFROb2RlO1xuICBpZiAoaXNDbGFzc0Jhc2VkKSB7XG4gICAgcmV0dXJuIGlzU3R5bGluZ0NvbnRleHQodE5vZGUuY2xhc3NlcykgP1xuICAgICAgICBuZXcgTm9kZVN0eWxpbmdEZWJ1Zyh0Tm9kZS5jbGFzc2VzIGFzIFRTdHlsaW5nQ29udGV4dCwgbFZpZXcsIHRydWUpLnZhbHVlcyA6XG4gICAgICAgIHN0eWxpbmdNYXBUb1N0cmluZ01hcCh0Tm9kZS5jbGFzc2VzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaXNTdHlsaW5nQ29udGV4dCh0Tm9kZS5zdHlsZXMpID9cbiAgICAgICAgbmV3IE5vZGVTdHlsaW5nRGVidWcodE5vZGUuc3R5bGVzIGFzIFRTdHlsaW5nQ29udGV4dCwgbFZpZXcsIGZhbHNlKS52YWx1ZXMgOlxuICAgICAgICBzdHlsaW5nTWFwVG9TdHJpbmdNYXAodE5vZGUuc3R5bGVzKTtcbiAgfVxufVxuXG4vKipcbiAqIFdhbGsgdGhlIFROb2RlIHRyZWUgdG8gZmluZCBtYXRjaGVzIGZvciB0aGUgcHJlZGljYXRlLlxuICpcbiAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IHRoZSBlbGVtZW50IGZyb20gd2hpY2ggdGhlIHdhbGsgaXMgc3RhcnRlZFxuICogQHBhcmFtIHByZWRpY2F0ZSB0aGUgcHJlZGljYXRlIHRvIG1hdGNoXG4gKiBAcGFyYW0gbWF0Y2hlcyB0aGUgbGlzdCBvZiBwb3NpdGl2ZSBtYXRjaGVzXG4gKiBAcGFyYW0gZWxlbWVudHNPbmx5IHdoZXRoZXIgb25seSBlbGVtZW50cyBzaG91bGQgYmUgc2VhcmNoZWRcbiAqL1xuZnVuY3Rpb24gX3F1ZXJ5QWxsUjMoXG4gICAgcGFyZW50RWxlbWVudDogRGVidWdFbGVtZW50LCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+LCBtYXRjaGVzOiBEZWJ1Z0VsZW1lbnRbXSxcbiAgICBlbGVtZW50c09ubHk6IHRydWUpOiB2b2lkO1xuZnVuY3Rpb24gX3F1ZXJ5QWxsUjMoXG4gICAgcGFyZW50RWxlbWVudDogRGVidWdFbGVtZW50LCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z05vZGU+LCBtYXRjaGVzOiBEZWJ1Z05vZGVbXSxcbiAgICBlbGVtZW50c09ubHk6IGZhbHNlKTogdm9pZDtcbmZ1bmN0aW9uIF9xdWVyeUFsbFIzKFxuICAgIHBhcmVudEVsZW1lbnQ6IERlYnVnRWxlbWVudCwgcHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PnwgUHJlZGljYXRlPERlYnVnTm9kZT4sXG4gICAgbWF0Y2hlczogRGVidWdFbGVtZW50W10gfCBEZWJ1Z05vZGVbXSwgZWxlbWVudHNPbmx5OiBib29sZWFuKSB7XG4gIGNvbnN0IGNvbnRleHQgPSBsb2FkTENvbnRleHQocGFyZW50RWxlbWVudC5uYXRpdmVOb2RlKSAhO1xuICBjb25zdCBwYXJlbnRUTm9kZSA9IGNvbnRleHQubFZpZXdbVFZJRVddLmRhdGFbY29udGV4dC5ub2RlSW5kZXhdIGFzIFROb2RlO1xuICBfcXVlcnlOb2RlQ2hpbGRyZW5SMyhcbiAgICAgIHBhcmVudFROb2RlLCBjb250ZXh0LmxWaWV3LCBwcmVkaWNhdGUsIG1hdGNoZXMsIGVsZW1lbnRzT25seSwgcGFyZW50RWxlbWVudC5uYXRpdmVOb2RlKTtcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBtYXRjaCB0aGUgY3VycmVudCBUTm9kZSBhZ2FpbnN0IHRoZSBwcmVkaWNhdGUsIGFuZCBnb2VzIG9uIHdpdGggdGhlIG5leHQgb25lcy5cbiAqXG4gKiBAcGFyYW0gdE5vZGUgdGhlIGN1cnJlbnQgVE5vZGVcbiAqIEBwYXJhbSBsVmlldyB0aGUgTFZpZXcgb2YgdGhpcyBUTm9kZVxuICogQHBhcmFtIHByZWRpY2F0ZSB0aGUgcHJlZGljYXRlIHRvIG1hdGNoXG4gKiBAcGFyYW0gbWF0Y2hlcyB0aGUgbGlzdCBvZiBwb3NpdGl2ZSBtYXRjaGVzXG4gKiBAcGFyYW0gZWxlbWVudHNPbmx5IHdoZXRoZXIgb25seSBlbGVtZW50cyBzaG91bGQgYmUgc2VhcmNoZWRcbiAqIEBwYXJhbSByb290TmF0aXZlTm9kZSB0aGUgcm9vdCBuYXRpdmUgbm9kZSBvbiB3aGljaCBwcmVkaWNhdGUgc2hvdWxkIG5vdCBiZSBtYXRjaGVkXG4gKi9cbmZ1bmN0aW9uIF9xdWVyeU5vZGVDaGlsZHJlblIzKFxuICAgIHROb2RlOiBUTm9kZSwgbFZpZXc6IExWaWV3LCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+fCBQcmVkaWNhdGU8RGVidWdOb2RlPixcbiAgICBtYXRjaGVzOiBEZWJ1Z0VsZW1lbnRbXSB8IERlYnVnTm9kZVtdLCBlbGVtZW50c09ubHk6IGJvb2xlYW4sIHJvb3ROYXRpdmVOb2RlOiBhbnkpIHtcbiAgY29uc3QgbmF0aXZlTm9kZSA9IGdldE5hdGl2ZUJ5VE5vZGVPck51bGwodE5vZGUsIGxWaWV3KTtcbiAgLy8gRm9yIGVhY2ggdHlwZSBvZiBUTm9kZSwgc3BlY2lmaWMgbG9naWMgaXMgZXhlY3V0ZWQuXG4gIGlmICh0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuRWxlbWVudCB8fCB0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuRWxlbWVudENvbnRhaW5lcikge1xuICAgIC8vIENhc2UgMTogdGhlIFROb2RlIGlzIGFuIGVsZW1lbnRcbiAgICAvLyBUaGUgbmF0aXZlIG5vZGUgaGFzIHRvIGJlIGNoZWNrZWQuXG4gICAgX2FkZFF1ZXJ5TWF0Y2hSMyhuYXRpdmVOb2RlLCBwcmVkaWNhdGUsIG1hdGNoZXMsIGVsZW1lbnRzT25seSwgcm9vdE5hdGl2ZU5vZGUpO1xuICAgIGlmIChpc0NvbXBvbmVudCh0Tm9kZSkpIHtcbiAgICAgIC8vIElmIHRoZSBlbGVtZW50IGlzIHRoZSBob3N0IG9mIGEgY29tcG9uZW50LCB0aGVuIGFsbCBub2RlcyBpbiBpdHMgdmlldyBoYXZlIHRvIGJlIHByb2Nlc3NlZC5cbiAgICAgIC8vIE5vdGU6IHRoZSBjb21wb25lbnQncyBjb250ZW50ICh0Tm9kZS5jaGlsZCkgd2lsbCBiZSBwcm9jZXNzZWQgZnJvbSB0aGUgaW5zZXJ0aW9uIHBvaW50cy5cbiAgICAgIGNvbnN0IGNvbXBvbmVudFZpZXcgPSBnZXRDb21wb25lbnRWaWV3QnlJbmRleCh0Tm9kZS5pbmRleCwgbFZpZXcpO1xuICAgICAgaWYgKGNvbXBvbmVudFZpZXcgJiYgY29tcG9uZW50Vmlld1tUVklFV10uZmlyc3RDaGlsZCkge1xuICAgICAgICBfcXVlcnlOb2RlQ2hpbGRyZW5SMyhcbiAgICAgICAgICAgIGNvbXBvbmVudFZpZXdbVFZJRVddLmZpcnN0Q2hpbGQgISwgY29tcG9uZW50VmlldywgcHJlZGljYXRlLCBtYXRjaGVzLCBlbGVtZW50c09ubHksXG4gICAgICAgICAgICByb290TmF0aXZlTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0Tm9kZS5jaGlsZCkge1xuICAgICAgICAvLyBPdGhlcndpc2UsIGl0cyBjaGlsZHJlbiBoYXZlIHRvIGJlIHByb2Nlc3NlZC5cbiAgICAgICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuUjModE5vZGUuY2hpbGQsIGxWaWV3LCBwcmVkaWNhdGUsIG1hdGNoZXMsIGVsZW1lbnRzT25seSwgcm9vdE5hdGl2ZU5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBhbHNvIGhhdmUgdG8gcXVlcnkgdGhlIERPTSBkaXJlY3RseSBpbiBvcmRlciB0byBjYXRjaCBlbGVtZW50cyBpbnNlcnRlZCB0aHJvdWdoXG4gICAgICAvLyBSZW5kZXJlcjIuIE5vdGUgdGhhdCB0aGlzIGlzIF9fbm90X18gb3B0aW1hbCwgYmVjYXVzZSB3ZSdyZSB3YWxraW5nIHNpbWlsYXIgdHJlZXMgbXVsdGlwbGVcbiAgICAgIC8vIHRpbWVzLiBWaWV3RW5naW5lIGNvdWxkIGRvIGl0IG1vcmUgZWZmaWNpZW50bHksIGJlY2F1c2UgYWxsIHRoZSBpbnNlcnRpb25zIGdvIHRocm91Z2hcbiAgICAgIC8vIFJlbmRlcmVyMiwgaG93ZXZlciB0aGF0J3Mgbm90IHRoZSBjYXNlIGluIEl2eS4gVGhpcyBhcHByb2FjaCBpcyBiZWluZyB1c2VkIGJlY2F1c2U6XG4gICAgICAvLyAxLiBNYXRjaGluZyB0aGUgVmlld0VuZ2luZSBiZWhhdmlvciB3b3VsZCBtZWFuIHBvdGVudGlhbGx5IGludHJvZHVjaW5nIGEgZGVwZWRlbmN5XG4gICAgICAvLyAgICBmcm9tIGBSZW5kZXJlcjJgIHRvIEl2eSB3aGljaCBjb3VsZCBicmluZyBJdnkgY29kZSBpbnRvIFZpZXdFbmdpbmUuXG4gICAgICAvLyAyLiBXZSB3b3VsZCBoYXZlIHRvIG1ha2UgYFJlbmRlcmVyM2AgXCJrbm93XCIgYWJvdXQgZGVidWcgbm9kZXMuXG4gICAgICAvLyAzLiBJdCBhbGxvd3MgdXMgdG8gY2FwdHVyZSBub2RlcyB0aGF0IHdlcmUgaW5zZXJ0ZWQgZGlyZWN0bHkgdmlhIHRoZSBET00uXG4gICAgICBuYXRpdmVOb2RlICYmIF9xdWVyeU5hdGl2ZU5vZGVEZXNjZW5kYW50cyhuYXRpdmVOb2RlLCBwcmVkaWNhdGUsIG1hdGNoZXMsIGVsZW1lbnRzT25seSk7XG4gICAgfVxuICAgIC8vIEluIGFsbCBjYXNlcywgaWYgYSBkeW5hbWljIGNvbnRhaW5lciBleGlzdHMgZm9yIHRoaXMgbm9kZSwgZWFjaCB2aWV3IGluc2lkZSBpdCBoYXMgdG8gYmVcbiAgICAvLyBwcm9jZXNzZWQuXG4gICAgY29uc3Qgbm9kZU9yQ29udGFpbmVyID0gbFZpZXdbdE5vZGUuaW5kZXhdO1xuICAgIGlmIChpc0xDb250YWluZXIobm9kZU9yQ29udGFpbmVyKSkge1xuICAgICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuSW5Db250YWluZXJSMyhcbiAgICAgICAgICBub2RlT3JDb250YWluZXIsIHByZWRpY2F0ZSwgbWF0Y2hlcywgZWxlbWVudHNPbmx5LCByb290TmF0aXZlTm9kZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5Db250YWluZXIpIHtcbiAgICAvLyBDYXNlIDI6IHRoZSBUTm9kZSBpcyBhIGNvbnRhaW5lclxuICAgIC8vIFRoZSBuYXRpdmUgbm9kZSBoYXMgdG8gYmUgY2hlY2tlZC5cbiAgICBjb25zdCBsQ29udGFpbmVyID0gbFZpZXdbdE5vZGUuaW5kZXhdO1xuICAgIF9hZGRRdWVyeU1hdGNoUjMobENvbnRhaW5lcltOQVRJVkVdLCBwcmVkaWNhdGUsIG1hdGNoZXMsIGVsZW1lbnRzT25seSwgcm9vdE5hdGl2ZU5vZGUpO1xuICAgIC8vIEVhY2ggdmlldyBpbnNpZGUgdGhlIGNvbnRhaW5lciBoYXMgdG8gYmUgcHJvY2Vzc2VkLlxuICAgIF9xdWVyeU5vZGVDaGlsZHJlbkluQ29udGFpbmVyUjMobENvbnRhaW5lciwgcHJlZGljYXRlLCBtYXRjaGVzLCBlbGVtZW50c09ubHksIHJvb3ROYXRpdmVOb2RlKTtcbiAgfSBlbHNlIGlmICh0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuUHJvamVjdGlvbikge1xuICAgIC8vIENhc2UgMzogdGhlIFROb2RlIGlzIGEgcHJvamVjdGlvbiBpbnNlcnRpb24gcG9pbnQgKGkuZS4gYSA8bmctY29udGVudD4pLlxuICAgIC8vIFRoZSBub2RlcyBwcm9qZWN0ZWQgYXQgdGhpcyBsb2NhdGlvbiBhbGwgbmVlZCB0byBiZSBwcm9jZXNzZWQuXG4gICAgY29uc3QgY29tcG9uZW50VmlldyA9IGZpbmRDb21wb25lbnRWaWV3KGxWaWV3ICEpO1xuICAgIGNvbnN0IGNvbXBvbmVudEhvc3QgPSBjb21wb25lbnRWaWV3W1RfSE9TVF0gYXMgVEVsZW1lbnROb2RlO1xuICAgIGNvbnN0IGhlYWQ6IFROb2RlfG51bGwgPVxuICAgICAgICAoY29tcG9uZW50SG9zdC5wcm9qZWN0aW9uIGFzKFROb2RlIHwgbnVsbClbXSlbdE5vZGUucHJvamVjdGlvbiBhcyBudW1iZXJdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZCkpIHtcbiAgICAgIGZvciAobGV0IG5hdGl2ZU5vZGUgb2YgaGVhZCkge1xuICAgICAgICBfYWRkUXVlcnlNYXRjaFIzKG5hdGl2ZU5vZGUsIHByZWRpY2F0ZSwgbWF0Y2hlcywgZWxlbWVudHNPbmx5LCByb290TmF0aXZlTm9kZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoZWFkKSB7XG4gICAgICBjb25zdCBuZXh0TFZpZXcgPSBjb21wb25lbnRWaWV3W1BBUkVOVF0gIWFzIExWaWV3O1xuICAgICAgY29uc3QgbmV4dFROb2RlID0gbmV4dExWaWV3W1RWSUVXXS5kYXRhW2hlYWQuaW5kZXhdIGFzIFROb2RlO1xuICAgICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuUjMobmV4dFROb2RlLCBuZXh0TFZpZXcsIHByZWRpY2F0ZSwgbWF0Y2hlcywgZWxlbWVudHNPbmx5LCByb290TmF0aXZlTm9kZSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHROb2RlLmNoaWxkKSB7XG4gICAgLy8gQ2FzZSA0OiB0aGUgVE5vZGUgaXMgYSB2aWV3LlxuICAgIF9xdWVyeU5vZGVDaGlsZHJlblIzKHROb2RlLmNoaWxkLCBsVmlldywgcHJlZGljYXRlLCBtYXRjaGVzLCBlbGVtZW50c09ubHksIHJvb3ROYXRpdmVOb2RlKTtcbiAgfVxuXG4gIC8vIFdlIGRvbid0IHdhbnQgdG8gZ28gdG8gdGhlIG5leHQgc2libGluZyBvZiB0aGUgcm9vdCBub2RlLlxuICBpZiAocm9vdE5hdGl2ZU5vZGUgIT09IG5hdGl2ZU5vZGUpIHtcbiAgICAvLyBUbyBkZXRlcm1pbmUgdGhlIG5leHQgbm9kZSB0byBiZSBwcm9jZXNzZWQsIHdlIG5lZWQgdG8gdXNlIHRoZSBuZXh0IG9yIHRoZSBwcm9qZWN0aW9uTmV4dFxuICAgIC8vIGxpbmssIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBjdXJyZW50IG5vZGUgaGFzIGJlZW4gcHJvamVjdGVkLlxuICAgIGNvbnN0IG5leHRUTm9kZSA9ICh0Tm9kZS5mbGFncyAmIFROb2RlRmxhZ3MuaXNQcm9qZWN0ZWQpID8gdE5vZGUucHJvamVjdGlvbk5leHQgOiB0Tm9kZS5uZXh0O1xuICAgIGlmIChuZXh0VE5vZGUpIHtcbiAgICAgIF9xdWVyeU5vZGVDaGlsZHJlblIzKG5leHRUTm9kZSwgbFZpZXcsIHByZWRpY2F0ZSwgbWF0Y2hlcywgZWxlbWVudHNPbmx5LCByb290TmF0aXZlTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUHJvY2VzcyBhbGwgVE5vZGVzIGluIGEgZ2l2ZW4gY29udGFpbmVyLlxuICpcbiAqIEBwYXJhbSBsQ29udGFpbmVyIHRoZSBjb250YWluZXIgdG8gYmUgcHJvY2Vzc2VkXG4gKiBAcGFyYW0gcHJlZGljYXRlIHRoZSBwcmVkaWNhdGUgdG8gbWF0Y2hcbiAqIEBwYXJhbSBtYXRjaGVzIHRoZSBsaXN0IG9mIHBvc2l0aXZlIG1hdGNoZXNcbiAqIEBwYXJhbSBlbGVtZW50c09ubHkgd2hldGhlciBvbmx5IGVsZW1lbnRzIHNob3VsZCBiZSBzZWFyY2hlZFxuICogQHBhcmFtIHJvb3ROYXRpdmVOb2RlIHRoZSByb290IG5hdGl2ZSBub2RlIG9uIHdoaWNoIHByZWRpY2F0ZSBzaG91bGQgbm90IGJlIG1hdGNoZWRcbiAqL1xuZnVuY3Rpb24gX3F1ZXJ5Tm9kZUNoaWxkcmVuSW5Db250YWluZXJSMyhcbiAgICBsQ29udGFpbmVyOiBMQ29udGFpbmVyLCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxEZWJ1Z0VsZW1lbnQ+fCBQcmVkaWNhdGU8RGVidWdOb2RlPixcbiAgICBtYXRjaGVzOiBEZWJ1Z0VsZW1lbnRbXSB8IERlYnVnTm9kZVtdLCBlbGVtZW50c09ubHk6IGJvb2xlYW4sIHJvb3ROYXRpdmVOb2RlOiBhbnkpIHtcbiAgZm9yIChsZXQgaSA9IENPTlRBSU5FUl9IRUFERVJfT0ZGU0VUOyBpIDwgbENvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkVmlldyA9IGxDb250YWluZXJbaV07XG4gICAgX3F1ZXJ5Tm9kZUNoaWxkcmVuUjMoXG4gICAgICAgIGNoaWxkVmlld1tUVklFV10ubm9kZSAhLCBjaGlsZFZpZXcsIHByZWRpY2F0ZSwgbWF0Y2hlcywgZWxlbWVudHNPbmx5LCByb290TmF0aXZlTm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXRjaCB0aGUgY3VycmVudCBuYXRpdmUgbm9kZSBhZ2FpbnN0IHRoZSBwcmVkaWNhdGUuXG4gKlxuICogQHBhcmFtIG5hdGl2ZU5vZGUgdGhlIGN1cnJlbnQgbmF0aXZlIG5vZGVcbiAqIEBwYXJhbSBwcmVkaWNhdGUgdGhlIHByZWRpY2F0ZSB0byBtYXRjaFxuICogQHBhcmFtIG1hdGNoZXMgdGhlIGxpc3Qgb2YgcG9zaXRpdmUgbWF0Y2hlc1xuICogQHBhcmFtIGVsZW1lbnRzT25seSB3aGV0aGVyIG9ubHkgZWxlbWVudHMgc2hvdWxkIGJlIHNlYXJjaGVkXG4gKiBAcGFyYW0gcm9vdE5hdGl2ZU5vZGUgdGhlIHJvb3QgbmF0aXZlIG5vZGUgb24gd2hpY2ggcHJlZGljYXRlIHNob3VsZCBub3QgYmUgbWF0Y2hlZFxuICovXG5mdW5jdGlvbiBfYWRkUXVlcnlNYXRjaFIzKFxuICAgIG5hdGl2ZU5vZGU6IGFueSwgcHJlZGljYXRlOiBQcmVkaWNhdGU8RGVidWdFbGVtZW50PnwgUHJlZGljYXRlPERlYnVnTm9kZT4sXG4gICAgbWF0Y2hlczogRGVidWdFbGVtZW50W10gfCBEZWJ1Z05vZGVbXSwgZWxlbWVudHNPbmx5OiBib29sZWFuLCByb290TmF0aXZlTm9kZTogYW55KSB7XG4gIGlmIChyb290TmF0aXZlTm9kZSAhPT0gbmF0aXZlTm9kZSkge1xuICAgIGNvbnN0IGRlYnVnTm9kZSA9IGdldERlYnVnTm9kZShuYXRpdmVOb2RlKTtcbiAgICBpZiAoIWRlYnVnTm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUeXBlIG9mIHRoZSBcInByZWRpY2F0ZSBhbmQgXCJtYXRjaGVzXCIgYXJyYXkgYXJlIHNldCBiYXNlZCBvbiB0aGUgdmFsdWUgb2ZcbiAgICAvLyB0aGUgXCJlbGVtZW50c09ubHlcIiBwYXJhbWV0ZXIuIFR5cGVTY3JpcHQgaXMgbm90IGFibGUgdG8gcHJvcGVybHkgaW5mZXIgdGhlc2VcbiAgICAvLyB0eXBlcyB3aXRoIGdlbmVyaWNzLCBzbyB3ZSBtYW51YWxseSBjYXN0IHRoZSBwYXJhbWV0ZXJzIGFjY29yZGluZ2x5LlxuICAgIGlmIChlbGVtZW50c09ubHkgJiYgZGVidWdOb2RlIGluc3RhbmNlb2YgRGVidWdFbGVtZW50X19QT1NUX1IzX18gJiYgcHJlZGljYXRlKGRlYnVnTm9kZSkgJiZcbiAgICAgICAgbWF0Y2hlcy5pbmRleE9mKGRlYnVnTm9kZSkgPT09IC0xKSB7XG4gICAgICBtYXRjaGVzLnB1c2goZGVidWdOb2RlKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICAhZWxlbWVudHNPbmx5ICYmIChwcmVkaWNhdGUgYXMgUHJlZGljYXRlPERlYnVnTm9kZT4pKGRlYnVnTm9kZSkgJiZcbiAgICAgICAgKG1hdGNoZXMgYXMgRGVidWdOb2RlW10pLmluZGV4T2YoZGVidWdOb2RlKSA9PT0gLTEpIHtcbiAgICAgIChtYXRjaGVzIGFzIERlYnVnTm9kZVtdKS5wdXNoKGRlYnVnTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWF0Y2ggYWxsIHRoZSBkZXNjZW5kYW50cyBvZiBhIERPTSBub2RlIGFnYWluc3QgYSBwcmVkaWNhdGUuXG4gKlxuICogQHBhcmFtIG5hdGl2ZU5vZGUgdGhlIGN1cnJlbnQgbmF0aXZlIG5vZGVcbiAqIEBwYXJhbSBwcmVkaWNhdGUgdGhlIHByZWRpY2F0ZSB0byBtYXRjaFxuICogQHBhcmFtIG1hdGNoZXMgdGhlIGxpc3Qgb2YgcG9zaXRpdmUgbWF0Y2hlc1xuICogQHBhcmFtIGVsZW1lbnRzT25seSB3aGV0aGVyIG9ubHkgZWxlbWVudHMgc2hvdWxkIGJlIHNlYXJjaGVkXG4gKi9cbmZ1bmN0aW9uIF9xdWVyeU5hdGl2ZU5vZGVEZXNjZW5kYW50cyhcbiAgICBwYXJlbnROb2RlOiBhbnksIHByZWRpY2F0ZTogUHJlZGljYXRlPERlYnVnRWxlbWVudD58IFByZWRpY2F0ZTxEZWJ1Z05vZGU+LFxuICAgIG1hdGNoZXM6IERlYnVnRWxlbWVudFtdIHwgRGVidWdOb2RlW10sIGVsZW1lbnRzT25seTogYm9vbGVhbikge1xuICBjb25zdCBub2RlcyA9IHBhcmVudE5vZGUuY2hpbGROb2RlcztcbiAgY29uc3QgbGVuZ3RoID0gbm9kZXMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgY29uc3QgZGVidWdOb2RlID0gZ2V0RGVidWdOb2RlKG5vZGUpO1xuXG4gICAgaWYgKGRlYnVnTm9kZSkge1xuICAgICAgaWYgKGVsZW1lbnRzT25seSAmJiBkZWJ1Z05vZGUgaW5zdGFuY2VvZiBEZWJ1Z0VsZW1lbnRfX1BPU1RfUjNfXyAmJiBwcmVkaWNhdGUoZGVidWdOb2RlKSAmJlxuICAgICAgICAgIG1hdGNoZXMuaW5kZXhPZihkZWJ1Z05vZGUpID09PSAtMSkge1xuICAgICAgICBtYXRjaGVzLnB1c2goZGVidWdOb2RlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgIWVsZW1lbnRzT25seSAmJiAocHJlZGljYXRlIGFzIFByZWRpY2F0ZTxEZWJ1Z05vZGU+KShkZWJ1Z05vZGUpICYmXG4gICAgICAgICAgKG1hdGNoZXMgYXMgRGVidWdOb2RlW10pLmluZGV4T2YoZGVidWdOb2RlKSA9PT0gLTEpIHtcbiAgICAgICAgKG1hdGNoZXMgYXMgRGVidWdOb2RlW10pLnB1c2goZGVidWdOb2RlKTtcbiAgICAgIH1cblxuICAgICAgX3F1ZXJ5TmF0aXZlTm9kZURlc2NlbmRhbnRzKG5vZGUsIHByZWRpY2F0ZSwgbWF0Y2hlcywgZWxlbWVudHNPbmx5KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIHRoZSBwcm9wZXJ0eSBiaW5kaW5ncyBmb3IgYSBnaXZlbiBub2RlIGFuZCBnZW5lcmF0ZXNcbiAqIGEgbWFwIG9mIHByb3BlcnR5IG5hbWVzIHRvIHZhbHVlcy4gVGhpcyBtYXAgb25seSBjb250YWlucyBwcm9wZXJ0eSBiaW5kaW5nc1xuICogZGVmaW5lZCBpbiB0ZW1wbGF0ZXMsIG5vdCBpbiBob3N0IGJpbmRpbmdzLlxuICovXG5mdW5jdGlvbiBjb2xsZWN0UHJvcGVydHlCaW5kaW5ncyhcbiAgICB0Tm9kZTogVE5vZGUsIGxWaWV3OiBMVmlldywgdERhdGE6IFREYXRhKToge1trZXk6IHN0cmluZ106IHN0cmluZ30ge1xuICBjb25zdCBwcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBsZXQgYmluZGluZ0luZGV4ZXMgPSB0Tm9kZS5wcm9wZXJ0eUJpbmRpbmdzO1xuXG4gIGlmIChiaW5kaW5nSW5kZXhlcyAhPT0gbnVsbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmluZGluZ0luZGV4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGJpbmRpbmdJbmRleCA9IGJpbmRpbmdJbmRleGVzW2ldO1xuICAgICAgY29uc3QgcHJvcE1ldGFkYXRhID0gdERhdGFbYmluZGluZ0luZGV4XSBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBtZXRhZGF0YVBhcnRzID0gcHJvcE1ldGFkYXRhLnNwbGl0KElOVEVSUE9MQVRJT05fREVMSU1JVEVSKTtcbiAgICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IG1ldGFkYXRhUGFydHNbMF07XG4gICAgICBpZiAobWV0YWRhdGFQYXJ0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG1ldGFkYXRhUGFydHNbMV07XG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgbWV0YWRhdGFQYXJ0cy5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgICAgICB2YWx1ZSArPSByZW5kZXJTdHJpbmdpZnkobFZpZXdbYmluZGluZ0luZGV4ICsgaiAtIDFdKSArIG1ldGFkYXRhUGFydHNbaiArIDFdO1xuICAgICAgICB9XG4gICAgICAgIHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdID0gbFZpZXdbYmluZGluZ0luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuXG5mdW5jdGlvbiBjb2xsZWN0Q2xhc3NOYW1lcyhkZWJ1Z0VsZW1lbnQ6IERlYnVnRWxlbWVudF9fUE9TVF9SM19fKTogc3RyaW5nIHtcbiAgY29uc3QgY2xhc3NlcyA9IGRlYnVnRWxlbWVudC5jbGFzc2VzO1xuICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgZm9yIChjb25zdCBjbGFzc05hbWUgb2YgT2JqZWN0LmtleXMoY2xhc3NlcykpIHtcbiAgICBpZiAoY2xhc3Nlc1tjbGFzc05hbWVdKSB7XG4gICAgICBvdXRwdXQgPSBvdXRwdXQgPyBvdXRwdXQgKyBgICR7Y2xhc3NOYW1lfWAgOiBjbGFzc05hbWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG4vLyBOZWVkIHRvIGtlZXAgdGhlIG5vZGVzIGluIGEgZ2xvYmFsIE1hcCBzbyB0aGF0IG11bHRpcGxlIGFuZ3VsYXIgYXBwcyBhcmUgc3VwcG9ydGVkLlxuY29uc3QgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZSA9IG5ldyBNYXA8YW55LCBEZWJ1Z05vZGU+KCk7XG5cbmZ1bmN0aW9uIGdldERlYnVnTm9kZV9fUFJFX1IzX18obmF0aXZlTm9kZTogYW55KTogRGVidWdOb2RlfG51bGwge1xuICByZXR1cm4gX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5nZXQobmF0aXZlTm9kZSkgfHwgbnVsbDtcbn1cblxuY29uc3QgTkdfREVCVUdfUFJPUEVSVFkgPSAnX19uZ19kZWJ1Z19fJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlYnVnTm9kZV9fUE9TVF9SM19fKG5hdGl2ZU5vZGU6IEVsZW1lbnQpOiBEZWJ1Z0VsZW1lbnRfX1BPU1RfUjNfXztcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWJ1Z05vZGVfX1BPU1RfUjNfXyhuYXRpdmVOb2RlOiBOb2RlKTogRGVidWdOb2RlX19QT1NUX1IzX187XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVidWdOb2RlX19QT1NUX1IzX18obmF0aXZlTm9kZTogbnVsbCk6IG51bGw7XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVidWdOb2RlX19QT1NUX1IzX18obmF0aXZlTm9kZTogYW55KTogRGVidWdOb2RlfG51bGwge1xuICBpZiAobmF0aXZlTm9kZSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICBpZiAoIShuYXRpdmVOb2RlLmhhc093blByb3BlcnR5KE5HX0RFQlVHX1BST1BFUlRZKSkpIHtcbiAgICAgIChuYXRpdmVOb2RlIGFzIGFueSlbTkdfREVCVUdfUFJPUEVSVFldID0gbmF0aXZlTm9kZS5ub2RlVHlwZSA9PSBOb2RlLkVMRU1FTlRfTk9ERSA/XG4gICAgICAgICAgbmV3IERlYnVnRWxlbWVudF9fUE9TVF9SM19fKG5hdGl2ZU5vZGUgYXMgRWxlbWVudCkgOlxuICAgICAgICAgIG5ldyBEZWJ1Z05vZGVfX1BPU1RfUjNfXyhuYXRpdmVOb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIChuYXRpdmVOb2RlIGFzIGFueSlbTkdfREVCVUdfUFJPUEVSVFldO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlYnVnTm9kZTogKG5hdGl2ZU5vZGU6IGFueSkgPT4gRGVidWdOb2RlIHwgbnVsbCA9IGdldERlYnVnTm9kZV9fUFJFX1IzX187XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxEZWJ1Z05vZGVzKCk6IERlYnVnTm9kZVtdIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS52YWx1ZXMoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmRleERlYnVnTm9kZShub2RlOiBEZWJ1Z05vZGUpIHtcbiAgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5zZXQobm9kZS5uYXRpdmVOb2RlLCBub2RlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURlYnVnTm9kZUZyb21JbmRleChub2RlOiBEZWJ1Z05vZGUpIHtcbiAgX25hdGl2ZU5vZGVUb0RlYnVnTm9kZS5kZWxldGUobm9kZS5uYXRpdmVOb2RlKTtcbn1cblxuLyoqXG4gKiBBIGJvb2xlYW4tdmFsdWVkIGZ1bmN0aW9uIG92ZXIgYSB2YWx1ZSwgcG9zc2libHkgaW5jbHVkaW5nIGNvbnRleHQgaW5mb3JtYXRpb25cbiAqIHJlZ2FyZGluZyB0aGF0IHZhbHVlJ3MgcG9zaXRpb24gaW4gYW4gYXJyYXkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByZWRpY2F0ZTxUPiB7ICh2YWx1ZTogVCk6IGJvb2xlYW47IH1cblxuLyoqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBEZWJ1Z05vZGU6IHtuZXcgKC4uLmFyZ3M6IGFueVtdKTogRGVidWdOb2RlfSA9IERlYnVnTm9kZV9fUFJFX1IzX187XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgRGVidWdFbGVtZW50OiB7bmV3ICguLi5hcmdzOiBhbnlbXSk6IERlYnVnRWxlbWVudH0gPSBEZWJ1Z0VsZW1lbnRfX1BSRV9SM19fO1xuIl19