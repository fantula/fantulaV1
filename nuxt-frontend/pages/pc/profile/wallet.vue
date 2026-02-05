<template>
  <div class="wallet-page">
    <!-- 1. Aurora Hero Card: The Asset Core (Extract: AssetHeroCard) -->
    <AssetHeroCard
        :balance="balance"
        @recharge="showRechargeModal = true"
    />

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

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WalletRechargeModal from '@/components/pc/modal/business/WalletRechargeModal.vue'
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
    setTimeout(() => { loading.value = false }, 300) // Small delay for smooth transition
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
/* Page Layout */
.wallet-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  padding-bottom: 20px;
}
</style>