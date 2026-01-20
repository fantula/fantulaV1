-- ============================================
-- Migration: 用户注册触发器绑定
-- 修复 handle_new_user 未绑定到 auth.users 的问题
-- ============================================

-- 1. 删除可能存在的旧触发器（避免重复）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- 2. 绑定 handle_new_user 到 auth.users INSERT 事件
-- 当新用户注册时，自动创建 profiles 记录并生成唯一 UID
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- 3. 绑定 sync_email_to_profile 到 auth.users UPDATE 事件
-- 当用户邮箱变更时，同步到 profiles 表
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.sync_email_to_profile();

-- 4. 修复现有缺失 profiles 的用户
-- 为已注册但没有 profiles 的用户创建记录
DO $$
DECLARE
  v_user RECORD;
  v_uid TEXT;
  v_count INT;
BEGIN
  FOR v_user IN 
    SELECT u.id, u.email, u.raw_user_meta_data, u.created_at
    FROM auth.users u
    LEFT JOIN public.profiles p ON u.id = p.id
    WHERE p.id IS NULL
  LOOP
    -- 生成唯一 8 位 UID
    LOOP
      v_uid := floor(10000000 + random() * 90000000)::text;
      SELECT count(*) INTO v_count FROM public.profiles WHERE uid = v_uid;
      IF v_count = 0 THEN EXIT; END IF;
    END LOOP;
    
    -- 插入 profiles 记录
    INSERT INTO public.profiles (id, uid, email, nickname, avatar, status, balance, created_at)
    VALUES (
      v_user.id,
      v_uid,
      v_user.email,
      COALESCE(v_user.raw_user_meta_data->>'full_name', split_part(v_user.email, '@', 1)),
      COALESCE(v_user.raw_user_meta_data->>'avatar_url', ''),
      'active',
      0.00,
      COALESCE(v_user.created_at, now())
    );
    
    RAISE NOTICE 'Created profile for user % with UID %', v_user.email, v_uid;
  END LOOP;
END $$;

-- 5. 验证触发器已创建
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    RAISE EXCEPTION 'Trigger on_auth_user_created was not created!';
  END IF;
  
  RAISE NOTICE 'Trigger on_auth_user_created verified successfully';
END $$;
