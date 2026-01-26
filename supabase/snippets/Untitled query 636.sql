-- 1. Drop the complex RLS policy (Admin client bypasses it anyway)
DROP POLICY IF EXISTS "Enable all for admins" ON public.channel_recognitions;
-- 2. Explicitly Grant EXECUTE on RPC (Required for Frontend access)
GRANT EXECUTE ON FUNCTION public.resolve_channel_key(text) TO anon, authenticated, service_role;