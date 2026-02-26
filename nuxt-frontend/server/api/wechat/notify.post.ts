/**
 * POST /api/wechat/notify
 * 微信支付回调通知处理
 *
 * 职责边界（单一原则）：
 *   1. 验证微信签名（RSA-SHA256 + 时间戳防重放）
 *   2. AES-256-GCM 解密报文，提取 out_trade_no / transaction_id
 *   3. 调用统一充值处理器 handleRechargeCallback
 *
 * 余额更新、流水记录、邮件/模板通知均在 recharge-handler.ts 中处理。
 */
import {
    getWechatPayConfig,
    decryptCallback,
    verifyCallbackSignature,
} from '~/server/utils/wechat-pay'
import { handleRechargeCallback } from '~/server/utils/recharge-handler'

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
        // ── 1. 读取请求头（验签用）────────────────────────────
        const timestamp = getHeader(event, 'Wechatpay-Timestamp') || ''
        const nonce     = getHeader(event, 'Wechatpay-Nonce')     || ''
        const signature = getHeader(event, 'Wechatpay-Signature') || ''
        const rawBody   = await readRawBody(event)
        const body: NotifyBody = JSON.parse(rawBody || '{}')

        if (import.meta.dev) {
            console.log('[WechatNotify] Received event:', body.event_type, body.id)
        }

        // ── 2. 签名验证 ───────────────────────────────────────
        const config = getWechatPayConfig()
        // .env 中 \n 是字面量，需转换为真实换行符才能用于 RSA 验证
        const rawCert = String(useRuntimeConfig().wechatPlatformCert || '')
        const platformCert = rawCert.replace(/\\n/g, '\n')
        // 诊断日志：确认公钥是否正确加载（部署验证后删除）
        console.log('[WechatNotify] cert loaded, length:', rawCert.length, 'starts:', rawCert.slice(0, 27))
        const isValid = verifyCallbackSignature(timestamp, nonce, rawBody || '', signature, platformCert)

        if (!isValid) {
            console.error('[WechatNotify] Signature verification failed, id:', body.id)
            return { code: 'FAIL', message: '签名验证失败' }
        }

        // ── 3. 只处理支付成功事件 ─────────────────────────────
        if (body.event_type !== 'TRANSACTION.SUCCESS') {
            return { code: 'SUCCESS', message: '非支付成功事件' }
        }

        // ── 4. 解密报文 ───────────────────────────────────────
        let payment: DecryptedPayment
        try {
            const decryptedStr = decryptCallback(
                body.resource.ciphertext,
                body.resource.nonce,
                body.resource.associated_data,
                config.apiV3Key
            )
            payment = JSON.parse(decryptedStr)
        } catch (e: any) {
            console.error('[WechatNotify] Decrypt failed:', e.message)
            return { code: 'FAIL', message: '报文解密失败' }
        }

        if (import.meta.dev) {
            console.log('[WechatNotify] Payment:', payment.out_trade_no, payment.trade_state)
        }

        // ── 5. 交由统一处理器完成业务逻辑 ────────────────────
        const result = await handleRechargeCallback({
            outTradeNo:    payment.out_trade_no,
            transactionId: payment.transaction_id,
            payerOpenid:   payment.payer?.openid,
            paidAt:        payment.success_time,
            paySource:     'wechat',
        })

        if (!result.success) {
            console.error('[WechatNotify] Handler failed:', result.error)
            return { code: 'FAIL', message: result.error || '处理失败' }
        }

        return { code: 'SUCCESS', message: '成功' }

    } catch (err: any) {
        console.error('[WechatNotify] Unexpected error:', err.message)
        return { code: 'FAIL', message: '服务器内部错误' }
    }
})
