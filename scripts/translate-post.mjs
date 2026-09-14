// 用法：npm run translate -- <slug> [--force]
// 读取 src/content/works/<slug>.zh.md，生成英文版 <slug>.en.md。
//
// 配置了翻译 API 时自动机翻（OpenAI 兼容接口，可用环境变量覆盖）：
//   TRANSLATE_API_KEY   API 密钥（也可用 ZHIPU_API_KEY / ZHIPUAI_API_KEY / OPENAI_API_KEY）
//   TRANSLATE_BASE_URL  默认智谱 https://open.bigmodel.cn/api/paas/v4（OPENAI_API_KEY 时默认 OpenAI）
//   TRANSLATE_MODEL     默认 glm-4-flash（OPENAI_API_KEY 时默认 gpt-4o-mini）
// 没配密钥时生成带 TODO 标记的骨架，正文自己翻。
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const force = args.includes('--force');
const slug = args.filter((a) => !a.startsWith('-'))[0];
if (!slug) {
	console.error('请提供 slug：npm run translate -- <slug> [--force]');
	process.exit(1);
}

const dir = join(process.cwd(), 'src', 'content', 'works');
const zhPath = join(dir, `${slug}.zh.md`);
const enPath = join(dir, `${slug}.en.md`);
if (!existsSync(zhPath)) {
	console.error(`找不到中文版：${zhPath}`);
	console.error('英文为主的老文章可以直接把 .en.md 当源，手动维护。');
	process.exit(1);
}
if (existsSync(enPath) && !force) {
	console.error(`英文版已存在：${enPath}（加 --force 覆盖）`);
	process.exit(1);
}

const raw = readFileSync(zhPath, 'utf8');
const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
if (!m) {
	console.error('frontmatter 解析失败（缺少 --- 包裹）');
	process.exit(1);
}
const fmLines = m[1].split('\n');
const body = raw.slice(m[0].length);
const fmValue = (key) =>
	fmLines
		.find((l) => l.startsWith(`${key}:`))
		?.slice(key.length + 1)
		.trim();
const fmCopy = [
	'kind',
	'pubDate',
	'updatedDate',
	'heroImage',
	'tags',
	'repo',
	'link',
	'status',
	'pinned',
]
	.map((key) => fmLines.find((l) => l.startsWith(`${key}:`)))
	.filter(Boolean);
const title = fmValue('title') || slug;
const description = fmValue('description') || '';

// ── 翻译后端 ──────────────────────────────────────────────
const apiKey =
	process.env.TRANSLATE_API_KEY ||
	process.env.ZHIPU_API_KEY ||
	process.env.ZHIPUAI_API_KEY ||
	process.env.OPENAI_API_KEY;
const isOpenAIOnly =
	!process.env.TRANSLATE_API_KEY &&
	!process.env.ZHIPU_API_KEY &&
	!process.env.ZHIPUAI_API_KEY &&
	!!process.env.OPENAI_API_KEY;
const baseUrl =
	process.env.TRANSLATE_BASE_URL ||
	(isOpenAIOnly ? 'https://api.openai.com/v1' : 'https://open.bigmodel.cn/api/paas/v4');
const model = process.env.TRANSLATE_MODEL || (isOpenAIOnly ? 'gpt-4o-mini' : 'glm-4-flash');

async function translate(text, hint) {
	const res = await fetch(`${baseUrl}/chat/completions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model,
			temperature: 0.3,
			messages: [
				{
					role: 'system',
					content:
						'You are a professional translator for a personal tech blog. ' +
						'Translate Chinese Markdown into natural, concise English prose. ' +
						'Keep the Markdown structure exactly: headings, lists, links, images, bold/italic. ' +
						'Keep fenced code blocks and inline code verbatim. ' +
						'Keep product names and proper nouns as-is. Output ONLY the translated text.',
				},
				{ role: 'user', content: `${hint}\n\n${text}` },
			],
		}),
	});
	if (!res.ok) {
		throw new Error(`翻译接口返回 ${res.status}: ${(await res.text()).slice(0, 300)}`);
	}
	const data = await res.json();
	const out = data.choices?.[0]?.message?.content?.trim();
	if (!out) throw new Error('翻译接口返回了空内容');
	return out;
}

let enTitle, enDescription, enBody;
if (apiKey) {
	console.log(`使用 ${model} @ ${baseUrl} 翻译…`);
	try {
		enTitle = await translate(title, 'Translate this article title.');
		enDescription = await translate(description, 'Translate this article summary.');
		enBody = await translate(body, 'Translate this Markdown article body from Chinese to English.');
	} catch (e) {
		console.error(`机翻失败：${e.message}`);
		console.error('可以改用骨架模式：不设 TRANSLATE_API_KEY 重新运行。');
		process.exit(1);
	}
} else {
	console.log('未配置翻译 API，生成待翻译骨架（配置 TRANSLATE_API_KEY 后可自动机翻）。');
	enTitle = `TODO: translate — ${title}`;
	enDescription = `TODO: translate — ${description}`;
	enBody = `<!-- TODO: translate the body from ${slug}.zh.md -->\n`;
}

const frontmatter = [
	'---',
	...fmCopy,
	'lang: en',
	`title: ${enTitle}`,
	`description: ${enDescription}`,
	'---',
	'',
	enBody,
	'',
].join('\n');

writeFileSync(enPath, frontmatter, 'utf8');
console.log(`已创建英文版：${enPath}`);
console.log(`本地预览：http://localhost:4321/works/${slug}/`);
console.log('记得校对机翻结果（标题、专有名词、代码块无需改动）。');
