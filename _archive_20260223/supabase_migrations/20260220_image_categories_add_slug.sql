-- Migration: image_categories 增加 slug 字段
-- 版本: v2 (修复唯一键冲突)
-- 执行方式：supabase db push --local 或在 Studio SQL Editor 执行

-- 1. 给 image_categories 表增加 slug 字段
ALTER TABLE image_categories
    ADD COLUMN IF NOT EXISTS slug VARCHAR(100) UNIQUE;

-- 2. 先清理测试数据（"说撒上"、"的订单" 这类测试分类）
--    保留你真实需要的分类，测试数据可以直接删掉
DELETE FROM image_categories WHERE name IN ('说撒上', '的订单') AND slug IS NULL;

-- 3. 给可能剩余的历史分类补 slug（每条用不同 slug，避免冲突）
UPDATE image_categories
SET slug = 'legacy-' || SUBSTR(id::text, 1, 8)
WHERE slug IS NULL;

-- 4. 插入预置分类（存在则跳过）
INSERT INTO image_categories (name, slug, sort_order)
VALUES
    ('商品图',   'products', 10),
    ('横幅广告', 'banners',  20),
    ('工单附件', 'tickets',  30),
    ('其他',     'others',   99)
ON CONFLICT (slug) DO NOTHING;

-- 5. 验证结果
SELECT id, name, slug, sort_order FROM image_categories ORDER BY sort_order;
