import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { useUpdateModel3, useModel3 } from 'state/live2d/hooks'
import { Live2DState } from 'state/live2d/slice'
//[ state ]

import {
	downloadModel,
	CubismLogFn,
	initModel,
	WebGl2Canvas,
	renderModel
} from './live2dManager'

//[ utils ]

import {
	CubismFramework,
	LogLevel
} from 'libs/live2dFramework/src/live2dcubismframework'
//[ libs ]

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()

	const updateModel3 = useUpdateModel3()
	const model3 = useModel3().model3

	useEffect(() => {
		//=> Main
		if (model3.Version == 0) {
			const fetchModelData = async () =>
				updateModel3((await downloadModel()) as Live2DState)

			fetchModelData()
		} else {
			console.log(model3)

			//=> 装载 Cubism SDK
			// 配置 Cubism SDK
			CubismFramework.startUp({
				logFunction: CubismLogFn, // 日志输出方法
				loggingLevel: LogLevel.LogLevel_Verbose // 日志级别
			}) // 'Cubism SDK 其实没啥可配置的，大无语'
			// 初始化 cubism SDK
			CubismFramework.initialize()

			const CANVAS = WebGl2Canvas(node.current, 800, 700)
			//=> 装载模型
			initModel(CANVAS, './live2d/', 'futi.model3.json')

			//=> 渲染模型
			renderModel(CANVAS)

			return () => {
				//=> 释放 Cubism SDK 实例
				CubismFramework.dispose()
			}
		}
	}, [model3])

	return (
		<Main>
			<canvas ref={node as any}></canvas>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	top: 245px;
	right: -38px;
	width: 410px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	canvas {
		pointer-events: none;
		touch-action: none;
		width: 800px;
		height: 700px;
		cursor: inherit;
	}
`
