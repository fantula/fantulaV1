/**
 * POST /api/alipay/notify
 * 支付宝异步回调通知处理
 *
 * 职责边界（单一原则）：
 *   1. 验证支付宝签名（RSA2/SHA256WithRSA）
 *   2. 校验交易状态为 TRADE_SUCCESS
 *   3. 调用统一充值处理器 handleRechargeCallback
 *
 * 余额更新、流水记录、邮件通知均在 recharge-handler.ts 中处理。
 * 必须返回字符串 "success" 表示处理成功，否则支付宝会重试。
 */
import { getAlipayConfig, verifyAlipaySign } from '~/server/utils/alipay'
import { handleRechargeCallback } from '~/server/utils/recharge-handler'

export default defineEventHandler(async (event) => {
    try {
        // ── 1. 解析表单参数（application/x-www-form-urlencoded）
        const body = await readBody(event)

        if (!body?.out_trade_no) {
            console.error('[AlipayNotify] Missing out_trade_no')
            return 'fail'
        }

        if (import.meta.dev) {
            console.log('[AlipayNotify] Received:', body.out_trade_no, body.trade_status)
        }

        // ── 2. 签名验证 ───────────────────────────────────────
        const config = getAlipayConfig()
        const isValid = verifyAlipaySign(body, config.alipayPublicKey)
        if (!isValid) {
            console.error('[AlipayNotify] Signature verification failed:', body.out_trade_no)
            return 'fail'
        }

        // ── 3. 只处理 TRADE_SUCCESS ───────────────────────────
        if (body.trade_status !== 'TRADE_SUCCESS') {
            if (import.meta.dev) {
                console.log('[AlipayNotify] Non-success status:', body.trade_status)
            }
            return 'success'
        }

        // ── 4. 交由统一处理器完成业务逻辑 ────────────────────
        const result = await handleRechargeCallback({
            outTradeNo:    String(body.out_trade_no),
            transactionId: String(body.trade_no),
            payerOpenid:   undefined,
            paidAt:        body.gmt_payment || body.gmt_create,
            paySource:     'alipay',
        })

        if (!result.success) {
            console.error('[AlipayNotify] Handler failed:', result.error)
            return 'fail'
        }

        return 'success'

    } catch (err: any) {
        console.error('[AlipayNotify] Unexpected error:', err.message)
        return 'fail'
    }
})
