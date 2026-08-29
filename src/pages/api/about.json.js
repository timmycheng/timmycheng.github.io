import { about } from '../../data/about';

// 供微信小程序使用的关于页静态 JSON：构建时生成，与 about.astro 共用同一数据源
export async function GET() {
	return new Response(
		JSON.stringify({ updatedAt: new Date().toISOString(), ...about }, null, '\t'),
		{
			headers: { 'Content-Type': 'application/json; charset=utf-8' },
		},
	);
}
