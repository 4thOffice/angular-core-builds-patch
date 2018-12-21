/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import './ng_dev_mode';
import { ChangeDetectionStrategy } from '../change_detection/constants';
import { NgModuleDef } from '../metadata/ng_module';
import { ViewEncapsulation } from '../metadata/view';
import { Type } from '../type';
import { BaseDef, ComponentDef, ComponentDefFeature, ComponentQuery, ComponentTemplate, ComponentType, DirectiveDef, DirectiveDefFeature, DirectiveType, DirectiveTypesOrFactory, HostBindingsFunction, PipeDef, PipeType, PipeTypesOrFactory } from './interfaces/definition';
import { CssSelectorList } from './interfaces/projection';
/**
 * Create a component definition object.
 *
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngComponentDef = defineComponent({
 *     ...
 *   });
 * }
 * ```
 */
export declare function defineComponent<T>(componentDefinition: {
    /**
     * Directive type, needed to configure the injector.
     */
    type: Type<T>;
    /** The selectors that will be used to match nodes to this component. */
    selectors: CssSelectorList;
    /**
     * Factory method used to create an instance of directive.
     */
    factory: (t: Type<T> | null) => T;
    /**
     * The number of nodes, local refs, and pipes in this component template.
     *
     * Used to calculate the length of this component's LView array, so we
     * can pre-fill the array and set the binding start index.
     */
    consts: number;
    /**
     * The number of bindings in this component template (including pure fn bindings).
     *
     * Used to calculate the length of this component's LView array, so we
     * can pre-fill the array and set the host binding start index.
     */
    vars: number;
    /**
     * Static attributes to set on host element.
     *
     * Even indices: attribute name
     * Odd indices: attribute value
     */
    attributes?: string[];
    /**
     * A map of input names.
     *
     * The format is in: `{[actualPropertyName: string]:(string|[string, string])}`.
     *
     * Given:
     * ```
     * class MyComponent {
     *   @Input()
     *   publicInput1: string;
     *
     *   @Input('publicInput2')
     *   declaredInput2: string;
     * }
     * ```
     *
     * is described as:
     * ```
     * {
     *   publicInput1: 'publicInput1',
     *   declaredInput2: ['publicInput2', 'declaredInput2'],
     * }
     * ```
     *
     * Which the minifier may translate to:
     * ```
     * {
     *   minifiedPublicInput1: 'publicInput1',
     *   minifiedDeclaredInput2: ['publicInput2', 'declaredInput2'],
     * }
     * ```
     *
     * This allows the render to re-construct the minified, public, and declared names
     * of properties.
     *
     * NOTE:
     *  - Because declared and public name are usually same we only generate the array
     *    `['public', 'declared']` format when they differ.
     *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
     *    inconsistent behavior in that it uses declared names rather than minified or public. For
     *    this reason `NgOnChanges` will be deprecated and removed in future version and this
     *    API will be simplified to be consistent with `output`.
     */
    inputs?: {
        [P in keyof T]?: string | [string, string];
    };
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: {
        [P in keyof T]?: string;
    };
    /**
     * Function executed by the parent template to allow child directive to apply host bindings.
     */
    hostBindings?: HostBindingsFunction<T>;
    /**
     * Function to create instances of content queries associated with a given directive.
     */
    contentQueries?: ((dirIndex: number) => void);
    /** Refreshes content queries associated with directives in a given view */
    contentQueriesRefresh?: ((directiveIndex: number, queryIndex: number) => void);
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * See: {@link Directive.exportAs}
     */
    exportAs?: string;
    /**
     * Template function use for rendering DOM.
     *
     * This function has following structure.
     *
     * ```
     * function Template<T>(ctx:T, creationMode: boolean) {
     *   if (creationMode) {
     *     // Contains creation mode instructions.
     *   }
     *   // Contains binding update instructions
     * }
     * ```
     *
     * Common instructions are:
     * Creation mode instructions:
     *  - `elementStart`, `elementEnd`
     *  - `text`
     *  - `container`
     *  - `listener`
     *
     * Binding update instructions:
     * - `bind`
     * - `elementAttribute`
     * - `elementProperty`
     * - `elementClass`
     * - `elementStyle`
     *
     */
    template: ComponentTemplate<T>;
    /**
     * Additional set of instructions specific to view query processing. This could be seen as a
     * set of instruction to be inserted into the template function.
     *
     * Query-related instructions need to be pulled out to a specific function as a timing of
     * execution is different as compared to all other instructions (after change detection hooks but
     * before view hooks).
     */
    viewQuery?: ComponentQuery<T> | null;
    /**
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link ProvidersFeature}
     */
    features?: ComponentDefFeature[];
    /**
     * Defines template and style encapsulation options available for Component's {@link Component}.
     */
    encapsulation?: ViewEncapsulation;
    /**
     * Defines arbitrary developer-defined data to be stored on a renderer instance.
     * This is useful for renderers that delegate to other renderers.
     *
     * see: animation
     */
    data?: {
        [kind: string]: any;
    };
    /**
     * A set of styles that the component needs to be present for component to render correctly.
     */
    styles?: string[];
    /**
     * The strategy that the default change detector uses to detect changes.
     * When set, takes effect the next time change detection is triggered.
     */
    changeDetection?: ChangeDetectionStrategy;
    /**
     * Registry of directives and components that may be found in this component's view.
     *
     * The property is either an array of `DirectiveDef`s or a function which returns the array of
     * `DirectiveDef`s. The function is necessary to be able to support forward declarations.
     */
    directives?: DirectiveTypesOrFactory | null;
    /**
     * Registry of pipes that may be found in this component's view.
     *
     * The property is either an array of `PipeDefs`s or a function which returns the array of
     * `PipeDefs`s. The function is necessary to be able to support forward declarations.
     */
    pipes?: PipeTypesOrFactory | null;
}): never;
export declare function extractDirectiveDef(type: DirectiveType<any> & ComponentType<any>): DirectiveDef<any> | ComponentDef<any>;
export declare function extractPipeDef(type: PipeType<any>): PipeDef<any>;
export declare function defineNgModule<T>(def: {
    type: T;
} & Partial<NgModuleDef<T>>): never;
/**
 * Create a base definition
 *
 * # Example
 * ```
 * class ShouldBeInherited {
 *   static ngBaseDef = defineBase({
 *      ...
 *   })
 * }
 * @param baseDefinition The base definition parameters
 */
export declare function defineBase<T>(baseDefinition: {
    /**
     * A map of input names.
     *
     * The format is in: `{[actualPropertyName: string]:(string|[string, string])}`.
     *
     * Given:
     * ```
     * class MyComponent {
     *   @Input()
     *   publicInput1: string;
     *
     *   @Input('publicInput2')
     *   declaredInput2: string;
     * }
     * ```
     *
     * is described as:
     * ```
     * {
     *   publicInput1: 'publicInput1',
     *   declaredInput2: ['declaredInput2', 'publicInput2'],
     * }
     * ```
     *
     * Which the minifier may translate to:
     * ```
     * {
     *   minifiedPublicInput1: 'publicInput1',
     *   minifiedDeclaredInput2: [ 'declaredInput2', 'publicInput2'],
     * }
     * ```
     *
     * This allows the render to re-construct the minified, public, and declared names
     * of properties.
     *
     * NOTE:
     *  - Because declared and public name are usually same we only generate the array
     *    `['declared', 'public']` format when they differ.
     *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
     *    inconsistent behavior in that it uses declared names rather than minified or public. For
     *    this reason `NgOnChanges` will be deprecated and removed in future version and this
     *    API will be simplified to be consistent with `outputs`.
     */
    inputs?: {
        [P in keyof T]?: string | [string, string];
    };
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: {
        [P in keyof T]?: string;
    };
}): BaseDef<T>;
/**
 * Create a directive definition object.
 *
 * # Example
 * ```
 * class MyDirective {
 *   // Generated by Angular Template Compiler
 *   // [Symbol] syntax will not be supported by TypeScript until v2.7
 *   static ngDirectiveDef = defineDirective({
 *     ...
 *   });
 * }
 * ```
 */
export declare const defineDirective: <T>(directiveDefinition: {
    /**
     * Directive type, needed to configure the injector.
     */
    type: Type<T>;
    /** The selectors that will be used to match nodes to this directive. */
    selectors: (string | import("@angular/core/src/render3/interfaces/projection").SelectorFlags)[][];
    /**
     * Factory method used to create an instance of directive.
     */
    factory: (t: Type<T> | null) => T;
    /**
     * Static attributes to set on host element.
     *
     * Even indices: attribute name
     * Odd indices: attribute value
     */
    attributes?: string[] | undefined;
    /**
     * A map of input names.
     *
     * The format is in: `{[actualPropertyName: string]:(string|[string, string])}`.
     *
     * Given:
     * ```
     * class MyComponent {
     *   @Input()
     *   publicInput1: string;
     *
     *   @Input('publicInput2')
     *   declaredInput2: string;
     * }
     * ```
     *
     * is described as:
     * ```
     * {
     *   publicInput1: 'publicInput1',
     *   declaredInput2: ['declaredInput2', 'publicInput2'],
     * }
     * ```
     *
     * Which the minifier may translate to:
     * ```
     * {
     *   minifiedPublicInput1: 'publicInput1',
     *   minifiedDeclaredInput2: [ 'publicInput2', 'declaredInput2'],
     * }
     * ```
     *
     * This allows the render to re-construct the minified, public, and declared names
     * of properties.
     *
     * NOTE:
     *  - Because declared and public name are usually same we only generate the array
     *    `['declared', 'public']` format when they differ.
     *  - The reason why this API and `outputs` API is not the same is that `NgOnChanges` has
     *    inconsistent behavior in that it uses declared names rather than minified or public. For
     *    this reason `NgOnChanges` will be deprecated and removed in future version and this
     *    API will be simplified to be consistent with `output`.
     */
    inputs?: { [P in keyof T]?: string | [string, string] | undefined; } | undefined;
    /**
     * A map of output names.
     *
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    outputs?: { [P in keyof T]?: string | undefined; } | undefined;
    /**
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link ProvidersFeature}, {@link InheritDefinitionFeature}
     */
    features?: DirectiveDefFeature[] | undefined;
    /**
     * Function executed by the parent template to allow child directive to apply host bindings.
     */
    hostBindings?: HostBindingsFunction<T> | undefined;
    /**
     * Function to create instances of content queries associated with a given directive.
     */
    contentQueries?: ((directiveIndex: number) => void) | undefined;
    /** Refreshes content queries associated with directives in a given view */
    contentQueriesRefresh?: ((directiveIndex: number, queryIndex: number) => void) | undefined;
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * See: {@link Directive.exportAs}
     */
    exportAs?: string | undefined;
}) => never;
/**
 * Create a pipe definition object.
 *
 * # Example
 * ```
 * class MyPipe implements PipeTransform {
 *   // Generated by Angular Template Compiler
 *   static ngPipeDef = definePipe({
 *     ...
 *   });
 * }
 * ```
 * @param pipeDef Pipe definition generated by the compiler
 */
export declare function definePipe<T>(pipeDef: {
    /** Name of the pipe. Used for matching pipes in template to pipe defs. */
    name: string;
    /** Pipe class reference. Needed to extract pipe lifecycle hooks. */
    type: Type<T>;
    /** A factory for creating a pipe instance. */
    factory: (t: Type<T> | null) => T;
    /** Whether the pipe is pure. */
    pure?: boolean;
}): never;
/**
 * The following getter methods retrieve the definition form the type. Currently the retrieval
 * honors inheritance, but in the future we may change the rule to require that definitions are
 * explicit. This would require some sort of migration strategy.
 */
export declare function getComponentDef<T>(type: any): ComponentDef<T> | null;
export declare function getDirectiveDef<T>(type: any): DirectiveDef<T> | null;
export declare function getPipeDef<T>(type: any): PipeDef<T> | null;
export declare function getNgModuleDef<T>(type: any, throwNotFound: true): NgModuleDef<T>;
export declare function getNgModuleDef<T>(type: any): NgModuleDef<T> | null;
