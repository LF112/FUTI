/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect } from 'react'
import fastdom from 'fastdom'
//[ package ]

import { useUpdateLoadStatus } from 'state/status/hooks'
//[ store ]

import Header from 'components/global/Header'
import Main from 'page/main'
import Footer from 'components/global/Footer'
import GA1 from 'components/global/Background/GA1'
//[ components ]

//=> DOM
export default () => {
	const updateLoadStatus = useUpdateLoadStatus()

	useEffect(() => {
		//=> 隐藏页面首屏
		fastdom.measure(() => {
			//=> 获取 DOM
			const { style: LOADING } = document.getElementById('LOADING')
			const { style: LOADING_SVG } = document.getElementById('LOADING-SVG')
			//=> 更新样式
			fastdom.mutate(() => {
				LOADING_SVG.transition =
					'all 0.25s cubic-bezier(0.66, 0.09, 0.49, 1.21)'
				LOADING_SVG.marginTop = '138px'
				LOADING_SVG.opacity = '0'
				setTimeout(() => (LOADING.display = 'none'), 250)
			})
		})
		//=> 更新页面载入状态
		setTimeout(() => updateLoadStatus(true), 2000)
	}, [''])

	return (
		<>
			<Header />
			<Main />
			<Footer />

			<GA1 />
		</>
	)
}
