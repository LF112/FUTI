import React from 'react'
import styled from 'styled-components'
//[ package ]

import { useL2dInitStatus } from 'state/status/hooks'
//[ state ]

import Link from './Link'
//[ components ]

import CONFIG from '_config'
//[ constant ]

//=> DOM
export default () => {
	const [, , , l2dUnfold] = useL2dInitStatus()
	const { SocialLink, PersonalInfo } = CONFIG

	const PersonalInfoLastAnMS = 1240 + 100 * PersonalInfo.length
	return (
		<Main style={l2dUnfold ? { height: 0, opacity: 0 } : {}}>
			{SocialLink.map(({ name, icon, url }, index: number) => (
				<Link
					key={index}
					style={
						l2dUnfold
							? { opacity: 0 }
							: { animationDelay: `${PersonalInfoLastAnMS + 100 * index}ms` }
					}
					name={name}
					icon={icon}
					url={url}
				/>
			))}
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
	padding: 0 15px;
	* {
		transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	}
	a + a {
		margin: 0 2px;
	}
	@media screen and (max-width: 780px) {
		height: 135px;
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
`
