/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LifecycleHooksFeature, getHostElement, getRenderedText, renderComponent, whenRendered } from './component';
import { defineBase, defineComponent, defineDirective, defineNgModule, definePipe } from './definition';
import { InheritDefinitionFeature } from './features/inherit_definition_feature';
import { NgOnChangesFeature } from './features/ng_onchanges_feature';
import { PublicFeature } from './features/public_feature';
export { ComponentFactory, ComponentFactoryResolver, ComponentRef, WRAP_RENDERER_FACTORY2, injectComponentFactoryResolver } from './component_ref';
export { directiveInject, getFactoryOf, getInheritedFactory, injectAttribute, injectRenderer2 } from './di';
// clang-format off
export { NO_CHANGE, bind, interpolation1, interpolation2, interpolation3, interpolation4, interpolation5, interpolation6, interpolation7, interpolation8, interpolationV, container, containerRefreshStart, containerRefreshEnd, nextContext, element, elementAttribute, elementClassProp, elementEnd, elementProperty, elementStart, elementContainerStart, elementContainerEnd, elementStyling, elementStylingMap, elementStyleProp, elementStylingApply, getCurrentView, restoreView, listener, store, load, namespaceHTML, namespaceMathML, namespaceSVG, enableBindings, disableBindings, projection, projectionDef, text, textBinding, template, reference, embeddedViewStart, embeddedViewEnd, detectChanges, markDirty, tick, } from './instructions';
export { i18nApply, i18nMapping, i18nInterpolation1, i18nInterpolation2, i18nInterpolation3, i18nInterpolation4, i18nInterpolation5, i18nInterpolation6, i18nInterpolation7, i18nInterpolation8, i18nInterpolationV, i18nExpMapping } from './i18n';
export { NgModuleFactory, NgModuleRef } from './ng_module_ref';
export { pipe, pipeBind1, pipeBind2, pipeBind3, pipeBind4, pipeBindV, } from './pipe';
export { QueryList, query, queryRefresh, } from './query';
export { registerContentQuery, loadQueryList, } from './instructions';
export { pureFunction0, pureFunction1, pureFunction2, pureFunction3, pureFunction4, pureFunction5, pureFunction6, pureFunction7, pureFunction8, pureFunctionV, } from './pure_function';
export { templateRefExtractor } from './view_engine_compatibility_prebound';
// clang-format on
export { NgOnChangesFeature, InheritDefinitionFeature, PublicFeature, LifecycleHooksFeature, defineComponent, defineDirective, defineNgModule, defineBase, definePipe, getHostElement, getRenderedText, renderComponent, whenRendered, };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDbEgsT0FBTyxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR3hELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNqSixPQUFPLEVBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBSTFHLG1CQUFtQjtBQUNuQixPQUFPLEVBRUwsU0FBUyxFQUVULElBQUksRUFDSixjQUFjLEVBQ2QsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGNBQWMsRUFFZCxTQUFTLEVBQ1QscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUVuQixXQUFXLEVBRVgsT0FBTyxFQUNQLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLGVBQWUsRUFDZixZQUFZLEVBRVoscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUVuQixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixtQkFBbUIsRUFFbkIsY0FBYyxFQUNkLFdBQVcsRUFFWCxRQUFRLEVBQ1IsS0FBSyxFQUNMLElBQUksRUFFSixhQUFhLEVBQ2IsZUFBZSxFQUNmLFlBQVksRUFFWixjQUFjLEVBQ2QsZUFBZSxFQUVmLFVBQVUsRUFDVixhQUFhLEVBRWIsSUFBSSxFQUNKLFdBQVcsRUFDWCxRQUFRLEVBRVIsU0FBUyxFQUVULGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsYUFBYSxFQUNiLFNBQVMsRUFDVCxJQUFJLEdBQ0wsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFDWCxrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixFQUNsQixjQUFjLEVBR2YsTUFBTSxRQUFRLENBQUM7QUFFaEIsT0FBTyxFQUFDLGVBQWUsRUFBRSxXQUFXLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQU0zRSxPQUFPLEVBQ0wsSUFBSSxFQUNKLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxRQUFRLENBQUM7QUFFaEIsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsWUFBWSxHQUNiLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQVEsRUFDTixvQkFBb0IsRUFDcEIsYUFBYSxHQUNkLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNMLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDYixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsR0FDZCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRzFFLGtCQUFrQjtBQUVsQixPQUFPLEVBVUwsa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixhQUFhLEVBR2IscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixlQUFlLEVBQ2YsY0FBYyxFQUNkLFVBQVUsRUFDVixVQUFVLEVBQ1YsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsWUFBWSxHQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TGlmZWN5Y2xlSG9va3NGZWF0dXJlLCBnZXRIb3N0RWxlbWVudCwgZ2V0UmVuZGVyZWRUZXh0LCByZW5kZXJDb21wb25lbnQsIHdoZW5SZW5kZXJlZH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHtkZWZpbmVCYXNlLCBkZWZpbmVDb21wb25lbnQsIGRlZmluZURpcmVjdGl2ZSwgZGVmaW5lTmdNb2R1bGUsIGRlZmluZVBpcGV9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0luaGVyaXREZWZpbml0aW9uRmVhdHVyZX0gZnJvbSAnLi9mZWF0dXJlcy9pbmhlcml0X2RlZmluaXRpb25fZmVhdHVyZSc7XG5pbXBvcnQge05nT25DaGFuZ2VzRmVhdHVyZX0gZnJvbSAnLi9mZWF0dXJlcy9uZ19vbmNoYW5nZXNfZmVhdHVyZSc7XG5pbXBvcnQge1B1YmxpY0ZlYXR1cmV9IGZyb20gJy4vZmVhdHVyZXMvcHVibGljX2ZlYXR1cmUnO1xuaW1wb3J0IHtCYXNlRGVmLCBDb21wb25lbnREZWYsIENvbXBvbmVudERlZldpdGhNZXRhLCBDb21wb25lbnRUZW1wbGF0ZSwgQ29tcG9uZW50VHlwZSwgRGlyZWN0aXZlRGVmLCBEaXJlY3RpdmVEZWZGbGFncywgRGlyZWN0aXZlRGVmV2l0aE1ldGEsIERpcmVjdGl2ZVR5cGUsIFBpcGVEZWYsIFBpcGVEZWZXaXRoTWV0YX0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuXG5leHBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBXUkFQX1JFTkRFUkVSX0ZBQ1RPUlkyLCBpbmplY3RDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJ9IGZyb20gJy4vY29tcG9uZW50X3JlZic7XG5leHBvcnQge2RpcmVjdGl2ZUluamVjdCwgZ2V0RmFjdG9yeU9mLCBnZXRJbmhlcml0ZWRGYWN0b3J5LCBpbmplY3RBdHRyaWJ1dGUsIGluamVjdFJlbmRlcmVyMn0gZnJvbSAnLi9kaSc7XG5leHBvcnQge1JlbmRlckZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5leHBvcnQge0Nzc1NlbGVjdG9yTGlzdH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Byb2plY3Rpb24nO1xuXG4vLyBjbGFuZy1mb3JtYXQgb2ZmXG5leHBvcnQge1xuXG4gIE5PX0NIQU5HRSxcblxuICBiaW5kLFxuICBpbnRlcnBvbGF0aW9uMSxcbiAgaW50ZXJwb2xhdGlvbjIsXG4gIGludGVycG9sYXRpb24zLFxuICBpbnRlcnBvbGF0aW9uNCxcbiAgaW50ZXJwb2xhdGlvbjUsXG4gIGludGVycG9sYXRpb242LFxuICBpbnRlcnBvbGF0aW9uNyxcbiAgaW50ZXJwb2xhdGlvbjgsXG4gIGludGVycG9sYXRpb25WLFxuXG4gIGNvbnRhaW5lcixcbiAgY29udGFpbmVyUmVmcmVzaFN0YXJ0LFxuICBjb250YWluZXJSZWZyZXNoRW5kLFxuXG4gIG5leHRDb250ZXh0LFxuXG4gIGVsZW1lbnQsXG4gIGVsZW1lbnRBdHRyaWJ1dGUsXG4gIGVsZW1lbnRDbGFzc1Byb3AsXG4gIGVsZW1lbnRFbmQsXG4gIGVsZW1lbnRQcm9wZXJ0eSxcbiAgZWxlbWVudFN0YXJ0LFxuXG4gIGVsZW1lbnRDb250YWluZXJTdGFydCxcbiAgZWxlbWVudENvbnRhaW5lckVuZCxcblxuICBlbGVtZW50U3R5bGluZyxcbiAgZWxlbWVudFN0eWxpbmdNYXAsXG4gIGVsZW1lbnRTdHlsZVByb3AsXG4gIGVsZW1lbnRTdHlsaW5nQXBwbHksXG5cbiAgZ2V0Q3VycmVudFZpZXcsXG4gIHJlc3RvcmVWaWV3LFxuXG4gIGxpc3RlbmVyLFxuICBzdG9yZSxcbiAgbG9hZCxcblxuICBuYW1lc3BhY2VIVE1MLFxuICBuYW1lc3BhY2VNYXRoTUwsXG4gIG5hbWVzcGFjZVNWRyxcblxuICBlbmFibGVCaW5kaW5ncyxcbiAgZGlzYWJsZUJpbmRpbmdzLFxuXG4gIHByb2plY3Rpb24sXG4gIHByb2plY3Rpb25EZWYsXG5cbiAgdGV4dCxcbiAgdGV4dEJpbmRpbmcsXG4gIHRlbXBsYXRlLFxuXG4gIHJlZmVyZW5jZSxcblxuICBlbWJlZGRlZFZpZXdTdGFydCxcbiAgZW1iZWRkZWRWaWV3RW5kLFxuICBkZXRlY3RDaGFuZ2VzLFxuICBtYXJrRGlydHksXG4gIHRpY2ssXG59IGZyb20gJy4vaW5zdHJ1Y3Rpb25zJztcblxuZXhwb3J0IHtcbiAgaTE4bkFwcGx5LFxuICBpMThuTWFwcGluZyxcbiAgaTE4bkludGVycG9sYXRpb24xLFxuICBpMThuSW50ZXJwb2xhdGlvbjIsXG4gIGkxOG5JbnRlcnBvbGF0aW9uMyxcbiAgaTE4bkludGVycG9sYXRpb240LFxuICBpMThuSW50ZXJwb2xhdGlvbjUsXG4gIGkxOG5JbnRlcnBvbGF0aW9uNixcbiAgaTE4bkludGVycG9sYXRpb243LFxuICBpMThuSW50ZXJwb2xhdGlvbjgsXG4gIGkxOG5JbnRlcnBvbGF0aW9uVixcbiAgaTE4bkV4cE1hcHBpbmcsXG4gIEkxOG5JbnN0cnVjdGlvbixcbiAgSTE4bkV4cEluc3RydWN0aW9uXG59IGZyb20gJy4vaTE4bic7XG5cbmV4cG9ydCB7TmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgTmdNb2R1bGVUeXBlfSBmcm9tICcuL25nX21vZHVsZV9yZWYnO1xuXG5leHBvcnQge1xuICAgIEF0dHJpYnV0ZU1hcmtlclxufSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5cbmV4cG9ydCB7XG4gIHBpcGUsXG4gIHBpcGVCaW5kMSxcbiAgcGlwZUJpbmQyLFxuICBwaXBlQmluZDMsXG4gIHBpcGVCaW5kNCxcbiAgcGlwZUJpbmRWLFxufSBmcm9tICcuL3BpcGUnO1xuXG5leHBvcnQge1xuICBRdWVyeUxpc3QsXG4gIHF1ZXJ5LFxuICBxdWVyeVJlZnJlc2gsXG59IGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICB7XG4gIHJlZ2lzdGVyQ29udGVudFF1ZXJ5LFxuICBsb2FkUXVlcnlMaXN0LFxufSBmcm9tICcuL2luc3RydWN0aW9ucyc7XG5cbmV4cG9ydCB7XG4gIHB1cmVGdW5jdGlvbjAsXG4gIHB1cmVGdW5jdGlvbjEsXG4gIHB1cmVGdW5jdGlvbjIsXG4gIHB1cmVGdW5jdGlvbjMsXG4gIHB1cmVGdW5jdGlvbjQsXG4gIHB1cmVGdW5jdGlvbjUsXG4gIHB1cmVGdW5jdGlvbjYsXG4gIHB1cmVGdW5jdGlvbjcsXG4gIHB1cmVGdW5jdGlvbjgsXG4gIHB1cmVGdW5jdGlvblYsXG59IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5cbmV4cG9ydCB7dGVtcGxhdGVSZWZFeHRyYWN0b3J9IGZyb20gJy4vdmlld19lbmdpbmVfY29tcGF0aWJpbGl0eV9wcmVib3VuZCc7XG5cblxuLy8gY2xhbmctZm9ybWF0IG9uXG5cbmV4cG9ydCB7XG4gIEJhc2VEZWYsXG4gIENvbXBvbmVudERlZixcbiAgQ29tcG9uZW50RGVmV2l0aE1ldGEsXG4gIENvbXBvbmVudFRlbXBsYXRlLFxuICBDb21wb25lbnRUeXBlLFxuICBEaXJlY3RpdmVEZWYsXG4gIERpcmVjdGl2ZURlZkZsYWdzLFxuICBEaXJlY3RpdmVEZWZXaXRoTWV0YSxcbiAgRGlyZWN0aXZlVHlwZSxcbiAgTmdPbkNoYW5nZXNGZWF0dXJlLFxuICBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUsXG4gIFB1YmxpY0ZlYXR1cmUsXG4gIFBpcGVEZWYsXG4gIFBpcGVEZWZXaXRoTWV0YSxcbiAgTGlmZWN5Y2xlSG9va3NGZWF0dXJlLFxuICBkZWZpbmVDb21wb25lbnQsXG4gIGRlZmluZURpcmVjdGl2ZSxcbiAgZGVmaW5lTmdNb2R1bGUsXG4gIGRlZmluZUJhc2UsXG4gIGRlZmluZVBpcGUsXG4gIGdldEhvc3RFbGVtZW50LFxuICBnZXRSZW5kZXJlZFRleHQsXG4gIHJlbmRlckNvbXBvbmVudCxcbiAgd2hlblJlbmRlcmVkLFxufTtcbiJdfQ==