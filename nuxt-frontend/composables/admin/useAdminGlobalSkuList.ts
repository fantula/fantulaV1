
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminSkuApi } from '@/api/admin/sku'
import { useBizConfig } from '@/composables/common/useBizConfig'

export function useAdminGlobalSkuList() {
    const loading = ref(false)
    const skus = ref<any[]>([])
    const filterMode = ref<'all' | 'unlinked'>('unlinked')
    const selectedIds = ref<string[]>([])

    // Load
    const loadSkus = async () => {
        loading.value = true
        selectedIds.value = [] // Reset selection
        try {
            const res = await adminSkuApi.getAllSkus({
                showUnlinkedOnly: filterMode.value === 'unlinked'
            })
            if (res.success) {
                skus.value = res.skus || []
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
        loadSkus()
    }

    // Delete
    const handleDelete = (row: any) => {
        ElMessageBox.confirm('确认删除此 SKU (包含解除相关联的所有 CDK/商品绑定)？', '删除确认', {
            type: 'warning',
            confirmButtonText: '确定删除',
            cancelButtonText: '取消'
        }).then(async () => {
            const res = await adminSkuApi.deleteSkus([row.id])
            if (res.success) {
                ElMessage.success('删除成功')
                loadSkus()
            } else {
                ElMessage.error(res.error)
            }
        })
    }

    const handleBulkDelete = () => {
        if (!selectedIds.value.length) return
        ElMessageBox.confirm(`确认批量删除 ${selectedIds.value.length} 个 SKU (强制解绑所有关联)？`, '高风险操作', {
            type: 'error',
            confirmButtonText: '确定删除',
            cancelButtonText: '取消'
        }).then(async () => {
            const res = await adminSkuApi.deleteSkus(selectedIds.value)
            if (res.success) {
                ElMessage.success('批量删除成功')
                loadSkus()
            } else {
                ElMessage.error(res.error)
            }
        })
    }

    const handleSelectionChange = (val: any[]) => {
        selectedIds.value = val.map(v => v.id)
    }

    // Utils
    const formatDate = (str: string) => str ? new Date(str).toLocaleString('zh-CN', { fontSize: '12px' }) : '-'


    const { getProductTypeLabel, getProductTypeTag } = useBizConfig()

    onMounted(() => {
        loadSkus()
    })

    return {
        loading,
        skus,
        filterMode,
        selectedIds,
        loadSkus,
        handleFilterChange,
        handleDelete,
        handleBulkDelete,
        handleSelectionChange,
        formatDate,
        getProductTypeLabel,
        getProductTypeTag
    }
}
