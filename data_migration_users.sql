
-- Disable constraints temporarily to avoid ordering issues
SET session_replication_role = 'replica';

-- Insert Users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES 
('8ed241f2-00ba-4948-9f37-2ea13358c0a0', 'admin@fantula.com', '$2a$06$k3mNjCC.4avy3JvFRfnX/OWK9ZR78tplxeCtu6rND7JOC9grHcJwe', '2026-02-01 04:09:26.013472+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
('c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6', 'jiangdalin1888@gmail.com', '$2a$10$wT.f/.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y', '2026-02-01 06:58:21.49209+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
('7b635332-9d91-46a5-a76f-8f0350c6bc35', 'liumeiti1108@gmail.com', '$2a$10$wT.f/.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y', '2026-02-02 05:49:39.33335+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
('ef1af153-941d-4157-8e16-6709a496156a', 'liumeiti1104@gmail.com', '$2a$10$wT.f/.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y', '2026-02-03 04:56:45.253928+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
('ff275704-8d9c-4bcf-ac6e-32166d48b122', 'jiangdalin1966@gmail.com', '$2a$10$wT.f/.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y', '2026-02-08 08:27:46.788289+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
('bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', 'jiangdalin1999@gmail.com', '$2a$10$wT.f/.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y', '2026-02-01 06:24:19.432056+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
('f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'jiangdalin1988@gmail.com', '$2a$10$wT.f/.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y.y', '2026-02-01 07:04:33.661014+00', '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Insert Profiles
INSERT INTO public.profiles (id, uid, email, status, created_at, nickname, balance, avatar, wechat_openid, wechat_unionid)
VALUES
('8ed241f2-00ba-4948-9f37-2ea13358c0a0', '80525303', 'admin@fantula.com', 'active', '2026-02-01 04:09:26.013472+00', 'admin', 0, '', NULL, NULL),
('c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6', '96809725', 'jiangdalin1888@gmail.com', 'active', '2026-02-01 06:58:21.49209+00', 'jiangdalin1888', 0, '', NULL, NULL),
('7b635332-9d91-46a5-a76f-8f0350c6bc35', '84062910', 'liumeiti1108@gmail.com', 'active', '2026-02-02 05:49:39.33335+00', 'liumeiti1108', 0, '', NULL, NULL),
('ef1af153-941d-4157-8e16-6709a496156a', '22024353', 'liumeiti1104@gmail.com', 'active', '2026-02-03 04:56:45.253928+00', 'liumeiti1104', 0, '', NULL, NULL),
('ff275704-8d9c-4bcf-ac6e-32166d48b122', '88755675', 'jiangdalin1966@gmail.com', 'active', '2026-02-08 08:27:46.788289+00', 'jiangdalin1966', 0, '', NULL, NULL),
('bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', '22985213', 'jiangdalin1999@gmail.com', 'active', '2026-02-01 06:24:19.432056+00', 'Support（10:00-23:00）', 0, 'https://thirdwx.qlogo.cn/mmopen/vi_32/WmFWNeOgHXul8ndec3ehbQO0BxamAqcU0OBWwU9Pad8NgPcLbmiaA7vH3fIe1LgZiaqj1ezq772Ha3gefG5bhib414cnEzeVqmbz7ic0EJefVjE/132', 'oi2267Te6udBzy9dW80qAmN_6JVY', NULL),
('f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '41691870', 'jiangdalin1988@gmail.com', 'active', '2026-02-01 07:04:33.661014+00', 'jian', 0, 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJ75UDTUyxkoPZibvGaysia5w1c0skiceoaCYWCqkodEXpVs04lxCPTSyVrgVLvqOnJtzCETgZRT1rvVgVyx6DAjU687K17HTLdyiafz5CGoCOcfw/132', 'oi2267QwkltAYW-vrfREVV_5LP7Y', NULL)
ON CONFLICT (id) DO NOTHING;

-- Re-enable constraints
SET session_replication_role = 'origin';
