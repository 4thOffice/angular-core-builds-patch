/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined, assertEqual } from './assert';
/**
 * @param {?} tNode
 * @param {?} type
 * @return {?}
 */
export function assertNodeType(tNode, type) {
    assertDefined(tNode, 'should be called with a TNode');
    assertEqual(tNode.type, type, `should be a ${typeName(type)}`);
}
/**
 * @param {?} tNode
 * @param {...?} types
 * @return {?}
 */
export function assertNodeOfPossibleTypes(tNode, ...types) {
    assertDefined(tNode, 'should be called with a TNode');
    /** @type {?} */
    const found = types.some(type => tNode.type === type);
    assertEqual(found, true, `Should be one of ${types.map(typeName).join(', ')} but got ${typeName(tNode.type)}`);
}
/**
 * @param {?} type
 * @return {?}
 */
function typeName(type) {
    if (type == 1 /* Projection */)
        return 'Projection';
    if (type == 0 /* Container */)
        return 'Container';
    if (type == 2 /* View */)
        return 'View';
    if (type == 3 /* Element */)
        return 'Element';
    if (type == 4 /* ElementContainer */)
        return 'ElementContainer';
    return '<unknown>';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9hc3NlcnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL25vZGVfYXNzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7Ozs7OztBQUdwRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQVksRUFBRSxJQUFlO0lBQzFELGFBQWEsQ0FBQyxLQUFLLEVBQUUsK0JBQStCLENBQUMsQ0FBQztJQUN0RCxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxLQUFZLEVBQUUsR0FBRyxLQUFrQjtJQUMzRSxhQUFhLENBQUMsS0FBSyxFQUFFLCtCQUErQixDQUFDLENBQUM7O1VBQ2hELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7SUFDckQsV0FBVyxDQUNQLEtBQUssRUFBRSxJQUFJLEVBQ1gsb0JBQW9CLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVGLENBQUM7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBZTtJQUMvQixJQUFJLElBQUksc0JBQXdCO1FBQUUsT0FBTyxZQUFZLENBQUM7SUFDdEQsSUFBSSxJQUFJLHFCQUF1QjtRQUFFLE9BQU8sV0FBVyxDQUFDO0lBQ3BELElBQUksSUFBSSxnQkFBa0I7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUMxQyxJQUFJLElBQUksbUJBQXFCO1FBQUUsT0FBTyxTQUFTLENBQUM7SUFDaEQsSUFBSSxJQUFJLDRCQUE4QjtRQUFFLE9BQU8sa0JBQWtCLENBQUM7SUFDbEUsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHthc3NlcnREZWZpbmVkLCBhc3NlcnRFcXVhbH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHtUTm9kZSwgVE5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlVHlwZSh0Tm9kZTogVE5vZGUsIHR5cGU6IFROb2RlVHlwZSkge1xuICBhc3NlcnREZWZpbmVkKHROb2RlLCAnc2hvdWxkIGJlIGNhbGxlZCB3aXRoIGEgVE5vZGUnKTtcbiAgYXNzZXJ0RXF1YWwodE5vZGUudHlwZSwgdHlwZSwgYHNob3VsZCBiZSBhICR7dHlwZU5hbWUodHlwZSl9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlT2ZQb3NzaWJsZVR5cGVzKHROb2RlOiBUTm9kZSwgLi4udHlwZXM6IFROb2RlVHlwZVtdKSB7XG4gIGFzc2VydERlZmluZWQodE5vZGUsICdzaG91bGQgYmUgY2FsbGVkIHdpdGggYSBUTm9kZScpO1xuICBjb25zdCBmb3VuZCA9IHR5cGVzLnNvbWUodHlwZSA9PiB0Tm9kZS50eXBlID09PSB0eXBlKTtcbiAgYXNzZXJ0RXF1YWwoXG4gICAgICBmb3VuZCwgdHJ1ZSxcbiAgICAgIGBTaG91bGQgYmUgb25lIG9mICR7dHlwZXMubWFwKHR5cGVOYW1lKS5qb2luKCcsICcpfSBidXQgZ290ICR7dHlwZU5hbWUodE5vZGUudHlwZSl9YCk7XG59XG5cbmZ1bmN0aW9uIHR5cGVOYW1lKHR5cGU6IFROb2RlVHlwZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlID09IFROb2RlVHlwZS5Qcm9qZWN0aW9uKSByZXR1cm4gJ1Byb2plY3Rpb24nO1xuICBpZiAodHlwZSA9PSBUTm9kZVR5cGUuQ29udGFpbmVyKSByZXR1cm4gJ0NvbnRhaW5lcic7XG4gIGlmICh0eXBlID09IFROb2RlVHlwZS5WaWV3KSByZXR1cm4gJ1ZpZXcnO1xuICBpZiAodHlwZSA9PSBUTm9kZVR5cGUuRWxlbWVudCkgcmV0dXJuICdFbGVtZW50JztcbiAgaWYgKHR5cGUgPT0gVE5vZGVUeXBlLkVsZW1lbnRDb250YWluZXIpIHJldHVybiAnRWxlbWVudENvbnRhaW5lcic7XG4gIHJldHVybiAnPHVua25vd24+Jztcbn1cbiJdfQ==