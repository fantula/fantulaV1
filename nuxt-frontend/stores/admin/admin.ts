/**
 * 后台管理员状态管理
 * 使用 Server API 进行权限操作，不再在前端使用 Service Key
 */

import { defineStore } from 'pinia'
import { getSupabaseClient } from '@/utils/supabase'

interface AdminUser {
    id: string
    email: string
    role: string
}

interface AdminInfo {
    id: string
    auth_user_id: string
    role: string
    name: string | null
    email: string
    created_at: string
    department?: {
        name: string
        permissions: string[]
    }
}

export const useAdminStore = defineStore('admin', () => {
    // 状态
    const adminUser = ref<AdminUser | null>(null)
    const adminInfo = ref<AdminInfo | null>(null)
    const loading = ref(true)
    const isInitialized = ref(false)  // 标识是否已完成初始化
    const isLoggedIn = computed(() => !!adminUser.value)
    const permissions = computed(() => adminInfo.value?.department?.permissions || [])

    /**
     * 初始化：检查后台登录状态
     */
    const init = async () => {
        if (isInitialized.value) return  // 避免重复初始化
        loading.value = true
        try {
            const authClient = getSupabaseClient() // 使用标准客户端获取 Session
            const { data: { session } } = await authClient.auth.getSession()

            if (session) {
                // 调用服务端 API 获取管理员信息 (不再直接查库)
                const response = await $fetch<{ success: boolean; adminInfo: AdminInfo | null }>('/api/admin/auth/me', {
                    headers: {
                        Authorization: `Bearer ${session.access_token}`
                    }
                }).catch(() => ({ success: false, adminInfo: null }))

                const info = response.adminInfo

                if (response.success && info) {
                    adminUser.value = {
                        id: session.user.id,
                        email: session.user.email || '',
                        role: info.role || 'admin'
                    }
                    adminInfo.value = info
                } else {
                    // 有 session 但获取不到管理员信息 (Token失效或非管理员)
                    await logout()
                }
            } else {
                adminUser.value = null
                adminInfo.value = null
            }
        } catch (error) {
            console.error('Admin init error:', error)
            adminUser.value = null
            adminInfo.value = null
        } finally {
            loading.value = false
            isInitialized.value = true
        }
    }

    /**
     * 管理员登录 (密码)
     */
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const authClient = getSupabaseClient()

            // 调用服务端登录 API
            const result = await $fetch<{ success: boolean, session: any, adminInfo: any, error?: string }>('/api/admin/auth/login', {
                method: 'POST',
                body: { type: 'password', email, password }
            }).catch(err => ({ success: false, error: err.data?.statusMessage || err.message, session: null, adminInfo: null }))

            if (!result.success || !result.session) {
                return { success: false, error: result.error || '登录失败' }
            }

            // 恢复客户端 Session
            const { error: setSessionError } = await authClient.auth.setSession({
                access_token: result.session.access_token,
                refresh_token: result.session.refresh_token
            })

            if (setSessionError) {
                return { success: false, error: 'Session设置失败' }
            }

            adminUser.value = {
                id: result.session.user.id,
                email: result.session.user.email || '',
                role: result.adminInfo.role || 'admin'
            }
            adminInfo.value = result.adminInfo

            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message || '登录失败' }
        }
    }

    /**
     * 管理员登出
     */
    const logout = async () => {
        try {
            const authClient = getSupabaseClient()
            await authClient.auth.signOut()
        } catch (error) {
            console.error('Admin logout error:', error)
        } finally {
            adminUser.value = null
            adminInfo.value = null
        }
    }

    /**
     * 发送验证码（OTP）
     */
    const sendOtp = async (email: string): Promise<{ success: boolean; error?: string }> => {
        try {
            // 调用服务端 API 发送验证码
            await $fetch('/api/admin/auth/send-otp', {
                method: 'POST',
                body: { email }
            })
            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.data?.statusMessage || error.message || '发送验证码失败' }
        }
    }

    /**
     * 验证码登录（OTP）
     */
    const loginWithOtp = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const authClient = getSupabaseClient()

            // 调用服务端登录 API
            const result = await $fetch<{ success: boolean, session: any, adminInfo: any, error?: string }>('/api/admin/auth/login', {
                method: 'POST',
                body: { type: 'otp', email, code }
            }).catch(err => ({ success: false, error: err.data?.statusMessage || err.message, session: null, adminInfo: null }))

            if (!result.success || !result.session) {
                return { success: false, error: result.error || '登录失败' }
            }

            // 恢复客户端 Session
            const { error: setSessionError } = await authClient.auth.setSession({
                access_token: result.session.access_token,
                refresh_token: result.session.refresh_token
            })

            if (setSessionError) {
                return { success: false, error: 'Session设置失败' }
            }

            adminUser.value = {
                id: result.session.user.id,
                email: result.session.user.email || '',
                role: result.adminInfo.role || 'admin'
            }
            adminInfo.value = result.adminInfo

            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message || '登录失败' }
        }
    }


    /**
     * 检查页面权限
     */
    const hasPermission = (path: string): boolean => {
        if (!adminUser.value) return false
        const deptName = adminInfo.value?.department?.name || ''
        const perms = adminInfo.value?.department?.permissions || []
        if (deptName.includes('超级') || perms.includes('*')) return true
        if (path === '/manager_portal') return true
        if (permissions.value.length === 0) return true
        if (permissions.value.includes(path)) return true
        for (const perm of permissions.value) {
            if (path.startsWith(perm + '/')) return true
        }
        return false
    }

    return {
        // 状态
        user: readonly(adminUser),
        adminUser: readonly(adminUser),
        adminInfo: readonly(adminInfo),
        isLoggedIn,
        isInitialized: readonly(isInitialized),
        loading: readonly(loading),
        permissions,

        // 方法
        init,
        login,
        logout,
        sendOtp,
        loginWithOtp,
        hasPermission
    }
})
