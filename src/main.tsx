import React from 'react'
import ReactDOM from 'react-dom'
//[ package ]
import './index.less'
//[ style ]

//import Loading from 'page/loading/main'
import GA1 from 'components/Background/GA1'
import Ribbon from 'components/Ribbon'
import HeadernContainer from 'page/header'
import MainContainer from 'page/main'
import FooternContainer from 'page/footer'
//[ Component ]

//=> Main Component
const APP = () => {
	return (
		<>
			<header>
				<Ribbon />
				<HeadernContainer />
			</header>
			<main>
				<MainContainer />
			</main>
			<footer>
				<FooternContainer />
			</footer>
			<GA1 />
		</>
	)
}

//=> Render
ReactDOM.render(
	<React.StrictMode>
		<APP />
		{/* <Loading /> */}
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
