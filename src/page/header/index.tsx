import React from 'react'
import styled from 'styled-components'
//[ package ]
import './index.less'
//[ style ]

import Ribbon from 'components/Ribbon'
import Motto from 'components/Motto'
//[ component ]

//=> DOM
export default (props: any) => {
	return (
		<Header className='HEADER'>
			<Ribbon />
			<nav>
				<Motto />
			</nav>
		</Header>
	)
}

//=> Style
const Header = styled.header`
	width: 100%;
	height: 80px;
	overflow: hidden;
`
