export function readingMinutes(body: string): number {
	const cjk = (body.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
	const latin = (body.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, ' ').match(/[A-Za-z0-9]+/g) || [])
		.length;
	return Math.max(1, Math.round((cjk + latin) / 220));
}
