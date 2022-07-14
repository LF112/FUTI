import React from 'react'
import styled from 'styled-components'
//[ package ]

import CONFIG from '_config/index'
//[ constants ]

//=> DOM
export default (props: any) => {
	const { l2dUnfold } = props
	const { PersonalInfo } = CONFIG

	const PersonalInfoCount = PersonalInfo.length
	return (
		<Info
			ItemCount={Math.floor(PersonalInfoCount / 3)}
			style={{ opacity: l2dUnfold ? 0 : 1 }}>
			{PersonalInfo.map(({ icon, name }, index: number) => {
				index++
				return (
					<div
						key={index}
						style={{ animationDelay: `${1240 + 100 * index}ms` }}>
						{icon}
						<p>{name}</p>
						{index < PersonalInfoCount ? (
							<Nbsp className={index % 3 === 0 ? 'mobile-hide' : ''} />
						) : null}
					</div>
				)
			})}
		</Info>
	)
}

//=> Style
const Info = styled.div<{ ItemCount: number }>`
	width: 100%;
	height: 20px;
	position: relative;
	margin-top: 10px;
	padding: 0 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	> div {
		position: relative;
		height: 20px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px 12px;
		opacity: 0;
		animation: FadeIn_Top 250ms forwards;
		> i,
		svg {
			color: #fff;
			font-size: 16px;
			width: 16px;
			height: 16px;
		}
		> p {
			color: #fff;
			font-size: 14px;
			line-height: 16px;
			font-weight: lighter;
			padding-left: 5px;
			font-family: 'Stick No Bills';
			letter-spacing: 1px;
			user-select: none;
		}
	}
	@media screen and (max-width: 780px) {
		height: ${({ ItemCount }) => ItemCount * 25}px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: repeat(2, 20px);
		grid-column-gap: 0px;
		grid-row-gap: 5px;
		justify-items: center;
	}
`

const Nbsp = styled.nav`
	position: absolute;
	width: 2px;
	height: 80%;
	right: 0;
	background: hsl(0deg, 0%, 100%, 52%);
	border-radius: 5px;
	opacity: 0;
	animation: FadeIn 250ms forwards;
`
