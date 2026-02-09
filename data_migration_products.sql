
-- Disable constraints temporarily
SET session_replication_role = 'replica';

-- Insert Storage Buckets
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types, owner, created_at, updated_at, owner_id)
VALUES 
('products', 'products', true, false, null, null, null, '2026-02-01 04:39:27.760086+00', '2026-02-01 04:39:27.760086+00', null),
('avatars', 'avatars', true, false, null, null, null, '2026-02-01 04:39:27.760086+00', '2026-02-01 04:39:27.760086+00', null)
ON CONFLICT (id) DO NOTHING;

-- Insert DUMMY Product Categories (needed for FKs)
INSERT INTO public.product_categories (id, name, sort_order, status, created_at)
VALUES
('349f809a-4a04-434b-8ce9-ae2f7ae3b855', 'Imported Category A', 0, 'on', NOW()),
('440c3546-e691-4875-b372-dc1f60d378b8', 'Imported Category B', 0, 'on', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Products
INSERT INTO public.products (id, product_name, display_price, initial_sales, image, status, created_at, category_id, sort_order, tags, badge_label, rating, allow_addon, detail_modules)
VALUES 
('6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '虚拟充值', 100, 100, 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 'on', '2026-02-03 10:56:57.888841+00', '349f809a-4a04-434b-8ce9-ae2f7ae3b855', 0, '{}', '新品', 100, false, '[{"type":"image","content":"https://img.fantula.com/uploads/1770116078907-02pxfc.webp"}]'),
('93c38782-8686-429d-843a-64d26654bd26', '油管合租', 100, 100, 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 'on', '2026-02-03 11:01:51.497892+00', '349f809a-4a04-434b-8ce9-ae2f7ae3b855', 2, '{"全球通用","一个菜蔬"}', '推荐', 100, true, '[{"type":"image","content":"https://img.fantula.com/uploads/1770116078907-02pxfc.webp"}]'),
('8b5f8154-5ade-4fae-ad48-55157b3d94da', '是谁分', 10, 100, 'https://img.fantula.com/uploads/1770116095775-wm9csr.webp', 'on', '2026-02-03 11:04:56.747561+00', '440c3546-e691-4875-b372-dc1f60d378b8', 1, '{}', '限量', 100, true, '[{"type":"image","content":"https://img.fantula.com/uploads/1770116078907-02pxfc.webp"}]')
ON CONFLICT (id) DO NOTHING;

-- Insert Product SKUs (with 'intro', no 'stock', no 'title')
INSERT INTO public.product_skus (id, spec_combination, image, intro, price, duration, enabled, sort_order, created_at, product_type, tag, tag_name)
VALUES
('b4536de5-46ed-404e-9722-cb712542548a', '{"地区":"香港","时长":"一个月"}', '', '10', 10, 3, true, 0, '2026-02-03 10:58:08.719533+00', 'virtual', null, null),
('783046e6-4fbc-47db-a4df-3c948e347162', '{"地区":"日本","时长":"一个月"}', '', '21', 10, 3, true, 1, '2026-02-03 10:58:08.719533+00', 'virtual', null, null),
('3b78b8cb-a716-4654-b68a-81e136b3d17b', '{"地区":"香港","时长":"三个月"}', '', '0121', 10, 3, true, 2, '2026-02-03 10:58:08.719533+00', 'virtual', null, null),
('0c9d192b-215a-41e8-b8bd-eba19e06ad84', '{"地区":"日本","时长":"三个月"}', '', '11', 10, 3, true, 3, '2026-02-03 10:58:08.719533+00', 'virtual', null, null),
('366cd1cf-b361-4b1c-8919-e729b1ee4df7', '{"地区":"日本","时长":"一个月"}', '', '1111', 10, 10, true, 0, '2026-02-03 11:02:30.199099+00', 'shared_account', null, null),
('6b694c74-cf1f-4990-84ac-6eaad1a83d59', '{"时长":"一个月"}', '', '111', 10, 10, true, 0, '2026-02-03 11:05:27.933876+00', 'one_time_cdk', null, null)
ON CONFLICT (id) DO NOTHING;

-- Insert Product SKU Map
INSERT INTO public.product_sku_map (id, product_id, sku_id, created_at)
VALUES
('43950f5a-20fb-4c81-ae2d-1842205688ed', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', 'b4536de5-46ed-404e-9722-cb712542548a', '2026-02-03 10:58:09.083786+00'),
('ef2921ef-88d2-4e49-bd7d-e73154b58243', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '783046e6-4fbc-47db-a4df-3c948e347162', '2026-02-03 10:58:09.083786+00'),
('f5e7a27d-a980-4d33-bd7e-44034c8e3d21', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '3b78b8cb-a716-4654-b68a-81e136b3d17b', '2026-02-03 10:58:09.083786+00'),
('899250b9-787a-42a7-976c-cb746898cd17', '6c91ebdf-a28d-46b1-9513-8db14c5b8d32', '0c9d192b-215a-41e8-b8bd-eba19e06ad84', '2026-02-03 10:58:09.083786+00'),
('22a399c1-3cf8-4db9-8ec3-d2542313fabd', '93c38782-8686-429d-843a-64d26654bd26', '366cd1cf-b361-4b1c-8919-e729b1ee4df7', '2026-02-03 11:02:30.389666+00'),
('364b34a4-fc4b-41dc-8df7-aefcc81073fe', '8b5f8154-5ade-4fae-ad48-55157b3d94da', '6b694c74-cf1f-4990-84ac-6eaad1a83d59', '2026-02-03 11:05:28.152836+00')
ON CONFLICT (id) DO NOTHING;

-- Insert Coupons
INSERT INTO public.coupons (id, name, type, value, min_usage, sku_ids, total_quantity, start_date, end_date, status, created_at, used_quantity, code)
VALUES
('d7f016ce-332a-4f37-b58d-6327e3f7862d', '余额券', 'balance', 10, 0, '{}', null, '2026-02-04', '2026-02-26', 'true', '2026-02-04 04:25:04.842904+00', 8, null)
ON CONFLICT (id) DO NOTHING;

-- Re-enable constraints
SET session_replication_role = 'origin';
