import { configureStore } from '@reduxjs/toolkit'

//
import popup from './popup/slice'
import animation from './animation/slice'
//

//import { save, load } from 'redux-localstorage-simple'

//const PERSISTED_KEYS: string[] = []

const store = configureStore({
	reducer: {
		popup,
		animation
	}

	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware({ thunk: true }).concat(
	// 		save({ states: PERSISTED_KEYS, debounce: 500 })
	// 	),
	// preloadedState: load({ states: PERSISTED_KEYS })
})

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
