import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { readingMinutes } from '../../../utils/reading';

// 正文双语约定：<div data-lang="en|zh"> 包裹的段落。拆开后分别在原始 Markdown 上渲染，
// 没有任何包裹时整篇视为英文；只有中文段时英文回退为整篇
function splitLocales(body) {
	const sections = { en: [], zh: [] };
	for (const m of body.matchAll(/<div data-lang="(en|zh)">([\s\S]*?)<\/div>/g)) {
		sections[m[1]].push(m[2].trim());
	}
	if (sections.en.length === 0 && sections.zh.length === 0) {
		return { en: body, zh: null };
	}
	const leftover = body.replace(/<div data-lang="(?:en|zh)">[\s\S]*?<\/div>/g, '').trim();
	const prefix = leftover ? `${leftover}\n\n` : '';
	return {
		en: sections.en.length > 0 ? prefix + sections.en.join('\n\n') : body,
		zh: sections.zh.length > 0 ? prefix + sections.zh.join('\n\n') : null,
	};
}

// rich-text 组件不带页面上下文，根相对链接/图片需改成绝对地址
function absolutize(html, site) {
	return html.replace(/(href|src)="\/(?!\/)/g, `$1="${site.origin}/`);
}

function renderHtml(markdown, site) {
	return absolutize(marked.parse(markdown, { gfm: true }), site);
}

export async function getStaticPaths() {
	const works = await getCollection('works');
	return works.map((work) => ({ params: { id: work.id }, props: { work } }));
}

export async function GET({ props, site }) {
	const { work } = props;
	const d = work.data;
	const body = work.body ?? '';
	const locales = splitLocales(body);

	let heroImage = null;
	if (d.heroImage) {
		const resolved = await getImage({ src: d.heroImage });
		heroImage = new URL(resolved.src, site).href;
	}

	return new Response(
		JSON.stringify(
			{
				id: work.id,
				kind: d.kind,
				title: d.title,
				titleZh: d.titleZh ?? null,
				description: d.description,
				descriptionZh: d.descriptionZh ?? null,
				pubDate: d.pubDate.toISOString(),
				updatedDate: d.updatedDate ? d.updatedDate.toISOString() : null,
				tags: d.tags,
				repo: d.repo ?? null,
				link: d.link ?? null,
				status: d.status ?? null,
				pinned: d.pinned,
				heroImage,
				readingMinutes: readingMinutes(body),
				content: {
					en: renderHtml(locales.en, site),
					zh: locales.zh ? renderHtml(locales.zh, site) : null,
				},
			},
			null,
			'\t',
		),
		{ headers: { 'Content-Type': 'application/json; charset=utf-8' } },
	);
}
