<template>
  <div class="ledger-section">
    <div class="ledger-header">
      <h3 class="section-title">额度流水</h3>
      
      <!-- Floating Pill Tabs -->
      <div class="glass-pill-tabs">
        <div 
          class="pill-tab" 
          :class="{ active: activeTab === 'all' }"
          @click="switchTab('all')"
        >全部</div>
        <div 
          class="pill-tab income" 
          :class="{ active: activeTab === 'income' }"
          @click="switchTab('income')"
        >获取</div>
        <div 
          class="pill-tab expense" 
          :class="{ active: activeTab === 'expense' }"
          @click="switchTab('expense')"
        >消耗</div>
      </div>
    </div>

    <!-- Glass List -->
    <div class="ledger-stream">

      <!-- 加载失败错误状态 -->
      <div v-if="error && displayList.length === 0 && !loading" class="stream-error">
        <div class="error-bubble">
          <el-icon class="error-icon-inner"><Warning /></el-icon>
        </div>
        <span class="error-label">加载失败</span>
        <span class="error-hint">网络异常，请重试</span>
        <button class="reload-btn-ledger" @click="$emit('reload')">
          <el-icon><RefreshRight /></el-icon> 重新加载
        </button>
      </div>

      <BaseInfiniteList
        v-else
        :loading="loading"
        :finished="finished"
        :error="false"
        @load="$emit('loadMore')"
        :offset="100"
      >
        <!-- Empty State -->
        <div v-if="displayList.length === 0 && !loading" class="stream-empty">
           <div class="empty-bubble">
             <el-icon><Document /></el-icon>
           </div>
           <span>暂无{{ activeTab === 'all' ? '' : activeTab === 'income' ? '获取' : '消耗' }}记录</span>
        </div>

        <!-- Stream List -->
        <div v-else class="stream-list">
          <transition-group name="list-fade">
            <div 
              v-for="(item, index) in displayList" 
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
                <div class="stream-title">{{ getTxnDescription(item) }}</div>
                <div class="stream-date">
                    {{ formatDate(item.created_at) }}
                    <span v-if="item.balance_after != null" class="stream-balance-after">· 余额 {{ Number(item.balance_after).toFixed(2) }} 点</span>
                </div>
              </div>

              <!-- Amount -->
              <div class="stream-amount" :class="getTypeClass(item.amount)">
                {{ item.amount > 0 ? '+' : '' }}{{ formatAmount(item.amount) }}
                <span class="stream-unit">点</span>
              </div>
            </div>
          </transition-group>
        </div>
      </BaseInfiniteList>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Document, Top, Bottom, Warning, RefreshRight } from '@element-plus/icons-vue'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

const props = defineProps<{
  displayList: any[]
  loading: boolean
  finished: boolean
  error: boolean
  activeTab: 'all' | 'income' | 'expense'
}>()

const emit = defineEmits(['loadMore', 'switchTab', 'reload'])
const { formatDate } = useBizFormat()

const switchTab = (tab: 'all' | 'income' | 'expense') => {
    emit('switchTab', tab)
}

const getTypeClass = (amount: number) => {
  return amount > 0 ? 'income' : 'expense'
}

const formatAmount = (val: number) => {
  return Math.abs(Number(val)).toFixed(2)
}

const getTxnDescription = (item: any): string => {
    const desc = item.description
    if (desc && desc !== '余额支付' && desc !== '余额变动') return desc
    switch (item.type) {
        case 'payment': return '购买商品'
        case 'recharge': return '余额充值'
        case '优惠券兑换': return '优惠券兑换'
        case 'bonus': return '充值赠送'
        default: return '余额变动'
    }
}
</script>

<style scoped>
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
.stream-date { font-size: 12px; color: #64748B; font-family: 'Monaco', monospace; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
.stream-balance-after { color: #475569; }

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

/* Error State */
.stream-error {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 80px 0; gap: 8px;
}
.error-bubble {
  width: 80px; height: 80px; border-radius: 50%;
  background: rgba(239,68,68,0.08);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 8px;
}
.error-icon-inner { font-size: 32px; color: #EF4444; }
.error-label { font-size: 15px; font-weight: 600; color: #CBD5E1; }
.error-hint { font-size: 12px; color: #64748B; margin-bottom: 4px; }
.reload-btn-ledger {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 18px; background: transparent;
  border: 1px solid rgba(255,255,255,0.12); border-radius: 100px;
  color: #94A3B8; font-size: 13px; cursor: pointer; transition: all 0.25s;
}
.reload-btn-ledger:hover {
  background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.35); color: #3B82F6;
}

/* Animations */
.list-fade-enter-active, .list-fade-leave-active { transition: all 0.4s ease; }
.list-fade-enter-from { opacity: 0; transform: translateY(10px); }
.list-fade-leave-to { opacity: 0; }

.ledger-stream::-webkit-scrollbar { width: 0px; } /* Clean scroll */
</style>
