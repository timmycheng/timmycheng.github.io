# timmycheng-miniprogram

「Shxt in Mind」微信小程序客户端（原生 JavaScript，零构建链）。内容镜像站点
[timmycheng.cn](https://timmycheng.cn) 的 works 集合，与站点共用一个仓库。

## 数据来源

小程序不连任何后端，数据来自 Astro 站点构建时生成的静态 JSON（随 GitHub Pages 一起部署）：

| 端点                                        | 内容                                                 |
| ------------------------------------------- | ---------------------------------------------------- |
| `https://timmycheng.cn/api/works.json`      | works 列表（pinned 优先、pubDate 倒序）              |
| `https://timmycheng.cn/api/works/<id>.json` | 元信息 + 按语言拆分好的 HTML 正文                    |
| `https://timmycheng.cn/api/about.json`      | 关于页档案（社交链接、经历、认证、荣誉、教育，双语） |

端点源码在站点仓库 `src/pages/api/`；关于页内容与 web 的 about 页共用单一数据源
`src/data/about.ts`（改一处两边同步）。**新增文章只需正常发文章并 push，站点部署后小程序自动
读到新内容，无需发版。**

缓存策略：`wx.setStorageSync` 本地缓存（30 分钟 TTL）优先渲染，远端刷新覆盖；断网时用过期
缓存兜底。

## 本地调试

1. 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 「导入项目」选择本目录 `miniprogram/`，AppID 选「测试号」（`project.config.json` 里默认
   `touristappid`）
3. 右上角「详情 → 本地设置」确认勾选 **「不校验合法域名」**——开发阶段直连
   `https://timmycheng.cn` 不需要备案，也不需要配域名
4. 真机预览同样需要打开调试模式（右下角 vConsole）才能跳过域名校验

## 正式发布前

- [ ] 在[小程序管理后台](https://mp.weixin.qq.com)注册小程序（个人主体即可），拿到正式 AppID，
      替换 `project.config.json` 的 `appid`
- [ ] 「开发 → 开发管理 → 开发设置 → 服务器域名」中，把 `https://timmycheng.cn` 同时加进
      **request 合法域名**和 **downloadFile 合法域名**（后者用于 `_astro/` 下的题头图）。
      合法域名要求 HTTPS + **已 ICP 备案**——若 EdgeOne 已开启含中国大陆的加速区域，说明域名
      已备案，此项即满足
- [ ] 选择可用的个人主体类目提审

## CDN（腾讯 EdgeOne）配置建议

站点源站是 GitHub Pages（境外），国内访问速度取决于 EdgeOne 缓存规则：

- **`/api/*.json`**：规则引擎里单独配置边缘缓存 TTL 10~30 分钟。默认可能不缓存 JSON 或只跟
  源站的 10 分钟 `Cache-Control`，未命中会跨境回源
- **`/_astro/*`**：文件名带内容哈希，可配长缓存（如 1 年）
- **HTML**：短缓存（几分钟）即可
- 验证：`curl -I https://timmycheng.cn/api/works.json`，响应头 `EO-Cache-Status` 二次请求应为
  `HIT`

## 手动验收清单

- [ ] 列表页：下拉刷新、筛选（全部/文章/项目）、pinned 置顶、题头图加载
- [ ] 详情页：正文 rich-text 渲染（标题/代码块/图片自适应）、中英切换、复制链接、分享卡片
- [ ] 关于页：档案内容渲染（经历/认证/荣誉/教育）、中英切换、复制 GitHub/微信/邮箱
- [ ] 断网冷启动报错可重试；有缓存时断网仍可浏览
- [ ] 语言切换持久化：切换后杀掉小程序重开，语言保持
