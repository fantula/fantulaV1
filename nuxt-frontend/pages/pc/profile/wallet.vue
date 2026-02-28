<template>
  <div class="wallet-page">
    <!-- 顶部固定区域 (Header) -->
    <div class="wallet-header">
      <!-- 1. Aurora Hero Card: The Asset Core (Extract: AssetHeroCard) -->
      <AssetHeroCard
          :balance="balance"
          @recharge="showRechargeModal = true"
      />
    </div>

    <!-- 滚动区域 (Internal Scroll) -->
    <div class="wallet-scroll-area">
      <!-- 2. Transaction Stream: The Glass Ledger (Extract: WalletLedger) -->
      <WalletLedger
          :displayList="displayList"
          :loading="listLoading"
          :finished="finished"
          :error="error"
          :activeTab="activeTab"
          @switchTab="switchTab"
          @loadMore="loadMore"
          @reload="reloadWallet"
      />
    </div>

    <!-- Recharge Modal -->
    <WalletRechargeModal 
      v-if="showRechargeModal" 
      :initial-amount="Number($route.query.amount)" 
      @close="handleModalClose" 
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile-pc',
  ssr: false,
  transition: { name: 'profile-fade', mode: 'out-in' }
})

import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const WalletRechargeModal = defineAsyncComponent(() => import('@/components/pc/modal/business/WalletRechargeModal.vue'))
import { authApi } from '@/api/client/auth'
import { alipayApi } from '@/api/client/alipay-payment'
import { useUserStore } from '@/stores/client/user'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import AssetHeroCard from '@/components/pc/wallet/AssetHeroCard.vue'
import WalletLedger from '@/components/pc/wallet/WalletLedger.vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const route = useRoute()
const showRechargeModal = ref(false)
const balance = ref(0)
const transactions = ref<any[]>([]) // Raw data
const loading = ref(true)

// Tabs state
const activeTab = ref<'all' | 'income' | 'expense'>('all')

// === Infinite Scroll Logic (Client Mode) ===

// 1. Computed Filtered Source
const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') return transactions.value
  if (activeTab.value === 'income') return transactions.value.filter(t => t.amount > 0)
  if (activeTab.value === 'expense') return transactions.value.filter(t => t.amount < 0)
  return transactions.value
})

// 2. Initialize Composable
const { displayList, loading: listLoading, finished, error, loadMore, reset } = useInfiniteScroll<any>({
    data: filteredTransactions,
    pageSize: 10
})

const fetchWallet = async () => {
  loading.value = true
  error.value = false
  try {
    const res = await authApi.getWalletData()
    if (res.success && res.data) {
        balance.value = res.data.balance || 0
        transactions.value = res.data.transactions || []
    } else {
        error.value = true
    }
  } catch (e) {
    if (import.meta.dev) console.error('Fetch wallet failed', e)
    error.value = true
  } finally {
    loading.value = false
  }
}

const reloadWallet = () => {
  fetchWallet()
}

// 处理支付宝回跳 - 轮询订单状态
async function handleAlipayReturn() {
    const orderNo = route.query.alipay_order as string
    if (!orderNo) return

    ElMessage.info('正在确认支付结果...')

    let attempts = 0
    const maxAttempts = 10

    const poll = async () => {
        if (attempts >= maxAttempts) {
            ElMessage.warning('支付结果确认超时，请刷新页面查看余额')
            return
        }
        attempts++

        try {
            const res = await alipayApi.queryOrder(orderNo)
            if (res.success && res.data?.paid) {
                ElMessage.success('充值成功！余额已更新')
                await fetchWallet()
                await userStore.fetchUserInfo()
                return
            }
        } catch (e) {
            console.error('[AlipayReturn] Query error:', e)
        }

        // 未支付，3秒后重试
        setTimeout(poll, 3000)
    }

    // 延迟1秒后开始轮询（等支付宝异步通知处理完）
    setTimeout(poll, 1000)
}

onMounted(async () => {
    await fetchWallet()
    if (route.query.amount) {
        showRechargeModal.value = true
    }
    // 处理支付宝电脑网站支付回跳
    if (route.query.alipay_order) {
        await handleAlipayReturn()
    }
})

const switchTab = (tab: 'all' | 'income' | 'expense') => {
    activeTab.value = tab
    // Auto reset by composable
}

const handleModalClose = () => {
    showRechargeModal.value = false
    fetchWallet()
}
</script>

<style scoped>
/* Page Layout - Container Lockdown */
.wallet-page {
  flex: 1; min-height: 0; width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 配合外层，锁定整体溢出 */
}

/* 顶部无需滚动的部分，四周增加内边距 */
.wallet-header {
  flex-shrink: 0;
  padding: 24px 32px 16px; /* 统一左右 padding */
}

/* 内部滚动区 */
.wallet-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 32px 32px; /* 底部预留空间 */
  min-height: 0; /* Webkit flex bug fix */
}
</style>