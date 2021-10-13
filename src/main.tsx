import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//[ package ]
import './index.less'
import 'assets/element-ui-icon/index.less'
//[ style ]

//import Loading from 'page/loading/main'
import GA1 from 'components/Background/GA1'
import Header from 'page/header'
import Main from 'page/main'
import Footer from 'page/footer'
import Popups from 'components/Popups'
//[ Component ]

import store from 'state'
//[ store ]

//=> Main Component
const APP = () => {
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

//=> Render
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<APP />
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
