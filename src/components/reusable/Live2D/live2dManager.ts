import { l2dModel } from './l2dModel'

import { CubismMatrix44 } from 'lib/live2dFramework/src/math/cubismmatrix44'
import { CubismViewMatrix } from 'lib/live2dFramework/src/math/cubismviewmatrix'
import { csmVector } from 'lib/live2dFramework/src/type/csmvector'
//[ libs ]

//=> 前置方法 ---------------------------------------

//=> Live2DCubismCore 日志输出
export const CubismLogFn = (message: string): void => {
	if (process.env.NODE_ENV === 'development')
		console.log(`[FuTi-Live2D]${message}`)
}

//=> MAIN ----------------------------------------
export const _viewMatrix = new CubismMatrix44()
export const _models = new csmVector<l2dModel>()

//=> 装载模型
/**
 * @param gl Live2D 必要的 webgl, 通过 WebGl2Canvas 获取
 * @param dir 模型路径
 * @param fileName 模型文件名
 * @param callback 模型装载完毕回调
 */
export const initModel = (
	gl: any,
	dir: string,
	fileName: string,
	callback: () => void
) => {
	// 清理模型
	releaseModel()
	CubismLogFn('已清理模型')

	//=> MAIN 加载模型
	_models.pushBack(new l2dModel())
	_models.at(0).loadAssets(gl, dir, fileName, callback)
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

//=> 渲染模型
export const renderModel = (WebGl2Canvas: any) => {
	//=> 绘制模型
	const gl = WebGl2Canvas[0]
	const programId = createShader(gl)
	const initViewMatrix = getInitViewMatrix(WebGl2Canvas[2])

	//=> Main
	const loop = (): void => {
		//=> 更新画布帧
		l2dModel.updateTime()

		// 穿透
		gl.enable(gl.BLEND)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

		// 更新 Canvas
		render(programId, gl, WebGl2Canvas[1], WebGl2Canvas[2], initViewMatrix)

		//=> 循环渲染 requestAnimationFrame
		requestAnimationFrame(loop)
	}
	loop()
}
//-----------------------------------------------------

//=> 更新视图
/**
 * @param _programId programId, 通过 createShader 方法创建
 * @param gl Live2D 必要的 webgl, 通过 WebGl2Canvas 方法获取
 * @param frameBuffer frameBuffer，↑
 * @param canvas WebGl2Canvas
 * @param _initViewMatrix 使用 getInitViewMatrix 方法创建
 */
export const render = (
	_programId: any,
	gl: any,
	frameBuffer: any,
	canvas: any,
	_initViewMatrix: any
) => {
	gl.useProgram(_programId)

	gl.flush()

	for (let i = 0; i < 16; i++)
		_viewMatrix.getArray()[i] = _initViewMatrix.getArray()[i]

	const { width, height } = canvas

	const projection: CubismMatrix44 = new CubismMatrix44()
	const modelCount: number = _models.getSize()

	for (let i = 0; i < modelCount; ++i) {
		const model: l2dModel = getModel(i)

		if (model.getModel()) {
			if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
				//=> 优化图形
				// 在垂直窗口中显示长型模型时，使用模型的横向尺寸计算尺寸
				model.getModelMatrix().setWidth(2.0)
				projection.scale(1.0, width / height)
			} else projection.scale(height / width, 1.0)

			if (_viewMatrix != null) projection.multiplyByMatrix(_viewMatrix)
		}

		model.update()
		//=> 绘制投影
		model.draw(projection, frameBuffer, canvas)
	}
}

/**
 * 获取模型对象
 * @param no 模型索引
 */
const getModel = (no: number): l2dModel => {
	if (no < _models.getSize()) return _models.at(no)

	return null
}

/**
 * 获取 Live2D 必要的 webgl 方法
 * @param canvas HTML Canvas Element
 * @param width Canvas 宽度
 * @param height Canvas 高度
 * @returns
 */
export const WebGl2Canvas = (canvas: any, width?: number, height?: number) => {
	const gl =
		canvas.getContext('webgl2') ||
		canvas.getContext('webgl') ||
		canvas.getContext('experimental-webgl')

	if (width && height) {
		canvas.width = width
		canvas.height = height
	}

	if (!gl) {
		CubismLogFn('浏览器不支持 webgl2/webgl ！')
		return false
	}

	const frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING)

	gl.enable(gl.BLEND)
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

	return [gl, frameBuffer, canvas]
}

/**
 * 创建着色器
 * @param gl Live2D 必要的 webgl, 通过 WebGl2Canvas 获取
 */
export const createShader = (gl: any): WebGLProgram => {
	// Bartex-Shader Compilation
	const vertexShaderId = gl.createShader(gl.VERTEX_SHADER)

	const vertexShader: string =
		'precision mediump float;' +
		'attribute vec3 position;' +
		'attribute vec2 uv;' +
		'varying vec2 vuv;' +
		'void main(void)' +
		'{' +
		'   gl_Position = vec4(position, 1.0);' +
		'   vuv = uv;' +
		'}'

	gl.shaderSource(vertexShaderId, vertexShader)
	gl.compileShader(vertexShaderId)

	// 片段着色器编译
	const fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER)

	const fragmentShader: string =
		'precision mediump float;' +
		'varying vec2 vuv;' +
		'uniform sampler2D texture;' +
		'void main(void)' +
		'{' +
		'   gl_FragColor = texture2D(texture, vuv);' +
		'}'

	gl.shaderSource(fragmentShaderId, fragmentShader)
	gl.compileShader(fragmentShaderId)

	//=> 创建 Program Id
	const programId = gl.createProgram()
	gl.attachShader(programId, vertexShaderId)
	gl.attachShader(programId, fragmentShaderId)

	gl.deleteShader(vertexShaderId)
	gl.deleteShader(fragmentShaderId)

	//=> 绑定对象
	gl.linkProgram(programId)

	gl.useProgram(programId)

	return programId
}

/**
 * 初始化 独立的 ViewMatrix
 * @param canvas HMTL Canvas Element
 */
export const getInitViewMatrix = (canvas: any) => {
	const _initViewMatrix = new CubismViewMatrix()
	const _deviceToScreen = new CubismMatrix44()

	const { width, height } = canvas

	const ratio: number = width / height
	const left: number = -ratio
	const right: number = ratio
	const bottom: number = -1.0
	const top: number = 1.0

	//=> 针对不同屏幕配置
	_initViewMatrix.setScreenRect(left, right, bottom, top)
	_initViewMatrix.scale(1.0, 1.0)

	_deviceToScreen.loadIdentity()
	if (width > height) {
		const screenW: number = Math.abs(right - left)
		_deviceToScreen.scaleRelative(screenW / width, -screenW / width)
	} else {
		const screenH: number = Math.abs(top - bottom)
		_deviceToScreen.scaleRelative(screenH / height, -screenH / height)
	}
	_deviceToScreen.translateRelative(-width * 0.5, -height * 0.5)

	//=> 显示范围
	_initViewMatrix.setMaxScale(2.0)
	_initViewMatrix.setMinScale(0.8)

	//=> 显示的最大范围
	_initViewMatrix.setMaxScreenRect(-2.0, 2.0, -2.0, 2.0)

	return _initViewMatrix
}
