import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import {
	updateLoadAn,
	updateLive2dInit,
	updateLive2dDomInit,
	updateLive2dShow,
	updateLive2dUnfold
} from './slice'

//=> 获取载入状态
export function useLoadStatus() {
	const state = useAppSelector((state: AppState) => state.animation)
	return useMemo(() => state.load, [state])
}

//=> 更新载入状态
export function useUpdateLoadStatus(): (status: boolean) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(status: boolean) => dispatch(updateLoadAn({ status: status })),
		[dispatch]
	)
}

//=> 获取 Live2d 状态 | 完全载入、 Dom 载入、是否载入、展开状态
export function useL2dInitStatus() {
	const status = useAppSelector((state: AppState) => state.animation)
	return useMemo(
		() => [
			status.live2d.init,
			status.live2d.domInit,
			status.live2d.show,
			status.live2d.unfold
		],
		[status]
	)
}

//=> 更新 Livb2d 初始化状态
export function useUpdateL2dInitStatus(): (status: boolean) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(status: boolean) => dispatch(updateLive2dInit({ status: status })),
		[dispatch]
	)
}

//=> 更新 Livb2d 组件载入状态
export function useUpdateL2dDomInitStatus(): (status: boolean) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(status: boolean) => dispatch(updateLive2dDomInit({ status: status })),
		[dispatch]
	)
}

//=> 更新 Livb2d 是否载入状态
export function useUpdateL2dShowStatus(): (status: boolean) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(status: boolean) => dispatch(updateLive2dShow({ status: status })),
		[dispatch]
	)
}

//=> 更新 live2d 展开状态
export function useUpdateL2dUnfoldStatus(): (status: boolean) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(status: boolean) => dispatch(updateLive2dUnfold({ status: status })),
		[dispatch]
	)
}
