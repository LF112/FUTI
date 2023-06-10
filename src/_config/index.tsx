/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */

import { AuoutMe as $AuoutMe } from './PersonalInfo'
import { Links as $Links } from './SocialLink'
import { Info as $FooterInfo } from './FooterInfo'
//[ constant ]

//=> Main Constants
export default {
	PersonalInfo: $AuoutMe, //=> 个人 TAG
	SocialLink: $Links, //=> 社交平台
	FooterInfo: $FooterInfo, //=> 底部信息
	Live2D: {
		l2dPath: './live2d/', //=> 存放 live2d 模型的绝对路径。 './' 是根目录
		l2dFileName: 'futi.model3.json' //=> Live2d 模型的文件名，一般以 '.model3.json' 结尾
	}
}
