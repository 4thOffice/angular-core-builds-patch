/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { asTextData } from './types';
import { checkAndUpdateBinding, getParentRenderElement } from './util';
export function textDef(checkIndex, ngContentIndex, staticText) {
    const bindings = new Array(staticText.length - 1);
    for (let i = 1; i < staticText.length; i++) {
        bindings[i - 1] = {
            flags: 8 /* TypeProperty */,
            name: null,
            ns: null,
            nonMinifiedName: null,
            securityContext: null,
            suffix: staticText[i],
        };
    }
    return {
        // will bet set by the view definition
        nodeIndex: -1,
        parent: null,
        renderParent: null,
        bindingIndex: -1,
        outputIndex: -1,
        // regular values
        checkIndex,
        flags: 2 /* TypeText */,
        childFlags: 0,
        directChildFlags: 0,
        childMatchedQueries: 0,
        matchedQueries: {},
        matchedQueryIds: 0,
        references: {}, ngContentIndex,
        childCount: 0, bindings,
        bindingFlags: 8 /* TypeProperty */,
        outputs: [],
        element: null,
        provider: null,
        text: { prefix: staticText[0] },
        query: null,
        ngContent: null,
    };
}
export function createText(view, renderHost, def) {
    let renderNode;
    const renderer = view.renderer;
    renderNode = renderer.createText(def.text.prefix);
    const parentEl = getParentRenderElement(view, renderHost, def);
    if (parentEl) {
        renderer.appendChild(parentEl, renderNode);
    }
    return { renderText: renderNode };
}
export function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
    let changed = false;
    const bindings = def.bindings;
    const bindLen = bindings.length;
    if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
        changed = true;
    if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
        changed = true;
    if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
        changed = true;
    if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
        changed = true;
    if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
        changed = true;
    if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
        changed = true;
    if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
        changed = true;
    if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
        changed = true;
    if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
        changed = true;
    if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
        changed = true;
    if (changed) {
        let value = def.text.prefix;
        if (bindLen > 0)
            value += _addInterpolationPart(v0, bindings[0]);
        if (bindLen > 1)
            value += _addInterpolationPart(v1, bindings[1]);
        if (bindLen > 2)
            value += _addInterpolationPart(v2, bindings[2]);
        if (bindLen > 3)
            value += _addInterpolationPart(v3, bindings[3]);
        if (bindLen > 4)
            value += _addInterpolationPart(v4, bindings[4]);
        if (bindLen > 5)
            value += _addInterpolationPart(v5, bindings[5]);
        if (bindLen > 6)
            value += _addInterpolationPart(v6, bindings[6]);
        if (bindLen > 7)
            value += _addInterpolationPart(v7, bindings[7]);
        if (bindLen > 8)
            value += _addInterpolationPart(v8, bindings[8]);
        if (bindLen > 9)
            value += _addInterpolationPart(v9, bindings[9]);
        const renderNode = asTextData(view, def.nodeIndex).renderText;
        view.renderer.setValue(renderNode, value);
    }
    return changed;
}
export function checkAndUpdateTextDynamic(view, def, values) {
    const bindings = def.bindings;
    let changed = false;
    for (let i = 0; i < values.length; i++) {
        // Note: We need to loop over all values, so that
        // the old values are updates as well!
        if (checkAndUpdateBinding(view, def, i, values[i])) {
            changed = true;
        }
    }
    if (changed) {
        let value = '';
        for (let i = 0; i < values.length; i++) {
            value = value + _addInterpolationPart(values[i], bindings[i]);
        }
        value = def.text.prefix + value;
        const renderNode = asTextData(view, def.nodeIndex).renderText;
        view.renderer.setValue(renderNode, value);
    }
    return changed;
}
function _addInterpolationPart(value, binding) {
    const valueStr = value != null ? value.toString() : '';
    return valueStr + binding.suffix;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3ZpZXcvdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQW1FLFVBQVUsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyRyxPQUFPLEVBQUMscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFFckUsTUFBTSxVQUFVLE9BQU8sQ0FDbkIsVUFBa0IsRUFBRSxjQUE2QixFQUFFLFVBQW9CO0lBQ3pFLE1BQU0sUUFBUSxHQUFpQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUc7WUFDaEIsS0FBSyxzQkFBMkI7WUFDaEMsSUFBSSxFQUFFLElBQUk7WUFDVixFQUFFLEVBQUUsSUFBSTtZQUNSLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1NBQ3RCLENBQUM7S0FDSDtJQUVELE9BQU87UUFDTCxzQ0FBc0M7UUFDdEMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osWUFBWSxFQUFFLElBQUk7UUFDbEIsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNoQixXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsaUJBQWlCO1FBQ2pCLFVBQVU7UUFDVixLQUFLLGtCQUFvQjtRQUN6QixVQUFVLEVBQUUsQ0FBQztRQUNiLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QixjQUFjLEVBQUUsRUFBRTtRQUNsQixlQUFlLEVBQUUsQ0FBQztRQUNsQixVQUFVLEVBQUUsRUFBRSxFQUFFLGNBQWM7UUFDOUIsVUFBVSxFQUFFLENBQUMsRUFBRSxRQUFRO1FBQ3ZCLFlBQVksc0JBQTJCO1FBQ3ZDLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLElBQUk7UUFDYixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUM7UUFDN0IsS0FBSyxFQUFFLElBQUk7UUFDWCxTQUFTLEVBQUUsSUFBSTtLQUNoQixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBYyxFQUFFLFVBQWUsRUFBRSxHQUFZO0lBQ3RFLElBQUksVUFBZSxDQUFDO0lBQ3BCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0IsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQy9ELElBQUksUUFBUSxFQUFFO1FBQ1osUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDNUM7SUFDRCxPQUFPLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCLENBQ3BDLElBQWMsRUFBRSxHQUFZLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUMzRixFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU87SUFDM0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUMzRSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQUUsT0FBTyxHQUFHLElBQUksQ0FBQztJQUUzRSxJQUFJLE9BQU8sRUFBRTtRQUNYLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFNLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksT0FBTyxHQUFHLENBQUM7WUFBRSxLQUFLLElBQUkscUJBQXFCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDM0M7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLElBQWMsRUFBRSxHQUFZLEVBQUUsTUFBYTtJQUNuRixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzlCLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxpREFBaUQ7UUFDakQsc0NBQXNDO1FBQ3RDLElBQUkscUJBQXFCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbEQsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQjtLQUNGO0lBQ0QsSUFBSSxPQUFPLEVBQUU7UUFDWCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxLQUFLLEdBQUcsS0FBSyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUNELEtBQUssR0FBRyxHQUFHLENBQUMsSUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsTUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMzQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLEtBQVUsRUFBRSxPQUFtQjtJQUM1RCxNQUFNLFFBQVEsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUN2RCxPQUFPLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QmluZGluZ0RlZiwgQmluZGluZ0ZsYWdzLCBOb2RlRGVmLCBOb2RlRmxhZ3MsIFRleHREYXRhLCBWaWV3RGF0YSwgYXNUZXh0RGF0YX0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge2NoZWNrQW5kVXBkYXRlQmluZGluZywgZ2V0UGFyZW50UmVuZGVyRWxlbWVudH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRleHREZWYoXG4gICAgY2hlY2tJbmRleDogbnVtYmVyLCBuZ0NvbnRlbnRJbmRleDogbnVtYmVyIHwgbnVsbCwgc3RhdGljVGV4dDogc3RyaW5nW10pOiBOb2RlRGVmIHtcbiAgY29uc3QgYmluZGluZ3M6IEJpbmRpbmdEZWZbXSA9IG5ldyBBcnJheShzdGF0aWNUZXh0Lmxlbmd0aCAtIDEpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0YXRpY1RleHQubGVuZ3RoOyBpKyspIHtcbiAgICBiaW5kaW5nc1tpIC0gMV0gPSB7XG4gICAgICBmbGFnczogQmluZGluZ0ZsYWdzLlR5cGVQcm9wZXJ0eSxcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgICBuczogbnVsbCxcbiAgICAgIG5vbk1pbmlmaWVkTmFtZTogbnVsbCxcbiAgICAgIHNlY3VyaXR5Q29udGV4dDogbnVsbCxcbiAgICAgIHN1ZmZpeDogc3RhdGljVGV4dFtpXSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAvLyB3aWxsIGJldCBzZXQgYnkgdGhlIHZpZXcgZGVmaW5pdGlvblxuICAgIG5vZGVJbmRleDogLTEsXG4gICAgcGFyZW50OiBudWxsLFxuICAgIHJlbmRlclBhcmVudDogbnVsbCxcbiAgICBiaW5kaW5nSW5kZXg6IC0xLFxuICAgIG91dHB1dEluZGV4OiAtMSxcbiAgICAvLyByZWd1bGFyIHZhbHVlc1xuICAgIGNoZWNrSW5kZXgsXG4gICAgZmxhZ3M6IE5vZGVGbGFncy5UeXBlVGV4dCxcbiAgICBjaGlsZEZsYWdzOiAwLFxuICAgIGRpcmVjdENoaWxkRmxhZ3M6IDAsXG4gICAgY2hpbGRNYXRjaGVkUXVlcmllczogMCxcbiAgICBtYXRjaGVkUXVlcmllczoge30sXG4gICAgbWF0Y2hlZFF1ZXJ5SWRzOiAwLFxuICAgIHJlZmVyZW5jZXM6IHt9LCBuZ0NvbnRlbnRJbmRleCxcbiAgICBjaGlsZENvdW50OiAwLCBiaW5kaW5ncyxcbiAgICBiaW5kaW5nRmxhZ3M6IEJpbmRpbmdGbGFncy5UeXBlUHJvcGVydHksXG4gICAgb3V0cHV0czogW10sXG4gICAgZWxlbWVudDogbnVsbCxcbiAgICBwcm92aWRlcjogbnVsbCxcbiAgICB0ZXh0OiB7cHJlZml4OiBzdGF0aWNUZXh0WzBdfSxcbiAgICBxdWVyeTogbnVsbCxcbiAgICBuZ0NvbnRlbnQ6IG51bGwsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZXh0KHZpZXc6IFZpZXdEYXRhLCByZW5kZXJIb3N0OiBhbnksIGRlZjogTm9kZURlZik6IFRleHREYXRhIHtcbiAgbGV0IHJlbmRlck5vZGU6IGFueTtcbiAgY29uc3QgcmVuZGVyZXIgPSB2aWV3LnJlbmRlcmVyO1xuICByZW5kZXJOb2RlID0gcmVuZGVyZXIuY3JlYXRlVGV4dChkZWYudGV4dCAhLnByZWZpeCk7XG4gIGNvbnN0IHBhcmVudEVsID0gZ2V0UGFyZW50UmVuZGVyRWxlbWVudCh2aWV3LCByZW5kZXJIb3N0LCBkZWYpO1xuICBpZiAocGFyZW50RWwpIHtcbiAgICByZW5kZXJlci5hcHBlbmRDaGlsZChwYXJlbnRFbCwgcmVuZGVyTm9kZSk7XG4gIH1cbiAgcmV0dXJuIHtyZW5kZXJUZXh0OiByZW5kZXJOb2RlfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrQW5kVXBkYXRlVGV4dElubGluZShcbiAgICB2aWV3OiBWaWV3RGF0YSwgZGVmOiBOb2RlRGVmLCB2MDogYW55LCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55LCB2NTogYW55LCB2NjogYW55LFxuICAgIHY3OiBhbnksIHY4OiBhbnksIHY5OiBhbnkpOiBib29sZWFuIHtcbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgY29uc3QgYmluZGluZ3MgPSBkZWYuYmluZGluZ3M7XG4gIGNvbnN0IGJpbmRMZW4gPSBiaW5kaW5ncy5sZW5ndGg7XG4gIGlmIChiaW5kTGVuID4gMCAmJiBjaGVja0FuZFVwZGF0ZUJpbmRpbmcodmlldywgZGVmLCAwLCB2MCkpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDEgJiYgY2hlY2tBbmRVcGRhdGVCaW5kaW5nKHZpZXcsIGRlZiwgMSwgdjEpKSBjaGFuZ2VkID0gdHJ1ZTtcbiAgaWYgKGJpbmRMZW4gPiAyICYmIGNoZWNrQW5kVXBkYXRlQmluZGluZyh2aWV3LCBkZWYsIDIsIHYyKSkgY2hhbmdlZCA9IHRydWU7XG4gIGlmIChiaW5kTGVuID4gMyAmJiBjaGVja0FuZFVwZGF0ZUJpbmRpbmcodmlldywgZGVmLCAzLCB2MykpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDQgJiYgY2hlY2tBbmRVcGRhdGVCaW5kaW5nKHZpZXcsIGRlZiwgNCwgdjQpKSBjaGFuZ2VkID0gdHJ1ZTtcbiAgaWYgKGJpbmRMZW4gPiA1ICYmIGNoZWNrQW5kVXBkYXRlQmluZGluZyh2aWV3LCBkZWYsIDUsIHY1KSkgY2hhbmdlZCA9IHRydWU7XG4gIGlmIChiaW5kTGVuID4gNiAmJiBjaGVja0FuZFVwZGF0ZUJpbmRpbmcodmlldywgZGVmLCA2LCB2NikpIGNoYW5nZWQgPSB0cnVlO1xuICBpZiAoYmluZExlbiA+IDcgJiYgY2hlY2tBbmRVcGRhdGVCaW5kaW5nKHZpZXcsIGRlZiwgNywgdjcpKSBjaGFuZ2VkID0gdHJ1ZTtcbiAgaWYgKGJpbmRMZW4gPiA4ICYmIGNoZWNrQW5kVXBkYXRlQmluZGluZyh2aWV3LCBkZWYsIDgsIHY4KSkgY2hhbmdlZCA9IHRydWU7XG4gIGlmIChiaW5kTGVuID4gOSAmJiBjaGVja0FuZFVwZGF0ZUJpbmRpbmcodmlldywgZGVmLCA5LCB2OSkpIGNoYW5nZWQgPSB0cnVlO1xuXG4gIGlmIChjaGFuZ2VkKSB7XG4gICAgbGV0IHZhbHVlID0gZGVmLnRleHQgIS5wcmVmaXg7XG4gICAgaWYgKGJpbmRMZW4gPiAwKSB2YWx1ZSArPSBfYWRkSW50ZXJwb2xhdGlvblBhcnQodjAsIGJpbmRpbmdzWzBdKTtcbiAgICBpZiAoYmluZExlbiA+IDEpIHZhbHVlICs9IF9hZGRJbnRlcnBvbGF0aW9uUGFydCh2MSwgYmluZGluZ3NbMV0pO1xuICAgIGlmIChiaW5kTGVuID4gMikgdmFsdWUgKz0gX2FkZEludGVycG9sYXRpb25QYXJ0KHYyLCBiaW5kaW5nc1syXSk7XG4gICAgaWYgKGJpbmRMZW4gPiAzKSB2YWx1ZSArPSBfYWRkSW50ZXJwb2xhdGlvblBhcnQodjMsIGJpbmRpbmdzWzNdKTtcbiAgICBpZiAoYmluZExlbiA+IDQpIHZhbHVlICs9IF9hZGRJbnRlcnBvbGF0aW9uUGFydCh2NCwgYmluZGluZ3NbNF0pO1xuICAgIGlmIChiaW5kTGVuID4gNSkgdmFsdWUgKz0gX2FkZEludGVycG9sYXRpb25QYXJ0KHY1LCBiaW5kaW5nc1s1XSk7XG4gICAgaWYgKGJpbmRMZW4gPiA2KSB2YWx1ZSArPSBfYWRkSW50ZXJwb2xhdGlvblBhcnQodjYsIGJpbmRpbmdzWzZdKTtcbiAgICBpZiAoYmluZExlbiA+IDcpIHZhbHVlICs9IF9hZGRJbnRlcnBvbGF0aW9uUGFydCh2NywgYmluZGluZ3NbN10pO1xuICAgIGlmIChiaW5kTGVuID4gOCkgdmFsdWUgKz0gX2FkZEludGVycG9sYXRpb25QYXJ0KHY4LCBiaW5kaW5nc1s4XSk7XG4gICAgaWYgKGJpbmRMZW4gPiA5KSB2YWx1ZSArPSBfYWRkSW50ZXJwb2xhdGlvblBhcnQodjksIGJpbmRpbmdzWzldKTtcbiAgICBjb25zdCByZW5kZXJOb2RlID0gYXNUZXh0RGF0YSh2aWV3LCBkZWYubm9kZUluZGV4KS5yZW5kZXJUZXh0O1xuICAgIHZpZXcucmVuZGVyZXIuc2V0VmFsdWUocmVuZGVyTm9kZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBjaGFuZ2VkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tBbmRVcGRhdGVUZXh0RHluYW1pYyh2aWV3OiBWaWV3RGF0YSwgZGVmOiBOb2RlRGVmLCB2YWx1ZXM6IGFueVtdKTogYm9vbGVhbiB7XG4gIGNvbnN0IGJpbmRpbmdzID0gZGVmLmJpbmRpbmdzO1xuICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vdGU6IFdlIG5lZWQgdG8gbG9vcCBvdmVyIGFsbCB2YWx1ZXMsIHNvIHRoYXRcbiAgICAvLyB0aGUgb2xkIHZhbHVlcyBhcmUgdXBkYXRlcyBhcyB3ZWxsIVxuICAgIGlmIChjaGVja0FuZFVwZGF0ZUJpbmRpbmcodmlldywgZGVmLCBpLCB2YWx1ZXNbaV0pKSB7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGNoYW5nZWQpIHtcbiAgICBsZXQgdmFsdWUgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWUgPSB2YWx1ZSArIF9hZGRJbnRlcnBvbGF0aW9uUGFydCh2YWx1ZXNbaV0sIGJpbmRpbmdzW2ldKTtcbiAgICB9XG4gICAgdmFsdWUgPSBkZWYudGV4dCAhLnByZWZpeCArIHZhbHVlO1xuICAgIGNvbnN0IHJlbmRlck5vZGUgPSBhc1RleHREYXRhKHZpZXcsIGRlZi5ub2RlSW5kZXgpLnJlbmRlclRleHQ7XG4gICAgdmlldy5yZW5kZXJlci5zZXRWYWx1ZShyZW5kZXJOb2RlLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGNoYW5nZWQ7XG59XG5cbmZ1bmN0aW9uIF9hZGRJbnRlcnBvbGF0aW9uUGFydCh2YWx1ZTogYW55LCBiaW5kaW5nOiBCaW5kaW5nRGVmKTogc3RyaW5nIHtcbiAgY29uc3QgdmFsdWVTdHIgPSB2YWx1ZSAhPSBudWxsID8gdmFsdWUudG9TdHJpbmcoKSA6ICcnO1xuICByZXR1cm4gdmFsdWVTdHIgKyBiaW5kaW5nLnN1ZmZpeDtcbn1cbiJdfQ==