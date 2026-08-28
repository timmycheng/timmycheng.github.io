// 用法：npm run new -- <标题> [自定义slug]
// 例如：npm run new -- "我的第一篇文章" 会生成 src/content/works/<slug>.md
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const title = args[0];
if (!title) {
	console.error('请提供标题：npm run new -- "文章标题" [自定义slug]');
	process.exit(1);
}

const slugArg = args[1];
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const pubDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

function toSlug(input) {
	const s = input
		.toLowerCase()
		.replace(/['’""]/g, '')
		.replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return s || 'post';
}

const dir = join(process.cwd(), 'src', 'content', 'works');
let slug = slugArg ? toSlug(slugArg) : toSlug(title);
let filePath = join(dir, `${slug}.md`);
for (let i = 2; existsSync(filePath); i++) {
	filePath = join(dir, `${slug}-${i}.md`);
}
slug = filePath.split('\\').pop().replace(/\.md$/, '');

const frontmatter = [
	'---',
	`title: ${title}`,
	'# titleZh: 中文标题（可选；提供后详情页/列表出现「中 / EN」切换按钮）',
	'description: TODO：一句话摘要',
	'# descriptionZh: 中文摘要（可选，与 titleZh 搭配使用）',
	`pubDate: ${pubDate}`,
	'# heroImage: ../../assets/xxx.jpg',
	'tags: []',
	'---',
	'',
].join('\n');

writeFileSync(filePath, frontmatter, 'utf8');

console.log(`已创建：${filePath}`);
console.log(`本地预览：http://localhost:4321/works/${slug}/`);
