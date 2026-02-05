import { computed, type Ref } from 'vue'
import { useBizConfig } from '@/composables/common/useBizConfig'

interface OrderDetailLogicProps {
    order: Ref<any>
    pendingRefundRequest: Ref<any>
    refundCancelledCount: Ref<number>
}

export function useOrderDetailLogic({ order, pendingRefundRequest, refundCancelledCount }: OrderDetailLogicProps) {
    const { getOrderStatusLabel } = useBizConfig()

    // --- Helpers ---
    const getTimeLevel = (days: number) => {
        if (days <= 3) return 'critical' // Red
        if (days <= 7) return 'warning'  // Orange
        return 'safe'                    // Green
    }

    // --- Computed Status Properties ---

    const formattedStatusText = computed(() => {
        const s = order.value.status
        if (s === 'pending_delivery') return '待发货'
        if (s === 'active') return '使用中'
        if (s === 'refunding') return '退款中'
        if (s === 'refunded') return '已退款'
        return getOrderStatusLabel(s || '')
    })

    const remainingDays = computed(() => {
        if (!order.value.expires_at) return null
        const diff = new Date(order.value.expires_at).getTime() - Date.now()
        if (diff <= 0) return 0
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
    })

    // --- Action Rules Logic ---

    const isOneTime = computed(() => order.value.orderType === 'one_time_cdk')

    const isVirtualOrShared = computed(() => {
        if (!order.value.orderType) return false
        return ['virtual', 'shared_account'].includes(order.value.orderType)
    })

    const canRenew = computed(() => {
        if (isOneTime.value) return false
        const s = order.value.status
        return ['active', 'expired'].includes(s || '')
    })

    // 1. 可申请退款: 虚拟/合租类型 + pending_delivery/active + 无待审核申请 + 取消次数 < 3
    const canRefund = computed(() =>
        isVirtualOrShared.value &&
        ['pending_delivery', 'active'].includes(order.value.status || '') &&
        !pendingRefundRequest.value &&
        refundCancelledCount.value < 3
    )

    // 2. 可取消退款: 有待审核申请且状态为 refunding
    const canCancelRefund = computed(() =>
        isVirtualOrShared.value &&
        order.value.status === 'refunding' &&
        !!pendingRefundRequest.value
    )

    // 3. 退款次数已达上限
    const isRefundBlocked = computed(() =>
        isVirtualOrShared.value &&
        ['pending_delivery', 'active'].includes(order.value.status || '') &&
        !pendingRefundRequest.value &&
        refundCancelledCount.value >= 3
    )

    return {
        statusText: formattedStatusText,
        remainingDays,
        getTimeLevel,
        isOneTime,
        isVirtualOrShared,
        canRenew,
        canRefund,
        canCancelRefund,
        isRefundBlocked
    }
}
