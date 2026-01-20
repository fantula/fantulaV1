import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/api'

/**
 * ⚠️ 已废弃：此文件不应再被使用
 * 
 * 原因：在 utils 中直接使用 Nuxt Composables 违反 Nuxt 使用规则
 * 
 * 新用法：
 * ```typescript
 * const http = useHttp()
 * const res = await http.get('/api/xxx')
 * ```
 * 
 * 或直接使用 $axios：
 * ```typescript
 * const { $axios } = useNuxtApp()
 * const res = await $axios.get('/api/xxx')
 * ```
 */

// 保留导出以避免编译错误，但实际调用会抛出错误
export const http = {
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    throw new Error('http.get 已废弃，请改用 useHttp() composable')
  },

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    throw new Error('http.post 已废弃，请改用 useHttp() composable')
  },

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    throw new Error('http.put 已废弃，请改用 useHttp() composable')
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    throw new Error('http.delete 已废弃，请改用 useHttp() composable')
  },

  upload<T = any>(url: string, file: File, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    throw new Error('http.upload 已废弃，请改用 useHttp() composable')
  },

  download(url: string, params?: any, filename?: string): Promise<void> {
    throw new Error('http.download 已废弃，请改用 useHttp() composable')
  }
}