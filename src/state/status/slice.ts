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
export type statusState = {
	load: boolean // 页面载入状态
	live2d: {
		//=> Live2D 状态
		show: boolean // Live2D 显示状态
		init: boolean // Live2D 装载状态
		domInit: boolean // Live2D Dom 载入状态
		unfold: boolean // Live2D 组件展开状态
	}
}

//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: statusState = {
	load: false,
	live2d: {
		show: false,
		init: false,
		domInit: false,
		unfold: false
	}
}

//=> SLICE
export const statusSlice = createSlice({
	name: 'status', //=> State name | '一般为 state 名字'
	initialState,
	reducers: {
		//=> FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
		updateLoadAn: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload
			state.load = status
		},
		updateLive2dShow: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload
			state.live2d.show = status
		},
		updateLive2dInit: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload
			state.live2d.init = status
		},
		updateLive2dUnfold: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload
			state.live2d.unfold = status
		},
		updateLive2dDomInit: (
			state,
			action: PayloadAction<{ status: boolean }>
		) => {
			const { status } = action.payload
			state.live2d.domInit = status
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const {
	updateLoadAn,
	updateLive2dInit,
	updateLive2dDomInit,
	updateLive2dShow,
	updateLive2dUnfold
} = statusSlice.actions
//=> export reducer
export default statusSlice.reducer
