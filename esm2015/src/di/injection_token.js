/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defineInjectable } from './defs';
/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parametrized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * When creating an `InjectionToken`, you can optionally specify a factory function which returns
 * (possibly by creating) a default value of the parameterized type `T`. This sets up the
 * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
 * application's root injector. If the factory function, which takes zero arguments, needs to inject
 * dependencies, it can do so using the `inject` function. See below for an example.
 *
 * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
 * overrides the above behavior and marks the token as belonging to a particular `@NgModule`. As
 * mentioned above, `'root'` is the default value for `providedIn`.
 *
 * @usageNotes
 * ### Basic Example
 *
 * #### Plain InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * #### Tree-shakable InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 */
export class InjectionToken {
    constructor(_desc, options) {
        this._desc = _desc;
        /** @internal */
        this.ngMetadataName = 'InjectionToken';
        if (options !== undefined) {
            this.ngInjectableDef = defineInjectable({
                providedIn: options.providedIn || 'root',
                factory: options.factory,
            });
        }
        else {
            this.ngInjectableDef = undefined;
        }
    }
    toString() { return `InjectionToken ${this._desc}`; }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uX3Rva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGkvaW5qZWN0aW9uX3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUlILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILE1BQU0sT0FBTyxjQUFjO0lBTXpCLFlBQXNCLEtBQWEsRUFBRSxPQUdwQztRQUhxQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTG5DLGdCQUFnQjtRQUNQLG1CQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFRekMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ3RDLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxJQUFJLE1BQU07Z0JBQ3hDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTzthQUN6QixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsUUFBUSxLQUFhLE9BQU8sa0JBQWtCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDOUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5cbmltcG9ydCB7ZGVmaW5lSW5qZWN0YWJsZX0gZnJvbSAnLi9kZWZzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCBpbiBhIERJIFByb3ZpZGVyLlxuICpcbiAqIFVzZSBhbiBgSW5qZWN0aW9uVG9rZW5gIHdoZW5ldmVyIHRoZSB0eXBlIHlvdSBhcmUgaW5qZWN0aW5nIGlzIG5vdCByZWlmaWVkIChkb2VzIG5vdCBoYXZlIGFcbiAqIHJ1bnRpbWUgcmVwcmVzZW50YXRpb24pIHN1Y2ggYXMgd2hlbiBpbmplY3RpbmcgYW4gaW50ZXJmYWNlLCBjYWxsYWJsZSB0eXBlLCBhcnJheSBvclxuICogcGFyYW1ldHJpemVkIHR5cGUuXG4gKlxuICogYEluamVjdGlvblRva2VuYCBpcyBwYXJhbWV0ZXJpemVkIG9uIGBUYCB3aGljaCBpcyB0aGUgdHlwZSBvZiBvYmplY3Qgd2hpY2ggd2lsbCBiZSByZXR1cm5lZCBieVxuICogdGhlIGBJbmplY3RvcmAuIFRoaXMgcHJvdmlkZXMgYWRkaXRpb25hbCBsZXZlbCBvZiB0eXBlIHNhZmV0eS5cbiAqXG4gKiBgYGBcbiAqIGludGVyZmFjZSBNeUludGVyZmFjZSB7Li4ufVxuICogdmFyIG15SW50ZXJmYWNlID0gaW5qZWN0b3IuZ2V0KG5ldyBJbmplY3Rpb25Ub2tlbjxNeUludGVyZmFjZT4oJ1NvbWVUb2tlbicpKTtcbiAqIC8vIG15SW50ZXJmYWNlIGlzIGluZmVycmVkIHRvIGJlIE15SW50ZXJmYWNlLlxuICogYGBgXG4gKlxuICogV2hlbiBjcmVhdGluZyBhbiBgSW5qZWN0aW9uVG9rZW5gLCB5b3UgY2FuIG9wdGlvbmFsbHkgc3BlY2lmeSBhIGZhY3RvcnkgZnVuY3Rpb24gd2hpY2ggcmV0dXJuc1xuICogKHBvc3NpYmx5IGJ5IGNyZWF0aW5nKSBhIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHBhcmFtZXRlcml6ZWQgdHlwZSBgVGAuIFRoaXMgc2V0cyB1cCB0aGVcbiAqIGBJbmplY3Rpb25Ub2tlbmAgdXNpbmcgdGhpcyBmYWN0b3J5IGFzIGEgcHJvdmlkZXIgYXMgaWYgaXQgd2FzIGRlZmluZWQgZXhwbGljaXRseSBpbiB0aGVcbiAqIGFwcGxpY2F0aW9uJ3Mgcm9vdCBpbmplY3Rvci4gSWYgdGhlIGZhY3RvcnkgZnVuY3Rpb24sIHdoaWNoIHRha2VzIHplcm8gYXJndW1lbnRzLCBuZWVkcyB0byBpbmplY3RcbiAqIGRlcGVuZGVuY2llcywgaXQgY2FuIGRvIHNvIHVzaW5nIHRoZSBgaW5qZWN0YCBmdW5jdGlvbi4gU2VlIGJlbG93IGZvciBhbiBleGFtcGxlLlxuICpcbiAqIEFkZGl0aW9uYWxseSwgaWYgYSBgZmFjdG9yeWAgaXMgc3BlY2lmaWVkIHlvdSBjYW4gYWxzbyBzcGVjaWZ5IHRoZSBgcHJvdmlkZWRJbmAgb3B0aW9uLCB3aGljaFxuICogb3ZlcnJpZGVzIHRoZSBhYm92ZSBiZWhhdmlvciBhbmQgbWFya3MgdGhlIHRva2VuIGFzIGJlbG9uZ2luZyB0byBhIHBhcnRpY3VsYXIgYEBOZ01vZHVsZWAuIEFzXG4gKiBtZW50aW9uZWQgYWJvdmUsIGAncm9vdCdgIGlzIHRoZSBkZWZhdWx0IHZhbHVlIGZvciBgcHJvdmlkZWRJbmAuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBCYXNpYyBFeGFtcGxlXG4gKlxuICogIyMjIyBQbGFpbiBJbmplY3Rpb25Ub2tlblxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL2luamVjdG9yX3NwZWMudHMgcmVnaW9uPSdJbmplY3Rpb25Ub2tlbid9XG4gKlxuICogIyMjIyBUcmVlLXNoYWthYmxlIEluamVjdGlvblRva2VuXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvaW5qZWN0b3Jfc3BlYy50cyByZWdpb249J1NoYWthYmxlSW5qZWN0aW9uVG9rZW4nfVxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEluamVjdGlvblRva2VuPFQ+IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZWFkb25seSBuZ01ldGFkYXRhTmFtZSA9ICdJbmplY3Rpb25Ub2tlbic7XG5cbiAgcmVhZG9ubHkgbmdJbmplY3RhYmxlRGVmOiBuZXZlcnx1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9kZXNjOiBzdHJpbmcsIG9wdGlvbnM/OiB7XG4gICAgcHJvdmlkZWRJbj86IFR5cGU8YW55PnwgJ3Jvb3QnIHwgbnVsbCxcbiAgICBmYWN0b3J5OiAoKSA9PiBUXG4gIH0pIHtcbiAgICBpZiAob3B0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm5nSW5qZWN0YWJsZURlZiA9IGRlZmluZUluamVjdGFibGUoe1xuICAgICAgICBwcm92aWRlZEluOiBvcHRpb25zLnByb3ZpZGVkSW4gfHwgJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBvcHRpb25zLmZhY3RvcnksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZ0luamVjdGFibGVEZWYgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIGBJbmplY3Rpb25Ub2tlbiAke3RoaXMuX2Rlc2N9YDsgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVEZWZUb2tlbjxUPiBleHRlbmRzIEluamVjdGlvblRva2VuPFQ+IHsgbmdJbmplY3RhYmxlRGVmOiBuZXZlcjsgfVxuIl19