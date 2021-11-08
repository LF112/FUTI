import React from 'react'
import styled from 'styled-components'
//[ package ]

import { Links } from 'constants/global/socialLink'
//[ constants & types ]

import { useL2dInitStatus } from 'state/animation/hooks'
//[ state ]

//=> DOM
export default (props: any) => {
	const [, , , l2dUnfold] = useL2dInitStatus()

	return (
		<Main style={l2dUnfold ? { height: 0 } : {}}>
			<div>
				{Links.map((item: any, index: number) => {
					return (
						<Link
							className='An'
							href={item.url}
							target='_blank'
							rel='external noopener nofollow'
							key={index}
							style={l2dUnfold ? { opacity: 0 } : {}}
						>
							<div>
								<div>
									{item.icon}
									<p>{item.name}</p>
								</div>
							</div>
						</Link>
					)
				})}
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	height: 100px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	* {
		transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	}
	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 15px;
		a + a {
			margin: 0 2px;
		}
	}
	@media screen and (max-width: 780px) {
		height: 135px;
		> div {
			height: 100%;
			width: 100%;
			padding: 0;
			margin-top: 25px;
			display: block;
			text-align: center;
			a {
				display: inline-flex;
			}
			a + a {
				margin: auto 0px;
			}
		}
	}
`

const Link = styled.a`
	user-select: none;
	> div {
		padding: 2px 8px 2px 4px;
		> div {
			display: flex;
			align-items: center;
			justify-content: center;
			> svg {
				width: 28px;
				height: 28px;
				path {
					fill: rgba(236, 246, 255, 85%) !important;
				}
			}
			> p {
				color: rgba(236, 246, 255, 85%);
				line-height: 28px;
				padding-left: 2px;
				font-size: 16px;
				font-weight: 600;
				letter-spacing: 0.8px;
				font-family: 'Ubuntu';
			}
		}
	}
	:hover {
		> div {
			border-radius: 4px;
			background: rgba(88, 88, 88, 0.5);
			box-shadow: 0 1px 2px rgba(33, 35, 36, 45%);
			> div {
				transform: scale(0.95);
			}
		}
	}
`
