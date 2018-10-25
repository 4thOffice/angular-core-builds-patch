/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global } from '../util';
import { getComponent, getDirectives, getHostComponent, getInjector, getRootComponents } from './discovery_utils';
/**
 * This file introduces series of globally accessible debug tools
 * to allow for the Angular debugging story to function.
 *
 * To see this in action run the following command:
 *
 *   bazel run --define=compile=local
 *   //packages/core/test/bundling/todo:devserver
 *
 *  Then load `localhost:5432` and start using the console tools.
 */
/**
 * This value reflects the property on the window where the dev
 * tools are patched (window.ngDev).
 * */
export var GLOBAL_PUBLISH_EXPANDO_KEY = 'ngDev';
/*
 * Publishes a collection of default debug tools onto `window._ng_`.
 *
 * These functions are available globally when Angular is in development
 * mode and are automatically stripped away from prod mode is on.
 */
var _published = false;
export function publishDefaultGlobalUtils() {
    if (!_published) {
        _published = true;
        publishGlobalUtil('getComponent', getComponent);
        publishGlobalUtil('getHostComponent', getHostComponent);
        publishGlobalUtil('getInjector', getInjector);
        publishGlobalUtil('getRootComponents', getRootComponents);
        publishGlobalUtil('getDirectives', getDirectives);
    }
}
/**
 * Publishes the given function to `window.ngDevMode` so that it can be
 * used from the browser console when an application is not in production.
 */
export function publishGlobalUtil(name, fn) {
    var w = global;
    if (w) {
        var container = w[GLOBAL_PUBLISH_EXPANDO_KEY];
        if (!container) {
            container = w[GLOBAL_PUBLISH_EXPANDO_KEY] = {};
        }
        container[name] = fn;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaF9nbG9iYWxfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcHVibGlzaF9nbG9iYWxfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQy9CLE9BQU8sRUFBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRWhIOzs7Ozs7Ozs7O0dBVUc7QUFFSDs7O0tBR0s7QUFDTCxNQUFNLENBQUMsSUFBTSwwQkFBMEIsR0FBRyxPQUFPLENBQUM7QUFFbEQ7Ozs7O0dBS0c7QUFDSCxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDdkIsTUFBTSxVQUFVLHlCQUF5QjtJQUN2QyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDaEQsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RCxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDOUMsaUJBQWlCLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMxRCxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDO0FBTUQ7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQVksRUFBRSxFQUFZO0lBQzFELElBQU0sQ0FBQyxHQUFHLE1BQXVDLENBQUM7SUFDbEQsSUFBSSxDQUFDLEVBQUU7UUFDTCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsU0FBUyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoRDtRQUNELFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDdEI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtnbG9iYWx9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHtnZXRDb21wb25lbnQsIGdldERpcmVjdGl2ZXMsIGdldEhvc3RDb21wb25lbnQsIGdldEluamVjdG9yLCBnZXRSb290Q29tcG9uZW50c30gZnJvbSAnLi9kaXNjb3ZlcnlfdXRpbHMnO1xuXG4vKipcbiAqIFRoaXMgZmlsZSBpbnRyb2R1Y2VzIHNlcmllcyBvZiBnbG9iYWxseSBhY2Nlc3NpYmxlIGRlYnVnIHRvb2xzXG4gKiB0byBhbGxvdyBmb3IgdGhlIEFuZ3VsYXIgZGVidWdnaW5nIHN0b3J5IHRvIGZ1bmN0aW9uLlxuICpcbiAqIFRvIHNlZSB0aGlzIGluIGFjdGlvbiBydW4gdGhlIGZvbGxvd2luZyBjb21tYW5kOlxuICpcbiAqICAgYmF6ZWwgcnVuIC0tZGVmaW5lPWNvbXBpbGU9bG9jYWxcbiAqICAgLy9wYWNrYWdlcy9jb3JlL3Rlc3QvYnVuZGxpbmcvdG9kbzpkZXZzZXJ2ZXJcbiAqXG4gKiAgVGhlbiBsb2FkIGBsb2NhbGhvc3Q6NTQzMmAgYW5kIHN0YXJ0IHVzaW5nIHRoZSBjb25zb2xlIHRvb2xzLlxuICovXG5cbi8qKlxuICogVGhpcyB2YWx1ZSByZWZsZWN0cyB0aGUgcHJvcGVydHkgb24gdGhlIHdpbmRvdyB3aGVyZSB0aGUgZGV2XG4gKiB0b29scyBhcmUgcGF0Y2hlZCAod2luZG93Lm5nRGV2KS5cbiAqICovXG5leHBvcnQgY29uc3QgR0xPQkFMX1BVQkxJU0hfRVhQQU5ET19LRVkgPSAnbmdEZXYnO1xuXG4vKlxuICogUHVibGlzaGVzIGEgY29sbGVjdGlvbiBvZiBkZWZhdWx0IGRlYnVnIHRvb2xzIG9udG8gYHdpbmRvdy5fbmdfYC5cbiAqXG4gKiBUaGVzZSBmdW5jdGlvbnMgYXJlIGF2YWlsYWJsZSBnbG9iYWxseSB3aGVuIEFuZ3VsYXIgaXMgaW4gZGV2ZWxvcG1lbnRcbiAqIG1vZGUgYW5kIGFyZSBhdXRvbWF0aWNhbGx5IHN0cmlwcGVkIGF3YXkgZnJvbSBwcm9kIG1vZGUgaXMgb24uXG4gKi9cbmxldCBfcHVibGlzaGVkID0gZmFsc2U7XG5leHBvcnQgZnVuY3Rpb24gcHVibGlzaERlZmF1bHRHbG9iYWxVdGlscygpIHtcbiAgaWYgKCFfcHVibGlzaGVkKSB7XG4gICAgX3B1Ymxpc2hlZCA9IHRydWU7XG4gICAgcHVibGlzaEdsb2JhbFV0aWwoJ2dldENvbXBvbmVudCcsIGdldENvbXBvbmVudCk7XG4gICAgcHVibGlzaEdsb2JhbFV0aWwoJ2dldEhvc3RDb21wb25lbnQnLCBnZXRIb3N0Q29tcG9uZW50KTtcbiAgICBwdWJsaXNoR2xvYmFsVXRpbCgnZ2V0SW5qZWN0b3InLCBnZXRJbmplY3Rvcik7XG4gICAgcHVibGlzaEdsb2JhbFV0aWwoJ2dldFJvb3RDb21wb25lbnRzJywgZ2V0Um9vdENvbXBvbmVudHMpO1xuICAgIHB1Ymxpc2hHbG9iYWxVdGlsKCdnZXREaXJlY3RpdmVzJywgZ2V0RGlyZWN0aXZlcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlY2xhcmUgdHlwZSBHbG9iYWxEZXZNb2RlQ29udGFpbmVyID0ge1xuICBbR0xPQkFMX1BVQkxJU0hfRVhQQU5ET19LRVldOiB7W2ZuTmFtZTogc3RyaW5nXTogRnVuY3Rpb259O1xufTtcblxuLyoqXG4gKiBQdWJsaXNoZXMgdGhlIGdpdmVuIGZ1bmN0aW9uIHRvIGB3aW5kb3cubmdEZXZNb2RlYCBzbyB0aGF0IGl0IGNhbiBiZVxuICogdXNlZCBmcm9tIHRoZSBicm93c2VyIGNvbnNvbGUgd2hlbiBhbiBhcHBsaWNhdGlvbiBpcyBub3QgaW4gcHJvZHVjdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHB1Ymxpc2hHbG9iYWxVdGlsKG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGNvbnN0IHcgPSBnbG9iYWwgYXMgYW55IGFzIEdsb2JhbERldk1vZGVDb250YWluZXI7XG4gIGlmICh3KSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHdbR0xPQkFMX1BVQkxJU0hfRVhQQU5ET19LRVldO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICBjb250YWluZXIgPSB3W0dMT0JBTF9QVUJMSVNIX0VYUEFORE9fS0VZXSA9IHt9O1xuICAgIH1cbiAgICBjb250YWluZXJbbmFtZV0gPSBmbjtcbiAgfVxufVxuIl19