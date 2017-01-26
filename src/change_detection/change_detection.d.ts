import { IterableDiffers } from './differs/iterable_differs';
import { KeyValueDiffers } from './differs/keyvalue_differs';
export { SimpleChanges } from '../metadata/lifecycle_hooks';
export { SimpleChange, ValueUnwrapper, WrappedValue, devModeEqual, looseIdentical } from './change_detection_util';
export { ChangeDetectorRef } from './change_detector_ref';
export { ChangeDetectionStrategy, ChangeDetectorStatus, isDefaultChangeDetectionStrategy } from './constants';
export { DefaultIterableDifferFactory } from './differs/default_iterable_differ';
export { DefaultIterableDiffer } from './differs/default_iterable_differ';
export { DefaultKeyValueDifferFactory } from './differs/default_keyvalue_differ';
export { CollectionChangeRecord, IterableChangeRecord, IterableChanges, IterableDiffer, IterableDifferFactory, IterableDiffers, TrackByFn } from './differs/iterable_differs';
export { KeyValueChangeRecord, KeyValueChanges, KeyValueDiffer, KeyValueDifferFactory, KeyValueDiffers } from './differs/keyvalue_differs';
export { PipeTransform } from './pipe_transform';
export declare const defaultIterableDiffers: IterableDiffers;
export declare const defaultKeyValueDiffers: KeyValueDiffers;
