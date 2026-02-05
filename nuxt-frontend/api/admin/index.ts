/**
 * 管理后台 Supabase API 服务
 * 使用独立的 Admin Supabase Client（与客户端完全分离）
 * 
 * NOTE: 部分 API 已拆分到独立文件，此处重新导出保持兼容
 * 本地定义的 API (adminCategoryApi, adminUserApi 等) 仍在此文件中
 */

import { getAdminSupabaseClient } from '@/utils/supabase-admin'

// 导入已拆分的模块 (For local use in adminApi object)
import { adminCdkApi } from './cdk'
import { adminCouponApi } from './coupon'
import { adminImageApi, adminImageCategoryApi, adminBannerApi, adminSettingsApi } from './media'
import { adminFaqApi } from './help-center'
import { adminOrderApi } from './order'
import { adminSchedulerApi } from './scheduler'

// 重新导出已拆分的模块 (Backward Compatibility)
export { adminCdkApi, type AdminCDK } from './cdk'
export { adminCouponApi, type AdminCoupon } from './coupon'
export { adminOrderApi, type AdminOrder, type AdminOrderDelivery } from './order'
export { adminFaqApi } from './help-center'
export { adminSettingsApi, adminBannerApi, adminImageApi, adminImageCategoryApi } from './media'
export { adminSchedulerApi, type SchedulerStatus, type SchedulerLog } from './scheduler'
export { adminSystemApi, type AdminContactConfig } from './system'


// ========================================
// 轮播图与图片管理类型定义
// ========================================

export interface AdminImage {
    id: string
    name: string
    url: string
    category_id: string | null
    created_at: string
    category?: AdminImageCategory
}

export interface AdminImageCategory {
    id: string
    name: string
    sort_order: number
    created_at: string
}

export interface AdminBanner {
    id: string
    image_id: string
    title: string | null
    link: string | null
    sort_order: number
    status: 'on' | 'off'
    created_at: string
    image?: AdminImage
}

// ========================================
// 类型定义
// ========================================

export interface AdminProduct {
    id: string
    product_name: string
    status: 'on' | 'off'
    category_id: string | null
    image: string | null         // 商品头图
    sort_order: number           // 排序
    display_price: number        // 虚假展示价格
    tags: string[]               // 商品标签组
    initial_sales: number        // 初始销量
    badge_label: string | null   // 角标标签 (如：热卖、新品)
    rating: number               // 好评度
    allow_addon: boolean         // 是否支持加购
    detail_modules: any[]        // 详情页内容模块 (JSONB)
    created_at: string
    stock?: number
    category?: ProductCategory
}

export interface ProductCategory {
    id: string
    name: string
    sort_order: number
    status: 'on' | 'off'
    created_at: string
    product_count?: number
}

export interface AdminDepartment {
    id: string
    name: string
    permissions: string[]
    created_at: string
    user_count?: number
}

export interface AdminBackendUser {
    id: string
    name: string
    email: string
    department_id: string | null
    status: 'enabled' | 'disabled'
    created_at: string
    department?: AdminDepartment
}





export interface AdminUser {
    id: string
    uid: string
    email: string
    status: 'active' | 'disabled'
    created_at: string
}

export interface AdminMessage {
    id: string
    user_uid: string
    title: string
    content: string
    is_read: boolean
    created_at: string
}



// ========================================
// 商品管理 API
// ========================================
/**
 * 商品字段逻辑说明：
 * - badge_label: 首页/列表展示的角标文字（如：热卖、新品）
 * - detail_modules: JSONB数组，存储详情页图文排版。
 */
export const adminProductApi = {
    /**
     * 获取商品列表（管理员视角，支持分页和服务端筛选）
     * @param params 筛选和分页参数
     */
    async getProducts(params?: {
        category_id?: string
        product_type?: string
        status?: string
        keyword?: string
        page?: number
        page_size?: number
    }): Promise<{ success: boolean; products: AdminProduct[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const page = params?.page || 1
        const pageSize = params?.page_size || 20
        const offset = (page - 1) * pageSize

        // 构建查询（支持服务端筛选）
        let query = client
            .from('products')
            .select('*', { count: 'exact' })

        if (params?.category_id) {
            query = query.eq('category_id', params.category_id)
        }
        // product_type 过滤已移除（类型现在在 SKU 级别）
        if (params?.status) {
            query = query.eq('status', params.status)
        }
        if (params?.keyword) {
            query = query.ilike('product_name', `%${params.keyword}%`)
        }

        // 排序和分页
        query = query
            .order('created_at', { ascending: false })
            .range(offset, offset + pageSize - 1)

        const { data, error, count } = await query

        if (error) {
            return { success: false, products: [], total: 0, error: error.message }
        }

        const products = data || []
        const productIds = products.map(p => p.id)

        // 批量查询 SKU 详情
        let skuCountMap: Record<string, number> = {}
        let skuDetailsMap: Record<string, string[]> = {}

        if (productIds.length > 0) {
            const { data: skuMapData } = await client
                .from('product_sku_map')
                .select('product_id, sku:product_skus (tag, tag_name, spec_combination)')
                .in('product_id', productIds)

            // 统计
            skuMapData?.forEach((item: any) => {
                const pid = item.product_id
                skuCountMap[pid] = (skuCountMap[pid] || 0) + 1

                if (!skuDetailsMap[pid]) skuDetailsMap[pid] = []
                const sku = item.sku
                if (sku) {
                    let label = ''
                    if (sku.tag_name) label = `🔖 ${sku.tag_name}`
                    else if (sku.spec_combination && Object.values(sku.spec_combination).length > 0) {
                        label = Object.values(sku.spec_combination).join(' / ')
                    } else {
                        label = '默认规格'
                    }
                    if (label && !skuDetailsMap[pid].includes(label)) {
                        skuDetailsMap[pid].push(label)
                    }
                }
            })
        }

        const productsWithSkuCount = products.map(product => ({
            ...product,
            sku_count: skuCountMap[product.id] || 0,
            sku_details: skuDetailsMap[product.id] || []
        }))

        return { success: true, products: productsWithSkuCount, total: count || 0 }
    },

    /**
     * 获取单个商品详情（用于编辑）
     */
    async getProductById(id: string): Promise<{ success: boolean; product?: AdminProduct; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('products')
            .select('*, category:product_categories(id, name)')
            .eq('id', id)
            .single()

        if (error || !data) {
            return { success: false, error: error?.message || '商品不存在' }
        }

        return { success: true, product: data }
    },

    /**
     * 创建商品
     */
    async createProduct(data: {
        product_name: string
        category_id?: string | null
        image?: string | null
        sort_order?: number
        display_price?: number
        tags?: string[]
        initial_sales?: number
        badge_label?: string | null
        rating?: number
        allow_addon?: boolean
        detail_modules?: any[]
        status?: 'on' | 'off'
    }): Promise<{ success: boolean; product?: AdminProduct; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data: product, error } = await client
            .from('products')
            .insert({
                product_name: data.product_name,
                category_id: data.category_id,
                image: data.image,
                sort_order: data.sort_order || 0,
                display_price: data.display_price || 0,
                tags: data.tags || [],
                initial_sales: data.initial_sales || 0,
                badge_label: data.badge_label,
                rating: data.rating || 100,
                allow_addon: data.allow_addon || false,
                detail_modules: data.detail_modules || [],
                status: data.status || 'on',
            })
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, product }
    },

    /**
     * 更新商品（注意：product_type 不可修改）
     */
    async updateProduct(id: string, data: {
        product_name?: string
        status?: 'on' | 'off'
        category_id?: string | null
        image?: string | null
        sort_order?: number
        display_price?: number
        tags?: string[]
        initial_sales?: number
        badge_label?: string | null
        rating?: number
        allow_addon?: boolean
        detail_modules?: any[]
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('products')
            .update(data)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 切换商品状态
     */
    async toggleStatus(id: string, status: 'on' | 'off'): Promise<{ success: boolean; error?: string }> {
        return this.updateProduct(id, { status })
    },

    /**
     * 删除商品（支持批量）
     * 只删除 products 表和 product_sku_map 映射，保留 product_skus
     * @param ids 商品ID数组
     */
    async deleteProducts(ids: string[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 先删除商品-SKU 映射
        await client
            .from('product_sku_map')
            .delete()
            .in('product_id', ids)

        // 2. 再删除商品
        const { error } = await client
            .from('products')
            .delete()
            .in('id', ids)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    // createProductSpecs 已废弃，规格现在直接包含在 product_skus 的 spec_combination 中

    /**
     * 创建商品 SKU 组合
     * @param productId 商品ID
     * @param skus SKU 数组（每条需指定 product_type）
     */
    async createProductSkus(productId: string, skus: {
        spec_combination: Record<string, string>
        product_type: 'virtual' | 'shared_account' | 'one_time_cdk'  // 每条 SKU 指定类型
        image?: string
        intro?: string
        price: number
        duration?: number
        sort_order: number
        tag?: number  // 可选的分组标签
    }[]): Promise<{ success: boolean; count?: number; skuIds?: string[]; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 构造 SKU 数据（不含 product_id）
        const skuData = skus.map(sku => ({
            product_type: sku.product_type,
            spec_combination: sku.spec_combination,
            image: sku.image || null,
            intro: sku.intro || null,
            price: sku.price,
            duration: sku.duration || null,
            sort_order: sku.sort_order,
            tag: sku.tag || null
        }))

        // 2. 插入 SKU
        const { data: createdSkus, error: skuError } = await client
            .from('product_skus')
            .insert(skuData)
            .select('id')

        if (skuError) {
            return { success: false, error: skuError.message }
        }

        // 3. 创建商品-SKU 映射
        const mappings = (createdSkus || []).map((sku, index) => ({
            product_id: productId,
            sku_id: sku.id,
            sort_order: skus[index]?.sort_order || index
        }))

        if (mappings.length > 0) {
            const { error: mapError } = await client
                .from('product_sku_map')
                .insert(mappings)

            if (mapError) {
                console.error('SKU 映射创建失败:', mapError)
                return { success: true, count: createdSkus?.length || 0, skuIds: createdSkus?.map(s => s.id), error: `SKU 已创建但映射失败: ${mapError.message}` }
            }
        }

        return { success: true, count: createdSkus?.length || 0, skuIds: createdSkus?.map(s => s.id) }
    },

    /**
     * 智能更新商品 SKU（更新已有、删除移除、插入新增）
     * @param productId 商品ID
     * @param skus SKU 数组（含 id 的为更新，不含的为新增）
     */
    /**
     * 更新商品 SKU 配置（支持自定义模式和共享模式）
     * @param productId 商品ID
     * @param options 配置选项
     */
    async updateProductSkus(productId: string, options: {
        mode: 'custom' | 'shared'
        skus?: {
            id?: string
            spec_combination: Record<string, string>
            product_type: 'virtual' | 'shared_account' | 'one_time_cdk'
            image?: string
            intro?: string
            price: number
            duration?: number
            sort_order: number
        }[]
        sharedTag?: number
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 共享模式：直接重置映射关系
        if (options.mode === 'shared') {
            if (!options.sharedTag) return { success: false, error: '缺少共享规格组 Tag' }

            // 获取共享组的 SKU
            const { data: sharedSkus, error: fetchError } = await client
                .from('product_skus')
                .select('id, sort_order')
                .eq('tag', options.sharedTag)

            if (fetchError) return { success: false, error: fetchError.message }
            if (!sharedSkus || sharedSkus.length === 0) return { success: false, error: '该共享组没有 SKU' }

            // 事务性操作：删除旧映射 -> 建立新映射
            // Delete old mappings
            const { error: delError } = await client
                .from('product_sku_map')
                .delete()
                .eq('product_id', productId)

            if (delError) return { success: false, error: delError.message }

            // Insert new mappings
            const mappings = sharedSkus.map(sku => ({
                product_id: productId,
                sku_id: sku.id,
                sort_order: sku.sort_order
            }))

            const { error: mapError } = await client
                .from('product_sku_map')
                .insert(mappings)

            if (mapError) return { success: false, error: mapError.message }

            return { success: true }
        }

        // 2. 自定义模式：智能更新
        // 获取当前映射
        const { data: currentMappings } = await client
            .from('product_sku_map')
            .select('sku_id, sku:product_skus!inner(tag)')
            .eq('product_id', productId)

        const currentSkuIds = new Set((currentMappings || []).map(m => m.sku_id))
        const newSkus = options.skus || []
        const newSkuIds = new Set(newSkus.filter(s => s.id).map(s => s.id))

        // A. 处理需要移除的 SKU
        const toRemoveIds = [...currentSkuIds].filter(id => !newSkuIds.has(id))
        if (toRemoveIds.length > 0) {
            // 删除映射
            await client.from('product_sku_map')
                .delete()
                .eq('product_id', productId)
                .in('sku_id', toRemoveIds)

            // 可选：清理孤儿 SKU (tag 为 null 且无其他引用的)
            // 这里暂不实现复杂的孤儿清理，避免误删
        }

        // B. 更新已有 SKU (仅限私有 SKU，即 tag 为空的)
        // 实际上 we trust the client logic: if it sends an ID, we update it.
        // But we should verify ownership? For now simplified.
        const toUpdate = newSkus.filter(s => s.id && currentSkuIds.has(s.id))
        for (const sku of toUpdate) {
            await client.from('product_skus')
                .update({
                    product_type: sku.product_type,
                    spec_combination: sku.spec_combination,
                    image: sku.image || null,
                    intro: sku.intro || null,
                    price: sku.price,
                    duration: sku.duration || null,
                    sort_order: sku.sort_order
                })
                .eq('id', sku.id)
                .is('tag', null) // 仅更新私有 SKU
        }

        // C. 插入新 SKU
        const toInsert = newSkus.filter(s => !s.id)
        if (toInsert.length > 0) {
            const insertData = toInsert.map(sku => ({
                product_type: sku.product_type, // 自定义 SKU 必须携带类型
                spec_combination: sku.spec_combination,
                image: sku.image || null,
                intro: sku.intro || null,
                price: sku.price,
                duration: sku.duration || null,
                sort_order: sku.sort_order,
                tag: null // 私有 SKU
            }))

            const { data: createdSkus, error: createError } = await client
                .from('product_skus')
                .insert(insertData)
                .select('id')

            if (createError) return { success: false, error: createError.message }

            // 建立映射
            const newMappings = (createdSkus || []).map((sku, idx) => ({
                product_id: productId,
                sku_id: sku.id,
                sort_order: toInsert[idx].sort_order
            }))

            if (newMappings.length > 0) {
                await client.from('product_sku_map').insert(newMappings)
            }
        }

        return { success: true }
    },

    /**
     * 获取商品完整数据（含规格和SKU）
     * 通过 product_sku_map 映射表查询
     * @param productId 商品ID
     */
    async getProductWithSkus(productId: string): Promise<{
        success: boolean
        product?: AdminProduct
        specs?: { name: string; values: { id: string; value: string; sort_order: number }[] }[]
        skus?: any[]
        error?: string
    }> {
        const client = getAdminSupabaseClient()

        // 获取商品基本信息
        const { data: product, error: productError } = await client
            .from('products')
            .select('*')
            .eq('id', productId)
            .single()

        if (productError) {
            return { success: false, error: productError.message }
        }

        // 通过 product_sku_map 映射表查询 SKU
        const { data: skuMappings, error: skuError } = await client
            .from('product_sku_map')
            .select('*, product_skus(*)')
            .eq('product_id', productId)
            .order('sort_order', { ascending: true })

        console.log('[getProductWithSkus] productId:', productId)
        console.log('[getProductWithSkus] skuMappings:', skuMappings)
        console.log('[getProductWithSkus] skuError:', skuError)

        if (skuError) {
            console.error('SKU query error:', skuError)
            return { success: false, error: skuError.message }
        }

        // 提取 SKU 数据
        const skus = (skuMappings || []).map(m => (m as any).product_skus).filter(Boolean)
        console.log('[getProductWithSkus] extracted skus:', skus)

        // 从 SKU 中推导规格
        const specsMap = new Map<string, Set<string>>()

        if (skus && skus.length > 0) {
            skus.forEach(sku => {
                if (sku.spec_combination) {
                    Object.entries(sku.spec_combination).forEach(([key, value]) => {
                        if (!specsMap.has(key)) {
                            specsMap.set(key, new Set())
                        }
                        specsMap.get(key)?.add(String(value))
                    })
                }
            })
        }

        const specs = Array.from(specsMap.entries()).map(([name, valuesSet]) => ({
            id: name,
            name,
            sort_order: 0,
            values: Array.from(valuesSet).map((v, i) => ({
                id: v,
                value: v,
                sort_order: i
            }))
        }))

        return { success: true, product, specs, skus: skus || [] }
    },

    /**
     * @deprecated 请使用 product_sku_map 管理 SKU 关联
     */
    async clearProductSpecsAndSkus(productId: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 删除 SKU 映射
        const { error } = await client
            .from('product_sku_map')
            .delete()
            .eq('product_id', productId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 批量获取 SKU 详情（用于回显）
     */
    async getSkusByIds(ids: string[]): Promise<{ success: boolean; skus?: any[]; error?: string }> {
        if (!ids.length) return { success: true, skus: [] }
        const client = getAdminSupabaseClient()

        // Need to join product to get product Name
        // product_skus does not have product_id directly (it's via map)
        // BUT wait, `product_skus` table in my thought process earlier had `product_type`.
        // `product_sku_map` connects Product -> SKU.
        // So I need to query `product_sku_map` to get product info.

        const { data, error } = await client
            .from('product_sku_map')
            .select(`
                sku_id,
                product:products(id, product_name),
                sku:product_skus(*)
            `)
            .in('sku_id', ids)

        if (error) return { success: false, error: error.message }

        // Flatten
        const skus = data?.map((item: any) => ({
            ...item.sku,
            productId: item.product?.id,
            productName: item.product?.product_name
        })) || []

        return { success: true, skus }
    }
}

// ========================================
// CDK 管理 API
// ========================================
// NOTE: adminCdkApi 已迁移到 @/api/admin/cdk.ts



// ========================================
// 用户管理 API
// ========================================
export const adminUserApi = {
    /**
     * 获取用户列表
     */
    async getUsers(params?: {
        status?: 'active' | 'disabled'
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; users: AdminUser[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        let query = client
            .from('profiles')
            .select('*', { count: 'exact' })

        if (params?.status) {
            query = query.eq('status', params.status)
        }

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) {
            return { success: false, users: [], total: 0, error: error.message }
        }

        return { success: true, users: data || [], total: count || 0 }
    },

    /**
     * 根据 UID 查询用户
     */
    async getUserByUid(uid: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
        const client = getAdminSupabaseClient()
        console.log('[getUserByUid] Querying profiles for UID:', uid)

        const { data, error } = await client
            .from('profiles')
            .select('*')
            .eq('uid', uid)
            .single()

        if (error) {
            console.error('[getUserByUid] Error:', error.message, error.code, error.details)
            return { success: false, error: `用户不存在 (${error.code}: ${error.message})` }
        }

        console.log('[getUserByUid] Found user:', data)
        return { success: true, user: data }
    },

    /**
     * 禁用/启用用户
     */
    async toggleStatus(id: string, status: 'active' | 'disabled'): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('profiles')
            .update({ status })
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },
}

// ========================================
// 消息管理 API
// ========================================
export const adminMessageApi = {
    /**
     * 获取消息列表
     */
    async getMessages(params?: {
        user_uid?: string
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; messages: AdminMessage[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        let query = client
            .from('messages')
            .select('*', { count: 'exact' })

        if (params?.user_uid) {
            query = query.eq('user_uid', params.user_uid)
        }

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) {
            return { success: false, messages: [], total: 0, error: error.message }
        }

        return { success: true, messages: data || [], total: count || 0 }
    },

    /**
     * 发送消息（增强版：支持 type, link, 自动解析 user_id）
     */
    async sendMessage(
        userUid: string,
        title: string,
        content: string,
        type: 'system' | 'order' | 'activity' | 'security' = 'system',
        link?: string
    ): Promise<{
        success: boolean
        message_id?: string
        error?: string
    }> {
        const client = getAdminSupabaseClient()

        // 先检查用户是否存在并获取 user_id (UUID)
        const { data: profile, error: profileError } = await client
            .from('profiles')
            .select('id, uid')
            .eq('uid', userUid)
            .single()

        if (profileError || !profile) {
            return { success: false, error: '用户不存在，禁止发送消息' }
        }

        const { data, error } = await client
            .from('messages')
            .insert({
                user_id: profile.id,  // UUID for RLS
                user_uid: userUid,    // Keep for legacy/display
                title,
                content,
                type,
                link: link || null,
            })
            .select('id')
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, message_id: data.id }
    },
}

// ========================================
// 共享规格管理 API
// ========================================
export interface SharedSkuGroup {
    tag: number
    tag_name?: string
    skus: {
        id: string
        product_type: string
        spec_combination: Record<string, string>
        price: number
        duration: number | null
        intro: string | null
        image: string | null
        created_at: string
    }[]
}

export const adminSharedSkuApi = {
    /**
     * 获取所有共享规格组（按 tag 分组）
     */
    async getSharedSkuGroups(): Promise<{ success: boolean; groups: SharedSkuGroup[]; error?: string }> {
        const client = getAdminSupabaseClient()

        // 查询所有有 tag 的 SKU（未关联商品的独立 SKU）
        const { data, error } = await client
            .from('product_skus')
            .select('*')
            .not('tag', 'is', null)
            .order('tag', { ascending: true })
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, groups: [], error: error.message }
        }

        // 按 tag 分组
        const groupMap = new Map<number, SharedSkuGroup>()
        for (const sku of data || []) {
            const tag = sku.tag as number
            if (!groupMap.has(tag)) {
                groupMap.set(tag, {
                    tag,
                    tag_name: sku.tag_name || '', // 读取 tag_name
                    skus: []
                })
            }
            groupMap.get(tag)!.skus.push(sku)
        }

        return { success: true, groups: Array.from(groupMap.values()) }
    },

    /**
     * 获取下一个可用的 tag 编号
     */
    async getNextTag(): Promise<{ success: boolean; tag: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('product_skus')
            .select('tag')
            .not('tag', 'is', null)
            .order('tag', { ascending: false })
            .limit(1)

        if (error) {
            return { success: false, tag: 1, error: error.message }
        }

        const maxTag = data?.[0]?.tag || 0
        return { success: true, tag: maxTag + 1 }
    },

    /**
     * 创建共享规格组（只写 product_skus 表）
     */
    async createSharedSkuGroup(tag: number, skus: {
        product_type: 'virtual' | 'shared_account' | 'one_time_cdk'
        spec_combination: Record<string, string>
        price: number
        duration?: number | null
        intro?: string
        image?: string
        sort_order: number
    }[], tagName?: string): Promise<{ success: boolean; count: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const skuData = skus.map(sku => ({
            tag,
            tag_name: tagName || null, // 写入 tag_name
            product_type: sku.product_type,
            spec_combination: sku.spec_combination,
            price: sku.price,
            duration: sku.duration || null,
            intro: sku.intro || null,
            image: sku.image || null,
            sort_order: sku.sort_order
        }))

        const { error } = await client
            .from('product_skus')
            .insert(skuData)

        if (error) {
            return { success: false, count: 0, error: error.message }
        }

        return { success: true, count: skuData.length }
    },

    /**
     * 获取指定 tag 的规格组详情
     */
    async getSkusByTag(tag: number): Promise<{ success: boolean; skus: any[]; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('product_skus')
            .select('*')
            .eq('tag', tag)
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, skus: [], error: error.message }
        }

        return { success: true, skus: data || [] }
    },

    /**
     * 获取使用某共享组的所有商品 (用于查看)
     */
    async getProductsBySharedTag(tag: number): Promise<{ success: boolean; products?: any[]; error?: string }> {
        const client = getAdminSupabaseClient()

        // Step 1: Find all SKU IDs for this tag
        const { data: skus } = await client
            .from('product_skus')
            .select('id')
            .eq('tag', tag)

        if (!skus || !skus.length) return { success: true, products: [] }
        const skuIds = skus.map(s => s.id)

        // Step 2: Find all product_ids from map
        const { data: maps, error: mapError } = await client
            .from('product_sku_map')
            .select('product_id')
            .in('sku_id', skuIds)

        if (mapError) return { success: false, error: mapError.message }
        if (!maps || !maps.length) return { success: true, products: [] }

        // Deduplicate product IDs
        const productIds = [...new Set(maps.map(m => m.product_id))]

        // Step 3: Fetch products
        const { data: products, error: prodError } = await client
            .from('products')
            .select('id, product_name, image, status')
            .in('id', productIds)

        if (prodError) return { success: false, error: prodError.message }
        return { success: true, products: products || [] }
    },

    /**
     * 更新共享规格组（智能更新：增删改）
     */
    async updateSharedSkuGroup(tag: number, skus: {
        id?: string
        product_type: 'virtual' | 'shared_account' | 'one_time_cdk'
        spec_combination: Record<string, string>
        price: number
        duration?: number | null
        intro?: string
        image?: string
        sort_order: number
    }[], tagName?: string): Promise<{ success: boolean; updated: number; inserted: number; deleted: number; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 获取现有 SKU
        const { data: existingSkus } = await client
            .from('product_skus')
            .select('id')
            .eq('tag', tag)

        // 0. 预先查找关联了该共享组的所有商品 ID
        // 用于当有新 SKU 插入时，自动同步建立映射
        let linkedProductIds: string[] = []
        const existingIdsArr = (existingSkus || []).map(s => s.id)

        if (existingIdsArr.length > 0) {
            const { data: linked } = await client
                .from('product_sku_map')
                .select('product_id')
                .in('sku_id', existingIdsArr)

            if (linked) {
                // 去重
                linkedProductIds = [...new Set(linked.map(l => l.product_id))]
            }
        }

        const existingIds = new Set(existingIdsArr)
        const keepIds = new Set(skus.filter(s => s.id).map(s => s.id))

        // 删除不在新列表中的
        const toDelete = [...existingIds].filter(id => !keepIds.has(id))
        let deletedCount = 0
        if (toDelete.length > 0) {
            const { count } = await client
                .from('product_skus')
                .delete({ count: 'exact' })
                .in('id', toDelete)
            deletedCount = count || 0
        }

        // 更新已有
        let updatedCount = 0
        for (const sku of skus.filter(s => s.id && existingIds.has(s.id))) {
            const { error } = await client
                .from('product_skus')
                .update({
                    tag_name: tagName || null, // 同步更新 tag_name
                    product_type: sku.product_type,
                    spec_combination: sku.spec_combination,
                    price: sku.price,
                    duration: sku.duration || null,
                    intro: sku.intro || null,
                    image: sku.image || null,
                    sort_order: sku.sort_order
                })
                .eq('id', sku.id)
            if (!error) updatedCount++
        }

        // 插入新的，并传播给关联商品
        const toInsert = skus.filter(s => !s.id)
        let insertedCount = 0
        if (toInsert.length > 0) {
            const insertData = toInsert.map(sku => ({
                tag,
                tag_name: tagName || null, // 写入 tag_name
                product_type: sku.product_type,
                spec_combination: sku.spec_combination,
                price: sku.price,
                duration: sku.duration || null,
                intro: sku.intro || null,
                image: sku.image || null,
                sort_order: sku.sort_order
            }))

            const { data: newSkus, error } = await client
                .from('product_skus')
                .insert(insertData)
                .select('id, sort_order') // 必须返回 id 以建立映射

            if (!error && newSkus) {
                insertedCount = newSkus.length

                // 如果有商品关联了此共享组，自动为它们添加新 SKU 的映射
                if (linkedProductIds.length > 0) {
                    const newMappings: any[] = []
                    for (const pid of linkedProductIds) {
                        for (const ns of newSkus) {
                            newMappings.push({
                                product_id: pid,
                                sku_id: ns.id,
                                sort_order: ns.sort_order ?? 0
                            })
                        }
                    }

                    if (newMappings.length > 0) {
                        await client.from('product_sku_map').insert(newMappings)
                    }
                }
            }
        }

        return { success: true, updated: updatedCount, inserted: insertedCount, deleted: deletedCount }
    },

    /**
     * 删除共享规格组
     */
    async deleteSharedSkuGroup(tag: number): Promise<{ success: boolean; count: number; error?: string }> {
        const client = getAdminSupabaseClient()

        // 检查是否有商品关联
        const { data: mappings } = await client
            .from('product_sku_map')
            .select('id, sku:product_skus!inner(tag)')
            .eq('sku.tag', tag)
            .limit(1)

        if (mappings && mappings.length > 0) {
            return { success: false, count: 0, error: '该规格组已被商品关联，请先解除关联' }
        }

        const { count, error } = await client
            .from('product_skus')
            .delete({ count: 'exact' })
            .eq('tag', tag)

        if (error) {
            return { success: false, count: 0, error: error.message }
        }

        return { success: true, count: count || 0 }
    },
}

// ========================================
// 商品分类管理 API
// ========================================
export const adminCategoryApi = {
    /**
     * 获取分类列表（含商品数量，批量查询优化）
     */
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

        // 批量查询每个分类的商品数量（消除 N+1）
        let countMap: Record<string, number> = {}
        if (categoryIds.length > 0) {
            const { data: products } = await client
                .from('products')
                .select('category_id')
                .in('category_id', categoryIds)

            // 统计每个分类的商品数量
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

    /**
     * 创建分类
     */
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

    /**
     * 更新分类
     */
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

    /**
     * 删除分类（有商品时禁止删除）
     */
    async deleteCategory(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 检查是否有商品
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

    /**
     * 批量更新分类排序
     */
    async batchUpdateSort(items: { id: string; sort_order: number }[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 使用事务批量更新
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

// ========================================
// 后台部门管理 API
// ========================================
export const adminDepartmentApi = {
    /**
     * 获取部门列表
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

    /**
     * 后台用户登录
     */
    async login(email: string, password: string): Promise<{
        success: boolean
        user?: AdminBackendUser
        error?: string
    }> {
        const client = getAdminSupabaseClient()

        // 计算密码哈希
        const encoder = new TextEncoder()
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password))
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const password_hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

        const { data, error } = await client
            .from('admin_users')
            .select(`
                *,
                department:admin_departments(id, name, permissions)
            `)
            .eq('email', email)
            .eq('password_hash', password_hash)
            .eq('status', 'enabled')
            .single()

        if (error || !data) {
            return { success: false, error: '邮箱或密码错误，或账号已禁用' }
        }

        return { success: true, user: data }
    },
}

// ========================================
// 图片分类管理 API
// ========================================


// ========================================
// 图片管理 API
// ========================================


// ========================================
// 轮播图管理 API
// ========================================


// ========================================
// 系统配置管理 API (R2 密钥等)
// ========================================




// ========================================
// 优惠券管理 API
// ========================================
// NOTE: adminCouponApi 已迁移到 @/api/admin/coupon.ts
// 以下代码保留供参考，但不再导出


// ========================================
// 充值档位管理 API
// ========================================

export interface RechargeTier {
    id: string
    amount: number
    bonus: number
    sort_order: number
    status: 'on' | 'off'
    created_at: string
}

export const adminRechargeApi = {
    /**
     * 获取所有充值档位
     */
    async getTiers(): Promise<{ success: boolean; data: RechargeTier[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('recharge_tiers')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, data: [], error: error.message }
        }

        return { success: true, data: data || [] }
    },

    /**
     * 创建充值档位
     */
    async createTier(tierData: {
        amount: number
        bonus: number
        sort_order: number
        status: 'on' | 'off'
    }): Promise<{ success: boolean; data?: RechargeTier; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('recharge_tiers')
            .insert(tierData)
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data }
    },

    /**
     * 更新充值档位
     */
    async updateTier(id: string, tierData: Partial<{
        amount: number
        bonus: number
        sort_order: number
        status: 'on' | 'off'
    }>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('recharge_tiers')
            .update(tierData)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 删除充值档位
     */
    async deleteTier(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('recharge_tiers')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

}

// 导出所有管理 API
export const adminApi = {
    product: adminProductApi,
    cdk: adminCdkApi,
    order: adminOrderApi,
    user: adminUserApi,
    message: adminMessageApi,
    category: adminCategoryApi,
    department: adminDepartmentApi,
    backendUser: adminBackendUserApi,
    image: adminImageApi,
    banner: adminBannerApi,
    imageCategory: adminImageCategoryApi,
    settings: adminSettingsApi,
    coupon: adminCouponApi,
    recharge: adminRechargeApi,
}

export default adminApi

// ========================================
// 常见问题 (FAQ) 管理 API
// ========================================

export interface AdminFaqCategory {
    id: string
    name: string
    sort_order: number
    is_active: boolean
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
    product?: AdminProduct
}



// ========================================
// SKU 全局管理 API
// ========================================
export const adminGlobalSkuApi = {
    /**
     * 获取所有 SKU (全局管理)
     */
    async getAllSkus(params?: { showUnlinkedOnly?: boolean }): Promise<{ success: boolean; skus: any[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const query = client
            .from('product_skus')
            .select(`
                *,
                product_sku_map (
                    product:products (id, product_name)
                )
            `)
            .is('tag', null) // Filter out shared SKUs (they are managed in Shared SKU Groups)
            .order('created_at', { ascending: false })

        const { data, error } = await query
        if (error) return { success: false, skus: [], error: error.message }

        // Transform and filter in memory
        let result = data.map((s: any) => {
            const products = s.product_sku_map?.map((m: any) => m.product).filter((p: any) => p) || []
            return {
                ...s,
                linked_products: products,
                product_names: products.map((p: any) => p.product_name).join(', '),
                is_linked: products.length > 0
            }
        })

        if (params?.showUnlinkedOnly) {
            result = result.filter(s => !s.is_linked)
        }

        return { success: true, skus: result }
    },

    /**
     * 批量删除 SKU
     * 会同时删除 CDK-SKU 映射表中的关联记录
     */
    async deleteSkus(ids: string[]): Promise<{ success: boolean; error?: string }> {
        if (!ids.length) return { success: true }

        const client = getAdminSupabaseClient()

        // 1. 先删除 CDK-SKU 映射
        await client
            .from('cdk_sku_map')
            .delete()
            .in('sku_id', ids)

        // 2. 再删除 SKU
        const { error } = await client
            .from('product_skus')
            .delete()
            .in('id', ids)

        return { success: !error, error: error?.message }
    }
}
