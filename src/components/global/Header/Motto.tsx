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

import SiRenText from 'components/reusable/SirenText'
//[ components ]

import { useLoadStatus } from 'state/status/hooks'
//[ state ]

//=> DOM
export default () => {
	const loadStatus = useLoadStatus()

	return (
		<Main>
			<div>
				<SiRenText
					text={'Copy and paste constant defaulting.'}
					show={loadStatus}
				/>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.div`
	position: relative;
	display: inline-flex;
	height: 100%;
	text-align: center;
	align-items: center;
	> div {
		padding: 0 45px;
		/* border-right: 1px solid rgba(255, 255, 255, 0.2); */
		color: rgba(255, 255, 255, 55%);
		font-weight: bold;
		font-size: 20px;
	}
`
