import { build } from 'vite';
import { resolve } from 'path';

/** 当前执行 node 命令时文件夹的地址（工作目录） */
const root = process.cwd();

/** 路径拼接函数，简化代码 */
const pathResolve = path => resolve(root, path);

const builds = async mode => {
  ['main', 'tauri'].forEach(async item => {
    console.log(`module ${item} build start, the mode is ${mode}`);
    const isMain = item === 'main';
    const input = pathResolve(`${!isMain ? item : root}/index.html`);
    await build({
      configFile: './vite.config.ts',
      mode,
      root: isMain ? root : item,
      publicDir: `${!isMain ? '..' : '.'}/public`,
      build: {
        // 输出目录
        outDir: `${root}/dist/${item}`,
        // 编译是清空输出目录
        emptyOutDir: true,
        // 代码拆包
        rollupOptions: {
          input,
        },
      },
    });
    console.log(`module ${item} build end!`);
  });
};

const mode = process.argv[2] || 'production';
builds(mode);
