import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'
//[ package ]
import './index.less'
//[ style ]

import Ribbon from 'components/Ribbon'
import Motto from 'components/Motto'
//[ component ]

//=> DOM
export default (props: any) => {
	const ribbonNode = useRef<HTMLDivElement>()

	useEffect(() => {
		fastdom.measure(() => {
			const DOM = ribbonNode.current.style
			fastdom.mutate(() => {
				DOM.marginTop = '0'
			})
		})
	}, [])

	return (
		<Header className='HEADER'>
			<Ribbon style={{ marginTop: '-6px' }} ref={ribbonNode as any} />
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
