import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import type { Article, Category } from '@/api/client/community'

export interface AdminFaqCategory {
    id: string
    name: string
    sort_order: number
    is_active: boolean
    is_checkout_visible: boolean
    created_at: string
}

export interface AdminFaq {
    id: string
    category_id: string | null
    question: string
    answer: string
    product_id: string | null
    sort_order: number
    is_active: boolean
    created_at: string
    category?: AdminFaqCategory
    product?: any // AdminProduct inferred
}

export const adminFaqApi = {
    // --- FAQ Category Management ---

    async getCategories(): Promise<{ success: boolean; categories: AdminFaqCategory[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('faq_categories')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) return { success: false, categories: [], error: error.message }
        return { success: true, categories: data || [] }
    },

    async createCategory(data: { name: string; sort_order: number; is_checkout_visible?: boolean }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('faq_categories')
            .insert({
                name: data.name,
                sort_order: data.sort_order,
                is_active: true,
                is_checkout_visible: data.is_checkout_visible || false
            })
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    async updateCategory(id: string, data: { name?: string; sort_order?: number; is_active?: boolean; is_checkout_visible?: boolean }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('faq_categories')
            .update(data)
            .eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        // Check if has FAQs
        const { count } = await client.from('faqs').select('*', { count: 'exact', head: true }).eq('category_id', id)
        if (count && count > 0) {
            return { success: false, error: `无法删除：该分类下有 ${count} 个问题，请先移除问题` }
        }

        const { error } = await client.from('faq_categories').delete().eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    // --- FAQ Management ---

    async getFaqs(params?: {
        category_id?: string
        keyword?: string
        page?: number
        page_size?: number
    }): Promise<{ success: boolean; faqs: AdminFaq[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const page = params?.page || 1
        const pageSize = params?.page_size || 20
        const offset = (page - 1) * pageSize

        let query = client
            .from('faqs')
            .select(`
                *,
                category:faq_categories(id, name),
                product:products(id, product_name)
            `, { count: 'exact' })

        if (params?.category_id) {
            query = query.eq('category_id', params.category_id)
        }
        if (params?.keyword) {
            query = query.ilike('question', `%${params.keyword}%`)
        }

        query = query
            .order('sort_order', { ascending: true })
            .range(offset, offset + pageSize - 1)

        const { data, error, count } = await query

        if (error) return { success: false, faqs: [], total: 0, error: error.message }
        return { success: true, faqs: data || [], total: count || 0 }
    },

    async getFaqById(id: string): Promise<{ success: boolean; faq?: AdminFaq; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('faqs')
            .select(`
                *,
                product:products(id, product_name)
            `)
            .eq('id', id)
            .single()

        if (error) return { success: false, error: error.message }
        return { success: true, faq: data }
    },

    async createFaq(data: {
        category_id?: string
        question: string
        answer: string
        product_id?: string
        sort_order?: number
        is_active?: boolean
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('faqs').insert({
            category_id: data.category_id || null,
            question: data.question,
            answer: data.answer,
            product_id: data.product_id || null,
            sort_order: data.sort_order || 0,
            is_active: data.is_active !== false
        })
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    async updateFaq(id: string, data: {
        category_id?: string
        question?: string
        answer?: string
        product_id?: string
        sort_order?: number
        is_active?: boolean
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('faqs').update({
            category_id: data.category_id || null,
            question: data.question,
            answer: data.answer,
            product_id: data.product_id || null,
            sort_order: data.sort_order,
            is_active: data.is_active
        }).eq('id', id)

        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    async deleteFaq(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('faqs').delete().eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}

export const adminArticleApi = {
    // Articles
    async getArticles(page = 1, pageSize = 20) {
        const client = getAdminSupabaseClient()

        const from = (page - 1) * pageSize
        const to = from + pageSize - 1

        const { data, count, error } = await client
            .from('community_articles')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to)

        return { data, total: count, error }
    },

    async createArticle(article: Partial<Article>) {
        const client = getAdminSupabaseClient()
        return await client.from('community_articles').insert([article]).select()
    },

    async updateArticle(id: string, updates: Partial<Article>) {
        const client = getAdminSupabaseClient()
        return await client.from('community_articles').update(updates).eq('id', id).select()
    },

    async deleteArticle(id: string) {
        const client = getAdminSupabaseClient()
        return await client.from('community_articles').delete().eq('id', id)
    },

    // Get single article by ID (admin - can fetch drafts)
    async getArticleById(id: string) {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('community_articles')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            return { success: false, data: null, msg: error.message }
        }
        return { success: true, data, msg: '' }
    },

    // Categories
    async getCategories() {
        const client = getAdminSupabaseClient()
        return await client
            .from('community_categories')
            .select('*')
            .order('sort_order', { ascending: true })
    },

    async createCategory(category: Partial<Category>) {
        const client = getAdminSupabaseClient()
        return await client.from('community_categories').insert([category]).select()
    },

    async updateCategory(id: string, updates: Partial<Category>) {
        const client = getAdminSupabaseClient()
        return await client.from('community_categories').update(updates).eq('id', id).select()
    },

    async deleteCategory(id: string) {
        const client = getAdminSupabaseClient()
        return await client.from('community_categories').delete().eq('id', id)
    }
}
