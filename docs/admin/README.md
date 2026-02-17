# 后台管理系统文档索引

> **Fantula Admin Panel**
> **版本**: v2.1 | **最后更新**: 2026-02-04

---

## 🎯 快速入口

**AI 工程师请先阅读**: [`../AI_WORKFLOW.md`](../AI_WORKFLOW.md) - 工作流程主框架

---

## 📚 文档列表

### 核心规范 (必读)

| 文档 | 说明 | 场景 |
|------|------|------|
| [ADMIN_ENGINEERING_STANDARD.md](./ADMIN_ENGINEERING_STANDARD.md) | 工程开发规范 | 开发新功能 |
| [ADMIN_TEST_OPTIMIZATION_GUIDE.md](./ADMIN_TEST_OPTIMIZATION_GUIDE.md) | 测试与优化规范 | AI测试优化 |
| [ADMIN_COMPONENT_ROADMAP.md](./ADMIN_COMPONENT_ROADMAP.md) | 组件标准化路线图 | 组件化改造 |

### 系统配置

| 文档 | 说明 |
|------|------|
| [ADMIN_AUTH_PERMISSION.md](./ADMIN_AUTH_PERMISSION.md) | 登录与权限策略 |
| [ADMIN_SYSTEM_CONFIG.md](./ADMIN_SYSTEM_CONFIG.md) | 系统配置参考 |
| [ADMIN_SCHEDULER.md](./ADMIN_SCHEDULER.md) | 定时任务系统 |

### 开发参考

| 文档 | 说明 |
|------|------|
| [ADMIN_DEVELOPMENT_GUIDE.md](./ADMIN_DEVELOPMENT_GUIDE.md) | 开发指南详解 |
| [ADMIN_CORE_WORKFLOW.md](./ADMIN_CORE_WORKFLOW.md) | 核心工作流程 |
| [ADMIN_OPERATION_MANUAL.md](./ADMIN_OPERATION_MANUAL.md) | 操作手册 |


### 🔐 安全与路由
- **伪装路径**: `/manager_portal`
- **实现方式**: Nuxt 文件路由直接映射 (`pages/manager_portal/`)
- **路由常量化**: 所有路径通过 `config/admin-routes.ts` 集中管理
  - `adminRoute(path)` — 生成完整路径
  - `adminRoutes.xxx()` — 常用路径快捷方式
- **目的**: 隐藏后台入口 + 路径单一数据源，降低被暴力扫描的风险。请勿在代码中硬编码 `/manager_portal/...` 路径。

## 🏗 架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Nuxt 3)                        │
├─────────────────────────────────────────────────────────────────┤
│  pages/manager_portal/  │  (伪装路径) 唯一登录入口 + 功能页面         │
│  layouts/mgmt.vue       │  唯一后台布局                            │
│  middleware/mgmt-auth   │  统一认证守卫                            │
├─────────────────────────────────────────────────────────────────┤
│  components/admin/   │  全局基础组件                             │
│  composables/admin/  │  通用逻辑封装                             │
│  stores/admin/       │  状态管理                                │
│  api/admin/          │  后台 API 接口层                         │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Backend (Supabase)                       │
│                    参见: docs/backend/                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 全局组件速查

### 必须使用的组件

| 组件 | 用途 | 场景 |
|------|------|------|
| `AdminDataTable` | 数据表格+分页 | 所有列表页 |
| `AdminDataDialog` | 标准弹窗 | 新增/编辑 |
| `AdminActionCard` | 操作栏 | 列表页顶部 |
| `PageTipHeader` | 页面标题 | 所有页面 |

### 必须使用的 Composable

| Composable | 用途 |
|------------|------|
| `useAdminDialog` | 弹窗状态管理 |
| `useAdminList` | 列表/分页管理 |
| `useBizFormat` | 格式化工具 |
| `useBizConfig` | 状态配置 |

---

## ❌ 禁止事项

1. 创建第二个登录页面
2. 在 admin 中使用 anon key 客户端
3. 绕过 middleware 进行权限检查
4. 硬编码业务状态文案
5. 提交 console.log 调试代码
6. 不使用全局组件而重复造轮子
7. **硬编码 `/manager_portal/...` 路径**（必须使用 `adminRoute()` 或 `adminRoutes`）

---

## 📝 更新日志

### v2.2 (2026-02-17)
- ✅ 路由常量化重构：引入 `config/admin-routes.ts`，消除全部硬编码路径
- ✅ 40+ 文件迁移至 `adminRoute()` / `adminRoutes` API

### v2.1 (2026-02-04)
- ✅ 添加 AI 工作流程主框架
- ✅ 添加测试优化规范
- ✅ 添加组件标准化路线图
- ✅ 整合分散文档

### v2.0 (2026-02-03)
- 添加 `useAdminDialog`/`useAdminList`
- 统一全局组件使用规范
