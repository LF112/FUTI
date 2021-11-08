import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Parallax from 'parallax-js'
import fastdom from 'fastdom'

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()
	const container = useRef<HTMLDivElement>()

	useEffect(() => {
		new Parallax(container.current)

		setTimeout(() => {
			fastdom.measure(() => {
				const DOM = node.current.style
				fastdom.mutate(() => {
					DOM.opacity = '1'
				})
			})
		}, 300)

		return () => Parallax.disable()
	}, [container])

	return (
		<GA1 ref={node as any}>
			<div ref={container as any}>
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
		filter: blur(5px);
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
