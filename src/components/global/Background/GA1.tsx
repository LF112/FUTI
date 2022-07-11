/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Parallax from 'parallax-js'
import fastdom from 'fastdom'
//[ package ]

//=> DOM
export default () => {
	const node = useRef<HTMLDivElement>()
	const container = useRef<HTMLDivElement>()

	useEffect(() => {
		const ParallaxDOM = container?.current
		if (ParallaxDOM) {
			const $Parallax = new Parallax(ParallaxDOM)

			setTimeout(() => {
				fastdom.measure(() => {
					const DOM = node.current.style
					fastdom.mutate(() => {
						DOM.opacity = '1'
					})
				})
			}, 300)

			return () => $Parallax.disable()
		}
	}, [container])

	return (
		<GA1 ref={node}>
			<div ref={container}>
				<LEFT
					data-depth='0.2'
					src='https://cdn.lfio.net/background/background_left_560.png'
					alt='background'
				/>
				<RIGHT
					data-depth='0.3'
					src='https://cdn.lfio.net/background/background_right_560.png'
					alt='background'
				/>
			</div>
		</GA1>
	)
}

//=> Style
const GA1 = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: -1;
	opacity: 0;
	transition: all 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`
const LEFT = styled.img`
	top: -25px !important;
	left: -35vw !important;
	height: calc(100vh + 50px);
	width: 35vw;
	transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98);
	@media screen and (max-width: 780px) {
		width: 52vw;
	}
`

const RIGHT = styled.img`
	width: calc(100vw + 90px);
	height: calc(100vh + 90px);
	top: -60px !important;
	left: 30vw !important;
	transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98);
`
