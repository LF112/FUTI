import React from 'react'
import styled from 'styled-components'

//=> DOM
export default (props: any) => {
	return (
		<BluePrint>
			<Anchor />
			<Line />
			<Gradient />
		</BluePrint>
	)
}

//=> Style
const _background = '#f5f7fa'
const _color = '#dee5ef'

const BluePrint = styled.nav`
	position: absolute;
	overflow: hidden;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	z-index: 0;
	background: ${_background};
	> div {
		position: absolute;
		width: 110vw;
		height: 110vh;
		margin-left: -40px;
		margin-top: -40px;
	}
`

const Line = styled.div`
	background-image: linear-gradient(${_color} 1px, transparent 0),
		linear-gradient(90deg, ${_color} 1px, transparent 0);
	background-size: 110px 110px;
`

const Anchor = styled.div`
	background: radial-gradient(
				circle,
				transparent 15%,
				#f5f7fa 15%,
				#f5f7fa 100%,
				transparent 100%,
				transparent
			)
			55px 55px,
		linear-gradient(#dee5ef 3px, transparent 3px) 0 -1px,
		linear-gradient(90deg, #dee5ef 3px, transparent 3px) -1px 0;
	background-color: ${_background};
	background-size: 110px 110px;
`

const Gradient = styled.div`
	background: linear-gradient(
		to top,
		#f5f7fa 0%,
		#f5f7faf0 10%,
		#f5f7fad4 25%,
		#f5f7fa00 50%
	);
	height: calc(100vh - 65%) !important;
	bottom: 0;
	position: absolute;
`
