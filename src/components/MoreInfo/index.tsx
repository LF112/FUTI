import React from 'react'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
//[ package ]

import 'locales'
import Ribbon from 'components/Ribbon'
//[ component ]

import { useL2dInitStatus } from 'state/animation/hooks'
//[ state ]

import { AuoutMe } from 'constants/global/moreInfo'
//[ constants & types ]

import { isFutiSite } from 'utils/useTools'

//=> DOM
export default (props: any) => {
	const [, , , l2dUnfold] = useL2dInitStatus()

	return (
		<MoreInfo style={l2dUnfold ? { height: 0 } : {}}>
			<div>
				<Introduce style={l2dUnfold ? { opacity: 0 } : {}}>
					<div>
						<nav
							className='An'
							style={l2dUnfold ? { marginBottom: '-45px' } : {}}
						>
							<p>Hi, I'm</p>
							<p className={isFutiSite ? 'addFont' : 'default'}>
								<Trans>LF112</Trans>
							</p>
						</nav>
						<Ribbon className='An' data-futi-an='SideIn' />
					</div>
				</Introduce>
				<Info style={l2dUnfold ? { opacity: 0 } : {}}>
					{AuoutMe.map((item: any, index: number) => {
						return (
							<div
								key={index}
								className='An'
								style={l2dUnfold ? { marginTop: '-20px' } : {}}
							>
								{item.icon}
								<div>
									<Trans>{item.name}</Trans>
								</div>
								<div className='divider' />
							</div>
						)
					})}
				</Info>
			</div>
		</MoreInfo>
	)
}

//=> Style
const MoreInfo = styled.main`
	width: 100%;
	height: 105px;
	overflow: hidden;
	position: relative;
`

const Introduce = styled.div`
	position: relative;
	text-align: center;
	margin: 0 auto;
	> div {
		overflow: hidden;
		display: inline-block;
		> nav {
			display: flex;
			align-items: center;
			text-align: center;
			margin-top: 2px;
			padding: 0 25px;
			user-select: none;
			> p {
				font-size: 2em;
				color: hsla(0, 0%, 100%, 0.9);
			}
			> p + p {
				margin-left: 8px;
			}
			.addFont {
				font-family: 'ZCOOL KuaiLe' !important;
			}
			.default {
				font-family: 'RuiZi' !important;
			}
		}
		> div {
			margin-top: 10px;
			> div {
				border-radius: 20px;
				/* background: linear-gradient(
					90deg,
					#eb6349,
					#eca474,
					#35d9e4,
					#636161,
					#878787
				); */
			}
		}
	}
`
const Info = styled.div`
	width: 100%;
	position: relative;
	margin-top: 10px;
	padding: 0 5px;
	display: flex;
	justify-content: center;
	overflow: hidden;
	> div {
		display: flex;
		padding: 2px 4px;
		> i {
			color: #fff;
			font-size: 16px;
		}
		> div:not(.divider) {
			color: #fff;
			font-size: 12px;
			line-height: 20px;
			font-weight: lighter;
			padding-left: 5px;
			font-family: 'Stick No Bills';
			letter-spacing: 1px;
			user-select: none;
		}
		.divider {
			display: inline-block;
			width: 1px;
			height: 1em;
			background-color: #dcdfe6;
			margin: 0 0 0 8px;
		}
		> svg {
			width: 16px;
			height: 16px;
		}
	}
	> div:last-child {
		.divider {
			display: none;
		}
	}
`
