-- Migration: Add spec_definition to products table to preserve spec ordering
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS spec_definition JSONB;
