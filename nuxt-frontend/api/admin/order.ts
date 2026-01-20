
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// ========================================
// 类型定义 (从 admin-supabase.ts 迁移)
// ========================================

export interface AdminProduct {
    id: string
    product_name: string
    image: string | null
    // ... 其他字段按需补充，关联查询通常只需要 id 和 name
}

export interface AdminOrder {
    id: string
    order_no: string | null
    user_uid: string // 注意：现在主要通过 profile 关联获取 UID
    user_id: string
    product_id: string
    sku_id: string | null
    order_type: 'virtual' | 'shared_account' | 'one_time_cdk'
    related_order_id: string | null
    total_amount: number | null
    payment_method: 'wallet' | 'alipay' | 'wechat' | null
    start_time: string
    end_time: string
    status: 'pending_delivery' | 'active' | 'refunding' | 'refunded' | 'expired'
    created_at: string
    product?: AdminProduct
    sku?: any
    slot_occupancy_ids?: string[]
    // 关联的用户信息
    profile?: {
        id: string
        uid: string
        avatar: string
        nickname: string
    }
    _profile?: any // 用于前端兼容
    // 优惠券快照
    coupon_snapshot?: {
        coupon_id: string
        discount_amount: number
        coupon_code?: string
    }
    // 商品快照
    product_snapshot?: {
        product_name: string
        image: string
    }
    // SKU快照
    sku_snapshot?: {
        spec_combination: any
    }
}

export interface AdminOrderDelivery {
    id: string
    order_id: string
    order_no: string | null
    product_id: string
    sku_id: string | null
    cdk_id: string | null
    delivery_content: Record<string, any> | null
    delivery_status: 'delivered' | 'released' | 'refunded' | 'failed'
    delivered_at: string | null
    released_at: string | null
    created_at: string
}

// ========================================
// 订单管理 API
// ========================================

export const adminOrderApi = {
    /**
     * 获取订单列表
     * 支持按 order_type 筛选 (virtual, shared_account, one_time_cdk)
     */
    async getOrders(params: {
        page: number
        pageSize: number
        order_type?: string
        status?: string
        exclude_status?: string[] // 排除的状态列表
        keyword?: string // 搜索订单号
    }): Promise<{ success: boolean; orders: AdminOrder[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const { page = 1, pageSize = 20, order_type, status, exclude_status, keyword } = params

        let query = client
            .from('orders')
            // 尝试使用最简资源嵌入语法 (依赖 PostgREST 自动推断外键)
            .select(`
                *,
                profiles(id, uid, avatar, nickname)
            `, { count: 'exact' })
            .order('created_at', { ascending: false })
            .range((page - 1) * pageSize, page * pageSize - 1)

        if (order_type) {
            query = query.eq('order_type', order_type)
        }

        if (status) {
            query = query.eq('status', status)
        }

        // 排除特定状态（如退款中/已退款）
        if (exclude_status && exclude_status.length > 0) {
            exclude_status.forEach(s => {
                query = query.neq('status', s)
            })
        }

        if (keyword) {
            // 支持搜索订单号
            query = query.ilike('order_no', `%${keyword}%`)
        }

        const { data, error, count } = await query

        if (error) {
            console.error('获取订单列表失败:', error)
            return { success: false, orders: [], total: 0, error: error.message }
        }

        // 数据处理：将 profile 处理为前端可用的格式
        const orders = (data || []).map(order => {
            // 兼容 Supabase JS 的不同返回格式 (对象或数组)
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
     * 更新订单状态
     */
    async updateOrderStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('orders')
            .update({ status })
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },

    /**
     * 删除订单 (软删除或硬删除，视业务而定，目前假设是硬删除)
     */
    async deleteOrders(ids: string[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('orders')
            .delete()
            .in('id', ids)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    }
}
