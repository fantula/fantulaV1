/**
 * 微信登录相关 API
 * PC端扫码登录 + 移动端 OAuth 登录
 */
import type { ApiResponse } from '@/types/api'
import { getSupabaseClient } from '@/utils/supabase'

const BASE_URL = '/api/wechat'

export interface QrCodeResult {
    sceneStr: string
    ticket: string
    qrcodeUrl: string
    expiresIn: number
}

export interface ScanStatus {
    status: 'waiting' | 'scanned' | 'need_bind' | 'logged_in' | 'expired' | 'bound'
    message: string
    bindToken?: string
    userId?: string
    email?: string
    nickname?: string
}

export interface OAuthResult {
    status: 'logged_in' | 'need_bind'
    message: string
    bindToken?: string
    userId?: string
    email?: string
    nickname?: string
    avatar?: string
    openid?: string
    actionLink?: string
}

export const wechatLoginApi = {
    /**
     * 获取微信扫码登录二维码（PC端用）
     */
    async getLoginQrCode(): Promise<ApiResponse<QrCodeResult>> {
        try {
            const response = await $fetch<{ success: boolean; data: QrCodeResult }>(
                `${BASE_URL}/login-qrcode`
            )
            return {
                code: 0,
                success: true,
                msg: 'success',
                data: response.data,
            }
        } catch (err: any) {
            return {
                code: 500,
                success: false,
                msg: err.data?.message || err.message || '获取二维码失败',
                data: undefined as any,
            }
        }
    },

    /**
     * 轮询扫码状态（PC端用）
     */
    async checkScanStatus(sceneStr: string): Promise<ApiResponse<ScanStatus>> {
        try {
            const response = await $fetch<{ success: boolean; data: ScanStatus }>(
                `${BASE_URL}/check-scan`,
                { query: { scene: sceneStr } }
            )
            return {
                code: 0,
                success: true,
                msg: 'success',
                data: response.data,
            }
        } catch (err: any) {
            return {
                code: 500,
                success: false,
                msg: err.data?.message || err.message || '查询状态失败',
                data: undefined as any,
            }
        }
    },

    /**
     * 移动端微信 OAuth 登录
     */
    async oauthLogin(code: string): Promise<ApiResponse<OAuthResult>> {
        try {
            const response = await $fetch<{ success: boolean; data: OAuthResult }>(
                `${BASE_URL}/oauth-login`,
                {
                    method: 'POST',
                    body: { code },
                }
            )
            return {
                code: 0,
                success: true,
                msg: 'success',
                data: response.data,
            }
        } catch (err: any) {
            return {
                code: 500,
                success: false,
                msg: err.data?.message || err.message || '登录失败',
                data: undefined as any,
            }
        }
    },

    /**
     * 绑定微信到邮箱账号（配合 bindToken 使用）
     */
    async bindWechatToEmail(params: {
        bindToken: string
        email: string
        code: string
        password?: string
        nickname?: string
        avatar?: string
    }): Promise<ApiResponse<{ user: any; session: any }>> {
        try {
            const client = getSupabaseClient()
            const { data: { session } } = await client.auth.getSession()
            const token = session?.access_token

            const response = await $fetch<{ success: boolean; data: any; message: string }>(
                '/api/auth/bind-wechat',
                {
                    method: 'POST',
                    body: params,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            )
            return {
                code: 0,
                success: true,
                msg: response.message || '绑定成功',
                data: response.data,
            }
        } catch (err: any) {
            return {
                code: 500,
                success: false,
                msg: err.data?.message || err.message || '绑定失败',
                data: undefined as any,
            }
        }
    },

    /**
     * 已登录用户绑定微信（移动端 wechatCode 或 PC端 bindToken）
     */
    async bindWechatToAccount(params: { wechatCode?: string; bindToken?: string }): Promise<ApiResponse<{ openid: string }>> {
        try {
            const client = getSupabaseClient()
            const { data: { session } } = await client.auth.getSession()
            const token = session?.access_token

            const response = await $fetch<{ success: boolean; data: any; message: string }>(
                '/api/auth/bind-wechat',
                {
                    method: 'POST',
                    body: params,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }
            )
            return {
                code: 0,
                success: true,
                msg: response.message || '绑定成功',
                data: response.data,
            }
        } catch (err: any) {
            return {
                code: 500,
                success: false,
                msg: err.data?.message || err.message || '绑定失败',
                data: undefined as any,
            }
        }
    },

    /**
     * 生成微信 OAuth 授权 URL（移动端用）
     */
    getOAuthUrl(redirectUri: string, state: string = 'login'): string {
        const config = useRuntimeConfig()
        const appid = config.public.wechatAppid || ''
        const encodedUri = encodeURIComponent(redirectUri)
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodedUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    },
}
