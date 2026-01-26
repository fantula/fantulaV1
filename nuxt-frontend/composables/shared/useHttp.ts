import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/api'

/**
 * HTTP 请求 Composable
 * 使用方法：const http = useHttp()
 */
export const useHttp = () => {
    const { $axios } = useNuxtApp()

    return {
        /**
         * GET 请求
         */
        get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
            return $axios.get(url, { params, ...config }).then(res => res.data)
        },

        /**
         * POST 请求
         */
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
            return $axios.post(url, data, config).then(res => res.data)
        },

        /**
         * PUT 请求
         */
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
            return $axios.put(url, data, config).then(res => res.data)
        },

        /**
         * DELETE 请求
         */
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
            return $axios.delete(url, config).then(res => res.data)
        },

        /**
         * 文件上传
         */
        upload<T = any>(url: string, file: File, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
            const formData = new FormData()
            formData.append('file', file)
            return $axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                ...config
            }).then(res => res.data)
        },

        /**
         * 文件下载
         */
        download(url: string, params?: any, filename?: string): Promise<void> {
            return $axios.get(url, {
                params,
                responseType: 'blob'
            }).then((response) => {
                const blob = new Blob([response.data])
                const downloadUrl = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = filename || 'download'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(downloadUrl)
            })
        }
    }
}
