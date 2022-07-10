/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
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
//[ package ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

//=> 获取载入状态
export function useLoadStatus() {
	const state = useAppSelector((state: AppState) => state.status)
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
	const status = useAppSelector((state: AppState) => state.status)
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
