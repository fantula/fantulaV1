<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="visible" 
        class="base-modal-overlay" 
        @mousedown="handleMouseDown"
        @click="handleOverlayClick"
      >
        <div class="base-modal-container" :style="{ width: containerWidth }">
          <!-- Header -->
          <div class="base-modal-header">
            <h3 class="base-modal-title">{{ title }}</h3>
            <button v-if="showClose" class="base-modal-close" @click="handleClose">×</button>
          </div>

          <!-- Body -->
          <div class="base-modal-body">
            <slot></slot>
          </div>

        <!-- Footer Actions -->
          <div v-if="showFooter" class="base-modal-actions">
            <slot name="footer">
              <button class="base-modal-cancel" @click="handleClose">{{ cancelText }}</button>
              <button 
                class="base-modal-confirm" 
                :disabled="confirmDisabled || loading"
                @click="$emit('confirm')"
              >
                {{ loading ? loadingText : confirmText }}
              </button>
            </slot>
          </div>

          <!-- Custom Mascot Slot -->
          <!-- Theme Mascot -->
          <img 
            v-if="currentTheme.mascotImg"
            :src="currentTheme.mascotImg" 
            class="modal-mascot-phantom"
            :class="[`phantom-${currentTheme.mascotPosition}`, currentTheme.variantClass]"
            :style="{ 
              animationName: currentTheme.animation,
              animationDuration: currentTheme.duration || '0.6s',
              opacity: currentTheme.opacity ?? 1
            }"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getTheme } from '@/utils/modalThemeRegistry'

interface Props {
  visible: boolean
  title: string
  width?: string
  showClose?: boolean
  showFooter?: boolean
  cancelText?: string
  confirmText?: string
  loadingText?: string
  confirmDisabled?: boolean
  loading?: boolean
  // Theme ID replaces manual configuration
  themeId?: string 
}

const props = withDefaults(defineProps<Props>(), {
  width: '420px',
  showClose: true,
  showFooter: true,
  cancelText: '取消',
  confirmText: '确认',
  loadingText: '处理中...',
  confirmDisabled: false,
  loading: false,
  themeId: 'suit-001' // Default Suit
})

const currentTheme = computed(() => getTheme(props.themeId))

const emit = defineEmits(['close', 'confirm', 'update:visible'])

const containerWidth = computed(() => props.width)

// Fix: Prevent closing when dragging from inside modal to outside
const isMouseDownOnOverlay = ref(false)

const handleMouseDown = (e: MouseEvent) => {
  // Only mark as overlay click if the target is strictly the overlay itself
  isMouseDownOnOverlay.value = e.target === e.currentTarget
}

const handleOverlayClick = (e: MouseEvent) => {
  // Only close if mousedown AND mouseup (click) both happened on overlay
  if (isMouseDownOnOverlay.value && e.target === e.currentTarget) {
    handleClose()
  }
  // Reset
  isMouseDownOnOverlay.value = false
}

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}
</script>

<style scoped>
/* Overlay: Deep Blur */
.base-modal-overlay {
  position: fixed;
  z-index: 2000;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Container: Premium Glass Box */
.base-modal-container {
  /* Rich Deep Glass */
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  
  /* 3D Glass Borders */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.1), /* Top Highlight */
    inset 0 0 20px rgba(0,0,0,0.2), /* Inner Depth */
    0 25px 60px -12px rgba(0, 0, 0, 0.8), /* Deep Drop Shadow */
    0 0 0 1px rgba(0,0,0,0.4); /* Sharp Outer Edge */
    
  border-radius: 28px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  /* Scroll & Clip */
  overflow-y: auto;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

/* Mascot Style */
.modal-mascot-phantom {
  /* Positioning (Restored) */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
  z-index: 0;
  
  /* Visuals: No Special Effects (Clean Image) */
  opacity: 1; 
  filter: none;
  mix-blend-mode: normal; 
  
  mask-image: linear-gradient(to top, black 20%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 20%, transparent 100%);
  
  /* Standard Slide In */
  animation: mascot-rise 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.1s;
  transform-origin: bottom center;
}

/* Position Variants */
.phantom-left {
  /* Styles moved to .phantom-left definition below */
}

.phantom-right {
  /* Styles moved to .phantom-right definition below */
}

.phantom-bottom {
  left: 50%; right: auto;
  /* Animation handling moved to keyframes with variables */
}

@keyframes mascot-rise {
  0% { opacity: 0; transform: var(--start-transform); }
  100% { opacity: 1; transform: var(--end-transform); }
}

/* Position Variants */
.phantom-bottom {
  --start-transform: translateX(-50%) translateY(50px) scale(0.8);
  --end-transform: translateX(-50%) translateY(5px) scale(1);
  left: 50%; right: auto;
  transform: translateX(-50%);
}

.phantom-left {
  --start-transform: translateY(50px) scale(0.8);
  --end-transform: translateY(5px) scale(1);
  left: 0; right: auto;
  transform-origin: bottom left;
}

.phantom-right {
  --start-transform: translateY(50px) scale(0.8);
  --end-transform: translateY(5px) scale(1);
  right: 0; left: auto;
  transform-origin: bottom right;
}

/* Header */
.base-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  position: relative;
  z-index: 2;
}

.base-modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff !important; /* Force Pure White */
  margin: 0;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.base-modal-close {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 50%;
  width: 32px; height: 32px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
  padding: 0;
}
.base-modal-close:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
  transform: rotate(90deg);
}

/* Body */
.base-modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
}

/* Actions */
.base-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  z-index: 2;
}



/* Transition: Pop In with Scale */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.modal-enter-active .base-modal-container,
.modal-leave-active .base-modal-container {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .base-modal-container,
.modal-leave-to .base-modal-container {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>

<style>
/* Global Glass Form Styles */
.base-modal-body .form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-modal-body .form-label {
  font-size: 14px;
  font-weight: 600;
  color: #fff !important; /* Force Pure White */
  margin-left: 4px;
}

.base-modal-body .form-input {
  padding: 14px 18px;
  border-radius: 14px;
  
  /* Glass Input */
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
  
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: all 0.25s ease;
  width: 100%;
  box-sizing: border-box;
}

.base-modal-body .form-input:focus {
  border-color: #3B82F6;
  background: rgba(0, 0, 0, 0.5);
  /* Neon Glow */
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15), 0 0 20px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.base-modal-body .form-input:disabled {
  background: rgba(255, 255, 255, 0.05);
  color: #64748B;
  border-color: transparent;
  cursor: not-allowed;
  box-shadow: none;
}

.base-modal-body .form-input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.base-modal-body .form-tip {
  font-size: 12px;
  color: #64748B;
  margin-top: 6px;
  margin-left: 4px;
}

/* Global Modal Button Styles (Moved from Scoped) */
.base-modal-cancel {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.03);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.base-modal-cancel:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.15);
}

.base-modal-confirm {
  padding: 12px 32px;
  background: linear-gradient(135deg, #3B82F6, #2563eb);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
}
.base-modal-confirm:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
}
.base-modal-confirm:active { transform: scale(0.98); }

.base-modal-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  background: #334155;
}
</style>
