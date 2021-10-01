import React from 'react'
import styled from 'styled-components'
//[ package ]
import './index.less'
//[ style ]

import { ReactComponent as FUTI_Icon } from 'assets/svg/futi.svg'
//[ Assets ]

//=> DOM
export default (props: any) => {
	return (
		<Footer className='FOOTER'>
			<div>
				<a className='NAVIGATOR' href='https://www.futiwolf.com'>
					<FUTI_Icon />
					<div className='thank TIP' data-tooltip='⚡Navigator Kepler'>
						Drawn by NAVILAB
					</div>
				</a>
				<main></main>
			</div>
		</Footer>
	)
}

//=> Style
const Footer = styled.footer`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
`
