import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { addPopup, removePopup, clearAllPopups } from './slice'

//=> 获取弹窗列表
export function useActivePopups() {
	const list = useAppSelector((state: AppState) => state.popup)
	return useMemo(() => list.filter(v => Object.keys(v).length > 0), [list])
}

//=> 添加弹窗
export function useAddPopup(): (
	type: string,
	content: string,
	timeout: number
) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(type: string, content: string, timeout: number) =>
			dispatch(
				addPopup({
					type: type,
					content: content,
					timeout: timeout
				})
			),
		[dispatch]
	)
}

//=> 移除弹窗
export function useRemovePopup(): (id: number) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: number) => dispatch(removePopup({ id: id })),
		[dispatch]
	)
}
