import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//=> State 类型表
export type popupsState = {
	arr: [
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
	arr: [{}]
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
				id?: string
				type: string
				content: string
				timeout: number
			}>
		) => {
			const { id, type, content, timeout } = action.payload
			state.arr.push({
				id: id,
				type: type,
				content: content,
				timeout: timeout,
				close: false
			})
		},
		closePopup: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload
			state.arr[state.arr.findIndex(item => item.id === id)].close = true
		},
		removePopup: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload
			state.arr.splice(
				state.arr.findIndex(item => item.id === id),
				1
			)
		},
		clearAllPopups: state => {
			state.arr = [{}]
		}
	}
})

export const { addPopup, removePopup, clearAllPopups, closePopup } =
	popupsSlice.actions

export default popupsSlice.reducer
