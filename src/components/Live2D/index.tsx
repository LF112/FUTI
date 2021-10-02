import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import * as PIXI from 'pixi.js'
//[ package ]

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()

	//=> 懒加载 Live2D 相关组件
	const _emscriptenModule = import.meta.globEager('../../libs/Emscripten/*.js')
	const _live2dCoreModule = import.meta.globEager('../../libs/*.js')
	const _live2dFrameworkModule = import.meta.glob('../../libs/framework/*.js')
	useEffect(() => {
		//=> 定义全局常量
		// PIXI.JS
		if (typeof globalThis.PIXI !== 'function') globalThis.PIXI = PIXI // Live2D Core 前置依赖

		// Emscripten Core Module
		if (typeof globalThis._em !== 'function')
			for (const path in _emscriptenModule) {
				const KEY = Object.keys(_emscriptenModule[path])[0]
				globalThis._em = _emscriptenModule[path][KEY]()
			}

		// Live2D Core
		if (typeof globalThis.Live2DCubismCore !== 'function')
			for (const path in _live2dCoreModule) {
				const KEY = Object.keys(_live2dCoreModule[path])[0]
				console.log(_live2dCoreModule[path][KEY], '\n', _live2dCoreModule)

				//=> 定义 Live2D Core 全局常量
				globalThis.Live2DCubismCore = _live2dCoreModule[path][KEY]
				globalThis.LIVE2DCUBISMCORE = _live2dCoreModule[path][KEY]
				//↑ Live2D Framework 前置依赖 ↑
			}
		// Live2D Framework
		if (
			typeof globalThis.LIVE2DCUBISMFRAMEWORK !== 'function' ||
			typeof globalThis.LIVE2DCUBISMPIXI !== 'function'
		)
			for (const path in _live2dFrameworkModule)
				_live2dFrameworkModule[path]().then(mod => {
					//=> 定义 Live2D Framework 全局常量
					const KEY = Object.keys(mod)[0] // 取第一个对象的键名
					globalThis[KEY] = mod[KEY]
				})
	}, [_emscriptenModule, _live2dCoreModule, _live2dFrameworkModule])

	return (
		<Main>
			<canvas ref={node as any}></canvas>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	left: -82px;
	top: 68px;
	width: 410px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	canvas {
		transform: scale(0.48);
		pointer-events: none;
		touch-action: none;
		width: 800px;
		height: 700px;
		cursor: inherit;
	}
`
