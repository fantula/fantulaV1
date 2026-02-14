/**
 * 后台用户管理 API
 * 遵循 api/admin/ 规范
 */

import { getSupabaseClient } from '@/utils/supabase'
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
        const client = getSupabaseClient()

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
        try {
            const token = await getAuthToken()
            if (!token) return { success: false, error: '未登录' }

            const response = await $fetch<{ success: boolean; user?: AdminBackendUser; error?: string }>('/api/admin/users/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            })
            return response
        } catch (err: any) {
            return { success: false, error: err.message || '请求失败' }
        }
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
        const client = getSupabaseClient()

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
        try {
            const token = await getAuthToken()
            if (!token) return { success: false, error: '未登录' }

            const response = await $fetch<{ success: boolean; error?: string }>('/api/admin/users/delete', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: { id }
            })
            return response
        } catch (err: any) {
            return { success: false, error: err.message || '请求失败' }
        }
    },
}

