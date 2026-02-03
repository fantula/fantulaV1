import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { getR2Config, hmacSha256, sha256, toHex, getSignatureKey } from "../_shared/r2-utils.ts"

/**
 * test-r2-connection Edge Function
 * 测试 R2 存储配置是否正确（从环境变量读取）
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
    const url = `${endpoint}/${bucketName}`
    const method = 'HEAD'

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\\d{3}/g, '')
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
                message: `连接成功！Bucket "${bucketName}" 可正常访问。配置来源：环境变量`
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
                message: `权限拒绝 (403)。请检查 Supabase Edge Function 环境变量配置。`,
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
            throw new Error(`无效的 Token: ${authError?.message || 'User missing'}`)
        }

        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            throw new Error('权限不足：只允许后台管理员测试连接')
        }

        // 从环境变量读取 R2 配置（不再从数据库或前端读取）
        const r2Config = getR2Config()

        const result = await testR2Connection(
            r2Config.accountId,
            r2Config.accessKeyId,
            r2Config.secretAccessKey,
            r2Config.bucketName
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
