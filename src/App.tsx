import React, { useEffect, Suspense } from 'react'

//import Loading from 'page/loading/main'
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

	//=> 懒加载背景组件 GA1
	const ga1Module = import.meta.glob('./components/Background/GA1.tsx')
	const LazyGA1 = React.lazy(
		ga1Module['./components/Background/GA1.tsx'] as any
	)

	return (
		<>
			<Popups />

			<Header />
			<Main />
			<Footer />

			<LazyGA1 />
		</>
	)
}
