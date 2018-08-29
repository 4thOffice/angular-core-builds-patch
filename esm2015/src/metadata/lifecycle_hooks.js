/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2hvb2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTaW1wbGVDaGFuZ2V9IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbl91dGlsJztcblxuXG4vKipcbiAqIERlZmluZXMgYW4gb2JqZWN0IHRoYXQgYXNzb2NpYXRlcyBwcm9wZXJ0aWVzIHdpdGhcbiAqIGluc3RhbmNlcyBvZiBgU2ltcGxlQ2hhbmdlYC5cbiAqXG4gKiBAc2VlIGBPbkNoYW5nZXNgXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZUNoYW5nZXMgeyBbcHJvcE5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZTsgfVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBsaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMuXG4gKiBEZWZpbmUgYW4gYG5nT25DaGFuZ2VzKClgIG1ldGhvZCB0byBoYW5kbGUgdGhlIGNoYW5nZXMuXG4gKlxuICogQHNlZSBgRG9DaGVja2BcbiAqIEBzZWUgYE9uSW5pdGBcbiAqIEBzZWUgW0xpZmVjeWNsZSBIb29rc10oZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI29uY2hhbmdlcykgZ3VpZGVcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBzbmlwcGV0IHNob3dzIGhvdyBhIGNvbXBvbmVudCBjYW4gaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvXG4gKiBkZWZpbmUgYW4gb24tY2hhbmdlcyBoYW5kbGVyIGZvciBhbiBpbnB1dCBwcm9wZXJ0eS5cbiAqXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J09uQ2hhbmdlcyd9XG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIG1ldGhvZCB0aGF0IGlzIGludm9rZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlXG4gICAqIGRlZmF1bHQgY2hhbmdlIGRldGVjdG9yIGhhcyBjaGVja2VkIGRhdGEtYm91bmQgcHJvcGVydGllc1xuICAgKiBpZiBhdCBsZWFzdCBvbmUgaGFzIGNoYW5nZWQsIGFuZCBiZWZvcmUgdGhlIHZpZXcgYW5kIGNvbnRlbnRcbiAgICogY2hpbGRyZW4gYXJlIGNoZWNrZWQuXG4gICAqIEBwYXJhbSBjaGFuZ2VzIFRoZSBjaGFuZ2VkIHByb3BlcnRpZXMuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgQW5ndWxhciBoYXMgaW5pdGlhbGl6ZWRcbiAqIGFsbCBkYXRhLWJvdW5kIHByb3BlcnRpZXMgb2YgYSBkaXJlY3RpdmUuXG4gKiBEZWZpbmUgYW4gYG5nT25Jbml0KClgIG1ldGhvZCB0byBoYW5kbGUgYW55IGFkZGl0aW9uYWwgaW5pdGlhbGl6YXRpb24gdGFza3MuXG4gKlxuICogQHNlZSBgQWZ0ZXJDb250ZW50SW5pdGBcbiAqIEBzZWUgW0xpZmVjeWNsZSBIb29rc10oZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI29uY2hhbmdlcykgZ3VpZGVcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBzbmlwcGV0IHNob3dzIGhvdyBhIGNvbXBvbmVudCBjYW4gaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvXG4gKiBkZWZpbmUgaXRzIG93biBpbml0aWFsaXphdGlvbiBtZXRob2QuXG4gKlxuICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzX3NwZWMudHMgcmVnaW9uPSdPbkluaXQnfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT25Jbml0IHtcbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgbWV0aG9kIHRoYXQgaXMgaW52b2tlZCBpbW1lZGlhdGVseSBhZnRlciB0aGVcbiAgICogZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0b3IgaGFzIGNoZWNrZWQgdGhlIGRpcmVjdGl2ZSdzXG4gICAqIGRhdGEtYm91bmQgcHJvcGVydGllcyBmb3IgdGhlIGZpcnN0IHRpbWUsXG4gICAqIGFuZCBiZWZvcmUgYW55IG9mIHRoZSB2aWV3IG9yIGNvbnRlbnQgY2hpbGRyZW4gaGF2ZSBiZWVuIGNoZWNrZWQuXG4gICAqIEl0IGlzIGludm9rZWQgb25seSBvbmNlIHdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBpbnN0YW50aWF0ZWQuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkO1xufVxuXG4vKipcbiAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpbnZva2VzIGEgY3VzdG9tIGNoYW5nZS1kZXRlY3Rpb24gZnVuY3Rpb24gZm9yIGEgZGlyZWN0aXZlLFxuICogaW4gYWRkaXRpb24gdG8gdGhlIGNoZWNrIHBlcmZvcm1lZCBieSB0aGUgZGVmYXVsdCBjaGFuZ2UtZGV0ZWN0b3IuXG4gKiBcbiAqIFRoZSBkZWZhdWx0IGNoYW5nZS1kZXRlY3Rpb24gYWxnb3JpdGhtIGxvb2tzIGZvciBkaWZmZXJlbmNlcyBieSBjb21wYXJpbmdcbiAqIGJvdW5kLXByb3BlcnR5IHZhbHVlcyBieSByZWZlcmVuY2UgYWNyb3NzIGNoYW5nZSBkZXRlY3Rpb24gcnVucy4gWW91IGNhbiB1c2UgdGhpc1xuICogaG9vayB0byBjaGVjayBmb3IgYW5kIHJlc3BvbmQgdG8gY2hhbmdlcyBieSBzb21lIG90aGVyIG1lYW5zLlxuICpcbiAqIFdoZW4gdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdG9yIGRldGVjdHMgY2hhbmdlcywgaXQgaW52b2tlcyBgbmdPbkNoYW5nZXMoKWAgaWYgc3VwcGxpZWQsXG4gKiByZWdhcmRsZXNzIG9mIHdoZXRoZXIgeW91IHBlcmZvcm0gYWRkaXRpb25hbCBjaGFuZ2UgZGV0ZWN0aW9uLlxuICogVHlwaWNhbGx5LCB5b3Ugc2hvdWxkIG5vdCB1c2UgYm90aCBgRG9DaGVja2AgYW5kIGBPbkNoYW5nZXNgIHRvIHJlc3BvbmQgdG9cbiAqIGNoYW5nZXMgb24gdGhlIHNhbWUgaW5wdXQuIFxuICogXG4gKiBAc2VlIGBPbkNoYW5nZXNgXG4gKiBAc2VlIFtMaWZlY3ljbGUgSG9va3NdKGd1aWRlL2xpZmVjeWNsZS1ob29rcyNvbmNoYW5nZXMpIGd1aWRlXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSBmb2xsb3dpbmcgc25pcHBldCBzaG93cyBob3cgYSBjb21wb25lbnQgY2FuIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxuICogdG8gaW52b2tlIGl0IG93biBjaGFuZ2UtZGV0ZWN0aW9uIGN5Y2xlLiAgXG4gKlxuICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzX3NwZWMudHMgcmVnaW9uPSdEb0NoZWNrJ31cbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRG9DaGVjayB7XG4gIC8qKlxuICAgICAqIEEgY2FsbGJhY2sgbWV0aG9kIHRoYXQgcGVyZm9ybXMgY2hhbmdlLWRldGVjdGlvbiwgaW52b2tlZFxuICAgICAqIGFmdGVyIHRoZSBkZWZhdWx0IGNoYW5nZS1kZXRlY3RvciBydW5zLlxuICAgICAqIFNlZSBgS2V5VmFsdWVEaWZmZXJzYCBhbmQgYEl0ZXJhYmxlRGlmZmVyc2AgZm9yIGltcGxlbWVudGluZ1xuICAgICAqIGN1c3RvbSBjaGFuZ2UgY2hlY2tpbmcgZm9yIGNvbGxlY3Rpb25zLlxuICAgICAqXG4gICAgICovXG4gIG5nRG9DaGVjaygpOiB2b2lkO1xufVxuXG4vKipcbiAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhIGRpcmVjdGl2ZSwgcGlwZSwgb3Igc2VydmljZSBpcyBkZXN0cm95ZWQuXG4gKiBVc2UgZm9yIGFueSBjdXN0b20gY2xlYW51cCB0aGF0IG5lZWRzIHRvIG9jY3VyIHdoZW4gdGhlXG4gKiBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXG4gKiBAc2VlIFtMaWZlY3ljbGUgSG9va3NdKGd1aWRlL2xpZmVjeWNsZS1ob29rcyNvbmNoYW5nZXMpIGd1aWRlXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSBmb2xsb3dpbmcgc25pcHBldCBzaG93cyBob3cgYSBjb21wb25lbnQgY2FuIGltcGxlbWVudCB0aGlzIGludGVyZmFjZVxuICogdG8gZGVmaW5lIGl0cyBvd24gY3VzdG9tIGNsZWFuLXVwIG1ldGhvZC5cbiAqICBcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rc19zcGVjLnRzIHJlZ2lvbj0nT25EZXN0cm95J31cbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgbWV0aG9kIHRoYXQgcGVyZm9ybXMgY3VzdG9tIGNsZWFuLXVwLCBpbnZva2VkIGltbWVkaWF0ZWx5XG4gICAqIGFmdGVyIGEgZGlyZWN0aXZlLCBwaXBlLCBvciBzZXJ2aWNlIGluc3RhbmNlIGlzIGRlc3Ryb3llZC5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQ7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGxpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIEFuZ3VsYXIgaGFzIGZ1bGx5IGluaXRpYWxpemVkXG4gKiBhbGwgY29udGVudCBvZiBhIGRpcmVjdGl2ZS5cbiAqIERlZmluZSBhbiBgbmdBZnRlckNvbnRlbnRJbml0KClgIG1ldGhvZCB0byBoYW5kbGUgYW55IGFkZGl0aW9uYWwgaW5pdGlhbGl6YXRpb24gdGFza3MuXG4gKlxuICogQHNlZSBgT25Jbml0YFxuICogQHNlZSBgQWZ0ZXJWaWV3SW5pdGBcbiAqIEBzZWUgW0xpZmVjeWNsZSBIb29rc10oZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI29uY2hhbmdlcykgZ3VpZGVcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBzbmlwcGV0IHNob3dzIGhvdyBhIGNvbXBvbmVudCBjYW4gaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvXG4gKiBkZWZpbmUgaXRzIG93biBjb250ZW50IGluaXRpYWxpemF0aW9uIG1ldGhvZC5cbiAqXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J0FmdGVyQ29udGVudEluaXQnfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIG1ldGhvZCB0aGF0IGlzIGludm9rZWQgaW1tZWRpYXRlbHkgYWZ0ZXJcbiAgICogQW5ndWxhciBoYXMgY29tcGxldGVkIGluaXRpYWxpemF0aW9uIG9mIGFsbCBvZiB0aGUgZGlyZWN0aXZlJ3NcbiAgICogY29udGVudC5cbiAgICogSXQgaXMgaW52b2tlZCBvbmx5IG9uY2Ugd2hlbiB0aGUgZGlyZWN0aXZlIGlzIGluc3RhbnRpYXRlZC5cbiAgICovXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBsaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciB0aGUgZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0b3IgaGFzXG4gKiBjb21wbGV0ZWQgY2hlY2tpbmcgYWxsIGNvbnRlbnQgb2YgYSBkaXJlY3RpdmUuXG4gKlxuICogQHNlZSBgQWZ0ZXJWaWV3Q2hlY2tlZGBcbiAqIEBzZWUgW0xpZmVjeWNsZSBIb29rc10oZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI29uY2hhbmdlcykgZ3VpZGVcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBzbmlwcGV0IHNob3dzIGhvdyBhIGNvbXBvbmVudCBjYW4gaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvXG4gKiBkZWZpbmUgaXRzIG93biBhZnRlci1jaGVjayBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIHtAZXhhbXBsZSBjb3JlL3RzL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rc19zcGVjLnRzIHJlZ2lvbj0nQWZ0ZXJDb250ZW50Q2hlY2tlZCd9XG4gKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgbWV0aG9kIHRoYXQgaXMgaW52b2tlZCBpbW1lZGlhdGVseSBhZnRlciB0aGVcbiAgICogZGVmYXVsdCBjaGFuZ2UgZGV0ZWN0b3IgaGFzIGNvbXBsZXRlZCBjaGVja2luZyBhbGwgb2YgdGhlIGRpcmVjdGl2ZSdzXG4gICAqIGNvbnRlbnQuXG4gICAqL1xuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgQW5ndWxhciBoYXMgZnVsbHkgaW5pdGlhbGl6ZWRcbiAqIGEgY29tcG9uZW50J3Mgdmlldy5cbiAqIERlZmluZSBhbiBgbmdBZnRlclZpZXdJbml0KClgIG1ldGhvZCB0byBoYW5kbGUgYW55IGFkZGl0aW9uYWwgaW5pdGlhbGl6YXRpb24gdGFza3MuXG4gKlxuICogQHNlZSBgT25Jbml0YFxuICogQHNlZSBgQWZ0ZXJDb250ZW50SW5pdGBcbiAqIEBzZWUgW0xpZmVjeWNsZSBIb29rc10oZ3VpZGUvbGlmZWN5Y2xlLWhvb2tzI29uY2hhbmdlcykgZ3VpZGVcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBzbmlwcGV0IHNob3dzIGhvdyBhIGNvbXBvbmVudCBjYW4gaW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvXG4gKiBkZWZpbmUgaXRzIG93biB2aWV3IGluaXRpYWxpemF0aW9uIG1ldGhvZC5cbiAqXG4gKiB7QGV4YW1wbGUgY29yZS90cy9tZXRhZGF0YS9saWZlY3ljbGVfaG9va3Nfc3BlYy50cyByZWdpb249J0FmdGVyVmlld0luaXQnfVxuICpcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIG1ldGhvZCB0aGF0IGlzIGludm9rZWQgaW1tZWRpYXRlbHkgYWZ0ZXJcbiAgICogQW5ndWxhciBoYXMgY29tcGxldGVkIGluaXRpYWxpemF0aW9uIG9mIGEgY29tcG9uZW50J3Mgdmlldy5cbiAgICogSXQgaXMgaW52b2tlZCBvbmx5IG9uY2Ugd2hlbiB0aGUgdmlldyBpcyBpbnN0YW50aWF0ZWQuXG4gICAqXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgbGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGRlZmF1bHQgY2hhbmdlIGRldGVjdG9yIGhhc1xuICogY29tcGxldGVkIGNoZWNraW5nIGEgY29tcG9uZW50J3MgdmlldyBmb3IgY2hhbmdlcy5cbiAqXG4gKiBAc2VlIGBBZnRlckNvbnRlbnRDaGVja2VkYFxuICogQHNlZSBbTGlmZWN5Y2xlIEhvb2tzXShndWlkZS9saWZlY3ljbGUtaG9va3Mjb25jaGFuZ2VzKSBndWlkZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBUaGUgZm9sbG93aW5nIHNuaXBwZXQgc2hvd3MgaG93IGEgY29tcG9uZW50IGNhbiBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UgdG9cbiAqIGRlZmluZSBpdHMgb3duIGFmdGVyLWNoZWNrIGZ1bmN0aW9uYWxpdHkuXG4gKlxuICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvbGlmZWN5Y2xlX2hvb2tzX3NwZWMudHMgcmVnaW9uPSdBZnRlclZpZXdDaGVja2VkJ31cbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIG1ldGhvZCB0aGF0IGlzIGludm9rZWQgaW1tZWRpYXRlbHkgYWZ0ZXIgdGhlXG4gICAqIGRlZmF1bHQgY2hhbmdlIGRldGVjdG9yIGhhcyBjb21wbGV0ZWQgb25lIGNoYW5nZS1jaGVjayBjeWNsZVxuICAgKiBmb3IgYSBjb21wb25lbnQncyB2aWV3LlxuICAgKi9cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQ7XG59XG4iXX0=