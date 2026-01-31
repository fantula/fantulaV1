/**
 * GET /api/wechat/login-qrcode
 * 生成微信扫码登录二维码（PC端用）
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import {
    createParametricQrCode,
    getQrCodeImageUrl,
    generateLoginScene,
} from '~/server/utils/wechat-login'

export default defineEventHandler(async (event) => {
    try {
        // 生成唯一的场景字符串
        const sceneStr = generateLoginScene()

        // 调用微信 API 创建带参二维码
        const qrResult = await createParametricQrCode(sceneStr, 300) // 5分钟有效

        // 保存到数据库，用于后续轮询和事件回调匹配
        const supabase = getSupabaseServiceClient()
        const expiresAt = new Date(Date.now() + 300 * 1000).toISOString()

        const { error: insertError } = await supabase
            .from('wechat_login_sessions')
            .insert({
                scene_str: sceneStr,
                ticket: qrResult.ticket,
                status: 'waiting',
                expires_at: expiresAt,
            })

        if (insertError) {
            console.error('[LoginQrCode] Insert session failed:', insertError)
            throw createError({
                statusCode: 500,
                message: '创建登录会话失败',
            })
        }

        // 返回二维码信息
        return {
            success: true,
            data: {
                sceneStr,
                ticket: qrResult.ticket,
                qrcodeUrl: getQrCodeImageUrl(qrResult.ticket),
                expiresIn: qrResult.expireSeconds,
            },
        }
    } catch (err: any) {
        console.error('[LoginQrCode] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '生成二维码失败',
        })
    }
})
