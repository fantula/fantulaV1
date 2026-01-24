-- Add is_checkout_visible column to faq_categories table
ALTER TABLE public.faq_categories 
ADD COLUMN IF NOT EXISTS is_checkout_visible BOOLEAN DEFAULT false;
COMMENT ON COLUMN public.faq_categories.is_checkout_visible IS '是否在结算页面显示';