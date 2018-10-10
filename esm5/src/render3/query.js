/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '../event_emitter';
import { ElementRef as ViewEngine_ElementRef } from '../linker/element_ref';
import { TemplateRef as ViewEngine_TemplateRef } from '../linker/template_ref';
import { getSymbolIterator } from '../util';
import { assertDefined, assertEqual } from './assert';
import { NG_ELEMENT_ID } from './fields';
import { _getViewData, assertPreviousIsParent, getOrCreateCurrentQueries, store, storeCleanupWithContext } from './instructions';
import { unusedValueExportToPlacateAjd as unused1 } from './interfaces/definition';
import { unusedValueExportToPlacateAjd as unused2 } from './interfaces/injector';
import { unusedValueExportToPlacateAjd as unused3 } from './interfaces/node';
import { unusedValueExportToPlacateAjd as unused4 } from './interfaces/query';
import { DIRECTIVES, TVIEW } from './interfaces/view';
import { flatten, isContentQueryHost } from './util';
import { createElementRef, createTemplateRef } from './view_engine_compatibility';
var unusedValueToPlacateAjd = unused1 + unused2 + unused3 + unused4;
var LQueries_ = /** @class */ (function () {
    function LQueries_(parent, shallow, deep) {
        this.parent = parent;
        this.shallow = shallow;
        this.deep = deep;
    }
    LQueries_.prototype.track = function (queryList, predicate, descend, read) {
        if (descend) {
            this.deep = createQuery(this.deep, queryList, predicate, read != null ? read : null);
        }
        else {
            this.shallow = createQuery(this.shallow, queryList, predicate, read != null ? read : null);
        }
    };
    LQueries_.prototype.clone = function () { return new LQueries_(this, null, this.deep); };
    LQueries_.prototype.container = function () {
        var shallowResults = copyQueriesToContainer(this.shallow);
        var deepResults = copyQueriesToContainer(this.deep);
        return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
    };
    LQueries_.prototype.createView = function () {
        var shallowResults = copyQueriesToView(this.shallow);
        var deepResults = copyQueriesToView(this.deep);
        return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
    };
    LQueries_.prototype.insertView = function (index) {
        insertView(index, this.shallow);
        insertView(index, this.deep);
    };
    LQueries_.prototype.addNode = function (tNode) {
        add(this.deep, tNode);
        if (isContentQueryHost(tNode)) {
            add(this.shallow, tNode);
            if (tNode.parent && isContentQueryHost(tNode.parent)) {
                // if node has a content query and parent also has a content query
                // both queries need to check this node for shallow matches
                add(this.parent.shallow, tNode);
            }
            return this.parent;
        }
        isRootNodeOfQuery(tNode) && add(this.shallow, tNode);
        return this;
    };
    LQueries_.prototype.removeView = function () {
        removeView(this.shallow);
        removeView(this.deep);
    };
    return LQueries_;
}());
export { LQueries_ };
function isRootNodeOfQuery(tNode) {
    return tNode.parent === null || isContentQueryHost(tNode.parent);
}
function copyQueriesToContainer(query) {
    var result = null;
    while (query) {
        var containerValues = []; // prepare room for views
        query.values.push(containerValues);
        var clonedQuery = {
            next: result,
            list: query.list,
            predicate: query.predicate,
            values: containerValues,
            containerValues: null
        };
        result = clonedQuery;
        query = query.next;
    }
    return result;
}
function copyQueriesToView(query) {
    var result = null;
    while (query) {
        var clonedQuery = {
            next: result,
            list: query.list,
            predicate: query.predicate,
            values: [],
            containerValues: query.values
        };
        result = clonedQuery;
        query = query.next;
    }
    return result;
}
function insertView(index, query) {
    while (query) {
        ngDevMode &&
            assertDefined(query.containerValues, 'View queries need to have a pointer to container values.');
        query.containerValues.splice(index, 0, query.values);
        query = query.next;
    }
}
function removeView(query) {
    while (query) {
        ngDevMode &&
            assertDefined(query.containerValues, 'View queries need to have a pointer to container values.');
        var containerValues = query.containerValues;
        var viewValuesIdx = containerValues.indexOf(query.values);
        var removed = containerValues.splice(viewValuesIdx, 1);
        // mark a query as dirty only when removed view had matching modes
        ngDevMode && assertEqual(removed.length, 1, 'removed.length');
        if (removed[0].length) {
            query.list.setDirty();
        }
        query = query.next;
    }
}
/**
 * Iterates over local names for a given node and returns directive index
 * (or -1 if a local name points to an element).
 *
 * @param tNode static data of a node to check
 * @param selector selector to match
 * @returns directive index, -1 or null if a selector didn't match any of the local names
 */
function getIdxOfMatchingSelector(tNode, selector) {
    var localNames = tNode.localNames;
    if (localNames) {
        for (var i = 0; i < localNames.length; i += 2) {
            if (localNames[i] === selector) {
                return localNames[i + 1];
            }
        }
    }
    return null;
}
/**
 * Iterates over all the directives for a node and returns index of a directive for a given type.
 *
 * @param tNode TNode on which directives are present.
 * @param currentView The view we are currently processing
 * @param type Type of a directive to look for.
 * @returns Index of a found directive or null when none found.
 */
function getIdxOfMatchingDirective(tNode, currentView, type) {
    var defs = currentView[TVIEW].directives;
    if (defs) {
        var flags = tNode.flags;
        var count = flags & 4095 /* DirectiveCountMask */;
        var start = flags >> 15 /* DirectiveStartingIndexShift */;
        var end = start + count;
        for (var i = start; i < end; i++) {
            var def = defs[i];
            if (def.type === type && def.diPublic) {
                return i;
            }
        }
    }
    return null;
}
// TODO: "read" should be an AbstractType (FW-486)
function queryRead(tNode, currentView, read) {
    var factoryFn = read[NG_ELEMENT_ID];
    if (typeof factoryFn === 'function') {
        return factoryFn();
    }
    else {
        var matchingIdx = getIdxOfMatchingDirective(tNode, currentView, read);
        if (matchingIdx !== null) {
            return currentView[DIRECTIVES][matchingIdx];
        }
    }
    return null;
}
function queryReadByTNodeType(tNode, currentView) {
    if (tNode.type === 3 /* Element */ || tNode.type === 4 /* ElementContainer */) {
        return createElementRef(ViewEngine_ElementRef, tNode, currentView);
    }
    if (tNode.type === 0 /* Container */) {
        return createTemplateRef(ViewEngine_TemplateRef, ViewEngine_ElementRef, tNode, currentView);
    }
    return null;
}
function add(query, tNode) {
    var currentView = _getViewData();
    while (query) {
        var predicate = query.predicate;
        var type = predicate.type;
        if (type) {
            // if read token and / or strategy is not specified, use type as read token
            var result = queryRead(tNode, currentView, predicate.read || type);
            if (result !== null) {
                addMatch(query, result);
            }
        }
        else {
            var selector = predicate.selector;
            for (var i = 0; i < selector.length; i++) {
                var directiveIdx = getIdxOfMatchingSelector(tNode, selector[i]);
                if (directiveIdx !== null) {
                    var result = null;
                    if (predicate.read) {
                        result = queryRead(tNode, currentView, predicate.read);
                    }
                    else {
                        if (directiveIdx > -1) {
                            result = currentView[DIRECTIVES][directiveIdx];
                        }
                        else {
                            // if read token and / or strategy is not specified,
                            // detect it using appropriate tNode type
                            result = queryReadByTNodeType(tNode, currentView);
                        }
                    }
                    if (result !== null) {
                        addMatch(query, result);
                    }
                }
            }
        }
        query = query.next;
    }
}
function addMatch(query, matchingValue) {
    query.values.push(matchingValue);
    query.list.setDirty();
}
function createPredicate(predicate, read) {
    var isArray = Array.isArray(predicate);
    return {
        type: isArray ? null : predicate,
        selector: isArray ? predicate : null,
        read: read
    };
}
function createQuery(previous, queryList, predicate, read) {
    return {
        next: previous,
        list: queryList,
        predicate: createPredicate(predicate, read),
        values: queryList._valuesTree,
        containerValues: null
    };
}
var QueryList_ = /** @class */ (function () {
    function QueryList_() {
        this.dirty = true;
        this.changes = new EventEmitter();
        this._values = [];
        /** @internal */
        this._valuesTree = [];
    }
    Object.defineProperty(QueryList_.prototype, "length", {
        get: function () { return this._values.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList_.prototype, "first", {
        get: function () {
            var values = this._values;
            return values.length ? values[0] : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueryList_.prototype, "last", {
        get: function () {
            var values = this._values;
            return values.length ? values[values.length - 1] : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    QueryList_.prototype.map = function (fn) { return this._values.map(fn); };
    /**
     * See
     * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
     */
    QueryList_.prototype.filter = function (fn) {
        return this._values.filter(fn);
    };
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    QueryList_.prototype.find = function (fn) {
        return this._values.find(fn);
    };
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    QueryList_.prototype.reduce = function (fn, init) {
        return this._values.reduce(fn, init);
    };
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    QueryList_.prototype.forEach = function (fn) { this._values.forEach(fn); };
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    QueryList_.prototype.some = function (fn) {
        return this._values.some(fn);
    };
    QueryList_.prototype.toArray = function () { return this._values.slice(0); };
    QueryList_.prototype[getSymbolIterator()] = function () { return this._values[getSymbolIterator()](); };
    QueryList_.prototype.toString = function () { return this._values.toString(); };
    QueryList_.prototype.reset = function (res) {
        this._values = flatten(res);
        this.dirty = false;
    };
    QueryList_.prototype.notifyOnChanges = function () { this.changes.emit(this); };
    QueryList_.prototype.setDirty = function () { this.dirty = true; };
    QueryList_.prototype.destroy = function () {
        this.changes.complete();
        this.changes.unsubscribe();
    };
    return QueryList_;
}());
export var QueryList = QueryList_;
/**
 * Creates and returns a QueryList.
 *
 * @param memoryIndex The index in memory where the QueryList should be saved. If null,
 * this is is a content query and the QueryList will be saved later through directiveCreate.
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 */
export function query(memoryIndex, predicate, descend, 
// TODO: "read" should be an AbstractType (FW-486)
read) {
    ngDevMode && assertPreviousIsParent();
    var queryList = new QueryList();
    var queries = getOrCreateCurrentQueries(LQueries_);
    queries.track(queryList, predicate, descend, read);
    storeCleanupWithContext(null, queryList, queryList.destroy);
    if (memoryIndex != null) {
        store(memoryIndex, queryList);
    }
    return queryList;
}
/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 * Returns true if a query got dirty during change detection, false otherwise.
 */
export function queryRefresh(queryList) {
    var queryListImpl = queryList;
    if (queryList.dirty) {
        queryList.reset(queryListImpl._valuesTree);
        queryList.notifyOnChanges();
        return true;
    }
    return false;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3F1ZXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQU1ILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsVUFBVSxJQUFJLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFMUUsT0FBTyxFQUFDLFdBQVcsSUFBSSxzQkFBc0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTdFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUUxQyxPQUFPLEVBQUMsYUFBYSxFQUFFLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUUsc0JBQXNCLEVBQUUseUJBQXlCLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0gsT0FBTyxFQUFlLDZCQUE2QixJQUFJLE9BQU8sRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQy9GLE9BQU8sRUFBQyw2QkFBNkIsSUFBSSxPQUFPLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvRSxPQUFPLEVBQW9GLDZCQUE2QixJQUFJLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlKLE9BQU8sRUFBMEIsNkJBQTZCLElBQUksT0FBTyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDckcsT0FBTyxFQUFDLFVBQVUsRUFBYSxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ25ELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxpQkFB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c0JBQXNCLEVBQUUsQ0FBQztJQUN0QyxJQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDO0lBQ3JDLElBQU0sT0FBTyxHQUFHLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQ3ZCLEtBQUssQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDL0I7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsU0FBeUI7SUFDcEQsSUFBTSxhQUFhLEdBQUksU0FBb0MsQ0FBQztJQUM1RCxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7UUFDbkIsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFdlIGFyZSB0ZW1wb3JhcmlseSBpbXBvcnRpbmcgdGhlIGV4aXN0aW5nIHZpZXdFbmdpbmVfZnJvbSBjb3JlIHNvIHdlIGNhbiBiZSBzdXJlIHdlIGFyZVxuLy8gY29ycmVjdGx5IGltcGxlbWVudGluZyBpdHMgaW50ZXJmYWNlcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnLi4vZXZlbnRfZW1pdHRlcic7XG5pbXBvcnQge0VsZW1lbnRSZWYgYXMgVmlld0VuZ2luZV9FbGVtZW50UmVmfSBmcm9tICcuLi9saW5rZXIvZWxlbWVudF9yZWYnO1xuaW1wb3J0IHtRdWVyeUxpc3QgYXMgdmlld0VuZ2luZV9RdWVyeUxpc3R9IGZyb20gJy4uL2xpbmtlci9xdWVyeV9saXN0JztcbmltcG9ydCB7VGVtcGxhdGVSZWYgYXMgVmlld0VuZ2luZV9UZW1wbGF0ZVJlZn0gZnJvbSAnLi4vbGlua2VyL3RlbXBsYXRlX3JlZic7XG5pbXBvcnQge1R5cGV9IGZyb20gJy4uL3R5cGUnO1xuaW1wb3J0IHtnZXRTeW1ib2xJdGVyYXRvcn0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7YXNzZXJ0RGVmaW5lZCwgYXNzZXJ0RXF1YWx9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7TkdfRUxFTUVOVF9JRH0gZnJvbSAnLi9maWVsZHMnO1xuaW1wb3J0IHtfZ2V0Vmlld0RhdGEsIGFzc2VydFByZXZpb3VzSXNQYXJlbnQsIGdldE9yQ3JlYXRlQ3VycmVudFF1ZXJpZXMsIHN0b3JlLCBzdG9yZUNsZWFudXBXaXRoQ29udGV4dH0gZnJvbSAnLi9pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHtEaXJlY3RpdmVEZWYsIHVudXNlZFZhbHVlRXhwb3J0VG9QbGFjYXRlQWpkIGFzIHVudXNlZDF9IGZyb20gJy4vaW50ZXJmYWNlcy9kZWZpbml0aW9uJztcbmltcG9ydCB7dW51c2VkVmFsdWVFeHBvcnRUb1BsYWNhdGVBamQgYXMgdW51c2VkMn0gZnJvbSAnLi9pbnRlcmZhY2VzL2luamVjdG9yJztcbmltcG9ydCB7VENvbnRhaW5lck5vZGUsIFRFbGVtZW50Q29udGFpbmVyTm9kZSwgVEVsZW1lbnROb2RlLCBUTm9kZSwgVE5vZGVGbGFncywgVE5vZGVUeXBlLCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCBhcyB1bnVzZWQzfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0xRdWVyaWVzLCBRdWVyeVJlYWRUeXBlLCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCBhcyB1bnVzZWQ0fSBmcm9tICcuL2ludGVyZmFjZXMvcXVlcnknO1xuaW1wb3J0IHtESVJFQ1RJVkVTLCBMVmlld0RhdGEsIFRWSUVXfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge2ZsYXR0ZW4sIGlzQ29udGVudFF1ZXJ5SG9zdH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7Y3JlYXRlRWxlbWVudFJlZiwgY3JlYXRlVGVtcGxhdGVSZWZ9IGZyb20gJy4vdmlld19lbmdpbmVfY29tcGF0aWJpbGl0eSc7XG5cbmNvbnN0IHVudXNlZFZhbHVlVG9QbGFjYXRlQWpkID0gdW51c2VkMSArIHVudXNlZDIgKyB1bnVzZWQzICsgdW51c2VkNDtcblxuLyoqXG4gKiBBIHByZWRpY2F0ZSB3aGljaCBkZXRlcm1pbmVzIGlmIGEgZ2l2ZW4gZWxlbWVudC9kaXJlY3RpdmUgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBxdWVyeVxuICogcmVzdWx0cy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWVyeVByZWRpY2F0ZTxUPiB7XG4gIC8qKlxuICAgKiBJZiBsb29raW5nIGZvciBkaXJlY3RpdmVzIHRoZW4gaXQgY29udGFpbnMgdGhlIGRpcmVjdGl2ZSB0eXBlLlxuICAgKi9cbiAgdHlwZTogVHlwZTxUPnxudWxsO1xuXG4gIC8qKlxuICAgKiBJZiBzZWxlY3RvciB0aGVuIGNvbnRhaW5zIGxvY2FsIG5hbWVzIHRvIHF1ZXJ5IGZvci5cbiAgICovXG4gIHNlbGVjdG9yOiBzdHJpbmdbXXxudWxsO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hpY2ggdG9rZW4gc2hvdWxkIGJlIHJlYWQgZnJvbSBESSBmb3IgdGhpcyBxdWVyeS5cbiAgICovXG4gIHJlYWQ6IFF1ZXJ5UmVhZFR5cGU8VD58VHlwZTxUPnxudWxsO1xufVxuXG4vKipcbiAqIEFuIG9iamVjdCByZXByZXNlbnRpbmcgYSBxdWVyeSwgd2hpY2ggaXMgYSBjb21iaW5hdGlvbiBvZjpcbiAqIC0gcXVlcnkgcHJlZGljYXRlIHRvIGRldGVybWluZXMgaWYgYSBnaXZlbiBlbGVtZW50L2RpcmVjdGl2ZSBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIHF1ZXJ5XG4gKiAtIHZhbHVlcyBjb2xsZWN0ZWQgYmFzZWQgb24gYSBwcmVkaWNhdGVcbiAqIC0gYFF1ZXJ5TGlzdGAgdG8gd2hpY2ggY29sbGVjdGVkIHZhbHVlcyBzaG91bGQgYmUgcmVwb3J0ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMUXVlcnk8VD4ge1xuICAvKipcbiAgICogTmV4dCBxdWVyeS4gVXNlZCB3aGVuIHF1ZXJpZXMgYXJlIHN0b3JlZCBhcyBhIGxpbmtlZCBsaXN0IGluIGBMUXVlcmllc2AuXG4gICAqL1xuICBuZXh0OiBMUXVlcnk8YW55PnxudWxsO1xuXG4gIC8qKlxuICAgKiBEZXN0aW5hdGlvbiB0byB3aGljaCB0aGUgdmFsdWUgc2hvdWxkIGJlIGFkZGVkLlxuICAgKi9cbiAgbGlzdDogUXVlcnlMaXN0PFQ+O1xuXG4gIC8qKlxuICAgKiBBIHByZWRpY2F0ZSB3aGljaCBkZXRlcm1pbmVzIGlmIGEgZ2l2ZW4gZWxlbWVudC9kaXJlY3RpdmUgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBxdWVyeVxuICAgKiByZXN1bHRzLlxuICAgKi9cbiAgcHJlZGljYXRlOiBRdWVyeVByZWRpY2F0ZTxUPjtcblxuICAvKipcbiAgICogVmFsdWVzIHdoaWNoIGhhdmUgYmVlbiBsb2NhdGVkLlxuICAgKlxuICAgKiBUaGlzIGlzIHdoYXQgYnVpbGRzIHVwIHRoZSBgUXVlcnlMaXN0Ll92YWx1ZXNUcmVlYC5cbiAgICovXG4gIHZhbHVlczogYW55W107XG5cbiAgLyoqXG4gICAqIEEgcG9pbnRlciB0byBhbiBhcnJheSB0aGF0IHN0b3JlcyBjb2xsZWN0ZWQgdmFsdWVzIGZyb20gdmlld3MuIFRoaXMgaXMgbmVjZXNzYXJ5IHNvIHdlIGtub3cgYVxuICAgKiBjb250YWluZXIgaW50byB3aGljaCB0byBpbnNlcnQgbm9kZXMgY29sbGVjdGVkIGZyb20gdmlld3MuXG4gICAqL1xuICBjb250YWluZXJWYWx1ZXM6IGFueVtdfG51bGw7XG59XG5cbmV4cG9ydCBjbGFzcyBMUXVlcmllc18gaW1wbGVtZW50cyBMUXVlcmllcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHBhcmVudDogTFF1ZXJpZXNffG51bGwsIHByaXZhdGUgc2hhbGxvdzogTFF1ZXJ5PGFueT58bnVsbCxcbiAgICAgIHByaXZhdGUgZGVlcDogTFF1ZXJ5PGFueT58bnVsbCkge31cblxuICB0cmFjazxUPihcbiAgICAgIHF1ZXJ5TGlzdDogdmlld0VuZ2luZV9RdWVyeUxpc3Q8VD4sIHByZWRpY2F0ZTogVHlwZTxUPnxzdHJpbmdbXSwgZGVzY2VuZD86IGJvb2xlYW4sXG4gICAgICByZWFkPzogUXVlcnlSZWFkVHlwZTxUPnxUeXBlPFQ+KTogdm9pZCB7XG4gICAgaWYgKGRlc2NlbmQpIHtcbiAgICAgIHRoaXMuZGVlcCA9IGNyZWF0ZVF1ZXJ5KHRoaXMuZGVlcCwgcXVlcnlMaXN0LCBwcmVkaWNhdGUsIHJlYWQgIT0gbnVsbCA/IHJlYWQgOiBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaGFsbG93ID0gY3JlYXRlUXVlcnkodGhpcy5zaGFsbG93LCBxdWVyeUxpc3QsIHByZWRpY2F0ZSwgcmVhZCAhPSBudWxsID8gcmVhZCA6IG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKCk6IExRdWVyaWVzIHsgcmV0dXJuIG5ldyBMUXVlcmllc18odGhpcywgbnVsbCwgdGhpcy5kZWVwKTsgfVxuXG4gIGNvbnRhaW5lcigpOiBMUXVlcmllc3xudWxsIHtcbiAgICBjb25zdCBzaGFsbG93UmVzdWx0cyA9IGNvcHlRdWVyaWVzVG9Db250YWluZXIodGhpcy5zaGFsbG93KTtcbiAgICBjb25zdCBkZWVwUmVzdWx0cyA9IGNvcHlRdWVyaWVzVG9Db250YWluZXIodGhpcy5kZWVwKTtcblxuICAgIHJldHVybiBzaGFsbG93UmVzdWx0cyB8fCBkZWVwUmVzdWx0cyA/IG5ldyBMUXVlcmllc18odGhpcywgc2hhbGxvd1Jlc3VsdHMsIGRlZXBSZXN1bHRzKSA6IG51bGw7XG4gIH1cblxuICBjcmVhdGVWaWV3KCk6IExRdWVyaWVzfG51bGwge1xuICAgIGNvbnN0IHNoYWxsb3dSZXN1bHRzID0gY29weVF1ZXJpZXNUb1ZpZXcodGhpcy5zaGFsbG93KTtcbiAgICBjb25zdCBkZWVwUmVzdWx0cyA9IGNvcHlRdWVyaWVzVG9WaWV3KHRoaXMuZGVlcCk7XG5cbiAgICByZXR1cm4gc2hhbGxvd1Jlc3VsdHMgfHwgZGVlcFJlc3VsdHMgPyBuZXcgTFF1ZXJpZXNfKHRoaXMsIHNoYWxsb3dSZXN1bHRzLCBkZWVwUmVzdWx0cykgOiBudWxsO1xuICB9XG5cbiAgaW5zZXJ0VmlldyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaW5zZXJ0VmlldyhpbmRleCwgdGhpcy5zaGFsbG93KTtcbiAgICBpbnNlcnRWaWV3KGluZGV4LCB0aGlzLmRlZXApO1xuICB9XG5cbiAgYWRkTm9kZSh0Tm9kZTogVEVsZW1lbnROb2RlfFRDb250YWluZXJOb2RlfFRFbGVtZW50Q29udGFpbmVyTm9kZSk6IExRdWVyaWVzfG51bGwge1xuICAgIGFkZCh0aGlzLmRlZXAsIHROb2RlKTtcblxuICAgIGlmIChpc0NvbnRlbnRRdWVyeUhvc3QodE5vZGUpKSB7XG4gICAgICBhZGQodGhpcy5zaGFsbG93LCB0Tm9kZSk7XG5cbiAgICAgIGlmICh0Tm9kZS5wYXJlbnQgJiYgaXNDb250ZW50UXVlcnlIb3N0KHROb2RlLnBhcmVudCkpIHtcbiAgICAgICAgLy8gaWYgbm9kZSBoYXMgYSBjb250ZW50IHF1ZXJ5IGFuZCBwYXJlbnQgYWxzbyBoYXMgYSBjb250ZW50IHF1ZXJ5XG4gICAgICAgIC8vIGJvdGggcXVlcmllcyBuZWVkIHRvIGNoZWNrIHRoaXMgbm9kZSBmb3Igc2hhbGxvdyBtYXRjaGVzXG4gICAgICAgIGFkZCh0aGlzLnBhcmVudCAhLnNoYWxsb3csIHROb2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9XG5cbiAgICBpc1Jvb3ROb2RlT2ZRdWVyeSh0Tm9kZSkgJiYgYWRkKHRoaXMuc2hhbGxvdywgdE5vZGUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVtb3ZlVmlldygpOiB2b2lkIHtcbiAgICByZW1vdmVWaWV3KHRoaXMuc2hhbGxvdyk7XG4gICAgcmVtb3ZlVmlldyh0aGlzLmRlZXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUm9vdE5vZGVPZlF1ZXJ5KHROb2RlOiBUTm9kZSkge1xuICByZXR1cm4gdE5vZGUucGFyZW50ID09PSBudWxsIHx8IGlzQ29udGVudFF1ZXJ5SG9zdCh0Tm9kZS5wYXJlbnQpO1xufVxuXG5mdW5jdGlvbiBjb3B5UXVlcmllc1RvQ29udGFpbmVyKHF1ZXJ5OiBMUXVlcnk8YW55PnwgbnVsbCk6IExRdWVyeTxhbnk+fG51bGwge1xuICBsZXQgcmVzdWx0OiBMUXVlcnk8YW55PnxudWxsID0gbnVsbDtcblxuICB3aGlsZSAocXVlcnkpIHtcbiAgICBjb25zdCBjb250YWluZXJWYWx1ZXM6IGFueVtdID0gW107ICAvLyBwcmVwYXJlIHJvb20gZm9yIHZpZXdzXG4gICAgcXVlcnkudmFsdWVzLnB1c2goY29udGFpbmVyVmFsdWVzKTtcbiAgICBjb25zdCBjbG9uZWRRdWVyeTogTFF1ZXJ5PGFueT4gPSB7XG4gICAgICBuZXh0OiByZXN1bHQsXG4gICAgICBsaXN0OiBxdWVyeS5saXN0LFxuICAgICAgcHJlZGljYXRlOiBxdWVyeS5wcmVkaWNhdGUsXG4gICAgICB2YWx1ZXM6IGNvbnRhaW5lclZhbHVlcyxcbiAgICAgIGNvbnRhaW5lclZhbHVlczogbnVsbFxuICAgIH07XG4gICAgcmVzdWx0ID0gY2xvbmVkUXVlcnk7XG4gICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY29weVF1ZXJpZXNUb1ZpZXcocXVlcnk6IExRdWVyeTxhbnk+fCBudWxsKTogTFF1ZXJ5PGFueT58bnVsbCB7XG4gIGxldCByZXN1bHQ6IExRdWVyeTxhbnk+fG51bGwgPSBudWxsO1xuXG4gIHdoaWxlIChxdWVyeSkge1xuICAgIGNvbnN0IGNsb25lZFF1ZXJ5OiBMUXVlcnk8YW55PiA9IHtcbiAgICAgIG5leHQ6IHJlc3VsdCxcbiAgICAgIGxpc3Q6IHF1ZXJ5Lmxpc3QsXG4gICAgICBwcmVkaWNhdGU6IHF1ZXJ5LnByZWRpY2F0ZSxcbiAgICAgIHZhbHVlczogW10sXG4gICAgICBjb250YWluZXJWYWx1ZXM6IHF1ZXJ5LnZhbHVlc1xuICAgIH07XG4gICAgcmVzdWx0ID0gY2xvbmVkUXVlcnk7XG4gICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0VmlldyhpbmRleDogbnVtYmVyLCBxdWVyeTogTFF1ZXJ5PGFueT58IG51bGwpIHtcbiAgd2hpbGUgKHF1ZXJ5KSB7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICBxdWVyeS5jb250YWluZXJWYWx1ZXMsICdWaWV3IHF1ZXJpZXMgbmVlZCB0byBoYXZlIGEgcG9pbnRlciB0byBjb250YWluZXIgdmFsdWVzLicpO1xuICAgIHF1ZXJ5LmNvbnRhaW5lclZhbHVlcyAhLnNwbGljZShpbmRleCwgMCwgcXVlcnkudmFsdWVzKTtcbiAgICBxdWVyeSA9IHF1ZXJ5Lm5leHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlVmlldyhxdWVyeTogTFF1ZXJ5PGFueT58IG51bGwpIHtcbiAgd2hpbGUgKHF1ZXJ5KSB7XG4gICAgbmdEZXZNb2RlICYmXG4gICAgICAgIGFzc2VydERlZmluZWQoXG4gICAgICAgICAgICBxdWVyeS5jb250YWluZXJWYWx1ZXMsICdWaWV3IHF1ZXJpZXMgbmVlZCB0byBoYXZlIGEgcG9pbnRlciB0byBjb250YWluZXIgdmFsdWVzLicpO1xuXG4gICAgY29uc3QgY29udGFpbmVyVmFsdWVzID0gcXVlcnkuY29udGFpbmVyVmFsdWVzICE7XG4gICAgY29uc3Qgdmlld1ZhbHVlc0lkeCA9IGNvbnRhaW5lclZhbHVlcy5pbmRleE9mKHF1ZXJ5LnZhbHVlcyk7XG4gICAgY29uc3QgcmVtb3ZlZCA9IGNvbnRhaW5lclZhbHVlcy5zcGxpY2Uodmlld1ZhbHVlc0lkeCwgMSk7XG5cbiAgICAvLyBtYXJrIGEgcXVlcnkgYXMgZGlydHkgb25seSB3aGVuIHJlbW92ZWQgdmlldyBoYWQgbWF0Y2hpbmcgbW9kZXNcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RXF1YWwocmVtb3ZlZC5sZW5ndGgsIDEsICdyZW1vdmVkLmxlbmd0aCcpO1xuICAgIGlmIChyZW1vdmVkWzBdLmxlbmd0aCkge1xuICAgICAgcXVlcnkubGlzdC5zZXREaXJ0eSgpO1xuICAgIH1cblxuICAgIHF1ZXJ5ID0gcXVlcnkubmV4dDtcbiAgfVxufVxuXG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBsb2NhbCBuYW1lcyBmb3IgYSBnaXZlbiBub2RlIGFuZCByZXR1cm5zIGRpcmVjdGl2ZSBpbmRleFxuICogKG9yIC0xIGlmIGEgbG9jYWwgbmFtZSBwb2ludHMgdG8gYW4gZWxlbWVudCkuXG4gKlxuICogQHBhcmFtIHROb2RlIHN0YXRpYyBkYXRhIG9mIGEgbm9kZSB0byBjaGVja1xuICogQHBhcmFtIHNlbGVjdG9yIHNlbGVjdG9yIHRvIG1hdGNoXG4gKiBAcmV0dXJucyBkaXJlY3RpdmUgaW5kZXgsIC0xIG9yIG51bGwgaWYgYSBzZWxlY3RvciBkaWRuJ3QgbWF0Y2ggYW55IG9mIHRoZSBsb2NhbCBuYW1lc1xuICovXG5mdW5jdGlvbiBnZXRJZHhPZk1hdGNoaW5nU2VsZWN0b3IodE5vZGU6IFROb2RlLCBzZWxlY3Rvcjogc3RyaW5nKTogbnVtYmVyfG51bGwge1xuICBjb25zdCBsb2NhbE5hbWVzID0gdE5vZGUubG9jYWxOYW1lcztcbiAgaWYgKGxvY2FsTmFtZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsTmFtZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGlmIChsb2NhbE5hbWVzW2ldID09PSBzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gbG9jYWxOYW1lc1tpICsgMV0gYXMgbnVtYmVyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGFsbCB0aGUgZGlyZWN0aXZlcyBmb3IgYSBub2RlIGFuZCByZXR1cm5zIGluZGV4IG9mIGEgZGlyZWN0aXZlIGZvciBhIGdpdmVuIHR5cGUuXG4gKlxuICogQHBhcmFtIHROb2RlIFROb2RlIG9uIHdoaWNoIGRpcmVjdGl2ZXMgYXJlIHByZXNlbnQuXG4gKiBAcGFyYW0gY3VycmVudFZpZXcgVGhlIHZpZXcgd2UgYXJlIGN1cnJlbnRseSBwcm9jZXNzaW5nXG4gKiBAcGFyYW0gdHlwZSBUeXBlIG9mIGEgZGlyZWN0aXZlIHRvIGxvb2sgZm9yLlxuICogQHJldHVybnMgSW5kZXggb2YgYSBmb3VuZCBkaXJlY3RpdmUgb3IgbnVsbCB3aGVuIG5vbmUgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIGdldElkeE9mTWF0Y2hpbmdEaXJlY3RpdmUodE5vZGU6IFROb2RlLCBjdXJyZW50VmlldzogTFZpZXdEYXRhLCB0eXBlOiBUeXBlPGFueT4pOiBudW1iZXJ8XG4gICAgbnVsbCB7XG4gIGNvbnN0IGRlZnMgPSBjdXJyZW50Vmlld1tUVklFV10uZGlyZWN0aXZlcztcbiAgaWYgKGRlZnMpIHtcbiAgICBjb25zdCBmbGFncyA9IHROb2RlLmZsYWdzO1xuICAgIGNvbnN0IGNvdW50ID0gZmxhZ3MgJiBUTm9kZUZsYWdzLkRpcmVjdGl2ZUNvdW50TWFzaztcbiAgICBjb25zdCBzdGFydCA9IGZsYWdzID4+IFROb2RlRmxhZ3MuRGlyZWN0aXZlU3RhcnRpbmdJbmRleFNoaWZ0O1xuICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgY291bnQ7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlZiA9IGRlZnNbaV0gYXMgRGlyZWN0aXZlRGVmPGFueT47XG4gICAgICBpZiAoZGVmLnR5cGUgPT09IHR5cGUgJiYgZGVmLmRpUHVibGljKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLy8gVE9ETzogXCJyZWFkXCIgc2hvdWxkIGJlIGFuIEFic3RyYWN0VHlwZSAoRlctNDg2KVxuZnVuY3Rpb24gcXVlcnlSZWFkKHROb2RlOiBUTm9kZSwgY3VycmVudFZpZXc6IExWaWV3RGF0YSwgcmVhZDogYW55KTogYW55IHtcbiAgY29uc3QgZmFjdG9yeUZuID0gKHJlYWQgYXMgYW55KVtOR19FTEVNRU5UX0lEXTtcbiAgaWYgKHR5cGVvZiBmYWN0b3J5Rm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFjdG9yeUZuKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgbWF0Y2hpbmdJZHggPSBnZXRJZHhPZk1hdGNoaW5nRGlyZWN0aXZlKHROb2RlLCBjdXJyZW50VmlldywgcmVhZCBhcyBUeXBlPGFueT4pO1xuICAgIGlmIChtYXRjaGluZ0lkeCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRWaWV3W0RJUkVDVElWRVNdICFbbWF0Y2hpbmdJZHhdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gcXVlcnlSZWFkQnlUTm9kZVR5cGUodE5vZGU6IFROb2RlLCBjdXJyZW50VmlldzogTFZpZXdEYXRhKTogYW55IHtcbiAgaWYgKHROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50IHx8IHROb2RlLnR5cGUgPT09IFROb2RlVHlwZS5FbGVtZW50Q29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnRSZWYoVmlld0VuZ2luZV9FbGVtZW50UmVmLCB0Tm9kZSwgY3VycmVudFZpZXcpO1xuICB9XG4gIGlmICh0Tm9kZS50eXBlID09PSBUTm9kZVR5cGUuQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVRlbXBsYXRlUmVmKFZpZXdFbmdpbmVfVGVtcGxhdGVSZWYsIFZpZXdFbmdpbmVfRWxlbWVudFJlZiwgdE5vZGUsIGN1cnJlbnRWaWV3KTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gYWRkKFxuICAgIHF1ZXJ5OiBMUXVlcnk8YW55PnwgbnVsbCwgdE5vZGU6IFRFbGVtZW50Tm9kZSB8IFRDb250YWluZXJOb2RlIHwgVEVsZW1lbnRDb250YWluZXJOb2RlKSB7XG4gIGNvbnN0IGN1cnJlbnRWaWV3ID0gX2dldFZpZXdEYXRhKCk7XG5cbiAgd2hpbGUgKHF1ZXJ5KSB7XG4gICAgY29uc3QgcHJlZGljYXRlID0gcXVlcnkucHJlZGljYXRlO1xuICAgIGNvbnN0IHR5cGUgPSBwcmVkaWNhdGUudHlwZTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgLy8gaWYgcmVhZCB0b2tlbiBhbmQgLyBvciBzdHJhdGVneSBpcyBub3Qgc3BlY2lmaWVkLCB1c2UgdHlwZSBhcyByZWFkIHRva2VuXG4gICAgICBjb25zdCByZXN1bHQgPSBxdWVyeVJlYWQodE5vZGUsIGN1cnJlbnRWaWV3LCBwcmVkaWNhdGUucmVhZCB8fCB0eXBlKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcbiAgICAgICAgYWRkTWF0Y2gocXVlcnksIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gcHJlZGljYXRlLnNlbGVjdG9yICE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGl2ZUlkeCA9IGdldElkeE9mTWF0Y2hpbmdTZWxlY3Rvcih0Tm9kZSwgc2VsZWN0b3JbaV0pO1xuICAgICAgICBpZiAoZGlyZWN0aXZlSWR4ICE9PSBudWxsKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdDogYW55ID0gbnVsbDtcbiAgICAgICAgICBpZiAocHJlZGljYXRlLnJlYWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHF1ZXJ5UmVhZCh0Tm9kZSwgY3VycmVudFZpZXcsIHByZWRpY2F0ZS5yZWFkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZUlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGN1cnJlbnRWaWV3W0RJUkVDVElWRVNdICFbZGlyZWN0aXZlSWR4XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGlmIHJlYWQgdG9rZW4gYW5kIC8gb3Igc3RyYXRlZ3kgaXMgbm90IHNwZWNpZmllZCxcbiAgICAgICAgICAgICAgLy8gZGV0ZWN0IGl0IHVzaW5nIGFwcHJvcHJpYXRlIHROb2RlIHR5cGVcbiAgICAgICAgICAgICAgcmVzdWx0ID0gcXVlcnlSZWFkQnlUTm9kZVR5cGUodE5vZGUsIGN1cnJlbnRWaWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBhZGRNYXRjaChxdWVyeSwgcmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcXVlcnkgPSBxdWVyeS5uZXh0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZE1hdGNoKHF1ZXJ5OiBMUXVlcnk8YW55PiwgbWF0Y2hpbmdWYWx1ZTogYW55KTogdm9pZCB7XG4gIHF1ZXJ5LnZhbHVlcy5wdXNoKG1hdGNoaW5nVmFsdWUpO1xuICBxdWVyeS5saXN0LnNldERpcnR5KCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByZWRpY2F0ZTxUPihcbiAgICBwcmVkaWNhdGU6IFR5cGU8VD58IHN0cmluZ1tdLCByZWFkOiBRdWVyeVJlYWRUeXBlPFQ+fCBUeXBlPFQ+fCBudWxsKTogUXVlcnlQcmVkaWNhdGU8VD4ge1xuICBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShwcmVkaWNhdGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGlzQXJyYXkgPyBudWxsIDogcHJlZGljYXRlIGFzIFR5cGU8VD4sXG4gICAgc2VsZWN0b3I6IGlzQXJyYXkgPyBwcmVkaWNhdGUgYXMgc3RyaW5nW10gOiBudWxsLFxuICAgIHJlYWQ6IHJlYWRcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUXVlcnk8VD4oXG4gICAgcHJldmlvdXM6IExRdWVyeTxhbnk+fCBudWxsLCBxdWVyeUxpc3Q6IFF1ZXJ5TGlzdDxUPiwgcHJlZGljYXRlOiBUeXBlPFQ+fCBzdHJpbmdbXSxcbiAgICByZWFkOiBRdWVyeVJlYWRUeXBlPFQ+fCBUeXBlPFQ+fCBudWxsKTogTFF1ZXJ5PFQ+IHtcbiAgcmV0dXJuIHtcbiAgICBuZXh0OiBwcmV2aW91cyxcbiAgICBsaXN0OiBxdWVyeUxpc3QsXG4gICAgcHJlZGljYXRlOiBjcmVhdGVQcmVkaWNhdGUocHJlZGljYXRlLCByZWFkKSxcbiAgICB2YWx1ZXM6IChxdWVyeUxpc3QgYXMgYW55IGFzIFF1ZXJ5TGlzdF88VD4pLl92YWx1ZXNUcmVlLFxuICAgIGNvbnRhaW5lclZhbHVlczogbnVsbFxuICB9O1xufVxuXG5jbGFzcyBRdWVyeUxpc3RfPFQ+LyogaW1wbGVtZW50cyB2aWV3RW5naW5lX1F1ZXJ5TGlzdDxUPiAqLyB7XG4gIHJlYWRvbmx5IGRpcnR5ID0gdHJ1ZTtcbiAgcmVhZG9ubHkgY2hhbmdlczogT2JzZXJ2YWJsZTxUPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBfdmFsdWVzOiBUW10gPSBbXTtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdmFsdWVzVHJlZTogYW55W10gPSBbXTtcblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92YWx1ZXMubGVuZ3RoOyB9XG5cbiAgZ2V0IGZpcnN0KCk6IFR8bnVsbCB7XG4gICAgbGV0IHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICByZXR1cm4gdmFsdWVzLmxlbmd0aCA/IHZhbHVlc1swXSA6IG51bGw7XG4gIH1cblxuICBnZXQgbGFzdCgpOiBUfG51bGwge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgcmV0dXJuIHZhbHVlcy5sZW5ndGggPyB2YWx1ZXNbdmFsdWVzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWVcbiAgICogW0FycmF5Lm1hcF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwKVxuICAgKi9cbiAgbWFwPFU+KGZuOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gVSk6IFVbXSB7IHJldHVybiB0aGlzLl92YWx1ZXMubWFwKGZuKTsgfVxuXG4gIC8qKlxuICAgKiBTZWVcbiAgICogW0FycmF5LmZpbHRlcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKVxuICAgKi9cbiAgZmlsdGVyKGZuOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcy5maWx0ZXIoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlZVxuICAgKiBbQXJyYXkuZmluZF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmluZClcbiAgICovXG4gIGZpbmQoZm46IChpdGVtOiBULCBpbmRleDogbnVtYmVyLCBhcnJheTogVFtdKSA9PiBib29sZWFuKTogVHx1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXMuZmluZChmbik7XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5yZWR1Y2VdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSlcbiAgICovXG4gIHJlZHVjZTxVPihmbjogKHByZXZWYWx1ZTogVSwgY3VyVmFsdWU6IFQsIGN1ckluZGV4OiBudW1iZXIsIGFycmF5OiBUW10pID0+IFUsIGluaXQ6IFUpOiBVIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzLnJlZHVjZShmbiwgaW5pdCk7XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5mb3JFYWNoXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoKVxuICAgKi9cbiAgZm9yRWFjaChmbjogKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBUW10pID0+IHZvaWQpOiB2b2lkIHsgdGhpcy5fdmFsdWVzLmZvckVhY2goZm4pOyB9XG5cbiAgLyoqXG4gICAqIFNlZVxuICAgKiBbQXJyYXkuc29tZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29tZSlcbiAgICovXG4gIHNvbWUoZm46ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXMuc29tZShmbik7XG4gIH1cblxuICB0b0FycmF5KCk6IFRbXSB7IHJldHVybiB0aGlzLl92YWx1ZXMuc2xpY2UoMCk7IH1cblxuICBbZ2V0U3ltYm9sSXRlcmF0b3IoKV0oKTogSXRlcmF0b3I8VD4geyByZXR1cm4gKHRoaXMuX3ZhbHVlcyBhcyBhbnkpW2dldFN5bWJvbEl0ZXJhdG9yKCldKCk7IH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdmFsdWVzLnRvU3RyaW5nKCk7IH1cblxuICByZXNldChyZXM6IChhbnlbXXxUKVtdKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVzID0gZmxhdHRlbihyZXMpO1xuICAgICh0aGlzIGFze2RpcnR5OiBib29sZWFufSkuZGlydHkgPSBmYWxzZTtcbiAgfVxuXG4gIG5vdGlmeU9uQ2hhbmdlcygpOiB2b2lkIHsgKHRoaXMuY2hhbmdlcyBhcyBFdmVudEVtaXR0ZXI8YW55PikuZW1pdCh0aGlzKTsgfVxuICBzZXREaXJ0eSgpOiB2b2lkIHsgKHRoaXMgYXN7ZGlydHk6IGJvb2xlYW59KS5kaXJ0eSA9IHRydWU7IH1cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAodGhpcy5jaGFuZ2VzIGFzIEV2ZW50RW1pdHRlcjxhbnk+KS5jb21wbGV0ZSgpO1xuICAgICh0aGlzLmNoYW5nZXMgYXMgRXZlbnRFbWl0dGVyPGFueT4pLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuLy8gTk9URTogdGhpcyBoYWNrIGlzIGhlcmUgYmVjYXVzZSBJUXVlcnlMaXN0IGhhcyBwcml2YXRlIG1lbWJlcnMgYW5kIHRoZXJlZm9yZVxuLy8gaXQgY2FuJ3QgYmUgaW1wbGVtZW50ZWQgb25seSBleHRlbmRlZC5cbmV4cG9ydCB0eXBlIFF1ZXJ5TGlzdDxUPiA9IHZpZXdFbmdpbmVfUXVlcnlMaXN0PFQ+O1xuZXhwb3J0IGNvbnN0IFF1ZXJ5TGlzdDogdHlwZW9mIHZpZXdFbmdpbmVfUXVlcnlMaXN0ID0gUXVlcnlMaXN0XyBhcyBhbnk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIFF1ZXJ5TGlzdC5cbiAqXG4gKiBAcGFyYW0gbWVtb3J5SW5kZXggVGhlIGluZGV4IGluIG1lbW9yeSB3aGVyZSB0aGUgUXVlcnlMaXN0IHNob3VsZCBiZSBzYXZlZC4gSWYgbnVsbCxcbiAqIHRoaXMgaXMgaXMgYSBjb250ZW50IHF1ZXJ5IGFuZCB0aGUgUXVlcnlMaXN0IHdpbGwgYmUgc2F2ZWQgbGF0ZXIgdGhyb3VnaCBkaXJlY3RpdmVDcmVhdGUuXG4gKiBAcGFyYW0gcHJlZGljYXRlIFRoZSB0eXBlIGZvciB3aGljaCB0aGUgcXVlcnkgd2lsbCBzZWFyY2hcbiAqIEBwYXJhbSBkZXNjZW5kIFdoZXRoZXIgb3Igbm90IHRvIGRlc2NlbmQgaW50byBjaGlsZHJlblxuICogQHBhcmFtIHJlYWQgV2hhdCB0byBzYXZlIGluIHRoZSBxdWVyeVxuICogQHJldHVybnMgUXVlcnlMaXN0PFQ+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeTxUPihcbiAgICBtZW1vcnlJbmRleDogbnVtYmVyIHwgbnVsbCwgcHJlZGljYXRlOiBUeXBlPGFueT58IHN0cmluZ1tdLCBkZXNjZW5kPzogYm9vbGVhbixcbiAgICAvLyBUT0RPOiBcInJlYWRcIiBzaG91bGQgYmUgYW4gQWJzdHJhY3RUeXBlIChGVy00ODYpXG4gICAgcmVhZD86IGFueSk6IFF1ZXJ5TGlzdDxUPiB7XG4gIG5nRGV2TW9kZSAmJiBhc3NlcnRQcmV2aW91c0lzUGFyZW50KCk7XG4gIGNvbnN0IHF1ZXJ5TGlzdCA9IG5ldyBRdWVyeUxpc3Q8VD4oKTtcbiAgY29uc3QgcXVlcmllcyA9IGdldE9yQ3JlYXRlQ3VycmVudFF1ZXJpZXMoTFF1ZXJpZXNfKTtcbiAgcXVlcmllcy50cmFjayhxdWVyeUxpc3QsIHByZWRpY2F0ZSwgZGVzY2VuZCwgcmVhZCk7XG4gIHN0b3JlQ2xlYW51cFdpdGhDb250ZXh0KG51bGwsIHF1ZXJ5TGlzdCwgcXVlcnlMaXN0LmRlc3Ryb3kpO1xuICBpZiAobWVtb3J5SW5kZXggIT0gbnVsbCkge1xuICAgIHN0b3JlKG1lbW9yeUluZGV4LCBxdWVyeUxpc3QpO1xuICB9XG4gIHJldHVybiBxdWVyeUxpc3Q7XG59XG5cbi8qKlxuICogUmVmcmVzaGVzIGEgcXVlcnkgYnkgY29tYmluaW5nIG1hdGNoZXMgZnJvbSBhbGwgYWN0aXZlIHZpZXdzIGFuZCByZW1vdmluZyBtYXRjaGVzIGZyb20gZGVsZXRlZFxuICogdmlld3MuXG4gKiBSZXR1cm5zIHRydWUgaWYgYSBxdWVyeSBnb3QgZGlydHkgZHVyaW5nIGNoYW5nZSBkZXRlY3Rpb24sIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5UmVmcmVzaChxdWVyeUxpc3Q6IFF1ZXJ5TGlzdDxhbnk+KTogYm9vbGVhbiB7XG4gIGNvbnN0IHF1ZXJ5TGlzdEltcGwgPSAocXVlcnlMaXN0IGFzIGFueSBhcyBRdWVyeUxpc3RfPGFueT4pO1xuICBpZiAocXVlcnlMaXN0LmRpcnR5KSB7XG4gICAgcXVlcnlMaXN0LnJlc2V0KHF1ZXJ5TGlzdEltcGwuX3ZhbHVlc1RyZWUpO1xuICAgIHF1ZXJ5TGlzdC5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=