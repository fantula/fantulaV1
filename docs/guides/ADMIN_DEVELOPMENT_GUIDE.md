# 后台管理开发规范 (Admin Development Guide)

> 本文档规定了 Fantula 后台管理系统的开发规范，所有新功能开发必须遵循此文档。

## 一、目录结构

```
nuxt-frontend/
├── pages/_mgmt_9Xfa3/       # 后台页面 (路由自动生成)
│   ├── login.vue            # 登录页
│   ├── index.vue            # 仪表盘
│   ├── products/            # 商品管理
│   ├── cdk/                 # CDK 管理
│   ├── coupons/             # 优惠券管理
│   └── orders/              # 订单管理
│
├── api/admin/               # 后台 API (模块化)
│   ├── product.ts           # 商品 API
│   ├── sku.ts               # SKU API
│   ├── order.ts             # 订单 API
│   ├── cdk.ts               # CDK API
│   ├── coupon.ts            # 优惠券 API
│   └── index.ts             # 统一导出
│
├── composables/
│   ├── admin/               # 后台业务逻辑
│   │   ├── useAdminOrderList.ts
│   │   ├── useAdminCdkList.ts
│   │   └── useAdminCouponList.ts
│   └── common/              # 全局工具
│       ├── useBizFormat.ts  # 格式化器
│       └── useBizConfig.ts  # 业务配置
│
├── middleware/
│   └── admin-auth.global.ts # 后台认证守卫
│
└── components/admin/        # 后台组件
```

---

## 二、菜单与路由管理 (Menu & Router)

后台侧边栏菜单配置位于 `pages/_mgmt_9Xfa3.vue` 中。

### 2.1 添加新菜单
1. 打开 `pages/_mgmt_9Xfa3.vue`。
2. 找到 `defaultMenuItems` 数组。
3. 添加新项：
```typescript
{ index: '/_mgmt_9Xfa3/new-module', icon: 'Box', title: '新模块' }
```

### 2.2 添加新图标
1. 顶部导入 Element Plus 图标：
```typescript
import { Box } from '@element-plus/icons-vue';
```
2. 在 `iconMap` 对象中注册：
```typescript
const iconMap = {
  // ...
  Box
};
```

### 2.3 修改管理后台入口 (Security)
为了安全，建议定期修改管理后台路径。
1. 重命名 `pages/_mgmt_9Xfa3/` 文件夹 -> `pages/_secret_admin/`。
2. 修改 `pages/_mgmt_9Xfa3.vue` 文件名 -> `pages/_secret_admin.vue`。
3. 全局搜索 `_mgmt_9Xfa3` 并批量替换为 `_secret_admin` (涉及 `middleware`, `nuxt.config` 等)。

### 2.4 多Tab页面布局 (重要!)

> [!CAUTION]
> **禁止使用侧边栏下拉子菜单**。多个相关功能必须使用**页面内Tab切换**布局。

**正确做法**: 单侧边栏菜单项 + `AdminModuleLayout` 页面内 Tab
**错误做法**: 侧边栏 el-sub-menu 下拉子菜单

#### 示例: 帮助中心 (4个功能)

**1. 侧边栏单项**:
```typescript
// _mgmt_9Xfa3.vue defaultMenuItems
{ index: '/_mgmt_9Xfa3/help-center', icon: 'QuestionFilled', title: '帮助中心' }
```

**2. 父布局 (help-center.vue)**:
```vue
<template>
  <AdminModuleLayout 
    title="帮助中心"
    :tabs="tabs"
  />
</template>

<script setup>
const tabs = [
  { name: 'faq', label: '常见问题', route: '/_mgmt_9Xfa3/help-center/faq' },
  { name: 'faq-cat', label: 'FAQ分类', route: '/_mgmt_9Xfa3/help-center/faq-categories' },
  // ...
]
</script>
```

**3. 子页面**: `help-center/faq.vue`, `help-center/articles.vue` 等

#### 参考模块
- CDK 管理: `cdk.vue` + `cdk/virtual.vue`, `cdk/accounts.vue`
- 帮助中心: `help-center.vue` + `help-center/faq.vue`, `help-center/articles.vue`

---

## 三、核心 UI 组件 (Core Components)

### 3.1 StickyFormHeader (吸顶表单头)
编辑页面的标准头部，包含返回、标题、保存按钮。

```vue
<StickyFormHeader
  title="编辑商品"
  sub-title="修改商品详细信息"
  :loading="submitting"
  @submit="handleSubmit"
  @back="router.back()"
/>
```

### 3.2 AdminImageSelector (图片选择器)
统一的图片上传与选择组件，集成了 R2 存储。

```vue
<AdminImageSelector
  v-model="form.mainImage"
  :multiple="false"
  folder="products" 
/>
```
*   **v-model**: 绑定图片 URL 字符串 (单选) 或 数组 (多选)。
*   **folder**: R2 存储路径 (如 `avatars`, `banners`)。

### 3.3 AdminSkuSelector (SKU 选择器)
用于在表单中选择商品的 SKU，支持 "分类 -> 商品 -> SKU" 三级联动和多选模式。

```html
<AdminSkuSelector 
  v-model="form.skuInfos"
  :categories="categoryList"
  :products="productList"
/>
```

- **Props**:
  - `modelValue`: 选中的 SKU 列表 (数组)。
  - `categories`: 分类列表数据。
  - `products`: 商品列表数据。
- **Features**:
  - 自动处理三级联动。
  - 支持跨商品多选（切换商品后保留之前选中的 SKU）。
  - 双向绑定：外部修改 modelValue 会自动同步到下拉框选中状态。

---

## 四、认证与权限架构

### 4.1 安全分层原则

> **核心理念**：一次验证，处处信任。登录是唯一安全入口，登录成功即证明用户合法。

| 层级 | 职责 | 文件 |
|------|------|------|
| **登录层** | 身份验证 + 角色验证 + 权限加载 | `stores/admin.ts` |
| **路由层** | 权限过滤，无权限跳转仪表盘 | `middleware/admin-auth.global.ts` |
| **页面层** | 业务展示，信任登录状态 | `pages/_mgmt_9Xfa3/*.vue` |
| **API层** | 数据操作，使用 service_role 绕过 RLS | `utils/supabase-admin.ts` |

### 4.2 登录流程

```
用户输入邮箱密码/验证码
    ↓
Supabase Auth 验证
    ↓
检查 admin_users 表（是否为管理员）
    ↓
关联查询 department.permissions
    ↓
存储到 adminStore → 登录成功
```

### 4.3 路由守卫

`middleware/admin-auth.global.ts` 全局拦截所有 `/_mgmt_9Xfa3/*` 路由：
- 未登录 → 跳转登录页
- 无权限 → 跳转仪表盘

### 4.4 开发注意事项

```typescript
// ❌ 错误：页面中重复验证
onMounted(async () => {
  await adminStore.init()  // 不需要！middleware 已处理
})

// ✅ 正确：直接使用登录状态
const user = adminStore.adminInfo  // 信任已登录
```

- ❌ 页面中不要调用 `adminStore.init()`，middleware 会处理
- ❌ API 中不要验证身份，service_role 已绕过 RLS
- ✅ 新增页面路径需要在部门管理添加权限选项

### 4.5 API 调用

```typescript
// 使用 service_role key，绕过 RLS
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
const client = getAdminSupabaseClient()
```

---

## 三、全局工具

### 3.1 useBizFormat - 格式化器
```typescript
const { formatPrice, formatDate } = useBizFormat()

formatPrice(99.5)   // → "99.50"
formatDate(date)    // → "2026-01-16 21:00"
```

### 3.2 useBizConfig - 业务配置
```typescript
const {
  getOrderStatusLabel,   // 订单状态中文
  getOrderStatusType,    // 订单状态 Tag 类型
  getCdkStatusLabel,     // CDK 状态中文
  getCouponTypeLabel,    // 优惠券类型中文
} = useBizConfig()
```

**新增状态/类型时**，必须在 `useBizConfig.ts` 中添加配置。

---

## 四、API 开发规范

### 4.1 文件结构
```typescript
// api/admin/xxx.ts

import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// 1. 类型定义
export interface AdminXxx { ... }

// 2. API 对象
export const adminXxxApi = {
  async getList(params): Promise<{ success: boolean; data: AdminXxx[]; error?: string }> {
    const client = getAdminSupabaseClient()
    // ...
  },
  
  async create(data): Promise<{ success: boolean; error?: string }> { ... },
  async update(id, data): Promise<{ success: boolean; error?: string }> { ... },
  async delete(id): Promise<{ success: boolean; error?: string }> { ... },
}
```

### 4.2 返回格式
**统一返回对象**，不抛异常：
```typescript
{ success: true, data: [...] }
{ success: false, error: '错误信息' }
```

### 4.3 导出
在 `api/admin/index.ts` 中添加导出：
```typescript
export { adminXxxApi, type AdminXxx } from './xxx'
```

---

## 五、Composable 开发规范

### 5.1 命名规则
- 列表页: `useAdminXxxList`
- 表单页: `useAdminXxxForm` / `useAdminXxxEditor`

### 5.2 标准结构
```typescript
// composables/admin/useAdminXxxList.ts

export function useAdminXxxList() {
  // 状态
  const loading = ref(false)
  const list = ref([])
  const pagination = reactive({ page: 1, pageSize: 20 })
  const selectedIds = ref([])

  // 全局工具
  const { formatPrice, formatDate } = useBizFormat()
  const { getXxxStatusLabel, getXxxStatusType } = useBizConfig()

  // 方法
  async function loadList() { ... }
  function handlePageChange(val) { ... }
  function handleDelete(id) { ... }

  return {
    loading, list, pagination, selectedIds,
    loadList, handlePageChange, handleDelete,
    formatPrice, formatDate, getXxxStatusLabel, getXxxStatusType
  }
}
```

---

## 六、页面开发规范

### 6.1 列表页模板
```vue
<script setup lang="ts">
import { useAdminXxxList } from '@/composables/admin/useAdminXxxList'

const {
  loading, list, pagination, selectedIds,
  loadList, handlePageChange, handleDelete,
  formatPrice, formatDate, getStatusLabel, getStatusType
} = useAdminXxxList()

onMounted(() => loadList())
</script>
```

### 6.2 必须包含
- ✅ 分页 (`el-pagination`)
- ✅ 批量选择 (`el-table` selection)
- ✅ 状态 Tag (使用全局配置)
- ✅ 操作列 (编辑/删除)

---

## 七、代码质量

### 7.1 禁止事项
- ❌ 在页面内定义 `formatDate` 本地函数
- ❌ 硬编码 `¥` 符号或日期格式
- ❌ 对象字面量中使用重复键
- ❌ 直接调用 `admin-supabase.ts` 中的遗留函数

### 7.2 推荐做法
- ✅ 使用 `useBizFormat` 格式化
- ✅ 使用 `useBizConfig` 获取状态配置
- ✅ 从 `@/api/admin/xxx` 导入 API
- ✅ 新功能编写对应 Composable

---

## 八、新增模块检查清单

开发新的后台管理模块时，按以下顺序完成：

- [ ] **API 层**: 创建 `api/admin/xxx.ts`
- [ ] **类型定义**: 在 API 文件中定义 `AdminXxx` 接口
- [ ] **统一导出**: 在 `api/admin/index.ts` 添加导出
- [ ] **Composable**: 创建 `composables/admin/useAdminXxxList.ts`
- [ ] **全局配置**: 如有新状态/类型，更新 `useBizConfig.ts`
- [ ] **页面开发**: 使用 Composable，遵循模板
- [ ] **验证**: `npm run build` 无错误

---
 
 ## 十、最佳实践参考 (Gold Standard References)
 
 这里的页面代码是最规范的，开发新功能时请直接参考或复制它们的结构。
 
 ### 10.1 复杂表单 / 编辑页
 **参考对象**: `pages/_mgmt_9Xfa3/products/post.vue`
 *   **特点**:
     *   使用 `StickyFormHeader` 吸顶头。
     *   使用 `AdminImageSelector` 图片选择。
     *   基于 Element Plus Form 校验。
     *   模块化拆分 (基础信息/详情模块)。
 
 ### 10.2 数据列表页
 **参考对象**: `pages/_mgmt_9Xfa3/orders/recharge/index.vue`
 *   **特点**:
     *   使用 `AdminDataTable` (或标准 Table 结构)。
     *   集成 `useAdminOrderList` Composable。
     *   顶部带筛选栏，底部带分页。
     *   支持批量操作。
 
 ### 10.3 弹窗交互
 **参考对象**: `pages/_mgmt_9Xfa3/products/categories.vue`
 *   **特点**:
     *   在列表页直接通过 `el-dialog` 处理轻量级新增/编辑。
 
 ---
 
 ## 十一、数据库规范

参考 `docs/CORE_LOGIC.md`:
- 商品类型: `virtual`, `shared`, `one_time`
- 多对多关联: 必须通过映射表 (`product_sku_map`, `cdk_sku_map`)
- 用户外键: 统一指向 `profiles(id)`

---

*最后更新: 2026-01-16*
