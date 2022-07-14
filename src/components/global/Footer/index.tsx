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

import Logo from './Logo'
import MoreInfo from './MoreInfo'
//[ components ]

//=> DOM
export default () => {
	return (
		<Footer>
			<div>
				<Logo />
				<MoreInfo />
			</div>
		</Footer>
	)
}

//=> Style
const Footer = styled.footer`
	position: relative;
	width: 100%;
	height: 55px;
	display: flex;
	align-items: center;
	> div {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
	}
	@media screen and (max-width: 780px) {
		> div {
			flex-direction: column;
		}
	}
`
