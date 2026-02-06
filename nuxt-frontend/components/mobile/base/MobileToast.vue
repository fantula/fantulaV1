<template>
  <Transition name="toast-fade">
    <div v-if="isVisible" class="mobile-toast" :class="type">
      <div class="toast-content">
        <span class="toast-icon" v-if="icon">
           <!-- Simple CSS Icons or Text based icons to avoid SVG deps if needed, 
                but using emojis or simple chars is lightest. 
                Or passed slots. For now, simple text/emoji mapping. -->
            {{ icon }}
        </span>
        <span class="toast-text">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast } from '@/composables/mobile/useToast'

const { isVisible, message, type } = useToast()

const icon = computed(() => {
    switch(type.value) {
        case 'success': return '✅'
        case 'error': return '❌'
        case 'warning': return '⚠️'
        default: return ''
    }
})
</script>

<style scoped>
.mobile-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
  max-width: 80vw;
}

.toast-content {
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  min-width: 120px;
}

.toast-text {
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-weight: 500;
}

.toast-icon {
  font-size: 24px;
  margin-bottom: 4px;
}

/* Modifier Classes */
.mobile-toast.error .toast-content { background: rgba(20, 20, 20, 0.9); border: 1px solid rgba(239, 68, 68, 0.3); }
.mobile-toast.success .toast-content { background: rgba(20, 20, 20, 0.9); border: 1px solid rgba(34, 197, 94, 0.3); }

/* Animation */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%) scale(0.9);
}
</style>
