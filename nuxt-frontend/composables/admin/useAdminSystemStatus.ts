import { ref } from 'vue'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import { callEdgeFunction, getEdgeFunctionsUrl } from '@/utils/supabase'

export interface SystemStatus { 
    type: 'success' | 'warning' | 'danger' | 'info'; 
    text: string 
}

export function useAdminSystemStatus() {
    const config = useRuntimeConfig()
    const session = useSupabaseSession()
    
    // Environment Info
    const isDev = process.env.NODE_ENV !== 'production'
    const supabaseUrl = config.public.supabaseUrl
    const edgeUrl = getEdgeFunctionsUrl()

    // Status State
    const dbStatus = ref<SystemStatus>({ type: 'info', text: 'Waiting...' })
    const r2Status = ref<SystemStatus>({ type: 'info', text: 'Waiting...' })
    const edgeStatus = ref<SystemStatus>({ type: 'info', text: 'Waiting...' })
    const checking = ref(false)

    // Check Functions
    const checkDb = async () => {
        try {
            const client = getAdminSupabaseClient()
            const { count, error } = await client.from('admin_users').select('*', { count: 'exact', head: true })
            if (error) throw error
            dbStatus.value = { type: 'success', text: `Connected (Latency: OK)` }
        } catch (e: any) {
            dbStatus.value = { type: 'danger', text: 'Error: ' + e.message }
        }
    }

    const checkR2 = async () => {
        try {
            const token = session.value?.access_token
    
            if (!token) {
                 r2Status.value = { type: 'warning', text: 'Auth Token Missing' }
                 return
            }
            
            const res = await callEdgeFunction('test-r2-connection', { token })
            if (res.error) throw new Error(res.error)
            r2Status.value = { type: 'success', text: 'Connected' }
        } catch (e: any) {
            r2Status.value = { type: 'danger', text: 'Error: ' + e.message }
        }
    }

    const checkEdge = async () => {
        if (edgeUrl && edgeUrl.startsWith('http')) {
            edgeStatus.value = { type: 'success', text: 'Configured' }
        } else {
            edgeStatus.value = { type: 'warning', text: 'Not Configured' }
        }
    }

    const checkAll = async () => {
        checking.value = true
        dbStatus.value = { type: 'info', text: 'Checking...' }
        r2Status.value = { type: 'info', text: 'Checking...' }
        edgeStatus.value = { type: 'info', text: 'Checking...' }
        
        await Promise.all([checkDb(), checkR2(), checkEdge()])
        checking.value = false
    }

    return {
        isDev,
        supabaseUrl,
        edgeUrl,
        dbStatus,
        r2Status,
        edgeStatus,
        checking,
        checkAll,
        checkDb,
        checkR2,
        checkEdge
    }
}
