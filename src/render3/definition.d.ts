import { ChangeDetectionStrategy } from '../change_detection/constants';
import { Provider } from '../core';
import { RendererType2 } from '../render/api';
import { Type } from '../type';
import { ComponentDef, ComponentDefFeature, ComponentTemplate, ComponentType, DirectiveDef, DirectiveDefFeature, DirectiveType, DirectiveTypesOrFactory, PipeDef, PipeType, PipeTypesOrFactory } from './interfaces/definition';
import { CssSelectorList, SelectorFlags } from './interfaces/projection';
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
    factory: () => T | ({
        0: T;
    } & any[]);
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
     * The format is in: `{[actualPropertyName: string]:string}`.
     *
     * Which the minifier may translate to: `{[minifiedPropertyName: string]:string}`.
     *
     * This allows the render to re-construct the minified and non-minified names
     * of properties.
     */
    inputs?: {
        [P in keyof T]?: string;
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
    hostBindings?: (directiveIndex: number, elementIndex: number) => void;
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
     * A list of optional features to apply.
     *
     * See: {@link NgOnChangesFeature}, {@link PublicFeature}
     */
    features?: ComponentDefFeature[];
    rendererType?: RendererType2;
    changeDetection?: ChangeDetectionStrategy;
    /**
     * Defines the set of injectable objects that are visible to a Directive and its light DOM
     * children.
     */
    providers?: Provider[];
    /**
     * Defines the set of injectable objects that are visible to its view DOM children.
     */
    viewProviders?: Provider[];
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
/**
 * Creates an NgOnChangesFeature function for a component's features list.
 *
 * It accepts an optional map of minified input property names to original property names,
 * if any input properties have a public alias.
 *
 * The NgOnChangesFeature function that is returned decorates a component with support for
 * the ngOnChanges lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * Example usage:
 *
 * ```
 * static ngComponentDef = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature({name: 'name'})]
 * });
 * ```
 *
 * @param inputPropertyNames Map of input property names, if they are aliased
 * @returns DirectiveDefFeature
 */
export declare function NgOnChangesFeature(inputPropertyNames?: {
    [key: string]: string;
}): DirectiveDefFeature;
export declare function PublicFeature<T>(definition: DirectiveDef<T>): void;
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
    type: Type<T>;
    selectors: (string | SelectorFlags)[][];
    factory: () => T | ({
        0: T;
    } & any[]);
    attributes?: string[] | undefined;
    inputs?: { [P in keyof T]?: string | undefined; } | undefined;
    outputs?: { [P in keyof T]?: string | undefined; } | undefined;
    features?: DirectiveDefFeature[] | undefined;
    hostBindings?: ((directiveIndex: number, elementIndex: number) => void) | undefined;
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
    factory: () => T;
    /** Whether the pipe is pure. */
    pure?: boolean;
}): never;
