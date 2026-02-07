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
          <!-- Name & Spec Inline -->
          <div class="name-row">
              <span class="name-text">{{ order.product_name }}</span>
              <span class="spec-inline">{{ order.spec_text || '标准规格' }}</span>
          </div>
          
          <div class="price-row">
             <div class="price">
                <span class="unit">¥</span>
                <span class="amount">{{ Number(order.total_amount).toFixed(2) }}</span>
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
/* Mobile Order Card (Compact) */
.mobile-order-card {
    background: #1E293B;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 12px; /* Reduced from 16px */
    position: relative; overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: all 0.2s;
}
.mobile-order-card:active {
    transform: scale(0.98);
    background: #252f45;
}

/* Card Header */
.card-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; /* Reduced margin */
}
.order-no-group { font-size: 11px; font-family: 'Monaco', monospace; color: #64748B; display: flex; gap: 4px; }
.order-no-group .value { color: #94A3B8; }

.status-pill {
    display: flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 6px;
    background: rgba(255,255,255,0.05); color: #94A3B8; font-size: 10px; font-weight: 500;
}
.status-pill .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

/* Status Colors */
.status-pill.pending { color: #F97316; background: rgba(249, 115, 22, 0.1); }
.status-pill.active { color: #10B981; background: rgba(16, 185, 129, 0.1); }
.status-pill.pending_delivery { color: #3B82F6; background: rgba(59, 130, 246, 0.1); }
.status-pill.refunding { color: #EAB308; background: rgba(234, 179, 8, 0.1); }
.status-pill.expired, .status-pill.cancelled { color: #64748B; background: rgba(100, 116, 139, 0.1); }

/* Card Body */
.card-body { display: flex; gap: 10px; margin-bottom: 10px; }
.thumb {
    width: 64px; height: 64px; border-radius: 12px; /* Match Detail Radius */
    overflow: hidden; background: #0F172A; flex-shrink: 0;
    border: 1px solid rgba(23, 143, 198, 0.3); /* Primary Blue Border */
}
.product-img { width: 100%; height: 100%; object-fit: cover; }
.info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 2px 0; }

.name-row { 
    font-size: 13px; color: #E2E8F0; line-height: 1.4; 
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.name-text { font-weight: 500; margin-right: 6px; }
.spec-inline {
    font-size: 11px; color: #64748B; background: rgba(255,255,255,0.03);
    padding: 1px 4px; border-radius: 4px; display: inline-block; vertical-align: middle;
    margin-top: -2px;
}

.price-row { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 4px; }
/* Price: Orange #F97316 */
.price { color: #F97316; font-family: 'DIN Alternate'; font-weight: 700; display: flex; align-items: baseline; gap: 1px; }
.price .amount { font-size: 18px; }
.price .unit { font-size: 11px; font-weight: normal; margin-right: 1px; }
.qty { font-size: 12px; color: #64748B; }

/* Card Footer */
.card-footer {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;
}
.time { font-size: 10px; color: #475569; }
.actions { display: flex; gap: 8px; }
</style>
