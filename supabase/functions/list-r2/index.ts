import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * list-r2 Edge Function
 * 列出 Cloudflare R2 存储桶中的所有对象
 * 使用 AWS Signature V4 签名调用 S3 ListObjectsV2 API
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// AWS Signature V4 Helpers (复用自 upload-r2)
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

interface R2Object {
    key: string
    size: number
    lastModified: string
}

async function listR2Objects(
    accountId: string,
    accessKeyId: string,
    secretAccessKey: string,
    bucketName: string,
    prefix: string = ''
): Promise<R2Object[]> {
    const region = 'auto'
    const service = 's3'
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`
    const method = 'GET'

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
    const dateStamp = amzDate.slice(0, 8)

    // Query parameters for ListObjectsV2
    const queryParams = new URLSearchParams({
        'list-type': '2',
        'max-keys': '1000'
    })
    if (prefix) {
        queryParams.set('prefix', prefix)
    }
    const canonicalQueryString = queryParams.toString().split('&').sort().join('&')

    // Canonical Request
    const canonicalUri = `/${bucketName}`
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

    // Send Request
    const url = `${endpoint}/${bucketName}?${canonicalQueryString}`
    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': authorization,
            'x-amz-date': amzDate,
            'x-amz-content-sha256': payloadHash,
        }
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`R2 ListObjects Failed: ${response.status} ${response.statusText} - ${text}`)
    }

    // Parse XML response
    const xmlText = await response.text()
    const objects: R2Object[] = []

    // Simple XML parsing for Contents elements
    const contentsRegex = /<Contents>([\s\S]*?)<\/Contents>/g
    let match
    while ((match = contentsRegex.exec(xmlText)) !== null) {
        const content = match[1]
        const keyMatch = content.match(/<Key>(.*?)<\/Key>/)
        const sizeMatch = content.match(/<Size>(.*?)<\/Size>/)
        const lastModifiedMatch = content.match(/<LastModified>(.*?)<\/LastModified>/)

        if (keyMatch) {
            objects.push({
                key: keyMatch[1],
                size: sizeMatch ? parseInt(sizeMatch[1]) : 0,
                lastModified: lastModifiedMatch ? lastModifiedMatch[1] : ''
            })
        }
    }

    return objects
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

        // 2. 验证是否为后台管理员
        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            throw new Error('权限不足：只允许后台管理员操作')
        }

        // 3. 读取 R2 配置
        const { data: settingsData, error: settingsError } = await supabaseAdmin
            .from('system_settings')
            .select('key, value')
            .in('key', ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_BASE_URL'])

        if (settingsError || !settingsData) {
            throw new Error('读取系统配置失败')
        }

        const config: Record<string, string> = {}
        settingsData.forEach((item: any) => {
            config[item.key] = item.value
        })

        if (!config.R2_ACCOUNT_ID || !config.R2_ACCESS_KEY_ID || !config.R2_SECRET_ACCESS_KEY) {
            throw new Error('系统尚未配置 R2 存储信息，请先在对象存储管理中配置')
        }

        // 4. 获取请求参数
        let prefix = ''
        try {
            const body = await req.json()
            prefix = body.prefix || ''
        } catch {
            // No body, use default
        }

        // 5. 调用 R2 ListObjects
        const objects = await listR2Objects(
            config.R2_ACCOUNT_ID,
            config.R2_ACCESS_KEY_ID,
            config.R2_SECRET_ACCESS_KEY,
            config.R2_BUCKET_NAME || 'fantula2601',
            prefix
        )

        // 6. 添加完整 URL
        const baseUrl = config.R2_PUBLIC_BASE_URL || 'https://img.fantula.com'
        const objectsWithUrl = objects.map(obj => ({
            ...obj,
            url: `${baseUrl}/${obj.key}`
        }))

        return new Response(
            JSON.stringify({
                success: true,
                objects: objectsWithUrl,
                count: objectsWithUrl.length
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )

    } catch (err: any) {
        console.error(err)
        return new Response(
            JSON.stringify({ error: err.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
