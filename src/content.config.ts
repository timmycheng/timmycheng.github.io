import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 统一的 works 集合：文章与项目共用一套 frontmatter，
// 用 kind 区分（列表徽标用）；status/repo/link 仅项目类条目使用
const works = defineCollection({
	loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			kind: z.enum(['post', 'project']).default('post'),
			title: z.string(),
			// 中文版标题/摘要（可选）：提供后页面可切换中英文，默认显示英文
			titleZh: z.string().optional(),
			descriptionZh: z.string().optional(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).default([]),
			repo: z.url().optional(),
			link: z.url().optional(),
			status: z.enum(['wip', 'active', 'done']).optional(),
			pinned: z.boolean().default(false),
		}),
});

export const collections = { works };
