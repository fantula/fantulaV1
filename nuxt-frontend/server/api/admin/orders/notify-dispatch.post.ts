/**
 * POST /api/admin/orders/notify-dispatch
 * 管理员审批发货后，通知订单所属用户（管理端调用）
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import {
    sendWechatTemplateMessage,
    buildDispatchData,
    WECHAT_TEMPLATE_IDS,
} from '~/server/utils/wechat-template'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event) as {
            orderId: string
        }

        const { orderId } = body

        if (!orderId) {
            return { success: false, error: '缺少 orderId' }
        }

        const supabase = getSupabaseServiceClient()

        // 查订单基本信息和用户 openid
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('order_no, product_snapshot, total_amount, status, user_id')
            .eq('id', orderId)
            .single()

        if (orderError || !order) {
            console.error('[notify-dispatch] Order query failed:', orderError?.message || '订单不存在', 'orderId:', orderId)
            return { success: false, error: '订单不存在' }
        }

        // 从 product_snapshot 中提取商品名称
        const productTitle = order.product_snapshot?.product_name || '商品'

        // 查用户 openid
        const { data: profile } = await supabase
            .from('profiles')
            .select('wechat_openid')
            .eq('id', order.user_id)
            .single()

        if (!profile?.wechat_openid) {
            console.log('[notify-dispatch] No openid for userId:', order.user_id, '→ skipped')
            return { success: true, skipped: true, reason: '用户未绑定微信' }
        }

        console.log('[notify-dispatch] Sending to openid:', profile.wechat_openid, 'product:', productTitle, 'status: 使用中')

        const result = await sendWechatTemplateMessage(
            profile.wechat_openid,
            WECHAT_TEMPLATE_IDS.DISPATCH,
            buildDispatchData({
                orderNo: order.order_no,
                productTitle,
                totalAmount: parseFloat(order.total_amount) || 0,
                status: '使用中',
            }),
            'https://www.fantula.com/profile/order'
        )

        return result

    } catch (err: any) {
        console.error('[notify-dispatch] Error:', err)
        return { success: false, error: err.message }
    }
})
