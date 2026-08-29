App({
	globalData: {
		lang: 'en',
	},

	onLaunch() {
		this.globalData.lang = this.resolveLang();
	},

	// 语言优先级：用户在详情页手动切换过的（tc_lang）> 系统语言
	resolveLang() {
		try {
			const saved = wx.getStorageSync('tc_lang');
			if (saved === 'zh' || saved === 'en') return saved;
		} catch (e) {}
		const info = wx.getAppBaseInfo();
		return (info.language || 'en').toLowerCase().startsWith('zh') ? 'zh' : 'en';
	},

	setLang(lang) {
		this.globalData.lang = lang;
		try {
			wx.setStorageSync('tc_lang', lang);
		} catch (e) {}
	},
});
