import { useRuntimeConfig } from '#app'

export interface SchedulerStatus {
    isRunning: boolean
    lastRun: string | null
    lastResult: any
}

export interface SchedulerLog {
    id: number
    task_name: string
    status: 'success' | 'error'
    executed_at: string
    affected_count: number
    error?: string
}

export interface TaskMeta {
    key: string
    name: string
    description: string
    group: string
    cron: string
}

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
}

const getBaseUrl = () => {
    const config = useRuntimeConfig()
    return config.public.schedulerUrl
}

export const adminSchedulerApi = {
    /**
     * Get scheduler status
     */
    async getStatus(): Promise<SchedulerStatus> {
        try {
            const res = await fetch(`${getBaseUrl()}/status`)
            return await res.json()
        } catch (e) {
            if (import.meta.dev) console.error('Failed to get scheduler status:', e)
            return { isRunning: false, lastRun: null, lastResult: null }
        }
    },

    /**
     * Get execution logs
     */
    async getLogs(limit: number = 20): Promise<ApiResponse<{ logs: SchedulerLog[] }>> {
        try {
            const res = await fetch(`${getBaseUrl()}/logs?limit=${limit}`)
            const data = await res.json()
            return {
                success: data.success,
                data: { logs: data.logs },
                error: data.error
            }
        } catch (e: any) {
            if (import.meta.dev) console.error('Failed to get scheduler logs:', e)
            return { success: false, error: e.message }
        }
    },

    /**
     * Start scheduler
     */
    async start(): Promise<ApiResponse> {
        try {
            const res = await fetch(`${getBaseUrl()}/start`, { method: 'POST' })
            const data = await res.json()
            return { success: data.success, error: data.message }
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    },

    /**
     * Stop scheduler
     */
    async stop(): Promise<ApiResponse> {
        try {
            const res = await fetch(`${getBaseUrl()}/stop`, { method: 'POST' })
            const data = await res.json()
            return { success: data.success, error: data.message }
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    },

    /**
     * Run specific task immediately
     */
    async runTask(taskName: string): Promise<ApiResponse<{ expired_count?: number }>> {
        try {
            const res = await fetch(`${getBaseUrl()}/run/${taskName}`, { method: 'POST' })
            const data = await res.json()
            return {
                success: data.success,
                data: { expired_count: data.expired_count },
                error: data.error
            }
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    },

    /**
     * Get task list
     */
    async getTasks(): Promise<ApiResponse<{ tasks: TaskMeta[]; groups: any }>> {
        try {
            const res = await fetch(`${getBaseUrl()}/tasks`)
            const data = await res.json()
            return {
                success: data.success,
                data: { tasks: data.tasks, groups: data.groups },
                error: data.error
            }
        } catch (e: any) {
            if (import.meta.dev) console.error('Failed to get tasks:', e)
            return { success: false, error: e.message }
        }
    }
}
