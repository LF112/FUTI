/**
 * 队列动画
 */

const fnGlobal = []
let fnIndex = 0

export const runAn = (
	anList: any[],
	callback: () => void,
	reverse: boolean = false
) => {
	anList.forEach(v => {
		const FUNC = () => {
			setTimeout(() => {
				if (v.fn !== undefined) v.fn()

				next(callback)
			}, v.next)
		}

		if (!reverse) fnGlobal.push(FUNC)
		else fnGlobal.unshift(FUNC)
	})
	next(callback)
}

//=> 队列执行
const next = (callback: () => void) => {
	let fn = fnGlobal[fnIndex]
	fnIndex++
	if (typeof fn === 'function') {
		if (fnIndex == fnGlobal.length) callback()
		fn()
	}
}
