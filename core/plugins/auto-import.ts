import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver, RemixiconResolver } from '../resolver';

/* 自动导入 */
export default [
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.md$/, // .md
    ],
    // 自动导入 react 相关函数
    imports: ['react', 'react-router-dom', 'react-i18next', 'ahooks'],
    // 自定义解析函数: 自动导入组件
    resolvers: [ArcoResolver({ prefix: 'Arco' }), RemixiconResolver()],
    // 自定义函数导入
    dirs: ['src/store/**/*', 'src/enum/**/*', 'src/hooks/**/*', 'src/config/**/*', 'src/request/**/*'],
    // 声明生成的位置
    dts: 'types/rify/auto-imports.d.ts',
    // 根据文件名称自动设置默认导出的变量名
    defaultExportByFilename: true,
  }),
];
