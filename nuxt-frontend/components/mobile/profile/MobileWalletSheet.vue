<template>
  <div v-if="visible" class="wallet-sheet-overlay" @click="close">
    <div class="wallet-sheet-content" @click.stop>
      <!-- Grab Handle -->
      <div class="sheet-handle-bar">
          <div class="sheet-handle"></div>
      </div>

      <div class="sheet-header">
        <div class="sheet-title">额度变动</div>
      </div>
      
      <div class="sheet-body">
         <div v-if="loading" class="loading-state">
             <div class="loading-spinner"></div>
             加载中...
         </div>
         <div v-else-if="transactions.length > 0" class="transaction-list">
             <div v-for="(item, index) in transactions" :key="index" class="transaction-item">
                 <div class="t-left">
                     <div class="t-main-text">{{ parseType(item) }}</div>
                     <div class="t-sub-text">{{ parseDescription(item) }}</div>
                     <div class="t-time">{{ formatDate(item.created_at) }}</div>
                 </div>
                 <div class="t-right">
                     <span :class="['t-amount', Number(item.amount) >= 0 ? 'text-green' : 'text-red']">
                         {{ Number(item.amount) > 0 ? '+' : '' }}{{ Number(item.amount).toFixed(2) }}
                     </span>
                     <span class="t-balance">余额 {{ Number(item.balance_after).toFixed(2) }}</span>
                 </div>
             </div>
         </div>
         <div v-else class="empty-state">
             暂无变动记录
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  transactions: any[]
  loading?: boolean
}>()

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

const parseType = (item: any) => {
    const type = item.type || ''
    if (type === 'payment') return '消费'
    if (type === 'recharge') return '充值'
    if (type === 'refund') return '退款'
    return type || '变动'
}

const parseDescription = (item: any) => {
    // Try to find a description. Prefer 'description', then 'memo', then fallback to ID if needed.
    // If it's a payment, maybe imply "商品购买" if no desc.
    if (item.description) return item.description
    if (item.memo) return item.memo
    if (item.type === 'payment') return '商品购买'
    return '' 
}
</script>

<style scoped>
.wallet-sheet-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7); 
    z-index: 3000; /* High enough to cover TabBar */
    display: flex; flex-direction: column; justify-content: flex-end;
    animation: fadeIn 0.3s forwards;
    backdrop-filter: blur(4px);
}

.wallet-sheet-content {
    background: #1E293B;
    border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding: 10px 24px 40px 24px; /* Bottom padding for safe area */
    height: 70vh; /* Taller */
    display: flex; flex-direction: column;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    border-top: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

/* Grab Handle */
.sheet-handle-bar {
    display: flex; justify-content: center; padding: 10px 0; cursor: grab;
}
.sheet-handle {
    width: 40px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 4px;
}

.sheet-header {
    display: flex; align-items: center; justify-content: flex-start;
    margin-bottom: 20px; padding-top: 10px;
}
.sheet-title { font-size: 20px; font-weight: 700; color: #fff; }

.sheet-body { flex: 1; overflow-y: auto; padding-bottom: 80px; /* Extra padding for bottom */ }

.transaction-list { display: flex; flex-direction: column; gap: 8px; }

.transaction-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 16px; 
    background: rgba(255,255,255,0.03);
    border-radius: 12px;
}

.t-left { display: flex; flex-direction: column; gap: 4px; }
.t-main-text { font-size: 15px; font-weight: 600; color: #fff; }
.t-sub-text { font-size: 12px; color: #94A3B8; }
.t-time { font-size: 11px; color: #64748B; margin-top: 2px; }

.t-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.t-amount { font-size: 16px; font-weight: 700; font-family: 'Outfit', sans-serif; }
.text-green { color: #4ADE80; }
.text-red { color: #F87171; }
.t-balance { font-size: 11px; color: #64748B; font-family: monospace; }

.loading-state, .empty-state {
    text-align: center; color: #94A3B8; padding-top: 60px;
}
.loading-spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.1);
    border-top: 2px solid #fff; border-radius: 50%;
    margin: 0 auto 10px auto;
    animation: spin 1s linear infinite;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
