import fastdom from 'fastdom'
/**
 * 载入时效果
 */

const fnGlobal = []
let fnIndex = 0

export const LoadAn = (callback: () => void) => {
	document.querySelectorAll('.An').forEach((v: HTMLElement) => {
		fnGlobal.push(() => {
			setTimeout(() => {
				fastdom.measure(() => {
					const domAttr = v.getAttribute('data-futi-an')
					if (domAttr === 'FadeIn')
						fastdom.mutate(() => {
							v.style.top = '0'
							setTimeout(() => (v.style.opacity = '1'), 250)
						})
					else if (domAttr === 'SideIn')
						fastdom.mutate(() => {
							v.style.top = '0'
							v.style.width = '0'
							setTimeout(() => {
								v.style.opacity = '1'
								setTimeout(() => (v.style.width = '100%'), 1)
							}, 250)
						})
					else if (domAttr === 'Zoom')
						fastdom.mutate(() => {
							v.style.top = '0'
							v.style.transform = 'scale(0.65)'
							setTimeout(() => {
								fastdom.mutate(() => {})
								v.style.opacity = '1'
								setTimeout(() => (v.style.transform = 'scale(1)'), 1)
							}, 250)
						})
					else
						fastdom.mutate(() => {
							v.style.opacity = '1'
							v.style.top = '0'
						})

					setTimeout(() => v.classList.remove('An'), 500)
					next(callback)
				})
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
