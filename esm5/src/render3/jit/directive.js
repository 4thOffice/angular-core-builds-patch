/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { getCompilerFacade } from '../../compiler/compiler_facade';
import { resolveForwardRef } from '../../di/forward_ref';
import { compileInjectable } from '../../di/jit/injectable';
import { getReflect, reflectDependencies } from '../../di/jit/util';
import { componentNeedsResolution, maybeQueueResolutionOfComponentResources } from '../../metadata/resource_loading';
import { ViewEncapsulation } from '../../metadata/view';
import { getBaseDef, getComponentDef, getDirectiveDef } from '../definition';
import { EMPTY_ARRAY, EMPTY_OBJ } from '../empty';
import { NG_BASE_DEF, NG_COMPONENT_DEF, NG_DIRECTIVE_DEF } from '../fields';
import { stringifyForError } from '../util/misc_utils';
import { angularCoreEnv } from './environment';
import { flushModuleScopingQueueAsMuchAsPossible, patchComponentDefWithScope, transitiveScopesFor } from './module';
/**
 * Compile an Angular component according to its decorator metadata, and patch the resulting
 * ngComponentDef onto the component type.
 *
 * Compilation may be asynchronous (due to the need to resolve URLs for the component template or
 * other resources, for example). In the event that compilation is not immediate, `compileComponent`
 * will enqueue resource resolution into a global queue and will fail to return the `ngComponentDef`
 * until the global queue has been resolved with a call to `resolveComponentResources`.
 */
export function compileComponent(type, metadata) {
    var ngComponentDef = null;
    // Metadata may have resources which need to be resolved.
    maybeQueueResolutionOfComponentResources(type, metadata);
    Object.defineProperty(type, NG_COMPONENT_DEF, {
        get: function () {
            var compiler = getCompilerFacade();
            if (ngComponentDef === null) {
                if (componentNeedsResolution(metadata)) {
                    var error = ["Component '" + type.name + "' is not resolved:"];
                    if (metadata.templateUrl) {
                        error.push(" - templateUrl: " + metadata.templateUrl);
                    }
                    if (metadata.styleUrls && metadata.styleUrls.length) {
                        error.push(" - styleUrls: " + JSON.stringify(metadata.styleUrls));
                    }
                    error.push("Did you run and wait for 'resolveComponentResources()'?");
                    throw new Error(error.join('\n'));
                }
                var templateUrl = metadata.templateUrl || "ng:///" + type.name + "/template.html";
                var meta = tslib_1.__assign({}, directiveMetadata(type, metadata), { typeSourceSpan: compiler.createParseSourceSpan('Component', type.name, templateUrl), template: metadata.template || '', preserveWhitespaces: metadata.preserveWhitespaces || false, styles: metadata.styles || EMPTY_ARRAY, animations: metadata.animations, directives: [], changeDetection: metadata.changeDetection, pipes: new Map(), encapsulation: metadata.encapsulation || ViewEncapsulation.Emulated, interpolation: metadata.interpolation, viewProviders: metadata.viewProviders || null });
                if (meta.usesInheritance) {
                    addBaseDefToUndecoratedParents(type);
                }
                ngComponentDef = compiler.compileComponent(angularCoreEnv, templateUrl, meta);
                // When NgModule decorator executed, we enqueued the module definition such that
                // it would only dequeue and add itself as module scope to all of its declarations,
                // but only if  if all of its declarations had resolved. This call runs the check
                // to see if any modules that are in the queue can be dequeued and add scope to
                // their declarations.
                flushModuleScopingQueueAsMuchAsPossible();
                // If component compilation is async, then the @NgModule annotation which declares the
                // component may execute and set an ngSelectorScope property on the component type. This
                // allows the component to patch itself with directiveDefs from the module after it
                // finishes compiling.
                if (hasSelectorScope(type)) {
                    var scopes = transitiveScopesFor(type.ngSelectorScope);
                    patchComponentDefWithScope(ngComponentDef, scopes);
                }
            }
            return ngComponentDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    // Add ngInjectableDef so components are reachable through the module injector by default
    // This is mostly to support injecting components in tests. In real application code,
    // components should be retrieved through the node injector, so this isn't a problem.
    compileInjectable(type);
}
function hasSelectorScope(component) {
    return component.ngSelectorScope !== undefined;
}
/**
 * Compile an Angular directive according to its decorator metadata, and patch the resulting
 * ngDirectiveDef onto the component type.
 *
 * In the event that compilation is not immediate, `compileDirective` will return a `Promise` which
 * will resolve when compilation completes and the directive becomes usable.
 */
export function compileDirective(type, directive) {
    var ngDirectiveDef = null;
    Object.defineProperty(type, NG_DIRECTIVE_DEF, {
        get: function () {
            if (ngDirectiveDef === null) {
                var name_1 = type && type.name;
                var sourceMapUrl = "ng://" + name_1 + "/ngDirectiveDef.js";
                var compiler = getCompilerFacade();
                var facade = directiveMetadata(type, directive);
                facade.typeSourceSpan = compiler.createParseSourceSpan('Directive', name_1, sourceMapUrl);
                if (facade.usesInheritance) {
                    addBaseDefToUndecoratedParents(type);
                }
                ngDirectiveDef = compiler.compileDirective(angularCoreEnv, sourceMapUrl, facade);
            }
            return ngDirectiveDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    // Add ngInjectableDef so directives are reachable through the module injector by default
    // This is mostly to support injecting directives in tests. In real application code,
    // directives should be retrieved through the node injector, so this isn't a problem.
    compileInjectable(type);
}
export function extendsDirectlyFromObject(type) {
    return Object.getPrototypeOf(type.prototype) === Object.prototype;
}
/**
 * Extract the `R3DirectiveMetadata` for a particular directive (either a `Directive` or a
 * `Component`).
 */
export function directiveMetadata(type, metadata) {
    // Reflect inputs and outputs.
    var propMetadata = getReflect().ownPropMetadata(type);
    return {
        name: type.name,
        type: type,
        typeArgumentCount: 0,
        selector: metadata.selector,
        deps: reflectDependencies(type),
        host: metadata.host || EMPTY_OBJ,
        propMetadata: propMetadata,
        inputs: metadata.inputs || EMPTY_ARRAY,
        outputs: metadata.outputs || EMPTY_ARRAY,
        queries: extractQueriesMetadata(type, propMetadata, isContentQuery),
        lifecycle: { usesOnChanges: type.prototype.hasOwnProperty('ngOnChanges') },
        typeSourceSpan: null,
        usesInheritance: !extendsDirectlyFromObject(type),
        exportAs: extractExportAs(metadata.exportAs),
        providers: metadata.providers || null,
        viewQueries: extractQueriesMetadata(type, propMetadata, isViewQuery),
    };
}
/**
 * Adds an `ngBaseDef` to all parent classes of a type that don't have an Angular decorator.
 */
function addBaseDefToUndecoratedParents(type) {
    var objPrototype = Object.prototype;
    var parent = Object.getPrototypeOf(type);
    // Go up the prototype until we hit `Object`.
    while (parent && parent !== objPrototype) {
        // Since inheritance works if the class was annotated already, we only need to add
        // the base def if there are no annotations and the base def hasn't been created already.
        if (!getDirectiveDef(parent) && !getComponentDef(parent) && !getBaseDef(parent)) {
            var facade = extractBaseDefMetadata(parent);
            facade && compileBase(parent, facade);
        }
        parent = Object.getPrototypeOf(parent);
    }
}
/** Compiles the base metadata into a base definition. */
function compileBase(type, facade) {
    var ngBaseDef = null;
    Object.defineProperty(type, NG_BASE_DEF, {
        get: function () {
            if (ngBaseDef === null) {
                var name_2 = type && type.name;
                var sourceMapUrl = "ng://" + name_2 + "/ngBaseDef.js";
                var compiler = getCompilerFacade();
                ngBaseDef = compiler.compileBase(angularCoreEnv, sourceMapUrl, facade);
            }
            return ngBaseDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
/** Extracts the metadata necessary to construct an `ngBaseDef` from a class. */
function extractBaseDefMetadata(type) {
    var propMetadata = getReflect().ownPropMetadata(type);
    var viewQueries = extractQueriesMetadata(type, propMetadata, isViewQuery);
    var queries = extractQueriesMetadata(type, propMetadata, isContentQuery);
    var inputs;
    var outputs;
    // We only need to know whether there are any HostListener or HostBinding
    // decorators present, the parsing logic is in the compiler already.
    var hasHostDecorators = false;
    var _loop_1 = function (field) {
        propMetadata[field].forEach(function (ann) {
            var metadataName = ann.ngMetadataName;
            if (metadataName === 'Input') {
                inputs = inputs || {};
                inputs[field] = ann.bindingPropertyName ? [ann.bindingPropertyName, field] : field;
            }
            else if (metadataName === 'Output') {
                outputs = outputs || {};
                outputs[field] = ann.bindingPropertyName || field;
            }
            else if (metadataName === 'HostBinding' || metadataName === 'HostListener') {
                hasHostDecorators = true;
            }
        });
    };
    for (var field in propMetadata) {
        _loop_1(field);
    }
    // Only generate the base def if there's any info inside it.
    if (inputs || outputs || viewQueries.length || queries.length || hasHostDecorators) {
        return { name: type.name, inputs: inputs, outputs: outputs, viewQueries: viewQueries, queries: queries, propMetadata: propMetadata };
    }
    return null;
}
function convertToR3QueryPredicate(selector) {
    return typeof selector === 'string' ? splitByComma(selector) : resolveForwardRef(selector);
}
export function convertToR3QueryMetadata(propertyName, ann) {
    return {
        propertyName: propertyName,
        predicate: convertToR3QueryPredicate(ann.selector),
        descendants: ann.descendants,
        first: ann.first,
        read: ann.read ? ann.read : null,
        static: !!ann.static
    };
}
function extractQueriesMetadata(type, propMetadata, isQueryAnn) {
    var queriesMeta = [];
    var _loop_2 = function (field) {
        if (propMetadata.hasOwnProperty(field)) {
            var annotations_1 = propMetadata[field];
            annotations_1.forEach(function (ann) {
                if (isQueryAnn(ann)) {
                    if (!ann.selector) {
                        throw new Error("Can't construct a query for the property \"" + field + "\" of " +
                            ("\"" + stringifyForError(type) + "\" since the query selector wasn't defined."));
                    }
                    if (annotations_1.some(isInputAnn)) {
                        throw new Error("Cannot combine @Input decorators with query decorators");
                    }
                    queriesMeta.push(convertToR3QueryMetadata(field, ann));
                }
            });
        }
    };
    for (var field in propMetadata) {
        _loop_2(field);
    }
    return queriesMeta;
}
function extractExportAs(exportAs) {
    if (exportAs === undefined) {
        return null;
    }
    return exportAs.split(',').map(function (part) { return part.trim(); });
}
function isContentQuery(value) {
    var name = value.ngMetadataName;
    return name === 'ContentChild' || name === 'ContentChildren';
}
function isViewQuery(value) {
    var name = value.ngMetadataName;
    return name === 'ViewChild' || name === 'ViewChildren';
}
function isInputAnn(value) {
    return value.ngMetadataName === 'Input';
}
function splitByComma(value) {
    return value.split(',').map(function (piece) { return piece.trim(); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9qaXQvZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxPQUFPLEVBQTRCLGlCQUFpQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFNUYsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDMUQsT0FBTyxFQUFDLFVBQVUsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBSWxFLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSx3Q0FBd0MsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25ILE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRTFFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXJELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFDLHVDQUF1QyxFQUFFLDBCQUEwQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBSWxIOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQWUsRUFBRSxRQUFtQjtJQUNuRSxJQUFJLGNBQWMsR0FBUSxJQUFJLENBQUM7SUFDL0Is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QUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztJQUNsQyxPQUFPLElBQUksS0FBSyxjQUFjLElBQUksSUFBSSxLQUFLLGlCQUFpQixDQUFDO0FBQy9ELENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFVO0lBQzdCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFDbEMsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksS0FBSyxjQUFjLENBQUM7QUFDekQsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQVU7SUFDNUIsT0FBTyxLQUFLLENBQUMsY0FBYyxLQUFLLE9BQU8sQ0FBQztBQUMxQyxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsS0FBYTtJQUNqQyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO0FBQ3JELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSwgZ2V0Q29tcGlsZXJGYWNhZGV9IGZyb20gJy4uLy4uL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZSc7XG5pbXBvcnQge1IzQmFzZU1ldGFkYXRhRmFjYWRlLCBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlLCBSM1F1ZXJ5TWV0YWRhdGFGYWNhZGV9IGZyb20gJy4uLy4uL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UnO1xuaW1wb3J0IHtyZXNvbHZlRm9yd2FyZFJlZn0gZnJvbSAnLi4vLi4vZGkvZm9yd2FyZF9yZWYnO1xuaW1wb3J0IHtjb21waWxlSW5qZWN0YWJsZX0gZnJvbSAnLi4vLi4vZGkvaml0L2luamVjdGFibGUnO1xuaW1wb3J0IHtnZXRSZWZsZWN0LCByZWZsZWN0RGVwZW5kZW5jaWVzfSBmcm9tICcuLi8uLi9kaS9qaXQvdXRpbCc7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS90eXBlJztcbmltcG9ydCB7UXVlcnl9IGZyb20gJy4uLy4uL21ldGFkYXRhL2RpJztcbmltcG9ydCB7Q29tcG9uZW50LCBEaXJlY3RpdmUsIElucHV0fSBmcm9tICcuLi8uLi9tZXRhZGF0YS9kaXJlY3RpdmVzJztcbmltcG9ydCB7Y29tcG9uZW50TmVlZHNSZXNvbHV0aW9uLCBtYXliZVF1ZXVlUmVzb2x1dGlvbk9mQ29tcG9uZW50UmVzb3VyY2VzfSBmcm9tICcuLi8uLi9tZXRhZGF0YS9yZXNvdXJjZV9sb2FkaW5nJztcbmltcG9ydCB7Vmlld0VuY2Fwc3VsYXRpb259IGZyb20gJy4uLy4uL21ldGFkYXRhL3ZpZXcnO1xuaW1wb3J0IHtnZXRCYXNlRGVmLCBnZXRDb21wb25lbnREZWYsIGdldERpcmVjdGl2ZURlZn0gZnJvbSAnLi4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0VNUFRZX0FSUkFZLCBFTVBUWV9PQkp9IGZyb20gJy4uL2VtcHR5JztcbmltcG9ydCB7TkdfQkFTRV9ERUYsIE5HX0NPTVBPTkVOVF9ERUYsIE5HX0RJUkVDVElWRV9ERUZ9IGZyb20gJy4uL2ZpZWxkcyc7XG5pbXBvcnQge0NvbXBvbmVudFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5pbXBvcnQge3N0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuLi91dGlsL21pc2NfdXRpbHMnO1xuXG5pbXBvcnQge2FuZ3VsYXJDb3JlRW52fSBmcm9tICcuL2Vudmlyb25tZW50JztcbmltcG9ydCB7Zmx1c2hNb2R1bGVTY29waW5nUXVldWVBc011Y2hBc1Bvc3NpYmxlLCBwYXRjaENvbXBvbmVudERlZldpdGhTY29wZSwgdHJhbnNpdGl2ZVNjb3Blc0Zvcn0gZnJvbSAnLi9tb2R1bGUnO1xuXG5cblxuLyoqXG4gKiBDb21waWxlIGFuIEFuZ3VsYXIgY29tcG9uZW50IGFjY29yZGluZyB0byBpdHMgZGVjb3JhdG9yIG1ldGFkYXRhLCBhbmQgcGF0Y2ggdGhlIHJlc3VsdGluZ1xuICogbmdDb21wb25lbnREZWYgb250byB0aGUgY29tcG9uZW50IHR5cGUuXG4gKlxuICogQ29tcGlsYXRpb24gbWF5IGJlIGFzeW5jaHJvbm91cyAoZHVlIHRvIHRoZSBuZWVkIHRvIHJlc29sdmUgVVJMcyBmb3IgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBvclxuICogb3RoZXIgcmVzb3VyY2VzLCBmb3IgZXhhbXBsZSkuIEluIHRoZSBldmVudCB0aGF0IGNvbXBpbGF0aW9uIGlzIG5vdCBpbW1lZGlhdGUsIGBjb21waWxlQ29tcG9uZW50YFxuICogd2lsbCBlbnF1ZXVlIHJlc291cmNlIHJlc29sdXRpb24gaW50byBhIGdsb2JhbCBxdWV1ZSBhbmQgd2lsbCBmYWlsIHRvIHJldHVybiB0aGUgYG5nQ29tcG9uZW50RGVmYFxuICogdW50aWwgdGhlIGdsb2JhbCBxdWV1ZSBoYXMgYmVlbiByZXNvbHZlZCB3aXRoIGEgY2FsbCB0byBgcmVzb2x2ZUNvbXBvbmVudFJlc291cmNlc2AuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlQ29tcG9uZW50KHR5cGU6IFR5cGU8YW55PiwgbWV0YWRhdGE6IENvbXBvbmVudCk6IHZvaWQge1xuICBsZXQgbmdDb21wb25lbnREZWY6IGFueSA9IG51bGw7XG4gIC8vIE1ldGFkYXRhIG1heSBoYXZlIHJlc291cmNlcyB3aGljaCBuZWVkIHRvIGJlIHJlc29sdmVkLlxuICBtYXliZVF1ZXVlUmVzb2x1dGlvbk9mQ29tcG9uZW50UmVzb3VyY2VzKHR5cGUsIG1ldGFkYXRhKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIE5HX0NPTVBPTkVOVF9ERUYsIHtcbiAgICBnZXQ6ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoKTtcbiAgICAgIGlmIChuZ0NvbXBvbmVudERlZiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoY29tcG9uZW50TmVlZHNSZXNvbHV0aW9uKG1ldGFkYXRhKSkge1xuICAgICAgICAgIGNvbnN0IGVycm9yID0gW2BDb21wb25lbnQgJyR7dHlwZS5uYW1lfScgaXMgbm90IHJlc29sdmVkOmBdO1xuICAgICAgICAgIGlmIChtZXRhZGF0YS50ZW1wbGF0ZVVybCkge1xuICAgICAgICAgICAgZXJyb3IucHVzaChgIC0gdGVtcGxhdGVVcmw6ICR7bWV0YWRhdGEudGVtcGxhdGVVcmx9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtZXRhZGF0YS5zdHlsZVVybHMgJiYgbWV0YWRhdGEuc3R5bGVVcmxzLmxlbmd0aCkge1xuICAgICAgICAgICAgZXJyb3IucHVzaChgIC0gc3R5bGVVcmxzOiAke0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhLnN0eWxlVXJscyl9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yLnB1c2goYERpZCB5b3UgcnVuIGFuZCB3YWl0IGZvciAncmVzb2x2ZUNvbXBvbmVudFJlc291cmNlcygpJz9gKTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3Iuam9pbignXFxuJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVVcmwgPSBtZXRhZGF0YS50ZW1wbGF0ZVVybCB8fCBgbmc6Ly8vJHt0eXBlLm5hbWV9L3RlbXBsYXRlLmh0bWxgO1xuICAgICAgICBjb25zdCBtZXRhOiBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlID0ge1xuICAgICAgICAgIC4uLmRpcmVjdGl2ZU1ldGFkYXRhKHR5cGUsIG1ldGFkYXRhKSxcbiAgICAgICAgICB0eXBlU291cmNlU3BhbjogY29tcGlsZXIuY3JlYXRlUGFyc2VTb3VyY2VTcGFuKCdDb21wb25lbnQnLCB0eXBlLm5hbWUsIHRlbXBsYXRlVXJsKSxcbiAgICAgICAgICB0ZW1wbGF0ZTogbWV0YWRhdGEudGVtcGxhdGUgfHwgJycsXG4gICAgICAgICAgcHJlc2VydmVXaGl0ZXNwYWNlczogbWV0YWRhdGEucHJlc2VydmVXaGl0ZXNwYWNlcyB8fCBmYWxzZSxcbiAgICAgICAgICBzdHlsZXM6IG1ldGFkYXRhLnN0eWxlcyB8fCBFTVBUWV9BUlJBWSxcbiAgICAgICAgICBhbmltYXRpb25zOiBtZXRhZGF0YS5hbmltYXRpb25zLFxuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtdLFxuICAgICAgICAgIGNoYW5nZURldGVjdGlvbjogbWV0YWRhdGEuY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgICAgIHBpcGVzOiBuZXcgTWFwKCksXG4gICAgICAgICAgZW5jYXBzdWxhdGlvbjogbWV0YWRhdGEuZW5jYXBzdWxhdGlvbiB8fCBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZCxcbiAgICAgICAgICBpbnRlcnBvbGF0aW9uOiBtZXRhZGF0YS5pbnRlcnBvbGF0aW9uLFxuICAgICAgICAgIHZpZXdQcm92aWRlcnM6IG1ldGFkYXRhLnZpZXdQcm92aWRlcnMgfHwgbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG1ldGEudXNlc0luaGVyaXRhbmNlKSB7XG4gICAgICAgICAgYWRkQmFzZURlZlRvVW5kZWNvcmF0ZWRQYXJlbnRzKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIG5nQ29tcG9uZW50RGVmID0gY29tcGlsZXIuY29tcGlsZUNvbXBvbmVudChhbmd1bGFyQ29yZUVudiwgdGVtcGxhdGVVcmwsIG1ldGEpO1xuXG4gICAgICAgIC8vIFdoZW4gTmdNb2R1bGUgZGVjb3JhdG9yIGV4ZWN1dGVkLCB3ZSBlbnF1ZXVlZCB0aGUgbW9kdWxlIGRlZmluaXRpb24gc3VjaCB0aGF0XG4gICAgICAgIC8vIGl0IHdvdWxkIG9ubHkgZGVxdWV1ZSBhbmQgYWRkIGl0c2VsZiBhcyBtb2R1bGUgc2NvcGUgdG8gYWxsIG9mIGl0cyBkZWNsYXJhdGlvbnMsXG4gICAgICAgIC8vIGJ1dCBvbmx5IGlmICBpZiBhbGwgb2YgaXRzIGRlY2xhcmF0aW9ucyBoYWQgcmVzb2x2ZWQuIFRoaXMgY2FsbCBydW5zIHRoZSBjaGVja1xuICAgICAgICAvLyB0byBzZWUgaWYgYW55IG1vZHVsZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlIGNhbiBiZSBkZXF1ZXVlZCBhbmQgYWRkIHNjb3BlIHRvXG4gICAgICAgIC8vIHRoZWlyIGRlY2xhcmF0aW9ucy5cbiAgICAgICAgZmx1c2hNb2R1bGVTY29waW5nUXVldWVBc011Y2hBc1Bvc3NpYmxlKCk7XG5cbiAgICAgICAgLy8gSWYgY29tcG9uZW50IGNvbXBpbGF0aW9uIGlzIGFzeW5jLCB0aGVuIHRoZSBATmdNb2R1bGUgYW5ub3RhdGlvbiB3aGljaCBkZWNsYXJlcyB0aGVcbiAgICAgICAgLy8gY29tcG9uZW50IG1heSBleGVjdXRlIGFuZCBzZXQgYW4gbmdTZWxlY3RvclNjb3BlIHByb3BlcnR5IG9uIHRoZSBjb21wb25lbnQgdHlwZS4gVGhpc1xuICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbXBvbmVudCB0byBwYXRjaCBpdHNlbGYgd2l0aCBkaXJlY3RpdmVEZWZzIGZyb20gdGhlIG1vZHVsZSBhZnRlciBpdFxuICAgICAgICAvLyBmaW5pc2hlcyBjb21waWxpbmcuXG4gICAgICAgIGlmIChoYXNTZWxlY3RvclNjb3BlKHR5cGUpKSB7XG4gICAgICAgICAgY29uc3Qgc2NvcGVzID0gdHJhbnNpdGl2ZVNjb3Blc0Zvcih0eXBlLm5nU2VsZWN0b3JTY29wZSk7XG4gICAgICAgICAgcGF0Y2hDb21wb25lbnREZWZXaXRoU2NvcGUobmdDb21wb25lbnREZWYsIHNjb3Blcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZ0NvbXBvbmVudERlZjtcbiAgICB9LFxuICAgIC8vIE1ha2UgdGhlIHByb3BlcnR5IGNvbmZpZ3VyYWJsZSBpbiBkZXYgbW9kZSB0byBhbGxvdyBvdmVycmlkaW5nIGluIHRlc3RzXG4gICAgY29uZmlndXJhYmxlOiAhIW5nRGV2TW9kZSxcbiAgfSk7XG5cblxuICAvLyBBZGQgbmdJbmplY3RhYmxlRGVmIHNvIGNvbXBvbmVudHMgYXJlIHJlYWNoYWJsZSB0aHJvdWdoIHRoZSBtb2R1bGUgaW5qZWN0b3IgYnkgZGVmYXVsdFxuICAvLyBUaGlzIGlzIG1vc3RseSB0byBzdXBwb3J0IGluamVjdGluZyBjb21wb25lbnRzIGluIHRlc3RzLiBJbiByZWFsIGFwcGxpY2F0aW9uIGNvZGUsXG4gIC8vIGNvbXBvbmVudHMgc2hvdWxkIGJlIHJldHJpZXZlZCB0aHJvdWdoIHRoZSBub2RlIGluamVjdG9yLCBzbyB0aGlzIGlzbid0IGEgcHJvYmxlbS5cbiAgY29tcGlsZUluamVjdGFibGUodHlwZSk7XG59XG5cbmZ1bmN0aW9uIGhhc1NlbGVjdG9yU2NvcGU8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogY29tcG9uZW50IGlzIFR5cGU8VD4mXG4gICAge25nU2VsZWN0b3JTY29wZTogVHlwZTxhbnk+fSB7XG4gIHJldHVybiAoY29tcG9uZW50IGFze25nU2VsZWN0b3JTY29wZT86IGFueX0pLm5nU2VsZWN0b3JTY29wZSAhPT0gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENvbXBpbGUgYW4gQW5ndWxhciBkaXJlY3RpdmUgYWNjb3JkaW5nIHRvIGl0cyBkZWNvcmF0b3IgbWV0YWRhdGEsIGFuZCBwYXRjaCB0aGUgcmVzdWx0aW5nXG4gKiBuZ0RpcmVjdGl2ZURlZiBvbnRvIHRoZSBjb21wb25lbnQgdHlwZS5cbiAqXG4gKiBJbiB0aGUgZXZlbnQgdGhhdCBjb21waWxhdGlvbiBpcyBub3QgaW1tZWRpYXRlLCBgY29tcGlsZURpcmVjdGl2ZWAgd2lsbCByZXR1cm4gYSBgUHJvbWlzZWAgd2hpY2hcbiAqIHdpbGwgcmVzb2x2ZSB3aGVuIGNvbXBpbGF0aW9uIGNvbXBsZXRlcyBhbmQgdGhlIGRpcmVjdGl2ZSBiZWNvbWVzIHVzYWJsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVEaXJlY3RpdmUodHlwZTogVHlwZTxhbnk+LCBkaXJlY3RpdmU6IERpcmVjdGl2ZSk6IHZvaWQge1xuICBsZXQgbmdEaXJlY3RpdmVEZWY6IGFueSA9IG51bGw7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBOR19ESVJFQ1RJVkVfREVGLCB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdEaXJlY3RpdmVEZWYgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHR5cGUgJiYgdHlwZS5uYW1lO1xuICAgICAgICBjb25zdCBzb3VyY2VNYXBVcmwgPSBgbmc6Ly8ke25hbWV9L25nRGlyZWN0aXZlRGVmLmpzYDtcbiAgICAgICAgY29uc3QgY29tcGlsZXIgPSBnZXRDb21waWxlckZhY2FkZSgpO1xuICAgICAgICBjb25zdCBmYWNhZGUgPSBkaXJlY3RpdmVNZXRhZGF0YSh0eXBlIGFzIENvbXBvbmVudFR5cGU8YW55PiwgZGlyZWN0aXZlKTtcbiAgICAgICAgZmFjYWRlLnR5cGVTb3VyY2VTcGFuID0gY29tcGlsZXIuY3JlYXRlUGFyc2VTb3VyY2VTcGFuKCdEaXJlY3RpdmUnLCBuYW1lLCBzb3VyY2VNYXBVcmwpO1xuICAgICAgICBpZiAoZmFjYWRlLnVzZXNJbmhlcml0YW5jZSkge1xuICAgICAgICAgIGFkZEJhc2VEZWZUb1VuZGVjb3JhdGVkUGFyZW50cyh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBuZ0RpcmVjdGl2ZURlZiA9IGNvbXBpbGVyLmNvbXBpbGVEaXJlY3RpdmUoYW5ndWxhckNvcmVFbnYsIHNvdXJjZU1hcFVybCwgZmFjYWRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZ0RpcmVjdGl2ZURlZjtcbiAgICB9LFxuICAgIC8vIE1ha2UgdGhlIHByb3BlcnR5IGNvbmZpZ3VyYWJsZSBpbiBkZXYgbW9kZSB0byBhbGxvdyBvdmVycmlkaW5nIGluIHRlc3RzXG4gICAgY29uZmlndXJhYmxlOiAhIW5nRGV2TW9kZSxcbiAgfSk7XG5cbiAgLy8gQWRkIG5nSW5qZWN0YWJsZURlZiBzbyBkaXJlY3RpdmVzIGFyZSByZWFjaGFibGUgdGhyb3VnaCB0aGUgbW9kdWxlIGluamVjdG9yIGJ5IGRlZmF1bHRcbiAgLy8gVGhpcyBpcyBtb3N0bHkgdG8gc3VwcG9ydCBpbmplY3RpbmcgZGlyZWN0aXZlcyBpbiB0ZXN0cy4gSW4gcmVhbCBhcHBsaWNhdGlvbiBjb2RlLFxuICAvLyBkaXJlY3RpdmVzIHNob3VsZCBiZSByZXRyaWV2ZWQgdGhyb3VnaCB0aGUgbm9kZSBpbmplY3Rvciwgc28gdGhpcyBpc24ndCBhIHByb2JsZW0uXG4gIGNvbXBpbGVJbmplY3RhYmxlKHR5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kc0RpcmVjdGx5RnJvbU9iamVjdCh0eXBlOiBUeXBlPGFueT4pOiBib29sZWFuIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih0eXBlLnByb3RvdHlwZSkgPT09IE9iamVjdC5wcm90b3R5cGU7XG59XG5cbi8qKlxuICogRXh0cmFjdCB0aGUgYFIzRGlyZWN0aXZlTWV0YWRhdGFgIGZvciBhIHBhcnRpY3VsYXIgZGlyZWN0aXZlIChlaXRoZXIgYSBgRGlyZWN0aXZlYCBvciBhXG4gKiBgQ29tcG9uZW50YCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXJlY3RpdmVNZXRhZGF0YSh0eXBlOiBUeXBlPGFueT4sIG1ldGFkYXRhOiBEaXJlY3RpdmUpOiBSM0RpcmVjdGl2ZU1ldGFkYXRhRmFjYWRlIHtcbiAgLy8gUmVmbGVjdCBpbnB1dHMgYW5kIG91dHB1dHMuXG4gIGNvbnN0IHByb3BNZXRhZGF0YSA9IGdldFJlZmxlY3QoKS5vd25Qcm9wTWV0YWRhdGEodHlwZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiB0eXBlLm5hbWUsXG4gICAgdHlwZTogdHlwZSxcbiAgICB0eXBlQXJndW1lbnRDb3VudDogMCxcbiAgICBzZWxlY3RvcjogbWV0YWRhdGEuc2VsZWN0b3IgISxcbiAgICBkZXBzOiByZWZsZWN0RGVwZW5kZW5jaWVzKHR5cGUpLFxuICAgIGhvc3Q6IG1ldGFkYXRhLmhvc3QgfHwgRU1QVFlfT0JKLFxuICAgIHByb3BNZXRhZGF0YTogcHJvcE1ldGFkYXRhLFxuICAgIGlucHV0czogbWV0YWRhdGEuaW5wdXRzIHx8IEVNUFRZX0FSUkFZLFxuICAgIG91dHB1dHM6IG1ldGFkYXRhLm91dHB1dHMgfHwgRU1QVFlfQVJSQVksXG4gICAgcXVlcmllczogZXh0cmFjdFF1ZXJpZXNNZXRhZGF0YSh0eXBlLCBwcm9wTWV0YWRhdGEsIGlzQ29udGVudFF1ZXJ5KSxcbiAgICBsaWZlY3ljbGU6IHt1c2VzT25DaGFuZ2VzOiB0eXBlLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnbmdPbkNoYW5nZXMnKX0sXG4gICAgdHlwZVNvdXJjZVNwYW46IG51bGwgISxcbiAgICB1c2VzSW5oZXJpdGFuY2U6ICFleHRlbmRzRGlyZWN0bHlGcm9tT2JqZWN0KHR5cGUpLFxuICAgIGV4cG9ydEFzOiBleHRyYWN0RXhwb3J0QXMobWV0YWRhdGEuZXhwb3J0QXMpLFxuICAgIHByb3ZpZGVyczogbWV0YWRhdGEucHJvdmlkZXJzIHx8IG51bGwsXG4gICAgdmlld1F1ZXJpZXM6IGV4dHJhY3RRdWVyaWVzTWV0YWRhdGEodHlwZSwgcHJvcE1ldGFkYXRhLCBpc1ZpZXdRdWVyeSksXG4gIH07XG59XG5cbi8qKlxuICogQWRkcyBhbiBgbmdCYXNlRGVmYCB0byBhbGwgcGFyZW50IGNsYXNzZXMgb2YgYSB0eXBlIHRoYXQgZG9uJ3QgaGF2ZSBhbiBBbmd1bGFyIGRlY29yYXRvci5cbiAqL1xuZnVuY3Rpb24gYWRkQmFzZURlZlRvVW5kZWNvcmF0ZWRQYXJlbnRzKHR5cGU6IFR5cGU8YW55Pikge1xuICBjb25zdCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xuICBsZXQgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHR5cGUpO1xuXG4gIC8vIEdvIHVwIHRoZSBwcm90b3R5cGUgdW50aWwgd2UgaGl0IGBPYmplY3RgLlxuICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gb2JqUHJvdG90eXBlKSB7XG4gICAgLy8gU2luY2UgaW5oZXJpdGFuY2Ugd29ya3MgaWYgdGhlIGNsYXNzIHdhcyBhbm5vdGF0ZWQgYWxyZWFkeSwgd2Ugb25seSBuZWVkIHRvIGFkZFxuICAgIC8vIHRoZSBiYXNlIGRlZiBpZiB0aGVyZSBhcmUgbm8gYW5ub3RhdGlvbnMgYW5kIHRoZSBiYXNlIGRlZiBoYXNuJ3QgYmVlbiBjcmVhdGVkIGFscmVhZHkuXG4gICAgaWYgKCFnZXREaXJlY3RpdmVEZWYocGFyZW50KSAmJiAhZ2V0Q29tcG9uZW50RGVmKHBhcmVudCkgJiYgIWdldEJhc2VEZWYocGFyZW50KSkge1xuICAgICAgY29uc3QgZmFjYWRlID0gZXh0cmFjdEJhc2VEZWZNZXRhZGF0YShwYXJlbnQpO1xuICAgICAgZmFjYWRlICYmIGNvbXBpbGVCYXNlKHBhcmVudCwgZmFjYWRlKTtcbiAgICB9XG4gICAgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gIH1cbn1cblxuLyoqIENvbXBpbGVzIHRoZSBiYXNlIG1ldGFkYXRhIGludG8gYSBiYXNlIGRlZmluaXRpb24uICovXG5mdW5jdGlvbiBjb21waWxlQmFzZSh0eXBlOiBUeXBlPGFueT4sIGZhY2FkZTogUjNCYXNlTWV0YWRhdGFGYWNhZGUpOiB2b2lkIHtcbiAgbGV0IG5nQmFzZURlZjogYW55ID0gbnVsbDtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIE5HX0JBU0VfREVGLCB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdCYXNlRGVmID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlICYmIHR5cGUubmFtZTtcbiAgICAgICAgY29uc3Qgc291cmNlTWFwVXJsID0gYG5nOi8vJHtuYW1lfS9uZ0Jhc2VEZWYuanNgO1xuICAgICAgICBjb25zdCBjb21waWxlciA9IGdldENvbXBpbGVyRmFjYWRlKCk7XG4gICAgICAgIG5nQmFzZURlZiA9IGNvbXBpbGVyLmNvbXBpbGVCYXNlKGFuZ3VsYXJDb3JlRW52LCBzb3VyY2VNYXBVcmwsIGZhY2FkZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmdCYXNlRGVmO1xuICAgIH0sXG4gICAgLy8gTWFrZSB0aGUgcHJvcGVydHkgY29uZmlndXJhYmxlIGluIGRldiBtb2RlIHRvIGFsbG93IG92ZXJyaWRpbmcgaW4gdGVzdHNcbiAgICBjb25maWd1cmFibGU6ICEhbmdEZXZNb2RlLFxuICB9KTtcbn1cblxuLyoqIEV4dHJhY3RzIHRoZSBtZXRhZGF0YSBuZWNlc3NhcnkgdG8gY29uc3RydWN0IGFuIGBuZ0Jhc2VEZWZgIGZyb20gYSBjbGFzcy4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RCYXNlRGVmTWV0YWRhdGEodHlwZTogVHlwZTxhbnk+KTogUjNCYXNlTWV0YWRhdGFGYWNhZGV8bnVsbCB7XG4gIGNvbnN0IHByb3BNZXRhZGF0YSA9IGdldFJlZmxlY3QoKS5vd25Qcm9wTWV0YWRhdGEodHlwZSk7XG4gIGNvbnN0IHZpZXdRdWVyaWVzID0gZXh0cmFjdFF1ZXJpZXNNZXRhZGF0YSh0eXBlLCBwcm9wTWV0YWRhdGEsIGlzVmlld1F1ZXJ5KTtcbiAgY29uc3QgcXVlcmllcyA9IGV4dHJhY3RRdWVyaWVzTWV0YWRhdGEodHlwZSwgcHJvcE1ldGFkYXRhLCBpc0NvbnRlbnRRdWVyeSk7XG4gIGxldCBpbnB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddfXx1bmRlZmluZWQ7XG4gIGxldCBvdXRwdXRzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfXx1bmRlZmluZWQ7XG4gIC8vIFdlIG9ubHkgbmVlZCB0byBrbm93IHdoZXRoZXIgdGhlcmUgYXJlIGFueSBIb3N0TGlzdGVuZXIgb3IgSG9zdEJpbmRpbmdcbiAgLy8gZGVjb3JhdG9ycyBwcmVzZW50LCB0aGUgcGFyc2luZyBsb2dpYyBpcyBpbiB0aGUgY29tcGlsZXIgYWxyZWFkeS5cbiAgbGV0IGhhc0hvc3REZWNvcmF0b3JzID0gZmFsc2U7XG5cbiAgZm9yIChjb25zdCBmaWVsZCBpbiBwcm9wTWV0YWRhdGEpIHtcbiAgICBwcm9wTWV0YWRhdGFbZmllbGRdLmZvckVhY2goYW5uID0+IHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhTmFtZSA9IGFubi5uZ01ldGFkYXRhTmFtZTtcbiAgICAgIGlmIChtZXRhZGF0YU5hbWUgPT09ICdJbnB1dCcpIHtcbiAgICAgICAgaW5wdXRzID0gaW5wdXRzIHx8IHt9O1xuICAgICAgICBpbnB1dHNbZmllbGRdID0gYW5uLmJpbmRpbmdQcm9wZXJ0eU5hbWUgPyBbYW5uLmJpbmRpbmdQcm9wZXJ0eU5hbWUsIGZpZWxkXSA6IGZpZWxkO1xuICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YU5hbWUgPT09ICdPdXRwdXQnKSB7XG4gICAgICAgIG91dHB1dHMgPSBvdXRwdXRzIHx8IHt9O1xuICAgICAgICBvdXRwdXRzW2ZpZWxkXSA9IGFubi5iaW5kaW5nUHJvcGVydHlOYW1lIHx8IGZpZWxkO1xuICAgICAgfSBlbHNlIGlmIChtZXRhZGF0YU5hbWUgPT09ICdIb3N0QmluZGluZycgfHwgbWV0YWRhdGFOYW1lID09PSAnSG9zdExpc3RlbmVyJykge1xuICAgICAgICBoYXNIb3N0RGVjb3JhdG9ycyA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBPbmx5IGdlbmVyYXRlIHRoZSBiYXNlIGRlZiBpZiB0aGVyZSdzIGFueSBpbmZvIGluc2lkZSBpdC5cbiAgaWYgKGlucHV0cyB8fCBvdXRwdXRzIHx8IHZpZXdRdWVyaWVzLmxlbmd0aCB8fCBxdWVyaWVzLmxlbmd0aCB8fCBoYXNIb3N0RGVjb3JhdG9ycykge1xuICAgIHJldHVybiB7bmFtZTogdHlwZS5uYW1lLCBpbnB1dHMsIG91dHB1dHMsIHZpZXdRdWVyaWVzLCBxdWVyaWVzLCBwcm9wTWV0YWRhdGF9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRUb1IzUXVlcnlQcmVkaWNhdGUoc2VsZWN0b3I6IGFueSk6IGFueXxzdHJpbmdbXSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnID8gc3BsaXRCeUNvbW1hKHNlbGVjdG9yKSA6IHJlc29sdmVGb3J3YXJkUmVmKHNlbGVjdG9yKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1IzUXVlcnlNZXRhZGF0YShwcm9wZXJ0eU5hbWU6IHN0cmluZywgYW5uOiBRdWVyeSk6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZSB7XG4gIHJldHVybiB7XG4gICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eU5hbWUsXG4gICAgcHJlZGljYXRlOiBjb252ZXJ0VG9SM1F1ZXJ5UHJlZGljYXRlKGFubi5zZWxlY3RvciksXG4gICAgZGVzY2VuZGFudHM6IGFubi5kZXNjZW5kYW50cyxcbiAgICBmaXJzdDogYW5uLmZpcnN0LFxuICAgIHJlYWQ6IGFubi5yZWFkID8gYW5uLnJlYWQgOiBudWxsLFxuICAgIHN0YXRpYzogISFhbm4uc3RhdGljXG4gIH07XG59XG5mdW5jdGlvbiBleHRyYWN0UXVlcmllc01ldGFkYXRhKFxuICAgIHR5cGU6IFR5cGU8YW55PiwgcHJvcE1ldGFkYXRhOiB7W2tleTogc3RyaW5nXTogYW55W119LFxuICAgIGlzUXVlcnlBbm46IChhbm46IGFueSkgPT4gYW5uIGlzIFF1ZXJ5KTogUjNRdWVyeU1ldGFkYXRhRmFjYWRlW10ge1xuICBjb25zdCBxdWVyaWVzTWV0YTogUjNRdWVyeU1ldGFkYXRhRmFjYWRlW10gPSBbXTtcbiAgZm9yIChjb25zdCBmaWVsZCBpbiBwcm9wTWV0YWRhdGEpIHtcbiAgICBpZiAocHJvcE1ldGFkYXRhLmhhc093blByb3BlcnR5KGZpZWxkKSkge1xuICAgICAgY29uc3QgYW5ub3RhdGlvbnMgPSBwcm9wTWV0YWRhdGFbZmllbGRdO1xuICAgICAgYW5ub3RhdGlvbnMuZm9yRWFjaChhbm4gPT4ge1xuICAgICAgICBpZiAoaXNRdWVyeUFubihhbm4pKSB7XG4gICAgICAgICAgaWYgKCFhbm4uc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgQ2FuJ3QgY29uc3RydWN0IGEgcXVlcnkgZm9yIHRoZSBwcm9wZXJ0eSBcIiR7ZmllbGR9XCIgb2YgYCArXG4gICAgICAgICAgICAgICAgYFwiJHtzdHJpbmdpZnlGb3JFcnJvcih0eXBlKX1cIiBzaW5jZSB0aGUgcXVlcnkgc2VsZWN0b3Igd2Fzbid0IGRlZmluZWQuYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhbm5vdGF0aW9ucy5zb21lKGlzSW5wdXRBbm4pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBjb21iaW5lIEBJbnB1dCBkZWNvcmF0b3JzIHdpdGggcXVlcnkgZGVjb3JhdG9yc2ApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBxdWVyaWVzTWV0YS5wdXNoKGNvbnZlcnRUb1IzUXVlcnlNZXRhZGF0YShmaWVsZCwgYW5uKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcXVlcmllc01ldGE7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RFeHBvcnRBcyhleHBvcnRBczogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nW118bnVsbCB7XG4gIGlmIChleHBvcnRBcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZXhwb3J0QXMuc3BsaXQoJywnKS5tYXAocGFydCA9PiBwYXJ0LnRyaW0oKSk7XG59XG5cbmZ1bmN0aW9uIGlzQ29udGVudFF1ZXJ5KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBRdWVyeSB7XG4gIGNvbnN0IG5hbWUgPSB2YWx1ZS5uZ01ldGFkYXRhTmFtZTtcbiAgcmV0dXJuIG5hbWUgPT09ICdDb250ZW50Q2hpbGQnIHx8IG5hbWUgPT09ICdDb250ZW50Q2hpbGRyZW4nO1xufVxuXG5mdW5jdGlvbiBpc1ZpZXdRdWVyeSh2YWx1ZTogYW55KTogdmFsdWUgaXMgUXVlcnkge1xuICBjb25zdCBuYW1lID0gdmFsdWUubmdNZXRhZGF0YU5hbWU7XG4gIHJldHVybiBuYW1lID09PSAnVmlld0NoaWxkJyB8fCBuYW1lID09PSAnVmlld0NoaWxkcmVuJztcbn1cblxuZnVuY3Rpb24gaXNJbnB1dEFubih2YWx1ZTogYW55KTogdmFsdWUgaXMgSW5wdXQge1xuICByZXR1cm4gdmFsdWUubmdNZXRhZGF0YU5hbWUgPT09ICdJbnB1dCc7XG59XG5cbmZ1bmN0aW9uIHNwbGl0QnlDb21tYSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICByZXR1cm4gdmFsdWUuc3BsaXQoJywnKS5tYXAocGllY2UgPT4gcGllY2UudHJpbSgpKTtcbn1cbiJdfQ==