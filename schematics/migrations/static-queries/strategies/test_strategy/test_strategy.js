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
        define("@angular/core/schematics/migrations/static-queries/strategies/test_strategy/test_strategy", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Query timing strategy that is used for queries used within test files. The query
     * timing is not analyzed for test files as the template strategy cannot work within
     * spec files (due to missing component modules) and the usage strategy is not capable
     * of detecting the timing of queries based on how they are used in tests.
     */
    class QueryTestStrategy {
        setup() { return true; }
        /**
         * Detects the timing for a given query. For queries within tests, we always
         * add a TODO and print a message saying that the timing can't be detected for tests.
         */
        detectTiming(query) {
            return { timing: null, message: 'Timing within tests cannot be detected.' };
        }
    }
    exports.QueryTestStrategy = QueryTestStrategy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc2NoZW1hdGljcy9taWdyYXRpb25zL3N0YXRpYy1xdWVyaWVzL3N0cmF0ZWdpZXMvdGVzdF9zdHJhdGVneS90ZXN0X3N0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBS0g7Ozs7O09BS0c7SUFDSCxNQUFhLGlCQUFpQjtRQUM1QixLQUFLLEtBQUssT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhCOzs7V0FHRztRQUNILFlBQVksQ0FBQyxLQUF3QjtZQUNuQyxPQUFPLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUseUNBQXlDLEVBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQ0Y7SUFWRCw4Q0FVQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ1F1ZXJ5RGVmaW5pdGlvbn0gZnJvbSAnLi4vLi4vYW5ndWxhci9xdWVyeS1kZWZpbml0aW9uJztcbmltcG9ydCB7VGltaW5nUmVzdWx0LCBUaW1pbmdTdHJhdGVneX0gZnJvbSAnLi4vdGltaW5nLXN0cmF0ZWd5JztcblxuLyoqXG4gKiBRdWVyeSB0aW1pbmcgc3RyYXRlZ3kgdGhhdCBpcyB1c2VkIGZvciBxdWVyaWVzIHVzZWQgd2l0aGluIHRlc3QgZmlsZXMuIFRoZSBxdWVyeVxuICogdGltaW5nIGlzIG5vdCBhbmFseXplZCBmb3IgdGVzdCBmaWxlcyBhcyB0aGUgdGVtcGxhdGUgc3RyYXRlZ3kgY2Fubm90IHdvcmsgd2l0aGluXG4gKiBzcGVjIGZpbGVzIChkdWUgdG8gbWlzc2luZyBjb21wb25lbnQgbW9kdWxlcykgYW5kIHRoZSB1c2FnZSBzdHJhdGVneSBpcyBub3QgY2FwYWJsZVxuICogb2YgZGV0ZWN0aW5nIHRoZSB0aW1pbmcgb2YgcXVlcmllcyBiYXNlZCBvbiBob3cgdGhleSBhcmUgdXNlZCBpbiB0ZXN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1ZXJ5VGVzdFN0cmF0ZWd5IGltcGxlbWVudHMgVGltaW5nU3RyYXRlZ3kge1xuICBzZXR1cCgpIHsgcmV0dXJuIHRydWU7IH1cblxuICAvKipcbiAgICogRGV0ZWN0cyB0aGUgdGltaW5nIGZvciBhIGdpdmVuIHF1ZXJ5LiBGb3IgcXVlcmllcyB3aXRoaW4gdGVzdHMsIHdlIGFsd2F5c1xuICAgKiBhZGQgYSBUT0RPIGFuZCBwcmludCBhIG1lc3NhZ2Ugc2F5aW5nIHRoYXQgdGhlIHRpbWluZyBjYW4ndCBiZSBkZXRlY3RlZCBmb3IgdGVzdHMuXG4gICAqL1xuICBkZXRlY3RUaW1pbmcocXVlcnk6IE5nUXVlcnlEZWZpbml0aW9uKTogVGltaW5nUmVzdWx0IHtcbiAgICByZXR1cm4ge3RpbWluZzogbnVsbCwgbWVzc2FnZTogJ1RpbWluZyB3aXRoaW4gdGVzdHMgY2Fubm90IGJlIGRldGVjdGVkLid9O1xuICB9XG59XG4iXX0=