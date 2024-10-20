import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver, IconResolver, SuiResolver } from '../resolver';

const relativeRoot = (dir: string) => `${process.cwd()}/${dir}`;

/* 自动导入 */
export default [
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.md$/, // .md
    ],
    // 自动导入 react 相关函数
    imports: [
      'react',
      'react-i18next',
      'ahooks',
      {
        '@tanstack/react-router': [
          'createFileRoute',
          'createLazyFileRoute',
          'createRootRoute',
          'createRootRouteWithContext',
          'createRouter',
          'useNavigate',
          'useRouter',
          'redirect',
          'Link',
          'Outlet',
          'RouterProvider',
        ],
      },
    ],
    // 自定义解析函数: 自动导入组件
    resolvers: [ArcoResolver({ prefix: 'Arco' }), SuiResolver(), IconResolver()],
    // 自定义函数导入
    dirs: [
      relativeRoot('common/store/**/*'),
      relativeRoot('common/constants/**/*'),
      relativeRoot('common/hooks/**/*'),
      relativeRoot('src/store/**/*'),
      relativeRoot('src/constants/**/*'),
      relativeRoot('src/hooks/**/*'),
      relativeRoot('tauri/store/**/*'),
      relativeRoot('tauri/enum/**/*'),
      relativeRoot('tauri/hooks/**/*'),
    ],
    // 声明生成的位置
    dts: relativeRoot('/types/rify/auto-imports.d.ts'),
    // 根据文件名称自动设置默认导出的变量名
    defaultExportByFilename: true,
  }),
];
