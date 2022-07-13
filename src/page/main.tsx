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

import Avatar from 'components/page/main/Avatar'

//=> DOM
export default () => {
	return (
		<Main>
			<div>
				<Profile>
					<div>
						<Avatar />
					</div>
				</Profile>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100vw;
	height: calc(100vh - 136px);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 25px;
	> div {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
	}
`

const Profile = styled.div`
	position: relative;
	height: calc(100vh - 140px);
	display: flex;
	align-items: center;
	padding: 0 15px;
	> div {
		width: 100%;
		position: relative;
		padding: 10px 0;
		border-radius: 4px;
	}
`
