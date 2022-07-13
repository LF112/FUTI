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
export default () => {
	return (
		<Frame>
			<div />
			<nav />
			<nav />
		</Frame>
	)
}

//=> Style
const _FrameWidth = '5px'
const _FrameColor = 'hsla(0, 0%, 43%, 0.55)'
const Frame = styled.article`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	> nav:nth-child(2) {
		width: 3px;
		height: calc(100% - ${_FrameWidth} * 2);
		margin: ${_FrameWidth} 0;
		background: ${_FrameColor};
	}
	> nav:last-child {
		width: 3px;
		height: calc(100% - ${_FrameWidth} * 2);
		margin: ${_FrameWidth} 0;
		background: ${_FrameColor};
		position: absolute;
		right: 0;
		z-index: -1;
	}
	:before,
	:after,
	> :first-child:before,
	> :first-child:after {
		position: absolute;
		width: 45px;
		height: 45px;
		border-color: rgba(2, 149, 229, 0.84);
		border-style: solid;
		content: ' ';
		border-radius: 3px;
	}
	:before {
		top: 0;
		left: 0;
		border-width: 3px 0 0 3px;
	}
	:after {
		top: 0;
		right: 0;
		border-width: 3px 3px 0 0;
	}
	> :first-child:before {
		bottom: 0;
		right: 0;
		border-width: 0 3px 3px 0;
	}
	> :first-child:after {
		bottom: 0;
		left: 0;
		border-width: 0 0 3px 3px;
	}
`
