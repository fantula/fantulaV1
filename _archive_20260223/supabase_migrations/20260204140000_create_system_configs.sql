CREATE TABLE IF NOT EXISTS public.system_configs (
    key text PRIMARY KEY,
    value jsonb NOT NULL DEFAULT '{}'::jsonb,
    description text,
    updated_at timestamptz DEFAULT now(),
    updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.system_configs ENABLE ROW LEVEL SECURITY;

-- Policies
-- Admin can do everything
CREATE POLICY "Admins can manage system configs" ON public.system_configs
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users 
            WHERE id = auth.uid() 
            AND status = 'active'
        )
    );

-- Public/Anon read policies
CREATE POLICY "Clients can view configs" ON public.system_configs
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Anon can view configs" ON public.system_configs
    FOR SELECT
    TO anon
    USING (true);

-- Insert default contact config if not exists
INSERT INTO public.system_configs (key, value, description)
VALUES (
    'contact_info',
    '{
        "wechat_id": "Spotify-cn",
        "wechat_qr": "/images/shared/wechat-qr.png",
        "telegram_id": "@Fantula_Support",
        "telegram_qr": "/images/shared/telegram-qr.png",
        "service_time": "10:00 - 23:00"
    }'::jsonb,
    'Global contact information for PC and Mobile'
) ON CONFLICT (key) DO NOTHING;
