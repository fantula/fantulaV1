import { ref, computed } from 'vue'
import { goodsApi } from '@/api/goods'
import { supabaseProductApi } from '@/api/supabase'

export interface GoodsData {
    id: string
    title: string
    product_name: string
    image: string
    coverImage: string
    price: number
    display_price: number
    sales: number
    initial_sales: number
    rating: number
    status: number
    badge_label?: string
    tags: string
    skus: any[]
    detail_modules: any[]
    specGroups: any[]
    allow_addon: boolean
}

export function useGoodsDetail(goodsId: Ref<string>) {
    const goodsData = ref<any>(null)
    const goodsError = ref(false)
    const stock = ref(0)
    const skuAvailable = ref(false)
    const stockLoading = ref(false)

    // 计算属性
    const hasStock = computed(() => !stockLoading.value && skuAvailable.value && stock.value > 0)
    const skus = computed(() => goodsData.value?.data?.skus || [])
    const hasSkus = computed(() => skus.value.length > 0)

    const goodsInfo = computed(() => {
        const data = goodsData.value?.data || {}
        return {
            name: data.title || data.product_name || '正在加载商品...',
            image: data.coverImage || data.image || '/images/placeholder.png',
            price: data.price || 0,
            sales: data.initial_sales || data.sales || 0,
            rating: data.rating || 100
        }
    })

    const allowAddon = computed(() => goodsData.value?.data?.allow_addon === true)
    const detailModules = computed(() => goodsData.value?.data?.detail_modules || [])

    const specGroups = computed(() => {
        const backendGroups = goodsData.value?.data?.specGroups
        if (backendGroups && backendGroups.length > 0) {
            return backendGroups
        }

        if (skus.value.length > 0) {
            const groups: Record<string, Set<string>> = {}
            skus.value.forEach((sku: any) => {
                const combination = sku.spec_combination || {}
                Object.entries(combination).forEach(([name, value]) => {
                    if (!groups[name]) groups[name] = new Set()
                    groups[name].add(value as string)
                })
            })

            return Object.keys(groups).map(name => ({
                name,
                values: Array.from(groups[name])
            }))
        }

        return []
    })

    // 获取商品详情
    const fetchGoodsDetail = async () => {
        try {
            const detailRes = await goodsApi.getGoodsDetail(goodsId.value)
            if (detailRes.success) {
                goodsData.value = detailRes
            } else {
                throw new Error(detailRes.msg)
            }
        } catch (err) {
            console.error('获取商品详情失败:', err)
            goodsError.value = true
            stock.value = 0
            skuAvailable.value = false
        }
    }

    // 检查 SKU 可购买性
    const checkSkuAvailability = async (skuId: string) => {
        if (!skuId) {
            skuAvailable.value = false
            stock.value = 0
            stockLoading.value = false
            return
        }

        stockLoading.value = true
        try {
            const result = await supabaseProductApi.checkSkuAvailability(skuId)
            skuAvailable.value = result.available
            stock.value = result.availableCount
        } catch (e) {
            console.error('检查 SKU 可购买性失败:', e)
            skuAvailable.value = false
            stock.value = 0
        } finally {
            stockLoading.value = false
        }
    }

    return {
        goodsData,
        goodsError,
        stock,
        skuAvailable,
        stockLoading,
        hasStock,
        skus,
        hasSkus,
        goodsInfo,
        allowAddon,
        detailModules,
        specGroups,
        fetchGoodsDetail,
        checkSkuAvailability
    }
}
