# Skills Hub — AI 下属唯一入口

> **版本**: V1.2 | **更新时间**: 2026-02-24
> **你是谁**: 你是被用户（PM）派遣来执行任务的 AI 执行助手。
> **本文档的作用**: 收到任务后首先阅读此文档。它会根据用户描述，把你路由到正确的技能脚本。

---

## ⚠️ 铁律（所有技能通用，违反任何一条视为任务失败）

```
1. 必须从本文档开始，按路由执行对应技能脚本
2. 技能脚本的每一步必须顺序执行，禁止跳步
3. 遇到 ⛔ 符号：停止，等用户确认后再继续
4. 未经用户确认，禁止修改任何代码
5. 只做被要求的事，不额外添加"顺手修的"改动
6. 禁止直接修改服务器代码（SSH改文件）
```

---

## 📡 路由表：用户说什么 → 走哪条技能

### 快速判断

| 用户描述含有这些词 | 路由到 |
|-----------------|--------|
| 坏了 / 不能点 / 报错 / 无法 / 卡住 / 白屏 / 500 / 没反应 / 失败 / 不灵 | **→ `.agent/workflows/bug-fix.md`** |
| 新增 / 做一个 / 加一个功能 / 新页面 / 新模块 / 加字段 / 新功能 | **→ `.agent/workflows/new-feature.md`** |
| 部署 / 上线 / 发布 / 更新服务器 / 同步到线上 | **→ `.agent/workflows/deployment.md`** |
| 健康检查 / 系统体检 / 全量体检 / 检查系统状态 | **→ `.agent/workflows/health-check.md`** |
| 扫描前端 / 扫描后台 / 扫描客户端 / 扫描移动端 / 检查有没有问题 / 全量检查 / 审计 | **→ `docs/AI_TASK_DISPATCH.md` §SCAN 流程**（前端） |
| 扫描后端 / 扫描 Edge Function / 检查服务器代码 / 检查 Supabase 函数 | **→ `docs/AI_TASK_DISPATCH.md` §后端SCAN流程**（后端 TS 代码） |
| 扫描并清理 / 扫描然后删除 / 排除废弃 / 找出重复代码 / 找出废弃逻辑 | **→ 先走 SCAN → 等报告确认 → 再走 OPTIMIZE**（串联流程，见下方混合场景） |
| **排查XX功能** / **检查整个功能** / **功能全链路排查** / **排查整个XX** | **→ 跨端功能SCAN**：先列出涉及端，分端扫描，合并报告（见下方混合场景） |
| 优化 / 清理 / 重构 / 整理代码 | **→ `docs/AI_TASK_DISPATCH.md` §OPTIMIZE 流程** |
| 上次没修好 / 还是不行 / 问题依旧 | **→ `docs/AI_TASK_DISPATCH.md` §RETRY 流程** |

### 混合场景判断

| 场景 | 路由策略 |
|------|---------|
| "新增功能 + 需要数据库" | new-feature.md → 内部自动触发 database-migration.md 子程序 |
| "修复bug + 涉及数据库" | bug-fix.md → Step 3 危险检查时自动触发 database-migration.md |
| "修好后部署" | 先走 bug-fix.md，完成后走 deployment.md |
| "新功能做完后部署" | 先走 new-feature.md，完成后走 deployment.md |
| "扫描 + 清理/删除" | 先走 SCAN（输出报告）→ ⛔ 等用户确认 → 再走 OPTIMIZE（执行清理） |
| "扫描后端 + 清理废弃函数" | 先走后端SCAN → ⛔ 等用户确认 → 再走后端OPTIMIZE |
| "全量体检"（前端+后端+系统） | 走 health-check.md（一键执行所有检查） |
| **"排查XX功能"**（原话含"排查"或"检查整个功能"或"功能全链路"） | 👉 **跨端功能SCAN**：① 列出所有涉及端（后台/PC/移动）及对应文件 → ② 对每端分别走 SCAN 清单 → ③ 合并输出一份报告 → ⛔ 等用户确认 → 用户若要修复则转 bug-fix.md |

---

## 🚨 通用危险操作声明

**无论走哪条技能，以下操作必须触发额外安全流程：**

### 危险操作 1：数据库迁移
**识别词**：migration / 迁移 / 新建表 / ALTER TABLE / RLS / 策略 / 权限

→ 在继续执行当前技能前，**必须先完整执行 `.agent/workflows/database-migration.md`**

### 危险操作 2：修改共享组件
**识别文件**：
- `layouts/mobile.vue` / `layouts/pc.vue` / `layouts/mgmt.vue`
- `components/admin/base/AdminModuleLayout.vue`
- `components/admin/base/AdminDataTable.vue`
- `components/admin/base/AdminDataDialog.vue`
- `components/shared/` 下任何文件

→ **必须先 Grep 扫描所有引用该组件的文件，列出完整清单，说明每个文件预期行为不变**

### 危险操作 3：认证/权限逻辑
**识别文件**：`middleware/` / `stores/admin/admin.ts` / `plugins/auth*`

→ **必须先读 `docs/admin/ADMIN_AUTH_PERMISSION.md`，说明修改不影响登录流程**

### 危险操作 4：部署
→ **必须先清理缓存** `rm -rf .nuxt .output`，再构建，见 `deployment.md`

---

## 📚 知识库索引（技能脚本执行中按需查阅）

| 查什么 | 查哪里 |
|--------|--------|
| 模块对照表（哪个功能在哪个文件） | `docs/AI_TASK_DISPATCH.md` §Step3 |
| 后台组件规范 | `docs/admin/ADMIN_ENGINEERING_STANDARD.md` |
| 认证/权限 | `docs/admin/ADMIN_AUTH_PERMISSION.md` |
| 数据库表结构 | `docs/backend/DATABASE_SCHEMA.md` |
| RLS策略 | `docs/backend/RLS_POLICIES.md` |
| 路由常量（后台） | `config/admin-routes.ts` |
| 路由常量（客户端） | `config/client-routes.ts` |
| 已知bug模式 | `docs/AI_TASK_DISPATCH.md` §已知模式 |
| 部署踩坑 | `docs/SERVER_DEPLOYMENT.md` |
| 弹窗规范 | `docs/guides/MODAL_DEVELOPMENT_STANDARD.md` |
| **跨端功能SCAN流程** | `docs/AI_TASK_DISPATCH.md` §跨端功能SCAN流程 |

---

## ✅ 技能脚本列表

| 技能文件 | 适用场景 |
|---------|---------|
| `.agent/workflows/bug-fix.md` | 修复任何功能性bug |
| `.agent/workflows/new-feature.md` | 开发新功能/新页面/新模块 |
| `.agent/workflows/deployment.md` | 部署到服务器 |
| `.agent/workflows/health-check.md` | 全量系统健康检查（前端+后端+系统）|
| `.agent/workflows/database-migration.md` | 数据库结构变更（子程序，被其他技能调用）|
| `.agent/workflows/admin.md` | 新增后台管理模块（被new-feature调用）|

---

## 💬 推荐命令格式（用户快速上手）

> 所有命令只需一句话开头：**"请先阅读 `docs/SKILLS_HUB.md`，然后..."**

| 日常场景 | 推荐命令示例 |
|---------|-------------|
| 修复 Bug | `请先阅读 SKILLS_HUB.md，修复 [页面名] 中 [功能] 无法使用的问题` |
| 新增功能 | `请先阅读 SKILLS_HUB.md，新增 [功能描述]` |
| 部署上线 | `请先阅读 SKILLS_HUB.md，执行完整部署流程` |
| 系统体检 | `请先阅读 SKILLS_HUB.md，对整个系统进行全量健康检查` |
| 前端扫描 | `请先阅读 SKILLS_HUB.md，扫描 [后台/PC端/移动端] 所有模块，输出质量报告` |
| 后端扫描 | `请先阅读 SKILLS_HUB.md，扫描后端 Edge Functions，找出重复代码和废弃函数` |
| 扫描+清理 | `请先阅读 SKILLS_HUB.md，扫描后端并删除重复代码和废弃逻辑` |
| 数据库操作 | `请先阅读 SKILLS_HUB.md，执行数据库迁移：[变更描述]` |
| **跨端功能排查** | `请先阅读 SKILLS_HUB.md，排查[功能名称]功能，范围包括：①后台[模块名] ②PC端[页面名] ③移动端[页面名]，先出报告不要改代码` |
