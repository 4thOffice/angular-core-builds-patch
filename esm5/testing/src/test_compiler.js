/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Compiler, Injectable } from '@angular/core';
function unimplemented() {
    throw Error('unimplemented');
}
/**
 * Special interface to the compiler only used by testing
 *
 * @experimental
 */
var TestingCompiler = /** @class */ (function (_super) {
    tslib_1.__extends(TestingCompiler, _super);
    function TestingCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TestingCompiler.prototype, "injector", {
        get: function () { throw unimplemented(); },
        enumerable: true,
        configurable: true
    });
    TestingCompiler.prototype.overrideModule = function (module, overrides) {
        throw unimplemented();
    };
    TestingCompiler.prototype.overrideDirective = function (directive, overrides) {
        throw unimplemented();
    };
    TestingCompiler.prototype.overrideComponent = function (component, overrides) {
        throw unimplemented();
    };
    TestingCompiler.prototype.overridePipe = function (directive, overrides) {
        throw unimplemented();
    };
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    /**
       * Allows to pass the compile summary from AOT compilation to the JIT compiler,
       * so that it can use the code generated by AOT.
       */
    TestingCompiler.prototype.loadAotSummaries = /**
       * Allows to pass the compile summary from AOT compilation to the JIT compiler,
       * so that it can use the code generated by AOT.
       */
    function (summaries) { throw unimplemented(); };
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    /**
       * Gets the component factory for the given component.
       * This assumes that the component has been compiled before calling this call using
       * `compileModuleAndAllComponents*`.
       */
    TestingCompiler.prototype.getComponentFactory = /**
       * Gets the component factory for the given component.
       * This assumes that the component has been compiled before calling this call using
       * `compileModuleAndAllComponents*`.
       */
    function (component) { throw unimplemented(); };
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    /**
       * Returns the component type that is stored in the given error.
       * This can be used for errors created by compileModule...
       */
    TestingCompiler.prototype.getComponentFromError = /**
       * Returns the component type that is stored in the given error.
       * This can be used for errors created by compileModule...
       */
    function (error) { throw unimplemented(); };
    TestingCompiler.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TestingCompiler.ctorParameters = function () { return []; };
    return TestingCompiler;
}(Compiler));
export { TestingCompiler };
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
var /**
 * A factory for creating a Compiler
 *
 * @experimental
 */
TestingCompilerFactory = /** @class */ (function () {
    function TestingCompilerFactory() {
    }
    return TestingCompilerFactory;
}());
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export { TestingCompilerFactory };
//# sourceMappingURL=test_compiler.js.map