import { stringify } from '../util/stringify';
import { RuntimeError } from './error_code';
import { TVIEW } from './interfaces/view';
import { INTERPOLATION_DELIMITER, stringifyForError } from './util/misc_utils';
/** Called when directives inject each other (creating a circular dependency) */
export function throwCyclicDependencyError(token, path) {
    const depPath = path ? `. Dependency path: ${path.join(' > ')} > ${token}` : '';
    throw new RuntimeError("200" /* CYCLIC_DI_DEPENDENCY */, `Circular dependency in DI detected for ${token}${depPath}`);
}
/** Called when there are multiple component selectors that match a given node */
export function throwMultipleComponentError(tNode) {
    throw new RuntimeError("300" /* MULTIPLE_COMPONENTS_MATCH */, `Multiple components match node with tagname ${tNode.value}`);
}
export function throwMixedMultiProviderError() {
    throw new Error(`Cannot mix multi providers and regular providers`);
}
export function throwInvalidProviderError(ngModuleType, providers, provider) {
    let ngModuleDetail = '';
    if (ngModuleType && providers) {
        const providerDetail = providers.map(v => v == provider ? '?' + provider + '?' : '...');
        ngModuleDetail =
            ` - only instances of Provider and Type are allowed, got: [${providerDetail.join(', ')}]`;
    }
    throw new Error(`Invalid provider for the NgModule '${stringify(ngModuleType)}'` + ngModuleDetail);
}
/** Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on. */
export function throwErrorIfNoChangesMode(creationMode, oldValue, currValue, propName) {
    const field = propName ? ` for '${propName}'` : '';
    let msg = `ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value${field}: '${oldValue}'. Current value: '${currValue}'.`;
    if (creationMode) {
        msg +=
            ` It seems like the view has been created after its parent and its children have been dirty checked.` +
                ` Has it been created in a change detection hook?`;
    }
    // TODO: include debug context, see `viewDebugError` function in
    // `packages/core/src/view/errors.ts` for reference.
    throw new RuntimeError("100" /* EXPRESSION_CHANGED_AFTER_CHECKED */, msg);
}
function constructDetailsForInterpolation(lView, rootIndex, expressionIndex, meta, changedValue) {
    const [propName, prefix, ...chunks] = meta.split(INTERPOLATION_DELIMITER);
    let oldValue = prefix, newValue = prefix;
    for (let i = 0; i < chunks.length; i++) {
        const slotIdx = rootIndex + i;
        oldValue += `${lView[slotIdx]}${chunks[i]}`;
        newValue += `${slotIdx === expressionIndex ? changedValue : lView[slotIdx]}${chunks[i]}`;
    }
    return { propName, oldValue, newValue };
}
/**
 * Constructs an object that contains details for the ExpressionChangedAfterItHasBeenCheckedError:
 * - property name (for property bindings or interpolations)
 * - old and new values, enriched using information from metadata
 *
 * More information on the metadata storage format can be found in `storePropertyBindingMetadata`
 * function description.
 */
export function getExpressionChangedErrorDetails(lView, bindingIndex, oldValue, newValue) {
    const tData = lView[TVIEW].data;
    const metadata = tData[bindingIndex];
    if (typeof metadata === 'string') {
        // metadata for property interpolation
        if (metadata.indexOf(INTERPOLATION_DELIMITER) > -1) {
            return constructDetailsForInterpolation(lView, bindingIndex, bindingIndex, metadata, newValue);
        }
        // metadata for property binding
        return { propName: metadata, oldValue, newValue };
    }
    // metadata is not available for this expression, check if this expression is a part of the
    // property interpolation by going from the current binding index left and look for a string that
    // contains INTERPOLATION_DELIMITER, the layout in tView.data for this case will look like this:
    // [..., 'id�Prefix � and � suffix', null, null, null, ...]
    if (metadata === null) {
        let idx = bindingIndex - 1;
        while (typeof tData[idx] !== 'string' && tData[idx + 1] === null) {
            idx--;
        }
        const meta = tData[idx];
        if (typeof meta === 'string') {
            const matches = meta.match(new RegExp(INTERPOLATION_DELIMITER, 'g'));
            // first interpolation delimiter separates property name from interpolation parts (in case of
            // property interpolations), so we subtract one from total number of found delimiters
            if (matches && (matches.length - 1) > bindingIndex - idx) {
                return constructDetailsForInterpolation(lView, idx, bindingIndex, meta, newValue);
            }
        }
    }
    return { propName: undefined, oldValue, newValue };
}
/** Throws an error when a token is not found in DI. */
export function throwProviderNotFoundError(token, injectorName) {
    const injectorDetails = injectorName ? ` in ${injectorName}` : '';
    throw new RuntimeError("201" /* PROVIDER_NOT_FOUND */, `No provider for ${stringifyForError(token)} found${injectorDetails}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU0EsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQW1CLE1BQU0sY0FBYyxDQUFDO0FBRzVELE9BQU8sRUFBUSxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUk3RSxnRkFBZ0Y7QUFDaEYsTUFBTSxVQUFVLDBCQUEwQixDQUFDLEtBQWEsRUFBRSxJQUFlO0lBQ3ZFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsc0JBQXNCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoRixNQUFNLElBQUksWUFBWSxtQ0FFbEIsMENBQTBDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFFRCxpRkFBaUY7QUFDakYsTUFBTSxVQUFVLDJCQUEyQixDQUFDLEtBQVk7SUFDdEQsTUFBTSxJQUFJLFlBQVksd0NBRWxCLCtDQUErQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7QUFDdEUsQ0FBQztBQUVELE1BQU0sVUFBVSx5QkFBeUIsQ0FDckMsWUFBZ0MsRUFBRSxTQUFpQixFQUFFLFFBQWM7SUFDckUsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLElBQUksWUFBWSxJQUFJLFNBQVMsRUFBRTtRQUM3QixNQUFN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b2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0luamVjdG9yVHlwZX0gZnJvbSAnLi4vZGkvaW50ZXJmYWNlL2RlZnMnO1xuaW1wb3J0IHtzdHJpbmdpZnl9IGZyb20gJy4uL3V0aWwvc3RyaW5naWZ5JztcbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuL2Vycm9yX2NvZGUnO1xuXG5pbXBvcnQge1ROb2RlfSBmcm9tICcuL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge0xWaWV3LCBUVklFV30gZnJvbSAnLi9pbnRlcmZhY2VzL3ZpZXcnO1xuaW1wb3J0IHtJTlRFUlBPTEFUSU9OX0RFTElNSVRFUiwgc3RyaW5naWZ5Rm9yRXJyb3J9IGZyb20gJy4vdXRpbC9taXNjX3V0aWxzJztcblxuXG5cbi8qKiBDYWxsZWQgd2hlbiBkaXJlY3RpdmVzIGluamVjdCBlYWNoIG90aGVyIChjcmVhdGluZyBhIGNpcmN1bGFyIGRlcGVuZGVuY3kpICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dDeWNsaWNEZXBlbmRlbmN5RXJyb3IodG9rZW46IHN0cmluZywgcGF0aD86IHN0cmluZ1tdKTogbmV2ZXIge1xuICBjb25zdCBkZXBQYXRoID0gcGF0aCA/IGAuIERlcGVuZGVuY3kgcGF0aDogJHtwYXRoLmpvaW4oJyA+ICcpfSA+ICR7dG9rZW59YCA6ICcnO1xuICB0aHJvdyBuZXcgUnVudGltZUVycm9yKFxuICAgICAgUnVudGltZUVycm9yQ29kZS5DWUNMSUNfRElfREVQRU5ERU5DWSxcbiAgICAgIGBDaXJjdWxhciBkZXBlbmRlbmN5IGluIERJIGRldGVjdGVkIGZvciAke3Rva2VufSR7ZGVwUGF0aH1gKTtcbn1cblxuLyoqIENhbGxlZCB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBjb21wb25lbnQgc2VsZWN0b3JzIHRoYXQgbWF0Y2ggYSBnaXZlbiBub2RlICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNdWx0aXBsZUNvbXBvbmVudEVycm9yKHROb2RlOiBUTm9kZSk6IG5ldmVyIHtcbiAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgIFJ1bnRpbWVFcnJvckNvZGUuTVVMVElQTEVfQ09NUE9ORU5UU19NQVRDSCxcbiAgICAgIGBNdWx0aXBsZSBjb21wb25lbnRzIG1hdGNoIG5vZGUgd2l0aCB0YWduYW1lICR7dE5vZGUudmFsdWV9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01peGVkTXVsdGlQcm92aWRlckVycm9yKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBtaXggbXVsdGkgcHJvdmlkZXJzIGFuZCByZWd1bGFyIHByb3ZpZGVyc2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dJbnZhbGlkUHJvdmlkZXJFcnJvcihcbiAgICBuZ01vZHVsZVR5cGU/OiBJbmplY3RvclR5cGU8YW55PiwgcHJvdmlkZXJzPzogYW55W10sIHByb3ZpZGVyPzogYW55KSB7XG4gIGxldCBuZ01vZHVsZURldGFpbCA9ICcnO1xuICBpZiAobmdNb2R1bGVUeXBlICYmIHByb3ZpZGVycykge1xuICAgIGNvbnN0IHByb3ZpZGVyRGV0YWlsID0gcHJvdmlkZXJzLm1hcCh2ID0+IHYgPT0gcHJvdmlkZXIgPyAnPycgKyBwcm92aWRlciArICc/JyA6ICcuLi4nKTtcbiAgICBuZ01vZHVsZURldGFpbCA9XG4gICAgICAgIGAgLSBvbmx5IGluc3RhbmNlcyBvZiBQcm92aWRlciBhbmQgVHlwZSBhcmUgYWxsb3dlZCwgZ290OiBbJHtwcm92aWRlckRldGFpbC5qb2luKCcsICcpfV1gO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEludmFsaWQgcHJvdmlkZXIgZm9yIHRoZSBOZ01vZHVsZSAnJHtzdHJpbmdpZnkobmdNb2R1bGVUeXBlKX0nYCArIG5nTW9kdWxlRGV0YWlsKTtcbn1cblxuLyoqIFRocm93cyBhbiBFeHByZXNzaW9uQ2hhbmdlZEFmdGVyQ2hlY2tlZCBlcnJvciBpZiBjaGVja05vQ2hhbmdlcyBtb2RlIGlzIG9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3JJZk5vQ2hhbmdlc01vZGUoXG4gICAgY3JlYXRpb25Nb2RlOiBib29sZWFuLCBvbGRWYWx1ZTogYW55LCBjdXJyVmFsdWU6IGFueSwgcHJvcE5hbWU/OiBzdHJpbmcpOiBuZXZlcnx2b2lkIHtcbiAgY29uc3QgZmllbGQgPSBwcm9wTmFtZSA/IGAgZm9yICcke3Byb3BOYW1lfSdgIDogJyc7XG4gIGxldCBtc2cgPVxuICAgICAgYEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I6IEV4cHJlc3Npb24gaGFzIGNoYW5nZWQgYWZ0ZXIgaXQgd2FzIGNoZWNrZWQuIFByZXZpb3VzIHZhbHVlJHtcbiAgICAgICAgICBmaWVsZH06ICcke29sZFZhbHVlfScuIEN1cnJlbnQgdmFsdWU6ICcke2N1cnJWYWx1ZX0nLmA7XG4gIGlmIChjcmVhdGlvbk1vZGUpIHtcbiAgICBtc2cgKz1cbiAgICAgICAgYCBJdCBzZWVtcyBsaWtlIHRoZSB2aWV3IGhhcyBiZWVuIGNyZWF0ZWQgYWZ0ZXIgaXRzIHBhcmVudCBhbmQgaXRzIGNoaWxkcmVuIGhhdmUgYmVlbiBkaXJ0eSBjaGVja2VkLmAgK1xuICAgICAgICBgIEhhcyBpdCBiZWVuIGNyZWF0ZWQgaW4gYSBjaGFuZ2UgZGV0ZWN0aW9uIGhvb2s/YDtcbiAgfVxuICAvLyBUT0RPOiBpbmNsdWRlIGRlYnVnIGNvbnRleHQsIHNlZSBgdmlld0RlYnVnRXJyb3JgIGZ1bmN0aW9uIGluXG4gIC8vIGBwYWNrYWdlcy9jb3JlL3NyYy92aWV3L2Vycm9ycy50c2AgZm9yIHJlZmVyZW5jZS5cbiAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLkVYUFJFU1NJT05fQ0hBTkdFRF9BRlRFUl9DSEVDS0VELCBtc2cpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3REZXRhaWxzRm9ySW50ZXJwb2xhdGlvbihcbiAgICBsVmlldzogTFZpZXcsIHJvb3RJbmRleDogbnVtYmVyLCBleHByZXNzaW9uSW5kZXg6IG51bWJlciwgbWV0YTogc3RyaW5nLCBjaGFuZ2VkVmFsdWU6IGFueSkge1xuICBjb25zdCBbcHJvcE5hbWUsIHByZWZpeCwgLi4uY2h1bmtzXSA9IG1ldGEuc3BsaXQoSU5URVJQT0xBVElPTl9ERUxJTUlURVIpO1xuICBsZXQgb2xkVmFsdWUgPSBwcmVmaXgsIG5ld1ZhbHVlID0gcHJlZml4O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNsb3RJZHggPSByb290SW5kZXggKyBpO1xuICAgIG9sZFZhbHVlICs9IGAke2xWaWV3W3Nsb3RJZHhdfSR7Y2h1bmtzW2ldfWA7XG4gICAgbmV3VmFsdWUgKz0gYCR7c2xvdElkeCA9PT0gZXhwcmVzc2lvbkluZGV4ID8gY2hhbmdlZFZhbHVlIDogbFZpZXdbc2xvdElkeF19JHtjaHVua3NbaV19YDtcbiAgfVxuICByZXR1cm4ge3Byb3BOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWV9O1xufVxuXG4vKipcbiAqIENvbnN0cnVjdHMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgZGV0YWlscyBmb3IgdGhlIEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3I6XG4gKiAtIHByb3BlcnR5IG5hbWUgKGZvciBwcm9wZXJ0eSBiaW5kaW5ncyBvciBpbnRlcnBvbGF0aW9ucylcbiAqIC0gb2xkIGFuZCBuZXcgdmFsdWVzLCBlbnJpY2hlZCB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIG1ldGFkYXRhXG4gKlxuICogTW9yZSBpbmZvcm1hdGlvbiBvbiB0aGUgbWV0YWRhdGEgc3RvcmFnZSBmb3JtYXQgY2FuIGJlIGZvdW5kIGluIGBzdG9yZVByb3BlcnR5QmluZGluZ01ldGFkYXRhYFxuICogZnVuY3Rpb24gZGVzY3JpcHRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFeHByZXNzaW9uQ2hhbmdlZEVycm9yRGV0YWlscyhcbiAgICBsVmlldzogTFZpZXcsIGJpbmRpbmdJbmRleDogbnVtYmVyLCBvbGRWYWx1ZTogYW55LFxuICAgIG5ld1ZhbHVlOiBhbnkpOiB7cHJvcE5hbWU/OiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnl9IHtcbiAgY29uc3QgdERhdGEgPSBsVmlld1tUVklFV10uZGF0YTtcbiAgY29uc3QgbWV0YWRhdGEgPSB0RGF0YVtiaW5kaW5nSW5kZXhdO1xuXG4gIGlmICh0eXBlb2YgbWV0YWRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gbWV0YWRhdGEgZm9yIHByb3BlcnR5IGludGVycG9sYXRpb25cbiAgICBpZiAobWV0YWRhdGEuaW5kZXhPZihJTlRFUlBPTEFUSU9OX0RFTElNSVRFUikgPiAtMSkge1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdERldGFpbHNGb3JJbnRlcnBvbGF0aW9uKFxuICAgICAgICAgIGxWaWV3LCBiaW5kaW5nSW5kZXgsIGJpbmRpbmdJbmRleCwgbWV0YWRhdGEsIG5ld1ZhbHVlKTtcbiAgICB9XG4gICAgLy8gbWV0YWRhdGEgZm9yIHByb3BlcnR5IGJpbmRpbmdcbiAgICByZXR1cm4ge3Byb3BOYW1lOiBtZXRhZGF0YSwgb2xkVmFsdWUsIG5ld1ZhbHVlfTtcbiAgfVxuXG4gIC8vIG1ldGFkYXRhIGlzIG5vdCBhdmFpbGFibGUgZm9yIHRoaXMgZXhwcmVzc2lvbiwgY2hlY2sgaWYgdGhpcyBleHByZXNzaW9uIGlzIGEgcGFydCBvZiB0aGVcbiAgLy8gcHJvcGVydHkgaW50ZXJwb2xhdGlvbiBieSBnb2luZyBmcm9tIHRoZSBjdXJyZW50IGJpbmRpbmcgaW5kZXggbGVmdCBhbmQgbG9vayBmb3IgYSBzdHJpbmcgdGhhdFxuICAvLyBjb250YWlucyBJTlRFUlBPTEFUSU9OX0RFTElNSVRFUiwgdGhlIGxheW91dCBpbiB0Vmlldy5kYXRhIGZvciB0aGlzIGNhc2Ugd2lsbCBsb29rIGxpa2UgdGhpczpcbiAgLy8gWy4uLiwgJ2lk77+9UHJlZml4IO+/vSBhbmQg77+9IHN1ZmZpeCcsIG51bGwsIG51bGwsIG51bGwsIC4uLl1cbiAgaWYgKG1ldGFkYXRhID09PSBudWxsKSB7XG4gICAgbGV0IGlkeCA9IGJpbmRpbmdJbmRleCAtIDE7XG4gICAgd2hpbGUgKHR5cGVvZiB0RGF0YVtpZHhdICE9PSAnc3RyaW5nJyAmJiB0RGF0YVtpZHggKyAxXSA9PT0gbnVsbCkge1xuICAgICAgaWR4LS07XG4gICAgfVxuICAgIGNvbnN0IG1ldGEgPSB0RGF0YVtpZHhdO1xuICAgIGlmICh0eXBlb2YgbWV0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBtZXRhLm1hdGNoKG5ldyBSZWdFeHAoSU5URVJQT0xBVElPTl9ERUxJTUlURVIsICdnJykpO1xuICAgICAgLy8gZmlyc3QgaW50ZXJwb2xhdGlvbiBkZWxpbWl0ZXIgc2VwYXJhdGVzIHByb3BlcnR5IG5hbWUgZnJvbSBpbnRlcnBvbGF0aW9uIHBhcnRzIChpbiBjYXNlIG9mXG4gICAgICAvLyBwcm9wZXJ0eSBpbnRlcnBvbGF0aW9ucyksIHNvIHdlIHN1YnRyYWN0IG9uZSBmcm9tIHRvdGFsIG51bWJlciBvZiBmb3VuZCBkZWxpbWl0ZXJzXG4gICAgICBpZiAobWF0Y2hlcyAmJiAobWF0Y2hlcy5sZW5ndGggLSAxKSA+IGJpbmRpbmdJbmRleCAtIGlkeCkge1xuICAgICAgICByZXR1cm4gY29uc3RydWN0RGV0YWlsc0ZvckludGVycG9sYXRpb24obFZpZXcsIGlkeCwgYmluZGluZ0luZGV4LCBtZXRhLCBuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB7cHJvcE5hbWU6IHVuZGVmaW5lZCwgb2xkVmFsdWUsIG5ld1ZhbHVlfTtcbn1cblxuLyoqIFRocm93cyBhbiBlcnJvciB3aGVuIGEgdG9rZW4gaXMgbm90IGZvdW5kIGluIERJLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93UHJvdmlkZXJOb3RGb3VuZEVycm9yKHRva2VuOiBhbnksIGluamVjdG9yTmFtZT86IHN0cmluZyk6IG5ldmVyIHtcbiAgY29uc3QgaW5qZWN0b3JEZXRhaWxzID0gaW5qZWN0b3JOYW1lID8gYCBpbiAke2luamVjdG9yTmFtZX1gIDogJyc7XG4gIHRocm93IG5ldyBSdW50aW1lRXJyb3IoXG4gICAgICBSdW50aW1lRXJyb3JDb2RlLlBST1ZJREVSX05PVF9GT1VORCxcbiAgICAgIGBObyBwcm92aWRlciBmb3IgJHtzdHJpbmdpZnlGb3JFcnJvcih0b2tlbil9IGZvdW5kJHtpbmplY3RvckRldGFpbHN9YCk7XG59XG4iXX0=