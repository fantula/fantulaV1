/**
 * 后台列表页通用 Composable
 * 封装分页、筛选、加载、选择等常用列表逻辑
 */

import { ref, reactive, computed, onMounted, type Ref } from 'vue'
import { ElMessage } from 'element-plus'

interface ListOptions<T, F extends object> {
    fetchFn: (params: { page: number; pageSize: number; filters: F }) => Promise<{
        success: boolean
        data?: T[]
        total?: number
        error?: string
    }>
    defaultFilters?: F
    defaultPageSize?: number
    autoLoad?: boolean
}

/**
 * 通用列表管理 Composable
 */
export function useAdminList<T extends { id: string }, F extends object = Record<string, any>>(
    options: ListOptions<T, F>
) {
    // === State ===
    const loading = ref(false)
    const initLoading = ref(true)
    const list = ref<T[]>([]) as Ref<T[]>
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(options.defaultPageSize || 20)
    const selectedIds = ref<string[]>([])
    const filters = reactive<F>((options.defaultFilters || {}) as F)

    // === Computed ===
    const hasSelection = computed(() => selectedIds.value.length > 0)
    const selectedCount = computed(() => selectedIds.value.length)

    // === Methods ===
    const loadList = async () => {
        loading.value = true
        try {
            const result = await options.fetchFn({
                page: currentPage.value,
                pageSize: pageSize.value,
                filters: filters as F
            })

            if (result.success) {
                list.value = result.data || []
                total.value = result.total || result.data?.length || 0
            } else {
                ElMessage.error(result.error || '加载数据失败')
            }
        } catch (e: any) {
            ElMessage.error(e.message || '加载数据失败')
        } finally {
            loading.value = false
            initLoading.value = false
        }
    }

    const refresh = async () => {
        await loadList()
        ElMessage.success('刷新成功')
    }

    const handlePageChange = (page: number) => {
        currentPage.value = page
        loadList()
    }

    const handlePageSizeChange = (size: number) => {
        pageSize.value = size
        currentPage.value = 1
        loadList()
    }

    const handleFilterChange = () => {
        currentPage.value = 1
        loadList()
    }

    const handleSelectionChange = (rows: T[]) => {
        selectedIds.value = rows.map(r => r.id)
    }

    const clearSelection = () => {
        selectedIds.value = []
    }

    const resetFilters = () => {
        const defaults = options.defaultFilters || {} as F
        Object.keys(filters).forEach(key => {
            (filters as any)[key] = (defaults as any)[key] ?? undefined
        })
        currentPage.value = 1
        loadList()
    }

    /**
     * 更新列表中的单行数据（用于状态切换等操作后的局部更新）
     */
    const updateRow = (id: string, updates: Partial<T>) => {
        const index = list.value.findIndex(item => item.id === id)
        if (index !== -1) {
            list.value[index] = { ...list.value[index], ...updates }
        }
    }

    /**
     * 从列表中移除数据（删除后的局部更新）
     */
    const removeRow = (id: string) => {
        const index = list.value.findIndex(item => item.id === id)
        if (index !== -1) {
            list.value.splice(index, 1)
            total.value = Math.max(0, total.value - 1)
        }
    }

    /**
     * 批量移除
     */
    const removeRows = (ids: string[]) => {
        ids.forEach(id => removeRow(id))
        clearSelection()
    }

    // === Init ===
    if (options.autoLoad !== false) {
        onMounted(() => {
            loadList()
        })
    }

    return {
        // State
        loading,
        initLoading,
        list,
        total,
        currentPage,
        pageSize,
        selectedIds,
        filters,

        // Computed
        hasSelection,
        selectedCount,

        // Methods
        loadList,
        refresh,
        handlePageChange,
        handlePageSizeChange,
        handleFilterChange,
        handleSelectionChange,
        clearSelection,
        resetFilters,
        updateRow,
        removeRow,
        removeRows
    }
}

export default useAdminList
