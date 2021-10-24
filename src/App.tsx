import React, { useEffect } from 'react'
import fastdom from 'fastdom'

//import Loading from 'page/loading/main'
import GA1 from 'components/Background/GA1'
import Header from 'page/header'
import Main from 'page/main'
import Footer from 'page/footer'
import Popups from 'components/Popups'
//[ Component ]

import { LoadAn } from 'utils/useLoadAn'
//[ utils ]

import { useUpdateLoadStatus } from 'state/animation/hooks'
//[ store ]

//=> Main Component
export default () => {
	const updateLoadStatus = useUpdateLoadStatus()
	useEffect(() => {
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
		setTimeout(() => LoadAn(() => updateLoadStatus(true)), 800)
	}, [])

	return (
		<>
			<Popups />

			<Header />
			<Main />
			<Footer />

			<GA1 />
		</>
	)
}
