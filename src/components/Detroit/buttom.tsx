import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'

import { runAn } from 'utils/useQueueAnimation'

//=> DOM
export default (props: any) => {
	const [open, updateOpen] = useState<boolean>(false)

	//=> REFs
	const node = useRef<HTMLDivElement>()
	const pointNode = useRef<HTMLDivElement>()
	const textNode = useRef<HTMLDivElement>()
	const maskNode = useRef<HTMLDivElement>()
	const T1 = useRef<HTMLDivElement>()
	const T2 = useRef<HTMLDivElement>()
	const T3 = useRef<HTMLDivElement>()
	const T4 = useRef<HTMLDivElement>()
	const T5 = useRef<HTMLDivElement>()
	const T6 = useRef<HTMLDivElement>()
	const T7 = useRef<HTMLDivElement>()
	const T8 = useRef<HTMLDivElement>()
	const T9 = useRef<HTMLDivElement>()
	const T10 = useRef<HTMLDivElement>()
	const T11 = useRef<HTMLDivElement>()
	const T12 = useRef<HTMLDivElement>()
	const T13 = useRef<HTMLDivElement>()
	const T14 = useRef<HTMLDivElement>()
	//=======

	useEffect(() => {
		fastdom.measure(() => {
			const nodeDom = node.current.style
			const pointNodeDom = pointNode.current.style
			const textDom = textNode.current.style
			const maskDom = maskNode.current
			const T1Dom = T1.current.style
			const T2Dom = T2.current.style
			const T3Dom = T3.current.style
			const T4Dom = T4.current.style
			const T5Dom = T5.current.style
			const T6Dom = T6.current.style //
			const T7Dom = T7.current.style //
			const T8Dom = T8.current.style
			const T9Dom = T9.current.style
			const T10Dom = T10.current.style //
			const T11Dom = T11.current.style
			const T12Dom = T12.current.style
			const T13Dom = T13.current.style
			const T14Dom = T14.current.style
			//=> RUN
			const AN = [
				{
					next: 48,
					fn: () => {
						fastdom.mutate(() => {
							textDom.opacity = '0'
							pointNodeDom.opacity = '0'
							T1Dom.borderTopColor = 'transparent'
							T2Dom.borderTopColor = 'transparent'
							T3Dom.borderTopColor = 'transparent'
							T4Dom.borderTopColor = 'transparent'
							T5Dom.borderTopColor = 'transparent'
							T6Dom.borderTopColor = 'transparent'
							T7Dom.borderTopColor = 'transparent'
							T8Dom.borderTopColor = 'transparent'
							T9Dom.borderTopColor = 'transparent'
							T10Dom.borderTopColor = 'transparent'
							T11Dom.borderTopColor = 'transparent'
							T12Dom.borderTopColor = 'transparent'
							T13Dom.borderTopColor = 'transparent'
							T14Dom.borderTopColor = 'transparent'
						})
					}
				},
				{
					next: 32,
					fn: () => {
						fastdom.mutate(() => {
							nodeDom.background = '#111418'
						})
					}
				},
				{
					next: 33,
					fn: () => {
						fastdom.mutate(() => {
							nodeDom.background = 'transparent'
						})
					}
				},
				{
					next: 16,
					fn: () => {
						fastdom.mutate(() => {
							textDom.opacity = '1'
						})
					}
				},
				{
					next: 49,
					fn: () => {
						fastdom.mutate(() => {
							textDom.opacity = '0'
							pointNodeDom.opacity = '1'
						})
					}
				},
				{
					next: 33,
					fn: () => {
						fastdom.mutate(() => {
							textDom.opacity = '1'
							T10Dom.borderTopColor = '#282f38'
						})
					}
				},
				{
					next: 66,
					fn: () => {
						fastdom.mutate(() => {
							pointNodeDom.opacity = '0'
							T10Dom.borderTopColor = 'transparent'
							textDom.color = '#f3f5f7'
							nodeDom.background =
								'linear-gradient(0,#041f35,#175280,#133a5a,#052c4a)'
							maskDom.classList.add('shadow')
						})
					}
				},
				{
					next: 48,
					fn: () => {
						fastdom.mutate(() => {
							T5Dom.borderTopColor = 'hsl(0deg, 0%, 100%, 35%)'
							T6Dom.borderTopColor = 'hsl(0deg, 0%, 100%, 30%)'
						})
					}
				},
				{
					next: 16,
					fn: () => {
						fastdom.mutate(() => {
							maskDom.classList.remove('shadow')
							nodeDom.background = '#12222f'
						})
					}
				},
				{
					next: 49,
					fn: () => {
						fastdom.mutate(() => {
							pointNodeDom.opacity = '1'
							nodeDom.background =
								'linear-gradient(0,#010a11,#113b5c,#0b2336,#031726)'
						})
					}
				},
				{
					next: 33,
					fn: () => {
						fastdom.mutate(() => {
							nodeDom.background =
								'linear-gradient(0,#021523,#14476e,#0f2f48,#042238)'
						})
					}
				},
				{
					next: 16,
					fn: () => {
						fastdom.mutate(() => {
							T10Dom.borderTopColor = 'hsl(0deg, 0%, 100%, 50%)'
						})
					}
				},
				{
					next: 0,
					fn: () => {
						fastdom.mutate(() => {})
					}
				}
			]

			if (open) runAn(AN)
		})
	}, [open])

	return (
		<MAIN
			ref={node as any}
			onMouseEnter={() => updateOpen(true)}
			onMouseLeave={() => updateOpen(false)}
		>
			<Mask ref={maskNode as any}>
				<p ref={textNode as any}>继续</p>
				<POINT ref={pointNode as any}>
					<PointLeft />
					<PointRight />
					<CenterPoint>
						<PointTop />
						<PointBottom />
					</CenterPoint>
				</POINT>
			</Mask>
			<Background>
				<Triangle
					style={{ borderTopColor: 'hsl(0deg, 0%, 29%, 35%)' }}
					ref={T1 as any}
				/>
				<Triangle
					style={{
						transform: 'rotate(180deg) translateY(15px)',
						borderTopColor: 'hsl(0deg, 0%, 29%, 35%)'
					}}
					ref={T2 as any}
				/>
				<Triangle
					style={{ borderTopColor: 'hsl(0deg, 0%, 29%, 35%)' }}
					ref={T3 as any}
				/>
				<Triangle
					style={{
						transform: 'rotate(180deg) translateY(15px)',
						borderTopColor: 'hsl(0deg, 0%, 29%, 35%)'
					}}
					ref={T4 as any}
				/>
				<Triangle
					style={{ borderTopColor: 'hsl(0deg, 0%, 29%, 35%)' }}
					ref={T5 as any}
				/>
				<Triangle
					style={{ transform: 'rotate(180deg) translateY(15px)' }}
					ref={T6 as any}
				/>
				<Triangle ref={T7 as any} />
				<Triangle
					style={{
						transform: 'rotate(180deg) translateY(15px)',
						borderTopColor: 'hsl(0deg, 0%, 29%, 35%)'
					}}
					ref={T8 as any}
				/>
				<Triangle
					style={{ borderTopColor: 'hsl(0deg, 0%, 29%, 35%)' }}
					ref={T9 as any}
				/>
				<Triangle
					style={{ transform: 'rotate(180deg) translateY(15px)' }}
					ref={T10 as any}
				/>
				<Triangle
					style={{ borderTopColor: 'hsl(0deg, 0%, 29%, 35%)' }}
					ref={T11 as any}
				/>
				<Triangle
					style={{
						transform: 'rotate(180deg) translateY(15px)',
						borderTopColor: 'hsl(0deg, 0%, 29%, 35%)'
					}}
					ref={T12 as any}
				/>
				<Triangle
					style={{ borderTopColor: 'hsl(0deg, 0%, 29%, 35%)' }}
					ref={T13 as any}
				/>
				<Triangle
					style={{
						transform: 'rotate(180deg) translateY(15px)',
						borderTopColor: 'hsl(0deg, 0%, 29%, 35%)'
					}}
					ref={T14 as any}
				/>
			</Background>
		</MAIN>
	)
}

const MAIN = styled.div`
	position: relative;
	width: 190px;
	height: 30px;
	border-radius: 2px;
	cursor: pointer;
	transition: unset !important;
	* {
		transition: all 10ms cubic-bezier(0.22, 0.58, 0.12, 0.98) !important;
		/* transition: unset !important; */
	}
	.shadow::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		transform-origin: 0 0;
		transform: translate(0%, 100%) scaleY(1);
		background: linear-gradient(
			180deg,
			hsl(207deg, 70%, 29%, 48%),
			transparent
		);
	}
	.shadow::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		-ms-transform-origin: 0 0;
		transform-origin: 0 0;
		transform: translate(100%, 0) scaleY(1) rotate(180deg);
		background: linear-gradient(
			180deg,
			hsl(207deg, 70%, 29%, 48%),
			transparent
		);
	}
`
const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	overflow: hidden;
	z-index: 0;
	> div {
		margin-left: -15px;
	}
`

const Triangle = styled.div`
	border: 15px solid transparent;
	border-top: 28px solid transparent;
`

const Mask = styled.main`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 12px;
	z-index: 10;
	> p {
		line-height: 1;
		font-size: 12px;
		font-weight: lighter;
	}
`

const POINT = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	z-index: 1;
`

const PointLeft = styled.div`
	position: absolute;
	width: 5px;
	height: 5px;
	margin-left: -5px;
	background: hsl(0deg, 0%, 36%, 40%);
`

const PointRight = styled.div`
	position: absolute;
	width: 5px;
	height: 5px;
	right: -5px;
	background: hsl(0deg, 0%, 36%, 40%);
`

const CenterPoint = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
`

const PointTop = styled.div`
	position: absolute;
	width: 5px;
	height: 5px;
	top: -5px;
	background: hsl(0deg, 0%, 36%, 40%);
`

const PointBottom = styled.div`
	position: absolute;
	width: 5px;
	height: 5px;
	bottom: -5px;
	background: hsl(0deg, 0%, 36%, 40%);
`
