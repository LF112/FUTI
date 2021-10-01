import React from 'react'
import styled from 'styled-components'
//[ package ]
import './index.less'
//[ style ]

//=> DOM
export default (props: any) => {
	return (
		<Main className='MAIN'>
			<div></div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	height: calc(100vh - 140px);
	background-size: cover;
	background-position: 50%;
	overflow: initial;
`
