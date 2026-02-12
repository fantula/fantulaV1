CREATE TABLE IF NOT EXISTS public.notification_templates (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    event_type text NOT NULL,
    name text NOT NULL,
    subject_template text NOT NULL,
    body_template text NOT NULL,
    variables jsonb DEFAULT '[]'::jsonb,
    is_enabled boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    updated_by uuid REFERENCES auth.users(id),
    CONSTRAINT notification_templates_pkey PRIMARY KEY (id),
    CONSTRAINT notification_templates_event_type_key UNIQUE (event_type)
);

-- Enable RLS
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can manage notification templates" ON public.notification_templates
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE id = auth.uid() 
            AND status = 'active'
        )
    );

-- Insert default templates
INSERT INTO public.notification_templates (event_type, name, subject_template, body_template, variables)
VALUES 
(
    'order_paid',
    '订单支付成功',
    '【凡图拉】您的订单 {{order_no}} 已支付成功',
    '<p>尊敬的用户：</p><p>您的订单 <strong>{{order_no}}</strong> 已支付成功，我们会尽快处理。</p><p>支付金额：{{amount}}</p><p>商品名称：{{product_name}}</p>',
    '[{"key": "order_no", "desc": "订单号"}, {"key": "amount", "desc": "支付金额"}, {"key": "product_name", "desc": "商品名称"}]'::jsonb
),
(
    'order_shipped',
    '订单已发货',
    '【凡图拉】您的订单 {{order_no}} 已发货',
    '<p>尊敬的用户：</p><p>您的订单 <strong>{{order_no}}</strong> 已发货。</p><p>发货内容：</p><pre>{{delivery_content}}</pre><p>请妥善保管您的卡密/账号信息。</p>',
    '[{"key": "order_no", "desc": "订单号"}, {"key": "delivery_content", "desc": "发货内容"}]'::jsonb
),
(
    'recharge_success',
    '充值到账通知',
    '【凡图拉】充值到账通知',
    '<p>尊敬的用户：</p><p>您充值的 {{amount}} 点数已到账。</p><p>当前余额：{{balance}}</p>',
    '[{"key": "amount", "desc": "充值金额"}, {"key": "balance", "desc": "当前余额"}]'::jsonb
),
(
    'ticket_reply',
    '工单回复通知',
    '【凡图拉】您的工单 {{ticket_id}} 有新回复',
    '<p>尊敬的用户：</p><p>您的工单 <strong>{{ticket_title}}</strong> 有新的回复：</p><blockquote>{{reply_content}}</blockquote><p>请登录控制台查看详情。</p>',
    '[{"key": "ticket_id", "desc": "工单ID"}, {"key": "ticket_title", "desc": "工单标题"}, {"key": "reply_content", "desc": "回复内容"}]'::jsonb
)
ON CONFLICT (event_type) DO NOTHING;
