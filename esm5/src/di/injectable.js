/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { R3_COMPILE_INJECTABLE } from '../ivy_switch';
import { makeDecorator } from '../util/decorators';
/**
* Injectable decorator and metadata.
*
* @Annotation
*/
export var Injectable = makeDecorator('Injectable', undefined, undefined, undefined, function (type, meta) { return R3_COMPILE_INJECTABLE(type, meta); });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2RpL2luamVjdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXBELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQThDakQ7Ozs7RUFJRTtBQUNGLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBd0IsYUFBYSxDQUN4RCxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQzdDLFVBQUMsSUFBZSxFQUFFLElBQWdCLElBQUssT0FBQSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSM19DT01QSUxFX0lOSkVDVEFCTEV9IGZyb20gJy4uL2l2eV9zd2l0Y2gnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi90eXBlJztcbmltcG9ydCB7bWFrZURlY29yYXRvcn0gZnJvbSAnLi4vdXRpbC9kZWNvcmF0b3JzJztcblxuaW1wb3J0IHtJbmplY3RhYmxlRGVmLCBJbmplY3RhYmxlVHlwZX0gZnJvbSAnLi9kZWZzJztcbmltcG9ydCB7Q2xhc3NTYW5zUHJvdmlkZXIsIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyLCBFeGlzdGluZ1NhbnNQcm92aWRlciwgRmFjdG9yeVNhbnNQcm92aWRlciwgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIsIFZhbHVlUHJvdmlkZXIsIFZhbHVlU2Fuc1Byb3ZpZGVyfSBmcm9tICcuL3Byb3ZpZGVyJztcblxuLyoqXG4gKiBJbmplY3RhYmxlIHByb3ZpZGVycyB1c2VkIGluIGBASW5qZWN0YWJsZWAgZGVjb3JhdG9yLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IHR5cGUgSW5qZWN0YWJsZVByb3ZpZGVyID0gVmFsdWVTYW5zUHJvdmlkZXIgfCBFeGlzdGluZ1NhbnNQcm92aWRlciB8XG4gICAgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIgfCBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciB8IEZhY3RvcnlTYW5zUHJvdmlkZXIgfCBDbGFzc1NhbnNQcm92aWRlcjtcblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3RhYmxlIGRlY29yYXRvciAvIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVEZWNvcmF0b3Ige1xuICAvKipcbiAgICogQSBtYXJrZXIgbWV0YWRhdGEgdGhhdCBtYXJrcyBhIGNsYXNzIGFzIGF2YWlsYWJsZSB0byBgSW5qZWN0b3JgIGZvciBjcmVhdGlvbi5cbiAgICpcbiAgICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSBbXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwiXShndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbikuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL21ldGFkYXRhX3NwZWMudHMgcmVnaW9uPSdJbmplY3RhYmxlJ31cbiAgICpcbiAgICogYEluamVjdG9yYCB3aWxsIHRocm93IGFuIGVycm9yIHdoZW4gdHJ5aW5nIHRvIGluc3RhbnRpYXRlIGEgY2xhc3MgdGhhdFxuICAgKiBkb2VzIG5vdCBoYXZlIGBASW5qZWN0YWJsZWAgbWFya2VyLCBhcyBzaG93biBpbiB0aGUgZXhhbXBsZSBiZWxvdy5cbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvbWV0YWRhdGFfc3BlYy50cyByZWdpb249J0luamVjdGFibGVUaHJvd3MnfVxuICAgKlxuICAgKi9cbiAgKCk6IGFueTtcbiAgKG9wdGlvbnM/OiB7cHJvdmlkZWRJbjogVHlwZTxhbnk+fCAncm9vdCcgfCBudWxsfSZJbmplY3RhYmxlUHJvdmlkZXIpOiBhbnk7XG4gIG5ldyAoKTogSW5qZWN0YWJsZTtcbiAgbmV3IChvcHRpb25zPzoge3Byb3ZpZGVkSW46IFR5cGU8YW55PnwgJ3Jvb3QnIHwgbnVsbH0mSW5qZWN0YWJsZVByb3ZpZGVyKTogSW5qZWN0YWJsZTtcbn1cblxuLyoqXG4gKiBUeXBlIG9mIHRoZSBJbmplY3RhYmxlIG1ldGFkYXRhLlxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmplY3RhYmxlIHsgcHJvdmlkZWRJbj86IFR5cGU8YW55Pnwncm9vdCd8bnVsbDsgfVxuXG4vKipcbiogSW5qZWN0YWJsZSBkZWNvcmF0b3IgYW5kIG1ldGFkYXRhLlxuKlxuKiBAQW5ub3RhdGlvblxuKi9cbmV4cG9ydCBjb25zdCBJbmplY3RhYmxlOiBJbmplY3RhYmxlRGVjb3JhdG9yID0gbWFrZURlY29yYXRvcihcbiAgICAnSW5qZWN0YWJsZScsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgKHR5cGU6IFR5cGU8YW55PiwgbWV0YTogSW5qZWN0YWJsZSkgPT4gUjNfQ09NUElMRV9JTkpFQ1RBQkxFKHR5cGUsIG1ldGEpKTtcblxuLyoqXG4gKiBUeXBlIHJlcHJlc2VudGluZyBpbmplY3RhYmxlIHNlcnZpY2UuXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIEluamVjdGFibGVUeXBlPFQ+IGV4dGVuZHMgVHlwZTxUPiB7IG5nSW5qZWN0YWJsZURlZjogSW5qZWN0YWJsZURlZjxUPjsgfVxuIl19