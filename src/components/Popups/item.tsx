import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useRemovePopup } from 'state/popup/hooks'

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()
	const removePopup = useRemovePopup()

	const icon = {
		icon: 'el-icon-warning',
		iconColor: '#fff'
	}

	const type = props.type
	if (type == 'info') {
		icon.icon = 'el-icon-warning-outline'
		icon.iconColor = '#909399'
	} else if (type == 'success') {
		icon.icon = 'el-icon-success'
		icon.iconColor = '#67c23a'
	} else if (type == 'warn') icon.iconColor = '#f56c6c'
	else if (type == 'load') {
		icon.icon = 'el-icon-loading'
		icon.iconColor = '#53a8ff'
	}

	useEffect(() => {
		const DOM = node.current.style
		DOM.display = 'block'
		setTimeout(() => {
			DOM.paddingLeft = '0px'
			DOM.opacity = '1'
			if (props.timeout > 0)
				setTimeout(() => {
					Close()
				}, props.timeout)
		}, 10)
	}, [props.timeout])

	useEffect(() => {
		if (props.close) Close()
	}, [props.close])

	const Close = () => {
		const DOM = node.current.style
		DOM.paddingLeft = '100%'
		DOM.opacity = '0'
		setTimeout(() => {
			removePopup(props.iKey)
		}, 501)
	}

	return (
		<Futice ref={node as any}>
			<div>
				<Main>
					<div>
						<i className={icon.icon} style={{ color: icon.iconColor }} />
					</div>
					<p>{props.content}</p>
					{props.callback ? (
						<div>
							<i
								className='el-icon-check'
								onClick={() => {
									props.callback(true)
									Close()
								}}
							/>
							<i
								className='el-icon-close'
								onClick={() => {
									props.callback(false)
									Close()
								}}
							/>
						</div>
					) : (
						<></>
					)}
				</Main>
			</div>
		</Futice>
	)
}

//=> Style
const Futice = styled.div`
	position: relative;
	min-width: 280px;
	height: 48px;
	margin-top: 20px;
	margin-bottom: 12px;
	overflow: hidden;
	padding-left: 100%;
	opacity: 0;
	display: none;
	> div {
		position: relative;
		width: 100%;
		min-height: 48px;
		background: hsla(0, 0%, 76.5%, 0.18);
		border-radius: 4px 0 0 4px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
	}
`
const Main = styled.main`
	position: relative;
	min-height: 48px;
	overflow: hidden;
	padding: 0 15px;
	display: flex;
	align-items: center;
	> div:first-child {
		display: flex;
		margin-top: 2px;
		margin-right: 10px;
		> i {
			color: #fff;
			font-size: 16px;
		}
	}
	> p {
		flex-grow: 1;
		flex-shrink: 0;
		padding-right: 16px;
		font-size: 14px;
		line-height: 1.4;
		color: #fff;
		user-select: none;
	}
	> div:last-child {
		position: relative;
		min-width: 72px;
		> i {
			color: #fff;
			margin-left: 20px;
			font-size: 16px;
			cursor: pointer;
		}
	}
`
