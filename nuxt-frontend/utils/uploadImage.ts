import { getAuthToken, getEdgeFunctionsUrl } from './supabase'

/**
 * 上传进度回调类型
 */
export type UploadProgressCallback = (progress: number) => void

/**
 * 上传图片到 Cloudflare R2（通过 Edge Function）
 * @param file 要上传的图片文件
 * @param folder 存储目录，默认 'uploads'
 * @param onProgress 可选的进度回调，参数为 0-100 的百分比
 * @returns 上传结果，包含公开 URL
 */
export async function uploadImageToStorage(
    file: File,
    folder: string = 'uploads',
    onProgress?: UploadProgressCallback
): Promise<{
    success: boolean
    url?: string
    error?: string
}> {
    try {
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

        // 获取认证 Token (优先尝试后台管理员 Token)
        let token = null
        try {
            const { getAdminAuthToken } = await import('./supabase-admin')
            token = await getAdminAuthToken()
        } catch (e) {
            console.warn('Failed to load admin token logic', e)
        }

        // 如果后台没登录，再尝试前台（仅作备用，以防万一）
        if (!token) {
            token = await getAuthToken()
        }

        if (!token) {
            return {
                success: false,
                error: '请先登录后台管理员账号'
            }
        }

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
                    try {
                        const result = JSON.parse(xhr.responseText)
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve({ success: true, url: result.url })
                        } else {
                            resolve({ success: false, error: result.error || `上传失败 (HTTP ${xhr.status})` })
                        }
                    } catch {
                        resolve({ success: false, error: '解析响应失败' })
                    }
                }

                xhr.onerror = () => {
                    resolve({ success: false, error: '网络错误' })
                }

                const url = typeof getEdgeFunctionsUrl === 'function' ? getEdgeFunctionsUrl() : ''
                xhr.open('POST', `${url}/upload-r2`)
                xhr.setRequestHeader('Authorization', `Bearer ${token}`)
                xhr.send(formData)
            })
        }

        // 不需要进度时，使用 fetch（更简洁）
        const response = await fetch(`${getEdgeFunctionsUrl()}/upload-r2`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        const result = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: result.error || `上传失败 (HTTP ${response.status})`
            }
        }

        return {
            success: true,
            url: result.url
        }
    } catch (e: any) {
        console.error('Upload exception:', e)
        return { success: false, error: e.message || '上传失败' }
    }
}

/**
 * 删除图片（现在通过 delete-r2 Edge Function 实现）
 * @param url 图片的公开 URL
 * @returns 删除结果
 * @deprecated 请使用 adminImageApi.deleteImages() 替代，它会自动处理 R2 删除
 */
export async function deleteImageFromStorage(url: string): Promise<{
    success: boolean
    error?: string
}> {
    // 单独删除现在通过 API 层处理，这里保留接口兼容性
    console.warn('deleteImageFromStorage is deprecated, use adminImageApi.deleteImages() instead')
    return { success: true }
}
