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
import TouchMe from './TouchMe'
//[ components ]

import {
	useL2dInitStatus,
	useUpdateL2dInitStatus,
	useUpdateL2dShowStatus,
	useLoadStatus,
	useUpdateL2dUnfoldStatus
} from 'state/status/hooks'
//[ state ]

import { isMobile } from 'react-device-detect'

//=> DOM
export default () => {
	const loadStatus = useLoadStatus()
	const [l2dInitStatus, l2dDomInitStatus, l2dShow, l2dUnfold] =
		useL2dInitStatus()
	const updateL2dInitStatus = useUpdateL2dInitStatus()
	const updateL2dShowStatus = useUpdateL2dShowStatus()
	const updateL2dUnfoldStatus = useUpdateL2dUnfoldStatus()

	//=> STATE
	const [containerWidth, setContainerWidth] = useState<string>('0')
	const [containerHeight, setContainerHeight] = useState<string>('0')
	const [containerPadding, setContainerPadding] = useState<string>('')

	//=> Main
	//=> 载入动画
	useEffect(() => {
		setTimeout(() => {
			setContainerWidth('230px')
			setContainerHeight('230px')
		}, 1000)
	}, [''])

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
				setContainerWidth('230px')
				setContainerHeight('230px')
				if (containerPadding !== '') setContainerPadding('')
			}, 200)
		if (l2dShow && !l2dDomInitStatus && !l2dInitStatus) {
			setContainerWidth('260px')
			setContainerHeight('260px')
			setContainerPadding('30px')
		}
		if (l2dInitStatus && l2dUnfold) {
			setContainerWidth('100%')
			setContainerHeight('100%')
		}
	}, [l2dInitStatus, l2dDomInitStatus, l2dShow, l2dUnfold])

	return (
		<Main
			className='An'
			data-futi-an='FadeIn'
			cleanAn={loadStatus}
			style={
				l2dUnfold ? { width: isMobile ? '75%' : '100%', height: '400px' } : {}
			}
			onMouseEnter={() => {
				if (l2dInitStatus) updateL2dUnfoldStatus(true)
			}}
			onMouseLeave={() => {
				if (l2dInitStatus) updateL2dUnfoldStatus(false)
			}}
		>
			<div
				style={{
					width: containerWidth,
					height: containerHeight,
					padding: containerPadding
				}}
			>
				<IMGCentered />
				<TouchMe l2dInitStatus={l2dInitStatus} l2dUnfold={l2dUnfold} />
				<Frame />
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main<{ cleanAn: boolean }>`
	position: relative;
	height: 260px;
	width: 260px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: grab;
	> div {
		position: relative;
		width: ${({ cleanAn }) => (cleanAn ? '230px' : 0)};
		height: ${({ cleanAn }) => (cleanAn ? '230px' : 0)};
		overflow: hidden;
		border-radius: 5px;
		padding: 5px;
		backdrop-filter: blur(8px);
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`
