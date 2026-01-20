import axios, { type AxiosInstance } from 'axios'
import type { ApiResponse } from '@/types/api'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const token = useCookie('token')

    // 创建 axios 实例
    const axiosInstance = axios.create({
        baseURL: config.public.apiBase,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // 请求拦截器
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token.value) {
                config.headers.token = token.value
            }
            if (config.method === 'get') {
                config.params = {
                    ...config.params,
                    _t: Date.now()
                }
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    // 响应拦截器
    axiosInstance.interceptors.response.use(
        (response) => {
            // 适配后端 Result 格式到前端 ApiResponse 格式
            const result = response.data
            if (result && typeof result === 'object' && 'code' in result) {
                const adaptedResponse: ApiResponse<any> = {
                    code: result.code,
                    msg: result.msg,
                    data: result.data,
                    success: result.code === 0  // 后端 code=0 表示成功
                }
                response.data = adaptedResponse
            }
            return response
        },
        (error) => {
            if (error.response) {
                const { status, data } = error.response
                switch (status) {
                    case 401:
                        token.value = null
                        navigateTo('/login')
                        break
                    case 403:
                        console.error('403 Forbidden')
                        break
                    case 404:
                        console.error('404 Not Found')
                        break
                    case 500:
                        console.error('500 Server Error')
                        break
                }
                // 处理后端错误格式
                if (data && typeof data === 'object' && 'msg' in data) {
                    return Promise.reject(new Error(data.msg))
                }
                return Promise.reject(new Error(data?.msg || `HTTP ${status} 错误`))
            } else if (error.request) {
                return Promise.reject(new Error('网络连接失败，请检查网络设置'))
            } else {
                return Promise.reject(error)
            }
        }
    )

    // 注入到 Nuxt App，全局可用
    return {
        provide: {
            axios: axiosInstance
        }
    }
})
