/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '../di';
import { scheduleMicroTask } from '../util';
import { NgZone } from '../zone/ng_zone';
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 * @publicApi
 */
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
        this._watchAngularEvents();
        _ngZone.run(() => { this.taskTrackingZone = Zone.current.get('TaskTrackingZone'); });
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
    getPendingRequestCount() { return this._pendingCount; }
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
Testability = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [NgZone])
], Testability);
export { Testability };
/**
 * A global registry of {@link Testability} instances for specific elements.
 * @publicApi
 */
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
    unregisterApplication(token) { this._applications.delete(token); }
    /**
     * Unregisters all applications
     */
    unregisterAllApplications() { this._applications.clear(); }
    /**
     * Get a testability hook associated with the application
     * @param elem root element
     */
    getTestability(elem) { return this._applications.get(elem) || null; }
    /**
     * Get all registered testabilities
     */
    getAllTestabilities() { return Array.from(this._applications.values()); }
    /**
     * Get all registered applications(root elements)
     */
    getAllRootElements() { return Array.from(this._applications.keys()); }
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
TestabilityRegistry = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], TestabilityRegistry);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDMUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBd0N2Qzs7Ozs7R0FLRztBQUVILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFjdEIsWUFBb0IsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFiM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDdEM7Ozs7O1dBS0c7UUFDSyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBbUIsRUFBRSxDQUFDO1FBS3RDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUM3QixDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FB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QUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdFOzs7OztPQUtHO0lBQ0gscUJBQXFCLENBQUMsSUFBVSxFQUFFLGtCQUEyQixJQUFJO1FBQy9ELE9BQU8sa0JBQWtCLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBQ0YsQ0FBQTtBQW5EWSxtQkFBbUI7SUFEL0IsVUFBVSxFQUFFOztHQUNBLG1CQUFtQixDQW1EL0I7U0FuRFksbUJBQW1CO0FBaUVoQyxNQUFNLG1CQUFtQjtJQUN2QixXQUFXLENBQUMsUUFBNkIsSUFBUyxDQUFDO0lBQ25ELHFCQUFxQixDQUFDLFFBQTZCLEVBQUUsSUFBUyxFQUFFLGVBQXdCO1FBRXRGLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE1BQXNCO0lBQ3pELGtCQUFrQixHQUFHLE1BQU0sQ0FBQztBQUM5QixDQUFDO0FBRUQsSUFBSSxrQkFBa0IsR0FBbUIsSUFBSSxtQkFBbUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJy4uL2RpJztcbmltcG9ydCB7c2NoZWR1bGVNaWNyb1Rhc2t9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJy4uL3pvbmUvbmdfem9uZSc7XG5cbi8qKlxuICogVGVzdGFiaWxpdHkgQVBJLlxuICogYGRlY2xhcmVgIGtleXdvcmQgY2F1c2VzIHRzaWNrbGUgdG8gZ2VuZXJhdGUgZXh0ZXJucywgc28gdGhlc2UgbWV0aG9kcyBhcmVcbiAqIG5vdCByZW5hbWVkIGJ5IENsb3N1cmUgQ29tcGlsZXIuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQdWJsaWNUZXN0YWJpbGl0eSB7XG4gIGlzU3RhYmxlKCk6IGJvb2xlYW47XG4gIHdoZW5TdGFibGUoY2FsbGJhY2s6IEZ1bmN0aW9uLCB0aW1lb3V0PzogbnVtYmVyLCB1cGRhdGVDYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZDtcbiAgZmluZFByb3ZpZGVycyh1c2luZzogYW55LCBwcm92aWRlcjogc3RyaW5nLCBleGFjdE1hdGNoOiBib29sZWFuKTogYW55W107XG59XG5cbi8vIEFuZ3VsYXIgaW50ZXJuYWwsIG5vdCBpbnRlbmRlZCBmb3IgcHVibGljIEFQSS5cbmV4cG9ydCBpbnRlcmZhY2UgUGVuZGluZ01hY3JvdGFzayB7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBjcmVhdGlvbkxvY2F0aW9uOiBFcnJvcjtcbiAgcnVuQ291bnQ/OiBudW1iZXI7XG4gIGRhdGE6IFRhc2tEYXRhO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhc2tEYXRhIHtcbiAgdGFyZ2V0PzogWE1MSHR0cFJlcXVlc3Q7XG4gIGRlbGF5PzogbnVtYmVyO1xuICBpc1BlcmlvZGljPzogYm9vbGVhbjtcbn1cblxuLy8gQW5ndWxhciBpbnRlcm5hbCwgbm90IGludGVuZGVkIGZvciBwdWJsaWMgQVBJLlxuZXhwb3J0IHR5cGUgRG9uZUNhbGxiYWNrID0gKGRpZFdvcms6IGJvb2xlYW4sIHRhc2tzPzogUGVuZGluZ01hY3JvdGFza1tdKSA9PiB2b2lkO1xuZXhwb3J0IHR5cGUgVXBkYXRlQ2FsbGJhY2sgPSAodGFza3M6IFBlbmRpbmdNYWNyb3Rhc2tbXSkgPT4gYm9vbGVhbjtcblxuaW50ZXJmYWNlIFdhaXRDYWxsYmFjayB7XG4gIC8vIE5lZWRzIHRvIGJlICdhbnknIC0gc2V0VGltZW91dCByZXR1cm5zIGEgbnVtYmVyIGFjY29yZGluZyB0byBFUzYsIGJ1dFxuICAvLyBvbiBOb2RlSlMgaXQgcmV0dXJucyBhIFRpbWVyLlxuICB0aW1lb3V0SWQ6IGFueTtcbiAgZG9uZUNiOiBEb25lQ2FsbGJhY2s7XG4gIHVwZGF0ZUNiPzogVXBkYXRlQ2FsbGJhY2s7XG59XG5cbi8qKlxuICogVGhlIFRlc3RhYmlsaXR5IHNlcnZpY2UgcHJvdmlkZXMgdGVzdGluZyBob29rcyB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBmcm9tXG4gKiB0aGUgYnJvd3NlciBhbmQgYnkgc2VydmljZXMgc3VjaCBhcyBQcm90cmFjdG9yLiBFYWNoIGJvb3RzdHJhcHBlZCBBbmd1bGFyXG4gKiBhcHBsaWNhdGlvbiBvbiB0aGUgcGFnZSB3aWxsIGhhdmUgYW4gaW5zdGFuY2Ugb2YgVGVzdGFiaWxpdHkuXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUZXN0YWJpbGl0eSBpbXBsZW1lbnRzIFB1YmxpY1Rlc3RhYmlsaXR5IHtcbiAgcHJpdmF0ZSBfcGVuZGluZ0NvdW50OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9pc1pvbmVTdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuICAvKipcbiAgICogV2hldGhlciBhbnkgd29yayB3YXMgZG9uZSBzaW5jZSB0aGUgbGFzdCAnd2hlblN0YWJsZScgY2FsbGJhY2suIFRoaXMgaXNcbiAgICogdXNlZnVsIHRvIGRldGVjdCBpZiB0aGlzIGNvdWxkIGhhdmUgcG90ZW50aWFsbHkgZGVzdGFiaWxpemVkIGFub3RoZXJcbiAgICogY29tcG9uZW50IHdoaWxlIGl0IGlzIHN0YWJpbGl6aW5nLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHByaXZhdGUgX2RpZFdvcms6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FsbGJhY2tzOiBXYWl0Q2FsbGJhY2tbXSA9IFtdO1xuXG4gIHByaXZhdGUgdGFza1RyYWNraW5nWm9uZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy5fd2F0Y2hBbmd1bGFyRXZlbnRzKCk7XG4gICAgX25nWm9uZS5ydW4oKCkgPT4geyB0aGlzLnRhc2tUcmFja2luZ1pvbmUgPSBab25lLmN1cnJlbnQuZ2V0KCdUYXNrVHJhY2tpbmdab25lJyk7IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hBbmd1bGFyRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuX25nWm9uZS5vblVuc3RhYmxlLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2RpZFdvcmsgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pc1pvbmVTdGFibGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgIE5nWm9uZS5hc3NlcnROb3RJbkFuZ3VsYXJab25lKCk7XG4gICAgICAgICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faXNab25lU3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2VzIHRoZSBudW1iZXIgb2YgcGVuZGluZyByZXF1ZXN0XG4gICAqIEBkZXByZWNhdGVkIHBlbmRpbmcgcmVxdWVzdHMgYXJlIG5vdyB0cmFja2VkIHdpdGggem9uZXMuXG4gICAqL1xuICBpbmNyZWFzZVBlbmRpbmdSZXF1ZXN0Q291bnQoKTogbnVtYmVyIHtcbiAgICB0aGlzLl9wZW5kaW5nQ291bnQgKz0gMTtcbiAgICB0aGlzLl9kaWRXb3JrID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50O1xuICB9XG5cbiAgLyoqXG4gICAqIERlY3JlYXNlcyB0aGUgbnVtYmVyIG9mIHBlbmRpbmcgcmVxdWVzdFxuICAgKiBAZGVwcmVjYXRlZCBwZW5kaW5nIHJlcXVlc3RzIGFyZSBub3cgdHJhY2tlZCB3aXRoIHpvbmVzXG4gICAqL1xuICBkZWNyZWFzZVBlbmRpbmdSZXF1ZXN0Q291bnQoKTogbnVtYmVyIHtcbiAgICB0aGlzLl9wZW5kaW5nQ291bnQgLT0gMTtcbiAgICBpZiAodGhpcy5fcGVuZGluZ0NvdW50IDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwZW5kaW5nIGFzeW5jIHJlcXVlc3RzIGJlbG93IHplcm8nKTtcbiAgICB9XG4gICAgdGhpcy5fcnVuQ2FsbGJhY2tzSWZSZWFkeSgpO1xuICAgIHJldHVybiB0aGlzLl9wZW5kaW5nQ291bnQ7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciBhbiBhc3NvY2lhdGVkIGFwcGxpY2F0aW9uIGlzIHN0YWJsZVxuICAgKi9cbiAgaXNTdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzWm9uZVN0YWJsZSAmJiB0aGlzLl9wZW5kaW5nQ291bnQgPT09IDAgJiYgIXRoaXMuX25nWm9uZS5oYXNQZW5kaW5nTWFjcm90YXNrcztcbiAgfVxuXG4gIHByaXZhdGUgX3J1bkNhbGxiYWNrc0lmUmVhZHkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNTdGFibGUoKSkge1xuICAgICAgLy8gU2NoZWR1bGVzIHRoZSBjYWxsIGJhY2tzIGluIGEgbmV3IGZyYW1lIHNvIHRoYXQgaXQgaXMgYWx3YXlzIGFzeW5jLlxuICAgICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4ge1xuICAgICAgICB3aGlsZSAodGhpcy5fY2FsbGJhY2tzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGxldCBjYiA9IHRoaXMuX2NhbGxiYWNrcy5wb3AoKSAhO1xuICAgICAgICAgIGNsZWFyVGltZW91dChjYi50aW1lb3V0SWQpO1xuICAgICAgICAgIGNiLmRvbmVDYih0aGlzLl9kaWRXb3JrKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaWRXb3JrID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RpbGwgbm90IHN0YWJsZSwgc2VuZCB1cGRhdGVzLlxuICAgICAgbGV0IHBlbmRpbmcgPSB0aGlzLmdldFBlbmRpbmdUYXNrcygpO1xuICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzLmZpbHRlcigoY2IpID0+IHtcbiAgICAgICAgaWYgKGNiLnVwZGF0ZUNiICYmIGNiLnVwZGF0ZUNiKHBlbmRpbmcpKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KGNiLnRpbWVvdXRJZCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZGlkV29yayA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQZW5kaW5nVGFza3MoKTogUGVuZGluZ01hY3JvdGFza1tdIHtcbiAgICBpZiAoIXRoaXMudGFza1RyYWNraW5nWm9uZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIENvcHkgdGhlIHRhc2tzIGRhdGEgc28gdGhhdCB3ZSBkb24ndCBsZWFrIHRhc2tzLlxuICAgIHJldHVybiB0aGlzLnRhc2tUcmFja2luZ1pvbmUubWFjcm9UYXNrcy5tYXAoKHQ6IFRhc2spID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZTogdC5zb3VyY2UsXG4gICAgICAgIC8vIEZyb20gVGFza1RyYWNraW5nWm9uZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9ibG9iL21hc3Rlci9saWIvem9uZS1zcGVjL3Rhc2stdHJhY2tpbmcudHMjTDQwXG4gICAgICAgIGNyZWF0aW9uTG9jYXRpb246ICh0IGFzIGFueSkuY3JlYXRpb25Mb2NhdGlvbiBhcyBFcnJvcixcbiAgICAgICAgZGF0YTogdC5kYXRhXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDYWxsYmFjayhjYjogRG9uZUNhbGxiYWNrLCB0aW1lb3V0PzogbnVtYmVyLCB1cGRhdGVDYj86IFVwZGF0ZUNhbGxiYWNrKSB7XG4gICAgbGV0IHRpbWVvdXRJZDogYW55ID0gLTE7XG4gICAgaWYgKHRpbWVvdXQgJiYgdGltZW91dCA+IDApIHtcbiAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MuZmlsdGVyKChjYikgPT4gY2IudGltZW91dElkICE9PSB0aW1lb3V0SWQpO1xuICAgICAgICBjYih0aGlzLl9kaWRXb3JrLCB0aGlzLmdldFBlbmRpbmdUYXNrcygpKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsYmFja3MucHVzaCg8V2FpdENhbGxiYWNrPntkb25lQ2I6IGNiLCB0aW1lb3V0SWQ6IHRpbWVvdXRJZCwgdXBkYXRlQ2I6IHVwZGF0ZUNifSk7XG4gIH1cblxuICAvKipcbiAgICogV2FpdCBmb3IgdGhlIGFwcGxpY2F0aW9uIHRvIGJlIHN0YWJsZSB3aXRoIGEgdGltZW91dC4gSWYgdGhlIHRpbWVvdXQgaXMgcmVhY2hlZCBiZWZvcmUgdGhhdFxuICAgKiBoYXBwZW5zLCB0aGUgY2FsbGJhY2sgcmVjZWl2ZXMgYSBsaXN0IG9mIHRoZSBtYWNybyB0YXNrcyB0aGF0IHdlcmUgcGVuZGluZywgb3RoZXJ3aXNlIG51bGwuXG4gICAqXG4gICAqIEBwYXJhbSBkb25lQ2IgVGhlIGNhbGxiYWNrIHRvIGludm9rZSB3aGVuIEFuZ3VsYXIgaXMgc3RhYmxlIG9yIHRoZSB0aW1lb3V0IGV4cGlyZXNcbiAgICogICAgd2hpY2hldmVyIGNvbWVzIGZpcnN0LlxuICAgKiBAcGFyYW0gdGltZW91dCBPcHRpb25hbC4gVGhlIG1heGltdW0gdGltZSB0byB3YWl0IGZvciBBbmd1bGFyIHRvIGJlY29tZSBzdGFibGUuIElmIG5vdFxuICAgKiAgICBzcGVjaWZpZWQsIHdoZW5TdGFibGUoKSB3aWxsIHdhaXQgZm9yZXZlci5cbiAgICogQHBhcmFtIHVwZGF0ZUNiIE9wdGlvbmFsLiBJZiBzcGVjaWZpZWQsIHRoaXMgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkIHdoZW5ldmVyIHRoZSBzZXQgb2ZcbiAgICogICAgcGVuZGluZyBtYWNyb3Rhc2tzIGNoYW5nZXMuIElmIHRoaXMgY2FsbGJhY2sgcmV0dXJucyB0cnVlIGRvbmVDYiB3aWxsIG5vdCBiZSBpbnZva2VkXG4gICAqICAgIGFuZCBubyBmdXJ0aGVyIHVwZGF0ZXMgd2lsbCBiZSBpc3N1ZWQuXG4gICAqL1xuICB3aGVuU3RhYmxlKGRvbmVDYjogRnVuY3Rpb24sIHRpbWVvdXQ/OiBudW1iZXIsIHVwZGF0ZUNiPzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodXBkYXRlQ2IgJiYgIXRoaXMudGFza1RyYWNraW5nWm9uZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdUYXNrIHRyYWNraW5nIHpvbmUgaXMgcmVxdWlyZWQgd2hlbiBwYXNzaW5nIGFuIHVwZGF0ZSBjYWxsYmFjayB0byAnICtcbiAgICAgICAgICAnd2hlblN0YWJsZSgpLiBJcyBcInpvbmUuanMvZGlzdC90YXNrLXRyYWNraW5nLmpzXCIgbG9hZGVkPycpO1xuICAgIH1cbiAgICAvLyBUaGVzZSBhcmd1bWVudHMgYXJlICdGdW5jdGlvbicgYWJvdmUgdG8ga2VlcCB0aGUgcHVibGljIEFQSSBzaW1wbGUuXG4gICAgdGhpcy5hZGRDYWxsYmFjayhkb25lQ2IgYXMgRG9uZUNhbGxiYWNrLCB0aW1lb3V0LCB1cGRhdGVDYiBhcyBVcGRhdGVDYWxsYmFjayk7XG4gICAgdGhpcy5fcnVuQ2FsbGJhY2tzSWZSZWFkeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbnVtYmVyIG9mIHBlbmRpbmcgcmVxdWVzdHNcbiAgICogQGRlcHJlY2F0ZWQgcGVuZGluZyByZXF1ZXN0cyBhcmUgbm93IHRyYWNrZWQgd2l0aCB6b25lc1xuICAgKi9cbiAgZ2V0UGVuZGluZ1JlcXVlc3RDb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGVuZGluZ0NvdW50OyB9XG5cbiAgLyoqXG4gICAqIEZpbmQgcHJvdmlkZXJzIGJ5IG5hbWVcbiAgICogQHBhcmFtIHVzaW5nIFRoZSByb290IGVsZW1lbnQgdG8gc2VhcmNoIGZyb21cbiAgICogQHBhcmFtIHByb3ZpZGVyIFRoZSBuYW1lIG9mIGJpbmRpbmcgdmFyaWFibGVcbiAgICogQHBhcmFtIGV4YWN0TWF0Y2ggV2hldGhlciB1c2luZyBleGFjdE1hdGNoXG4gICAqL1xuICBmaW5kUHJvdmlkZXJzKHVzaW5nOiBhbnksIHByb3ZpZGVyOiBzdHJpbmcsIGV4YWN0TWF0Y2g6IGJvb2xlYW4pOiBhbnlbXSB7XG4gICAgLy8gVE9ETyhqdWxpZW1yKTogaW1wbGVtZW50LlxuICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG4vKipcbiAqIEEgZ2xvYmFsIHJlZ2lzdHJ5IG9mIHtAbGluayBUZXN0YWJpbGl0eX0gaW5zdGFuY2VzIGZvciBzcGVjaWZpYyBlbGVtZW50cy5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlc3RhYmlsaXR5UmVnaXN0cnkge1xuICAvKiogQGludGVybmFsICovXG4gIF9hcHBsaWNhdGlvbnMgPSBuZXcgTWFwPGFueSwgVGVzdGFiaWxpdHk+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IF90ZXN0YWJpbGl0eUdldHRlci5hZGRUb1dpbmRvdyh0aGlzKTsgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgYW4gYXBwbGljYXRpb24gd2l0aCBhIHRlc3RhYmlsaXR5IGhvb2sgc28gdGhhdCBpdCBjYW4gYmUgdHJhY2tlZFxuICAgKiBAcGFyYW0gdG9rZW4gdG9rZW4gb2YgYXBwbGljYXRpb24sIHJvb3QgZWxlbWVudFxuICAgKiBAcGFyYW0gdGVzdGFiaWxpdHkgVGVzdGFiaWxpdHkgaG9va1xuICAgKi9cbiAgcmVnaXN0ZXJBcHBsaWNhdGlvbih0b2tlbjogYW55LCB0ZXN0YWJpbGl0eTogVGVzdGFiaWxpdHkpIHtcbiAgICB0aGlzLl9hcHBsaWNhdGlvbnMuc2V0KHRva2VuLCB0ZXN0YWJpbGl0eSk7XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlcnMgYW4gYXBwbGljYXRpb24uXG4gICAqIEBwYXJhbSB0b2tlbiB0b2tlbiBvZiBhcHBsaWNhdGlvbiwgcm9vdCBlbGVtZW50XG4gICAqL1xuICB1bnJlZ2lzdGVyQXBwbGljYXRpb24odG9rZW46IGFueSkgeyB0aGlzLl9hcHBsaWNhdGlvbnMuZGVsZXRlKHRva2VuKTsgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVycyBhbGwgYXBwbGljYXRpb25zXG4gICAqL1xuICB1bnJlZ2lzdGVyQWxsQXBwbGljYXRpb25zKCkgeyB0aGlzLl9hcHBsaWNhdGlvbnMuY2xlYXIoKTsgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSB0ZXN0YWJpbGl0eSBob29rIGFzc29jaWF0ZWQgd2l0aCB0aGUgYXBwbGljYXRpb25cbiAgICogQHBhcmFtIGVsZW0gcm9vdCBlbGVtZW50XG4gICAqL1xuICBnZXRUZXN0YWJpbGl0eShlbGVtOiBhbnkpOiBUZXN0YWJpbGl0eXxudWxsIHsgcmV0dXJuIHRoaXMuX2FwcGxpY2F0aW9ucy5nZXQoZWxlbSkgfHwgbnVsbDsgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHJlZ2lzdGVyZWQgdGVzdGFiaWxpdGllc1xuICAgKi9cbiAgZ2V0QWxsVGVzdGFiaWxpdGllcygpOiBUZXN0YWJpbGl0eVtdIHsgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fYXBwbGljYXRpb25zLnZhbHVlcygpKTsgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHJlZ2lzdGVyZWQgYXBwbGljYXRpb25zKHJvb3QgZWxlbWVudHMpXG4gICAqL1xuICBnZXRBbGxSb290RWxlbWVudHMoKTogYW55W10geyByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9hcHBsaWNhdGlvbnMua2V5cygpKTsgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRlc3RhYmlsaXR5IG9mIGEgbm9kZSBpbiB0aGUgVHJlZVxuICAgKiBAcGFyYW0gZWxlbSBub2RlXG4gICAqIEBwYXJhbSBmaW5kSW5BbmNlc3RvcnMgd2hldGhlciBmaW5kaW5nIHRlc3RhYmlsaXR5IGluIGFuY2VzdG9ycyBpZiB0ZXN0YWJpbGl0eSB3YXMgbm90IGZvdW5kIGluXG4gICAqIGN1cnJlbnQgbm9kZVxuICAgKi9cbiAgZmluZFRlc3RhYmlsaXR5SW5UcmVlKGVsZW06IE5vZGUsIGZpbmRJbkFuY2VzdG9yczogYm9vbGVhbiA9IHRydWUpOiBUZXN0YWJpbGl0eXxudWxsIHtcbiAgICByZXR1cm4gX3Rlc3RhYmlsaXR5R2V0dGVyLmZpbmRUZXN0YWJpbGl0eUluVHJlZSh0aGlzLCBlbGVtLCBmaW5kSW5BbmNlc3RvcnMpO1xuICB9XG59XG5cbi8qKlxuICogQWRhcHRlciBpbnRlcmZhY2UgZm9yIHJldHJpZXZpbmcgdGhlIGBUZXN0YWJpbGl0eWAgc2VydmljZSBhc3NvY2lhdGVkIGZvciBhXG4gKiBwYXJ0aWN1bGFyIGNvbnRleHQuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdldFRlc3RhYmlsaXR5IHtcbiAgYWRkVG9XaW5kb3cocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnkpOiB2b2lkO1xuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGVsZW06IGFueSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTpcbiAgICAgIFRlc3RhYmlsaXR5fG51bGw7XG59XG5cbmNsYXNzIF9Ob29wR2V0VGVzdGFiaWxpdHkgaW1wbGVtZW50cyBHZXRUZXN0YWJpbGl0eSB7XG4gIGFkZFRvV2luZG93KHJlZ2lzdHJ5OiBUZXN0YWJpbGl0eVJlZ2lzdHJ5KTogdm9pZCB7fVxuICBmaW5kVGVzdGFiaWxpdHlJblRyZWUocmVnaXN0cnk6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGVsZW06IGFueSwgZmluZEluQW5jZXN0b3JzOiBib29sZWFuKTpcbiAgICAgIFRlc3RhYmlsaXR5fG51bGwge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSB7QGxpbmsgR2V0VGVzdGFiaWxpdHl9IGltcGxlbWVudGF0aW9uIHVzZWQgYnkgdGhlIEFuZ3VsYXIgdGVzdGluZyBmcmFtZXdvcmsuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUZXN0YWJpbGl0eUdldHRlcihnZXR0ZXI6IEdldFRlc3RhYmlsaXR5KTogdm9pZCB7XG4gIF90ZXN0YWJpbGl0eUdldHRlciA9IGdldHRlcjtcbn1cblxubGV0IF90ZXN0YWJpbGl0eUdldHRlcjogR2V0VGVzdGFiaWxpdHkgPSBuZXcgX05vb3BHZXRUZXN0YWJpbGl0eSgpO1xuIl19