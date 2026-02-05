/**
 * 优惠券管理 API
 * 从 admin-supabase.ts 独立拆分
 */

import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// ========================================
// 类型定义
// ========================================
export interface AdminCoupon {
    id: string
    name: string
    type: 'flat' | 'balance' | 'product'
    value: number
    min_usage: number
    sku_ids: string[]
    total_quantity: number | null
    start_date: string | null
    end_date: string | null
    status: boolean
    created_at: string
    code?: string
}

export interface AdminCouponStat {
    id: string
    code: string
    status: string
    used_at: string
    created_at: string
    order_id: string | null
    order_no?: string
    user_uid: string
    display_uid?: string
    user_nickname?: string
    coupon_name?: string
    coupon_type?: string
    value?: number
}

// ========================================
// API 实现
// ========================================
export const adminCouponApi = {
    /**
     * 获取优惠券规则列表
     */
    async getCoupons(params?: {
        type?: string
        status?: boolean
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; coupons: AdminCoupon[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        let query = client.from('coupons').select('*', { count: 'exact' })

        if (params?.type) query = query.eq('type', params.type)
        if (params?.status !== undefined) query = query.eq('status', params.status)

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) return { success: false, coupons: [], total: 0, error: error.message }
        return { success: true, coupons: data || [], total: count || 0 }
    },

    /**
     * 获取单个优惠券详情
     */
    async getCouponById(id: string): Promise<{ success: boolean; coupon?: AdminCoupon; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client.from('coupons').select('*').eq('id', id).single()
        if (error) return { success: false, error: error.message }
        return { success: true, coupon: data }
    },

    /**
     * 创建优惠券规则
     */
    async createCoupon(data: {
        name: string
        type: 'flat' | 'balance' | 'product'
        value: number
        product_ids?: string[]
        sku_ids?: string[]
        min_usage?: number
        total_quantity?: number
        start_date?: string | null
        end_date?: string | null
        status?: boolean
    }): Promise<{ success: boolean; coupon?: AdminCoupon; error?: string }> {
        const client = getAdminSupabaseClient()

        const payload = {
            name: data.name,
            type: data.type,
            value: data.value,
            sku_ids: data.sku_ids || data.product_ids || [],
            min_usage: data.min_usage || 0,
            total_quantity: data.total_quantity || null,
            start_date: data.start_date || null,
            end_date: data.end_date || null,
            status: data.status !== undefined ? data.status : true,
        }

        const { data: coupon, error } = await client.from('coupons').insert(payload).select().single()
        if (error) return { success: false, error: error.message }
        return { success: true, coupon }
    },

    /**
     * 更新优惠券规则
     */
    async updateCoupon(id: string, data: Partial<AdminCoupon>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const payload: any = { ...data }
        if (payload.product_ids) {
            payload.sku_ids = payload.product_ids
            delete payload.product_ids
        }

        const { error } = await client.from('coupons').update(payload).eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 生成优惠券码
     */
    async generateCouponCodes(
        couponId: string,
        quantity: number = 1,
        mode: 'random' | 'universal' = 'random',
        customCode?: string,
        usageLimit?: number
    ): Promise<{ success: boolean; count?: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const payload: any = { p_coupon_id: couponId, p_quantity: quantity, p_mode: mode }
        if (mode === 'universal') {
            payload.p_custom_code = customCode
            payload.p_usage_limit = usageLimit
        }

        const { data, error } = await client.rpc('admin_generate_coupon_codes', payload)
        if (error) return { success: false, error: error.message }

        const res = data as any
        if (res.success) return { success: true, count: res.count }
        return { success: false, error: res.error }
    },

    /**
     * 删除优惠券规则
     */
    async deleteCoupon(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('coupons').delete().eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 获取某优惠券的实例码列表
     */
    async getCouponCodes(couponId: string, params?: {
        page?: number
        size?: number
        status?: string
    }): Promise<{ success: boolean; codes: any[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const page = params?.page || 1
        const pageSize = params?.size || 20
        const offset = (page - 1) * pageSize

        let query = client.from('coupon_codes').select('*', { count: 'exact' }).eq('coupon_id', couponId)
        if (params?.status) query = query.eq('status', params.status)
        query = query.order('created_at', { ascending: false }).range(offset, offset + pageSize - 1)

        const { data, error, count } = await query
        if (error) return { success: false, codes: [], total: 0, error: error.message }
        return { success: true, codes: data || [], total: count || 0 }
    },

    /**
     * 切换状态
     */
    async toggleStatus(id: string, status: boolean): Promise<{ success: boolean; error?: string }> {
        return this.updateCoupon(id, { status })
    },

    /**
     * 批量删除兑换码
     */
    async deleteCouponCodes(ids: string[]): Promise<{ success: boolean; count?: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client.rpc('admin_delete_coupon_codes', { p_ids: ids })
        if (error) return { success: false, error: error.message }

        const res = data as any
        if (res.success) return { success: true, count: res.count }
        return { success: false, error: res.error }
    },

    /**
     * 获取优惠券使用统计
     */
    async getCouponStats(params: {
        page: number
        pageSize: number
        code?: string
        userUid?: string
    }): Promise<{ success: boolean; data: AdminCouponStat[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const page = params.page
        const pageSize = params.pageSize
        const offset = (page - 1) * pageSize

        // 1. Query coupon_codes (Primary Source)
        // This table tracks the generated codes and their current status (available, used, etc.)
        let query = client
            .from('coupon_codes')
            .select(`
                id,
                code,
                status,
                used_at,
                created_at,
                user_uid,
                coupon:coupons(name, type, value)
            `, { count: 'exact' })
            .neq('status', 'available') // Only show processed coupons (Used/Expired/Etc)

        if (params.code) query = query.ilike('code', `%${params.code}%`)
        if (params.userUid) query = query.eq('user_uid', params.userUid)

        query = query.order('used_at', { ascending: false, nullsFirst: false })
            .range(offset, offset + pageSize - 1)

        const { data: codes, error, count } = await query

        if (error) return { success: false, data: [], total: 0, error: error.message }
        if (!codes || codes.length === 0) return { success: true, data: [], total: 0 }

        // 2. Fetch Order Info from user_coupons
        // We need to link the code usage to an order. We match on 'code' and 'user_id'.
        const codeValues = codes.map((c: any) => c.code)

        let usageMap: Record<string, any> = {}

        if (codeValues.length > 0) {
            const { data: usages } = await client
                .from('user_coupons')
                .select('code, user_id, order_id, redeemed_at')
                .in('code', codeValues)

            if (usages) {
                // Create a map key: code + user_id
                usageMap = usages.reduce((acc, u) => {
                    const key = `${u.code}_${u.user_id}`
                    acc[key] = u
                    return acc
                }, {} as Record<string, any>)
            }
        }

        // 3. Format Data
        let formattedData: AdminCouponStat[] = codes.map((item: any) => {
            // Try to find matching usage
            const usageKey = `${item.code}_${item.user_uid}`
            const usage = usageMap[usageKey]

            return {
                id: item.id, // coupon_codes.id
                user_uid: item.user_uid,
                display_uid: item.user_uid,
                used_at: item.used_at,
                created_at: usage ? usage.redeemed_at : item.created_at, // Use redemption time if available
                order_id: usage ? usage.order_id : null,
                order_no: usage ? usage.order_id : undefined,
                code: item.code,
                status: item.status,
                coupon_name: item.coupon?.name,
                coupon_type: item.coupon?.type,
                value: item.coupon?.value
            }
        })

        // 4. Fetch User Details (uid, nickname)
        const userIds = formattedData.map(i => i.user_uid).filter(id => id && id.length > 20)
        if (userIds.length > 0) {
            const { data: users } = await client.from('users').select('id, uid, nickname').in('id', userIds)
            if (users) {
                const userMap = users.reduce((acc, u) => {
                    acc[u.id] = u
                    return acc
                }, {} as Record<string, any>)

                formattedData = formattedData.map(item => {
                    const u = userMap[item.user_uid]
                    return {
                        ...item,
                        display_uid: u ? u.uid : item.user_uid,
                        user_nickname: u ? u.nickname : undefined
                    }
                })
            }
        }

        return { success: true, data: formattedData, total: count || 0 }
    },

    /**
     * 批量删除使用记录
     */
    async deleteCouponUsages(ids: string[]): Promise<{ success: boolean; count?: number; error?: string }> {
        const client = getAdminSupabaseClient()
        // 删除 coupon_codes 表记录 (Primary source)
        const { error, count } = await client.from('coupon_codes').delete().in('id', ids)

        if (error) return { success: false, error: error.message }
        return { success: true, count: count || ids.length }
    },

    /**
     * 更新优惠券说明（code 字段）
     */
    async updateCouponCode(id: string, code: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('coupons').update({ code }).eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}
