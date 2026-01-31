-- 添加微信 OpenID 字段到 profiles 表
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS wechat_openid TEXT UNIQUE;
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS wechat_unionid TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_profiles_wechat_openid 
ON public.profiles(wechat_openid) 
WHERE wechat_openid IS NOT NULL;
-- 创建微信扫码登录会话表
CREATE TABLE IF NOT EXISTS public.wechat_login_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_str TEXT NOT NULL UNIQUE,
    ticket TEXT NOT NULL,
    openid TEXT,
    status TEXT NOT NULL DEFAULT 'waiting',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '5 minutes'),
    CONSTRAINT wechat_login_sessions_status_check CHECK (status IN ('waiting', 'scanned', 'bound', 'expired'))
);
CREATE INDEX IF NOT EXISTS idx_wechat_login_sessions_scene ON public.wechat_login_sessions(scene_str);
CREATE INDEX IF NOT EXISTS idx_wechat_login_sessions_expires ON public.wechat_login_sessions(expires_at);
ALTER TABLE public.wechat_login_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous insert for scan sessions" ON public.wechat_login_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous select for scan sessions" ON public.wechat_login_sessions FOR SELECT TO anon USING (true);
CREATE POLICY "Service role has full access to scan sessions" ON public.wechat_login_sessions FOR ALL TO service_role USING (true) WITH CHECK (true);