-- 添加管理员更新订单的 RLS 策略
-- 原因：orders 表只有 admin SELECT 策略，缺少 UPDATE 策略
-- 导致后台"确认发货"按钮无法更新订单状态为 active
-- 已于 2026-02-26 在服务器执行

CREATE POLICY orders_admin_update ON orders
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.auth_user_id = uid()
        AND admin_users.status = 'enabled'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM admin_users
        WHERE admin_users.auth_user_id = uid()
        AND admin_users.status = 'enabled'
    )
);
