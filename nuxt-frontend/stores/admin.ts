/**
 * 后台管理员状态管理
 * 使用独立的 Admin Supabase Client（与客户端完全分离）
 */

import { defineStore } from 'pinia'
import { getAdminSupabaseClient, adminSignOut } from '@/utils/supabase-admin'

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
            const client = getAdminSupabaseClient()
            const { data: { session } } = await client.auth.getSession()

            if (session) {
                // 验证是否在 admin_users 表中
                const { data: adminData } = await client
                    .from('admin_users')
                    .select('*')
                    .eq('auth_user_id', session.user.id)
                    .single()

                if (adminData) {
                    adminUser.value = {
                        id: session.user.id,
                        email: session.user.email || '',
                        role: adminData.role || 'admin'
                    }
                    adminInfo.value = adminData
                } else {
                    // 有 session 但不是管理员
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
     * 管理员登录
     */
    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const client = getAdminSupabaseClient()

            const { data, error } = await client.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                return { success: false, error: error.message }
            }

            if (!data.session) {
                return { success: false, error: '登录失败，无法获取 Session' }
            }

            // 验证是否在 admin_users 表中
            const { data: adminData, error: adminError } = await client
                .from('admin_users')
                .select('*')
                .eq('auth_user_id', data.session.user.id)
                .single()

            if (adminError || !adminData) {
                // 不是管理员，登出
                await client.auth.signOut()
                return { success: false, error: '该账号不是管理员' }
            }

            adminUser.value = {
                id: data.session.user.id,
                email: data.session.user.email || '',
                role: adminData.role || 'admin'
            }
            adminInfo.value = adminData

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
            await adminSignOut()
        } catch (error) {
            console.error('Admin logout error:', error)
        } finally {
            adminUser.value = null
            adminInfo.value = null
        }
    }

    /**
     * 检查页面权限
     */
    const hasPermission = (path: string): boolean => {
        if (!adminUser.value) return false
        // 超级管理员总是有权限
        if (adminInfo.value?.department?.name === '超级管理员') return true
        // 检查路径是否在权限列表中
        return permissions.value.includes(path)
    }

    return {
        // 状态
        user: readonly(adminUser), // 兼容旧代码
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
        hasPermission
    }
})
