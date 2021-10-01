import React from 'react'
//[ package ]
import './index.less'
//[ style ]

import Motto from 'components/Motto'
//[ component ]

//=> DOM
export default (props: any) => {
	return (
		<nav>
			<Motto />
		</nav>
	)
}
