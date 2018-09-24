/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef as viewEngine_ChangeDetectorRef } from '../change_detection/change_detector_ref';
import { InjectionToken } from '../di/injection_token';
import { InjectFlags, Injector } from '../di/injector';
import { ComponentFactoryResolver as viewEngine_ComponentFactoryResolver } from '../linker/component_factory_resolver';
import { ElementRef as viewEngine_ElementRef } from '../linker/element_ref';
import { TemplateRef as viewEngine_TemplateRef } from '../linker/template_ref';
import { ViewContainerRef as viewEngine_ViewContainerRef } from '../linker/view_container_ref';
import { Renderer2 } from '../render';
import { Type } from '../type';
import { DirectiveDefInternal } from './interfaces/definition';
import { LInjector } from './interfaces/injector';
import { LContainerNode, LElementContainerNode, LElementNode, TContainerNode, TElementContainerNode, TElementNode, TNode } from './interfaces/node';
import { QueryReadType } from './interfaces/query';
import { LViewData } from './interfaces/view';
/**
 * Registers this directive as present in its node's injector by flipping the directive's
 * corresponding bit in the injector's bloom filter.
 *
 * @param injector The node injector in which the directive should be registered
 * @param type The directive to register
 */
export declare function bloomAdd(injector: LInjector, type: Type<any>): void;
export declare function getOrCreateNodeInjector(): LInjector;
/**
 * Creates (or gets an existing) injector for a given element or container.
 *
 * @param node for which an injector should be retrieved / created.
 * @param tNode for which an injector should be retrieved / created.
 * @param hostView View where the node is stored
 * @returns Node injector
 */
export declare function getOrCreateNodeInjectorForNode(node: LElementNode | LElementContainerNode | LContainerNode, tNode: TElementNode | TContainerNode | TElementContainerNode, hostView: LViewData): LInjector;
/**
 * Makes a directive public to the DI system by adding it to an injector's bloom filter.
 *
 * @param di The node injector in which a directive will be added
 * @param def The definition of the directive to be made public
 */
export declare function diPublicInInjector(di: LInjector, def: DirectiveDefInternal<any>): void;
/**
 * Makes a directive public to the DI system by adding it to an injector's bloom filter.
 *
 * @param def The definition of the directive to be made public
 */
export declare function diPublic(def: DirectiveDefInternal<any>): void;
/**
 * Returns the value associated to the given token from the injectors.
 *
 * `directiveInject` is intended to be used for directive, component and pipe factories.
 *  All other injection use `inject` which does not walk the node injector tree.
 *
 * Usage example (in factory function):
 *
 * class SomeDirective {
 *   constructor(directive: DirectiveA) {}
 *
 *   static ngDirectiveDef = defineDirective({
 *     type: SomeDirective,
 *     factory: () => new SomeDirective(directiveInject(DirectiveA))
 *   });
 * }
 *
 * @param token the type or token to inject
 * @param flags Injection flags
 * @returns the value from the injector or `null` when not found
 */
export declare function directiveInject<T>(token: Type<T> | InjectionToken<T>): T;
export declare function directiveInject<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags): T;
/**
 * Creates an ElementRef and stores it on the injector.
 * Or, if the ElementRef already exists, retrieves the existing ElementRef.
 *
 * @returns The ElementRef instance to use
 */
export declare function injectElementRef(): viewEngine_ElementRef;
/**
 * Creates a TemplateRef and stores it on the injector. Or, if the TemplateRef already
 * exists, retrieves the existing TemplateRef.
 *
 * @returns The TemplateRef instance to use
 */
export declare function injectTemplateRef<T>(): viewEngine_TemplateRef<T>;
/**
 * Creates a ViewContainerRef and stores it on the injector. Or, if the ViewContainerRef
 * already exists, retrieves the existing ViewContainerRef.
 *
 * @returns The ViewContainerRef instance to use
 */
export declare function injectViewContainerRef(): viewEngine_ViewContainerRef;
/** Returns a ChangeDetectorRef (a.k.a. a ViewRef) */
export declare function injectChangeDetectorRef(): viewEngine_ChangeDetectorRef;
/**
 * Creates a ComponentFactoryResolver and stores it on the injector. Or, if the
 * ComponentFactoryResolver
 * already exists, retrieves the existing ComponentFactoryResolver.
 *
 * @returns The ComponentFactoryResolver instance to use
 */
export declare function injectComponentFactoryResolver(): viewEngine_ComponentFactoryResolver;
export declare function injectRenderer2(): Renderer2;
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
 * @Component(...)
 * class MyComponent {
 *   constructor(@Attribute('title') title: string) { ... }
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
 * @experimental
 */
export declare function injectAttribute(attrNameToInject: string): string | undefined;
/**
 * Creates a ViewRef and stores it on the injector as ChangeDetectorRef (public alias).
 *
 * @param hostTNode The node that is requesting a ChangeDetectorRef
 * @param hostView The view to which the node belongs
 * @param context The context for this change detector ref
 * @returns The ChangeDetectorRef to use
 */
export declare function createViewRef(hostTNode: TNode, hostView: LViewData, context: any): viewEngine_ChangeDetectorRef;
/**
 * Returns the value associated to the given token from the injectors.
 *
 * Look for the injector providing the token by walking up the node injector tree and then
 * the module injector tree.
 *
 * @param nodeInjector Node injector where the search should start
 * @param token The token to look for
 * @param flags Injection flags
 * @returns the value from the injector or `null` when not found
 */
export declare function getOrCreateInjectable<T>(nodeInjector: LInjector, token: Type<T> | InjectionToken<T>, flags?: InjectFlags): T | null;
/**
 * Finds the closest injector that might have a certain directive.
 *
 * Each directive corresponds to a bit in an injector's bloom filter. Given the bloom bit to
 * check and a starting injector, this function traverses up injectors until it finds an
 * injector that contains a 1 for that bit in its bloom filter. A 1 indicates that the
 * injector may have that directive. It only *may* have the directive because directives begin
 * to share bloom filter bits after the BLOOM_SIZE is reached, and it could correspond to a
 * different directive sharing the bit.
 *
 * Note: We can skip checking further injectors up the tree if an injector's cbf structure
 * has a 0 for that bloom bit. Since cbf contains the merged value of all the parent
 * injectors, a 0 in the bloom bit indicates that the parents definitely do not contain
 * the directive and do not need to be checked.
 *
 * @param injector The starting node injector to check
 * @param  bloomBit The bit to check in each injector's bloom filter
 * @param  flags The injection flags for this injection site (e.g. Optional or SkipSelf)
 * @returns An injector that might have the directive
 */
export declare function bloomFindPossibleInjector(startInjector: LInjector, bloomBit: number, flags: InjectFlags): LInjector | null;
export declare class ReadFromInjectorFn<T> {
    readonly read: (tNode: TNode, view: LViewData, directiveIndex?: number) => T;
    constructor(read: (tNode: TNode, view: LViewData, directiveIndex?: number) => T);
}
/**
 * Creates an ElementRef for a given node injector and stores it on the injector.
 *
 * @param di The node injector where we should store a created ElementRef
 * @returns The ElementRef instance to use
 */
export declare function createElementRef(tNode: TNode, view: LViewData): viewEngine_ElementRef;
export declare const QUERY_READ_TEMPLATE_REF: QueryReadType<viewEngine_TemplateRef<any>>;
export declare const QUERY_READ_CONTAINER_REF: QueryReadType<viewEngine_ViewContainerRef>;
export declare const QUERY_READ_ELEMENT_REF: QueryReadType<viewEngine_ElementRef<any>>;
export declare const QUERY_READ_FROM_NODE: QueryReadType<any>;
/**
 * Creates a ViewContainerRef and stores it on the injector.
 *
 * @param hostTNode The node that is requesting a ViewContainerRef
 * @param hostView The view to which the node belongs
 * @returns The ViewContainerRef instance to use
 */
export declare function createContainerRef(hostTNode: TElementNode | TContainerNode | TElementContainerNode, hostView: LViewData): viewEngine_ViewContainerRef;
export declare class NodeInjector implements Injector {
    private _lInjector;
    constructor(_lInjector: LInjector);
    get(token: any): any;
}
/**
 * Creates a TemplateRef and stores it on the injector.
 *
 * @param hostTNode The node that is requesting a TemplateRef
 * @param hostView The view to which the node belongs
 * @returns The TemplateRef instance to use
 */
export declare function createTemplateRef<T>(hostTNode: TNode, hostView: LViewData): viewEngine_TemplateRef<T>;
export declare function getFactoryOf<T>(type: Type<any>): ((type?: Type<T>) => T) | null;
export declare function getInheritedFactory<T>(type: Type<any>): (type: Type<T>) => T;
/**
 * Retrieves `TemplateRef` instance from `Injector` when a local reference is placed on the
 * `<ng-template>` element.
 */
export declare function templateRefExtractor(tNode: TContainerNode, currentView: LViewData): viewEngine_TemplateRef<{}>;
