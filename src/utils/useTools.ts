/**
 * 工具类
 */

//=> 是否为蜘蛛
export const isBaiduSpider = /spider|bot/gi.test(navigator.userAgent)

//=> 是否为移动端
export const isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)

//=> 判断站点
export const isSite = location.hostname
	.split('.')
	.map(x => x.toUpperCase())
	.filter(x => ['LF112', 'FUTIWOLF', 'LOCALHOST'].includes(x))

//=> 站点选择
export const isFutiSite = isSite[0] === 'FUTIWOLF' ? true : false
