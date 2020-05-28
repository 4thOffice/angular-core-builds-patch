/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Marks that the next string is for element.
 *
 * See `I18nMutateOpCodes` documentation.
 */
export const ELEMENT_MARKER = {
    marker: 'element'
};
/**
 * Marks that the next string is for comment.
 *
 * See `I18nMutateOpCodes` documentation.
 */
export const COMMENT_MARKER = {
    marker: 'comment'
};
// Note: This hack is necessary so we don't erroneously get a circular dependency
// failure based on types.
export const unusedValueExportToPlacateAjd = 1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQXNESDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFtQjtJQUM1QyxNQUFNLEVBQUUsU0FBUztDQUNsQixDQUFDO0FBS0Y7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBbUI7SUFDNUMsTUFBTSxFQUFFLFNBQVM7Q0FDbEIsQ0FBQztBQXdTRixpRkFBaUY7QUFDakYsMEJBQTBCO0FBQzFCLE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIGBJMThuTXV0YXRlT3BDb2RlYCBkZWZpbmVzIE9wQ29kZXMgZm9yIGBJMThuTXV0YXRlT3BDb2Rlc2AgYXJyYXkuXG4gKlxuICogT3BDb2RlcyBjb250YWluIHRocmVlIHBhcnRzOlxuICogIDEpIFBhcmVudCBub2RlIGluZGV4IG9mZnNldC5cbiAqICAyKSBSZWZlcmVuY2Ugbm9kZSBpbmRleCBvZmZzZXQuXG4gKiAgMykgVGhlIE9wQ29kZSB0byBleGVjdXRlLlxuICpcbiAqIFNlZTogYEkxOG5DcmVhdGVPcENvZGVzYCBmb3IgZXhhbXBsZSBvZiB1c2FnZS5cbiAqL1xuaW1wb3J0IHtTYW5pdGl6ZXJGbn0gZnJvbSAnLi9zYW5pdGl6YXRpb24nO1xuXG5leHBvcnQgY29uc3QgZW51bSBJMThuTXV0YXRlT3BDb2RlIHtcbiAgLyoqXG4gICAqIFN0b3JlcyBzaGlmdCBhbW91bnQgZm9yIGJpdHMgMTctMyB0aGF0IGNvbnRhaW4gcmVmZXJlbmNlIGluZGV4LlxuICAgKi9cbiAgU0hJRlRfUkVGID0gMyxcbiAgLyoqXG4gICAqIFN0b3JlcyBzaGlmdCBhbW91bnQgZm9yIGJpdHMgMzEtMTcgdGhhdCBjb250YWluIHBhcmVudCBpbmRleC5cbiAgICovXG4gIFNISUZUX1BBUkVOVCA9IDE3LFxuICAvKipcbiAgICogTWFzayBmb3IgT3BDb2RlXG4gICAqL1xuICBNQVNLX09QQ09ERSA9IDBiMTExLFxuXG4gIC8qKlxuICAgKiBPcENvZGUgdG8gc2VsZWN0IGEgbm9kZS4gKG5leHQgT3BDb2RlIHdpbGwgY29udGFpbiB0aGUgb3BlcmF0aW9uLilcbiAgICovXG4gIFNlbGVjdCA9IDBiMDAwLFxuICAvKipcbiAgICogT3BDb2RlIHRvIGFwcGVuZCB0aGUgY3VycmVudCBub2RlIHRvIGBQQVJFTlRgLlxuICAgKi9cbiAgQXBwZW5kQ2hpbGQgPSAwYjAwMSxcbiAgLyoqXG4gICAqIE9wQ29kZSB0byByZW1vdmUgdGhlIGBSRUZgIG5vZGUgZnJvbSBgUEFSRU5UYC5cbiAgICovXG4gIFJlbW92ZSA9IDBiMDExLFxuICAvKipcbiAgICogT3BDb2RlIHRvIHNldCB0aGUgYXR0cmlidXRlIG9mIGEgbm9kZS5cbiAgICovXG4gIEF0dHIgPSAwYjEwMCxcbiAgLyoqXG4gICAqIE9wQ29kZSB0byBzaW11bGF0ZSBlbGVtZW50RW5kKClcbiAgICovXG4gIEVsZW1lbnRFbmQgPSAwYjEwMSxcbiAgLyoqXG4gICAqIE9wQ29kZSB0byByZWFkIHRoZSByZW1vdmUgT3BDb2RlcyBmb3IgdGhlIG5lc3RlZCBJQ1VcbiAgICovXG4gIFJlbW92ZU5lc3RlZEljdSA9IDBiMTEwLFxufVxuXG4vKipcbiAqIE1hcmtzIHRoYXQgdGhlIG5leHQgc3RyaW5nIGlzIGZvciBlbGVtZW50LlxuICpcbiAqIFNlZSBgSTE4bk11dGF0ZU9wQ29kZXNgIGRvY3VtZW50YXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBFTEVNRU5UX01BUktFUjogRUxFTUVOVF9NQVJLRVIgPSB7XG4gIG1hcmtlcjogJ2VsZW1lbnQnXG59O1xuZXhwb3J0IGludGVyZmFjZSBFTEVNRU5UX01BUktFUiB7XG4gIG1hcmtlcjogJ2VsZW1lbnQnO1xufVxuXG4vKipcbiAqIE1hcmtzIHRoYXQgdGhlIG5leHQgc3RyaW5nIGlzIGZvciBjb21tZW50LlxuICpcbiAqIFNlZSBgSTE4bk11dGF0ZU9wQ29kZXNgIGRvY3VtZW50YXRpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBDT01NRU5UX01BUktFUjogQ09NTUVOVF9NQVJLRVIgPSB7XG4gIG1hcmtlcjogJ2NvbW1lbnQnXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENPTU1FTlRfTUFSS0VSIHtcbiAgbWFya2VyOiAnY29tbWVudCc7XG59XG5cbi8qKlxuICogQXJyYXkgc3RvcmluZyBPcENvZGUgZm9yIGR5bmFtaWNhbGx5IGNyZWF0aW5nIGBpMThuYCBibG9ja3MuXG4gKlxuICogRXhhbXBsZTpcbiAqIGBgYHRzXG4gKiA8STE4bkNyZWF0ZU9wQ29kZT5bXG4gKiAgIC8vIEZvciBhZGRpbmcgdGV4dCBub2Rlc1xuICogICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgLy8gRXF1aXZhbGVudCB0bzpcbiAqICAgLy8gICBjb25zdCBub2RlID0gbFZpZXdbaW5kZXgrK10gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnYWJjJyk7XG4gKiAgIC8vICAgbFZpZXdbMV0uaW5zZXJ0QmVmb3JlKG5vZGUsIGxWaWV3WzJdKTtcbiAqICAgJ2FiYycsIDEgPDwgU0hJRlRfUEFSRU5UIHwgMiA8PCBTSElGVF9SRUYgfCBJbnNlcnRCZWZvcmUsXG4gKlxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld1tpbmRleCsrXSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCd4eXonKTtcbiAqICAgLy8gICBsVmlld1sxXS5hcHBlbmRDaGlsZChub2RlKTtcbiAqICAgJ3h5eicsIDEgPDwgU0hJRlRfUEFSRU5UIHwgQXBwZW5kQ2hpbGQsXG4gKlxuICogICAvLyBGb3IgYWRkaW5nIGVsZW1lbnQgbm9kZXNcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3W2luZGV4KytdID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gKiAgIC8vICAgbFZpZXdbMV0uaW5zZXJ0QmVmb3JlKG5vZGUsIGxWaWV3WzJdKTtcbiAqICAgRUxFTUVOVF9NQVJLRVIsICdkaXYnLCAxIDw8IFNISUZUX1BBUkVOVCB8IDIgPDwgU0hJRlRfUkVGIHwgSW5zZXJ0QmVmb3JlLFxuICpcbiAqICAgLy8gRXF1aXZhbGVudCB0bzpcbiAqICAgLy8gICBjb25zdCBub2RlID0gbFZpZXdbaW5kZXgrK10gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAqICAgLy8gICBsVmlld1sxXS5hcHBlbmRDaGlsZChub2RlKTtcbiAqICAgRUxFTUVOVF9NQVJLRVIsICdkaXYnLCAxIDw8IFNISUZUX1BBUkVOVCB8IEFwcGVuZENoaWxkLFxuICpcbiAqICAgLy8gRm9yIGFkZGluZyBjb21tZW50IG5vZGVzXG4gKiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld1tpbmRleCsrXSA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJycpO1xuICogICAvLyAgIGxWaWV3WzFdLmluc2VydEJlZm9yZShub2RlLCBsVmlld1syXSk7XG4gKiAgIENPTU1FTlRfTUFSS0VSLCAnJywgMSA8PCBTSElGVF9QQVJFTlQgfCAyIDw8IFNISUZUX1JFRiB8IEluc2VydEJlZm9yZSxcbiAqXG4gKiAgIC8vIEVxdWl2YWxlbnQgdG86XG4gKiAgIC8vICAgY29uc3Qgbm9kZSA9IGxWaWV3W2luZGV4KytdID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnJyk7XG4gKiAgIC8vICAgbFZpZXdbMV0uYXBwZW5kQ2hpbGQobm9kZSk7XG4gKiAgIENPTU1FTlRfTUFSS0VSLCAnJywgMSA8PCBTSElGVF9QQVJFTlQgfCBBcHBlbmRDaGlsZCxcbiAqXG4gKiAgIC8vIEZvciBtb3ZpbmcgZXhpc3Rpbmcgbm9kZXMgdG8gYSBkaWZmZXJlbnQgbG9jYXRpb25cbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgLy8gRXF1aXZhbGVudCB0bzpcbiAqICAgLy8gICBjb25zdCBub2RlID0gbFZpZXdbMV07XG4gKiAgIC8vICAgbFZpZXdbMl0uaW5zZXJ0QmVmb3JlKG5vZGUsIGxWaWV3WzNdKTtcbiAqICAgMSA8PCBTSElGVF9SRUYgfCBTZWxlY3QsIDIgPDwgU0hJRlRfUEFSRU5UIHwgMyA8PCBTSElGVF9SRUYgfCBJbnNlcnRCZWZvcmUsXG4gKlxuICogICAvLyBFcXVpdmFsZW50IHRvOlxuICogICAvLyAgIGNvbnN0IG5vZGUgPSBsVmlld1sxXTtcbiAqICAgLy8gICBsVmlld1syXS5hcHBlbmRDaGlsZChub2RlKTtcbiAqICAgMSA8PCBTSElGVF9SRUYgfCBTZWxlY3QsIDIgPDwgU0hJRlRfUEFSRU5UIHwgQXBwZW5kQ2hpbGQsXG4gKlxuICogICAvLyBGb3IgcmVtb3ZpbmcgZXhpc3Rpbmcgbm9kZXNcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgLy8gICBjb25zdCBub2RlID0gbFZpZXdbMV07XG4gKiAgIC8vICAgcmVtb3ZlQ2hpbGQodFZpZXcuZGF0YSgxKSwgbm9kZSwgbFZpZXcpO1xuICogICAxIDw8IFNISUZUX1JFRiB8IFJlbW92ZSxcbiAqXG4gKiAgIC8vIEZvciB3cml0aW5nIGF0dHJpYnV0ZXNcbiAqICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgLy8gICBjb25zdCBub2RlID0gbFZpZXdbMV07XG4gKiAgIC8vICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2F0dHInLCAndmFsdWUnKTtcbiAqICAgMSA8PCBTSElGVF9SRUYgfCBTZWxlY3QsICdhdHRyJywgJ3ZhbHVlJ1xuICogICAgICAgICAgICAvLyBOT1RFOiBTZWxlY3QgZm9sbG93ZWQgYnkgdHdvIHN0cmluZyAodnMgc2VsZWN0IGZvbGxvd2VkIGJ5IE9wQ29kZSlcbiAqIF07XG4gKiBgYGBcbiAqIE5PVEU6XG4gKiAgIC0gYGluZGV4YCBpcyBpbml0aWFsIGxvY2F0aW9uIHdoZXJlIHRoZSBleHRyYSBub2RlcyBzaG91bGQgYmUgc3RvcmVkIGluIHRoZSBFWFBBTkRPIHNlY3Rpb24gb2ZcbiAqIGBMVklld0RhdGFgLlxuICpcbiAqIFNlZTogYGFwcGx5STE4bkNyZWF0ZU9wQ29kZXNgO1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEkxOG5NdXRhdGVPcENvZGVzIGV4dGVuZHMgQXJyYXk8bnVtYmVyfHN0cmluZ3xFTEVNRU5UX01BUktFUnxDT01NRU5UX01BUktFUnxudWxsPiB7XG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIEkxOG5VcGRhdGVPcENvZGUge1xuICAvKipcbiAgICogU3RvcmVzIHNoaWZ0IGFtb3VudCBmb3IgYml0cyAxNy0yIHRoYXQgY29udGFpbiByZWZlcmVuY2UgaW5kZXguXG4gICAqL1xuICBTSElGVF9SRUYgPSAyLFxuICAvKipcbiAgICogTWFzayBmb3IgT3BDb2RlXG4gICAqL1xuICBNQVNLX09QQ09ERSA9IDBiMTEsXG5cbiAgLyoqXG4gICAqIE9wQ29kZSB0byB1cGRhdGUgYSB0ZXh0IG5vZGUuXG4gICAqL1xuICBUZXh0ID0gMGIwMCxcbiAgLyoqXG4gICAqIE9wQ29kZSB0byB1cGRhdGUgYSBhdHRyaWJ1dGUgb2YgYSBub2RlLlxuICAgKi9cbiAgQXR0ciA9IDBiMDEsXG4gIC8qKlxuICAgKiBPcENvZGUgdG8gc3dpdGNoIHRoZSBjdXJyZW50IElDVSBjYXNlLlxuICAgKi9cbiAgSWN1U3dpdGNoID0gMGIxMCxcbiAgLyoqXG4gICAqIE9wQ29kZSB0byB1cGRhdGUgdGhlIGN1cnJlbnQgSUNVIGNhc2UuXG4gICAqL1xuICBJY3VVcGRhdGUgPSAwYjExLFxufVxuXG4vKipcbiAqIFN0b3JlcyBET00gb3BlcmF0aW9ucyB3aGljaCBuZWVkIHRvIGJlIGFwcGxpZWQgdG8gdXBkYXRlIERPTSByZW5kZXIgdHJlZSBkdWUgdG8gY2hhbmdlcyBpblxuICogZXhwcmVzc2lvbnMuXG4gKlxuICogVGhlIGJhc2ljIGlkZWEgaXMgdGhhdCBgaTE4bkV4cGAgT3BDb2RlcyBjYXB0dXJlIGV4cHJlc3Npb24gY2hhbmdlcyBhbmQgdXBkYXRlIGEgY2hhbmdlXG4gKiBtYXNrIGJpdC4gKEJpdCAxIGZvciBleHByZXNzaW9uIDEsIGJpdCAyIGZvciBleHByZXNzaW9uIDIgZXRjLi4uLCBiaXQgMzIgZm9yIGV4cHJlc3Npb24gMzIgYW5kXG4gKiBoaWdoZXIuKSBUaGUgT3BDb2RlcyB0aGVuIGNvbXBhcmUgaXRzIG93biBjaGFuZ2UgbWFzayBhZ2FpbnN0IHRoZSBleHByZXNzaW9uIGNoYW5nZSBtYXNrIHRvXG4gKiBkZXRlcm1pbmUgaWYgdGhlIE9wQ29kZXMgc2hvdWxkIGV4ZWN1dGUuXG4gKlxuICogVGhlc2UgT3BDb2RlcyBjYW4gYmUgdXNlZCBieSBib3RoIHRoZSBpMThuIGJsb2NrIGFzIHdlbGwgYXMgSUNVIHN1Yi1ibG9jay5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogQXNzdW1lXG4gKiBgYGB0c1xuICogICBpZiAocmYgJiBSZW5kZXJGbGFncy5VcGRhdGUpIHtcbiAqICAgIGkxOG5FeHAoY3R4LmV4cDEpOyAvLyBJZiBjaGFuZ2VkIHNldCBtYXNrIGJpdCAxXG4gKiAgICBpMThuRXhwKGN0eC5leHAyKTsgLy8gSWYgY2hhbmdlZCBzZXQgbWFzayBiaXQgMlxuICogICAgaTE4bkV4cChjdHguZXhwMyk7IC8vIElmIGNoYW5nZWQgc2V0IG1hc2sgYml0IDNcbiAqICAgIGkxOG5FeHAoY3R4LmV4cDQpOyAvLyBJZiBjaGFuZ2VkIHNldCBtYXNrIGJpdCA0XG4gKiAgICBpMThuQXBwbHkoMCk7ICAgICAgICAgICAgLy8gQXBwbHkgYWxsIGNoYW5nZXMgYnkgZXhlY3V0aW5nIHRoZSBPcENvZGVzLlxuICogIH1cbiAqIGBgYFxuICogV2UgY2FuIGFzc3VtZSB0aGF0IGVhY2ggY2FsbCB0byBgaTE4bkV4cGAgc2V0cyBhbiBpbnRlcm5hbCBgY2hhbmdlTWFza2AgYml0IGRlcGVuZGluZyBvbiB0aGVcbiAqIGluZGV4IG9mIGBpMThuRXhwYC5cbiAqXG4gKiAjIyMgT3BDb2Rlc1xuICogYGBgdHNcbiAqIDxJMThuVXBkYXRlT3BDb2Rlcz5bXG4gKiAgIC8vIFRoZSBmb2xsb3dpbmcgT3BDb2RlcyByZXByZXNlbnQ6IGA8ZGl2IGkxOG4tdGl0bGU9XCJwcmV7e2V4cDF9fWlue3tleHAyfX1wb3N0XCI+YFxuICogICAvLyBJZiBgY2hhbmdlTWFzayAmIDBiMTFgXG4gKiAgIC8vICAgICAgICBoYXMgY2hhbmdlZCB0aGVuIGV4ZWN1dGUgdXBkYXRlIE9wQ29kZXMuXG4gKiAgIC8vICAgICAgICBoYXMgTk9UIGNoYW5nZWQgdGhlbiBza2lwIGA3YCB2YWx1ZXMgYW5kIHN0YXJ0IHByb2Nlc3NpbmcgbmV4dCBPcENvZGVzLlxuICogICAwYjExLCA3LFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSAncHJlJytsVmlld1tiaW5kSW5kZXgtNF0rJ2luJytsVmlld1tiaW5kSW5kZXgtM10rJ3Bvc3QnO2AuXG4gKiAgICdwcmUnLCAtNCwgJ2luJywgLTMsICdwb3N0JyxcbiAqICAgLy8gVXBkYXRlIGF0dHJpYnV0ZTogYGVsZW1lbnRBdHRyaWJ1dGUoMSwgJ3RpdGxlJywgc2FuaXRpemVyRm4obmV3VmFsdWUpKTtgXG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgQXR0ciwgJ3RpdGxlJywgc2FuaXRpemVyRm4sXG4gKlxuICogICAvLyBUaGUgZm9sbG93aW5nIE9wQ29kZXMgcmVwcmVzZW50OiBgPGRpdiBpMThuPkhlbGxvIHt7ZXhwM319IVwiPmBcbiAqICAgLy8gSWYgYGNoYW5nZU1hc2sgJiAwYjEwMGBcbiAqICAgLy8gICAgICAgIGhhcyBjaGFuZ2VkIHRoZW4gZXhlY3V0ZSB1cGRhdGUgT3BDb2Rlcy5cbiAqICAgLy8gICAgICAgIGhhcyBOT1QgY2hhbmdlZCB0aGVuIHNraXAgYDRgIHZhbHVlcyBhbmQgc3RhcnQgcHJvY2Vzc2luZyBuZXh0IE9wQ29kZXMuXG4gKiAgIDBiMTAwLCA0LFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSAnSGVsbG8gJyArIGxWaWV3W2JpbmRJbmRleCAtMl0gKyAnISc7YC5cbiAqICAgJ0hlbGxvICcsIC0yLCAnIScsXG4gKiAgIC8vIFVwZGF0ZSB0ZXh0OiBgbFZpZXdbMV0udGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtgXG4gKiAgIDEgPDwgU0hJRlRfUkVGIHwgVGV4dCxcbiAqXG4gKiAgIC8vIFRoZSBmb2xsb3dpbmcgT3BDb2RlcyByZXByZXNlbnQ6IGA8ZGl2IGkxOG4+e2V4cDQsIHBsdXJhbCwgLi4uIH1cIj5gXG4gKiAgIC8vIElmIGBjaGFuZ2VNYXNrICYgMGIxMDAwYFxuICogICAvLyAgICAgICAgaGFzIGNoYW5nZWQgdGhlbiBleGVjdXRlIHVwZGF0ZSBPcENvZGVzLlxuICogICAvLyAgICAgICAgaGFzIE5PVCBjaGFuZ2VkIHRoZW4gc2tpcCBgNGAgdmFsdWVzIGFuZCBzdGFydCBwcm9jZXNzaW5nIG5leHQgT3BDb2Rlcy5cbiAqICAgMGIxMDAwLCA0LFxuICogICAvLyBDb25jYXRlbmF0ZSBgbmV3VmFsdWUgPSBsVmlld1tiaW5kSW5kZXggLTFdO2AuXG4gKiAgIC0xLFxuICogICAvLyBTd2l0Y2ggSUNVOiBgaWN1U3dpdGNoQ2FzZShsVmlld1sxXSwgMCwgbmV3VmFsdWUpO2BcbiAqICAgMCA8PCBTSElGVF9JQ1UgfCAxIDw8IFNISUZUX1JFRiB8IEljdVN3aXRjaCxcbiAqXG4gKiAgIC8vIE5vdGUgYGNoYW5nZU1hc2sgJiAtMWAgaXMgYWx3YXlzIHRydWUsIHNvIHRoZSBJY3VVcGRhdGUgd2lsbCBhbHdheXMgZXhlY3V0ZS5cbiAqICAgLTEsIDEsXG4gKiAgIC8vIFVwZGF0ZSBJQ1U6IGBpY3VVcGRhdGVDYXNlKGxWaWV3WzFdLCAwKTtgXG4gKiAgIDAgPDwgU0hJRlRfSUNVIHwgMSA8PCBTSElGVF9SRUYgfCBJY3VVcGRhdGUsXG4gKlxuICogXTtcbiAqIGBgYFxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJMThuVXBkYXRlT3BDb2RlcyBleHRlbmRzIEFycmF5PHN0cmluZ3xudW1iZXJ8U2FuaXRpemVyRm58bnVsbD4ge31cblxuLyoqXG4gKiBTdG9yZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGkxOG4gdHJhbnNsYXRpb24gYmxvY2suXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVEkxOG4ge1xuICAvKipcbiAgICogTnVtYmVyIG9mIHNsb3RzIHRvIGFsbG9jYXRlIGluIGV4cGFuZG8uXG4gICAqXG4gICAqIFRoaXMgaXMgdGhlIG1heCBudW1iZXIgb2YgRE9NIGVsZW1lbnRzIHdoaWNoIHdpbGwgYmUgY3JlYXRlZCBieSB0aGlzIGkxOG4gKyBJQ1UgYmxvY2tzLiBXaGVuXG4gICAqIHRoZSBET00gZWxlbWVudHMgYXJlIGJlaW5nIGNyZWF0ZWQgdGhleSBhcmUgc3RvcmVkIGluIHRoZSBFWFBBTkRPLCBzbyB0aGF0IHVwZGF0ZSBPcENvZGVzIGNhblxuICAgKiB3cml0ZSBpbnRvIHRoZW0uXG4gICAqL1xuICB2YXJzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgd2hpY2ggd2lsbCBjcmVhdGUgdGhlIFRleHQgTm9kZXMgYW5kIElDVSBhbmNob3JzIGZvciB0aGUgdHJhbnNsYXRpb24gYmxvY2tzLlxuICAgKlxuICAgKiBOT1RFOiBUaGUgSUNVIGFuY2hvcnMgYXJlIGZpbGxlZCBpbiB3aXRoIElDVSBVcGRhdGUgT3BDb2RlLlxuICAgKi9cbiAgY3JlYXRlOiBJMThuTXV0YXRlT3BDb2RlcztcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB3aGljaCB3aWxsIGJlIGV4ZWN1dGVkIG9uIGVhY2ggY2hhbmdlIGRldGVjdGlvbiB0byBkZXRlcm1pbmUgaWYgYW55IGNoYW5nZXMgdG9cbiAgICogRE9NIGFyZSByZXF1aXJlZC5cbiAgICovXG4gIHVwZGF0ZTogSTE4blVwZGF0ZU9wQ29kZXM7XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBJQ1VzIGluIGEgdHJhbnNsYXRpb24gYmxvY2sgKG9yIGBudWxsYCBpZiBibG9jayBoYXMgbm8gSUNVcykuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIEdpdmVuOiBgPGRpdiBpMThuPllvdSBoYXZlIHtjb3VudCwgcGx1cmFsLCAuLi59IGFuZCB7c3RhdGUsIHN3aXRjaCwgLi4ufTwvZGl2PmBcbiAgICogVGhlcmUgd291bGQgYmUgMiBJQ1VzIGluIHRoaXMgYXJyYXkuXG4gICAqICAgMS4gYHtjb3VudCwgcGx1cmFsLCAuLi59YFxuICAgKiAgIDIuIGB7c3RhdGUsIHN3aXRjaCwgLi4ufWBcbiAgICovXG4gIGljdXM6IFRJY3VbXXxudWxsO1xufVxuXG4vKipcbiAqIERlZmluZXMgdGhlIElDVSB0eXBlIG9mIGBzZWxlY3RgIG9yIGBwbHVyYWxgXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEljdVR5cGUge1xuICBzZWxlY3QgPSAwLFxuICBwbHVyYWwgPSAxLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRJY3Uge1xuICAvKipcbiAgICogRGVmaW5lcyB0aGUgSUNVIHR5cGUgb2YgYHNlbGVjdGAgb3IgYHBsdXJhbGBcbiAgICovXG4gIHR5cGU6IEljdVR5cGU7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBzbG90cyB0byBhbGxvY2F0ZSBpbiBleHBhbmRvIGZvciBlYWNoIGNhc2UuXG4gICAqXG4gICAqIFRoaXMgaXMgdGhlIG1heCBudW1iZXIgb2YgRE9NIGVsZW1lbnRzIHdoaWNoIHdpbGwgYmUgY3JlYXRlZCBieSB0aGlzIGkxOG4gKyBJQ1UgYmxvY2tzLiBXaGVuXG4gICAqIHRoZSBET00gZWxlbWVudHMgYXJlIGJlaW5nIGNyZWF0ZWQgdGhleSBhcmUgc3RvcmVkIGluIHRoZSBFWFBBTkRPLCBzbyB0aGF0IHVwZGF0ZSBPcENvZGVzIGNhblxuICAgKiB3cml0ZSBpbnRvIHRoZW0uXG4gICAqL1xuICB2YXJzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgYXJyYXkgb2YgY2hpbGQvc3ViIElDVXMuXG4gICAqXG4gICAqIEluIGNhc2Ugb2YgbmVzdGVkIElDVXMgc3VjaCBhczpcbiAgICogYGBgXG4gICAqIHvvv70w77+9LCBwbHVyYWwsXG4gICAqICAgPTAge3plcm99XG4gICAqICAgb3RoZXIge++/vTDvv70ge++/vTHvv70sIHNlbGVjdCxcbiAgICogICAgICAgICAgICAgICAgICAgICBjYXQge2NhdHN9XG4gICAqICAgICAgICAgICAgICAgICAgICAgZG9nIHtkb2dzfVxuICAgKiAgICAgICAgICAgICAgICAgICAgIG90aGVyIHthbmltYWxzfVxuICAgKiAgICAgICAgICAgICAgICAgICB9IVxuICAgKiAgIH1cbiAgICogfVxuICAgKiBgYGBcbiAgICogV2hlbiB0aGUgcGFyZW50IElDVSBpcyBjaGFuZ2luZyBpdCBtdXN0IGNsZWFuIHVwIGNoaWxkIElDVXMgYXMgd2VsbC4gRm9yIHRoaXMgcmVhc29uIGl0IG5lZWRzXG4gICAqIHRvIGtub3cgd2hpY2ggY2hpbGQgSUNVcyB0byBydW4gY2xlYW4gdXAgZm9yIGFzIHdlbGwuXG4gICAqXG4gICAqIEluIHRoZSBhYm92ZSBleGFtcGxlIHRoaXMgd291bGQgYmU6XG4gICAqIGBgYHRzXG4gICAqIFtcbiAgICogICBbXSwgICAvLyBgPTBgIGhhcyBubyBzdWIgSUNVc1xuICAgKiAgIFsxXSwgIC8vIGBvdGhlcmAgaGFzIG9uZSBzdWJJQ1UgYXQgYDFgc3QgaW5kZXguXG4gICAqIF1cbiAgICogYGBgXG4gICAqXG4gICAqIFRoZSByZWFzb24gd2h5IGl0IGlzIEFycmF5IG9mIEFycmF5cyBpcyBiZWNhdXNlIGZpcnN0IGFycmF5IHJlcHJlc2VudHMgdGhlIGNhc2UsIGFuZCBzZWNvbmRcbiAgICogcmVwcmVzZW50cyB0aGUgY2hpbGQgSUNVcyB0byBjbGVhbiB1cC4gVGhlcmUgbWF5IGJlIG1vcmUgdGhhbiBvbmUgY2hpbGQgSUNVcyBwZXIgY2FzZS5cbiAgICovXG4gIGNoaWxkSWN1czogbnVtYmVyW11bXTtcblxuICAvKipcbiAgICogQSBsaXN0IG9mIGNhc2UgdmFsdWVzIHdoaWNoIHRoZSBjdXJyZW50IElDVSB3aWxsIHRyeSB0byBtYXRjaC5cbiAgICpcbiAgICogVGhlIGxhc3QgdmFsdWUgaXMgYG90aGVyYFxuICAgKi9cbiAgY2FzZXM6IGFueVtdO1xuXG4gIC8qKlxuICAgKiBBIHNldCBvZiBPcENvZGVzIHRvIGFwcGx5IGluIG9yZGVyIHRvIGJ1aWxkIHVwIHRoZSBET00gcmVuZGVyIHRyZWUgZm9yIHRoZSBJQ1VcbiAgICovXG4gIGNyZWF0ZTogSTE4bk11dGF0ZU9wQ29kZXNbXTtcblxuICAvKipcbiAgICogQSBzZXQgb2YgT3BDb2RlcyB0byBhcHBseSBpbiBvcmRlciB0byBkZXN0cm95IHRoZSBET00gcmVuZGVyIHRyZWUgZm9yIHRoZSBJQ1UuXG4gICAqL1xuICByZW1vdmU6IEkxOG5NdXRhdGVPcENvZGVzW107XG5cbiAgLyoqXG4gICAqIEEgc2V0IG9mIE9wQ29kZXMgdG8gYXBwbHkgaW4gb3JkZXIgdG8gdXBkYXRlIHRoZSBET00gcmVuZGVyIHRyZWUgZm9yIHRoZSBJQ1UgYmluZGluZ3MuXG4gICAqL1xuICB1cGRhdGU6IEkxOG5VcGRhdGVPcENvZGVzW107XG59XG5cbi8vIE5vdGU6IFRoaXMgaGFjayBpcyBuZWNlc3Nhcnkgc28gd2UgZG9uJ3QgZXJyb25lb3VzbHkgZ2V0IGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuLy8gZmFpbHVyZSBiYXNlZCBvbiB0eXBlcy5cbmV4cG9ydCBjb25zdCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCA9IDE7XG4iXX0=