
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

// TODO: Move base URL to environment config
const SCHEDULER_URL = 'http://localhost:3001'

export const adminSchedulerApi = {
    /**
     * Get scheduler status
     */
    async getStatus(): Promise<SchedulerStatus> {
        try {
            const res = await fetch(`${SCHEDULER_URL}/status`)
            return await res.json()
        } catch (e) {
            console.error('Failed to get scheduler status:', e)
            return { isRunning: false, lastRun: null, lastResult: null }
        }
    },

    /**
     * Get execution logs
     */
    async getLogs(limit: number = 20): Promise<{ success: boolean; logs: SchedulerLog[] }> {
        try {
            const res = await fetch(`${SCHEDULER_URL}/logs?limit=${limit}`)
            return await res.json()
        } catch (e) {
            console.error('Failed to get scheduler logs:', e)
            return { success: false, logs: [] }
        }
    },

    /**
     * Start scheduler
     */
    async start(): Promise<{ success: boolean; message?: string }> {
        try {
            const res = await fetch(`${SCHEDULER_URL}/start`, { method: 'POST' })
            return await res.json()
        } catch (e: any) {
            return { success: false, message: e.message }
        }
    },

    /**
     * Stop scheduler
     */
    async stop(): Promise<{ success: boolean; message?: string }> {
        try {
            const res = await fetch(`${SCHEDULER_URL}/stop`, { method: 'POST' })
            return await res.json()
        } catch (e: any) {
            return { success: false, message: e.message }
        }
    },

    /**
     * Run specific task immediately
     */
    async runTask(taskName: string): Promise<{ success: boolean; expired_count?: number; error?: string }> {
        try {
            const res = await fetch(`${SCHEDULER_URL}/run/${taskName}`, { method: 'POST' })
            return await res.json()
        } catch (e: any) {
            return { success: false, error: e.message }
        }
    }
}
