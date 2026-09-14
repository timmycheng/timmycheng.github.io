import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

// 双语内容约定：<slug>.zh.md / <slug>.en.md 成对存放，各自是完整独立版本；
// 语言由 frontmatter 的 lang 字段声明，文件名后缀保证两档 id 唯一
// （id 形如 foo.zh，剥掉后缀即路由用的 slug）。
export function parseEntry(entry: CollectionEntry<'works'>): { slug: string; lang: Lang } {
	const m = entry.id.match(/^(.*)\.(en|zh)$/);
	return { slug: m ? m[1] : entry.id, lang: entry.data.lang };
}

// 某语言下某篇文章的 URL：英文在 /works/<slug>/，中文在 /zh/works/<slug>/
export function workHref(slug: string, lang: Lang): string {
	return `${lang === 'zh' ? '/zh' : ''}/works/${slug}/`;
}

export function langFromUrl(url: URL): Lang {
	return url.pathname === '/zh' || url.pathname.startsWith('/zh/') ? 'zh' : 'en';
}

export async function getWorks(lang: Lang): Promise<CollectionEntry<'works'>[]> {
	return (await getCollection('works'))
		.filter((e) => e.data.lang === lang)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// 同名另一语言版本；没有翻译则 undefined
export async function getTranslation(
	entry: CollectionEntry<'works'>,
): Promise<CollectionEntry<'works'> | undefined> {
	const { slug, lang } = parseEntry(entry);
	const other: Lang = lang === 'zh' ? 'en' : 'zh';
	return (await getCollection('works')).find((e) => e.id === `${slug}.${other}`);
}
