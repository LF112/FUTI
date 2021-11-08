/**
 * 工具类
 */

//=> 是否为百度蜘蛛
export const isBaiduSpider =
	navigator.userAgent.indexOf('Baiduspider') > -1 ? true : false
