// 用法：npm run new -- <中文标题> [自定义slug]
// 生成中文版 src/content/works/<slug>.zh.md（中文是主创作语言）。
// 英文版之后用 npm run translate -- <slug> 生成。
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
		.replace(/['’“”]/g, '')
		.replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return s || 'post';
}

const dir = join(process.cwd(), 'src', 'content', 'works');
let slug = slugArg ? toSlug(slugArg) : toSlug(title);
let filePath = join(dir, `${slug}.zh.md`);
for (let i = 2; existsSync(filePath); i++) {
	filePath = join(dir, `${slug}-${i}.zh.md`);
}
slug = filePath
	.split(/[\\/]/)
	.pop()
	.replace(/\.zh\.md$/, '');

const frontmatter = [
	'---',
	'kind: post',
	'lang: zh',
	`title: ${title}`,
	'description: TODO：一句话摘要',
	`pubDate: ${pubDate}`,
	'# heroImage: ../../assets/xxx.jpg',
	'tags: []',
	'---',
	'',
].join('\n');

writeFileSync(filePath, frontmatter, 'utf8');

console.log(`已创建中文版：${filePath}`);
console.log(`本地预览：http://localhost:4321/zh/works/${slug}/`);
console.log(`写完想出英文版：npm run translate -- ${slug}`);
