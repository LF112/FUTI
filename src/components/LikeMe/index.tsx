import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { reactLocalStorage } from 'reactjs-localstorage'
import AV from 'leancloud-storage'
import fastdom from 'fastdom'
import { useTranslation } from 'react-i18next'

import { ReactComponent as LikeIcon } from 'assets/svg/footer_like.svg'
import Loading from 'components/Loading'
//[ components ]

import { numberGrow, Rand } from 'utils/useAnimations'
//[ utils ]

import { useLoadStatus } from 'state/animation/hooks'
//[ store ]

import { useAddPopup, useAddRA9 } from 'state/popup/hooks'
//[ hooks ]

//=> DOM
export default (props: any) => {
	const { t } = useTranslation()
	const addPopup = useAddPopup()
	const addRA9 = useAddRA9()

	const [likeLoad, setLikeLoad] = useState<boolean>(false)
	const [clickLock, setClickLock] = useState<boolean>(false)
	const [aixinShow, setAixinShow] = useState<boolean>(false)
	const [firstClickRA9, setFirstClickRA9] = useState<boolean>(false)
	const [likeCount, setLikeCount] = useState<number>(0)
	const [likeCountOriginal, setLikeCountOriginal] = useState<number>(0)
	const [likeIcon, setLikeIcon] = useState<string>('')

	const node = useRef<HTMLDivElement>()
	const tipsNode = useRef<HTMLDivElement>()
	const iconNode = useRef<HTMLDivElement>()
	const likeCountNode = useRef<HTMLDivElement>()
	const aixinNode = useRef<HTMLDivElement>()
	const loadingNode = useRef<HTMLDivElement>()

	const loadStatus = useLoadStatus()

	//=> CONFIG
	AV.init({
		appId: 'p1zULfnyH8jIRVaWEDwi9Cml-gzGzoHsz',
		appKey: 'CPlolQCbb1y7SWMsNtciyS2P',
		serverURLs: 'https://service.leancloud.lf112.net'
	})

	const randIcon = Rand([
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
	//=========

	const isLike = reactLocalStorage.get('like', null)
	const cacheLike = isLike == null ? false : isLike == 'false' ? false : true

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			//=> 从 LeanCloud 获取点赞数
			const AV_ON = AV.Object.extend('LiCount')
			const AV_Main = new AV.Query(AV_ON)

			AV_Main.equalTo('ID', 'LF_LikeMe')
			AV_Main.find().then(Results => {
				CloneLoadAn()
				setLikeCountOriginal(Results[0].attributes.count)
			})
		} else setLikeCountOriginal(400)
	}, [])

	useEffect(() => {
		if (loadStatus) {
			if (process.env.NODE_ENV === 'production') {
				numberGrow(likeCountOriginal, setLikeCount)
				setLikeLoad(true)
			} else {
				setLikeLoad(true)
				numberGrow(400, setLikeCount)
				CloneLoadAn()
			}
			if (cacheLike) {
				CloneLoadAn()
				setClickLock(true)
				LikeAn()
			} else if (isLike == null || isLike == undefined)
				reactLocalStorage.set('like', false)

			//=> 随机点赞 Icon
			setLikeIcon(randIcon)
		}
	}, [loadStatus])

	//=> 点击
	const Click = () => {
		if (cacheLike == null || cacheLike == undefined || !loadStatus || !likeLoad)
			addPopup('warn', t`Loading 'LIKEME' button···`, 1500)
		else {
			if (!clickLock) {
				setClickLock(true)
				//=> 更新 LeanCloud 点赞数
				if (process.env.NODE_ENV === 'production') {
					const AV_ON = AV.Object.extend('LiCount')
					new AV.Query(AV_ON).find().then((Results: any[]) => {
						const AV_TO = Results[0]
						AV_TO.fetchWhenSave(true)
						AV_TO.increment('count')
						AV_TO.save().then(
							() => {
								setLikeCount(likeCount + 1)
								console.log('[Success] Like success!')
							},
							() => console.log('[ERR] Like failed!')
						)
					})
				} else setLikeCount(likeCount + 1)
				LikeAn()
				addRA9(true, '軟體不穩定')
				reactLocalStorage.set('like', true)
			} else if (cacheLike) {
				if (!firstClickRA9) {
					addRA9(false, t`I like you too!`)
					setFirstClickRA9(true)
				} else addPopup('lover', t`I like you too!`, 1500)
			}
			if (!aixinShow) LikeAn()
		}
	}

	//=> 点击爱心动画
	const LikeAn = () => {
		//=> 随机点赞 Icon
		setLikeIcon(randIcon)
		//=> 更改 tips
		fastdom.measure(() => {
			const tipsDom = tipsNode.current
			fastdom.mutate(() => {
				tipsDom.setAttribute('data-tooltip', t`I like you too!`)
				tipsDom.style.background = 'rgba(152, 89, 89, 0.4)'
			})
			setTimeout(() => {
				const iconDom = iconNode.current.style
				const likeCountDom = likeCountNode.current.style
				fastdom.mutate(() => {
					iconDom.opacity = '0'
					likeCountDom.opacity = '0'
					tipsDom.setAttribute('data-tooltip', t`Thank you~`)
				})
				const aixinDom = aixinNode.current.style
				setTimeout(() => {
					console.log(likeCountOriginal)
					if (cacheLike)
						tipsDom.setAttribute('data-tooltip', `${likeCountOriginal} love`)
					else tipsDom.setAttribute('data-tooltip', t`Thank you~`)
					setAixinShow(true)
				}, 1500)
				aixinDom.opacity = '1'
			}, 1500)
		})
	}

	//=> 关闭载入动画
	const CloneLoadAn = () => {
		fastdom.measure(() => {
			const loadDom = loadingNode.current.style
			const nodeDom = node.current.style
			fastdom.mutate(() => {
				loadDom.opacity = '0'
				nodeDom.opacity = '1'
			})
		})
	}

	return (
		<MAIN onClick={() => Click()}>
			<div
				ref={tipsNode as any}
				className='TIP'
				data-tooltip={t`Do you like me?`}
			>
				<main ref={node as any}>
					<i ref={iconNode as any} className={likeIcon}></i>
					<p ref={likeCountNode as any}>{likeCount}</p>
					<Aixin ref={aixinNode as any}>
						<LikeIcon />
					</Aixin>
				</main>
				<LoadMask ref={loadingNode as any}>
					<Loading size={20} />
				</LoadMask>
			</div>
		</MAIN>
	)
}

//=> Style
const MAIN = styled.div`
	position: absolute;
	right: 25px;
	display: flex;
	justify-content: center;
	cursor: pointer;
	user-select: none;
	> div {
		position: relative;
		background: rgba(79, 89, 95, 0.4);
		min-width: 50px;
		height: 32px;
		border-radius: 4px;
		padding: 2px;
		> main {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			opacity: 0;
			> p {
				color: rgba(202, 202, 202, 0.6);
				font-weight: bold;
				text-align: center;
				padding-right: 4px;
				padding-left: 2px;
				font-size: 20px;
			}
			> i {
				color: rgba(202, 202, 202, 0.6);
				font-size: 20px;
				margin-right: 2px;
				line-height: 1;
				margin-top: 2px;
				margin-left: 4px;
			}
		}
		@keyframes xintiao {
			0% {
				transform: scale(1);
			}
			50% {
				transform: scale(0.8);
			}
			to {
				transform: scale(1);
			}
		}
	}
	@media screen and (max-width: 780px) {
		position: fixed;
		right: 25px;
		bottom: 25px;
	}
`

const Aixin = styled.div`
	position: absolute;
	opacity: 0;
	width: 100%;
	height: 100%;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	> svg {
		width: 20px;
		height: 20px;
		animation: xintiao 1.33s ease-in-out infinite;
	}
`

const LoadMask = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`
