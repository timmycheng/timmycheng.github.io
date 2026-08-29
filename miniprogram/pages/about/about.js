const app = getApp();
const { loadAbout } = require('../../utils/api');

// Bilingual 字段取值：中文模式且有中文文案时用中文，否则回退英文
function pick(field, lang) {
	return lang === 'zh' && field && field.zh ? field.zh : field.en;
}

Page({
	data: {
		lang: 'en',
		loading: true,
		error: false,
		view: null,
	},

	onShow() {
		// 语言可能在详情页被切换过
		if (app.globalData.lang !== this.data.lang) {
			this.setData({ lang: app.globalData.lang });
			this.applyData();
		}
		if (!this.fetched) {
			this.fetched = true;
			this.fetch();
		}
	},

	fetch() {
		loadAbout((data, meta) => {
			if (meta.error) {
				this.setData({ loading: false, error: true });
				return;
			}
			this.raw = data;
			this.applyData();
		});
	},

	applyData() {
		const about = this.raw;
		if (!about) return;
		const lang = this.data.lang;
		this.setData({
			loading: false,
			error: false,
			view: {
				name: about.name,
				role: about.role,
				bio: pick(about.bio, lang),
				resumeNote: pick(about.resumeNote, lang),
				copyLabel: lang === 'zh' ? '复制' : 'Copy',
				socials: [
					{ key: 'github', label: 'GitHub', value: about.socials.github },
					{
						key: 'wechat',
						label: lang === 'zh' ? '微信号' : 'WeChat ID',
						value: about.socials.wechat,
					},
					{ key: 'email', label: lang === 'zh' ? '邮箱' : 'Email', value: about.socials.email },
				],
				experienceTitle: pick(about.experienceTitle, lang),
				experience: about.experience.map((e) => ({
					role: pick(e.role, lang),
					date: e.date,
					desc: pick(e.desc, lang),
				})),
				certificationsTitle: pick(about.certificationsTitle, lang),
				certifications: about.certifications.map((c) => pick(c, lang)),
				awardsTitle: pick(about.awardsTitle, lang),
				awards: about.awards.map((a) => pick(a, lang)),
				educationTitle: pick(about.educationTitle, lang),
				education: about.education.map((e) => ({
					degree: pick(e.degree, lang) + (e.extra ? pick(e.extra, lang) : ''),
					date: e.date,
				})),
			},
		});
	},

	toggleLang() {
		const lang = this.data.lang === 'zh' ? 'en' : 'zh';
		this.setData({ lang });
		app.setLang(lang);
		this.applyData();
	},

	copy(e) {
		wx.setClipboardData({ data: e.currentTarget.dataset.value });
	},

	retry() {
		this.fetched = false;
		this.setData({ loading: true, error: false });
		this.fetch();
	},
});
