/**
 * POST /api/wechat/notify-purchase
 * 购买成功后发送微信模板通知（用户已登录时调用）
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import {
    sendWechatTemplateMessage,
    buildPurchaseSuccessData,
    WECHAT_TEMPLATE_IDS,
} from '~/server/utils/wechat-template'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event) as {
            orderNo: string
            productTitle: string
            totalAmount: number
            userId: string
            status?: string    // 订单状态（phrase类型，≤5字中文）
        }

        const { orderNo, productTitle, totalAmount, userId, status } = body

        if (!orderNo || !userId) {
            return { success: false, error: '缺少必要参数' }
        }

        // 从用户资料获取 openid
        const supabase = getSupabaseServiceClient()
        const { data: profile } = await supabase
            .from('profiles')
            .select('wechat_openid')
            .eq('id', userId)
            .single()

        if (!profile?.wechat_openid) {
            console.log('[notify-purchase] No openid for userId:', userId, '→ skipped')
            return { success: true, skipped: true, reason: '用户未绑定微信' }
        }

        console.log('[notify-purchase] Sending to openid:', profile.wechat_openid, 'product:', productTitle, 'status:', status || '待充值')

        const result = await sendWechatTemplateMessage(
            profile.wechat_openid,
            WECHAT_TEMPLATE_IDS.PURCHASE_SUCCESS,
            buildPurchaseSuccessData({ orderNo, productTitle, totalAmount, status }),
            'https://www.fantula.com/profile/order'
        )

        return result

    } catch (err: any) {
        console.error('[notify-purchase] Error:', err)
        return { success: false, error: err.message }
    }
})
