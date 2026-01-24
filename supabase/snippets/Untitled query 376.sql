-- 初始化客户消息通知配置
-- 该配置控制哪些操作会自动发送站内信
INSERT INTO system_settings (key, value, description)
VALUES (
  'customer_notification_config', 
  '{
    "order_created": true,
    "coupon_redeemed": true,
    "quota_changed": true,
    "order_shipped": true,
    "virtual_order_received": true,
    "ticket_replied": true
  }', 
  'Customer notification trigger configuration'
) 
ON CONFLICT (key) DO NOTHING;
