/**
 * 客户端订单列表 Composable
 * 遵循 CLIENT_DEVELOPMENT_GUIDE.md 规范
 */

import { ref, computed } from 'vue'
import { clientOrderApi, type ClientOrder, type ClientPreOrder } from '@/api/client'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useBizConfig } from '@/composables/common/useBizConfig'

export function useOrderList() {
    // ========================================
    // 状态
    // ========================================
    const loading = ref(false)
    const orders = ref<ClientOrder[]>([])
    const preOrders = ref<ClientPreOrder[]>([])
    const currentTab = ref('all')

    // ========================================
    // 全局工具
    // ========================================
    const { formatPrice, formatDate } = useBizFormat()
    const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()

    // ========================================
    // Tab 定义
    // ========================================
    const tabs = [
        { label: '全部订单', value: 'all' },
        { label: '待支付', value: 'pending' },
        { label: '待发货', value: 'pending_delivery' },
        { label: '使用中', value: 'active' },
        { label: '已过期', value: 'expired' },
        { label: '退款/售后', value: 'refund' } // 包含 refunding + refunded
    ]

    // ========================================
    // 计算属性
    // ========================================

    // 合并订单列表 (待支付 + 已支付) - 扁平化字段供模板使用
    const allOrders = computed(() => {
        // 将预订单格式化
        const pendingList = preOrders.value.map(o => ({
            id: o.id,
            order_no: o.order_no,
            status: 'pending' as const,
            total_amount: o.total_amount,
            quantity: o.quantity,
            created_at: o.created_at,
            // 扁平化字段 (供模板直接使用)
            product_name: o.product_snapshot?.product_name || '待支付商品',
            product_image: o.product_snapshot?.image || '',
            spec_text: formatSpec(o.sku_snapshot?.spec_combination),
            isPending: true
        }))

        // 格式化已支付订单
        const paidList = orders.value.map(o => ({
            id: o.id,
            order_no: o.order_no,
            status: o.status,
            total_amount: o.total_amount,
            quantity: o.quantity,
            created_at: o.created_at,
            // 扁平化字段
            product_name: o.product_snapshot?.product_name || '未知商品',
            product_image: o.product_snapshot?.image || '',
            spec_text: formatSpec(o.sku_snapshot?.spec_combination),
            isPending: false
        }))

        // 合并并按时间排序
        const merged = [...pendingList, ...paidList]
        merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        return merged
    })

    // 状态过滤策略定义
    const filterStrategies: Record<string, (order: any) => boolean> = {
        'all': () => true,
        // 待支付: 仅显示预订单 (pending)
        'pending': (o) => o.isPending === true && o.status === 'pending',
        // 待发货: 仅显示正式订单
        'pending_delivery': (o) => !o.isPending && o.status === 'pending_delivery',
        // 使用中: 仅显示正式订单
        'active': (o) => !o.isPending && o.status === 'active',
        // 已过期: 仅显示正式订单 (预订单过期会被自动清理或不显示)
        'expired': (o) => !o.isPending && o.status === 'expired',
        // 退款/售后: 包含退款中和已退款
        'refund': (o) => !o.isPending && ['refunding', 'refunded'].includes(o.status)
    }

    // 根据 Tab 过滤
    const filteredList = computed(() => {
        const strategy = filterStrategies[currentTab.value]
        if (!strategy) return allOrders.value
        return allOrders.value.filter(strategy)
    })

    // ========================================
    // 方法
    // ========================================

    /**
     * 加载订单列表
     */
    async function loadList() {
        loading.value = true
        try {
            // 并行获取已支付订单和待支付预订单
            const [ordersRes, preOrdersRes] = await Promise.all([
                clientOrderApi.getOrderList(),
                clientOrderApi.getPendingPreOrders()
            ])

            if (ordersRes.success) {
                orders.value = ordersRes.data || []
            }

            if (preOrdersRes.success) {
                preOrders.value = preOrdersRes.data || []
            }
        } catch (error) {
            console.error('加载订单列表失败:', error)
        } finally {
            loading.value = false
        }
    }

    /**
     * 切换 Tab
     */
    function changeTab(tabValue: string) {
        currentTab.value = tabValue
    }

    /**
     * 删除预订单 (取消待支付订单)
     */
    async function deletePreOrder(preOrderId: string): Promise<boolean> {
        const res = await clientOrderApi.cancelPreOrder(preOrderId)
        if (res.success) {
            // 从列表中移除
            preOrders.value = preOrders.value.filter(o => o.id !== preOrderId)
            return true
        }
        return false
    }

    /**
     * 格式化规格显示
     */
    function formatSpec(spec: Record<string, string> | undefined): string {
        if (!spec) return ''
        if (typeof spec === 'string') return spec
        return Object.values(spec).join(' / ')
    }

    /**
     * 获取当前 Tab 的中文名
     */
    function getCurrentTabLabel(): string {
        return tabs.find(t => t.value === currentTab.value)?.label || '订单'
    }

    return {
        // 状态
        loading,
        orders,
        preOrders,
        currentTab,
        tabs,

        // 计算属性
        allOrders,
        filteredList,

        // 方法
        loadList,
        changeTab,
        deletePreOrder,
        formatSpec,
        getCurrentTabLabel,

        // 全局工具
        formatPrice,
        formatDate,
        getOrderStatusLabel,
        getOrderStatusType
    }
}
