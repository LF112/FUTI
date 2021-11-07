import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//=> State 类型表
export type popupsState = {
	popup: [
		{
			id?: string
			type?: string
			content?: string
			timeout?: number
			close?: boolean
		}
	]
}

//=> State 初始化
export const initialState: popupsState = {
	popup: [{}]
}

//=> SLICE
export const popupsSlice = createSlice({
	name: 'popups',
	initialState,
	reducers: {
		//=> FUNCTIONS
		addPopup: (
			state,
			action: PayloadAction<{
				use: string
				id?: string
				type: string
				content: string
				timeout: number
			}>
		) => {
			const { use, id, type, content, timeout } = action.payload
			state[use].push({
				id: id,
				type: type,
				content: content,
				timeout: timeout,
				close: false
			})
		},
		closePopup: (state, action: PayloadAction<{ use: string; id: string }>) => {
			const { use, id } = action.payload
			state[use][state[use].findIndex(item => item.id === id)].close = true
		},
		removePopup: (
			state,
			action: PayloadAction<{ use: string; id: string }>
		) => {
			const { use, id } = action.payload
			state[use].splice(
				state[use].findIndex(item => item.id === id),
				1
			)
		}
	}
})

export const { addPopup, removePopup, closePopup } = popupsSlice.actions

export default popupsSlice.reducer
