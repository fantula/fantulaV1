# 后台登录与权限策略 (Admin Auth & Permission)

> **定位**: 解析后台安全体系、登录流程与权限控制模型。
> **适用**: 架构师、后端开发者、安全审计。
> **最后更新**: 2026-02-17

---

## 一、 安全分层架构 (Security Layering)

> **核心理念**: 登录是唯一信任源 (Login is the Source of Trust)。

| 层级 | 措施 | 职责 | 文件 |
|------|------|------|------|
| **L1 登录层** | Supabase Auth + Admin Table | 验证身份合法性 | `stores/admin/admin.ts` |
| **L2 路由层** | Middleware 拦截 | 拦截未登录/无权限访问 | `middleware/mgmt-auth.ts` |
| **L3 数据层** | Service Role | 信任后端，绕过 RLS | `utils/supabase-admin.ts` |

---

## 二、 登录流程详情 (Login Flow)

### 2.1 唯一登录入口

**后台系统只有一个登录页面**: `pages/manager_portal/login.vue`

所有未认证的后台访问都会被中间件重定向到此页面（路径 `/manager_portal/login`）。

### 2.2 登录流程

1.  **提交凭证**: 用户在 `pages/manager_portal/login.vue` 输入邮箱/密码或验证码。
2.  **Auth 验证**: 调用 Supabase `signInWithPassword` 或 `signInWithOtp`。
3.  **身份核验**:
    *   登录成功后，**立即** 查询 `public.admin_users` 表。
    *   如果表中不存在该 `id` (即该 Auth 用户不是管理员)，**立即登出** 并报错。
4.  **权限加载**:
    *   根据 `admin_users.department_id` 查询 `admin_departments` 表。
    *   获取 `permissions` (JSON 数组) 并存储到 Pinia `useAdminStore`。
5.  **会话保持**: Supabase 自动处理 Token 刷新，Middleware 负责检查 Token 有效性。

### 2.3 登录方式

| 方式 | 函数 | 说明 |
|------|------|------|
| 密码登录 | `adminStore.login(email, password)` | 标准邮箱+密码认证 |
| OTP登录 | `adminStore.sendOtp(email)` + `adminStore.loginWithOtp(email, code)` | 邮箱验证码认证 |

---

## 三、 权限控制模型 (RBAC Model)

系统采用 **基于部门的权限控制 (Department-Based RBAC)**。

### 3.1 实体关系
*   **User (管理员)**: 隶属于一个 Department。
*   **Department (部门)**: 拥有一组 Permissions。
*   **Permission (权限)**: 对应前端路由路径 (如 `/manager_portal/orders`)，通过 `config/admin-routes.ts` 统一管理。

### 3.2 权限判定逻辑
*   **超级管理员**: `department.name` 包含 "超级" 或 `permissions` 包含 `*`，拥有全部权限。
*   **普通管理员**: 检查 `useAdminStore.permissions` 数组是否包含当前路由路径。
    *   支持子路由匹配：访问 `/manager_portal/users/accounts` 时，会检查 `/manager_portal/users` 权限。

### 3.3 路由守卫实现

`middleware/mgmt-auth.ts` 核心逻辑：

```typescript
// middleware/mgmt-auth.ts
import { adminRoutes, ADMIN_PREFIX } from '@/config/admin-routes'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  // 登录页无需验证
  if (to.path === adminRoutes.login()) return

  const adminStore = useAdminStore()

  if (!adminStore.isInitialized) {
    await adminStore.init()
  }

  // 未登录跳转到登录页
  if (!adminStore.isLoggedIn) {
    return navigateTo(adminRoutes.login())
  }

  // 细粒度权限检查
  if (!adminStore.hasPermission(to.path)) {
    return navigateTo(adminRoutes.home())  // 无权限跳转到仪表盘
  }
})
```

### 3.4 路由常量 (`config/admin-routes.ts`)

所有后台路径通过此文件集中管理，**禁止在代码中硬编码** `/manager_portal/...`：

```typescript
import { adminRoute, adminRoutes } from '@/config/admin-routes'

// 通用函数
adminRoute('products/edit')         // → '/manager_portal/products/edit'
adminRoute(`cdk/edit/${id}`)        // → '/manager_portal/cdk/edit/123'

// 快捷方式
adminRoutes.home()        // → '/manager_portal'
adminRoutes.login()       // → '/manager_portal/login'
adminRoutes.products()    // → '/manager_portal/products'
adminRoutes.orders()      // → '/manager_portal/orders'
```

---

## 四、 关键数据表定义

### `admin_users`
| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | uuid | PK |
| `auth_user_id` | uuid | FK -> auth.users.id |
| `name` | text | 显示名称 |
| `email` | text | 绑定邮箱 |
| `department_id` | uuid | FK -> admin_departments.id |
| `status` | text | enabled / disabled |

### `admin_departments`
| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | uuid | PK |
| `name` | text | 部门名称 (客服组, 运营组, 超级管理员) |
| `permissions` | jsonb | 允许访问的路由列表 `['/manager_portal/orders', '/manager_portal/users']` |

---

## 五、 最佳实践

### ✅ 正确做法
*   **不要在页面再次验证**: 相信 Middleware。页面加载时 `adminStore.adminInfo` 必然存在。
*   **新增页面**: 必须同步在【用户管理 -> 部门管理】中添加新的权限配置项。
*   **使用统一的 Store**: 所有认证相关操作必须通过 `useAdminStore()`。

### ❌ 禁止事项
*   ❌ 禁止在页面组件中直接调用 Supabase Auth API
*   ❌ 禁止创建第二个登录页面
*   ❌ 禁止绕过中间件进行权限检查
*   ❌ 禁止硬编码 `/manager_portal/...` 路径（必须使用 `adminRoute()` / `adminRoutes`）

---

## 六、 Store API 参考

```typescript
// 状态
adminStore.isLoggedIn      // 是否已登录
adminStore.isInitialized   // 是否已初始化
adminStore.adminUser       // 基础用户信息
adminStore.adminInfo       // 完整管理员信息（含部门）
adminStore.permissions     // 权限列表

// 方法
adminStore.init()                          // 初始化（检查登录状态）
adminStore.login(email, password)          // 密码登录
adminStore.sendOtp(email)                  // 发送验证码
adminStore.loginWithOtp(email, code)       // OTP登录
adminStore.logout()                        // 登出
adminStore.hasPermission(path)             // 检查权限
```
