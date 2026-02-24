-- =====================================================
-- 添加缺失的外键索引 & 清理未使用索引
-- =====================================================

-- 1. 添加缺失的外键索引（提升 JOIN 性能）
CREATE INDEX IF NOT EXISTS idx_pre_orders_coupon_id ON public.pre_orders(coupon_id);
CREATE INDEX IF NOT EXISTS idx_pre_orders_related_order_id ON public.pre_orders(related_order_id);
CREATE INDEX IF NOT EXISTS idx_refund_requests_admin_id ON public.refund_requests(admin_id);
CREATE INDEX IF NOT EXISTS idx_slot_occupancies_pre_order_id ON public.slot_occupancies(pre_order_id);
CREATE INDEX IF NOT EXISTS idx_slot_occupancies_user_id ON public.slot_occupancies(user_id);
CREATE INDEX IF NOT EXISTS idx_ticket_messages_sender_id ON public.ticket_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_sku_id ON public.user_favorites(sku_id);
