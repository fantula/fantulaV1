
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface AdminPreOrder {
    id: string
    order_no: string
    status: string
    total_amount: number
    quantity: number
    created_at: string
    product_snapshot?: {
        product_name: string
        image: string
    }
    user_id: string
    // 关联的用户信息
    profile?: {
        id: string
        uid: string
        avatar: string
        nickname: string | null
    }
    _profile?: any // 用于前端兼容
}

export const adminPreOrderApi = {
    /**
     * 获取预订单列表
     * 默认过滤掉 'pending' (待支付) 状态
     */
    async getPreOrders(params: {
        page?: number
        pageSize?: number // 如果需要计算统计，可能需要较大的 pageSize
        limit?: number   // 或者直接指定 limit
        status?: string  // 前端筛选
    }): Promise<{ success: boolean; orders: AdminPreOrder[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        // 默认加载最近 500 条 (保持原有逻辑以便计算统计)
        const limit = params.limit || 500

        let query = client
            .from('pre_orders')
            .select(`
                id, order_no, status, total_amount, quantity, created_at, product_snapshot, user_id,
                profiles(id, uid, avatar, nickname)
            `, { count: 'exact' })
            .neq('status', 'pending') // 过滤掉待支付
            .order('created_at', { ascending: false })
            .limit(limit)

        const { data, error, count } = await query

        if (error) {
            console.error('获取预订单列表失败:', error)
            return { success: false, orders: [], total: 0, error: error.message }
        }

        const orders = (data || []).map(order => {
            // 兼容 Supabase JS 的不同返回格式
            const rawProfile = order.profiles || order.profile
            const profile = Array.isArray(rawProfile) ? rawProfile[0] : (rawProfile || null)

            return {
                ...order,
                _profile: profile
            }
        })

        return { success: true, orders, total: count || 0 }
    },

    /**
     * 批量删除预订单
     */
    async deletePreOrders(ids: string[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('pre_orders')
            .delete()
            .in('id', ids)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    }
}
