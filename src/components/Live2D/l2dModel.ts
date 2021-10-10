import 'whatwg-fetch'

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
	_expressions: csmMap<string, ACubismMotion> //=> 表情参数

	_hitArea: csmVector<csmRect>
	_userArea: csmVector<csmRect>

	_idParamAngleX: CubismIdHandle //=> 参数 ID：Paramanglex
	_idParamAngleY: CubismIdHandle //=> 参数 ID: ParamAngleY
	_idParamAngleZ: CubismIdHandle //=> 参数 ID: ParamAngleZ
	_idParamEyeBallX: CubismIdHandle //=> 参数 ID: ParamEyeBallX
	_idParamEyeBallY: CubismIdHandle //=> 参数 ID: ParamEyeBAllY
	_idParamBodyAngleX: CubismIdHandle //=> 参数 ID: ParamBodyAngleX

	_state: number //=> 模型状态
	_expressionCount: number //=> 表情计数
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
				//this.setupModel(setting)
			})
	}
	//---< Main ------
}
