<template>
  <div class="mobile-wallet-page">
    
    <!-- Top Nav -->
    <MobileSubPageHeader title="我的额度" />

    <!-- 1. Asset Hero Card (Mobile Version) -->
    <div class="asset-card">
        <div class="aurora-bg"></div>
        <div class="card-content">
            <div class="card-top">
                <span class="label">当前可用额度</span>
                <el-icon class="info-icon" @click="showTip"><InfoFilled /></el-icon>
            </div>
            <div class="balance-row">
                <span class="symbol"></span>
                <span class="amount">{{ Number(balance).toFixed(2) }}</span>
                <span class="unit">点</span>
            </div>
            <button class="recharge-btn" @click="showRecharge = true">
                <el-icon><Lightning /></el-icon> 立即充值
            </button>
        </div>
    </div>

    <!-- 2. Transaction List -->
    <div class="transaction-section">
        <div class="tabs-row">
            <div 
                v-for="tab in tabs" 
                :key="tab.value"
                class="tab-pill"
                :class="{ active: currentTab === tab.value }"
                @click="currentTab = tab.value"
            >
                {{ tab.label }}
            </div>
        </div>

        <MobileInfiniteList 
            :loading="loading" 
            :finished="finished" 
            :list="displayList" 
            @load="loadMore"
        >
             <div 
                class="txn-item" 
                v-for="(item, index) in displayList" 
                :key="index"
            >
                <div class="txn-left">
                    <div class="txn-title">{{ item.description || '余额变动' }}</div>
                    <div class="txn-time">{{ formatDate(item.createdAt) }}</div>
                </div>
                <div class="txn-right" :class="getAmountClass(item.amount)">
                    {{ item.amount > 0 ? '+' : '' }}{{ Number(item.amount).toFixed(2) }}
                </div>
            </div>
        </MobileInfiniteList>
    </div>

    <!-- Custom Tip Modal -->
    <Teleport to="body">
        <div v-if="showTipModal" class="modal-overlay" @click="showTipModal = false">
            <div class="tip-content" @click.stop>
                <div class="tip-header">
                    <el-icon class="tip-icon"><InfoFilled /></el-icon>
                    <span>额度说明</span>
                </div>
                <div class="tip-body">
                    凡图拉额度仅用于平台内服务使用，不可提现或转让。
                </div>
                <div class="tip-footer">
                    <button class="modal-confirm-btn" @click="showTipModal = false">我知道了</button>
                </div>
            </div>
        </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, InfoFilled, Lightning } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { alipayApi } from '@/api/client/alipay-payment'
import { useUserStore } from '@/stores/client/user'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { useNotify } from '@/composables/useNotify'
const RechargeModal = defineAsyncComponent(() => import('@/components/mobile/profile/modals/RechargeModal.vue'))
import MobileInfiniteList from '@/components/mobile/list/MobileInfiniteList.vue'
import MobileSubPageHeader from '@/components/mobile/layout/MobileSubPageHeader.vue'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { formatDate } = useBizFormat()
const { success, info, error } = useNotify()
const showRecharge = ref(false)
const showTipModal = ref(false)

// Data
const balance = computed(() => userStore.user?.balance || 0)
const transactions = ref<any[]>([])
const loadingData = ref(false)

// Tabs Logic
const currentTab = ref('all')
const tabs = [
    { label: '全部', value: 'all' },
    { label: '收入', value: 'income' },
    { label: '支出', value: 'expense' }
]

// Filter Logic
const filteredTransactions = computed(() => {
    if (currentTab.value === 'all') return transactions.value
    if (currentTab.value === 'income') return transactions.value.filter((t: any) => t.amount > 0)
    if (currentTab.value === 'expense') return transactions.value.filter((t: any) => t.amount < 0)
    return transactions.value
})

// Infinite Scroll Logic - Use default pageSize 10 as requested
const { displayList, loading, finished, loadMore, reset } = useInfiniteScroll({
    data: filteredTransactions,
    pageSize: 10
})

// Fetch Data
const fetchData = async () => {
    loadingData.value = true
    try {
        const res = await authApi.getWalletData()
        if (res.success && res.data) {
            transactions.value = res.data.transactions || []
        }
    } finally {
        loadingData.value = false
    }
}

const refreshData = async () => {
    await userStore.fetchUserInfo()
    await fetchData()
}

const showTip = () => {
    showTipModal.value = true
}

const getAmountClass = (amt: number) => {
    return amt > 0 ? 'text-green' : 'text-white'
}

// 处理支付宝 H5 支付回跳（alipay_order 参数）
async function handleAlipayReturn() {
    const orderNo = route.query.alipay_order as string
    if (!orderNo) return

    // 清除 URL 参数，避免刷新重复触发
    router.replace({ query: {} })

    info('正在确认支付结果...')

    // 轮询最多 10 次（30 秒）
    for (let i = 0; i < 10; i++) {
        await new Promise(resolve => setTimeout(resolve, 3000))
        try {
            const res = await alipayApi.queryOrder(orderNo)
            if (res.success && res.data?.paid) {
                success('充值成功！')
                await refreshData()
                return
            }
        } catch (e) {
            console.error('[AlipayReturn] Query error:', e)
        }
    }

    error('支付结果确认超时，如已扣款请稍后刷新查看余额')
}

onMounted(() => {
    if (!userStore.isLoggedIn) {
        router.push('/mobile')
        return
    }
    fetchData()
    handleAlipayReturn()
})

watch(currentTab, () => {
    // handled by useInfiniteScroll via watch(data) if data ref changed, but here computed changes.
    // The composable watches 'data' ref. Since we passed a computed, we might need manual reset if composable doesn't watch deeply or ref value change.
    // Actually useInfiniteScroll expects a Ref. filteredTransactions is a Ref.
    // We should double check if useInfiniteScroll watches the ref value change. 
    // Looking at useInfiniteScroll code: "if (isClientMode) { watch(data!, () => { reset() }) }"
    // So it should auto-reset.
})

</script>

<style scoped>
.mobile-wallet-page {
    min-height: 100vh;
    padding-bottom: 40px;
    background: #020617; /* Very Dark BG */
    color: #fff;
    padding-top: 0;
}

/* Asset Card - Optimized Styling */
.asset-card {
    margin: 16px 12px 0 12px; /* Wider: 12px margin instead of 20px */
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    /* Darker, flatter look */
    background: #0F172A; 
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.aurora-bg {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    /* Subtle central glow */
    background: radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, transparent 70%);
    pointer-events: none;
}

.card-content {
    position: relative; z-index: 2;
    padding: 24px 20px; /* Reduced vertical padding */
    display: flex; flex-direction: column; align-items: center;
}

.card-top {
    display: flex; align-items: center; gap: 6px;
    color: #64748B; font-size: 13px; margin-bottom: 16px; font-weight: 500;
}
.info-icon { opacity: 0.6; cursor: pointer; transition: color 0.2s; font-size: 14px; }
.info-icon:hover { color: #fff; opacity: 1; }

.balance-row { margin-bottom: 32px; text-align: center; }
.amount { 
    font-size: 52px; font-weight: 700; font-family: 'DIN Alternate', sans-serif; letter-spacing: -2px; 
    color: #fff; 
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    /* White glow text */
}
.unit { font-size: 14px; color: #64748B; margin-left: 6px; font-weight: 500; }

.recharge-btn {
    /* Orange Gradient Button */
    background: linear-gradient(90deg, #FF6B00 0%, #FF2E00 100%);
    border: none; color: #fff;
    padding: 12px 48px; border-radius: 99px;
    font-size: 16px; font-weight: 600;
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 4px 20px rgba(255, 46, 0, 0.25);
    transition: all 0.2s;
}
.recharge-btn:active { transform: scale(0.96); box-shadow: 0 2px 10px rgba(255, 46, 0, 0.2); }

/* Transaction Section */
.transaction-section {
    margin-top: 24px;
    background: transparent; /* Remove container bg for cleaner look */
    /* border-top: 1px solid rgba(255,255,255,0.05); */
    min-height: 400px;
    padding: 0 16px;
}

.tabs-row {
    display: flex; gap: 12px; margin-bottom: 16px;
}

.tab-pill {
    padding: 6px 16px;
    background: transparent;
    border-radius: 99px; font-size: 14px; color: #64748B;
    transition: all 0.2s;
    border: 1px solid transparent;
}
.tab-pill.active {
    background: #1E293B; 
    color: #F8FAFC; font-weight: 600;
    border-color: rgba(255,255,255,0.1);
}

.list-container {
    display: flex; flex-direction: column; gap: 0;
}

.txn-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.03);
}
.txn-item:last-child { border-bottom: none; }
.txn-title { font-size: 14px; color: #CBD5E1; margin-bottom: 6px; font-weight: 400; }
.txn-time { font-size: 12px; color: #475569; }

.txn-right { font-size: 16px; font-weight: 600; font-family: 'DIN Alternate', sans-serif; }
.text-green { color: #10B981; }
.text-white { color: #E2E8F0; }

/* Tip Modal Styles */
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
    z-index: 2000; display: flex; align-items: center; justify-content: center;
    padding: 30px; animation: fadeIn 0.3s ease;
}
.tip-content {
    background: #1E293B;
    width: 100%; max-width: 300px;
    border-radius: 20px; padding: 24px;
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.tip-header {
    display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
    font-size: 16px; font-weight: 600; color: #fff;
}
.tip-icon { color: #94A3B8; font-size: 18px; }

.tip-body {
    font-size: 14px; color: #94A3B8; line-height: 1.5; margin-bottom: 20px;
}

.tip-footer { text-align: right; }
.modal-confirm-btn {
    padding: 8px 20px;
    background: #3B82F6;
    color: #fff; border: none;
    border-radius: 8px; font-size: 14px; font-weight: 600;
    transition: all 0.2s;
}
.modal-confirm-btn:active { background: #2563EB; }

</style>
