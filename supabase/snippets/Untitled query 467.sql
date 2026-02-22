-- ==========================================
-- 升级补丁: 频道识别追加 "channel_name" 字段
-- 适用范围: Supabase SQL 运行窗格 / 本地 Psql CLI
-- ==========================================
-- 1. 表结构平滑安全扩容
ALTER TABLE public.channel_recognitions ADD COLUMN IF NOT EXISTS channel_name text;
-- 2. 刷新核心 RPC 层解析逻辑
CREATE OR REPLACE FUNCTION "public"."resolve_channel_key"("p_channel_key" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
DECLARE
    v_clean_key text;
    v_record record;
BEGIN
    -- 1. Sanitize Input: Trim -> Lowercase
    v_clean_key := lower(trim(p_channel_key));
    
    -- 2. Ensure starts with @
    IF left(v_clean_key, 1) <> '@' THEN
        v_clean_key := '@' || v_clean_key;
    END IF;
    -- 3. Try to find existing
    SELECT * INTO v_record FROM public.channel_recognitions WHERE channel_key = v_clean_key;
    
    IF FOUND THEN
        RETURN jsonb_build_object(
            'found', true,
            'bound', (v_record.product_id IS NOT NULL),
            'product_id', v_record.product_id,
            'channel_key', v_record.channel_key,
            'channel_name', v_record.channel_name
        );
    ELSE
        -- 4. Auto-Create if not exists
        -- Note: channel_name defaults to NULL
        INSERT INTO public.channel_recognitions (channel_key)
        VALUES (v_clean_key)
        ON CONFLICT (channel_key) DO NOTHING;
        
        -- Return "not bound" state
        RETURN jsonb_build_object(
            'found', true,
            'bound', false,
            'product_id', NULL,
            'channel_key', v_clean_key,
            'channel_name', NULL
        );
    END IF;
END;
$$;
-- 3. 授权（以防安全重置）
ALTER FUNCTION "public"."resolve_channel_key"("p_channel_key" "text") OWNER TO "postgres";