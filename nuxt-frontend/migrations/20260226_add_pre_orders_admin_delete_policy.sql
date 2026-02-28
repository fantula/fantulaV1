-- 添加管理员删除预订单的 RLS 策略
-- 原因：pre_orders 表缺少 admin DELETE 策略，导致后台"批量删除"静默失败
-- 已于 2026-02-26 在服务器执行

CREATE POLICY pre_orders_admin_delete ON pre_orders
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.auth_user_id = uid()
        AND admin_users.status = 'enabled'
    )
);
