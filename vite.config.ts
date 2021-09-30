import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [tsconfigPaths(), reactRefresh(), svgr()],
	server: {
		port: 10240
	}
})
