import React from 'react'
import styled from 'styled-components'
//[ package ]
import './index.less'
//[ style ]

import HeadPic from 'components/HeadPic'
import MoreInfo from 'components/MoreInfo'
import SocialLink from 'components/SocialLink'
//[ component ]

import { isMobile } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	return (
		<Main className='MAIN'>
			<div className={isMobile ? 'MobileBackGround' : ''}>
				<div>
					<article className='IsLF'>
						<div>
							<div className='PROFILE'>
								<HeadPic />
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
	@media screen and (max-width: 780px) {
		height: calc(100vh - 142px);
		> div {
			height: 100%;
			.IsLF {
				width: 90%;
				height: 100%;
				padding: 0 5px;
				margin: auto auto 25px;
				> div {
					.PROFILE {
						min-height: 508px;
					}
				}
			}
		}
	}
	.MobileBackGround:before {
		content: '';
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: -1;
		background-size: cover;
		filter: blur(5px);
		background-image: url('https://cdn.lfio.net/background/futiwolf_background.jpg');
	}
`
