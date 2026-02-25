import { getAuthToken, getEdgeFunctionsUrl } from './supabase'

/**
 * 上传进度回调类型
 */
export type UploadProgressCallback = (progress: number) => void

/**
 * 客户端图片压缩（Canvas API，无需额外依赖）
 * - 最大宽度 1200px（覆盖 PC / 移动端展示需求）
 * - 输出 WebP 格式，quality 0.82（视觉无损，体积降 60-80%）
 * - GIF 不压缩（保留动画）
 */
async function compressImage(file: File): Promise<File> {
    // GIF 不压缩（会丢失动画）
    if (file.type === 'image/gif') return file

    // 小于 200KB 不压缩
    if (file.size < 200 * 1024) return file

    return new Promise((resolve) => {
        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(url)

            const MAX_WIDTH = 1200
            let { width, height } = img

            // 不需要放大，只缩小
            if (width > MAX_WIDTH) {
                height = Math.round(height * (MAX_WIDTH / width))
                width = MAX_WIDTH
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')!
            ctx.drawImage(img, 0, 0, width, height)

            canvas.toBlob(
                (blob) => {
                    if (blob && blob.size < file.size) {
                        // 压缩有效，使用压缩后的文件
                        const compressed = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        })
                        if (import.meta.dev) {
                            console.log(`[compressImage] ${(file.size / 1024).toFixed(0)}KB → ${(compressed.size / 1024).toFixed(0)}KB (${Math.round((1 - compressed.size / file.size) * 100)}% saved)`)
                        }
                        resolve(compressed)
                    } else {
                        // 压缩后反而更大，保留原文件
                        resolve(file)
                    }
                },
                'image/webp',
                0.82
            )
        }

        img.onerror = () => {
            URL.revokeObjectURL(url)
            resolve(file) // 压缩失败则原样上传
        }

        img.src = url
    })
}

/**
 * 上传图片到 Cloudflare R2（通过 Edge Function）
 * 自动压缩：最大 1200px 宽，WebP 格式，quality 0.82
 * @param file 要上传的图片文件
 * @param folder 存储目录，默认 'uploads'
 * @param onProgress 可选的进度回调，参数为 0-100 的百分比
 * @returns 上传结果，包含公开 URL
 */
export async function uploadImageToStorage(
    file: File,
    folder: string = 'uploads',
    onProgress?: UploadProgressCallback,
    token?: string
): Promise<{
    success: boolean
    url?: string
    error?: string
}> {
    try {
        // ... (file validation stays same)

        // 验证文件类型
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            return {
                success: false,
                error: '只支持 JPG、PNG、GIF、WebP 格式的图片'
            }
        }

        // 验证文件大小（10MB，与后端一致）
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
            return {
                success: false,
                error: '图片大小不能超过 10MB'
            }
        }

        // 获取认证 Token
        // 优先使用传入的 token，否则尝试从通用工具获取 (可能为 null)
        const finalToken = token || await getAuthToken()

        if (!finalToken) {
            return {
                success: false,
                error: '请先登录'
            }
        }

        // 上传前自动压缩（最大 1200px，WebP，quality 0.82）
        file = await compressImage(file)

        // 构建 FormData
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        // 如果提供了进度回调，使用 XMLHttpRequest 以支持进度事件
        if (onProgress) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest()

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percent = Math.round((event.loaded / event.total) * 100)
                        onProgress(percent)
                    }
                }

                xhr.onload = () => {
                    const contentType = xhr.getResponseHeader('content-type') || ''
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const result = JSON.parse(xhr.responseText)
                            resolve({ success: true, url: result.url })
                        } catch {
                            resolve({ success: false, error: '解析响应失败' })
                        }
                    } else {
                        // 服务器返回非 2xx（可能是 Nginx HTML 错误页）
                        if (contentType.includes('application/json')) {
                            try {
                                const result = JSON.parse(xhr.responseText)
                                resolve({ success: false, error: result.error || `上传失败 (HTTP ${xhr.status})` })
                            } catch {
                                resolve({ success: false, error: `上传失败 (HTTP ${xhr.status})` })
                            }
                        } else {
                            // HTML 或其他非 JSON 响应（如 Nginx 404/502 页面）
                            const preview = xhr.responseText.replace(/<[^>]*>/g, '').trim().slice(0, 80)
                            resolve({ success: false, error: `上传失败 (HTTP ${xhr.status})${preview ? ': ' + preview : ''}` })
                        }
                    }
                }

                xhr.onerror = () => {
                    resolve({ success: false, error: '网络错误' })
                }

                const url = typeof getEdgeFunctionsUrl === 'function' ? getEdgeFunctionsUrl() : ''
                xhr.open('POST', `${url}/upload-r2`)
                xhr.setRequestHeader('Authorization', `Bearer ${finalToken}`)
                xhr.send(formData)
            })
        }

        // 不需要进度时，使用 fetch（更简洁）
        const response = await fetch(`${getEdgeFunctionsUrl()}/upload-r2`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${finalToken}`
            },
            body: formData
        })

        const contentType = response.headers.get('content-type') || ''

        if (!response.ok) {
            // 服务器返回非 2xx：先判断是否为 JSON，否则安全取文本（避免 Nginx HTML 页 JSON.parse 报错）
            if (contentType.includes('application/json')) {
                try {
                    const errResult = await response.json()
                    return { success: false, error: errResult.error || `上传失败 (HTTP ${response.status})` }
                } catch {
                    return { success: false, error: `上传失败 (HTTP ${response.status})` }
                }
            } else {
                const text = await response.text()
                const preview = text.replace(/<[^>]*>/g, '').trim().slice(0, 80)
                return { success: false, error: `上传失败 (HTTP ${response.status})${preview ? ': ' + preview : ''}` }
            }
        }

        const result = await response.json()

        return {
            success: true,
            url: result.url
        }
    } catch (e: any) {
        console.error('Upload exception:', e)
        return { success: false, error: e.message || '上传失败' }
    }
}

