/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
* Wraps a function in a new function which sets up document and HTML for running a test.
*
* This function is intended to wrap an existing testing function. The wrapper
* adds HTML to the `body` element of the `document` and subsequently tears it down.
*
* This function is intended to be used with `async await` and `Promise`s. If the wrapped
* function returns a promise (or is `async`) then the teardown is delayed until that `Promise`
* is resolved.
*
* On `node` this function detects if `document` is present and if not it will create one by
* loading `domino` and installing it.
*
* Example:
*
* ```
* describe('something', () => {
*   it('should do something', withBody('<my-app></my-app>', async () => {
*     const myApp = renderComponent(MyApp);
*     await whenRendered(myApp);
*     expect(getRenderedText(myApp)).toEqual('Hello World!');
*   }));
* });
* ```
*
* @param html HTML which should be inserted into `body` of the `document`.
* @param blockFn function to wrap. The function can return promise or be `async`.
* @experimental
*/
export function withBody(html, blockFn) {
    return function (done) {
        ensureDocument();
        var returnValue = undefined;
        if (typeof blockFn === 'function') {
            document.body.innerHTML = html;
            // TODO(i): I'm not sure why a cast is required here but otherwise I get
            //   TS2349: Cannot invoke an expression whose type lacks a call signature. Type 'never' has
            //   no compatible call signatures.
            var blockReturn = blockFn();
            if (blockReturn instanceof Promise) {
                blockReturn = blockReturn.then(done, done.fail);
            }
            else {
                done();
            }
        }
    };
}
var savedDocument = undefined;
var savedRequestAnimationFrame = undefined;
var savedNode = undefined;
var requestAnimationFrameCount = 0;
var ɵ0 = function (domino) {
    if (typeof global == 'object' && global.process && typeof require == 'function') {
        try {
            return require(domino);
        }
        catch (e) {
            // It is possible that we don't have domino available in which case just give up.
        }
    }
    // Seems like we don't have domino, give up.
    return null;
};
/**
 * System.js uses regexp to look for `require` statements. `domino` has to be
 * extracted into a constant so that the regexp in the System.js does not match
 * and does not try to load domino in the browser.
 */
var domino = (ɵ0)('domino');
/**
 * Ensure that global has `Document` if we are in node.js
 * @experimental
 */
export function ensureDocument() {
    if (domino) {
        // we are in node.js.
        var window_1 = domino.createWindow('', 'http://localhost');
        savedDocument = global.document;
        global.window = window_1;
        global.document = window_1.document;
        // Trick to avoid Event patching from
        // https://github.com/angular/angular/blob/7cf5e95ac9f0f2648beebf0d5bd9056b79946970/packages/platform-browser/src/dom/events/dom_events.ts#L112-L132
        // It fails with Domino with TypeError: Cannot assign to read only property
        // 'stopImmediatePropagation' of object '#<Event>'
        // Trick to avoid Event patching from
        // https://github.com/angular/angular/blob/7cf5e95ac9f0f2648beebf0d5bd9056b79946970/packages/platform-browser/src/dom/events/dom_events.ts#L112-L132
        // It fails with Domino with TypeError: Cannot assign to read only property
        // 'stopImmediatePropagation' of object '#<Event>'
        global.Event = null;
        savedNode = global.Node;
        global.Node = domino.impl.Node;
        savedRequestAnimationFrame = global.requestAnimationFrame;
        global.requestAnimationFrame = function (cb) {
            setImmediate(cb);
            return requestAnimationFrameCount++;
        };
    }
}
/**
 * Restore the state of `Document` between tests.
 * @experimental
 */
export function cleanupDocument() {
    if (savedDocument) {
        global.document = savedDocument;
        global.window = undefined;
        savedDocument = undefined;
    }
    if (savedNode) {
        global.Node = savedNode;
        savedNode = undefined;
    }
    if (savedRequestAnimationFrame) {
        global.requestAnimationFrame = savedRequestAnimationFrame;
        savedRequestAnimationFrame = undefined;
    }
}
if (typeof beforeEach == 'function')
    beforeEach(ensureDocument);
if (typeof afterEach == 'function')
    beforeEach(cleanupDocument);
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdGluZy9zcmMvcmVuZGVyMy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQ0EsTUFBTSxtQkFBc0IsSUFBWSxFQUFFLE9BQVU7SUFDbEQsT0FBTyxVQUFTLElBQThCO1FBQzVDLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLElBQUksV0FBVyxHQUFRLFNBQVMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7WUFJL0IsSUFBSSxXQUFXLEdBQUksT0FBZSxFQUFFLENBQUM7WUFDckMsSUFBSSxXQUFXLFlBQVksT0FBTyxFQUFFO2dCQUNsQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksRUFBRSxDQUFDO2FBQ1I7U0FDRjtLQUNLLENBQUM7Q0FDVjtBQUVELElBQUksYUFBYSxHQUF1QixTQUFTLENBQUM7QUFDbEQsSUFBSSwwQkFBMEIsR0FBMkQsU0FBUyxDQUFDO0FBQ25HLElBQUksU0FBUyxHQUEwQixTQUFTLENBQUM7QUFDakQsSUFBSSwwQkFBMEIsR0FBRyxDQUFDLENBQUM7U0FPZCxVQUFTLE1BQU07SUFDbEMsSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLE9BQU8sSUFBSSxVQUFVLEVBQUU7UUFDL0UsSUFBSTtZQUNGLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxDQUFDLEVBQUU7O1NBRVg7S0FDRjs7SUFFRCxPQUFPLElBQUksQ0FBQztDQUNiOzs7Ozs7QUFWRCxJQUFNLE1BQU0sR0FBUSxJQVVsQixDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OztBQU1iLE1BQU07SUFDSixJQUFJLE1BQU0sRUFBRTs7UUFFVixJQUFNLFFBQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQzNELGFBQWEsR0FBSSxNQUFjLENBQUMsUUFBUSxDQUFDO1FBQ3hDLE1BQWMsQ0FBQyxNQUFNLEdBQUcsUUFBTSxDQUFDO1FBQy9CLE1BQWMsQ0FBQyxRQUFRLEdBQUcsUUFBTSxDQUFDLFFBQVEsQ0FBQzs7Ozs7UUFLM0MsQUFKQSxxQ0FBcUM7UUFDckMsb0pBQW9KO1FBQ3BKLDJFQUEyRTtRQUMzRSxrREFBa0Q7UUFDakQsTUFBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDN0IsU0FBUyxHQUFJLE1BQWMsQ0FBQyxJQUFJLENBQUM7UUFDaEMsTUFBYyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUV4QywwQkFBMEIsR0FBSSxNQUFjLENBQUMscUJBQXFCLENBQUM7UUFDbEUsTUFBYyxDQUFDLHFCQUFxQixHQUFHLFVBQVMsRUFBd0I7WUFDdkUsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sMEJBQTBCLEVBQUUsQ0FBQztTQUNyQyxDQUFDO0tBQ0g7Q0FDRjs7Ozs7QUFNRCxNQUFNO0lBQ0osSUFBSSxhQUFhLEVBQUU7UUFDaEIsTUFBYyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7UUFDeEMsTUFBYyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDbkMsYUFBYSxHQUFHLFNBQVMsQ0FBQztLQUMzQjtJQUNELElBQUksU0FBUyxFQUFFO1FBQ1osTUFBYyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDakMsU0FBUyxHQUFHLFNBQVMsQ0FBQztLQUN2QjtJQUNELElBQUksMEJBQTBCLEVBQUU7UUFDN0IsTUFBYyxDQUFDLHFCQUFxQixHQUFHLDBCQUEwQixDQUFDO1FBQ25FLDBCQUEwQixHQUFHLFNBQVMsQ0FBQztLQUN4QztDQUNGO0FBRUQsSUFBSSxPQUFPLFVBQVUsSUFBSSxVQUFVO0lBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2hFLElBQUksT0FBTyxTQUFTLElBQUksVUFBVTtJQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4qIFdyYXBzIGEgZnVuY3Rpb24gaW4gYSBuZXcgZnVuY3Rpb24gd2hpY2ggc2V0cyB1cCBkb2N1bWVudCBhbmQgSFRNTCBmb3IgcnVubmluZyBhIHRlc3QuXG4qXG4qIFRoaXMgZnVuY3Rpb24gaXMgaW50ZW5kZWQgdG8gd3JhcCBhbiBleGlzdGluZyB0ZXN0aW5nIGZ1bmN0aW9uLiBUaGUgd3JhcHBlclxuKiBhZGRzIEhUTUwgdG8gdGhlIGBib2R5YCBlbGVtZW50IG9mIHRoZSBgZG9jdW1lbnRgIGFuZCBzdWJzZXF1ZW50bHkgdGVhcnMgaXQgZG93bi5cbipcbiogVGhpcyBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGggYGFzeW5jIGF3YWl0YCBhbmQgYFByb21pc2Vgcy4gSWYgdGhlIHdyYXBwZWRcbiogZnVuY3Rpb24gcmV0dXJucyBhIHByb21pc2UgKG9yIGlzIGBhc3luY2ApIHRoZW4gdGhlIHRlYXJkb3duIGlzIGRlbGF5ZWQgdW50aWwgdGhhdCBgUHJvbWlzZWBcbiogaXMgcmVzb2x2ZWQuXG4qXG4qIE9uIGBub2RlYCB0aGlzIGZ1bmN0aW9uIGRldGVjdHMgaWYgYGRvY3VtZW50YCBpcyBwcmVzZW50IGFuZCBpZiBub3QgaXQgd2lsbCBjcmVhdGUgb25lIGJ5XG4qIGxvYWRpbmcgYGRvbWlub2AgYW5kIGluc3RhbGxpbmcgaXQuXG4qXG4qIEV4YW1wbGU6XG4qXG4qIGBgYFxuKiBkZXNjcmliZSgnc29tZXRoaW5nJywgKCkgPT4ge1xuKiAgIGl0KCdzaG91bGQgZG8gc29tZXRoaW5nJywgd2l0aEJvZHkoJzxteS1hcHA+PC9teS1hcHA+JywgYXN5bmMgKCkgPT4ge1xuKiAgICAgY29uc3QgbXlBcHAgPSByZW5kZXJDb21wb25lbnQoTXlBcHApO1xuKiAgICAgYXdhaXQgd2hlblJlbmRlcmVkKG15QXBwKTtcbiogICAgIGV4cGVjdChnZXRSZW5kZXJlZFRleHQobXlBcHApKS50b0VxdWFsKCdIZWxsbyBXb3JsZCEnKTtcbiogICB9KSk7XG4qIH0pO1xuKiBgYGBcbipcbiogQHBhcmFtIGh0bWwgSFRNTCB3aGljaCBzaG91bGQgYmUgaW5zZXJ0ZWQgaW50byBgYm9keWAgb2YgdGhlIGBkb2N1bWVudGAuXG4qIEBwYXJhbSBibG9ja0ZuIGZ1bmN0aW9uIHRvIHdyYXAuIFRoZSBmdW5jdGlvbiBjYW4gcmV0dXJuIHByb21pc2Ugb3IgYmUgYGFzeW5jYC5cbiogQGV4cGVyaW1lbnRhbFxuKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQm9keTxUPihodG1sOiBzdHJpbmcsIGJsb2NrRm46IFQpOiBUIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGRvbmU6IHsoKTogdm9pZCwgZmFpbCgpOiB2b2lkfSkge1xuICAgIGVuc3VyZURvY3VtZW50KCk7XG4gICAgbGV0IHJldHVyblZhbHVlOiBhbnkgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHR5cGVvZiBibG9ja0ZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAvLyBUT0RPKGkpOiBJJ20gbm90IHN1cmUgd2h5IGEgY2FzdCBpcyByZXF1aXJlZCBoZXJlIGJ1dCBvdGhlcndpc2UgSSBnZXRcbiAgICAgIC8vICAgVFMyMzQ5OiBDYW5ub3QgaW52b2tlIGFuIGV4cHJlc3Npb24gd2hvc2UgdHlwZSBsYWNrcyBhIGNhbGwgc2lnbmF0dXJlLiBUeXBlICduZXZlcicgaGFzXG4gICAgICAvLyAgIG5vIGNvbXBhdGlibGUgY2FsbCBzaWduYXR1cmVzLlxuICAgICAgbGV0IGJsb2NrUmV0dXJuID0gKGJsb2NrRm4gYXMgYW55KSgpO1xuICAgICAgaWYgKGJsb2NrUmV0dXJuIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICBibG9ja1JldHVybiA9IGJsb2NrUmV0dXJuLnRoZW4oZG9uZSwgZG9uZS5mYWlsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gYXMgYW55O1xufVxuXG5sZXQgc2F2ZWREb2N1bWVudDogRG9jdW1lbnR8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xubGV0IHNhdmVkUmVxdWVzdEFuaW1hdGlvbkZyYW1lOiAoKGNhbGxiYWNrOiBGcmFtZVJlcXVlc3RDYWxsYmFjaykgPT4gbnVtYmVyKXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5sZXQgc2F2ZWROb2RlOiB0eXBlb2YgTm9kZXx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5sZXQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lQ291bnQgPSAwO1xuXG4vKipcbiAqIFN5c3RlbS5qcyB1c2VzIHJlZ2V4cCB0byBsb29rIGZvciBgcmVxdWlyZWAgc3RhdGVtZW50cy4gYGRvbWlub2AgaGFzIHRvIGJlXG4gKiBleHRyYWN0ZWQgaW50byBhIGNvbnN0YW50IHNvIHRoYXQgdGhlIHJlZ2V4cCBpbiB0aGUgU3lzdGVtLmpzIGRvZXMgbm90IG1hdGNoXG4gKiBhbmQgZG9lcyBub3QgdHJ5IHRvIGxvYWQgZG9taW5vIGluIHRoZSBicm93c2VyLlxuICovXG5jb25zdCBkb21pbm86IGFueSA9IChmdW5jdGlvbihkb21pbm8pIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsLnByb2Nlc3MgJiYgdHlwZW9mIHJlcXVpcmUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcmVxdWlyZShkb21pbm8pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIEl0IGlzIHBvc3NpYmxlIHRoYXQgd2UgZG9uJ3QgaGF2ZSBkb21pbm8gYXZhaWxhYmxlIGluIHdoaWNoIGNhc2UganVzdCBnaXZlIHVwLlxuICAgIH1cbiAgfVxuICAvLyBTZWVtcyBsaWtlIHdlIGRvbid0IGhhdmUgZG9taW5vLCBnaXZlIHVwLlxuICByZXR1cm4gbnVsbDtcbn0pKCdkb21pbm8nKTtcblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBnbG9iYWwgaGFzIGBEb2N1bWVudGAgaWYgd2UgYXJlIGluIG5vZGUuanNcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZURvY3VtZW50KCk6IHZvaWQge1xuICBpZiAoZG9taW5vKSB7XG4gICAgLy8gd2UgYXJlIGluIG5vZGUuanMuXG4gICAgY29uc3Qgd2luZG93ID0gZG9taW5vLmNyZWF0ZVdpbmRvdygnJywgJ2h0dHA6Ly9sb2NhbGhvc3QnKTtcbiAgICBzYXZlZERvY3VtZW50ID0gKGdsb2JhbCBhcyBhbnkpLmRvY3VtZW50O1xuICAgIChnbG9iYWwgYXMgYW55KS53aW5kb3cgPSB3aW5kb3c7XG4gICAgKGdsb2JhbCBhcyBhbnkpLmRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuICAgIC8vIFRyaWNrIHRvIGF2b2lkIEV2ZW50IHBhdGNoaW5nIGZyb21cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvN2NmNWU5NWFjOWYwZjI2NDhiZWViZjBkNWJkOTA1NmI3OTk0Njk3MC9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZXZlbnRzL2RvbV9ldmVudHMudHMjTDExMi1MMTMyXG4gICAgLy8gSXQgZmFpbHMgd2l0aCBEb21pbm8gd2l0aCBUeXBlRXJyb3I6IENhbm5vdCBhc3NpZ24gdG8gcmVhZCBvbmx5IHByb3BlcnR5XG4gICAgLy8gJ3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbicgb2Ygb2JqZWN0ICcjPEV2ZW50PidcbiAgICAoZ2xvYmFsIGFzIGFueSkuRXZlbnQgPSBudWxsO1xuICAgIHNhdmVkTm9kZSA9IChnbG9iYWwgYXMgYW55KS5Ob2RlO1xuICAgIChnbG9iYWwgYXMgYW55KS5Ob2RlID0gZG9taW5vLmltcGwuTm9kZTtcblxuICAgIHNhdmVkUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKGdsb2JhbCBhcyBhbnkpLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcbiAgICAoZ2xvYmFsIGFzIGFueSkucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2I6IEZyYW1lUmVxdWVzdENhbGxiYWNrKTogbnVtYmVyIHtcbiAgICAgIHNldEltbWVkaWF0ZShjYik7XG4gICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lQ291bnQrKztcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogUmVzdG9yZSB0aGUgc3RhdGUgb2YgYERvY3VtZW50YCBiZXR3ZWVuIHRlc3RzLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW51cERvY3VtZW50KCk6IHZvaWQge1xuICBpZiAoc2F2ZWREb2N1bWVudCkge1xuICAgIChnbG9iYWwgYXMgYW55KS5kb2N1bWVudCA9IHNhdmVkRG9jdW1lbnQ7XG4gICAgKGdsb2JhbCBhcyBhbnkpLndpbmRvdyA9IHVuZGVmaW5lZDtcbiAgICBzYXZlZERvY3VtZW50ID0gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChzYXZlZE5vZGUpIHtcbiAgICAoZ2xvYmFsIGFzIGFueSkuTm9kZSA9IHNhdmVkTm9kZTtcbiAgICBzYXZlZE5vZGUgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKHNhdmVkUmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgKGdsb2JhbCBhcyBhbnkpLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHNhdmVkUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuICAgIHNhdmVkUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG5cbmlmICh0eXBlb2YgYmVmb3JlRWFjaCA9PSAnZnVuY3Rpb24nKSBiZWZvcmVFYWNoKGVuc3VyZURvY3VtZW50KTtcbmlmICh0eXBlb2YgYWZ0ZXJFYWNoID09ICdmdW5jdGlvbicpIGJlZm9yZUVhY2goY2xlYW51cERvY3VtZW50KTsiXX0=