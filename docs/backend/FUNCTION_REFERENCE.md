# 数据库函数参考

> **版本**: V1.0 | **更新时间**: 2026-02-04 | **函数数量**: 39

---

## 📋 函数概览

### 管理员函数 (前缀: admin_)

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `admin_cleanup_ticket_images` | p_days_old int | jsonb | 清理过期工单图片 |
| `admin_delete_coupon_codes` | p_ids uuid[] | jsonb | 删除优惠券码 |
| `admin_generate_coupon_codes` | p_coupon_id, p_quantity, p_mode, p_custom_code, p_usage_limit | jsonb | 生成优惠券码 |
| `admin_review_refund` | p_request_id, p_approved, p_refund_amount, p_admin_note | jsonb | 审核退款 |

### 订单函数

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `create_pre_order` | p_sku_id, p_quantity, p_source | jsonb | 创建预订单 |
| `confirm_pre_order` | p_pre_order_id, p_pay_method, p_coupon_id | jsonb | 确认预订单 |
| `cancel_pre_order` | p_pre_order_id | jsonb | 取消预订单 |
| `process_payment` | p_pre_order_id | jsonb | 处理支付 |
| `complete_purchase_with_cdk` | p_preorder_id, p_cdk_id | jsonb | 完成CDK购买 |
| `renew_order` | p_original_order_id, p_duration_days | jsonb | 续费订单 |

### 车位分配函数 (核心)

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `allocate_slot` | p_cdk_id, p_user_id, p_preorder_id | jsonb | 分配车位 ⚠️核心 |
| `release_slot` | p_slot_id | jsonb | 释放车位 ⚠️核心 |
| `release_preorder_resources` | p_preorder_id | jsonb | 释放预订资源 |

### 库存查询函数

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `get_product_available_stock` | product_id | integer | 商品可用库存 |
| `get_product_virtual_stock` | product_id | integer | 商品虚拟库存 |
| `get_sku_available_stock` | sku_id | integer | SKU可用库存 |
| `get_sku_virtual_stock` | sku_id | integer | SKU虚拟库存 |
| `get_all_skus_with_product_info` | - | TABLE | 获取所有SKU含商品信息 |

### 优惠券函数

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `calculate_coupon_discount` | p_user_id, p_coupon_id, p_order_amount, p_sku_ids | jsonb | 计算优惠金额 |
| `apply_coupon_to_pre_order` | p_pre_order_id, p_coupon_id | jsonb | 应用优惠券 |
| `use_balance_coupon` | p_user_coupon_id, p_user_id | jsonb | 使用余额券 |
| `claim_coupon_code` | p_code, p_user_id | jsonb | 领取兑换码 |

### 清理函数 (定时任务)

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `cleanup_expired_preorders` | - | jsonb | 清理过期预订单 |
| `cleanup_old_expired_preorders` | - | jsonb | 清理旧过期预订单 |
| `cleanup_expired_order_fulfillments` | - | jsonb | 清理过期交付凭证 |
| `cleanup_unverified_users` | - | jsonb | 清理未验证用户 |
| `expire_active_orders` | - | jsonb | 过期活跃订单 |

### 工单函数

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `create_ticket` | p_order_id, p_title, p_content, p_attachments | jsonb | 创建工单 |
| `send_ticket_message` | p_ticket_id, p_content, p_attachments | jsonb | 发送工单消息 |
| `resolve_ticket` | p_ticket_id | jsonb | 解决工单 |

### 用户函数

| 函数名 | 参数 | 返回 | 说明 |
|--------|------|------|------|
| `check_email_available` | email_input | boolean | 检查邮箱可用性 |
| `get_platform_stats` | - | jsonb | 获取平台统计 |
| `cancel_user_refund_request` | p_order_id | jsonb | 取消退款申请 |
| `is_admin` | - | boolean | 检查是否管理员 |

### 触发器函数

| 函数名 | 触发表 | 说明 |
|--------|--------|------|
| `handle_new_user` | auth.users | 新用户创建 profile |
| `handle_user_deletion` | profiles | 用户删除处理 |
| `sync_email_to_profile` | auth.users | 同步邮箱到 profile |
| `set_ticket_no` | tickets | 设置工单编号 |
| `update_channel_recognition` | orders | 更新渠道识别 |
| `trigger_notify_*` 系列 | 多表 | 实时通知触发器 |

---

## 🔒 安全配置

所有函数均已配置:
- ✅ `SECURITY DEFINER` - 以定义者权限执行
- ✅ `SET search_path TO 'public', 'pg_temp'` - 防止注入

---

## 📖 核心函数详解

### allocate_slot (车位分配)

> ⚠️ **核心函数 - 禁止修改**

```sql
allocate_slot(
  p_cdk_id uuid,      -- CDK ID
  p_user_id uuid,     -- 用户 ID
  p_preorder_id uuid  -- 预订单 ID
) RETURNS jsonb
```

**功能**: 为 shared 类型商品分配车位

**返回**:
```json
{
  "success": true,
  "slot_id": "uuid",
  "slot_index": 1
}
```

**错误**:
```json
{
  "success": false,
  "error": "没有可用车位"
}
```

---

### create_pre_order (创建预订单)

```sql
create_pre_order(
  p_sku_id uuid,      -- SKU ID
  p_quantity integer, -- 数量
  p_source text       -- 来源
) RETURNS jsonb
```

**返回**:
```json
{
  "success": true,
  "pre_order_id": "uuid"
}
```

---

### process_payment (处理支付)

```sql
process_payment(
  p_pre_order_id uuid  -- 预订单 ID
) RETURNS jsonb
```

**功能**: 处理余额支付，扣除余额并创建正式订单

**返回**:
```json
{
  "success": true,
  "order_id": "uuid",
  "order_no": "FT2026..."
}
```

---

## 🔧 调用示例

### 从前端调用 (Supabase Client)

```typescript
// 创建预订单
const { data, error } = await supabase.rpc('create_pre_order', {
  p_sku_id: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  p_quantity: 1,
  p_source: 'web'
})

// 处理结果
if (data?.success) {
  const preOrderId = data.pre_order_id
} else {
  console.error(data?.error || error)
}
```

### 从服务端调用 (Nuxt Server API)

```typescript
// server/api/order/create.post.ts
const client = serverSupabaseServiceRole(event)

const { data } = await client.rpc('create_pre_order', {
  p_sku_id: body.skuId,
  p_quantity: body.quantity,
  p_source: 'api'
})
```
