-- Insert default customer notification configuration into system_settings
-- Using ON CONFLICT DO NOTHING to ensure safety and idempotency
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
