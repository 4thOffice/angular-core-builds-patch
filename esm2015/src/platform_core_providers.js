/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformRef, createPlatformFactory } from './application_ref';
import { PLATFORM_ID } from './application_tokens';
import { Console } from './console';
import { Injector } from './di';
import { TestabilityRegistry } from './testability/testability';
const _CORE_PLATFORM_PROVIDERS = [
    // Set a default platform name for platforms that don't set it explicitly.
    { provide: PLATFORM_ID, useValue: 'unknown' },
    { provide: PlatformRef, deps: [Injector] },
    { provide: TestabilityRegistry, deps: [] },
    { provide: Console, deps: [] },
];
/**
 * This platform has to be included in any other platform
 *
 * @publicApi
 */
export const platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29yZV9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9wbGF0Zm9ybV9jb3JlX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsV0FBVyxFQUFFLHFCQUFxQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFDLFFBQVEsRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFOUQsTUFBTSx3QkFBd0IsR0FBcUI7SUFDakQsMEVBQTBFO0lBQzFFLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO0lBQzNDLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQztJQUN4QyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0lBQ3hDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0NBQzdCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQbGF0Zm9ybVJlZiwgY3JlYXRlUGxhdGZvcm1GYWN0b3J5fSBmcm9tICcuL2FwcGxpY2F0aW9uX3JlZic7XG5pbXBvcnQge1BMQVRGT1JNX0lEfSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge0NvbnNvbGV9IGZyb20gJy4vY29uc29sZSc7XG5pbXBvcnQge0luamVjdG9yLCBTdGF0aWNQcm92aWRlcn0gZnJvbSAnLi9kaSc7XG5pbXBvcnQge1Rlc3RhYmlsaXR5UmVnaXN0cnl9IGZyb20gJy4vdGVzdGFiaWxpdHkvdGVzdGFiaWxpdHknO1xuXG5jb25zdCBfQ09SRV9QTEFURk9STV9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIC8vIFNldCBhIGRlZmF1bHQgcGxhdGZvcm0gbmFtZSBmb3IgcGxhdGZvcm1zIHRoYXQgZG9uJ3Qgc2V0IGl0IGV4cGxpY2l0bHkuXG4gIHtwcm92aWRlOiBQTEFURk9STV9JRCwgdXNlVmFsdWU6ICd1bmtub3duJ30sXG4gIHtwcm92aWRlOiBQbGF0Zm9ybVJlZiwgZGVwczogW0luamVjdG9yXX0sXG4gIHtwcm92aWRlOiBUZXN0YWJpbGl0eVJlZ2lzdHJ5LCBkZXBzOiBbXX0sXG4gIHtwcm92aWRlOiBDb25zb2xlLCBkZXBzOiBbXX0sXG5dO1xuXG4vKipcbiAqIFRoaXMgcGxhdGZvcm0gaGFzIHRvIGJlIGluY2x1ZGVkIGluIGFueSBvdGhlciBwbGF0Zm9ybVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQ29yZSA9IGNyZWF0ZVBsYXRmb3JtRmFjdG9yeShudWxsLCAnY29yZScsIF9DT1JFX1BMQVRGT1JNX1BST1ZJREVSUyk7XG4iXX0=