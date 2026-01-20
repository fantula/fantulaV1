<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="base-modal-overlay" @click.self="handleClose">
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
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
}

const props = withDefaults(defineProps<Props>(), {
  width: '420px',
  showClose: true,
  showFooter: true,
  cancelText: '取消',
  confirmText: '确认',
  loadingText: '处理中...',
  confirmDisabled: false,
  loading: false
})

const emit = defineEmits(['close', 'confirm', 'update:visible'])

const containerWidth = computed(() => props.width)

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}
</script>

<style scoped>
/* Overlay */
.base-modal-overlay {
  position: fixed;
  z-index: 2000;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Container */
.base-modal-container {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  padding: 32px;
  box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
}

/* Header */
.base-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.base-modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.base-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  line-height: 1;
}
.base-modal-close:hover {
  color: #fff;
}

/* Body */
.base-modal-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

/* Actions */
.base-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.base-modal-cancel {
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.05);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.base-modal-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.base-modal-confirm {
  padding: 10px 24px;
  background: linear-gradient(135deg, var(--primary-blue), #2563eb);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}
.base-modal-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
}
.base-modal-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  background: #475569;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active .base-modal-container,
.modal-leave-active .base-modal-container {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .base-modal-container,
.modal-leave-to .base-modal-container {
  opacity: 0;
  transform: scale(0.92);
}
</style>

<style>
/* Global form styles for use inside BaseModal */
.base-modal-body .form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.base-modal-body .form-label {
  font-size: 14px;
  font-weight: 500;
  color: #94A3B8;
}

.base-modal-body .form-input {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.base-modal-body .form-input:focus {
  border-color: var(--primary-blue);
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.base-modal-body .form-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.base-modal-body .form-tip {
  font-size: 12px;
  color: #64748B;
  margin-top: 4px;
}
</style>
