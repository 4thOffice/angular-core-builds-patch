/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Public API for compiler
export { Compiler, COMPILER_OPTIONS, CompilerFactory, ModuleWithComponentFactories } from './linker/compiler';
export { ComponentFactory, ComponentRef } from './linker/component_factory';
export { ComponentFactoryResolver } from './linker/component_factory_resolver';
export { ElementRef } from './linker/element_ref';
export { NgModuleFactory, NgModuleRef } from './linker/ng_module_factory';
export { getModuleFactory, NgModuleFactoryLoader } from './linker/ng_module_factory_loader';
export { QueryList } from './linker/query_list';
export { SystemJsNgModuleLoader, SystemJsNgModuleLoaderConfig } from './linker/system_js_ng_module_factory_loader';
export { TemplateRef } from './linker/template_ref';
export { ViewContainerRef } from './linker/view_container_ref';
export { EmbeddedViewRef, ViewRef } from './linker/view_ref';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbGlua2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILDBCQUEwQjtBQUMxQixPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBbUIsNEJBQTRCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3SCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDN0UsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxlQUFlLEVBQUUsV0FBVyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDeEUsT0FBTyxFQUFDLGdCQUFnQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDMUYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSw0QkFBNEIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2pILE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsZUFBZSxFQUFFLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFB1YmxpYyBBUEkgZm9yIGNvbXBpbGVyXG5leHBvcnQge0NvbXBpbGVyLCBDT01QSUxFUl9PUFRJT05TLCBDb21waWxlckZhY3RvcnksIENvbXBpbGVyT3B0aW9ucywgTW9kdWxlV2l0aENvbXBvbmVudEZhY3Rvcmllc30gZnJvbSAnLi9saW5rZXIvY29tcGlsZXInO1xuZXhwb3J0IHtDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWZ9IGZyb20gJy4vbGlua2VyL2NvbXBvbmVudF9mYWN0b3J5JztcbmV4cG9ydCB7Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyfSBmcm9tICcuL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeV9yZXNvbHZlcic7XG5leHBvcnQge0VsZW1lbnRSZWZ9IGZyb20gJy4vbGlua2VyL2VsZW1lbnRfcmVmJztcbmV4cG9ydCB7TmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZn0gZnJvbSAnLi9saW5rZXIvbmdfbW9kdWxlX2ZhY3RvcnknO1xuZXhwb3J0IHtnZXRNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZUZhY3RvcnlMb2FkZXJ9IGZyb20gJy4vbGlua2VyL25nX21vZHVsZV9mYWN0b3J5X2xvYWRlcic7XG5leHBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnLi9saW5rZXIvcXVlcnlfbGlzdCc7XG5leHBvcnQge1N5c3RlbUpzTmdNb2R1bGVMb2FkZXIsIFN5c3RlbUpzTmdNb2R1bGVMb2FkZXJDb25maWd9IGZyb20gJy4vbGlua2VyL3N5c3RlbV9qc19uZ19tb2R1bGVfZmFjdG9yeV9sb2FkZXInO1xuZXhwb3J0IHtUZW1wbGF0ZVJlZn0gZnJvbSAnLi9saW5rZXIvdGVtcGxhdGVfcmVmJztcbmV4cG9ydCB7Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnLi9saW5rZXIvdmlld19jb250YWluZXJfcmVmJztcbmV4cG9ydCB7RW1iZWRkZWRWaWV3UmVmLCBWaWV3UmVmfSBmcm9tICcuL2xpbmtlci92aWV3X3JlZic7XG4iXX0=