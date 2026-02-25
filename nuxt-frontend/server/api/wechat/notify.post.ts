/**
 * POST /api/wechat/notify
 * 微信支付回调通知处理
 * 由微信服务器调用，无需用户认证
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import {
    getWechatPayConfig,
    decryptCallback,
    verifyCallbackSignature,
} from '~/server/utils/wechat-pay'
import {
    sendWechatTemplateMessage,
    buildRechargeSuccessData,
    WECHAT_TEMPLATE_IDS,
} from '~/server/utils/wechat-template'

interface NotifyResource {
    original_type: string
    algorithm: string
    ciphertext: string
    associated_data: string
    nonce: string
}

interface NotifyBody {
    id: string
    create_time: string
    resource_type: string
    event_type: string
    summary: string
    resource: NotifyResource
}

interface DecryptedPayment {
    mchid: string
    appid: string
    out_trade_no: string
    transaction_id: string
    trade_type: string
    trade_state: string
    trade_state_desc: string
    bank_type: string
    attach: string
    success_time: string
    payer: { openid: string }
    amount: {
        total: number
        payer_total: number
        currency: string
        payer_currency: string
    }
}

export default defineEventHandler(async (event) => {
    try {
        // 获取请求头用于验签
        const timestamp = getHeader(event, 'Wechatpay-Timestamp') || ''
        const nonce = getHeader(event, 'Wechatpay-Nonce') || ''
        const signature = getHeader(event, 'Wechatpay-Signature') || ''

        // 读取请求体
        const rawBody = await readRawBody(event)
        const body: NotifyBody = JSON.parse(rawBody || '{}')

        console.log('[Notify] Received notification:', body.event_type, body.id)

        // 验证签名 (TODO: 完善)
        const isValid = verifyCallbackSignature(
            timestamp,
            nonce,
            rawBody || '',
            signature,
            ''
        )

        if (!isValid) {
            console.error('[Notify] Signature verification failed')
            return { code: 'FAIL', message: '签名验证失败' }
        }

        // 只处理支付成功事件
        if (body.event_type !== 'TRANSACTION.SUCCESS') {
            return { code: 'SUCCESS', message: '非支付成功事件' }
        }

        // 解密通知内容
        const config = getWechatPayConfig()
        const decryptedStr = decryptCallback(
            body.resource.ciphertext,
            body.resource.nonce,
            body.resource.associated_data,
            config.apiV3Key
        )

        const payment: DecryptedPayment = JSON.parse(decryptedStr)
        console.log('[Notify] Decrypted payment:', payment.out_trade_no, payment.trade_state)

        // 解析附加数据
        let attach: { userId?: string; type?: string; bonus?: number } = {}
        try {
            attach = JSON.parse(payment.attach || '{}')
        } catch (e) {
            console.error('[Notify] Failed to parse attach:', payment.attach)
        }

        if (!attach.userId) {
            console.error('[Notify] Missing userId in attach')
            return { code: 'FAIL', message: '缺少用户ID' }
        }

        // 获取 Supabase 服务端客户端
        const supabase = getSupabaseServiceClient()

        // 查询订单
        const { data: order, error: orderError } = await supabase
            .from('recharge_orders')
            .select('*')
            .eq('out_trade_no', payment.out_trade_no)
            .single()

        if (orderError || !order) {
            console.error('[Notify] Order not found:', payment.out_trade_no)
            return { code: 'FAIL', message: '订单不存在' }
        }

        // 幂等检查
        if (order.status === 'paid') {
            console.log('[Notify] Order already processed:', payment.out_trade_no)
            return { code: 'SUCCESS', message: '已处理' }
        }

        // 更新订单状态
        await supabase
            .from('recharge_orders')
            .update({
                status: 'paid',
                transaction_id: payment.transaction_id,
                payer_openid: payment.payer?.openid,
                paid_at: payment.success_time,
                updated_at: new Date().toISOString(),
            })
            .eq('out_trade_no', payment.out_trade_no)

        // 更新用户余额
        const { data: profile } = await supabase
            .from('profiles')
            .select('balance')
            .eq('id', attach.userId)
            .single()

        if (profile) {
            // 注意：数据库返回的金额可能是字符串，需要转换为数字
            const currentBalance = parseFloat(profile.balance) || 0
            const orderAmount = parseFloat(order.amount) || 0
            const bonus = parseFloat(order.bonus) || parseFloat(String(attach.bonus || 0)) || 0
            const totalAmount = orderAmount + bonus
            const newBalance = currentBalance + totalAmount

            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    balance: newBalance,
                })
                .eq('id', attach.userId)

            if (updateError) {
                console.error('[Notify] Failed to update balance:', updateError)
            }

            // 记录余额变动
            await supabase
                .from('wallet_transactions')
                .insert({
                    user_id: attach.userId,
                    type: '微信充值',
                    amount: totalAmount,
                    balance_after: newBalance,
                    description: `微信支付充值 ${order.amount.toFixed(2)}点 赠送${bonus.toFixed(2)}点`,
                    created_at: new Date().toISOString(),
                })

            console.log(`[Notify] Success: User ${attach.userId} recharged ${totalAmount} (amount: ${order.amount}, bonus: ${bonus})`)

            // 异步发送充值到账邮件通知（不阻塞支付回调）
            const { data: userProfile } = await supabase
                .from('profiles')
                .select('email, wechat_openid')
                .eq('id', attach.userId)
                .single()

            if (userProfile?.email) {
                sendNotification('recharge_success', userProfile.email, {
                    amount: orderAmount.toFixed(2),
                    bonus: bonus.toFixed(2),
                    balance: newBalance.toFixed(2),
                }).catch(e => console.error('[Notify] Email send error:', e))
            }

            // 异步发送充值成功微信模板通知（不阻塞支付回调）
            if (userProfile?.wechat_openid) {
                sendWechatTemplateMessage(
                    userProfile.wechat_openid,
                    WECHAT_TEMPLATE_IDS.RECHARGE_SUCCESS,
                    buildRechargeSuccessData({ amount: orderAmount, bonus, newBalance }),
                    'https://www.fantula.com/profile/wallet'
                ).catch((e: Error) => console.error('[Notify] WeChat template send error:', e.message))
            }
        }

        return { code: 'SUCCESS', message: '成功' }
    } catch (err: any) {
        console.error('[Notify] Error:', err)
        return { code: 'FAIL', message: err.message || '处理失败' }
    }
})
