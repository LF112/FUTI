/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useMemo, Suspense, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import Image from './Image'
//[ components ]

import CONFIG from '_config'
//[ constant ]

import { useL2dInitStatus } from 'state/status/hooks'
//[ state ]

//=> DOM
export default () => {
	const {
		Live2D: { l2dPath, l2dFileName }
	} = CONFIG
	const [l2dInitStatus, , l2dShow] = useL2dInitStatus()

	//=> 懒加载 Live2d 组件
	const live2dModel = import.meta.glob('../../../../reusable/Live2D/*')
	const LazyLive2D = React.lazy(
		live2dModel['../../../../reusable/Live2D/index.tsx'] as any
	)
	const LIVE2D = useMemo(() => {
		return (
			<Suspense fallback={<></>}>
				<LazyLive2D l2dFileName={l2dFileName} l2dPath={l2dPath} />
			</Suspense>
		)
	}, [])

	useEffect(() => console.log(l2dShow), [l2dShow])

	return (
		<Main>
			{!l2dInitStatus ? <Image loading={l2dShow} /> : null}
			{l2dShow ? LIVE2D : <></>}
		</Main>
	)
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
		position: relative;
		transition: all 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	}
`
