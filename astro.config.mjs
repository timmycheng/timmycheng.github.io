// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';

// https://astro.build/config
export default defineConfig({
	site: 'https://timmycheng.cn',
	integrations: [mdx(), sitemap()],
	markdown: {
		rehypePlugins: [rehypeSlug],
	},
	redirects: {
		'/blog': '/works',
		'/projects': '/works',
		// 旧文章/项目详情链接统一重定向到 /works/<slug>
		'/blog/[...slug]': '/works/[...slug]',
		'/projects/[...slug]': '/works/[...slug]',
	},
});
