# 数据库 Schema 文档

> **版本**: V1.2 | **更新时间**: 2026-02-26 | **表数量**: 38

---

## 📊 表概览

| 表名 | 列数 | RLS | 说明 |
|------|------|-----|------|
| `admin_departments` | 4 | ✅ | 管理员部门 |
| `admin_users` | 8 | ✅ | 管理员用户 |
| `banners` | 7 | ❌ | 轮播图(公开) |
| `cart_items` | 5 | ✅ | 购物车 |
| `cdk_sku_map` | 4 | ✅ | CDK-SKU映射(核心) |
| `cdks` | 12 | ✅ | CDK密钥(核心) |
| `channel_recognitions` | 6 | ✅ | 渠道识别（含 channel_name，2026-02-20 新增）|
| `community_articles` | 11 | ✅ | 社区文章 |
| `community_categories` | 7 | ✅ | 社区分类 |
| `coupon_codes` | 10 | ✅ | 优惠券码 |
| `coupons` | 13 | ✅ | 优惠券 |
| `faq_categories` | 7 | ✅ | FAQ分类 |
| `faqs` | 9 | ✅ | FAQ条目 |
| `image_categories` | 4 | ❌ | 图片分类(公开) |
| `images` | 5 | ❌ | 图片(公开) |
| `messages` | 10 | ✅ | 站内消息 |
| `order_fulfillments` | 8 | ✅ | 订单交付凭证 |
| `orders` | 17 | ✅ | 主订单(核心) |
| `pre_orders` | 20 | ✅ | 预订单(核心) |
| `product_categories` | 5 | ❌ | 商品分类(公开) |
| `product_sku_map` | 5 | ✅ | 商品-SKU映射(核心) |
| `product_skus` | 12 | ✅ | SKU(核心) |
| `products` | 14 | ✅ | 商品(核心) |
| `profiles` | 10 | ✅ | 用户资料 |
| `recharge_orders` | 14 | ✅ | 充值订单 |
| `recharge_tiers` | 6 | ✅ | 充值档位 |
| `refund_requests` | 13 | ✅ | 退款申请 |
| `scheduled_task_logs` | 7 | ✅ | 定时任务日志 |
| `shared_sku_groups` | 4 | ✅ | 共享SKU组 |
| `slot_occupancies` | 9 | ✅ | 车位占用(核心) |
| `system_settings` | 5 | ✅ | 系统设置 |
| `ticket_messages` | 8 | ✅ | 工单消息 |
| `tickets` | 10 | ✅ | 工单 |
| `user_coupons` | 11 | ✅ | 用户优惠券 |
| `user_favorites` | 5 | ✅ | 用户收藏 |
| `wallet_transactions` | 7 | ✅ | 钱包流水 |
| `wechat_login_sessions` | 7 | ✅ | 微信登录会话 |

---

## ⚙️ RPC 函数

### `process_recharge_payment` (2026-02-26 新增)

**迁移文件**: `nuxt-frontend/supabase/migrations/20260226000000_add_process_recharge_rpc.sql`

**签名**:
```sql
process_recharge_payment(
    p_out_trade_no   TEXT,
    p_transaction_id TEXT,
    p_payer_openid   TEXT    DEFAULT NULL,
    p_paid_at        TEXT    DEFAULT NULL,
    p_pay_source     TEXT    DEFAULT 'wechat'   -- 'wechat' | 'alipay'
) RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER
```

**职责**: 在单个事务内原子完成充值回调的所有数据库操作：
1. `FOR UPDATE` 锁定订单行（防并发重复处理）
2. 幂等检查（已 paid 则直接返回）
3. 更新 `recharge_orders.status = 'paid'`
4. 原子累加 `profiles.balance`（直接 `balance + amount + bonus`，无竞态）
5. 插入 `wallet_transactions` 流水记录

**返回值 JSON 结构**:
```json
{
  "success": true,
  "already_processed": false,
  "user_id": "uuid",
  "amount": 10.00,
  "bonus": 2.00,
  "total_amount": 12.00,
  "new_balance": 42.00
}
```

**调用方**: `server/utils/recharge-handler.ts`（微信和支付宝共用）

**权限**: 仅 `service_role` 可调用（已 REVOKE PUBLIC + GRANT service_role）

---

## 📡 频道识别表

### channel_recognitions (频道识别)

```sql
CREATE TABLE channel_recognitions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_key  text NOT NULL UNIQUE,  -- 频道标识 (如 @xxx)，小写，以 @ 开头
  channel_name text,                  -- 人类可读的频道名称（前端展示用，可为空）
  product_id   uuid REFERENCES products(id) ON DELETE SET NULL,  -- 绑定的商品
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);
```

**关键字段说明**:
- `channel_key`: 经 `resolve_channel_key` RPC 规范化（trim→lowercase→确保@开头）后存储
- `channel_name`: 管理员在后台设置的显示名称，展示给移动端用户
- `product_id`: 为 null 时状态为"待处理"，有值时状态为"已完成"

**RLS 策略**:
- 标准客户端：无读取权限（RLS 开启，公共策略被 `20260125000001_optimize_security` 迁移清除）
- 管理员客户端（认证用户且在 admin_users 表中）：全量访问（SELECT/INSERT/UPDATE/DELETE）
- `resolve_channel_key` RPC：`SECURITY DEFINER`，绕过 RLS，供移动端匿名调用

**相关迁移**:
- `20260125000000_channel_recognition.sql` — 建表 + RPC 函数
- `20260220000000_channel_recognition_admin_policy.sql` — 恢复管理员策略
- `20260220000001_add_channel_name.sql` — 新增 channel_name 列
- `20260220000002_update_resolve_channel_key.sql` — RPC 返回值加入 channel_name

**使用场景**:
- 移动端 `/mobile/channel` 页：用户输入频道号 → RPC `resolve_channel_key` → 返回绑定商品
- 后台 `/manager_portal/cdk/channel-recognition`：管理员绑定频道与商品、设置频道名称

---

## 🔑 核心表详情

### products (商品)

```sql
CREATE TABLE products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title           text NOT NULL,
  description     text,
  category_id     uuid REFERENCES product_categories(id),
  type            varchar CHECK (type IN ('virtual', 'shared', 'one_time')),
  status          varchar DEFAULT 'on' CHECK (status IN ('on', 'off')),
  cover_image     text,
  images          text[],
  tags            text[],
  sort_order      integer DEFAULT 0,
  sales_count     integer DEFAULT 0,
  is_hot          boolean DEFAULT false,
  is_new          boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);
```

**字段说明**:
- `type`: 商品类型 (禁止修改逻辑)
  - `virtual`: 虚拟充值，通过 CDK.stock 控制库存
  - `shared`: 账号合租，使用 slot_occupancies 车位模型
  - `one_time`: 一次性CDK，通过 CDK.status 控制

---

### orders (主订单)

```sql
CREATE TABLE orders (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no        varchar UNIQUE NOT NULL,
  user_id         uuid NOT NULL REFERENCES profiles(id),
  product_title   text NOT NULL,
  sku_title       text NOT NULL,
  sku_id          uuid REFERENCES product_skus(id),
  quantity        integer NOT NULL DEFAULT 1,
  unit_price      numeric(10,2) NOT NULL,
  total_amount    numeric(10,2) NOT NULL,
  discount_amount numeric(10,2) DEFAULT 0,
  pay_method      text,
  status          text NOT NULL CHECK (status IN (
    '待发货', '待收货', '服务中', '已完成', 
    '已取消', 'expired', 'deleted'
  )),
  start_time      timestamptz,
  end_time        timestamptz,
  receipt_info    text,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);
```

**状态流转**:
```
创建 → 待发货 → 待收货 → 服务中 → 已完成
                    ↓
               已取消/expired
```

---

### cdks (CDK密钥)

```sql
CREATE TABLE cdks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid REFERENCES products(id),
  cdk_key         varchar NOT NULL,
  stock           integer NOT NULL DEFAULT 1,
  max_slots       integer,
  status          varchar DEFAULT 'idle' CHECK (status IN ('idle', 'using', 'used', 'disabled')),
  cdk_type        varchar CHECK (cdk_type IN ('virtual', 'shared', 'one_time')),
  pool_key        varchar,
  pre_order_id    uuid REFERENCES pre_orders(id),
  last_renewal_at timestamptz,
  updated_at      timestamptz DEFAULT now(),
  created_at      timestamptz DEFAULT now()
);
```

**类型说明**:
- `virtual`: stock 减1表示消耗一次
- `shared`: 使用 slot_occupancies 跟踪车位
- `one_time`: status 从 idle → used 表示已使用

---

### slot_occupancies (车位占用)

> ⚠️ **核心表 - 禁止修改 slot_index 分配逻辑**

```sql
CREATE TABLE slot_occupancies (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cdk_id          uuid NOT NULL REFERENCES cdks(id),
  slot_index      integer NOT NULL,
  user_id         uuid REFERENCES profiles(id),
  order_id        uuid REFERENCES orders(id),
  pre_order_id    uuid REFERENCES pre_orders(id),
  status          varchar DEFAULT 'idle' CHECK (status IN ('idle', 'using')),
  reserved_at     timestamptz,
  created_at      timestamptz DEFAULT now(),
  UNIQUE(cdk_id, slot_index)
);
```

---

## 🔗 表关系

### 核心关联 (多对多映射表)

```
products ←──────── product_sku_map ────────→ product_skus
                                                  ↓
cdks ←────────────── cdk_sku_map ──────────────────┘
  ↓
slot_occupancies ←───────── orders
```

### 用户关联

```
profiles (用户)
  ├── orders (订单)
  ├── pre_orders (预订单)
  ├── cart_items (购物车)
  ├── user_coupons (优惠券)
  ├── user_favorites (收藏)
  ├── wallet_transactions (钱包流水)
  ├── tickets (工单)
  ├── messages (消息)
  └── recharge_orders (充值订单)
```

---

## 📋 外键约束

| 表 | 列 | 引用表 | 引用列 |
|----|----|----|-----|
| admin_users | department_id | admin_departments | id |
| banners | image_id | images | id |
| cart_items | sku_id | product_skus | id |
| cart_items | user_id | profiles | id |
| cdk_sku_map | cdk_id | cdks | id |
| cdk_sku_map | sku_id | product_skus | id |
| cdks | product_id | products | id |
| cdks | pre_order_id | pre_orders | id |
| coupon_codes | coupon_id | coupons | id |
| faqs | category_id | faq_categories | id |
| faqs | product_id | products | id |
| images | category_id | image_categories | id |
| order_fulfillments | order_id | orders | id |
| orders | sku_id | product_skus | id |
| orders | user_id | profiles | id |
| pre_orders | coupon_id | coupons | id |
| pre_orders | sku_id | product_skus | id |
| pre_orders | user_id | profiles | id |
| product_sku_map | product_id | products | id |
| product_sku_map | sku_id | product_skus | id |
| products | category_id | product_categories | id |
| recharge_orders | user_id | profiles | id |
| refund_requests | order_id | orders | id |
| refund_requests | user_id | profiles | id |
| slot_occupancies | cdk_id | cdks | id |
| slot_occupancies | order_id | orders | id |
| slot_occupancies | user_id | profiles | id |
| ticket_messages | ticket_id | tickets | id |
| tickets | order_id | orders | id |
| tickets | user_id | profiles | id |
| user_coupons | coupon_id | coupons | id |
| user_coupons | order_id | orders | id |
| user_coupons | user_id | profiles | id |
| user_favorites | product_id | products | id |
| user_favorites | sku_id | product_skus | id |
| user_favorites | user_id | profiles | id |
| wallet_transactions | user_id | profiles | id |
