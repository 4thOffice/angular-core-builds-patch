/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '../type';
import { ClassProvider, ConstructorProvider, ExistingProvider, FactoryProvider, StaticClassProvider, ValueProvider } from './provider';
/**
 * Information about how a type or `InjectionToken` interfaces with the DI system.
 *
 * At a minimum, this includes a `factory` which defines how to create the given type `T`, possibly
 * requesting injection of other types if necessary.
 *
 * Optionally, a `providedIn` parameter specifies that the given type belongs to a particular
 * `ɵInjectorDef`, `NgModule`, or a special scope (e.g. `'root'`). A value of `null` indicates
 * that the injectable does not belong to any scope.
 *
 * NOTE: This is a semi public API, and there are no guaranties that the shape of this API will
 * remain consistent between version. Use with caution.
 *
 * @experimental
 */
export interface ɵInjectableDef<T> {
    /**
     * Specifies that the given type belongs to a particular injector:
     * - `InjectorType` such as `NgModule`,
     * - `'root'` the root injector
     * - `'any'` all injectors.
     * - `null`, does not belong to any injector. Must be explicitly listed in the injector
     *   `providers`.
     */
    providedIn: InjectorType<any> | 'root' | 'any' | null;
    /**
     * Factory method to execute to create an instance of the injectable.
     */
    factory: () => T;
    /**
     * In a case of no explicit injector, a location where the instance of the injectable is stored.
     */
    value: T | undefined;
}
/**
 * Information about the providers to be included in an `Injector` as well as how the given type
 * which carries the information should be created by the DI system.
 *
 * An `ɵInjectorDef` can import other types which have `InjectorDefs`, forming a deep nested
 * structure of providers with a defined priority (identically to how `NgModule`s also have
 * an import/dependency structure).
 *
 * @experimental
 */
export interface ɵInjectorDef<T> {
    factory: () => T;
    providers: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
    imports: (InjectorType<any> | InjectorTypeWithProviders<any>)[];
}
/**
 * A `Type` which has an `ɵInjectableDef` static field.
 *
 * `InjectableDefType`s contain their own Dependency Injection metadata and are usable in an
 * `ɵInjectorDef`-based `StaticInjector.
 *
 * @experimental
 */
export interface InjectableType<T> extends Type<T> {
    ngInjectableDef: ɵInjectableDef<T>;
}
/**
 * A type which has an `ɵInjectorDef` static field.
 *
 * `InjectorDefTypes` can be used to configure a `StaticInjector`.
 *
 * @experimental
 */
export interface InjectorType<T> extends Type<T> {
    ngInjectorDef: ɵInjectorDef<T>;
}
/**
 * Describes the `ɵInjectorDef` equivalent of a `ModuleWithProviders`, an `InjectorDefType` with an
 * associated array of providers.
 *
 * Objects of this type can be listed in the imports section of an `ɵInjectorDef`.
 *
 * @experimental
 */
export interface InjectorTypeWithProviders<T> {
    ngModule: InjectorType<T>;
    providers?: (Type<any> | ValueProvider | ExistingProvider | FactoryProvider | ConstructorProvider | StaticClassProvider | ClassProvider | any[])[];
}
/**
 * Construct an `ɵInjectableDef` which defines how a token will be constructed by the DI system, and
 * in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ngInjectableDef` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @experimental
 */
export declare function defineInjectable<T>(opts: {
    providedIn?: Type<any> | 'root' | 'any' | null;
    factory: () => T;
}): ɵInjectableDef<T>;
/**
 * Construct an `ɵInjectorDef` which configures an injector.
 *
 * This should be assigned to a static `ngInjectorDef` field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `factory`: an `InjectorType` is an instantiable type, so a zero argument `factory` function to
 *   create the type must be provided. If that factory function needs to inject arguments, it can
 *   use the `inject` function.
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has an `ngInjectableDef` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @experimental
 */
export declare function defineInjector(options: {
    factory: () => any;
    providers?: any[];
    imports?: any[];
}): ɵInjectorDef<any>;
