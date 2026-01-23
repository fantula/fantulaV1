/**
 * 客户端订单 API
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 */

import { getSupabaseClient } from '@/utils/supabase'

// ========================================
// 类型定义
// ========================================

export interface ClientOrder {
    id: string
    order_no: string
    order_type: 'virtual' | 'shared_account' | 'one_time_cdk'
    status: 'pending' | 'pending_delivery' | 'active' | 'expired' | 'completed' | 'refunding' | 'refunded'
    quantity: number
    total_amount: number
    created_at: string
    expires_at?: string
    slot_index?: number
    product_snapshot?: {
        product_id: string
        product_name: string
        image: string
    }
    sku_snapshot?: {
        sku_id: string
        spec_combination: Record<string, string>
        duration: number
        price: number
    }
    cdk_snapshot?: string[]
}

export interface ClientPreOrder {
    id: string
    order_no: string
    status: 'pending' | 'confirmed' | 'converted' | 'expired' | 'cancelled'
    quantity: number
    unit_price: number
    total_amount: number
    product_snapshot: {
        product_id: string
        product_name: string
        image: string
    }
    sku_snapshot: {
        sku_id: string
        spec_combination: Record<string, string>
        duration: number
        price: number
    }
    source: 'buy_now' | 'cart'
    expires_at: string
    created_at: string
}

// ========================================
// 订单 API
// ========================================

export const clientOrderApi = {
    /**
     * 获取用户订单列表 (已支付订单)
     */
    async getOrderList(params?: {
        limit?: number
        status?: string
    }): Promise<{
        success: boolean
        data?: ClientOrder[]
        error?: string
    }> {
        const client = getSupabaseClient()

        let query = client
            .from('orders')
            .select('id, order_no, order_type, status, quantity, total_amount, created_at, expires_at, product_snapshot, sku_snapshot')
            .order('created_at', { ascending: false })

        if (params?.limit) {
            query = query.limit(params.limit)
        }

        if (params?.status && params.status !== 'all') {
            query = query.eq('status', params.status)
        }

        const { data, error } = await query

        if (error) {
            console.error('获取订单列表失败:', error)
            return { success: false, error: error.message }
        }

        return { success: true, data: data || [] }
    },

    /**
     * 获取订单详情
     */
    async getOrderDetail(orderId: string): Promise<{
        success: boolean
        data?: ClientOrder & { cdkList?: any[]; slotList?: any[] }
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client
            .from('orders')
            .select('*, cdk_snapshot, slot_occupancy_ids') // Select cdk_snapshot and slot_occupancy_ids
            .eq('id', orderId)
            .single()

        if (error || !data) {
            return { success: false, error: error?.message || '订单不存在' }
        }

        // 获取 CDK 详情
        let cdkList: any[] = []
        const cdkIds: string[] = data.cdk_snapshot?.locked_cdk_ids || data.cdk_snapshot || []

        // 兼容旧数据格式 (cdk_snapshot 可能是对象或数组)
        const realCdkIds = Array.isArray(cdkIds) ? cdkIds : (cdkIds as any).locked_cdk_ids || []

        if (realCdkIds.length > 0) {
            const { data: cdks } = await client
                .from('cdks')
                .select('id, code, account_data')
                .in('id', realCdkIds)

            if (cdks) {
                cdkList = cdks.map((cdk: any) => {
                    let parsed = null
                    try { parsed = JSON.parse(cdk.code) } catch { }
                    return {
                        id: cdk.id,
                        code: cdk.code,
                        parsed,
                        accountData: cdk.account_data
                    }
                })
            }
        }

        // 获取车位详情 (针对 shared_account)
        let slotList: any[] = []
        if (data.slot_occupancy_ids && data.slot_occupancy_ids.length > 0) {
            const { data: slots } = await client
                .from('slot_occupancies')
                .select('id, slot_index, cdk_id')
                .in('id', data.slot_occupancy_ids)

            if (slots) {
                slotList = slots
            }
        }

        return {
            success: true,
            data: { ...data, cdkList, slotList }
        }
    },

    /**
     * 获取待支付预订单列表
     */
    async getPendingPreOrders(): Promise<{
        success: boolean
        data?: ClientPreOrder[]
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client
            .from('pre_orders')
            .select('*')
            .eq('status', 'pending')
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data: data || [] }
    },

    /**
     * 获取预订单详情
     */
    async getPreOrderDetail(preOrderId: string): Promise<{
        success: boolean
        data?: ClientPreOrder
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('get_pre_order', {
            p_pre_order_id: preOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '预订单不存在' }
        }

        return { success: true, data: data.pre_order }
    },

    /**
     * 创建预订单 (立即购买)
     */
    async createPreOrder(
        skuId: string,
        quantity: number = 1,
        source: 'buy_now' | 'cart' = 'buy_now'
    ): Promise<{
        success: boolean
        preOrderId?: string
        orderNo?: string
        totalAmount?: number
        expiresAt?: string
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('create_pre_order', {
            p_sku_id: skuId,
            p_quantity: quantity,
            p_source: source
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '创建预订单失败' }
        }

        return {
            success: true,
            preOrderId: data.pre_order_id,
            orderNo: data.order_no,
            totalAmount: data.total_amount,
            expiresAt: data.expires_at
        }
    },

    /**
     * 确认预订单并支付
     */
    async confirmPreOrder(
        preOrderId: string,
        payMethod: 'balance' | 'wechat',
        couponId?: string
    ): Promise<{
        success: boolean
        orderNo?: string
        orderId?: string
        totalAmount?: number
        error?: string
    }> {
        const client = getSupabaseClient()

        const payload: any = {
            p_pre_order_id: preOrderId,
            p_pay_method: payMethod
        }

        if (couponId) {
            payload.p_coupon_id = couponId
        }

        const { data, error } = await client.rpc('confirm_pre_order', payload)

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '支付失败' }
        }

        return {
            success: true,
            orderNo: data.order_no,
            orderId: data.order_id,
            totalAmount: data.total_amount
        }
    },

    /**
     * 取消预订单
     */
    async cancelPreOrder(preOrderId: string): Promise<{
        success: boolean
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('cancel_pre_order', {
            p_pre_order_id: preOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '取消失败' }
        }

        return { success: true }
    },

    /**
     * 应用优惠券到预订单
     */
    async applyCoupon(
        preOrderId: string,
        couponId: string | null
    ): Promise<{
        success: boolean
        totalAmount?: number
        discountAmount?: number
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('apply_coupon_to_pre_order', {
            p_pre_order_id: preOrderId,
            p_coupon_id: couponId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '应用优惠券失败' }
        }

        return {
            success: true,
            totalAmount: data.total_amount,
            discountAmount: data.discount_amount
        }
    },

    // ========================================
    // 续费 API
    // ========================================

    /**
     * 获取订单可续费的 SKU 列表
     */
    async getRenewalSkus(orderId: string): Promise<{
        success: boolean
        orderId?: string
        cdkId?: string
        endTime?: string
        product?: {
            id: string
            name: string
            image: string
        }
        skus?: Array<{
            sku_id: string
            spec_combination: Record<string, string>
            price: number
            duration: number
            product_type: string
            image?: string
        }>
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('get_renewal_skus', {
            p_order_id: orderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '获取续费SKU失败' }
        }

        return {
            success: true,
            orderId: data.order_id,
            cdkId: data.cdk_id,
            endTime: data.end_time,
            product: data.product,
            skus: data.skus || []
        }
    },

    /**
     * 创建续费预订单
     */
    async createRenewalPreOrder(
        skuId: string,
        oldOrderId: string
    ): Promise<{
        success: boolean
        preOrderId?: string
        orderNo?: string
        totalAmount?: number
        expiresAt?: string
        error?: string
    }> {
        const client = getSupabaseClient()

        const { data, error } = await client.rpc('create_renewal_pre_order', {
            p_sku_id: skuId,
            p_old_order_id: oldOrderId
        })

        if (error) {
            return { success: false, error: error.message }
        }

        if (!data?.success) {
            return { success: false, error: data?.error || '创建续费订单失败' }
        }

        return {
            success: true,
            preOrderId: data.pre_order_id,
            orderNo: data.order_no,
            totalAmount: data.total_amount,
            expiresAt: data.expires_at
        }
    },

    // ========================================
    // 退款 API
    // ========================================

    /**
     * 创建退款申请
     */
    async createRefundRequest(orderId: string, reason: string, reasonDetail: string = ''): Promise<{
        success: boolean
        requestId?: string
        message?: string
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data, error } = await client.rpc('create_refund_request', {
            p_order_id: orderId,
            p_reason: reason,
            p_reason_detail: reasonDetail
        })

        if (error) return { success: false, error: error.message }
        if (!data?.success) return { success: false, error: data?.error || '申请失败' }

        return { success: true, requestId: data.request_id, message: data.message }
    },

    /**
     * 获取退款申请详情
     */
    async getRefundRequest(orderId: string): Promise<{
        success: boolean
        data?: any
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data, error } = await client.rpc('get_refund_request', { p_order_id: orderId })

        if (error) return { success: false, error: error.message }
        if (!data?.success) return { success: false, error: data?.error }

        return { success: true, data: data.request }
    },

    /**
     * 取消退款申请
     */
    async cancelRefundRequest(orderId: string): Promise<{
        success: boolean
        message?: string
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data, error } = await client.rpc('cancel_user_refund_request', { p_order_id: orderId })

        if (error) return { success: false, error: error.message }
        if (!data?.success) return { success: false, error: data?.error || '取消失败' }

        return { success: true, message: data.message }
    },

    /**
     * 获取订单退款状态（待审核请求和取消次数）
     */
    async getOrderRefundInfo(orderId: string): Promise<{
        success: boolean
        pendingRequest?: {
            id: string
            reason: string
            created_at: string
        } | null
        cancelledCount?: number
        error?: string
    }> {
        const client = getSupabaseClient()
        const { data, error } = await client.rpc('get_order_refund_info', { p_order_id: orderId })

        if (error) return { success: false, error: error.message }
        if (!data?.success) return { success: false, error: data?.error }

        return {
            success: true,
            pendingRequest: data.pending_request,
            cancelledCount: data.cancelled_count
        }
    },
}
