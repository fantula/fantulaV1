/**
 * 客户端购物车 API
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 */

import { getSupabaseClient } from '@/utils/supabase'

// ========================================
// 类型定义
// ========================================

export interface ClientCartItem {
    id: string
    sku_id: string
    quantity: number
    created_at: string
    // JOIN 的商品信息
    product_name?: string
    product_image?: string
    spec_combination?: Record<string, string>
    price?: number
    original_price?: number
}

// ========================================
// 购物车 API
// ========================================

export const clientCartApi = {
    /**
     * 获取购物车列表 (动态 JOIN 商品信息)
     */
    async getCartList(): Promise<{
        success: boolean
        data?: ClientCartItem[]
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client
            .from('cart_items')
            .select(`
        id,
        sku_id,
        quantity,
        created_at,
        sku:skus (
          id,
          spec_combination,
          price,
          original_price,
          product_sku_map (
            product:products (
              id,
              product_name,
              main_image
            )
          )
        )
      `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('获取购物车失败:', error)
            return { success: false, error: error.message }
        }

        // 格式化数据
        const formatted = (data || []).map((item: any) => {
            const sku = item.sku
            const product = sku?.product_sku_map?.[0]?.product
            return {
                id: item.id,
                sku_id: item.sku_id,
                quantity: item.quantity,
                created_at: item.created_at,
                product_name: product?.product_name || '未知商品',
                product_image: product?.main_image || '',
                spec_combination: sku?.spec_combination || {},
                price: sku?.price || 0,
                original_price: sku?.original_price
            }
        })

        return { success: true, data: formatted }
    },

    /**
     * 添加到购物车
     */
    async addToCart(skuId: string, quantity: number = 1): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: user } = await client.auth.getUser()

        if (!user?.user) {
            return { success: false, error: '请先登录' }
        }

        // 检查是否已存在
        const { data: existing } = await client
            .from('cart_items')
            .select('id, quantity')
            .eq('user_id', user.user.id)
            .eq('sku_id', skuId)
            .single()

        if (existing) {
            // 更新数量
            const { error } = await client
                .from('cart_items')
                .update({ quantity: existing.quantity + quantity })
                .eq('id', existing.id)

            if (error) {
                return { success: false, error: error.message }
            }
        } else {
            // 新增
            const { error } = await client
                .from('cart_items')
                .insert({
                    user_id: user.user.id,
                    sku_id: skuId,
                    quantity
                })

            if (error) {
                return { success: false, error: error.message }
            }
        }

        return { success: true }
    },

    /**
     * 更新购物车数量
     */
    async updateQuantity(cartItemId: string, quantity: number): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()

        const { error } = await client
            .from('cart_items')
            .update({ quantity })
            .eq('id', cartItemId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 删除购物车项
     */
    async removeFromCart(cartItemId: string): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()

        const { error } = await client
            .from('cart_items')
            .delete()
            .eq('id', cartItemId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 清空购物车
     */
    async clearCart(): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: user } = await client.auth.getUser()

        if (!user?.user) {
            return { success: false, error: '请先登录' }
        }

        const { error } = await client
            .from('cart_items')
            .delete()
            .eq('user_id', user.user.id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    }
}
