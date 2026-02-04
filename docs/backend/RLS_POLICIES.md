# RLS 策略文档

> **版本**: V1.0 | **更新时间**: 2026-02-04

---

## 📊 RLS 启用状态

### ✅ 已启用 RLS (32 表)

| 表名 | 策略数 |
|------|--------|
| admin_departments | 1 |
| admin_users | 2 |
| cart_items | 4 |
| cdk_sku_map | 1 |
| cdks | 5 |
| channel_recognitions | 1 |
| community_articles | 2 |
| community_categories | 2 |
| coupon_codes | 1 |
| coupons | 2 |
| faq_categories | 2 |
| faqs | 3 |
| messages | 2 |
| order_fulfillments | 2 |
| orders | 2 |
| pre_orders | 2 |
| product_sku_map | 1 |
| product_skus | 4 |
| products | 2 |
| profiles | 3 |
| recharge_orders | 2 |
| recharge_tiers | 2 |
| refund_requests | 2 |
| scheduled_task_logs | 1 |
| shared_sku_groups | 2 |
| slot_occupancies | 1 |
| system_settings | 1 |
| ticket_messages | 2 |
| tickets | 2 |
| user_coupons | 2 |
| user_favorites | 3 |
| wallet_transactions | 1 |
| wechat_login_sessions | 3 |

### ❌ 未启用 RLS (4 表 - 公开数据)

| 表名 | 原因 |
|------|------|
| banners | 轮播图为公开数据 |
| image_categories | 图片分类为公开数据 |
| images | 媒体资源为公开数据 |
| product_categories | 商品分类为公开数据 |

---

## 🔐 策略模式说明

### 1. 管理员完全访问

```sql
CREATE POLICY "admin_only" ON {table}
  FOR ALL USING (is_admin());
```

适用于: `admin_departments`, `cdk_sku_map`, `scheduled_task_logs`, `system_settings`

### 2. 用户只能访问自己的数据

```sql
CREATE POLICY "users_own_data" ON {table}
  FOR SELECT USING (user_id = auth.uid());
```

适用于: `cart_items`, `orders`, `user_favorites`, `wallet_transactions`, `messages`

### 3. 公开读 + 管理员写

```sql
CREATE POLICY "public_read" ON {table}
  FOR SELECT USING (true);

CREATE POLICY "admin_write" ON {table}
  FOR ALL USING (is_admin());
```

适用于: `products`, `product_skus`, `coupons`, `faqs`, `community_articles`

### 4. 匿名特殊访问

```sql
CREATE POLICY "anon_insert" ON wechat_login_sessions
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

仅用于: `wechat_login_sessions` (微信扫码登录需要)

---

## 📋 完整策略列表

### admin_departments

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| admin_departments_admin_only | ALL | public | is_admin() |

### admin_users

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| admin_users_modify | ALL | authenticated | is_admin() |
| admin_users_select_combined | SELECT | public | is_admin() OR auth_user_id = auth.uid() |

### cart_items

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| Users can add to their own cart | INSERT | authenticated | user_id = auth.uid() |
| Users can delete from their own cart | DELETE | authenticated | user_id = auth.uid() |
| Users can update their own cart | UPDATE | authenticated | user_id = auth.uid() |
| Users can view their own cart | SELECT | authenticated | user_id = auth.uid() |

### cdks

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| Admins can delete cdks | DELETE | authenticated | is_admin() |
| Admins can insert cdks | INSERT | authenticated | is_admin() |
| Admins can update cdks | UPDATE | authenticated | is_admin() |
| Allow admin read cdks | SELECT | authenticated | is_admin() |
| Service role has full access | ALL | service_role | true |

### orders

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| orders_admin_all | ALL | authenticated | is_admin() |
| orders_user_select | SELECT | authenticated | user_id = auth.uid() |

### products

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| products_admin_manage | ALL | authenticated | is_admin() |
| products_public_view | SELECT | public | true |

### slot_occupancies

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| slot_occupancies_select | SELECT | public | is_admin() OR 订单归属检查 |

### wechat_login_sessions

| 策略名 | 操作 | 角色 | 条件 |
|--------|------|------|------|
| Allow anonymous insert for scan sessions | INSERT | anon | true |
| Allow anonymous select for scan sessions | SELECT | anon | true |
| Service role has full access | ALL | service_role | true |

---

## ⚠️ 安全注意事项

1. **is_admin() 函数**: 检查当前用户是否为管理员，已配置 SECURITY DEFINER
2. **service_role**: 仅服务端使用，前端永远不要暴露 service_role key
3. **anon 角色**: 仅用于公开数据读取和微信登录会话

---

## 🔧 添加新策略的规范

```sql
-- 1. 必须使用 IF NOT EXISTS 或先检查
DROP POLICY IF EXISTS "policy_name" ON {table};

-- 2. 策略命名规范: {table}_{role}_{action}
CREATE POLICY "orders_user_select" ON orders
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 3. 管理员策略使用 is_admin() 函数
CREATE POLICY "orders_admin_all" ON orders
  FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
```
