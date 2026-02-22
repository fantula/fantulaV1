---
description: Bug 修复技能脚本 — 逐步执行清单，内嵌危险检查
---

# 🔧 Bug Fix 技能脚本

> **使用前提**: 已读 `docs/SKILLS_HUB.md`，确认走此路线。
> **执行方式**: 从 Step 0 开始，逐步执行，每步完成后打 ✅，遇 ⛔ 必须停止等待用户确认。

---

## Step 0: 收集信息（开始执行前必须完成）

- [ ] **记录用户描述的现象**（复述一遍，用于最后验证）：
  - 哪个页面/功能？
  - 当前行为是什么？
  - 期望行为是什么？

- [ ] **判断属于哪个端**：
  - `manager_portal/` 相关 → **Admin 端**
  - `pages/pc/` 或 PC 组件 → **PC 客户端**
  - `pages/mobile/` 或 H5 → **移动端**
  - `server/` / `supabase/` / 数据库 → **后端/运维**

- [ ] **快速定位模块**：查 `docs/AI_TASK_DISPATCH.md` §Step3 模块对照表

---

## Step 1: 阅读文档链（按端选择，必须读完再继续）

### Admin 端
- [ ] 读 `docs/AI_SOP.md`（操作规范）
- [ ] 读 `docs/admin/ADMIN_ENGINEERING_STANDARD.md`（目录结构/编码标准）
- [ ] 读 `config/admin-routes.ts`（路由常量，唯一真理源）
- [ ] 按需：涉及组件 → `docs/admin/ADMIN_DEVELOPMENT_GUIDE.md`
- [ ] 按需：涉及弹窗 → `docs/guides/MODAL_DEVELOPMENT_STANDARD.md`
- [ ] 按需：涉及登录/权限 → `docs/admin/ADMIN_AUTH_PERMISSION.md`

### PC 客户端
- [ ] 读 `docs/AI_SOP.md`
- [ ] 读 `docs/client/README.md`
- [ ] 读 `docs/SHARED_LOGIC_REFERENCE.md`
- [ ] 读 `config/client-routes.ts`（路由常量）

### 移动端
- [ ] 读 `docs/AI_SOP.md`
- [ ] 读 `docs/mobile/README.md`
- [ ] 读 `docs/SHARED_LOGIC_REFERENCE.md`
- [ ] 读 `config/client-routes.ts`（路由常量）

### 后端/运维
- [ ] 读 `docs/MAINTENANCE.md`
- [ ] 读 `docs/CHANGE_MANAGEMENT.md`
- [ ] 按需：数据库问题 → `docs/backend/DATABASE_SCHEMA.md`
- [ ] 按需：RLS/权限 → `docs/backend/RLS_POLICIES.md`

---

## Step 2: 定位问题代码

- [ ] 根据模块对照表，打开主要文件，阅读相关代码
- [ ] 追踪调用链：用户操作 → @click 事件 → 函数 → API → 结果
- [ ] **检查是否涉及共享组件**（见下方检查清单）

### 共享组件检查（涉及以下文件时必须执行）

如果问题文件或修复方案涉及：
- `layouts/mobile.vue` / `layouts/pc.vue` / `layouts/mgmt.vue`
- `components/admin/base/AdminModuleLayout.vue`
- `components/admin/base/AdminDataTable.vue`
- `components/admin/base/AdminDataDialog.vue`
- `components/shared/` 下任何文件

则**必须**：
- [ ] Grep 扫描所有引用该组件的文件：`grep -r "ComponentName" nuxt-frontend/`
- [ ] 列出所有受影响页面（完整路径清单）
- [ ] 在诊断报告中说明：每个受影响页面的预期行为不变

---

## Step 3: 危险操作检查（⚠️ 必须完成才能进入 Step 4）

### 3.1 数据库检查
- [ ] 修复方案是否需要修改数据库结构（表/列/索引/RLS）？
  - **是** → 暂停此脚本，**先完整执行 `.agent/workflows/database-migration.md`**，完成后再回到 Step 4
  - **否** → 继续

### 3.2 已知危险模式检查
对照 `docs/AI_TASK_DISPATCH.md` §已知模式，检查：
- [ ] 模式1（移动端滚动容器）：涉及移动端页面时，确认有 `height:100% + overflow-y:auto`
- [ ] 模式2（Console守卫）：不直接删除 console，改为 `if (import.meta.dev)` 守卫
- [ ] 模式3（组件渲染验证）：import 了组件必须在 template 中渲染
- [ ] 模式4（Composable状态重置）：init 函数开头显式清空旧状态
- [ ] 模式5（布局变更审计）：修改布局文件必须列出所有受影响子页面
- [ ] 模式7（Nuxt构建缓存）：涉及部署时，构建前必须 `rm -rf .nuxt .output`

### 3.3 认证/权限检查
- [ ] 修复是否涉及 `middleware/` / `stores/admin/admin.ts` / 登录流程？
  - **是** → 必须先读 `docs/admin/ADMIN_AUTH_PERMISSION.md`，确认不破坏登录
  - **否** → 继续

---

## Step 4: 输出诊断报告

⛔ **此步骤完成后必须等用户确认，禁止自行进入 Step 5**

**报告格式**（复制此模板输出）：

```
## 诊断报告: [问题描述]

- **问题文件**: [路径 + 行号]
- **根因**: [用非技术语言解释：为什么会出现这个问题]
- **修复方案**: [具体要改什么，改成什么]
- **影响范围**: [只改这一处/还影响哪些其他文件]
- **危险级别**: [低/中/高] + 理由
- **需更新的文档**: [修完后需同步的文档列表]

⛔ 请确认后我再执行修改。
```

---

## Step 5: 执行修改（用户确认后）

- [ ] 严格按 Step 4 报告中的方案执行
- [ ] 每改一个文件，记录：文件名 + 修改了什么
- [ ] **禁止在此阶段发现其他问题就顺手修**（发现了 → 记录 → 等本次任务结束后报告用户）

---

## Step 6: 验证

- [ ] **编译验证**：`cd nuxt-frontend && npm run build`
  - 失败 → 回退修改，重新诊断
  - 成功 → 继续

- [ ] **功能验证**（对照 Step 0 记录的现象）：
  - 描述修复后的预期行为，告诉用户如何验证

- [ ] 如有 TypeScript 修改：`npx nuxi typecheck`

---

## Step 7: 更新文档

对照以下清单，逐条检查是否需要更新：

- [ ] 修改了路由路径？→ 更新 `config/admin-routes.ts` 或 `config/client-routes.ts`
- [ ] 修改了全局组件？→ 更新 `docs/admin/ADMIN_ENGINEERING_STANDARD.md`
- [ ] 修改了认证逻辑？→ 更新 `docs/admin/ADMIN_AUTH_PERMISSION.md`
- [ ] 修改了 API？→ 更新 `docs/backend/FUNCTION_REFERENCE.md`
- [ ] 修改了数据库？→ 更新 `docs/backend/DATABASE_SCHEMA.md` + `RLS_POLICIES.md`
- [ ] 发现了可复用的新模式？→ 追加到 `docs/AI_TASK_DISPATCH.md` §已知模式
- [ ] 更新以上文档时，同步修改顶部"最后更新"日期

---

## Step 8: 完成报告

输出完成报告：

```
## 修复完成报告

- **修改文件**: [文件路径列表]
- **修复内容**: [一句话总结做了什么]
- **验证结果**: [编译通过 ✅ / 类型检查通过 ✅]
- **用户验证方法**: [告诉用户去哪里、做什么操作验证]
- **文档更新**: [更新了哪些文档 / 无需更新]
```
