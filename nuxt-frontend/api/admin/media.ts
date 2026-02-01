import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface AdminImageCategory {
    id: string
    name: string
    sort_order: number
    created_at: string
}

export interface AdminImage {
    id: string
    name: string
    url: string
    category_id: string | null
    created_at: string
    category?: AdminImageCategory
}

export interface AdminBanner {
    id: string
    image_id: string
    title: string
    link: string
    sort_order: number
    status: 'on' | 'off'
    created_at: string
    image?: AdminImage
}

export const adminImageCategoryApi = {
    /**
     * 获取图片分类列表
     */
    async getCategories(): Promise<{ success: boolean; categories: AdminImageCategory[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('image_categories')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) return { success: false, categories: [], error: error.message }
        return { success: true, categories: data || [] }
    },

    /**
     * 创建图片分类
     */
    async createCategory(name: string): Promise<{ success: boolean; category?: AdminImageCategory; error?: string }> {
        const client = getAdminSupabaseClient()
        // 获取当前最大排序
        const { data: maxOrder } = await client
            .from('image_categories')
            .select('sort_order')
            .order('sort_order', { ascending: false })
            .limit(1)
            .single()

        const nextOrder = (maxOrder?.sort_order || 0) + 1

        const { data: category, error } = await client
            .from('image_categories')
            .insert({ name, sort_order: nextOrder })
            .select()
            .single()

        if (error) return { success: false, error: error.message }
        return { success: true, category }
    },

    /**
     * 删除图片分类
     */
    async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 检查该分类下是否有图片
        const { count } = await client
            .from('images')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', id)

        if (count && count > 0) {
            return { success: false, error: '该分类下有图片，无法删除' }
        }

        const { error } = await client
            .from('image_categories')
            .delete()
            .eq('id', id)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}

export const adminImageApi = {
    /**
     * 获取图片列表
     */
    async getImages(params?: { category_id?: string; keyword?: string }): Promise<{ success: boolean; images: AdminImage[]; error?: string }> {
        const client = getAdminSupabaseClient()
        let query = client.from('images').select(`
            *,
            category:image_categories(*)
        `)

        if (params?.category_id) query = query.eq('category_id', params.category_id)
        if (params?.keyword) query = query.ilike('name', `%${params.keyword}%`)

        const { data, error } = await query.order('created_at', { ascending: false })
        if (error) return { success: false, images: [], error: error.message }
        return { success: true, images: data || [] }
    },

    /**
     * 创建图片记录
     */
    async createImage(data: { name: string; url: string; category_id?: string }): Promise<{ success: boolean; image?: AdminImage; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data: image, error } = await client.from('images').insert(data).select().single()
        if (error) return { success: false, error: error.message }
        return { success: true, image }
    },

    /**
     * 更新图片信息
     */
    async updateImage(id: string, data: Partial<AdminImage>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('images').update(data).eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 删除图片（单个）
     */
    async deleteImage(id: string): Promise<{ success: boolean; error?: string }> {
        return this.deleteImages([id])
    },

    /**
     * 批量删除图片
     */
    async deleteImages(ids: string[]): Promise<{ success: boolean; error?: string }> {
        if (!ids.length) return { success: true }

        const client = getAdminSupabaseClient()

        // 1. 获取图片信息以拿到 URL
        const { data: images, error: fetchError } = await client
            .from('images')
            .select('url')
            .in('id', ids)

        if (fetchError) return { success: false, error: fetchError.message }

        // 2. 从 R2 URL 提取文件路径
        const filePaths = images
            .map(img => {
                try {
                    const url = new URL(img.url)
                    // 移除开头的 /
                    return url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname
                } catch {
                    // 如果不是有效 URL，尝试直接分割
                    const parts = img.url.split('/')
                    // 取最后两段 (folder/filename)
                    return parts.slice(-2).join('/')
                }
            })
            .filter(Boolean)

        // 3. 调用 delete-r2 Edge Function 删除 R2 文件
        if (filePaths.length > 0) {
            try {
                // 获取 Admin Token
                const { getAdminAuthToken } = await import('@/utils/supabase-admin')
                const token = await getAdminAuthToken()

                if (token) {
                    const { getEdgeFunctionsUrl } = await import('@/utils/supabase')
                    const response = await fetch(`${getEdgeFunctionsUrl()}/delete-r2`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ paths: filePaths })
                    })

                    if (!response.ok) {
                        const result = await response.json()
                        console.error('Failed to delete files from R2:', result.error)
                    }
                }
            } catch (e) {
                console.error('R2 delete request failed:', e)
            }
        }

        // 4. 删除数据库记录
        const { error } = await client.from('images').delete().in('id', ids)
        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}

export const adminBannerApi = {
    /**
     * 获取轮播图列表
     */
    async getBanners(): Promise<{ success: boolean; banners: AdminBanner[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('banners')
            .select(`
                *,
                image:images(*)
            `)
            .order('sort_order', { ascending: true })

        if (error) return { success: false, banners: [], error: error.message }
        return { success: true, banners: data || [] }
    },

    /**
     * 添加轮播图
     */
    async createBanner(data: { image_id: string; title?: string; link?: string; sort_order?: number }): Promise<{ success: boolean; banner?: AdminBanner; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data: banner, error } = await client
            .from('banners')
            .insert({
                ...data,
                status: 'on'
            })
            .select()
            .single()

        if (error) return { success: false, error: error.message }
        return { success: true, banner }
    },

    /**
     * 更新轮播图状态/排序
     */
    async updateBanner(id: string, data: Partial<AdminBanner>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('banners').update(data).eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 删除轮播图
     */
    async deleteBanner(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('banners').delete().eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}

export const adminSettingsApi = {
    /**
     * 获取 R2 配置
     */
    async getR2Settings(): Promise<{
        success: boolean
        settings?: {
            R2_ACCOUNT_ID: string
            R2_ACCESS_KEY_ID: string
            R2_SECRET_ACCESS_KEY: string
            R2_BUCKET_NAME: string
            R2_PUBLIC_BASE_URL: string
        }
        error?: string
    }> {
        const client = getAdminSupabaseClient()

        try {
            const { data, error } = await client
                .from('system_settings')
                .select('key, value')
                .in('key', ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_PUBLIC_BASE_URL'])

            if (error) {
                // Return default
                return {
                    success: true,
                    settings: {
                        R2_ACCOUNT_ID: '',
                        R2_ACCESS_KEY_ID: '',
                        R2_SECRET_ACCESS_KEY: '',
                        R2_BUCKET_NAME: 'fantula2601',
                        R2_PUBLIC_BASE_URL: 'https://img.fantula.com'
                    }
                }
            }

            const settings: Record<string, string> = {
                R2_ACCOUNT_ID: '',
                R2_ACCESS_KEY_ID: '',
                R2_SECRET_ACCESS_KEY: '',
                R2_BUCKET_NAME: 'fantula2601',
                R2_PUBLIC_BASE_URL: 'https://img.fantula.com'
            }

            data?.forEach((item: { key: string; value: string }) => {
                settings[item.key] = item.value
                // Mask secret
                if (item.key === 'R2_SECRET_ACCESS_KEY' && item.value) {
                    settings[item.key] = item.value.slice(0, 4) + '****' + item.value.slice(-4)
                }
            })

            return { success: true, settings: settings as any }
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    },

    /**
     * 更新 R2 配置
     */
    async updateR2Settings(settings: {
        R2_ACCOUNT_ID: string
        R2_ACCESS_KEY_ID: string
        R2_SECRET_ACCESS_KEY?: string  // Optional
        R2_BUCKET_NAME: string
        R2_PUBLIC_BASE_URL: string
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        try {
            const updates = Object.entries(settings)
                .filter(([_, value]) => value !== undefined && value !== '')
                .map(([key, value]) => ({
                    key,
                    value,
                    updated_at: new Date().toISOString()
                }))

            if (updates.length === 0) {
                return { success: true }
            }
            const { error } = await client
                .from('system_settings')
                .upsert(updates, { onConflict: 'key' })

            if (error) {
                return { success: false, error: error.message }
            }

            return { success: true }
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    }
}
