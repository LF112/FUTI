import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//=> State 类型表
export type Live2DState = {
	model3: {
		FileReferences: {
			Motions: {
				Idle: [
					{
						FadeInTime: number
						FadeOutTime: number
						File: string
					}
				]
			}
		}
		Groups: string[]
		Version: number
	}
}

//=> State 初始化
export const initialState: Live2DState = {
	model3: {
		FileReferences: {
			Motions: {
				Idle: [
					{
						FadeInTime: 0,
						FadeOutTime: 0,
						File: ''
					}
				]
			}
		},
		Groups: [],
		Version: 0
	}
}

//=> SLICE
export const live2DSlice = createSlice({
	name: 'live2d',
	initialState,
	reducers: {
		updateModel3: (state, action: PayloadAction<{ arr: any }>) => {
			const { arr } = action.payload
			state.model3 = arr
		}
	}
})

export const { updateModel3 } = live2DSlice.actions

export default live2DSlice.reducer
