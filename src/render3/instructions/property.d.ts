import { SanitizerFn } from '../interfaces/sanitization';
import { LView } from '../interfaces/view';
import { NO_CHANGE } from '../tokens';
import { TsickleIssue1009 } from './shared';
/**
 * Update a property on a selected element.
 *
 * Operates on the element selected by index via the {@link select} instruction.
 *
 * If the property name also exists as an input property on one of the element's directives,
 * the component property will be set instead of the element property. This check must
 * be conducted at runtime so child components that add new `@Inputs` don't have to be re-compiled
 *
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @param nativeOnly Whether or not we should only set native properties and skip input check
 * (this is necessary for host property bindings)
 * @returns This function returns itself so that it may be chained
 * (e.g. `property('name', ctx.name)('title', ctx.title)`)
 *
 * @codeGenApi
 */
export declare function ɵɵproperty<T>(propName: string, value: T, sanitizer?: SanitizerFn | null, nativeOnly?: boolean): TsickleIssue1009;
/**
 * Creates a single value binding.
 *
 * @param lView Current view
 * @param value Value to diff
 */
export declare function bind<T>(lView: LView, value: T): T | NO_CHANGE;
/**
 * Updates a synthetic host binding (e.g. `[@foo]`) on a component.
 *
 * This instruction is for compatibility purposes and is designed to ensure that a
 * synthetic host binding (e.g. `@HostBinding('@foo')`) properly gets rendered in
 * the component's renderer. Normally all host bindings are evaluated with the parent
 * component's renderer, but, in the case of animation @triggers, they need to be
 * evaluated with the sub component's renderer (because that's where the animation
 * triggers are defined).
 *
 * Do not use this instruction as a replacement for `elementProperty`. This instruction
 * only exists to ensure compatibility with the ViewEngine's host binding behavior.
 *
 * @param index The index of the element to update in the data array
 * @param propName Name of property. Because it is going to DOM, this is not subject to
 *        renaming as part of minification.
 * @param value New value to write.
 * @param sanitizer An optional function used to sanitize the value.
 * @param nativeOnly Whether or not we should only set native properties and skip input check
 * (this is necessary for host property bindings)
 *
 * @codeGenApi
 */
export declare function ɵɵupdateSyntheticHostBinding<T>(propName: string, value: T | NO_CHANGE, sanitizer?: SanitizerFn | null, nativeOnly?: boolean): TsickleIssue1009;
