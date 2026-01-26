<template>
  <button 
    class="send-code-btn-unified" 
    :disabled="disabled || loading || countdown > 0"
    type="button"
    @click="$emit('click')"
  >
    {{ displayText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  countdown: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
  text: { type: String, default: '获取验证码' }
})

const emit = defineEmits(['click'])

const displayText = computed(() => {
  if (props.loading) return '发送中...'
  if (props.countdown > 0) return `${props.countdown}s后重发`
  return props.text
})
</script>

<style scoped>
.send-code-btn-unified {
  position: absolute;
  right: 6px;
  top: 6px;
  bottom: 6px;
  padding: 0 16px;
  border-radius: 10px;
  
  /* Gradient Pill */
  background: linear-gradient(90deg, #F59E0B, #EA580C);
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 5;
  box-shadow: 0 4px 10px rgba(234, 88, 12, 0.3);
  
  /* Flex center just in case */
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.send-code-btn-unified:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(234, 88, 12, 0.4);
}

.send-code-btn-unified:active {
  transform: scale(0.96);
}

.send-code-btn-unified:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
</style>
