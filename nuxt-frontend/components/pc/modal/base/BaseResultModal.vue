<template>
  <BaseModal
    :visible="visible"
    :title="title"
    width="500px"
    :show-footer="false"
    :show-mascot="showMascot"
    :mascot-position="mascotPosition"
    @close="handleClose"
  >
    <div class="result-body">
      <!-- Icon -->
      <div class="result-icon" :class="iconClass">
        <slot name="icon">
          <span v-if="type === 'success'">✓</span>
          <span v-else-if="type === 'error'">✕</span>
          <span v-else-if="type === 'warning'">!</span>
          <span v-else>i</span>
        </slot>
      </div>
      
      <!-- Message -->
      <div class="result-message" v-if="message">{{ message }}</div>
      
      <!-- Content -->
      <div class="result-content" v-if="$slots.default">
        <slot></slot>
      </div>

      <!-- Actions (Inside body for result modals usually, centered) -->
      <div class="result-actions">
        <button 
          v-if="showSecondary"
          class="btn btn-secondary"
          @click="handleSecondary"
        >
          {{ secondaryText }}
        </button>
        <button 
          class="btn" 
          :class="primaryBtnClass"
          @click="handlePrimary"
        >
          {{ primaryText }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = withDefaults(defineProps<{
  visible: boolean
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message?: string
  primaryText?: string
  secondaryText?: string
  showSecondary?: boolean
  showMascot?: boolean
  mascotPosition?: 'left' | 'right' | 'bottom'
}>(), {
  type: 'success',
  title: '操作成功',
  primaryText: '确定',
  secondaryText: '返回',
  showSecondary: false,
  showMascot: false,
  mascotPosition: 'bottom'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'primary'): void
  (e: 'secondary'): void
  (e: 'update:visible', value: boolean): void
}>()

const iconClass = computed(() => `icon-${props.type}`)

const primaryBtnClass = computed(() => ({
  'btn-success': props.type === 'success',
  'btn-danger': props.type === 'error',
  'btn-warning': props.type === 'warning',
  'btn-primary': props.type === 'info'
}))

const handleClose = () => {
  emit('close')
  emit('update:visible', false)
}

const handlePrimary = () => {
  emit('primary')
  handleClose()
}

const handleSecondary = () => {
  emit('secondary')
}
</script>

<style scoped>
.result-body {
  text-align: center;
  padding: 10px 0;
}

.result-icon {
  width: 72px; height: 72px; border-radius: 50%;
  margin: 0 auto 24px;
  display: flex; align-items: center; justify-content: center;
  font-size: 36px; font-weight: 700;
}
.result-icon.icon-success { background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%); color: #fff; box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3); }
.result-icon.icon-error { background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: #fff; box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3); }
.result-icon.icon-warning { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #fff; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3); }
.result-icon.icon-info { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: #fff; box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3); }

.result-message {
  font-size: 16px; color: #E2E8F0; line-height: 1.6; margin-bottom: 24px;
}

.result-content {
  margin-bottom: 20px;
}

.result-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 10px;
}

.btn {
  padding: 12px 32px;
  border-radius: 10px;
  font-size: 15px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  min-width: 120px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-secondary:hover { background: rgba(255, 255, 255, 0.12); color: #F1F5F9; }

.btn-success { background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%); color: #fff; }
.btn-danger { background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: #fff; }
.btn-warning { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #fff; }
.btn-primary { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: #fff; }
</style>
