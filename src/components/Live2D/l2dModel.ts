import 'whatwg-fetch'

import { CubismLogFn } from './live2dManager'
//[utils]

import { CubismDefaultParameterId } from 'libs/live2dFramework/src/cubismdefaultparameterid'
import { ICubismModelSetting } from 'libs/live2dFramework/src/icubismmodelsetting'
import { CubismIdHandle } from 'libs/live2dFramework/src/id/cubismid'
import { CubismFramework } from 'libs/live2dFramework/src/live2dcubismframework'
import { CubismUserModel } from 'libs/live2dFramework/src/model/cubismusermodel'
import { csmMap } from 'libs/live2dFramework/src/type/csmmap'
import { csmRect } from 'libs/live2dFramework/src/type/csmrectf'
import { csmVector } from 'libs/live2dFramework/src/type/csmvector'
import {
	ACubismMotion,
	FinishedMotionCallback
} from 'libs/live2dFramework/src/motion/acubismmotion'
import {
	BreathParameterData,
	CubismBreath
} from 'libs/live2dFramework/src/effect/cubismbreath'
import {
	CubismMotionQueueEntryHandle,
	InvalidMotionQueueEntryHandleValue
} from 'libs/live2dFramework/src/motion/cubismmotionqueuemanager'
import { CubismModelSettingJson } from 'libs/live2dFramework/src/cubismmodelsettingjson'
import { CubismEyeBlink } from 'libs/live2dFramework/src/effect/cubismeyeblink'
import { CubismMotion } from 'libs/live2dFramework/src/motion/cubismmotion'
import { csmString } from 'libs/live2dFramework/src/type/csmstring'
import { CubismMatrix44 } from 'libs/live2dFramework/src/math/cubismmatrix44'
import { CubismLogInfo } from 'libs/live2dFramework/src/utils/cubismdebug'
//[ libs ]

/**
 * Live2d 模型处理
 * * 基于官方实例算法移植 *
 * ! 注释仅供参考，以官方为主 !
 * @editor LF112
 * @author Live2D Inc.
 */
enum LoadStep {
	LoadAssets,
	LoadModel,
	WaitLoadModel,
	LoadExpression,
	WaitLoadExpression,
	LoadPhysics,
	WaitLoadPhysics,
	LoadPose,
	WaitLoadPose,
	SetupEyeBlink,
	SetupBreath,
	LoadUserData,
	WaitLoadUserData,
	SetupEyeBlinkIds,
	SetupLipSyncIds,
	SetupLayout,
	LoadMotion,
	WaitLoadMotion,
	CompleteInitialize,
	CompleteSetupModel,
	LoadTexture,
	WaitLoadTexture,
	CompleteSetup
}

export class l2dModel extends CubismUserModel {
	//=> 构造函数
	public constructor() {
		super()

		this._modelSetting = null
		this._modelHomeDir = null
		this._userTimeSeconds = 0.0

		this._eyeBlinkIds = new csmVector<CubismIdHandle>()
		this._lipSyncIds = new csmVector<CubismIdHandle>()

		this._motions = new csmMap<string, ACubismMotion>()
		this._expressions = new csmMap<string, ACubismMotion>()

		this._hitArea = new csmVector<csmRect>()
		this._userArea = new csmVector<csmRect>()

		this._idParamAngleX = CubismFramework.getIdManager().getId(
			CubismDefaultParameterId.ParamAngleX
		)
		this._idParamAngleY = CubismFramework.getIdManager().getId(
			CubismDefaultParameterId.ParamAngleY
		)
		this._idParamAngleZ = CubismFramework.getIdManager().getId(
			CubismDefaultParameterId.ParamAngleZ
		)
		this._idParamEyeBallX = CubismFramework.getIdManager().getId(
			CubismDefaultParameterId.ParamEyeBallX
		)
		this._idParamEyeBallY = CubismFramework.getIdManager().getId(
			CubismDefaultParameterId.ParamEyeBallY
		)
		this._idParamBodyAngleX = CubismFramework.getIdManager().getId(
			CubismDefaultParameterId.ParamBodyAngleX
		)

		this._state = LoadStep.LoadAssets
		this._expressionCount = 0
		this._textureCount = 0
		this._motionCount = 0
		this._allMotionCount = 0
		//this._wavFileHandler = new LAppWavFileHandler()
	}

	_modelSetting: ICubismModelSetting //=> 模型配置
	_modelHomeDir: string //=> 模型路径
	_userTimeSeconds: number //=> 过渡时间 (s)

	_eyeBlinkIds: csmVector<CubismIdHandle> //=> 眼部组件 ID 表
	_lipSyncIds: csmVector<CubismIdHandle> //=> 唇部组件 ID 表

	_motions: csmMap<string, ACubismMotion> //=> 运动参数
	_expressions: csmMap<string, ACubismMotion> //=> 面部参数

	_hitArea: csmVector<csmRect>
	_userArea: csmVector<csmRect>

	_idParamAngleX: CubismIdHandle //=> 参数 ID：Paramanglex
	_idParamAngleY: CubismIdHandle //=> 参数 ID: ParamAngleY
	_idParamAngleZ: CubismIdHandle //=> 参数 ID: ParamAngleZ
	_idParamEyeBallX: CubismIdHandle //=> 参数 ID: ParamEyeBallX
	_idParamEyeBallY: CubismIdHandle //=> 参数 ID: ParamEyeBAllY
	_idParamBodyAngleX: CubismIdHandle //=> 参数 ID: ParamBodyAngleX

	_state: number //=> 模型状态
	_expressionCount: number //=> 面部计数
	_textureCount: number //=> 纹理计数
	_motionCount: number //=> 运动数据计数
	_allMotionCount: number //=> 总运动数据计数
	//_wavFileHandler: LAppWavFileHandler //=> WAV文件处理 | '通过 wav 文件让模型动嘴'

	//------ Main >---
	/**
	 * 读取 model3.json 中模型数据
	 *  @param dir
	 *  @param fileName
	 */
	public loadAssets(dir: string, fileName: string): void {
		this._modelHomeDir = dir

		//=> Fetch 下载模型 (arrayBuffer)
		fetch(`${this._modelHomeDir}${fileName}`)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => {
				//=> 模型配置预处理
				const setting: ICubismModelSetting = new CubismModelSettingJson(
					arrayBuffer,
					arrayBuffer.byteLength
				)

				//=> 更新状态
				this._state = LoadStep.LoadModel

				//=> 载入模型 (MAIN)
				this.setupModel(setting)
			})
	}

	/**
	 * 生成 Live2D 模型 (MAIN)
	 * @param setting ICubismModelSetting 实例
	 */
	private setupModel(setting: ICubismModelSetting): void {
		this._updating = true
		this._initialized = false

		this._modelSetting = setting

		//=> MAIN
		//=> Cubism 事件
		//-----------------------------------------------------
		/**
		 * 载入模型 (文件)
		 */
		if (this._modelSetting.getModelFileName() != '') {
			// 从模型配置中获取模型文件名
			const modelFileName = this._modelSetting.getModelFileName()

			//=> Fetch 下载模型 (arrayBuffer)
			fetch(`${this._modelHomeDir}${modelFileName}`)
				.then(response => response.arrayBuffer())
				.then(arrayBuffer => {
					//=> MAIN
					//=> 载入模型
					this.loadModel(arrayBuffer)
					this._state = LoadStep.LoadExpression
					CubismLogFn('[1/11] 模型数据装载成功！')

					// 1 | 载入面部数据
					loadCubismExpression()
				})

			this._state = LoadStep.WaitLoadModel
		} else CubismLogFn('[1/11] 模型数据不存在!')

		/**
		 * 载入模型面部数据 (表情)
		 */
		const loadCubismExpression = (): void => {
			//=> 检测面部数据数量
			if (this._modelSetting.getExpressionCount() > 0) {
				// 获取面部数据计数
				const count: number = this._modelSetting.getExpressionCount()

				for (let i = 0; i < count; i++) {
					//=> Expression Main
					// 获取面部数据名 / 文件名
					const expressionName = this._modelSetting.getExpressionName(i)
					const expressionFileName = this._modelSetting.getExpressionFileName(i)

					//=> Fetch 下载面部数据文件 (arrayBuffer)
					fetch(`${this._modelHomeDir}${expressionFileName}`)
						.then(response => response.arrayBuffer())
						.then(arrayBuffer => {
							//=> 调用 Cubism Core 载入面部数据
							const motion: ACubismMotion = this.loadExpression(
								arrayBuffer,
								arrayBuffer.byteLength,
								expressionName
							)

							// 移除无法检索的面部数据 ID
							if (this._expressions.getValue(expressionName) != null) {
								ACubismMotion.delete(this._expressions.getValue(expressionName))
								this._expressions.setValue(expressionName, null)
							}

							//=> LOAD
							this._expressions.setValue(expressionName, motion)

							this._expressionCount++

							if (this._expressionCount >= count) {
								this._state = LoadStep.LoadPhysics
								CubismLogFn('[2/11] 面部数据载入成功！')

								// 2 | 载入模型物理运动
								loadCubismPhysics()
							}
						})
				}
				this._state = LoadStep.WaitLoadExpression
			} else {
				//=> 面部数据不存在时
				this._state = LoadStep.LoadPhysics
				CubismLogFn('[2/11] 面部数据文件不存在！')

				// 2 | 载入模型物理运动
				loadCubismPhysics()
			}
		}

		/**
		 * 载入模型物理运动效果
		 */
		const loadCubismPhysics = (): void => {
			//=> 检测物理运动文件是否存在
			if (this._modelSetting.getPhysicsFileName() != '') {
				// 获取物理运动文件名
				const physicsFileName = this._modelSetting.getPhysicsFileName()

				//=> Fetch 下载模型运动文件 (arrayBuffer)
				fetch(`${this._modelHomeDir}${physicsFileName}`)
					.then(response => response.arrayBuffer())
					.then(arrayBuffer => {
						//=> 调用 Cubism Core 载入物理运动
						this.loadPhysics(arrayBuffer, arrayBuffer.byteLength)

						this._state = LoadStep.LoadPose
						CubismLogFn('[3/11] 物理运动载入成功！')

						// 2 | 载入模型姿势
						loadCubismPose()
					})
				this._state = LoadStep.WaitLoadPhysics
			} else {
				//=> 無物理运动时
				this._state = LoadStep.LoadPose
				CubismLogFn('[3/11] 物理运动文件不存在！')

				// 2 | 载入模型姿势
				loadCubismPose()
			}
		}

		/**
		 * 载入模型姿势
		 */
		const loadCubismPose = (): void => {
			//=> 判断模型姿势文件是否存在
			if (this._modelSetting.getPoseFileName() != '') {
				// 获取模型姿势文件名
				const poseFileName = this._modelSetting.getPoseFileName()

				//=> Fetch 下载模型运动文件 (arrayBuffer)
				fetch(`${this._modelHomeDir}${poseFileName}`)
					.then(response => response.arrayBuffer())
					.then(arrayBuffer => {
						//=> 调用 Cubism Core 载入模型姿势
						this.loadPose(arrayBuffer, arrayBuffer.byteLength)

						this._state = LoadStep.SetupEyeBlink
						CubismLogFn('[4/11] 模型姿势载入成功！')

						// 3 | 载入模型眼部
						setupEyeBlink()
					})
				this._state = LoadStep.WaitLoadPose
			} else {
				this._state = LoadStep.SetupEyeBlink
				CubismLogFn('[4/11] 模型姿势文件不存在！')

				// 3 | 载入模型眼部
				setupEyeBlink()
			}
		}

		/**
		 * 载入模型眼部
		 */
		const setupEyeBlink = (): void => {
			//=> 判断眼部数据是否存在
			if (this._modelSetting.getEyeBlinkParameterCount() > 0) {
				//=> 调用 Cubism Core CubismEyeBlink 方法创建眼部
				this._eyeBlink = CubismEyeBlink.create(this._modelSetting)
				CubismLogFn('[5/11] 模型眼部数据载入成功！')
				//=> 载入模型呼吸效果
				this._state = LoadStep.SetupBreath
			} else CubismLogFn('[5/11] 模型眼部数据不存在！')

			// 4 | 载入模型呼吸效果
			setupBreath()
		}

		/**
		 * 载入模型呼吸效果 (非配置，代码内置)
		 */
		const setupBreath = (): void => {
			//=> 创建呼吸效果
			this._breath = CubismBreath.create()

			//=> 增加循环动作
			const breathParameters: csmVector<BreathParameterData> = new csmVector()
			breathParameters.pushBack(
				new BreathParameterData(this._idParamAngleX, 0.0, 15.0, 6.5345, 0.5)
			)
			breathParameters.pushBack(
				new BreathParameterData(this._idParamAngleY, 0.0, 8.0, 3.5345, 0.5)
			)
			breathParameters.pushBack(
				new BreathParameterData(this._idParamAngleZ, 0.0, 10.0, 5.5345, 0.5)
			)
			breathParameters.pushBack(
				new BreathParameterData(this._idParamBodyAngleX, 0.0, 4.0, 15.5345, 0.5)
			)
			breathParameters.pushBack(
				new BreathParameterData(
					CubismFramework.getIdManager().getId(
						CubismDefaultParameterId.ParamBreath
					),
					0.0,
					0.5,
					3.2345,
					0.5
				)
			)

			//=> START
			this._breath.setParameters(breathParameters)
			CubismLogFn('[6/11] 模型呼吸载入成功！')

			// 5 | 载入自定义配置
			this._state = LoadStep.LoadUserData
			loadUserData()
		}

		/**
		 * 载入自定义配置
		 */
		const loadUserData = (): void => {
			//=> 判断自定义配置是否存在
			if (this._modelSetting.getUserDataFile() != '') {
				// 获取自定义配置文件名
				const userDataFile = this._modelSetting.getUserDataFile()

				//=> Fetch 下载自定义配置文件 (arrayBuffer)
				fetch(`${this._modelHomeDir}${userDataFile}`)
					.then(response => response.arrayBuffer())
					.then(arrayBuffer => {
						//=> 调用 Cubism Core 载入自定义配置
						this.loadUserData(arrayBuffer, arrayBuffer.byteLength)
						CubismLogFn('[7/11] 自定义配置载入成功！')

						this._state = LoadStep.SetupEyeBlinkIds

						// 6 | 创建并绑定眼部 ID
						setupEyeBlinkIds()
					})

				this._state = LoadStep.WaitLoadUserData
			} else {
				this._state = LoadStep.SetupEyeBlinkIds
				CubismLogFn('[7/11] 自定义配置文件不存在！')

				// 6 | 创建并绑定眼部 ID
				setupEyeBlinkIds()
			}
		}

		/**
		 * 创建并绑定眼部 ID
		 */
		const setupEyeBlinkIds = (): void => {
			// 获取眼部 ID 列表
			const eyeBlinkIdCount: number =
				this._modelSetting.getEyeBlinkParameterCount()

			for (let i = 0; i < eyeBlinkIdCount; ++i) {
				//=> 绑定 ID
				this._eyeBlinkIds.pushBack(this._modelSetting.getEyeBlinkParameterId(i))
			}
			CubismLogFn('[7/11] 眼部 ID 绑定完成！')
		}
	}
	//---< Main ------
}
