import { useAdminList } from './useAdminList'
import { adminCouponApi, type AdminCoupon } from '@/api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'

export function useAdminCouponList(type: 'balance' | 'flat' | 'product') {
    const {
        loading,
        list,
        total,
        currentPage,
        pageSize,
        selectedIds,
        hasSelection,
        refresh,
        handleFilterChange,
        handleSelectionChange,
        loadList,
        removeRow,
        removeRows,
        updateRow
    } = useAdminList<AdminCoupon>({
        defaultPageSize: 20,
        fetchFn: async (params) => {
            const res = await adminCouponApi.getCoupons({
                type: type,
                offset: (params.page - 1) * params.pageSize,
                limit: params.pageSize
            })
            if (!res.success) {
                return { success: false, error: res.error }
            }
            return {
                success: true,
                data: res.coupons,
                total: res.total
            }
        }
    })

    // Coupon Specific Actions
    const handleToggleStatus = async (row: AdminCoupon) => {
        const newStatus = !row.status
        const action = newStatus ? '启用' : '禁用'
        try {
            const res = await adminCouponApi.updateCoupon(row.id, { status: newStatus })
            if (res.success) {
                ElMessage.success(`${action}成功`)
                updateRow(row.id, { status: newStatus })
            } else {
                ElMessage.error(res.error)
            }
        } catch (e: any) {
            ElMessage.error(e.message || '操作失败')
        }
    }

    const handleDelete = async (row: AdminCoupon) => {
        ElMessageBox.confirm('确定要删除该优惠券吗？', '提示', { type: 'warning' })
            .then(async () => {
                const res = await adminCouponApi.deleteCoupon(row.id)
                if (res.success) {
                    ElMessage.success('删除成功')
                    removeRow(row.id)
                } else {
                    ElMessage.error(res.error)
                }
            })
    }

    const handleBulkDelete = async () => {
        if (!selectedIds.value.length) return
        ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个优惠券规则吗？`, '提示', { type: 'warning' })
            .then(async () => {
                // Loop delete since API does not support bulk
                let successCount = 0
                for (const id of selectedIds.value) {
                    const res = await adminCouponApi.deleteCoupon(id)
                    if (res.success) successCount++
                }
                ElMessage.success(`批量操作结束，成功删除 ${successCount} 个`)
                removeRows(selectedIds.value) // Note: optimistic removal of all selected, or should we filter?
                // Simplest user experience: remove selected, refresh.
                refresh()
            })
    }

    return {
        loading,
        list,
        total,
        currentPage,
        pageSize,
        selectedIds,
        hasSelection,
        refresh,
        handleFilterChange,
        handleSelectionChange,
        handleToggleStatus,
        handleDelete,
        handleBulkDelete,
        loadList
    }
}
