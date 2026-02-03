import { ref, reactive, onMounted } from 'vue'
import { adminCouponApi, type AdminCouponStat } from '@/api/admin/coupon'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useBizConfig } from '@/composables/common/useBizConfig'

export const useAdminCouponStats = () => {
    // State
    const loading = ref(false)
    const dataList = ref<AdminCouponStat[]>([])
    const selectedIds = ref<string[]>([])

    // Pagination
    const pagination = reactive({
        page: 1,
        pageSize: 20,
        total: 0
    })

    // Filters
    const filters = reactive({
        code: '',
        userUid: ''
    })

    // Utilities
    const { formatDate } = useBizFormat()
    const { getCouponStatusType, getCouponStatusLabel } = useBizConfig()

    // Actions
    const loadData = async () => {
        loading.value = true
        try {
            const { success, data, total, error } = await adminCouponApi.getCouponStats({
                page: pagination.page,
                pageSize: pagination.pageSize,
                code: filters.code,
                userUid: filters.userUid
            })

            if (success) {
                dataList.value = data
                pagination.total = total
            } else {
                ElMessage.error(error || '加载失败')
            }
        } catch (e: any) {
            ElMessage.error('系统异常: ' + e.message)
        } finally {
            loading.value = false
        }
    }

    const handleSearch = () => {
        pagination.page = 1
        loadData()
    }

    const handleSizeChange = (val: number) => {
        pagination.pageSize = val
        pagination.page = 1
        loadData()
    }

    const handleCurrentChange = (val: number) => {
        pagination.page = val
        loadData()
    }

    const handleSelectionChange = (rows: AdminCouponStat[]) => {
        selectedIds.value = rows.map(r => r.id)
    }

    const doDelete = async (ids: string[]) => {
        try {
            const { success, count, error } = await adminCouponApi.deleteCouponUsages(ids)
            if (success) {
                ElMessage.success(`成功删除 ${count || ids.length} 条记录`)
                loadData()
                selectedIds.value = []
            } else {
                ElMessage.error(error || '删除失败')
            }
        } catch (e: any) {
            ElMessage.error('删除异常: ' + e.message)
        }
    }

    const handleDelete = (row: AdminCouponStat) => {
        ElMessageBox.confirm('确定删除该条记录吗？删除后用户侧将不再显示此优惠券。', '警告', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            doDelete([row.id])
        }).catch(() => { })
    }

    const handleBatchDelete = () => {
        if (selectedIds.value.length === 0) return
        ElMessageBox.confirm(`确定删除选中的 ${selectedIds.value.length} 条记录吗？`, '批量删除', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            doDelete(selectedIds.value)
        }).catch(() => { })
    }

    return {
        // State
        loading,
        dataList,
        selectedIds,
        pagination,
        filters,

        // Actions
        loadData,
        handleSearch,
        handleSizeChange,
        handleCurrentChange,
        handleSelectionChange,
        handleDelete,
        handleBatchDelete,

        // Formatters
        formatDate,
        getCouponStatusType,
        getCouponStatusLabel
    }
}
