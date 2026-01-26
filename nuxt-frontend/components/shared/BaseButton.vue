<template>
  <button 
    class="base-button"
    :class="[
      theme.variantClass,
      { 'is-loading': loading, 'is-disabled': disabled, 'is-block': block }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="btn-spinner">
      <svg viewBox="0 0 24 24" fill="none" class="spinner-icon">
         <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-opacity="0.25"></circle>
         <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
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
}

const props = withDefaults(defineProps<Props>(), {
  themeId: 'primary',
  loading: false,
  disabled: false,
  block: false
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

/* Loading Spinner */
.btn-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
}
.spinner-icon {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* =============================================================================
   THEME VARIANTS (Move to global or separate css if prefered, but scoped here allows encapsulation)
   ============================================================================= */

/* [Primary] - Standard Blue Gradient */
.btn-primary {
  background: linear-gradient(135deg, #3B82F6, #2563eb);
  color: #fff;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.btn-primary:not(.is-disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
}
.btn-primary:active { transform: scale(0.98); }

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
  background: var(--primary-blue); /* Default Blue */
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
</style>
