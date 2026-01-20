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
     */
    async createUser(data: {
        name: string
        email: string
        password: string
        department_id?: string
        status?: 'enabled' | 'disabled'
    }): Promise<{ success: boolean; user?: AdminBackendUser; error?: string }> {
        const client = getAdminSupabaseClient()

        // 简单的密码哈希（生产环境应使用 bcrypt）
        const encoder = new TextEncoder()
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data.password))
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        const { data: user, error } = await client
            .from('admin_users')
            .insert({
                name: data.name,
                email: data.email,
                password_hash,
                department_id: data.department_id ?? null,
                status: data.status ?? 'enabled',
            })
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
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
     */
    async deleteUser(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('admin_users')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },
}
