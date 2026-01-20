<template>
  <div class="wallet-page">
    <!-- Quota Master Card -->
    <div class="asset-master-card">
      <div class="card-bg"></div>
      <div class="card-content">
        <div class="card-header">
          <div class="header-left">
            <span class="card-label">我的额度</span>
            <div class="card-tag">My Quota</div>
          </div>
          <!-- Info Tooltip -->
          <el-tooltip
            content="凡图拉额度仅用于平台内服务使用，不可提现或转让"
            placement="top"
            effect="dark"
          >
            <div class="info-icon">
              <el-icon><Warning /></el-icon>
            </div>
          </el-tooltip>
        </div>
        
        <div class="balance-container">
          <span class="amount-integer">{{ balanceInteger }}</span>
          <span class="amount-decimal">.{{ balanceDecimal }}</span>
          <span class="unit-suffix">点</span>
        </div>

        <div class="card-actions">
          <button class="action-btn" @click="showRechargeModal = true">
            <el-icon><Lightning /></el-icon>
            <span>购买额度</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Transaction Ledger -->
    <div class="ledger-container">
      <div class="ledger-header">
        <h3 class="ledger-title">额度变动</h3>
        
        <!-- Tabs -->
        <div class="ledger-tabs">
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'all' }"
            @click="activeTab = 'all'"
          >全部</div>
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'income' }"
            @click="activeTab = 'income'"
          >获取</div>
          <div 
            class="tab-item" 
            :class="{ active: activeTab === 'expense' }"
            @click="activeTab = 'expense'"
          >消耗</div>
        </div>
      </div>

      <!-- Scrollable List -->
      <div class="ledger-list-wrapper">
        <div v-if="loading" class="loading-state">
           <el-skeleton animated :rows="3" />
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="empty-state">
           <div class="empty-icon-wrapper">
             <el-icon><Wallet /></el-icon>
           </div>
           <span>暂无{{ activeTab === 'all' ? '' : activeTab === 'income' ? '获取' : '消耗' }}记录</span>
        </div>

        <div v-else class="transaction-list">
          <div 
            v-for="item in filteredTransactions" 
            :key="item.id" 
            class="transaction-row"
          >
            <!-- Icon -->
            <div class="t-icon-box" :class="getTypeClass(item.amount)">
              <el-icon v-if="item.amount > 0"><Top /></el-icon>
              <el-icon v-else><Bottom /></el-icon>
            </div>

            <!-- Info -->
            <div class="t-info">
              <div class="t-desc">{{ item.description || item.type }}</div>
              <div class="t-date">{{ formatDate(item.created_at) }}</div>
            </div>

            <!-- Amount -->
            <div class="t-amount" :class="getTypeClass(item.amount)">
              {{ item.amount > 0 ? '+' : '' }}{{ formatAmount(item.amount) }} <span class="t-unit">点</span>
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WalletRechargeModal from '@/components/WalletRechargeModal.vue'
import { authApi } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import { Lightning, Top, Bottom, Wallet, Warning } from '@element-plus/icons-vue'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const showRechargeModal = ref(false)
const balance = ref(0)
const transactions = ref<any[]>([])
const loading = ref(true)

// Tabs state
const activeTab = ref<'all' | 'income' | 'expense'>('all')

const balanceInteger = computed(() => Math.floor(balance.value).toLocaleString())
const balanceDecimal = computed(() => (balance.value % 1).toFixed(2).split('.')[1])

// Filtered Data
const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') return transactions.value
  if (activeTab.value === 'income') return transactions.value.filter(t => t.amount > 0)
  if (activeTab.value === 'expense') return transactions.value.filter(t => t.amount < 0)
  return transactions.value
})

// Data Fetching
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

// Helpers
const getTypeClass = (amount: number) => {
  return amount > 0 ? 'income' : 'expense'
}

const formatAmount = (val: number) => {
  return Math.abs(val).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleModalClose = () => {
    showRechargeModal.value = false
    fetchWallet()
}

onMounted(async () => {
    await fetchWallet()
    if (route.query.amount) {
        showRechargeModal.value = true
    }
})
</script>

<style scoped>
/* Page Layout */
.wallet-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- Asset Master Card --- */
.asset-master-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  padding: 32px 40px;
  color: #fff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0F172A; /* Fallback */
}

/* Background Texture - Deep Obsidian */
.card-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, #0F172A 0%, #020617 100%);
  z-index: 1;
}

/* Optional subtle glow */
.card-bg::before {
  content: '';
  position: absolute;
  top: -50%; right: -20%;
  width: 80%; height: 200%;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.05), transparent 70%);
  pointer-events: none;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Spread content */
  width: 100%;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  cursor: help;
  transition: all 0.2s;
}

.info-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  transform: scale(1.1);
}

.card-label {
  font-size: 16px;
  font-weight: 600;
  color: #94A3B8; /* Slate 400 */
}

.card-tag {
  font-size: 11px;
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;
  color: #CBD5E1; /* Slate 300 */
}

.balance-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 32px;
}

.amount-integer {
  font-size: 64px; /* Larger */
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  letter-spacing: -1px;
  color: #fff;
  line-height: 1;
}

.amount-decimal {
  font-size: 32px;
  font-weight: 600;
  color: #94A3B8; /* Dimmed */
  font-family: 'Outfit', sans-serif;
}

.unit-suffix {
  font-size: 20px;
  font-weight: 500;
  margin-left: 8px;
  color: #F97316; /* Orange Accent */
  /* Alignment Fix: Match baseline with proper line-height or margin */
  /* Since items are baseline aligned, adjusting opacity or weight might help visuals */
  /* '点' usually sits slightly higher than numerals visually, so margin-bottom isn't needed if baseline is true */
}

/* Action Button - Blue Default -> Orange Active */
.action-btn {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); /* Blue Default */
  border: none;
  border-radius: 100px;
  padding: 12px 48px; /* Standard padding */
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3), 0 2px 4px -1px rgba(59, 130, 246, 0.1);
}

.action-btn:hover {
  background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); /* Orange Hover */
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.2), 0 4px 6px -2px rgba(249, 115, 22, 0.1);
}

.action-btn:active {
  background: #C2410C;
  transform: translateY(0);
}

/* --- Transaction Ledger --- */
.ledger-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* Sheer Dark Glass */
  background: rgba(15, 23, 42, 0.6); 
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  overflow: hidden;
  min-height: 400px;
}

.ledger-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.ledger-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #E2E8F0;
}

/* Tabs - Blue/Orange Logic */
.ledger-tabs {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 12px;
  gap: 4px;
}

.tab-item {
  padding: 6px 18px;
  border-radius: 8px;
  font-size: 13px;
  color: #64748B; /* Inactive Slate */
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.tab-item:hover {
  color: #94A3B8;
}

.tab-item.active {
  background: rgba(249, 115, 22, 0.15); /* Orange bg */
  color: #F97316; /* Orange text */
  font-weight: 600;
}

/* List Wrapper */
.ledger-list-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.ledger-list-wrapper::-webkit-scrollbar { width: 6px; }
.ledger-list-wrapper::-webkit-scrollbar-track { background: transparent; }
.ledger-list-wrapper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

/* Transaction Row */
.transaction-row {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 8px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.transaction-row:hover {
  background: rgba(255, 255, 255, 0.03);
  transform: translateX(4px);
}

.t-icon-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
  font-size: 18px;
}

.t-icon-box.income {
  background: rgba(249, 115, 22, 0.15); /* Orange bg */
  color: #F97316;
}

.t-icon-box.expense {
  background: rgba(148, 163, 184, 0.1); /* Slate bg */
  color: #94A3B8;
}

.t-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.t-desc {
  font-size: 15px;
  color: #F1F5F9;
  font-weight: 500;
}

.t-date {
  font-size: 12px;
  color: #64748B;
}

.t-amount {
  font-family: 'Monaco', monospace;
  font-size: 16px;
  font-weight: 600;
}

.t-amount.income { color: #F97316; } /* Orange */
.t-amount.expense { color: #94A3B8; } /* Slate */

.t-unit {
  font-size: 12px;
  font-weight: normal;
  margin-left: 2px;
  opacity: 0.8;
}

/* Empty & Loading */
.loading-state { padding: 20px; }
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #475569;
}

.empty-icon-wrapper {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
  color: #64748B;
}
</style>