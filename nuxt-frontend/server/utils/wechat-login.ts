/**
 * 微信服务号登录工具库
 * 用于 PC 端扫码登录和移动端 OAuth 登录
 */
import crypto from 'crypto'
import { getWechatPayConfig } from './wechat-pay'

// Access Token 缓存
let accessTokenCache: { token: string; expiresAt: number } | null = null

/**
 * 获取微信公众号 Access Token (用于调用公众号 API)
 * 注意：这不是用户级的 access_token，是应用级的
 */
export async function getWechatAccessToken(): Promise<string> {
    // 检查缓存
    if (accessTokenCache && accessTokenCache.expiresAt > Date.now()) {
        return accessTokenCache.token
    }

    const config = getWechatPayConfig()
    if (!config.appid || !config.appSecret) {
        throw new Error('微信配置缺失: appid 或 appSecret')
    }

    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.appSecret}`

    const response = await fetch(url)
    const result = await response.json() as {
        access_token?: string
        expires_in?: number
        errcode?: number
        errmsg?: string
    }

    if (result.errcode) {
        console.error('[WechatLogin] Get access_token failed:', result)
        throw new Error(result.errmsg || '获取 access_token 失败')
    }

    // 缓存，提前 5 分钟过期
    accessTokenCache = {
        token: result.access_token!,
        expiresAt: Date.now() + (result.expires_in! - 300) * 1000,
    }

    return result.access_token!
}

/**
 * 创建带参数的临时二维码 (用于 PC 端扫码登录)
 * 扫码后微信会向配置的服务器推送事件
 */
export async function createParametricQrCode(sceneStr: string, expireSeconds: number = 300): Promise<{
    ticket: string
    url: string
    expireSeconds: number
}> {
    const accessToken = await getWechatAccessToken()

    const apiUrl = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${accessToken}`

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            expire_seconds: expireSeconds,
            action_name: 'QR_STR_SCENE',
            action_info: {
                scene: {
                    scene_str: sceneStr,
                },
            },
        }),
    })

    const result = await response.json() as {
        ticket?: string
        expire_seconds?: number
        url?: string
        errcode?: number
        errmsg?: string
    }

    if (result.errcode) {
        console.error('[WechatLogin] Create QR code failed:', result)
        throw new Error(result.errmsg || '创建二维码失败')
    }

    return {
        ticket: result.ticket!,
        url: result.url!,
        expireSeconds: result.expire_seconds!,
    }
}

/**
 * 根据 ticket 获取二维码图片 URL
 */
export function getQrCodeImageUrl(ticket: string): string {
    return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`
}

/**
 * 生成登录场景字符串
 */
export function generateLoginScene(): string {
    const timestamp = Date.now().toString(36)
    const random = crypto.randomBytes(8).toString('hex')
    return `login_${timestamp}_${random}`
}

/**
 * 解析微信推送的 XML 消息
 */
export function parseWechatEventXml(xml: string): Record<string, string> {
    const result: Record<string, string> = {}

    // 简单的 XML 解析（微信推送格式固定）
    const matches = xml.matchAll(/<(\w+)><!\[CDATA\[(.*?)\]\]><\/\1>|<(\w+)>(.*?)<\/\3>/g)

    for (const match of matches) {
        const key = match[1] || match[3]
        const value = match[2] || match[4]
        if (key && value !== undefined) {
            result[key] = value
        }
    }

    return result
}

/**
 * 生成微信绑定 Token (JWT-like，用于临时传递 OpenID)
 */
export function generateBindToken(openid: string, expiresInSeconds: number = 600): string {
    const config = getWechatPayConfig()
    const payload = {
        openid,
        exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
        iat: Math.floor(Date.now() / 1000),
    }

    const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url')
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')

    const data = `${header}.${payloadStr}`
    const signature = crypto
        .createHmac('sha256', config.apiV3Key || 'wechat_login_secret')
        .update(data)
        .digest('base64url')

    return `${data}.${signature}`
}

/**
 * 验证并解析绑定 Token
 */
export function verifyBindToken(token: string): { valid: boolean; openid?: string; error?: string } {
    try {
        const parts = token.split('.')
        if (parts.length !== 3) {
            return { valid: false, error: 'Invalid token format' }
        }

        const [header, payloadStr, signature] = parts
        const config = getWechatPayConfig()

        // 验证签名
        const expectedSig = crypto
            .createHmac('sha256', config.apiV3Key || 'wechat_login_secret')
            .update(`${header}.${payloadStr}`)
            .digest('base64url')

        if (signature !== expectedSig) {
            return { valid: false, error: 'Invalid signature' }
        }

        // 解析 payload
        const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString())

        // 检查过期
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            return { valid: false, error: 'Token expired' }
        }

        return { valid: true, openid: payload.openid }
    } catch (err) {
        return { valid: false, error: 'Token parse error' }
    }
}

/**
 * 获取微信用户信息 (包含 UnionID)
 */
export async function getWechatUserInfo(openid: string): Promise<{
    subscribe: number
    openid: string
    nickname: string
    sex: number
    language: string
    city: string
    province: string
    country: string
    headimgurl: string
    subscribe_time: number
    unionid?: string
    remark: string
    groupid: number
    tagid_list: number[]
    subscribe_scene: string
    qr_scene: number
    qr_scene_str: string
}> {
    const accessToken = await getWechatAccessToken()
    const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=zh_CN`

    const response = await fetch(url)
    const result = await response.json()
    console.log('[WechatLogin] Raw user info from WeChat:', JSON.stringify(result))

    if (result.errcode) {
        console.error('[WechatLogin] Get user info failed:', result)
        throw new Error(result.errmsg || '获取用户信息失败')
    }

    return result as any
}
