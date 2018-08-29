/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from './di';
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated ViewEncapsulation.Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @experimental
 */
export const APP_ID = new InjectionToken('AppId');
export function _appIdRandomProviderFactory() {
    return `${_randomChar()}${_randomChar()}${_randomChar()}`;
}
/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @experimental
 */
export const APP_ID_RANDOM_PROVIDER = {
    provide: APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: [],
};
function _randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 * @experimental
 */
export const PLATFORM_INITIALIZER = new InjectionToken('Platform Initializer');
/**
 * A token that indicates an opaque platform id.
 * @experimental
 */
export const PLATFORM_ID = new InjectionToken('Platform ID');
/**
 * All callbacks provided via this token will be called for every component that is bootstrapped.
 * Signature of the callback:
 *
 * `(componentRef: ComponentRef) => void`.
 *
 * @experimental
 */
export const APP_BOOTSTRAP_LISTENER = new InjectionToken('appBootstrapListener');
/**
 * A token which indicates the root directory of the application
 * @experimental
 */
export const PACKAGE_ROOT_URL = new InjectionToken('Application Packages Root URL');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fdG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvYXBwbGljYXRpb25fdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFJcEM7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFTLE9BQU8sQ0FBQyxDQUFDO0FBRTFELE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsT0FBTyxHQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDNUQsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHO0lBQ3BDLE9BQU8sRUFBRSxNQUFNO0lBQ2YsVUFBVSxFQUFFLDJCQUEyQjtJQUN2QyxJQUFJLEVBQVMsRUFBRTtDQUNoQixDQUFDO0FBRUYsU0FBUyxXQUFXO0lBQ2xCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxjQUFjLENBQW9CLHNCQUFzQixDQUFDLENBQUM7QUFFbEc7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBYyxDQUFTLGFBQWEsQ0FBQyxDQUFDO0FBRXJFOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FDL0IsSUFBSSxjQUFjLENBQThDLHNCQUFzQixDQUFDLENBQUM7QUFFNUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQVMsK0JBQStCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnLi9kaSc7XG5pbXBvcnQge0NvbXBvbmVudFJlZn0gZnJvbSAnLi9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnknO1xuXG5cbi8qKlxuICogQSBESSBUb2tlbiByZXByZXNlbnRpbmcgYSB1bmlxdWUgc3RyaW5nIGlkIGFzc2lnbmVkIHRvIHRoZSBhcHBsaWNhdGlvbiBieSBBbmd1bGFyIGFuZCB1c2VkXG4gKiBwcmltYXJpbHkgZm9yIHByZWZpeGluZyBhcHBsaWNhdGlvbiBhdHRyaWJ1dGVzIGFuZCBDU1Mgc3R5bGVzIHdoZW5cbiAqIHtAbGluayBWaWV3RW5jYXBzdWxhdGlvbiNFbXVsYXRlZCBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZH0gaXMgYmVpbmcgdXNlZC5cbiAqXG4gKiBJZiB5b3UgbmVlZCB0byBhdm9pZCByYW5kb21seSBnZW5lcmF0ZWQgdmFsdWUgdG8gYmUgdXNlZCBhcyBhbiBhcHBsaWNhdGlvbiBpZCwgeW91IGNhbiBwcm92aWRlXG4gKiBhIGN1c3RvbSB2YWx1ZSB2aWEgYSBESSBwcm92aWRlciA8IS0tIFRPRE86IHByb3ZpZGVyIC0tPiBjb25maWd1cmluZyB0aGUgcm9vdCB7QGxpbmsgSW5qZWN0b3J9XG4gKiB1c2luZyB0aGlzIHRva2VuLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgQVBQX0lEID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0FwcElkJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfYXBwSWRSYW5kb21Qcm92aWRlckZhY3RvcnkoKSB7XG4gIHJldHVybiBgJHtfcmFuZG9tQ2hhcigpfSR7X3JhbmRvbUNoYXIoKX0ke19yYW5kb21DaGFyKCl9YDtcbn1cblxuLyoqXG4gKiBQcm92aWRlcnMgdGhhdCB3aWxsIGdlbmVyYXRlIGEgcmFuZG9tIEFQUF9JRF9UT0tFTi5cbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9JRF9SQU5ET01fUFJPVklERVIgPSB7XG4gIHByb3ZpZGU6IEFQUF9JRCxcbiAgdXNlRmFjdG9yeTogX2FwcElkUmFuZG9tUHJvdmlkZXJGYWN0b3J5LFxuICBkZXBzOiA8YW55W10+W10sXG59O1xuXG5mdW5jdGlvbiBfcmFuZG9tQ2hhcigpOiBzdHJpbmcge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg5NyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1KSk7XG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiBhIHBsYXRmb3JtIGlzIGluaXRpYWxpemVkLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgUExBVEZPUk1fSU5JVElBTElaRVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXJyYXk8KCkgPT4gdm9pZD4+KCdQbGF0Zm9ybSBJbml0aWFsaXplcicpO1xuXG4vKipcbiAqIEEgdG9rZW4gdGhhdCBpbmRpY2F0ZXMgYW4gb3BhcXVlIHBsYXRmb3JtIGlkLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgUExBVEZPUk1fSUQgPSBuZXcgSW5qZWN0aW9uVG9rZW48T2JqZWN0PignUGxhdGZvcm0gSUQnKTtcblxuLyoqXG4gKiBBbGwgY2FsbGJhY2tzIHByb3ZpZGVkIHZpYSB0aGlzIHRva2VuIHdpbGwgYmUgY2FsbGVkIGZvciBldmVyeSBjb21wb25lbnQgdGhhdCBpcyBib290c3RyYXBwZWQuXG4gKiBTaWduYXR1cmUgb2YgdGhlIGNhbGxiYWNrOlxuICpcbiAqIGAoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWYpID0+IHZvaWRgLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IEFQUF9CT09UU1RSQVBfTElTVEVORVIgPVxuICAgIG5ldyBJbmplY3Rpb25Ub2tlbjxBcnJheTwoY29tcFJlZjogQ29tcG9uZW50UmVmPGFueT4pID0+IHZvaWQ+PignYXBwQm9vdHN0cmFwTGlzdGVuZXInKTtcblxuLyoqXG4gKiBBIHRva2VuIHdoaWNoIGluZGljYXRlcyB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhlIGFwcGxpY2F0aW9uXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBjb25zdCBQQUNLQUdFX1JPT1RfVVJMID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ0FwcGxpY2F0aW9uIFBhY2thZ2VzIFJvb3QgVVJMJyk7XG4iXX0=