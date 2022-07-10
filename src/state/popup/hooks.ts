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
import { addPopup, removePopup, closePopup } from './slice'
//[ package ]

/**
 * 获取 popup 列表
 * @returns [{ id: string, type: string, content: string, timeout: number, icon: string, close: boolean }]
 */
export function useActivePopups() {
	const list = useAppSelector((state: AppState) => state.popup)
	return useMemo(
		() => list.filter((v: {}) => Object.keys(v).length > 0),
		[list]
	)
}

//=> 存储 choose popup CALLBACK 方法
const chooseFn: {
	[key: string]: (close: () => void, choose?: boolean) => void
} = {}
/**
 * 添加 popup
 * @example
 * //=> 弹出普通类型的 popup
 * addPopup('{ content }', '{ success, error, warning, info }')
 * //=> 弹出选择型 popup
 * addPopup('{ content }', 'choose', (close: () => void, choose: boolean) => { ... })
 * @param content popup 内容
 * @param type popup 类型 { success, error, warning, info, choose }
 * @param callback  choose popup 用户选择时回调
 * @param icon popup 图标
 * @returns {Function}
 */
export function useAddPopup(): (
	content: string,
	type: string,
	callback: any,
	icon?: any
) => void | string {
	const dispatch = useAppDispatch()

	const stateCallback = useCallback(
		(content: string, type: string, callback: any, icon: any) => {
			const callbackType = typeof callback
			if (callback === -1) {
				const CBID = Math.random().toString(36).slice(-8)
				dispatch(
					addPopup({
						id: CBID,
						type: type,
						content: content
					})
				)
				return CBID
			} else if (callbackType === 'function') {
				//=> 仅支持选择回调
				const CBID = Math.random().toString(36).slice(-8)
				chooseFn[CBID] = callback
				//=> DISPATCH !
				dispatch(
					addPopup({
						id: CBID,
						type: type,
						content: content
					})
				)
			} else if (callbackType === 'number') {
				//=> 仅支持时长
				const timeout = callback

				//=> DISPATCH !
				dispatch(
					addPopup({
						id: Math.random().toString(36).slice(-8),
						type: type,
						content: content,
						timeout: timeout
					})
				)
			} else {
				//=> 仅支持图标 / 显示时长
				const mIcon = callback
				const timeout = icon

				//=> DISPATCH !
				dispatch(
					addPopup({
						id: Math.random().toString(36).slice(-8),
						type: type,
						content: content,
						timeout: timeout,
						icon: mIcon
					})
				)
			}
		},
		[dispatch]
	)
	return stateCallback
}

/**
 * 触发选择型 popup 对应的回调
 * @param id popup id
 * @param choose popup 用户选择
 * @param close popup item 传入的关闭方法
 * @returns {Function}
 */
export function useTriggerChoose(): (
	id: string,
	choose: boolean,
	close: () => void
) => void {
	return useCallback((id: string, choose: boolean, close: () => void) => {
		if (chooseFn[id] !== undefined) {
			//=> 触发
			chooseFn[id](close, choose)
			delete chooseFn[id]
		} else close() // 此处应弹出异常
	}, [])
}

/**
 * 带动画关闭弹窗
 * @param id popup id
 * @returns {Function}
 */
export function useClosePopup(): (id: string) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: string) => dispatch(closePopup({ id: id })),
		[dispatch]
	)
}

/**
 * 移除弹窗
 * @param id popup id
 * @returns {Function}
 */
export function useRemovePopup(): (id: string) => void {
	const dispatch = useAppDispatch()

	return useCallback(
		(id: string) => dispatch(removePopup({ id: id })),
		[dispatch]
	)
}
