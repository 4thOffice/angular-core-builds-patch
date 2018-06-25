/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '../di';
/**
 * @deprecated Use `RendererType2` (and `Renderer2`) instead.
 */
var RenderComponentType = /** @class */ (function () {
    function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
    return RenderComponentType;
}());
export { RenderComponentType };
/**
 * @deprecated Debug info is handeled internally in the view engine now.
 */
var RenderDebugInfo = /** @class */ (function () {
    function RenderDebugInfo() {
    }
    return RenderDebugInfo;
}());
export { RenderDebugInfo };
/**
 * @deprecated Use the `Renderer2` instead.
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
    }
    return Renderer;
}());
export { Renderer };
export var Renderer2Interceptor = new InjectionToken('Renderer2Interceptor');
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link Renderer#setElementProperty setElementProperty} or
 * {@link Renderer#setElementAttribute setElementAttribute} respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 *
 * @deprecated Use `RendererFactory2` instead.
 */
var RootRenderer = /** @class */ (function () {
    function RootRenderer() {
    }
    return RootRenderer;
}());
export { RootRenderer };
/**
 * @experimental
 */
var RendererFactory2 = /** @class */ (function () {
    function RendererFactory2() {
    }
    return RendererFactory2;
}());
export { RendererFactory2 };
/**
 * @experimental
 */
export var RendererStyleFlags2;
(function (RendererStyleFlags2) {
    RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
    RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
})(RendererStyleFlags2 || (RendererStyleFlags2 = {}));
/**
 * @experimental
 */
var Renderer2 = /** @class */ (function () {
    function Renderer2() {
    }
    return Renderer2;
}());
export { Renderer2 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFXLE1BQU0sT0FBTyxDQUFDO0FBRy9DOztHQUVHO0FBQ0g7SUFDRSw2QkFDVyxFQUFVLEVBQVMsV0FBbUIsRUFBUyxTQUFpQixFQUNoRSxhQUFnQyxFQUFTLE1BQTJCLEVBQ3BFLFVBQWU7UUFGZixPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2hFLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQXFCO1FBQ3BFLGVBQVUsR0FBVixVQUFVLENBQUs7SUFBRyxDQUFDO0lBQ2hDLDBCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBRUQ7O0dBRUc7QUFDSDtJQUFBO0lBT0EsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7O0FBYUQ7O0dBRUc7QUFDSDtJQUFBO0lBNkNBLENBQUM7SUFBRCxlQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQzs7QUFFRCxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBYyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTVGOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7O0FBWUQ7O0dBRUc7QUFDSDtJQUFBO0lBS0EsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxtQkFHWDtBQUhELFdBQVksbUJBQW1CO0lBQzdCLHVFQUFrQixDQUFBO0lBQ2xCLHFFQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxtQkFBbUIsS0FBbkIsbUJBQW1CLFFBRzlCO0FBRUQ7O0dBRUc7QUFDSDtJQUFBO0lBNkNBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW4sIEluamVjdG9yfSBmcm9tICcuLi9kaSc7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9ufSBmcm9tICcuLi9tZXRhZGF0YS92aWV3JztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJlbmRlcmVyVHlwZTJgIChhbmQgYFJlbmRlcmVyMmApIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZW5kZXJDb21wb25lbnRUeXBlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaWQ6IHN0cmluZywgcHVibGljIHRlbXBsYXRlVXJsOiBzdHJpbmcsIHB1YmxpYyBzbG90Q291bnQ6IG51bWJlcixcbiAgICAgIHB1YmxpYyBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbiwgcHVibGljIHN0eWxlczogQXJyYXk8c3RyaW5nfGFueVtdPixcbiAgICAgIHB1YmxpYyBhbmltYXRpb25zOiBhbnkpIHt9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgRGVidWcgaW5mbyBpcyBoYW5kZWxlZCBpbnRlcm5hbGx5IGluIHRoZSB2aWV3IGVuZ2luZSBub3cuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJEZWJ1Z0luZm8ge1xuICBhYnN0cmFjdCBnZXQgaW5qZWN0b3IoKTogSW5qZWN0b3I7XG4gIGFic3RyYWN0IGdldCBjb21wb25lbnQoKTogYW55O1xuICBhYnN0cmFjdCBnZXQgcHJvdmlkZXJUb2tlbnMoKTogYW55W107XG4gIGFic3RyYWN0IGdldCByZWZlcmVuY2VzKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICBhYnN0cmFjdCBnZXQgY29udGV4dCgpOiBhbnk7XG4gIGFic3RyYWN0IGdldCBzb3VyY2UoKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB0aGUgYFJlbmRlcmVyMmAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RSZW5kZXJlciB7XG4gIHJlbW92ZShub2RlOiBhbnkpOiB2b2lkO1xuICBhcHBlbmRDaGlsZChub2RlOiBhbnksIHBhcmVudDogYW55KTogdm9pZDtcbiAgaW5zZXJ0QmVmb3JlKG5vZGU6IGFueSwgcmVmTm9kZTogYW55KTogdm9pZDtcbiAgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55O1xuICBwYXJlbnRFbGVtZW50KG5vZGU6IGFueSk6IGFueTtcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgdGhlIGBSZW5kZXJlcjJgIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZW5kZXJlciB7XG4gIGFic3RyYWN0IHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55LCBkZWJ1Z0luZm8/OiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnk7XG5cbiAgYWJzdHJhY3QgY3JlYXRlRWxlbWVudChwYXJlbnRFbGVtZW50OiBhbnksIG5hbWU6IHN0cmluZywgZGVidWdJbmZvPzogUmVuZGVyRGVidWdJbmZvKTogYW55O1xuXG4gIGFic3RyYWN0IGNyZWF0ZVZpZXdSb290KGhvc3RFbGVtZW50OiBhbnkpOiBhbnk7XG5cbiAgYWJzdHJhY3QgY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudDogYW55LCBkZWJ1Z0luZm8/OiBSZW5kZXJEZWJ1Z0luZm8pOiBhbnk7XG5cbiAgYWJzdHJhY3QgY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcsIGRlYnVnSW5mbz86IFJlbmRlckRlYnVnSW5mbyk6IGFueTtcblxuICBhYnN0cmFjdCBwcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IGF0dGFjaFZpZXdBZnRlcihub2RlOiBhbnksIHZpZXdSb290Tm9kZXM6IGFueVtdKTogdm9pZDtcblxuICBhYnN0cmFjdCBkZXRhY2hWaWV3KHZpZXdSb290Tm9kZXM6IGFueVtdKTogdm9pZDtcblxuICBhYnN0cmFjdCBkZXN0cm95Vmlldyhob3N0RWxlbWVudDogYW55LCB2aWV3QWxsTm9kZXM6IGFueVtdKTogdm9pZDtcblxuICBhYnN0cmFjdCBsaXN0ZW4ocmVuZGVyRWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IEZ1bmN0aW9uO1xuXG4gIGFic3RyYWN0IGxpc3Rlbkdsb2JhbCh0YXJnZXQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiBGdW5jdGlvbjtcblxuICBhYnN0cmFjdCBzZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KTogdm9pZDtcblxuICBhYnN0cmFjdCBzZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKTpcbiAgICAgIHZvaWQ7XG5cbiAgLyoqXG4gICAqIFVzZWQgb25seSBpbiBkZWJ1ZyBtb2RlIHRvIHNlcmlhbGl6ZSBwcm9wZXJ0eSBjaGFuZ2VzIHRvIGRvbSBub2RlcyBhcyBhdHRyaWJ1dGVzLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0QmluZGluZ0RlYnVnSW5mbyhyZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpOlxuICAgICAgdm9pZDtcblxuICBhYnN0cmFjdCBzZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZywgaXNBZGQ6IGJvb2xlYW4pOiB2b2lkO1xuXG4gIGFic3RyYWN0IHNldEVsZW1lbnRTdHlsZShyZW5kZXJFbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLCBzdHlsZVZhbHVlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIGFic3RyYWN0IGludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnlbXSk6IHZvaWQ7XG5cbiAgYWJzdHJhY3Qgc2V0VGV4dChyZW5kZXJOb2RlOiBhbnksIHRleHQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgYW5pbWF0ZShcbiAgICAgIGVsZW1lbnQ6IGFueSwgc3RhcnRpbmdTdHlsZXM6IGFueSwga2V5ZnJhbWVzOiBhbnlbXSwgZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlcixcbiAgICAgIGVhc2luZzogc3RyaW5nLCBwcmV2aW91c1BsYXllcnM/OiBhbnlbXSk6IGFueTtcbn1cblxuZXhwb3J0IGNvbnN0IFJlbmRlcmVyMkludGVyY2VwdG9yID0gbmV3IEluamVjdGlvblRva2VuPFJlbmRlcmVyMltdPignUmVuZGVyZXIySW50ZXJjZXB0b3InKTtcblxuLyoqXG4gKiBJbmplY3RhYmxlIHNlcnZpY2UgdGhhdCBwcm92aWRlcyBhIGxvdy1sZXZlbCBpbnRlcmZhY2UgZm9yIG1vZGlmeWluZyB0aGUgVUkuXG4gKlxuICogVXNlIHRoaXMgc2VydmljZSB0byBieXBhc3MgQW5ndWxhcidzIHRlbXBsYXRpbmcgYW5kIG1ha2UgY3VzdG9tIFVJIGNoYW5nZXMgdGhhdCBjYW4ndCBiZVxuICogZXhwcmVzc2VkIGRlY2xhcmF0aXZlbHkuIEZvciBleGFtcGxlIGlmIHlvdSBuZWVkIHRvIHNldCBhIHByb3BlcnR5IG9yIGFuIGF0dHJpYnV0ZSB3aG9zZSBuYW1lIGlzXG4gKiBub3Qgc3RhdGljYWxseSBrbm93biwgdXNlIHtAbGluayBSZW5kZXJlciNzZXRFbGVtZW50UHJvcGVydHkgc2V0RWxlbWVudFByb3BlcnR5fSBvclxuICoge0BsaW5rIFJlbmRlcmVyI3NldEVsZW1lbnRBdHRyaWJ1dGUgc2V0RWxlbWVudEF0dHJpYnV0ZX0gcmVzcGVjdGl2ZWx5LlxuICpcbiAqIElmIHlvdSBhcmUgaW1wbGVtZW50aW5nIGEgY3VzdG9tIHJlbmRlcmVyLCB5b3UgbXVzdCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UuXG4gKlxuICogVGhlIGRlZmF1bHQgUmVuZGVyZXIgaW1wbGVtZW50YXRpb24gaXMgYERvbVJlbmRlcmVyYC4gQWxzbyBhdmFpbGFibGUgaXMgYFdlYldvcmtlclJlbmRlcmVyYC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBVc2UgYFJlbmRlcmVyRmFjdG9yeTJgIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSb290UmVuZGVyZXIge1xuICBhYnN0cmFjdCByZW5kZXJDb21wb25lbnQoY29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSk6IFJlbmRlcmVyO1xufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJlclR5cGUyIHtcbiAgaWQ6IHN0cmluZztcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHN0eWxlczogKHN0cmluZ3xhbnlbXSlbXTtcbiAgZGF0YToge1traW5kOiBzdHJpbmddOiBhbnl9O1xufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyRmFjdG9yeTIge1xuICBhYnN0cmFjdCBjcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudDogYW55LCB0eXBlOiBSZW5kZXJlclR5cGUyfG51bGwpOiBSZW5kZXJlcjI7XG4gIGFic3RyYWN0IGJlZ2luPygpOiB2b2lkO1xuICBhYnN0cmFjdCBlbmQ/KCk6IHZvaWQ7XG4gIGFic3RyYWN0IHdoZW5SZW5kZXJpbmdEb25lPygpOiBQcm9taXNlPGFueT47XG59XG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgZW51bSBSZW5kZXJlclN0eWxlRmxhZ3MyIHtcbiAgSW1wb3J0YW50ID0gMSA8PCAwLFxuICBEYXNoQ2FzZSA9IDEgPDwgMVxufVxuXG4vKipcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlbmRlcmVyMiB7XG4gIC8qKlxuICAgKiBUaGlzIGZpZWxkIGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFyYml0cmFyeSBkYXRhIG9uIHRoaXMgcmVuZGVyZXIgaW5zdGFuY2UuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGZvciByZW5kZXJlcnMgdGhhdCBkZWxlZ2F0ZSB0byBvdGhlciByZW5kZXJlcnMuXG4gICAqL1xuICBhYnN0cmFjdCBnZXQgZGF0YSgpOiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICBhYnN0cmFjdCBkZXN0cm95KCk6IHZvaWQ7XG4gIGFic3RyYWN0IGNyZWF0ZUVsZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbCk6IGFueTtcbiAgYWJzdHJhY3QgY3JlYXRlQ29tbWVudCh2YWx1ZTogc3RyaW5nKTogYW55O1xuICBhYnN0cmFjdCBjcmVhdGVUZXh0KHZhbHVlOiBzdHJpbmcpOiBhbnk7XG4gIC8qKlxuICAgKiBUaGlzIHByb3BlcnR5IGlzIGFsbG93ZWQgdG8gYmUgbnVsbCAvIHVuZGVmaW5lZCxcbiAgICogaW4gd2hpY2ggY2FzZSB0aGUgdmlldyBlbmdpbmUgd29uJ3QgY2FsbCBpdC5cbiAgICogVGhpcyBpcyB1c2VkIGFzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIGZvciBwcm9kdWN0aW9uIG1vZGUuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgZGVzdHJveU5vZGUgITogKChub2RlOiBhbnkpID0+IHZvaWQpIHwgbnVsbDtcbiAgYWJzdHJhY3QgYXBwZW5kQ2hpbGQocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnkpOiB2b2lkO1xuICBhYnN0cmFjdCBpbnNlcnRCZWZvcmUocGFyZW50OiBhbnksIG5ld0NoaWxkOiBhbnksIHJlZkNoaWxkOiBhbnkpOiB2b2lkO1xuICBhYnN0cmFjdCByZW1vdmVDaGlsZChwYXJlbnQ6IGFueSwgb2xkQ2hpbGQ6IGFueSk6IHZvaWQ7XG4gIGFic3RyYWN0IHNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yT3JOb2RlOiBzdHJpbmd8YW55KTogYW55O1xuICAvKipcbiAgICogQXR0ZW50aW9uOiBPbiBXZWJXb3JrZXJzLCB0aGlzIHdpbGwgYWx3YXlzIHJldHVybiBhIHZhbHVlLFxuICAgKiBhcyB3ZSBhcmUgYXNraW5nIGZvciBhIHJlc3VsdCBzeW5jaHJvbm91c2x5LiBJLmUuXG4gICAqIHRoZSBjYWxsZXIgY2FuJ3QgcmVseSBvbiBjaGVja2luZyB3aGV0aGVyIHRoaXMgaXMgbnVsbCBvciBub3QuXG4gICAqL1xuICBhYnN0cmFjdCBwYXJlbnROb2RlKG5vZGU6IGFueSk6IGFueTtcbiAgLyoqXG4gICAqIEF0dGVudGlvbjogT24gV2ViV29ya2VycywgdGhpcyB3aWxsIGFsd2F5cyByZXR1cm4gYSB2YWx1ZSxcbiAgICogYXMgd2UgYXJlIGFza2luZyBmb3IgYSByZXN1bHQgc3luY2hyb25vdXNseS4gSS5lLlxuICAgKiB0aGUgY2FsbGVyIGNhbid0IHJlbHkgb24gY2hlY2tpbmcgd2hldGhlciB0aGlzIGlzIG51bGwgb3Igbm90LlxuICAgKi9cbiAgYWJzdHJhY3QgbmV4dFNpYmxpbmcobm9kZTogYW55KTogYW55O1xuICBhYnN0cmFjdCBzZXRBdHRyaWJ1dGUoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lc3BhY2U/OiBzdHJpbmd8bnVsbCk6IHZvaWQ7XG4gIGFic3RyYWN0IHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsKTogdm9pZDtcbiAgYWJzdHJhY3QgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgcmVtb3ZlQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0U3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgdmFsdWU6IGFueSwgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZDtcbiAgYWJzdHJhY3QgcmVtb3ZlU3R5bGUoZWw6IGFueSwgc3R5bGU6IHN0cmluZywgZmxhZ3M/OiBSZW5kZXJlclN0eWxlRmxhZ3MyKTogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZDtcbiAgYWJzdHJhY3Qgc2V0VmFsdWUobm9kZTogYW55LCB2YWx1ZTogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgbGlzdGVuKFxuICAgICAgdGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnksIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgY2FsbGJhY2s6IChldmVudDogYW55KSA9PiBib29sZWFuIHwgdm9pZCk6ICgpID0+IHZvaWQ7XG59XG4iXX0=