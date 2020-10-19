/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertNumber, assertString } from '../../util/assert';
import { COMMENT_MARKER, ELEMENT_MARKER, getInstructionFromI18nMutateOpCode, getParentFromI18nMutateOpCode, getRefFromI18nMutateOpCode } from '../interfaces/i18n';
/**
 * Converts `I18nUpdateOpCodes` array into a human readable format.
 *
 * This function is attached to the `I18nUpdateOpCodes.debug` property if `ngDevMode` is enabled.
 * This function provides a human readable view of the opcodes. This is useful when debugging the
 * application as well as writing more readable tests.
 *
 * @param this `I18nUpdateOpCodes` if attached as a method.
 * @param opcodes `I18nUpdateOpCodes` if invoked as a function.
 */
export function i18nUpdateOpCodesToString(opcodes) {
    const parser = new OpCodeParser(opcodes || (Array.isArray(this) ? this : []));
    let lines = [];
    function consumeOpCode(value) {
        const ref = value >>> 2 /* SHIFT_REF */;
        const opCode = value & 3 /* MASK_OPCODE */;
        switch (opCode) {
            case 0 /* Text */:
                return `(lView[${ref}] as Text).textContent = $$$`;
            case 1 /* Attr */:
                const attrName = parser.consumeString();
                const sanitizationFn = parser.consumeFunction();
                const value = sanitizationFn ? `(${sanitizationFn})($$$)` : '$$$';
                return `(lView[${ref}] as Element).setAttribute('${attrName}', ${value})`;
            case 2 /* IcuSwitch */:
                return `icuSwitchCase(lView[${ref}] as Comment, ${parser.consumeNumber()}, $$$)`;
            case 3 /* IcuUpdate */:
                return `icuUpdateCase(lView[${ref}] as Comment, ${parser.consumeNumber()})`;
        }
        throw new Error('unexpected OpCode');
    }
    while (parser.hasMore()) {
        let mask = parser.consumeNumber();
        let size = parser.consumeNumber();
        const end = parser.i + size;
        const statements = [];
        let statement = '';
        while (parser.i < end) {
            let value = parser.consumeNumberOrString();
            if (typeof value === 'string') {
                statement += value;
            }
            else if (value < 0) {
                // Negative numbers are ref indexes
                statement += '${lView[' + (0 - value) + ']}';
            }
            else {
                // Positive numbers are operations.
                const opCodeText = consumeOpCode(value);
                statements.push(opCodeText.replace('$$$', '`' + statement + '`') + ';');
                statement = '';
            }
        }
        lines.push(`if (mask & 0b${mask.toString(2)}) { ${statements.join(' ')} }`);
    }
    return lines;
}
/**
 * Converts `I18nMutableOpCodes` array into a human readable format.
 *
 * This function is attached to the `I18nMutableOpCodes.debug` if `ngDevMode` is enabled. This
 * function provides a human readable view of the opcodes. This is useful when debugging the
 * application as well as writing more readable tests.
 *
 * @param this `I18nMutableOpCodes` if attached as a method.
 * @param opcodes `I18nMutableOpCodes` if invoked as a function.
 */
export function i18nMutateOpCodesToString(opcodes) {
    const parser = new OpCodeParser(opcodes || (Array.isArray(this) ? this : []));
    let lines = [];
    function consumeOpCode(opCode) {
        const parent = getParentFromI18nMutateOpCode(opCode);
        const ref = getRefFromI18nMutateOpCode(opCode);
        switch (getInstructionFromI18nMutateOpCode(opCode)) {
            case 0 /* Select */:
                lastRef = ref;
                return '';
            case 1 /* AppendChild */:
                return `(lView[${parent}] as Element).appendChild(lView[${lastRef}])`;
            case 3 /* Remove */:
                return `(lView[${parent}] as Element).remove(lView[${ref}])`;
            case 4 /* Attr */:
                return `(lView[${ref}] as Element).setAttribute("${parser.consumeString()}", "${parser.consumeString()}")`;
            case 5 /* ElementEnd */:
                return `setCurrentTNode(tView.data[${ref}] as TNode)`;
            case 6 /* RemoveNestedIcu */:
                return `removeNestedICU(${ref})`;
        }
        throw new Error('Unexpected OpCode');
    }
    let lastRef = -1;
    while (parser.hasMore()) {
        let value = parser.consumeNumberStringOrMarker();
        if (value === COMMENT_MARKER) {
            const text = parser.consumeString();
            lastRef = parser.consumeNumber();
            lines.push(`lView[${lastRef}] = document.createComment("${text}")`);
        }
        else if (value === ELEMENT_MARKER) {
            const text = parser.consumeString();
            lastRef = parser.consumeNumber();
            lines.push(`lView[${lastRef}] = document.createElement("${text}")`);
        }
        else if (typeof value === 'string') {
            lastRef = parser.consumeNumber();
            lines.push(`lView[${lastRef}] = document.createTextNode("${value}")`);
        }
        else if (typeof value === 'number') {
            const line = consumeOpCode(value);
            line && lines.push(line);
        }
        else {
            throw new Error('Unexpected value');
        }
    }
    return lines;
}
class OpCodeParser {
    constructor(codes) {
        this.i = 0;
        this.codes = codes;
    }
    hasMore() {
        return this.i < this.codes.length;
    }
    consumeNumber() {
        let value = this.codes[this.i++];
        assertNumber(value, 'expecting number in OpCode');
        return value;
    }
    consumeString() {
        let value = this.codes[this.i++];
        assertString(value, 'expecting string in OpCode');
        return value;
    }
    consumeFunction() {
        let value = this.codes[this.i++];
        if (value === null || typeof value === 'function') {
            return value;
        }
        throw new Error('expecting function in OpCode');
    }
    consumeNumberOrString() {
        let value = this.codes[this.i++];
        if (typeof value === 'string') {
            return value;
        }
        assertNumber(value, 'expecting number or string in OpCode');
        return value;
    }
    consumeNumberStringOrMarker() {
        let value = this.codes[this.i++];
        if (typeof value === 'string' || typeof value === 'number' || value == COMMENT_MARKER ||
            value == ELEMENT_MARKER) {
            return value;
        }
        assertNumber(value, 'expecting number, string, COMMENT_MARKER or ELEMENT_MARKER in OpCode');
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9kZWJ1Zy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaTE4bi9pMThuX2RlYnVnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFN0QsT0FBTyxFQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsa0NBQWtDLEVBQUUsNkJBQTZCLEVBQUUsMEJBQTBCLEVBQTJFLE1BQU0sb0JBQW9CLENBQUM7QUFFM087Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUNQLE9BQTJCO0lBQzNELE1BQU0sTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RSxJQUFJLEtBQUssR0FBYSxFQUFFLENBQUM7SUFFekIsU0FBUyxhQUFhLENBQUMsS0FBYTtRQUNsQyxNQUFNLEdBQUcsR0FBRyxLQUFLLHNCQUErQixDQUFDO1FBQ2pELE1BQU0sTUFBTSxHQUFHLEtBQUssc0JBQStCLENBQUM7UUFDcEQsUUFBUSxNQUFNLEVBQUU7WUFDZDtnQkFDRSxPQUFPLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQztZQUNyRDtnQkFDRSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDaEQsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2xFLE9BQU8sVUFBVSxHQUFHLCtC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QUMsQ0FBQztRQUM1RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCwyQkFBMkI7UUFDekIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLGNBQWM7WUFDakYsS0FBSyxJQUFJLGNBQWMsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsWUFBWSxDQUFDLEtBQUssRUFBRSxzRUFBc0UsQ0FBQyxDQUFDO1FBQzVGLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7YXNzZXJ0TnVtYmVyLCBhc3NlcnRTdHJpbmd9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHtDT01NRU5UX01BUktFUiwgRUxFTUVOVF9NQVJLRVIsIGdldEluc3RydWN0aW9uRnJvbUkxOG5NdXRhdGVPcENvZGUsIGdldFBhcmVudEZyb21JMThuTXV0YXRlT3BDb2RlLCBnZXRSZWZGcm9tSTE4bk11dGF0ZU9wQ29kZSwgSTE4bk11dGF0ZU9wQ29kZSwgSTE4bk11dGF0ZU9wQ29kZXMsIEkxOG5VcGRhdGVPcENvZGUsIEkxOG5VcGRhdGVPcENvZGVzfSBmcm9tICcuLi9pbnRlcmZhY2VzL2kxOG4nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBJMThuVXBkYXRlT3BDb2Rlc2AgYXJyYXkgaW50byBhIGh1bWFuIHJlYWRhYmxlIGZvcm1hdC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGF0dGFjaGVkIHRvIHRoZSBgSTE4blVwZGF0ZU9wQ29kZXMuZGVidWdgIHByb3BlcnR5IGlmIGBuZ0Rldk1vZGVgIGlzIGVuYWJsZWQuXG4gKiBUaGlzIGZ1bmN0aW9uIHByb3ZpZGVzIGEgaHVtYW4gcmVhZGFibGUgdmlldyBvZiB0aGUgb3Bjb2Rlcy4gVGhpcyBpcyB1c2VmdWwgd2hlbiBkZWJ1Z2dpbmcgdGhlXG4gKiBhcHBsaWNhdGlvbiBhcyB3ZWxsIGFzIHdyaXRpbmcgbW9yZSByZWFkYWJsZSB0ZXN0cy5cbiAqXG4gKiBAcGFyYW0gdGhpcyBgSTE4blVwZGF0ZU9wQ29kZXNgIGlmIGF0dGFjaGVkIGFzIGEgbWV0aG9kLlxuICogQHBhcmFtIG9wY29kZXMgYEkxOG5VcGRhdGVPcENvZGVzYCBpZiBpbnZva2VkIGFzIGEgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpMThuVXBkYXRlT3BDb2Rlc1RvU3RyaW5nKFxuICAgIHRoaXM6IEkxOG5VcGRhdGVPcENvZGVzfHZvaWQsIG9wY29kZXM/OiBJMThuVXBkYXRlT3BDb2Rlcyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgcGFyc2VyID0gbmV3IE9wQ29kZVBhcnNlcihvcGNvZGVzIHx8IChBcnJheS5pc0FycmF5KHRoaXMpID8gdGhpcyA6IFtdKSk7XG4gIGxldCBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICBmdW5jdGlvbiBjb25zdW1lT3BDb2RlKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlZiA9IHZhbHVlID4+PiBJMThuVXBkYXRlT3BDb2RlLlNISUZUX1JFRjtcbiAgICBjb25zdCBvcENvZGUgPSB2YWx1ZSAmIEkxOG5VcGRhdGVPcENvZGUuTUFTS19PUENPREU7XG4gICAgc3dpdGNoIChvcENvZGUpIHtcbiAgICAgIGNhc2UgSTE4blVwZGF0ZU9wQ29kZS5UZXh0OlxuICAgICAgICByZXR1cm4gYChsVmlld1ske3JlZn1dIGFzIFRleHQpLnRleHRDb250ZW50ID0gJCQkYDtcbiAgICAgIGNhc2UgSTE4blVwZGF0ZU9wQ29kZS5BdHRyOlxuICAgICAgICBjb25zdCBhdHRyTmFtZSA9IHBhcnNlci5jb25zdW1lU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IHNhbml0aXphdGlvbkZuID0gcGFyc2VyLmNvbnN1bWVGdW5jdGlvbigpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHNhbml0aXphdGlvbkZuID8gYCgke3Nhbml0aXphdGlvbkZufSkoJCQkKWAgOiAnJCQkJztcbiAgICAgICAgcmV0dXJuIGAobFZpZXdbJHtyZWZ9XSBhcyBFbGVtZW50KS5zZXRBdHRyaWJ1dGUoJyR7YXR0ck5hbWV9JywgJHt2YWx1ZX0pYDtcbiAgICAgIGNhc2UgSTE4blVwZGF0ZU9wQ29kZS5JY3VTd2l0Y2g6XG4gICAgICAgIHJldHVybiBgaWN1U3dpdGNoQ2FzZShsVmlld1ske3JlZn1dIGFzIENvbW1lbnQsICR7cGFyc2VyLmNvbnN1bWVOdW1iZXIoKX0sICQkJClgO1xuICAgICAgY2FzZSBJMThuVXBkYXRlT3BDb2RlLkljdVVwZGF0ZTpcbiAgICAgICAgcmV0dXJuIGBpY3VVcGRhdGVDYXNlKGxWaWV3WyR7cmVmfV0gYXMgQ29tbWVudCwgJHtwYXJzZXIuY29uc3VtZU51bWJlcigpfSlgO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgT3BDb2RlJyk7XG4gIH1cblxuXG4gIHdoaWxlIChwYXJzZXIuaGFzTW9yZSgpKSB7XG4gICAgbGV0IG1hc2sgPSBwYXJzZXIuY29uc3VtZU51bWJlcigpO1xuICAgIGxldCBzaXplID0gcGFyc2VyLmNvbnN1bWVOdW1iZXIoKTtcbiAgICBjb25zdCBlbmQgPSBwYXJzZXIuaSArIHNpemU7XG4gICAgY29uc3Qgc3RhdGVtZW50czogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgc3RhdGVtZW50ID0gJyc7XG4gICAgd2hpbGUgKHBhcnNlci5pIDwgZW5kKSB7XG4gICAgICBsZXQgdmFsdWUgPSBwYXJzZXIuY29uc3VtZU51bWJlck9yU3RyaW5nKCk7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBzdGF0ZW1lbnQgKz0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgICAvLyBOZWdhdGl2ZSBudW1iZXJzIGFyZSByZWYgaW5kZXhlc1xuICAgICAgICBzdGF0ZW1lbnQgKz0gJyR7bFZpZXdbJyArICgwIC0gdmFsdWUpICsgJ119JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFBvc2l0aXZlIG51bWJlcnMgYXJlIG9wZXJhdGlvbnMuXG4gICAgICAgIGNvbnN0IG9wQ29kZVRleHQgPSBjb25zdW1lT3BDb2RlKHZhbHVlKTtcbiAgICAgICAgc3RhdGVtZW50cy5wdXNoKG9wQ29kZVRleHQucmVwbGFjZSgnJCQkJywgJ2AnICsgc3RhdGVtZW50ICsgJ2AnKSArICc7Jyk7XG4gICAgICAgIHN0YXRlbWVudCA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICBsaW5lcy5wdXNoKGBpZiAobWFzayAmIDBiJHttYXNrLnRvU3RyaW5nKDIpfSkgeyAke3N0YXRlbWVudHMuam9pbignICcpfSB9YCk7XG4gIH1cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBJMThuTXV0YWJsZU9wQ29kZXNgIGFycmF5IGludG8gYSBodW1hbiByZWFkYWJsZSBmb3JtYXQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBpcyBhdHRhY2hlZCB0byB0aGUgYEkxOG5NdXRhYmxlT3BDb2Rlcy5kZWJ1Z2AgaWYgYG5nRGV2TW9kZWAgaXMgZW5hYmxlZC4gVGhpc1xuICogZnVuY3Rpb24gcHJvdmlkZXMgYSBodW1hbiByZWFkYWJsZSB2aWV3IG9mIHRoZSBvcGNvZGVzLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGRlYnVnZ2luZyB0aGVcbiAqIGFwcGxpY2F0aW9uIGFzIHdlbGwgYXMgd3JpdGluZyBtb3JlIHJlYWRhYmxlIHRlc3RzLlxuICpcbiAqIEBwYXJhbSB0aGlzIGBJMThuTXV0YWJsZU9wQ29kZXNgIGlmIGF0dGFjaGVkIGFzIGEgbWV0aG9kLlxuICogQHBhcmFtIG9wY29kZXMgYEkxOG5NdXRhYmxlT3BDb2Rlc2AgaWYgaW52b2tlZCBhcyBhIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaTE4bk11dGF0ZU9wQ29kZXNUb1N0cmluZyhcbiAgICB0aGlzOiBJMThuTXV0YXRlT3BDb2Rlc3x2b2lkLCBvcGNvZGVzPzogSTE4bk11dGF0ZU9wQ29kZXMpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IHBhcnNlciA9IG5ldyBPcENvZGVQYXJzZXIob3Bjb2RlcyB8fCAoQXJyYXkuaXNBcnJheSh0aGlzKSA/IHRoaXMgOiBbXSkpO1xuICBsZXQgbGluZXM6IHN0cmluZ1tdID0gW107XG5cbiAgZnVuY3Rpb24gY29uc3VtZU9wQ29kZShvcENvZGU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgcGFyZW50ID0gZ2V0UGFyZW50RnJvbUkxOG5NdXRhdGVPcENvZGUob3BDb2RlKTtcbiAgICBjb25zdCByZWYgPSBnZXRSZWZGcm9tSTE4bk11dGF0ZU9wQ29kZShvcENvZGUpO1xuICAgIHN3aXRjaCAoZ2V0SW5zdHJ1Y3Rpb25Gcm9tSTE4bk11dGF0ZU9wQ29kZShvcENvZGUpKSB7XG4gICAgICBjYXNlIEkxOG5NdXRhdGVPcENvZGUuU2VsZWN0OlxuICAgICAgICBsYXN0UmVmID0gcmVmO1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICBjYXNlIEkxOG5NdXRhdGVPcENvZGUuQXBwZW5kQ2hpbGQ6XG4gICAgICAgIHJldHVybiBgKGxWaWV3WyR7cGFyZW50fV0gYXMgRWxlbWVudCkuYXBwZW5kQ2hpbGQobFZpZXdbJHtsYXN0UmVmfV0pYDtcbiAgICAgIGNhc2UgSTE4bk11dGF0ZU9wQ29kZS5SZW1vdmU6XG4gICAgICAgIHJldHVybiBgKGxWaWV3WyR7cGFyZW50fV0gYXMgRWxlbWVudCkucmVtb3ZlKGxWaWV3WyR7cmVmfV0pYDtcbiAgICAgIGNhc2UgSTE4bk11dGF0ZU9wQ29kZS5BdHRyOlxuICAgICAgICByZXR1cm4gYChsVmlld1ske3JlZn1dIGFzIEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcIiR7cGFyc2VyLmNvbnN1bWVTdHJpbmcoKX1cIiwgXCIke1xuICAgICAgICAgICAgcGFyc2VyLmNvbnN1bWVTdHJpbmcoKX1cIilgO1xuICAgICAgY2FzZSBJMThuTXV0YXRlT3BDb2RlLkVsZW1lbnRFbmQ6XG4gICAgICAgIHJldHVybiBgc2V0Q3VycmVudFROb2RlKHRWaWV3LmRhdGFbJHtyZWZ9XSBhcyBUTm9kZSlgO1xuICAgICAgY2FzZSBJMThuTXV0YXRlT3BDb2RlLlJlbW92ZU5lc3RlZEljdTpcbiAgICAgICAgcmV0dXJuIGByZW1vdmVOZXN0ZWRJQ1UoJHtyZWZ9KWA7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBPcENvZGUnKTtcbiAgfVxuXG4gIGxldCBsYXN0UmVmID0gLTE7XG4gIHdoaWxlIChwYXJzZXIuaGFzTW9yZSgpKSB7XG4gICAgbGV0IHZhbHVlID0gcGFyc2VyLmNvbnN1bWVOdW1iZXJTdHJpbmdPck1hcmtlcigpO1xuICAgIGlmICh2YWx1ZSA9PT0gQ09NTUVOVF9NQVJLRVIpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBwYXJzZXIuY29uc3VtZVN0cmluZygpO1xuICAgICAgbGFzdFJlZiA9IHBhcnNlci5jb25zdW1lTnVtYmVyKCk7XG4gICAgICBsaW5lcy5wdXNoKGBsVmlld1ske2xhc3RSZWZ9XSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoXCIke3RleHR9XCIpYCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gRUxFTUVOVF9NQVJLRVIpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBwYXJzZXIuY29uc3VtZVN0cmluZygpO1xuICAgICAgbGFzdFJlZiA9IHBhcnNlci5jb25zdW1lTnVtYmVyKCk7XG4gICAgICBsaW5lcy5wdXNoKGBsVmlld1ske2xhc3RSZWZ9XSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCIke3RleHR9XCIpYCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsYXN0UmVmID0gcGFyc2VyLmNvbnN1bWVOdW1iZXIoKTtcbiAgICAgIGxpbmVzLnB1c2goYGxWaWV3WyR7bGFzdFJlZn1dID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIke3ZhbHVlfVwiKWApO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgY29uc3QgbGluZSA9IGNvbnN1bWVPcENvZGUodmFsdWUpO1xuICAgICAgbGluZSAmJiBsaW5lcy5wdXNoKGxpbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgdmFsdWUnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGluZXM7XG59XG5cblxuY2xhc3MgT3BDb2RlUGFyc2VyIHtcbiAgaTogbnVtYmVyID0gMDtcbiAgY29kZXM6IGFueVtdO1xuXG4gIGNvbnN0cnVjdG9yKGNvZGVzOiBhbnlbXSkge1xuICAgIHRoaXMuY29kZXMgPSBjb2RlcztcbiAgfVxuXG4gIGhhc01vcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaSA8IHRoaXMuY29kZXMubGVuZ3RoO1xuICB9XG5cbiAgY29uc3VtZU51bWJlcigpOiBudW1iZXIge1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuY29kZXNbdGhpcy5pKytdO1xuICAgIGFzc2VydE51bWJlcih2YWx1ZSwgJ2V4cGVjdGluZyBudW1iZXIgaW4gT3BDb2RlJyk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgY29uc3VtZVN0cmluZygpOiBzdHJpbmcge1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuY29kZXNbdGhpcy5pKytdO1xuICAgIGFzc2VydFN0cmluZyh2YWx1ZSwgJ2V4cGVjdGluZyBzdHJpbmcgaW4gT3BDb2RlJyk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgY29uc3VtZUZ1bmN0aW9uKCk6IEZ1bmN0aW9ufG51bGwge1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuY29kZXNbdGhpcy5pKytdO1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RpbmcgZnVuY3Rpb24gaW4gT3BDb2RlJyk7XG4gIH1cblxuICBjb25zdW1lTnVtYmVyT3JTdHJpbmcoKTogbnVtYmVyfHN0cmluZyB7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5jb2Rlc1t0aGlzLmkrK107XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgYXNzZXJ0TnVtYmVyKHZhbHVlLCAnZXhwZWN0aW5nIG51bWJlciBvciBzdHJpbmcgaW4gT3BDb2RlJyk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgY29uc3VtZU51bWJlclN0cmluZ09yTWFya2VyKCk6IG51bWJlcnxzdHJpbmd8Q09NTUVOVF9NQVJLRVJ8RUxFTUVOVF9NQVJLRVIge1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuY29kZXNbdGhpcy5pKytdO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgfHwgdmFsdWUgPT0gQ09NTUVOVF9NQVJLRVIgfHxcbiAgICAgICAgdmFsdWUgPT0gRUxFTUVOVF9NQVJLRVIpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgYXNzZXJ0TnVtYmVyKHZhbHVlLCAnZXhwZWN0aW5nIG51bWJlciwgc3RyaW5nLCBDT01NRU5UX01BUktFUiBvciBFTEVNRU5UX01BUktFUiBpbiBPcENvZGUnKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==