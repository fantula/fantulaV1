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
export { adminCouponApi, type AdminCoupon as AdminCouponNew } from './coupon'
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

export interface AdminCDK {
    id: string
    product_id: string
    code: string
    cdk_type: 'virtual' | 'shared' | 'one_time'
    stock: number
    max_slots: number
    account_data: Record<string, any> | null
    status: 'idle' | 'using' | 'used'
    created_at: string
    used_at: string | null
    product?: AdminProduct
    // 从 cdk_sku_map 映射表获取的 SKU 绑定关系
    sku_mappings?: { id: string; sku_id: string; sku?: any }[]
}

export interface AdminOrder {
    id: string
    order_no: string | null
    user_uid: string
    product_id: string
    sku_id: string | null
    order_type: 'virtual' | 'shared_account' | 'one_time_cdk' // Updated values
    purchase_mode?: 'new' | 'renew' // Optional if we kept it or for backward compat? No, DB dropped default and we reused order_type column.
    // Actually we reused the column 'order_type' for product type.
    // 'purchase_mode' concept is removed from DB schema.
    related_order_id: string | null
    total_amount: number | null // Renamed from amount_paid
    payment_method: 'wallet' | 'alipay' | 'wechat' | null
    start_time: string
    end_time: string
    status: 'pending_delivery' | 'active' | 'refunding' | 'refunded' | 'expired' // Updated
    created_at: string
    product?: AdminProduct
    sku?: any
    slot_occupancy_ids?: string[] // [Updated] 车位ID数组
    // 从 order_deliveries 获取的交付记录
    deliveries?: AdminOrderDelivery[]
}

export interface AdminOrderDelivery {
    id: string
    order_id: string
    order_no: string | null
    product_id: string
    sku_id: string | null
    cdk_id: string | null
    delivery_content: Record<string, any> | null
    delivery_status: 'delivered' | 'released' | 'refunded' | 'failed'
    delivered_at: string | null
    released_at: string | null
    created_at: string
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

export interface AdminCoupon {
    id: string
    code: string
    name: string
    type: 'flat' | 'balance' | 'product'
    value: number
    min_usage: number
    product_ids: string[]
    total_quantity: number
    used_quantity: number
    start_date: string | null
    end_date: string | null
    status: boolean
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
// 以下代码保留供参考，但不再导出
const _legacyAdminCdkApi = {
    /**
     * 获取 CDK 列表（包含 SKU 映射关系）
     */
    async getCdks(params?: {
        product_id?: string
        cdk_type?: string  // 新增：CDK 类型筛选
        status?: string
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; cdks: AdminCDK[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        let query = client
            .from('cdks')
            .select(`
                *,
                product:products(id, product_name),
                sku_mappings:cdk_sku_map(id, sku_id, sku:product_skus(id, spec_combination, price)),
                slot_occupancies(id, slot_index, status)
            `, { count: 'exact' })

        if (params?.product_id) {
            query = query.eq('product_id', params.product_id)
        }
        if (params?.cdk_type) {
            query = query.eq('cdk_type', params.cdk_type)
        }
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
            return { success: false, cdks: [], total: 0, error: error.message }
        }

        return { success: true, cdks: data || [], total: count || 0 }
    },

    /**
     * 批量创建 CDK（使用 cdk_sku_map 映射表）
     * @param data.sku_ids 关联的 SKU ID 数组
     * @param data.product_id 关联的商品 ID
     * @param data.cdk_type CDK 类型
     * @param data.codes 激活码数组
     * @param data.max_slots 账号合租类型的最大车位数
     * @param data.stock 虚拟充值类型的库存数量
     * @param data.account_data 账号数据 JSON
     */
    async createCdks(data: {
        sku_ids: string[]  // 改为 sku_ids
        product_id: string
        cdk_type: 'virtual' | 'shared' | 'one_time'
        codes: string[]
        max_slots?: number
        stock?: number
        account_data?: Record<string, any>
    }): Promise<{ success: boolean; count: number; error?: string }> {
        const client = getAdminSupabaseClient()

        // Virtual 类型检查：检查是否已存在匹配这些 SKU 的 Virtual CDK
        if (data.cdk_type === 'virtual') {
            // 查询已有的 virtual CDK 及其 SKU 映射
            const { data: existingMappings } = await client
                .from('cdk_sku_map')
                .select(`
                    sku_id,
                    cdk:cdks!inner(id, cdk_type, product_id)
                `)
                .in('sku_id', data.sku_ids)
                .eq('cdk.product_id', data.product_id)
                .eq('cdk.cdk_type', 'virtual')

            if (existingMappings && existingMappings.length > 0) {
                return {
                    success: false,
                    count: 0,
                    error: '存在 SKU 已有虚拟库存资源，请在 CDK 列表中编辑现有资源'
                }
            }
        }

        let cdksToInsert: any[] = []

        if (data.cdk_type === 'shared') {
            // Shared 类型：每条 CDK 代表一个真实账号，stock 保持默认 1
            cdksToInsert = data.codes.map(code => ({
                product_id: data.product_id,
                code,
                cdk_type: data.cdk_type,
                max_slots: data.max_slots || 1,
                stock: 1, // 合租类型库存由 max_slots 控制，stock 固定为 1
                account_data: data.account_data || null,
                status: 'idle',
            }))
        } else if (data.cdk_type === 'virtual') {
            // Virtual 类型：只创建 1 条
            const virtualStock = data.stock || 1
            cdksToInsert = [{
                product_id: data.product_id,
                code: data.codes[0] || `VIRTUAL-${data.product_id}-${Date.now()}`,
                cdk_type: data.cdk_type,
                max_slots: 1,
                stock: virtualStock,
                account_data: data.account_data || null,
                status: 'idle',
            }]
        } else {
            // One-time 类型：每条 code 一条 CDK，每个只能用一次
            cdksToInsert = data.codes.map(code => ({
                product_id: data.product_id,
                code,
                cdk_type: data.cdk_type,
                max_slots: 1,
                stock: 1, // 一次性激活码 stock 固定为 1
                account_data: data.account_data || null,
                status: 'idle',
            }))
        }

        // 1. 创建 CDK 记录
        const { data: createdCdks, error: cdkError } = await client
            .from('cdks')
            .insert(cdksToInsert)
            .select('id')

        if (cdkError) {
            return { success: false, count: 0, error: cdkError.message }
        }

        // 2. 创建 CDK ↔ SKU 映射
        const mappings: { cdk_id: string; sku_id: string }[] = []
        for (const cdk of createdCdks || []) {
            for (const skuId of data.sku_ids) {
                mappings.push({
                    cdk_id: cdk.id,
                    sku_id: skuId
                })
            }
        }

        if (mappings.length > 0) {
            const { error: mapError } = await client
                .from('cdk_sku_map')
                .insert(mappings)

            if (mapError) {
                // 映射失败，但 CDK 已创建，返回警告
                console.error('CDK SKU 映射创建失败:', mapError)
                return { success: true, count: createdCdks?.length || 0, error: `CDK 已创建但 SKU 映射失败: ${mapError.message}` }
            }
        }

        // 3. 合租类型：创建 slot_occupancies 记录
        if (data.cdk_type === 'shared' && createdCdks && createdCdks.length > 0) {
            const maxSlots = Math.min(Math.max(data.max_slots || 1, 1), 10) // 限制 1~10
            const slotRecords: { cdk_id: string; slot_index: number; status: string }[] = []

            for (const cdk of createdCdks) {
                for (let i = 1; i <= maxSlots; i++) {
                    slotRecords.push({
                        cdk_id: cdk.id,
                        slot_index: i,
                        status: 'idle'
                    })
                }
            }

            if (slotRecords.length > 0) {
                const { error: slotError } = await client
                    .from('slot_occupancies')
                    .insert(slotRecords)

                if (slotError) {
                    console.error('槽位记录创建失败:', slotError)
                    return { success: true, count: createdCdks?.length || 0, error: `CDK 已创建但槽位创建失败: ${slotError.message}` }
                }
            }
        }

        return { success: true, count: createdCdks?.length || 0 }
    },

    /**
     * 删除 CDK（仅允许删除 idle 状态）
     */
    async deleteCdk(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 先检查状态
        const { data: cdk } = await client
            .from('cdks')
            .select('status')
            .eq('id', id)
            .single()

        if (cdk?.status !== 'idle') {
            return { success: false, error: '只能删除未使用的 CDK' }
        }

        // 检查是否有关联订单
        const { count: orderCount } = await client
            .from('order_deliveries')
            .select('*', { count: 'exact', head: true })
            .eq('cdk_id', id)

        if (orderCount && orderCount > 0) {
            return { success: false, error: `无法删除：有 ${orderCount} 笔订单关联到此 CDK` }
        }

        const { error } = await client
            .from('cdks')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 批量删除 CDK（仅允许删除 idle 状态）
     */
    async deleteCdks(ids: string[]): Promise<{ success: boolean; count: number; error?: string }> {
        if (!ids.length) return { success: true, count: 0 }

        const client = getAdminSupabaseClient()

        // 批量执行删除，数据库 RLS 或 status 检查建议由后端逻辑或 RPC 处理，
        // 这里采用简单的直接删除符合条件的记录
        const { data, error, count } = await client
            .from('cdks')
            .delete({ count: 'exact' })
            .in('id', ids)
            .eq('status', 'idle')

        if (error) {
            return { success: false, count: 0, error: error.message }
        }

        return { success: true, count: count || 0 }
    },

    /**
     * CDK 上架（恢复为可用状态）
     * 仅允许将 disabled 状态的 CDK 上架
     */
    async enableCdk(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data: cdk } = await client
            .from('cdks')
            .select('status')
            .eq('id', id)
            .single()

        if (cdk?.status !== 'disabled') {
            return { success: false, error: '只能上架已下架的 CDK' }
        }

        const { error } = await client
            .from('cdks')
            .update({ status: 'idle' })
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * CDK 下架（禁用）
     * 仅允许将 idle 状态的 CDK 下架
     */
    async disableCdk(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data: cdk } = await client
            .from('cdks')
            .select('status')
            .eq('id', id)
            .single()

        if (cdk?.status !== 'idle') {
            return { success: false, error: '只能下架空闲状态的 CDK' }
        }

        const { error } = await client
            .from('cdks')
            .update({ status: 'disabled' })
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 批量上架 CDK
     */
    async enableCdks(ids: string[]): Promise<{ success: boolean; count: number; error?: string }> {
        if (!ids.length) return { success: true, count: 0 }

        const client = getAdminSupabaseClient()

        const { error, count } = await client
            .from('cdks')
            .update({ status: 'idle' })
            .in('id', ids)
            .eq('status', 'disabled')

        if (error) {
            return { success: false, count: 0, error: error.message }
        }

        return { success: true, count: count || 0 }
    },

    /**
     * 批量下架 CDK
     */
    async disableCdks(ids: string[]): Promise<{ success: boolean; count: number; error?: string }> {
        if (!ids.length) return { success: true, count: 0 }

        const client = getAdminSupabaseClient()

        const { error, count } = await client
            .from('cdks')
            .update({ status: 'disabled' })
            .in('id', ids)
            .eq('status', 'idle')

        if (error) {
            return { success: false, count: 0, error: error.message }
        }

        return { success: true, count: count || 0 }
    },

    /**
     * 获取单个 CDK 详情（包含 SKU 映射）
     */
    async getCdkById(id: string): Promise<{ success: boolean; cdk?: AdminCDK; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('cdks')
            .select(`
                *,
                product:products(id, product_name, category_id),
                sku_mappings:cdk_sku_map(id, sku_id, sku:product_skus(id, spec_combination, price, product_type))
            `)
            .eq('id', id)
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, cdk: data }
    },

    /**
     * 更新 CDK (允许修改 max_slots, code, account_data, stock)
     * 注意：SKU 绑定现在通过映射表管理，不再在此函数处理
     */
    async updateCdk(id: string, data: {
        max_slots?: number
        code?: string
        account_data?: Record<string, any>
        stock?: number
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 获取当前 CDK 信息
        const { data: currentCdk } = await client
            .from('cdks')
            .select('cdk_type, max_slots')
            .eq('id', id)
            .single()

        if (!currentCdk) {
            return { success: false, error: 'CDK 不存在' }
        }

        // 合租类型：验证和管理 max_slots
        if (currentCdk.cdk_type === 'shared' && data.max_slots !== undefined) {
            const newMaxSlots = Math.min(Math.max(data.max_slots, 1), 10) // 限制 1~10
            const oldMaxSlots = currentCdk.max_slots || 1

            // 获取已占用槽位数
            const { count: occupiedCount } = await client
                .from('slot_occupancies')
                .select('*', { count: 'exact', head: true })
                .eq('cdk_id', id)
                .eq('status', 'occupied')

            if (newMaxSlots < (occupiedCount || 0)) {
                return { success: false, error: `不能减少到 ${newMaxSlots}，当前已使用 ${occupiedCount} 个车位` }
            }

            // 检查现有槽位数量
            const { count: existingSlotCount } = await client
                .from('slot_occupancies')
                .select('*', { count: 'exact', head: true })
                .eq('cdk_id', id)

            // 如果没有任何槽位（旧数据），创建全部
            if (!existingSlotCount || existingSlotCount === 0) {
                const allSlots: { cdk_id: string; slot_index: number; status: string }[] = []
                for (let i = 0; i < newMaxSlots; i++) {
                    allSlots.push({ cdk_id: id, slot_index: i, status: 'idle' })
                }
                if (allSlots.length > 0) {
                    const { error: slotError } = await client.from('slot_occupancies').insert(allSlots)
                    if (slotError) {
                        return { success: false, error: `创建槽位失败: ${slotError.message}` }
                    }
                }
            }
            // 如果增加
            else if (newMaxSlots > oldMaxSlots) {
                const newSlots: { cdk_id: string; slot_index: number; status: string }[] = []
                for (let i = oldMaxSlots; i < newMaxSlots; i++) {
                    newSlots.push({ cdk_id: id, slot_index: i, status: 'idle' })
                }
                if (newSlots.length > 0) {
                    const { error: slotError } = await client.from('slot_occupancies').insert(newSlots)
                    if (slotError) {
                        return { success: false, error: `增加槽位失败: ${slotError.message}` }
                    }
                }
            }

            // 如果减少（只删除 idle 的）
            if (newMaxSlots < oldMaxSlots) {
                const { error: delError } = await client
                    .from('slot_occupancies')
                    .delete()
                    .eq('cdk_id', id)
                    .gte('slot_index', newMaxSlots)
                    .eq('status', 'idle')

                if (delError) {
                    return { success: false, error: `删除槽位失败: ${delError.message}` }
                }
            }

            data.max_slots = newMaxSlots
        }

        // 构建更新对象
        const updateData: Record<string, any> = {}
        if (data.max_slots !== undefined) updateData.max_slots = data.max_slots
        if (data.code !== undefined) updateData.code = data.code
        if (data.account_data !== undefined) updateData.account_data = data.account_data
        if (data.stock !== undefined) updateData.stock = data.stock

        if (Object.keys(updateData).length === 0) {
            return { success: false, error: '没有可更新的数据' }
        }

        const { error } = await client
            .from('cdks')
            .update(updateData)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 获取 CDK 的 SKU 绑定列表
     */
    async getCdkSkuMappings(cdkId: string): Promise<{ success: boolean; mappings: any[]; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client
            .from('cdk_sku_map')
            .select(`
                id,
                sku_id,
                sku:product_skus(id, spec_combination, price, product_type),
                created_at
            `)
            .eq('cdk_id', cdkId)

        if (error) {
            return { success: false, mappings: [], error: error.message }
        }

        return { success: true, mappings: data || [] }
    },

    /**
     * 添加 CDK ↔ SKU 绑定
     * 简化版：完全信任前端传参，仅检查重复后直接插入
     */
    async addCdkSkuMapping(cdkId: string, skuId: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        console.log('[addCdkSkuMapping] params:', { cdkId, skuId })

        // 1. 检查是否已存在映射（使用 maybeSingle 避免 PGRST116 错误）
        const { data: existing } = await client
            .from('cdk_sku_map')
            .select('id')
            .eq('cdk_id', cdkId)
            .eq('sku_id', skuId)
            .maybeSingle()

        if (existing) {
            console.log('[addCdkSkuMapping] Already exists, skipping')
            return { success: true } // 静默成功，幂等操作
        }

        // 2. 直接插入
        const { error: insertError } = await client
            .from('cdk_sku_map')
            .insert({ cdk_id: cdkId, sku_id: skuId })

        console.log('[addCdkSkuMapping] Insert result:', { insertError })

        if (insertError) {
            return { success: false, error: insertError.message }
        }

        return { success: true }
    },

    /**
     * 删除 CDK ↔ SKU 绑定
     */
    async removeCdkSkuMapping(mappingId: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const { error } = await client
            .from('cdk_sku_map')
            .delete()
            .eq('id', mappingId)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },
}

// ========================================
// 订单管理 API
// ========================================
// NOTE: adminOrderApi 已迁移到 @/api/admin/order.ts
// 以下代码保留供参考，但不再导出
const _legacyAdminOrderApi = {
    /**
     * 获取订单列表（管理员视角）
     */
    async getOrders(params?: {
        user_uid?: string
        order_no?: string
        product_id?: string
        order_type?: 'virtual' | 'shared_account' | 'one_time_cdk' // 直接按 order_type 筛选
        status?: 'active' | 'expired'
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; orders: AdminOrder[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        let query = client
            .from('orders')
            .select(`
                *,
                product:products(id, product_name, image),
                sku:product_skus(id, spec_combination, price, product_type),
                deliveries:order_deliveries(id, delivery_status, delivered_at, cdk_id, expires_at),
                profile:profiles!user_id(id, uid, nickname, email)
            `, { count: 'exact' })

        // 用户UID筛选
        if (params?.user_uid) {
            query = query.eq('profile.uid', params.user_uid)
        }
        if (params?.order_no) {
            query = query.eq('order_no', params.order_no)
        }
        if (params?.product_id) {
            query = query.eq('product_id', params.product_id)
        }
        // 直接按 order_type 字段过滤
        if (params?.order_type) {
            query = query.eq('order_type', params.order_type)
        }

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) {
            return { success: false, orders: [], total: 0, error: error.message }
        }

        // 添加状态计算
        const now = new Date()
        let ordersWithStatus = (data || []).map(order => {
            const endTime = new Date(order.end_time)
            return {
                ...order,
                status: endTime < now ? 'expired' : 'active',
            }
        })

        if (params?.status) {
            ordersWithStatus = ordersWithStatus.filter(o => o.status === params.status)
        }

        return { success: true, orders: ordersWithStatus, total: count || 0 }
    },

    /**
     * 获取虚拟充值订单
     */
    async getVirtualRechargeList(params?: { page?: number; size?: number }) {
        return this.getOrders({
            order_type: 'virtual',
            limit: params?.size,
            offset: params && params.page ? (params.page - 1) * (params.size || 20) : 0
        })
    },

    /**
     * 获取拼车合租订单
     */
    async getShareOrderList(params?: { page?: number; size?: number }) {
        return this.getOrders({
            order_type: 'shared_account',
            limit: params?.size,
            offset: params && params.page ? (params.page - 1) * (params.size || 20) : 0
        })
    },

    /**
     * 获取 CDK/激活码订单
     */
    async getCdkOrderList(params?: { page?: number; size?: number }) {
        return this.getOrders({
            order_type: 'one_time_cdk',
            limit: params?.size,
            offset: params && params.page ? (params.page - 1) * (params.size || 20) : 0
        })
    },

    /**
     * 删除订单
     */
    async deleteOrder(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('orders').delete().eq('id', id)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 批量删除订单
     */
    async deleteOrders(ids: string[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client.from('orders').delete().in('id', ids)
        if (error) return { success: false, error: error.message }
        return { success: true }
    },
}

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


export interface AdminCoupon {
    id: string
    name: string
    type: 'flat' | 'balance' | 'product'
    value: number
    min_usage: number
    sku_ids: string[] // Changed from product_ids
    total_quantity: number | null // Plan quantity, nullable

    start_date: string | null
    end_date: string | null
    status: boolean
    created_at: string
}

// ========================================
// 优惠券管理 API
// ========================================
// NOTE: adminCouponApi 已迁移到 @/api/admin/coupon.ts
// 以下代码保留供参考，但不再导出
const _legacyAdminCouponApi = {
    /**
     * 获取优惠券规则列表
     */
    async getCoupons(params?: {
        type?: string
        status?: boolean
        limit?: number
        offset?: number
    }): Promise<{ success: boolean; coupons: AdminCoupon[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        let query = client
            .from('coupons')
            .select('*', { count: 'exact' })

        if (params?.type) {
            query = query.eq('type', params.type)
        }
        if (params?.status !== undefined) {
            query = query.eq('status', params.status)
        }

        query = query.order('created_at', { ascending: false })

        if (params?.limit) {
            const offset = params.offset || 0
            query = query.range(offset, offset + params.limit - 1)
        }

        const { data, error, count } = await query

        if (error) {
            return { success: false, coupons: [], total: 0, error: error.message }
        }

        return { success: true, coupons: data || [], total: count || 0 }
    },

    /**
     * 获取单个优惠券详情
     */
    async getCouponById(id: string): Promise<{ success: boolean; coupon?: AdminCoupon; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('coupons')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, coupon: data }
    },

    /**
     * 创建优惠券规则（不生成码）
     */
    async createCoupon(data: {
        name: string
        type: 'flat' | 'balance' | 'product'
        value: number
        product_ids?: string[] // Compatible wrapper, but internally we map to sku_ids
        sku_ids?: string[]
        min_usage?: number
        total_quantity?: number // Optional plan quantity
        start_date?: string | null
        end_date?: string | null
        status?: boolean
    }): Promise<{ success: boolean; coupon?: AdminCoupon; error?: string }> {
        const client = getAdminSupabaseClient()

        const payload = {
            name: data.name,
            type: data.type,
            value: data.value,
            sku_ids: data.sku_ids || data.product_ids || [], // Map to sku_ids
            min_usage: data.min_usage || 0,
            total_quantity: data.total_quantity || null,
            start_date: data.start_date || null,
            end_date: data.end_date || null,
            status: data.status !== undefined ? data.status : true,
        }

        const { data: coupon, error } = await client
            .from('coupons')
            .insert(payload)
            .select()
            .single()

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, coupon }
    },

    /**
     * 更新优惠券规则
     */
    async updateCoupon(id: string, data: Partial<AdminCoupon>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // Prepare payload: map product_ids to sku_ids if legacy key used (though Typescript might block it if strict)
        const payload: any = { ...data }
        if (payload.product_ids) {
            payload.sku_ids = payload.product_ids
            delete payload.product_ids
        }
        // Remove keys not in DB if interface has extras
        // (Assuming data matches DB columns)

        const { error } = await client
            .from('coupons')
            .update(payload)
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },

    /**
     * 生成优惠券码 (统一接口)
     * @param couponId 优惠券规则ID
     * @param quantity 数量 (Batch模式)
     * @param mode 'random' | 'universal'
     * @param customCode 通用码字符串 (Universal模式)
     * @param usageLimit 最大使用次数 (Universal模式)
     */
    async generateCouponCodes(
        couponId: string,
        quantity: number = 1,
        mode: 'random' | 'universal' = 'random',
        customCode?: string,
        usageLimit?: number
    ): Promise<{ success: boolean; count?: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const payload: any = {
            p_coupon_id: couponId,
            p_quantity: quantity,
            p_mode: mode
        }

        if (mode === 'universal') {
            payload.p_custom_code = customCode
            payload.p_usage_limit = usageLimit
        }

        const { data, error } = await client.rpc('admin_generate_coupon_codes', payload)

        if (error) {
            return { success: false, error: error.message }
        }

        const res = data as any
        if (res.success) {
            return { success: true, count: res.count }
        } else {
            return { success: false, error: res.error }
        }
    },

    /**
     * 删除优惠券规则
     */
    async deleteCoupon(id: string): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // Check if codes exist? DB constraint ON DELETE CASCADE will handle it, or we can warn.
        // User asked to optimize, likely cascade delete is fine or expected.

        const { error } = await client
            .from('coupons')
            .delete()
            .eq('id', id)

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true }
    },



    /**
     * 获取某优惠券的实例码列表
     */
    async getCouponCodes(couponId: string, params?: {
        page?: number,
        size?: number,
        status?: string
    }): Promise<{ success: boolean; codes: any[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const page = params?.page || 1
        const pageSize = params?.size || 20
        const offset = (page - 1) * pageSize

        let query = client
            .from('coupon_codes')
            .select('*', { count: 'exact' })
            .eq('coupon_id', couponId)

        if (params?.status) {
            query = query.eq('status', params.status)
        }

        query = query
            .order('created_at', { ascending: false })
            .range(offset, offset + pageSize - 1)

        const { data, error, count } = await query

        if (error) {
            return { success: false, codes: [], total: 0, error: error.message }
        }

        return { success: true, codes: data || [], total: count || 0 }
    },

    /**
     * 切换状态
     */
    async toggleStatus(id: string, status: boolean): Promise<{ success: boolean; error?: string }> {
        return this.updateCoupon(id, { status })
    },

    /**
     * 批量删除兑换码
     */
    async deleteCouponCodes(ids: string[]): Promise<{ success: boolean; count?: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client.rpc('admin_delete_coupon_codes', {
            p_ids: ids
        })

        if (error) {
            return { success: false, error: error.message }
        }

        const res = data as any
        if (res.success) {
            return { success: true, count: res.count }
        } else {
            return { success: false, error: res.error }
        }
    },

    /**
     * Get used coupon statistics (Usage Log)
     */
    async getCouponStats(params: {
        page: number
        pageSize: number
        code?: string
        userUid?: string
    }): Promise<{ success: boolean; data: any[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client.rpc('admin_get_coupon_stats', {
            p_page: params.page,
            p_page_size: params.pageSize,
            p_code: params.code || null,
            p_user_uid: params.userUid || null
        })

        if (error) {
            return { success: false, data: [], total: 0, error: error.message }
        }

        const res = data as any
        if (res.success) {
            return { success: true, data: res.data, total: res.total }
        } else {
            return { success: false, data: [], total: 0, error: res.error }
        }
    },

    /**
     * Batch delete coupon usage logs
     */
    async deleteCouponUsages(ids: string[]): Promise<{ success: boolean; count?: number; error?: string }> {
        const client = getAdminSupabaseClient()

        const { data, error } = await client.rpc('admin_delete_coupon_usages', {
            p_ids: ids
        })

        if (error) {
            return { success: false, error: error.message }
        }

        const res = data as any
        if (res.success) {
            return { success: true, count: res.count }
        } else {
            return { success: false, error: res.error }
        }
    }
}

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
