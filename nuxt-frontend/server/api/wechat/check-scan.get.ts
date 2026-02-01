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
                // 已绑定用户，生成登录链接 (Magic Link)
                // 使用 Supabase Admin 生成一次性登录链接
                const { createClient } = await import('@supabase/supabase-js')
                const config = useRuntimeConfig()
                const supabaseAdmin = createClient(
                    config.public.supabaseUrl as string,
                    config.supabaseServiceKey as string
                )

                const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
                    type: 'magiclink',
                    email: profile.email
                })

                if (linkError || !linkData.properties?.action_link) {
                    console.error('[CheckScan] Generate link failed:', linkError)
                    console.error('[CheckScan] Link data:', JSON.stringify(linkData))
                    return {
                        success: true,
                        data: {
                            status: 'error',
                            message: '生成登录链接失败，请尝试其他登录方式',
                            error_detail: linkError?.message || 'action_link missing'
                        }
                    }
                }

                let actionLink = linkData.properties.action_link

                if (actionLink) {
                    try {
                        const publicSupabaseUrl = config.public.supabaseUrl as string
                        // Handle relative URLs (e.g. /auth/v1/verify...)
                        if (actionLink.startsWith('/')) {
                            if (publicSupabaseUrl) {
                                // Strip trailing slash from base and leading slash from path to avoid double //
                                const baseUrl = publicSupabaseUrl.replace(/\/$/, '')
                                const path = actionLink.replace(/^\//, '')
                                actionLink = `${baseUrl}/${path}`
                                console.log('[CheckScan] Fixed relative link to:', actionLink)
                            } else {
                                console.warn('[CheckScan] Relative link found but publicSupabaseUrl is missing')
                            }
                        }

                        let urlObj = new URL(actionLink)

                        // 1. Force fix base URL (Origin) if it's localhost or IP
                        if (publicSupabaseUrl && (urlObj.hostname.includes('localhost') || urlObj.hostname.includes('127.0.0.1'))) {
                            const supabaseUrlObj = new URL(publicSupabaseUrl)
                            urlObj.protocol = supabaseUrlObj.protocol
                            urlObj.host = supabaseUrlObj.host
                            console.log('[CheckScan] Fixed localhost base URL to:', urlObj.toString())
                        }

                        // 2. Force fix redirect_to parameter
                        const siteUrl = config.public.siteUrl || 'https://www.fantula.com'
                        urlObj.searchParams.set('redirect_to', siteUrl)

                        actionLink = urlObj.toString()
                        console.log('[CheckScan] Enforced Action Link:', actionLink)
                    } catch (e) {
                        console.warn('[CheckScan] Failed to fix link:', e)
                    }
                }

                return {
                    success: true,
                    data: {
                        status: 'logged_in',
                        message: '登录成功',
                        userId: profile.id,
                        email: profile.email,
                        nickname: profile.nickname,
                        action_link: actionLink
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
