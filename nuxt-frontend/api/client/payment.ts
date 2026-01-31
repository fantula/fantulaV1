import { http } from '@/utils/request'
import type { ApiResponse } from '@/types/api'

/**
 * 支付相关API
 */
export const paymentApi = {
  /**
   * 获取支付链接
   * @param params 支付参数
   */
  getPaymentUrl(params: {
    orderId: string
    payType: string
    [key: string]: any
  }): Promise<ApiResponse<any>> {
    return http.get('/product/pay', params)
  },

  /**
   * 支付回调处理
   * @param type 支付类型
   * @param params 回调参数
   * @param signs 签名数据
   */
  paymentCallback(type: string, params: any, signs?: string): Promise<any> {
    return http.post(`/product/pay/${type}/callback`, signs, { params })
  },

  /**
   * 获取支付成功页面URL
   * @param orderNo 订单号
   */
  getPaymentSuccessUrl(orderNo: string): Promise<ApiResponse<string>> {
    return http.get(`/product/order/success/${orderNo}`)
  },

  /**
   * 获取支付配置
   * @param type 支付类型
   * @param params 配置参数
   */
  getPaymentConfig(type: string, params?: any): Promise<ApiResponse<any>> {
    return http.get(`/product/pay/config/${type}`, params)
  },

  // ✅ 真实API调用（已启用）
  /**
   * 检查支付状态
   * @param orderNo 订单号
   */
  checkPaymentStatus(orderNo: string): Promise<ApiResponse<{ status: string; paid: boolean }>> {
    // 暂时返回默认状态，等待后端实现支付状态检查功能
    return Promise.resolve({
      code: 0,
      msg: 'success',
      success: true,
      data: { status: 'pending', paid: false }
    })
  },

  // 🎨 前端UI设计阶段 - 创建支付订单功能（已注释，用于检查页面功能）
  // /**
  //  * 创建支付订单
  //  * @param params 支付订单参数
  //  */
  // createPayment(params: {
  //   orderNo: string
  //   amount: number
  //   payType: string
  //   returnUrl?: string
  //   notifyUrl?: string
  // }): Promise<ApiResponse<any>> {
  //   return http.post('/product/payment/create', params)
  // }
}

/**
 * 微信支付 API
 * 调用 Supabase Edge Functions
 */
import { callEdgeFunction } from '@/utils/supabase'

export interface WechatNativePayResponse {
  success: boolean
  data?: {
    code_url: string       // 二维码链接
    out_trade_no: string   // 商户订单号
    amount: number         // 充值金额
  }
  error?: string
}

export interface WechatQueryOrderResponse {
  success: boolean
  data?: {
    trade_state: string           // 订单状态
    trade_state_desc: string      // 状态描述
    out_trade_no: string          // 商户订单号
    transaction_id?: string       // 微信支付单号
    amount: number                // 金额
    paid: boolean                 // 是否已支付
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

export const wechatPayApi = {
  /**
   * 发起微信 Native 支付（PC扫码）
   * @param amount 充值金额（元）
   * @param description 商品描述
   */
  async nativePayRecharge(amount: number, description?: string): Promise<WechatNativePayResponse> {
    const { data, error } = await callEdgeFunction<WechatNativePayResponse>('wechat-native-pay', {
      method: 'POST',
      body: { amount, description },
      requireAuth: true,
    })

    if (error) {
      return { success: false, error }
    }
    return data || { success: false, error: '未知错误' }
  },

  /**
   * 查询微信支付订单状态
   * @param outTradeNo 商户订单号
   */
  async queryOrder(outTradeNo: string): Promise<WechatQueryOrderResponse> {
    const { data, error } = await callEdgeFunction<WechatQueryOrderResponse>('wechat-query-order', {
      method: 'POST',
      body: { out_trade_no: outTradeNo },
      requireAuth: true,
    })

    if (error) {
      return { success: false, error }
    }
    return data || { success: false, error: '未知错误' }
  },

  /**
   * 发起微信 JSAPI 支付（公众号内）
   * @param amount 充值金额（元）
   * @param openid 用户 OpenID
   * @param description 商品描述
   */
  async jsapiPayRecharge(amount: number, openid: string, description?: string): Promise<WechatJsapiPayResponse> {
    const { data, error } = await callEdgeFunction<WechatJsapiPayResponse>('wechat-jsapi-pay', {
      method: 'POST',
      body: { amount, openid, description },
      requireAuth: true,
    })

    if (error) {
      return { success: false, error }
    }
    return data || { success: false, error: '未知错误' }
  },

  /**
   * 通过授权 code 获取 OpenID
   * @param code 微信授权回调的 code
   */
  async getOpenId(code: string): Promise<WechatGetOpenIdResponse> {
    const { data, error } = await callEdgeFunction<WechatGetOpenIdResponse>('wechat-get-openid', {
      method: 'POST',
      body: { code },
      requireAuth: true,
    })

    if (error) {
      return { success: false, error }
    }
    return data || { success: false, error: '未知错误' }
  },
}