import AutoImport from 'unplugin-auto-import/vite';

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
      {
        '@tanstack/react-router': [
          'createFileRoute',
          'createLazyFileRoute',
          'createRootRoute',
          'createRootRouteWithContext',
          'createRouter',
          'useLocation',
          'useNavigate',
          'useRouter',
          'useRouterState',
          'redirect',
          'Link',
          'Outlet',
          'RouterProvider',
        ],
      },
    ],
    // 自定义函数导入
    dirs: ['src/store/**/*', 'src/constants/**/*', 'src/hooks/**/*'],
    // 声明生成的位置
    dts: 'types/akir/auto-imports.d.ts',
    // 根据文件名称自动设置默认导出的变量名
    defaultExportByFilename: true,
  }),
];
