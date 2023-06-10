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

import Ribbon from '../../reusable/Ribbon'
import Motto from './Motto'
//[ components ]

//=> DOM
export default () => {
	return (
		<Header>
			<Ribbon
				className='Float'
				style={{ animation: 'FadeIn_Top 250ms forwards', borderRadius: 0 }}
			/>
			<Motto />
		</Header>
	)
}

//=> Style
const Header = styled.header`
	width: 100%;
	height: 80px;
	overflow: hidden;
	.Float {
		@media screen and (max-width: 780px) {
			position: fixed;
			top: 0;
			z-index: 20;
		}
	}
`
