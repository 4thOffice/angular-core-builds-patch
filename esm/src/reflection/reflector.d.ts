import { Type } from '../../src/facade/lang';
import { SetterFn, GetterFn, MethodFn } from './types';
import { ReflectorReader } from './reflector_reader';
import { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
export { SetterFn, GetterFn, MethodFn } from './types';
export { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export declare class ReflectionInfo {
    annotations: any[];
    parameters: any[][];
    factory: Function;
    interfaces: any[];
    propMetadata: {
        [key: string]: any[];
    };
    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
        [key: string]: any[];
    });
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export declare class Reflector extends ReflectorReader {
    /** @internal */
    _injectableInfo: Map<any, ReflectionInfo>;
    /** @internal */
    _getters: Map<string, (obj: any) => any>;
    /** @internal */
    _setters: Map<string, (obj: any, value: any) => void>;
    /** @internal */
    _methods: Map<string, (obj: any, args: any[]) => any>;
    /** @internal */
    _usedKeys: Set<any>;
    reflectionCapabilities: PlatformReflectionCapabilities;
    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
    updateCapabilities(caps: PlatformReflectionCapabilities): void;
    isReflectionEnabled(): boolean;
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage(): void;
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys(): any[];
    registerFunction(func: Function, funcInfo: ReflectionInfo): void;
    registerType(type: Type, typeInfo: ReflectionInfo): void;
    registerGetters(getters: {
        [key: string]: GetterFn;
    }): void;
    registerSetters(setters: {
        [key: string]: SetterFn;
    }): void;
    registerMethods(methods: {
        [key: string]: MethodFn;
    }): void;
    factory(type: Type): Function;
    parameters(typeOrFunc: any): any[][];
    annotations(typeOrFunc: any): any[];
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    interfaces(type: any): any[];
    hasLifecycleHook(type: any, lcInterface: any, lcProperty: string): boolean;
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    /** @internal */
    _getReflectionInfo(typeOrFunc: any): ReflectionInfo;
    /** @internal */
    _containsReflectionInfo(typeOrFunc: any): boolean;
    importUri(type: any): string;
}
