import { ref } from 'vue'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import { callEdgeFunction, getEdgeFunctionsUrl } from '@/utils/supabase'

export interface SystemStatus {
    type: 'success' | 'warning' | 'danger' | 'info';
    text: string
}

export interface ProbeResult {
    status: string;
    checks: {
        database?: { status: string; latency?: string; error?: string };
        r2_connectivity?: { status: string; latency?: string; error?: string };
        internal_network?: { status: string; latency?: string; error?: string };
        external_internet?: { status: string; latency?: string; error?: string };
        env?: { status: string; error?: string };
    }
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
    const networkStatus = ref<SystemStatus>({ type: 'info', text: 'Waiting...' })
    const internetStatus = ref<SystemStatus>({ type: 'info', text: 'Waiting...' })
    const edgeStatus = ref<SystemStatus>({ type: 'info', text: 'Waiting...' })
    const checking = ref(false)

    // Check Functions
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
        networkStatus.value = { type: 'info', text: 'Checking...' }
        internetStatus.value = { type: 'info', text: 'Checking...' }

        try {
            checkEdge()

            const token = await getAuthToken()
            if (!token) throw new Error('No active session token')

            const { data, error } = await useFetch<any>('/api/admin/system/status', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (error.value) throw new Error(error.value.statusMessage || 'Network Error')

            const result = data.value
            if (!result || !result.success) {
                // If probe failed entirely
                throw new Error(result?.error || 'Check Failed')
            }

            // Parse Probe Results
            const probe = result.results as unknown as ProbeResult

            // 1. Database
            const dbCheck = probe.checks?.database
            if (dbCheck?.status === 'ok') {
                dbStatus.value = { type: 'success', text: `Connected (${dbCheck.latency})` }
            } else {
                dbStatus.value = { type: 'danger', text: dbCheck?.error || 'Failed' }
            }

            // 2. R2 Storage
            const r2Check = probe.checks?.r2_connectivity
            if (r2Check?.status === 'ok') {
                r2Status.value = { type: 'success', text: `Connected (${r2Check.latency})` }
            } else {
                r2Status.value = { type: 'danger', text: r2Check?.error || 'Failed' }
            }

            // 3. Internal Network
            const netCheck = probe.checks?.internal_network
            if (netCheck?.status === 'ok') {
                networkStatus.value = { type: 'success', text: `OK (${netCheck.latency})` }
            } else {
                networkStatus.value = { type: 'danger', text: netCheck?.error || 'Failed' }
            }

            // 4. External Internet
            const webCheck = probe.checks?.external_internet
            if (webCheck?.status === 'ok') {
                internetStatus.value = { type: 'success', text: `Online (${webCheck.latency})` }
            } else {
                internetStatus.value = { type: 'danger', text: webCheck?.error || 'Offline' }
            }

        } catch (e: any) {
            const errText = 'Error: ' + (e.message || 'Unknown')
            dbStatus.value = { type: 'danger', text: errText }
            r2Status.value = { type: 'danger', text: errText }
            networkStatus.value = { type: 'danger', text: errText }
            internetStatus.value = { type: 'danger', text: errText }
        } finally {
            checking.value = false
        }
    }

    return {
        isDev,
        supabaseUrl,
        edgeUrl,
        dbStatus,
        r2Status,
        networkStatus,
        internetStatus,
        edgeStatus,
        checking,
        checkAll
    }
}
