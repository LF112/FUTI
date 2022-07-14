/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { ReactComponentElement } from 'react'
//[ package ]

import { ReactComponent as Code } from 'assets/svg/info_Code.svg'
import { ReactComponent as Design } from 'assets/svg/info_Design.svg'
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
		name: 'WebDev'
	},
	{
		icon: <Design />,
		name: 'UI/UX'
	}
]
