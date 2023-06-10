/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, memo, useState } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'
//[ package ]

import { useRemovePopup, useTriggerChoose } from 'state/popup/hooks'
//[ Hooks ]

import { Rand } from 'utils/useTools'
//[ utils ]

//=> DOM
export default memo((props: any) => {
	const { type, popupId, timeout, close, content } = props

	//=> 移除弹窗 hooks
	const removePopup = useRemovePopup()
	//=> 触发选择回调 hooks
	const triggerChoose = useTriggerChoose()

	//=> 组件内部状态
	// 是否触发选择 | '仅 type 为 choose 时'
	const [chooseState, updateChooseState] = useState<boolean>(null)
	// 选择回调处理是否结束 | '仅 type 为 choose 时'
	const [chooseOk, updateChooseOk] = useState<boolean>(false)

	//=> 自动选择组件 icon / 颜色
	const icon = {
		icon: 'el-icon-warning',
		iconColor: '#fff'
	}

	if (type === 'info') {
		icon.icon = 'el-icon-warning-outline'
		icon.iconColor = '#909399'
	} else if (type === 'success') {
		icon.icon = 'el-icon-success'
		icon.iconColor = '#67c23a'
	} else if (type === 'warn') icon.iconColor = '#f56c6c'
	else if (type === 'load') {
		icon.icon = 'el-icon-loading'
		icon.iconColor = '#53a8ff'
	} else if (type === 'lover') {
		icon.iconColor = '#eb6349'
		icon.icon = Rand([
			'el-icon-food',
			'el-icon-burger',
			'el-icon-tableware',
			'el-icon-sugar',
			'el-icon-dessert',
			'el-icon-ice-cream',
			'el-icon-hot-water',
			'el-icon-grape',
			'el-icon-watermelon',
			'el-icon-cherry',
			'el-icon-apple',
			'el-icon-pear',
			'el-icon-orange',
			'el-icon-coffee',
			'el-icon-ice-tea',
			'el-icon-potato-strips',
			'el-icon-lollipop',
			'el-icon-ice-cream-square',
			'el-icon-ice-cream-round'
		])[0]
	}

	//=> Main Effect
	useEffect(() => {
		//=> 弹出弹窗
		fastdom.measure(() => {
			const DOM = document.getElementById(popupId).style
			fastdom.mutate(() => {
				DOM.paddingLeft = '0px'
				DOM.opacity = '1'

				//=> 自动关闭弹窗 | '仅 type 为 info 等普通弹窗时'
				if (timeout > 0)
					setTimeout(() => {
						Close()
					}, timeout)
			})
		})
	}, [timeout])

	//=> 侦测 hooks close 状态改变
	useEffect(() => {
		if (close) Close()
	}, [close])

	/**
	 * 关闭弹窗
	 */
	const Close: () => void = () => {
		//=> 更新选择回调处理结束结果
		updateChooseOk(true)

		//=> 关闭弹窗动画
		fastdom.measure(() => {
			const el = document.getElementById(popupId)
			// 此处因严格模式下会被 React 反复执行两次，关闭操作组件闪现属于正常现象
			// console.log(popupId, el)
			if (el) {
				const { style } = el
				setTimeout(() => {
					fastdom.mutate(() => {
						style.paddingLeft = '102%'
						style.opacity = '0'
						setTimeout(() => {
							style.height = '0px'
							style.marginBottom = '0px'

							//=> 移除弹窗
							setTimeout(() => {
								removePopup(popupId)
							}, 501)
						}, 500)
					})
				}, 550)
			}
		})
	}

	return (
		<PopupItem id={popupId}>
			<div>
				<Main>
					<FrameStrip />
					<IconWrapper>
						<i className={icon.icon} style={{ color: icon.iconColor }} />
					</IconWrapper>
					<p>{content}</p>
					{type === 'choose' ? (
						<ChooseButtom>
							<div
								onClick={() => {
									updateChooseState(true)
									triggerChoose(popupId, true, Close)
								}}
							>
								<i className='el-icon-check' />
							</div>
							<div
								onClick={() => {
									updateChooseState(false)
									triggerChoose(popupId, false, Close)
								}}
							>
								<i className='el-icon-close' />
							</div>
						</ChooseButtom>
					) : (
						<></>
					)}
					<StateMask
						style={chooseState !== null ? { opacity: 1, zIndex: 10 } : {}}
					>
						<div
							style={
								chooseOk
									? { borderTop: '2px solid #525a6a', animation: 'unset' }
									: {}
							}
						/>
						<i
							style={chooseOk ? {} : { opacity: 0 }}
							className={`el-icon-${chooseState ? 'check' : 'close'}`}
						></i>
					</StateMask>
				</Main>
			</div>
		</PopupItem>
	)
})

//=> Style Component
const PopupItem = styled.div`
	position: relative;
	min-width: 242px;
	height: 48px;
	margin-bottom: 12px;
	overflow: hidden;
	padding-left: 102%;
	opacity: 0;
	> div {
		position: relative;
		width: 100%;
		min-height: 48px;
		background: hsla(0, 0%, 76.5%, 0.18);
		border-radius: 4px 0 0 4px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
	}
	> div + div {
		margin-top: 20px;
	}
`
const Main = styled.main`
	position: relative;
	min-height: 48px;
	overflow: hidden;
	padding: 0 15px;
	display: flex;
	align-items: center;
	user-select: none;
	/* border: 1px #444b58 solid;
	border-right: unset;
	border-radius: 4px 0 0 4px; */
	> p {
		flex-grow: 1;
		flex-shrink: 0;
		padding-right: 16px;
		font-size: 14px;
		line-height: 1;
		color: #fff;
		user-select: none;
	}
`

const ChooseButtom = styled.div`
	position: relative;
	min-width: 72px;
	display: flex;
	> div {
		width: 22px;
		height: 22px;
		padding: 3px;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;

		> i {
			color: #fff;
			font-size: 16px;
		}
	}
	> div + div {
		margin-left: 20px;
	}
	> div:hover {
		background-color: rgba(90, 93, 94, 0.31);
		> i {
			transform: scale(0.89);
		}
	}
`

const IconWrapper = styled.div`
	display: flex;
	margin-right: 10px;
	> i {
		color: #fff;
		font-size: 16px;
	}
`

const FrameStrip = styled.div`
	position: absolute;
	left: 0;
	width: 4px;
	height: 75%;
	border-radius: 0 5px 5px 0;
	background: #53b6eb;
`

const StateMask = styled.div`
	position: absolute;
	width: calc(100% - 8px);
	height: 100%;
	right: 0;
	z-index: -1;
	opacity: 0;
	border-radius: 4px;
	background: #252a2e;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		width: 28px;
		height: 28px;
		border: 2px solid #525a6a;
		border-top: 2px solid #343b40;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	> i {
		color: #fff;
		font-size: 15px;
		position: absolute;
	}
`
