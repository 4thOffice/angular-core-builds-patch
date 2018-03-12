import { RendererStyleFlags2, RendererType2 } from '../../render/api';
export declare enum RendererStyleFlags3 {
    Important = 1,
    DashCase = 2,
}
export declare type Renderer3 = ObjectOrientedRenderer3 | ProceduralRenderer3;
/**
 * Object Oriented style of API needed to create elements and text nodes.
 *
 * This is the native browser API style, e.g. operations are methods on individual objects
 * like HTMLElement. With this style, no additional code is needed as a facade
 * (reducing payload size).
 * */
export interface ObjectOrientedRenderer3 {
    createElement(tagName: string): RElement;
    createTextNode(data: string): RText;
    querySelector(selectors: string): RElement | null;
}
/** Returns wether the `renderer` is a `ProceduralRenderer3` */
export declare function isProceduralRenderer(renderer: ProceduralRenderer3 | ObjectOrientedRenderer3): renderer is ProceduralRenderer3;
/**
 * Procedural style of API needed to create elements and text nodes.
 *
 * In non-native browser environments (e.g. platforms such as web-workers), this is the
 * facade that enables element manipulation. This also facilitates backwards compatibility
 * with Renderer2.
 */
export interface ProceduralRenderer3 {
    destroy(): void;
    createElement(name: string, namespace?: string | null): RElement;
    createText(value: string): RText;
    /**
     * This property is allowed to be null / undefined,
     * in which case the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode?: ((node: RNode) => void) | null;
    appendChild(parent: RElement, newChild: RNode): void;
    insertBefore(parent: RNode, newChild: RNode, refChild: RNode | null): void;
    removeChild(parent: RElement, oldChild: RNode): void;
    selectRootElement(selectorOrNode: string | any): RElement;
    setAttribute(el: RElement, name: string, value: string, namespace?: string | null): void;
    removeAttribute(el: RElement, name: string, namespace?: string | null): void;
    addClass(el: RElement, name: string): void;
    removeClass(el: RElement, name: string): void;
    setStyle(el: RElement, style: string, value: any, flags?: RendererStyleFlags2 | RendererStyleFlags3): void;
    removeStyle(el: RElement, style: string, flags?: RendererStyleFlags2 | RendererStyleFlags3): void;
    setProperty(el: RElement, name: string, value: any): void;
    setValue(node: RText, value: string): void;
    listen(target: RNode, eventName: string, callback: (event: any) => boolean | void): () => void;
}
export interface RendererFactory3 {
    createRenderer(hostElement: RElement | null, rendererType: RendererType2 | null): Renderer3;
    begin?(): void;
    end?(): void;
}
export declare const domRendererFactory3: RendererFactory3;
/** Subset of API needed for appending elements and text nodes. */
export interface RNode {
    removeChild(oldChild: RNode): void;
    /**
     * Insert a child node.
     *
     * Used exclusively for adding View root nodes into ViewAnchor location.
     */
    insertBefore(newChild: RNode, refChild: RNode | null, isViewRoot: boolean): void;
    /**
     * Append a child node.
     *
     * Used exclusively for building up DOM which are static (ie not View roots)
     */
    appendChild(newChild: RNode): RNode;
}
/**
 * Subset of API needed for writing attributes, properties, and setting up
 * listeners on Element.
 */
export interface RElement extends RNode {
    style: RCssStyleDeclaration;
    classList: RDomTokenList;
    setAttribute(name: string, value: string): void;
    removeAttribute(name: string): void;
    setAttributeNS(namespaceURI: string, qualifiedName: string, value: string): void;
    addEventListener(type: string, listener: EventListener, useCapture?: boolean): void;
    removeEventListener(type: string, listener?: EventListener, options?: boolean): void;
    setProperty?(name: string, value: any): void;
}
export interface RCssStyleDeclaration {
    removeProperty(propertyName: string): string;
    setProperty(propertyName: string, value: string | null, priority?: string): void;
}
export interface RDomTokenList {
    add(token: string): void;
    remove(token: string): void;
}
export interface RText extends RNode {
    textContent: string | null;
}
export declare const unusedValueExportToPlacateAjd = 1;
