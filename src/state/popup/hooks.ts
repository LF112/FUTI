import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { addPopup, removePopup, closePopup } from './slice'

//=> 获取弹窗列表
export function useActivePopups() {
	const list = useAppSelector((state: AppState) => state.popup)
	return useMemo(() => list.filter(v => Object.keys(v).length > 0), [list])
}

//=> 添加弹窗
export function useAddPopup(): [
	(type: string, content: string, timeout: number) => void,
	number
] {
	const dispatch = useAppDispatch()
	const List = useActivePopups()

	const callback = useCallback(
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
	return [callback, List.length]
}

//=> 带动画关闭弹窗
export function useClosePopup(): (id: number) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: number) => dispatch(closePopup({ id: id })),
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
