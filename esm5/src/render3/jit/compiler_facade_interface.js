/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var R3ResolvedDependencyType;
(function (R3ResolvedDependencyType) {
    R3ResolvedDependencyType[R3ResolvedDependencyType["Token"] = 0] = "Token";
    R3ResolvedDependencyType[R3ResolvedDependencyType["Attribute"] = 1] = "Attribute";
})(R3ResolvedDependencyType || (R3ResolvedDependencyType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBaURILE1BQU0sQ0FBTixJQUFZLHdCQUdYO0FBSEQsV0FBWSx3QkFBd0I7SUFDbEMseUVBQVMsQ0FBQTtJQUNULGlGQUFhLENBQUE7QUFDZixDQUFDLEVBSFcsd0JBQXdCLEtBQXhCLHdCQUF3QixRQUduQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG4vKipcbiAqIEEgc2V0IG9mIGludGVyZmFjZXMgd2hpY2ggYXJlIHNoYXJlZCBiZXR3ZWVuIGBAYW5ndWxhci9jb3JlYCBhbmQgYEBhbmd1bGFyL2NvbXBpbGVyYCB0byBhbGxvd1xuICogZm9yIGxhdGUgYmluZGluZyBvZiBgQGFuZ3VsYXIvY29tcGlsZXJgIGZvciBKSVQgcHVycG9zZXMuXG4gKlxuICogVGhpcyBmaWxlIGhhcyB0d28gY29waWVzLiBQbGVhc2UgZW5zdXJlIHRoYXQgdGhleSBhcmUgaW4gc3luYzpcbiAqICAtIHBhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzICAgICAgICAgICAgIChtYXN0ZXIpXG4gKiAgLSBwYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ppdC9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzICAgICAoY29weSlcbiAqXG4gKiBQbGVhc2UgZW5zdXJlIHRoYXQgdGhlIHR3byBmaWxlcyBhcmUgaW4gc3luYyB1c2luZyB0aGlzIGNvbW1hbmQ6XG4gKiBgYGBcbiAqIGNwIHBhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzIFxcXG4gKiAgICBwYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ppdC9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzXG4gKiBgYGBcbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4cG9ydGVkQ29tcGlsZXJGYWNhZGUgeyDJtWNvbXBpbGVyRmFjYWRlOiBDb21waWxlckZhY2FkZTsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBpbGVyRmFjYWRlIHtcbiAgY29tcGlsZVBpcGUoYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzUGlwZU1ldGFkYXRhRmFjYWRlKTpcbiAgICAgIGFueTtcbiAgY29tcGlsZUluamVjdGFibGUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNJbmplY3RhYmxlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVJbmplY3RvcihcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0luamVjdG9yTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVOZ01vZHVsZShcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM05nTW9kdWxlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVEaXJlY3RpdmUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSk6IGFueTtcbiAgY29tcGlsZUNvbXBvbmVudChcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlKTogYW55O1xuXG4gIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZTogdHlwZW9mIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb3JlRW52aXJvbm1lbnQgeyBbbmFtZTogc3RyaW5nXTogRnVuY3Rpb247IH1cblxuZXhwb3J0IHR5cGUgU3RyaW5nTWFwID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBTdHJpbmdNYXBXaXRoUmVuYW1lID0ge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBbc3RyaW5nLCBzdHJpbmddO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvdmlkZXIgPSBhbnk7XG5cbmV4cG9ydCBlbnVtIFIzUmVzb2x2ZWREZXBlbmRlbmN5VHlwZSB7XG4gIFRva2VuID0gMCxcbiAgQXR0cmlidXRlID0gMSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZSB7XG4gIHRva2VuOiBhbnk7XG4gIHJlc29sdmVkOiBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGU7XG4gIGhvc3Q6IGJvb2xlYW47XG4gIG9wdGlvbmFsOiBib29sZWFuO1xuICBzZWxmOiBib29sZWFuO1xuICBza2lwU2VsZjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM1BpcGVNZXRhZGF0YUZhY2FkZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogYW55O1xuICBwaXBlTmFtZTogc3RyaW5nO1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZVtdfG51bGw7XG4gIHB1cmU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNJbmplY3RhYmxlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgdHlwZUFyZ3VtZW50Q291bnQ6IG51bWJlcjtcbiAgY3RvckRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW118bnVsbDtcbiAgcHJvdmlkZWRJbjogYW55O1xuICB1c2VDbGFzcz86IGFueTtcbiAgdXNlRmFjdG9yeT86IGFueTtcbiAgdXNlRXhpc3Rpbmc/OiBhbnk7XG4gIHVzZVZhbHVlPzogYW55O1xuICB1c2VyRGVwcz86IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNOZ01vZHVsZU1ldGFkYXRhRmFjYWRlIHtcbiAgdHlwZTogYW55O1xuICBib290c3RyYXA6IEZ1bmN0aW9uW107XG4gIGRlY2xhcmF0aW9uczogRnVuY3Rpb25bXTtcbiAgaW1wb3J0czogRnVuY3Rpb25bXTtcbiAgZXhwb3J0czogRnVuY3Rpb25bXTtcbiAgZW1pdElubGluZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0luamVjdG9yTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBwcm92aWRlcnM6IGFueVtdO1xuICBpbXBvcnRzOiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RpcmVjdGl2ZU1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIHR5cGVTb3VyY2VTcGFuOiBudWxsO1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZVtdfG51bGw7XG4gIHNlbGVjdG9yOiBzdHJpbmd8bnVsbDtcbiAgcXVlcmllczogUjNRdWVyeU1ldGFkYXRhRmFjYWRlW107XG4gIGhvc3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcm9wTWV0YWRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnlbXX07XG4gIGlucHV0czogc3RyaW5nW107XG4gIG91dHB1dHM6IHN0cmluZ1tdO1xuICB1c2VzSW5oZXJpdGFuY2U6IGJvb2xlYW47XG4gIGV4cG9ydEFzOiBzdHJpbmdbXXxudWxsO1xuICBwcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlIGV4dGVuZHMgUjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSB7XG4gIHRlbXBsYXRlOiBzdHJpbmc7XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGJvb2xlYW47XG4gIGFuaW1hdGlvbnM6IGFueVtdfHVuZGVmaW5lZDtcbiAgdmlld1F1ZXJpZXM6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdO1xuICBwaXBlczogTWFwPHN0cmluZywgYW55PjtcbiAgZGlyZWN0aXZlczoge3NlbGVjdG9yOiBzdHJpbmcsIGV4cHJlc3Npb246IGFueX1bXTtcbiAgc3R5bGVzOiBzdHJpbmdbXTtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHZpZXdQcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xufVxuXG5leHBvcnQgdHlwZSBWaWV3RW5jYXBzdWxhdGlvbiA9IG51bWJlcjtcblxuZXhwb3J0IHR5cGUgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgPSBudW1iZXI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNRdWVyeU1ldGFkYXRhRmFjYWRlIHtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gIGZpcnN0OiBib29sZWFuO1xuICBwcmVkaWNhdGU6IGFueXxzdHJpbmdbXTtcbiAgZGVzY2VuZGFudHM6IGJvb2xlYW47XG4gIHJlYWQ6IGFueXxudWxsO1xufVxuIl19