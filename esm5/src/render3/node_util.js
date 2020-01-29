/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DECLARATION_VIEW, T_HOST } from './interfaces/view';
import { getParentInjectorViewOffset } from './util/injector_utils';
/**
 * If `startTNode.parent` exists and has an injector, returns TNode for that injector.
 * Otherwise, unwraps a parent injector location number to find the view offset from the current
 * injector, then walks up the declaration view tree until the TNode of the parent injector is
 * found.
 *
 * @param location The location of the parent injector, which contains the view offset
 * @param startView The LView instance from which to start walking up the view tree
 * @param startTNode The TNode instance of the starting element
 * @returns The TNode of the parent injector
 */
export function getParentInjectorTNode(location, startView, startTNode) {
    // If there is an injector on the parent TNode, retrieve the TNode for that injector.
    if (startTNode.parent && startTNode.parent.injectorIndex !== -1) {
        // view offset is 0
        var injectorIndex = startTNode.parent.injectorIndex;
        var tNode = startTNode.parent;
        // If tNode.injectorIndex === tNode.parent.injectorIndex, then the index belongs to a parent
        // injector.
        while (tNode.parent != null && injectorIndex == tNode.parent.injectorIndex) {
            tNode = tNode.parent;
        }
        return tNode;
    }
    var viewOffset = getParentInjectorViewOffset(location);
    // view offset is 1
    var parentView = startView;
    var parentTNode = startView[T_HOST];
    // view offset is superior to 1
    while (viewOffset > 1) {
        parentView = parentView[DECLARATION_VIEW];
        parentTNode = parentView[T_HOST];
        viewOffset--;
    }
    return parentTNode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9ub2RlX3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsT0FBTyxFQUFDLGdCQUFnQixFQUFTLE1BQU0sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRWxFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQ2xDLFFBQWtDLEVBQUUsU0FBZ0IsRUFBRSxVQUFpQjtJQUV6RSxxRkFBcUY7SUFDckYsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQy9ELG1CQUFtQjtRQUNuQixJQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlCLDRGQUE0RjtRQUM1RixZQUFZO1FBQ1osT0FBTyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxhQUFhLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDMUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDdEI7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsSUFBSSxVQUFVLEdBQUcsMkJBQTJCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkQsbUJBQW1CO0lBQ25CLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUMzQixJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFpQixDQUFDO0lBQ3BELCtCQUErQjtJQUMvQixPQUFPLFVBQVUsR0FBRyxDQUFDLEVBQUU7UUFDckIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBRyxDQUFDO1FBQzVDLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFpQixDQUFDO1FBQ2pELFVBQVUsRUFBRSxDQUFDO0tBQ2Q7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JlbGF0aXZlSW5qZWN0b3JMb2NhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2VzL2luamVjdG9yJztcbmltcG9ydCB7VENvbnRhaW5lck5vZGUsIFRFbGVtZW50Tm9kZSwgVE5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7REVDTEFSQVRJT05fVklFVywgTFZpZXcsIFRfSE9TVH0gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtnZXRQYXJlbnRJbmplY3RvclZpZXdPZmZzZXR9IGZyb20gJy4vdXRpbC9pbmplY3Rvcl91dGlscyc7XG5cbi8qKlxuICogSWYgYHN0YXJ0VE5vZGUucGFyZW50YCBleGlzdHMgYW5kIGhhcyBhbiBpbmplY3RvciwgcmV0dXJucyBUTm9kZSBmb3IgdGhhdCBpbmplY3Rvci5cbiAqIE90aGVyd2lzZSwgdW53cmFwcyBhIHBhcmVudCBpbmplY3RvciBsb2NhdGlvbiBudW1iZXIgdG8gZmluZCB0aGUgdmlldyBvZmZzZXQgZnJvbSB0aGUgY3VycmVudFxuICogaW5qZWN0b3IsIHRoZW4gd2Fsa3MgdXAgdGhlIGRlY2xhcmF0aW9uIHZpZXcgdHJlZSB1bnRpbCB0aGUgVE5vZGUgb2YgdGhlIHBhcmVudCBpbmplY3RvciBpc1xuICogZm91bmQuXG4gKlxuICogQHBhcmFtIGxvY2F0aW9uIFRoZSBsb2NhdGlvbiBvZiB0aGUgcGFyZW50IGluamVjdG9yLCB3aGljaCBjb250YWlucyB0aGUgdmlldyBvZmZzZXRcbiAqIEBwYXJhbSBzdGFydFZpZXcgVGhlIExWaWV3IGluc3RhbmNlIGZyb20gd2hpY2ggdG8gc3RhcnQgd2Fsa2luZyB1cCB0aGUgdmlldyB0cmVlXG4gKiBAcGFyYW0gc3RhcnRUTm9kZSBUaGUgVE5vZGUgaW5zdGFuY2Ugb2YgdGhlIHN0YXJ0aW5nIGVsZW1lbnRcbiAqIEByZXR1cm5zIFRoZSBUTm9kZSBvZiB0aGUgcGFyZW50IGluamVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRJbmplY3RvclROb2RlKFxuICAgIGxvY2F0aW9uOiBSZWxhdGl2ZUluamVjdG9yTG9jYXRpb24sIHN0YXJ0VmlldzogTFZpZXcsIHN0YXJ0VE5vZGU6IFROb2RlKTogVEVsZW1lbnROb2RlfFxuICAgIFRDb250YWluZXJOb2RlfG51bGwge1xuICAvLyBJZiB0aGVyZSBpcyBhbiBpbmplY3RvciBvbiB0aGUgcGFyZW50IFROb2RlLCByZXRyaWV2ZSB0aGUgVE5vZGUgZm9yIHRoYXQgaW5qZWN0b3IuXG4gIGlmIChzdGFydFROb2RlLnBhcmVudCAmJiBzdGFydFROb2RlLnBhcmVudC5pbmplY3RvckluZGV4ICE9PSAtMSkge1xuICAgIC8vIHZpZXcgb2Zmc2V0IGlzIDBcbiAgICBjb25zdCBpbmplY3RvckluZGV4ID0gc3RhcnRUTm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleDtcbiAgICBsZXQgdE5vZGUgPSBzdGFydFROb2RlLnBhcmVudDtcbiAgICAvLyBJZiB0Tm9kZS5pbmplY3RvckluZGV4ID09PSB0Tm9kZS5wYXJlbnQuaW5qZWN0b3JJbmRleCwgdGhlbiB0aGUgaW5kZXggYmVsb25ncyB0byBhIHBhcmVudFxuICAgIC8vIGluamVjdG9yLlxuICAgIHdoaWxlICh0Tm9kZS5wYXJlbnQgIT0gbnVsbCAmJiBpbmplY3RvckluZGV4ID09IHROb2RlLnBhcmVudC5pbmplY3RvckluZGV4KSB7XG4gICAgICB0Tm9kZSA9IHROb2RlLnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHROb2RlO1xuICB9XG4gIGxldCB2aWV3T2Zmc2V0ID0gZ2V0UGFyZW50SW5qZWN0b3JWaWV3T2Zmc2V0KGxvY2F0aW9uKTtcbiAgLy8gdmlldyBvZmZzZXQgaXMgMVxuICBsZXQgcGFyZW50VmlldyA9IHN0YXJ0VmlldztcbiAgbGV0IHBhcmVudFROb2RlID0gc3RhcnRWaWV3W1RfSE9TVF0gYXMgVEVsZW1lbnROb2RlO1xuICAvLyB2aWV3IG9mZnNldCBpcyBzdXBlcmlvciB0byAxXG4gIHdoaWxlICh2aWV3T2Zmc2V0ID4gMSkge1xuICAgIHBhcmVudFZpZXcgPSBwYXJlbnRWaWV3W0RFQ0xBUkFUSU9OX1ZJRVddICE7XG4gICAgcGFyZW50VE5vZGUgPSBwYXJlbnRWaWV3W1RfSE9TVF0gYXMgVEVsZW1lbnROb2RlO1xuICAgIHZpZXdPZmZzZXQtLTtcbiAgfVxuICByZXR1cm4gcGFyZW50VE5vZGU7XG59XG4iXX0=