/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { noSideEffects } from './closure';
export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const PROP_METADATA = '__prop__metadata__';
/**
 * @suppress {globalThis}
 */
export function makeDecorator(name, props, parentClass, additionalProcessing, typeFn) {
    return noSideEffects(() => {
        const metaCtor = makeMetadataCtor(props);
        function DecoratorFactory(...args) {
            if (this instanceof DecoratorFactory) {
                metaCtor.call(this, ...args);
                return this;
            }
            const annotationInstance = new DecoratorFactory(...args);
            return function TypeDecorator(cls) {
                if (typeFn)
                    typeFn(cls, ...args);
                // Use of Object.defineProperty is important since it creates non-enumerable property which
                // prevents the property is copied during subclassing.
                const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                    cls[ANNOTATIONS] :
                    Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
                annotations.push(annotationInstance);
                if (additionalProcessing)
                    additionalProcessing(cls);
                return cls;
            };
        }
        if (parentClass) {
            DecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        DecoratorFactory.prototype.ngMetadataName = name;
        DecoratorFactory.annotationCls = DecoratorFactory;
        return DecoratorFactory;
    });
}
function makeMetadataCtor(props) {
    return function ctor(...args) {
        if (props) {
            const values = props(...args);
            for (const propName in values) {
                this[propName] = values[propName];
            }
        }
    };
}
export function makeParamDecorator(name, props, parentClass) {
    return noSideEffects(() => {
        const metaCtor = makeMetadataCtor(props);
        function ParamDecoratorFactory(...args) {
            if (this instanceof ParamDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            const annotationInstance = new ParamDecoratorFactory(...args);
            ParamDecorator.annotation = annotationInstance;
            return ParamDecorator;
            function ParamDecorator(cls, unusedKey, index) {
                // Use of Object.defineProperty is important since it creates non-enumerable property which
                // prevents the property is copied during subclassing.
                const parameters = cls.hasOwnProperty(PARAMETERS) ?
                    cls[PARAMETERS] :
                    Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
                // there might be gaps if some in between parameters do not have annotations.
                // we pad with nulls.
                while (parameters.length <= index) {
                    parameters.push(null);
                }
                (parameters[index] = parameters[index] || []).push(annotationInstance);
                return cls;
            }
        }
        if (parentClass) {
            ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        ParamDecoratorFactory.prototype.ngMetadataName = name;
        ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
        return ParamDecoratorFactory;
    });
}
export function makePropDecorator(name, props, parentClass, additionalProcessing) {
    return noSideEffects(() => {
        const metaCtor = makeMetadataCtor(props);
        function PropDecoratorFactory(...args) {
            if (this instanceof PropDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            const decoratorInstance = new PropDecoratorFactory(...args);
            function PropDecorator(target, name) {
                const constructor = target.constructor;
                // Use of Object.defineProperty is important since it creates non-enumerable property which
                // prevents the property is copied during subclassing.
                const meta = constructor.hasOwnProperty(PROP_METADATA) ?
                    constructor[PROP_METADATA] :
                    Object.defineProperty(constructor, PROP_METADATA, { value: {} })[PROP_METADATA];
                meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
                meta[name].unshift(decoratorInstance);
                if (additionalProcessing)
                    additionalProcessing(target, name, ...args);
            }
            return PropDecorator;
        }
        if (parentClass) {
            PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
        PropDecoratorFactory.prototype.ngMetadataName = name;
        PropDecoratorFactory.annotationCls = PropDecoratorFactory;
        return PropDecoratorFactory;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3V0aWwvZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBNEJ4QyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDN0MsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDO0FBQzNDLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztBQUVsRDs7R0FFRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQ3pCLElBQVksRUFBRSxLQUErQixFQUFFLFdBQWlCLEVBQ2hFLG9CQUE4QyxFQUM5QyxNQUFnRDtJQUVsRCxPQUFPLGFBQWEsQ0FBQyxHQUFHLEVBQUU7UUFDeEIsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekMsU0FBUyxnQkFBZ0IsQ0FDa0IsR0FBRyxJQUFXO1lBQ3ZELElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO2dCQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUM3QixPQUFPLElBQStCLENBQUM7YUFDeEM7WUFFRCxNQUFNLGtCQUFrQixHQUFHLElBQUssZ0JBQXdCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNsRSxPQUFPLFNBQVMsYUFBYSxDQUFDLEdBQVk7Z0JBQ3hDLElBQUksTUFBTTtvQkFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLDJGQUEyRjtnQkFDM0Ysc0RBQXNEO2dCQUN0RCxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JB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Q0FBQztnQkFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLG9CQUFvQjtvQkFBRSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDeEUsQ0FBQztZQUVELE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUM7UUFFRCxJQUFJLFdBQVcsRUFBRTtZQUNmLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2RTtRQUVELG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQy9DLG9CQUFxQixDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRSxPQUFPLG9CQUFvQixDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL2ludGVyZmFjZS90eXBlJztcblxuaW1wb3J0IHtub1NpZGVFZmZlY3RzfSBmcm9tICcuL2Nsb3N1cmUnO1xuXG5cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgaW1wbGVtZW50ZWQgYnkgYWxsIEFuZ3VsYXIgdHlwZSBkZWNvcmF0b3JzLCB3aGljaCBhbGxvd3MgdGhlbSB0byBiZSB1c2VkIGFzXG4gKiBkZWNvcmF0b3JzIGFzIHdlbGwgYXMgQW5ndWxhciBzeW50YXguXG4gKlxuICogYGBgXG4gKiBAbmcuQ29tcG9uZW50KHsuLi59KVxuICogY2xhc3MgTXlDbGFzcyB7Li4ufVxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogSW52b2tlIGFzIGRlY29yYXRvci5cbiAgICovXG4gIDxUIGV4dGVuZHMgVHlwZTxhbnk+Pih0eXBlOiBUKTogVDtcblxuICAvLyBNYWtlIFR5cGVEZWNvcmF0b3IgYXNzaWduYWJsZSB0byBidWlsdC1pbiBQYXJhbWV0ZXJEZWNvcmF0b3IgdHlwZS5cbiAgLy8gUGFyYW1ldGVyRGVjb3JhdG9yIGlzIGRlY2xhcmVkIGluIGxpYi5kLnRzIGFzIGEgYGRlY2xhcmUgdHlwZWBcbiAgLy8gc28gd2UgY2Fubm90IGRlY2xhcmUgdGhpcyBpbnRlcmZhY2UgYXMgYSBzdWJ0eXBlLlxuICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzM3OSNpc3N1ZWNvbW1lbnQtMTI2MTY5NDE3XG4gICh0YXJnZXQ6IE9iamVjdCwgcHJvcGVydHlLZXk/OiBzdHJpbmd8c3ltYm9sLCBwYXJhbWV0ZXJJbmRleD86IG51bWJlcik6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBBTk5PVEFUSU9OUyA9ICdfX2Fubm90YXRpb25zX18nO1xuZXhwb3J0IGNvbnN0IFBBUkFNRVRFUlMgPSAnX19wYXJhbWV0ZXJzX18nO1xuZXhwb3J0IGNvbnN0IFBST1BfTUVUQURBVEEgPSAnX19wcm9wX19tZXRhZGF0YV9fJztcblxuLyoqXG4gKiBAc3VwcHJlc3Mge2dsb2JhbFRoaXN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRGVjb3JhdG9yPFQ+KFxuICAgIG5hbWU6IHN0cmluZywgcHJvcHM/OiAoLi4uYXJnczogYW55W10pID0+IGFueSwgcGFyZW50Q2xhc3M/OiBhbnksXG4gICAgYWRkaXRpb25hbFByb2Nlc3Npbmc/OiAodHlwZTogVHlwZTxUPikgPT4gdm9pZCxcbiAgICB0eXBlRm4/OiAodHlwZTogVHlwZTxUPiwgLi4uYXJnczogYW55W10pID0+IHZvaWQpOlxuICAgIHtuZXcgKC4uLmFyZ3M6IGFueVtdKTogYW55OyAoLi4uYXJnczogYW55W10pOiBhbnk7ICguLi5hcmdzOiBhbnlbXSk6IChjbHM6IGFueSkgPT4gYW55O30ge1xuICByZXR1cm4gbm9TaWRlRWZmZWN0cygoKSA9PiB7XG4gICAgY29uc3QgbWV0YUN0b3IgPSBtYWtlTWV0YWRhdGFDdG9yKHByb3BzKTtcblxuICAgIGZ1bmN0aW9uIERlY29yYXRvckZhY3RvcnkoXG4gICAgICAgIHRoaXM6IHVua25vd258dHlwZW9mIERlY29yYXRvckZhY3RvcnksIC4uLmFyZ3M6IGFueVtdKTogKGNsczogVHlwZTxUPikgPT4gYW55IHtcbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgRGVjb3JhdG9yRmFjdG9yeSkge1xuICAgICAgICBtZXRhQ3Rvci5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcyBhcyB0eXBlb2YgRGVjb3JhdG9yRmFjdG9yeTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYW5ub3RhdGlvbkluc3RhbmNlID0gbmV3IChEZWNvcmF0b3JGYWN0b3J5IGFzIGFueSkoLi4uYXJncyk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gVHlwZURlY29yYXRvcihjbHM6IFR5cGU8VD4pIHtcbiAgICAgICAgaWYgKHR5cGVGbikgdHlwZUZuKGNscywgLi4uYXJncyk7XG4gICAgICAgIC8vIFVzZSBvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgaXMgaW1wb3J0YW50IHNpbmNlIGl0IGNyZWF0ZXMgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgd2hpY2hcbiAgICAgICAgLy8gcHJldmVudHMgdGhlIHByb3BlcnR5IGlzIGNvcGllZCBkdXJpbmcgc3ViY2xhc3NpbmcuXG4gICAgICAgIGNvbnN0IGFubm90YXRpb25zID0gY2xzLmhhc093blByb3BlcnR5KEFOTk9UQVRJT05TKSA/XG4gICAgICAgICAgICAoY2xzIGFzIGFueSlbQU5OT1RBVElPTlNdIDpcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbHMsIEFOTk9UQVRJT05TLCB7dmFsdWU6IFtdfSlbQU5OT1RBVElPTlNdO1xuICAgICAgICBhbm5vdGF0aW9ucy5wdXNoKGFubm90YXRpb25JbnN0YW5jZSk7XG5cblxuICAgICAgICBpZiAoYWRkaXRpb25hbFByb2Nlc3NpbmcpIGFkZGl0aW9uYWxQcm9jZXNzaW5nKGNscyk7XG5cbiAgICAgICAgcmV0dXJuIGNscztcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHBhcmVudENsYXNzKSB7XG4gICAgICBEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50Q2xhc3MucHJvdG90eXBlKTtcbiAgICB9XG5cbiAgICBEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZS5uZ01ldGFkYXRhTmFtZSA9IG5hbWU7XG4gICAgKERlY29yYXRvckZhY3RvcnkgYXMgYW55KS5hbm5vdGF0aW9uQ2xzID0gRGVjb3JhdG9yRmFjdG9yeTtcbiAgICByZXR1cm4gRGVjb3JhdG9yRmFjdG9yeSBhcyBhbnk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtYWtlTWV0YWRhdGFDdG9yKHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkpOiBhbnkge1xuICByZXR1cm4gZnVuY3Rpb24gY3Rvcih0aGlzOiBhbnksIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBwcm9wcyguLi5hcmdzKTtcbiAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gdmFsdWVzKSB7XG4gICAgICAgIHRoaXNbcHJvcE5hbWVdID0gdmFsdWVzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlUGFyYW1EZWNvcmF0b3IoXG4gICAgbmFtZTogc3RyaW5nLCBwcm9wcz86ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LCBwYXJlbnRDbGFzcz86IGFueSk6IGFueSB7XG4gIHJldHVybiBub1NpZGVFZmZlY3RzKCgpID0+IHtcbiAgICBjb25zdCBtZXRhQ3RvciA9IG1ha2VNZXRhZGF0YUN0b3IocHJvcHMpO1xuICAgIGZ1bmN0aW9uIFBhcmFtRGVjb3JhdG9yRmFjdG9yeShcbiAgICAgICAgdGhpczogdW5rbm93bnx0eXBlb2YgUGFyYW1EZWNvcmF0b3JGYWN0b3J5LCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XG4gICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFBhcmFtRGVjb3JhdG9yRmFjdG9yeSkge1xuICAgICAgICBtZXRhQ3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBjb25zdCBhbm5vdGF0aW9uSW5zdGFuY2UgPSBuZXcgKDxhbnk+UGFyYW1EZWNvcmF0b3JGYWN0b3J5KSguLi5hcmdzKTtcblxuICAgICAgKDxhbnk+UGFyYW1EZWNvcmF0b3IpLmFubm90YXRpb24gPSBhbm5vdGF0aW9uSW5zdGFuY2U7XG4gICAgICByZXR1cm4gUGFyYW1EZWNvcmF0b3I7XG5cbiAgICAgIGZ1bmN0aW9uIFBhcmFtRGVjb3JhdG9yKGNsczogYW55LCB1bnVzZWRLZXk6IGFueSwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgICAgIC8vIFVzZSBvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgaXMgaW1wb3J0YW50IHNpbmNlIGl0IGNyZWF0ZXMgbm9uLWVudW1lcmFibGUgcHJvcGVydHkgd2hpY2hcbiAgICAgICAgLy8gcHJldmVudHMgdGhlIHByb3BlcnR5IGlzIGNvcGllZCBkdXJpbmcgc3ViY2xhc3NpbmcuXG4gICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBjbHMuaGFzT3duUHJvcGVydHkoUEFSQU1FVEVSUykgP1xuICAgICAgICAgICAgKGNscyBhcyBhbnkpW1BBUkFNRVRFUlNdIDpcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbHMsIFBBUkFNRVRFUlMsIHt2YWx1ZTogW119KVtQQVJBTUVURVJTXTtcblxuICAgICAgICAvLyB0aGVyZSBtaWdodCBiZSBnYXBzIGlmIHNvbWUgaW4gYmV0d2VlbiBwYXJhbWV0ZXJzIGRvIG5vdCBoYXZlIGFubm90YXRpb25zLlxuICAgICAgICAvLyB3ZSBwYWQgd2l0aCBudWxscy5cbiAgICAgICAgd2hpbGUgKHBhcmFtZXRlcnMubGVuZ3RoIDw9IGluZGV4KSB7XG4gICAgICAgICAgcGFyYW1ldGVycy5wdXNoKG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgKHBhcmFtZXRlcnNbaW5kZXhdID0gcGFyYW1ldGVyc1tpbmRleF0gfHwgW10pLnB1c2goYW5ub3RhdGlvbkluc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGNscztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmVudENsYXNzKSB7XG4gICAgICBQYXJhbURlY29yYXRvckZhY3RvcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRDbGFzcy5wcm90b3R5cGUpO1xuICAgIH1cbiAgICBQYXJhbURlY29yYXRvckZhY3RvcnkucHJvdG90eXBlLm5nTWV0YWRhdGFOYW1lID0gbmFtZTtcbiAgICAoPGFueT5QYXJhbURlY29yYXRvckZhY3RvcnkpLmFubm90YXRpb25DbHMgPSBQYXJhbURlY29yYXRvckZhY3Rvcnk7XG4gICAgcmV0dXJuIFBhcmFtRGVjb3JhdG9yRmFjdG9yeTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlUHJvcERlY29yYXRvcihcbiAgICBuYW1lOiBzdHJpbmcsIHByb3BzPzogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksIHBhcmVudENsYXNzPzogYW55LFxuICAgIGFkZGl0aW9uYWxQcm9jZXNzaW5nPzogKHRhcmdldDogYW55LCBuYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKTogYW55IHtcbiAgcmV0dXJuIG5vU2lkZUVmZmVjdHMoKCkgPT4ge1xuICAgIGNvbnN0IG1ldGFDdG9yID0gbWFrZU1ldGFkYXRhQ3Rvcihwcm9wcyk7XG5cbiAgICBmdW5jdGlvbiBQcm9wRGVjb3JhdG9yRmFjdG9yeSh0aGlzOiB1bmtub3dufHR5cGVvZiBQcm9wRGVjb3JhdG9yRmFjdG9yeSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBQcm9wRGVjb3JhdG9yRmFjdG9yeSkge1xuICAgICAgICBtZXRhQ3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29yYXRvckluc3RhbmNlID0gbmV3ICg8YW55PlByb3BEZWNvcmF0b3JGYWN0b3J5KSguLi5hcmdzKTtcblxuICAgICAgZnVuY3Rpb24gUHJvcERlY29yYXRvcih0YXJnZXQ6IGFueSwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNvbnN0cnVjdG9yID0gdGFyZ2V0LmNvbnN0cnVjdG9yO1xuICAgICAgICAvLyBVc2Ugb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIGltcG9ydGFudCBzaW5jZSBpdCBjcmVhdGVzIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IHdoaWNoXG4gICAgICAgIC8vIHByZXZlbnRzIHRoZSBwcm9wZXJ0eSBpcyBjb3BpZWQgZHVyaW5nIHN1YmNsYXNzaW5nLlxuICAgICAgICBjb25zdCBtZXRhID0gY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoUFJPUF9NRVRBREFUQSkgP1xuICAgICAgICAgICAgKGNvbnN0cnVjdG9yIGFzIGFueSlbUFJPUF9NRVRBREFUQV0gOlxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvbnN0cnVjdG9yLCBQUk9QX01FVEFEQVRBLCB7dmFsdWU6IHt9fSlbUFJPUF9NRVRBREFUQV07XG4gICAgICAgIG1ldGFbbmFtZV0gPSBtZXRhLmhhc093blByb3BlcnR5KG5hbWUpICYmIG1ldGFbbmFtZV0gfHwgW107XG4gICAgICAgIG1ldGFbbmFtZV0udW5zaGlmdChkZWNvcmF0b3JJbnN0YW5jZSk7XG5cbiAgICAgICAgaWYgKGFkZGl0aW9uYWxQcm9jZXNzaW5nKSBhZGRpdGlvbmFsUHJvY2Vzc2luZyh0YXJnZXQsIG5hbWUsIC4uLmFyZ3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gUHJvcERlY29yYXRvcjtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50Q2xhc3MpIHtcbiAgICAgIFByb3BEZWNvcmF0b3JGYWN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50Q2xhc3MucHJvdG90eXBlKTtcbiAgICB9XG5cbiAgICBQcm9wRGVjb3JhdG9yRmFjdG9yeS5wcm90b3R5cGUubmdNZXRhZGF0YU5hbWUgPSBuYW1lO1xuICAgICg8YW55PlByb3BEZWNvcmF0b3JGYWN0b3J5KS5hbm5vdGF0aW9uQ2xzID0gUHJvcERlY29yYXRvckZhY3Rvcnk7XG4gICAgcmV0dXJuIFByb3BEZWNvcmF0b3JGYWN0b3J5O1xuICB9KTtcbn1cbiJdfQ==