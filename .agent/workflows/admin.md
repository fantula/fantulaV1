---
description: Admin page layout standard - how to add or modify admin pages
---

# 后台页面布局标准

## 布局架构

```
┌────────────────────────────────────────────────────────────────────┐
│  顶部 Header：模块标题 │ Pill Tabs（二级导航）                       │
├─────────────┬──────────────────────────────────────────────────────┤
│             │                                                      │
│   左侧      │                                                      │
│   Sidebar   │              页面内容区域                             │
│  （一级导航）│                                                      │
│             │                                                      │
└─────────────┴──────────────────────────────────────────────────────┘
```

## 核心组件

**`AdminModuleLayout.vue`** - 统一布局包装器
- 将模块标题和 Pill Tabs 通过 Teleport 渲染到顶部 Header
- 自动根据路由高亮对应 Tab
- 支持 `hideTabsOn` 配置在特定路径（如 `/post`、`/edit`）隐藏 Tabs

## 文件结构规范

```
pages/_mgmt_9Xfa3/
├── {module}.vue              # 模块入口（定义 tabs 配置）
└── {module}/
    ├── index.vue             # 默认重定向（可选）
    ├── {tab1}/
    │   ├── index.vue         # Tab1 列表页
    │   └── post.vue          # Tab1 新增/编辑页
    ├── {tab2}/
    │   ├── index.vue         # Tab2 列表页
    │   └── post.vue          # Tab2 新增/编辑页
    └── ...
```

## 添加新模块的步骤

### 1. 创建模块入口文件

```vue
<!-- pages/_mgmt_9Xfa3/{module}.vue -->
<template>
  <AdminModuleLayout
    :title="'模块名称'"
    :tabs="tabs"
    default-tab="tab1"
    :hide-tabs-on="['/post', '/edit']"
  >
    <router-view />
  </AdminModuleLayout>
</template>

<script setup lang="ts">
import AdminModuleLayout from '@/components/admin/base/AdminModuleLayout.vue'

const tabs = [
  { name: 'tab1', label: 'Tab1显示名', route: '/_mgmt_9Xfa3/{module}/tab1' },
  { name: 'tab2', label: 'Tab2显示名', route: '/_mgmt_9Xfa3/{module}/tab2' },
]
</script>
```

### 2. 创建子页面目录和文件

```
pages/_mgmt_9Xfa3/{module}/
├── tab1/
│   ├── index.vue    # 列表页（使用标准组件）
│   └── post.vue     # 新增/编辑页（可选）
└── tab2/
    └── index.vue
```

### 3. 在 Sidebar 添加一级导航

修改 `layouts/admin.vue` 或对应的侧边栏组件，添加：

```ts
{ icon: 'IconName', title: '模块名称', path: '/_mgmt_9Xfa3/{module}' }
```

## 子页面模板

```vue
<!-- pages/_mgmt_9Xfa3/{module}/{tab}/index.vue -->
<template>
  <div class="page-container">
    <PageTipHeader 
      title="页面标题" 
      description="页面描述说明"
    />

    <AdminActionCard>
      <template #actions>
        <el-button :icon="Refresh" @click="loadList">刷新</el-button>
        <el-button type="primary" :icon="Plus" @click="handleCreate">新增</el-button>
      </template>
    </AdminActionCard>

    <BulkActionBar 
      v-if="selectedIds.length > 0"
      :count="selectedIds.length"
      @delete="handleBulkDelete"
    />

    <AdminDataTable
      v-loading="loading"
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <!-- 表格列定义 -->
    </AdminDataTable>
  </div>
</template>
```

## ⚠️ 重要规则

1. **不要在 Sidebar 添加下拉子菜单** - 二级导航全部通过顶部 Pill Tabs 实现
2. **不要在页面内添加额外的 Tab 组件** - 统一使用 AdminModuleLayout 的 Tabs
3. **子页面路径规范** - 始终使用 `/{module}/{tab}/index.vue` 结构
4. **新增/编辑页** - 放在对应 Tab 目录下，命名为 `post.vue`
5. **hideTabsOn** - 在表单页面（post/edit）自动隐藏 Tabs

## 现有模块参考

| 模块 | 入口文件 | Tabs 配置 |
|------|---------|-----------|
| 订单管理 | `orders.vue` | recharge, share, cdkey, refund |
| CDK管理 | `cdk.vue` | virtual, accounts, keys, cdks |
| 优惠券管理 | `coupons.vue` | balance, flat, product, stats |