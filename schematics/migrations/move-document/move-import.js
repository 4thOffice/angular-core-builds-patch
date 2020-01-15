(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/move-document/move-import", ["require", "exports", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const ts = require("typescript");
    function removeFromImport(importNode, sourceFile, importName) {
        const printer = ts.createPrinter();
        const elements = importNode.elements.filter(el => String((el.propertyName || el.name).escapedText) !== importName);
        if (!elements.length) {
            return '';
        }
        const oldDeclaration = importNode.parent.parent;
        const newImport = ts.createNamedImports(elements);
        const importClause = ts.createImportClause(undefined, newImport);
        const newDeclaration = ts.createImportDeclaration(undefined, undefined, importClause, oldDeclaration.moduleSpecifier);
        return printer.printNode(ts.EmitHint.Unspecified, newDeclaration, sourceFile);
    }
    exports.removeFromImport = removeFromImport;
    function addToImport(importNode, sourceFile, name, propertyName) {
        const printer = ts.createPrinter();
        const propertyNameIdentifier = propertyName ? ts.createIdentifier(String(propertyName.escapedText)) : undefined;
        const nameIdentifier = ts.createIdentifier(String(name.escapedText));
        const newSpecfier = ts.createImportSpecifier(propertyNameIdentifier, nameIdentifier);
        const elements = [...importNode.elements];
        elements.push(newSpecfier);
        const oldDeclaration = importNode.parent.parent;
        const newImport = ts.createNamedImports(elements);
        const importClause = ts.createImportClause(undefined, newImport);
        const newDeclaration = ts.createImportDeclaration(undefined, undefined, importClause, oldDeclaration.moduleSpecifier);
        return printer.printNode(ts.EmitHint.Unspecified, newDeclaration, sourceFile);
    }
    exports.addToImport = addToImport;
    function createImport(importSource, sourceFile, name, propertyName) {
        const printer = ts.createPrinter();
        const propertyNameIdentifier = propertyName ? ts.createIdentifier(String(propertyName.escapedText)) : undefined;
        const nameIdentifier = ts.createIdentifier(String(name.escapedText));
        const newSpecfier = ts.createImportSpecifier(propertyNameIdentifier, nameIdentifier);
        const newNamedImports = ts.createNamedImports([newSpecfier]);
        const importClause = ts.createImportClause(undefined, newNamedImports);
        const moduleSpecifier = ts.createStringLiteral(importSource);
        const newImport = ts.createImportDeclaration(undefined, undefined, importClause, moduleSpecifier);
        return printer.printNode(ts.EmitHint.Unspecified, newImport, sourceFile);
    }
    exports.createImport = createImport;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS1pbXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvbWlncmF0aW9ucy9tb3ZlLWRvY3VtZW50L21vdmUtaW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsaUNBQWlDO0lBRWpDLFNBQWdCLGdCQUFnQixDQUM1QixVQUEyQixFQUFFLFVBQXlCLEVBQUUsVUFBa0I7UUFDNUUsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUN2QyxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQzdDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV4RSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFqQkQsNENBaUJDO0lBRUQsU0FBZ0IsV0FBVyxDQUN2QixVQUEyQixFQUFFLFVBQXlCLEVBQUUsSUFBbUIsRUFDM0UsWUFBNEI7UUFDOUIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sc0JBQXNCLEdBQ3hCLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3JGLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUzQixNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRSxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQzdDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV4RSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFuQkQsa0NBbUJDO0lBRUQsU0FBZ0IsWUFBWSxDQUN4QixZQUFvQixFQUFFLFVBQXlCLEVBQUUsSUFBbUIsRUFDcEUsWUFBNEI7UUFDOUIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLE1BQU0sc0JBQXNCLEdBQ3hCLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3JGLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckUsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN2RSxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWxHLE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQWRELG9DQWNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGcm9tSW1wb3J0KFxuICAgIGltcG9ydE5vZGU6IHRzLk5hbWVkSW1wb3J0cywgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgaW1wb3J0TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcHJpbnRlciA9IHRzLmNyZWF0ZVByaW50ZXIoKTtcbiAgY29uc3QgZWxlbWVudHMgPSBpbXBvcnROb2RlLmVsZW1lbnRzLmZpbHRlcihcbiAgICAgIGVsID0+IFN0cmluZygoZWwucHJvcGVydHlOYW1lIHx8IGVsLm5hbWUpLmVzY2FwZWRUZXh0KSAhPT0gaW1wb3J0TmFtZSk7XG5cbiAgaWYgKCFlbGVtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBjb25zdCBvbGREZWNsYXJhdGlvbiA9IGltcG9ydE5vZGUucGFyZW50LnBhcmVudDtcbiAgY29uc3QgbmV3SW1wb3J0ID0gdHMuY3JlYXRlTmFtZWRJbXBvcnRzKGVsZW1lbnRzKTtcbiAgY29uc3QgaW1wb3J0Q2xhdXNlID0gdHMuY3JlYXRlSW1wb3J0Q2xhdXNlKHVuZGVmaW5lZCwgbmV3SW1wb3J0KTtcbiAgY29uc3QgbmV3RGVjbGFyYXRpb24gPSB0cy5jcmVhdGVJbXBvcnREZWNsYXJhdGlvbihcbiAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBpbXBvcnRDbGF1c2UsIG9sZERlY2xhcmF0aW9uLm1vZHVsZVNwZWNpZmllcik7XG5cbiAgcmV0dXJuIHByaW50ZXIucHJpbnROb2RlKHRzLkVtaXRIaW50LlVuc3BlY2lmaWVkLCBuZXdEZWNsYXJhdGlvbiwgc291cmNlRmlsZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0ltcG9ydChcbiAgICBpbXBvcnROb2RlOiB0cy5OYW1lZEltcG9ydHMsIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIG5hbWU6IHRzLklkZW50aWZpZXIsXG4gICAgcHJvcGVydHlOYW1lPzogdHMuSWRlbnRpZmllcik6IHN0cmluZyB7XG4gIGNvbnN0IHByaW50ZXIgPSB0cy5jcmVhdGVQcmludGVyKCk7XG4gIGNvbnN0IHByb3BlcnR5TmFtZUlkZW50aWZpZXIgPVxuICAgICAgcHJvcGVydHlOYW1lID8gdHMuY3JlYXRlSWRlbnRpZmllcihTdHJpbmcocHJvcGVydHlOYW1lLmVzY2FwZWRUZXh0KSkgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG5hbWVJZGVudGlmaWVyID0gdHMuY3JlYXRlSWRlbnRpZmllcihTdHJpbmcobmFtZS5lc2NhcGVkVGV4dCkpO1xuICBjb25zdCBuZXdTcGVjZmllciA9IHRzLmNyZWF0ZUltcG9ydFNwZWNpZmllcihwcm9wZXJ0eU5hbWVJZGVudGlmaWVyLCBuYW1lSWRlbnRpZmllcik7XG4gIGNvbnN0IGVsZW1lbnRzID0gWy4uLmltcG9ydE5vZGUuZWxlbWVudHNdO1xuXG4gIGVsZW1lbnRzLnB1c2gobmV3U3BlY2ZpZXIpO1xuXG4gIGNvbnN0IG9sZERlY2xhcmF0aW9uID0gaW1wb3J0Tm9kZS5wYXJlbnQucGFyZW50O1xuICBjb25zdCBuZXdJbXBvcnQgPSB0cy5jcmVhdGVOYW1lZEltcG9ydHMoZWxlbWVudHMpO1xuICBjb25zdCBpbXBvcnRDbGF1c2UgPSB0cy5jcmVhdGVJbXBvcnRDbGF1c2UodW5kZWZpbmVkLCBuZXdJbXBvcnQpO1xuICBjb25zdCBuZXdEZWNsYXJhdGlvbiA9IHRzLmNyZWF0ZUltcG9ydERlY2xhcmF0aW9uKFxuICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGltcG9ydENsYXVzZSwgb2xkRGVjbGFyYXRpb24ubW9kdWxlU3BlY2lmaWVyKTtcblxuICByZXR1cm4gcHJpbnRlci5wcmludE5vZGUodHMuRW1pdEhpbnQuVW5zcGVjaWZpZWQsIG5ld0RlY2xhcmF0aW9uLCBzb3VyY2VGaWxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUltcG9ydChcbiAgICBpbXBvcnRTb3VyY2U6IHN0cmluZywgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgbmFtZTogdHMuSWRlbnRpZmllcixcbiAgICBwcm9wZXJ0eU5hbWU/OiB0cy5JZGVudGlmaWVyKSB7XG4gIGNvbnN0IHByaW50ZXIgPSB0cy5jcmVhdGVQcmludGVyKCk7XG4gIGNvbnN0IHByb3BlcnR5TmFtZUlkZW50aWZpZXIgPVxuICAgICAgcHJvcGVydHlOYW1lID8gdHMuY3JlYXRlSWRlbnRpZmllcihTdHJpbmcocHJvcGVydHlOYW1lLmVzY2FwZWRUZXh0KSkgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG5hbWVJZGVudGlmaWVyID0gdHMuY3JlYXRlSWRlbnRpZmllcihTdHJpbmcobmFtZS5lc2NhcGVkVGV4dCkpO1xuICBjb25zdCBuZXdTcGVjZmllciA9IHRzLmNyZWF0ZUltcG9ydFNwZWNpZmllcihwcm9wZXJ0eU5hbWVJZGVudGlmaWVyLCBuYW1lSWRlbnRpZmllcik7XG4gIGNvbnN0IG5ld05hbWVkSW1wb3J0cyA9IHRzLmNyZWF0ZU5hbWVkSW1wb3J0cyhbbmV3U3BlY2ZpZXJdKTtcbiAgY29uc3QgaW1wb3J0Q2xhdXNlID0gdHMuY3JlYXRlSW1wb3J0Q2xhdXNlKHVuZGVmaW5lZCwgbmV3TmFtZWRJbXBvcnRzKTtcbiAgY29uc3QgbW9kdWxlU3BlY2lmaWVyID0gdHMuY3JlYXRlU3RyaW5nTGl0ZXJhbChpbXBvcnRTb3VyY2UpO1xuICBjb25zdCBuZXdJbXBvcnQgPSB0cy5jcmVhdGVJbXBvcnREZWNsYXJhdGlvbih1bmRlZmluZWQsIHVuZGVmaW5lZCwgaW1wb3J0Q2xhdXNlLCBtb2R1bGVTcGVjaWZpZXIpO1xuXG4gIHJldHVybiBwcmludGVyLnByaW50Tm9kZSh0cy5FbWl0SGludC5VbnNwZWNpZmllZCwgbmV3SW1wb3J0LCBzb3VyY2VGaWxlKTtcbn1cbiJdfQ==