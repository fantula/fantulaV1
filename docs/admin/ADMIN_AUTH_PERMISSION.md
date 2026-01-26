# 后台登录与权限策略 (Admin Auth & Permission)

> **定位**: 解析后台安全体系、登录流程与权限控制模型。
> **适用**: 架构师、后端开发者、安全审计。

---

## 一、 安全分层架构 (Security Layering)

> **核心理念**: 登录是唯一信任源 (Login is the Source of Trust)。

| 层级 | 措施 | 职责 | 文件 |
|------|------|------|------|
| **L1 登录层** | Supabase Auth + Admin Table | 验证身份合法性 | `stores/admin/auth.ts` |
| **L2 路由层** | Middleware 拦截 | 拦截未登录/无权限访问 | `middleware/admin-auth.global.ts` |
| **L3 数据层** | Service Role | 信任后端，绕过 RLS | `utils/supabase-admin.ts` |

---

## 二、 登录流程详情 (Login Flow)

1.  **提交凭证**: 用户在 `pages/admin/login.vue` 输入邮箱/密码或验证码。
2.  **Auth 验证**: 调用 Supabase `signInWithPassword` 或 `signInWithOtp`。
3.  **身份核验**:
    *   登录成功后，**立即** 查询 `public.admin_users` 表。
    *   如果表中不存在该 `id` (即该 Auth 用户不是管理员)，**立即登出** 并报错。
4.  **权限加载**:
    *   根据 `admin_users.department_id` 查询 `departments` 表。
    *   获取 `permissions` (JSON 数组) 并存储到 Pinia `useAdminStore`。
5.  **会话保持**: Supabase 自动处理 Token 刷新，Middleware 负责检查 Token 有效性。

---

## 三、 权限控制模型 (RBAC Model)

系统采用 **基于部门的权限控制 (Department-Based RBAC)**。

### 3.1 实体关系
*   **User (管理员)**: 隶属于一个 Department。
*   **Department (部门)**: 拥有一组 Permissions。
*   **Permission (权限)**: 对应前端路由路径 (如 `/admin/orders`)。

### 3.2 权限判定逻辑
*   **超级管理员**: `department.is_super_admin = true`，拥有 `*` 权限，跳过检查。
*   **普通管理员**: 检查 `useAdminStore.permissions` 数组是否包含当前路由路径。
    *   例如访问 `/admin/orders`，检查数组中是否有 `'orders'` 或完整路径。

### 3.3 路由守卫实现
`middleware/admin-auth.global.ts` 逻辑伪代码：

```typescript
export default defineNuxtRouteMiddleware(async (to) => {
  if (!isAdminRoute(to)) return // 仅拦截 admin

  // 1. 检查登录
  if (!user.value) return navigateTo('/admin/login')

  // 2. 检查权限 (非超级管理员)
  if (!adminStore.hasPermission(to.path)) {
    return navigateTo('/admin') // 无权，踢回仪表盘
  }
})
```

---

## 四、 关键数据表定义

### `admin_users`
| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | uuid | PK, FK -> auth.users.id |
| `name` | text | 显示名称 |
| `department_id` | uuid | FK -> departments.id |
| `status` | text | active / inactive |

### `departments`
| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | text | 部门名称 (客服组, 运营组) |
| `permissions` | jsonb | 允许访问的路由列表 `['order', 'user']` |
| `is_super_admin` | bool | 是否超管 |

---

## 五、 最佳实践
*   **不要在页面再次验证**: 相信 Middleware。页面加载时 `adminStore.adminInfo` 必然存在。
*   **新增页面**: 必须同步在【用户管理 -> 部门管理】中添加新的权限配置项，否则普通管理员无法访问。
