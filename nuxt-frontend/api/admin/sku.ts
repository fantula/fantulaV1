
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

export interface SharedSkuGroup {
    tag: number
    tag_name: string
    created_at: string
    skus: any[]
}

export const adminSkuApi = {
    /**
     * 获取所有物理 SKU (用于 SKU 管理页)
     */
    async getAllSkus(params?: { showUnlinkedOnly?: boolean }): Promise<{ success: boolean; skus?: any[]; error?: string }> {
        const client = getAdminSupabaseClient()

        // Base query: Only select PRIVATE SKUs (tag is null)
        // Shared SKUs are managed in Shared Group page
        let query = client.from('product_skus')
            .select('*, product_sku_map(product_id)', { count: 'exact' })
            .is('tag', null)

        const { data, error } = await query
        if (error) return { success: false, error: error.message }

        // Process data to determine linkage
        let skus = data.map(sku => {
            const mappings = sku.product_sku_map || []
            return {
                ...sku,
                is_linked: mappings.length > 0,
                linked_count: mappings.length
            }
        })

        if (params?.showUnlinkedOnly) {
            skus = skus.filter(s => !s.is_linked)
        }

        // Sort by created_at desc
        skus.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        return { success: true, skus }
    },

    /**
     * 批量删除 SKU (物理删除)
     * 强制解除关联: CDK映射, 商品映射
     */
    async deleteSkus(ids: string[]): Promise<{ success: boolean; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. 解除 CDK 关联 (cdk_sku_map)
        await client.from('cdk_sku_map').delete().in('sku_id', ids)

        // 2. 解除商品关联 (product_sku_map)
        await client.from('product_sku_map').delete().in('sku_id', ids)

        // 3. 删除物理 SKU
        const { error } = await client.from('product_skus').delete().in('id', ids)

        if (error) return { success: false, error: error.message }
        return { success: true }
    },

    /**
     * 获取共享 SKU 组
     */
    /**
     * 获取共享 SKU 组
     * 逻辑更改: 直接从 product_skus 表根据 tag 字段聚合，不再依赖 shared_sku_groups 表
     */
    async getSharedSkuGroups(): Promise<{ success: boolean; groups: SharedSkuGroup[]; error?: string }> {
        const client = getAdminSupabaseClient()

        // 1. Get all SKUs with tags
        const { data: skus, error } = await client
            .from('product_skus')
            .select('*')
            .not('tag', 'is', null)
            .order('tag', { ascending: true })
            .order('sort_order', { ascending: true })

        if (error) return { success: false, groups: [], error: error.message }
        if (!skus || skus.length === 0) return { success: true, groups: [] }

        // 2. Group by tag
        const groupsMap = new Map<number, SharedSkuGroup>()

        skus.forEach(sku => {
            const tag = sku.tag
            if (!groupsMap.has(tag)) {
                groupsMap.set(tag, {
                    tag: tag,
                    // Use the tag_name from the first SKU found in this group
                    tag_name: sku.tag_name || `Group #${tag}`,
                    created_at: sku.created_at,
                    skus: []
                })
            }
            groupsMap.get(tag)!.skus.push(sku)
        })

        return { success: true, groups: Array.from(groupsMap.values()) }
    },

    /**
     * 获取使用某共享组的所有商品 (用于查看)
     */
    async getProductsBySharedTag(tag: number): Promise<{ success: boolean; products?: any[]; error?: string }> {
        const client = getAdminSupabaseClient()

        // 连表查询: product_sku_map -> product_skus (filter tag) -> products
        // 但更简单的逻辑是: 找出所有 tag=target 的 SKU ID -> 查 map -> 查 products
        // 或者利用 Supabase 的深度关联查询

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
            .select('id, product_name, image, display_price, status')
            .in('id', productIds)

        if (prodError) return { success: false, error: prodError.message }
        return { success: true, products: products || [] }
    }
}
