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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtCQUErQixDQUFDOztBQVF0RSxNQUFNLEtBQUssR0FBTyxFQUFFLENBQUM7O0FBQ3JCLE1BQU0sV0FBVyxHQUFVLEVBQUUsQ0FBQztBQUM5QixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7SUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQzVCOztBQUNELElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJ6QixNQUFNLDBCQUE2QixtQkFxTWxDOztJQUNDLE1BQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQzs7SUFDdEMsTUFBTSxTQUFTLHNCQUFHLG1CQUFtQixDQUFDLEtBQUssR0FBRzs7SUFDOUMsTUFBTSxjQUFjLHNCQUFHLG1CQUFtQixDQUFDLFVBQVUsR0FBRzs7SUFDeEQsTUFBTSxjQUFjLHFCQUE0QixFQUFTLEVBQUM7O0lBQzFELE1BQU0sYUFBYSxHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQzs7SUFDeEQsTUFBTSxHQUFHLEdBQThCO1FBQ3JDLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsbUJBQW1CLENBQUMsT0FBTztRQUNwQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsUUFBUSx1QkFBSSxJQUFJLEVBQUU7UUFDaEQsWUFBWSxFQUFFLG1CQUFtQixDQUFDLFlBQVksSUFBSSxJQUFJ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QUMsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUNwQyxJQUFJLFNBQVMsRUFBRTtnQkFDYixDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQzthQUN6QztTQUNGO0tBQ0Y7SUFDRCxPQUFPLFNBQVMsQ0FBQztDQUNsQjs7Ozs7Ozs7Ozs7Ozs7O0FBY0QsTUFBTSxxQkFBd0IsY0F5RDdCOztJQUNDLE1BQU0sY0FBYyxxQkFBd0IsRUFBUyxFQUFDO0lBQ3RELE9BQU87UUFDTCxNQUFNLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDO1FBQzNELGNBQWMsRUFBRSxjQUFjO1FBQzlCLE9BQU8sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztLQUM5QyxDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQWdCRCxhQUFhLGVBQWUsc0JBQUcsZUFBc0IsR0F5R3pDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCWixNQUFNLHFCQUF3QixPQVk3QjtJQUNDLHlCQUFPLG1CQUFxQjtRQUMxQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUs7UUFDNUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJO0tBQ3RELEVBQVUsRUFBQztDQUNiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgJy4vbmdfZGV2X21vZGUnO1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL2NvbnN0YW50cyc7XG5pbXBvcnQge1Byb3ZpZGVyLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQge05nTW9kdWxlRGVmLCBOZ01vZHVsZURlZkludGVybmFsfSBmcm9tICcuLi9tZXRhZGF0YS9uZ19tb2R1bGUnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcblxuaW1wb3J0IHtCYXNlRGVmLCBDb21wb25lbnREZWZGZWF0dXJlLCBDb21wb25lbnREZWZJbnRlcm5hbCwgQ29tcG9uZW50UXVlcnksIENvbXBvbmVudFRlbXBsYXRlLCBDb21wb25lbnRUeXBlLCBEaXJlY3RpdmVEZWZGZWF0dXJlLCBEaXJlY3RpdmVEZWZJbnRlcm5hbCwgRGlyZWN0aXZlVHlwZSwgRGlyZWN0aXZlVHlwZXNPckZhY3RvcnksIFBpcGVEZWZJbnRlcm5hbCwgUGlwZVR5cGUsIFBpcGVUeXBlc09yRmFjdG9yeX0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtDc3NTZWxlY3Rvckxpc3QsIFNlbGVjdG9yRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9wcm9qZWN0aW9uJztcblxuY29uc3QgRU1QVFk6IHt9ID0ge307XG5jb25zdCBFTVBUWV9BUlJBWTogYW55W10gPSBbXTtcbmlmICh0eXBlb2YgbmdEZXZNb2RlICE9PSAndW5kZWZpbmVkJyAmJiBuZ0Rldk1vZGUpIHtcbiAgT2JqZWN0LmZyZWV6ZShFTVBUWSk7XG4gIE9iamVjdC5mcmVlemUoRU1QVFlfQVJSQVkpO1xufVxubGV0IF9yZW5kZXJDb21wQ291bnQgPSAwO1xuXG4vKipcbiAqIENyZWF0ZSBhIGNvbXBvbmVudCBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKlxuICogIyBFeGFtcGxlXG4gKiBgYGBcbiAqIGNsYXNzIE15RGlyZWN0aXZlIHtcbiAqICAgLy8gR2VuZXJhdGVkIGJ5IEFuZ3VsYXIgVGVtcGxhdGUgQ29tcGlsZXJcbiAqICAgLy8gW1N5bWJvbF0gc3ludGF4IHdpbGwgbm90IGJlIHN1cHBvcnRlZCBieSBUeXBlU2NyaXB0IHVudGlsIHYyLjdcbiAqICAgc3RhdGljIG5nQ29tcG9uZW50RGVmID0gZGVmaW5lQ29tcG9uZW50KHtcbiAqICAgICAuLi5cbiAqICAgfSk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUNvbXBvbmVudDxUPihjb21wb25lbnREZWZpbml0aW9uOiB7XG4gIC8qKlxuICAgKiBEaXJlY3RpdmUgdHlwZSwgbmVlZGVkIHRvIGNvbmZpZ3VyZSB0aGUgaW5qZWN0b3IuXG4gICAqL1xuICB0eXBlOiBUeXBlPFQ+O1xuXG4gIC8qKiBUaGUgc2VsZWN0b3JzIHRoYXQgd2lsbCBiZSB1c2VkIHRvIG1hdGNoIG5vZGVzIHRvIHRoaXMgY29tcG9uZW50LiAqL1xuICBzZWxlY3RvcnM6IENzc1NlbGVjdG9yTGlzdDtcblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdXNlZCB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgZGlyZWN0aXZlLlxuICAgKi9cbiAgZmFjdG9yeTogKCkgPT4gVDtcblxuICAvKipcbiAgICogU3RhdGljIGF0dHJpYnV0ZXMgdG8gc2V0IG9uIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBhdHRyaWJ1dGUgbmFtZVxuICAgKiBPZGQgaW5kaWNlczogYXR0cmlidXRlIHZhbHVlXG4gICAqL1xuICBhdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIGlucHV0IG5hbWVzLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGluOiBge1thY3R1YWxQcm9wZXJ0eU5hbWU6IHN0cmluZ106KHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddKX1gLlxuICAgKlxuICAgKiBHaXZlbjpcbiAgICogYGBgXG4gICAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAgICogICBASW5wdXQoKVxuICAgKiAgIHB1YmxpY0lucHV0MTogc3RyaW5nO1xuICAgKlxuICAgKiAgIEBJbnB1dCgncHVibGljSW5wdXQyJylcbiAgICogICBkZWNsYXJlZElucHV0Mjogc3RyaW5nO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBpcyBkZXNjcmliZWQgYXM6XG4gICAqIGBgYFxuICAgKiB7XG4gICAqICAgcHVibGljSW5wdXQxOiAncHVibGljSW5wdXQxJyxcbiAgICogICBkZWNsYXJlZElucHV0MjogWydkZWNsYXJlZElucHV0MicsICdwdWJsaWNJbnB1dDInXSxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hpY2ggdGhlIG1pbmlmaWVyIG1heSB0cmFuc2xhdGUgdG86XG4gICAqIGBgYFxuICAgKiB7XG4gICAqICAgbWluaWZpZWRQdWJsaWNJbnB1dDE6ICdwdWJsaWNJbnB1dDEnLFxuICAgKiAgIG1pbmlmaWVkRGVjbGFyZWRJbnB1dDI6IFsgJ3B1YmxpY0lucHV0MicsICdkZWNsYXJlZElucHV0MiddLFxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBUaGlzIGFsbG93cyB0aGUgcmVuZGVyIHRvIHJlLWNvbnN0cnVjdCB0aGUgbWluaWZpZWQsIHB1YmxpYywgYW5kIGRlY2xhcmVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIE5PVEU6XG4gICAqICAtIEJlY2F1c2UgZGVjbGFyZWQgYW5kIHB1YmxpYyBuYW1lIGFyZSB1c3VhbGx5IHNhbWUgd2Ugb25seSBnZW5lcmF0ZSB0aGUgYXJyYXlcbiAgICogICAgYFsnZGVjbGFyZWQnLCAncHVibGljJ11gIGZvcm1hdCB3aGVuIHRoZXkgZGlmZmVyLlxuICAgKiAgLSBUaGUgcmVhc29uIHdoeSB0aGlzIEFQSSBhbmQgYG91dHB1dHNgIEFQSSBpcyBub3QgdGhlIHNhbWUgaXMgdGhhdCBgTmdPbkNoYW5nZXNgIGhhc1xuICAgKiAgICBpbmNvbnNpc3RlbnQgYmVoYXZpb3IgaW4gdGhhdCBpdCB1c2VzIGRlY2xhcmVkIG5hbWVzIHJhdGhlciB0aGFuIG1pbmlmaWVkIG9yIHB1YmxpYy4gRm9yXG4gICAqICAgIHRoaXMgcmVhc29uIGBOZ09uQ2hhbmdlc2Agd2lsbCBiZSBkZXByZWNhdGVkIGFuZCByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9uIGFuZCB0aGlzXG4gICAqICAgIEFQSSB3aWxsIGJlIHNpbXBsaWZpZWQgdG8gYmUgY29uc2lzdGVudCB3aXRoIGBvdXRwdXRgLlxuICAgKi9cbiAgaW5wdXRzPzoge1tQIGluIGtleW9mIFRdPzogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXX07XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIG91dHB1dCBuYW1lcy5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBpbjogYHtbYWN0dWFsUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBXaGljaCB0aGUgbWluaWZpZXIgbWF5IHRyYW5zbGF0ZSB0bzogYHtbbWluaWZpZWRQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFRoaXMgYWxsb3dzIHRoZSByZW5kZXIgdG8gcmUtY29uc3RydWN0IHRoZSBtaW5pZmllZCBhbmQgbm9uLW1pbmlmaWVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqL1xuICBvdXRwdXRzPzoge1tQIGluIGtleW9mIFRdPzogc3RyaW5nfTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gZXhlY3V0ZWQgYnkgdGhlIHBhcmVudCB0ZW1wbGF0ZSB0byBhbGxvdyBjaGlsZCBkaXJlY3RpdmUgdG8gYXBwbHkgaG9zdCBiaW5kaW5ncy5cbiAgICovXG4gIGhvc3RCaW5kaW5ncz86IChkaXJlY3RpdmVJbmRleDogbnVtYmVyLCBlbGVtZW50SW5kZXg6IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY3JlYXRlIGluc3RhbmNlcyBvZiBjb250ZW50IHF1ZXJpZXMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gZGlyZWN0aXZlLlxuICAgKi9cbiAgY29udGVudFF1ZXJpZXM/OiAoKCkgPT4gdm9pZCk7XG5cbiAgLyoqIFJlZnJlc2hlcyBjb250ZW50IHF1ZXJpZXMgYXNzb2NpYXRlZCB3aXRoIGRpcmVjdGl2ZXMgaW4gYSBnaXZlbiB2aWV3ICovXG4gIGNvbnRlbnRRdWVyaWVzUmVmcmVzaD86ICgoZGlyZWN0aXZlSW5kZXg6IG51bWJlciwgcXVlcnlJbmRleDogbnVtYmVyKSA9PiB2b2lkKTtcblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgbmFtZSB0aGF0IGNhbiBiZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byBhc3NpZ24gdGhpcyBkaXJlY3RpdmUgdG8gYSB2YXJpYWJsZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgRGlyZWN0aXZlLmV4cG9ydEFzfVxuICAgKi9cbiAgZXhwb3J0QXM/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlIGZ1bmN0aW9uIHVzZSBmb3IgcmVuZGVyaW5nIERPTS5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBoYXMgZm9sbG93aW5nIHN0cnVjdHVyZS5cbiAgICpcbiAgICogYGBgXG4gICAqIGZ1bmN0aW9uIFRlbXBsYXRlPFQ+KGN0eDpULCBjcmVhdGlvbk1vZGU6IGJvb2xlYW4pIHtcbiAgICogICBpZiAoY3JlYXRpb25Nb2RlKSB7XG4gICAqICAgICAvLyBDb250YWlucyBjcmVhdGlvbiBtb2RlIGluc3RydWN0aW9ucy5cbiAgICogICB9XG4gICAqICAgLy8gQ29udGFpbnMgYmluZGluZyB1cGRhdGUgaW5zdHJ1Y3Rpb25zXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIENvbW1vbiBpbnN0cnVjdGlvbnMgYXJlOlxuICAgKiBDcmVhdGlvbiBtb2RlIGluc3RydWN0aW9uczpcbiAgICogIC0gYGVsZW1lbnRTdGFydGAsIGBlbGVtZW50RW5kYFxuICAgKiAgLSBgdGV4dGBcbiAgICogIC0gYGNvbnRhaW5lcmBcbiAgICogIC0gYGxpc3RlbmVyYFxuICAgKlxuICAgKiBCaW5kaW5nIHVwZGF0ZSBpbnN0cnVjdGlvbnM6XG4gICAqIC0gYGJpbmRgXG4gICAqIC0gYGVsZW1lbnRBdHRyaWJ1dGVgXG4gICAqIC0gYGVsZW1lbnRQcm9wZXJ0eWBcbiAgICogLSBgZWxlbWVudENsYXNzYFxuICAgKiAtIGBlbGVtZW50U3R5bGVgXG4gICAqXG4gICAqL1xuICB0ZW1wbGF0ZTogQ29tcG9uZW50VGVtcGxhdGU8VD47XG5cbiAgLyoqXG4gICAqIEFkZGl0aW9uYWwgc2V0IG9mIGluc3RydWN0aW9ucyBzcGVjaWZpYyB0byB2aWV3IHF1ZXJ5IHByb2Nlc3NpbmcuIFRoaXMgY291bGQgYmUgc2VlbiBhcyBhXG4gICAqIHNldCBvZiBpbnN0cnVjdGlvbiB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSB0ZW1wbGF0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogUXVlcnktcmVsYXRlZCBpbnN0cnVjdGlvbnMgbmVlZCB0byBiZSBwdWxsZWQgb3V0IHRvIGEgc3BlY2lmaWMgZnVuY3Rpb24gYXMgYSB0aW1pbmcgb2ZcbiAgICogZXhlY3V0aW9uIGlzIGRpZmZlcmVudCBhcyBjb21wYXJlZCB0byBhbGwgb3RoZXIgaW5zdHJ1Y3Rpb25zIChhZnRlciBjaGFuZ2UgZGV0ZWN0aW9uIGhvb2tzIGJ1dFxuICAgKiBiZWZvcmUgdmlldyBob29rcykuXG4gICAqL1xuICB2aWV3UXVlcnk/OiBDb21wb25lbnRRdWVyeTxUPnwgbnVsbDtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIG9wdGlvbmFsIGZlYXR1cmVzIHRvIGFwcGx5LlxuICAgKlxuICAgKiBTZWU6IHtAbGluayBOZ09uQ2hhbmdlc0ZlYXR1cmV9LCB7QGxpbmsgUHVibGljRmVhdHVyZX1cbiAgICovXG4gIGZlYXR1cmVzPzogQ29tcG9uZW50RGVmRmVhdHVyZVtdO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRlbXBsYXRlIGFuZCBzdHlsZSBlbmNhcHN1bGF0aW9uIG9wdGlvbnMgYXZhaWxhYmxlIGZvciBDb21wb25lbnQncyB7QGxpbmsgQ29tcG9uZW50fS5cbiAgICovXG4gIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbjtcblxuICAvKipcbiAgICogRGVmaW5lcyBhcmJpdHJhcnkgZGV2ZWxvcGVyLWRlZmluZWQgZGF0YSB0byBiZSBzdG9yZWQgb24gYSByZW5kZXJlciBpbnN0YW5jZS5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHJlbmRlcmVycyB0aGF0IGRlbGVnYXRlIHRvIG90aGVyIHJlbmRlcmVycy5cbiAgICpcbiAgICogc2VlOiBhbmltYXRpb25cbiAgICovXG4gIGRhdGE/OiB7W2tpbmQ6IHN0cmluZ106IGFueX07XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIHN0eWxlcyB0aGF0IHRoZSBjb21wb25lbnQgbmVlZHMgdG8gYmUgcHJlc2VudCBmb3IgY29tcG9uZW50IHRvIHJlbmRlciBjb3JyZWN0bHkuXG4gICAqL1xuICBzdHlsZXM/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVGhlIHN0cmF0ZWd5IHRoYXQgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdG9yIHVzZXMgdG8gZGV0ZWN0IGNoYW5nZXMuXG4gICAqIFdoZW4gc2V0LCB0YWtlcyBlZmZlY3QgdGhlIG5leHQgdGltZSBjaGFuZ2UgZGV0ZWN0aW9uIGlzIHRyaWdnZXJlZC5cbiAgICovXG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBzZXQgb2YgaW5qZWN0YWJsZSBvYmplY3RzIHRoYXQgYXJlIHZpc2libGUgdG8gYSBEaXJlY3RpdmUgYW5kIGl0cyBsaWdodCBET01cbiAgICogY2hpbGRyZW4uXG4gICAqL1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBzZXQgb2YgaW5qZWN0YWJsZSBvYmplY3RzIHRoYXQgYXJlIHZpc2libGUgdG8gaXRzIHZpZXcgRE9NIGNoaWxkcmVuLlxuICAgKi9cbiAgdmlld1Byb3ZpZGVycz86IFByb3ZpZGVyW107XG5cbiAgLyoqXG4gICAqIFJlZ2lzdHJ5IG9mIGRpcmVjdGl2ZXMgYW5kIGNvbXBvbmVudHMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyBjb21wb25lbnQncyB2aWV3LlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgZWl0aGVyIGFuIGFycmF5IG9mIGBEaXJlY3RpdmVEZWZgcyBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGFycmF5IG9mXG4gICAqIGBEaXJlY3RpdmVEZWZgcy4gVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gICAqL1xuICBkaXJlY3RpdmVzPzogRGlyZWN0aXZlVHlwZXNPckZhY3RvcnkgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RyeSBvZiBwaXBlcyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIGNvbXBvbmVudCdzIHZpZXcuXG4gICAqXG4gICAqIFRoZSBwcm9wZXJ0eSBpcyBlaXRoZXIgYW4gYXJyYXkgb2YgYFBpcGVEZWZzYHMgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSBhcnJheSBvZlxuICAgKiBgUGlwZURlZnNgcy4gVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gICAqL1xuICBwaXBlcz86IFBpcGVUeXBlc09yRmFjdG9yeSB8IG51bGw7XG59KTogbmV2ZXIge1xuICBjb25zdCB0eXBlID0gY29tcG9uZW50RGVmaW5pdGlvbi50eXBlO1xuICBjb25zdCBwaXBlVHlwZXMgPSBjb21wb25lbnREZWZpbml0aW9uLnBpcGVzICE7XG4gIGNvbnN0IGRpcmVjdGl2ZVR5cGVzID0gY29tcG9uZW50RGVmaW5pdGlvbi5kaXJlY3RpdmVzICE7XG4gIGNvbnN0IGRlY2xhcmVkSW5wdXRzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9IGFzIGFueTtcbiAgY29uc3QgZW5jYXBzdWxhdGlvbiA9IGNvbXBvbmVudERlZmluaXRpb24uZW5jYXBzdWxhdGlvbjtcbiAgY29uc3QgZGVmOiBDb21wb25lbnREZWZJbnRlcm5hbDxhbnk+ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGlQdWJsaWM6IG51bGwsXG4gICAgZmFjdG9yeTogY29tcG9uZW50RGVmaW5pdGlvbi5mYWN0b3J5LFxuICAgIHRlbXBsYXRlOiBjb21wb25lbnREZWZpbml0aW9uLnRlbXBsYXRlIHx8IG51bGwgISxcbiAgICBob3N0QmluZGluZ3M6IGNvbXBvbmVudERlZmluaXRpb24uaG9zdEJpbmRpbmdzIHx8IG51bGwsXG4gICAgY29udGVudFF1ZXJpZXM6IGNvbXBvbmVudERlZmluaXRpb24uY29udGVudFF1ZXJpZXMgfHwgbnVsbCxcbiAgICBjb250ZW50UXVlcmllc1JlZnJlc2g6IGNvbXBvbmVudERlZmluaXRpb24uY29udGVudFF1ZXJpZXNSZWZyZXNoIHx8IG51bGwsXG4gICAgYXR0cmlidXRlczogY29tcG9uZW50RGVmaW5pdGlvbi5hdHRyaWJ1dGVzIHx8IG51bGwsXG4gICAgaW5wdXRzOiBpbnZlcnRPYmplY3QoY29tcG9uZW50RGVmaW5pdGlvbi5pbnB1dHMsIGRlY2xhcmVkSW5wdXRzKSxcbiAgICBkZWNsYXJlZElucHV0czogZGVjbGFyZWRJbnB1dHMsXG4gICAgb3V0cHV0czogaW52ZXJ0T2JqZWN0KGNvbXBvbmVudERlZmluaXRpb24ub3V0cHV0cyksXG4gICAgZXhwb3J0QXM6IGNvbXBvbmVudERlZmluaXRpb24uZXhwb3J0QXMgfHwgbnVsbCxcbiAgICBvbkluaXQ6IHR5cGUucHJvdG90eXBlLm5nT25Jbml0IHx8IG51bGwsXG4gICAgZG9DaGVjazogdHlwZS5wcm90b3R5cGUubmdEb0NoZWNrIHx8IG51bGwsXG4gICAgYWZ0ZXJDb250ZW50SW5pdDogdHlwZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRJbml0IHx8IG51bGwsXG4gICAgYWZ0ZXJDb250ZW50Q2hlY2tlZDogdHlwZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRDaGVja2VkIHx8IG51bGwsXG4gICAgYWZ0ZXJWaWV3SW5pdDogdHlwZS5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0IHx8IG51bGwsXG4gICAgYWZ0ZXJWaWV3Q2hlY2tlZDogdHlwZS5wcm90b3R5cGUubmdBZnRlclZpZXdDaGVja2VkIHx8IG51bGwsXG4gICAgb25EZXN0cm95OiB0eXBlLnByb3RvdHlwZS5uZ09uRGVzdHJveSB8fCBudWxsLFxuICAgIG9uUHVzaDogY29tcG9uZW50RGVmaW5pdGlvbi5jaGFuZ2VEZXRlY3Rpb24gPT09IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBkaXJlY3RpdmVEZWZzOiBkaXJlY3RpdmVUeXBlcyA/XG4gICAgICAgICgpID0+ICh0eXBlb2YgZGlyZWN0aXZlVHlwZXMgPT09ICdmdW5jdGlvbicgPyBkaXJlY3RpdmVUeXBlcygpIDogZGlyZWN0aXZlVHlwZXMpXG4gICAgICAgICAgICAgICAgICAubWFwKGV4dHJhY3REaXJlY3RpdmVEZWYpIDpcbiAgICAgICAgbnVsbCxcbiAgICBwaXBlRGVmczogcGlwZVR5cGVzID9cbiAgICAgICAgKCkgPT4gKHR5cGVvZiBwaXBlVHlwZXMgPT09ICdmdW5jdGlvbicgPyBwaXBlVHlwZXMoKSA6IHBpcGVUeXBlcykubWFwKGV4dHJhY3RQaXBlRGVmKSA6XG4gICAgICAgIG51bGwsXG4gICAgc2VsZWN0b3JzOiBjb21wb25lbnREZWZpbml0aW9uLnNlbGVjdG9ycyxcbiAgICB2aWV3UXVlcnk6IGNvbXBvbmVudERlZmluaXRpb24udmlld1F1ZXJ5IHx8IG51bGwsXG4gICAgZmVhdHVyZXM6IGNvbXBvbmVudERlZmluaXRpb24uZmVhdHVyZXMgfHwgbnVsbCxcbiAgICBkYXRhOiBjb21wb25lbnREZWZpbml0aW9uLmRhdGEgfHwgRU1QVFksXG4gICAgLy8gVE9ETyhtaXNrbyk6IGNvbnZlcnQgVmlld0VuY2Fwc3VsYXRpb24gaW50byBjb25zdCBlbnVtIHNvIHRoYXQgaXQgY2FuIGJlIHVzZWQgZGlyZWN0bHkgaW4gdGhlXG4gICAgLy8gbmV4dCBsaW5lLiBBbHNvIGBOb25lYCBzaG91bGQgYmUgMCBub3QgMi5cbiAgICBlbmNhcHN1bGF0aW9uOiBlbmNhcHN1bGF0aW9uID09IG51bGwgPyAyIC8qIFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUgKi8gOiBlbmNhcHN1bGF0aW9uLFxuICAgIGlkOiBgYyR7X3JlbmRlckNvbXBDb3VudCsrfWAsXG4gICAgc3R5bGVzOiBFTVBUWV9BUlJBWSxcbiAgfTtcbiAgY29uc3QgZmVhdHVyZSA9IGNvbXBvbmVudERlZmluaXRpb24uZmVhdHVyZXM7XG4gIGZlYXR1cmUgJiYgZmVhdHVyZS5mb3JFYWNoKChmbikgPT4gZm4oZGVmKSk7XG4gIHJldHVybiBkZWYgYXMgbmV2ZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RGlyZWN0aXZlRGVmKHR5cGU6IERpcmVjdGl2ZVR5cGU8YW55PiYgQ29tcG9uZW50VHlwZTxhbnk+KTpcbiAgICBEaXJlY3RpdmVEZWZJbnRlcm5hbDxhbnk+fENvbXBvbmVudERlZkludGVybmFsPGFueT4ge1xuICBjb25zdCBkZWYgPSB0eXBlLm5nQ29tcG9uZW50RGVmIHx8IHR5cGUubmdEaXJlY3RpdmVEZWY7XG4gIGlmIChuZ0Rldk1vZGUgJiYgIWRlZikge1xuICAgIHRocm93IG5ldyBFcnJvcihgJyR7dHlwZS5uYW1lfScgaXMgbmVpdGhlciAnQ29tcG9uZW50VHlwZScgb3IgJ0RpcmVjdGl2ZVR5cGUnLmApO1xuICB9XG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0UGlwZURlZih0eXBlOiBQaXBlVHlwZTxhbnk+KTogUGlwZURlZkludGVybmFsPGFueT4ge1xuICBjb25zdCBkZWYgPSB0eXBlLm5nUGlwZURlZjtcbiAgaWYgKG5nRGV2TW9kZSAmJiAhZGVmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAnJHt0eXBlLm5hbWV9JyBpcyBub3QgYSAnUGlwZVR5cGUnLmApO1xuICB9XG4gIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVOZ01vZHVsZTxUPihkZWY6IHt0eXBlOiBUfSAmIFBhcnRpYWw8TmdNb2R1bGVEZWY8VCwgYW55LCBhbnksIGFueT4+KTogbmV2ZXIge1xuICBjb25zdCByZXM6IE5nTW9kdWxlRGVmSW50ZXJuYWw8VD4gPSB7XG4gICAgdHlwZTogZGVmLnR5cGUsXG4gICAgYm9vdHN0cmFwOiBkZWYuYm9vdHN0cmFwIHx8IEVNUFRZX0FSUkFZLFxuICAgIGRlY2xhcmF0aW9uczogZGVmLmRlY2xhcmF0aW9ucyB8fCBFTVBUWV9BUlJBWSxcbiAgICBpbXBvcnRzOiBkZWYuaW1wb3J0cyB8fCBFTVBUWV9BUlJBWSxcbiAgICBleHBvcnRzOiBkZWYuZXhwb3J0cyB8fCBFTVBUWV9BUlJBWSxcbiAgICB0cmFuc2l0aXZlQ29tcGlsZVNjb3BlczogbnVsbCxcbiAgfTtcbiAgcmV0dXJuIHJlcyBhcyBuZXZlcjtcbn1cblxuLyoqXG4gKiBJbnZlcnRzIGFuIGlucHV0cyBvciBvdXRwdXRzIGxvb2t1cCBzdWNoIHRoYXQgdGhlIGtleXMsIHdoaWNoIHdlcmUgdGhlXG4gKiBtaW5pZmllZCBrZXlzLCBhcmUgcGFydCBvZiB0aGUgdmFsdWVzLCBhbmQgdGhlIHZhbHVlcyBhcmUgcGFyc2VkIHNvIHRoYXRcbiAqIHRoZSBwdWJsaWNOYW1lIG9mIHRoZSBwcm9wZXJ0eSBpcyB0aGUgbmV3IGtleVxuICpcbiAqIGUuZy4gZm9yXG4gKlxuICogYGBgXG4gKiBjbGFzcyBDb21wIHtcbiAqICAgQElucHV0KClcbiAqICAgcHJvcE5hbWUxOiBzdHJpbmc7XG4gKlxuICogICBASW5wdXQoJ3B1YmxpY05hbWUnKVxuICogICBwcm9wTmFtZTI6IG51bWJlcjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIHdpbGwgYmUgc2VyaWFsaXplZCBhc1xuICpcbiAqIGBgYFxuICoge1xuICogICBhMDogJ3Byb3BOYW1lMScsXG4gKiAgIGIxOiBbJ3B1YmxpY05hbWUnLCAncHJvcE5hbWUyJ10sXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBiZWNvbWVzXG4gKlxuICogYGBgXG4gKiB7XG4gKiAgJ3Byb3BOYW1lMSc6ICdhMCcsXG4gKiAgJ3B1YmxpY05hbWUnOiAnYjEnXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBPcHRpb25hbGx5IHRoZSBmdW5jdGlvbiBjYW4gdGFrZSBgc2Vjb25kYXJ5YCB3aGljaCB3aWxsIHJlc3VsdCBpbjpcbiAqXG4gKiBgYGBcbiAqIHtcbiAqICAncHJvcE5hbWUxJzogJ2EwJyxcbiAqICAncHJvcE5hbWUyJzogJ2IxJ1xuICogfVxuICogYGBgXG4gKlxuXG4gKi9cbmZ1bmN0aW9uIGludmVydE9iamVjdChvYmo6IGFueSwgc2Vjb25kYXJ5PzogYW55KTogYW55IHtcbiAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gRU1QVFk7XG4gIGNvbnN0IG5ld0xvb2t1cDogYW55ID0ge307XG4gIGZvciAoY29uc3QgbWluaWZpZWRLZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShtaW5pZmllZEtleSkpIHtcbiAgICAgIGxldCBwdWJsaWNOYW1lID0gb2JqW21pbmlmaWVkS2V5XTtcbiAgICAgIGxldCBkZWNsYXJlZE5hbWUgPSBwdWJsaWNOYW1lO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHVibGljTmFtZSkpIHtcbiAgICAgICAgZGVjbGFyZWROYW1lID0gcHVibGljTmFtZVsxXTtcbiAgICAgICAgcHVibGljTmFtZSA9IHB1YmxpY05hbWVbMF07XG4gICAgICB9XG4gICAgICBuZXdMb29rdXBbcHVibGljTmFtZV0gPSBtaW5pZmllZEtleTtcbiAgICAgIGlmIChzZWNvbmRhcnkpIHtcbiAgICAgICAgKHNlY29uZGFyeVtkZWNsYXJlZE5hbWVdID0gbWluaWZpZWRLZXkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3TG9va3VwO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGJhc2UgZGVmaW5pdGlvblxuICpcbiAqICMgRXhhbXBsZVxuICogYGBgXG4gKiBjbGFzcyBTaG91bGRCZUluaGVyaXRlZCB7XG4gKiAgIHN0YXRpYyBuZ0Jhc2VEZWYgPSBkZWZpbmVCYXNlKHtcbiAqICAgICAgLi4uXG4gKiAgIH0pXG4gKiB9XG4gKiBAcGFyYW0gYmFzZURlZmluaXRpb24gVGhlIGJhc2UgZGVmaW5pdGlvbiBwYXJhbWV0ZXJzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVCYXNlPFQ+KGJhc2VEZWZpbml0aW9uOiB7XG4gIC8qKlxuICAgKiBBIG1hcCBvZiBpbnB1dCBuYW1lcy5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBpbjogYHtbYWN0dWFsUHJvcGVydHlOYW1lOiBzdHJpbmddOihzdHJpbmd8W3N0cmluZywgc3RyaW5nXSl9YC5cbiAgICpcbiAgICogR2l2ZW46XG4gICAqIGBgYFxuICAgKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gICAqICAgQElucHV0KClcbiAgICogICBwdWJsaWNJbnB1dDE6IHN0cmluZztcbiAgICpcbiAgICogICBASW5wdXQoJ3B1YmxpY0lucHV0MicpXG4gICAqICAgZGVjbGFyZWRJbnB1dDI6IHN0cmluZztcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogaXMgZGVzY3JpYmVkIGFzOlxuICAgKiBgYGBcbiAgICoge1xuICAgKiAgIHB1YmxpY0lucHV0MTogJ3B1YmxpY0lucHV0MScsXG4gICAqICAgZGVjbGFyZWRJbnB1dDI6IFsnZGVjbGFyZWRJbnB1dDInLCAncHVibGljSW5wdXQyJ10sXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFdoaWNoIHRoZSBtaW5pZmllciBtYXkgdHJhbnNsYXRlIHRvOlxuICAgKiBgYGBcbiAgICoge1xuICAgKiAgIG1pbmlmaWVkUHVibGljSW5wdXQxOiAncHVibGljSW5wdXQxJyxcbiAgICogICBtaW5pZmllZERlY2xhcmVkSW5wdXQyOiBbICdkZWNsYXJlZElucHV0MicsICdwdWJsaWNJbnB1dDInXSxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogVGhpcyBhbGxvd3MgdGhlIHJlbmRlciB0byByZS1jb25zdHJ1Y3QgdGhlIG1pbmlmaWVkLCBwdWJsaWMsIGFuZCBkZWNsYXJlZCBuYW1lc1xuICAgKiBvZiBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBOT1RFOlxuICAgKiAgLSBCZWNhdXNlIGRlY2xhcmVkIGFuZCBwdWJsaWMgbmFtZSBhcmUgdXN1YWxseSBzYW1lIHdlIG9ubHkgZ2VuZXJhdGUgdGhlIGFycmF5XG4gICAqICAgIGBbJ2RlY2xhcmVkJywgJ3B1YmxpYyddYCBmb3JtYXQgd2hlbiB0aGV5IGRpZmZlci5cbiAgICogIC0gVGhlIHJlYXNvbiB3aHkgdGhpcyBBUEkgYW5kIGBvdXRwdXRzYCBBUEkgaXMgbm90IHRoZSBzYW1lIGlzIHRoYXQgYE5nT25DaGFuZ2VzYCBoYXNcbiAgICogICAgaW5jb25zaXN0ZW50IGJlaGF2aW9yIGluIHRoYXQgaXQgdXNlcyBkZWNsYXJlZCBuYW1lcyByYXRoZXIgdGhhbiBtaW5pZmllZCBvciBwdWJsaWMuIEZvclxuICAgKiAgICB0aGlzIHJlYXNvbiBgTmdPbkNoYW5nZXNgIHdpbGwgYmUgZGVwcmVjYXRlZCBhbmQgcmVtb3ZlZCBpbiBmdXR1cmUgdmVyc2lvbiBhbmQgdGhpc1xuICAgKiAgICBBUEkgd2lsbCBiZSBzaW1wbGlmaWVkIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBgb3V0cHV0c2AuXG4gICAqL1xuICBpbnB1dHM/OiB7W1AgaW4ga2V5b2YgVF0/OiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddfTtcblxuICAvKipcbiAgICogQSBtYXAgb2Ygb3V0cHV0IG5hbWVzLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGluOiBge1thY3R1YWxQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFdoaWNoIHRoZSBtaW5pZmllciBtYXkgdHJhbnNsYXRlIHRvOiBge1ttaW5pZmllZFByb3BlcnR5TmFtZTogc3RyaW5nXTpzdHJpbmd9YC5cbiAgICpcbiAgICogVGhpcyBhbGxvd3MgdGhlIHJlbmRlciB0byByZS1jb25zdHJ1Y3QgdGhlIG1pbmlmaWVkIGFuZCBub24tbWluaWZpZWQgbmFtZXNcbiAgICogb2YgcHJvcGVydGllcy5cbiAgICovXG4gIG91dHB1dHM/OiB7W1AgaW4ga2V5b2YgVF0/OiBzdHJpbmd9O1xufSk6IEJhc2VEZWY8VD4ge1xuICBjb25zdCBkZWNsYXJlZElucHV0czoge1tQIGluIGtleW9mIFRdOiBQfSA9IHt9IGFzIGFueTtcbiAgcmV0dXJuIHtcbiAgICBpbnB1dHM6IGludmVydE9iamVjdChiYXNlRGVmaW5pdGlvbi5pbnB1dHMsIGRlY2xhcmVkSW5wdXRzKSxcbiAgICBkZWNsYXJlZElucHV0czogZGVjbGFyZWRJbnB1dHMsXG4gICAgb3V0cHV0czogaW52ZXJ0T2JqZWN0KGJhc2VEZWZpbml0aW9uLm91dHB1dHMpLFxuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRpcmVjdGl2ZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiAjIEV4YW1wbGVcbiAqIGBgYFxuICogY2xhc3MgTXlEaXJlY3RpdmUge1xuICogICAvLyBHZW5lcmF0ZWQgYnkgQW5ndWxhciBUZW1wbGF0ZSBDb21waWxlclxuICogICAvLyBbU3ltYm9sXSBzeW50YXggd2lsbCBub3QgYmUgc3VwcG9ydGVkIGJ5IFR5cGVTY3JpcHQgdW50aWwgdjIuN1xuICogICBzdGF0aWMgbmdEaXJlY3RpdmVEZWYgPSBkZWZpbmVEaXJlY3RpdmUoe1xuICogICAgIC4uLlxuICogICB9KTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRGlyZWN0aXZlID0gZGVmaW5lQ29tcG9uZW50IGFzIGFueSBhczxUPihkaXJlY3RpdmVEZWZpbml0aW9uOiB7XG4gIC8qKlxuICAgKiBEaXJlY3RpdmUgdHlwZSwgbmVlZGVkIHRvIGNvbmZpZ3VyZSB0aGUgaW5qZWN0b3IuXG4gICAqL1xuICB0eXBlOiBUeXBlPFQ+O1xuXG4gIC8qKiBUaGUgc2VsZWN0b3JzIHRoYXQgd2lsbCBiZSB1c2VkIHRvIG1hdGNoIG5vZGVzIHRvIHRoaXMgZGlyZWN0aXZlLiAqL1xuICBzZWxlY3RvcnM6IENzc1NlbGVjdG9yTGlzdDtcblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdXNlZCB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgZGlyZWN0aXZlLlxuICAgKi9cbiAgZmFjdG9yeTogKCkgPT4gVCB8ICh7MDogVH0gJiBhbnlbXSk7IC8qIHRyeWluZyB0byBzYXkgVCB8IFtULCAuLi5hbnldICovXG5cbiAgLyoqXG4gICAqIFN0YXRpYyBhdHRyaWJ1dGVzIHRvIHNldCBvbiBob3N0IGVsZW1lbnQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogYXR0cmlidXRlIG5hbWVcbiAgICogT2RkIGluZGljZXM6IGF0dHJpYnV0ZSB2YWx1ZVxuICAgKi9cbiAgYXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBpbnB1dCBuYW1lcy5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBpbjogYHtbYWN0dWFsUHJvcGVydHlOYW1lOiBzdHJpbmddOihzdHJpbmd8W3N0cmluZywgc3RyaW5nXSl9YC5cbiAgICpcbiAgICogR2l2ZW46XG4gICAqIGBgYFxuICAgKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gICAqICAgQElucHV0KClcbiAgICogICBwdWJsaWNJbnB1dDE6IHN0cmluZztcbiAgICpcbiAgICogICBASW5wdXQoJ3B1YmxpY0lucHV0MicpXG4gICAqICAgZGVjbGFyZWRJbnB1dDI6IHN0cmluZztcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogaXMgZGVzY3JpYmVkIGFzOlxuICAgKiBgYGBcbiAgICoge1xuICAgKiAgIHB1YmxpY0lucHV0MTogJ3B1YmxpY0lucHV0MScsXG4gICAqICAgZGVjbGFyZWRJbnB1dDI6IFsnZGVjbGFyZWRJbnB1dDInLCAncHVibGljSW5wdXQyJ10sXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFdoaWNoIHRoZSBtaW5pZmllciBtYXkgdHJhbnNsYXRlIHRvOlxuICAgKiBgYGBcbiAgICoge1xuICAgKiAgIG1pbmlmaWVkUHVibGljSW5wdXQxOiAncHVibGljSW5wdXQxJyxcbiAgICogICBtaW5pZmllZERlY2xhcmVkSW5wdXQyOiBbICdwdWJsaWNJbnB1dDInLCAnZGVjbGFyZWRJbnB1dDInXSxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogVGhpcyBhbGxvd3MgdGhlIHJlbmRlciB0byByZS1jb25zdHJ1Y3QgdGhlIG1pbmlmaWVkLCBwdWJsaWMsIGFuZCBkZWNsYXJlZCBuYW1lc1xuICAgKiBvZiBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBOT1RFOlxuICAgKiAgLSBCZWNhdXNlIGRlY2xhcmVkIGFuZCBwdWJsaWMgbmFtZSBhcmUgdXN1YWxseSBzYW1lIHdlIG9ubHkgZ2VuZXJhdGUgdGhlIGFycmF5XG4gICAqICAgIGBbJ2RlY2xhcmVkJywgJ3B1YmxpYyddYCBmb3JtYXQgd2hlbiB0aGV5IGRpZmZlci5cbiAgICogIC0gVGhlIHJlYXNvbiB3aHkgdGhpcyBBUEkgYW5kIGBvdXRwdXRzYCBBUEkgaXMgbm90IHRoZSBzYW1lIGlzIHRoYXQgYE5nT25DaGFuZ2VzYCBoYXNcbiAgICogICAgaW5jb25zaXN0ZW50IGJlaGF2aW9yIGluIHRoYXQgaXQgdXNlcyBkZWNsYXJlZCBuYW1lcyByYXRoZXIgdGhhbiBtaW5pZmllZCBvciBwdWJsaWMuIEZvclxuICAgKiAgICB0aGlzIHJlYXNvbiBgTmdPbkNoYW5nZXNgIHdpbGwgYmUgZGVwcmVjYXRlZCBhbmQgcmVtb3ZlZCBpbiBmdXR1cmUgdmVyc2lvbiBhbmQgdGhpc1xuICAgKiAgICBBUEkgd2lsbCBiZSBzaW1wbGlmaWVkIHRvIGJlIGNvbnNpc3RlbnQgd2l0aCBgb3V0cHV0YC5cbiAgICovXG4gIGlucHV0cz86IHtbUCBpbiBrZXlvZiBUXT86IHN0cmluZyB8IFtzdHJpbmcsIHN0cmluZ119O1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBvdXRwdXQgbmFtZXMuXG4gICAqXG4gICAqIFRoZSBmb3JtYXQgaXMgaW46IGB7W2FjdHVhbFByb3BlcnR5TmFtZTogc3RyaW5nXTpzdHJpbmd9YC5cbiAgICpcbiAgICogV2hpY2ggdGhlIG1pbmlmaWVyIG1heSB0cmFuc2xhdGUgdG86IGB7W21pbmlmaWVkUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBUaGlzIGFsbG93cyB0aGUgcmVuZGVyIHRvIHJlLWNvbnN0cnVjdCB0aGUgbWluaWZpZWQgYW5kIG5vbi1taW5pZmllZCBuYW1lc1xuICAgKiBvZiBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgb3V0cHV0cz86IHtbUCBpbiBrZXlvZiBUXT86IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBvcHRpb25hbCBmZWF0dXJlcyB0byBhcHBseS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTmdPbkNoYW5nZXNGZWF0dXJlfSwge0BsaW5rIFB1YmxpY0ZlYXR1cmV9LCB7QGxpbmsgSW5oZXJpdERlZmluaXRpb25GZWF0dXJlfVxuICAgKi9cbiAgZmVhdHVyZXM/OiBEaXJlY3RpdmVEZWZGZWF0dXJlW107XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGV4ZWN1dGVkIGJ5IHRoZSBwYXJlbnQgdGVtcGxhdGUgdG8gYWxsb3cgY2hpbGQgZGlyZWN0aXZlIHRvIGFwcGx5IGhvc3QgYmluZGluZ3MuXG4gICAqL1xuICBob3N0QmluZGluZ3M/OiAoZGlyZWN0aXZlSW5kZXg6IG51bWJlciwgZWxlbWVudEluZGV4OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNyZWF0ZSBpbnN0YW5jZXMgb2YgY29udGVudCBxdWVyaWVzIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGRpcmVjdGl2ZS5cbiAgICovXG4gIGNvbnRlbnRRdWVyaWVzPzogKCgpID0+IHZvaWQpO1xuXG4gIC8qKiBSZWZyZXNoZXMgY29udGVudCBxdWVyaWVzIGFzc29jaWF0ZWQgd2l0aCBkaXJlY3RpdmVzIGluIGEgZ2l2ZW4gdmlldyAqL1xuICBjb250ZW50UXVlcmllc1JlZnJlc2g/OiAoKGRpcmVjdGl2ZUluZGV4OiBudW1iZXIsIHF1ZXJ5SW5kZXg6IG51bWJlcikgPT4gdm9pZCk7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIG5hbWUgdGhhdCBjYW4gYmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUgdG8gYXNzaWduIHRoaXMgZGlyZWN0aXZlIHRvIGEgdmFyaWFibGUuXG4gICAqXG4gICAqIFNlZToge0BsaW5rIERpcmVjdGl2ZS5leHBvcnRBc31cbiAgICovXG4gIGV4cG9ydEFzPzogc3RyaW5nO1xufSkgPT4gbmV2ZXI7XG5cbi8qKlxuICogQ3JlYXRlIGEgcGlwZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiAjIEV4YW1wbGVcbiAqIGBgYFxuICogY2xhc3MgTXlQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gKiAgIC8vIEdlbmVyYXRlZCBieSBBbmd1bGFyIFRlbXBsYXRlIENvbXBpbGVyXG4gKiAgIHN0YXRpYyBuZ1BpcGVEZWYgPSBkZWZpbmVQaXBlKHtcbiAqICAgICAuLi5cbiAqICAgfSk7XG4gKiB9XG4gKiBgYGBcbiAqIEBwYXJhbSBwaXBlRGVmIFBpcGUgZGVmaW5pdGlvbiBnZW5lcmF0ZWQgYnkgdGhlIGNvbXBpbGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVQaXBlPFQ+KHBpcGVEZWY6IHtcbiAgLyoqIE5hbWUgb2YgdGhlIHBpcGUuIFVzZWQgZm9yIG1hdGNoaW5nIHBpcGVzIGluIHRlbXBsYXRlIHRvIHBpcGUgZGVmcy4gKi9cbiAgbmFtZTogc3RyaW5nLFxuXG4gIC8qKiBQaXBlIGNsYXNzIHJlZmVyZW5jZS4gTmVlZGVkIHRvIGV4dHJhY3QgcGlwZSBsaWZlY3ljbGUgaG9va3MuICovXG4gIHR5cGU6IFR5cGU8VD4sXG5cbiAgLyoqIEEgZmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBwaXBlIGluc3RhbmNlLiAqL1xuICBmYWN0b3J5OiAoKSA9PiBULFxuXG4gIC8qKiBXaGV0aGVyIHRoZSBwaXBlIGlzIHB1cmUuICovXG4gIHB1cmU/OiBib29sZWFuXG59KTogbmV2ZXIge1xuICByZXR1cm4gKDxQaXBlRGVmSW50ZXJuYWw8VD4+e1xuICAgIG5hbWU6IHBpcGVEZWYubmFtZSxcbiAgICBmYWN0b3J5OiBwaXBlRGVmLmZhY3RvcnksXG4gICAgcHVyZTogcGlwZURlZi5wdXJlICE9PSBmYWxzZSxcbiAgICBvbkRlc3Ryb3k6IHBpcGVEZWYudHlwZS5wcm90b3R5cGUubmdPbkRlc3Ryb3kgfHwgbnVsbFxuICB9KSBhcyBuZXZlcjtcbn1cbiJdfQ==