/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the core/testing package.
 */
export { async } from './async';
export { ComponentFixture } from './component_fixture';
export { resetFakeAsyncZone, fakeAsync, tick, flush, discardPeriodicTasks, flushMicrotasks } from './fake_async';
export { getTestBed, inject, withModule, TestComponentRenderer, ComponentFixtureAutoDetect, ComponentFixtureNoNgZone, TestBed, InjectSetupWrapper } from './test_bed';
export { __core_private_testing_placeholder__ } from './before_each';
export { ɵTestingCompiler, ɵTestingCompilerFactory } from './private_export_testing';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvdGVzdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBQWMsU0FBUyxDQUFDO0FBQ3hCLGlDQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGtHQUFjLGNBQWMsQ0FBQztBQUM3Qix5SkFBYyxZQUFZLENBQUM7QUFDM0IscURBQWMsZUFBZSxDQUFDO0FBRTlCLDBEQUFjLDBCQUEwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGVcbiAqIEBkZXNjcmlwdGlvblxuICogRW50cnkgcG9pbnQgZm9yIGFsbCBwdWJsaWMgQVBJcyBvZiB0aGUgY29yZS90ZXN0aW5nIHBhY2thZ2UuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9hc3luYyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudF9maXh0dXJlJztcbmV4cG9ydCAqIGZyb20gJy4vZmFrZV9hc3luYyc7XG5leHBvcnQgKiBmcm9tICcuL3Rlc3RfYmVkJztcbmV4cG9ydCAqIGZyb20gJy4vYmVmb3JlX2VhY2gnO1xuZXhwb3J0ICogZnJvbSAnLi9tZXRhZGF0YV9vdmVycmlkZSc7XG5leHBvcnQgKiBmcm9tICcuL3ByaXZhdGVfZXhwb3J0X3Rlc3RpbmcnO1xuIl19