# 后台管理工程规范 (Admin Engineering Standard)

> **定位**: 定义后台代码结构、开发流程与编码标准。
> **适用**: 所有后台开发者。

---

## 一、 目录结构 (Directory Structure)

遵循 "一端一文件夹" 原则，后台资源严格隔离：

```
nuxt-frontend/
├── pages/admin/             # 页面层 (Page Layer)
│   ├── login.vue            # 登录页
│   ├── index.vue            # 仪表盘
│   ├── products/            # 商品模块
│   └── ...
│
├── api/admin/               # 接口层 (API Layer)
│   ├── product.ts
│   └── index.ts             # 统一导出
│
├── composables/admin/       # 逻辑层 (Logic Layer)
│   ├── useAdminOrderList.ts
│   └── ...
│
├── components/admin/        # 组件层 (Component Layer)
│   ├── base/                # 基础业务组件 (ImageSelector等)
│   └── business/            # 特定业务组件
│
├── layouts/
│   └── mgmt.vue             # 唯一后台布局
│
└── config/
    └── admin-menu.ts        # 菜单配置
```

---

## 二、 开发规范 (Development Standards)

### 2.1 API 开发
*   **位置**: `api/admin/xxx.ts`
*   **客户端**: 必须使用 `getAdminSupabaseClient` (Service Role)。
*   **返回**: 统一使用 `{ success: boolean, data?: T, error?: string }`。
*   **导出**: 必须在 `api/admin/index.ts` 统一导出。

```typescript
// api/admin/demo.ts
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export const adminDemoApi = {
  async getList() {
    const client = getAdminSupabaseClient() // 绕过 RLS
    // ...
  }
}
```

### 2.2 Composable 开发
*   **位置**: `composables/admin/useAdminXxx.ts`
*   **命名**: `useAdmin` 前缀，如 `useAdminOrderList`。
*   **职责**: 封装加载状态、列表数据、分页逻辑、筛选逻辑。

### 2.3 核心组件使用
所有新页面应优先使用标准组件：

| 组件 | 用途 | 示例 |
|------|------|------|
| `StickyFormHeader` | 表单页吸顶头 | 编辑页必用，含返回/保存按钮 |
| `AdminImageSelector` | 图片选择器 | 集成 R2 存储与预览 |
| `AdminSkuSelector` | SKU 选择器 | 处理三级联动与库存展示 |
| `AdminPageSkeleton` | 骨架屏 | 页面加载时占位 |

---

## 三、 代码红线 (Forbidden)

1.  **❌ 禁止混用客户端 API**: 严禁在 admin 中 import `@/utils/supabase` (Anon Key)。
2.  **❌ 禁止私自新增 Layout**: 后台页面必须使用 `layout: 'mgmt'`。
3.  **❌ 禁止硬编码格式**: 金额/日期必须使用 `useBizFormat`。
4.  **❌ 禁止直接修改数据库**: 必须通过 Server Action 或 API 调用，禁止前端 SDK 写操作（尽量封装在 Edge Function）。

---

## 四、 新功能开发检查单 (Checklist)

- [ ] **API**: 创建 `api/admin/xxx.ts` 并导出
- [ ] **Type**: 定义完整的 TypeScript 接口
- [ ] **Composable**: 封装业务逻辑
- [ ] **Page**: 创建 `pages/admin/xxx.vue`，指定 `layout: 'mgmt'`
- [ ] **Permission**: 在部门管理中确认权限可配置
- [ ] **Menu**: 如需菜单，更新 `config/admin-menu.ts`
