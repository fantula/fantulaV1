# 状态值与枚举定义

> **版本**: V1.0 | **更新时间**: 2026-02-04

本文档定义所有数据库中使用的状态值和枚举，确保前后端一致。

---

## 🎯 订单状态 (orders.status)

| 值 | 含义 | 后续状态 |
|----|------|----------|
| `待发货` | 订单已创建，等待发货 | 待收货、已取消 |
| `待收货` | 已发货，等待用户确认 | 服务中、已取消 |
| `服务中` | 服务进行中 | 已完成、expired |
| `已完成` | 订单完成 | - |
| `已取消` | 用户取消 | - |
| `expired` | 服务过期 | deleted |
| `deleted` | 已清理 | - |

---

## 📦 预订单状态 (pre_orders.status)

| 值 | 含义 | 后续状态 |
|----|------|----------|
| `pending` | 待支付 | confirmed、cancelled、expired |
| `confirmed` | 已确认/已支付 | - |
| `cancelled` | 已取消 | deleted |
| `expired` | 已过期 | deleted |
| `deleted` | 已清理 | - |

---

## 🔑 CDK 状态 (cdks.status)

| 值 | 含义 | 适用类型 |
|----|------|----------|
| `idle` | 空闲可用 | 全部 |
| `using` | 使用中 | shared |
| `used` | 已使用完毕 | one_time |
| `disabled` | 已禁用 | 全部 |

---

## 🚗 车位状态 (slot_occupancies.status)

| 值 | 含义 |
|----|------|
| `idle` | 空闲可分配 |
| `using` | 占用中 |

---

## 💳 退款状态 (refund_requests.status)

| 值 | 含义 |
|----|------|
| `pending` | 待审核 |
| `approved` | 已通过 |
| `rejected` | 已拒绝 |
| `cancelled` | 已取消 |

---

## 📤 交付凭证状态 (order_fulfillments.status)

| 值 | 含义 |
|----|------|
| `submitted` | 已提交 |
| `approved` | 已通过 |
| `rejected` | 已拒绝 |

---

## 👤 用户/管理员状态

### profiles.status
| 值 | 含义 |
|----|------|
| `active` | 正常 |
| `disabled` | 已禁用 |

### admin_users.status
| 值 | 含义 |
|----|------|
| `enabled` | 启用 |
| `disabled` | 禁用 |

---

## 🏷️ 开关状态 (通用)

适用于: `banners`, `products`, `product_skus`, `recharge_tiers`

| 值 | 含义 |
|----|------|
| `on` | 开启 |
| `off` | 关闭 |

---

## 🎫 优惠券码状态 (coupon_codes.status)

| 值 | 含义 |
|----|------|
| `available` | 可用 |
| `exhausted` | 已用完 |

---

## 📧 消息类型 (messages.type)

| 值 | 含义 |
|----|------|
| `system` | 系统消息 |
| `order` | 订单消息 |
| `activity` | 活动消息 |
| `security` | 安全消息 |

---

## 🎫 工单相关

### tickets.status
| 值 | 含义 |
|----|------|
| `processing` | 处理中 |
| `resolved` | 已解决 |

### tickets.priority
| 值 | 含义 |
|----|------|
| `low` | 低 |
| `medium` | 中 |
| `high` | 高 |

### ticket_messages.message_type
| 值 | 含义 |
|----|------|
| `text` | 文字 |
| `image` | 图片 |

---

## 📱 微信登录状态 (wechat_login_sessions.status)

| 值 | 含义 |
|----|------|
| `waiting` | 等待扫码 |
| `scanned` | 已扫码 |
| `bound` | 已绑定 |
| `expired` | 已过期 |

---

## ⏰ 定时任务状态 (scheduled_task_logs.status)

| 值 | 含义 |
|----|------|
| `success` | 成功 |
| `error` | 失败 |

---

## 🛍️ 商品类型 (products.type / cdks.cdk_type)

> ⚠️ **核心枚举 - 禁止修改**

| 值 | 含义 | 库存控制方式 |
|----|------|--------------|
| `virtual` | 虚拟充值 | CDK.stock 减少 |
| `shared` | 账号合租 | slot_occupancies 车位 |
| `one_time` | 一次性CDK | CDK.status 变更 |
