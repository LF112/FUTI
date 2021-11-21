import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Buffer } from 'buffer'
//[ package ]
import './index.less'
import 'assets/element-ui-icon/index.less'
//[ style ]

import store from 'state'
//[ store ]

import { isSite } from 'utils/useTools'
//[ utils ]

//=> 防镜像站
if (isSite.length <= 0)
	window.location.href = `https://${Buffer.from(
		'7777772e6c663131322e6e6574',
		'hex'
	).toString()}`

//=> 懒加载 Main | '后期装载嵌入式博客可用'
const mainModule = import.meta.glob('./App.tsx')
const LazyMain = React.lazy(mainModule['./App.tsx'] as any)

//=> Render
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Suspense fallback={<></>}>
				<LazyMain />
			</Suspense>
			{/* <Loading /> */}
		</Provider>
	</React.StrictMode>,
	document.getElementById('FUTIWOLF')
)

if (process.env.NODE_ENV === 'production') {
	console.clear()
	console.log(
		'\n %c \u26a1futiwolf %c https://www.futiwolf.com %c BY%c LF112  \n\n',
		'color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;',
		'background:rgba(197, 197, 197, 0.89); padding:5px 0;',
		'color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;',
		'color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;'
	)
}
