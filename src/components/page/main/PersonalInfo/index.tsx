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

import Introduce from './Introduce'
import MoreInfo from './MoreInfo'
//[ components ]

import { useL2dInitStatus } from 'state/status/hooks'
//[ state ]

//=> DOM
export default () => {
	const [, , , l2dUnfold] = useL2dInitStatus()

	return (
		<Main style={l2dUnfold ? { height: 0 } : {}}>
			<Introduce l2dUnfold={l2dUnfold} />
			<MoreInfo l2dUnfold={l2dUnfold} />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	height: 105px;
	overflow: hidden;
	position: relative;
	@media screen and (max-width: 780px) {
		height: 135px;
	}
`
