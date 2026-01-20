
import { ref, computed } from 'vue'
import { adminPreOrderApi, type AdminPreOrder } from '@/api/admin/preorder'
import { ElMessage, ElMessageBox } from 'element-plus'
import { DEFAULT_AVATAR } from '@/utils/constants'

export function useAdminPreOrderList() {
    const loading = ref(false)
    const rawList = ref<AdminPreOrder[]>([]) // 原始数据 (用于统计)
    const selectedIds = ref<string[]>([])
    const statusFilter = ref('') // 前端筛选状态

    // 加载列表 (固定加载最近 500 条)
    async function loadList() {
        loading.value = true
        selectedIds.value = []
        try {
            const { success, orders, error } = await adminPreOrderApi.getPreOrders({ limit: 500 })

            if (!success) {
                ElMessage.error(error || '加载失败')
                return
            }
            // Double Hydration Protection
            rawList.value = orders
        } catch (e) {
            console.error('加载预订单失败:', e)
            ElMessage.error('系统异常')
        } finally {
            loading.value = false
        }
    }

    // 计算属性：当前展示的列表 (根据筛选)
    const filteredList = computed(() => {
        if (!statusFilter.value) return rawList.value
        return rawList.value.filter(o => o.status === statusFilter.value)
    })

    // 计算属性：统计数据
    const stats = computed(() => {
        const converted = rawList.value.filter(o => o.status === 'converted').length
        const expired = rawList.value.filter(o => o.status === 'expired').length
        const deleted = rawList.value.filter(o => o.status === 'deleted').length
        return {
            converted,
            expired,
            deleted,
            total: converted + expired + deleted
        }
    })

    // 批量删除
    async function handleBulkDelete() {
        if (selectedIds.value.length === 0) return

        try {
            await ElMessageBox.confirm(
                `确定要删除选中的 ${selectedIds.value.length} 条预订单记录吗？此操作不可恢复。`,
                '确认删除',
                { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
            )

            const { success, error } = await adminPreOrderApi.deletePreOrders(selectedIds.value)

            if (!success) {
                ElMessage.error(error || '删除失败')
                return
            }

            ElMessage.success(`成功删除 ${selectedIds.value.length} 条记录`)
            loadList() // 重新加载

        } catch (e) {
            if (e !== 'cancel') {
                ElMessage.error('操作取消或失败')
            }
        }
    }

    // 选中变更
    function handleSelectionChange(selection: AdminPreOrder[]) {
        selectedIds.value = selection.map(item => item.id)
    }

    // 复制
    function handleCopy(text: string) {
        if (!text) return
        navigator.clipboard.writeText(text)
        ElMessage.success('已复制')
    }

    // 工具函数
    const getStatusText = (status: string) => {
        const map: Record<string, string> = {
            converted: '已转换',
            expired: '已过期',
            deleted: '已删除'
        }
        return map[status] || status
    }

    const getStatusType = (status: string) => {
        const map: Record<string, string> = {
            converted: 'success',
            expired: 'info',
            deleted: 'danger'
        }
        return map[status] || 'info'
    }

    const formatTime = (time: string) => {
        if (!time) return '-'
        return new Date(time).toLocaleString('zh-CN', { hour12: false })
    }

    return {
        loading,
        list: filteredList, // 对外暴露的是筛选后的列表
        stats,
        statusFilter,
        selectedIds,
        DEFAULT_AVATAR,

        loadList,
        handleBulkDelete,
        handleSelectionChange,
        handleCopy,

        getStatusText,
        getStatusType,
        formatTime
    }
}
