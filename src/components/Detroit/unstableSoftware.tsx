import React, { useEffect, memo, useRef } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'

import { runAn } from 'utils/useQueueAnimation'

import { useRemoveRA9 } from 'state/popup/hooks'

//=> DOM
export default memo((props: any) => {
	const removeRA9 = useRemoveRA9()
	let randText = ['R', '9', 'D', 'A', '', 'F', 'C', 'T', 'R', 'N']

	//=> REFs
	const _frameStart = useRef<HTMLDivElement>()
	const _frameOne = useRef<HTMLDivElement>()
	const _frameTwo = useRef<HTMLDivElement>()
	const _frameEnd = useRef<HTMLDivElement>()
	const _frameEnd_2 = useRef<HTMLDivElement>()
	const _frameEnd_3 = useRef<HTMLDivElement>()
	const _arrowAn = useRef<HTMLDivElement>()
	const _arrowAn_Down = useRef<HTMLDivElement>()
	const _tipAn = useRef<HTMLDivElement>()
	const _tipAn_1 = useRef<HTMLDivElement>()
	const _tipAn_2 = useRef<HTMLDivElement>()
	const _tipAn_3 = useRef<HTMLDivElement>()
	const _randText_T1 = useRef<HTMLDivElement>()
	const _randText_T2 = useRef<HTMLDivElement>()
	const _randText_T3 = useRef<HTMLDivElement>()
	const _randText_T4 = useRef<HTMLDivElement>()
	const _randText_T5 = useRef<HTMLDivElement>()
	const _randText_B1 = useRef<HTMLDivElement>()
	const _randText_B2 = useRef<HTMLDivElement>()
	const _randText_B3 = useRef<HTMLDivElement>()
	const _randText_B4 = useRef<HTMLDivElement>()
	const _randText_B5 = useRef<HTMLDivElement>()
	//=======

	useEffect(() => {
		fastdom.measure(() => {
			const _frameStartDom = _frameStart.current.style
			const _frameOneDom = _frameOne.current.style
			const _frameTwoDom = _frameTwo.current.style
			const _frameEndDom = _frameEnd.current.style
			const _frameEnd_2Dom = _frameEnd_2.current.style
			const _frameEnd_3Dom = _frameEnd_3.current.style
			const _arrowAn_DownDom = _arrowAn_Down.current.style
			const _tipAnDom = _tipAn.current.style
			const _tipAn_1Dom = _tipAn_1.current.style
			const _tipAn_2Dom = _tipAn_2.current.style
			const _tipAn_3Dom = _tipAn_3.current.style
			const _randText_T1Dom = _randText_T1.current.style
			const _randText_T2Dom = _randText_T2.current.style
			const _randText_T3Dom = _randText_T3.current.style
			const _randText_T4Dom = _randText_T4.current.style
			const _randText_T5Dom = _randText_T5.current.style
			const _randText_B1Dom = _randText_B1.current.style
			const _randText_B2Dom = _randText_B2.current.style
			const _randText_B3Dom = _randText_B3.current.style
			const _randText_B4Dom = _randText_B4.current.style
			const _randText_B5Dom = _randText_B5.current.style
			//=> RUN
			const AN = [
				{
					next: 52,
					fn: () => {
						fastdom.mutate(() => {
							_frameStart.current.removeAttribute('style')
							_arrowAn.current.removeAttribute('style')
							setTimeout(() => {
								setTimeout(() => (_arrowAn_DownDom.marginTop = '35px'), 10)
								setTimeout(() => {
									_arrowAn_DownDom.transition =
										'all 0.285s cubic-bezier(0.22, 0.58, 0.12, 0.98)'
									_arrowAn_DownDom.opacity = '0'
								}, 1040)
								// => 渐变字
								setTimeout(() => {
									_randText_T2Dom.opacity = '1'
									_randText_B2Dom.opacity = '1'
									setTimeout(() => {
										_randText_B5Dom.opacity = '1'
										setTimeout(() => {
											_randText_T1Dom.opacity = '1'
											_randText_T3Dom.opacity = '1'
											setTimeout(() => {
												_randText_T2Dom.opacity = '0.4'
												_randText_B2Dom.opacity = '0.4'
												_randText_B5Dom.opacity = '0.4'
												setTimeout(() => {
													_randText_T4Dom.opacity = '1'
													_randText_B2Dom.opacity = '1'
													_randText_B3Dom.opacity = '1'
													_randText_B4Dom.opacity = '1'
												}, 193)
											}, 146)
										}, 376)
									}, 58)
								}, 285)
								//===========
							}, 10)
							setTimeout(() => {
								_frameStartDom.display = 'none'
								_tipAn.current.removeAttribute('style')
							}, 28)
						})
					}
				},
				{
					next: 61,
					fn: () => {
						fastdom.mutate(() => {
							_frameOne.current.removeAttribute('style')
							_tipAnDom.display = 'none'
							setTimeout(() => {
								_frameOneDom.display = 'none'
								_tipAn.current.removeAttribute('style')
								_tipAn_1.current.removeAttribute('style')
								_tipAn_2.current.removeAttribute('style')
							}, 16)
						})
					}
				},
				{
					next: 53,
					fn: () => {
						fastdom.mutate(() => {
							_tipAnDom.display = 'none'
							_frameTwo.current.removeAttribute('style')
							setTimeout(() => {
								_frameTwoDom.display = 'none'
								_tipAn.current.removeAttribute('style')
							}, 36)
						})
					}
				},
				{
					next: 33,
					fn: () => {
						fastdom.mutate(() => {
							_tipAnDom.display = 'none'
							setTimeout(() => {
								_tipAn_3Dom.color = '#fff'
								_tipAn_1Dom.display = 'none'
								_tipAn_2Dom.display = 'none'
							}, 1)
							_frameEnd.current.removeAttribute('style')
						})
					}
				},
				{
					next: 43,
					fn: () => {
						fastdom.mutate(() => {
							_tipAn.current.removeAttribute('style')
							_tipAnDom.opacity = '1'
							_frameEnd_3Dom.display = 'none'
							_frameEnd_2Dom.display = 'none'
							_frameEnd_2Dom.borderBottom = '145px solid rgba(8, 8, 8, 0.53)'
						})
					}
				},
				{
					next: 0,
					fn: () => {
						fastdom.mutate(() => {
							_frameEnd_3.current.removeAttribute('style')
							_frameEnd_2Dom.display = 'block'
							_frameEndDom.transition =
								'all 0.421s cubic-bezier(0.22, 0.58, 0.12, 0.98)'
							_frameEndDom.opacity = '1'
						})
					}
				},
				{
					next: 1570,
					fn: () => {
						fastdom.mutate(() => {
							_frameEndDom.opacity = '0'
							_tipAnDom.opacity = '0'
							_randText_T1Dom.opacity = '0'
							_randText_T2Dom.opacity = '0'
							_randText_T3Dom.opacity = '0'
							_randText_T4Dom.opacity = '0'
							_randText_T5Dom.opacity = '0'
							_randText_B1Dom.opacity = '0'
							_randText_B2Dom.opacity = '0'
							_randText_B3Dom.opacity = '0'
							_randText_B4Dom.opacity = '0'
							_randText_B5Dom.opacity = '0'
						})
					}
				},
				{
					next: 501,
					fn: () => {
						_frameStart.current.removeAttribute('style')
						_frameStartDom.display = 'none'
						_tipAn.current.removeAttribute('style')
						_tipAnDom.display = 'none'
						_frameOne.current.removeAttribute('style')
						_frameOneDom.display = 'none'
						_tipAn_1.current.removeAttribute('style')
						_tipAn_1Dom.display = 'none'
						_tipAn_2.current.removeAttribute('style')
						_tipAn_2Dom.display = 'none'
						_frameTwo.current.removeAttribute('style')
						_frameTwoDom.display = 'none'
						_tipAn_3.current.removeAttribute('style')
						_randText_T1.current.removeAttribute('style')
						_randText_T2.current.removeAttribute('style')
						_randText_T3.current.removeAttribute('style')
						_randText_T4.current.removeAttribute('style')
						_randText_T5.current.removeAttribute('style')
						_randText_B1.current.removeAttribute('style')
						_randText_B2.current.removeAttribute('style')
						_randText_B3.current.removeAttribute('style')
						_randText_B4.current.removeAttribute('style')
						_randText_B5.current.removeAttribute('style')
						_frameEnd.current.removeAttribute('style')
						_frameEndDom.display = 'none'
						_frameEnd_3.current.removeAttribute('style')
						_frameEnd_2.current.removeAttribute('style')
						_frameEnd_2Dom.borderBottom = '145px solid hsl(0, 0%, 3%)'
						_arrowAn.current.removeAttribute('style')
						_arrowAn.current.style.display = 'none'
						_arrowAn_Down.current.removeAttribute('style')
						_arrowAn_DownDom.marginTop = props.down ? '-25px' : '85px'
						removeRA9(props.iKey)
					}
				}
			]
			runAn(AN)
		})
	})

	return (
		<RA9>
			<ShapeLine>
				<div ref={_frameStart as any} style={{ display: 'none' }}>
					<TriangleDown />
				</div>
				<FrameOne ref={_frameOne as any} style={{ display: 'none' }}>
					<Parallelogram />
				</FrameOne>
				<div ref={_frameTwo as any} style={{ display: 'none' }}>
					<TrapezoidDown />
				</div>
				<FrameEnd ref={_frameEnd as any} style={{ display: 'none' }}>
					<TriangleDown />
					<TriangleUp
						ref={_frameEnd_2 as any}
						style={{ borderBottom: '145px solid hsl(0, 0%, 3%)' }}
					/>
					<Parallelogram ref={_frameEnd_3 as any} />
				</FrameEnd>
			</ShapeLine>
			<ArrowAn ref={_arrowAn as any} style={{ display: 'none' }}>
				<i
					ref={_arrowAn_Down as any}
					className={props.down ? 'el-icon-arrow-down' : 'el-icon-arrow-up UP'}
					style={{ marginTop: props.down ? '-25px' : '85px' }}
				></i>
			</ArrowAn>
			<TipAn ref={_tipAn as any} style={{ display: 'none' }}>
				<div>
					<nav ref={_tipAn_1 as any} style={{ display: 'none' }}></nav>
					<nav
						ref={_tipAn_2 as any}
						className='Tie'
						style={{ display: 'none' }}
					></nav>
					<p ref={_tipAn_3 as any}>{props.text}</p>
				</div>
			</TipAn>
			<RandTextTop>
				<p ref={_randText_T1 as any}>{randText[0]}</p>
				<p ref={_randText_T2 as any}>{randText[1]}</p>
				<p ref={_randText_T3 as any}>{randText[2]}</p>
				<nav />
				<p ref={_randText_T4 as any}>{randText[3]}</p>
				<p ref={_randText_T5 as any}>{randText[4]}</p>
			</RandTextTop>
			<RandTextBottom>
				<div>
					<p ref={_randText_B1 as any}>{randText[5]}</p>
					<p ref={_randText_B2 as any}>{randText[6]}</p>
					<p ref={_randText_B3 as any}>{randText[7]}</p>
					<nav />
					<p ref={_randText_B4 as any}>{randText[8]}</p>
					<p ref={_randText_B5 as any}>{randText[9]}</p>
				</div>
			</RandTextBottom>
		</RA9>
	)
})

//=> Style
const RA9 = styled.div`
	position: relative;
	width: 440px;
	height: 145px;
	zoom: 0.75;
	margin-bottom: 50px;
	@media screen and (max-width: 780px) {
		zoom: 0.55;
	}
`

const ShapeLine = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	> div {
		display: flex;
	}
`

const TriangleDown = styled.div`
	width: 0;
	height: 0;
	border: 75px solid transparent;
	border-top: 145px solid hsl(0, 0%, 3%);
`

const TriangleUp = styled.nav`
	width: 0;
	height: 0;
	border: 75px solid transparent;
	border-bottom: 145px solid hsla(0, 0%, 3%, 0.59);
	margin-top: -75px;
`

const Parallelogram = styled.div`
	width: 0;
	height: 0;
	background-color: hsla(0, 0%, 3%, 0.37);
	transform: skew(33.1deg);
`

const TrapezoidDown = styled.div`
	width: 300px;
	height: 50px;
	background: transparent;
	border-top: 145px solid rgb(8, 8, 8);
	border-left: 75px solid transparent;
	border-right: 75px solid transparent;
`

const FrameOne = styled.div`
	position: absolute;
	> div {
		width: 150px;
		height: 145px;
		margin-left: 37px;
		transform: skew(27.2deg);
		background-color: hsl(0, 0%, 3%);
	}
`

const FrameEnd = styled.div`
	position: absolute;
	> div:first-child {
		border-top: 145px solid hsla(0, 0%, 3%, 0.25);
	}
	> nav {
		margin-left: -76px;
	}
	> div:last-child {
		width: 216px;
		height: 145px;
		margin-left: -38px;
		transform: skew(27.4deg);
		background-color: hsl(0, 0%, 3%);
	}
`

const ArrowAn = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	text-align: right;
	.UP {
		color: #0996e6 !important;
		margin-top: 85px;
	}
	> i {
		font-size: 5em;
		color: #b1372f;
		margin-right: 75px;
		line-height: 1;
		margin-top: -25px;
		transition: all 1.57s cubic-bezier(0.22, 0.58, 0.12, 0.98);
	}
`

const TipAn = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		width: 100%;
		height: 32px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40px;
		> nav {
			position: absolute;
			width: 292px;
			height: 32px;
			background-color: hsla(0, 0%, 100%, 0.42);
			transform: skew(27deg);
			margin-left: -32px;
			z-index: 1;
		}
		.Tie {
			width: 220px;
			z-index: 5;
		}
		> p {
			font-size: 22px;
			color: hsl(0, 0%, 20%);
			line-height: 1;
			font-weight: lighter;
			user-select: none;
			z-index: 10;
		}
	}
`

const RandTextTop = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	p {
		opacity: 0;
		color: hsla(0, 0%, 100%, 0.63);
		font-size: 36px;
		font-weight: lighter;
		padding: 0 2px;
		user-select: none;
	}
	nav {
		width: 62px;
	}
`
const RandTextBottom = styled.div`
	position: absolute;
	width: 100%;
	display: flex;
	top: unset;
	bottom: 0;
	margin-bottom: -40px;
	justify-content: center;
	> div {
		display: flex;
		margin-left: -15px;
	}
	p {
		opacity: 0;
		color: hsla(0, 0%, 100%, 0.63);
		font-size: 36px;
		font-weight: lighter;
		padding: 0 2px;
		user-select: none;
	}
	nav {
		width: 62px;
	}
`
