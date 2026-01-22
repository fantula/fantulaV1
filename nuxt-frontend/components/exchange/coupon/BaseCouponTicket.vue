<template>
  <div 
    class="coupon-ticket" 
    :class="[
      `color-${color}`, 
      { 'is-disabled': disabled || status !== 'unused' }
    ]"
    @click="$emit('click')"
  >
    <!-- Left: Value Section -->
    <div class="ticket-left">
      <div class="ticket-value">
        <span class="value-amount">{{ value }}</span>
        <span class="value-unit" v-if="unit">{{ unit }}</span>
      </div>
      <div class="ticket-type-label">
        <slot name="type-label">{{ typeLabel }}</slot>
      </div>
    </div>

    <!-- Right: Info Section -->
    <div class="ticket-right">
      <div class="right-main">
        <div class="ticket-name">{{ title }}</div>
        <div class="ticket-desc">{{ desc }}</div>
      </div>
      
      <div class="ticket-footer">
        <div class="ticket-expiry">
          <el-icon><Clock /></el-icon>
          {{ expiryText }}
        </div>
        
        <!-- Action Slot or Default Status Badge -->
        <div class="ticket-action" @click.stop>
          <slot name="action">
            <template v-if="status === 'unused' && !disabled">
                <button class="action-btn" @click="$emit('action')">
                  {{ actionText }}
                </button>
            </template>
            <div v-else class="status-badge">{{ statusText }}</div>
          </slot>
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
import { Clock } from '@element-plus/icons-vue'

interface Props {
  color?: 'purple' | 'gold' | 'cyan' | 'default'
  value: string | number
  unit?: string
  title: string
  desc?: string
  typeLabel?: string
  expiryText?: string
  status?: 'unused' | 'used' | 'expired'
  disabled?: boolean
  actionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  unit: '点',
  status: 'unused',
  disabled: false,
  actionText: '去使用'
})

defineEmits(['click', 'action'])

const statusText = computed(() => {
  if (props.status === 'used') return '已使用'
  if (props.status === 'expired') return '已过期'
  return ''
})
</script>

<style scoped>
.coupon-ticket {
  position: relative;
  display: flex;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: default;
  height: 120px;
}

.coupon-ticket:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* === Theme Colors === */

/* Purple (Flat/Default) */
.coupon-ticket.color-purple {
  background: linear-gradient(135deg, rgba(217, 70, 239, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-color: rgba(217, 70, 239, 0.2);
}
.coupon-ticket.color-purple:hover:not(.is-disabled) {
  border-color: rgba(217, 70, 239, 0.4);
  box-shadow: 0 8px 24px rgba(217, 70, 239, 0.15);
}
.coupon-ticket.color-purple .value-amount { color: #E879F9; }

/* Gold (Balance) */
.coupon-ticket.color-gold {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(251, 191, 36, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}
.coupon-ticket.color-gold:hover:not(.is-disabled) {
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.15);
}
.coupon-ticket.color-gold .value-amount { color: #FBBF24; }

/* Cyan (Product) */
.coupon-ticket.color-cyan {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(34, 211, 238, 0.05) 100%);
  border-color: rgba(6, 182, 212, 0.2);
}
.coupon-ticket.color-cyan:hover:not(.is-disabled) {
  border-color: rgba(6, 182, 212, 0.4);
  box-shadow: 0 8px 24px rgba(6, 182, 212, 0.15);
}
.coupon-ticket.color-cyan .value-amount { color: #22D3EE; }


/* Disabled / Used / Expired */
.coupon-ticket.is-disabled {
  opacity: 0.6;
  filter: grayscale(0.8);
  border-color: rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.02);
  cursor: not-allowed;
}
.coupon-ticket.is-disabled:hover {
    /* Slight re-color on hover to indicate interactable (e.g. delete) if needed, 
       but BaseTicket handles visual only. Parent handles click logic. 
       Usually we don't want hover effect on disabled unless it's a delete action. 
       Let's keep it minimal. */
}
.coupon-ticket.is-disabled .value-amount { color: #94A3B8; }


/* Left Side */
.ticket-left {
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-right: 1px dashed rgba(255, 255, 255, 0.1);
  position: relative;
  flex-shrink: 0;
}

.ticket-value {
  display: flex; align-items: baseline; gap: 2px;
}
.value-amount {
  font-size: 32px; font-weight: 700; font-family: 'Outfit', sans-serif; color: #fff;
}
.value-unit {
  font-size: 14px; color: rgba(255,255,255,0.6); margin-left: 2px;
}
.ticket-type-label {
  font-size: 12px; color: #94A3B8; margin-top: 6px;
}

/* Right Side */
.ticket-right {
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.ticket-name {
  font-size: 16px; font-weight: 600; color: #fff;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.ticket-desc {
  font-size: 13px; color: #94A3B8; margin-top: 4px;
}

.ticket-footer {
    display: flex; align-items: center; justify-content: space-between; margin-top: auto;
}

.ticket-expiry {
  display: flex; align-items: center; gap: 4px; font-size: 12px; color: #64748B;
}

/* Action Button */
.action-btn {
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; border: none;
  background: rgba(255,255,255,0.1); color: #fff;
}
/* Theme-specific button colors could be passed or handled by parent class, 
   but defaulting to white/glass is safe or using the theme color. 
   Let's use a generic primary style or rely on specific overrides. */
.color-purple .action-btn { background: rgba(217, 70, 239, 0.2); color: #E879F9; }
.color-purple .action-btn:hover { background: rgba(217, 70, 239, 0.3); color: #fff; }

.color-gold .action-btn { background: rgba(245, 158, 11, 0.2); color: #FBBF24; }
.color-gold .action-btn:hover { background: rgba(245, 158, 11, 0.3); color: #fff; }

.color-cyan .action-btn { background: rgba(6, 182, 212, 0.2); color: #22D3EE; }
.color-cyan .action-btn:hover { background: rgba(6, 182, 212, 0.3); color: #fff; }

/* Status Badge */
.status-badge {
    font-size: 12px; color: #64748B; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 6px;
}

/* Punch Holes */
.punch-hole {
  position: absolute; left: 130px; width: 12px; height: 12px;
  background: #0f172a; /* Should match page bg, but page might have gradient. Using dark default. */
  border-radius: 50%; transform: translateX(-50%);
  z-index: 2;
}
.punch-hole.top { top: -6px; }
.punch-hole.bottom { bottom: -6px; }
</style>
