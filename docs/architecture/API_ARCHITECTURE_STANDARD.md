# API Architecture Standard (API 架构规范)

> **核心原则**: API 层应按照“业务域 (Domain)”而非“页面 (Page)”进行组织。前端与后台 API 必须物理隔离。

## 1. 目录结构 (Directory Structure)

API 目录位于 `nuxt-frontend/api/`，必须遵循以下层级：

```text
api/
├── admin/               # 🛡️ 后台管理专用 API (Admin APIs)
│   ├── order.ts         # 订单管理 (Orders, Recharge, CDK, Shared)
│   ├── product.ts       # 商品管理 (Products, SKUs)
│   ├── user.ts          # 用户管理 (Profiles, Wallets)
│   ├── cdk.ts           # 卡密库存管理
│   └── stats.ts         # 数据统计
│
├── client/              # 👤 客户端/前台专用 API (Client APIs)
│   ├── order.ts         # 用户下单、查看订单
│   ├── product.ts       # 商品展示
│   └── user.ts          # 个人中心
│
└── common/              # 🔄 通用基础服务 (Common Services)
    ├── supabase.ts      # Supabase 客户端封装
    └── upload.ts        # 文件上传服务
```

## 2. 命名与拆分规则 (Naming & Splitting Rules)

### 2.1 物理隔离原则
- **Admin API**: 必须放在 `api/admin/` 下。通常使用 `service_role` 或高权限客户端，严禁在客户端页面调用。
- **Client API**: 必须放在 `api/client/` 下。只能使用普通认证客户端，受 RLS 严格限制。

### 2.2 业务聚合原则
不要为每个页面创建一个 API 文件。应该按照“数据库资源”或“业务模块”聚合。
- ✅ **正确**: `api/admin/order.ts` (包含获取虚拟订单、合租订单、激活码订单的所有方法)
- ❌ **错误**: `api/admin/recharge_order.ts`, `api/admin/shared_order.ts`

### 2.3 方法命名规范
- `get[Resource]List`: 获取列表 (分页)
- `get[Resource]Detail`: 获取详情
- `create[Resource]`: 创建
- `update[Resource]`: 更新
- `delete[Resource]`: 删除

**示例 (api/admin/order.ts)**:
```typescript
// ✅ 推荐：通过参数区分类型，而不是拆分不同函数
export function getOrderList(params: { type?: string, page: number }) { ... }

// ❌ 不推荐：函数名甚至文件过于琐碎
export function getVirtualOrderList() { ... }
```

## 3. 调用层级 (Layer Architecture)

为了保持代码整洁，页面组件只需关注“展示”，不应直接处理 API 细节。

```mermaid
graph TD
    Page[页面组件 (Pages)] --> Composable[业务逻辑层 (Composables)]
    Composable --> API[数据接口层 (API)]
    API --> Supabase[数据库 (Supabase)]
```

- **API 层**: `api/admin/order.ts` -> 负责 `supabase.from('orders').select(...)`
- **Composable 层**: `useAdminOrderList.ts` -> 负责 `loading`, `total`, `error handling`
- **Page 层**: `recharge/index.vue` -> 负责 `<AdminDataTable :data="list" />`

## 4. 实施计划 (Refactoring Plan)

当前 `api/admin-supabase.ts` 文件过大（God Object），包含所有后台逻辑。我们将逐步拆分：

1. **Step 1**: 创建 `api/admin/order.ts`，将订单查询逻辑从 `admin-supabase.ts` 迁移过去。
2. **Step 2**: 创建 `composables/admin/useAdminOrderList.ts`，引用新的 API。
3. **Step 3**: 重构页面使用 Composable。
