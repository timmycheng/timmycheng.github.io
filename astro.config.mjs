// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://timmycheng.cn',
	integrations: [mdx(), sitemap()],
	redirects: {
		'/blog': '/works',
		'/projects': '/works',
	},
});
