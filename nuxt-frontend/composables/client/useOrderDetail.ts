import { ref, computed, onMounted, type Ref } from 'vue'
import { clientOrderApi } from '@/api/client'
import { ticketApi } from '@/api/client/ticket'
import { useOrderDetailLogic } from './useOrderDetailLogic'
import { useBizFormat } from '@/composables/common/useBizFormat'

// ============ Types ============

export interface OrderDetail {
    id: string
    order_no: string
    orderType: 'virtual' | 'shared_account' | 'one_time_cdk'
    status: 'pending_delivery' | 'active' | 'expired' | 'refunding' | 'refunded' | 'cancelled'
    quantity: number
    totalAmount: number
    createdAt: string
    expires_at?: string
    productName: string
    productImage: string
    skuSpec: string
    delivery_type?: string
    // Raw snapshots for components that need them
    product_snapshot?: any
    sku_snapshot?: any
}

export interface CdkItem {
    id: string
    code: string
    parsed: any
    accountData: any
    slotIndex?: number
}

export interface SlotItem {
    id: string
    slot_index: number
    cdk_id: string
}

interface FulfillmentField {
    key: string
    label: string
    value: string
}

// ============ Composable ============

export function useOrderDetail(orderId: string) {
    const { formatDate } = useBizFormat()

    // --- Core State ---
    const order = ref<Partial<OrderDetail>>({})
    const cdkList = ref<CdkItem[]>([])
    const slotList = ref<SlotItem[]>([])
    const instructionImage = ref('')
    const instructionImages = ref<string[]>([])
    const loading = ref(true)
    const error = ref<string | null>(null)

    // --- Refund State ---
    const pendingRefundRequest = ref<any>(null)
    const refundCancelledCount = ref(0)

    // --- Ticket State ---
    const activeTicketId = ref<string | null>(null)

    // --- Shared Logic ---
    const logic = useOrderDetailLogic({
        order: order as Ref<any>,
        pendingRefundRequest,
        refundCancelledCount
    })

    // --- Computed Helpers ---
    const hasActiveTicket = computed(() => !!activeTicketId.value)

    const canCreateTicket = computed(() =>
        !activeTicketId.value &&
        ['pending_delivery', 'active'].includes(order.value.status || '')
    )

    const showFulfillment = computed(() =>
        ['pending_delivery', 'active', 'completed'].includes(order.value.status || '') &&
        order.value.status !== 'refunding'
    )

    const showExpiryWarning = computed(() => {
        if (order.value.status !== 'active') return false
        const days = logic.remainingDays.value
        return days !== null && days <= 7
    })

    // --- Format Helpers ---
    const formatTime = (t?: string) => t ? formatDate(t) : '-'

    const getAmountInteger = (val?: number) =>
        val !== undefined ? Math.floor(val).toLocaleString() : '0'

    const getAmountDecimal = (val?: number) =>
        val !== undefined ? (val % 1).toFixed(2).split('.')[1] || '00' : '00'

    // --- CDK Field Parser ---
    const getFieldsForCdk = (cdk: CdkItem): FulfillmentField[] => {
        let keys: string[] = []

        if (cdk.parsed && typeof cdk.parsed === 'object') {
            if (Array.isArray(cdk.parsed.fields) && cdk.parsed.fields.length > 0) {
                keys = cdk.parsed.fields.filter((f: any) => typeof f === 'string')
            } else if (Object.keys(cdk.parsed).length > 0) {
                keys = Object.keys(cdk.parsed)
            }
        }

        if (keys.length === 0) {
            const raw = cdk.code?.trim() || ''
            if (!raw) return []
            const cleaned = raw.replace(/[()（）[\]【】]/g, '')
            keys = cleaned.split(/[,，、]/).map(s => s.trim()).filter(s => s.length > 0)
        }

        return keys.map(key => ({ key, label: key, value: '' }))
    }

    // --- Slot CDK Lookup ---
    const getCdkForSlot = (slot: SlotItem): CdkItem => {
        if (!slot || !slot.cdk_id) return {} as CdkItem
        return (cdkList.value.find(c => c.id === slot.cdk_id) || {}) as CdkItem
    }

    // --- Data Loading ---
    const loadData = async () => {
        if (!orderId) return

        loading.value = true
        error.value = null

        try {
            const res = await clientOrderApi.getOrderDetail(orderId)

            if (res.success && res.data) {
                const d = res.data as any
                const pSnap = d.product_snapshot || {} as any
                const sSnap = d.sku_snapshot || {} as any

                order.value = {
                    id: d.id,
                    order_no: d.order_no,
                    orderType: d.order_type,
                    status: d.status,
                    quantity: d.quantity,
                    totalAmount: Number(d.total_amount),
                    createdAt: d.created_at,
                    expires_at: d.expires_at,
                    productName: pSnap.product_name || '',
                    productImage: pSnap.image || '',
                    skuSpec: sSnap.spec_combination
                        ? Object.values(sSnap.spec_combination).join(' ')
                        : '默认',
                    // Include raw snapshots for components
                    product_snapshot: pSnap,
                    sku_snapshot: sSnap
                }

                // Parse CDKs
                if (d.cdkList && Array.isArray(d.cdkList)) {
                    cdkList.value = d.cdkList.map((cdk: any) => ({ ...cdk }))

                    // Extract instruction image from first CDK
                    if (cdkList.value.length > 0) {
                        const first = cdkList.value[0]
                        if (first.accountData) {
                            const singleImage = first.accountData.image ||
                                first.accountData.help_image ||
                                first.accountData.common_image || ''
                            instructionImage.value = singleImage

                            if (Array.isArray(first.accountData.images) && first.accountData.images.length > 0) {
                                instructionImages.value = first.accountData.images
                            } else if (singleImage) {
                                instructionImages.value = [singleImage]
                            } else {
                                instructionImages.value = []
                            }
                        }
                    }
                }

                // Parse Slots
                slotList.value = d.slotList && Array.isArray(d.slotList) ? d.slotList : []

                // Load Refund Info
                await loadRefundInfo()

                // Load Active Ticket
                await loadTicketInfo()
            }
        } catch (e) {
            if (import.meta.dev) console.error('Failed to load order detail:', e)
            error.value = '加载订单详情失败'
            if (typeof document !== 'undefined') {
                import('element-plus').then(({ ElMessage }) => {
                    ElMessage.error('网络异常，加载订单信息失败')
                }).catch(() => { })
            }
        } finally {
            loading.value = false
        }
    }

    const loadRefundInfo = async () => {
        if (!orderId || !logic.isVirtualOrShared.value) {
            pendingRefundRequest.value = null
            refundCancelledCount.value = 0
            return
        }

        try {
            const res = await clientOrderApi.getOrderRefundInfo(orderId)
            if (res.success) {
                pendingRefundRequest.value = res.pendingRequest || null
                refundCancelledCount.value = res.cancelledCount ?? 0
            }
        } catch (e) {
            if (import.meta.dev) console.error('Failed to load refund info:', e)
        }
    }

    const loadTicketInfo = async () => {
        try {
            const res = await ticketApi.getList('processing')
            if (res.success && res.data) {
                const match = res.data.find((t: any) => t.order_id === orderId)
                activeTicketId.value = match ? match.id : null
            }
        } catch (e) {
            if (import.meta.dev) console.error('Failed to load ticket info:', e)
        }
    }

    // --- Success Handlers (for callbacks) ---
    const handleRefundSuccess = async () => {
        await loadRefundInfo()
        await loadData()
    }

    const handleCancelRefundSuccess = async () => {
        pendingRefundRequest.value = null
        refundCancelledCount.value++
        await loadData()
    }

    const handleTicketSuccess = async () => {
        await loadData()
    }

    // --- Auto Load ---
    onMounted(loadData)

    return {
        // Core Data
        order,
        cdkList,
        slotList,
        instructionImage,
        instructionImages,
        loading,
        error,

        // Refund Data
        pendingRefundRequest,
        refundCancelledCount,

        // Ticket Data
        activeTicketId,
        hasActiveTicket,
        canCreateTicket,

        // Display Logic (from shared composable)
        ...logic,

        // Additional Computed
        showFulfillment,
        showExpiryWarning,

        // Helpers
        formatTime,
        getAmountInteger,
        getAmountDecimal,
        getFieldsForCdk,
        // --- Slot CDK Lookup ---
        getCdkForSlot,

        // Actions
        loadData,
        loadRefundInfo,
        handleRefundSuccess,
        handleCancelRefundSuccess,
        handleTicketSuccess,
    }
}
