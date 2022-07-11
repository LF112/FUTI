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

//=> DOM
export default (props: any) => {
	const { className } = props
	return (
		<Ribbon className={className}>
			<div />
		</Ribbon>
	)
}

//=> Style
const Ribbon = styled.div`
	position: relative;
	width: 100%;
	height: 6px;
	overflow: hidden;
	animation: FadeIn_Top 250ms forwards;
	> div {
		width: 100%;
		height: 3px;
		background: linear-gradient(to right, #37eff9, #0091e4, #64c6f4, #64c0ec);
		box-shadow: 0 1px 3px hsl(0deg, 0%, 10%, 10%);
	}
	@media screen and (max-width: 780px) {
		position: fixed;
		top: 0;
		z-index: 20;
	}
`
