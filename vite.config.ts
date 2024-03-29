/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

//=> Vite config
export default defineConfig({
	//=> 插件
	plugins: [tsconfigPaths(), reactRefresh(), svgr()],
	server: {
		port: 1024 //=> Dev 监听端口 | '一般在 3000 绑定失败时设置'
	},
	build: {
		sourcemap: false
	}
})
