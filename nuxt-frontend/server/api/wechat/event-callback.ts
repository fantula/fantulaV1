/**
 * POST /api/wechat/event-callback
 * 接收微信服务号推送的事件（扫码、关注等）
 * 
 * 微信服务器会以 XML 格式推送事件到此接口
 * 需要在微信公众平台配置此 URL
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import { parseWechatEventXml } from '~/server/utils/wechat-login'

export default defineEventHandler(async (event) => {
    const method = getMethod(event)

    // GET 请求：微信服务器验证 URL 有效性
    if (method === 'GET') {
        const query = getQuery(event)
        const echostr = query.echostr as string
        // 简单返回 echostr 完成验证
        // 生产环境应验证 signature
        console.log('[WechatCallback] URL verification, echostr:', echostr)
        return echostr || 'ok'
    }

    // POST 请求：处理微信推送的事件
    try {
        const rawBody = await readRawBody(event) || ''
        console.log('[WechatCallback] Received event:', rawBody.substring(0, 200))

        // 解析 XML
        const eventData = parseWechatEventXml(rawBody)
        console.log('[WechatCallback] Parsed event:', eventData)

        const msgType = eventData.MsgType
        const eventType = eventData.Event
        const fromUser = eventData.FromUserName // 用户 OpenID
        const eventKey = eventData.EventKey     // 场景值

        // 只处理扫码事件
        if (msgType !== 'event') {
            return 'success'
        }

        // SCAN: 已关注用户扫码
        // subscribe: 未关注用户扫码后关注
        if (eventType === 'SCAN' || eventType === 'subscribe') {
            // 从 EventKey 中提取场景字符串
            // subscribe 事件的 EventKey 格式为 "qrscene_xxx"
            let sceneStr = eventKey
            if (eventType === 'subscribe' && eventKey?.startsWith('qrscene_')) {
                sceneStr = eventKey.replace('qrscene_', '')
            }

            if (!sceneStr || !sceneStr.startsWith('login_')) {
                // 不是登录扫码，忽略
                console.log('[WechatCallback] Not a login scan, ignoring')
                return 'success'
            }

            console.log('[WechatCallback] Login scan detected:', { sceneStr, openid: fromUser })

            // 更新登录会话状态
            const supabase = getSupabaseServiceClient()
            const { error } = await supabase
                .from('wechat_login_sessions')
                .update({
                    openid: fromUser,
                    status: 'scanned',
                })
                .eq('scene_str', sceneStr)
                .eq('status', 'waiting') // 只更新等待中的会话

            if (error) {
                console.error('[WechatCallback] Update session failed:', error)
            } else {
                console.log('[WechatCallback] Session updated to scanned')
            }
        }

        // 必须返回 success，否则微信会重试
        return 'success'
    } catch (err: any) {
        console.error('[WechatCallback] Error:', err)
        // 仍然返回 success，避免微信重试
        return 'success'
    }
})
