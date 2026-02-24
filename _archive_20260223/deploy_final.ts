import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// --- Inlined R2 Utils ---
export interface R2Config {
    accountId: string
    accessKeyId: string
    secretAccessKey: string
    bucketName: string
    publicBaseUrl: string
}

export function getR2Config(): R2Config {
    const accountId = Deno.env.get('R2_ACCOUNT_ID')
    const accessKeyId = Deno.env.get('R2_ACCESS_KEY_ID')
    const secretAccessKey = Deno.env.get('R2_SECRET_ACCESS_KEY')
    const bucketName = Deno.env.get('R2_BUCKET_NAME') || 'fantula2601'
    const publicBaseUrl = Deno.env.get('R2_PUBLIC_BASE_URL') || 'https://img.fantula.com'

    if (!accountId || !accessKeyId || !secretAccessKey) {
        throw new Error('R2_CRITICAL_MISSING: Please check Edge Function Secrets.')
    }

    return {
        accountId,
        accessKeyId,
        secretAccessKey,
        bucketName,
        publicBaseUrl
    }
}

// AWS V4 Signatures
export async function hmacSha256(key: ArrayBuffer, message: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
    return await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
}

export async function sha256(message: string | Uint8Array): Promise<string> {
    const data = typeof message === 'string' ? new TextEncoder().encode(message) : message
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function toHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function getSignatureKey(secretKey: string, dateStamp: string, region: string, service: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const kDate = await hmacSha256(encoder.encode('AWS4' + secretKey), dateStamp)
    const kRegion = await hmacSha256(kDate, region)
    const kService = await hmacSha256(kRegion, service)
    const kSigning = await hmacSha256(kService, 'aws4_request')
    return kSigning
}

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

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
    const dateStamp = amzDate.slice(0, 8)

    const payloadHash = await sha256(fileContent)
    const canonicalHeaders = `host:${accountId}.r2.cloudflarestorage.com\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date'
    const canonicalRequest = `${method}\n/${bucketName}/${fileName}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`

    const algorithm = 'AWS4-HMAC-SHA256'
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${await sha256(canonicalRequest)}`
    const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, service)
    const signature = toHex(await hmacSha256(signingKey, stringToSign))

    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
            'x-amz-date': amzDate,
            'x-amz-content-sha256': payloadHash,
            'Content-Type': contentType,
        },
        body: fileContent
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`R2_UPLOAD_ERROR: ${response.status} ${response.statusText} - ${text}`)
    }
}

Deno.serve(async (req) => {
    try {
        if (req.method === 'OPTIONS') {
            return new Response('ok', { headers: corsHeaders })
        }

        const authHeader = req.headers.get('Authorization')
        if (!authHeader) throw new Error('AUTH_MISSING: Authorization header missing')

        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        console.log(`Connecting to Supabase at ${supabaseUrl}`)

        const supabaseAdmin = createClient(
            supabaseUrl ?? '',
            supabaseServiceKey ?? '',
            { auth: { persistSession: false } }
        )

        const token = authHeader.replace('Bearer ', '')

        // Timeout check for getUser
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase Auth Timeout")), 8000))
        const authPromise = supabaseAdmin.auth.getUser(token)

        const { data: { user }, error: authError } = await Promise.race([authPromise, timeoutPromise]) as any

        if (authError || !user) {
            console.error("Auth Error:", authError)
            return new Response(JSON.stringify({
                error: `AUTH_INVALID: ${authError?.message || 'Unknown invalid token'}`,
                debug: 'AUTH_FAILED_FAST'
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 401
            })
        }

        const { data: adminUser, error: adminError } = await supabaseAdmin
            .from('admin_users')
            .select('id, status')
            .eq('auth_user_id', user.id)
            .eq('status', 'enabled')
            .single()

        if (adminError || !adminUser) {
            return new Response(JSON.stringify({
                error: 'AUTH_FORBIDDEN: Admin permissions required',
                debug: 'ADMIN_CHECK_FAILED'
            }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 403
            })
        }

        const r2Config = getR2Config()
        const formData = await req.formData().catch(e => { throw new Error(`FORM_PARSE_ERROR: ${e.message}`) })
        const file = formData.get('file') as File
        const folder = (formData.get('folder') as string) || 'uploads'

        if (!file) throw new Error('FILE_MISSING: No file provided')
        if (file.size > 10 * 1024 * 1024) throw new Error('FILE_TOO_LARGE: Max 10MB')

        const ext = file.name.split('.').pop() || 'jpg'
        const timestamp = Date.now()
        const randomStr = Math.random().toString(36).substring(2, 8)
        const fileName = `${folder}/${timestamp}-${randomStr}.${ext}`
        const fileBuffer = await file.arrayBuffer()

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

        return new Response(JSON.stringify({
            success: true,
            url: publicUrl,
            fileName: fileName
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200
        })

    } catch (err: any) {
        const errorMessage = err.message || 'Unknown Error'
        console.error("CRASH:", errorMessage)

        return new Response(JSON.stringify({
            error: errorMessage,
            stack: err.stack,
            debug: 'FINAL_HANDLER_ERROR'
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        })
    }
})
