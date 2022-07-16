/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */

import React, { ReactComponentElement } from 'react'
import Package from '../../package.json'
//[ package ]

import { LF } from 'components/global/Footer/MoreInfo'
//[ components ]

export interface Info {
	url: string
	context: ReactComponentElement<any> | string
	tips: string
}

export const Info: Info[] = [
	{
		//=> 此条目请不要更改
		url: null,
		//=> 此条目请不要更改
		context: (
			<>
				Copyright &copy; 2017 - {new Date().getFullYear()}
				{/* 请尊重开源，不要替换原作者昵称。 */}
				<LF
					className='TIP'
					href='https://www.lf112.net/'
					data-tooltip={'🙃 Independent Websites Developer'}>
					&nbsp;LF112&nbsp;
				</LF>
				{/* 请尊重开源，不要替换原作者昵称。 */}
				All Rights Reserved.
			</>
		),
		tips: null //=> 此条目请不要更改
	},
	{
		url: 'https://beian.miit.gov.cn',
		context: '琼 ICP 备 2021000434 号',
		tips: '🔖 ICP'
	},
	{
		url: 'https://www.beian.gov.cn/portal/registerSystemInfo',
		context: '琼公安备 46010702000093 号',
		tips: '🔒️ Public Security Beian'
	},
	{
		//=> 此条目请不要更改
		url: 'https://github.com/LF112/FUTI', // 请尊重开源，不要替换原仓库地址。
		context: `V${Package.version}`,
		tips: '✨ Github Repo'
	} //=> 此条目请不要更改
]
