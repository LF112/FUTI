import { useCallback } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateModel3, Live2DState } from './slice'

//=> 获取 Live2D Model3 对象
export function useModel3(): Live2DState {
	const live2d = useAppSelector((state: AppState) => state.live2d)
	return live2d
}

//=> 更新 Livbe2D Model3 对象
export function useUpdateModel3(): (model3Object: Live2DState) => void {
	const dispatch = useAppDispatch()
	return useCallback(
		(model3Object: Live2DState) =>
			dispatch(updateModel3({ arr: model3Object })),
		[dispatch]
	)
}
