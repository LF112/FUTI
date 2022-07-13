/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import Frame from './Frame'
import IMGCentered from './IMGCentered'
//[ components ]

import {
	useL2dInitStatus,
	useUpdateL2dInitStatus,
	useUpdateL2dShowStatus,
	useLoadStatus,
	useUpdateL2dUnfoldStatus
} from 'state/status/hooks'
//[ state ]

//=> DOM
export default () => {
	const loadStatus = useLoadStatus()
	const [l2dInitStatus, l2dDomInitStatus, l2dShow, l2dUnfold] =
		useL2dInitStatus()
	const updateL2dInitStatus = useUpdateL2dInitStatus()
	const updateL2dShowStatus = useUpdateL2dShowStatus()
	const updateL2dUnfoldStatus = useUpdateL2dUnfoldStatus()

	//=> STATE
	const [containerWidth, setContainerWidth] = useState<number>(0)
	const [containerHeight, setContainerHeight] = useState<number>(0)
	const [containerPadding, setContainerPadding] = useState<string>('')

	//=> Main
	//=> Live2D 载入动画
	useEffect(() => {
		//!isBaiduSpider &&
		if (loadStatus) updateL2dShowStatus(true)
		// Coding more...
	}, [loadStatus])
	useEffect(() => {
		if (l2dDomInitStatus && !l2dInitStatus)
			setTimeout(() => {
				updateL2dInitStatus(true)
				setContainerWidth(230)
				setContainerHeight(230)
				if (containerPadding !== '') setContainerPadding('')
			}, 200)
		if (l2dShow && !l2dDomInitStatus && !l2dInitStatus) {
			setContainerWidth(260)
			setContainerHeight(260)
			setContainerPadding('30px')
		}
	}, [l2dInitStatus, l2dDomInitStatus, l2dShow])

	return (
		<Main>
			<div
				style={{
					width: containerWidth,
					height: containerHeight,
					padding: containerPadding
				}}>
				<IMGCentered l2dInitStatus={l2dInitStatus} l2dShow={l2dShow} />
				<Frame />
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	height: 260px;
	width: 260px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		position: relative;
		width: 0;
		height: 0;
		overflow: hidden;
		border-radius: 5px;
		padding: 5px;
		backdrop-filter: blur(8px);
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		animation: Init 250ms forwards;
		animation-delay: 850ms;
		@keyframes Init {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
				width: 230px;
				height: 230px;
			}
		}
	}
`
