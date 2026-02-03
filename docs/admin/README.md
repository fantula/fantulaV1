# 后台管理系统文档索引 (Admin Documentation Index)

> **凡图拉后台管理系统 (Fantula Admin Panel)**
> **版本**: v2.0 | **最后更新**: 2026-02-03

---

## 📚 文档目录

| 文档 | 描述 | 适用人员 |
|------|------|---------|
| [ADMIN_AUTH_PERMISSION.md](./ADMIN_AUTH_PERMISSION.md) | 登录与权限策略 | 架构师、安全审计 |
| [ADMIN_ENGINEERING_STANDARD.md](./ADMIN_ENGINEERING_STANDARD.md) | 工程开发规范 | 所有开发者 |
| [ADMIN_SYSTEM_CONFIG.md](./ADMIN_SYSTEM_CONFIG.md) | 系统配置参考 | 前端开发、运维 |

---

## 🏗 架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Nuxt 3)                        │
├─────────────────────────────────────────────────────────────────┤
│  pages/admin/        │  唯一登录入口 + 功能页面                  │
│  layouts/mgmt.vue    │  唯一后台布局                            │
│  middleware/mgmt-auth│  统一认证守卫                            │
├─────────────────────────────────────────────────────────────────┤
│  components/admin/   │  全局基础组件 (17个)                      │
│  composables/admin/  │  通用逻辑封装 (useAdminDialog, etc.)     │
│  stores/admin/       │  状态管理 (useAdminStore)                │
│  api/admin/          │  后台 API 接口层                         │
├─────────────────────────────────────────────────────────────────┤
│  utils/supabase-admin│  Service Role Client (绕过 RLS)          │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Backend (Supabase)                       │
├─────────────────────────────────────────────────────────────────┤
│  auth.users          │  认证用户                                │
│  admin_users         │  管理员账号                              │
│  admin_departments   │  部门与权限                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ 快速开始

### 1. 创建新的列表页面

```bash
# 1. 创建页面文件
touch pages/admin/xxx/index.vue

# 2. 使用模板
```

```vue
<template>
  <div class="page-container">
    <PageTipHeader title="XX管理" />
    <AdminActionCard>
      <template #actions>
        <el-button @click="loadList">刷新</el-button>
        <el-button type="primary" @click="dialog.openAdd()">新增</el-button>
      </template>
    </AdminActionCard>
    <AdminDataTable :data="list" :loading="loading" :total="total" ...>
      <!-- 列定义 -->
    </AdminDataTable>
    <AdminDataDialog v-model="dialog.visible.value" ...>
      <!-- 表单 -->
    </AdminDataDialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'mgmt', middleware: ['mgmt-auth'] })

import { useAdminList } from '@/composables/admin/useAdminList'
import { useAdminDialog } from '@/composables/admin/useAdminDialog'

const { list, loading, total, loadList } = useAdminList({ ... })
const dialog = useAdminDialog({ ... })
</script>
```

### 2. 添加到菜单

编辑 `config/admin-menu.ts`:
```typescript
export const ADMIN_MENU_ITEMS = [
  // ... 现有菜单
  { index: '/admin/xxx', path: '/admin/xxx', icon: 'Goods', title: 'XX管理' },
]
```

### 3. 配置权限

在【用户管理 -> 部门管理】中为相应部门添加 `/admin/xxx` 权限。

---

## 🔒 安全要点

| 要求 | 实现方式 |
|------|---------|
| 单一登录入口 | `/admin/login.vue` 是唯一登录页面 |
| 统一认证 | `middleware/mgmt-auth.ts` 全局拦截 |
| 细粒度权限 | `useAdminStore.hasPermission()` |
| 数据安全 | Service Role Key 仅在服务端/后台使用 |

---

## 🧩 组件速查

### 表格相关
```vue
<AdminDataTable :data :loading :total v-model:current-page v-model:page-size />
<BulkActionBar :count @delete />
```

### 弹窗相关
```vue
<AdminDataDialog v-model :title :loading @confirm />
```

### 表单相关
```vue
<StickyFormHeader :loading @save @back />
<AdminImageSelector v-model />
<AdminSkuSelector v-model />
```

### 布局相关
```vue
<PageTipHeader :title :description />
<AdminActionCard>
  <template #default />
  <template #actions />
</AdminActionCard>
<CategoryPills v-model :items />
```

---

## 🛠 常用 Composable

```typescript
// 弹窗管理
import { useAdminDialog, confirmDelete, confirmAction } from '@/composables/admin/useAdminDialog'

// 列表管理
import { useAdminList } from '@/composables/admin/useAdminList'

// 格式化
import { useBizFormat } from '@/composables/common/useBizFormat'

// 业务配置
import { useBizConfig } from '@/composables/common/useBizConfig'
```

---

## ❌ 禁止事项

1. **禁止创建第二个登录页面**
2. **禁止在 admin 中使用 anon key 客户端**
3. **禁止绕过 middleware 进行权限检查**
4. **禁止硬编码业务状态文案**
5. **禁止提交 console.log 调试代码**
6. **禁止重复造轮子（有全局组件必须使用）**

---

## 📝 变更日志

### v2.0 (2026-02-03)
- ✅ 添加 `useAdminDialog` Composable
- ✅ 添加 `useAdminList` Composable
- ✅ 清理调试代码
- ✅ 更新所有文档
- ✅ 统一全局组件使用规范
