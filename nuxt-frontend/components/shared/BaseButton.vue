<template>
  <button 
    class="base-button"
    :class="[
      theme.variantClass,
      { 
        'is-loading': loading, 
        'is-disabled': disabled, 
        'is-block': block,
        [`is-${size}`]: size
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner — CSS border animation, color from --spinner-color -->
    <span v-if="loading" class="btn-spinner-wrap">
      <div class="btn-spinner"></div>
    </span>

    <!-- Content -->
    <span class="btn-content" :class="{ 'is-hidden': loading }">
       <slot name="icon"></slot>
       <slot></slot>
    </span>
    
    <!-- Hover Overlay (Optional Shine) -->
    <div class="hover-effect"></div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getButtonTheme } from '@/utils/buttonThemeRegistry'

interface Props {
  themeId?: string
  loading?: boolean
  disabled?: boolean
  block?: boolean
  size?: 'default' | 'small' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  themeId: 'primary',
  loading: false,
  disabled: false,
  block: false,
  size: 'default'
})

const emit = defineEmits(['click'])

const theme = computed(() => getButtonTheme(props.themeId))

const handleClick = (e: MouseEvent) => {
  if (props.loading || props.disabled) return
  emit('click', e)
}
</script>

<style scoped>
/* Core Base Styles */
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  user-select: none;
  /* Default Colors (Fallback) */
  background: transparent;
  color: #fff;
}

.base-button.is-block {
  width: 100%;
}

.base-button.is-small {
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 10px;
}

.base-button.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
  z-index: 2;
}
.btn-content.is-hidden {
  opacity: 0;
}

/* Loading Spinner — positioned wrapper; actual .btn-spinner style from global mobile.css */
.btn-spinner-wrap {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex; align-items: center; justify-content: center;
}

/* =============================================================================
   THEME VARIANTS (Move to global or separate css if prefered, but scoped here allows encapsulation)
   ============================================================================= */

/* [Primary] - Standard Blue Gradient */
.btn-primary {
  background: linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-dark));
  color: #fff;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.btn-primary:not(.is-disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
}
.btn-primary:active { transform: scale(0.98); }

/* [Primary Orange] - Orange Gradient */
.btn-primary-orange {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  color: #fff;
  box-shadow: 0 4px 15px rgba(234, 88, 12, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.btn-primary-orange:not(.is-disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(234, 88, 12, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
}
.btn-primary-orange:active { transform: scale(0.98); }

/* [Suite 001] Classic Phantom - Neon Glass */
.btn-suit-001-primary {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #60A5FA; /* Brighter Blue */
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.1), inset 0 0 10px rgba(59, 130, 246, 0.05);
  backdrop-filter: blur(4px);
  text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
}
.btn-suit-001-primary:not(.is-disabled):hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.6);
  color: #fff; /* White on hover */
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1);
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
}

.btn-suit-001-secondary {
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #64748B;
}
.btn-suit-001-secondary:not(.is-disabled):hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #94A3B8;
}

/* [Secondary] - Ghost/Glass */
.btn-secondary {
  background: rgba(255, 255, 255, 0.03);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.08); /* Finer border */
}
.btn-secondary:not(.is-disabled):hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.15);
}

/* [Destructive] - Red/Warning */
.btn-destructive {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.btn-destructive:not(.is-disabled):hover {
  background: rgba(239, 68, 68, 0.2);
  color: #FCA5A5;
  border-color: rgba(239, 68, 68, 0.4);
}

/* [Social Google] - Specific */
.btn-social-google {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  font-weight: 500;
}
.btn-social-google:not(.is-disabled):hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

/* [Marketing] - Product Cards */
.btn-marketing-buy {
  background: var(--color-brand-primary); /* Default Blue */
  color: #fff;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}
.btn-marketing-buy:not(.is-disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
}

/* [Tab] - Toggle Switch */
.btn-tab {
  background: transparent;
  color: #94A3B8;
  font-weight: 500;
  border-radius: 24px;
}
.btn-tab:not(.is-disabled):hover {
  color: #fff;
}
/* Active state for tabs often handled by parent logic passing a different theme or class, 
   but simplisticly if we use this for active tab, we might need an 'active' prop or specialized theme.
   For now, we'll assume the parent toggles classes or we define a 'tab-active' theme if needed. 
*/
/* [Coupon Themes] */
.btn-coupon-purple {
  background: rgba(217, 70, 239, 0.2);
  color: #E879F9;
  border: 1px solid rgba(217, 70, 239, 0.3);
}
.btn-coupon-purple:not(.is-disabled):hover {
  background: rgba(217, 70, 239, 0.3);
  color: #fff;
}

.btn-coupon-gold {
  background: rgba(245, 158, 11, 0.2);
  color: #FBBF24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}
.btn-coupon-gold:not(.is-disabled):hover {
  background: rgba(245, 158, 11, 0.3);
  color: #fff;
}

.btn-coupon-cyan {
  background: rgba(6, 182, 212, 0.2);
  color: #22D3EE;
  border: 1px solid rgba(6, 182, 212, 0.3);
}
.btn-coupon-cyan:not(.is-disabled):hover {
  background: rgba(6, 182, 212, 0.3);
  color: #fff;
}
</style>

