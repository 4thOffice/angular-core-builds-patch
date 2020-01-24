/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined, assertEqual, throwError } from '../util/assert';
import { getComponentDef, getNgModuleDef } from './definition';
import { isLContainer, isLView } from './interfaces/type_checks';
import { TVIEW } from './interfaces/view';
export function assertTNodeForLView(tNode, lView) {
    tNode.hasOwnProperty('tView_') && assertEqual(tNode.tView_, lView[TVIEW], 'This TNode does not belong to this LView.');
}
export function assertComponentType(actual, msg) {
    if (msg === void 0) { msg = 'Type passed in is not ComponentType, it does not have \'ɵcmp\' property.'; }
    if (!getComponentDef(actual)) {
        throwError(msg);
    }
}
export function assertNgModuleType(actual, msg) {
    if (msg === void 0) { msg = 'Type passed in is not NgModuleType, it does not have \'ɵmod\' property.'; }
    if (!getNgModuleDef(actual)) {
        throwError(msg);
    }
}
export function assertPreviousIsParent(isParent) {
    assertEqual(isParent, true, 'previousOrParentTNode should be a parent');
}
export function assertHasParent(tNode) {
    assertDefined(tNode, 'previousOrParentTNode should exist!');
    assertDefined(tNode.parent, 'previousOrParentTNode should have a parent');
}
export function assertDataNext(lView, index, arr) {
    if (arr == null)
        arr = lView;
    assertEqual(arr.length, index, "index " + index + " expected to be at the end of arr (length " + arr.length + ")");
}
export function assertLContainerOrUndefined(value) {
    value && assertEqual(isLContainer(value), true, 'Expecting LContainer or undefined or null');
}
export function assertLContainer(value) {
    assertDefined(value, 'LContainer must be defined');
    assertEqual(isLContainer(value), true, 'Expecting LContainer');
}
export function assertLViewOrUndefined(value) {
    value && assertEqual(isLView(value), true, 'Expecting LView or undefined or null');
}
export function assertLView(value) {
    assertDefined(value, 'LView must be defined');
    assertEqual(isLView(value), true, 'Expecting LView');
}
export function assertFirstCreatePass(tView, errMessage) {
    assertEqual(tView.firstCreatePass, true, errMessage || 'Should only be called in first create pass.');
}
export function assertFirstUpdatePass(tView, errMessage) {
    assertEqual(tView.firstUpdatePass, true, errMessage || 'Should only be called in first update pass.');
}
/**
 * This is a basic sanity check that an object is probably a directive def. DirectiveDef is
 * an interface, so we can't do a direct instanceof check.
 */
export function assertDirectiveDef(obj) {
    if (obj.type === undefined || obj.selectors == undefined || obj.inputs === undefined) {
        throwError("Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFN0QsT0FBTyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQVEsS0FBSyxFQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQVksRUFBRSxLQUFZO0lBQzVELEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxDQUNOLEtBQStCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDckQsMkNBQTJDLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUMvQixNQUFXLEVBQ1gsR0FBd0Y7SUFBeEYsb0JBQUEsRUFBQSxnRkFBd0Y7SUFDMUYsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUM1QixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixNQUFXLEVBQ1gsR0FBdUY7SUFBdkYsb0JBQUEsRUFBQSwrRUFBdUY7SUFDekYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUMzQixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLFFBQWlCO0lBQ3RELFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLDBDQUEwQyxDQUFDLENBQUM7QUFDMUUsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsS0FBbUI7SUFDakQsYUFBYSxDQUFDLEtBQUssRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzVELGFBQWEsQ0FBQyxLQUFPLENBQUMsTUFBTSxFQUFFLDRDQUE0QyxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBWSxFQUFFLEtBQWEsRUFBRSxHQUFXO0lBQ3JFLElBQUksR0FBRyxJQUFJLElBQUk7UUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDO0lBQzdCLFdBQVcsQ0FDUCxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFTLEtBQUssa0RBQTZDLEdBQUcsQ0FBQyxNQUFNLE1BQUcsQ0FBQyxDQUFDO0FBQ25HLENBQUM7QUFFRCxNQUFNLFVBQVUsMkJBQTJCLENBQUMsS0FBVTtJQUNwRCxLQUFLLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsMkNBQTJDLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQVU7SUFDekMsYUFBYSxDQUFDLEtBQUssRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQ25ELFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxLQUFVO0lBQy9DLEtBQUssSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3JGLENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQVU7SUFDcEMsYUFBYSxDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQzlDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxLQUFZLEVBQUUsVUFBbUI7SUFDckUsV0FBVyxDQUNQLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLFVBQVUsSUFBSSw2Q0FBNkMsQ0FBQyxDQUFDO0FBQ2hHLENBQUM7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsS0FBWSxFQUFFLFVBQW1CO0lBQ3JFLFdBQVcsQ0FDUCxLQUFLLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxVQUFVLElBQUksNkNBQTZDLENBQUMsQ0FBQztBQUNoRyxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQVE7SUFDekMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUNwRixVQUFVLENBQ04sZ0dBQWdHLENBQUMsQ0FBQztLQUN2RztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RXF1YWwsIHRocm93RXJyb3J9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHtnZXRDb21wb25lbnREZWYsIGdldE5nTW9kdWxlRGVmfSBmcm9tICcuL2RlZmluaXRpb24nO1xuaW1wb3J0IHtUTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2VzL25vZGUnO1xuaW1wb3J0IHtpc0xDb250YWluZXIsIGlzTFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0xWaWV3LCBUVklFVywgVFZpZXd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydFROb2RlRm9yTFZpZXcodE5vZGU6IFROb2RlLCBsVmlldzogTFZpZXcpIHtcbiAgdE5vZGUuaGFzT3duUHJvcGVydHkoJ3RWaWV3XycpICYmIGFzc2VydEVxdWFsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0Tm9kZSBhcyBhbnkgYXN7dFZpZXdfOiBUVmlld30pLnRWaWV3XywgbFZpZXdbVFZJRVddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdUaGlzIFROb2RlIGRvZXMgbm90IGJlbG9uZyB0byB0aGlzIExWaWV3LicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0Q29tcG9uZW50VHlwZShcbiAgICBhY3R1YWw6IGFueSxcbiAgICBtc2c6IHN0cmluZyA9ICdUeXBlIHBhc3NlZCBpbiBpcyBub3QgQ29tcG9uZW50VHlwZSwgaXQgZG9lcyBub3QgaGF2ZSBcXCfJtWNtcFxcJyBwcm9wZXJ0eS4nKSB7XG4gIGlmICghZ2V0Q29tcG9uZW50RGVmKGFjdHVhbCkpIHtcbiAgICB0aHJvd0Vycm9yKG1zZyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5nTW9kdWxlVHlwZShcbiAgICBhY3R1YWw6IGFueSxcbiAgICBtc2c6IHN0cmluZyA9ICdUeXBlIHBhc3NlZCBpbiBpcyBub3QgTmdNb2R1bGVUeXBlLCBpdCBkb2VzIG5vdCBoYXZlIFxcJ8m1bW9kXFwnIHByb3BlcnR5LicpIHtcbiAgaWYgKCFnZXROZ01vZHVsZURlZihhY3R1YWwpKSB7XG4gICAgdGhyb3dFcnJvcihtc2cpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRQcmV2aW91c0lzUGFyZW50KGlzUGFyZW50OiBib29sZWFuKSB7XG4gIGFzc2VydEVxdWFsKGlzUGFyZW50LCB0cnVlLCAncHJldmlvdXNPclBhcmVudFROb2RlIHNob3VsZCBiZSBhIHBhcmVudCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0SGFzUGFyZW50KHROb2RlOiBUTm9kZSB8IG51bGwpIHtcbiAgYXNzZXJ0RGVmaW5lZCh0Tm9kZSwgJ3ByZXZpb3VzT3JQYXJlbnRUTm9kZSBzaG91bGQgZXhpc3QhJyk7XG4gIGFzc2VydERlZmluZWQodE5vZGUgIS5wYXJlbnQsICdwcmV2aW91c09yUGFyZW50VE5vZGUgc2hvdWxkIGhhdmUgYSBwYXJlbnQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydERhdGFOZXh0KGxWaWV3OiBMVmlldywgaW5kZXg6IG51bWJlciwgYXJyPzogYW55W10pIHtcbiAgaWYgKGFyciA9PSBudWxsKSBhcnIgPSBsVmlldztcbiAgYXNzZXJ0RXF1YWwoXG4gICAgICBhcnIubGVuZ3RoLCBpbmRleCwgYGluZGV4ICR7aW5kZXh9IGV4cGVjdGVkIHRvIGJlIGF0IHRoZSBlbmQgb2YgYXJyIChsZW5ndGggJHthcnIubGVuZ3RofSlgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExDb250YWluZXJPclVuZGVmaW5lZCh2YWx1ZTogYW55KTogdm9pZCB7XG4gIHZhbHVlICYmIGFzc2VydEVxdWFsKGlzTENvbnRhaW5lcih2YWx1ZSksIHRydWUsICdFeHBlY3RpbmcgTENvbnRhaW5lciBvciB1bmRlZmluZWQgb3IgbnVsbCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TENvbnRhaW5lcih2YWx1ZTogYW55KTogdm9pZCB7XG4gIGFzc2VydERlZmluZWQodmFsdWUsICdMQ29udGFpbmVyIG11c3QgYmUgZGVmaW5lZCcpO1xuICBhc3NlcnRFcXVhbChpc0xDb250YWluZXIodmFsdWUpLCB0cnVlLCAnRXhwZWN0aW5nIExDb250YWluZXInKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydExWaWV3T3JVbmRlZmluZWQodmFsdWU6IGFueSk6IHZvaWQge1xuICB2YWx1ZSAmJiBhc3NlcnRFcXVhbChpc0xWaWV3KHZhbHVlKSwgdHJ1ZSwgJ0V4cGVjdGluZyBMVmlldyBvciB1bmRlZmluZWQgb3IgbnVsbCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TFZpZXcodmFsdWU6IGFueSkge1xuICBhc3NlcnREZWZpbmVkKHZhbHVlLCAnTFZpZXcgbXVzdCBiZSBkZWZpbmVkJyk7XG4gIGFzc2VydEVxdWFsKGlzTFZpZXcodmFsdWUpLCB0cnVlLCAnRXhwZWN0aW5nIExWaWV3Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRGaXJzdENyZWF0ZVBhc3ModFZpZXc6IFRWaWV3LCBlcnJNZXNzYWdlPzogc3RyaW5nKSB7XG4gIGFzc2VydEVxdWFsKFxuICAgICAgdFZpZXcuZmlyc3RDcmVhdGVQYXNzLCB0cnVlLCBlcnJNZXNzYWdlIHx8ICdTaG91bGQgb25seSBiZSBjYWxsZWQgaW4gZmlyc3QgY3JlYXRlIHBhc3MuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRGaXJzdFVwZGF0ZVBhc3ModFZpZXc6IFRWaWV3LCBlcnJNZXNzYWdlPzogc3RyaW5nKSB7XG4gIGFzc2VydEVxdWFsKFxuICAgICAgdFZpZXcuZmlyc3RVcGRhdGVQYXNzLCB0cnVlLCBlcnJNZXNzYWdlIHx8ICdTaG91bGQgb25seSBiZSBjYWxsZWQgaW4gZmlyc3QgdXBkYXRlIHBhc3MuJyk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBhIGJhc2ljIHNhbml0eSBjaGVjayB0aGF0IGFuIG9iamVjdCBpcyBwcm9iYWJseSBhIGRpcmVjdGl2ZSBkZWYuIERpcmVjdGl2ZURlZiBpc1xuICogYW4gaW50ZXJmYWNlLCBzbyB3ZSBjYW4ndCBkbyBhIGRpcmVjdCBpbnN0YW5jZW9mIGNoZWNrLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RGlyZWN0aXZlRGVmKG9iajogYW55KSB7XG4gIGlmIChvYmoudHlwZSA9PT0gdW5kZWZpbmVkIHx8IG9iai5zZWxlY3RvcnMgPT0gdW5kZWZpbmVkIHx8IG9iai5pbnB1dHMgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93RXJyb3IoXG4gICAgICAgIGBFeHBlY3RlZCBhIERpcmVjdGl2ZURlZi9Db21wb25lbnREZWYgYW5kIHRoaXMgb2JqZWN0IGRvZXMgbm90IHNlZW0gdG8gaGF2ZSB0aGUgZXhwZWN0ZWQgc2hhcGUuYCk7XG4gIH1cbn1cbiJdfQ==