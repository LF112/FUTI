import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import {
	CubismLogFn,
	initModel,
	WebGl2Canvas,
	renderModel
} from './live2dManager'
import { isMobile } from 'utils/useTools'
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
	const addPopup = useAddPopup()
	const closePopup = useClosePopup()

	const [l2dInitStatus, , , l2dUnfold] = useL2dInitStatus()
	const updateL2dDomInitStatus = useUpdateL2dDomInitStatus()

	useEffect(() => {
		//=> Main

		const popupId = Math.random().toString(36).slice(-8)
		addPopup('load', '正在加载模型', 0, popupId)

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
		if (l2dInitStatus)
			window.requestAnimationFrame(() => (mainNode.current.style.opacity = '1'))
	}, [l2dInitStatus])

	return (
		<Main
			ref={mainNode as any}
			style={
				!l2dInitStatus
					? { display: 'none' }
					: {
							opacity: 0,
							marginLeft: l2dUnfold ? (!isMobile ? '-412px' : '0') : '',
							top: l2dUnfold ? '72px' : ''
					  }
			}
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
	* {
		transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	}
	canvas {
		pointer-events: none;
		touch-action: none;
		width: 1048px;
		height: 1048px;
		transform: scale(0.71);
		cursor: inherit;
	}
`
