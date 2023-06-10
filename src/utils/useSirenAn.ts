const RAND_ARR =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')

/**
 * siren animation
 * @author LF112
 * @url https://github.com/LF112/sirenTEXT
 */
let SlashIndex: number = 0
let CONTENT: string[] = []
let SlashCount: number = 0
let doneCount: number = 0
let Done: boolean = false
export const SiRen = (el: HTMLDivElement, text: string) => {
	el.innerHTML = ''
	SlashAn(el, text)
}

const SlashAn = (el: HTMLDivElement, text: string) => {
	el.innerHTML += '/'
	if (el.innerHTML.length < text.length) setTimeout(() => SlashAn(el, text), 5)
	else {
		CONTENT = el.innerHTML.split('')
		SlashIndex = el.innerHTML.length / 4

		setTimeout(() => LoadText(el, text.split('')), 100)
	}
}

const LoadText = (el: HTMLElement, RSP: string[]) => {
	doneCount = 0
	for (let i = 0; SlashCount > i; i++) {
		if (!Done)
			CONTENT[i] = RAND_ARR[Math.floor(Math.random() * RAND_ARR.length)]
		else if (doneCount < RSP.length) {
			CONTENT[i] = RSP[doneCount]
			doneCount++
		} else CONTENT[i] = ''
	}
	el.innerHTML = CONTENT.join('')
	if (SlashCount < SlashIndex) setTimeout(() => LoadText(el, RSP), 10)
	else if (!Done) {
		SlashCount = 0
		CONTENT = el.innerHTML.split('')
		SlashIndex = el.innerHTML.length

		setTimeout(() => LoadText(el, RSP), 20)
		Done = true
	}
	SlashCount++
}
