import { DebugContext } from './debug_context';
/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'parent',
 *   template: '<child [prop]="parentProp"></child>',
 * })
 * class Parent {
 *   parentProp = 'init';
 * }
 *
 * @Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedError
 *     this.parent.parentProp = 'updated';
 *   }
 * }
 * ```
 */
export declare function expressionChangedAfterItHasBeenCheckedError(oldValue: any, currValue: any, isFirstCheck: boolean): Error;
/**
 * Thrown when an exception was raised during view creation, change detection or destruction.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 */
export declare function viewWrappedError(originalError: any, context: DebugContext): Error;
/**
* Thrown when a destroyed view is used.
*
* This error indicates a bug in the framework.
*
* This is an internal Angular error.
*/
export declare function viewDestroyedError(details: string): Error;
