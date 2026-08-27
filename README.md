# Shxt in Mind

Timmy Cheng 的个人站：[timmycheng.cn](https://timmycheng.cn)。基于 [Astro](https://astro.build) 的纯静态站点，无客户端框架，构建产物为纯 HTML + 少量内联脚本。

## 功能

- **Works 页**：文章与项目合并展示，标签筛选、FEATURED 置顶、阅读时长、状态徽章
- **文章页**：侧栏 TOC（滚动高亮）、阅读时长、分享/复制链接、相关文章推荐
- **中英双语**：无闪切换（`localStorage` 持久化，head 内联脚本初始化，不闪屏）
- **明暗主题**：跟随系统 + 手动切换，同样无闪
- **评论**：[giscus](https://giscus.app)（GitHub Discussions），主题/语言跟随站点切换
- **SEO**：canonical、Open Graph / Twitter Card、文章页 BlogPosting JSON-LD、`robots.txt`、sitemap
- **RSS**：`/rss.xml`，tags 输出为 category
- **图片**：`astro:assets` 自动转 WebP、响应式 `srcset`；文章 hero 图 eager + 高优先级加载
- **错误页**：自定义 404 / 500

## 常用命令

```sh
npm run dev      # 开发服务器（默认 http://localhost:4321）
npm run check    # astro check 类型检查
npm run build    # 构建到 dist/
npm run preview  # 本地预览构建产物
npm run format   # Prettier 格式化（提交前跑）
```

后台开发服务器：`astro dev --background`，配套 `astro dev stop` / `status` / `logs`。

## 目录结构

```text
├── public/               # 静态资源（CNAME 指向 timmycheng.cn，勿删；giscus 主题 CSS）
├── src/
│   ├── assets/           # 文章图片（经 astro:assets 优化）
│   ├── components/       # BaseHead、Header、Footer、Comments 等
│   ├── content/
│   │   ├── blog/         # 文章（Markdown）
│   │   └── projects/     # 项目（Markdown）
│   ├── layouts/          # BlogPost 文章布局
│   ├── pages/            # 路由：/ /about /works /blog/[slug] /projects/[slug] /rss.xml 404 500
│   ├── styles/           # 全局样式与设计 token
│   ├── utils/            # reading.ts 等工具
│   ├── consts.ts         # 站点标题、描述
│   └── content.config.ts # 内容集合 schema
└── astro.config.mjs      # site、redirects（/blog /projects → /works）
```

## 写内容

在 `src/content/blog/` 或 `src/content/projects/` 下新建 Markdown 文件，frontmatter 字段：

**blog**

```yaml
title: 标题
description: 摘要
pubDate: 2026-08-26
updatedDate: 2026-08-27 # 可选
heroImage: ../../assets/xxx.jpg # 可选
tags: ['astro']
```

**projects**

```yaml
title: 项目名
description: 简介
pubDate: 2026-08-01
tags: ['security', 'siem']
status: wip # wip | active | done，默认 done
repo: https://github.com/xxx # 可选
link: https://xxx # 可选
pinned: true # 可选，默认 false
```

## 部署

push 到 `master` 自动触发 GitHub Actions（`.github/workflows/deploy.yml`）：先跑 `format:check` + `astro check`，再构建并发布到 GitHub Pages。自定义域名由 `public/CNAME` 指向 `timmycheng.cn`。

## Credit

基于 [Astro Blog 模板](https://github.com/withastro/astro/tree/main/examples/blog)深度定制（原模板来自 [Bear Blog](https://github.com/HermanMartinus/bearblog/) 的设计思路）。
