/**
 * R2 配置工具 - 从环境变量读取（推荐）
 * 
 * 需要在 Supabase Dashboard > Settings > Edge Functions 中设置以下环境变量：
 * - R2_ACCOUNT_ID
 * - R2_ACCESS_KEY_ID
 * - R2_SECRET_ACCESS_KEY
 * - R2_BUCKET_NAME
 * - R2_PUBLIC_BASE_URL
 */

export interface R2Config {
    accountId: string
    accessKeyId: string
    secretAccessKey: string
    bucketName: string
    publicBaseUrl: string
}

/**
 * 从环境变量获取 R2 配置
 * 如果环境变量未设置，抛出明确错误
 */
export function getR2Config(): R2Config {
    const accountId = Deno.env.get('R2_ACCOUNT_ID')
    const accessKeyId = Deno.env.get('R2_ACCESS_KEY_ID')
    const secretAccessKey = Deno.env.get('R2_SECRET_ACCESS_KEY')
    const bucketName = Deno.env.get('R2_BUCKET_NAME') || 'fantula2601'
    const publicBaseUrl = Deno.env.get('R2_PUBLIC_BASE_URL') || 'https://img.fantula.com'

    if (!accountId || !accessKeyId || !secretAccessKey) {
        throw new Error('R2 配置未设置。请在 Supabase Dashboard > Settings > Edge Functions 中配置环境变量')
    }

    return {
        accountId,
        accessKeyId,
        secretAccessKey,
        bucketName,
        publicBaseUrl
    }
}

// ============================================
// AWS Signature V4 工具函数（复用）
// ============================================

export async function hmacSha256(key: ArrayBuffer, message: string): Promise<ArrayBuffer> {
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

export async function sha256(message: string | Uint8Array): Promise<string> {
    const data = typeof message === 'string' ? new TextEncoder().encode(message) : message
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

export function toHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

export async function getSignatureKey(secretKey: string, dateStamp: string, region: string, service: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder()
    const kDate = await hmacSha256(encoder.encode('AWS4' + secretKey), dateStamp)
    const kRegion = await hmacSha256(kDate, region)
    const kService = await hmacSha256(kRegion, service)
    const kSigning = await hmacSha256(kService, 'aws4_request')
    return kSigning
}

// ============================================
// AWS Signature V4 认证头生成库 (Shared Helper)
// ============================================

export async function generateR2AuthHeaders(
    method: string,
    bucketName: string,
    canonicalUri: string, // e.g., '/' + bucketName or '/' + bucketName + '/' + fileName
    canonicalQueryString: string,
    payloadHash: string,
    r2Config: R2Config
): Promise<{ authorization: string; amzDate: string }> {
    const region = 'auto'
    const service = 's3'

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
    const dateStamp = amzDate.slice(0, 8)

    const canonicalHeaders =
        `host:${r2Config.accountId}.r2.cloudflarestorage.com\n` +
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

    const signingKey = await getSignatureKey(r2Config.secretAccessKey, dateStamp, region, service)
    const signature = toHex(await hmacSha256(signingKey, stringToSign))

    const authorization =
        `${algorithm} Credential=${r2Config.accessKeyId}/${credentialScope}, ` +
        `SignedHeaders=${signedHeaders}, ` +
        `Signature=${signature}`

    return { authorization, amzDate }
}
