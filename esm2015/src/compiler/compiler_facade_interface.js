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
    R3ResolvedDependencyType[R3ResolvedDependencyType["ChangeDetectorRef"] = 2] = "ChangeDetectorRef";
})(R3ResolvedDependencyType || (R3ResolvedDependencyType = {}));
export var R3FactoryTarget;
(function (R3FactoryTarget) {
    R3FactoryTarget[R3FactoryTarget["Directive"] = 0] = "Directive";
    R3FactoryTarget[R3FactoryTarget["Component"] = 1] = "Component";
    R3FactoryTarget[R3FactoryTarget["Injectable"] = 2] = "Injectable";
    R3FactoryTarget[R3FactoryTarget["Pipe"] = 3] = "Pipe";
    R3FactoryTarget[R3FactoryTarget["NgModule"] = 4] = "NgModule";
})(R3FactoryTarget || (R3FactoryTarget = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBMkRILE1BQU0sQ0FBTixJQUFZLHdCQUlYO0FBSkQsV0FBWSx3QkFBd0I7SUFDbEMseUVBQVMsQ0FBQTtJQUNULGlGQUFhLENBQUE7SUFDYixpR0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsd0JBQXdCLEtBQXhCLHdCQUF3QixRQUluQztBQUVELE1BQU0sQ0FBTixJQUFZLGVBTVg7QUFORCxXQUFZLGVBQWU7SUFDekIsK0RBQWEsQ0FBQTtJQUNiLCtEQUFhLENBQUE7SUFDYixpRUFBYyxDQUFBO0lBQ2QscURBQVEsQ0FBQTtJQUNSLDZEQUFZLENBQUE7QUFDZCxDQUFDLEVBTlcsZUFBZSxLQUFmLGVBQWUsUUFNMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuLyoqXG4gKiBBIHNldCBvZiBpbnRlcmZhY2VzIHdoaWNoIGFyZSBzaGFyZWQgYmV0d2VlbiBgQGFuZ3VsYXIvY29yZWAgYW5kIGBAYW5ndWxhci9jb21waWxlcmAgdG8gYWxsb3dcbiAqIGZvciBsYXRlIGJpbmRpbmcgb2YgYEBhbmd1bGFyL2NvbXBpbGVyYCBmb3IgSklUIHB1cnBvc2VzLlxuICpcbiAqIFRoaXMgZmlsZSBoYXMgdHdvIGNvcGllcy4gUGxlYXNlIGVuc3VyZSB0aGF0IHRoZXkgYXJlIGluIHN5bmM6XG4gKiAgLSBwYWNrYWdlcy9jb21waWxlci9zcmMvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50cyAgICAgICAgICAgICAobWFzdGVyKVxuICogIC0gcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9qaXQvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50cyAgICAgKGNvcHkpXG4gKlxuICogUGxlYXNlIGVuc3VyZSB0aGF0IHRoZSB0d28gZmlsZXMgYXJlIGluIHN5bmMgdXNpbmcgdGhpcyBjb21tYW5kOlxuICogYGBgXG4gKiBjcCBwYWNrYWdlcy9jb21waWxlci9zcmMvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50cyBcXFxuICogICAgcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9qaXQvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50c1xuICogYGBgXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBFeHBvcnRlZENvbXBpbGVyRmFjYWRlIHsgybVjb21waWxlckZhY2FkZTogQ29tcGlsZXJGYWNhZGU7IH1cblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxlckZhY2FkZSB7XG4gIGNvbXBpbGVQaXBlKGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM1BpcGVNZXRhZGF0YUZhY2FkZSk6XG4gICAgICBhbnk7XG4gIGNvbXBpbGVJbmplY3RhYmxlKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzSW5qZWN0YWJsZU1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlSW5qZWN0b3IoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNJbmplY3Rvck1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlTmdNb2R1bGUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNOZ01vZHVsZU1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlRGlyZWN0aXZlKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzRGlyZWN0aXZlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVDb21wb25lbnQoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNDb21wb25lbnRNZXRhZGF0YUZhY2FkZSk6IGFueTtcbiAgY29tcGlsZUZhY3RvcnkoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNGYWN0b3J5RGVmTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG5cbiAgY3JlYXRlUGFyc2VTb3VyY2VTcGFuKGtpbmQ6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcpOiBQYXJzZVNvdXJjZVNwYW47XG5cbiAgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlOiB0eXBlb2YgUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlO1xuICBSM0ZhY3RvcnlUYXJnZXQ6IHR5cGVvZiBSM0ZhY3RvcnlUYXJnZXQ7XG4gIFJlc291cmNlTG9hZGVyOiB7bmV3ICgpOiBSZXNvdXJjZUxvYWRlcn07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29yZUVudmlyb25tZW50IHsgW25hbWU6IHN0cmluZ106IEZ1bmN0aW9uOyB9XG5cbmV4cG9ydCB0eXBlIFJlc291cmNlTG9hZGVyID0ge1xuICBnZXQodXJsOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz58IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFN0cmluZ01hcCA9IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgU3RyaW5nTWFwV2l0aFJlbmFtZSA9IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgW3N0cmluZywgc3RyaW5nXTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3ZpZGVyID0gYW55O1xuXG5leHBvcnQgZW51bSBSM1Jlc29sdmVkRGVwZW5kZW5jeVR5cGUge1xuICBUb2tlbiA9IDAsXG4gIEF0dHJpYnV0ZSA9IDEsXG4gIENoYW5nZURldGVjdG9yUmVmID0gMixcbn1cblxuZXhwb3J0IGVudW0gUjNGYWN0b3J5VGFyZ2V0IHtcbiAgRGlyZWN0aXZlID0gMCxcbiAgQ29tcG9uZW50ID0gMSxcbiAgSW5qZWN0YWJsZSA9IDIsXG4gIFBpcGUgPSAzLFxuICBOZ01vZHVsZSA9IDQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGUge1xuICB0b2tlbjogYW55O1xuICByZXNvbHZlZDogUjNSZXNvbHZlZERlcGVuZGVuY3lUeXBlO1xuICBob3N0OiBib29sZWFuO1xuICBvcHRpb25hbDogYm9vbGVhbjtcbiAgc2VsZjogYm9vbGVhbjtcbiAgc2tpcFNlbGY6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNQaXBlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgdHlwZUFyZ3VtZW50Q291bnQ6IG51bWJlcjtcbiAgcGlwZU5hbWU6IHN0cmluZztcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBwdXJlOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0YWJsZU1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIHByb3ZpZGVkSW46IGFueTtcbiAgdXNlQ2xhc3M/OiBhbnk7XG4gIHVzZUZhY3Rvcnk/OiBhbnk7XG4gIHVzZUV4aXN0aW5nPzogYW55O1xuICB1c2VWYWx1ZT86IGFueTtcbiAgdXNlckRlcHM/OiBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzTmdNb2R1bGVNZXRhZGF0YUZhY2FkZSB7XG4gIHR5cGU6IGFueTtcbiAgYm9vdHN0cmFwOiBGdW5jdGlvbltdO1xuICBkZWNsYXJhdGlvbnM6IEZ1bmN0aW9uW107XG4gIGltcG9ydHM6IEZ1bmN0aW9uW107XG4gIGV4cG9ydHM6IEZ1bmN0aW9uW107XG4gIGVtaXRJbmxpbmU6IGJvb2xlYW47XG4gIHNjaGVtYXM6IHtuYW1lOiBzdHJpbmd9W118bnVsbDtcbiAgaWQ6IHN0cmluZ3xudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0b3JNZXRhZGF0YUZhY2FkZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogYW55O1xuICBkZXBzOiBSM0RlcGVuZGVuY3lNZXRhZGF0YUZhY2FkZVtdfG51bGw7XG4gIHByb3ZpZGVyczogYW55W107XG4gIGltcG9ydHM6IGFueVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGlyZWN0aXZlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IGFueTtcbiAgdHlwZUFyZ3VtZW50Q291bnQ6IG51bWJlcjtcbiAgdHlwZVNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbjtcbiAgZGVwczogUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXxudWxsO1xuICBzZWxlY3Rvcjogc3RyaW5nfG51bGw7XG4gIHF1ZXJpZXM6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdO1xuICBob3N0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgcHJvcE1ldGFkYXRhOiB7W2tleTogc3RyaW5nXTogYW55W119O1xuICBsaWZlY3ljbGU6IHt1c2VzT25DaGFuZ2VzOiBib29sZWFuO307XG4gIGlucHV0czogc3RyaW5nW107XG4gIG91dHB1dHM6IHN0cmluZ1tdO1xuICB1c2VzSW5oZXJpdGFuY2U6IGJvb2xlYW47XG4gIGV4cG9ydEFzOiBzdHJpbmdbXXxudWxsO1xuICBwcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbiAgdmlld1F1ZXJpZXM6IFIzUXVlcnlNZXRhZGF0YUZhY2FkZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzQ29tcG9uZW50TWV0YWRhdGFGYWNhZGUgZXh0ZW5kcyBSM0RpcmVjdGl2ZU1ldGFkYXRhRmFjYWRlIHtcbiAgdGVtcGxhdGU6IHN0cmluZztcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogYm9vbGVhbjtcbiAgYW5pbWF0aW9uczogYW55W118dW5kZWZpbmVkO1xuICBwaXBlczogTWFwPHN0cmluZywgYW55PjtcbiAgZGlyZWN0aXZlczoge3NlbGVjdG9yOiBzdHJpbmcsIGV4cHJlc3Npb246IGFueX1bXTtcbiAgc3R5bGVzOiBzdHJpbmdbXTtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHZpZXdQcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRmFjdG9yeURlZk1ldGFkYXRhRmFjYWRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBhbnk7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW118bnVsbDtcbiAgaW5qZWN0Rm46ICdkaXJlY3RpdmVJbmplY3QnfCdpbmplY3QnO1xuICB0YXJnZXQ6IFIzRmFjdG9yeVRhcmdldDtcbn1cblxuZXhwb3J0IHR5cGUgVmlld0VuY2Fwc3VsYXRpb24gPSBudW1iZXI7XG5cbmV4cG9ydCB0eXBlIENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzUXVlcnlNZXRhZGF0YUZhY2FkZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcHJlZGljYXRlOiBhbnl8c3RyaW5nW107XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICByZWFkOiBhbnl8bnVsbDtcbiAgc3RhdGljOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlU291cmNlU3BhbiB7XG4gIHN0YXJ0OiBhbnk7XG4gIGVuZDogYW55O1xuICBkZXRhaWxzOiBhbnk7XG59XG4iXX0=