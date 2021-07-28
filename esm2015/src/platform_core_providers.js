/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { createPlatformFactory, PlatformRef } from './application_ref';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29yZV9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9wbGF0Zm9ybV9jb3JlX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsV0FBVyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFDLFFBQVEsRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFOUQsTUFBTSx3QkFBd0IsR0FBcUI7SUFDakQsMEVBQTBFO0lBQzFFLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO0lBQzNDLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBQztJQUN4QyxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0lBQ3hDLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0NBQzdCLENBQUM7QUFFRjs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2NyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgUGxhdGZvcm1SZWZ9IGZyb20gJy4vYXBwbGljYXRpb25fcmVmJztcbmltcG9ydCB7UExBVEZPUk1fSUR9IGZyb20gJy4vYXBwbGljYXRpb25fdG9rZW5zJztcbmltcG9ydCB7Q29uc29sZX0gZnJvbSAnLi9jb25zb2xlJztcbmltcG9ydCB7SW5qZWN0b3IsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICcuL2RpJztcbmltcG9ydCB7VGVzdGFiaWxpdHlSZWdpc3RyeX0gZnJvbSAnLi90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5cbmNvbnN0IF9DT1JFX1BMQVRGT1JNX1BST1ZJREVSUzogU3RhdGljUHJvdmlkZXJbXSA9IFtcbiAgLy8gU2V0IGEgZGVmYXVsdCBwbGF0Zm9ybSBuYW1lIGZvciBwbGF0Zm9ybXMgdGhhdCBkb24ndCBzZXQgaXQgZXhwbGljaXRseS5cbiAge3Byb3ZpZGU6IFBMQVRGT1JNX0lELCB1c2VWYWx1ZTogJ3Vua25vd24nfSxcbiAge3Byb3ZpZGU6IFBsYXRmb3JtUmVmLCBkZXBzOiBbSW5qZWN0b3JdfSxcbiAge3Byb3ZpZGU6IFRlc3RhYmlsaXR5UmVnaXN0cnksIGRlcHM6IFtdfSxcbiAge3Byb3ZpZGU6IENvbnNvbGUsIGRlcHM6IFtdfSxcbl07XG5cbi8qKlxuICogVGhpcyBwbGF0Zm9ybSBoYXMgdG8gYmUgaW5jbHVkZWQgaW4gYW55IG90aGVyIHBsYXRmb3JtXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgcGxhdGZvcm1Db3JlID0gY3JlYXRlUGxhdGZvcm1GYWN0b3J5KG51bGwsICdjb3JlJywgX0NPUkVfUExBVEZPUk1fUFJPVklERVJTKTtcbiJdfQ==