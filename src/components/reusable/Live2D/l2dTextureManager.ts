import { csmVector, iterator } from 'lib/live2dFramework/src/type/csmvector'

/**
 * Live2d 模型纹理处理
 * * 基于官方实例算法移植 *
 * ! 注释仅供参考，以官方为主 !
 * @editor LF112
 * @author Live2D Inc.
 */
export class TextureManager {
	_textures: csmVector<TextureInfo>
	constructor() {
		this._textures = new csmVector<TextureInfo>()
	}

	/**
	 * 释放纹理
	 * @param gl Live2D 必要的 webgl, 通过 WebGl2Canvas 获取
	 */
	public release(gl: any): void {
		for (
			let ite: iterator<TextureInfo> = this._textures.begin();
			ite.notEqual(this._textures.end());
			ite.preIncrement()
		)
			gl.deleteTexture(ite.ptr().id)

		this._textures = null
	}

	/**
	 * 加载纹理
	 * @param fileName 图像文件路径
	 * @param usePremultiply 预先处理 ?
	 * @return 图像信息，读取失败时返回 null
	 */
	public createTextureFromPngFile(
		gl: any,
		fileName: string,
		usePremultiply: boolean,
		callback: (textureInfo: TextureInfo) => void
	): void {
		//=> 检索已加载的纹理
		for (
			let ite: iterator<TextureInfo> = this._textures.begin();
			ite.notEqual(this._textures.end());
			ite.preIncrement()
		) {
			if (
				ite.ptr().fileName == fileName &&
				ite.ptr().usePremultply == usePremultiply
			) {
				//=> 缓存（没有等待时间）
				// WebKit需要重新静态才能再次调用相同的图像
				ite.ptr().img = new Image()
				ite.ptr().img.onload = (): void => callback(ite.ptr())
				ite.ptr().img.src = fileName
				return
			}
		}

		//=> img onload
		const img = new Image()
		img.onload = (): void => {
			//=> 创建 webgl 纹理
			const tex: WebGLTexture = gl.createTexture()

			// 绑定纹理
			gl.bindTexture(gl.TEXTURE_2D, tex)

			// 将像素写入纹理
			gl.texParameteri(
				gl.TEXTURE_2D,
				gl.TEXTURE_MIN_FILTER,
				gl.LINEAR_MIPMAP_LINEAR
			)
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

			// Premult 处理
			if (usePremultiply) gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1)

			// 将像素写入纹理
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)

			// 生成 Mip 地图
			gl.generateMipmap(gl.TEXTURE_2D)

			// 绑定纹理
			gl.bindTexture(gl.TEXTURE_2D, null)

			const textureInfo: TextureInfo = new TextureInfo()
			if (textureInfo != null) {
				textureInfo.fileName = fileName
				textureInfo.width = img.width
				textureInfo.height = img.height
				textureInfo.id = tex
				textureInfo.img = img
				textureInfo.usePremultply = usePremultiply
				this._textures.pushBack(textureInfo)
			}

			callback(textureInfo)
		}
		img.src = fileName
	}
}

export class TextureInfo {
	img: HTMLImageElement
	id: WebGLTexture = null
	width = 0
	height = 0
	usePremultply: boolean
	fileName: string
}
