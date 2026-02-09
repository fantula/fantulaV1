-- Insert Inventory Data
SET session_replication_role = 'replica';

-- Insert CDKs
INSERT INTO public.cdks (id, product_id, code, cdk_type, account_data, status, created_at, used_at, max_slots, stock, pre_order_id, product_snapshot)
VALUES
('c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', NULL, '{"账号":"111","密码":"0111"}', 'shared', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03T11:03:54.952195+00:00', NULL, 5, 1, NULL, '{"product_id": "93c38782-8686-429d-843a-64d26654bd26", "product_name": "\u6cb9\u7ba1\u5408\u79df", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}'),
('bdbef8fa-21ba-4eb9-ad29-1a3af39213e9', NULL, '445555', 'one_time', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03T11:05:58.192006+00:00', NULL, 1, 1, NULL, '{"product_id": "8b5f8154-5ade-4fae-ad48-55157b3d94da", "product_name": "\u662f\u8c01", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}'),
('c633bb29-cf0d-4b25-9b90-7205be89581d', NULL, '1242424', 'one_time', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03T11:05:58.192006+00:00', NULL, 1, 1, NULL, '{"product_id": "8b5f8154-5ade-4fae-ad48-55157b3d94da", "product_name": "\u662f\u8c01", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}'),
('0c208917-cdb1-4228-b57d-b1f632f851e2', NULL, '{"fields":["邮箱","是谁","发发发"]}', 'virtual', '{"image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}', 'idle', '2026-02-03T11:03:26.83157+00:00', NULL, 1, 992, NULL, '{"product_id": "6c91ebdf-a28d-46b1-9513-8db14c5b8d32", "product_name": "\u865a\u62df\u5145\u503c", "product_image": "https://img.fantula.com/uploads/1770116095775-wm9csr.webp"}')
ON CONFLICT (id) DO NOTHING;

-- Insert CDK SKU Map
INSERT INTO public.cdk_sku_map (id, cdk_id, sku_id, created_at)
VALUES
('deca0652-9510-44ae-98dc-110e83818d2e', '0c208917-cdb1-4228-b57d-b1f632f851e2', 'b4536de5-46ed-404e-9722-cb712542548a', '2026-02-03T11:03:27.17332+00:00'),
('707794f9-c7c7-463a-918c-c5cf1e113649', '0c208917-cdb1-4228-b57d-b1f632f851e2', '783046e6-4fbc-47db-a4df-3c948e347162', '2026-02-03T11:03:27.17332+00:00'),
('c2be5420-d5da-4471-89d1-2a0fddc6124b', '0c208917-cdb1-4228-b57d-b1f632f851e2', '3b78b8cb-a716-4654-b68a-81e136b3d17b', '2026-02-03T11:03:27.17332+00:00'),
('41eb12d4-efa3-4ae0-94b4-22a8f1dbb5fd', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', '366cd1cf-b361-4b1c-8919-e729b1ee4df7', '2026-02-03T11:03:55.183599+00:00'),
('e8fb56eb-e995-45f6-94c0-02f5a507a8d8', 'bdbef8fa-21ba-4eb9-ad29-1a3af39213e9', '6b694c74-cf1f-4990-84ac-6eaad1a83d59', '2026-02-03T11:05:58.368143+00:00'),
('192d3071-e612-48d3-8b79-f9eb03c9adbd', 'c633bb29-cf0d-4b25-9b90-7205be89581d', '6b694c74-cf1f-4990-84ac-6eaad1a83d59', '2026-02-03T11:05:58.368143+00:00')
ON CONFLICT (id) DO NOTHING;

-- Insert Slot Occupancies
INSERT INTO public.slot_occupancies (id, cdk_id, slot_index, order_id, status, occupied_at, released_at, pre_order_id, user_id)
VALUES
('67cad845-d766-4bb3-8f5f-bf26ac3e13f8', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 5, NULL, 'idle', '2026-02-03T11:03:55.566238+00:00', NULL, NULL, NULL),
('227f0d00-5b61-45ae-a3a4-c74bfd378c07', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 1, '22d15088-1d6e-4681-a110-69ac076743d0', 'using', '2026-02-03T11:03:55.566238+00:00', NULL, NULL, 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c'),
('1f58bc30-5087-4422-90c9-a44280ad0124', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 2, 'ce521be9-3cb2-4bfa-87f8-9359f01b08c0', 'using', '2026-02-03T11:03:55.566238+00:00', NULL, NULL, 'f7da1828-4d22-413b-9b9a-70f86cd8dd5c'),
('90d89694-1c99-4bde-9549-7cb6462dfad2', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 3, NULL, 'idle', '2026-02-03T11:03:55.566238+00:00', NULL, NULL, NULL),
('3cd87c01-e2bf-4659-828d-e69256f93726', 'c7d82f4d-50e5-4ea2-ab78-9e47f2f01c98', 4, NULL, 'idle', '2026-02-03T11:03:55.566238+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

SET session_replication_role = 'origin';
