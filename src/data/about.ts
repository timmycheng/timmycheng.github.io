// 关于页单一数据源：web 的 about.astro 与小程序的 /api/about.json 都从这里渲染。
// Bilingual 字段 en 必填、zh 可空（为空时客户端回退英文）。
export type Bilingual = { en: string; zh: string | null };

export interface About {
	name: string;
	role: string;
	bio: Bilingual;
	resumeNote: Bilingual;
	socials: { github: string; wechat: string; email: string };
	experienceTitle: Bilingual;
	experience: { role: Bilingual; date: string; desc: Bilingual }[];
	certificationsTitle: Bilingual;
	certifications: Bilingual[];
	awardsTitle: Bilingual;
	awards: Bilingual[];
	educationTitle: Bilingual;
	education: { degree: Bilingual; extra: Bilingual | null; date: string }[];
}

export const about: About = {
	name: 'Timmy Cheng',
	role: 'Cybersecurity Engineer · Security Ops',
	bio: { en: 'Focused on cybersecurity operations.', zh: '专注网络安全运营。' },
	resumeNote: {
		en: "If you're interested, ask for my resume.",
		zh: '如果有兴趣，可以找我拿简历。',
	},
	socials: {
		github: 'https://github.com/timmycheng',
		wechat: 'timmycheng',
		email: 'timmycheng@foxmail.com',
	},
	experienceTitle: { en: 'Experience / 经历', zh: '经历 / Experience' },
	experience: [
		{
			role: { en: 'Cybersecurity Management', zh: '网络安全运营' },
			date: '2023 — NOW',
			desc: {
				en: 'Security operations and management of bank systems and applications.',
				zh: '银行系统与应用的安全运营与管理。',
			},
		},
		{
			role: {
				en: 'Security Product Manager / Consulting Engineer',
				zh: '安全产品经理 / 咨询工程师',
			},
			date: '2020 — 2023',
			desc: {
				en: 'SOC platform product, security consulting, national operating standard.',
				zh: '安全运营平台产品的打造、安全咨询与国家标准。',
			},
		},
		{
			role: { en: 'Cybersecurity Engineer', zh: '网络安全工程师' },
			date: '2015 — 2020',
			desc: {
				en: 'Security device operations, vulnerability management, platform building, training.',
				zh: '安全设备运营、漏洞管理、平台建设、培训与竞赛。',
			},
		},
	],
	certificationsTitle: { en: 'Certifications / 认证', zh: '认证 / Certifications' },
	certifications: [
		{ en: 'CISSP · 2018', zh: 'CISSP · 2018' },
		{ en: 'CISP · 2019', zh: 'CISP · 2019' },
		{ en: 'CISP-CSE · 2021', zh: 'CISP-CSE · 2021' },
		{ en: 'CCSC Cloud Security · 2022', zh: 'CCSC 云安全 · 2022' },
		{ en: 'Database System Engineer · 2013', zh: '数据库系统工程师 · 2013' },
	],
	awardsTitle: { en: 'Awards / 荣誉', zh: '荣誉 / Awards' },
	awards: [
		{
			en: 'Multiple gold / silver / bronze prizes in provincial & municipal cyber security skills competitions (2015—2020)',
			zh: '省市网络安全技能竞赛 金/银/铜奖多项（2015—2020）',
		},
		{
			en: 'Municipal cybersecurity incident response expert team member (2019); cybersecurity & data security expert (2024—now)',
			zh: '市级网络安全应急响应专家组成员（2019）；网络安全与数据安全专家（2024—至今）',
		},
	],
	educationTitle: { en: 'Education / 教育', zh: '教育 / Education' },
	education: [
		{
			degree: { en: 'M.S. Computer Information Systems', zh: '计算机信息系统 硕士' },
			extra: { en: ' (in progress)', zh: '（在读）' },
			date: '2024 — NOW',
		},
		{
			degree: { en: 'B.S. Computer Science', zh: '计算机科学 本科' },
			extra: null,
			date: '2007 — 2011',
		},
	],
};
