/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type, isType } from '../type';
import { global, stringify } from '../util';
import { ANNOTATIONS, PARAMETERS, PROP_METADATA } from '../util/decorators';
/**
 * Attention: These regex has to hold even if the code is minified!
 */
export const DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/;
export const INHERITED_CLASS = /^class\s+[A-Za-z\d$_]*\s*extends\s+[A-Za-z\d$_]+\s*{/;
export const INHERITED_CLASS_WITH_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[A-Za-z\d$_]+\s*{[\s\S]*constructor\s*\(/;
export class ReflectionCapabilities {
    constructor(reflect) { this._reflect = reflect || global['Reflect']; }
    isReflectionEnabled() { return true; }
    factory(t) { return (...args) => new t(...args); }
    /** @internal */
    _zipTypesAndAnnotations(paramTypes, paramAnnotations) {
        let result;
        if (typeof paramTypes === 'undefined') {
            result = new Array(paramAnnotations.length);
        }
        else {
            result = new Array(paramTypes.length);
        }
        for (let i = 0; i < result.length; i++) {
            // TS outputs Object for parameters without types, while Traceur omits
            // the annotations. For now we preserve the Traceur behavior to aid
            // migration, but this can be revisited.
            if (typeof paramTypes === 'undefined') {
                result[i] = [];
            }
            else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
            }
            else {
                result[i] = [];
            }
            if (paramAnnotations && paramAnnotations[i] != null) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    }
    _ownParameters(type, parentCtor) {
        const typeStr = type.toString();
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.
        if (DELEGATE_CTOR.exec(typeStr) ||
            (INHERITED_CLASS.exec(typeStr) && !INHERITED_CLASS_WITH_CTOR.exec(typeStr))) {
            return null;
        }
        // Prefer the direct API.
        if (type.parameters && type.parameters !== parentCtor.parameters) {
            return type.parameters;
        }
        // API of tsickle for lowering decorators to properties on the class.
        const tsickleCtorParams = type.ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            const ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            const paramTypes = ctorParameters.map((ctorParam) => ctorParam && ctorParam.type);
            const paramAnnotations = ctorParameters.map((ctorParam) => ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // API for metadata created by invoking the decorators.
        const paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS];
        const paramTypes = this._reflect && this._reflect.getOwnMetadata &&
            this._reflect.getOwnMetadata('design:paramtypes', type);
        if (paramTypes || paramAnnotations) {
            return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return new Array(type.length).fill(undefined);
    }
    parameters(type) {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!isType(type)) {
            return [];
        }
        const parentCtor = getParentCtor(type);
        let parameters = this._ownParameters(type, parentCtor);
        if (!parameters && parentCtor !== Object) {
            parameters = this.parameters(parentCtor);
        }
        return parameters || [];
    }
    _ownAnnotations(typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (typeOrFunc.annotations && typeOrFunc.annotations !== parentCtor.annotations) {
            let annotations = typeOrFunc.annotations;
            if (typeof annotations === 'function' && annotations.annotations) {
                annotations = annotations.annotations;
            }
            return annotations;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (typeOrFunc.decorators && typeOrFunc.decorators !== parentCtor.decorators) {
            return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
        }
        // API for metadata created by invoking the decorators.
        if (typeOrFunc.hasOwnProperty(ANNOTATIONS)) {
            return typeOrFunc[ANNOTATIONS];
        }
        return null;
    }
    annotations(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return [];
        }
        const parentCtor = getParentCtor(typeOrFunc);
        const ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
        const parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
        return parentAnnotations.concat(ownAnnotations);
    }
    _ownPropMetadata(typeOrFunc, parentCtor) {
        // Prefer the direct API.
        if (typeOrFunc.propMetadata &&
            typeOrFunc.propMetadata !== parentCtor.propMetadata) {
            let propMetadata = typeOrFunc.propMetadata;
            if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                propMetadata = propMetadata.propMetadata;
            }
            return propMetadata;
        }
        // API of tsickle for lowering decorators to properties on the class.
        if (typeOrFunc.propDecorators &&
            typeOrFunc.propDecorators !== parentCtor.propDecorators) {
            const propDecorators = typeOrFunc.propDecorators;
            const propMetadata = {};
            Object.keys(propDecorators).forEach(prop => {
                propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
            });
            return propMetadata;
        }
        // API for metadata created by invoking the decorators.
        if (typeOrFunc.hasOwnProperty(PROP_METADATA)) {
            return typeOrFunc[PROP_METADATA];
        }
        return null;
    }
    propMetadata(typeOrFunc) {
        if (!isType(typeOrFunc)) {
            return {};
        }
        const parentCtor = getParentCtor(typeOrFunc);
        const propMetadata = {};
        if (parentCtor !== Object) {
            const parentPropMetadata = this.propMetadata(parentCtor);
            Object.keys(parentPropMetadata).forEach((propName) => {
                propMetadata[propName] = parentPropMetadata[propName];
            });
        }
        const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
        if (ownPropMetadata) {
            Object.keys(ownPropMetadata).forEach((propName) => {
                const decorators = [];
                if (propMetadata.hasOwnProperty(propName)) {
                    decorators.push(...propMetadata[propName]);
                }
                decorators.push(...ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
        }
        return propMetadata;
    }
    hasLifecycleHook(type, lcProperty) {
        return type instanceof Type && lcProperty in type.prototype;
    }
    guards(type) { return {}; }
    getter(name) { return new Function('o', 'return o.' + name + ';'); }
    setter(name) {
        return new Function('o', 'v', 'return o.' + name + ' = v;');
    }
    method(name) {
        const functionBody = `if (!o.${name}) throw new Error('"${name}" is undefined');
        return o.${name}.apply(o, args);`;
        return new Function('o', 'args', functionBody);
    }
    // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
    importUri(type) {
        // StaticSymbol
        if (typeof type === 'object' && type['filePath']) {
            return type['filePath'];
        }
        // Runtime type
        return `./${stringify(type)}`;
    }
    resourceUri(type) { return `./${stringify(type)}`; }
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return runtime;
    }
    resolveEnum(enumIdentifier, name) { return enumIdentifier[name]; }
}
function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
        return [];
    }
    return decoratorInvocations.map(decoratorInvocation => {
        const decoratorType = decoratorInvocation.type;
        const annotationCls = decoratorType.annotationCls;
        const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
        return new annotationCls(...annotationArgs);
    });
}
function getParentCtor(ctor) {
    const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    const parentCtor = parentProto ? parentProto.constructor : null;
    // Note: We always use `Object` as the null value
    // to simplify checking later on.
    return parentCtor || Object;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZWZsZWN0aW9uL3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBTTFFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLDREQUE0RCxDQUFDO0FBQzFGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxzREFBc0QsQ0FBQztBQUN0RixNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FDbEMsNkVBQTZFLENBQUM7QUFFbEYsTUFBTSxPQUFPLHNCQUFzQjtJQUdqQyxZQUFZLE9BQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVFLG1CQUFtQixLQUFjLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUUvQyxPQUFPLENBQUksQ0FBVSxJQUF3QixPQUFPLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpGLGdCQUFnQjtJQUNoQix1QkFBdUIsQ0FBQyxVQUFpQixFQUFFLGdCQUF1QjtRQUNoRSxJQUFJLE1BQWUsQ0FBQztRQUVwQixJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsRUFBRTtZQUNyQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsZ0JB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QUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoRixPQUFPLElBQUksYUFBYSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsSUFBYztJQUNuQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xGLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2hFLGlEQUFpRDtJQUNqRCxpQ0FBaUM7SUFDakMsT0FBTyxVQUFVLElBQUksTUFBTSxDQUFDO0FBQzlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZSwgaXNUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7Z2xvYmFsLCBzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtBTk5PVEFUSU9OUywgUEFSQU1FVEVSUywgUFJPUF9NRVRBREFUQX0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuaW1wb3J0IHtQbGF0Zm9ybVJlZmxlY3Rpb25DYXBhYmlsaXRpZXN9IGZyb20gJy4vcGxhdGZvcm1fcmVmbGVjdGlvbl9jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHtHZXR0ZXJGbiwgTWV0aG9kRm4sIFNldHRlckZufSBmcm9tICcuL3R5cGVzJztcblxuXG4vKipcbiAqIEF0dGVudGlvbjogVGhlc2UgcmVnZXggaGFzIHRvIGhvbGQgZXZlbiBpZiB0aGUgY29kZSBpcyBtaW5pZmllZCFcbiAqL1xuZXhwb3J0IGNvbnN0IERFTEVHQVRFX0NUT1IgPSAvXmZ1bmN0aW9uXFxzK1xcUytcXChcXClcXHMqe1tcXHNcXFNdK1xcLmFwcGx5XFwodGhpcyxcXHMqYXJndW1lbnRzXFwpLztcbmV4cG9ydCBjb25zdCBJTkhFUklURURfQ0xBU1MgPSAvXmNsYXNzXFxzK1tBLVphLXpcXGQkX10qXFxzKmV4dGVuZHNcXHMrW0EtWmEtelxcZCRfXStcXHMqey87XG5leHBvcnQgY29uc3QgSU5IRVJJVEVEX0NMQVNTX1dJVEhfQ1RPUiA9XG4gICAgL15jbGFzc1xccytbQS1aYS16XFxkJF9dKlxccypleHRlbmRzXFxzK1tBLVphLXpcXGQkX10rXFxzKntbXFxzXFxTXSpjb25zdHJ1Y3RvclxccypcXCgvO1xuXG5leHBvcnQgY2xhc3MgUmVmbGVjdGlvbkNhcGFiaWxpdGllcyBpbXBsZW1lbnRzIFBsYXRmb3JtUmVmbGVjdGlvbkNhcGFiaWxpdGllcyB7XG4gIHByaXZhdGUgX3JlZmxlY3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcihyZWZsZWN0PzogYW55KSB7IHRoaXMuX3JlZmxlY3QgPSByZWZsZWN0IHx8IGdsb2JhbFsnUmVmbGVjdCddOyB9XG5cbiAgaXNSZWZsZWN0aW9uRW5hYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICBmYWN0b3J5PFQ+KHQ6IFR5cGU8VD4pOiAoYXJnczogYW55W10pID0+IFQgeyByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiBuZXcgdCguLi5hcmdzKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3ppcFR5cGVzQW5kQW5ub3RhdGlvbnMocGFyYW1UeXBlczogYW55W10sIHBhcmFtQW5ub3RhdGlvbnM6IGFueVtdKTogYW55W11bXSB7XG4gICAgbGV0IHJlc3VsdDogYW55W11bXTtcblxuICAgIGlmICh0eXBlb2YgcGFyYW1UeXBlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShwYXJhbUFubm90YXRpb25zLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShwYXJhbVR5cGVzLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIFRTIG91dHB1dHMgT2JqZWN0IGZvciBwYXJhbWV0ZXJzIHdpdGhvdXQgdHlwZXMsIHdoaWxlIFRyYWNldXIgb21pdHNcbiAgICAgIC8vIHRoZSBhbm5vdGF0aW9ucy4gRm9yIG5vdyB3ZSBwcmVzZXJ2ZSB0aGUgVHJhY2V1ciBiZWhhdmlvciB0byBhaWRcbiAgICAgIC8vIG1pZ3JhdGlvbiwgYnV0IHRoaXMgY2FuIGJlIHJldmlzaXRlZC5cbiAgICAgIGlmICh0eXBlb2YgcGFyYW1UeXBlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtVHlwZXNbaV0gIT0gT2JqZWN0KSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtwYXJhbVR5cGVzW2ldXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IFtdO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtQW5ub3RhdGlvbnMgJiYgcGFyYW1Bbm5vdGF0aW9uc1tpXSAhPSBudWxsKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IHJlc3VsdFtpXS5jb25jYXQocGFyYW1Bbm5vdGF0aW9uc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF9vd25QYXJhbWV0ZXJzKHR5cGU6IFR5cGU8YW55PiwgcGFyZW50Q3RvcjogYW55KTogYW55W11bXXxudWxsIHtcbiAgICBjb25zdCB0eXBlU3RyID0gdHlwZS50b1N0cmluZygpO1xuICAgIC8vIElmIHdlIGhhdmUgbm8gZGVjb3JhdG9ycywgd2Ugb25seSBoYXZlIGZ1bmN0aW9uLmxlbmd0aCBhcyBtZXRhZGF0YS5cbiAgICAvLyBJbiB0aGF0IGNhc2UsIHRvIGRldGVjdCB3aGV0aGVyIGEgY2hpbGQgY2xhc3MgZGVjbGFyZWQgYW4gb3duIGNvbnN0cnVjdG9yIG9yIG5vdCxcbiAgICAvLyB3ZSBuZWVkIHRvIGxvb2sgaW5zaWRlIG9mIHRoYXQgY29uc3RydWN0b3IgdG8gY2hlY2sgd2hldGhlciBpdCBpc1xuICAgIC8vIGp1c3QgY2FsbGluZyB0aGUgcGFyZW50LlxuICAgIC8vIFRoaXMgYWxzbyBoZWxwcyB0byB3b3JrIGFyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMjQzOVxuICAgIC8vIHRoYXQgc2V0cyAnZGVzaWduOnBhcmFtdHlwZXMnIHRvIFtdXG4gICAgLy8gaWYgYSBjbGFzcyBpbmhlcml0cyBmcm9tIGFub3RoZXIgY2xhc3MgYnV0IGhhcyBubyBjdG9yIGRlY2xhcmVkIGl0c2VsZi5cbiAgICBpZiAoREVMRUdBVEVfQ1RPUi5leGVjKHR5cGVTdHIpIHx8XG4gICAgICAgIChJTkhFUklURURfQ0xBU1MuZXhlYyh0eXBlU3RyKSAmJiAhSU5IRVJJVEVEX0NMQVNTX1dJVEhfQ1RPUi5leGVjKHR5cGVTdHIpKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gUHJlZmVyIHRoZSBkaXJlY3QgQVBJLlxuICAgIGlmICgoPGFueT50eXBlKS5wYXJhbWV0ZXJzICYmICg8YW55PnR5cGUpLnBhcmFtZXRlcnMgIT09IHBhcmVudEN0b3IucGFyYW1ldGVycykge1xuICAgICAgcmV0dXJuICg8YW55PnR5cGUpLnBhcmFtZXRlcnM7XG4gICAgfVxuXG4gICAgLy8gQVBJIG9mIHRzaWNrbGUgZm9yIGxvd2VyaW5nIGRlY29yYXRvcnMgdG8gcHJvcGVydGllcyBvbiB0aGUgY2xhc3MuXG4gICAgY29uc3QgdHNpY2tsZUN0b3JQYXJhbXMgPSAoPGFueT50eXBlKS5jdG9yUGFyYW1ldGVycztcbiAgICBpZiAodHNpY2tsZUN0b3JQYXJhbXMgJiYgdHNpY2tsZUN0b3JQYXJhbXMgIT09IHBhcmVudEN0b3IuY3RvclBhcmFtZXRlcnMpIHtcbiAgICAgIC8vIE5ld2VyIHRzaWNrbGUgdXNlcyBhIGZ1bmN0aW9uIGNsb3N1cmVcbiAgICAgIC8vIFJldGFpbiB0aGUgbm9uLWZ1bmN0aW9uIGNhc2UgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciB0c2lja2xlXG4gICAgICBjb25zdCBjdG9yUGFyYW1ldGVycyA9XG4gICAgICAgICAgdHlwZW9mIHRzaWNrbGVDdG9yUGFyYW1zID09PSAnZnVuY3Rpb24nID8gdHNpY2tsZUN0b3JQYXJhbXMoKSA6IHRzaWNrbGVDdG9yUGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1UeXBlcyA9IGN0b3JQYXJhbWV0ZXJzLm1hcCgoY3RvclBhcmFtOiBhbnkpID0+IGN0b3JQYXJhbSAmJiBjdG9yUGFyYW0udHlwZSk7XG4gICAgICBjb25zdCBwYXJhbUFubm90YXRpb25zID0gY3RvclBhcmFtZXRlcnMubWFwKFxuICAgICAgICAgIChjdG9yUGFyYW06IGFueSkgPT5cbiAgICAgICAgICAgICAgY3RvclBhcmFtICYmIGNvbnZlcnRUc2lja2xlRGVjb3JhdG9ySW50b01ldGFkYXRhKGN0b3JQYXJhbS5kZWNvcmF0b3JzKSk7XG4gICAgICByZXR1cm4gdGhpcy5femlwVHlwZXNBbmRBbm5vdGF0aW9ucyhwYXJhbVR5cGVzLCBwYXJhbUFubm90YXRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBBUEkgZm9yIG1ldGFkYXRhIGNyZWF0ZWQgYnkgaW52b2tpbmcgdGhlIGRlY29yYXRvcnMuXG4gICAgY29uc3QgcGFyYW1Bbm5vdGF0aW9ucyA9IHR5cGUuaGFzT3duUHJvcGVydHkoUEFSQU1FVEVSUykgJiYgKHR5cGUgYXMgYW55KVtQQVJBTUVURVJTXTtcbiAgICBjb25zdCBwYXJhbVR5cGVzID0gdGhpcy5fcmVmbGVjdCAmJiB0aGlzLl9yZWZsZWN0LmdldE93bk1ldGFkYXRhICYmXG4gICAgICAgIHRoaXMuX3JlZmxlY3QuZ2V0T3duTWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgdHlwZSk7XG4gICAgaWYgKHBhcmFtVHlwZXMgfHwgcGFyYW1Bbm5vdGF0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuX3ppcFR5cGVzQW5kQW5ub3RhdGlvbnMocGFyYW1UeXBlcywgcGFyYW1Bbm5vdGF0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gSWYgYSBjbGFzcyBoYXMgbm8gZGVjb3JhdG9ycywgYXQgbGVhc3QgY3JlYXRlIG1ldGFkYXRhXG4gICAgLy8gYmFzZWQgb24gZnVuY3Rpb24ubGVuZ3RoLlxuICAgIC8vIE5vdGU6IFdlIGtub3cgdGhhdCB0aGlzIGlzIGEgcmVhbCBjb25zdHJ1Y3RvciBhcyB3ZSBjaGVja2VkXG4gICAgLy8gdGhlIGNvbnRlbnQgb2YgdGhlIGNvbnN0cnVjdG9yIGFib3ZlLlxuICAgIHJldHVybiBuZXcgQXJyYXkoKDxhbnk+dHlwZS5sZW5ndGgpKS5maWxsKHVuZGVmaW5lZCk7XG4gIH1cblxuICBwYXJhbWV0ZXJzKHR5cGU6IFR5cGU8YW55Pik6IGFueVtdW10ge1xuICAgIC8vIE5vdGU6IG9ubHkgcmVwb3J0IG1ldGFkYXRhIGlmIHdlIGhhdmUgYXQgbGVhc3Qgb25lIGNsYXNzIGRlY29yYXRvclxuICAgIC8vIHRvIHN0YXkgaW4gc3luYyB3aXRoIHRoZSBzdGF0aWMgcmVmbGVjdG9yLlxuICAgIGlmICghaXNUeXBlKHR5cGUpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHBhcmVudEN0b3IgPSBnZXRQYXJlbnRDdG9yKHR5cGUpO1xuICAgIGxldCBwYXJhbWV0ZXJzID0gdGhpcy5fb3duUGFyYW1ldGVycyh0eXBlLCBwYXJlbnRDdG9yKTtcbiAgICBpZiAoIXBhcmFtZXRlcnMgJiYgcGFyZW50Q3RvciAhPT0gT2JqZWN0KSB7XG4gICAgICBwYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzKHBhcmVudEN0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gcGFyYW1ldGVycyB8fCBbXTtcbiAgfVxuXG4gIHByaXZhdGUgX293bkFubm90YXRpb25zKHR5cGVPckZ1bmM6IFR5cGU8YW55PiwgcGFyZW50Q3RvcjogYW55KTogYW55W118bnVsbCB7XG4gICAgLy8gUHJlZmVyIHRoZSBkaXJlY3QgQVBJLlxuICAgIGlmICgoPGFueT50eXBlT3JGdW5jKS5hbm5vdGF0aW9ucyAmJiAoPGFueT50eXBlT3JGdW5jKS5hbm5vdGF0aW9ucyAhPT0gcGFyZW50Q3Rvci5hbm5vdGF0aW9ucykge1xuICAgICAgbGV0IGFubm90YXRpb25zID0gKDxhbnk+dHlwZU9yRnVuYykuYW5ub3RhdGlvbnM7XG4gICAgICBpZiAodHlwZW9mIGFubm90YXRpb25zID09PSAnZnVuY3Rpb24nICYmIGFubm90YXRpb25zLmFubm90YXRpb25zKSB7XG4gICAgICAgIGFubm90YXRpb25zID0gYW5ub3RhdGlvbnMuYW5ub3RhdGlvbnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gYW5ub3RhdGlvbnM7XG4gICAgfVxuXG4gICAgLy8gQVBJIG9mIHRzaWNrbGUgZm9yIGxvd2VyaW5nIGRlY29yYXRvcnMgdG8gcHJvcGVydGllcyBvbiB0aGUgY2xhc3MuXG4gICAgaWYgKCg8YW55PnR5cGVPckZ1bmMpLmRlY29yYXRvcnMgJiYgKDxhbnk+dHlwZU9yRnVuYykuZGVjb3JhdG9ycyAhPT0gcGFyZW50Q3Rvci5kZWNvcmF0b3JzKSB7XG4gICAgICByZXR1cm4gY29udmVydFRzaWNrbGVEZWNvcmF0b3JJbnRvTWV0YWRhdGEoKDxhbnk+dHlwZU9yRnVuYykuZGVjb3JhdG9ycyk7XG4gICAgfVxuXG4gICAgLy8gQVBJIGZvciBtZXRhZGF0YSBjcmVhdGVkIGJ5IGludm9raW5nIHRoZSBkZWNvcmF0b3JzLlxuICAgIGlmICh0eXBlT3JGdW5jLmhhc093blByb3BlcnR5KEFOTk9UQVRJT05TKSkge1xuICAgICAgcmV0dXJuICh0eXBlT3JGdW5jIGFzIGFueSlbQU5OT1RBVElPTlNdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGFubm90YXRpb25zKHR5cGVPckZ1bmM6IFR5cGU8YW55Pik6IGFueVtdIHtcbiAgICBpZiAoIWlzVHlwZSh0eXBlT3JGdW5jKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnRDdG9yID0gZ2V0UGFyZW50Q3Rvcih0eXBlT3JGdW5jKTtcbiAgICBjb25zdCBvd25Bbm5vdGF0aW9ucyA9IHRoaXMuX293bkFubm90YXRpb25zKHR5cGVPckZ1bmMsIHBhcmVudEN0b3IpIHx8IFtdO1xuICAgIGNvbnN0IHBhcmVudEFubm90YXRpb25zID0gcGFyZW50Q3RvciAhPT0gT2JqZWN0ID8gdGhpcy5hbm5vdGF0aW9ucyhwYXJlbnRDdG9yKSA6IFtdO1xuICAgIHJldHVybiBwYXJlbnRBbm5vdGF0aW9ucy5jb25jYXQob3duQW5ub3RhdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3duUHJvcE1ldGFkYXRhKHR5cGVPckZ1bmM6IGFueSwgcGFyZW50Q3RvcjogYW55KToge1trZXk6IHN0cmluZ106IGFueVtdfXxudWxsIHtcbiAgICAvLyBQcmVmZXIgdGhlIGRpcmVjdCBBUEkuXG4gICAgaWYgKCg8YW55PnR5cGVPckZ1bmMpLnByb3BNZXRhZGF0YSAmJlxuICAgICAgICAoPGFueT50eXBlT3JGdW5jKS5wcm9wTWV0YWRhdGEgIT09IHBhcmVudEN0b3IucHJvcE1ldGFkYXRhKSB7XG4gICAgICBsZXQgcHJvcE1ldGFkYXRhID0gKDxhbnk+dHlwZU9yRnVuYykucHJvcE1ldGFkYXRhO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wTWV0YWRhdGEgPT09ICdmdW5jdGlvbicgJiYgcHJvcE1ldGFkYXRhLnByb3BNZXRhZGF0YSkge1xuICAgICAgICBwcm9wTWV0YWRhdGEgPSBwcm9wTWV0YWRhdGEucHJvcE1ldGFkYXRhO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb3BNZXRhZGF0YTtcbiAgICB9XG5cbiAgICAvLyBBUEkgb2YgdHNpY2tsZSBmb3IgbG93ZXJpbmcgZGVjb3JhdG9ycyB0byBwcm9wZXJ0aWVzIG9uIHRoZSBjbGFzcy5cbiAgICBpZiAoKDxhbnk+dHlwZU9yRnVuYykucHJvcERlY29yYXRvcnMgJiZcbiAgICAgICAgKDxhbnk+dHlwZU9yRnVuYykucHJvcERlY29yYXRvcnMgIT09IHBhcmVudEN0b3IucHJvcERlY29yYXRvcnMpIHtcbiAgICAgIGNvbnN0IHByb3BEZWNvcmF0b3JzID0gKDxhbnk+dHlwZU9yRnVuYykucHJvcERlY29yYXRvcnM7XG4gICAgICBjb25zdCBwcm9wTWV0YWRhdGEgPSA8e1trZXk6IHN0cmluZ106IGFueVtdfT57fTtcbiAgICAgIE9iamVjdC5rZXlzKHByb3BEZWNvcmF0b3JzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBwcm9wTWV0YWRhdGFbcHJvcF0gPSBjb252ZXJ0VHNpY2tsZURlY29yYXRvckludG9NZXRhZGF0YShwcm9wRGVjb3JhdG9yc1twcm9wXSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwcm9wTWV0YWRhdGE7XG4gICAgfVxuXG4gICAgLy8gQVBJIGZvciBtZXRhZGF0YSBjcmVhdGVkIGJ5IGludm9raW5nIHRoZSBkZWNvcmF0b3JzLlxuICAgIGlmICh0eXBlT3JGdW5jLmhhc093blByb3BlcnR5KFBST1BfTUVUQURBVEEpKSB7XG4gICAgICByZXR1cm4gKHR5cGVPckZ1bmMgYXMgYW55KVtQUk9QX01FVEFEQVRBXTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcm9wTWV0YWRhdGEodHlwZU9yRnVuYzogYW55KToge1trZXk6IHN0cmluZ106IGFueVtdfSB7XG4gICAgaWYgKCFpc1R5cGUodHlwZU9yRnVuYykpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgY29uc3QgcGFyZW50Q3RvciA9IGdldFBhcmVudEN0b3IodHlwZU9yRnVuYyk7XG4gICAgY29uc3QgcHJvcE1ldGFkYXRhOiB7W2tleTogc3RyaW5nXTogYW55W119ID0ge307XG4gICAgaWYgKHBhcmVudEN0b3IgIT09IE9iamVjdCkge1xuICAgICAgY29uc3QgcGFyZW50UHJvcE1ldGFkYXRhID0gdGhpcy5wcm9wTWV0YWRhdGEocGFyZW50Q3Rvcik7XG4gICAgICBPYmplY3Qua2V5cyhwYXJlbnRQcm9wTWV0YWRhdGEpLmZvckVhY2goKHByb3BOYW1lKSA9PiB7XG4gICAgICAgIHByb3BNZXRhZGF0YVtwcm9wTmFtZV0gPSBwYXJlbnRQcm9wTWV0YWRhdGFbcHJvcE5hbWVdO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG93blByb3BNZXRhZGF0YSA9IHRoaXMuX293blByb3BNZXRhZGF0YSh0eXBlT3JGdW5jLCBwYXJlbnRDdG9yKTtcbiAgICBpZiAob3duUHJvcE1ldGFkYXRhKSB7XG4gICAgICBPYmplY3Qua2V5cyhvd25Qcm9wTWV0YWRhdGEpLmZvckVhY2goKHByb3BOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlY29yYXRvcnM6IGFueVtdID0gW107XG4gICAgICAgIGlmIChwcm9wTWV0YWRhdGEuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgZGVjb3JhdG9ycy5wdXNoKC4uLnByb3BNZXRhZGF0YVtwcm9wTmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIGRlY29yYXRvcnMucHVzaCguLi5vd25Qcm9wTWV0YWRhdGFbcHJvcE5hbWVdKTtcbiAgICAgICAgcHJvcE1ldGFkYXRhW3Byb3BOYW1lXSA9IGRlY29yYXRvcnM7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3BNZXRhZGF0YTtcbiAgfVxuXG4gIGhhc0xpZmVjeWNsZUhvb2sodHlwZTogYW55LCBsY1Byb3BlcnR5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZSBpbnN0YW5jZW9mIFR5cGUgJiYgbGNQcm9wZXJ0eSBpbiB0eXBlLnByb3RvdHlwZTtcbiAgfVxuXG4gIGd1YXJkcyh0eXBlOiBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55fSB7IHJldHVybiB7fTsgfVxuXG4gIGdldHRlcihuYW1lOiBzdHJpbmcpOiBHZXR0ZXJGbiB7IHJldHVybiA8R2V0dGVyRm4+bmV3IEZ1bmN0aW9uKCdvJywgJ3JldHVybiBvLicgKyBuYW1lICsgJzsnKTsgfVxuXG4gIHNldHRlcihuYW1lOiBzdHJpbmcpOiBTZXR0ZXJGbiB7XG4gICAgcmV0dXJuIDxTZXR0ZXJGbj5uZXcgRnVuY3Rpb24oJ28nLCAndicsICdyZXR1cm4gby4nICsgbmFtZSArICcgPSB2OycpO1xuICB9XG5cbiAgbWV0aG9kKG5hbWU6IHN0cmluZyk6IE1ldGhvZEZuIHtcbiAgICBjb25zdCBmdW5jdGlvbkJvZHkgPSBgaWYgKCFvLiR7bmFtZX0pIHRocm93IG5ldyBFcnJvcignXCIke25hbWV9XCIgaXMgdW5kZWZpbmVkJyk7XG4gICAgICAgIHJldHVybiBvLiR7bmFtZX0uYXBwbHkobywgYXJncyk7YDtcbiAgICByZXR1cm4gPE1ldGhvZEZuPm5ldyBGdW5jdGlvbignbycsICdhcmdzJywgZnVuY3Rpb25Cb2R5KTtcbiAgfVxuXG4gIC8vIFRoZXJlIGlzIG5vdCBhIGNvbmNlcHQgb2YgaW1wb3J0IHVyaSBpbiBKcywgYnV0IHRoaXMgaXMgdXNlZnVsIGluIGRldmVsb3BpbmcgRGFydCBhcHBsaWNhdGlvbnMuXG4gIGltcG9ydFVyaSh0eXBlOiBhbnkpOiBzdHJpbmcge1xuICAgIC8vIFN0YXRpY1N5bWJvbFxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZVsnZmlsZVBhdGgnXSkge1xuICAgICAgcmV0dXJuIHR5cGVbJ2ZpbGVQYXRoJ107XG4gICAgfVxuICAgIC8vIFJ1bnRpbWUgdHlwZVxuICAgIHJldHVybiBgLi8ke3N0cmluZ2lmeSh0eXBlKX1gO1xuICB9XG5cbiAgcmVzb3VyY2VVcmkodHlwZTogYW55KTogc3RyaW5nIHsgcmV0dXJuIGAuLyR7c3RyaW5naWZ5KHR5cGUpfWA7IH1cblxuICByZXNvbHZlSWRlbnRpZmllcihuYW1lOiBzdHJpbmcsIG1vZHVsZVVybDogc3RyaW5nLCBtZW1iZXJzOiBzdHJpbmdbXSwgcnVudGltZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gcnVudGltZTtcbiAgfVxuICByZXNvbHZlRW51bShlbnVtSWRlbnRpZmllcjogYW55LCBuYW1lOiBzdHJpbmcpOiBhbnkgeyByZXR1cm4gZW51bUlkZW50aWZpZXJbbmFtZV07IH1cbn1cblxuZnVuY3Rpb24gY29udmVydFRzaWNrbGVEZWNvcmF0b3JJbnRvTWV0YWRhdGEoZGVjb3JhdG9ySW52b2NhdGlvbnM6IGFueVtdKTogYW55W10ge1xuICBpZiAoIWRlY29yYXRvckludm9jYXRpb25zKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBkZWNvcmF0b3JJbnZvY2F0aW9ucy5tYXAoZGVjb3JhdG9ySW52b2NhdGlvbiA9PiB7XG4gICAgY29uc3QgZGVjb3JhdG9yVHlwZSA9IGRlY29yYXRvckludm9jYXRpb24udHlwZTtcbiAgICBjb25zdCBhbm5vdGF0aW9uQ2xzID0gZGVjb3JhdG9yVHlwZS5hbm5vdGF0aW9uQ2xzO1xuICAgIGNvbnN0IGFubm90YXRpb25BcmdzID0gZGVjb3JhdG9ySW52b2NhdGlvbi5hcmdzID8gZGVjb3JhdG9ySW52b2NhdGlvbi5hcmdzIDogW107XG4gICAgcmV0dXJuIG5ldyBhbm5vdGF0aW9uQ2xzKC4uLmFubm90YXRpb25BcmdzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFBhcmVudEN0b3IoY3RvcjogRnVuY3Rpb24pOiBUeXBlPGFueT4ge1xuICBjb25zdCBwYXJlbnRQcm90byA9IGN0b3IucHJvdG90eXBlID8gT2JqZWN0LmdldFByb3RvdHlwZU9mKGN0b3IucHJvdG90eXBlKSA6IG51bGw7XG4gIGNvbnN0IHBhcmVudEN0b3IgPSBwYXJlbnRQcm90byA/IHBhcmVudFByb3RvLmNvbnN0cnVjdG9yIDogbnVsbDtcbiAgLy8gTm90ZTogV2UgYWx3YXlzIHVzZSBgT2JqZWN0YCBhcyB0aGUgbnVsbCB2YWx1ZVxuICAvLyB0byBzaW1wbGlmeSBjaGVja2luZyBsYXRlciBvbi5cbiAgcmV0dXJuIHBhcmVudEN0b3IgfHwgT2JqZWN0O1xufVxuIl19