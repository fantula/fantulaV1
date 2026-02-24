<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="isVisible" class="mobile-toast-wrapper" :class="type">
        <div class="toast-glass-box">
          <div class="icon-glow">
             <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="none" class="t-svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><path d="M7.75 12L10.58 14.83L16.25 9.17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
             <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="none" class="t-svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><path d="M9.17 14.83L14.83 9.17M14.83 14.83L9.17 9.17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
             <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" fill="none" class="t-svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V13M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
             <svg v-else viewBox="0 0 24 24" fill="none" class="t-svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/><path d="M12 16V11M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <span class="toast-text">{{ message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
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
  background: rgba(5, 5, 10, 0.85); /* Deep tech black */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 14px 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  /* Premium Border & Shadow */
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.15); /* Top highlight */
  box-shadow: 
    0 10px 40px -10px rgba(0, 0, 0, 0.7),
    0 0 0 1px rgba(255, 255, 255, 0.02) inset;
    
  min-width: 140px;
}

/* Text */
.toast-text {
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-weight: 500;
  color: #F8FAFC;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

/* Icon Container */
.icon-glow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.t-svg {
  width: 32px;
  height: 32px;
}

/* ---- Type Variances (Cyber Neon Glows) ---- */

/* Success -> Cyber Cyan */
.mobile-toast-wrapper.success .toast-glass-box {
  border-color: rgba(6, 182, 212, 0.2);
  background: linear-gradient(145deg, rgba(5, 5, 10, 0.9), rgba(6, 182, 212, 0.1));
}
.mobile-toast-wrapper.success .icon-glow {
  color: #06B6D4;
  filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.5));
}

/* Error -> Neon Orange */
.mobile-toast-wrapper.error .toast-glass-box {
  border-color: rgba(249, 115, 22, 0.2);
  background: linear-gradient(145deg, rgba(69, 10, 10, 0.5), rgba(5, 5, 10, 0.9));
}
.mobile-toast-wrapper.error .icon-glow {
  color: #F97316;
  filter: drop-shadow(0 0 12px rgba(249, 115, 22, 0.5));
}

/* Warning -> Cyber Yellow */
.mobile-toast-wrapper.warning .toast-glass-box {
  border-color: rgba(234, 179, 8, 0.2);
  background: linear-gradient(145deg, rgba(5, 5, 10, 0.9), rgba(161, 98, 7, 0.15));
}
.mobile-toast-wrapper.warning .icon-glow {
  color: #EAB308;
  filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.4));
}

/* Info -> Tech Blue */
.mobile-toast-wrapper.info .toast-glass-box {
  border-color: rgba(59, 130, 246, 0.2);
}
.mobile-toast-wrapper.info .icon-glow {
  color: #38BDF8;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.4));
}

/* ---- Animations (Slide Up + Fade) ---- */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy spring-like */
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -30%) scale(0.92); /* Start slightly lower and smaller */
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -60%) scale(0.95); /* Exit moving up */
}
</style>
