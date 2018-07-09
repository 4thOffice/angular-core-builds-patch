/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS9wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vdHlwZSc7XG5cbi8qKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYFxuICogQEluamVjdGFibGUoU29tZU1vZHVsZSwge3VzZVZhbHVlOiAnc29tZVZhbHVlJ30pXG4gKiBjbGFzcyBTb21lQ2xhc3Mge31cbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYSB2YWx1ZSBmb3IgYSB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdWYWx1ZVNhbnNQcm92aWRlcid9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFZhbHVlU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSB0byBpbmplY3QuXG4gICAqL1xuICB1c2VWYWx1ZTogYW55O1xufVxuXG4vKipcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGBcbiAqIGNvbnN0IHByb3ZpZGVyOiBWYWx1ZVByb3ZpZGVyID0ge3Byb3ZpZGU6ICdzb21lVG9rZW4nLCB1c2VWYWx1ZTogJ3NvbWVWYWx1ZSd9O1xuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhIHZhbHVlIGZvciBhIHRva2VuLlxuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1ZhbHVlUHJvdmlkZXInfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmFsdWVQcm92aWRlciBleHRlbmRzIFZhbHVlU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEFuIGluamVjdGlvbiB0b2tlbi4gKFR5cGljYWxseSBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgb3IgYEluamVjdGlvblRva2VuYCwgYnV0IGNhbiBiZSBgYW55YCkuXG4gICAqL1xuICBwcm92aWRlOiBhbnk7XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZW4gaW5qZWN0b3IgcmV0dXJucyBhbiBhcnJheSBvZiBpbnN0YW5jZXMuIFRoaXMgaXMgdXNlZnVsIHRvIGFsbG93IG11bHRpcGxlXG4gICAqIHByb3ZpZGVycyBzcHJlYWQgYWNyb3NzIG1hbnkgZmlsZXMgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9uIHRvIGEgY29tbW9uIHRva2VuLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nTXVsdGlQcm92aWRlckFzcGVjdCd9XG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYFxuICogQEluamVjdGFibGUoU29tZU1vZHVsZSwge3VzZUNsYXNzOiBNeVNlcnZpY2UsIGRlcHM6IFtdfSlcbiAqIGNsYXNzIE15U2VydmljZSB7fVxuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhbiBpbnN0YW5jZSBvZiBgdXNlQ2xhc3NgIGZvciBhIHRva2VuLlxuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1N0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyJ31cbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgY2xhc3MgdG8gaW5zdGFudGlhdGUgZm9yIHRoZSBgdG9rZW5gLiAoSWYgbm90IHByb3ZpZGVkIGBwcm92aWRlYCBpcyBhc3N1bWVkIHRvIGJlIGFcbiAgICogY2xhc3MgdG8gaW5zdGFudGlhdGUpXG4gICAqL1xuICB1c2VDbGFzczogVHlwZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgYHRva2VuYHMgd2hpY2ggbmVlZCB0byBiZSByZXNvbHZlZCBieSB0aGUgaW5qZWN0b3IuIFRoZSBsaXN0IG9mIHZhbHVlcyBpcyB0aGVuXG4gICAqIHVzZWQgYXMgYXJndW1lbnRzIHRvIHRoZSBgdXNlQ2xhc3NgIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgZGVwczogYW55W107XG59XG5cbi8qKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYFxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgTXlTZXJ2aWNlIHt9XG4gKlxuICogY29uc3QgcHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7cHJvdmlkZTogJ3NvbWVUb2tlbicsIHVzZUNsYXNzOiBNeVNlcnZpY2UsIGRlcHM6IFtdfTtcbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYHVzZUNsYXNzYCBmb3IgYSB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdTdGF0aWNDbGFzc1Byb3ZpZGVyJ31cbiAqXG4gKiBOb3RlIHRoYXQgZm9sbG93aW5nIHR3byBwcm92aWRlcnMgYXJlIG5vdCBlcXVhbDpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdTdGF0aWNDbGFzc1Byb3ZpZGVyRGlmZmVyZW5jZSd9XG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTdGF0aWNDbGFzc1Byb3ZpZGVyIGV4dGVuZHMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IGFueTtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdNdWx0aVByb3ZpZGVyQXNwZWN0J31cbiAgICovXG4gIG11bHRpPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgXG4gKiBASW5qZWN0YWJsZShTb21lTW9kdWxlLCB7ZGVwczogW119KVxuICogY2xhc3MgTXlTZXJ2aWNlIHt9XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGEgdG9rZW4uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBgdG9rZW5gcyB3aGljaCBuZWVkIHRvIGJlIHJlc29sdmVkIGJ5IHRoZSBpbmplY3Rvci4gVGhlIGxpc3Qgb2YgdmFsdWVzIGlzIHRoZW5cbiAgICogdXNlZCBhcyBhcmd1bWVudHMgdG8gdGhlIGB1c2VDbGFzc2AgY29uc3RydWN0b3IuXG4gICAqL1xuICBkZXBzPzogYW55W107XG59XG5cbi8qKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYFxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgTXlTZXJ2aWNlIHt9XG4gKlxuICogY29uc3QgcHJvdmlkZXI6IENsYXNzUHJvdmlkZXIgPSB7cHJvdmlkZTogTXlDbGFzcywgZGVwczogW119O1xuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhbiBpbnN0YW5jZSBvZiBhIHRva2VuLlxuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0NvbnN0cnVjdG9yUHJvdmlkZXInfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29uc3RydWN0b3JQcm92aWRlciBleHRlbmRzIENvbnN0cnVjdG9yU2Fuc1Byb3ZpZGVyIHtcbiAgLyoqXG4gICAqIEFuIGluamVjdGlvbiB0b2tlbi4gKFR5cGljYWxseSBhbiBpbnN0YW5jZSBvZiBgVHlwZWAgb3IgYEluamVjdGlvblRva2VuYCwgYnV0IGNhbiBiZSBgYW55YCkuXG4gICAqL1xuICBwcm92aWRlOiBUeXBlPGFueT47XG5cbiAgLyoqXG4gICAqIElmIHRydWUsIHRoZW4gaW5qZWN0b3IgcmV0dXJucyBhbiBhcnJheSBvZiBpbnN0YW5jZXMuIFRoaXMgaXMgdXNlZnVsIHRvIGFsbG93IG11bHRpcGxlXG4gICAqIHByb3ZpZGVycyBzcHJlYWQgYWNyb3NzIG1hbnkgZmlsZXMgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGluZm9ybWF0aW9uIHRvIGEgY29tbW9uIHRva2VuLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nTXVsdGlQcm92aWRlckFzcGVjdCd9XG4gICAqL1xuICBtdWx0aT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQHVzYWdlTm90ZXNcbiAqIGBgYFxuICogQEluamVjdGFibGUoU29tZU1vZHVsZSwge3VzZUV4aXN0aW5nOiAnc29tZU90aGVyVG9rZW4nfSlcbiAqIGNsYXNzIFNvbWVDbGFzcyB7fVxuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhIHZhbHVlIG9mIGFub3RoZXIgYHVzZUV4aXN0aW5nYCB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdFeGlzdGluZ1NhbnNQcm92aWRlcid9XG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeGlzdGluZ1NhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBFeGlzdGluZyBgdG9rZW5gIHRvIHJldHVybi4gKGVxdWl2YWxlbnQgdG8gYGluamVjdG9yLmdldCh1c2VFeGlzdGluZylgKVxuICAgKi9cbiAgdXNlRXhpc3Rpbmc6IGFueTtcbn1cblxuLyoqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgXG4gKiBjb25zdCBwcm92aWRlcjogRXhpc3RpbmdQcm92aWRlciA9IHtwcm92aWRlOiAnc29tZVRva2VuJywgdXNlRXhpc3Rpbmc6ICdzb21lT3RoZXJUb2tlbid9O1xuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhIHZhbHVlIG9mIGFub3RoZXIgYHVzZUV4aXN0aW5nYCB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdFeGlzdGluZ1Byb3ZpZGVyJ31cbiAqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEV4aXN0aW5nUHJvdmlkZXIgZXh0ZW5kcyBFeGlzdGluZ1NhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBbiBpbmplY3Rpb24gdG9rZW4uIChUeXBpY2FsbHkgYW4gaW5zdGFuY2Ugb2YgYFR5cGVgIG9yIGBJbmplY3Rpb25Ub2tlbmAsIGJ1dCBjYW4gYmUgYGFueWApLlxuICAgKi9cbiAgcHJvdmlkZTogYW55O1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGVuIGluamVjdG9yIHJldHVybnMgYW4gYXJyYXkgb2YgaW5zdGFuY2VzLiBUaGlzIGlzIHVzZWZ1bCB0byBhbGxvdyBtdWx0aXBsZVxuICAgKiBwcm92aWRlcnMgc3ByZWFkIGFjcm9zcyBtYW55IGZpbGVzIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBpbmZvcm1hdGlvbiB0byBhIGNvbW1vbiB0b2tlbi5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J011bHRpUHJvdmlkZXJBc3BlY3QnfVxuICAgKi9cbiAgbXVsdGk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGBcbiAqIGZ1bmN0aW9uIHNlcnZpY2VGYWN0b3J5KCkgeyAuLi4gfVxuICpcbiAqIEBJbmplY3RhYmxlKFNvbWVNb2R1bGUsIHt1c2VGYWN0b3J5OiBzZXJ2aWNlRmFjdG9yeSwgZGVwczogW119KVxuICogY2xhc3MgU29tZUNsYXNzIHt9XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGEgdmFsdWUgYnkgaW52b2tpbmcgYSBgdXNlRmFjdG9yeWAgZnVuY3Rpb24uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nRmFjdG9yeVNhbnNQcm92aWRlcid9XG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmFjdG9yeVNhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIGludm9rZSB0byBjcmVhdGUgYSB2YWx1ZSBmb3IgdGhpcyBgdG9rZW5gLiBUaGUgZnVuY3Rpb24gaXMgaW52b2tlZCB3aXRoXG4gICAqIHJlc29sdmVkIHZhbHVlcyBvZiBgdG9rZW5gcyBpbiB0aGUgYGRlcHNgIGZpZWxkLlxuICAgKi9cbiAgdXNlRmFjdG9yeTogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBgdG9rZW5gcyB3aGljaCBuZWVkIHRvIGJlIHJlc29sdmVkIGJ5IHRoZSBpbmplY3Rvci4gVGhlIGxpc3Qgb2YgdmFsdWVzIGlzIHRoZW5cbiAgICogdXNlZCBhcyBhcmd1bWVudHMgdG8gdGhlIGB1c2VGYWN0b3J5YCBmdW5jdGlvbi5cbiAgICovXG4gIGRlcHM/OiBhbnlbXTtcbn1cblxuLyoqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgXG4gKiBmdW5jdGlvbiBzZXJ2aWNlRmFjdG9yeSgpIHsgLi4uIH1cbiAqXG4gKiBjb25zdCBwcm92aWRlcjogRmFjdG9yeVByb3ZpZGVyID0ge3Byb3ZpZGU6ICdzb21lVG9rZW4nLCB1c2VGYWN0b3J5OiBzZXJ2aWNlRmFjdG9yeSwgZGVwczogW119O1xuICogYGBgXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb25maWd1cmVzIHRoZSBgSW5qZWN0b3JgIHRvIHJldHVybiBhIHZhbHVlIGJ5IGludm9raW5nIGEgYHVzZUZhY3RvcnlgIGZ1bmN0aW9uLlxuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J0ZhY3RvcnlQcm92aWRlcid9XG4gKlxuICogRGVwZW5kZW5jaWVzIGNhbiBhbHNvIGJlIG1hcmtlZCBhcyBvcHRpb25hbDpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdGYWN0b3J5UHJvdmlkZXJPcHRpb25hbERlcHMnfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRmFjdG9yeVByb3ZpZGVyIGV4dGVuZHMgRmFjdG9yeVNhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBBbiBpbmplY3Rpb24gdG9rZW4uIChUeXBpY2FsbHkgYW4gaW5zdGFuY2Ugb2YgYFR5cGVgIG9yIGBJbmplY3Rpb25Ub2tlbmAsIGJ1dCBjYW4gYmUgYGFueWApLlxuICAgKi9cbiAgcHJvdmlkZTogYW55O1xuXG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0aGVuIGluamVjdG9yIHJldHVybnMgYW4gYXJyYXkgb2YgaW5zdGFuY2VzLiBUaGlzIGlzIHVzZWZ1bCB0byBhbGxvdyBtdWx0aXBsZVxuICAgKiBwcm92aWRlcnMgc3ByZWFkIGFjcm9zcyBtYW55IGZpbGVzIHRvIHByb3ZpZGUgY29uZmlndXJhdGlvbiBpbmZvcm1hdGlvbiB0byBhIGNvbW1vbiB0b2tlbi5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J011bHRpUHJvdmlkZXJBc3BlY3QnfVxuICAgKi9cbiAgbXVsdGk/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEB1c2FnZU5vdGVzXG4gKiBTZWUge0BsaW5rIFZhbHVlUHJvdmlkZXJ9LCB7QGxpbmsgRXhpc3RpbmdQcm92aWRlcn0sIHtAbGluayBGYWN0b3J5UHJvdmlkZXJ9LlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRGVzY3JpYmVzIGhvdyB0aGUgYEluamVjdG9yYCBzaG91bGQgYmUgY29uZmlndXJlZCBpbiBhIHN0YXRpYyB3YXkgKFdpdGhvdXQgcmVmbGVjdGlvbikuXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICpcbiAqL1xuZXhwb3J0IHR5cGUgU3RhdGljUHJvdmlkZXIgPSBWYWx1ZVByb3ZpZGVyIHwgRXhpc3RpbmdQcm92aWRlciB8IFN0YXRpY0NsYXNzUHJvdmlkZXIgfFxuICAgIENvbnN0cnVjdG9yUHJvdmlkZXIgfCBGYWN0b3J5UHJvdmlkZXIgfCBhbnlbXTtcblxuXG4vKipcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGBcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIE15U2VydmljZSB7fVxuICpcbiAqIGNvbnN0IHByb3ZpZGVyOiBUeXBlUHJvdmlkZXIgPSBNeVNlcnZpY2U7XG4gKiBgYGBcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbmZpZ3VyZXMgdGhlIGBJbmplY3RvcmAgdG8gcmV0dXJuIGFuIGluc3RhbmNlIG9mIGBUeXBlYCB3aGVuIGBUeXBlJyBpcyB1c2VkIGFzIHRoZSB0b2tlbi5cbiAqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2UgYnkgaW52b2tpbmcgdGhlIGBuZXdgIG9wZXJhdG9yIGFuZCBzdXBwbHlpbmcgYWRkaXRpb25hbCBhcmd1bWVudHMuXG4gKiBUaGlzIGZvcm0gaXMgYSBzaG9ydCBmb3JtIG9mIGBUeXBlUHJvdmlkZXJgO1xuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICoge0BleGFtcGxlIGNvcmUvZGkvdHMvcHJvdmlkZXJfc3BlYy50cyByZWdpb249J1R5cGVQcm92aWRlcid9XG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUeXBlUHJvdmlkZXIgZXh0ZW5kcyBUeXBlPGFueT4ge31cblxuLyoqXG4gKiBAdXNhZ2VOb3Rlc1xuICogYGBgXG4gKlxuICogY2xhc3MgU29tZUNsYXNzSW1wbCB7fVxuICpcbiAqIEBJbmplY3RhYmxlKFNvbWVNb2R1bGUsIHt1c2VDbGFzczogU29tZUNsYXNzSW1wbH0pXG4gKiBjbGFzcyBTb21lQ2xhc3Mge31cbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYSB2YWx1ZSBieSBpbnZva2luZyBhIGB1c2VDbGFzc2AgZnVuY3Rpb24uXG4gKlxuICogRm9yIG1vcmUgZGV0YWlscywgc2VlIHRoZSB7QGxpbmtEb2NzIGd1aWRlL2RlcGVuZGVuY3ktaW5qZWN0aW9uIFwiRGVwZW5kZW5jeSBJbmplY3Rpb24gR3VpZGVcIn0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiB7QGV4YW1wbGUgY29yZS9kaS90cy9wcm92aWRlcl9zcGVjLnRzIHJlZ2lvbj0nQ2xhc3NTYW5zUHJvdmlkZXInfVxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGFzc1NhbnNQcm92aWRlciB7XG4gIC8qKlxuICAgKiBDbGFzcyB0byBpbnN0YW50aWF0ZSBmb3IgdGhlIGB0b2tlbmAuXG4gICAqL1xuICB1c2VDbGFzczogVHlwZTxhbnk+O1xufVxuXG4vKipcbiAqIEB1c2FnZU5vdGVzXG4gKiBgYGBcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIE15U2VydmljZSB7fVxuICpcbiAqIGNvbnN0IHByb3ZpZGVyOiBDbGFzc1Byb3ZpZGVyID0ge3Byb3ZpZGU6ICdzb21lVG9rZW4nLCB1c2VDbGFzczogTXlTZXJ2aWNlfTtcbiAqIGBgYFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29uZmlndXJlcyB0aGUgYEluamVjdG9yYCB0byByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgYHVzZUNsYXNzYCBmb3IgYSB0b2tlbi5cbiAqXG4gKiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIHtAbGlua0RvY3MgZ3VpZGUvZGVwZW5kZW5jeS1pbmplY3Rpb24gXCJEZXBlbmRlbmN5IEluamVjdGlvbiBHdWlkZVwifS5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdDbGFzc1Byb3ZpZGVyJ31cbiAqXG4gKiBOb3RlIHRoYXQgZm9sbG93aW5nIHR3byBwcm92aWRlcnMgYXJlIG5vdCBlcXVhbDpcbiAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdDbGFzc1Byb3ZpZGVyRGlmZmVyZW5jZSd9XG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDbGFzc1Byb3ZpZGVyIGV4dGVuZHMgQ2xhc3NTYW5zUHJvdmlkZXIge1xuICAvKipcbiAgICogQW4gaW5qZWN0aW9uIHRva2VuLiAoVHlwaWNhbGx5IGFuIGluc3RhbmNlIG9mIGBUeXBlYCBvciBgSW5qZWN0aW9uVG9rZW5gLCBidXQgY2FuIGJlIGBhbnlgKS5cbiAgICovXG4gIHByb3ZpZGU6IGFueTtcblxuICAvKipcbiAgICogSWYgdHJ1ZSwgdGhlbiBpbmplY3RvciByZXR1cm5zIGFuIGFycmF5IG9mIGluc3RhbmNlcy4gVGhpcyBpcyB1c2VmdWwgdG8gYWxsb3cgbXVsdGlwbGVcbiAgICogcHJvdmlkZXJzIHNwcmVhZCBhY3Jvc3MgbWFueSBmaWxlcyB0byBwcm92aWRlIGNvbmZpZ3VyYXRpb24gaW5mb3JtYXRpb24gdG8gYSBjb21tb24gdG9rZW4uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIHtAZXhhbXBsZSBjb3JlL2RpL3RzL3Byb3ZpZGVyX3NwZWMudHMgcmVnaW9uPSdNdWx0aVByb3ZpZGVyQXNwZWN0J31cbiAgICovXG4gIG11bHRpPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAdXNhZ2VOb3Rlc1xuICogU2VlIHtAbGluayBUeXBlUHJvdmlkZXJ9LCB7QGxpbmsgQ2xhc3NQcm92aWRlcn0sIHtAbGluayBTdGF0aWNQcm92aWRlcn0uXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEZXNjcmliZXMgaG93IHRoZSBgSW5qZWN0b3JgIHNob3VsZCBiZSBjb25maWd1cmVkLlxuICpcbiAqIEZvciBtb3JlIGRldGFpbHMsIHNlZSB0aGUge0BsaW5rRG9jcyBndWlkZS9kZXBlbmRlbmN5LWluamVjdGlvbiBcIkRlcGVuZGVuY3kgSW5qZWN0aW9uIEd1aWRlXCJ9LlxuICpcbiAqXG4gKi9cbmV4cG9ydCB0eXBlIFByb3ZpZGVyID0gVHlwZVByb3ZpZGVyIHwgVmFsdWVQcm92aWRlciB8IENsYXNzUHJvdmlkZXIgfCBDb25zdHJ1Y3RvclByb3ZpZGVyIHxcbiAgICBFeGlzdGluZ1Byb3ZpZGVyIHwgRmFjdG9yeVByb3ZpZGVyIHwgYW55W107XG4iXX0=