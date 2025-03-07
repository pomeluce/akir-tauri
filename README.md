## 简介

[akir-tauri](https://github.com/pomeluce/akir-tauri) 是一个开源的, 基于 [react](https://github.com/facebook/react)、[vite](https://github.com/vitejs/vite)、 [shadcn/ui](https://ui.shadcn.com/)、[typescript](https://www.typescriptlang.org/)、[tauri](https://tauri.app) 的桌面端开发脚手架，它使用了最新的前端技术栈，并提供了常用的客户端组件和软件基本结构，提升软件开发效率。

## 文档

```
待完善
```

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [vite](https://vitejs.dev/) - 熟悉 vite 特性
- [react](https://github.com/facebook/react) - 熟悉 React 基础语法
- [typescript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [zustand](https://zustand-demo.pmnd.rs/) - 熟悉 zustand 基本使用
- [tauri](https://tauri.app) - 熟悉 tauri 框架

## 使用

#### 方式 1:

- 安装 cli 工具

```bash
npm i akir-app -g
```

- 通过全局命令创建项目

```bash
akir-app
```

- 进入项目文件夹, 启动项目

```bash
cd [project_name]

pnpm install

pnpm dev

pnpm build
```

#### 方式 2:

- 获取项目代码

```bash
git clone https://github.com/pomeluce/akir-tauri.git
```

- 安装依赖

```bash
cd akir-tauri

pnpm install
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/pomeluce/akir-tauri/issues) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

- 参考 [规范文档](https://github.com/pomeluce/akir-tauri/blob/main/COMMIT_CONVENTION.md) ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
