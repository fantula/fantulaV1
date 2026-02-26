/**
 * 支付宝 OpenAPI 工具库
 * 用于 Nuxt Server API (Node.js)
 * 签名算法: RSA2 (SHA256WithRSA)
 */
import crypto from 'crypto'

export interface AlipayConfig {
    appId: string
    privateKey: string       // PKCS8 格式，纯 base64 内容（无头尾标记）
    alipayPublicKey: string  // 支付宝公钥，纯 base64 内容
    notifyUrl: string        // 异步回调地址
    gateway: string          // 支付宝网关地址
}

// 从环境变量获取配置
export function getAlipayConfig(): AlipayConfig {
    const config = useRuntimeConfig()
    return {
        appId: String(config.alipayAppId || ''),
        privateKey: String(config.alipayPrivateKey || ''),
        alipayPublicKey: String(config.alipayPublicKey || ''),
        notifyUrl: String(config.alipayNotifyUrl || 'https://www.fantula.com/api/alipay/notify'),
        gateway: 'https://openapi.alipay.com/gateway.do',
    }
}

// 生成商户订单号
export function generateAlipayOrderNo(prefix: string = 'ALI'): string {
    const now = new Date()
    const dateStr = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `${prefix}${dateStr}${random}`
}

// 获取上海时间戳字符串 "YYYY-MM-DD HH:mm:ss"
function getAlipayTimestamp(): string {
    const now = new Date()
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000
    const shanghaiTime = new Date(utcTime + 8 * 60 * 60 * 1000)
    const Y = shanghaiTime.getFullYear()
    const M = String(shanghaiTime.getMonth() + 1).padStart(2, '0')
    const D = String(shanghaiTime.getDate()).padStart(2, '0')
    const h = String(shanghaiTime.getHours()).padStart(2, '0')
    const m = String(shanghaiTime.getMinutes()).padStart(2, '0')
    const s = String(shanghaiTime.getSeconds()).padStart(2, '0')
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

// 将纯 base64 私钥包装为 PKCS8 PEM 格式
function wrapPrivateKey(key: string): string {
    const cleaned = key.replace(/-----[A-Z ]+-----/g, '').replace(/[\r\n\s]/g, '')
    const formatted = cleaned.match(/.{1,64}/g)!.join('\n')
    return `-----BEGIN PRIVATE KEY-----\n${formatted}\n-----END PRIVATE KEY-----`
}

// 将纯 base64 公钥包装为 PEM 格式
function wrapPublicKey(key: string): string {
    const cleaned = key.replace(/-----[A-Z ]+-----/g, '').replace(/[\r\n\s]/g, '')
    const formatted = cleaned.match(/.{1,64}/g)!.join('\n')
    return `-----BEGIN PUBLIC KEY-----\n${formatted}\n-----END PUBLIC KEY-----`
}

// 构建待签名字符串（参数按字典序排列，仅排除 sign 本身，sign_type 需保留）
function buildSignString(params: Record<string, string>): string {
    return Object.keys(params)
        .filter(k => k !== 'sign' && params[k] !== '' && params[k] !== undefined)
        .sort()
        .map(k => `${k}=${params[k]}`)
        .join('&')
}

// RSA2 签名
function signWithRSA2(content: string, privateKey: string): string {
    const pem = wrapPrivateKey(privateKey)
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(content, 'utf8')
    return sign.sign(pem, 'base64')
}

// 验证支付宝回调签名
export function verifyAlipaySign(params: Record<string, string>, alipayPublicKey: string): boolean {
    const sign = params.sign
    if (!sign) return false

    const content = buildSignString(params)
    const pem = wrapPublicKey(alipayPublicKey)

    try {
        const verify = crypto.createVerify('RSA-SHA256')
        verify.update(content, 'utf8')
        return verify.verify(pem, sign, 'base64')
    } catch (e) {
        console.error('[Alipay] Signature verification error:', e)
        return false
    }
}

// 构建基础公共参数
function buildBaseParams(method: string, config: AlipayConfig): Record<string, string> {
    return {
        app_id: config.appId,
        method: method,
        format: 'JSON',
        charset: 'utf-8',
        sign_type: 'RSA2',
        timestamp: getAlipayTimestamp(),
        version: '1.0',
    }
}

// 发起支付宝服务端 API 请求（alipay.trade.precreate / alipay.trade.query 等）
export async function alipayRequest(
    method: string,
    bizContent: object,
    config: AlipayConfig,
    extraParams: Record<string, string> = {}
): Promise<any> {
    const params: Record<string, string> = {
        ...buildBaseParams(method, config),
        notify_url: config.notifyUrl,
        biz_content: JSON.stringify(bizContent),
        ...extraParams,
    }

    const signContent = buildSignString(params)
    params.sign = signWithRSA2(signContent, config.privateKey)

    const formBody = Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')

    console.log(`[Alipay] ${method}`)

    const response = await fetch(config.gateway, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: formBody,
    })

    const responseText = await response.text()
    const json = JSON.parse(responseText)

    // 响应数据 key 格式: alipay_trade_precreate_response
    const responseKey = method.replace(/\./g, '_') + '_response'
    const data = json[responseKey]

    if (!data) {
        throw new Error(`Alipay API: unexpected response format`)
    }

    if (data.code !== '10000') {
        throw new Error(data.sub_msg || data.msg || `Alipay error: ${data.code}`)
    }

    return data
}

// 构建 H5 手机网站支付跳转 URL（前端直接跳转，无需服务端请求）
export function buildH5PayUrl(
    bizContent: object,
    returnUrl: string,
    config: AlipayConfig
): string {
    const params: Record<string, string> = {
        ...buildBaseParams('alipay.trade.wap.pay', config),
        notify_url: config.notifyUrl,
        return_url: returnUrl,
        biz_content: JSON.stringify(bizContent),
    }

    const signContent = buildSignString(params)
    params.sign = signWithRSA2(signContent, config.privateKey)

    const queryString = Object.entries(params)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')

    return `${config.gateway}?${queryString}`
}
