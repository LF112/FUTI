/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { SiRen } from 'utils/useSirenAn'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { text: TEXT, timeout = 0 } = props

	const node = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const DOM = node?.current
		if (DOM) setTimeout(() => SiRen(DOM, TEXT), timeout)
	}, [''])

	return <TextMain ref={node} />
}

//=> Style
const TextMain = styled.div`
	text-shadow: 0.05em 0.05em 0 rgba(6, 7, 25, 50%);
	font-family: 'RuiZi';
`
