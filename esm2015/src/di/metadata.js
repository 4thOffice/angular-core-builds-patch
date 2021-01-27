/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { makeParamDecorator } from '../util/decorators';
import { attachInjectFlag } from './injector_compatibility';
const ɵ0 = (token) => ({ token });
/**
 * Inject decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Inject = attachInjectFlag(
// Disable tslint because `DecoratorFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
makeParamDecorator('Inject', ɵ0), -1 /* Inject */);
/**
 * Optional decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Optional = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
attachInjectFlag(makeParamDecorator('Optional'), 8 /* Optional */);
/**
 * Self decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Self = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
attachInjectFlag(makeParamDecorator('Self'), 2 /* Self */);
/**
 * `SkipSelf` decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const SkipSelf = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
attachInjectFlag(makeParamDecorator('SkipSelf'), 4 /* SkipSelf */);
/**
 * Host decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
export const Host = 
// Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
// tslint:disable-next-line: no-toplevel-property-access
attachInjectFlag(makeParamDecorator('Host'), 1 /* Host */);
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9tZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztXQW9EekIsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQztBQVQxRDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBb0IsZ0JBQWdCO0FBQ25ELDhFQUE4RTtBQUM5RSx3REFBd0Q7QUFDeEQsa0JBQWtCLENBQUMsUUFBUSxLQUE0QixrQkFBd0IsQ0FBQztBQW9DcEY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxRQUFRO0FBQ2pCLG1GQUFtRjtBQUNuRix3REFBd0Q7QUFDeEQsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLG1CQUErQixDQUFDO0FBdUNuRjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLElBQUk7QUFDYixtRkFBbUY7QUFDbkYsd0RBQXdEO0FBQ3hELGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxlQUEyQixDQUFDO0FBdUMzRTs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLFFBQVE7QUFDakIsbUZBQW1GO0FBQ25GLHdEQUF3RDtBQUN4RCxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsbUJBQStCLENBQUM7QUFrQ25GOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sSUFBSTtBQUNiLG1GQUFtRjtBQUNuRix3REFBd0Q7QUFDeEQsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLGVBQTJCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHttYWtlUGFyYW1EZWNvcmF0b3J9IGZyb20gJy4uL3V0aWwvZGVjb3JhdG9ycyc7XG5cbmltcG9ydCB7YXR0YWNoSW5qZWN0RmxhZ30gZnJvbSAnLi9pbmplY3Rvcl9jb21wYXRpYmlsaXR5JztcbmltcG9ydCB7RGVjb3JhdG9yRmxhZ3MsIEludGVybmFsSW5qZWN0RmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlL2luamVjdG9yJztcblxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIEluamVjdCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5qZWN0RGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFBhcmFtZXRlciBkZWNvcmF0b3Igb24gYSBkZXBlbmRlbmN5IHBhcmFtZXRlciBvZiBhIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAqIHRoYXQgc3BlY2lmaWVzIGEgY3VzdG9tIHByb3ZpZGVyIG9mIHRoZSBkZXBlbmRlbmN5LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgYSBjbGFzcyBjb25zdHJ1Y3RvciB0aGF0IHNwZWNpZmllcyBhXG4gICAqIGN1c3RvbSBwcm92aWRlciBvZiBhIGRlcGVuZGVuY3kgdXNpbmcgdGhlIHBhcmFtZXRlciBkZWNvcmF0b3IuXG4gICAqXG4gICAqIFdoZW4gYEBJbmplY3QoKWAgaXMgbm90IHByZXNlbnQsIHRoZSBpbmplY3RvciB1c2VzIHRoZSB0eXBlIGFubm90YXRpb24gb2YgdGhlXG4gICAqIHBhcmFtZXRlciBhcyB0aGUgcHJvdmlkZXIuXG4gICAqXG4gICAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50c1wiIHJlZ2lvbj1cIkluamVjdFdpdGhvdXREZWNvcmF0b3JcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEBzZWUgW1wiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIl0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24pXG4gICAqXG4gICAqL1xuICAodG9rZW46IGFueSk6IGFueTtcbiAgbmV3KHRva2VuOiBhbnkpOiBJbmplY3Q7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgSW5qZWN0IG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3Qge1xuICAvKipcbiAgICogQSBbREkgdG9rZW5dKGd1aWRlL2dsb3NzYXJ5I2RpLXRva2VuKSB0aGF0IG1hcHMgdG8gdGhlIGRlcGVuZGVuY3kgdG8gYmUgaW5qZWN0ZWQuXG4gICAqL1xuICB0b2tlbjogYW55O1xufVxuXG4vKipcbiAqIEluamVjdCBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuICpcbiAqIEBBbm5vdGF0aW9uXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBJbmplY3Q6IEluamVjdERlY29yYXRvciA9IGF0dGFjaEluamVjdEZsYWcoXG4gICAgLy8gRGlzYWJsZSB0c2xpbnQgYmVjYXVzZSBgRGVjb3JhdG9yRmxhZ3NgIGlzIGEgY29uc3QgZW51bSB3aGljaCBnZXRzIGlubGluZWQuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby10b3BsZXZlbC1wcm9wZXJ0eS1hY2Nlc3NcbiAgICBtYWtlUGFyYW1EZWNvcmF0b3IoJ0luamVjdCcsICh0b2tlbjogYW55KSA9PiAoe3Rva2VufSkpLCBEZWNvcmF0b3JGbGFncy5JbmplY3QpO1xuXG4vKipcbiAqIFR5cGUgb2YgdGhlIE9wdGlvbmFsIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbERlY29yYXRvciB7XG4gIC8qKlxuICAgKiBQYXJhbWV0ZXIgZGVjb3JhdG9yIHRvIGJlIHVzZWQgb24gY29uc3RydWN0b3IgcGFyYW1ldGVycyxcbiAgICogd2hpY2ggbWFya3MgdGhlIHBhcmFtZXRlciBhcyBiZWluZyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5LlxuICAgKiBUaGUgREkgZnJhbWV3b3JrIHByb3ZpZGVzIG51bGwgaWYgdGhlIGRlcGVuZGVuY3kgaXMgbm90IGZvdW5kLlxuICAgKlxuICAgKiBDYW4gYmUgdXNlZCB0b2dldGhlciB3aXRoIG90aGVyIHBhcmFtZXRlciBkZWNvcmF0b3JzXG4gICAqIHRoYXQgbW9kaWZ5IGhvdyBkZXBlbmRlbmN5IGluamVjdGlvbiBvcGVyYXRlcy5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBjb2RlIGFsbG93cyB0aGUgcG9zc2liaWxpdHkgb2YgYSBudWxsIHJlc3VsdDpcbiAgICpcbiAgICogPGNvZGUtZXhhbXBsZSBwYXRoPVwiY29yZS9kaS90cy9tZXRhZGF0YV9zcGVjLnRzXCIgcmVnaW9uPVwiT3B0aW9uYWxcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEBzZWUgW1wiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIl0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24pLlxuICAgKi9cbiAgKCk6IGFueTtcbiAgbmV3KCk6IE9wdGlvbmFsO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIE9wdGlvbmFsIG1ldGFkYXRhLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPcHRpb25hbCB7fVxuXG4vKipcbiAqIE9wdGlvbmFsIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IE9wdGlvbmFsOiBPcHRpb25hbERlY29yYXRvciA9XG4gICAgLy8gRGlzYWJsZSB0c2xpbnQgYmVjYXVzZSBgSW50ZXJuYWxJbmplY3RGbGFnc2AgaXMgYSBjb25zdCBlbnVtIHdoaWNoIGdldHMgaW5saW5lZC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXRvcGxldmVsLXByb3BlcnR5LWFjY2Vzc1xuICAgIGF0dGFjaEluamVjdEZsYWcobWFrZVBhcmFtRGVjb3JhdG9yKCdPcHRpb25hbCcpLCBJbnRlcm5hbEluamVjdEZsYWdzLk9wdGlvbmFsKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBTZWxmIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxmRGVjb3JhdG9yIHtcbiAgLyoqXG4gICAqIFBhcmFtZXRlciBkZWNvcmF0b3IgdG8gYmUgdXNlZCBvbiBjb25zdHJ1Y3RvciBwYXJhbWV0ZXJzLFxuICAgKiB3aGljaCB0ZWxscyB0aGUgREkgZnJhbWV3b3JrIHRvIHN0YXJ0IGRlcGVuZGVuY3kgcmVzb2x1dGlvbiBmcm9tIHRoZSBsb2NhbCBpbmplY3Rvci5cbiAgICpcbiAgICogUmVzb2x1dGlvbiB3b3JrcyB1cHdhcmQgdGhyb3VnaCB0aGUgaW5qZWN0b3IgaGllcmFyY2h5LCBzbyB0aGUgY2hpbGRyZW5cbiAgICogb2YgdGhpcyBjbGFzcyBtdXN0IGNvbmZpZ3VyZSB0aGVpciBvd24gcHJvdmlkZXJzIG9yIGJlIHByZXBhcmVkIGZvciBhIG51bGwgcmVzdWx0LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIHRoZSBkZXBlbmRlbmN5IGNhbiBiZSByZXNvbHZlZFxuICAgKiBieSB0aGUgbG9jYWwgaW5qZWN0b3Igd2hlbiBpbnN0YW50aWF0aW5nIHRoZSBjbGFzcyBpdHNlbGYsIGJ1dCBub3RcbiAgICogd2hlbiBpbnN0YW50aWF0aW5nIGEgY2hpbGQuXG4gICAqXG4gICAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50c1wiIHJlZ2lvbj1cIlNlbGZcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEBzZWUgYFNraXBTZWxmYFxuICAgKiBAc2VlIGBPcHRpb25hbGBcbiAgICpcbiAgICovXG4gICgpOiBhbnk7XG4gIG5ldygpOiBTZWxmO1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIFNlbGYgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGYge31cblxuLyoqXG4gKiBTZWxmIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFNlbGY6IFNlbGZEZWNvcmF0b3IgPVxuICAgIC8vIERpc2FibGUgdHNsaW50IGJlY2F1c2UgYEludGVybmFsSW5qZWN0RmxhZ3NgIGlzIGEgY29uc3QgZW51bSB3aGljaCBnZXRzIGlubGluZWQuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby10b3BsZXZlbC1wcm9wZXJ0eS1hY2Nlc3NcbiAgICBhdHRhY2hJbmplY3RGbGFnKG1ha2VQYXJhbURlY29yYXRvcignU2VsZicpLCBJbnRlcm5hbEluamVjdEZsYWdzLlNlbGYpO1xuXG5cbi8qKlxuICogVHlwZSBvZiB0aGUgYFNraXBTZWxmYCBkZWNvcmF0b3IgLyBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2tpcFNlbGZEZWNvcmF0b3Ige1xuICAvKipcbiAgICogUGFyYW1ldGVyIGRlY29yYXRvciB0byBiZSB1c2VkIG9uIGNvbnN0cnVjdG9yIHBhcmFtZXRlcnMsXG4gICAqIHdoaWNoIHRlbGxzIHRoZSBESSBmcmFtZXdvcmsgdG8gc3RhcnQgZGVwZW5kZW5jeSByZXNvbHV0aW9uIGZyb20gdGhlIHBhcmVudCBpbmplY3Rvci5cbiAgICogUmVzb2x1dGlvbiB3b3JrcyB1cHdhcmQgdGhyb3VnaCB0aGUgaW5qZWN0b3IgaGllcmFyY2h5LCBzbyB0aGUgbG9jYWwgaW5qZWN0b3JcbiAgICogaXMgbm90IGNoZWNrZWQgZm9yIGEgcHJvdmlkZXIuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqXG4gICAqIEluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgdGhlIGRlcGVuZGVuY3kgY2FuIGJlIHJlc29sdmVkIHdoZW5cbiAgICogaW5zdGFudGlhdGluZyBhIGNoaWxkLCBidXQgbm90IHdoZW4gaW5zdGFudGlhdGluZyB0aGUgY2xhc3MgaXRzZWxmLlxuICAgKlxuICAgKiA8Y29kZS1leGFtcGxlIHBhdGg9XCJjb3JlL2RpL3RzL21ldGFkYXRhX3NwZWMudHNcIiByZWdpb249XCJTa2lwU2VsZlwiPlxuICAgKiA8L2NvZGUtZXhhbXBsZT5cbiAgICpcbiAgICogQHNlZSBbRGVwZW5kZW5jeSBJbmplY3Rpb24gZ3VpZGVdKGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uLWluLWFjdGlvbiNza2lwKS5cbiAgICogQHNlZSBgU2VsZmBcbiAgICogQHNlZSBgT3B0aW9uYWxgXG4gICAqXG4gICAqL1xuICAoKTogYW55O1xuICBuZXcoKTogU2tpcFNlbGY7XG59XG5cbi8qKlxuICogVHlwZSBvZiB0aGUgYFNraXBTZWxmYCBtZXRhZGF0YS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2tpcFNlbGYge31cblxuLyoqXG4gKiBgU2tpcFNlbGZgIGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IFNraXBTZWxmOiBTa2lwU2VsZkRlY29yYXRvciA9XG4gICAgLy8gRGlzYWJsZSB0c2xpbnQgYmVjYXVzZSBgSW50ZXJuYWxJbmplY3RGbGFnc2AgaXMgYSBjb25zdCBlbnVtIHdoaWNoIGdldHMgaW5saW5lZC5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXRvcGxldmVsLXByb3BlcnR5LWFjY2Vzc1xuICAgIGF0dGFjaEluamVjdEZsYWcobWFrZVBhcmFtRGVjb3JhdG9yKCdTa2lwU2VsZicpLCBJbnRlcm5hbEluamVjdEZsYWdzLlNraXBTZWxmKTtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBgSG9zdGAgZGVjb3JhdG9yIC8gY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3REZWNvcmF0b3Ige1xuICAvKipcbiAgICogUGFyYW1ldGVyIGRlY29yYXRvciBvbiBhIHZpZXctcHJvdmlkZXIgcGFyYW1ldGVyIG9mIGEgY2xhc3MgY29uc3RydWN0b3JcbiAgICogdGhhdCB0ZWxscyB0aGUgREkgZnJhbWV3b3JrIHRvIHJlc29sdmUgdGhlIHZpZXcgYnkgY2hlY2tpbmcgaW5qZWN0b3JzIG9mIGNoaWxkXG4gICAqIGVsZW1lbnRzLCBhbmQgc3RvcCB3aGVuIHJlYWNoaW5nIHRoZSBob3N0IGVsZW1lbnQgb2YgdGhlIGN1cnJlbnQgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIHNob3dzIHVzZSB3aXRoIHRoZSBgQE9wdGlvbmFsYCBkZWNvcmF0b3IsIGFuZCBhbGxvd3MgZm9yIGEgbnVsbCByZXN1bHQuXG4gICAqXG4gICAqIDxjb2RlLWV4YW1wbGUgcGF0aD1cImNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50c1wiIHJlZ2lvbj1cIkhvc3RcIj5cbiAgICogPC9jb2RlLWV4YW1wbGU+XG4gICAqXG4gICAqIEZvciBhbiBleHRlbmRlZCBleGFtcGxlLCBzZWUgW1wiRGVwZW5kZW5jeSBJbmplY3Rpb25cbiAgICogR3VpZGVcIl0oZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24taW4tYWN0aW9uI29wdGlvbmFsKS5cbiAgICovXG4gICgpOiBhbnk7XG4gIG5ldygpOiBIb3N0O1xufVxuXG4vKipcbiAqIFR5cGUgb2YgdGhlIEhvc3QgbWV0YWRhdGEuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3Qge31cblxuLyoqXG4gKiBIb3N0IGRlY29yYXRvciBhbmQgbWV0YWRhdGEuXG4gKlxuICogQEFubm90YXRpb25cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IEhvc3Q6IEhvc3REZWNvcmF0b3IgPVxuICAgIC8vIERpc2FibGUgdHNsaW50IGJlY2F1c2UgYEludGVybmFsSW5qZWN0RmxhZ3NgIGlzIGEgY29uc3QgZW51bSB3aGljaCBnZXRzIGlubGluZWQuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby10b3BsZXZlbC1wcm9wZXJ0eS1hY2Nlc3NcbiAgICBhdHRhY2hJbmplY3RGbGFnKG1ha2VQYXJhbURlY29yYXRvcignSG9zdCcpLCBJbnRlcm5hbEluamVjdEZsYWdzLkhvc3QpOyJdfQ==