/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { createGlobalStyle } from 'styled-components'
//[ package ]

import { AnimationCSS } from './animation'

//=> Style | '全局样式'
export const GlobalStyle = createGlobalStyle`
*,
body,
html {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	border: 0;
	background: 0 0;
	word-wrap: break-word;
	text-decoration: none;
	-webkit-tap-highlight-color: transparent;
	font-family: Titillium Web, -apple-system, system-ui, BlinkMacSystemFont,
		Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
		Helvetica Neue, sans-serif;
}

body {
	position: relative;
	background: #21252b;
	overflow: hidden;
}

a,
span {
	color: hsla(0, 0%, 100%, 0.19);
	text-decoration: none;
	font-weight: lighter;
	font-size: 12px;
	cursor: pointer;
	position: relative;
}

:not(body) {
	/* transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98); *//* 全局线性 */
	transition: all 0.5s cubic-bezier(0.66, 0.09, 0.49, 1.21);/* 全局非线性 */
}

@font-face {
	font-family: 'RuiZi';
	font-display: swap;
	src: url('./assets/fonts/ruizi.ttf') format('truetype');
}

@font-face {
	font-family: 'element-icons';
	src: url('./assets/fonts/element-icons.woff') format('woff'),
		url('./assets/fonts/element-icons.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

.An {
	position: relative;
	top: -10px;
	opacity: 0;
}

.TIP:after {
	position: absolute;
	bottom: 100%;
	left: 50%;
	z-index: 300;
	overflow: hidden;
	padding: 4px 8px;
	max-width: 320px;
	border-radius: 4px;
	background: rgba(79, 89, 95, 0.4);
	box-shadow: 0 1px 2px rgba(0, 0%, 0%, 15%);
	color: #fff;
	content: attr(data-tooltip);
	text-overflow: ellipsis;
	white-space: pre;
	font-weight: lighter;
	font-size: 14px;
	letter-spacing: 0.2px;
	font-family: Poppins;
	line-height: 20px;
	opacity: 0;
	transition: opacity 0.2s, transform 0.2s;
	transform: translate(-50%, 0.4rem) scale(0.75);
	pointer-events: none;
}

.TIP:focus:after,
.TIP:hover:after {
	opacity: 1;
	transform: translate(-50%, -0.2rem) scale(0.8);
}

::-webkit-scrollbar {
	width: 6px;
	height: 6px;
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.05);
	-webkit-appearance: none;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::-webkit-scrollbar-thumb {
	width: 4px;
	height: 4px;
	border-radius: 6px;
	background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::selection {
	background: #b2b8c1;
	color: #0bf;
}

/* 引入其他 CSS */
${AnimationCSS}
`
