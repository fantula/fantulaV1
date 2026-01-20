-- Seed Data for Admin Setup
-- 自动创建初始管理员账号

-- 1. 确保 pgcrypto 扩展可用 (用于密码加密)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. 插入超级管理员部门
INSERT INTO public.admin_departments (id, name, permissions, created_at)
VALUES (
    'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6',
    '超级管理组',
    '["*"]', -- 拥有所有权限
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 3. 插入 Auth User (admin@fantula.com / admin123456)
-- 注意：这是直接操作 auth schema，仅用于本地开发环境初始化
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '8ed241f2-00ba-4948-9f37-2ea13358c0a0',
    'authenticated',
    'authenticated',
    'admin@fantula.com',
    crypt('admin123456', gen_salt('bf')), -- 使用 pgcrypto 加密密码
    NOW(), -- 邮箱已验证
    NULL,
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
)
ON CONFLICT (id) DO UPDATE SET encrypted_password = crypt('admin123456', gen_salt('bf')); -- 确保密码是 admin123456

-- 4. 插入 Auth Identity (为了能在 auth.identities 表中找到，避免一些 Auth API 报错)
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    '8ed241f2-00ba-4948-9f37-2ea13358c0a0',
    '{"sub": "8ed241f2-00ba-4948-9f37-2ea13358c0a0", "email": "admin@fantula.com"}',
    'email',
    'admin@fantula.com',
    NOW(),
    NOW(),
    NOW()
)
ON CONFLICT (provider_id, provider) DO NOTHING;


-- 5. 插入 Admin User 记录
INSERT INTO public.admin_users (
    id,
    auth_user_id,
    name,
    email,
    password_hash, -- 前端哈希，用于双重验证
    department_id,
    status,
    created_at
) VALUES (
    'a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6',
    '8ed241f2-00ba-4948-9f37-2ea13358c0a0',
    '超级管理员',
    'admin@fantula.com',
    '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', -- admin123456 的 SHA256 (前端用)
    'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6', -- 关联超级管理组
    'enabled',
    NOW()
)
ON CONFLICT (auth_user_id) DO NOTHING;

