-- Optimizing Security for Channel Recognition
-- Per Admin Development Guide: Admin Interface uses Service Role to bypass RLS.
-- Therefore, we do NOT need complex RLS policies for admins on the table itself.
-- We only need to ensure the RPC function is executable by the frontend.

-- 1. Drop the complex RLS policy (Simplify)
DROP POLICY IF EXISTS "Enable all for admins" ON public.channel_recognitions;

-- 2. Explicitly Grant EXECUTE on RPC (Frontend access)
GRANT EXECUTE ON FUNCTION public.resolve_channel_key(text) TO anon, authenticated, service_role;

-- 3. (Optional) We can leave RLS enabled with NO policies
-- This effectively means "Deny All" for standard clients (public/anon).
-- But the Admin Client (Service Role) will bypass this automatically.
ALTER TABLE public.channel_recognitions ENABLE ROW LEVEL SECURITY;
