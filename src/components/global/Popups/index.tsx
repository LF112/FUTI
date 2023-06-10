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

import ITEM from './item'
//[ Components ]

import { useActivePopups } from 'state/popup/hooks'
//[ Hooks ]

//=> DOM
export default () => {
	//=> 取出 popup 列表
	const activePopups = useActivePopups()

	return (
		<>
			<MAIN>
				{activePopups.map((item: any) => {
					if (Object.keys(item).length > 0)
						return (
							<ITEM
								key={item.id}
								popupId={item.id}
								type={item.type}
								content={item.content}
								timeout={item.timeout}
								close={item.close}
							/>
						)
				})}
			</MAIN>
		</>
	)
}

//=> Style Component
const MAIN = styled.div`
	position: absolute;
	top: 15px;
	right: 0;
	z-index: 2000;
`
