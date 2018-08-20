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
import './ng_dev_mode';
import { ChangeDetectionStrategy } from '../change_detection/constants';
/** @type {?} */
const EMPTY = {};
/** @type {?} */
const EMPTY_ARRAY = [];
if (typeof ngDevMode !== 'undefined' && ngDevMode) {
    Object.freeze(EMPTY);
    Object.freeze(EMPTY_ARRAY);
}
/** @type {?} */
let _renderCompCount = 0;
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
 * @template T
 * @param {?} componentDefinition
 * @return {?}
 */
export function defineComponent(componentDefinition) {
    /** @type {?} */
    const type = componentDefinition.type;
    /** @type {?} */
    const pipeTypes = /** @type {?} */ ((componentDefinition.pipes));
    /** @type {?} */
    const directiveTypes = /** @type {?} */ ((componentDefinition.directives));
    /** @type {?} */
    const declaredInputs = /** @type {?} */ ({});
    /** @type {?} */
    const encapsulation = componentDefinition.encapsulation;
    /** @type {?} */
    const def = {
        type: type,
        diPublic: null,
        consts: componentDefinition.consts,
        vars: componentDefinition.vars,
        factory: componentDefinition.factory,
        template: componentDefinition.template || /** @type {?} */ ((null)),
        hostBindings: componentDefinition.hostBindings || null,
        contentQueries: componentDefinition.contentQueries || null,
        contentQueriesRefresh: componentDefinition.contentQueriesRefresh || null,
        attributes: componentDefinition.attributes || null,
        inputs: invertObject(componentDefinition.inputs, declaredInputs),
        declaredInputs: declaredInputs,
        outputs: invertObject(componentDefinition.outputs),
        exportAs: componentDefinition.exportAs || null,
        onInit: type.prototype.ngOnInit || null,
        doCheck: type.prototype.ngDoCheck || null,
        afterContentInit: type.prototype.ngAfterContentInit || null,
        afterContentChecked: type.prototype.ngAfterContentChecked || null,
        afterViewInit: type.prototype.ngAfterViewInit || null,
        afterViewChecked: type.prototype.ngAfterViewChecked || null,
        onDestroy: type.prototype.ngOnDestroy || null,
        onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
        directiveDefs: directiveTypes ?
            () => (typeof directiveTypes === 'function' ? directiveTypes() : directiveTypes)
                .map(extractDirectiveDef) :
            null,
        pipeDefs: pipeTypes ?
            () => (typeof pipeTypes === 'function' ? pipeTypes() : pipeTypes).map(extractPipeDef) :
            null,
        selectors: componentDefinition.selectors,
        viewQuery: componentDefinition.viewQuery || null,
        features: componentDefinition.features || null,
        data: componentDefinition.data || EMPTY,
        // TODO(misko): convert ViewEncapsulation into const enum so that it can be used directly in the
        // next line. Also `None` should be 0 not 2.
        encapsulation: encapsulation == null ? 2 : encapsulation,
        id: `c${_renderCompCount++}`,
        styles: EMPTY_ARRAY,
    };
    /** @type {?} */
    const feature = componentDefinition.features;
    feature && feature.forEach((fn) => fn(def));
    return /** @type {?} */ (def);
}
/**
 * @param {?} type
 * @return {?}
 */
export function extractDirectiveDef(type) {
    /** @type {?} */
    const def = type.ngComponentDef || type.ngDirectiveDef;
    if (ngDevMode && !def) {
        throw new Error(`'${type.name}' is neither 'ComponentType' or 'DirectiveType'.`);
    }
    return def;
}
/**
 * @param {?} type
 * @return {?}
 */
export function extractPipeDef(type) {
    /** @type {?} */
    const def = type.ngPipeDef;
    if (ngDevMode && !def) {
        throw new Error(`'${type.name}' is not a 'PipeType'.`);
    }
    return def;
}
/**
 * @template T
 * @param {?} def
 * @return {?}
 */
export function defineNgModule(def) {
    /** @type {?} */
    const res = {
        type: def.type,
        bootstrap: def.bootstrap || EMPTY_ARRAY,
        declarations: def.declarations || EMPTY_ARRAY,
        imports: def.imports || EMPTY_ARRAY,
        exports: def.exports || EMPTY_ARRAY,
        transitiveCompileScopes: null,
    };
    return /** @type {?} */ (res);
}
/**
 * Inverts an inputs or outputs lookup such that the keys, which were the
 * minified keys, are part of the values, and the values are parsed so that
 * the publicName of the property is the new key
 *
 * e.g. for
 *
 * ```
 * class Comp {
 * \@Input()
 *   propName1: string;
 *
 * \@Input('publicName')
 *   propName2: number;
 * }
 * ```
 *
 * will be serialized as
 *
 * ```
 * {
 *   a0: 'propName1',
 *   b1: ['publicName', 'propName2'],
 * }
 * ```
 *
 * becomes
 *
 * ```
 * {
 *  'propName1': 'a0',
 *  'publicName': 'b1'
 * }
 * ```
 *
 * Optionally the function can take `secondary` which will result in:
 *
 * ```
 * {
 *  'propName1': 'a0',
 *  'propName2': 'b1'
 * }
 * ```
 *
 * @param {?} obj
 * @param {?=} secondary
 * @return {?}
 */
function invertObject(obj, secondary) {
    if (obj == null)
        return EMPTY;
    /** @type {?} */
    const newLookup = {};
    for (const minifiedKey in obj) {
        if (obj.hasOwnProperty(minifiedKey)) {
            /** @type {?} */
            let publicName = obj[minifiedKey];
            /** @type {?} */
            let declaredName = publicName;
            if (Array.isArray(publicName)) {
                declaredName = publicName[1];
                publicName = publicName[0];
            }
            newLookup[publicName] = minifiedKey;
            if (secondary) {
                (secondary[declaredName] = minifiedKey);
            }
        }
    }
    return newLookup;
}
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
 * @template T
 * @param {?} baseDefinition The base definition parameters
 * @return {?}
 */
export function defineBase(baseDefinition) {
    /** @type {?} */
    const declaredInputs = /** @type {?} */ ({});
    return {
        inputs: invertObject(baseDefinition.inputs, declaredInputs),
        declaredInputs: declaredInputs,
        outputs: invertObject(baseDefinition.outputs),
    };
}
/** *
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
  @type {?} */
export const defineDirective = /** @type {?} */ ((defineComponent));
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
 * @template T
 * @param {?} pipeDef Pipe definition generated by the compiler
 * @return {?}
 */
export function definePipe(pipeDef) {
    return /** @type {?} */ ((/** @type {?} */ ({
        name: pipeDef.name,
        factory: pipeDef.factory,
        pure: pipeDef.pure !== false,
        onDestroy: pipeDef.type.prototype.ngOnDestroy || null
    })));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtCQUErQixDQUFDOztBQVF0RSxNQUFNLEtBQUssR0FBTyxFQUFFLENBQUM7O0FBQ3JCLE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztBQUM5QixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7SUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQzVCOztBQUNELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJ6QixNQUFNLDBCQUE2QixtQkFzTmxDOztJQUNDLE1BQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQzs7SUFDdEMsTUFBTSxTQUFTLHNCQUFHLG1CQUFtQixDQUFDLEtBQUssR0FBRzs7SUFDOUMsTUFBTSxjQUFjLHNCQUFHLG1CQUFtQixDQUFDLFVBQVUsR0FBRzs7SUFDeEQsTUFBTSxjQUFjLHFCQUE0QixFQUFTLEVBQUM7O0lBQzFELE1BQU0sYUFBYSxHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQzs7SUFDeEQsTUFBTSxHQUFHLEdBQThCO1FBQ3JDLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLElBQUk7UUFDZCxNQUFNLEVBQUUsbUJBQW1CLENBQUMsTUFBTTtRQUNsQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSTtRQUM5QixPQUFPLEVBQUUsbUJBQW1CLENBQUMsT0FBTztRQUNwQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsUUFBUSx1QkFBSSxJQUFJLEVBQUU7UUFDaEQsWUFBWSxFQUFFLG1CQUFtQixDQUFDLFlBQVksSUFBSSxJQUFJO1FBQ3RELGNBQWMsRUFBRSxtQkFBbUIsQ0FBQyxjQUFjLElBQUksSUFBSTtRQUMxRCxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxxQkFBcUIsSUFBSSxJQUFJO1FBQ3hFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxVQUFVLElBQUksSUFBSTtRQUNsRCxNQUFNLEVBQUUsWUFBWSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUM7UUFDaEUsY0FBYyxFQUFFLGNBQWM7UUFDOUIsT0FBTyxFQUFFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7UUFDbEQsUUFBUSxFQUFFLG1CQUFtQixDQUFDLFFBQVEsSUFBSSxJQUFJO1FBQzlDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxJQUFJO1FBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxJQUFJO1FBQ3pDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLElBQUksSUFBSTtRQUMzRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixJQUFJLElBQUk7UUFDakUsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxJQUFJLElBQUk7UUFDckQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJO1FBQzNELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJO1FBQzdDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxlQUFlLEtBQUssdUJBQXVCLENBQUMsTUFBTTtRQUM5RSxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDM0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQWMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7aUJBQ3JFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSTtRQUNSLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqQixHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLElBQUk7UUFDUixTQUFTLEVBQUUsbUJBQW1CLENBQUMsU0FBUztRQUN4QyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxJQUFJLElBQUk7UUFDaEQsUUFBUSxFQUFFLG1CQUFtQixDQUFDLFFBQVEsSUFBSSxJQUFJO1FBQzlDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLElBQUksS0FBSzs7O1FBR3ZDLGFBQWEsRUFBRSxhQUFhLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQThCLENBQUMsQ0FBQyxhQUFhO1FBQ3JGLEVBQUUsRUFBRSxJQUFJLGdCQUFnQixFQUFFLEVBQUU7UUFDNUIsTUFBTSxFQUFFLFdBQVc7S0FDcEIsQ0FBQzs7SUFDRixNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7SUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVDLHlCQUFPLEdBQVksRUFBQztDQUNyQjs7Ozs7QUFFRCxNQUFNLDhCQUE4QixJQUE0Qzs7SUFFOUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ3ZELElBQUksU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxrREFBa0QsQ0FBQyxDQUFDO0tBQ2xGO0lBQ0QsT0FBTyxHQUFHLENBQUM7Q0FDWjs7Ozs7QUFFRCxNQUFNLHlCQUF5QixJQUFtQjs7SUFDaEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMzQixJQUFJLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksd0JBQXdCLENBQUMsQ0FBQztLQUN4RDtJQUNELE9BQU8sR0FBRyxDQUFDO0NBQ1o7Ozs7OztBQUVELE1BQU0seUJBQTRCLEdBQXVEOztJQUN2RixNQUFNLEdBQUcsR0FBMkI7UUFDbEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1FBQ2QsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTLElBQUksV0FBVztRQUN2QyxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksSUFBSSxXQUFXO1FBQzdDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxJQUFJLFdBQVc7UUFDbkMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksV0FBVztRQUNuQyx1QkFBdUIsRUFBRSxJQUFJO0tBQzlCLENBQUM7SUFDRix5QkFBTyxHQUFZLEVBQUM7Q0FDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnREQsc0JBQXNCLEdBQVEsRUFBRSxTQUFlO0lBQzdDLElBQUksR0FBRyxJQUFJLElBQUk7UUFBRSxPQUFPLEtBQUssQ0FBQzs7SUFDOUIsTUFBTSxTQUFTLEdBQVEsRUFBRSxDQUFDO0lBQzFCLEtBQUssTUFBTSxXQUFXLElBQUksR0FBRyxFQUFFO1FBQzdCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTs7WUFDbkMsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDOztZQUNsQyxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM3QixZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUNwQyxJQUFJLFNBQVMsRUFBRTtnQkFDYixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQzthQUN6QztTQUNGO0tBQ0Y7SUFDRCxPQUFPLFNBQVMsQ0FBQztDQUNsQjs7Ozs7Ozs7Ozs7Ozs7O0FBY0QsTUFBTSxxQkFBd0IsY0F5RDdCOztJQUNDLE1BQU0sY0FBYyxxQkFBd0IsRUFBUyxFQUFDO0lBQ3RELE9BQU87UUFDTCxNQUFNLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDO1FBQzNELGNBQWMsRUFBRSxjQUFjO1FBQzlCLE9BQU8sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztLQUM5QyxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQWdCRCxhQUFhLGVBQWUsc0JBQUcsZUFBc0IsR0F5R3pDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCWixNQUFNLHFCQUF3QixPQVk3QjtJQUNDLHlCQUFPLG1CQUFxQjtRQUMxQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUs7UUFDNUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJO0tBQ3RELEVBQVUsRUFBQztDQUNiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJy4vbmdfZGV2X21vZGUnO1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL2NvbnN0YW50cyc7XG5pbXBvcnQge1Byb3ZpZGVyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge05nTW9kdWxlRGVmLCBOZ01vZHVsZURlZkludGVybmFsfSBmcm9tICcuLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcblxuaW1wb3J0IHtCYXNlRGVmLCBDb21wb25lbnREZWZGZWF0dXJlLCBDb21wb25lbnREZWZJbnRlcm5hbCwgQ29tcG9uZW50UXVlcnksIENvbXBvbmVudFRlbXBsYXRlLCBDb21wb25lbnRUeXBlLCBEaXJlY3RpdmVEZWZGZWF0dXJlLCBEaXJlY3RpdmVEZWZJbnRlcm5hbCwgRGlyZWN0aXZlVHlwZSwgRGlyZWN0aXZlVHlwZXNPckZhY3RvcnksIFBpcGVEZWZJbnRlcm5hbCwgUGlwZVR5cGUsIFBpcGVUeXBlc09yRmFjdG9yeX0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtDc3NTZWxlY3Rvckxpc3QsIFNlbGVjdG9yRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9wcm9qZWN0aW9uJztcblxuY29uc3QgRU1QVFk6IHt9ID0ge307XG5jb25zdCBFTVBUWV9BUlJBWTogYW55W10gPSBbXTtcbmlmICh0eXBlb2YgbmdEZXZNb2RlICE9PSAndW5kZWZpbmVkJyAmJiBuZ0Rldk1vZGUpIHtcbiAgT2JqZWN0LmZyZWV6ZShFTVBUWSk7XG4gIE9iamVjdC5mcmVlemUoRU1QVFlfQVJSQVkpO1xufVxubGV0IF9yZW5kZXJDb21wQ291bnQgPSAwO1xuXG4vKipcbiAqIENyZWF0ZSBhIGNvbXBvbmVudCBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKlxuICogIyBFeGFtcGxlXG4gKiBgYGBcbiAqIGNsYXNzIE15RGlyZWN0aXZlIHtcbiAqICAgLy8gR2VuZXJhdGVkIGJ5IEFuZ3VsYXIgVGVtcGxhdGUgQ29tcGlsZXJcbiAqICAgLy8gW1N5bWJvbF0gc3ludGF4IHdpbGwgbm90IGJlIHN1cHBvcnRlZCBieSBUeXBlU2NyaXB0IHVudGlsIHYyLjdcbiAqICAgc3RhdGljIG5nQ29tcG9uZW50RGVmID0gZGVmaW5lQ29tcG9uZW50KHtcbiAqICAgICAuLi5cbiAqICAgfSk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUNvbXBvbmVudDxUPihjb21wb25lbnREZWZpbml0aW9uOiB7XG4gIC8qKlxuICAgKiBEaXJlY3RpdmUgdHlwZSwgbmVlZGVkIHRvIGNvbmZpZ3VyZSB0aGUgaW5qZWN0b3IuXG4gICAqL1xuICB0eXBlOiBUeXBlPFQ+O1xuXG4gIC8qKiBUaGUgc2VsZWN0b3JzIHRoYXQgd2lsbCBiZSB1c2VkIHRvIG1hdGNoIG5vZGVzIHRvIHRoaXMgY29tcG9uZW50LiAqL1xuICBzZWxlY3RvcnM6IENzc1NlbGVjdG9yTGlzdDtcblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdXNlZCB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgZGlyZWN0aXZlLlxuICAgKi9cbiAgZmFjdG9yeTogKCkgPT4gVDtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBub2RlcywgbG9jYWwgcmVmcywgYW5kIHBpcGVzIGluIHRoaXMgY29tcG9uZW50IHRlbXBsYXRlLlxuICAgKlxuICAgKiBVc2VkIHRvIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBjb21wb25lbnQncyBMVmlld0RhdGEgYXJyYXksIHNvIHdlXG4gICAqIGNhbiBwcmUtZmlsbCB0aGUgYXJyYXkgYW5kIHNldCB0aGUgYmluZGluZyBzdGFydCBpbmRleC5cbiAgICovXG4gIC8vIFRPRE8oa2FyYSk6IHJlbW92ZSBxdWVyaWVzIGZyb20gdGhpcyBjb3VudFxuICBjb25zdHM6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBiaW5kaW5ncyBpbiB0aGlzIGNvbXBvbmVudCB0ZW1wbGF0ZSAoaW5jbHVkaW5nIHB1cmUgZm4gYmluZGluZ3MpLlxuICAgKlxuICAgKiBVc2VkIHRvIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBjb21wb25lbnQncyBMVmlld0RhdGEgYXJyYXksIHNvIHdlXG4gICAqIGNhbiBwcmUtZmlsbCB0aGUgYXJyYXkgYW5kIHNldCB0aGUgaG9zdCBiaW5kaW5nIHN0YXJ0IGluZGV4LlxuICAgKi9cbiAgdmFyczogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBTdGF0aWMgYXR0cmlidXRlcyB0byBzZXQgb24gaG9zdCBlbGVtZW50LlxuICAgKlxuICAgKiBFdmVuIGluZGljZXM6IGF0dHJpYnV0ZSBuYW1lXG4gICAqIE9kZCBpbmRpY2VzOiBhdHRyaWJ1dGUgdmFsdWVcbiAgICovXG4gIGF0dHJpYnV0ZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogQSBtYXAgb2YgaW5wdXQgbmFtZXMuXG4gICAqXG4gICAqIFRoZSBmb3JtYXQgaXMgaW46IGB7W2FjdHVhbFByb3BlcnR5TmFtZTogc3RyaW5nXTooc3RyaW5nfFtzdHJpbmcsIHN0cmluZ10pfWAuXG4gICAqXG4gICAqIEdpdmVuOlxuICAgKiBgYGBcbiAgICogY2xhc3MgTXlDb21wb25lbnQge1xuICAgKiAgIEBJbnB1dCgpXG4gICAqICAgcHVibGljSW5wdXQxOiBzdHJpbmc7XG4gICAqXG4gICAqICAgQElucHV0KCdwdWJsaWNJbnB1dDInKVxuICAgKiAgIGRlY2xhcmVkSW5wdXQyOiBzdHJpbmc7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIGlzIGRlc2NyaWJlZCBhczpcbiAgICogYGBgXG4gICAqIHtcbiAgICogICBwdWJsaWNJbnB1dDE6ICdwdWJsaWNJbnB1dDEnLFxuICAgKiAgIGRlY2xhcmVkSW5wdXQyOiBbJ2RlY2xhcmVkSW5wdXQyJywgJ3B1YmxpY0lucHV0MiddLFxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBXaGljaCB0aGUgbWluaWZpZXIgbWF5IHRyYW5zbGF0ZSB0bzpcbiAgICogYGBgXG4gICAqIHtcbiAgICogICBtaW5pZmllZFB1YmxpY0lucHV0MTogJ3B1YmxpY0lucHV0MScsXG4gICAqICAgbWluaWZpZWREZWNsYXJlZElucHV0MjogWyAncHVibGljSW5wdXQyJywgJ2RlY2xhcmVkSW5wdXQyJ10sXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFRoaXMgYWxsb3dzIHRoZSByZW5kZXIgdG8gcmUtY29uc3RydWN0IHRoZSBtaW5pZmllZCwgcHVibGljLCBhbmQgZGVjbGFyZWQgbmFtZXNcbiAgICogb2YgcHJvcGVydGllcy5cbiAgICpcbiAgICogTk9URTpcbiAgICogIC0gQmVjYXVzZSBkZWNsYXJlZCBhbmQgcHVibGljIG5hbWUgYXJlIHVzdWFsbHkgc2FtZSB3ZSBvbmx5IGdlbmVyYXRlIHRoZSBhcnJheVxuICAgKiAgICBgWydkZWNsYXJlZCcsICdwdWJsaWMnXWAgZm9ybWF0IHdoZW4gdGhleSBkaWZmZXIuXG4gICAqICAtIFRoZSByZWFzb24gd2h5IHRoaXMgQVBJIGFuZCBgb3V0cHV0c2AgQVBJIGlzIG5vdCB0aGUgc2FtZSBpcyB0aGF0IGBOZ09uQ2hhbmdlc2AgaGFzXG4gICAqICAgIGluY29uc2lzdGVudCBiZWhhdmlvciBpbiB0aGF0IGl0IHVzZXMgZGVjbGFyZWQgbmFtZXMgcmF0aGVyIHRoYW4gbWluaWZpZWQgb3IgcHVibGljLiBGb3JcbiAgICogICAgdGhpcyByZWFzb24gYE5nT25DaGFuZ2VzYCB3aWxsIGJlIGRlcHJlY2F0ZWQgYW5kIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb24gYW5kIHRoaXNcbiAgICogICAgQVBJIHdpbGwgYmUgc2ltcGxpZmllZCB0byBiZSBjb25zaXN0ZW50IHdpdGggYG91dHB1dGAuXG4gICAqL1xuICBpbnB1dHM/OiB7W1AgaW4ga2V5b2YgVF0/OiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddfTtcblxuICAvKipcbiAgICogQSBtYXAgb2Ygb3V0cHV0IG5hbWVzLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGluOiBge1thY3R1YWxQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFdoaWNoIHRoZSBtaW5pZmllciBtYXkgdHJhbnNsYXRlIHRvOiBge1ttaW5pZmllZFByb3BlcnR5TmFtZTogc3RyaW5nXTpzdHJpbmd9YC5cbiAgICpcbiAgICogVGhpcyBhbGxvd3MgdGhlIHJlbmRlciB0byByZS1jb25zdHJ1Y3QgdGhlIG1pbmlmaWVkIGFuZCBub24tbWluaWZpZWQgbmFtZXNcbiAgICogb2YgcHJvcGVydGllcy5cbiAgICovXG4gIG91dHB1dHM/OiB7W1AgaW4ga2V5b2YgVF0/OiBzdHJpbmd9O1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBleGVjdXRlZCBieSB0aGUgcGFyZW50IHRlbXBsYXRlIHRvIGFsbG93IGNoaWxkIGRpcmVjdGl2ZSB0byBhcHBseSBob3N0IGJpbmRpbmdzLlxuICAgKi9cbiAgaG9zdEJpbmRpbmdzPzogKGRpcmVjdGl2ZUluZGV4OiBudW1iZXIsIGVsZW1lbnRJbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjcmVhdGUgaW5zdGFuY2VzIG9mIGNvbnRlbnQgcXVlcmllcyBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBkaXJlY3RpdmUuXG4gICAqL1xuICBjb250ZW50UXVlcmllcz86ICgoKSA9PiB2b2lkKTtcblxuICAvKiogUmVmcmVzaGVzIGNvbnRlbnQgcXVlcmllcyBhc3NvY2lhdGVkIHdpdGggZGlyZWN0aXZlcyBpbiBhIGdpdmVuIHZpZXcgKi9cbiAgY29udGVudFF1ZXJpZXNSZWZyZXNoPzogKChkaXJlY3RpdmVJbmRleDogbnVtYmVyLCBxdWVyeUluZGV4OiBudW1iZXIpID0+IHZvaWQpO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBuYW1lIHRoYXQgY2FuIGJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlIHRvIGFzc2lnbiB0aGlzIGRpcmVjdGl2ZSB0byBhIHZhcmlhYmxlLlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBEaXJlY3RpdmUuZXhwb3J0QXN9XG4gICAqL1xuICBleHBvcnRBcz86IHN0cmluZztcblxuICAvKipcbiAgICogVGVtcGxhdGUgZnVuY3Rpb24gdXNlIGZvciByZW5kZXJpbmcgRE9NLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGhhcyBmb2xsb3dpbmcgc3RydWN0dXJlLlxuICAgKlxuICAgKiBgYGBcbiAgICogZnVuY3Rpb24gVGVtcGxhdGU8VD4oY3R4OlQsIGNyZWF0aW9uTW9kZTogYm9vbGVhbikge1xuICAgKiAgIGlmIChjcmVhdGlvbk1vZGUpIHtcbiAgICogICAgIC8vIENvbnRhaW5zIGNyZWF0aW9uIG1vZGUgaW5zdHJ1Y3Rpb25zLlxuICAgKiAgIH1cbiAgICogICAvLyBDb250YWlucyBiaW5kaW5nIHVwZGF0ZSBpbnN0cnVjdGlvbnNcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQ29tbW9uIGluc3RydWN0aW9ucyBhcmU6XG4gICAqIENyZWF0aW9uIG1vZGUgaW5zdHJ1Y3Rpb25zOlxuICAgKiAgLSBgZWxlbWVudFN0YXJ0YCwgYGVsZW1lbnRFbmRgXG4gICAqICAtIGB0ZXh0YFxuICAgKiAgLSBgY29udGFpbmVyYFxuICAgKiAgLSBgbGlzdGVuZXJgXG4gICAqXG4gICAqIEJpbmRpbmcgdXBkYXRlIGluc3RydWN0aW9uczpcbiAgICogLSBgYmluZGBcbiAgICogLSBgZWxlbWVudEF0dHJpYnV0ZWBcbiAgICogLSBgZWxlbWVudFByb3BlcnR5YFxuICAgKiAtIGBlbGVtZW50Q2xhc3NgXG4gICAqIC0gYGVsZW1lbnRTdHlsZWBcbiAgICpcbiAgICovXG4gIHRlbXBsYXRlOiBDb21wb25lbnRUZW1wbGF0ZTxUPjtcblxuICAvKipcbiAgICogQWRkaXRpb25hbCBzZXQgb2YgaW5zdHJ1Y3Rpb25zIHNwZWNpZmljIHRvIHZpZXcgcXVlcnkgcHJvY2Vzc2luZy4gVGhpcyBjb3VsZCBiZSBzZWVuIGFzIGFcbiAgICogc2V0IG9mIGluc3RydWN0aW9uIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHRlbXBsYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBRdWVyeS1yZWxhdGVkIGluc3RydWN0aW9ucyBuZWVkIHRvIGJlIHB1bGxlZCBvdXQgdG8gYSBzcGVjaWZpYyBmdW5jdGlvbiBhcyBhIHRpbWluZyBvZlxuICAgKiBleGVjdXRpb24gaXMgZGlmZmVyZW50IGFzIGNvbXBhcmVkIHRvIGFsbCBvdGhlciBpbnN0cnVjdGlvbnMgKGFmdGVyIGNoYW5nZSBkZXRlY3Rpb24gaG9va3MgYnV0XG4gICAqIGJlZm9yZSB2aWV3IGhvb2tzKS5cbiAgICovXG4gIHZpZXdRdWVyeT86IENvbXBvbmVudFF1ZXJ5PFQ+fCBudWxsO1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2Ygb3B0aW9uYWwgZmVhdHVyZXMgdG8gYXBwbHkuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIE5nT25DaGFuZ2VzRmVhdHVyZX0sIHtAbGluayBQdWJsaWNGZWF0dXJlfVxuICAgKi9cbiAgZmVhdHVyZXM/OiBDb21wb25lbnREZWZGZWF0dXJlW107XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGVtcGxhdGUgYW5kIHN0eWxlIGVuY2Fwc3VsYXRpb24gb3B0aW9ucyBhdmFpbGFibGUgZm9yIENvbXBvbmVudCdzIHtAbGluayBDb21wb25lbnR9LlxuICAgKi9cbiAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGFyYml0cmFyeSBkZXZlbG9wZXItZGVmaW5lZCBkYXRhIHRvIGJlIHN0b3JlZCBvbiBhIHJlbmRlcmVyIGluc3RhbmNlLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgcmVuZGVyZXJzIHRoYXQgZGVsZWdhdGUgdG8gb3RoZXIgcmVuZGVyZXJzLlxuICAgKlxuICAgKiBzZWU6IGFuaW1hdGlvblxuICAgKi9cbiAgZGF0YT86IHtba2luZDogc3RyaW5nXTogYW55fTtcblxuICAvKipcbiAgICogQSBzZXQgb2Ygc3R5bGVzIHRoYXQgdGhlIGNvbXBvbmVudCBuZWVkcyB0byBiZSBwcmVzZW50IGZvciBjb21wb25lbnQgdG8gcmVuZGVyIGNvcnJlY3RseS5cbiAgICovXG4gIHN0eWxlcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgc3RyYXRlZ3kgdGhhdCB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0b3IgdXNlcyB0byBkZXRlY3QgY2hhbmdlcy5cbiAgICogV2hlbiBzZXQsIHRha2VzIGVmZmVjdCB0aGUgbmV4dCB0aW1lIGNoYW5nZSBkZXRlY3Rpb24gaXMgdHJpZ2dlcmVkLlxuICAgKi9cbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIHNldCBvZiBpbmplY3RhYmxlIG9iamVjdHMgdGhhdCBhcmUgdmlzaWJsZSB0byBhIERpcmVjdGl2ZSBhbmQgaXRzIGxpZ2h0IERPTVxuICAgKiBjaGlsZHJlbi5cbiAgICovXG4gIHByb3ZpZGVycz86IFByb3ZpZGVyW107XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIHNldCBvZiBpbmplY3RhYmxlIG9iamVjdHMgdGhhdCBhcmUgdmlzaWJsZSB0byBpdHMgdmlldyBET00gY2hpbGRyZW4uXG4gICAqL1xuICB2aWV3UHJvdmlkZXJzPzogUHJvdmlkZXJbXTtcblxuICAvKipcbiAgICogUmVnaXN0cnkgb2YgZGlyZWN0aXZlcyBhbmQgY29tcG9uZW50cyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIGNvbXBvbmVudCdzIHZpZXcuXG4gICAqXG4gICAqIFRoZSBwcm9wZXJ0eSBpcyBlaXRoZXIgYW4gYXJyYXkgb2YgYERpcmVjdGl2ZURlZmBzIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0aGUgYXJyYXkgb2ZcbiAgICogYERpcmVjdGl2ZURlZmBzLiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAgICovXG4gIGRpcmVjdGl2ZXM/OiBEaXJlY3RpdmVUeXBlc09yRmFjdG9yeSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFJlZ2lzdHJ5IG9mIHBpcGVzIHRoYXQgbWF5IGJlIGZvdW5kIGluIHRoaXMgY29tcG9uZW50J3Mgdmlldy5cbiAgICpcbiAgICogVGhlIHByb3BlcnR5IGlzIGVpdGhlciBhbiBhcnJheSBvZiBgUGlwZURlZnNgcyBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGFycmF5IG9mXG4gICAqIGBQaXBlRGVmc2BzLiBUaGUgZnVuY3Rpb24gaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gc3VwcG9ydCBmb3J3YXJkIGRlY2xhcmF0aW9ucy5cbiAgICovXG4gIHBpcGVzPzogUGlwZVR5cGVzT3JGYWN0b3J5IHwgbnVsbDtcbn0pOiBuZXZlciB7XG4gIGNvbnN0IHR5cGUgPSBjb21wb25lbnREZWZpbml0aW9uLnR5cGU7XG4gIGNvbnN0IHBpcGVUeXBlcyA9IGNvbXBvbmVudERlZmluaXRpb24ucGlwZXMgITtcbiAgY29uc3QgZGlyZWN0aXZlVHlwZXMgPSBjb21wb25lbnREZWZpbml0aW9uLmRpcmVjdGl2ZXMgITtcbiAgY29uc3QgZGVjbGFyZWRJbnB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge30gYXMgYW55O1xuICBjb25zdCBlbmNhcHN1bGF0aW9uID0gY29tcG9uZW50RGVmaW5pdGlvbi5lbmNhcHN1bGF0aW9uO1xuICBjb25zdCBkZWY6IENvbXBvbmVudERlZkludGVybmFsPGFueT4gPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkaVB1YmxpYzogbnVsbCxcbiAgICBjb25zdHM6IGNvbXBvbmVudERlZmluaXRpb24uY29uc3RzLFxuICAgIHZhcnM6IGNvbXBvbmVudERlZmluaXRpb24udmFycyxcbiAgICBmYWN0b3J5OiBjb21wb25lbnREZWZpbml0aW9uLmZhY3RvcnksXG4gICAgdGVtcGxhdGU6IGNvbXBvbmVudERlZmluaXRpb24udGVtcGxhdGUgfHwgbnVsbCAhLFxuICAgIGhvc3RCaW5kaW5nczogY29tcG9uZW50RGVmaW5pdGlvbi5ob3N0QmluZGluZ3MgfHwgbnVsbCxcbiAgICBjb250ZW50UXVlcmllczogY29tcG9uZW50RGVmaW5pdGlvbi5jb250ZW50UXVlcmllcyB8fCBudWxsLFxuICAgIGNvbnRlbnRRdWVyaWVzUmVmcmVzaDogY29tcG9uZW50RGVmaW5pdGlvbi5jb250ZW50UXVlcmllc1JlZnJlc2ggfHwgbnVsbCxcbiAgICBhdHRyaWJ1dGVzOiBjb21wb25lbnREZWZpbml0aW9uLmF0dHJpYnV0ZXMgfHwgbnVsbCxcbiAgICBpbnB1dHM6IGludmVydE9iamVjdChjb21wb25lbnREZWZpbml0aW9uLmlucHV0cywgZGVjbGFyZWRJbnB1dHMpLFxuICAgIGRlY2xhcmVkSW5wdXRzOiBkZWNsYXJlZElucHV0cyxcbiAgICBvdXRwdXRzOiBpbnZlcnRPYmplY3QoY29tcG9uZW50RGVmaW5pdGlvbi5vdXRwdXRzKSxcbiAgICBleHBvcnRBczogY29tcG9uZW50RGVmaW5pdGlvbi5leHBvcnRBcyB8fCBudWxsLFxuICAgIG9uSW5pdDogdHlwZS5wcm90b3R5cGUubmdPbkluaXQgfHwgbnVsbCxcbiAgICBkb0NoZWNrOiB0eXBlLnByb3RvdHlwZS5uZ0RvQ2hlY2sgfHwgbnVsbCxcbiAgICBhZnRlckNvbnRlbnRJbml0OiB0eXBlLnByb3RvdHlwZS5uZ0FmdGVyQ29udGVudEluaXQgfHwgbnVsbCxcbiAgICBhZnRlckNvbnRlbnRDaGVja2VkOiB0eXBlLnByb3RvdHlwZS5uZ0FmdGVyQ29udGVudENoZWNrZWQgfHwgbnVsbCxcbiAgICBhZnRlclZpZXdJbml0OiB0eXBlLnByb3RvdHlwZS5uZ0FmdGVyVmlld0luaXQgfHwgbnVsbCxcbiAgICBhZnRlclZpZXdDaGVja2VkOiB0eXBlLnByb3RvdHlwZS5uZ0FmdGVyVmlld0NoZWNrZWQgfHwgbnVsbCxcbiAgICBvbkRlc3Ryb3k6IHR5cGUucHJvdG90eXBlLm5nT25EZXN0cm95IHx8IG51bGwsXG4gICAgb25QdXNoOiBjb21wb25lbnREZWZpbml0aW9uLmNoYW5nZURldGVjdGlvbiA9PT0gQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGRpcmVjdGl2ZURlZnM6IGRpcmVjdGl2ZVR5cGVzID9cbiAgICAgICAgKCkgPT4gKHR5cGVvZiBkaXJlY3RpdmVUeXBlcyA9PT0gJ2Z1bmN0aW9uJyA/IGRpcmVjdGl2ZVR5cGVzKCkgOiBkaXJlY3RpdmVUeXBlcylcbiAgICAgICAgICAgICAgICAgIC5tYXAoZXh0cmFjdERpcmVjdGl2ZURlZikgOlxuICAgICAgICBudWxsLFxuICAgIHBpcGVEZWZzOiBwaXBlVHlwZXMgP1xuICAgICAgICAoKSA9PiAodHlwZW9mIHBpcGVUeXBlcyA9PT0gJ2Z1bmN0aW9uJyA/IHBpcGVUeXBlcygpIDogcGlwZVR5cGVzKS5tYXAoZXh0cmFjdFBpcGVEZWYpIDpcbiAgICAgICAgbnVsbCxcbiAgICBzZWxlY3RvcnM6IGNvbXBvbmVudERlZmluaXRpb24uc2VsZWN0b3JzLFxuICAgIHZpZXdRdWVyeTogY29tcG9uZW50RGVmaW5pdGlvbi52aWV3UXVlcnkgfHwgbnVsbCxcbiAgICBmZWF0dXJlczogY29tcG9uZW50RGVmaW5pdGlvbi5mZWF0dXJlcyB8fCBudWxsLFxuICAgIGRhdGE6IGNvbXBvbmVudERlZmluaXRpb24uZGF0YSB8fCBFTVBUWSxcbiAgICAvLyBUT0RPKG1pc2tvKTogY29udmVydCBWaWV3RW5jYXBzdWxhdGlvbiBpbnRvIGNvbnN0IGVudW0gc28gdGhhdCBpdCBjYW4gYmUgdXNlZCBkaXJlY3RseSBpbiB0aGVcbiAgICAvLyBuZXh0IGxpbmUuIEFsc28gYE5vbmVgIHNob3VsZCBiZSAwIG5vdCAyLlxuICAgIGVuY2Fwc3VsYXRpb246IGVuY2Fwc3VsYXRpb24gPT0gbnVsbCA/IDIgLyogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSAqLyA6IGVuY2Fwc3VsYXRpb24sXG4gICAgaWQ6IGBjJHtfcmVuZGVyQ29tcENvdW50Kyt9YCxcbiAgICBzdHlsZXM6IEVNUFRZX0FSUkFZLFxuICB9O1xuICBjb25zdCBmZWF0dXJlID0gY29tcG9uZW50RGVmaW5pdGlvbi5mZWF0dXJlcztcbiAgZmVhdHVyZSAmJiBmZWF0dXJlLmZvckVhY2goKGZuKSA9PiBmbihkZWYpKTtcbiAgcmV0dXJuIGRlZiBhcyBuZXZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REaXJlY3RpdmVEZWYodHlwZTogRGlyZWN0aXZlVHlwZTxhbnk+JiBDb21wb25lbnRUeXBlPGFueT4pOlxuICAgIERpcmVjdGl2ZURlZkludGVybmFsPGFueT58Q29tcG9uZW50RGVmSW50ZXJuYWw8YW55PiB7XG4gIGNvbnN0IGRlZiA9IHR5cGUubmdDb21wb25lbnREZWYgfHwgdHlwZS5uZ0RpcmVjdGl2ZURlZjtcbiAgaWYgKG5nRGV2TW9kZSAmJiAhZGVmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAnJHt0eXBlLm5hbWV9JyBpcyBuZWl0aGVyICdDb21wb25lbnRUeXBlJyBvciAnRGlyZWN0aXZlVHlwZScuYCk7XG4gIH1cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RQaXBlRGVmKHR5cGU6IFBpcGVUeXBlPGFueT4pOiBQaXBlRGVmSW50ZXJuYWw8YW55PiB7XG4gIGNvbnN0IGRlZiA9IHR5cGUubmdQaXBlRGVmO1xuICBpZiAobmdEZXZNb2RlICYmICFkZWYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCcke3R5cGUubmFtZX0nIGlzIG5vdCBhICdQaXBlVHlwZScuYCk7XG4gIH1cbiAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZU5nTW9kdWxlPFQ+KGRlZjoge3R5cGU6IFR9ICYgUGFydGlhbDxOZ01vZHVsZURlZjxULCBhbnksIGFueSwgYW55Pj4pOiBuZXZlciB7XG4gIGNvbnN0IHJlczogTmdNb2R1bGVEZWZJbnRlcm5hbDxUPiA9IHtcbiAgICB0eXBlOiBkZWYudHlwZSxcbiAgICBib290c3RyYXA6IGRlZi5ib290c3RyYXAgfHwgRU1QVFlfQVJSQVksXG4gICAgZGVjbGFyYXRpb25zOiBkZWYuZGVjbGFyYXRpb25zIHx8IEVNUFRZX0FSUkFZLFxuICAgIGltcG9ydHM6IGRlZi5pbXBvcnRzIHx8IEVNUFRZX0FSUkFZLFxuICAgIGV4cG9ydHM6IGRlZi5leHBvcnRzIHx8IEVNUFRZX0FSUkFZLFxuICAgIHRyYW5zaXRpdmVDb21waWxlU2NvcGVzOiBudWxsLFxuICB9O1xuICByZXR1cm4gcmVzIGFzIG5ldmVyO1xufVxuXG4vKipcbiAqIEludmVydHMgYW4gaW5wdXRzIG9yIG91dHB1dHMgbG9va3VwIHN1Y2ggdGhhdCB0aGUga2V5cywgd2hpY2ggd2VyZSB0aGVcbiAqIG1pbmlmaWVkIGtleXMsIGFyZSBwYXJ0IG9mIHRoZSB2YWx1ZXMsIGFuZCB0aGUgdmFsdWVzIGFyZSBwYXJzZWQgc28gdGhhdFxuICogdGhlIHB1YmxpY05hbWUgb2YgdGhlIHByb3BlcnR5IGlzIHRoZSBuZXcga2V5XG4gKlxuICogZS5nLiBmb3JcbiAqXG4gKiBgYGBcbiAqIGNsYXNzIENvbXAge1xuICogICBASW5wdXQoKVxuICogICBwcm9wTmFtZTE6IHN0cmluZztcbiAqXG4gKiAgIEBJbnB1dCgncHVibGljTmFtZScpXG4gKiAgIHByb3BOYW1lMjogbnVtYmVyO1xuICogfVxuICogYGBgXG4gKlxuICogd2lsbCBiZSBzZXJpYWxpemVkIGFzXG4gKlxuICogYGBgXG4gKiB7XG4gKiAgIGEwOiAncHJvcE5hbWUxJyxcbiAqICAgYjE6IFsncHVibGljTmFtZScsICdwcm9wTmFtZTInXSxcbiAqIH1cbiAqIGBgYFxuICpcbiAqIGJlY29tZXNcbiAqXG4gKiBgYGBcbiAqIHtcbiAqICAncHJvcE5hbWUxJzogJ2EwJyxcbiAqICAncHVibGljTmFtZSc6ICdiMSdcbiAqIH1cbiAqIGBgYFxuICpcbiAqIE9wdGlvbmFsbHkgdGhlIGZ1bmN0aW9uIGNhbiB0YWtlIGBzZWNvbmRhcnlgIHdoaWNoIHdpbGwgcmVzdWx0IGluOlxuICpcbiAqIGBgYFxuICoge1xuICogICdwcm9wTmFtZTEnOiAnYTAnLFxuICogICdwcm9wTmFtZTInOiAnYjEnXG4gKiB9XG4gKiBgYGBcbiAqXG5cbiAqL1xuZnVuY3Rpb24gaW52ZXJ0T2JqZWN0KG9iajogYW55LCBzZWNvbmRhcnk/OiBhbnkpOiBhbnkge1xuICBpZiAob2JqID09IG51bGwpIHJldHVybiBFTVBUWTtcbiAgY29uc3QgbmV3TG9va3VwOiBhbnkgPSB7fTtcbiAgZm9yIChjb25zdCBtaW5pZmllZEtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KG1pbmlmaWVkS2V5KSkge1xuICAgICAgbGV0IHB1YmxpY05hbWUgPSBvYmpbbWluaWZpZWRLZXldO1xuICAgICAgbGV0IGRlY2xhcmVkTmFtZSA9IHB1YmxpY05hbWU7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwdWJsaWNOYW1lKSkge1xuICAgICAgICBkZWNsYXJlZE5hbWUgPSBwdWJsaWNOYW1lWzFdO1xuICAgICAgICBwdWJsaWNOYW1lID0gcHVibGljTmFtZVswXTtcbiAgICAgIH1cbiAgICAgIG5ld0xvb2t1cFtwdWJsaWNOYW1lXSA9IG1pbmlmaWVkS2V5O1xuICAgICAgaWYgKHNlY29uZGFyeSkge1xuICAgICAgICAoc2Vjb25kYXJ5W2RlY2xhcmVkTmFtZV0gPSBtaW5pZmllZEtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdMb29rdXA7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYmFzZSBkZWZpbml0aW9uXG4gKlxuICogIyBFeGFtcGxlXG4gKiBgYGBcbiAqIGNsYXNzIFNob3VsZEJlSW5oZXJpdGVkIHtcbiAqICAgc3RhdGljIG5nQmFzZURlZiA9IGRlZmluZUJhc2Uoe1xuICogICAgICAuLi5cbiAqICAgfSlcbiAqIH1cbiAqIEBwYXJhbSBiYXNlRGVmaW5pdGlvbiBUaGUgYmFzZSBkZWZpbml0aW9uIHBhcmFtZXRlcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUJhc2U8VD4oYmFzZURlZmluaXRpb246IHtcbiAgLyoqXG4gICAqIEEgbWFwIG9mIGlucHV0IG5hbWVzLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGluOiBge1thY3R1YWxQcm9wZXJ0eU5hbWU6IHN0cmluZ106KHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddKX1gLlxuICAgKlxuICAgKiBHaXZlbjpcbiAgICogYGBgXG4gICAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAgICogICBASW5wdXQoKVxuICAgKiAgIHB1YmxpY0lucHV0MTogc3RyaW5nO1xuICAgKlxuICAgKiAgIEBJbnB1dCgncHVibGljSW5wdXQyJylcbiAgICogICBkZWNsYXJlZElucHV0Mjogc3RyaW5nO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBpcyBkZXNjcmliZWQgYXM6XG4gICAqIGBgYFxuICAgKiB7XG4gICAqICAgcHVibGljSW5wdXQxOiAncHVibGljSW5wdXQxJyxcbiAgICogICBkZWNsYXJlZElucHV0MjogWydkZWNsYXJlZElucHV0MicsICdwdWJsaWNJbnB1dDInXSxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hpY2ggdGhlIG1pbmlmaWVyIG1heSB0cmFuc2xhdGUgdG86XG4gICAqIGBgYFxuICAgKiB7XG4gICAqICAgbWluaWZpZWRQdWJsaWNJbnB1dDE6ICdwdWJsaWNJbnB1dDEnLFxuICAgKiAgIG1pbmlmaWVkRGVjbGFyZWRJbnB1dDI6IFsgJ2RlY2xhcmVkSW5wdXQyJywgJ3B1YmxpY0lucHV0MiddLFxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGlzIGFsbG93cyB0aGUgcmVuZGVyIHRvIHJlLWNvbnN0cnVjdCB0aGUgbWluaWZpZWQsIHB1YmxpYywgYW5kIGRlY2xhcmVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIE5PVEU6XG4gICAqICAtIEJlY2F1c2UgZGVjbGFyZWQgYW5kIHB1YmxpYyBuYW1lIGFyZSB1c3VhbGx5IHNhbWUgd2Ugb25seSBnZW5lcmF0ZSB0aGUgYXJyYXlcbiAgICogICAgYFsnZGVjbGFyZWQnLCAncHVibGljJ11gIGZvcm1hdCB3aGVuIHRoZXkgZGlmZmVyLlxuICAgKiAgLSBUaGUgcmVhc29uIHdoeSB0aGlzIEFQSSBhbmQgYG91dHB1dHNgIEFQSSBpcyBub3QgdGhlIHNhbWUgaXMgdGhhdCBgTmdPbkNoYW5nZXNgIGhhc1xuICAgKiAgICBpbmNvbnNpc3RlbnQgYmVoYXZpb3IgaW4gdGhhdCBpdCB1c2VzIGRlY2xhcmVkIG5hbWVzIHJhdGhlciB0aGFuIG1pbmlmaWVkIG9yIHB1YmxpYy4gRm9yXG4gICAqICAgIHRoaXMgcmVhc29uIGBOZ09uQ2hhbmdlc2Agd2lsbCBiZSBkZXByZWNhdGVkIGFuZCByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9uIGFuZCB0aGlzXG4gICAqICAgIEFQSSB3aWxsIGJlIHNpbXBsaWZpZWQgdG8gYmUgY29uc2lzdGVudCB3aXRoIGBvdXRwdXRzYC5cbiAgICovXG4gIGlucHV0cz86IHtbUCBpbiBrZXlvZiBUXT86IHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ119O1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBvdXRwdXQgbmFtZXMuXG4gICAqXG4gICAqIFRoZSBmb3JtYXQgaXMgaW46IGB7W2FjdHVhbFByb3BlcnR5TmFtZTogc3RyaW5nXTpzdHJpbmd9YC5cbiAgICpcbiAgICogV2hpY2ggdGhlIG1pbmlmaWVyIG1heSB0cmFuc2xhdGUgdG86IGB7W21pbmlmaWVkUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBUaGlzIGFsbG93cyB0aGUgcmVuZGVyIHRvIHJlLWNvbnN0cnVjdCB0aGUgbWluaWZpZWQgYW5kIG5vbi1taW5pZmllZCBuYW1lc1xuICAgKiBvZiBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgb3V0cHV0cz86IHtbUCBpbiBrZXlvZiBUXT86IHN0cmluZ307XG59KTogQmFzZURlZjxUPiB7XG4gIGNvbnN0IGRlY2xhcmVkSW5wdXRzOiB7W1AgaW4ga2V5b2YgVF06IFB9ID0ge30gYXMgYW55O1xuICByZXR1cm4ge1xuICAgIGlucHV0czogaW52ZXJ0T2JqZWN0KGJhc2VEZWZpbml0aW9uLmlucHV0cywgZGVjbGFyZWRJbnB1dHMpLFxuICAgIGRlY2xhcmVkSW5wdXRzOiBkZWNsYXJlZElucHV0cyxcbiAgICBvdXRwdXRzOiBpbnZlcnRPYmplY3QoYmFzZURlZmluaXRpb24ub3V0cHV0cyksXG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGlyZWN0aXZlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqICMgRXhhbXBsZVxuICogYGBgXG4gKiBjbGFzcyBNeURpcmVjdGl2ZSB7XG4gKiAgIC8vIEdlbmVyYXRlZCBieSBBbmd1bGFyIFRlbXBsYXRlIENvbXBpbGVyXG4gKiAgIC8vIFtTeW1ib2xdIHN5bnRheCB3aWxsIG5vdCBiZSBzdXBwb3J0ZWQgYnkgVHlwZVNjcmlwdCB1bnRpbCB2Mi43XG4gKiAgIHN0YXRpYyBuZ0RpcmVjdGl2ZURlZiA9IGRlZmluZURpcmVjdGl2ZSh7XG4gKiAgICAgLi4uXG4gKiAgIH0pO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZpbmVEaXJlY3RpdmUgPSBkZWZpbmVDb21wb25lbnQgYXMgYW55IGFzPFQ+KGRpcmVjdGl2ZURlZmluaXRpb246IHtcbiAgLyoqXG4gICAqIERpcmVjdGl2ZSB0eXBlLCBuZWVkZWQgdG8gY29uZmlndXJlIHRoZSBpbmplY3Rvci5cbiAgICovXG4gIHR5cGU6IFR5cGU8VD47XG5cbiAgLyoqIFRoZSBzZWxlY3RvcnMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gbWF0Y2ggbm9kZXMgdG8gdGhpcyBkaXJlY3RpdmUuICovXG4gIHNlbGVjdG9yczogQ3NzU2VsZWN0b3JMaXN0O1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB1c2VkIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBkaXJlY3RpdmUuXG4gICAqL1xuICBmYWN0b3J5OiAoKSA9PiBUIHwgKHswOiBUfSAmIGFueVtdKTsgLyogdHJ5aW5nIHRvIHNheSBUIHwgW1QsIC4uLmFueV0gKi9cblxuICAvKipcbiAgICogU3RhdGljIGF0dHJpYnV0ZXMgdG8gc2V0IG9uIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBhdHRyaWJ1dGUgbmFtZVxuICAgKiBPZGQgaW5kaWNlczogYXR0cmlidXRlIHZhbHVlXG4gICAqL1xuICBhdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIGlucHV0IG5hbWVzLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGluOiBge1thY3R1YWxQcm9wZXJ0eU5hbWU6IHN0cmluZ106KHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddKX1gLlxuICAgKlxuICAgKiBHaXZlbjpcbiAgICogYGBgXG4gICAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAgICogICBASW5wdXQoKVxuICAgKiAgIHB1YmxpY0lucHV0MTogc3RyaW5nO1xuICAgKlxuICAgKiAgIEBJbnB1dCgncHVibGljSW5wdXQyJylcbiAgICogICBkZWNsYXJlZElucHV0Mjogc3RyaW5nO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBpcyBkZXNjcmliZWQgYXM6XG4gICAqIGBgYFxuICAgKiB7XG4gICAqICAgcHVibGljSW5wdXQxOiAncHVibGljSW5wdXQxJyxcbiAgICogICBkZWNsYXJlZElucHV0MjogWydkZWNsYXJlZElucHV0MicsICdwdWJsaWNJbnB1dDInXSxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hpY2ggdGhlIG1pbmlmaWVyIG1heSB0cmFuc2xhdGUgdG86XG4gICAqIGBgYFxuICAgKiB7XG4gICAqICAgbWluaWZpZWRQdWJsaWNJbnB1dDE6ICdwdWJsaWNJbnB1dDEnLFxuICAgKiAgIG1pbmlmaWVkRGVjbGFyZWRJbnB1dDI6IFsgJ3B1YmxpY0lucHV0MicsICdkZWNsYXJlZElucHV0MiddLFxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGlzIGFsbG93cyB0aGUgcmVuZGVyIHRvIHJlLWNvbnN0cnVjdCB0aGUgbWluaWZpZWQsIHB1YmxpYywgYW5kIGRlY2xhcmVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIE5PVEU6XG4gICAqICAtIEJlY2F1c2UgZGVjbGFyZWQgYW5kIHB1YmxpYyBuYW1lIGFyZSB1c3VhbGx5IHNhbWUgd2Ugb25seSBnZW5lcmF0ZSB0aGUgYXJyYXlcbiAgICogICAgYFsnZGVjbGFyZWQnLCAncHVibGljJ11gIGZvcm1hdCB3aGVuIHRoZXkgZGlmZmVyLlxuICAgKiAgLSBUaGUgcmVhc29uIHdoeSB0aGlzIEFQSSBhbmQgYG91dHB1dHNgIEFQSSBpcyBub3QgdGhlIHNhbWUgaXMgdGhhdCBgTmdPbkNoYW5nZXNgIGhhc1xuICAgKiAgICBpbmNvbnNpc3RlbnQgYmVoYXZpb3IgaW4gdGhhdCBpdCB1c2VzIGRlY2xhcmVkIG5hbWVzIHJhdGhlciB0aGFuIG1pbmlmaWVkIG9yIHB1YmxpYy4gRm9yXG4gICAqICAgIHRoaXMgcmVhc29uIGBOZ09uQ2hhbmdlc2Agd2lsbCBiZSBkZXByZWNhdGVkIGFuZCByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9uIGFuZCB0aGlzXG4gICAqICAgIEFQSSB3aWxsIGJlIHNpbXBsaWZpZWQgdG8gYmUgY29uc2lzdGVudCB3aXRoIGBvdXRwdXRgLlxuICAgKi9cbiAgaW5wdXRzPzoge1tQIGluIGtleW9mIFRdPzogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXX07XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIG91dHB1dCBuYW1lcy5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBpbjogYHtbYWN0dWFsUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBXaGljaCB0aGUgbWluaWZpZXIgbWF5IHRyYW5zbGF0ZSB0bzogYHtbbWluaWZpZWRQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFRoaXMgYWxsb3dzIHRoZSByZW5kZXIgdG8gcmUtY29uc3RydWN0IHRoZSBtaW5pZmllZCBhbmQgbm9uLW1pbmlmaWVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqL1xuICBvdXRwdXRzPzoge1tQIGluIGtleW9mIFRdPzogc3RyaW5nfTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIG9wdGlvbmFsIGZlYXR1cmVzIHRvIGFwcGx5LlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBOZ09uQ2hhbmdlc0ZlYXR1cmV9LCB7QGxpbmsgUHVibGljRmVhdHVyZX0sIHtAbGluayBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmV9XG4gICAqL1xuICBmZWF0dXJlcz86IERpcmVjdGl2ZURlZkZlYXR1cmVbXTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gZXhlY3V0ZWQgYnkgdGhlIHBhcmVudCB0ZW1wbGF0ZSB0byBhbGxvdyBjaGlsZCBkaXJlY3RpdmUgdG8gYXBwbHkgaG9zdCBiaW5kaW5ncy5cbiAgICovXG4gIGhvc3RCaW5kaW5ncz86IChkaXJlY3RpdmVJbmRleDogbnVtYmVyLCBlbGVtZW50SW5kZXg6IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGluc3RhbmNlcyBvZiBjb250ZW50IHF1ZXJpZXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gZGlyZWN0aXZlLlxuICAgKi9cbiAgY29udGVudFF1ZXJpZXM/OiAoKCkgPT4gdm9pZCk7XG5cbiAgLyoqIFJlZnJlc2hlcyBjb250ZW50IHF1ZXJpZXMgYXNzb2NpYXRlZCB3aXRoIGRpcmVjdGl2ZXMgaW4gYSBnaXZlbiB2aWV3ICovXG4gIGNvbnRlbnRRdWVyaWVzUmVmcmVzaD86ICgoZGlyZWN0aXZlSW5kZXg6IG51bWJlciwgcXVlcnlJbmRleDogbnVtYmVyKSA9PiB2b2lkKTtcblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgbmFtZSB0aGF0IGNhbiBiZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byBhc3NpZ24gdGhpcyBkaXJlY3RpdmUgdG8gYSB2YXJpYWJsZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgRGlyZWN0aXZlLmV4cG9ydEFzfVxuICAgKi9cbiAgZXhwb3J0QXM/OiBzdHJpbmc7XG59KSA9PiBuZXZlcjtcblxuLyoqXG4gKiBDcmVhdGUgYSBwaXBlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqICMgRXhhbXBsZVxuICogYGBgXG4gKiBjbGFzcyBNeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAqICAgLy8gR2VuZXJhdGVkIGJ5IEFuZ3VsYXIgVGVtcGxhdGUgQ29tcGlsZXJcbiAqICAgc3RhdGljIG5nUGlwZURlZiA9IGRlZmluZVBpcGUoe1xuICogICAgIC4uLlxuICogICB9KTtcbiAqIH1cbiAqIGBgYFxuICogQHBhcmFtIHBpcGVEZWYgUGlwZSBkZWZpbml0aW9uIGdlbmVyYXRlZCBieSB0aGUgY29tcGlsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVBpcGU8VD4ocGlwZURlZjoge1xuICAvKiogTmFtZSBvZiB0aGUgcGlwZS4gVXNlZCBmb3IgbWF0Y2hpbmcgcGlwZXMgaW4gdGVtcGxhdGUgdG8gcGlwZSBkZWZzLiAqL1xuICBuYW1lOiBzdHJpbmcsXG5cbiAgLyoqIFBpcGUgY2xhc3MgcmVmZXJlbmNlLiBOZWVkZWQgdG8gZXh0cmFjdCBwaXBlIGxpZmVjeWNsZSBob29rcy4gKi9cbiAgdHlwZTogVHlwZTxUPixcblxuICAvKiogQSBmYWN0b3J5IGZvciBjcmVhdGluZyBhIHBpcGUgaW5zdGFuY2UuICovXG4gIGZhY3Rvcnk6ICgpID0+IFQsXG5cbiAgLyoqIFdoZXRoZXIgdGhlIHBpcGUgaXMgcHVyZS4gKi9cbiAgcHVyZT86IGJvb2xlYW5cbn0pOiBuZXZlciB7XG4gIHJldHVybiAoPFBpcGVEZWZJbnRlcm5hbDxUPj57XG4gICAgbmFtZTogcGlwZURlZi5uYW1lLFxuICAgIGZhY3Rvcnk6IHBpcGVEZWYuZmFjdG9yeSxcbiAgICBwdXJlOiBwaXBlRGVmLnB1cmUgIT09IGZhbHNlLFxuICAgIG9uRGVzdHJveTogcGlwZURlZi50eXBlLnByb3RvdHlwZS5uZ09uRGVzdHJveSB8fCBudWxsXG4gIH0pIGFzIG5ldmVyO1xufVxuIl19