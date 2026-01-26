import { http } from '@/utils/request'
import type { ApiResponse, PageParams, PageResponse } from '@/types/api'
import { getSupabaseClient } from '@/utils/supabase'

/**
 * 通用/基础数据相关API
 */
export const commonApi = {
  /**
   * 获取基础配置信息
   */
  getBasicConfig(): Promise<ApiResponse<any>> {
    return http.get('/basic')
  },

  /**
   * 获取常见问题列表
   */
  getQuestionList(): Promise<ApiResponse<any[]>> {
    return http.get('/question/list')
  },

  /**
   * 文件上传
   * @param file 文件对象
   */
  uploadFile(file: File): Promise<ApiResponse<{ src: string }>> {
    return http.upload('/sys/oss/upload', file)
  },

  /**
   * 获取系统配置
   */
  getSystemConfig(): Promise<ApiResponse<any>> {
    return http.get('/sys/config')
  },

  /**
   * 获取验证码
   * @param uuid 唯一标识
   */
  getCaptcha(uuid: string): void {
    window.open(`/captcha?uuid=${uuid}`, '_blank')
  },

  /**
   * 发送邮件验证码
   * @param email 邮箱地址
   */
  sendEmailCode(email: string): Promise<ApiResponse<null>> {
    return http.get('/product/common/code', { email })
  },

  /**
   * 获取轮播图列表 (从 Supabase 获取)
   */
  async getBannerList(): Promise<ApiResponse<any[]>> {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('banners')
      .select(`
        *,
        image:images(url)
      `)
      .eq('status', 'on')
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Fetch banners error:', error)
      return { code: 500, msg: error.message, data: [], success: false }
    }

    // 适配前端需要的格式
    const adaptedData = (data || []).map(item => ({
      id: item.id,
      title: item.title || '',
      image: item.image?.url || item.url || '/images/banner.png',
      link: item.link || '',
      sort: item.sort_order,
      status: item.status === 'on' ? 1 : 0
    }))

    return { code: 0, msg: 'success', data: adaptedData, success: true }
  },

  /**
   * 获取文章列表（分页）
   * @param params 分页参数
   */
  getArticleList(params: PageParams = { page: 1, limit: 10 }): Promise<ApiResponse<PageResponse<any>>> {
    return http.get('/product/article/page', params)
  },

  /**
   * 获取文章详情
   * @param id 文章ID
   */
  getArticleDetail(id: number): Promise<ApiResponse<any>> {
    return http.get(`/product/article/${id}`)
  }
}

/**
 * 购物车相关API (Supabase版 - 重构)
 * 核心理念：只存储 user_id + sku_id + quantity，商品信息动态 JOIN 获取
 */
export const cartApi = {
  /**
   * 获取购物车列表（动态 JOIN 商品信息）
   */
  async getCartList(): Promise<ApiResponse<any>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { code: 401, msg: '未登录', data: { list: [] }, success: false }

    const { data, error } = await client
      .from('cart_items')
      .select(`
        id,
        sku_id,
        quantity,
        created_at,
        product_skus:sku_id (
          id,
          price,
          spec_combination
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch cart error:', error)
      return { code: 500, msg: error.message, data: { list: [] }, success: false }
    }

    // 获取 SKU ID 列表，通过 product_sku_map 获取商品信息
    const skuIds = (data || []).map((item: any) => item.sku_id).filter(Boolean)
    let productMap: Record<string, any> = {}

    if (skuIds.length > 0) {
      const { data: mappings } = await client
        .from('product_sku_map')
        .select('sku_id, product:products(id, product_name, image, allow_addon)')
        .in('sku_id', skuIds)

      mappings?.forEach((m: any) => {
        if (m.product) productMap[m.sku_id] = m.product
      })
    }

    // 格式化输出
    const list = (data || []).map((item: any) => {
      const product = productMap[item.sku_id]
      return {
        id: item.id,
        skuId: item.sku_id,
        quantity: item.quantity,
        productId: product?.id,
        productName: product?.product_name || '未知商品',
        productImage: product?.image || '/images/shared/logo.png',
        allowAddon: product?.allow_addon || false,
        price: item.product_skus?.price || 0,
        specName: item.product_skus?.spec_combination
          ? Object.values(item.product_skus.spec_combination).join(' ')
          : ''
      }
    })

    return { code: 0, msg: 'success', data: { list }, success: true }
  },

  /**
   * 添加到购物车（简化版：只需 skuId）
   */
  async addToCart(skuId: string, quantity: number = 1): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { code: 401, msg: '未登录', success: false }

    // 使用 upsert：同一用户同一 SKU 只能有一条记录
    const { error } = await client
      .from('cart_items')
      .upsert({
        user_id: user.id,
        sku_id: skuId,
        quantity: quantity
      }, {
        onConflict: 'user_id, sku_id'
      })

    if (error) {
      console.error('Add to cart error:', error)
      return { code: 500, msg: error.message, success: false }
    }
    return { code: 0, msg: '已加入购物车', success: true }
  },

  /**
   * 更新购物车数量
   */
  async updateQuantity(cartItemId: string, quantity: number): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { error } = await client
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)

    if (error) {
      console.error('Update cart error:', error)
      return { code: 500, msg: error.message, success: false }
    }
    return { code: 0, msg: 'success', success: true }
  },

  /**
   * 从购物车删除
   */
  async removeFromCart(cartItemId: string): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { error } = await client
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)

    if (error) {
      console.error('Remove from cart error:', error)
      return { code: 500, msg: error.message, success: false }
    }
    return { code: 0, msg: '已从购物车删除', success: true }
  },

  /**
   * 清空购物车
   */
  async clearCart(): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { code: 401, msg: '未登录', success: false }

    const { error } = await client
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    if (error) {
      console.error('Clear cart error:', error)
      return { code: 500, msg: error.message, success: false }
    }
    return { code: 0, msg: '购物车已清空', success: true }
  }
}

/**
 * 收藏相关API (Supabase版)
 */
export const favoriteApi = {
  /**
   * 【优化】获取收藏数据（分类 + 收藏列表）- 合并接口
   */
  async getFavoritesData(): Promise<ApiResponse<{ categories: any[]; favorites: any[] }>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { code: 401, msg: '未登录', success: false }

    // 并行获取分类和收藏
    const [categoriesRes, favoritesRes] = await Promise.all([
      client.from('product_categories').select('id, name').eq('status', 'on').order('sort_order'),
      client.from('user_favorites').select(`
        id,
        created_at,
        product_id,
        sku_id,
        products:product_id (
          id,
          product_name,
          image,
          display_price,
          category_id
        ),
        product_skus:sku_id (
          id,
          price,
          spec_combination
        )
      `).eq('user_id', user.id).order('created_at', { ascending: false })
    ])

    const categories = [{ id: 'all', name: '全部收藏' }, ...(categoriesRes.data || [])]

    const favorites = (favoritesRes.data || []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      skuId: item.sku_id,
      productName: item.products?.product_name || '未知商品',
      productImage: item.products?.image || '/images/shared/logo.png',
      categoryId: item.products?.category_id,
      price: item.product_skus?.price || item.products?.display_price || 0,
      specName: item.product_skus?.spec_combination
        ? Object.values(item.product_skus.spec_combination).join(' ')
        : '',
      createdAt: item.created_at
    }))

    return {
      code: 0,
      msg: 'success',
      data: { categories, favorites },
      success: true
    }
  },

  /**
   * 添加收藏
   */
  async addFavorite(productId: string, skuId?: string): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { code: 401, msg: '未登录', success: false }

    const { error } = await client.from('user_favorites').insert({
      user_id: user.id,
      product_id: productId,
      sku_id: skuId || null
    })

    if (error) {
      if (error.code === '23505') {
        return { code: 400, msg: '已经收藏过了', success: false }
      }
      return { code: 500, msg: error.message, success: false }
    }
    return { code: 0, msg: '收藏成功', success: true }
  },

  /**
   * 删除收藏
   */
  async removeFavorite(favoriteId: string): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { error } = await client.from('user_favorites').delete().eq('id', favoriteId)
    if (error) return { code: 500, msg: error.message, success: false }
    return { code: 0, msg: '已取消收藏', success: true }
  },

  /**
   * 检查是否已收藏
   */
  async checkFavorite(productId: string, skuId?: string): Promise<ApiResponse<boolean>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()
    if (!user) return { code: 401, msg: '未登录', data: false, success: false }

    let query = client.from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (skuId) {
      query = query.eq('sku_id', skuId)
    }

    const { data, error } = await query.maybeSingle()
    if (error) return { code: 500, msg: error.message, data: false, success: false }
    return { code: 0, msg: 'success', data: !!data, success: true }
  },

  // 兼容旧接口（已废弃）
  getFavorites(userId: number) { return Promise.resolve({ code: 0, data: [], success: true }) },
  addToFavorites(userId: number, goodsId: number) { return Promise.resolve({ code: 0, success: true }) },
  removeFromFavorites(userId: number, goodsId: number) { return Promise.resolve({ code: 0, success: true }) }
} 