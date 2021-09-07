/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/renderer-to-renderer2", ["require", "exports", "@angular-devkit/schematics", "path", "typescript", "@angular/core/schematics/utils/project_tsconfig_paths", "@angular/core/schematics/utils/typescript/compiler_host", "@angular/core/schematics/utils/typescript/imports", "@angular/core/schematics/utils/typescript/nodes", "@angular/core/schematics/migrations/renderer-to-renderer2/helpers", "@angular/core/schematics/migrations/renderer-to-renderer2/migration", "@angular/core/schematics/migrations/renderer-to-renderer2/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const schematics_1 = require("@angular-devkit/schematics");
    const path_1 = require("path");
    const ts = require("typescript");
    const project_tsconfig_paths_1 = require("@angular/core/schematics/utils/project_tsconfig_paths");
    const compiler_host_1 = require("@angular/core/schematics/utils/typescript/compiler_host");
    const imports_1 = require("@angular/core/schematics/utils/typescript/imports");
    const nodes_1 = require("@angular/core/schematics/utils/typescript/nodes");
    const helpers_1 = require("@angular/core/schematics/migrations/renderer-to-renderer2/helpers");
    const migration_1 = require("@angular/core/schematics/migrations/renderer-to-renderer2/migration");
    const util_1 = require("@angular/core/schematics/migrations/renderer-to-renderer2/util");
    const MODULE_AUGMENTATION_FILENAME = 'ɵɵRENDERER_MIGRATION_CORE_AUGMENTATION.d.ts';
    /**
     * Migration that switches from `Renderer` to `Renderer2`. More information on how it works:
     * https://hackmd.angular.io/UTzUZTnPRA-cSa_4mHyfYw
     */
    function default_1() {
        return (tree) => __awaiter(this, void 0, void 0, function* () {
            const { buildPaths, testPaths } = yield project_tsconfig_paths_1.getProjectTsConfigPaths(tree);
            const basePath = process.cwd();
            const allPaths = [...buildPaths, ...testPaths];
            if (!allPaths.length) {
                throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot migrate Renderer usages to Renderer2.');
            }
            for (const tsconfigPath of allPaths) {
                runRendererToRenderer2Migration(tree, tsconfigPath, basePath);
            }
        });
    }
    exports.default = default_1;
    function runRendererToRenderer2Migration(tree, tsconfigPath, basePath) {
        // Technically we can get away with using `MODULE_AUGMENTATION_FILENAME` as the path, but as of
        // TS 4.2, the module resolution caching seems to be more aggressive which causes the file to be
        // retained between test runs. We can avoid it by using the full path.
        const augmentedFilePath = path_1.join(basePath, MODULE_AUGMENTATION_FILENAME);
        const { program } = compiler_host_1.createMigrationProgram(tree, tsconfigPath, basePath, fileName => {
            // In case the module augmentation file has been requested, we return a source file that
            // augments "@angular/core" to include a named export called "Renderer". This ensures that
            // we can rely on the type checker for this migration in v9 where "Renderer" has been removed.
            if (path_1.basename(fileName) === MODULE_AUGMENTATION_FILENAME) {
                return `
        import '@angular/core';
        declare module "@angular/core" {
          class Renderer {}
        }
      `;
            }
            return undefined;
        }, [augmentedFilePath]);
        const typeChecker = program.getTypeChecker();
        const printer = ts.createPrinter();
        const sourceFiles = program.getSourceFiles().filter(sourceFile => compiler_host_1.canMigrateFile(basePath, sourceFile, program));
        sourceFiles.forEach(sourceFile => {
            const rendererImportSpecifier = imports_1.getImportSpecifier(sourceFile, '@angular/core', 'Renderer');
            const rendererImport = rendererImportSpecifier ?
                nodes_1.closestNode(rendererImportSpecifier, ts.SyntaxKind.NamedImports) :
                null;
            // If there are no imports for the `Renderer`, we can exit early.
            if (!rendererImportSpecifier || !rendererImport) {
                return;
            }
            const { typedNodes, methodCalls, forwardRefs } = util_1.findRendererReferences(sourceFile, typeChecker, rendererImportSpecifier);
            const update = tree.beginUpdate(path_1.relative(basePath, sourceFile.fileName));
            const helpersToAdd = new Set();
            // Change the `Renderer` import to `Renderer2`.
            update.remove(rendererImport.getStart(), rendererImport.getWidth());
            update.insertRight(rendererImport.getStart(), printer.printNode(ts.EmitHint.Unspecified, imports_1.replaceImport(rendererImport, 'Renderer', 'Renderer2'), sourceFile));
            // Change the method parameter and property types to `Renderer2`.
            typedNodes.forEach(node => {
                const type = node.type;
                if (type) {
                    update.remove(type.getStart(), type.getWidth());
                    update.insertRight(type.getStart(), 'Renderer2');
                }
            });
            // Change all identifiers inside `forwardRef` referring to the `Renderer`.
            forwardRefs.forEach(identifier => {
                update.remove(identifier.getStart(), identifier.getWidth());
                update.insertRight(identifier.getStart(), 'Renderer2');
            });
            // Migrate all of the method calls.
            methodCalls.forEach(call => {
                const { node, requiredHelpers } = migration_1.migrateExpression(call, typeChecker);
                if (node) {
                    // If we migrated the node to a new expression, replace only the call expression.
                    update.remove(call.getStart(), call.getWidth());
                    update.insertRight(call.getStart(), printer.printNode(ts.EmitHint.Unspecified, node, sourceFile));
                }
                else if (call.parent && ts.isExpressionStatement(call.parent)) {
                    // Otherwise if the call is inside an expression statement, drop the entire statement.
                    // This takes care of any trailing semicolons. We only need to drop nodes for cases like
                    // `setBindingDebugInfo` which have been noop for a while so they can be removed safely.
                    update.remove(call.parent.getStart(), call.parent.getWidth());
                }
                if (requiredHelpers) {
                    requiredHelpers.forEach(helperName => helpersToAdd.add(helperName));
                }
            });
            // Some of the methods can't be mapped directly to `Renderer2` and need extra logic around them.
            // The safest way to do so is to declare helper functions similar to the ones emitted by TS
            // which encapsulate the extra "glue" logic. We should only emit these functions once per file.
            helpersToAdd.forEach(helperName => {
                update.insertLeft(sourceFile.endOfFileToken.getStart(), helpers_1.getHelper(helperName, sourceFile, printer));
            });
            tree.commitUpdate(update);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvbWlncmF0aW9ucy9yZW5kZXJlci10by1yZW5kZXJlcjIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSCwyREFBMkU7SUFDM0UsK0JBQThDO0lBQzlDLGlDQUFpQztJQUVqQyxrR0FBMkU7SUFDM0UsMkZBQTRGO0lBQzVGLCtFQUFpRjtJQUNqRiwyRUFBeUQ7SUFFekQsK0ZBQW9EO0lBQ3BELG1HQUE4QztJQUM5Qyx5RkFBOEM7SUFFOUMsTUFBTSw0QkFBNEIsR0FBRyw2Q0FBNkMsQ0FBQztJQUVuRjs7O09BR0c7SUFDSDtRQUNFLE9BQU8sQ0FBTyxJQUFVLEVBQUUsRUFBRTtZQUMxQixNQUFNLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxHQUFHLE1BQU0sZ0RBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUUvQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsTUFBTSxJQUFJLGdDQUFtQixDQUN6QixnRkFBZ0YsQ0FBQyxDQUFDO2FBQ3ZGO1lBRUQsS0FBSyxNQUFNLFlBQVksSUFBSSxRQUFRLEVBQUU7Z0JBQ25DLCtCQUErQixDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDL0Q7UUFDSCxDQUFDLENBQUEsQ0FBQztJQUNKLENBQUM7SUFmRCw0QkFlQztJQUVELFNBQVMsK0JBQStCLENBQUMsSUFBVSxFQUFFLFlBQW9CLEVBQUUsUUFBZ0I7UUFDekYsK0ZBQStGO1FBQy9GLGdHQUFn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VUFBVSxDQUFDLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxVQUFVLENBQ2IsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxtQkFBUyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UnVsZSwgU2NoZW1hdGljc0V4Y2VwdGlvbiwgVHJlZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtiYXNlbmFtZSwgam9pbiwgcmVsYXRpdmV9IGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7Z2V0UHJvamVjdFRzQ29uZmlnUGF0aHN9IGZyb20gJy4uLy4uL3V0aWxzL3Byb2plY3RfdHNjb25maWdfcGF0aHMnO1xuaW1wb3J0IHtjYW5NaWdyYXRlRmlsZSwgY3JlYXRlTWlncmF0aW9uUHJvZ3JhbX0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXNjcmlwdC9jb21waWxlcl9ob3N0JztcbmltcG9ydCB7Z2V0SW1wb3J0U3BlY2lmaWVyLCByZXBsYWNlSW1wb3J0fSBmcm9tICcuLi8uLi91dGlscy90eXBlc2NyaXB0L2ltcG9ydHMnO1xuaW1wb3J0IHtjbG9zZXN0Tm9kZX0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXNjcmlwdC9ub2Rlcyc7XG5cbmltcG9ydCB7Z2V0SGVscGVyLCBIZWxwZXJGdW5jdGlvbn0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7bWlncmF0ZUV4cHJlc3Npb259IGZyb20gJy4vbWlncmF0aW9uJztcbmltcG9ydCB7ZmluZFJlbmRlcmVyUmVmZXJlbmNlc30gZnJvbSAnLi91dGlsJztcblxuY29uc3QgTU9EVUxFX0FVR01FTlRBVElPTl9GSUxFTkFNRSA9ICfJtcm1UkVOREVSRVJfTUlHUkFUSU9OX0NPUkVfQVVHTUVOVEFUSU9OLmQudHMnO1xuXG4vKipcbiAqIE1pZ3JhdGlvbiB0aGF0IHN3aXRjaGVzIGZyb20gYFJlbmRlcmVyYCB0byBgUmVuZGVyZXIyYC4gTW9yZSBpbmZvcm1hdGlvbiBvbiBob3cgaXQgd29ya3M6XG4gKiBodHRwczovL2hhY2ttZC5hbmd1bGFyLmlvL1VUelVaVG5QUkEtY1NhXzRtSHlmWXdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKTogUnVsZSB7XG4gIHJldHVybiBhc3luYyAodHJlZTogVHJlZSkgPT4ge1xuICAgIGNvbnN0IHtidWlsZFBhdGhzLCB0ZXN0UGF0aHN9ID0gYXdhaXQgZ2V0UHJvamVjdFRzQ29uZmlnUGF0aHModHJlZSk7XG4gICAgY29uc3QgYmFzZVBhdGggPSBwcm9jZXNzLmN3ZCgpO1xuICAgIGNvbnN0IGFsbFBhdGhzID0gWy4uLmJ1aWxkUGF0aHMsIC4uLnRlc3RQYXRoc107XG5cbiAgICBpZiAoIWFsbFBhdGhzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oXG4gICAgICAgICAgJ0NvdWxkIG5vdCBmaW5kIGFueSB0c2NvbmZpZyBmaWxlLiBDYW5ub3QgbWlncmF0ZSBSZW5kZXJlciB1c2FnZXMgdG8gUmVuZGVyZXIyLicpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdHNjb25maWdQYXRoIG9mIGFsbFBhdGhzKSB7XG4gICAgICBydW5SZW5kZXJlclRvUmVuZGVyZXIyTWlncmF0aW9uKHRyZWUsIHRzY29uZmlnUGF0aCwgYmFzZVBhdGgpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcnVuUmVuZGVyZXJUb1JlbmRlcmVyMk1pZ3JhdGlvbih0cmVlOiBUcmVlLCB0c2NvbmZpZ1BhdGg6IHN0cmluZywgYmFzZVBhdGg6IHN0cmluZykge1xuICAvLyBUZWNobmljYWxseSB3ZSBjYW4gZ2V0IGF3YXkgd2l0aCB1c2luZyBgTU9EVUxFX0FVR01FTlRBVElPTl9GSUxFTkFNRWAgYXMgdGhlIHBhdGgsIGJ1dCBhcyBvZlxuICAvLyBUUyA0LjIsIHRoZSBtb2R1bGUgcmVzb2x1dGlvbiBjYWNoaW5nIHNlZW1zIHRvIGJlIG1vcmUgYWdncmVzc2l2ZSB3aGljaCBjYXVzZXMgdGhlIGZpbGUgdG8gYmVcbiAgLy8gcmV0YWluZWQgYmV0d2VlbiB0ZXN0IHJ1bnMuIFdlIGNhbiBhdm9pZCBpdCBieSB1c2luZyB0aGUgZnVsbCBwYXRoLlxuICBjb25zdCBhdWdtZW50ZWRGaWxlUGF0aCA9IGpvaW4oYmFzZVBhdGgsIE1PRFVMRV9BVUdNRU5UQVRJT05fRklMRU5BTUUpO1xuICBjb25zdCB7cHJvZ3JhbX0gPSBjcmVhdGVNaWdyYXRpb25Qcm9ncmFtKHRyZWUsIHRzY29uZmlnUGF0aCwgYmFzZVBhdGgsIGZpbGVOYW1lID0+IHtcbiAgICAvLyBJbiBjYXNlIHRoZSBtb2R1bGUgYXVnbWVudGF0aW9uIGZpbGUgaGFzIGJlZW4gcmVxdWVzdGVkLCB3ZSByZXR1cm4gYSBzb3VyY2UgZmlsZSB0aGF0XG4gICAgLy8gYXVnbWVudHMgXCJAYW5ndWxhci9jb3JlXCIgdG8gaW5jbHVkZSBhIG5hbWVkIGV4cG9ydCBjYWxsZWQgXCJSZW5kZXJlclwiLiBUaGlzIGVuc3VyZXMgdGhhdFxuICAgIC8vIHdlIGNhbiByZWx5IG9uIHRoZSB0eXBlIGNoZWNrZXIgZm9yIHRoaXMgbWlncmF0aW9uIGluIHY5IHdoZXJlIFwiUmVuZGVyZXJcIiBoYXMgYmVlbiByZW1vdmVkLlxuICAgIGlmIChiYXNlbmFtZShmaWxlTmFtZSkgPT09IE1PRFVMRV9BVUdNRU5UQVRJT05fRklMRU5BTUUpIHtcbiAgICAgIHJldHVybiBgXG4gICAgICAgIGltcG9ydCAnQGFuZ3VsYXIvY29yZSc7XG4gICAgICAgIGRlY2xhcmUgbW9kdWxlIFwiQGFuZ3VsYXIvY29yZVwiIHtcbiAgICAgICAgICBjbGFzcyBSZW5kZXJlciB7fVxuICAgICAgICB9XG4gICAgICBgO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9LCBbYXVnbWVudGVkRmlsZVBhdGhdKTtcbiAgY29uc3QgdHlwZUNoZWNrZXIgPSBwcm9ncmFtLmdldFR5cGVDaGVja2VyKCk7XG4gIGNvbnN0IHByaW50ZXIgPSB0cy5jcmVhdGVQcmludGVyKCk7XG4gIGNvbnN0IHNvdXJjZUZpbGVzID1cbiAgICAgIHByb2dyYW0uZ2V0U291cmNlRmlsZXMoKS5maWx0ZXIoc291cmNlRmlsZSA9PiBjYW5NaWdyYXRlRmlsZShiYXNlUGF0aCwgc291cmNlRmlsZSwgcHJvZ3JhbSkpO1xuXG4gIHNvdXJjZUZpbGVzLmZvckVhY2goc291cmNlRmlsZSA9PiB7XG4gICAgY29uc3QgcmVuZGVyZXJJbXBvcnRTcGVjaWZpZXIgPSBnZXRJbXBvcnRTcGVjaWZpZXIoc291cmNlRmlsZSwgJ0Bhbmd1bGFyL2NvcmUnLCAnUmVuZGVyZXInKTtcbiAgICBjb25zdCByZW5kZXJlckltcG9ydCA9IHJlbmRlcmVySW1wb3J0U3BlY2lmaWVyID9cbiAgICAgICAgY2xvc2VzdE5vZGU8dHMuTmFtZWRJbXBvcnRzPihyZW5kZXJlckltcG9ydFNwZWNpZmllciwgdHMuU3ludGF4S2luZC5OYW1lZEltcG9ydHMpIDpcbiAgICAgICAgbnVsbDtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBpbXBvcnRzIGZvciB0aGUgYFJlbmRlcmVyYCwgd2UgY2FuIGV4aXQgZWFybHkuXG4gICAgaWYgKCFyZW5kZXJlckltcG9ydFNwZWNpZmllciB8fCAhcmVuZGVyZXJJbXBvcnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7dHlwZWROb2RlcywgbWV0aG9kQ2FsbHMsIGZvcndhcmRSZWZzfSA9XG4gICAgICAgIGZpbmRSZW5kZXJlclJlZmVyZW5jZXMoc291cmNlRmlsZSwgdHlwZUNoZWNrZXIsIHJlbmRlcmVySW1wb3J0U3BlY2lmaWVyKTtcbiAgICBjb25zdCB1cGRhdGUgPSB0cmVlLmJlZ2luVXBkYXRlKHJlbGF0aXZlKGJhc2VQYXRoLCBzb3VyY2VGaWxlLmZpbGVOYW1lKSk7XG4gICAgY29uc3QgaGVscGVyc1RvQWRkID0gbmV3IFNldDxIZWxwZXJGdW5jdGlvbj4oKTtcblxuICAgIC8vIENoYW5nZSB0aGUgYFJlbmRlcmVyYCBpbXBvcnQgdG8gYFJlbmRlcmVyMmAuXG4gICAgdXBkYXRlLnJlbW92ZShyZW5kZXJlckltcG9ydC5nZXRTdGFydCgpLCByZW5kZXJlckltcG9ydC5nZXRXaWR0aCgpKTtcbiAgICB1cGRhdGUuaW5zZXJ0UmlnaHQoXG4gICAgICAgIHJlbmRlcmVySW1wb3J0LmdldFN0YXJ0KCksXG4gICAgICAgIHByaW50ZXIucHJpbnROb2RlKFxuICAgICAgICAgICAgdHMuRW1pdEhpbnQuVW5zcGVjaWZpZWQsIHJlcGxhY2VJbXBvcnQocmVuZGVyZXJJbXBvcnQsICdSZW5kZXJlcicsICdSZW5kZXJlcjInKSxcbiAgICAgICAgICAgIHNvdXJjZUZpbGUpKTtcblxuICAgIC8vIENoYW5nZSB0aGUgbWV0aG9kIHBhcmFtZXRlciBhbmQgcHJvcGVydHkgdHlwZXMgdG8gYFJlbmRlcmVyMmAuXG4gICAgdHlwZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9IG5vZGUudHlwZTtcblxuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgdXBkYXRlLnJlbW92ZSh0eXBlLmdldFN0YXJ0KCksIHR5cGUuZ2V0V2lkdGgoKSk7XG4gICAgICAgIHVwZGF0ZS5pbnNlcnRSaWdodCh0eXBlLmdldFN0YXJ0KCksICdSZW5kZXJlcjInKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENoYW5nZSBhbGwgaWRlbnRpZmllcnMgaW5zaWRlIGBmb3J3YXJkUmVmYCByZWZlcnJpbmcgdG8gdGhlIGBSZW5kZXJlcmAuXG4gICAgZm9yd2FyZFJlZnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIHVwZGF0ZS5yZW1vdmUoaWRlbnRpZmllci5nZXRTdGFydCgpLCBpZGVudGlmaWVyLmdldFdpZHRoKCkpO1xuICAgICAgdXBkYXRlLmluc2VydFJpZ2h0KGlkZW50aWZpZXIuZ2V0U3RhcnQoKSwgJ1JlbmRlcmVyMicpO1xuICAgIH0pO1xuXG4gICAgLy8gTWlncmF0ZSBhbGwgb2YgdGhlIG1ldGhvZCBjYWxscy5cbiAgICBtZXRob2RDYWxscy5mb3JFYWNoKGNhbGwgPT4ge1xuICAgICAgY29uc3Qge25vZGUsIHJlcXVpcmVkSGVscGVyc30gPSBtaWdyYXRlRXhwcmVzc2lvbihjYWxsLCB0eXBlQ2hlY2tlcik7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIC8vIElmIHdlIG1pZ3JhdGVkIHRoZSBub2RlIHRvIGEgbmV3IGV4cHJlc3Npb24sIHJlcGxhY2Ugb25seSB0aGUgY2FsbCBleHByZXNzaW9uLlxuICAgICAgICB1cGRhdGUucmVtb3ZlKGNhbGwuZ2V0U3RhcnQoKSwgY2FsbC5nZXRXaWR0aCgpKTtcbiAgICAgICAgdXBkYXRlLmluc2VydFJpZ2h0KFxuICAgICAgICAgICAgY2FsbC5nZXRTdGFydCgpLCBwcmludGVyLnByaW50Tm9kZSh0cy5FbWl0SGludC5VbnNwZWNpZmllZCwgbm9kZSwgc291cmNlRmlsZSkpO1xuICAgICAgfSBlbHNlIGlmIChjYWxsLnBhcmVudCAmJiB0cy5pc0V4cHJlc3Npb25TdGF0ZW1lbnQoY2FsbC5wYXJlbnQpKSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSBpZiB0aGUgY2FsbCBpcyBpbnNpZGUgYW4gZXhwcmVzc2lvbiBzdGF0ZW1lbnQsIGRyb3AgdGhlIGVudGlyZSBzdGF0ZW1lbnQuXG4gICAgICAgIC8vIFRoaXMgdGFrZXMgY2FyZSBvZiBhbnkgdHJhaWxpbmcgc2VtaWNvbG9ucy4gV2Ugb25seSBuZWVkIHRvIGRyb3Agbm9kZXMgZm9yIGNhc2VzIGxpa2VcbiAgICAgICAgLy8gYHNldEJpbmRpbmdEZWJ1Z0luZm9gIHdoaWNoIGhhdmUgYmVlbiBub29wIGZvciBhIHdoaWxlIHNvIHRoZXkgY2FuIGJlIHJlbW92ZWQgc2FmZWx5LlxuICAgICAgICB1cGRhdGUucmVtb3ZlKGNhbGwucGFyZW50LmdldFN0YXJ0KCksIGNhbGwucGFyZW50LmdldFdpZHRoKCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVxdWlyZWRIZWxwZXJzKSB7XG4gICAgICAgIHJlcXVpcmVkSGVscGVycy5mb3JFYWNoKGhlbHBlck5hbWUgPT4gaGVscGVyc1RvQWRkLmFkZChoZWxwZXJOYW1lKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTb21lIG9mIHRoZSBtZXRob2RzIGNhbid0IGJlIG1hcHBlZCBkaXJlY3RseSB0byBgUmVuZGVyZXIyYCBhbmQgbmVlZCBleHRyYSBsb2dpYyBhcm91bmQgdGhlbS5cbiAgICAvLyBUaGUgc2FmZXN0IHdheSB0byBkbyBzbyBpcyB0byBkZWNsYXJlIGhlbHBlciBmdW5jdGlvbnMgc2ltaWxhciB0byB0aGUgb25lcyBlbWl0dGVkIGJ5IFRTXG4gICAgLy8gd2hpY2ggZW5jYXBzdWxhdGUgdGhlIGV4dHJhIFwiZ2x1ZVwiIGxvZ2ljLiBXZSBzaG91bGQgb25seSBlbWl0IHRoZXNlIGZ1bmN0aW9ucyBvbmNlIHBlciBmaWxlLlxuICAgIGhlbHBlcnNUb0FkZC5mb3JFYWNoKGhlbHBlck5hbWUgPT4ge1xuICAgICAgdXBkYXRlLmluc2VydExlZnQoXG4gICAgICAgICAgc291cmNlRmlsZS5lbmRPZkZpbGVUb2tlbi5nZXRTdGFydCgpLCBnZXRIZWxwZXIoaGVscGVyTmFtZSwgc291cmNlRmlsZSwgcHJpbnRlcikpO1xuICAgIH0pO1xuXG4gICAgdHJlZS5jb21taXRVcGRhdGUodXBkYXRlKTtcbiAgfSk7XG59XG4iXX0=