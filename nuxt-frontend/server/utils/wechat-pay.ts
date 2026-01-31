/**
 * 微信支付 APIv3 工具库
 * 用于 Nuxt Server API (Node.js)
 */
import crypto from 'crypto'

// 微信支付配置
export interface WechatPayConfig {
    mchid: string           // 商户号
    appid: string          // 公众号/小程序 AppID
    apiV3Key: string       // APIv3 密钥
    privateKey: string     // 商户私钥 (PEM 格式)
    serialNo: string       // 证书序列号
    notifyUrl: string      // 回调通知地址
    appSecret?: string     // 公众号 AppSecret (JSAPI需要)
}

// 从环境变量获取配置
export function getWechatPayConfig(): WechatPayConfig {
    const config = useRuntimeConfig()

    // 私钥可能包含转义的换行符 \n，需要转换为真实换行符
    const privateKeyRaw = String(config.wechatPayPrivateKey || '')
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n')

    return {
        mchid: String(config.wechatPayMchid || ''),
        appid: String(config.wechatPayAppid || ''),
        apiV3Key: String(config.wechatPayApiV3Key || ''),
        privateKey: privateKey,
        serialNo: String(config.wechatPaySerialNo || ''),
        notifyUrl: String(config.wechatPayNotifyUrl || 'https://www.fantula.com/api/wechat/notify'),
        appSecret: String(config.wechatAppSecret || ''),
    }
}

// 生成随机字符串
export function generateNonceStr(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const randomBytes = crypto.randomBytes(length)
    for (let i = 0; i < length; i++) {
        result += chars[randomBytes[i] % chars.length]
    }
    return result
}

// 获取当前时间戳（秒）
export function getTimestamp(): number {
    return Math.floor(Date.now() / 1000)
}

// 使用私钥签名 (Node.js crypto)
function signWithPrivateKey(message: string, privateKeyPem: string): string {
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(message)
    sign.end()
    return sign.sign(privateKeyPem, 'base64')
}

// 生成微信支付 Authorization 请求头
export function buildAuthHeader(
    method: string,
    url: string,
    body: string,
    config: WechatPayConfig
): string {
    const timestamp = getTimestamp()
    const nonceStr = generateNonceStr()

    // 构建签名串
    const signMessage = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${body}\n`

    const signature = signWithPrivateKey(signMessage, config.privateKey)

    // 构建 Authorization 头
    return `WECHATPAY2-SHA256-RSA2048 mchid="${config.mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.serialNo}"`
}

// 解密回调通知数据 (AES-256-GCM)
export function decryptCallback(
    ciphertext: string,
    nonce: string,
    associatedData: string,
    apiV3Key: string
): string {
    // Base64 解码密文
    const ciphertextBuffer = Buffer.from(ciphertext, 'base64')

    // AES-256-GCM 解密
    // 密文最后16字节是 auth tag
    const authTag = ciphertextBuffer.slice(-16)
    const encryptedData = ciphertextBuffer.slice(0, -16)

    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(apiV3Key),
        Buffer.from(nonce)
    )
    decipher.setAuthTag(authTag)
    decipher.setAAD(Buffer.from(associatedData))

    const decrypted = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final()
    ])

    return decrypted.toString('utf8')
}

// 验证微信支付回调签名
export function verifyCallbackSignature(
    timestamp: string,
    nonce: string,
    body: string,
    signature: string,
    wechatPublicKey: string
): boolean {
    // 构建验签串
    const message = `${timestamp}\n${nonce}\n${body}\n`

    // TODO: 实现完整的验签逻辑（需要获取微信平台证书）
    // 可以通过调用 GET /v3/certificates 获取
    console.log('[Verify] Message to verify:', message.substring(0, 50) + '...')

    // 暂时返回 true，生产环境需要完善
    return true
}

// 发起微信支付 API 请求
export async function wechatPayRequest<T>(
    method: 'GET' | 'POST',
    path: string,
    body: object | null,
    config: WechatPayConfig
): Promise<T> {
    const baseUrl = 'https://api.mch.weixin.qq.com'
    const url = baseUrl + path
    const bodyString = body ? JSON.stringify(body) : ''

    const authorization = buildAuthHeader(method, path, bodyString, config)

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization,
    }

    const options: RequestInit = {
        method,
        headers,
    }

    if (body && method === 'POST') {
        options.body = bodyString
    }

    console.log(`[WechatPay] ${method} ${path}`)

    const response = await fetch(url, options)
    const responseText = await response.text()

    if (!response.ok) {
        console.error('[WechatPay] Error response:', responseText)
        throw new Error(`WeChat Pay API error: ${response.status} - ${responseText}`)
    }

    return JSON.parse(responseText) as T
}

// 生成商户订单号
export function generateOutTradeNo(prefix: string = 'FTL'): string {
    const now = new Date()
    const dateStr = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
    const random = generateNonceStr(6)
    return `${prefix}${dateStr}${random}`
}

// 生成 JSAPI 支付签名 (前端调起支付用)
export function generateJsapiPaySign(
    appId: string,
    timeStamp: string,
    nonceStr: string,
    prepayId: string,
    privateKey: string
): string {
    const signMessage = `${appId}\n${timeStamp}\n${nonceStr}\nprepay_id=${prepayId}\n`
    return signWithPrivateKey(signMessage, privateKey)
}
