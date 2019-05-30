/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '../interface/type';
import { QueryList } from '../linker/query_list';
import { TContainerNode, TElementContainerNode, TElementNode } from './interfaces/node';
import { LQueries } from './interfaces/query';
/**
 * A predicate which determines if a given element/directive should be included in the query
 * results.
 */
export interface QueryPredicate<T> {
    /**
     * If looking for directives then it contains the directive type.
     */
    type: Type<T> | null;
    /**
     * If selector then contains local names to query for.
     */
    selector: string[] | null;
    /**
     * Indicates which token should be read from DI for this query.
     */
    read: Type<T> | null;
}
/**
 * An object representing a query, which is a combination of:
 * - query predicate to determines if a given element/directive should be included in the query
 * - values collected based on a predicate
 * - `QueryList` to which collected values should be reported
 */
declare class LQuery<T> {
    /**
     * Next query. Used when queries are stored as a linked list in `LQueries`.
     */
    next: LQuery<any> | null;
    /**
     * Destination to which the value should be added.
     */
    list: QueryList<T>;
    /**
     * A predicate which determines if a given element/directive should be included in the query
     * results.
     */
    predicate: QueryPredicate<T>;
    /**
     * Values which have been located.
     * This is what builds up the `QueryList._valuesTree`.
     */
    values: any[];
    /**
     * A pointer to an array that stores collected values from views. This is necessary so we
     * know a container into which to insert nodes collected from views.
     */
    containerValues: any[] | null;
    constructor(
    /**
     * Next query. Used when queries are stored as a linked list in `LQueries`.
     */
    next: LQuery<any> | null, 
    /**
     * Destination to which the value should be added.
     */
    list: QueryList<T>, 
    /**
     * A predicate which determines if a given element/directive should be included in the query
     * results.
     */
    predicate: QueryPredicate<T>, 
    /**
     * Values which have been located.
     * This is what builds up the `QueryList._valuesTree`.
     */
    values: any[], 
    /**
     * A pointer to an array that stores collected values from views. This is necessary so we
     * know a container into which to insert nodes collected from views.
     */
    containerValues: any[] | null);
}
export declare class LQueries_ implements LQueries {
    parent: LQueries_ | null;
    private shallow;
    private deep;
    constructor(parent: LQueries_ | null, shallow: LQuery<any> | null, deep: LQuery<any> | null);
    track<T>(queryList: QueryList<T>, predicate: Type<T> | string[], descend?: boolean, read?: Type<T>): void;
    clone(): LQueries;
    container(): LQueries | null;
    createView(): LQueries | null;
    insertView(index: number): void;
    addNode(tNode: TElementNode | TContainerNode | TElementContainerNode): void;
    insertNodeBeforeViews(tNode: TElementNode | TContainerNode | TElementContainerNode): void;
    removeView(): void;
}
/**
 * Refreshes a query by combining matches from all active views and removing matches from deleted
 * views.
 *
 * @returns `true` if a query got dirty during change detection or if this is a static query
 * resolving in creation mode, `false` otherwise.
 *
 * @codeGenApi
 */
export declare function ɵɵqueryRefresh(queryList: QueryList<any>): boolean;
/**
 * Creates new QueryList for a static view query.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 *
 * @codeGenApi
 */
export declare function ɵɵstaticViewQuery<T>(predicate: Type<any> | string[], descend: boolean, read: any): void;
/**
 * Creates new QueryList, stores the reference in LView and returns QueryList.
 *
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ɵɵviewQuery<T>(predicate: Type<any> | string[], descend: boolean, read: any): QueryList<T>;
/**
 * Loads current View Query and moves the pointer/index to the next View Query in LView.
 *
 * @codeGenApi
 */
export declare function ɵɵloadViewQuery<T>(): T;
/**
 * Registers a QueryList, associated with a content query, for later refresh (part of a view
 * refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ɵɵcontentQuery<T>(directiveIndex: number, predicate: Type<any> | string[], descend: boolean, read: any): QueryList<T>;
/**
 * Registers a QueryList, associated with a static content query, for later refresh
 * (part of a view refresh).
 *
 * @param directiveIndex Current directive index
 * @param predicate The type for which the query will search
 * @param descend Whether or not to descend into children
 * @param read What to save in the query
 * @returns QueryList<T>
 *
 * @codeGenApi
 */
export declare function ɵɵstaticContentQuery<T>(directiveIndex: number, predicate: Type<any> | string[], descend: boolean, read: any): void;
/**
 *
 * @codeGenApi
 */
export declare function ɵɵloadContentQuery<T>(): QueryList<T>;
export {};
