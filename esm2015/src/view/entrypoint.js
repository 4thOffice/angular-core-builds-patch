/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector } from '../di/injector';
import { NgModuleFactory } from '../linker/ng_module_factory';
import { initServicesIfNeeded } from './services';
import { Services } from './types';
import { resolveDefinition } from './util';
/**
 * @param {?} override
 * @return {?}
 */
export function overrideProvider(override) {
    initServicesIfNeeded();
    return Services.overrideProvider(override);
}
/**
 * @param {?} comp
 * @param {?} componentFactory
 * @return {?}
 */
export function overrideComponentView(comp, componentFactory) {
    initServicesIfNeeded();
    return Services.overrideComponentView(comp, componentFactory);
}
/**
 * @return {?}
 */
export function clearOverrides() {
    initServicesIfNeeded();
    return Services.clearOverrides();
}
/**
 * @param {?} ngModuleType
 * @param {?} bootstrapComponents
 * @param {?} defFactory
 * @return {?}
 */
export function createNgModuleFactory(ngModuleType, bootstrapComponents, defFactory) {
    return new NgModuleFactory_(ngModuleType, bootstrapComponents, defFactory);
}
class NgModuleFactory_ extends NgModuleFactory {
    /**
     * @param {?} moduleType
     * @param {?} _bootstrapComponents
     * @param {?} _ngModuleDefFactory
     */
    constructor(moduleType, _bootstrapComponents, _ngModuleDefFactory) {
        // Attention: this ctor is called as top level function.
        // Putting any logic in here will destroy closure tree shaking!
        super();
        this.moduleType = moduleType;
        this._bootstrapComponents = _bootstrapComponents;
        this._ngModuleDefFactory = _ngModuleDefFactory;
    }
    /**
     * @param {?} parentInjector
     * @return {?}
     */
    create(parentInjector) {
        initServicesIfNeeded();
        const /** @type {?} */ def = resolveDefinition(this._ngModuleDefFactory);
        return Services.createNgModuleRef(this.moduleType, parentInjector || Injector.NULL, this._bootstrapComponents, def);
    }
}
function NgModuleFactory__tsickle_Closure_declarations() {
    /** @type {?} */
    NgModuleFactory_.prototype.moduleType;
    /** @type {?} */
    NgModuleFactory_.prototype._bootstrapComponents;
    /** @type {?} */
    NgModuleFactory_.prototype._ngModuleDefFactory;
}
//# sourceMappingURL=entrypoint.js.map