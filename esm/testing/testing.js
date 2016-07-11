/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getTestInjector } from './test_injector';
var _global = (typeof window === 'undefined' ? global : window);
var testInjector = getTestInjector();
// Reset the test providers before each test.
if (_global.beforeEach) {
    _global.beforeEach(() => { testInjector.reset(); });
}
/**
 * Allows overriding default providers of the test injector,
 * which are defined in test_injector.js
 *
 * @stable
 */
export function addProviders(providers) {
    if (!providers)
        return;
    try {
        testInjector.configureModule({ providers: providers });
    }
    catch (e) {
        throw new Error('addProviders can\'t be called after the injector has been already created for this test. ' +
            'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
            'current `it` function.');
    }
}
/**
 * Allows overriding default providers, directives, pipes, modules of the test injector,
 * which are defined in test_injector.js
 *
 * @stable
 */
export function configureModule(moduleDef) {
    if (!moduleDef)
        return;
    try {
        testInjector.configureModule(moduleDef);
    }
    catch (e) {
        throw new Error('configureModule can\'t be called after the injector has been already created for this test. ' +
            'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
            'current `it` function.');
    }
}
/**
 * Allows overriding default compiler providers and settings
 * which are defined in test_injector.js
 *
 * @stable
 */
export function configureCompiler(config) {
    if (!config)
        return;
    try {
        testInjector.configureCompiler(config);
    }
    catch (e) {
        throw new Error('configureCompiler can\'t be called after the injector has been already created for this test. ' +
            'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
            'current `it` function.');
    }
}
//# sourceMappingURL=testing.js.map