-- ============================================
-- 统一修复外键：user_id 从 auth.users 改为指向 profiles
-- 目的：让 PostgREST 能自动识别与 profiles 的关联关系
-- ============================================

-- 1. cart_items
ALTER TABLE "public"."cart_items" DROP CONSTRAINT IF EXISTS "cart_items_user_id_fkey";
ALTER TABLE "public"."cart_items" 
    ADD CONSTRAINT "cart_items_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 2. messages
ALTER TABLE "public"."messages" DROP CONSTRAINT IF EXISTS "messages_user_id_fkey";
ALTER TABLE "public"."messages" 
    ADD CONSTRAINT "messages_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 3. orders
ALTER TABLE "public"."orders" DROP CONSTRAINT IF EXISTS "orders_user_id_fkey";
ALTER TABLE "public"."orders" 
    ADD CONSTRAINT "orders_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

-- 4. pre_orders
ALTER TABLE "public"."pre_orders" DROP CONSTRAINT IF EXISTS "pre_orders_user_id_fkey";
ALTER TABLE "public"."pre_orders" 
    ADD CONSTRAINT "pre_orders_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

-- 5. user_coupons
ALTER TABLE "public"."user_coupons" DROP CONSTRAINT IF EXISTS "user_coupons_user_id_fkey";
ALTER TABLE "public"."user_coupons" 
    ADD CONSTRAINT "user_coupons_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 6. user_favorites
ALTER TABLE "public"."user_favorites" DROP CONSTRAINT IF EXISTS "user_favorites_user_id_fkey";
ALTER TABLE "public"."user_favorites" 
    ADD CONSTRAINT "user_favorites_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

-- 7. wallet_transactions
ALTER TABLE "public"."wallet_transactions" DROP CONSTRAINT IF EXISTS "wallet_transactions_user_id_fkey";
ALTER TABLE "public"."wallet_transactions" 
    ADD CONSTRAINT "wallet_transactions_user_id_fkey" 
    FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id");

-- 8. coupon_codes.user_uid (特殊情况：字段名是 user_uid)
ALTER TABLE "public"."coupon_codes" DROP CONSTRAINT IF EXISTS "coupon_codes_user_uid_fkey";
ALTER TABLE "public"."coupon_codes" 
    ADD CONSTRAINT "coupon_codes_user_uid_fkey" 
    FOREIGN KEY ("user_uid") REFERENCES "public"."profiles"("id");

-- ============================================
-- 注：profiles.id 与 auth.users.id 相同（通过触发器同步）
-- 此修改仅改变外键目标，不影响数据完整性
-- ============================================
