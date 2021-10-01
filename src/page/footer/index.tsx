import React from 'react'
//[ package ]
import './index.less'
//[ style ]

import { ReactComponent as FUTI_Icon } from 'assets/svg/futi.svg'
//[ Assets ]

//=> DOM
export default (props: any) => {
	return (
		<div>
			<a className='NAVIGATOR' href='https://www.futiwolf.com'>
				<FUTI_Icon />
				<div className='thank TIP' data-tooltip='⚡Navigator Kepler'>
					Drawn by NAVILAB
				</div>
			</a>
		</div>
	)
}
