/**
 * 客户端用户 API
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 */

import { getSupabaseClient } from '@/utils/supabase'

// ========================================
// 类型定义
// ========================================

export interface ClientUser {
    id: string
    uid: string
    email: string
    nickname?: string
    avatar?: string
    balance: number
    status: 'active' | 'disabled'
    created_at: string
}

export interface ClientFavorite {
    id: string
    product_id: string
    sku_id?: string
    created_at: string
    // JOIN 的商品信息
    product_name?: string
    product_image?: string
    price?: number
}

// ========================================
// 用户 API
// ========================================

export const clientUserApi = {
    /**
     * 获取当前用户信息
     */
    async getCurrentUser(): Promise<{
        success: boolean
        data?: ClientUser
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()

        if (!user) {
            return { success: false, error: '未登录' }
        }

        const { data: profile, error } = await client
            .from('profiles')
            .select('uid, email, nickname, avatar, balance, status, created_at')
            .eq('id', user.id)
            .single()

        if (error || !profile) {
            return { success: false, error: error?.message || '用户不存在' }
        }

        return {
            success: true,
            data: {
                id: user.id,
                ...profile
            }
        }
    },

    /**
     * 更新用户昵称
     */
    async updateNickname(nickname: string): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()

        if (!user) {
            return { success: false, error: '未登录' }
        }

        const { error } = await client
            .from('profiles')
            .update({ nickname })
            .eq('id', user.id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 更新用户头像
     */
    async updateAvatar(avatarUrl: string): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()

        if (!user) {
            return { success: false, error: '未登录' }
        }

        const { error } = await client
            .from('profiles')
            .update({ avatar: avatarUrl })
            .eq('id', user.id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 获取收藏列表
     */
    async getFavorites(): Promise<{
        success: boolean
        data?: ClientFavorite[]
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client
            .from('favorites')
            .select(`
        id,
        product_id,
        sku_id,
        created_at,
        product:products (
          id,
          product_name,
          main_image
        ),
        sku:skus (
          price
        )
      `)
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, error: error.message }
        }

        const formatted = (data || []).map((item: any) => ({
            id: item.id,
            product_id: item.product_id,
            sku_id: item.sku_id,
            created_at: item.created_at,
            product_name: item.product?.product_name,
            product_image: item.product?.main_image,
            price: item.sku?.price
        }))

        return { success: true, data: formatted }
    },

    /**
     * 添加收藏
     */
    async addFavorite(productId: string, skuId?: string): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data: { user } } = await client.auth.getUser()

        if (!user) {
            return { success: false, error: '请先登录' }
        }

        const { error } = await client
            .from('favorites')
            .insert({
                user_id: user.id,
                product_id: productId,
                sku_id: skuId
            })

        if (error) {
            // 可能已收藏
            if (error.code === '23505') {
                return { success: true } // 已存在视为成功
            }
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 删除收藏
     */
    async removeFavorite(favoriteId: string): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()

        const { error } = await client
            .from('favorites')
            .delete()
            .eq('id', favoriteId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 检查是否已收藏
     */
    async checkFavorite(productId: string): Promise<{
        success: boolean
        isFavorite: boolean
        favoriteId?: string
    }> {
        const client = getSupabaseClient()

        const { data } = await client
            .from('favorites')
            .select('id')
            .eq('product_id', productId)
            .single()

        return {
            success: true,
            isFavorite: !!data,
            favoriteId: data?.id
        }
    }
}
