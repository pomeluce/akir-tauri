import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { autoImport, arco, mock } from './core/plugins';
import { parseEnv } from './core/utils';

/** 当前执行 node 命令时文件夹的地址（工作目录） */
const root: string = process.cwd();

/** 路径拼接函数，简化代码 */
const pathResolve = (path: string): string => resolve(root, path);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取当前环境模式
  const isBuild = command === 'build';
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = parseEnv(loadEnv(mode, root));

  // 获取自定义参数
  const args = process.argv.slice(2);
  const moduleIndex = args.findIndex(arg => arg.startsWith('--module='));
  const moduleName = moduleIndex !== -1 ? args[moduleIndex].split('=')[1] : null;
  const input = pathResolve(`${moduleName || root}/index.html`);

  return {
    plugins: [...autoImport(root), react(), arco(), mock(isBuild, env)],
    // 本地开发服务器配置
    // 配置路径别名
    resolve: {
      // 导入组件忽略文件后缀
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // 配置路径别名
      alias: [
        { find: '@', replacement: pathResolve('src') },
        { find: '#', replacement: pathResolve('types') },
        { find: '@tauri', replacement: pathResolve('tauri') },
      ],
    },
    define: {
      [process.env.NODE_ENV]: `${env.NODE_ENV}`,
      __DEV__: env.NODE_ENV !== 'production',
    },
    css: {
      // 开启 css 模块化
      modules: {
        generateScopedName: '[local]-[hash:8]',
        hashPrefix: 'rify',
        localsConvention: 'camelCaseOnly',
      },
    },
    base: isBuild ? '/' : '/',
    // 本地开发服务器配置
    server: {
      // 监听本地所有 ip
      host: true,
      // 代理
      proxy: env.VITE_MOCK_ENABLE
        ? {}
        : {
            [env.VITE_BASE_PREFIX]: {
              target: env.VITE_API_URL,
              rewrite: path => path,
            },
          },
    },
    root: moduleName || root,
    publicDir: `${moduleName ? '..' : '.'}/public`,
    build: {
      // 输出目录
      outDir: `${root}/dist/${moduleName || 'main'}`,
      // 编译是清空输出目录
      emptyOutDir: true,
      // 代码拆包
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
            const extType = assetInfo.name.split('.').pop();
            // css 文件
            if ('css' === extType) return 'css/[name]-[hash].[ext]';
            // 图片文件
            else if (['avif', 'apng', 'bmp', 'gif', 'ico', 'jfif', 'jpg', 'jpeg', 'pjp', 'pjpeg', 'png', 'webp', 'svg'].includes(extType)) return 'images/[name]-[hash].[ext]';
            // 字体文件
            else if (['ttf', 'woff', 'woff2', 'eot', 'otf', 'wof2']) return 'fonts/[name]-[hash].[ext]';
            else return 'assets/[name]-[hash].[ext]';
          },
        },
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      },
    },
  };
});
