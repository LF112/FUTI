import React, { useEffect } from 'react'
import fastdom from 'fastdom'
import { useTranslation } from 'react-i18next'

//import Loading from 'page/loading/main'
import GA1 from 'components/Background/GA1'
import Header from 'page/header'
import Main from 'page/main'
import Footer from 'page/footer'
import Popups from 'components/Popups'
//[ Component ]

import { LoadAn } from 'utils/useLoadAn'
import { isBaiduSpider, isMobile, isFutiSite } from 'utils/useTools'
//[ utils ]

import { useUpdateLoadStatus } from 'state/animation/hooks'
//[ store ]

//=> Main Component
export default () => {
	const { i18n } = useTranslation()

	const updateLoadStatus = useUpdateLoadStatus()

	useEffect(() => {
		if (isFutiSite) {
			i18n.changeLanguage('cn')
			document.title = '伏太 - 个人主页 | 诗与兽'
		}
		if (isMobile)
			fastdom.measure(() => {
				const BODY = document.querySelector('body')
				fastdom.mutate(() => {
					BODY.style.overflow = 'auto'
				})
			})
		if (isBaiduSpider) {
			document.getElementById('LOADING').style.display = 'none'
			document.querySelectorAll('.An').forEach(v => v.classList.remove('An'))
		} else {
			fastdom.measure(() => {
				const LOADING = document.getElementById('LOADING').style
				const LOADING_SVG = document.getElementById('LOADING-SVG').style
				fastdom.mutate(() => {
					LOADING_SVG.transition =
						'all 0.25s cubic-bezier(0.66, 0.09, 0.49, 1.21)'
					LOADING_SVG.marginTop = '138px'
					LOADING_SVG.opacity = '0'
					setTimeout(() => (LOADING.display = 'none'), 250)
				})
			})
			setTimeout(() => {
				LoadAn(() => updateLoadStatus(true))
			}, 800)
		}
	}, [])

	return (
		<>
			<Popups />

			<Header />
			<Main />
			<Footer />

			{!isBaiduSpider && !isMobile && !isFutiSite ? <GA1 /> : <></>}
		</>
	)
}
