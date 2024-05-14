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
  return {
    plugins: [...autoImport, react(), arco(), mock(isBuild, env)],
    // 本地开发服务器配置
    // 配置路径别名
    resolve: {
      // 导入组件忽略文件后缀
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // 配置路径别名
      alias: [
        { find: '@', replacement: pathResolve('src') },
        { find: '#', replacement: pathResolve('types') },
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
    build: {
      // 编译是清空输出目录
      emptyOutDir: true,
      // 代码拆包
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.split('/node_modules/').pop()?.split('/')[0];
            }
          },
        },
      },
    },
  };
});
