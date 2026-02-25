/**
 * 微信模板消息发送工具
 * 复用 wechat-login.ts 中已有的 getWechatAccessToken
 */
import { getWechatAccessToken } from './wechat-login'

// 模板消息数据格式
export type WechatTemplateData = Record<string, { value: string; color?: string }>

// 模板 ID 常量（来自微信公众平台）
export const WECHAT_TEMPLATE_IDS = {
    /** 订单发货通知：character_string2=订单编号 thing4=商品名称 amount8=订单金额 phrase9=订单状态 */
    DISPATCH: 'XSaOOr_63i4YmnczXhhWTC9G-hcsjt4WEw_3SbnBFW0',
    /** 订单支付成功通知：character_string2=订单号 thing3=商品名称 phrase20=订单状态 amount5=支付金额 */
    PURCHASE_SUCCESS: 'env81uSEkOb-JO3glNg9LrstnwEaJH0Cvlbid-O0xeM',
    /** 充值成功通知：thing8=商户名称 amount5=当前余额 amount3=充值金额 amount4=赠送金额 */
    RECHARGE_SUCCESS: 'UPg8SLiEvaHaaBMSKnUY8CdUgpocqKb5kBM9kIfAXo4',
}

/**
 * 发送微信模板消息
 * @param openid 用户 openid（来自 profiles.wechat_openid）
 * @param templateId 模板 ID
 * @param data 模板字段数据（keyword1, keyword2...）
 * @param url 点击消息后跳转的链接（可选）
 */
export async function sendWechatTemplateMessage(
    openid: string,
    templateId: string,
    data: WechatTemplateData,
    url?: string
): Promise<{ success: boolean; error?: string }> {
    try {
        if (!openid) {
            return { success: false, error: '用户未绑定微信，跳过通知' }
        }

        const accessToken = await getWechatAccessToken()

        const body: Record<string, any> = {
            touser: openid,
            template_id: templateId,
            data,
        }
        if (url) body.url = url

        const res = await fetch(
            `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        )

        const result = await res.json() as { errcode: number; errmsg: string; msgid?: number }

        if (result.errcode !== 0) {
            // errcode 43004 = 用户未关注公众号，属于正常情况不算错误
            if (result.errcode === 43004) {
                console.log('[WechatTemplate] User not subscribed, skip:', openid)
                return { success: false, error: '用户未关注公众号' }
            }
            console.error('[WechatTemplate] Send failed:', result)
            return { success: false, error: `微信API错误: ${result.errmsg}(${result.errcode})` }
        }

        console.log('[WechatTemplate] Sent successfully to:', openid, 'msgid:', result.msgid)
        return { success: true }

    } catch (err: any) {
        console.error('[WechatTemplate] Error:', err)
        return { success: false, error: err.message }
    }
}

// ============================================================
// 三种业务通知的构建函数（封装模板字段格式）
// ============================================================

/** 构建购买成功通知数据（使用「订单支付成功通知」模板）*/
export function buildPurchaseSuccessData(params: {
    orderNo: string
    productTitle: string
    totalAmount: number
    status?: string       // 订单状态：待充值 / 使用中 / 已完成（phrase类型，≤5字中文）
}): WechatTemplateData {
    return {
        character_string2: { value: String(params.orderNo || '').slice(0, 32), color: '#173177' },
        thing3: { value: String(params.productTitle || '商品').trim().slice(0, 20), color: '#173177' },
        phrase20: { value: String(params.status || '待发货').slice(0, 5), color: '#09BB07' },
        amount5: { value: `${params.totalAmount.toFixed(2)}元`, color: '#173177' },
    }
}

/** 构建订单发货通知数据 */
export function buildDispatchData(params: {
    orderNo: string
    productTitle: string
    totalAmount: number
    status: string
}): WechatTemplateData {
    return {
        character_string2: { value: String(params.orderNo || '').slice(0, 32), color: '#173177' },
        thing4: { value: String(params.productTitle || '商品').trim().slice(0, 20), color: '#173177' },
        amount8: { value: `${params.totalAmount.toFixed(2)}元`, color: '#173177' },
        phrase9: { value: String(params.status || '已发货').slice(0, 5), color: '#09BB07' },
    }
}

/** 构建充值成功通知数据 */
export function buildRechargeSuccessData(params: {
    amount: number
    bonus: number
    newBalance: number
}): WechatTemplateData {
    return {
        thing8: { value: '凡图拉', color: '#173177' },                           // 商户名称（thing类型，支持中文）
        amount5: { value: `${params.newBalance.toFixed(2)}元`, color: '#09BB07' }, // 当前余额
        amount3: { value: `${params.amount.toFixed(2)}元`, color: '#173177' },     // 充值金额
        amount4: { value: `${params.bonus.toFixed(2)}元`, color: '#173177' },      // 赠送金额
    }
}
