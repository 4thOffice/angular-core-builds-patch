/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/utils/import_manager", ["require", "exports", "path", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportManager = void 0;
    const path_1 = require("path");
    const typescript_1 = __importDefault(require("typescript"));
    const PARSED_TS_VERSION = parseFloat(typescript_1.default.versionMajorMinor);
    /**
     * Import manager that can be used to add TypeScript imports to given source
     * files. The manager ensures that multiple transformations are applied properly
     * without shifted offsets and that similar existing import declarations are re-used.
     */
    class ImportManager {
        constructor(getUpdateRecorder, printer) {
            this.getUpdateRecorder = getUpdateRecorder;
            this.printer = printer;
            /** Map of import declarations that need to be updated to include the given symbols. */
            this.updatedImports = new Map();
            /** Map of source-files and their previously used identifier names. */
            this.usedIdentifierNames = new Map();
            /**
             * Array of previously resolved symbol imports. Cache can be re-used to return
             * the same identifier without checking the source-file again.
             */
            this.importCache = [];
        }
        /**
         * Adds an import to the given source-file and returns the TypeScript
         * identifier that can be used to access the newly imported symbol.
         */
        addImportToSourceFile(sourceFile, symbolName, moduleName, typeImport = false) {
            const sourceDir = (0, path_1.dirname)(sourceFile.fileName);
            let importStartIndex = 0;
            let existingImport = null;
            // In case the given import has been already generated previously, we just return
            // the previous generated identifier in order to avoid duplicate generated imports.
            const cachedImport = this.importCache.find(c => c.sourceFile === sourceFile && c.symbolName === symbolName &&
                c.moduleName === moduleName);
            if (cachedImport) {
                return cachedImport.identifier;
            }
            // Walk through all source-file top-level statements and search for import declarations
            // that already match the specified "moduleName" and can be updated to import the
            // given symbol. If no matching import can be found, the last import in the source-file
            // will be used as starting point for a new import that will be generated.
            for (let i = sourceFile.statements.length - 1; i >= 0; i--) {
                const statement = sourceFile.statements[i];
                if (!typescript_1.default.isImportDeclaration(statement) || !typescript_1.default.isStringLiteral(statement.moduleSpecifier) ||
                    !statement.importClause) {
                    continue;
                }
                if (importStartIndex === 0) {
                    importStartIndex = this._getEndPositionOfNode(statement);
                }
                const moduleSpecifier = statement.moduleSpecifier.text;
                if (moduleSpecifier.startsWith('.') &&
                    (0, path_1.resolve)(sourceDir, moduleSpecifier) !== (0, path_1.resolve)(sourceDir, moduleName) ||
                    moduleSpecifier !== moduleName) {
                    continue;
                }
                if (statement.importClause.namedBindings) {
                    const namedBindings = statement.importClause.namedBindings;
                    // In case a "Type" symbol is imported, we can't use namespace imports
                    // because these only export symbols available at runtime (no types)
                    if (typescript_1.default.isNamespaceImport(namedBindings) && !typeImport) {
                        return typescript_1.default.factory.createPropertyAccessExpression(typescript_1.default.factory.createIdentifier(namedBindings.name.text), typescript_1.default.factory.createIdentifier(symbolName || 'default'));
                    }
                    else if (typescript_1.default.isNamedImports(namedBindings) && symbolName) {
                        const existingElement = namedBindings.elements.find(e => e.propertyName ? e.propertyName.text === symbolName : e.name.text === symbolName);
                        if (existingElement) {
                            return typescript_1.default.factory.createIdentifier(existingElement.name.text);
                        }
                        // In case the symbol could not be found in an existing import, we
                        // keep track of the import declaration as it can be updated to include
                        // the specified symbol name without having to create a new import.
                        existingImport = statement;
                    }
                }
                else if (statement.importClause.name && !symbolName) {
                    return typescript_1.default.factory.createIdentifier(statement.importClause.name.text);
                }
            }
            if (existingImport) {
                const propertyIdentifier = typescript_1.default.factory.createIdentifier(symbolName);
                const generatedUniqueIdentifier = this._getUniqueIdentifier(sourceFile, symbolName);
                const needsGeneratedUniqueName = generatedUniqueIdentifier.text !== symbolName;
                const importName = needsGeneratedUniqueName ? generatedUniqueIdentifier : propertyIdentifier;
                // Since it can happen that multiple classes need to be imported within the
                // specified source file and we want to add the identifiers to the existing
                // import declaration, we need to keep track of the updated import declarations.
                // We can't directly update the import declaration for each identifier as this
                // would throw off the recorder offsets. We need to keep track of the new identifiers
                // for the import and perform the import transformation as batches per source-file.
                this.updatedImports.set(existingImport, (this.updatedImports.get(existingImport) || []).concat({
                    propertyName: needsGeneratedUniqueName ? propertyIdentifier : undefined,
                    importName: importName,
                }));
                // Keep track of all updated imports so that we don't generate duplicate
                // similar imports as these can't be statically analyzed in the source-file yet.
                this.importCache.push({ sourceFile, moduleName, symbolName, identifier: importName });
                return importName;
            }
            let identifier = null;
            let newImport = null;
            if (symbolName) {
                const propertyIdentifier = typescript_1.default.factory.createIdentifier(symbolName);
                const generatedUniqueIdentifier = this._getUniqueIdentifier(sourceFile, symbolName);
                const needsGeneratedUniqueName = generatedUniqueIdentifier.text !== symbolName;
                identifier = needsGeneratedUniqueName ? generatedUniqueIdentifier : propertyIdentifier;
                newImport = typescript_1.default.factory.createImportDeclaration(undefined, undefined, typescript_1.default.factory.createImportClause(false, undefined, typescript_1.default.factory.createNamedImports([createImportSpecifier(needsGeneratedUniqueName ? propertyIdentifier : undefined, identifier)])), typescript_1.default.factory.createStringLiteral(moduleName));
            }
            else {
                identifier = this._getUniqueIdentifier(sourceFile, 'defaultExport');
                newImport = typescript_1.default.factory.createImportDeclaration(undefined, undefined, typescript_1.default.factory.createImportClause(false, identifier, undefined), typescript_1.default.factory.createStringLiteral(moduleName));
            }
            const newImportText = this.printer.printNode(typescript_1.default.EmitHint.Unspecified, newImport, sourceFile);
            // If the import is generated at the start of the source file, we want to add
            // a new-line after the import. Otherwise if the import is generated after an
            // existing import, we need to prepend a new-line so that the import is not on
            // the same line as the existing import anchor.
            this.getUpdateRecorder(sourceFile)
                .addNewImport(importStartIndex, importStartIndex === 0 ? `${newImportText}\n` : `\n${newImportText}`);
            // Keep track of all generated imports so that we don't generate duplicate
            // similar imports as these can't be statically analyzed in the source-file yet.
            this.importCache.push({ sourceFile, symbolName, moduleName, identifier });
            return identifier;
        }
        /**
         * Stores the collected import changes within the appropriate update recorders. The
         * updated imports can only be updated *once* per source-file because previous updates
         * could otherwise shift the source-file offsets.
         */
        recordChanges() {
            this.updatedImports.forEach((expressions, importDecl) => {
                const sourceFile = importDecl.getSourceFile();
                const recorder = this.getUpdateRecorder(sourceFile);
                const namedBindings = importDecl.importClause.namedBindings;
                const newNamedBindings = typescript_1.default.factory.updateNamedImports(namedBindings, namedBindings.elements.concat(expressions.map(({ propertyName, importName }) => createImportSpecifier(propertyName, importName))));
                const newNamedBindingsText = this.printer.printNode(typescript_1.default.EmitHint.Unspecified, newNamedBindings, sourceFile);
                recorder.updateExistingImport(namedBindings, newNamedBindingsText);
            });
        }
        /** Gets an unique identifier with a base name for the given source file. */
        _getUniqueIdentifier(sourceFile, baseName) {
            if (this.isUniqueIdentifierName(sourceFile, baseName)) {
                this._recordUsedIdentifier(sourceFile, baseName);
                return typescript_1.default.factory.createIdentifier(baseName);
            }
            let name = null;
            let counter = 1;
            do {
                name = `${baseName}_${counter++}`;
            } while (!this.isUniqueIdentifierName(sourceFile, name));
            this._recordUsedIdentifier(sourceFile, name);
            return typescript_1.default.factory.createIdentifier(name);
        }
        /**
         * Checks whether the specified identifier name is used within the given
         * source file.
         */
        isUniqueIdentifierName(sourceFile, name) {
            if (this.usedIdentifierNames.has(sourceFile) &&
                this.usedIdentifierNames.get(sourceFile).indexOf(name) !== -1) {
                return false;
            }
            // Walk through the source file and search for an identifier matching
            // the given name. In that case, it's not guaranteed that this name
            // is unique in the given declaration scope and we just return false.
            const nodeQueue = [sourceFile];
            while (nodeQueue.length) {
                const node = nodeQueue.shift();
                if (typescript_1.default.isIdentifier(node) && node.text === name) {
                    return false;
                }
                nodeQueue.push(...node.getChildren());
            }
            return true;
        }
        _recordUsedIdentifier(sourceFile, identifierName) {
            this.usedIdentifierNames.set(sourceFile, (this.usedIdentifierNames.get(sourceFile) || []).concat(identifierName));
        }
        /**
         * Determines the full end of a given node. By default the end position of a node is
         * before all trailing comments. This could mean that generated imports shift comments.
         */
        _getEndPositionOfNode(node) {
            const nodeEndPos = node.getEnd();
            const commentRanges = typescript_1.default.getTrailingCommentRanges(node.getSourceFile().text, nodeEndPos);
            if (!commentRanges || !commentRanges.length) {
                return nodeEndPos;
            }
            return commentRanges[commentRanges.length - 1].end;
        }
    }
    exports.ImportManager = ImportManager;
    /**
     * Backwards-compatible version of `ts.createImportSpecifier`
     * to handle a breaking change between 4.4 and 4.5.
     */
    function createImportSpecifier(propertyName, name, isTypeOnly = false) {
        return PARSED_TS_VERSION > 4.4 ?
            typescript_1.default.factory.createImportSpecifier(isTypeOnly, propertyName, name) :
            // TODO(crisbeto): backwards-compatibility layer for TS 4.4.
            // Should be cleaned up when we drop support for it.
            typescript_1.default.createImportSpecifier(propertyName, name);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0X21hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvdXRpbHMvaW1wb3J0X21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7O0lBRUgsK0JBQXNDO0lBQ3RDLDREQUE0QjtJQUU1QixNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxvQkFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFRM0Q7Ozs7T0FJRztJQUNILE1BQWEsYUFBYTtRQWlCeEIsWUFDWSxpQkFBcUUsRUFDckUsT0FBbUI7WUFEbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFvRDtZQUNyRSxZQUFPLEdBQVAsT0FBTyxDQUFZO1lBbEIvQix1RkFBdUY7WUFDL0UsbUJBQWMsR0FDbEIsSUFBSSxHQUFHLEVBQXFGLENBQUM7WUFDakcsc0VBQXNFO1lBQzlELHdCQUFtQixHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO1lBQ2pFOzs7ZUFHRztZQUNLLGdCQUFXLEdBS2IsRUFBRSxDQUFDO1FBSXlCLENBQUM7UUFFbkM7OztXQUdHO1FBQ0gscUJBQXFCLENBQ2pCLFVBQXlCLEVBQUUsVUFBdUIsRUFBRSxVQUFrQixFQUN0RSxVQUFVLEdBQUcsS0FBSztZQUNwQixNQUFNLFNBQVMsR0FBRyxJQUFBLGNBQU8sRUFBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxjQUFjLEdBQThCLElBQUksQ0FBQztZQUVyRCxpRkFBaUY7WUFDakYsbUZBQW1GO1lBQ25GLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUN0QyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxVQUFV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QUFtQixFQUMxRCxVQUFVLEdBQUcsS0FBSztRQUNwQixPQUFPLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLG9CQUFFLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsRSw0REFBNEQ7WUFDNUQsb0RBQW9EO1lBQ25ELG9CQUFFLENBQUMscUJBQTZCLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtkaXJuYW1lLCByZXNvbHZlfSBmcm9tICdwYXRoJztcbmltcG9ydCB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuY29uc3QgUEFSU0VEX1RTX1ZFUlNJT04gPSBwYXJzZUZsb2F0KHRzLnZlcnNpb25NYWpvck1pbm9yKTtcblxuLyoqIFVwZGF0ZSByZWNvcmRlciBmb3IgbWFuYWdpbmcgaW1wb3J0cy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW1wb3J0TWFuYWdlclVwZGF0ZVJlY29yZGVyIHtcbiAgYWRkTmV3SW1wb3J0KHN0YXJ0OiBudW1iZXIsIGltcG9ydFRleHQ6IHN0cmluZyk6IHZvaWQ7XG4gIHVwZGF0ZUV4aXN0aW5nSW1wb3J0KG5hbWVkQmluZGluZ3M6IHRzLk5hbWVkSW1wb3J0cywgbmV3TmFtZWRCaW5kaW5nczogc3RyaW5nKTogdm9pZDtcbn1cblxuLyoqXG4gKiBJbXBvcnQgbWFuYWdlciB0aGF0IGNhbiBiZSB1c2VkIHRvIGFkZCBUeXBlU2NyaXB0IGltcG9ydHMgdG8gZ2l2ZW4gc291cmNlXG4gKiBmaWxlcy4gVGhlIG1hbmFnZXIgZW5zdXJlcyB0aGF0IG11bHRpcGxlIHRyYW5zZm9ybWF0aW9ucyBhcmUgYXBwbGllZCBwcm9wZXJseVxuICogd2l0aG91dCBzaGlmdGVkIG9mZnNldHMgYW5kIHRoYXQgc2ltaWxhciBleGlzdGluZyBpbXBvcnQgZGVjbGFyYXRpb25zIGFyZSByZS11c2VkLlxuICovXG5leHBvcnQgY2xhc3MgSW1wb3J0TWFuYWdlciB7XG4gIC8qKiBNYXAgb2YgaW1wb3J0IGRlY2xhcmF0aW9ucyB0aGF0IG5lZWQgdG8gYmUgdXBkYXRlZCB0byBpbmNsdWRlIHRoZSBnaXZlbiBzeW1ib2xzLiAqL1xuICBwcml2YXRlIHVwZGF0ZWRJbXBvcnRzID1cbiAgICAgIG5ldyBNYXA8dHMuSW1wb3J0RGVjbGFyYXRpb24sIHtwcm9wZXJ0eU5hbWU/OiB0cy5JZGVudGlmaWVyLCBpbXBvcnROYW1lOiB0cy5JZGVudGlmaWVyfVtdPigpO1xuICAvKiogTWFwIG9mIHNvdXJjZS1maWxlcyBhbmQgdGhlaXIgcHJldmlvdXNseSB1c2VkIGlkZW50aWZpZXIgbmFtZXMuICovXG4gIHByaXZhdGUgdXNlZElkZW50aWZpZXJOYW1lcyA9IG5ldyBNYXA8dHMuU291cmNlRmlsZSwgc3RyaW5nW10+KCk7XG4gIC8qKlxuICAgKiBBcnJheSBvZiBwcmV2aW91c2x5IHJlc29sdmVkIHN5bWJvbCBpbXBvcnRzLiBDYWNoZSBjYW4gYmUgcmUtdXNlZCB0byByZXR1cm5cbiAgICogdGhlIHNhbWUgaWRlbnRpZmllciB3aXRob3V0IGNoZWNraW5nIHRoZSBzb3VyY2UtZmlsZSBhZ2Fpbi5cbiAgICovXG4gIHByaXZhdGUgaW1wb3J0Q2FjaGU6IHtcbiAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICAgIHN5bWJvbE5hbWU6IHN0cmluZ3xudWxsLFxuICAgIG1vZHVsZU5hbWU6IHN0cmluZyxcbiAgICBpZGVudGlmaWVyOiB0cy5JZGVudGlmaWVyXG4gIH1bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBnZXRVcGRhdGVSZWNvcmRlcjogKHNmOiB0cy5Tb3VyY2VGaWxlKSA9PiBJbXBvcnRNYW5hZ2VyVXBkYXRlUmVjb3JkZXIsXG4gICAgICBwcml2YXRlIHByaW50ZXI6IHRzLlByaW50ZXIpIHt9XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gaW1wb3J0IHRvIHRoZSBnaXZlbiBzb3VyY2UtZmlsZSBhbmQgcmV0dXJucyB0aGUgVHlwZVNjcmlwdFxuICAgKiBpZGVudGlmaWVyIHRoYXQgY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSBuZXdseSBpbXBvcnRlZCBzeW1ib2wuXG4gICAqL1xuICBhZGRJbXBvcnRUb1NvdXJjZUZpbGUoXG4gICAgICBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLCBzeW1ib2xOYW1lOiBzdHJpbmd8bnVsbCwgbW9kdWxlTmFtZTogc3RyaW5nLFxuICAgICAgdHlwZUltcG9ydCA9IGZhbHNlKTogdHMuRXhwcmVzc2lvbiB7XG4gICAgY29uc3Qgc291cmNlRGlyID0gZGlybmFtZShzb3VyY2VGaWxlLmZpbGVOYW1lKTtcbiAgICBsZXQgaW1wb3J0U3RhcnRJbmRleCA9IDA7XG4gICAgbGV0IGV4aXN0aW5nSW1wb3J0OiB0cy5JbXBvcnREZWNsYXJhdGlvbnxudWxsID0gbnVsbDtcblxuICAgIC8vIEluIGNhc2UgdGhlIGdpdmVuIGltcG9ydCBoYXMgYmVlbiBhbHJlYWR5IGdlbmVyYXRlZCBwcmV2aW91c2x5LCB3ZSBqdXN0IHJldHVyblxuICAgIC8vIHRoZSBwcmV2aW91cyBnZW5lcmF0ZWQgaWRlbnRpZmllciBpbiBvcmRlciB0byBhdm9pZCBkdXBsaWNhdGUgZ2VuZXJhdGVkIGltcG9ydHMuXG4gICAgY29uc3QgY2FjaGVkSW1wb3J0ID0gdGhpcy5pbXBvcnRDYWNoZS5maW5kKFxuICAgICAgICBjID0+IGMuc291cmNlRmlsZSA9PT0gc291cmNlRmlsZSAmJiBjLnN5bWJvbE5hbWUgPT09IHN5bWJvbE5hbWUgJiZcbiAgICAgICAgICAgIGMubW9kdWxlTmFtZSA9PT0gbW9kdWxlTmFtZSk7XG4gICAgaWYgKGNhY2hlZEltcG9ydCkge1xuICAgICAgcmV0dXJuIGNhY2hlZEltcG9ydC5pZGVudGlmaWVyO1xuICAgIH1cblxuICAgIC8vIFdhbGsgdGhyb3VnaCBhbGwgc291cmNlLWZpbGUgdG9wLWxldmVsIHN0YXRlbWVudHMgYW5kIHNlYXJjaCBmb3IgaW1wb3J0IGRlY2xhcmF0aW9uc1xuICAgIC8vIHRoYXQgYWxyZWFkeSBtYXRjaCB0aGUgc3BlY2lmaWVkIFwibW9kdWxlTmFtZVwiIGFuZCBjYW4gYmUgdXBkYXRlZCB0byBpbXBvcnQgdGhlXG4gICAgLy8gZ2l2ZW4gc3ltYm9sLiBJZiBubyBtYXRjaGluZyBpbXBvcnQgY2FuIGJlIGZvdW5kLCB0aGUgbGFzdCBpbXBvcnQgaW4gdGhlIHNvdXJjZS1maWxlXG4gICAgLy8gd2lsbCBiZSB1c2VkIGFzIHN0YXJ0aW5nIHBvaW50IGZvciBhIG5ldyBpbXBvcnQgdGhhdCB3aWxsIGJlIGdlbmVyYXRlZC5cbiAgICBmb3IgKGxldCBpID0gc291cmNlRmlsZS5zdGF0ZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBjb25zdCBzdGF0ZW1lbnQgPSBzb3VyY2VGaWxlLnN0YXRlbWVudHNbaV07XG5cbiAgICAgIGlmICghdHMuaXNJbXBvcnREZWNsYXJhdGlvbihzdGF0ZW1lbnQpIHx8ICF0cy5pc1N0cmluZ0xpdGVyYWwoc3RhdGVtZW50Lm1vZHVsZVNwZWNpZmllcikgfHxcbiAgICAgICAgICAhc3RhdGVtZW50LmltcG9ydENsYXVzZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGltcG9ydFN0YXJ0SW5kZXggPT09IDApIHtcbiAgICAgICAgaW1wb3J0U3RhcnRJbmRleCA9IHRoaXMuX2dldEVuZFBvc2l0aW9uT2ZOb2RlKHN0YXRlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1vZHVsZVNwZWNpZmllciA9IHN0YXRlbWVudC5tb2R1bGVTcGVjaWZpZXIudGV4dDtcblxuICAgICAgaWYgKG1vZHVsZVNwZWNpZmllci5zdGFydHNXaXRoKCcuJykgJiZcbiAgICAgICAgICAgICAgcmVzb2x2ZShzb3VyY2VEaXIsIG1vZHVsZVNwZWNpZmllcikgIT09IHJlc29sdmUoc291cmNlRGlyLCBtb2R1bGVOYW1lKSB8fFxuICAgICAgICAgIG1vZHVsZVNwZWNpZmllciAhPT0gbW9kdWxlTmFtZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlbWVudC5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncykge1xuICAgICAgICBjb25zdCBuYW1lZEJpbmRpbmdzID0gc3RhdGVtZW50LmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzO1xuXG4gICAgICAgIC8vIEluIGNhc2UgYSBcIlR5cGVcIiBzeW1ib2wgaXMgaW1wb3J0ZWQsIHdlIGNhbid0IHVzZSBuYW1lc3BhY2UgaW1wb3J0c1xuICAgICAgICAvLyBiZWNhdXNlIHRoZXNlIG9ubHkgZXhwb3J0IHN5bWJvbHMgYXZhaWxhYmxlIGF0IHJ1bnRpbWUgKG5vIHR5cGVzKVxuICAgICAgICBpZiAodHMuaXNOYW1lc3BhY2VJbXBvcnQobmFtZWRCaW5kaW5ncykgJiYgIXR5cGVJbXBvcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHMuZmFjdG9yeS5jcmVhdGVQcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24oXG4gICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihuYW1lZEJpbmRpbmdzLm5hbWUudGV4dCksXG4gICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihzeW1ib2xOYW1lIHx8ICdkZWZhdWx0JykpO1xuICAgICAgICB9IGVsc2UgaWYgKHRzLmlzTmFtZWRJbXBvcnRzKG5hbWVkQmluZGluZ3MpICYmIHN5bWJvbE5hbWUpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ0VsZW1lbnQgPSBuYW1lZEJpbmRpbmdzLmVsZW1lbnRzLmZpbmQoXG4gICAgICAgICAgICAgIGUgPT5cbiAgICAgICAgICAgICAgICAgIGUucHJvcGVydHlOYW1lID8gZS5wcm9wZXJ0eU5hbWUudGV4dCA9PT0gc3ltYm9sTmFtZSA6IGUubmFtZS50ZXh0ID09PSBzeW1ib2xOYW1lKTtcblxuICAgICAgICAgIGlmIChleGlzdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cy5mYWN0b3J5LmNyZWF0ZUlkZW50aWZpZXIoZXhpc3RpbmdFbGVtZW50Lm5hbWUudGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSW4gY2FzZSB0aGUgc3ltYm9sIGNvdWxkIG5vdCBiZSBmb3VuZCBpbiBhbiBleGlzdGluZyBpbXBvcnQsIHdlXG4gICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgaW1wb3J0IGRlY2xhcmF0aW9uIGFzIGl0IGNhbiBiZSB1cGRhdGVkIHRvIGluY2x1ZGVcbiAgICAgICAgICAvLyB0aGUgc3BlY2lmaWVkIHN5bWJvbCBuYW1lIHdpdGhvdXQgaGF2aW5nIHRvIGNyZWF0ZSBhIG5ldyBpbXBvcnQuXG4gICAgICAgICAgZXhpc3RpbmdJbXBvcnQgPSBzdGF0ZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RhdGVtZW50LmltcG9ydENsYXVzZS5uYW1lICYmICFzeW1ib2xOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cy5mYWN0b3J5LmNyZWF0ZUlkZW50aWZpZXIoc3RhdGVtZW50LmltcG9ydENsYXVzZS5uYW1lLnRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleGlzdGluZ0ltcG9ydCkge1xuICAgICAgY29uc3QgcHJvcGVydHlJZGVudGlmaWVyID0gdHMuZmFjdG9yeS5jcmVhdGVJZGVudGlmaWVyKHN5bWJvbE5hbWUhKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIgPSB0aGlzLl9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGUsIHN5bWJvbE5hbWUhKTtcbiAgICAgIGNvbnN0IG5lZWRzR2VuZXJhdGVkVW5pcXVlTmFtZSA9IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIudGV4dCAhPT0gc3ltYm9sTmFtZTtcbiAgICAgIGNvbnN0IGltcG9ydE5hbWUgPSBuZWVkc0dlbmVyYXRlZFVuaXF1ZU5hbWUgPyBnZW5lcmF0ZWRVbmlxdWVJZGVudGlmaWVyIDogcHJvcGVydHlJZGVudGlmaWVyO1xuXG4gICAgICAvLyBTaW5jZSBpdCBjYW4gaGFwcGVuIHRoYXQgbXVsdGlwbGUgY2xhc3NlcyBuZWVkIHRvIGJlIGltcG9ydGVkIHdpdGhpbiB0aGVcbiAgICAgIC8vIHNwZWNpZmllZCBzb3VyY2UgZmlsZSBhbmQgd2Ugd2FudCB0byBhZGQgdGhlIGlkZW50aWZpZXJzIHRvIHRoZSBleGlzdGluZ1xuICAgICAgLy8gaW1wb3J0IGRlY2xhcmF0aW9uLCB3ZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIHVwZGF0ZWQgaW1wb3J0IGRlY2xhcmF0aW9ucy5cbiAgICAgIC8vIFdlIGNhbid0IGRpcmVjdGx5IHVwZGF0ZSB0aGUgaW1wb3J0IGRlY2xhcmF0aW9uIGZvciBlYWNoIGlkZW50aWZpZXIgYXMgdGhpc1xuICAgICAgLy8gd291bGQgdGhyb3cgb2ZmIHRoZSByZWNvcmRlciBvZmZzZXRzLiBXZSBuZWVkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIG5ldyBpZGVudGlmaWVyc1xuICAgICAgLy8gZm9yIHRoZSBpbXBvcnQgYW5kIHBlcmZvcm0gdGhlIGltcG9ydCB0cmFuc2Zvcm1hdGlvbiBhcyBiYXRjaGVzIHBlciBzb3VyY2UtZmlsZS5cbiAgICAgIHRoaXMudXBkYXRlZEltcG9ydHMuc2V0KFxuICAgICAgICAgIGV4aXN0aW5nSW1wb3J0LCAodGhpcy51cGRhdGVkSW1wb3J0cy5nZXQoZXhpc3RpbmdJbXBvcnQpIHx8IFtdKS5jb25jYXQoe1xuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBuZWVkc0dlbmVyYXRlZFVuaXF1ZU5hbWUgPyBwcm9wZXJ0eUlkZW50aWZpZXIgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbXBvcnROYW1lOiBpbXBvcnROYW1lLFxuICAgICAgICAgIH0pKTtcblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgdXBkYXRlZCBpbXBvcnRzIHNvIHRoYXQgd2UgZG9uJ3QgZ2VuZXJhdGUgZHVwbGljYXRlXG4gICAgICAvLyBzaW1pbGFyIGltcG9ydHMgYXMgdGhlc2UgY2FuJ3QgYmUgc3RhdGljYWxseSBhbmFseXplZCBpbiB0aGUgc291cmNlLWZpbGUgeWV0LlxuICAgICAgdGhpcy5pbXBvcnRDYWNoZS5wdXNoKHtzb3VyY2VGaWxlLCBtb2R1bGVOYW1lLCBzeW1ib2xOYW1lLCBpZGVudGlmaWVyOiBpbXBvcnROYW1lfSk7XG5cbiAgICAgIHJldHVybiBpbXBvcnROYW1lO1xuICAgIH1cblxuICAgIGxldCBpZGVudGlmaWVyOiB0cy5JZGVudGlmaWVyfG51bGwgPSBudWxsO1xuICAgIGxldCBuZXdJbXBvcnQ6IHRzLkltcG9ydERlY2xhcmF0aW9ufG51bGwgPSBudWxsO1xuXG4gICAgaWYgKHN5bWJvbE5hbWUpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5SWRlbnRpZmllciA9IHRzLmZhY3RvcnkuY3JlYXRlSWRlbnRpZmllcihzeW1ib2xOYW1lKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIgPSB0aGlzLl9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGUsIHN5bWJvbE5hbWUpO1xuICAgICAgY29uc3QgbmVlZHNHZW5lcmF0ZWRVbmlxdWVOYW1lID0gZ2VuZXJhdGVkVW5pcXVlSWRlbnRpZmllci50ZXh0ICE9PSBzeW1ib2xOYW1lO1xuICAgICAgaWRlbnRpZmllciA9IG5lZWRzR2VuZXJhdGVkVW5pcXVlTmFtZSA/IGdlbmVyYXRlZFVuaXF1ZUlkZW50aWZpZXIgOiBwcm9wZXJ0eUlkZW50aWZpZXI7XG5cbiAgICAgIG5ld0ltcG9ydCA9IHRzLmZhY3RvcnkuY3JlYXRlSW1wb3J0RGVjbGFyYXRpb24oXG4gICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsXG4gICAgICAgICAgdHMuZmFjdG9yeS5jcmVhdGVJbXBvcnRDbGF1c2UoXG4gICAgICAgICAgICAgIGZhbHNlLCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlTmFtZWRJbXBvcnRzKFtjcmVhdGVJbXBvcnRTcGVjaWZpZXIoXG4gICAgICAgICAgICAgICAgICBuZWVkc0dlbmVyYXRlZFVuaXF1ZU5hbWUgPyBwcm9wZXJ0eUlkZW50aWZpZXIgOiB1bmRlZmluZWQsIGlkZW50aWZpZXIpXSkpLFxuICAgICAgICAgIHRzLmZhY3RvcnkuY3JlYXRlU3RyaW5nTGl0ZXJhbChtb2R1bGVOYW1lKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkZW50aWZpZXIgPSB0aGlzLl9nZXRVbmlxdWVJZGVudGlmaWVyKHNvdXJjZUZpbGUsICdkZWZhdWx0RXhwb3J0Jyk7XG4gICAgICBuZXdJbXBvcnQgPSB0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydERlY2xhcmF0aW9uKFxuICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydENsYXVzZShmYWxzZSwgaWRlbnRpZmllciwgdW5kZWZpbmVkKSxcbiAgICAgICAgICB0cy5mYWN0b3J5LmNyZWF0ZVN0cmluZ0xpdGVyYWwobW9kdWxlTmFtZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0ltcG9ydFRleHQgPSB0aGlzLnByaW50ZXIucHJpbnROb2RlKHRzLkVtaXRIaW50LlVuc3BlY2lmaWVkLCBuZXdJbXBvcnQsIHNvdXJjZUZpbGUpO1xuICAgIC8vIElmIHRoZSBpbXBvcnQgaXMgZ2VuZXJhdGVkIGF0IHRoZSBzdGFydCBvZiB0aGUgc291cmNlIGZpbGUsIHdlIHdhbnQgdG8gYWRkXG4gICAgLy8gYSBuZXctbGluZSBhZnRlciB0aGUgaW1wb3J0LiBPdGhlcndpc2UgaWYgdGhlIGltcG9ydCBpcyBnZW5lcmF0ZWQgYWZ0ZXIgYW5cbiAgICAvLyBleGlzdGluZyBpbXBvcnQsIHdlIG5lZWQgdG8gcHJlcGVuZCBhIG5ldy1saW5lIHNvIHRoYXQgdGhlIGltcG9ydCBpcyBub3Qgb25cbiAgICAvLyB0aGUgc2FtZSBsaW5lIGFzIHRoZSBleGlzdGluZyBpbXBvcnQgYW5jaG9yLlxuICAgIHRoaXMuZ2V0VXBkYXRlUmVjb3JkZXIoc291cmNlRmlsZSlcbiAgICAgICAgLmFkZE5ld0ltcG9ydChcbiAgICAgICAgICAgIGltcG9ydFN0YXJ0SW5kZXgsIGltcG9ydFN0YXJ0SW5kZXggPT09IDAgPyBgJHtuZXdJbXBvcnRUZXh0fVxcbmAgOiBgXFxuJHtuZXdJbXBvcnRUZXh0fWApO1xuXG4gICAgLy8gS2VlcCB0cmFjayBvZiBhbGwgZ2VuZXJhdGVkIGltcG9ydHMgc28gdGhhdCB3ZSBkb24ndCBnZW5lcmF0ZSBkdXBsaWNhdGVcbiAgICAvLyBzaW1pbGFyIGltcG9ydHMgYXMgdGhlc2UgY2FuJ3QgYmUgc3RhdGljYWxseSBhbmFseXplZCBpbiB0aGUgc291cmNlLWZpbGUgeWV0LlxuICAgIHRoaXMuaW1wb3J0Q2FjaGUucHVzaCh7c291cmNlRmlsZSwgc3ltYm9sTmFtZSwgbW9kdWxlTmFtZSwgaWRlbnRpZmllcn0pO1xuXG4gICAgcmV0dXJuIGlkZW50aWZpZXI7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmVzIHRoZSBjb2xsZWN0ZWQgaW1wb3J0IGNoYW5nZXMgd2l0aGluIHRoZSBhcHByb3ByaWF0ZSB1cGRhdGUgcmVjb3JkZXJzLiBUaGVcbiAgICogdXBkYXRlZCBpbXBvcnRzIGNhbiBvbmx5IGJlIHVwZGF0ZWQgKm9uY2UqIHBlciBzb3VyY2UtZmlsZSBiZWNhdXNlIHByZXZpb3VzIHVwZGF0ZXNcbiAgICogY291bGQgb3RoZXJ3aXNlIHNoaWZ0IHRoZSBzb3VyY2UtZmlsZSBvZmZzZXRzLlxuICAgKi9cbiAgcmVjb3JkQ2hhbmdlcygpIHtcbiAgICB0aGlzLnVwZGF0ZWRJbXBvcnRzLmZvckVhY2goKGV4cHJlc3Npb25zLCBpbXBvcnREZWNsKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2VGaWxlID0gaW1wb3J0RGVjbC5nZXRTb3VyY2VGaWxlKCk7XG4gICAgICBjb25zdCByZWNvcmRlciA9IHRoaXMuZ2V0VXBkYXRlUmVjb3JkZXIoc291cmNlRmlsZSk7XG4gICAgICBjb25zdCBuYW1lZEJpbmRpbmdzID0gaW1wb3J0RGVjbC5pbXBvcnRDbGF1c2UhLm5hbWVkQmluZGluZ3MgYXMgdHMuTmFtZWRJbXBvcnRzO1xuICAgICAgY29uc3QgbmV3TmFtZWRCaW5kaW5ncyA9IHRzLmZhY3RvcnkudXBkYXRlTmFtZWRJbXBvcnRzKFxuICAgICAgICAgIG5hbWVkQmluZGluZ3MsXG4gICAgICAgICAgbmFtZWRCaW5kaW5ncy5lbGVtZW50cy5jb25jYXQoZXhwcmVzc2lvbnMubWFwKFxuICAgICAgICAgICAgICAoe3Byb3BlcnR5TmFtZSwgaW1wb3J0TmFtZX0pID0+IGNyZWF0ZUltcG9ydFNwZWNpZmllcihwcm9wZXJ0eU5hbWUsIGltcG9ydE5hbWUpKSkpO1xuXG4gICAgICBjb25zdCBuZXdOYW1lZEJpbmRpbmdzVGV4dCA9XG4gICAgICAgICAgdGhpcy5wcmludGVyLnByaW50Tm9kZSh0cy5FbWl0SGludC5VbnNwZWNpZmllZCwgbmV3TmFtZWRCaW5kaW5ncywgc291cmNlRmlsZSk7XG4gICAgICByZWNvcmRlci51cGRhdGVFeGlzdGluZ0ltcG9ydChuYW1lZEJpbmRpbmdzLCBuZXdOYW1lZEJpbmRpbmdzVGV4dCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogR2V0cyBhbiB1bmlxdWUgaWRlbnRpZmllciB3aXRoIGEgYmFzZSBuYW1lIGZvciB0aGUgZ2l2ZW4gc291cmNlIGZpbGUuICovXG4gIHByaXZhdGUgX2dldFVuaXF1ZUlkZW50aWZpZXIoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgYmFzZU5hbWU6IHN0cmluZyk6IHRzLklkZW50aWZpZXIge1xuICAgIGlmICh0aGlzLmlzVW5pcXVlSWRlbnRpZmllck5hbWUoc291cmNlRmlsZSwgYmFzZU5hbWUpKSB7XG4gICAgICB0aGlzLl9yZWNvcmRVc2VkSWRlbnRpZmllcihzb3VyY2VGaWxlLCBiYXNlTmFtZSk7XG4gICAgICByZXR1cm4gdHMuZmFjdG9yeS5jcmVhdGVJZGVudGlmaWVyKGJhc2VOYW1lKTtcbiAgICB9XG5cbiAgICBsZXQgbmFtZSA9IG51bGw7XG4gICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgIGRvIHtcbiAgICAgIG5hbWUgPSBgJHtiYXNlTmFtZX1fJHtjb3VudGVyKyt9YDtcbiAgICB9IHdoaWxlICghdGhpcy5pc1VuaXF1ZUlkZW50aWZpZXJOYW1lKHNvdXJjZUZpbGUsIG5hbWUpKTtcblxuICAgIHRoaXMuX3JlY29yZFVzZWRJZGVudGlmaWVyKHNvdXJjZUZpbGUsIG5hbWUhKTtcbiAgICByZXR1cm4gdHMuZmFjdG9yeS5jcmVhdGVJZGVudGlmaWVyKG5hbWUhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgc3BlY2lmaWVkIGlkZW50aWZpZXIgbmFtZSBpcyB1c2VkIHdpdGhpbiB0aGUgZ2l2ZW5cbiAgICogc291cmNlIGZpbGUuXG4gICAqL1xuICBwcml2YXRlIGlzVW5pcXVlSWRlbnRpZmllck5hbWUoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgbmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMudXNlZElkZW50aWZpZXJOYW1lcy5oYXMoc291cmNlRmlsZSkgJiZcbiAgICAgICAgdGhpcy51c2VkSWRlbnRpZmllck5hbWVzLmdldChzb3VyY2VGaWxlKSEuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBXYWxrIHRocm91Z2ggdGhlIHNvdXJjZSBmaWxlIGFuZCBzZWFyY2ggZm9yIGFuIGlkZW50aWZpZXIgbWF0Y2hpbmdcbiAgICAvLyB0aGUgZ2l2ZW4gbmFtZS4gSW4gdGhhdCBjYXNlLCBpdCdzIG5vdCBndWFyYW50ZWVkIHRoYXQgdGhpcyBuYW1lXG4gICAgLy8gaXMgdW5pcXVlIGluIHRoZSBnaXZlbiBkZWNsYXJhdGlvbiBzY29wZSBhbmQgd2UganVzdCByZXR1cm4gZmFsc2UuXG4gICAgY29uc3Qgbm9kZVF1ZXVlOiB0cy5Ob2RlW10gPSBbc291cmNlRmlsZV07XG4gICAgd2hpbGUgKG5vZGVRdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBub2RlUXVldWUuc2hpZnQoKSE7XG4gICAgICBpZiAodHMuaXNJZGVudGlmaWVyKG5vZGUpICYmIG5vZGUudGV4dCA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBub2RlUXVldWUucHVzaCguLi5ub2RlLmdldENoaWxkcmVuKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlY29yZFVzZWRJZGVudGlmaWVyKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIGlkZW50aWZpZXJOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnVzZWRJZGVudGlmaWVyTmFtZXMuc2V0KFxuICAgICAgICBzb3VyY2VGaWxlLCAodGhpcy51c2VkSWRlbnRpZmllck5hbWVzLmdldChzb3VyY2VGaWxlKSB8fCBbXSkuY29uY2F0KGlkZW50aWZpZXJOYW1lKSk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB0aGUgZnVsbCBlbmQgb2YgYSBnaXZlbiBub2RlLiBCeSBkZWZhdWx0IHRoZSBlbmQgcG9zaXRpb24gb2YgYSBub2RlIGlzXG4gICAqIGJlZm9yZSBhbGwgdHJhaWxpbmcgY29tbWVudHMuIFRoaXMgY291bGQgbWVhbiB0aGF0IGdlbmVyYXRlZCBpbXBvcnRzIHNoaWZ0IGNvbW1lbnRzLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RW5kUG9zaXRpb25PZk5vZGUobm9kZTogdHMuTm9kZSkge1xuICAgIGNvbnN0IG5vZGVFbmRQb3MgPSBub2RlLmdldEVuZCgpO1xuICAgIGNvbnN0IGNvbW1lbnRSYW5nZXMgPSB0cy5nZXRUcmFpbGluZ0NvbW1lbnRSYW5nZXMobm9kZS5nZXRTb3VyY2VGaWxlKCkudGV4dCwgbm9kZUVuZFBvcyk7XG4gICAgaWYgKCFjb21tZW50UmFuZ2VzIHx8ICFjb21tZW50UmFuZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5vZGVFbmRQb3M7XG4gICAgfVxuICAgIHJldHVybiBjb21tZW50UmFuZ2VzW2NvbW1lbnRSYW5nZXMubGVuZ3RoIC0gMV0hLmVuZDtcbiAgfVxufVxuXG5cbi8qKlxuICogQmFja3dhcmRzLWNvbXBhdGlibGUgdmVyc2lvbiBvZiBgdHMuY3JlYXRlSW1wb3J0U3BlY2lmaWVyYFxuICogdG8gaGFuZGxlIGEgYnJlYWtpbmcgY2hhbmdlIGJldHdlZW4gNC40IGFuZCA0LjUuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUltcG9ydFNwZWNpZmllcihcbiAgICBwcm9wZXJ0eU5hbWU6IHRzLklkZW50aWZpZXJ8dW5kZWZpbmVkLCBuYW1lOiB0cy5JZGVudGlmaWVyLFxuICAgIGlzVHlwZU9ubHkgPSBmYWxzZSk6IHRzLkltcG9ydFNwZWNpZmllciB7XG4gIHJldHVybiBQQVJTRURfVFNfVkVSU0lPTiA+IDQuNCA/XG4gICAgICB0cy5mYWN0b3J5LmNyZWF0ZUltcG9ydFNwZWNpZmllcihpc1R5cGVPbmx5LCBwcm9wZXJ0eU5hbWUsIG5hbWUpIDpcbiAgICAgIC8vIFRPRE8oY3Jpc2JldG8pOiBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBsYXllciBmb3IgVFMgNC40LlxuICAgICAgLy8gU2hvdWxkIGJlIGNsZWFuZWQgdXAgd2hlbiB3ZSBkcm9wIHN1cHBvcnQgZm9yIGl0LlxuICAgICAgKHRzLmNyZWF0ZUltcG9ydFNwZWNpZmllciBhcyBhbnkpKHByb3BlcnR5TmFtZSwgbmFtZSk7XG59XG4iXX0=