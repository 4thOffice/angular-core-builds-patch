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
// Naming scheme:
// - Capital letters are for creating things: T(Text), E(Element), D(Directive), V(View),
// C(Container), L(Listener)
// - lower case letters are for binding: b(bind)
// - lower case letters are for binding target: p(property), a(attribute), k(class), s(style),
// i(input)
// - lower case letters for guarding life cycle hooks: l(lifeCycle)
// - lower case for closing: c(containerEnd), e(elementEnd), v(viewEnd)
// clang-format off
export { NO_CHANGE as NC, bind as b, interpolation1 as i1, interpolation2 as i2, interpolation3 as i3, interpolation4 as i4, interpolation5 as i5, interpolation6 as i6, interpolation7 as i7, interpolation8 as i8, interpolationV as iV, container as C, containerRefreshStart as cR, containerRefreshEnd as cr, element as Ee, elementAttribute as a, elementClass as k, elementClassNamed as kn, elementEnd as e, elementProperty as p, elementStart as E, elementStyle as s, elementStyleNamed as sn, listener as L, store as st, load as ld, loadDirective as d, namespaceHTML as NH, namespaceMathML as NM, namespaceSVG as NS, projection as P, projectionDef as pD, text as T, textBinding as t, reserveSlots as rS, embeddedViewStart as V, embeddedViewEnd as v, detectChanges, markDirty, tick, } from './instructions';
export { i18nApply as iA, i18nMapping as iM, i18nInterpolation as iI, i18nInterpolationV as iIV, i18nExpMapping as iEM } from './i18n';
export { NgModuleFactory, NgModuleRef } from './ng_module_ref';
export { pipe as Pp, pipeBind1 as pb1, pipeBind2 as pb2, pipeBind3 as pb3, pipeBind4 as pb4, pipeBindV as pbV, } from './pipe';
export { QueryList, query as Q, queryRefresh as qR, } from './query';
export { pureFunction0 as f0, pureFunction1 as f1, pureFunction2 as f2, pureFunction3 as f3, pureFunction4 as f4, pureFunction5 as f5, pureFunction6 as f6, pureFunction7 as f7, pureFunction8 as f8, pureFunctionV as fV, } from './pure_function';
// clang-format on
export { NgOnChangesFeature, InheritDefinitionFeature, PublicFeature, LifecycleHooksFeature, defineComponent, defineDirective, defineNgModule, definePipe, getHostElement, getRenderedText, renderComponent, whenRendered, };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDbEgsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUMxRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFJeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFFLHdCQUF3QixFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pGLE9BQU8sRUFBQyx3QkFBd0IsRUFBRSxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUIsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixFQUFDLE1BQU0sTUFBTSxDQUFDO0FBTTdPLGlCQUFpQjtBQUNqQix5RkFBeUY7QUFDekYsNEJBQTRCO0FBQzVCLGdEQUFnRDtBQUNoRCw4RkFBOEY7QUFDOUYsV0FBVztBQUNYLG1FQUFtRTtBQUNuRSx1RUFBdUU7QUFDdkUsbUJBQW1CO0FBQ25CLE9BQU8sRUFFTCxTQUFTLElBQUksRUFBRSxFQUVmLElBQUksSUFBSSxDQUFDLEVBQ1QsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFDcEIsY0FBYyxJQUFJLEVBQUUsRUFFcEIsU0FBUyxJQUFJLENBQUMsRUFDZCxxQkFBcUIsSUFBSSxFQUFFLEVBQzNCLG1CQUFtQixJQUFJLEVBQUUsRUFFekIsT0FBTyxJQUFJLEVBQUUsRUFDYixnQkFBZ0IsSUFBSSxDQUFDLEVBQ3JCLFlBQVksSUFBSSxDQUFDLEVBQ2pCLGlCQUFpQixJQUFJLEVBQUUsRUFDdkIsVUFBVSxJQUFJLENBQUMsRUFDZixlQUFlLElBQUksQ0FBQyxFQUNwQixZQUFZLElBQUksQ0FBQyxFQUNqQixZQUFZLElBQUksQ0FBQyxFQUNqQixpQkFBaUIsSUFBSSxFQUFFLEVBRXZCLFFBQVEsSUFBSSxDQUFDLEVBQ2IsS0FBSyxJQUFJLEVBQUUsRUFDWCxJQUFJLElBQUksRUFBRSxFQUNWLGFBQWEsSUFBSSxDQUFDLEVBRWxCLGFBQWEsSUFBSSxFQUFFLEVBQ25CLGVBQWUsSUFBSSxFQUFFLEVBQ3JCLFlBQVksSUFBSSxFQUFFLEVBRWxCLFVBQVUsSUFBSSxDQUFDLEVBQ2YsYUFBYSxJQUFJLEVBQUUsRUFFbkIsSUFBSSxJQUFJLENBQUMsRUFDVCxXQUFXLElBQUksQ0FBQyxFQUVoQixZQUFZLElBQUksRUFBRSxFQUVsQixpQkFBaUIsSUFBSSxDQUFDLEVBQ3RCLGVBQWUsSUFBSSxDQUFDLEVBQ3BCLGFBQWEsRUFDYixTQUFTLEVBQ1QsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNMLFNBQVMsSUFBSSxFQUFFLEVBQ2YsV0FBVyxJQUFJLEVBQUUsRUFDakIsaUJBQWlCLElBQUksRUFBRSxFQUN2QixrQkFBa0IsSUFBSSxHQUFHLEVBQ3pCLGNBQWMsSUFBSSxHQUFHLEVBR3RCLE1BQU0sUUFBUSxDQUFDO0FBRWhCLE9BQU8sRUFBYyxlQUFlLEVBQUUsV0FBVyxFQUFlLE1BQU0saUJBQWlCLENBQUM7QUFNeEYsT0FBTyxFQUNMLElBQUksSUFBSSxFQUFFLEVBQ1YsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsRUFDaEIsU0FBUyxJQUFJLEdBQUcsR0FDakIsTUFBTSxRQUFRLENBQUM7QUFFaEIsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLElBQUksQ0FBQyxFQUNWLFlBQVksSUFBSSxFQUFFLEdBQ25CLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQU8sRUFDTCxhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxFQUNuQixhQUFhLElBQUksRUFBRSxHQUNwQixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLGtCQUFrQjtBQUVsQixPQUFPLEVBU0wsa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixhQUFhLEVBRWIscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixlQUFlLEVBQ2YsY0FBYyxFQUNkLFVBQVUsRUFDVixjQUFjLEVBQ2QsZUFBZSxFQUNmLGVBQWUsRUFDZixZQUFZLEdBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMaWZlY3ljbGVIb29rc0ZlYXR1cmUsIGdldEhvc3RFbGVtZW50LCBnZXRSZW5kZXJlZFRleHQsIHJlbmRlckNvbXBvbmVudCwgd2hlblJlbmRlcmVkfSBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQge2RlZmluZUNvbXBvbmVudCwgZGVmaW5lRGlyZWN0aXZlLCBkZWZpbmVOZ01vZHVsZSwgZGVmaW5lUGlwZX0gZnJvbSAnLi9kZWZpbml0aW9uJztcbmltcG9ydCB7SW5oZXJpdERlZmluaXRpb25GZWF0dXJlfSBmcm9tICcuL2ZlYXR1cmVzL2luaGVyaXRfZGVmaW5pdGlvbl9mZWF0dXJlJztcbmltcG9ydCB7TmdPbkNoYW5nZXNGZWF0dXJlfSBmcm9tICcuL2ZlYXR1cmVzL25nX29uY2hhbmdlc19mZWF0dXJlJztcbmltcG9ydCB7UHVibGljRmVhdHVyZX0gZnJvbSAnLi9mZWF0dXJlcy9wdWJsaWNfZmVhdHVyZSc7XG5pbXBvcnQge0kxOG5FeHBJbnN0cnVjdGlvbiwgSTE4bkluc3RydWN0aW9uLCBpMThuRXhwTWFwcGluZywgaTE4bkludGVycG9sYXRpb24sIGkxOG5JbnRlcnBvbGF0aW9uVn0gZnJvbSAnLi9pMThuJztcbmltcG9ydCB7Q29tcG9uZW50RGVmLCBDb21wb25lbnREZWZJbnRlcm5hbCwgQ29tcG9uZW50VGVtcGxhdGUsIENvbXBvbmVudFR5cGUsIERpcmVjdGl2ZURlZiwgRGlyZWN0aXZlRGVmRmxhZ3MsIERpcmVjdGl2ZURlZkludGVybmFsLCBEaXJlY3RpdmVUeXBlLCBQaXBlRGVmfSBmcm9tICcuL2ludGVyZmFjZXMvZGVmaW5pdGlvbic7XG5cbmV4cG9ydCB7Q29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWZ9IGZyb20gJy4vY29tcG9uZW50X3JlZic7XG5leHBvcnQge1FVRVJZX1JFQURfQ09OVEFJTkVSX1JFRiwgUVVFUllfUkVBRF9FTEVNRU5UX1JFRiwgUVVFUllfUkVBRF9GUk9NX05PREUsIFFVRVJZX1JFQURfVEVNUExBVEVfUkVGLCBkaXJlY3RpdmVJbmplY3QsIGluamVjdEF0dHJpYnV0ZSwgaW5qZWN0Q2hhbmdlRGV0ZWN0b3JSZWYsIGluamVjdEVsZW1lbnRSZWYsIGluamVjdFRlbXBsYXRlUmVmLCBpbmplY3RWaWV3Q29udGFpbmVyUmVmfSBmcm9tICcuL2RpJztcbmV4cG9ydCB7UmVuZGVyRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmV4cG9ydCB7Q3NzU2VsZWN0b3JMaXN0fSBmcm9tICcuL2ludGVyZmFjZXMvcHJvamVjdGlvbic7XG5cblxuXG4vLyBOYW1pbmcgc2NoZW1lOlxuLy8gLSBDYXBpdGFsIGxldHRlcnMgYXJlIGZvciBjcmVhdGluZyB0aGluZ3M6IFQoVGV4dCksIEUoRWxlbWVudCksIEQoRGlyZWN0aXZlKSwgVihWaWV3KSxcbi8vIEMoQ29udGFpbmVyKSwgTChMaXN0ZW5lcilcbi8vIC0gbG93ZXIgY2FzZSBsZXR0ZXJzIGFyZSBmb3IgYmluZGluZzogYihiaW5kKVxuLy8gLSBsb3dlciBjYXNlIGxldHRlcnMgYXJlIGZvciBiaW5kaW5nIHRhcmdldDogcChwcm9wZXJ0eSksIGEoYXR0cmlidXRlKSwgayhjbGFzcyksIHMoc3R5bGUpLFxuLy8gaShpbnB1dClcbi8vIC0gbG93ZXIgY2FzZSBsZXR0ZXJzIGZvciBndWFyZGluZyBsaWZlIGN5Y2xlIGhvb2tzOiBsKGxpZmVDeWNsZSlcbi8vIC0gbG93ZXIgY2FzZSBmb3IgY2xvc2luZzogYyhjb250YWluZXJFbmQpLCBlKGVsZW1lbnRFbmQpLCB2KHZpZXdFbmQpXG4vLyBjbGFuZy1mb3JtYXQgb2ZmXG5leHBvcnQge1xuXG4gIE5PX0NIQU5HRSBhcyBOQyxcblxuICBiaW5kIGFzIGIsXG4gIGludGVycG9sYXRpb24xIGFzIGkxLFxuICBpbnRlcnBvbGF0aW9uMiBhcyBpMixcbiAgaW50ZXJwb2xhdGlvbjMgYXMgaTMsXG4gIGludGVycG9sYXRpb240IGFzIGk0LFxuICBpbnRlcnBvbGF0aW9uNSBhcyBpNSxcbiAgaW50ZXJwb2xhdGlvbjYgYXMgaTYsXG4gIGludGVycG9sYXRpb243IGFzIGk3LFxuICBpbnRlcnBvbGF0aW9uOCBhcyBpOCxcbiAgaW50ZXJwb2xhdGlvblYgYXMgaVYsXG5cbiAgY29udGFpbmVyIGFzIEMsXG4gIGNvbnRhaW5lclJlZnJlc2hTdGFydCBhcyBjUixcbiAgY29udGFpbmVyUmVmcmVzaEVuZCBhcyBjcixcblxuICBlbGVtZW50IGFzIEVlLFxuICBlbGVtZW50QXR0cmlidXRlIGFzIGEsXG4gIGVsZW1lbnRDbGFzcyBhcyBrLFxuICBlbGVtZW50Q2xhc3NOYW1lZCBhcyBrbixcbiAgZWxlbWVudEVuZCBhcyBlLFxuICBlbGVtZW50UHJvcGVydHkgYXMgcCxcbiAgZWxlbWVudFN0YXJ0IGFzIEUsXG4gIGVsZW1lbnRTdHlsZSBhcyBzLFxuICBlbGVtZW50U3R5bGVOYW1lZCBhcyBzbixcblxuICBsaXN0ZW5lciBhcyBMLFxuICBzdG9yZSBhcyBzdCxcbiAgbG9hZCBhcyBsZCxcbiAgbG9hZERpcmVjdGl2ZSBhcyBkLFxuXG4gIG5hbWVzcGFjZUhUTUwgYXMgTkgsXG4gIG5hbWVzcGFjZU1hdGhNTCBhcyBOTSxcbiAgbmFtZXNwYWNlU1ZHIGFzIE5TLFxuXG4gIHByb2plY3Rpb24gYXMgUCxcbiAgcHJvamVjdGlvbkRlZiBhcyBwRCxcblxuICB0ZXh0IGFzIFQsXG4gIHRleHRCaW5kaW5nIGFzIHQsXG5cbiAgcmVzZXJ2ZVNsb3RzIGFzIHJTLFxuXG4gIGVtYmVkZGVkVmlld1N0YXJ0IGFzIFYsXG4gIGVtYmVkZGVkVmlld0VuZCBhcyB2LFxuICBkZXRlY3RDaGFuZ2VzLFxuICBtYXJrRGlydHksXG4gIHRpY2ssXG59IGZyb20gJy4vaW5zdHJ1Y3Rpb25zJztcblxuZXhwb3J0IHtcbiAgaTE4bkFwcGx5IGFzIGlBLFxuICBpMThuTWFwcGluZyBhcyBpTSxcbiAgaTE4bkludGVycG9sYXRpb24gYXMgaUksXG4gIGkxOG5JbnRlcnBvbGF0aW9uViBhcyBpSVYsXG4gIGkxOG5FeHBNYXBwaW5nIGFzIGlFTSxcbiAgSTE4bkluc3RydWN0aW9uLFxuICBJMThuRXhwSW5zdHJ1Y3Rpb25cbn0gZnJvbSAnLi9pMThuJztcblxuZXhwb3J0IHtOZ01vZHVsZURlZiwgTmdNb2R1bGVGYWN0b3J5LCBOZ01vZHVsZVJlZiwgTmdNb2R1bGVUeXBlfSBmcm9tICcuL25nX21vZHVsZV9yZWYnO1xuXG5leHBvcnQge1xuICAgIEF0dHJpYnV0ZU1hcmtlclxufSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5cbmV4cG9ydCB7XG4gIHBpcGUgYXMgUHAsXG4gIHBpcGVCaW5kMSBhcyBwYjEsXG4gIHBpcGVCaW5kMiBhcyBwYjIsXG4gIHBpcGVCaW5kMyBhcyBwYjMsXG4gIHBpcGVCaW5kNCBhcyBwYjQsXG4gIHBpcGVCaW5kViBhcyBwYlYsXG59IGZyb20gJy4vcGlwZSc7XG5cbmV4cG9ydCB7XG4gIFF1ZXJ5TGlzdCxcbiAgcXVlcnkgYXMgUSxcbiAgcXVlcnlSZWZyZXNoIGFzIHFSLFxufSBmcm9tICcuL3F1ZXJ5JztcbmV4cG9ydCB7XG4gIHB1cmVGdW5jdGlvbjAgYXMgZjAsXG4gIHB1cmVGdW5jdGlvbjEgYXMgZjEsXG4gIHB1cmVGdW5jdGlvbjIgYXMgZjIsXG4gIHB1cmVGdW5jdGlvbjMgYXMgZjMsXG4gIHB1cmVGdW5jdGlvbjQgYXMgZjQsXG4gIHB1cmVGdW5jdGlvbjUgYXMgZjUsXG4gIHB1cmVGdW5jdGlvbjYgYXMgZjYsXG4gIHB1cmVGdW5jdGlvbjcgYXMgZjcsXG4gIHB1cmVGdW5jdGlvbjggYXMgZjgsXG4gIHB1cmVGdW5jdGlvblYgYXMgZlYsXG59IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5cblxuLy8gY2xhbmctZm9ybWF0IG9uXG5cbmV4cG9ydCB7XG4gIENvbXBvbmVudERlZixcbiAgQ29tcG9uZW50RGVmSW50ZXJuYWwsXG4gIENvbXBvbmVudFRlbXBsYXRlLFxuICBDb21wb25lbnRUeXBlLFxuICBEaXJlY3RpdmVEZWYsXG4gIERpcmVjdGl2ZURlZkZsYWdzLFxuICBEaXJlY3RpdmVEZWZJbnRlcm5hbCxcbiAgRGlyZWN0aXZlVHlwZSxcbiAgTmdPbkNoYW5nZXNGZWF0dXJlLFxuICBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUsXG4gIFB1YmxpY0ZlYXR1cmUsXG4gIFBpcGVEZWYsXG4gIExpZmVjeWNsZUhvb2tzRmVhdHVyZSxcbiAgZGVmaW5lQ29tcG9uZW50LFxuICBkZWZpbmVEaXJlY3RpdmUsXG4gIGRlZmluZU5nTW9kdWxlLFxuICBkZWZpbmVQaXBlLFxuICBnZXRIb3N0RWxlbWVudCxcbiAgZ2V0UmVuZGVyZWRUZXh0LFxuICByZW5kZXJDb21wb25lbnQsXG4gIHdoZW5SZW5kZXJlZCxcbn07XG4iXX0=