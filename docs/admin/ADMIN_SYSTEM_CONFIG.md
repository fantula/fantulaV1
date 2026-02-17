# 全局设置与系统配置 (System Configuration)

> **定位**: 定义后台系统的全局配置项、菜单布局及通用业务参数。
> **适用**: 前端开发、系统管理员。
> **最后更新**: 2026-02-03

---

## 一、 菜单配置 (Menu Configuration)

后台侧边栏菜单通过代码文件静态配置，非数据库动态生成（以保证稳定性）。

*   **配置文件**: `config/admin-menu.ts`
*   **配置项**: `ADMIN_MENU_ITEMS` Array

### 配置结构
```typescript
interface AdminMenuItem {
    index: string      // 路由路径 (如 /admin/orders)
    path: string       // 同 index，兼容两种用法
    title: string      // 显示标题
    icon?: string      // 图标 (Element Plus Icon Name)
    spacing?: boolean  // 是否在上方显示分割线
}
```

### 可用图标
```
Odometer, List, RefreshLeft, Goods, Files, Key, Ticket, 
User, Service, Money, Picture, PictureFilled, QuestionFilled, 
Document, Collection, Message, Setting, Timer, Monitor, UserFilled
```

### 新增菜单步骤
1. 修改 `config/admin-menu.ts` 添加配置
2. 确保 `pages/manager_portal/` 下存在对应的 `.vue` 文件
3. 在【用户管理 -> 部门管理】中为非超管部门分配权限

---

## 二、 布局系统 (Layout System)

后台仅允许使用一种布局：

### 2.1 布局文件
*   **文件**: `layouts/mgmt.vue`
*   **功能**:
    *   左侧固定侧边栏 (Sidebar) - 支持拖拽排序
    *   顶部导航栏 (Navbar): 含 Header Portal、暗黑模式切换、用户菜单
    *   内容区 (Content): 包含 `<slot />`
    *   自动处理登录页面的布局（登录页不显示侧边栏）

### 2.2 使用方式
```typescript
definePageMeta({
  layout: 'mgmt',           // 强制指定布局
  middleware: ['mgmt-auth'] // 强制鉴权中间件
})
```

### 2.3 Header Portal
布局提供了 `#header-portal` 位置，可通过 Teleport 向顶栏注入内容：

```vue
<ClientOnly>
  <Teleport to="#header-portal">
    <div class="my-header-content">...</div>
  </Teleport>
</ClientOnly>
```

---

## 三、 全局组件清单 (Base Components)

> 路径: `components/admin/base/`

| 组件 | 文件 | 用途 |
|------|------|------|
| **AdminDataTable** | `AdminDataTable.vue` | 数据表格 + 分页封装 |
| **AdminDataDialog** | `AdminDataDialog.vue` | 标准弹窗组件 |
| **AdminActionCard** | `AdminActionCard.vue` | 胶囊形操作栏 |
| **AdminPageSkeleton** | `AdminPageSkeleton.vue` | 页面骨架屏 |
| **AdminModuleLayout** | `AdminModuleLayout.vue` | 模块布局 (Tab导航) |
| **StickyFormHeader** | `StickyFormHeader.vue` | 表单页吸顶头 |
| **AdminImageSelector** | `AdminImageSelector.vue` | 图片选择器 |
| **AdminSkuSelector** | `AdminSkuSelector.vue` | SKU规格选择器 |
| **CategoryPills** | `CategoryPills.vue` | 分类药丸导航 |
| **BulkActionBar** | `BulkActionBar.vue` | 批量操作提示栏 |
| **PageTipHeader** | `PageTipHeader.vue` | 页面标题提示 |
| **AdminStatusTag** | `AdminStatusTag.vue` | 状态标签 |
| **ProductThumbCell** | `ProductThumbCell.vue` | 商品缩略图单元格 |
| **ProductTypeBadge** | `ProductTypeBadge.vue` | 商品类型徽章 |
| **OrderItemCell** | `OrderItemCell.vue` | 订单项展示 |
| **TagInputGroup** | `TagInputGroup.vue` | 标签输入组 |

---

## 四、 全局 Composable (Composables)

> 路径: `composables/admin/`

| Composable | 说明 |
|------------|------|
| `useAdminDialog` | 弹窗状态管理 (visible, loading, form, submit...) |
| `useAdminList` | 列表状态管理 (loading, list, pagination, filters...) |
| `confirmDelete` | 删除确认弹窗 |
| `confirmAction` | 通用确认弹窗 |

---

## 五、 业务字典配置 (Business Config)

所有涉及业务状态的文案、Tag 颜色，统一在 Composable 中管理，禁止硬编码。

*   **文件**: `composables/common/useBizConfig.ts`
*   **使用方式**:
    ```typescript
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()
    
    // 模板中
    <el-tag :type="getOrderStatusType(row.status)">
      {{ getOrderStatusLabel(row.status) }}
    </el-tag>
    ```

**维护指南**:
*   新增订单状态时，必须在此文件更新映射表
*   新增商品类型时，必须在此文件添加定义

---

## 六、 全局工具库 (Global Utils)

| 文件 | 用途 |
|------|------|
| `composables/common/useBizFormat.ts` | 格式化工具 |
| `utils/supabase-admin.ts` | Admin Supabase Client |

### useBizFormat 方法
*   `formatPrice(val)`: 统一金额显示 (保留2位小数)
*   `formatDate(val)`: 统一时间显示 (YYYY-MM-DD HH:mm)
*   `formatQuantity(val)`: 数量格式化

### supabase-admin 方法
*   `getAdminSupabaseClient()`: 获取 Service Role 客户端
*   `resetAdminSupabaseClient()`: 重置客户端

---

## 七、 环境变量 (Environment)

后台系统依赖以下核心变量：

| 变量 | 说明 | 安全级别 |
|------|------|---------|
| `SUPABASE_URL` | 数据库地址 | Public |
| `SUPABASE_KEY` | Anon Key (仅用于登录) | Public |
| `SUPABASE_SERVICE_KEY` | Service Role Key | 🔐 Secret |

> ⚠️ `SUPABASE_SERVICE_KEY` **严禁泄露给客户端**

### 配置位置
*   **本地开发**: `.env` 文件
*   **生产部署**: 环境变量 / Vercel / Docker 配置

---

## 八、 暗黑模式 (Dark Mode)

布局原生支持暗黑模式切换：

*   **切换按钮**: 顶栏右侧太阳/月亮图标
*   **持久化**: 自动保存到 `localStorage` (key: `admin-theme`)
*   **CSS 变量**: 暗黑模式下自动切换以下变量:
    ```css
    --admin-bg
    --admin-aside-bg
    --admin-header-bg
    --admin-text-primary
    --admin-text-regular
    --admin-text-secondary
    --admin-border
    --admin-hover-bg
    ```

---

## 九、 快速参考卡片

### 新建列表页
```bash
1. 创建 pages/manager_portal/xxx/index.vue
2. 使用 useAdminList + AdminDataTable
3. 添加菜单到 config/admin-menu.ts
```

### 新建编辑页
```bash
1. 创建 pages/manager_portal/xxx/edit.vue
2. 使用 StickyFormHeader + el-form
3. 路由: /admin/xxx/edit?id=xxx
```

### 新建弹窗表单
```bash
1. 使用 useAdminDialog + AdminDataDialog
2. 表单使用 el-form + :ref="dialog.formRef"
```
