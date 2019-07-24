/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '../di/injection_token';
import { Type } from '../interface/type';
/**
 * A DI token that you can use to create a virtual [provider](guide/glossary#provider)
 * that will populate the `entryComponents` field of components and NgModules
 * based on its `useValue` property value.
 * All components that are referenced in the `useValue` value (either directly
 * or in a nested array or map) are added to the `entryComponents` property.
 *
 * @usageNotes
 *
 * The following example shows how the router can populate the `entryComponents`
 * field of an NgModule based on a router configuration that refers
 * to components.
 *
 * ```typescript
 * // helper function inside the router
 * function provideRoutes(routes) {
 *   return [
 *     {provide: ROUTES, useValue: routes},
 *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
 *   ];
 * }
 *
 * // user code
 * let routes = [
 *   {path: '/root', component: RootComp},
 *   {path: '/teams', component: TeamsComp}
 * ];
 *
 * @NgModule({
 *   providers: [provideRoutes(routes)]
 * })
 * class ModuleWithRoutes {}
 * ```
 *
 * @publicApi
 */
export declare const ANALYZE_FOR_ENTRY_COMPONENTS: InjectionToken<any>;
/**
 * Type of the `Attribute` decorator / constructor function.
 *
 * @publicApi
 */
export interface AttributeDecorator {
    /**
     * Specifies that a constant attribute value should be injected.
     *
     * The directive can inject constant string literals of host element attributes.
     *
     * @usageNotes
     *
     * Suppose we have an `<input>` element and want to know its `type`.
     *
     * ```html
     * <input type="text">
     * ```
     *
     * A decorator can inject string literal `text` as in the following example.
     *
     * {@example core/ts/metadata/metadata.ts region='attributeMetadata'
     * linenums="false"}
     *
     * @publicApi
     */
    (name: string): any;
    new (name: string): Attribute;
}
/**
 * Type of the Attribute metadata.
 *
 * @publicApi
 */
export interface Attribute {
    /**
     * The name of the attribute to be injected into the constructor.
     */
    attributeName?: string;
}
/**
 * Type of the Query metadata.
 *
 * @publicApi
 */
export interface Query {
    descendants: boolean;
    first: boolean;
    read: any;
    isViewQuery: boolean;
    selector: any;
    static: boolean;
}
/**
 * Base class for query metadata.
 *
 * @see `ContentChildren`.
 * @see `ContentChild`.
 * @see `ViewChildren`.
 * @see `ViewChild`.
 *
 * @publicApi
 */
export declare abstract class Query {
}
/**
 * Type of the ContentChildren decorator / constructor function.
 *
 * @see `ContentChildren`.
 * @publicApi
 */
export interface ContentChildrenDecorator {
    /**
     * Parameter decorator that configures a content query.
     *
     * Use to get the `QueryList` of elements or directives from the content DOM.
     * Any time a child element is added, removed, or moved, the query list will be
     * updated, and the changes observable of the query list will emit a new value.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **descendants** - True to include all descendants, otherwise include only direct children.
     * * **read** - True to read a different token from the queried elements.
     *
     * @usageNotes
     *
     * Here is a simple demonstration of how the `ContentChildren` decorator can be used.
     *
     * {@example core/di/ts/contentChildren/content_children_howto.ts region='HowTo'
     * linenums="false"}
     *
     * ### Tab-pane example
     *
     * Here is a slightly more realistic example that shows how `ContentChildren` decorators
     * can be used to implement a tab pane component.
     *
     * {@example core/di/ts/contentChildren/content_children_example.ts region='Component'
     * linenums="false"}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts?: {
        descendants?: boolean;
        read?: any;
    }): any;
    new (selector: Type<any> | Function | string, opts?: {
        descendants?: boolean;
        read?: any;
    }): Query;
}
/**
 * Type of the ContentChildren metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export declare type ContentChildren = Query;
/**
 * ContentChildren decorator and metadata.
 *
 *
 * @Annotation
 * @publicApi
 */
export declare const ContentChildren: ContentChildrenDecorator;
/**
 * Type of the ContentChild decorator / constructor function.
 *
 * @publicApi
 */
export interface ContentChildDecorator {
    /**
     * Parameter decorator that configures a content query.
     *
     * Use to get the first element or the directive matching the selector from the content DOM.
     * If the content DOM changes, and a new child matches the selector,
     * the property will be updated.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **read** - True to read a different token from the queried element.
     * * **static** - True to resolve query results before change detection runs,
     * false to resolve after change detection.
     *
     * When `static` is not provided, uses the query results to determine the timing of query
     * resolution. If any query results are inside a nested view (such as `*ngIf`), the query is
     * resolved after change detection runs. Otherwise, it is resolved before change detection
     * runs.
     *
     * @usageNotes
     *
     * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'
     * linenums="false"}
     *
     * ### Example
     *
     * {@example core/di/ts/contentChild/content_child_example.ts region='Component'
     * linenums="false"}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): any;
    new (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): ContentChild;
}
/**
 * Type of the ContentChild metadata.
 *
 * @publicApi
 */
export declare type ContentChild = Query;
/**
 * ContentChild decorator and metadata.
 *
 *
 * @Annotation
 *
 * @publicApi
 */
export declare const ContentChild: ContentChildDecorator;
/**
 * Type of the ViewChildren decorator / constructor function.
 *
 * @see `ViewChildren`.
 *
 * @publicApi
 */
export interface ViewChildrenDecorator {
    /**
     * Parameter decorator that configures a view query.
     *
     * Use to get the `QueryList` of elements or directives from the view DOM.
     * Any time a child element is added, removed, or moved, the query list will be updated,
     * and the changes observable of the query list will emit a new value.
     *
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **read** - True to read a different token from the queried elements.
     *
     * @usageNotes
     *
     * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'
     * linenums="false"}
     *
     * ### Another example
     *
     * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'
     * linenums="false"}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts?: {
        read?: any;
    }): any;
    new (selector: Type<any> | Function | string, opts?: {
        read?: any;
    }): ViewChildren;
}
/**
 * Type of the ViewChildren metadata.
 *
 * @publicApi
 */
export declare type ViewChildren = Query;
/**
 * ViewChildren decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const ViewChildren: ViewChildrenDecorator;
/**
 * Type of the ViewChild decorator / constructor function.
 *
 * @see `ViewChild`.
 * @publicApi
 */
export interface ViewChildDecorator {
    /**
     * @description
     * Property decorator that configures a view query.
     * The change detector looks for the first element or the directive matching the selector
     * in the view DOM. If the view DOM changes, and a new child matches the selector,
     * the property is updated.
     *
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * **Metadata Properties**:
     *
     * * **selector** - The directive type or the name used for querying.
     * * **read** - True to read a different token from the queried elements.
     * * **static** - True to resolve query results before change detection runs
     *
     * When `static` is not provided, uses query results to determine the timing of query
     * resolution. If any query results are inside a nested view (such as `*ngIf`), the query is
     * resolved after change detection runs. Otherwise, it is resolved before change detection
     * runs.
     *
     * The following selectors are supported.
     *   * Any class with the `@Component` or `@Directive` decorator
     *   * A template reference variable as a string (e.g. query `<my-component #cmp></my-component>`
     * with `@ViewChild('cmp')`)
     *   * Any provider defined in the child component tree of the current component (e.g.
     * `@ViewChild(SomeService) someService: SomeService`)
     *   * Any provider defined through a string token (e.g. `@ViewChild('someToken') someTokenVal:
     * any`)
     *   * A `TemplateRef` (e.g. query `<ng-template></ng-template>` with `@ViewChild(TemplateRef)
     * template;`)
     *
     * @usageNotes
     *
     * {@example core/di/ts/viewChild/view_child_example.ts region='Component'
     * linenums="false"}
     *
     * ### Example 2
     *
     * {@example core/di/ts/viewChild/view_child_howto.ts region='HowTo'
     * linenums="false"}
     *
     * @Annotation
     */
    (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): any;
    new (selector: Type<any> | Function | string, opts: {
        read?: any;
        static: boolean;
    }): ViewChild;
}
/**
 * Type of the ViewChild metadata.
 *
 * @publicApi
 */
export declare type ViewChild = Query;
/**
 * ViewChild decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export declare const ViewChild: ViewChildDecorator;
