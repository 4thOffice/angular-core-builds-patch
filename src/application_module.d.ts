import { ApplicationRef } from './application_ref';
import { IterableDiffers, KeyValueDiffers } from './change_detection/change_detection';
import { StaticProvider } from './di';
export declare function _iterableDiffersFactory(): IterableDiffers;
export declare function _keyValueDiffersFactory(): KeyValueDiffers;
export declare function _localeFactory(locale?: string): string;
export declare const APPLICATION_MODULE_PROVIDERS: StaticProvider[];
/**
 * This module includes the providers of @angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * @experimental
 */
export declare class ApplicationModule {
    constructor(appRef: ApplicationRef);
}
