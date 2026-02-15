<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="global-loading-overlay">
        <div class="glass-panel">
          <div class="spinner-container">
            <div class="spinner"></div>
          </div>
          <div class="loading-text">{{ text }}</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useGlobalLoading } from '@/composables/useGlobalLoading'

const props = defineProps({
  loading: {
    type: Boolean,
    default: undefined
  }
})

const { visible: globalVisible, text, type } = useGlobalLoading()

// Allow prop to override global state (for Page-Level Entry control)
const visible = computed(() => {
  if (props.loading !== undefined) return props.loading
  return globalVisible.value
})
</script>

<style scoped>
.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.6); /* Darker backdrop */
  backdrop-filter: blur(8px);
  z-index: 9999;
}

.glass-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 60px;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 200px;
}

.spinner-container {
  margin-bottom: 24px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #38BDF8; /* Sky-400 */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
