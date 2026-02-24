-- 微信支付充值订单表
-- 用于记录微信Native/JSAPI支付的充值订单

CREATE TABLE IF NOT EXISTS "public"."recharge_orders" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "out_trade_no" varchar(64) NOT NULL UNIQUE,           -- 商户订单号
    "user_id" uuid NOT NULL REFERENCES "public"."profiles"("id") ON DELETE CASCADE,
    "amount" numeric(12,2) NOT NULL,                       -- 充值金额（元）
    "amount_cents" integer NOT NULL,                       -- 充值金额（分）
    "status" varchar(20) NOT NULL DEFAULT 'pending',       -- pending, paid, closed, refunded
    "pay_type" varchar(30) NOT NULL,                       -- wechat_native, wechat_jsapi
    "description" text,                                     -- 商品描述
    "transaction_id" varchar(64),                           -- 微信支付订单号
    "payer_openid" varchar(128),                            -- 支付者 OpenID
    "paid_at" timestamptz,                                  -- 支付时间
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_recharge_orders_user_id ON "public"."recharge_orders" ("user_id");
CREATE INDEX IF NOT EXISTS idx_recharge_orders_status ON "public"."recharge_orders" ("status");
CREATE INDEX IF NOT EXISTS idx_recharge_orders_created_at ON "public"."recharge_orders" ("created_at" DESC);

-- RLS 策略
ALTER TABLE "public"."recharge_orders" ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的充值订单
CREATE POLICY "Users can view own recharge orders" ON "public"."recharge_orders"
    FOR SELECT
    USING (auth.uid() = user_id);

-- Service role 可以插入和更新订单
CREATE POLICY "Service role can manage recharge orders" ON "public"."recharge_orders"
    FOR ALL
    USING (auth.role() = 'service_role');

-- 用户可以创建自己的订单（通过认证的 Edge Function）
CREATE POLICY "Authenticated users can create orders" ON "public"."recharge_orders"
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 添加注释
COMMENT ON TABLE "public"."recharge_orders" IS '微信支付充值订单表';
COMMENT ON COLUMN "public"."recharge_orders"."out_trade_no" IS '商户订单号';
COMMENT ON COLUMN "public"."recharge_orders"."status" IS '订单状态: pending=待支付, paid=已支付, closed=已关闭, refunded=已退款';
COMMENT ON COLUMN "public"."recharge_orders"."pay_type" IS '支付方式: wechat_native=扫码支付, wechat_jsapi=公众号支付';
