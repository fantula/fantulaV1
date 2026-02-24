import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { getR2Config, sha256, generateR2AuthHeaders } from "../_shared/r2-utils.ts"

/**
 * upload-r2 Edge Function
 * 使用原生 HTTP 请求上传到 Cloudflare R2 (S3 Compatible)
 * 从环境变量读取配置（更安全）
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

async function uploadToR2(
    accountId: string,
    accessKeyId: string,
    secretAccessKey: string,
    bucketName: string,
    fileName: string,
    fileContent: Uint8Array,
    contentType: string
) {
    const region = 'auto'
    const service = 's3'
    const endpoint = `https://${accountId}.r2.cloudflarestorage.com`
    const url = `${endpoint}/${bucketName}/${fileName}`
    const method = 'PUT'

    const canonicalUri = `/${bucketName}/${fileName}`
    const canonicalQueryString = ''
    const payloadHash = await sha256(fileContent)

    const { authorization, amzDate } = await generateR2AuthHeaders(
        method,
        bucketName,
        canonicalUri,
        canonicalQueryString,
        payloadHash,
        { accountId, accessKeyId, secretAccessKey, bucketName, publicBaseUrl: '' }
    )

    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': authorization,
            'x-amz-date': amzDate,
            'x-amz-content-sha256': payloadHash,
            'Content-Type': contentType,
        },
        body: fileContent
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`R2 Upload Failed: ${response.status} ${response.statusText} - ${text}`)
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

        // 2. 验证是否为后台管理员
        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            throw new Error('权限不足：只允许后台管理员上传文件')
        }

        // 3. 从环境变量读取 R2 配置（不再从数据库读取）
        const r2Config = getR2Config()

        // 4. 处理文件上传
        const formData = await req.formData()
        const file = formData.get('file') as File
        const folder = (formData.get('folder') as string) || 'uploads'

        if (!file) {
            throw new Error('请提供文件')
        }

        if (file.size > 10 * 1024 * 1024) throw new Error('文件大小不能超过 10MB')

        const ext = file.name.split('.').pop() || 'jpg'
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 8)
        const fileName = `${folder}/${timestamp}-${randomStr}.${ext}`

        const fileBuffer = await file.arrayBuffer()

        // 5. 上传到 R2
        await uploadToR2(
            r2Config.accountId,
            r2Config.accessKeyId,
            r2Config.secretAccessKey,
            r2Config.bucketName,
            fileName,
            new Uint8Array(fileBuffer),
            file.type
        )

        const publicUrl = `${r2Config.publicBaseUrl}/${fileName}`

        return new Response(
            JSON.stringify({
                success: true,
                url: publicUrl,
                fileName: fileName
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
