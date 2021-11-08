/**
 * 工具类
 */

//=> 是否为百度蜘蛛
export const isBaiduSpider =
	navigator.userAgent.indexOf('Baiduspider') > -1 ? true : false

//=> 是否为移动端
export const isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
