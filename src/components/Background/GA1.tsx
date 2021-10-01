import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Parallax from 'parallax-js'

//=> DOM
export default (props: any) => {
	const container = useRef<HTMLDivElement>()

	useEffect(() => {
		new Parallax(container.current)
	}, [container])

	return (
		<GA1>
			<div ref={container as any}>
				<LEFT data-depth='0.2' />
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
	z-index: -1;
	> div {
		display: flex;
		align-items: center;
		justify-content: center;
		filter: blur(5px);
	}
`
const LEFT = styled.div`
	top: -25px !important;
	left: -35vw !important;
	height: calc(100vh + 50px);
	width: 35vw;
	background-image: url('https://cdn.lfio.net/background/background_left_560.png');
	background-size: cover;
	transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98);
`

const RIGHT = styled.img`
	width: calc(100vw + 90px);
	height: calc(100vh + 90px);
	top: -60px !important;
	left: 30vw !important;
	position: relative;
	transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98);
`
