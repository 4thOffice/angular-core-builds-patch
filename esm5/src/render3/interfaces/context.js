/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * This property will be monkey-patched on elements, components and directives
 */
export var MONKEY_PATCH_KEY_NAME = '__ngContext__';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQU1IOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQUcsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbmltcG9ydCB7UkVsZW1lbnR9IGZyb20gJy4vcmVuZGVyZXInO1xuaW1wb3J0IHtMVmlld30gZnJvbSAnLi92aWV3JztcblxuLyoqXG4gKiBUaGlzIHByb3BlcnR5IHdpbGwgYmUgbW9ua2V5LXBhdGNoZWQgb24gZWxlbWVudHMsIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IE1PTktFWV9QQVRDSF9LRVlfTkFNRSA9ICdfX25nQ29udGV4dF9fJztcblxuLyoqXG4gKiBUaGUgaW50ZXJuYWwgdmlldyBjb250ZXh0IHdoaWNoIGlzIHNwZWNpZmljIHRvIGEgZ2l2ZW4gRE9NIGVsZW1lbnQsIGRpcmVjdGl2ZSBvclxuICogY29tcG9uZW50IGluc3RhbmNlLiBFYWNoIHZhbHVlIGluIGhlcmUgKGJlc2lkZXMgdGhlIExWaWV3IGFuZCBlbGVtZW50IG5vZGUgZGV0YWlscylcbiAqIGNhbiBiZSBwcmVzZW50LCBudWxsIG9yIHVuZGVmaW5lZC4gSWYgdW5kZWZpbmVkIHRoZW4gaXQgaW1wbGllcyB0aGUgdmFsdWUgaGFzIG5vdCBiZWVuXG4gKiBsb29rZWQgdXAgeWV0LCBvdGhlcndpc2UsIGlmIG51bGwsIHRoZW4gYSBsb29rdXAgd2FzIGV4ZWN1dGVkIGFuZCBub3RoaW5nIHdhcyBmb3VuZC5cbiAqXG4gKiBFYWNoIHZhbHVlIHdpbGwgZ2V0IGZpbGxlZCB3aGVuIHRoZSByZXNwZWN0aXZlIHZhbHVlIGlzIGV4YW1pbmVkIHdpdGhpbiB0aGUgZ2V0Q29udGV4dFxuICogZnVuY3Rpb24uIFRoZSBjb21wb25lbnQsIGVsZW1lbnQgYW5kIGVhY2ggZGlyZWN0aXZlIGluc3RhbmNlIHdpbGwgc2hhcmUgdGhlIHNhbWUgaW5zdGFuY2VcbiAqIG9mIHRoZSBjb250ZXh0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIExDb250ZXh0IHtcbiAgLyoqXG4gICAqIFRoZSBjb21wb25lbnQncyBwYXJlbnQgdmlldyBkYXRhLlxuICAgKi9cbiAgbFZpZXc6IExWaWV3O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggaW5zdGFuY2Ugb2YgdGhlIG5vZGUuXG4gICAqL1xuICBub2RlSW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGluc3RhbmNlIG9mIHRoZSBET00gbm9kZSB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBsTm9kZS5cbiAgICovXG4gIG5hdGl2ZTogUkVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgQ29tcG9uZW50IG5vZGUuXG4gICAqL1xuICBjb21wb25lbnQ6IHt9fG51bGx8dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBhY3RpdmUgZGlyZWN0aXZlcyB0aGF0IGV4aXN0IG9uIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGRpcmVjdGl2ZXM6IGFueVtdfG51bGx8dW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgbWFwIG9mIGxvY2FsIHJlZmVyZW5jZXMgKGxvY2FsIHJlZmVyZW5jZSBuYW1lID0+IGVsZW1lbnQgb3IgZGlyZWN0aXZlIGluc3RhbmNlKSB0aGF0IGV4aXN0XG4gICAqIG9uIHRoaXMgZWxlbWVudC5cbiAgICovXG4gIGxvY2FsUmVmczoge1trZXk6IHN0cmluZ106IGFueX18bnVsbHx1bmRlZmluZWQ7XG59XG4iXX0=