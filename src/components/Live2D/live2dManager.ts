import axios from 'axios'
//[ package ]

import { Live2DState } from 'state/live2d/slice'
//[ state ]

import { l2dModel } from './l2dModel'

import { CubismMatrix44 } from 'libs/live2dFramework/src/math/cubismmatrix44'
import { ACubismMotion } from 'libs/live2dFramework/src/motion/acubismmotion'
import { csmVector } from 'libs/live2dFramework/src/type/csmvector'
//[ libs ]

//=> 前置方法 ---------------------------------------
//=> 下载模型 | '预下载，重复的网络请求浏览器将自动叠加'
export const downloadModel = () => {
	return new Promise((resolve, reject) => {
		axios
			.all([
				axios.get('./live2d/futi.model3.json'),
				axios.get('./live2d/futi.motion3.json'),
				axios.get('./live2d/futi.moc3'),
				axios.get('./live2d/futi.physics3.json'),
				axios.get('./live2d/futi.2048/texture_00.png')
			])
			.then(
				res => {
					resolve(res[0].data as Live2DState)
				},
				err => reject(err)
			)
	})
}

//=> Live2DCubismCore 日志输出
export const CubismLogFn = (message: string): void => {
	console.log(`[FuTi-Live2D]${message}`)
}

//=> MAIN ----------------------------------------
export const _viewMatrix = new CubismMatrix44()
export const _models = new csmVector<l2dModel>()

//=> 装载模型
export const initModel = (dir: string, fileName: string) => {
	// 清理模型
	releaseModel()
	CubismLogFn('已清理模型')

	//=> MAIN 加载模型
	_models.pushBack(new l2dModel())
	_models.at(0).loadAssets(dir, fileName)
	// Coding more...
}

//=> 释放模型
export const releaseModel = () => {
	for (let i = 0; i < _models.getSize(); i++) {
		_models.at(i).release()
		_models.set(i, null)
	}

	_models.clear()
}
