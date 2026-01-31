-- 添加 bonus 字段到 recharge_orders 表
ALTER TABLE recharge_orders 
ADD COLUMN IF NOT EXISTS bonus DECIMAL(10,2) DEFAULT 0;
-- 添加注释
COMMENT ON COLUMN recharge_orders.bonus IS '赠送金额';
