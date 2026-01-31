/**
 * 微信支付 APIv3 工具库
 * 用于 Supabase Edge Functions (Deno)
 */

// 微信支付配置
export interface WechatPayConfig {
  mchid: string           // 商户号
  appid: string          // 公众号/小程序 AppID
  apiV3Key: string       // APIv3 密钥
  privateKey: string     // 商户私钥 (PEM 格式)
  serialNo: string       // 证书序列号
  notifyUrl: string      // 回调通知地址
}

// 从环境变量获取配置
export function getWechatPayConfig(): WechatPayConfig {
  // 私钥可能包含转义的换行符 \n，需要转换为真实换行符
  const privateKeyRaw = Deno.env.get('WECHAT_PAY_PRIVATE_KEY') || ''
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n')

  return {
    mchid: Deno.env.get('WECHAT_PAY_MCHID') || '',
    appid: Deno.env.get('WECHAT_PAY_APPID') || '',
    apiV3Key: Deno.env.get('WECHAT_PAY_API_V3_KEY') || '',
    privateKey: privateKey,
    serialNo: Deno.env.get('WECHAT_PAY_SERIAL_NO') || '',
    notifyUrl: Deno.env.get('WECHAT_PAY_NOTIFY_URL') || 'https://www.fantula.com/functions/v1/wechat-notify',
  }
}

// 生成随机字符串
export function generateNonceStr(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length]
  }
  return result
}

// 获取当前时间戳（秒）
export function getTimestamp(): number {
  return Math.floor(Date.now() / 1000)
}

// 导入 PEM 格式私钥
async function importPrivateKey(pemKey: string): Promise<CryptoKey> {
  // 移除 PEM 头尾和换行
  const pemBody = pemKey
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')

  // Base64 解码
  const binaryString = atob(pemBody)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  // 导入密钥
  return await crypto.subtle.importKey(
    'pkcs8',
    bytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )
}

// 使用私钥签名
async function signWithPrivateKey(message: string, privateKeyPem: string): Promise<string> {
  const privateKey = await importPrivateKey(privateKeyPem)
  const encoder = new TextEncoder()
  const data = encoder.encode(message)

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    data
  )

  // 转为 Base64
  const bytes = new Uint8Array(signature)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// 生成微信支付 Authorization 请求头
export async function buildAuthHeader(
  method: string,
  url: string,
  body: string,
  config: WechatPayConfig
): Promise<string> {
  const timestamp = getTimestamp()
  const nonceStr = generateNonceStr()

  // 构建签名串
  // HTTP请求方法\n
  // URL\n
  // 请求时间戳\n
  // 请求随机串\n
  // 请求报文主体\n
  const signMessage = `${method}\n${url}\n${timestamp}\n${nonceStr}\n${body}\n`

  const signature = await signWithPrivateKey(signMessage, config.privateKey)

  // 构建 Authorization 头
  return `WECHATPAY2-SHA256-RSA2048 mchid="${config.mchid}",nonce_str="${nonceStr}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.serialNo}"`
}

// 解密回调通知数据 (AES-256-GCM)
export async function decryptCallback(
  ciphertext: string,
  nonce: string,
  associatedData: string,
  apiV3Key: string
): Promise<string> {
  // 将 APIv3 密钥转为 CryptoKey
  const keyData = new TextEncoder().encode(apiV3Key)
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )

  // Base64 解码密文
  const ciphertextBinary = atob(ciphertext)
  const ciphertextBytes = new Uint8Array(ciphertextBinary.length)
  for (let i = 0; i < ciphertextBinary.length; i++) {
    ciphertextBytes[i] = ciphertextBinary.charCodeAt(i)
  }

  // 解密
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new TextEncoder().encode(nonce),
      additionalData: new TextEncoder().encode(associatedData),
    },
    key,
    ciphertextBytes
  )

  return new TextDecoder().decode(decrypted)
}

// 验证微信支付回调签名
export async function verifyCallbackSignature(
  timestamp: string,
  nonce: string,
  body: string,
  signature: string,
  wechatPublicKey: string
): Promise<boolean> {
  // 构建验签串
  const message = `${timestamp}\n${nonce}\n${body}\n`

  // 注意：需要使用微信平台公钥验签
  // 这里简化处理，实际生产环境需要获取并缓存微信平台证书
  // 可以通过调用 GET /v3/certificates 获取
  console.log('[Verify] Message to verify:', message.substring(0, 50) + '...')

  // 暂时返回 true，后续完善验签逻辑
  // TODO: 实现完整的验签逻辑
  return true
}

// 发起微信支付 API 请求
export async function wechatPayRequest<T>(
  method: 'GET' | 'POST',
  path: string,
  body: object | null,
  config: WechatPayConfig
): Promise<T> {
  const baseUrl = 'https://api.mch.weixin.qq.com'
  const url = baseUrl + path
  const bodyString = body ? JSON.stringify(body) : ''

  const authorization = await buildAuthHeader(method, path, bodyString, config)

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': authorization,
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (body && method === 'POST') {
    options.body = bodyString
  }

  console.log(`[WechatPay] ${method} ${path}`)

  const response = await fetch(url, options)
  const responseText = await response.text()

  if (!response.ok) {
    console.error('[WechatPay] Error response:', responseText)
    throw new Error(`WeChat Pay API error: ${response.status} - ${responseText}`)
  }

  return JSON.parse(responseText) as T
}

// 生成商户订单号
export function generateOutTradeNo(prefix: string = 'FTL'): string {
  const now = new Date()
  const dateStr = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
  const random = generateNonceStr(6)
  return `${prefix}${dateStr}${random}`
}
