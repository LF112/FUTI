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

import Loading from 'components/reusable/Loading'

import { isFutiSite } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { loading } = props

	return (
		<Image>
			<img
				alt='伏太,LF112,futiwolf,futi'
				src={
					isFutiSite
						? 'https://cdn.lfio.net/FUTIWOLF.png'
						: 'https://cdn.lfio.net/lf112.png'
				}
			/>
			<LoadMask style={{ opacity: loading ? 1 : 0 }}>
				<Loading />
			</LoadMask>
		</Image>
	)
}

//=> Style
const Image = styled.div`
	> img {
		width: 220px;
		height: 220px;
		margin-top: 8px;
		border-radius: 5px;
		object-fit: cover;
		user-select: none;
	}
`

const LoadMask = styled.div`
	position: absolute;
	width: 220px;
	height: 220px;
	top: 0;
	border-radius: 5px;
	background: hsla(0deg, 0%, 16%, 0.22);
	display: flex;
	align-items: center;
	justify-content: center;
`
