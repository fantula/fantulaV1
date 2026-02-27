<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="page-spinner-wrap">
        <div class="page-spinner"></div>
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

const { visible: globalVisible } = useGlobalLoading()

// Allow prop to override global state
const visible = computed(() => {
  if (props.loading !== undefined) return props.loading
  return globalVisible.value
})
</script>

<style scoped>
.page-spinner-wrap {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 9999;
}

.page-spinner {
  width: 32px;
  height: 32px;
  border: 4px solid rgba(56, 189, 248, 0.25);
  border-top-color: var(--spinner-color, #38BDF8);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
