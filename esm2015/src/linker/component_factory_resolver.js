/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { stringify } from '../util';
import { ComponentFactory } from './component_factory';
export function noComponentFactoryError(component) {
    const error = Error(`No component factory found for ${stringify(component)}. Did you add it to @NgModule.entryComponents?`);
    error[ERROR_COMPONENT] = component;
    return error;
}
const ERROR_COMPONENT = 'ngComponent';
export function getComponent(error) {
    return error[ERROR_COMPONENT];
}
class _NullComponentFactoryResolver {
    resolveComponentFactory(component) {
        throw noComponentFactoryError(component);
    }
}
export class ComponentFactoryResolver {
}
ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
export class CodegenComponentFactoryResolver {
    constructor(factories, _parent, _ngModule) {
        this._parent = _parent;
        this._ngModule = _ngModule;
        this._factories = new Map();
        for (let i = 0; i < factories.length; i++) {
            const factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    resolveComponentFactory(component) {
        let factory = this._factories.get(component);
        if (!factory && this._parent) {
            factory = this._parent.resolveComponentFactory(component);
        }
        if (!factory) {
            throw noComponentFactoryError(component);
        }
        return new ComponentFactoryBoundToModule(factory, this._ngModule);
    }
}
export class ComponentFactoryBoundToModule extends ComponentFactory {
    constructor(factory, ngModule) {
        super();
        this.factory = factory;
        this.ngModule = ngModule;
        this.selector = factory.selector;
        this.componentType = factory.componentType;
        this.ngContentSelectors = factory.ngContentSelectors;
        this.inputs = factory.inputs;
        this.outputs = factory.outputs;
    }
    create(injector, projectableNodes, rootSelectorOrNode, ngModule) {
        return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X2ZhY3RvcnlfcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnlfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUVsQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUduRSxNQUFNLGtDQUFrQyxTQUFtQjtJQUN6RCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQ2Ysa0NBQWtDLFNBQVMsQ0FBQyxTQUFTLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUMzRyxLQUFhLENBQUMsZUFBZSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQzVDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQztBQUV0QyxNQUFNLHVCQUF1QixLQUFZO0lBQ3ZDLE9BQVEsS0FBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFHRDtJQUNFLHVCQUF1QixDQUFJLFNBQW9DO1FBQzdELE1BQU0sdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBRUQsTUFBTTs7QUFDRyw2QkFBSSxHQUE2QixJQUFJLDZCQUE2QixFQUFFLENBQUM7QUFJOUUsTUFBTTtJQUdKLFlBQ0ksU0FBa0MsRUFBVSxPQUFpQyxFQUNyRSxTQUEyQjtRQURTLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBQ3JFLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBSi9CLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztRQUt6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7SUFFRCx1QkFBdUIsQ0FBSSxTQUFvQztRQUM3RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMxQztRQUNELE9BQU8sSUFBSSw2QkFBNkIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FDRjtBQUVELE1BQU0sb0NBQXdDLFNBQVEsZ0JBQW1CO0lBT3ZFLFlBQW9CLE9BQTRCLEVBQVUsUUFBMEI7UUFDbEYsS0FBSyxFQUFFLENBQUM7UUFEVSxZQUFPLEdBQVAsT0FBTyxDQUFxQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBRWxGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxNQUFNLENBQ0YsUUFBa0IsRUFBRSxnQkFBMEIsRUFBRSxrQkFBK0IsRUFDL0UsUUFBMkI7UUFDN0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDdEIsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakYsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdG9yfSBmcm9tICcuLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZn0gZnJvbSAnLi9jb21wb25lbnRfZmFjdG9yeSc7XG5pbXBvcnQge05nTW9kdWxlUmVmfSBmcm9tICcuL25nX21vZHVsZV9mYWN0b3J5JztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vQ29tcG9uZW50RmFjdG9yeUVycm9yKGNvbXBvbmVudDogRnVuY3Rpb24pIHtcbiAgY29uc3QgZXJyb3IgPSBFcnJvcihcbiAgICAgIGBObyBjb21wb25lbnQgZmFjdG9yeSBmb3VuZCBmb3IgJHtzdHJpbmdpZnkoY29tcG9uZW50KX0uIERpZCB5b3UgYWRkIGl0IHRvIEBOZ01vZHVsZS5lbnRyeUNvbXBvbmVudHM/YCk7XG4gIChlcnJvciBhcyBhbnkpW0VSUk9SX0NPTVBPTkVOVF0gPSBjb21wb25lbnQ7XG4gIHJldHVybiBlcnJvcjtcbn1cblxuY29uc3QgRVJST1JfQ09NUE9ORU5UID0gJ25nQ29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudChlcnJvcjogRXJyb3IpOiBUeXBlPGFueT4ge1xuICByZXR1cm4gKGVycm9yIGFzIGFueSlbRVJST1JfQ09NUE9ORU5UXTtcbn1cblxuXG5jbGFzcyBfTnVsbENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciBpbXBsZW1lbnRzIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB7XG4gIHJlc29sdmVDb21wb25lbnRGYWN0b3J5PFQ+KGNvbXBvbmVudDoge25ldyAoLi4uYXJnczogYW55W10pOiBUfSk6IENvbXBvbmVudEZhY3Rvcnk8VD4ge1xuICAgIHRocm93IG5vQ29tcG9uZW50RmFjdG9yeUVycm9yKGNvbXBvbmVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB7XG4gIHN0YXRpYyBOVUxMOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgPSBuZXcgX051bGxDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIoKTtcbiAgYWJzdHJhY3QgcmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50RmFjdG9yeTxUPjtcbn1cblxuZXhwb3J0IGNsYXNzIENvZGVnZW5Db21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgaW1wbGVtZW50cyBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIge1xuICBwcml2YXRlIF9mYWN0b3JpZXMgPSBuZXcgTWFwPGFueSwgQ29tcG9uZW50RmFjdG9yeTxhbnk+PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgZmFjdG9yaWVzOiBDb21wb25lbnRGYWN0b3J5PGFueT5bXSwgcHJpdmF0ZSBfcGFyZW50OiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIF9uZ01vZHVsZTogTmdNb2R1bGVSZWY8YW55Pikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmFjdG9yaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmYWN0b3J5ID0gZmFjdG9yaWVzW2ldO1xuICAgICAgdGhpcy5fZmFjdG9yaWVzLnNldChmYWN0b3J5LmNvbXBvbmVudFR5cGUsIGZhY3RvcnkpO1xuICAgIH1cbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnRGYWN0b3J5PFQ+KGNvbXBvbmVudDoge25ldyAoLi4uYXJnczogYW55W10pOiBUfSk6IENvbXBvbmVudEZhY3Rvcnk8VD4ge1xuICAgIGxldCBmYWN0b3J5ID0gdGhpcy5fZmFjdG9yaWVzLmdldChjb21wb25lbnQpO1xuICAgIGlmICghZmFjdG9yeSAmJiB0aGlzLl9wYXJlbnQpIHtcbiAgICAgIGZhY3RvcnkgPSB0aGlzLl9wYXJlbnQucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICB9XG4gICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICB0aHJvdyBub0NvbXBvbmVudEZhY3RvcnlFcnJvcihjb21wb25lbnQpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbXBvbmVudEZhY3RvcnlCb3VuZFRvTW9kdWxlKGZhY3RvcnksIHRoaXMuX25nTW9kdWxlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RmFjdG9yeUJvdW5kVG9Nb2R1bGU8Qz4gZXh0ZW5kcyBDb21wb25lbnRGYWN0b3J5PEM+IHtcbiAgcmVhZG9ubHkgc2VsZWN0b3I6IHN0cmluZztcbiAgcmVhZG9ubHkgY29tcG9uZW50VHlwZTogVHlwZTxhbnk+O1xuICByZWFkb25seSBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdO1xuICByZWFkb25seSBpbnB1dHM6IHtwcm9wTmFtZTogc3RyaW5nLCB0ZW1wbGF0ZU5hbWU6IHN0cmluZ31bXTtcbiAgcmVhZG9ubHkgb3V0cHV0czoge3Byb3BOYW1lOiBzdHJpbmcsIHRlbXBsYXRlTmFtZTogc3RyaW5nfVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxDPiwgcHJpdmF0ZSBuZ01vZHVsZTogTmdNb2R1bGVSZWY8YW55Pikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zZWxlY3RvciA9IGZhY3Rvcnkuc2VsZWN0b3I7XG4gICAgdGhpcy5jb21wb25lbnRUeXBlID0gZmFjdG9yeS5jb21wb25lbnRUeXBlO1xuICAgIHRoaXMubmdDb250ZW50U2VsZWN0b3JzID0gZmFjdG9yeS5uZ0NvbnRlbnRTZWxlY3RvcnM7XG4gICAgdGhpcy5pbnB1dHMgPSBmYWN0b3J5LmlucHV0cztcbiAgICB0aGlzLm91dHB1dHMgPSBmYWN0b3J5Lm91dHB1dHM7XG4gIH1cblxuICBjcmVhdGUoXG4gICAgICBpbmplY3RvcjogSW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXM/OiBhbnlbXVtdLCByb290U2VsZWN0b3JPck5vZGU/OiBzdHJpbmd8YW55LFxuICAgICAgbmdNb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+KTogQ29tcG9uZW50UmVmPEM+IHtcbiAgICByZXR1cm4gdGhpcy5mYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgaW5qZWN0b3IsIHByb2plY3RhYmxlTm9kZXMsIHJvb3RTZWxlY3Rvck9yTm9kZSwgbmdNb2R1bGUgfHwgdGhpcy5uZ01vZHVsZSk7XG4gIH1cbn1cbiJdfQ==