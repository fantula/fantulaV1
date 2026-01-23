# 订单详情页面显示规范

> **适用路径**: `pages/profile/order/[id].vue`
> **更新日期**: 2026-01-23

---

## 页面结构

```
┌────────────────────────────────────────────────────────┐
│  顶部吸顶区域 (STICKY HEADER)                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [返回]  订单号: XXXXX   2.00点                   │  │
│  │                                                  │  │
│  │ 🟢 使用中 [剩余5天]                              │  │
│  │ 状态描述文本...                                  │  │
│  │                                                  │  │
│  │ [联系客服] [申请工单] [续费/退款] (操作按钮组)     │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│  内容流 (SCROLL CONTENT)                               │
│  ┌──────────────────────────────────┐                  │
│  │ 商品信息卡片 (Product Info)      │                  │
│  │ [图标] 商品名称                  │                  │
│  │        SKU规格 x数量             │                  │
│  └──────────────────────────────────┘                  │
│                                                        │
│  ┌──────────────────────────────────┐                  │
│  │ 交付内容 (Fulfillment)           │                  │
│  │ (根据 order_type 显示不同组件)    │                  │
│  └──────────────────────────────────┘                  │
│                                                        │
│  ┌──────────────────────────────────┐                  │
│  │ 使用教程 (Tutorial)              │                  │
│  └──────────────────────────────────┘                  │
└────────────────────────────────────────────────────────┘
```

---

## 一、顶部吸顶区域 (Sticky Header)

包含订单核心状态与主要操作，始终固定在页面顶部。

### 1.1 基础信息
| 字段 | 数据来源 |
|------|----------|
| 订单号 | `orders.order_no` |
| 总金额 | `orders.total_amount` |
| 剩余天数 | `orders.expires_at` - 当前时间 (仅 Active 状态显示) |
| 状态图标 | 根据 `orders.status` 映射 |
| 状态标题 | 映射文本 (e.g., 使用中, 待发货) |
| 辅助描述 | 动态显示 (e.g., 到期时间, 退款原因) |

### 1.2 操作按钮组 (Action Buttons)
位于 Header 右下方，根据状态动态显示。

| 按钮 | 显示条件 | 操作 |
|------|----------|------|
| **联系客服** | 常驻 | 打开客服 |
| **查看/申请工单** | 常驻 (根据是否有 activeTicketId 切换) | 跳转工单 |
| **续费** | `active` 或 `expired` (非 OneTime) | 弹窗续费 |
| **取消退款** | `refunding` 或 有 pending 请求 | 撤销退款申请 |
| **申请退款** | `pending_delivery` 或 `active` (非 OneTime) | 弹窗退款 |

---

## 二、商品信息卡片 (Product Info)

位于内容流第一位，展示商品快照信息。

| 字段 | 数据来源 |
|------|----------|
| 商品头图 | `orders.product_snapshot.image` |
| 商品名称 | `orders.product_snapshot.product_name` |
| SKU规格 | `orders.sku_snapshot.spec_combination` |
| 数量 | `orders.quantity` |

---

## 三、交付内容 (Fulfillment) - 按类型区分

### 3.1 虚拟充值 (virtual)
**组件**: `FulfillmentSubmitForm.vue` + `FulfillmentHistory.vue`
*   显示回执填写表单及审核历史。

### 3.2 账号合租 (shared_account)
**组件**: `FulfillmentShared.vue`
*   显示车位信息、账号密码、共享用户列表。

### 3.3 一次性CDK (one_time_cdk)
**组件**: `FulfillmentCdk.vue`
*   显示一组或多组激活码。

---

## 四、使用教程 (Tutorial)

**组件**: `pages/profile/order/[id].vue` (内联)
*   **显示条件**: `cdks.account_data` 中存在图片 URL。
*   **交互**: 点击图片可预览大图。

---

## 五、相关文件

| 文件 | 说明 |
|------|------|
| `pages/profile/order/[id].vue` | 订单详情主页面 |
| `components/order/FulfillmentShared.vue` | 账号合租显示 |
| `components/order/FulfillmentCdk.vue` | 一次性CDK显示 |
| `components/order/FulfillmentSubmitForm.vue` | 虚拟充值回执表单 |
