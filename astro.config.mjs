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
	},
});
