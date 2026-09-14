import rss from '@astrojs/rss';
import { SITE_TITLE } from '../../consts';
import { getWorks, parseEntry, workHref } from '../../utils/works';

export async function GET(context) {
	const posts = await getWorks('zh');
	return rss({
		title: SITE_TITLE,
		description: '文章与项目——写下的文字与做出来的东西。',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: workHref(parseEntry(post).slug, 'zh'),
		})),
	});
}
