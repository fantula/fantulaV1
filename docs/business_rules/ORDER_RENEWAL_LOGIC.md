# 续费流程 (Order Renewal Logic)

## 1. 业务逻辑核心

**续费的核心价值**：让用户在**不更换 CDK/车位**的情况下延长使用时间。

### 核心规则

| 规则 | 说明 |
|------|------|
| **触发条件** | 仅 `active` 状态的订单可续费（过期订单资源已释放，不可续费） |
| **SKU查找** | 通过原订单 CDK → `cdk_sku_map` → 获取所有关联 SKU |
| **资源处理** | 复用原资源 (Slot/CDK)，**不扣减新库存** |
| **时间计算** | `新订单.end_time = 旧订单.end_time + 新SKU时长` |
| **订单状态** | 旧订单 → `expired`，新订单 → `active` |
| **价格** | 按 SKU 原价，无续费折扣 |

---

## 2. 数据流程图

```
用户点击"续费"
       ↓
┌─────────────────────────────────────────────────────────┐
│  get_renewal_skus(order_id)                             │
│  ├── 验证: 订单归属、状态=active                          │
│  ├── 提取: cdk_id ← order.cdk_snapshot.locked_cdk_ids[0]│
│  ├── 查询: product_skus JOIN cdk_sku_map ON cdk_id      │
│  └── 返回: { product, skus[], end_time }                │
└─────────────────────────────────────────────────────────┘
       ↓
用户选择SKU + 优惠券
       ↓
┌─────────────────────────────────────────────────────────┐
│  create_renewal_pre_order(sku_id, old_order_id)         │
│  ├── 验证: 旧订单归属、状态=active                        │
│  ├── 复用资源:                                           │
│  │   ├── locked_cdk_ids ← 旧订单.cdk_snapshot            │
│  │   └── locked_slot_ids ← 旧订单.slot_occupancy_ids    │
│  ├── 创建 pre_order:                                    │
│  │   ├── source = 'renew'                               │
│  │   └── related_order_id = old_order_id                │
│  └── 返回: { pre_order_id, order_no }                   │
└─────────────────────────────────────────────────────────┘
       ↓
用户确认支付
       ↓
┌─────────────────────────────────────────────────────────┐
│  confirm_pre_order(pre_order_id, 'balance', coupon_id)  │
│  ├── 检测续费: source='renew' && related_order_id存在    │
│  ├── 时间计算:                                           │
│  │   └── end_time = 旧订单.end_time + 新SKU.duration    │
│  ├── 扣款 + 创建新订单                                   │
│  ├── 资源交接:                                           │
│  │   └── slot_occupancies.order_id → 新订单ID           │
│  ├── 旧订单处理:                                         │
│  │   └── UPDATE orders SET status='expired'             │
│  └── 返回: { order_id, is_renewal:true }                │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 数据库变更

### `pre_orders` 表扩展

| 字段 | 类型 | 说明 |
|------|------|------|
| `related_order_id` | UUID | 被续费的旧订单ID（外键 → orders） |
| `source` | TEXT | 新增 `'renew'` 选项（原有: buy_now, cart） |

---

## 4. 后端函数

### `get_renewal_skus(p_order_id UUID) → JSONB`

**功能**: 获取订单可续费的 SKU 列表及商品信息

**返回结构**:
```json
{
  "success": true,
  "order_id": "uuid",
  "cdk_id": "uuid",
  "end_time": "2026-01-22T00:00:00Z",
  "product": {
    "id": "uuid",
    "name": "Netflix高级会员",
    "image": "https://..."
  },
  "skus": [
    {
      "sku_id": "uuid",
      "spec_combination": { "时长": "30天" },
      "price": 35.00,
      "duration": 30,
      "product_type": "virtual"
    }
  ]
}
```

---

### `create_renewal_pre_order(p_sku_id, p_old_order_id) → JSONB`

**功能**: 创建续费预订单（复用原订单资源）

**关键逻辑**:
1. 验证旧订单归属当前用户、状态为 `active`
2. 从旧订单 `cdk_snapshot` 提取 `locked_cdk_ids`（JSONB → UUID[] 转换）
3. 直接复用 `slot_occupancy_ids`
4. 创建 pre_order，设置 `source='renew'`, `related_order_id=旧订单ID`

---

### `confirm_pre_order` 续费分支

**触发条件**: `source = 'renew' AND related_order_id IS NOT NULL`

**续费专用逻辑**:
1. **时间叠加**: `v_end_time = 旧订单.end_time + 新SKU.duration`
2. **资源交接**: `UPDATE slot_occupancies SET order_id = 新订单ID`
3. **旧订单过期**: `UPDATE orders SET status = 'expired' WHERE id = related_order_id`
4. **钱包描述**: 添加 `(续费)` 标记

---

## 5. 前端组件

### `RenewalModal.vue`

位于订单详情页底部 Action 栏，点击"续费"按钮弹出。

**UI结构**:
- **商品头部**: 商品图片 + 名称 + 当前到期时间
- **规格选择**: spec-group 样式按钮（与商品详情页一致）
- **优惠券**: 可选应用优惠券
- **价格汇总**: 商品金额、优惠、应付金额、续费后到期时间
- **支付按钮**: 直接余额支付，成功后跳转新订单

### `OrderActions.vue`

**续费按钮条件**: `canRenew = isVirtualOrShared && order.status === 'active'`

---

## 6. 相关迁移文件

| 文件 | 内容 |
|------|------|
| `20260119192300_renewal_feature.sql` | 主迁移：字段、函数、confirm逻辑 |
| `20260119194100_improve_renewal_ui.sql` | 返回商品信息 |
| `20260119194700_fix_renewal_jsonb_cast.sql` | 修复 JSONB→UUID[] 转换 |
