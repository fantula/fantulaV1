/**
 * 统一充值回调处理器
 *
 * 职责：
 *   - 调用 process_recharge_payment RPC（原子更新订单/余额/流水，含幂等锁）
 *   - 异步发送邮件通知
 *   - 异步发送微信模板消息（仅微信支付）
 *
 * 使用方：
 *   - server/api/wechat/notify.post.ts
 *   - server/api/alipay/notify.post.ts
 *
 * 每个支付渠道只需负责自己的「签名验证 + 报文解析」，
 * 验证通过后统一调用 handleRechargeCallback，不再各自实现余额逻辑。
 */

import { getSupabaseServiceClient } from '~/server/utils/supabase'
import { sendNotification } from '~/server/utils/email'
import {
    sendWechatTemplateMessage,
    buildRechargeSuccessData,
    WECHAT_TEMPLATE_IDS,
} from '~/server/utils/wechat-template'

export type PaySource = 'wechat' | 'alipay'

export interface RechargeCallbackParams {
    /** 商户订单号，用于匹配 recharge_orders */
    outTradeNo: string
    /** 支付渠道订单号（微信 transaction_id / 支付宝 trade_no）*/
    transactionId: string
    /** 付款方 OpenID（微信专有，支付宝传 null）*/
    payerOpenid?: string
    /** 支付成功时间（ISO 字符串或支付宝时间字符串，RPC 内部解析）*/
    paidAt?: string
    /** 支付渠道，用于账单描述 */
    paySource: PaySource
}

export interface RechargeCallbackResult {
    success: boolean
    alreadyProcessed?: boolean
    error?: string
    /** 供日志使用的汇总信息 */
    summary?: {
        userId: string
        amount: number
        bonus: number
        newBalance: number
    }
}

/**
 * 处理充值回调的核心逻辑
 * 签名验证由调用方负责，此函数仅处理业务逻辑
 */
export async function handleRechargeCallback(
    params: RechargeCallbackParams
): Promise<RechargeCallbackResult> {
    const supabase = getSupabaseServiceClient()

    // ── 1. 调用原子 RPC ────────────────────────────────────────
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
        'process_recharge_payment',
        {
            p_out_trade_no:   params.outTradeNo,
            p_transaction_id: params.transactionId,
            p_payer_openid:   params.payerOpenid ?? null,
            p_paid_at:        params.paidAt ?? null,
            p_pay_source:     params.paySource,
        }
    )

    if (rpcError) {
        console.error('[RechargeHandler] RPC error:', rpcError.message)
        return { success: false, error: rpcError.message }
    }

    if (!rpcResult?.success) {
        console.error('[RechargeHandler] RPC failed:', rpcResult?.error)
        return { success: false, error: rpcResult?.error ?? 'rpc_failed' }
    }

    // 已处理过，直接返回（幂等）
    if (rpcResult.already_processed) {
        if (import.meta.dev) {
            console.log('[RechargeHandler] Already processed:', params.outTradeNo)
        }
        return { success: true, alreadyProcessed: true }
    }

    const { user_id, amount, bonus, new_balance } = rpcResult

    if (import.meta.dev) {
        console.log(
            `[RechargeHandler] OK user=${user_id} amount=${amount} bonus=${bonus} balance=${new_balance}`
        )
    }

    // ── 2. 异步发送通知（不阻塞回调响应）─────────────────────
    const { data: profile } = await supabase
        .from('profiles')
        .select('email, wechat_openid')
        .eq('id', user_id)
        .single()

    if (profile?.email) {
        sendNotification('recharge_success', profile.email, {
            amount:  Number(amount).toFixed(2),
            bonus:   Number(bonus).toFixed(2),
            balance: Number(new_balance).toFixed(2),
        }).catch((e: Error) => console.error('[RechargeHandler] Email error:', e.message))
    }

    if (params.paySource === 'wechat' && profile?.wechat_openid) {
        sendWechatTemplateMessage(
            profile.wechat_openid,
            WECHAT_TEMPLATE_IDS.RECHARGE_SUCCESS,
            buildRechargeSuccessData({
                amount:     Number(amount),
                bonus:      Number(bonus),
                newBalance: Number(new_balance),
            }),
            'https://www.fantula.com/profile/wallet'
        ).catch((e: Error) => console.error('[RechargeHandler] WeChat template error:', e.message))
    }

    return {
        success: true,
        alreadyProcessed: false,
        summary: {
            userId:     user_id,
            amount:     Number(amount),
            bonus:      Number(bonus),
            newBalance: Number(new_balance),
        },
    }
}
