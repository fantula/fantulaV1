import { getSupabaseClient } from '@/utils/supabase'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface Article {
  id: string
  title: string
  description?: string
  content?: string
  cover_image?: string
  video_url?: string
  category: string
  is_published?: boolean
  views: number
  created_at: string
  author?: {
    name: string
    avatar: string
  }
}

export interface Category {
  id: string
  name: string
  icon?: string
  color?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export const communityApi = {
  // Get list of articles (public)
  async getArticles(category = 'all', page = 1, pageSize = 12) {
    const client = getSupabaseClient()

    let query = client
      .from('community_articles')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (category !== 'all') {
      query = query.eq('category', category)
    }

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await query.range(from, to)

    if (error) {
      console.error('Error fetching articles:', error)
      return { success: false, data: [], total: 0 }
    }

    // Mock author for now since we don't have an authors table relation yet
    const enrichedData = data?.map(article => ({
      ...article,
      author: {
        name: '官方客服',
        avatar: '/images/service-avatar.png'
      }
    }))

    return { success: true, data: enrichedData, total: count || 0 }
  },

  // Get active categories (public)
  async getCategories() {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('community_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return { success: false, data: [] }
    }
    return { success: true, data }
  },

  // Get single article detail
  async getArticleDetail(id: string) {
    const client = getSupabaseClient()

    const { data, error } = await client
      .from('community_articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching article detail:', error)
      return { success: false, msg: error.message }
    }

    // Increment view count (fire and forget)
    this.incrementViews(id)

    return {
      success: true,
      data: {
        ...data,
        author: {
          name: '官方客服',
          avatar: '/images/service-avatar.png'
        }
      }
    }
  },

  // Increment view count
  async incrementViews(id: string) {
    const client = getSupabaseClient()
    await client.rpc('increment_article_views', { article_id: id })
  }
}

// Admin APIs
export const adminCommunityApi = {
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
