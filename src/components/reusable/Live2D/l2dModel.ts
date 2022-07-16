import 'whatwg-fetch'
//[ package ]

import { TextureInfo, TextureManager } from './l2dTextureManager'
import { CubismLogFn } from './live2dManager'
//[utils]

import { CubismDefaultParameterId } from 'lib/live2dFramework/src/cubismdefaultparameterid'
import { ICubismModelSetting } from 'lib/live2dFramework/src/icubismmodelsetting'
import { CubismIdHandle } from 'lib/live2dFramework/src/id/cubismid'
import { CubismFramework } from 'lib/live2dFramework/src/live2dcubismframework'
import { CubismUserModel } from 'lib/live2dFramework/src/model/cubismusermodel'
import { csmMap } from 'lib/live2dFramework/src/type/csmmap'
import { csmRect } from 'lib/live2dFramework/src/type/csmrectf'
import { csmVector } from 'lib/live2dFramework/src/type/csmvector'
import {
	ACubismMotion,
	FinishedMotionCallback
} from 'lib/live2dFramework/src/motion/acubismmotion'
import {
	BreathParameterData,
	CubismBreath
} from 'lib/live2dFramework/src/effect/cubismbreath'
import {
	CubismMotionQueueEntryHandle,
	InvalidMotionQueueEntryHandleValue
} from 'lib/live2dFramework/src/motion/cubismmotionqueuemanager'
import { CubismModelSettingJson } from 'lib/live2dFramework/src/cubismmodelsettingjson'
import { CubismEyeBlink } from 'lib/live2dFramework/src/effect/cubismeyeblink'
import { CubismMotion } from 'lib/live2dFramework/src/motion/cubismmotion'
import { CubismMatrix44 } from 'lib/live2dFramework/src/math/cubismmatrix44'
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
		this._textureManager = new TextureManager()
		this._gl = null
		this._successLoading = null
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
	_textureManager: TextureManager

	_gl: any
	_successLoading: () => void

	//------ Main >---
	/**
	 * 读取 model3.json 中模型数据
	 *  @param dir
	 *  @param fileName
	 */
	public loadAssets(
		gl: any,
		dir: string,
		fileName: string,
		callback: () => void
	): void {
		this._modelHomeDir = dir
		this._gl = gl[0]
		this._successLoading = callback

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
			CubismLogFn('[8/11] 眼部 ID 绑定完成！')

			// 7 | 创建并绑定唇部 ID
			this._state = LoadStep.SetupLipSyncIds
			setupLipSyncIds()
		}

		/**
		 * 创建并绑定唇部 ID
		 */
		const setupLipSyncIds = (): void => {
			// 获取唇部 ID 表
			const lipSyncIdCount = this._modelSetting.getLipSyncParameterCount()

			for (let i = 0; i < lipSyncIdCount; ++i) {
				//=> 绑定 ID
				this._lipSyncIds.pushBack(this._modelSetting.getLipSyncParameterId(i))
			}
			CubismLogFn('[9/11] 唇部 ID 绑定完成！')

			// 8 | 创建模型布局
			this._state = LoadStep.SetupLayout
			setupLayout()
		}

		/**
		 * 创建模型布局
		 */
		const setupLayout = (): void => {
			//=> 创建 csmMap
			const layout: csmMap<string, number> = new csmMap<string, number>()
			this._modelSetting.getLayoutMap(layout)
			this._modelMatrix.setupFromLayout(layout)
			CubismLogFn('[10/11] 模型布局创建完成！')

			// 9 | 加载模型动画
			this._state = LoadStep.LoadMotion
			loadCubismMotion()
		}

		/**
		 * 加载模型动画
		 */
		const loadCubismMotion = (): void => {
			this._state = LoadStep.WaitLoadMotion
			this._model.saveParameters()
			this._allMotionCount = 0
			this._motionCount = 0
			const group: string[] = []

			//=> 获取模型运动组计数
			const motionGroupCount: number = this._modelSetting.getMotionGroupCount()

			//=> 根据运动组创建全部运动组
			for (let i = 0; i < motionGroupCount; i++) {
				group[i] = this._modelSetting.getMotionGroupName(i)
				this._allMotionCount += this._modelSetting.getMotionCount(group[i])
			}

			//=> 模型运动装载
			for (let i = 0; i < motionGroupCount; i++)
				this.preLoadMotionGroup(group[i]) //=> 调用装载方法

			//=> 没有运动组时
			if (motionGroupCount == 0) {
				this._state = LoadStep.LoadTexture

				//=> 停止所有动作
				this._motionManager.stopAllMotions()

				this._updating = false
				this._initialized = true

				//=> 绘制模型
				this.createRenderer()
				this.setupTextures()
				this.getRenderer().startUp(this._gl)
			}
		}
		// END !
	}

	/**
	 * 载入模型动画
	 *
	 * @param group 动作组 Array<string>
	 */
	public preLoadMotionGroup(group: string): void {
		for (let i = 0; i < this._modelSetting.getMotionCount(group); i++) {
			//=> 获取运动文件名
			const motionFileName = this._modelSetting.getMotionFileName(group, i)

			const name = `${group}_${i}`
			CubismLogFn(`加载运动: ${motionFileName} => [${name}]`)

			//=> Fetch 下载运动文件 (arrayBuffer)
			fetch(`${this._modelHomeDir}${motionFileName}`)
				.then(response => response.arrayBuffer())
				.then(arrayBuffer => {
					//=> 调用 Cubism Core 加载运动
					const tmpMotion: CubismMotion = this.loadMotion(
						arrayBuffer,
						arrayBuffer.byteLength,
						name
					)

					//=> 渐入
					let fadeTime = this._modelSetting.getMotionFadeInTimeValue(group, i)
					if (fadeTime >= 0.0) tmpMotion.setFadeInTime(fadeTime)

					//=> 渐出
					fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, i)
					if (fadeTime >= 0.0) tmpMotion.setFadeOutTime(fadeTime)

					//=> 绑定效果器
					tmpMotion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds)

					//=> 移除无效的动作
					if (this._motions.getValue(name) != null)
						ACubismMotion.delete(this._motions.getValue(name))

					//=> 绑定运动
					this._motions.setValue(name, tmpMotion)

					this._motionCount++
					if (this._motionCount >= this._allMotionCount) {
						//=> 运动载入完成！
						CubismLogFn('[11/11] 运动载入完成！')

						this._state = LoadStep.LoadTexture

						//=> 停止所有动作
						this._motionManager.stopAllMotions()

						this._updating = false
						this._initialized = true

						//=> 绘制模型
						this.createRenderer()
						this.setupTextures()
						this.getRenderer().startUp(this._gl)
					}
				})
		}
	}

	/**
	 * 绘制纹理
	 */
	private setupTextures(): void {
		// 使用 Premultipliedalpha，以提高 iPhone中的 Alpha通道渲染质量
		const usePremultiply = true

		if (this._state == LoadStep.LoadTexture) {
			//=> 获取纹理数量
			const textureCount: number = this._modelSetting.getTextureCount()

			for (
				let modelTextureNumber = 0;
				modelTextureNumber < textureCount;
				modelTextureNumber++
			) {
				//=> 跳过文件名为空的纹理文件
				if (this._modelSetting.getTextureFileName(modelTextureNumber) == '')
					continue

				//=> 在 WebGl 上载入纹理
				let texturePath =
					this._modelSetting.getTextureFileName(modelTextureNumber)
				texturePath = this._modelHomeDir + texturePath

				//=> 加载完成时调用回调函数
				const onLoad = (textureInfo: TextureInfo): void => {
					this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id)

					this._textureCount++

					if (this._textureCount >= textureCount) {
						this._state = LoadStep.CompleteSetup
						CubismLogFn('纹理载入成功！')
						this._successLoading()
					}
				}

				//=> 调用绘制方法
				this._textureManager.createTextureFromPngFile(
					this._gl,
					texturePath,
					usePremultiply,
					onLoad
				)

				this.getRenderer().setIsPremultipliedAlpha(usePremultiply)
			}

			this._state = LoadStep.WaitLoadTexture
		}
	}
	//---< Main ------

	/**
	 * 在 Canvas 上绘制
	 */
	public draw(matrix: CubismMatrix44, frameBuffer: any, canvas: any): void {
		//=> 仅模型存在时
		if (this._model == null) return

		//=> 一切就绪时
		if (this._state == LoadStep.CompleteSetup) {
			matrix.multiplyByMatrix(this._modelMatrix)

			this.getRenderer().setMvpMatrix(matrix)

			this.doDraw(frameBuffer, canvas)
		}
	}

	/**
	 * 绘制图形
	 * 通过空间的视图投影矩阵以绘制模型
	 */
	public doDraw(frameBuffer: any, canvas: any): void {
		if (this._model == null) return

		//=> Canvas 尺寸
		const viewport: number[] = [0, -320, canvas.width, canvas.height]

		this.getRenderer().setRenderState(frameBuffer, viewport)
		this.getRenderer().drawModel()
	}

	/**
	 * 更新渲染
	 */
	public update(): void {
		if (this._state != LoadStep.CompleteSetup) return

		this._dragX = this._dragManager.getX()
		this._dragY = this._dragManager.getY()

		//=> 帧
		const deltaTimeSeconds: number = l2dModel.getDeltaTime()
		this._userTimeSeconds += deltaTimeSeconds

		this._dragManager.update(deltaTimeSeconds)
		//======

		//=> 运动更新锁
		let motionUpdated = false

		//--------------------------------------------------------------------------
		//=> 加载最后保存的状态
		this._model.loadParameters()
		//=> 运动准备完成时
		if (this._motionManager.isFinished()) this.startRandomMotion('Idle', 1)
		// 没有运动时，从运动组中随机播放
		else
			motionUpdated = this._motionManager.updateMotion(
				this._model,
				deltaTimeSeconds
			) // Update motion
		//=> 保存状态
		this._model.saveParameters()
		//--------------------------------------------------------------------------

		//=> 更新眼部运动
		if (!motionUpdated)
			if (this._eyeBlink != null)
				this._eyeBlink.updateParameters(this._model, deltaTimeSeconds)

		//=> 更新表情
		if (this._expressionManager != null)
			this._expressionManager.updateMotion(this._model, deltaTimeSeconds)

		//=> 拖动事件
		// 通过拖动调整面部方向
		this._model.addParameterValueById(this._idParamAngleX, this._dragX * 30) // -30 / 30
		this._model.addParameterValueById(this._idParamAngleY, this._dragY * 30)
		this._model.addParameterValueById(
			this._idParamAngleZ,
			this._dragX * this._dragY * -30
		)

		// 通过拖动调整身体方向
		this._model.addParameterValueById(this._idParamBodyAngleX, this._dragX * 10) // -10 / 10
		// ↑ 以上仅有完整面部变形器才有效果 ↑

		// 通过拖动调整眼睛方向
		this._model.addParameterValueById(this._idParamEyeBallX, this._dragX) // -1 / 1
		this._model.addParameterValueById(this._idParamEyeBallY, this._dragY)

		//=> 呼吸运动
		if (this._breath != null)
			this._breath.updateParameters(this._model, deltaTimeSeconds)

		//=> 物理运动
		if (this._physics != null)
			this._physics.evaluate(this._model, deltaTimeSeconds)

		//=> 唇部运动
		// if (this._lipsync) {
		// 	let value = 0.0

		// 	this._wavFileHandler.update(deltaTimeSeconds)
		// 	value = this._wavFileHandler.getRms()

		// 	for (let i = 0; i < this._lipSyncIds.getSize(); ++i)
		// 		this._model.addParameterValueById(this._lipSyncIds.at(i), value, 0.8)
		// }

		//=> 姿势
		if (this._pose != null)
			this._pose.updateParameters(this._model, deltaTimeSeconds)

		this._model.update()
	}

	/**
	 * 播放随机运动
	 * @param group 运动组
	 * @param priority 优先级
	 * @param onFinishedMotionHandler 完成时的回调
	 * @return 返回开始动作的标识，用于确定各个动作是否已执行完成，无法执行时为 [-1]
	 */
	public startRandomMotion(
		group: string,
		priority: number,
		onFinishedMotionHandler?: FinishedMotionCallback
	): CubismMotionQueueEntryHandle {
		//=> 运动组不存在时
		if (this._modelSetting.getMotionCount(group) == 0)
			return InvalidMotionQueueEntryHandleValue

		//=> 根据已有的运动数量创建随机运动 ID
		const no: number = Math.floor(
			Math.random() * this._modelSetting.getMotionCount(group)
		)

		return this.startMotion(group, no, priority, onFinishedMotionHandler)
	}

	/**
	 * 播放指定的运动
	 * @param group 运动组
	 * @param no 运动 ID
	 * @param priority 优先级
	 * @param onFinishedMotionHandler 运动播放结束回调
	 * @return 返回开始动作的标识，用于确定各个动作是否已执行完成，无法执行时为 [-1]
	 */
	public startMotion(
		group: string,
		no: number,
		priority: number,
		onFinishedMotionHandler?: FinishedMotionCallback
	): CubismMotionQueueEntryHandle {
		//=> 运动优先级 def: 3
		if (priority == 3) this._motionManager.setReservePriority(priority)
		else if (!this._motionManager.reserveMotion(priority))
			return InvalidMotionQueueEntryHandleValue

		//=> 获取运动文件名
		const motionFileName = this._modelSetting.getMotionFileName(group, no)

		// ex => idle_0
		const name = `${group}_${no}`
		let motion: CubismMotion = this._motions.getValue(name) as CubismMotion
		let autoDelete = false

		if (motion == null) {
			//=> Fetch 下载运动数据文件 (arrayBuffer)
			fetch(`${this._modelHomeDir}${motionFileName}`)
				.then(response => response.arrayBuffer())
				.then(arrayBuffer => {
					//=> 调用 Cubism Core 加载运动
					motion = this.loadMotion(
						arrayBuffer,
						arrayBuffer.byteLength,
						null,
						onFinishedMotionHandler
					)

					//=> 过渡动画
					// 渐入
					let fadeTime: number = this._modelSetting.getMotionFadeInTimeValue(
						group,
						no
					)
					if (fadeTime >= 0.0) motion.setFadeInTime(fadeTime)

					// 渐出
					fadeTime = this._modelSetting.getMotionFadeOutTimeValue(group, no)
					if (fadeTime >= 0.0) motion.setFadeOutTime(fadeTime)

					//=> 绑定效果器 ID
					motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds)
					autoDelete = true
				})
		} else motion.setFinishedMotionHandler(onFinishedMotionHandler)

		//voice
		// const voice = this._modelSetting.getMotionSoundFileName(group, no)
		// if (voice.localeCompare('') != 0) {
		// 	let path = voice
		// 	path = this._modelHomeDir + path
		// 	this._wavFileHandler.start(path)
		// }

		return this._motionManager.startMotionPriority(motion, autoDelete, priority)
	}

	/**
	 * 获得 Delta 时间（与上一帧的差异）
	 * @return ms
	 */
	public static getDeltaTime(): number {
		return this.s_deltaTime
	}

	public static updateTime(): void {
		this.s_currentFrame = Date.now()
		this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000
		this.s_lastFrame = this.s_currentFrame
	}

	static lastUpdate = Date.now()

	static s_currentFrame = 0.0
	static s_lastFrame = 0.0
	static s_deltaTime = 0.0
}
