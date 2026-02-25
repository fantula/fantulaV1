import { ref, computed } from 'vue'
import { getSupabaseClient } from '@/utils/supabase'

interface OrderFulfillment {
    id: string
    status: string
    payload: any
    submitted_at: string
    reject_reason?: string
}

export function useFulfillmentHistory(options: {
    orderId: () => string
    filterCdkId?: () => string | undefined
}) {
    const records = ref<OrderFulfillment[]>([])
    const isExpanded = ref(false)

    const displayRecords = computed(() => {
        if (isExpanded.value) return records.value
        // Default: Show only the newest one (index 0)
        return records.value.slice(0, 1)
    })

    const toggleExpand = () => isExpanded.value = !isExpanded.value

    const fetchHistory = async () => {
        records.value = []
        const oid = options.orderId()
        if (!oid) return

        try {
            const client = getSupabaseClient()
            let query = client
                .from('order_fulfillments')
                .select('*')
                .eq('order_id', oid)
                .order('submitted_at', { ascending: false })

            const filterId = options.filterCdkId?.()
            if (filterId) {
                query = query.contains('payload', { _cdk_id: filterId })
            }

            const { data, error } = await query

            if (!error && data) {
                records.value = data as OrderFulfillment[]
            }
        } catch (err) {
            if (import.meta.dev) console.error('获取回执历史失败:', err)
        }
    }

    const statusText = (status: string) => {
        const map: Record<string, string> = {
            submitted: '审核中',
            approved: '已通过',
            rejected: '已驳回'
        }
        return map[status] || status
    }

    const formatTime = (time: string) => {
        const date = new Date(time)
        const m = (date.getMonth() + 1).toString().padStart(2, '0')
        const d = date.getDate().toString().padStart(2, '0')
        const h = date.getHours().toString().padStart(2, '0')
        const min = date.getMinutes().toString().padStart(2, '0')
        return `${m}-${d} ${h}:${min}`
    }

    const maskValue = (value: string) => {
        if (!value || value.length <= 4) return value
        return value.slice(0, 2) + '****' + value.slice(-2)
    }

    return {
        records,
        isExpanded,
        displayRecords,
        toggleExpand,
        fetchHistory,
        statusText,
        formatTime,
        maskValue
    }
}
