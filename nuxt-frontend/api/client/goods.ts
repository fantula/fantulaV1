import { http } from '@/utils/request'
import { getSupabaseClient, callEdgeFunction } from '@/utils/supabase'
import type { Goods, GoodsCategory, PageParams, PageResponse, ApiResponse } from '@/types/api'

/**
 * 商品相关API
 */
export const goodsApi = {
  /**
   * 获取商品列表 - 使用 Supabase 查询
   * @param params 查询参数
   */
  async getGoodsList(params: PageParams & {
    category?: string
    categoryId?: string | number
    keyword?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: 'price' | 'sales' | 'createTime'
    sortOrder?: 'asc' | 'desc'
  }): Promise<ApiResponse<PageResponse<Goods>>> {
    const client = getSupabaseClient()

    let query = client
      .from('products')
      .select('*', { count: 'exact' })
      .eq('status', 'on')

    // 分类过滤
    if (params.categoryId && params.categoryId !== 'all') {
      query = query.eq('category_id', params.categoryId)
    }

    // 关键词搜索
    if (params.keyword) {
      query = query.ilike('product_name', `%${params.keyword}%`)
    }

    // 排序
    const sortField = params.sortBy === 'price' ? 'display_price'
      : params.sortBy === 'sales' ? 'initial_sales'
        : 'sort_order'
    query = query.order(sortField, { ascending: params.sortOrder !== 'desc' })

    // 分页
    const page = params.page || 1
    const limit = params.limit || 12
    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      return { code: 500, msg: error.message, data: { list: [], total: 0, page, limit, totalPage: 0 }, success: false }
    }

    // 适配字段名给前端使用
    const list = (data || []).map(item => ({
      id: item.id,
      title: item.product_name,
      product_name: item.product_name,
      coverImage: item.image || '',
      image: item.image || '',
      description: '',
      price: Number(item.display_price) || 0,
      display_price: Number(item.display_price) || 0,
      sales: item.initial_sales || 0,
      initial_sales: item.initial_sales || 0,
      rating: item.rating || 100,
      status: item.status === 'on' ? 1 : 0,
      badge_label: item.badge_label,
      tags: (item.tags || []).join(','),
      category_id: item.category_id
    })) as Goods[]

    const total = count || 0
    const totalPage = Math.ceil(total / limit)

    return {
      code: 0,
      msg: 'success',
      data: { list, total, page, limit, totalPage },
      success: true
    }
  },

  /**
   * 获取商品详情 - 使用 Supabase 直接查询（优化后，消除冷启动延迟）
   * 库存由 checkSkuAvailability() 单独异步获取
   * @param id 商品ID
   */
  async getGoodsDetail(id: number | string): Promise<ApiResponse<Goods>> {
    try {
      const client = getSupabaseClient()

      // 1. 查询商品基础信息
      const { data: product, error: productError } = await client
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (productError || !product) {
        return { code: 404, msg: productError?.message || '商品不存在', data: null as any, success: false }
      }

      // 2. 查询 SKU 列表（通过映射表）
      const { data: skuMappings, error: skuError } = await client
        .from('product_sku_map')
        .select('sku:product_skus(*)')
        .eq('product_id', id)
        .order('sort_order', { ascending: true })

      if (skuError) {
        console.error('获取 SKU 列表失败:', skuError)
      }

      // 提取 SKU 数据
      const skuList = (skuMappings || []).map(m => m.sku).filter(Boolean)

      // 转换 SKU 数据格式
      const skus = (skuList || []).map((sku: any) => {
        const combination = sku.spec_combination as Record<string, string>
        const firstSpec = Object.entries(combination)[0] || []

        return {
          id: sku.id,
          spec_name: firstSpec[0] || '',
          spec_value: firstSpec[1] || '',
          spec_combination: combination,
          price: Number(sku.price),
          stock: 0, // 库存由 checkSkuAvailability 单独获取
          image: sku.image,
          intro: sku.intro,
          duration: sku.duration
        }
      })

      // 构建规格组（从 SKU 的 spec_combination 提取）
      const specGroups: { name: string; values: string[] }[] = []
      const groups: Record<string, Set<string>> = {}

      skus.forEach((sku: any) => {
        const combination = sku.spec_combination || {}
        Object.entries(combination).forEach(([name, value]) => {
          if (!groups[name]) groups[name] = new Set()
          groups[name].add(value as string)
        })
      })

      Object.keys(groups).forEach(name => {
        specGroups.push({ name, values: Array.from(groups[name]) })
      })

      // 适配返回数据
      const goods: Goods = {
        id: product.id,
        title: product.product_name,
        product_name: product.product_name,
        coverImage: product.image || '',
        image: product.image || '',
        description: product.description || '',
        price: Number(product.display_price) || (skus[0]?.price || 0),
        display_price: Number(product.display_price) || 0,
        sales: product.initial_sales || 0,
        initial_sales: product.initial_sales || 0,
        rating: product.rating || 100,
        status: product.status === 'on' ? 1 : 0,
        badge_label: product.badge_label,
        tags: (product.tags || []).join(','),
        skus: skus as any,
        detail_modules: product.detail_modules || [],
        specGroups: specGroups,
        allow_addon: product.allow_addon === true
      } as Goods & { specGroups: any[]; allow_addon: boolean }

      return { code: 0, msg: 'success', data: goods, success: true }
    } catch (err) {
      console.error('获取商品详情失败:', err)
      return { code: 500, msg: '获取商品详情失败', data: null as any, success: false }
    }
  },

  /**
   * 获取热门商品
   * @param limit 数量限制
   */
  getHotGoods(limit: number = 8): Promise<ApiResponse<Goods[]>> {
    return http.get('/product/goods', { limit, isHot: true })
  },

  /**
   * 获取推荐商品
   * @param limit 数量限制
   */
  getRecommendGoods(limit: number = 8): Promise<ApiResponse<Goods[]>> {
    return http.get('/product/goods', { limit, isRecommend: true })
  },

  /**
   * 获取商品分类列表
   */
  async getCategories(): Promise<ApiResponse<GoodsCategory[]>> {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('product_categories')
      .select('*')
      .eq('status', 'on')
      .order('sort_order', { ascending: true })

    if (error) {
      return { code: 500, msg: error.message, data: [], success: false }
    }

    // 适配字段名 (supabase 使用 sort_order, 前端使用 sort)
    const adaptedData = (data || []).map(item => ({
      id: item.id,
      name: item.name,
      sort: item.sort_order,
      status: item.status === 'on' ? 1 : 0
    }))

    return { code: 0, msg: 'success', data: adaptedData as any, success: true }
  },

  /**
   * 搜索商品
   * @param params 搜索参数
   */
  searchGoods(params: {
    keyword: string
    page: number
    limit: number
    category?: string
    categoryId?: number
    sortBy?: 'price' | 'sales' | 'createTime'
    sortOrder?: 'asc' | 'desc'
  }): Promise<ApiResponse<PageResponse<Goods>>> {
    return http.get('/product/goods', params)
  },

  /**
   * 获取商品SKU信息
   * @param goodsCode 商品编码
   */
  getGoodsSkuInfo(goodsCode: string): Promise<ApiResponse<any>> {
    return http.get(`/product/goods/getSkuInfo/${goodsCode}`)
  },

  /**
   * 通过Unicode获取SKU详细信息
   * @param unicode SKU唯一码
   */
  getSkuByUnicode(unicode: string): Promise<ApiResponse<any>> {
    return http.get(`/product/goods/getSkuByUnicode/${unicode}`)
  },

  /**
   * 查询SKU剩余库存
   * @param skuUnicode SKU唯一码
   */
  getSkuResidue(skuUnicode: string): Promise<ApiResponse<number>> {
    return http.get(`/product/goods/getSkuResidue/${skuUnicode}`)
  },

  /**
   * 获取商品实时库存 (调用 Edge Function)
   * @param id 商品ID
   */
  async getProductStock(id: string | number): Promise<ApiResponse<number>> {
    const { data, error } = await callEdgeFunction<{ stock: number }>('products', {
      method: 'GET',
      params: { id: String(id) }
    })

    if (error) {
      console.error('获取库存失败:', error)
      return { code: 500, msg: error, data: 0, success: false }
    }

    return { code: 0, msg: 'success', data: data?.stock ?? 0, success: true }
  }
}