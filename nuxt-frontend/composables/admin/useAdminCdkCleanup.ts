import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminCdkApi, type AdminCDK } from '@/api/admin'

/**
 * Composable for handling orphan CDK cleanup logic
 */
export function useAdminCdkCleanup(options?: {
    onDeleteSuccess?: (id: string) => void
    onBulkDeleteSuccess?: (ids: string[]) => void
}) {
    const isCleaning = ref(false)

    /**
     * Delete a single orphan CDK
     */
    const handleSingleCleanup = async (row: AdminCDK) => {
        try {
            await ElMessageBox.confirm('确认删除此未绑定的孤儿 CDK 吗？此操作无法恢复。', '警告', {
                type: 'warning',
                confirmButtonText: '确认删除',
                cancelButtonText: '取消',
                confirmButtonClass: 'el-button--danger'
            })

            isCleaning.value = true
            const res = await adminCdkApi.deleteCdk(row.id)

            if (res.success) {
                ElMessage.success('删除成功')
                options?.onDeleteSuccess?.(row.id)
            } else {
                ElMessage.error(res.error || '删除失败')
            }
        } catch {
            // Cancelled
        } finally {
            isCleaning.value = false
        }
    }

    /**
     * Bulk delete orphan CDKs
     */
    const handleBulkCleanup = async (ids: string[]) => {
        if (!ids.length) return

        try {
            await ElMessageBox.confirm(`确认批量删除 ${ids.length} 个孤儿 CDK？`, '高风险操作', {
                type: 'error',
                confirmButtonText: '确定删除',
                cancelButtonText: '取消'
            })

            isCleaning.value = true
            const res = await adminCdkApi.deleteCdks(ids)

            if (res.success) {
                ElMessage.success('批量删除成功')
                options?.onBulkDeleteSuccess?.(ids)
            } else {
                ElMessage.error(res.error || '删除失败')
            }
        } catch {
            // Cancelled
        } finally {
            isCleaning.value = false
        }
    }

    return {
        isCleaning,
        handleSingleCleanup,
        handleBulkCleanup
    }
}
