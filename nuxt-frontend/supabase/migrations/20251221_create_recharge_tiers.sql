-- 创建充值档位表
-- 请在 Supabase Dashboard -> SQL Editor 中执行此脚本

CREATE TABLE IF NOT EXISTS recharge_tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount NUMERIC(10, 2) NOT NULL,
    bonus NUMERIC(10, 2) NOT NULL DEFAULT 0,
    sort_order INT NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'on' CHECK (status IN ('on', 'off')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用 RLS
ALTER TABLE recharge_tiers ENABLE ROW LEVEL SECURITY;

-- 查询策略：所有人可读取已启用的档位
CREATE POLICY "Anyone can read active tiers" ON recharge_tiers
    FOR SELECT USING (status = 'on');

-- 管理员策略：管理员可以完全操作
CREATE POLICY "Admins have full access to recharge_tiers" ON recharge_tiers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE admin_users.auth_user_id = auth.uid()
        )
    );

-- 插入默认数据
INSERT INTO recharge_tiers (amount, bonus, sort_order, status) VALUES
    (6, 0, 1, 'on'),
    (30, 2, 2, 'on'),
    (98, 10, 3, 'on'),
    (198, 25, 4, 'on'),
    (648, 88, 5, 'on');
