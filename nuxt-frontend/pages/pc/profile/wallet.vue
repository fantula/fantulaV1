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
  layout: 'pc'
})

import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const WalletRechargeModal = defineAsyncComponent(() => import('@/components/pc/modal/business/WalletRechargeModal.vue'))
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { useInfiniteScroll } from '@/composables/client/useInfiniteScroll'
import AssetHeroCard from '@/components/pc/wallet/AssetHeroCard.vue'
import WalletLedger from '@/components/pc/wallet/WalletLedger.vue'

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
  try {
    const res = await authApi.getWalletData()
    if (res.success && res.data) {
        balance.value = res.data.balance || 0
        transactions.value = res.data.transactions || []
    }
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
    await fetchWallet()
    if (route.query.amount) {
        showRechargeModal.value = true
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