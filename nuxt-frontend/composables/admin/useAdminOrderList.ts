
import { ref } from 'vue'
import { adminOrderApi, type AdminOrder } from '@/api/admin/order'
import { ElMessage } from 'element-plus'
import { DEFAULT_AVATAR } from '@/utils/constants'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

/**
 * 后台订单列表通用逻辑
 * @param orderType 订单类型 ('virtual' | 'shared_account' | 'one_time_cdk')
 */
export function useAdminOrderList(orderType: 'virtual' | 'shared_account' | 'one_time_cdk') {
    const loading = ref(false)
    const list = ref<AdminOrder[]>([])
    const total = ref(0)
    const page = ref(1)
    const pageSize = ref(20)
    const selectedIds = ref<string[]>([])

    // 加载列表
    async function loadList() {
        loading.value = true
        try {
            const { success, orders, total: totalCount, error } = await adminOrderApi.getOrders({
                page: page.value,
                pageSize: pageSize.value,
                order_type: orderType,
                exclude_status: ['refunding', 'refunded'] // 排除退款中和已退款的订单
            })

            if (!success) {
                ElMessage.error(error || '加载失败')
                return
            }

            // Double Hydration Protection (Already handled in API, but kept for safety)
            list.value = orders
            total.value = totalCount

        } catch (e) {
            console.error('加载订单失败:', e)
            ElMessage.error('系统异常')
        } finally {
            loading.value = false
        }
    }

    // 分页处理
    function handlePageChange(val: number) {
        page.value = val
        loadList()
    }

    function handleSizeChange(val: number) {
        pageSize.value = val
        page.value = 1
        loadList()
    }

    // 选中处理
    function handleSelectionChange(selection: AdminOrder[]) {
        selectedIds.value = selection.map(item => item.id)
    }

    // 工具函数：复制
    function handleCopy(text: string) {
        if (!text) return
        navigator.clipboard.writeText(text)
        ElMessage.success('已复制')
    }

    // 工具函数：格式化规格
    function formatSpec(spec: any): string {
        if (!spec) return '-'
        if (typeof spec === 'string') return spec
        if (typeof spec === 'object') {
            return Object.entries(spec).map(([k, v]) => `${k}: ${v}`).join(' / ')
        }
        return '-'
    }

    // --- Global Standard Helpers ---
    const { formatPrice, formatDate } = useBizFormat()
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()

    // Status Helpers (Mapped to Global)
    const getStatusText = (status: string) => getOrderStatusLabel(status)
    const getStatusType = (status: string) => getOrderStatusType(status)
    const formatTime = (time: string) => formatDate(time)

    return {
        // State
        loading,
        list,
        total,
        page,
        pageSize,
        selectedIds,
        DEFAULT_AVATAR,

        // Actions
        loadList,
        handlePageChange,
        handleSizeChange,
        handleSelectionChange,
        handleCopy,

        // Helpers
        formatSpec,
        getStatusText,
        getStatusType,
        formatTime,
        formatPrice
    }
}
