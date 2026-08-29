const app = getApp();
const { loadWorks } = require('../../utils/api');
const { formatDate } = require('../../utils/util');

const STATUS_LABELS = { wip: 'WIP', active: 'ACTIVE', done: 'DONE' };

function filtersFor(lang) {
	return [
		{ key: 'all', label: lang === 'zh' ? '全部' : 'All' },
		{ key: 'post', label: lang === 'zh' ? '文章' : 'Posts' },
		{ key: 'project', label: lang === 'zh' ? '项目' : 'Projects' },
	];
}

Page({
	data: {
		lang: 'en',
		filter: 'all',
		filters: [],
		loading: true,
		error: false,
		shown: [],
	},

	onLoad() {
		this.rawItems = [];
		this.applyLang(app.globalData.lang);
		this.fetch();
	},

	onShow() {
		// 语言可能在详情页被切换过
		if (app.globalData.lang !== this.data.lang) {
			this.applyLang(app.globalData.lang);
		}
	},

	onPullDownRefresh() {
		this.fetch(() => wx.stopPullDownRefresh());
	},

	onShareAppMessage() {
		return { title: 'Shxt in Mind', path: '/pages/index/index' };
	},

	applyLang(lang) {
		this.setData({ lang, filters: filtersFor(lang) });
		this.applyFilter();
	},

	fetch(done) {
		loadWorks((data, meta) => {
			if (meta.error) {
				this.setData({ loading: false, error: true });
			} else {
				this.rawItems = data.items;
				this.setData({ loading: false, error: false });
				this.applyFilter();
			}
			if (done) done();
		});
	},

	applyFilter() {
		const { lang, filter } = this.data;
		const shown = this.rawItems
			.filter((it) => filter === 'all' || it.kind === filter)
			.map((it) => ({
				id: it.id,
				hero: it.heroImage,
				pinned: it.pinned,
				status: it.status ? STATUS_LABELS[it.status] : '',
				kindLabel: it.kind === 'project' ? (lang === 'zh' ? '项目' : 'PROJECT') : '',
				pinLabel: lang === 'zh' ? '置顶' : 'PINNED',
				title: lang === 'zh' && it.titleZh ? it.titleZh : it.title,
				desc: lang === 'zh' && it.descriptionZh ? it.descriptionZh : it.description,
				dateText: formatDate(it.pubDate),
				tags: it.tags.slice(0, 4),
			}));
		this.setData({ shown });
	},

	onFilterTap(e) {
		const filter = e.currentTarget.dataset.filter;
		if (filter !== this.data.filter) {
			this.setData({ filter });
			this.applyFilter();
		}
	},

	goDetail(e) {
		wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id });
	},

	retry() {
		this.setData({ loading: true, error: false });
		this.fetch();
	},
});
