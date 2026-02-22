---
description: 新功能开发技能脚本 — 逐步执行清单，内嵌危险检查
---

# 🆕 New Feature 技能脚本

> **使用前提**: 已读 `docs/SKILLS_HUB.md`，确认走此路线。
> **执行方式**: 从 Step 0 开始，逐步执行，每步完成后打 ✅，遇 ⛔ 必须停止等待用户确认。

---

## Step 0: 需求确认（开始执行前必须完成）

- [ ] **理解需求**，用中文复述：
  - 这个功能是做什么的？
  - 用户/管理员如何使用它？
  - 成功的标准是什么？（怎样算"做完了"）

- [ ] **判断属于哪个端**：
  - `manager_portal/` → Admin 后台
  - `pages/pc/` → PC 客户端
  - `pages/mobile/` → 移动端 H5
  - 跨端（后台管理 + 前端展示同时需要）→ 标注所有端

- [ ] **列出所有需要创建/修改的文件**（在实际编码前必须完成此步）：

```
预计涉及文件（实施前必须列出）：
- 页面文件: [路径]
- 组件文件: [路径 or "新建"]
- Composable: [路径 or "新建"]
- API 调用: [路径]
- Store: [路径 or "不涉及"]
- 路由配置: [config/admin-routes.ts 或 config/client-routes.ts]
- 数据库: [是/否 → 是则触发 database-migration.md]
- 文档更新: [预计需更新的文档]
```

⛔ **文件列表必须在用户确认后才能开始编码。如果列不清楚，说明需求理解不足，先与用户澄清。**

---

## Step 1: 阅读文档链

### Admin 后台功能
- [ ] 读 `docs/AI_SOP.md`
- [ ] 读 `docs/admin/ADMIN_ENGINEERING_STANDARD.md`（目录结构/编码标准）
- [ ] 读 `docs/admin/ADMIN_DEVELOPMENT_GUIDE.md`（Tab/弹窗/表单开发模式）
- [ ] 读 `docs/admin/ADMIN_COMPONENT_ROADMAP.md`（哪些组件必须用）
- [ ] 读 `config/admin-routes.ts`（路由常量，唯一真理源）
- [ ] 如果是新模块 → 读 `.agent/workflows/admin.md`（后台模块创建规范）
- [ ] 如果涉及弹窗 → 读 `docs/guides/MODAL_DEVELOPMENT_STANDARD.md`

### PC 客户端功能
- [ ] 读 `docs/AI_SOP.md`
- [ ] 读 `docs/client/README.md`
- [ ] 读 `docs/SHARED_LOGIC_REFERENCE.md`
- [ ] 读 `config/client-routes.ts`

### 移动端功能
- [ ] 读 `docs/AI_SOP.md`
- [ ] 读 `docs/mobile/README.md`
- [ ] 读 `docs/SHARED_LOGIC_REFERENCE.md`
- [ ] 读 `config/client-routes.ts`

---

## Step 2: 危险操作检查（⚠️ 在编写任何代码前必须完成）

### 2.1 数据库检查（最高优先级）
- [ ] 新功能是否需要新建表 / 新增列 / 修改 RLS / 新建 RPC？
  - **是** → **暂停此脚本，先完整执行 `.agent/workflows/database-migration.md`**，完成后再回到 Step 3
  - **否** → 继续

### 2.2 共享组件检查
- [ ] 是否需要修改共享组件（见 `docs/SKILLS_HUB.md` 危险操作2的文件列表）？
  - **是** → Grep 扫描所有引用，列出清单，确认不破坏现有功能
  - **否** → 继续

### 2.3 路由注册检查
- [ ] 新功能有新路由吗？
  - **Admin 端** → 必须在 `config/admin-routes.ts` 注册（禁止硬编码路径字符串）
  - **客户端** → 必须在 `config/client-routes.ts` 注册
  - 不注册路由而直接写字符串路径 → **违反铁律**

### 2.4 组件规范检查（Admin 端）
- [ ] 列表页是否使用 `AdminDataTable` 组件？（必须）
- [ ] 弹窗是否使用 `AdminDataDialog` + `useAdminDialog` 组合？（必须）
- [ ] 页面顶部是否使用 `PageTipHeader`？（必须）
- [ ] 父布局页是否使用 `<NuxtPage />` 而非 `<router-view />`？（必须）

### 2.5 移动端规范检查（移动端功能）
- [ ] 每个新建的移动端页面，是否有自己的滚动容器？
  ```css
  /* 必须有，不能只有 min-height: 100vh */
  .mobile-xxx-page {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  ```

---

## Step 3: 输出完整实施计划

⛔ **此步骤完成后必须等用户确认，禁止自行进入 Step 4**

**计划格式**（复制此模板输出）：

```
## 新功能实施计划: [功能名称]

### 功能概述
[用一段话描述功能，站在用户角度]

### 涉及文件（完整清单）
| # | 文件路径 | 操作 | 说明 |
|---|---------|------|------|
| 1 | [路径] | 新建/修改 | [做什么] |
| 2 | ... | ... | ... |

### 数据库变更
[无 / 或：具体的 SQL，以及迁移文件名]

### 实施顺序
1. [先做什么]
2. [再做什么]
3. ...

### 验收标准
[用户如何验证功能做完了]

### 风险说明
[有无影响已有功能的风险]

⛔ 请确认后我再开始编码。
```

---

## Step 4: 执行开发（用户确认后）

**开发顺序（必须遵守）**：
1. 数据库迁移（如有）
2. API 层 / Composable
3. 页面/组件
4. 路由注册
5. 文档更新

**编码中注意事项**：
- [ ] 路由跳转必须使用 `adminRoute()` 或 `mobileRoutes.xxx()` / `pcRoutes.xxx()`
- [ ] 所有异步操作必须有 `loading` 状态
- [ ] 所有 API 调用必须有 `try/catch + ElMessage` 错误提示
- [ ] Console 语句必须用 `if (import.meta.dev)` 守卫
- [ ] 已 import 的组件必须在 `<template>` 中实际渲染（import ≠ 生效）
- [ ] Composable 的 init 函数开头必须显式清空旧状态

---

## Step 5: 验证

- [ ] **编译验证**：`cd nuxt-frontend && npm run build`
  - 失败 → 回退，检查错误
  - 成功 → 继续

- [ ] **功能验证**（对照 Step 0 的验收标准）：
  - 描述每个验收项的预期结果

- [ ] TypeScript 检查：`npx nuxi typecheck`

---

## Step 6: 更新文档

- [ ] 新增路由 → 更新 `config/admin-routes.ts` 或 `config/client-routes.ts` 注释
- [ ] 新增数据库表/列 → 更新 `docs/backend/DATABASE_SCHEMA.md`
- [ ] 新增 RLS 策略 → 更新 `docs/backend/RLS_POLICIES.md`
- [ ] 新增 API → 更新 `docs/backend/FUNCTION_REFERENCE.md`
- [ ] 新增后台模块 → 更新 `docs/AI_TASK_DISPATCH.md` §后台模块对照表
- [ ] 发现了新的可复用模式 → 追加到 `docs/AI_TASK_DISPATCH.md` §已知模式

---

## Step 7: 完成报告

```
## 新功能完成报告

- **功能名称**: [名称]
- **创建文件**: [新建文件列表]
- **修改文件**: [修改文件列表]
- **数据库变更**: [迁移文件 / 无]
- **验证结果**: [编译通过 ✅ / 类型检查通过 ✅]
- **用户验证方法**: [去哪里、做什么操作验证功能]
- **文档更新**: [更新了哪些文档]
```
