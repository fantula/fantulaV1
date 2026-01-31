import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { getWechatPayConfig } from "../_shared/wechat-pay-utils.ts"

/**
 * POST /wechat-get-openid
 * 通过授权 code 获取用户 OpenID
 * 
 * 请求参数:
 * - code: string (微信授权回调的 code)
 * 
 * 返回:
 * - openid: 用户的 OpenID
 */

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
}

interface WechatOAuthResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    openid: string
    scope: string
    errcode?: number
    errmsg?: string
}

Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders })
    }

    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Method not allowed" }),
            { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }

    try {
        // 验证用户身份
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "未登录" }),
                { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        const supabaseUrl = Deno.env.get("SUPABASE_URL")!
        const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!
        const supabase = createClient(supabaseUrl, supabaseAnonKey, {
            global: { headers: { Authorization: authHeader } }
        })

        // 获取当前用户
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) {
            return new Response(
                JSON.stringify({ error: "用户认证失败" }),
                { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 解析请求参数
        const { code } = await req.json()

        if (!code) {
            return new Response(
                JSON.stringify({ error: "缺少授权 code" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 获取配置
        const config = getWechatPayConfig()
        const appSecret = Deno.env.get('WECHAT_APP_SECRET')

        if (!appSecret) {
            console.error('[GetOpenID] Missing WECHAT_APP_SECRET')
            return new Response(
                JSON.stringify({ error: "配置错误，请联系管理员" }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        // 调用微信 OAuth 接口获取 OpenID
        const oauthUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appid}&secret=${appSecret}&code=${code}&grant_type=authorization_code`

        console.log('[GetOpenID] Fetching OpenID for code:', code.substring(0, 10) + '...')

        const response = await fetch(oauthUrl)
        const data: WechatOAuthResponse = await response.json()

        if (data.errcode) {
            console.error('[GetOpenID] WeChat OAuth error:', data)
            return new Response(
                JSON.stringify({ error: data.errmsg || '获取 OpenID 失败' }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            )
        }

        console.log('[GetOpenID] Got OpenID:', data.openid)

        // 可选：将 OpenID 保存到用户资料中
        const supabaseService = createClient(
            supabaseUrl,
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        )

        await supabaseService
            .from('profiles')
            .update({
                wechat_openid: data.openid,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)

        return new Response(
            JSON.stringify({
                success: true,
                data: {
                    openid: data.openid,
                }
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )

    } catch (err) {
        console.error('[GetOpenID] Error:', err)
        return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "获取 OpenID 失败" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        )
    }
})
