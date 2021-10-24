import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//=> State 类型表
export type AnimationState = {
	load: boolean
	live2d: {
		show: boolean
		init: boolean
		domInit: boolean
		unfold: boolean
	}
}

//=> State 初始化
export const initialState: AnimationState = {
	load: false,
	live2d: {
		show: false,
		init: false,
		domInit: false,
		unfold: false
	}
}

//=> SLICE
export const animationSlice = createSlice({
	name: 'animation',
	initialState,
	reducers: {
		//=> FUNCTIONS
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

export const {
	updateLoadAn,
	updateLive2dInit,
	updateLive2dDomInit,
	updateLive2dShow,
	updateLive2dUnfold
} = animationSlice.actions

export default animationSlice.reducer
