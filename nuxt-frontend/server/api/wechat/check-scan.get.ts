/**
 * GET /api/wechat/check-scan
 * 轮询检查扫码状态（PC端用）
 */
import { getSupabaseServiceClient } from '~/server/utils/supabase'
import { generateBindToken } from '~/server/utils/wechat-login'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const sceneStr = query.scene as string

        if (!sceneStr) {
            throw createError({
                statusCode: 400,
                message: '缺少 scene 参数',
            })
        }

        const supabase = getSupabaseServiceClient()

        // 查询会话状态
        const { data: session, error } = await supabase
            .from('wechat_login_sessions')
            .select('*')
            .eq('scene_str', sceneStr)
            .single()

        if (error || !session) {
            return {
                success: true,
                data: {
                    status: 'expired',
                    message: '会话不存在或已过期',
                },
            }
        }

        // 检查是否过期
        if (new Date(session.expires_at) < new Date()) {
            return {
                success: true,
                data: {
                    status: 'expired',
                    message: '二维码已过期，请刷新',
                },
            }
        }

        // 状态：waiting - 等待扫码
        if (session.status === 'waiting') {
            return {
                success: true,
                data: {
                    status: 'waiting',
                    message: '等待扫码',
                },
            }
        }

        // 状态：scanned - 已扫码，需要检查用户是否已绑定
        if (session.status === 'scanned' && session.openid) {
            // 查询是否已有绑定的用户
            const { data: profile } = await supabase
                .from('profiles')
                .select('id, email, nickname')
                .eq('wechat_openid', session.openid)
                .single()

            if (profile) {
                // 已绑定用户，生成登录凭证
                // 这里需要通过 Supabase Auth 生成用户 token
                // 由于安全限制，我们返回一个标识让前端完成登录
                return {
                    success: true,
                    data: {
                        status: 'logged_in',
                        message: '登录成功',
                        userId: profile.id,
                        email: profile.email,
                        nickname: profile.nickname,
                    },
                }
            } else {
                // 未绑定用户，需要绑定邮箱
                const bindToken = generateBindToken(session.openid)
                return {
                    success: true,
                    data: {
                        status: 'need_bind',
                        message: '请绑定邮箱以完成登录',
                        bindToken,
                    },
                }
            }
        }

        // 状态：bound - 已完成绑定
        if (session.status === 'bound') {
            return {
                success: true,
                data: {
                    status: 'bound',
                    message: '绑定完成',
                },
            }
        }

        return {
            success: true,
            data: {
                status: session.status,
                message: '未知状态',
            },
        }
    } catch (err: any) {
        console.error('[CheckScan] Error:', err)
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || '查询状态失败',
        })
    }
})
