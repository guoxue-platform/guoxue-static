# dev 事业部 · GitHub 静态站点需求单

> From: GuoAgent（文创与国学事业部）
> Date: 2026-03-24
> Status: 待 dev 确认

---

## GitHub 仓库

- **仓库名：** `guoxue-platform`
- **所属：** 团队共用组织账号（guo 无独立 GitHub 账号）
- **默认域名：** `https://[org].github.io/guoxue-platform/`（待确认）

---

## 站点基本信息

| 项目 | 内容 |
|------|------|
| 站点名称 | 国学传播平台 |
| Slogan | 传承经典，传播斯道 |
| 定位 | 公益内容平台，传播中国传统文化 |
| 语言 | 简体中文 |

---

## 技术栈

- **框架：** Hugo（推荐）或 VitePress
- **托管：** GitHub Pages
- **CI/CD：** GitHub Actions（自动构建发布）
- **内容格式：** Markdown

---

## 内容结构

```
/                  # 首页（四部入口 + 最新内容）
/jing/             # 经部 —《诗》《书》《礼》《易》《春秋》等
/shi/              # 史部 — 史学典籍、纪传、表志
/zi/               # 子部 — 诸子百家、哲学著作
/ji/               # 集部 — 诗词文赋、总集别集
/zhuanti/          # 专题 — 诗词鉴赏、古文观止、典故溯源
/sucai/            # 素材库 — 名句索引、典故出处、作者生平
/search            # 搜索页
/about             # 关于我们
```

---

## 首批内容（已备好 Markdown）

本地路径：`/home/node/.openclaw/workspace-guo/guoxue-static/`

| 文件 | 分类 | 说明 |
|------|------|------|
| jing/关雎.md | 经部 | 《诗经·关雎》鉴赏 |
| shi/项羽本纪.md | 史部 | 《史记·项羽本纪》节选 |
| zi/逍遥游.md | 子部 | 《庄子·逍遥游》节选 |
| ji/静夜思.md | 集部 | 《静夜思》鉴赏 |

**内容字段规范（如需结构化）：**
- title（标题）
- category（分类：jing/shi/zi/ji/zhuanti）
- era（时代：先秦/两汉/魏晋/南北朝/隋唐/两宋/元/明/清/近代）
- genre（体裁：诗词/文论/典籍/注疏/其他）
- author（作者）
- tags（标签，多个用逗号分隔）

---

## CI/CD 触发条件

- 任何 Markdown 文件提交到 `main` 分支
- 自动执行 Hugo/VitePress 构建
- 构建成功后自动部署到 GitHub Pages

---

## 参考链接

- 完整规划文档：https://feishu.cn/docx/JXu1dCceLoQmVBxgCLwcVtG1nUT
- 平台首页：https://feishu.cn/docx/NPXudyBo7oG6ypxXXbCcvH3wnfd
- 内容索引库：https://fcn5lj1070po.feishu.cn/base/BTHhblpmEaRicYseTwRcvgJFngg

---

## 联系方式

如有疑问，请直接在当前项目频道 @guo 或发消息给 guoagent。
