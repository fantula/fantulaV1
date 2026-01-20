/**
 * 客户端商品 API
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 */

import { getSupabaseClient, callEdgeFunction } from '@/utils/supabase'

// ========================================
// 类型定义
// ========================================

export interface ClientProduct {
  id: string
  product_name: string
  product_type: 'virtual' | 'shared_account' | 'one_time_cdk'
  status: 'on' | 'off'
  category_id: string | null
  description?: string
  main_image?: string
  images?: string[]
  created_at: string
  stock?: number
  min_price?: number
  max_price?: number
}

export interface ClientCategory {
  id: string
  name: string
  sort_order: number
  status: 'on' | 'off'
}

export interface ClientSku {
  id: string
  product_id: string
  spec_combination: Record<string, string>
  duration: number
  price: number
  original_price?: number
  stock?: number
}

// ========================================
// 商品 API
// ========================================

export const clientProductApi = {
  /**
   * 获取商品列表 (分页)
   */
  async getProductList(params?: {
    categoryId?: string | number
    page?: number
    limit?: number
  }): Promise<{
    success: boolean
    data?: {
      list: ClientProduct[]
      total: number
    }
    error?: string
  }> {
    const client = getSupabaseClient()
    const page = params?.page || 1
    const limit = params?.limit || 12
    const offset = (page - 1) * limit

    let query = client
      .from('products')
      .select('*', { count: 'exact' })
      .eq('status', 'on')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (params?.categoryId) {
      query = query.eq('category_id', params.categoryId)
    }

    const { data, error, count } = await query

    if (error) {
      console.error('获取商品列表失败:', error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      data: {
        list: data || [],
        total: count || 0
      }
    }
  },

  /**
   * 获取商品详情
   */
  async getProductDetail(productId: string): Promise<{
    success: boolean
    data?: ClientProduct & { skus: ClientSku[] }
    error?: string
  }> {
    const client = getSupabaseClient()

    // 获取商品基础信息
    const { data: product, error: productError } = await client
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('status', 'on')
      .single()

    if (productError || !product) {
      return { success: false, error: productError?.message || '商品不存在' }
    }

    // 获取 SKU 列表 (通过映射表)
    const { data: skuMaps } = await client
      .from('product_sku_map')
      .select('sku_id')
      .eq('product_id', productId)

    let skus: ClientSku[] = []
    if (skuMaps && skuMaps.length > 0) {
      const skuIds = skuMaps.map(m => m.sku_id)
      const { data: skuData } = await client
        .from('skus')
        .select('*')
        .in('id', skuIds)
        .eq('is_active', true)
        .order('price', { ascending: true })

      skus = skuData || []
    }

    return {
      success: true,
      data: { ...product, skus }
    }
  },

  /**
   * 获取分类列表
   */
  async getCategories(): Promise<{
    success: boolean
    data?: ClientCategory[]
    error?: string
  }> {
    const client = getSupabaseClient()

    const { data, error } = await client
      .from('product_categories')
      .select('*')
      .eq('status', 'on')
      .order('sort_order', { ascending: true })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data || [] }
  },

  /**
   * 检查 SKU 库存
   */
  async checkSkuStock(skuId: string): Promise<{
    success: boolean
    inStock: boolean
    stockCount: number
  }> {
    const client = getSupabaseClient()

    try {
      const { data, error } = await client
        .rpc('get_sku_stock', { p_sku_id: skuId })
        .single()

      if (error || !data) {
        return { success: false, inStock: false, stockCount: 0 }
      }

      return {
        success: true,
        inStock: data.in_stock,
        stockCount: data.stock_count
      }
    } catch {
      return { success: false, inStock: false, stockCount: 0 }
    }
  }
}
