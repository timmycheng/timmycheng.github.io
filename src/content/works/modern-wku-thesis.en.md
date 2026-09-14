---
kind: project
lang: en
title: Modern WKU Thesis - A Typst & Latex Template
description: A graduate thesis template for WKU's CSMT college, in both Typst and LaTeX, published on Typst Universe.
pubDate: 2026-08-27
heroImage: ../../assets/modern-wku-thesis.png
tags: ['typst', 'latex', 'typography', 'template']
repo: https://github.com/timmycheng/modern-wku-thesis
status: done
pinned: true
---

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
