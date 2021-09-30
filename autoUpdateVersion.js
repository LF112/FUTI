/*
Auto Update Version
xx.xx.xx-xxxxx
*/

const fs = require('fs')
const { exec } = require('child_process')

const command = (cmd, options, callback) => {
	console.log('\n')
	console.log(cmd.toString())
	return exec(cmd, { ...options }, callback)
}
const args = process.argv.slice(2)

fs.exists('./package.json', exists => {
	if (exists) {
		const { version: versionCurrent } = require('./package.json')

		const V1 = 25 // 0.0.x 最大值
		const V2 = 20 // 0.x.0 最大值

		console.log('\n', ` 正在自动更新版本号 (Version：${versionCurrent})`)
		let versionArr = versionCurrent.split('-')[0].split('.').map(Number)

		if (versionArr[2] == V1) {
			versionArr[2] = 0
			if (versionArr[1] == V2) {
				versionArr[1] = 1
				versionArr[0]++
			} else versionArr[1]++
		} else versionArr[2]++

		const versionNew = `${versionArr.join('.')}-${args[0].split('=')[1]}`

		if (versionNew !== versionCurrent) {
			// 更新 package.json version
			command(
				`npm --no-git-tag-version version ${versionNew}`,
				{},
				(error, stdout, stderr) => {
					if (!error) console.log(`版本号更新成功！Version: ${versionNew}`)
					else
						console.log(
							chalk.yellow(`\n 更新版本号（${versionNew}）失败了～\n`)
						) || process.exit(1)
				}
			)
		} else console.log(`\n 本次版本号未做修改，Version: ${versionNew} ！`)
	} else console.log(' 仓库不存在！')
})
