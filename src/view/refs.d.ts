import { ApplicationRef } from '../application_ref';
import { ChangeDetectorRef } from '../change_detection/change_detection';
import { Injector } from '../di';
import { ComponentFactory } from '../linker/component_factory';
import { TemplateRef } from '../linker/template_ref';
import { ViewContainerRef } from '../linker/view_container_ref';
import { EmbeddedViewRef } from '../linker/view_ref';
import { Renderer as RendererV1 } from '../render/api';
import { Type } from '../type';
import { NodeDef, ViewData, ViewDefinitionFactory } from './types';
export declare function createComponentFactory(selector: string, componentType: Type<any>, viewDefFactory: ViewDefinitionFactory): ComponentFactory<any>;
export declare function createViewContainerRef(view: ViewData, elDef: NodeDef): ViewContainerRef;
export declare function createChangeDetectorRef(view: ViewData): ChangeDetectorRef;
export declare class ViewRef_ implements EmbeddedViewRef<any> {
    private _viewContainerRef;
    private _appRef;
    constructor(_view: ViewData);
    readonly rootNodes: any[];
    readonly context: any;
    readonly destroyed: boolean;
    markForCheck(): void;
    detach(): void;
    detectChanges(): void;
    checkNoChanges(): void;
    reattach(): void;
    onDestroy(callback: Function): void;
    destroy(): void;
    detachFromContainer(): void;
    attachToAppRef(appRef: ApplicationRef): void;
    attachToViewContainerRef(vcRef: ViewContainerRef): void;
}
export declare function createTemplateRef(view: ViewData, def: NodeDef): TemplateRef<any>;
export declare function createInjector(view: ViewData, elDef: NodeDef): Injector;
export declare function nodeValue(view: ViewData, index: number): any;
export declare function createRendererV1(view: ViewData): RendererV1;
