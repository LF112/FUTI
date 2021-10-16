import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import {
	CubismLogFn,
	initModel,
	WebGl2Canvas,
	renderModel
} from './live2dManager'
//[ utils ]

import { useAddPopup, useClosePopup } from 'state/popup/hooks'
import {
	useL2dInitStatus,
	useUpdateL2dDomInitStatus
} from 'state/animation/hooks'
//[ hooks ]

import {
	CubismFramework,
	LogLevel
} from 'libs/live2dFramework/src/live2dcubismframework'
//[ libs ]

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()
	const mainNode = useRef<HTMLDivElement>()
	const [addPopup, popupId] = useAddPopup()
	const closePopup = useClosePopup()

	const [l2dInitStatus, l2dDomInitStatus] = useL2dInitStatus()
	const updateL2dDomInitStatus = useUpdateL2dDomInitStatus()

	useEffect(() => {
		//=> Main

		addPopup('load', '正在加载模型', 0)

		//=> 装载 Cubism SDK
		// 配置 Cubism SDK
		CubismFramework.startUp({
			logFunction: CubismLogFn, // 日志输出方法
			loggingLevel: LogLevel.LogLevel_Verbose // 日志级别
		}) // 'Cubism SDK 其实没啥可配置的，大无语'
		// 初始化 cubism SDK
		CubismFramework.initialize()

		const CANVAS = WebGl2Canvas(node.current, 2048, 2048)
		//=> 装载模型
		initModel(CANVAS, './live2d/', 'futi.model3.json', () => {
			closePopup(popupId)
			updateL2dDomInitStatus(true)
		})

		//=> 渲染模型
		renderModel(CANVAS)

		return () => {
			//=> 释放 Cubism SDK 实例
			CubismFramework.dispose()
		}
	}, [])

	//=> 动画
	useEffect(() => {
		if (l2dInitStatus) setTimeout(() => (mainNode.current.style.opacity = '1'))
	}, [l2dInitStatus])

	return (
		<Main
			ref={mainNode as any}
			style={!l2dInitStatus ? { display: 'none' } : { opacity: 0 }}
		>
			<canvas ref={node as any}></canvas>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	top: 140px;
	right: -52px;
	width: 410px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	canvas {
		pointer-events: none;
		touch-action: none;
		width: 1048px;
		height: 1048px;
		transform: scale(0.71);
		cursor: inherit;
	}
`
