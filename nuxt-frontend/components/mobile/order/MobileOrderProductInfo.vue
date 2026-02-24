<template>
  <div class="info-card-glass" :class="{ compact }">
    <!-- Header: Order No -->
    <div class="card-header-row">
       <div class="order-no-wrap" @click="copyText(order.order_no || '')">
           <span class="label">订单号</span>
           <span class="val">{{ order.order_no }}</span>
           <el-icon class="copy-icon"><CopyDocument /></el-icon>
       </div>
    </div>

    <!-- Body: Image + Info -->
    <div class="prod-row">
      <div class="prod-thumb">
        <img :src="order.productImage || '/images/shared/logo_v2.png'" class="prod-img" loading="lazy" />
      </div>
      <div class="prod-info">
        <div class="info-main">
            <div class="prod-name">{{ order.productName }}</div>
            <div class="spec-row" v-if="order.skuSpec">
                <span class="spec-tag">{{ order.skuSpec }}</span>
            </div>
        </div>
        
        <div class="prod-foot">
            <div class="qty-tag">x{{ order.quantity }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CopyDocument } from '@element-plus/icons-vue'
import { useToast } from '@/composables/mobile/useToast'

const props = withDefaults(defineProps<{
  order: {
    productImage?: string
    productName?: string
    skuSpec?: string
    order_no?: string
    quantity?: number
  }
  compact?: boolean
}>(), {
  compact: false
})

const { showToast } = useToast()

const copyText = (t: string) => {
    if (!t) return
    navigator.clipboard.writeText(t).then(() => showToast('已复制', 'success'))
}
</script>

<style scoped>
.info-card-glass {
    background: #1E293B; /* Slate 800 */
    border: 1px solid rgba(255,255,255,0.1); /* Brighter border */
    border-radius: 16px; 
    padding: 12px 16px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Header Row */
.card-header-row {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}
.order-no-wrap {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: #94A3B8;
    font-family: 'Monaco', monospace;
}
.order-no-wrap .label { color: #64748B; font-size: 11px; }
.order-no-wrap .val { color: #CBD5E1; }
.copy-icon { font-size: 12px; color: #3B82F6; cursor: pointer; }

/* Product Row */
.prod-row { display: flex; gap: 14px; }

/* Glowing Thumb */
.prod-thumb { 
    width: 68px; height: 68px; 
    border-radius: 14px; 
    overflow: hidden; 
    background: #0F172A; 
    flex-shrink: 0; 
    /* Gradient Border Effect */
    border: 1px solid rgba(59, 130, 246, 0.3);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.15); /* Blue Glow */
}
.prod-img { width: 100%; height: 100%; object-fit: cover; }

.prod-info { 
    flex: 1; display: flex; flex-direction: column; justify-content: space-between; 
    padding: 2px 0; 
}

.info-main { display: flex; flex-direction: column; gap: 6px; }

.prod-name { 
    font-size: 15px; font-weight: 600; color: #F1F5F9; 
    line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    line-clamp: 2;
}

/* Colored Spec Tag */
.spec-row { display: flex; }
.spec-tag { 
    font-size: 11px; color: #38BDF8; /* Light Blue Text */
    background: rgba(56, 189, 248, 0.1); /* Blue Tint BG */
    border: 1px solid rgba(56, 189, 248, 0.2);
    padding: 2px 8px; border-radius: 6px; 
}

.prod-foot { display: flex; justify-content: flex-end; align-items: center; }
.qty-tag { font-size: 13px; color: #94A3B8; font-weight: 500; }

/* Compact Mode for Sheets */
.info-card-glass.compact {
    padding: 12px;
    background: rgba(30, 41, 59, 0.6);
}
.info-card-glass.compact .prod-thumb {
    width: 56px; height: 56px; /* Increased from 38px */
    border-radius: 12px;
}
.info-card-glass.compact .prod-name {
    font-size: 13px; /* Increased from 11px */
    -webkit-line-clamp: 2; line-clamp: 2; /* Allow 2 lines */
}
.info-card-glass.compact .spec-tag {
    font-size: 11px; padding: 2px 8px; /* Standard size */
}
.info-card-glass.compact .card-header-row {
    margin-bottom: 10px; padding-bottom: 8px;
}
.info-card-glass.compact .order-no-wrap {
    font-size: 12px;
}
</style>
