import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';

// 供微信小程序等客户端使用的静态 JSON 列表：构建时生成，随 GitHub Pages 一起部署
export async function GET({ site }) {
	const works = (await getCollection('works')).sort((a, b) => {
		if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
		return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
	});

	const items = await Promise.all(
		works.map(async (work) => {
			const d = work.data;
			let heroImage = null;
			if (d.heroImage) {
				const resolved = await getImage({ src: d.heroImage });
				heroImage = new URL(resolved.src, site).href;
			}
			return {
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
			};
		}),
	);

	return new Response(
		JSON.stringify(
			{
				updatedAt: new Date().toISOString(),
				items,
			},
			null,
			'\t',
		),
		{ headers: { 'Content-Type': 'application/json; charset=utf-8' } },
	);
}
