# 后台管理工程规范 (Admin Engineering Standard)

> **定位**: 定义后台代码结构、开发流程与编码标准。
> **适用**: 所有后台开发者。
> **最后更新**: 2026-02-17

---

## 一、 目录结构 (Directory Structure)

遵循 "一端一文件夹" 原则，后台资源严格隔离：

```
nuxt-frontend/
├── pages/manager_portal/    # 页面层 (Page Layer) - 伪装路径
│   ├── login.vue            # 登录页 (唯一入口)
│   ├── index.vue            # 仪表盘
│   ├── products/            # 商品模块
│   ├── orders/              # 订单模块
│   └── ...
│
├── config/
│   ├── admin-menu.ts        # 菜单配置
│   └── admin-routes.ts      # ⭐ 路由常量 (路径唯一真理源)
│
├── api/admin/               # 接口层 (API Layer)
│   ├── product.ts
│   ├── order.ts
│   └── index.ts             # 统一导出
│
├── composables/admin/       # 逻辑层 (Logic Layer)
│   ├── useAdminDialog.ts    # 🆕 通用弹窗管理
│   ├── useAdminList.ts      # 🆕 通用列表管理
│   ├── useAdminOrderList.ts # 业务 Composable
│   └── ...
│
├── components/admin/        # 组件层 (Component Layer)
│   ├── base/                # 基础通用组件 (⭐ 优先使用)
│   └── business/            # 特定业务组件
│
├── stores/admin/
│   └── admin.ts             # 管理员状态
│
├── layouts/
│   └── mgmt.vue             # 唯一后台布局
│
└── middleware/
    └── mgmt-auth.ts         # 后台认证守卫
```

> ⚠️ **路由路径**: 所有导航/跳转必须使用 `adminRoute()` 或 `adminRoutes`（来自 `config/admin-routes.ts`），**禁止硬编码** `/manager_portal/...`。
> ⚠️ **Tab 布局**: 使用 `AdminModuleLayout` 时，子路由内容必须使用 `<NuxtPage />` 渲染，确保 Tab 状态正确同步。

---

## 二、 全局组件标准 (Global Components)

> **核心原则**: 能用全局组件的，坚决不重复写。

### 2.1 基础组件库 (`components/admin/base/`)

| 组件 | 用途 | 必用场景 |
|------|------|---------|
| `AdminDataTable` | 数据表格 + 分页 | 所有列表页面 |
| `AdminDataDialog` | 标准弹窗 | 新增/编辑弹窗 |
| `AdminActionCard` | 操作栏 (筛选+按钮) | 列表页顶部 |
| `AdminPageSkeleton` | 骨架屏加载 | 页面初始化 |
| `StickyFormHeader` | 表单吸顶头 | 编辑页必用 |
| `AdminImageSelector` | 图片选择器 | 含图片的表单 |
| `AdminSkuSelector` | SKU 选择器 | 商品规格选择 |
| `CategoryPills` | 分类导航 | 带分类筛选的列表 |
| `BulkActionBar` | 批量操作栏 | 多选表格 |
| `PageTipHeader` | 页面标题提示 | 页面顶部 |

### 2.2 使用示例

```vue
<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <PageTipHeader title="商品管理" description="管理所有商品信息" />
    
    <!-- 操作栏 -->
    <AdminActionCard>
      <template #default>
        <el-input v-model="filters.keyword" placeholder="搜索" />
      </template>
      <template #actions>
        <el-button @click="loadList">刷新</el-button>
        <el-button type="primary" @click="dialog.openAdd()">新增</el-button>
      </template>
    </AdminActionCard>
    
    <!-- 数据表格 -->
    <AdminDataTable 
      :data="list" 
      :loading="loading" 
      :total="total"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
    >
      <el-table-column prop="name" label="名称" />
      <!-- 更多列 -->
    </AdminDataTable>
    
    <!-- 弹窗 -->
    <AdminDataDialog 
      v-model="dialog.visible.value" 
      :title="dialog.isEdit.value ? '编辑' : '新增'"
      :loading="dialog.loading.value"
      @confirm="dialog.submit"
    >
      <el-form :model="dialog.form" :ref="dialog.formRef">
        <!-- 表单内容 -->
      </el-form>
    </AdminDataDialog>
  </div>
</template>
```

---

## 三、 Composable 标准 (Composables)

### 3.1 通用 Composable

| Composable | 用途 | 导入方式 |
|------------|------|---------|
| `useAdminDialog` | 弹窗状态管理 | `import { useAdminDialog, confirmDelete } from ...` |
| `useAdminList` | 列表状态管理 | `import { useAdminList } from ...` |

### 3.2 `useAdminDialog` 使用示例

```typescript
import { useAdminDialog, confirmDelete } from '@/composables/admin/useAdminDialog'

const dialog = useAdminDialog({
  id: '',
  name: '',
  status: 'enabled'
}, {
  onSubmit: async (form, isEdit) => {
    if (isEdit) {
      return await api.update(form.id, form)
    }
    return await api.create(form)
  },
  onSuccess: () => loadList()
})

// 使用
dialog.openAdd()           // 打开新增弹窗
dialog.openEdit(row)       // 打开编辑弹窗
dialog.submit()            // 提交表单
dialog.close()             // 关闭弹窗

// 删除确认
const handleDelete = async (row) => {
  await confirmDelete(`确认删除 ${row.name}?`, () => api.delete(row.id))
}
```

### 3.3 `useAdminList` 使用示例

```typescript
import { useAdminList } from '@/composables/admin/useAdminList'

const {
  loading, list, total, currentPage, pageSize, filters,
  loadList, handleFilterChange, handleSelectionChange
} = useAdminList<Product, ProductFilters>({
  fetchFn: async ({ page, pageSize, filters }) => {
    return await productApi.getList({ page, pageSize, ...filters })
  },
  defaultFilters: { status: '', keyword: '' },
  defaultPageSize: 20
})
```

---

## 四、 API 开发规范

### 4.1 位置与命名
*   **位置**: `api/admin/xxx.ts`
*   **客户端**: 必须使用 `getSupabaseClient` (遵守 RLS)
*   **返回格式**: `{ success: boolean, data?: T, error?: string }`
*   **导出**: 必须在 `api/admin/index.ts` 统一导出

### 4.2 标准模板

```typescript
// api/admin/demo.ts
import { getSupabaseClient } from '@/utils/supabase'

export const adminDemoApi = {
  async getList(params: { page: number; pageSize: number }) {
    const client = getSupabaseClient()
    const { data, error, count } = await client
      .from('table_name')
      .select('*', { count: 'exact' })
      .range((params.page - 1) * params.pageSize, params.page * params.pageSize - 1)

    if (error) return { success: false, error: error.message }
    return { success: true, data, total: count }
  },

  async create(payload: CreatePayload) {
    const client = getSupabaseClient()
    const { data, error } = await client.from('table_name').insert(payload).select().single()
    if (error) return { success: false, error: error.message }
    return { success: true, data }
  },

  async update(id: string, payload: UpdatePayload) {
    const client = getSupabaseClient()
    const { error } = await client.from('table_name').update(payload).eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  },

  async delete(id: string) {
    const client = getSupabaseClient()
    const { error } = await client.from('table_name').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
  }
}
```

---

## 五、 页面开发模板

### 5.1 列表页标准结构

```vue
<template>
  <div class="page-container">
    <PageTipHeader title="XX管理" description="..." />
    
    <AdminActionCard>
      <template #default><!-- 筛选项 --></template>
      <template #actions><!-- 操作按钮 --></template>
    </AdminActionCard>
    
    <AdminPageSkeleton v-if="initLoading" type="list" />
    
    <AdminDataTable v-else ...>
      <!-- 表格列 -->
    </AdminDataTable>
    
    <AdminDataDialog ...>
      <!-- 表单内容 -->
    </AdminDataDialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ['mgmt-auth'],
  title: 'XX管理'
})

// 使用通用 Composable
const { loading, list, total, ... } = useAdminList(...)
const dialog = useAdminDialog(...)
</script>
```

---

## 六、 代码红线 (Forbidden)

| ❌ 禁止 | 说明 |
|--------|------|
| 混用客户端 API | 严禁在 admin 中 import `@/utils/supabase` (Anon Key) |
| 私自新增 Layout | 后台页面必须使用 `layout: 'mgmt'` |
| 硬编码格式 | 金额/日期必须使用 `useBizFormat` |
| 重复造轮子 | 有全局组件不用，自己写相似代码 |
| 内联弹窗逻辑 | 应使用 `useAdminDialog` 管理弹窗状态 |
| 遗留调试代码 | 禁止提交 `console.log` 调试输出 |

---

## 七、 新功能开发检查单 (Checklist)

- [ ] **API**: 创建 `api/admin/xxx.ts` 并在 `index.ts` 导出
- [ ] **Type**: 定义完整的 TypeScript 接口
- [ ] **Composable**: 使用 `useAdminList` / `useAdminDialog` 或创建业务 Composable
- [ ] **Page**: 创建 `pages/manager_portal/xxx.vue`，指定 `layout: 'mgmt'` + `middleware: ['mgmt-auth']`
- [ ] **Components**: 优先使用 `base/` 下的全局组件
- [ ] **Permission**: 在部门管理中确认权限可配置
- [ ] **Menu**: 如需菜单，更新 `config/admin-menu.ts`
- [ ] **无调试代码**: 提交前清理所有 console.log
