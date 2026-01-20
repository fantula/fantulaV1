/**
 * 部门管理 API
 * 遵循 api/admin/ 规范
 */

import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// ========================================
// 类型定义
// ========================================

export interface AdminDepartment {
    id: string
    name: string
    permissions: string[]
    created_at: string
    user_count?: number
}

// ========================================
// 部门管理 API
// ========================================

export const adminDepartmentApi = {
    /**
     * 获取部门列表（含用户数统计）
     */
    async getDepartments(): Promise<{ success: boolean; departments: AdminDepartment[]; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('admin_departments')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            return { success: false, departments: [], error: error.message }
        }

        // 查询每个部门下的用户数量
        const departmentsWithCount = await Promise.all(
            (data || []).map(async (dept) => {
                const { count } = await client
                    .from('admin_users')
                    .select('*', { count: 'exact', head: true })
                    .eq('department_id', dept.id)

                return { ...dept, user_count: count || 0 }
            })
        )

        return { success: true, departments: departmentsWithCount }
    },

    /**
     * 创建部门
     */
    async createDepartment(data: {
        name: string
        permissions?: string[]
    }): Promise<{ success: boolean; department?: AdminDepartment; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data: department, error } = await client
            .from('admin_departments')
            .insert({
                name: data.name,
                permissions: data.permissions ?? [],
            })
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, department }
    },

    /**
     * 更新部门
     */
    async updateDepartment(id: string, data: {
        name?: string
        permissions?: string[]
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('admin_departments')
            .update(data)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 删除部门（有用户时禁止删除）
     */
    async deleteDepartment(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 检查是否有用户
        const { count } = await client
            .from('admin_users')
            .select('*', { count: 'exact', head: true })
            .eq('department_id', id)

        if (count && count > 0) {
            return { success: false, error: `该部门下有 ${count} 个用户，请先移除或重新分配` }
        }

        const { error } = await client
            .from('admin_departments')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },
}
