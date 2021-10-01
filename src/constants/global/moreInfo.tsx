import React, { ReactComponentElement } from 'react'
//[ package ]

import { ReactComponent as Code } from 'assets/svg/info_Code.svg'
//[ assets ]

export interface AuoutItem {
	icon: ReactComponentElement<any>
	name: string
}

export const AuoutMe: AuoutItem[] = [
	{
		icon: <i className='el-icon-male' />,
		name: 'Male'
	},
	{
		icon: <i className='el-icon-aim' />,
		name: 'Furry'
	},
	{
		icon: <i className='el-icon-collection' />,
		name: 'Student'
	},
	{
		icon: <Code />,
		name: 'Dev'
	}
]
