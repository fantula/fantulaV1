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
      
      <BaseInfiniteList 
        :loading="loading" 
        :finished="finished"
        :error="error" 
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
      </BaseInfiniteList>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Document, Top, Bottom } from '@element-plus/icons-vue'
import BaseInfiniteList from '@/components/shared/BaseInfiniteList.vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

const props = defineProps<{
  displayList: any[]
  loading: boolean
  finished: boolean
  error: string | null
  activeTab: 'all' | 'income' | 'expense'
}>()

const emit = defineEmits(['loadMore', 'switchTab'])
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
