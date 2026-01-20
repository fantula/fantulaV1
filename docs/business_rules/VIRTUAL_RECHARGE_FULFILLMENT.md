# 虚拟充值订单回执逻辑

## 概述

虚拟充值（`order_type = 'virtual'`）类型的订单，需要用户提交充值信息（如账号、密码等），由后台人工审核后完成发货。

---

## 数据结构

### CDK code 字段格式

```json
{"fields": ["邮箱", "订单", "地方", "规格"]}
```

- `fields` 数组定义用户需要填写的表单字段
- 系统会自动解析并生成对应的输入框

### order_fulfillments 表

| 字段 | 类型 | 说明 |
|------|------|------|
| `order_id` | UUID | 关联订单ID |
| `status` | TEXT | submitted/approved/rejected |
| `payload` | JSONB | 用户提交的数据快照 |
| `reject_reason` | TEXT | 驳回原因 |
| `submitted_at` | TIMESTAMP | 提交时间 |
| `reviewed_at` | TIMESTAMP | 审核时间 |

---

## 用户端逻辑

### 状态与操作

| 回执状态 | 表单状态 | 按钮 | 操作类型 |
|----------|----------|------|----------|
| 无记录 | 空白可编辑 | 填写回执 | INSERT |
| submitted | 预填可编辑 | 修改回执 | UPDATE |
| rejected | 预填可编辑 | 重新提交 | INSERT |
| approved | 空白可编辑 | 再次提交 | INSERT |

### 关键规则

1. **表单始终可编辑** - 任何状态下用户都可以修改表单内容
2. **字段全部可选** - 用户可留空部分字段
3. **submitted状态修改** - 更新原记录，不创建新记录
4. **rejected/approved后提交** - 创建新记录

---

## 后台逻辑

### 审核流程

1. 订单状态为 `pending_delivery` 时显示"审核回执"按钮
2. 弹窗显示用户提交的 `payload` 内容
3. 通过 → 回执状态改为 `approved`，订单状态改为 `active`
4. 驳回 → 回执状态改为 `rejected`，填写驳回原因

---

## 相关文件

- 用户端表单: `components/order/FulfillmentSubmitForm.vue`
- 用户端历史: `components/order/FulfillmentHistory.vue`
- 用户端详情: `pages/profile/order/[id].vue`
- 后台列表: `pages/_mgmt_9Xfa3/orders/recharge/index.vue`
