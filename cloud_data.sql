SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict 5qGjuTbGlIbdfso5u7Ak76uwpqmNe1gZrItmgx0ibE7GIBlVJRGK5VadEvBPFQ4

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ff275704-8d9c-4bcf-ac6e-32166d48b122', 'authenticated', 'authenticated', 'jiangdalin1966@gmail.com', '$2a$10$65CKNn.xHAoHPGdWGy1rh.UZXXDr37Y9eEBOM9qShlg5paotDi/rG', NULL, NULL, 'f006395fe114a18155d57df3857b29b911c4d2c63b0c6e04e8fc79ba', '2026-02-08 08:27:46.840488+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "ff275704-8d9c-4bcf-ac6e-32166d48b122", "email": "jiangdalin1966@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2026-02-08 08:27:46.788634+00', '2026-02-08 08:27:49.173309+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6', 'authenticated', 'authenticated', 'jiangdalin1888@gmail.com', '$2a$10$5vCql4r/ipnpe9YEenO3fOOMPqySkDjPBNVvlMjy.grruWXvslzca', '2026-02-08 03:49:09.984986+00', NULL, '', '2026-02-08 03:48:19.264279+00', '', NULL, '', '', NULL, '2026-02-08 03:49:09.991722+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6", "email": "jiangdalin1888@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-01 06:58:21.492451+00', '2026-02-08 03:49:09.998671+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ef1af153-941d-4157-8e16-6709a496156a', 'authenticated', 'authenticated', 'liumeiti1104@gmail.com', '$2a$10$NHlx2BJOTlIoE8DgRWa5fe68f/0/CAPoQICLYscEvgH22f2vmhglW', NULL, NULL, 'f7822a6a7c629b25b2a7a63943970dc9b5b9bf178698fb2ef9e9e5a3', '2026-02-03 04:56:45.318868+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "ef1af153-941d-4157-8e16-6709a496156a", "email": "liumeiti1104@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2026-02-03 04:56:45.255395+00', '2026-02-03 04:56:47.6616+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7b635332-9d91-46a5-a76f-8f0350c6bc35', 'authenticated', 'authenticated', 'liumeiti1108@gmail.com', '$2a$10$.a6CaI6pCft6QM2SXCZGo.1fjOQrXDvfRCsBq/Cf2TjBGsP0KOuJy', NULL, NULL, '85a2b587872cfbafb2ecc6a04fa03161337a800520d8d6ce5a6fdbf1', '2026-02-03 04:34:27.715822+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "7b635332-9d91-46a5-a76f-8f0350c6bc35", "email": "liumeiti1108@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2026-02-02 05:49:39.33371+00', '2026-02-03 04:34:30.09805+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'authenticated', 'authenticated', 'jiangdalin1988@gmail.com', '$2a$10$klo/AU5userZgnDnwm3jGenV3Zvf5.u5oJF68EajZdfFkf9B9BcOu', '2026-02-01 07:10:59.057107+00', NULL, '', '2026-02-01 07:10:41.238249+00', 'acad59a9d68db4ca021ebf4d2ad6cc8c44abdcdc7513be8303376f53', '2026-02-09 06:06:33.841581+00', '', '', NULL, '2026-02-09 04:44:32.830488+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "f7da1828-4d22-413b-9b9a-70f86cd8dd5c", "email": "jiangdalin1988@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-01 07:04:33.662014+00', '2026-02-09 06:06:36.176094+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', 'authenticated', 'authenticated', 'admin@fantula.com', '$2a$06$k3mNjCC.4avy3JvFRfnX/OWK9ZR78tplxeCtu6rND7JOC9grHcJwe', '2026-02-01 04:09:26.013472+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-08 09:04:29.661291+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2026-02-01 04:09:26.013472+00', '2026-02-09 12:50:25.773533+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', 'authenticated', 'authenticated', 'jiangdalin1999@gmail.com', '$2a$10$HBHlpHTQJUYwRZ3Nqr8UfeGJ6y7KOTGtqxieJGFVutdNdibKnNNNm', '2026-02-08 13:06:34.198583+00', NULL, '', '2026-02-08 13:05:50.052989+00', '', NULL, '', '', NULL, '2026-02-08 13:06:34.208659+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca", "email": "jiangdalin1999@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-01 06:24:19.432987+00', '2026-02-09 03:43:05.737842+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '{"sub": "f7da1828-4d22-413b-9b9a-70f86cd8dd5c", "email": "jiangdalin1988@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-01 07:04:33.695634+00', '2026-02-01 07:04:33.695691+00', '2026-02-01 07:04:33.695691+00', '074421cc-3045-4ffd-92e9-b45b655c399c'),
	('7b635332-9d91-46a5-a76f-8f0350c6bc35', '7b635332-9d91-46a5-a76f-8f0350c6bc35', '{"sub": "7b635332-9d91-46a5-a76f-8f0350c6bc35", "email": "liumeiti1108@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-02 05:49:39.382599+00', '2026-02-02 05:49:39.382655+00', '2026-02-02 05:49:39.382655+00', '9ff81757-5855-4a61-8f15-7cbd28683b33'),
	('ef1af153-941d-4157-8e16-6709a496156a', 'ef1af153-941d-4157-8e16-6709a496156a', '{"sub": "ef1af153-941d-4157-8e16-6709a496156a", "email": "liumeiti1104@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-03 04:56:45.310222+00', '2026-02-03 04:56:45.31028+00', '2026-02-03 04:56:45.31028+00', '38b805a4-1426-40d8-8993-902c1d547d22'),
	('c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6', 'c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6', '{"sub": "c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6", "email": "jiangdalin1888@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-01 06:58:21.526232+00', '2026-02-01 06:58:21.526292+00', '2026-02-01 06:58:21.526292+00', 'ed266025-9659-4311-8cd2-6c1ea88351e2'),
	('ff275704-8d9c-4bcf-ac6e-32166d48b122', 'ff275704-8d9c-4bcf-ac6e-32166d48b122', '{"sub": "ff275704-8d9c-4bcf-ac6e-32166d48b122", "email": "jiangdalin1966@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-08 08:27:46.833152+00', '2026-02-08 08:27:46.833202+00', '2026-02-08 08:27:46.833202+00', '37dd3b42-8e44-4c2c-a098-e243c57792be'),
	('bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', '{"sub": "bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca", "email": "jiangdalin1999@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2026-02-01 06:24:19.459895+00', '2026-02-01 06:24:19.459953+00', '2026-02-01 06:24:19.459953+00', '30838630-80a9-40ba-856a-6c6dddbf7a84');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('5ec38400-6bb6-4134-b788-6c8ec7e38930', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-09 04:44:32.831169+00', '2026-02-09 04:44:32.831169+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.68(0x18004433) NetType/WIFI Language/zh_CN', '182.247.157.71', NULL, NULL, NULL, NULL, NULL),
	('28d934c8-d05c-4d41-bec4-74895305bef9', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', '2026-02-08 09:04:29.661392+00', '2026-02-09 12:50:25.792722+00', NULL, 'aal1', NULL, '2026-02-09 12:50:25.792592', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '202.155.129.120', NULL, NULL, NULL, NULL, NULL),
	('0220ed14-aaa6-4ab6-902a-a22a0dcaf32c', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', '2026-02-08 13:06:34.208773+00', '2026-02-09 03:43:05.748421+00', NULL, 'aal1', NULL, '2026-02-09 03:43:05.74831', 'node', '180.163.87.70', NULL, NULL, NULL, NULL, NULL),
	('5e9b66c2-295d-4872-b3ff-b60dbb4b39ae', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-08 15:05:57.657544+00', '2026-02-09 04:24:15.284823+00', NULL, 'aal1', NULL, '2026-02-09 04:24:15.284701', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.68(0x18004433) NetType/WIFI Language/zh_CN', '182.247.157.71', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('28d934c8-d05c-4d41-bec4-74895305bef9', '2026-02-08 09:04:29.754029+00', '2026-02-08 09:04:29.754029+00', 'password', '2ed24e37-d20f-4728-8808-4839fe3a02e7'),
	('0220ed14-aaa6-4ab6-902a-a22a0dcaf32c', '2026-02-08 13:06:34.222413+00', '2026-02-08 13:06:34.222413+00', 'otp', '2c739c6b-8c75-432a-a4d5-7f9431ebf2d3'),
	('5e9b66c2-295d-4872-b3ff-b60dbb4b39ae', '2026-02-08 15:05:57.677558+00', '2026-02-08 15:05:57.677558+00', 'otp', 'e4a05b0d-ad58-4d16-aa08-a502d09f9d3d'),
	('5ec38400-6bb6-4134-b788-6c8ec7e38930', '2026-02-09 04:44:32.865417+00', '2026-02-09 04:44:32.865417+00', 'otp', '5908b4c4-adcb-4c7d-932f-8d791b3efa0c');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('39f8149a-c57a-4fab-a191-f4cc4a3e34ab', 'ff275704-8d9c-4bcf-ac6e-32166d48b122', 'confirmation_token', 'f006395fe114a18155d57df3857b29b911c4d2c63b0c6e04e8fc79ba', 'jiangdalin1966@gmail.com', '2026-02-08 08:27:49.184473', '2026-02-08 08:27:49.184473'),
	('af8c8c08-2245-48fb-93c7-cd1665d1caca', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'recovery_token', 'acad59a9d68db4ca021ebf4d2ad6cc8c44abdcdc7513be8303376f53', 'jiangdalin1988@gmail.com', '2026-02-09 06:06:36.197866', '2026-02-09 06:06:36.197866'),
	('54538439-0a1c-4978-b733-33a8eb91d7f8', '7b635332-9d91-46a5-a76f-8f0350c6bc35', 'confirmation_token', '85a2b587872cfbafb2ecc6a04fa03161337a800520d8d6ce5a6fdbf1', 'liumeiti1108@gmail.com', '2026-02-03 04:34:30.116936', '2026-02-03 04:34:30.116936'),
	('2720c531-9906-474b-9fae-80c4eaae1b3c', 'ef1af153-941d-4157-8e16-6709a496156a', 'confirmation_token', 'f7822a6a7c629b25b2a7a63943970dc9b5b9bf178698fb2ef9e9e5a3', 'liumeiti1104@gmail.com', '2026-02-03 04:56:47.677042', '2026-02-03 04:56:47.677042');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 143, 'sps453sdjewj', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', false, '2026-02-09 04:44:32.853396+00', '2026-02-09 04:44:32.853396+00', NULL, '5ec38400-6bb6-4134-b788-6c8ec7e38930'),
	('00000000-0000-0000-0000-000000000000', 117, 'mqmeuhx5p3m5', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', true, '2026-02-08 10:08:10.643564+00', '2026-02-09 12:50:25.727371+00', 'v7seftuhzhka', '28d934c8-d05c-4d41-bec4-74895305bef9'),
	('00000000-0000-0000-0000-000000000000', 144, 'wdny5t5wedmg', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', false, '2026-02-09 12:50:25.753383+00', '2026-02-09 12:50:25.753383+00', 'mqmeuhx5p3m5', '28d934c8-d05c-4d41-bec4-74895305bef9'),
	('00000000-0000-0000-0000-000000000000', 125, 'haqpwkkbnxlx', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 14:04:35.535408+00', '2026-02-08 15:03:05.045602+00', 'jl7twohxzbgo', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 130, '34fc77k2va2u', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 16:59:35.432045+00', '2026-02-08 17:58:05.614776+00', 'zhlwr3tclhg5', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 132, 'kqfexq3rbc3l', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 18:56:35.473104+00', '2026-02-08 19:55:05.515769+00', '6wiiifpzg72g', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 134, 'q6kspqaxkuue', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 20:53:35.60072+00', '2026-02-08 21:52:05.589452+00', 'qkuq4c2fhqzc', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 136, 'mpp5kqedyywz', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 22:50:35.540137+00', '2026-02-08 23:49:05.502312+00', 'kkgef4c5wcrn', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 138, 'cbhronq7h53a', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-09 00:47:35.695287+00', '2026-02-09 01:46:05.826076+00', '3ksowrytox6s', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 140, 'esd3diq4ocs5', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-09 02:44:35.811519+00', '2026-02-09 03:43:05.72032+00', 'zaj3xgyet7xz', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 128, 'irapbdotqerl', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', true, '2026-02-08 15:05:57.66582+00', '2026-02-09 04:24:15.228295+00', NULL, '5e9b66c2-295d-4872-b3ff-b60dbb4b39ae'),
	('00000000-0000-0000-0000-000000000000', 142, 'wnyxrilesfwa', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', false, '2026-02-09 04:24:15.259991+00', '2026-02-09 04:24:15.259991+00', 'irapbdotqerl', '5e9b66c2-295d-4872-b3ff-b60dbb4b39ae'),
	('00000000-0000-0000-0000-000000000000', 113, 'v7seftuhzhka', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', true, '2026-02-08 09:04:29.706687+00', '2026-02-08 10:08:10.64078+00', NULL, '28d934c8-d05c-4d41-bec4-74895305bef9'),
	('00000000-0000-0000-0000-000000000000', 124, 'jl7twohxzbgo', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 13:06:34.215838+00', '2026-02-08 14:04:35.503787+00', NULL, '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 127, 'ez7xfdrixhvy', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 15:03:05.086147+00', '2026-02-08 16:01:34.716022+00', 'haqpwkkbnxlx', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 129, 'zhlwr3tclhg5', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 16:01:34.729137+00', '2026-02-08 16:59:35.397783+00', 'ez7xfdrixhvy', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 131, '6wiiifpzg72g', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 17:58:05.645162+00', '2026-02-08 18:56:35.460837+00', '34fc77k2va2u', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 133, 'qkuq4c2fhqzc', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 19:55:05.535507+00', '2026-02-08 20:53:35.586701+00', 'kqfexq3rbc3l', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 135, 'kkgef4c5wcrn', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 21:52:05.603059+00', '2026-02-08 22:50:35.520993+00', 'q6kspqaxkuue', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 137, '3ksowrytox6s', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-08 23:49:05.518524+00', '2026-02-09 00:47:35.681064+00', 'mpp5kqedyywz', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 139, 'zaj3xgyet7xz', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', true, '2026-02-09 01:46:05.838896+00', '2026-02-09 02:44:35.794623+00', 'cbhronq7h53a', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c'),
	('00000000-0000-0000-0000-000000000000', 141, 'ghpeukniufqe', 'bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', false, '2026-02-09 03:43:05.731662+00', '2026-02-09 03:43:05.731662+00', 'esd3diq4ocs5', '0220ed14-aaa6-4ab6-902a-a22a0dcaf32c');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: admin_departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."admin_departments" ("id", "name", "permissions", "created_at") VALUES
	('d1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6', '超级管理组', '["*"]', '2026-02-01 04:09:26.013472+00');


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."admin_users" ("id", "name", "email", "password_hash", "department_id", "status", "created_at", "auth_user_id") VALUES
	('77777777-7777-7777-7777-777777777777', 'SuperAdmin', 'admin@fantula.com', '$2a$06$SWF42EBxvXEtilPYu38YjeX74TXWKoPJl0A1NNL4EvqiquGtV9RZC', 'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6', 'enabled', '2026-02-01 04:09:26.013472+00', '8ed241f2-00ba-4948-9f37-2ea13358c0a0'),
	('4f755970-fcbf-4d84-9af8-84b0dda50c0d', 'admis', 'jiangdalin1966@gmail.com', '2b62ce539f8d7fab33461ee3e77b528df3e79e4357e12aabcd353031f933eb58', 'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6', 'enabled', '2026-02-08 08:27:26.174365+00', NULL);


--
-- Data for Name: image_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."image_categories" ("id", "name", "sort_order", "created_at") VALUES
	('f40531ce-cdf3-4e55-8fb0-9aa9e9112f98', '说撒上', 1, '2026-02-03 10:45:25.07213+00'),
	('b7cd6e12-86ec-4ebb-9e96-3f81af5190dc', '的订单', 2, '2026-02-03 10:45:29.721226+00');


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."images" ("id", "name", "url", "category_id", "created_at") VALUES
	('7c546dce-2e36-4b85-be5c-71d4af4762ee', '0001', 'https://img.fantula.com/uploads/1770115567196-gsgeq5.webp', 'f40531ce-cdf3-4e55-8fb0-9aa9e9112f98', '2026-02-03 10:46:07.792402+00'),
	('fd552c6f-52ef-4e30-9579-8fe063be7aec', '002', 'https://img.fantula.com/uploads/1770116046247-ii8lrc.webp', 'f40531ce-cdf3-4e55-8fb0-9aa9e9112f98', '2026-02-03 10:54:06.798052+00'),
	('04f2cac2-76ae-480d-b79f-d084de976797', '003', 'https://img.fantula.com/uploads/1770116078907-02pxfc.webp', 'b7cd6e12-86ec-4ebb-9e96-3f81af5190dc', '2026-02-03 10:54:39.623037+00'),
	('496c7ae3-96dc-4ad9-8db6-f20c41fa8482', '004', 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 'b7cd6e12-86ec-4ebb-9e96-3f81af5190dc', '2026-02-03 10:54:56.238816+00');


--
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."banners" ("id", "image_id", "title", "link", "sort_order", "status", "created_at") VALUES
	('a7f0aa6a-6d67-44b5-a52c-ef62d7034ceb', '04f2cac2-76ae-480d-b79f-d084de976797', '001', '000', 0, 'on', '2026-02-03 10:55:13.004059+00');


--
-- Data for Name: product_skus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_skus" ("id", "spec_combination", "image", "intro", "price", "duration", "enabled", "sort_order", "created_at", "product_type", "tag", "tag_name") VALUES
	('b4536de5-46ed-404e-9722-cb712542548a', '{"地区": "香港", "时长": "一个月"}', '', '10', 10.00, 3, true, 0, '2026-02-03 10:58:08.719533+00', 'virtual', NULL, NULL),
	('783046e6-4fbc-47db-a4df-3c948e347162', '{"地区": "日本", "时长": "一个月"}', '', '21', 10.00, 3, true, 1, '2026-02-03 10:58:08.719533+00', 'virtual', NULL, NULL),
	('3b78b8cb-a716-4654-b68a-81e136b3d17b', '{"地区": "香港", "时长": "三个月"}', '', '0121', 10.00, 3, true, 2, '2026-02-03 10:58:08.719533+00', 'virtual', NULL, NULL),
	('0c9d192b-215a-41e8-b8bd-eba19e06ad84', '{"地区": "日本", "时长": "三个月"}', '', '11', 10.00, 3, true, 3, '2026-02-03 10:58:08.719533+00', 'virtual', NULL, NULL),
	('366cd1cf-b361-4b1c-8919-e729b1ee4df7', '{"地区": "日本", "时长": "一个月"}', '', '1111', 10.00, 10, true, 0, '2026-02-03 11:02:30.199099+00', 'shared_account', NULL, NULL),
	('6b694c74-cf1f-4990-84ac-6eaad1a83d59', '{"时长": "一个月"}', '', '111', 10.00, 10, true, 0, '2026-02-03 11:05:27.933876+00', 'one_time_cdk', NULL, NULL);


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "uid", "email", "status", "created_at", "nickname", "balance", "avatar", "wechat_openid", "wechat_unionid") VALUES
	('8ed241f2-00ba-4948-9f37-2ea13358c0a0', '80525303', 'admin@fantula.com', 'active', '2026-02-01 04:09:26.013472+00', 'admin', 0.00, '', NULL, NULL),
	('c06ea09e-d25c-4d6b-a1cc-6ff7c4c0dae6', '96809725', 'jiangdalin1888@gmail.com', 'active', '2026-02-01 06:58:21.49209+00', 'jiangdalin1888', 0.00, '', NULL, NULL),
	('7b635332-9d91-46a5-a76f-8f0350c6bc35', '84062910', 'liumeiti1108@gmail.com', 'active', '2026-02-02 05:49:39.33335+00', 'liumeiti1108', 0.00, '', NULL, NULL),
	('ef1af153-941d-4157-8e16-6709a496156a', '22024353', 'liumeiti1104@gmail.com', 'active', '2026-02-03 04:56:45.253928+00', 'liumeiti1104', 0.00, '', NULL, NULL),
	('ff275704-8d9c-4bcf-ac6e-32166d48b122', '88755675', 'jiangdalin1966@gmail.com', 'active', '2026-02-08 08:27:46.788289+00', 'jiangdalin1966', 0.00, '', NULL, NULL),
	('bfb8fb0c-bd4c-4b08-a63b-105fdc88c3ca', '22985213', 'jiangdalin1999@gmail.com', 'active', '2026-02-01 06:24:19.432056+00', 'Support（10:00-23:00）', 0.00, 'https://thirdwx.qlogo.cn/mmopen/vi_32/WmFWNeOgHXul8ndec3ehbQO0BxamAqcU0OBWwU9Pad8NgPcLbmiaA7vH3fIe1LgZiaqj1ezq772Ha3gefG5bhib414cnEzeVqmbz7ic0EJefVjE/132', 'oi2267Te6udBzy9dW80qAmN_6JVY', NULL),
	('f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '41691870', 'jiangdalin1988@gmail.com', 'active', '2026-02-01 07:04:33.661014+00', 'jian', 0.00, 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJ75UDTUyxkoPZibvGaysia5w1c0skiceoaCYWCqkodEXpVs04lxCPTSyVrgVLvqOnJtzCETgZRT1rvVgVyx6DAjU687K17HTLdyiafz5CGoCOcfw/132', 'oi2267QwkltAYW-vrfREVV_5LP7Y', NULL);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."cart_items" ("id", "user_id", "sku_id", "quantity", "created_at") VALUES
	('e42d9426-b379-4000-9d2e-72472b2f0243', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', 'b4536de5-46ed-404e-9722-cb712542548a', 1, '2026-02-07 07:35:37.321726+00');


--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."coupons" ("id", "name", "type", "value", "min_usage", "sku_ids", "total_quantity", "start_date", "end_date", "status", "created_at", "used_quantity", "code") VALUES
	('d7f016ce-332a-4f37-b58d-6327e3f7862d', '余额券', 'balance', 10.00, 0.00, '{}', NULL, '2026-02-04', '2026-02-26', true, '2026-02-04 04:25:04.842904+00', 8, NULL);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."orders" ("id", "order_no", "order_type", "start_time", "end_time", "created_at", "status", "product_snapshot", "sku_snapshot", "user_id", "quantity", "cdk_snapshot", "expires_at", "slot_occupancy_ids", "total_amount", "original_amount", "coupon_snapshot") VALUES
	('5708c22a-e446-41bb-8eaf-df1f69078a21', '2026020471887', 'virtual', '2026-02-04 04:57:29.759655+00', '2026-02-07 04:57:29.759655+00', '2026-02-04 04:57:29.759655+00', 'pending_delivery', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["0c208917-cdb1-4228-b57d-b1f632f851e2"]}', '2026-02-07 04:57:29.759655+00', '{}', 10.00, 10.00, NULL),
	('623f6c7b-bca1-4176-ae97-67e41ed2f685', '2026020439573', 'virtual', '2026-02-04 04:54:44.723582+00', '2026-02-07 04:54:44.723582+00', '2026-02-04 04:54:44.723582+00', 'pending_delivery', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["0c208917-cdb1-4228-b57d-b1f632f851e2"]}', '2026-02-07 04:54:44.723582+00', '{}', 10.00, 10.00, NULL),
	('22d15088-1d6e-4681-a110-69ac076743d0', '2026020418826', 'shared_account', '2026-02-04 05:16:02.007635+00', '2026-02-14 05:16:02.007635+00', '2026-02-04 05:16:02.007635+00', 'active', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "93c38782-8686-429d-843a-64d26654bd26", "product_name": "油管合租"}', '{"price": 10.00, "sku_id": "366cd1cf-b361-4b1c-8919-e729b1ee4df7", "duration": 10, "product_type": "shared_account", "spec_combination": {"地区": "日本", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98"]}', '2026-02-14 05:16:02.007635+00', '{227f0d00-5b61-45ae-a3a4-c74bfd378c07}', 10.00, 10.00, NULL),
	('7f3bef4f-f6b9-4131-95de-151dbcaa7914', '2026020488976', 'virtual', '2026-02-04 04:35:44.245296+00', '2026-02-07 04:35:44.245296+00', '2026-02-04 04:35:44.245296+00', 'pending_delivery', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["0c208917-cdb1-4228-b57d-b1f632f851e2"]}', '2026-02-07 04:35:44.245296+00', '{}', 10.00, 10.00, NULL),
	('ce521be9-3cb2-4bfa-87f8-9359f01b08c0', '2026020505461', 'shared_account', '2026-02-05 05:19:59.37705+00', '2026-02-15 05:19:59.37705+00', '2026-02-05 05:19:59.37705+00', 'active', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "93c38782-8686-429d-843a-64d26654bd26", "product_name": "油管合租"}', '{"price": 10.00, "sku_id": "366cd1cf-b361-4b1c-8919-e729b1ee4df7", "duration": 10, "product_type": "shared_account", "spec_combination": {"地区": "日本", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98"]}', '2026-02-15 05:19:59.37705+00', '{1f58bc30-5087-4422-90c9-a44280ad0124}', 10.00, 10.00, NULL),
	('abec5c10-594f-48c0-b7f5-d679f83ae1fd', '2026020772677', 'virtual', '2026-02-07 12:37:07.405217+00', '2026-02-10 12:37:07.405217+00', '2026-02-07 12:37:07.405217+00', 'pending_delivery', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["0c208917-cdb1-4228-b57d-b1f632f851e2"]}', '2026-02-10 12:37:07.405217+00', '{}', 10.00, 10.00, NULL),
	('afbc4595-a76e-4d29-a3ee-c78728e955d5', '2026020847757', 'virtual', '2026-02-08 04:51:23.652958+00', '2026-02-11 04:51:23.652958+00', '2026-02-08 04:51:23.652958+00', 'pending_delivery', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["0c208917-cdb1-4228-b57d-b1f632f851e2"]}', '2026-02-11 04:51:23.652958+00', '{}', 10.00, 10.00, NULL),
	('bba9d7ab-fefa-4776-916f-f915d1644f29', '2026020799147', 'virtual', '2026-02-07 12:33:08.347539+00', '2026-02-10 12:33:08.347539+00', '2026-02-07 12:33:08.347539+00', 'pending_delivery', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1, '{"locked_cdk_ids": ["0c208917-cdb1-4228-b57d-b1f632f851e2"]}', '2026-02-10 12:33:08.347539+00', '{}', 10.00, 10.00, NULL);


--
-- Data for Name: user_coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: pre_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pre_orders" ("id", "user_id", "status", "total_amount", "source", "expires_at", "created_at", "order_no", "quantity", "unit_price", "product_snapshot", "sku_snapshot", "locked_cdk_ids", "locked_slot_ids", "coupon_id", "discount_amount", "original_amount", "related_order_id") VALUES
	('8062a311-6425-4dec-bac4-67e99ca8757c', '8ed241f2-00ba-4948-9f37-2ea13358c0a0', 'deleted', 10.00, 'buy_now', '2026-02-06 10:45:51.501192+00', '2026-02-06 10:30:51.501192+00', '2026020620083', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', '{0c208917-cdb1-4228-b57d-b1f632f851e2}', '{}', NULL, 0.00, 10.00, NULL),
	('6ba613e8-8e3c-4649-8ef3-b17756cd7cfb', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'converted', 10.00, 'buy_now', '2026-02-07 12:37:20.118768+00', '2026-02-07 12:22:20.118768+00', '2026020799147', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', '{0c208917-cdb1-4228-b57d-b1f632f851e2}', '{}', NULL, 0.00, 10.00, NULL),
	('e1d1d701-5088-4f14-873f-0f229f8236f6', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'converted', 10.00, 'buy_now', '2026-02-07 12:52:04.842798+00', '2026-02-07 12:37:04.842798+00', '2026020772677', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', '{0c208917-cdb1-4228-b57d-b1f632f851e2}', '{}', NULL, 0.00, 10.00, NULL),
	('dff1766e-5aa9-4bef-903e-66f706143bbc', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'converted', 10.00, 'cart', '2026-02-08 05:06:02.086726+00', '2026-02-08 04:51:02.086726+00', '2026020847757', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', '{0c208917-cdb1-4228-b57d-b1f632f851e2}', '{}', NULL, 0.00, 10.00, NULL),
	('b820df9b-7efc-42c3-ae42-4c6629e8e61e', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'deleted', 10.00, 'buy_now', '2026-02-08 08:02:22.096976+00', '2026-02-08 07:47:22.096976+00', '2026020879835', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "93c38782-8686-429d-843a-64d26654bd26", "product_name": "油管合租"}', '{"price": 10.00, "sku_id": "366cd1cf-b361-4b1c-8919-e729b1ee4df7", "duration": 10, "product_type": "shared_account", "spec_combination": {"地区": "日本", "时长": "一个月"}}', '{c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98}', '{90d89694-1c99-4bde-9549-7cb6462dfad2}', NULL, 0.00, 10.00, NULL),
	('17acccc4-b4d0-4161-8483-deaa8e4a1bb3', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'deleted', 10.00, 'buy_now', '2026-02-08 15:18:49.916714+00', '2026-02-08 15:03:49.916714+00', '2026020808865', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "93c38782-8686-429d-843a-64d26654bd26", "product_name": "油管合租"}', '{"price": 10.00, "sku_id": "366cd1cf-b361-4b1c-8919-e729b1ee4df7", "duration": 10, "product_type": "shared_account", "spec_combination": {"地区": "日本", "时长": "一个月"}}', '{c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98}', '{3cd87c01-e2bf-4659-828d-e69256f93726}', NULL, 0.00, 10.00, NULL),
	('0f960efb-d590-48da-838c-aa68d926e9b3', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'pending', 10.00, 'cart', '2026-02-08 15:23:00.641407+00', '2026-02-08 15:08:00.641407+00', '2026020881837', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', '{0c208917-cdb1-4228-b57d-b1f632f851e2}', '{}', NULL, 0.00, 10.00, NULL),
	('5cd8baf1-e20f-487e-ba29-17beeb5760b0', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'pending', 10.00, 'cart', '2026-02-08 16:08:56.109197+00', '2026-02-08 15:53:56.109197+00', '2026020808868', 1, 10.00, '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp", "product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值"}', '{"price": 10.00, "sku_id": "b4536de5-46ed-404e-9722-cb712542548a", "duration": 3, "product_type": "virtual", "spec_combination": {"地区": "香港", "时长": "一个月"}}', '{0c208917-cdb1-4228-b57d-b1f632f851e2}', '{}', NULL, 0.00, 10.00, NULL);


--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_categories" ("id", "name", "sort_order", "status", "created_at") VALUES
	('349f809a-4a04-434b-8ce9-ae2f7ae3b855', '虚拟的', 0, 'on', '2026-02-03 10:56:09.355416+00'),
	('440c3546-e691-4875-b372-dc1f60d378b8', '合租的', 1, 'on', '2026-02-03 10:56:16.779951+00');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "product_name", "status", "created_at", "category_id", "image", "sort_order", "display_price", "tags", "initial_sales", "badge_label", "rating", "allow_addon", "detail_modules") VALUES
	('6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '虚拟充值', 'on', '2026-02-03 10:56:57.888841+00', '349f809a-4a04-434b-8ce9-ae2f7ae3b855', 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 0, 100.00, '{}', 100, '新品', 100, false, '[{"type": "image", "content": "https://img.fantula.com/uploads/1770116078907-02pxfc.webp"}]'),
	('93c38782-8686-429d-843a-64d26654bd26', '油管合租', 'on', '2026-02-03 11:01:51.497892+00', '349f809a-4a04-434b-8ce9-ae2f7ae3b855', 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 2, 100.00, '{全球通用,一个菜蔬}', 100, '推荐', 100, true, '[{"type": "image", "content": "https://img.fantula.com/uploads/1770116078907-02pxfc.webp"}]'),
	('8b5f8154-5ade-4fae-ad48-55157b3d94da', '是谁分', 'on', '2026-02-03 11:04:56.747561+00', '440c3546-e691-4875-b372-dc1f60d378b8', 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 1, 10.00, '{}', 100, '限量', 100, true, '[{"type": "image", "content": "https://img.fantula.com/uploads/1770116078907-02pxfc.webp"}]');


--
-- Data for Name: cdks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."cdks" ("id", "product_id", "code", "cdk_type", "account_data", "status", "created_at", "used_at", "max_slots", "stock", "pre_order_id", "product_snapshot") VALUES
	('c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', NULL, '{"账号":"111","密码":"0111"}', 'shared', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03 11:03:54.952195+00', NULL, 5, 1, NULL, '{"product_id": "93c38782-8686-429d-843a-64d26654bd26", "product_name": "油管合租", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}'),
	('bdbef8fa-21ba-4eb9-ad29-1a3af39213e9', NULL, '445555', 'one_time', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03 11:05:58.192006+00', NULL, 1, 1, NULL, '{"product_id": "8b5f8154-5ade-4fae-ad48-55157b3d94da", "product_name": "是谁", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}'),
	('c633bb29-cf0d-4b25-9b90-7205be89581d', NULL, '1242424', 'one_time', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03 11:05:58.192006+00', NULL, 1, 1, NULL, '{"product_id": "8b5f8154-5ade-4fae-ad48-55157b3d94da", "product_name": "是谁", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}'),
	('0c208917-cdb1-4228-b57d-b1f632f851e2', NULL, '{"fields":["邮箱","是谁","发发发"]}', 'virtual', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03 11:03:26.83157+00', NULL, 1, 992, NULL, '{"product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "虚拟充值", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}');


--
-- Data for Name: cdk_sku_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."cdk_sku_map" ("id", "cdk_id", "sku_id", "created_at") VALUES
	('deca0652-9510-44ae-98dc-110e83818d2e', '0c208917-cdb1-4228-b57d-b1f632f851e2', 'b4536de5-46ed-404e-9722-cb712542548a', '2026-02-03 11:03:27.17332+00'),
	('707794f9-c7c7-463a-918c-c5cf1e113649', '0c208917-cdb1-4228-b57d-b1f632f851e2', '783046e6-4fbc-47db-a4df-3c948e347162', '2026-02-03 11:03:27.17332+00'),
	('c2be5420-d5da-4471-89d1-2a0fddc6124b', '0c208917-cdb1-4228-b57d-b1f632f851e2', '3b78b8cb-a716-4654-b68a-81e136b3d17b', '2026-02-03 11:03:27.17332+00'),
	('41eb12d4-efa3-4ae0-94b4-22a8f1dbb5fd', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', '366cd1cf-b361-4b1c-8919-e729b1ee4df7', '2026-02-03 11:03:55.183599+00'),
	('e8fb56eb-e995-45f6-94c0-02f5a507a8d8', 'bdbef8fa-21ba-4eb9-ad29-1a3af39213e9', '6b694c74-cf1f-4990-84ac-6eaad1a83d59', '2026-02-03 11:05:58.368143+00'),
	('192d3071-e612-48d3-8b79-f9eb03c9adbd', 'c633bb29-cf0d-4b25-9b90-7205be89581d', '6b694c74-cf1f-4990-84ac-6eaad1a83d59', '2026-02-03 11:05:58.368143+00');


--
-- Data for Name: channel_recognitions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: community_articles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: community_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: coupon_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."coupon_codes" ("id", "coupon_id", "code", "status", "user_uid", "used_at", "created_at", "updated_at", "max_usage", "used_count") VALUES
	('4905d911-f7c7-4d15-a7a9-f095b5767689', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', '23D-WKG-N7G-GQ9', 'available', NULL, NULL, '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 0),
	('aadce1d7-2224-4d0c-9d84-00e72c5c1477', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'CWF-BXG-JNQ-QN9', 'available', NULL, NULL, '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 0),
	('163cd702-011d-4fc3-be74-ea70eeb54764', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'FFY-SSP-D5R-PDZ', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-04 04:34:30.298206+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('b2b1a365-35e9-4951-b329-864f36136977', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', '7G8-CYW-C8A-ZZW', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-04 04:34:47.689411+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('3f279709-6c1d-46e9-b56e-57cd6de66338', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'NVM-29H-PGG-D7W', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-04 04:35:00.994187+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('1366ec00-33f9-4f16-a638-bb530511c00e', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'QNG-HEM-HHR-ULC', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-04 04:35:17.640034+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('7da5c259-2410-4507-aa8a-3a88f98d956e', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'LWG-UJP-7B8-8TK', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-05 05:19:39.916539+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('3e190885-800f-48ae-b249-655ebbd3b3e1', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', '9SR-3JA-KMZ-AF7', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-07 07:55:06.962593+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('ef7fcc20-5cf2-43ac-87f8-7bc03005552e', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'D57-Q9Y-SGX-GVC', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-07 09:33:01.745445+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1),
	('5772fea9-c534-4967-adab-ca669e6683d2', 'd7f016ce-332a-4f37-b58d-6327e3f7862d', 'MAX-ZX4-9VK-5VJ', 'exhausted', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '2026-02-07 12:49:11.984225+00', '2026-02-04 04:25:12.650867+00', '2026-02-04 04:25:12.650867+00', 1, 1);


--
-- Data for Name: faq_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."faq_categories" ("id", "name", "sort_order", "is_active", "created_at", "updated_at", "is_checkout_visible") VALUES
	('3c3244c0-96a1-4b96-952d-f5e40008a129', '拼车', 2, true, '2026-02-07 06:06:36.735963+00', '2026-02-07 06:06:36.735963+00', false),
	('baea822d-976f-4dd6-b3ea-997455c6624b', '频道识别', 4, true, '2026-02-07 06:07:04.337189+00', '2026-02-07 06:07:04.337189+00', false),
	('5b8912ce-4117-4049-ac98-974074991d94', '代充问题', 1, true, '2026-02-07 06:06:14.916412+00', '2026-02-07 06:06:14.916412+00', false),
	('30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '常见问题', 0, true, '2026-02-07 06:05:53.08658+00', '2026-02-07 06:05:53.08658+00', true);


--
-- Data for Name: faqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."faqs" ("id", "category_id", "question", "answer", "product_id", "sort_order", "is_active", "created_at", "updated_at") VALUES
	('772b9e7b-217b-44b9-aa66-85d6c9912b90', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '售后问题怎么联系客服?', '使⽤过程中出现问题，可以通过''在线⼯单， 客服微信，TG 等⽅式联系客
服，⼯作时间都会回复｡', NULL, 0, true, '2026-02-07 06:08:37.143731+00', '2026-02-07 06:08:37.143731+00'),
	('17478f89-26a2-4fa7-822e-465db7497537', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '代充服务稳定吗？', '稳定的，常用渠道长期跑，异常会第一时间处理，不会放着不管', NULL, 1, true, '2026-02-07 06:11:54.603586+00', '2026-02-07 06:11:54.603586+00'),
	('c978d601-5c19-4122-bdc9-a4da3efe9e9c', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '购买后可以退款吗?', ' 如因平台原因未完成服务，可退款至账户额度；已完成的订单不支持退款。', NULL, 0, true, '2026-02-07 06:13:21.583918+00', '2026-02-07 06:13:21.583918+00'),
	('6e2da21e-d5b7-4e02-9527-b0ce89e52323', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '共享可以多设备同时使⽤吗?', '支持多设备使用，但需遵守使用规则，异常会限制。', NULL, 3, true, '2026-02-07 06:14:40.368606+00', '2026-02-07 06:14:40.368606+00'),
	('e345cfcf-9de5-427d-9192-2a8b4861901e', '5b8912ce-4117-4049-ac98-974074991d94', '下单后多久完成？', ' 一般很快完成，个别情况会稍慢，超时可联系客服处理。', NULL, 0, true, '2026-02-07 06:16:52.155754+00', '2026-02-07 06:16:52.155754+00'),
	('9bfce054-9ff3-425f-b583-5afa0a011916', '5b8912ce-4117-4049-ac98-974074991d94', '需要提供账号密码吗？', ' 不需要，只需按提示填写必要信息即可。', NULL, 2, true, '2026-02-07 06:18:04.945258+00', '2026-02-07 06:18:04.945258+00'),
	('a737f2aa-df45-450b-9e05-2f6b9b40ad17', '5b8912ce-4117-4049-ac98-974074991d94', '为什么有时需要人工确认？', '少数情况需人工核对，避免充错或异常。', NULL, 4, true, '2026-02-07 06:18:44.636026+00', '2026-02-07 06:18:44.636026+00'),
	('a2764f32-7573-483f-9a64-4b955be72b37', '5b8912ce-4117-4049-ac98-974074991d94', '没收到怎么办？', '先别急，查看订单状态，异常可直接联系客服。', NULL, 4, true, '2026-02-07 06:19:13.538617+00', '2026-02-07 06:19:13.538617+00'),
	('5fb25e63-6702-438c-bfd6-ea3bf3c9d54c', '5b8912ce-4117-4049-ac98-974074991d94', '可以给别人充值吗？', '可以，填写对方信息即可，确认无误再提交。', NULL, 5, true, '2026-02-07 06:19:40.127228+00', '2026-02-07 06:19:40.127228+00'),
	('47f03f46-faad-4e6f-86c5-ebd1b6e254ac', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '订单失败会扣钱吗？', '不会，失败订单会自动退回到账户。', NULL, 6, true, '2026-02-07 06:20:10.460438+00', '2026-02-07 06:20:10.460438+00'),
	('d4f6c381-cd5e-45bb-be06-ae3d85a1506e', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '支持哪些支付方式？', '支持多种常用支付方式，以充值页面显示为准。', NULL, 6, true, '2026-02-07 06:20:47.178446+00', '2026-02-07 06:20:47.178446+00'),
	('a457801b-0fb3-4306-b5d4-5a643df888f1', '5b8912ce-4117-4049-ac98-974074991d94', '会封号或有风险吗？', '正常使用风险极低，违规操作可能被限制。', NULL, 7, true, '2026-02-07 06:21:18.318809+00', '2026-02-07 06:21:18.318809+00'),
	('decad527-3dd5-4a04-8dd3-d3e0bfbca5c6', '30e2e5f1-ed60-4e55-b85e-fa455e2c5b1d', '可以重复购买吗？', '可以，到期或用完后可随时续购。', NULL, 5, true, '2026-02-07 06:21:45.070715+00', '2026-02-07 06:21:45.070715+00');


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."messages" ("id", "user_uid", "title", "content", "is_read", "created_at", "user_id", "type", "link", "data") VALUES
	('847f792e-1831-4a8b-919e-881d3cb828ae', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-04 04:34:30.298206+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('4d5a600a-5568-43f0-b08c-c5e365728210', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：10.00', true, '2026-02-04 04:34:38.264661+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('177a550f-d90a-49be-9de9-8e7f9c0882ed', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-04 04:34:47.689411+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('83a4f2e1-c844-4a68-9427-6d6691c991ce', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：20.00', true, '2026-02-04 04:34:51.689708+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('2927c047-8f07-477e-bcc0-6f3b5a885649', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-04 04:35:00.994187+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('90fa3579-152a-4d0d-9955-8e803fd5ac8d', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：30.00', true, '2026-02-04 04:35:06.029346+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('ff2af4ea-a5a7-440d-be72-506e1f60a50d', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-04 04:35:17.640034+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('50d18ac2-5f9b-4865-882c-132337aaf0a6', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：40.00', true, '2026-02-04 04:35:23.639401+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('0e0f23a2-36f8-4fea-9c57-44eda1bc1e1a', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：30.00', true, '2026-02-04 04:35:44.245296+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('898a85de-5faf-4992-8d0d-0250c0b6916a', '41691870', '下单成功 (Order Placed)', '您的订单 2026020488976 已成功提交。我们正在为您准备商品。', true, '2026-02-04 04:35:44.245296+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('bb64f23a-3968-46b9-9f10-f47438688e2f', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：20.00', true, '2026-02-04 04:54:44.723582+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('78ed261a-aad6-4cf9-bd63-19cab3bfe03e', '41691870', '下单成功 (Order Placed)', '您的订单 2026020439573 已成功提交。我们正在为您准备商品。', true, '2026-02-04 04:54:44.723582+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('887fcc8f-091e-4dbd-a46a-2d37267561c1', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：10.00', true, '2026-02-04 04:57:29.759655+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('a0939346-c070-4827-94d7-c26b0c1e96c0', '41691870', '下单成功 (Order Placed)', '您的订单 2026020471887 已成功提交。我们正在为您准备商品。', true, '2026-02-04 04:57:29.759655+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('22827ca3-275c-4191-86cb-61659b3d4c06', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：0.00', true, '2026-02-04 05:16:02.007635+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('763fa6d7-f186-4106-81e4-e74eb15217bf', '41691870', '下单成功 (Order Placed)', '您的订单 2026020418826 已成功提交。我们正在为您准备商品。', true, '2026-02-04 05:16:02.007635+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('c7882a6f-3dae-43bb-9dbf-fdd6a8d5e518', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-05 05:19:39.916539+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('5f18445d-4c19-4eda-b7c4-f44f1a2a4879', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：10.00', true, '2026-02-05 05:19:44.369259+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('84561294-a5bc-427b-bf99-80f2104943f4', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：0.00', true, '2026-02-05 05:19:59.37705+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('410fe08c-ce87-4562-939f-58f355147bb0', '41691870', '下单成功 (Order Placed)', '您的订单 2026020505461 已成功提交。我们正在为您准备商品。', true, '2026-02-05 05:19:59.37705+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('5f53581e-62b2-454d-97e7-c4929c041987', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-07 07:55:06.962593+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('a16345cf-9c1f-4208-a35d-31928051a01e', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：10.00', true, '2026-02-07 09:32:29.539407+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('251d61d3-0447-4d39-8f9b-45263439f11e', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-07 09:33:01.745445+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('f8a3be3b-0419-4b5a-9a3a-61fde30cd486', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：20.00', true, '2026-02-07 09:33:06.365058+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('419f2ab9-238e-4328-90f1-7487e908f6dd', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：10.00', true, '2026-02-07 12:33:08.347539+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('d5c148eb-b050-4321-b622-7ecf9d32d94d', '41691870', '下单成功 (Order Placed)', '您的订单 2026020799147 已成功提交。我们正在为您准备商品。', true, '2026-02-07 12:33:08.347539+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('352b7ac3-a516-4ce7-9b83-9768ee204b94', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：0.00', true, '2026-02-07 12:37:07.405217+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('647aa51f-8096-4ada-9070-78d87abc6e84', '41691870', '下单成功 (Order Placed)', '您的订单 2026020772677 已成功提交。我们正在为您准备商品。', true, '2026-02-07 12:37:07.405217+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('cf00868e-16d1-4a90-8b54-f7404db5e02e', '41691870', '优惠券到账 (Coupon Received)', '恭喜！您获得了一张新的优惠券，快去使用吧。', true, '2026-02-07 12:49:11.984225+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'activity', '/profile/coupons', NULL),
	('b6b2c84b-db57-4d4a-be4a-d68efb3d3ada', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额增加了 10.00 元。当前余额：10.00', true, '2026-02-07 12:49:24.682266+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL),
	('0826c545-5738-43e8-9743-5638dc5b2520', '41691870', '下单成功 (Order Placed)', '您的订单 2026020847757 已成功提交。我们正在为您准备商品。', true, '2026-02-08 04:51:23.652958+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'order', '/profile/orders', NULL),
	('47d16f00-70f0-4cb3-89af-525409a49be1', '41691870', '余额变动通知 (Balance Updated)', '您的账户余额减少了 10.00 元。当前余额：0.00', true, '2026-02-08 04:51:23.652958+00', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'system', '/profile/wallet', NULL);


--
-- Data for Name: order_fulfillments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."order_fulfillments" ("id", "order_id", "status", "payload", "reject_reason", "submitted_at", "reviewed_at", "created_at") VALUES
	('b2c8d1e7-ba0b-4ca4-ae27-4a365b1ad86a', '623f6c7b-bca1-4176-ae97-67e41ed2f685', 'submitted', '{"是谁": "ffff", "邮箱": "fff", "_cdk_id": "0c208917-cdb1-4228-b57d-b1f632f851e2", "发发发": "dsdsdsds"}', NULL, '2026-02-04 13:14:06.065+00', NULL, '2026-02-04 13:14:06.406106+00'),
	('5d103f40-d9d7-4d6d-9b5d-6772e3c0521e', '5708c22a-e446-41bb-8eaf-df1f69078a21', 'submitted', '{"是谁": "vvv", "邮箱": "储存订单", "_cdk_id": "0c208917-cdb1-4228-b57d-b1f632f851e2", "发发发": "放电饭锅电饭煲"}', NULL, '2026-02-06 10:30:12.169+00', NULL, '2026-02-06 10:30:00.327964+00'),
	('efe0c1a4-b75f-4c79-87b7-e09cc21af6a6', 'bba9d7ab-fefa-4776-916f-f915d1644f29', 'submitted', '{"是谁": "地铁姑姑", "邮箱": "顶级", "_cdk_id": "0c208917-cdb1-4228-b57d-b1f632f851e2", "发发发": "符合会立即七日"}', NULL, '2026-02-08 15:07:31.150807+00', NULL, '2026-02-08 15:07:31.150807+00');


--
-- Data for Name: product_sku_map; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."product_sku_map" ("id", "product_id", "sku_id", "sort_order", "created_at") VALUES
	('43950f5a-20fb-4c81-ae2d-1842205688ed', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', 'b4536de5-46ed-404e-9722-cb712542548a', 0, '2026-02-03 10:58:09.083786+00'),
	('ef2921ef-88d2-4e49-bd7d-e73154b58243', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '783046e6-4fbc-47db-a4df-3c948e347162', 1, '2026-02-03 10:58:09.083786+00'),
	('f5e7a27d-a980-4d33-bd7e-44034c8e3d21', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '3b78b8cb-a716-4654-b68a-81e136b3d17b', 2, '2026-02-03 10:58:09.083786+00'),
	('899250b9-787a-42a7-976c-cb746898cd17', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '0c9d192b-215a-41e8-b8bd-eba19e06ad84', 3, '2026-02-03 10:58:09.083786+00'),
	('22a399c1-3cf8-4db9-8ec3-d2542313fabd', '93c38782-8686-429d-843a-64d26654bd26', '366cd1cf-b361-4b1c-8919-e729b1ee4df7', 0, '2026-02-03 11:02:30.389666+00'),
	('364b34a4-fc4b-41dc-8df7-aefcc81073fe', '8b5f8154-5ade-4fae-ad48-55157b3d94da', '6b694c74-cf1f-4990-84ac-6eaad1a83d59', 0, '2026-02-03 11:05:28.152836+00');


--
-- Data for Name: recharge_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."recharge_orders" ("id", "out_trade_no", "user_id", "amount", "amount_cents", "status", "pay_type", "description", "transaction_id", "payer_openid", "paid_at", "created_at", "updated_at", "bonus") VALUES
	('b0d35224-b899-4ad3-9d2d-c1f049d5d25f', 'RECHARGE20260203124404nkrPXb', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 1.00, 100, 'paid', 'wechat_native', '凡图拉-充值1点', '4200003064202602038660054892', 'oi2267QwkltAYW-vrfREVV_5LP7Y', '2026-02-03 12:44:27+00', '2026-02-03 12:44:04.605+00', '2026-02-03 12:44:29.456+00', 0.00);


--
-- Data for Name: recharge_tiers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."recharge_tiers" ("id", "amount", "bonus", "sort_order", "status", "created_at") VALUES
	('cb30dbf8-d064-4a57-836f-5ba6c670bce0', 10.00, 10.00, 1, 'on', '2026-02-03 06:50:06.755585+00'),
	('2bae3139-4c99-4bd8-98cd-5be55b5c4a79', 100.00, 20.00, 2, 'on', '2026-02-03 06:50:16.859579+00');


--
-- Data for Name: refund_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."refund_requests" ("id", "order_id", "user_id", "reason", "reason_detail", "original_status", "images_snapshot", "status", "refund_amount", "admin_id", "admin_note", "created_at", "reviewed_at") VALUES
	('e41ecb72-e84c-45f3-992f-fa9d49659970', '7f3bef4f-f6b9-4131-95de-151dbcaa7914', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', 'xx', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 04:39:30.778126+00', '2026-02-04 04:40:14.613691+00'),
	('b9a1d482-ec8e-4598-a133-8537b4109bb8', '623f6c7b-bca1-4176-ae97-67e41ed2f685', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', 'ss ', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 04:54:57.517758+00', '2026-02-04 04:55:02.332749+00'),
	('8bf4178a-70e9-476e-9ede-54bcd41e83c3', '5708c22a-e446-41bb-8eaf-df1f69078a21', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', 'dd', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 04:57:54.03868+00', '2026-02-04 05:00:27.271871+00'),
	('54b03c17-96ba-43ca-9914-3c8deb972dcf', '5708c22a-e446-41bb-8eaf-df1f69078a21', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', 'ss', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 05:04:55.062227+00', '2026-02-04 05:05:05.235716+00'),
	('4f7c1cb7-05f9-44a0-aaaf-d6db4ce5582e', '5708c22a-e446-41bb-8eaf-df1f69078a21', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '商品无法使用', 'ss', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 05:05:16.122763+00', '2026-02-04 05:09:48.370504+00'),
	('02853a29-5d9d-4363-a99a-498f81659ce6', '623f6c7b-bca1-4176-ae97-67e41ed2f685', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '商品无法使用', '', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 05:10:00.649033+00', '2026-02-04 05:13:51.698509+00'),
	('438d3218-a009-4623-b7b9-e0c47338441e', '22d15088-1d6e-4681-a110-69ac076743d0', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', '', 'active', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-04 05:31:15.655496+00', '2026-02-05 04:51:39.71117+00'),
	('7bf447ae-beeb-40bc-92bf-494e7682a9af', '22d15088-1d6e-4681-a110-69ac076743d0', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', '', 'active', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-05 05:17:11.141654+00', '2026-02-05 05:17:36.963276+00'),
	('99dd3db5-8bf9-499f-ade9-946a41f0c9d4', '7f3bef4f-f6b9-4131-95de-151dbcaa7914', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', '', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-07 09:44:14.042269+00', '2026-02-07 09:44:26.348012+00'),
	('a08b95af-8c92-418a-acee-ca75f5a3eeb0', 'ce521be9-3cb2-4bfa-87f8-9359f01b08c0', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', '', 'active', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-07 12:20:51.373395+00', '2026-02-07 12:21:01.039182+00'),
	('929349d8-f4d1-44ca-8cd9-5b5513744119', 'bba9d7ab-fefa-4776-916f-f915d1644f29', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '买错了/不需要了', '', 'pending_delivery', NULL, 'cancelled', NULL, NULL, NULL, '2026-02-08 15:06:54.685104+00', '2026-02-08 15:07:13.767365+00');


--
-- Data for Name: scheduled_task_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."scheduled_task_logs" ("id", "task_name", "status", "affected_count", "error_message", "executed_at", "error") VALUES
	('01bd31f7-ec25-47fd-bf3c-e374afb118e5', 'expire_active_orders', 'success', 0, NULL, '2026-02-04 04:20:37.279994+00', NULL);


--
-- Data for Name: shared_sku_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: slot_occupancies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."slot_occupancies" ("id", "cdk_id", "slot_index", "order_id", "status", "occupied_at", "released_at", "pre_order_id", "user_id") VALUES
	('67cad845-d766-4bb3-8f5f-bf26ac3e13f8', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 5, NULL, 'idle', '2026-02-03 11:03:55.566238+00', NULL, NULL, NULL),
	('227f0d00-5b61-45ae-a3a4-c74bfd378c07', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 1, '22d15088-1d6e-4681-a110-69ac076743d0', 'using', '2026-02-03 11:03:55.566238+00', NULL, NULL, 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c'),
	('1f58bc30-5087-4422-90c9-a44280ad0124', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 2, 'ce521be9-3cb2-4bfa-87f8-9359f01b08c0', 'using', '2026-02-03 11:03:55.566238+00', NULL, NULL, 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c'),
	('90d89694-1c99-4bde-9549-7cb6462dfad2', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 3, NULL, 'idle', '2026-02-03 11:03:55.566238+00', NULL, NULL, NULL),
	('3cd87c01-e2bf-4659-828d-e69256f93726', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 4, NULL, 'idle', '2026-02-03 11:03:55.566238+00', NULL, NULL, NULL);


--
-- Data for Name: system_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."system_settings" ("key", "value", "description", "created_at", "updated_at") VALUES
	('customer_notification_config', '{
    "order_created": true,
    "coupon_redeemed": true,
    "quota_changed": true,
    "order_shipped": true,
    "virtual_order_received": true,
    "ticket_replied": true
  }', 'Customer notification trigger configuration', '2026-01-31 09:40:34.849636+00', '2026-01-31 09:40:34.849636+00'),
	('R2_ACCOUNT_ID', '77e9b725d939b8b7b44df208a40f3fae', NULL, '2026-02-03 06:38:26.000472+00', '2026-02-03 09:08:33.419+00'),
	('R2_ACCESS_KEY_ID', '172bb5c0487ad18c534434c354f80f52', NULL, '2026-02-03 06:38:26.000472+00', '2026-02-03 09:08:33.419+00'),
	('R2_BUCKET_NAME', 'fantula2601', NULL, '2026-02-03 06:38:26.000472+00', '2026-02-03 09:08:33.419+00'),
	('R2_PUBLIC_BASE_URL', 'https://img.fantula.com', NULL, '2026-02-03 06:38:26.000472+00', '2026-02-03 09:08:33.419+00'),
	('R2_SECRET_ACCESS_KEY', 'f91c3774f41acd3c2da9ecfccb7f2820a619c2c571428d60907954d3787824bc', NULL, '2026-02-03 06:38:26.000472+00', '2026-02-03 09:08:33.419+00');


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tickets" ("id", "user_id", "order_id", "title", "status", "priority", "created_at", "updated_at", "resolved_at", "ticket_no") VALUES
	('544aca7a-fd69-469b-89ef-652c2b5c957b', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '7f3bef4f-f6b9-4131-95de-151dbcaa7914', 'dd', 'resolved', 'medium', '2026-02-04 04:36:30.274101+00', '2026-02-04 11:35:48.645+00', '2026-02-04 11:35:48.645+00', 'T-B2C3AB30'),
	('6991b958-e51a-4766-b178-3e0884559292', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '22d15088-1d6e-4681-a110-69ac076743d0', '嗯嗯', 'processing', 'medium', '2026-02-05 05:17:00.200819+00', '2026-02-05 05:17:00.200819+00', NULL, 'T-381E58C1'),
	('1a9da5c3-6319-49e9-a577-136ef5c59251', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'ce521be9-3cb2-4bfa-87f8-9359f01b08c0', '方法', 'processing', 'medium', '2026-02-07 10:51:16.6351+00', '2026-02-08 15:06:29.888273+00', NULL, 'T-3E2A6CB8');


--
-- Data for Name: ticket_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."ticket_messages" ("id", "ticket_id", "sender_id", "is_admin", "content", "message_type", "attachments", "created_at") VALUES
	('a5b48e13-a277-4640-a9f6-19038ed7c1d9', '544aca7a-fd69-469b-89ef-652c2b5c957b', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', false, 'fffff', 'text', '{}', '2026-02-04 04:36:30.274101+00'),
	('1d3c9d06-54b0-4681-b2d5-5598747ceefe', '6991b958-e51a-4766-b178-3e0884559292', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', false, '呃呃呃呃', 'text', '{}', '2026-02-05 05:17:00.200819+00'),
	('92d857d5-eaf0-4e5f-99c9-565b701168af', '1a9da5c3-6319-49e9-a577-136ef5c59251', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', false, '反反复复', 'text', '{}', '2026-02-07 10:51:16.6351+00'),
	('8aed2222-afc5-463e-a8c7-d2a59b6e6f81', '1a9da5c3-6319-49e9-a577-136ef5c59251', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', false, '凝固剂我会', 'text', '{}', '2026-02-08 15:06:29.888273+00');


--
-- Data for Name: user_favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: wallet_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."wallet_transactions" ("id", "user_id", "type", "amount", "balance_after", "description", "created_at") VALUES
	('bf1476e4-1476-44da-9124-d99280954e66', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '微信充值', 1.00, 1.00, '微信支付充值 1.00点 赠送0.00点', '2026-02-03 12:44:30.021+00'),
	('bb03cae4-5e9a-4e81-b2f7-a8c7bb9a20c2', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '微信充值', 1.00, 1.00, '微信支付充值 1.00点 赠送0.00点', '2026-02-03 12:44:30.824+00'),
	('54b515ae-0e1c-4148-9fbe-a4f555c57b67', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 10.00, NULL, '2026-02-04 04:34:38.264661+00'),
	('a9f9cf1a-2c5b-4dc0-af85-2bc4f8e286a4', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 20.00, NULL, '2026-02-04 04:34:51.689708+00'),
	('79989d4f-39a1-40aa-b028-99c0fc6c7c2c', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 30.00, NULL, '2026-02-04 04:35:06.029346+00'),
	('9bf6ac47-db07-4059-a567-00b885313eca', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 40.00, NULL, '2026-02-04 04:35:23.639401+00'),
	('d452d749-ba8c-4496-9dda-53e1e178cf9d', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 30.00, '虚拟充值：香港，一个月', '2026-02-04 04:35:44.245296+00'),
	('2111c394-199f-4d62-b1f6-98ffca6c8cc4', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 20.00, '虚拟充值：香港，一个月', '2026-02-04 04:54:44.723582+00'),
	('af396f80-b7f3-468f-b1c6-5b292c95185a', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 10.00, '虚拟充值：香港，一个月', '2026-02-04 04:57:29.759655+00'),
	('e08692ea-51df-4ea1-9afc-6fc07b1701a5', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 0.00, '油管合租：日本，一个月', '2026-02-04 05:16:02.007635+00'),
	('881f4bea-5a27-4f06-be5b-d805202afa0c', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 10.00, NULL, '2026-02-05 05:19:44.369259+00'),
	('ae52a0ac-6813-48c5-b943-da8735cdef0b', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 0.00, '油管合租：日本，一个月', '2026-02-05 05:19:59.37705+00'),
	('0de4f515-7cf2-4cc3-992e-f4e56f31ce50', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 10.00, NULL, '2026-02-07 09:32:29.539407+00'),
	('08c94f9e-b91f-4548-a8d7-a02e0d81da63', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 20.00, NULL, '2026-02-07 09:33:06.365058+00'),
	('2653be2b-70b6-43a9-8b4c-ad1a357098cc', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 10.00, '虚拟充值：香港，一个月', '2026-02-07 12:33:08.347539+00'),
	('ae87c42e-3886-4e4b-8112-d4bec874411b', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 0.00, '虚拟充值：香港，一个月', '2026-02-07 12:37:07.405217+00'),
	('a1c8feae-14a0-4736-9be7-e4cbf087e909', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', '优惠券兑换', 10.00, 10.00, NULL, '2026-02-07 12:49:24.682266+00'),
	('a6333000-43ad-4b43-8215-00c6186004d4', 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c', 'payment', -10.00, 0.00, '虚拟充值：香港，一个月', '2026-02-08 04:51:23.652958+00');


--
-- Data for Name: wechat_login_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."wechat_login_sessions" ("id", "scene_str", "ticket", "openid", "status", "created_at", "expires_at") VALUES
	('cba7fdd4-82a6-4acd-bb96-958acababadf', 'login_ml4or0w2_e016f308f6500d20', 'gQEg8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMGhuaG9vYkplV0oxendJMHhGY1oAAgS0K4BpAwQsAQAA', NULL, 'waiting', '2026-02-02 04:44:36.842575+00', '2026-02-02 04:49:36.209+00'),
	('7f2d4f62-d638-439f-97b9-923066ba1fba', 'login_ml4ot2fk_a8ffa729fcc93e0a', 'gQFg8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyR3lKSG90YkplV0oxdy1KMDFGY2UAAgQSLIBpAwQsAQAA', NULL, 'waiting', '2026-02-02 04:46:11.545322+00', '2026-02-02 04:51:11.074+00'),
	('a677497f-afc0-4db7-93a3-9a68f5ec0105', 'login_ml4oth2y_67cdd95c119ce30a', 'gQEw8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyY18tWXA3YkplV0oxeGhKMHhGY0UAAgQlLIBpAwQsAQAA', 'oi2267QwkltAYW-vrfREVV_5LP7Y', 'scanned', '2026-02-02 04:46:30.386878+00', '2026-02-02 04:51:29.996+00'),
	('5e9213d4-14c7-446c-ab6d-fbc5a2e674ba', 'login_ml4qsrcz_ed326b2bc0e80181', 'gQG67zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyYUFxZ29ZYkplV0oxeGdXMHhGY1AAAgQkOYBpAwQsAQAA', NULL, 'waiting', '2026-02-02 05:41:56.41492+00', '2026-02-02 05:46:56.177+00'),
	('20e67833-0197-41e8-8a72-88222ce5546c', 'login_mldk1sdc_42da65c07336231b', 'gQER8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZXl4WnBjYkplV0oxRGJyODFGY3EAAgSfWohpAwQsAQAA', NULL, 'waiting', '2026-02-08 09:42:56.791951+00', '2026-02-08 09:47:55.817+00'),
	('69aad1c8-4601-4864-8db9-6caf05691d77', 'login_mldk7bgk_822ad23d00e45cd5', 'gQG58DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAySzJfWm9NYkplV0oxRGRzOE5GYzcAAgShW4hpAwQsAQAA', NULL, 'waiting', '2026-02-08 09:47:14.289831+00', '2026-02-08 09:52:13.718+00'),
	('c3cdc914-0fb1-44e5-a2fb-c8e7ac256ee1', 'login_mldlhigr_7913e540c45da1a9', 'gQEV8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyaHNvZ29kYkplV0oxQVZCODFGYzMAAgQNZIhpAwQsAQAA', NULL, 'waiting', '2026-02-08 10:23:10.031786+00', '2026-02-08 10:28:09.135+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 144, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict 5qGjuTbGlIbdfso5u7Ak76uwpqmNe1gZrItmgx0ibE7GIBlVJRGK5VadEvBPFQ4

RESET ALL;
