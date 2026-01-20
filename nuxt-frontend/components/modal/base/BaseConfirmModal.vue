<template>
  <Transition name="modal-fade">
    <div v-if="visible" class="modal-mask" @click.self="handleClose">
      <div class="modal-confirm">
        <!-- 头部 -->
        <div class="modal-header" :class="headerClass">
          <div class="modal-title">{{ title }}</div>
          <button class="modal-close" @click="handleClose">×</button>
        </div>
        
        <!-- 内容 -->
        <div class="modal-body">
          <slot>
            <p class="modal-message">{{ message }}</p>
          </slot>
        </div>
        
        <!-- 底部按钮 -->
        <div class="modal-footer">
          <button 
            class="btn btn-secondary" 
            @click="handleCancel"
            :disabled="loading"
          >
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
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * 基础确认弹窗
 * 用途: 删除确认、退出确认、操作确认等
 * 尺寸: 400px
 */

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  message?: string
  cancelText?: string
  confirmText?: string
  type?: 'default' | 'warning' | 'danger'
  loading?: boolean
}>(), {
  title: '确认',
  message: '确定要执行此操作吗？',
  cancelText: '取消',
  confirmText: '确定',
  type: 'default',
  loading: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

// 头部样式
const headerClass = computed(() => ({
  'header-warning': props.type === 'warning',
  'header-danger': props.type === 'danger'
}))

// 确认按钮样式
const confirmBtnClass = computed(() => ({
  'btn-primary': props.type === 'default',
  'btn-warning': props.type === 'warning',
  'btn-danger': props.type === 'danger'
}))

const handleClose = () => {
  if (!props.loading) emit('close')
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
    emit('close')
  }
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
/* 遮罩层 */
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 弹窗容器 */
.modal-confirm {
  width: 400px;
  max-width: 90vw;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* 头部 */
.modal-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  position: relative;
}

.modal-header.header-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
}

.modal-header.header-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 内容 */
.modal-body {
  padding: 24px;
}

.modal-message {
  font-size: 15px;
  color: #CBD5E1;
  line-height: 1.6;
  margin: 0;
}

/* 底部 */
.modal-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* 按钮 */
.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  color: #F1F5F9;
}

.btn-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #fff;
}

.btn-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

/* Loading */
.btn-loading {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-active .modal-confirm,
.modal-fade-leave-active .modal-confirm {
  transition: transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-confirm,
.modal-fade-leave-to .modal-confirm {
  transform: scale(0.95);
}
</style>
