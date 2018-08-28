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
import { InjectionToken } from '../di/injection_token';
/**
 * @deprecated Use `RendererType2` (and `Renderer2`) instead.
 */
export class RenderComponentType {
    /**
     * @param {?} id
     * @param {?} templateUrl
     * @param {?} slotCount
     * @param {?} encapsulation
     * @param {?} styles
     * @param {?} animations
     */
    constructor(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
}
if (false) {
    /** @type {?} */
    RenderComponentType.prototype.id;
    /** @type {?} */
    RenderComponentType.prototype.templateUrl;
    /** @type {?} */
    RenderComponentType.prototype.slotCount;
    /** @type {?} */
    RenderComponentType.prototype.encapsulation;
    /** @type {?} */
    RenderComponentType.prototype.styles;
    /** @type {?} */
    RenderComponentType.prototype.animations;
}
/**
 * @deprecated Debug info is handeled internally in the view engine now.
 * @abstract
 */
export class RenderDebugInfo {
}
if (false) {
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.injector = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.component = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.providerTokens = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.references = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.context = function () { };
    /**
     * @abstract
     * @return {?}
     */
    RenderDebugInfo.prototype.source = function () { };
}
/**
 * @deprecated Use the `Renderer2` instead.
 * @record
 */
export function DirectRenderer() { }
/** @type {?} */
DirectRenderer.prototype.remove;
/** @type {?} */
DirectRenderer.prototype.appendChild;
/** @type {?} */
DirectRenderer.prototype.insertBefore;
/** @type {?} */
DirectRenderer.prototype.nextSibling;
/** @type {?} */
DirectRenderer.prototype.parentElement;
/**
 * @deprecated Use the `Renderer2` instead.
 * @abstract
 */
export class Renderer {
}
if (false) {
    /**
     * @abstract
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} name
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.createElement = function (parentElement, name, debugInfo) { };
    /**
     * @abstract
     * @param {?} hostElement
     * @return {?}
     */
    Renderer.prototype.createViewRoot = function (hostElement) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */
    Renderer.prototype.createText = function (parentElement, value, debugInfo) { };
    /**
     * @abstract
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */
    Renderer.prototype.projectNodes = function (parentElement, nodes) { };
    /**
     * @abstract
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */
    Renderer.prototype.attachViewAfter = function (node, viewRootNodes) { };
    /**
     * @abstract
     * @param {?} viewRootNodes
     * @return {?}
     */
    Renderer.prototype.detachView = function (viewRootNodes) { };
    /**
     * @abstract
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */
    Renderer.prototype.destroyView = function (hostElement, viewAllNodes) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    Renderer.prototype.listen = function (renderElement, name, callback) { };
    /**
     * @abstract
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    Renderer.prototype.listenGlobal = function (target, name, callback) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    Renderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */
    Renderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) { };
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     * @abstract
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */
    Renderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */
    Renderer.prototype.setElementClass = function (renderElement, className, isAdd) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */
    Renderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) { };
    /**
     * @abstract
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?=} args
     * @return {?}
     */
    Renderer.prototype.invokeElementMethod = function (renderElement, methodName, args) { };
    /**
     * @abstract
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */
    Renderer.prototype.setText = function (renderNode, text) { };
    /**
     * @abstract
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    Renderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { };
}
/** @type {?} */
export const Renderer2Interceptor = new InjectionToken('Renderer2Interceptor');
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {\@link Renderer#setElementProperty setElementProperty} or
 * {\@link Renderer#setElementAttribute setElementAttribute} respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 *
 * @deprecated Use `RendererFactory2` instead.
 * @abstract
 */
export class RootRenderer {
}
if (false) {
    /**
     * @abstract
     * @param {?} componentType
     * @return {?}
     */
    RootRenderer.prototype.renderComponent = function (componentType) { };
}
/**
 * Used by `RendererFactory2` to associate custom rendering data and styles
 * with a rendering implementation.
 * \@experimental
 * @record
 */
export function RendererType2() { }
/**
 * A unique identifying string for the new renderer, used when creating
 * unique styles for encapsulation.
 * @type {?}
 */
RendererType2.prototype.id;
/**
 * The view encapsulation type, which determines how styles are applied to
 * DOM elements. One of
 * - `Emulated` (default): Emulate native scoping of styles.
 * - `Native`: Use the native encapsulation mechanism of the renderer.
 * - `ShadowDom`: Use modern [Shadow
 * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
 * create a ShadowRoot for component's host element.
 * - `None`: Do not provide any template or style encapsulation.
 * @type {?}
 */
RendererType2.prototype.encapsulation;
/**
 * Defines CSS styles to be stored on a renderer instance.
 * @type {?}
 */
RendererType2.prototype.styles;
/**
 * Defines arbitrary developer-defined data to be stored on a renderer instance.
 * This is useful for renderers that delegate to other renderers.
 * @type {?}
 */
RendererType2.prototype.data;
/**
 * Creates and initializes a custom renderer that implements the `Renderer2` base class.
 *
 * \@experimental
 * @abstract
 */
export class RendererFactory2 {
}
if (false) {
    /**
     * Creates and initializes a custom renderer for a host DOM element.
     * @abstract
     * @param {?} hostElement The element to render.
     * @param {?} type The base class to implement.
     * @return {?} The new custom renderer instance.
     */
    RendererFactory2.prototype.createRenderer = function (hostElement, type) { };
    /**
     * A callback invoked when rendering has begun.
     * @abstract
     * @return {?}
     */
    RendererFactory2.prototype.begin = function () { };
    /**
     * A callback invoked when rendering has completed.
     * @abstract
     * @return {?}
     */
    RendererFactory2.prototype.end = function () { };
    /**
     * Use with animations test-only mode. Notifies the test when rendering has completed.
     * @abstract
     * @return {?} The asynchronous result of the developer-defined function.
     */
    RendererFactory2.prototype.whenRenderingDone = function () { };
}
/** @enum {number} */
var RendererStyleFlags2 = {
    /**
       * Marks a style as important.
       */
    Important: 1,
    /**
       * Marks a style as using dash case naming (this-is-dash-case).
       */
    DashCase: 2,
};
export { RendererStyleFlags2 };
RendererStyleFlags2[RendererStyleFlags2.Important] = 'Important';
RendererStyleFlags2[RendererStyleFlags2.DashCase] = 'DashCase';
/**
 * Extend this base class to implement custom rendering. By default, Angular
 * renders a template into DOM. You can use custom rendering to intercept
 * rendering calls, or to render to something other than DOM.
 *
 * Create your custom renderer using `RendererFactory2`.
 *
 * Use a custom renderer to bypass Angular's templating and
 * make custom UI changes that can't be expressed declaratively.
 * For example if you need to set a property or an attribute whose name is
 * not statically known, use the `setProperty()` or
 * `setAttribute()` method.
 *
 * \@experimental
 * @abstract
 */
export class Renderer2 {
}
if (false) {
    /**
     * If null or undefined, the view engine won't call it.
     * This is used as a performance optimization for production mode.
     * @type {?}
     */
    Renderer2.prototype.destroyNode;
    /**
     * Use to store arbitrary developer-defined data on a renderer instance,
     * as an object containing key-value pairs.
     * This is useful for renderers that delegate to other renderers.
     * @abstract
     * @return {?}
     */
    Renderer2.prototype.data = function () { };
    /**
     * Implement this callback to destroy the renderer or the host element.
     * @abstract
     * @return {?}
     */
    Renderer2.prototype.destroy = function () { };
    /**
     * Implement this callback to create an instance of the host element.
     * @abstract
     * @param {?} name An identifying name for the new element, unique within the namespace.
     * @param {?=} namespace The namespace for the new element.
     * @return {?} The new element.
     */
    Renderer2.prototype.createElement = function (name, namespace) { };
    /**
     * Implement this callback to add a comment to the DOM of the host element.
     * @abstract
     * @param {?} value The comment text.
     * @return {?} The modified element.
     */
    Renderer2.prototype.createComment = function (value) { };
    /**
     * Implement this callback to add text to the DOM of the host element.
     * @abstract
     * @param {?} value The text string.
     * @return {?} The modified element.
     */
    Renderer2.prototype.createText = function (value) { };
    /**
     * Appends a child to a given parent node in the host element DOM.
     * @abstract
     * @param {?} parent The parent node.
     * @param {?} newChild The new child node.
     * @return {?}
     */
    Renderer2.prototype.appendChild = function (parent, newChild) { };
    /**
     * Implement this callback to insert a child node at a given position in a parent node
     * in the host element DOM.
     * @abstract
     * @param {?} parent The parent node.
     * @param {?} newChild The new child nodes.
     * @param {?} refChild The existing child node that should precede the new node.
     * @return {?}
     */
    Renderer2.prototype.insertBefore = function (parent, newChild, refChild) { };
    /**
     * Implement this callback to remove a child node from the host element's DOM.
     * @abstract
     * @param {?} parent The parent node.
     * @param {?} oldChild The child node to remove.
     * @return {?}
     */
    Renderer2.prototype.removeChild = function (parent, oldChild) { };
    /**
     * Implement this callback to prepare an element to be bootstrapped
     * as a root element, and return the element instance.
     * @abstract
     * @param {?} selectorOrNode The DOM element.
     * @return {?} The root element.
     */
    Renderer2.prototype.selectRootElement = function (selectorOrNode) { };
    /**
     * Implement this callback to get the parent of a given node
     * in the host element's DOM.
     * @abstract
     * @param {?} node The child node to query.
     * @return {?} The parent node, or null if there is no parent.
     * For WebWorkers, always returns true.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    Renderer2.prototype.parentNode = function (node) { };
    /**
     * Implement this callback to get the next sibling node of a given node
     * in the host element's DOM.
     * @abstract
     * @param {?} node
     * @return {?} The sibling node, or null if there is no sibling.
     * For WebWorkers, always returns a value.
     * This is because the check is synchronous,
     * and the caller can't rely on checking for null.
     */
    Renderer2.prototype.nextSibling = function (node) { };
    /**
     * Implement this callback to set an attribute value for an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} name The attribute name.
     * @param {?} value The new value.
     * @param {?=} namespace The namespace.
     * @return {?}
     */
    Renderer2.prototype.setAttribute = function (el, name, value, namespace) { };
    /**
     * Implement this callback to remove an attribute from an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} name The attribute name.
     * @param {?=} namespace The namespace.
     * @return {?}
     */
    Renderer2.prototype.removeAttribute = function (el, name, namespace) { };
    /**
     * Implement this callback to add a class to an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} name The class name.
     * @return {?}
     */
    Renderer2.prototype.addClass = function (el, name) { };
    /**
     * Implement this callback to remove a class from an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} name The class name.
     * @return {?}
     */
    Renderer2.prototype.removeClass = function (el, name) { };
    /**
     * Implement this callback to set a CSS style for an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} style The name of the style.
     * @param {?} value The new value.
     * @param {?=} flags Flags for style variations. No flags are set by default.
     * @return {?}
     */
    Renderer2.prototype.setStyle = function (el, style, value, flags) { };
    /**
     * Implement this callback to remove the value from a CSS style for an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} style The name of the style.
     * @param {?=} flags Flags for style variations to remove, if set. ???
     * @return {?}
     */
    Renderer2.prototype.removeStyle = function (el, style, flags) { };
    /**
     * Implement this callback to set the value of a property of an element in the DOM.
     * @abstract
     * @param {?} el The element.
     * @param {?} name The property name.
     * @param {?} value The new value.
     * @return {?}
     */
    Renderer2.prototype.setProperty = function (el, name, value) { };
    /**
     * Implement this callback to set the value of a node in the host element.
     * @abstract
     * @param {?} node The node.
     * @param {?} value The new value.
     * @return {?}
     */
    Renderer2.prototype.setValue = function (node, value) { };
    /**
     * Implement this callback to start an event listener.
     * @abstract
     * @param {?} target The context in which to listen for events. Can be
     * the entire window or document, the body of the document, or a specific
     * DOM element.
     * @param {?} eventName The event to listen for.
     * @param {?} callback A handler function to invoke when the event occurs.
     * @return {?} An "unlisten" function for disposing of this handler.
     */
    Renderer2.prototype.listen = function (target, eventName, callback) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQU9yRCxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7Ozs7SUFDOUIsWUFDVyxJQUFtQixXQUFtQixFQUFTLFNBQWlCLEVBQ2hFLGVBQXlDLE1BQTJCLEVBQ3BFO1FBRkEsT0FBRSxHQUFGLEVBQUU7UUFBaUIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2hFLGtCQUFhLEdBQWIsYUFBYTtRQUE0QixXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUNwRSxlQUFVLEdBQVYsVUFBVTtLQUFTO0NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0QsTUFBTSxPQUFnQixlQUFlO0NBT3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELE1BQU0sT0FBZ0IsUUFBUTtDQTZDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxhQUFhLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFjLHNCQUFzQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQjVGLE1BQU0sT0FBZ0IsWUFBWTtDQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0NELE1BQU0sT0FBZ0IsZ0JBQWdCO0NBcUJyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVDLFlBQWtCOzs7O0lBSWxCLFdBQWlCOzs7d0NBSmpCLFNBQVM7d0NBSVQsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQlYsTUFBTSxPQUFnQixTQUFTO0NBOEo5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi4vZGkvaW5qZWN0aW9uX3Rva2VuJztcbmltcG9ydCB7SW5qZWN0b3J9IGZyb20gJy4uL2RpL2luamVjdG9yJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uL21ldGFkYXRhL3ZpZXcnO1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBgUmVuZGVyZXJUeXBlMmAgKGFuZCBgUmVuZGVyZXIyYCkgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbmRlckNvbXBvbmVudFR5cGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBpZDogc3RyaW5nLCBwdWJsaWMgdGVtcGxhdGVVcmw6IHN0cmluZywgcHVibGljIHNsb3RDb3VudDogbnVtYmVyLFxuICAgICAgcHVibGljIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLCBwdWJsaWMgc3R5bGVzOiBBcnJheTxzdHJpbmd8YW55W10+LFxuICAgICAgcHVibGljIGFuaW1hdGlvbnM6IGFueSkge31cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBEZWJ1ZyBpbmZvIGlzIGhhbmRlbGVkIGludGVybmFsbHkgaW4gdGhlIHZpZXcgZW5naW5lIG5vdy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlckRlYnVnSW5mbyB7XG4gIGFic3RyYWN0IGdldCBpbmplY3RvcigpOiBJbmplY3RvcjtcbiAgYWJzdHJhY3QgZ2V0IGNvbXBvbmVudCgpOiBhbnk7XG4gIGFic3RyYWN0IGdldCBwcm92aWRlclRva2VucygpOiBhbnlbXTtcbiAgYWJzdHJhY3QgZ2V0IHJlZmVyZW5jZXMoKToge1trZXk6IHN0cmluZ106IGFueX07XG4gIGFic3RyYWN0IGdldCBjb250ZXh0KCk6IGFueTtcbiAgYWJzdHJhY3QgZ2V0IHNvdXJjZSgpOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIHRoZSBgUmVuZGVyZXIyYCBpbnN0ZWFkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIERpcmVjdFJlbmRlcmVyIHtcbiAgcmVtb3ZlKG5vZGU6IGFueSk6IHZvaWQ7XG4gIGFwcGVuZENoaWxkKG5vZGU6IGFueSwgcGFyZW50OiBhbnkpOiB2b2lkO1xuICBpbnNlcnRCZWZvcmUobm9kZTogYW55LCByZWZOb2RlOiBhbnkpOiB2b2lkO1xuICBuZXh0U2libGluZyhub2RlOiBhbnkpOiBhbnk7XG4gIHBhcmVudEVsZW1lbnQobm9kZTogYW55KTogYW55O1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgYFJlbmRlcmVyMmAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyIHtcbiAgYWJzdHJhY3Qgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnksIGRlYnVnSW5mbz86IFJlbmRlckRlYnVnSW5mbyk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBkZWJ1Z0luZm8/OiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnk7XG5cbiAgYWJzdHJhY3QgY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQ6IGFueSk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVUZW1wbGF0ZUFuY2hvcihwYXJlbnRFbGVtZW50OiBhbnksIGRlYnVnSW5mbz86IFJlbmRlckRlYnVnSW5mbyk6IGFueTtcblxuICBhYnN0cmFjdCBjcmVhdGVUZXh0KHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZywgZGVidWdJbmZvPzogUmVuZGVyRGVidWdJbmZvKTogYW55O1xuXG4gIGFic3RyYWN0IHByb2plY3ROb2RlcyhwYXJlbnRFbGVtZW50OiBhbnksIG5vZGVzOiBhbnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgYXR0YWNoVmlld0FmdGVyKG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGRldGFjaFZpZXcodmlld1Jvb3ROb2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGRlc3Ryb3lWaWV3KGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGxpc3RlbihyZW5kZXJFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogRnVuY3Rpb247XG5cbiAgYWJzdHJhY3QgbGlzdGVuR2xvYmFsKHRhcmdldDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBhbnkpOiB2b2lkO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyRWxlbWVudDogYW55LCBhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpOlxuICAgICAgdm9pZDtcblxuICAvKipcbiAgICogVXNlZCBvbmx5IGluIGRlYnVnIG1vZGUgdG8gc2VyaWFsaXplIHByb3BlcnR5IGNoYW5nZXMgdG8gZG9tIG5vZGVzIGFzIGF0dHJpYnV0ZXMuXG4gICAqL1xuICBhYnN0cmFjdCBzZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHByb3BlcnR5VmFsdWU6IHN0cmluZyk6XG4gICAgICB2b2lkO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLCBpc0FkZDogYm9vbGVhbik6IHZvaWQ7XG5cbiAgYWJzdHJhY3Qgc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsIHN0eWxlVmFsdWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgaW52b2tlRWxlbWVudE1ldGhvZChyZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZywgYXJncz86IGFueVtdKTogdm9pZDtcblxuICBhYnN0cmFjdCBzZXRUZXh0KHJlbmRlck5vZGU6IGFueSwgdGV4dDogc3RyaW5nKTogdm9pZDtcblxuICBhYnN0cmFjdCBhbmltYXRlKFxuICAgICAgZWxlbWVudDogYW55LCBzdGFydGluZ1N0eWxlczogYW55LCBrZXlmcmFtZXM6IGFueVtdLCBkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyLFxuICAgICAgZWFzaW5nOiBzdHJpbmcsIHByZXZpb3VzUGxheWVycz86IGFueVtdKTogYW55O1xufVxuXG5leHBvcnQgY29uc3QgUmVuZGVyZXIySW50ZXJjZXB0b3IgPSBuZXcgSW5qZWN0aW9uVG9rZW48UmVuZGVyZXIyW10+KCdSZW5kZXJlcjJJbnRlcmNlcHRvcicpO1xuXG4vKipcbiAqIEluamVjdGFibGUgc2VydmljZSB0aGF0IHByb3ZpZGVzIGEgbG93LWxldmVsIGludGVyZmFjZSBmb3IgbW9kaWZ5aW5nIHRoZSBVSS5cbiAqXG4gKiBVc2UgdGhpcyBzZXJ2aWNlIHRvIGJ5cGFzcyBBbmd1bGFyJ3MgdGVtcGxhdGluZyBhbmQgbWFrZSBjdXN0b20gVUkgY2hhbmdlcyB0aGF0IGNhbid0IGJlXG4gKiBleHByZXNzZWQgZGVjbGFyYXRpdmVseS4gRm9yIGV4YW1wbGUgaWYgeW91IG5lZWQgdG8gc2V0IGEgcHJvcGVydHkgb3IgYW4gYXR0cmlidXRlIHdob3NlIG5hbWUgaXNcbiAqIG5vdCBzdGF0aWNhbGx5IGtub3duLCB1c2Uge0BsaW5rIFJlbmRlcmVyI3NldEVsZW1lbnRQcm9wZXJ0eSBzZXRFbGVtZW50UHJvcGVydHl9IG9yXG4gKiB7QGxpbmsgUmVuZGVyZXIjc2V0RWxlbWVudEF0dHJpYnV0ZSBzZXRFbGVtZW50QXR0cmlidXRlfSByZXNwZWN0aXZlbHkuXG4gKlxuICogSWYgeW91IGFyZSBpbXBsZW1lbnRpbmcgYSBjdXN0b20gcmVuZGVyZXIsIHlvdSBtdXN0IGltcGxlbWVudCB0aGlzIGludGVyZmFjZS5cbiAqXG4gKiBUaGUgZGVmYXVsdCBSZW5kZXJlciBpbXBsZW1lbnRhdGlvbiBpcyBgRG9tUmVuZGVyZXJgLiBBbHNvIGF2YWlsYWJsZSBpcyBgV2ViV29ya2VyUmVuZGVyZXJgLlxuICpcbiAqIEBkZXByZWNhdGVkIFVzZSBgUmVuZGVyZXJGYWN0b3J5MmAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJvb3RSZW5kZXJlciB7XG4gIGFic3RyYWN0IHJlbmRlckNvbXBvbmVudChjb21wb25lbnRUeXBlOiBSZW5kZXJDb21wb25lbnRUeXBlKTogUmVuZGVyZXI7XG59XG5cbi8qKlxuICogVXNlZCBieSBgUmVuZGVyZXJGYWN0b3J5MmAgdG8gYXNzb2NpYXRlIGN1c3RvbSByZW5kZXJpbmcgZGF0YSBhbmQgc3R5bGVzXG4gKiB3aXRoIGEgcmVuZGVyaW5nIGltcGxlbWVudGF0aW9uLlxuICogIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJlclR5cGUyIHtcbiAgLyoqXG4gICAqIEEgdW5pcXVlIGlkZW50aWZ5aW5nIHN0cmluZyBmb3IgdGhlIG5ldyByZW5kZXJlciwgdXNlZCB3aGVuIGNyZWF0aW5nXG4gICAqIHVuaXF1ZSBzdHlsZXMgZm9yIGVuY2Fwc3VsYXRpb24uXG4gICAqL1xuICBpZDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHZpZXcgZW5jYXBzdWxhdGlvbiB0eXBlLCB3aGljaCBkZXRlcm1pbmVzIGhvdyBzdHlsZXMgYXJlIGFwcGxpZWQgdG9cbiAgICogRE9NIGVsZW1lbnRzLiBPbmUgb2ZcbiAgICogLSBgRW11bGF0ZWRgIChkZWZhdWx0KTogRW11bGF0ZSBuYXRpdmUgc2NvcGluZyBvZiBzdHlsZXMuXG4gICAqIC0gYE5hdGl2ZWA6IFVzZSB0aGUgbmF0aXZlIGVuY2Fwc3VsYXRpb24gbWVjaGFuaXNtIG9mIHRoZSByZW5kZXJlci5cbiAgICogLSBgU2hhZG93RG9tYDogVXNlIG1vZGVybiBbU2hhZG93XG4gICAqIERPTV0oaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9zaGFkb3cvKSBhbmRcbiAgICogY3JlYXRlIGEgU2hhZG93Um9vdCBmb3IgY29tcG9uZW50J3MgaG9zdCBlbGVtZW50LlxuICAgKiAtIGBOb25lYDogRG8gbm90IHByb3ZpZGUgYW55IHRlbXBsYXRlIG9yIHN0eWxlIGVuY2Fwc3VsYXRpb24uXG4gICAqL1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbjtcbiAgLyoqXG4gICAqIERlZmluZXMgQ1NTIHN0eWxlcyB0byBiZSBzdG9yZWQgb24gYSByZW5kZXJlciBpbnN0YW5jZS5cbiAgICovXG4gIHN0eWxlczogKHN0cmluZ3xhbnlbXSlbXTtcbiAgLyoqXG4gICAqIERlZmluZXMgYXJiaXRyYXJ5IGRldmVsb3Blci1kZWZpbmVkIGRhdGEgdG8gYmUgc3RvcmVkIG9uIGEgcmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGZvciByZW5kZXJlcnMgdGhhdCBkZWxlZ2F0ZSB0byBvdGhlciByZW5kZXJlcnMuXG4gICAqL1xuICBkYXRhOiB7W2tpbmQ6IHN0cmluZ106IGFueX07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgYSBjdXN0b20gcmVuZGVyZXIgdGhhdCBpbXBsZW1lbnRzIHRoZSBgUmVuZGVyZXIyYCBiYXNlIGNsYXNzLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyRmFjdG9yeTIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgYSBjdXN0b20gcmVuZGVyZXIgZm9yIGEgaG9zdCBET00gZWxlbWVudC5cbiAgICogQHBhcmFtIGhvc3RFbGVtZW50IFRoZSBlbGVtZW50IHRvIHJlbmRlci5cbiAgICogQHBhcmFtIHR5cGUgVGhlIGJhc2UgY2xhc3MgdG8gaW1wbGVtZW50LlxuICAgKiBAcmV0dXJucyBUaGUgbmV3IGN1c3RvbSByZW5kZXJlciBpbnN0YW5jZS5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZVJlbmRlcmVyKGhvc3RFbGVtZW50OiBhbnksIHR5cGU6IFJlbmRlcmVyVHlwZTJ8bnVsbCk6IFJlbmRlcmVyMjtcbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgaW52b2tlZCB3aGVuIHJlbmRlcmluZyBoYXMgYmVndW4uXG4gICAqL1xuICBhYnN0cmFjdCBiZWdpbj8oKTogdm9pZDtcbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgaW52b2tlZCB3aGVuIHJlbmRlcmluZyBoYXMgY29tcGxldGVkLlxuICAgKi9cbiAgYWJzdHJhY3QgZW5kPygpOiB2b2lkO1xuICAvKipcbiAgICogVXNlIHdpdGggYW5pbWF0aW9ucyB0ZXN0LW9ubHkgbW9kZS4gTm90aWZpZXMgdGhlIHRlc3Qgd2hlbiByZW5kZXJpbmcgaGFzIGNvbXBsZXRlZC5cbiAgICogQHJldHVybnMgVGhlIGFzeW5jaHJvbm91cyByZXN1bHQgb2YgdGhlIGRldmVsb3Blci1kZWZpbmVkIGZ1bmN0aW9uLlxuICAgKi9cbiAgYWJzdHJhY3Qgd2hlblJlbmRlcmluZ0RvbmU/KCk6IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBGbGFncyBmb3IgcmVuZGVyZXItc3BlY2lmaWMgc3R5bGUgbW9kaWZpZXJzLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZW51bSBSZW5kZXJlclN0eWxlRmxhZ3MyIHtcbiAgLyoqXG4gICAqIE1hcmtzIGEgc3R5bGUgYXMgaW1wb3J0YW50LlxuICAgKi9cbiAgSW1wb3J0YW50ID0gMSA8PCAwLFxuICAvKipcbiAgICogTWFya3MgYSBzdHlsZSBhcyB1c2luZyBkYXNoIGNhc2UgbmFtaW5nICh0aGlzLWlzLWRhc2gtY2FzZSkuXG4gICAqL1xuICBEYXNoQ2FzZSA9IDEgPDwgMVxufVxuXG4vKipcbiAqIEV4dGVuZCB0aGlzIGJhc2UgY2xhc3MgdG8gaW1wbGVtZW50IGN1c3RvbSByZW5kZXJpbmcuIEJ5IGRlZmF1bHQsIEFuZ3VsYXJcbiAqIHJlbmRlcnMgYSB0ZW1wbGF0ZSBpbnRvIERPTS4gWW91IGNhbiB1c2UgY3VzdG9tIHJlbmRlcmluZyB0byBpbnRlcmNlcHRcbiAqIHJlbmRlcmluZyBjYWxscywgb3IgdG8gcmVuZGVyIHRvIHNvbWV0aGluZyBvdGhlciB0aGFuIERPTS5cbiAqXG4gKiBDcmVhdGUgeW91ciBjdXN0b20gcmVuZGVyZXIgdXNpbmcgYFJlbmRlcmVyRmFjdG9yeTJgLlxuICpcbiAqIFVzZSBhIGN1c3RvbSByZW5kZXJlciB0byBieXBhc3MgQW5ndWxhcidzIHRlbXBsYXRpbmcgYW5kXG4gKiBtYWtlIGN1c3RvbSBVSSBjaGFuZ2VzIHRoYXQgY2FuJ3QgYmUgZXhwcmVzc2VkIGRlY2xhcmF0aXZlbHkuXG4gKiBGb3IgZXhhbXBsZSBpZiB5b3UgbmVlZCB0byBzZXQgYSBwcm9wZXJ0eSBvciBhbiBhdHRyaWJ1dGUgd2hvc2UgbmFtZSBpc1xuICogbm90IHN0YXRpY2FsbHkga25vd24sIHVzZSB0aGUgYHNldFByb3BlcnR5KClgIG9yXG4gKiBgc2V0QXR0cmlidXRlKClgIG1ldGhvZC5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJlcjIge1xuICAvKipcbiAgICogVXNlIHRvIHN0b3JlIGFyYml0cmFyeSBkZXZlbG9wZXItZGVmaW5lZCBkYXRhIG9uIGEgcmVuZGVyZXIgaW5zdGFuY2UsXG4gICAqIGFzIGFuIG9iamVjdCBjb250YWluaW5nIGtleS12YWx1ZSBwYWlycy5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHJlbmRlcmVycyB0aGF0IGRlbGVnYXRlIHRvIG90aGVyIHJlbmRlcmVycy5cbiAgICovXG4gIGFic3RyYWN0IGdldCBkYXRhKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBkZXN0cm95IHRoZSByZW5kZXJlciBvciB0aGUgaG9zdCBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgZGVzdHJveSgpOiB2b2lkO1xuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gY3JlYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSBuYW1lIEFuIGlkZW50aWZ5aW5nIG5hbWUgZm9yIHRoZSBuZXcgZWxlbWVudCwgdW5pcXVlIHdpdGhpbiB0aGUgbmFtZXNwYWNlLlxuICAgKiBAcGFyYW0gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2UgZm9yIHRoZSBuZXcgZWxlbWVudC5cbiAgICogQHJldHVybnMgVGhlIG5ldyBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogYW55O1xuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gYWRkIGEgY29tbWVudCB0byB0aGUgRE9NIG9mIHRoZSBob3N0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgY29tbWVudCB0ZXh0LlxuICAgKiBAcmV0dXJucyBUaGUgbW9kaWZpZWQgZWxlbWVudC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZyk6IGFueTtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gYWRkIHRleHQgdG8gdGhlIERPTSBvZiB0aGUgaG9zdCBlbGVtZW50LlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHRleHQgc3RyaW5nLlxuICAgKiBAcmV0dXJucyBUaGUgbW9kaWZpZWQgZWxlbWVudC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZVRleHQodmFsdWU6IHN0cmluZyk6IGFueTtcbiAgLyoqXG4gICAqIElmIG51bGwgb3IgdW5kZWZpbmVkLCB0aGUgdmlldyBlbmdpbmUgd29uJ3QgY2FsbCBpdC5cbiAgICogVGhpcyBpcyB1c2VkIGFzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIGZvciBwcm9kdWN0aW9uIG1vZGUuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgZGVzdHJveU5vZGUgITogKChub2RlOiBhbnkpID0+IHZvaWQpIHwgbnVsbDtcbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBjaGlsZCB0byBhIGdpdmVuIHBhcmVudCBub2RlIGluIHRoZSBob3N0IGVsZW1lbnQgRE9NLlxuICAgKiBAcGFyYW0gcGFyZW50IFRoZSBwYXJlbnQgbm9kZS5cbiAgICogQHBhcmFtIG5ld0NoaWxkIFRoZSBuZXcgY2hpbGQgbm9kZS5cbiAgICovXG4gIGFic3RyYWN0IGFwcGVuZENoaWxkKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55KTogdm9pZDtcbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIGluc2VydCBhIGNoaWxkIG5vZGUgYXQgYSBnaXZlbiBwb3NpdGlvbiBpbiBhIHBhcmVudCBub2RlXG4gICAqIGluIHRoZSBob3N0IGVsZW1lbnQgRE9NLlxuICAgKiBAcGFyYW0gcGFyZW50IFRoZSBwYXJlbnQgbm9kZS5cbiAgICogQHBhcmFtIG5ld0NoaWxkIFRoZSBuZXcgY2hpbGQgbm9kZXMuXG4gICAqIEBwYXJhbSByZWZDaGlsZCBUaGUgZXhpc3RpbmcgY2hpbGQgbm9kZSB0aGF0IHNob3VsZCBwcmVjZWRlIHRoZSBuZXcgbm9kZS5cbiAgICovXG4gIGFic3RyYWN0IGluc2VydEJlZm9yZShwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSwgcmVmQ2hpbGQ6IGFueSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byByZW1vdmUgYSBjaGlsZCBub2RlIGZyb20gdGhlIGhvc3QgZWxlbWVudCdzIERPTS5cbiAgICogQHBhcmFtIHBhcmVudCBUaGUgcGFyZW50IG5vZGUuXG4gICAqIEBwYXJhbSBvbGRDaGlsZCBUaGUgY2hpbGQgbm9kZSB0byByZW1vdmUuXG4gICAqL1xuICBhYnN0cmFjdCByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBwcmVwYXJlIGFuIGVsZW1lbnQgdG8gYmUgYm9vdHN0cmFwcGVkXG4gICAqIGFzIGEgcm9vdCBlbGVtZW50LCBhbmQgcmV0dXJuIHRoZSBlbGVtZW50IGluc3RhbmNlLlxuICAgKiBAcGFyYW0gc2VsZWN0b3JPck5vZGUgVGhlIERPTSBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBUaGUgcm9vdCBlbGVtZW50LlxuICAgKi9cbiAgYWJzdHJhY3Qgc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGU6IHN0cmluZ3xhbnkpOiBhbnk7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBnZXQgdGhlIHBhcmVudCBvZiBhIGdpdmVuIG5vZGVcbiAgICogaW4gdGhlIGhvc3QgZWxlbWVudCdzIERPTS5cbiAgICogQHBhcmFtIG5vZGUgVGhlIGNoaWxkIG5vZGUgdG8gcXVlcnkuXG4gICAqIEByZXR1cm5zIFRoZSBwYXJlbnQgbm9kZSwgb3IgbnVsbCBpZiB0aGVyZSBpcyBubyBwYXJlbnQuXG4gICAqIEZvciBXZWJXb3JrZXJzLCBhbHdheXMgcmV0dXJucyB0cnVlLlxuICAgKiBUaGlzIGlzIGJlY2F1c2UgdGhlIGNoZWNrIGlzIHN5bmNocm9ub3VzLFxuICAgKiBhbmQgdGhlIGNhbGxlciBjYW4ndCByZWx5IG9uIGNoZWNraW5nIGZvciBudWxsLlxuICAgKi9cbiAgYWJzdHJhY3QgcGFyZW50Tm9kZShub2RlOiBhbnkpOiBhbnk7XG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBjYWxsYmFjayB0byBnZXQgdGhlIG5leHQgc2libGluZyBub2RlIG9mIGEgZ2l2ZW4gbm9kZVxuICAgKiBpbiB0aGUgaG9zdCBlbGVtZW50J3MgRE9NLlxuICAgKiBAcmV0dXJucyBUaGUgc2libGluZyBub2RlLCBvciBudWxsIGlmIHRoZXJlIGlzIG5vIHNpYmxpbmcuXG4gICAqIEZvciBXZWJXb3JrZXJzLCBhbHdheXMgcmV0dXJucyBhIHZhbHVlLlxuICAgKiBUaGlzIGlzIGJlY2F1c2UgdGhlIGNoZWNrIGlzIHN5bmNocm9ub3VzLFxuICAgKiBhbmQgdGhlIGNhbGxlciBjYW4ndCByZWx5IG9uIGNoZWNraW5nIGZvciBudWxsLlxuICAgKi9cbiAgYWJzdHJhY3QgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55O1xuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmb3IgYW4gZWxlbWVudCBpbiB0aGUgRE9NLlxuICAgKiBAcGFyYW0gZWwgVGhlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBhdHRyaWJ1dGUgbmFtZS5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSBuZXcgdmFsdWUuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZS5cbiAgICovXG4gIGFic3RyYWN0IHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gcmVtb3ZlIGFuIGF0dHJpYnV0ZSBmcm9tIGFuIGVsZW1lbnQgaW4gdGhlIERPTS5cbiAgICogQHBhcmFtIGVsIFRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgYXR0cmlidXRlIG5hbWUuXG4gICAqIEBwYXJhbSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZS5cbiAgICovXG4gIGFic3RyYWN0IHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIGFkZCBhIGNsYXNzIHRvIGFuIGVsZW1lbnQgaW4gdGhlIERPTS5cbiAgICogQHBhcmFtIGVsIFRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gbmFtZSBUaGUgY2xhc3MgbmFtZS5cbiAgICovXG4gIGFic3RyYWN0IGFkZENsYXNzKGVsOiBhbnksIG5hbWU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIHJlbW92ZSBhIGNsYXNzIGZyb20gYW4gZWxlbWVudCBpbiB0aGUgRE9NLlxuICAgKiBAcGFyYW0gZWwgVGhlIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBjbGFzcyBuYW1lLlxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc2V0IGEgQ1NTIHN0eWxlIGZvciBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gICAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1lIG9mIHRoZSBzdHlsZS5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSBuZXcgdmFsdWUuXG4gICAqIEBwYXJhbSBmbGFncyBGbGFncyBmb3Igc3R5bGUgdmFyaWF0aW9ucy4gTm8gZmxhZ3MgYXJlIHNldCBieSBkZWZhdWx0LlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gcmVtb3ZlIHRoZSB2YWx1ZSBmcm9tIGEgQ1NTIHN0eWxlIGZvciBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gICAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudC5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1lIG9mIHRoZSBzdHlsZS5cbiAgICogQHBhcmFtIGZsYWdzIEZsYWdzIGZvciBzdHlsZSB2YXJpYXRpb25zIHRvIHJlbW92ZSwgaWYgc2V0LiA/Pz9cbiAgICovXG4gIGFic3RyYWN0IHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIGNhbGxiYWNrIHRvIHNldCB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBvZiBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gICAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudC5cbiAgICogQHBhcmFtIG5hbWUgVGhlIHByb3BlcnR5IG5hbWUuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgbmV3IHZhbHVlLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc2V0IHRoZSB2YWx1ZSBvZiBhIG5vZGUgaW4gdGhlIGhvc3QgZWxlbWVudC5cbiAgICogQHBhcmFtIG5vZGUgVGhlIG5vZGUuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgbmV3IHZhbHVlLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgY2FsbGJhY2sgdG8gc3RhcnQgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqIEBwYXJhbSB0YXJnZXQgVGhlIGNvbnRleHQgaW4gd2hpY2ggdG8gbGlzdGVuIGZvciBldmVudHMuIENhbiBiZVxuICAgKiB0aGUgZW50aXJlIHdpbmRvdyBvciBkb2N1bWVudCwgdGhlIGJvZHkgb2YgdGhlIGRvY3VtZW50LCBvciBhIHNwZWNpZmljXG4gICAqIERPTSBlbGVtZW50LlxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgKiBAcGFyYW0gY2FsbGJhY2sgQSBoYW5kbGVyIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAqIEByZXR1cm5zIEFuIFwidW5saXN0ZW5cIiBmdW5jdGlvbiBmb3IgZGlzcG9zaW5nIG9mIHRoaXMgaGFuZGxlci5cbiAgICovXG4gIGFic3RyYWN0IGxpc3RlbihcbiAgICAgIHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQpOiAoKSA9PiB2b2lkO1xufVxuIl19