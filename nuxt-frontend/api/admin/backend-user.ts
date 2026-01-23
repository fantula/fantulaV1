/**
 * 后台用户管理 API
 * 遵循 api/admin/ 规范
 */

import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import type { AdminDepartment } from './department'

// ========================================
// 类型定义
// ========================================

export interface AdminBackendUser {
    id: string
    name: string
    email: string
    department_id: string | null
    status: 'enabled' | 'disabled'
    created_at: string
    auth_user_id: string | null
    department?: AdminDepartment
}

// ========================================
// 后台用户管理 API
// ========================================

export const adminBackendUserApi = {
    /**
     * 获取后台用户列表
     */
    async getUsers(): Promise<{ success: boolean; users: AdminBackendUser[]; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('admin_users')
            .select(`
                *,
                department:admin_departments(id, name, permissions)
            `)
            .order('created_at', { ascending: false })

        if (error) {
            return { success: false, users: [], error: error.message }
        }

        return { success: true, users: data || [] }
    },

    /**
     * 创建后台用户
     * 1. 创建 Supabase Auth 用户（支持密码登录）
     * 2. 创建 admin_users 记录并关联 auth_user_id
     */
    async createUser(data: {
        name: string
        email: string
        password: string
        department_id?: string
        status?: 'enabled' | 'disabled'
    }): Promise<{ success: boolean; user?: AdminBackendUser; error?: string }> {
        const client = getAdminSupabaseClient()

        // Step 1: 使用 Supabase Admin API 创建 Auth 用户
        const { data: authData, error: authError } = await client.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: true,  // 跳过邮箱验证，直接确认
            user_metadata: {
                name: data.name,
                role: 'admin'
            }
        })

        if (authError) {
            // 处理常见错误
            if (authError.message.includes('already been registered')) {
                return { success: false, error: '该邮箱已被注册' }
            }
            return { success: false, error: `创建认证用户失败: ${authError.message}` }
        }

        if (!authData.user) {
            return { success: false, error: '创建认证用户失败：未返回用户信息' }
        }

        // 计算密码哈希（用于兼容数据库 password_hash 非空约束）
        const encoder = new TextEncoder()
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data.password))
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        // Step 2: 创建 admin_users 记录，关联 auth_user_id
        const { data: user, error } = await client
            .from('admin_users')
            .insert({
                name: data.name,
                email: data.email,
                password_hash,  // 保留以兼容数据库约束
                auth_user_id: authData.user.id,  // 关键：关联 Auth 用户
                department_id: data.department_id ?? null,
                status: data.status ?? 'enabled',
            })
            .select()
            .single()

        if (error) {
            // 回滚：删除已创建的 Auth 用户
            await client.auth.admin.deleteUser(authData.user.id)
            return { success: false, error: `创建管理员记录失败: ${error.message}` }
        }

        return { success: true, user }
    },


    /**
     * 更新后台用户
     */
    async updateUser(id: string, data: {
        name?: string
        email?: string
        department_id?: string
        status?: 'enabled' | 'disabled'
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('admin_users')
            .update(data)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 删除后台用户
     * 1. 获取 auth_user_id
     * 2. 删除 admin_users 记录
     * 3. 删除 Supabase Auth 用户
     */
    async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // Step 1: 获取用户的 auth_user_id
        const { data: adminUser, error: fetchError } = await client
            .from('admin_users')
            .select('auth_user_id')
            .eq('id', id)
            .single()

        if (fetchError) {
            return { success: false, error: `获取用户信息失败: ${fetchError.message}` }
        }

        const authUserId = adminUser?.auth_user_id

        // Step 2: 删除 admin_users 记录
        const { error } = await client
            .from('admin_users')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        // Step 3: 删除 Supabase Auth 用户（如果存在）
        if (authUserId) {
            const { error: authDeleteError } = await client.auth.admin.deleteUser(authUserId)
            if (authDeleteError) {
                console.warn(`删除 Auth 用户失败 (${authUserId}):`, authDeleteError.message)
                // 不阻断流程，只记录警告
            }
        }

        return { success: true }
    },
}

