/**
 * 优惠券列表管理 Composable
 * 遵循 useAdminOrderList 模式
 */

import { ref, reactive } from 'vue'
import { adminCouponApi, type AdminCoupon } from '@/api/admin/coupon'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

/**
 * 后台优惠券列表通用逻辑
 * @param couponType 优惠券类型 ('flat' | 'balance' | 'product')
 */
export function useAdminCouponList(couponType: 'flat' | 'balance' | 'product') {
    const loading = ref(false)
    const list = ref<AdminCoupon[]>([])
    const total = ref(0)
    const pagination = reactive({
        page: 1,
        pageSize: 20
    })
    const selectedIds = ref<string[]>([])

    // --- Global Formatters ---
    const { formatPrice, formatDate } = useBizFormat()
    const { getCouponTypeLabel, getCouponStatusLabel, getCouponStatusType } = useBizConfig()

    // 加载列表
    async function loadList() {
        loading.value = true
        try {
            const { success, coupons, total: totalCount, error } = await adminCouponApi.getCoupons({
                type: couponType,
                limit: pagination.pageSize,
                offset: (pagination.page - 1) * pagination.pageSize
            })

            if (!success) {
                ElMessage.error(error || '加载失败')
                return
            }

            list.value = coupons.map(item => ({ ...item, statusLoading: false }))
            total.value = totalCount
        } catch (e) {
            console.error('加载优惠券失败:', e)
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
    function handleSelectionChange(selection: AdminCoupon[]) {
        selectedIds.value = selection.map(item => item.id)
    }

    // 删除单个
    async function handleDelete(id: string) {
        try {
            await ElMessageBox.confirm('确定要删除此优惠券规则吗？相关的兑换码也将被删除。', '删除确认', { type: 'warning' })
            const { success, error } = await adminCouponApi.deleteCoupon(id)
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
            await ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券规则吗？`, '批量删除', { type: 'warning' })
            let successCount = 0
            for (const id of selectedIds.value) {
                const res = await adminCouponApi.deleteCoupon(id)
                if (res.success) successCount++
            }
            ElMessage.success(`成功删除 ${successCount} 个`)
            selectedIds.value = []
            loadList()
        } catch { /* cancelled */ }
    }

    // 切换状态
    async function handleToggleStatus(row: any) {
        row.statusLoading = true
        try {
            const { success, error } = await adminCouponApi.toggleStatus(row.id, row.status)
            if (success) {
                ElMessage.success(`已${row.status ? '启用' : '停用'}`)
            } else {
                row.status = !row.status
                ElMessage.error(error || '操作失败')
            }
        } catch {
            row.status = !row.status
        } finally {
            row.statusLoading = false
        }
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
        handleToggleStatus,

        // Formatters
        formatPrice,
        formatDate,
        getCouponTypeLabel,
        getCouponStatusLabel,
        getCouponStatusType
    }
}
