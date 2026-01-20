import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * test-r2-connection Edge Function
 * 测试 R2 存储配置是否正确
 * 尝试访问 Bucket 验证连接
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

async function testR2Connection(
    accountId: string,
    accessKeyId: string,
    secretAccessKey: string,
    bucketName: string
): Promise<{ success: boolean; message: string; details?: any }> {
    const region = 'auto'
    const service = 's3'
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`
    // 使用 HEAD 请求测试 Bucket 是否可访问
    const url = `${endpoint}/${bucketName}`
    const method = 'HEAD'

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
    const dateStamp = amzDate.slice(0, 8)

    const canonicalUri = `/${bucketName}`
    const canonicalQueryString = ''
    const payloadHash = await sha256('')

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

    const algorithm = 'AWS4-HMAC-SHA256'
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
    const stringToSign =
        `${algorithm}\n` +
        `${amzDate}\n` +
        `${credentialScope}\n` +
        `${await sha256(canonicalRequest)}`

    const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, service)
    const signature = toHex(await hmacSha256(signingKey, stringToSign))

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

        if (response.ok || response.status === 200) {
            return {
                success: true,
                message: `连接成功！Bucket "${bucketName}" 可正常访问。`
            }
        } else if (response.status === 404) {
            return {
                success: false,
                message: `Bucket "${bucketName}" 不存在，请检查存储桶名称。`,
                details: { status: response.status }
            }
        } else if (response.status === 403) {
            const text = await response.text()
            return {
                success: false,
                message: `权限拒绝 (403). 请截图发我: ${text}`,
                details: { status: response.status, body: text }
            }
        } else {
            const text = await response.text()
            return {
                success: false,
                message: `连接失败：${response.status} ${response.statusText}`,
                details: { status: response.status, body: text.slice(0, 200) }
            }
        }
    } catch (e: any) {
        return {
            success: false,
            message: `网络错误：${e.message}`,
            details: { error: e.message }
        }
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
            throw new Error(`无效的 Token: ${authError?.message || 'User missing'}`)
        }

        // 2. 验证是否为后台管理员
        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            throw new Error('权限不足：只允许后台管理员测试连接')
        }

        // 3. 读取 R2 配置 (优先从 Body 读取，支持测试未保存的配置)
        let config: Record<string, string> = {}

        try {
            const body = await req.json()
            if (body && typeof body === 'object') {
                config = body
            }
        } catch (e) {
            // Body may be empty or invalid json, ignore
        }

        // 如果 Body 中缺少关键配置，则尝试从数据库读取
        if (!config.R2_ACCOUNT_ID || !config.R2_ACCESS_KEY_ID || !config.R2_SECRET_ACCESS_KEY || !config.R2_BUCKET_NAME) {
            const { data: settingsData, error: settingsError } = await supabaseAdmin
                .from('system_settings')
                .select('key, value')
                .in('key', ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME'])

            if (!settingsError && settingsData) {
                const dbConfig: Record<string, string> = {}
                settingsData.forEach((item: any) => {
                    dbConfig[item.key] = item.value
                })
                // Merge: Body overrides DB, or DB fills missing Body
                config = { ...dbConfig, ...config }
            }
        }

        // [自动去空格] 防止复制粘贴时的意外空格导致 403
        for (const key in config) {
            if (typeof config[key] === 'string') {
                config[key] = config[key].trim()
            }
        }

        // 4. 验证配置完整性
        const missingFields: string[] = []
        if (!config.R2_ACCOUNT_ID) missingFields.push('Cloudflare 账号 ID')
        if (!config.R2_ACCESS_KEY_ID) missingFields.push('Access Key ID')
        if (!config.R2_SECRET_ACCESS_KEY) missingFields.push('Secret Access Key')
        if (!config.R2_BUCKET_NAME) missingFields.push('存储桶名称')

        if (missingFields.length > 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: `配置不完整，缺少：${missingFields.join('、')}`
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
            )
        }

        // 5. 测试连接
        const result = await testR2Connection(
            config.R2_ACCOUNT_ID,
            config.R2_ACCESS_KEY_ID,
            config.R2_SECRET_ACCESS_KEY,
            config.R2_BUCKET_NAME
        )

        return new Response(
            JSON.stringify(result),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )

    } catch (err: any) {
        console.error(err)
        return new Response(
            JSON.stringify({ success: false, message: err.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        )
    }
})
