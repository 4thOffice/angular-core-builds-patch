/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * fakeAsync has been moved to zone.js
 * this file is for fallback in case old version of zone.js is used
 */
const /** @type {?} */ _Zone = typeof Zone !== 'undefined' ? Zone : null;
const /** @type {?} */ FakeAsyncTestZoneSpec = _Zone && _Zone['FakeAsyncTestZoneSpec'];
const /** @type {?} */ ProxyZoneSpec = _Zone && _Zone['ProxyZoneSpec'];
let /** @type {?} */ _fakeAsyncTestZoneSpec = null;
/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * \@experimental
 * @return {?}
 */
export function resetFakeAsyncZoneFallback() {
    _fakeAsyncTestZoneSpec = null;
    // in node.js testing we may not have ProxyZoneSpec in which case there is nothing to reset.
    ProxyZoneSpec && ProxyZoneSpec.assertPresent().resetDelegate();
}
let /** @type {?} */ _inFakeAsyncCall = false;
/**
 * Wraps a function to be executed in the fakeAsync zone:
 * - microtasks are manually executed by calling `flushMicrotasks()`,
 * - timers are synchronous, `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception will be thrown.
 *
 * Can be used to wrap inject() calls.
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/testing/ts/fake_async.ts region='basic'}
 *
 * \@experimental
 * @param {?} fn
 * @return {?} The function wrapped to be executed in the fakeAsync zone
 *
 */
export function fakeAsyncFallback(fn) {
    // Not using an arrow function to preserve context passed from call site
    return function (...args) {
        const /** @type {?} */ proxyZoneSpec = ProxyZoneSpec.assertPresent();
        if (_inFakeAsyncCall) {
            throw new Error('fakeAsync() calls can not be nested');
        }
        _inFakeAsyncCall = true;
        try {
            if (!_fakeAsyncTestZoneSpec) {
                if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
                    throw new Error('fakeAsync() calls can not be nested');
                }
                _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
            }
            let /** @type {?} */ res;
            const /** @type {?} */ lastProxyZoneSpec = proxyZoneSpec.getDelegate();
            proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
            try {
                res = fn.apply(this, args);
                flushMicrotasksFallback();
            }
            finally {
                proxyZoneSpec.setDelegate(lastProxyZoneSpec);
            }
            if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                throw new Error(`${_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length} ` +
                    `periodic timer(s) still in the queue.`);
            }
            if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                throw new Error(`${_fakeAsyncTestZoneSpec.pendingTimers.length} timer(s) still in the queue.`);
            }
            return res;
        }
        finally {
            _inFakeAsyncCall = false;
            resetFakeAsyncZoneFallback();
        }
    };
}
/**
 * @return {?}
 */
function _getFakeAsyncZoneSpec() {
    if (_fakeAsyncTestZoneSpec == null) {
        throw new Error('The code should be running in the fakeAsync zone to call this function');
    }
    return _fakeAsyncTestZoneSpec;
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * \@usageNotes
 * ### Example
 *
 * {\@example core/testing/ts/fake_async.ts region='basic'}
 *
 * \@experimental
 * @param {?=} millis
 * @return {?}
 */
export function tickFallback(millis = 0) {
    _getFakeAsyncZoneSpec().tick(millis);
}
/**
 * Simulates the asynchronous passage of time for the timers in the fakeAsync zone by
 * draining the macrotask queue until it is empty. The returned value is the milliseconds
 * of time that would have been elapsed.
 *
 * \@experimental
 * @param {?=} maxTurns
 * @return {?} The simulated time elapsed, in millis.
 *
 */
export function flushFallback(maxTurns) {
    return _getFakeAsyncZoneSpec().flush(maxTurns);
}
/**
 * Discard all remaining periodic tasks.
 *
 * \@experimental
 * @return {?}
 */
export function discardPeriodicTasksFallback() {
    const /** @type {?} */ zoneSpec = _getFakeAsyncZoneSpec();
    const /** @type {?} */ pendingTimers = zoneSpec.pendingPeriodicTimers;
    zoneSpec.pendingPeriodicTimers.length = 0;
}
/**
 * Flush any pending microtasks.
 *
 * \@experimental
 * @return {?}
 */
export function flushMicrotasksFallback() {
    _getFakeAsyncZoneSpec().flushMicrotasks();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9hc3luY19mYWxsYmFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvZmFrZV9hc3luY19mYWxsYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFZQSx1QkFBTSxLQUFLLEdBQVEsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUM3RCx1QkFBTSxxQkFBcUIsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFJdEUsdUJBQU0sYUFBYSxHQUNmLEtBQUssSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFcEMscUJBQUksc0JBQXNCLEdBQVEsSUFBSSxDQUFDOzs7Ozs7OztBQVF2QyxNQUFNO0lBQ0osc0JBQXNCLEdBQUcsSUFBSSxDQUFDOztJQUU5QixhQUFhLElBQUksYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0NBQ2hFO0FBRUQscUJBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCN0IsTUFBTSw0QkFBNEIsRUFBWTs7SUFFNUMsT0FBTyxVQUFTLEdBQUcsSUFBVztRQUM1Qix1QkFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3BELElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUk7WUFDRixJQUFJLENBQUMsc0JBQXNCLEVBQUU7Z0JBQzNCLElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRSxZQUFZLHFCQUFxQixFQUFFO29CQUNoRSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7aUJBQ3hEO2dCQUVELHNCQUFzQixHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQzthQUN0RDtZQUVELHFCQUFJLEdBQVEsQ0FBQztZQUNiLHVCQUFNLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN0RCxhQUFhLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDbEQsSUFBSTtnQkFDRixHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLHVCQUF1QixFQUFFLENBQUM7YUFDM0I7b0JBQVM7Z0JBQ1IsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsSUFBSSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzRCxNQUFNLElBQUksS0FBSyxDQUNYLEdBQUcsc0JBQXNCLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFHO29CQUN6RCx1Q0FBdUMsQ0FBQyxDQUFDO2FBQzlDO1lBRUQsSUFBSSxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkQsTUFBTSxJQUFJLEtBQUssQ0FDWCxHQUFHLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxNQUFNLCtCQUErQixDQUFDLENBQUM7YUFDcEY7WUFDRCxPQUFPLEdBQUcsQ0FBQztTQUNaO2dCQUFTO1lBQ1IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLDBCQUEwQixFQUFFLENBQUM7U0FDOUI7S0FDRixDQUFDO0NBQ0g7Ozs7QUFFRDtJQUNFLElBQUksc0JBQXNCLElBQUksSUFBSSxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0VBQXdFLENBQUMsQ0FBQztLQUMzRjtJQUNELE9BQU8sc0JBQXNCLENBQUM7Q0FDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlRCxNQUFNLHVCQUF1QixTQUFpQixDQUFDO0lBQzdDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3RDOzs7Ozs7Ozs7OztBQVlELE1BQU0sd0JBQXdCLFFBQWlCO0lBQzdDLE9BQU8scUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDaEQ7Ozs7Ozs7QUFPRCxNQUFNO0lBQ0osdUJBQU0sUUFBUSxHQUFHLHFCQUFxQixFQUFFLENBQUM7SUFDekMsdUJBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQztJQUNyRCxRQUFRLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztDQUMzQzs7Ozs7OztBQU9ELE1BQU07SUFDSixxQkFBcUIsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO0NBQzNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIGZha2VBc3luYyBoYXMgYmVlbiBtb3ZlZCB0byB6b25lLmpzXG4gKiB0aGlzIGZpbGUgaXMgZm9yIGZhbGxiYWNrIGluIGNhc2Ugb2xkIHZlcnNpb24gb2Ygem9uZS5qcyBpcyB1c2VkXG4gKi9cbmNvbnN0IF9ab25lOiBhbnkgPSB0eXBlb2YgWm9uZSAhPT0gJ3VuZGVmaW5lZCcgPyBab25lIDogbnVsbDtcbmNvbnN0IEZha2VBc3luY1Rlc3Rab25lU3BlYyA9IF9ab25lICYmIF9ab25lWydGYWtlQXN5bmNUZXN0Wm9uZVNwZWMnXTtcbnR5cGUgUHJveHlab25lU3BlYyA9IHtcbiAgc2V0RGVsZWdhdGUoZGVsZWdhdGVTcGVjOiBab25lU3BlYyk6IHZvaWQ7IGdldERlbGVnYXRlKCk6IFpvbmVTcGVjOyByZXNldERlbGVnYXRlKCk6IHZvaWQ7XG59O1xuY29uc3QgUHJveHlab25lU3BlYzoge2dldCgpOiBQcm94eVpvbmVTcGVjOyBhc3NlcnRQcmVzZW50OiAoKSA9PiBQcm94eVpvbmVTcGVjfSA9XG4gICAgX1pvbmUgJiYgX1pvbmVbJ1Byb3h5Wm9uZVNwZWMnXTtcblxubGV0IF9mYWtlQXN5bmNUZXN0Wm9uZVNwZWM6IGFueSA9IG51bGw7XG5cbi8qKlxuICogQ2xlYXJzIG91dCB0aGUgc2hhcmVkIGZha2UgYXN5bmMgem9uZSBmb3IgYSB0ZXN0LlxuICogVG8gYmUgY2FsbGVkIGluIGEgZ2xvYmFsIGBiZWZvcmVFYWNoYC5cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldEZha2VBc3luY1pvbmVGYWxsYmFjaygpIHtcbiAgX2Zha2VBc3luY1Rlc3Rab25lU3BlYyA9IG51bGw7XG4gIC8vIGluIG5vZGUuanMgdGVzdGluZyB3ZSBtYXkgbm90IGhhdmUgUHJveHlab25lU3BlYyBpbiB3aGljaCBjYXNlIHRoZXJlIGlzIG5vdGhpbmcgdG8gcmVzZXQuXG4gIFByb3h5Wm9uZVNwZWMgJiYgUHJveHlab25lU3BlYy5hc3NlcnRQcmVzZW50KCkucmVzZXREZWxlZ2F0ZSgpO1xufVxuXG5sZXQgX2luRmFrZUFzeW5jQ2FsbCA9IGZhbHNlO1xuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgaW4gdGhlIGZha2VBc3luYyB6b25lOlxuICogLSBtaWNyb3Rhc2tzIGFyZSBtYW51YWxseSBleGVjdXRlZCBieSBjYWxsaW5nIGBmbHVzaE1pY3JvdGFza3MoKWAsXG4gKiAtIHRpbWVycyBhcmUgc3luY2hyb25vdXMsIGB0aWNrKClgIHNpbXVsYXRlcyB0aGUgYXN5bmNocm9ub3VzIHBhc3NhZ2Ugb2YgdGltZS5cbiAqXG4gKiBJZiB0aGVyZSBhcmUgYW55IHBlbmRpbmcgdGltZXJzIGF0IHRoZSBlbmQgb2YgdGhlIGZ1bmN0aW9uLCBhbiBleGNlcHRpb24gd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQ2FuIGJlIHVzZWQgdG8gd3JhcCBpbmplY3QoKSBjYWxscy5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS90ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XG4gKlxuICogQHBhcmFtIGZuXG4gKiBAcmV0dXJucyBUaGUgZnVuY3Rpb24gd3JhcHBlZCB0byBiZSBleGVjdXRlZCBpbiB0aGUgZmFrZUFzeW5jIHpvbmVcbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWtlQXN5bmNGYWxsYmFjayhmbjogRnVuY3Rpb24pOiAoLi4uYXJnczogYW55W10pID0+IGFueSB7XG4gIC8vIE5vdCB1c2luZyBhbiBhcnJvdyBmdW5jdGlvbiB0byBwcmVzZXJ2ZSBjb250ZXh0IHBhc3NlZCBmcm9tIGNhbGwgc2l0ZVxuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJnczogYW55W10pIHtcbiAgICBjb25zdCBwcm94eVpvbmVTcGVjID0gUHJveHlab25lU3BlYy5hc3NlcnRQcmVzZW50KCk7XG4gICAgaWYgKF9pbkZha2VBc3luY0NhbGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZmFrZUFzeW5jKCkgY2FsbHMgY2FuIG5vdCBiZSBuZXN0ZWQnKTtcbiAgICB9XG4gICAgX2luRmFrZUFzeW5jQ2FsbCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2Zha2VBc3luY1Rlc3Rab25lU3BlYykge1xuICAgICAgICBpZiAocHJveHlab25lU3BlYy5nZXREZWxlZ2F0ZSgpIGluc3RhbmNlb2YgRmFrZUFzeW5jVGVzdFpvbmVTcGVjKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmYWtlQXN5bmMoKSBjYWxscyBjYW4gbm90IGJlIG5lc3RlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2Zha2VBc3luY1Rlc3Rab25lU3BlYyA9IG5ldyBGYWtlQXN5bmNUZXN0Wm9uZVNwZWMoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlczogYW55O1xuICAgICAgY29uc3QgbGFzdFByb3h5Wm9uZVNwZWMgPSBwcm94eVpvbmVTcGVjLmdldERlbGVnYXRlKCk7XG4gICAgICBwcm94eVpvbmVTcGVjLnNldERlbGVnYXRlKF9mYWtlQXN5bmNUZXN0Wm9uZVNwZWMpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGZsdXNoTWljcm90YXNrc0ZhbGxiYWNrKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBwcm94eVpvbmVTcGVjLnNldERlbGVnYXRlKGxhc3RQcm94eVpvbmVTcGVjKTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9mYWtlQXN5bmNUZXN0Wm9uZVNwZWMucGVuZGluZ1BlcmlvZGljVGltZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7X2Zha2VBc3luY1Rlc3Rab25lU3BlYy5wZW5kaW5nUGVyaW9kaWNUaW1lcnMubGVuZ3RofSBgICtcbiAgICAgICAgICAgIGBwZXJpb2RpYyB0aW1lcihzKSBzdGlsbCBpbiB0aGUgcXVldWUuYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfZmFrZUFzeW5jVGVzdFpvbmVTcGVjLnBlbmRpbmdUaW1lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgJHtfZmFrZUFzeW5jVGVzdFpvbmVTcGVjLnBlbmRpbmdUaW1lcnMubGVuZ3RofSB0aW1lcihzKSBzdGlsbCBpbiB0aGUgcXVldWUuYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBfaW5GYWtlQXN5bmNDYWxsID0gZmFsc2U7XG4gICAgICByZXNldEZha2VBc3luY1pvbmVGYWxsYmFjaygpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gX2dldEZha2VBc3luY1pvbmVTcGVjKCk6IGFueSB7XG4gIGlmIChfZmFrZUFzeW5jVGVzdFpvbmVTcGVjID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjb2RlIHNob3VsZCBiZSBydW5uaW5nIGluIHRoZSBmYWtlQXN5bmMgem9uZSB0byBjYWxsIHRoaXMgZnVuY3Rpb24nKTtcbiAgfVxuICByZXR1cm4gX2Zha2VBc3luY1Rlc3Rab25lU3BlYztcbn1cblxuLyoqXG4gKiBTaW11bGF0ZXMgdGhlIGFzeW5jaHJvbm91cyBwYXNzYWdlIG9mIHRpbWUgZm9yIHRoZSB0aW1lcnMgaW4gdGhlIGZha2VBc3luYyB6b25lLlxuICpcbiAqIFRoZSBtaWNyb3Rhc2tzIHF1ZXVlIGlzIGRyYWluZWQgYXQgdGhlIHZlcnkgc3RhcnQgb2YgdGhpcyBmdW5jdGlvbiBhbmQgYWZ0ZXIgYW55IHRpbWVyIGNhbGxiYWNrXG4gKiBoYXMgYmVlbiBleGVjdXRlZC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS90ZXN0aW5nL3RzL2Zha2VfYXN5bmMudHMgcmVnaW9uPSdiYXNpYyd9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdGlja0ZhbGxiYWNrKG1pbGxpczogbnVtYmVyID0gMCk6IHZvaWQge1xuICBfZ2V0RmFrZUFzeW5jWm9uZVNwZWMoKS50aWNrKG1pbGxpcyk7XG59XG5cbi8qKlxuICogU2ltdWxhdGVzIHRoZSBhc3luY2hyb25vdXMgcGFzc2FnZSBvZiB0aW1lIGZvciB0aGUgdGltZXJzIGluIHRoZSBmYWtlQXN5bmMgem9uZSBieVxuICogZHJhaW5pbmcgdGhlIG1hY3JvdGFzayBxdWV1ZSB1bnRpbCBpdCBpcyBlbXB0eS4gVGhlIHJldHVybmVkIHZhbHVlIGlzIHRoZSBtaWxsaXNlY29uZHNcbiAqIG9mIHRpbWUgdGhhdCB3b3VsZCBoYXZlIGJlZW4gZWxhcHNlZC5cbiAqXG4gKiBAcGFyYW0gbWF4VHVybnNcbiAqIEByZXR1cm5zIFRoZSBzaW11bGF0ZWQgdGltZSBlbGFwc2VkLCBpbiBtaWxsaXMuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hGYWxsYmFjayhtYXhUdXJucz86IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBfZ2V0RmFrZUFzeW5jWm9uZVNwZWMoKS5mbHVzaChtYXhUdXJucyk7XG59XG5cbi8qKlxuICogRGlzY2FyZCBhbGwgcmVtYWluaW5nIHBlcmlvZGljIHRhc2tzLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2NhcmRQZXJpb2RpY1Rhc2tzRmFsbGJhY2soKTogdm9pZCB7XG4gIGNvbnN0IHpvbmVTcGVjID0gX2dldEZha2VBc3luY1pvbmVTcGVjKCk7XG4gIGNvbnN0IHBlbmRpbmdUaW1lcnMgPSB6b25lU3BlYy5wZW5kaW5nUGVyaW9kaWNUaW1lcnM7XG4gIHpvbmVTcGVjLnBlbmRpbmdQZXJpb2RpY1RpbWVycy5sZW5ndGggPSAwO1xufVxuXG4vKipcbiAqIEZsdXNoIGFueSBwZW5kaW5nIG1pY3JvdGFza3MuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZmx1c2hNaWNyb3Rhc2tzRmFsbGJhY2soKTogdm9pZCB7XG4gIF9nZXRGYWtlQXN5bmNab25lU3BlYygpLmZsdXNoTWljcm90YXNrcygpO1xufSJdfQ==