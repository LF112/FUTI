/**
 * 队列动画
 */

const fnGlobal = []
let fnIndex = 0

export const runAn = (anList: any[], reverse: boolean = false) => {
	anList.forEach(v => {
		const FUNC = () => {
			setTimeout(() => {
				if (v.fn !== undefined) v.fn()

				next()
			}, v.next)
		}

		if (!reverse) fnGlobal.push(FUNC)
		else fnGlobal.unshift(FUNC)
	})
	next()
}

//=> 队列执行
const next = () => {
	let fn = fnGlobal[fnIndex]
	fnIndex++
	if (typeof fn === 'function') fn()
}
