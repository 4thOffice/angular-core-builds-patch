import { DebugContext } from './view';
export declare const ERROR_TYPE = "ngType";
export declare const ERROR_COMPONENT_TYPE = "ngComponentType";
export declare const ERROR_DEBUG_CONTEXT = "ngDebugContext";
export declare const ERROR_ORIGINAL_ERROR = "ngOriginalError";
export declare function getType(error: Error): Function;
export declare function getDebugContext(error: Error): DebugContext;
export declare function getOriginalError(error: Error): Error;
