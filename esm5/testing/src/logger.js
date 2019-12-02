/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var Log = /** @class */ (function () {
    function Log() {
        this.logItems = [];
    }
    Log.prototype.add = function (value /** TODO #9100 */) { this.logItems.push(value); };
    Log.prototype.fn = function (value /** TODO #9100 */) {
        var _this = this;
        return function (a1, a2, a3, a4, a5) {
            if (a1 === void 0) { a1 = null; }
            if (a2 === void 0) { a2 = null; }
            if (a3 === void 0) { a3 = null; }
            if (a4 === void 0) { a4 = null; }
            if (a5 === void 0) { a5 = null; }
            _this.logItems.push(value);
        };
    };
    Log.prototype.clear = function () { this.logItems = []; };
    Log.prototype.result = function () { return this.logItems.join('; '); };
    Log.ɵfac = function Log_Factory(t) { return new (t || Log)(); };
    Log.ɵprov = i0.ɵɵdefineInjectable({ token: Log, factory: Log.ɵfac, providedIn: null });
    return Log;
}());
export { Log };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Log, [{
        type: Injectable
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS90ZXN0aW5nL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFFekM7SUFJRTtRQUFnQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUFDLENBQUM7SUFFckMsaUJBQUcsR0FBSCxVQUFJLEtBQVUsQ0FBQyxpQkFBaUIsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEUsZ0JBQUUsR0FBRixVQUFHLEtBQVUsQ0FBQyxpQkFBaUI7UUFBL0IsaUJBSUM7UUFIQyxPQUFPLFVBQUMsRUFBYyxFQUFFLEVBQWMsRUFBRSxFQUFjLEVBQUUsRUFBYyxFQUFFLEVBQWM7WUFBOUUsbUJBQUEsRUFBQSxTQUFjO1lBQUUsbUJBQUEsRUFBQSxTQUFjO1lBQUUsbUJBQUEsRUFBQSxTQUFjO1lBQUUsbUJBQUEsRUFBQSxTQUFjO1lBQUUsbUJBQUEsRUFBQSxTQUFjO1lBQ3BGLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBSyxHQUFMLGNBQWdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVyQyxvQkFBTSxHQUFOLGNBQW1CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzBEQWYxQyxHQUFHOytDQUFILEdBQUcsV0FBSCxHQUFHO2NBWGhCO0NBMkJDLEFBakJELElBaUJDO1NBaEJZLEdBQUc7a0RBQUgsR0FBRztjQURmLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2cge1xuICBsb2dJdGVtczogYW55W107XG5cbiAgY29uc3RydWN0b3IoKSB7IHRoaXMubG9nSXRlbXMgPSBbXTsgfVxuXG4gIGFkZCh2YWx1ZTogYW55IC8qKiBUT0RPICM5MTAwICovKTogdm9pZCB7IHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7IH1cblxuICBmbih2YWx1ZTogYW55IC8qKiBUT0RPICM5MTAwICovKSB7XG4gICAgcmV0dXJuIChhMTogYW55ID0gbnVsbCwgYTI6IGFueSA9IG51bGwsIGEzOiBhbnkgPSBudWxsLCBhNDogYW55ID0gbnVsbCwgYTU6IGFueSA9IG51bGwpID0+IHtcbiAgICAgIHRoaXMubG9nSXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfTtcbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQgeyB0aGlzLmxvZ0l0ZW1zID0gW107IH1cblxuICByZXN1bHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubG9nSXRlbXMuam9pbignOyAnKTsgfVxufVxuIl19