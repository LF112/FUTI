import React from 'react'
import styled from 'styled-components'
//[ package ]

import Live2D from 'components/Live2D'

//=> DOM
export default (props: any) => {
	return (
		<Main>
			<div>
				<IMGCentered>
					{/* <img
						alt='伏太,LF112,futiwolf,futi'
						src='https://cdn.lfio.net/lf112.png'
					/> */}
					<Live2D />
				</IMGCentered>
				<Frame>
					<div></div>
					<nav></nav>
					<nav></nav>
				</Frame>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	height: 230px;
	width: 230px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		position: relative;
		width: 230px;
		height: 230px;
		overflow: hidden;
		border-radius: 5px;
		padding: 5px;
		backdrop-filter: blur(8px);
		/*padding: 7px 5px 0 5px;*/
		/*border: 2px solid hsla(0, 0%, 53%, 0.4);*/
		user-select: none;
		display: flex;
	}
`

const IMGCentered = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	> img {
		width: 220px;
		height: 220px;
		border-radius: 5px;
		object-fit: cover;
		user-select: none;
	}
`

const _FrameWidth = '5px'
const _FrameColor = 'hsla(0, 0%, 43%, 0.55)'
const Frame = styled.article`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	> nav:nth-child(2) {
		width: 3px;
		height: calc(100% - ${_FrameWidth} * 2);
		margin: ${_FrameWidth} 0;
		background: ${_FrameColor};
	}
	> nav:last-child {
		width: 3px;
		height: calc(100% - ${_FrameWidth} * 2);
		margin: ${_FrameWidth} 0;
		background: ${_FrameColor};
		position: absolute;
		right: 0;
		z-index: -1;
	}
	:before,
	:after,
	> :first-child:before,
	> :first-child:after {
		position: absolute;
		width: 45px;
		height: 45px;
		border-color: rgba(2, 149, 229, 0.84);
		border-style: solid;
		content: ' ';
		border-radius: 3px;
	}
	:before {
		top: 0;
		left: 0;
		border-width: 3px 0 0 3px;
	}
	:after {
		top: 0;
		right: 0;
		border-width: 3px 3px 0 0;
	}
	> :first-child:before {
		bottom: 0;
		right: 0;
		border-width: 0 3px 3px 0;
	}
	> :first-child:after {
		bottom: 0;
		left: 0;
		border-width: 0 0 3px 3px;
	}
`
