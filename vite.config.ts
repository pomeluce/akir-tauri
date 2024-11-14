import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import { autoImport, mock } from './core/plugins';
import { parseEnv } from './core/utils';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

const root: string = process.cwd();

const moduleInputs = {};
const entryPath = resolve(__dirname, './modules');
const entrys = Object.fromEntries(readdirSync(entryPath).map(dirname => [dirname, join(entryPath, dirname)]));
Object.keys(entrys).forEach(name => (moduleInputs[name] = resolve(__dirname, `modules/${name}/index.html`)));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const env = parseEnv(loadEnv(mode, root));

  const args = process.argv.slice(2);
  const moduleIndex = args.findIndex(arg => arg.startsWith('--module='));
  const moduleName = moduleIndex !== -1 ? args[moduleIndex].split('=')[1] : null;
  const input = moduleInputs[moduleName];

  return {
    plugins: [...autoImport, react(), TanStackRouterVite(), UnoCSS(), mock(isBuild, env)],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '#': resolve(__dirname, 'types'),
        '@': resolve(__dirname, 'src'),
        '@common': resolve(__dirname, 'src/common'),
        '@main': resolve(__dirname, 'modules/main'),
        '@tauri': resolve(__dirname, 'modules/tauri'),
      },
    },
    define: {
      __DEV__: mode !== 'production',
    },
    css: {
      modules: {
        generateScopedName: '[local]-[hash:8]',
        hashPrefix: 'rify',
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: { scss: { api: 'modern-compiler' } },
    },
    base: isBuild ? '/' : '/',
    server: {
      host: true,
      proxy: env.VITE_MOCK_ENABLE ? {} : { [env.VITE_BASE_PREFIX]: { target: env.VITE_API_URL, rewrite: path => path } },
    },
    root: `./modules/${moduleName}/`,
    publicDir: `${root}/public`,
    build: {
      outDir: `${root}/dist/${moduleName}`,
      emptyOutDir: true,
      rollupOptions: {
        input,
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.split('/node_modules/').pop()?.split('/')[0];
            }
          },
          entryFileNames: 'js/[name]-[hash].js', // 主入口文件
          chunkFileNames: 'js/[name]-[hash].js', // 异步块文件
          assetFileNames(assetInfo) {
            const extType = assetInfo.names?.[0].split('.').pop();
            // css 文件
            if ('css' === extType) return 'css/[name]-[hash].[ext]';
            // 图片文件
            else if (['avif', 'apng', 'bmp', 'gif', 'ico', 'jfif', 'jpg', 'jpeg', 'pjp', 'pjpeg', 'png', 'webp', 'svg'].includes(extType)) return 'images/[name]-[hash].[ext]';
            // 字体文件
            else if (['ttf', 'woff', 'woff2', 'eot', 'otf', 'wof2'].includes(extType)) return 'fonts/[name]-[hash].[ext]';
            else return 'assets/[name]-[hash].[ext]';
          },
        },
      },
    },
  };
});
