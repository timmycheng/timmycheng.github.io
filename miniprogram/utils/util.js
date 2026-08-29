function pad(n) {
	return String(n).padStart(2, '0');
}

function formatDate(iso) {
	if (!iso) return '';
	const d = new Date(iso);
	return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

// rich-text 内部节点不受页面 WXSS 影响，给常见标签注入内联样式（px 为逻辑像素）
const TAG_STYLES = {
	p: 'margin:0 0 16px;font-size:15px;line-height:1.85;color:#333;',
	h1: 'margin:28px 0 12px;font-size:21px;font-weight:700;color:#191919;',
	h2: 'margin:28px 0 12px;font-size:19px;font-weight:700;color:#191919;',
	h3: 'margin:22px 0 10px;font-size:17px;font-weight:700;color:#191919;',
	h4: 'margin:18px 0 8px;font-size:15px;font-weight:700;color:#191919;',
	blockquote: 'margin:16px 0;padding:8px 14px;border-left:3px solid #d8d2c4;color:#6b6659;',
	ul: 'margin:0 0 16px;padding-left:22px;',
	ol: 'margin:0 0 16px;padding-left:22px;',
	li: 'margin:4px 0;line-height:1.8;',
	pre: 'margin:16px 0;padding:12px;background:#efece4;border-radius:6px;overflow-x:auto;',
	hr: 'border:none;border-top:1px solid #e2ddd1;margin:28px 0;',
	table: 'border-collapse:collapse;width:100%;margin:16px 0;font-size:14px;',
	th: 'border:1px solid #e2ddd1;padding:6px 10px;text-align:left;background:#efece4;',
	td: 'border:1px solid #e2ddd1;padding:6px 10px;text-align:left;',
	code: 'font-family:Menlo,Consolas,monospace;font-size:13px;background:#efece4;padding:1px 5px;border-radius:4px;',
	a: 'color:#a0522d;',
};

function decorateHtml(html) {
	return html
		.replace(
			/<(p|h1|h2|h3|h4|blockquote|ul|ol|li|pre|hr|table|th|td|code|a)\b([^>]*)>/gi,
			(m, tag, attrs) => {
				const style = TAG_STYLES[tag.toLowerCase()];
				return style ? `<${tag}${attrs} style="${style}">` : m;
			},
		)
		.replace(/<img\b([^>]*)>/gi, (m, attrs) => {
			const cleaned = attrs.replace(/\s(width|height)="[^"]*"/gi, '');
			return `<img${cleaned} style="max-width:100%;height:auto;border-radius:4px;">`;
		});
}

module.exports = {
	formatDate,
	decorateHtml,
};
