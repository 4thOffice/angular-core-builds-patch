/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { getCompilerFacade } from '../../compiler/compiler_facade';
import { reflectDependencies } from '../../di/jit/util';
import { NG_FACTORY_DEF, NG_PIPE_DEF } from '../fields';
import { angularCoreEnv } from './environment';
export function compilePipe(type, meta) {
    let ngPipeDef = null;
    let ngFactoryDef = null;
    Object.defineProperty(type, NG_FACTORY_DEF, {
        get: () => {
            if (ngFactoryDef === null) {
                const metadata = getPipeMetadata(type, meta);
                const compiler = getCompilerFacade({ usage: 0 /* Decorator */, kind: 'pipe', type: metadata.type });
                ngFactoryDef = compiler.compileFactory(angularCoreEnv, `ng:///${metadata.name}/ɵfac.js`, {
                    name: metadata.name,
                    type: metadata.type,
                    typeArgumentCount: 0,
                    deps: reflectDependencies(type),
                    target: compiler.FactoryTarget.Pipe
                });
            }
            return ngFactoryDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
    Object.defineProperty(type, NG_PIPE_DEF, {
        get: () => {
            if (ngPipeDef === null) {
                const metadata = getPipeMetadata(type, meta);
                const compiler = getCompilerFacade({ usage: 0 /* Decorator */, kind: 'pipe', type: metadata.type });
                ngPipeDef =
                    compiler.compilePipe(angularCoreEnv, `ng:///${metadata.name}/ɵpipe.js`, metadata);
            }
            return ngPipeDef;
        },
        // Make the property configurable in dev mode to allow overriding in tests
        configurable: !!ngDevMode,
    });
}
function getPipeMetadata(type, meta) {
    return {
        type: type,
        name: type.name,
        pipeName: meta.name,
        pure: meta.pure !== undefined ? meta.pure : true,
        // TODO(alxhub): pass through the standalone flag from the pipe metadata once standalone
        // functionality is fully rolled out.
        isStandalone: false,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaml0L3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUF5QyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBR3RELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRXRELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFN0MsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFlLEVBQUUsSUFBVTtJQUNyRCxJQUFJLFNBQVMsR0FBUSxJQUFJLENBQUM7SUFDMUIsSUFBSSxZQUFZLEdBQVEsSUFBSSxDQUFDO0lBRTdCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtRQUMxQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ1IsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO2dCQUN6QixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FDOUIsRUFBQyxLQUFLLG1CQUE0QixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUM1RSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxRQUFRLENBQUMsSUFBSSxVQUFVLEVBQUU7b0JBQ3ZGLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtvQkFDbkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO29CQUNuQixpQkFBaUIsRUFBRSxDQUFDO29CQUNwQixJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDO29CQUMvQixNQUFNLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJO2lCQUNwQyxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFDRCwwRUFBMEU7UUFDMUUsWUFBWSxFQUFFLENBQUMsQ0FBQyxTQUFTO0tBQzFCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtRQUN2QyxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ1IsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO2dCQUN0QixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FDOUIsRUFBQyxLQUFLLG1CQUE0QixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUM1RSxTQUFTO29CQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLFNBQVMsUUFBUSxDQUFDLElBQUksV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZGO1lBQ0QsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztRQUNELDBFQUEwRTtRQUMxRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVM7S0FDMUIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLElBQWUsRUFBRSxJQUFVO0lBQ2xELE9BQU87UUFDTCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDaEQsd0ZBQXdGO1FBQ3hGLHFDQUFxQztRQUNyQyxZQUFZLEVBQUUsS0FBSztLQUNwQixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2dldENvbXBpbGVyRmFjYWRlLCBKaXRDb21waWxlclVzYWdlLCBSM1BpcGVNZXRhZGF0YUZhY2FkZX0gZnJvbSAnLi4vLi4vY29tcGlsZXIvY29tcGlsZXJfZmFjYWRlJztcbmltcG9ydCB7cmVmbGVjdERlcGVuZGVuY2llc30gZnJvbSAnLi4vLi4vZGkvaml0L3V0aWwnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge1BpcGV9IGZyb20gJy4uLy4uL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHtOR19GQUNUT1JZX0RFRiwgTkdfUElQRV9ERUZ9IGZyb20gJy4uL2ZpZWxkcyc7XG5cbmltcG9ydCB7YW5ndWxhckNvcmVFbnZ9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVBpcGUodHlwZTogVHlwZTxhbnk+LCBtZXRhOiBQaXBlKTogdm9pZCB7XG4gIGxldCBuZ1BpcGVEZWY6IGFueSA9IG51bGw7XG4gIGxldCBuZ0ZhY3RvcnlEZWY6IGFueSA9IG51bGw7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIE5HX0ZBQ1RPUllfREVGLCB7XG4gICAgZ2V0OiAoKSA9PiB7XG4gICAgICBpZiAobmdGYWN0b3J5RGVmID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gZ2V0UGlwZU1ldGFkYXRhKHR5cGUsIG1ldGEpO1xuICAgICAgICBjb25zdCBjb21waWxlciA9IGdldENvbXBpbGVyRmFjYWRlKFxuICAgICAgICAgICAge3VzYWdlOiBKaXRDb21waWxlclVzYWdlLkRlY29yYXRvciwga2luZDogJ3BpcGUnLCB0eXBlOiBtZXRhZGF0YS50eXBlfSk7XG4gICAgICAgIG5nRmFjdG9yeURlZiA9IGNvbXBpbGVyLmNvbXBpbGVGYWN0b3J5KGFuZ3VsYXJDb3JlRW52LCBgbmc6Ly8vJHttZXRhZGF0YS5uYW1lfS/JtWZhYy5qc2AsIHtcbiAgICAgICAgICBuYW1lOiBtZXRhZGF0YS5uYW1lLFxuICAgICAgICAgIHR5cGU6IG1ldGFkYXRhLnR5cGUsXG4gICAgICAgICAgdHlwZUFyZ3VtZW50Q291bnQ6IDAsXG4gICAgICAgICAgZGVwczogcmVmbGVjdERlcGVuZGVuY2llcyh0eXBlKSxcbiAgICAgICAgICB0YXJnZXQ6IGNvbXBpbGVyLkZhY3RvcnlUYXJnZXQuUGlwZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZ0ZhY3RvcnlEZWY7XG4gICAgfSxcbiAgICAvLyBNYWtlIHRoZSBwcm9wZXJ0eSBjb25maWd1cmFibGUgaW4gZGV2IG1vZGUgdG8gYWxsb3cgb3ZlcnJpZGluZyBpbiB0ZXN0c1xuICAgIGNvbmZpZ3VyYWJsZTogISFuZ0Rldk1vZGUsXG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBOR19QSVBFX0RFRiwge1xuICAgIGdldDogKCkgPT4ge1xuICAgICAgaWYgKG5nUGlwZURlZiA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGdldFBpcGVNZXRhZGF0YSh0eXBlLCBtZXRhKTtcbiAgICAgICAgY29uc3QgY29tcGlsZXIgPSBnZXRDb21waWxlckZhY2FkZShcbiAgICAgICAgICAgIHt1c2FnZTogSml0Q29tcGlsZXJVc2FnZS5EZWNvcmF0b3IsIGtpbmQ6ICdwaXBlJywgdHlwZTogbWV0YWRhdGEudHlwZX0pO1xuICAgICAgICBuZ1BpcGVEZWYgPVxuICAgICAgICAgICAgY29tcGlsZXIuY29tcGlsZVBpcGUoYW5ndWxhckNvcmVFbnYsIGBuZzovLy8ke21ldGFkYXRhLm5hbWV9L8m1cGlwZS5qc2AsIG1ldGFkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZ1BpcGVEZWY7XG4gICAgfSxcbiAgICAvLyBNYWtlIHRoZSBwcm9wZXJ0eSBjb25maWd1cmFibGUgaW4gZGV2IG1vZGUgdG8gYWxsb3cgb3ZlcnJpZGluZyBpbiB0ZXN0c1xuICAgIGNvbmZpZ3VyYWJsZTogISFuZ0Rldk1vZGUsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQaXBlTWV0YWRhdGEodHlwZTogVHlwZTxhbnk+LCBtZXRhOiBQaXBlKTogUjNQaXBlTWV0YWRhdGFGYWNhZGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgbmFtZTogdHlwZS5uYW1lLFxuICAgIHBpcGVOYW1lOiBtZXRhLm5hbWUsXG4gICAgcHVyZTogbWV0YS5wdXJlICE9PSB1bmRlZmluZWQgPyBtZXRhLnB1cmUgOiB0cnVlLFxuICAgIC8vIFRPRE8oYWx4aHViKTogcGFzcyB0aHJvdWdoIHRoZSBzdGFuZGFsb25lIGZsYWcgZnJvbSB0aGUgcGlwZSBtZXRhZGF0YSBvbmNlIHN0YW5kYWxvbmVcbiAgICAvLyBmdW5jdGlvbmFsaXR5IGlzIGZ1bGx5IHJvbGxlZCBvdXQuXG4gICAgaXNTdGFuZGFsb25lOiBmYWxzZSxcbiAgfTtcbn1cbiJdfQ==