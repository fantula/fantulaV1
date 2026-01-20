# 数据库用户关联设计规范 (DATABASE USER RELATION RULES)

> **重要**: 本文档定义了系统中所有业务表与用户表关联的强制规则。后续开发必须严格遵守。

## 核心规则 (The Golden Rule)

**所有业务表中的 `user_id` 字段，外键必须指向 `public.profiles(id)`，严禁直接指向 `auth.users(id)`。**

```sql
-- ✅ 正确做法
ALTER TABLE public.some_business_table 
ADD CONSTRAINT fk_user_profile 
FOREIGN KEY (user_id) REFERENCES public.profiles(id);

-- ❌ 禁止做法
ALTER TABLE public.some_business_table 
ADD CONSTRAINT fk_user_auth 
FOREIGN KEY (user_id) REFERENCES auth.users(id);
```

## 为什么这么做？ (Why)

1. **关联查询能力 (Join Capabilities)**
   - Supabase/PostgREST 不支持跨 Schema (public <-> auth) 的自动关联查询。
   - 指向 `public.profiles` 允许前端直接使用 `select('*, profile:profiles(...)')` 一次性获取业务数据和用户信息（头像、昵称等）。
   - 如果指向 `auth.users`，前端必须分两次请求（先查业务数据，再查用户信息），导致性能下降和代码复杂。

2. **业务隔离 (Business Logic Isolation)**
   - `auth.users` 是 Supabase 底层认证表，`public.profiles` 是我们定义的业务用户表。
   - 业务逻辑应仅依赖业务表。如果未来需要支持软删除、禁用用户或扩展用户属性，`profiles` 表完全在我们控制之下。

3. **数据一致性 (Data Consistency)**
   - 我们已有触发器保证 `auth.users` 和 `profiles` 的 1:1 同步。
   - 统一外键确保所有业务数据都挂载在一个有效的业务用户画像上。

## 已统一的表 (Unified Tables)

以下表已强制执行此规则：

| 表名 | 字段 | 外键目标 | 级联策略 |
|------|------|----------|----------|
| `orders` | `user_id` | `public.profiles(id)` | SET NULL |
| `cart_items` | `user_id` | `public.profiles(id)` | CASCADE |
| `messages` | `user_id` | `public.profiles(id)` | CASCADE |
| `pre_orders` | `user_id` | `public.profiles(id)` | CASCADE |
| `user_coupons` | `user_id` | `public.profiles(id)` | CASCADE |
| `user_favorites` | `user_id` | `public.profiles(id)` | CASCADE |
| `wallet_transactions` | `user_id` | `public.profiles(id)` | CASCADE |
| `slot_occupancies` | `user_id` | `public.profiles(id)` | SET NULL |
| `coupon_codes` | `user_uid` | `public.profiles(id)` | - |

## 开发警告 (Warnings for Developers)

1. **新建表时**：如果包含用户归属字段，务必添加 `REFERENCES public.profiles(id)`。
2. **RLS 策略**：虽然外键指向 `profiles`，但 RLS 仍然可以使用 `auth.uid()`，因为 `profiles.id` 的值等于 `auth.uid()`。
   ```sql
   -- RLS 示例
   CREATE POLICY "User can view own data" ON public.orders
   FOR SELECT USING (auth.uid() = user_id); -- 依然有效
   ```
3. **关联查询**：前端代码请使用关联语法：
   ```typescript
   supabase.from('orders').select('*, profile:profiles!user_id(nickname, avatar)')
   ```

---
**最后更新**: 2026-01-16
