/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/static-queries/strategies/timing-strategy", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltaW5nLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zY2hlbWF0aWNzL21pZ3JhdGlvbnMvc3RhdGljLXF1ZXJpZXMvc3RyYXRlZ2llcy90aW1pbmctc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nUXVlcnlEZWZpbml0aW9uLCBRdWVyeVRpbWluZ30gZnJvbSAnLi4vYW5ndWxhci9xdWVyeS1kZWZpbml0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBUaW1pbmdTdHJhdGVneSB7XG4gIC8qKiBTZXRzIHVwIHRoZSBnaXZlbiBzdHJhdGVneS4gU2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgc3RyYXRlZ3kgY291bGQgbm90IGJlIHNldCB1cC4gKi9cbiAgc2V0dXAoKTogYm9vbGVhbjtcbiAgLyoqIERldGVjdHMgdGhlIHRpbWluZyByZXN1bHQgZm9yIGEgZ2l2ZW4gcXVlcnkuICovXG4gIGRldGVjdFRpbWluZyhxdWVyeTogTmdRdWVyeURlZmluaXRpb24pOiBUaW1pbmdSZXN1bHQ7XG59XG5cbmV4cG9ydCB0eXBlIFRpbWluZ1Jlc3VsdCA9IHtcbiAgdGltaW5nOiBRdWVyeVRpbWluZyB8IG51bGw7IG1lc3NhZ2U/OiBzdHJpbmc7XG59O1xuIl19