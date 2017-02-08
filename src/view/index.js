/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { anchorDef, elementDef } from './element';
export { ngContentDef } from './ng_content';
export { directiveDef, providerDef } from './provider';
export { pureArrayDef, pureObjectDef, purePipeDef } from './pure_expression';
export { queryDef } from './query';
export { textDef } from './text';
export { rootRenderNodes, setCurrentNode } from './util';
export { checkAndUpdateView, checkNoChangesView, checkNodeDynamic, checkNodeInline, createEmbeddedView, createRootView, destroyView, viewDef } from './view';
export { attachEmbeddedView, detachEmbeddedView, moveEmbeddedView } from './view_attach';
export { ViewFlags, NodeType, NodeFlags, BindingType, QueryValueType, ProviderType, DepFlags, PureExpressionType, QueryBindingType, ViewState, NodeData, asTextData, asElementData, asProviderData, asPureExpressionData, asQueryList, EntryAction, Refs } from './types';
import { createRefs } from './refs';
import { Refs } from './types';
Refs.setInstance(createRefs());
export var /** @type {?} */ createComponentFactory = Refs.createComponentFactory;
//# sourceMappingURL=index.js.map