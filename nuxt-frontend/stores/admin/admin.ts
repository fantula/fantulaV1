/**
 * 后台管理员状态管理
 * 使用独立的 Admin Supabase Client（与客户端完全分离）
 */

import { defineStore } from 'pinia'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
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
            const adminClient = getAdminSupabaseClient() // 使用 Admin 客户端获取数据

            const { data: { session } } = await authClient.auth.getSession()

            if (session) {
                // 验证是否在 admin_users 表中，并获取部门权限
                const { data: adminData } = await adminClient
                    .from('admin_users')
                    .select(`
                        *,
                        department:admin_departments(id, name, permissions)
                    `)
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
            const authClient = getSupabaseClient()
            const adminClient = getAdminSupabaseClient()

            const { data, error } = await authClient.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                return { success: false, error: error.message }
            }

            if (!data.session) {
                return { success: false, error: '登录失败，无法获取 Session' }
            }

            // 验证是否在 admin_users 表中，并获取部门权限
            const { data: adminData, error: adminError } = await adminClient
                .from('admin_users')
                .select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `)
                .eq('auth_user_id', data.session.user.id)
                .single()

            if (adminError || !adminData) {
                // 不是管理员，登出
                await authClient.auth.signOut()
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
     * 对于 admin_users 表中的管理员，如果尚未创建 auth.users 账号，会自动创建
     */
    const sendOtp = async (email: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const authClient = getSupabaseClient()
            const adminClient = getAdminSupabaseClient()

            // 先检查该邮箱是否是管理员，并获取 auth_user_id
            const { data: adminData } = await adminClient
                .from('admin_users')
                .select('id, status, auth_user_id')
                .eq('email', email)
                .single()

            if (!adminData) {
                return { success: false, error: '该邮箱未注册为管理员' }
            }

            if (adminData.status !== 'enabled') {
                return { success: false, error: '该账号已被禁用' }
            }

            // 检查是否已有 auth_user_id
            // 如果没有，说明需要为该管理员创建 auth.users 账号
            const shouldCreateUser = !adminData.auth_user_id

            // 发送 OTP
            const { error } = await authClient.auth.signInWithOtp({
                email,
                options: {
                    // 只有管理员表中没有 auth_user_id 时才允许创建用户
                    shouldCreateUser: shouldCreateUser
                }
            })

            if (error) {
                // 特殊处理：如果用户不存在且我们不允许创建，给出更友好的提示
                if (error.message.includes('Signups not allowed')) {
                    return { success: false, error: '账号未初始化，请联系超级管理员' }
                }
                return { success: false, error: error.message }
            }

            return { success: true }
        } catch (error: any) {
            return { success: false, error: error.message || '发送验证码失败' }
        }
    }

    /**
     * 验证码登录（OTP）
     * 如果是首次登录，会自动关联 admin_users 表的 auth_user_id
     */
    const loginWithOtp = async (email: string, code: string): Promise<{ success: boolean; error?: string }> => {
        try {
            const authClient = getSupabaseClient()
            const adminClient = getAdminSupabaseClient()

            // 验证 OTP
            const { data, error } = await authClient.auth.verifyOtp({
                email,
                token: code,
                type: 'email'
            })

            if (error) {
                // 处理常见错误
                if (error.message.includes('Token has expired') || error.message.includes('invalid')) {
                    return { success: false, error: '验证码已过期或无效' }
                }
                return { success: false, error: error.message }
            }

            if (!data.session) {
                return { success: false, error: '登录失败，无法获取 Session' }
            }

            const authUserId = data.session.user.id

            // 先尝试通过 auth_user_id 查找管理员
            let { data: adminData, error: adminError } = await adminClient
                .from('admin_users')
                .select(`
                    *,
                    department:admin_departments(id, name, permissions)
                `)
                .eq('auth_user_id', authUserId)
                .single()

            // 如果通过 auth_user_id 找不到，尝试通过邮箱查找并更新关联
            if (adminError || !adminData) {
                const { data: adminByEmail, error: emailError } = await adminClient
                    .from('admin_users')
                    .select(`
                        *,
                        department:admin_departments(id, name, permissions)
                    `)
                    .eq('email', email)
                    .single()

                if (emailError || !adminByEmail) {
                    // 确实不是管理员，登出
                    await authClient.auth.signOut()
                    return { success: false, error: '该账号不是管理员' }
                }

                // 找到了，更新 auth_user_id 关联
                const { error: updateError } = await adminClient
                    .from('admin_users')
                    .update({ auth_user_id: authUserId })
                    .eq('id', adminByEmail.id)

                if (updateError) {
                    console.error('更新 auth_user_id 失败:', updateError)
                    // 不阻止登录，只是记录错误
                }

                adminData = adminByEmail
            }

            if (adminData.status !== 'enabled') {
                await authClient.auth.signOut()
                return { success: false, error: '该账号已被禁用' }
            }

            adminUser.value = {
                id: authUserId,
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
     * 检查页面权限
     * 支持子路由权限检查（如访问 /users/accounts 时检查 /users 权限）
     */
    const hasPermission = (path: string): boolean => {
        if (!adminUser.value) return false
        // 超级管理员总是有权限（部门名称包含"超级"或 permissions 包含 "*"）
        const deptName = adminInfo.value?.department?.name || ''
        const perms = adminInfo.value?.department?.permissions || []
        if (deptName.includes('超级') || perms.includes('*')) return true

        // 仪表盘始终可访问
        if (path === '/admin') return true

        // 如果没有权限配置，默认允许全部（兼容旧数据）
        if (permissions.value.length === 0) return true

        // 精确匹配
        if (permissions.value.includes(path)) return true

        // 子路由匹配：检查是否有父路由权限
        // 例如访问 /admin/users/accounts 时，检查是否有 /admin/users 权限
        for (const perm of permissions.value) {
            if (path.startsWith(perm + '/')) return true
        }

        return false
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
        sendOtp,
        loginWithOtp,
        hasPermission
    }
})
