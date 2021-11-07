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
