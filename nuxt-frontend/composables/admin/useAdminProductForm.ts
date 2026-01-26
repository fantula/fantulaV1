
import { ref, reactive, computed, nextTick, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { adminProductApi, adminCategoryApi } from '@/api/admin' // Re-export from index if needed, or import directly
import { adminProductApi as newProductApi } from '@/api/admin/product' // Alias to new API
import { ElMessage, type FormInstance } from 'element-plus'

export interface DetailModule { type: 'text' | 'image', content: string }

export function useAdminProductForm() {
    const router = useRouter()
    const route = useRoute()

    // State
    const formRef = ref<FormInstance>()
    const isEdit = computed(() => !!route.query.id)
    const submitting = ref(false)
    const categories = ref<{ id: string, name: string }[]>([])

    // Image Picker State
    const imagePickerVisible = ref(false)
    const pickerTarget = ref<'image' | number>('image')

    const form = reactive({
        id: '',
        name: '',
        categoryId: undefined as string | undefined,
        image: '',
        sortOrder: 0,
        displayPrice: 0,
        tags: [] as string[],
        initialSales: 0,
        badgeLabel: undefined as string | undefined, // Fixed type
        rating: 100,
        allowAddon: false,
        addonUnit: '',
        status: true,
        detailModules: [] as DetailModule[],
        copySkus: [] as any[] // For copy mode
    })

    const rules = {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
        image: [{ required: true, message: '请上传商品头图', trigger: 'change' }]
    }

    // --- Actions ---

    // 1. Data Loader
    const loadCategories = async () => {
        const res = await adminCategoryApi.getCategories()
        if (res.success) categories.value = res.categories || []
    }

    const loadProductForEdit = async (id: string, isCopy: boolean) => {
        // Use new API `getProductWithSkus` for full data
        const res = await newProductApi.getProductWithSkus(id)

        if (res.success && res.product) {
            const p = res.product
            if (!isCopy) form.id = p.id
            form.name = isCopy ? `${p.product_name} (副本)` : p.product_name
            form.categoryId = p.category_id || undefined
            form.image = p.image || '' // Ensure string
            form.sortOrder = p.sort_order
            form.displayPrice = p.display_price
            form.tags = p.tags || []
            form.initialSales = p.initial_sales
            form.badgeLabel = p.badge_label || undefined
            form.rating = p.rating
            form.allowAddon = p.allow_addon
            form.detailModules = p.detail_modules || []
            form.status = isCopy ? false : (p.status === 'on')

            // If Copy, save raw skus for re-creation
            if (isCopy && res.skus && res.skus.length > 0) {
                form.copySkus = res.skus.map(s => ({
                    spec_combination: s.spec_combination,
                    product_type: s.product_type,
                    price: s.price,
                    duration: s.duration,
                    image: s.image,
                    intro: s.intro,
                    sort_order: s.sort_order || 0,
                    // If it's a shared sku, we might want to keep the tag, or resolve it.
                    // The new API `createProductSkus` handles this structure.
                    tag: s.tag
                }))
            }
        } else {
            ElMessage.error(res.error || '商品加载失败')
        }
    }

    // 2. Form Actions
    const submitProduct = async () => {
        if (!formRef.value) return
        await formRef.value.validate(async (valid) => {
            if (!valid) return
            submitting.value = true
            try {
                const data = {
                    product_name: form.name,
                    category_id: form.categoryId,
                    image: form.image,
                    sort_order: form.sortOrder,
                    display_price: form.displayPrice,
                    tags: form.tags,
                    initial_sales: form.initialSales,
                    badge_label: form.badgeLabel || null,
                    rating: form.rating,
                    allow_addon: form.allowAddon,
                    detail_modules: form.detailModules,
                    status: form.status ? 'on' : 'off'
                }

                // Call new API
                const res = form.id
                    ? await newProductApi.updateProduct(form.id, data as any)
                    : await newProductApi.createProduct(data as any)

                if (res.success) {
                    // Handle Copy Mode SKU Creation
                    if (!form.id && form.copySkus.length > 0 && res.product) {
                        const skuRes = await newProductApi.createProductSkus(res.product.id, form.copySkus)
                        if (!skuRes.success) ElMessage.warning('商品已创建但SKU复制失败: ' + skuRes.error)
                    }

                    ElMessage.success('保存成功')
                    goBack()
                } else {
                    ElMessage.error(res.error || '保存失败')
                }
            } catch (e: any) {
                ElMessage.error(e.message || '保存异常')
            } finally {
                submitting.value = false
            }
        })
    }

    const goBack = () => router.push('/admin/products')

    // 3. Detail Module Actions
    const addDetailText = () => form.detailModules.push({ type: 'text', content: '' })
    const addDetailImage = () => form.detailModules.push({ type: 'image', content: '' })
    const removeDetailModule = (i: number) => form.detailModules.splice(i, 1)
    const moveDetailModule = (i: number, dir: number) => {
        const t = form.detailModules[i];
        form.detailModules[i] = form.detailModules[i + dir];
        form.detailModules[i + dir] = t
    }

    // 4. Image Picker Actions
    const openImagePicker = (target: 'image' | number) => {
        pickerTarget.value = target
        imagePickerVisible.value = true
    }

    const handleImageSelected = (urls: string[]) => {
        if (urls.length === 0) return
        const url = urls[0]
        if (pickerTarget.value === 'image') {
            form.image = url
        } else if (typeof pickerTarget.value === 'number') {
            form.detailModules[pickerTarget.value].content = url
        }
    }

    // Lifecycle
    onMounted(async () => {
        loadCategories()
        if (route.query.copy_from_id) loadProductForEdit(route.query.copy_from_id as string, true)
        else if (route.query.id) loadProductForEdit(route.query.id as string, false)
    })

    return {
        formRef,
        form,
        rules,
        loading: submitting, // Alias for header
        isEdit,
        categories,

        imagePickerVisible,

        submitProduct,
        goBack,

        // Modules
        addDetailText,
        addDetailImage,
        removeDetailModule,
        moveDetailModule,

        // Images
        openImagePicker,
        handleImageSelected
    }
}
