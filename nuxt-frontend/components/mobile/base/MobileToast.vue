<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="isVisible" class="mobile-toast-wrapper" :class="type">
        <div class="toast-glass-box">
          <div class="icon-glow">
             <el-icon v-if="type === 'success'"><CircleCheckFilled /></el-icon>
             <el-icon v-else-if="type === 'error'"><CircleCloseFilled /></el-icon>
             <el-icon v-else-if="type === 'warning'"><WarningFilled /></el-icon>
             <el-icon v-else><InfoFilled /></el-icon>
          </div>
          <span class="toast-text">{{ message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { CircleCheckFilled, CircleCloseFilled, WarningFilled, InfoFilled } from '@element-plus/icons-vue'
import { useToast } from '@/composables/mobile/useToast'

const { isVisible, message, type } = useToast()
</script>

<style scoped>
.mobile-toast-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centered by default */
  z-index: 10002;
  pointer-events: none;
  width: auto;
  max-width: 80vw;
  display: flex;
  justify-content: center;
}

.toast-glass-box {
  background: rgba(15, 23, 42, 0.7); /* Deep dark blue transparent */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 16px 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  /* Premium Border & Shadow */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 10px 40px -10px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    
  min-width: 140px;
}

/* Text */
.toast-text {
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
  font-weight: 500;
  color: #F1F5F9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

/* Icon Container */
.icon-glow {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.1));
}

/* ---- Type Variances (Cyber Neon Glows) ---- */

/* Success */
.mobile-toast-wrapper.success .toast-glass-box {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(20, 83, 45, 0.3));
}
.mobile-toast-wrapper.success .icon-glow {
  color: #4ADE80;
  filter: drop-shadow(0 0 10px rgba(74, 222, 128, 0.4));
}

/* Error */
.mobile-toast-wrapper.error .toast-glass-box {
  border-color: rgba(239, 68, 68, 0.3);
  background: linear-gradient(145deg, rgba(69, 10, 10, 0.4), rgba(15, 23, 42, 0.8));
}
.mobile-toast-wrapper.error .icon-glow {
  color: #F87171;
  filter: drop-shadow(0 0 10px rgba(248, 113, 113, 0.4));
}

/* Warning */
.mobile-toast-wrapper.warning .toast-glass-box {
  border-color: rgba(245, 158, 11, 0.3);
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(120, 53, 15, 0.2));
}
.mobile-toast-wrapper.warning .icon-glow {
  color: #FBBF24;
  filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.4));
}

/* Info (Default) */
.mobile-toast-wrapper.info .toast-glass-box {
  border-color: rgba(56, 189, 248, 0.3);
}
.mobile-toast-wrapper.info .icon-glow {
  color: #38BDF8;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.4));
}

/* ---- Animations (Slide Up + Fade) ---- */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy spring-like */
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -30%) scale(0.9); /* Start slightly lower and smaller */
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -60%) scale(0.95); /* Exit moving up */
}
</style>
