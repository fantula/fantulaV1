# Skills Hub — AI 下属唯一入口

> **版本**: V1.0 | **创建时间**: 2026-02-21
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
| 扫描 / 检查 / 有没有问题 / 审计 / 看看 / 全量检查 | **→ `docs/AI_TASK_DISPATCH.md` §SCAN 流程** |
| 优化 / 清理 / 重构 / 整理代码 | **→ `docs/AI_TASK_DISPATCH.md` §OPTIMIZE 流程** |
| 上次没修好 / 还是不行 / 问题依旧 | **→ `docs/AI_TASK_DISPATCH.md` §RETRY 流程** |

### 混合场景判断

| 场景 | 路由策略 |
|------|---------|
| "新增功能 + 需要数据库" | new-feature.md → 内部自动触发 database-migration.md 子程序 |
| "修复bug + 涉及数据库" | bug-fix.md → Step 3 危险检查时自动触发 database-migration.md |
| "修好后部署" | 先走 bug-fix.md，完成后走 deployment.md |
| "新功能做完后部署" | 先走 new-feature.md，完成后走 deployment.md |

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

---

## ✅ 技能脚本列表

| 技能文件 | 适用场景 |
|---------|---------|
| `.agent/workflows/bug-fix.md` | 修复任何功能性bug |
| `.agent/workflows/new-feature.md` | 开发新功能/新页面/新模块 |
| `.agent/workflows/deployment.md` | 部署到服务器 |
| `.agent/workflows/database-migration.md` | 数据库结构变更（子程序，被其他技能调用）|
| `.agent/workflows/admin.md` | 新增后台管理模块（被new-feature调用）|
