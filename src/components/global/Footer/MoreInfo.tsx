import React from 'react'
import styled from 'styled-components'
import Package from '../../../../package.json'
//[ package ]

import Ribbon from 'components/reusable/Ribbon'
//[ components ]

import { useLoadStatus } from 'state/status/hooks'
//[ state ]

//=> DOM
export default () => {
	const loadStatus = useLoadStatus()

	return (
		<Main An={loadStatus}>
			<div>
				<Ribbon />
				<p style={{ animationDelay: '2426ms' }}>
					Copyright &copy; 2017 - {new Date().getFullYear()}
					<LF
						className='LF TIP'
						href='https://www.lf112.net/'
						data-tooltip={'🙃 Independent Websites Developer'}>
						&nbsp;LF112&nbsp;
					</LF>
					All Rights Reserved.
				</p>
				<Nbsp style={{ animationDelay: '2436ms' }}>/</Nbsp>
				<p style={{ animationDelay: '2536ms' }}>
					<a
						className='TIP'
						href='http://beian.miit.gov.cn'
						rel='noopener noreferrer'
						target='_blank'
						data-tooltip={'🔖 ICP'}>
						琼 ICP 备 2021000434 号
					</a>
				</p>
				<Nbsp style={{ animationDelay: '2546ms' }}>/</Nbsp>
				<p style={{ animationDelay: '2646ms' }}>
					<a
						className='TIP'
						href='http://www.beian.gov.cn/portal/registerSystemInfo'
						rel='noopener noreferrer'
						target='_blank'
						data-tooltip={'🔒️ Public Security Beian'}>
						琼公安备 46010702000093 号
					</a>
				</p>
				<Nbsp style={{ animationDelay: '2656ms' }}>/</Nbsp>
				<p style={{ animationDelay: '2756ms' }}>
					<a
						className='TIP'
						href='https://github.com/LF112/FUTI'
						rel='noopener noreferrer'
						target='_blank'
						data-tooltip={'✨ Github Repo'}>
						V{Package.version}
					</a>
				</p>
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

const LF = styled.a`
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
