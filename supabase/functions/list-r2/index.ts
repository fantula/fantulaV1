import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { getR2Config, sha256, generateR2AuthHeaders } from "../_shared/r2-utils.ts"

/**
 * list-r2 Edge Function
 * 列出 Cloudflare R2 存储桶中的所有对象
 * 从环境变量读取配置（更安全）
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

    const queryParams = new URLSearchParams({
        'list-type': '2',
        'max-keys': '1000'
    })
    if (prefix) {
        queryParams.set('prefix', prefix)
    }
    const canonicalQueryString = queryParams.toString().split('&').sort().join('&')

    const canonicalUri = `/${bucketName}`
    const payloadHash = await sha256('')

    const { authorization, amzDate } = await generateR2AuthHeaders(
        method,
        bucketName,
        canonicalUri,
        canonicalQueryString,
        payloadHash,
        { accountId, accessKeyId, secretAccessKey, bucketName, publicBaseUrl: '' }
    )

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

    const xmlText = await response.text()
    const objects: R2Object[] = []

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
            throw new Error('权限不足：只允许后台管理员操作')
        }

        // 从环境变量读取 R2 配置
        const r2Config = getR2Config()

        let prefix = ''
        try {
            const body = await req.json()
            prefix = body.prefix || ''
        } catch {
            // No body, use default
        }

        const objects = await listR2Objects(
            r2Config.accountId,
            r2Config.accessKeyId,
            r2Config.secretAccessKey,
            r2Config.bucketName,
            prefix
        )

        const objectsWithUrl = objects.map(obj => ({
            ...obj,
            url: `${r2Config.publicBaseUrl}/${obj.key}`
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
