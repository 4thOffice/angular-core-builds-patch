/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationKeyframe } from '../../src/animation/animation_keyframe';
import { AnimationPlayer } from '../../src/animation/animation_player';
import { AnimationStyles } from '../../src/animation/animation_styles';
import { InjectionToken, Injector } from '../di';
import { ViewEncapsulation } from '../metadata/view';
/**
 * @deprecated Use `RendererTypeV2` (and `RendererV2`) instead.
 */
export declare class RenderComponentType {
    id: string;
    templateUrl: string;
    slotCount: number;
    encapsulation: ViewEncapsulation;
    styles: Array<string | any[]>;
    animations: any;
    constructor(id: string, templateUrl: string, slotCount: number, encapsulation: ViewEncapsulation, styles: Array<string | any[]>, animations: any);
}
/**
 * @deprecated Debug info is handeled internally in the view engine now.
 */
export declare abstract class RenderDebugInfo {
    readonly abstract injector: Injector;
    readonly abstract component: any;
    readonly abstract providerTokens: any[];
    readonly abstract references: {
        [key: string]: any;
    };
    readonly abstract context: any;
    readonly abstract source: string;
}
/**
 * @deprecated Use the `RendererV2` instead.
 */
export interface DirectRenderer {
    remove(node: any): void;
    appendChild(node: any, parent: any): void;
    insertBefore(node: any, refNode: any): void;
    nextSibling(node: any): any;
    parentElement(node: any): any;
}
/**
 * @deprecated Use the `RendererV2` instead.
 */
export declare abstract class Renderer {
    abstract selectRootElement(selectorOrNode: string | any, debugInfo?: RenderDebugInfo): any;
    abstract createElement(parentElement: any, name: string, debugInfo?: RenderDebugInfo): any;
    abstract createViewRoot(hostElement: any): any;
    abstract createTemplateAnchor(parentElement: any, debugInfo?: RenderDebugInfo): any;
    abstract createText(parentElement: any, value: string, debugInfo?: RenderDebugInfo): any;
    abstract projectNodes(parentElement: any, nodes: any[]): void;
    abstract attachViewAfter(node: any, viewRootNodes: any[]): void;
    abstract detachView(viewRootNodes: any[]): void;
    abstract destroyView(hostElement: any, viewAllNodes: any[]): void;
    abstract listen(renderElement: any, name: string, callback: Function): Function;
    abstract listenGlobal(target: string, name: string, callback: Function): Function;
    abstract setElementProperty(renderElement: any, propertyName: string, propertyValue: any): void;
    abstract setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): void;
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     */
    abstract setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): void;
    abstract setElementClass(renderElement: any, className: string, isAdd: boolean): void;
    abstract setElementStyle(renderElement: any, styleName: string, styleValue: string): void;
    abstract invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void;
    abstract setText(renderNode: any, text: string): void;
    abstract animate(element: any, startingStyles: AnimationStyles, keyframes: AnimationKeyframe[], duration: number, delay: number, easing: string, previousPlayers?: AnimationPlayer[]): AnimationPlayer;
}
export declare const RendererV2Interceptor: InjectionToken<RendererV2[]>;
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 *
 * @deprecated Use `RendererFactoryV2` instead.
 */
export declare abstract class RootRenderer {
    abstract renderComponent(componentType: RenderComponentType): Renderer;
}
/**
 * @experimental
 */
export interface RendererTypeV2 {
    id: string;
    encapsulation: ViewEncapsulation;
    styles: (string | any[])[];
    data: {
        [kind: string]: any[];
    };
}
/**
 * @experimental
 */
export declare abstract class RendererFactoryV2 {
    abstract createRenderer(hostElement: any, type: RendererTypeV2): RendererV2;
}
/**
 * @experimental
 */
export declare abstract class RendererV2 {
    abstract destroy(): void;
    abstract createElement(name: string, namespace?: string): any;
    abstract createComment(value: string): any;
    abstract createText(value: string): any;
    /**
     * This property is allowed to be null / undefined,
     * in which case the view engine won't call it.
     * This is used as a performance optimization for production mode.
     */
    destroyNode: (node: any) => void | null;
    abstract appendChild(parent: any, newChild: any): void;
    abstract insertBefore(parent: any, newChild: any, refChild: any): void;
    abstract removeChild(parent: any, oldChild: any): void;
    abstract selectRootElement(selectorOrNode: string | any): any;
    /**
     * Attention: On WebWorkers, this will always return a value,
     * as we are asking for a result synchronously. I.e.
     * the caller can't rely on checking whether this is null or not.
     */
    abstract parentNode(node: any): any;
    /**
     * Attention: On WebWorkers, this will always return a value,
     * as we are asking for a result synchronously. I.e.
     * the caller can't rely on checking whether this is null or not.
     */
    abstract nextSibling(node: any): any;
    abstract setAttribute(el: any, name: string, value: string, namespace?: string): void;
    abstract removeAttribute(el: any, name: string, namespace?: string): void;
    abstract addClass(el: any, name: string): void;
    abstract removeClass(el: any, name: string): void;
    abstract setStyle(el: any, style: string, value: any, hasVendorPrefix: boolean, hasImportant: boolean): void;
    abstract removeStyle(el: any, style: string, hasVendorPrefix: boolean): void;
    abstract setProperty(el: any, name: string, value: any): void;
    abstract setValue(node: any, value: string): void;
    abstract listen(target: 'window' | 'document' | 'body' | any, eventName: string, callback: (event: any) => boolean): () => void;
}
