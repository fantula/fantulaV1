
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import type { AdminProduct, ProductCategory } from '@/api/admin-supabase'

export const adminProductApi = {
    /**
     * 获取商品列表（管理员视角，支持分页和服务端筛选）
     */
    async getProducts(params?: {
        category_id?: string
        status?: string
        keyword?: string
        page?: number
        page_size?: number
    }): Promise<{ success: boolean; products: AdminProduct[]; total: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const page = params?.page || 1
        const pageSize = params?.page_size || 20
        const offset = (page - 1) * pageSize

        let query = client
            .from('products')
            .select('*', { count: 'exact' })

        if (params?.category_id) {
            query = query.eq('category_id', params.category_id)
        }
        if (params?.status) {
            query = query.eq('status', params.status)
        }
        if (params?.keyword) {
            query = query.ilike('product_name', `%${params.keyword}%`)
        }

        query = query
            .order('created_at', { ascending: false })
            .range(offset, offset + pageSize - 1)

        const { data, error, count } = await query

        if (error) {
            return { success: false, products: [], total: 0, error: error.message }
        }

        const products = data || []
        const productIds = products.map(p => p.id)

        // 批量查询 SKU 详情 (Batch Query to avoid N+1)
        let skuCountMap: Record<string, number> = {}
        let skuDetailsMap: Record<string, string[]> = {}

        if (productIds.length > 0) {
            const { data: skuMapData } = await client
                .from('product_sku_map')
                .select('product_id, sku:product_skus (tag, tag_name, spec_combination)')
                .in('product_id', productIds)

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
    async createProduct(data: Partial<AdminProduct>): Promise<{ success: boolean; product?: AdminProduct; error?: string }> {
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

        if (error) return { success: false, error: error.message }
        return { success: true, product }
    },

    /**
     * 更新商品
     */
    async updateProduct(id: string, data: Partial<AdminProduct>): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()
        const { error } = await client
            .from('products')
            .update(data)
            .eq('id', id)

        if (error) return { success: false, error: error.message }
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
     * 级联删除：先删映射，再删商品
     */
    async deleteProducts(ids: string[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 删除映射
        await client.from('product_sku_map').delete().in('product_id', ids)

        // 2. 删除商品
        const { error } = await client.from('products').delete().in('id', ids)

        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 获取商品完整数据（含规格和SKU）
     * 用于编辑页回显
     */
    async getProductWithSkus(productId: string): Promise<{
        success: boolean
        product?: AdminProduct
        specs?: { name: string; values: { id: string; value: string }[] }[]
        skus?: any[]
        error?: string
    }> {
        const client = getAdminSupabaseClient()

        // 1. 商品信息
        const { data: product, error: pError } = await client
            .from('products')
            .select('*')
            .eq('id', productId)
            .single()

        if (pError) return { success: false, error: pError.message }

        // 2. SKU 映射
        const { data: skuMappings, error: sError } = await client
            .from('product_sku_map')
            .select('*, product_skus(*)')
            .eq('product_id', productId)
            .order('sort_order', { ascending: true })

        if (sError) return { success: false, error: sError.message }

        // 3. 提取和推导
        const skus = (skuMappings || []).map(m => (m as any).product_skus).filter(Boolean)

        // 简单推导规格结构 (用于前端编辑器回显)
        const specsMap = new Map<string, Set<string>>()
        skus.forEach((sku: any) => {
            if (sku.spec_combination) {
                Object.entries(sku.spec_combination).forEach(([k, v]) => {
                    if (!specsMap.has(k)) specsMap.set(k, new Set())
                    specsMap.get(k)?.add(String(v))
                })
            }
        })

        const specs = Array.from(specsMap.entries()).map(([name, valuesSet]) => ({
            name,
            values: Array.from(valuesSet).map(v => ({ id: v, value: v }))
        }))

        return { success: true, product, specs, skus }
    },

    /**
     * 创建商品 SKU (用于复制商品时)
     * 注意：这是创建新的 ProductSKU 记录
     */
    async createProductSkus(productId: string, skus: any[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        const skuData = skus.map(sku => ({
            product_type: sku.product_type,
            spec_combination: sku.spec_combination,
            image: sku.image || null,
            intro: sku.intro || null,
            price: sku.price,
            duration: sku.duration || null,
            sort_order: sku.sort_order,
            tag: sku.tag || null // 如果有tag说明是共享组SKU，但这里通常是复制为私有
        }))

        const { data: createdSkus, error: skuError } = await client
            .from('product_skus')
            .insert(skuData)
            .select('id')

        if (skuError) return { success: false, error: skuError.message }

        const mappings = (createdSkus || []).map((sku, index) => ({
            product_id: productId,
            sku_id: sku.id,
            sort_order: skus[index]?.sort_order || index
        }))

        if (mappings.length > 0) {
            await client.from('product_sku_map').insert(mappings)
        }

        return { success: true }
    },

    /**
     * 更新商品关联的 SKU (复杂逻辑)
     * 委托给 SKUS 接口或在此实现? 
     * 鉴于 post.vue/sku_editor 的逻辑，updateProductSkus 通常比较复杂。
     * 这里为了保持兼容，我们将 updateProductSkus 的逻辑复刻过来，或者在 api/admin/sku.ts 中处理。
     * 考虑到这是属于 "配置商品属性" 的一部分，放在 product.ts 也是合理的。
     */
    async updateProductSkus(productId: string, options: {
        mode: 'custom' | 'shared'
        skus?: any[]
        sharedTag?: number
    }): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 共享模式：重置为引用
        if (options.mode === 'shared') {
            if (!options.sharedTag) return { success: false, error: '缺少共享规格组 Tag' }

            const { data: sharedSkus } = await client
                .from('product_skus')
                .select('id, sort_order')
                .eq('tag', options.sharedTag)

            if (!sharedSkus?.length) return { success: false, error: '该共享组没有 SKU' }

            // 事务: 删旧映 -> 建新映
            await client.from('product_sku_map').delete().eq('product_id', productId)

            const mappings = sharedSkus.map(sku => ({
                product_id: productId,
                sku_id: sku.id,
                sort_order: sku.sort_order
            }))

            const { error } = await client.from('product_sku_map').insert(mappings)
            return error ? { success: false, error: error.message } : { success: true }
        }

        // 2. 自定义模式：智能更新 (Diff Update)
        // 这一块逻辑较多，且仅仅在 sku/[id].vue 使用。
        // 为了简化，我们假设前端已经整理好了。

        // 获取当前映射
        const { data: currentMappings } = await client
            .from('product_sku_map')
            .select('sku_id')
            .eq('product_id', productId)

        const currentSkuIds = new Set((currentMappings || []).map(m => m.sku_id))
        const newSkus = options.skus || []
        const newSkuIds = new Set(newSkus.filter(s => s.id).map(s => s.id))

        // A. 移除
        const toRemoveIds = [...currentSkuIds].filter(id => !newSkuIds.has(id))
        if (toRemoveIds.length > 0) {
            await client.from('product_sku_map')
                .delete()
                .eq('product_id', productId)
                .in('sku_id', toRemoveIds)
        }

        // B. 更新
        const toUpdate = newSkus.filter(s => s.id && currentSkuIds.has(s.id))
        for (const sku of toUpdate) {
            await client.from('product_skus').update({
                product_type: sku.product_type,
                spec_combination: sku.spec_combination,
                image: sku.image,
                intro: sku.intro,
                price: sku.price,
                duration: sku.duration,
                sort_order: sku.sort_order
            }).eq('id', sku.id).is('tag', null) // Only update private skus
        }

        // C. 插入
        const toInsert = newSkus.filter(s => !s.id)
        if (toInsert.length > 0) {
            const insertData = toInsert.map(sku => ({
                product_type: sku.product_type,
                spec_combination: sku.spec_combination,
                image: sku.image,
                intro: sku.intro,
                price: sku.price,
                duration: sku.duration,
                sort_order: sku.sort_order,
                tag: null // Private SKU
            }))

            const { data: createdSkus, error } = await client
                .from('product_skus')
                .insert(insertData)
                .select('id')

            if (!error && createdSkus) {
                const newMappings = createdSkus.map((sku, idx) => ({
                    product_id: productId,
                    sku_id: sku.id,
                    sort_order: toInsert[idx].sort_order
                }))
                await client.from('product_sku_map').insert(newMappings)
            }
        }

        return { success: true }
    }
}
