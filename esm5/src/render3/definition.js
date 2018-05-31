/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SimpleChange } from '../change_detection/change_detection_util';
import { ChangeDetectionStrategy } from '../change_detection/constants';
import { resolveRendererType2 } from '../view/util';
import { diPublic } from './di';
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
export function defineComponent(componentDefinition) {
    var type = componentDefinition.type;
    var pipeTypes = (componentDefinition.pipes);
    var directiveTypes = (componentDefinition.directives);
    var def = {
        type: type,
        diPublic: null,
        factory: componentDefinition.factory,
        template: componentDefinition.template || (null),
        hostBindings: componentDefinition.hostBindings || null,
        attributes: componentDefinition.attributes || null,
        inputs: invertObject(componentDefinition.inputs),
        outputs: invertObject(componentDefinition.outputs),
        rendererType: resolveRendererType2(componentDefinition.rendererType) || null,
        exportAs: componentDefinition.exportAs,
        onInit: type.prototype.ngOnInit || null,
        doCheck: type.prototype.ngDoCheck || null,
        afterContentInit: type.prototype.ngAfterContentInit || null,
        afterContentChecked: type.prototype.ngAfterContentChecked || null,
        afterViewInit: type.prototype.ngAfterViewInit || null,
        afterViewChecked: type.prototype.ngAfterViewChecked || null,
        onDestroy: type.prototype.ngOnDestroy || null,
        onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
        directiveDefs: directiveTypes ?
            function () {
                return (typeof directiveTypes === 'function' ? directiveTypes() : directiveTypes)
                    .map(extractDirectiveDef);
            } :
            null,
        pipeDefs: pipeTypes ?
            function () { return (typeof pipeTypes === 'function' ? pipeTypes() : pipeTypes).map(extractPipeDef); } :
            null,
        selectors: componentDefinition.selectors
    };
    var feature = componentDefinition.features;
    feature && feature.forEach(function (fn) { return fn(def); });
    return def;
}
export function extractDirectiveDef(type) {
    var def = type.ngComponentDef || type.ngDirectiveDef;
    if (ngDevMode && !def) {
        throw new Error("'" + type.name + "' is neither 'ComponentType' or 'DirectiveType'.");
    }
    return def;
}
export function extractPipeDef(type) {
    var def = type.ngPipeDef;
    if (ngDevMode && !def) {
        throw new Error("'" + type.name + "' is not a 'PipeType'.");
    }
    return def;
}
var PRIVATE_PREFIX = '__ngOnChanges_';
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
export function NgOnChangesFeature(inputPropertyNames) {
    return function (definition) {
        var inputs = definition.inputs;
        var proto = definition.type.prototype;
        var _loop_1 = function (pubKey) {
            var minKey = inputs[pubKey];
            var propertyName = inputPropertyNames && inputPropertyNames[minKey] || pubKey;
            var privateMinKey = PRIVATE_PREFIX + minKey;
            var originalProperty = Object.getOwnPropertyDescriptor(proto, minKey);
            var getter = originalProperty && originalProperty.get;
            var setter = originalProperty && originalProperty.set;
            // create a getter and setter for property
            Object.defineProperty(proto, minKey, {
                get: getter ||
                    (setter ? undefined : function () { return this[privateMinKey]; }),
                set: function (value) {
                    var simpleChanges = this[PRIVATE_PREFIX];
                    if (!simpleChanges) {
                        // Place where we will store SimpleChanges if there is a change
                        Object.defineProperty(this, PRIVATE_PREFIX, { value: simpleChanges = {}, writable: true });
                    }
                    var isFirstChange = !this.hasOwnProperty(privateMinKey);
                    var currentChange = simpleChanges[propertyName];
                    if (currentChange) {
                        currentChange.currentValue = value;
                    }
                    else {
                        simpleChanges[propertyName] =
                            new SimpleChange(this[privateMinKey], value, isFirstChange);
                    }
                    if (isFirstChange) {
                        // Create a place where the actual value will be stored and make it non-enumerable
                        Object.defineProperty(this, privateMinKey, { value: value, writable: true });
                    }
                    else {
                        this[privateMinKey] = value;
                    }
                    setter && setter.call(this, value);
                }
            });
        };
        for (var pubKey in inputs) {
            _loop_1(pubKey);
        }
        // If an onInit hook is defined, it will need to wrap the ngOnChanges call
        // so the call order is changes-init-check in creation mode. In subsequent
        // change detection runs, only the check wrapper will be called.
        if (definition.onInit != null) {
            definition.onInit = onChangesWrapper(definition.onInit);
        }
        definition.doCheck = onChangesWrapper(definition.doCheck);
    };
    function onChangesWrapper(delegateHook) {
        return function () {
            var simpleChanges = this[PRIVATE_PREFIX];
            if (simpleChanges != null) {
                this.ngOnChanges(simpleChanges);
                this[PRIVATE_PREFIX] = null;
            }
            delegateHook && delegateHook.apply(this);
        };
    }
}
export function PublicFeature(definition) {
    definition.diPublic = diPublic;
}
var EMPTY = {};
/** Swaps the keys and values of an object. */
function invertObject(obj) {
    if (obj == null)
        return EMPTY;
    var newObj = {};
    for (var minifiedKey in obj) {
        newObj[obj[minifiedKey]] = minifiedKey;
    }
    return newObj;
}
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
export var defineDirective = defineComponent;
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
export function definePipe(pipeDef) {
    return {
        name: pipeDef.name,
        factory: pipeDef.factory,
        pure: pipeDef.pure !== false,
        onDestroy: pipeDef.type.prototype.ngOnDestroy || null
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvZGVmaW5pdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBTXRFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVsRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBcUI5QixNQUFNLDBCQUE2QixtQkE4SGxDO0lBQ0MsSUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDO0lBQ3RDLElBQU0sU0FBUyxHQUFHLENBQUEsbUJBQW1CLENBQUMsS0FBTyxDQUFBLENBQUM7SUFDOUMsSUFBTSxjQUFjLEdBQUcsQ0FBQSxtQkFBbUIsQ0FBQyxVQUFZLENBQUEsQ0FBQztJQUN4RCxJQUFNLEdBQUcsR0FBc0I7UUFDN0IsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxPQUFPO1FBQ3BDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLEtBQUksSUFBTSxDQUFBO1FBQ2hELFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxZQUFZLElBQUksSUFBSTtRQUN0RCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxJQUFJLElBQUk7UUFDbEQsTUFBTSxFQUFFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7UUFDaEQsT0FBTyxFQUFFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7UUFDbEQsWUFBWSxFQUFFLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FB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TSxNQUFNLEdBQVEsRUFBRSxDQUFDO0lBQ3ZCLEtBQUssSUFBSSxXQUFXLElBQUksR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7S0FDeEM7SUFDRCxPQUFPLE1BQU0sQ0FBQztDQUNmOzs7Ozs7Ozs7Ozs7Ozs7QUFnQkQsTUFBTSxDQUFDLElBQU0sZUFBZSxHQUFHLGVBZ0VwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFnQlosTUFBTSxxQkFBd0IsT0FZN0I7SUFDQyxPQUFvQjtRQUNsQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUs7UUFDNUIsU0FBUyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxJQUFJO0tBQzVDLENBQUM7Q0FDYiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTaW1wbGVDaGFuZ2V9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY29uc3RhbnRzJztcbmltcG9ydCB7UGlwZVRyYW5zZm9ybX0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9waXBlX3RyYW5zZm9ybSc7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7T25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICcuLi9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3MnO1xuaW1wb3J0IHtSZW5kZXJlclR5cGUyfSBmcm9tICcuLi9yZW5kZXIvYXBpJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5pbXBvcnQge3Jlc29sdmVSZW5kZXJlclR5cGUyfSBmcm9tICcuLi92aWV3L3V0aWwnO1xuXG5pbXBvcnQge2RpUHVibGljfSBmcm9tICcuL2RpJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBDb21wb25lbnREZWZGZWF0dXJlLCBDb21wb25lbnRUZW1wbGF0ZSwgQ29tcG9uZW50VHlwZSwgRGlyZWN0aXZlRGVmLCBEaXJlY3RpdmVEZWZGZWF0dXJlLCBEaXJlY3RpdmVEZWZMaXN0T3JGYWN0b3J5LCBEaXJlY3RpdmVUeXBlLCBEaXJlY3RpdmVUeXBlc09yRmFjdG9yeSwgUGlwZURlZiwgUGlwZVR5cGUsIFBpcGVUeXBlc09yRmFjdG9yeX0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtDc3NTZWxlY3Rvckxpc3QsIFNlbGVjdG9yRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9wcm9qZWN0aW9uJztcblxuXG5cbi8qKlxuICogQ3JlYXRlIGEgY29tcG9uZW50IGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqXG4gKiAjIEV4YW1wbGVcbiAqIGBgYFxuICogY2xhc3MgTXlEaXJlY3RpdmUge1xuICogICAvLyBHZW5lcmF0ZWQgYnkgQW5ndWxhciBUZW1wbGF0ZSBDb21waWxlclxuICogICAvLyBbU3ltYm9sXSBzeW50YXggd2lsbCBub3QgYmUgc3VwcG9ydGVkIGJ5IFR5cGVTY3JpcHQgdW50aWwgdjIuN1xuICogICBzdGF0aWMgbmdDb21wb25lbnREZWYgPSBkZWZpbmVDb21wb25lbnQoe1xuICogICAgIC4uLlxuICogICB9KTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lQ29tcG9uZW50PFQ+KGNvbXBvbmVudERlZmluaXRpb246IHtcbiAgLyoqXG4gICAqIERpcmVjdGl2ZSB0eXBlLCBuZWVkZWQgdG8gY29uZmlndXJlIHRoZSBpbmplY3Rvci5cbiAgICovXG4gIHR5cGU6IFR5cGU8VD47XG5cbiAgLyoqIFRoZSBzZWxlY3RvcnMgdGhhdCB3aWxsIGJlIHVzZWQgdG8gbWF0Y2ggbm9kZXMgdG8gdGhpcyBjb21wb25lbnQuICovXG4gIHNlbGVjdG9yczogQ3NzU2VsZWN0b3JMaXN0O1xuXG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB1c2VkIHRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBkaXJlY3RpdmUuXG4gICAqL1xuICBmYWN0b3J5OiAoKSA9PiBUIHwgKHswOiBUfSAmIGFueVtdKTsgLyogdHJ5aW5nIHRvIHNheSBUIHwgW1QsIC4uLmFueV0gKi9cblxuICAvKipcbiAgICogU3RhdGljIGF0dHJpYnV0ZXMgdG8gc2V0IG9uIGhvc3QgZWxlbWVudC5cbiAgICpcbiAgICogRXZlbiBpbmRpY2VzOiBhdHRyaWJ1dGUgbmFtZVxuICAgKiBPZGQgaW5kaWNlczogYXR0cmlidXRlIHZhbHVlXG4gICAqL1xuICBhdHRyaWJ1dGVzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIGlucHV0IG5hbWVzLlxuICAgKlxuICAgKiBUaGUgZm9ybWF0IGlzIGluOiBge1thY3R1YWxQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFdoaWNoIHRoZSBtaW5pZmllciBtYXkgdHJhbnNsYXRlIHRvOiBge1ttaW5pZmllZFByb3BlcnR5TmFtZTogc3RyaW5nXTpzdHJpbmd9YC5cbiAgICpcbiAgICogVGhpcyBhbGxvd3MgdGhlIHJlbmRlciB0byByZS1jb25zdHJ1Y3QgdGhlIG1pbmlmaWVkIGFuZCBub24tbWluaWZpZWQgbmFtZXNcbiAgICogb2YgcHJvcGVydGllcy5cbiAgICovXG4gIGlucHV0cz86IHtbUCBpbiBrZXlvZiBUXT86IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIEEgbWFwIG9mIG91dHB1dCBuYW1lcy5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBpbjogYHtbYWN0dWFsUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBXaGljaCB0aGUgbWluaWZpZXIgbWF5IHRyYW5zbGF0ZSB0bzogYHtbbWluaWZpZWRQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFRoaXMgYWxsb3dzIHRoZSByZW5kZXIgdG8gcmUtY29uc3RydWN0IHRoZSBtaW5pZmllZCBhbmQgbm9uLW1pbmlmaWVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqL1xuICBvdXRwdXRzPzoge1tQIGluIGtleW9mIFRdPzogc3RyaW5nfTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gZXhlY3V0ZWQgYnkgdGhlIHBhcmVudCB0ZW1wbGF0ZSB0byBhbGxvdyBjaGlsZCBkaXJlY3RpdmUgdG8gYXBwbHkgaG9zdCBiaW5kaW5ncy5cbiAgICovXG4gIGhvc3RCaW5kaW5ncz86IChkaXJlY3RpdmVJbmRleDogbnVtYmVyLCBlbGVtZW50SW5kZXg6IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgbmFtZSB0aGF0IGNhbiBiZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byBhc3NpZ24gdGhpcyBkaXJlY3RpdmUgdG8gYSB2YXJpYWJsZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgRGlyZWN0aXZlLmV4cG9ydEFzfVxuICAgKi9cbiAgZXhwb3J0QXM/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRlbXBsYXRlIGZ1bmN0aW9uIHVzZSBmb3IgcmVuZGVyaW5nIERPTS5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBoYXMgZm9sbG93aW5nIHN0cnVjdHVyZS5cbiAgICpcbiAgICogYGBgXG4gICAqIGZ1bmN0aW9uIFRlbXBsYXRlPFQ+KGN0eDpULCBjcmVhdGlvbk1vZGU6IGJvb2xlYW4pIHtcbiAgICogICBpZiAoY3JlYXRpb25Nb2RlKSB7XG4gICAqICAgICAvLyBDb250YWlucyBjcmVhdGlvbiBtb2RlIGluc3RydWN0aW9ucy5cbiAgICogICB9XG4gICAqICAgLy8gQ29udGFpbnMgYmluZGluZyB1cGRhdGUgaW5zdHJ1Y3Rpb25zXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIENvbW1vbiBpbnN0cnVjdGlvbnMgYXJlOlxuICAgKiBDcmVhdGlvbiBtb2RlIGluc3RydWN0aW9uczpcbiAgICogIC0gYGVsZW1lbnRTdGFydGAsIGBlbGVtZW50RW5kYFxuICAgKiAgLSBgdGV4dGBcbiAgICogIC0gYGNvbnRhaW5lcmBcbiAgICogIC0gYGxpc3RlbmVyYFxuICAgKlxuICAgKiBCaW5kaW5nIHVwZGF0ZSBpbnN0cnVjdGlvbnM6XG4gICAqIC0gYGJpbmRgXG4gICAqIC0gYGVsZW1lbnRBdHRyaWJ1dGVgXG4gICAqIC0gYGVsZW1lbnRQcm9wZXJ0eWBcbiAgICogLSBgZWxlbWVudENsYXNzYFxuICAgKiAtIGBlbGVtZW50U3R5bGVgXG4gICAqXG4gICAqL1xuICB0ZW1wbGF0ZTogQ29tcG9uZW50VGVtcGxhdGU8VD47XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBvcHRpb25hbCBmZWF0dXJlcyB0byBhcHBseS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTmdPbkNoYW5nZXNGZWF0dXJlfSwge0BsaW5rIFB1YmxpY0ZlYXR1cmV9XG4gICAqL1xuICBmZWF0dXJlcz86IENvbXBvbmVudERlZkZlYXR1cmVbXTtcblxuICByZW5kZXJlclR5cGU/OiBSZW5kZXJlclR5cGUyO1xuXG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBzZXQgb2YgaW5qZWN0YWJsZSBvYmplY3RzIHRoYXQgYXJlIHZpc2libGUgdG8gYSBEaXJlY3RpdmUgYW5kIGl0cyBsaWdodCBET01cbiAgICogY2hpbGRyZW4uXG4gICAqL1xuICBwcm92aWRlcnM/OiBQcm92aWRlcltdO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBzZXQgb2YgaW5qZWN0YWJsZSBvYmplY3RzIHRoYXQgYXJlIHZpc2libGUgdG8gaXRzIHZpZXcgRE9NIGNoaWxkcmVuLlxuICAgKi9cbiAgdmlld1Byb3ZpZGVycz86IFByb3ZpZGVyW107XG5cbiAgLyoqXG4gICAqIFJlZ2lzdHJ5IG9mIGRpcmVjdGl2ZXMgYW5kIGNvbXBvbmVudHMgdGhhdCBtYXkgYmUgZm91bmQgaW4gdGhpcyBjb21wb25lbnQncyB2aWV3LlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgZWl0aGVyIGFuIGFycmF5IG9mIGBEaXJlY3RpdmVEZWZgcyBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIGFycmF5IG9mXG4gICAqIGBEaXJlY3RpdmVEZWZgcy4gVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gICAqL1xuICBkaXJlY3RpdmVzPzogRGlyZWN0aXZlVHlwZXNPckZhY3RvcnkgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RyeSBvZiBwaXBlcyB0aGF0IG1heSBiZSBmb3VuZCBpbiB0aGlzIGNvbXBvbmVudCdzIHZpZXcuXG4gICAqXG4gICAqIFRoZSBwcm9wZXJ0eSBpcyBlaXRoZXIgYW4gYXJyYXkgb2YgYFBpcGVEZWZzYHMgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIHRoZSBhcnJheSBvZlxuICAgKiBgUGlwZURlZnNgcy4gVGhlIGZ1bmN0aW9uIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIHN1cHBvcnQgZm9yd2FyZCBkZWNsYXJhdGlvbnMuXG4gICAqL1xuICBwaXBlcz86IFBpcGVUeXBlc09yRmFjdG9yeSB8IG51bGw7XG59KTogbmV2ZXIge1xuICBjb25zdCB0eXBlID0gY29tcG9uZW50RGVmaW5pdGlvbi50eXBlO1xuICBjb25zdCBwaXBlVHlwZXMgPSBjb21wb25lbnREZWZpbml0aW9uLnBpcGVzICE7XG4gIGNvbnN0IGRpcmVjdGl2ZVR5cGVzID0gY29tcG9uZW50RGVmaW5pdGlvbi5kaXJlY3RpdmVzICE7XG4gIGNvbnN0IGRlZiA9IDxDb21wb25lbnREZWY8YW55Pj57XG4gICAgdHlwZTogdHlwZSxcbiAgICBkaVB1YmxpYzogbnVsbCxcbiAgICBmYWN0b3J5OiBjb21wb25lbnREZWZpbml0aW9uLmZhY3RvcnksXG4gICAgdGVtcGxhdGU6IGNvbXBvbmVudERlZmluaXRpb24udGVtcGxhdGUgfHwgbnVsbCAhLFxuICAgIGhvc3RCaW5kaW5nczogY29tcG9uZW50RGVmaW5pdGlvbi5ob3N0QmluZGluZ3MgfHwgbnVsbCxcbiAgICBhdHRyaWJ1dGVzOiBjb21wb25lbnREZWZpbml0aW9uLmF0dHJpYnV0ZXMgfHwgbnVsbCxcbiAgICBpbnB1dHM6IGludmVydE9iamVjdChjb21wb25lbnREZWZpbml0aW9uLmlucHV0cyksXG4gICAgb3V0cHV0czogaW52ZXJ0T2JqZWN0KGNvbXBvbmVudERlZmluaXRpb24ub3V0cHV0cyksXG4gICAgcmVuZGVyZXJUeXBlOiByZXNvbHZlUmVuZGVyZXJUeXBlMihjb21wb25lbnREZWZpbml0aW9uLnJlbmRlcmVyVHlwZSkgfHwgbnVsbCxcbiAgICBleHBvcnRBczogY29tcG9uZW50RGVmaW5pdGlvbi5leHBvcnRBcyxcbiAgICBvbkluaXQ6IHR5cGUucHJvdG90eXBlLm5nT25Jbml0IHx8IG51bGwsXG4gICAgZG9DaGVjazogdHlwZS5wcm90b3R5cGUubmdEb0NoZWNrIHx8IG51bGwsXG4gICAgYWZ0ZXJDb250ZW50SW5pdDogdHlwZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRJbml0IHx8IG51bGwsXG4gICAgYWZ0ZXJDb250ZW50Q2hlY2tlZDogdHlwZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRDaGVja2VkIHx8IG51bGwsXG4gICAgYWZ0ZXJWaWV3SW5pdDogdHlwZS5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0IHx8IG51bGwsXG4gICAgYWZ0ZXJWaWV3Q2hlY2tlZDogdHlwZS5wcm90b3R5cGUubmdBZnRlclZpZXdDaGVja2VkIHx8IG51bGwsXG4gICAgb25EZXN0cm95OiB0eXBlLnByb3RvdHlwZS5uZ09uRGVzdHJveSB8fCBudWxsLFxuICAgIG9uUHVzaDogY29tcG9uZW50RGVmaW5pdGlvbi5jaGFuZ2VEZXRlY3Rpb24gPT09IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBkaXJlY3RpdmVEZWZzOiBkaXJlY3RpdmVUeXBlcyA/XG4gICAgICAgICgpID0+ICh0eXBlb2YgZGlyZWN0aXZlVHlwZXMgPT09ICdmdW5jdGlvbicgPyBkaXJlY3RpdmVUeXBlcygpIDogZGlyZWN0aXZlVHlwZXMpXG4gICAgICAgICAgICAgICAgICAubWFwKGV4dHJhY3REaXJlY3RpdmVEZWYpIDpcbiAgICAgICAgbnVsbCxcbiAgICBwaXBlRGVmczogcGlwZVR5cGVzID9cbiAgICAgICAgKCkgPT4gKHR5cGVvZiBwaXBlVHlwZXMgPT09ICdmdW5jdGlvbicgPyBwaXBlVHlwZXMoKSA6IHBpcGVUeXBlcykubWFwKGV4dHJhY3RQaXBlRGVmKSA6XG4gICAgICAgIG51bGwsXG4gICAgc2VsZWN0b3JzOiBjb21wb25lbnREZWZpbml0aW9uLnNlbGVjdG9yc1xuICB9O1xuICBjb25zdCBmZWF0dXJlID0gY29tcG9uZW50RGVmaW5pdGlvbi5mZWF0dXJlcztcbiAgZmVhdHVyZSAmJiBmZWF0dXJlLmZvckVhY2goKGZuKSA9PiBmbihkZWYpKTtcbiAgcmV0dXJuIGRlZiBhcyBuZXZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3REaXJlY3RpdmVEZWYodHlwZTogRGlyZWN0aXZlVHlwZTxhbnk+JiBDb21wb25lbnRUeXBlPGFueT4pOlxuICAgIERpcmVjdGl2ZURlZjxhbnk+fENvbXBvbmVudERlZjxhbnk+IHtcbiAgY29uc3QgZGVmID0gdHlwZS5uZ0NvbXBvbmVudERlZiB8fCB0eXBlLm5nRGlyZWN0aXZlRGVmO1xuICBpZiAobmdEZXZNb2RlICYmICFkZWYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCcke3R5cGUubmFtZX0nIGlzIG5laXRoZXIgJ0NvbXBvbmVudFR5cGUnIG9yICdEaXJlY3RpdmVUeXBlJy5gKTtcbiAgfVxuICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFBpcGVEZWYodHlwZTogUGlwZVR5cGU8YW55Pik6IFBpcGVEZWY8YW55PiB7XG4gIGNvbnN0IGRlZiA9IHR5cGUubmdQaXBlRGVmO1xuICBpZiAobmdEZXZNb2RlICYmICFkZWYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCcke3R5cGUubmFtZX0nIGlzIG5vdCBhICdQaXBlVHlwZScuYCk7XG4gIH1cbiAgcmV0dXJuIGRlZjtcbn1cblxuXG5cbmNvbnN0IFBSSVZBVEVfUFJFRklYID0gJ19fbmdPbkNoYW5nZXNfJztcblxudHlwZSBPbkNoYW5nZXNFeHBhbmRvID0gT25DaGFuZ2VzICYge1xuICBfX25nT25DaGFuZ2VzXzogU2ltcGxlQ2hhbmdlc3xudWxsfHVuZGVmaW5lZDtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIE5nT25DaGFuZ2VzRmVhdHVyZSBmdW5jdGlvbiBmb3IgYSBjb21wb25lbnQncyBmZWF0dXJlcyBsaXN0LlxuICpcbiAqIEl0IGFjY2VwdHMgYW4gb3B0aW9uYWwgbWFwIG9mIG1pbmlmaWVkIGlucHV0IHByb3BlcnR5IG5hbWVzIHRvIG9yaWdpbmFsIHByb3BlcnR5IG5hbWVzLFxuICogaWYgYW55IGlucHV0IHByb3BlcnRpZXMgaGF2ZSBhIHB1YmxpYyBhbGlhcy5cbiAqXG4gKiBUaGUgTmdPbkNoYW5nZXNGZWF0dXJlIGZ1bmN0aW9uIHRoYXQgaXMgcmV0dXJuZWQgZGVjb3JhdGVzIGEgY29tcG9uZW50IHdpdGggc3VwcG9ydCBmb3JcbiAqIHRoZSBuZ09uQ2hhbmdlcyBsaWZlY3ljbGUgaG9vaywgc28gaXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzXG4gKiB0aGF0IGhvb2suXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGBcbiAqIHN0YXRpYyBuZ0NvbXBvbmVudERlZiA9IGRlZmluZUNvbXBvbmVudCh7XG4gKiAgIC4uLlxuICogICBpbnB1dHM6IHtuYW1lOiAncHVibGljTmFtZSd9LFxuICogICBmZWF0dXJlczogW05nT25DaGFuZ2VzRmVhdHVyZSh7bmFtZTogJ25hbWUnfSldXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSBpbnB1dFByb3BlcnR5TmFtZXMgTWFwIG9mIGlucHV0IHByb3BlcnR5IG5hbWVzLCBpZiB0aGV5IGFyZSBhbGlhc2VkXG4gKiBAcmV0dXJucyBEaXJlY3RpdmVEZWZGZWF0dXJlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBOZ09uQ2hhbmdlc0ZlYXR1cmUoaW5wdXRQcm9wZXJ0eU5hbWVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOlxuICAgIERpcmVjdGl2ZURlZkZlYXR1cmUge1xuICByZXR1cm4gZnVuY3Rpb24oZGVmaW5pdGlvbjogRGlyZWN0aXZlRGVmPGFueT4pOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dHMgPSBkZWZpbml0aW9uLmlucHV0cztcbiAgICBjb25zdCBwcm90byA9IGRlZmluaXRpb24udHlwZS5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgcHViS2V5IGluIGlucHV0cykge1xuICAgICAgY29uc3QgbWluS2V5ID0gaW5wdXRzW3B1YktleV07XG4gICAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBpbnB1dFByb3BlcnR5TmFtZXMgJiYgaW5wdXRQcm9wZXJ0eU5hbWVzW21pbktleV0gfHwgcHViS2V5O1xuICAgICAgY29uc3QgcHJpdmF0ZU1pbktleSA9IFBSSVZBVEVfUFJFRklYICsgbWluS2V5O1xuICAgICAgY29uc3Qgb3JpZ2luYWxQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIG1pbktleSk7XG4gICAgICBjb25zdCBnZXR0ZXIgPSBvcmlnaW5hbFByb3BlcnR5ICYmIG9yaWdpbmFsUHJvcGVydHkuZ2V0O1xuICAgICAgY29uc3Qgc2V0dGVyID0gb3JpZ2luYWxQcm9wZXJ0eSAmJiBvcmlnaW5hbFByb3BlcnR5LnNldDtcbiAgICAgIC8vIGNyZWF0ZSBhIGdldHRlciBhbmQgc2V0dGVyIGZvciBwcm9wZXJ0eVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCBtaW5LZXksIHtcbiAgICAgICAgZ2V0OiBnZXR0ZXIgfHxcbiAgICAgICAgICAgIChzZXR0ZXIgPyB1bmRlZmluZWQgOiBmdW5jdGlvbih0aGlzOiBPbkNoYW5nZXNFeHBhbmRvKSB7IHJldHVybiB0aGlzW3ByaXZhdGVNaW5LZXldOyB9KSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih0aGlzOiBPbkNoYW5nZXNFeHBhbmRvLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgbGV0IHNpbXBsZUNoYW5nZXMgPSB0aGlzW1BSSVZBVEVfUFJFRklYXTtcbiAgICAgICAgICBpZiAoIXNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIC8vIFBsYWNlIHdoZXJlIHdlIHdpbGwgc3RvcmUgU2ltcGxlQ2hhbmdlcyBpZiB0aGVyZSBpcyBhIGNoYW5nZVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFxuICAgICAgICAgICAgICAgIHRoaXMsIFBSSVZBVEVfUFJFRklYLCB7dmFsdWU6IHNpbXBsZUNoYW5nZXMgPSB7fSwgd3JpdGFibGU6IHRydWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaXNGaXJzdENoYW5nZSA9ICF0aGlzLmhhc093blByb3BlcnR5KHByaXZhdGVNaW5LZXkpO1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDaGFuZ2U6IFNpbXBsZUNoYW5nZXx1bmRlZmluZWQgPSBzaW1wbGVDaGFuZ2VzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgaWYgKGN1cnJlbnRDaGFuZ2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaGFuZ2UuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpbXBsZUNoYW5nZXNbcHJvcGVydHlOYW1lXSA9XG4gICAgICAgICAgICAgICAgbmV3IFNpbXBsZUNoYW5nZSh0aGlzW3ByaXZhdGVNaW5LZXldLCB2YWx1ZSwgaXNGaXJzdENoYW5nZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc0ZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBwbGFjZSB3aGVyZSB0aGUgYWN0dWFsIHZhbHVlIHdpbGwgYmUgc3RvcmVkIGFuZCBtYWtlIGl0IG5vbi1lbnVtZXJhYmxlXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJpdmF0ZU1pbktleSwge3ZhbHVlLCB3cml0YWJsZTogdHJ1ZX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzW3ByaXZhdGVNaW5LZXldID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldHRlciAmJiBzZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIElmIGFuIG9uSW5pdCBob29rIGlzIGRlZmluZWQsIGl0IHdpbGwgbmVlZCB0byB3cmFwIHRoZSBuZ09uQ2hhbmdlcyBjYWxsXG4gICAgLy8gc28gdGhlIGNhbGwgb3JkZXIgaXMgY2hhbmdlcy1pbml0LWNoZWNrIGluIGNyZWF0aW9uIG1vZGUuIEluIHN1YnNlcXVlbnRcbiAgICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIHJ1bnMsIG9ubHkgdGhlIGNoZWNrIHdyYXBwZXIgd2lsbCBiZSBjYWxsZWQuXG4gICAgaWYgKGRlZmluaXRpb24ub25Jbml0ICE9IG51bGwpIHtcbiAgICAgIGRlZmluaXRpb24ub25Jbml0ID0gb25DaGFuZ2VzV3JhcHBlcihkZWZpbml0aW9uLm9uSW5pdCk7XG4gICAgfVxuXG4gICAgZGVmaW5pdGlvbi5kb0NoZWNrID0gb25DaGFuZ2VzV3JhcHBlcihkZWZpbml0aW9uLmRvQ2hlY2spO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG9uQ2hhbmdlc1dyYXBwZXIoZGVsZWdhdGVIb29rOiAoKCkgPT4gdm9pZCkgfCBudWxsKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRoaXM6IE9uQ2hhbmdlc0V4cGFuZG8pIHtcbiAgICAgIGxldCBzaW1wbGVDaGFuZ2VzID0gdGhpc1tQUklWQVRFX1BSRUZJWF07XG4gICAgICBpZiAoc2ltcGxlQ2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMubmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlcyk7XG4gICAgICAgIHRoaXNbUFJJVkFURV9QUkVGSVhdID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGRlbGVnYXRlSG9vayAmJiBkZWxlZ2F0ZUhvb2suYXBwbHkodGhpcyk7XG4gICAgfTtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBQdWJsaWNGZWF0dXJlPFQ+KGRlZmluaXRpb246IERpcmVjdGl2ZURlZjxUPikge1xuICBkZWZpbml0aW9uLmRpUHVibGljID0gZGlQdWJsaWM7XG59XG5cbmNvbnN0IEVNUFRZID0ge307XG5cbi8qKiBTd2FwcyB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIGFuIG9iamVjdC4gKi9cbmZ1bmN0aW9uIGludmVydE9iamVjdChvYmo6IGFueSk6IGFueSB7XG4gIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIEVNUFRZO1xuICBjb25zdCBuZXdPYmo6IGFueSA9IHt9O1xuICBmb3IgKGxldCBtaW5pZmllZEtleSBpbiBvYmopIHtcbiAgICBuZXdPYmpbb2JqW21pbmlmaWVkS2V5XV0gPSBtaW5pZmllZEtleTtcbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRpcmVjdGl2ZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiAjIEV4YW1wbGVcbiAqIGBgYFxuICogY2xhc3MgTXlEaXJlY3RpdmUge1xuICogICAvLyBHZW5lcmF0ZWQgYnkgQW5ndWxhciBUZW1wbGF0ZSBDb21waWxlclxuICogICAvLyBbU3ltYm9sXSBzeW50YXggd2lsbCBub3QgYmUgc3VwcG9ydGVkIGJ5IFR5cGVTY3JpcHQgdW50aWwgdjIuN1xuICogICBzdGF0aWMgbmdEaXJlY3RpdmVEZWYgPSBkZWZpbmVEaXJlY3RpdmUoe1xuICogICAgIC4uLlxuICogICB9KTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgZGVmaW5lRGlyZWN0aXZlID0gZGVmaW5lQ29tcG9uZW50IGFzIGFueSBhczxUPihkaXJlY3RpdmVEZWZpbml0aW9uOiB7XG4gIC8qKlxuICAgKiBEaXJlY3RpdmUgdHlwZSwgbmVlZGVkIHRvIGNvbmZpZ3VyZSB0aGUgaW5qZWN0b3IuXG4gICAqL1xuICB0eXBlOiBUeXBlPFQ+O1xuXG4gIC8qKiBUaGUgc2VsZWN0b3JzIHRoYXQgd2lsbCBiZSB1c2VkIHRvIG1hdGNoIG5vZGVzIHRvIHRoaXMgZGlyZWN0aXZlLiAqL1xuICBzZWxlY3RvcnM6IENzc1NlbGVjdG9yTGlzdDtcblxuICAvKipcbiAgICogRmFjdG9yeSBtZXRob2QgdXNlZCB0byBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgZGlyZWN0aXZlLlxuICAgKi9cbiAgZmFjdG9yeTogKCkgPT4gVCB8ICh7MDogVH0gJiBhbnlbXSk7IC8qIHRyeWluZyB0byBzYXkgVCB8IFtULCAuLi5hbnldICovXG5cbiAgLyoqXG4gICAqIFN0YXRpYyBhdHRyaWJ1dGVzIHRvIHNldCBvbiBob3N0IGVsZW1lbnQuXG4gICAqXG4gICAqIEV2ZW4gaW5kaWNlczogYXR0cmlidXRlIG5hbWVcbiAgICogT2RkIGluZGljZXM6IGF0dHJpYnV0ZSB2YWx1ZVxuICAgKi9cbiAgYXR0cmlidXRlcz86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBpbnB1dCBuYW1lcy5cbiAgICpcbiAgICogVGhlIGZvcm1hdCBpcyBpbjogYHtbYWN0dWFsUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBXaGljaCB0aGUgbWluaWZpZXIgbWF5IHRyYW5zbGF0ZSB0bzogYHtbbWluaWZpZWRQcm9wZXJ0eU5hbWU6IHN0cmluZ106c3RyaW5nfWAuXG4gICAqXG4gICAqIFRoaXMgYWxsb3dzIHRoZSByZW5kZXIgdG8gcmUtY29uc3RydWN0IHRoZSBtaW5pZmllZCBhbmQgbm9uLW1pbmlmaWVkIG5hbWVzXG4gICAqIG9mIHByb3BlcnRpZXMuXG4gICAqL1xuICBpbnB1dHM/OiB7W1AgaW4ga2V5b2YgVF0/OiBzdHJpbmd9O1xuXG4gIC8qKlxuICAgKiBBIG1hcCBvZiBvdXRwdXQgbmFtZXMuXG4gICAqXG4gICAqIFRoZSBmb3JtYXQgaXMgaW46IGB7W2FjdHVhbFByb3BlcnR5TmFtZTogc3RyaW5nXTpzdHJpbmd9YC5cbiAgICpcbiAgICogV2hpY2ggdGhlIG1pbmlmaWVyIG1heSB0cmFuc2xhdGUgdG86IGB7W21pbmlmaWVkUHJvcGVydHlOYW1lOiBzdHJpbmddOnN0cmluZ31gLlxuICAgKlxuICAgKiBUaGlzIGFsbG93cyB0aGUgcmVuZGVyIHRvIHJlLWNvbnN0cnVjdCB0aGUgbWluaWZpZWQgYW5kIG5vbi1taW5pZmllZCBuYW1lc1xuICAgKiBvZiBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgb3V0cHV0cz86IHtbUCBpbiBrZXlvZiBUXT86IHN0cmluZ307XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBvcHRpb25hbCBmZWF0dXJlcyB0byBhcHBseS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgTmdPbkNoYW5nZXNGZWF0dXJlfSwge0BsaW5rIFB1YmxpY0ZlYXR1cmV9XG4gICAqL1xuICBmZWF0dXJlcz86IERpcmVjdGl2ZURlZkZlYXR1cmVbXTtcblxuICAvKipcbiAgICogRnVuY3Rpb24gZXhlY3V0ZWQgYnkgdGhlIHBhcmVudCB0ZW1wbGF0ZSB0byBhbGxvdyBjaGlsZCBkaXJlY3RpdmUgdG8gYXBwbHkgaG9zdCBiaW5kaW5ncy5cbiAgICovXG4gIGhvc3RCaW5kaW5ncz86IChkaXJlY3RpdmVJbmRleDogbnVtYmVyLCBlbGVtZW50SW5kZXg6IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgbmFtZSB0aGF0IGNhbiBiZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZSB0byBhc3NpZ24gdGhpcyBkaXJlY3RpdmUgdG8gYSB2YXJpYWJsZS5cbiAgICpcbiAgICogU2VlOiB7QGxpbmsgRGlyZWN0aXZlLmV4cG9ydEFzfVxuICAgKi9cbiAgZXhwb3J0QXM/OiBzdHJpbmc7XG59KSA9PiBuZXZlcjtcblxuLyoqXG4gKiBDcmVhdGUgYSBwaXBlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqICMgRXhhbXBsZVxuICogYGBgXG4gKiBjbGFzcyBNeVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAqICAgLy8gR2VuZXJhdGVkIGJ5IEFuZ3VsYXIgVGVtcGxhdGUgQ29tcGlsZXJcbiAqICAgc3RhdGljIG5nUGlwZURlZiA9IGRlZmluZVBpcGUoe1xuICogICAgIC4uLlxuICogICB9KTtcbiAqIH1cbiAqIGBgYFxuICogQHBhcmFtIHBpcGVEZWYgUGlwZSBkZWZpbml0aW9uIGdlbmVyYXRlZCBieSB0aGUgY29tcGlsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVBpcGU8VD4ocGlwZURlZjoge1xuICAvKiogTmFtZSBvZiB0aGUgcGlwZS4gVXNlZCBmb3IgbWF0Y2hpbmcgcGlwZXMgaW4gdGVtcGxhdGUgdG8gcGlwZSBkZWZzLiAqL1xuICBuYW1lOiBzdHJpbmcsXG5cbiAgLyoqIFBpcGUgY2xhc3MgcmVmZXJlbmNlLiBOZWVkZWQgdG8gZXh0cmFjdCBwaXBlIGxpZmVjeWNsZSBob29rcy4gKi9cbiAgdHlwZTogVHlwZTxUPixcblxuICAvKiogQSBmYWN0b3J5IGZvciBjcmVhdGluZyBhIHBpcGUgaW5zdGFuY2UuICovXG4gIGZhY3Rvcnk6ICgpID0+IFQsXG5cbiAgLyoqIFdoZXRoZXIgdGhlIHBpcGUgaXMgcHVyZS4gKi9cbiAgcHVyZT86IGJvb2xlYW5cbn0pOiBuZXZlciB7XG4gIHJldHVybiAoPFBpcGVEZWY8VD4+e1xuICAgIG5hbWU6IHBpcGVEZWYubmFtZSxcbiAgICBmYWN0b3J5OiBwaXBlRGVmLmZhY3RvcnksXG4gICAgcHVyZTogcGlwZURlZi5wdXJlICE9PSBmYWxzZSxcbiAgICBvbkRlc3Ryb3k6IHBpcGVEZWYudHlwZS5wcm90b3R5cGUubmdPbkRlc3Ryb3kgfHwgbnVsbFxuICB9KSBhcyBuZXZlcjtcbn1cbiJdfQ==