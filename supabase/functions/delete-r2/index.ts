import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { getR2Config, sha256, generateR2AuthHeaders } from "../_shared/r2-utils.ts"

/**
 * delete-r2 Edge Function
 * 从 Cloudflare R2 删除文件
 * 从环境变量读取配置（更安全）
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

async function deleteFromR2(
    accountId: string,
    accessKeyId: string,
    secretAccessKey: string,
    bucketName: string,
    fileName: string
): Promise<{ success: boolean; error?: string }> {
    const region = 'auto'
    const service = 's3'
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`
    const url = `${endpoint}/${bucketName}/${fileName}`
    const method = 'DELETE'

    const canonicalUri = `/${bucketName}/${fileName}`
    const canonicalQueryString = ''
    const payloadHash = await sha256('')

    const { authorization, amzDate } = await generateR2AuthHeaders(
        method,
        bucketName,
        canonicalUri,
        canonicalQueryString,
        payloadHash,
        { accountId, accessKeyId, secretAccessKey, bucketName, publicBaseUrl: '' }
    )

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': authorization,
                'x-amz-date': amzDate,
                'x-amz-content-sha256': payloadHash,
            }
        })

        if (response.ok || response.status === 204 || response.status === 404) {
            return { success: true }
        } else {
            const text = await response.text()
            return { success: false, error: `R2 Delete Failed: ${response.status} - ${text}` }
        }
    } catch (e: any) {
        return { success: false, error: e.message }
    }
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('未授权访问')
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false } }
        )

        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
        if (authError || !user) {
            throw new Error('无效的 Token')
        }

        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            throw new Error('权限不足：只允许后台管理员删除文件')
        }

        // 从环境变量读取 R2 配置
        const r2Config = getR2Config()

        const body = await req.json()
        const paths: string[] = body.paths || []

        if (paths.length === 0) {
            return new Response(
                JSON.stringify({ success: true, deleted: 0, message: '没有要删除的文件' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
            )
        }

        const results: { path: string; success: boolean; error?: string }[] = []
        for (const path of paths) {
            const result = await deleteFromR2(
                r2Config.accountId,
                r2Config.accessKeyId,
                r2Config.secretAccessKey,
                r2Config.bucketName,
                path
            )
            results.push({ path, ...result })
        }

        const successCount = results.filter(r => r.success).length
        const failedPaths = results.filter(r => !r.success)

        return new Response(
            JSON.stringify({
                success: failedPaths.length === 0,
                deleted: successCount,
                failed: failedPaths
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (err: any) {
        console.error(err)
        return new Response(
            JSON.stringify({ error: err.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
