import { ref, reactive, computed, watch } from 'vue'
import { getSupabaseClient } from '@/utils/supabase'

export interface OrderFulfillment {
    id: string
    status: string
    payload: any
    reject_reason?: string
}

export interface FulfillmentField {
    key: string
    label: string
}

export function useFulfillmentSubmit(options: {
    orderId: () => string
    cdkId?: () => string | undefined
    cdkFields: () => FulfillmentField[]
    onSuccess: (msg: string) => void
    onError: (msg: string) => void
    onCallback?: () => void
}) {
    const latestFulfillment = ref<OrderFulfillment | null>(null)
    const isSubmitting = ref(false)
    const formData = reactive<Record<string, string>>({})

    const fields = computed(() => options.cdkFields() || [])
    const latestStatus = computed(() => latestFulfillment.value?.status || '')
    const latestRejectReason = computed(() => latestFulfillment.value?.reject_reason || '未填写原因')

    const initFormData = () => {
        fields.value.forEach(f => {
            formData[f.key] = ''
        })

        if (latestFulfillment.value?.payload &&
            (latestStatus.value === 'submitted' || latestStatus.value === 'rejected')) {
            Object.entries(latestFulfillment.value.payload).forEach(([k, v]) => {
                if (k === '_cdk_id') return
                if (k in formData) {
                    formData[k] = v as string
                }
            })
        }
    }

    const fetchLatestFulfillment = async () => {
        const oid = options.orderId()
        if (!oid) return

        try {
            const client = getSupabaseClient()
            let query = client
                .from('order_fulfillments')
                .select('*')
                .eq('order_id', oid)
                .order('submitted_at', { ascending: false })

            const cid = options.cdkId?.()
            if (cid) {
                query = query.contains('payload', { _cdk_id: cid })
            }

            const { data, error } = await query.limit(1).maybeSingle()

            if (!error && data) {
                latestFulfillment.value = data as OrderFulfillment
                initFormData()
            } else {
                latestFulfillment.value = null
                initFormData()
            }
        } catch (err) {
            console.error('获取回执失败:', err)
        }
    }

    const validate = () => {
        for (const f of fields.value) {
            if (!formData[f.key]) {
                options.onError(`请输入${f.label}`)
                return false
            }
        }
        return true
    }

    const handleInsert = async () => {
        if (!validate()) return
        isSubmitting.value = true
        try {
            const client = getSupabaseClient()
            const payload: Record<string, string> = {}
            fields.value.forEach(f => {
                payload[f.key] = formData[f.key] || ''
            })

            const cid = options.cdkId?.()
            if (cid) {
                payload['_cdk_id'] = cid
            }

            const { data, error } = await client
                .from('order_fulfillments')
                .insert({
                    order_id: options.orderId(),
                    status: 'submitted',
                    payload,
                    submitted_at: new Date().toISOString()
                })
                .select()
                .single()

            if (error) throw error

            latestFulfillment.value = data as OrderFulfillment
            options.onSuccess('回执提交成功')
            if (options.onCallback) options.onCallback()
        } catch (err: any) {
            options.onError(err.message || '提交失败')
        } finally {
            isSubmitting.value = false
        }
    }

    const handleUpdate = async () => {
        if (!latestFulfillment.value) return
        if (!validate()) return
        isSubmitting.value = true
        try {
            const client = getSupabaseClient()
            const payload: Record<string, string> = {}
            fields.value.forEach(f => {
                payload[f.key] = formData[f.key] || ''
            })

            const cid = options.cdkId?.()
            if (cid) {
                payload['_cdk_id'] = cid
            }

            const { error } = await client
                .from('order_fulfillments')
                .update({
                    payload,
                    status: 'submitted',
                    submitted_at: new Date().toISOString()
                })
                .eq('id', latestFulfillment.value.id)

            if (error) throw error

            options.onSuccess('回执修改成功')
            await fetchLatestFulfillment()
            if (options.onCallback) options.onCallback()
        } catch (err: any) {
            options.onError(err.message || '修改失败')
        } finally {
            isSubmitting.value = false
        }
    }

    watch(() => options.cdkFields(), () => {
        initFormData()
    }, { immediate: true })

    return {
        formData,
        latestFulfillment,
        latestStatus,
        latestRejectReason,
        isSubmitting,
        fields,
        fetchLatestFulfillment,
        handleInsert,
        handleUpdate
    }
}
