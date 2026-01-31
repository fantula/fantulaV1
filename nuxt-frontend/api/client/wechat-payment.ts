/**
 * 微信支付 API 客户端
 * 调用 Nuxt Server API (本地部署)
 */
import { getAuthToken } from '~/utils/supabase'

// ============ 类型定义 ============

export interface WechatNativePayResponse {
    success: boolean
    data?: {
        code_url: string          // 二维码链接
        out_trade_no: string      // 商户订单号
        amount: number            // 金额
    }
    error?: string
}

export interface WechatQueryOrderResponse {
    success: boolean
    data?: {
        trade_state: string       // 订单状态
        trade_state_desc: string  // 状态描述
        out_trade_no: string      // 商户订单号
        transaction_id?: string   // 微信支付单号
        amount: number            // 金额
        paid: boolean             // 是否已支付
    }
    error?: string
}

export interface WechatJsapiPayResponse {
    success: boolean
    data?: {
        appId: string
        timeStamp: string
        nonceStr: string
        package: string
        signType: string
        paySign: string
        out_trade_no: string
        amount: number
    }
    error?: string
}

export interface WechatGetOpenIdResponse {
    success: boolean
    data?: {
        openid: string
    }
    error?: string
}

// ============ 辅助函数 ============

async function getAuthHeaders(): Promise<Record<string, string>> {
    const token = await getAuthToken()
    if (token) {
        return { Authorization: `Bearer ${token}` }
    }
    return {}
}

// ============ API 客户端 ============

export const wechatPayApi = {
    /**
     * 发起微信 Native 支付（PC扫码）
     * @param amount 充值金额（元）
     * @param bonus 赠送金额
     * @param description 商品描述
     */
    async nativePayRecharge(amount: number, bonus: number = 0, description?: string): Promise<WechatNativePayResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<WechatNativePayResponse>('/api/wechat/native-pay', {
                method: 'POST',
                body: { amount, bonus, description },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[WechatPay] nativePayRecharge error:', error)
            return { success: false, error: error.data?.message || error.message || '支付发起失败' }
        }
    },

    /**
     * 查询微信支付订单状态
     * @param outTradeNo 商户订单号
     */
    async queryOrder(outTradeNo: string): Promise<WechatQueryOrderResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<WechatQueryOrderResponse>('/api/wechat/query-order', {
                method: 'POST',
                body: { out_trade_no: outTradeNo },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[WechatPay] queryOrder error:', error)
            return { success: false, error: error.data?.message || error.message || '查询失败' }
        }
    },

    /**
     * 发起微信 JSAPI 支付（公众号内）
     * @param amount 充值金额（元）
     * @param openid 用户 OpenID
     * @param description 商品描述
     */
    async jsapiPayRecharge(amount: number, openid: string, description?: string): Promise<WechatJsapiPayResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<WechatJsapiPayResponse>('/api/wechat/jsapi-pay', {
                method: 'POST',
                body: { amount, openid, description },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[WechatPay] jsapiPayRecharge error:', error)
            return { success: false, error: error.data?.message || error.message || '支付发起失败' }
        }
    },

    /**
     * 通过授权 code 获取 OpenID
     * @param code 微信授权回调的 code
     */
    async getOpenId(code: string): Promise<WechatGetOpenIdResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<WechatGetOpenIdResponse>('/api/wechat/get-openid', {
                method: 'POST',
                body: { code },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[WechatPay] getOpenId error:', error)
            return { success: false, error: error.data?.message || error.message || '获取OpenID失败' }
        }
    },
}
