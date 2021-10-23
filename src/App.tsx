import React, { useEffect } from 'react'

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
		setTimeout(() => LoadAn(() => updateLoadStatus(true)), 500)
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
