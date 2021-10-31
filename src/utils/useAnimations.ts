/**
 * 动画处理方法
 */

export const numberGrow = (count: number, update: (n: number) => void) => {
	let step = 1
	let current = 0
	let start = 0

	let t = setInterval(() => {
		start += step
		if (start >= count) {
			clearInterval(t)
			start = count
			t = null
		}
		if (current === start) return
		current = start
		window.requestAnimationFrame(() => update(current))
	}, 10)
}

export const Rand = (arr: any[]): any => {
	let result = [],
		arrI = arr
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
