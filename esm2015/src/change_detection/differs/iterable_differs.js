/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { defineInjectable } from '../../di/defs';
import { Optional, SkipSelf } from '../../di/metadata';
import { DefaultIterableDifferFactory } from '../differs/default_iterable_differ';
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 *
 * @publicApi
 */
export class IterableDiffers {
    constructor(factories) { this.factories = factories; }
    static create(factories, parent) {
        if (parent != null) {
            const copied = parent.factories.slice();
            factories = factories.concat(copied);
        }
        return new IterableDiffers(factories);
    }
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * @usageNotes
     * ### Example
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories) {
        return {
            provide: IterableDiffers,
            useFactory: (parent) => {
                if (!parent) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
        };
    }
    find(iterable) {
        const factory = this.factories.find(f => f.supports(iterable));
        if (factory != null) {
            return factory;
        }
        else {
            throw new Error(`Cannot find a differ supporting object '${iterable}' of type '${getTypeNameForDebugging(iterable)}'`);
        }
    }
}
IterableDiffers.ngInjectableDef = defineInjectable({
    providedIn: 'root',
    factory: () => new IterableDiffers([new DefaultIterableDifferFactory()])
});
export function getTypeNameForDebugging(type) {
    return type['name'] || typeof type;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmFibGVfZGlmZmVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9pdGVyYWJsZV9kaWZmZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXJELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBNEhoRjs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGVBQWU7SUFVMUIsWUFBWSxTQUFrQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUUvRSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQWtDLEVBQUUsTUFBd0I7UUFDeEUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBa0M7UUFDOUMsT0FBTztZQUNMLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxDQUFDLE1BQXVCLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCwwRkFBMEY7b0JBQzFGLEtBQUs7b0JBQ0wsNkVBQTZFO29CQUM3RSxNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7aUJBQzVFO2dCQUNELE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUNELDZGQUE2RjtZQUM3RixJQUFJLEVBQUUsQ0FBQyxDQUFDLGVBQWUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMxRCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksQ0FBQyxRQUFhO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUNuQixPQUFPLE9BQU8sQ0FBQztTQUNoQjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDWCwyQ0FBMkMsUUFBUSxjQUFjLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1RztJQUNILENBQUM7O0FBakVNLCtCQUFlLEdBQUcsZ0JBQWdCLENBQUM7SUFDeEMsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksZUFBZSxDQUFDLENBQUMsSUFBSSw0QkFBNEIsRUFBRSxDQUFDLENBQUM7Q0FDekUsQ0FBQyxDQUFDO0FBaUVMLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxJQUFTO0lBQy9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ZGVmaW5lSW5qZWN0YWJsZX0gZnJvbSAnLi4vLi4vZGkvZGVmcyc7XG5pbXBvcnQge09wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnLi4vLi4vZGkvbWV0YWRhdGEnO1xuaW1wb3J0IHtTdGF0aWNQcm92aWRlcn0gZnJvbSAnLi4vLi4vZGkvcHJvdmlkZXInO1xuaW1wb3J0IHtEZWZhdWx0SXRlcmFibGVEaWZmZXJGYWN0b3J5fSBmcm9tICcuLi9kaWZmZXJzL2RlZmF1bHRfaXRlcmFibGVfZGlmZmVyJztcblxuXG4vKipcbiAqIEEgdHlwZSBkZXNjcmliaW5nIHN1cHBvcnRlZCBpdGVyYWJsZSB0eXBlcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIE5nSXRlcmFibGU8VD4gPSBBcnJheTxUPnwgSXRlcmFibGU8VD47XG5cbi8qKlxuICogQSBzdHJhdGVneSBmb3IgdHJhY2tpbmcgY2hhbmdlcyBvdmVyIHRpbWUgdG8gYW4gaXRlcmFibGUuIFVzZWQgYnkge0BsaW5rIE5nRm9yT2Z9IHRvXG4gKiByZXNwb25kIHRvIGNoYW5nZXMgaW4gYW4gaXRlcmFibGUgYnkgZWZmZWN0aW5nIGVxdWl2YWxlbnQgY2hhbmdlcyBpbiB0aGUgRE9NLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJdGVyYWJsZURpZmZlcjxWPiB7XG4gIC8qKlxuICAgKiBDb21wdXRlIGEgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBwcmV2aW91cyBzdGF0ZSBhbmQgdGhlIG5ldyBgb2JqZWN0YCBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCBjb250YWluaW5nIHRoZSBuZXcgdmFsdWUuXG4gICAqIEByZXR1cm5zIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBkaWZmZXJlbmNlLiBUaGUgcmV0dXJuIHZhbHVlIGlzIG9ubHkgdmFsaWQgdW50aWwgdGhlIG5leHRcbiAgICogYGRpZmYoKWAgaW52b2NhdGlvbi5cbiAgICovXG4gIGRpZmYob2JqZWN0OiBOZ0l0ZXJhYmxlPFY+KTogSXRlcmFibGVDaGFuZ2VzPFY+fG51bGw7XG59XG5cbi8qKlxuICogQW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIGNoYW5nZXMgaW4gdGhlIGBJdGVyYWJsZWAgY29sbGVjdGlvbiBzaW5jZSBsYXN0IHRpbWVcbiAqIGBJdGVyYWJsZURpZmZlciNkaWZmKClgIHdhcyBpbnZva2VkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJdGVyYWJsZUNoYW5nZXM8Vj4ge1xuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCBjaGFuZ2VzLiBgSXRlcmFibGVDaGFuZ2VSZWNvcmRgIHdpbGwgY29udGFpbiBpbmZvcm1hdGlvbiBhYm91dCBjaGFuZ2VzXG4gICAqIHRvIGVhY2ggaXRlbS5cbiAgICovXG4gIGZvckVhY2hJdGVtKGZuOiAocmVjb3JkOiBJdGVyYWJsZUNoYW5nZVJlY29yZDxWPikgPT4gdm9pZCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIHNldCBvZiBvcGVyYXRpb25zIHdoaWNoIHdoZW4gYXBwbGllZCB0byB0aGUgb3JpZ2luYWwgYEl0ZXJhYmxlYCB3aWxsIHByb2R1Y2UgdGhlXG4gICAqIG5ldyBgSXRlcmFibGVgLlxuICAgKlxuICAgKiBOT1RFOiBUaGVzZSBhcmUgbm90IG5lY2Vzc2FyaWx5IHRoZSBhY3R1YWwgb3BlcmF0aW9ucyB3aGljaCB3ZXJlIGFwcGxpZWQgdG8gdGhlIG9yaWdpbmFsXG4gICAqIGBJdGVyYWJsZWAsIHJhdGhlciB0aGVzZSBhcmUgYSBzZXQgb2YgY29tcHV0ZWQgb3BlcmF0aW9ucyB3aGljaCBtYXkgbm90IGJlIHRoZSBzYW1lIGFzIHRoZVxuICAgKiBvbmVzIGFwcGxpZWQuXG4gICAqXG4gICAqIEBwYXJhbSByZWNvcmQgQSBjaGFuZ2Ugd2hpY2ggbmVlZHMgdG8gYmUgYXBwbGllZFxuICAgKiBAcGFyYW0gcHJldmlvdXNJbmRleCBUaGUgYEl0ZXJhYmxlQ2hhbmdlUmVjb3JkI3ByZXZpb3VzSW5kZXhgIG9mIHRoZSBgcmVjb3JkYCByZWZlcnMgdG8gdGhlXG4gICAqICAgICAgICBvcmlnaW5hbCBgSXRlcmFibGVgIGxvY2F0aW9uLCB3aGVyZSBhcyBgcHJldmlvdXNJbmRleGAgcmVmZXJzIHRvIHRoZSB0cmFuc2llbnQgbG9jYXRpb25cbiAgICogICAgICAgIG9mIHRoZSBpdGVtLCBhZnRlciBhcHBseWluZyB0aGUgb3BlcmF0aW9ucyB1cCB0byB0aGlzIHBvaW50LlxuICAgKiBAcGFyYW0gY3VycmVudEluZGV4IFRoZSBgSXRlcmFibGVDaGFuZ2VSZWNvcmQjY3VycmVudEluZGV4YCBvZiB0aGUgYHJlY29yZGAgcmVmZXJzIHRvIHRoZVxuICAgKiAgICAgICAgb3JpZ2luYWwgYEl0ZXJhYmxlYCBsb2NhdGlvbiwgd2hlcmUgYXMgYGN1cnJlbnRJbmRleGAgcmVmZXJzIHRvIHRoZSB0cmFuc2llbnQgbG9jYXRpb25cbiAgICogICAgICAgIG9mIHRoZSBpdGVtLCBhZnRlciBhcHBseWluZyB0aGUgb3BlcmF0aW9ucyB1cCB0byB0aGlzIHBvaW50LlxuICAgKi9cbiAgZm9yRWFjaE9wZXJhdGlvbihcbiAgICAgIGZuOlxuICAgICAgICAgIChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFY+LCBwcmV2aW91c0luZGV4OiBudW1iZXJ8bnVsbCxcbiAgICAgICAgICAgY3VycmVudEluZGV4OiBudW1iZXJ8bnVsbCkgPT4gdm9pZCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBjaGFuZ2VzIGluIHRoZSBvcmRlciBvZiBvcmlnaW5hbCBgSXRlcmFibGVgIHNob3dpbmcgd2hlcmUgdGhlIG9yaWdpbmFsIGl0ZW1zXG4gICAqIGhhdmUgbW92ZWQuXG4gICAqL1xuICBmb3JFYWNoUHJldmlvdXNJdGVtKGZuOiAocmVjb3JkOiBJdGVyYWJsZUNoYW5nZVJlY29yZDxWPikgPT4gdm9pZCk6IHZvaWQ7XG5cbiAgLyoqIEl0ZXJhdGUgb3ZlciBhbGwgYWRkZWQgaXRlbXMuICovXG4gIGZvckVhY2hBZGRlZEl0ZW0oZm46IChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFY+KSA9PiB2b2lkKTogdm9pZDtcblxuICAvKiogSXRlcmF0ZSBvdmVyIGFsbCBtb3ZlZCBpdGVtcy4gKi9cbiAgZm9yRWFjaE1vdmVkSXRlbShmbjogKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8Vj4pID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKiBJdGVyYXRlIG92ZXIgYWxsIHJlbW92ZWQgaXRlbXMuICovXG4gIGZvckVhY2hSZW1vdmVkSXRlbShmbjogKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8Vj4pID0+IHZvaWQpOiB2b2lkO1xuXG4gIC8qKiBJdGVyYXRlIG92ZXIgYWxsIGl0ZW1zIHdoaWNoIGhhZCB0aGVpciBpZGVudGl0eSAoYXMgY29tcHV0ZWQgYnkgdGhlIGBUcmFja0J5RnVuY3Rpb25gKVxuICAgKiBjaGFuZ2VkLiAqL1xuICBmb3JFYWNoSWRlbnRpdHlDaGFuZ2UoZm46IChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFY+KSA9PiB2b2lkKTogdm9pZDtcbn1cblxuLyoqXG4gKiBSZWNvcmQgcmVwcmVzZW50aW5nIHRoZSBpdGVtIGNoYW5nZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmFibGVDaGFuZ2VSZWNvcmQ8Vj4ge1xuICAvKiogQ3VycmVudCBpbmRleCBvZiB0aGUgaXRlbSBpbiBgSXRlcmFibGVgIG9yIG51bGwgaWYgcmVtb3ZlZC4gKi9cbiAgcmVhZG9ubHkgY3VycmVudEluZGV4OiBudW1iZXJ8bnVsbDtcblxuICAvKiogUHJldmlvdXMgaW5kZXggb2YgdGhlIGl0ZW0gaW4gYEl0ZXJhYmxlYCBvciBudWxsIGlmIGFkZGVkLiAqL1xuICByZWFkb25seSBwcmV2aW91c0luZGV4OiBudW1iZXJ8bnVsbDtcblxuICAvKiogVGhlIGl0ZW0uICovXG4gIHJlYWRvbmx5IGl0ZW06IFY7XG5cbiAgLyoqIFRyYWNrIGJ5IGlkZW50aXR5IGFzIGNvbXB1dGVkIGJ5IHRoZSBgVHJhY2tCeUZ1bmN0aW9uYC4gKi9cbiAgcmVhZG9ubHkgdHJhY2tCeUlkOiBhbnk7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdjQuMC4wIC0gVXNlIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkIGluc3RlYWQuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGVjdGlvbkNoYW5nZVJlY29yZDxWPiBleHRlbmRzIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPFY+IHt9XG5cbi8qKlxuICogQW4gb3B0aW9uYWwgZnVuY3Rpb24gcGFzc2VkIGludG8ge0BsaW5rIE5nRm9yT2Z9IHRoYXQgZGVmaW5lcyBob3cgdG8gdHJhY2tcbiAqIGl0ZW1zIGluIGFuIGl0ZXJhYmxlIChlLmcuIGZieSBpbmRleCBvciBpZClcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tCeUZ1bmN0aW9uPFQ+IHsgKGluZGV4OiBudW1iZXIsIGl0ZW06IFQpOiBhbnk7IH1cblxuLyoqXG4gKiBQcm92aWRlcyBhIGZhY3RvcnkgZm9yIHtAbGluayBJdGVyYWJsZURpZmZlcn0uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEl0ZXJhYmxlRGlmZmVyRmFjdG9yeSB7XG4gIHN1cHBvcnRzKG9iamVjdHM6IGFueSk6IGJvb2xlYW47XG4gIGNyZWF0ZTxWPih0cmFja0J5Rm4/OiBUcmFja0J5RnVuY3Rpb248Vj4pOiBJdGVyYWJsZURpZmZlcjxWPjtcbn1cblxuLyoqXG4gKiBBIHJlcG9zaXRvcnkgb2YgZGlmZmVyZW50IGl0ZXJhYmxlIGRpZmZpbmcgc3RyYXRlZ2llcyB1c2VkIGJ5IE5nRm9yLCBOZ0NsYXNzLCBhbmQgb3RoZXJzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIEl0ZXJhYmxlRGlmZmVycyB7XG4gIHN0YXRpYyBuZ0luamVjdGFibGVEZWYgPSBkZWZpbmVJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgZmFjdG9yeTogKCkgPT4gbmV3IEl0ZXJhYmxlRGlmZmVycyhbbmV3IERlZmF1bHRJdGVyYWJsZURpZmZlckZhY3RvcnkoKV0pXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB2NC4wLjAgLSBTaG91bGQgYmUgcHJpdmF0ZVxuICAgKi9cbiAgZmFjdG9yaWVzOiBJdGVyYWJsZURpZmZlckZhY3RvcnlbXTtcbiAgY29uc3RydWN0b3IoZmFjdG9yaWVzOiBJdGVyYWJsZURpZmZlckZhY3RvcnlbXSkgeyB0aGlzLmZhY3RvcmllcyA9IGZhY3RvcmllczsgfVxuXG4gIHN0YXRpYyBjcmVhdGUoZmFjdG9yaWVzOiBJdGVyYWJsZURpZmZlckZhY3RvcnlbXSwgcGFyZW50PzogSXRlcmFibGVEaWZmZXJzKTogSXRlcmFibGVEaWZmZXJzIHtcbiAgICBpZiAocGFyZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGNvcGllZCA9IHBhcmVudC5mYWN0b3JpZXMuc2xpY2UoKTtcbiAgICAgIGZhY3RvcmllcyA9IGZhY3Rvcmllcy5jb25jYXQoY29waWVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEl0ZXJhYmxlRGlmZmVycyhmYWN0b3JpZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRha2VzIGFuIGFycmF5IG9mIHtAbGluayBJdGVyYWJsZURpZmZlckZhY3Rvcnl9IGFuZCByZXR1cm5zIGEgcHJvdmlkZXIgdXNlZCB0byBleHRlbmQgdGhlXG4gICAqIGluaGVyaXRlZCB7QGxpbmsgSXRlcmFibGVEaWZmZXJzfSBpbnN0YW5jZSB3aXRoIHRoZSBwcm92aWRlZCBmYWN0b3JpZXMgYW5kIHJldHVybiBhIG5ld1xuICAgKiB7QGxpbmsgSXRlcmFibGVEaWZmZXJzfSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIGhvdyB0byBleHRlbmQgYW4gZXhpc3RpbmcgbGlzdCBvZiBmYWN0b3JpZXMsXG4gICAqIHdoaWNoIHdpbGwgb25seSBiZSBhcHBsaWVkIHRvIHRoZSBpbmplY3RvciBmb3IgdGhpcyBjb21wb25lbnQgYW5kIGl0cyBjaGlsZHJlbi5cbiAgICogVGhpcyBzdGVwIGlzIGFsbCB0aGF0J3MgcmVxdWlyZWQgdG8gbWFrZSBhIG5ldyB7QGxpbmsgSXRlcmFibGVEaWZmZXJ9IGF2YWlsYWJsZS5cbiAgICpcbiAgICogYGBgXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHZpZXdQcm92aWRlcnM6IFtcbiAgICogICAgIEl0ZXJhYmxlRGlmZmVycy5leHRlbmQoW25ldyBJbW11dGFibGVMaXN0RGlmZmVyKCldKVxuICAgKiAgIF1cbiAgICogfSlcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKGZhY3RvcmllczogSXRlcmFibGVEaWZmZXJGYWN0b3J5W10pOiBTdGF0aWNQcm92aWRlciB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3ZpZGU6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgIHVzZUZhY3Rvcnk6IChwYXJlbnQ6IEl0ZXJhYmxlRGlmZmVycykgPT4ge1xuICAgICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAgIC8vIFR5cGljYWxseSB3b3VsZCBvY2N1ciB3aGVuIGNhbGxpbmcgSXRlcmFibGVEaWZmZXJzLmV4dGVuZCBpbnNpZGUgb2YgZGVwZW5kZW5jaWVzIHBhc3NlZFxuICAgICAgICAgIC8vIHRvXG4gICAgICAgICAgLy8gYm9vdHN0cmFwKCksIHdoaWNoIHdvdWxkIG92ZXJyaWRlIGRlZmF1bHQgcGlwZXMgaW5zdGVhZCBvZiBleHRlbmRpbmcgdGhlbS5cbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBleHRlbmQgSXRlcmFibGVEaWZmZXJzIHdpdGhvdXQgYSBwYXJlbnQgaW5qZWN0b3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSXRlcmFibGVEaWZmZXJzLmNyZWF0ZShmYWN0b3JpZXMsIHBhcmVudCk7XG4gICAgICB9LFxuICAgICAgLy8gRGVwZW5kZW5jeSB0ZWNobmljYWxseSBpc24ndCBvcHRpb25hbCwgYnV0IHdlIGNhbiBwcm92aWRlIGEgYmV0dGVyIGVycm9yIG1lc3NhZ2UgdGhpcyB3YXkuXG4gICAgICBkZXBzOiBbW0l0ZXJhYmxlRGlmZmVycywgbmV3IFNraXBTZWxmKCksIG5ldyBPcHRpb25hbCgpXV1cbiAgICB9O1xuICB9XG5cbiAgZmluZChpdGVyYWJsZTogYW55KTogSXRlcmFibGVEaWZmZXJGYWN0b3J5IHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5mYWN0b3JpZXMuZmluZChmID0+IGYuc3VwcG9ydHMoaXRlcmFibGUpKTtcbiAgICBpZiAoZmFjdG9yeSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDYW5ub3QgZmluZCBhIGRpZmZlciBzdXBwb3J0aW5nIG9iamVjdCAnJHtpdGVyYWJsZX0nIG9mIHR5cGUgJyR7Z2V0VHlwZU5hbWVGb3JEZWJ1Z2dpbmcoaXRlcmFibGUpfSdgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFR5cGVOYW1lRm9yRGVidWdnaW5nKHR5cGU6IGFueSk6IHN0cmluZyB7XG4gIHJldHVybiB0eXBlWyduYW1lJ10gfHwgdHlwZW9mIHR5cGU7XG59XG4iXX0=