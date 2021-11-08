const fs = require('fs')
const minify = require('html-minifier').minify

//=> Main
// 读取 html
const read = fs.createReadStream('./dist/index.html')

read.setEncoding('utf-8')
read.resume()

read.on('data', data => {
	let result = minify(data, {
		removeAttributeQuotes: true,
		sortAttributes: true,
		sortClassName: true,
		useShortDoctype: true,
		decodeEntities: true,
		preventAttributesEscaping: true,
		collapseWhitespace: true,
		conservativeCollapse: true
	})
	result = result.replace(
		'<html lang=en>',
		'<html lang=en>' + CONFIG.copyright.top
	)
	result = result.replace('</html>', CONFIG.copyright.bottom + '</html>')
	console.log(result)
	const write = fs.createWriteStream('./dist/index.html')
	write.write(result)
})

//=> CONFIG
const CONFIG = {
	copyright: {
		top:
			'<!--' +
			'\n' +
			'+----------------------------------------------' +
			'\n' +
			'|  _     _____ _ _ ____    _   _ _____ _____' +
			'\n' +
			'| | |   |  ___/ / |___   |  | | ____|_   _|' +
			'\n' +
			'| | |   | |_  | | | __) | |  | |  _|   | |' +
			'\n' +
			'| | |___|  _| | | |/ __/ _| |  | |___  | |' +
			'\n' +
			'| |_____|_|   |_|_|_____(_)_| _|_____| |_|' +
			'\n' +
			'| Copy and paste constant defaulting.' +
			'\n' +
			'+----------------------------------------------' +
			'\n' +
			'| Made with love by LF112 [https://lf112.net]' +
			'\n' +
			'| Author: LF112' +
			'\n' +
			'| ⚡Email: lf@lf112.net / QQ: 2275203821' +
			'\n' +
			'| ⭐️GitHUB.com/LF112 | Twitter.com/LF_Futiwolf' +
			'\n' +
			'+----------------------------------------------' +
			'\n' +
			'-->',
		bottom: '<!-- Made with love by LF112. -->'
	}
}
