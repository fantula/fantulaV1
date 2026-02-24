import { ref, onMounted, onUnmounted } from 'vue'
import { adminSchedulerApi, type SchedulerStatus, type SchedulerLog, type TaskMeta } from '@/api/admin/scheduler'
import { ElMessage } from 'element-plus'

export const useAdminScheduler = () => {
    // State
    const status = ref<SchedulerStatus>({
        isRunning: false,
        lastRun: null,
        lastResult: null
    })
    const logs = ref<SchedulerLog[]>([])
    const taskList = ref<TaskMeta[]>([])
    const taskGroups = ref<Record<string, any>>({})
    const actionLoading = ref(false)
    const logsLoading = ref(false)
    const runningTask = ref('')

    // Timer
    let interval: any = null

    // Methods
    const fetchStatus = async () => {
        const data = await adminSchedulerApi.getStatus()
        status.value = data
    }

    const fetchTasks = async () => {
        try {
            const res = await adminSchedulerApi.getTasks()
            if (res.success && res.data) {
                taskList.value = res.data.tasks
                taskGroups.value = res.data.groups
            }
        } catch (e) {
            if (import.meta.dev) console.error('Failed to get tasks:', e)
        }
    }

    const fetchLogs = async () => {
        logsLoading.value = true
        try {
            const res = await adminSchedulerApi.getLogs(50)
            if (res.success && res.data) {
                logs.value = res.data.logs
            }
        } finally {
            logsLoading.value = false
        }
    }

    const toggleScheduler = async (start: boolean) => {
        actionLoading.value = true
        try {
            const res = start ? await adminSchedulerApi.start() : await adminSchedulerApi.stop()
            if (res.success) {
                ElMessage.success(start ? '服务已启动' : '服务已停止')
                await fetchStatus()
            } else {
                ElMessage.warning(res.error || '操作失败')
            }
        } catch (e: any) {
            ElMessage.error('操作异常: ' + e.message)
        } finally {
            actionLoading.value = false
        }
    }

    const runTask = async (taskName: string) => {
        runningTask.value = taskName
        try {
            const res = await adminSchedulerApi.runTask(taskName)
            if (res.success && res.data) {
                ElMessage.success(`执行完成，处理 ${res.data.expired_count || 0} 条数据`)
                await fetchLogs()
            } else {
                ElMessage.error(res.error || '执行失败')
            }
        } catch (e: any) {
            ElMessage.error('执行异常: ' + e.message)
        } finally {
            runningTask.value = ''
        }
    }

    const startAutoRefresh = (intervalMs = 30000) => {
        fetchStatus()
        fetchTasks()
        fetchLogs()
        if (interval) clearInterval(interval)
        interval = setInterval(fetchStatus, intervalMs)
    }

    const stopAutoRefresh = () => {
        if (interval) clearInterval(interval)
    }

    const formatTime = (time: string | null) => {
        if (!time) return '-'
        return new Date(time).toLocaleString('zh-CN', {
            month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        })
    }

    // Lifecycle
    onUnmounted(() => {
        stopAutoRefresh()
    })

    return {
        status,
        logs,
        taskList,
        taskGroups,
        actionLoading,
        logsLoading,
        runningTask,
        fetchStatus,
        fetchTasks,
        fetchLogs,
        toggleScheduler,
        runTask,
        startAutoRefresh,
        formatTime
    }
}
