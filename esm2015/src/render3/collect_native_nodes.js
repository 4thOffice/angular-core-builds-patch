/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined } from '../util/assert';
import { icuContainerIterate } from './i18n/i18n_tree_shaking';
import { CONTAINER_HEADER_OFFSET } from './interfaces/container';
import { isLContainer } from './interfaces/type_checks';
import { DECLARATION_COMPONENT_VIEW, T_HOST, TVIEW } from './interfaces/view';
import { assertTNodeType } from './node_assert';
import { getLViewParent } from './util/view_traversal_utils';
import { unwrapRNode } from './util/view_utils';
export function collectNativeNodes(tView, lView, tNode, result, isProjection = false) {
    while (tNode !== null) {
        ngDevMode &&
            assertTNodeType(tNode, 3 /* AnyRNode */ | 12 /* AnyContainer */ | 16 /* Projection */ | 32 /* Icu */);
        const lNode = lView[tNode.index];
        if (lNode !== null) {
            result.push(unwrapRNode(lNode));
        }
        // A given lNode can represent either a native node or a LContainer (when it is a host of a
        // ViewContainerRef). When we find a LContainer we need to descend into it to collect root nodes
        // from the views in this container.
        if (isLContainer(lNode)) {
            for (let i = CONTAINER_HEADER_OFFSET; i < lNode.length; i++) {
                const lViewInAContainer = lNode[i];
                const lViewFirstChildTNode = lViewInAContainer[TVIEW].firstChild;
                if (lViewFirstChildTNode !== null) {
                    collectNativeNodes(lViewInAContainer[TVIEW], lViewInAContainer, lViewFirstChildTNode, result);
                }
            }
        }
        const tNodeType = tNode.type;
        if (tNodeType & 8 /* ElementContainer */) {
            collectNativeNodes(tView, lView, tNode.child, result);
        }
        else if (tNodeType & 32 /* Icu */) {
            const nextRNode = icuContainerIterate(tNode, lView);
            let rNode;
            while (rNode = nextRNode()) {
                result.push(rNode);
            }
        }
        else if (tNodeType & 16 /* Projection */) {
            const componentView = lView[DECLARATION_COMPONENT_VIEW];
            const componentHost = componentView[T_HOST];
            const slotIdx = tNode.projection;
            ngDevMode &&
                assertDefined(componentHost.projection, 'Components with projection nodes (<ng-content>) must have projection slots defined.');
            const nodesInSlot = componentHost.projection[slotIdx];
            if (Array.isArray(nodesInSlot)) {
                result.push(...nodesInSlot);
            }
            else {
                const parentView = getLViewParent(componentView);
                ngDevMode &&
                    assertDefined(parentView, 'Component views should always have a parent view (component\'s host view)');
                collectNativeNodes(parentView[TVIEW], parentView, nodesInSlot, result, true);
            }
        }
        tNode = isProjection ? tNode.projectionNext : tNode.next;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdF9uYXRpdmVfbm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2NvbGxlY3RfbmF0aXZlX25vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUcvRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLDBCQUEwQixFQUFTLE1BQU0sRUFBRSxLQUFLLEVBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFJOUMsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixLQUFZLEVBQUUsS0FBWSxFQUFFLEtBQWlCLEVBQUUsTUFBYSxFQUM1RCxlQUF3QixLQUFLO0lBQy9CLE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRTtRQUNyQixTQUFTO1lBQ0wsZUFBZSxDQUNYLEtBQUssRUFDTCx3Q0FBMkMsc0JBQXVCLGVBQWdCLENBQUMsQ0FBQztRQUU1RixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsMkZBQTJGO1FBQzNGLGdHQUFnRztRQUNoRyxvQ0FBb0M7UUFDcEMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyx1QkFBdUIsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sb0JBQW9CLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUNqRSxJQUFJLG9CQUFvQixLQUFLLElBQUksRUFBRTtvQkFDakMsa0JBQWtCLENBQ2QsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ2hGO2FBQ0Y7U0FDRjtRQUVELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxTQUFTLDJCQUE2QixFQUFFO1lBQzFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN2RDthQUFNLElBQUksU0FBUyxlQUFnQixFQUFFO1lBQ3BDLE1BQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDLEtBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekUsSUFBSSxLQUFpQixDQUFDO1lBQ3RCLE9BQU8sS0FBSyxHQUFHLFNBQVMsRUFBRSxFQUFFO2dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO1NBQ0Y7YUFBTSxJQUFJLFNBQVMsc0JBQXVCLEVBQUU7WUFDM0MsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDeEQsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBaUIsQ0FBQztZQUM1RCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsVUFBb0IsQ0FBQztZQUMzQyxTQUFTO2dCQUNMLGFBQWEsQ0FDVCxhQUFhLENBQUMsVUFBVSxFQUN4QixxRkFBcUYsQ0FBQyxDQUFDO1lBRS9GLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxVQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBRSxDQUFDO2dCQUNsRCxTQUFTO29CQUNMLGFBQWEsQ0FDVCxVQUFVLEVBQ1YsMkVBQTJFLENBQUMsQ0FBQztnQkFDckYsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlFO1NBQ0Y7UUFDRCxLQUFLLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0tBQzFEO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWR9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHtpY3VDb250YWluZXJJdGVyYXRlfSBmcm9tICcuL2kxOG4vaTE4bl90cmVlX3NoYWtpbmcnO1xuaW1wb3J0IHtDT05UQUlORVJfSEVBREVSX09GRlNFVH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbnRhaW5lcic7XG5pbXBvcnQge1RFbGVtZW50Tm9kZSwgVEljdUNvbnRhaW5lck5vZGUsIFROb2RlLCBUTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7Uk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9yZW5kZXJlcl9kb20nO1xuaW1wb3J0IHtpc0xDb250YWluZXJ9IGZyb20gJy4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0RFQ0xBUkFUSU9OX0NPTVBPTkVOVF9WSUVXLCBMVmlldywgVF9IT1NULCBUVklFVywgVFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7YXNzZXJ0VE5vZGVUeXBlfSBmcm9tICcuL25vZGVfYXNzZXJ0JztcbmltcG9ydCB7Z2V0TFZpZXdQYXJlbnR9IGZyb20gJy4vdXRpbC92aWV3X3RyYXZlcnNhbF91dGlscyc7XG5pbXBvcnQge3Vud3JhcFJOb2RlfSBmcm9tICcuL3V0aWwvdmlld191dGlscyc7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdE5hdGl2ZU5vZGVzKFxuICAgIHRWaWV3OiBUVmlldywgbFZpZXc6IExWaWV3LCB0Tm9kZTogVE5vZGV8bnVsbCwgcmVzdWx0OiBhbnlbXSxcbiAgICBpc1Byb2plY3Rpb246IGJvb2xlYW4gPSBmYWxzZSk6IGFueVtdIHtcbiAgd2hpbGUgKHROb2RlICE9PSBudWxsKSB7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIGFzc2VydFROb2RlVHlwZShcbiAgICAgICAgICAgIHROb2RlLFxuICAgICAgICAgICAgVE5vZGVUeXBlLkFueVJOb2RlIHwgVE5vZGVUeXBlLkFueUNvbnRhaW5lciB8IFROb2RlVHlwZS5Qcm9qZWN0aW9uIHwgVE5vZGVUeXBlLkljdSk7XG5cbiAgICBjb25zdCBsTm9kZSA9IGxWaWV3W3ROb2RlLmluZGV4XTtcbiAgICBpZiAobE5vZGUgIT09IG51bGwpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHVud3JhcFJOb2RlKGxOb2RlKSk7XG4gICAgfVxuXG4gICAgLy8gQSBnaXZlbiBsTm9kZSBjYW4gcmVwcmVzZW50IGVpdGhlciBhIG5hdGl2ZSBub2RlIG9yIGEgTENvbnRhaW5lciAod2hlbiBpdCBpcyBhIGhvc3Qgb2YgYVxuICAgIC8vIFZpZXdDb250YWluZXJSZWYpLiBXaGVuIHdlIGZpbmQgYSBMQ29udGFpbmVyIHdlIG5lZWQgdG8gZGVzY2VuZCBpbnRvIGl0IHRvIGNvbGxlY3Qgcm9vdCBub2Rlc1xuICAgIC8vIGZyb20gdGhlIHZpZXdzIGluIHRoaXMgY29udGFpbmVyLlxuICAgIGlmIChpc0xDb250YWluZXIobE5vZGUpKSB7XG4gICAgICBmb3IgKGxldCBpID0gQ09OVEFJTkVSX0hFQURFUl9PRkZTRVQ7IGkgPCBsTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBsVmlld0luQUNvbnRhaW5lciA9IGxOb2RlW2ldO1xuICAgICAgICBjb25zdCBsVmlld0ZpcnN0Q2hpbGRUTm9kZSA9IGxWaWV3SW5BQ29udGFpbmVyW1RWSUVXXS5maXJzdENoaWxkO1xuICAgICAgICBpZiAobFZpZXdGaXJzdENoaWxkVE5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgICBjb2xsZWN0TmF0aXZlTm9kZXMoXG4gICAgICAgICAgICAgIGxWaWV3SW5BQ29udGFpbmVyW1RWSUVXXSwgbFZpZXdJbkFDb250YWluZXIsIGxWaWV3Rmlyc3RDaGlsZFROb2RlLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdE5vZGVUeXBlID0gdE5vZGUudHlwZTtcbiAgICBpZiAodE5vZGVUeXBlICYgVE5vZGVUeXBlLkVsZW1lbnRDb250YWluZXIpIHtcbiAgICAgIGNvbGxlY3ROYXRpdmVOb2Rlcyh0VmlldywgbFZpZXcsIHROb2RlLmNoaWxkLCByZXN1bHQpO1xuICAgIH0gZWxzZSBpZiAodE5vZGVUeXBlICYgVE5vZGVUeXBlLkljdSkge1xuICAgICAgY29uc3QgbmV4dFJOb2RlID0gaWN1Q29udGFpbmVySXRlcmF0ZSh0Tm9kZSBhcyBUSWN1Q29udGFpbmVyTm9kZSwgbFZpZXcpO1xuICAgICAgbGV0IHJOb2RlOiBSTm9kZXxudWxsO1xuICAgICAgd2hpbGUgKHJOb2RlID0gbmV4dFJOb2RlKCkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gock5vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodE5vZGVUeXBlICYgVE5vZGVUeXBlLlByb2plY3Rpb24pIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFZpZXcgPSBsVmlld1tERUNMQVJBVElPTl9DT01QT05FTlRfVklFV107XG4gICAgICBjb25zdCBjb21wb25lbnRIb3N0ID0gY29tcG9uZW50Vmlld1tUX0hPU1RdIGFzIFRFbGVtZW50Tm9kZTtcbiAgICAgIGNvbnN0IHNsb3RJZHggPSB0Tm9kZS5wcm9qZWN0aW9uIGFzIG51bWJlcjtcbiAgICAgIG5nRGV2TW9kZSAmJlxuICAgICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICAgIGNvbXBvbmVudEhvc3QucHJvamVjdGlvbixcbiAgICAgICAgICAgICAgJ0NvbXBvbmVudHMgd2l0aCBwcm9qZWN0aW9uIG5vZGVzICg8bmctY29udGVudD4pIG11c3QgaGF2ZSBwcm9qZWN0aW9uIHNsb3RzIGRlZmluZWQuJyk7XG5cbiAgICAgIGNvbnN0IG5vZGVzSW5TbG90ID0gY29tcG9uZW50SG9zdC5wcm9qZWN0aW9uIVtzbG90SWR4XTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGVzSW5TbG90KSkge1xuICAgICAgICByZXN1bHQucHVzaCguLi5ub2Rlc0luU2xvdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYXJlbnRWaWV3ID0gZ2V0TFZpZXdQYXJlbnQoY29tcG9uZW50VmlldykhO1xuICAgICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICAgICAgcGFyZW50VmlldyxcbiAgICAgICAgICAgICAgICAnQ29tcG9uZW50IHZpZXdzIHNob3VsZCBhbHdheXMgaGF2ZSBhIHBhcmVudCB2aWV3IChjb21wb25lbnRcXCdzIGhvc3QgdmlldyknKTtcbiAgICAgICAgY29sbGVjdE5hdGl2ZU5vZGVzKHBhcmVudFZpZXdbVFZJRVddLCBwYXJlbnRWaWV3LCBub2Rlc0luU2xvdCwgcmVzdWx0LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdE5vZGUgPSBpc1Byb2plY3Rpb24gPyB0Tm9kZS5wcm9qZWN0aW9uTmV4dCA6IHROb2RlLm5leHQ7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19