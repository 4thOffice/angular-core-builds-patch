/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { fillProperties } from '../../util/property';
import { EMPTY_ARRAY, EMPTY_OBJ } from '../empty';
import { isComponentDef } from '../interfaces/type_checks';
import { ɵɵNgOnChangesFeature } from './ng_onchanges_feature';
/**
 * @param {?} type
 * @return {?}
 */
export function getSuperType(type) {
    return Object.getPrototypeOf(type.prototype).constructor;
}
/**
 * Merges the definition from a super class to a sub class.
 * \@codeGenApi
 * @param {?} definition The definition that is a SubClass of another directive of component
 *
 * @return {?}
 */
export function ɵɵInheritDefinitionFeature(definition) {
    /** @type {?} */
    let superType = getSuperType(definition.type);
    while (superType) {
        /** @type {?} */
        let superDef = undefined;
        if (isComponentDef(definition)) {
            // Don't use getComponentDef/getDirectiveDef. This logic relies on inheritance.
            superDef = superType.ɵcmp || superType.ɵdir;
        }
        else {
            if (superType.ɵcmp) {
                throw new Error('Directives cannot inherit Components');
            }
            // Don't use getComponentDef/getDirectiveDef. This logic relies on inheritance.
            superDef = superType.ɵdir;
        }
        /** @nocollapse @type {?} */
        const baseDef = ((/** @type {?} */ (superType))).ngBaseDef;
        // Some fields in the definition may be empty, if there were no values to put in them that
        // would've justified object creation. Unwrap them if necessary.
        if (baseDef || superDef) {
            /** @type {?} */
            const writeableDef = (/** @type {?} */ (definition));
            writeableDef.inputs = maybeUnwrapEmpty(definition.inputs);
            writeableDef.declaredInputs = maybeUnwrapEmpty(definition.declaredInputs);
            writeableDef.outputs = maybeUnwrapEmpty(definition.outputs);
        }
        if (baseDef) {
            /** @type {?} */
            const baseViewQuery = baseDef.viewQuery;
            /** @type {?} */
            const baseContentQueries = baseDef.contentQueries;
            /** @type {?} */
            const baseHostBindings = baseDef.hostBindings;
            baseHostBindings && inheritHostBindings(definition, baseHostBindings);
            baseViewQuery && inheritViewQuery(definition, baseViewQuery);
            baseContentQueries && inheritContentQueries(definition, baseContentQueries);
            fillProperties(definition.inputs, baseDef.inputs);
            fillProperties(definition.declaredInputs, baseDef.declaredInputs);
            fillProperties(definition.outputs, baseDef.outputs);
        }
        if (superDef) {
            // Merge hostBindings
            /** @type {?} */
            const superHostBindings = superDef.hostBindings;
            superHostBindings && inheritHostBindings(definition, superHostBindings);
            // Merge queries
            /** @type {?} */
            const superViewQuery = superDef.viewQuery;
            /** @type {?} */
            const superContentQueries = superDef.contentQueries;
            superViewQuery && inheritViewQuery(definition, superViewQuery);
            superContentQueries && inheritContentQueries(definition, superContentQueries);
            // Merge inputs and outputs
            fillProperties(definition.inputs, superDef.inputs);
            fillProperties(definition.declaredInputs, superDef.declaredInputs);
            fillProperties(definition.outputs, superDef.outputs);
            // Inherit hooks
            // Assume super class inheritance feature has already run.
            definition.afterContentChecked =
                definition.afterContentChecked || superDef.afterContentChecked;
            definition.afterContentInit = definition.afterContentInit || superDef.afterContentInit;
            definition.afterViewChecked = definition.afterViewChecked || superDef.afterViewChecked;
            definition.afterViewInit = definition.afterViewInit || superDef.afterViewInit;
            definition.doCheck = definition.doCheck || superDef.doCheck;
            definition.onDestroy = definition.onDestroy || superDef.onDestroy;
            definition.onInit = definition.onInit || superDef.onInit;
            // Run parent features
            /** @type {?} */
            const features = superDef.features;
            if (features) {
                for (let i = 0; i < features.length; i++) {
                    /** @type {?} */
                    const feature = features[i];
                    if (feature && feature.ngInherit) {
                        ((/** @type {?} */ (feature)))(definition);
                    }
                }
            }
        }
        else {
            // Even if we don't have a definition, check the type for the hooks and use those if need be
            /** @type {?} */
            const superPrototype = superType.prototype;
            if (superPrototype) {
                definition.afterContentChecked =
                    definition.afterContentChecked || superPrototype.ngAfterContentChecked;
                definition.afterContentInit =
                    definition.afterContentInit || superPrototype.ngAfterContentInit;
                definition.afterViewChecked =
                    definition.afterViewChecked || superPrototype.ngAfterViewChecked;
                definition.afterViewInit = definition.afterViewInit || superPrototype.ngAfterViewInit;
                definition.doCheck = definition.doCheck || superPrototype.ngDoCheck;
                definition.onDestroy = definition.onDestroy || superPrototype.ngOnDestroy;
                definition.onInit = definition.onInit || superPrototype.ngOnInit;
                if (superPrototype.ngOnChanges) {
                    ɵɵNgOnChangesFeature()(definition);
                }
            }
        }
        superType = Object.getPrototypeOf(superType);
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function maybeUnwrapEmpty(value) {
    if (value === EMPTY_OBJ) {
        return {};
    }
    else if (value === EMPTY_ARRAY) {
        return [];
    }
    else {
        return value;
    }
}
/**
 * @param {?} definition
 * @param {?} superViewQuery
 * @return {?}
 */
function inheritViewQuery(definition, superViewQuery) {
    /** @type {?} */
    const prevViewQuery = definition.viewQuery;
    if (prevViewQuery) {
        definition.viewQuery = (/**
         * @param {?} rf
         * @param {?} ctx
         * @return {?}
         */
        (rf, ctx) => {
            superViewQuery(rf, ctx);
            prevViewQuery(rf, ctx);
        });
    }
    else {
        definition.viewQuery = superViewQuery;
    }
}
/**
 * @param {?} definition
 * @param {?} superContentQueries
 * @return {?}
 */
function inheritContentQueries(definition, superContentQueries) {
    /** @type {?} */
    const prevContentQueries = definition.contentQueries;
    if (prevContentQueries) {
        definition.contentQueries = (/**
         * @param {?} rf
         * @param {?} ctx
         * @param {?} directiveIndex
         * @return {?}
         */
        (rf, ctx, directiveIndex) => {
            superContentQueries(rf, ctx, directiveIndex);
            prevContentQueries(rf, ctx, directiveIndex);
        });
    }
    else {
        definition.contentQueries = superContentQueries;
    }
}
/**
 * @param {?} definition
 * @param {?} superHostBindings
 * @return {?}
 */
function inheritHostBindings(definition, superHostBindings) {
    /** @type {?} */
    const prevHostBindings = definition.hostBindings;
    // If the subclass does not have a host bindings function, we set the subclass host binding
    // function to be the superclass's (in this feature). We should check if they're the same here
    // to ensure we don't inherit it twice.
    if (superHostBindings !== prevHostBindings) {
        if (prevHostBindings) {
            definition.hostBindings = (/**
             * @param {?} rf
             * @param {?} ctx
             * @param {?} elementIndex
             * @return {?}
             */
            (rf, ctx, elementIndex) => {
                superHostBindings(rf, ctx, elementIndex);
                prevHostBindings(rf, ctx, elementIndex);
            });
        }
        else {
            definition.hostBindings = superHostBindings;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5oZXJpdF9kZWZpbml0aW9uX2ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ZlYXR1cmVzL2luaGVyaXRfZGVmaW5pdGlvbl9mZWF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRWhELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7QUFFNUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUFlO0lBRTFDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDO0FBQzNELENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFVBQWdEOztRQUNyRixTQUFTLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFFN0MsT0FBTyxTQUFTLEVBQUU7O1lBQ1osUUFBUSxHQUFrRCxTQUFTO1FBQ3ZFLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzlCLCtFQUErRTtZQUMvRSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzdDO2FBQU07WUFDTCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQzthQUN6RDtZQUNELCtFQUErRTtZQUMvRSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztTQUMzQjs7Y0FFSyxPQUFPLEdBQUcsQ0FBQyxt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O1NBQU07UUFDTCxVQUFVLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFDO0tBQ2pEO0FBQ0gsQ0FBQzs7Ozs7O0FBRUQsU0FBUyxtQkFBbUIsQ0FDeEIsVUFBZ0QsRUFDaEQsaUJBQTRDOztVQUN4QyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsWUFBWTtJQUNoRCwyRkFBMkY7SUFDM0YsOEZBQThGO0lBQzlGLHVDQUF1QztJQUN2QyxJQUFJLGlCQUFpQixLQUFLLGdCQUFnQixFQUFFO1FBQzFDLElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsVUFBVSxDQUFDLFlBQVk7Ozs7OztZQUFHLENBQUMsRUFBZSxFQUFFLEdBQVEsRUFBRSxZQUFvQixFQUFFLEVBQUU7Z0JBQzVFLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3pDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFBLENBQUM7U0FDSDthQUFNO1lBQ0wsVUFBVSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQztTQUM3QztLQUNGO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2ZpbGxQcm9wZXJ0aWVzfSBmcm9tICcuLi8uLi91dGlsL3Byb3BlcnR5JztcbmltcG9ydCB7RU1QVFlfQVJSQVksIEVNUFRZX09CSn0gZnJvbSAnLi4vZW1wdHknO1xuaW1wb3J0IHtDb21wb25lbnREZWYsIENvbnRlbnRRdWVyaWVzRnVuY3Rpb24sIERpcmVjdGl2ZURlZiwgRGlyZWN0aXZlRGVmRmVhdHVyZSwgSG9zdEJpbmRpbmdzRnVuY3Rpb24sIFJlbmRlckZsYWdzLCBWaWV3UXVlcmllc0Z1bmN0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtpc0NvbXBvbmVudERlZn0gZnJvbSAnLi4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5cbmltcG9ydCB7ybXJtU5nT25DaGFuZ2VzRmVhdHVyZX0gZnJvbSAnLi9uZ19vbmNoYW5nZXNfZmVhdHVyZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBlclR5cGUodHlwZTogVHlwZTxhbnk+KTogVHlwZTxhbnk+JlxuICAgIHvJtWNtcD86IENvbXBvbmVudERlZjxhbnk+LCDJtWRpcj86IERpcmVjdGl2ZURlZjxhbnk+fSB7XG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodHlwZS5wcm90b3R5cGUpLmNvbnN0cnVjdG9yO1xufVxuXG4vKipcbiAqIE1lcmdlcyB0aGUgZGVmaW5pdGlvbiBmcm9tIGEgc3VwZXIgY2xhc3MgdG8gYSBzdWIgY2xhc3MuXG4gKiBAcGFyYW0gZGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiB0aGF0IGlzIGEgU3ViQ2xhc3Mgb2YgYW5vdGhlciBkaXJlY3RpdmUgb2YgY29tcG9uZW50XG4gKlxuICogQGNvZGVHZW5BcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIMm1ybVJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUoZGVmaW5pdGlvbjogRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+KTogdm9pZCB7XG4gIGxldCBzdXBlclR5cGUgPSBnZXRTdXBlclR5cGUoZGVmaW5pdGlvbi50eXBlKTtcblxuICB3aGlsZSAoc3VwZXJUeXBlKSB7XG4gICAgbGV0IHN1cGVyRGVmOiBEaXJlY3RpdmVEZWY8YW55PnxDb21wb25lbnREZWY8YW55Pnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGlzQ29tcG9uZW50RGVmKGRlZmluaXRpb24pKSB7XG4gICAgICAvLyBEb24ndCB1c2UgZ2V0Q29tcG9uZW50RGVmL2dldERpcmVjdGl2ZURlZi4gVGhpcyBsb2dpYyByZWxpZXMgb24gaW5oZXJpdGFuY2UuXG4gICAgICBzdXBlckRlZiA9IHN1cGVyVHlwZS7JtWNtcCB8fCBzdXBlclR5cGUuybVkaXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdXBlclR5cGUuybVjbXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXJlY3RpdmVzIGNhbm5vdCBpbmhlcml0IENvbXBvbmVudHMnKTtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IHVzZSBnZXRDb21wb25lbnREZWYvZ2V0RGlyZWN0aXZlRGVmLiBUaGlzIGxvZ2ljIHJlbGllcyBvbiBpbmhlcml0YW5jZS5cbiAgICAgIHN1cGVyRGVmID0gc3VwZXJUeXBlLsm1ZGlyO1xuICAgIH1cblxuICAgIGNvbnN0IGJhc2VEZWYgPSAoc3VwZXJUeXBlIGFzIGFueSkubmdCYXNlRGVmO1xuXG4gICAgLy8gU29tZSBmaWVsZHMgaW4gdGhlIGRlZmluaXRpb24gbWF5IGJlIGVtcHR5LCBpZiB0aGVyZSB3ZXJlIG5vIHZhbHVlcyB0byBwdXQgaW4gdGhlbSB0aGF0XG4gICAgLy8gd291bGQndmUganVzdGlmaWVkIG9iamVjdCBjcmVhdGlvbi4gVW53cmFwIHRoZW0gaWYgbmVjZXNzYXJ5LlxuICAgIGlmIChiYXNlRGVmIHx8IHN1cGVyRGVmKSB7XG4gICAgICBjb25zdCB3cml0ZWFibGVEZWYgPSBkZWZpbml0aW9uIGFzIGFueTtcbiAgICAgIHdyaXRlYWJsZURlZi5pbnB1dHMgPSBtYXliZVVud3JhcEVtcHR5KGRlZmluaXRpb24uaW5wdXRzKTtcbiAgICAgIHdyaXRlYWJsZURlZi5kZWNsYXJlZElucHV0cyA9IG1heWJlVW53cmFwRW1wdHkoZGVmaW5pdGlvbi5kZWNsYXJlZElucHV0cyk7XG4gICAgICB3cml0ZWFibGVEZWYub3V0cHV0cyA9IG1heWJlVW53cmFwRW1wdHkoZGVmaW5pdGlvbi5vdXRwdXRzKTtcbiAgICB9XG5cbiAgICBpZiAoYmFzZURlZikge1xuICAgICAgY29uc3QgYmFzZVZpZXdRdWVyeSA9IGJhc2VEZWYudmlld1F1ZXJ5O1xuICAgICAgY29uc3QgYmFzZUNvbnRlbnRRdWVyaWVzID0gYmFzZURlZi5jb250ZW50UXVlcmllcztcbiAgICAgIGNvbnN0IGJhc2VIb3N0QmluZGluZ3MgPSBiYXNlRGVmLmhvc3RCaW5kaW5ncztcbiAgICAgIGJhc2VIb3N0QmluZGluZ3MgJiYgaW5oZXJpdEhvc3RCaW5kaW5ncyhkZWZpbml0aW9uLCBiYXNlSG9zdEJpbmRpbmdzKTtcbiAgICAgIGJhc2VWaWV3UXVlcnkgJiYgaW5oZXJpdFZpZXdRdWVyeShkZWZpbml0aW9uLCBiYXNlVmlld1F1ZXJ5KTtcbiAgICAgIGJhc2VDb250ZW50UXVlcmllcyAmJiBpbmhlcml0Q29udGVudFF1ZXJpZXMoZGVmaW5pdGlvbiwgYmFzZUNvbnRlbnRRdWVyaWVzKTtcbiAgICAgIGZpbGxQcm9wZXJ0aWVzKGRlZmluaXRpb24uaW5wdXRzLCBiYXNlRGVmLmlucHV0cyk7XG4gICAgICBmaWxsUHJvcGVydGllcyhkZWZpbml0aW9uLmRlY2xhcmVkSW5wdXRzLCBiYXNlRGVmLmRlY2xhcmVkSW5wdXRzKTtcbiAgICAgIGZpbGxQcm9wZXJ0aWVzKGRlZmluaXRpb24ub3V0cHV0cywgYmFzZURlZi5vdXRwdXRzKTtcbiAgICB9XG5cbiAgICBpZiAoc3VwZXJEZWYpIHtcbiAgICAgIC8vIE1lcmdlIGhvc3RCaW5kaW5nc1xuICAgICAgY29uc3Qgc3VwZXJIb3N0QmluZGluZ3MgPSBzdXBlckRlZi5ob3N0QmluZGluZ3M7XG4gICAgICBzdXBlckhvc3RCaW5kaW5ncyAmJiBpbmhlcml0SG9zdEJpbmRpbmdzKGRlZmluaXRpb24sIHN1cGVySG9zdEJpbmRpbmdzKTtcblxuICAgICAgLy8gTWVyZ2UgcXVlcmllc1xuICAgICAgY29uc3Qgc3VwZXJWaWV3UXVlcnkgPSBzdXBlckRlZi52aWV3UXVlcnk7XG4gICAgICBjb25zdCBzdXBlckNvbnRlbnRRdWVyaWVzID0gc3VwZXJEZWYuY29udGVudFF1ZXJpZXM7XG4gICAgICBzdXBlclZpZXdRdWVyeSAmJiBpbmhlcml0Vmlld1F1ZXJ5KGRlZmluaXRpb24sIHN1cGVyVmlld1F1ZXJ5KTtcbiAgICAgIHN1cGVyQ29udGVudFF1ZXJpZXMgJiYgaW5oZXJpdENvbnRlbnRRdWVyaWVzKGRlZmluaXRpb24sIHN1cGVyQ29udGVudFF1ZXJpZXMpO1xuXG4gICAgICAvLyBNZXJnZSBpbnB1dHMgYW5kIG91dHB1dHNcbiAgICAgIGZpbGxQcm9wZXJ0aWVzKGRlZmluaXRpb24uaW5wdXRzLCBzdXBlckRlZi5pbnB1dHMpO1xuICAgICAgZmlsbFByb3BlcnRpZXMoZGVmaW5pdGlvbi5kZWNsYXJlZElucHV0cywgc3VwZXJEZWYuZGVjbGFyZWRJbnB1dHMpO1xuICAgICAgZmlsbFByb3BlcnRpZXMoZGVmaW5pdGlvbi5vdXRwdXRzLCBzdXBlckRlZi5vdXRwdXRzKTtcblxuICAgICAgLy8gSW5oZXJpdCBob29rc1xuICAgICAgLy8gQXNzdW1lIHN1cGVyIGNsYXNzIGluaGVyaXRhbmNlIGZlYXR1cmUgaGFzIGFscmVhZHkgcnVuLlxuICAgICAgZGVmaW5pdGlvbi5hZnRlckNvbnRlbnRDaGVja2VkID1cbiAgICAgICAgICBkZWZpbml0aW9uLmFmdGVyQ29udGVudENoZWNrZWQgfHwgc3VwZXJEZWYuYWZ0ZXJDb250ZW50Q2hlY2tlZDtcbiAgICAgIGRlZmluaXRpb24uYWZ0ZXJDb250ZW50SW5pdCA9IGRlZmluaXRpb24uYWZ0ZXJDb250ZW50SW5pdCB8fCBzdXBlckRlZi5hZnRlckNvbnRlbnRJbml0O1xuICAgICAgZGVmaW5pdGlvbi5hZnRlclZpZXdDaGVja2VkID0gZGVmaW5pdGlvbi5hZnRlclZpZXdDaGVja2VkIHx8IHN1cGVyRGVmLmFmdGVyVmlld0NoZWNrZWQ7XG4gICAgICBkZWZpbml0aW9uLmFmdGVyVmlld0luaXQgPSBkZWZpbml0aW9uLmFmdGVyVmlld0luaXQgfHwgc3VwZXJEZWYuYWZ0ZXJWaWV3SW5pdDtcbiAgICAgIGRlZmluaXRpb24uZG9DaGVjayA9IGRlZmluaXRpb24uZG9DaGVjayB8fCBzdXBlckRlZi5kb0NoZWNrO1xuICAgICAgZGVmaW5pdGlvbi5vbkRlc3Ryb3kgPSBkZWZpbml0aW9uLm9uRGVzdHJveSB8fCBzdXBlckRlZi5vbkRlc3Ryb3k7XG4gICAgICBkZWZpbml0aW9uLm9uSW5pdCA9IGRlZmluaXRpb24ub25Jbml0IHx8IHN1cGVyRGVmLm9uSW5pdDtcblxuICAgICAgLy8gUnVuIHBhcmVudCBmZWF0dXJlc1xuICAgICAgY29uc3QgZmVhdHVyZXMgPSBzdXBlckRlZi5mZWF0dXJlcztcbiAgICAgIGlmIChmZWF0dXJlcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgZmVhdHVyZSA9IGZlYXR1cmVzW2ldO1xuICAgICAgICAgIGlmIChmZWF0dXJlICYmIGZlYXR1cmUubmdJbmhlcml0KSB7XG4gICAgICAgICAgICAoZmVhdHVyZSBhcyBEaXJlY3RpdmVEZWZGZWF0dXJlKShkZWZpbml0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRXZlbiBpZiB3ZSBkb24ndCBoYXZlIGEgZGVmaW5pdGlvbiwgY2hlY2sgdGhlIHR5cGUgZm9yIHRoZSBob29rcyBhbmQgdXNlIHRob3NlIGlmIG5lZWQgYmVcbiAgICAgIGNvbnN0IHN1cGVyUHJvdG90eXBlID0gc3VwZXJUeXBlLnByb3RvdHlwZTtcbiAgICAgIGlmIChzdXBlclByb3RvdHlwZSkge1xuICAgICAgICBkZWZpbml0aW9uLmFmdGVyQ29udGVudENoZWNrZWQgPVxuICAgICAgICAgICAgZGVmaW5pdGlvbi5hZnRlckNvbnRlbnRDaGVja2VkIHx8IHN1cGVyUHJvdG90eXBlLm5nQWZ0ZXJDb250ZW50Q2hlY2tlZDtcbiAgICAgICAgZGVmaW5pdGlvbi5hZnRlckNvbnRlbnRJbml0ID1cbiAgICAgICAgICAgIGRlZmluaXRpb24uYWZ0ZXJDb250ZW50SW5pdCB8fCBzdXBlclByb3RvdHlwZS5uZ0FmdGVyQ29udGVudEluaXQ7XG4gICAgICAgIGRlZmluaXRpb24uYWZ0ZXJWaWV3Q2hlY2tlZCA9XG4gICAgICAgICAgICBkZWZpbml0aW9uLmFmdGVyVmlld0NoZWNrZWQgfHwgc3VwZXJQcm90b3R5cGUubmdBZnRlclZpZXdDaGVja2VkO1xuICAgICAgICBkZWZpbml0aW9uLmFmdGVyVmlld0luaXQgPSBkZWZpbml0aW9uLmFmdGVyVmlld0luaXQgfHwgc3VwZXJQcm90b3R5cGUubmdBZnRlclZpZXdJbml0O1xuICAgICAgICBkZWZpbml0aW9uLmRvQ2hlY2sgPSBkZWZpbml0aW9uLmRvQ2hlY2sgfHwgc3VwZXJQcm90b3R5cGUubmdEb0NoZWNrO1xuICAgICAgICBkZWZpbml0aW9uLm9uRGVzdHJveSA9IGRlZmluaXRpb24ub25EZXN0cm95IHx8IHN1cGVyUHJvdG90eXBlLm5nT25EZXN0cm95O1xuICAgICAgICBkZWZpbml0aW9uLm9uSW5pdCA9IGRlZmluaXRpb24ub25Jbml0IHx8IHN1cGVyUHJvdG90eXBlLm5nT25Jbml0O1xuXG4gICAgICAgIGlmIChzdXBlclByb3RvdHlwZS5uZ09uQ2hhbmdlcykge1xuICAgICAgICAgIMm1ybVOZ09uQ2hhbmdlc0ZlYXR1cmUoKShkZWZpbml0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHN1cGVyVHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdXBlclR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1heWJlVW53cmFwRW1wdHk8VD4odmFsdWU6IFRbXSk6IFRbXTtcbmZ1bmN0aW9uIG1heWJlVW53cmFwRW1wdHk8VD4odmFsdWU6IFQpOiBUO1xuZnVuY3Rpb24gbWF5YmVVbndyYXBFbXB0eSh2YWx1ZTogYW55KTogYW55IHtcbiAgaWYgKHZhbHVlID09PSBFTVBUWV9PQkopIHtcbiAgICByZXR1cm4ge307XG4gIH0gZWxzZSBpZiAodmFsdWUgPT09IEVNUFRZX0FSUkFZKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmhlcml0Vmlld1F1ZXJ5KFxuICAgIGRlZmluaXRpb246IERpcmVjdGl2ZURlZjxhbnk+fCBDb21wb25lbnREZWY8YW55Piwgc3VwZXJWaWV3UXVlcnk6IFZpZXdRdWVyaWVzRnVuY3Rpb248YW55Pikge1xuICBjb25zdCBwcmV2Vmlld1F1ZXJ5ID0gZGVmaW5pdGlvbi52aWV3UXVlcnk7XG5cbiAgaWYgKHByZXZWaWV3UXVlcnkpIHtcbiAgICBkZWZpbml0aW9uLnZpZXdRdWVyeSA9IChyZiwgY3R4KSA9PiB7XG4gICAgICBzdXBlclZpZXdRdWVyeShyZiwgY3R4KTtcbiAgICAgIHByZXZWaWV3UXVlcnkocmYsIGN0eCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBkZWZpbml0aW9uLnZpZXdRdWVyeSA9IHN1cGVyVmlld1F1ZXJ5O1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaGVyaXRDb250ZW50UXVlcmllcyhcbiAgICBkZWZpbml0aW9uOiBEaXJlY3RpdmVEZWY8YW55PnwgQ29tcG9uZW50RGVmPGFueT4sXG4gICAgc3VwZXJDb250ZW50UXVlcmllczogQ29udGVudFF1ZXJpZXNGdW5jdGlvbjxhbnk+KSB7XG4gIGNvbnN0IHByZXZDb250ZW50UXVlcmllcyA9IGRlZmluaXRpb24uY29udGVudFF1ZXJpZXM7XG5cbiAgaWYgKHByZXZDb250ZW50UXVlcmllcykge1xuICAgIGRlZmluaXRpb24uY29udGVudFF1ZXJpZXMgPSAocmYsIGN0eCwgZGlyZWN0aXZlSW5kZXgpID0+IHtcbiAgICAgIHN1cGVyQ29udGVudFF1ZXJpZXMocmYsIGN0eCwgZGlyZWN0aXZlSW5kZXgpO1xuICAgICAgcHJldkNvbnRlbnRRdWVyaWVzKHJmLCBjdHgsIGRpcmVjdGl2ZUluZGV4KTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGRlZmluaXRpb24uY29udGVudFF1ZXJpZXMgPSBzdXBlckNvbnRlbnRRdWVyaWVzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaGVyaXRIb3N0QmluZGluZ3MoXG4gICAgZGVmaW5pdGlvbjogRGlyZWN0aXZlRGVmPGFueT58IENvbXBvbmVudERlZjxhbnk+LFxuICAgIHN1cGVySG9zdEJpbmRpbmdzOiBIb3N0QmluZGluZ3NGdW5jdGlvbjxhbnk+KSB7XG4gIGNvbnN0IHByZXZIb3N0QmluZGluZ3MgPSBkZWZpbml0aW9uLmhvc3RCaW5kaW5ncztcbiAgLy8gSWYgdGhlIHN1YmNsYXNzIGRvZXMgbm90IGhhdmUgYSBob3N0IGJpbmRpbmdzIGZ1bmN0aW9uLCB3ZSBzZXQgdGhlIHN1YmNsYXNzIGhvc3QgYmluZGluZ1xuICAvLyBmdW5jdGlvbiB0byBiZSB0aGUgc3VwZXJjbGFzcydzIChpbiB0aGlzIGZlYXR1cmUpLiBXZSBzaG91bGQgY2hlY2sgaWYgdGhleSdyZSB0aGUgc2FtZSBoZXJlXG4gIC8vIHRvIGVuc3VyZSB3ZSBkb24ndCBpbmhlcml0IGl0IHR3aWNlLlxuICBpZiAoc3VwZXJIb3N0QmluZGluZ3MgIT09IHByZXZIb3N0QmluZGluZ3MpIHtcbiAgICBpZiAocHJldkhvc3RCaW5kaW5ncykge1xuICAgICAgZGVmaW5pdGlvbi5ob3N0QmluZGluZ3MgPSAocmY6IFJlbmRlckZsYWdzLCBjdHg6IGFueSwgZWxlbWVudEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgc3VwZXJIb3N0QmluZGluZ3MocmYsIGN0eCwgZWxlbWVudEluZGV4KTtcbiAgICAgICAgcHJldkhvc3RCaW5kaW5ncyhyZiwgY3R4LCBlbGVtZW50SW5kZXgpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbi5ob3N0QmluZGluZ3MgPSBzdXBlckhvc3RCaW5kaW5ncztcbiAgICB9XG4gIH1cbn1cbiJdfQ==