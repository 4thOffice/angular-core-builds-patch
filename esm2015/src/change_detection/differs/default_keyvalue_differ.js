/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { looseIdentical, stringify } from '../../util';
import { isJsObject } from '../change_detection_util';
export class DefaultKeyValueDifferFactory {
    constructor() { }
    supports(obj) { return obj instanceof Map || isJsObject(obj); }
    create() { return new DefaultKeyValueDiffer(); }
}
export class DefaultKeyValueDiffer {
    constructor() {
        this._records = new Map();
        this._mapHead = null;
        // _appendAfter is used in the check loop
        this._appendAfter = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    get isDirty() {
        return this._additionsHead !== null || this._changesHead !== null ||
            this._removalsHead !== null;
    }
    forEachItem(fn) {
        let record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    }
    forEachPreviousItem(fn) {
        let record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    }
    forEachChangedItem(fn) {
        let record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    }
    forEachAddedItem(fn) {
        let record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    }
    forEachRemovedItem(fn) {
        let record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    }
    diff(map) {
        if (!map) {
            map = new Map();
        }
        else if (!(map instanceof Map || isJsObject(map))) {
            throw new Error(`Error trying to diff '${stringify(map)}'. Only maps and objects are allowed`);
        }
        return this.check(map) ? this : null;
    }
    onDestroy() { }
    /**
     * Check the current state of the map vs the previous.
     * The algorithm is optimised for when the keys do no change.
     */
    check(map) {
        this._reset();
        let insertBefore = this._mapHead;
        this._appendAfter = null;
        this._forEach(map, (value, key) => {
            if (insertBefore && insertBefore.key === key) {
                this._maybeAddToChanges(insertBefore, value);
                this._appendAfter = insertBefore;
                insertBefore = insertBefore._next;
            }
            else {
                const record = this._getOrCreateRecordForKey(key, value);
                insertBefore = this._insertBeforeOrAppend(insertBefore, record);
            }
        });
        // Items remaining at the end of the list have been deleted
        if (insertBefore) {
            if (insertBefore._prev) {
                insertBefore._prev._next = null;
            }
            this._removalsHead = insertBefore;
            for (let record = insertBefore; record !== null; record = record._nextRemoved) {
                if (record === this._mapHead) {
                    this._mapHead = null;
                }
                this._records.delete(record.key);
                record._nextRemoved = record._next;
                record.previousValue = record.currentValue;
                record.currentValue = null;
                record._prev = null;
                record._next = null;
            }
        }
        // Make sure tails have no next records from previous runs
        if (this._changesTail)
            this._changesTail._nextChanged = null;
        if (this._additionsTail)
            this._additionsTail._nextAdded = null;
        return this.isDirty;
    }
    /**
     * Inserts a record before `before` or append at the end of the list when `before` is null.
     *
     * Notes:
     * - This method appends at `this._appendAfter`,
     * - This method updates `this._appendAfter`,
     * - The return value is the new value for the insertion pointer.
     */
    _insertBeforeOrAppend(before, record) {
        if (before) {
            const prev = before._prev;
            record._next = before;
            record._prev = prev;
            before._prev = record;
            if (prev) {
                prev._next = record;
            }
            if (before === this._mapHead) {
                this._mapHead = record;
            }
            this._appendAfter = before;
            return before;
        }
        if (this._appendAfter) {
            this._appendAfter._next = record;
            record._prev = this._appendAfter;
        }
        else {
            this._mapHead = record;
        }
        this._appendAfter = record;
        return null;
    }
    _getOrCreateRecordForKey(key, value) {
        if (this._records.has(key)) {
            const record = this._records.get(key);
            this._maybeAddToChanges(record, value);
            const prev = record._prev;
            const next = record._next;
            if (prev) {
                prev._next = next;
            }
            if (next) {
                next._prev = prev;
            }
            record._next = null;
            record._prev = null;
            return record;
        }
        const record = new KeyValueChangeRecord_(key);
        this._records.set(key, record);
        record.currentValue = value;
        this._addToAdditions(record);
        return record;
    }
    /** @internal */
    _reset() {
        if (this.isDirty) {
            let record;
            // let `_previousMapHead` contain the state of the map before the changes
            this._previousMapHead = this._mapHead;
            for (record = this._previousMapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            // Update `record.previousValue` with the value of the item before the changes
            // We need to update all changed items (that's those which have been added and changed)
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = null;
        }
    }
    // Add the record or a given key to the list of changes only when the value has actually changed
    _maybeAddToChanges(record, newValue) {
        if (!looseIdentical(newValue, record.currentValue)) {
            record.previousValue = record.currentValue;
            record.currentValue = newValue;
            this._addToChanges(record);
        }
    }
    _addToAdditions(record) {
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    }
    _addToChanges(record) {
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    }
    /** @internal */
    _forEach(obj, fn) {
        if (obj instanceof Map) {
            obj.forEach(fn);
        }
        else {
            Object.keys(obj).forEach(k => fn(obj[k], k));
        }
    }
}
class KeyValueChangeRecord_ {
    constructor(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        /** @internal */
        this._nextPrevious = null;
        /** @internal */
        this._next = null;
        /** @internal */
        this._prev = null;
        /** @internal */
        this._nextAdded = null;
        /** @internal */
        this._nextRemoved = null;
        /** @internal */
        this._nextChanged = null;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9jaGFuZ2VfZGV0ZWN0aW9uL2RpZmZlcnMvZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBSXBELE1BQU07SUFDSixnQkFBZSxDQUFDO0lBQ2hCLFFBQVEsQ0FBQyxHQUFRLElBQWEsT0FBTyxHQUFHLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFN0UsTUFBTSxLQUFpQyxPQUFPLElBQUkscUJBQXFCLEVBQVEsQ0FBQyxDQUFDLENBQUM7Q0FDbkY7QUFFRCxNQUFNO0lBQU47UUFDVSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQWtDLENBQUM7UUFDckQsYUFBUSxHQUFxQyxJQUFJLENBQUM7UUFDMUQseUNBQXlDO1FBQ2pDLGlCQUFZLEdBQXFDLElBQUksQ0FBQztRQUN0RCxxQkFBZ0IsR0FBcUMsSUFBSSxDQUFDO1FBQzFELGlCQUFZLEdBQXFDLElBQUksQ0FBQztRQUN0RCxpQkFBWSxHQUFxQyxJQUFJLENBQUM7UUFDdEQsbUJBQWMsR0FBcUMsSUFBSSxDQUFDO1FBQ3hELG1CQUFjLEdBQXFDLElBQUksQ0FBQztRQUN4RCxrQkFBYSxHQUFxQyxJQUFJLENBQUM7UUFDdkQsa0JBQWEsR0FBcUMsSUFBSSxDQUFDO0lBb09qRSxDQUFDO0lBbE9DLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJO1lBQzdELElBQUksQ0FB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RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQWMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtJQUNSLFFBQVEsQ0FBTyxHQUErQixFQUFFLEVBQTBCO1FBQ2hGLElBQUksR0FBRyxZQUFZLEdBQUcsRUFBRTtZQUN0QixHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pCO2FBQU07WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7Q0FDRjtBQUVEO0lBaUJFLFlBQW1CLEdBQU07UUFBTixRQUFHLEdBQUgsR0FBRyxDQUFHO1FBaEJ6QixrQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUU1QixnQkFBZ0I7UUFDaEIsa0JBQWEsR0FBcUMsSUFBSSxDQUFDO1FBQ3ZELGdCQUFnQjtRQUNoQixVQUFLLEdBQXFDLElBQUksQ0FBQztRQUMvQyxnQkFBZ0I7UUFDaEIsVUFBSyxHQUFxQyxJQUFJLENBQUM7UUFDL0MsZ0JBQWdCO1FBQ2hCLGVBQVUsR0FBcUMsSUFBSSxDQUFDO1FBQ3BELGdCQUFnQjtRQUNoQixpQkFBWSxHQUFxQyxJQUFJLENBQUM7UUFDdEQsZ0JBQWdCO1FBQ2hCLGlCQUFZLEdBQXFDLElBQUksQ0FBQztJQUUxQixDQUFDO0NBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2xvb3NlSWRlbnRpY2FsLCBzdHJpbmdpZnl9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtpc0pzT2JqZWN0fSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwnO1xuaW1wb3J0IHtLZXlWYWx1ZUNoYW5nZVJlY29yZCwgS2V5VmFsdWVDaGFuZ2VzLCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJGYWN0b3J5fSBmcm9tICcuL2tleXZhbHVlX2RpZmZlcnMnO1xuXG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0S2V5VmFsdWVEaWZmZXJGYWN0b3J5PEssIFY+IGltcGxlbWVudHMgS2V5VmFsdWVEaWZmZXJGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBzdXBwb3J0cyhvYmo6IGFueSk6IGJvb2xlYW4geyByZXR1cm4gb2JqIGluc3RhbmNlb2YgTWFwIHx8IGlzSnNPYmplY3Qob2JqKTsgfVxuXG4gIGNyZWF0ZTxLLCBWPigpOiBLZXlWYWx1ZURpZmZlcjxLLCBWPiB7IHJldHVybiBuZXcgRGVmYXVsdEtleVZhbHVlRGlmZmVyPEssIFY+KCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRLZXlWYWx1ZURpZmZlcjxLLCBWPiBpbXBsZW1lbnRzIEtleVZhbHVlRGlmZmVyPEssIFY+LCBLZXlWYWx1ZUNoYW5nZXM8SywgVj4ge1xuICBwcml2YXRlIF9yZWNvcmRzID0gbmV3IE1hcDxLLCBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj4+KCk7XG4gIHByaXZhdGUgX21hcEhlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsID0gbnVsbDtcbiAgLy8gX2FwcGVuZEFmdGVyIGlzIHVzZWQgaW4gdGhlIGNoZWNrIGxvb3BcbiAgcHJpdmF0ZSBfYXBwZW5kQWZ0ZXI6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfcHJldmlvdXNNYXBIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NoYW5nZXNIZWFkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NoYW5nZXNUYWlsOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2FkZGl0aW9uc0hlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfYWRkaXRpb25zVGFpbDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9yZW1vdmFsc0hlYWQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmVtb3ZhbHNUYWlsOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbCA9IG51bGw7XG5cbiAgZ2V0IGlzRGlydHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FkZGl0aW9uc0hlYWQgIT09IG51bGwgfHwgdGhpcy5fY2hhbmdlc0hlYWQgIT09IG51bGwgfHxcbiAgICAgICAgdGhpcy5fcmVtb3ZhbHNIZWFkICE9PSBudWxsO1xuICB9XG5cbiAgZm9yRWFjaEl0ZW0oZm46IChyOiBLZXlWYWx1ZUNoYW5nZVJlY29yZDxLLCBWPikgPT4gdm9pZCkge1xuICAgIGxldCByZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsO1xuICAgIGZvciAocmVjb3JkID0gdGhpcy5fbWFwSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaFByZXZpb3VzSXRlbShmbjogKHI6IEtleVZhbHVlQ2hhbmdlUmVjb3JkPEssIFY+KSA9PiB2b2lkKSB7XG4gICAgbGV0IHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGw7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9wcmV2aW91c01hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UHJldmlvdXMpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaENoYW5nZWRJdGVtKGZuOiAocjogS2V5VmFsdWVDaGFuZ2VSZWNvcmQ8SywgVj4pID0+IHZvaWQpIHtcbiAgICBsZXQgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbDtcbiAgICBmb3IgKHJlY29yZCA9IHRoaXMuX2NoYW5nZXNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dENoYW5nZWQpIHtcbiAgICAgIGZuKHJlY29yZCk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaEFkZGVkSXRlbShmbjogKHI6IEtleVZhbHVlQ2hhbmdlUmVjb3JkPEssIFY+KSA9PiB2b2lkKSB7XG4gICAgbGV0IHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGw7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9hZGRpdGlvbnNIZWFkOyByZWNvcmQgIT09IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dEFkZGVkKSB7XG4gICAgICBmbihyZWNvcmQpO1xuICAgIH1cbiAgfVxuXG4gIGZvckVhY2hSZW1vdmVkSXRlbShmbjogKHI6IEtleVZhbHVlQ2hhbmdlUmVjb3JkPEssIFY+KSA9PiB2b2lkKSB7XG4gICAgbGV0IHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGw7XG4gICAgZm9yIChyZWNvcmQgPSB0aGlzLl9yZW1vdmFsc0hlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0UmVtb3ZlZCkge1xuICAgICAgZm4ocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBkaWZmKG1hcD86IE1hcDxhbnksIGFueT58e1trOiBzdHJpbmddOiBhbnl9fG51bGwpOiBhbnkge1xuICAgIGlmICghbWFwKSB7XG4gICAgICBtYXAgPSBuZXcgTWFwKCk7XG4gICAgfSBlbHNlIGlmICghKG1hcCBpbnN0YW5jZW9mIE1hcCB8fCBpc0pzT2JqZWN0KG1hcCkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEVycm9yIHRyeWluZyB0byBkaWZmICcke3N0cmluZ2lmeShtYXApfScuIE9ubHkgbWFwcyBhbmQgb2JqZWN0cyBhcmUgYWxsb3dlZGApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNoZWNrKG1hcCkgPyB0aGlzIDogbnVsbDtcbiAgfVxuXG4gIG9uRGVzdHJveSgpIHt9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBtYXAgdnMgdGhlIHByZXZpb3VzLlxuICAgKiBUaGUgYWxnb3JpdGhtIGlzIG9wdGltaXNlZCBmb3Igd2hlbiB0aGUga2V5cyBkbyBubyBjaGFuZ2UuXG4gICAqL1xuICBjaGVjayhtYXA6IE1hcDxhbnksIGFueT58e1trOiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gICAgdGhpcy5fcmVzZXQoKTtcblxuICAgIGxldCBpbnNlcnRCZWZvcmUgPSB0aGlzLl9tYXBIZWFkO1xuICAgIHRoaXMuX2FwcGVuZEFmdGVyID0gbnVsbDtcblxuICAgIHRoaXMuX2ZvckVhY2gobWFwLCAodmFsdWU6IGFueSwga2V5OiBhbnkpID0+IHtcbiAgICAgIGlmIChpbnNlcnRCZWZvcmUgJiYgaW5zZXJ0QmVmb3JlLmtleSA9PT0ga2V5KSB7XG4gICAgICAgIHRoaXMuX21heWJlQWRkVG9DaGFuZ2VzKGluc2VydEJlZm9yZSwgdmFsdWUpO1xuICAgICAgICB0aGlzLl9hcHBlbmRBZnRlciA9IGluc2VydEJlZm9yZTtcbiAgICAgICAgaW5zZXJ0QmVmb3JlID0gaW5zZXJ0QmVmb3JlLl9uZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5fZ2V0T3JDcmVhdGVSZWNvcmRGb3JLZXkoa2V5LCB2YWx1ZSk7XG4gICAgICAgIGluc2VydEJlZm9yZSA9IHRoaXMuX2luc2VydEJlZm9yZU9yQXBwZW5kKGluc2VydEJlZm9yZSwgcmVjb3JkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEl0ZW1zIHJlbWFpbmluZyBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0IGhhdmUgYmVlbiBkZWxldGVkXG4gICAgaWYgKGluc2VydEJlZm9yZSkge1xuICAgICAgaWYgKGluc2VydEJlZm9yZS5fcHJldikge1xuICAgICAgICBpbnNlcnRCZWZvcmUuX3ByZXYuX25leHQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgPSBpbnNlcnRCZWZvcmU7XG5cbiAgICAgIGZvciAobGV0IHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGwgPSBpbnNlcnRCZWZvcmU7IHJlY29yZCAhPT0gbnVsbDtcbiAgICAgICAgICAgcmVjb3JkID0gcmVjb3JkLl9uZXh0UmVtb3ZlZCkge1xuICAgICAgICBpZiAocmVjb3JkID09PSB0aGlzLl9tYXBIZWFkKSB7XG4gICAgICAgICAgdGhpcy5fbWFwSGVhZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVjb3Jkcy5kZWxldGUocmVjb3JkLmtleSk7XG4gICAgICAgIHJlY29yZC5fbmV4dFJlbW92ZWQgPSByZWNvcmQuX25leHQ7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1ZhbHVlID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgcmVjb3JkLmN1cnJlbnRWYWx1ZSA9IG51bGw7XG4gICAgICAgIHJlY29yZC5fcHJldiA9IG51bGw7XG4gICAgICAgIHJlY29yZC5fbmV4dCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRhaWxzIGhhdmUgbm8gbmV4dCByZWNvcmRzIGZyb20gcHJldmlvdXMgcnVuc1xuICAgIGlmICh0aGlzLl9jaGFuZ2VzVGFpbCkgdGhpcy5fY2hhbmdlc1RhaWwuX25leHRDaGFuZ2VkID0gbnVsbDtcbiAgICBpZiAodGhpcy5fYWRkaXRpb25zVGFpbCkgdGhpcy5fYWRkaXRpb25zVGFpbC5fbmV4dEFkZGVkID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLmlzRGlydHk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0cyBhIHJlY29yZCBiZWZvcmUgYGJlZm9yZWAgb3IgYXBwZW5kIGF0IHRoZSBlbmQgb2YgdGhlIGxpc3Qgd2hlbiBgYmVmb3JlYCBpcyBudWxsLlxuICAgKlxuICAgKiBOb3RlczpcbiAgICogLSBUaGlzIG1ldGhvZCBhcHBlbmRzIGF0IGB0aGlzLl9hcHBlbmRBZnRlcmAsXG4gICAqIC0gVGhpcyBtZXRob2QgdXBkYXRlcyBgdGhpcy5fYXBwZW5kQWZ0ZXJgLFxuICAgKiAtIFRoZSByZXR1cm4gdmFsdWUgaXMgdGhlIG5ldyB2YWx1ZSBmb3IgdGhlIGluc2VydGlvbiBwb2ludGVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5zZXJ0QmVmb3JlT3JBcHBlbmQoXG4gICAgICBiZWZvcmU6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsLFxuICAgICAgcmVjb3JkOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj4pOiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbCB7XG4gICAgaWYgKGJlZm9yZSkge1xuICAgICAgY29uc3QgcHJldiA9IGJlZm9yZS5fcHJldjtcbiAgICAgIHJlY29yZC5fbmV4dCA9IGJlZm9yZTtcbiAgICAgIHJlY29yZC5fcHJldiA9IHByZXY7XG4gICAgICBiZWZvcmUuX3ByZXYgPSByZWNvcmQ7XG4gICAgICBpZiAocHJldikge1xuICAgICAgICBwcmV2Ll9uZXh0ID0gcmVjb3JkO1xuICAgICAgfVxuICAgICAgaWYgKGJlZm9yZSA9PT0gdGhpcy5fbWFwSGVhZCkge1xuICAgICAgICB0aGlzLl9tYXBIZWFkID0gcmVjb3JkO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hcHBlbmRBZnRlciA9IGJlZm9yZTtcbiAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FwcGVuZEFmdGVyKSB7XG4gICAgICB0aGlzLl9hcHBlbmRBZnRlci5fbmV4dCA9IHJlY29yZDtcbiAgICAgIHJlY29yZC5fcHJldiA9IHRoaXMuX2FwcGVuZEFmdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tYXBIZWFkID0gcmVjb3JkO1xuICAgIH1cblxuICAgIHRoaXMuX2FwcGVuZEFmdGVyID0gcmVjb3JkO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JDcmVhdGVSZWNvcmRGb3JLZXkoa2V5OiBLLCB2YWx1ZTogVik6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPiB7XG4gICAgaWYgKHRoaXMuX3JlY29yZHMuaGFzKGtleSkpIHtcbiAgICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuX3JlY29yZHMuZ2V0KGtleSkgITtcbiAgICAgIHRoaXMuX21heWJlQWRkVG9DaGFuZ2VzKHJlY29yZCwgdmFsdWUpO1xuICAgICAgY29uc3QgcHJldiA9IHJlY29yZC5fcHJldjtcbiAgICAgIGNvbnN0IG5leHQgPSByZWNvcmQuX25leHQ7XG4gICAgICBpZiAocHJldikge1xuICAgICAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIG5leHQuX3ByZXYgPSBwcmV2O1xuICAgICAgfVxuICAgICAgcmVjb3JkLl9uZXh0ID0gbnVsbDtcbiAgICAgIHJlY29yZC5fcHJldiA9IG51bGw7XG5cbiAgICAgIHJldHVybiByZWNvcmQ7XG4gICAgfVxuXG4gICAgY29uc3QgcmVjb3JkID0gbmV3IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPihrZXkpO1xuICAgIHRoaXMuX3JlY29yZHMuc2V0KGtleSwgcmVjb3JkKTtcbiAgICByZWNvcmQuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fYWRkVG9BZGRpdGlvbnMocmVjb3JkKTtcbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuaXNEaXJ0eSkge1xuICAgICAgbGV0IHJlY29yZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGw7XG4gICAgICAvLyBsZXQgYF9wcmV2aW91c01hcEhlYWRgIGNvbnRhaW4gdGhlIHN0YXRlIG9mIHRoZSBtYXAgYmVmb3JlIHRoZSBjaGFuZ2VzXG4gICAgICB0aGlzLl9wcmV2aW91c01hcEhlYWQgPSB0aGlzLl9tYXBIZWFkO1xuICAgICAgZm9yIChyZWNvcmQgPSB0aGlzLl9wcmV2aW91c01hcEhlYWQ7IHJlY29yZCAhPT0gbnVsbDsgcmVjb3JkID0gcmVjb3JkLl9uZXh0KSB7XG4gICAgICAgIHJlY29yZC5fbmV4dFByZXZpb3VzID0gcmVjb3JkLl9uZXh0O1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgYHJlY29yZC5wcmV2aW91c1ZhbHVlYCB3aXRoIHRoZSB2YWx1ZSBvZiB0aGUgaXRlbSBiZWZvcmUgdGhlIGNoYW5nZXNcbiAgICAgIC8vIFdlIG5lZWQgdG8gdXBkYXRlIGFsbCBjaGFuZ2VkIGl0ZW1zICh0aGF0J3MgdGhvc2Ugd2hpY2ggaGF2ZSBiZWVuIGFkZGVkIGFuZCBjaGFuZ2VkKVxuICAgICAgZm9yIChyZWNvcmQgPSB0aGlzLl9jaGFuZ2VzSGVhZDsgcmVjb3JkICE9PSBudWxsOyByZWNvcmQgPSByZWNvcmQuX25leHRDaGFuZ2VkKSB7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1ZhbHVlID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAocmVjb3JkID0gdGhpcy5fYWRkaXRpb25zSGVhZDsgcmVjb3JkICE9IG51bGw7IHJlY29yZCA9IHJlY29yZC5fbmV4dEFkZGVkKSB7XG4gICAgICAgIHJlY29yZC5wcmV2aW91c1ZhbHVlID0gcmVjb3JkLmN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2hhbmdlc0hlYWQgPSB0aGlzLl9jaGFuZ2VzVGFpbCA9IG51bGw7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNIZWFkID0gdGhpcy5fYWRkaXRpb25zVGFpbCA9IG51bGw7XG4gICAgICB0aGlzLl9yZW1vdmFsc0hlYWQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB0aGUgcmVjb3JkIG9yIGEgZ2l2ZW4ga2V5IHRvIHRoZSBsaXN0IG9mIGNoYW5nZXMgb25seSB3aGVuIHRoZSB2YWx1ZSBoYXMgYWN0dWFsbHkgY2hhbmdlZFxuICBwcml2YXRlIF9tYXliZUFkZFRvQ2hhbmdlcyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPiwgbmV3VmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICghbG9vc2VJZGVudGljYWwobmV3VmFsdWUsIHJlY29yZC5jdXJyZW50VmFsdWUpKSB7XG4gICAgICByZWNvcmQucHJldmlvdXNWYWx1ZSA9IHJlY29yZC5jdXJyZW50VmFsdWU7XG4gICAgICByZWNvcmQuY3VycmVudFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl9hZGRUb0NoYW5nZXMocmVjb3JkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb0FkZGl0aW9ucyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPikge1xuICAgIGlmICh0aGlzLl9hZGRpdGlvbnNIZWFkID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNIZWFkID0gdGhpcy5fYWRkaXRpb25zVGFpbCA9IHJlY29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWRkaXRpb25zVGFpbCAhLl9uZXh0QWRkZWQgPSByZWNvcmQ7XG4gICAgICB0aGlzLl9hZGRpdGlvbnNUYWlsID0gcmVjb3JkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvQ2hhbmdlcyhyZWNvcmQ6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPikge1xuICAgIGlmICh0aGlzLl9jaGFuZ2VzSGVhZCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fY2hhbmdlc0hlYWQgPSB0aGlzLl9jaGFuZ2VzVGFpbCA9IHJlY29yZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2hhbmdlc1RhaWwgIS5fbmV4dENoYW5nZWQgPSByZWNvcmQ7XG4gICAgICB0aGlzLl9jaGFuZ2VzVGFpbCA9IHJlY29yZDtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHByaXZhdGUgX2ZvckVhY2g8SywgVj4ob2JqOiBNYXA8SywgVj58e1trOiBzdHJpbmddOiBWfSwgZm46ICh2OiBWLCBrOiBhbnkpID0+IHZvaWQpIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgICBvYmouZm9yRWFjaChmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrID0+IGZuKG9ialtrXSwgaykpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj4gaW1wbGVtZW50cyBLZXlWYWx1ZUNoYW5nZVJlY29yZDxLLCBWPiB7XG4gIHByZXZpb3VzVmFsdWU6IFZ8bnVsbCA9IG51bGw7XG4gIGN1cnJlbnRWYWx1ZTogVnxudWxsID0gbnVsbDtcblxuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0UHJldmlvdXM6IEtleVZhbHVlQ2hhbmdlUmVjb3JkXzxLLCBWPnxudWxsID0gbnVsbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfbmV4dDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGwgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9wcmV2OiBLZXlWYWx1ZUNoYW5nZVJlY29yZF88SywgVj58bnVsbCA9IG51bGw7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX25leHRBZGRlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGwgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0UmVtb3ZlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGwgPSBudWxsO1xuICAvKiogQGludGVybmFsICovXG4gIF9uZXh0Q2hhbmdlZDogS2V5VmFsdWVDaGFuZ2VSZWNvcmRfPEssIFY+fG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBrZXk6IEspIHt9XG59XG4iXX0=