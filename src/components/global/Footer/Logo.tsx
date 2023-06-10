/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
//[ package ]

import { ReactComponent as ICON_FUTI } from 'assets/svg/futi.svg'
//[ assets ]

import { isFutiSite } from 'utils/useTools'
//[ utils ]

//=> DOM
export default () => {
	return (
		<Main
			className='An'
			data-futi-an='Zoom'
			href={isFutiSite ? 'https://www.lf112.net' : 'https://www.futiwolf.com'}>
			<ICON_FUTI />
			<Thanks className='TIP' data-tooltip='⚡Navigator Kepler'>
				Drawn by NAVILAB
			</Thanks>
		</Main>
	)
}

//=> Style
const Main = styled.a`
	text-align: center;
	position: relative;
	display: inline-block;
	padding: 15px 5px;
	transform: scale(0.8);
	opacity: 0;
	> svg {
		width: 62px;
		height: 28px;
		margin-bottom: -6px;
	}
`

const Thanks = styled.div`
	font-family: 'REEJI-PinboGB';
	color: hsla(0, 0%, 45.1%, 0.12);
	font-size: 12px;
	margin-top: -20px;
	user-select: none;
`
