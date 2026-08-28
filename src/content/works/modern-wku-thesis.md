---
kind: project
title: Modern WKU Thesis - A Typst & Latex Template
titleZh: Modern WKU Thesis — Typst 与 LaTeX 学位论文模板
description: A graduate thesis template for WKU's CSMT college, in both Typst and LaTeX, published on Typst Universe.
descriptionZh: 温州肯恩大学 CSMT 学院研究生毕业论文模板，Typst 与 LaTeX 双版本，已发布至 Typst Universe。
pubDate: 2026-08-27
heroImage: ../../assets/modern-wku-thesis.png
tags: ['typst', 'latex', 'typography', 'template']
repo: https://github.com/timmycheng/modern-wku-thesis
status: done
pinned: true
---

<div data-lang="en">

In grad school the last thing I wanted was to waste time on typesetting — yet a thesis is exactly the kind of document with the most formatting rules: the cover page, abstract pages, acknowledgements, and acronym list each have their own conventions, chapter titles must be numbered `Chapter N`, references must follow IEEE style… Maintaining all of that by hand in a Word template is error-prone and, frankly, inelegant.

**Modern WKU Thesis** is the graduate thesis template I built for exactly this problem, targeting the College of Science, Mathematics and Technology (CSMT) at Wenzhou-Kean University (WKU). It ships in both **Typst** and **LaTeX**.

## Features

- Matches the WKU CSMT graduate thesis format spec: fonts, spacing, headers and footers configured once, applied globally
- Cover, Chinese & English abstracts, acknowledgements, and acronym list all auto-generated — just fill in the parameters
- IEEE reference style, plugs straight into `refs.bib`
- Heading numbering follows the school's rules: chapters as `Chapter N`, sections `N.M`, appendix entries `A.`, lists use `•`
- Chapters start on a new page automatically; figure and table captions share a unified style

## Usage

The Typst version is published on the official package registry. On the web app, click "Start from template" on the dashboard and search for `modern-wku-thesis`; on the command line it's a single line:

```bash
typst init @preview/modern-wku-thesis
```

The template exports a `graduate-thesis` function where all metadata is passed as named arguments:

```typ
#import "@preview/modern-wku-thesis:0.1.3": graduate-thesis

#show: graduate-thesis.with(
	title: [This is your thesis title],
	author: "Timmycheng",
	supervisor: [Dr. Jhon Doe],
	keywords: [some, key, words],
	bibliography: bibliography("refs.bib"),
	acronyms: ("AKA": "As Known As"),
)

= Introduction

Your thesis content goes here...
```

## The LaTeX Version

For classmates whose machines only have a TeX distribution installed, the repo also carries a LaTeX port with matching styling ([`latex/`](https://github.com/timmycheng/modern-wku-thesis/tree/master/latex)). It's not published to the Typst package registry — grab it from the Releases page, or clone the repo and:

```bash
cd latex
latexmk -pdf main.tex
```

## Engineering Notes

The part I find most interesting is the release pipeline design: during local development, `template/main.typ` imports `../src/lib.typ` via a relative path, so you can edit the source and get hot-reloaded previews; the official release, meanwhile, is built by a CI workflow that rewrites this import into a `@preview/modern-wku-thesis:x.y.z` package reference before tagging and uploading. Development experience and installation experience never step on each other.

</div>

<div data-lang="zh">

读研时最不想在排版上浪费时间，但毕业论文恰恰是格式要求最多的那一类文档：封面、摘要页、致谢页、缩写表各有各的规矩，标题编号是 `Chapter N`，参考文献必须 IEEE 样式……Word 模板靠手动维护这些既容易出错，也不够优雅。

**Modern WKU Thesis** 就是为此做的研究生学位论文模板，面向温州肯恩大学（WKU，Wenzhou-Kean University）理工学院（CSMT, College of Science, Mathmatic and Technology），包含 **Typst** 和 **LaTeX** 两个版本。

## 功能特性

- 对齐 WKU CSMT 研究生论文的格式规范：字体、间距、页眉页脚一处配置全局生效
- 封面、中英文摘要、致谢、缩写表全部自动生成，只需填参数
- IEEE 参考文献样式，直接接 `refs.bib`
- 标题编号按学校要求实现：章为 `Chapter N`，小节 `N.M`，附录条目 `A.`，列表用 `•`
- 章节自动起新页，图表标题（caption）统一样式

## 使用方式

Typst 版本已发布到官方包注册表，网页端在仪表盘点「Start from template」搜索 `modern-wku-thesis` 即可；命令行则是一行：

```bash
typst init @preview/modern-wku-thesis
```

模板导出一个 `graduate-thesis` 函数，所有元信息都是命名参数：

```typ
#import "@preview/modern-wku-thesis:0.1.3": graduate-thesis

#show: graduate-thesis.with(
	title: [This is your thesis title],
	author: "Timmycheng",
	supervisor: [Dr. Jhon Doe],
	keywords: [some, key, words],
	bibliography: bibliography("refs.bib"),
	acronyms: ("AKA": "As Known As"),
)

= Introduction

Your thesis content goes here...
```

## LaTeX 版本

考虑到部分同学的环境只装了 TeX 发行版，仓库里还带了一个样式一致的 LaTeX 移植版（[`latex/`](https://github.com/timmycheng/modern-wku-thesis/tree/master/latex)），不发布到 Typst 包注册表，从 Releases 页面拿或直接克隆仓库后：

```bash
cd latex
latexmk -pdf main.tex
```

## 一些工程细节

比较有意思的是发布流程的设计：本地开发时 `template/main.typ` 通过相对路径引入 `../src/lib.typ`，方便直接改源码并热更新预览；而正式发布的 release 由 CI 工作流自动把这个 import 改写成 `@preview/modern-wku-thesis:x.y.z` 包引用后再打标签上传，开发体验与用户安装体验互不干扰。

</div>
