<template>
  <div class="mobile-wallet-page">
    
    <!-- Top Nav -->
    <div class="top-nav">
      <div class="back-btn" @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div class="page-title">我的额度</div>
      <div class="placeholder"></div>
    </div>

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

        <div class="list-container">
            <div v-if="loading && displayList.length === 0" class="loading-state">
                加载中...
            </div>
            <div v-else-if="displayList.length === 0" class="empty-state">
                暂无记录
            </div>
            
            <div 
                v-else
                class="txn-item" 
                v-for="(item, index) in displayList" 
                :key="index"
            >
                <div class="txn-left">
                    <div class="txn-title">{{ item.description || '余额变动' }}</div>
                    <div class="txn-time">{{ formatDate(item.createdAt) }}</div>
                </div>
                <div class="txn-right" :class="getAmountClass(item.amount)">
                    {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
                </div>
            </div>

            <div v-if="!finished && displayList.length > 0" class="load-more" @click="loadMore">
                {{ loading ? '加载中...' : '加载更多' }}
            </div>
            <div v-if="finished && displayList.length > 0" class="no-more">
                没有更多了
            </div>
        </div>
    </div>

    <!-- Recharge Modal -->
    <RechargeModal
        :visible="showRecharge"
        @close="showRecharge = false"
        @success="refreshData"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, InfoFilled, Lightning } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import { useBizFormat } from '@/composables/common/useBizFormat'
import RechargeModal from '@/components/mobile/profile/modals/RechargeModal.vue'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile',
  middleware: 'client-auth'
})

const router = useRouter()
const userStore = useUserStore()
const { formatDate } = useBizFormat()
const showRecharge = ref(false)

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

// Infinite Scroll Logic
const { displayList, loading, finished, loadMore, reset } = useInfiniteScroll({
    data: filteredTransactions,
    pageSize: 15
})

// Fetch Data
const fetchData = async () => {
    loadingData.value = true
    try {
        const res = await authApi.getWalletData()
        if (res.success && res.data) {
            // Balance should be synced via fetchUserInfo, not direct assignment
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
    // Simple alert for mobile, or better use a Toast
    alert('凡图拉额度仅用于平台内服务使用，不可提现或转让')
}

const getAmountClass = (amt: number) => {
    return amt > 0 ? 'text-green' : 'text-white'
}

onMounted(() => {
    if (!userStore.isLoggedIn) {
        router.push('/mobile')
        return
    }
    fetchData()
})

// Reset scroll when tab changes
watch(currentTab, () => {
    // useInfiniteScroll watches data source, but since source computed changes, it should verify reset.
    // The composable watches 'data', so it should auto-reset.
})

</script>

<style scoped>
.mobile-wallet-page {
    min-height: 100vh;
    padding-bottom: 40px;
    background: #0F172A; /* Dark BG */
    color: #fff;
    padding-top: 60px; /* Space for Top Nav */
}

/* Top Nav */
.top-nav {
    position: fixed; top: 0; left: 0; right: 0;
    height: 50px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(10px);
    z-index: 50;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.page-title { font-size: 17px; font-weight: 600; }
.back-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; }

/* Asset Card */
.asset-card {
    margin: 16px 16px 0 16px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
}

.aurora-bg {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.2), transparent 70%);
}

.card-content {
    position: relative; z-index: 2;
    padding: 24px;
    display: flex; flex-direction: column; align-items: center;
}

.card-top {
    display: flex; align-items: center; gap: 6px;
    color: #94A3B8; font-size: 13px; margin-bottom: 8px;
}
.info-icon { opacity: 0.7; }

.balance-row { margin-bottom: 24px; }
.amount { font-size: 42px; font-weight: 800; font-family: 'DIN Alternate', sans-serif; letter-spacing: -1px; }
.unit { font-size: 14px; color: #94A3B8; margin-left: 4px; }

.recharge-btn {
    background: linear-gradient(90deg, #F97316, #EA580C);
    border: none; color: #fff;
    padding: 10px 32px; border-radius: 99px;
    font-size: 15px; font-weight: 600;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
    display: flex; align-items: center; gap: 6px;
}
.recharge-btn:active { transform: scale(0.96); }

/* Transaction Section */
.transaction-section {
    margin-top: 24px;
    background: #1E293B;
    border-top-left-radius: 24px; border-top-right-radius: 24px;
    min-height: 400px; /* Fill rest */
    padding: 20px 16px;
}

.tabs-row {
    display: flex; gap: 12px; margin-bottom: 20px;
}

.tab-pill {
    padding: 6px 16px;
    background: rgba(255,255,255,0.05);
    border-radius: 99px; font-size: 13px; color: #94A3B8;
    transition: all 0.2s;
}
.tab-pill.active {
    background: rgba(255,255,255,0.15); color: #fff; font-weight: 600;
}

.list-container {
    display: flex; flex-direction: column; gap: 0;
}

.txn-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.txn-title { font-size: 15px; color: #fff; margin-bottom: 4px; }
.txn-time { font-size: 12px; color: #64748B; }

.txn-right { font-size: 16px; font-weight: 600; font-family: 'DIN Alternate', sans-serif; }
.text-green { color: #34D399; }
.text-white { color: #fff; }

.load-more, .no-more, .loading-state, .empty-state {
    padding: 20px; text-align: center; color: #64748B; font-size: 13px;
}
</style>
