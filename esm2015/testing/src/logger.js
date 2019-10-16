/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class Log {
    constructor() { this.logItems = []; }
    /**
     * @param {?} value
     * @return {?}
     */
    add(value /** TODO #9100 */) { this.logItems.push(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    fn(value /** TODO #9100 */) {
        return (/**
         * @param {?=} a1
         * @param {?=} a2
         * @param {?=} a3
         * @param {?=} a4
         * @param {?=} a5
         * @return {?}
         */
        (a1 = null, a2 = null, a3 = null, a4 = null, a5 = null) => {
            this.logItems.push(value);
        });
    }
    /**
     * @return {?}
     */
    clear() { this.logItems = []; }
    /**
     * @return {?}
     */
    result() { return this.logItems.join('; '); }
}
Log.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Log.ctorParameters = () => [];
/** @nocollapse */ Log.ɵfac = function Log_Factory(t) { return new (t || Log)(); };
/** @nocollapse */ Log.ɵprov = i0.ɵɵdefineInjectable({ token: Log, factory: function (t) { return Log.ɵfac(t); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(Log, [{
        type: Injectable
    }], function () { return []; }, null);
if (false) {
    /** @type {?} */
    Log.prototype.logItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS90ZXN0aW5nL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQUd6QyxNQUFNLE9BQU8sR0FBRztJQUdkLGdCQUFnQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXJDLEdBQUcsQ0FBQyxLQUFVLENBQUMsaUJBQWlCLElBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUV0RSxFQUFFLENBQUMsS0FBVSxDQUFDLGlCQUFpQjtRQUM3Qjs7Ozs7Ozs7UUFBTyxDQUFDLEtBQVUsSUFBSSxFQUFFLEtBQVUsSUFBSSxFQUFFLEtBQVUsSUFBSSxFQUFFLEtBQVUsSUFBSSxFQUFFLEtBQVUsSUFBSSxFQUFFLEVBQUU7WUFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7OztJQUVELEtBQUssS0FBVyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFckMsTUFBTSxLQUFhLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7WUFoQnRELFVBQVU7Ozs7c0RBQ0UsR0FBRzsyQ0FBSCxHQUFHLGlDQUFILEdBQUc7bUNBQUgsR0FBRztjQURmLFVBQVU7Ozs7SUFFVCx1QkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2cge1xuICBsb2dJdGVtczogYW55W107XG5cbiAgY29uc3RydWN0b3IoKSB7IHRoaXMubG9nSXRlbXMgPSBbXTsgfVxuXG4gIGFkZCh2YWx1ZTogYW55IC8qKiBUT0RPICM5MTAwICovKTogdm9pZCB7IHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7IH1cblxuICBmbih2YWx1ZTogYW55IC8qKiBUT0RPICM5MTAwICovKSB7XG4gICAgcmV0dXJuIChhMTogYW55ID0gbnVsbCwgYTI6IGFueSA9IG51bGwsIGEzOiBhbnkgPSBudWxsLCBhNDogYW55ID0gbnVsbCwgYTU6IGFueSA9IG51bGwpID0+IHtcbiAgICAgIHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQgeyB0aGlzLmxvZ0l0ZW1zID0gW107IH1cblxuICByZXN1bHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubG9nSXRlbXMuam9pbignOyAnKTsgfVxufVxuIl19