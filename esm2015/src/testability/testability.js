/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __decorate, __metadata } from "tslib";
import { Injectable } from '../di';
import { scheduleMicroTask } from '../util/microtask';
import { NgZone } from '../zone/ng_zone';
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * @publicApi
 */
let Testability = /** @class */ (() => {
    let Testability = class Testability {
        constructor(_ngZone) {
            this._ngZone = _ngZone;
            this._pendingCount = 0;
            this._isZoneStable = true;
            /**
             * Whether any work was done since the last 'whenStable' callback. This is
             * useful to detect if this could have potentially destabilized another
             * component while it is stabilizing.
             * @internal
             */
            this._didWork = false;
            this._callbacks = [];
            this.taskTrackingZone = null;
            this._watchAngularEvents();
            _ngZone.run(() => {
                this.taskTrackingZone =
                    typeof Zone == 'undefined' ? null : Zone.current.get('TaskTrackingZone');
            });
        }
        _watchAngularEvents() {
            this._ngZone.onUnstable.subscribe({
                next: () => {
                    this._didWork = true;
                    this._isZoneStable = false;
                }
            });
            this._ngZone.runOutsideAngular(() => {
                this._ngZone.onStable.subscribe({
                    next: () => {
                        NgZone.assertNotInAngularZone();
                        scheduleMicroTask(() => {
                            this._isZoneStable = true;
                            this._runCallbacksIfReady();
                        });
                    }
                });
            });
        }
        /**
         * Increases the number of pending request
         * @deprecated pending requests are now tracked with zones.
         */
        increasePendingRequestCount() {
            this._pendingCount += 1;
            this._didWork = true;
            return this._pendingCount;
        }
        /**
         * Decreases the number of pending request
         * @deprecated pending requests are now tracked with zones
         */
        decreasePendingRequestCount() {
            this._pendingCount -= 1;
            if (this._pendingCount < 0) {
                throw new Error('pending async requests below zero');
            }
            this._runCallbacksIfReady();
            return this._pendingCount;
        }
        /**
         * Whether an associated application is stable
         */
        isStable() {
            return this._isZoneStable && this._pendingCount === 0 && !this._ngZone.hasPendingMacrotasks;
        }
        _runCallbacksIfReady() {
            if (this.isStable()) {
                // Schedules the call backs in a new frame so that it is always async.
                scheduleMicroTask(() => {
                    while (this._callbacks.length !== 0) {
                        let cb = this._callbacks.pop();
                        clearTimeout(cb.timeoutId);
                        cb.doneCb(this._didWork);
                    }
                    this._didWork = false;
                });
            }
            else {
                // Still not stable, send updates.
                let pending = this.getPendingTasks();
                this._callbacks = this._callbacks.filter((cb) => {
                    if (cb.updateCb && cb.updateCb(pending)) {
                        clearTimeout(cb.timeoutId);
                        return false;
                    }
                    return true;
                });
                this._didWork = true;
            }
        }
        getPendingTasks() {
            if (!this.taskTrackingZone) {
                return [];
            }
            // Copy the tasks data so that we don't leak tasks.
            return this.taskTrackingZone.macroTasks.map((t) => {
                return {
                    source: t.source,
                    // From TaskTrackingZone:
                    // https://github.com/angular/zone.js/blob/master/lib/zone-spec/task-tracking.ts#L40
                    creationLocation: t.creationLocation,
                    data: t.data
                };
            });
        }
        addCallback(cb, timeout, updateCb) {
            let timeoutId = -1;
            if (timeout && timeout > 0) {
                timeoutId = setTimeout(() => {
                    this._callbacks = this._callbacks.filter((cb) => cb.timeoutId !== timeoutId);
                    cb(this._didWork, this.getPendingTasks());
                }, timeout);
            }
            this._callbacks.push({ doneCb: cb, timeoutId: timeoutId, updateCb: updateCb });
        }
        /**
         * Wait for the application to be stable with a timeout. If the timeout is reached before that
         * happens, the callback receives a list of the macro tasks that were pending, otherwise null.
         *
         * @param doneCb The callback to invoke when Angular is stable or the timeout expires
         *    whichever comes first.
         * @param timeout Optional. The maximum time to wait for Angular to become stable. If not
         *    specified, whenStable() will wait forever.
         * @param updateCb Optional. If specified, this callback will be invoked whenever the set of
         *    pending macrotasks changes. If this callback returns true doneCb will not be invoked
         *    and no further updates will be issued.
         */
        whenStable(doneCb, timeout, updateCb) {
            if (updateCb && !this.taskTrackingZone) {
                throw new Error('Task tracking zone is required when passing an update callback to ' +
                    'whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
            }
            // These arguments are 'Function' above to keep the public API simple.
            this.addCallback(doneCb, timeout, updateCb);
            this._runCallbacksIfReady();
        }
        /**
         * Get the number of pending requests
         * @deprecated pending requests are now tracked with zones
         */
        getPendingRequestCount() {
            return this._pendingCount;
        }
        /**
         * Find providers by name
         * @param using The root element to search from
         * @param provider The name of binding variable
         * @param exactMatch Whether using exactMatch
         */
        findProviders(using, provider, exactMatch) {
            // TODO(juliemr): implement.
            return [];
        }
    };
    Testability = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NgZone])
    ], Testability);
    return Testability;
})();
export { Testability };
/**
 * A global registry of {@link Testability} instances for specific elements.
 * @publicApi
 */
let TestabilityRegistry = /** @class */ (() => {
    let TestabilityRegistry = class TestabilityRegistry {
        constructor() {
            /** @internal */
            this._applications = new Map();
            _testabilityGetter.addToWindow(this);
        }
        /**
         * Registers an application with a testability hook so that it can be tracked
         * @param token token of application, root element
         * @param testability Testability hook
         */
        registerApplication(token, testability) {
            this._applications.set(token, testability);
        }
        /**
         * Unregisters an application.
         * @param token token of application, root element
         */
        unregisterApplication(token) {
            this._applications.delete(token);
        }
        /**
         * Unregisters all applications
         */
        unregisterAllApplications() {
            this._applications.clear();
        }
        /**
         * Get a testability hook associated with the application
         * @param elem root element
         */
        getTestability(elem) {
            return this._applications.get(elem) || null;
        }
        /**
         * Get all registered testabilities
         */
        getAllTestabilities() {
            return Array.from(this._applications.values());
        }
        /**
         * Get all registered applications(root elements)
         */
        getAllRootElements() {
            return Array.from(this._applications.keys());
        }
        /**
         * Find testability of a node in the Tree
         * @param elem node
         * @param findInAncestors whether finding testability in ancestors if testability was not found in
         * current node
         */
        findTestabilityInTree(elem, findInAncestors = true) {
            return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
        }
    };
    TestabilityRegistry = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], TestabilityRegistry);
    return TestabilityRegistry;
})();
export { TestabilityRegistry };
class _NoopGetTestability {
    addToWindow(registry) { }
    findTestabilityInTree(registry, elem, findInAncestors) {
        return null;
    }
}
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @publicApi
 */
export function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
let _testabilityGetter = new _NoopGetTestability();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUF3Q3ZDOzs7OztHQUtHO0FBRUg7SUFBQSxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO1FBY3RCLFlBQW9CLE9BQWU7WUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1lBYjNCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1lBQzFCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1lBQ3RDOzs7OztlQUtHO1lBQ0ssYUFBUSxHQUFZLEtBQUssQ0FBQztZQUMxQixlQUFVLEdBQW1CLEVBQUUsQ0FBQztZQUVoQyxxQkFBZ0IsR0FBOEIsSUFBSSxDQUFDO1lBR3pELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksQ0FBQyxnQkFBZ0I7b0JBQ2pCLE9BQU8sSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQy9FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVPLG1CQUFtQjtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLElBQUksRUFBRSxHQUFHLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JB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QjtZQUNqQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRDs7V0FFRztRQUNILGtCQUFrQjtZQUNoQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILHFCQUFxQixDQUFDLElBQVUsRUFBRSxrQkFBMkIsSUFBSTtZQUMvRCxPQUFPLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDL0UsQ0FBQztLQUNGLENBQUE7SUEvRFksbUJBQW1CO1FBRC9CLFVBQVUsRUFBRTs7T0FDQSxtQkFBbUIsQ0ErRC9CO0lBQUQsMEJBQUM7S0FBQTtTQS9EWSxtQkFBbUI7QUE2RWhDLE1BQU0sbUJBQW1CO0lBQ3ZCLFdBQVcsQ0FBQyxRQUE2QixJQUFTLENBQUM7SUFDbkQscUJBQXFCLENBQUMsUUFBNkIsRUFBRSxJQUFTLEVBQUUsZUFBd0I7UUFFdEYsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsTUFBc0I7SUFDekQsa0JBQWtCLEdBQUcsTUFBTSxDQUFDO0FBQzlCLENBQUM7QUFFRCxJQUFJLGtCQUFrQixHQUFtQixJQUFJLG1CQUFtQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge3NjaGVkdWxlTWljcm9UYXNrfSBmcm9tICcuLi91dGlsL21pY3JvdGFzayc7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnLi4vem9uZS9uZ196b25lJztcblxuLyoqXG4gKiBUZXN0YWJpbGl0eSBBUEkuXG4gKiBgZGVjbGFyZWAga2V5d29yZCBjYXVzZXMgdHNpY2tsZSB0byBnZW5lcmF0ZSBleHRlcm5zLCBzbyB0aGVzZSBtZXRob2RzIGFyZVxuICogbm90IHJlbmFtZWQgYnkgQ2xvc3VyZSBDb21waWxlci5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFB1YmxpY1Rlc3RhYmlsaXR5IHtcbiAgaXNTdGFibGUoKTogYm9vbGVhbjtcbiAgd2hlblN0YWJsZShjYWxsYmFjazogRnVuY3Rpb24sIHRpbWVvdXQ/OiBudW1iZXIsIHVwZGF0ZUNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBmaW5kUHJvdmlkZXJzKHVzaW5nOiBhbnksIHByb3ZpZGVyOiBzdHJpbmcsIGV4YWN0TWF0Y2g6IGJvb2xlYW4pOiBhbnlbXTtcbn1cblxuLy8gQW5ndWxhciBpbnRlcm5hbCwgbm90IGludGVuZGVkIGZvciBwdWJsaWMgQVBJLlxuZXhwb3J0IGludGVyZmFjZSBQZW5kaW5nTWFjcm90YXNrIHtcbiAgc291cmNlOiBzdHJpbmc7XG4gIGNyZWF0aW9uTG9jYXRpb246IEVycm9yO1xuICBydW5Db3VudD86IG51bWJlcjtcbiAgZGF0YT86IFRhc2tEYXRhO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhc2tEYXRhIHtcbiAgdGFyZ2V0PzogWE1MSHR0cFJlcXVlc3Q7XG4gIGRlbGF5PzogbnVtYmVyO1xuICBpc1BlcmlvZGljPzogYm9vbGVhbjtcbn1cblxuLy8gQW5ndWxhciBpbnRlcm5hbCwgbm90IGludGVuZGVkIGZvciBwdWJsaWMgQVBJLlxuZXhwb3J0IHR5cGUgRG9uZUNhbGxiYWNrID0gKGRpZFdvcms6IGJvb2xlYW4sIHRhc2tzPzogUGVuZGluZ01hY3JvdGFza1tdKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgVXBkYXRlQ2FsbGJhY2sgPSAodGFza3M6IFBlbmRpbmdNYWNyb3Rhc2tbXSkgPT4gYm9vbGVhbjtcblxuaW50ZXJmYWNlIFdhaXRDYWxsYmFjayB7XG4gIC8vIE5lZWRzIHRvIGJlICdhbnknIC0gc2V0VGltZW91dCByZXR1cm5zIGEgbnVtYmVyIGFjY29yZGluZyB0byBFUzYsIGJ1dFxuICAvLyBvbiBOb2RlSlMgaXQgcmV0dXJucyBhIFRpbWVyLlxuICB0aW1lb3V0SWQ6IGFueTtcbiAgZG9uZUNiOiBEb25lQ2FsbGJhY2s7XG4gIHVwZGF0ZUNiPzogVXBkYXRlQ2FsbGJhY2s7XG59XG5cbi8qKlxuICogVGhlIFRlc3RhYmlsaXR5IHNlcnZpY2UgcHJvdmlkZXMgdGVzdGluZyBob29rcyB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBmcm9tXG4gKiB0aGUgYnJvd3NlciBhbmQgYnkgc2VydmljZXMgc3VjaCBhcyBQcm90cmFjdG9yLiBFYWNoIGJvb3RzdHJhcHBlZCBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZSB3aWxsIGhhdmUgYW4gaW5zdGFuY2Ugb2YgVGVzdGFiaWxpdHkuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIFB1YmxpY1Rlc3RhYmlsaXR5IHtcbiAgcHJpdmF0ZSBfcGVuZGluZ0NvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9pc1pvbmVTdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAvKipcbiAgICogV2hldGhlciBhbnkgd29yayB3YXMgZG9uZSBzaW5jZSB0aGUgbGFzdCAnd2hlblN0YWJsZScgY2FsbGJhY2suIFRoaXMgaXNcbiAgICogdXNlZnVsIHRvIGRldGVjdCBpZiB0aGlzIGNvdWxkIGhhdmUgcG90ZW50aWFsbHkgZGVzdGFiaWxpemVkIGFub3RoZXJcbiAgICogY29tcG9uZW50IHdoaWxlIGl0IGlzIHN0YWJpbGl6aW5nLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgX2RpZFdvcms6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzOiBXYWl0Q2FsbGJhY2tbXSA9IFtdO1xuXG4gIHByaXZhdGUgdGFza1RyYWNraW5nWm9uZToge21hY3JvVGFza3M6IFRhc2tbXX18bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLl93YXRjaEFuZ3VsYXJFdmVudHMoKTtcbiAgICBfbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLnRhc2tUcmFja2luZ1pvbmUgPVxuICAgICAgICAgIHR5cGVvZiBab25lID09ICd1bmRlZmluZWQnID8gbnVsbCA6IFpvbmUuY3VycmVudC5nZXQoJ1Rhc2tUcmFja2luZ1pvbmUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3dhdGNoQW5ndWxhckV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUub25VbnN0YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICB0aGlzLl9kaWRXb3JrID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faXNab25lU3RhYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICBOZ1pvbmUuYXNzZXJ0Tm90SW5Bbmd1bGFyWm9uZSgpO1xuICAgICAgICAgIHNjaGVkdWxlTWljcm9UYXNrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzWm9uZVN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9ydW5DYWxsYmFja3NJZlJlYWR5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyB0aGUgbnVtYmVyIG9mIHBlbmRpbmcgcmVxdWVzdFxuICAgKiBAZGVwcmVjYXRlZCBwZW5kaW5nIHJlcXVlc3RzIGFyZSBub3cgdHJhY2tlZCB3aXRoIHpvbmVzLlxuICAgKi9cbiAgaW5jcmVhc2VQZW5kaW5nUmVxdWVzdENvdW50KCk6IG51bWJlciB7XG4gICAgdGhpcy5fcGVuZGluZ0NvdW50ICs9IDE7XG4gICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdDb3VudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgdGhlIG51bWJlciBvZiBwZW5kaW5nIHJlcXVlc3RcbiAgICogQGRlcHJlY2F0ZWQgcGVuZGluZyByZXF1ZXN0cyBhcmUgbm93IHRyYWNrZWQgd2l0aCB6b25lc1xuICAgKi9cbiAgZGVjcmVhc2VQZW5kaW5nUmVxdWVzdENvdW50KCk6IG51bWJlciB7XG4gICAgdGhpcy5fcGVuZGluZ0NvdW50IC09IDE7XG4gICAgaWYgKHRoaXMuX3BlbmRpbmdDb3VudCA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncGVuZGluZyBhc3luYyByZXF1ZXN0cyBiZWxvdyB6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMuX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgYW4gYXNzb2NpYXRlZCBhcHBsaWNhdGlvbiBpcyBzdGFibGVcbiAgICovXG4gIGlzU3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1pvbmVTdGFibGUgJiYgdGhpcy5fcGVuZGluZ0NvdW50ID09PSAwICYmICF0aGlzLl9uZ1pvbmUuaGFzUGVuZGluZ01hY3JvdGFza3M7XG4gIH1cblxuICBwcml2YXRlIF9ydW5DYWxsYmFja3NJZlJlYWR5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU3RhYmxlKCkpIHtcbiAgICAgIC8vIFNjaGVkdWxlcyB0aGUgY2FsbCBiYWNrcyBpbiBhIG5ldyBmcmFtZSBzbyB0aGF0IGl0IGlzIGFsd2F5cyBhc3luYy5cbiAgICAgIHNjaGVkdWxlTWljcm9UYXNrKCgpID0+IHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX2NhbGxiYWNrcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBsZXQgY2IgPSB0aGlzLl9jYWxsYmFja3MucG9wKCkhO1xuICAgICAgICAgIGNsZWFyVGltZW91dChjYi50aW1lb3V0SWQpO1xuICAgICAgICAgIGNiLmRvbmVDYih0aGlzLl9kaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaWRXb3JrID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RpbGwgbm90IHN0YWJsZSwgc2VuZCB1cGRhdGVzLlxuICAgICAgbGV0IHBlbmRpbmcgPSB0aGlzLmdldFBlbmRpbmdUYXNrcygpO1xuICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmZpbHRlcigoY2IpID0+IHtcbiAgICAgICAgaWYgKGNiLnVwZGF0ZUNiICYmIGNiLnVwZGF0ZUNiKHBlbmRpbmcpKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGNiLnRpbWVvdXRJZCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQZW5kaW5nVGFza3MoKTogUGVuZGluZ01hY3JvdGFza1tdIHtcbiAgICBpZiAoIXRoaXMudGFza1RyYWNraW5nWm9uZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIENvcHkgdGhlIHRhc2tzIGRhdGEgc28gdGhhdCB3ZSBkb24ndCBsZWFrIHRhc2tzLlxuICAgIHJldHVybiB0aGlzLnRhc2tUcmFja2luZ1pvbmUubWFjcm9UYXNrcy5tYXAoKHQ6IFRhc2spID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZTogdC5zb3VyY2UsXG4gICAgICAgIC8vIEZyb20gVGFza1RyYWNraW5nWm9uZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9ibG9iL21hc3Rlci9saWIvem9uZS1zcGVjL3Rhc2stdHJhY2tpbmcudHMjTDQwXG4gICAgICAgIGNyZWF0aW9uTG9jYXRpb246ICh0IGFzIGFueSkuY3JlYXRpb25Mb2NhdGlvbiBhcyBFcnJvcixcbiAgICAgICAgZGF0YTogdC5kYXRhXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDYWxsYmFjayhjYjogRG9uZUNhbGxiYWNrLCB0aW1lb3V0PzogbnVtYmVyLCB1cGRhdGVDYj86IFVwZGF0ZUNhbGxiYWNrKSB7XG4gICAgbGV0IHRpbWVvdXRJZDogYW55ID0gLTE7XG4gICAgaWYgKHRpbWVvdXQgJiYgdGltZW91dCA+IDApIHtcbiAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZmlsdGVyKChjYikgPT4gY2IudGltZW91dElkICE9PSB0aW1lb3V0SWQpO1xuICAgICAgICBjYih0aGlzLl9kaWRXb3JrLCB0aGlzLmdldFBlbmRpbmdUYXNrcygpKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsYmFja3MucHVzaCg8V2FpdENhbGxiYWNrPntkb25lQ2I6IGNiLCB0aW1lb3V0SWQ6IHRpbWVvdXRJZCwgdXBkYXRlQ2I6IHVwZGF0ZUNifSk7XG4gIH1cblxuICAvKipcbiAgICogV2FpdCBmb3IgdGhlIGFwcGxpY2F0aW9uIHRvIGJlIHN0YWJsZSB3aXRoIGEgdGltZW91dC4gSWYgdGhlIHRpbWVvdXQgaXMgcmVhY2hlZCBiZWZvcmUgdGhhdFxuICAgKiBoYXBwZW5zLCB0aGUgY2FsbGJhY2sgcmVjZWl2ZXMgYSBsaXN0IG9mIHRoZSBtYWNybyB0YXNrcyB0aGF0IHdlcmUgcGVuZGluZywgb3RoZXJ3aXNlIG51bGwuXG4gICAqXG4gICAqIEBwYXJhbSBkb25lQ2IgVGhlIGNhbGxiYWNrIHRvIGludm9rZSB3aGVuIEFuZ3VsYXIgaXMgc3RhYmxlIG9yIHRoZSB0aW1lb3V0IGV4cGlyZXNcbiAgICogICAgd2hpY2hldmVyIGNvbWVzIGZpcnN0LlxuICAgKiBAcGFyYW0gdGltZW91dCBPcHRpb25hbC4gVGhlIG1heGltdW0gdGltZSB0byB3YWl0IGZvciBBbmd1bGFyIHRvIGJlY29tZSBzdGFibGUuIElmIG5vdFxuICAgKiAgICBzcGVjaWZpZWQsIHdoZW5TdGFibGUoKSB3aWxsIHdhaXQgZm9yZXZlci5cbiAgICogQHBhcmFtIHVwZGF0ZUNiIE9wdGlvbmFsLiBJZiBzcGVjaWZpZWQsIHRoaXMgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW5ldmVyIHRoZSBzZXQgb2ZcbiAgICogICAgcGVuZGluZyBtYWNyb3Rhc2tzIGNoYW5nZXMuIElmIHRoaXMgY2FsbGJhY2sgcmV0dXJucyB0cnVlIGRvbmVDYiB3aWxsIG5vdCBiZSBpbnZva2VkXG4gICAqICAgIGFuZCBubyBmdXJ0aGVyIHVwZGF0ZXMgd2lsbCBiZSBpc3N1ZWQuXG4gICAqL1xuICB3aGVuU3RhYmxlKGRvbmVDYjogRnVuY3Rpb24sIHRpbWVvdXQ/OiBudW1iZXIsIHVwZGF0ZUNiPzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodXBkYXRlQ2IgJiYgIXRoaXMudGFza1RyYWNraW5nWm9uZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdUYXNrIHRyYWNraW5nIHpvbmUgaXMgcmVxdWlyZWQgd2hlbiBwYXNzaW5nIGFuIHVwZGF0ZSBjYWxsYmFjayB0byAnICtcbiAgICAgICAgICAnd2hlblN0YWJsZSgpLiBJcyBcInpvbmUuanMvZGlzdC90YXNrLXRyYWNraW5nLmpzXCIgbG9hZGVkPycpO1xuICAgIH1cbiAgICAvLyBUaGVzZSBhcmd1bWVudHMgYXJlICdGdW5jdGlvbicgYWJvdmUgdG8ga2VlcCB0aGUgcHVibGljIEFQSSBzaW1wbGUuXG4gICAgdGhpcy5hZGRDYWxsYmFjayhkb25lQ2IgYXMgRG9uZUNhbGxiYWNrLCB0aW1lb3V0LCB1cGRhdGVDYiBhcyBVcGRhdGVDYWxsYmFjayk7XG4gICAgdGhpcy5fcnVuQ2FsbGJhY2tzSWZSZWFkeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIHBlbmRpbmcgcmVxdWVzdHNcbiAgICogQGRlcHJlY2F0ZWQgcGVuZGluZyByZXF1ZXN0cyBhcmUgbm93IHRyYWNrZWQgd2l0aCB6b25lc1xuICAgKi9cbiAgZ2V0UGVuZGluZ1JlcXVlc3RDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQ7XG4gIH1cblxuICAvKipcbiAgICogRmluZCBwcm92aWRlcnMgYnkgbmFtZVxuICAgKiBAcGFyYW0gdXNpbmcgVGhlIHJvb3QgZWxlbWVudCB0byBzZWFyY2ggZnJvbVxuICAgKiBAcGFyYW0gcHJvdmlkZXIgVGhlIG5hbWUgb2YgYmluZGluZyB2YXJpYWJsZVxuICAgKiBAcGFyYW0gZXhhY3RNYXRjaCBXaGV0aGVyIHVzaW5nIGV4YWN0TWF0Y2hcbiAgICovXG4gIGZpbmRQcm92aWRlcnModXNpbmc6IGFueSwgcHJvdmlkZXI6IHN0cmluZywgZXhhY3RNYXRjaDogYm9vbGVhbik6IGFueVtdIHtcbiAgICAvLyBUT0RPKGp1bGllbXIpOiBpbXBsZW1lbnQuXG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbi8qKlxuICogQSBnbG9iYWwgcmVnaXN0cnkgb2Yge0BsaW5rIFRlc3RhYmlsaXR5fSBpbnN0YW5jZXMgZm9yIHNwZWNpZmljIGVsZW1lbnRzLlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGVzdGFiaWxpdHlSZWdpc3RyeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2FwcGxpY2F0aW9ucyA9IG5ldyBNYXA8YW55LCBUZXN0YWJpbGl0eT4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBfdGVzdGFiaWxpdHlHZXR0ZXIuYWRkVG9XaW5kb3codGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGFwcGxpY2F0aW9uIHdpdGggYSB0ZXN0YWJpbGl0eSBob29rIHNvIHRoYXQgaXQgY2FuIGJlIHRyYWNrZWRcbiAgICogQHBhcmFtIHRva2VuIHRva2VuIG9mIGFwcGxpY2F0aW9uLCByb290IGVsZW1lbnRcbiAgICogQHBhcmFtIHRlc3RhYmlsaXR5IFRlc3RhYmlsaXR5IGhvb2tcbiAgICovXG4gIHJlZ2lzdGVyQXBwbGljYXRpb24odG9rZW46IGFueSwgdGVzdGFiaWxpdHk6IFRlc3RhYmlsaXR5KSB7XG4gICAgdGhpcy5fYXBwbGljYXRpb25zLnNldCh0b2tlbiwgdGVzdGFiaWxpdHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVucmVnaXN0ZXJzIGFuIGFwcGxpY2F0aW9uLlxuICAgKiBAcGFyYW0gdG9rZW4gdG9rZW4gb2YgYXBwbGljYXRpb24sIHJvb3QgZWxlbWVudFxuICAgKi9cbiAgdW5yZWdpc3RlckFwcGxpY2F0aW9uKHRva2VuOiBhbnkpIHtcbiAgICB0aGlzLl9hcHBsaWNhdGlvbnMuZGVsZXRlKHRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVycyBhbGwgYXBwbGljYXRpb25zXG4gICAqL1xuICB1bnJlZ2lzdGVyQWxsQXBwbGljYXRpb25zKCkge1xuICAgIHRoaXMuX2FwcGxpY2F0aW9ucy5jbGVhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHRlc3RhYmlsaXR5IGhvb2sgYXNzb2NpYXRlZCB3aXRoIHRoZSBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0gZWxlbSByb290IGVsZW1lbnRcbiAgICovXG4gIGdldFRlc3RhYmlsaXR5KGVsZW06IGFueSk6IFRlc3RhYmlsaXR5fG51bGwge1xuICAgIHJldHVybiB0aGlzLl9hcHBsaWNhdGlvbnMuZ2V0KGVsZW0pIHx8IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCByZWdpc3RlcmVkIHRlc3RhYmlsaXRpZXNcbiAgICovXG4gIGdldEFsbFRlc3RhYmlsaXRpZXMoKTogVGVzdGFiaWxpdHlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fYXBwbGljYXRpb25zLnZhbHVlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHJlZ2lzdGVyZWQgYXBwbGljYXRpb25zKHJvb3QgZWxlbWVudHMpXG4gICAqL1xuICBnZXRBbGxSb290RWxlbWVudHMoKTogYW55W10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2FwcGxpY2F0aW9ucy5rZXlzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGVzdGFiaWxpdHkgb2YgYSBub2RlIGluIHRoZSBUcmVlXG4gICAqIEBwYXJhbSBlbGVtIG5vZGVcbiAgICogQHBhcmFtIGZpbmRJbkFuY2VzdG9ycyB3aGV0aGVyIGZpbmRpbmcgdGVzdGFiaWxpdHkgaW4gYW5jZXN0b3JzIGlmIHRlc3RhYmlsaXR5IHdhcyBub3QgZm91bmQgaW5cbiAgICogY3VycmVudCBub2RlXG4gICAqL1xuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUoZWxlbTogTm9kZSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuID0gdHJ1ZSk6IFRlc3RhYmlsaXR5fG51bGwge1xuICAgIHJldHVybiBfdGVzdGFiaWxpdHlHZXR0ZXIuZmluZFRlc3RhYmlsaXR5SW5UcmVlKHRoaXMsIGVsZW0sIGZpbmRJbkFuY2VzdG9ycyk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGFwdGVyIGludGVyZmFjZSBmb3IgcmV0cmlldmluZyB0aGUgYFRlc3RhYmlsaXR5YCBzZXJ2aWNlIGFzc29jaWF0ZWQgZm9yIGFcbiAqIHBhcnRpY3VsYXIgY29udGV4dC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR2V0VGVzdGFiaWxpdHkge1xuICBhZGRUb1dpbmRvdyhyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSk6IHZvaWQ7XG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4pOlxuICAgICAgVGVzdGFiaWxpdHl8bnVsbDtcbn1cblxuY2xhc3MgX05vb3BHZXRUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIEdldFRlc3RhYmlsaXR5IHtcbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkIHt9XG4gIGZpbmRUZXN0YWJpbGl0eUluVHJlZShyZWdpc3RyeTogVGVzdGFiaWxpdHlSZWdpc3RyeSwgZWxlbTogYW55LCBmaW5kSW5BbmNlc3RvcnM6IGJvb2xlYW4pOlxuICAgICAgVGVzdGFiaWxpdHl8bnVsbCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHtAbGluayBHZXRUZXN0YWJpbGl0eX0gaW1wbGVtZW50YXRpb24gdXNlZCBieSB0aGUgQW5ndWxhciB0ZXN0aW5nIGZyYW1ld29yay5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRlc3RhYmlsaXR5R2V0dGVyKGdldHRlcjogR2V0VGVzdGFiaWxpdHkpOiB2b2lkIHtcbiAgX3Rlc3RhYmlsaXR5R2V0dGVyID0gZ2V0dGVyO1xufVxuXG5sZXQgX3Rlc3RhYmlsaXR5R2V0dGVyOiBHZXRUZXN0YWJpbGl0eSA9IG5ldyBfTm9vcEdldFRlc3RhYmlsaXR5KCk7XG4iXX0=