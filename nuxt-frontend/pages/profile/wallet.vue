<template>
  <div class="wallet-page">
    <!-- 1. Aurora Hero Card: The Asset Core -->
    <div class="asset-hero-card">
      <div class="hero-aurora-bg"></div>
      
      <div class="hero-content">
        <!-- Top Row: Label & Info -->
        <div class="hero-header">
          <div class="header-main">
            <div class="card-icon-wrapper">
              <el-icon><Wallet /></el-icon>
            </div>
            <div class="header-text">
              <span class="card-label">我的额度</span>
              <div class="card-tag">My Quota</div>
            </div>
          </div>
          
          <el-tooltip
            content="凡图拉额度仅用于平台内服务使用，不可提现或转让"
            placement="top"
            effect="dark"
          >
            <div class="info-btn">
              <el-icon><Warning /></el-icon>
            </div>
          </el-tooltip>
        </div>
        
        <!-- Middle: Balance Display -->
        <div class="balance-display">
          <div class="balance-number">
            <span class="amount-integer">{{ balanceInteger }}</span>
            <span class="amount-decimal">.{{ balanceDecimal }}</span>
          </div>
          <div class="balance-unit">点</div>
        </div>

        <!-- Bottom: Action (Neon Pill) -->
        <div class="hero-footer">
          <button class="neon-action-btn" @click="showRechargeModal = true">
            <el-icon><Lightning /></el-icon>
            <span>立即充值</span>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>
      
      <!-- Decorative Background Icon -->
      <el-icon class="card-bg-icon"><Wallet /></el-icon>
    </div>

    <!-- 2. Transaction Stream: The Glass Ledger -->
    <div class="ledger-section">
      <div class="ledger-header">
        <h3 class="section-title">额度流水</h3>
        
        <!-- Floating Pill Tabs -->
        <div class="glass-pill-tabs">
          <div 
            class="pill-tab" 
            :class="{ active: activeTab === 'all' }"
            @click="activeTab = 'all'"
          >全部</div>
          <div 
            class="pill-tab income" 
            :class="{ active: activeTab === 'income' }"
            @click="activeTab = 'income'"
          >获取</div>
          <div 
            class="pill-tab expense" 
            :class="{ active: activeTab === 'expense' }"
            @click="activeTab = 'expense'"
          >消耗</div>
        </div>
      </div>

      <!-- Glass List -->
      <div class="ledger-stream">
        <div v-if="loading" class="stream-loading">
           <el-skeleton animated :rows="3" />
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="stream-empty">
           <div class="empty-bubble">
             <el-icon><Document /></el-icon>
           </div>
           <span>暂无{{ activeTab === 'all' ? '' : activeTab === 'income' ? '获取' : '消耗' }}记录</span>
        </div>

        <div v-else class="stream-list">
          <transition-group name="list-fade">
            <div 
              v-for="(item, index) in filteredTransactions" 
              :key="item.id" 
              class="glass-stream-item"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <!-- Icon -->
              <div class="stream-icon-box" :class="getTypeClass(item.amount)">
                <el-icon v-if="item.amount > 0"><Top /></el-icon>
                <el-icon v-else><Bottom /></el-icon>
              </div>

              <!-- Content -->
              <div class="stream-content">
                <div class="stream-title">{{ item.description || item.type }}</div>
                <div class="stream-date">{{ formatDate(item.created_at) }}</div>
              </div>

              <!-- Amount -->
              <div class="stream-amount" :class="getTypeClass(item.amount)">
                {{ item.amount > 0 ? '+' : '' }}{{ formatAmount(item.amount) }}
                <span class="stream-unit">点</span>
              </div>
            </div>
          </transition-group>
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
import WalletRechargeModal from '@/components/modal/business/WalletRechargeModal.vue'
import { authApi } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import { Lightning, Top, Bottom, Wallet, Warning, Document } from '@element-plus/icons-vue'

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
    setTimeout(() => { loading.value = false }, 300) // Small delay for smooth transition
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
  gap: 32px;
  height: 100%;
  padding-bottom: 20px;
}

/* --- 1. Asset Hero Card (Aurora) --- */
.asset-hero-card {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.asset-hero-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Aurora Background */
.hero-aurora-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.25), transparent 40%),
              radial-gradient(circle at 90% 90%, rgba(249, 115, 22, 0.15), transparent 40%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 40px;
}

/* Header */
.hero-header { display: flex; justify-content: space-between; align-items: flex-start; }
.header-main { display: flex; align-items: center; gap: 16px; }

.card-icon-wrapper {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: #60A5FA;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.header-text { display: flex; flex-direction: column; gap: 4px; }
.card-label { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
.card-tag { 
  font-size: 12px; font-family: 'Outfit', sans-serif; 
  color: #94A3B8; letter-spacing: 0.5px; text-transform: uppercase; 
}

.info-btn {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.4);
  cursor: help;
  transition: all 0.2s;
}
.info-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

/* Balance */
.balance-display { display: flex; align-items: baseline; gap: 8px; margin-top: auto; margin-bottom: 20px; }
.balance-number { font-family: 'Outfit', sans-serif; color: #fff; line-height: 1; }
.amount-integer { font-size: 64px; font-weight: 700; letter-spacing: -2px; }
.amount-decimal { font-size: 36px; font-weight: 500; color: #94A3B8; }
.balance-unit { font-size: 18px; font-weight: 600; color: #F59E0B; margin-left: 4px; }

/* Action Footer */
.hero-footer { display: flex; justify-content: flex-end; }

.neon-action-btn {
  position: relative;
  display: flex; align-items: center; gap: 10px;
  padding: 14px 32px;
  background: linear-gradient(90deg, #F59E0B, #EA580C);
  border: none; border-radius: 100px;
  color: #fff; font-size: 16px; font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);
}

.neon-action-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(234, 88, 12, 0.5);
  background: linear-gradient(90deg, #FBBF24, #F97316);
}

.card-bg-icon {
  position: absolute; right: -20px; bottom: -40px;
  font-size: 200px; opacity: 0.03;
  transform: rotate(-15deg);
  pointer-events: none;
  color: #fff;
}

/* --- 2. Ledger Stream (Glass List) --- */
.ledger-section {
  display: flex; flex-direction: column; gap: 20px; flex: 1; overflow: hidden;
}

.ledger-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8px;
}
.section-title { font-size: 16px; font-weight: 600; color: #E2E8F0; margin: 0; }

/* Glass Pill Tabs */
.glass-pill-tabs {
  display: flex; gap: 8px;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px; border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.05);
}

.pill-tab {
  padding: 6px 20px;
  border-radius: 100px;
  font-size: 13px; font-weight: 500;
  color: #64748B; cursor: pointer;
  transition: all 0.3s;
}

.pill-tab.active { background: rgba(255,255,255,0.1); color: #fff; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.pill-tab.income.active { background: rgba(16, 185, 129, 0.15); color: #10B981; }
.pill-tab.expense.active { background: rgba(239, 68, 68, 0.15); color: #EF4444; }

/* Stream List */
.ledger-stream {
  flex: 1; overflow-y: auto; padding: 4px; /* Space for shadows */
}

/* Glass Stream Item */
.glass-stream-item {
  display: flex; align-items: center;
  padding: 16px 20px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.glass-stream-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateX(4px) scale(1.005);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stream-icon-box {
  width: 40px; height: 40px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; margin-right: 16px;
}
.stream-icon-box.income { background: rgba(16, 185, 129, 0.1); color: #10B981; }
.stream-icon-box.expense { background: rgba(255, 255, 255, 0.05); color: #94A3B8; }

.stream-content { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.stream-title { font-size: 15px; font-weight: 500; color: #F1F5F9; }
.stream-date { font-size: 12px; color: #64748B; font-family: 'Monaco', monospace; }

.stream-amount { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; }
.stream-amount.income { color: #10B981; text-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
.stream-amount.expense { color: #94A3B8; }
.stream-unit { font-size: 12px; font-weight: 500; opacity: 0.6; margin-left: 2px; }

/* Empty & Loading */
.stream-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 0; color: #64748B;
}
.empty-bubble {
  width: 80px; height: 80px; border-radius: 50%;
  background: rgba(255,255,255,0.02);
  display: flex; align-items: center; justify-content: center;
  font-size: 32px; color: #334155; margin-bottom: 16px;
}

/* Animations */
.list-fade-enter-active, .list-fade-leave-active { transition: all 0.4s ease; }
.list-fade-enter-from { opacity: 0; transform: translateY(10px); }
.list-fade-leave-to { opacity: 0; }

.ledger-stream::-webkit-scrollbar { width: 0px; } /* Clean scroll */
</style>