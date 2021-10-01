import React from 'react'
import styled from 'styled-components'
//[ package ]
import './index.less'
//[ style ]

import MoreInfo from 'components/MoreInfo'
import SocialLink from 'components/SocialLink'
//[ component ]

//=> DOM
export default (props: any) => {
	return (
		<Main className='MAIN'>
			<div>
				<div>
					<article className='IsLF'>
						<div>
							<div className='PROFILE'>
								<MoreInfo />
								<SocialLink />
							</div>
						</div>
					</article>
				</div>
			</div>
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
