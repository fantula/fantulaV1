<template>
  <div 
    class="mobile-coupon-ticket" 
    :class="[
      `color-${themeColor}`, 
      { 'is-disabled': disabled || status !== 'unused' }
    ]"
    @click="$emit('click')"
  >
    <!-- Left: Value Section -->
    <div class="ticket-left">
      <div class="ticket-value">
        <span class="value-amount">{{ value }}</span>
        <span class="value-unit" v-if="unit">{{ unit }}</span><span class="value-unit" v-else>点</span>
      </div>
      <div class="ticket-type-label">
        {{ typeLabel }}
      </div>
    </div>

    <!-- Right: Info Section -->
    <div class="ticket-right">
      <div class="right-main">
        <div class="ticket-name">{{ title }}</div>
        <div class="ticket-desc">{{ type === 'product' ? '特定商品可用' : '全场通用' }}</div>
      </div>
      
      <div class="ticket-footer">
        <div class="ticket-expiry">
            {{ expiryText }}
        </div>
        
        <!-- Status Badge -->
        <div class="ticket-status">
            <span v-if="status === 'used'" class="status-tag used">已使用</span>
            <span v-else-if="status === 'expired'" class="status-tag expired">已过期</span>
            <span v-else class="status-tag unused">去使用</span>
        </div>
      </div>
    </div>

    <!-- Decorative Punch Holes -->
    <div class="punch-hole top"></div>
    <div class="punch-hole bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'balance' | 'product' | 'flat' | string
  value: string | number
  unit?: string
  title: string
  expiryText?: string
  status?: 'unused' | 'used' | 'expired'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'flat',
  status: 'unused',
  disabled: false
})

defineEmits(['click'])

const themeColor = computed(() => {
  switch (props.type) {
    case 'balance': return 'gold'   // Balance
    case 'product': return 'cyan'   // Product
    case 'flat': return 'purple'    // Full reduction (default)
    default: return 'purple'
  }
})

const typeLabel = computed(() => {
    switch (props.type) {
        case 'balance': return '余额券'
        case 'product': return '商品券'
        case 'flat': return '满减券'
        default: return '优惠券'
    }
})
</script>

<style scoped>
.mobile-coupon-ticket {
  position: relative;
  display: flex;
  align-items: stretch;
  background: rgba(30, 41, 59, 0.6); /* Glass Base */
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  height: 90px;
  backdrop-filter: blur(10px);
}

/* === Theme Colors === */

/* Purple (Flat) */
.mobile-coupon-ticket.color-purple {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(30, 41, 59, 0.6) 100%);
  border-color: rgba(168, 85, 247, 0.2);
}
.mobile-coupon-ticket.color-purple .ticket-left { color: #E879F9; background: rgba(168, 85, 247, 0.05); border-right: 1px dashed rgba(168, 85, 247, 0.2); }
.mobile-coupon-ticket.color-purple .status-tag.unused { background: rgba(168, 85, 247, 0.2); color: #E879F9; }

/* Gold (Balance) */
.mobile-coupon-ticket.color-gold {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(30, 41, 59, 0.6) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}
.mobile-coupon-ticket.color-gold .ticket-left { color: #FBBF24; background: rgba(245, 158, 11, 0.05); border-right: 1px dashed rgba(245, 158, 11, 0.2); }
.mobile-coupon-ticket.color-gold .status-tag.unused { background: rgba(245, 158, 11, 0.2); color: #FBBF24; }

/* Cyan (Product) */
.mobile-coupon-ticket.color-cyan {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(30, 41, 59, 0.6) 100%);
  border-color: rgba(6, 182, 212, 0.2);
}
.mobile-coupon-ticket.color-cyan .ticket-left { color: #22D3EE; background: rgba(6, 182, 212, 0.05); border-right: 1px dashed rgba(6, 182, 212, 0.2); }
.mobile-coupon-ticket.color-cyan .status-tag.unused { background: rgba(6, 182, 212, 0.2); color: #22D3EE; }


/* Disabled / Used / Expired */
.mobile-coupon-ticket.is-disabled {
  filter: grayscale(1);
  opacity: 0.6;
}
.mobile-coupon-ticket.is-disabled .status-tag { background: rgba(255,255,255,0.1); color: #94A3B8; }


/* Left Side */
.ticket-left {
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.ticket-value {
  display: flex; align-items: baseline; gap: 1px;
  font-family: 'DIN Alternate', sans-serif; font-weight: bold;
}
.symbol { font-size: 14px; }
.value-amount { font-size: 24px; } /* Compact for mobile */
.value-unit { font-size: 12px; margin-left: 2px; }

.ticket-type-label {
  font-size: 11px; opacity: 0.8; margin-top: 4px;
}

/* Right Side */
.ticket-right {
  flex: 1; padding: 12px 14px;
  display: flex; flex-direction: column; justify-content: space-between;
  min-width: 0;
}

.ticket-name {
  font-size: 14px; font-weight: 600; color: #fff;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ticket-desc {
  font-size: 11px; color: #94A3B8; margin-top: 2px;
}

.ticket-footer {
    display: flex; align-items: center; justify-content: space-between;
}
.ticket-expiry { font-size: 10px; color: #64748B; }

.status-tag {
    font-size: 10px; padding: 2px 8px; border-radius: 10px; font-weight: 500;
}

/* Punch Holes */
.punch-hole {
  position: absolute; left: 84px; /* 90 - 6 */
  width: 12px; height: 12px;
  background: #0F172A; /* Page BG */
  border-radius: 50%;
  z-index: 2;
}
.punch-hole.top { top: -6px; }
.punch-hole.bottom { bottom: -6px; }
</style>
