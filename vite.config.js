// import imagemin from 'imagemin'
// import imageminWebp from 'imagemin-webp'
import glob from 'fast-glob';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// you can use our path for your project
const rootPath = '/'
// example: const rootPath = '/my-path/'

export default defineConfig({
	plugins: [
		ViteImageOptimizer({
			svg: {
				plugins: [
					'removeDoctype',
					'removeXMLProcInst',
					'minifyStyles',
					'sortAttrs',
					'sortDefsChildren',
				],
			},
			png: {
				quality: 70,
			},
			jpeg: {
				quality: 70,
			},
			jpg: {
				quality: 70,
			}
		}),
		// {
		// 	...imagemin(['./src/img/**/*.{jpg,png,jpeg}'], {
		// 		destination: './src/img/webp/',
		// 		plugins: [
		// 			imageminWebp({ quality: 70 })
		// 		]
		// 	}),
		// 	apply: 'serve',
		// }
	],
	build: {
		rollupOptions: {
			input: Object.fromEntries(
				glob.sync(['./*.html', './pages/**/*.html']).map(file => [
					path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
					fileURLToPath(new URL(file, import.meta.url))
				])
			)
		},
	},
	base: `${rootPath}`,
})