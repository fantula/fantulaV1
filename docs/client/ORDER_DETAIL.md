# 订单详情页完整规范

> **路径**: `pages/profile/order/[id].vue` (PC) / `pages/mobile/profile/order/[id].vue` (Mobile)
> **更新日期**: 2026-02-04
> **重要性**: ⭐⭐⭐⭐⭐ 极高

---

## ⚠️ 特别注意

**订单详情是系统中最复杂的页面**，涉及：
- 5种订单状态 × 3种商品类型 = 15种显示组合
- 多个操作按钮的状态机
- PC/Mobile 必须共享相同逻辑

**任何修改前必须阅读本文档！**

---

## 📊 页面结构

```
┌─────────────────────────────────────────────────────────┐
│               顶部吸顶区域 (Sticky Header)              │
│  ┌───────────────────────────────────────────────────┐  │
│  │ [返回]  订单号: XXXXX   ¥99.00                   │  │
│  │                                                   │  │
│  │ 🟢 使用中 [剩余5天]                               │  │
│  │ 状态描述文本...                                   │  │
│  │                                                   │  │
│  │ [联系客服] [查看工单] [续费] [申请退款]            │  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│               滚动内容区 (Scroll Content)              │
│                                                         │
│  ┌───────────────────────────────────┐                 │
│  │ 商品信息卡片                       │                 │
│  │ [图片] 商品名称                    │                 │
│  │        SKU规格 x 数量              │                 │
│  └───────────────────────────────────┘                 │
│                                                         │
│  ┌───────────────────────────────────┐                 │
│  │ 交付内容 (按类型显示不同组件)       │                 │
│  │ - virtual: 回执表单                │                 │
│  │ - shared: 车位信息                 │                 │
│  │ - one_time: CDK密钥               │                 │
│  └───────────────────────────────────┘                 │
│                                                         │
│  ┌───────────────────────────────────┐                 │
│  │ 使用教程 (如有)                    │                 │
│  └───────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 数据来源

### 主要数据表

| 数据 | 来源表 | 字段 |
|------|--------|------|
| 订单基础信息 | `orders` | order_no, status, total_amount, created_at |
| 商品快照 | `orders.product_snapshot` | product_name, image |
| SKU快照 | `orders.sku_snapshot` | spec_combination |
| 交付凭证 | `order_fulfillments` | content, status |
| 车位信息 | `slot_occupancies` | slot_index |
| CDK信息 | `cdks` | cdk_key, account_data |
| 退款申请 | `refund_requests` | status, reason |
| 工单 | `tickets` | id (检查是否有进行中工单) |

### 数据获取

```typescript
// API 位置: api/client/order.ts
// Composable: composables/useOrderDetail.ts

// 获取订单详情
const { data: order } = await orderApi.getDetail(orderId)

// 返回结构
{
  order_no: string,
  status: OrderStatus,
  total_amount: number,
  product_snapshot: { product_name, image },
  sku_snapshot: { spec_combination },
  order_type: 'virtual' | 'shared_account' | 'one_time_cdk',
  fulfillments: [...],
  slot_info: {...},      // shared 类型
  cdk_info: {...},       // one_time 类型
  refund_request: {...}, // 如有退款申请
  active_ticket_id: string | null
}
```

---

## 🔄 状态定义

### 订单状态 (orders.status)

| 状态 | 中文 | 说明 |
|------|------|------|
| `pending_delivery` | 待发货 | 订单已创建，等待发货 |
| `active` | 使用中 | 服务进行中 |
| `expired` | 已过期 | 服务到期 |
| `cancelled` | 已取消 | 用户取消或退款成功 |
| `refunding` | 退款中 | 正在处理退款 |

### 商品类型 (order_type)

| 类型 | 中文 | 交付方式 |
|------|------|----------|
| `virtual` | 虚拟充值 | 用户提交回执，管理员审核 |
| `shared_account` | 账号合租 | 显示车位和账号信息 |
| `one_time_cdk` | 一次性CDK | 直接显示激活码 |

---

## 🎛 操作按钮状态机

### 按钮显示规则

```
┌────────────────────────────────────────────────────────────────┐
│  联系客服    │ 常驻显示                                         │
├────────────────────────────────────────────────────────────────┤
│  查看工单    │ active_ticket_id 存在时显示                       │
│  申请工单    │ active_ticket_id 不存在时显示                     │
├────────────────────────────────────────────────────────────────┤
│  续费        │ (active | expired) && order_type !== 'one_time'  │
├────────────────────────────────────────────────────────────────┤
│  申请退款    │ (pending_delivery | active)                       │
│             │ && order_type !== 'one_time'                       │
│             │ && !pending_refund                                 │
│             │ && cancel_count < 3                                │
├────────────────────────────────────────────────────────────────┤
│  退款已达上限 │ cancel_count >= 3                                 │
├────────────────────────────────────────────────────────────────┤
│  取消退款    │ status === 'refunding'                            │
│             │ && has_pending_refund_request                      │
└────────────────────────────────────────────────────────────────┘
```

### 退款流程状态机

```
正常状态
    │
    │ 点击"申请退款"
    ▼
┌─────────────────┐
│  打开退款弹窗    │
│  填写退款原因    │
└────────┬────────┘
         │ 提交
         ▼
┌─────────────────┐
│  status →      │
│  'refunding'   │
│                │
│  显示:         │
│  - 取消退款按钮 │
│  - 退款处理卡片 │
│  隐藏:         │
│  - 交付内容    │
│  - 使用教程    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
取消退款    管理员审核
    │         │
    ▼         ▼
恢复原状态   退款成功/拒绝
```

---

## 🧩 组件映射

### 按类型显示组件

| 类型 | 组件 | 位置 |
|------|------|------|
| virtual | `FulfillmentSubmitForm` | components/order/ |
| shared_account | `FulfillmentShared` | components/order/ |
| one_time_cdk | `FulfillmentCdk` | components/order/ |

### 按状态显示组件

| 状态 | 特殊组件 |
|------|----------|
| refunding | `MobileRefundingCard` (隐藏交付内容) |
| 其他 | 正常显示交付内容 |

---

## 🔗 PC/Mobile 共享规则

### 必须共享

| 项目 | 说明 |
|------|------|
| API 调用 | 使用相同的 `api/client/order.ts` |
| 数据结构 | 返回相同的订单结构 |
| 状态逻辑 | 按钮显隐规则完全一致 |
| 业务流程 | 退款、续费流程一致 |

### 可以不同

| 项目 | 说明 |
|------|------|
| 布局 | PC 宽屏布局，Mobile 单列布局 |
| 交互方式 | PC 悬停，Mobile 触摸 |
| 组件实现 | 可以有 PC/Mobile 专属组件 |

---

## ⚠️ 修改注意事项

### 修改前必须

1. **阅读本文档**
2. **阅读 `business_rules/ORDER_DETAIL_DISPLAY.md`**
3. **确认不在禁区内**

### 禁止修改

- ❌ 订单状态判断逻辑
- ❌ 按钮显隐规则
- ❌ 数据获取方式
- ❌ 退款流程

### 允许修改

- ✅ UI 布局调整
- ✅ 样式优化
- ✅ 性能优化
- ✅ 代码精简 (保持逻辑不变)

---

## 📋 测试检查清单

```markdown
## 订单详情完整测试

### 状态 × 类型组合测试
- [ ] pending_delivery + virtual
- [ ] pending_delivery + shared
- [ ] pending_delivery + one_time
- [ ] active + virtual
- [ ] active + shared
- [ ] active + one_time
- [ ] expired + virtual
- [ ] expired + shared
- [ ] refunding (任意类型)
- [ ] cancelled (任意类型)

### 按钮状态测试
- [ ] 续费按钮在正确状态显示
- [ ] 退款按钮在正确状态显示
- [ ] 取消次数达到3次后禁用
- [ ] 退款中状态显示取消退款

### PC/Mobile 一致性
- [ ] 相同订单在PC和Mobile显示一致
- [ ] 操作按钮行为一致
```
