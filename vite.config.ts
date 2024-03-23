import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import UnoCSS from 'unocss/vite';
import path from 'path';
import autoImport from './core/auto-import';
import { parseEnv } from './core/utils';
import mock from './core/mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取当前环境模式
  const isBuild = command === 'build';
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = parseEnv(loadEnv(mode, process.cwd()));
  return {
    plugins: [...autoImport, react(), UnoCSS(), mock(isBuild, env)],
    // 本地开发服务器配置
    // 配置路径别名
    resolve: {
      // 导入组件忽略文件后缀
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'types'),
        rify: path.resolve(__dirname, 'src/rify'),
      },
    },
    define: {
      'process.env.NODE_ENV': `'${env.NODE_ENV}'`,
      __DEV__: env.NODE_ENV !== 'production',
    },
    css: {
      // 开启 css 模块化
      modules: {
        generateScopedName: '[local]-data-[hash:8]',
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
