import React from 'react'
import styled from 'styled-components'
//[ package ]

import Ribbon from 'components/reusable/Ribbon'
//[ components ]

import { useLoadStatus } from 'state/status/hooks'
//[ state ]

import CONFIG from '_config/index'
//[ constants ]

//=> DOM
export default () => {
	const loadStatus = useLoadStatus()
	const { FooterInfo } = CONFIG

	const FooterInfoCount = FooterInfo.length
	return (
		<Main An={loadStatus}>
			<div>
				<Ribbon />
				{FooterInfo.map(({ url, context, tips }, index: number) => {
					index++
					return (
						<nav key={index}>
							<p style={{ animationDelay: `${2416 + 100 * index}ms` }}>
								{url ? (
									<a
										className='TIP'
										href={url}
										rel='noopener noreferrer'
										target='_blank'
										data-tooltip={tips}>
										{context}
									</a>
								) : (
									context
								)}
							</p>
							{index < FooterInfoCount ? (
								<Nbsp
									style={{ animationDelay: `${2416 + 100 * index + 10}ms` }}>
									/
								</Nbsp>
							) : null}
						</nav>
					)
				})}
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main<{ An: boolean }>`
	height: 32px;
	position: relative;
	padding-left: 20px;
	padding-top: 5px;
	border-left: 1px solid hsla(0, 0%, 76.5%, 0.18);
	animation: FadeIn 250ms forwards;
	animation-delay: 2332ms;
	opacity: 0;
	> div {
		display: flex;
		position: relative;
		> div:first-child {
			position: absolute;
			> div {
				height: 3px;
				background: linear-gradient(
					90deg,
					hsla(0, 0%, 46.7%, 0.2),
					rgba(72, 72, 72, 0.2),
					hsla(0, 0%, 40.4%, 0.2),
					rgba(60, 60, 60, 0.2)
				);
				box-shadow: unset;
			}
		}
		> nav {
			display: flex;
			> p,
			span {
				line-height: 28px;
				font-size: 12px;
				color: hsla(0, 0%, 100%, 0.19);
				font-weight: lighter;
				user-select: none;
				font-family: 'REEJI-PinboGB', 'Titillium Web';
			}
			a {
				font-family: 'REEJI-PinboGB', 'Titillium Web';
			}
			> p {
				opacity: 0;
				animation: FadeIn_Top 250ms forwards;
			}
		}
	}
	* {
		animation-play-state: ${({ An }) => (An ? 'running' : 'paused')};
	}

	@media screen and (max-width: 780px) {
		padding: 0 10%;
		border-left: unset;
		> div {
			display: inline-grid;
			width: 100%;
			text-align: center;
		}
	}
`

export const LF = styled.a`
	font-family: 'RuiZi';
	color: hsla(0, 0%, 100%, 0.26);
	font-weight: 700;
	user-select: none;
`
const Nbsp = styled.span`
	padding: 0 8px;
	font-weight: lighter;
	user-select: none;
	opacity: 0;
	animation: FadeIn 250ms forwards;
	@media screen and (max-width: 780px) {
		display: none;
	}
`
