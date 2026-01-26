-- Migration: Channel Recognition Feature
-- Date: 2026-01-25
-- Description: Adds channel_recognitions table and resolve_channel_key RPC.

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.channel_recognitions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    channel_key text NOT NULL,
    product_id uuid,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT channel_recognitions_pkey PRIMARY KEY (id),
    CONSTRAINT channel_recognitions_channel_key_key UNIQUE (channel_key),
    CONSTRAINT channel_recognitions_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL
);

-- 2. Enable RLS
ALTER TABLE public.channel_recognitions ENABLE ROW LEVEL SECURITY;

-- 3. Create Admin Policy
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'channel_recognitions' AND policyname = 'Enable all for admins'
    ) THEN
        CREATE POLICY "Enable all for admins" ON public.channel_recognitions
            USING (
                auth.uid() IN (SELECT auth_user_id FROM public.admin_users WHERE status = 'enabled')
            )
            WITH CHECK (
                auth.uid() IN (SELECT auth_user_id FROM public.admin_users WHERE status = 'enabled')
            );
    END IF;
END $$;

-- 4. Create Logic Function (RPC) with STRICT Sanitization
CREATE OR REPLACE FUNCTION public.resolve_channel_key(p_channel_key text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
            'channel_key', v_record.channel_key
        );
    ELSE
        -- 4. Auto-Create if not exists
        INSERT INTO public.channel_recognitions (channel_key)
        VALUES (v_clean_key)
        ON CONFLICT (channel_key) DO NOTHING;
        
        -- Return "not bound" state
        RETURN jsonb_build_object(
            'found', true, -- It exists now
            'bound', false,
            'product_id', NULL,
            'channel_key', v_clean_key
        );
    END IF;
END;
$function$;