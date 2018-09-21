/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import '../ng_dev_mode';
import { getContext } from '../context_discovery';
import { scheduleTick } from '../instructions';
import { createEmptyStylingContext } from '../styling';
import { getRootContext } from '../util';
import { CorePlayerHandler } from './core_player_handler';
export function addPlayer(ref, player) {
    const elementContext = getContext(ref);
    const animationContext = getOrCreateAnimationContext(elementContext.native, elementContext);
    animationContext.push(player);
    player.addEventListener(200 /* Destroyed */, () => {
        const index = animationContext.indexOf(player);
        if (index >= 0) {
            animationContext.splice(index, 1);
        }
        player.destroy();
    });
    const rootContext = getRootContext(elementContext.lViewData);
    const playerHandler = rootContext.playerHandler || (rootContext.playerHandler = new CorePlayerHandler());
    playerHandler.queuePlayer(player, ref);
    const nothingScheduled = rootContext.flags === 0 /* Empty */;
    // change detection may or may not happen therefore
    // the core code needs to be kicked off to flush the animations
    rootContext.flags |= 2 /* FlushPlayers */;
    if (nothingScheduled) {
        scheduleTick(rootContext);
    }
}
export function getPlayers(ref) {
    return getOrCreateAnimationContext(ref);
}
export function getOrCreateAnimationContext(target, context) {
    context = context || getContext(target);
    if (ngDevMode && !context) {
        throw new Error('Only elements that exist in an Angular application can be used for animations');
    }
    const { lViewData, lNodeIndex } = context;
    const value = lViewData[lNodeIndex];
    let stylingContext = value;
    if (!Array.isArray(value)) {
        stylingContext = lViewData[lNodeIndex] = createEmptyStylingContext(value);
    }
    return stylingContext[1 /* AnimationContext */] || allocAnimationContext(stylingContext);
}
function allocAnimationContext(data) {
    return data[1 /* AnimationContext */] = [];
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvYW5pbWF0aW9ucy9wbGF5ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFXLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUc3QyxPQUFPLEVBQStCLHlCQUF5QixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFdkMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHeEQsTUFBTSxVQUFVLFNBQVMsQ0FDckIsR0FBd0QsRUFBRSxNQUFjO0lBQzFFLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUcsQ0FBQztJQUN6QyxNQUFNLGdCQUFnQixHQUFHLDJCQUEyQixDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFHLENBQUM7SUFDOUYsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTlCLE1BQU0sQ0FBQyxnQkFBZ0Isc0JBQXNCLEdBQUcsRUFBRTtRQUNoRCxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0QsTUFBTSxhQUFhLEdBQ2YsV0FBVyxDQUFDLGFBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDdkYsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdkMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsS0FBSyxrQkFBMkIsQ0FBQztJQUV0RSxtREFBbUQ7SUFDbkQsK0RBQStEO0lBQy9ELFdBQVcsQ0FBQyxLQUFLLHdCQUFpQyxDQUFDO0lBQ25ELElBQUksZ0JBQWdCLEVBQUU7UUFDcEIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzNCO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsR0FBd0Q7SUFDakYsT0FBTywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQsTUFBTSxVQUFVLDJCQUEyQixDQUN2QyxNQUFVLEVBQUUsT0FBeUI7SUFDdkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFHLENBQUM7SUFDMUMsSUFBSSxTQUFTLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDekIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrRUFBK0UsQ0FBQyxDQUFDO0tBQ3RGO0lBRUQsTUFBTSxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsR0FBRyxPQUFPLENBQUM7SUFDeEMsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLElBQUksY0FBYyxHQUFHLEtBQXVCLENBQUM7SUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDekIsY0FBYyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyx5QkFBeUIsQ0FBQyxLQUFxQixDQUFDLENBQUM7S0FDM0Y7SUFDRCxPQUFPLGNBQWMsMEJBQStCLElBQUkscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDaEcsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsSUFBb0I7SUFDakQsT0FBTyxJQUFJLDBCQUErQixHQUFHLEVBQUUsQ0FBQztBQUNsRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICcuLi9uZ19kZXZfbW9kZSc7XG5cbmltcG9ydCB7TENvbnRleHQsIGdldENvbnRleHR9IGZyb20gJy4uL2NvbnRleHRfZGlzY292ZXJ5JztcbmltcG9ydCB7c2NoZWR1bGVUaWNrfSBmcm9tICcuLi9pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHtMRWxlbWVudE5vZGV9IGZyb20gJy4uL2ludGVyZmFjZXMvbm9kZSc7XG5pbXBvcnQge1Jvb3RDb250ZXh0RmxhZ3N9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge1N0eWxpbmdDb250ZXh0LCBTdHlsaW5nSW5kZXgsIGNyZWF0ZUVtcHR5U3R5bGluZ0NvbnRleHR9IGZyb20gJy4uL3N0eWxpbmcnO1xuaW1wb3J0IHtnZXRSb290Q29udGV4dH0gZnJvbSAnLi4vdXRpbCc7XG5cbmltcG9ydCB7Q29yZVBsYXllckhhbmRsZXJ9IGZyb20gJy4vY29yZV9wbGF5ZXJfaGFuZGxlcic7XG5pbXBvcnQge0FuaW1hdGlvbkNvbnRleHQsIENvbXBvbmVudEluc3RhbmNlLCBEaXJlY3RpdmVJbnN0YW5jZSwgUGxheVN0YXRlLCBQbGF5ZXJ9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRQbGF5ZXIoXG4gICAgcmVmOiBDb21wb25lbnRJbnN0YW5jZSB8IERpcmVjdGl2ZUluc3RhbmNlIHwgSFRNTEVsZW1lbnQsIHBsYXllcjogUGxheWVyKTogdm9pZCB7XG4gIGNvbnN0IGVsZW1lbnRDb250ZXh0ID0gZ2V0Q29udGV4dChyZWYpICE7XG4gIGNvbnN0IGFuaW1hdGlvbkNvbnRleHQgPSBnZXRPckNyZWF0ZUFuaW1hdGlvbkNvbnRleHQoZWxlbWVudENvbnRleHQubmF0aXZlLCBlbGVtZW50Q29udGV4dCkgITtcbiAgYW5pbWF0aW9uQ29udGV4dC5wdXNoKHBsYXllcik7XG5cbiAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoUGxheVN0YXRlLkRlc3Ryb3llZCwgKCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gYW5pbWF0aW9uQ29udGV4dC5pbmRleE9mKHBsYXllcik7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIGFuaW1hdGlvbkNvbnRleHQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcGxheWVyLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgY29uc3Qgcm9vdENvbnRleHQgPSBnZXRSb290Q29udGV4dChlbGVtZW50Q29udGV4dC5sVmlld0RhdGEpO1xuICBjb25zdCBwbGF5ZXJIYW5kbGVyID1cbiAgICAgIHJvb3RDb250ZXh0LnBsYXllckhhbmRsZXIgfHwgKHJvb3RDb250ZXh0LnBsYXllckhhbmRsZXIgPSBuZXcgQ29yZVBsYXllckhhbmRsZXIoKSk7XG4gIHBsYXllckhhbmRsZXIucXVldWVQbGF5ZXIocGxheWVyLCByZWYpO1xuXG4gIGNvbnN0IG5vdGhpbmdTY2hlZHVsZWQgPSByb290Q29udGV4dC5mbGFncyA9PT0gUm9vdENvbnRleHRGbGFncy5FbXB0eTtcblxuICAvLyBjaGFuZ2UgZGV0ZWN0aW9uIG1heSBvciBtYXkgbm90IGhhcHBlbiB0aGVyZWZvcmVcbiAgLy8gdGhlIGNvcmUgY29kZSBuZWVkcyB0byBiZSBraWNrZWQgb2ZmIHRvIGZsdXNoIHRoZSBhbmltYXRpb25zXG4gIHJvb3RDb250ZXh0LmZsYWdzIHw9IFJvb3RDb250ZXh0RmxhZ3MuRmx1c2hQbGF5ZXJzO1xuICBpZiAobm90aGluZ1NjaGVkdWxlZCkge1xuICAgIHNjaGVkdWxlVGljayhyb290Q29udGV4dCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBsYXllcnMocmVmOiBDb21wb25lbnRJbnN0YW5jZSB8IERpcmVjdGl2ZUluc3RhbmNlIHwgSFRNTEVsZW1lbnQpOiBQbGF5ZXJbXSB7XG4gIHJldHVybiBnZXRPckNyZWF0ZUFuaW1hdGlvbkNvbnRleHQocmVmKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE9yQ3JlYXRlQW5pbWF0aW9uQ29udGV4dChcbiAgICB0YXJnZXQ6IHt9LCBjb250ZXh0PzogTENvbnRleHQgfCBudWxsKTogQW5pbWF0aW9uQ29udGV4dCB7XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IGdldENvbnRleHQodGFyZ2V0KSAhO1xuICBpZiAobmdEZXZNb2RlICYmICFjb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnT25seSBlbGVtZW50cyB0aGF0IGV4aXN0IGluIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gY2FuIGJlIHVzZWQgZm9yIGFuaW1hdGlvbnMnKTtcbiAgfVxuXG4gIGNvbnN0IHtsVmlld0RhdGEsIGxOb2RlSW5kZXh9ID0gY29udGV4dDtcbiAgY29uc3QgdmFsdWUgPSBsVmlld0RhdGFbbE5vZGVJbmRleF07XG4gIGxldCBzdHlsaW5nQ29udGV4dCA9IHZhbHVlIGFzIFN0eWxpbmdDb250ZXh0O1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgc3R5bGluZ0NvbnRleHQgPSBsVmlld0RhdGFbbE5vZGVJbmRleF0gPSBjcmVhdGVFbXB0eVN0eWxpbmdDb250ZXh0KHZhbHVlIGFzIExFbGVtZW50Tm9kZSk7XG4gIH1cbiAgcmV0dXJuIHN0eWxpbmdDb250ZXh0W1N0eWxpbmdJbmRleC5BbmltYXRpb25Db250ZXh0XSB8fCBhbGxvY0FuaW1hdGlvbkNvbnRleHQoc3R5bGluZ0NvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBhbGxvY0FuaW1hdGlvbkNvbnRleHQoZGF0YTogU3R5bGluZ0NvbnRleHQpOiBBbmltYXRpb25Db250ZXh0IHtcbiAgcmV0dXJuIGRhdGFbU3R5bGluZ0luZGV4LkFuaW1hdGlvbkNvbnRleHRdID0gW107XG59XG4iXX0=