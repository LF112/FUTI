/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { configureStore } from '@reduxjs/toolkit'
//[ package ]

//
import status from './status/slice'
import popup from './popup/slice'

//[ 导入 state ]

//=> 启用 state 缓存
// import { save, load } from 'redux-localstorage-simple'
// const PERSISTED_KEYS: string[] = ['config'] //=> 指定要缓存的 state 键名
//=> 导入 Fetch 中间件

const store = configureStore({
	//=> 绑定 state
	reducer: {
		status,
		popup
	}
	//=> 插入缓存 state 中间件
	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware({ thunk: true }).concat(
	// 		save({
	// 			states: PERSISTED_KEYS,
	// 			debounce: 500,
	// 			ignoreStates: ['status']
	// 		})
	// 	),
	// preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true }) // 配置缓存的 state
})

//=> export State
export default store

//=> 导出 dispatch 和 selector Types
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
