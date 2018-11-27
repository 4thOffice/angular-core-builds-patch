/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
const BRAND = '__SANITIZER_TRUSTED_BRAND__';
/** @enum {string} */
var BypassType = {
    Url: 'Url',
    Html: 'Html',
    ResourceUrl: 'ResourceUrl',
    Script: 'Script',
    Style: 'Style',
};
export { BypassType };
/**
 * A branded trusted string used with sanitization.
 *
 * See: {\@link TrustedHtmlString}, {\@link TrustedResourceUrlString}, {\@link TrustedScriptString},
 * {\@link TrustedStyleString}, {\@link TrustedUrlString}
 * @record
 */
export function TrustedString() { }
/**
 * A branded trusted string used with sanitization of `html` strings.
 *
 * See: {\@link bypassSanitizationTrustHtml} and {\@link htmlSanitizer}.
 * @record
 */
export function TrustedHtmlString() { }
/**
 * A branded trusted string used with sanitization of `style` strings.
 *
 * See: {\@link bypassSanitizationTrustStyle} and {\@link styleSanitizer}.
 * @record
 */
export function TrustedStyleString() { }
/**
 * A branded trusted string used with sanitization of `url` strings.
 *
 * See: {\@link bypassSanitizationTrustScript} and {\@link scriptSanitizer}.
 * @record
 */
export function TrustedScriptString() { }
/**
 * A branded trusted string used with sanitization of `url` strings.
 *
 * See: {\@link bypassSanitizationTrustUrl} and {\@link urlSanitizer}.
 * @record
 */
export function TrustedUrlString() { }
/**
 * A branded trusted string used with sanitization of `resourceUrl` strings.
 *
 * See: {\@link bypassSanitizationTrustResourceUrl} and {\@link resourceUrlSanitizer}.
 * @record
 */
export function TrustedResourceUrlString() { }
/**
 * @param {?} value
 * @param {?} type
 * @return {?}
 */
export function allowSanitizationBypass(value, type) {
    return (value instanceof String && (/** @type {?} */ (value))[BRAND] === type);
}
/**
 * Mark `html` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link htmlSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedHtml `html` string which needs to be implicitly trusted.
 * @return {?} a `html` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustHtml(trustedHtml) {
    return bypassSanitizationTrustString(trustedHtml, "Html" /* Html */);
}
/**
 * Mark `style` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link styleSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedStyle `style` string which needs to be implicitly trusted.
 * @return {?} a `style` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustStyle(trustedStyle) {
    return bypassSanitizationTrustString(trustedStyle, "Style" /* Style */);
}
/**
 * Mark `script` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link scriptSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedScript `script` string which needs to be implicitly trusted.
 * @return {?} a `script` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustScript(trustedScript) {
    return bypassSanitizationTrustString(trustedScript, "Script" /* Script */);
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link urlSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedUrl `url` string which needs to be implicitly trusted.
 * @return {?} a `url` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustUrl(trustedUrl) {
    return bypassSanitizationTrustString(trustedUrl, "Url" /* Url */);
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {\@link resourceUrlSanitizer} to be trusted implicitly.
 *
 * @param {?} trustedResourceUrl `url` string which needs to be implicitly trusted.
 * @return {?} a `url` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustResourceUrl(trustedResourceUrl) {
    return bypassSanitizationTrustString(trustedResourceUrl, "ResourceUrl" /* ResourceUrl */);
}
/**
 * @param {?} trustedString
 * @param {?} mode
 * @return {?}
 */
function bypassSanitizationTrustString(trustedString, mode) {
    /** @type {?} */
    const trusted = /** @type {?} */ (new String(trustedString));
    trusted[BRAND] = mode;
    return trusted;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnlwYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvc2FuaXRpemF0aW9uL2J5cGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLEtBQUssR0FBRyw2QkFBNkIsQ0FBQzs7O0lBRzFDLEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTtJQUNiLGFBQWMsYUFBYTtJQUMzQixRQUFTLFFBQVE7SUFDakIsT0FBUSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4Q2pCLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxLQUFVLEVBQUUsSUFBZ0I7SUFDbEUsT0FBTyxDQUFDLEtBQUssWUFBWSxNQUFNLElBQUksbUJBQUMsS0FBMkIsRUFBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0NBQ25GOzs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFdBQW1CO0lBQzdELE9BQU8sNkJBQTZCLENBQUMsV0FBVyxvQkFBa0IsQ0FBQztDQUNwRTs7Ozs7Ozs7OztBQVVELE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxZQUFvQjtJQUMvRCxPQUFPLDZCQUE2QixDQUFDLFlBQVksc0JBQW1CLENBQUM7Q0FDdEU7Ozs7Ozs7Ozs7QUFVRCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsYUFBcUI7SUFDakUsT0FBTyw2QkFBNkIsQ0FBQyxhQUFhLHdCQUFvQixDQUFDO0NBQ3hFOzs7Ozs7Ozs7O0FBVUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLFVBQWtCO0lBQzNELE9BQU8sNkJBQTZCLENBQUMsVUFBVSxrQkFBaUIsQ0FBQztDQUNsRTs7Ozs7Ozs7OztBQVVELE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxrQkFBMEI7SUFFM0UsT0FBTyw2QkFBNkIsQ0FBQyxrQkFBa0Isa0NBQXlCLENBQUM7Q0FDbEY7Ozs7OztBQWFELFNBQVMsNkJBQTZCLENBQUMsYUFBcUIsRUFBRSxJQUFnQjs7SUFDNUUsTUFBTSxPQUFPLHFCQUFHLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBa0IsRUFBQztJQUMzRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0NBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCBCUkFORCA9ICdfX1NBTklUSVpFUl9UUlVTVEVEX0JSQU5EX18nO1xuXG5leHBvcnQgY29uc3QgZW51bSBCeXBhc3NUeXBlIHtcbiAgVXJsID0gJ1VybCcsXG4gIEh0bWwgPSAnSHRtbCcsXG4gIFJlc291cmNlVXJsID0gJ1Jlc291cmNlVXJsJyxcbiAgU2NyaXB0ID0gJ1NjcmlwdCcsXG4gIFN0eWxlID0gJ1N0eWxlJyxcbn1cblxuLyoqXG4gKiBBIGJyYW5kZWQgdHJ1c3RlZCBzdHJpbmcgdXNlZCB3aXRoIHNhbml0aXphdGlvbi5cbiAqXG4gKiBTZWU6IHtAbGluayBUcnVzdGVkSHRtbFN0cmluZ30sIHtAbGluayBUcnVzdGVkUmVzb3VyY2VVcmxTdHJpbmd9LCB7QGxpbmsgVHJ1c3RlZFNjcmlwdFN0cmluZ30sXG4gKiB7QGxpbmsgVHJ1c3RlZFN0eWxlU3RyaW5nfSwge0BsaW5rIFRydXN0ZWRVcmxTdHJpbmd9XG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1c3RlZFN0cmluZyBleHRlbmRzIFN0cmluZyB7IFtCUkFORF06IEJ5cGFzc1R5cGU7IH1cblxuLyoqXG4gKiBBIGJyYW5kZWQgdHJ1c3RlZCBzdHJpbmcgdXNlZCB3aXRoIHNhbml0aXphdGlvbiBvZiBgaHRtbGAgc3RyaW5ncy5cbiAqXG4gKiBTZWU6IHtAbGluayBieXBhc3NTYW5pdGl6YXRpb25UcnVzdEh0bWx9IGFuZCB7QGxpbmsgaHRtbFNhbml0aXplcn0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1c3RlZEh0bWxTdHJpbmcgZXh0ZW5kcyBUcnVzdGVkU3RyaW5nIHsgW0JSQU5EXTogQnlwYXNzVHlwZS5IdG1sOyB9XG5cbi8qKlxuICogQSBicmFuZGVkIHRydXN0ZWQgc3RyaW5nIHVzZWQgd2l0aCBzYW5pdGl6YXRpb24gb2YgYHN0eWxlYCBzdHJpbmdzLlxuICpcbiAqIFNlZToge0BsaW5rIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3R5bGV9IGFuZCB7QGxpbmsgc3R5bGVTYW5pdGl6ZXJ9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRydXN0ZWRTdHlsZVN0cmluZyBleHRlbmRzIFRydXN0ZWRTdHJpbmcgeyBbQlJBTkRdOiBCeXBhc3NUeXBlLlN0eWxlOyB9XG5cbi8qKlxuICogQSBicmFuZGVkIHRydXN0ZWQgc3RyaW5nIHVzZWQgd2l0aCBzYW5pdGl6YXRpb24gb2YgYHVybGAgc3RyaW5ncy5cbiAqXG4gKiBTZWU6IHtAbGluayBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFNjcmlwdH0gYW5kIHtAbGluayBzY3JpcHRTYW5pdGl6ZXJ9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRydXN0ZWRTY3JpcHRTdHJpbmcgZXh0ZW5kcyBUcnVzdGVkU3RyaW5nIHsgW0JSQU5EXTogQnlwYXNzVHlwZS5TY3JpcHQ7IH1cblxuLyoqXG4gKiBBIGJyYW5kZWQgdHJ1c3RlZCBzdHJpbmcgdXNlZCB3aXRoIHNhbml0aXphdGlvbiBvZiBgdXJsYCBzdHJpbmdzLlxuICpcbiAqIFNlZToge0BsaW5rIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsfSBhbmQge0BsaW5rIHVybFNhbml0aXplcn0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1c3RlZFVybFN0cmluZyBleHRlbmRzIFRydXN0ZWRTdHJpbmcgeyBbQlJBTkRdOiBCeXBhc3NUeXBlLlVybDsgfVxuXG4vKipcbiAqIEEgYnJhbmRlZCB0cnVzdGVkIHN0cmluZyB1c2VkIHdpdGggc2FuaXRpemF0aW9uIG9mIGByZXNvdXJjZVVybGAgc3RyaW5ncy5cbiAqXG4gKiBTZWU6IHtAbGluayBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFJlc291cmNlVXJsfSBhbmQge0BsaW5rIHJlc291cmNlVXJsU2FuaXRpemVyfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcnVzdGVkUmVzb3VyY2VVcmxTdHJpbmcgZXh0ZW5kcyBUcnVzdGVkU3RyaW5nIHsgW0JSQU5EXTogQnlwYXNzVHlwZS5SZXNvdXJjZVVybDsgfVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsb3dTYW5pdGl6YXRpb25CeXBhc3ModmFsdWU6IGFueSwgdHlwZTogQnlwYXNzVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nICYmICh2YWx1ZSBhcyBUcnVzdGVkU3R5bGVTdHJpbmcpW0JSQU5EXSA9PT0gdHlwZSk7XG59XG5cbi8qKlxuICogTWFyayBgaHRtbGAgc3RyaW5nIGFzIHRydXN0ZWQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3cmFwcyB0aGUgdHJ1c3RlZCBzdHJpbmcgaW4gYFN0cmluZ2AgYW5kIGJyYW5kcyBpdCBpbiBhIHdheSB3aGljaCBtYWtlcyBpdFxuICogcmVjb2duaXphYmxlIHRvIHtAbGluayBodG1sU2FuaXRpemVyfSB0byBiZSB0cnVzdGVkIGltcGxpY2l0bHkuXG4gKlxuICogQHBhcmFtIHRydXN0ZWRIdG1sIGBodG1sYCBzdHJpbmcgd2hpY2ggbmVlZHMgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICogQHJldHVybnMgYSBgaHRtbGAgYFN0cmluZ2Agd2hpY2ggaGFzIGJlZW4gYnJhbmRlZCB0byBiZSBpbXBsaWNpdGx5IHRydXN0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdEh0bWwodHJ1c3RlZEh0bWw6IHN0cmluZyk6IFRydXN0ZWRIdG1sU3RyaW5nIHtcbiAgcmV0dXJuIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKHRydXN0ZWRIdG1sLCBCeXBhc3NUeXBlLkh0bWwpO1xufVxuLyoqXG4gKiBNYXJrIGBzdHlsZWAgc3RyaW5nIGFzIHRydXN0ZWQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3cmFwcyB0aGUgdHJ1c3RlZCBzdHJpbmcgaW4gYFN0cmluZ2AgYW5kIGJyYW5kcyBpdCBpbiBhIHdheSB3aGljaCBtYWtlcyBpdFxuICogcmVjb2duaXphYmxlIHRvIHtAbGluayBzdHlsZVNhbml0aXplcn0gdG8gYmUgdHJ1c3RlZCBpbXBsaWNpdGx5LlxuICpcbiAqIEBwYXJhbSB0cnVzdGVkU3R5bGUgYHN0eWxlYCBzdHJpbmcgd2hpY2ggbmVlZHMgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICogQHJldHVybnMgYSBgc3R5bGVgIGBTdHJpbmdgIHdoaWNoIGhhcyBiZWVuIGJyYW5kZWQgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZSh0cnVzdGVkU3R5bGU6IHN0cmluZyk6IFRydXN0ZWRTdHlsZVN0cmluZyB7XG4gIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyh0cnVzdGVkU3R5bGUsIEJ5cGFzc1R5cGUuU3R5bGUpO1xufVxuLyoqXG4gKiBNYXJrIGBzY3JpcHRgIHN0cmluZyBhcyB0cnVzdGVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd3JhcHMgdGhlIHRydXN0ZWQgc3RyaW5nIGluIGBTdHJpbmdgIGFuZCBicmFuZHMgaXQgaW4gYSB3YXkgd2hpY2ggbWFrZXMgaXRcbiAqIHJlY29nbml6YWJsZSB0byB7QGxpbmsgc2NyaXB0U2FuaXRpemVyfSB0byBiZSB0cnVzdGVkIGltcGxpY2l0bHkuXG4gKlxuICogQHBhcmFtIHRydXN0ZWRTY3JpcHQgYHNjcmlwdGAgc3RyaW5nIHdoaWNoIG5lZWRzIHRvIGJlIGltcGxpY2l0bHkgdHJ1c3RlZC5cbiAqIEByZXR1cm5zIGEgYHNjcmlwdGAgYFN0cmluZ2Agd2hpY2ggaGFzIGJlZW4gYnJhbmRlZCB0byBiZSBpbXBsaWNpdGx5IHRydXN0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFNjcmlwdCh0cnVzdGVkU2NyaXB0OiBzdHJpbmcpOiBUcnVzdGVkU2NyaXB0U3RyaW5nIHtcbiAgcmV0dXJuIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKHRydXN0ZWRTY3JpcHQsIEJ5cGFzc1R5cGUuU2NyaXB0KTtcbn1cbi8qKlxuICogTWFyayBgdXJsYCBzdHJpbmcgYXMgdHJ1c3RlZC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdyYXBzIHRoZSB0cnVzdGVkIHN0cmluZyBpbiBgU3RyaW5nYCBhbmQgYnJhbmRzIGl0IGluIGEgd2F5IHdoaWNoIG1ha2VzIGl0XG4gKiByZWNvZ25pemFibGUgdG8ge0BsaW5rIHVybFNhbml0aXplcn0gdG8gYmUgdHJ1c3RlZCBpbXBsaWNpdGx5LlxuICpcbiAqIEBwYXJhbSB0cnVzdGVkVXJsIGB1cmxgIHN0cmluZyB3aGljaCBuZWVkcyB0byBiZSBpbXBsaWNpdGx5IHRydXN0ZWQuXG4gKiBAcmV0dXJucyBhIGB1cmxgIGBTdHJpbmdgIHdoaWNoIGhhcyBiZWVuIGJyYW5kZWQgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RVcmwodHJ1c3RlZFVybDogc3RyaW5nKTogVHJ1c3RlZFVybFN0cmluZyB7XG4gIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyh0cnVzdGVkVXJsLCBCeXBhc3NUeXBlLlVybCk7XG59XG4vKipcbiAqIE1hcmsgYHVybGAgc3RyaW5nIGFzIHRydXN0ZWQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3cmFwcyB0aGUgdHJ1c3RlZCBzdHJpbmcgaW4gYFN0cmluZ2AgYW5kIGJyYW5kcyBpdCBpbiBhIHdheSB3aGljaCBtYWtlcyBpdFxuICogcmVjb2duaXphYmxlIHRvIHtAbGluayByZXNvdXJjZVVybFNhbml0aXplcn0gdG8gYmUgdHJ1c3RlZCBpbXBsaWNpdGx5LlxuICpcbiAqIEBwYXJhbSB0cnVzdGVkUmVzb3VyY2VVcmwgYHVybGAgc3RyaW5nIHdoaWNoIG5lZWRzIHRvIGJlIGltcGxpY2l0bHkgdHJ1c3RlZC5cbiAqIEByZXR1cm5zIGEgYHVybGAgYFN0cmluZ2Agd2hpY2ggaGFzIGJlZW4gYnJhbmRlZCB0byBiZSBpbXBsaWNpdGx5IHRydXN0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFJlc291cmNlVXJsKHRydXN0ZWRSZXNvdXJjZVVybDogc3RyaW5nKTpcbiAgICBUcnVzdGVkUmVzb3VyY2VVcmxTdHJpbmcge1xuICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcodHJ1c3RlZFJlc291cmNlVXJsLCBCeXBhc3NUeXBlLlJlc291cmNlVXJsKTtcbn1cblxuXG5mdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyhcbiAgICB0cnVzdGVkU3RyaW5nOiBzdHJpbmcsIG1vZGU6IEJ5cGFzc1R5cGUuSHRtbCk6IFRydXN0ZWRIdG1sU3RyaW5nO1xuZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcoXG4gICAgdHJ1c3RlZFN0cmluZzogc3RyaW5nLCBtb2RlOiBCeXBhc3NUeXBlLlN0eWxlKTogVHJ1c3RlZFN0eWxlU3RyaW5nO1xuZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcoXG4gICAgdHJ1c3RlZFN0cmluZzogc3RyaW5nLCBtb2RlOiBCeXBhc3NUeXBlLlNjcmlwdCk6IFRydXN0ZWRTY3JpcHRTdHJpbmc7XG5mdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyhcbiAgICB0cnVzdGVkU3RyaW5nOiBzdHJpbmcsIG1vZGU6IEJ5cGFzc1R5cGUuVXJsKTogVHJ1c3RlZFVybFN0cmluZztcbmZ1bmN0aW9uIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKFxuICAgIHRydXN0ZWRTdHJpbmc6IHN0cmluZywgbW9kZTogQnlwYXNzVHlwZS5SZXNvdXJjZVVybCk6IFRydXN0ZWRSZXNvdXJjZVVybFN0cmluZztcbmZ1bmN0aW9uIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKHRydXN0ZWRTdHJpbmc6IHN0cmluZywgbW9kZTogQnlwYXNzVHlwZSk6IFRydXN0ZWRTdHJpbmcge1xuICBjb25zdCB0cnVzdGVkID0gbmV3IFN0cmluZyh0cnVzdGVkU3RyaW5nKSBhcyBUcnVzdGVkU3RyaW5nO1xuICB0cnVzdGVkW0JSQU5EXSA9IG1vZGU7XG4gIHJldHVybiB0cnVzdGVkO1xufVxuIl19