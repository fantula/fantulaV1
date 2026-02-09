-- Migration: add_cleanup_unverified_users_function
-- Synced from cloud Supabase

CREATE OR REPLACE FUNCTION public.cleanup_unverified_users()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    v_count INTEGER := 0;
BEGIN
    -- 统计需要清理的未验证用户数量
    SELECT COUNT(*) INTO v_count
    FROM auth.users u
    WHERE u.email_confirmed_at IS NULL
      AND u.created_at < NOW() - INTERVAL '24 hours'
      AND NOT EXISTS (
          SELECT 1 FROM profiles p 
          WHERE p.id = u.id 
            AND p.balance > 0
      );
    
    -- 记录执行日志
    BEGIN
        INSERT INTO scheduled_task_logs (task_name, status, affected_count)
        VALUES ('cleanup_unverified_users', 'success', v_count);
    EXCEPTION WHEN OTHERS THEN
        NULL;
    END;
    
    RETURN jsonb_build_object(
        'success', true,
        'expired_count', v_count,
        'task_name', 'cleanup_unverified_users',
        'note', '仅统计数量'
    );
END;
$function$;
