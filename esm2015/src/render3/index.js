/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LifecycleHooksFeature, getHostElement, getRenderedText, renderComponent, whenRendered } from './component';
import { defineComponent, defineDirective, defineNgModule, definePipe } from './definition';
import { InheritDefinitionFeature } from './features/inherit_definition_feature';
import { NgOnChangesFeature } from './features/ng_onchanges_feature';
import { PublicFeature } from './features/public_feature';
export { ComponentFactory, ComponentFactoryResolver, ComponentRef } from './component_ref';
export { QUERY_READ_CONTAINER_REF, QUERY_READ_ELEMENT_REF, QUERY_READ_FROM_NODE, QUERY_READ_TEMPLATE_REF, directiveInject, injectAttribute, injectChangeDetectorRef, injectElementRef, injectTemplateRef, injectViewContainerRef } from './di';
export { NO_CHANGE as NC, bind as b, interpolation1 as i1, interpolation2 as i2, interpolation3 as i3, interpolation4 as i4, interpolation5 as i5, interpolation6 as i6, interpolation7 as i7, interpolation8 as i8, interpolationV as iV, container as C, containerRefreshStart as cR, containerRefreshEnd as cr, element as Ee, elementAttribute as a, elementClassProp as cp, elementEnd as e, elementProperty as p, elementStart as E, elementStyling as s, elementStylingMap as sm, elementStyleProp as sp, elementStylingApply as sa, listener as L, store as st, load as ld, loadDirective as d, namespaceHTML as NH, namespaceMathML as NM, namespaceSVG as NS, projection as P, projectionDef as pD, text as T, textBinding as t, reserveSlots as rS, embeddedViewStart as V, embeddedViewEnd as v, detectChanges, markDirty, tick, } from './instructions';
export { i18nApply as iA, i18nMapping as iM, i18nInterpolation as iI, i18nInterpolationV as iIV, i18nExpMapping as iEM } from './i18n';
export { NgModuleFactory, NgModuleRef } from './ng_module_ref';
export { pipe as Pp, pipeBind1 as pb1, pipeBind2 as pb2, pipeBind3 as pb3, pipeBind4 as pb4, pipeBindV as pbV, } from './pipe';
export { QueryList, query as Q, queryRefresh as qR, } from './query';
export { registerContentQuery as Qr, loadQueryList as ql, } from './instructions';
export { pureFunction0 as f0, pureFunction1 as f1, pureFunction2 as f2, pureFunction3 as f3, pureFunction4 as f4, pureFunction5 as f5, pureFunction6 as f6, pureFunction7 as f7, pureFunction8 as f8, pureFunctionV as fV, } from './pure_function';
export { NgOnChangesFeature, InheritDefinitionFeature, PublicFeature, LifecycleHooksFeature, defineComponent, defineDirective, defineNgModule, definePipe, getHostElement, getRenderedText, renderComponent, whenRendered, };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNsSCxPQUFPLEVBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUl4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUUsd0JBQXdCLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekYsT0FBTyxFQUFDLHdCQUF3QixFQUFFLHNCQUFzQixFQUFFLG9CQUFvQixFQUFFLHVCQUF1QixFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFlN08sT0FBTyxFQUVMLFNBQVMsSUFBSSxFQUFFLEVBRWYsSUFBSSxJQUFJLENBQUMsRUFDVCxjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUNwQixjQUFjLElBQUksRUFBRSxFQUVwQixTQUFTLElBQUksQ0FBQyxFQUNkLHFCQUFxQixJQUFJLEVBQUUsRUFDM0IsbUJBQW1CLElBQUksRUFBRSxFQUV6QixPQUFPLElBQUksRUFBRSxFQUNiLGdCQUFnQixJQUFJLENBQUMsRUFDckIsZ0JBQWdCLElBQUksRUFBRSxFQUN0QixVQUFVLElBQUksQ0FBQyxFQUNmLGVBQWUsSUFBSSxDQUFDLEVBQ3BCLFlBQVksSUFBSSxDQUFDLEVBRWpCLGNBQWMsSUFBSSxDQUFDLEVBQ25CLGlCQUFpQixJQUFJLEVBQUUsRUFDdkIsZ0JBQWdCLElBQUksRUFBRSxFQUN0QixtQkFBbUIsSUFBSSxFQUFFLEVBRXpCLFFBQVEsSUFBSSxDQUFDLEVBQ2IsS0FBSyxJQUFJLEVBQUUsRUFDWCxJQUFJLElBQUksRUFBRSxFQUNWLGFBQWEsSUFBSSxDQUFDLEVBRWxCLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGVBQWUsSUFBSSxFQUFFLEVBQ3JCLFlBQVksSUFBSSxFQUFFLEVBRWxCLFVBQVUsSUFBSSxDQUFDLEVBQ2YsYUFBYSxJQUFJLEVBQUUsRUFFbkIsSUFBSSxJQUFJLENBQUMsRUFDVCxXQUFXLElBQUksQ0FBQyxFQUVoQixZQUFZLElBQUksRUFBRSxFQUVsQixpQkFBaUIsSUFBSSxDQUFDLEVBQ3RCLGVBQWUsSUFBSSxDQUFDLEVBQ3BCLGFBQWEsRUFDYixTQUFTLEVBQ1QsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNMLFNBQVMsSUFBSSxFQUFFLEVBQ2YsV0FBVyxJQUFJLEVBQUUsRUFDakIsaUJBQWlCLElBQUksRUFBRSxFQUN2QixrQkFBa0IsSUFBSSxHQUFHLEVBQ3pCLGNBQWMsSUFBSSxHQUFHLEVBR3RCLE1BQU0sUUFBUSxDQUFDO0FBRWhCLE9BQU8sRUFBQyxlQUFlLEVBQUUsV0FBVyxFQUFlLE1BQU0saUJBQWlCLENBQUM7QUFNM0UsT0FBTyxFQUNMLElBQUksSUFBSSxFQUFFLEVBQ1YsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsR0FDakIsTUFBTSxRQUFRLENBQUM7QUFFaEIsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLElBQUksQ0FBQyxFQUNWLFlBQVksSUFBSSxFQUFFLEdBQ25CLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQVEsRUFDTixvQkFBb0IsSUFBSSxFQUFFLEVBQzFCLGFBQWEsSUFBSSxFQUFFLEdBQ3BCLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNMLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGFBQWEsSUFBSSxFQUFFLEdBQ3BCLE1BQU0saUJBQWlCLENBQUM7QUFLekIsT0FBTyxFQVNMLGtCQUFrQixFQUNsQix3QkFBd0IsRUFDeEIsYUFBYSxFQUViLHFCQUFxQixFQUNyQixlQUFlLEVBQ2YsZUFBZSxFQUNmLGNBQWMsRUFDZCxVQUFVLEVBQ1YsY0FBYyxFQUNkLGVBQWUsRUFDZixlQUFlLEVBQ2YsWUFBWSxHQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TGlmZWN5Y2xlSG9va3NGZWF0dXJlLCBnZXRIb3N0RWxlbWVudCwgZ2V0UmVuZGVyZWRUZXh0LCByZW5kZXJDb21wb25lbnQsIHdoZW5SZW5kZXJlZH0gZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IHtkZWZpbmVDb21wb25lbnQsIGRlZmluZURpcmVjdGl2ZSwgZGVmaW5lTmdNb2R1bGUsIGRlZmluZVBpcGV9IGZyb20gJy4vZGVmaW5pdGlvbic7XG5pbXBvcnQge0luaGVyaXREZWZpbml0aW9uRmVhdHVyZX0gZnJvbSAnLi9mZWF0dXJlcy9pbmhlcml0X2RlZmluaXRpb25fZmVhdHVyZSc7XG5pbXBvcnQge05nT25DaGFuZ2VzRmVhdHVyZX0gZnJvbSAnLi9mZWF0dXJlcy9uZ19vbmNoYW5nZXNfZmVhdHVyZSc7XG5pbXBvcnQge1B1YmxpY0ZlYXR1cmV9IGZyb20gJy4vZmVhdHVyZXMvcHVibGljX2ZlYXR1cmUnO1xuaW1wb3J0IHtJMThuRXhwSW5zdHJ1Y3Rpb24sIEkxOG5JbnN0cnVjdGlvbiwgaTE4bkV4cE1hcHBpbmcsIGkxOG5JbnRlcnBvbGF0aW9uLCBpMThuSW50ZXJwb2xhdGlvblZ9IGZyb20gJy4vaTE4bic7XG5pbXBvcnQge0NvbXBvbmVudERlZiwgQ29tcG9uZW50RGVmSW50ZXJuYWwsIENvbXBvbmVudFRlbXBsYXRlLCBDb21wb25lbnRUeXBlLCBEaXJlY3RpdmVEZWYsIERpcmVjdGl2ZURlZkZsYWdzLCBEaXJlY3RpdmVEZWZJbnRlcm5hbCwgRGlyZWN0aXZlVHlwZSwgUGlwZURlZn0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuXG5leHBvcnQge0NvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmfSBmcm9tICcuL2NvbXBvbmVudF9yZWYnO1xuZXhwb3J0IHtRVUVSWV9SRUFEX0NPTlRBSU5FUl9SRUYsIFFVRVJZX1JFQURfRUxFTUVOVF9SRUYsIFFVRVJZX1JFQURfRlJPTV9OT0RFLCBRVUVSWV9SRUFEX1RFTVBMQVRFX1JFRiwgZGlyZWN0aXZlSW5qZWN0LCBpbmplY3RBdHRyaWJ1dGUsIGluamVjdENoYW5nZURldGVjdG9yUmVmLCBpbmplY3RFbGVtZW50UmVmLCBpbmplY3RUZW1wbGF0ZVJlZiwgaW5qZWN0Vmlld0NvbnRhaW5lclJlZn0gZnJvbSAnLi9kaSc7XG5leHBvcnQge1JlbmRlckZsYWdzfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5leHBvcnQge0Nzc1NlbGVjdG9yTGlzdH0gZnJvbSAnLi9pbnRlcmZhY2VzL3Byb2plY3Rpb24nO1xuXG5cblxuLy8gTmFtaW5nIHNjaGVtZTpcbi8vIC0gQ2FwaXRhbCBsZXR0ZXJzIGFyZSBmb3IgY3JlYXRpbmcgdGhpbmdzOiBUKFRleHQpLCBFKEVsZW1lbnQpLCBEKERpcmVjdGl2ZSksIFYoVmlldyksXG4vLyBDKENvbnRhaW5lciksIEwoTGlzdGVuZXIpXG4vLyAtIGxvd2VyIGNhc2UgbGV0dGVycyBhcmUgZm9yIGJpbmRpbmc6IGIoYmluZClcbi8vIC0gbG93ZXIgY2FzZSBsZXR0ZXJzIGFyZSBmb3IgYmluZGluZyB0YXJnZXQ6IHAocHJvcGVydHkpLCBhKGF0dHJpYnV0ZSksIGsoY2xhc3MpLCBzKHN0eWxlKSxcbi8vIGkoaW5wdXQpXG4vLyAtIGxvd2VyIGNhc2UgbGV0dGVycyBmb3IgZ3VhcmRpbmcgbGlmZSBjeWNsZSBob29rczogbChsaWZlQ3ljbGUpXG4vLyAtIGxvd2VyIGNhc2UgZm9yIGNsb3Npbmc6IGMoY29udGFpbmVyRW5kKSwgZShlbGVtZW50RW5kKSwgdih2aWV3RW5kKVxuLy8gY2xhbmctZm9ybWF0IG9mZlxuZXhwb3J0IHtcblxuICBOT19DSEFOR0UgYXMgTkMsXG5cbiAgYmluZCBhcyBiLFxuICBpbnRlcnBvbGF0aW9uMSBhcyBpMSxcbiAgaW50ZXJwb2xhdGlvbjIgYXMgaTIsXG4gIGludGVycG9sYXRpb24zIGFzIGkzLFxuICBpbnRlcnBvbGF0aW9uNCBhcyBpNCxcbiAgaW50ZXJwb2xhdGlvbjUgYXMgaTUsXG4gIGludGVycG9sYXRpb242IGFzIGk2LFxuICBpbnRlcnBvbGF0aW9uNyBhcyBpNyxcbiAgaW50ZXJwb2xhdGlvbjggYXMgaTgsXG4gIGludGVycG9sYXRpb25WIGFzIGlWLFxuXG4gIGNvbnRhaW5lciBhcyBDLFxuICBjb250YWluZXJSZWZyZXNoU3RhcnQgYXMgY1IsXG4gIGNvbnRhaW5lclJlZnJlc2hFbmQgYXMgY3IsXG5cbiAgZWxlbWVudCBhcyBFZSxcbiAgZWxlbWVudEF0dHJpYnV0ZSBhcyBhLFxuICBlbGVtZW50Q2xhc3NQcm9wIGFzIGNwLFxuICBlbGVtZW50RW5kIGFzIGUsXG4gIGVsZW1lbnRQcm9wZXJ0eSBhcyBwLFxuICBlbGVtZW50U3RhcnQgYXMgRSxcblxuICBlbGVtZW50U3R5bGluZyBhcyBzLFxuICBlbGVtZW50U3R5bGluZ01hcCBhcyBzbSxcbiAgZWxlbWVudFN0eWxlUHJvcCBhcyBzcCxcbiAgZWxlbWVudFN0eWxpbmdBcHBseSBhcyBzYSxcblxuICBsaXN0ZW5lciBhcyBMLFxuICBzdG9yZSBhcyBzdCxcbiAgbG9hZCBhcyBsZCxcbiAgbG9hZERpcmVjdGl2ZSBhcyBkLFxuXG4gIG5hbWVzcGFjZUhUTUwgYXMgTkgsXG4gIG5hbWVzcGFjZU1hdGhNTCBhcyBOTSxcbiAgbmFtZXNwYWNlU1ZHIGFzIE5TLFxuXG4gIHByb2plY3Rpb24gYXMgUCxcbiAgcHJvamVjdGlvbkRlZiBhcyBwRCxcblxuICB0ZXh0IGFzIFQsXG4gIHRleHRCaW5kaW5nIGFzIHQsXG5cbiAgcmVzZXJ2ZVNsb3RzIGFzIHJTLFxuXG4gIGVtYmVkZGVkVmlld1N0YXJ0IGFzIFYsXG4gIGVtYmVkZGVkVmlld0VuZCBhcyB2LFxuICBkZXRlY3RDaGFuZ2VzLFxuICBtYXJrRGlydHksXG4gIHRpY2ssXG59IGZyb20gJy4vaW5zdHJ1Y3Rpb25zJztcblxuZXhwb3J0IHtcbiAgaTE4bkFwcGx5IGFzIGlBLFxuICBpMThuTWFwcGluZyBhcyBpTSxcbiAgaTE4bkludGVycG9sYXRpb24gYXMgaUksXG4gIGkxOG5JbnRlcnBvbGF0aW9uViBhcyBpSVYsXG4gIGkxOG5FeHBNYXBwaW5nIGFzIGlFTSxcbiAgSTE4bkluc3RydWN0aW9uLFxuICBJMThuRXhwSW5zdHJ1Y3Rpb25cbn0gZnJvbSAnLi9pMThuJztcblxuZXhwb3J0IHtOZ01vZHVsZUZhY3RvcnksIE5nTW9kdWxlUmVmLCBOZ01vZHVsZVR5cGV9IGZyb20gJy4vbmdfbW9kdWxlX3JlZic7XG5cbmV4cG9ydCB7XG4gICAgQXR0cmlidXRlTWFya2VyXG59IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcblxuZXhwb3J0IHtcbiAgcGlwZSBhcyBQcCxcbiAgcGlwZUJpbmQxIGFzIHBiMSxcbiAgcGlwZUJpbmQyIGFzIHBiMixcbiAgcGlwZUJpbmQzIGFzIHBiMyxcbiAgcGlwZUJpbmQ0IGFzIHBiNCxcbiAgcGlwZUJpbmRWIGFzIHBiVixcbn0gZnJvbSAnLi9waXBlJztcblxuZXhwb3J0IHtcbiAgUXVlcnlMaXN0LFxuICBxdWVyeSBhcyBRLFxuICBxdWVyeVJlZnJlc2ggYXMgcVIsXG59IGZyb20gJy4vcXVlcnknO1xuZXhwb3J0ICB7XG4gIHJlZ2lzdGVyQ29udGVudFF1ZXJ5IGFzIFFyLFxuICBsb2FkUXVlcnlMaXN0IGFzIHFsLFxufSBmcm9tICcuL2luc3RydWN0aW9ucyc7XG5cbmV4cG9ydCB7XG4gIHB1cmVGdW5jdGlvbjAgYXMgZjAsXG4gIHB1cmVGdW5jdGlvbjEgYXMgZjEsXG4gIHB1cmVGdW5jdGlvbjIgYXMgZjIsXG4gIHB1cmVGdW5jdGlvbjMgYXMgZjMsXG4gIHB1cmVGdW5jdGlvbjQgYXMgZjQsXG4gIHB1cmVGdW5jdGlvbjUgYXMgZjUsXG4gIHB1cmVGdW5jdGlvbjYgYXMgZjYsXG4gIHB1cmVGdW5jdGlvbjcgYXMgZjcsXG4gIHB1cmVGdW5jdGlvbjggYXMgZjgsXG4gIHB1cmVGdW5jdGlvblYgYXMgZlYsXG59IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5cblxuLy8gY2xhbmctZm9ybWF0IG9uXG5cbmV4cG9ydCB7XG4gIENvbXBvbmVudERlZixcbiAgQ29tcG9uZW50RGVmSW50ZXJuYWwsXG4gIENvbXBvbmVudFRlbXBsYXRlLFxuICBDb21wb25lbnRUeXBlLFxuICBEaXJlY3RpdmVEZWYsXG4gIERpcmVjdGl2ZURlZkZsYWdzLFxuICBEaXJlY3RpdmVEZWZJbnRlcm5hbCxcbiAgRGlyZWN0aXZlVHlwZSxcbiAgTmdPbkNoYW5nZXNGZWF0dXJlLFxuICBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUsXG4gIFB1YmxpY0ZlYXR1cmUsXG4gIFBpcGVEZWYsXG4gIExpZmVjeWNsZUhvb2tzRmVhdHVyZSxcbiAgZGVmaW5lQ29tcG9uZW50LFxuICBkZWZpbmVEaXJlY3RpdmUsXG4gIGRlZmluZU5nTW9kdWxlLFxuICBkZWZpbmVQaXBlLFxuICBnZXRIb3N0RWxlbWVudCxcbiAgZ2V0UmVuZGVyZWRUZXh0LFxuICByZW5kZXJDb21wb25lbnQsXG4gIHdoZW5SZW5kZXJlZCxcbn07XG4iXX0=