import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { addPopup, removePopup, closePopup } from './slice'

//=> 获取弹窗列表
export function useActivePopups() {
	const list = useAppSelector((state: AppState) => state.popup)
	return useMemo(
		() => list['popup'].filter(v => Object.keys(v).length > 0),
		[list['popup']]
	)
}
// 获取軟體不穩定的弹窗列表
export function useActiveRA9() {
	const list = useAppSelector((state: AppState) => state.popup)
	return useMemo(
		() => list['RA9'].filter(v => Object.keys(v).length > 0),
		[list['RA9']]
	)
}

//=> 添加弹窗
export function useAddPopup(): (
	type: string,
	content: string,
	timeout: number,
	id?: string
) => void {
	const dispatch = useAppDispatch()

	const callback = useCallback(
		(type: string, content: string, timeout: number, id?: string) =>
			dispatch(
				addPopup({
					use: 'popup',
					id: id ? id : Math.random().toString(36).slice(-8),
					type: type,
					content: content,
					timeout: timeout
				})
			),
		[dispatch]
	)
	return callback
}
// 添加軟體不穩定
export function useAddRA9(): (down: boolean, content: string) => void {
	const dispatch = useAppDispatch()

	const callback = useCallback(
		(down: boolean, content: string) =>
			dispatch(
				addPopup({
					use: 'RA9',
					id: Math.random().toString(36).slice(-8),
					type: down,
					content: content,
					timeout: 0
				})
			),
		[dispatch]
	)
	return callback
}

//=> 带动画关闭弹窗
export function useClosePopup(): (id: string) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: string) => dispatch(closePopup({ use: 'popup', id: id })),
		[dispatch]
	)
}

//=> 移除弹窗
export function useRemovePopup(): (id: string) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: string) => dispatch(removePopup({ use: 'popup', id: id })),
		[dispatch]
	)
}
// 移除軟體不穩定
export function useRemoveRA9(): (id: string) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: string) => dispatch(removePopup({ use: 'RA9', id: id })),
		[dispatch]
	)
}
