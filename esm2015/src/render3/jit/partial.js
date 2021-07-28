/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FactoryTarget, getCompilerFacade } from '../../compiler/compiler_facade';
import { setClassMetadata } from '../metadata';
import { angularCoreEnv } from './environment';
/**
 * Compiles a partial directive declaration object into a full directive definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareDirective(decl) {
    const compiler = getCompilerFacade({ usage: 1 /* PartialDeclaration */, kind: 'directive', type: decl.type });
    return compiler.compileDirectiveDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵfac.js`, decl);
}
/**
 * Evaluates the class metadata declaration.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareClassMetadata(decl) {
    var _a, _b;
    setClassMetadata(decl.type, decl.decorators, (_a = decl.ctorParameters) !== null && _a !== void 0 ? _a : null, (_b = decl.propDecorators) !== null && _b !== void 0 ? _b : null);
}
/**
 * Compiles a partial component declaration object into a full component definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareComponent(decl) {
    const compiler = getCompilerFacade({ usage: 1 /* PartialDeclaration */, kind: 'component', type: decl.type });
    return compiler.compileComponentDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵcmp.js`, decl);
}
/**
 * Compiles a partial pipe declaration object into a full pipe definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareFactory(decl) {
    const compiler = getCompilerFacade({
        usage: 1 /* PartialDeclaration */,
        kind: getFactoryKind(decl.target),
        type: decl.type
    });
    return compiler.compileFactoryDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵfac.js`, decl);
}
function getFactoryKind(target) {
    switch (target) {
        case FactoryTarget.Directive:
            return 'directive';
        case FactoryTarget.Component:
            return 'component';
        case FactoryTarget.Injectable:
            return 'injectable';
        case FactoryTarget.Pipe:
            return 'pipe';
        case FactoryTarget.NgModule:
            return 'NgModule';
    }
}
/**
 * Compiles a partial injectable declaration object into a full injectable definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareInjectable(decl) {
    const compiler = getCompilerFacade({ usage: 1 /* PartialDeclaration */, kind: 'injectable', type: decl.type });
    return compiler.compileInjectableDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵprov.js`, decl);
}
/**
 * These enums are used in the partial factory declaration calls.
 */
export { FactoryTarget } from '../../compiler/compiler_facade';
/**
 * Compiles a partial injector declaration object into a full injector definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareInjector(decl) {
    const compiler = getCompilerFacade({ usage: 1 /* PartialDeclaration */, kind: 'NgModule', type: decl.type });
    return compiler.compileInjectorDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵinj.js`, decl);
}
/**
 * Compiles a partial NgModule declaration object into a full NgModule definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclareNgModule(decl) {
    const compiler = getCompilerFacade({ usage: 1 /* PartialDeclaration */, kind: 'NgModule', type: decl.type });
    return compiler.compileNgModuleDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵmod.js`, decl);
}
/**
 * Compiles a partial pipe declaration object into a full pipe definition object.
 *
 * @codeGenApi
 */
export function ɵɵngDeclarePipe(decl) {
    const compiler = getCompilerFacade({ usage: 1 /* PartialDeclaration */, kind: 'pipe', type: decl.type });
    return compiler.compilePipeDeclaration(angularCoreEnv, `ng:///${decl.type.name}/ɵpipe.js`, decl);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGlhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L3BhcnRpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBRSxpQkFBaUIsRUFBaU0sTUFBTSxnQ0FBZ0MsQ0FBQztBQUVoUixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDN0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3Qzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLElBQThCO0lBQ2pFLE1BQU0sUUFBUSxHQUFHLGlCQUFpQixDQUM5QixFQUFDLEtBQUssNEJBQXFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDdEYsT0FBTyxRQUFRLENBQUMsMkJBQTJCLENBQ3ZDLGNBQWMsRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsSUFJeEM7O0lBQ0MsZ0JBQWdCLENBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQUEsSUFBSSxDQUFDLGNBQWMsbUNBQUksSUFBSSxFQUFFLE1BQUEsSUFBSSxDQUFDLGNBQWMsbUNBQUksSUFBSSxDQUFDLENBQUM7QUFDNUYsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsSUFBOEI7SUFDakUsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQzlCLEVBQUMsS0FBSyw0QkFBcUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFB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LGNBQWMsRUFBRSxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZhY3RvcnlUYXJnZXQsIGdldENvbXBpbGVyRmFjYWRlLCBKaXRDb21waWxlclVzYWdlLCBSM0RlY2xhcmVDb21wb25lbnRGYWNhZGUsIFIzRGVjbGFyZURpcmVjdGl2ZUZhY2FkZSwgUjNEZWNsYXJlRmFjdG9yeUZhY2FkZSwgUjNEZWNsYXJlSW5qZWN0YWJsZUZhY2FkZSwgUjNEZWNsYXJlSW5qZWN0b3JGYWNhZGUsIFIzRGVjbGFyZU5nTW9kdWxlRmFjYWRlLCBSM0RlY2xhcmVQaXBlRmFjYWRlfSBmcm9tICcuLi8uLi9jb21waWxlci9jb21waWxlcl9mYWNhZGUnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge3NldENsYXNzTWV0YWRhdGF9IGZyb20gJy4uL21ldGFkYXRhJztcbmltcG9ydCB7YW5ndWxhckNvcmVFbnZ9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuXG4vKipcbiAqIENvbXBpbGVzIGEgcGFydGlhbCBkaXJlY3RpdmUgZGVjbGFyYXRpb24gb2JqZWN0IGludG8gYSBmdWxsIGRpcmVjdGl2ZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtW5nRGVjbGFyZURpcmVjdGl2ZShkZWNsOiBSM0RlY2xhcmVEaXJlY3RpdmVGYWNhZGUpOiB1bmtub3duIHtcbiAgY29uc3QgY29tcGlsZXIgPSBnZXRDb21waWxlckZhY2FkZShcbiAgICAgIHt1c2FnZTogSml0Q29tcGlsZXJVc2FnZS5QYXJ0aWFsRGVjbGFyYXRpb24sIGtpbmQ6ICdkaXJlY3RpdmUnLCB0eXBlOiBkZWNsLnR5cGV9KTtcbiAgcmV0dXJuIGNvbXBpbGVyLmNvbXBpbGVEaXJlY3RpdmVEZWNsYXJhdGlvbihcbiAgICAgIGFuZ3VsYXJDb3JlRW52LCBgbmc6Ly8vJHtkZWNsLnR5cGUubmFtZX0vybVmYWMuanNgLCBkZWNsKTtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZXMgdGhlIGNsYXNzIG1ldGFkYXRhIGRlY2xhcmF0aW9uLlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmdEZWNsYXJlQ2xhc3NNZXRhZGF0YShkZWNsOiB7XG4gIHR5cGU6IFR5cGU8YW55PjsgZGVjb3JhdG9yczogYW55W107XG4gIGN0b3JQYXJhbWV0ZXJzPzogKCkgPT4gYW55W107XG4gIHByb3BEZWNvcmF0b3JzPzoge1tmaWVsZDogc3RyaW5nXTogYW55fTtcbn0pOiB2b2lkIHtcbiAgc2V0Q2xhc3NNZXRhZGF0YShcbiAgICAgIGRlY2wudHlwZSwgZGVjbC5kZWNvcmF0b3JzLCBkZWNsLmN0b3JQYXJhbWV0ZXJzID8/IG51bGwsIGRlY2wucHJvcERlY29yYXRvcnMgPz8gbnVsbCk7XG59XG5cbi8qKlxuICogQ29tcGlsZXMgYSBwYXJ0aWFsIGNvbXBvbmVudCBkZWNsYXJhdGlvbiBvYmplY3QgaW50byBhIGZ1bGwgY29tcG9uZW50IGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmdEZWNsYXJlQ29tcG9uZW50KGRlY2w6IFIzRGVjbGFyZUNvbXBvbmVudEZhY2FkZSk6IHVua25vd24ge1xuICBjb25zdCBjb21waWxlciA9IGdldENvbXBpbGVyRmFjYWRlKFxuICAgICAge3VzYWdlOiBKaXRDb21waWxlclVzYWdlLlBhcnRpYWxEZWNsYXJhdGlvbiwga2luZDogJ2NvbXBvbmVudCcsIHR5cGU6IGRlY2wudHlwZX0pO1xuICByZXR1cm4gY29tcGlsZXIuY29tcGlsZUNvbXBvbmVudERlY2xhcmF0aW9uKFxuICAgICAgYW5ndWxhckNvcmVFbnYsIGBuZzovLy8ke2RlY2wudHlwZS5uYW1lfS/JtWNtcC5qc2AsIGRlY2wpO1xufVxuXG4vKipcbiAqIENvbXBpbGVzIGEgcGFydGlhbCBwaXBlIGRlY2xhcmF0aW9uIG9iamVjdCBpbnRvIGEgZnVsbCBwaXBlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmdEZWNsYXJlRmFjdG9yeShkZWNsOiBSM0RlY2xhcmVGYWN0b3J5RmFjYWRlKTogdW5rbm93biB7XG4gIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoe1xuICAgIHVzYWdlOiBKaXRDb21waWxlclVzYWdlLlBhcnRpYWxEZWNsYXJhdGlvbixcbiAgICBraW5kOiBnZXRGYWN0b3J5S2luZChkZWNsLnRhcmdldCksXG4gICAgdHlwZTogZGVjbC50eXBlXG4gIH0pO1xuICByZXR1cm4gY29tcGlsZXIuY29tcGlsZUZhY3RvcnlEZWNsYXJhdGlvbihcbiAgICAgIGFuZ3VsYXJDb3JlRW52LCBgbmc6Ly8vJHtkZWNsLnR5cGUubmFtZX0vybVmYWMuanNgLCBkZWNsKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmFjdG9yeUtpbmQodGFyZ2V0OiBGYWN0b3J5VGFyZ2V0KSB7XG4gIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgY2FzZSBGYWN0b3J5VGFyZ2V0LkRpcmVjdGl2ZTpcbiAgICAgIHJldHVybiAnZGlyZWN0aXZlJztcbiAgICBjYXNlIEZhY3RvcnlUYXJnZXQuQ29tcG9uZW50OlxuICAgICAgcmV0dXJuICdjb21wb25lbnQnO1xuICAgIGNhc2UgRmFjdG9yeVRhcmdldC5JbmplY3RhYmxlOlxuICAgICAgcmV0dXJuICdpbmplY3RhYmxlJztcbiAgICBjYXNlIEZhY3RvcnlUYXJnZXQuUGlwZTpcbiAgICAgIHJldHVybiAncGlwZSc7XG4gICAgY2FzZSBGYWN0b3J5VGFyZ2V0Lk5nTW9kdWxlOlxuICAgICAgcmV0dXJuICdOZ01vZHVsZSc7XG4gIH1cbn1cblxuLyoqXG4gKiBDb21waWxlcyBhIHBhcnRpYWwgaW5qZWN0YWJsZSBkZWNsYXJhdGlvbiBvYmplY3QgaW50byBhIGZ1bGwgaW5qZWN0YWJsZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtW5nRGVjbGFyZUluamVjdGFibGUoZGVjbDogUjNEZWNsYXJlSW5qZWN0YWJsZUZhY2FkZSk6IHVua25vd24ge1xuICBjb25zdCBjb21waWxlciA9IGdldENvbXBpbGVyRmFjYWRlKFxuICAgICAge3VzYWdlOiBKaXRDb21waWxlclVzYWdlLlBhcnRpYWxEZWNsYXJhdGlvbiwga2luZDogJ2luamVjdGFibGUnLCB0eXBlOiBkZWNsLnR5cGV9KTtcbiAgcmV0dXJuIGNvbXBpbGVyLmNvbXBpbGVJbmplY3RhYmxlRGVjbGFyYXRpb24oXG4gICAgICBhbmd1bGFyQ29yZUVudiwgYG5nOi8vLyR7ZGVjbC50eXBlLm5hbWV9L8m1cHJvdi5qc2AsIGRlY2wpO1xufVxuXG4vKipcbiAqIFRoZXNlIGVudW1zIGFyZSB1c2VkIGluIHRoZSBwYXJ0aWFsIGZhY3RvcnkgZGVjbGFyYXRpb24gY2FsbHMuXG4gKi9cbmV4cG9ydCB7RmFjdG9yeVRhcmdldH0gZnJvbSAnLi4vLi4vY29tcGlsZXIvY29tcGlsZXJfZmFjYWRlJztcblxuLyoqXG4gKiBDb21waWxlcyBhIHBhcnRpYWwgaW5qZWN0b3IgZGVjbGFyYXRpb24gb2JqZWN0IGludG8gYSBmdWxsIGluamVjdG9yIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmdEZWNsYXJlSW5qZWN0b3IoZGVjbDogUjNEZWNsYXJlSW5qZWN0b3JGYWNhZGUpOiB1bmtub3duIHtcbiAgY29uc3QgY29tcGlsZXIgPSBnZXRDb21waWxlckZhY2FkZShcbiAgICAgIHt1c2FnZTogSml0Q29tcGlsZXJVc2FnZS5QYXJ0aWFsRGVjbGFyYXRpb24sIGtpbmQ6ICdOZ01vZHVsZScsIHR5cGU6IGRlY2wudHlwZX0pO1xuICByZXR1cm4gY29tcGlsZXIuY29tcGlsZUluamVjdG9yRGVjbGFyYXRpb24oXG4gICAgICBhbmd1bGFyQ29yZUVudiwgYG5nOi8vLyR7ZGVjbC50eXBlLm5hbWV9L8m1aW5qLmpzYCwgZGVjbCk7XG59XG5cbi8qKlxuICogQ29tcGlsZXMgYSBwYXJ0aWFsIE5nTW9kdWxlIGRlY2xhcmF0aW9uIG9iamVjdCBpbnRvIGEgZnVsbCBOZ01vZHVsZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAY29kZUdlbkFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gybXJtW5nRGVjbGFyZU5nTW9kdWxlKGRlY2w6IFIzRGVjbGFyZU5nTW9kdWxlRmFjYWRlKTogdW5rbm93biB7XG4gIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoXG4gICAgICB7dXNhZ2U6IEppdENvbXBpbGVyVXNhZ2UuUGFydGlhbERlY2xhcmF0aW9uLCBraW5kOiAnTmdNb2R1bGUnLCB0eXBlOiBkZWNsLnR5cGV9KTtcbiAgcmV0dXJuIGNvbXBpbGVyLmNvbXBpbGVOZ01vZHVsZURlY2xhcmF0aW9uKFxuICAgICAgYW5ndWxhckNvcmVFbnYsIGBuZzovLy8ke2RlY2wudHlwZS5uYW1lfS/JtW1vZC5qc2AsIGRlY2wpO1xufVxuXG4vKipcbiAqIENvbXBpbGVzIGEgcGFydGlhbCBwaXBlIGRlY2xhcmF0aW9uIG9iamVjdCBpbnRvIGEgZnVsbCBwaXBlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1bmdEZWNsYXJlUGlwZShkZWNsOiBSM0RlY2xhcmVQaXBlRmFjYWRlKTogdW5rbm93biB7XG4gIGNvbnN0IGNvbXBpbGVyID0gZ2V0Q29tcGlsZXJGYWNhZGUoXG4gICAgICB7dXNhZ2U6IEppdENvbXBpbGVyVXNhZ2UuUGFydGlhbERlY2xhcmF0aW9uLCBraW5kOiAncGlwZScsIHR5cGU6IGRlY2wudHlwZX0pO1xuICByZXR1cm4gY29tcGlsZXIuY29tcGlsZVBpcGVEZWNsYXJhdGlvbihhbmd1bGFyQ29yZUVudiwgYG5nOi8vLyR7ZGVjbC50eXBlLm5hbWV9L8m1cGlwZS5qc2AsIGRlY2wpO1xufVxuIl19