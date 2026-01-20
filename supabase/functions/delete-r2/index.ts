import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * delete-r2 Edge Function
 * 从 Cloudflare R2 删除文件
 * 使用 AWS Signature V4 发送 DELETE 请求
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// AWS Signature V4 Helpers
async function hmacSha256(key: ArrayBuffer, message: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    )
    return await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
}

async function sha256(message: string): Promise<string> {
    const data = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

function toHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

async function getSignatureKey(secretKey: string, dateStamp: string, region: string, service: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const kDate = await hmacSha256(encoder.encode('AWS4' + secretKey), dateStamp)
    const kRegion = await hmacSha256(kDate, region)
    const kService = await hmacSha256(kRegion, service)
    const kSigning = await hmacSha256(kService, 'aws4_request')
    return kSigning
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

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
    const dateStamp = amzDate.slice(0, 8)

    // Canonical Request
    const canonicalUri = `/${bucketName}/${fileName}`
    const canonicalQueryString = ''
    const payloadHash = await sha256('') // 空 payload

    const canonicalHeaders =
        `host:${accountId}.r2.cloudflarestorage.com\n` +
        `x-amz-content-sha256:${payloadHash}\n` +
        `x-amz-date:${amzDate}\n`

    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'

    const canonicalRequest =
        `${method}\n` +
        `${canonicalUri}\n` +
        `${canonicalQueryString}\n` +
        `${canonicalHeaders}\n` +
        `${signedHeaders}\n` +
        `${payloadHash}`

    // String to Sign
    const algorithm = 'AWS4-HMAC-SHA256'
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
    const stringToSign =
        `${algorithm}\n` +
        `${amzDate}\n` +
        `${credentialScope}\n` +
        `${await sha256(canonicalRequest)}`

    // Signature
    const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, service)
    const signature = toHex(await hmacSha256(signingKey, stringToSign))

    // Authorization Header
    const authorization =
        `${algorithm} Credential=${accessKeyId}/${credentialScope}, ` +
        `SignedHeaders=${signedHeaders}, ` +
        `Signature=${signature}`

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': authorization,
                'x-amz-date': amzDate,
                'x-amz-content-sha256': payloadHash,
            }
        })

        // R2 返回 204 No Content 表示成功删除
        // 404 表示文件不存在，也视为"成功"（幂等删除）
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
        // 1. 验证用户 Authentication
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('未授权访问')
        }

        // 初始化 Supabase 客户端
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false } }
        )

        // 验证 Token
        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
        if (authError || !user) {
            throw new Error('无效的 Token')
        }

        // 2. 严格验证是否为后台管理员
        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            throw new Error('权限不足：只允许后台管理员删除文件')
        }

        // 3. 读取 R2 配置
        const { data: settingsData, error: settingsError } = await supabaseAdmin
            .from('system_settings')
            .select('key, value')
            .in('key', ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME'])

        if (settingsError || !settingsData) {
            throw new Error('读取系统配置失败')
        }

        const config: Record<string, string> = {}
        settingsData.forEach((item: any) => {
            config[item.key] = item.value
        })

        if (!config.R2_ACCOUNT_ID || !config.R2_ACCESS_KEY_ID || !config.R2_SECRET_ACCESS_KEY) {
            throw new Error('系统尚未配置 R2 存储信息')
        }

        // 4. 解析请求体
        const body = await req.json()
        const paths: string[] = body.paths || []

        if (paths.length === 0) {
            return new Response(
                JSON.stringify({ success: true, deleted: 0, message: '没有要删除的文件' }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
            )
        }

        // 5. 批量删除
        const results: { path: string; success: boolean; error?: string }[] = []
        for (const path of paths) {
            const result = await deleteFromR2(
                config.R2_ACCOUNT_ID,
                config.R2_ACCESS_KEY_ID,
                config.R2_SECRET_ACCESS_KEY,
                config.R2_BUCKET_NAME || 'fantula2601',
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
