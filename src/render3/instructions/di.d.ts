/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectFlags, InjectionToken } from '../../di';
import { Type } from '../../interface/type';
/**
 * Returns the value associated to the given token from the injectors.
 *
 * `directiveInject` is intended to be used for directive, component and pipe factories.
 *  All other injection use `inject` which does not walk the node injector tree.
 *
 * Usage example (in factory function):
 *
 * ```ts
 * class SomeDirective {
 *   constructor(directive: DirectiveA) {}
 *
 *   static ngDirectiveDef = ΔdefineDirective({
 *     type: SomeDirective,
 *     factory: () => new SomeDirective(ΔdirectiveInject(DirectiveA))
 *   });
 * }
 * ```
 * @param token the type or token to inject
 * @param flags Injection flags
 * @returns the value from the injector or `null` when not found
 *
 * @codeGenApi
 */
export declare function ΔdirectiveInject<T>(token: Type<T> | InjectionToken<T>): T;
export declare function ΔdirectiveInject<T>(token: Type<T> | InjectionToken<T>, flags: InjectFlags): T;
/**
 * Facade for the attribute injection from DI.
 *
 * @codeGenApi
 */
export declare function ΔinjectAttribute(attrNameToInject: string): string | null;
