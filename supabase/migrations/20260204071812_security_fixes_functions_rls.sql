-- Migration: security_fixes_functions_rls
-- Security fixes: Enable RLS on all tables to ensure secure defaults
-- Synced from cloud Supabase

ALTER TABLE "public"."admin_departments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."admin_users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."banners" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."cart_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."cdk_sku_map" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."cdks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."community_articles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."community_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."coupon_codes" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."coupons" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."faq_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."faqs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."image_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."images" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."order_fulfillments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."pre_orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."product_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."product_sku_map" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."product_skus" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."recharge_tiers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."refund_requests" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."scheduled_task_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."shared_sku_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."slot_occupancies" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."system_settings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."ticket_messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."tickets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_coupons" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."user_favorites" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."wallet_transactions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."wechat_login_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."channel_recognitions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."recharge_orders" ENABLE ROW LEVEL SECURITY;

-- Note: Policies are defined in other migration files.
