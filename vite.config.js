import path from 'path';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const rootPath = '/';

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
			png: { quality: 70 },
			jpeg: { quality: 70 },
			jpg: { quality: 70 }
		}),
	],
	root: 'src',
	publicDir: '../public',
	build: {
		outDir: '../dist',
		emptyOutDir: false, // НЕ очищать dist
		rollupOptions: {
			input: {
				main: path.resolve(process.cwd(), 'src/js/main.js'),
				style: path.resolve(process.cwd(), 'src/scss/style.scss'),
			},
			output: {
				entryFileNames: '[name].js',
				assetFileNames: (assetInfo) => {
					// Шрифты в папку fonts
					if (assetInfo.name.match(/\.(woff2?|eot|ttf|otf)$/)) {
						return 'fonts/[name][extname]';
					}
					// Остальное в корень
					return '[name][extname]';
				}
			}
		},
	},
	server: {
		port: 5173,
		strictPort: true,
	},
	base: `${rootPath}`,
});