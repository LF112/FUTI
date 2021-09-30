import React from 'react'
//[ package ]
import './index.less'
//[ style ]

import { ReactComponent as FUTI_Icon } from 'assets/svg/futi.svg'
//[ Assets ]

import BluePrint from 'components/Background/blueprint'
//[ Component ]

//=> DOM
export default (props: any) => {
	return (
		<div className='LOADING'>
			<div>
				<FUTI_Icon />
				<footer>
					<div>
						<h2>Loading...</h2>
					</div>
				</footer>
			</div>
			<BluePrint />
		</div>
	)
}
