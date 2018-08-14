/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, Directive, NgModule, Pipe, PlatformRef, Type } from '@angular/core';
import { ComponentFixture } from './component_fixture';
import { MetadataOverride } from './metadata_override';
import { TestModuleMetadata } from './test_bed_common';
/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export declare class TestBedRender3 {
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @experimental
     */
    static initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): TestBedRender3;
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    static resetTestEnvironment(): void;
    static configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): typeof TestBedRender3;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef: TestModuleMetadata): typeof TestBedRender3;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents(): Promise<any>;
    static overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): typeof TestBedRender3;
    static overrideComponent(component: Type<any>, override: MetadataOverride<Component>): typeof TestBedRender3;
    static overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): typeof TestBedRender3;
    static overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): typeof TestBedRender3;
    static overrideTemplate(component: Type<any>, template: string): typeof TestBedRender3;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component: Type<any>, template: string): typeof TestBedRender3;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    static overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): typeof TestBedRender3;
    static overrideProvider(token: any, provider: {
        useValue: any;
    }): typeof TestBedRender3;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     *
     * @deprecated as it makes all NgModules lazy. Introduced only for migrating off of it.
     */
    static deprecatedOverrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): void;
    static deprecatedOverrideProvider(token: any, provider: {
        useValue: any;
    }): void;
    static get(token: any, notFoundValue?: any): any;
    static createComponent<T>(component: Type<T>): ComponentFixture<T>;
    static resetTestingModule(): typeof TestBedRender3;
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    private _moduleOverrides;
    private _componentOverrides;
    private _directiveOverrides;
    private _pipeOverrides;
    private _providerOverrides;
    private _rootProviderOverrides;
    private _providers;
    private _declarations;
    private _imports;
    private _schemas;
    private _activeFixtures;
    private _moduleRef;
    private _instantiated;
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @experimental
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): void;
    /**
     * Reset the providers for the test injector.
     *
     * @experimental
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     *
     * @deprecated as it makes all NgModules lazy. Introduced only for migrating off of it.
     */
    deprecatedOverrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): void;
    deprecatedOverrideProvider(token: any, provider: {
        useValue: any;
    }): void;
    createComponent<T>(type: Type<T>): ComponentFixture<T>;
    private _initIfNeeded;
    private _getResolvers;
    private _assertNotInstantiated;
    private _createTestModule;
}
export declare function _getTestBedRender3(): TestBedRender3;
