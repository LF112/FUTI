/**
 * 工具类
 */

//=> 是否为蜘蛛
export const isBaiduSpider = /spider|bot/gi.test(navigator.userAgent)

//=> 是否为移动端
export const isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
