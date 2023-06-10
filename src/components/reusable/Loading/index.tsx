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

//=> DOM
export default (props: any) => {
	const { size } = props

	return (
		<Loader>
			<div>
				<Outer
					style={
						size !== undefined
							? {
									width: `${size}px`,
									height: `${size}px`,
									fontSize: `${size}px`
							  }
							: {}
					}>
					<Inner />
				</Outer>
			</div>
		</Loader>
	)
}

//=> Style
const _size = 45
const _outerRing = '#0da7e9'
const _innerCircle = 'hsla(0, 0%, 43%, 0.85)'

const Loader = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		display: flex;
		align-items: center;
		div {
			margin: auto;
			border: 0.1em solid transparent;
			border-radius: 50%;
			animation: 2s linear infinite;
			animation-name: spinner;
		}
	}

	@keyframes spinner {
		100% {
			transform: rotate(360deg);
		}
	}
`

const Outer = styled.div`
	width: ${_size + 30}px;
	height: ${_size + 30}px;
	font-size: ${_size}px;
	border-top-color: ${_outerRing}!important;
`

const Inner = styled.div`
	width: 100%;
	height: 100%;
	opacity: 0.4;
	border-top-color: ${_innerCircle}!important;
	border-right-color: ${_innerCircle}!important;
`
