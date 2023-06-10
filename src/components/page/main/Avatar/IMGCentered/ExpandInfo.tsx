/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useL2dInitStatus } from 'state/status/hooks'

import { isMobile } from 'react-device-detect'
//[ utils ]

//=> DOM
export default (props: any) => {
	const [, , , l2dUnfold] = useL2dInitStatus()
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		const Timer = setTimeout(() => {
			setOpen(true)
		}, 350)

		if (!l2dUnfold) {
			setOpen(false)
			clearTimeout(Timer)
		}

		return () => {
			clearTimeout(Timer)
		}
	}, [l2dUnfold])

	return (
		<ExpandInfo style={isMobile ? { marginRight: 0 } : {}}>
			<main>
				<OneText>
					<h1 style={open && !isMobile ? { marginTop: 0, opacity: 1 } : {}}>
						持续迭代
					</h1>
				</OneText>
				<TwoText style={open && !isMobile ? { marginLeft: 0, opacity: 1 } : {}}>
					<h1>ғᴜᴛɪᴡᴏʟғ</h1>
				</TwoText>
				<L2dModelAuthor style={open ? { marginBottom: 0, opacity: 1 } : {}}>
					<a href='https://space.bilibili.com/22833244' target='_blank'>
						<span>Model By Reiky With love</span>
						<img alt='灯壹,reiky' src='https://cdn.lfio.net/avatar/reiky.jpg' />
						<h2>灯壹 Reiky</h2>
					</a>
					<div></div>
				</L2dModelAuthor>
			</main>
		</ExpandInfo>
	)
}

//=> Style
const ExpandInfo = styled.div`
	width: 100%;
	height: 100%;
	margin-right: -275px;
	position: absolute !important;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	> main {
		width: 228px;
		> div {
			> h1 {
				width: 228px;
				height: 35px;
				line-height: 35px;
				color: #fff;
			}
		}
	}
`

const OneText = styled.div`
	height: 35px;
	overflow: hidden;
	> h1 {
		margin-top: -35px;
		opacity: 0;
		clear: both;
		font-family: 'Noto Sans SC';
	}
`

const TwoText = styled.div`
	margin-left: 120px;
	opacity: 0;
	overflow: hidden;
	> h1 {
		clear: both;
		margin-top: 5px;
		font-family: 'Ubuntu', sans-serif;
	}
`

const L2dModelAuthor = styled.div`
	position: absolute;
	width: 100%;
	margin-bottom: -55px;
	right: 2px;
	bottom: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	z-index: 10;
	> a {
		position: relative;
		width: 172px;
		height: 62px;
		border-radius: 4px;
		background: hsla(0, 0%, 100%, 0.19);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px 6px 2px 6px;
		> span {
			position: absolute;
			top: 0;
			padding: 0 5px;
			border-radius: 0 0 4px 4px;
			color: #fff;
			font-size: 12px;
			background: linear-gradient(20deg, #ec3150, #e78663, #da9e82, #a3626a);
		}
		> img {
			width: 32px;
			height: 32px;
			border-radius: 5px;
			object-fit: cover;
			user-select: none;
		}
		> h2 {
			color: #fff;
			margin-left: 8px;
			font-size: 20px;
			font-family: 'ZCOOL KuaiLe';
		}
	}
	> div {
		position: absolute;
		width: 172px;
		height: 62px;
		border-radius: 4px;
		z-index: -1;
		backdrop-filter: blur(4px);
		background: hsl(0deg, 0%, 65%, 19%);
	}
`
