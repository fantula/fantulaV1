-- Migration: Add WeChat Login Fields to profiles
-- Description: Adds wechat_openid and wechat_unionid columns for WeChat Service Account login

-- Add wechat_openid column (unique, nullable)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS wechat_openid TEXT UNIQUE;

-- Add wechat_unionid column (unique, nullable) - for future cross-platform use
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS wechat_unionid TEXT UNIQUE;

-- Add index for faster lookup by wechat_openid
CREATE INDEX IF NOT EXISTS idx_profiles_wechat_openid 
ON public.profiles(wechat_openid) 
WHERE wechat_openid IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.profiles.wechat_openid IS 'WeChat Service Account OpenID for login';
COMMENT ON COLUMN public.profiles.wechat_unionid IS 'WeChat UnionID for cross-platform identity (optional)';

-- Create table for tracking WeChat scan login sessions
CREATE TABLE IF NOT EXISTS public.wechat_login_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scene_str TEXT NOT NULL UNIQUE,  -- The scene string used in QR code
    ticket TEXT NOT NULL,             -- WeChat ticket for the QR code
    openid TEXT,                       -- Filled when user scans
    status TEXT NOT NULL DEFAULT 'waiting', -- waiting, scanned, bound, expired
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '5 minutes'),
    CONSTRAINT wechat_login_sessions_status_check CHECK (status IN ('waiting', 'scanned', 'bound', 'expired'))
);

-- Add index for polling queries
CREATE INDEX IF NOT EXISTS idx_wechat_login_sessions_scene 
ON public.wechat_login_sessions(scene_str);

CREATE INDEX IF NOT EXISTS idx_wechat_login_sessions_expires 
ON public.wechat_login_sessions(expires_at);

-- Enable RLS
ALTER TABLE public.wechat_login_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous insert (for creating new scan sessions)
CREATE POLICY "Allow anonymous insert for scan sessions" 
ON public.wechat_login_sessions
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy: Allow anonymous select (for polling status)
CREATE POLICY "Allow anonymous select for scan sessions" 
ON public.wechat_login_sessions
FOR SELECT
TO anon
USING (true);

-- Policy: Allow service role full access (for webhook updates)
CREATE POLICY "Service role has full access to scan sessions"
ON public.wechat_login_sessions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
