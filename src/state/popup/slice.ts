/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//[ package ]

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
export type AnimationState = [
	{
		id?: string
		type?: string
		content?: string
		timeout?: number
		icon?: string
		close?: boolean
	}
]
//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: AnimationState = [{}]
//=> SLICE
export const animationSlice = createSlice({
	name: 'popups', //=> State name | '一般为 state 名字'
	initialState,
	reducers: {
		//=> FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
		addPopup: (
			state,
			action: PayloadAction<{
				id?: string
				type: any
				content: string
				timeout?: number
				icon?: string
			}>
		) => {
			const { id, type, content, timeout, icon } = action.payload
			state.push({
				id: id,
				type: type,
				content: content,
				timeout: timeout,
				icon: icon,
				close: false
			})
		},
		closePopup: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload
			state[state.findIndex(item => item.id === id)].close = true
		},
		removePopup: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload
			state.splice(
				state.findIndex(item => item.id === id),
				1
			)
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const { addPopup, removePopup, closePopup } = animationSlice.actions
//=> export reducer
export default animationSlice.reducer
