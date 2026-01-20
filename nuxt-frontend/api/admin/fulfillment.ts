import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import type { OrderFulfillment } from '@/types/order'

export interface FulfillmentResult {
    success: boolean
    data?: OrderFulfillment | null
    error?: string
}

export const adminFulfillmentApi = {
    /**
     * Get the latest fulfillment receipt for an order
     */
    async getOrderFulfillment(orderId: string): Promise<FulfillmentResult> {
        try {
            const client = getAdminSupabaseClient()
            const { data, error } = await client
                .from('order_fulfillments')
                .select('*')
                .eq('order_id', orderId)
                .order('submitted_at', { ascending: false })
                .limit(1)
                .maybeSingle()

            if (error) {
                return { success: false, error: '获取回执失败: ' + error.message }
            }

            return { success: true, data: data as OrderFulfillment | null }
        } catch (e: any) {
            return { success: false, error: e.message || '系统异常' }
        }
    },

    /**
     * Approve a fulfillment receipt and update order status to active
     */
    async approveFulfillment(fulfillmentId: string, orderId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const client = getAdminSupabaseClient()

            // 1. Update fulfillment status
            const { error: fulfillmentError } = await client
                .from('order_fulfillments')
                .update({
                    status: 'approved',
                    reviewed_at: new Date().toISOString()
                })
                .eq('id', fulfillmentId)

            if (fulfillmentError) {
                return { success: false, error: '更新回执失败: ' + fulfillmentError.message }
            }

            // 2. Update order status to 'active'
            const { error: orderError } = await client
                .from('orders')
                .update({ status: 'active' })
                .eq('id', orderId)

            if (orderError) {
                return { success: false, error: '更新订单状态失败: ' + orderError.message }
            }

            return { success: true }
        } catch (e: any) {
            return { success: false, error: e.message || '系统异常' }
        }
    },

    /**
     * Reject a fulfillment receipt
     */
    async rejectFulfillment(fulfillmentId: string, reason: string): Promise<{ success: boolean; error?: string }> {
        try {
            const client = getAdminSupabaseClient()
            const { error } = await client
                .from('order_fulfillments')
                .update({
                    status: 'rejected',
                    reject_reason: reason,
                    reviewed_at: new Date().toISOString()
                })
                .eq('id', fulfillmentId)

            if (error) {
                return { success: false, error: '驳回失败: ' + error.message }
            }

            return { success: true }
        } catch (e: any) {
            return { success: false, error: e.message || '系统异常' }
        }
    }
}
