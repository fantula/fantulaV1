
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { adminProductApi } from '@/api/admin/product'
import { adminSkuApi, type SharedSkuGroup } from '@/api/admin/sku'

export function useAdminSkuEditor() {
    const route = useRoute()
    const router = useRouter()
    const productId = route.params.id as string

    // State
    const loading = ref(true)
    const saving = ref(false)
    const product = ref<any>(null)
    const specMode = ref<'custom' | 'shared'>('custom')
    const sharedSkuTag = ref<number | undefined>(undefined)
    const sharedGroups = ref<SharedSkuGroup[]>([])

    // Editor Data Structure
    const currentSpecs = ref<any[]>([])
    const currentSkus = ref<any[]>([])

    // Key for re-rendering editor when mode changes
    const editorKey = computed(() => `${specMode.value}-${sharedSkuTag.value || 'custom'}`)
    const shouldShowEditor = computed(() => {
        if (specMode.value === 'custom') return true
        return specMode.value === 'shared' && !!sharedSkuTag.value
    })

    // Actions
    const loadSharedGroups = async () => {
        const res = await adminSkuApi.getSharedSkuGroups()
        if (res.success) {
            sharedGroups.value = res.groups || []
            // Refill if in shared mode
            if (specMode.value === 'shared' && sharedSkuTag.value) {
                handleSharedGroupChange(sharedSkuTag.value)
            }
        }
    }

    const loadProductData = async () => {
        if (!productId) { router.back(); return }
        try {
            const res = await adminProductApi.getProductWithSkus(productId)
            if (res.success && res.product) {
                product.value = res.product

                if (res.skus && res.skus.length > 0) {
                    const firstTag = res.skus[0].tag
                    // Determine if all SKUs belong to same shared group
                    const isShared = firstTag && res.skus.every(s => s.tag === firstTag)

                    if (isShared) {
                        specMode.value = 'shared'
                        sharedSkuTag.value = firstTag
                    } else {
                        specMode.value = 'custom'
                        // Map Specs
                        currentSpecs.value = res.specs ? res.specs.map(s => ({
                            name: s.name,
                            values: s.values.map(v => v.value),
                            inputVisible: false, inputValue: ''
                        })) : []

                        // Map SKUs
                        currentSkus.value = res.skus.map(s => ({
                            id: s.id,
                            key: Object.values(s.spec_combination || {}).join('::'),
                            specValues: s.spec_combination || {},
                            product_type: s.product_type,
                            price: s.price,
                            duration: s.duration,
                            intro: s.intro,
                            image: s.image,
                            tag: s.tag
                        }))
                    }
                }
            } else {
                ElMessage.error(res.error || '商品加载失败')
            }
        } catch (e: any) {
            ElMessage.error(e.message || '系统错误')
        } finally {
            loading.value = false
        }
    }

    const handleSpecModeChange = (val: 'custom' | 'shared') => {
        if (val === 'custom') {
            sharedSkuTag.value = undefined
            currentSpecs.value = []
            currentSkus.value = []
        } else {
            currentSpecs.value = []
            currentSkus.value = []
        }
    }

    const handleSharedGroupChange = (tag: number) => {
        const group = sharedGroups.value.find(g => g.tag === tag)
        if (group) {
            // Convert to Editor Format for Preview
            const specMap = new Map<string, Set<string>>()
            const skus = group.skus.map(s => {
                Object.entries(s.spec_combination).forEach(([k, v]) => {
                    if (!specMap.has(k)) specMap.set(k, new Set())
                    specMap.get(k)!.add(v as string)
                })
                return {
                    id: s.id,
                    key: Object.values(s.spec_combination || {}).join('::'),
                    specValues: s.spec_combination,
                    product_type: s.product_type,
                    price: s.price,
                    duration: s.duration,
                    intro: s.intro,
                    image: s.image,
                    tag: s.tag
                }
            })

            currentSpecs.value = Array.from(specMap.entries()).map(([name, values]) => ({
                name, values: Array.from(values), inputVisible: false, inputValue: ''
            }))
            currentSkus.value = skus
        }
    }

    const saveSkus = async (editorInstance: any) => {
        // Collect Data
        let payload: any[] = []

        if (specMode.value === 'custom') {
            if (!editorInstance) return
            const rawSkus = editorInstance.getSkus()
            if (rawSkus.length === 0) {
                ElMessage.warning('请至少配置一种规格')
                return
            }
            payload = rawSkus.map((s: any, i: number) => ({
                id: s.id,
                spec_combination: s.specValues,
                product_type: s.product_type,
                price: s.price,
                duration: s.duration,
                image: s.image,
                intro: s.intro,
                sort_order: i
            }))
        }

        saving.value = true
        try {
            const res = await adminProductApi.updateProductSkus(productId, {
                mode: specMode.value,
                sharedTag: sharedSkuTag.value || undefined,
                skus: payload
            })

            if (res.success) {
                ElMessage.success('配置已保存')
                router.push('/_mgmt_9Xfa3/products')
            } else {
                ElMessage.error(res.error)
            }
        } finally {
            saving.value = false
        }
    }

    const goToSharedManager = () => window.open('/_mgmt_9Xfa3/products/shared-sku')

    onMounted(async () => {
        await Promise.all([loadProductData(), loadSharedGroups()])
    })

    return {
        productId,
        loading,
        saving,
        product,
        specMode,
        sharedSkuTag,
        sharedGroups,
        currentSpecs,
        currentSkus,
        editorKey,
        shouldShowEditor,

        handleSpecModeChange,
        handleSharedGroupChange,
        goToSharedManager,
        saveSkus
    }
}
