// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require('tencentcloud-sdk-nodejs')
const chalk = require('chalk')

const isPrefix =
	chalk.blue('[') +
	chalk.white.underline.bold(process.env.npm_package_name) +
	chalk.blue(']=> ')

console.log(
	chalk.blue(
		' _   _                 _        ' +
			'\n' +
			'| | | | __ _ ___ _   _| | _____ ' +
			'\n' +
			'| |_| |/ _` / __| | | | |/ / _ \\' +
			'\n' +
			'|  _  | (_| \\__ \\ |_| |   <  __/' +
			'\n' +
			'|_| |_|\\__,_|___/\\__,_|_|\\_\\___|' +
			'\n'
	) +
		chalk.yellow('----------------> ') +
		chalk.red('App start operation.')
)

const CdnClient = tencentcloud.cdn.v20180606.Client

// 配置
const args = process.argv.slice(2)
const encI = {}
args.forEach(el => {
	encI[el.split('=')[0].toLowerCase()] = el.split('=')[1]
})

const client = new CdnClient({
	credential: {
		secretId: encI.secretid,
		secretKey: encI.secretkey
	},
	region: '',
	profile: {
		httpProfile: {
			endpoint: 'cdn.tencentcloudapi.com'
		}
	}
})

// 刷新 URL 预热
console.log(isPrefix + chalk.cyan('正在刷新 URL 预热'))
client
	.PurgeUrlsCache({
		Urls: [
			'https://www.lf112.net/',
			'https://lf112.net/',
			'https://www.futiwolf.com/',
			'https://futiwolf.com/'
		]
	})
	.then(
		data => {
			console.log(data)
			console.log(isPrefix + chalk.green('Success! √'))
		},
		err => {
			console.error('error', err)
			console.log(isPrefix + chalk.red('预热刷新失败 ×'))
		}
	)

// 刷新 目录 预热
console.log(isPrefix + chalk.cyan('正在刷新 目录 预热'))
client
	.PurgePathCache({
		Paths: [
			'https://www.futiwolf.com/',
			'https://futiwolf.com/',
			'https://www.lf112.net/',
			'https://lf112.net/'
		],
		FlushType: 'delete'
	})
	.then(
		data => {
			console.log(data)
			console.log(isPrefix + chalk.green('Success! √'))
		},
		err => {
			console.error('error', err)
			console.log(isPrefix + chalk.red('预热刷新失败 ×'))
		}
	)
