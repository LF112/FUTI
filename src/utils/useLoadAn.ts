/**
 * 载入时效果
 */

const fnGlobal = []
let fnIndex = 0

export const LoadAn = (callback: () => void) => {
	document.querySelectorAll('.An').forEach((v: HTMLElement) => {
		fnGlobal.push(() => {
			setTimeout(() => {
				const domAttr = v.getAttribute('data-futi-an')
				if (domAttr === 'FadeIn') {
					v.style.top = '0'
					setTimeout(() => (v.style.opacity = '1'), 250)
				} else if (domAttr === 'SideIn') {
					v.style.top = '0'
					v.style.width = '0'
					setTimeout(() => {
						v.style.opacity = '1'
						setTimeout(() => (v.style.width = '100%'), 1)
					}, 250)
				} else {
					v.style.opacity = '1'
					v.style.top = '0'
				}
				setTimeout(() => v.classList.remove('An'), 500)
				next(callback)
			}, 100)
		})
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
