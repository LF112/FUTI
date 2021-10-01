import React from 'react'
import styled from 'styled-components'

//=> DOM
export default (props: any) => {
	return (
		<Ribbon>
			<div></div>
		</Ribbon>
	)
}

//=> Style
const Ribbon = styled.div`
	position: relative;
	width: 100%;
	height: 6px;
	> div {
		width: 100%;
		height: 3px;
		background: linear-gradient(to right, #37eff9, #0091e4, #64c6f4, #64c0ec);
		box-shadow: 0 1px 3px hsl(0deg, 0%, 10%, 10%);
	}
`
