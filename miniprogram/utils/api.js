// 数据层：内容来自站点的静态 JSON 端点（https://timmycheng.cn/api/*，
// Astro 构建时生成，随 GitHub Pages 部署，国内由 EdgeOne CDN 边缘缓存加速）。
// 策略：缓存优先立即渲染，远端成功后刷新；失败且无缓存时报错。
const BASE_URL = 'https://timmycheng.cn';

const LIST_TTL = 30 * 60 * 1000;
const DETAIL_TTL = 30 * 60 * 1000;
const ABOUT_TTL = 60 * 60 * 1000;
const LIST_KEY = 'tc_works_list_v1';
const DETAIL_KEY_PREFIX = 'tc_work_detail_v1_';
const ABOUT_KEY = 'tc_about_v1';

function request(path) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: BASE_URL + path,
			success(res) {
				if (res.statusCode >= 200 && res.statusCode < 300) resolve(res.data);
				else reject(new Error('HTTP ' + res.statusCode));
			},
			fail: reject,
		});
	});
}

function readCache(key) {
	try {
		const cached = wx.getStorageSync(key);
		if (cached && cached.savedAt && cached.value) return cached;
	} catch (e) {}
	return null;
}

function writeCache(key, value) {
	try {
		wx.setStorageSync(key, { savedAt: Date.now(), value });
	} catch (e) {}
}

// onResult(data, meta)：meta.stale 表示缓存已过 TTL（离线兜底）；
// meta.error 表示远端失败且没有任何可用缓存，data 为 null
function loadWorks(onResult) {
	const cached = readCache(LIST_KEY);
	if (cached) onResult(cached.value, { stale: Date.now() - cached.savedAt > LIST_TTL });
	request('/api/works.json')
		.then((data) => {
			writeCache(LIST_KEY, data);
			onResult(data, {});
		})
		.catch(() => {
			if (!cached) onResult(null, { error: true });
		});
}

function loadWork(id, onResult) {
	const key = DETAIL_KEY_PREFIX + id;
	const cached = readCache(key);
	if (cached) onResult(cached.value, { stale: Date.now() - cached.savedAt > DETAIL_TTL });
	request('/api/works/' + encodeURIComponent(id) + '.json')
		.then((data) => {
			writeCache(key, data);
			onResult(data, {});
		})
		.catch(() => {
			if (!cached) onResult(null, { error: true });
		});
}

function loadAbout(onResult) {
	const cached = readCache(ABOUT_KEY);
	if (cached) onResult(cached.value, { stale: Date.now() - cached.savedAt > ABOUT_TTL });
	request('/api/about.json')
		.then((data) => {
			writeCache(ABOUT_KEY, data);
			onResult(data, {});
		})
		.catch(() => {
			if (!cached) onResult(null, { error: true });
		});
}

module.exports = {
	BASE_URL,
	loadWorks,
	loadWork,
	loadAbout,
};
