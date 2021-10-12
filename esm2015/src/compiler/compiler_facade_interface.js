/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var FactoryTarget;
(function (FactoryTarget) {
    FactoryTarget[FactoryTarget["Directive"] = 0] = "Directive";
    FactoryTarget[FactoryTarget["Component"] = 1] = "Component";
    FactoryTarget[FactoryTarget["Injectable"] = 2] = "Injectable";
    FactoryTarget[FactoryTarget["Pipe"] = 3] = "Pipe";
    FactoryTarget[FactoryTarget["NgModule"] = 4] = "NgModule";
})(FactoryTarget || (FactoryTarget = {}));
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvbXBpbGVyL2NvbXBpbGVyX2ZhY2FkZV9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBb0ZILE1BQU0sQ0FBTixJQUFZLGFBTVg7QUFORCxXQUFZLGFBQWE7SUFDdkIsMkRBQWEsQ0FBQTtJQUNiLDJEQUFhLENBQUE7SUFDYiw2REFBYyxDQUFBO0lBQ2QsaURBQVEsQ0FBQTtJQUNSLHlEQUFZLENBQUE7QUFDZCxDQUFDLEVBTlcsYUFBYSxLQUFiLGFBQWEsUUFNeEI7QUFpS0QsTUFBTSxDQUFOLElBQVksaUJBS1g7QUFMRCxXQUFZLGlCQUFpQjtJQUMzQixpRUFBWSxDQUFBO0lBQ1osNEZBQTRGO0lBQzVGLHlEQUFRLENBQUE7SUFDUixtRUFBYSxDQUFBO0FBQ2YsQ0FBQyxFQUxXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFLNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG4vKipcbiAqIEEgc2V0IG9mIGludGVyZmFjZXMgd2hpY2ggYXJlIHNoYXJlZCBiZXR3ZWVuIGBAYW5ndWxhci9jb3JlYCBhbmQgYEBhbmd1bGFyL2NvbXBpbGVyYCB0byBhbGxvd1xuICogZm9yIGxhdGUgYmluZGluZyBvZiBgQGFuZ3VsYXIvY29tcGlsZXJgIGZvciBKSVQgcHVycG9zZXMuXG4gKlxuICogVGhpcyBmaWxlIGhhcyB0d28gY29waWVzLiBQbGVhc2UgZW5zdXJlIHRoYXQgdGhleSBhcmUgaW4gc3luYzpcbiAqICAtIHBhY2thZ2VzL2NvbXBpbGVyL3NyYy9jb21waWxlcl9mYWNhZGVfaW50ZXJmYWNlLnRzICAgICAgICAgIChtYWluKVxuICogIC0gcGFja2FnZXMvY29yZS9zcmMvY29tcGlsZXIvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50cyAgICAgKHJlcGxpY2EpXG4gKlxuICogUGxlYXNlIGVuc3VyZSB0aGF0IHRoZSB0d28gZmlsZXMgYXJlIGluIHN5bmMgdXNpbmcgdGhpcyBjb21tYW5kOlxuICogYGBgXG4gKiBjcCBwYWNrYWdlcy9jb21waWxlci9zcmMvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50cyBcXFxuICogICAgcGFja2FnZXMvY29yZS9zcmMvY29tcGlsZXIvY29tcGlsZXJfZmFjYWRlX2ludGVyZmFjZS50c1xuICogYGBgXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBFeHBvcnRlZENvbXBpbGVyRmFjYWRlIHtcbiAgybVjb21waWxlckZhY2FkZTogQ29tcGlsZXJGYWNhZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGlsZXJGYWNhZGUge1xuICBjb21waWxlUGlwZShhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNQaXBlTWV0YWRhdGFGYWNhZGUpOlxuICAgICAgYW55O1xuICBjb21waWxlUGlwZURlY2xhcmF0aW9uKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIGRlY2xhcmF0aW9uOiBSM0RlY2xhcmVQaXBlRmFjYWRlKTogYW55O1xuICBjb21waWxlSW5qZWN0YWJsZShcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0luamVjdGFibGVNZXRhZGF0YUZhY2FkZSk6IGFueTtcbiAgY29tcGlsZUluamVjdGFibGVEZWNsYXJhdGlvbihcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0RlY2xhcmVJbmplY3RhYmxlRmFjYWRlKTogYW55O1xuICBjb21waWxlSW5qZWN0b3IoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNJbmplY3Rvck1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlSW5qZWN0b3JEZWNsYXJhdGlvbihcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLFxuICAgICAgZGVjbGFyYXRpb246IFIzRGVjbGFyZUluamVjdG9yRmFjYWRlKTogYW55O1xuICBjb21waWxlTmdNb2R1bGUoXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZywgbWV0YTogUjNOZ01vZHVsZU1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlTmdNb2R1bGVEZWNsYXJhdGlvbihcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLFxuICAgICAgZGVjbGFyYXRpb246IFIzRGVjbGFyZU5nTW9kdWxlRmFjYWRlKTogYW55O1xuICBjb21waWxlRGlyZWN0aXZlKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzRGlyZWN0aXZlTWV0YWRhdGFGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVEaXJlY3RpdmVEZWNsYXJhdGlvbihcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLFxuICAgICAgZGVjbGFyYXRpb246IFIzRGVjbGFyZURpcmVjdGl2ZUZhY2FkZSk6IGFueTtcbiAgY29tcGlsZUNvbXBvbmVudChcbiAgICAgIGFuZ3VsYXJDb3JlRW52OiBDb3JlRW52aXJvbm1lbnQsIHNvdXJjZU1hcFVybDogc3RyaW5nLCBtZXRhOiBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlQ29tcG9uZW50RGVjbGFyYXRpb24oXG4gICAgICBhbmd1bGFyQ29yZUVudjogQ29yZUVudmlyb25tZW50LCBzb3VyY2VNYXBVcmw6IHN0cmluZyxcbiAgICAgIGRlY2xhcmF0aW9uOiBSM0RlY2xhcmVDb21wb25lbnRGYWNhZGUpOiBhbnk7XG4gIGNvbXBpbGVGYWN0b3J5KFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzRmFjdG9yeURlZk1ldGFkYXRhRmFjYWRlKTogYW55O1xuICBjb21waWxlRmFjdG9yeURlY2xhcmF0aW9uKFxuICAgICAgYW5ndWxhckNvcmVFbnY6IENvcmVFbnZpcm9ubWVudCwgc291cmNlTWFwVXJsOiBzdHJpbmcsIG1ldGE6IFIzRGVjbGFyZUZhY3RvcnlGYWNhZGUpOiBhbnk7XG5cbiAgY3JlYXRlUGFyc2VTb3VyY2VTcGFuKGtpbmQ6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZywgc291cmNlVXJsOiBzdHJpbmcpOiBQYXJzZVNvdXJjZVNwYW47XG5cbiAgRmFjdG9yeVRhcmdldDogdHlwZW9mIEZhY3RvcnlUYXJnZXQ7XG4gIC8vIE5vdGUgdGhhdCB3ZSBkbyBub3QgdXNlIGB7bmV3KCk6IFJlc291cmNlTG9hZGVyfWAgaGVyZSBiZWNhdXNlXG4gIC8vIHRoZSByZXNvdXJjZSBsb2FkZXIgY2xhc3MgaXMgYWJzdHJhY3QgYW5kIG5vdCBjb25zdHJ1Y3RhYmxlLlxuICBSZXNvdXJjZUxvYWRlcjogRnVuY3Rpb24me3Byb3RvdHlwZTogUmVzb3VyY2VMb2FkZXJ9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvcmVFbnZpcm9ubWVudCB7XG4gIFtuYW1lOiBzdHJpbmddOiBGdW5jdGlvbjtcbn1cblxuZXhwb3J0IHR5cGUgUmVzb3VyY2VMb2FkZXIgPSB7XG4gIGdldCh1cmw6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPnxzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBTdHJpbmdNYXAgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFN0cmluZ01hcFdpdGhSZW5hbWUgPSB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZ3xbc3RyaW5nLCBzdHJpbmddO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvdmlkZXIgPSB1bmtub3duO1xuZXhwb3J0IHR5cGUgVHlwZSA9IEZ1bmN0aW9uO1xuZXhwb3J0IHR5cGUgT3BhcXVlVmFsdWUgPSB1bmtub3duO1xuXG5leHBvcnQgZW51bSBGYWN0b3J5VGFyZ2V0IHtcbiAgRGlyZWN0aXZlID0gMCxcbiAgQ29tcG9uZW50ID0gMSxcbiAgSW5qZWN0YWJsZSA9IDIsXG4gIFBpcGUgPSAzLFxuICBOZ01vZHVsZSA9IDQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGUge1xuICB0b2tlbjogT3BhcXVlVmFsdWU7XG4gIGF0dHJpYnV0ZTogc3RyaW5nfG51bGw7XG4gIGhvc3Q6IGJvb2xlYW47XG4gIG9wdGlvbmFsOiBib29sZWFuO1xuICBzZWxmOiBib29sZWFuO1xuICBza2lwU2VsZjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGUge1xuICB0b2tlbjogT3BhcXVlVmFsdWU7XG4gIGF0dHJpYnV0ZT86IGJvb2xlYW47XG4gIGhvc3Q/OiBib29sZWFuO1xuICBvcHRpb25hbD86IGJvb2xlYW47XG4gIHNlbGY/OiBib29sZWFuO1xuICBza2lwU2VsZj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNQaXBlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IFR5cGU7XG4gIHBpcGVOYW1lOiBzdHJpbmc7XG4gIHB1cmU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNJbmplY3RhYmxlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IFR5cGU7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIHByb3ZpZGVkSW4/OiBUeXBlfCdyb290J3wncGxhdGZvcm0nfCdhbnknfG51bGw7XG4gIHVzZUNsYXNzPzogT3BhcXVlVmFsdWU7XG4gIHVzZUZhY3Rvcnk/OiBPcGFxdWVWYWx1ZTtcbiAgdXNlRXhpc3Rpbmc/OiBPcGFxdWVWYWx1ZTtcbiAgdXNlVmFsdWU/OiBPcGFxdWVWYWx1ZTtcbiAgZGVwcz86IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNOZ01vZHVsZU1ldGFkYXRhRmFjYWRlIHtcbiAgdHlwZTogVHlwZTtcbiAgYm9vdHN0cmFwOiBGdW5jdGlvbltdO1xuICBkZWNsYXJhdGlvbnM6IEZ1bmN0aW9uW107XG4gIGltcG9ydHM6IEZ1bmN0aW9uW107XG4gIGV4cG9ydHM6IEZ1bmN0aW9uW107XG4gIHNjaGVtYXM6IHtuYW1lOiBzdHJpbmd9W118bnVsbDtcbiAgaWQ6IHN0cmluZ3xudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzSW5qZWN0b3JNZXRhZGF0YUZhY2FkZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogVHlwZTtcbiAgcHJvdmlkZXJzOiBQcm92aWRlcltdO1xuICBpbXBvcnRzOiBPcGFxdWVWYWx1ZVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGlyZWN0aXZlTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IFR5cGU7XG4gIHR5cGVTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW47XG4gIHNlbGVjdG9yOiBzdHJpbmd8bnVsbDtcbiAgcXVlcmllczogUjNRdWVyeU1ldGFkYXRhRmFjYWRlW107XG4gIGhvc3Q6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcm9wTWV0YWRhdGE6IHtba2V5OiBzdHJpbmddOiBPcGFxdWVWYWx1ZVtdfTtcbiAgbGlmZWN5Y2xlOiB7dXNlc09uQ2hhbmdlczogYm9vbGVhbjt9O1xuICBpbnB1dHM6IHN0cmluZ1tdO1xuICBvdXRwdXRzOiBzdHJpbmdbXTtcbiAgdXNlc0luaGVyaXRhbmNlOiBib29sZWFuO1xuICBleHBvcnRBczogc3RyaW5nW118bnVsbDtcbiAgcHJvdmlkZXJzOiBQcm92aWRlcltdfG51bGw7XG4gIHZpZXdRdWVyaWVzOiBSM1F1ZXJ5TWV0YWRhdGFGYWNhZGVbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0NvbXBvbmVudE1ldGFkYXRhRmFjYWRlIGV4dGVuZHMgUjNEaXJlY3RpdmVNZXRhZGF0YUZhY2FkZSB7XG4gIHRlbXBsYXRlOiBzdHJpbmc7XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGJvb2xlYW47XG4gIGFuaW1hdGlvbnM6IE9wYXF1ZVZhbHVlW118dW5kZWZpbmVkO1xuICBwaXBlczogTWFwPHN0cmluZywgYW55PjtcbiAgZGlyZWN0aXZlczogUjNVc2VkRGlyZWN0aXZlTWV0YWRhdGFbXTtcbiAgc3R5bGVzOiBzdHJpbmdbXTtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHZpZXdQcm92aWRlcnM6IFByb3ZpZGVyW118bnVsbDtcbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG4gIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZURpcmVjdGl2ZUZhY2FkZSB7XG4gIHNlbGVjdG9yPzogc3RyaW5nO1xuICB0eXBlOiBUeXBlO1xuICBpbnB1dHM/OiB7W2NsYXNzUHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmd8W3N0cmluZywgc3RyaW5nXX07XG4gIG91dHB1dHM/OiB7W2NsYXNzUHJvcGVydHlOYW1lOiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0Pzoge1xuICAgIGF0dHJpYnV0ZXM/OiB7W2tleTogc3RyaW5nXTogT3BhcXVlVmFsdWV9O1xuICAgIGxpc3RlbmVycz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICAgIHByb3BlcnRpZXM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgICBjbGFzc0F0dHJpYnV0ZT86IHN0cmluZztcbiAgICBzdHlsZUF0dHJpYnV0ZT86IHN0cmluZztcbiAgfTtcbiAgcXVlcmllcz86IFIzRGVjbGFyZVF1ZXJ5TWV0YWRhdGFGYWNhZGVbXTtcbiAgdmlld1F1ZXJpZXM/OiBSM0RlY2xhcmVRdWVyeU1ldGFkYXRhRmFjYWRlW107XG4gIHByb3ZpZGVycz86IE9wYXF1ZVZhbHVlO1xuICBleHBvcnRBcz86IHN0cmluZ1tdO1xuICB1c2VzSW5oZXJpdGFuY2U/OiBib29sZWFuO1xuICB1c2VzT25DaGFuZ2VzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVDb21wb25lbnRGYWNhZGUgZXh0ZW5kcyBSM0RlY2xhcmVEaXJlY3RpdmVGYWNhZGUge1xuICB0ZW1wbGF0ZTogc3RyaW5nO1xuICBpc0lubGluZT86IGJvb2xlYW47XG4gIHN0eWxlcz86IHN0cmluZ1tdO1xuICBjb21wb25lbnRzPzogUjNEZWNsYXJlVXNlZERpcmVjdGl2ZUZhY2FkZVtdO1xuICBkaXJlY3RpdmVzPzogUjNEZWNsYXJlVXNlZERpcmVjdGl2ZUZhY2FkZVtdO1xuICBwaXBlcz86IHtbcGlwZU5hbWU6IHN0cmluZ106IE9wYXF1ZVZhbHVlfCgoKSA9PiBPcGFxdWVWYWx1ZSl9O1xuICB2aWV3UHJvdmlkZXJzPzogT3BhcXVlVmFsdWU7XG4gIGFuaW1hdGlvbnM/OiBPcGFxdWVWYWx1ZTtcbiAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbjtcbiAgaW50ZXJwb2xhdGlvbj86IFtzdHJpbmcsIHN0cmluZ107XG4gIHByZXNlcnZlV2hpdGVzcGFjZXM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZVVzZWREaXJlY3RpdmVGYWNhZGUge1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICB0eXBlOiBPcGFxdWVWYWx1ZXwoKCkgPT4gT3BhcXVlVmFsdWUpO1xuICBpbnB1dHM/OiBzdHJpbmdbXTtcbiAgb3V0cHV0cz86IHN0cmluZ1tdO1xuICBleHBvcnRBcz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzVXNlZERpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgc2VsZWN0b3I6IHN0cmluZztcbiAgaW5wdXRzOiBzdHJpbmdbXTtcbiAgb3V0cHV0czogc3RyaW5nW107XG4gIGV4cG9ydEFzOiBzdHJpbmdbXXxudWxsO1xuICB0eXBlOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNGYWN0b3J5RGVmTWV0YWRhdGFGYWNhZGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IFR5cGU7XG4gIHR5cGVBcmd1bWVudENvdW50OiBudW1iZXI7XG4gIGRlcHM6IFIzRGVwZW5kZW5jeU1ldGFkYXRhRmFjYWRlW118bnVsbDtcbiAgdGFyZ2V0OiBGYWN0b3J5VGFyZ2V0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZUZhY3RvcnlGYWNhZGUge1xuICB0eXBlOiBUeXBlO1xuICBkZXBzOiBSM0RlY2xhcmVEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXXwnaW52YWxpZCd8bnVsbDtcbiAgdGFyZ2V0OiBGYWN0b3J5VGFyZ2V0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZUluamVjdGFibGVGYWNhZGUge1xuICB0eXBlOiBUeXBlO1xuICBwcm92aWRlZEluPzogVHlwZXwncm9vdCd8J3BsYXRmb3JtJ3wnYW55J3xudWxsO1xuICB1c2VDbGFzcz86IE9wYXF1ZVZhbHVlO1xuICB1c2VGYWN0b3J5PzogT3BhcXVlVmFsdWU7XG4gIHVzZUV4aXN0aW5nPzogT3BhcXVlVmFsdWU7XG4gIHVzZVZhbHVlPzogT3BhcXVlVmFsdWU7XG4gIGRlcHM/OiBSM0RlY2xhcmVEZXBlbmRlbmN5TWV0YWRhdGFGYWNhZGVbXTtcbn1cblxuZXhwb3J0IGVudW0gVmlld0VuY2Fwc3VsYXRpb24ge1xuICBFbXVsYXRlZCA9IDAsXG4gIC8vIEhpc3RvcmljYWxseSB0aGUgMSB2YWx1ZSB3YXMgZm9yIGBOYXRpdmVgIGVuY2Fwc3VsYXRpb24gd2hpY2ggaGFzIGJlZW4gcmVtb3ZlZCBhcyBvZiB2MTEuXG4gIE5vbmUgPSAyLFxuICBTaGFkb3dEb20gPSAzXG59XG5cbmV4cG9ydCB0eXBlIENoYW5nZURldGVjdGlvblN0cmF0ZWd5ID0gbnVtYmVyO1xuXG5leHBvcnQgaW50ZXJmYWNlIFIzUXVlcnlNZXRhZGF0YUZhY2FkZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcHJlZGljYXRlOiBPcGFxdWVWYWx1ZXxzdHJpbmdbXTtcbiAgZGVzY2VuZGFudHM6IGJvb2xlYW47XG4gIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5OiBib29sZWFuO1xuICByZWFkOiBPcGFxdWVWYWx1ZXxudWxsO1xuICBzdGF0aWM6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZWNsYXJlUXVlcnlNZXRhZGF0YUZhY2FkZSB7XG4gIHByb3BlcnR5TmFtZTogc3RyaW5nO1xuICBmaXJzdD86IGJvb2xlYW47XG4gIHByZWRpY2F0ZTogT3BhcXVlVmFsdWV8c3RyaW5nW107XG4gIGRlc2NlbmRhbnRzPzogYm9vbGVhbjtcbiAgcmVhZD86IE9wYXF1ZVZhbHVlO1xuICBzdGF0aWM/OiBib29sZWFuO1xuICBlbWl0RGlzdGluY3RDaGFuZ2VzT25seT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUjNEZWNsYXJlSW5qZWN0b3JGYWNhZGUge1xuICB0eXBlOiBUeXBlO1xuICBpbXBvcnRzPzogT3BhcXVlVmFsdWVbXTtcbiAgcHJvdmlkZXJzPzogT3BhcXVlVmFsdWVbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSM0RlY2xhcmVOZ01vZHVsZUZhY2FkZSB7XG4gIHR5cGU6IFR5cGU7XG4gIGJvb3RzdHJhcD86IE9wYXF1ZVZhbHVlW118KCgpID0+IE9wYXF1ZVZhbHVlW10pO1xuICBkZWNsYXJhdGlvbnM/OiBPcGFxdWVWYWx1ZVtdfCgoKSA9PiBPcGFxdWVWYWx1ZVtdKTtcbiAgaW1wb3J0cz86IE9wYXF1ZVZhbHVlW118KCgpID0+IE9wYXF1ZVZhbHVlW10pO1xuICBleHBvcnRzPzogT3BhcXVlVmFsdWVbXXwoKCkgPT4gT3BhcXVlVmFsdWVbXSk7XG4gIHNjaGVtYXM/OiBPcGFxdWVWYWx1ZVtdO1xuICBpZD86IE9wYXF1ZVZhbHVlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFIzRGVjbGFyZVBpcGVGYWNhZGUge1xuICB0eXBlOiBUeXBlO1xuICBuYW1lOiBzdHJpbmc7XG4gIHB1cmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlU291cmNlU3BhbiB7XG4gIHN0YXJ0OiBhbnk7XG4gIGVuZDogYW55O1xuICBkZXRhaWxzOiBhbnk7XG4gIGZ1bGxTdGFydDogYW55O1xufVxuIl19