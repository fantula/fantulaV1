/**
 * CDK 列表管理 Composable
 * 遵循 useAdminOrderList 模式
 */

import { ref, reactive } from 'vue'
import { adminCdkApi, type AdminCDK } from '@/api/admin/cdk'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

/**
 * 后台 CDK 列表通用逻辑
 * @param cdkType CDK 类型 ('virtual' | 'shared' | 'one_time')
 */
export function useAdminCdkList(cdkType: 'virtual' | 'shared' | 'one_time') {
    const loading = ref(false)
    const list = ref<AdminCDK[]>([])
    const total = ref(0)
    const pagination = reactive({
        page: 1,
        pageSize: 20
    })
    const selectedIds = ref<string[]>([])

    // --- Global Formatters ---
    const { formatPrice, formatDate } = useBizFormat()
    const { getCdkStatusLabel, getCdkStatusType } = useBizConfig()

    // 加载列表
    async function loadList() {
        loading.value = true
        try {
            const { success, cdks, total: totalCount, error } = await adminCdkApi.getCdks({
                cdk_type: cdkType,
                limit: pagination.pageSize,
                offset: (pagination.page - 1) * pagination.pageSize
            })

            if (!success) {
                ElMessage.error(error || '加载失败')
                return
            }

            list.value = cdks
            total.value = totalCount
        } catch (e) {
            console.error('加载 CDK 失败:', e)
            ElMessage.error('系统异常')
        } finally {
            loading.value = false
        }
    }

    // 分页
    function handlePageChange(val: number) {
        pagination.page = val
        loadList()
    }

    function handleSizeChange(val: number) {
        pagination.pageSize = val
        pagination.page = 1
        loadList()
    }

    // 选中
    function handleSelectionChange(selection: AdminCDK[]) {
        selectedIds.value = selection.map(item => item.id)
    }

    // 删除单个
    async function handleDelete(id: string) {
        try {
            await ElMessageBox.confirm('确定要删除此 CDK 吗？', '删除确认', { type: 'warning' })
            const { success, error } = await adminCdkApi.deleteCdk(id)
            if (success) {
                ElMessage.success('删除成功')
                loadList()
            } else {
                ElMessage.error(error || '删除失败')
            }
        } catch { /* cancelled */ }
    }

    // 批量删除
    async function handleBulkDelete() {
        if (!selectedIds.value.length) return
        try {
            await ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个 CDK 吗？`, '批量删除', { type: 'warning' })
            const { success, count, error } = await adminCdkApi.deleteCdks(selectedIds.value)
            if (success) {
                ElMessage.success(`成功删除 ${count} 条`)
                selectedIds.value = []
                loadList()
            } else {
                ElMessage.error(error || '删除失败')
            }
        } catch { /* cancelled */ }
    }

    // 上架
    async function handleEnable(id: string) {
        const { success, error } = await adminCdkApi.enableCdk(id)
        if (success) {
            ElMessage.success('已上架')
            loadList()
        } else {
            ElMessage.error(error || '上架失败')
        }
    }

    // 下架
    async function handleDisable(id: string) {
        const { success, error } = await adminCdkApi.disableCdk(id)
        if (success) {
            ElMessage.success('已下架')
            loadList()
        } else {
            ElMessage.error(error || '下架失败')
        }
    }

    // 批量上架
    async function handleBulkEnable() {
        if (!selectedIds.value.length) return
        const { success, count, error } = await adminCdkApi.enableCdks(selectedIds.value)
        if (success) {
            ElMessage.success(`成功上架 ${count} 条`)
            selectedIds.value = []
            loadList()
        } else {
            ElMessage.error(error || '批量上架失败')
        }
    }

    // 批量下架
    async function handleBulkDisable() {
        if (!selectedIds.value.length) return
        const { success, count, error } = await adminCdkApi.disableCdks(selectedIds.value)
        if (success) {
            ElMessage.success(`成功下架 ${count} 条`)
            selectedIds.value = []
            loadList()
        } else {
            ElMessage.error(error || '批量下架失败')
        }
    }

    // 复制
    function handleCopy(text: string) {
        if (!text) return
        navigator.clipboard.writeText(text)
        ElMessage.success('已复制')
    }

    // 格式化规格
    function formatSpec(spec: any): string {
        if (!spec) return '-'
        if (typeof spec === 'string') return spec
        if (typeof spec === 'object') {
            return Object.values(spec).join(' / ')
        }
        return '-'
    }

    return {
        // State
        loading,
        list,
        total,
        pagination,
        selectedIds,

        // Actions
        loadList,
        handlePageChange,
        handleSizeChange,
        handleSelectionChange,
        handleDelete,
        handleBulkDelete,
        handleEnable,
        handleDisable,
        handleBulkEnable,
        handleBulkDisable,
        handleCopy,

        // Formatters
        formatPrice,
        formatDate,
        formatSpec,
        getStatusLabel: getCdkStatusLabel,
        getStatusType: getCdkStatusType
    }
}
