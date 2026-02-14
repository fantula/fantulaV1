import { ref, reactive } from 'vue'
import { adminTicketApi } from '@/api/admin/ticket'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { ElMessage, ElMessageBox } from 'element-plus'

export function useAdminTicketList() {
    const loading = ref(false)
    const list = ref<any[]>([])
    const pagination = reactive({
        page: 1,
        pageSize: 20,
        total: 0
    })

    const currentTab = ref('processing')
    const selectedIds = ref<string[]>([])

    const { formatDate } = useBizFormat()
    const {
        getTicketPriorityLabel, getTicketPriorityType,
        getTicketStatusLabel, getTicketStatusType
    } = useBizConfig()

    const loadList = async () => {
        loading.value = true
        try {
            const res = await adminTicketApi.getList({
                page: pagination.page,
                pageSize: pagination.pageSize,
                status: currentTab.value
            })
            if (res.success) {
                list.value = res.data
                pagination.total = res.total
            } else {
                ElMessage.error(res.error || '加载失败')
            }
        } catch (e) {
            ElMessage.error('系统错误')
        } finally {
            loading.value = false
        }
    }

    const handlePageChange = (page: number) => {
        pagination.page = page
        loadList()
    }

    const handleTabChange = (val: string) => {
        currentTab.value = val
        pagination.page = 1
        loadList()
    }

    const handleSelectionChange = (rows: any[]) => {
        selectedIds.value = rows.map(r => r.id)
    }

    const handleCleanup = async () => {
        const handleCleanup = async () => {
            await confirmAction(
                '此操作将永久删除7天前的"已解决"工单中的所有图片附件以释放空间。聊天记录将保留，但图片将无法查看。确定要执行吗？',
                async () => {
                    const { getAuthToken } = await import('@/utils/supabase')
                    const token = await getAuthToken()
                    const res = await adminTicketApi.cleanupImages(7, token || undefined)
                    // Append concrete count info to success message if possible? 
                    // Since confirmAction uses fixed success message, we accept generic message or rely on res.success
                    return res
                },
                {
                    title: '清理图片存储',
                    confirmText: '确定清理',
                    type: 'warning',
                    successMessage: '图片清理完成'
                }
            )
        }
    }

    const handleCopy = (text: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        ElMessage.success('复制成功')
    }

    return {
        loading,
        list,
        pagination,
        currentTab,
        selectedIds,
        loadList,
        handlePageChange,
        handleTabChange,
        handleSelectionChange,
        handleCleanup,
        handleCopy,  // Exported
        formatDate,
        getTicketPriorityLabel, getTicketPriorityType,
        getTicketStatusLabel, getTicketStatusType
    }
}
