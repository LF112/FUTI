/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { ReactComponentElement } from 'react'
//[ package ]

import { ReactComponent as WordPress } from 'assets/svg/link_WordPress.svg'
import { ReactComponent as BiliBili } from 'assets/svg/link_BiliBili.svg'
import { ReactComponent as WeiBo } from 'assets/svg/link_WeiBo.svg'
import { ReactComponent as GitHub } from 'assets/svg/link_GitHub.svg'
import { ReactComponent as Steam } from 'assets/svg/link_Steam.svg'
import { ReactComponent as ZhiHu } from 'assets/svg/link_ZhiHu.svg'
import { ReactComponent as Mail } from 'assets/svg/link_Mail.svg'
//[ assets ]

export interface SocialLink {
	icon: ReactComponentElement<any>
	name: string
	url: string
}

export const Links: SocialLink[] = [
	{
		icon: <WordPress />,
		name: 'BLOG',
		url: 'https://blog.lf112.net'
	},
	{
		icon: <BiliBili />,
		name: 'BiliBili',
		url: 'https://space.bilibili.com/131579371'
	},
	{
		icon: <WeiBo />,
		name: 'WeiBo',
		url: 'https://www.weibo.com/futiwolf'
	},
	{
		icon: <GitHub />,
		name: 'GitHub',
		url: 'https://github.com/LF112'
	},
	{
		icon: <Steam />,
		name: 'Steam',
		url: 'https://steamcommunity.com/id/LF112'
	},
	{
		icon: <ZhiHu />,
		name: 'ZhiHu',
		url: 'https://www.zhihu.com/people/LF112'
	},
	{
		icon: <Mail />,
		name: 'Email',
		url: 'mailto://lf@lf112.net'
	}
]
