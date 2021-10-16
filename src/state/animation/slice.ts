import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//=> State 类型表
export type AnimationState = {
	live2d: {
		show: boolean
		init: boolean
		domInit: boolean
	}
}

//=> State 初始化
export const initialState: AnimationState = {
	live2d: {
		show: false,
		init: false,
		domInit: false
	}
}

//=> SLICE
export const animationSlice = createSlice({
	name: 'animation',
	initialState,
	reducers: {
		//=> FUNCTIONS
		updateLive2dShow: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload
			state.live2d.show = status
		},
		updateLive2dInit: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload
			state.live2d.init = status
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

export const { updateLive2dInit, updateLive2dDomInit, updateLive2dShow } =
	animationSlice.actions

export default animationSlice.reducer
