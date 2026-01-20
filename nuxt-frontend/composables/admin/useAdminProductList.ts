
import { ref, reactive, onMounted } from 'vue'
import { adminProductApi } from '@/api/admin/product'
import { adminCategoryApi, type AdminProduct } from '@/api/admin-supabase'
import { ElMessage, ElMessageBox } from 'element-plus'

export function useAdminProductList() {
    const loading = ref(false)
    const list = ref<AdminProduct[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(20)
    const categories = ref<any[]>([])
    const selectedIds = ref<string[]>([])

    // Filters
    const filters = reactive({
        category_id: '',
        status: '',
        keyword: ''
    })

    // Actions
    const loadCategories = async () => {
        const res = await adminCategoryApi.getCategories()
        if (res.success) categories.value = res.categories || []
    }

    const loadList = async () => {
        loading.value = true
        selectedIds.value = [] // Reset selection on reload
        try {
            const res = await adminProductApi.getProducts({
                page: currentPage.value,
                page_size: pageSize.value,
                category_id: filters.category_id || undefined,
                status: filters.status || undefined,
                keyword: filters.keyword || undefined
            })

            if (res.success) {
                list.value = res.products
                total.value = res.total
            } else {
                ElMessage.error(res.error || '加载失败')
            }
        } catch (e: any) {
            ElMessage.error(e.message || '系统错误')
        } finally {
            loading.value = false
        }
    }

    const handleFilterChange = () => {
        currentPage.value = 1
        loadList()
    }

    const selectCategory = (id: string) => {
        filters.category_id = id
        handleFilterChange()
    }

    // Status Toggle
    const handleStatusChange = async (row: any) => {
        row.statusLoading = true
        try {
            const res = await adminProductApi.toggleStatus(row.id, row.status)
            if (!res.success) {
                // Revert
                row.status = row.status === 'on' ? 'off' : 'on'
                ElMessage.error(res.error)
            } else {
                ElMessage.success(row.status === 'on' ? '上架成功' : '下架成功')
            }
        } catch {
            row.status = row.status === 'on' ? 'off' : 'on'
            ElMessage.error('操作失败')
        } finally {
            row.statusLoading = false
        }
    }

    // Delete
    const handleDelete = (row: any) => {
        ElMessageBox.confirm(`确认删除 "${row.product_name}" 吗?`, '警告', { type: 'warning' })
            .then(async () => {
                const res = await adminProductApi.deleteProducts([row.id])
                if (res.success) {
                    ElMessage.success('删除成功')
                    loadList()
                }
                else ElMessage.error(res.error)
            })
    }

    const handleBulkDelete = () => {
        if (!selectedIds.value.length) return
        ElMessageBox.confirm(`确认批量删除 ${selectedIds.value.length} 项? 此操作不可撤销。`, '高风险警告', { type: 'error' })
            .then(async () => {
                const res = await adminProductApi.deleteProducts(selectedIds.value)
                if (res.success) {
                    ElMessage.success('批量删除成功')
                    loadList()
                }
                else ElMessage.error(res.error)
            })
    }

    const handleSelectionChange = (val: any[]) => {
        selectedIds.value = val.map(v => v.id)
    }

    onMounted(() => {
        loadCategories()
        loadList()
    })

    return {
        loading,
        list,
        total,
        currentPage,
        pageSize,
        categories,
        filters,
        selectedIds,

        loadList,
        selectCategory,
        handleFilterChange,
        handleStatusChange,
        handleDelete,
        handleBulkDelete,
        handleSelectionChange
    }
}
