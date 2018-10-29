/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { LifecycleHooksFeature, getHostElement, getRenderedText, renderComponent, whenRendered } from './component';
import { defineBase, defineComponent, defineDirective, defineNgModule, definePipe } from './definition';
import { InheritDefinitionFeature } from './features/inherit_definition_feature';
import { NgOnChangesFeature } from './features/ng_onchanges_feature';
import { ProvidersFeature } from './features/providers_feature';
export { ComponentFactory, ComponentFactoryResolver, ComponentRef, WRAP_RENDERER_FACTORY2, injectComponentFactoryResolver } from './component_ref';
export { getFactoryOf, getInheritedFactory } from './di';
export { bind, interpolation1, interpolation2, interpolation3, interpolation4, interpolation5, interpolation6, interpolation7, interpolation8, interpolationV, container, containerRefreshStart, containerRefreshEnd, nextContext, element, elementAttribute, elementClassProp, elementEnd, elementProperty, elementStart, elementContainerStart, elementContainerEnd, elementStyling, elementStylingMap, elementStyleProp, elementStylingApply, listener, store, load, namespaceHTML, namespaceMathML, namespaceSVG, projection, projectionDef, text, textBinding, template, reference, embeddedViewStart, embeddedViewEnd, detectChanges, markDirty, tick, directiveInject, injectAttribute, } from './instructions';
export { getCurrentView, restoreView, enableBindings, disableBindings, } from './state';
export { i18nAttribute, i18nExp, i18nStart, i18nEnd, i18nApply, i18nMapping, i18nInterpolation1, i18nInterpolation2, i18nInterpolation3, i18nInterpolation4, i18nInterpolation5, i18nInterpolation6, i18nInterpolation7, i18nInterpolation8, i18nInterpolationV, i18nExpMapping } from './i18n';
export { NgModuleFactory, NgModuleRef } from './ng_module_ref';
export { pipe, pipeBind1, pipeBind2, pipeBind3, pipeBind4, pipeBindV, } from './pipe';
export { QueryList, query, queryRefresh, } from './query';
export { registerContentQuery, loadQueryList, } from './instructions';
export { pureFunction0, pureFunction1, pureFunction2, pureFunction3, pureFunction4, pureFunction5, pureFunction6, pureFunction7, pureFunction8, pureFunctionV, } from './pure_function';
export { templateRefExtractor } from './view_engine_compatibility_prebound';
export { NgOnChangesFeature, InheritDefinitionFeature, ProvidersFeature, LifecycleHooksFeature, defineComponent, defineDirective, defineNgModule, defineBase, definePipe, getHostElement, getRenderedText, renderComponent, whenRendered, };
export { NO_CHANGE } from './tokens';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFPQSxPQUFPLEVBQUMscUJBQXFCLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ2xILE9BQU8sRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RHLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRzlELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqSixPQUFPLEVBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sTUFBTSxDQUFDO0FBS3ZELE9BQU8sRUFDTCxJQUFJLEVBQ0osY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBRWQsU0FBUyxFQUNULHFCQUFxQixFQUNyQixtQkFBbUIsRUFFbkIsV0FBVyxFQUVYLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFVBQVUsRUFDVixlQUFlLEVBQ2YsWUFBWSxFQUVaLHFCQUFxQixFQUNyQixtQkFBbUIsRUFFbkIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBRW5CLFFBQVEsRUFDUixLQUFLLEVBQ0wsSUFBSSxFQUVKLGFBQWEsRUFDYixlQUFlLEVBQ2YsWUFBWSxFQUVaLFVBQVUsRUFDVixhQUFhLEVBRWIsSUFBSSxFQUNKLFdBQVcsRUFDWCxRQUFRLEVBRVIsU0FBUyxFQUVULGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsYUFBYSxFQUNiLFNBQVMsRUFDVCxJQUFJLEVBRUosZUFBZSxFQUNmLGVBQWUsR0FDaEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQ0wsY0FBYyxFQUNkLFdBQVcsRUFFWCxjQUFjLEVBQ2QsZUFBZSxHQUNoQixNQUFNLFNBQVMsQ0FBQztBQUVqQixPQUFPLEVBQ0wsYUFBYSxFQUNiLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsY0FBYyxFQUdmLE1BQU0sUUFBUSxDQUFDO0FBRWhCLE9BQU8sRUFBQyxlQUFlLEVBQUUsV0FBVyxFQUFlLE1BQU0saUJBQWlCLENBQUM7QUFNM0UsT0FBTyxFQUNMLElBQUksRUFDSixTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxHQUNWLE1BQU0sUUFBUSxDQUFDO0FBRWhCLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksR0FDYixNQUFNLFNBQVMsQ0FBQztBQUNqQixPQUFRLEVBQ04sb0JBQW9CLEVBQ3BCLGFBQWEsR0FDZCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFDTCxhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUsxRSxPQUFPLEVBVUwsa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFHaEIscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixlQUFlLEVBQ2YsY0FBYyxFQUNkLFVBQVUsRUFDVixVQUFVLEVBQ1YsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsWUFBWSxHQUNiLENBQUM7QUFFRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtMaWZlY3ljbGVIb29rc0ZlYXR1cmUsIGdldEhvc3RFbGVtZW50LCBnZXRSZW5kZXJlZFRleHQsIHJlbmRlckNvbXBvbmVudCwgd2hlblJlbmRlcmVkfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge2RlZmluZUJhc2UsIGRlZmluZUNvbXBvbmVudCwgZGVmaW5lRGlyZWN0aXZlLCBkZWZpbmVOZ01vZHVsZSwgZGVmaW5lUGlwZX0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7SW5oZXJpdERlZmluaXRpb25GZWF0dXJlfSBmcm9tICcuL2ZlYXR1cmVzL2luaGVyaXRfZGVmaW5pdGlvbl9mZWF0dXJlJztcbmltcG9ydCB7TmdPbkNoYW5nZXNGZWF0dXJlfSBmcm9tICcuL2ZlYXR1cmVzL25nX29uY2hhbmdlc19mZWF0dXJlJztcbmltcG9ydCB7UHJvdmlkZXJzRmVhdHVyZX0gZnJvbSAnLi9mZWF0dXJlcy9wcm92aWRlcnNfZmVhdHVyZSc7XG5pbXBvcnQge0Jhc2VEZWYsIENvbXBvbmVudERlZiwgQ29tcG9uZW50RGVmV2l0aE1ldGEsIENvbXBvbmVudFRlbXBsYXRlLCBDb21wb25lbnRUeXBlLCBEaXJlY3RpdmVEZWYsIERpcmVjdGl2ZURlZkZsYWdzLCBEaXJlY3RpdmVEZWZXaXRoTWV0YSwgRGlyZWN0aXZlVHlwZSwgUGlwZURlZiwgUGlwZURlZldpdGhNZXRhfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5cbmV4cG9ydCB7Q29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYsIFdSQVBfUkVOREVSRVJfRkFDVE9SWTIsIGluamVjdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcn0gZnJvbSAnLi9jb21wb25lbnRfcmVmJztcbmV4cG9ydCB7Z2V0RmFjdG9yeU9mLCBnZXRJbmhlcml0ZWRGYWN0b3J5fSBmcm9tICcuL2RpJztcbmV4cG9ydCB7UmVuZGVyRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmV4cG9ydCB7Q3NzU2VsZWN0b3JMaXN0fSBmcm9tICcuL2ludGVyZmFjZXMvcHJvamVjdGlvbic7XG5cbi8vIGNsYW5nLWZvcm1hdCBvZmZcbmV4cG9ydCB7XG4gIGJpbmQsXG4gIGludGVycG9sYXRpb24xLFxuICBpbnRlcnBvbGF0aW9uMixcbiAgaW50ZXJwb2xhdGlvbjMsXG4gIGludGVycG9sYXRpb240LFxuICBpbnRlcnBvbGF0aW9uNSxcbiAgaW50ZXJwb2xhdGlvbjYsXG4gIGludGVycG9sYXRpb243LFxuICBpbnRlcnBvbGF0aW9uOCxcbiAgaW50ZXJwb2xhdGlvblYsXG5cbiAgY29udGFpbmVyLFxuICBjb250YWluZXJSZWZyZXNoU3RhcnQsXG4gIGNvbnRhaW5lclJlZnJlc2hFbmQsXG5cbiAgbmV4dENvbnRleHQsXG5cbiAgZWxlbWVudCxcbiAgZWxlbWVudEF0dHJpYnV0ZSxcbiAgZWxlbWVudENsYXNzUHJvcCxcbiAgZWxlbWVudEVuZCxcbiAgZWxlbWVudFByb3BlcnR5LFxuICBlbGVtZW50U3RhcnQsXG5cbiAgZWxlbWVudENvbnRhaW5lclN0YXJ0LFxuICBlbGVtZW50Q29udGFpbmVyRW5kLFxuXG4gIGVsZW1lbnRTdHlsaW5nLFxuICBlbGVtZW50U3R5bGluZ01hcCxcbiAgZWxlbWVudFN0eWxlUHJvcCxcbiAgZWxlbWVudFN0eWxpbmdBcHBseSxcblxuICBsaXN0ZW5lcixcbiAgc3RvcmUsXG4gIGxvYWQsXG5cbiAgbmFtZXNwYWNlSFRNTCxcbiAgbmFtZXNwYWNlTWF0aE1MLFxuICBuYW1lc3BhY2VTVkcsXG5cbiAgcHJvamVjdGlvbixcbiAgcHJvamVjdGlvbkRlZixcblxuICB0ZXh0LFxuICB0ZXh0QmluZGluZyxcbiAgdGVtcGxhdGUsXG5cbiAgcmVmZXJlbmNlLFxuXG4gIGVtYmVkZGVkVmlld1N0YXJ0LFxuICBlbWJlZGRlZFZpZXdFbmQsXG4gIGRldGVjdENoYW5nZXMsXG4gIG1hcmtEaXJ0eSxcbiAgdGljayxcblxuICBkaXJlY3RpdmVJbmplY3QsXG4gIGluamVjdEF0dHJpYnV0ZSxcbn0gZnJvbSAnLi9pbnN0cnVjdGlvbnMnO1xuXG5leHBvcnQge1xuICBnZXRDdXJyZW50VmlldyxcbiAgcmVzdG9yZVZpZXcsXG5cbiAgZW5hYmxlQmluZGluZ3MsXG4gIGRpc2FibGVCaW5kaW5ncyxcbn0gZnJvbSAnLi9zdGF0ZSc7XG5cbmV4cG9ydCB7XG4gIGkxOG5BdHRyaWJ1dGUsXG4gIGkxOG5FeHAsXG4gIGkxOG5TdGFydCxcbiAgaTE4bkVuZCxcbiAgaTE4bkFwcGx5LFxuICBpMThuTWFwcGluZyxcbiAgaTE4bkludGVycG9sYXRpb24xLFxuICBpMThuSW50ZXJwb2xhdGlvbjIsXG4gIGkxOG5JbnRlcnBvbGF0aW9uMyxcbiAgaTE4bkludGVycG9sYXRpb240LFxuICBpMThuSW50ZXJwb2xhdGlvbjUsXG4gIGkxOG5JbnRlcnBvbGF0aW9uNixcbiAgaTE4bkludGVycG9sYXRpb243LFxuICBpMThuSW50ZXJwb2xhdGlvbjgsXG4gIGkxOG5JbnRlcnBvbGF0aW9uVixcbiAgaTE4bkV4cE1hcHBpbmcsXG4gIEkxOG5JbnN0cnVjdGlvbixcbiAgSTE4bkV4cEluc3RydWN0aW9uXG59IGZyb20gJy4vaTE4bic7XG5cbmV4cG9ydCB7TmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgTmdNb2R1bGVUeXBlfSBmcm9tICcuL25nX21vZHVsZV9yZWYnO1xuXG5leHBvcnQge1xuICAgIEF0dHJpYnV0ZU1hcmtlclxufSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5cbmV4cG9ydCB7XG4gIHBpcGUsXG4gIHBpcGVCaW5kMSxcbiAgcGlwZUJpbmQyLFxuICBwaXBlQmluZDMsXG4gIHBpcGVCaW5kNCxcbiAgcGlwZUJpbmRWLFxufSBmcm9tICcuL3BpcGUnO1xuXG5leHBvcnQge1xuICBRdWVyeUxpc3QsXG4gIHF1ZXJ5LFxuICBxdWVyeVJlZnJlc2gsXG59IGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICB7XG4gIHJlZ2lzdGVyQ29udGVudFF1ZXJ5LFxuICBsb2FkUXVlcnlMaXN0LFxufSBmcm9tICcuL2luc3RydWN0aW9ucyc7XG5cbmV4cG9ydCB7XG4gIHB1cmVGdW5jdGlvbjAsXG4gIHB1cmVGdW5jdGlvbjEsXG4gIHB1cmVGdW5jdGlvbjIsXG4gIHB1cmVGdW5jdGlvbjMsXG4gIHB1cmVGdW5jdGlvbjQsXG4gIHB1cmVGdW5jdGlvbjUsXG4gIHB1cmVGdW5jdGlvbjYsXG4gIHB1cmVGdW5jdGlvbjcsXG4gIHB1cmVGdW5jdGlvbjgsXG4gIHB1cmVGdW5jdGlvblYsXG59IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5cbmV4cG9ydCB7dGVtcGxhdGVSZWZFeHRyYWN0b3J9IGZyb20gJy4vdmlld19lbmdpbmVfY29tcGF0aWJpbGl0eV9wcmVib3VuZCc7XG5cblxuLy8gY2xhbmctZm9ybWF0IG9uXG5cbmV4cG9ydCB7XG4gIEJhc2VEZWYsXG4gIENvbXBvbmVudERlZixcbiAgQ29tcG9uZW50RGVmV2l0aE1ldGEsXG4gIENvbXBvbmVudFRlbXBsYXRlLFxuICBDb21wb25lbnRUeXBlLFxuICBEaXJlY3RpdmVEZWYsXG4gIERpcmVjdGl2ZURlZkZsYWdzLFxuICBEaXJlY3RpdmVEZWZXaXRoTWV0YSxcbiAgRGlyZWN0aXZlVHlwZSxcbiAgTmdPbkNoYW5nZXNGZWF0dXJlLFxuICBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUsXG4gIFByb3ZpZGVyc0ZlYXR1cmUsXG4gIFBpcGVEZWYsXG4gIFBpcGVEZWZXaXRoTWV0YSxcbiAgTGlmZWN5Y2xlSG9va3NGZWF0dXJlLFxuICBkZWZpbmVDb21wb25lbnQsXG4gIGRlZmluZURpcmVjdGl2ZSxcbiAgZGVmaW5lTmdNb2R1bGUsXG4gIGRlZmluZUJhc2UsXG4gIGRlZmluZVBpcGUsXG4gIGdldEhvc3RFbGVtZW50LFxuICBnZXRSZW5kZXJlZFRleHQsXG4gIHJlbmRlckNvbXBvbmVudCxcbiAgd2hlblJlbmRlcmVkLFxufTtcblxuZXhwb3J0IHtOT19DSEFOR0V9IGZyb20gJy4vdG9rZW5zJztcbiJdfQ==