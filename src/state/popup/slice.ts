import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//=> State 类型表
export type popupsState = [
	{
		id?: string
		type?: string
		content?: string
		timeout?: number
		close?: boolean
	}
]

//=> State 初始化
export const initialState: popupsState = [{}]

//=> SLICE
export const popupsSlice = createSlice({
	name: 'popups',
	initialState,
	reducers: {
		//=> FUNCTIONS
		addPopup: (
			state,
			action: PayloadAction<{
				type: string
				content: string
				timeout: number
			}>
		) => {
			const { type, content, timeout } = action.payload
			state.push({
				type: type,
				content: content,
				timeout: timeout,
				close: false
			})
		},
		closePopup: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			state[id + 1].close = true
		},
		removePopup: (state, action: PayloadAction<{ id: number }>) => {
			const { id } = action.payload
			state.splice(id + 1, 1)
		},
		clearAllPopups: state => (state = [{}])
	}
})

export const { addPopup, removePopup, clearAllPopups, closePopup } =
	popupsSlice.actions

export default popupsSlice.reducer
