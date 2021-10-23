import React, { Suspense, useMemo, useRef, useEffect } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'
//[ package ]

import Loading from 'components/Loading'
//[ components ]

import {
	useL2dInitStatus,
	useUpdateL2dInitStatus,
	useUpdateL2dShowStatus,
	useLoadStatus,
	useUpdateL2dUnfoldStatus
} from 'state/animation/hooks'
//[ state ]

//=> DOM
export default (props: any) => {
	const node = useRef<HTMLDivElement>()
	const maskNode = useRef<HTMLDivElement>()

	const loadStatus = useLoadStatus()
	const [l2dInitStatus, l2dDomInitStatus, l2dShow, l2dUnfold] =
		useL2dInitStatus()
	const updateL2dInitStatus = useUpdateL2dInitStatus()
	const updateL2dShowStatus = useUpdateL2dShowStatus()
	const updateL2dUnfoldStatus = useUpdateL2dUnfoldStatus()

	//=> 懒加载 Live2d 组件
	const live2dModel = import.meta.glob('../Live2D/*')
	const LazyLive2D = React.lazy(live2dModel['../Live2D/index.tsx'] as any)
	const LIVE2D = useMemo(() => {
		return (
			<Suspense fallback={<></>}>
				<LazyLive2D />
			</Suspense>
		)
	}, [])

	//=> 载入动画
	useEffect(() => {
		setTimeout(() => {
			fastdom.measure(() => {
				const MaskDOM = maskNode.current.style
				fastdom.mutate(() => {
					MaskDOM.width = '230px'
					MaskDOM.height = '230px'
				})
			})
		}, 1000)
	}, [])

	//=> Live2D 载入动画
	useEffect(() => {
		// 此处应有判断爬虫
		if (true && loadStatus) updateL2dShowStatus(true)
		// Coding more...
	}, [loadStatus])

	//=> 动画
	useEffect(() => {
		if (l2dDomInitStatus && !l2dInitStatus)
			fastdom.measure(() => {
				const DOM = node.current.style
				DOM.opacity = '0'
				setTimeout(() => {
					fastdom.mutate(() => {
						DOM.display = 'none'
						setTimeout(() => updateL2dInitStatus(true))
						const MaskDOM = maskNode.current.style
						MaskDOM.width = '230px'
						MaskDOM.height = '230px'
						MaskDOM.padding = ''
					})
				}, 200)
			})

		if (l2dShow && !l2dDomInitStatus && !l2dInitStatus)
			fastdom.measure(() => {
				const MaskDOM = maskNode.current.style
				fastdom.mutate(() => {
					MaskDOM.width = '260px'
					MaskDOM.height = '260px'
					MaskDOM.padding = '30px'
				})
			})
	}, [l2dInitStatus, l2dDomInitStatus, l2dShow])

	return (
		<Main
			className='An'
			data-futi-an='FadeIn'
			style={l2dUnfold ? { width: '100%', height: '400px' } : {}}
			onMouseEnter={() => {
				if (l2dInitStatus) updateL2dUnfoldStatus(true)
			}}
			onMouseLeave={() => {
				if (l2dInitStatus) updateL2dUnfoldStatus(false)
			}}
		>
			<div
				ref={maskNode as any}
				style={
					l2dInitStatus
						? l2dUnfold
							? { width: '100%', height: '100%' }
							: { width: '230px', height: '230px' }
						: {}
				}
			>
				<IMGCentered>
					{!l2dInitStatus ? (
						<div ref={node as any}>
							<img
								alt='伏太，LF112,futiwolf,futi'
								src='https://cdn.lfio.net/lf112.png'
							/>
							<LoadMask style={{ opacity: l2dShow ? 1 : 0 }}>
								<Loading />
							</LoadMask>
						</div>
					) : (
						<></>
					)}
					{l2dShow ? LIVE2D : <></>}
				</IMGCentered>
				<TouchMe>
					<i
						className='el-icon-thumb'
						style={{ opacity: l2dInitStatus ? (l2dUnfold ? 0 : 1) : 0 }}
					>
						<span>TOUCH</span>
					</i>
				</TouchMe>
				<Frame>
					<div></div>
					<nav></nav>
					<nav></nav>
				</Frame>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	height: 260px;
	width: 260px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		position: relative;
		width: 0;
		height: 0;
		overflow: hidden;
		border-radius: 5px;
		padding: 5px;
		backdrop-filter: blur(8px);
		/*padding: 7px 5px 0 5px;*/
		/*border: 2px solid hsla(0, 0%, 53%, 0.4);*/
		user-select: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`

const IMGCentered = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		transition: all 0.2s cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
	}
	img {
		width: 220px;
		height: 220px;
		border-radius: 5px;
		object-fit: cover;
		user-select: none;
	}
`

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

const LoadMask = styled.div`
	position: absolute;
	width: 220px;
	height: 220px;
	top: 0;
	border-radius: 5px;
	background: hsla(0deg, 0%, 16%, 0.22);
	display: flex;
	align-items: center;
	justify-content: center;
`

const TouchMe = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 8px;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	> i {
		color: #fff;
		font-size: 20px;
		font-weight: lighter;
		padding: 4px 6px;
		border-radius: 4px;
		user-select: none;
		text-align: center;
		display: inline-grid !important;
		> span {
			color: #fff;
		}
	}
	animation: 1s linear infinite;
	animation-name: breathe;
	animation-timing-function: ease-in-out;
	animation-direction: alternate;
	@keyframes breathe {
		0% {
			opacity: 0.4;
			color: hsla(0, 0%, 100%, 0);
		}
		100% {
			opacity: 0.9;
			color: #fff;
		}
	}
`
