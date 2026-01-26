<template>
  <BaseModal
    :visible="visible"
    :title="title"
    width="500px"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :loading="loading"
    :confirm-disabled="loading"
    :theme-id="themeId"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <!-- Custom Body Content -->
    <div class="confirm-content">
      <slot>
        <p class="confirm-message">{{ message }}</p>
      </slot>
    </div>

    <!-- Custom Footer (Optional, usually BaseModal footer is enough, but we might want custom styling for buttons if BaseModal buttons aren't enough. 
         BaseModal provides 'footer' slot. If we don't use it, BaseModal uses default buttons. 
         BaseConfirmModal usually has specific button styles (danger/warning). 
         Let's use the footer slot to preserve those styles if they differ from standard BaseModal.) 
    -->
    <template #footer>
      <div class="confirm-actions">
        <button class="btn btn-secondary" @click="handleCancel" :disabled="loading">
          {{ cancelText }}
        </button>
        <button 
          class="btn" 
          :class="confirmBtnClass"
          @click="handleConfirm"
          :disabled="loading"
        >
          <span v-if="loading" class="btn-loading"></span>
          {{ confirmText }}
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  message?: string
  cancelText?: string
  confirmText?: string
  type?: 'default' | 'warning' | 'danger'
  loading?: boolean
  themeId?: string
}>(), {
  title: '确认',
  message: '确定要执行此操作吗？',
  cancelText: '取消',
  confirmText: '确定',
  type: 'default',
  loading: false,
  themeId: 'suit-001'
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'update:visible', value: boolean): void
}>()

const confirmBtnClass = computed(() => ({
  'btn-primary': props.type === 'default',
  'btn-warning': props.type === 'warning',
  'btn-danger': props.type === 'danger'
}))

const handleClose = () => {
  if (!props.loading) {
    emit('close')
    emit('update:visible', false)
  }
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
    handleClose()
  }
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.confirm-message {
  font-size: 15px;
  color: #CBD5E1;
  line-height: 1.6;
  margin: 0;
  text-align: center; /* Generally confirm messages look better centered if simple */
}

/* Re-use button styles locally or rely on global? 
   BaseModal has scoped styles for its own buttons. 
   Here we provide custom footer, so we need styles. 
*/
.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
}

.btn {
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center; justify-content: center;
  gap: 6px;
}
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-secondary:hover:not(:disabled) { background: rgba(255, 255, 255, 0.12); color: #F1F5F9; }

.btn-primary { background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: #fff; }
.btn-warning { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #fff; }
.btn-danger { background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: #fff; }

.btn-loading {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
