-- Insert User Coupons
SET session_replication_role = 'replica';
INSERT INTO public.user_coupons (id, user_id, coupon_id, status, redeemed_at, used_at, code, order_id, coupon_snapshot, expire_at, redeemed_code)
VALUES
-- No user coupons found to insert
SET session_replication_role = 'origin';
