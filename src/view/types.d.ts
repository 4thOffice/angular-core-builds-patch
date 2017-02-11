/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PipeTransform } from '../change_detection/change_detection';
import { Injector } from '../di';
import { QueryList } from '../linker/query_list';
import { ViewEncapsulation } from '../metadata/view';
import { Sanitizer, SecurityContext } from '../security';
export interface ViewDefinition {
    flags: ViewFlags;
    component: ComponentDefinition;
    update: ViewUpdateFn;
    handleEvent: ViewHandleEventFn;
    /**
     * Order: Depth first.
     * Especially providers are before elements / anchors.
     */
    nodes: NodeDef[];
    /** aggregated NodeFlags for all nodes **/
    nodeFlags: NodeFlags;
    /**
     * Order: parents before children, but children in reverse order.
     * Especially providers are after elements / anchors.
     */
    reverseChildNodes: NodeDef[];
    lastRootNode: NodeDef;
    bindingCount: number;
    disposableCount: number;
    /**
     * ids of all queries that are matched by one of the nodes.
     * This includes query ids from templates as well.
     */
    nodeMatchedQueries: {
        [queryId: string]: boolean;
    };
}
export declare type ViewDefinitionFactory = () => ViewDefinition;
export declare type ViewUpdateFn = (check: NodeCheckFn, view: ViewData) => void;
export interface NodeCheckFn {
    (view: ViewData, nodeIndex: number, argStyle: ArgumentType.Dynamic, values: any[]): any;
    (view: ViewData, nodeIndex: number, argStyle: ArgumentType.Inline, v0?: any, v1?: any, v2?: any, v3?: any, v4?: any, v5?: any, v6?: any, v7?: any, v8?: any, v9?: any): any;
}
export declare type ViewHandleEventFn = (view: ViewData, nodeIndex: number, eventName: string, event: any) => boolean;
export declare enum ArgumentType {
    Inline = 0,
    Dynamic = 1,
}
/**
 * Bitmask for ViewDefintion.flags.
 */
export declare enum ViewFlags {
    None = 0,
    OnPush = 2,
}
export interface ComponentDefinition {
    id: string;
    encapsulation: ViewEncapsulation;
    styles: string[];
}
/**
 * A node definition in the view.
 *
 * Note: We use one type for all nodes so that loops that loop over all nodes
 * of a ViewDefinition stay monomorphic!
 */
export interface NodeDef {
    type: NodeType;
    index: number;
    reverseChildIndex: number;
    flags: NodeFlags;
    parent: number;
    /** this is checked against NgContentDef.index to find matched nodes */
    ngContentIndex: number;
    /** number of transitive children */
    childCount: number;
    /** aggregated NodeFlags for all children **/
    childFlags: NodeFlags;
    bindingIndex: number;
    bindings: BindingDef[];
    disposableIndex: number;
    disposableCount: number;
    /**
     * ids and value types of all queries that are matched by this node.
     */
    matchedQueries: {
        [queryId: string]: QueryValueType;
    };
    /**
     * ids of all queries that are matched by one of the child nodes.
     * This includes query ids from templates as well.
     */
    childMatchedQueries: {
        [queryId: string]: boolean;
    };
    element: ElementDef;
    provider: ProviderDef;
    text: TextDef;
    pureExpression: PureExpressionDef;
    query: QueryDef;
    ngContent: NgContentDef;
}
export declare enum NodeType {
    Element = 0,
    Text = 1,
    Provider = 2,
    PureExpression = 3,
    Query = 4,
    NgContent = 5,
}
/**
 * Bitmask for NodeDef.flags.
 */
export declare enum NodeFlags {
    None = 0,
    OnInit = 1,
    OnDestroy = 2,
    DoCheck = 4,
    OnChanges = 8,
    AfterContentInit = 16,
    AfterContentChecked = 32,
    AfterViewInit = 64,
    AfterViewChecked = 128,
    HasEmbeddedViews = 256,
    HasComponent = 512,
    HasContentQuery = 1024,
    HasViewQuery = 2048,
    LazyProvider = 4096,
}
export interface BindingDef {
    type: BindingType;
    name: string;
    nonMinifiedName: string;
    securityContext: SecurityContext;
    suffix: string;
}
export declare enum BindingType {
    ElementAttribute = 0,
    ElementClass = 1,
    ElementStyle = 2,
    ElementProperty = 3,
    ProviderProperty = 4,
    Interpolation = 5,
    PureExpressionProperty = 6,
}
export declare enum QueryValueType {
    ElementRef = 0,
    RenderElement = 1,
    TemplateRef = 2,
    ViewContainerRef = 3,
    Provider = 4,
}
export interface ElementDef {
    name: string;
    attrs: {
        [name: string]: string;
    };
    outputs: ElementOutputDef[];
    template: ViewDefinition;
    /**
     * visible providers for DI in the view,
     * as see from this element.
     */
    providerIndices: {
        [tokenKey: string]: number;
    };
    source: string;
}
export interface ElementOutputDef {
    target: string;
    eventName: string;
}
export interface ProviderDef {
    type: ProviderType;
    token: any;
    tokenKey: string;
    value: any;
    deps: DepDef[];
    outputs: ProviderOutputDef[];
    component: ViewDefinitionFactory;
}
export declare enum ProviderType {
    Value = 0,
    Class = 1,
    Factory = 2,
    UseExisting = 3,
}
export interface DepDef {
    flags: DepFlags;
    token: any;
    tokenKey: string;
}
/**
 * Bitmask for DI flags
 */
export declare enum DepFlags {
    None = 0,
    SkipSelf = 1,
    Optional = 2,
    Value = 8,
}
export interface ProviderOutputDef {
    propName: string;
    eventName: string;
}
export interface TextDef {
    prefix: string;
    source: string;
}
export interface PureExpressionDef {
    type: PureExpressionType;
    pipeDep: DepDef;
}
export declare enum PureExpressionType {
    Array = 0,
    Object = 1,
    Pipe = 2,
}
export interface QueryDef {
    id: string;
    bindings: QueryBindingDef[];
}
export interface QueryBindingDef {
    propName: string;
    bindingType: QueryBindingType;
}
export declare enum QueryBindingType {
    First = 0,
    All = 1,
}
export interface NgContentDef {
    /**
     * this index is checked against NodeDef.ngContentIndex to find the nodes
     * that are matched by this ng-content.
     * Note that a NodeDef with an ng-content can be reprojected, i.e.
     * have a ngContentIndex on its own.
     */
    index: number;
}
/**
 * View instance data.
 * Attention: Adding fields to this is performance sensitive!
 */
export interface ViewData {
    def: ViewDefinition;
    root: RootData;
    parentIndex: number;
    parent: ViewData;
    component: any;
    context: any;
    nodes: {
        [key: number]: NodeData;
    };
    state: ViewState;
    oldValues: any[];
    disposables: DisposableFn[];
}
/**
 * Bitmask of states
 */
export declare enum ViewState {
    FirstCheck = 1,
    ChecksEnabled = 2,
    Errored = 4,
    Destroyed = 8,
}
export declare type DisposableFn = () => void;
/**
 * Node instance data.
 *
 * We have a separate type per NodeType to save memory
 * (TextData | ElementData | ProviderData | PureExpressionData | QueryList<any>)
 *
 * To keep our code monomorphic,
 * we prohibit using `NodeData` directly but enforce the use of accessors (`asElementData`, ...).
 * This way, no usage site can get a `NodeData` from view.nodes and then use it for different
 * purposes.
 */
export declare class NodeData {
    private __brand;
}
/**
 * Data for an instantiated NodeType.Text.
 *
 * Attention: Adding fields to this is performance sensitive!
 */
export interface TextData {
    renderText: any;
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export declare function asTextData(view: ViewData, index: number): TextData;
/**
 * Data for an instantiated NodeType.Element.
 *
 * Attention: Adding fields to this is performance sensitive!
 */
export interface ElementData {
    renderElement: any;
    embeddedViews: ViewData[];
    projectedViews: ViewData[];
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export declare function asElementData(view: ViewData, index: number): ElementData;
/**
 * Data for an instantiated NodeType.Provider.
 *
 * Attention: Adding fields to this is performance sensitive!
 */
export interface ProviderData {
    instance: any;
    componentView: ViewData;
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export declare function asProviderData(view: ViewData, index: number): ProviderData;
/**
 * Data for an instantiated NodeType.PureExpression.
 *
 * Attention: Adding fields to this is performance sensitive!
 */
export interface PureExpressionData {
    value: any;
    pipe: PipeTransform;
}
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export declare function asPureExpressionData(view: ViewData, index: number): PureExpressionData;
/**
 * Accessor for view.nodes, enforcing that every usage site stays monomorphic.
 */
export declare function asQueryList(view: ViewData, index: number): QueryList<any>;
export interface RootData {
    injector: Injector;
    projectableNodes: any[][];
    selectorOrNode: any;
    renderer: RendererV2;
    sanitizer: Sanitizer;
}
/**
 * TODO(tbosch): move this interface into @angular/core/src/render/api,
 * and implement it in @angular/platform-browser, ...
 */
export interface RendererV2 {
    createElement(name: string, debugInfo?: RenderDebugContext): any;
    createComment(value: string, debugInfo?: RenderDebugContext): any;
    createText(value: string, debugInfo?: RenderDebugContext): any;
    appendChild(parent: any, newChild: any): void;
    insertBefore(parent: any, newChild: any, refChild: any): void;
    removeChild(parent: any, oldChild: any): void;
    selectRootElement(selectorOrNode: string | any, debugInfo?: RenderDebugContext): any;
    /**
     * Attention: On WebWorkers, this will always return a value,
     * as we are asking for a result synchronously. I.e.
     * the caller can't rely on checking whether this is null or not.
     */
    parentNode(node: any): any;
    /**
     * Attention: On WebWorkers, this will always return a value,
     * as we are asking for a result synchronously. I.e.
     * the caller can't rely on checking whether this is null or not.
     */
    nextSibling(node: any): any;
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     */
    setBindingDebugInfo(el: any, propertyName: string, propertyValue: string): void;
    /**
     * Used only in debug mode to serialize property changes to dom nodes as attributes.
     */
    removeBindingDebugInfo(el: any, propertyName: string): void;
    setAttribute(el: any, name: string, value: string): void;
    removeAttribute(el: any, name: string): void;
    addClass(el: any, name: string): void;
    removeClass(el: any, name: string): void;
    setStyle(el: any, style: string, value: any): void;
    removeStyle(el: any, style: string): void;
    setProperty(el: any, name: string, value: any): void;
    setText(node: any, value: string): void;
    listen(target: 'window' | 'document' | any, eventName: string, callback: (event: any) => boolean): () => void;
}
export declare abstract class RenderDebugContext {
    readonly abstract injector: Injector;
    readonly abstract component: any;
    readonly abstract providerTokens: any[];
    readonly abstract references: {
        [key: string]: any;
    };
    readonly abstract context: any;
    readonly abstract source: string;
    readonly abstract componentRenderElement: any;
    readonly abstract renderNode: any;
}
export declare abstract class DebugContext extends RenderDebugContext {
    readonly abstract view: ViewData;
    readonly abstract nodeIndex: number;
}
export interface Services {
    setCurrentNode(view: ViewData, nodeIndex: number): void;
    createRootView(injector: Injector, projectableNodes: any[][], rootSelectorOrNode: string | any, def: ViewDefinition, context?: any): ViewData;
    createEmbeddedView(parent: ViewData, anchorDef: NodeDef, context?: any): ViewData;
    checkAndUpdateView(view: ViewData): void;
    checkNoChangesView(view: ViewData): void;
    attachEmbeddedView(elementData: ElementData, viewIndex: number, view: ViewData): void;
    detachEmbeddedView(elementData: ElementData, viewIndex: number): ViewData;
    moveEmbeddedView(elementData: ElementData, oldViewIndex: number, newViewIndex: number): ViewData;
    destroyView(view: ViewData): void;
    resolveDep(view: ViewData, requestNodeIndex: number, elIndex: number, depDef: DepDef, notFoundValue?: any): any;
    createDebugContext(view: ViewData, nodeIndex: number): DebugContext;
    handleEvent: ViewHandleEventFn;
    updateView: ViewUpdateFn;
}
/**
 * This object is used to prevent cycles in the source files and to have a place where
 * debug mode can hook it. It is lazily filled when `isDevMode` is known.
 */
export declare const Services: Services;
