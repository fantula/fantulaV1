/**
 * 共享规格管理 API
 */
import { getAdminSupabaseClient } from '@/utils/supabase-admin'

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
    async getSharedSkuGroups(): Promise<{ success: boolean; groups: SharedSkuGroup[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data, error } = await client
            .from('product_skus')
            .select('*')
            .not('tag', 'is', null)
            .order('tag', { ascending: true })
            .order('sort_order', { ascending: true })

        if (error) {
            return { success: false, groups: [], error: error.message }
        }

        const groupMap = new Map<number, SharedSkuGroup>()
        for (const sku of data || []) {
            const tag = sku.tag as number
            if (!groupMap.has(tag)) {
                groupMap.set(tag, { tag, tag_name: sku.tag_name || '', skus: [] })
            }
            groupMap.get(tag)!.skus.push(sku)
        }

        return { success: true, groups: Array.from(groupMap.values()) }
    },

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
        return { success: true, tag: (data?.[0]?.tag || 0) + 1 }
    },

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
            tag_name: tagName || null,
            product_type: sku.product_type,
            spec_combination: sku.spec_combination,
            price: sku.price,
            duration: sku.duration || null,
            intro: sku.intro || null,
            image: sku.image || null,
            sort_order: sku.sort_order
        }))

        const { error } = await client.from('product_skus').insert(skuData)
        if (error) {
            return { success: false, count: 0, error: error.message }
        }
        return { success: true, count: skuData.length }
    },

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

    async getProductsBySharedTag(tag: number): Promise<{ success: boolean; products?: any[]; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data: skus } = await client.from('product_skus').select('id').eq('tag', tag)
        if (!skus || !skus.length) return { success: true, products: [] }

        const skuIds = skus.map(s => s.id)
        const { data: maps, error: mapError } = await client
            .from('product_sku_map')
            .select('product_id')
            .in('sku_id', skuIds)

        if (mapError) return { success: false, error: mapError.message }
        if (!maps || !maps.length) return { success: true, products: [] }

        const productIds = [...new Set(maps.map(m => m.product_id))]
        const { data: products, error: prodError } = await client
            .from('products')
            .select('id, product_name, image, status')
            .in('id', productIds)

        if (prodError) return { success: false, error: prodError.message }
        return { success: true, products: products || [] }
    },

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
        const { data: existingSkus } = await client.from('product_skus').select('id').eq('tag', tag)

        let linkedProductIds: string[] = []
        const existingIdsArr = (existingSkus || []).map(s => s.id)

        if (existingIdsArr.length > 0) {
            const { data: linked } = await client
                .from('product_sku_map')
                .select('product_id')
                .in('sku_id', existingIdsArr)
            if (linked) linkedProductIds = [...new Set(linked.map(l => l.product_id))]
        }

        const existingIds = new Set(existingIdsArr)
        const keepIds = new Set(skus.filter(s => s.id).map(s => s.id))

        // Delete
        const toDelete = [...existingIds].filter(id => !keepIds.has(id))
        let deletedCount = 0
        if (toDelete.length > 0) {
            const { count } = await client.from('product_skus').delete({ count: 'exact' }).in('id', toDelete)
            deletedCount = count || 0
        }

        // Update
        let updatedCount = 0
        for (const sku of skus.filter(s => s.id && existingIds.has(s.id))) {
            const { error } = await client
                .from('product_skus')
                .update({
                    tag_name: tagName || null,
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

        // Insert
        const toInsert = skus.filter(s => !s.id)
        let insertedCount = 0
        if (toInsert.length > 0) {
            const insertData = toInsert.map(sku => ({
                tag, tag_name: tagName || null,
                product_type: sku.product_type,
                spec_combination: sku.spec_combination,
                price: sku.price,
                duration: sku.duration || null,
                intro: sku.intro || null,
                image: sku.image || null,
                sort_order: sku.sort_order
            }))

            const { data: newSkus, error } = await client.from('product_skus').insert(insertData).select('id, sort_order')
            if (!error && newSkus) {
                insertedCount = newSkus.length
                if (linkedProductIds.length > 0) {
                    const newMappings: any[] = []
                    for (const pid of linkedProductIds) {
                        for (const ns of newSkus) {
                            newMappings.push({ product_id: pid, sku_id: ns.id, sort_order: ns.sort_order ?? 0 })
                        }
                    }
                    if (newMappings.length > 0) await client.from('product_sku_map').insert(newMappings)
                }
            }
        }

        return { success: true, updated: updatedCount, inserted: insertedCount, deleted: deletedCount }
    },

    async deleteSharedSkuGroup(tag: number): Promise<{ success: boolean; count: number; error?: string }> {
        const client = getAdminSupabaseClient()
        const { data: mappings } = await client
            .from('product_sku_map')
            .select('id, sku:product_skus!inner(tag)')
            .eq('sku.tag', tag)
            .limit(1)

        if (mappings && mappings.length > 0) {
            return { success: false, count: 0, error: '该规格组已被商品关联，请先解除关联' }
        }

        const { count, error } = await client.from('product_skus').delete({ count: 'exact' }).eq('tag', tag)
        if (error) {
            return { success: false, count: 0, error: error.message }
        }
        return { success: true, count: count || 0 }
    },
}
