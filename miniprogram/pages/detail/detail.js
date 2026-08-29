const app = getApp();
const { BASE_URL, loadWork } = require('../../utils/api');
const { formatDate, decorateHtml } = require('../../utils/util');

const STATUS_LABELS = { wip: 'WIP', active: 'ACTIVE', done: 'DONE' };

Page({
	data: {
		lang: 'en',
		loading: true,
		error: false,
		work: null,
		html: '',
	},

	onLoad(options) {
		this.id = options.id;
		this.raw = null;
		this.setData({ lang: app.globalData.lang });
		this.fetch();
	},

	fetch() {
		loadWork(this.id, (work, meta) => {
			if (meta.error) {
				this.setData({ loading: false, error: true });
				return;
			}
			this.raw = work;
			this.applyWork();
		});
	},

	applyWork() {
		const work = this.raw;
		if (!work) return;
		const { lang } = this.data;
		const hasZh = !!work.content.zh;
		const html = (lang === 'zh' && hasZh ? work.content.zh : work.content.en) || '';
		const title = lang === 'zh' && work.titleZh ? work.titleZh : work.title;
		this.setData({
			loading: false,
			error: false,
			work: {
				hero: work.heroImage,
				title,
				desc: lang === 'zh' && work.descriptionZh ? work.descriptionZh : work.description,
				dateText: formatDate(work.pubDate),
				updatedText: work.updatedDate ? formatDate(work.updatedDate) : '',
				readingMinutes: work.readingMinutes,
				tags: work.tags,
				kindLabel: work.kind === 'project' ? (lang === 'zh' ? '项目' : 'PROJECT') : '',
				status: work.status ? STATUS_LABELS[work.status] : '',
				repo: work.repo,
				link: work.link,
				hasZh,
			},
			html: decorateHtml(html),
		});
		wx.setNavigationBarTitle({ title });
	},

	toggleLang() {
		const lang = this.data.lang === 'zh' ? 'en' : 'zh';
		this.setData({ lang });
		app.setLang(lang);
		this.applyWork();
	},

	copyLink(e) {
		wx.setClipboardData({ data: e.currentTarget.dataset.url });
	},

	copyArticleLink() {
		wx.setClipboardData({ data: BASE_URL + '/works/' + this.id + '/' });
	},

	onShareAppMessage() {
		const w = this.data.work || {};
		return {
			title: w.title || 'Shxt in Mind',
			path: '/pages/detail/detail?id=' + this.id,
			imageUrl: w.hero,
		};
	},

	retry() {
		this.setData({ loading: true, error: false });
		this.fetch();
	},
});
