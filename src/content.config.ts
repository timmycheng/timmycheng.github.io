import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 统一的 works 集合：文章与项目共用一套 frontmatter，
// 用 kind 区分（列表徽标用）；status/repo/link 仅项目类条目使用。
// 双语约定：一文两档 <slug>.zh.md / <slug>.en.md，各自是完整独立版本，
// 语言由 frontmatter 的 lang 字段声明。文件名后缀保证两档 id 唯一；
// generateId 只去掉扩展名，id 形如 foo.zh（默认 slug 会连点号一起吞掉），
// parseEntry 再从 id 里剥出路由用的 slug。
const works = defineCollection({
	loader: glob({
		base: './src/content/works',
		pattern: '**/*.{md,mdx}',
		generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/i, ''),
	}),
	schema: ({ image }) =>
		z.object({
			kind: z.enum(['post', 'project']).default('post'),
			lang: z.enum(['en', 'zh']),
			title: z.string(),
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
