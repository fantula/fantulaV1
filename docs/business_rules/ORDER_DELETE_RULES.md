# 订单删除业务规则

> **版本**: 1.0 | **更新时间**: 2026-02-18
> **适用范围**: 客户端订单管理、后台数据分析

---

## 一、核心原则

**禁止物理删除任何订单记录**（见 `CORE_LOGIC.md` 开发红线）。

所有"删除"操作均为**软删除**，目的是：
- 保留财务追溯能力
- 支持后台数据分析（取消率、过期率等）
- 用户侧仅隐藏，不影响数据完整性

---

## 二、预支付订单（`pre_orders` 表）

### 规则
- 用户可取消 `status = 'pending'` 的预支付订单
- 取消操作 = 软删除 + 释放锁定资源

### 实现
- **前端**：调用 `clientOrderApi.cancelPreOrder(id)`
- **后端 RPC**：`cancel_pre_order(p_pre_order_id)`
- **数据库效果**：`pre_orders.status → 'deleted'`（软删除）
- **资源回滚**：自动调用 `release_preorder_resources()`，释放 CDK stock / shared slot / one_time CDK

### 后台可见性
- 管理后台可查询 `status = 'deleted'` 的预订单，用于分析用户取消行为
- 前端列表过滤：不展示 `status IN ('deleted', 'expired')` 的预订单

---

## 三、正式订单（`orders` 表）

### 规则
- 用户只能对 `status IN ('expired', 'refunded')` 的订单执行"清理记录"操作
- 清理 = 从用户界面隐藏，**数据库记录保留**
- 进行中的订单（`active`, `pending_delivery`, `refunding`）不允许清理

### 实现
- **前端**：调用 `clientOrderApi.hideOrder(id)`，成功后本地从列表移除
- **数据库**：无需持久化"已隐藏"状态（用户侧隐藏是 UI 层行为，刷新后重新从数据库加载时订单会重新出现）
- **如需持久化**：可在 `orders` 表添加 `hidden_at TIMESTAMPTZ` 列 + `hide_user_order` RPC（TODO，按需实现）

### 后台可见性
- 管理后台始终可查询所有订单记录，不受前端隐藏逻辑影响

---

## 四、状态流转速查

### 预订单 (`pre_orders.status`)
```
pending → converted（支付成功）
pending → deleted（用户主动取消）
pending → expired（15分钟超时，系统自动）
```

### 正式订单 (`orders.status`)
```
pending_delivery → active（服务开通）
active → expired（服务到期）
active/pending_delivery → refunding（申请退款）
refunding → refunded（退款完成）
refunding → active/pending_delivery（拒绝退款，恢复）
expired / refunded → [用户可清理，UI 隐藏]
```

---

## 五、相关代码位置

| 模块 | 文件 |
|------|------|
| 前端取消预订单 | `nuxt-frontend/api/client/order.ts` → `cancelPreOrder()` |
| 前端隐藏正式订单 | `nuxt-frontend/api/client/order.ts` → `hideOrder()` |
| 前端订单列表 Composable | `nuxt-frontend/composables/client/useOrderList.ts` → `deleteOrder()` |
| 后端取消预订单 RPC | `supabase/migrations/20260124051821_v1_schema_baseline.sql` → `cancel_pre_order()` |
| PC 端订单列表页 | `nuxt-frontend/pages/pc/profile/order/index.vue` |
| Mobile 端订单列表页 | `nuxt-frontend/pages/mobile/profile/order/index.vue` |
