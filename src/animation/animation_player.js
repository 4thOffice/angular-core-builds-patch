/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { scheduleMicroTask } from '../facade/lang';
/**
 * \@experimental Animation support is experimental.
 * @abstract
 */
export class AnimationPlayer {
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { }
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { }
    /**
     * @abstract
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { }
    /**
     * @abstract
     * @return {?}
     */
    init() { }
    /**
     * @abstract
     * @return {?}
     */
    hasStarted() { }
    /**
     * @abstract
     * @return {?}
     */
    play() { }
    /**
     * @abstract
     * @return {?}
     */
    pause() { }
    /**
     * @abstract
     * @return {?}
     */
    restart() { }
    /**
     * @abstract
     * @return {?}
     */
    finish() { }
    /**
     * @abstract
     * @return {?}
     */
    destroy() { }
    /**
     * @abstract
     * @return {?}
     */
    reset() { }
    /**
     * @abstract
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { }
    /**
     * @abstract
     * @return {?}
     */
    getPosition() { }
    /**
     * @return {?}
     */
    get parentPlayer() { throw new Error('NOT IMPLEMENTED: Base Class'); }
    /**
     * @param {?} player
     * @return {?}
     */
    set parentPlayer(player) { throw new Error('NOT IMPLEMENTED: Base Class'); }
}
export class NoOpAnimationPlayer {
    constructor() {
        this._onDoneFns = [];
        this._onStartFns = [];
        this._onDestroyFns = [];
        this._started = false;
        this._destroyed = false;
        this._finished = false;
        this.parentPlayer = null;
        scheduleMicroTask(() => this._onFinish());
    }
    /**
     * @return {?}
     */
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            this._onDoneFns.forEach(fn => fn());
            this._onDoneFns = [];
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) { this._onStartFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) { this._onDoneFns.push(fn); }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) { this._onDestroyFns.push(fn); }
    /**
     * @return {?}
     */
    hasStarted() { return this._started; }
    /**
     * @return {?}
     */
    init() { }
    /**
     * @return {?}
     */
    play() {
        if (!this.hasStarted()) {
            this._onStartFns.forEach(fn => fn());
            this._onStartFns = [];
        }
        this._started = true;
    }
    /**
     * @return {?}
     */
    pause() { }
    /**
     * @return {?}
     */
    restart() { }
    /**
     * @return {?}
     */
    finish() { this._onFinish(); }
    /**
     * @return {?}
     */
    destroy() {
        if (!this._destroyed) {
            this._destroyed = true;
            this.finish();
            this._onDestroyFns.forEach(fn => fn());
            this._onDestroyFns = [];
        }
    }
    /**
     * @return {?}
     */
    reset() { }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) { }
    /**
     * @return {?}
     */
    getPosition() { return 0; }
}
function NoOpAnimationPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    NoOpAnimationPlayer.prototype._onDoneFns;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._onStartFns;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._onDestroyFns;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._started;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._destroyed;
    /** @type {?} */
    NoOpAnimationPlayer.prototype._finished;
    /** @type {?} */
    NoOpAnimationPlayer.prototype.parentPlayer;
}
//# sourceMappingURL=animation_player.js.map