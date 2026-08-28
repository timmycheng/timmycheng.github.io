# AGENTS.md

## 常用命令

- `npm run new -- "标题" [slug]` — 新建文章到 `src/content/works/`（自动填 frontmatter 和日期）
- `npm run dev` — 启动开发服务器（默认 http://localhost:4321）
- `npm run check` — 运行 Astro 类型检查（`astro check`）
- `npm run build` — 构建到 `dist/`
- `npm run preview` — 本地预览构建产物
- `npm run format` — Prettier 格式化所有文件
- `npm run format:check` — 检查格式（CI 用）

### 后台开发服务器

当需要长时间运行 dev 服务器时，使用后台模式：

```
astro dev --background
```

管理后台服务器：

- `astro dev stop` — 停止
- `astro dev status` — 查看状态
- `astro dev logs` — 查看日志

## 项目结构

- `src/pages/` — 基于文件的路由（Astro 页面）
- `src/content/` — 内容集合（works、gallery），配置在 `src/content.config.ts`
- `src/components/` — 可复用 UI 组件
- `src/styles/global.css` — 全局样式
- `src/consts.ts` — 站点常量（标题、描述等）
- `public/` — 静态资源（`CNAME` 指向 timmycheng.cn，勿删除）

## 工作流约定

- 修改代码后运行 `npm run check` 验证类型
- 提交前运行 `npm run format` 保持代码风格一致（Prettier：Tab 缩进、单引号、100 列宽）
- 站点部署到 GitHub Pages：push 到 `master` 分支自动触发构建部署
- 内容集合（works/gallery）用 Markdown + frontmatter，新增内容遵循已有 frontmatter 字段（`kind: post | project` 区分文章与项目，项目可加 `status`/`repo`/`link`）
- works 双语约定：默认显示英文；双语内容在同一 md 里用 `<div data-lang="en">` / `<div data-lang="zh">` 两段（div 与 Markdown 之间留空行才能正常渲染），frontmatter 加 `titleZh`/`descriptionZh`；只写一种语言时不用包 div 或只包一段，两种模式下都显示

## 文档

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
