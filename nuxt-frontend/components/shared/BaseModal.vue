<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="visible" 
        class="base-modal-overlay" 
        @mousedown="handleMouseDown"
        @click="handleOverlayClick"
      >
        <div class="base-modal-container" :class="customClass" :style="{ width: containerWidth }">
          <!-- Header -->
          <div v-if="showHeader" class="base-modal-header">
            <h3 class="base-modal-title">{{ title }}</h3>
            <button v-if="showClose" class="base-modal-close" @click="handleClose">×</button>
          </div>

          <!-- Body -->
          <div class="base-modal-body" :style="{ padding: contentPadding }">
            <slot></slot>
          </div>

        <!-- Footer Actions -->
          <div v-if="showFooter" class="base-modal-actions">
            <slot name="footer">
              <BaseButton :themeId="cancelThemeId" @click="handleClose">
                {{ cancelText }}
              </BaseButton>
              <BaseButton 
                :themeId="confirmThemeId" 
                :disabled="confirmDisabled || loading"
                :loading="loading"
                @click="$emit('confirm')"
              >
                {{ loading ? loadingText : confirmText }}
              </BaseButton>
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
              '--mascot-final-opacity': currentTheme.opacity ?? 1
            }"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getTheme } from '@/utils/modalThemeRegistry'
import BaseButton from '@/components/shared/BaseButton.vue'

interface Props {
  visible: boolean
  title?: string
  width?: string
  showClose?: boolean
  showFooter?: boolean
  showHeader?: boolean
  contentPadding?: string
  customClass?: string
  cancelText?: string
  confirmText?: string
  loadingText?: string
  confirmDisabled?: boolean
  loading?: boolean
  // Theme ID replaces manual configuration
  themeId?: string 
  // Button overrides
  confirmThemeId?: string
  cancelThemeId?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '420px',
  showClose: true,
  showFooter: true,
  showHeader: true,
  contentPadding: '32px',
  customClass: '',
  cancelText: '取消',
  confirmText: '确认',
  loadingText: '处理中...',
  confirmDisabled: false,
  loading: false,
  themeId: 'suit-001', // Default Suit
  confirmThemeId: 'primary',
  cancelThemeId: 'secondary'
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
  border-radius: 28px;
  /* padding moved to body or contentPadding prop */
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  /* Scroll & Clip */
  overflow-y: auto;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

/* Mascot Style - 基础定位 */
.modal-mascot-phantom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
  z-index: 0;
  
  /* ⚠️ 初始隐藏，由动画控制显现 */
  opacity: 0;
  
  /* 确保动画结束后停留在最后一帧 (保持模糊/透明度) */
  animation-fill-mode: forwards;
  
  /* 默认渐变遮罩 */
  mask-image: linear-gradient(to top, black 20%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 20%, transparent 100%);
  
  transform-origin: bottom center;
}

/* Position Variants */

.phantom-bottom {
  left: 50%; right: auto;
  /* Animation handling moved to keyframes with variables */
}

/* Position Variants */



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
</style>

<style>
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎨 弹窗主题渲染层 (Modal Theme Rendering Layer)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 📋 套装添加指南:
 * 1. 在 utils/modalThemeRegistry.ts 中添加新套装配置
 * 2. 在此文件对应位置添加 CSS variant 类和动画 keyframes
 * 3. 使用明确的 [SUIT-XXX] 标识便于查找
 */

/* ═══════════════════════════════════════════════════════════════════════════
   [SUIT-001] 标准幽灵 (Classic Phantom)
   ───────────────────────────────────────────────────────────────────────────
   特点: 模糊+灰度+柔光混合，呈现若隐若现的幽灵效果
   配置: mascotPosition: 'bottom', variantClass: 'variant-standard'
   ═══════════════════════════════════════════════════════════════════════════ */
.variant-standard {
    filter: blur(1px) grayscale(0.35);
    mix-blend-mode: soft-light;
    mask-image: linear-gradient(
      to top,
      rgba(0,0,0,0.8) 0%,
      rgba(0,0,0,0.4) 40%,
      rgba(0,0,0,0.1) 70%,
      transparent 100%
    );
}

@keyframes mascot-rise {
    0% {
        opacity: 0;
        transform: var(--start-transform) translateY(40px);
        filter: blur(10px) grayscale(0.6);
    }
    60% {
        opacity: 0.4;
        filter: blur(4px) grayscale(0.4);
    }
    100% {
        opacity: var(--mascot-final-opacity, 0.35);
        transform: var(--end-transform);
        filter: blur(2px) grayscale(0.35);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   [SUIT-002] 柔光风格 (Soft Light)
   ───────────────────────────────────────────────────────────────────────────
   特点: 明亮柔和，带暖色调
   配置: mascotPosition: 'left', variantClass: 'variant-phantom-light'
   ═══════════════════════════════════════════════════════════════════════════ */
.variant-phantom-light {
    filter: brightness(1.2) sepia(0.2);
    mix-blend-mode: hard-light;
}

@keyframes phantom-rise-soft {
    0% { 
        transform: scale(0.95); 
        opacity: 0; 
    }
    100% { 
        transform: scale(1); 
        opacity: var(--mascot-final-opacity, 0.8); 
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   [SUIT-003] 赛博朋克 (Cyberpunk)
   ───────────────────────────────────────────────────────────────────────────
   特点: 霓虹发光边缘，高对比度
   配置: mascotPosition: 'right', variantClass: 'variant-cyber'
   ═══════════════════════════════════════════════════════════════════════════ */
.variant-cyber {
    filter: drop-shadow(0 0 5px #00ff00) contrast(1.2);
    mix-blend-mode: screen;
}

@keyframes cyber-pop {
    0% { 
        transform: scale(0); 
        opacity: 0;
    }
    60% { 
        transform: scale(1.1); 
    }
    100% { 
        transform: scale(1); 
        opacity: var(--mascot-final-opacity, 1);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   [SUIT-XXX] 新套装添加位置
   ───────────────────────────────────────────────────────────────────────────
   复制以上模板，替换 XXX 为新编号 (004, 005...)
   ═══════════════════════════════════════════════════════════════════════════ */
</style>
