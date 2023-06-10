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

import Ribbon from 'components/reusable/Ribbon'
//[ components ]

import { isFutiSite } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { l2dUnfold } = props

	return (
		<Introduce style={{ opacity: l2dUnfold ? 0 : 1 }}>
			<div>
				<nav className='An' style={l2dUnfold ? { marginBottom: '-45px' } : {}}>
					<p>Hi, I'm</p>
					<p className={isFutiSite ? 'addFont' : 'default'}>LF112</p>
				</nav>
				<Ribbon className='An' data-futi-an='SideIn' />
			</div>
		</Introduce>
	)
}

//=> Style
const Introduce = styled.div`
	position: relative;
	text-align: center;
	margin: 0 auto;
	> div {
		overflow: hidden;
		display: inline-block;
		> nav {
			display: flex;
			align-items: center;
			text-align: center;
			margin-top: 2px;
			padding: 0 25px;
			user-select: none;
			> p {
				font-size: 2em;
				color: hsla(0, 0%, 100%, 0.9);
			}
			> p + p {
				margin-left: 8px;
			}
			.addFont {
				font-family: 'ZCOOL KuaiLe' !important;
			}
			.default {
				font-family: 'RuiZi' !important;
			}
		}
		> div {
			margin-top: 10px;
			> div {
				border-radius: 20px;
				/* background: linear-gradient(
					90deg,
					#eb6349,
					#eca474,
					#35d9e4,
					#636161,
					#878787
				); */
			}
		}
	}
`
