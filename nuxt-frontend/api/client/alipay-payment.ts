/**
 * 支付宝支付 API 客户端
 * 调用 Nuxt Server API
 */
import { getAuthToken } from '~/utils/supabase'

export interface AlipayNativePayResponse {
    success: boolean
    data?: {
        qr_code: string       // 支付宝二维码链接
        out_trade_no: string  // 商户订单号
        amount: number        // 金额
    }
    error?: string
}

export interface AlipayH5PayResponse {
    success: boolean
    data?: {
        pay_url: string       // 支付跳转链接
        out_trade_no: string
        amount: number
    }
    error?: string
}

export interface AlipayQueryOrderResponse {
    success: boolean
    data?: {
        trade_status: string  // TRADE_SUCCESS | WAIT_BUYER_PAY | ...
        out_trade_no: string
        amount: number
        paid: boolean
    }
    error?: string
}

async function getAuthHeaders(): Promise<Record<string, string>> {
    const token = await getAuthToken()
    if (token) {
        return { Authorization: `Bearer ${token}` }
    }
    return {}
}

export const alipayApi = {
    /**
     * 发起支付宝 Native 支付（PC 扫码）
     */
    async nativePayRecharge(amount: number, bonus: number = 0, description?: string): Promise<AlipayNativePayResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<AlipayNativePayResponse>('/api/alipay/native-pay', {
                method: 'POST',
                body: { amount, bonus, description },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[AlipayApi] nativePayRecharge error:', error)
            return { success: false, error: error.data?.message || error.message || '支付发起失败' }
        }
    },

    /**
     * 发起支付宝 H5 支付（移动端跳转）
     */
    async h5PayRecharge(amount: number, bonus: number = 0, description?: string): Promise<AlipayH5PayResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<AlipayH5PayResponse>('/api/alipay/h5-pay', {
                method: 'POST',
                body: { amount, bonus, description },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[AlipayApi] h5PayRecharge error:', error)
            return { success: false, error: error.data?.message || error.message || '支付发起失败' }
        }
    },

    /**
     * 查询支付宝订单状态（PC 轮询用）
     */
    async queryOrder(outTradeNo: string): Promise<AlipayQueryOrderResponse> {
        try {
            const headers = await getAuthHeaders()
            const data = await $fetch<AlipayQueryOrderResponse>('/api/alipay/query-order', {
                method: 'POST',
                body: { out_trade_no: outTradeNo },
                headers,
            })
            return data
        } catch (error: any) {
            console.error('[AlipayApi] queryOrder error:', error)
            return { success: false, error: error.data?.message || error.message || '查询失败' }
        }
    },
}
