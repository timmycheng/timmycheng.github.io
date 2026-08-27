---
title: Modern WKU Thesis - A Typst & Latex Template
description: 温州肯恩大学 CSMT 学院研究生毕业论文模板，Typst 与 LaTeX 双版本，已发布至 Typst Universe。
pubDate: 2026-08-27
tags: ['typst', 'latex', 'typography', 'template']
repo: https://github.com/timmycheng/modern-wku-thesis
status: done
pinned: true
---

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
