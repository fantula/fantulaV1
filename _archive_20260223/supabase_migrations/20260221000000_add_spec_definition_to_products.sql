-- Migration: Add spec_definition to products table to preserve spec ordering
-- This replaces dynamic ordering derived from JSONB object keys which lose alphabetical order
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS spec_definition JSONB;

-- Note: Admin RLS policies allow authenticated admins to update all column fields.
-- Client RLS policies allow reading all columns.
