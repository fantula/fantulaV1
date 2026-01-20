/**
 * 商品分类管理 API
 */
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface ProductCategory {
    id: string
    name: string
    sort_order: number
    status: 'on' | 'off'
    created_at: string
    product_count?: number
}

export const adminCategoryApi = {
    async getCategories(): Promise<{ success: boolean; categories: ProductCategory[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('product_categories')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, categories: [], error: error.message }
        }

        const categories = data || []
        const categoryIds = categories.map(c => c.id)

        let countMap: Record<string, number> = {}
        if (categoryIds.length > 0) {
            const { data: products } = await client
                .from('products')
                .select('category_id')
                .in('category_id', categoryIds)

            products?.forEach(p => {
                if (p.category_id) {
                    countMap[p.category_id] = (countMap[p.category_id] || 0) + 1
                }
            })
        }

        const categoriesWithCount = categories.map(cat => ({
            ...cat,
            product_count: countMap[cat.id] || 0
        }))

        return { success: true, categories: categoriesWithCount }
    },

    async createCategory(data: {
        name: string
        sort_order?: number
        status?: 'on' | 'off'
    }): Promise<{ success: boolean; category?: ProductCategory; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data: category, error } = await client
            .from('product_categories')
            .insert({
                name: data.name,
                sort_order: data.sort_order ?? 0,
                status: data.status ?? 'on',
            })
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true, category }
    },

    async updateCategory(id: string, data: {
        name?: string
        sort_order?: number
        status?: 'on' | 'off'
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('product_categories')
            .update(data)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },

    async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { count } = await client
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', id)

        if (count && count > 0) {
            return { success: false, error: `该分类下有 ${count} 个商品，请先移除或重新分配` }
        }

        const { error } = await client
            .from('product_categories')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    },

    async batchUpdateSort(items: { id: string; sort_order: number }[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        for (const item of items) {
            const { error } = await client
                .from('product_categories')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id)

            if (error) {
                return { success: false, error: error.message }
            }
        }
        return { success: true }
    },
}
