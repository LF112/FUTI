import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
	plugins: [tsconfigPaths(), reactRefresh(), svgr(), viteCompression()],
	server: {
		port: 10240
	}
})
