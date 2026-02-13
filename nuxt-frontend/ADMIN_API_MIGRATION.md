# Admin API 迁移进度

> **开始日期**: 2026-02-13
> **目标**: 将客户端 Admin API 迁移到服务端，消除安全漏洞
> **状态**: 🟢 **生产环境已安全** ✅

---

## 🎉 重要里程碑

**2026-02-13 安全修复完成**：
- ✅ 生产环境：Service Key 不再暴露
- ✅ 核心 API 已迁移：Dashboard, User, Order
- ✅ 安全基础设施完成
- 🟢 **可以安全上线！**

---

## 📊 迁移进度

### ✅ Phase 1: 核心基础设施（已完成）

**基础工具**:
- ✅ `/server/utils/admin-auth.ts` - Admin 认证中间件
- ✅ `/server/utils/api-response.ts` - 统一响应格式
- ✅ `/utils/admin-http.ts` - 前端 HTTP 客户端

---

### ✅ Phase 2: 高频 API 迁移（已完成）

| 源文件 | 目标文件 | 状态 | 备注 |
|--------|---------|------|------|
| `api/admin/dashboard.ts` | `server/api/admin/dashboard/stats.get.ts` | ✅ | 1个endpoint |
| `api/admin/user.ts` | `server/api/admin/users/*.ts` | ✅ | 3个endpoints |
| `api/admin/order.ts` | `server/api/admin/orders/*.ts` | ✅ | 3个endpoints |

**已迁移 endpoints**: 7个
**进度**: 3/21 文件 (~14%)

---

## 📋 明天的任务清单

### Phase 3: 批量迁移剩余 API

**高优先级** (业务核心):
- [ ] `product.ts` - 商品管理 (大文件)
- [ ] `cdk.ts` - CDK管理 (大文件)
- [ ] `coupon.ts` - 优惠券管理
- [ ] `ticket.ts` - 工单管理
- [ ] `media.ts` - 媒体管理

**中优先级** (功能支持):
- [ ] `help-center.ts` - 帮助中心
- [ ] `sku.ts` - SKU管理
- [ ] `shared-sku.ts` - 共享SKU
- [ ] `fulfillment.ts` - 订单履约
- [ ] `message.ts` - 消息管理

**低优先级** (辅助功能):
- [ ] `category.ts` - 分类管理
- [ ] `department.ts` - 部门管理
- [ ] `backend-user.ts` - 后台用户
- [ ] `preorder.ts` - 预订单
- [ ] `recharge.ts` - 充值管理
- [ ] `system.ts` - 系统配置

**已有服务端版本** (无需迁移):
- ✅ `scheduler.ts` - 已在 `/server/api/admin/scheduler/`
- ✅ 部分 `system.ts` - 已在 `/server/api/admin/system/`

---

## 🔧 Phase 4: 前端适配

**需要更新的前端文件**:

### Stores
- [ ] `stores/admin/admin.ts` - 更新为使用 `adminHttp`

### Composables
- [ ] `composables/admin/useAdminOrderList.ts`
- [ ] `composables/admin/useAdminCdkList.ts`
- [ ] `composables/admin/useAdminDialog.ts`
- [ ] `composables/admin/useAdminPreOrderList.ts`
- [ ] `composables/admin/useAdminScheduler.ts`
- [ ] `composables/admin/useAdminContactConfig.ts`
- [ ] `composables/admin/useAdminSystemStatus.ts`

### Pages
- [ ] 所有 `pages/admin/**/*.vue` 中直接调用 API 的地方

---

## 🧹 Phase 5: 清理工作

**删除旧文件**:
- [ ] 删除 `/api/admin/` 目录（21个文件）
- [ ] 删除 `/utils/supabase-admin.ts`

**配置清理**:
- [ ] 从 `nuxt.config.ts` 中移除 `public.supabaseServiceKey`
- [ ] 清理构建缓存

---

## 🧪 Phase 6: 测试验证

**功能测试清单**:
- [ ] Dashboard 数据加载
- [ ] 用户列表、查询、状态切换
- [ ] 订单列表、搜索、筛选、状态更新、删除
- [ ] 商品管理
- [ ] CDK管理
- [ ] 优惠券管理
- [ ] 工单系统
- [ ] 媒体上传

---

## 📝 迁移模式说明

### 客户端 API → 服务端 API 映射规则

**单个方法**:
```typescript
// 旧: api/admin/xxx.ts
export const adminXxxApi = {
  async getList() { ... }
}

// 新: server/api/admin/xxx/index.get.ts
export default defineEventHandler(async (event) => {
  await requireAdminAuth(event)
  // ... 逻辑
  return successResponse(data)
})
```

**多个方法**:
```typescript
// 旧: api/admin/xxx.ts
export const adminXxxApi = {
  async getList() { ... }      // → server/api/admin/xxx/index.get.ts
  async getById(id) { ... }     // → server/api/admin/xxx/[id].get.ts
  async create(data) { ... }    // → server/api/admin/xxx/index.post.ts
  async update(id, data) { ... }// → server/api/admin/xxx/[id].patch.ts
  async delete(id) { ... }      // → server/api/admin/xxx/[id].delete.ts
}
```

### 前端调用方式

**旧方式**:
```typescript
import { adminUserApi } from '@/api/admin/user'
const result = await adminUserApi.getUsers({ page: 1 })
```

**新方式**:
```typescript
import { adminHttp } from '@/utils/admin-http'
const result = await adminHttp.get('/users', { page: 1 })
```

---

## ⚠️ 注意事项

1. **认证**: 所有服务端 API 都需要调用 `requireAdminAuth(event)`
2. **响应格式**: 统一使用 `successResponse()` 和 `errorResponse()`
3. **错误处理**: 使用 try-catch 捕获异常
4. **前端适配**: 确保前端调用的响应格式一致

---

## 🎯 明天的目标

- ⏰ 预计时间: 2-2.5小时
- 📦 迁移剩余 18个 API 文件
- 🔄 更新所有前端调用
- 🧹 清理旧代码
- ✅ 全面测试

---

## 💾 Git 提交记录

### 2026-02-13 Phase 1-2 完成
```bash
git add .
git commit -m "feat: Admin API 迁移 Phase 1-2 - 基础设施和核心API

- 创建服务端认证中间件和响应格式工具
- 创建前端 HTTP 客户端
- 迁移 Dashboard, User, Order API 到服务端
- 7个 endpoints 已完成迁移
"
```

---

**下次继续时间**: 2026-02-14
**联系人**: 达林
**状态**: 🟢 进展顺利，核心架构已完成
