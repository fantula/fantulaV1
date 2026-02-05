<template>
  <div 
    class="mobile-order-card"
    :class="'status-' + (order.isPending ? 'pending' : order.status)"
    @click="$emit('click', order)"
  >
    <!-- Card Header -->
    <div class="card-header">
       <div class="order-no-group">
          <span class="label">NO.</span>
          <span class="value">{{ order.order_no?.slice(-8) || '---' }}</span>
       </div>
       <!-- Status Pill -->
       <div class="status-pill" :class="order.isPending ? 'pending' : order.status">
          <div class="dot"></div>
          <span>{{ order.isPending ? '待支付' : getOrderStatusLabel(order.status) }}</span>
       </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
       <div class="thumb">
          <img :src="order.product_image || '/images/placeholder.png'" class="product-img" loading="lazy" />
       </div>
       <div class="info">
          <div class="name-row">
              <div class="name">{{ order.product_name }}</div>
              <span class="spec-tag">{{ order.spec_text || '标准规格' }}</span>
          </div>
          
          <div class="price-row">
             <div class="price">
                <span class="amount">{{ Number(order.total_amount).toFixed(2) }}</span>
                <span class="unit">点</span>
             </div>
             <div class="qty">x{{ order.quantity }}</div>
          </div>
       </div>
    </div>

    <!-- Card Footer (Actions) -->
    <div class="card-footer">
       <div class="time">{{ formatDate(order.created_at) }}</div>
       <div class="actions">
          <slot name="actions" :order="order"></slot>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

defineProps<{
  order: any
}>()

defineEmits(['click'])

const { getOrderStatusLabel } = useBizConfig()
const { formatDate } = useBizFormat()
</script>

<style scoped>
/* Mobile Order Card */
.mobile-order-card {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 16px;
    position: relative; overflow: hidden;
}
/* Left Status Line */
.mobile-order-card::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #64748B; opacity: 0.6;
}
.mobile-order-card.status-pending::before { background: #F97316; }
.mobile-order-card.status-active::before { background: #22C55E; }
.mobile-order-card.status-pending_delivery::before { background: #3B82F6; }

/* Card Header */
.card-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
}
.order-no-group { font-size: 12px; font-family: 'Monaco', monospace; color: #64748B; display: flex; gap: 4px; }
.order-no-group .value { color: #94A3B8; }

.status-pill {
    display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 100px;
    background: rgba(255,255,255,0.05); color: #94A3B8; font-size: 11px; font-weight: 600;
}
.status-pill .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; box-shadow: 0 0 5px currentColor; }
.status-pill.pending { color: #F97316; background: rgba(249, 115, 22, 0.1); }
.status-pill.active { color: #22C55E; background: rgba(34, 197, 94, 0.1); }
.status-pill.pending_delivery { color: #3B82F6; background: rgba(59, 130, 246, 0.1); }
.status-pill.refunding { color: #EAB308; background: rgba(234, 179, 8, 0.1); }

/* Card Body */
.card-body { display: flex; gap: 12px; margin-bottom: 12px; }
.thumb {
    width: 64px; height: 64px; border-radius: 8px; overflow: hidden; background: #1E293B; flex-shrink: 0;
}
.product-img { width: 100%; height: 100%; object-fit: cover; }
.info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 0; }
.name-row { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
.name { color: #fff; font-size: 14px; font-weight: 500; line-height: 1.3; }
.spec-tag {
    font-size: 10px; color: #94A3B8; background: rgba(255,255,255,0.08);
    padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.05);
}

.price-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 4px; }
.price { color: #fff; font-family: 'DIN Alternate'; font-weight: 700; display: flex; align-items: baseline; gap: 2px; }
.price .amount { font-size: 18px; }
.price .unit { font-size: 11px; color: #F59E0B; }
.qty { font-size: 12px; color: #64748B; }

/* Card Footer */
.card-footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px;
}
.time { font-size: 11px; color: #475569; }
.actions { display: flex; gap: 8px; }
</style>
