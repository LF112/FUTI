import React from 'react'
import ReactDOM from 'react-dom'
//[ package ]
import './index.less'
//[ style ]

//import Loading from 'pages/loading/main'
//[ Component ]

//=> Main Component
const APP = () => {
	return <main></main>
}

//=> Render
ReactDOM.render(
	<React.StrictMode>
		<APP />
		{/* <Loading /> */}
	</React.StrictMode>,
	document.getElementById('FUTIWOLF')
)
