/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
/**
 * 工具类
 */

//=> 是否为蜘蛛
export const isSpider = /spider|bot/gi.test(navigator.userAgent)

//=> 判断多站点
export const isSite = location.hostname
	.split('.')
	.map(x => x.toUpperCase())
	.filter(x => ['LF112', 'FUTIWOLF', 'LOCALHOST'].includes(x))

//=> 站点选择
export const isFutiSite = isSite[0] === 'FUTIWOLF' ? true : false

/**
 * 随机打乱数组
 * @param  Array
 * @return []
 */
export const Rand = (arr: any[]): any => {
	const result = []
	let arrI = arr
	for (let i = 0; i < arr.length; i++) {
		let ran = Math.floor(Math.random() * arrI.length),
			center = arrI[ran]
		result.push(arrI[ran])
		arrI[ran] = arrI[arrI.length - 1]
		arrI[arrI.length - 1] = center
		arrI = arrI.slice(0, arrI.length - 1)
	}
	return result
}
