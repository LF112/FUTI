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

import Image from './Image'
//[ components ]

//=> DOM
export default (props: any) => {
	const { l2dInitStatus, l2dShow } = props

	return <Main>{!l2dInitStatus ? <Image loading={l2dShow} /> : null}</Main>
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		transition: all 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	}
`
